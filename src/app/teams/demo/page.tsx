import { redirect } from 'next/navigation'
import { Resend } from 'resend'
import Link from 'next/link'
import { CheckCircle2, ArrowLeft } from 'lucide-react'

async function submitForm(formData: FormData) {
  'use server'

  const name = (formData.get('name') as string)?.trim()
  const email = (formData.get('email') as string)?.trim()
  const company = (formData.get('company') as string)?.trim()
  const size = (formData.get('size') as string)?.trim()
  const message = (formData.get('message') as string)?.trim()

  if (name && email && company && size) {
    const resend = new Resend(process.env.RESEND_API_KEY)
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
  }

  redirect('/teams/demo?submitted=true')
}

export default function DemoPage({
  searchParams,
}: {
  searchParams: Promise<{ submitted?: string }>
}) {
  return (
    <main style={{ background: '#EFF6FF', minHeight: '100vh', fontFamily: 'var(--font-sans)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 16px' }}>
      <div style={{ width: '100%', maxWidth: 480 }}>
        <Link href="/teams" className="inline-flex items-center gap-2 text-sm font-medium mb-8"
          style={{ color: '#64748B' }}>
          <ArrowLeft size={14} /> Back to Teams
        </Link>

        {/* @ts-expect-error Server Component */}
        <SubmittedOrForm searchParams={searchParams} submitForm={submitForm} />
      </div>
    </main>
  )
}

async function SubmittedOrForm({
  searchParams,
  submitForm,
}: {
  searchParams: Promise<{ submitted?: string }>
  submitForm: (formData: FormData) => Promise<never>
}) {
  const params = await searchParams
  if (params.submitted) {
    return (
      <div className="rounded-2xl p-10 text-center"
        style={{ background: '#F0FDF4', border: '1px solid #BBF7D0' }}>
        <CheckCircle2 size={40} className="mx-auto mb-4" style={{ color: '#10B981' }} />
        <h3 className="text-xl font-black mb-2" style={{ color: '#0F172A' }}>Request received</h3>
        <p className="text-sm" style={{ color: '#64748B' }}>
          Someone from our team will reach out within one business day to schedule your demo.
        </p>
      </div>
    )
  }

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: 12,
    border: '1.5px solid #E2E8F0',
    fontSize: 14,
    color: '#0F172A',
    fontFamily: 'var(--font-sans)',
    background: '#FFFFFF',
    outline: 'none',
    display: 'block',
  }

  return (
    <div className="rounded-2xl p-8" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0' }}>
      <h1 className="text-2xl font-black mb-2" style={{ color: '#0F172A' }}>Book a 30-minute demo</h1>
      <p className="text-sm mb-8" style={{ color: '#64748B' }}>
        We'll walk you through the team dashboard, track assignment, and reporting.
      </p>

      <form action={submitForm} className="space-y-4">
        {[
          { name: 'name', label: 'Your name', placeholder: 'Sophie Armand', type: 'text' },
          { name: 'email', label: 'Work email', placeholder: 'sophie@company.com', type: 'email' },
          { name: 'company', label: 'Company', placeholder: 'Acme Corp', type: 'text' },
        ].map(field => (
          <div key={field.name}>
            <label className="block text-xs font-semibold mb-1.5" style={{ color: '#334155' }}>{field.label}</label>
            <input name={field.name} type={field.type} required placeholder={field.placeholder} style={inputStyle} />
          </div>
        ))}

        <div>
          <label className="block text-xs font-semibold mb-1.5" style={{ color: '#334155' }}>Team size</label>
          <select name="size" required style={inputStyle}>
            <option value="">Select team size</option>
            <option value="5-15">5–15 people</option>
            <option value="16-50">16–50 people</option>
            <option value="51-200">51–200 people</option>
            <option value="200+">200+ people</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold mb-1.5" style={{ color: '#334155' }}>
            Anything specific? <span style={{ color: '#94A3B8', fontWeight: 400 }}>(optional)</span>
          </label>
          <textarea name="message" rows={3} style={{ ...inputStyle, resize: 'none' }}
            placeholder="e.g. 40 people across marketing and ops — interested in custom track assignment." />
        </div>

        <button type="submit"
          className="w-full py-4 rounded-xl font-semibold text-sm text-white"
          style={{ background: '#2563EB', boxShadow: '0 4px 16px rgba(37,99,235,0.25)' }}>
          Request demo →
        </button>
      </form>
    </div>
  )
}
