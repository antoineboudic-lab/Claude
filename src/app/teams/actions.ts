'use server'

import { Resend } from 'resend'

export type DemoRequestState = {
  status: 'idle' | 'success' | 'error'
  emailId?: string
  error?: string
}

export async function sendDemoRequest(
  _prev: DemoRequestState,
  formData: FormData,
): Promise<DemoRequestState> {
  const name = (formData.get('name') as string)?.trim()
  const email = (formData.get('email') as string)?.trim()
  const company = (formData.get('company') as string)?.trim()
  const size = (formData.get('size') as string)?.trim()
  const message = (formData.get('message') as string)?.trim()

  if (!name || !email || !company || !size) {
    return { status: 'error', error: 'Please fill in all required fields.' }
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return { status: 'error', error: 'Email service not configured (missing API key).' }
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
    console.error('Demo request failed:', JSON.stringify(error))
    return { status: 'error', error: error.message }
  }

  console.log('Demo request sent, emailId:', data?.id)
  return { status: 'success', emailId: data?.id }
}
