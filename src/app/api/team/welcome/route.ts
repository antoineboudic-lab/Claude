import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

// Public endpoint — no auth required; used by join page before user signs up
export async function GET(req: NextRequest) {
  const token = new URL(req.url).searchParams.get('token')
  if (!token) return NextResponse.json({ message: null })

  const admin = createAdminClient()

  const { data: invite } = await admin
    .from('team_invites')
    .select('team_id')
    .eq('token', token)
    .eq('status', 'pending')
    .single()

  if (!invite) return NextResponse.json({ message: null })

  const { data } = await admin
    .from('teams')
    .select('welcome_message')
    .eq('id', invite.team_id)
    .single()

  return NextResponse.json({
    message: (data as { welcome_message: string | null } | null)?.welcome_message ?? null,
  })
}
