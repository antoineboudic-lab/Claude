'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, Mail, MessageCircle } from 'lucide-react'
import Logo from '@/components/Logo'

const FAQS: { category: string; color: string; items: { q: string; a: string }[] }[] = [
  {
    category: 'Getting started',
    color: '#2563EB',
    items: [
      { q: 'How does the assessment work?', a: 'The assessment is a 5-question survey about your role, industry, experience level, and goals. It takes about 3 minutes and the results are used to build your personalised learning path. There are no right or wrong answers — only honest ones.' },
      { q: 'Do I need any technical background?', a: 'No. OpusLearn is designed specifically for business professionals with no coding background. Every lesson, example, and exercise assumes zero technical knowledge. If you know how to use email and a spreadsheet, you have everything you need.' },
      { q: 'How long does a track take to complete?', a: 'Tracks have 16–20 lessons, each taking 15–20 minutes. Most learners complete their full track in 6–8 weeks at 2–3 lessons per week. You can go faster or slower — the platform adapts to your pace.' },
      { q: 'Can I switch tracks after I start?', a: 'Yes. You can start a new track at any time from your dashboard. Your progress on your current track is saved and you can return to it whenever you want.' },
    ],
  },
  {
    category: 'Pricing & billing',
    color: '#10B981',
    items: [
      { q: 'What\'s included in the free plan?', a: 'The free plan gives you full access to Module 1 of your chosen track — that\'s 4 complete lessons with exercises and assessments. No credit card required, no time limit. You can complete Module 1 at your own pace.' },
      { q: 'How does the 7-day free trial work?', a: 'When you upgrade to the Professional plan, you get 7 days of full access at no charge. You won\'t be billed until the 8th day. You can cancel at any time during the trial and you\'ll never be charged.' },
      { q: 'Can I cancel anytime?', a: 'Yes, you can cancel your subscription at any time from your account settings. There\'s no cancellation fee. If you cancel, you\'ll retain access until the end of your current billing period.' },
      { q: 'Do you offer team or enterprise pricing?', a: 'Yes. Our Team plan is €39/seat/month (billed annually) for groups of 5 or more. For larger organisations or custom requirements, contact us at hello@opuslearn.ai and we\'ll build a plan around your needs.' },
    ],
  },
  {
    category: 'Certificates',
    color: '#F59E0B',
    items: [
      { q: 'How do I earn my certificate?', a: 'You earn your certificate by completing all lessons in a track, including the applied exercises at the end of each module. Certificates are awarded automatically once you finish — you\'ll find them in your dashboard.' },
      { q: 'How are certificates verified?', a: 'Each certificate has a unique verification URL that anyone (employers, recruiters, colleagues) can visit to confirm its authenticity. The verification page shows your name, track, completion date, and the specific skills covered.' },
      { q: 'Can I add my certificate to LinkedIn?', a: 'Yes. From your certificates page in the dashboard, click "Add to LinkedIn" and the credential will be added to your LinkedIn profile\'s Licenses & Certifications section automatically.' },
    ],
  },
  {
    category: 'Account & access',
    color: '#3B82F6',
    items: [
      { q: 'How do I reset my password?', a: 'On the sign-in page, click "Forgot password" and enter your email address. You\'ll receive a reset link within a few minutes. If you don\'t see it, check your spam folder.' },
      { q: 'Can I access OpusLearn on mobile?', a: 'Yes. The platform is fully responsive and works well on phones and tablets. For the best experience with applied exercises, we recommend a laptop or desktop — but lessons can be read and completed on mobile.' },
      { q: 'What happens to my progress if I cancel?', a: 'Your account and progress are preserved even if you cancel your subscription. You\'ll lose access to paid content, but your completed lessons, progress, and certificates remain in your account. If you resubscribe, everything picks up exactly where you left off.' },
    ],
  },
]

function AccordionItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: '1px solid #F1F5F9' }}>
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between gap-4 py-4 text-left transition-colors hover:text-blue-700"
        style={{ color: '#0F172A', fontFamily: 'var(--font-sans)' }}>
        <span className="text-sm font-semibold">{q}</span>
        <motion.div animate={{ rotate: open ? 90 : 0 }} transition={{ duration: 0.2 }} className="flex-shrink-0">
          <ChevronRight size={15} style={{ color: '#94A3B8' }} />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}>
            <p className="pb-4 text-sm leading-relaxed" style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function HelpPage() {
  const [activeCategory, setActiveCategory] = useState('Getting started')
  const current = FAQS.find(f => f.category === activeCategory)!

  return (
    <main style={{ background: '#EFF6FF', minHeight: '100vh', fontFamily: 'var(--font-sans)' }}>
      {/* Nav */}
      <nav className="sticky top-0 z-40 px-6 py-4 flex items-center justify-between"
        style={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #E2E8F0' }}>
        <Link href="/" className="flex items-center gap-2">
          <Logo size="md" />
        </Link>
        <a href="mailto:hello@opuslearn.ai"
          className="px-4 py-2 rounded-lg text-sm font-semibold text-white"
          style={{ background: '#2563EB' }}>
          Contact support
        </a>
      </nav>

      {/* Header */}
      <section className="py-16 sm:py-20" style={{ background: '#FFFFFF' }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#2563EB' }}>Help centre</p>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4" style={{ color: '#0F172A' }}>
              How can we help?
            </h1>
            <p className="text-lg" style={{ color: '#64748B' }}>
              Find answers to the most common questions below. Can't find what you need?{' '}
              <a href="mailto:hello@opuslearn.ai" style={{ color: '#2563EB', fontWeight: 600 }}>Get in touch.</a>
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 pb-24" style={{ background: '#FFFFFF' }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-[220px_1fr] gap-10">
            {/* Category nav */}
            <nav className="space-y-1">
              {FAQS.map(f => (
                <button key={f.category}
                  onClick={() => setActiveCategory(f.category)}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-left transition-all"
                  style={{
                    background: activeCategory === f.category ? f.color + '12' : 'transparent',
                    color: activeCategory === f.category ? f.color : '#64748B',
                    fontFamily: 'var(--font-sans)',
                  }}>
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: activeCategory === f.category ? f.color : '#E2E8F0' }} />
                  {f.category}
                </button>
              ))}
            </nav>

            {/* Questions */}
            <div>
              <h2 className="text-xl font-black mb-6" style={{ color: '#0F172A' }}>{current.category}</h2>
              <div className="rounded-2xl overflow-hidden px-6" style={{ background: '#EFF6FF', border: '1px solid #E2E8F0' }}>
                {current.items.map(item => (
                  <AccordionItem key={item.q} q={item.q} a={item.a} />
                ))}
              </div>
            </div>
          </div>

          {/* Still need help */}
          <div className="mt-16 grid sm:grid-cols-2 gap-5">
            <a href="mailto:hello@opuslearn.ai"
              className="p-7 rounded-2xl flex items-center gap-4 transition-all hover:shadow-md"
              style={{ background: '#FFFFFF', border: '1px solid #E2E8F0' }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#DBEAFE' }}>
                <Mail size={18} style={{ color: '#2563EB' }} />
              </div>
              <div>
                <p className="text-sm font-black mb-0.5" style={{ color: '#0F172A' }}>Email support</p>
                <p className="text-xs" style={{ color: '#94A3B8' }}>hello@opuslearn.ai · Response within 24h</p>
              </div>
            </a>
            <Link href="/contact"
              className="p-7 rounded-2xl flex items-center gap-4 transition-all hover:shadow-md"
              style={{ background: '#FFFFFF', border: '1px solid #E2E8F0' }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#ECFDF5' }}>
                <MessageCircle size={18} style={{ color: '#10B981' }} />
              </div>
              <div>
                <p className="text-sm font-black mb-0.5" style={{ color: '#0F172A' }}>Contact form</p>
                <p className="text-xs" style={{ color: '#94A3B8' }}>Send us a message directly</p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
