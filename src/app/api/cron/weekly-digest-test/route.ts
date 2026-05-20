import { createHmac } from 'crypto'
import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { sendWeeklyDigestEmail } from '@/lib/growth/email'

export const runtime = 'nodejs'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://opuslearn.ai'

// POST /api/cron/weekly-digest-test
// Body: { email: string } — sends a sample digest to that address
// Secured by CRON_SECRET (Authorization: Bearer <secret>)
export async function POST(req: NextRequest) {
  const auth = req.headers.get('authorization')
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { email } = await req.json().catch(() => ({}))
  if (!email) return NextResponse.json({ error: 'email required' }, { status: 400 })

  const supabase = createAdminClient()

  // Look up user by email
  const { data: { users } } = await supabase.auth.admin.listUsers()
  const authUser = users.find(u => u.email === email)

  const userId = authUser?.id ?? 'test-user'
  const token = createHmac('sha256', process.env.CRON_SECRET ?? 'dev').update(userId).digest('hex')

  const ok = await sendWeeklyDigestEmail(email, authUser?.user_metadata?.full_name?.split(' ')[0] ?? 'there', {
    thisWeekLessons: 3,
    totalLessons: 12,
    streak: 5,
    srDue: 2,
    trackLabel: 'Marketing',
    nextLessonTitle: 'AI-powered audience segmentation',
    nextLessonUrl: `${BASE_URL}/tracks/marketing/lessons/marketing-m3-l2`,
    unsubscribeUrl: `${BASE_URL}/api/unsubscribe?u=${userId}&t=${token}`,
  })

  return NextResponse.json({ ok, to: email })
}
