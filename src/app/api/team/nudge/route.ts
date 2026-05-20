import { createHmac } from 'crypto'
import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { sendNudgeEmail } from '@/lib/growth/email'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://opuslearn.ai'

export async function POST(req: NextRequest) {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { memberEmail, memberName, teamName, teamId, memberId } = await req.json()
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

  // Build unsubscribe URL for the member if we have their userId
  let unsubUrl = `${BASE_URL}/unsubscribe`
  if (memberId) {
    const token = createHmac('sha256', process.env.CRON_SECRET ?? 'dev').update(memberId).digest('hex')
    unsubUrl = `${BASE_URL}/api/unsubscribe?u=${memberId}&t=${token}`
  }

  const ok = await sendNudgeEmail(memberEmail, memberName, teamName ?? team.name, adminName, unsubUrl)

  return NextResponse.json({ ok })
}
