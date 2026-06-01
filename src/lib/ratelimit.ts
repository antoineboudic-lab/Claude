import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

export type RateLimiter = { check: (id: string) => Promise<boolean> }

// In-memory fallback for local dev (no Redis configured)
function localFallback(requests: number, windowMs: number): RateLimiter {
  const map = new Map<string, { count: number; resetAt: number }>()
  return {
    check: (id: string) => {
      const now = Date.now()
      const entry = map.get(id)
      if (!entry || now > entry.resetAt) {
        map.set(id, { count: 1, resetAt: now + windowMs })
        return Promise.resolve(true)
      }
      if (entry.count >= requests) return Promise.resolve(false)
      entry.count++
      return Promise.resolve(true)
    },
  }
}

export function createRateLimiter(
  requests: number,
  windowSeconds: number,
  prefix: string
): RateLimiter {
  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN

  if (!url || !token) return localFallback(requests, windowSeconds * 1000)

  const limiter = new Ratelimit({
    redis: new Redis({ url, token }),
    limiter: Ratelimit.slidingWindow(requests, `${windowSeconds}s`),
    prefix: `opuslearn:${prefix}`,
  })

  return {
    check: async (id: string) => {
      const { success } = await limiter.limit(id)
      return success
    },
  }
}
