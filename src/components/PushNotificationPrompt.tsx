'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bell, X } from 'lucide-react'
import { useGame } from '@/context/GameContext'
import { useAuth } from '@/context/AuthContext'

const DISMISSED_KEY = 'opuslearn-push-dismissed'
const SUBSCRIBED_KEY = 'opuslearn-push-subscribed'

export default function PushNotificationPrompt() {
  const { state } = useGame()
  const { user } = useAuth()
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Only show if: logged in, 1+ lessons done, push supported, not dismissed/subscribed
    if (!user) return
    if (state.completedLessons.length < 1) return
    if (typeof window === 'undefined' || !('serviceWorker' in navigator) || !('PushManager' in window)) return
    if (Notification.permission === 'denied') return
    if (localStorage.getItem(DISMISSED_KEY) === '1') return
    if (localStorage.getItem(SUBSCRIBED_KEY) === '1') return

    // Small delay so it doesn't compete with other UI
    const t = setTimeout(() => setShow(true), 3000)
    return () => clearTimeout(t)
  }, [user, state.completedLessons.length])

  async function handleEnable() {
    setLoading(true)
    try {
      const permission = await Notification.requestPermission()
      if (permission !== 'granted') {
        setShow(false)
        localStorage.setItem(DISMISSED_KEY, '1')
        return
      }

      const reg = await navigator.serviceWorker.ready
      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY ?? ''),
      })

      await fetch('/api/push/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subscription: sub.toJSON() }),
      })

      localStorage.setItem(SUBSCRIBED_KEY, '1')
      setShow(false)
    } catch {
      setShow(false)
      localStorage.setItem(DISMISSED_KEY, '1')
    } finally {
      setLoading(false)
    }
  }

  function dismiss() {
    localStorage.setItem(DISMISSED_KEY, '1')
    setShow(false)
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 80 }}
          transition={{ type: 'spring', stiffness: 280, damping: 26 }}
          style={{
            position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)',
            width: 'min(92vw, 440px)',
            background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 16,
            boxShadow: '0 8px 32px rgba(0,0,0,0.10)', zIndex: 90,
            padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 14,
            fontFamily: 'var(--font-sans)',
          }}
        >
          <div style={{ width: 40, height: 40, borderRadius: 12, background: 'linear-gradient(135deg, #2563EB, #22D3EE)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Bell size={18} style={{ color: '#FFFFFF' }} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: '#0F172A', margin: '0 0 2px' }}>
              Never miss your streak
            </p>
            <p style={{ fontSize: 12, color: '#64748B', margin: 0 }}>
              Get a nudge when you have cards due or a streak to protect.
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            <button
              onClick={handleEnable}
              disabled={loading}
              style={{ padding: '8px 14px', borderRadius: 9, background: '#2563EB', color: '#FFFFFF', border: 'none', fontSize: 12, fontWeight: 700, cursor: loading ? 'default' : 'pointer', opacity: loading ? 0.7 : 1, fontFamily: 'var(--font-sans)' }}
            >
              {loading ? '…' : 'Enable'}
            </button>
            <button
              onClick={dismiss}
              style={{ width: 28, height: 28, borderRadius: 8, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#CBD5E1' }}
              aria-label="Dismiss"
            >
              <X size={14} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function urlBase64ToUint8Array(base64String: string): ArrayBuffer {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')
  const rawData = atob(base64)
  const buffer = new ArrayBuffer(rawData.length)
  const view = new Uint8Array(buffer)
  for (let i = 0; i < rawData.length; i++) view[i] = rawData.charCodeAt(i)
  return buffer
}
