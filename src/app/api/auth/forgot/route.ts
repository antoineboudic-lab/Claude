import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { Resend } from 'resend'

export const runtime = 'nodejs'

// Always use www — opuslearn.ai redirects to www, which strips the hash fragment and loses auth tokens
const BASE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.opuslearn.ai')
  .replace('://opuslearn.ai', '://www.opuslearn.ai')
const LOGO = `<img src="https://www.opuslearn.ai/email-logo.png" width="30" height="30" alt="OpusLearn" style="display:block;border-radius:7px;">`

export async function POST(req: NextRequest) {
  const { email } = await req.json()
  if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 })

  const admin = createAdminClient()

  // Generate recovery link via admin API — bypasses Supabase's own email system
  const { data, error } = await admin.auth.admin.generateLink({
    type: 'recovery',
    email,
    options: {
      redirectTo: `${BASE_URL}/auth/reset`,
    },
  })

  if (error || !data?.properties?.action_link) {
    // Don't reveal whether the email exists
    return NextResponse.json({ ok: true })
  }

  const resetLink = data.properties.action_link
  const name = email.split('@')[0]

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
        <tr><td style="height:8px;"></td></tr>
        <tr><td style="padding:0 36px 20px;">
          <h1 style="margin:0 0 10px;font-size:26px;font-weight:900;color:#0F172A;line-height:1.2;">Reset your password</h1>
          <p style="margin:0;font-size:15px;color:#475569;line-height:1.6;">Hi ${name}, we received a request to reset your OpusLearn password. Click the button below to choose a new one.</p>
        </td></tr>
        <tr><td style="padding:0 36px 20px;">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#EFF6FF;border:1px solid #BFDBFE;border-radius:12px;">
            <tr><td style="padding:16px 20px;">
              <p style="margin:0;font-size:13px;color:#1E40AF;line-height:1.5;">🔒 This link expires in <strong>1 hour</strong> and can only be used once.</p>
            </td></tr>
          </table>
        </td></tr>
        <tr><td style="padding:0 36px 20px;">
          <table role="presentation" cellpadding="0" cellspacing="0">
            <tr><td style="border-radius:10px;background:#2563EB;box-shadow:0 4px 14px rgba(37,99,235,0.3);">
              <a href="${resetLink}" style="display:inline-block;padding:14px 30px;font-size:14px;font-weight:700;color:#FFFFFF;text-decoration:none;">Reset my password →</a>
            </td></tr>
          </table>
        </td></tr>
        <tr><td style="padding:0 36px 28px;">
          <p style="margin:0;font-size:12px;color:#94A3B8;line-height:1.6;">If you didn't request this, you can safely ignore this email — your password won't change.<br>Or copy this link: <span style="color:#64748B;word-break:break-all;">${resetLink}</span></p>
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
      to: email,
      subject: 'Reset your OpusLearn password',
      html,
    })
  }

  return NextResponse.json({ ok: true })
}
