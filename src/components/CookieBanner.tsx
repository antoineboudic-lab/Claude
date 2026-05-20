'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'

const CONSENT_KEY = 'cookie_consent'

export type CookieConsent = 'accepted' | 'rejected'

export function getCookieConsent(): CookieConsent | null {
  if (typeof window === 'undefined') return null
  return (localStorage.getItem(CONSENT_KEY) as CookieConsent) ?? null
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem(CONSENT_KEY)) {
      setVisible(true)
    }
  }, [])

  function decide(choice: CookieConsent) {
    localStorage.setItem(CONSENT_KEY, choice)
    document.cookie = `${CONSENT_KEY}=${choice}; path=/; max-age=${365 * 24 * 60 * 60}; SameSite=Lax`
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <p className="text-sm text-muted-foreground">
          We use cookies to keep you signed in and remember your preferences.{' '}
          <a
            href="/privacy"
            className="underline underline-offset-4 hover:text-foreground"
          >
            Privacy policy
          </a>
          .
        </p>
        <div className="flex shrink-0 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => decide('rejected')}
          >
            Reject
          </Button>
          <Button size="sm" onClick={() => decide('accepted')}>
            Accept
          </Button>
        </div>
      </div>
    </div>
  )
}
