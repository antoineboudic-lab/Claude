import { createAdminClient } from '@/lib/supabase/admin'
import LeaderboardClient from './LeaderboardClient'
import type { LeaderboardEntry } from '@/app/api/leaderboard/route'

export const revalidate = 300

interface ProgressRow {
  user_id: string
  xp: number
  streak: number
  completed_lessons: string[]
  completed_tracks: string[]
  earned_badges: string[]
}

export default async function LeaderboardPage() {
  const admin = createAdminClient()

  const { data } = await admin
    .from('user_progress')
    .select('user_id, xp, streak, completed_lessons, completed_tracks, earned_badges')
    .order('xp', { ascending: false })
    .limit(20)

  const rows = (data ?? []) as ProgressRow[]
  const userResults = await Promise.all(rows.map(row => admin.auth.admin.getUserById(row.user_id)))

  const entries: LeaderboardEntry[] = rows.map((row, i) => {
    const user = userResults[i].data?.user
    const fullName =
      (user?.user_metadata as { full_name?: string } | undefined)?.full_name ??
      user?.email?.split('@')[0] ??
      'Learner'
    return {
      rank: i + 1,
      userId: row.user_id,
      name: fullName.split(' ')[0],
      xp: row.xp ?? 0,
      streak: row.streak ?? 0,
      lessons: (row.completed_lessons ?? []).length,
      tracks: (row.completed_tracks ?? []).length,
      badges: (row.earned_badges ?? []).length,
    }
  })

  return <LeaderboardClient entries={entries} />
}
