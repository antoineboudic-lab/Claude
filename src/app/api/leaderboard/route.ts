import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { createSupabaseServerClient } from '@/lib/supabase/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

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
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

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

  const userResults = await Promise.all(rows.map(row => admin.auth.admin.getUserById(row.user_id)))

  const entries: LeaderboardEntry[] = rows.map((row, i) => {
    const u = userResults[i].data?.user
    const fullName =
      (u?.user_metadata as { full_name?: string } | undefined)?.full_name ??
      u?.email?.split('@')[0] ??
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

  return NextResponse.json(entries)
}
