'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Check, ChevronDown, ChevronUp } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { useTranslations } from 'next-intl'
import { useGeo } from '@/hooks/useGeo'
import EditorialNav from '@/components/editorial/Nav'
import EditorialFooter from '@/components/editorial/Footer'
import { GrainOverlay } from '@/components/editorial/Atmosphere'
import {
  PAPER, PAPER_2, INK, INK_SOFT, INK_FAINT,
  COBALT, COBALT_TX, LIGHT, RULE, SERIF, MONO, SANS,
} from '@/components/editorial/theme'

const plans = {
  free: {
    title: 'Free',
    description: 'Everything you need to get started',
    features: [
      '1 learning track',
      'All 5 modules per track',
      'XP & streak system',
      'AI practice challenges',
      'Progress tracking',
    ],
  },
  pro: {
    title: 'Pro',
    description: 'For professionals serious about AI',
    features: [
      'Everything in Free',
      'All 10 learning tracks',
      'Certificate of completion',
      'Team leaderboard',
      'Priority support',
      'Early access to new tracks',
    ],
  },
  teams: {
    title: 'Teams',
    description: 'For organizations training multiple employees',
    features: [
      'Everything in Pro',
      'Centralized team dashboard',
      'Progress reporting',
      'Custom onboarding',
      'Invoicing & SSO',
    ],
  },
}

const faqs = [
  {
    q: 'Is there anything to cancel?',
    a: 'No — everything is free during our launch period. There\'s no subscription to manage and no card required.',
  },
  {
    q: "What's included in the free plan?",
    a: 'The free plan gives you full access to one learning track (5 modules, all lessons, XP system). No time limit.',
  },
  {
    q: 'Do you offer refunds?',
    a: "Yes, within 14 days of purchase if you haven't completed more than one module.",
  },
]

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: `1px solid ${RULE}` }}>
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '18px 0',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          fontFamily: SANS,
        }}
      >
        <span style={{ fontSize: 17, fontWeight: 500, color: INK, fontFamily: SERIF, letterSpacing: '-0.01em' }}>{q}</span>
        {open
          ? <ChevronUp size={17} style={{ color: INK_FAINT, flexShrink: 0 }} />
          : <ChevronDown size={17} style={{ color: INK_FAINT, flexShrink: 0 }} />}
      </button>
      {open && (
        <p style={{ fontSize: 14, color: INK_SOFT, lineHeight: 1.65, margin: '0 0 18px', paddingRight: 24, fontFamily: SANS }}>
          {a}
        </p>
      )}
    </div>
  )
}

export default function PricingPage() {
  const t = useTranslations('pricing')
  const tHomePricing = useTranslations('home.pricing')
  const { user, openSignUp } = useAuth()
  const { isUAE } = useGeo()
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly')
  const cur = isUAE ? 'AED' : '$'

  return (
    <main style={{ background: PAPER, minHeight: '100vh' }}>
      <GrainOverlay />
      <EditorialNav active="pricing" />

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '160px 24px 80px' }}>

        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <span style={{ display: 'inline-block', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.16em', color: COBALT_TX, background: 'rgba(36,64,216,0.08)', border: '1px solid rgba(36,64,216,0.20)', padding: '5px 14px', borderRadius: 4, marginBottom: 20, fontFamily: MONO }}>
            {tHomePricing('sectionLabel')}
          </span>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)', fontWeight: 500, color: INK, margin: '0 0 12px', letterSpacing: '-0.025em', lineHeight: 1.08, fontFamily: SERIF }}>
            {t('title')}
          </h1>
          <p style={{ fontSize: 16, color: INK_SOFT, margin: '0 0 32px', fontFamily: SANS }}>
            {t('subtitle')}
          </p>

          <div style={{ display: 'inline-flex', alignItems: 'center', background: PAPER_2, border: '1px solid rgba(0,0,0,0.16)', borderRadius: 8, padding: 4, gap: 2 }}>
            <button
              onClick={() => setBilling('monthly')}
              style={{
                padding: '8px 18px',
                borderRadius: 5,
                border: 'none',
                cursor: 'pointer',
                fontSize: 13,
                fontWeight: 600,
                fontFamily: SANS,
                background: billing === 'monthly' ? INK : 'transparent',
                color: billing === 'monthly' ? PAPER : INK_SOFT,
                transition: 'all 0.15s',
              }}
            >
              {t('monthly')}
            </button>
            <button
              onClick={() => setBilling('annual')}
              style={{
                padding: '8px 18px',
                borderRadius: 5,
                border: 'none',
                cursor: 'pointer',
                fontSize: 13,
                fontWeight: 600,
                fontFamily: SANS,
                background: billing === 'annual' ? INK : 'transparent',
                color: billing === 'annual' ? PAPER : INK_SOFT,
                transition: 'all 0.15s',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              {t('annual')}
              {billing === 'annual' && (
                <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: COBALT_TX, background: 'rgba(36,64,216,0.10)', padding: '2px 6px', borderRadius: 3, fontFamily: MONO }}>
                  {t('save')}
                </span>
              )}
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 40, alignItems: 'stretch' }}>

          {/* Free */}
          <div style={{ flex: '1 1 260px', maxWidth: 300, background: PAPER_2, border: `1px solid ${RULE}`, borderRadius: 10, padding: '28px 24px', display: 'flex', flexDirection: 'column' }}>
            <p style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.18em', color: INK_FAINT, margin: '0 0 12px', fontFamily: MONO }}>{plans.free.title}</p>
            <p style={{ fontSize: 32, fontWeight: 600, color: INK, margin: '0 0 6px', letterSpacing: '-0.02em', fontFamily: SERIF }}>{cur} 0<span style={{ fontSize: 15, fontWeight: 400, color: INK_FAINT, fontFamily: SANS }}>/mo</span></p>
            <p style={{ fontSize: 13, color: INK_SOFT, margin: '0 0 24px', lineHeight: 1.5, fontFamily: SANS }}>{plans.free.description}</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {plans.free.features.map(f => (
                <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 13, color: INK_SOFT, fontFamily: SANS }}>
                  <Check size={14} style={{ color: COBALT_TX, flexShrink: 0 }} />
                  {f}
                </li>
              ))}
            </ul>
            <div style={{ marginTop: 'auto' }}>
              {!user
                ? (
                  <button
                    onClick={() => openSignUp()}
                    style={{ width: '100%', padding: '12px 0', borderRadius: 3, border: `1px solid ${RULE}`, background: 'transparent', color: INK, fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: SANS }}
                  >
                    {t('getStarted')}
                  </button>
                )
                : (
                  <Link href="/dashboard" style={{ display: 'block', width: '100%', padding: '12px 0', borderRadius: 3, border: `1px solid ${RULE}`, background: 'transparent', color: INK, fontSize: 14, fontWeight: 600, textDecoration: 'none', textAlign: 'center', boxSizing: 'border-box', fontFamily: SANS }}>
                    {t('getStarted')}
                  </Link>
                )}
            </div>
          </div>

          {/* Pro — highlighted */}
          <div style={{ flex: '1 1 280px', maxWidth: 320, background: COBALT, borderRadius: 10, overflow: 'hidden', boxShadow: '0 24px 56px -28px rgba(36,64,216,0.6)', display: 'flex', flexDirection: 'column', position: 'relative' }}>
            {/* Decorative rings */}
            <div style={{ position: 'absolute', top: -48, right: -48, width: 160, height: 160, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.18)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', top: -32, right: -32, width: 112, height: 112, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.14)', pointerEvents: 'none' }} />
            <div style={{ padding: '28px 24px', display: 'flex', flexDirection: 'column', flex: 1, position: 'relative' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <p style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.6)', margin: 0, fontFamily: MONO }}>{plans.pro.title}</p>
                <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#FFFFFF', background: 'rgba(255,255,255,0.16)', padding: '3px 9px', borderRadius: 3, fontFamily: MONO }}>
                  Free at launch
                </span>
              </div>
              <div style={{ margin: '0 0 4px' }}>
                <p style={{ fontSize: 32, fontWeight: 600, color: '#FFFFFF', margin: 0, letterSpacing: '-0.02em', fontFamily: SERIF }}>
                  {cur} 0<span style={{ fontSize: 15, fontWeight: 400, color: 'rgba(255,255,255,0.5)', fontFamily: SANS }}>/mo</span>
                </p>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', margin: '2px 0 0', fontFamily: SANS }}>
                  <span style={{ textDecoration: 'line-through' }}>
                    {isUAE ? 'AED 45.99/mo' : '$12.99/mo'}
                  </span>
                  {' '}— free during launch
                </p>
              </div>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', margin: '0 0 24px', lineHeight: 1.5, fontFamily: SANS }}>{plans.pro.description}</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {plans.pro.features.map(f => (
                  <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 13, color: 'rgba(255,255,255,0.88)', fontFamily: SANS }}>
                    <Check size={14} style={{ color: 'rgba(255,255,255,0.9)', flexShrink: 0 }} />
                    {f}
                  </li>
                ))}
              </ul>
              <div style={{ marginTop: 'auto' }}>
                {user ? (
                  <Link
                    href="/dashboard"
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', padding: '12px 0', borderRadius: 3, border: 'none', background: LIGHT, color: COBALT, fontSize: 14, fontWeight: 600, textDecoration: 'none', boxSizing: 'border-box', fontFamily: SANS }}
                  >
                    Go to Dashboard
                  </Link>
                ) : (
                  <button
                    onClick={() => openSignUp()}
                    style={{ width: '100%', padding: '12px 0', borderRadius: 3, border: 'none', background: LIGHT, color: COBALT, fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: SANS }}
                  >
                    Get started free
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Teams */}
          <div style={{ flex: '1 1 260px', maxWidth: 300, background: PAPER_2, border: `1px solid ${RULE}`, borderRadius: 10, padding: '28px 24px', display: 'flex', flexDirection: 'column' }}>
            <p style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.18em', color: INK_FAINT, margin: '0 0 12px', fontFamily: MONO }}>{plans.teams.title}</p>
            <p style={{ fontSize: 32, fontWeight: 600, color: INK, margin: '0 0 6px', letterSpacing: '-0.02em', fontFamily: SERIF }}>{t('custom')}</p>
            <p style={{ fontSize: 13, color: INK_SOFT, margin: '0 0 24px', lineHeight: 1.5, fontFamily: SANS }}>{plans.teams.description}</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {plans.teams.features.map(f => (
                <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 13, color: INK_SOFT, fontFamily: SANS }}>
                  <Check size={14} style={{ color: COBALT_TX, flexShrink: 0 }} />
                  {f}
                </li>
              ))}
            </ul>
            <div style={{ marginTop: 'auto' }}>
              <a
                href="mailto:hello@opuslearn.ai"
                style={{ display: 'block', width: '100%', padding: '12px 0', borderRadius: 3, border: `1px solid ${RULE}`, background: 'transparent', color: INK, fontSize: 14, fontWeight: 600, textDecoration: 'none', textAlign: 'center', boxSizing: 'border-box', fontFamily: SANS }}
              >
                {t('contactUs')}
              </a>
            </div>
          </div>

        </div>

        <p style={{ textAlign: 'center', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.14em', color: INK_FAINT, marginBottom: 56, fontFamily: MONO }}>
          {t('trialNote')}
        </p>

        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <h2 style={{ fontSize: 24, fontWeight: 500, color: INK, margin: '0 0 4px', letterSpacing: '-0.02em', fontFamily: SERIF }}>
            {t('faq')}
          </h2>
          <p style={{ fontSize: 13, color: INK_FAINT, margin: '0 0 24px', fontFamily: SANS }}>{t('faqSub')}</p>
          <div style={{ borderTop: `1px solid ${RULE}` }}>
            {faqs.map(faq => (
              <FaqItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>

      </div>

      <EditorialFooter />
    </main>
  )
}
