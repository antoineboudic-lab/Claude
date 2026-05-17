'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import {
  ArrowLeft, ArrowRight, CheckCircle2, Clock,
  BookOpen, Lightbulb, Dumbbell, HelpCircle, Zap, Sparkles,
  Lock, Check, FlaskConical, Send, ChevronDown, Copy, RotateCcw,
} from 'lucide-react'
import { useGame } from '@/context/GameContext'
import { useAuth } from '@/context/AuthContext'
import { LevelBar } from '@/components/gamification/LevelBar'
import { XP } from '@/lib/gamification'
import { getLesson, getNextLesson, getTrack } from '@/lib/curriculum'
import type { Lesson, Module } from '@/lib/curriculum'
import type { TrackId } from '@/lib/curriculum/types'

const easing = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number]

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
    <div className="space-y-4">
      <ReactMarkdown
        components={{
          h2: ({ children }) => (
            <h2 className="text-base font-bold mt-6 mb-2 first:mt-0"
              style={{ fontFamily: 'var(--font-sans)', color: '#0F172A' }}>
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-sm font-bold mt-4 mb-1"
              style={{ fontFamily: 'var(--font-sans)', color: '#334155' }}>
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="text-sm leading-7"
              style={{ color: '#475569', fontFamily: 'var(--font-sans)' }}>
              {children}
            </p>
          ),
          strong: ({ children }) => (
            <strong style={{ color: '#0F172A', fontWeight: 700 }}>{children}</strong>
          ),
          em: ({ children }) => (
            <em style={{ color: color }}>{children}</em>
          ),
          ul: ({ children }) => (
            <ul className="space-y-1.5 my-2 pl-4">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="space-y-1.5 my-2 pl-4 list-decimal">{children}</ol>
          ),
          li: ({ children }) => (
            <li className="text-sm leading-6 flex gap-2"
              style={{ color: '#475569', fontFamily: 'var(--font-sans)' }}>
              <span style={{ color }} className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 block" />
              <span>{children}</span>
            </li>
          ),
          blockquote: ({ children }) => (
            <div className="pl-4 py-2 my-3 rounded-r-lg"
              style={{ borderLeft: `2px solid ${color}`, background: `${color}06` }}>
              {children}
            </div>
          ),
          code: ({ children }) => (
            <code className="px-1.5 py-0.5 rounded text-xs"
              style={{ background: '#F1F5F9', color: '#7C3AED', fontFamily: 'monospace' }}>
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
      style={{ background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
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
  onSignUp,
  onSignIn,
}: {
  trackId: string
  trackColor: string
  lessonTitle: string
  completedCount: number
  totalLessons: number
  onSignUp: () => void
  onSignIn: () => void
}) {
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
        <div className="h-1.5" style={{ background: `linear-gradient(90deg, ${trackColor}, #7C3AED)` }} />

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
          <div className="p-4 rounded-2xl mb-5" style={{ background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
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
                style={{ background: `linear-gradient(90deg, ${trackColor}, #7C3AED)` }}
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

          {/* CTA */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onSignUp}
            className="w-full py-4 rounded-xl font-bold text-sm text-white mb-3 transition-opacity hover:opacity-95"
            style={{
              background: `linear-gradient(135deg, ${trackColor}, #7C3AED)`,
              boxShadow: `0 8px 28px ${trackColor}40`,
              fontFamily: 'var(--font-sans)',
            }}
          >
            Start My 7-Day Free Trial
          </motion.button>

          <p className="text-center text-xs mb-3" style={{ color: '#94A3B8', fontFamily: 'var(--font-sans)' }}>
            Free for 7 days &middot; Then $49/month &middot; Cancel anytime
          </p>

          <button
            onClick={onSignIn}
            className="w-full text-center text-xs font-medium py-1 transition-colors hover:text-slate-700"
            style={{ color: '#94A3B8', fontFamily: 'var(--font-sans)' }}>
            Already have an account? Sign in
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── Prompt Lab component ─────────────────────────────────────────────────────

function PromptLab({ scenario, color }: { scenario: LabScenario; color: string }) {
  const [prompt, setPrompt] = useState(scenario.starterPrompt)
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [showExpert, setShowExpert] = useState(false)
  const [copied, setCopied] = useState(false)
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

  const reset = () => {
    setPrompt(scenario.starterPrompt)
    setResponse('')
    setSubmitted(false)
    setShowExpert(false)
    setError('')
  }

  return (
    <div className="space-y-5">
      {/* Scenario card */}
      <div className="p-6 rounded-2xl" style={{ background: `${color}06`, border: `1px solid ${color}20` }}>
        <div className="flex items-center gap-2 mb-3">
          <FlaskConical size={15} color={color} />
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color, fontFamily: 'var(--font-sans)' }}>
            Prompt Lab
          </span>
          <span className="ml-auto text-xs px-2.5 py-1 rounded-full font-semibold"
            style={{ background: '#EDE9FE', color: '#7C3AED', fontFamily: 'var(--font-sans)' }}>
            Live AI · Claude
          </span>
        </div>
        <h3 className="text-base font-bold mb-2" style={{ color: '#0F172A', fontFamily: 'var(--font-sans)' }}>
          {scenario.title}
        </h3>
        <p className="text-sm leading-relaxed mb-3" style={{ color: '#475569', fontFamily: 'var(--font-sans)' }}>
          {scenario.context}
        </p>
        <div className="p-3 rounded-xl" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0' }}>
          <p className="text-xs font-semibold mb-0.5" style={{ color: '#94A3B8', fontFamily: 'var(--font-sans)' }}>
            Your task
          </p>
          <p className="text-sm" style={{ color: '#334155', fontFamily: 'var(--font-sans)' }}>
            {scenario.task}
          </p>
        </div>
      </div>

      {/* Prompt editor */}
      <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
        <div className="px-4 py-2.5 flex items-center justify-between"
          style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
          <span className="text-xs font-semibold" style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}>
            Your prompt
          </span>
          <button onClick={reset}
            className="flex items-center gap-1 text-xs transition-colors hover:text-slate-600"
            style={{ color: '#94A3B8', fontFamily: 'var(--font-sans)' }}>
            <RotateCcw size={10} /> Reset
          </button>
        </div>
        <textarea
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) runPrompt() }}
          rows={5}
          placeholder="Write your prompt here…"
          className="w-full px-4 py-4 text-sm resize-none focus:outline-none"
          style={{ color: '#334155', fontFamily: 'var(--font-sans)', background: '#FFFFFF' }}
        />
        <div className="px-4 py-3 flex items-center justify-between"
          style={{ background: '#F8FAFC', borderTop: '1px solid #F1F5F9' }}>
          <span className="text-xs" style={{ color: '#CBD5E1', fontFamily: 'var(--font-sans)' }}>
            ⌘ + Enter to run
          </span>
          <button
            onClick={runPrompt}
            disabled={loading || !prompt.trim()}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all disabled:opacity-40"
            style={{ background: loading ? '#A78BFA' : color, fontFamily: 'var(--font-sans)' }}>
            {loading ? (
              <><span className="animate-spin inline-block w-3 h-3 border-2 border-white border-t-transparent rounded-full" /> Running…</>
            ) : (
              <><Send size={13} /> Run with Claude</>
            )}
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="p-4 rounded-xl text-sm" style={{ background: '#FFF1F2', border: '1px solid #FDA4AF', color: '#DC2626', fontFamily: 'var(--font-sans)' }}>
          {error === 'API key not configured'
            ? 'Add your ANTHROPIC_API_KEY to .env.local to activate the Prompt Lab.'
            : error}
        </div>
      )}

      {/* AI Response */}
      {response && (
        <motion.div
          ref={responseRef}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="rounded-2xl overflow-hidden"
          style={{ border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <div className="px-4 py-2.5 flex items-center justify-between"
            style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full" style={{ background: '#D4763B' }} />
              <span className="text-xs font-semibold" style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}>
                Claude's response
              </span>
            </div>
            <button onClick={copyResponse}
              className="flex items-center gap-1 text-xs transition-colors hover:text-slate-700"
              style={{ color: '#94A3B8', fontFamily: 'var(--font-sans)' }}>
              <Copy size={11} /> {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <div className="px-5 py-5">
            <p className="text-sm leading-7 whitespace-pre-wrap" style={{ color: '#334155', fontFamily: 'var(--font-sans)' }}>
              {response}
            </p>
          </div>
        </motion.div>
      )}

      {/* Expert prompt reveal */}
      {submitted && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}>
          <button
            onClick={() => setShowExpert(!showExpert)}
            className="w-full flex items-center justify-between px-5 py-4 rounded-xl transition-colors"
            style={{
              background: showExpert ? '#EDE9FE' : '#F8FAFC',
              border: `1px solid ${showExpert ? '#DDD6FE' : '#E2E8F0'}`,
              fontFamily: 'var(--font-sans)',
            }}>
            <div className="flex items-center gap-2">
              <Sparkles size={14} color="#7C3AED" />
              <span className="text-sm font-semibold" style={{ color: '#7C3AED' }}>
                See the expert prompt
              </span>
              <span className="text-xs" style={{ color: '#94A3B8' }}>— compare your approach</span>
            </div>
            <ChevronDown
              size={15} color="#7C3AED"
              className={`transition-transform ${showExpert ? 'rotate-180' : ''}`}
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
                <div className="mt-3 space-y-4">
                  {/* Expert prompt */}
                  <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid #DDD6FE' }}>
                    <div className="px-4 py-2.5" style={{ background: '#EDE9FE', borderBottom: '1px solid #DDD6FE' }}>
                      <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#7C3AED', fontFamily: 'var(--font-sans)' }}>
                        Expert prompt
                      </span>
                    </div>
                    <div className="px-5 py-4" style={{ background: '#FEFCFF' }}>
                      <pre className="text-sm leading-7 whitespace-pre-wrap"
                        style={{ color: '#334155', fontFamily: 'var(--font-sans)' }}>
                        {scenario.expertPrompt}
                      </pre>
                    </div>
                  </div>
                  {/* Explanation */}
                  <div className="p-4 rounded-xl" style={{ background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                    <p className="text-xs font-bold mb-1.5" style={{ color: '#475569', fontFamily: 'var(--font-sans)' }}>
                      Why it works
                    </p>
                    <p className="text-sm leading-relaxed" style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}>
                      {scenario.expertExplanation}
                    </p>
                  </div>
                  {/* Try it */}
                  <button
                    onClick={() => { setPrompt(scenario.expertPrompt); setShowExpert(false); setResponse(''); setSubmitted(false) }}
                    className="w-full py-3 rounded-xl text-sm font-semibold transition-colors"
                    style={{ background: '#7C3AED', color: '#FFFFFF', fontFamily: 'var(--font-sans)' }}>
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

// ─── Main page ────────────────────────────────────────────────────────────────

export default function LessonPage() {
  const params = useParams()
  const lessonId = params.lessonId as string
  const trackId = params.trackId as string
  const color = trackColors[trackId] ?? '#7C3AED'
  const track = getTrack(trackId as TrackId)
  const totalLessons = track ? track.modules.reduce((acc, m) => acc + m.lessons.length, 0) : 20

  const [activeTab, setActiveTab] = useState<Tab>('lesson')
  const scenario = getScenario(trackId, lessonId)
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [exerciseDone, setExerciseDone] = useState(false)
  const [isInPath, setIsInPath] = useState(false)

  const { user, openSignIn, openSignUp } = useAuth()
  const { addXP, completeLesson, completePerfectQuiz, state } = useGame()

  // Module 1 is free; Module 2+ requires sign-in (trial access)
  const moduleNum = parseInt(lessonId.match(/-m(\d+)-/)?.[1] ?? '1', 10)
  const isLocked = moduleNum > 1 && !user

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
    setQuizSubmitted(true)
    if (allCorrect) {
      completePerfectQuiz()
    } else {
      addXP(XP.QUIZ_PASS, 'Quiz complete')
    }
  }

  const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: 'lesson', label: 'Lesson', icon: BookOpen },
    { id: 'exercise', label: 'Exercise', icon: Dumbbell },
    { id: 'quiz', label: 'Quiz', icon: HelpCircle },
    { id: 'lab', label: 'Prompt Lab', icon: FlaskConical },
  ]

  return (
    <main style={{ background: '#F8FAFC', minHeight: '100vh' }}>
      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-40 px-6 py-3 flex items-center gap-4"
        style={{
          background: 'rgba(255,255,255,0.95)',
          borderBottom: '1px solid #E2E8F0',
          backdropFilter: 'blur(12px)',
        }}>
        <Link
          href={`/tracks/${trackId}`}
          className="inline-flex items-center gap-1.5 text-sm transition-colors hover:text-slate-700 flex-shrink-0"
          style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}
        >
          <ArrowLeft size={14} />
          <span className="hidden sm:inline">Back</span>
        </Link>

        {/* Progress bar */}
        <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: '#E2E8F0' }}>
          <motion.div
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="h-full rounded-full"
            style={{ background: `linear-gradient(90deg, ${color}, ${color}aa)` }}
          />
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          <LevelBar />
          <button
            onClick={handleMarkComplete}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all"
            style={
              completed
                ? { background: '#D1FAE5', color: '#059669', border: '1px solid #A7F3D0' }
                : { background: `${color}10`, color, border: `1px solid ${color}25`, fontFamily: 'var(--font-sans)' }
            }
          >
            {completed ? <><CheckCircle2 size={13} /> Done</> : 'Mark complete'}
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 pt-24 pb-20">
        {/* Lesson header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: easing }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            {isInPath && (
              <span className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full"
                style={{ background: '#EDE9FE', color: '#7C3AED', fontFamily: 'var(--font-sans)', border: '1px solid #DDD6FE' }}>
                <Sparkles size={9} /> From your AI path
              </span>
            )}
            {module && (
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full"
                style={{ background: `${color}10`, color, fontFamily: 'var(--font-sans)' }}>
                {module.title}
              </span>
            )}
            <span className="flex items-center gap-1 text-xs" style={{ color: '#94A3B8', fontFamily: 'var(--font-sans)' }}>
              <Clock size={12} /> {lesson?.duration ?? 15} min
            </span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-black mb-3"
            style={{ fontFamily: 'var(--font-sans)', color: '#0F172A' }}>
            {lesson?.title ?? lessonId}
          </h1>
          {lesson?.description && (
            <p className="text-base leading-relaxed" style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}>
              {lesson.description}
            </p>
          )}
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-1 p-1 rounded-xl mb-8"
          style={{ background: '#F1F5F9', border: '1px solid #E2E8F0' }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all"
              style={
                activeTab === tab.id
                  ? { background: '#FFFFFF', color, fontFamily: 'var(--font-sans)', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }
                  : { color: '#94A3B8', fontFamily: 'var(--font-sans)' }
              }
            >
              <tab.icon size={14} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── Lesson tab ── */}
        {activeTab === 'lesson' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="space-y-6">
            {lesson ? (
              <>
                <div className="p-6 rounded-2xl"
                  style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                  <LessonContent content={lesson.content} color={color} />
                </div>

                {/* Key takeaways */}
                <div className="p-6 rounded-2xl"
                  style={{ background: `${color}06`, border: `1px solid ${color}20` }}>
                  <div className="flex items-center gap-2 mb-4">
                    <Lightbulb size={16} color={color} />
                    <h3 className="text-sm font-bold" style={{ fontFamily: 'var(--font-sans)', color: '#0F172A' }}>
                      Key Takeaways
                    </h3>
                  </div>
                  <ul className="space-y-2.5">
                    {lesson.keyTakeaways.map((point, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm"
                        style={{ color: '#475569', fontFamily: 'var(--font-sans)' }}>
                        <CheckCircle2 size={14} color={color} className="mt-0.5 flex-shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            ) : (
              <FallbackLesson lessonId={lessonId} color={color} />
            )}

            <button
              onClick={() => setActiveTab('exercise')}
              className="w-full py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all hover:opacity-90"
              style={{ background: `linear-gradient(135deg, ${color}, ${color}bb)`, color: '#fff', fontFamily: 'var(--font-sans)' }}
            >
              Continue to Exercise <ArrowRight size={16} />
            </button>
          </motion.div>
        )}

        {/* ── Exercise tab ── */}
        {activeTab === 'exercise' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            {lesson ? (
              <div className="p-7 rounded-2xl mb-6"
                style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                <div className="flex items-center gap-2 mb-1">
                  <Dumbbell size={16} color={color} />
                  <span className="text-xs font-semibold" style={{ color, fontFamily: 'var(--font-sans)' }}>
                    Hands-on Exercise
                  </span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs mb-4"
                  style={{ background: '#F8FAFC', color: '#64748B', border: '1px solid #E2E8F0', fontFamily: 'var(--font-sans)' }}>
                  Tool: {lesson.exercise.tool}
                </div>
                <h2 className="text-xl font-black mb-2"
                  style={{ fontFamily: 'var(--font-sans)', color: '#0F172A' }}>
                  {lesson.exercise.title}
                </h2>
                <p className="text-sm leading-relaxed mb-6" style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}>
                  {lesson.exercise.description}
                </p>
                <ol className="space-y-4">
                  {lesson.exercise.steps.map((step, i) => (
                    <li key={i} className="flex gap-4">
                      <div className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-black mt-0.5"
                        style={{ background: `${color}12`, color, fontFamily: 'var(--font-sans)' }}>
                        {i + 1}
                      </div>
                      <p className="text-sm leading-relaxed pt-0.5" style={{ color: '#475569', fontFamily: 'var(--font-sans)' }}>
                        {step}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            ) : (
              <FallbackLesson lessonId={lessonId} color={color} />
            )}

            <button
              onClick={handleExerciseDone}
              className="w-full py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all hover:opacity-90"
              style={
                exerciseDone
                  ? { background: '#D1FAE5', color: '#059669', border: '1px solid #A7F3D0', fontFamily: 'var(--font-sans)' }
                  : { background: `linear-gradient(135deg, ${color}, ${color}bb)`, color: '#fff', fontFamily: 'var(--font-sans)' }
              }
            >
              {exerciseDone
                ? <><CheckCircle2 size={15} /> Exercise done — go to Quiz</>
                : <>I&apos;ve completed the exercise <ArrowRight size={16} /></>
              }
            </button>
          </motion.div>
        )}

        {/* ── Quiz tab ── */}
        {activeTab === 'quiz' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="space-y-5">
            {lesson ? (
              <>
                {lesson.quiz.map((q, qi) => (
                  <div key={qi} className="p-6 rounded-2xl"
                    style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                    <p className="text-sm font-semibold mb-4"
                      style={{ color: '#0F172A', fontFamily: 'var(--font-sans)' }}>
                      {qi + 1}. {q.question}
                    </p>
                    <div className="space-y-2.5">
                      {q.options.map((opt, oi) => {
                        const selected = quizAnswers[qi] === oi
                        const isCorrect = oi === q.correct
                        return (
                          <button
                            key={oi}
                            onClick={() => !quizSubmitted && setQuizAnswers(prev => ({ ...prev, [qi]: oi }))}
                            className="w-full text-left px-4 py-3 rounded-xl text-sm transition-all"
                            style={{
                              fontFamily: 'var(--font-sans)',
                              background: quizSubmitted
                                ? isCorrect ? '#D1FAE5' : selected ? '#FEE2E2' : '#F8FAFC'
                                : selected ? `${color}08` : '#F8FAFC',
                              border: quizSubmitted
                                ? isCorrect ? '1px solid #A7F3D0' : selected ? '1px solid #FECACA' : '1px solid #E2E8F0'
                                : selected ? `1px solid ${color}` : '1px solid #E2E8F0',
                              color: quizSubmitted
                                ? isCorrect ? '#059669' : selected ? '#DC2626' : '#64748B'
                                : selected ? color : '#64748B',
                              cursor: quizSubmitted ? 'default' : 'pointer',
                            }}
                          >
                            {opt}
                          </button>
                        )
                      })}
                    </div>
                    {quizSubmitted && (
                      <div className="mt-3 p-3 rounded-lg text-xs leading-relaxed"
                        style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', color: '#64748B', fontFamily: 'var(--font-sans)' }}>
                        <span className="font-semibold" style={{ color: '#334155' }}>Why: </span>
                        {q.explanation}
                      </div>
                    )}
                  </div>
                ))}

                {!quizSubmitted ? (
                  <button
                    onClick={handleQuizSubmit}
                    disabled={Object.keys(quizAnswers).length < lesson.quiz.length}
                    className="w-full py-3.5 rounded-xl font-semibold text-sm transition-all disabled:opacity-40 hover:opacity-90"
                    style={{ background: `linear-gradient(135deg, ${color}, ${color}bb)`, color: '#fff', fontFamily: 'var(--font-sans)' }}
                  >
                    Submit Answers
                  </button>
                ) : (
                  <div className="space-y-3">
                    {!completed && (
                      <button
                        onClick={handleMarkComplete}
                        className="w-full py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2"
                        style={{ background: '#D1FAE5', color: '#059669', border: '1px solid #A7F3D0', fontFamily: 'var(--font-sans)' }}
                      >
                        <CheckCircle2 size={15} /> Mark lesson complete (+{XP.LESSON_COMPLETE} XP)
                      </button>
                    )}
                    {nextLesson && (
                      <Link
                        href={`/tracks/${trackId}/lessons/${nextLesson.id}`}
                        className="w-full py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all hover:opacity-90"
                        style={{ background: `linear-gradient(135deg, ${color}, ${color}bb)`, color: '#fff', fontFamily: 'var(--font-sans)' }}
                      >
                        Next Lesson <ArrowRight size={16} />
                      </Link>
                    )}
                    {!nextLesson && (
                      <Link
                        href={`/tracks/${trackId}`}
                        className="w-full py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2"
                        style={{ background: `${color}10`, color, border: `1px solid ${color}20`, fontFamily: 'var(--font-sans)' }}
                      >
                        Back to track overview
                      </Link>
                    )}
                  </div>
                )}
              </>
            ) : (
              <FallbackLesson lessonId={lessonId} color={color} />
            )}
          </motion.div>
        )}

        {/* ── Prompt Lab tab ── */}
        {activeTab === 'lab' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <PromptLab scenario={scenario} color={color} />
          </motion.div>
        )}
      </div>

      {/* Paywall — Module 2+ locked for unauthenticated users */}
      <AnimatePresence>
        {isLocked && (
          <PaywallOverlay
            trackId={trackId}
            trackColor={color}
            lessonTitle={lesson?.title ?? 'Next lesson'}
            completedCount={state.completedLessons.length}
            totalLessons={totalLessons}
            onSignUp={openSignUp}
            onSignIn={openSignIn}
          />
        )}
      </AnimatePresence>
    </main>
  )
}
