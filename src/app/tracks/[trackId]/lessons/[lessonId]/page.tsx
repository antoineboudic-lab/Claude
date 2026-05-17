'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import {
  ArrowLeft, ArrowRight, CheckCircle2, Clock,
  BookOpen, Lightbulb, Dumbbell, HelpCircle, Zap, Sparkles,
  Lock, Check,
} from 'lucide-react'
import { useGame } from '@/context/GameContext'
import { useAuth } from '@/context/AuthContext'
import { LevelBar } from '@/components/gamification/LevelBar'
import { XP } from '@/lib/gamification'
import { getLesson, getNextLesson } from '@/lib/curriculum'
import type { Lesson, Module } from '@/lib/curriculum'
import type { TrackId } from '@/lib/curriculum/types'

const easing = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number]

const trackColors: Record<string, string> = {
  marketing: '#EC4899',
  finance: '#F59E0B',
  hr: '#10B981',
  sales: '#8B5CF6',
  operations: '#22D3EE',
  leadership: '#F97316',
}

type Tab = 'lesson' | 'exercise' | 'quiz'

// ─── Markdown renderer ────────────────────────────────────────────────────────

function LessonContent({ content, color }: { content: string; color: string }) {
  return (
    <div className="space-y-4">
      <ReactMarkdown
        components={{
          h2: ({ children }) => (
            <h2 className="text-base font-bold mt-6 mb-2 first:mt-0"
              style={{ fontFamily: 'var(--font-sans)', color: '#0F172A' }}>
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-sm font-bold mt-4 mb-1"
              style={{ fontFamily: 'var(--font-sans)', color: '#334155' }}>
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="text-sm leading-7"
              style={{ color: '#475569', fontFamily: 'var(--font-sans)' }}>
              {children}
            </p>
          ),
          strong: ({ children }) => (
            <strong style={{ color: '#0F172A', fontWeight: 700 }}>{children}</strong>
          ),
          em: ({ children }) => (
            <em style={{ color: color }}>{children}</em>
          ),
          ul: ({ children }) => (
            <ul className="space-y-1.5 my-2 pl-4">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="space-y-1.5 my-2 pl-4 list-decimal">{children}</ol>
          ),
          li: ({ children }) => (
            <li className="text-sm leading-6 flex gap-2"
              style={{ color: '#475569', fontFamily: 'var(--font-sans)' }}>
              <span style={{ color }} className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 block" />
              <span>{children}</span>
            </li>
          ),
          blockquote: ({ children }) => (
            <div className="pl-4 py-2 my-3 rounded-r-lg"
              style={{ borderLeft: `2px solid ${color}`, background: `${color}06` }}>
              {children}
            </div>
          ),
          code: ({ children }) => (
            <code className="px-1.5 py-0.5 rounded text-xs"
              style={{ background: '#F1F5F9', color: '#7C3AED', fontFamily: 'monospace' }}>
              {children}
            </code>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}

// ─── Fallback lesson ──────────────────────────────────────────────────────────

function FallbackLesson({ lessonId, color }: { lessonId: string; color: string }) {
  return (
    <div className="p-8 rounded-2xl text-center"
      style={{ background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
      <div className="text-3xl mb-3">📚</div>
      <p className="text-sm font-semibold mb-1" style={{ color: '#0F172A', fontFamily: 'var(--font-sans)' }}>
        Lesson content loading
      </p>
      <p className="text-xs" style={{ color: '#94A3B8', fontFamily: 'var(--font-sans)' }}>
        {lessonId} — this lesson is being prepared.
      </p>
    </div>
  )
}

// ─── Paywall overlay ──────────────────────────────────────────────────────────

const TOTAL_LESSONS = 20

function PaywallOverlay({
  trackId,
  trackColor,
  lessonTitle,
  completedCount,
  onSignUp,
  onSignIn,
}: {
  trackId: string
  trackColor: string
  lessonTitle: string
  completedCount: number
  onSignUp: () => void
  onSignIn: () => void
}) {
  const trackName = trackId.charAt(0).toUpperCase() + trackId.slice(1)
  const pct = Math.round((completedCount / TOTAL_LESSONS) * 100)

  const perks = [
    `All 20 ${trackName} lessons unlocked`,
    'Your AI-personalised learning path',
    'Hands-on exercises with real tools',
    'Verified completion certificate',
    'XP, streaks & progress tracking',
    'Access to all 6 role tracks',
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 sm:p-6"
      style={{ background: 'rgba(15,23,42,0.8)', backdropFilter: 'blur(10px)' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 60 }}
        transition={{ duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative w-full max-w-md rounded-3xl overflow-hidden"
        style={{ background: '#FFFFFF', boxShadow: '0 40px 100px rgba(0,0,0,0.35)' }}
      >
        {/* Gradient top stripe */}
        <div className="h-1.5" style={{ background: `linear-gradient(90deg, ${trackColor}, #7C3AED)` }} />

        <div className="px-7 pt-6 pb-7">
          {/* Header */}
          <div className="flex items-center gap-4 mb-5">
            <div className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ background: `${trackColor}12`, border: `1px solid ${trackColor}25` }}>
              <Lock size={18} color={trackColor} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-0.5"
                style={{ color: trackColor, fontFamily: 'var(--font-sans)' }}>
                Pro content
              </p>
              <h2 className="text-lg font-black" style={{ color: '#0F172A', fontFamily: 'var(--font-sans)' }}>
                Unlock your full learning path
              </h2>
            </div>
          </div>

          {/* Progress card */}
          <div className="p-4 rounded-2xl mb-5" style={{ background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold" style={{ color: '#334155', fontFamily: 'var(--font-sans)' }}>
                Your progress
              </span>
              <span className="text-xs font-bold" style={{ color: trackColor, fontFamily: 'var(--font-sans)' }}>
                {completedCount} / {TOTAL_LESSONS} lessons &middot; {pct}%
              </span>
            </div>
            <div className="h-2 rounded-full overflow-hidden mb-2.5" style={{ background: '#E2E8F0' }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.9, delay: 0.3, ease: 'easeOut' }}
                className="h-full rounded-full"
                style={{ background: `linear-gradient(90deg, ${trackColor}, #7C3AED)` }}
              />
            </div>
            <p className="text-xs" style={{ color: '#94A3B8', fontFamily: 'var(--font-sans)' }}>
              Next: <span style={{ color: '#475569', fontWeight: 600 }}>{lessonTitle}</span>
            </p>
          </div>

          {/* Perks */}
          <ul className="space-y-2 mb-6">
            {perks.map(p => (
              <li key={p} className="flex items-center gap-2.5 text-sm"
                style={{ color: '#475569', fontFamily: 'var(--font-sans)' }}>
                <Check size={13} color="#10B981" className="flex-shrink-0" />
                {p}
              </li>
            ))}
          </ul>

          {/* CTA */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onSignUp}
            className="w-full py-4 rounded-xl font-bold text-sm text-white mb-3 transition-opacity hover:opacity-95"
            style={{
              background: `linear-gradient(135deg, ${trackColor}, #7C3AED)`,
              boxShadow: `0 8px 28px ${trackColor}40`,
              fontFamily: 'var(--font-sans)',
            }}
          >
            Start My 7-Day Free Trial
          </motion.button>

          <p className="text-center text-xs mb-3" style={{ color: '#94A3B8', fontFamily: 'var(--font-sans)' }}>
            Free for 7 days &middot; Then $49/month &middot; Cancel anytime
          </p>

          <button
            onClick={onSignIn}
            className="w-full text-center text-xs font-medium py-1 transition-colors hover:text-slate-700"
            style={{ color: '#94A3B8', fontFamily: 'var(--font-sans)' }}>
            Already have an account? Sign in
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function LessonPage() {
  const params = useParams()
  const lessonId = params.lessonId as string
  const trackId = params.trackId as string
  const color = trackColors[trackId] ?? '#7C3AED'

  const [activeTab, setActiveTab] = useState<Tab>('lesson')
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [exerciseDone, setExerciseDone] = useState(false)
  const [isInPath, setIsInPath] = useState(false)

  const { user, openSignIn, openSignUp } = useAuth()
  const { addXP, completeLesson, completePerfectQuiz, state } = useGame()

  // Module 1 is free; Module 2+ requires sign-in (trial access)
  const moduleNum = parseInt(lessonId.match(/-m(\d+)-/)?.[1] ?? '1', 10)
  const isLocked = moduleNum > 1 && !user

  const result = getLesson(trackId as TrackId, lessonId)
  const lesson: Lesson | undefined = result?.lesson
  const module: Module | undefined = result?.module
  const nextLesson = getNextLesson(trackId as TrackId, lessonId)
  const moduleId = lessonId.split('-l')[0]

  useEffect(() => {
    setCompleted(state.completedLessons.includes(lessonId))
  }, [lessonId, state.completedLessons])

  useEffect(() => {
    try {
      const raw = localStorage.getItem('ai-literacy-assessment')
      if (raw) {
        const result = JSON.parse(raw)
        const inPath = result.customPath?.some((l: { lessonId: string }) => l.lessonId === lessonId)
        setIsInPath(!!inPath)
      }
    } catch {}
  }, [lessonId])

  const progressPct = completed ? 100
    : activeTab === 'quiz' ? 66
    : activeTab === 'exercise' ? 33
    : 10

  const handleMarkComplete = () => {
    if (completed) return
    completeLesson(lessonId, moduleId, trackId)
  }

  const handleExerciseDone = () => {
    if (exerciseDone) return
    setExerciseDone(true)
    addXP(XP.EXERCISE_COMPLETE, 'Exercise complete')
    setTimeout(() => setActiveTab('quiz'), 400)
  }

  const handleQuizSubmit = () => {
    if (!lesson) return
    const allCorrect = lesson.quiz.every((q, i) => quizAnswers[i] === q.correct)
    setQuizSubmitted(true)
    if (allCorrect) {
      completePerfectQuiz()
    } else {
      addXP(XP.QUIZ_PASS, 'Quiz complete')
    }
  }

  const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: 'lesson', label: 'Lesson', icon: BookOpen },
    { id: 'exercise', label: 'Exercise', icon: Dumbbell },
    { id: 'quiz', label: 'Quiz', icon: HelpCircle },
  ]

  return (
    <main style={{ background: '#F8FAFC', minHeight: '100vh' }}>
      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-40 px-6 py-3 flex items-center gap-4"
        style={{
          background: 'rgba(255,255,255,0.95)',
          borderBottom: '1px solid #E2E8F0',
          backdropFilter: 'blur(12px)',
        }}>
        <Link
          href={`/tracks/${trackId}`}
          className="inline-flex items-center gap-1.5 text-sm transition-colors hover:text-slate-700 flex-shrink-0"
          style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}
        >
          <ArrowLeft size={14} />
          <span className="hidden sm:inline">Back</span>
        </Link>

        {/* Progress bar */}
        <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: '#E2E8F0' }}>
          <motion.div
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="h-full rounded-full"
            style={{ background: `linear-gradient(90deg, ${color}, ${color}aa)` }}
          />
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          <LevelBar />
          <button
            onClick={handleMarkComplete}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all"
            style={
              completed
                ? { background: '#D1FAE5', color: '#059669', border: '1px solid #A7F3D0' }
                : { background: `${color}10`, color, border: `1px solid ${color}25`, fontFamily: 'var(--font-sans)' }
            }
          >
            {completed ? <><CheckCircle2 size={13} /> Done</> : 'Mark complete'}
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 pt-24 pb-20">
        {/* Lesson header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: easing }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            {isInPath && (
              <span className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full"
                style={{ background: '#EDE9FE', color: '#7C3AED', fontFamily: 'var(--font-sans)', border: '1px solid #DDD6FE' }}>
                <Sparkles size={9} /> From your AI path
              </span>
            )}
            {module && (
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full"
                style={{ background: `${color}10`, color, fontFamily: 'var(--font-sans)' }}>
                {module.title}
              </span>
            )}
            <span className="flex items-center gap-1 text-xs" style={{ color: '#94A3B8', fontFamily: 'var(--font-sans)' }}>
              <Clock size={12} /> {lesson?.duration ?? 15} min
            </span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-black mb-3"
            style={{ fontFamily: 'var(--font-sans)', color: '#0F172A' }}>
            {lesson?.title ?? lessonId}
          </h1>
          {lesson?.description && (
            <p className="text-base leading-relaxed" style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}>
              {lesson.description}
            </p>
          )}
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-1 p-1 rounded-xl mb-8"
          style={{ background: '#F1F5F9', border: '1px solid #E2E8F0' }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all"
              style={
                activeTab === tab.id
                  ? { background: '#FFFFFF', color, fontFamily: 'var(--font-sans)', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }
                  : { color: '#94A3B8', fontFamily: 'var(--font-sans)' }
              }
            >
              <tab.icon size={14} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── Lesson tab ── */}
        {activeTab === 'lesson' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="space-y-6">
            {lesson ? (
              <>
                <div className="p-6 rounded-2xl"
                  style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                  <LessonContent content={lesson.content} color={color} />
                </div>

                {/* Key takeaways */}
                <div className="p-6 rounded-2xl"
                  style={{ background: `${color}06`, border: `1px solid ${color}20` }}>
                  <div className="flex items-center gap-2 mb-4">
                    <Lightbulb size={16} color={color} />
                    <h3 className="text-sm font-bold" style={{ fontFamily: 'var(--font-sans)', color: '#0F172A' }}>
                      Key Takeaways
                    </h3>
                  </div>
                  <ul className="space-y-2.5">
                    {lesson.keyTakeaways.map((point, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm"
                        style={{ color: '#475569', fontFamily: 'var(--font-sans)' }}>
                        <CheckCircle2 size={14} color={color} className="mt-0.5 flex-shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            ) : (
              <FallbackLesson lessonId={lessonId} color={color} />
            )}

            <button
              onClick={() => setActiveTab('exercise')}
              className="w-full py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all hover:opacity-90"
              style={{ background: `linear-gradient(135deg, ${color}, ${color}bb)`, color: '#fff', fontFamily: 'var(--font-sans)' }}
            >
              Continue to Exercise <ArrowRight size={16} />
            </button>
          </motion.div>
        )}

        {/* ── Exercise tab ── */}
        {activeTab === 'exercise' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            {lesson ? (
              <div className="p-7 rounded-2xl mb-6"
                style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                <div className="flex items-center gap-2 mb-1">
                  <Dumbbell size={16} color={color} />
                  <span className="text-xs font-semibold" style={{ color, fontFamily: 'var(--font-sans)' }}>
                    Hands-on Exercise
                  </span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs mb-4"
                  style={{ background: '#F8FAFC', color: '#64748B', border: '1px solid #E2E8F0', fontFamily: 'var(--font-sans)' }}>
                  Tool: {lesson.exercise.tool}
                </div>
                <h2 className="text-xl font-black mb-2"
                  style={{ fontFamily: 'var(--font-sans)', color: '#0F172A' }}>
                  {lesson.exercise.title}
                </h2>
                <p className="text-sm leading-relaxed mb-6" style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}>
                  {lesson.exercise.description}
                </p>
                <ol className="space-y-4">
                  {lesson.exercise.steps.map((step, i) => (
                    <li key={i} className="flex gap-4">
                      <div className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-black mt-0.5"
                        style={{ background: `${color}12`, color, fontFamily: 'var(--font-sans)' }}>
                        {i + 1}
                      </div>
                      <p className="text-sm leading-relaxed pt-0.5" style={{ color: '#475569', fontFamily: 'var(--font-sans)' }}>
                        {step}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            ) : (
              <FallbackLesson lessonId={lessonId} color={color} />
            )}

            <button
              onClick={handleExerciseDone}
              className="w-full py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all hover:opacity-90"
              style={
                exerciseDone
                  ? { background: '#D1FAE5', color: '#059669', border: '1px solid #A7F3D0', fontFamily: 'var(--font-sans)' }
                  : { background: `linear-gradient(135deg, ${color}, ${color}bb)`, color: '#fff', fontFamily: 'var(--font-sans)' }
              }
            >
              {exerciseDone
                ? <><CheckCircle2 size={15} /> Exercise done — go to Quiz</>
                : <>I&apos;ve completed the exercise <ArrowRight size={16} /></>
              }
            </button>
          </motion.div>
        )}

        {/* ── Quiz tab ── */}
        {activeTab === 'quiz' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="space-y-5">
            {lesson ? (
              <>
                {lesson.quiz.map((q, qi) => (
                  <div key={qi} className="p-6 rounded-2xl"
                    style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                    <p className="text-sm font-semibold mb-4"
                      style={{ color: '#0F172A', fontFamily: 'var(--font-sans)' }}>
                      {qi + 1}. {q.question}
                    </p>
                    <div className="space-y-2.5">
                      {q.options.map((opt, oi) => {
                        const selected = quizAnswers[qi] === oi
                        const isCorrect = oi === q.correct
                        return (
                          <button
                            key={oi}
                            onClick={() => !quizSubmitted && setQuizAnswers(prev => ({ ...prev, [qi]: oi }))}
                            className="w-full text-left px-4 py-3 rounded-xl text-sm transition-all"
                            style={{
                              fontFamily: 'var(--font-sans)',
                              background: quizSubmitted
                                ? isCorrect ? '#D1FAE5' : selected ? '#FEE2E2' : '#F8FAFC'
                                : selected ? `${color}08` : '#F8FAFC',
                              border: quizSubmitted
                                ? isCorrect ? '1px solid #A7F3D0' : selected ? '1px solid #FECACA' : '1px solid #E2E8F0'
                                : selected ? `1px solid ${color}` : '1px solid #E2E8F0',
                              color: quizSubmitted
                                ? isCorrect ? '#059669' : selected ? '#DC2626' : '#64748B'
                                : selected ? color : '#64748B',
                              cursor: quizSubmitted ? 'default' : 'pointer',
                            }}
                          >
                            {opt}
                          </button>
                        )
                      })}
                    </div>
                    {quizSubmitted && (
                      <div className="mt-3 p-3 rounded-lg text-xs leading-relaxed"
                        style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', color: '#64748B', fontFamily: 'var(--font-sans)' }}>
                        <span className="font-semibold" style={{ color: '#334155' }}>Why: </span>
                        {q.explanation}
                      </div>
                    )}
                  </div>
                ))}

                {!quizSubmitted ? (
                  <button
                    onClick={handleQuizSubmit}
                    disabled={Object.keys(quizAnswers).length < lesson.quiz.length}
                    className="w-full py-3.5 rounded-xl font-semibold text-sm transition-all disabled:opacity-40 hover:opacity-90"
                    style={{ background: `linear-gradient(135deg, ${color}, ${color}bb)`, color: '#fff', fontFamily: 'var(--font-sans)' }}
                  >
                    Submit Answers
                  </button>
                ) : (
                  <div className="space-y-3">
                    {!completed && (
                      <button
                        onClick={handleMarkComplete}
                        className="w-full py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2"
                        style={{ background: '#D1FAE5', color: '#059669', border: '1px solid #A7F3D0', fontFamily: 'var(--font-sans)' }}
                      >
                        <CheckCircle2 size={15} /> Mark lesson complete (+{XP.LESSON_COMPLETE} XP)
                      </button>
                    )}
                    {nextLesson && (
                      <Link
                        href={`/tracks/${trackId}/lessons/${nextLesson.id}`}
                        className="w-full py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all hover:opacity-90"
                        style={{ background: `linear-gradient(135deg, ${color}, ${color}bb)`, color: '#fff', fontFamily: 'var(--font-sans)' }}
                      >
                        Next Lesson <ArrowRight size={16} />
                      </Link>
                    )}
                    {!nextLesson && (
                      <Link
                        href={`/tracks/${trackId}`}
                        className="w-full py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2"
                        style={{ background: `${color}10`, color, border: `1px solid ${color}20`, fontFamily: 'var(--font-sans)' }}
                      >
                        Back to track overview
                      </Link>
                    )}
                  </div>
                )}
              </>
            ) : (
              <FallbackLesson lessonId={lessonId} color={color} />
            )}
          </motion.div>
        )}
      </div>

      {/* Paywall — Module 2+ locked for unauthenticated users */}
      <AnimatePresence>
        {isLocked && (
          <PaywallOverlay
            trackId={trackId}
            trackColor={color}
            lessonTitle={lesson?.title ?? 'Next lesson'}
            completedCount={state.completedLessons.length}
            onSignUp={openSignUp}
            onSignIn={openSignIn}
          />
        )}
      </AnimatePresence>
    </main>
  )
}
