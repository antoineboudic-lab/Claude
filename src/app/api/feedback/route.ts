import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export async function POST(req: NextRequest) {
  try {
    const { type, page, description, email } = await req.json()

    if (!description?.trim()) {
      return NextResponse.json({ error: 'Description is required' }, { status: 400 })
    }

    const typeLabel = type === 'bug' ? '🐛 Bug report' : type === 'suggestion' ? '💡 Suggestion' : '💬 Other feedback'

    const { error } = await resend.emails.send({
      from: 'OpusLearn Feedback <hello@opuslearn.ai>',
      to: 'antoine@opuslearn.ai',
      replyTo: email || undefined,
      subject: `${typeLabel} — ${page || 'unknown page'}`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:24px;background:#f8faff;border-radius:12px;">
          <h2 style="margin:0 0 16px;font-size:18px;color:#0F172A;">${typeLabel}</h2>
          <table style="width:100%;border-collapse:collapse;font-size:14px;">
            <tr>
              <td style="padding:8px 12px;background:#EFF6FF;font-weight:600;color:#64748B;width:120px;border-radius:6px 0 0 0;">Page</td>
              <td style="padding:8px 12px;background:#ffffff;border:1px solid #E2E8F0;">${escapeHtml(page || '—')}</td>
            </tr>
            <tr>
              <td style="padding:8px 12px;background:#EFF6FF;font-weight:600;color:#64748B;">From</td>
              <td style="padding:8px 12px;background:#ffffff;border:1px solid #E2E8F0;">${escapeHtml(email || 'anonymous')}</td>
            </tr>
            <tr>
              <td style="padding:8px 12px;background:#EFF6FF;font-weight:600;color:#64748B;border-radius:0 0 0 6px;">Feedback</td>
              <td style="padding:8px 12px;background:#ffffff;border:1px solid #E2E8F0;white-space:pre-wrap;">${escapeHtml(description)}</td>
            </tr>
          </table>
        </div>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ error: 'Failed to send' }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Feedback error:', err)
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 })
  }
}
