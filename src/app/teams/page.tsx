'use client'

import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { useInView } from 'framer-motion'
import {
  Users, BarChart3, Award, CheckCircle2, ArrowRight,
  ChevronDown, Shield, Globe, BookOpen, UserPlus, X,
} from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { getAdminTeam, type Team } from '@/lib/supabase/teams'
import EditorialNav from '@/components/editorial/Nav'
import EditorialFooter from '@/components/editorial/Footer'
import { GrainOverlay, AuroraGlow } from '@/components/editorial/Atmosphere'
import {
  PAPER, PAPER_2, PANEL, INK, INK_SOFT, INK_FAINT,
  COBALT, COBALT_TX, RULE, SERIF, MONO, SANS, fadeUp, stagger,
} from '@/components/editorial/theme'

const FEATURES = [
  { icon: Users, title: 'Team dashboard', desc: 'See every team member\'s progress, completion rate, and skill gaps across all tracks in one view.' },
  { icon: BarChart3, title: 'Progress analytics', desc: 'Weekly cohort reports, leaderboards, and completion forecasts to keep your team on track.' },
  { icon: Award, title: 'Group certificates', desc: 'Individual certificates for each learner plus a team OpusLearn badge for LinkedIn and company profiles.' },
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
    color: '#2563EB',
    highlight: true,
    features: [
      'Everything in Starter',
      'Custom track assignment',
      'Priority support',
      'Quarterly business review',
      'Team OpusLearn badge',
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


const HOW_IT_WORKS = [
  { n: '01', title: 'Enroll your team', desc: 'Add team members by email or connect your directory via SSO. Assign each person to the track that matches their role.' },
  { n: '02', title: 'Track progress together', desc: 'Monitor completion rates, skill assessments, and time-to-certificate across your entire team from one dashboard.' },
  { n: '03', title: 'Certify and share', desc: 'Every team member earns their individual certificate. Your team earns a group OpusLearn credential you can share externally.' },
]

const FAQS = [
  { q: 'Can team members work at their own pace?', a: 'Yes. Every learner has full access to their assigned tracks and can complete lessons at whatever pace fits their schedule. There are no deadlines unless you set them.' },
  { q: 'What if someone needs a different track than their role?', a: 'Admins can assign any combination of tracks to any team member. Someone in a cross-functional role can be enrolled in multiple tracks simultaneously.' },
  { q: 'How does billing work for teams?', a: 'Team plans are billed annually per seat. If you add seats mid-year, they\'re prorated. Enterprise plans can be structured as a flat annual fee.' },
  { q: 'Is there a minimum commitment?', a: 'Starter and Growth plans require a minimum of 5 seats and an annual commitment. Enterprise contracts are custom.' },
  { q: 'Can we get a demo before committing?', a: 'Yes — use the contact form below to request a 30-minute walkthrough with the team. We\'ll show you the dashboard, track assignment, and reporting.' },
]


export default function TeamsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const { openSignUp, user } = useAuth()

  const [adminTeam, setAdminTeam] = useState<Team | null>(null)
  const [showInvite, setShowInvite] = useState(false)
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteTracks, setInviteTracks] = useState('')
  const [inviteLoading, setInviteLoading] = useState(false)
  const [inviteError, setInviteError] = useState<string | null>(null)
  const [inviteSuccess, setInviteSuccess] = useState<string | null>(null)

  const heroRef = useRef(null)
  const heroInView = useInView(heroRef, { once: true })

  useEffect(() => {
    if (!user) return
    getAdminTeam(user.id).then(t => setAdminTeam(t))
  }, [user])

  async function handleInvite(e: React.FormEvent) {
    e.preventDefault()
    if (!adminTeam) return
    setInviteLoading(true)
    setInviteError(null)
    setInviteSuccess(null)
    const assignedTracks = inviteTracks.split(',').map(t => t.trim()).filter(Boolean)
    try {
      const res = await fetch('/api/team/invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ teamId: adminTeam.id, email: inviteEmail, assignedTracks }),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        setInviteError((body as { error?: string }).error ?? 'Something went wrong')
      } else {
        setInviteSuccess(`Invite sent to ${inviteEmail}!`)
        setInviteEmail('')
        setInviteTracks('')
      }
    } catch {
      setInviteError('Network error — please try again')
    }
    setInviteLoading(false)
  }


  return (
    <main style={{ background: PAPER, minHeight: '100vh' }}>
      <GrainOverlay />
      <EditorialNav active="teams" />

      {/* Hero */}
      <section className="relative overflow-hidden pt-40 pb-20 sm:pb-28" ref={heroRef}
        style={{ borderBottom: `1px solid ${RULE}` }}>
        <AuroraGlow style={{ width: 720, height: 720, top: -260, left: '50%', transform: 'translateX(-50%)', opacity: 0.4 }} />
        <div className="relative max-w-5xl mx-auto px-6">
          <motion.div
            variants={stagger(0.1)}
            initial="hidden"
            animate={heroInView ? 'visible' : 'hidden'}
            className="max-w-3xl">
            <motion.div variants={fadeUp}
              className="inline-flex items-center gap-2 px-3 py-1.5 mb-6"
              style={{ background: 'rgba(36,64,216,0.08)', color: COBALT_TX, border: `1px solid rgba(36,64,216,0.20)`, borderRadius: 4, fontFamily: MONO }}>
              <Users size={11} /> <span className="text-[11px] uppercase tracking-[0.16em]">For teams and organisations</span>
            </motion.div>
            <motion.h1 variants={fadeUp}
              className="mb-5"
              style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 'clamp(2.6rem, 5.5vw, 4rem)', lineHeight: 1.05, letterSpacing: '-0.03em', color: INK }}>
              Upskill your entire<br />
              team in AI — <span style={{ fontStyle: 'italic', color: COBALT_TX }}>together</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg leading-relaxed mb-8 max-w-xl" style={{ color: INK_SOFT, fontFamily: SANS }}>
              Role-specific tracks for every function. Team progress visibility. Group certificates your organisation can stand behind.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
              <Link href="/teams/demo"
                className="inline-flex items-center gap-2 px-8 py-4 font-semibold text-base text-white transition-opacity hover:opacity-90"
                style={{ background: COBALT, borderRadius: 3, fontFamily: SANS }}>
                Get a demo <ArrowRight size={16} />
              </Link>
              <a href="#plans"
                className="inline-flex items-center gap-2 px-8 py-4 font-semibold text-base transition-colors hover:bg-black/[0.03]"
                style={{ color: INK, border: `1px solid ${RULE}`, borderRadius: 3, fontFamily: SANS }}>
                See plans
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <div style={{ background: PANEL, borderBottom: `1px solid ${RULE}` }}>
        <div className="max-w-5xl mx-auto px-6 py-12 grid grid-cols-2 sm:grid-cols-4 gap-6">
          {[
            { n: '11', label: 'Role-specific tracks' },
            { n: '286', label: 'Hands-on lessons' },
            { n: '14', label: 'Languages supported' },
            { n: '4', label: 'Steps in every lesson' },
          ].map(({ n, label }) => (
            <div key={n} className="text-center">
              <p className="text-3xl mb-1" style={{ color: INK, fontFamily: SERIF, fontWeight: 500, letterSpacing: '-0.02em' }}>{n}</p>
              <p className="text-[11px] uppercase tracking-[0.14em]" style={{ color: INK_FAINT, fontFamily: MONO }}>{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Admin invite section */}
      {adminTeam && (
        <div style={{ background: PAPER_2, borderBottom: `1px solid ${RULE}` }}>
          <div className="max-w-5xl mx-auto px-6 py-6">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div>
                <p className="text-sm font-bold" style={{ color: INK, fontFamily: SANS }}>{adminTeam.name}</p>
                <p className="text-[11px] uppercase tracking-[0.14em]" style={{ color: INK_FAINT, fontFamily: MONO }}>You&apos;re the admin of this team</p>
              </div>
              <button
                onClick={() => { setShowInvite(v => !v); setInviteError(null); setInviteSuccess(null) }}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ background: COBALT, borderRadius: 3, fontFamily: SANS }}>
                <UserPlus size={14} /> Invite member
              </button>
            </div>
            {showInvite && (
              <div style={{ background: PAPER_2, border: `1px solid ${RULE}`, borderRadius: 8, padding: '20px 24px', marginTop: 16, marginBottom: 4 }}>
                {inviteSuccess ? (
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={16} style={{ color: '#10B981' }} />
                      <p className="text-sm font-semibold" style={{ color: INK, fontFamily: SANS }}>{inviteSuccess}</p>
                    </div>
                    <button
                      onClick={() => { setInviteSuccess(null); setShowInvite(false) }}
                      style={{ color: INK_FAINT }}>
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleInvite} className="space-y-4">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-bold" style={{ color: INK, fontFamily: SANS }}>Invite a team member</p>
                      <button type="button" onClick={() => setShowInvite(false)} style={{ color: INK_FAINT }}>
                        <X size={14} />
                      </button>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1.5" style={{ color: INK_SOFT, fontFamily: SANS }}>Email address</label>
                      <input
                        type="email"
                        required
                        placeholder="colleague@company.com"
                        value={inviteEmail}
                        onChange={e => setInviteEmail(e.target.value)}
                        className="w-full px-4 py-3 text-sm outline-none transition-all"
                        style={{ border: `1.5px solid ${RULE}`, borderRadius: 6, color: INK, fontFamily: SANS, background: PAPER_2 }}
                        onFocus={e => (e.target.style.borderColor = COBALT)}
                        onBlur={e => (e.target.style.borderColor = RULE)}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1.5" style={{ color: INK_SOFT, fontFamily: SANS }}>
                        Assign tracks <span style={{ color: INK_FAINT, fontWeight: 400 }}>(optional)</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. marketing, sales"
                        value={inviteTracks}
                        onChange={e => setInviteTracks(e.target.value)}
                        className="w-full px-4 py-3 text-sm outline-none transition-all"
                        style={{ border: `1.5px solid ${RULE}`, borderRadius: 6, color: INK, fontFamily: SANS, background: PAPER_2 }}
                        onFocus={e => (e.target.style.borderColor = COBALT)}
                        onBlur={e => (e.target.style.borderColor = RULE)}
                      />
                    </div>
                    {inviteError && (
                      <p className="text-xs" style={{ color: '#EF4444', fontFamily: SANS }}>{inviteError}</p>
                    )}
                    <div className="flex items-center gap-3">
                      <button
                        type="submit"
                        disabled={inviteLoading}
                        className="px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
                        style={{ background: COBALT, borderRadius: 3, fontFamily: SANS }}>
                        {inviteLoading ? 'Sending…' : 'Send invite'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowInvite(false)}
                        className="text-sm font-medium hover:underline"
                        style={{ color: INK_SOFT, fontFamily: SANS }}>
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* How it works */}
      <div className="py-20" style={{ background: PAPER }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-[11px] uppercase tracking-[0.16em] mb-3" style={{ color: COBALT_TX, fontFamily: MONO }}>How it works</p>
            <h2 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 'clamp(1.9rem, 4vw, 2.6rem)', letterSpacing: '-0.02em', color: INK }}>Up and running in days, not months</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-8">
            {HOW_IT_WORKS.map(step => (
              <div key={step.n}>
                <p className="text-4xl mb-3" style={{ color: INK_FAINT, fontFamily: SERIF, fontWeight: 500 }}>{step.n}</p>
                <h3 className="text-base mb-2" style={{ color: INK, fontFamily: SERIF, fontWeight: 500, letterSpacing: '-0.01em' }}>{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: INK_SOFT, fontFamily: SANS }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="py-20" style={{ background: PANEL, borderTop: `1px solid ${RULE}` }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-[11px] uppercase tracking-[0.16em] mb-3" style={{ color: COBALT_TX, fontFamily: MONO }}>Built for teams</p>
            <h2 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 'clamp(1.9rem, 4vw, 2.6rem)', letterSpacing: '-0.02em', color: INK }}>Everything you need to run a great programme</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map(f => {
              const Icon = f.icon
              return (
                <div key={f.title} className="p-6"
                  style={{ background: PAPER_2, border: `1px solid ${RULE}`, borderRadius: 8, boxShadow: '0 1px 3px rgba(26,27,31,0.04)' }}>
                  <div className="w-10 h-10 flex items-center justify-center mb-4" style={{ background: 'rgba(36,64,216,0.08)', border: `1px solid rgba(36,64,216,0.20)`, borderRadius: 6 }}>
                    <Icon size={18} style={{ color: COBALT_TX }} />
                  </div>
                  <h3 className="text-base mb-2" style={{ color: INK, fontFamily: SERIF, fontWeight: 500, letterSpacing: '-0.01em' }}>{f.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: INK_SOFT, fontFamily: SANS }}>{f.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Plans */}
      <div id="plans" className="py-20" style={{ background: PAPER }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-[11px] uppercase tracking-[0.16em] mb-3" style={{ color: COBALT_TX, fontFamily: MONO }}>Team pricing</p>
            <h2 className="mb-3" style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 'clamp(1.9rem, 4vw, 2.6rem)', letterSpacing: '-0.02em', color: INK }}>Simple, transparent pricing</h2>
            <p className="text-base mb-4" style={{ color: INK_SOFT, fontFamily: SANS }}>All plans billed annually. Individual learner plans also available.</p>
            <div className="inline-flex items-center gap-2 px-4 py-2 text-[11px] uppercase tracking-[0.14em]"
              style={{ background: 'rgba(36,64,216,0.08)', color: COBALT_TX, border: `1px solid rgba(36,64,216,0.20)`, borderRadius: 4, fontFamily: MONO }}>
              Team pricing is being finalised — contact us for early access rates
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {PLANS.map(plan => (
              <div key={plan.name}
                className="p-7 relative"
                style={{
                  background: plan.highlight ? COBALT : PAPER_2,
                  border: plan.highlight ? 'none' : `1px solid ${RULE}`,
                  borderRadius: 10,
                  boxShadow: plan.highlight ? '0 24px 64px rgba(36,64,216,0.20)' : '0 1px 3px rgba(26,27,31,0.04)',
                }}>
                {plan.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-[10px] uppercase tracking-[0.14em] font-semibold"
                    style={{ background: INK, color: PAPER, borderRadius: 3, fontFamily: MONO }}>
                    Most popular
                  </span>
                )}
                <div className="mb-6">
                  <p className="text-[11px] uppercase tracking-[0.16em] mb-1"
                    style={{ color: plan.highlight ? 'rgba(255,255,255,0.7)' : INK_FAINT, fontFamily: MONO }}>
                    {plan.seats}
                  </p>
                  <h3 className="text-xl mb-3"
                    style={{ color: plan.highlight ? '#FFFFFF' : INK, fontFamily: SERIF, fontWeight: 500, letterSpacing: '-0.01em' }}>
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl" style={{ color: plan.highlight ? '#FFFFFF' : INK, fontFamily: SERIF, fontWeight: 500, letterSpacing: '-0.02em' }}>
                      {plan.price}
                    </span>
                    <span className="text-sm" style={{ color: plan.highlight ? 'rgba(255,255,255,0.7)' : INK_FAINT, fontFamily: SANS }}>
                      {plan.period}
                    </span>
                  </div>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-2.5 text-sm"
                      style={{ color: plan.highlight ? 'rgba(255,255,255,0.88)' : INK_SOFT, fontFamily: SANS }}>
                      <CheckCircle2 size={14}
                        style={{ color: plan.highlight ? '#FFFFFF' : plan.color, flexShrink: 0, marginTop: 1 }} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/teams/demo"
                  className="block text-center py-3 font-semibold text-sm transition-opacity hover:opacity-90"
                  style={{
                    background: plan.highlight ? '#FFFFFF' : COBALT,
                    color: plan.highlight ? COBALT : '#FFFFFF',
                    borderRadius: 3,
                    fontFamily: SANS,
                  }}>
                  {plan.name === 'Enterprise' ? 'Contact us' : 'Get started'}
                </Link>
              </div>
            ))}
          </div>
          <p className="text-center text-sm mt-8" style={{ color: INK_FAINT, fontFamily: SANS }}>
            Need individual access?{' '}
            <button onClick={() => openSignUp()} className="font-semibold hover:underline" style={{ color: COBALT_TX }}>
              Start free as a solo learner
            </button>
          </p>
        </div>
      </div>

      {/* FAQ */}
      <div className="py-20" style={{ background: PANEL, borderTop: `1px solid ${RULE}` }}>
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="mb-8 text-center" style={{ color: INK, fontFamily: SERIF, fontWeight: 500, fontSize: 'clamp(1.6rem, 3.5vw, 2rem)', letterSpacing: '-0.02em' }}>Frequently asked questions</h2>
          <div className="space-y-2">
            {FAQS.map((faq, i) => (
              <div key={i} className="overflow-hidden"
                style={{ border: `1px solid ${RULE}`, borderRadius: 8, background: PAPER_2 }}>
                <button
                  className="w-full text-left px-5 py-4 flex items-center justify-between gap-3 font-semibold text-sm transition-colors hover:bg-black/[0.02]"
                  style={{ color: INK, fontFamily: SANS }}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  {faq.q}
                  <ChevronDown size={15} style={{ color: INK_FAINT, flexShrink: 0, transition: 'transform 0.2s', transform: openFaq === i ? 'rotate(180deg)' : 'none' }} />
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}
                      style={{ overflow: 'hidden' }}>
                      <div className="px-5 pb-4 text-sm leading-relaxed" style={{ color: INK_SOFT, fontFamily: SANS }}>
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

      {/* Contact / Demo CTA */}
      <div id="contact" className="py-20" style={{ background: PAPER }}>
        <div className="max-w-lg mx-auto px-6 text-center">
          <p className="text-[11px] uppercase tracking-[0.16em] mb-3" style={{ color: COBALT_TX, fontFamily: MONO }}>Get in touch</p>
          <h2 className="mb-3" style={{ color: INK, fontFamily: SERIF, fontWeight: 500, fontSize: 'clamp(1.9rem, 4vw, 2.6rem)', letterSpacing: '-0.02em' }}>Book a 30-minute demo</h2>
          <p className="text-base mb-8" style={{ color: INK_SOFT, fontFamily: SANS }}>
            We&apos;ll walk you through the team dashboard, track assignment, and reporting — and answer any questions about fit for your organisation.
          </p>
          <Link href="/teams/demo"
            className="inline-flex items-center gap-2 px-8 py-4 font-semibold text-base text-white transition-opacity hover:opacity-90"
            style={{ background: COBALT, borderRadius: 3, fontFamily: SANS }}>
            Request a demo <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="py-16" style={{ background: PANEL, borderTop: `1px solid ${RULE}` }}>
        <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl mb-1" style={{ color: INK, fontFamily: SERIF, fontWeight: 500, letterSpacing: '-0.01em' }}>Not ready for a team plan?</h3>
            <p className="text-sm" style={{ color: INK_SOFT, fontFamily: SANS }}>Individual access is free to start. Take the assessment to find your track.</p>
          </div>
          <Link href="/assessment"
            className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 font-semibold text-sm text-white transition-opacity hover:opacity-90"
            style={{ background: COBALT, borderRadius: 3, fontFamily: SANS }}>
            Start free <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      <EditorialFooter />
    </main>
  )
}
