import type { Metadata } from 'next'
import Link from 'next/link'
import Logo from '@/components/Logo'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How OpusLearn collects, uses, and protects your personal data. We are committed to transparency and your privacy rights.',
  robots: { index: true, follow: false },
  alternates: { canonical: 'https://opuslearn.ai/privacy' },
}

const SECTIONS = [
  {
    title: '1. Who we are',
    body: `OpusLearn SAS ("OpusLearn", "we", "us", "our") is a company registered in France. We operate the OpusLearn platform at opuslearn.ai. Our data controller contact is: hello@opuslearn.ai.`,
  },
  {
    title: '2. What data we collect',
    body: `We collect information you provide directly: your name, email address, job title, company, and role when you create an account or complete the assessment. We also collect usage data automatically: pages visited, lessons completed, time spent, and device/browser information. We use cookies and similar technologies for authentication, preferences, and analytics.`,
  },
  {
    title: '3. How we use your data',
    body: `We use your data to: provide and personalise our platform; send you product updates, learning reminders, and account notifications; process payments; respond to support requests; and improve our platform and content. We do not sell your data to third parties. We do not use your data to train AI models without explicit consent.`,
  },
  {
    title: '4. Legal basis for processing',
    body: `Under GDPR, we process your data on the following legal bases: (a) Contract — processing necessary to provide the service you signed up for; (b) Legitimate interests — analytics and product improvement; (c) Consent — marketing communications (you can withdraw at any time); (d) Legal obligation — compliance with applicable laws.`,
  },
  {
    title: '5. Data retention',
    body: `We retain your account data for as long as your account is active or as needed to provide the service. If you delete your account, we will delete or anonymise your personal data within 30 days, except where we are required to retain it for legal or accounting purposes.`,
  },
  {
    title: '6. Data sharing',
    body: `We share your data with: (a) Service providers — Supabase (database and authentication), Vercel (hosting), Stripe (payments), Resend (transactional email), PostHog (product analytics), Anthropic (AI features), and Upstash (rate limiting). These providers act as data processors under GDPR and are bound by data processing agreements. (b) Legal authorities — if required by law or to protect our rights. We do not share your data with advertisers or data brokers.`,
  },
  {
    title: '7. International transfers',
    body: `Our service providers may process data outside the European Economic Area (EEA). Where this occurs, we ensure appropriate safeguards are in place, including Standard Contractual Clauses approved by the European Commission.`,
  },
  {
    title: '8. Your rights',
    body: `Under GDPR, you have the right to: access your personal data; correct inaccurate data; request deletion of your data; object to processing; restrict processing; data portability; and withdraw consent at any time. To exercise any of these rights, contact us at hello@opuslearn.ai. You also have the right to lodge a complaint with your local supervisory authority.`,
  },
  {
    title: '9. Cookies',
    body: `We use essential cookies (required for authentication and security) and analytics cookies (to understand how the platform is used). You can manage cookie preferences in your browser settings. Disabling essential cookies may prevent you from using certain features.`,
  },
  {
    title: '10. Security',
    body: `We use industry-standard security measures including encryption in transit (TLS), encryption at rest, access controls, and regular security reviews. No system is completely secure — if you believe your account has been compromised, contact us immediately at hello@opuslearn.ai.`,
  },
  {
    title: '11. Changes to this policy',
    body: `We may update this Privacy Policy from time to time. We will notify you of material changes by email or by a prominent notice on the platform. Continued use of the platform after changes take effect constitutes acceptance of the updated policy.`,
  },
  {
    title: '12. Contact',
    body: `For any privacy-related questions or to exercise your rights, contact: hello@opuslearn.ai or write to: OpusLearn SAS, 10 rue de la Paix, 75002 Paris, France.`,
  },
]

export default function PrivacyPage() {
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
            <h1 className="text-4xl font-black tracking-tight mb-3" style={{ color: '#0F172A' }}>Privacy Policy</h1>
            <p className="text-sm" style={{ color: '#94A3B8' }}>Last updated: 1 May 2026</p>
          </div>

          <div className="prose max-w-none space-y-10">
            {SECTIONS.map(s => (
              <div key={s.title}>
                <h2 className="text-base font-black mb-3" style={{ color: '#0F172A' }}>{s.title}</h2>
                <p className="text-sm leading-relaxed" style={{ color: '#475569' }}>{s.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-8" style={{ borderTop: '1px solid #E2E8F0' }}>
            <p className="text-xs" style={{ color: '#94A3B8' }}>
              For questions about this policy, email{' '}
              <a href="mailto:hello@opuslearn.ai" style={{ color: '#2563EB' }}>hello@opuslearn.ai</a>
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
