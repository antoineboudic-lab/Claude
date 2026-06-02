'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const CONSENT_KEY = 'cookie_consent'

export type CookieConsent = 'accepted' | 'rejected'

export function getCookieConsent(): CookieConsent | null {
  if (typeof window === 'undefined') return null
  return (localStorage.getItem(CONSENT_KEY) as CookieConsent) ?? null
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem(CONSENT_KEY)) setVisible(true)
  }, [])

  function decide(choice: CookieConsent) {
    localStorage.setItem(CONSENT_KEY, choice)
    document.cookie = `${CONSENT_KEY}=${choice}; path=/; max-age=${365 * 24 * 60 * 60}; SameSite=Lax`
    window.dispatchEvent(new CustomEvent('cookie-consent', { detail: choice }))
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 9999,
      background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(12px)',
      borderTop: '1px solid #E2E8F0',
      boxShadow: '0 -4px 24px rgba(0,0,0,0.06)',
      fontFamily: 'var(--font-sans)',
    }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        padding: '16px 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: 16, flexWrap: 'wrap',
      }}>
        <p style={{ margin: 0, fontSize: 13, color: '#64748B', flex: 1, minWidth: 240, lineHeight: 1.5 }}>
          We use cookies and analytics to improve your experience.{' '}
          <Link href="/privacy" style={{ color: '#2563EB', textDecoration: 'underline' }}>
            Privacy policy
          </Link>
          .
        </p>
        <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
          <button
            onClick={() => decide('rejected')}
            style={{
              padding: '8px 16px', borderRadius: 8, fontSize: 13, fontWeight: 600,
              background: 'transparent', color: '#64748B',
              border: '1px solid #E2E8F0', cursor: 'pointer',
              fontFamily: 'var(--font-sans)',
            }}
          >
            Essential only
          </button>
          <button
            onClick={() => decide('accepted')}
            style={{
              padding: '8px 20px', borderRadius: 8, fontSize: 13, fontWeight: 600,
              background: '#2563EB', color: '#FFFFFF',
              border: 'none', cursor: 'pointer',
              fontFamily: 'var(--font-sans)',
            }}
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  )
}
