'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Award, ArrowRight, X } from 'lucide-react'
import Link from 'next/link'
import { useGame } from '@/context/GameContext'
import { getTrack, type TrackId } from '@/lib/curriculum'

const TRACK_SKILLS: Record<string, string[]> = {
  marketing:  ['AI content creation', 'Campaign automation', 'Data-driven insights'],
  finance:    ['Financial modeling', 'AI forecasting', 'Process automation'],
  hr:         ['AI recruitment', 'Employee analytics', 'Workflow automation'],
  sales:      ['AI prospecting', 'Deal intelligence', 'Pipeline automation'],
  operations: ['Process optimization', 'AI workflows', 'Data automation'],
  leadership: ['AI strategy', 'Change management', 'Team AI adoption'],
  legal:      ['Contract analysis', 'Legal research AI', 'Compliance automation'],
  product:    ['AI product design', 'User research AI', 'Roadmap intelligence'],
  customer:   ['AI support tools', 'Customer insights', 'Automation workflows'],
  consulting: ['AI advisory', 'Data analysis', 'Client intelligence'],
}

export function TrackCompletion() {
  const { justCompletedTrack, clearJustCompletedTrack } = useGame()

  if (!justCompletedTrack) return null

  const track = getTrack(justCompletedTrack as TrackId)
  const color = track?.color ?? '#2563EB'
  const skills = TRACK_SKILLS[justCompletedTrack] ?? []

  return (
    <AnimatePresence>
      <motion.div
        key="track-completion-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: 'fixed', inset: 0, zIndex: 200,
          background: 'rgba(0,0,0,0.72)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '24px', fontFamily: 'var(--font-sans)',
        }}
        onClick={clearJustCompletedTrack}
      >
        <motion.div
          key="track-completion-card"
          initial={{ opacity: 0, scale: 0.88, y: 28 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 12 }}
          transition={{ type: 'spring', damping: 22, stiffness: 280 }}
          onClick={e => e.stopPropagation()}
          style={{
            background: '#FFFFFF',
            borderRadius: '24px',
            padding: '40px 36px 36px',
            maxWidth: '440px',
            width: '100%',
            textAlign: 'center',
            position: 'relative',
            boxShadow: '0 32px 80px rgba(0,0,0,0.28)',
          }}
        >
          {/* Color stripe */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0,
            height: 5, borderRadius: '24px 24px 0 0', background: color,
          }} />

          {/* Close button */}
          <button
            onClick={clearJustCompletedTrack}
            style={{
              position: 'absolute', top: 14, right: 14,
              width: 30, height: 30, borderRadius: '50%',
              background: '#F1F5F9', border: 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: '#94A3B8',
            }}
          >
            <X size={13} />
          </button>

          {/* Trophy icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.12, type: 'spring', damping: 10, stiffness: 180 }}
            style={{
              width: 80, height: 80, borderRadius: '50%',
              background: `${color}14`,
              border: `3px solid ${color}35`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '8px auto 24px',
            }}
          >
            <Award size={36} style={{ color }} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.4 }}
          >
            <p style={{
              fontSize: '0.6875rem', fontWeight: 700, color,
              letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8,
            }}>
              Track Complete!
            </p>
            <h2 style={{
              fontSize: '1.625rem', fontWeight: 900, color: '#0F172A',
              marginBottom: 10, letterSpacing: '-0.02em', lineHeight: 1.2,
            }}>
              {track?.title ?? justCompletedTrack} 🎉
            </h2>
            <p style={{ fontSize: '0.9375rem', color: '#64748B', lineHeight: 1.65, marginBottom: 28 }}>
              You&apos;ve mastered all modules. Your certificate is ready to share.
            </p>

            {/* Skills earned */}
            {skills.length > 0 && (
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 32 }}>
                {skills.map(s => (
                  <span key={s} style={{
                    fontSize: '0.75rem', fontWeight: 600,
                    padding: '4px 12px', borderRadius: 999,
                    background: `${color}10`, color,
                    border: `1px solid ${color}28`,
                  }}>
                    {s}
                  </span>
                ))}
              </div>
            )}

            {/* CTAs */}
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link
                href={`/certificates/${justCompletedTrack}`}
                onClick={clearJustCompletedTrack}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '12px 24px', borderRadius: 12,
                  background: color, color: '#FFFFFF',
                  textDecoration: 'none', fontSize: '0.875rem', fontWeight: 700,
                }}
              >
                View certificate <ArrowRight size={14} />
              </Link>
              <button
                onClick={clearJustCompletedTrack}
                style={{
                  display: 'inline-flex', alignItems: 'center',
                  padding: '12px 24px', borderRadius: 12,
                  background: '#F1F5F9', color: '#475569',
                  border: '1px solid #E2E8F0', cursor: 'pointer',
                  fontSize: '0.875rem', fontWeight: 600, fontFamily: 'var(--font-sans)',
                }}
              >
                Continue learning
              </button>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
