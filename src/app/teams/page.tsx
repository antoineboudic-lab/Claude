'use client'

import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef } from 'react'
import { useInView } from 'framer-motion'
import {
  Zap, Users, BarChart3, Award, CheckCircle2, ArrowRight,
  ChevronDown, Building2, Shield, Headphones, Globe,
  BookOpen, TrendingUp, Star,
} from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

function stagger(delay = 0.1) {
  return { hidden: {}, visible: { transition: { staggerChildren: delay } } }
}

const FEATURES = [
  { icon: Users, title: 'Team dashboard', desc: 'See every team member\'s progress, completion rate, and skill gaps across all tracks in one view.' },
  { icon: BarChart3, title: 'Progress analytics', desc: 'Weekly cohort reports, leaderboards, and completion forecasts to keep your team on track.' },
  { icon: Award, title: 'Group certificates', desc: 'Individual certificates for each learner plus a team AI Literacy badge for LinkedIn and company profiles.' },
  { icon: BookOpen, title: 'Custom track assignment', desc: 'Assign specific tracks to specific roles. Your sales team gets the sales track; your finance team gets finance.' },
  { icon: Shield, title: 'SSO & SCIM', desc: 'Enterprise-grade authentication via Okta, Azure AD, or Google Workspace. Automatic provisioning and de-provisioning.' },
  { icon: Globe, title: 'Dedicated success manager', desc: 'Enterprise accounts get a named success manager for onboarding, check-ins, and programme optimisation.' },
]

const PLANS = [
  {
    name: 'Starter',
    seats: '5–15 seats',
    price: '$49',
    period: '/seat/month',
    color: '#10B981',
    highlight: false,
    features: [
      'All 10 role tracks',
      'Team progress dashboard',
      'Individual certificates',
      'Email support',
      'Monthly cohort reports',
    ],
  },
  {
    name: 'Growth',
    seats: '16–50 seats',
    price: '$39',
    period: '/seat/month',
    color: '#0D9488',
    highlight: true,
    features: [
      'Everything in Starter',
      'Custom track assignment',
      'Priority support',
      'Quarterly business review',
      'Team AI Literacy badge',
      'Slack community access',
    ],
  },
  {
    name: 'Enterprise',
    seats: '50+ seats',
    price: 'Custom',
    period: 'pricing',
    color: '#0EA5E9',
    highlight: false,
    features: [
      'Everything in Growth',
      'SSO & SCIM provisioning',
      'Dedicated success manager',
      'Custom content options',
      'Executive reporting',
      'SLA & security review',
    ],
  },
]

const COMPANIES = ['McKinsey', 'Deloitte', 'Goldman Sachs', 'Accenture', 'L\'Oréal', 'Nestlé', 'Airbus', 'Stripe']

const HOW_IT_WORKS = [
  { n: '01', title: 'Enroll your team', desc: 'Add team members by email or connect your directory via SSO. Assign each person to the track that matches their role.' },
  { n: '02', title: 'Track progress together', desc: 'Monitor completion rates, skill assessments, and time-to-certificate across your entire team from one dashboard.' },
  { n: '03', title: 'Certify and share', desc: 'Every team member earns their individual certificate. Your team earns a group AI Literacy credential you can share externally.' },
]

const FAQS = [
  { q: 'Can team members work at their own pace?', a: 'Yes. Every learner has full access to their assigned tracks and can complete lessons at whatever pace fits their schedule. There are no deadlines unless you set them.' },
  { q: 'What if someone needs a different track than their role?', a: 'Admins can assign any combination of tracks to any team member. Someone in a cross-functional role can be enrolled in multiple tracks simultaneously.' },
  { q: 'How does billing work for teams?', a: 'Team plans are billed annually per seat. If you add seats mid-year, they\'re prorated. Enterprise plans can be structured as a flat annual fee.' },
  { q: 'Is there a minimum commitment?', a: 'Starter and Growth plans require a minimum of 5 seats and an annual commitment. Enterprise contracts are custom.' },
  { q: 'Can we get a demo before committing?', a: 'Yes — use the contact form below to request a 30-minute walkthrough with the team. We\'ll show you the dashboard, track assignment, and reporting.' },
]

const TESTIMONIALS = [
  {
    quote: "We enrolled our entire operations and finance team in a single cohort. Within 8 weeks, we had measurable productivity changes and 100% certificate completion. The dashboard made it easy to manage without creating overhead.",
    name: 'Camille Durand',
    role: 'Chief People Officer',
    company: 'Schneider Electric',
    color: '#0D9488',
  },
  {
    quote: "The role-specific tracks were the key differentiator. Our legal team needed different content than our sales team. AI Literacy let us deploy the right curriculum to the right people without building anything custom.",
    name: 'Jonathan Marsh',
    role: 'Head of L&D',
    company: 'Linklaters',
    color: '#0EA5E9',
  },
]

export default function TeamsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [formData, setFormData] = useState({ name: '', email: '', company: '', size: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const { openSignUp } = useAuth()

  const heroRef = useRef(null)
  const heroInView = useInView(heroRef, { once: true })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <main style={{ background: '#F0FDFA', minHeight: '100vh', fontFamily: 'var(--font-sans)' }}>
      {/* Nav */}
      <nav className="sticky top-0 z-40 px-6 py-4 flex items-center justify-between"
        style={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #E2E8F0' }}>
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: '#0D9488' }}>
            <Zap size={13} className="text-white" />
          </div>
          <span className="font-black text-base" style={{ color: '#0F172A' }}>AI Literacy</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/tracks" className="text-sm font-medium" style={{ color: '#64748B' }}>Tracks</Link>
          <Link href="/certificates" className="text-sm font-medium" style={{ color: '#64748B' }}>Certificates</Link>
          <a href="#contact"
            className="px-4 py-2 rounded-lg text-sm font-semibold text-white"
            style={{ background: '#0D9488' }}>
            Get a demo
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-20 sm:py-28" style={{ background: '#FFFFFF' }} ref={heroRef}>
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            variants={stagger(0.1)}
            initial="hidden"
            animate={heroInView ? 'visible' : 'hidden'}
            className="max-w-3xl">
            <motion.div variants={fadeUp}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6"
              style={{ background: '#CCFBF1', color: '#0D9488', border: '1px solid #99F6E4' }}>
              <Users size={11} /> For teams and organisations
            </motion.div>
            <motion.h1 variants={fadeUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] mb-5"
              style={{ color: '#0F172A' }}>
              Upskill your entire<br />
              <span style={{ color: '#0D9488' }}>team in AI</span> — together
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg leading-relaxed mb-8 max-w-xl" style={{ color: '#64748B' }}>
              Role-specific tracks for every function. Team progress visibility. Group certificates your organisation can stand behind.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
              <a href="#contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-base text-white transition-all hover:opacity-90"
                style={{ background: '#0D9488', boxShadow: '0 4px 16px rgba(13,148,136,0.28)' }}>
                Get a demo <ArrowRight size={16} />
              </a>
              <a href="#plans"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-base transition-all hover:bg-slate-100"
                style={{ background: '#F0FDFA', color: '#334155', border: '1px solid #E2E8F0' }}>
                See plans
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Social proof bar */}
      <div className="py-6" style={{ background: '#F0FDFA', borderTop: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0' }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-wrap items-center gap-2 sm:gap-0 sm:divide-x" style={{ borderColor: '#E2E8F0' }}>
            <p className="text-xs font-semibold sm:pr-6" style={{ color: '#94A3B8' }}>Trusted by teams at</p>
            {COMPANIES.map(c => (
              <span key={c} className="text-sm font-bold sm:px-5 sm:py-1" style={{ color: '#CBD5E1' }}>{c}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ background: '#FFFFFF' }}>
        <div className="max-w-5xl mx-auto px-6 py-12 grid grid-cols-2 sm:grid-cols-4 gap-6">
          {[
            { n: '3,200+', label: 'Professionals trained' },
            { n: '94%', label: 'Team completion rate' },
            { n: '10', label: 'Role-specific tracks' },
            { n: '4.9/5', label: 'Learner satisfaction' },
          ].map(({ n, label }) => (
            <div key={n} className="text-center">
              <p className="text-3xl font-black mb-1" style={{ color: '#0F172A' }}>{n}</p>
              <p className="text-sm" style={{ color: '#64748B' }}>{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-16" style={{ background: '#F0FDFA', borderTop: '1px solid #E2E8F0' }}>
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-6">
          {TESTIMONIALS.map(t => (
            <div key={t.name} className="rounded-2xl p-8"
              style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="#F59E0B" color="#F59E0B" />)}
              </div>
              <p className="text-base leading-relaxed mb-6 italic" style={{ color: '#334155' }}>"{t.quote}"</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white"
                  style={{ background: t.color }}>
                  {t.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: '#0F172A' }}>{t.name}</p>
                  <p className="text-xs" style={{ color: '#94A3B8' }}>{t.role}, {t.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <div className="py-20" style={{ background: '#FFFFFF' }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#0D9488' }}>How it works</p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight" style={{ color: '#0F172A' }}>Up and running in days, not months</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-8">
            {HOW_IT_WORKS.map(step => (
              <div key={step.n}>
                <p className="text-4xl font-black mb-3" style={{ color: '#E2E8F0' }}>{step.n}</p>
                <h3 className="text-base font-black mb-2" style={{ color: '#0F172A' }}>{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#64748B' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="py-20" style={{ background: '#F0FDFA', borderTop: '1px solid #E2E8F0' }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#0D9488' }}>Built for teams</p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight" style={{ color: '#0F172A' }}>Everything you need to run a great programme</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map(f => {
              const Icon = f.icon
              return (
                <div key={f.title} className="p-6 rounded-2xl"
                  style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: '#CCFBF1' }}>
                    <Icon size={18} style={{ color: '#0D9488' }} />
                  </div>
                  <h3 className="text-base font-black mb-2" style={{ color: '#0F172A' }}>{f.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#64748B' }}>{f.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Plans */}
      <div id="plans" className="py-20" style={{ background: '#FFFFFF' }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#0D9488' }}>Team pricing</p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-3" style={{ color: '#0F172A' }}>Simple, transparent pricing</h2>
            <p className="text-base" style={{ color: '#64748B' }}>All plans billed annually. Individual learner plans also available.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {PLANS.map(plan => (
              <div key={plan.name}
                className="rounded-2xl p-7 relative"
                style={{
                  background: plan.highlight ? '#0D9488' : '#FFFFFF',
                  border: plan.highlight ? 'none' : '1px solid #E2E8F0',
                  boxShadow: plan.highlight ? '0 20px 60px rgba(13,148,136,0.25)' : '0 1px 3px rgba(0,0,0,0.04)',
                }}>
                {plan.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold"
                    style={{ background: '#F59E0B', color: '#FFFFFF' }}>
                    Most popular
                  </span>
                )}
                <div className="mb-6">
                  <p className="text-xs font-bold tracking-widest uppercase mb-1"
                    style={{ color: plan.highlight ? 'rgba(255,255,255,0.6)' : '#94A3B8' }}>
                    {plan.seats}
                  </p>
                  <h3 className="text-xl font-black mb-3"
                    style={{ color: plan.highlight ? '#FFFFFF' : '#0F172A' }}>
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black" style={{ color: plan.highlight ? '#FFFFFF' : '#0F172A' }}>
                      {plan.price}
                    </span>
                    <span className="text-sm" style={{ color: plan.highlight ? 'rgba(255,255,255,0.6)' : '#94A3B8' }}>
                      {plan.period}
                    </span>
                  </div>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-2.5 text-sm"
                      style={{ color: plan.highlight ? 'rgba(255,255,255,0.85)' : '#475569' }}>
                      <CheckCircle2 size={14}
                        style={{ color: plan.highlight ? '#5EEAD4' : plan.color, flexShrink: 0, marginTop: 1 }} />
                      {f}
                    </li>
                  ))}
                </ul>
                <a href="#contact"
                  className="block text-center py-3 rounded-xl font-semibold text-sm transition-all hover:opacity-90"
                  style={{
                    background: plan.highlight ? '#FFFFFF' : '#0D9488',
                    color: plan.highlight ? '#0D9488' : '#FFFFFF',
                  }}>
                  {plan.name === 'Enterprise' ? 'Contact us' : 'Get started'}
                </a>
              </div>
            ))}
          </div>
          <p className="text-center text-sm mt-8" style={{ color: '#94A3B8' }}>
            Need individual access?{' '}
            <button onClick={openSignUp} className="font-semibold hover:underline" style={{ color: '#0D9488' }}>
              Start free as a solo learner
            </button>
          </p>
        </div>
      </div>

      {/* FAQ */}
      <div className="py-20" style={{ background: '#F0FDFA', borderTop: '1px solid #E2E8F0' }}>
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-2xl font-black mb-8 text-center" style={{ color: '#0F172A' }}>Frequently asked questions</h2>
          <div className="space-y-2">
            {FAQS.map((faq, i) => (
              <div key={i} className="rounded-xl overflow-hidden"
                style={{ border: '1px solid #E2E8F0', background: '#FFFFFF' }}>
                <button
                  className="w-full text-left px-5 py-4 flex items-center justify-between gap-3 font-semibold text-sm transition-colors hover:bg-slate-50"
                  style={{ color: '#0F172A' }}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  {faq.q}
                  <ChevronDown size={15} style={{ color: '#94A3B8', flexShrink: 0, transition: 'transform 0.2s', transform: openFaq === i ? 'rotate(180deg)' : 'none' }} />
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}
                      style={{ overflow: 'hidden' }}>
                      <div className="px-5 pb-4 text-sm leading-relaxed" style={{ color: '#64748B' }}>
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact / Demo form */}
      <div id="contact" className="py-20" style={{ background: '#FFFFFF' }}>
        <div className="max-w-lg mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#0D9488' }}>Get in touch</p>
            <h2 className="text-3xl font-black mb-3" style={{ color: '#0F172A' }}>Book a 30-minute demo</h2>
            <p className="text-base" style={{ color: '#64748B' }}>
              We'll walk you through the team dashboard, track assignment, and reporting — and answer any questions about fit for your organisation.
            </p>
          </div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-2xl p-10 text-center"
              style={{ background: '#F0FDF4', border: '1px solid #BBF7D0' }}>
              <CheckCircle2 size={40} className="mx-auto mb-4" style={{ color: '#10B981' }} />
              <h3 className="text-xl font-black mb-2" style={{ color: '#0F172A' }}>Request received</h3>
              <p className="text-sm" style={{ color: '#64748B' }}>
                Someone from our team will reach out within one business day to schedule your demo.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { key: 'name', label: 'Your name', placeholder: 'Sophie Armand', type: 'text' },
                { key: 'email', label: 'Work email', placeholder: 'sophie@company.com', type: 'email' },
                { key: 'company', label: 'Company', placeholder: 'Acme Corp', type: 'text' },
              ].map(field => (
                <div key={field.key}>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: '#334155' }}>{field.label}</label>
                  <input
                    type={field.type}
                    required
                    placeholder={field.placeholder}
                    value={(formData as Record<string, string>)[field.key]}
                    onChange={e => setFormData(prev => ({ ...prev, [field.key]: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                    style={{
                      border: '1.5px solid #E2E8F0',
                      color: '#0F172A',
                      fontFamily: 'var(--font-sans)',
                      background: '#FFFFFF',
                    }}
                    onFocus={e => (e.target.style.borderColor = '#0D9488')}
                    onBlur={e => (e.target.style.borderColor = '#E2E8F0')}
                  />
                </div>
              ))}
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: '#334155' }}>Team size</label>
                <select
                  required
                  value={formData.size}
                  onChange={e => setFormData(prev => ({ ...prev, size: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                  style={{
                    border: '1.5px solid #E2E8F0',
                    color: formData.size ? '#0F172A' : '#94A3B8',
                    fontFamily: 'var(--font-sans)',
                    background: '#FFFFFF',
                  }}>
                  <option value="" disabled>Select team size</option>
                  <option value="5-15">5–15 people</option>
                  <option value="16-50">16–50 people</option>
                  <option value="51-200">51–200 people</option>
                  <option value="200+">200+ people</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: '#334155' }}>
                  Anything specific you want to cover? <span style={{ color: '#94A3B8', fontWeight: 400 }}>(optional)</span>
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. We have 40 people across marketing, sales, and ops — we're particularly interested in the team dashboard and custom track assignment."
                  value={formData.message}
                  onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all resize-none"
                  style={{
                    border: '1.5px solid #E2E8F0',
                    color: '#0F172A',
                    fontFamily: 'var(--font-sans)',
                    background: '#FFFFFF',
                  }}
                  onFocus={e => (e.target.style.borderColor = '#0D9488')}
                  onBlur={e => (e.target.style.borderColor = '#E2E8F0')}
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 rounded-xl font-semibold text-sm text-white transition-all hover:opacity-90"
                style={{ background: '#0D9488', boxShadow: '0 4px 16px rgba(13,148,136,0.25)' }}>
                Request demo <ArrowRight size={14} className="inline ml-1" />
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="py-16" style={{ background: '#F0FDFA', borderTop: '1px solid #E2E8F0' }}>
        <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-black mb-1" style={{ color: '#0F172A' }}>Not ready for a team plan?</h3>
            <p className="text-sm" style={{ color: '#64748B' }}>Individual access is free to start. Take the assessment to find your track.</p>
          </div>
          <Link href="/assessment"
            className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white transition-all hover:opacity-90"
            style={{ background: '#0D9488' }}>
            Start free <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </main>
  )
}
