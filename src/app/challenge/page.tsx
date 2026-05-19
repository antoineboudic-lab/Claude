'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Flame, Trophy, ArrowRight, CheckCircle2, XCircle, Zap, Calendar, ChevronLeft } from 'lucide-react'
import { useGame } from '@/context/GameContext'
import { getDailyChallenge, loadChallengeLog, saveChallengeEntry, getChallengeStreak } from '@/lib/challenge'
import type { DailyChallenge, ChallengeEntry } from '@/lib/challenge'

const CHALLENGE_XP = 50

export default function ChallengePage() {
  const { addXP } = useGame()
  const [challenge, setChallenge] = useState<DailyChallenge | null>(null)
  const [todayEntry, setTodayEntry] = useState<ChallengeEntry | null>(null)
  const [streak, setStreak] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [showXP, setShowXP] = useState(false)

  useEffect(() => {
    const c = getDailyChallenge()
    setChallenge(c)
    const log = loadChallengeLog()
    const entry = log[c.date] ?? null
    setTodayEntry(entry)
    if (entry) {
      setSelected(entry.answered)
      setRevealed(true)
    }
    setStreak(getChallengeStreak())
  }, [])

  const handleAnswer = useCallback((idx: number) => {
    if (revealed || !challenge) return
    setSelected(idx)
    setRevealed(true)

    const correct = idx === challenge.question.correct
    const entry: ChallengeEntry = { answered: idx, correct, xpAwarded: CHALLENGE_XP }
    saveChallengeEntry(challenge.date, entry)
    setTodayEntry(entry)
    setStreak(getChallengeStreak())

    if (correct) {
      addXP(CHALLENGE_XP, 'Daily challenge completed')
      setShowXP(true)
      setTimeout(() => setShowXP(false), 2200)
    }
  }, [revealed, challenge, addXP])

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })

  if (!challenge) return null

  const { question, trackTitle, trackColor } = challenge
  const alreadyDone = !!todayEntry

  return (
    <main style={{ minHeight: '100vh', background: '#EFF6FF', fontFamily: 'var(--font-sans)' }}>
      {/* Top bar */}
      <div style={{ background: '#FFFFFF', borderBottom: '1px solid #E2E8F0', padding: '0 24px' }}>
        <div style={{ maxWidth: 680, margin: '0 auto', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#64748B', textDecoration: 'none', fontSize: 14 }}>
            <ChevronLeft size={16} /> Dashboard
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Flame size={15} style={{ color: streak > 0 ? '#F97316' : '#CBD5E1' }} />
            <span style={{ fontSize: 13, fontWeight: 700, color: streak > 0 ? '#F97316' : '#94A3B8' }}>{streak}-day streak</span>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 680, margin: '0 auto', padding: '40px 24px 80px' }}>
        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <Trophy size={16} style={{ color: '#2563EB' }} />
            <span style={{ fontSize: 12, fontWeight: 700, color: '#2563EB', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Daily Challenge
            </span>
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#0F172A', letterSpacing: '-0.03em', margin: '0 0 6px' }}>
            Today&apos;s Question
          </h1>
          <p style={{ fontSize: 13, color: '#94A3B8', margin: 0 }}>
            <Calendar size={12} style={{ display: 'inline', marginRight: 4, verticalAlign: 'middle' }} />
            {today} · {trackTitle}
          </p>
        </div>

        {/* Track accent */}
        <div style={{ width: 40, height: 4, borderRadius: 2, background: trackColor, marginBottom: 28 }} />

        {/* Question card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 16, padding: '28px 28px 24px', marginBottom: 20, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}
        >
          <p style={{ fontSize: '1.0625rem', fontWeight: 600, color: '#0F172A', lineHeight: 1.55, margin: '0 0 24px' }}>
            {question.question}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {question.options.map((opt, i) => {
              const isSelected = selected === i
              const isCorrect = i === question.correct
              let bg = '#EFF6FF'
              let border = '#E2E8F0'
              let color = '#334155'
              let iconEl: React.ReactNode = null

              if (revealed) {
                if (isCorrect) {
                  bg = '#F0FDF4'; border = '#86EFAC'; color = '#166534'
                  iconEl = <CheckCircle2 size={16} style={{ color: '#22C55E', flexShrink: 0 }} />
                } else if (isSelected && !isCorrect) {
                  bg = '#FEF2F2'; border = '#FECACA'; color = '#991B1B'
                  iconEl = <XCircle size={16} style={{ color: '#EF4444', flexShrink: 0 }} />
                } else {
                  color = '#94A3B8'
                }
              } else if (isSelected) {
                bg = '#DBEAFE'; border = '#2563EB'; color = '#1E3A8A'
              }

              return (
                <motion.button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  disabled={revealed}
                  whileHover={!revealed ? { scale: 1.01 } : {}}
                  whileTap={!revealed ? { scale: 0.99 } : {}}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '14px 16px', borderRadius: 10,
                    background: bg, border: `1.5px solid ${border}`, color,
                    fontSize: 14, fontWeight: isSelected || (revealed && isCorrect) ? 600 : 400,
                    textAlign: 'left', cursor: revealed ? 'default' : 'pointer',
                    fontFamily: 'var(--font-sans)', transition: 'background 0.15s, border-color 0.15s',
                  }}
                >
                  <span style={{ flexShrink: 0, width: 22, height: 22, borderRadius: 6, background: revealed ? 'transparent' : '#E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#64748B' }}>
                    {revealed ? null : String.fromCharCode(65 + i)}
                  </span>
                  <span style={{ flex: 1 }}>{opt}</span>
                  {iconEl}
                </motion.button>
              )
            })}
          </div>
        </motion.div>

        {/* Explanation */}
        <AnimatePresence>
          {revealed && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 16, padding: '20px 24px', marginBottom: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}
            >
              <p style={{ fontSize: 12, fontWeight: 700, color: '#2563EB', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 8px' }}>
                Explanation
              </p>
              <p style={{ fontSize: 14, color: '#334155', lineHeight: 1.7, margin: 0 }}>
                {question.explanation}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Result / CTA */}
        <AnimatePresence>
          {revealed && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              style={{ textAlign: 'center' }}
            >
              {todayEntry?.correct ? (
                <div style={{ marginBottom: 20 }}>
                  <p style={{ fontSize: 22, margin: '0 0 4px' }}>🎉</p>
                  <p style={{ fontSize: 15, fontWeight: 700, color: '#0F172A', margin: '0 0 4px' }}>Correct! +{CHALLENGE_XP} XP</p>
                  <p style={{ fontSize: 13, color: '#64748B', margin: 0 }}>Come back tomorrow for a new challenge.</p>
                </div>
              ) : (
                <div style={{ marginBottom: 20 }}>
                  <p style={{ fontSize: 22, margin: '0 0 4px' }}>📚</p>
                  <p style={{ fontSize: 15, fontWeight: 700, color: '#0F172A', margin: '0 0 4px' }}>Not quite — but you&apos;re learning!</p>
                  <p style={{ fontSize: 13, color: '#64748B', margin: 0 }}>Come back tomorrow for a new question.</p>
                </div>
              )}
              <Link
                href="/tracks"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', borderRadius: 12, background: '#0F172A', color: '#FFFFFF', textDecoration: 'none', fontSize: 14, fontWeight: 700 }}
              >
                Continue learning <ArrowRight size={14} />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Already done state (if returning) */}
        {alreadyDone && !revealed && (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <p style={{ fontSize: 15, color: '#64748B' }}>You&apos;ve already completed today&apos;s challenge.</p>
          </div>
        )}
      </div>

      {/* XP toast */}
      <AnimatePresence>
        {showXP && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            style={{ position: 'fixed', bottom: 32, left: '50%', transform: 'translateX(-50%)', background: '#0F172A', color: '#FFFFFF', borderRadius: 12, padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 8, zIndex: 100, boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}
          >
            <Zap size={15} style={{ color: '#FDE047' }} />
            <span style={{ fontSize: 14, fontWeight: 700 }}>+{CHALLENGE_XP} XP — Daily challenge!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
