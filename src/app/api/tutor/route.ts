import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

// Simple in-memory rate limiter: 20 requests per IP per 60s window
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT = 20
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

function buildSystemPrompt(
  lessonTitle?: string,
  trackId?: string,
  lessonSummary?: string,
  pageType?: string,
  mode?: string,
): string {
  const base =
    'You are an expert AI literacy coach on the AI Literacy platform — a learning platform that teaches business professionals how to use AI in their specific roles, without needing to write code. You are knowledgeable, practical, and encouraging.'

  if (mode === 'practice') {
    const lessonCtx = lessonTitle ? ` The learner is currently studying: "${lessonTitle}".` : ''
    return `${base}\n\nMode: Practice Partner.${lessonCtx} Your job is to help the learner practice their AI and prompting skills. You can: create roleplay scenarios (e.g. "You're a marketer writing a product launch email — craft a prompt for that"), critique their prompts and suggest improvements, ask follow-up questions to deepen understanding, or quiz them. Keep sessions engaging, supportive, and practical. Be concise — under 5 sentences unless you're demonstrating a prompt or example.`
  }

  if (mode === 'navigate') {
    return `${base}\n\nMode: Course Navigator. Help the learner find the right track, lessons, or next steps on the platform. Available tracks: Marketing, Finance, HR, Sales, Operations, Leadership, Legal, Product, Customer Success, Consulting. Each track has beginner-to-advanced modules covering real-world AI use cases for that role. Be specific and helpful. Under 4 sentences.`
  }

  // ask mode
  if (lessonTitle && trackId) {
    return `${base}\n\nThe learner is on the lesson: "${lessonTitle}" in the ${trackId} track.${lessonSummary ? ' Lesson context: ' + lessonSummary : ''} Answer questions about this lesson and related AI concepts. Give practical, role-specific examples relevant to ${trackId} professionals. Be concise — 2–4 sentences. Don't repeat what the lesson already covers — add depth or a different angle.`
  }

  if (pageType === 'dashboard') {
    return `${base}\n\nThe learner is on their learning dashboard. They may ask about their progress, what to learn next, or how to get the most from the platform. Be encouraging, specific, and practical. Under 4 sentences.`
  }

  return `${base}\n\nAnswer questions about AI tools, concepts, prompting, and how AI applies to business roles. Be concise and practical — 2–4 sentences. Recommend relevant tracks or lessons when it would help.`
}

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

  let body: {
    messages?: { role: 'user' | 'assistant'; content: string }[]
    lessonTitle?: string
    trackId?: string
    lessonSummary?: string
    pageType?: string
    mode?: string
  }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const { messages, lessonTitle, trackId, lessonSummary, pageType, mode } = body

  if (!messages?.length) {
    return NextResponse.json({ error: 'Messages are required' }, { status: 400 })
  }

  const systemPrompt = buildSystemPrompt(
    lessonTitle?.trim() || undefined,
    trackId?.trim() || undefined,
    lessonSummary?.trim() || undefined,
    pageType,
    mode,
  )

  const maxTokens = mode === 'practice' ? 450 : 320

  try {
    const message = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: maxTokens,
      system: systemPrompt,
      messages,
    })

    const text = message.content[0]?.type === 'text' ? message.content[0].text : ''
    return NextResponse.json({ response: text })
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
