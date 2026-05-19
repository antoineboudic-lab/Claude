'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Zap, BookOpen, Award, Flame, TrendingUp, ChevronRight,
  ArrowRight, Target, BarChart3, CheckCircle2,
  Star, LogOut, Sparkles, Play, Users, Share2, Copy, Check as CheckIcon, Search,
} from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { useGame } from '@/context/GameContext'
import { ShareCard } from '@/components/ShareCard'
import GlobalSearch from '@/components/GlobalSearch'
import { loadLatestAssessment } from '@/lib/supabase/db'
import { getAdminTeam, getMemberTeam } from '@/lib/supabase/teams'
import {
  getLevelForXP, getProgressToNextLevel, BADGES, LEVELS,
} from '@/lib/gamification'
import type { AssessmentResult } from '@/lib/assessment/types'
import { getTrack, getAllTracks } from '@/lib/curriculum'

// ─── Helpers ──────────────────────────────────────────────────────────────────

const easing = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number]

const TRACK_COLORS: Record<string, string> = {
  marketing:  '#EC4899',
  finance:    '#F59E0B',
  hr:         '#10B981',
  sales:      '#8B5CF6',
  operations: '#22D3EE',
  leadership: '#F97316',
  legal:      '#6366F1',
  product:    '#14B8A6',
  customer:   '#F43F5E',
  consulting: '#0EA5E9',
}

const TRACK_ICONS: Record<string, string> = {
  marketing:  '📣',
  finance:    '📊',
  hr:         '🤝',
  sales:      '🎯',
  operations: '⚙️',
  leadership: '🧭',
  legal:      '⚖️',
  product:    '📦',
  customer:   '🎧',
  consulting: '📈',
}

// ─── Animated counter ─────────────────────────────────────────────────────────

function AnimatedNumber({ value, duration = 1.2 }: { value: number; duration?: number }) {
  const [display, setDisplay] = useState(0)
  const start = useRef(0)
  const frame = useRef<number | null>(null)

  useEffect(() => {
    const startTime = performance.now()
    const from = start.current
    const to = value

    function tick(now: number) {
      const t = Math.min((now - startTime) / (duration * 1000), 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setDisplay(Math.round(from + (to - from) * eased))
      if (t < 1) frame.current = requestAnimationFrame(tick)
      else start.current = to
    }

    frame.current = requestAnimationFrame(tick)
    return () => { if (frame.current) cancelAnimationFrame(frame.current) }
  }, [value, duration])

  return <>{display}</>
}

// ─── XP Progress ring ─────────────────────────────────────────────────────────

function XPRing({ xp, size = 96 }: { xp: number; size?: number }) {
  const level = getLevelForXP(xp)
  const progress = getProgressToNextLevel(xp)
  const radius = (size - 8) / 2
  const circumference = 2 * Math.PI * radius
  const dash = (progress / 100) * circumference

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="absolute -rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#E2E8F0" strokeWidth={6} />
        <motion.circle
          cx={size / 2} cy={size / 2} r={radius} fill="none"
          stroke={level.color} strokeWidth={6} strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - dash }}
          transition={{ duration: 1.4, ease: easing, delay: 0.3 }}
        />
      </svg>
      <div className="text-center z-10">
        <p className="text-lg font-black leading-none" style={{ color: level.color, fontFamily: 'var(--font-sans)' }}>
          {level.level}
        </p>
        <p className="text-[9px] uppercase tracking-wide" style={{ color: '#94A3B8', fontFamily: 'var(--font-sans)' }}>
          lvl
        </p>
      </div>
    </div>
  )
}

// ─── Stat card ────────────────────────────────────────────────────────────────

function StatCard({
  icon: Icon, label, value, color, delay = 0,
}: { icon: React.ElementType; label: string; value: number | string; color: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: easing }}
      className="p-5 rounded-2xl"
      style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${color}12` }}>
          <Icon size={16} style={{ color }} />
        </div>
      </div>
      <p className="text-2xl font-black mb-0.5" style={{ color: '#0F172A', fontFamily: 'var(--font-sans)' }}>
        {typeof value === 'number' ? <AnimatedNumber value={value} /> : value}
      </p>
      <p className="text-xs" style={{ color: '#94A3B8', fontFamily: 'var(--font-sans)' }}>
        {label}
      </p>
    </motion.div>
  )
}

// ─── Learning path card ───────────────────────────────────────────────────────

function LearningPathCard({ result }: { result: AssessmentResult }) {
  const track = getTrack(result.primaryTrackId)
  const color = TRACK_COLORS[result.primaryTrackId] ?? '#7C3AED'
  const icon = TRACK_ICONS[result.primaryTrackId] ?? '🎓'
  const essential = result.customPath.filter(l => l.priority === 'essential')
  const firstLesson = essential[0]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.55, ease: easing }}
      className="rounded-2xl overflow-hidden"
      style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
    >
      {/* Track header */}
      <div className="px-6 py-5 flex items-center justify-between" style={{ borderBottom: '1px solid #F1F5F9', background: '#FAFBFC' }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
            style={{ background: `${color}10`, border: `1px solid ${color}20` }}>
            {icon}
          </div>
          <div>
            <p className="text-xs font-medium mb-0.5" style={{ color: '#94A3B8', fontFamily: 'var(--font-sans)' }}>
              Your personalised track
            </p>
            <p className="text-sm font-bold" style={{ color: '#0F172A', fontFamily: 'var(--font-sans)' }}>
              {track?.title ?? result.primaryTrackId} Track
            </p>
          </div>
        </div>
        <span className="px-2.5 py-1 rounded-lg text-xs font-semibold"
          style={{ background: `${color}10`, color, fontFamily: 'var(--font-sans)' }}>
          AI-Curated
        </span>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 px-6 py-4" style={{ borderBottom: '1px solid #F1F5F9' }}>
        {[
          { label: 'Essential', value: result.essentialCount, color: '#7C3AED' },
          { label: 'Total lessons', value: result.totalLessons, color },
          { label: 'Est. weeks', value: result.estimatedWeeks, color: '#22D3EE' },
        ].map(s => (
          <div key={s.label} className="text-center">
            <p className="text-lg font-black" style={{ color: s.color, fontFamily: 'var(--font-sans)' }}>
              {s.value}
            </p>
            <p className="text-xs" style={{ color: '#94A3B8', fontFamily: 'var(--font-sans)' }}>
              {s.label}
            </p>
          </div>
        ))}
      </div>

      {/* Essential lessons preview */}
      <div className="px-6 py-4 space-y-1">
        <p className="text-xs font-semibold mb-3" style={{ color: '#94A3B8', fontFamily: 'var(--font-sans)' }}>
          Essential lessons
        </p>
        {essential.slice(0, 3).map((lesson, i) => (
          <Link
            key={lesson.lessonId}
            href={`/tracks/${lesson.trackId}/lessons/${lesson.lessonId}`}
            className="flex items-center gap-3 p-3 rounded-xl transition-colors hover:bg-slate-50 group"
          >
            <div className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold"
              style={{ background: `${color}12`, color, fontFamily: 'var(--font-sans)' }}>
              {i + 1}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate" style={{ color: '#334155', fontFamily: 'var(--font-sans)' }}>
                {lesson.lessonTitle}
              </p>
              <p className="text-xs truncate" style={{ color: '#94A3B8', fontFamily: 'var(--font-sans)' }}>
                {lesson.moduleTitle}
              </p>
            </div>
            <ChevronRight size={14} className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color }} />
          </Link>
        ))}
      </div>

      {/* CTA */}
      {firstLesson && (
        <div className="px-6 pb-6">
          <Link
            href={`/tracks/${firstLesson.trackId}/lessons/${firstLesson.lessonId}`}
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
            style={{
              background: `linear-gradient(135deg, ${color}, #22D3EE)`,
              fontFamily: 'var(--font-sans)',
            }}
          >
            <Play size={14} /> Continue learning
          </Link>
        </div>
      )}
    </motion.div>
  )
}

// ─── No assessment onboarding ─────────────────────────────────────────────────

function NoAssessmentOnboarding({ name }: { name: string }) {
  const steps = [
    { n: '01', title: 'Tell us about your role', desc: 'We learn what you do and where AI can help most.' },
    { n: '02', title: 'Share your goals', desc: 'Save time, make better decisions, lead AI in your org — we tailor the path.' },
    { n: '03', title: 'Get your curriculum', desc: 'A personalised lesson sequence built only for you, ready to start.' },
  ]
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.55, ease: easing }}
      className="lg:col-span-2"
    >
      <div className="rounded-3xl overflow-hidden"
        style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
        {/* Header */}
        <div className="px-8 pt-8 pb-6 relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #7C3AED08, #22D3EE04)', borderBottom: '1px solid #F1F5F9' }}>
          <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full blur-3xl"
            style={{ background: 'rgba(124,58,237,0.06)' }} />
          <div className="relative">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #7C3AED, #22D3EE)' }}>
                <Sparkles size={14} className="text-white" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#7C3AED', fontFamily: 'var(--font-sans)' }}>
                Step 1 of 1
              </span>
            </div>
            <h2 className="text-2xl font-black mb-2" style={{ fontFamily: 'var(--font-sans)', color: '#0F172A' }}>
              {name ? `${name}, your path isn't built yet.` : "Your learning path isn't built yet."}
            </h2>
            <p className="text-base" style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}>
              We build every curriculum around your role, goals, and experience level. It takes 2 minutes and changes everything.
            </p>
          </div>
        </div>

        {/* Steps */}
        <div className="px-8 py-6" style={{ borderBottom: '1px solid #F1F5F9' }}>
          <div className="space-y-5">
            {steps.map(step => (
              <div key={step.n} className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center text-xs font-black"
                  style={{ background: '#EDE9FE', color: '#7C3AED', fontFamily: 'var(--font-sans)' }}>
                  {step.n}
                </div>
                <div>
                  <p className="text-sm font-bold mb-0.5" style={{ color: '#0F172A', fontFamily: 'var(--font-sans)' }}>
                    {step.title}
                  </p>
                  <p className="text-sm" style={{ color: '#94A3B8', fontFamily: 'var(--font-sans)' }}>
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="px-8 py-6">
          <Link
            href="/assessment"
            className="flex items-center justify-center gap-2 w-full py-4 rounded-xl text-base font-semibold text-white transition-all hover:opacity-90"
            style={{
              background: 'linear-gradient(135deg, #7C3AED, #22D3EE)',
              boxShadow: '0 4px 14px rgba(124,58,237,0.25)',
              fontFamily: 'var(--font-sans)',
            }}
          >
            <Zap size={16} /> Build my personalized learning path
          </Link>
          <p className="text-center text-xs mt-3" style={{ color: '#CBD5E1', fontFamily: 'var(--font-sans)' }}>
            Free forever · Takes 2 minutes · No credit card
          </p>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Badges section ───────────────────────────────────────────────────────────

function BadgesSection({ earned }: { earned: string[] }) {
  const all = Object.values(BADGES)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25, duration: 0.55, ease: easing }}
      className="rounded-2xl p-6"
      style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Award size={16} style={{ color: '#F59E0B' }} />
          <p className="text-sm font-bold" style={{ color: '#0F172A', fontFamily: 'var(--font-sans)' }}>
            Badges
          </p>
        </div>
        <span className="text-xs font-semibold px-2 py-0.5 rounded-lg"
          style={{ background: '#FEF3C7', color: '#D97706', fontFamily: 'var(--font-sans)' }}>
          {earned.length} / {all.length}
        </span>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {all.map((badge) => {
          const isEarned = earned.includes(badge.id)
          return (
            <div
              key={badge.id}
              className="flex flex-col items-center gap-1.5 p-3 rounded-xl text-center"
              style={{
                background: isEarned ? '#FEF3C7' : '#F8FAFC',
                border: isEarned ? '1px solid #FDE68A' : '1px solid #F1F5F9',
              }}
              title={badge.description}
            >
              <span className="text-2xl" style={{ filter: isEarned ? 'none' : 'grayscale(1) opacity(0.3)' }}>
                {badge.icon}
              </span>
              <p className="text-[10px] font-semibold leading-tight"
                style={{ color: isEarned ? '#D97706' : '#CBD5E1', fontFamily: 'var(--font-sans)' }}>
                {badge.name}
              </p>
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}

// ─── Level progress card ──────────────────────────────────────────────────────

function LevelCard({ xp }: { xp: number }) {
  const level = getLevelForXP(xp)
  const progress = getProgressToNextLevel(xp)
  const nextLevel = LEVELS.find(l => l.level === level.level + 1)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.55, ease: easing }}
      className="rounded-2xl p-6"
      style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
    >
      <div className="flex items-center gap-4 mb-5">
        <XPRing xp={xp} size={72} />
        <div>
          <p className="text-xs mb-0.5" style={{ color: '#94A3B8', fontFamily: 'var(--font-sans)' }}>
            Current level
          </p>
          <p className="text-lg font-black" style={{ color: level.color, fontFamily: 'var(--font-sans)' }}>
            {level.title}
          </p>
          <p className="text-sm font-semibold" style={{ color: '#475569', fontFamily: 'var(--font-sans)' }}>
            <AnimatedNumber value={xp} /> XP
          </p>
        </div>
      </div>

      {nextLevel && (
        <>
          <div className="flex items-center justify-between text-xs mb-2" style={{ fontFamily: 'var(--font-sans)' }}>
            <span style={{ color: '#94A3B8' }}>Progress to {nextLevel.title}</span>
            <span style={{ color: level.color }}>{progress}%</span>
          </div>
          <div className="h-2 rounded-full" style={{ background: '#E2E8F0' }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ delay: 0.6, duration: 1.2, ease: easing }}
              className="h-full rounded-full"
              style={{ background: level.color }}
            />
          </div>
          <p className="text-xs mt-2" style={{ color: '#CBD5E1', fontFamily: 'var(--font-sans)' }}>
            {nextLevel.minXP - xp} XP to next level
          </p>
        </>
      )}

      {!nextLevel && (
        <div className="flex items-center gap-1.5 text-xs" style={{ color: '#F59E0B', fontFamily: 'var(--font-sans)' }}>
          <Star size={12} fill="#F59E0B" /> Max level reached
        </div>
      )}
    </motion.div>
  )
}

// ─── Recent tracks section ────────────────────────────────────────────────────

function RecentActivity({ completedLessons, completedModules }: { completedLessons: string[]; completedModules: string[] }) {
  const trackProgress = getAllTracks().map(track => {
    const total = track.modules.reduce((acc, m) => acc + m.lessons.length, 0)
    const done = completedLessons.filter(l => l.startsWith(track.id)).length
    const moduleDone = completedModules.filter(m => m.startsWith(track.id)).length
    return { id: track.id, done, total, moduleDone, pct: Math.round((done / total) * 100) }
  }).filter(t => t.done > 0)

  if (trackProgress.length === 0) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.55, ease: easing }}
      className="rounded-2xl p-6"
      style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
    >
      <div className="flex items-center gap-2 mb-5">
        <BarChart3 size={16} style={{ color: '#22D3EE' }} />
        <p className="text-sm font-bold" style={{ color: '#0F172A', fontFamily: 'var(--font-sans)' }}>
          Track Progress
        </p>
      </div>
      <div className="space-y-4">
        {trackProgress.map(t => {
          const color = TRACK_COLORS[t.id] ?? '#7C3AED'
          const icon = TRACK_ICONS[t.id] ?? '🎓'
          return (
            <Link key={t.id} href={`/tracks/${t.id}`} className="block group">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-sm">{icon}</span>
                  <p className="text-sm font-medium capitalize" style={{ color: '#334155', fontFamily: 'var(--font-sans)' }}>
                    {t.id}
                  </p>
                </div>
                <p className="text-xs font-semibold" style={{ color, fontFamily: 'var(--font-sans)' }}>
                  {t.done}/{t.total}
                </p>
              </div>
              <div className="h-1.5 rounded-full" style={{ background: '#E2E8F0' }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${t.pct}%` }}
                  transition={{ delay: 0.5, duration: 1, ease: easing }}
                  className="h-full rounded-full transition-all group-hover:opacity-80"
                  style={{ background: color }}
                />
              </div>
            </Link>
          )
        })}
      </div>
    </motion.div>
  )
}

// ─── Dashboard page ───────────────────────────────────────────────────────────

export default function DashboardPage() {
  const router = useRouter()
  const { user, loading, signOut } = useAuth()
  const { state, syncing } = useGame()
  const [assessment, setAssessment] = useState<AssessmentResult | null>(null)
  const [mounted, setMounted] = useState(false)
  const [teamHref, setTeamHref] = useState<string | null>(null)
  const [referralCode, setReferralCode] = useState<string | null>(null)
  const [referralStats, setReferralStats] = useState<{ clicks: number; signups: number; conversions: number; reward_xp: number } | null>(null)
  const [copied, setCopied] = useState(false)
  const [shareOpen, setShareOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(v => !v)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (!user) return
    Promise.all([getAdminTeam(user.id), getMemberTeam(user.id)]).then(([admin, member]) => {
      if (admin) setTeamHref('/dashboard/team')
      else if (member) setTeamHref('/dashboard/team')
      else setTeamHref('/dashboard/team/create')
    })
  }, [user])

  useEffect(() => {
    if (!user) return
    fetch(`/api/referrals?userId=${user.id}`)
      .then(r => r.json())
      .then(data => {
        if (data.code) {
          setReferralCode(data.code)
          setReferralStats({ clicks: data.clicks, signups: data.signups, conversions: data.conversions, reward_xp: data.reward_xp })
        }
      })
      .catch(() => {})
  }, [user])

  useEffect(() => {
    if (!mounted) return

    async function load() {
      if (user) {
        const remote = await loadLatestAssessment(user.id).catch(() => null)
        if (remote) {
          setAssessment(remote)
          localStorage.setItem('ai-literacy-assessment', JSON.stringify(remote))
          return
        }
      }
      try {
        const raw = localStorage.getItem('ai-literacy-assessment')
        if (raw) setAssessment(JSON.parse(raw))
      } catch {}
    }

    load()
  }, [user, mounted])

  useEffect(() => {
    if (!loading && !user) router.replace('/?next=/dashboard')
  }, [loading, user, router])

  if (!mounted || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#F8FAFC' }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-8 h-8 rounded-full border-2 border-t-transparent"
          style={{ borderColor: '#7C3AED', borderTopColor: 'transparent' }}
        />
      </div>
    )
  }

  if (!user) return null

  const level = getLevelForXP(state.xp)
  const displayName = user.user_metadata?.full_name?.split(' ')[0] ?? user.email?.split('@')[0] ?? 'there'
  const initials = user.user_metadata?.full_name
    ? user.user_metadata.full_name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
    : user.email?.slice(0, 2).toUpperCase() ?? '?'

  return (
    <div className="min-h-screen" style={{ background: '#F8FAFC' }}>
      {/* Navbar */}
      <nav className="sticky top-0 z-40 px-6 py-4"
        style={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(16px)', borderBottom: '1px solid #E2E8F0' }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #7C3AED, #22D3EE)' }}>
              <Zap size={13} className="text-white" />
            </div>
            <span className="font-bold text-sm" style={{ fontFamily: 'var(--font-sans)', color: '#0F172A' }}>
              AI Literacy
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setSearchOpen(true)}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors hover:bg-slate-100"
              style={{ color: '#64748B', fontFamily: 'var(--font-sans)', border: '1px solid #E2E8F0', background: '#F8FAFC' }}
            >
              <Search size={13} />
              <span>Search</span>
              <kbd style={{ fontSize: '10px', color: '#94A3B8', background: '#E2E8F0', borderRadius: '3px', padding: '1px 5px' }}>⌘K</kbd>
            </button>
            <Link href="/tracks" className="flex items-center gap-1.5 text-sm transition-colors hover:text-slate-700"
              style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}>
              <BookOpen size={14} /> All Tracks
            </Link>
            {teamHref && (
              <Link href={teamHref} className="flex items-center gap-1.5 text-sm font-semibold transition-colors hover:opacity-80 px-3 py-1.5 rounded-lg"
                style={{ color: '#7C3AED', background: '#EDE9FE', fontFamily: 'var(--font-sans)' }}>
                <Users size={13} /> Team
              </Link>
            )}
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white"
                style={{ background: 'linear-gradient(135deg, #7C3AED, #22D3EE)', fontFamily: 'var(--font-sans)' }}>
                {initials}
              </div>
              <button
                onClick={signOut}
                className="flex items-center gap-1.5 text-sm transition-colors hover:text-red-500"
                style={{ color: '#94A3B8', fontFamily: 'var(--font-sans)' }}
              >
                <LogOut size={13} /> Sign out
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: easing }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center gap-2">
              <Sparkles size={14} style={{ color: '#7C3AED' }} />
              <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#94A3B8', fontFamily: 'var(--font-sans)' }}>
                Your Dashboard
              </p>
            </div>
            <AnimatePresence>
              {syncing && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-1.5 text-xs"
                  style={{ color: '#94A3B8', fontFamily: 'var(--font-sans)' }}
                >
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="inline-block w-3 h-3 rounded-full border border-t-transparent"
                    style={{ borderColor: '#7C3AED', borderTopColor: 'transparent' }}
                  />
                  Syncing…
                </motion.span>
              )}
            </AnimatePresence>
          </div>
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-3xl lg:text-4xl font-black" style={{ fontFamily: 'var(--font-sans)', color: '#0F172A' }}>
                Welcome back, {displayName}.
              </h1>
              <p className="mt-1 text-sm" style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}>
                {state.completedLessons.length > 0
                  ? `You've completed ${state.completedLessons.length} lesson${state.completedLessons.length === 1 ? '' : 's'} — keep the momentum going.`
                  : 'Ready to start your AI journey? Your personalised path is waiting.'}
              </p>
            </div>
            {state.completedLessons.length > 0 && (
              <button
                onClick={() => setShareOpen(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
                style={{ background: '#EDE9FE', color: '#7C3AED', border: '1px solid #DDD6FE', fontFamily: 'var(--font-sans)' }}
              >
                <Share2 size={14} /> Share progress
              </button>
            )}
          </div>
        </motion.div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard icon={Zap} label="Total XP" value={state.xp} color="#7C3AED" delay={0.05} />
          <StatCard icon={Flame} label="Day streak" value={state.streak} color="#F59E0B" delay={0.1} />
          <StatCard icon={CheckCircle2} label="Lessons done" value={state.completedLessons.length} color="#10B981" delay={0.15} />
          <StatCard icon={Award} label="Badges earned" value={state.earnedBadges.length} color="#EC4899" delay={0.2} />
        </div>

        {/* Main grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left: learning path + activity */}
          {!assessment ? (
            <NoAssessmentOnboarding name={displayName} />
          ) : (
            <div className="lg:col-span-2 space-y-6">
              <LearningPathCard result={assessment} />
              <RecentActivity
                completedLessons={state.completedLessons}
                completedModules={state.completedModules}
              />
            </div>
          )}

          {/* Right: level + badges */}
          <div className="space-y-6">
            <LevelCard xp={state.xp} />
            <BadgesSection earned={state.earnedBadges} />

            {/* Quick links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.55, ease: easing }}
              className="rounded-2xl p-6"
              style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
            >
              <p className="text-sm font-bold mb-4" style={{ color: '#0F172A', fontFamily: 'var(--font-sans)' }}>
                Quick actions
              </p>
              <div className="space-y-1">
                {[
                  { label: 'Browse all tracks', href: '/tracks', icon: BookOpen, color: '#22D3EE' },
                  { label: 'Retake assessment', href: '/assessment', icon: Target, color: '#7C3AED' },
                  { label: 'View your path', href: '/assessment/results', icon: TrendingUp, color: '#10B981' },
                  ...(teamHref ? [{ label: 'Team dashboard', href: teamHref, icon: Users, color: '#EC4899' }] : []),
                ].map(item => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-3 p-3 rounded-xl transition-colors hover:bg-slate-50 group"
                  >
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: `${item.color}10` }}>
                      <item.icon size={13} style={{ color: item.color }} />
                    </div>
                    <span className="text-sm font-medium flex-1" style={{ color: '#475569', fontFamily: 'var(--font-sans)' }}>
                      {item.label}
                    </span>
                    <ChevronRight size={13} className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: '#CBD5E1' }} />
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Referral card */}
            {referralCode && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.55, ease: easing }}
                className="rounded-2xl overflow-hidden"
                style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
              >
                <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #7C3AED, #EC4899)' }} />
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Share2 size={14} style={{ color: '#7C3AED' }} />
                    <p className="text-sm font-bold" style={{ color: '#0F172A', fontFamily: 'var(--font-sans)' }}>
                      Refer &amp; earn XP
                    </p>
                  </div>
                  <p className="text-xs mb-4 leading-relaxed" style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}>
                    Share your link. Earn <strong style={{ color: '#7C3AED' }}>+100 XP</strong> for every colleague who completes their first lesson.
                  </p>

                  {/* Link copy */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex-1 px-3 py-2 rounded-lg text-xs truncate"
                      style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', color: '#64748B', fontFamily: 'monospace' }}>
                      ailiteracy.com/join?ref={referralCode}
                    </div>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(`${window.location.origin}/join?ref=${referralCode}`)
                        setCopied(true)
                        setTimeout(() => setCopied(false), 2000)
                      }}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all"
                      style={{
                        background: copied ? '#ECFDF5' : '#EDE9FE',
                        color: copied ? '#059669' : '#7C3AED',
                        border: `1px solid ${copied ? '#A7F3D0' : '#DDD6FE'}`,
                        fontFamily: 'var(--font-sans)',
                      }}
                    >
                      {copied ? <><CheckIcon size={11} /> Copied!</> : <><Copy size={11} /> Copy</>}
                    </button>
                  </div>

                  {/* Stats */}
                  {referralStats && (
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { label: 'Clicks', value: referralStats.clicks },
                        { label: 'Sign-ups', value: referralStats.signups },
                        { label: 'XP earned', value: referralStats.reward_xp },
                      ].map(s => (
                        <div key={s.label} className="text-center p-2 rounded-lg" style={{ background: '#F8FAFC' }}>
                          <p className="text-sm font-black" style={{ color: '#7C3AED', fontFamily: 'var(--font-sans)' }}>{s.value}</p>
                          <p className="text-[10px]" style={{ color: '#94A3B8', fontFamily: 'var(--font-sans)' }}>{s.label}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
      <ShareCard open={shareOpen} onClose={() => setShareOpen(false)} trackColor="#7C3AED" />
      {searchOpen && <GlobalSearch open={searchOpen} onClose={() => setSearchOpen(false)} />}
    </div>
  )
}
