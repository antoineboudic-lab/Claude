'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, Circle, X, ArrowRight, Sparkles } from 'lucide-react'
import { useGame } from '@/context/GameContext'
import { useBookmarks } from '@/hooks/useBookmarks'

const DISMISSED_KEY = 'ai-literacy-onboarding-dismissed'

interface Task {
  id: string
  label: string
  description: string
  href: string
  done: boolean
}

function loadHasReviewed(): boolean {
  try {
    const raw = localStorage.getItem('ai-literacy-sr-queue')
    if (!raw) return false
    const queue = JSON.parse(raw)
    return Array.isArray(queue) && queue.some((item: { lastReviewDate?: string | null }) => !!item.lastReviewDate)
  } catch { return false }
}

function loadHasAssessment(): boolean {
  try {
    return !!localStorage.getItem('ai-literacy-assessment')
  } catch { return false }
}

export default function OnboardingChecklist() {
  const { state } = useGame()
  const { bookmarks } = useBookmarks()
  const [dismissed, setDismissed] = useState(true) // start hidden; reveal after mount check
  const [hasAssessment, setHasAssessment] = useState(false)
  const [hasReviewed, setHasReviewed] = useState(false)
  const [allDoneConfirmed, setAllDoneConfirmed] = useState(false)

  useEffect(() => {
    const isDismissed = localStorage.getItem(DISMISSED_KEY) === '1'
    setDismissed(isDismissed)
    setHasAssessment(loadHasAssessment())
    setHasReviewed(loadHasReviewed())
  }, [])

  const tasks: Task[] = [
    {
      id: 'assessment',
      label: 'Take your AI assessment',
      description: 'Get a personalised learning path for your role',
      href: '/assessment',
      done: hasAssessment,
    },
    {
      id: 'first-lesson',
      label: 'Complete your first lesson',
      description: 'Start building your AI skills',
      href: '/tracks',
      done: state.completedLessons.length >= 1,
    },
    {
      id: 'bookmark',
      label: 'Bookmark a lesson',
      description: 'Save lessons you want to revisit',
      href: '/tracks',
      done: bookmarks.length >= 1,
    },
    {
      id: 'module',
      label: 'Complete a full module',
      description: 'Finish all lessons in one module',
      href: '/tracks',
      done: state.completedModules.length >= 1,
    },
    {
      id: 'review',
      label: 'Do your first review session',
      description: 'Reinforce what you have learned with flashcards',
      href: '/review',
      done: hasReviewed,
    },
  ]

  const completedCount = tasks.filter(t => t.done).length
  const allDone = completedCount === tasks.length
  const progress = Math.round((completedCount / tasks.length) * 100)

  // Auto-confirm when all tasks done
  useEffect(() => {
    if (allDone && !allDoneConfirmed) {
      const t = setTimeout(() => setAllDoneConfirmed(true), 600)
      return () => clearTimeout(t)
    }
  }, [allDone, allDoneConfirmed])

  function dismiss() {
    localStorage.setItem(DISMISSED_KEY, '1')
    setDismissed(true)
  }

  // Don't show for established users (10+ lessons) or if dismissed
  if (dismissed || state.completedLessons.length >= 10) return null

  return (
    <AnimatePresence>
      <motion.div
        key="onboarding-checklist"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8, height: 0 }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="mb-6 rounded-2xl overflow-hidden"
        style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
      >
        {allDoneConfirmed ? (
          /* ── All done celebration ── */
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="px-6 py-5 flex items-center justify-between gap-4 flex-wrap"
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-lg"
                style={{ background: 'linear-gradient(135deg, #0D9488, #22D3EE)' }}
              >
                🎉
              </div>
              <div>
                <p className="text-sm font-bold" style={{ color: '#0F172A', fontFamily: 'var(--font-sans)' }}>
                  You&apos;re all set!
                </p>
                <p className="text-xs" style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}>
                  You&apos;ve completed all the getting-started tasks.
                </p>
              </div>
            </div>
            <button
              onClick={dismiss}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:opacity-90 flex-shrink-0"
              style={{ background: '#0F172A', color: '#FFFFFF', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-sans)' }}
            >
              Got it <ArrowRight size={13} />
            </button>
          </motion.div>
        ) : (
          /* ── Checklist ── */
          <>
            {/* Header */}
            <div className="px-6 pt-5 pb-4" style={{ borderBottom: '1px solid #F1F5F9' }}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Sparkles size={14} style={{ color: '#0D9488' }} />
                  <p className="text-sm font-bold" style={{ color: '#0F172A', fontFamily: 'var(--font-sans)' }}>
                    Get started
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold" style={{ color: '#94A3B8', fontFamily: 'var(--font-sans)' }}>
                    {completedCount} / {tasks.length}
                  </span>
                  <button
                    onClick={dismiss}
                    className="flex items-center justify-center w-6 h-6 rounded-full transition-colors hover:bg-slate-100"
                    style={{ color: '#CBD5E1', background: 'none', border: 'none', cursor: 'pointer' }}
                    aria-label="Dismiss"
                  >
                    <X size={13} />
                  </button>
                </div>
              </div>

              {/* Progress bar */}
              <div className="h-1.5 rounded-full" style={{ background: '#E2E8F0' }}>
                <motion.div
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="h-full rounded-full"
                  style={{ background: 'linear-gradient(90deg, #0D9488, #22D3EE)' }}
                />
              </div>
            </div>

            {/* Tasks */}
            <div className="divide-y" style={{ borderColor: '#F0FDFA' }}>
              {tasks.map((task, i) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                  className="flex items-center gap-4 px-6 py-3.5 group"
                  style={{ borderBottom: i < tasks.length - 1 ? '1px solid #F0FDFA' : 'none' }}
                >
                  {/* Check icon */}
                  <div className="flex-shrink-0">
                    {task.done ? (
                      <motion.div
                        initial={{ scale: 0.5 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                      >
                        <CheckCircle2 size={18} style={{ color: '#10B981' }} />
                      </motion.div>
                    ) : (
                      <Circle size={18} style={{ color: '#CBD5E1' }} />
                    )}
                  </div>

                  {/* Label */}
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-sm font-medium"
                      style={{
                        color: task.done ? '#94A3B8' : '#334155',
                        textDecoration: task.done ? 'line-through' : 'none',
                        fontFamily: 'var(--font-sans)',
                      }}
                    >
                      {task.label}
                    </p>
                    {!task.done && (
                      <p className="text-xs" style={{ color: '#94A3B8', fontFamily: 'var(--font-sans)' }}>
                        {task.description}
                      </p>
                    )}
                  </div>

                  {/* CTA arrow */}
                  {!task.done && (
                    <Link
                      href={task.href}
                      className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ background: '#CCFBF1', color: '#0D9488' }}
                      aria-label={`Go to ${task.label}`}
                    >
                      <ArrowRight size={12} />
                    </Link>
                  )}
                </motion.div>
              ))}
            </div>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  )
}
