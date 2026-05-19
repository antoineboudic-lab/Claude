import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { sendReengagementEmail } from '@/lib/growth/email'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  // Validate cron secret (Vercel sets Authorization: Bearer <CRON_SECRET>)
  const auth = req.headers.get('authorization')
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } },
  )

  const today = new Date().toISOString().split('T')[0]
  const sevenDaysAgo = new Date(Date.now() - 7 * 86400000).toISOString().split('T')[0]

  // Users with streak > 0, last active at least 7 days ago (re-engagement)
  const { data: staleUsers, error } = await supabase
    .from('user_progress')
    .select('user_id, streak, completed_lessons')
    .gt('streak', 0)
    .lte('last_active_date', sevenDaysAgo)

  if (error) {
    console.error('[cron/reminders] query error', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  if (!staleUsers || staleUsers.length === 0) {
    return NextResponse.json({ sent: 0, skipped: 0 })
  }

  // Fetch auth user emails in batches of 50
  let sent = 0
  let skipped = 0

  for (const row of staleUsers) {
    try {
      const { data: { user }, error: userErr } = await supabase.auth.admin.getUserById(row.user_id)
      if (userErr || !user?.email) { skipped++; continue }

      const name = user.user_metadata?.full_name?.split(' ')[0] ?? user.email.split('@')[0]
      const lessonsLeft = Math.max(0, 20 - (row.completed_lessons?.length ?? 0))

      const ok = await sendReengagementEmail(user.email, name, row.streak ?? 0, lessonsLeft)
      if (ok) sent++
      else skipped++

      // Also send a push notification if VAPID keys are configured
      if (process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY && process.env.VAPID_PRIVATE_KEY) {
        const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ai-literacy-tau.vercel.app'
        fetch(`${BASE_URL}/api/push/send`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', authorization: `Bearer ${process.env.CRON_SECRET}` },
          body: JSON.stringify({
            userId: row.user_id,
            payload: {
              title: `Hey ${name} — keep your streak alive 🔥`,
              body: `You've been away for a week. Jump back in — ${lessonsLeft} lessons left in your track.`,
              url: '/dashboard',
            },
          }),
        }).catch(() => {})
      }
    } catch {
      skipped++
    }
  }

  console.log(`[cron/reminders] sent=${sent} skipped=${skipped} date=${today}`)
  return NextResponse.json({ sent, skipped })
}
