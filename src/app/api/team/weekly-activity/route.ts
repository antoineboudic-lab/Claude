import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function GET(req: NextRequest) {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const teamId = new URL(req.url).searchParams.get('teamId')
  if (!teamId) return NextResponse.json({ error: 'Missing teamId' }, { status: 400 })

  const { data: team } = await supabase
    .from('teams').select('id').eq('id', teamId).eq('created_by', user.id).single()
  if (!team) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const admin = createAdminClient()

  const { data: members } = await admin
    .from('team_members')
    .select('user_id')
    .eq('team_id', teamId)
    .eq('status', 'active')
    .not('user_id', 'is', null)

  if (!members?.length) return NextResponse.json({ buckets: [], total: 0 })

  const userIds = members.map(m => m.user_id as string)

  const { data: progress } = await admin
    .from('user_progress')
    .select('user_id, updated_at')
    .in('user_id', userIds)

  const now = Date.now()
  const DAY = 86400000
  const activeIds = new Set((progress ?? []).map(p => p.user_id as string))

  let thisWeek = 0, lastWeek = 0, thisMonth = 0, older = 0

  for (const p of (progress ?? [])) {
    const age = now - new Date(p.updated_at).getTime()
    if (age < 7 * DAY) thisWeek++
    else if (age < 14 * DAY) lastWeek++
    else if (age < 30 * DAY) thisMonth++
    else older++
  }

  const neverStarted = userIds.filter(id => !activeIds.has(id)).length

  return NextResponse.json({
    buckets: [
      { label: 'Active this week', count: thisWeek, color: '#10B981' },
      { label: 'Active last week', count: lastWeek, color: '#7C3AED' },
      { label: 'Active this month', count: thisMonth, color: '#F59E0B' },
      { label: 'Inactive (30+ days)', count: older, color: '#E2E8F0' },
      { label: 'Never started', count: neverStarted, color: '#FCA5A5' },
    ],
    total: members.length,
  })
}
