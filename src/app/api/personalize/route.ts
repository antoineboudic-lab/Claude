import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { createHash } from 'crypto'
import { createRateLimiter } from '@/lib/ratelimit'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { getLesson, TRACK_IDS } from '@/lib/curriculum'
import type { TrackId } from '@/lib/curriculum/types'
import type { AssessmentAnswers } from '@/lib/assessment/types'

// Opus generations run for minutes; keep the function alive while streaming
export const maxDuration = 300

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
// Generation is expensive (Opus): cap fresh generations per user, cache hits are free
const rateLimiter = createRateLimiter(10, 3600, 'personalize')

const MODEL = 'claude-opus-4-8'

const ALLOWED_ORIGINS = [
  'https://opuslearn.ai',
  'https://www.opuslearn.ai',
]

const SYSTEM = `You are the personalisation engine for OpusLearn, an AI-literacy learning platform for business professionals. You rewrite a lesson so it reads as if it were written specifically for one reader, based on their assessment profile.

Rules:
- Preserve the lesson's structure exactly: same heading levels in the same order, same markdown features (headings, bold, bullet lists, blockquotes). Do not add or remove sections.
- Preserve every factual claim and teaching point. You are adapting, not abridging — keep overall length within about 20% of the original.
- Rewrite generic examples and scenarios into the reader's world: their role, industry, company size, tools, and stated challenges. Be concrete — name the kinds of deliverables, stakeholders, and metrics someone in their position actually deals with.
- Blockquotes are runnable prompt templates. Keep each one as a blockquote, and tailor its content so the reader could paste it into an AI tool today for their real job.
- Address the reader directly as "you". Use their first name at most once in the whole lesson. Use British English, matching the original.
- Output only the rewritten lesson markdown. No preamble, no closing commentary, and do not wrap the output in a code fence.`

function contextHash(answers: AssessmentAnswers, primaryTrackId: string): string {
  const key = JSON.stringify({
    subRole: answers.subRole,
    roleDescription: answers.roleDescription,
    industry: answers.industry,
    companySize: answers.companySize,
    currentTools: answers.currentTools,
    challenges: answers.challenges ?? answers.challenge,
    goals: answers.goals,
    primaryTrackId,
  })
  return createHash('sha256').update(key).digest('hex').slice(0, 32)
}

function readerProfile(answers: AssessmentAnswers): string {
  const lines = [
    `First name: ${answers.name || 'unknown'}`,
    `Role: ${answers.subRole || answers.role || 'business professional'}`,
    answers.roleDescription ? `In their own words: "${answers.roleDescription}"` : null,
    `Industry: ${answers.industry}`,
    `Company size: ${answers.companySize}`,
    `AI tools they already use: ${answers.currentTools?.join(', ') || 'none yet'}`,
    `Experience with AI: ${answers.experience}`,
    `Biggest challenges: ${(answers.challenges ?? [answers.challenge]).filter(Boolean).join('; ') || 'not stated'}`,
    `Goals: ${answers.goals?.join(', ') || 'not stated'}`,
  ]
  return lines.filter(Boolean).join('\n')
}

export async function POST(req: NextRequest) {
  const origin = req.headers.get('origin') ?? ''
  const isDev = process.env.NODE_ENV === 'development'
  if (!isDev && !ALLOWED_ORIGINS.some(o => origin.startsWith(o))) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Sign in to personalise lessons' }, { status: 401 })
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 503 })
  }

  let body: { lessonId?: string; trackId?: string; force?: boolean }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const { lessonId, trackId, force } = body
  if (!lessonId || !trackId || !TRACK_IDS.includes(trackId as TrackId)) {
    return NextResponse.json({ error: 'lessonId and trackId are required' }, { status: 400 })
  }

  const result = getLesson(trackId as TrackId, lessonId)
  if (!result?.lesson) {
    return NextResponse.json({ error: 'Lesson not found' }, { status: 404 })
  }
  const lesson = result.lesson

  const admin = createAdminClient()

  const { data: assessmentRow } = await admin
    .from('user_assessments')
    .select('answers, primary_track_id')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (!assessmentRow?.answers) {
    return NextResponse.json(
      { error: 'no-assessment', message: 'Take the assessment first so we know who to personalise for' },
      { status: 404 },
    )
  }

  const answers = assessmentRow.answers as AssessmentAnswers
  const hash = contextHash(answers, assessmentRow.primary_track_id)

  // Cache: same user, same lesson, same assessment context → return stored copy
  if (!force) {
    const { data: cached } = await admin
      .from('personalized_lessons')
      .select('content, context_hash')
      .eq('user_id', user.id)
      .eq('lesson_id', lessonId)
      .maybeSingle()

    if (cached?.content && cached.context_hash === hash) {
      return new Response(cached.content, {
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Cache-Control': 'no-cache, no-store',
          'X-Personalize-Cache': 'hit',
        },
      })
    }
  }

  // Only fresh generations count against the rate limit
  if (!await rateLimiter.check(user.id)) {
    return NextResponse.json({ error: 'Too many requests — try again later' }, { status: 429 })
  }

  const stream = client.messages.stream({
    model: MODEL,
    max_tokens: 16000,
    thinking: { type: 'adaptive' },
    system: SYSTEM,
    messages: [{
      role: 'user',
      content: `READER PROFILE\n${readerProfile(answers)}\n\nLESSON (track: ${trackId}, title: "${lesson.title}")\n\n${lesson.content}`,
    }],
  })

  const readable = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder()
      let full = ''
      try {
        for await (const chunk of stream) {
          if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta') {
            full += chunk.delta.text
            controller.enqueue(encoder.encode(chunk.delta.text))
          }
        }
        // Persist only complete generations — a partial rewrite cached
        // forever is worse than regenerating next visit
        if (full.trim().length > 200) {
          await admin.from('personalized_lessons').upsert({
            user_id: user.id,
            lesson_id: lessonId,
            track_id: trackId,
            content: full,
            context_hash: hash,
            model: MODEL,
            created_at: new Date().toISOString(),
          }, { onConflict: 'user_id,lesson_id' })
        }
      } catch {
        controller.error(new Error('Stream error'))
        return
      }
      controller.close()
    },
  })

  return new Response(readable, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-cache, no-store',
      'X-Content-Type-Options': 'nosniff',
      'X-Personalize-Cache': 'miss',
    },
  })
}
