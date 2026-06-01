import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { createRateLimiter } from '@/lib/ratelimit'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
const rateLimiter = createRateLimiter(20, 60, 'practice')

const ALLOWED_ORIGINS = [
  'https://opuslearn.ai',
  'https://www.opuslearn.ai',
  'https://opuslearn.ai',
]

export async function POST(req: NextRequest) {
  // Origin check — block requests from outside our domain
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

  let body: { prompt?: string; systemContext?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const { prompt, systemContext } = body

  if (!prompt?.trim()) {
    return NextResponse.json({ error: 'Prompt is required' }, { status: 400 })
  }

  if (prompt.trim().length > 3000) {
    return NextResponse.json({ error: 'Prompt too long' }, { status: 400 })
  }

  try {
    const message = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 600,
      system: systemContext ?? 'You are a helpful AI assistant. Respond practically and concisely.',
      messages: [{ role: 'user', content: prompt.trim() }],
    })

    const text = message.content[0]?.type === 'text' ? message.content[0].text : ''
    return NextResponse.json({ response: text })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
