import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createAdminClient } from '@/lib/supabase/admin'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  const secret = req.headers.get('x-supabase-webhook-secret')
  if (!secret || secret !== process.env.SUPABASE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json() as {
    type: 'INSERT' | 'UPDATE' | 'DELETE'
    table: string
    schema: string
    record: Record<string, unknown>
    old_record: Record<string, unknown> | null
  }

  if (body.type !== 'INSERT' || body.schema !== 'auth' || body.table !== 'users') {
    return NextResponse.json({ received: true })
  }

  const id = body.record.id as string
  const email = body.record.email as string
  const meta = body.record.raw_user_meta_data as Record<string, unknown> | null
  const name = (meta?.full_name as string | undefined)
    ?? (email ? email.split('@')[0] : 'there')

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ai-literacy-tau.vercel.app'
  const assessmentUrl = `${siteUrl}/assessment`

  const admin = createAdminClient()

  if (process.env.RESEND_API_KEY && email) {
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
          <h1 style="margin:0 0 12px;font-size:24px;font-weight:900;color:#0F172A;">You're in, ${name}!</h1>
          <p style="margin:0 0 24px;font-size:15px;color:#64748B;line-height:1.6;">
            Your account is ready. Take the 2-minute assessment to get your personalised AI learning path.
          </p>
          <a href="${assessmentUrl}" style="display:inline-block;background:#2563EB;color:#fff;font-weight:600;font-size:14px;padding:14px 28px;border-radius:10px;text-decoration:none;">
            Take the assessment →
          </a>
        </td></tr>
        <tr><td style="padding:20px 36px;border-top:1px solid #F1F5F9;">
          <p style="margin:0;font-size:12px;color:#94A3B8;">
            This is a one-time email. Your personalised welcome arrives after your assessment.
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`

    await resend.emails.send({
      from: 'AI Literacy Teams <hello@ailiteracy.com>',
      to: email,
      subject: 'Welcome to AI Literacy — let\'s get started',
      html,
    })
  }

  if (id && email) {
    await admin.from('email_log').insert({
      user_id: id,
      email,
      sequence: 'onboarding',
      step: 0,
      status: 'sent',
      sent_at: new Date().toISOString(),
    })
  }

  return NextResponse.json({ received: true })
}
