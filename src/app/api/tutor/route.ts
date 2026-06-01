import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { createRateLimiter } from '@/lib/ratelimit'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
const rateLimiter = createRateLimiter(30, 60, 'tutor')

const ALLOWED_ORIGINS = [
  'https://opuslearn.ai',
  'https://www.opuslearn.ai',
  'https://opuslearn.ai',
]

function buildSystemPrompt(params: {
  lessonTitle?: string
  trackId?: string
  lessonContent?: string
  keyTakeaways?: string[]
  pageType?: string
  mode?: string
}): string {
  const { lessonTitle, trackId, lessonContent, keyTakeaways, pageType, mode } = params

  const base = `You are an AI literacy tutor on the OpusLearn platform — a course teaching business professionals how to use AI in their roles, without writing code. You are knowledgeable, practical, encouraging, and concise.`

  if (mode === 'practice') {
    return `${base}

Mode: Practice Partner. The learner is practising AI prompting skills.${lessonTitle ? ` Current lesson: "${lessonTitle}".` : ''}
Your job: run engaging practice exercises. Create roleplay scenarios, critique prompts and suggest improvements, quiz understanding, ask follow-up questions. Keep responses practical and under 5 sentences unless demonstrating a prompt.`
  }

  if (mode === 'navigate') {
    return `${base}

Mode: Course Navigator. Help the learner find the right track, lessons, or next steps.
Available tracks: Marketing, Finance, HR, Sales, Operations, Leadership, Legal, Product, Customer Success, Consulting.
Be specific and direct. Under 4 sentences.`
  }

  if (lessonTitle && trackId) {
    const takeawayBlock = keyTakeaways?.length
      ? `\n\nKEY TAKEAWAYS:\n${keyTakeaways.map((t, i) => `${i + 1}. ${t}`).join('\n')}`
      : ''
    const contentBlock = lessonContent
      ? `\n\nLESSON CONTENT:\n${lessonContent.slice(0, 2500)}`
      : ''

    return `${base}

The learner is studying: "${lessonTitle}" (${trackId} track).${takeawayBlock}${contentBlock}

Your role: Answer questions about this lesson. Add depth beyond what's written — give new angles, concrete examples from ${trackId} work, and clarify confusing points. Don't repeat the lesson verbatim. Be concise: 2–4 sentences for simple questions, up to 6 for complex ones.`
  }

  if (pageType === 'dashboard') {
    return `${base}

The learner is on their dashboard. They may ask about their progress, what to study next, or how to get the most from the platform. Be encouraging and specific. Under 4 sentences.`
  }

  return `${base}

Answer questions about AI tools, prompting, and how AI applies to business roles. Be practical and concise — 2–4 sentences. Recommend tracks or lessons when helpful.`
}

export async function POST(req: NextRequest) {
  const origin = req.headers.get('origin') ?? ''
  const isDev = process.env.NODE_ENV === 'development'
  if (!isDev && !ALLOWED_ORIGINS.some(o => origin.startsWith(o))) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  if (!await rateLimiter.check(ip)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 503 })
  }

  let body: {
    messages?: { role: 'user' | 'assistant'; content: string }[]
    lessonTitle?: string
    trackId?: string
    lessonContent?: string
    keyTakeaways?: string[]
    pageType?: string
    mode?: string
  }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const { messages, lessonTitle, trackId, lessonContent, keyTakeaways, pageType, mode } = body

  if (!messages?.length) {
    return NextResponse.json({ error: 'Messages required' }, { status: 400 })
  }

  const system = buildSystemPrompt({ lessonTitle, trackId, lessonContent, keyTakeaways, pageType, mode })

  // Stream the response token-by-token
  const stream = await client.messages.stream({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: mode === 'practice' ? 500 : 400,
    system,
    messages: messages as Anthropic.MessageParam[],
  })

  const readable = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder()
      try {
        for await (const chunk of stream) {
          if (
            chunk.type === 'content_block_delta' &&
            chunk.delta.type === 'text_delta'
          ) {
            controller.enqueue(encoder.encode(chunk.delta.text))
          }
        }
      } catch {
        controller.error(new Error('Stream error'))
      } finally {
        controller.close()
      }
    },
  })

  return new Response(readable, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-cache, no-store',
      'X-Content-Type-Options': 'nosniff',
    },
  })
}
