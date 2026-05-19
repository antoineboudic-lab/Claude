import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { sendWeeklyDigestEmail } from '@/lib/growth/email'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  const auth = req.headers.get('authorization')
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } },
  )

  const thirtyDaysAgo = new Date(Date.now() - 30 * 86400000).toISOString().split('T')[0]

  // Active users in the last 30 days
  const { data: activeUsers, error } = await supabase
    .from('user_progress')
    .select('user_id, streak, completed_lessons, sr_queue')
    .gte('last_active_date', thirtyDaysAgo)

  if (error) {
    console.error('[cron/weekly-digest] query error', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  if (!activeUsers || activeUsers.length === 0) {
    return NextResponse.json({ sent: 0, skipped: 0 })
  }

  let sent = 0
  let skipped = 0

  for (const row of activeUsers) {
    try {
      const { data: { user }, error: userErr } = await supabase.auth.admin.getUserById(row.user_id)
      if (userErr || !user?.email) { skipped++; continue }

      const name = user.user_metadata?.full_name?.split(' ')[0] ?? user.email.split('@')[0]
      const totalLessons = row.completed_lessons?.length ?? 0
      const streak = row.streak ?? 0

      // Count SR cards due today
      let srDue = 0
      try {
        const today = new Date().toISOString().split('T')[0]
        const queue = Array.isArray(row.sr_queue) ? row.sr_queue : []
        srDue = queue.filter((c: { nextReviewDate?: string | null }) =>
          !c.nextReviewDate || c.nextReviewDate <= today
        ).length
      } catch {}

      const ok = await sendWeeklyDigestEmail(user.email, name, { totalLessons, streak, srDue })
      if (ok) sent++
      else skipped++
    } catch {
      skipped++
    }
  }

  console.log(`[cron/weekly-digest] sent=${sent} skipped=${skipped}`)
  return NextResponse.json({ sent, skipped })
}
