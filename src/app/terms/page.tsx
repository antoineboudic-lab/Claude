import type { Metadata } from 'next'
import Link from 'next/link'
import Logo from '@/components/Logo'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'The terms and conditions governing your use of OpusLearn. Please read these carefully before using our platform.',
  robots: { index: true, follow: false },
  alternates: { canonical: 'https://opuslearn.ai/terms' },
}

const SECTIONS = [
  {
    title: '1. Acceptance of terms',
    body: `By accessing or using the OpusLearn platform (the "Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, do not use the Service. We may update these Terms from time to time; continued use of the Service after changes are posted constitutes acceptance of the updated Terms.`,
  },
  {
    title: '2. Description of service',
    body: `OpusLearn provides an online learning platform offering personalised AI training for business professionals. The Service includes role-specific learning tracks, interactive lessons, applied exercises, progress tracking, and verified certificates. The Service is operated by OpusLearn SAS, registered in France.`,
  },
  {
    title: '3. Account registration',
    body: `You must create an account to access certain features of the Service. You agree to provide accurate, current, and complete information during registration. You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account. Notify us immediately at security@opuslearn.ai if you suspect unauthorised access.`,
  },
  {
    title: '4. Subscriptions and payment',
    body: `The Service is offered under free and paid subscription tiers. Paid subscriptions are billed in advance on a monthly or annual basis. Prices are displayed in Euros and exclude applicable taxes. We use Stripe for payment processing. Your payment information is stored securely by Stripe and is not held on our servers. You authorise us to charge your payment method for all fees incurred under your subscription.`,
  },
  {
    title: '5. Free trial',
    body: `We may offer a free trial period for paid subscription tiers. No charge is made during the trial period. At the end of the trial, your subscription will automatically renew at the applicable paid rate unless you cancel before the trial ends. You can cancel at any time from your account settings.`,
  },
  {
    title: '6. Cancellation and refunds',
    body: `You may cancel your subscription at any time from your account settings. Upon cancellation, you will retain access to paid features until the end of your current billing period. We do not offer refunds for partial subscription periods except where required by applicable law. Refund requests may be considered on a case-by-case basis — contact hello@opuslearn.ai.`,
  },
  {
    title: '7. Intellectual property',
    body: `All content on the platform — including lesson text, exercises, videos, assessments, and curriculum design — is the intellectual property of OpusLearn SAS and is protected by copyright law. You are granted a limited, non-exclusive, non-transferable licence to access and use the content for your own personal, non-commercial learning purposes. You may not reproduce, distribute, modify, or create derivative works from any platform content without our express written permission.`,
  },
  {
    title: '8. Acceptable use',
    body: `You agree not to: share your account credentials with others; use the Service for any unlawful purpose; attempt to gain unauthorised access to any part of the Service; use automated tools to scrape or copy content; impersonate any person or entity; or engage in any conduct that disrupts or interferes with the Service.`,
  },
  {
    title: '9. Certificates',
    body: `Certificates are issued upon successful completion of a full learning track, including all applied exercises. OpusLearn certificates are educational credentials and do not constitute professional qualifications, licences, or certifications recognised by regulatory bodies. The value of a certificate depends on the policies of the individual employer or institution.`,
  },
  {
    title: '10. Disclaimer of warranties',
    body: `The Service is provided "as is" and "as available" without warranties of any kind, either express or implied. We do not warrant that the Service will be uninterrupted, error-free, or free of viruses or other harmful components. We do not warrant that the content is accurate, complete, or up to date, although we make reasonable efforts to ensure it is.`,
  },
  {
    title: '11. Limitation of liability',
    body: `To the maximum extent permitted by applicable law, OpusLearn SAS shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Service. Our total liability for any claim arising from these Terms shall not exceed the amount you paid us in the 12 months preceding the claim.`,
  },
  {
    title: '12. Governing law',
    body: `These Terms are governed by and construed in accordance with the laws of France, without regard to its conflict of law provisions. Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts of Paris, France.`,
  },
  {
    title: '13. Contact',
    body: `For questions about these Terms, contact: hello@opuslearn.ai or write to: OpusLearn SAS, 10 rue de la Paix, 75002 Paris, France.`,
  },
]

export default function TermsPage() {
  return (
    <main style={{ background: '#EFF6FF', minHeight: '100vh', fontFamily: 'var(--font-sans)' }}>
      {/* Nav */}
      <nav className="sticky top-0 z-40 px-6 py-4 flex items-center justify-between"
        style={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #E2E8F0' }}>
        <Link href="/" className="flex items-center gap-2">
          <Logo size="md" />
        </Link>
      </nav>

      <section className="py-16 pb-24" style={{ background: '#FFFFFF' }}>
        <div className="max-w-3xl mx-auto px-6">
          <div className="mb-10">
            <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#2563EB' }}>Legal</p>
            <h1 className="text-4xl font-black tracking-tight mb-3" style={{ color: '#0F172A' }}>Terms of Service</h1>
            <p className="text-sm" style={{ color: '#94A3B8' }}>Last updated: 1 May 2026</p>
          </div>

          <div className="space-y-10">
            {SECTIONS.map(s => (
              <div key={s.title}>
                <h2 className="text-base font-black mb-3" style={{ color: '#0F172A' }}>{s.title}</h2>
                <p className="text-sm leading-relaxed" style={{ color: '#475569' }}>{s.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-8" style={{ borderTop: '1px solid #E2E8F0' }}>
            <p className="text-xs" style={{ color: '#94A3B8' }}>
              For questions about these Terms, email{' '}
              <a href="mailto:hello@opuslearn.ai" style={{ color: '#2563EB' }}>hello@opuslearn.ai</a>
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
