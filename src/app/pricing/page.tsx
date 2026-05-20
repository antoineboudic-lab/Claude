'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Zap, Check, ChevronDown, ChevronUp, Loader2 } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { useTranslations } from 'next-intl'

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
    q: 'Can I cancel anytime?',
    a: 'Yes. Cancel from your dashboard at any time. Your access continues until the end of the billing period.',
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
    <div style={{ borderBottom: '1px solid #E2E8F0' }}>
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
          fontFamily: 'var(--font-sans)',
        }}
      >
        <span style={{ fontSize: 15, fontWeight: 600, color: '#0F172A' }}>{q}</span>
        {open
          ? <ChevronUp size={17} style={{ color: '#94A3B8', flexShrink: 0 }} />
          : <ChevronDown size={17} style={{ color: '#94A3B8', flexShrink: 0 }} />}
      </button>
      {open && (
        <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.65, margin: '0 0 18px', paddingRight: 24 }}>
          {a}
        </p>
      )}
    </div>
  )
}

export default function PricingPage() {
  const t = useTranslations('pricing')
  const tHomePricing = useTranslations('home.pricing')
  const { user, loading: authLoading, openSignUp, openSignIn } = useAuth()
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly')
  const [loading, setLoading] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleProCheckout() {
    if (loading) return
    setError(null)
    setLoading('pro')
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: billing }),
      })
      const data = await res.json()
      if (!res.ok || !data.url) {
        setError(data.error ?? 'Something went wrong. Please try again.')
        setLoading(null)
        return
      }
      window.location.href = data.url
    } catch {
      setError('Something went wrong. Please try again.')
      setLoading(null)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F1F5F9', fontFamily: 'var(--font-sans)' }}>

      <nav style={{ background: '#0F172A', height: 52, display: 'flex', alignItems: 'center', padding: '0 24px' }}>
        <div style={{ maxWidth: 960, margin: '0 auto', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: 'linear-gradient(135deg, #2563EB, #22D3EE)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Zap size={12} style={{ color: '#fff' }} />
            </div>
            <span style={{ fontSize: 14, fontWeight: 800, color: '#FFFFFF' }}>OpusLearn</span>
          </Link>
          {!authLoading && (
            user
              ? <Link href="/dashboard" style={{ fontSize: 13, fontWeight: 600, color: '#CBD5E1', textDecoration: 'none' }}>{t('dashboard')}</Link>
              : <button onClick={openSignIn} style={{ fontSize: 13, fontWeight: 600, color: '#CBD5E1', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-sans)', padding: 0 }}>{t('signIn')}</button>
          )}
        </div>
      </nav>

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '64px 24px 80px' }}>

        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <span style={{ display: 'inline-block', fontSize: 12, fontWeight: 700, color: '#2563EB', background: '#DBEAFE', padding: '4px 14px', borderRadius: 999, marginBottom: 20, letterSpacing: '0.02em' }}>
            {tHomePricing('sectionLabel')}
          </span>
          <h1 style={{ fontSize: '2rem', fontWeight: 900, color: '#0F172A', margin: '0 0 12px', letterSpacing: '-0.03em', lineHeight: 1.15 }}>
            {t('title')}
          </h1>
          <p style={{ fontSize: 16, color: '#64748B', margin: '0 0 32px' }}>
            {t('subtitle')}
          </p>

          <div style={{ display: 'inline-flex', alignItems: 'center', background: '#E2E8F0', borderRadius: 10, padding: 4, gap: 2 }}>
            <button
              onClick={() => setBilling('monthly')}
              style={{
                padding: '8px 18px',
                borderRadius: 7,
                border: 'none',
                cursor: 'pointer',
                fontSize: 13,
                fontWeight: 600,
                fontFamily: 'var(--font-sans)',
                background: billing === 'monthly' ? '#FFFFFF' : 'transparent',
                color: billing === 'monthly' ? '#0F172A' : '#64748B',
                boxShadow: billing === 'monthly' ? '0 1px 4px rgba(0,0,0,0.10)' : 'none',
                transition: 'all 0.15s',
              }}
            >
              {t('monthly')}
            </button>
            <button
              onClick={() => setBilling('annual')}
              style={{
                padding: '8px 18px',
                borderRadius: 7,
                border: 'none',
                cursor: 'pointer',
                fontSize: 13,
                fontWeight: 600,
                fontFamily: 'var(--font-sans)',
                background: billing === 'annual' ? '#FFFFFF' : 'transparent',
                color: billing === 'annual' ? '#0F172A' : '#64748B',
                boxShadow: billing === 'annual' ? '0 1px 4px rgba(0,0,0,0.10)' : 'none',
                transition: 'all 0.15s',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              {t('annual')}
              {billing === 'annual' && (
                <span style={{ fontSize: 10, fontWeight: 700, color: '#059669', background: '#D1FAE5', padding: '2px 6px', borderRadius: 5 }}>
                  {t('save')}
                </span>
              )}
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 40, alignItems: 'stretch' }}>

          <div style={{ flex: '1 1 260px', maxWidth: 300, background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 16, padding: '28px 24px', display: 'flex', flexDirection: 'column' }}>
            <p style={{ fontSize: 18, fontWeight: 800, color: '#0F172A', margin: '0 0 6px' }}>{plans.free.title}</p>
            <p style={{ fontSize: 32, fontWeight: 900, color: '#0F172A', margin: '0 0 4px', letterSpacing: '-0.03em' }}>$0<span style={{ fontSize: 16, fontWeight: 500, color: '#94A3B8' }}>/mo</span></p>
            <p style={{ fontSize: 13, color: '#64748B', margin: '0 0 24px', lineHeight: 1.5 }}>{plans.free.description}</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {plans.free.features.map(f => (
                <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 13, color: '#475569' }}>
                  <Check size={14} style={{ color: '#10B981', flexShrink: 0 }} />
                  {f}
                </li>
              ))}
            </ul>
            <div style={{ marginTop: 'auto' }}>
              {!user
                ? (
                  <button
                    onClick={() => openSignUp()}
                    style={{ width: '100%', padding: '11px 0', borderRadius: 10, border: '1px solid #E2E8F0', background: '#F8FAFC', color: '#0F172A', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-sans)' }}
                  >
                    {t('getStarted')}
                  </button>
                )
                : (
                  <Link href="/dashboard" style={{ display: 'block', width: '100%', padding: '11px 0', borderRadius: 10, border: '1px solid #E2E8F0', background: '#F8FAFC', color: '#0F172A', fontSize: 14, fontWeight: 600, textDecoration: 'none', textAlign: 'center', boxSizing: 'border-box' }}>
                    {t('getStarted')}
                  </Link>
                )}
            </div>
          </div>

          <div style={{ flex: '1 1 280px', maxWidth: 320, background: '#FFFFFF', border: '2px solid #2563EB', borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 24px rgba(37,99,235,0.13)', display: 'flex', flexDirection: 'column', position: 'relative' }}>
            <div style={{ height: 4, background: 'linear-gradient(90deg, #2563EB, #22D3EE)', width: '100%' }} />
            <div style={{ padding: '24px 24px 28px', display: 'flex', flexDirection: 'column', flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                <p style={{ fontSize: 18, fontWeight: 800, color: '#0F172A', margin: 0 }}>{plans.pro.title}</p>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#2563EB', background: '#DBEAFE', padding: '3px 10px', borderRadius: 999 }}>{t('mostPopular')}</span>
              </div>
              {billing === 'monthly'
                ? <p style={{ fontSize: 32, fontWeight: 900, color: '#0F172A', margin: '0 0 4px', letterSpacing: '-0.03em' }}>$19<span style={{ fontSize: 16, fontWeight: 500, color: '#94A3B8' }}>/mo</span></p>
                : (
                  <div style={{ margin: '0 0 4px' }}>
                    <p style={{ fontSize: 32, fontWeight: 900, color: '#0F172A', margin: 0, letterSpacing: '-0.03em' }}>$190<span style={{ fontSize: 16, fontWeight: 500, color: '#94A3B8' }}>/yr</span></p>
                    <p style={{ fontSize: 12, color: '#64748B', margin: '2px 0 0' }}>$15.83/mo, billed annually</p>
                  </div>
                )}
              <p style={{ fontSize: 13, color: '#64748B', margin: '0 0 24px', lineHeight: 1.5 }}>{plans.pro.description}</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {plans.pro.features.map(f => (
                  <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 13, color: '#475569' }}>
                    <Check size={14} style={{ color: '#2563EB', flexShrink: 0 }} />
                    {f}
                  </li>
                ))}
              </ul>
              <div style={{ marginTop: 'auto' }}>
                <button
                  onClick={handleProCheckout}
                  disabled={!!loading}
                  style={{
                    width: '100%',
                    padding: '12px 0',
                    borderRadius: 10,
                    border: 'none',
                    background: loading ? '#93C5FD' : '#2563EB',
                    color: '#FFFFFF',
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: loading ? 'not-allowed' : 'pointer',
                    fontFamily: 'var(--font-sans)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    transition: 'background 0.15s',
                  }}
                >
                  {loading === 'pro' ? <><Loader2 size={15} style={{ animation: 'spin 1s linear infinite' }} /> {t('redirecting')}</> : t('startTrial')}
                </button>
                {error && (
                  <p style={{ fontSize: 12, color: '#DC2626', marginTop: 8, textAlign: 'center' }}>{error}</p>
                )}
              </div>
            </div>
          </div>

          <div style={{ flex: '1 1 260px', maxWidth: 300, background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 16, padding: '28px 24px', display: 'flex', flexDirection: 'column' }}>
            <p style={{ fontSize: 18, fontWeight: 800, color: '#0F172A', margin: '0 0 6px' }}>{plans.teams.title}</p>
            <p style={{ fontSize: 32, fontWeight: 900, color: '#0F172A', margin: '0 0 4px', letterSpacing: '-0.03em' }}>{t('custom')}</p>
            <p style={{ fontSize: 13, color: '#64748B', margin: '0 0 24px', lineHeight: 1.5 }}>{plans.teams.description}</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {plans.teams.features.map(f => (
                <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 13, color: '#475569' }}>
                  <Check size={14} style={{ color: '#10B981', flexShrink: 0 }} />
                  {f}
                </li>
              ))}
            </ul>
            <div style={{ marginTop: 'auto' }}>
              <a
                href="mailto:hello@opuslearn.ai"
                style={{ display: 'block', width: '100%', padding: '11px 0', borderRadius: 10, border: '1px solid #E2E8F0', background: '#F8FAFC', color: '#0F172A', fontSize: 14, fontWeight: 600, textDecoration: 'none', textAlign: 'center', boxSizing: 'border-box' }}
              >
                {t('contactUs')}
              </a>
            </div>
          </div>

        </div>

        <p style={{ textAlign: 'center', fontSize: 13, color: '#94A3B8', marginBottom: 56 }}>
          {t('trialNote')}
        </p>

        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: '#0F172A', margin: '0 0 4px', letterSpacing: '-0.02em' }}>
            {t('faq')}
          </h2>
          <p style={{ fontSize: 13, color: '#94A3B8', margin: '0 0 24px' }}>{t('faqSub')}</p>
          <div style={{ borderTop: '1px solid #E2E8F0' }}>
            {faqs.map(faq => (
              <FaqItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>

      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}
