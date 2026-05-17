'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'
import { useGame } from '@/context/GameContext'
import { BADGES } from '@/lib/gamification'

export function BadgeUnlock() {
  const { newBadge, clearNewBadge } = useGame()

  useEffect(() => {
    if (!newBadge) return
    const timer = setTimeout(clearNewBadge, 4000)
    return () => clearTimeout(timer)
  }, [newBadge, clearNewBadge])

  const badge = newBadge ? BADGES[newBadge] : null

  return (
    <AnimatePresence>
      {badge && (
        <motion.div
          initial={{ opacity: 0, y: -24, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -16, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="fixed top-20 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
        >
          <div
            className="flex items-center gap-3 px-5 py-3.5 rounded-2xl"
            style={{
              background: 'rgba(13,17,23,0.97)',
              border: '1px solid rgba(139,92,246,0.4)',
              backdropFilter: 'blur(16px)',
              boxShadow: '0 8px 40px rgba(139,92,246,0.2)',
            }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
              style={{ background: 'rgba(139,92,246,0.15)' }}
            >
              {badge.icon}
            </div>
            <div>
              <p
                className="text-xs font-semibold mb-0.5"
                style={{ color: '#A78BFA', fontFamily: 'var(--font-sans)' }}
              >
                Badge unlocked
              </p>
              <p
                className="text-sm font-black"
                style={{ color: '#F1F5F9', fontFamily: 'var(--font-sans)' }}
              >
                {badge.name}
              </p>
              <p
                className="text-xs"
                style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}
              >
                {badge.description}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
