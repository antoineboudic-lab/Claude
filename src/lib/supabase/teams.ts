import { createClient } from './client'

// ── Types ─────────────────────────────────────────────────────────────────────

export interface Team {
  id: string
  name: string
  plan: 'starter' | 'growth' | 'enterprise'
  created_by: string
  seat_limit: number
  created_at: string
}

export interface TeamMember {
  id: string
  team_id: string
  user_id: string | null
  email: string
  display_name: string | null
  role: 'admin' | 'member'
  assigned_tracks: string[]
  status: 'active' | 'pending'
  joined_at: string | null
  created_at: string
  // progress fields from team_member_progress view
  xp?: number
  streak?: number
  completed_lessons?: string[]
  completed_tracks?: string[]
  earned_badges?: string[]
  lesson_count?: number
}

export interface TeamInvite {
  id: string
  team_id: string
  email: string
  token: string
  assigned_tracks: string[]
  status: 'pending' | 'accepted' | 'expired'
  created_at: string
  expires_at: string
  // joined
  team?: { name: string }
}

// ── Team CRUD ─────────────────────────────────────────────────────────────────

export async function createTeam(userId: string, name: string, plan: Team['plan'] = 'starter'): Promise<Team | null> {
  const supabase = createClient()
  const seatLimits = { starter: 15, growth: 50, enterprise: 999 }

  const { data: team, error: teamErr } = await supabase
    .from('teams')
    .insert({ name, plan, created_by: userId, seat_limit: seatLimits[plan] })
    .select()
    .single()

  if (teamErr || !team) return null

  // Add creator as admin member
  await supabase.from('team_members').insert({
    team_id: team.id,
    user_id: userId,
    role: 'admin',
    status: 'active',
    joined_at: new Date().toISOString(),
  })

  return team as Team
}

export async function getAdminTeam(userId: string): Promise<Team | null> {
  const supabase = createClient()
  const { data } = await supabase
    .from('teams')
    .select('*')
    .eq('created_by', userId)
    .order('created_at', { ascending: false })
    .limit(1)
    .single()
  return (data as Team) ?? null
}

export async function getMemberTeam(userId: string): Promise<{ team: Team; member: TeamMember } | null> {
  const supabase = createClient()
  const { data } = await supabase
    .from('team_members')
    .select('*, teams(*)')
    .eq('user_id', userId)
    .eq('status', 'active')
    .limit(1)
    .single()
  if (!data) return null
  return { team: (data as Record<string, unknown>).teams as Team, member: data as unknown as TeamMember }
}

// ── Members ───────────────────────────────────────────────────────────────────

export async function getTeamMembersWithProgress(teamId: string): Promise<TeamMember[]> {
  const supabase = createClient()
  const { data } = await supabase
    .from('team_member_progress')
    .select('*')
    .eq('team_id', teamId)
    .order('xp', { ascending: false })
  return (data as TeamMember[]) ?? []
}

export async function updateMemberTracks(
  memberId: string,
  tracks: string[],
): Promise<void> {
  const supabase = createClient()
  await supabase
    .from('team_members')
    .update({ assigned_tracks: tracks })
    .eq('id', memberId)
}

export async function removeTeamMember(memberId: string): Promise<void> {
  const supabase = createClient()
  await supabase.from('team_members').delete().eq('id', memberId)
}

// ── Invites ───────────────────────────────────────────────────────────────────

export async function createInvite(
  teamId: string,
  email: string,
  assignedTracks: string[],
  invitedBy: string,
): Promise<TeamInvite | null> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('team_invites')
    .insert({ team_id: teamId, email, assigned_tracks: assignedTracks, invited_by: invitedBy })
    .select()
    .single()
  if (error) return null

  // Also create a pending member record
  await supabase.from('team_members').insert({
    team_id: teamId,
    email,
    assigned_tracks: assignedTracks,
    invited_by: invitedBy,
    status: 'pending',
    role: 'member',
  })

  return data as TeamInvite
}

export async function getInviteByToken(token: string): Promise<TeamInvite | null> {
  const supabase = createClient()
  const { data } = await supabase
    .from('team_invites')
    .select('*, teams(name)')
    .eq('token', token)
    .single()
  if (data) return data as TeamInvite
  // Fallback: fetch invite without join (handles anon access before policy is set)
  const { data: inv } = await supabase
    .from('team_invites')
    .select('*')
    .eq('token', token)
    .single()
  return (inv as TeamInvite) ?? null
}

export async function acceptInvite(token: string, userId: string, displayName: string, email: string): Promise<boolean> {
  const supabase = createClient()

  const invite = await getInviteByToken(token)
  if (!invite || invite.status !== 'pending') return false
  if (new Date(invite.expires_at) < new Date()) return false

  // Check if user is already in the team
  const { data: existing } = await supabase
    .from('team_members')
    .select('id')
    .eq('team_id', invite.team_id)
    .eq('user_id', userId)
    .limit(1)
    .single()

  if (existing) {
    // Already a member — just mark invite accepted
    await supabase.from('team_invites').update({ status: 'accepted' }).eq('token', token)
    return true
  }

  // Update the pending member record
  await supabase
    .from('team_members')
    .update({
      user_id: userId,
      display_name: displayName,
      status: 'active',
      joined_at: new Date().toISOString(),
    })
    .eq('team_id', invite.team_id)
    .eq('email', email)
    .eq('status', 'pending')

  // If no pending record existed, insert
  const { data: updated } = await supabase
    .from('team_members')
    .select('id')
    .eq('team_id', invite.team_id)
    .eq('user_id', userId)
    .single()

  if (!updated) {
    await supabase.from('team_members').insert({
      team_id: invite.team_id,
      user_id: userId,
      email,
      display_name: displayName,
      assigned_tracks: invite.assigned_tracks,
      status: 'active',
      role: 'member',
      joined_at: new Date().toISOString(),
    })
  }

  await supabase.from('team_invites').update({ status: 'accepted' }).eq('token', token)
  return true
}

export async function getTeamInvites(teamId: string): Promise<TeamInvite[]> {
  const supabase = createClient()
  const { data } = await supabase
    .from('team_invites')
    .select('*')
    .eq('team_id', teamId)
    .eq('status', 'pending')
    .order('created_at', { ascending: false })
  return (data as TeamInvite[]) ?? []
}

export async function revokeInvite(inviteId: string): Promise<void> {
  const supabase = createClient()
  await supabase.from('team_invites').update({ status: 'expired' }).eq('id', inviteId)
}

// ── Analytics helpers ─────────────────────────────────────────────────────────

export function getTeamStats(members: TeamMember[]) {
  const active = members.filter(m => m.status === 'active')
  const totalLessons = active.reduce((s, m) => s + (m.lesson_count ?? 0), 0)
  const totalXP = active.reduce((s, m) => s + (m.xp ?? 0), 0)
  const completedTracks = active.reduce((s, m) => s + (m.completed_tracks?.length ?? 0), 0)
  const avgLessons = active.length > 0 ? Math.round(totalLessons / active.length) : 0
  const activeThisWeek = active.filter(m => (m.xp ?? 0) > 0).length
  return { total: active.length, totalLessons, totalXP, completedTracks, avgLessons, activeThisWeek }
}
