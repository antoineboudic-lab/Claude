'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle2, XCircle, ArrowRight, BookOpen, Zap, RotateCcw } from 'lucide-react'
import { useGame } from '@/context/GameContext'
import { loadQueue, getDueItems, sm2Update, updateItemInQueue, type SRItem, type SRQuality } from '@/lib/srs'

// ─── Rating buttons config ─────────────────────────────────────────────────────

const RATINGS: { label: string; sublabel: string; quality: SRQuality; color: string; bg: string }[] = [
  { label: 'Again',  sublabel: '< 1 day',  quality: 1, color: '#EF4444', bg: '#FEF2F2' },
  { label: 'Hard',   sublabel: '~1 day',   quality: 2, color: '#F97316', bg: '#FFF7ED' },
  { label: 'Good',   sublabel: '~6 days',  quality: 4, color: '#6366F1', bg: '#EEF2FF' },
  { label: 'Easy',   sublabel: '~10 days', quality: 5, color: '#10B981', bg: '#F0FDF4' },
]

// ─── Completion screen ─────────────────────────────────────────────────────────

function CompletionScreen({ reviewed, xpEarned, onRedo }: { reviewed: number; xpEarned: number; onRedo: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center text-center"
      style={{ gap: '20px', maxWidth: '380px', margin: '0 auto', fontFamily: 'var(--font-sans)' }}
    >
      <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'linear-gradient(135deg, #6366F1, #8B5CF6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CheckCircle2 size={32} color="#FFFFFF" />
      </div>
      <div>
        <h2 style={{ fontSize: '1.625rem', fontWeight: 900, color: '#0F172A', marginBottom: '6px', letterSpacing: '-0.02em' }}>
          Session complete!
        </h2>
        <p style={{ fontSize: '0.9375rem', color: '#64748B', lineHeight: 1.5 }}>
          You reviewed <strong style={{ color: '#0F172A' }}>{reviewed} card{reviewed !== 1 ? 's' : ''}</strong> and earned{' '}
          <strong style={{ color: '#0D9488' }}>+{xpEarned} XP</strong>.
        </p>
      </div>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link
          href="/dashboard"
          style={{ display: 'flex', alignItems: 'center', gap: '7px', padding: '11px 22px', borderRadius: '10px', background: '#0F172A', color: '#FFFFFF', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 600 }}
        >
          Back to dashboard <ArrowRight size={14} />
        </Link>
        <button
          onClick={onRedo}
          style={{ display: 'flex', alignItems: 'center', gap: '7px', padding: '11px 22px', borderRadius: '10px', background: '#F1F5F9', color: '#475569', border: '1px solid #E2E8F0', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 600, fontFamily: 'var(--font-sans)' }}
        >
          <RotateCcw size={14} /> Review again
        </button>
      </div>
    </motion.div>
  )
}

// ─── Empty state ───────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center text-center"
      style={{ gap: '16px', maxWidth: '360px', margin: '0 auto', fontFamily: 'var(--font-sans)' }}
    >
      <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <BookOpen size={26} color="#94A3B8" />
      </div>
      <div>
        <h2 style={{ fontSize: '1.375rem', fontWeight: 800, color: '#0F172A', marginBottom: '8px' }}>Nothing due today</h2>
        <p style={{ fontSize: '0.875rem', color: '#64748B', lineHeight: 1.6 }}>
          Complete some lessons to build your review queue. Cards will appear here when they are ready for reinforcement.
        </p>
      </div>
      <Link
        href="/dashboard"
        style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', padding: '11px 22px', borderRadius: '10px', background: '#0F172A', color: '#FFFFFF', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 600 }}
      >
        Back to dashboard
      </Link>
    </motion.div>
  )
}

// ─── Review card ───────────────────────────────────────────────────────────────

function ReviewCard({
  item, cardIndex, total, onRate,
}: {
  item: SRItem
  cardIndex: number
  total: number
  onRate: (quality: SRQuality) => void
}) {
  const [selected, setSelected] = useState<number | null>(null)
  const revealed = selected !== null
  const isCorrect = selected === item.correct

  return (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      style={{ width: '100%', maxWidth: '560px', fontFamily: 'var(--font-sans)' }}
    >
      {/* Card source */}
      <p style={{ fontSize: '0.6875rem', color: '#94A3B8', marginBottom: '12px', textAlign: 'center', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
        {item.lessonTitle}
      </p>

      {/* Question card */}
      <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '28px 28px 24px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', marginBottom: '16px' }}>
        <p style={{ fontSize: '1.0625rem', fontWeight: 700, color: '#0F172A', lineHeight: 1.55, marginBottom: '20px' }}>
          {item.question}
        </p>

        {/* Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {item.options.map((opt, i) => {
            const isSelected = selected === i
            const isRight = i === item.correct
            let bg = '#F0FDFA'
            let border = '1px solid #E2E8F0'
            let color = '#334155'
            if (revealed) {
              if (isRight) { bg = '#F0FDF4'; border = '1px solid #86EFAC'; color = '#166534' }
              else if (isSelected && !isRight) { bg = '#FEF2F2'; border = '1px solid #FCA5A5'; color = '#991B1B' }
            } else if (isSelected) {
              bg = '#EEF2FF'; border = '1px solid #A5B4FC'; color = '#3730A3'
            }

            return (
              <button
                key={i}
                onClick={() => !revealed && setSelected(i)}
                disabled={revealed}
                style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '11px 14px', borderRadius: '10px',
                  background: bg, border, color,
                  cursor: revealed ? 'default' : 'pointer',
                  textAlign: 'left', fontSize: '0.875rem', fontWeight: isRight && revealed ? 600 : 400,
                  fontFamily: 'var(--font-sans)', lineHeight: 1.4, transition: 'all 0.12s',
                }}
              >
                <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: revealed ? (isRight ? '#22C55E' : isSelected ? '#EF4444' : '#E2E8F0') : '#E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '0.6875rem', fontWeight: 700, color: revealed && (isRight || isSelected) ? '#FFFFFF' : '#94A3B8' }}>
                  {revealed ? (isRight ? '✓' : isSelected ? '✗' : String.fromCharCode(65 + i)) : String.fromCharCode(65 + i)}
                </span>
                {opt}
              </button>
            )
          })}
        </div>

        {/* Explanation */}
        <AnimatePresence>
          {revealed && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.2 }}
              style={{ marginTop: '16px', padding: '12px 14px', borderRadius: '10px', background: isCorrect ? '#F0FDF4' : '#FFF7ED', border: `1px solid ${isCorrect ? '#86EFAC' : '#FED7AA'}` }}
            >
              <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                {isCorrect
                  ? <CheckCircle2 size={15} color="#16A34A" style={{ flexShrink: 0, marginTop: '1px' }} />
                  : <XCircle size={15} color="#EA580C" style={{ flexShrink: 0, marginTop: '1px' }} />}
                <p style={{ fontSize: '0.8125rem', color: '#374151', lineHeight: 1.55 }}>{item.explanation}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Rating buttons */}
      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.18, delay: 0.05 }}
          >
            <p style={{ fontSize: '0.6875rem', color: '#94A3B8', textAlign: 'center', marginBottom: '10px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              How well did you recall this?
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
              {RATINGS.map(r => (
                <button
                  key={r.label}
                  onClick={() => onRate(r.quality)}
                  style={{
                    padding: '10px 6px', borderRadius: '10px',
                    background: r.bg, border: `1px solid ${r.color}25`,
                    cursor: 'pointer', fontFamily: 'var(--font-sans)',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px',
                    transition: 'transform 0.1s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)' }}
                >
                  <span style={{ fontSize: '0.875rem', fontWeight: 700, color: r.color }}>{r.label}</span>
                  <span style={{ fontSize: '0.625rem', color: '#94A3B8' }}>{r.sublabel}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!revealed && (
        <p style={{ fontSize: '0.75rem', color: '#CBD5E1', textAlign: 'center', marginTop: '12px' }}>
          Select an answer to continue
        </p>
      )}
    </motion.div>
  )
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function ReviewPage() {
  const { addXP } = useGame()
  const [dueItems, setDueItems] = useState<SRItem[]>([])
  const [cardIndex, setCardIndex] = useState(0)
  const [done, setDone] = useState(false)
  const [xpEarned, setXpEarned] = useState(0)
  const [reviewedCount, setReviewedCount] = useState(0)
  const [loaded, setLoaded] = useState(false)

  const loadDue = useCallback(() => {
    const due = getDueItems(loadQueue())
    setDueItems(due)
    setCardIndex(0)
    setDone(false)
    setXpEarned(0)
    setReviewedCount(0)
  }, [])

  useEffect(() => {
    loadDue()
    setLoaded(true)
  }, [loadDue])

  const handleRate = useCallback((quality: SRQuality) => {
    const item = dueItems[cardIndex]
    if (!item) return

    const updated = sm2Update(item, quality)
    updateItemInQueue(updated)

    const xp = 5
    addXP(xp, 'Card reviewed')
    setXpEarned(prev => prev + xp)
    setReviewedCount(prev => prev + 1)

    if (cardIndex + 1 >= dueItems.length) {
      // Session bonus
      const bonus = dueItems.length >= 5 ? 20 : 0
      if (bonus > 0) addXP(bonus, 'Review session bonus')
      setXpEarned(prev => prev + bonus)
      setDone(true)
    } else {
      setCardIndex(prev => prev + 1)
    }
  }, [dueItems, cardIndex, addXP])

  const currentItem = dueItems[cardIndex]
  const progress = dueItems.length > 0 ? ((cardIndex) / dueItems.length) * 100 : 0

  return (
    <main style={{ minHeight: '100vh', background: '#F0FDFA', fontFamily: 'var(--font-sans)' }}>
      {/* Top bar */}
      <div style={{ background: '#FFFFFF', borderBottom: '1px solid #E2E8F0', padding: '0 24px', position: 'sticky', top: 0, zIndex: 40 }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px', height: '56px' }}>
          <Link href="/dashboard" style={{ display: 'flex', color: '#94A3B8', flexShrink: 0 }}>
            <X size={18} />
          </Link>

          {/* Progress bar */}
          {dueItems.length > 0 && !done && (
            <div style={{ flex: 1, height: '6px', background: '#E2E8F0', borderRadius: '3px', overflow: 'hidden' }}>
              <motion.div
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
                style={{ height: '100%', background: 'linear-gradient(90deg, #6366F1, #8B5CF6)', borderRadius: '3px' }}
              />
            </div>
          )}

          {/* Card count */}
          {dueItems.length > 0 && !done && (
            <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#64748B', whiteSpace: 'nowrap', flexShrink: 0 }}>
              {cardIndex + 1} / {dueItems.length}
            </span>
          )}

          {/* XP counter */}
          {xpEarned > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
              <Zap size={13} color="#0D9488" />
              <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#0D9488' }}>+{xpEarned}</span>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: '640px', margin: '0 auto', padding: '48px 24px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', minHeight: 'calc(100vh - 56px)' }}>
        {!loaded ? null : done ? (
          <CompletionScreen reviewed={reviewedCount} xpEarned={xpEarned} onRedo={loadDue} />
        ) : dueItems.length === 0 ? (
          <EmptyState />
        ) : (
          <AnimatePresence mode="wait">
            {currentItem && (
              <ReviewCard
                key={currentItem.id + cardIndex}
                item={currentItem}
                cardIndex={cardIndex}
                total={dueItems.length}
                onRate={handleRate}
              />
            )}
          </AnimatePresence>
        )}
      </div>
    </main>
  )
}
