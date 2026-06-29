'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import {
  Megaphone, LineChart, HeartHandshake, TrendingUp,
  Settings, Briefcase, ChevronRight, Clock, BookOpen, Trophy,
  Zap, Sparkles, ArrowRight, Target,
  Scale, Package, Headphones, BarChart,
} from 'lucide-react'
import Link from 'next/link'
import EditorialNav from '@/components/editorial/Nav'
import EditorialFooter from '@/components/editorial/Footer'
import { GrainOverlay, AuroraGlow } from '@/components/editorial/Atmosphere'
import {
  PAPER, PAPER_2, PANEL, INK, INK_SOFT, INK_FAINT,
  COBALT, COBALT_TX, RULE, SERIF, MONO, SANS, easing, fadeUp, stagger,
} from '@/components/editorial/theme'

const tracks = [
  {
    id: 'marketing',
    title: 'Marketing',
    tagline: 'Create, automate, and optimise campaigns with AI',
    outcome: 'Campaign briefs in 20 min, not 3 hours',
    color: '#E04D2A',
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
    color: '#3B82F6',
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
    color: '#0284C7',
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
    color: '#DC2626',
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
  {
    id: 'it',
    title: 'IT & Technology',
    tagline: 'Supercharge your IT work with AI — from scripting to security',
    outcome: 'Script writing: hours → minutes with AI assistance',
    color: '#6366F1',
    icon: Zap,
    lessons: 24,
    duration: '7 hrs',
    skills: ['AI scripting & automation', 'Cybersecurity with AI', 'IT operations', 'AI governance'],
  },
]

// ─── Track card ───────────────────────────────────────────────────────────────

function TrackCard({ track, index, dimmed = false, showPreviewBadge = false }: { track: typeof tracks[0]; index: number; dimmed?: boolean; showPreviewBadge?: boolean }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="overflow-hidden group cursor-pointer transition-opacity"
      style={{
        background: PAPER_2,
        border: `1px solid ${RULE}`,
        borderRadius: 8,
        boxShadow: '0 1px 3px rgba(26,27,31,0.04)',
        opacity: dimmed ? 0.5 : 1,
      }}
    >
      <Link href={`/tracks/${track.id}`}>
        <div className="h-[3px] w-full" style={{ background: track.color }} />
        <div className="p-5 sm:p-7">
          <div className="flex items-start justify-between mb-5">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 flex items-center justify-center"
                style={{ background: `${track.color}12`, border: `1px solid ${track.color}30`, borderRadius: 6 }}>
                <track.icon size={22} color={track.color} />
              </div>
              <div>
                <span className="block text-[10px] uppercase tracking-[0.18em] mb-0.5" style={{ color: INK_FAINT, fontFamily: MONO }}>
                  Track {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="text-xl" style={{ fontFamily: SERIF, fontWeight: 500, letterSpacing: '-0.01em', color: INK }}>
                  {track.title}
                </h3>
              </div>
            </div>
            {showPreviewBadge && (
              <span className="flex items-center gap-1 text-[9.5px] uppercase tracking-wider font-semibold px-2 py-1 flex-shrink-0"
                style={{ background: 'rgba(36,64,216,0.08)', color: COBALT_TX, border: `1px solid rgba(36,64,216,0.20)`, borderRadius: 4, fontFamily: MONO }}>
                <Sparkles size={9} /> Sample
              </span>
            )}
          </div>

          <p className="text-sm leading-relaxed mb-4" style={{ color: INK_SOFT, fontFamily: SANS }}>
            {track.tagline}
          </p>

          {/* Outcome hook */}
          <div className="flex items-center gap-2 px-3 py-2 mb-4"
            style={{ background: `${track.color}0A`, border: `1px solid ${track.color}22`, borderRadius: 6 }}>
            <Zap size={11} color={track.color} className="flex-shrink-0" />
            <span className="text-xs font-medium leading-snug" style={{ color: INK, fontFamily: SANS }}>
              {track.outcome}
            </span>
          </div>

          {showPreviewBadge && (
            <p className="text-xs mb-4 italic" style={{ color: INK_FAINT, fontFamily: SERIF }}>
              Content adapts to your role &amp; experience after the assessment.
            </p>
          )}

          <div className="flex flex-wrap gap-1.5 mb-6">
            {track.skills.map(skill => (
              <span key={skill} className="text-[11px] px-2.5 py-1"
                style={{ background: PAPER, color: INK_SOFT, border: `1px solid ${RULE}`, borderRadius: 4, fontFamily: SANS }}>
                {skill}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4" style={{ borderTop: `1px solid ${RULE}` }}>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-[11px]" style={{ color: INK_FAINT, fontFamily: MONO }}>
                <BookOpen size={12} /> {track.lessons} lessons
              </div>
              <div className="flex items-center gap-1.5 text-[11px]" style={{ color: INK_FAINT, fontFamily: MONO }}>
                <Clock size={12} /> {track.duration}
              </div>
              <div className="hidden sm:flex items-center gap-1.5 text-[11px]" style={{ color: INK_FAINT, fontFamily: MONO }}>
                <Trophy size={12} /> Certificate
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs font-semibold group-hover:gap-2 transition-all"
              style={{ color: COBALT_TX, fontFamily: SANS }}>
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
      className="overflow-hidden mb-12 relative"
      style={{
        background: PAPER_2,
        border: `1.5px solid ${COBALT}`,
        borderRadius: 12,
        boxShadow: '0 24px 64px rgba(36,64,216,0.14)',
      }}
    >
      <div className="h-[3px] w-full" style={{ background: track.color }} />
      <div className="relative px-8 py-7 flex flex-col sm:flex-row items-start sm:items-center gap-6">
        <div className="flex items-center gap-4 flex-1">
          <div className="w-14 h-14 flex items-center justify-center flex-shrink-0"
            style={{ background: `${track.color}14`, border: `1px solid ${track.color}30`, borderRadius: 8 }}>
            <Icon size={26} color={track.color} />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] uppercase tracking-[0.18em]" style={{ color: COBALT_TX, fontFamily: MONO }}>
                Your recommended track
              </span>
              <span className="flex items-center gap-1 text-[9.5px] uppercase tracking-wider px-2 py-0.5 font-semibold"
                style={{ background: 'rgba(36,64,216,0.08)', color: COBALT_TX, borderRadius: 4, fontFamily: MONO }}>
                <Sparkles size={9} /> AI-personalised
              </span>
            </div>
            <h2 className="text-3xl mb-1" style={{ fontFamily: SERIF, fontWeight: 500, letterSpacing: '-0.02em', color: INK }}>
              {track.title}
            </h2>
            <p className="text-sm" style={{ color: INK_SOFT, fontFamily: SANS }}>
              {track.tagline}
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
          <Link
            href={`/assessment/results`}
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold transition-opacity hover:opacity-90 text-white"
            style={{ background: COBALT, borderRadius: 3, fontFamily: SANS }}>
            View my path <ArrowRight size={14} />
          </Link>
          <Link
            href={`/tracks/${track.id}`}
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-black/[0.03]"
            style={{ border: `1px solid ${RULE}`, color: INK, borderRadius: 3, fontFamily: SANS }}>
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
    <section className="relative overflow-hidden">
      <AuroraGlow style={{ width: 620, height: 620, top: -180, left: '50%', transform: 'translateX(-50%)', opacity: 0.5 }} />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: easing }}
        className="relative max-w-2xl mx-auto text-center pt-40 pb-28 px-6"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-7"
          style={{ background: 'rgba(36,64,216,0.08)', color: COBALT_TX, border: `1px solid rgba(36,64,216,0.20)`, borderRadius: 4, fontFamily: MONO }}>
          <Sparkles size={11} /> <span className="text-[11px] uppercase tracking-[0.16em]">2-minute assessment</span>
        </div>
        <h1 className="mb-5" style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 'clamp(2.4rem, 5vw, 3.6rem)', lineHeight: 1.05, letterSpacing: '-0.025em', color: INK }}>
          Your track is built <span style={{ fontStyle: 'italic', color: COBALT_TX }}>around you</span>
        </h1>
        <p className="text-lg mb-9 leading-relaxed max-w-xl mx-auto" style={{ color: INK_SOFT, fontFamily: SANS }}>
          We don&apos;t believe in generic learning. Tell us your role, your goals, and your challenges — we&apos;ll build a curriculum that&apos;s yours alone.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/assessment"
            className="flex items-center gap-2 px-8 py-4 font-semibold text-white text-base transition-opacity hover:opacity-90"
            style={{ background: COBALT, borderRadius: 3, fontFamily: SANS }}>
            <Zap size={16} /> Build my personalised track
          </Link>
          <button
            onClick={onSkip}
            className="text-sm font-medium transition-opacity hover:opacity-60"
            style={{ color: INK_FAINT, fontFamily: SANS }}>
            Browse all tracks instead →
          </button>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-9">
          {['Role-specific curriculum', 'Adjusts to your experience', 'Updates as you grow'].map(t => (
            <div key={t} className="flex items-center gap-1.5 text-xs" style={{ color: INK_FAINT, fontFamily: SANS }}>
              <span style={{ color: '#10B981' }}>✓</span> {t}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function TracksPage() {
  const [recommendedTrackId, setRecommendedTrackId] = useState<string | null>(null)
  const [assessmentLoaded, setAssessmentLoaded] = useState(false)
  const [skipped, setSkipped] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem('opuslearn-assessment')
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
    <main style={{ background: PAPER, minHeight: '100vh' }}>
      <GrainOverlay />
      <EditorialNav active="tracks" />

      {/* Assessment gate */}
      {showGate && <AssessmentGate onSkip={() => setSkipped(true)} />}

      {/* Content — shown when assessment done OR skipped */}
      {(!showGate) && (
        <div>
          {/* Browsing header */}
          {!hasAssessment && (
            <section className="relative overflow-hidden" style={{ borderBottom: `1px solid ${RULE}` }}>
              <AuroraGlow style={{ width: 640, height: 640, top: -220, left: '50%', transform: 'translateX(-50%)', opacity: 0.45 }} />
              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                className="relative max-w-3xl mx-auto text-center pt-40 pb-16 px-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6"
                  style={{ background: PANEL, color: INK_SOFT, border: `1px solid ${RULE}`, borderRadius: 4, fontFamily: MONO }}>
                  <span className="text-[11px] uppercase tracking-[0.16em]">Browsing sample tracks — your content is personalised</span>
                </div>
                <h1 className="mb-5" style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 'clamp(2.6rem, 5.5vw, 4rem)', lineHeight: 1.03, letterSpacing: '-0.03em', color: INK }}>
                  10 tracks. <span style={{ fontStyle: 'italic', color: COBALT_TX }}>One built for you.</span>
                </h1>
                <p className="text-base max-w-xl mx-auto mb-7 leading-relaxed" style={{ color: INK_SOFT, fontFamily: SANS }}>
                  What you see here are the topic areas we cover. Once you take the 3-minute assessment, the lessons, modules, and examples inside your track are rebuilt around your specific role, experience level, and goals.
                </p>
                <Link href="/assessment"
                  className="inline-flex items-center gap-2 px-7 py-3.5 font-semibold text-sm text-white transition-opacity hover:opacity-90"
                  style={{ background: COBALT, borderRadius: 3, fontFamily: SANS }}>
                  <Sparkles size={14} /> Get my personalised track
                </Link>
                <p className="mt-3.5 text-[11px] uppercase tracking-[0.14em]" style={{ color: INK_FAINT, fontFamily: MONO }}>
                  Free during launch · No card needed
                </p>
              </motion.div>
            </section>
          )}

          {/* Personalised header when assessment done */}
          {hasAssessment && (
            <section className="pt-36 pb-10 px-6 text-center" style={{ borderBottom: `1px solid ${RULE}` }}>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-5"
                  style={{ background: 'rgba(36,64,216,0.08)', color: COBALT_TX, border: `1px solid rgba(36,64,216,0.20)`, borderRadius: 4, fontFamily: MONO }}>
                  <Sparkles size={11} /> <span className="text-[11px] uppercase tracking-[0.16em]">Your personalised learning plan</span>
                </div>
                <h1 className="mb-3" style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)', lineHeight: 1.05, letterSpacing: '-0.025em', color: INK }}>
                  Your AI learning path
                </h1>
                <p className="text-base" style={{ color: INK_SOFT, fontFamily: SANS }}>
                  Built around your role, goals, and experience.
                </p>
              </motion.div>
            </section>
          )}

          <div className="max-w-7xl mx-auto px-6 py-14">
            {/* Recommended track hero */}
            {hasAssessment && recommendedTrack && (
              <RecommendedTrackCard track={recommendedTrack} />
            )}

            {/* All tracks label */}
            {hasAssessment && (
              <div className="flex items-center gap-4 mb-7">
                <h2 className="text-[11px] uppercase tracking-[0.2em]" style={{ color: INK_FAINT, fontFamily: MONO }}>
                  All tracks
                </h2>
                <div className="flex-1 h-px" style={{ background: RULE }} />
              </div>
            )}

            {/* Personalisation context banner — shown when browsing without assessment */}
            {!hasAssessment && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 }}
                className="mb-8 p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4"
                style={{ background: PANEL, border: `1px solid ${RULE}`, borderRadius: 10 }}
              >
                <div className="w-10 h-10 flex items-center justify-center flex-shrink-0" style={{ background: COBALT, borderRadius: 6 }}>
                  <Sparkles size={17} className="text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold mb-0.5" style={{ color: INK, fontFamily: SANS }}>
                    These are sample previews
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: INK_SOFT, fontFamily: SANS }}>
                    After the 3-minute assessment, your track content — the modules, lesson order, examples, and exercises — is rebuilt around your role and goals. A Finance VP and a Marketing Manager inside the same Finance track get different content.
                  </p>
                </div>
                <Link href="/assessment" className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white flex-shrink-0 transition-opacity hover:opacity-90"
                  style={{ background: COBALT, borderRadius: 3, fontFamily: SANS }}>
                  Personalise mine <ArrowRight size={12} />
                </Link>
              </motion.div>
            )}

            {/* Track grid */}
            <motion.div
              variants={stagger(0.07)}
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

      <EditorialFooter />
    </main>
  )
}
