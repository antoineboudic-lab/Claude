import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { createInvite } from '@/lib/supabase/teams'

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
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ai-literacy-tau.vercel.app'
  const joinUrl = `${siteUrl}/join/${invite.token}`

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ ok: true, token: invite.token, emailSent: false })
  }

  const resend = new Resend(process.env.RESEND_API_KEY)

  const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#EFF6FF;font-family:-apple-system,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#EFF6FF;padding:40px 16px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#FFFFFF;border-radius:16px;border:1px solid #E2E8F0;overflow:hidden;">
        <tr><td style="background:#2563EB;height:4px;"></td></tr>
        <tr><td style="padding:28px 36px 20px;">
          <span style="font-size:14px;font-weight:900;color:#0F172A;">⚡ AI Literacy</span>
        </td></tr>
        <tr><td style="padding:0 36px 20px;">
          <h1 style="margin:0 0 12px;font-size:24px;font-weight:900;color:#0F172A;">You've been invited to ${teamName}</h1>
          <p style="margin:0 0 24px;font-size:15px;color:#64748B;line-height:1.6;">
            ${inviterName} has invited you to join their team on AI Literacy — where professionals master AI for their job.
          </p>
          <a href="${joinUrl}" style="display:inline-block;background:#2563EB;color:#fff;font-weight:600;font-size:14px;padding:14px 28px;border-radius:10px;text-decoration:none;">
            Accept invitation →
          </a>
        </td></tr>
        <tr><td style="padding:20px 36px;border-top:1px solid #F1F5F9;">
          <p style="margin:0;font-size:12px;color:#94A3B8;">
            Or copy this link: ${joinUrl}<br>
            This invitation expires in 7 days.
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`

  const { error: emailError } = await resend.emails.send({
    from: 'AI Literacy <onboarding@resend.dev>',
    to: email,
    subject: `[${teamName}] invited you to AI Literacy`,
    html,
  })

  return NextResponse.json({ ok: true, token: invite.token, emailSent: !emailError })
}
