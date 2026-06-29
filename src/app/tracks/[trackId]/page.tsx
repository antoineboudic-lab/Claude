'use client'

import { motion } from 'framer-motion'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import {
  Megaphone, LineChart, HeartHandshake, TrendingUp,
  Settings, Briefcase, ChevronRight, Clock, BookOpen,
  Trophy, Lock, CheckCircle2, PlayCircle, ArrowLeft, Zap,
  Scale, Package, Headphones, BarChart, ArrowRight, Users, Sparkles,
} from 'lucide-react'
import { getTrack } from '@/lib/curriculum'
import { useGame } from '@/context/GameContext'
import { useAuth } from '@/context/AuthContext'
import { useSubscription } from '@/hooks/useSubscription'
import type { TrackId } from '@/lib/curriculum/types'
import EditorialNav from '@/components/editorial/Nav'
import EditorialFooter from '@/components/editorial/Footer'
import { GrainOverlay, AuroraGlow } from '@/components/editorial/Atmosphere'
import {
  PAPER, PAPER_2, PANEL, INK, INK_SOFT, INK_FAINT,
  COBALT, COBALT_TX, RULE, SERIF, MONO, SANS, fadeUp, stagger,
} from '@/components/editorial/theme'

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
  it: {
    title: 'IT & Technology', tagline: 'Automate, secure, and scale your IT environment with AI', color: '#6366F1', icon: Zap,
    description: 'Apply AI to the work that defines modern IT — from scripting and incident response to security operations and documentation — without sacrificing rigour or control.',
    whoFor: ['You manage infrastructure, systems, or security and want to reduce toil without introducing new risk', 'You write scripts, review code, or respond to incidents and want AI to compress the time it takes', "You're being asked about AI governance and want to set policy based on real understanding, not vendor claims"],
    beforeAfter: [{ before: 'Writing a runbook from scratch after each incident', after: 'AI draft in minutes, you refine and publish' }, { before: 'Hours debugging a script with no clear error', after: 'Root cause identified and patch drafted in 20 min' }, { before: 'Alert triage taking most of a shift', after: 'AI-enriched context, you focus on real threats' }],
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
  const { openSignUp } = useAuth()
  const { isPro } = useSubscription()

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
      <main style={{ background: PAPER, minHeight: '100vh' }}>
        <GrainOverlay />
        <EditorialNav active="tracks" />
        <section className="flex items-center justify-center px-6" style={{ minHeight: '70vh' }}>
          <div className="text-center pt-36">
            <p className="text-[11px] uppercase tracking-[0.2em] mb-4" style={{ color: INK_FAINT, fontFamily: MONO }}>
              Error 404
            </p>
            <h1 className="mb-5" style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 'clamp(2rem, 4vw, 2.8rem)', letterSpacing: '-0.025em', color: INK }}>
              Track <span style={{ fontStyle: 'italic', color: COBALT_TX }}>not found</span>
            </h1>
            <Link href="/tracks"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: COBALT, borderRadius: 3, fontFamily: SANS }}>
              <ArrowLeft size={14} /> Browse all tracks
            </Link>
          </div>
        </section>
        <EditorialFooter />
      </main>
    )
  }

  const Icon = meta.icon

  return (
    <main style={{ background: PAPER, minHeight: '100vh' }}>
      <GrainOverlay />
      <EditorialNav active="tracks" />

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ borderBottom: `1px solid ${RULE}` }}>
        <AuroraGlow style={{ width: 640, height: 640, top: -260, left: '12%', opacity: 0.4 }} />
        <div className="relative max-w-5xl mx-auto px-6 pt-36 pb-14">
          <Link href="/tracks"
            className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.16em] mb-9 transition-opacity hover:opacity-60"
            style={{ color: INK_FAINT, fontFamily: MONO }}>
            <ArrowLeft size={13} /> All tracks
          </Link>

          {/* Accent rule bar */}
          <div className="h-[3px] w-16 mb-7" style={{ background: meta.color }} />

          <motion.div variants={stagger(0.1)} initial="hidden" animate="visible">
            <motion.div variants={fadeUp} className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 flex items-center justify-center flex-shrink-0"
                style={{ background: `${meta.color}12`, border: `1px solid ${meta.color}30`, borderRadius: 8 }}>
                <Icon size={26} color={meta.color} />
              </div>
              <div>
                <div className="flex items-center gap-2.5 mb-1.5">
                  <span className="text-[10px] uppercase tracking-[0.18em]" style={{ color: INK_FAINT, fontFamily: MONO }}>
                    Role Track
                  </span>
                  <span className="flex items-center gap-1 text-[9.5px] uppercase tracking-wider px-2 py-0.5 font-semibold"
                    style={{ background: 'rgba(36,64,216,0.08)', color: COBALT_TX, border: `1px solid rgba(36,64,216,0.20)`, borderRadius: 4, fontFamily: MONO }}>
                    <Sparkles size={9} /> Sample preview
                  </span>
                </div>
                <h1 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)', lineHeight: 1.04, letterSpacing: '-0.025em', color: INK }}>
                  {meta.title}
                </h1>
              </div>
            </motion.div>

            <motion.p variants={fadeUp} className="text-base max-w-2xl mb-6 leading-relaxed"
              style={{ color: INK_SOFT, fontFamily: SANS }}>
              {meta.description}
            </motion.p>

            {/* Personalisation callout */}
            <motion.div variants={fadeUp} className="max-w-2xl mb-8 p-5 flex items-start gap-3.5"
              style={{ background: 'rgba(36,64,216,0.06)', border: `1px solid rgba(36,64,216,0.20)`, borderRadius: 10 }}>
              <div className="w-8 h-8 flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: COBALT, borderRadius: 6 }}>
                <Sparkles size={14} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-bold mb-1" style={{ color: INK, fontFamily: SANS }}>
                  This is a sample — your version gets personalised
                </p>
                <p className="text-sm leading-relaxed" style={{ color: INK_SOFT, fontFamily: SANS }}>
                  After the 3-minute assessment, the module order, examples, and exercises inside this track adapt to your specific role, seniority, and goals. A Marketing Director and a Growth Manager get different versions of the same track.
                </p>
                <Link href="/assessment"
                  className="inline-flex items-center gap-1.5 mt-3 text-xs font-semibold transition-opacity hover:opacity-70"
                  style={{ color: COBALT_TX, fontFamily: SANS }}>
                  Get my personalised version <ArrowRight size={11} />
                </Link>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-8">
              {[
                { icon: BookOpen, label: `${totalLessons} lessons` },
                { icon: Clock, label: `~${Math.round(totalLessons * 17 / 60)} hrs` },
                { icon: Trophy, label: 'Certificate included' },
              ].map(({ icon: I, label }) => (
                <div key={label} className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.12em]" style={{ color: INK_FAINT, fontFamily: MONO }}>
                  <I size={13} /> {label}
                </div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
              <Link
                href={`/tracks/${trackId}/lessons/${trackId}-m1-l1`}
                className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-sm text-white transition-opacity hover:opacity-90"
                style={{ background: COBALT, borderRadius: 3, fontFamily: SANS }}
              >
                <PlayCircle size={16} /> Start track
              </Link>
              <Link
                href="/teams"
                className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-sm transition-colors hover:bg-black/[0.03]"
                style={{ border: `1px solid ${RULE}`, color: INK, borderRadius: 3, fontFamily: SANS }}
              >
                <Users size={15} /> Enroll a team
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Who this is for + Before/After */}
      <div className="max-w-5xl mx-auto px-6 pt-12 pb-2 grid md:grid-cols-2 gap-6">
        {/* Who this is for */}
        <div className="p-6" style={{ background: PAPER_2, border: `1px solid ${RULE}`, borderRadius: 8, boxShadow: '0 1px 3px rgba(26,27,31,0.04)' }}>
          <p className="text-[10px] tracking-[0.2em] uppercase mb-5" style={{ color: INK_FAINT, fontFamily: MONO }}>
            Who this is for
          </p>
          <ul className="space-y-3.5">
            {meta.whoFor.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm leading-relaxed" style={{ color: INK_SOFT, fontFamily: SANS }}>
                <CheckCircle2 size={14} color={meta.color} className="mt-0.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Before / After */}
        <div className="overflow-hidden" style={{ background: PAPER_2, border: `1px solid ${RULE}`, borderRadius: 8, boxShadow: '0 1px 3px rgba(26,27,31,0.04)' }}>
          <div className="px-6 pt-6 pb-3">
            <p className="text-[10px] tracking-[0.2em] uppercase" style={{ color: INK_FAINT, fontFamily: MONO }}>
              What changes
            </p>
          </div>
          <div className="px-4 pb-5 space-y-2.5">
            {meta.beforeAfter.map(({ before, after }, i) => (
              <div key={i} className="overflow-hidden" style={{ border: `1px solid ${RULE}`, borderRadius: 6 }}>
                <div className="flex items-start gap-3 px-4 py-2.5" style={{ background: PANEL }}>
                  <span className="text-[9px] uppercase tracking-[0.14em] mt-0.5 flex-shrink-0"
                    style={{ color: INK_FAINT, fontFamily: MONO }}>
                    Before
                  </span>
                  <span className="text-xs leading-snug" style={{ color: INK_FAINT, fontFamily: SANS }}>
                    {before}
                  </span>
                </div>
                <div className="flex items-start gap-3 px-4 py-2.5" style={{ background: `${meta.color}0A`, borderTop: `1px solid ${meta.color}22` }}>
                  <span className="text-[9px] uppercase tracking-[0.14em] mt-0.5 flex-shrink-0"
                    style={{ color: meta.color, fontFamily: MONO }}>
                    After
                  </span>
                  <span className="text-xs leading-snug font-medium" style={{ color: INK, fontFamily: SANS }}>
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
        <div className="flex items-center justify-between mb-7 flex-wrap gap-3">
          <h2 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: '1.5rem', letterSpacing: '-0.02em', color: INK }}>
            Sample <span style={{ fontStyle: 'italic', color: COBALT_TX }}>curriculum</span>
          </h2>
          <div className="flex items-center gap-2 px-3 py-1.5"
            style={{ background: 'rgba(36,64,216,0.06)', border: `1px solid rgba(36,64,216,0.20)`, borderRadius: 4 }}>
            <Sparkles size={11} style={{ color: COBALT_TX }} />
            <span className="text-[11px]" style={{ color: INK_SOFT, fontFamily: SANS }}>
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
              className="overflow-hidden"
              style={{ background: PAPER_2, border: `1px solid ${RULE}`, borderRadius: 8, boxShadow: '0 1px 3px rgba(26,27,31,0.04)' }}
            >
              {/* Module header */}
              <div className="px-6 py-4 flex items-center justify-between"
                style={{ borderBottom: `1px solid ${RULE}`, background: PANEL }}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 flex items-center justify-center text-[11px]"
                    style={{
                      background: !isModuleAccessible ? 'rgba(26,27,31,0.05)' : moduleComplete ? `${meta.color}20` : `${meta.color}10`,
                      color: !isModuleAccessible ? INK_FAINT : meta.color,
                      border: `1px solid ${!isModuleAccessible ? RULE : `${meta.color}30`}`,
                      fontFamily: MONO,
                      borderRadius: 6,
                    }}>
                    {!isModuleAccessible ? <Lock size={12} /> : moduleComplete ? '✓' : String(mi + 1).padStart(2, '0')}
                  </div>
                  <div>
                    <h3 className="text-sm" style={{ fontFamily: SERIF, fontWeight: 500, letterSpacing: '-0.01em', color: isModuleAccessible ? INK : INK_FAINT }}>
                      {mod.title}
                    </h3>
                    {isModuleFree && (
                      <span className="text-[10px] uppercase tracking-[0.14em]" style={{ color: '#10B981', fontFamily: MONO }}>
                        Free
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {isModuleAccessible && completedInModule > 0 && (
                    <span className="text-[11px]" style={{ color: meta.color, fontFamily: MONO }}>
                      {completedInModule}/{mod.lessons.length}
                    </span>
                  )}
                  {!isModuleAccessible ? (
                    <button
                      onClick={() => openSignUp()}
                      className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 text-white transition-opacity hover:opacity-90"
                      style={{ background: COBALT, borderRadius: 3, fontFamily: SANS }}>
                      <Lock size={10} /> Unlock free trial
                    </button>
                  ) : (
                    <span className="text-[11px] uppercase tracking-[0.1em]" style={{ color: INK_FAINT, fontFamily: MONO }}>
                      {mod.lessons.length} lessons
                    </span>
                  )}
                </div>
              </div>

              {/* Lessons */}
              <div>
                {mod.lessons.map((lesson, li) => {
                  const lessonId = mod.lessonIds[li]
                  const isDone = state.completedLessons.includes(lessonId)
                  const isSequentiallyUnlocked = mi === 0 || isPro || state.completedModules.includes(`${trackId}-m${mi}`)
                  const canAccess = isModuleAccessible && isSequentiallyUnlocked

                  return (
                    <div key={lessonId}
                      className="px-6 py-3.5 flex items-center justify-between group transition-colors hover:bg-black/[0.015]"
                      style={{ cursor: !canAccess ? 'pointer' : 'default', borderTop: li === 0 ? 'none' : `1px solid ${RULE}` }}
                      onClick={!canAccess ? () => openSignUp() : undefined}>
                      <div className="flex items-center gap-3 w-full">
                        <span className="text-[11px] flex-shrink-0 w-6" style={{ color: INK_FAINT, fontFamily: MONO }}>
                          {String(li + 1).padStart(2, '0')}
                        </span>
                        <div className="w-5 h-5 flex-shrink-0">
                          {isDone
                            ? <CheckCircle2 size={16} color={meta.color} />
                            : canAccess
                            ? <PlayCircle size={16} color={meta.color} />
                            : <Lock size={14} color={INK_FAINT} />
                          }
                        </div>
                        <span className="text-sm flex-1" style={{
                          color: isDone ? meta.color : canAccess ? INK : INK_FAINT,
                          fontFamily: SANS,
                          textDecoration: isDone ? 'line-through' : 'none',
                          opacity: isDone ? 0.7 : 1,
                        }}>
                          {lesson}
                        </span>
                        <div className="flex items-center gap-3 flex-shrink-0">
                          <span className="text-[10px] uppercase tracking-[0.1em]" style={{ color: INK_FAINT, fontFamily: MONO }}>
                            ~17 min
                          </span>
                          {canAccess && !isDone && (
                            <Link
                              href={`/tracks/${trackId}/lessons/${lessonId}`}
                              className="text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1"
                              style={{ color: COBALT_TX, fontFamily: SANS }}
                              onClick={e => e.stopPropagation()}
                            >
                              Start <ChevronRight size={12} />
                            </Link>
                          )}
                          {isDone && (
                            <Link
                              href={`/tracks/${trackId}/lessons/${lessonId}`}
                              className="text-xs opacity-0 group-hover:opacity-70 transition-opacity"
                              style={{ color: INK_FAINT, fontFamily: SANS }}
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

      <EditorialFooter />
    </main>
  )
}
