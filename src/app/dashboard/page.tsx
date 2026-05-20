'use client'

import { useEffect, useState, useRef, useMemo } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Zap, BookOpen, Award, Flame, TrendingUp, ChevronRight,
  ArrowRight, Target, BarChart3, CheckCircle2,
  Star, LogOut, Sparkles, Play, Users, Share2, Copy, Check as CheckIcon, Search, ExternalLink, RotateCcw,
  Bookmark, Brain, Calendar, CreditCard, Crown, Trophy, Settings,
} from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useBookmarks } from '@/hooks/useBookmarks'
import { useSubscription } from '@/hooks/useSubscription'
import { useAuth } from '@/context/AuthContext'
import { useGame } from '@/context/GameContext'
import { ShareCard } from '@/components/ShareCard'
import GlobalSearch from '@/components/GlobalSearch'
import OnboardingChecklist from '@/components/OnboardingChecklist'
import PushNotificationPrompt from '@/components/PushNotificationPrompt'
import { loadLatestAssessment } from '@/lib/supabase/db'
import { getAdminTeam, getMemberTeam, getTeamMembersWithProgress, type TeamMember } from '@/lib/supabase/teams'
import {
  getLevelForXP, getProgressToNextLevel, BADGES, LEVELS,
} from '@/lib/gamification'
import type { AssessmentResult } from '@/lib/assessment/types'
import { getTrack, getAllTracks } from '@/lib/curriculum'
import type { TrackId } from '@/lib/curriculum/types'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'

// ─── Helpers ──────────────────────────────────────────────────────────────────

const easing = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number]

const TRACK_COLORS: Record<string, string> = {
  marketing:  '#E04D2A',
  finance:    '#F59E0B',
  hr:         '#10B981',
  sales:      '#3B82F6',
  operations: '#22D3EE',
  leadership: '#F97316',
  legal:      '#0284C7',
  product:    '#14B8A6',
  customer:   '#DC2626',
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
      style={{ background: `${color}08`, border: `1px solid ${color}22`, boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
    >
      <div className="mb-3">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${color}18` }}>
          <Icon size={15} style={{ color }} />
        </div>
      </div>
      <p className="text-3xl font-black mb-1" style={{ color: '#0F172A', fontFamily: 'var(--font-sans)' }}>
        {typeof value === 'number' ? <AnimatedNumber value={value} /> : value}
      </p>
      <p className="text-xs font-semibold" style={{ color, fontFamily: 'var(--font-sans)' }}>
        {label}
      </p>
    </motion.div>
  )
}

// ─── Streak card ──────────────────────────────────────────────────────────────

function StreakCard({
  streak, longestStreak, lastActiveDate, activityDates,
}: {
  streak: number
  longestStreak: number
  lastActiveDate: string | null
  activityDates: string[]
}) {
  const t = useTranslations('dashboard')
  const today = new Date().toISOString().split('T')[0]
  const studiedToday = lastActiveDate === today
  const atRisk = streak > 0 && !studiedToday

  // Build last-7-days array (oldest → newest)
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(Date.now() - (6 - i) * 86400000)
    const iso = d.toISOString().split('T')[0]
    const isToday = iso === today
    const active = activityDates.includes(iso)
    return { iso, label: d.toLocaleDateString('en', { weekday: 'narrow' }), active, isToday }
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.22, duration: 0.55, ease: easing }}
      className="rounded-2xl overflow-hidden"
      style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
    >
      {/* Header */}
      <div className="px-5 pt-5 pb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <motion.span
              animate={streak > 0 ? { scale: [1, 1.15, 1] } : {}}
              transition={{ duration: 0.6, repeat: streak > 0 ? Infinity : 0, repeatDelay: 2 }}
              style={{ display: 'inline-block', fontSize: '1.25rem', lineHeight: 1 }}
            >
              🔥
            </motion.span>
            <div>
              <p className="text-2xl font-black leading-none" style={{ color: '#0F172A', fontFamily: 'var(--font-sans)' }}>
                {streak}
                <span className="text-sm font-semibold ml-1" style={{ color: '#94A3B8' }}>{t('days')}</span>
              </p>
            </div>
          </div>
          {longestStreak > 0 && (
            <div className="text-right">
              <p className="text-xs" style={{ color: '#94A3B8', fontFamily: 'var(--font-sans)' }}>{t('best')}</p>
              <p className="text-sm font-bold" style={{ color: '#F59E0B', fontFamily: 'var(--font-sans)' }}>
                {longestStreak}d
              </p>
            </div>
          )}
        </div>

        {/* 7-day calendar */}
        <div className="flex gap-1.5 mb-3">
          {days.map(d => (
            <div key={d.iso} className="flex-1 flex flex-col items-center gap-1">
              <span style={{ fontSize: '0.625rem', color: '#CBD5E1', fontFamily: 'var(--font-sans)', fontWeight: 500 }}>
                {d.label}
              </span>
              <div
                style={{
                  width: '100%',
                  aspectRatio: '1',
                  borderRadius: '6px',
                  background: d.active ? '#F59E0B' : d.isToday ? '#FEF3C7' : '#F1F5F9',
                  border: d.isToday ? '1.5px solid #FCD34D' : 'none',
                  transition: 'background 0.2s',
                }}
              />
            </div>
          ))}
        </div>

        {/* Status message */}
        {streak === 0 ? (
          <p className="text-xs" style={{ color: '#94A3B8', fontFamily: 'var(--font-sans)' }}>
            {t('completeLesson')}
          </p>
        ) : studiedToday ? (
          <div className="flex items-center gap-1.5">
            <CheckCircle2 size={12} style={{ color: '#10B981', flexShrink: 0 }} />
            <p className="text-xs font-medium" style={{ color: '#10B981', fontFamily: 'var(--font-sans)' }}>
              {t('studiedToday')}
            </p>
          </div>
        ) : (
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-lg"
            style={{ background: '#FEF3C7', border: '1px solid #FDE68A' }}
          >
            <Flame size={12} style={{ color: '#F59E0B', flexShrink: 0 }} />
            <p className="text-xs font-medium" style={{ color: '#92400E', fontFamily: 'var(--font-sans)' }}>
              {t('protectStreak', { streak })}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  )
}

// ─── Bookmarks card ───────────────────────────────────────────────────────────

function BookmarksCard() {
  const { bookmarks } = useBookmarks()
  const t = useTranslations('dashboard')
  if (bookmarks.length === 0) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.28, duration: 0.55, ease: easing }}
      className="rounded-2xl p-5"
      style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Bookmark size={15} style={{ color: '#0284C7' }} />
          <p className="text-sm font-bold" style={{ color: '#0F172A', fontFamily: 'var(--font-sans)' }}>
            {t('bookmarks')}
          </p>
        </div>
        <span className="text-xs font-semibold px-2 py-0.5 rounded-lg"
          style={{ background: '#EFF6FF', color: '#1D4ED8', fontFamily: 'var(--font-sans)' }}>
          {bookmarks.length}
        </span>
      </div>
      <div className="space-y-1">
        {bookmarks.slice(0, 4).map(b => (
          <Link
            key={b.lessonId}
            href={`/tracks/${b.trackId}/lessons/${b.lessonId}`}
            className="flex items-center gap-3 p-2.5 rounded-xl transition-colors hover:bg-slate-50 group"
          >
            <div className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ background: TRACK_COLORS[b.trackId] ?? '#94A3B8' }} />
            <span className="text-sm flex-1 truncate" style={{ color: '#475569', fontFamily: 'var(--font-sans)' }}>
              {b.title}
            </span>
            <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
              style={{ color: '#CBD5E1' }} />
          </Link>
        ))}
        {bookmarks.length > 4 && (
          <p className="text-xs text-center pt-1" style={{ color: '#CBD5E1', fontFamily: 'var(--font-sans)' }}>
            +{bookmarks.length - 4} more
          </p>
        )}
      </div>
    </motion.div>
  )
}

// ─── Continue card ────────────────────────────────────────────────────────────

function ContinueCard({ completedLessons, assessment }: { completedLessons: string[]; assessment: AssessmentResult | null }) {
  const t = useTranslations('dashboard')
  const target = useMemo(() => {
    const allTracks = getAllTracks()
    for (const track of allTracks) {
      const started = completedLessons.some(l => l.startsWith(track.id + '-'))
      if (!started) continue
      for (const mod of track.modules) {
        for (const lesson of mod.lessons) {
          if (!completedLessons.includes(lesson.id)) {
            return { trackId: track.id, lessonId: lesson.id, lessonTitle: lesson.title, trackTitle: track.title, trackColor: track.color, moduleTitle: mod.title, isResume: true }
          }
        }
      }
    }
    if (assessment?.primaryTrackId) {
      const track = getTrack(assessment.primaryTrackId as TrackId)
      const firstLesson = track?.modules[0]?.lessons[0]
      if (track && firstLesson) {
        return { trackId: track.id, lessonId: firstLesson.id, lessonTitle: firstLesson.title, trackTitle: track.title, trackColor: track.color, moduleTitle: track.modules[0].title, isResume: false }
      }
    }
    return null
  }, [completedLessons, assessment])

  if (!target) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.06, duration: 0.5, ease: easing }}
      className="rounded-2xl overflow-hidden"
      style={{ background: '#FFFFFF', border: `1px solid ${target.trackColor}30`, boxShadow: `0 4px 20px ${target.trackColor}12` }}
    >
      <div style={{ height: 3, background: target.trackColor }} />
      <div className="px-6 py-5 flex items-center gap-5 flex-wrap">
        <div className="w-12 h-12 rounded-2xl flex-shrink-0 flex items-center justify-center text-2xl"
          style={{ background: `${target.trackColor}12`, border: `1px solid ${target.trackColor}20` }}>
          {TRACK_ICONS[target.trackId] ?? '🎓'}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold uppercase tracking-widest mb-0.5"
            style={{ color: target.trackColor, fontFamily: 'var(--font-sans)', letterSpacing: '0.06em' }}>
            {target.isResume ? t('resumeLesson') : t('startLesson')} · {target.trackTitle} · {target.moduleTitle}
          </p>
          <p className="text-lg font-black truncate" style={{ color: '#0F172A', fontFamily: 'var(--font-sans)', letterSpacing: '-0.01em' }}>
            {target.lessonTitle}
          </p>
        </div>
        <Link
          href={`/tracks/${target.trackId}/lessons/${target.lessonId}`}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white flex-shrink-0 transition-opacity hover:opacity-90"
          style={{ background: target.trackColor, boxShadow: `0 4px 14px ${target.trackColor}35`, fontFamily: 'var(--font-sans)', textDecoration: 'none' }}
        >
          <Play size={13} fill="#FFFFFF" />
          {target.isResume ? t('continueLearning') : t('startLesson')}
        </Link>
      </div>
    </motion.div>
  )
}

// ─── Insights card ────────────────────────────────────────────────────────────

function InsightsCard({
  activityDates,
  totalQuizzesPerfect,
  completedLessons,
}: {
  activityDates: string[]
  totalQuizzesPerfect: number
  completedLessons: string[]
}) {
  const today = new Date()
  const monthStart = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0]
  const daysThisMonth = activityDates.filter(d => d >= monthStart).length

  const daysInMonth = today.getDate()
  const studyRate = daysInMonth > 0 ? Math.round((daysThisMonth / daysInMonth) * 100) : 0

  const quizAccuracy = completedLessons.length > 0
    ? Math.round((totalQuizzesPerfect / completedLessons.length) * 100)
    : 0

  // Load weak SR items from localStorage
  const [weakCount, setWeakCount] = useState(0)
  const t = useTranslations('dashboard')
  useEffect(() => {
    import('@/lib/srs').then(({ loadQueue }) => {
      const queue = loadQueue()
      setWeakCount(queue.filter(item => item.easeFactor < 2.0).length)
    })
  }, [])

  if (completedLessons.length === 0) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.55, ease: easing }}
      className="rounded-2xl p-5"
      style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
    >
      <div className="flex items-center gap-2 mb-4">
        <Brain size={15} style={{ color: '#10B981' }} />
        <p className="text-sm font-bold" style={{ color: '#0F172A', fontFamily: 'var(--font-sans)' }}>
          {t('insights')}
        </p>
      </div>
      <div className="space-y-3">
        {/* Study consistency */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5">
              <Calendar size={11} style={{ color: '#94A3B8' }} />
              <span className="text-xs" style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}>
                {t('studyDaysMonth')}
              </span>
            </div>
            <span className="text-xs font-bold" style={{ color: '#10B981', fontFamily: 'var(--font-sans)' }}>
              {daysThisMonth}d / {daysInMonth}d
            </span>
          </div>
          <div className="h-1.5 rounded-full" style={{ background: '#E2E8F0' }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${studyRate}%` }}
              transition={{ delay: 0.5, duration: 0.9, ease: easing }}
              className="h-full rounded-full"
              style={{ background: '#10B981' }}
            />
          </div>
        </div>

        {/* Quiz accuracy */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={11} style={{ color: '#94A3B8' }} />
              <span className="text-xs" style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}>
                {t('perfectQuizRate')}
              </span>
            </div>
            <span className="text-xs font-bold" style={{ color: '#0284C7', fontFamily: 'var(--font-sans)' }}>
              {quizAccuracy}%
            </span>
          </div>
          <div className="h-1.5 rounded-full" style={{ background: '#E2E8F0' }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${quizAccuracy}%` }}
              transition={{ delay: 0.6, duration: 0.9, ease: easing }}
              className="h-full rounded-full"
              style={{ background: '#0284C7' }}
            />
          </div>
        </div>

        {/* Weak cards */}
        {weakCount > 0 && (
          <div className="flex items-center justify-between px-3 py-2 rounded-xl"
            style={{ background: '#FFF7ED', border: '1px solid #FED7AA' }}>
            <span className="text-xs" style={{ color: '#92400E', fontFamily: 'var(--font-sans)' }}>
              {t('needPractice', { count: weakCount, plural: weakCount !== 1 ? 's' : '' })}
            </span>
            <Link
              href="/review"
              className="text-xs font-semibold"
              style={{ color: '#EA580C', fontFamily: 'var(--font-sans)', textDecoration: 'none' }}
            >
              {t('reviewLink')}
            </Link>
          </div>
        )}
      </div>
    </motion.div>
  )
}

// ─── Daily challenge card ─────────────────────────────────────────────────────

function DailyChallengeCard() {
  const [done, setDone] = useState(false)
  const [streak, setStreak] = useState(0)
  const t = useTranslations('dashboard')

  useEffect(() => {
    import('@/lib/challenge').then(({ loadChallengeLog, getChallengeStreak, getDailyChallenge }) => {
      const log = loadChallengeLog()
      const today = getDailyChallenge().date
      setDone(!!log[today])
      setStreak(getChallengeStreak())
    })
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.32, duration: 0.55, ease: easing }}
      className="rounded-2xl p-5"
      style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Trophy size={14} style={{ color: '#F59E0B' }} />
          <p className="text-sm font-bold" style={{ color: '#0F172A', fontFamily: 'var(--font-sans)' }}>{t('dailyChallenge')}</p>
        </div>
        {streak > 0 && (
          <div className="flex items-center gap-1">
            <Flame size={12} style={{ color: '#F97316' }} />
            <span className="text-xs font-bold" style={{ color: '#F97316', fontFamily: 'var(--font-sans)' }}>{streak}</span>
          </div>
        )}
      </div>

      {done ? (
        <div className="flex items-center gap-2 mb-3">
          <CheckCircle2 size={14} style={{ color: '#10B981' }} />
          <p className="text-xs" style={{ color: '#10B981', fontFamily: 'var(--font-sans)', fontWeight: 600 }}>{t('completedToday')}</p>
        </div>
      ) : (
        <p className="text-xs mb-3" style={{ color: '#64748B', fontFamily: 'var(--font-sans)', lineHeight: 1.5 }}>
          {t('oneQuestion')}
        </p>
      )}

      <Link
        href="/challenge"
        className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
        style={{ background: done ? '#EFF6FF' : 'linear-gradient(135deg, #2563EB, #22D3EE)', color: done ? '#64748B' : '#FFFFFF', textDecoration: 'none', border: done ? '1px solid #E2E8F0' : 'none', fontFamily: 'var(--font-sans)' }}
      >
        {done ? t('viewResult') : t('takeChallenge')} <ArrowRight size={13} />
      </Link>
    </motion.div>
  )
}

// ─── Learning path card ───────────────────────────────────────────────────────

function LearningPathCard({ result }: { result: AssessmentResult }) {
  const t = useTranslations('dashboard')
  const track = getTrack(result.primaryTrackId)
  const color = TRACK_COLORS[result.primaryTrackId] ?? '#2563EB'
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
      <div className="px-6 py-5 flex items-center justify-between" style={{ borderBottom: '1px solid #F1F5F9', background: '#EFF6FF' }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
            style={{ background: `${color}10`, border: `1px solid ${color}20` }}>
            {icon}
          </div>
          <div>
            <p className="text-xs font-medium mb-0.5" style={{ color: '#94A3B8', fontFamily: 'var(--font-sans)' }}>
              {t('yourPersonalisedTrack')}
            </p>
            <p className="text-sm font-bold" style={{ color: '#0F172A', fontFamily: 'var(--font-sans)' }}>
              {track?.title ?? result.primaryTrackId} Track
            </p>
          </div>
        </div>
        <span className="px-2.5 py-1 rounded-lg text-xs font-semibold"
          style={{ background: `${color}10`, color, fontFamily: 'var(--font-sans)' }}>
          {t('aiCurated')}
        </span>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 px-6 py-4" style={{ borderBottom: '1px solid #F1F5F9' }}>
        {[
          { label: t('essential'), value: result.essentialCount, color: '#2563EB' },
          { label: t('totalLessons'), value: result.totalLessons, color },
          { label: t('estWeeks'), value: result.estimatedWeeks, color: '#22D3EE' },
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
          {t('essentialLessons')}
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
            <Play size={14} /> {t('continueLearning')}
          </Link>
        </div>
      )}
    </motion.div>
  )
}

// ─── No assessment onboarding ─────────────────────────────────────────────────

function NoAssessmentOnboarding({ name }: { name: string }) {
  const t = useTranslations('dashboard')
  const steps = [
    { n: '01', title: t('noPathStep1Title'), desc: t('noPathStep1Desc') },
    { n: '02', title: t('noPathStep2Title'), desc: t('noPathStep2Desc') },
    { n: '03', title: t('noPathStep3Title'), desc: t('noPathStep3Desc') },
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
          style={{ background: 'linear-gradient(135deg, #2563EB08, #22D3EE04)', borderBottom: '1px solid #F1F5F9' }}>
          <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full blur-3xl"
            style={{ background: 'rgba(37,99,235,0.06)' }} />
          <div className="relative">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #2563EB, #22D3EE)' }}>
                <Sparkles size={14} className="text-white" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#2563EB', fontFamily: 'var(--font-sans)' }}>
                {t('step1of1')}
              </span>
            </div>
            <h2 className="text-2xl font-black mb-2" style={{ fontFamily: 'var(--font-sans)', color: '#0F172A' }}>
              {name ? t('noPathTitle', { name }) : t('noPathTitleAnon')}
            </h2>
            <p className="text-base" style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}>
              {t('noPathDesc')}
            </p>
          </div>
        </div>

        {/* Steps */}
        <div className="px-8 py-6" style={{ borderBottom: '1px solid #F1F5F9' }}>
          <div className="space-y-5">
            {steps.map(step => (
              <div key={step.n} className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center text-xs font-black"
                  style={{ background: '#DBEAFE', color: '#2563EB', fontFamily: 'var(--font-sans)' }}>
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
              background: 'linear-gradient(135deg, #2563EB, #22D3EE)',
              boxShadow: '0 4px 14px rgba(37,99,235,0.25)',
              fontFamily: 'var(--font-sans)',
            }}
          >
            <Zap size={16} /> {t('buildPersonalizedPath')}
          </Link>
          <p className="text-center text-xs mt-3" style={{ color: '#CBD5E1', fontFamily: 'var(--font-sans)' }}>
            {t('freeForever')}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Badges section ───────────────────────────────────────────────────────────

function BadgesSection({ earned }: { earned: string[] }) {
  const t = useTranslations('dashboard')
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
            {t('badges')}
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
                background: isEarned ? '#FEF3C7' : '#EFF6FF',
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
  const t = useTranslations('dashboard')
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
            {t('currentLevel')}
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
            <span style={{ color: '#94A3B8' }}>{t('progressTo', { level: nextLevel.title })}</span>
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
            {t('xpToNext', { xp: nextLevel.minXP - xp })}
          </p>
        </>
      )}

      {!nextLevel && (
        <div className="flex items-center gap-1.5 text-xs" style={{ color: '#F59E0B', fontFamily: 'var(--font-sans)' }}>
          <Star size={12} fill="#F59E0B" /> {t('maxLevel')}
        </div>
      )}
    </motion.div>
  )
}

// ─── Recent tracks section ────────────────────────────────────────────────────

function RecentActivity({ completedLessons, completedModules }: { completedLessons: string[]; completedModules: string[] }) {
  const t = useTranslations('dashboard')
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
          {t('trackProgress')}
        </p>
      </div>
      <div className="space-y-4">
        {trackProgress.map(t => {
          const color = TRACK_COLORS[t.id] ?? '#2563EB'
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
  const t = useTranslations('dashboard')
  const tNav = useTranslations('nav')
  const router = useRouter()
  const { user, loading, signOut } = useAuth()
  const { state, syncing } = useGame()
  const { isPro, isTrialing, subscription } = useSubscription()
  const [assessment, setAssessment] = useState<AssessmentResult | null>(null)
  const [assessmentChecked, setAssessmentChecked] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [srDueCount, setSrDueCount] = useState(0)
  const [teamHref, setTeamHref] = useState<string | null>(null)
  const [memberTeamName, setMemberTeamName] = useState<string | null>(null)
  const [assignedTracks, setAssignedTracks] = useState<string[]>([])
  const [teamLeaderboard, setTeamLeaderboard] = useState<TeamMember[]>([])
  const [myTeamRank, setMyTeamRank] = useState<number | null>(null)
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

  useEffect(() => {
    setMounted(true)
    import('@/lib/srs').then(({ getDueCount }) => setSrDueCount(getDueCount()))
  }, [])

  useEffect(() => {
    if (!user) return
    Promise.all([getAdminTeam(user.id), getMemberTeam(user.id)]).then(([admin, member]) => {
      if (admin) {
        setTeamHref('/dashboard/team')
      } else if (member) {
        setTeamHref('/dashboard/team')
        if (member.member.role !== 'admin') {
          setMemberTeamName(member.team.name)
          setAssignedTracks(member.member.assigned_tracks ?? [])
          getTeamMembersWithProgress(member.team.id).then(members => {
            const active = members.filter(m => m.status === 'active').sort((a, b) => (b.xp ?? 0) - (a.xp ?? 0))
            setTeamLeaderboard(active.slice(0, 5))
            const rank = active.findIndex(m => m.user_id === user.id)
            setMyTeamRank(rank >= 0 ? rank + 1 : null)
          }).catch(() => {})
        }
      } else {
        setTeamHref('/dashboard/team/create')
      }
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
          localStorage.setItem('opuslearn-assessment', JSON.stringify(remote))
          setAssessmentChecked(true)
          return
        }
      }
      try {
        const raw = localStorage.getItem('opuslearn-assessment')
        if (raw) setAssessment(JSON.parse(raw))
      } catch {}
      setAssessmentChecked(true)
    }

    load()
  }, [user, mounted])

  useEffect(() => {
    if (!loading && !user) router.replace('/?next=/dashboard')
  }, [loading, user, router])

  useEffect(() => {
    if (assessmentChecked && !assessment) router.replace('/assessment')
  }, [assessmentChecked, assessment, router])

  if (!mounted || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#EFF6FF' }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-8 h-8 rounded-full border-2 border-t-transparent"
          style={{ borderColor: '#2563EB', borderTopColor: 'transparent' }}
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
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #DBEAFE 0px, #EFF6FF 200px)' }}>
      {/* Navbar */}
      <nav className="sticky top-0 z-40 px-6 py-4"
        style={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(16px)', borderBottom: '1px solid #E2E8F0' }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #2563EB, #22D3EE)' }}>
              <Zap size={13} className="text-white" />
            </div>
            <span className="font-bold text-sm" style={{ fontFamily: 'var(--font-sans)', color: '#0F172A' }}>
              OpusLearn
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setSearchOpen(true)}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors hover:bg-slate-100"
              style={{ color: '#64748B', fontFamily: 'var(--font-sans)', border: '1px solid #E2E8F0', background: '#EFF6FF' }}
            >
              <Search size={13} />
              <span>{tNav('search')}</span>
              <kbd style={{ fontSize: '10px', color: '#94A3B8', background: '#E2E8F0', borderRadius: '3px', padding: '1px 5px' }}>⌘K</kbd>
            </button>
            <Link href="/tracks" className="flex items-center gap-1.5 text-sm transition-colors hover:text-slate-700"
              style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}>
              <BookOpen size={14} /> {tNav('allTracks')}
            </Link>
            {teamHref && (
              <Link href={teamHref} className="flex items-center gap-1.5 text-sm font-semibold transition-colors hover:opacity-80 px-3 py-1.5 rounded-lg"
                style={{ color: '#2563EB', background: '#DBEAFE', fontFamily: 'var(--font-sans)' }}>
                <Users size={13} /> Team
              </Link>
            )}
            <div className="flex items-center gap-2.5">
              <LanguageSwitcher compact />
              <Link href="/dashboard/settings"
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-slate-100"
                style={{ color: '#94A3B8' }}
                title="Settings"
              >
                <Settings size={15} />
              </Link>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white"
                style={{ background: 'linear-gradient(135deg, #2563EB, #22D3EE)', fontFamily: 'var(--font-sans)' }}>
                {initials}
              </div>
              <button
                onClick={signOut}
                className="flex items-center gap-1.5 text-sm transition-colors hover:text-red-500"
                style={{ color: '#94A3B8', fontFamily: 'var(--font-sans)' }}
              >
                <LogOut size={13} /> {tNav('signOut')}
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
              <Sparkles size={14} style={{ color: '#2563EB' }} />
              <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#94A3B8', fontFamily: 'var(--font-sans)' }}>
                {t('yourDashboard')}
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
                    style={{ borderColor: '#2563EB', borderTopColor: 'transparent' }}
                  />
                  {t('syncing')}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-3xl lg:text-4xl font-black" style={{ fontFamily: 'var(--font-sans)', color: '#0F172A' }}>
                {t('welcomeBack', { name: displayName })}
              </h1>
              <p className="mt-1 text-sm" style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}>
                {state.completedLessons.length > 0
                  ? t('lessonsCompletedMsg', { count: state.completedLessons.length, plural: state.completedLessons.length === 1 ? '' : 's' })
                  : t('readyToStart')}
              </p>
            </div>
            {state.completedLessons.length > 0 && (
              <button
                onClick={() => setShareOpen(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
                style={{ background: '#DBEAFE', color: '#2563EB', border: '1px solid #BFDBFE', fontFamily: 'var(--font-sans)' }}
              >
                <Share2 size={14} /> {t('shareProgress')}
              </button>
            )}
          </div>
        </motion.div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard icon={Zap} label={t('totalXP')} value={state.xp} color="#2563EB" delay={0.05} />
          <StatCard icon={Flame} label={t('dayStreak')} value={state.streak} color="#F59E0B" delay={0.1} />
          <StatCard icon={CheckCircle2} label={t('lessonsDone')} value={state.completedLessons.length} color="#10B981" delay={0.15} />
          <StatCard icon={Award} label={t('badgesEarned')} value={state.earnedBadges.length} color="#E04D2A" delay={0.2} />
        </div>

        {/* Continue card */}
        <div className="mb-6">
          <ContinueCard completedLessons={state.completedLessons} assessment={assessment} />
        </div>

        {/* Review due banner */}
        {srDueCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.4 }}
            className="mb-6 rounded-2xl px-5 py-4 flex items-center justify-between gap-4 flex-wrap"
            style={{ background: '#EFF6FF', border: '1px solid #BFDBFE' }}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: '#0284C7' }}>
                <RotateCcw size={14} color="#FFFFFF" />
              </div>
              <div>
                <p className="text-sm font-bold" style={{ color: '#1E40AF', fontFamily: 'var(--font-sans)' }}>
                  {t('cardsReady', { count: srDueCount, plural: srDueCount !== 1 ? 's' : '' })}
                </p>
                <p className="text-xs" style={{ color: '#0284C7', fontFamily: 'var(--font-sans)' }}>
                  {t('reinforceDesc', { min: Math.ceil(srDueCount * 0.5) })}
                </p>
              </div>
            </div>
            <Link
              href="/review"
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:opacity-90 flex-shrink-0"
              style={{ background: '#0284C7', color: '#FFFFFF', textDecoration: 'none', fontFamily: 'var(--font-sans)' }}
            >
              {t('startReview')} <ArrowRight size={14} />
            </Link>
          </motion.div>
        )}

        <OnboardingChecklist />

        {/* Team member section — assigned tracks + mini leaderboard */}
        {memberTeamName && (assignedTracks.length > 0 || teamLeaderboard.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5, ease: easing }}
            className="mb-6 rounded-2xl overflow-hidden"
            style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
            <div className="px-5 py-3.5 flex items-center justify-between"
              style={{ background: '#EFF6FF', borderBottom: '1px solid #F1F5F9' }}>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-md flex items-center justify-center"
                  style={{ background: '#DBEAFE' }}>
                  <Users size={11} style={{ color: '#2563EB' }} />
                </div>
                <span className="text-sm font-bold" style={{ color: '#0F172A', fontFamily: 'var(--font-sans)' }}>
                  {memberTeamName}
                </span>
                {myTeamRank && (
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
                    style={{ background: '#DBEAFE', color: '#2563EB', fontFamily: 'var(--font-sans)' }}>
                    {t('onLeaderboard', { rank: myTeamRank })}
                  </span>
                )}
              </div>
              {teamHref && (
                <Link href={teamHref}
                  className="text-xs font-semibold flex items-center gap-1 hover:underline"
                  style={{ color: '#2563EB', fontFamily: 'var(--font-sans)' }}>
                  {t('viewTeam')} <ChevronRight size={11} />
                </Link>
              )}
            </div>
            <div className="px-5 py-4">
              <div className="grid sm:grid-cols-2 gap-5">
                {/* Assigned tracks */}
                {assignedTracks.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest mb-3"
                      style={{ color: '#94A3B8', fontFamily: 'var(--font-sans)' }}>
                      {t('yourAssignedTracks')}
                    </p>
                    <div className="space-y-2">
                      {assignedTracks.map(trackId => {
                        const color = TRACK_COLORS[trackId] ?? '#2563EB'
                        const icon = TRACK_ICONS[trackId] ?? '🎓'
                        const trackData = getAllTracks().find(t => t.id === trackId)
                        const total = trackData?.modules.reduce((s, m) => s + m.lessons.length, 0) ?? 1
                        const done = state.completedLessons.filter(l => l.startsWith(trackId)).length
                        const pct = Math.round((done / total) * 100)
                        return (
                          <Link key={trackId} href={`/tracks/${trackId}`} className="block group">
                            <div className="flex items-center justify-between mb-1">
                              <div className="flex items-center gap-2">
                                <span className="text-sm">{icon}</span>
                                <span className="text-sm font-medium" style={{ color: '#334155', fontFamily: 'var(--font-sans)' }}>
                                  {trackData?.title ?? trackId}
                                </span>
                              </div>
                              <span className="text-xs font-semibold" style={{ color, fontFamily: 'var(--font-sans)' }}>
                                {done}/{total}
                              </span>
                            </div>
                            <div className="h-1.5 rounded-full" style={{ background: '#E2E8F0' }}>
                              <div className="h-full rounded-full transition-all"
                                style={{ width: `${pct}%`, background: color }} />
                            </div>
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                )}
                {/* Mini leaderboard */}
                {teamLeaderboard.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest mb-3"
                      style={{ color: '#94A3B8', fontFamily: 'var(--font-sans)' }}>
                      {t('teamLeaderboard')}
                    </p>
                    <div className="space-y-2">
                      {teamLeaderboard.slice(0, 5).map((m, i) => {
                        const isMe = m.user_id === user.id
                        const initials = (m.display_name ?? m.email).slice(0, 2).toUpperCase()
                        return (
                          <div key={m.id}
                            className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-xl"
                            style={{
                              background: isMe ? '#DBEAFE' : 'transparent',
                              border: isMe ? '1px solid #BFDBFE' : '1px solid transparent',
                            }}>
                            <span className="text-xs font-bold w-4 text-center"
                              style={{ color: i < 3 ? ['#F59E0B', '#94A3B8', '#CD7F32'][i] : '#CBD5E1', fontFamily: 'var(--font-sans)' }}>
                              {i + 1}
                            </span>
                            <div className="w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0"
                              style={{ background: ['#2563EB','#E04D2A','#F59E0B','#10B981','#3B82F6','#22D3EE','#F97316','#0284C7','#DC2626','#0EA5E9'][m.email.charCodeAt(0) % 10] }}>
                              {initials}
                            </div>
                            <span className="text-xs flex-1 truncate font-medium"
                              style={{ color: isMe ? '#1E3A8A' : '#475569', fontFamily: 'var(--font-sans)' }}>
                              {isMe ? t('you') : (m.display_name ?? m.email.split('@')[0])}
                            </span>
                            <span className="text-xs font-bold flex-shrink-0"
                              style={{ color: '#2563EB', fontFamily: 'var(--font-sans)' }}>
                              {(m.xp ?? 0).toLocaleString()} XP
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

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

          {/* Right: daily challenge + level + streak + badges */}
          <div className="space-y-6">
            <DailyChallengeCard />
            <LevelCard xp={state.xp} />
            <StreakCard
              streak={state.streak}
              longestStreak={state.longestStreak ?? 0}
              lastActiveDate={state.lastActiveDate}
              activityDates={state.activityDates ?? []}
            />
            <BadgesSection earned={state.earnedBadges} />
            <BookmarksCard />
            <InsightsCard
              activityDates={state.activityDates ?? []}
              totalQuizzesPerfect={state.totalQuizzesPerfect}
              completedLessons={state.completedLessons}
            />

            {/* Certificates */}
            {state.completedTracks.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.38, duration: 0.55, ease: easing }}
                className="rounded-2xl p-5"
                style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Award size={14} style={{ color: '#F59E0B' }} />
                  <p className="text-sm font-bold" style={{ color: '#0F172A', fontFamily: 'var(--font-sans)' }}>
                    {t('yourCertificates')}
                  </p>
                  <span className="ml-auto text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: '#FEF3C7', color: '#92400E' }}>
                    {state.completedTracks.length}
                  </span>
                </div>
                <div className="space-y-2">
                  {state.completedTracks.map(trackId => {
                    const t = getAllTracks().find(t => t.id === trackId)
                    if (!t) return null
                    return (
                      <Link
                        key={trackId}
                        href={`/certificates/${trackId}`}
                        className="flex items-center gap-3 p-2.5 rounded-xl transition-colors hover:bg-slate-50 group"
                      >
                        <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: t.color }} />
                        <span className="text-sm font-medium flex-1 truncate" style={{ color: '#475569', fontFamily: 'var(--font-sans)' }}>
                          {t.title}
                        </span>
                        <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: '#CBD5E1' }} />
                      </Link>
                    )
                  })}
                </div>
              </motion.div>
            )}

            {/* Pro status / upgrade card */}
            {isPro ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.55, ease: easing }}
                className="rounded-2xl overflow-hidden"
                style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
              >
                <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #2563EB, #22D3EE)' }} />
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-1">
                    <Crown size={14} style={{ color: '#2563EB' }} />
                    <p className="text-sm font-bold" style={{ color: '#0F172A', fontFamily: 'var(--font-sans)' }}>
                      {isTrialing ? t('proTrial') : t('proMember')}
                    </p>
                    <span className="ml-auto px-2 py-0.5 rounded-full text-xs font-bold"
                      style={{ background: isTrialing ? '#FEF3C7' : '#DBEAFE', color: isTrialing ? '#D97706' : '#2563EB' }}>
                      {isTrialing ? 'Trial' : 'Active'}
                    </span>
                  </div>
                  {subscription?.currentPeriodEnd && (
                    <p className="text-xs mb-3" style={{ color: '#94A3B8', fontFamily: 'var(--font-sans)' }}>
                      {isTrialing ? t('trialEnds') : t('renews')} {new Date(subscription.currentPeriodEnd).toLocaleDateString('en', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                  )}
                  <button
                    onClick={async () => {
                      const res = await fetch('/api/billing/portal', { method: 'POST' })
                      const { url } = await res.json()
                      if (url) window.location.href = url
                    }}
                    className="flex items-center gap-2 text-xs font-semibold transition-colors hover:opacity-80"
                    style={{ color: '#2563EB', fontFamily: 'var(--font-sans)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                  >
                    <CreditCard size={12} /> {t('manageSub')}
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.55, ease: easing }}
                className="rounded-2xl overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #2563EB08, #22D3EE06)', border: '1px solid #BFDBFE', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
              >
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Crown size={14} style={{ color: '#2563EB' }} />
                    <p className="text-sm font-bold" style={{ color: '#0F172A', fontFamily: 'var(--font-sans)' }}>
                      {t('upgradeToPro')}
                    </p>
                  </div>
                  <p className="text-xs mb-4 leading-relaxed" style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}>
                    {t('upgradeDesc')} <strong style={{ color: '#2563EB' }}>{t('upgradeDays')}</strong>
                  </p>
                  <button
                    onClick={async () => {
                      const res = await fetch('/api/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ plan: 'monthly' }) })
                      const { url } = await res.json()
                      if (url) window.location.href = url
                    }}
                    className="w-full py-2.5 rounded-xl text-xs font-bold text-white transition-all hover:opacity-90"
                    style={{ background: 'linear-gradient(135deg, #2563EB, #22D3EE)', fontFamily: 'var(--font-sans)', border: 'none', cursor: 'pointer', boxShadow: '0 4px 14px rgba(37,99,235,0.25)' }}
                  >
                    {t('startFreeTrial')}
                  </button>
                </div>
              </motion.div>
            )}

            {/* Quick links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.55, ease: easing }}
              className="rounded-2xl p-6"
              style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
            >
              <p className="text-sm font-bold mb-4" style={{ color: '#0F172A', fontFamily: 'var(--font-sans)' }}>
                {t('quickActions')}
              </p>
              <div className="space-y-1">
                {[
                  { label: t('browseAllTracks'), href: '/tracks', icon: BookOpen, color: '#22D3EE' },
                  { label: t('retakeAssessment'), href: '/assessment', icon: Target, color: '#2563EB' },
                  { label: t('viewYourPath'), href: '/assessment/results', icon: TrendingUp, color: '#10B981' },
                  ...(teamHref ? [{ label: t('teamDashboard'), href: teamHref, icon: Users, color: '#E04D2A' }] : []),
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
                <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #2563EB, #E04D2A)' }} />
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Share2 size={14} style={{ color: '#2563EB' }} />
                    <p className="text-sm font-bold" style={{ color: '#0F172A', fontFamily: 'var(--font-sans)' }}>
                      {t('referEarnXP')}
                    </p>
                  </div>
                  <p className="text-xs mb-4 leading-relaxed" style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}>
                    {t('referDesc', { xp: '+100' })}
                  </p>

                  {/* Link copy */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex-1 px-3 py-2 rounded-lg text-xs truncate"
                      style={{ background: '#EFF6FF', border: '1px solid #E2E8F0', color: '#64748B', fontFamily: 'monospace' }}>
                      opuslearn.ai/join?ref={referralCode}
                    </div>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(`${window.location.origin}/join?ref=${referralCode}`)
                        setCopied(true)
                        setTimeout(() => setCopied(false), 2000)
                      }}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all"
                      style={{
                        background: copied ? '#ECFDF5' : '#DBEAFE',
                        color: copied ? '#059669' : '#2563EB',
                        border: `1px solid ${copied ? '#A7F3D0' : '#BFDBFE'}`,
                        fontFamily: 'var(--font-sans)',
                      }}
                    >
                      {copied ? <><CheckIcon size={11} /> {t('copied')}</> : <><Copy size={11} /> {t('copy')}</>}
                    </button>
                  </div>

                  {/* Stats */}
                  {referralStats && (
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { label: t('clicks'), value: referralStats.clicks },
                        { label: t('signups'), value: referralStats.signups },
                        { label: t('xpEarned'), value: referralStats.reward_xp },
                      ].map(s => (
                        <div key={s.label} className="text-center p-2 rounded-lg" style={{ background: '#EFF6FF' }}>
                          <p className="text-sm font-black" style={{ color: '#2563EB', fontFamily: 'var(--font-sans)' }}>{s.value}</p>
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
      <ShareCard open={shareOpen} onClose={() => setShareOpen(false)} trackColor="#2563EB" />
      {searchOpen && <GlobalSearch open={searchOpen} onClose={() => setSearchOpen(false)} />}
      <PushNotificationPrompt />
    </div>
  )
}
