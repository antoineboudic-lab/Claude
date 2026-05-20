import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { createInvite } from '@/lib/supabase/teams'
import { sendTeamInviteEmail } from '@/lib/growth/email'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { teamId, email, assignedTracks } = await req.json()
  if (!teamId || !email) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })

  const { data: membership } = await supabase
    .from('team_members')
    .select('id')
    .eq('team_id', teamId)
    .eq('user_id', user.id)
    .eq('role', 'admin')
    .single()

  if (!membership) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const invite = await createInvite(teamId, email, assignedTracks ?? [], user.id)
  if (!invite) return NextResponse.json({ error: 'Failed to create invite' }, { status: 500 })

  const { data: teamRow } = await supabase.from('teams').select('name').eq('id', teamId).single()
  const teamName = (teamRow as { name: string } | null)?.name ?? 'Your team'

  const inviterName = user.user_metadata?.full_name ?? user.email?.split('@')[0] ?? 'Your team admin'
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://opuslearn.ai'
  const joinUrl = `${siteUrl}/join/${invite.token}`

  const emailSent = await sendTeamInviteEmail(email, inviterName, teamName, joinUrl, assignedTracks)

  return NextResponse.json({ ok: true, token: invite.token, emailSent })
}
