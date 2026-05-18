import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import {
  sendWelcomeEmail,
  sendActivationEmail,
  sendReengagementEmail,
  sendUpgradeEmail,
} from '@/lib/growth/email'

// Internal endpoint — secured by CRON_SECRET header
// Called by Vercel Cron jobs or Supabase webhooks

export async function POST(req: NextRequest) {
  const secret = req.headers.get('x-cron-secret')
  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: {
    sequence: 'welcome' | 'activation' | 'reengagement' | 'upgrade'
    userId?: string
    email?: string
    name?: string
    trackLabel?: string
    streak?: number
    lessonsLeft?: number
    completedTrack?: string
  }
  try { body = await req.json() } catch {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 })
  }

  const supabase = createAdminClient()
  const { sequence, email, name = 'there', userId } = body
  if (!email) return NextResponse.json({ error: 'email required' }, { status: 400 })

  let ok = false
  if (sequence === 'welcome') {
    ok = await sendWelcomeEmail(email, name, body.trackLabel ?? 'AI')
  } else if (sequence === 'activation') {
    ok = await sendActivationEmail(email, name)
  } else if (sequence === 'reengagement') {
    ok = await sendReengagementEmail(email, name, body.streak ?? 0, body.lessonsLeft ?? 5)
  } else if (sequence === 'upgrade') {
    ok = await sendUpgradeEmail(email, name, body.completedTrack ?? 'your first track')
  }

  if (ok && userId) {
    await supabase.from('email_log').insert({
      user_id: userId,
      email,
      sequence,
      step: 1,
      status: 'sent',
    })
  }

  return NextResponse.json({ ok })
}
