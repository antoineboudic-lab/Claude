import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { sendNudgeEmail } from '@/lib/growth/email'

export async function POST(req: NextRequest) {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { memberEmail, memberName, teamName, teamId } = await req.json()
  if (!memberEmail || !teamId) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })

  // Verify requester is admin of this team
  const { data: team } = await supabase
    .from('teams')
    .select('id, name')
    .eq('id', teamId)
    .eq('created_by', user.id)
    .single()
  if (!team) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const adminName = user.user_metadata?.full_name ?? user.email?.split('@')[0] ?? 'Your admin'
  const ok = await sendNudgeEmail(memberEmail, memberName, teamName ?? team.name, adminName)

  return NextResponse.json({ ok })
}
