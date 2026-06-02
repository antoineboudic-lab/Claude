'use client'

import posthog from 'posthog-js'
import { PostHogProvider as PHProvider, usePostHog } from 'posthog-js/react'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, Suspense } from 'react'
import { useAuth } from '@/context/AuthContext'
import { getCookieConsent } from '@/components/CookieBanner'

function PageViewTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const ph = usePostHog()

  useEffect(() => {
    if (!pathname || !ph) return
    let url = window.location.origin + pathname
    const qs = searchParams.toString()
    if (qs) url += `?${qs}`
    ph.capture('$pageview', { $current_url: url })
  }, [pathname, searchParams, ph])

  return null
}

function UserIdentifier() {
  const { user } = useAuth()
  const ph = usePostHog()

  useEffect(() => {
    if (!ph) return
    if (user) {
      ph.identify(user.id, {
        email: user.email,
        name: user.user_metadata?.full_name,
        created_at: user.created_at,
      })
    } else {
      ph.reset()
    }
  }, [user, ph])

  return null
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      capture_pageview: false,
      capture_pageleave: true,
      person_profiles: 'identified_only',
      // Opt out by default — only capture if user has accepted
      opt_out_capturing_by_default: getCookieConsent() !== 'accepted',
    })

    // Listen for consent changes during the session
    function onConsent(e: Event) {
      const choice = (e as CustomEvent<string>).detail
      if (choice === 'accepted') {
        posthog.opt_in_capturing()
      } else {
        posthog.opt_out_capturing()
      }
    }
    window.addEventListener('cookie-consent', onConsent)
    return () => window.removeEventListener('cookie-consent', onConsent)
  }, [])

  return (
    <PHProvider client={posthog}>
      <Suspense fallback={null}>
        <PageViewTracker />
      </Suspense>
      <UserIdentifier />
      {children}
    </PHProvider>
  )
}
