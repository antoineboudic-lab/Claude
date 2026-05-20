'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { BookOpen, Check, Copy, ExternalLink, Flame, Trophy, X } from 'lucide-react'
import { useGame } from '@/context/GameContext'
import { getLevelForXP } from '@/lib/gamification'

interface ShareCardProps {
  open: boolean
  onClose: () => void
  trackId?: string
  trackColor?: string
}

export function ShareCard({ open, onClose, trackColor }: ShareCardProps) {
  const { state } = useGame()
  const { xp, streak, completedLessons, completedTracks } = state
  const level = getLevelForXP(xp)
  const accent = trackColor ?? '#2563EB'

  const [copied, setCopied] = useState(false)

  const shareText =
    `🎓 My OpusLearn progress:\n` +
    `Level ${level.level} · ${xp} XP · ${streak}-day streak\n` +
    `${completedLessons.length} lessons completed across ${completedTracks.length} tracks\n` +
    `Build your AI skills at opuslearn-tau.vercel.app`

  function handleCopy() {
    navigator.clipboard.writeText(shareText).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  function handleLinkedIn() {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=https://opuslearn.ai&summary=${encodeURIComponent(shareText)}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const progressPct = Math.min(
    100,
    Math.round(((xp - (getLevelForXP(xp).minXP ?? 0)) /
      Math.max(1, (getLevelForXP(xp).maxXP - getLevelForXP(xp).minXP))) * 100),
  )

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed', inset: 0, zIndex: 50,
              background: 'rgba(15,23,42,0.5)',
              backdropFilter: 'blur(4px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            {/* Card */}
            <motion.div
              key="card"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              onClick={e => e.stopPropagation()}
              style={{
                background: '#FFFFFF', borderRadius: '1.5rem',
                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
                padding: '2rem', maxWidth: '24rem', width: '100%', margin: '1rem',
                fontFamily: 'var(--font-sans)',
              }}
            >
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <p style={{ color: '#0F172A', fontWeight: 700, fontSize: '1rem', margin: 0 }}>
                  Your OpusLearn Progress
                </p>
                <button
                  onClick={onClose}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem', color: '#64748B', display: 'flex' }}
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Gradient stats card */}
              <div style={{
                background: `linear-gradient(135deg, ${accent}15, ${accent}05)`,
                border: `1px solid ${accent}25`,
                borderRadius: '1rem', padding: '1.25rem 1.5rem',
                marginBottom: '1.25rem',
              }}>
                {/* Level + streak row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span style={{
                    background: level.color, color: '#fff', fontSize: '0.75rem',
                    fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: '9999px',
                  }}>
                    Level {level.level} · {level.title}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#F59E0B', fontWeight: 700, fontSize: '0.875rem' }}>
                    <Flame size={15} />
                    {streak}d
                  </span>
                </div>

                {/* Progress bar */}
                <div style={{ height: '4px', background: `${accent}20`, borderRadius: '9999px', marginBottom: '0.875rem', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${progressPct}%`, background: accent, borderRadius: '9999px' }} />
                </div>

                {/* XP */}
                <p style={{ color: '#0F172A', fontSize: '1.75rem', fontWeight: 800, margin: '0 0 0.5rem' }}>
                  {xp.toLocaleString()} <span style={{ fontSize: '1rem', fontWeight: 500, color: '#64748B' }}>XP earned</span>
                </p>

                {/* Lessons + tracks */}
                <div style={{ display: 'flex', gap: '1.25rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: '#475569', fontSize: '0.8125rem' }}>
                    <BookOpen size={14} color={accent} />
                    {completedLessons.length} lessons done
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: '#475569', fontSize: '0.8125rem' }}>
                    <Trophy size={14} color={accent} />
                    {completedTracks.length} tracks completed
                  </span>
                </div>
              </div>

              {/* Action buttons */}
              <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.875rem' }}>
                <button
                  onClick={handleCopy}
                  style={{
                    flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    gap: '0.375rem', padding: '0.625rem',
                    border: '1px solid #E2E8F0', borderRadius: '0.75rem',
                    background: '#EFF6FF', color: '#0F172A', fontSize: '0.8125rem',
                    fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-sans)',
                    transition: 'background 0.15s',
                  }}
                >
                  {copied ? <Check size={14} color="#10B981" /> : <Copy size={14} />}
                  {copied ? 'Copied! ✓' : 'Copy progress'}
                </button>
                <button
                  onClick={handleLinkedIn}
                  style={{
                    flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    gap: '0.375rem', padding: '0.625rem',
                    border: 'none', borderRadius: '0.75rem',
                    background: '#0A66C2', color: '#fff', fontSize: '0.8125rem',
                    fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-sans)',
                  }}
                >
                  <ExternalLink size={14} />
                  Share on LinkedIn
                </button>
              </div>

              {/* Close text link */}
              <button
                onClick={onClose}
                style={{
                  width: '100%', background: 'none', border: 'none',
                  color: '#94A3B8', fontSize: '0.8125rem', cursor: 'pointer',
                  fontFamily: 'var(--font-sans)', padding: '0.25rem',
                }}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
