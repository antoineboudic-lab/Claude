'use client'

import { motion } from 'framer-motion'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import {
  Megaphone, LineChart, HeartHandshake, TrendingUp,
  Settings, Briefcase, ChevronRight, Clock, BookOpen,
  Trophy, Lock, CheckCircle2, PlayCircle, ArrowLeft,
} from 'lucide-react'
import { getTrack } from '@/lib/curriculum'
import { useGame } from '@/context/GameContext'
import type { TrackId } from '@/lib/curriculum/types'

const easing = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: easing } },
}

const stagger = (delay = 0.08) => ({
  hidden: {},
  visible: { transition: { staggerChildren: delay } },
})

const trackMeta: Record<string, {
  title: string; tagline: string; color: string;
  icon: React.ElementType; description: string;
}> = {
  marketing: { title: 'Marketing', tagline: 'Create, automate, and optimise campaigns with AI', color: '#EC4899', icon: Megaphone, description: 'Master AI tools that give marketers an unfair advantage — from producing better copy in minutes to running smarter campaigns with less effort.' },
  finance: { title: 'Finance', tagline: 'Model, forecast, and report with AI precision', color: '#F59E0B', icon: LineChart, description: 'Apply AI to the work that matters most in finance — faster analysis, sharper forecasts, and board-ready reports without the manual grind.' },
  hr: { title: 'HR', tagline: 'Attract, retain, and develop talent smarter', color: '#10B981', icon: HeartHandshake, description: 'Use AI to find better candidates, personalise the employee experience, and make people decisions backed by real data.' },
  sales: { title: 'Sales', tagline: 'Prospect, pitch, and close with AI as your edge', color: '#8B5CF6', icon: TrendingUp, description: 'Turn AI into your highest-performing team member — researching prospects, drafting proposals, and helping you win more deals.' },
  operations: { title: 'Operations', tagline: 'Automate processes and optimise at every layer', color: '#22D3EE', icon: Settings, description: 'Eliminate operational waste, automate repetitive processes, and build systems that scale — without needing a developer.' },
  leadership: { title: 'Leadership', tagline: 'Lead your organisation into the AI era with confidence', color: '#F97316', icon: Briefcase, description: 'Develop the strategic clarity to lead AI transformation — from setting a compelling vision to managing your team through change.' },
}

const moduleOutlines: Record<string, { title: string; lessons: string[] }[]> = {
  marketing: [
    { title: 'AI Fundamentals for Marketers', lessons: ['What AI actually is (and isn\'t)', 'The AI tools every marketer needs', 'How LLMs understand language', 'Setting up your AI toolkit'] },
    { title: 'AI Copywriting & Content', lessons: ['Writing prompts that produce great copy', 'Creating campaign briefs with AI', 'Repurposing content at scale', 'Maintaining brand voice with AI'] },
    { title: 'Campaign Intelligence', lessons: ['AI-powered market research', 'Competitor analysis with AI', 'Audience segmentation and insights', 'A/B testing strategy with AI'] },
    { title: 'Personalisation & Automation', lessons: ['Email personalisation at scale', 'Social media content automation', 'Dynamic content strategies', 'Building an AI content calendar'] },
    { title: 'Reporting & Strategy', lessons: ['Performance analysis with AI', 'Creating executive reports', 'Forecasting campaign results', 'Your AI-first marketing strategy'] },
  ],
  finance: [
    { title: 'AI Fundamentals for Finance', lessons: ['How AI is reshaping finance', 'AI tools for finance professionals', 'Data literacy for AI-powered work', 'AI ethics and compliance'] },
    { title: 'Financial Analysis with AI', lessons: ['Financial modelling with AI', 'Automating variance analysis', 'Pattern recognition in financial data', 'Scenario planning with AI'] },
    { title: 'Reporting & Documentation', lessons: ['Automating financial reports', 'Board presentation prep with AI', 'Summarising complex documents', 'Creating dashboards with AI'] },
    { title: 'Risk & Forecasting', lessons: ['AI-powered risk assessment', 'Cash flow forecasting', 'Market trend detection', 'Stress testing with AI scenarios'] },
    { title: 'Strategic Finance', lessons: ['AI in M&A due diligence', 'Investor relations with AI', 'Budget planning with AI', 'Building an AI finance function'] },
  ],
  hr: [
    { title: 'AI Fundamentals for HR', lessons: ['AI\'s role in modern HR', 'AI tools for HR professionals', 'Bias and ethics in AI hiring', 'Compliance and data privacy'] },
    { title: 'Talent Acquisition', lessons: ['Writing job descriptions with AI', 'AI-powered candidate screening', 'Reducing bias in hiring', 'Interview prep and assessment'] },
    { title: 'Employee Experience', lessons: ['Personalising onboarding with AI', 'Employee engagement with AI', 'AI feedback and recognition', 'Predictive retention analytics'] },
    { title: 'Learning & Development', lessons: ['Designing AI-powered training', 'Skills gap analysis', 'Personalised career development', 'Measuring L&D effectiveness'] },
    { title: 'HR Operations', lessons: ['Automating HR documentation', 'Policy drafting with AI', 'People analytics for decisions', 'The AI-powered HR function'] },
  ],
  sales: [
    { title: 'AI Fundamentals for Sales', lessons: ['How AI is transforming sales', 'AI sales tools overview', 'Data-driven selling basics', 'Setting up your AI sales stack'] },
    { title: 'Prospecting & Research', lessons: ['AI-powered prospect research', 'Personalised outreach at scale', 'Account intelligence with AI', 'Building ICPs with AI'] },
    { title: 'Sales Communication', lessons: ['AI-assisted proposal writing', 'Email sequences that convert', 'Objection handling with AI', 'Presentation prep with AI'] },
    { title: 'Deal Management', lessons: ['CRM optimisation with AI', 'Deal scoring and prioritisation', 'Forecasting with AI', 'Competitive intelligence'] },
    { title: 'Sales Strategy', lessons: ['Territory planning with AI', 'Coaching teams with AI insights', 'Revenue operations and AI', 'Building a data-driven sales culture'] },
  ],
  operations: [
    { title: 'AI Fundamentals for Operations', lessons: ['AI in the operations landscape', 'Process thinking for AI', 'Key AI tools for operations', 'Change management for AI adoption'] },
    { title: 'Process Automation', lessons: ['Identifying automation opportunities', 'Mapping workflows with AI', 'No-code automation tools', 'Building your first automated workflow'] },
    { title: 'Supply Chain & Logistics', lessons: ['AI in supply chain management', 'Demand forecasting with AI', 'Supplier risk assessment', 'Inventory optimisation'] },
    { title: 'Quality & Documentation', lessons: ['Quality control with AI', 'SOPs with AI assistance', 'Incident reporting and root cause analysis', 'Knowledge management systems'] },
    { title: 'Strategic Operations', lessons: ['KPI analysis with AI', 'Capacity planning', 'Cross-functional AI coordination', 'Building an AI-first operations team'] },
  ],
  leadership: [
    { title: 'AI for Leaders', lessons: ['What every leader must know about AI', 'AI\'s impact on your industry', 'The language of AI without jargon', 'Assessing your org\'s AI readiness'] },
    { title: 'AI Strategy', lessons: ['Developing your AI vision', 'Prioritising AI initiatives', 'Build vs buy vs partner decisions', 'Creating your AI roadmap'] },
    { title: 'Leading AI Transformation', lessons: ['Change management for AI', 'Building a culture of AI adoption', 'Communicating AI strategy', 'Managing resistance and fear'] },
    { title: 'People & Teams', lessons: ['Upskilling your team for AI', 'New roles in an AI world', 'Ethical leadership with AI', 'Talent strategy for AI-first orgs'] },
    { title: 'AI Governance', lessons: ['AI risk management for leaders', 'Regulatory landscape and compliance', 'Communicating AI to the board', 'Measuring AI ROI and impact'] },
  ],
}

export default function TrackPage() {
  const params = useParams()
  const trackId = params.trackId as string
  const meta = trackMeta[trackId]
  const modules = moduleOutlines[trackId]

  if (!meta || !modules) {
    return (
      <main style={{ background: '#07080F', minHeight: '100vh' }} className="flex items-center justify-center">
        <p style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}>Track not found.</p>
      </main>
    )
  }

  const Icon = meta.icon

  return (
    <main style={{ background: '#07080F', minHeight: '100vh' }}>
      {/* Hero */}
      <div className="relative overflow-hidden" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse at 20% 50%, ${meta.color}14 0%, transparent 60%)` }}
        />
        <div className="max-w-5xl mx-auto px-6 pt-28 pb-16">
          <Link
            href="/tracks"
            className="inline-flex items-center gap-1.5 text-sm mb-8 transition-colors hover:text-slate-300"
            style={{ color: '#475569', fontFamily: 'var(--font-sans)' }}
          >
            <ArrowLeft size={14} />
            All tracks
          </Link>

          <motion.div
            variants={stagger(0.12)}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeUp} className="flex items-center gap-4 mb-6">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{ background: `${meta.color}18`, border: `1px solid ${meta.color}30` }}
              >
                <Icon size={26} color={meta.color} />
              </div>
              <div>
                <p className="text-xs font-semibold mb-0.5" style={{ color: meta.color, fontFamily: 'var(--font-sans)' }}>
                  Role Track
                </p>
                <h1 className="text-3xl font-black" style={{ fontFamily: 'var(--font-sans)', color: '#F1F5F9' }}>
                  {meta.title}
                </h1>
              </div>
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="text-lg max-w-2xl mb-8 leading-relaxed"
              style={{ color: '#94A3B8', fontFamily: 'var(--font-sans)' }}
            >
              {meta.description}
            </motion.p>

            <motion.div variants={fadeUp} className="flex items-center gap-6 mb-8">
              {[
                { icon: BookOpen, label: '20 lessons' },
                { icon: Clock, label: '~6 hours' },
                { icon: Trophy, label: 'Certificate included' },
              ].map(({ icon: I, label }) => (
                <div key={label} className="flex items-center gap-1.5 text-sm" style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}>
                  <I size={14} />
                  {label}
                </div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp}>
              <Link
                href={`/tracks/${trackId}/lessons/${trackId}-m1-l1`}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm text-white transition-all hover:scale-105"
                style={{ background: `linear-gradient(135deg, ${meta.color}, ${meta.color}bb)`, fontFamily: 'var(--font-sans)' }}
              >
                <PlayCircle size={16} />
                Start Track
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Modules */}
      <div className="max-w-5xl mx-auto px-6 py-16 space-y-5">
        <h2 className="text-xl font-black mb-8" style={{ fontFamily: 'var(--font-sans)', color: '#F1F5F9' }}>
          Course Curriculum
        </h2>
        {modules.map((mod, mi) => (
          <motion.div
            key={mod.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: mi * 0.08, duration: 0.5 }}
            className="rounded-2xl overflow-hidden"
            style={{ background: 'rgba(13,17,23,0.6)', border: '1px solid rgba(255,255,255,0.07)' }}
          >
            {/* Module header */}
            <div
              className="px-6 py-4 flex items-center justify-between"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black"
                  style={{ background: `${meta.color}18`, color: meta.color, fontFamily: 'var(--font-sans)' }}
                >
                  {mi + 1}
                </div>
                <h3 className="font-bold text-sm" style={{ fontFamily: 'var(--font-sans)', color: '#F1F5F9' }}>
                  {mod.title}
                </h3>
              </div>
              <span className="text-xs" style={{ color: '#475569', fontFamily: 'var(--font-sans)' }}>
                {mod.lessons.length} lessons
              </span>
            </div>

            {/* Lessons */}
            <div className="divide-y" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
              {mod.lessons.map((lesson, li) => {
                const lessonId = `${trackId}-m${mi + 1}-l${li + 1}`
                const isUnlocked = mi === 0
                return (
                  <div key={lesson} className="px-6 py-3.5 flex items-center justify-between group">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 flex-shrink-0">
                        {isUnlocked
                          ? <PlayCircle size={16} color={meta.color} />
                          : <Lock size={14} color="#334155" />
                        }
                      </div>
                      <span
                        className="text-sm"
                        style={{
                          color: isUnlocked ? '#CBD5E1' : '#334155',
                          fontFamily: 'var(--font-sans)',
                        }}
                      >
                        {lesson}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs" style={{ color: '#334155', fontFamily: 'var(--font-sans)' }}>
                        15 min
                      </span>
                      {isUnlocked && (
                        <Link
                          href={`/tracks/${trackId}/lessons/${lessonId}`}
                          className="text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1"
                          style={{ color: meta.color, fontFamily: 'var(--font-sans)' }}
                        >
                          Start <ChevronRight size={12} />
                        </Link>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </main>
  )
}
