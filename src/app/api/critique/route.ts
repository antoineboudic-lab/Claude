import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT = 10
const RATE_WINDOW_MS = 60_000

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS })
    return true
  }
  if (entry.count >= RATE_LIMIT) return false
  entry.count++
  return true
}

const ALLOWED_ORIGINS = [
  'https://opuslearn.ai',
  'https://www.opuslearn.ai',
  'https://opuslearn.ai',
]

const CRITIQUE_SYSTEM = `You are an expert prompt engineering coach. Analyse the user's prompt and respond with ONLY valid JSON in this exact format, no other text:
{
  "score": <integer 1-10>,
  "strengths": ["<strength 1 in one sentence>", "<strength 2 in one sentence>"],
  "improvements": ["<specific improvement 1>", "<specific improvement 2>"],
  "topTip": "<the single most impactful change, one sentence, start with a verb>"
}

Scoring: 1-3 = vague (no role, context, or format), 4-6 = partial structure but missing key elements, 7-8 = good specificity with minor gaps, 9-10 = expert-level with role + context + format + constraints + tone all specified.
Be direct. Reference specific words or phrases from their prompt. Strengths and improvements must be actionable.`

export async function POST(req: NextRequest) {
  const origin = req.headers.get('origin') ?? ''
  const isDev = process.env.NODE_ENV === 'development'
  if (!isDev && !ALLOWED_ORIGINS.some(o => origin.startsWith(o))) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 503 })
  }

  let body: { userPrompt?: string; taskContext?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const { userPrompt, taskContext } = body
  if (!userPrompt?.trim()) {
    return NextResponse.json({ error: 'Prompt is required' }, { status: 400 })
  }

  try {
    const message = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 400,
      system: CRITIQUE_SYSTEM,
      messages: [{
        role: 'user',
        content: `Task context: ${taskContext ?? 'General professional writing task'}\n\nUser's prompt to analyse:\n${userPrompt.trim()}`,
      }],
    })

    const raw = message.content[0]?.type === 'text' ? message.content[0].text : '{}'
    // Strip markdown code fences if the model wraps the JSON
    const text = raw.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim()
    const critique = JSON.parse(text)

    if (typeof critique.score !== 'number' || !Array.isArray(critique.strengths) || !Array.isArray(critique.improvements)) {
      throw new Error('Invalid critique format')
    }

    return NextResponse.json(critique)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
