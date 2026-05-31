'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import {
  Megaphone, LineChart, HeartHandshake, TrendingUp,
  Settings, Briefcase, ChevronRight, Clock, BookOpen,
  Trophy, Lock, CheckCircle2, PlayCircle, ArrowLeft, Zap, LogOut,
  Scale, Package, Headphones, BarChart, ArrowRight, Users, Sparkles, Search,
} from 'lucide-react'
import Logo from '@/components/Logo'
import { getTrack } from '@/lib/curriculum'
import { useGame } from '@/context/GameContext'
import { useAuth } from '@/context/AuthContext'
import type { TrackId } from '@/lib/curriculum/types'
import GlobalSearch from '@/components/GlobalSearch'

const easing = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number]

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easing } },
}

const stagger = (delay = 0.08) => ({
  hidden: {},
  visible: { transition: { staggerChildren: delay } },
})

const trackMeta: Record<string, {
  title: string; tagline: string; color: string;
  icon: React.ElementType; description: string;
  whoFor: string[]; beforeAfter: { before: string; after: string }[];
}> = {
  marketing: {
    title: 'Marketing', tagline: 'Create, automate, and optimise campaigns with AI', color: '#E04D2A', icon: Megaphone,
    description: 'Master AI tools that give marketers an unfair advantage — from producing better copy in minutes to running smarter campaigns with less effort.',
    whoFor: ['You manage campaigns, briefs, or content and want AI to free you up for strategy', 'You produce copy, assets, or reports and want professional output faster', "You're responsible for marketing ROI and want sharper analysis without more headcount"],
    beforeAfter: [{ before: '3 hours writing a campaign brief from scratch', after: '20 min AI draft, 30 min refinement' }, { before: 'Weeks to build a full content calendar', after: 'First draft in under an hour' }, { before: 'Manual competitor analysis taking a full day', after: 'Structured analysis in 15 minutes' }],
  },
  finance: {
    title: 'Finance', tagline: 'Model, forecast, and report with AI precision', color: '#F59E0B', icon: LineChart,
    description: 'Apply AI to the work that matters most in finance — faster analysis, sharper forecasts, and board-ready reports without the manual grind.',
    whoFor: ['You spend hours building financial models or preparing board-ready reports', 'You own forecasting, budgeting, or analysis work that is increasingly time-pressured', 'You want to produce more rigorous analysis with the same team and timeline'],
    beforeAfter: [{ before: 'Half a day building a variance analysis', after: 'Draft model in 30 min, you refine assumptions' }, { before: 'Board pack prep taking 2–3 days', after: 'First draft in 4 hours' }, { before: 'Manual data aggregation before any analysis', after: 'Structured and ready in minutes' }],
  },
  hr: {
    title: 'HR', tagline: 'Attract, retain, and develop talent smarter', color: '#10B981', icon: HeartHandshake,
    description: 'Use AI to find better candidates, personalise the employee experience, and make people decisions backed by real data.',
    whoFor: ['You lead talent acquisition, L&D, or HR operations and feel stretched across priorities', 'You manage employee experience programmes and want better data behind your decisions', "You're being asked to develop an AI strategy for your function and aren't sure where to start"],
    beforeAfter: [{ before: 'Writing job descriptions manually for every role', after: 'Strong first draft in 5 minutes' }, { before: 'Reviewing 200 CVs before any shortlisting', after: 'AI-filtered shortlist, you do final review' }, { before: "Building L&D programmes from a blank slide", after: 'Structured framework with content in hours' }],
  },
  sales: {
    title: 'Sales', tagline: 'Prospect, pitch, and close with AI as your edge', color: '#3B82F6', icon: TrendingUp,
    description: 'Turn AI into your highest-performing team member — researching prospects, drafting proposals, and helping you win more deals.',
    whoFor: ['You carry a quota and want to spend more time on high-leverage activities', 'You run a sales team and want reps producing better proposals, faster', "You're losing deals on proposal quality or speed, not on product"],
    beforeAfter: [{ before: 'Full day writing a complex proposal', after: 'High-quality first draft in 2–3 hours' }, { before: 'Manually researching each prospect before a call', after: 'Full account brief in 10 minutes' }, { before: 'Generic outreach that gets ignored', after: 'Personalised sequences that get replies' }],
  },
  operations: {
    title: 'Operations', tagline: 'Automate processes and optimise at every layer', color: '#22D3EE', icon: Settings,
    description: 'Eliminate operational waste, automate repetitive processes, and build systems that scale — without needing a developer.',
    whoFor: ['You own processes that are repetitive, error-prone, or slow — and know they can be better', "You're responsible for supply chain, quality, or capacity decisions that depend on synthesising large datasets", 'You want to automate without needing to write code or hire developers'],
    beforeAfter: [{ before: 'Manual data aggregation across 5 systems', after: 'Automated summary ready each morning' }, { before: 'SOPs written by hand and rarely updated', after: 'AI-drafted, version-controlled, searchable' }, { before: 'Hours of analysis before capacity decisions', after: 'AI-modelled scenarios in minutes' }],
  },
  leadership: {
    title: 'Leadership', tagline: 'Lead your organisation into the AI era with confidence', color: '#F97316', icon: Briefcase,
    description: 'Develop the strategic clarity to lead AI transformation — from setting a compelling vision to managing your team through change.',
    whoFor: ['You lead a team, department, or business unit and need to set AI direction without being a technical expert', "You're getting board-level pressure to develop an AI strategy and want to lead from the front", "You're managing people who are anxious about AI and want to handle it with clarity and confidence"],
    beforeAfter: [{ before: 'Vague AI strategy that produces no action', after: 'Concrete roadmap with prioritised initiatives' }, { before: 'Team anxiety about AI replacing jobs', after: 'Clear framing that builds confidence' }, { before: 'Technology decisions driven by vendors', after: 'Informed build/buy/partner decisions' }],
  },
  legal: {
    title: 'Legal', tagline: 'Review, research, and advise with AI confidence', color: '#0284C7', icon: Scale,
    description: 'Apply AI to the most time-intensive parts of legal work — from contract review and due diligence to research, drafting, and client communication.',
    whoFor: ["You're in-house counsel or in a firm and spend significant time on contract review or legal research", 'You want to increase output without compromising the rigour your clients or colleagues depend on', "You're being asked about AI governance and want to understand the landscape before recommending policy"],
    beforeAfter: [{ before: 'First-pass contract review taking 2–4 hours', after: 'AI issues summary in 20 minutes, you apply judgment' }, { before: 'Legal research taking a full day per matter', after: 'Structured first-pass in 1–2 hours' }, { before: 'Client memos written from scratch each time', after: 'Strong first draft in minutes' }],
  },
  product: {
    title: 'Product', tagline: 'Discover, prioritise, and ship better products with AI', color: '#14B8A6', icon: Package,
    description: 'Use AI to accelerate discovery, sharpen prioritisation, write better specs, and make faster, more confident product decisions.',
    whoFor: ['You lead product discovery, strategy, or roadmap and want to compress the time from insight to decision', 'You write PRDs, synthesise user research, or manage a backlog growing faster than you can prioritise', 'You want to spend more time on judgment calls and less on the production work that precedes them'],
    beforeAfter: [{ before: '2 weeks to synthesise a discovery sprint', after: 'Key patterns identified in hours' }, { before: 'PRD writing taking a full day', after: 'Strong first draft in 90 minutes' }, { before: 'Competitive analysis assembled manually', after: 'Structured comparison in 20 minutes' }],
  },
  customer: {
    title: 'Customer Success', tagline: 'Retain, expand, and delight customers with AI', color: '#DC2626', icon: Headphones,
    description: 'Scale your customer coverage without sacrificing quality — using AI to monitor health, prevent churn, and personalise every interaction.',
    whoFor: ['You manage a portfolio of accounts and want better visibility into which ones need attention before it is too late', "You're responsible for retention metrics and want to act on early signals, not lagging indicators", 'You run a CS team and want your CSMs spending time on relationships, not manual data review'],
    beforeAfter: [{ before: 'Churn caught too late to recover', after: 'At-risk accounts flagged weeks earlier' }, { before: 'Generic QBR decks for every account', after: 'Personalised prep in 20 minutes per account' }, { before: 'Health scoring done manually and inconsistently', after: 'Automated signals, you focus on action' }],
  },
  consulting: {
    title: 'Consulting', tagline: 'Research, analyse, and deliver with AI as your edge', color: '#0EA5E9', icon: BarChart,
    description: 'Cut research and production time dramatically — so you can spend more time on the judgment, relationships, and strategic thinking that clients actually pay for.',
    whoFor: ['You work in strategy, management consulting, or professional services with high analytical demands', 'You spend significant time on desk research, client readouts, or slide production', 'You want to deliver more original analysis and spend less time on the production work that precedes it'],
    beforeAfter: [{ before: '3 days of desk research before you can frame the problem', after: 'First-pass landscape in 4–8 hours' }, { before: 'Slide production consuming most of a sprint', after: 'Structured first draft in hours' }, { before: 'Benchmarking done manually across multiple sources', after: 'Aggregated and formatted in minutes' }],
  },
}

const moduleOutlines: Record<string, { title: string; lessons: string[] }[]> = {
  marketing: [
    { title: 'AI Fundamentals for Marketers', lessons: ["What AI actually is (and isn't)", 'The AI tools every marketer needs', 'How LLMs understand language', 'Setting up your AI toolkit'] },
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
    { title: 'AI Fundamentals for HR', lessons: ["AI's role in modern HR", 'AI tools for HR professionals', 'Bias and ethics in AI hiring', 'Compliance and data privacy'] },
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
    { title: 'AI for Leaders', lessons: ['What every leader must know about AI', "AI's impact on your industry", 'The language of AI without jargon', "Assessing your org's AI readiness"] },
    { title: 'AI Strategy', lessons: ['Developing your AI vision', 'Prioritising AI initiatives', 'Build vs buy vs partner decisions', 'Creating your AI roadmap'] },
    { title: 'Leading AI Transformation', lessons: ['Change management for AI', 'Building a culture of AI adoption', 'Communicating AI strategy', 'Managing resistance and fear'] },
    { title: 'People & Teams', lessons: ['Upskilling your team for AI', 'New roles in an AI world', 'Ethical leadership with AI', 'Talent strategy for AI-first orgs'] },
    { title: 'AI Governance', lessons: ['AI risk management for leaders', 'Regulatory landscape and compliance', 'Communicating AI to the board', 'Measuring AI ROI and impact'] },
  ],
}

export default function TrackPage() {
  const params = useParams()
  const trackId = params.trackId as string
  const { state } = useGame()
  const { user, openSignUp, signOut } = useAuth()
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
  const isPro = !!user

  const curriculumTrack = getTrack(trackId as TrackId)
  const meta = trackMeta[trackId]

  const modules = curriculumTrack
    ? curriculumTrack.modules.map(m => ({
        title: m.title,
        lessons: m.lessons.map(l => l.title),
        moduleId: m.id,
        lessonIds: m.lessons.map(l => l.id),
      }))
    : (moduleOutlines[trackId] ?? []).map((m, mi) => ({
        title: m.title,
        lessons: m.lessons,
        moduleId: `${trackId}-m${mi + 1}`,
        lessonIds: m.lessons.map((_, li) => `${trackId}-m${mi + 1}-l${li + 1}`),
      }))

  const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0)

  if (!meta) {
    return (
      <main style={{ background: '#EFF6FF', minHeight: '100vh' }} className="flex items-center justify-center">
        <p style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}>Track not found.</p>
      </main>
    )
  }

  const Icon = meta.icon

  return (
    <main style={{ background: '#EFF6FF', minHeight: '100vh' }}>
      {/* Nav */}
      <nav className="sticky top-0 z-40 px-6 py-4 flex items-center justify-between"
        style={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #E2E8F0' }}>
        <Link href="/" className="flex items-center gap-2">
          <Logo size="md" />
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/tracks"
            className="text-sm font-medium transition-colors hover:text-slate-900"
            style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}>
            All tracks
          </Link>
          <button
            onClick={() => setSearchOpen(true)}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors hover:bg-slate-100"
            style={{ color: '#64748B', fontFamily: 'var(--font-sans)', border: '1px solid #E2E8F0', background: '#EFF6FF' }}
          >
            <Search size={13} />
            <span>Search</span>
            <kbd style={{ fontSize: '10px', color: '#94A3B8', background: '#E2E8F0', borderRadius: '3px', padding: '1px 5px' }}>⌘K</kbd>
          </button>
          {user ? (
            <>
              <Link href="/dashboard"
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg transition-colors hover:opacity-80"
                style={{ color: '#2563EB', background: '#DBEAFE', fontFamily: 'var(--font-sans)' }}>
                <Zap size={12} /> Dashboard
              </Link>
              <button onClick={signOut}
                className="flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg transition-colors hover:bg-slate-100"
                style={{ color: '#94A3B8', fontFamily: 'var(--font-sans)' }}>
                <LogOut size={13} /> Sign out
              </button>
            </>
          ) : (
            <button onClick={() => openSignUp()}
              className="text-xs font-semibold px-4 py-2 rounded-lg text-white transition-all hover:opacity-90"
              style={{ background: '#2563EB', fontFamily: 'var(--font-sans)' }}>
              Get started free
            </button>
          )}
        </div>
      </nav>
      {searchOpen && <GlobalSearch open={searchOpen} onClose={() => setSearchOpen(false)} />}

      {/* Hero */}
      <div className="relative overflow-hidden" style={{ borderBottom: '1px solid #E2E8F0', background: '#FFFFFF' }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse at 20% 50%, ${meta.color}08 0%, transparent 60%)` }} />
        <div className="max-w-5xl mx-auto px-6 pt-12 pb-12">
          <Link href="/tracks"
            className="inline-flex items-center gap-1.5 text-sm mb-8 transition-colors hover:text-slate-700"
            style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}>
            <ArrowLeft size={14} /> All tracks
          </Link>

          <motion.div variants={stagger(0.1)} initial="hidden" animate="visible">
            <motion.div variants={fadeUp} className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{ background: `${meta.color}10`, border: `1px solid ${meta.color}25` }}>
                <Icon size={26} color={meta.color} />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="text-xs font-semibold" style={{ color: meta.color, fontFamily: 'var(--font-sans)' }}>
                    Role Track
                  </p>
                  <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full"
                    style={{ background: '#FEF3C7', color: '#92400E', border: '1px solid #FDE68A', fontFamily: 'var(--font-sans)' }}>
                    Sample preview
                  </span>
                </div>
                <h1 className="text-3xl font-black" style={{ fontFamily: 'var(--font-sans)', color: '#0F172A' }}>
                  {meta.title}
                </h1>
              </div>
            </motion.div>

            <motion.p variants={fadeUp} className="text-base max-w-2xl mb-5 leading-relaxed"
              style={{ color: '#475569', fontFamily: 'var(--font-sans)' }}>
              {meta.description}
            </motion.p>

            {/* Personalisation callout */}
            <motion.div variants={fadeUp} className="max-w-2xl mb-7 p-4 rounded-xl flex items-start gap-3"
              style={{ background: '#EFF6FF', border: '1px solid #DBEAFE' }}>
              <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: '#2563EB' }}>
                <Sparkles size={13} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-bold mb-0.5" style={{ color: '#0F172A', fontFamily: 'var(--font-sans)' }}>
                  This is a sample — your version gets personalised
                </p>
                <p className="text-sm leading-relaxed" style={{ color: '#1D4ED8', fontFamily: 'var(--font-sans)' }}>
                  After the 3-minute assessment, the module order, examples, and exercises inside this track adapt to your specific role, seniority, and goals. A Marketing Director and a Growth Manager get different versions of the same track.
                </p>
                <Link href="/assessment"
                  className="inline-flex items-center gap-1.5 mt-2.5 text-xs font-semibold"
                  style={{ color: '#2563EB', fontFamily: 'var(--font-sans)' }}>
                  Get my personalised version <ArrowRight size={11} />
                </Link>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="flex items-center gap-6 mb-7">
              {[
                { icon: BookOpen, label: `${totalLessons} lessons` },
                { icon: Clock, label: `~${Math.round(totalLessons * 17 / 60)} hrs` },
                { icon: Trophy, label: 'Certificate included' },
              ].map(({ icon: I, label }) => (
                <div key={label} className="flex items-center gap-1.5 text-sm" style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}>
                  <I size={14} /> {label}
                </div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
              <Link
                href={`/tracks/${trackId}/lessons/${trackId}-m1-l1`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white transition-all hover:opacity-90"
                style={{ background: 'linear-gradient(135deg, #2563EB, #1D4ED8)', fontFamily: 'var(--font-sans)' }}
              >
                <PlayCircle size={16} /> Start Track
              </Link>
              <Link
                href="/teams"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all hover:bg-slate-100"
                style={{ background: '#EFF6FF', color: '#475569', border: '1px solid #E2E8F0', fontFamily: 'var(--font-sans)' }}
              >
                <Users size={15} /> Enroll a team
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Who this is for + Before/After */}
      <div className="max-w-5xl mx-auto px-6 pt-10 pb-2 grid md:grid-cols-2 gap-6">
        {/* Who this is for */}
        <div className="rounded-2xl p-6" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: meta.color, fontFamily: 'var(--font-sans)' }}>
            Who this is for
          </p>
          <ul className="space-y-3">
            {meta.whoFor.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm" style={{ color: '#475569', fontFamily: 'var(--font-sans)' }}>
                <CheckCircle2 size={14} color={meta.color} className="mt-0.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Before / After */}
        <div className="rounded-2xl overflow-hidden" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <div className="px-6 pt-5 pb-3">
            <p className="text-xs font-bold tracking-widest uppercase" style={{ color: meta.color, fontFamily: 'var(--font-sans)' }}>
              What changes
            </p>
          </div>
          <div className="px-4 pb-5 space-y-2.5">
            {meta.beforeAfter.map(({ before, after }, i) => (
              <div key={i} className="rounded-xl overflow-hidden" style={{ border: '1px solid #F1F5F9' }}>
                <div className="flex items-start gap-2.5 px-4 py-2.5" style={{ background: '#FFF8F8' }}>
                  <span className="text-[9px] font-black uppercase tracking-widest mt-0.5 flex-shrink-0"
                    style={{ color: '#F87171', fontFamily: 'var(--font-sans)', letterSpacing: '0.1em' }}>
                    Before
                  </span>
                  <span className="text-xs leading-snug" style={{ color: '#94A3B8', fontFamily: 'var(--font-sans)' }}>
                    {before}
                  </span>
                </div>
                <div className="flex items-start gap-2.5 px-4 py-2.5" style={{ background: '#F0FDF4', borderTop: `1px solid ${meta.color}15` }}>
                  <span className="text-[9px] font-black uppercase tracking-widest mt-0.5 flex-shrink-0"
                    style={{ color: meta.color, fontFamily: 'var(--font-sans)', letterSpacing: '0.1em' }}>
                    After
                  </span>
                  <span className="text-xs leading-snug font-semibold" style={{ color: '#15803D', fontFamily: 'var(--font-sans)' }}>
                    {after}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modules */}
      <div className="max-w-5xl mx-auto px-6 py-12 space-y-4">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <h2 className="text-lg font-black" style={{ fontFamily: 'var(--font-sans)', color: '#0F172A' }}>
            Sample Curriculum
          </h2>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
            style={{ background: '#EFF6FF', border: '1px solid #E2E8F0' }}>
            <Sparkles size={12} style={{ color: '#2563EB' }} />
            <span className="text-xs" style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}>
              Module order &amp; content adapt after your assessment
            </span>
          </div>
        </div>
        {modules.map((mod, mi) => {
          const completedInModule = mod.lessonIds.filter(id => state.completedLessons.includes(id)).length
          const moduleComplete = state.completedModules.includes(mod.moduleId)
          const isModuleFree = mi === 0
          const isModuleAccessible = isModuleFree || isPro
          return (
            <motion.div
              key={mod.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: mi * 0.07, duration: 0.45 }}
              className="rounded-2xl overflow-hidden"
              style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
            >
              {/* Module header */}
              <div className="px-6 py-4 flex items-center justify-between"
                style={{ borderBottom: '1px solid #F1F5F9', background: '#EFF6FF' }}>
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black"
                    style={{
                      background: !isModuleAccessible ? '#F1F5F9' : moduleComplete ? `${meta.color}20` : `${meta.color}10`,
                      color: !isModuleAccessible ? '#CBD5E1' : meta.color,
                      fontFamily: 'var(--font-sans)',
                    }}>
                    {!isModuleAccessible ? <Lock size={12} /> : moduleComplete ? '✓' : mi + 1}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm" style={{ fontFamily: 'var(--font-sans)', color: isModuleAccessible ? '#0F172A' : '#94A3B8' }}>
                      {mod.title}
                    </h3>
                    {isModuleFree && (
                      <span className="text-xs font-semibold" style={{ color: '#10B981', fontFamily: 'var(--font-sans)' }}>
                        Free
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {isModuleAccessible && completedInModule > 0 && (
                    <span className="text-xs font-medium" style={{ color: meta.color, fontFamily: 'var(--font-sans)' }}>
                      {completedInModule}/{mod.lessons.length}
                    </span>
                  )}
                  {!isModuleAccessible ? (
                    <button
                      onClick={() => openSignUp()}
                      className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all hover:opacity-90"
                      style={{ background: '#2563EB', color: '#FFFFFF', fontFamily: 'var(--font-sans)' }}>
                      <Lock size={10} /> Unlock free trial
                    </button>
                  ) : (
                    <span className="text-xs" style={{ color: '#94A3B8', fontFamily: 'var(--font-sans)' }}>
                      {mod.lessons.length} lessons
                    </span>
                  )}
                </div>
              </div>

              {/* Lessons */}
              <div className="divide-y" style={{ borderColor: '#F1F5F9' }}>
                {mod.lessons.map((lesson, li) => {
                  const lessonId = mod.lessonIds[li]
                  const isDone = state.completedLessons.includes(lessonId)
                  const isSequentiallyUnlocked = mi === 0 || isPro || state.completedModules.includes(`${trackId}-m${mi}`)
                  const canAccess = isModuleAccessible && isSequentiallyUnlocked

                  return (
                    <div key={lessonId}
                      className="px-6 py-3.5 flex items-center justify-between group transition-colors"
                      style={{ cursor: !canAccess ? 'pointer' : 'default' }}
                      onClick={!canAccess ? () => openSignUp() : undefined}>
                      <div className="flex items-center gap-3 hover:bg-slate-50 rounded-lg -mx-1 px-1 w-full py-0.5 transition-colors">
                        <div className="w-5 h-5 flex-shrink-0">
                          {isDone
                            ? <CheckCircle2 size={16} color={meta.color} />
                            : canAccess
                            ? <PlayCircle size={16} color={meta.color} />
                            : <Lock size={14} color="#CBD5E1" />
                          }
                        </div>
                        <span className="text-sm flex-1" style={{
                          color: isDone ? meta.color : canAccess ? '#334155' : '#CBD5E1',
                          fontFamily: 'var(--font-sans)',
                          textDecoration: isDone ? 'line-through' : 'none',
                          opacity: isDone ? 0.7 : 1,
                        }}>
                          {lesson}
                        </span>
                        <div className="flex items-center gap-3 flex-shrink-0">
                          <span className="text-xs" style={{ color: '#CBD5E1', fontFamily: 'var(--font-sans)' }}>
                            ~17 min
                          </span>
                          {canAccess && !isDone && (
                            <Link
                              href={`/tracks/${trackId}/lessons/${lessonId}`}
                              className="text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1"
                              style={{ color: '#2563EB', fontFamily: 'var(--font-sans)' }}
                              onClick={e => e.stopPropagation()}
                            >
                              Start <ChevronRight size={12} />
                            </Link>
                          )}
                          {isDone && (
                            <Link
                              href={`/tracks/${trackId}/lessons/${lessonId}`}
                              className="text-xs opacity-0 group-hover:opacity-60 transition-opacity"
                              style={{ color: '#94A3B8', fontFamily: 'var(--font-sans)' }}
                              onClick={e => e.stopPropagation()}
                            >
                              Review
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          )
        })}
      </div>
    </main>
  )
}
