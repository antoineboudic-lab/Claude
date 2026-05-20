import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import {
  sendWelcomeEmail,
  sendActivationEmail,
  sendUpgradeEmail,
} from '@/lib/growth/email'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// ── Runs daily at 9 AM UTC.
// Handles three lifecycle stages per user (each fires at most once):
//   welcome     – day 0: new users who took the assessment
//   activation  – day 1-3: signed up but no lesson completed yet
//   upgrade     – any day: completed ≥1 track, no active subscription

export async function GET(req: Request) {
  const auth = req.headers.get('authorization')
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const admin = createAdminClient()
  const now = new Date()
  const oneDayAgo = new Date(now.getTime() - 1 * 86400000).toISOString()
  const threeDaysAgo = new Date(now.getTime() - 3 * 86400000).toISOString()
  const today = now.toISOString().split('T')[0]

  const stats = { welcome: 0, activation: 0, upgrade: 0, skipped: 0 }

  // ── Helper: has a user already received a given sequence? ──────────────────
  async function alreadySent(userId: string, sequence: string): Promise<boolean> {
    const { count } = await admin
      .from('email_log')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('sequence', sequence)
    return (count ?? 0) > 0
  }

  async function log(userId: string, email: string, sequence: string) {
    await admin.from('email_log').insert({
      user_id: userId,
      email,
      sequence,
      step: 1,
      status: 'sent',
      sent_at: new Date().toISOString(),
    })
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 1. WELCOME — users who completed the assessment today and haven't been
  //    welcomed yet. We use the assessment table as the trigger because an
  //    assessment means they know their track, so the email can name it.
  // ─────────────────────────────────────────────────────────────────────────
  {
    const { data: recentAssessments } = await admin
      .from('user_assessments')
      .select('user_id, primary_track_id, created_at')
      .gte('created_at', oneDayAgo)
      .order('created_at', { ascending: false })

    // Deduplicate: one welcome per user (use their latest track)
    const seen = new Set<string>()
    const toWelcome = (recentAssessments ?? []).filter(a => {
      if (seen.has(a.user_id)) return false
      seen.add(a.user_id)
      return true
    })

    for (const assessment of toWelcome) {
      try {
        if (await alreadySent(assessment.user_id, 'welcome')) { stats.skipped++; continue }

        const { data: { user } } = await admin.auth.admin.getUserById(assessment.user_id)
        if (!user?.email) { stats.skipped++; continue }

        const name = (user.user_metadata as { full_name?: string })?.full_name?.split(' ')[0]
          ?? user.email.split('@')[0]
        const trackLabel = assessment.primary_track_id.charAt(0).toUpperCase()
          + assessment.primary_track_id.slice(1)

        const ok = await sendWelcomeEmail(user.email, name, trackLabel)
        if (ok) {
          await log(assessment.user_id, user.email, 'welcome')
          stats.welcome++
        } else {
          stats.skipped++
        }
      } catch {
        stats.skipped++
      }
    }
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 2. ACTIVATION — signed up 1-3 days ago, no lessons completed, no
  //    activation email yet. Nudge them to start their first lesson.
  // ─────────────────────────────────────────────────────────────────────────
  {
    // Users with no completed lessons
    const { data: inactiveProgress } = await admin
      .from('user_progress')
      .select('user_id, completed_lessons')
      .or('completed_lessons.is.null,completed_lessons.eq.{}')

    const inactiveUserIds = new Set((inactiveProgress ?? []).map(p => p.user_id))

    const { data: listData } = await admin.auth.admin.listUsers({ perPage: 1000 })
    const candidates = (listData?.users ?? []).filter(u => {
      if (!u.created_at) return false
      const age = now.getTime() - new Date(u.created_at).getTime()
      const days = age / 86400000
      return days >= 1 && days < 4 && inactiveUserIds.has(u.id)
    })

    for (const user of candidates) {
      try {
        if (await alreadySent(user.id, 'activation')) { stats.skipped++; continue }

        const name = (user.user_metadata as { full_name?: string })?.full_name?.split(' ')[0]
          ?? user.email?.split('@')[0] ?? 'there'

        if (!user.email) { stats.skipped++; continue }

        const ok = await sendActivationEmail(user.email, name)
        if (ok) {
          await log(user.id, user.email, 'activation')
          stats.activation++
        } else {
          stats.skipped++
        }
      } catch {
        stats.skipped++
      }
    }
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 3. UPGRADE — completed ≥1 track, no active/trialing subscription, no
  //    upgrade email yet. Prompt them to go Pro.
  // ─────────────────────────────────────────────────────────────────────────
  {
    // Users who completed at least one track
    const { data: progressWithTrack } = await admin
      .from('user_progress')
      .select('user_id, completed_tracks')
      .not('completed_tracks', 'is', null)
      .not('completed_tracks', 'eq', '{}')

    if (progressWithTrack && progressWithTrack.length > 0) {
      // Exclude users with an active or trialing subscription
      const { data: activeSubs } = await admin
        .from('subscriptions')
        .select('user_id')
        .in('status', ['active', 'trialing'])

      const subscribedIds = new Set((activeSubs ?? []).map(s => s.user_id))

      const candidates = progressWithTrack.filter(p => !subscribedIds.has(p.user_id))

      for (const row of candidates) {
        try {
          if (await alreadySent(row.user_id, 'upgrade')) { stats.skipped++; continue }

          const { data: { user } } = await admin.auth.admin.getUserById(row.user_id)
          if (!user?.email) { stats.skipped++; continue }

          const name = (user.user_metadata as { full_name?: string })?.full_name?.split(' ')[0]
            ?? user.email.split('@')[0]
          const completedTrack = (row.completed_tracks as string[])[0] ?? 'your first track'
          const trackLabel = completedTrack.charAt(0).toUpperCase() + completedTrack.slice(1)

          const ok = await sendUpgradeEmail(user.email, name, trackLabel)
          if (ok) {
            await log(row.user_id, user.email, 'upgrade')
            stats.upgrade++
          } else {
            stats.skipped++
          }
        } catch {
          stats.skipped++
        }
      }
    }
  }

  console.log(`[cron/email-sequences] date=${today}`, stats)
  return NextResponse.json(stats)
}
