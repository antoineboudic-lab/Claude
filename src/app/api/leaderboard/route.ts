import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const revalidate = 300

interface ProgressRow {
  user_id: string
  xp: number
  streak: number
  completed_lessons: string[]
  completed_tracks: string[]
  earned_badges: string[]
}

export interface LeaderboardEntry {
  rank: number
  userId: string
  name: string
  xp: number
  streak: number
  lessons: number
  tracks: number
  badges: number
}

export async function GET() {
  const admin = createAdminClient()

  const { data, error } = await admin
    .from('user_progress')
    .select('user_id, xp, streak, completed_lessons, completed_tracks, earned_badges')
    .order('xp', { ascending: false })
    .limit(20)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const rows = (data ?? []) as ProgressRow[]

  const entries: LeaderboardEntry[] = []

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i]
    let name = 'Learner'

    const { data: userResult } = await admin.auth.admin.getUserById(row.user_id)
    const user = userResult?.user
    if (user) {
      const fullName =
        (user.user_metadata as { full_name?: string } | undefined)?.full_name ??
        user.email?.split('@')[0] ??
        'Learner'
      name = fullName.split(' ')[0]
    }

    entries.push({
      rank: i + 1,
      userId: row.user_id,
      name,
      xp: row.xp ?? 0,
      streak: row.streak ?? 0,
      lessons: (row.completed_lessons ?? []).length,
      tracks: (row.completed_tracks ?? []).length,
      badges: (row.earned_badges ?? []).length,
    })
  }

  return NextResponse.json(entries)
}
