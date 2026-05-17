'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useGame } from '@/context/GameContext'
import { Zap } from 'lucide-react'

export function XPToast() {
  const { xpEvents } = useGame()

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 items-end pointer-events-none">
      <AnimatePresence>
        {xpEvents.map(event => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold"
            style={{
              background: 'rgba(13,17,23,0.95)',
              border: '1px solid rgba(139,92,246,0.3)',
              backdropFilter: 'blur(12px)',
              color: '#F1F5F9',
              fontFamily: 'var(--font-sans)',
              boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
            }}
          >
            <Zap size={14} color="#F59E0B" />
            <span style={{ color: '#94A3B8' }}>{event.label}</span>
            <span
              className="font-black"
              style={{ color: '#F59E0B', fontFamily: 'var(--font-sans)' }}
            >
              +{event.amount} XP
            </span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
