'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Megaphone, LineChart, HeartHandshake, TrendingUp,
  Settings, Briefcase, User, ArrowLeft, ArrowRight,
  Check, Zap, Clock, Target, Users, TrendingUp as Trend,
  Star, Brain,
} from 'lucide-react'
import type { AssessmentAnswers, Role, Experience, TimeCommitment } from '@/lib/assessment/types'
import { buildAssessmentResult } from '@/lib/assessment/engine'
import { useAuth } from '@/context/AuthContext'
import { saveAssessment } from '@/lib/supabase/db'

// ─── Step data ───────────────────────────────────────────────────────────────

const ROLES: { id: Role; label: string; icon: React.ElementType; color: string; detail: string }[] = [
  { id: 'marketing', label: 'Marketing', icon: Megaphone, color: '#EC4899', detail: 'Brand, content, campaigns, growth' },
  { id: 'finance', label: 'Finance', icon: LineChart, color: '#F59E0B', detail: 'FP&A, reporting, treasury, accounting' },
  { id: 'hr', label: 'HR & People', icon: HeartHandshake, color: '#10B981', detail: 'Talent, L&D, employee experience' },
  { id: 'sales', label: 'Sales', icon: TrendingUp, color: '#8B5CF6', detail: 'Revenue, account management, BD' },
  { id: 'operations', label: 'Operations', icon: Settings, color: '#22D3EE', detail: 'Process, supply chain, quality' },
  { id: 'leadership', label: 'Leadership', icon: Briefcase, color: '#F97316', detail: 'CEO, Director, VP, C-suite' },
  { id: 'other', label: 'Other', icon: User, color: '#94A3B8', detail: 'Something else entirely' },
]

const EXPERIENCE: { id: Experience; label: string; detail: string; emoji: string }[] = [
  { id: 'none', label: 'Complete beginner', detail: "I've barely touched AI tools", emoji: '🌱' },
  { id: 'some', label: 'Some exposure', detail: "I've tried ChatGPT or similar", emoji: '🚀' },
  { id: 'regular', label: 'Regular user', detail: 'I use AI tools at least weekly', emoji: '⚡' },
]

const CHALLENGES: Record<string, { id: string; label: string; detail: string }[]> = {
  marketing: [
    { id: 'content-volume', label: 'Creating enough content', detail: 'Quality output across all channels takes too long' },
    { id: 'personalization', label: 'Generic campaigns', detail: 'Hard to personalise at scale' },
    { id: 'roi-proof', label: 'Proving ROI', detail: "Difficult to show marketing's real impact" },
    { id: 'competitor-speed', label: 'Slow vs. competitors', detail: 'Competitors move faster than our team can' },
  ],
  finance: [
    { id: 'manual-reporting', label: 'Slow reporting', detail: 'Reports take days instead of hours' },
    { id: 'forecast-accuracy', label: 'Inaccurate forecasts', detail: 'Projections miss too often' },
    { id: 'data-silos', label: 'Fragmented data', detail: 'Numbers scattered across systems' },
    { id: 'communication', label: 'Stakeholder buy-in', detail: 'Hard to tell the story behind the numbers' },
  ],
  hr: [
    { id: 'recruiting-time', label: 'Slow hiring', detail: 'Too much time spent on recruitment admin' },
    { id: 'employee-scale', label: 'Scaling support', detail: "Can't personalise employee experience at scale" },
    { id: 'people-data', label: 'Using people data', detail: 'Struggle to turn HR analytics into action' },
    { id: 'hr-change', label: 'Driving change', detail: 'Getting the organisation to adopt new ways of working' },
  ],
  sales: [
    { id: 'prospecting', label: 'Slow prospecting', detail: 'Finding and qualifying leads takes too long' },
    { id: 'pitch-personalization', label: 'Generic pitches', detail: "Can't tailor proposals to each prospect" },
    { id: 'deal-risk', label: 'Missed deal signals', detail: 'Not seeing warning signs early enough' },
    { id: 'sales-admin', label: 'Too much admin', detail: 'CRM and paperwork instead of selling' },
  ],
  operations: [
    { id: 'process-docs', label: 'Knowledge in silos', detail: "Processes live in people's heads, not documents" },
    { id: 'supply-chain', label: 'Supply chain visibility', detail: 'Hard to anticipate and respond to disruptions' },
    { id: 'quality-detection', label: 'Late quality detection', detail: 'Problems caught too late in the cycle' },
    { id: 'slow-reporting', label: 'Slow reporting', detail: 'Operational reports take too long to compile' },
  ],
  leadership: [
    { id: 'ai-strategy', label: 'No clear AI strategy', detail: 'Not sure where to start or how to prioritise' },
    { id: 'team-resistance', label: 'Team resistance', detail: 'People are sceptical or afraid of AI change' },
    { id: 'business-case', label: 'Building the business case', detail: 'Struggling to get board or leadership buy-in' },
    { id: 'ai-governance', label: 'Governance gaps', detail: 'No clear guidelines for responsible AI use' },
  ],
  other: [
    { id: 'general', label: 'Saving time', detail: 'Too much time on repetitive, manual work' },
    { id: 'better-decisions', label: 'Making better decisions', detail: 'Need better information to decide well' },
    { id: 'lead-ai', label: 'Leading AI in my org', detail: 'Need to guide others through AI change' },
    { id: 'client-value', label: 'Delivering more value', detail: 'Want AI to help me serve others better' },
  ],
}

const GOALS: { id: string; label: string; detail: string; icon: React.ElementType }[] = [
  { id: 'save-time', label: 'Save time', detail: 'Automate repetitive tasks', icon: Clock },
  { id: 'better-decisions', label: 'Better decisions', detail: 'Use data and AI analysis', icon: Target },
  { id: 'lead-ai', label: 'Lead AI adoption', detail: 'Build strategy and drive change', icon: Brain },
  { id: 'stay-competitive', label: 'Stay competitive', detail: 'Develop in-demand AI skills', icon: Trend },
  { id: 'upskill-team', label: 'Upskill my team', detail: 'Help colleagues grow capability', icon: Users },
  { id: 'client-value', label: 'Deliver more value', detail: 'Better serve customers and clients', icon: Star },
]

const TIME_OPTIONS: { id: TimeCommitment; label: string; detail: string; weeks: string }[] = [
  { id: 'light', label: '~30 min / week', detail: 'One lesson at a time, no rush', weeks: '~20 weeks' },
  { id: 'moderate', label: '1–2 hours / week', detail: 'Steady consistent progress', weeks: '~8 weeks' },
  { id: 'intensive', label: '3+ hours / week', detail: 'Fast-track to proficiency', weeks: '~4 weeks' },
]

// ─── Animation variants ───────────────────────────────────────────────────────

const slideIn = {
  hidden: (dir: number) => ({ opacity: 0, x: dir * 40 }),
  visible: { opacity: 1, x: 0, transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
  exit: (dir: number) => ({ opacity: 0, x: -dir * 40, transition: { duration: 0.25 } }),
}

const PROCESSING_STEPS = [
  'Analysing your role and experience…',
  'Mapping your goals to the curriculum…',
  'Selecting your priority lessons…',
  'Building your personalised path…',
]

// ─── Component ────────────────────────────────────────────────────────────────

type StepId = 'welcome' | 'role' | 'experience' | 'challenge' | 'goals' | 'time' | 'processing'
const STEPS: StepId[] = ['welcome', 'role', 'experience', 'challenge', 'goals', 'time', 'processing']

const DEFAULT_ANSWERS: AssessmentAnswers = {
  name: '',
  role: 'marketing',
  experience: 'none',
  challenge: '',
  goals: [],
  timePerWeek: 'moderate',
}

export default function AssessmentPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [stepIdx, setStepIdx] = useState(0)
  const [direction, setDirection] = useState(1)
  const [answers, setAnswers] = useState<AssessmentAnswers>(DEFAULT_ANSWERS)
  const [processingStep, setProcessingStep] = useState(0)

  const currentStep = STEPS[stepIdx]
  const progressSteps = STEPS.length - 1

  function goNext() {
    setDirection(1)
    setStepIdx(i => i + 1)
  }

  function goBack() {
    setDirection(-1)
    setStepIdx(i => i - 1)
  }

  useEffect(() => {
    if (currentStep !== 'processing') return

    let idx = 0
    const interval = setInterval(() => {
      idx++
      setProcessingStep(idx)
      if (idx >= PROCESSING_STEPS.length) {
        clearInterval(interval)
        setTimeout(async () => {
          try {
            const result = buildAssessmentResult(answers)
            localStorage.setItem('ai-literacy-assessment', JSON.stringify(result))
            if (user) {
              await saveAssessment(user.id, result).catch(() => {})
            }
          } catch {
            // ignore
          }
          router.push('/assessment/results')
        }, 600)
      }
    }, 700)

    return () => clearInterval(interval)
  }, [currentStep, answers, router])

  function canProceed(): boolean {
    if (currentStep === 'welcome') return answers.name.trim().length > 0
    if (currentStep === 'role') return true
    if (currentStep === 'experience') return true
    if (currentStep === 'challenge') return answers.challenge !== ''
    if (currentStep === 'goals') return answers.goals.length > 0
    if (currentStep === 'time') return true
    return false
  }

  const challenges = CHALLENGES[answers.role] ?? CHALLENGES.other

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#F8FAFC' }}>
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

        {currentStep !== 'processing' && (
          <div className="flex items-center gap-3">
            <span className="text-xs" style={{ color: '#94A3B8', fontFamily: 'var(--font-sans)' }}>
              Step {Math.min(stepIdx + 1, progressSteps)} of {progressSteps}
            </span>
            <div className="flex gap-1.5">
              {STEPS.slice(0, progressSteps).map((_, i) => (
                <div
                  key={i}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === stepIdx ? 20 : 8,
                    height: 8,
                    background: i <= stepIdx
                      ? 'linear-gradient(90deg, #7C3AED, #22D3EE)'
                      : '#E2E8F0',
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait" custom={direction}>

            {/* ── Welcome ── */}
            {currentStep === 'welcome' && (
              <motion.div key="welcome" custom={direction} variants={slideIn} initial="hidden" animate="visible" exit="exit">
                <div className="text-center mb-10">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-xs font-semibold"
                    style={{ background: '#EDE9FE', color: '#7C3AED', fontFamily: 'var(--font-sans)' }}>
                    <Zap size={11} /> 2-minute assessment
                  </div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4" style={{ fontFamily: 'var(--font-sans)', color: '#0F172A' }}>
                    Find your perfect<br />
                    <span style={{ background: 'linear-gradient(90deg, #7C3AED, #22D3EE)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                      AI learning path
                    </span>
                  </h1>
                  <p className="text-lg" style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}>
                    Answer 5 quick questions and we'll build a personalised curriculum around your role, goals, and experience.
                  </p>
                </div>

                <div className="space-y-3 mb-8">
                  <label className="block text-sm font-medium mb-2" style={{ color: '#334155', fontFamily: 'var(--font-sans)' }}>
                    What's your name?
                  </label>
                  <input
                    type="text"
                    placeholder="Your first name"
                    value={answers.name}
                    onChange={e => setAnswers(a => ({ ...a, name: e.target.value }))}
                    onKeyDown={e => e.key === 'Enter' && canProceed() && goNext()}
                    autoFocus
                    className="w-full px-5 py-4 rounded-xl text-base outline-none transition-all"
                    style={{
                      background: '#FFFFFF',
                      border: '1px solid #CBD5E1',
                      color: '#0F172A',
                      fontFamily: 'var(--font-sans)',
                    }}
                    onFocus={e => { e.currentTarget.style.borderColor = '#7C3AED' }}
                    onBlur={e => { e.currentTarget.style.borderColor = '#CBD5E1' }}
                  />
                </div>

                <NavButtons canProceed={canProceed()} onNext={goNext} isFirst />
              </motion.div>
            )}

            {/* ── Role ── */}
            {currentStep === 'role' && (
              <motion.div key="role" custom={direction} variants={slideIn} initial="hidden" animate="visible" exit="exit">
                <StepHeader
                  question={`What best describes your role, ${answers.name}?`}
                  sub="This shapes which track we recommend and how we personalise it."
                />
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-8">
                  {ROLES.map(role => {
                    const Icon = role.icon
                    const selected = answers.role === role.id
                    return (
                      <button
                        key={role.id}
                        onClick={() => setAnswers(a => ({ ...a, role: role.id }))}
                        className="p-4 rounded-2xl text-left transition-all hover:scale-[1.02] active:scale-[0.98]"
                        style={{
                          background: selected ? `${role.color}08` : '#FFFFFF',
                          border: `1px solid ${selected ? role.color : '#E2E8F0'}`,
                          boxShadow: selected ? `0 0 0 1px ${role.color}30` : '0 1px 2px rgba(0,0,0,0.04)',
                        }}
                      >
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                          style={{ background: `${role.color}12` }}>
                          <Icon size={18} color={role.color} />
                        </div>
                        <div className="text-sm font-semibold mb-1" style={{ fontFamily: 'var(--font-sans)', color: '#0F172A' }}>
                          {role.label}
                        </div>
                        <div className="text-xs leading-snug" style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}>
                          {role.detail}
                        </div>
                        {selected && (
                          <div className="mt-2 flex justify-end">
                            <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: role.color }}>
                              <Check size={11} className="text-white" />
                            </div>
                          </div>
                        )}
                      </button>
                    )
                  })}
                </div>
                <NavButtons canProceed onNext={goNext} onBack={goBack} />
              </motion.div>
            )}

            {/* ── Experience ── */}
            {currentStep === 'experience' && (
              <motion.div key="experience" custom={direction} variants={slideIn} initial="hidden" animate="visible" exit="exit">
                <StepHeader
                  question="How familiar are you with AI tools?"
                  sub="Be honest — this helps us set the right starting point."
                />
                <div className="space-y-3 mb-8">
                  {EXPERIENCE.map(exp => {
                    const selected = answers.experience === exp.id
                    return (
                      <button
                        key={exp.id}
                        onClick={() => setAnswers(a => ({ ...a, experience: exp.id }))}
                        className="w-full flex items-center gap-4 p-5 rounded-2xl text-left transition-all hover:scale-[1.01]"
                        style={{
                          background: selected ? '#EDE9FE' : '#FFFFFF',
                          border: `1px solid ${selected ? '#7C3AED' : '#E2E8F0'}`,
                          boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
                        }}
                      >
                        <span className="text-2xl">{exp.emoji}</span>
                        <div className="flex-1">
                          <div className="text-base font-semibold" style={{ fontFamily: 'var(--font-sans)', color: '#0F172A' }}>
                            {exp.label}
                          </div>
                          <div className="text-sm mt-0.5" style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}>
                            {exp.detail}
                          </div>
                        </div>
                        {selected && (
                          <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{ background: 'linear-gradient(135deg, #7C3AED, #22D3EE)' }}>
                            <Check size={13} className="text-white" />
                          </div>
                        )}
                      </button>
                    )
                  })}
                </div>
                <NavButtons canProceed onNext={goNext} onBack={goBack} />
              </motion.div>
            )}

            {/* ── Challenge ── */}
            {currentStep === 'challenge' && (
              <motion.div key="challenge" custom={direction} variants={slideIn} initial="hidden" animate="visible" exit="exit">
                <StepHeader
                  question="What's your biggest challenge right now?"
                  sub="We'll make sure your path tackles this head-on."
                />
                <div className="space-y-3 mb-8">
                  {challenges.map(ch => {
                    const selected = answers.challenge === ch.id
                    return (
                      <button
                        key={ch.id}
                        onClick={() => setAnswers(a => ({ ...a, challenge: ch.id }))}
                        className="w-full flex items-center gap-4 p-5 rounded-2xl text-left transition-all hover:scale-[1.01]"
                        style={{
                          background: selected ? '#ECFEFF' : '#FFFFFF',
                          border: `1px solid ${selected ? '#22D3EE' : '#E2E8F0'}`,
                          boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
                        }}
                      >
                        <div className="flex-1">
                          <div className="text-base font-semibold" style={{ fontFamily: 'var(--font-sans)', color: '#0F172A' }}>
                            {ch.label}
                          </div>
                          <div className="text-sm mt-0.5" style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}>
                            {ch.detail}
                          </div>
                        </div>
                        {selected && (
                          <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{ background: 'linear-gradient(135deg, #22D3EE, #7C3AED)' }}>
                            <Check size={13} className="text-white" />
                          </div>
                        )}
                      </button>
                    )
                  })}
                </div>
                <NavButtons canProceed={canProceed()} onNext={goNext} onBack={goBack} />
              </motion.div>
            )}

            {/* ── Goals ── */}
            {currentStep === 'goals' && (
              <motion.div key="goals" custom={direction} variants={slideIn} initial="hidden" animate="visible" exit="exit">
                <StepHeader
                  question="What do you want to achieve with AI?"
                  sub="Choose up to 2 goals — we'll weight your path accordingly."
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {GOALS.map(goal => {
                    const selected = answers.goals.includes(goal.id)
                    const maxed = answers.goals.length >= 2 && !selected
                    const Icon = goal.icon
                    return (
                      <button
                        key={goal.id}
                        disabled={maxed}
                        onClick={() => {
                          setAnswers(a => ({
                            ...a,
                            goals: selected
                              ? a.goals.filter(g => g !== goal.id)
                              : [...a.goals, goal.id],
                          }))
                        }}
                        className="p-4 rounded-2xl text-left transition-all hover:scale-[1.02] disabled:opacity-40"
                        style={{
                          background: selected ? '#EDE9FE' : '#FFFFFF',
                          border: `1px solid ${selected ? '#7C3AED' : '#E2E8F0'}`,
                          boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
                        }}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                            style={{ background: selected ? '#DDD6FE' : '#F8FAFC' }}>
                            <Icon size={16} color={selected ? '#7C3AED' : '#94A3B8'} />
                          </div>
                          {selected && (
                            <div className="w-5 h-5 rounded-full flex items-center justify-center"
                              style={{ background: 'linear-gradient(135deg, #7C3AED, #22D3EE)' }}>
                              <Check size={11} className="text-white" />
                            </div>
                          )}
                        </div>
                        <div className="text-sm font-semibold mb-1" style={{ fontFamily: 'var(--font-sans)', color: '#0F172A' }}>
                          {goal.label}
                        </div>
                        <div className="text-xs" style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}>
                          {goal.detail}
                        </div>
                      </button>
                    )
                  })}
                </div>
                <NavButtons canProceed={canProceed()} onNext={goNext} onBack={goBack} />
              </motion.div>
            )}

            {/* ── Time ── */}
            {currentStep === 'time' && (
              <motion.div key="time" custom={direction} variants={slideIn} initial="hidden" animate="visible" exit="exit">
                <StepHeader
                  question="How much time can you commit each week?"
                  sub="We'll estimate your completion timeline based on this."
                />
                <div className="space-y-3 mb-8">
                  {TIME_OPTIONS.map(opt => {
                    const selected = answers.timePerWeek === opt.id
                    return (
                      <button
                        key={opt.id}
                        onClick={() => setAnswers(a => ({ ...a, timePerWeek: opt.id }))}
                        className="w-full flex items-center gap-4 p-5 rounded-2xl text-left transition-all hover:scale-[1.01]"
                        style={{
                          background: selected ? '#FFF7ED' : '#FFFFFF',
                          border: `1px solid ${selected ? '#F97316' : '#E2E8F0'}`,
                          boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
                        }}
                      >
                        <div className="flex-1">
                          <div className="text-base font-semibold" style={{ fontFamily: 'var(--font-sans)', color: '#0F172A' }}>
                            {opt.label}
                          </div>
                          <div className="text-sm mt-0.5" style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}>
                            {opt.detail}
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="text-xs font-semibold" style={{ color: selected ? '#F97316' : '#CBD5E1', fontFamily: 'var(--font-sans)' }}>
                            {opt.weeks}
                          </div>
                        </div>
                        {selected && (
                          <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{ background: '#F97316' }}>
                            <Check size={13} className="text-white" />
                          </div>
                        )}
                      </button>
                    )
                  })}
                </div>
                <NavButtons canProceed onNext={goNext} onBack={goBack} isLast nextLabel="Build My Path" />
              </motion.div>
            )}

            {/* ── Processing ── */}
            {currentStep === 'processing' && (
              <motion.div key="processing" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-16">
                <div className="relative w-24 h-24 mx-auto mb-10">
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{ border: '2px solid transparent', borderTopColor: '#7C3AED' }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
                  />
                  <motion.div
                    className="absolute inset-3 rounded-full"
                    style={{ border: '2px solid transparent', borderTopColor: '#22D3EE' }}
                    animate={{ rotate: -360 }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
                  />
                  <div className="absolute inset-7 rounded-full flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #EDE9FE, #ECFEFF)' }}>
                    <Zap size={18} color="#7C3AED" />
                  </div>
                </div>

                <h2 className="text-2xl font-black mb-4" style={{ fontFamily: 'var(--font-sans)', color: '#0F172A' }}>
                  Building your path…
                </h2>

                <div className="space-y-2 max-w-xs mx-auto">
                  {PROCESSING_STEPS.map((step, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: processingStep > i ? 1 : 0.3, x: 0 }}
                      className="flex items-center gap-2 text-sm"
                      style={{ color: processingStep > i ? '#334155' : '#CBD5E1', fontFamily: 'var(--font-sans)' }}
                    >
                      {processingStep > i
                        ? <Check size={13} color="#22D3EE" />
                        : <div className="w-3 h-3 rounded-full border border-slate-200" />}
                      {step}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function StepHeader({ question, sub }: { question: string; sub: string }) {
  return (
    <div className="mb-8">
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-black mb-3" style={{ fontFamily: 'var(--font-sans)', color: '#0F172A' }}>
        {question}
      </h2>
      <p className="text-base" style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}>
        {sub}
      </p>
    </div>
  )
}

function NavButtons({
  canProceed,
  onNext,
  onBack,
  isFirst = false,
  isLast = false,
  nextLabel = 'Continue',
}: {
  canProceed: boolean
  onNext: () => void
  onBack?: () => void
  isFirst?: boolean
  isLast?: boolean
  nextLabel?: string
}) {
  return (
    <div className="flex items-center gap-3">
      {!isFirst && onBack && (
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all hover:bg-slate-100"
          style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}
        >
          <ArrowLeft size={15} /> Back
        </button>
      )}
      <button
        onClick={onNext}
        disabled={!canProceed}
        className="flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-semibold text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
        style={{
          background: canProceed
            ? 'linear-gradient(135deg, #7C3AED, #22D3EE)'
            : '#E2E8F0',
          color: canProceed ? '#FFFFFF' : '#94A3B8',
          boxShadow: canProceed ? '0 4px 14px rgba(124,58,237,0.25)' : 'none',
          fontFamily: 'var(--font-sans)',
        }}
      >
        {nextLabel} <ArrowRight size={15} />
      </button>
    </div>
  )
}
