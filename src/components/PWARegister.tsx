'use client'

import { useEffect } from 'react'

export default function PWARegister() {
  useEffect(() => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return

    // In development the service worker caches build chunks and serves stale
    // ones after hot edits ("module factory is not available"). Skip
    // registration and unregister any existing SW so dev stays clean.
    if (process.env.NODE_ENV === 'development') {
      navigator.serviceWorker.getRegistrations()
        .then(regs => regs.forEach(r => r.unregister()))
        .catch(() => {})
      return
    }

    navigator.serviceWorker
      .register('/sw.js', { scope: '/' })
      .then(reg => {
        // Check for updates on each page load
        reg.update().catch(() => {})
      })
      .catch(() => {})
  }, [])

  return null
}
