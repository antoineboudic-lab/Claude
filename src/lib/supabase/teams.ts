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

  const { data: { user } } = await supabase.auth.getUser()
  const email = user?.email ?? ''
  const displayName = user?.user_metadata?.full_name ?? email.split('@')[0] ?? 'Admin'

  const { data: team, error: teamErr } = await supabase
    .from('teams')
    .insert({ name, plan, created_by: userId, seat_limit: seatLimits[plan] })
    .select()
    .single()

  if (teamErr || !team) return null

  await supabase.from('team_members').insert({
    team_id: team.id,
    user_id: userId,
    email,
    display_name: displayName,
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
  if (!data) return null

  // Repair: ensure the admin has a team_members row (may be missing if created before this fix)
  const { count } = await supabase
    .from('team_members')
    .select('id', { count: 'exact', head: true })
    .eq('team_id', data.id)
    .eq('user_id', userId)
  if (count === 0) {
    const { data: { user } } = await supabase.auth.getUser()
    await supabase.from('team_members').insert({
      team_id: data.id,
      user_id: userId,
      email: user?.email ?? '',
      display_name: user?.user_metadata?.full_name ?? user?.email?.split('@')[0] ?? 'Admin',
      role: 'admin',
      status: 'active',
      joined_at: new Date().toISOString(),
    })
  }

  return data as Team
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

  // Update the pending member record; chained select tells us if any row matched
  const { data: updatedRows } = await supabase
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
    .select('id')

  const pendingUpdated = (updatedRows?.length ?? 0) > 0

  // Run insert (if no pending row existed) and invite acceptance in parallel
  await Promise.all([
    pendingUpdated ? Promise.resolve() : supabase.from('team_members').insert({
      team_id: invite.team_id,
      user_id: userId,
      email,
      display_name: displayName,
      assigned_tracks: invite.assigned_tracks,
      status: 'active',
      role: 'member',
      joined_at: new Date().toISOString(),
    }),
    supabase.from('team_invites').update({ status: 'accepted' }).eq('token', token),
  ])
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

// ── Team goals ────────────────────────────────────────────────────────────────

export interface TeamGoal {
  id: string
  team_id: string
  title: string
  deadline: string | null
  created_by: string | null
  created_at: string
}

export async function getTeamGoal(teamId: string): Promise<TeamGoal | null> {
  const supabase = createClient()
  const { data } = await supabase
    .from('team_goals')
    .select('*')
    .eq('team_id', teamId)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()
  return (data as TeamGoal) ?? null
}

export async function upsertTeamGoal(
  teamId: string, title: string, deadline: string | null, userId: string,
): Promise<TeamGoal | null> {
  const supabase = createClient()
  // Delete existing goal first, then insert new one (simpler than true upsert)
  await supabase.from('team_goals').delete().eq('team_id', teamId)
  const { data } = await supabase
    .from('team_goals')
    .insert({ team_id: teamId, title, deadline: deadline || null, created_by: userId })
    .select()
    .single()
  return (data as TeamGoal) ?? null
}

export async function deleteTeamGoal(teamId: string): Promise<void> {
  const supabase = createClient()
  await supabase.from('team_goals').delete().eq('team_id', teamId)
}

// ── Welcome message ───────────────────────────────────────────────────────────

export async function setWelcomeMessage(teamId: string, message: string): Promise<void> {
  const supabase = createClient()
  await supabase.from('teams').update({ welcome_message: message || null }).eq('id', teamId)
}

export async function getWelcomeMessage(teamId: string): Promise<string | null> {
  const supabase = createClient()
  const { data } = await supabase.from('teams').select('welcome_message').eq('id', teamId).single()
  return (data as { welcome_message: string | null } | null)?.welcome_message ?? null
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
