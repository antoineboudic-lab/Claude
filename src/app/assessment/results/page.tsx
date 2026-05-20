'use client'

import { useEffect, useState, useMemo } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Megaphone, LineChart, HeartHandshake, TrendingUp,
  Settings, Briefcase, Zap, Check, ArrowRight,
  Clock, BookOpen, Star, ChevronRight, RefreshCw,
  Brain, Users, Target, ChevronDown, Award,
  Scale, Package, Headphones, BarChart, Loader2, Lock,
} from 'lucide-react'
import type { AssessmentResult, AssessmentAnswers, PriorityLesson } from '@/lib/assessment/types'
import type { TrackId } from '@/lib/curriculum/types'
import { useAuth } from '@/context/AuthContext'
import { loadLatestAssessment } from '@/lib/supabase/db'

// ─── Track meta ───────────────────────────────────────────────────────────────

const TRACK_META: Record<TrackId, { label: string; icon: React.ElementType; color: string; tagline: string }> = {
  marketing:   { label: 'Marketing',        icon: Megaphone,     color: '#E04D2A', tagline: 'Create, campaign, and grow with AI precision' },
  finance:     { label: 'Finance',          icon: LineChart,      color: '#F59E0B', tagline: 'Model, forecast, and report with AI precision' },
  hr:          { label: 'HR & People',      icon: HeartHandshake, color: '#10B981', tagline: 'Hire smarter, engage deeper, develop faster' },
  sales:       { label: 'Sales',            icon: TrendingUp,     color: '#3B82F6', tagline: 'Prospect, pitch, and close with AI as your edge' },
  operations:  { label: 'Operations',       icon: Settings,       color: '#22D3EE', tagline: 'Streamline processes and decisions with AI' },
  leadership:  { label: 'Leadership',       icon: Briefcase,      color: '#F97316', tagline: 'Lead your organisation into the AI era' },
  legal:       { label: 'Legal',            icon: Scale,          color: '#0284C7', tagline: 'Review, research, and advise with AI confidence' },
  product:     { label: 'Product',          icon: Package,        color: '#14B8A6', tagline: 'Discover, prioritise, and ship better products with AI' },
  customer:    { label: 'Customer Success', icon: Headphones,     color: '#DC2626', tagline: 'Retain, expand, and delight customers with AI' },
  consulting:  { label: 'Consulting',       icon: BarChart,       color: '#0EA5E9', tagline: 'Research, analyse, and deliver with AI as your edge' },
}

const PRIORITY_CONFIG = {
  essential:    { label: 'Essential',    color: '#2563EB', bg: '#DBEAFE', border: '#BFDBFE' },
  recommended:  { label: 'Recommended', color: '#0EA5E9', bg: '#E0F2FE', border: '#BAE6FD' },
  optional:     { label: 'Optional',    color: '#94A3B8', bg: '#EFF6FF', border: '#E2E8F0' },
}

const INDUSTRY_LABELS: Record<string, string> = {
  'technology':         'Technology & Software',
  'financial-services': 'Financial Services',
  'consulting':         'Consulting & Professional Services',
  'consumer-retail':    'Consumer Goods & Retail',
  'healthcare':         'Healthcare & Life Sciences',
  'manufacturing':      'Manufacturing & Industrial',
  'media':              'Media & Entertainment',
  'government':         'Government & Public Sector',
  'other-industry':     'Other industry',
}

const COMPANY_SIZE_LABELS: Record<string, string> = {
  startup:    'Startup (1–50)',
  scaleup:    'Scale-up (51–500)',
  midmarket:  'Mid-market (501–5K)',
  enterprise: 'Enterprise (5K+)',
}

const TOOL_LABELS: Record<string, string> = {
  chatgpt:       'ChatGPT',
  claude:        'Claude',
  copilot:       'Microsoft Copilot',
  gemini:        'Google Gemini',
  perplexity:    'Perplexity',
  midjourney:    'Midjourney',
  'notion-ai':   'Notion AI',
  'other-tools': 'Other AI tools',
  none:          'None yet',
}

const EXPERIENCE_LABELS: Record<string, string> = {
  none:    'No AI tools yet',
  some:    'Occasional user',
  regular: 'Regular AI user',
}

const ROI_HOURS: Record<string, Record<string, string>> = {
  marketing:  { light: '3–4', moderate: '5–8',  intensive: '8–12' },
  finance:    { light: '2–4', moderate: '4–6',  intensive: '7–10' },
  hr:         { light: '3–5', moderate: '5–8',  intensive: '8–12' },
  sales:      { light: '2–4', moderate: '4–6',  intensive: '6–10' },
  operations: { light: '4–6', moderate: '7–10', intensive: '10–15' },
  leadership: { light: '1–3', moderate: '3–5',  intensive: '5–8'  },
  legal:      { light: '3–5', moderate: '5–8',  intensive: '8–12' },
  product:    { light: '2–4', moderate: '4–7',  intensive: '7–11' },
  customer:   { light: '3–5', moderate: '5–8',  intensive: '8–12' },
  consulting: { light: '4–6', moderate: '6–10', intensive: '10–15' },
}

const PEER_ADOPTION: Record<string, number> = {
  marketing: 78, finance: 64, hr: 71,
  sales: 82, operations: 68, leadership: 59,
  legal: 52, product: 74, customer: 66, consulting: 71,
}

// ─── Readiness score ──────────────────────────────────────────────────────────

function computeReadinessScore(answers: AssessmentAnswers): number {
  let score = 0
  if (answers.experience === 'regular') score += 30
  else if (answers.experience === 'some') score += 15
  score += (answers.skillScore / 2) * 40
  const toolCount = answers.currentTools.filter(t => t !== 'none').length
  score += Math.min(toolCount * 5, 20)
  score += Math.min(answers.goals.length * 3.33, 10)
  return Math.round(Math.min(score, 100))
}

function readinessLabel(score: number) {
  if (score < 25) return 'Exploring'
  if (score < 50) return 'Building'
  if (score < 75) return 'Advancing'
  return 'Leading'
}

function readinessColor(score: number) {
  if (score < 25) return '#94A3B8'
  if (score < 50) return '#F59E0B'
  if (score < 75) return '#22D3EE'
  return '#10B981'
}

// ─── Readiness ring (SVG) ─────────────────────────────────────────────────────

function ReadinessRing({ score, size = 120 }: { score: number; size?: number }) {
  const r = 42
  const circ = 2 * Math.PI * r
  const color = readinessColor(score)
  const label = readinessLabel(score)

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
          <circle cx="50" cy="50" r={r} fill="none" stroke="#E2E8F0" strokeWidth="8" />
          <motion.circle
            cx="50" cy="50" r={r} fill="none"
            stroke={color} strokeWidth="8" strokeLinecap="round"
            strokeDasharray={circ}
            initial={{ strokeDashoffset: circ }}
            animate={{ strokeDashoffset: circ * (1 - score / 100) }}
            transition={{ duration: 1.4, ease: 'easeOut', delay: 0.4 }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className="font-black"
            style={{ color: '#0F172A', fontFamily: 'var(--font-sans)', fontSize: size * 0.2, lineHeight: 1 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}>
            {score}
          </motion.span>
          <span style={{ color: '#94A3B8', fontFamily: 'var(--font-sans)', fontSize: size * 0.1 }}>/ 100</span>
        </div>
      </div>
      <div>
        <span className="text-xs font-bold px-3 py-1 rounded-full"
          style={{ background: `${color}15`, color, fontFamily: 'var(--font-sans)' }}>
          {label}
        </span>
      </div>
    </div>
  )
}

// ─── Animation configs ────────────────────────────────────────────────────────

const stagger = { visible: { transition: { staggerChildren: 0.07 } } }
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
}
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function AssessmentResultsPage() {
  const [result, setResult] = useState<AssessmentResult | null>(null)
  const [showAll, setShowAll] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [skillOpen, setSkillOpen] = useState(false)
  const [emailUnlocked, setEmailUnlocked] = useState(false)
  const [captureEmail, setCaptureEmail] = useState('')
  const [captureLoading, setCaptureLoading] = useState(false)
  const [captureError, setCaptureError] = useState('')
  const { user, openSignUp, openSignIn } = useAuth()

  const pathUnlocked = !!user || emailUnlocked

  async function handleEmailCapture(e: React.FormEvent) {
    e.preventDefault()
    const email = captureEmail.trim().toLowerCase()
    if (!email) return
    setCaptureLoading(true)
    setCaptureError('')
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          source: 'assessment',
          role: result?.primaryTrackId ?? null,
          metadata: { answers: result?.answers ?? {} },
        }),
      })
      if (!res.ok) throw new Error('Failed')
      setEmailUnlocked(true)
      openSignUp(email)
    } catch {
      setCaptureError('Something went wrong — try again.')
    } finally {
      setCaptureLoading(false)
    }
  }

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
      } catch { /* ignore */ }
    }
    load()
  }, [user])

  const readinessScore = useMemo(
    () => result ? computeReadinessScore(result.answers) : 0,
    [result],
  )

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#EFF6FF' }}>
        <div className="text-center">
          <p className="text-lg mb-4" style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}>
            No assessment found.
          </p>
          <Link href="/assessment"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white"
            style={{ background: '#2563EB', fontFamily: 'var(--font-sans)' }}>
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
  const firstEssentialLesson = essential[0]

  const modules = Array.from(
    result.customPath.reduce((acc, l) => {
      if (!acc.has(l.moduleId)) acc.set(l.moduleId, { title: l.moduleTitle, moduleIndex: l.moduleIndex, lessons: [] })
      acc.get(l.moduleId)!.lessons.push(l)
      return acc
    }, new Map<string, { title: string; moduleIndex: number; lessons: PriorityLesson[] }>()),
  ).sort(([, a], [, b]) => a.moduleIndex - b.moduleIndex)

  const hoursRange = ROI_HOURS[result.primaryTrackId]?.[result.answers.timePerWeek] ?? '4–6'
  const peerAdoption = PEER_ADOPTION[result.primaryTrackId] ?? 70
  const rcColor = readinessColor(readinessScore)
  const activeTools = result.answers.currentTools.filter(t => t !== 'none')
    .map(t => TOOL_LABELS[t] ?? t)

  return (
    <div className="min-h-screen" style={{ background: '#EFF6FF' }}>

      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4"
        style={{ background: '#FFFFFF', borderBottom: '1px solid #E2E8F0' }}>
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#2563EB' }}>
            <Zap size={16} className="text-white" />
          </div>
          <span className="font-bold" style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', color: '#0F172A' }}>
            OpusLearn
          </span>
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/assessment"
            className="flex items-center gap-1.5 text-xs font-medium"
            style={{ color: '#94A3B8', fontFamily: 'var(--font-sans)' }}>
            <RefreshCw size={12} /> Retake
          </Link>
          {user ? (
            <Link href="/dashboard"
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors hover:opacity-80"
              style={{ color: '#2563EB', background: '#DBEAFE', fontFamily: 'var(--font-sans)' }}>
              <Zap size={11} /> Dashboard
            </Link>
          ) : (
            <button onClick={() => openSignUp(captureEmail)}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg text-white transition-all hover:opacity-90"
              style={{ background: '#2563EB', fontFamily: 'var(--font-sans)' }}>
              Sign up free
            </button>
          )}
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-5">

          {/* ─── Hero: greeting + ring side by side ─── */}
          <motion.div variants={fadeUp}
            className="rounded-2xl p-6 sm:p-8"
            style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
            <div className="flex flex-col sm:flex-row sm:items-center gap-6">

              {/* Text side */}
              <div className="flex-1 min-w-0">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4 text-xs font-semibold"
                  style={{ background: '#DBEAFE', color: '#2563EB', fontFamily: 'var(--font-sans)', border: '1px solid #BFDBFE' }}>
                  <Check size={11} /> Your personalised path is ready
                </div>
                <h1 className="text-3xl sm:text-4xl font-black mb-3"
                  style={{ fontFamily: 'var(--font-sans)', color: '#0F172A', lineHeight: 1.1 }}>
                  {result.answers.name
                    ? <>{result.answers.name},<br /><span style={{ color: '#2563EB' }}>here&apos;s your AI path</span></>
                    : <>Here&apos;s your<br /><span style={{ color: '#2563EB' }}>AI learning path</span></>
                  }
                </h1>
                <p className="text-sm leading-relaxed" style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}>
                  {result.reasoning}
                </p>
              </div>

              {/* Ring side */}
              <div className="flex-shrink-0 flex justify-center sm:justify-end">
                <ReadinessRing score={readinessScore} size={120} />
              </div>
            </div>

            {/* Stats strip */}
            <div className="mt-6 pt-6 grid grid-cols-3 gap-3" style={{ borderTop: '1px solid #F1F5F9' }}>
              {[
                { icon: Clock,  value: `${hoursRange} hrs`, label: 'saved/week',     color: '#2563EB' },
                { icon: Users,  value: `${peerAdoption}%`,  label: 'of peers use AI', color: '#0EA5E9' },
                { icon: Target, value: `Top ${readinessScore >= 75 ? '20' : readinessScore >= 50 ? '40' : '60'}%`,
                  label: 'vs peers',       color: rcColor },
              ].map(item => {
                const II = item.icon
                return (
                  <div key={item.label} className="flex flex-col items-center text-center gap-1 py-2">
                    <II size={14} color={item.color} />
                    <span className="text-lg font-black" style={{ color: '#0F172A', fontFamily: 'var(--font-sans)', lineHeight: 1 }}>
                      {item.value}
                    </span>
                    <span className="text-xs" style={{ color: '#94A3B8', fontFamily: 'var(--font-sans)' }}>
                      {item.label}
                    </span>
                  </div>
                )
              })}
            </div>
          </motion.div>

          {/* Email gate — unauthenticated and not yet captured */}
          <AnimatePresence mode="wait">
            {!pathUnlocked ? (
              <motion.div
                key="gate"
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: -8 }}
                className="rounded-2xl overflow-hidden"
                style={{ background: '#FFFFFF', border: '2px solid #2563EB', boxShadow: '0 0 0 4px rgba(37,99,235,0.08)' }}
              >
                <div className="h-1 w-full" style={{ background: '#2563EB' }} />
                <div className="px-6 py-7">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ background: '#DBEAFE' }}>
                      <Lock size={14} style={{ color: '#2563EB' }} />
                    </div>
                    <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#2563EB', fontFamily: 'var(--font-sans)' }}>
                      Unlock your full learning path
                    </p>
                  </div>
                  <h3 className="text-xl font-black mb-2" style={{ color: '#0F172A', fontFamily: 'var(--font-sans)' }}>
                    Your personalised {result ? TRACK_META[result.primaryTrackId]?.label : 'AI'} curriculum is ready
                  </h3>
                  <p className="text-sm mb-6 leading-relaxed" style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}>
                    Enter your email to see your complete lesson plan, priority modules, and AI-generated recommendations.
                    Free forever — no credit card needed.
                  </p>
                  <form onSubmit={handleEmailCapture} className="space-y-3">
                    <div className="flex gap-2">
                      <input
                        type="email"
                        placeholder="your@email.com"
                        value={captureEmail}
                        onChange={e => setCaptureEmail(e.target.value)}
                        required
                        className="flex-1 px-4 py-3.5 rounded-xl text-sm outline-none"
                        style={{ background: '#EFF6FF', border: '1.5px solid #E2E8F0', color: '#0F172A', fontFamily: 'var(--font-sans)' }}
                        onFocus={e => { e.currentTarget.style.borderColor = '#2563EB'; e.currentTarget.style.background = '#FFFFFF' }}
                        onBlur={e => { e.currentTarget.style.borderColor = '#E2E8F0'; e.currentTarget.style.background = '#EFF6FF' }}
                      />
                      <button
                        type="submit"
                        disabled={captureLoading}
                        className="flex items-center gap-2 px-5 py-3.5 rounded-xl text-sm font-semibold text-white whitespace-nowrap transition-all hover:opacity-90 disabled:opacity-60"
                        style={{ background: '#2563EB', boxShadow: '0 4px 16px rgba(37,99,235,0.25)', fontFamily: 'var(--font-sans)' }}
                      >
                        {captureLoading ? <Loader2 size={14} className="animate-spin" /> : <><ArrowRight size={14} /> Unlock path</>}
                      </button>
                    </div>
                    {captureError && (
                      <p className="text-xs" style={{ color: '#EF4444', fontFamily: 'var(--font-sans)' }}>{captureError}</p>
                    )}
                  </form>
                  <div className="flex items-center gap-4 mt-4">
                    {['Free forever', 'No credit card', '3,200+ professionals'].map(t => (
                      <div key={t} className="flex items-center gap-1 text-xs" style={{ color: '#94A3B8', fontFamily: 'var(--font-sans)' }}>
                        <Check size={10} color="#10B981" /> {t}
                      </div>
                    ))}
                  </div>
                  <p className="text-xs mt-3" style={{ color: '#94A3B8', fontFamily: 'var(--font-sans)' }}>
                    Already have an account?{' '}
                    <button onClick={openSignIn} className="underline hover:text-slate-600 transition-colors" style={{ color: '#64748B' }}>
                      Sign in
                    </button>
                  </p>
                </div>
              </motion.div>
            ) : !user && emailUnlocked ? (
              <motion.div
                key="save-banner"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl overflow-hidden"
                style={{ background: '#FFFFFF', border: '2px solid #2563EB', boxShadow: '0 0 0 4px rgba(37,99,235,0.08)' }}
              >
                <div className="h-1.5 w-full" style={{ background: 'linear-gradient(90deg, #2563EB, #22D3EE)' }} />
                <div className="px-6 py-7">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#DBEAFE' }}>
                      <Zap size={14} style={{ color: '#2563EB' }} />
                    </div>
                    <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#2563EB', fontFamily: 'var(--font-sans)' }}>
                      One last step
                    </p>
                  </div>
                  <h3 className="text-xl font-black mb-2" style={{ color: '#0F172A', fontFamily: 'var(--font-sans)' }}>
                    Create your free account to start learning
                  </h3>
                  <p className="text-sm mb-6 leading-relaxed" style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}>
                    Your personalised path is saved. Create an account to track your progress, earn XP, and get lesson reminders — free forever.
                  </p>
                  <button
                    onClick={() => openSignUp(captureEmail)}
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                    style={{ background: 'linear-gradient(135deg, #2563EB, #1D4ED8)', boxShadow: '0 4px 20px rgba(37,99,235,0.35)', fontFamily: 'var(--font-sans)' }}
                  >
                    <Zap size={14} /> Create free account — it takes 30 seconds
                  </button>
                  <div className="flex items-center justify-center gap-5 mt-4">
                    {['Free forever', 'No credit card', 'Keep your results'].map(t => (
                      <div key={t} className="flex items-center gap-1 text-xs" style={{ color: '#94A3B8', fontFamily: 'var(--font-sans)' }}>
                        <Check size={10} color="#10B981" /> {t}
                      </div>
                    ))}
                  </div>
                  <p className="text-xs mt-4 text-center" style={{ color: '#94A3B8', fontFamily: 'var(--font-sans)' }}>
                    Already have an account?{' '}
                    <button onClick={openSignIn} className="underline hover:text-slate-600 transition-colors" style={{ color: '#64748B' }}>
                      Sign in
                    </button>
                  </p>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>

          {/* ─── Track card + Primary CTA ─── */}
          <motion.div variants={fadeUp}
            className="rounded-2xl overflow-hidden"
            style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>

            {/* Track header */}
            <div className="p-5 flex items-center gap-4 relative overflow-hidden"
              style={{ background: `${meta.color}06`, borderBottom: '1px solid #F1F5F9' }}>
              <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full blur-2xl opacity-10"
                style={{ background: meta.color }} />
              <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 relative"
                style={{ background: `${meta.color}12`, border: `1px solid ${meta.color}30` }}>
                <Icon size={22} color={meta.color} />
              </div>
              <div className="flex-1 min-w-0 relative">
                <p className="text-xs font-semibold uppercase tracking-widest mb-0.5"
                  style={{ color: meta.color, fontFamily: 'var(--font-sans)' }}>
                  Recommended track
                </p>
                <h2 className="text-base font-black" style={{ fontFamily: 'var(--font-sans)', color: '#0F172A' }}>
                  {meta.label}
                </h2>
              </div>
              <Link href={`/tracks/${result.primaryTrackId}`}
                className="hidden sm:flex items-center gap-1 text-xs font-semibold relative flex-shrink-0"
                style={{ color: meta.color, fontFamily: 'var(--font-sans)' }}>
                View track <ChevronRight size={12} />
              </Link>
            </div>

            {/* Stats + CTA */}
            <div className="p-5">
              <div className="grid grid-cols-3 gap-3 mb-4">
                {[
                  { icon: BookOpen, label: 'Lessons',   value: `${result.totalLessons}` },
                  { icon: Star,     label: 'Essential', value: `${result.essentialCount}` },
                  { icon: Clock,    label: 'Est. time', value: `~${result.estimatedWeeks} wks` },
                ].map(stat => {
                  const SI = stat.icon
                  return (
                    <div key={stat.label} className="py-3 rounded-xl text-center"
                      style={{ background: '#EFF6FF', border: '1px solid #F1F5F9' }}>
                      <SI size={13} color={meta.color} className="mx-auto mb-1" />
                      <div className="text-base font-black" style={{ fontFamily: 'var(--font-sans)', color: '#0F172A' }}>
                        {stat.value}
                      </div>
                      <div className="text-xs mt-0.5" style={{ color: '#94A3B8', fontFamily: 'var(--font-sans)' }}>
                        {stat.label}
                      </div>
                    </div>
                  )
                })}
              </div>

              {firstEssentialLesson && (
                <div className="flex flex-col sm:flex-row gap-2">
                  <Link
                    href={`/tracks/${firstEssentialLesson.trackId}/lessons/${firstEssentialLesson.lessonId}`}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-white"
                    style={{ background: '#2563EB', boxShadow: '0 4px 14px rgba(37,99,235,0.2)', fontFamily: 'var(--font-sans)' }}>
                    Start first essential lesson <ArrowRight size={14} />
                  </Link>
                  <Link
                    href={`/tracks/${result.primaryTrackId}`}
                    className="flex items-center justify-center gap-1.5 px-5 py-3.5 rounded-xl font-semibold text-sm"
                    style={{ background: '#EFF6FF', border: '1px solid #E2E8F0', color: '#475569', fontFamily: 'var(--font-sans)' }}>
                    Browse track <ChevronRight size={14} />
                  </Link>
                </div>
              )}
            </div>
          </motion.div>

          {/* ─── Custom learning path ─── */}
          <motion.div variants={fadeUp}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-black" style={{ fontFamily: 'var(--font-sans)', color: '#0F172A' }}>
                Your learning path
              </h3>
              <div className="flex items-center gap-3 text-xs" style={{ fontFamily: 'var(--font-sans)' }}>
                {(['essential', 'recommended', 'optional'] as const).map(p => (
                  <div key={p} className="hidden sm:flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full" style={{ background: PRIORITY_CONFIG[p].color }} />
                    <span style={{ color: '#94A3B8' }}>{PRIORITY_CONFIG[p].label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              {modules.map(([moduleId, mod], modIdx) => {
                const visibleLessons = showAll ? mod.lessons : mod.lessons.filter(l => l.priority !== 'optional')
                if (!showAll && visibleLessons.length === 0) return null

                return (
                  <div key={moduleId} className="rounded-2xl overflow-hidden"
                    style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                    {/* Module header */}
                    <div className="px-4 py-3 flex items-center gap-3"
                      style={{ background: '#EFF6FF', borderBottom: '1px solid #F1F5F9' }}>
                      <div className="w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold flex-shrink-0"
                        style={{ background: `${meta.color}12`, color: meta.color, fontFamily: 'var(--font-sans)' }}>
                        {modIdx + 1}
                      </div>
                      <span className="text-sm font-semibold" style={{ fontFamily: 'var(--font-sans)', color: '#0F172A' }}>
                        {mod.title}
                      </span>
                      <span className="ml-auto text-xs" style={{ color: '#94A3B8', fontFamily: 'var(--font-sans)' }}>
                        {visibleLessons.length} lesson{visibleLessons.length !== 1 ? 's' : ''}
                      </span>
                    </div>

                    {/* Lesson rows */}
                    <div>
                      {visibleLessons.map((lesson, lessonIdx) => {
                        const pc = PRIORITY_CONFIG[lesson.priority]
                        return (
                          <Link key={lesson.lessonId}
                            href={`/tracks/${lesson.trackId}/lessons/${lesson.lessonId}`}
                            className="flex items-center gap-3 px-4 py-3.5 transition-colors hover:bg-slate-50 group"
                            style={{ borderTop: lessonIdx > 0 ? '1px solid #EFF6FF' : undefined }}>
                            <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-0.5" style={{ background: pc.color }} />
                            <span className="flex-1 text-sm leading-snug" style={{ color: '#374151', fontFamily: 'var(--font-sans)' }}>
                              {lesson.lessonTitle}
                            </span>
                            <span className="text-xs px-2 py-0.5 rounded-full flex-shrink-0"
                              style={{ background: pc.bg, border: `1px solid ${pc.border}`, color: pc.color, fontFamily: 'var(--font-sans)' }}>
                              {pc.label}
                            </span>
                            <ChevronRight size={12} className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: '#94A3B8' }} />
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
                className="mt-3 w-full py-3 rounded-xl text-sm font-medium transition-colors hover:bg-white"
                style={{ color: '#64748B', border: '1px solid #E2E8F0', background: 'transparent', fontFamily: 'var(--font-sans)' }}>
                Show {optional.length} optional lesson{optional.length !== 1 ? 's' : ''}
              </button>
            )}
          </motion.div>

          {/* ─── Secondary details (collapsible) ─── */}

          {/* Profile */}
          <motion.div variants={fadeUp}
            className="rounded-2xl overflow-hidden"
            style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
            <button
              className="w-full flex items-center justify-between px-5 py-4"
              onClick={() => setProfileOpen(v => !v)}>
              <div className="flex items-center gap-2.5">
                <Brain size={14} color="#2563EB" />
                <span className="text-sm font-semibold" style={{ color: '#0F172A', fontFamily: 'var(--font-sans)' }}>
                  Your profile
                </span>
              </div>
              <ChevronDown
                size={15}
                style={{ color: '#94A3B8', transform: profileOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}
              />
            </button>

            <AnimatePresence>
              {profileOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden">
                  <div className="px-5 pb-5 pt-0" style={{ borderTop: '1px solid #F1F5F9' }}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 pt-4">
                      {[
                        { label: 'Role',       value: [result.answers.subRole, meta.label].filter(Boolean).join(' · ') || meta.label },
                        { label: 'Industry',   value: INDUSTRY_LABELS[result.answers.industry] ?? result.answers.industry },
                        { label: 'Company',    value: COMPANY_SIZE_LABELS[result.answers.companySize] ?? result.answers.companySize },
                        { label: 'Experience', value: EXPERIENCE_LABELS[result.answers.experience] ?? result.answers.experience },
                      ].map(({ label, value }) => (
                        <div key={label}>
                          <span className="text-xs" style={{ color: '#94A3B8', fontFamily: 'var(--font-sans)' }}>{label}</span>
                          <p className="text-sm font-semibold mt-0.5" style={{ color: '#0F172A', fontFamily: 'var(--font-sans)' }}>{value}</p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 pt-4 flex flex-wrap items-center justify-between gap-3"
                      style={{ borderTop: '1px solid #F1F5F9' }}>
                      <div className="flex items-center gap-2">
                        <span className="text-xs" style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}>
                          Knowledge check:
                        </span>
                        <div className="flex items-center gap-1">
                          {[0, 1].map(i => (
                            <div key={i} className="w-5 h-5 rounded-full flex items-center justify-center"
                              style={{
                                background: i < result.answers.skillScore ? '#ECFDF5' : '#F1F5F9',
                                border: `1px solid ${i < result.answers.skillScore ? '#6EE7B7' : '#E2E8F0'}`,
                              }}>
                              {i < result.answers.skillScore
                                ? <Check size={9} color="#10B981" />
                                : <span style={{ color: '#CBD5E1', fontSize: 10 }}>·</span>
                              }
                            </div>
                          ))}
                          <span className="text-xs ml-1" style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}>
                            {result.answers.skillScore}/2
                          </span>
                        </div>
                      </div>

                      {activeTools.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {activeTools.map(tool => (
                            <span key={tool} className="text-xs px-2 py-0.5 rounded-full"
                              style={{ background: '#EFF6FF', border: '1px solid #E2E8F0', color: '#64748B', fontFamily: 'var(--font-sans)' }}>
                              {tool}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Skill gap map */}
          <motion.div variants={fadeUp}
            className="rounded-2xl overflow-hidden"
            style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
            <button
              className="w-full flex items-center justify-between px-5 py-4"
              onClick={() => setSkillOpen(v => !v)}>
              <div className="flex items-center gap-2.5">
                <Star size={14} color="#2563EB" />
                <span className="text-sm font-semibold" style={{ color: '#0F172A', fontFamily: 'var(--font-sans)' }}>
                  Skill gap breakdown
                </span>
                <span className="text-xs" style={{ color: '#94A3B8', fontFamily: 'var(--font-sans)' }}>
                  by module
                </span>
              </div>
              <ChevronDown
                size={15}
                style={{ color: '#94A3B8', transform: skillOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}
              />
            </button>

            <AnimatePresence>
              {skillOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden">
                  <div className="px-5 pb-5 pt-0" style={{ borderTop: '1px solid #F1F5F9' }}>
                    <div className="space-y-3 pt-4">
                      {modules.map(([moduleId, mod]) => {
                        const essCount = mod.lessons.filter(l => l.priority === 'essential').length
                        const recCount = mod.lessons.filter(l => l.priority === 'recommended').length
                        const total = mod.lessons.length
                        const essWidth = (essCount / total) * 100
                        const recWidth = (recCount / total) * 100
                        const priority = essCount > 0 ? 'essential' : recCount > 0 ? 'recommended' : 'optional'
                        const pc = PRIORITY_CONFIG[priority]

                        return (
                          <div key={moduleId}>
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="text-xs font-medium" style={{ color: '#334155', fontFamily: 'var(--font-sans)' }}>
                                {mod.title}
                              </span>
                              <span className="text-xs px-2 py-0.5 rounded-full"
                                style={{ background: pc.bg, border: `1px solid ${pc.border}`, color: pc.color, fontFamily: 'var(--font-sans)' }}>
                                {essCount > 0 ? `${essCount} essential` : recCount > 0 ? `${recCount} recommended` : 'optional'}
                              </span>
                            </div>
                            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: '#F1F5F9' }}>
                              <motion.div
                                className="h-full rounded-full"
                                style={{ background: `linear-gradient(90deg, ${PRIORITY_CONFIG.essential.color} ${essWidth}%, ${PRIORITY_CONFIG.recommended.color} ${essWidth}% ${essWidth + recWidth}%, #E2E8F0 ${essWidth + recWidth}%)` }}
                                initial={{ width: 0 }}
                                animate={{ width: '100%' }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                              />
                            </div>
                          </div>
                        )
                      })}
                    </div>

                    <div className="mt-4 flex items-center gap-4 text-xs" style={{ fontFamily: 'var(--font-sans)' }}>
                      {(['essential', 'recommended', 'optional'] as const).map(p => (
                        <div key={p} className="flex items-center gap-1.5">
                          <div className="w-2 h-2 rounded-full" style={{ background: PRIORITY_CONFIG[p].color }} />
                          <span style={{ color: '#94A3B8' }}>{PRIORITY_CONFIG[p].label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Bottom CTA */}
          <motion.div variants={fadeUp}
            className="text-center p-8 rounded-3xl"
            style={{ background: '#DBEAFE', border: '1px solid #BFDBFE' }}>
            <Award size={22} color="#2563EB" className="mx-auto mb-3" />
            <h3 className="text-base font-black mb-1.5" style={{ fontFamily: 'var(--font-sans)', color: '#0F172A' }}>
              Ready when you are
            </h3>
            <p className="text-sm mb-5" style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}>
              Each lesson is 15–20 minutes. Your progress is saved automatically.
            </p>
            {!user ? (
              <div className="flex flex-col items-center gap-3">
                <button
                  onClick={() => openSignUp(captureEmail)}
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                  style={{ background: '#2563EB', boxShadow: '0 4px 14px rgba(37,99,235,0.3)', fontFamily: 'var(--font-sans)' }}>
                  <Zap size={14} /> Create free account &amp; start learning
                </button>
                {firstEssentialLesson && (
                  <Link
                    href={`/tracks/${firstEssentialLesson.trackId}/lessons/${firstEssentialLesson.lessonId}`}
                    className="text-xs transition-colors hover:text-slate-600"
                    style={{ color: '#94A3B8', fontFamily: 'var(--font-sans)' }}>
                    Start without an account →
                  </Link>
                )}
              </div>
            ) : firstEssentialLesson ? (
              <Link
                href={`/tracks/${firstEssentialLesson.trackId}/lessons/${firstEssentialLesson.lessonId}`}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-xl text-sm font-semibold text-white"
                style={{ background: '#2563EB', fontFamily: 'var(--font-sans)' }}>
                Start learning now <ArrowRight size={14} />
              </Link>
            ) : null}
          </motion.div>

        </motion.div>
      </div>
    </div>
  )
}
