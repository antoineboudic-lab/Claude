'use client'

import { useEffect } from 'react'

export default function PWARegister() {
  useEffect(() => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return

    navigator.serviceWorker
      .register('/sw.js', { scope: '/' })
      .then(reg => {
        // Check for updates on each page load
        reg.update().catch(() => {})
      })
      .catch(err => {
        if (process.env.NODE_ENV === 'development') {
          console.warn('[PWA] Service worker registration failed:', err)
        }
      })
  }, [])

  return null
}
