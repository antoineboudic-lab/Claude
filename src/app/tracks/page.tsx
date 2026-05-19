'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import {
  Megaphone, LineChart, HeartHandshake, TrendingUp,
  Settings, Briefcase, ChevronRight, Clock, BookOpen, Trophy,
  Zap, Sparkles, ArrowRight, Target, LogOut, Search,
  Scale, Package, Headphones, BarChart,
} from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import GlobalSearch from '@/components/GlobalSearch'

const easing = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: easing } },
}

const stagger = (delay = 0.08) => ({
  hidden: {},
  visible: { transition: { staggerChildren: delay } },
})

const tracks = [
  {
    id: 'marketing',
    title: 'Marketing',
    tagline: 'Create, automate, and optimise campaigns with AI',
    outcome: 'Campaign briefs in 20 min, not 3 hours',
    color: '#EC4899',
    icon: Megaphone,
    lessons: 20,
    duration: '6 hrs',
    skills: ['AI copywriting', 'Campaign automation', 'Audience intelligence', 'Performance analysis'],
  },
  {
    id: 'finance',
    title: 'Finance',
    tagline: 'Model, forecast, and report with AI precision',
    outcome: 'Variance analysis in 30 min, not half a day',
    color: '#F59E0B',
    icon: LineChart,
    lessons: 20,
    duration: '6 hrs',
    skills: ['Financial modelling', 'Risk analysis', 'Report automation', 'Forecasting'],
  },
  {
    id: 'hr',
    title: 'HR',
    tagline: 'Attract, retain, and develop talent smarter',
    outcome: 'Job description first draft in 5 minutes',
    color: '#10B981',
    icon: HeartHandshake,
    lessons: 20,
    duration: '6 hrs',
    skills: ['Talent screening', 'Employee experience', 'HR analytics', 'Policy drafting'],
  },
  {
    id: 'sales',
    title: 'Sales',
    tagline: 'Prospect, pitch, and close with AI as your edge',
    outcome: 'Full proposal in 2–3 hours, not a full day',
    color: '#8B5CF6',
    icon: TrendingUp,
    lessons: 20,
    duration: '6 hrs',
    skills: ['AI prospecting', 'Proposal writing', 'CRM optimisation', 'Deal intelligence'],
  },
  {
    id: 'operations',
    title: 'Operations',
    tagline: 'Automate processes and optimise at every layer',
    outcome: 'Automated daily summaries replace manual aggregation',
    color: '#22D3EE',
    icon: Settings,
    lessons: 20,
    duration: '6 hrs',
    skills: ['Process automation', 'Supply chain AI', 'Quality control', 'Documentation'],
  },
  {
    id: 'leadership',
    title: 'Leadership',
    tagline: 'Lead your organisation into the AI era with confidence',
    outcome: 'Concrete AI roadmap, not a vague strategy',
    color: '#F97316',
    icon: Briefcase,
    lessons: 20,
    duration: '6 hrs',
    skills: ['AI strategy', 'Change management', 'Team upskilling', 'AI governance'],
  },
  {
    id: 'legal',
    title: 'Legal',
    tagline: 'Review, research, and advise with AI confidence',
    outcome: 'Contract first-pass in 20 min, not 2–4 hours',
    color: '#6366F1',
    icon: Scale,
    lessons: 16,
    duration: '5 hrs',
    skills: ['Contract analysis', 'Legal research', 'Risk assessment', 'AI governance'],
  },
  {
    id: 'product',
    title: 'Product',
    tagline: 'Discover, prioritise, and ship better products with AI',
    outcome: 'Discovery synthesis in hours, not 2 weeks',
    color: '#14B8A6',
    icon: Package,
    lessons: 16,
    duration: '5 hrs',
    skills: ['User research', 'Roadmap prioritisation', 'PRD writing', 'AI product strategy'],
  },
  {
    id: 'customer',
    title: 'Customer Success',
    tagline: 'Retain, expand, and delight customers with AI',
    outcome: 'At-risk accounts flagged weeks before churn',
    color: '#F43F5E',
    icon: Headphones,
    lessons: 16,
    duration: '5 hrs',
    skills: ['Health monitoring', 'Churn prevention', 'Personalisation', 'CS operations'],
  },
  {
    id: 'consulting',
    title: 'Consulting',
    tagline: 'Research, analyse, and deliver with AI as your edge',
    outcome: 'First-pass research in 4–8 hours, not 3 days',
    color: '#0EA5E9',
    icon: BarChart,
    lessons: 16,
    duration: '5 hrs',
    skills: ['Research synthesis', 'Structured analysis', 'Slide writing', 'Client communication'],
  },
]

// ─── Track card ───────────────────────────────────────────────────────────────

function TrackCard({ track, index, dimmed = false, showPreviewBadge = false }: { track: typeof tracks[0]; index: number; dimmed?: boolean; showPreviewBadge?: boolean }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="rounded-2xl overflow-hidden group cursor-pointer transition-opacity"
      style={{
        background: '#FFFFFF',
        border: '1px solid #E2E8F0',
        boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
        opacity: dimmed ? 0.55 : 1,
      }}
    >
      <Link href={`/tracks/${track.id}`}>
        <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${track.color}, ${track.color}88)` }} />
        <div className="p-5 sm:p-7">
          <div className="flex items-start justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: `${track.color}10`, border: `1px solid ${track.color}25` }}>
                <track.icon size={22} color={track.color} />
              </div>
              <div>
                <h3 className="text-lg font-black" style={{ fontFamily: 'var(--font-sans)', color: '#0F172A' }}>
                  {track.title}
                </h3>
                <span className="text-xs font-medium px-2 py-0.5 rounded-full"
                  style={{ background: `${track.color}10`, color: track.color, fontFamily: 'var(--font-sans)' }}>
                  Track {index + 1}
                </span>
              </div>
            </div>
            {showPreviewBadge && (
              <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-lg flex-shrink-0"
                style={{ background: '#F5F3FF', color: '#7C3AED', border: '1px solid #EDE9FE', fontFamily: 'var(--font-sans)' }}>
                <Sparkles size={9} /> Sample
              </span>
            )}
          </div>

          <p className="text-sm leading-relaxed mb-4" style={{ color: '#475569', fontFamily: 'var(--font-sans)' }}>
            {track.tagline}
          </p>

          {/* Outcome hook */}
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg mb-4"
            style={{ background: `${track.color}08`, border: `1px solid ${track.color}20` }}>
            <Zap size={11} color={track.color} className="flex-shrink-0" />
            <span className="text-xs font-medium leading-snug" style={{ color: '#334155', fontFamily: 'var(--font-sans)' }}>
              {track.outcome}
            </span>
          </div>

          {showPreviewBadge && (
            <p className="text-xs mb-4 italic" style={{ color: '#94A3B8', fontFamily: 'var(--font-sans)' }}>
              Content adapts to your role &amp; experience after the assessment.
            </p>
          )}

          <div className="flex flex-wrap gap-2 mb-6">
            {track.skills.map(skill => (
              <span key={skill} className="text-xs px-2.5 py-1 rounded-lg"
                style={{ background: '#F8FAFC', color: '#64748B', border: '1px solid #E2E8F0', fontFamily: 'var(--font-sans)' }}>
                {skill}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid #E2E8F0' }}>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-xs" style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}>
                <BookOpen size={13} /> {track.lessons} lessons
              </div>
              <div className="flex items-center gap-1.5 text-xs" style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}>
                <Clock size={13} /> {track.duration}
              </div>
              <div className="flex items-center gap-1.5 text-xs" style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}>
                <Trophy size={13} /> Certificate
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs font-semibold group-hover:gap-2 transition-all"
              style={{ color: track.color, fontFamily: 'var(--font-sans)' }}>
              Preview <ChevronRight size={13} />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

// ─── Recommended track hero card ──────────────────────────────────────────────

function RecommendedTrackCard({ track }: { track: typeof tracks[0] }) {
  const Icon = track.icon
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: easing }}
      className="rounded-3xl overflow-hidden mb-12 relative"
      style={{
        background: `${track.color}06`,
        border: `1px solid ${track.color}25`,
        boxShadow: `0 4px 24px ${track.color}12`,
      }}
    >
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 80% 50%, ${track.color}08 0%, transparent 60%)` }} />
      <div className="relative px-8 py-7 flex flex-col sm:flex-row items-start sm:items-center gap-6">
        <div className="flex items-center gap-4 flex-1">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ background: `${track.color}12`, border: `1px solid ${track.color}25` }}>
            <Icon size={26} color={track.color} />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: track.color, fontFamily: 'var(--font-sans)' }}>
                Your recommended track
              </span>
              <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-semibold"
                style={{ background: '#EDE9FE', color: '#7C3AED', fontFamily: 'var(--font-sans)' }}>
                <Sparkles size={9} /> AI-personalised
              </span>
            </div>
            <h2 className="text-2xl font-black mb-1" style={{ fontFamily: 'var(--font-sans)', color: '#0F172A' }}>
              {track.title}
            </h2>
            <p className="text-sm" style={{ color: '#475569', fontFamily: 'var(--font-sans)' }}>
              {track.tagline}
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
          <Link
            href={`/assessment/results`}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90 text-white"
            style={{ background: track.color, fontFamily: 'var(--font-sans)' }}>
            View my path <ArrowRight size={14} />
          </Link>
          <Link
            href={`/tracks/${track.id}`}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:bg-white"
            style={{ border: `1px solid ${track.color}30`, color: track.color, fontFamily: 'var(--font-sans)' }}>
            Browse track
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Assessment gate ──────────────────────────────────────────────────────────

function AssessmentGate({ onSkip }: { onSkip: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: easing }}
      className="max-w-2xl mx-auto text-center py-20 px-6"
    >
      <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
        style={{ background: 'linear-gradient(135deg, #7C3AED, #22D3EE)', boxShadow: '0 8px 24px rgba(124,58,237,0.2)' }}>
        <Target size={28} className="text-white" />
      </div>
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6"
        style={{ background: '#EDE9FE', color: '#7C3AED', fontFamily: 'var(--font-sans)' }}>
        <Sparkles size={11} /> 2-minute assessment
      </div>
      <h1 className="text-3xl sm:text-4xl font-black mb-4" style={{ fontFamily: 'var(--font-sans)', color: '#0F172A' }}>
        Your track is built around you
      </h1>
      <p className="text-lg mb-8 leading-relaxed" style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}>
        We don't believe in generic learning. Tell us your role, your goals, and your challenges — we'll build a curriculum that's yours alone.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link href="/assessment"
          className="flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white text-base transition-all hover:opacity-90"
          style={{ background: 'linear-gradient(135deg, #7C3AED, #22D3EE)', boxShadow: '0 4px 14px rgba(124,58,237,0.25)', fontFamily: 'var(--font-sans)' }}>
          <Zap size={16} /> Build my personalized track
        </Link>
        <button
          onClick={onSkip}
          className="text-sm font-medium transition-colors hover:text-slate-700"
          style={{ color: '#94A3B8', fontFamily: 'var(--font-sans)' }}>
          Browse all tracks instead →
        </button>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-8">
        {['Role-specific curriculum', 'Adjusts to your experience', 'Updates as you grow'].map(t => (
          <div key={t} className="flex items-center gap-1.5 text-xs" style={{ color: '#94A3B8', fontFamily: 'var(--font-sans)' }}>
            <span style={{ color: '#10B981' }}>✓</span> {t}
          </div>
        ))}
      </div>
    </motion.div>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function TracksPage() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0 })
  const [recommendedTrackId, setRecommendedTrackId] = useState<string | null>(null)
  const [assessmentLoaded, setAssessmentLoaded] = useState(false)
  const [skipped, setSkipped] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const { user, openSignIn, openSignUp, signOut } = useAuth()

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
    try {
      const raw = localStorage.getItem('ai-literacy-assessment')
      if (raw) {
        const result = JSON.parse(raw)
        setRecommendedTrackId(result.primaryTrackId ?? null)
      }
    } catch {}
    setAssessmentLoaded(true)
  }, [])

  const hasAssessment = !!recommendedTrackId
  const recommendedTrack = tracks.find(t => t.id === recommendedTrackId)
  const showGate = assessmentLoaded && !hasAssessment && !skipped

  return (
    <main style={{ background: '#F8FAFC', minHeight: '100vh' }}>
      {/* Nav */}
      <nav className="sticky top-0 z-40 px-6 py-4 flex items-center justify-between"
        style={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #E2E8F0' }}>
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: '#7C3AED' }}>
            <Zap size={13} className="text-white" />
          </div>
          <span className="font-black text-base" style={{ color: '#0F172A', fontFamily: 'var(--font-sans)' }}>
            AI Literacy
          </span>
        </Link>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSearchOpen(true)}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors hover:bg-slate-100"
            style={{ color: '#64748B', fontFamily: 'var(--font-sans)', border: '1px solid #E2E8F0', background: '#F8FAFC' }}
          >
            <Search size={13} />
            <span>Search</span>
            <kbd style={{ fontSize: '10px', color: '#94A3B8', background: '#E2E8F0', borderRadius: '3px', padding: '1px 5px' }}>⌘K</kbd>
          </button>
          {user ? (
            <>
              <Link href="/dashboard"
                className="text-sm font-medium transition-colors hover:text-slate-900"
                style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}>
                Dashboard
              </Link>
              <button onClick={signOut}
                className="flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg transition-colors hover:bg-slate-100"
                style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}>
                <LogOut size={13} /> Sign out
              </button>
            </>
          ) : (
            <>
              <button onClick={openSignIn}
                className="text-sm font-medium transition-colors hover:text-slate-900"
                style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}>
                Sign in
              </button>
              <Link href="/assessment"
                className="text-xs font-semibold px-4 py-2 rounded-lg text-white transition-all hover:opacity-90"
                style={{ background: '#7C3AED', fontFamily: 'var(--font-sans)' }}>
                {hasAssessment ? 'Retake' : 'Get started'}
              </Link>
            </>
          )}
        </div>
      </nav>
      {searchOpen && <GlobalSearch open={searchOpen} onClose={() => setSearchOpen(false)} />}

      {/* Assessment gate */}
      {showGate && <AssessmentGate onSkip={() => setSkipped(true)} />}

      {/* Content — shown when assessment done OR skipped */}
      {(!showGate) && (
        <div>
          {/* Header */}
          {!hasAssessment && (
            <div className="pt-16 pb-12 px-6 text-center relative overflow-hidden"
              style={{ borderBottom: '1px solid #E2E8F0', background: '#FFFFFF' }}>
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(124,58,237,0.05) 0%, transparent 60%)' }} />
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-5"
                  style={{ background: '#FEF3C7', color: '#92400E', border: '1px solid #FDE68A', fontFamily: 'var(--font-sans)' }}>
                  👋 You&apos;re browsing sample tracks — your actual content is personalised
                </div>
                <h1 className="text-4xl lg:text-5xl font-black tracking-tight mb-4"
                  style={{ fontFamily: 'var(--font-sans)', color: '#0F172A' }}>
                  10 tracks. One built for you.
                </h1>
                <p className="text-base max-w-xl mx-auto mb-6" style={{ color: '#475569', fontFamily: 'var(--font-sans)' }}>
                  What you see here are the topic areas we cover. Once you take the 3-minute assessment, the lessons, modules, and examples inside your track are rebuilt around your specific role, experience level, and goals.
                </p>
                <Link href="/assessment"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm text-white transition-all hover:opacity-90"
                  style={{ background: '#7C3AED', fontFamily: 'var(--font-sans)', boxShadow: '0 4px 16px rgba(124,58,237,0.2)' }}>
                  <Sparkles size={14} /> Get my personalised track
                </Link>
                <p className="mt-3 text-xs" style={{ color: '#CBD5E1', fontFamily: 'var(--font-sans)' }}>
                  Takes 3 minutes · Free · No credit card required
                </p>
              </motion.div>
            </div>
          )}

          {/* Personalised header when assessment done */}
          {hasAssessment && (
            <div className="pt-12 pb-4 px-6 text-center"
              style={{ borderBottom: '1px solid #E2E8F0', background: '#FFFFFF' }}>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4"
                  style={{ background: '#EDE9FE', color: '#7C3AED', fontFamily: 'var(--font-sans)' }}>
                  <Sparkles size={11} /> Your personalised learning plan
                </div>
                <h1 className="text-3xl lg:text-4xl font-black mb-2"
                  style={{ fontFamily: 'var(--font-sans)', color: '#0F172A' }}>
                  Your AI learning path
                </h1>
                <p className="text-base" style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}>
                  Built around your role, goals, and experience.
                </p>
              </motion.div>
            </div>
          )}

          <div className="max-w-7xl mx-auto px-6 py-12">
            {/* Recommended track hero */}
            {hasAssessment && recommendedTrack && (
              <RecommendedTrackCard track={recommendedTrack} />
            )}

            {/* All tracks label */}
            {hasAssessment && (
              <div className="flex items-center gap-3 mb-6">
                <h2 className="text-sm font-bold uppercase tracking-widest" style={{ color: '#CBD5E1', fontFamily: 'var(--font-sans)' }}>
                  All tracks
                </h2>
                <div className="flex-1 h-px" style={{ background: '#E2E8F0' }} />
              </div>
            )}

            {/* Personalisation context banner — shown when browsing without assessment */}
            {!hasAssessment && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 }}
                className="mb-8 p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center gap-4"
                style={{ background: '#F5F3FF', border: '1px solid #EDE9FE' }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#7C3AED' }}>
                  <Sparkles size={17} className="text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold mb-0.5" style={{ color: '#0F172A', fontFamily: 'var(--font-sans)' }}>
                    These are sample previews
                  </p>
                  <p className="text-sm" style={{ color: '#6D28D9', fontFamily: 'var(--font-sans)' }}>
                    After the 3-minute assessment, your track content — the modules, lesson order, examples, and exercises — is rebuilt around your role and goals. A Finance VP and a Marketing Manager inside the same Finance track get different content.
                  </p>
                </div>
                <Link href="/assessment" className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white flex-shrink-0 transition-all hover:opacity-90"
                  style={{ background: '#7C3AED', fontFamily: 'var(--font-sans)' }}>
                  Personalise mine <ArrowRight size={12} />
                </Link>
              </motion.div>
            )}

            {/* Track grid */}
            <motion.div
              ref={ref}
              variants={stagger(0.08)}
              initial="hidden"
              animate="visible"
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {tracks.map((track, i) => (
                <TrackCard
                  key={track.id}
                  track={track}
                  index={i}
                  dimmed={hasAssessment && track.id !== recommendedTrackId}
                  showPreviewBadge={!hasAssessment}
                />
              ))}
            </motion.div>
          </div>
        </div>
      )}
    </main>
  )
}
