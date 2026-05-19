'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import {
  ArrowLeft, ArrowRight, CheckCircle2, Clock, XCircle,
  BookOpen, Lightbulb, Dumbbell, HelpCircle, Zap, Sparkles,
  Lock, Check, FlaskConical, Send, ChevronDown, Copy, RotateCcw,
  CalendarDays, Target, Brain, TrendingUp, ThumbsUp, GitCompare,
  SlidersHorizontal, MessageSquarePlus, AlertCircle, Bookmark, Search,
} from 'lucide-react'
import { useGame } from '@/context/GameContext'
import { useAuth } from '@/context/AuthContext'
import { useSubscription } from '@/hooks/useSubscription'
import { LevelBar } from '@/components/gamification/LevelBar'
import AITutor from '@/components/AITutor'
import type { AITutorHandle } from '@/components/AITutor'
import GlobalSearch from '@/components/GlobalSearch'
import { useBookmarks } from '@/hooks/useBookmarks'
import { useNotes } from '@/hooks/useNotes'
import { XP } from '@/lib/gamification'
import { getLesson, getNextLesson, getTrack } from '@/lib/curriculum'
import { addLessonToQueue } from '@/lib/srs'
import type { Lesson, Module, InlineCheck, OutputComparison, ApplyThisWeek } from '@/lib/curriculum'
import type { TrackId } from '@/lib/curriculum/types'

const easing = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number]

const trackOutcomes: Record<string, string> = {
  marketing:   'Campaign briefs: 3 hours → 20 minutes',
  finance:     'Variance analysis: half a day → 30 minutes',
  hr:          'Job description first draft: 2 hours → 5 minutes',
  sales:       'Complex proposal: full day → 2–3 hours',
  operations:  'Manual daily reporting → automated every morning',
  leadership:  'Vague AI strategy → concrete prioritised roadmap',
  legal:       'Contract first-pass: 2–4 hours → 20 minutes',
  product:     'Discovery synthesis: 2 weeks → hours',
  customer:    'Churn caught too late → flagged weeks earlier',
  consulting:  'Desk research: 3 days → 4–8 hours',
}

const trackColors: Record<string, string> = {
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

type Tab = 'lesson' | 'exercise' | 'quiz' | 'lab'

// ─── Prompt Lab scenarios ─────────────────────────────────────────────────────

interface LabScenario {
  title: string
  context: string
  task: string
  starterPrompt: string
  systemContext: string
  expertPrompt: string
  expertExplanation: string
}

const TRACK_SCENARIOS: Record<string, LabScenario> = {
  marketing: {
    title: 'Product launch email',
    context: "You're a content marketer at a DTC skincare brand. Your team is launching a new vitamin C serum next week and you need an email to your 80k subscriber list.",
    task: 'Write a prompt that gets AI to draft a high-converting launch email for the serum.',
    starterPrompt: 'Write an email about our new vitamin C serum',
    systemContext: 'You are a senior AI assistant helping a marketing professional. Generate the requested marketing content exactly as prompted — realistic, polished, and ready to use. Keep your response under 300 words.',
    expertPrompt: `Act as an expert email copywriter specialising in DTC beauty brands.\n\nWrite a launch email for a new vitamin C serum with these details:\n- Brand tone: science-backed but warm and accessible\n- Audience: 25–45 year old women interested in skincare\n- Key benefit: visibly brighter skin in 2 weeks\n- Price: £65\n- Call to action: shop now with 15% launch discount\n\nStructure: subject line + preview text, punchy opening hook (1 sentence), benefit-driven body (3 short paragraphs), social proof quote, clear CTA button text.\n\nKeep it under 200 words total.`,
    expertExplanation: "The expert prompt works because it defines a specific role, provides concrete product details, specifies tone and audience, gives a clear structure, and sets a word limit. Each detail removes ambiguity and gives the AI fewer degrees of freedom — meaning less editing for you.",
  },
  finance: {
    title: 'Variance analysis explanation',
    context: "You're an FP&A analyst preparing the monthly board pack. Q3 revenue came in 12% below budget. You need to explain this in plain language for non-finance board members.",
    task: 'Write a prompt that gets AI to draft a concise variance commentary for the board pack.',
    starterPrompt: 'Explain why revenue was below budget',
    systemContext: 'You are a senior AI assistant helping a finance professional. Generate the requested financial content exactly as prompted — professional, clear, and ready to use. Keep your response under 300 words.',
    expertPrompt: `Act as a senior FP&A analyst writing board-level commentary.\n\nWrite a variance commentary for a board pack explaining that Q3 revenue came in 12% below budget (£2.4M vs £2.7M budget).\n\nContext:\n- Main driver: delayed enterprise contract signing (3 deals pushed to Q4)\n- Secondary driver: lower than expected SMB conversion rates\n- Q4 outlook: pipeline is strong, expecting full-year budget to be met\n\nFormat:\n- 3 sentences maximum\n- Plain English — no jargon\n- End with a forward-looking statement\n\nTone: transparent and confident, not defensive.`,
    expertExplanation: "The expert prompt provides the actual numbers, names the specific causes of variance, and gives forward-looking context — all things a board member needs. It also specifies the word limit and tone, which prevents the AI from generating generic filler language.",
  },
  hr: {
    title: 'Job description rewrite',
    context: "You're an HR Business Partner. Your engineering team submitted a job description for a Data Analyst role that's full of jargon and likely to attract the wrong candidates.",
    task: 'Write a prompt that gets AI to rewrite the JD to attract strong applicants.',
    starterPrompt: 'Rewrite this job description to make it better',
    systemContext: 'You are a senior AI assistant helping an HR professional. Generate the requested HR content exactly as prompted — professional, inclusive, and effective. Keep your response under 350 words.',
    expertPrompt: `Act as a talent acquisition specialist with expertise in inclusive job design.\n\nRewrite this Data Analyst job description with these goals:\n1. Remove unnecessary technical jargon that screens out capable candidates\n2. Lead with impact (what the person will achieve) not requirements\n3. Reframe "requirements" as "what you'll bring" to feel more welcoming\n4. Ensure language is gender-neutral and inclusive\n5. Add a brief company culture line\n\nOriginal description: "Candidate must have 5+ years SQL experience, proficiency in Python, experience with ETL pipelines, BI tool expertise (Tableau or Power BI), and statistical modelling background. Must work independently with minimal supervision."\n\nKeep the rewrite under 150 words.`,
    expertExplanation: "The expert prompt structures the ask as numbered goals, which produces a more systematic rewrite. Specifying what to remove and what to add (not just 'make it better') gives the AI a clear brief — the same way you'd brief a copywriter.",
  },
  sales: {
    title: 'Cold outreach personalisation',
    context: "You're an AE targeting mid-market SaaS companies. You've researched a prospect — their company just raised a Series B, recently hired a new VP of Sales, and publicly announced they're expanding into Europe.",
    task: 'Write a prompt that gets AI to draft a personalised cold email using this intel.',
    starterPrompt: 'Write a cold email to this prospect',
    systemContext: 'You are a senior AI assistant helping a sales professional. Generate the requested sales content exactly as prompted — conversational, personalised, and effective. Keep your response under 300 words.',
    expertPrompt: `Act as a top-performing B2B sales copywriter.\n\nWrite a cold outreach email using these trigger events as the hook:\n- Company just raised Series B ($40M)\n- New VP of Sales started 6 weeks ago\n- Announced European expansion at SaaStr last month\n\nOur product: AI-powered sales enablement platform that reduces ramp time for new reps by 40%\n\nEmail brief:\n- Subject line: reference the European expansion specifically\n- Opening: acknowledge the growth moment (1 sentence, no flattery)\n- Bridge: connect their expansion challenge to our value prop\n- CTA: ask for a 20-minute call, offer specific times\n- Tone: peer-to-peer, not vendor-y\n- Length: under 100 words in the body\n\nNo buzzwords. No "I hope this finds you well."`,
    expertExplanation: "The expert prompt uses the specific trigger events as context and gives the AI the exact constraints great salespeople know by heart: short body, no filler opener, peer tone, specific CTA. The result needs far less editing than a generic prompt.",
  },
  operations: {
    title: 'SOP documentation',
    context: "You're an Operations Manager. Your team runs a returns processing workflow that lives entirely in people's heads — it breaks every time someone's on leave.",
    task: "Write a prompt that gets AI to help create a clear SOP from a rough process description.",
    starterPrompt: 'Write an SOP for our returns process',
    systemContext: 'You are a senior AI assistant helping an operations professional. Generate the requested operational content exactly as prompted — clear, structured, and immediately usable. Keep your response under 400 words.',
    expertPrompt: `Act as an operations consultant specialising in process documentation.\n\nCreate a Standard Operating Procedure (SOP) for the following returns process. Format it so a new team member could follow it on day one.\n\nProcess description (rough notes from the team):\n- Customer emails returns@company.com or fills form on website\n- Someone in the team checks the email twice a day\n- We log it in the spreadsheet if it's within 30 days of purchase\n- We send a prepaid label via email\n- When item arrives, quality check happens\n- If ok → refund processed in 3-5 days\n- If damaged → customer gets store credit not refund\n\nSOP format:\n- Title + version + owner\n- Purpose (1 sentence)\n- Numbered steps with responsible person for each step\n- Decision tree for damaged returns\n- Key timelines highlighted in bold\n\nKeep under 300 words.`,
    expertExplanation: "The expert prompt gives the AI raw material to work from (the rough notes) and a precise output format. Without the format specification, AI often produces a generic SOP template rather than one that reflects your actual process. The decision tree instruction is key — it handles the most common edge case explicitly.",
  },
  leadership: {
    title: 'AI strategy communication',
    context: "You're a CEO preparing to announce to your 200-person company that you're implementing AI tools across the business. Some employees are worried about job security.",
    task: 'Write a prompt that gets AI to draft an all-hands announcement that builds trust rather than fear.',
    starterPrompt: 'Write an announcement about our AI strategy',
    systemContext: 'You are a senior AI assistant helping a business leader. Generate the requested leadership communication exactly as prompted — authentic, clear, and effective. Keep your response under 400 words.',
    expertPrompt: `Act as an executive communications specialist.\n\nWrite an all-hands announcement from the CEO about implementing AI tools across the company. The goal is to build confidence and trust, not create anxiety.\n\nKey messages to include:\n1. AI is a tool to make everyone's work better, not a replacement\n2. We will invest in training — nobody will be left behind\n3. Specific example: AI will handle [repetitive reporting tasks] so the team can focus on [strategic decisions]\n4. Timeline: pilot with 3 teams in Q1, full rollout reviewed in Q2\n5. Two-way commitment: we'll listen and adjust based on feedback\n\nTone:\n- Warm and direct — write as if speaking to people in the room\n- Acknowledge that change can feel uncertain\n- Avoid corporate euphemisms\n\nFormat: 4 short paragraphs + a clear next step\nLength: under 300 words`,
    expertExplanation: "The expert prompt gives the AI the actual narrative arc leaders need to manage change: acknowledge concern → show investment → give specifics → create dialogue. Without this structure, AI defaults to a generic announcement that reads like a press release — exactly what builds distrust.",
  },
  legal: {
    title: 'Contract risk summary',
    context: "You're in-house counsel reviewing a vendor SaaS agreement before sign-off. The contract is 34 pages and your GC wants a risk summary by end of day.",
    task: 'Write a prompt that gets AI to extract and summarise the key risk clauses from a contract.',
    starterPrompt: 'Summarise the risks in this contract',
    systemContext: 'You are a senior AI assistant helping a legal professional. Generate the requested legal content exactly as prompted — precise, structured, and clearly flagging risk. Keep your response under 400 words.',
    expertPrompt: `Act as a senior in-house counsel specialising in technology contracts.\n\nReview the following SaaS vendor agreement excerpt and produce a risk summary for internal sign-off.\n\nFocus on these clause categories:\n1. Liability cap — is it adequately limited? Flag if uncapped or below 12 months' fees\n2. Indemnification — who indemnifies whom, and for what? Any unusual carve-outs?\n3. Data processing & GDPR — does the DPA meet EU SCCs requirements?\n4. Termination for convenience — notice period and data return obligations\n5. IP ownership — who owns outputs and customisations?\n\nFor each category:\n- State the clause position in one sentence\n- Rate risk: LOW / MEDIUM / HIGH\n- Recommend action if MEDIUM or HIGH\n\nTone: direct and plain English — written for a non-lawyer GC\nLength: under 300 words`,
    expertExplanation: "The expert prompt structures the review around the five clauses that matter most in SaaS agreements, and forces a consistent format (position → risk rating → action) for each. That structure means the GC can scan the output in 60 seconds — which is the real deliverable.",
  },
  product: {
    title: 'PRD for a new feature',
    context: "You're a PM who just finished discovery for a new in-app notification centre. You have user research notes, a defined problem statement, and rough success metrics.",
    task: 'Write a prompt that gets AI to draft a structured PRD from your discovery notes.',
    starterPrompt: 'Write a PRD for our new notification centre feature',
    systemContext: 'You are a senior AI assistant helping a product manager. Generate the requested product content exactly as prompted — structured, specific, and decision-ready. Keep your response under 500 words.',
    expertPrompt: `Act as a senior product manager with experience shipping notification systems at scale.\n\nWrite a PRD for a new in-app notification centre based on the following discovery inputs.\n\nProblem statement: Users miss important account alerts because they're buried in email. 43% of churned users cited "didn't know about the issue" in exit surveys.\n\nUser research findings:\n- Users want a persistent bell icon with unread count\n- Notifications should be categorised (billing, activity, system)\n- Must be dismissible per notification and clearable in bulk\n- Mobile parity is a must — 60% of users are on mobile\n\nSuccess metrics: <5% of critical alerts go unread within 24h; NPS delta +8pts for active users\n\nPRD structure to follow:\n1. Problem & opportunity (2 sentences)\n2. Goals and non-goals (bullet list)\n3. User stories (3–5, format: As a [user], I want to [action] so that [outcome])\n4. Key requirements (functional only, numbered)\n5. Success metrics\n6. Open questions\n\nLength: under 400 words`,
    expertExplanation: "The expert prompt gives AI the raw discovery inputs — the problem, research findings, and metrics — rather than asking it to invent them. The explicit PRD structure means the output maps directly to how engineering and design will consume it, saving a round of reformatting.",
  },
  customer: {
    title: 'Churn risk account brief',
    context: "You're a CSM preparing for a QBR with a key account. Usage is down 30% quarter-over-quarter and your champion recently left the company.",
    task: 'Write a prompt that gets AI to help you prepare a churn risk brief and recovery action plan.',
    starterPrompt: 'Help me prepare for a difficult QBR with an at-risk account',
    systemContext: 'You are a senior AI assistant helping a customer success manager. Generate the requested CS content exactly as prompted — strategic, empathetic, and action-oriented. Keep your response under 400 words.',
    expertPrompt: `Act as a senior Customer Success Manager specialising in enterprise SaaS retention.\n\nHelp me prepare for a QBR with an at-risk account. Here's the situation:\n\nAccount context:\n- 200-seat enterprise account, £120k ARR, renewal in 90 days\n- Usage dropped 30% QoQ — mainly in the reporting module\n- Champion (VP of Operations) left 6 weeks ago; replacement not yet identified\n- Support tickets up 40% — mostly "how do I…" questions suggesting low adoption\n- No exec sponsor engagement in last 2 quarters\n\nPrepare:\n1. Churn risk assessment — rate HIGH/MEDIUM/LOW with 2-sentence rationale\n2. Root cause hypotheses — 3 most likely reasons for the decline\n3. Discovery questions — 4 questions to ask in the QBR to validate hypotheses\n4. Recovery actions — 3 concrete actions we can commit to in the next 30 days\n5. Success condition — what does "saved" look like by renewal?\n\nTone: strategic and honest — this is internal prep, not a sales pitch\nLength: under 350 words`,
    expertExplanation: "The expert prompt gives the AI the account's actual numbers and signals rather than a generic scenario. The five-part structure mirrors how good CSMs think about churn: diagnose → hypothesise → investigate → act → define success. Each section is something you can directly use in the QBR prep meeting.",
  },
  consulting: {
    title: 'Executive summary from research',
    context: "You're a strategy consultant who just completed three weeks of client interviews and desk research for a market entry assessment. You need a crisp executive summary for the partner review.",
    task: 'Write a prompt that gets AI to synthesise your research notes into a partner-ready executive summary.',
    starterPrompt: 'Write an executive summary of my market research',
    systemContext: 'You are a senior AI assistant helping a strategy consultant. Generate the requested consulting content exactly as prompted — crisp, insight-led, and recommendation-first. Keep your response under 400 words.',
    expertPrompt: `Act as a McKinsey-trained strategy consultant writing a partner-level executive summary.\n\nSynthesize the following research inputs into a 1-page executive summary for a market entry assessment.\n\nResearch inputs:\n- Total addressable market: €2.1B in Western Europe, growing 14% CAGR\n- Client's current capabilities: strong in B2B distribution, no direct-to-consumer experience\n- Competitive landscape: 3 dominant players (40% combined share), 12 fragmented regional players\n- Primary research finding: procurement decision makers prioritise integration with existing ERP systems above price\n- Regulatory consideration: new EU product liability directive takes effect Q3 next year\n- Recommendation from the team: enter via acquisition of a regional player rather than organic build\n\nExecutive summary format:\n1. Situation (1 sentence — what decision faces the client)\n2. Complication (2 sentences — why this is hard)\n3. Key insight (1 sentence — the non-obvious finding that changes the analysis)\n4. Recommendation (1 sentence — clear and direct)\n5. Rationale (3 bullet points supporting the recommendation)\n6. Immediate next step (1 action, owner, deadline)\n\nTone: confident and direct — no hedging, no "it depends"\nLength: under 250 words`,
    expertExplanation: "The expert prompt uses the Situation-Complication-Resolution structure that top consulting firms use for all senior communications. By providing the actual research inputs and enforcing the format, the AI produces something that reads like it came from the team — not a generic summary template.",
  },
}

// Lesson-specific overrides (keyed by lessonId pattern)
const LESSON_SCENARIO_OVERRIDES: Record<string, Partial<LabScenario>> = {
  'marketing-m2-l1': {
    title: 'Copy that converts',
    context: "You're a content marketer at a fashion brand. Your task: write copy for a new sustainable sneaker. You've just learned the CRAFT prompting framework from this lesson.",
    task: 'Apply what you learned — write a prompt using role, context, format, and constraints to get outstanding product copy.',
    starterPrompt: 'Write product copy for a sustainable sneaker',
  },
  'marketing-m2-l2': {
    title: 'Campaign brief with AI',
    context: "Your brand is launching a summer campaign for a new iced coffee product targeting Gen Z. You need a full campaign brief in 10 minutes.",
    task: "Use a structured prompt to generate a campaign brief — include audience, key messages, channels, and tone of voice.",
    starterPrompt: 'Create a campaign brief for a new iced coffee product launch',
  },
  'finance-m2-l1': {
    title: 'Model assumption walkthrough',
    context: "You're presenting a 3-year revenue forecast to your CFO. She asks why you assumed 15% annual growth. You need a clear, non-defensive explanation.",
    task: 'Prompt AI to help you articulate your modelling assumptions in plain language.',
    starterPrompt: 'Explain why I assumed 15% growth in my revenue model',
  },
  'hr-m2-l1': {
    title: 'Job description — first draft',
    context: "Hiring manager just pinged you: they need a JD for a Senior Product Designer posted by end of day. You have 15 minutes.",
    task: 'Write a prompt that generates a compelling, inclusive JD without the usual corporate filler.',
    starterPrompt: 'Write a job description for a Senior Product Designer',
  },
  'sales-m2-l1': {
    title: 'Prospect research summary',
    context: "You have a discovery call in 2 hours with the Head of Operations at a 500-person logistics company. You know nothing about them yet.",
    task: 'Prompt AI to build a research brief — what to know, what to ask, and how to position your solution.',
    starterPrompt: 'Research this prospect for my sales call',
  },
}

function getScenario(trackId: string, lessonId: string): LabScenario {
  const base = TRACK_SCENARIOS[trackId] ?? TRACK_SCENARIOS.marketing
  const override = LESSON_SCENARIO_OVERRIDES[lessonId]
  return override ? { ...base, ...override } : base
}

// ─── Markdown renderer ────────────────────────────────────────────────────────

function LessonContent({ content, color }: { content: string; color: string }) {
  return (
    <div>
      <ReactMarkdown
        components={{
          h2: ({ children }) => (
            <h2 className="text-[11px] font-semibold uppercase tracking-widest mt-8 mb-3 first:mt-0"
              style={{ color, fontFamily: 'var(--font-sans)', letterSpacing: '0.08em' }}>
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-sm font-semibold mt-5 mb-1.5"
              style={{ fontFamily: 'var(--font-sans)', color: '#1E293B' }}>
              {children}
            </h3>
          ),
          p: ({ children }) => {
            const childArray = React.Children.toArray(children)
            const firstEl = childArray[0]
            const isCallout = React.isValidElement(firstEl) &&
              firstEl.type === 'strong' &&
              String((firstEl.props as { children?: unknown }).children ?? '').toLowerCase().startsWith('key')

            if (isCallout) {
              return (
                <div className="my-5 pl-4 py-3 pr-3"
                  style={{ borderLeft: `2px solid ${color}`, background: `${color}06` }}>
                  <p className="text-sm leading-[1.8]" style={{ color: '#334155', fontFamily: 'var(--font-sans)' }}>
                    {children}
                  </p>
                </div>
              )
            }

            return (
              <p className="text-sm leading-[1.8] mb-4"
                style={{ color: '#475569', fontFamily: 'var(--font-sans)' }}>
                {children}
              </p>
            )
          },
          strong: ({ children }) => (
            <strong style={{ color: '#1E293B', fontWeight: 600 }}>{children}</strong>
          ),
          em: ({ children }) => (
            <em style={{ color, fontStyle: 'italic' }}>{children}</em>
          ),
          ul: ({ children }) => (
            <ul className="my-4 space-y-2">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="my-4 space-y-2">{children}</ol>
          ),
          li: ({ children, ...props }: React.LiHTMLAttributes<HTMLLIElement> & { ordered?: boolean; index?: number }) => (
            <li className="flex items-start gap-2.5 text-sm leading-[1.8]"
              style={{ color: '#475569', fontFamily: 'var(--font-sans)' }}>
              {props.ordered ? (
                <span className="flex-shrink-0 text-xs font-semibold mt-[3px] min-w-[1.25rem]"
                  style={{ color }}>
                  {(props.index ?? 0) + 1}.
                </span>
              ) : (
                <span className="flex-shrink-0 text-[9px] mt-[7px]" style={{ color }}>■</span>
              )}
              <span className="flex-1">{children}</span>
            </li>
          ),
          blockquote: ({ children }) => (
            <div className="my-5 pl-4 py-3 pr-3"
              style={{ borderLeft: '2px solid #E2E8F0', background: '#F0FDFA' }}>
              <div className="text-sm leading-[1.8]" style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}>
                {children}
              </div>
            </div>
          ),
          code: ({ children }) => (
            <code className="px-1.5 py-0.5 rounded text-xs"
              style={{ background: '#F1F5F9', color: '#0D9488', fontFamily: 'monospace' }}>
              {children}
            </code>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}

// ─── Fallback lesson ──────────────────────────────────────────────────────────

function FallbackLesson({ lessonId, color }: { lessonId: string; color: string }) {
  return (
    <div className="p-8 rounded-2xl text-center"
      style={{ background: '#F0FDFA', border: '1px solid #E2E8F0' }}>
      <div className="text-3xl mb-3">📚</div>
      <p className="text-sm font-semibold mb-1" style={{ color: '#0F172A', fontFamily: 'var(--font-sans)' }}>
        Lesson content loading
      </p>
      <p className="text-xs" style={{ color: '#94A3B8', fontFamily: 'var(--font-sans)' }}>
        {lessonId} — this lesson is being prepared.
      </p>
    </div>
  )
}

// ─── Paywall overlay ──────────────────────────────────────────────────────────

function PaywallOverlay({
  trackId,
  trackColor,
  lessonTitle,
  completedCount,
  totalLessons,
  user,
  onSignUp,
  onSignIn,
  onUpgrade,
}: {
  trackId: string
  trackColor: string
  lessonTitle: string
  completedCount: number
  totalLessons: number
  user: import('@supabase/supabase-js').User | null
  onSignUp: () => void
  onSignIn: () => void
  onUpgrade: (plan: 'monthly' | 'annual') => void
}) {
  const [upgrading, setUpgrading] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'annual'>('monthly')
  const trackName = trackId.charAt(0).toUpperCase() + trackId.slice(1)
  const pct = Math.round((completedCount / totalLessons) * 100)

  const perks = [
    `All ${totalLessons} ${trackName} lessons unlocked`,
    'Your AI-personalised learning path',
    'Hands-on exercises with real tools',
    'Verified completion certificate',
    'XP, streaks & progress tracking',
    'Access to all 10 role tracks',
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 sm:p-6"
      style={{ background: 'rgba(15,23,42,0.8)', backdropFilter: 'blur(10px)' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 60 }}
        transition={{ duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative w-full max-w-md rounded-3xl overflow-hidden"
        style={{ background: '#FFFFFF', boxShadow: '0 40px 100px rgba(0,0,0,0.35)' }}
      >
        {/* Gradient top stripe */}
        <div className="h-1.5" style={{ background: `linear-gradient(90deg, ${trackColor}, #0D9488)` }} />

        <div className="px-7 pt-6 pb-7">
          {/* Header */}
          <div className="flex items-center gap-4 mb-5">
            <div className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ background: `${trackColor}12`, border: `1px solid ${trackColor}25` }}>
              <Lock size={18} color={trackColor} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-0.5"
                style={{ color: trackColor, fontFamily: 'var(--font-sans)' }}>
                Pro content
              </p>
              <h2 className="text-lg font-black" style={{ color: '#0F172A', fontFamily: 'var(--font-sans)' }}>
                Unlock your full learning path
              </h2>
            </div>
          </div>

          {/* Progress card */}
          <div className="p-4 rounded-2xl mb-5" style={{ background: '#F0FDFA', border: '1px solid #E2E8F0' }}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold" style={{ color: '#334155', fontFamily: 'var(--font-sans)' }}>
                Your progress
              </span>
              <span className="text-xs font-bold" style={{ color: trackColor, fontFamily: 'var(--font-sans)' }}>
                {completedCount} / {totalLessons} lessons &middot; {pct}%
              </span>
            </div>
            <div className="h-2 rounded-full overflow-hidden mb-2.5" style={{ background: '#E2E8F0' }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.9, delay: 0.3, ease: 'easeOut' }}
                className="h-full rounded-full"
                style={{ background: `linear-gradient(90deg, ${trackColor}, #0D9488)` }}
              />
            </div>
            <p className="text-xs" style={{ color: '#94A3B8', fontFamily: 'var(--font-sans)' }}>
              Next: <span style={{ color: '#475569', fontWeight: 600 }}>{lessonTitle}</span>
            </p>
          </div>

          {/* Perks */}
          <ul className="space-y-2 mb-6">
            {perks.map(p => (
              <li key={p} className="flex items-center gap-2.5 text-sm"
                style={{ color: '#475569', fontFamily: 'var(--font-sans)' }}>
                <Check size={13} color="#10B981" className="flex-shrink-0" />
                {p}
              </li>
            ))}
          </ul>

          {/* CTA — upgrade if signed in, sign-up otherwise */}
          {user ? (
            <>
              {/* Plan toggle */}
              <div className="flex gap-2 mb-3">
                {(['monthly', 'annual'] as const).map(p => (
                  <button
                    key={p}
                    onClick={() => setSelectedPlan(p)}
                    className="flex-1 py-2 rounded-xl text-xs font-semibold transition-all"
                    style={{
                      background: selectedPlan === p ? trackColor : '#F0FDFA',
                      color: selectedPlan === p ? '#FFFFFF' : '#64748B',
                      border: `1px solid ${selectedPlan === p ? trackColor : '#E2E8F0'}`,
                      fontFamily: 'var(--font-sans)',
                    }}
                  >
                    {p === 'monthly' ? '$19 / month' : '$15 / month (annual)'}
                    {p === 'annual' && <span className="ml-1 opacity-80">−20%</span>}
                  </button>
                ))}
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={async () => {
                  setUpgrading(true)
                  await onUpgrade(selectedPlan)
                }}
                disabled={upgrading}
                className="w-full py-4 rounded-xl font-bold text-sm text-white mb-3 transition-opacity hover:opacity-95"
                style={{
                  background: `linear-gradient(135deg, ${trackColor}, #0D9488)`,
                  boxShadow: `0 8px 28px ${trackColor}40`,
                  fontFamily: 'var(--font-sans)',
                  opacity: upgrading ? 0.7 : 1,
                }}
              >
                {upgrading ? 'Redirecting to checkout…' : 'Start My 7-Day Free Trial'}
              </motion.button>
              <p className="text-center text-xs" style={{ color: '#94A3B8', fontFamily: 'var(--font-sans)' }}>
                Free for 7 days &middot; Cancel anytime
              </p>
            </>
          ) : (
            <>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onSignUp}
                className="w-full py-4 rounded-xl font-bold text-sm text-white mb-3 transition-opacity hover:opacity-95"
                style={{
                  background: `linear-gradient(135deg, ${trackColor}, #0D9488)`,
                  boxShadow: `0 8px 28px ${trackColor}40`,
                  fontFamily: 'var(--font-sans)',
                }}
              >
                Create Account &amp; Start Free Trial
              </motion.button>
              <p className="text-center text-xs mb-3" style={{ color: '#94A3B8', fontFamily: 'var(--font-sans)' }}>
                Free for 7 days &middot; Then $19/month &middot; Cancel anytime
              </p>
              <button
                onClick={onSignIn}
                className="w-full text-center text-xs font-medium py-1 transition-colors hover:text-slate-700"
                style={{ color: '#94A3B8', fontFamily: 'var(--font-sans)' }}>
                Already have an account? Sign in
              </button>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── Prompt Lab component ─────────────────────────────────────────────────────

interface PromptCritique {
  score: number
  strengths: string[]
  improvements: string[]
  topTip: string
}

function PromptLab({ scenario, color }: { scenario: LabScenario; color: string }) {
  const [prompt, setPrompt] = useState(scenario.starterPrompt)
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [showExpert, setShowExpert] = useState(false)
  const [copied, setCopied] = useState(false)
  const [critique, setCritique] = useState<PromptCritique | null>(null)
  const [critiqueLoading, setCritiqueLoading] = useState(false)
  const [critiqueError, setCritiqueError] = useState('')
  const [showCritique, setShowCritique] = useState(false)
  const responseRef = useRef<HTMLDivElement>(null)

  const runPrompt = async () => {
    if (!prompt.trim() || loading) return
    setLoading(true)
    setError('')
    setResponse('')
    try {
      const res = await fetch('/api/practice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, systemContext: scenario.systemContext }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Something went wrong')
      setResponse(data.response)
      setSubmitted(true)
      setTimeout(() => responseRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to get a response')
    } finally {
      setLoading(false)
    }
  }

  const copyResponse = () => {
    navigator.clipboard.writeText(response)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const getCritique = async () => {
    if (critiqueLoading) return
    setCritiqueLoading(true)
    setCritiqueError('')
    setCritique(null)
    try {
      const res = await fetch('/api/critique', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userPrompt: prompt, taskContext: `${scenario.title}: ${scenario.task}` }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Something went wrong')
      setCritique(data)
      setShowCritique(true)
    } catch (e) {
      setCritiqueError(e instanceof Error ? e.message : 'Failed to analyse prompt')
    } finally {
      setCritiqueLoading(false)
    }
  }

  const reset = () => {
    setPrompt(scenario.starterPrompt)
    setResponse('')
    setSubmitted(false)
    setShowExpert(false)
    setError('')
    setCritique(null)
    setShowCritique(false)
    setCritiqueError('')
  }

  return (
    <div className="space-y-4">
      {/* Mission briefing card */}
      <div className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${color}25` }}>
        {/* Gradient header */}
        <div className="px-5 py-4"
          style={{ background: `linear-gradient(135deg, ${color}12, ${color}06)`, borderBottom: `1px solid ${color}18` }}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ background: `${color}18` }}>
                <FlaskConical size={14} color={color} />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-widest"
                style={{ color, fontFamily: 'var(--font-sans)' }}>
                Prompt Lab
              </span>
            </div>
            <span className="text-[10px] px-2.5 py-1 rounded-full font-semibold"
              style={{ background: '#CCFBF1', color: '#0D9488', fontFamily: 'var(--font-sans)' }}>
              Live · Claude AI
            </span>
          </div>
          <h3 className="text-sm font-bold mb-1" style={{ color: '#0F172A', fontFamily: 'var(--font-sans)' }}>
            {scenario.title}
          </h3>
          <p className="text-xs leading-[1.75]" style={{ color: '#475569', fontFamily: 'var(--font-sans)' }}>
            {scenario.context}
          </p>
        </div>
        {/* Task strip */}
        <div className="px-5 py-3 flex items-start gap-2.5" style={{ background: '#FFFFFF' }}>
          <Target size={13} color={color} className="flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest mb-0.5"
              style={{ color: '#94A3B8', fontFamily: 'var(--font-sans)' }}>Your task</p>
            <p className="text-xs leading-[1.7]" style={{ color: '#334155', fontFamily: 'var(--font-sans)' }}>
              {scenario.task}
            </p>
          </div>
        </div>
      </div>

      {/* Prompt editor */}
      <div className="rounded-2xl overflow-hidden"
        style={{ border: '1px solid #E2E8F0', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
        {/* Editor chrome */}
        <div className="px-4 py-2.5 flex items-center justify-between"
          style={{ background: '#F0FDFA', borderBottom: '1px solid #E2E8F0' }}>
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#FECACA' }} />
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#FDE68A' }} />
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#A7F3D0' }} />
            </div>
            <span className="text-xs font-medium" style={{ color: '#94A3B8', fontFamily: 'var(--font-sans)' }}>
              your-prompt.txt
            </span>
          </div>
          <button onClick={reset}
            className="flex items-center gap-1 text-xs transition-colors hover:text-slate-600"
            style={{ color: '#CBD5E1', fontFamily: 'var(--font-sans)' }}>
            <RotateCcw size={10} /> Reset
          </button>
        </div>
        <textarea
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) runPrompt() }}
          rows={6}
          placeholder="Write your prompt here…"
          className="w-full px-4 py-4 text-sm resize-none focus:outline-none leading-[1.8]"
          style={{ color: '#334155', fontFamily: 'var(--font-sans)', background: '#FFFFFF' }}
        />
        <div className="px-4 py-3 flex items-center justify-between"
          style={{ background: '#F0FDFA', borderTop: '1px solid #F1F5F9' }}>
          <span className="text-[11px]" style={{ color: '#CBD5E1', fontFamily: 'var(--font-sans)' }}>
            ⌘↵ to run
          </span>
          <button
            onClick={runPrompt}
            disabled={loading || !prompt.trim()}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all disabled:opacity-40 hover:opacity-90"
            style={{ background: color, fontFamily: 'var(--font-sans)' }}>
            {loading ? (
              <>
                <span className="flex gap-0.5 items-center">
                  <span className="w-1 h-1 rounded-full bg-white/70 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1 h-1 rounded-full bg-white/70 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1 h-1 rounded-full bg-white/70 animate-bounce" style={{ animationDelay: '300ms' }} />
                </span>
                Claude is thinking…
              </>
            ) : (
              <><Send size={13} /> Run with Claude</>
            )}
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="p-4 rounded-xl text-xs leading-relaxed"
          style={{ background: '#FFF1F2', border: '1px solid #FDA4AF', color: '#DC2626', fontFamily: 'var(--font-sans)' }}>
          {error === 'API key not configured'
            ? 'Add your ANTHROPIC_API_KEY to .env.local to activate the Prompt Lab.'
            : error}
        </div>
      )}

      {/* AI Response */}
      {response && (
        <motion.div
          ref={responseRef}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="rounded-2xl overflow-hidden"
          style={{ border: '1px solid #E2E8F0', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
          <div className="px-4 py-2.5 flex items-center justify-between"
            style={{ background: '#FAFAFA', borderBottom: '1px solid #E2E8F0' }}>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full flex items-center justify-center"
                style={{ background: '#D4763B' }}>
                <span className="text-[9px] font-black text-white" style={{ fontFamily: 'var(--font-sans)' }}>C</span>
              </div>
              <span className="text-xs font-semibold" style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}>
                Claude&apos;s response
              </span>
            </div>
            <button onClick={copyResponse}
              className="flex items-center gap-1 text-xs transition-colors hover:text-slate-700"
              style={{ color: copied ? '#22C55E' : '#94A3B8', fontFamily: 'var(--font-sans)' }}>
              <Copy size={11} /> {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <div className="px-5 py-5">
            <p className="text-sm leading-[1.85] whitespace-pre-wrap" style={{ color: '#334155', fontFamily: 'var(--font-sans)' }}>
              {response}
            </p>
          </div>
          {/* Analyse CTA — inside response card */}
          {!critique && (
            <div className="px-5 pb-4">
              <button
                onClick={getCritique}
                disabled={critiqueLoading}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold transition-all disabled:opacity-50"
                style={{ background: '#F3F0FF', color: '#0D9488', border: '1px solid #99F6E4', fontFamily: 'var(--font-sans)' }}>
                {critiqueLoading
                  ? <><span className="animate-spin inline-block w-3 h-3 border-2 border-purple-400 border-t-transparent rounded-full" /> Analysing your prompt…</>
                  : <><SlidersHorizontal size={12} /> Score &amp; analyse my prompt</>
                }
              </button>
            </div>
          )}
        </motion.div>
      )}

      {critiqueError && (
        <p className="text-xs px-4 py-3 rounded-xl"
          style={{ background: '#FFF1F2', color: '#DC2626', border: '1px solid #FDA4AF', fontFamily: 'var(--font-sans)' }}>
          {critiqueError}
        </p>
      )}

      {/* Critique card */}
      <AnimatePresence>
        {critique && showCritique && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl overflow-hidden"
            style={{ border: '1px solid #99F6E4' }}>
            <div className="px-5 py-3.5 flex items-center justify-between"
              style={{ background: 'linear-gradient(135deg, #CCFBF1, #F0FDFA)', borderBottom: '1px solid #99F6E4' }}>
              <div className="flex items-center gap-2">
                <SlidersHorizontal size={13} color="#0D9488" />
                <span className="text-[11px] font-bold uppercase tracking-widest"
                  style={{ color: '#0D9488', fontFamily: 'var(--font-sans)' }}>
                  Prompt analysis
                </span>
              </div>
              {/* Score ring */}
              <div className="flex items-center gap-1.5">
                <div className="relative w-9 h-9">
                  <svg viewBox="0 0 36 36" className="w-9 h-9 -rotate-90">
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#99F6E4" strokeWidth="3.5" />
                    <circle
                      cx="18" cy="18" r="15.9" fill="none"
                      stroke={critique.score >= 7 ? '#0D9488' : critique.score >= 4 ? '#F59E0B' : '#EF4444'}
                      strokeWidth="3.5"
                      strokeDasharray={`${(critique.score / 10) * 100} 100`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-xs font-black"
                    style={{ color: critique.score >= 7 ? '#0D9488' : critique.score >= 4 ? '#D97706' : '#DC2626', fontFamily: 'var(--font-sans)' }}>
                    {critique.score}
                  </span>
                </div>
                <span className="text-xs font-semibold" style={{ color: '#94A3B8', fontFamily: 'var(--font-sans)' }}>/10</span>
              </div>
            </div>

            <div className="p-5 space-y-4" style={{ background: '#FEFCFF' }}>
              <div className="grid grid-cols-1 gap-4">
                {/* Strengths */}
                <div>
                  <div className="flex items-center gap-1.5 mb-2">
                    <ThumbsUp size={11} color="#059669" />
                    <span className="text-[11px] font-bold uppercase tracking-wide" style={{ color: '#059669', fontFamily: 'var(--font-sans)' }}>
                      What worked
                    </span>
                  </div>
                  <ul className="space-y-1.5">
                    {critique.strengths.map((s, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs leading-relaxed"
                        style={{ color: '#475569', fontFamily: 'var(--font-sans)' }}>
                        <Check size={11} color="#059669" className="flex-shrink-0 mt-0.5" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Improvements */}
                <div>
                  <div className="flex items-center gap-1.5 mb-2">
                    <TrendingUp size={11} color="#F59E0B" />
                    <span className="text-[11px] font-bold uppercase tracking-wide" style={{ color: '#F59E0B', fontFamily: 'var(--font-sans)' }}>
                      What to improve
                    </span>
                  </div>
                  <ul className="space-y-1.5">
                    {critique.improvements.map((imp, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs leading-relaxed"
                        style={{ color: '#475569', fontFamily: 'var(--font-sans)' }}>
                        <ArrowRight size={11} color="#F59E0B" className="flex-shrink-0 mt-0.5" />
                        {imp}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Top tip */}
              <div className="p-3.5 rounded-xl flex items-start gap-2.5"
                style={{ background: '#CCFBF1', border: '1px solid #99F6E4' }}>
                <Zap size={12} color="#0D9488" className="flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-[11px] font-bold mb-0.5 uppercase tracking-wide" style={{ color: '#0D9488', fontFamily: 'var(--font-sans)' }}>
                    Top tip
                  </p>
                  <p className="text-xs leading-relaxed" style={{ color: '#0F766E', fontFamily: 'var(--font-sans)' }}>
                    {critique.topTip}
                  </p>
                </div>
              </div>

              <button
                onClick={() => { setCritique(null); setShowCritique(false) }}
                className="w-full py-2.5 rounded-xl text-xs font-semibold transition-colors hover:bg-slate-100"
                style={{ background: '#F1F5F9', color: '#64748B', fontFamily: 'var(--font-sans)' }}>
                Revise my prompt →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expert prompt reveal */}
      {submitted && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}>
          <button
            onClick={() => setShowExpert(!showExpert)}
            className="w-full flex items-center justify-between px-5 py-3.5 rounded-xl transition-all"
            style={{
              background: showExpert ? '#CCFBF1' : '#F0FDFA',
              border: `1px solid ${showExpert ? '#99F6E4' : '#E2E8F0'}`,
              fontFamily: 'var(--font-sans)',
            }}>
            <div className="flex items-center gap-2">
              <Sparkles size={13} color="#0D9488" />
              <span className="text-sm font-semibold" style={{ color: '#0D9488' }}>
                See the expert prompt
              </span>
              <span className="text-xs hidden sm:inline" style={{ color: '#94A3B8' }}>— compare your approach</span>
            </div>
            <ChevronDown
              size={14} color="#0D9488"
              className={`transition-transform duration-200 ${showExpert ? 'rotate-180' : ''}`}
            />
          </button>

          <AnimatePresence>
            {showExpert && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden">
                <div className="mt-3 space-y-3">
                  {/* Expert prompt */}
                  <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid #99F6E4' }}>
                    <div className="px-4 py-2.5 flex items-center gap-2"
                      style={{ background: 'linear-gradient(135deg, #CCFBF1, #F0FDFA)', borderBottom: '1px solid #99F6E4' }}>
                      <Sparkles size={12} color="#0D9488" />
                      <span className="text-[11px] font-bold uppercase tracking-widest"
                        style={{ color: '#0D9488', fontFamily: 'var(--font-sans)' }}>
                        Expert prompt
                      </span>
                    </div>
                    <div className="px-5 py-4" style={{ background: '#FEFCFF' }}>
                      <pre className="text-xs leading-[1.9] whitespace-pre-wrap"
                        style={{ color: '#334155', fontFamily: 'var(--font-sans)' }}>
                        {scenario.expertPrompt}
                      </pre>
                    </div>
                  </div>
                  {/* Why it works */}
                  <div className="p-4 rounded-xl flex items-start gap-2.5"
                    style={{ background: '#F0FDFA', border: '1px solid #E2E8F0' }}>
                    <Lightbulb size={12} color="#94A3B8" className="flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[11px] font-bold mb-1 uppercase tracking-wide"
                        style={{ color: '#475569', fontFamily: 'var(--font-sans)' }}>
                        Why it works
                      </p>
                      <p className="text-xs leading-relaxed" style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}>
                        {scenario.expertExplanation}
                      </p>
                    </div>
                  </div>
                  {/* Try it */}
                  <button
                    onClick={() => { setPrompt(scenario.expertPrompt); setShowExpert(false); setResponse(''); setSubmitted(false) }}
                    className="w-full py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
                    style={{ background: '#0D9488', color: '#FFFFFF', fontFamily: 'var(--font-sans)' }}>
                    Try the expert prompt →
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  )
}

// ─── Output Comparison ───────────────────────────────────────────────────────

function OutputComparisonCard({ data, color }: { data: OutputComparison; color: string }) {
  const [showImproved, setShowImproved] = useState(false)

  return (
    <div className="rounded-2xl overflow-hidden transition-all duration-300"
      style={{ border: `1px solid ${showImproved ? '#86EFAC' : '#FECACA'}` }}>

      {/* Header — changes color with state */}
      <div className="px-5 py-4 flex items-center justify-between transition-colors duration-300"
        style={{ background: showImproved ? '#F0FDF4' : '#FFF1F2', borderBottom: `1px solid ${showImproved ? '#86EFAC' : '#FECACA'}` }}>
        <div className="flex items-center gap-2">
          <GitCompare size={14} color={showImproved ? '#059669' : '#DC2626'} />
          <span className="text-xs font-bold uppercase tracking-widest transition-colors duration-300"
            style={{ color: showImproved ? '#059669' : '#DC2626', fontFamily: 'var(--font-sans)' }}>
            {data.label}
          </span>
        </div>
        {/* Quality dots */}
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map(dot => (
            <motion.div
              key={dot}
              className="w-2 h-2 rounded-full"
              animate={{ background: dot <= (showImproved ? 5 : 2) ? (showImproved ? '#22C55E' : '#EF4444') : '#E2E8F0' }}
              transition={{ duration: 0.15, delay: showImproved ? dot * 0.06 : 0 }}
            />
          ))}
        </div>
      </div>

      {/* Toggle */}
      <div className="flex" style={{ borderBottom: '1px solid #F1F5F9' }}>
        <button
          onClick={() => setShowImproved(false)}
          className="flex-1 py-3 text-xs font-semibold transition-all flex items-center justify-center gap-2"
          style={!showImproved
            ? { background: '#FFF1F2', color: '#DC2626', borderRight: '1px solid #FECACA' }
            : { background: '#FAFAFA', color: '#9CA3AF', borderRight: '1px solid #F1F5F9' }
          }
        >
          ✗ Vague prompt
        </button>
        <button
          onClick={() => setShowImproved(true)}
          className="flex-1 py-3 text-xs font-semibold transition-all flex items-center justify-center gap-2"
          style={showImproved
            ? { background: '#F0FDF4', color: '#059669' }
            : { background: '#FAFAFA', color: '#9CA3AF' }
          }
        >
          ✓ Specific prompt
        </button>
      </div>

      <div className="p-5 space-y-4" style={{ background: '#FFFFFF' }}>
        {/* Prompt */}
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest mb-2"
            style={{ color: '#9CA3AF', fontFamily: 'var(--font-sans)', letterSpacing: '0.1em' }}>
            The prompt
          </p>
          <AnimatePresence mode="wait">
            <motion.div
              key={showImproved ? 'ip' : 'vp'}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18 }}
              className="p-3.5 rounded-xl leading-relaxed"
              style={{
                fontFamily: 'monospace', fontSize: '0.8rem',
                background: showImproved ? '#F0FDF4' : '#FFF1F2',
                border: `1px solid ${showImproved ? '#86EFAC' : '#FECACA'}`,
                color: showImproved ? '#065F46' : '#991B1B',
                whiteSpace: 'pre-wrap',
              }}
            >
              {showImproved ? data.improved.prompt : data.vague.prompt}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Output */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-4 h-4 rounded-full flex-shrink-0" style={{ background: '#D4763B' }} />
            <p className="text-[10px] font-bold uppercase tracking-widest"
              style={{ color: '#9CA3AF', fontFamily: 'var(--font-sans)', letterSpacing: '0.1em' }}>
              Claude&apos;s response
            </p>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={showImproved ? 'io' : 'vo'}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18, delay: 0.06 }}
              className="p-4 rounded-xl text-sm leading-[1.7]"
              style={{
                background: '#F0FDFA',
                border: `1px solid ${showImproved ? '#86EFAC' : '#E2E8F0'}`,
                color: '#475569', whiteSpace: 'pre-wrap', fontFamily: 'var(--font-sans)',
                transition: 'border-color 0.3s',
              }}
            >
              {showImproved ? data.improved.output : data.vague.output}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Insight */}
        <AnimatePresence>
          {showImproved && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28 }}
              className="overflow-hidden"
            >
              <div className="p-4 rounded-xl flex items-start gap-3"
                style={{ background: `${color}08`, border: `1px solid ${color}25` }}>
                <Lightbulb size={14} color={color} className="flex-shrink-0 mt-0.5" />
                <p className="text-xs leading-relaxed" style={{ color: '#475569', fontFamily: 'var(--font-sans)' }}>
                  <span className="font-semibold" style={{ color: '#334155' }}>Why this works: </span>
                  {data.insight}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

// ─── Inline Check ─────────────────────────────────────────────────────────────

const OPTION_LETTERS = ['A', 'B', 'C', 'D']

function InlineCheckCard({ data, color }: { data: InlineCheck; color: string }) {
  const [selected, setSelected] = useState<number | null>(null)
  const answered = selected !== null
  const isCorrect = selected === data.correct

  return (
    <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid #E2E8F0' }}>
      {/* Header */}
      <div className="px-5 py-3.5 flex items-center gap-2.5" style={{ background: '#FFFFFF', borderBottom: '1px solid #F1F5F9' }}>
        <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: `${color}12` }}>
          <Brain size={14} color={color} />
        </div>
        <p className="text-xs font-bold uppercase tracking-widest" style={{ color, fontFamily: 'var(--font-sans)' }}>
          Quick check
        </p>
      </div>

      <div className="px-5 py-5" style={{ background: '#FAFAFA' }}>
        <p className="text-[15px] font-semibold mb-5 leading-snug" style={{ color: '#0F172A', fontFamily: 'var(--font-sans)' }}>
          {data.question}
        </p>

        <div className="space-y-2.5">
          {data.options.map((opt, i) => {
            const isThis = selected === i
            const isThisCorrect = i === data.correct

            let bg = '#FFFFFF'
            let borderColor = '#E2E8F0'
            let textColor = '#475569'
            let letterBg = '#F1F5F9'
            let letterColor = '#9CA3AF'

            if (!answered) {
              if (isThis) { bg = `${color}06`; borderColor = color; textColor = '#0F172A'; letterBg = color; letterColor = '#FFFFFF' }
            } else {
              if (isThisCorrect) { bg = '#F0FDF4'; borderColor = '#86EFAC'; textColor = '#15803D'; letterBg = '#22C55E'; letterColor = '#FFFFFF' }
              else if (isThis) { bg = '#FFF1F2'; borderColor = '#FECACA'; textColor = '#DC2626'; letterBg = '#EF4444'; letterColor = '#FFFFFF' }
              else { bg = '#FAFAFA'; borderColor = '#F1F5F9'; textColor = '#CBD5E1' }
            }

            return (
              <motion.button
                key={i}
                onClick={() => !answered && setSelected(i)}
                animate={answered && isThis && !isThisCorrect
                  ? { x: [0, -7, 7, -5, 5, -2, 2, 0] }
                  : answered && isThisCorrect
                  ? { scale: [1, 1.02, 1] }
                  : {}
                }
                transition={{ duration: 0.35 }}
                className="w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl transition-all"
                style={{ background: bg, border: `1px solid ${borderColor}`, fontFamily: 'var(--font-sans)', cursor: answered ? 'default' : 'pointer' }}
              >
                <span className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 transition-all"
                  style={{ background: letterBg, color: letterColor, fontFamily: 'var(--font-sans)' }}>
                  {OPTION_LETTERS[i]}
                </span>
                <span className="text-sm font-medium flex-1 transition-colors" style={{ color: textColor }}>
                  {opt}
                </span>
                {answered && isThisCorrect && (
                  <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 600, damping: 18 }} className="flex-shrink-0">
                    <CheckCircle2 size={16} color="#22C55E" />
                  </motion.span>
                )}
                {answered && isThis && !isThisCorrect && (
                  <AlertCircle size={16} color="#EF4444" className="flex-shrink-0" />
                )}
              </motion.button>
            )
          })}
        </div>

        <AnimatePresence>
          {answered && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="mt-4 p-4 rounded-xl"
              style={{
                background: isCorrect ? '#F0FDF4' : '#FFFBEB',
                border: `1px solid ${isCorrect ? '#86EFAC' : '#FDE68A'}`,
              }}
            >
              <p className="text-xs font-bold mb-1"
                style={{ color: isCorrect ? '#15803D' : '#92400E', fontFamily: 'var(--font-sans)' }}>
                {isCorrect ? '🎯 Exactly right.' : '💡 Not quite — here\'s why:'}
              </p>
              <p className="text-xs leading-relaxed" style={{ color: '#475569', fontFamily: 'var(--font-sans)' }}>
                {data.explanation}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

// ─── Apply This Week ──────────────────────────────────────────────────────────

function ApplyThisWeekCard({ data, color }: { data: ApplyThisWeek; color: string }) {
  const [copied, setCopied] = useState(false)
  const [done, setDone] = useState(false)

  const copyTemplate = () => {
    navigator.clipboard.writeText(data.promptTemplate)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="rounded-2xl overflow-hidden transition-all duration-300"
      style={{ border: `1px solid ${done ? '#86EFAC' : color + '25'}` }}>

      {/* Header */}
      <div className="px-5 py-4 flex items-center justify-between transition-colors duration-300"
        style={{
          background: done ? '#F0FDF4' : `linear-gradient(135deg, ${color}12, ${color}06)`,
          borderBottom: `1px solid ${done ? '#86EFAC' : color + '15'}`,
        }}>
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ background: done ? '#22C55E' : color }}
            transition={{ duration: 0.3 }}
            className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
          >
            {done
              ? <Check size={16} color="#fff" />
              : <CalendarDays size={15} color="#fff" />
            }
          </motion.div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest transition-colors duration-300"
              style={{ color: done ? '#15803D' : color, fontFamily: 'var(--font-sans)', letterSpacing: '0.08em' }}>
              Your challenge this week
            </p>
            <p className="text-xs mt-0.5" style={{ color: done ? '#4ADE80' : `${color}99`, fontFamily: 'var(--font-sans)' }}>
              {done ? 'Marked as done — great work!' : 'Apply what you learned in a real task'}
            </p>
          </div>
        </div>
        <button
          onClick={() => setDone(d => !d)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
          style={done
            ? { background: '#D1FAE5', color: '#059669', border: '1px solid #86EFAC', fontFamily: 'var(--font-sans)' }
            : { background: 'rgba(255,255,255,0.7)', color: '#9CA3AF', border: '1px solid #E2E8F0', fontFamily: 'var(--font-sans)' }
          }
        >
          {done ? <><CheckCircle2 size={11} /> Done</> : 'Mark done'}
        </button>
      </div>

      <div className="p-5 space-y-4" style={{ background: '#FFFFFF' }}>
        {/* Action — the challenge */}
        <p className="text-sm font-medium leading-[1.7]" style={{ color: '#1E293B', fontFamily: 'var(--font-sans)' }}>
          {data.action}
        </p>

        {/* Prompt template */}
        <div className="rounded-xl overflow-hidden" style={{ border: '1px solid #E2E8F0' }}>
          <div className="px-4 py-2.5 flex items-center justify-between"
            style={{ background: '#F0FDFA', borderBottom: '1px solid #E2E8F0' }}>
            <span className="text-[10px] font-bold uppercase tracking-widest"
              style={{ color: '#9CA3AF', fontFamily: 'var(--font-sans)', letterSpacing: '0.1em' }}>
              Starter prompt · paste into {data.tool}
            </span>
            <button
              onClick={copyTemplate}
              className="flex items-center gap-1 text-xs font-semibold transition-all"
              style={{ color: copied ? '#059669' : color, fontFamily: 'var(--font-sans)' }}
            >
              <Copy size={11} /> {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <div className="p-4 text-xs leading-relaxed"
            style={{ fontFamily: 'monospace', color: '#334155', whiteSpace: 'pre-wrap', fontSize: '0.78rem' }}>
            {data.promptTemplate}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function LessonPage() {
  const params = useParams()
  const lessonId = params.lessonId as string
  const trackId = params.trackId as string
  const color = trackColors[trackId] ?? '#0D9488'
  const track = getTrack(trackId as TrackId)
  const totalLessons = track ? track.modules.reduce((acc, m) => acc + m.lessons.length, 0) : 20

  const [activeTab, setActiveTab] = useState<Tab>('lesson')
  const scenario = getScenario(trackId, lessonId)
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [exerciseDone, setExerciseDone] = useState(false)
  const [isInPath, setIsInPath] = useState(false)
  const { isBookmarked, addBookmark, removeBookmark } = useBookmarks()
  const { getNote, setNote } = useNotes()
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
  const [wrongConcepts, setWrongConcepts] = useState<string[]>([])
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set())
  const toggleStep = (i: number) => setCompletedSteps(prev => {
    const next = new Set(prev); if (next.has(i)) next.delete(i); else next.add(i); return next
  })
  const [currentQuizQ, setCurrentQuizQ] = useState(0)
  const [quizFeedbackShown, setQuizFeedbackShown] = useState(false)
  const tutorRef = useRef<AITutorHandle>(null)

  const selectQuizOption = (oi: number) => {
    if (quizFeedbackShown || quizSubmitted) return
    setQuizAnswers(prev => ({ ...prev, [currentQuizQ]: oi }))
    setQuizFeedbackShown(true)
  }

  const advanceQuiz = () => {
    if (!lesson) return
    if (currentQuizQ < lesson.quiz.length - 1) {
      setCurrentQuizQ(q => q + 1)
      setQuizFeedbackShown(false)
    } else {
      handleQuizSubmit()
    }
  }

  const { user, openSignIn, openSignUp } = useAuth()
  const { addXP, completeLesson, completePerfectQuiz, state } = useGame()
  const { isPro } = useSubscription()

  // Module 1: free · Module 2: requires sign-in · Module 3+: requires Pro
  const moduleNum = parseInt(lessonId.match(/-m(\d+)-/)?.[1] ?? '1', 10)
  const isLocked = moduleNum >= 3 ? !isPro : moduleNum > 1 && !user

  const handleUpgrade = async (plan: 'monthly' | 'annual') => {
    const res = await fetch('/api/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ plan }) })
    const data = await res.json()
    if (data.url) window.location.href = data.url
  }

  const result = getLesson(trackId as TrackId, lessonId)
  const lesson: Lesson | undefined = result?.lesson
  const module: Module | undefined = result?.module
  const nextLesson = getNextLesson(trackId as TrackId, lessonId)
  const moduleId = lessonId.split('-l')[0]

  useEffect(() => {
    setCompleted(state.completedLessons.includes(lessonId))
  }, [lessonId, state.completedLessons])

  useEffect(() => {
    try {
      const raw = localStorage.getItem('ai-literacy-assessment')
      if (raw) {
        const result = JSON.parse(raw)
        const inPath = result.customPath?.some((l: { lessonId: string }) => l.lessonId === lessonId)
        setIsInPath(!!inPath)
      }
    } catch {}
  }, [lessonId])

  const progressPctWithLab = activeTab === 'lab' ? 90
    : activeTab === 'quiz' ? 66
    : activeTab === 'exercise' ? 33
    : 10

  const progressPct = completed ? 100 : progressPctWithLab

  const handleMarkComplete = () => {
    if (completed) return
    completeLesson(lessonId, moduleId, trackId)
    if (lesson?.quiz?.length) {
      addLessonToQueue(lessonId, trackId, lesson.title, lesson.quiz)
    }
  }

  const handleExerciseDone = () => {
    if (exerciseDone) return
    setExerciseDone(true)
    addXP(XP.EXERCISE_COMPLETE, 'Exercise complete')
    setTimeout(() => setActiveTab('quiz'), 400)
  }

  const handleQuizSubmit = () => {
    if (!lesson) return
    const allCorrect = lesson.quiz.every((q, i) => quizAnswers[i] === q.correct)
    const wrong = lesson.quiz
      .filter((q, i) => quizAnswers[i] !== q.correct)
      .map(q => q.question.split('?')[0].split(' ').slice(0, 6).join(' '))
    setWrongConcepts(wrong)
    setQuizSubmitted(true)
    if (allCorrect) {
      completePerfectQuiz()
    } else {
      addXP(XP.QUIZ_PASS, 'Quiz complete')
    }
  }

  const allLessons = track?.modules.flatMap(m => m.lessons) ?? []
  const currentLessonIndex = allLessons.findIndex(l => l.id === lessonId)

  const steps: { id: Tab; label: string; shortLabel: string; icon: React.ElementType }[] = [
    { id: 'lesson',   label: 'Read',         shortLabel: 'Read',     icon: BookOpen },
    { id: 'exercise', label: 'Practise',      shortLabel: 'Practise', icon: Dumbbell },
    { id: 'quiz',     label: 'Test yourself', shortLabel: 'Test',     icon: HelpCircle },
    { id: 'lab',      label: 'Apply it',      shortLabel: 'Apply',    icon: FlaskConical },
  ]
  const currentStepIndex = steps.findIndex(s => s.id === activeTab)
  const goNext = () => { if (currentStepIndex < steps.length - 1) setActiveTab(steps[currentStepIndex + 1].id) }
  const goPrev = () => { if (currentStepIndex > 0) setActiveTab(steps[currentStepIndex - 1].id) }

  return (
    <main style={{ background: '#FFFFFF', minHeight: '100vh' }}>
      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-40"
        style={{ background: 'rgba(255,255,255,0.97)', borderBottom: '1px solid #F1F5F9', backdropFilter: 'blur(12px)' }}>
        {/* Lesson-internal progress stripe */}
        <div style={{ height: '2px', background: '#F1F5F9' }}>
          <motion.div
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{ height: '100%', background: color }}
          />
        </div>
        <div className="relative px-5 py-2.5 flex items-center gap-3">
          <Link
            href={`/tracks/${trackId}`}
            className="inline-flex items-center gap-1.5 transition-colors hover:text-slate-700 flex-shrink-0"
            style={{ color: '#9CA3AF', fontFamily: 'var(--font-sans)' }}
          >
            <ArrowLeft size={13} />
            <span className="hidden sm:inline text-xs font-medium">Back</span>
          </Link>

          {/* Track progress — centered absolutely so it doesn't affect layout */}
          {allLessons.length > 0 && (
            <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 pointer-events-none select-none">
              <span className="text-[11px] font-semibold tabular-nums"
                style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}>
                {currentLessonIndex >= 0 ? currentLessonIndex + 1 : '—'}
                <span style={{ color: '#CBD5E1' }}> / {allLessons.length}</span>
              </span>
              <div className="flex items-center gap-[3px]">
                {allLessons.map((l, i) => {
                  const isDone = state.completedLessons.includes(l.id)
                  const isCurrent = l.id === lessonId
                  return (
                    <motion.div key={l.id}
                      animate={{
                        width: isCurrent ? 16 : 5,
                        background: isDone ? '#22C55E' : isCurrent ? color : '#E2E8F0',
                      }}
                      transition={{ duration: 0.3 }}
                      style={{ height: 4, borderRadius: 99 }}
                    />
                  )
                })}
              </div>
            </div>
          )}

          <div className="flex-1" />
          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={() => setSearchOpen(true)}
              title="Search lessons (⌘K)"
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', color: '#CBD5E1', transition: 'color 0.15s' }}
              className="hover:!text-slate-500"
            >
              <Search size={15} />
            </button>
            {lesson && (
              <button
                onClick={() => isBookmarked(lessonId) ? removeBookmark(lessonId) : addBookmark(lessonId, trackId, lesson.title)}
                title={isBookmarked(lessonId) ? 'Remove bookmark' : 'Bookmark this lesson'}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', transition: 'color 0.15s' }}
              >
                <Bookmark size={15} color={isBookmarked(lessonId) ? color : '#CBD5E1'} fill={isBookmarked(lessonId) ? color : 'none'} />
              </button>
            )}
            <LevelBar />
            <button
              onClick={handleMarkComplete}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
              style={
                completed
                  ? { background: '#D1FAE5', color: '#059669', border: '1px solid #A7F3D0', fontFamily: 'var(--font-sans)' }
                  : { background: `${color}10`, color, border: `1px solid ${color}25`, fontFamily: 'var(--font-sans)' }
              }
            >
              {completed ? <><CheckCircle2 size={12} /> Done</> : 'Mark complete'}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-5 pt-20 pb-24">
        {/* Lesson header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: easing }}
          className="mb-7"
        >
          <div className="flex items-center gap-2 mb-2.5 flex-wrap">
            {isInPath ? (
              <span className="flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded"
                style={{ background: '#CCFBF1', color: '#0D9488', fontFamily: 'var(--font-sans)' }}>
                <Sparkles size={9} /> From your AI path
              </span>
            ) : (
              <span className="text-xs font-medium px-2 py-0.5 rounded"
                style={{ background: '#FEF9C3', color: '#A16207', fontFamily: 'var(--font-sans)' }}>
                Sample lesson
              </span>
            )}
            {module && (
              <span className="text-xs font-medium px-2 py-0.5 rounded"
                style={{ background: `${color}10`, color, fontFamily: 'var(--font-sans)' }}>
                {module.title}
              </span>
            )}
            <span className="flex items-center gap-1 text-xs" style={{ color: '#9CA3AF', fontFamily: 'var(--font-sans)' }}>
              <Clock size={11} /> {lesson?.duration ?? 15} min
            </span>
          </div>
          <h1 className="text-[1.55rem] font-bold mb-2 leading-snug"
            style={{ fontFamily: 'var(--font-sans)', color: '#0F172A' }}>
            {lesson?.title ?? lessonId}
          </h1>
          {lesson?.description && (
            <p className="text-sm leading-[1.7] mb-4" style={{ color: '#6B7280', fontFamily: 'var(--font-sans)' }}>
              {lesson.description}
            </p>
          )}

          {/* Track outcome — constant reminder of why this matters */}
          {trackOutcomes[trackId] && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg mb-4"
              style={{ background: `${color}07`, border: `1px solid ${color}18` }}>
              <Zap size={11} color={color} className="flex-shrink-0" />
              <p className="text-xs" style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}>
                <span className="font-semibold" style={{ color }}>In practice: </span>
                {trackOutcomes[trackId]}
              </p>
            </div>
          )}

          {!isInPath && (
            <div className="flex items-start sm:items-center gap-3 px-4 py-3 rounded-lg"
              style={{ background: '#F0FDFA', border: '1px solid #CCFBF1' }}>
              <Sparkles size={13} style={{ color: '#0D9488', flexShrink: 0, marginTop: 1 }} />
              <p className="text-xs leading-relaxed flex-1" style={{ color: '#0F766E', fontFamily: 'var(--font-sans)' }}>
                <span className="font-semibold">Your version of this lesson adapts to your role.</span>{' '}
                After the 3-minute assessment, examples, scenarios, and exercises are tailored specifically to your job function and experience level.
              </p>
              <Link href="/assessment"
                className="text-xs font-semibold flex-shrink-0 whitespace-nowrap"
                style={{ color: '#0D9488', fontFamily: 'var(--font-sans)' }}>
                Personalise →
              </Link>
            </div>
          )}
        </motion.div>

        {/* Step progress indicator */}
        <div className="flex items-center mb-10">
          {steps.map((step, i) => {
            const isDone = i < currentStepIndex
            const isActive = i === currentStepIndex
            return (
              <React.Fragment key={step.id}>
                <button
                  onClick={() => setActiveTab(step.id)}
                  className="flex flex-col items-center gap-2 flex-shrink-0"
                >
                  <motion.div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    animate={{
                      background: isDone || isActive ? color : '#F3F4F6',
                      boxShadow: isActive ? `0 0 0 4px ${color}20` : '0 0 0 0px transparent',
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {isDone
                      ? <Check size={14} color="#fff" strokeWidth={2.5} />
                      : <step.icon size={15} color={isActive ? '#fff' : '#9CA3AF'} />
                    }
                  </motion.div>
                  <span
                    className="text-[11px] font-semibold hidden sm:block transition-colors"
                    style={{
                      color: isActive ? '#0F172A' : isDone ? color : '#CBD5E1',
                      fontFamily: 'var(--font-sans)',
                    }}
                  >
                    {step.shortLabel}
                  </span>
                </button>
                {i < steps.length - 1 && (
                  <motion.div
                    className="flex-1 h-[2px] mx-3 mb-[22px] rounded-full"
                    animate={{ background: i < currentStepIndex ? color : '#E5E7EB' }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </React.Fragment>
            )
          })}
        </div>

        {/* ── Lesson tab ── */}
        {activeTab === 'lesson' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            {lesson ? (
              <>
                <LessonContent content={lesson.content} color={color} />

                {lesson.outputComparison && (
                  <div className="mt-8">
                    <OutputComparisonCard data={lesson.outputComparison} color={color} />
                  </div>
                )}

                {lesson.inlineCheck && (
                  <div className="mt-6">
                    <InlineCheckCard data={lesson.inlineCheck} color={color} />
                  </div>
                )}

                {/* Key takeaways */}
                <div className="mt-8 pt-6" style={{ borderTop: '1px solid #F1F5F9' }}>
                  <p className="text-[11px] font-semibold uppercase tracking-widest mb-3"
                    style={{ color: '#9CA3AF', fontFamily: 'var(--font-sans)', letterSpacing: '0.08em' }}>
                    Key Takeaways
                  </p>
                  <ul className="space-y-2.5">
                    {lesson.keyTakeaways.map((point, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm leading-[1.7]"
                        style={{ color: '#475569', fontFamily: 'var(--font-sans)' }}>
                        <span className="flex-shrink-0 text-[9px] mt-[7px]" style={{ color }}>■</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {lesson.applyThisWeek && (
                  <div className="mt-6">
                    <ApplyThisWeekCard data={lesson.applyThisWeek} color={color} />
                  </div>
                )}

                {/* Reflection */}
                <div className="mt-6 pt-6" style={{ borderTop: '1px solid #F1F5F9' }}>
                  <p className="text-[11px] font-semibold uppercase tracking-widest mb-2"
                    style={{ color: '#9CA3AF', fontFamily: 'var(--font-sans)', letterSpacing: '0.08em' }}>
                    Before you practise
                  </p>
                  <p className="text-sm mb-3 leading-[1.7]" style={{ color: '#475569', fontFamily: 'var(--font-sans)' }}>
                    {lesson.reflection ?? 'What is one specific task in your current role where you could apply what you just learned?'}
                  </p>
                  <textarea
                    value={getNote(lessonId)}
                    onChange={e => setNote(lessonId, e.target.value)}
                    rows={2}
                    placeholder="Type your answer here — it stays private and just for you…"
                    className="w-full px-4 py-3 text-sm rounded-xl resize-none focus:outline-none"
                    style={{
                      color: '#334155', fontFamily: 'var(--font-sans)',
                      background: '#FAFAFA', border: '1px solid #E5E7EB',
                    }}
                  />
                </div>
              </>
            ) : (
              <FallbackLesson lessonId={lessonId} color={color} />
            )}

            {/* Ready to practise CTA */}
            <div className="mt-10 pt-8" style={{ borderTop: '1px solid #F1F5F9' }}>
              <div className="rounded-2xl p-6 text-center"
                style={{ background: `linear-gradient(135deg, ${color}08, ${color}04)`, border: `1px solid ${color}20` }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3"
                  style={{ background: `${color}15` }}>
                  <Dumbbell size={18} color={color} />
                </div>
                <p className="text-sm font-bold mb-1" style={{ color: '#0F172A', fontFamily: 'var(--font-sans)' }}>
                  Ready to put it into practice?
                </p>
                <p className="text-xs mb-4 leading-relaxed" style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}>
                  Apply what you just learned with a hands-on exercise.
                </p>
                <button
                  onClick={goNext}
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
                  style={{ background: color, color: '#fff', fontFamily: 'var(--font-sans)' }}>
                  Start practising <ArrowRight size={14} />
                </button>
              </div>
            </div>

          </motion.div>
        )}

        {/* ── Exercise tab ── */}
        {activeTab === 'exercise' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            {lesson ? (
              <div className="rounded-2xl overflow-hidden mb-5" style={{ border: `1px solid ${color}20` }}>
                {/* Mission briefing header */}
                <div className="px-5 py-5"
                  style={{ background: `linear-gradient(135deg, ${color}10, ${color}04)`, borderBottom: `1px solid ${color}12` }}>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <Dumbbell size={14} color={color} />
                      <span className="text-[10px] font-bold uppercase tracking-widest"
                        style={{ color, fontFamily: 'var(--font-sans)', letterSpacing: '0.08em' }}>
                        Hands-on Practice
                      </span>
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded-lg font-medium flex-shrink-0"
                      style={{ background: 'rgba(255,255,255,0.8)', color: '#64748B', border: '1px solid #E2E8F0', fontFamily: 'var(--font-sans)' }}>
                      {lesson.exercise.tool}
                    </span>
                  </div>
                  <h2 className="text-lg font-bold mb-1.5" style={{ color: '#0F172A', fontFamily: 'var(--font-sans)' }}>
                    {lesson.exercise.title}
                  </h2>
                  <p className="text-sm leading-[1.6]" style={{ color: '#6B7280', fontFamily: 'var(--font-sans)' }}>
                    {lesson.exercise.description}
                  </p>
                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs" style={{ color: '#9CA3AF', fontFamily: 'var(--font-sans)' }}>Your progress</span>
                      <span className="text-xs font-semibold" style={{ color, fontFamily: 'var(--font-sans)' }}>
                        {completedSteps.size} / {lesson.exercise.steps.length} steps
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: `${color}15` }}>
                      <motion.div
                        className="h-full rounded-full"
                        animate={{ width: `${(completedSteps.size / lesson.exercise.steps.length) * 100}%` }}
                        transition={{ duration: 0.35, ease: 'easeOut' }}
                        style={{ background: color }}
                      />
                    </div>
                  </div>
                </div>

                {/* Interactive checklist */}
                <div style={{ background: '#FFFFFF' }}>
                  {lesson.exercise.steps.map((step, i) => {
                    const done = completedSteps.has(i)
                    return (
                      <div key={i} onClick={() => toggleStep(i)}
                        className="flex items-start gap-4 px-5 py-4 cursor-pointer transition-colors select-none"
                        style={{ background: done ? '#F0FDF4' : '#FFFFFF', borderTop: i > 0 ? '1px solid #F1F5F9' : 'none' }}>
                        <div className="flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center mt-0.5 transition-all duration-200"
                          style={{ borderColor: done ? '#22C55E' : '#D1D5DB', background: done ? '#22C55E' : 'transparent' }}>
                          <AnimatePresence>
                            {done && (
                              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                                transition={{ type: 'spring', stiffness: 500, damping: 20 }}>
                                <Check size={11} color="#fff" strokeWidth={3} />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                        <div className="flex-1">
                          <p className="text-[10px] font-bold uppercase tracking-widest mb-0.5"
                            style={{ color: done ? '#86EFAC' : color, fontFamily: 'var(--font-sans)', letterSpacing: '0.07em' }}>
                            Step {i + 1}
                          </p>
                          <p className="text-sm leading-[1.7] transition-colors"
                            style={{ color: done ? '#6B7280' : '#374151', fontFamily: 'var(--font-sans)' }}>
                            {step}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ) : (
              <FallbackLesson lessonId={lessonId} color={color} />
            )}

            {/* Step nav */}
            <div className="flex items-center justify-between pt-5" style={{ borderTop: '1px solid #F1F5F9' }}>
              <button onClick={goPrev} className="flex items-center gap-1.5 text-sm transition-colors hover:text-slate-700"
                style={{ color: '#9CA3AF', fontFamily: 'var(--font-sans)' }}>
                <ArrowLeft size={13} /> Read
              </button>
              <motion.button
                onClick={handleExerciseDone}
                animate={lesson && completedSteps.size === lesson.exercise.steps.length && !exerciseDone
                  ? { scale: [1, 1.04, 1], boxShadow: [`0 0 0 0px ${color}40`, `0 0 0 6px ${color}25`, `0 0 0 0px ${color}40`] }
                  : {}
                }
                transition={{ duration: 1.4, repeat: lesson && completedSteps.size === lesson.exercise.steps.length && !exerciseDone ? Infinity : 0, ease: 'easeInOut' }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
                style={exerciseDone
                  ? { background: '#D1FAE5', color: '#059669', fontFamily: 'var(--font-sans)' }
                  : { background: color, color: '#fff', fontFamily: 'var(--font-sans)' }
                }>
                {exerciseDone
                  ? <><CheckCircle2 size={14} /> Done — going to Test</>
                  : <>Mark done &amp; continue <ArrowRight size={14} /></>
                }
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* ── Quiz tab ── */}
        {activeTab === 'quiz' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            {lesson ? (
              <>
                {!quizSubmitted ? (
                  /* ── One question at a time ── */
                  <div>
                    {/* Progress pills + counter */}
                    <div className="flex items-center justify-between mb-7">
                      <div className="flex items-center gap-1.5">
                        {lesson.quiz.map((_, i) => (
                          <motion.div key={i}
                            animate={{
                              width: i === currentQuizQ ? 24 : 8,
                              background: i < currentQuizQ ? color : i === currentQuizQ ? color : '#E5E7EB',
                              opacity: i > currentQuizQ ? 0.4 : 1,
                            }}
                            transition={{ duration: 0.25 }}
                            className="h-1.5 rounded-full"
                          />
                        ))}
                      </div>
                      <span className="text-xs font-semibold tabular-nums"
                        style={{ color: '#9CA3AF', fontFamily: 'var(--font-sans)' }}>
                        {currentQuizQ + 1} / {lesson.quiz.length}
                      </span>
                    </div>

                    {/* Question — slides in/out on change */}
                    <AnimatePresence mode="wait">
                      <motion.div key={currentQuizQ}
                        initial={{ opacity: 0, x: 18 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -18 }}
                        transition={{ duration: 0.22, ease: 'easeInOut' }}>

                        <p className="text-base font-bold mb-6 leading-[1.65]"
                          style={{ color: '#0F172A', fontFamily: 'var(--font-sans)' }}>
                          {lesson.quiz[currentQuizQ].question}
                        </p>

                        {/* Options — large, comfortable */}
                        <div className="space-y-3 mb-4">
                          {lesson.quiz[currentQuizQ].options.map((opt, oi) => {
                            const selected = quizAnswers[currentQuizQ] === oi
                            const isCorrect = oi === lesson.quiz[currentQuizQ].correct
                            const isWrong = quizFeedbackShown && selected && !isCorrect
                            const showCorrect = quizFeedbackShown && isCorrect

                            return (
                              <motion.button
                                key={oi}
                                onClick={() => selectQuizOption(oi)}
                                animate={isWrong ? { x: [0, -7, 7, -5, 5, -2, 2, 0] } : {}}
                                transition={isWrong ? { duration: 0.4, delay: 0.05 } : {}}
                                className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl text-left transition-all duration-200"
                                style={{
                                  background: quizFeedbackShown
                                    ? showCorrect ? '#F0FDF4' : isWrong ? '#FFF1F2' : '#FAFAFA'
                                    : selected ? `${color}08` : '#FAFAFA',
                                  border: quizFeedbackShown
                                    ? showCorrect ? '2px solid #86EFAC' : isWrong ? '2px solid #FECACA' : '2px solid #F1F5F9'
                                    : selected ? `2px solid ${color}` : '2px solid #F1F5F9',
                                  cursor: quizFeedbackShown ? 'default' : 'pointer',
                                }}>
                                <span className="flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black transition-all duration-200"
                                  style={{
                                    background: quizFeedbackShown
                                      ? showCorrect ? '#22C55E' : isWrong ? '#EF4444' : '#E5E7EB'
                                      : selected ? color : '#E5E7EB',
                                    color: quizFeedbackShown
                                      ? (showCorrect || isWrong) ? '#fff' : '#9CA3AF'
                                      : selected ? '#fff' : '#9CA3AF',
                                    fontFamily: 'var(--font-sans)',
                                  }}>
                                  {OPTION_LETTERS[oi]}
                                </span>
                                <span className="flex-1 text-sm leading-[1.5]"
                                  style={{
                                    color: quizFeedbackShown
                                      ? showCorrect ? '#15803D' : isWrong ? '#DC2626' : '#9CA3AF'
                                      : selected ? color : '#374151',
                                    fontWeight: (showCorrect || isWrong) ? 600 : 400,
                                    fontFamily: 'var(--font-sans)',
                                  }}>
                                  {opt}
                                </span>
                                {quizFeedbackShown && (showCorrect || isWrong) && (
                                  <motion.div
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ type: 'spring', stiffness: 400, damping: 20, delay: 0.1 }}
                                    className="flex-shrink-0">
                                    {showCorrect
                                      ? <CheckCircle2 size={18} color="#22C55E" />
                                      : <XCircle size={18} color="#EF4444" />}
                                  </motion.div>
                                )}
                              </motion.button>
                            )
                          })}
                        </div>

                        {/* Explanation — slides in after answering */}
                        <AnimatePresence>
                          {quizFeedbackShown && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.28 }}
                              className="overflow-hidden">
                              <div className="mb-5 p-4 rounded-2xl flex items-start gap-3"
                                style={{
                                  background: quizAnswers[currentQuizQ] === lesson.quiz[currentQuizQ].correct
                                    ? '#F0FDF4' : '#FFFBEB',
                                  border: `1px solid ${quizAnswers[currentQuizQ] === lesson.quiz[currentQuizQ].correct ? '#86EFAC' : '#FDE68A'}`,
                                }}>
                                <Lightbulb size={14}
                                  color={quizAnswers[currentQuizQ] === lesson.quiz[currentQuizQ].correct ? '#16A34A' : '#D97706'}
                                  className="flex-shrink-0 mt-0.5" />
                                <div>
                                  <p className="text-xs font-bold mb-1"
                                    style={{
                                      color: quizAnswers[currentQuizQ] === lesson.quiz[currentQuizQ].correct ? '#15803D' : '#92400E',
                                      fontFamily: 'var(--font-sans)',
                                    }}>
                                    {quizAnswers[currentQuizQ] === lesson.quiz[currentQuizQ].correct ? 'Correct!' : 'Not quite'}
                                  </p>
                                  <p className="text-xs leading-relaxed"
                                    style={{ color: '#475569', fontFamily: 'var(--font-sans)' }}>
                                    {lesson.quiz[currentQuizQ].explanation}
                                  </p>
                                  {quizAnswers[currentQuizQ] !== lesson.quiz[currentQuizQ].correct && (
                                    <button
                                      onClick={() => tutorRef.current?.open(
                                        `I got this quiz question wrong: "${lesson.quiz[currentQuizQ].question}" — can you explain why the correct answer is "${lesson.quiz[currentQuizQ].options[lesson.quiz[currentQuizQ].correct]}"?`
                                      )}
                                      className="mt-2.5 text-xs font-semibold flex items-center gap-1.5 transition-opacity hover:opacity-75"
                                      style={{ color: '#D97706', fontFamily: 'var(--font-sans)' }}>
                                      <Sparkles size={11} />
                                      Ask the AI Tutor why →
                                    </button>
                                  )}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Nav row */}
                        <div className="flex items-center justify-between">
                          <button onClick={goPrev}
                            className="flex items-center gap-1.5 text-sm transition-colors hover:text-slate-700"
                            style={{ color: '#CBD5E1', fontFamily: 'var(--font-sans)', visibility: quizFeedbackShown ? 'hidden' : 'visible' }}>
                            <ArrowLeft size={13} /> Practise
                          </button>
                          <AnimatePresence>
                            {quizFeedbackShown && (
                              <motion.button
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                onClick={advanceQuiz}
                                className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all hover:opacity-90 ml-auto"
                                style={{ background: color, color: '#fff', fontFamily: 'var(--font-sans)' }}>
                                {currentQuizQ < lesson.quiz.length - 1
                                  ? <>Next question <ArrowRight size={14} /></>
                                  : <>See my results <ArrowRight size={14} /></>
                                }
                              </motion.button>
                            )}
                          </AnimatePresence>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                ) : (
                  /* ── Score screen ── */
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, type: 'spring', stiffness: 180, damping: 20 }}>

                    {/* Big score card */}
                    <div className="text-center py-10 px-6 rounded-3xl mb-6"
                      style={{
                        background: wrongConcepts.length === 0
                          ? 'linear-gradient(135deg, #F0FDF4, #DCFCE7)'
                          : wrongConcepts.length < lesson.quiz.length
                          ? 'linear-gradient(135deg, #FFFBEB, #FEF3C7)'
                          : 'linear-gradient(135deg, #FFF1F2, #FECDD3)',
                        border: `2px solid ${wrongConcepts.length === 0 ? '#86EFAC' : wrongConcepts.length < lesson.quiz.length ? '#FDE68A' : '#FECACA'}`,
                      }}>
                      <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 14, delay: 0.1 }}
                        className="mb-3">
                        <span className="font-black"
                          style={{
                            fontSize: '4rem',
                            lineHeight: 1,
                            color: wrongConcepts.length === 0 ? '#16A34A' : wrongConcepts.length < lesson.quiz.length ? '#D97706' : '#DC2626',
                            fontFamily: 'var(--font-sans)',
                          }}>
                          {lesson.quiz.length - wrongConcepts.length}
                        </span>
                        <span className="text-2xl font-bold"
                          style={{
                            color: wrongConcepts.length === 0 ? '#4ADE80' : wrongConcepts.length < lesson.quiz.length ? '#FCD34D' : '#FCA5A5',
                            fontFamily: 'var(--font-sans)',
                          }}>
                          /{lesson.quiz.length}
                        </span>
                      </motion.div>
                      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
                        <p className="text-sm font-bold"
                          style={{
                            color: wrongConcepts.length === 0 ? '#14532D' : wrongConcepts.length < lesson.quiz.length ? '#78350F' : '#7F1D1D',
                            fontFamily: 'var(--font-sans)',
                          }}>
                          {wrongConcepts.length === 0
                            ? '🎉 Perfect score!'
                            : wrongConcepts.length < lesson.quiz.length
                            ? 'Good effort — a few gaps to review'
                            : 'Revisit the lesson and try again'}
                        </p>
                        {wrongConcepts.length > 0 && (
                          <button onClick={() => setActiveTab('lesson')}
                            className="text-xs font-semibold mt-2"
                            style={{
                              color: wrongConcepts.length < lesson.quiz.length ? '#D97706' : '#DC2626',
                              fontFamily: 'var(--font-sans)',
                            }}>
                            ← Back to lesson
                          </button>
                        )}
                      </motion.div>
                    </div>

                    {/* Action buttons */}
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="space-y-3">
                      {!completed && (
                        <button onClick={handleMarkComplete}
                          className="w-full py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2"
                          style={{ background: '#D1FAE5', color: '#059669', border: '1px solid #A7F3D0', fontFamily: 'var(--font-sans)' }}>
                          <CheckCircle2 size={15} /> Mark lesson complete (+{XP.LESSON_COMPLETE} XP)
                        </button>
                      )}
                      <button onClick={goNext}
                        className="w-full py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all hover:opacity-90"
                        style={{ background: color, color: '#fff', fontFamily: 'var(--font-sans)' }}>
                        Next: Apply it <ArrowRight size={15} />
                      </button>
                      {nextLesson && (
                        <Link href={`/tracks/${trackId}/lessons/${nextLesson.id}`}
                          className="w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all hover:opacity-90"
                          style={{ background: '#F0FDFA', color: '#475569', border: '1px solid #E2E8F0', fontFamily: 'var(--font-sans)' }}>
                          Skip to Next Lesson <ArrowRight size={15} />
                        </Link>
                      )}
                      {!nextLesson && (
                        <Link href={`/tracks/${trackId}`}
                          className="w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2"
                          style={{ background: `${color}10`, color, border: `1px solid ${color}20`, fontFamily: 'var(--font-sans)' }}>
                          Back to track overview
                        </Link>
                      )}
                    </motion.div>
                  </motion.div>
                )}
              </>
            ) : (
              <FallbackLesson lessonId={lessonId} color={color} />
            )}
          </motion.div>
        )}

        {/* ── Apply it (Prompt Lab) tab ── */}
        {activeTab === 'lab' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <PromptLab scenario={scenario} color={color} />

            {/* Step nav */}
            <div className="flex items-center justify-between mt-8 pt-5" style={{ borderTop: '1px solid #F1F5F9' }}>
              <button
                onClick={goPrev}
                className="flex items-center gap-1.5 text-sm transition-colors hover:text-slate-700"
                style={{ color: '#9CA3AF', fontFamily: 'var(--font-sans)' }}
              >
                <ArrowLeft size={13} /> Test
              </button>
              {nextLesson ? (
                <Link
                  href={`/tracks/${trackId}/lessons/${nextLesson.id}`}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all hover:opacity-90"
                  style={{ background: color, color: '#fff', fontFamily: 'var(--font-sans)' }}
                >
                  Next Lesson <ArrowRight size={14} />
                </Link>
              ) : (
                <Link
                  href={`/tracks/${trackId}`}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm"
                  style={{ background: `${color}10`, color, border: `1px solid ${color}20`, fontFamily: 'var(--font-sans)' }}
                >
                  Track overview
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {isLocked && (
          <PaywallOverlay
            trackId={trackId}
            trackColor={color}
            lessonTitle={lesson?.title ?? 'Next lesson'}
            completedCount={state.completedLessons.length}
            totalLessons={totalLessons}
            user={user}
            onSignUp={openSignUp}
            onSignIn={openSignIn}
            onUpgrade={handleUpgrade}
          />
        )}
      </AnimatePresence>
      {searchOpen && <GlobalSearch open={searchOpen} onClose={() => setSearchOpen(false)} />}
      <AITutor
        ref={tutorRef}
        floating
        lessonTitle={lesson?.title ?? ''}
        trackId={trackId}
        lessonContent={lesson?.content}
        keyTakeaways={lesson?.keyTakeaways}
        color={color}
      />
    </main>
  )
}
