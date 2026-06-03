'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CheckCircle2, ArrowRight, Zap, BookOpen } from 'lucide-react'
import { clearSubscriptionCache } from '@/hooks/useSubscription'

export default function CheckoutSuccessPage() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    // Clear cached subscription so the new status is fetched fresh
    clearSubscriptionCache()
    const t = setTimeout(() => setReady(true), 800)
    return () => clearTimeout(t)
  }, [])

  const perks = [
    'All 5 modules across every track',
    'Hands-on exercises and Prompt Lab',
    'AI tutor for any lesson question',
    'Verified completion certificates',
    'Spaced repetition review system',
  ]

  return (
    <main style={{ minHeight: '100vh', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', fontFamily: 'var(--font-sans)' }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ maxWidth: '440px', width: '100%', textAlign: 'center' }}
      >
        {/* Success icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 12 }}
          style={{
            width: 88, height: 88, borderRadius: '50%',
            background: 'linear-gradient(135deg, #2563EB, #22D3EE)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 28px',
            boxShadow: '0 12px 36px rgba(37,99,235,0.3)',
          }}
        >
          <CheckCircle2 size={40} color="#FFFFFF" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#2563EB', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>
            Welcome to OpusLearn
          </p>
          <h1 style={{ fontSize: '2rem', fontWeight: 900, color: '#0F172A', marginBottom: 10, letterSpacing: '-0.02em', lineHeight: 1.15 }}>
            You&apos;re all set! 🎉
          </h1>
          <p style={{ fontSize: '0.9375rem', color: '#64748B', lineHeight: 1.65, marginBottom: 32 }}>
            Your account is ready. Everything is free during launch — no card needed.
          </p>

          {/* Perks */}
          <div style={{
            background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 16,
            padding: '20px 24px', marginBottom: 28, textAlign: 'left',
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
          }}>
            <p style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#94A3B8', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 14 }}>
              Now unlocked
            </p>
            {perks.map(p => (
              <div key={p} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <Zap size={13} style={{ color: '#2563EB', flexShrink: 0 }} />
                <span style={{ fontSize: '0.875rem', color: '#334155' }}>{p}</span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Link
              href="/dashboard"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                padding: '14px 24px', borderRadius: 12,
                background: 'linear-gradient(135deg, #2563EB, #22D3EE)',
                color: '#FFFFFF', textDecoration: 'none',
                fontSize: '0.9375rem', fontWeight: 700,
                boxShadow: '0 8px 24px rgba(37,99,235,0.25)',
              }}
            >
              Go to my dashboard <ArrowRight size={16} />
            </Link>
            <Link
              href="/tracks"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                padding: '14px 24px', borderRadius: 12,
                background: '#F1F5F9', color: '#475569',
                border: '1px solid #E2E8F0', textDecoration: 'none',
                fontSize: '0.875rem', fontWeight: 600,
              }}
            >
              <BookOpen size={14} /> Explore all tracks
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </main>
  )
}
