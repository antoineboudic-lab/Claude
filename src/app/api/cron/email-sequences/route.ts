import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import {
  sendWelcomeEmail,
  sendActivationEmail,
  sendUpgradeEmail,
} from '@/lib/growth/email'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const BATCH_SIZE = 500

// Runs daily at 9 AM UTC.
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
  const today = now.toISOString().split('T')[0]

  const stats = { welcome: 0, activation: 0, upgrade: 0, skipped: 0 }

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
      user_id: userId, email, sequence, step: 1, status: 'sent',
      sent_at: new Date().toISOString(),
    })
  }

  // ── 1. WELCOME ─────────────────────────────────────────────────────────────
  // Users who completed the assessment in the last 24h, not yet welcomed.
  // Naturally bounded to ~24h of signups — no pagination needed.
  {
    const { data: recentAssessments } = await admin
      .from('user_assessments')
      .select('user_id, primary_track_id, created_at')
      .gte('created_at', oneDayAgo)
      .order('created_at', { ascending: false })

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
        if (ok) { await log(assessment.user_id, user.email, 'welcome'); stats.welcome++ }
        else stats.skipped++
      } catch { stats.skipped++ }
    }
  }

  // ── 2. ACTIVATION ──────────────────────────────────────────────────────────
  // Signed up 1-3 days ago, no lessons completed, no activation email yet.
  // Paginate listUsers to handle 100k+ accounts.
  {
    // Fetch all users with no completed lessons (batched)
    const inactiveUserIds = new Set<string>()
    let offset = 0
    while (true) {
      const { data } = await admin
        .from('user_progress')
        .select('user_id')
        .or('completed_lessons.is.null,completed_lessons.eq.{}')
        .range(offset, offset + BATCH_SIZE - 1)
      if (!data?.length) break
      data.forEach(p => inactiveUserIds.add(p.user_id))
      if (data.length < BATCH_SIZE) break
      offset += BATCH_SIZE
    }

    // Paginate auth users list
    let page = 1
    while (true) {
      const { data: listData } = await admin.auth.admin.listUsers({ perPage: 1000, page })
      const users = listData?.users ?? []
      if (!users.length) break

      const candidates = users.filter(u => {
        if (!u.created_at) return false
        const ageDays = (now.getTime() - new Date(u.created_at).getTime()) / 86400000
        return ageDays >= 1 && ageDays < 4 && inactiveUserIds.has(u.id)
      })

      for (const user of candidates) {
        try {
          if (await alreadySent(user.id, 'activation')) { stats.skipped++; continue }
          const name = (user.user_metadata as { full_name?: string })?.full_name?.split(' ')[0]
            ?? user.email?.split('@')[0] ?? 'there'
          if (!user.email) { stats.skipped++; continue }
          const ok = await sendActivationEmail(user.email, name)
          if (ok) { await log(user.id, user.email, 'activation'); stats.activation++ }
          else stats.skipped++
        } catch { stats.skipped++ }
      }

      const nextPage = 'nextPage' in (listData ?? {}) ? (listData as { nextPage?: number }).nextPage : undefined
      if (!nextPage) break
      page++
    }
  }

  // ── 3. UPGRADE ─────────────────────────────────────────────────────────────
  // Completed ≥1 track, no active/trialing subscription, no upgrade email yet.
  // Fetch active subscriptions once, then paginate user_progress.
  {
    const { data: activeSubs } = await admin
      .from('subscriptions')
      .select('user_id')
      .in('status', ['active', 'trialing'])
    const subscribedIds = new Set((activeSubs ?? []).map(s => s.user_id))

    let offset = 0
    while (true) {
      const { data } = await admin
        .from('user_progress')
        .select('user_id, completed_tracks')
        .not('completed_tracks', 'is', null)
        .not('completed_tracks', 'eq', '{}')
        .range(offset, offset + BATCH_SIZE - 1)

      if (!data?.length) break

      const candidates = data.filter(p => !subscribedIds.has(p.user_id))

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
          if (ok) { await log(row.user_id, user.email, 'upgrade'); stats.upgrade++ }
          else stats.skipped++
        } catch { stats.skipped++ }
      }

      if (data.length < BATCH_SIZE) break
      offset += BATCH_SIZE
    }
  }

  console.log(`[cron/email-sequences] date=${today}`, stats)
  return NextResponse.json(stats)
}
