import { createHmac } from 'crypto'
import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { sendWeeklyDigestEmail } from '@/lib/growth/email'
import { getTrack } from '@/lib/curriculum'
import type { TrackId } from '@/lib/curriculum/types'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://opuslearn.ai'

function makeUnsubToken(userId: string): string {
  return createHmac('sha256', process.env.CRON_SECRET ?? 'dev').update(userId).digest('hex')
}

export async function GET(req: Request) {
  const auth = req.headers.get('authorization')
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createAdminClient()

  const thirtyDaysAgo = new Date(Date.now() - 30 * 86400_000).toISOString()
  const sixDaysAgo = new Date(Date.now() - 6 * 86400_000).toISOString()

  // Active users, digest not opted out, not already sent this week
  const { data: rows, error } = await supabase
    .from('user_progress')
    .select('user_id, streak, completed_lessons, sr_queue, last_digest_at, last_digest_lesson_count')
    .eq('digest_opt_out', false)
    .gte('last_active_date', thirtyDaysAgo.split('T')[0])
    .or(`last_digest_at.is.null,last_digest_at.lt.${sixDaysAgo}`)

  if (error) {
    console.error('[cron/weekly-digest]', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  if (!rows?.length) return NextResponse.json({ sent: 0, skipped: 0 })

  let sent = 0
  let skipped = 0
  const today = new Date().toISOString().split('T')[0]

  for (const row of rows) {
    try {
      const { data: { user }, error: authErr } = await supabase.auth.admin.getUserById(row.user_id)
      if (authErr || !user?.email) { skipped++; continue }

      const name = user.user_metadata?.full_name?.split(' ')[0] ?? user.email.split('@')[0]
      const completedCount = row.completed_lessons?.length ?? 0
      const lastCount = row.last_digest_lesson_count ?? 0
      const thisWeekLessons = Math.max(0, completedCount - lastCount)
      const streak = row.streak ?? 0

      // Count SR cards due today
      let srDue = 0
      try {
        const queue = Array.isArray(row.sr_queue) ? row.sr_queue : []
        srDue = queue.filter((c: { nextReviewDate?: string | null }) =>
          !c.nextReviewDate || c.nextReviewDate <= today
        ).length
      } catch { /* ignore */ }

      // Look up their track for track label + next lesson
      let trackLabel: string | undefined
      let nextLessonTitle: string | undefined
      let nextLessonUrl: string | undefined

      const { data: assessment } = await supabase
        .from('user_assessments')
        .select('primary_track_id')
        .eq('user_id', row.user_id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single()

      if (assessment?.primary_track_id) {
        const trackId = assessment.primary_track_id as TrackId
        const track = getTrack(trackId)
        if (track) {
          trackLabel = track.title
          // Find first lesson the user hasn't completed
          const completed = new Set<string>(row.completed_lessons ?? [])
          outer: for (const mod of track.modules) {
            for (const lesson of mod.lessons) {
              if (!completed.has(lesson.id)) {
                nextLessonTitle = lesson.title
                nextLessonUrl = `${BASE_URL}/tracks/${trackId}/lessons/${lesson.id}`
                break outer
              }
            }
          }
        }
      }

      const unsubToken = makeUnsubToken(row.user_id)
      const unsubscribeUrl = `${BASE_URL}/api/unsubscribe?u=${row.user_id}&t=${unsubToken}`

      const ok = await sendWeeklyDigestEmail(user.email, name, {
        thisWeekLessons,
        totalLessons: completedCount,
        streak,
        srDue,
        trackLabel,
        nextLessonTitle,
        nextLessonUrl,
        unsubscribeUrl,
      })

      if (ok) {
        sent++
        // Update snapshot so next week's "this week" is accurate
        await supabase.from('user_progress').update({
          last_digest_at: new Date().toISOString(),
          last_digest_lesson_count: completedCount,
        }).eq('user_id', row.user_id)

        await supabase.from('email_log').insert({
          user_id: row.user_id,
          email: user.email,
          sequence: 'weekly-digest',
          step: 1,
          status: 'sent',
        })
      } else {
        skipped++
      }
    } catch (e) {
      console.error('[cron/weekly-digest] user error', e)
      skipped++
    }
  }

  console.log(`[cron/weekly-digest] sent=${sent} skipped=${skipped}`)
  return NextResponse.json({ sent, skipped })
}
