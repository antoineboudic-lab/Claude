import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  let body: { name?: string; email?: string; company?: string; size?: string; message?: string }
  try { body = await req.json() } catch { return NextResponse.json({ error: 'Invalid body' }, { status: 400 }) }

  const { name, email, company, size, message } = body
  if (!name || !email || !company || !size) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  try {
    await resend.emails.send({
      from: 'OpusLearn <hello@opuslearn.ai>',
      to: 'antoine@opuslearn.ai',
      replyTo: email,
      subject: `Demo request — ${company} (${size})`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Team size:</strong> ${size}</p>
        ${message ? `<p><strong>Message:</strong> ${message}</p>` : ''}
      `,
    })
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Demo request email failed:', err)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
