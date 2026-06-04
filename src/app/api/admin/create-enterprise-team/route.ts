import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { Resend } from 'resend'

export const runtime = 'nodejs'

const ADMIN_EMAILS = (process.env.NEXT_PUBLIC_ADMIN_EMAILS ?? '')
  .split(',').map(e => e.trim().toLowerCase()).filter(Boolean)

const BASE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.opuslearn.ai')
  .replace('://opuslearn.ai', '://www.opuslearn.ai')

const LOGO = `<img src="https://www.opuslearn.ai/email-logo.png" width="30" height="30" alt="OpusLearn" style="display:block;border-radius:7px;">`

export async function POST(req: NextRequest) {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user || !ADMIN_EMAILS.includes(user.email?.toLowerCase() ?? '')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { companyName, adminEmail, adminName, seatLimit } = await req.json() as {
    companyName?: string; adminEmail?: string; adminName?: string; seatLimit?: number
  }
  if (!companyName || !adminEmail) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  const admin = createAdminClient()

  // Create the enterprise admin's account
  const { data: newUser, error: createError } = await admin.auth.admin.createUser({
    email: adminEmail,
    email_confirm: true,
  })

  if (createError || !newUser?.user) {
    return NextResponse.json({
      error: `Could not create account for ${adminEmail}. They may already have an OpusLearn account.`,
    }, { status: 400 })
  }

  const adminUserId = newUser.user.id

  // Create team (bypass RLS via admin client)
  const { data: team, error: teamError } = await admin
    .from('teams')
    .insert({ name: companyName, plan: 'enterprise', created_by: adminUserId, seat_limit: seatLimit ?? 999 })
    .select()
    .single()

  if (teamError || !team) {
    await admin.auth.admin.deleteUser(adminUserId)
    return NextResponse.json({ error: 'Failed to create team' }, { status: 500 })
  }

  // Add the admin as a team member
  await admin.from('team_members').insert({
    team_id: (team as { id: string }).id,
    user_id: adminUserId,
    email: adminEmail,
    display_name: adminEmail.split('@')[0],
    role: 'admin',
    status: 'active',
    joined_at: new Date().toISOString(),
  })

  // Generate a recovery link so they can set their password on first visit
  const { data: linkData, error: linkError } = await admin.auth.admin.generateLink({
    type: 'recovery',
    email: adminEmail,
    options: { redirectTo: `${BASE_URL}/teams/setup${adminName ? `?name=${encodeURIComponent(adminName)}` : ''}` },
  })

  if (linkError || !linkData?.properties?.action_link) {
    return NextResponse.json({ error: 'Failed to generate setup link' }, { status: 500 })
  }

  const setupLink = linkData.properties.action_link

  const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>OpusLearn</title></head>
<body style="margin:0;padding:0;background:#F1F5F9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F1F5F9;padding:40px 16px;">
    <tr><td align="center">
      <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#FFFFFF;border-radius:16px;border:1px solid #E2E8F0;overflow:hidden;">
        <tr><td style="background:#2563EB;height:4px;font-size:0;line-height:0;">&nbsp;</td></tr>
        <tr><td style="padding:24px 36px 20px;border-bottom:1px solid #F1F5F9;">
          <table role="presentation" cellpadding="0" cellspacing="0"><tr>
            <td style="vertical-align:middle;">${LOGO}</td>
            <td style="padding-left:10px;vertical-align:middle;font-size:15px;font-weight:900;color:#0F172A;letter-spacing:-0.3px;line-height:1;">OpusLearn</td>
          </tr></table>
        </td></tr>
        <tr><td style="padding:28px 36px 20px;">
          <h1 style="margin:0 0 10px;font-size:26px;font-weight:900;color:#0F172A;line-height:1.2;">Your ${companyName} team is ready</h1>
          <p style="margin:0;font-size:15px;color:#475569;line-height:1.6;">Welcome to OpusLearn. Your team account has been set up and you're the administrator. Click below to activate your account, set a password, and start inviting your team.</p>
        </td></tr>
        <tr><td style="padding:0 36px 20px;">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#EFF6FF;border:1px solid #BFDBFE;border-radius:12px;">
            <tr><td style="padding:16px 20px;">
              <p style="margin:0 0 4px;font-size:13px;font-weight:700;color:#1E40AF;">What happens next</p>
              <p style="margin:0;font-size:13px;color:#1E40AF;line-height:1.6;">1. Click the button below to set your password<br>2. Log in to your team dashboard<br>3. Invite your team members by email</p>
            </td></tr>
          </table>
        </td></tr>
        <tr><td style="padding:0 36px 20px;">
          <table role="presentation" cellpadding="0" cellspacing="0">
            <tr><td style="border-radius:10px;background:#2563EB;box-shadow:0 4px 14px rgba(37,99,235,0.3);">
              <a href="${setupLink}" style="display:inline-block;padding:14px 30px;font-size:14px;font-weight:700;color:#FFFFFF;text-decoration:none;">Set up your team →</a>
            </td></tr>
          </table>
        </td></tr>
        <tr><td style="padding:0 36px 28px;">
          <p style="margin:0;font-size:12px;color:#94A3B8;line-height:1.6;">This link expires in 24 hours. If you need a new one, reply to this email.<br>Or copy this link: <span style="color:#64748B;word-break:break-all;">${setupLink}</span></p>
        </td></tr>
        <tr><td style="padding:24px 36px;background:#F8FAFF;border-top:1px solid #E2E8F0;text-align:center;">
          <p style="margin:0;font-size:12px;color:#94A3B8;">OpusLearn · <a href="${BASE_URL}" style="color:#94A3B8;text-decoration:underline;">opuslearn.ai</a></p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`

  if (process.env.RESEND_API_KEY) {
    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({
      from: 'OpusLearn <hello@opuslearn.ai>',
      to: adminEmail,
      replyTo: 'antoine@opuslearn.ai',
      subject: `Your ${companyName} team is ready on OpusLearn`,
      html,
    })
  }

  return NextResponse.json({ ok: true, teamId: (team as { id: string }).id })
}
