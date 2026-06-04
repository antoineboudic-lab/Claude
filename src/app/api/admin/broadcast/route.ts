import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { Resend } from 'resend'

export const runtime = 'nodejs'

const ADMIN_EMAILS = (process.env.NEXT_PUBLIC_ADMIN_EMAILS ?? '')
  .split(',').map(e => e.trim().toLowerCase()).filter(Boolean)

// ── Auth helper ───────────────────────────────────────────────────────────────

async function requireAdmin(): Promise<{ email: string } | NextResponse> {
  const supabase = await createSupabaseServerClient()
  const { data: { session } } = await supabase.auth.getSession()
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const email = (session.user.email ?? '').toLowerCase()
  if (!ADMIN_EMAILS.includes(email)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 401 })
  }
  return { email }
}

// ── POST /api/admin/broadcast ─────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  const authResult = await requireAdmin()
  if (authResult instanceof NextResponse) return authResult

  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const { type } = body

  // ── Email blast ─────────────────────────────────────────────────────────────
  if (type === 'email') {
    const subject = typeof body.subject === 'string' ? body.subject.trim() : ''
    const messageBody = typeof body.body === 'string' ? body.body.trim() : ''
    const audience = typeof body.audience === 'string' ? body.audience : 'all'

    if (!subject || !messageBody) {
      return NextResponse.json({ error: 'subject and body are required' }, { status: 400 })
    }

    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: 'Email sending not configured' }, { status: 503 })
    }

    const admin = createAdminClient()

    // Fetch all users
    const { data: listData, error: listError } = await admin.auth.admin.listUsers({ perPage: 1000 })
    if (listError) {
      return NextResponse.json({ error: listError.message }, { status: 500 })
    }
    const allUsers = listData?.users ?? []

    // Filter by audience
    let targetEmails: string[]

    if (audience === 'active7d' || audience === 'active30d') {
      const days = audience === 'active7d' ? 7 : 30
      const cutoff = new Date(Date.now() - days * 86400000).toISOString().split('T')[0]
      const { data: progressRows } = await admin
        .from('user_progress')
        .select('user_id, last_active_date')
        .gte('last_active_date', cutoff)

      const activeUserIds = new Set((progressRows ?? []).map((r: { user_id: string }) => r.user_id))
      targetEmails = allUsers
        .filter(u => activeUserIds.has(u.id) && u.email)
        .map(u => u.email as string)
    } else {
      // 'all' — everyone with an email
      targetEmails = allUsers.filter(u => u.email).map(u => u.email as string)
    }

    if (targetEmails.length === 0) {
      return NextResponse.json({ sent: 0 })
    }

    const resend = new Resend(apiKey)

    // Resend batch limit is 100 per call
    const BATCH_SIZE = 100
    const from = process.env.RESEND_FROM_EMAIL ?? 'OpusLearn <hello@opuslearn.ai>'
    let sent = 0

    const htmlBody = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>${subject}</title></head>
<body style="font-family: -apple-system, sans-serif; color: #0F172A; background: #F1F5F9; margin: 0; padding: 40px 0;">
  <div style="max-width: 560px; margin: 0 auto; background: #FFFFFF; border-radius: 16px; padding: 40px; border: 1px solid #E2E8F0;">
    <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 32px;">
      <span style="font-size: 16px; font-weight: 800; color: #0F172A;">OpusLearn</span>
    </div>
    <h1 style="font-size: 22px; font-weight: 800; color: #0F172A; margin: 0 0 20px; letter-spacing: -0.02em;">${subject.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')}</h1>
    <div style="font-size: 15px; line-height: 1.7; color: #475569; white-space: pre-wrap;">${messageBody.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>
    <div style="margin-top: 40px; padding-top: 24px; border-top: 1px solid #F1F5F9; font-size: 12px; color: #CBD5E1;">
      You received this because you have an account on OpusLearn.
    </div>
  </div>
</body>
</html>`

    for (let i = 0; i < targetEmails.length; i += BATCH_SIZE) {
      const chunk = targetEmails.slice(i, i + BATCH_SIZE)
      try {
        await resend.batch.send(
          chunk.map(to => ({ from, to, subject, html: htmlBody }))
        )
        sent += chunk.length
      } catch (err) {
        console.error('[admin/broadcast] resend batch error', err)
        return NextResponse.json({ error: 'Failed to send emails', sent }, { status: 500 })
      }
    }

    return NextResponse.json({ sent })
  }

  // ── Push notification ───────────────────────────────────────────────────────
  if (type === 'push') {
    const title = typeof body.title === 'string' ? body.title.trim() : ''
    const pushBody = typeof body.body === 'string' ? body.body.trim() : ''
    const url = typeof body.url === 'string' && body.url.trim() ? body.url.trim() : undefined

    if (!title || !pushBody) {
      return NextResponse.json({ error: 'title and body are required' }, { status: 400 })
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
    const cronSecret = process.env.CRON_SECRET

    if (!cronSecret) {
      return NextResponse.json({ error: 'Push sending not configured' }, { status: 503 })
    }

    const pushRes = await fetch(`${siteUrl}/api/push/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cronSecret}`,
      },
      body: JSON.stringify({ payload: { title, body: pushBody, url } }),
    })

    if (!pushRes.ok) {
      const err = await pushRes.json().catch(() => ({ error: `HTTP ${pushRes.status}` }))
      return NextResponse.json({ error: err.error ?? 'Push send failed' }, { status: 500 })
    }

    const pushData = await pushRes.json()
    return NextResponse.json({ sent: pushData.sent ?? 0 })
  }

  return NextResponse.json({ error: 'type must be "email" or "push"' }, { status: 400 })
}
