import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

// ── Rate limiting ─────────────────────────────────────────────────────────────
// In-process sliding window. Not perfect across serverless instances, but
// catches obvious abuse on any single instance without extra infrastructure.

const RATE_LIMITS: Record<string, { windowMs: number; max: number }> = {
  '/api/auth':   { windowMs: 60_000, max: 20 },   // auth endpoints: 20 req/min
  '/api/email':  { windowMs: 60_000, max: 10 },   // email send: 10 req/min
  '/api/':       { windowMs: 60_000, max: 120 },  // all other API: 120 req/min
}

const hits = new Map<string, number[]>()

function isRateLimited(ip: string, path: string): boolean {
  const rule = Object.entries(RATE_LIMITS).find(([prefix]) => path.startsWith(prefix))
  if (!rule) return false

  const [prefix, { windowMs, max }] = rule
  const key = `${ip}:${prefix}`
  const now = Date.now()
  const window = (hits.get(key) ?? []).filter(t => now - t < windowMs)
  window.push(now)
  hits.set(key, window)
  return window.length > max
}

// ── Protected routes ──────────────────────────────────────────────────────────

const PROTECTED = [
  '/dashboard',
  '/lessons',
  '/profile',
  '/teams',
  '/certificates',
  '/leaderboard',
  '/checkout',
  '/admin',
]

const ADMIN_ONLY = ['/admin']

const ADMIN_EMAILS = (process.env.NEXT_PUBLIC_ADMIN_EMAILS ?? '').split(',').map(e => e.trim())

function isProtected(path: string) {
  return PROTECTED.some(p => path === p || path.startsWith(p + '/'))
}

function isAdminOnly(path: string) {
  return ADMIN_ONLY.some(p => path === p || path.startsWith(p + '/'))
}

// ── Middleware ────────────────────────────────────────────────────────────────

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? '0.0.0.0'

  // Rate limit API routes
  if (pathname.startsWith('/api/') && isRateLimited(ip, pathname)) {
    return new NextResponse('Too Many Requests', {
      status: 429,
      headers: { 'Retry-After': '60' },
    })
  }

  // Only check auth for protected pages (not API routes — those self-auth)
  if (!isProtected(pathname)) return NextResponse.next()

  // Supabase session check
  const res = NextResponse.next()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => req.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) => {
            req.cookies.set(name, value)
            res.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    const loginUrl = req.nextUrl.clone()
    loginUrl.pathname = '/'
    loginUrl.searchParams.set('signin', '1')
    loginUrl.searchParams.set('next', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Admin gate
  if (isAdminOnly(pathname) && !ADMIN_EMAILS.includes(user.email ?? '')) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  return res
}

export const config = {
  matcher: [
    '/api/:path*',
    '/dashboard/:path*',
    '/lessons/:path*',
    '/profile/:path*',
    '/teams/:path*',
    '/certificates/:path*',
    '/leaderboard/:path*',
    '/checkout/:path*',
    '/admin/:path*',
  ],
}
