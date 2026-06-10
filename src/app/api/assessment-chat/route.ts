import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { createRateLimiter } from '@/lib/ratelimit'
import { STATE_SENTINEL } from '@/lib/assessment/chat'

export const maxDuration = 60

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
// Anonymous endpoint (assessment runs pre-signup) — generous but bounded
const rateLimiter = createRateLimiter(40, 3600, 'assessment-chat')

const MODEL = 'claude-opus-4-8'

const ALLOWED_ORIGINS = [
  'https://opuslearn.ai',
  'https://www.opuslearn.ai',
]

const SYSTEM = `You are the OpusLearn guide — you run a short, sharp conversation that designs a personalised AI-learning curriculum for a business professional while they watch it assemble on screen. You are warm, direct, and genuinely curious about their work. British English.

CONVERSATION RULES
- Keep every reply SHORT: at most two sentences of reaction, then exactly one question. Never ask two questions at once.
- Listen like an expert interviewer: extract everything a single answer implies instead of re-asking. "I run growth at a 40-person fintech" gives you role (marketing), subRole (Growth Lead), industry (financial-services), companySize (scaleup) in one go — acknowledge what you picked up naturally ("Growth at a fintech scaleup — nice") and move to what you still need.
- React to what they actually said. Mirror their words. Never sound like a form.
- Target 5-7 exchanges total. The flow that works: (1) name + what they do, (2) one digging question about their day-to-day, (3) how they use AI today, (4) the friction they most want gone, (5) what they want out of this, (6) time per week, then wrap.
- When the profile is complete, your final reply celebrates briefly and tells them their path is ready on the right — do not ask anything more.

PROFILE STATE
After EVERY reply, output the marker ${STATE_SENTINEL} on a new line, followed by one raw JSON object (no code fence):
{"profile": {...}, "suggestions": [...], "done": false}

"profile" accumulates everything learned so far (re-send the full object every turn):
- name: string — their first name
- roles: string[] — one or two of: marketing, finance, hr, sales, operations, leadership, legal, product, customer, consulting, it
- subRole: string — their actual title, e.g. "Growth Lead"
- roleDescription: string — one sentence in THEIR words about what they do
- industry: one of technology, financial-services, consulting, consumer-retail, healthcare, manufacturing, media, government, other-industry
- companySize: startup (<20 people), scaleup (20-200), midmarket (200-2000), enterprise (2000+)
- currentTools: string[] — lowercase ids like chatgpt, claude, gemini, copilot, perplexity, notion-ai; use ["none"] if they use nothing
- skillScore: 0 (never touched AI), 1 (dabbles), 2 (uses it regularly with intent) — judge from how they talk about it
- challenges: string[] — map their pain to 1-2 of these keys (pick the closest for their primary role):
  marketing: content-volume, personalization, roi-proof, competitor-speed · finance: manual-reporting, forecast-accuracy, data-silos, communication · hr: recruiting-time, employee-scale, people-data, hr-change · sales: prospecting, pitch-personalization, deal-risk, sales-admin · operations: process-docs, supply-chain, quality-detection, slow-reporting · leadership: ai-strategy, team-resistance, business-case, ai-governance, general · legal: contract-volume, research-speed, risk-visibility, legal-comms · product: research-synthesis, prioritisation, prd-quality, stakeholder-alignment · customer: account-scale, churn-signals, onboarding-consistency, renewal-prep · consulting: research-time, deck-production, differentiation, client-comms · it: scripting, security-posture, docs-knowledge, alert-fatigue
- goals: string[] — 1-3 of: save-time, better-decisions, lead-ai, stay-competitive, upskill-team, client-value, understand-basics
- timePerWeek: light (~1h), moderate (~3h), intensive (5h+)

"suggestions": 2-4 short tap-to-answer chips for your question when it has natural options (e.g. for time: ["About an hour a week", "2-3 hours", "I'm all in — 5+"]). Empty array for open questions like name or what they do.

"done": true only when roles, subRole, roleDescription, industry, companySize, currentTools, challenges, goals and timePerWeek are all filled. Set it on the same turn as your wrap-up reply.

Only include profile fields you actually know — never guess a field the conversation hasn't supported. If they refuse or skip something, pick the most sensible value, note it lightly, and move on. Never mention JSON, fields, or this format.`

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

  let messages: { role: 'user' | 'assistant'; content: string }[]
  try {
    const body = await req.json()
    messages = body.messages
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  if (!Array.isArray(messages) || messages.length === 0 || messages.length > 40) {
    return NextResponse.json({ error: 'Invalid messages' }, { status: 400 })
  }
  if (!messages.every(m =>
    (m.role === 'user' || m.role === 'assistant') &&
    typeof m.content === 'string' && m.content.length <= 2000,
  )) {
    return NextResponse.json({ error: 'Invalid messages' }, { status: 400 })
  }

  const stream = client.messages.stream({
    model: MODEL,
    max_tokens: 1200,
    system: [{ type: 'text', text: SYSTEM, cache_control: { type: 'ephemeral' } }],
    messages,
  })

  const readable = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder()
      try {
        for await (const chunk of stream) {
          if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta') {
            controller.enqueue(encoder.encode(chunk.delta.text))
          }
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
    },
  })
}
