import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

// Simple in-memory rate limiter: 15 requests per IP per 60s window
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT = 15
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
  'https://ailiteracy.com',
  'https://www.ailiteracy.com',
  'https://ai-literacy-tau.vercel.app',
]

export async function POST(req: NextRequest) {
  // Origin check — block requests from outside our domain
  const origin = req.headers.get('origin') ?? ''
  const isDev = process.env.NODE_ENV === 'development'
  if (!isDev && !ALLOWED_ORIGINS.some(o => origin.startsWith(o))) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  // Rate limit by IP
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 503 })
  }

  let body: { messages?: { role: 'user' | 'assistant'; content: string }[]; lessonTitle?: string; trackId?: string; lessonSummary?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const { messages, lessonTitle, trackId, lessonSummary } = body

  if (!messages?.length) {
    return NextResponse.json({ error: 'Messages are required' }, { status: 400 })
  }

  if (!lessonTitle?.trim() || !trackId?.trim()) {
    return NextResponse.json({ error: 'lessonTitle and trackId are required' }, { status: 400 })
  }

  const systemPrompt = `You are an expert AI literacy coach helping a professional learn about AI in their specific role. The current lesson is: ${lessonTitle} (track: ${trackId}). ${lessonSummary ? 'Lesson context: ' + lessonSummary : ''} Answer questions concisely — 2-4 sentences max. Give practical, role-specific examples. Never repeat what the lesson already explains — add depth or a different angle.`

  try {
    const message = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 300,
      system: systemPrompt,
      messages: messages,
    })

    const text = message.content[0]?.type === 'text' ? message.content[0].text : ''
    return NextResponse.json({ response: text })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
