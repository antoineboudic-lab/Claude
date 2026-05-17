'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Megaphone, LineChart, HeartHandshake, TrendingUp,
  Settings, Briefcase, Zap, Check, ArrowRight,
  Clock, BookOpen, Star, ChevronRight, RefreshCw,
} from 'lucide-react'
import type { AssessmentResult, PriorityLesson } from '@/lib/assessment/types'
import type { TrackId } from '@/lib/curriculum/types'
import { useAuth } from '@/context/AuthContext'
import { loadLatestAssessment } from '@/lib/supabase/db'

// ─── Track meta ───────────────────────────────────────────────────────────────

const TRACK_META: Record<TrackId, {
  label: string
  icon: React.ElementType
  color: string
  tagline: string
}> = {
  marketing: { label: 'Marketing', icon: Megaphone, color: '#EC4899', tagline: 'Create, campaign, and grow with AI precision' },
  finance: { label: 'Finance', icon: LineChart, color: '#F59E0B', tagline: 'Model, forecast, and report with AI precision' },
  hr: { label: 'HR & People', icon: HeartHandshake, color: '#10B981', tagline: 'Hire smarter, engage deeper, develop faster' },
  sales: { label: 'Sales', icon: TrendingUp, color: '#8B5CF6', tagline: 'Prospect, pitch, and close with AI as your edge' },
  operations: { label: 'Operations', icon: Settings, color: '#22D3EE', tagline: 'Streamline processes and decisions with AI' },
  leadership: { label: 'Leadership', icon: Briefcase, color: '#F97316', tagline: 'Lead your organisation into the AI era' },
}

const PRIORITY_CONFIG = {
  essential: { label: 'Essential', color: '#22D3EE', bg: 'rgba(34,211,238,0.08)', border: 'rgba(34,211,238,0.2)' },
  recommended: { label: 'Recommended', color: '#7C3AED', bg: '#EDE9FE', border: '#DDD6FE' },
  optional: { label: 'Optional', color: '#94A3B8', bg: '#F8FAFC', border: '#E2E8F0' },
}

const stagger = { visible: { transition: { staggerChildren: 0.07 } } }
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function AssessmentResultsPage() {
  const [result, setResult] = useState<AssessmentResult | null>(null)
  const [showAll, setShowAll] = useState(false)
  const { user, openSignUp } = useAuth()

  useEffect(() => {
    async function load() {
      if (user) {
        const remote = await loadLatestAssessment(user.id).catch(() => null)
        if (remote) {
          setResult(remote)
          localStorage.setItem('ai-literacy-assessment', JSON.stringify(remote))
          return
        }
      }
      try {
        const raw = localStorage.getItem('ai-literacy-assessment')
        if (raw) setResult(JSON.parse(raw) as AssessmentResult)
      } catch {
        // ignore
      }
    }
    load()
  }, [user])

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#F8FAFC' }}>
        <div className="text-center">
          <p className="text-lg mb-4" style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}>
            No assessment found.
          </p>
          <Link href="/assessment"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white"
            style={{ background: 'linear-gradient(135deg, #7C3AED, #22D3EE)' }}>
            Take the assessment <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    )
  }

  const meta = TRACK_META[result.primaryTrackId]
  const Icon = meta.icon
  const essential = result.customPath.filter(l => l.priority === 'essential')
  const optional = result.customPath.filter(l => l.priority === 'optional')

  const modules = Array.from(
    result.customPath.reduce((acc, l) => {
      if (!acc.has(l.moduleId)) acc.set(l.moduleId, { title: l.moduleTitle, moduleIndex: l.moduleIndex, lessons: [] })
      acc.get(l.moduleId)!.lessons.push(l)
      return acc
    }, new Map<string, { title: string; moduleIndex: number; lessons: PriorityLesson[] }>())
  ).sort(([, a], [, b]) => a.moduleIndex - b.moduleIndex)

  const firstEssentialLesson = essential[0]

  return (
    <div className="min-h-screen" style={{ background: '#F8FAFC' }}>
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4"
        style={{ background: '#FFFFFF', borderBottom: '1px solid #E2E8F0' }}>
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #7C3AED, #22D3EE)' }}>
            <Zap size={16} className="text-white" />
          </div>
          <span className="font-bold" style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', color: '#0F172A' }}>
            AI Literacy
          </span>
        </Link>
        <Link href="/assessment"
          className="flex items-center gap-1.5 text-xs font-medium transition-colors hover:text-slate-700"
          style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}>
          <RefreshCw size={12} /> Retake assessment
        </Link>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-14">
        <motion.div variants={stagger} initial="hidden" animate="visible">

          {/* Hero */}
          <motion.div variants={fadeUp} className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-xs font-semibold"
              style={{ background: '#ECFEFF', color: '#22D3EE', fontFamily: 'var(--font-sans)', border: '1px solid #A5F3FC' }}>
              <Check size={11} /> Your path is ready
            </div>
            <h1 className="text-4xl lg:text-5xl font-black mb-4" style={{ fontFamily: 'var(--font-sans)', color: '#0F172A' }}>
              {result.answers.name
                ? <>Hi {result.answers.name}, here's<br />your <span style={{ background: 'linear-gradient(90deg, #7C3AED, #22D3EE)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>personalised AI path</span></>
                : <>Here's your<br /><span style={{ background: 'linear-gradient(90deg, #7C3AED, #22D3EE)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>personalised AI path</span></>
              }
            </h1>
            <p className="text-base max-w-xl mx-auto" style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}>
              {result.reasoning}
            </p>
          </motion.div>

          {/* Track card */}
          <motion.div variants={fadeUp} className="rounded-3xl p-8 mb-6 relative overflow-hidden"
            style={{ background: `${meta.color}06`, border: `1px solid ${meta.color}25`, boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
            <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full blur-3xl opacity-10"
              style={{ background: meta.color }} />

            <div className="relative flex items-start justify-between gap-6">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${meta.color}12`, border: `1px solid ${meta.color}30` }}>
                  <Icon size={28} color={meta.color} />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-widest mb-1"
                    style={{ color: meta.color, fontFamily: 'var(--font-sans)' }}>
                    Recommended track
                  </div>
                  <h2 className="text-2xl font-black" style={{ fontFamily: 'var(--font-sans)', color: '#0F172A' }}>
                    {meta.label}
                  </h2>
                  <p className="text-sm mt-1" style={{ color: '#475569', fontFamily: 'var(--font-sans)' }}>
                    {meta.tagline}
                  </p>
                </div>
              </div>
              <Link href={`/tracks/${result.primaryTrackId}`}
                className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white flex-shrink-0 transition-all hover:opacity-90"
                style={{ background: meta.color, fontFamily: 'var(--font-sans)' }}>
                View track <ChevronRight size={14} />
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                { icon: BookOpen, label: 'Lessons', value: `${result.totalLessons}` },
                { icon: Star, label: 'Essential', value: `${result.essentialCount}` },
                { icon: Clock, label: 'Est. completion', value: `~${result.estimatedWeeks} wks` },
              ].map(stat => {
                const SI = stat.icon
                return (
                  <div key={stat.label} className="p-4 rounded-2xl text-center"
                    style={{ background: '#FFFFFF', border: '1px solid #E2E8F0' }}>
                    <SI size={16} color={meta.color} className="mx-auto mb-2" />
                    <div className="text-xl font-black" style={{ fontFamily: 'var(--font-sans)', color: '#0F172A' }}>
                      {stat.value}
                    </div>
                    <div className="text-xs mt-0.5" style={{ color: '#94A3B8', fontFamily: 'var(--font-sans)' }}>
                      {stat.label}
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>

          {/* Save path banner — unauthenticated users */}
          {!user && (
            <motion.div variants={fadeUp}
              className="flex items-center gap-4 px-6 py-5 rounded-2xl mb-6"
              style={{ background: '#EDE9FE', border: '1px solid #DDD6FE' }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: '#DDD6FE' }}>
                <Zap size={16} color="#7C3AED" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold" style={{ color: '#0F172A', fontFamily: 'var(--font-sans)' }}>
                  Save your path — it's free
                </p>
                <p className="text-xs mt-0.5" style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}>
                  Create an account to track your progress and pick up where you left off.
                </p>
              </div>
              <button onClick={openSignUp}
                className="flex-shrink-0 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                style={{ background: 'linear-gradient(135deg, #7C3AED, #22D3EE)', fontFamily: 'var(--font-sans)' }}>
                Sign up free
              </button>
            </motion.div>
          )}

          {/* CTA */}
          {firstEssentialLesson && (
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 mb-10">
              <Link
                href={`/tracks/${firstEssentialLesson.trackId}/lessons/${firstEssentialLesson.lessonId}`}
                className="flex-1 flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-base text-white transition-all hover:opacity-90"
                style={{
                  background: 'linear-gradient(135deg, #7C3AED, #22D3EE)',
                  boxShadow: '0 4px 14px rgba(124,58,237,0.25)',
                  fontFamily: 'var(--font-sans)',
                }}>
                Start first essential lesson <ArrowRight size={16} />
              </Link>
              <Link
                href={`/tracks/${result.primaryTrackId}`}
                className="flex-1 flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-base transition-all hover:bg-slate-100"
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  color: '#334155',
                  fontFamily: 'var(--font-sans)',
                }}>
                Browse full track <ChevronRight size={16} />
              </Link>
            </motion.div>
          )}

          {/* Custom path */}
          <motion.div variants={fadeUp}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-xl font-black" style={{ fontFamily: 'var(--font-sans)', color: '#0F172A' }}>
                Your custom learning path
              </h3>
              <div className="flex items-center gap-3 text-xs" style={{ fontFamily: 'var(--font-sans)' }}>
                {(['essential', 'recommended', 'optional'] as const).map(p => (
                  <div key={p} className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full" style={{ background: PRIORITY_CONFIG[p].color }} />
                    <span style={{ color: '#94A3B8' }}>{PRIORITY_CONFIG[p].label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {modules.map(([moduleId, mod], modIdx) => {
                const visibleLessons = showAll ? mod.lessons : mod.lessons.filter(l => l.priority !== 'optional')
                if (!showAll && visibleLessons.length === 0) return null

                return (
                  <div key={moduleId} className="rounded-2xl overflow-hidden"
                    style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                    <div className="px-5 py-3 flex items-center gap-3"
                      style={{ background: '#F8FAFC', borderBottom: '1px solid #F1F5F9' }}>
                      <div className="w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold"
                        style={{ background: `${meta.color}12`, color: meta.color, fontFamily: 'var(--font-sans)' }}>
                        {modIdx + 1}
                      </div>
                      <span className="text-sm font-semibold" style={{ fontFamily: 'var(--font-sans)', color: '#0F172A' }}>
                        {mod.title}
                      </span>
                    </div>

                    <div className="divide-y divide-slate-50">
                      {visibleLessons.map(lesson => {
                        const pc = PRIORITY_CONFIG[lesson.priority]
                        return (
                          <Link
                            key={lesson.lessonId}
                            href={`/tracks/${lesson.trackId}/lessons/${lesson.lessonId}`}
                            className="flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-slate-50 group"
                          >
                            <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: pc.color }} />
                            <span className="flex-1 text-sm" style={{ color: '#475569', fontFamily: 'var(--font-sans)' }}>
                              {lesson.lessonTitle}
                            </span>
                            <span className="text-xs px-2.5 py-1 rounded-full flex-shrink-0"
                              style={{ background: pc.bg, border: `1px solid ${pc.border}`, color: pc.color, fontFamily: 'var(--font-sans)' }}>
                              {pc.label}
                            </span>
                            <ChevronRight size={13} className="flex-shrink-0 text-slate-300 group-hover:text-slate-400 transition-colors" />
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>

            {!showAll && optional.length > 0 && (
              <button
                onClick={() => setShowAll(true)}
                className="mt-4 w-full py-3 rounded-xl text-sm font-medium transition-all hover:bg-slate-100"
                style={{ color: '#64748B', border: '1px solid #E2E8F0', background: '#FFFFFF', fontFamily: 'var(--font-sans)' }}>
                Show {optional.length} optional lessons
              </button>
            )}
          </motion.div>

          {/* Bottom encouragement */}
          <motion.div variants={fadeUp} className="mt-10 text-center p-8 rounded-3xl"
            style={{ background: '#EDE9FE', border: '1px solid #DDD6FE' }}>
            <Zap size={24} color="#7C3AED" className="mx-auto mb-3" />
            <h3 className="text-lg font-black mb-2" style={{ fontFamily: 'var(--font-sans)', color: '#0F172A' }}>
              Ready when you are
            </h3>
            <p className="text-sm mb-5" style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}>
              Each lesson is 15–20 minutes. Your progress is saved automatically.
            </p>
            {firstEssentialLesson && (
              <Link
                href={`/tracks/${firstEssentialLesson.trackId}/lessons/${firstEssentialLesson.lessonId}`}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                style={{ background: 'linear-gradient(135deg, #7C3AED, #22D3EE)', fontFamily: 'var(--font-sans)' }}>
                Start learning now <ArrowRight size={14} />
              </Link>
            )}
          </motion.div>

        </motion.div>
      </div>
    </div>
  )
}
