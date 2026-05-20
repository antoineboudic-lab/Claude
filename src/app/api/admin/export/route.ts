import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'

export const runtime = 'nodejs'

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS ?? 'antoine.boudic@gmail.com')
  .split(',').map(e => e.trim().toLowerCase()).filter(Boolean)

// ── Auth helper ───────────────────────────────────────────────────────────────

async function requireAdmin(): Promise<NextResponse | null> {
  const supabase = await createSupabaseServerClient()
  const { data: { session } } = await supabase.auth.getSession()
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const email = (session.user.email ?? '').toLowerCase()
  if (!ADMIN_EMAILS.includes(email)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 401 })
  }
  return null
}

// ── CSV helpers ───────────────────────────────────────────────────────────────

function csvEscape(value: string | number | boolean | null | undefined): string {
  if (value === null || value === undefined) return ''
  const s = String(value)
  // Quote if contains comma, double-quote, or newline
  if (s.includes(',') || s.includes('"') || s.includes('\n')) {
    return `"${s.replace(/"/g, '""')}"`
  }
  return s
}

function toCSV(headers: string[], rows: (string | number | boolean | null | undefined)[][]): string {
  const lines = [
    headers.map(csvEscape).join(','),
    ...rows.map(row => row.map(csvEscape).join(',')),
  ]
  return lines.join('\n')
}

function fmt(d: string | null | undefined): string {
  if (!d) return ''
  return new Date(d).toISOString().split('T')[0]
}

// ── GET /api/admin/export ─────────────────────────────────────────────────────

export async function GET(req: NextRequest) {
  const authError = await requireAdmin()
  if (authError) return authError

  const { searchParams } = new URL(req.url)
  const type = searchParams.get('type')

  if (type !== 'users' && type !== 'leads') {
    return NextResponse.json({ error: 'type must be "users" or "leads"' }, { status: 400 })
  }

  const admin = createAdminClient()
  const today = new Date().toISOString().split('T')[0]

  // ── Users export ────────────────────────────────────────────────────────────
  if (type === 'users') {
    const [
      { data: listData, error: listError },
      { data: progressRows },
      { data: assessmentRows },
    ] = await Promise.all([
      admin.auth.admin.listUsers({ perPage: 1000 }),
      admin.from('user_progress').select('user_id, xp, streak, last_active_date, completed_lessons, completed_tracks, earned_badges, updated_at'),
      admin.from('user_assessments').select('user_id, primary_track_id, created_at').order('created_at', { ascending: false }),
    ])

    if (listError) {
      return NextResponse.json({ error: listError.message }, { status: 500 })
    }

    const users = listData?.users ?? []
    const progressById = Object.fromEntries(
      (progressRows ?? []).map((p: { user_id: string; xp: number; streak: number; last_active_date: string | null; completed_lessons: string[]; completed_tracks: string[]; earned_badges: string[]; updated_at: string }) => [p.user_id, p])
    )
    // Latest assessment per user (rows ordered newest-first)
    const trackByUser: Record<string, string> = {}
    ;(assessmentRows ?? []).forEach((a: { user_id: string; primary_track_id: string }) => {
      if (!trackByUser[a.user_id]) trackByUser[a.user_id] = a.primary_track_id
    })

    const headers = ['name', 'email', 'track', 'xp', 'lessons', 'streak', 'badges', 'last_active', 'joined']
    const rows = users.map(u => {
      const p = progressById[u.id]
      const name = (u.user_metadata as { full_name?: string })?.full_name ?? u.email?.split('@')[0] ?? ''
      return [
        name,
        u.email ?? '',
        trackByUser[u.id] ?? '',
        p?.xp ?? 0,
        p?.completed_lessons?.length ?? 0,
        p?.streak ?? 0,
        p?.earned_badges?.length ?? 0,
        p?.last_active_date ?? '',
        fmt(u.created_at),
      ]
    })

    const csv = toCSV(headers, rows)
    return new Response(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="users-${today}.csv"`,
      },
    })
  }

  // ── Leads export ────────────────────────────────────────────────────────────
  if (type === 'leads') {
    const { data: leads, error: leadsError } = await admin
      .from('leads')
      .select('email, source, role, converted_at, created_at')
      .order('created_at', { ascending: false })

    if (leadsError) {
      return NextResponse.json({ error: leadsError.message }, { status: 500 })
    }

    const headers = ['email', 'source', 'role', 'converted', 'captured_at']
    const rows = (leads ?? []).map((l: { email: string; source: string | null; role: string | null; converted_at: string | null; created_at: string }) => [
      l.email,
      l.source ?? '',
      l.role ?? '',
      l.converted_at ? 'yes' : 'no',
      fmt(l.created_at),
    ])

    const csv = toCSV(headers, rows)
    return new Response(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="leads-${today}.csv"`,
      },
    })
  }

  // Should never reach here
  return NextResponse.json({ error: 'Invalid type' }, { status: 400 })
}
