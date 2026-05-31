'use server'

import { Resend } from 'resend'

export async function submitDemoRequest(formData: {
  name: string
  email: string
  company: string
  size: string
  message: string
}): Promise<{ ok: boolean; error?: string; emailId?: string; debug?: string }> {
  const { name, email, company, size, message } = formData

  if (!name || !email || !company || !size) {
    return { ok: false, error: 'Missing required fields' }
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return { ok: false, error: 'Email service not configured', debug: 'RESEND_API_KEY missing' }
  }

  const resend = new Resend(apiKey)

  const { data, error } = await resend.emails.send({
    from: 'OpusLearn <hello@opuslearn.ai>',
    to: 'antoine.boudic@gmail.com',
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

  if (error) {
    console.error('Demo request email failed:', error)
    return { ok: false, error: error.message }
  }

  console.log('Demo request email sent:', data?.id)
  return { ok: true, emailId: data?.id }
}
