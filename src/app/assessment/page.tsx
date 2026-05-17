'use client'

import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Megaphone, LineChart, HeartHandshake, TrendingUp,
  Settings, Briefcase, User, ArrowLeft, ArrowRight,
  Check, Zap, Clock, Target, Users, TrendingUp as Trend,
  Star, Brain, X, CheckCircle2,
  Scale, Package, Headphones, BarChart,
} from 'lucide-react'
import type { AssessmentAnswers, Role, TimeCommitment, Industry, CompanySize } from '@/lib/assessment/types'
import { buildAssessmentResult, deriveExperience } from '@/lib/assessment/engine'
import { useAuth } from '@/context/AuthContext'
import { saveAssessment } from '@/lib/supabase/db'

const F = 'var(--font-sans)'

// ─── Step types ───────────────────────────────────────────────────────────────

type StepId = 'welcome' | 'role' | 'subRole' | 'context' | 'tools' | 'skillCheck' | 'challenge' | 'goals' | 'time' | 'processing'

// ─── Role data ────────────────────────────────────────────────────────────────

const ROLES = [
  { id: 'marketing' as Role, label: 'Marketing', icon: Megaphone, color: '#EC4899', detail: 'Brand, content, campaigns, growth' },
  { id: 'finance' as Role, label: 'Finance', icon: LineChart, color: '#F59E0B', detail: 'FP&A, reporting, treasury, accounting' },
  { id: 'hr' as Role, label: 'HR & People', icon: HeartHandshake, color: '#10B981', detail: 'Talent, L&D, employee experience' },
  { id: 'sales' as Role, label: 'Sales', icon: TrendingUp, color: '#8B5CF6', detail: 'Revenue, account management, BD' },
  { id: 'operations' as Role, label: 'Operations', icon: Settings, color: '#22D3EE', detail: 'Process, supply chain, quality' },
  { id: 'leadership' as Role, label: 'Leadership', icon: Briefcase, color: '#F97316', detail: 'CEO, Director, VP, C-suite' },
  { id: 'legal' as Role, label: 'Legal', icon: Scale, color: '#6366F1', detail: 'Counsel, compliance, contracts, IP' },
  { id: 'product' as Role, label: 'Product', icon: Package, color: '#14B8A6', detail: 'PM, PO, product strategy, roadmap' },
  { id: 'customer' as Role, label: 'Customer Success', icon: Headphones, color: '#F43F5E', detail: 'CS, account health, renewals, support' },
  { id: 'consulting' as Role, label: 'Consulting', icon: BarChart, color: '#0EA5E9', detail: 'Strategy, advisory, client delivery' },
  { id: 'other' as Role, label: 'Other', icon: User, color: '#94A3B8', detail: 'Something else entirely' },
]

// ─── Sub-role data ────────────────────────────────────────────────────────────

const SUB_ROLES: Partial<Record<Role, { id: string; label: string; detail: string }[]>> = {
  marketing: [
    { id: 'brand-comms', label: 'Brand & Communications', detail: 'Messaging, PR, brand identity' },
    { id: 'content-seo', label: 'Content & SEO', detail: 'Blog, organic, editorial' },
    { id: 'growth-perf', label: 'Growth & Performance', detail: 'Paid, CRO, analytics' },
    { id: 'campaigns', label: 'Campaigns & Creative', detail: 'Campaigns, creative production' },
    { id: 'cmo', label: 'CMO / Marketing Leader', detail: 'Strategy, team, budget' },
  ],
  finance: [
    { id: 'fpa', label: 'FP&A & Reporting', detail: 'Forecasting, budgeting, decks' },
    { id: 'accounting', label: 'Accounting & Controlling', detail: 'Month-end, reconciliation' },
    { id: 'treasury', label: 'Treasury & Risk', detail: 'Cash, hedging, risk management' },
    { id: 'cfo', label: 'CFO / Finance Leader', detail: 'Strategy, investor relations' },
  ],
  hr: [
    { id: 'talent', label: 'Talent Acquisition', detail: 'Recruiting, sourcing, hiring' },
    { id: 'ld', label: 'Learning & Development', detail: 'Training, upskilling, L&D design' },
    { id: 'hrbp', label: 'HR Business Partner', detail: 'Org design, employee relations' },
    { id: 'chro', label: 'CHRO / People Leader', detail: 'People strategy, culture' },
  ],
  sales: [
    { id: 'ae', label: 'Account Executive', detail: 'Full-cycle closing, demos' },
    { id: 'sdr', label: 'SDR / BDR', detail: 'Outbound prospecting, pipeline' },
    { id: 'am', label: 'Account Management', detail: 'Renewals, expansion, success' },
    { id: 'vp-sales', label: 'Sales Manager / VP', detail: 'Team leadership, forecasting' },
  ],
  operations: [
    { id: 'process', label: 'Process & Operations', detail: 'SOPs, efficiency, workflows' },
    { id: 'supply-chain', label: 'Supply Chain', detail: 'Procurement, logistics, planning' },
    { id: 'quality', label: 'Quality & Compliance', detail: 'QA, audit, standards' },
    { id: 'coo', label: 'COO / Ops Leader', detail: 'Operational strategy, execution' },
  ],
  legal: [
    { id: 'in-house', label: 'In-House Counsel', detail: 'Corporate legal, contracts, risk' },
    { id: 'compliance', label: 'Compliance & Regulatory', detail: 'Policy, audit, regulation' },
    { id: 'litigation', label: 'Litigation & Dispute', detail: 'Dispute resolution, research' },
    { id: 'clco', label: 'CLO / Legal Leader', detail: 'Legal strategy, team leadership' },
  ],
  product: [
    { id: 'pm', label: 'Product Manager', detail: 'Roadmap, discovery, delivery' },
    { id: 'po', label: 'Product Owner', detail: 'Backlog, sprint, Agile' },
    { id: 'growth-pm', label: 'Growth PM', detail: 'Experimentation, activation, retention' },
    { id: 'cpo', label: 'CPO / Product Leader', detail: 'Product strategy, portfolio' },
  ],
  customer: [
    { id: 'csm', label: 'Customer Success Manager', detail: 'Onboarding, health, renewals' },
    { id: 'cs-ops', label: 'CS Operations', detail: 'Tooling, processes, reporting' },
    { id: 'support', label: 'Customer Support', detail: 'Tickets, resolution, satisfaction' },
    { id: 'vp-cs', label: 'VP / Head of CS', detail: 'CS strategy, team, NRR' },
  ],
  consulting: [
    { id: 'analyst', label: 'Analyst / Associate', detail: 'Research, modelling, decks' },
    { id: 'consultant', label: 'Consultant / Manager', detail: 'Client delivery, workstream lead' },
    { id: 'specialist', label: 'Specialist / Domain Expert', detail: 'Deep expertise, advisory' },
    { id: 'partner', label: 'Partner / Director', detail: 'Origination, client leadership' },
  ],
}

// ─── Industry & company ───────────────────────────────────────────────────────

const INDUSTRIES: { id: Industry; label: string }[] = [
  { id: 'technology', label: 'Technology & Software' },
  { id: 'financial-services', label: 'Financial Services' },
  { id: 'consulting', label: 'Consulting & Professional Services' },
  { id: 'consumer-retail', label: 'Consumer Goods & Retail' },
  { id: 'healthcare', label: 'Healthcare & Life Sciences' },
  { id: 'manufacturing', label: 'Manufacturing & Industrial' },
  { id: 'media', label: 'Media & Entertainment' },
  { id: 'government', label: 'Government & Public Sector' },
  { id: 'other-industry', label: 'Other' },
]

const COMPANY_SIZES: { id: CompanySize; label: string; detail: string }[] = [
  { id: 'startup', label: 'Startup', detail: '1–50 people' },
  { id: 'scaleup', label: 'Scale-up', detail: '51–500' },
  { id: 'midmarket', label: 'Mid-market', detail: '501–5,000' },
  { id: 'enterprise', label: 'Enterprise', detail: '5,000+' },
]

// ─── AI tools ─────────────────────────────────────────────────────────────────

const AI_TOOLS = [
  { id: 'chatgpt', label: 'ChatGPT', color: '#10A37F' },
  { id: 'claude', label: 'Claude', color: '#D4763B' },
  { id: 'copilot', label: 'Microsoft Copilot', color: '#0078D4' },
  { id: 'gemini', label: 'Google Gemini', color: '#4285F4' },
  { id: 'perplexity', label: 'Perplexity', color: '#20B2AA' },
  { id: 'midjourney', label: 'Midjourney / Image AI', color: '#9B59B6' },
  { id: 'notion-ai', label: 'Notion AI', color: '#000000' },
  { id: 'other-tools', label: 'Other AI tools', color: '#64748B' },
  { id: 'none', label: "I don't use AI tools yet", color: '#94A3B8' },
]

// ─── Skill check questions ────────────────────────────────────────────────────

interface SkillQuestion {
  q: string
  options: { id: string; label: string; correct: boolean }[]
  explanation: string
}

const SKILL_QUESTIONS: Record<string, SkillQuestion[]> = {
  marketing: [
    {
      q: "You ask AI to write 10 product descriptions and they all sound identical. What's the most effective fix?",
      options: [
        { id: 'a', label: 'Switch to a more powerful AI model', correct: false },
        { id: 'b', label: 'Add brand voice guidelines + one concrete example to your prompt', correct: true },
        { id: 'c', label: 'Generate 50 versions and pick the 10 best', correct: false },
        { id: 'd', label: "Add 'be creative and unique' to the prompt", correct: false },
      ],
      explanation: 'AI mirrors what you give it. Brand voice rules and a concrete example are the highest-leverage fix — they constrain the output to your specific style.',
    },
    {
      q: "Your AI-written email gets 12% open rate vs your usual 35%. What's the first thing to investigate?",
      options: [
        { id: 'a', label: 'Switch to a different AI tool', correct: false },
        { id: 'b', label: 'Whether you included audience profile and examples of past high-performing subject lines', correct: true },
        { id: 'c', label: 'The day and time the email was sent', correct: false },
        { id: 'd', label: "Whether AI can write effective emails at all", correct: false },
      ],
      explanation: "Weak AI output is almost always a prompting problem, not a model problem. Missing context about your audience and what 'good' looks like is the most common cause.",
    },
  ],
  finance: [
    {
      q: "You want AI to help with your monthly FP&A report. What's the right starting point?",
      options: [
        { id: 'a', label: 'Ask AI to write the full report from scratch', correct: false },
        { id: 'b', label: "Export your data, describe the narrative you need, and prompt AI to structure the commentary", correct: true },
        { id: 'c', label: 'Connect AI directly to your financial systems', correct: false },
        { id: 'd', label: 'Use AI only for the executive summary at the end', correct: false },
      ],
      explanation: 'AI works best as a structured output layer on top of your data and domain judgment — not as a data source itself.',
    },
    {
      q: "An AI forecast is 15% higher than your manual model. What's the most rigorous response?",
      options: [
        { id: 'a', label: 'Trust the AI — it has more data', correct: false },
        { id: 'b', label: 'Use AI as a scenario planner and validate key assumptions against your domain knowledge', correct: true },
        { id: 'c', label: 'Average both models to split the difference', correct: false },
        { id: 'd', label: 'Use AI only for costs, not revenue', correct: false },
      ],
      explanation: "AI models pattern-match on historical data. Your domain knowledge flags when the future won't look like the past — that's the combination that produces good forecasts.",
    },
  ],
  hr: [
    {
      q: "Your team spends 6 hours/week screening CVs. What's the most effective AI approach?",
      options: [
        { id: 'a', label: 'Ask AI to rank candidates by keyword matching', correct: false },
        { id: 'b', label: 'Create a structured evaluation rubric, then use AI to score CVs consistently against it', correct: true },
        { id: 'c', label: 'Set an AI score threshold and auto-reject below it', correct: false },
        { id: 'd', label: 'Use AI to rewrite your job descriptions instead', correct: false },
      ],
      explanation: 'The rubric is the key — AI applied to a well-defined criteria set produces consistent, explainable screening. Keyword matching misses strong candidates.',
    },
    {
      q: "You want to use AI to improve employee engagement. Which use case is most appropriate?",
      options: [
        { id: 'a', label: 'Use AI to predict which employees will resign', correct: false },
        { id: 'b', label: 'Use AI to analyse open-text survey feedback and surface themes at scale', correct: true },
        { id: 'c', label: 'Have AI manage individual performance review conversations', correct: false },
        { id: 'd', label: 'Use AI to monitor employee communications for sentiment', correct: false },
      ],
      explanation: 'Thematic analysis of open feedback at scale is where AI adds real value in HR — it surfaces insights that would take days to find manually, without touching individual privacy.',
    },
  ],
  sales: [
    {
      q: "You have a major prospect meeting tomorrow. Where can AI add the most value?",
      options: [
        { id: 'a', label: 'Ask AI to write a generic pitch deck', correct: false },
        { id: 'b', label: "Feed the prospect's public info, recent news, and your solution into AI to generate tailored talking points", correct: true },
        { id: 'c', label: 'Have AI cold-call the prospect beforehand', correct: false },
        { id: 'd', label: 'Ask AI to predict the probability of closing the deal', correct: false },
      ],
      explanation: "The research-to-personalization step is where AI saves the most time in sales prep — and tailored conversations consistently outperform generic pitches.",
    },
    {
      q: "CRM notes across your team are inconsistent and patchy. What's the best AI solution?",
      options: [
        { id: 'a', label: 'Use AI to delete old notes and start clean', correct: false },
        { id: 'b', label: 'Give reps a prompt template to fill post-call, then AI formats it into structured notes', correct: true },
        { id: 'c', label: 'Have AI auto-read email threads and generate notes independently', correct: false },
        { id: 'd', label: 'Use AI to generate notes with no rep input', correct: false },
      ],
      explanation: "Human judgment + AI formatting is the winning combination — reps know what happened, AI ensures it's structured consistently so the data is actually usable.",
    },
  ],
  operations: [
    {
      q: "You want to reduce the time spent documenting processes. What's the right AI approach?",
      options: [
        { id: 'a', label: 'Ask AI to document processes from scratch using general knowledge', correct: false },
        { id: 'b', label: 'Record a process walkthrough, then prompt AI to transcribe and structure it into an SOP', correct: true },
        { id: 'c', label: 'Have AI auto-discover processes by monitoring your systems', correct: false },
        { id: 'd', label: 'Use AI to interview each process owner and compile the output', correct: false },
      ],
      explanation: "AI is excellent at structuring and formatting — it just needs accurate source material. A walkthrough recording gives it exactly what it needs.",
    },
    {
      q: "You're experiencing recurring supply chain delays. How can AI support better decisions?",
      options: [
        { id: 'a', label: 'Use AI to automatically reroute orders without human review', correct: false },
        { id: 'b', label: 'Feed historical delay patterns and supplier data into AI to model scenarios and prep contingency plans', correct: true },
        { id: 'c', label: 'Replace your procurement team with AI agents', correct: false },
        { id: 'd', label: 'Use AI to communicate directly with suppliers', correct: false },
      ],
      explanation: "Scenario modelling and contingency planning is where AI provides decision support — not autonomous action. Human judgment stays in the loop for consequential calls.",
    },
  ],
  leadership: [
    {
      q: "Your board wants an AI strategy. What's the right first step?",
      options: [
        { id: 'a', label: 'Commission a large-scale AI rollout across all departments', correct: false },
        { id: 'b', label: 'Map current processes, identify 3–5 high-value use cases, build a phased roadmap', correct: true },
        { id: 'c', label: 'Hire a Chief AI Officer before doing anything else', correct: false },
        { id: 'd', label: 'Wait until the technology matures further', correct: false },
      ],
      explanation: "Strategy before scale. Starting with specific, high-value use cases builds credibility and momentum — and gives you evidence to justify the larger investment.",
    },
    {
      q: "Half your team is resistant to AI adoption. What's the most effective leadership approach?",
      options: [
        { id: 'a', label: 'Make AI tool usage mandatory with performance KPIs', correct: false },
        { id: 'b', label: 'Start with quick wins that solve real pain points, share results, and involve sceptics in the process', correct: true },
        { id: 'c', label: 'Focus only on the enthusiasts and manage resisters out', correct: false },
        { id: 'd', label: 'Bring in external consultants to drive the change programme', correct: false },
      ],
      explanation: "Resistance is usually about fear of relevance, not the technology itself. Quick wins that make people's jobs easier are the most powerful change mechanism.",
    },
  ],
  legal: [
    {
      q: "You need to review 200 contracts for a specific clause before a deadline. What's the smartest AI approach?",
      options: [
        { id: 'a', label: 'Ask AI to review them all autonomously and flag any issues', correct: false },
        { id: 'b', label: 'Define the clause criteria precisely, use AI to flag candidates, then review flagged ones yourself', correct: true },
        { id: 'c', label: 'Have AI summarise each contract and read the summaries', correct: false },
        { id: 'd', label: "Use AI only on contracts you're already familiar with", correct: false },
      ],
      explanation: 'AI as a triage and flagging layer — with human review of the flagged items — is the model that preserves legal judgment while dramatically accelerating throughput.',
    },
    {
      q: "A client asks if AI-generated legal advice is reliable. What's the most accurate response?",
      options: [
        { id: 'a', label: 'Yes — modern AI is trained on legal data and produces accurate advice', correct: false },
        { id: 'b', label: 'AI is a research and drafting accelerator, not a substitute for qualified legal judgment', correct: true },
        { id: 'c', label: 'It depends on which AI tool you use', correct: false },
        { id: 'd', label: "AI is reliable for standard matters but not complex ones", correct: false },
      ],
      explanation: 'AI can surface case law, draft clauses, and accelerate research — but legal advice requires licensed professional judgment. The two are complementary, not interchangeable.',
    },
  ],
  product: [
    {
      q: "You have 50 user interviews to synthesise before a roadmap meeting. What's the most effective AI approach?",
      options: [
        { id: 'a', label: 'Ask AI to summarise each transcript and read the summaries', correct: false },
        { id: 'b', label: 'Feed transcripts to AI with a structured theme framework and have it surface patterns across all 50', correct: true },
        { id: 'c', label: 'Use AI to pick the 5 most representative interviews', correct: false },
        { id: 'd', label: 'Summarise interviews yourself and use AI to write the readout', correct: false },
      ],
      explanation: "Pattern synthesis across many qualitative inputs is where AI adds the most value in research — it finds themes you'd miss reading sequentially and does it in minutes.",
    },
    {
      q: "Your team is debating two features for the next sprint. How can AI help make a better decision?",
      options: [
        { id: 'a', label: 'Ask AI which feature will have more impact', correct: false },
        { id: 'b', label: 'Use AI to structure the decision framework, score against your criteria, and surface assumptions', correct: true },
        { id: 'c', label: 'Have AI write a PRD for both and compare them', correct: false },
        { id: 'd', label: 'Use AI to predict user adoption for each feature', correct: false },
      ],
      explanation: "AI doesn't know your users or strategy — but it's excellent at structuring trade-off analysis and stress-testing your assumptions once you define the criteria.",
    },
  ],
  customer: [
    {
      q: "You manage 80 accounts and can't review health scores manually every week. What's the best AI approach?",
      options: [
        { id: 'a', label: 'Use AI to automatically send check-in emails when health drops', correct: false },
        { id: 'b', label: 'Build an AI-assisted alert system that flags accounts needing attention based on signals you define', correct: true },
        { id: 'c', label: 'Ask AI to predict which customers will churn', correct: false },
        { id: 'd', label: 'Use AI to prioritise your existing manual review process', correct: false },
      ],
      explanation: 'Signal-based alerting — where you define what matters and AI monitors it at scale — lets you focus human attention where it counts most.',
    },
    {
      q: "A customer submits complex feedback that spans product, billing, and onboarding issues. How should AI help?",
      options: [
        { id: 'a', label: "Route it to AI for automatic resolution", correct: false },
        { id: 'b', label: 'Use AI to categorise, summarise, and draft a structured response for your review', correct: true },
        { id: 'c', label: 'Summarise it yourself and use AI to write the reply', correct: false },
        { id: 'd', label: 'Use AI only for the billing component', correct: false },
      ],
      explanation: 'AI as a first-pass triage and draft layer keeps response quality high while dramatically cutting handling time — the human stays in control of the final message.',
    },
  ],
  consulting: [
    {
      q: "You need to build a market sizing model for a new client. How does AI fit into this work?",
      options: [
        { id: 'a', label: 'Ask AI for the market size directly and cite it in the deck', correct: false },
        { id: 'b', label: "Use AI to structure the sizing approach, identify data sources, and stress-test your assumptions", correct: true },
        { id: 'c', label: 'Use AI to write the market sizing section after you build the model', correct: false },
        { id: 'd', label: 'AI is not reliable enough for quantitative consulting work', correct: false },
      ],
      explanation: "AI can't replace primary sources, but it's a powerful thinking partner for structuring analytical problems — and it dramatically accelerates the hypothesis-testing phase.",
    },
    {
      q: "Your team needs to produce a 40-slide client deliverable in 3 days. Where does AI add the most value?",
      options: [
        { id: 'a', label: 'Generating all slide content from the project brief', correct: false },
        { id: 'b', label: 'Drafting narrative structures, synthesising research, and producing first-draft slide commentary for human refinement', correct: true },
        { id: 'c', label: 'Designing the slides and formatting the deck', correct: false },
        { id: 'd', label: 'Writing the executive summary at the end', correct: false },
      ],
      explanation: 'The biggest consulting time sink is going from insight to structured narrative. AI accelerates that translation while your judgment shapes the final story.',
    },
  ],
  other: [
    {
      q: "What's the single most important factor in getting useful output from an AI tool?",
      options: [
        { id: 'a', label: 'Using the most expensive or powerful AI model available', correct: false },
        { id: 'b', label: 'Providing clear context about your goal, your audience, and any constraints', correct: true },
        { id: 'c', label: 'Asking the same question multiple times and picking the best answer', correct: false },
        { id: 'd', label: 'Using technical language to show expertise', correct: false },
      ],
      explanation: "Context is everything. AI doesn't know who you are, what you're trying to achieve, or what constraints you're working under — unless you tell it.",
    },
    {
      q: "You've used AI to draft a work deliverable. What's the right next step before using it?",
      options: [
        { id: 'a', label: "Submit it directly — AI is accurate enough", correct: false },
        { id: 'b', label: 'Review for accuracy, add your domain knowledge, and adjust for your specific context', correct: true },
        { id: 'c', label: 'Add a disclaimer noting AI was used to generate it', correct: false },
        { id: 'd', label: 'Regenerate until it sounds perfect', correct: false },
      ],
      explanation: 'AI is a starting point, not a finished product. Your domain expertise is what turns a plausible-sounding output into something genuinely correct and useful.',
    },
  ],
}

// ─── Challenge data ───────────────────────────────────────────────────────────

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
    { id: 'recruiting-time', label: 'Slow hiring', detail: 'Too much time on recruitment admin' },
    { id: 'employee-scale', label: 'Scaling support', detail: "Can't personalise employee experience at scale" },
    { id: 'people-data', label: 'Using people data', detail: 'Struggle to turn HR analytics into action' },
    { id: 'hr-change', label: 'Driving change', detail: 'Getting the org to adopt new ways of working' },
  ],
  sales: [
    { id: 'prospecting', label: 'Slow prospecting', detail: 'Finding and qualifying leads takes too long' },
    { id: 'pitch-personalization', label: 'Generic pitches', detail: "Can't tailor proposals to each prospect" },
    { id: 'deal-risk', label: 'Missed deal signals', detail: 'Not seeing warning signs early enough' },
    { id: 'sales-admin', label: 'Too much admin', detail: 'CRM and paperwork instead of selling' },
  ],
  operations: [
    { id: 'process-docs', label: 'Knowledge in silos', detail: "Processes live in people's heads" },
    { id: 'supply-chain', label: 'Supply chain visibility', detail: 'Hard to anticipate disruptions' },
    { id: 'quality-detection', label: 'Late quality detection', detail: 'Problems caught too late' },
    { id: 'slow-reporting', label: 'Slow operational reporting', detail: 'Reports take too long to compile' },
  ],
  leadership: [
    { id: 'ai-strategy', label: 'No clear AI strategy', detail: 'Not sure where to start or prioritise' },
    { id: 'team-resistance', label: 'Team resistance', detail: 'People are sceptical or afraid of change' },
    { id: 'business-case', label: 'Building the business case', detail: 'Struggling to get board buy-in' },
    { id: 'ai-governance', label: 'Governance gaps', detail: 'No guidelines for responsible AI use' },
  ],
  legal: [
    { id: 'contract-volume', label: 'Contract review backlog', detail: 'Too many documents, not enough hours' },
    { id: 'research-speed', label: 'Slow legal research', detail: 'Finding relevant precedents takes too long' },
    { id: 'risk-visibility', label: 'Risk blind spots', detail: 'Hard to spot all risk across large document sets' },
    { id: 'legal-comms', label: 'Plain-language communication', detail: 'Translating legal into clear stakeholder language' },
  ],
  product: [
    { id: 'research-synthesis', label: 'Research takes too long', detail: 'User interviews pile up faster than we can synthesise' },
    { id: 'prioritisation', label: 'Endless prioritisation debates', detail: 'Too many opinions, not enough data-driven clarity' },
    { id: 'prd-quality', label: 'Inconsistent PRDs', detail: 'Specs lack clarity and slow engineering down' },
    { id: 'stakeholder-alignment', label: 'Stakeholder misalignment', detail: 'Roadmap decisions take too long to get buy-in on' },
  ],
  customer: [
    { id: 'account-scale', label: 'Too many accounts to manage well', detail: "Can't give each customer the attention they need" },
    { id: 'churn-signals', label: 'Missing churn signals', detail: 'Customers leave without warning' },
    { id: 'onboarding-consistency', label: 'Inconsistent onboarding', detail: 'Quality varies too much across CSMs' },
    { id: 'renewal-prep', label: 'Slow renewal preparation', detail: 'Building QBRs and renewal decks takes too long' },
  ],
  consulting: [
    { id: 'research-time', label: 'Research takes too long', detail: 'Desk research and synthesis eat project time' },
    { id: 'deck-production', label: 'Slide production bottleneck', detail: "Great thinking, but can't translate it fast enough" },
    { id: 'differentiation', label: 'Generic deliverables', detail: 'Hard to make work feel tailored to each client' },
    { id: 'client-comms', label: 'Client communication quality', detail: 'Hard to communicate complex ideas clearly and quickly' },
  ],
  other: [
    { id: 'general', label: 'Saving time', detail: 'Too much time on repetitive, manual work' },
    { id: 'better-decisions', label: 'Making better decisions', detail: 'Need better information to decide well' },
    { id: 'lead-ai', label: 'Leading AI in my org', detail: 'Need to guide others through AI change' },
    { id: 'client-value', label: 'Delivering more value', detail: 'Want AI to help me serve others better' },
  ],
}

// ─── Goals ────────────────────────────────────────────────────────────────────

interface GoalOption {
  id: string
  label: string
  detail: string
  icon: React.ElementType
}

const ROLE_GOALS: Record<string, GoalOption[]> = {
  marketing: [
    { id: 'save-time',        label: 'Produce more content faster',    detail: 'AI-assisted copy, briefs, and campaigns',           icon: Clock  },
    { id: 'better-decisions', label: 'Make data-driven decisions',     detail: 'Turn analytics into clear insights and actions',     icon: Target },
    { id: 'stay-competitive', label: 'Stay ahead of competitors',      detail: 'Move faster and test more than your rivals',         icon: Trend  },
    { id: 'client-value',     label: 'Deliver better campaigns',       detail: 'Stronger results for clients or internal stakeholders', icon: Star },
    { id: 'lead-ai',          label: 'Lead AI in my team',             detail: 'Build a culture of AI-powered marketing work',       icon: Brain  },
    { id: 'upskill-team',     label: 'Upskill my marketing team',      detail: 'Bring the whole team up to AI speed',               icon: Users  },
  ],
  finance: [
    { id: 'save-time',        label: 'Cut reporting time',             detail: 'Automate variance analysis and monthly packs',       icon: Clock  },
    { id: 'better-decisions', label: 'Sharper financial insights',     detail: 'AI-assisted analysis and scenario planning',         icon: Target },
    { id: 'stay-competitive', label: 'Future-proof my career',         detail: 'Build AI skills before they become table stakes',    icon: Trend  },
    { id: 'client-value',     label: 'Better narratives for stakeholders', detail: 'Clearer forecasts and board-ready stories',     icon: Star   },
    { id: 'lead-ai',          label: 'Lead AI in Finance',             detail: 'Position your function as AI-forward',              icon: Brain  },
    { id: 'upskill-team',     label: 'Upskill my finance team',        detail: 'Bring analysts and controllers up to speed',        icon: Users  },
  ],
  hr: [
    { id: 'save-time',        label: 'Speed up HR processes',          detail: 'Faster hiring, onboarding, and documentation',      icon: Clock  },
    { id: 'better-decisions', label: 'Better people decisions',        detail: 'Use analytics to guide talent and org strategy',     icon: Target },
    { id: 'client-value',     label: 'Better employee experience',     detail: 'Personalised support for managers and teams',        icon: Star   },
    { id: 'upskill-team',     label: 'Upskill the whole organisation', detail: 'Design AI learning programmes for employees',        icon: Users  },
    { id: 'lead-ai',          label: 'Lead AI adoption for People',    detail: 'Build an AI-ready workforce strategy',              icon: Brain  },
    { id: 'stay-competitive', label: 'Future-proof my HR career',      detail: 'Build AI skills before they become essential',       icon: Trend  },
  ],
  sales: [
    { id: 'save-time',        label: 'Spend less time on admin',       detail: 'CRM notes, proposals, and research in minutes',     icon: Clock  },
    { id: 'better-decisions', label: 'Win more deals',                 detail: 'AI-powered prospect intel and deal risk signals',   icon: Target },
    { id: 'stay-competitive', label: 'Outperform quota',               detail: 'Prospect and personalise faster than competitors',  icon: Trend  },
    { id: 'client-value',     label: 'More value in every meeting',    detail: 'More personalised, better-prepared conversations',   icon: Star   },
    { id: 'lead-ai',          label: 'Lead AI in my sales team',       detail: 'Build a playbook for AI-assisted selling',          icon: Brain  },
    { id: 'upskill-team',     label: 'Upskill my sales team',          detail: 'Help reps use AI to hit target faster',             icon: Users  },
  ],
  operations: [
    { id: 'save-time',        label: 'Automate repetitive work',       detail: 'SOPs, reports, and workflows off your plate',       icon: Clock  },
    { id: 'better-decisions', label: 'Better operational decisions',   detail: 'AI scenario modelling and supply chain intel',      icon: Target },
    { id: 'stay-competitive', label: 'Build a more efficient operation', detail: 'Cut costs and improve throughput with AI',        icon: Trend  },
    { id: 'client-value',     label: 'Better service to stakeholders', detail: 'Faster resolution and higher quality output',       icon: Star   },
    { id: 'lead-ai',          label: 'Drive AI transformation',        detail: 'Lead process improvement across the business',      icon: Brain  },
    { id: 'upskill-team',     label: 'Upskill my operations team',     detail: 'Get the team comfortable with AI-assisted processes', icon: Users },
  ],
  leadership: [
    { id: 'lead-ai',          label: 'Lead the AI transformation',     detail: 'Build vision, roadmap, and culture for AI adoption', icon: Brain },
    { id: 'upskill-team',     label: 'Build an AI-ready organisation', detail: 'Upskill teams, hire right, and build capability',   icon: Users  },
    { id: 'better-decisions', label: 'Make better strategic decisions', detail: 'AI-augmented analysis and board-ready insights',   icon: Target },
    { id: 'stay-competitive', label: 'Stay ahead of the industry',     detail: 'Lead AI strategy before competitors pull ahead',    icon: Trend  },
    { id: 'save-time',        label: 'Reclaim time for strategy',      detail: 'Less time on detail, more time on direction',       icon: Clock  },
    { id: 'client-value',     label: 'Deliver more value to stakeholders', detail: 'Better decisions mean better outcomes for all', icon: Star  },
  ],
  legal: [
    { id: 'save-time',        label: 'Cut contract review time',       detail: 'Triage and first-pass review in a fraction of the time', icon: Clock  },
    { id: 'better-decisions', label: 'Sharper risk analysis',          detail: 'Catch issues earlier with AI-assisted review',       icon: Target },
    { id: 'client-value',     label: 'More value to the business',     detail: 'Faster, higher-quality legal support for stakeholders', icon: Star },
    { id: 'stay-competitive', label: 'Future-proof my legal career',   detail: 'Build AI skills before they become essential',       icon: Trend  },
    { id: 'lead-ai',          label: 'Lead AI in Legal',               detail: 'Shape how your team uses AI responsibly',           icon: Brain  },
    { id: 'upskill-team',     label: 'Upskill my legal team',          detail: 'Build AI capability across the whole function',      icon: Users  },
  ],
  product: [
    { id: 'save-time',        label: 'Faster research synthesis',      detail: 'Turn user interviews into insights in hours, not days', icon: Clock  },
    { id: 'better-decisions', label: 'Better prioritisation decisions', detail: 'Data-informed roadmap decisions with less debate',  icon: Target },
    { id: 'client-value',     label: 'Ship more impactful features',   detail: 'Build what users actually need, validated faster',   icon: Star   },
    { id: 'stay-competitive', label: 'Build better AI products',       detail: 'Design and ship AI-native features with confidence', icon: Trend  },
    { id: 'lead-ai',          label: 'Lead AI product strategy',       detail: 'Shape the AI direction of your product',            icon: Brain  },
    { id: 'upskill-team',     label: 'Upskill my product team',        detail: 'Get PMs and POs comfortable with AI-assisted work', icon: Users  },
  ],
  customer: [
    { id: 'save-time',        label: 'Scale my account coverage',      detail: 'Manage more accounts without sacrificing quality',   icon: Clock  },
    { id: 'better-decisions', label: 'Spot churn risk earlier',        detail: 'AI-assisted health signals before customers leave',  icon: Target },
    { id: 'client-value',     label: 'Better customer outcomes',       detail: 'More personalised, proactive customer support',      icon: Star   },
    { id: 'stay-competitive', label: 'Future-proof my CS career',      detail: 'Build the AI skills every CS leader will need',     icon: Trend  },
    { id: 'lead-ai',          label: 'Lead AI in Customer Success',    detail: 'Build a scalable AI-powered CS playbook',           icon: Brain  },
    { id: 'upskill-team',     label: 'Upskill my CS team',             detail: 'Bring the whole team up to AI speed',               icon: Users  },
  ],
  consulting: [
    { id: 'save-time',        label: 'Deliver faster',                 detail: 'Cut research and deck production time significantly', icon: Clock  },
    { id: 'better-decisions', label: 'Sharper analysis',               detail: 'More rigorous, data-backed insights for clients',   icon: Target },
    { id: 'client-value',     label: 'More value in every engagement', detail: 'Spend more time on judgment, less on production',    icon: Star   },
    { id: 'stay-competitive', label: 'Stay ahead of peers',            detail: 'Build AI skills that differentiate your practice',  icon: Trend  },
    { id: 'lead-ai',          label: 'Lead AI in your firm',           detail: 'Build the AI practice and methodology for your team', icon: Brain },
    { id: 'upskill-team',     label: 'Upskill my consulting team',     detail: 'Bring analysts and consultants up to speed fast',   icon: Users  },
  ],
  other: [
    { id: 'save-time',        label: 'Save time on routine tasks',     detail: 'Automate the repetitive parts of your work',        icon: Clock  },
    { id: 'better-decisions', label: 'Make better decisions',          detail: 'Use AI to analyse and inform your choices',         icon: Target },
    { id: 'stay-competitive', label: 'Stay competitive',               detail: 'Develop in-demand AI skills',                       icon: Trend  },
    { id: 'lead-ai',          label: 'Lead AI adoption',               detail: 'Build strategy and guide others through change',     icon: Brain  },
    { id: 'upskill-team',     label: 'Upskill my team',                detail: 'Help colleagues grow their AI capability',          icon: Users  },
    { id: 'client-value',     label: 'Deliver more value',             detail: 'Better serve customers and clients with AI',        icon: Star   },
  ],
}

// ─── Time ─────────────────────────────────────────────────────────────────────

const TIME_OPTIONS: { id: TimeCommitment; label: string; detail: string; weeks: string }[] = [
  { id: 'light', label: '~30 min / week', detail: 'One lesson at a time, no rush', weeks: '~20 weeks' },
  { id: 'moderate', label: '1–2 hours / week', detail: 'Steady, consistent progress', weeks: '~8 weeks' },
  { id: 'intensive', label: '3+ hours / week', detail: 'Fast-track to proficiency', weeks: '~4 weeks' },
]

// ─── Processing steps ─────────────────────────────────────────────────────────

const PROCESSING_STEPS = [
  'Analysing your role and experience…',
  'Mapping your challenges to the curriculum…',
  'Scoring your skill check results…',
  'Weighting your goals and priorities…',
  'Building your personalised path…',
]

// ─── Animations ───────────────────────────────────────────────────────────────

const slideIn = {
  hidden: (dir: number) => ({ opacity: 0, x: dir * 40 }),
  visible: { opacity: 1, x: 0, transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
  exit: (dir: number) => ({ opacity: 0, x: -dir * 40, transition: { duration: 0.22 } }),
}

// ─── Default answers ──────────────────────────────────────────────────────────

const DEFAULT_ANSWERS: AssessmentAnswers = {
  name: '',
  role: 'marketing',
  subRole: '',
  industry: 'technology',
  companySize: 'scaleup',
  currentTools: [],
  experience: 'none',
  skillScore: 0,
  challenge: '',
  goals: [],
  timePerWeek: 'moderate',
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function AssessmentPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [stepIdx, setStepIdx] = useState(0)
  const [direction, setDirection] = useState(1)
  const [answers, setAnswers] = useState<AssessmentAnswers>(DEFAULT_ANSWERS)
  const [processingStep, setProcessingStep] = useState(0)

  // Dynamic steps based on role (branching)
  const STEPS = useMemo<StepId[]>(() => {
    const base: StepId[] = ['welcome', 'role']
    if (answers.role !== 'other' && answers.role !== 'leadership') base.push('subRole')
    return [...base, 'context', 'tools', 'skillCheck', 'challenge', 'goals', 'time', 'processing']
  }, [answers.role])

  const currentStep = STEPS[stepIdx]
  const contentStepCount = STEPS.length - 1 // exclude processing

  function goNext() {
    setDirection(1)
    setStepIdx(i => i + 1)
  }

  function goBack() {
    setDirection(-1)
    setStepIdx(i => i - 1)
  }

  // Processing animation
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
            const derived = deriveExperience(answers.currentTools)
            const finalAnswers = { ...answers, experience: derived }
            const result = buildAssessmentResult(finalAnswers)
            localStorage.setItem('ai-literacy-assessment', JSON.stringify(result))
            if (user) await saveAssessment(user.id, result).catch(() => {})
          } catch { /* ignore */ }
          router.push('/assessment/results')
        }, 600)
      }
    }, 650)
    return () => clearInterval(interval)
  }, [currentStep, answers, router, user])

  function canProceed(): boolean {
    switch (currentStep) {
      case 'welcome': return answers.name.trim().length > 0
      case 'role': return true
      case 'subRole': return true
      case 'context': return answers.industry !== undefined && answers.companySize !== undefined
      case 'tools': return answers.currentTools.length > 0
      case 'skillCheck': return true // managed internally
      case 'challenge': return answers.challenge !== ''
      case 'goals': return answers.goals.length > 0
      case 'time': return true
      default: return false
    }
  }

  const challenges = CHALLENGES[answers.role] ?? CHALLENGES.other
  const skillQs = SKILL_QUESTIONS[answers.role] ?? SKILL_QUESTIONS.other
  const goals = ROLE_GOALS[answers.role] ?? ROLE_GOALS.other
  const progressPct = Math.round((stepIdx / contentStepCount) * 100)

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#F8FAFC', fontFamily: F }}>
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 flex-shrink-0"
        style={{ background: '#FFFFFF', borderBottom: '1px solid #E2E8F0' }}>
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#7C3AED' }}>
            <Zap size={16} className="text-white" />
          </div>
          <span className="font-bold text-base" style={{ color: '#0F172A' }}>AI Literacy</span>
        </Link>

        {currentStep !== 'processing' && (
          <div className="flex items-center gap-4">
            <span className="text-xs hidden sm:block" style={{ color: '#94A3B8' }}>
              Step {stepIdx + 1} of {contentStepCount}
            </span>
            <div className="w-32 h-1.5 rounded-full overflow-hidden" style={{ background: '#E2E8F0' }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, #7C3AED, #22D3EE)' }}
                animate={{ width: `${progressPct}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
          </div>
        )}
      </header>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait" custom={direction}>

            {/* ── Welcome ── */}
            {currentStep === 'welcome' && (
              <motion.div key="welcome" custom={direction} variants={slideIn} initial="hidden" animate="visible" exit="exit">
                <div className="text-center mb-10">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-xs font-semibold"
                    style={{ background: '#EDE9FE', color: '#7C3AED' }}>
                    <Zap size={11} /> 5-minute personalised assessment
                  </div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4" style={{ color: '#0F172A' }}>
                    Find your perfect<br />
                    <span style={{ background: 'linear-gradient(90deg, #7C3AED, #22D3EE)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                      AI learning path
                    </span>
                  </h1>
                  <p className="text-lg" style={{ color: '#64748B' }}>
                    We'll ask about your role, goals, and AI knowledge — then build a curriculum that's actually built for you.
                  </p>
                </div>

                <div className="mb-8">
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#334155' }}>What's your name?</label>
                  <input
                    type="text"
                    placeholder="Your first name"
                    value={answers.name}
                    onChange={e => setAnswers(a => ({ ...a, name: e.target.value }))}
                    onKeyDown={e => e.key === 'Enter' && canProceed() && goNext()}
                    autoFocus
                    className="w-full px-5 py-4 rounded-xl text-base outline-none transition-all"
                    style={{ background: '#FFFFFF', border: '1px solid #CBD5E1', color: '#0F172A' }}
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
                    const sel = answers.role === role.id
                    return (
                      <button key={role.id}
                        onClick={() => setAnswers(a => ({ ...a, role: role.id, subRole: '', goals: [], challenge: '' }))}
                        className="p-4 rounded-2xl text-left transition-all hover:scale-[1.02]"
                        style={{ background: sel ? `${role.color}08` : '#FFFFFF', border: `1px solid ${sel ? role.color : '#E2E8F0'}` }}>
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ background: `${role.color}12` }}>
                          <Icon size={17} color={role.color} />
                        </div>
                        <div className="text-sm font-semibold mb-1" style={{ color: '#0F172A' }}>{role.label}</div>
                        <div className="text-xs leading-snug" style={{ color: '#94A3B8' }}>{role.detail}</div>
                        {sel && <div className="mt-2 flex justify-end"><div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: role.color }}><Check size={11} className="text-white" /></div></div>}
                      </button>
                    )
                  })}
                </div>
                <NavButtons canProceed onNext={goNext} onBack={goBack} />
              </motion.div>
            )}

            {/* ── Sub-role ── */}
            {currentStep === 'subRole' && (
              <motion.div key="subRole" custom={direction} variants={slideIn} initial="hidden" animate="visible" exit="exit">
                <StepHeader
                  question="What's your specific focus within that?"
                  sub="This helps us surface the most relevant lessons and examples."
                />
                <div className="grid sm:grid-cols-2 gap-3 mb-8">
                  {(SUB_ROLES[answers.role] ?? []).map(sr => {
                    const sel = answers.subRole === sr.id
                    return (
                      <button key={sr.id}
                        onClick={() => setAnswers(a => ({ ...a, subRole: sr.id }))}
                        className="p-4 rounded-2xl text-left transition-all hover:scale-[1.01]"
                        style={{ background: sel ? '#EDE9FE' : '#FFFFFF', border: `1px solid ${sel ? '#7C3AED' : '#E2E8F0'}` }}>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-sm font-semibold mb-0.5" style={{ color: '#0F172A' }}>{sr.label}</div>
                            <div className="text-xs" style={{ color: '#94A3B8' }}>{sr.detail}</div>
                          </div>
                          {sel && <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ml-3" style={{ background: '#7C3AED' }}><Check size={11} className="text-white" /></div>}
                        </div>
                      </button>
                    )
                  })}
                </div>
                <NavButtons canProceed onNext={goNext} onBack={goBack} />
              </motion.div>
            )}

            {/* ── Context ── */}
            {currentStep === 'context' && (
              <motion.div key="context" custom={direction} variants={slideIn} initial="hidden" animate="visible" exit="exit">
                <StepHeader
                  question="Tell us about your company"
                  sub="We use this to tailor examples and use cases to your world."
                />
                <div className="mb-6">
                  <p className="text-xs font-semibold mb-3 uppercase tracking-wider" style={{ color: '#94A3B8' }}>Industry</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {INDUSTRIES.map(ind => {
                      const sel = answers.industry === ind.id
                      return (
                        <button key={ind.id}
                          onClick={() => setAnswers(a => ({ ...a, industry: ind.id }))}
                          className="px-3 py-2.5 rounded-xl text-sm text-left transition-all"
                          style={{ background: sel ? '#EDE9FE' : '#FFFFFF', border: `1px solid ${sel ? '#7C3AED' : '#E2E8F0'}`, color: sel ? '#7C3AED' : '#475569', fontWeight: sel ? 600 : 400 }}>
                          {ind.label}
                        </button>
                      )
                    })}
                  </div>
                </div>
                <div className="mb-8">
                  <p className="text-xs font-semibold mb-3 uppercase tracking-wider" style={{ color: '#94A3B8' }}>Company size</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {COMPANY_SIZES.map(cs => {
                      const sel = answers.companySize === cs.id
                      return (
                        <button key={cs.id}
                          onClick={() => setAnswers(a => ({ ...a, companySize: cs.id }))}
                          className="p-3 rounded-xl text-center transition-all"
                          style={{ background: sel ? '#EDE9FE' : '#FFFFFF', border: `1px solid ${sel ? '#7C3AED' : '#E2E8F0'}` }}>
                          <div className="text-sm font-semibold" style={{ color: sel ? '#7C3AED' : '#0F172A' }}>{cs.label}</div>
                          <div className="text-xs mt-0.5" style={{ color: '#94A3B8' }}>{cs.detail}</div>
                        </button>
                      )
                    })}
                  </div>
                </div>
                <NavButtons canProceed={canProceed()} onNext={goNext} onBack={goBack} />
              </motion.div>
            )}

            {/* ── Tools ── */}
            {currentStep === 'tools' && (
              <motion.div key="tools" custom={direction} variants={slideIn} initial="hidden" animate="visible" exit="exit">
                <StepHeader
                  question="Which AI tools do you already use?"
                  sub="Select all that apply — this sets your starting level."
                />
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
                  {AI_TOOLS.map(tool => {
                    const sel = answers.currentTools.includes(tool.id)
                    const isNone = tool.id === 'none'
                    return (
                      <button key={tool.id}
                        onClick={() => {
                          setAnswers(a => {
                            if (isNone) return { ...a, currentTools: sel ? [] : ['none'] }
                            const without = a.currentTools.filter(t => t !== 'none')
                            return {
                              ...a,
                              currentTools: sel ? without.filter(t => t !== tool.id) : [...without, tool.id],
                            }
                          })
                        }}
                        className={`p-3 rounded-xl text-left transition-all ${isNone ? 'col-span-2 sm:col-span-3' : ''}`}
                        style={{ background: sel ? `${tool.color}10` : '#FFFFFF', border: `1.5px solid ${sel ? tool.color : '#E2E8F0'}` }}>
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0"
                            style={{ background: sel ? tool.color : '#F1F5F9' }}>
                            {sel ? <Check size={11} className="text-white" /> : null}
                          </div>
                          <span className="text-sm font-medium" style={{ color: sel ? '#0F172A' : '#475569' }}>{tool.label}</span>
                        </div>
                      </button>
                    )
                  })}
                </div>
                <NavButtons canProceed={canProceed()} onNext={goNext} onBack={goBack} />
              </motion.div>
            )}

            {/* ── Skill check ── */}
            {currentStep === 'skillCheck' && (
              <SkillCheckStep
                key="skillCheck"
                direction={direction}
                questions={skillQs}
                onComplete={(score) => {
                  setAnswers(a => ({ ...a, skillScore: score }))
                  goNext()
                }}
                onBack={goBack}
              />
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
                    const sel = answers.challenge === ch.id
                    return (
                      <button key={ch.id}
                        onClick={() => setAnswers(a => ({ ...a, challenge: ch.id }))}
                        className="w-full flex items-center gap-4 p-5 rounded-2xl text-left transition-all hover:scale-[1.01]"
                        style={{ background: sel ? '#EDE9FE' : '#FFFFFF', border: `1px solid ${sel ? '#7C3AED' : '#E2E8F0'}` }}>
                        <div className="flex-1">
                          <div className="text-base font-semibold" style={{ color: '#0F172A' }}>{ch.label}</div>
                          <div className="text-sm mt-0.5" style={{ color: '#64748B' }}>{ch.detail}</div>
                        </div>
                        {sel && <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#7C3AED' }}><Check size={13} className="text-white" /></div>}
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
                  question={`What do you most want to achieve${answers.name ? `, ${answers.name}` : ''}?`}
                  sub="Choose up to 3 — we'll weight your path around what matters most to you."
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {goals.map(goal => {
                    const sel = answers.goals.includes(goal.id)
                    const maxed = answers.goals.length >= 3 && !sel
                    const Icon = goal.icon
                    return (
                      <button key={goal.id}
                        disabled={maxed}
                        onClick={() => setAnswers(a => ({
                          ...a,
                          goals: sel ? a.goals.filter(g => g !== goal.id) : [...a.goals, goal.id],
                        }))}
                        className="p-4 rounded-2xl text-left transition-all hover:scale-[1.02] disabled:opacity-40"
                        style={{ background: sel ? '#EDE9FE' : '#FFFFFF', border: `1px solid ${sel ? '#7C3AED' : '#E2E8F0'}` }}>
                        <div className="flex items-start justify-between mb-3">
                          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: sel ? '#DDD6FE' : '#F8FAFC' }}>
                            <Icon size={16} color={sel ? '#7C3AED' : '#94A3B8'} />
                          </div>
                          {sel && <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: '#7C3AED' }}><Check size={11} className="text-white" /></div>}
                        </div>
                        <div className="text-sm font-semibold mb-1" style={{ color: '#0F172A' }}>{goal.label}</div>
                        <div className="text-xs" style={{ color: '#64748B' }}>{goal.detail}</div>
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
                  sub="We'll estimate your completion date and pace your path accordingly."
                />
                <div className="space-y-3 mb-8">
                  {TIME_OPTIONS.map(opt => {
                    const sel = answers.timePerWeek === opt.id
                    return (
                      <button key={opt.id}
                        onClick={() => setAnswers(a => ({ ...a, timePerWeek: opt.id }))}
                        className="w-full flex items-center gap-4 p-5 rounded-2xl text-left transition-all hover:scale-[1.01]"
                        style={{ background: sel ? '#FFF7ED' : '#FFFFFF', border: `1px solid ${sel ? '#F97316' : '#E2E8F0'}` }}>
                        <div className="flex-1">
                          <div className="text-base font-semibold" style={{ color: '#0F172A' }}>{opt.label}</div>
                          <div className="text-sm mt-0.5" style={{ color: '#64748B' }}>{opt.detail}</div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="text-xs font-bold" style={{ color: sel ? '#F97316' : '#CBD5E1' }}>{opt.weeks}</div>
                        </div>
                        {sel && <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#F97316' }}><Check size={13} className="text-white" /></div>}
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
                  <motion.div className="absolute inset-0 rounded-full" style={{ border: '2px solid transparent', borderTopColor: '#7C3AED' }} animate={{ rotate: 360 }} transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }} />
                  <motion.div className="absolute inset-3 rounded-full" style={{ border: '2px solid transparent', borderTopColor: '#22D3EE' }} animate={{ rotate: -360 }} transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }} />
                  <div className="absolute inset-7 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #EDE9FE, #ECFEFF)' }}>
                    <Zap size={18} color="#7C3AED" />
                  </div>
                </div>
                <h2 className="text-2xl font-black mb-6" style={{ color: '#0F172A' }}>Building your path…</h2>
                <div className="space-y-2.5 max-w-xs mx-auto">
                  {PROCESSING_STEPS.map((step, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: processingStep > i ? 1 : 0.3, x: 0 }}
                      className="flex items-center gap-2.5 text-sm"
                      style={{ color: processingStep > i ? '#334155' : '#CBD5E1' }}>
                      {processingStep > i
                        ? <CheckCircle2 size={14} color="#22D3EE" />
                        : <div className="w-3.5 h-3.5 rounded-full border border-slate-200" />}
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

// ─── Skill check step component ───────────────────────────────────────────────

function SkillCheckStep({
  direction,
  questions,
  onComplete,
  onBack,
}: {
  direction: number
  questions: SkillQuestion[]
  onComplete: (score: number) => void
  onBack: () => void
}) {
  const [qIdx, setQIdx] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [score, setScore] = useState(0)

  const q = questions[qIdx]
  const isLast = qIdx === questions.length - 1

  function handleSelect(optId: string) {
    if (revealed) return
    const correct = q.options.find(o => o.id === optId)?.correct ?? false
    setSelected(optId)
    setRevealed(true)
    if (correct) setScore(s => s + 1)
  }

  function handleNext() {
    if (isLast) {
      onComplete(score + (q.options.find(o => o.id === selected)?.correct ? 0 : 0))
    } else {
      setQIdx(i => i + 1)
      setSelected(null)
      setRevealed(false)
    }
  }

  return (
    <motion.div key="skillCheck" custom={direction} variants={slideIn} initial="hidden" animate="visible" exit="exit">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: '#EDE9FE', color: '#7C3AED' }}>
            Skill check · {qIdx + 1} of {questions.length}
          </span>
          <div className="flex gap-1">
            {questions.map((_, i) => (
              <div key={i} className="w-6 h-1 rounded-full" style={{ background: i <= qIdx ? '#7C3AED' : '#E2E8F0' }} />
            ))}
          </div>
        </div>
        <h2 className="text-xl sm:text-2xl font-black leading-snug mb-2" style={{ color: '#0F172A' }}>{q.q}</h2>
        <p className="text-sm" style={{ color: '#94A3B8' }}>Pick the best answer — we'll explain after.</p>
      </div>

      <div className="space-y-3 mb-5">
        {q.options.map(opt => {
          const isSelected = selected === opt.id
          const isCorrect = opt.correct
          let bg = '#FFFFFF'
          let border = '#E2E8F0'
          let textColor = '#475569'

          if (revealed) {
            if (isCorrect) { bg = '#ECFDF5'; border = '#6EE7B7'; textColor = '#065F46' }
            else if (isSelected && !isCorrect) { bg = '#FFF1F2'; border = '#FDA4AF'; textColor = '#9F1239' }
          } else if (isSelected) {
            bg = '#EDE9FE'; border = '#7C3AED'
          }

          return (
            <button key={opt.id}
              onClick={() => handleSelect(opt.id)}
              disabled={revealed}
              className="w-full flex items-center gap-3 p-4 rounded-2xl text-left transition-all"
              style={{ background: bg, border: `1.5px solid ${border}` }}>
              <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: revealed && isCorrect ? '#10B981' : revealed && isSelected ? '#F43F5E' : '#F1F5F9' }}>
                {revealed && isCorrect ? <Check size={12} className="text-white" /> :
                  revealed && isSelected && !isCorrect ? <X size={12} className="text-white" /> : null}
              </div>
              <span className="text-sm font-medium" style={{ color: textColor }}>{opt.label}</span>
            </button>
          )
        })}
      </div>

      <AnimatePresence>
        {revealed && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="mb-6 p-4 rounded-2xl"
            style={{ background: '#F0FDF4', border: '1px solid #BBF7D0' }}>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 size={15} style={{ color: '#16A34A', marginTop: 1, flexShrink: 0 }} />
              <p className="text-sm leading-relaxed" style={{ color: '#166534' }}>{q.explanation}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-3">
        {qIdx === 0 && (
          <button onClick={onBack} className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all hover:bg-slate-100" style={{ color: '#64748B' }}>
            <ArrowLeft size={15} /> Back
          </button>
        )}
        {revealed && (
          <motion.button initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            onClick={handleNext}
            className="flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:scale-[1.02]"
            style={{ background: 'linear-gradient(135deg, #7C3AED, #22D3EE)', boxShadow: '0 4px 14px rgba(124,58,237,0.25)' }}>
            {isLast ? 'Continue' : 'Next question'} <ArrowRight size={15} />
          </motion.button>
        )}
      </div>
    </motion.div>
  )
}

// ─── Shared sub-components ────────────────────────────────────────────────────

function StepHeader({ question, sub }: { question: string; sub: string }) {
  return (
    <div className="mb-7">
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-black mb-2.5" style={{ color: '#0F172A' }}>{question}</h2>
      <p className="text-base" style={{ color: '#64748B' }}>{sub}</p>
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
        <button onClick={onBack} className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all hover:bg-slate-100" style={{ color: '#64748B' }}>
          <ArrowLeft size={15} /> Back
        </button>
      )}
      <button onClick={onNext} disabled={!canProceed}
        className="flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.02]"
        style={{
          background: canProceed ? 'linear-gradient(135deg, #7C3AED, #22D3EE)' : '#E2E8F0',
          color: canProceed ? '#FFFFFF' : '#94A3B8',
          boxShadow: canProceed ? '0 4px 14px rgba(124,58,237,0.25)' : 'none',
        }}>
        {nextLabel} <ArrowRight size={15} />
      </button>
    </div>
  )
}
