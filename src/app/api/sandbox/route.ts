import { NextRequest } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60_000 })
    return true
  }
  if (entry.count >= 10) return false
  entry.count++
  return true
}

const ALLOWED_ORIGINS = [
  'https://opuslearn.ai',
  'https://www.opuslearn.ai',
]

const SYSTEM = `You are a knowledgeable AI assistant. A business professional is practising AI prompting on the OpusLearn learning platform. They have submitted a prompt to you — respond to it genuinely and helpfully, exactly as you would if they sent this in a real work session.

Be thorough but concise. Use plain paragraphs or short bullet points where they help clarity. Do not reference the learning platform or that this is a sandbox — just respond to the prompt naturally.`

export async function POST(req: NextRequest) {
  const origin = req.headers.get('origin') ?? ''
  const isDev = process.env.NODE_ENV === 'development'
  if (!isDev && !ALLOWED_ORIGINS.some(o => origin.startsWith(o))) {
    return new Response('Forbidden', { status: 403 })
  }

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  if (!checkRateLimit(ip)) {
    return new Response('Too many requests', { status: 429 })
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return new Response('API key not configured', { status: 503 })
  }

  let prompt: string
  try {
    const body = await req.json()
    prompt = body.prompt?.trim()
  } catch {
    return new Response('Invalid request body', { status: 400 })
  }

  if (!prompt) {
    return new Response('Prompt is required', { status: 400 })
  }

  const stream = await client.messages.stream({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 600,
    system: SYSTEM,
    messages: [{ role: 'user', content: prompt }],
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
