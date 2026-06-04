import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { Resend } from 'resend'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Alert thresholds — warn before hitting the hard limits
const SUPABASE_FREE_MB = 500
const SUPABASE_ALERT_MB = 400        // alert at 80%
const RESEND_FREE_MONTHLY = 3000
const RESEND_ALERT_COUNT = 2400      // alert at 80%

const resend = new Resend(process.env.RESEND_API_KEY)
const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAILS?.split(',')[0]?.trim() ?? ''

export async function GET(req: Request) {
  const auth = req.headers.get('authorization')
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const admin = createAdminClient()
  const alerts: string[] = []

  // ── 1. Supabase DB size ────────────────────────────────────────────────────
  try {
    const { data, error } = await admin.rpc('get_db_size_mb')
    if (!error && data != null) {
      const sizeMb = Math.round(data)
      console.log(`[usage-alerts] DB size: ${sizeMb}MB / ${SUPABASE_FREE_MB}MB`)
      if (sizeMb >= SUPABASE_ALERT_MB) {
        alerts.push(`🗄️ Supabase DB: ${sizeMb}MB used of ${SUPABASE_FREE_MB}MB free tier limit (${Math.round(sizeMb / SUPABASE_FREE_MB * 100)}%). Upgrade to Pro at supabase.com.`)
      }
    }
  } catch (e) {
    console.error('[usage-alerts] DB size check failed', e)
  }

  // ── 2. Resend email volume (current calendar month) ────────────────────────
  try {
    const now = new Date()
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()
    const { count } = await admin
      .from('email_log')
      .select('*', { count: 'exact', head: true })
      .gte('sent_at', monthStart)

    const emailCount = count ?? 0
    console.log(`[usage-alerts] Emails this month: ${emailCount} / ${RESEND_FREE_MONTHLY}`)
    if (emailCount >= RESEND_ALERT_COUNT) {
      alerts.push(`📧 Resend: ${emailCount} emails sent this month of ${RESEND_FREE_MONTHLY} free tier limit (${Math.round(emailCount / RESEND_FREE_MONTHLY * 100)}%). Upgrade at resend.com/pricing.`)
    }
  } catch (e) {
    console.error('[usage-alerts] Email count check failed', e)
  }

  // ── Send alert email if any thresholds breached ────────────────────────────
  if (alerts.length > 0) {
    const body = alerts.join('\n\n')
    await resend.emails.send({
      from: 'OpusLearn Alerts <hello@opuslearn.ai>',
      to: ADMIN_EMAIL,
      subject: `⚠️ OpusLearn usage alert — action needed`,
      text: `Hi Antoine,\n\nOne or more service limits are approaching. Please take action to avoid service disruption.\n\n${body}\n\n— OpusLearn`,
      html: `<p>Hi Antoine,</p><p>One or more service limits are approaching. Please take action to avoid service disruption.</p>${alerts.map(a => `<p>${a}</p>`).join('')}<p>— OpusLearn</p>`,
    })
    console.log(`[usage-alerts] Alert sent: ${alerts.length} issue(s)`)
  }

  return NextResponse.json({ alerts: alerts.length, details: alerts })
}
