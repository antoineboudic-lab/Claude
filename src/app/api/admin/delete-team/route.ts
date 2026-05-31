import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { createSupabaseServerClient } from '@/lib/supabase/server'

export const runtime = 'nodejs'

const ADMIN_EMAILS = (process.env.NEXT_PUBLIC_ADMIN_EMAILS ?? 'antoine.boudic@gmail.com')
  .split(',').map(e => e.trim().toLowerCase()).filter(Boolean)

export async function DELETE(req: NextRequest) {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user || !ADMIN_EMAILS.includes(user.email?.toLowerCase() ?? '')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { teamId } = await req.json() as { teamId?: string }
  if (!teamId) return NextResponse.json({ error: 'Missing teamId' }, { status: 400 })

  const admin = createAdminClient()

  await admin.from('team_invites').delete().eq('team_id', teamId)
  await admin.from('team_members').delete().eq('team_id', teamId)
  const { error } = await admin.from('teams').delete().eq('id', teamId)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ ok: true })
}
