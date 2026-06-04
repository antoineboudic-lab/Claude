import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS })
}

export async function POST(req: NextRequest) {
  let body: { name?: string; email?: string; company?: string; size?: string; message?: string }
  try { body = await req.json() } catch { return NextResponse.json({ error: 'Invalid body' }, { status: 400, headers: CORS_HEADERS }) }

  const { name, email, company, size, message } = body
  if (!name || !email || !company || !size) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400, headers: CORS_HEADERS })
  }

  const { data, error } = await resend.emails.send({
    from: 'OpusLearn <hello@opuslearn.ai>',
    to: 'antoine@opuslearn.ai',
    replyTo: email,
    subject: `Demo request — ${company} (${size})`,
    html: `
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Company:</strong> ${escapeHtml(company)}</p>
      <p><strong>Team size:</strong> ${escapeHtml(size)}</p>
      ${message ? `<p><strong>Message:</strong> ${escapeHtml(message)}</p>` : ''}
    `,
  })

  if (error) {
    console.error('Demo request email failed:', error)
    return NextResponse.json({ error: error.message }, { status: 500, headers: CORS_HEADERS })
  }

  console.log('Demo request email sent:', data?.id)
  return NextResponse.json({ ok: true, emailId: data?.id }, { headers: CORS_HEADERS })
}
