import { redirect } from 'next/navigation'
import { Resend } from 'resend'
import Link from 'next/link'
import { CheckCircle2, ArrowLeft } from 'lucide-react'
import { createAdminClient } from '@/lib/supabase/admin'
import { GrainOverlay } from '@/components/editorial/Atmosphere'
import {
  PAPER, PAPER_2, INK, INK_SOFT, INK_FAINT,
  COBALT, COBALT_TX, RULE, SERIF, MONO, SANS,
} from '@/components/editorial/theme'

async function submitForm(formData: FormData) {
  'use server'

  const name = (formData.get('name') as string)?.trim()
  const email = (formData.get('email') as string)?.trim()
  const company = (formData.get('company') as string)?.trim()
  const title = (formData.get('title') as string)?.trim()
  const website = (formData.get('website') as string)?.trim()
  const industry = (formData.get('industry') as string)?.trim()
  const size = (formData.get('size') as string)?.trim()
  const message = (formData.get('message') as string)?.trim()

  if (name && email && company && size) {
    // Save to DB for admin visibility
    const admin = createAdminClient()
    await admin.from('leads').upsert({
      email,
      source: 'demo_request',
      role: title || null,
      metadata: { name, company, website: website || null, industry: industry || null, size, message: message || null },
    }, { onConflict: 'email' })

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
        ${title ? `<p><strong>Job title:</strong> ${title}</p>` : ''}
        ${website ? `<p><strong>Website:</strong> ${website}</p>` : ''}
        ${industry ? `<p><strong>Industry:</strong> ${industry}</p>` : ''}
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
    <main style={{ background: PAPER, minHeight: '100vh', fontFamily: SANS, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 16px' }}>
      <GrainOverlay />
      <div style={{ position: 'relative', width: '100%', maxWidth: 480 }}>
        <Link href="/teams" className="inline-flex items-center gap-2 text-sm font-medium mb-8"
          style={{ color: INK_SOFT, fontFamily: SANS }}>
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
      <div className="p-10 text-center"
        style={{ background: PAPER_2, border: `1px solid ${RULE}`, borderRadius: 10, boxShadow: '0 1px 3px rgba(26,27,31,0.04)' }}>
        <CheckCircle2 size={40} className="mx-auto mb-4" style={{ color: '#10B981' }} />
        <h3 className="text-xl mb-2" style={{ color: INK, fontFamily: SERIF, fontWeight: 500, letterSpacing: '-0.01em' }}>Request received</h3>
        <p className="text-sm" style={{ color: INK_SOFT, fontFamily: SANS }}>
          Someone from our team will reach out within one business day to schedule your demo.
        </p>
      </div>
    )
  }

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: 6,
    border: `1.5px solid ${RULE}`,
    fontSize: 14,
    color: INK,
    fontFamily: SANS,
    background: PAPER_2,
    outline: 'none',
    display: 'block',
  }

  return (
    <div className="p-8" style={{ background: PAPER_2, border: `1px solid ${RULE}`, borderRadius: 10, boxShadow: '0 1px 3px rgba(26,27,31,0.04)' }}>
      <p className="text-[11px] uppercase tracking-[0.16em] mb-3" style={{ color: COBALT_TX, fontFamily: MONO }}>Get in touch</p>
      <h1 className="text-2xl mb-2" style={{ color: INK, fontFamily: SERIF, fontWeight: 500, letterSpacing: '-0.02em' }}>Book a 30-minute demo</h1>
      <p className="text-sm mb-8" style={{ color: INK_SOFT, fontFamily: SANS }}>
        We&apos;ll walk you through the team dashboard, track assignment, and reporting.
      </p>

      <form action={submitForm} className="space-y-4">
        {[
          { name: 'name', label: 'Your name', placeholder: 'Sophie Armand', type: 'text' },
          { name: 'email', label: 'Work email', placeholder: 'sophie@company.com', type: 'email' },
          { name: 'company', label: 'Company', placeholder: 'Acme Corp', type: 'text' },
          { name: 'title', label: 'Job title', placeholder: 'Head of Learning & Development', type: 'text' },
          { name: 'website', label: 'Company website', placeholder: 'acme.com', type: 'text' },
        ].map(field => (
          <div key={field.name}>
            <label className="block text-xs font-semibold mb-1.5" style={{ color: INK_SOFT, fontFamily: SANS }}>{field.label}</label>
            <input name={field.name} type={field.type} required placeholder={field.placeholder} style={inputStyle} />
          </div>
        ))}

        <div>
          <label className="block text-xs font-semibold mb-1.5" style={{ color: INK_SOFT, fontFamily: SANS }}>Industry</label>
          <select name="industry" required style={inputStyle}>
            <option value="">Select industry</option>
            <option value="Financial Services">Financial Services</option>
            <option value="Professional Services">Professional Services</option>
            <option value="Technology">Technology</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Retail & E-commerce">Retail & E-commerce</option>
            <option value="Manufacturing">Manufacturing</option>
            <option value="Media & Communications">Media & Communications</option>
            <option value="Education">Education</option>
            <option value="Government & Public Sector">Government & Public Sector</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold mb-1.5" style={{ color: INK_SOFT, fontFamily: SANS }}>Team size</label>
          <select name="size" required style={inputStyle}>
            <option value="">Select team size</option>
            <option value="5-15">5–15 people</option>
            <option value="16-50">16–50 people</option>
            <option value="51-200">51–200 people</option>
            <option value="200+">200+ people</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold mb-1.5" style={{ color: INK_SOFT, fontFamily: SANS }}>
            Anything specific? <span style={{ color: INK_FAINT, fontWeight: 400 }}>(optional)</span>
          </label>
          <textarea name="message" rows={3} style={{ ...inputStyle, resize: 'none' }}
            placeholder="e.g. 40 people across marketing and ops — interested in custom track assignment." />
        </div>

        <button type="submit"
          className="w-full py-4 font-semibold text-sm text-white transition-opacity hover:opacity-90"
          style={{ background: COBALT, borderRadius: 3, fontFamily: SANS }}>
          Request demo →
        </button>
      </form>
    </div>
  )
}
