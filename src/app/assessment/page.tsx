'use client'

import { useState, useEffect, useMemo, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Megaphone, LineChart, HeartHandshake, TrendingUp,
  Settings, Briefcase, User, ArrowLeft, ArrowRight,
  Check, X, Zap, Clock, Target, Users, TrendingUp as Trend,
  Star, Brain, CheckCircle2,
  Scale, Package, Headphones, BarChart,
} from 'lucide-react'
import Logo from '@/components/Logo'
import type { AssessmentAnswers, Role, TimeCommitment, Industry, CompanySize } from '@/lib/assessment/types'
import { buildAssessmentResult, deriveExperience } from '@/lib/assessment/engine'
import { useAuth } from '@/context/AuthContext'
import { saveAssessment, loadLatestAssessment } from '@/lib/supabase/db'
import { useTranslations } from 'next-intl'

const F = 'var(--font-sans)'

// ─── Step types ───────────────────────────────────────────────────────────────

type StepId = 'welcome' | 'role' | 'subRole' | 'context' | 'tools' | 'skillCheck' | 'challenge' | 'goals' | 'time' | 'processing'

// ─── Role data ────────────────────────────────────────────────────────────────

const ROLES = [
  { id: 'marketing' as Role, label: 'Marketing', icon: Megaphone, color: '#E04D2A', detail: 'Brand, content, campaigns, growth' },
  { id: 'finance' as Role, label: 'Finance', icon: LineChart, color: '#F59E0B', detail: 'FP&A, reporting, treasury, accounting' },
  { id: 'hr' as Role, label: 'HR & People', icon: HeartHandshake, color: '#10B981', detail: 'Talent, L&D, employee experience' },
  { id: 'sales' as Role, label: 'Sales', icon: TrendingUp, color: '#3B82F6', detail: 'Revenue, account management, BD' },
  { id: 'operations' as Role, label: 'Operations', icon: Settings, color: '#22D3EE', detail: 'Process, supply chain, quality' },
  { id: 'leadership' as Role, label: 'Leadership', icon: Briefcase, color: '#F97316', detail: 'CEO, Director, VP, C-suite' },
  { id: 'legal' as Role, label: 'Legal', icon: Scale, color: '#0284C7', detail: 'Counsel, compliance, contracts, IP' },
  { id: 'product' as Role, label: 'Product', icon: Package, color: '#14B8A6', detail: 'PM, PO, product strategy, roadmap' },
  { id: 'customer' as Role, label: 'Customer Success', icon: Headphones, color: '#DC2626', detail: 'CS, account health, renewals, support' },
  { id: 'consulting' as Role, label: 'Consulting', icon: BarChart, color: '#0EA5E9', detail: 'Strategy, advisory, client delivery' },
  { id: 'it' as Role, label: 'IT & Technology', icon: Zap, color: '#6366F1', detail: 'Infrastructure, security, scripting, ops' },
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
  it: [
    { id: 'sysadmin', label: 'Systems Administrator', detail: 'Infrastructure, servers, networking' },
    { id: 'security', label: 'IT Security / SecOps', detail: 'Threat detection, compliance, risk' },
    { id: 'devops', label: 'DevOps / Cloud Engineer', detail: 'CI/CD, cloud infra, automation' },
    { id: 'developer', label: 'Developer / Engineer', detail: 'Scripting, APIs, software development' },
    { id: 'it-leader', label: 'IT Manager / CTO', detail: 'IT strategy, team, vendor management' },
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
  { id: 'midjourney', label: 'Midjourney / Image AI', color: '#3B82F6' },
  { id: 'notion-ai', label: 'Notion AI', color: '#000000' },
  { id: 'other-tools', label: 'Other AI tools', color: '#64748B' },
  { id: 'none', label: "I don't use AI tools yet", color: '#94A3B8' },
]

// ─── Role description tips (kept for future use) ─────────────────────────────

const ROLE_DESCRIPTION_TIPS: Record<string, string[]> = {
  marketing: [
    'I manage content strategy for a B2B SaaS company — mainly briefing campaigns and reviewing copy.',
    'I run paid media across Google and Meta, optimising for ROAS and pipeline contribution.',
    'I lead brand and communications for a mid-size retail group, owning messaging and creative direction.',
  ],
  finance: [
    'I build the monthly management accounts and variance commentary for the CFO.',
    'I own FP&A for three business units, including annual budgeting and quarterly reforecasting.',
    'I manage treasury and cash flow, including our FX hedging programme.',
  ],
  hr: [
    'I lead talent acquisition for a scale-up, managing a team of 4 recruiters across EMEA.',
    'I design and run L&D programmes for a 500-person organisation.',
    'I act as an HRBP for the commercial function, covering employee relations and org design.',
  ],
  sales: [
    'I run full-cycle enterprise deals from prospecting to close, targeting mid-market SaaS buyers.',
    'I manage a portfolio of 40 accounts, focused on renewals and expansion revenue.',
    'I lead an SDR team of 6, responsible for outbound pipeline generation.',
  ],
  operations: [
    'I own process improvement and automation across our supply chain and logistics network.',
    'I manage quality and compliance for a manufacturing site of 200 people.',
    'I run the central ops team, responsible for tooling, reporting, and cross-functional projects.',
  ],
  leadership: [
    "I'm a VP responsible for a 60-person commercial team across sales and marketing.",
    "I'm a CEO leading a 200-person technology business, focused on growth and strategy.",
    'I sit on the executive team as COO, owning operations, product, and delivery.',
  ],
  legal: [
    "I'm in-house counsel at a fintech, handling contracts, regulatory queries, and risk.",
    'I manage compliance and data privacy for a healthcare company operating across 5 markets.',
    'I lead a team of 3 lawyers covering M&A, IP, and commercial agreements.',
  ],
  product: [
    "I'm a PM for a core enterprise product, owning the roadmap and working closely with engineering.",
    'I lead product discovery — user interviews, synthesis, and turning insights into requirements.',
    "I'm a growth PM running experiments on activation and retention across our web product.",
  ],
  customer: [
    'I manage a portfolio of 30 mid-market accounts, focused on onboarding, adoption, and renewals.',
    'I lead CS operations, owning our tech stack, health scoring, and team reporting.',
    "I'm a VP of Customer Success, responsible for NRR and team development across two regions.",
  ],
  consulting: [
    "I'm a consultant at a strategy firm, owning workstreams and delivering client-facing outputs.",
    "I'm an analyst building financial models and research decks for M&A advisory engagements.",
    "I'm a senior partner responsible for client relationships and practice development.",
  ],
  it: [
    "I manage server infrastructure and network operations for a mid-size enterprise, including patching and availability.",
    "I'm a SecOps engineer responsible for threat detection, vulnerability management, and compliance across cloud environments.",
    "I lead a DevOps team, owning CI/CD pipelines, cloud infrastructure on AWS, and deployment automation.",
  ],
  other: [
    'I coordinate cross-functional projects and spend most of my time writing and running meetings.',
    'I manage a specific system or process that touches multiple teams in the business.',
    "I'm an individual contributor in a generalist role, covering a wide range of responsibilities.",
  ],
}

// ─── Sub-role description tips ────────────────────────────────────────────────

const SUB_ROLE_DESCRIPTION_TIPS: Partial<Record<string, Record<string, string[]>>> = {
  marketing: {
    'brand-comms': [
      "I manage brand messaging and press relations for a B2C retail brand, writing and approving copy across all channels.",
      "I own communications strategy for a tech company, including exec thought leadership, PR, and internal comms.",
      "I lead brand identity work — guidelines, tone of voice, and creative reviews — for a fast-growing DTC startup.",
    ],
    'content-seo': [
      "I own our editorial calendar and SEO strategy, producing and briefing content that drives organic traffic.",
      "I write and edit long-form blog content, manage freelancers, and optimise pages for search rankings.",
      "I run content across our lifecycle — blog, email, social — with a focus on search and top-of-funnel growth.",
    ],
    'growth-perf': [
      "I manage paid acquisition across Google and Meta, optimising for ROAS and pipeline contribution.",
      "I own growth experiments — A/B tests, landing pages, and funnel optimisation — to improve conversion rates.",
      "I run performance marketing for a SaaS company, managing budget across paid channels and reporting to the CMO.",
    ],
    'campaigns': [
      "I manage integrated marketing campaigns from brief to launch, working with design, copy, and media teams.",
      "I produce campaign creative — overseeing design briefs, video production, and multi-channel rollout.",
      "I plan and execute seasonal campaigns for a retail brand, coordinating agency partners and internal stakeholders.",
    ],
    'cmo': [
      "I lead the marketing function across a 20-person team, setting strategy, managing budget, and reporting to the CEO.",
      "I'm a CMO responsible for brand, demand generation, and product marketing for a Series B SaaS company.",
      "I own the full commercial marketing function — setting the strategy, hiring the team, and owning pipeline targets.",
    ],
  },
  finance: {
    'fpa': [
      "I own the monthly management accounts and variance commentary, presenting results to the CFO and board.",
      "I run FP&A for three business units — annual budgeting, quarterly reforecasting, and board deck preparation.",
      "I build and maintain the financial models that drive scenario planning and investor presentations.",
    ],
    'accounting': [
      "I manage month-end close, reconciliations, and statutory reporting for a multi-entity group.",
      "I run the accounting function for a mid-size business — AP, AR, payroll, and year-end audit.",
      "I own financial controls and compliance, ensuring accurate reporting across our UK and EU entities.",
    ],
    'treasury': [
      "I manage cash flow, liquidity forecasting, and FX hedging across our international entities.",
      "I run treasury for a manufacturing group — overseeing banking relationships, cash pooling, and risk management.",
      "I own the company's financial risk framework, including interest rate, currency, and credit risk management.",
    ],
    'cfo': [
      "I'm a CFO leading a 15-person finance team, responsible for strategy, investor relations, and financial governance.",
      "I oversee all financial operations for a £200m revenue business, reporting to the CEO and board.",
      "I lead finance for a PE-backed business, managing the annual audit, banking covenants, and M&A due diligence.",
    ],
  },
  hr: {
    'talent': [
      "I lead talent acquisition for a scale-up, managing a team of 4 recruiters across EMEA.",
      "I own end-to-end recruiting for tech roles — sourcing, interviews, offers, and onboarding.",
      "I run campus hiring and early careers programmes for a graduate intake of 80 per year.",
    ],
    'ld': [
      "I design and run L&D programmes for a 500-person organisation, from onboarding to leadership development.",
      "I own learning strategy and the LMS platform, delivering programmes across three business units.",
      "I build leadership development curricula and manage external training vendors for our senior management population.",
    ],
    'hrbp': [
      "I act as HRBP for the commercial function, covering employee relations, org design, and talent planning.",
      "I partner with two business units to provide strategic HR support — restructures, performance, and succession.",
      "I manage the HR agenda for a 250-person division, from culture and engagement to workforce planning.",
    ],
    'chro': [
      "I lead the People function for a 1,200-person company — culture, talent, L&D, and HR operations.",
      "I'm a CHRO responsible for people strategy, DEI, and organisational development across five markets.",
      "I sit on the exec team and own the full people agenda — from talent acquisition to total reward strategy.",
    ],
  },
  sales: {
    'ae': [
      "I run full-cycle enterprise deals from prospecting to close, targeting mid-market SaaS buyers.",
      "I manage a pipeline of 30+ opportunities, running product demos, proposals, and contract negotiations.",
      "I close complex, multi-stakeholder software deals with 6-month sales cycles and £100k+ ARR.",
    ],
    'sdr': [
      "I do outbound prospecting via cold calls, LinkedIn, and email to build pipeline for our AE team.",
      "I qualify inbound and outbound leads, booking discovery calls for the account executive team.",
      "I run sequences targeting enterprise accounts, researching prospects and personalising outreach at scale.",
    ],
    'am': [
      "I manage a portfolio of 40 enterprise accounts, focused on renewals, expansion, and health scores.",
      "I own the relationship with our top 20 customers, running QBRs and identifying upsell opportunities.",
      "I handle renewals and growth across a book of mid-market SaaS customers, tracking usage and churn risk.",
    ],
    'vp-sales': [
      "I lead a sales team of 15 AEs and SDRs, owning the revenue target and forecasting for the business.",
      "I'm a VP of Sales managing our EMEA go-to-market — hiring, pipeline review, and quota attainment.",
      "I run the sales organisation for a SaaS company, setting the strategy, methodology, and headcount plan.",
    ],
  },
  operations: {
    'process': [
      "I own process improvement across the business — mapping workflows, eliminating waste, and driving automation.",
      "I lead operational efficiency projects using lean and Six Sigma methods across a manufacturing environment.",
      "I manage cross-functional projects to streamline internal processes, from procurement to customer delivery.",
    ],
    'supply-chain': [
      "I run supply chain planning for a consumer goods company — demand forecasting, procurement, and logistics.",
      "I manage the end-to-end supply chain for a retail group, overseeing suppliers, inventory, and distribution.",
      "I own procurement and logistics for a manufacturing business, managing 50+ suppliers across five countries.",
    ],
    'quality': [
      "I manage quality assurance and compliance for a manufacturing site, overseeing audits, SOPs, and inspections.",
      "I own the ISO certification programme and quality management system for a 200-person production facility.",
      "I lead a QA team responsible for product testing, regulatory compliance, and non-conformance management.",
    ],
    'coo': [
      "I'm a COO overseeing operations, technology, and customer delivery for a 400-person services business.",
      "I lead the operational function — supply chain, quality, and facilities — reporting directly to the CEO.",
      "I run the day-to-day of the business: cross-functional execution, OKR tracking, and operational reporting.",
    ],
  },
  legal: {
    'in-house': [
      "I'm in-house counsel at a fintech, handling contracts, regulatory queries, and general legal risk.",
      "I advise on commercial agreements, employment matters, and data privacy for a 300-person tech company.",
      "I manage the legal workload for a scale-up — NDAs, SaaS contracts, IP, and compliance queries.",
    ],
    'compliance': [
      "I manage compliance and data privacy for a healthcare company operating across five markets.",
      "I own the regulatory compliance programme — policies, training, monitoring, and reporting to the board.",
      "I run AML, KYC, and regulatory affairs for a financial services firm, liaising with the FCA.",
    ],
    'litigation': [
      "I manage contentious matters — disputes, arbitration, and regulatory investigations — for an in-house legal team.",
      "I run litigation strategy for a mid-size law firm, managing a caseload of commercial disputes.",
      "I handle pre-litigation negotiation, claims strategy, and external counsel management for a large employer.",
    ],
    'clco': [
      "I'm a General Counsel leading a team of 8 lawyers, covering commercial, employment, and regulatory matters.",
      "I sit on the exec team and own legal, compliance, and risk governance for a listed business.",
      "I lead the legal function for a PE-backed group — M&A, contracts, disputes, and board advisory.",
    ],
  },
  product: {
    'pm': [
      "I'm a PM for a core enterprise product, owning the roadmap and working closely with engineering.",
      "I manage a B2B SaaS product — discovery, prioritisation, and delivery — in a team of 25.",
      "I own the product roadmap for our mobile app, running user interviews and defining feature requirements.",
    ],
    'po': [
      "I run the sprint backlog for our delivery team — writing user stories, acceptance criteria, and managing ceremonies.",
      "I work in a scaled Agile environment as a product owner, prioritising the backlog and unblocking the team.",
      "I'm the PO for a core platform team, translating business requirements into sprint-ready tickets.",
    ],
    'growth-pm': [
      "I run growth experiments on activation and retention, owning A/B tests and funnel optimisation.",
      "I'm a growth PM focused on the onboarding flow and feature adoption for a 50k-user SaaS platform.",
      "I own the experimentation roadmap — hypothesis, test design, analysis — to improve conversion and retention.",
    ],
    'cpo': [
      "I'm a CPO leading a team of 12 PMs across three product lines, setting strategy and roadmap.",
      "I own the product vision and portfolio for a Series C SaaS company, reporting to the CEO.",
      "I lead product and design, driving the long-term platform strategy and aligning with commercial goals.",
    ],
  },
  customer: {
    'csm': [
      "I manage a portfolio of 30 mid-market accounts, focused on onboarding, adoption, and renewals.",
      "I own the customer relationship post-sales — health scoring, QBRs, and driving product adoption.",
      "I partner with 20 enterprise accounts, running business reviews and identifying expansion opportunities.",
    ],
    'cs-ops': [
      "I run CS operations — our tech stack, health score models, playbooks, and team reporting.",
      "I own the tooling and processes for a 25-person CS organisation, including Gainsight and Salesforce.",
      "I manage data and analytics for the customer success team, building dashboards and improving workflows.",
    ],
    'support': [
      "I lead a customer support team of 10 agents, managing tickets, SLAs, and CSAT across all channels.",
      "I handle technical support queries for a SaaS product, owning escalations and resolution quality.",
      "I run the first-line support function — chat, email, and phone — for a mid-market software company.",
    ],
    'vp-cs': [
      "I lead the Customer Success function for a SaaS business, responsible for NRR and team development.",
      "I'm a VP of CS managing a 30-person team across EMEA and US, owning retention and expansion revenue.",
      "I own the full post-sale customer journey — onboarding, CS, support, and renewal — reporting to the CEO.",
    ],
  },
  consulting: {
    'analyst': [
      "I build financial models, conduct market research, and produce client-facing decks for strategy engagements.",
      "I support workstreams on M&A due diligence — data analysis, benchmarking, and synthesis.",
      "I'm an analyst at a management consultancy, researching, modelling, and presenting to client project teams.",
    ],
    'consultant': [
      "I own client workstreams on strategy projects — interviewing stakeholders, analysing data, and developing recommendations.",
      "I lead delivery for a consulting engagement — managing analysts, client relationships, and final outputs.",
      "I run day-to-day advisory projects for corporate clients, from scoping to final presentation.",
    ],
    'specialist': [
      "I'm a domain expert in supply chain consulting, providing specialist advice on client engagements.",
      "I lead the digital transformation practice at a mid-size consultancy, advising on technology strategy.",
      "I advise clients on regulatory and compliance matters as a specialist within a consulting practice.",
    ],
    'partner': [
      "I'm a partner at a strategy consultancy, responsible for business development and client account leadership.",
      "I lead the financial services practice, managing a team of 15 consultants and a revenue target.",
      "I originate new mandates, manage partner-level client relationships, and oversee engagement quality.",
    ],
  },
  it: {
    'sysadmin': [
      "I manage server infrastructure and network operations for a mid-size enterprise, including patching and availability.",
      "I run the on-prem and hybrid environment — Windows Server, Active Directory, VMware — for 500 users.",
      "I own IT operations for a manufacturing site: servers, networking, backups, and helpdesk escalations.",
    ],
    'security': [
      "I'm a SecOps engineer responsible for threat detection, vulnerability management, and compliance across cloud environments.",
      "I manage our SIEM, run threat hunts, and oversee incident response for a financial services firm.",
      "I own security operations — monitoring, pen test remediation, and regulatory compliance — for a 1,000-person company.",
    ],
    'devops': [
      "I lead a DevOps team, owning CI/CD pipelines, cloud infrastructure on AWS, and deployment automation.",
      "I manage Kubernetes clusters, Terraform configurations, and release pipelines for a product engineering team.",
      "I own our cloud infrastructure on Azure — IaC, monitoring, cost optimisation, and SRE practices.",
    ],
    'developer': [
      "I write backend APIs and automation scripts in Python, supporting internal tools and data pipelines.",
      "I'm a software engineer building microservices in Go, working across feature delivery and platform reliability.",
      "I develop and maintain internal tooling — scripts, integrations, and dashboards — for a technical ops team.",
    ],
    'it-leader': [
      "I lead the IT function for a 600-person business, overseeing infrastructure, security, and the service desk.",
      "I'm a CTO at a scale-up, responsible for engineering, cloud architecture, and technology strategy.",
      "I run IT operations and strategy — vendor management, budget, and roadmap — reporting to the CEO.",
    ],
  },
}

// ─── Skill check questions (kept for future dashboard use) ───────────────────

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
    {
      q: "You want to build a repeatable AI workflow for campaign briefs. What's the right approach?",
      options: [
        { id: 'a', label: 'Let each person use AI however they want for maximum creativity', correct: false },
        { id: 'b', label: 'Create a shared prompt template with brand context baked in, then iterate based on output quality', correct: true },
        { id: 'c', label: 'Use AI for ideation only — keep execution fully manual', correct: false },
        { id: 'd', label: 'Standardise on one AI tool across the team and ban all others', correct: false },
      ],
      explanation: "Shared, iterated prompt templates give teams consistent quality without losing individual judgment. They're the foundation of a scalable AI workflow.",
    },
    {
      q: "AI produces a statistic in your content that sounds plausible but you can't verify the source. What do you do?",
      options: [
        { id: 'a', label: "Keep it — AI is trained on reliable data", correct: false },
        { id: 'b', label: 'Remove or replace it with a verified source before publishing', correct: true },
        { id: 'c', label: "Add 'according to AI' as a citation", correct: false },
        { id: 'd', label: 'Ask AI to confirm the statistic is accurate', correct: false },
      ],
      explanation: "AI frequently generates plausible-sounding but fabricated statistics. Any factual claim needs independent verification — asking AI to confirm its own output doesn't count.",
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
    {
      q: "Your CFO wants to know which finance processes are best suited for AI. How do you prioritise?",
      options: [
        { id: 'a', label: 'Start with the highest-value processes regardless of complexity', correct: false },
        { id: 'b', label: 'Start with high-volume, rule-based tasks with clear inputs and outputs', correct: true },
        { id: 'c', label: 'Start with whatever takes the most time regardless of structure', correct: false },
        { id: 'd', label: 'Start with external reporting since it has the highest visibility', correct: false },
      ],
      explanation: "High-volume, rule-based tasks with clear inputs give AI the most to work with and produce the fastest, most reliable results — building credibility before tackling complex judgment-heavy work.",
    },
    {
      q: "You use AI to draft a board memo and it cites a revenue figure that's slightly different from your model. What went wrong?",
      options: [
        { id: 'a', label: "The AI accessed outdated data from the internet", correct: false },
        { id: 'b', label: 'AI hallucinated or misinterpreted the numbers — it should only format, not calculate', correct: true },
        { id: 'c', label: 'The model used a different accounting standard', correct: false },
        { id: 'd', label: 'You need a more powerful AI model for financial work', correct: false },
      ],
      explanation: "AI is not a calculator — it's a text predictor that can plausibly fabricate numbers. Always supply the figures yourself and use AI to structure and narrate, not to compute.",
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
    {
      q: "You want to use AI to personalise L&D recommendations for 500 employees. What's the right architecture?",
      options: [
        { id: 'a', label: 'Ask AI to build learning plans from scratch for each employee', correct: false },
        { id: 'b', label: 'Define role-specific skill frameworks, then use AI to match employees to relevant content based on their profile', correct: true },
        { id: 'c', label: 'Let AI analyse employee email patterns to infer learning needs', correct: false },
        { id: 'd', label: 'Use AI to recommend the same top 10 courses to everyone', correct: false },
      ],
      explanation: "AI personalisation works when it has a structured framework to match against. Without role-specific skill maps, it defaults to generic recommendations that don't drive real development.",
    },
    {
      q: "Legal flags that your AI-assisted hiring process may create compliance risk. What's the most likely concern?",
      options: [
        { id: 'a', label: 'AI tools are too expensive to justify for recruitment', correct: false },
        { id: 'b', label: 'AI trained on historical hiring data may perpetuate demographic biases', correct: true },
        { id: 'c', label: 'AI is not accurate enough to screen CVs reliably', correct: false },
        { id: 'd', label: 'Candidates may object to their data being processed', correct: false },
      ],
      explanation: "Bias perpetuation is the primary compliance risk in AI-assisted hiring. If historical hiring decisions reflected bias, AI trained on that data will replicate it — requiring ongoing audit and human oversight.",
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
    {
      q: "You want to scale outbound without losing personalisation. What's the right AI-assisted approach?",
      options: [
        { id: 'a', label: 'Use AI to generate fully automated sequences and send at volume', correct: false },
        { id: 'b', label: 'Use AI to draft personalised first lines from prospect research, then reps review and send', correct: true },
        { id: 'c', label: 'Use AI to write the same message for all prospects in the same industry', correct: false },
        { id: 'd', label: 'Avoid AI for outbound — personalisation must be fully manual', correct: false },
      ],
      explanation: "AI-drafted personalisation with human review is the sweet spot — it scales without the robotic feel that tanks reply rates when everything is fully automated.",
    },
    {
      q: "A deal you were confident about goes cold. How can AI help you understand what happened?",
      options: [
        { id: 'a', label: 'Ask AI to predict what the prospect is thinking', correct: false },
        { id: 'b', label: 'Feed the email thread, call notes, and deal timeline into AI to identify where momentum broke down', correct: true },
        { id: 'c', label: 'Use AI to draft a break-up email and move on', correct: false },
        { id: 'd', label: "AI can't help with lost deals — focus on new pipeline", correct: false },
      ],
      explanation: "AI is excellent at pattern recognition across structured inputs. Feeding it your deal history lets it surface the inflection point you missed — turning a lost deal into a learning.",
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
    {
      q: "Your team has 20 manual processes. How do you decide which to tackle with AI first?",
      options: [
        { id: 'a', label: 'Start with the most visible process to get executive support', correct: false },
        { id: 'b', label: 'Prioritise processes that are high-volume, rule-based, and have well-defined inputs and outputs', correct: true },
        { id: 'c', label: 'Start with the process that takes the most calendar time', correct: false },
        { id: 'd', label: "Start with the process that the team finds most frustrating", correct: false },
      ],
      explanation: "Rule-based, high-volume processes are where AI delivers fast, reliable ROI. Complex judgment-heavy processes require more setup and validation — tackle those after building confidence.",
    },
    {
      q: "An AI-powered quality control system flags a batch as defective, but your experienced operator disagrees. What's the right call?",
      options: [
        { id: 'a', label: 'Trust the AI — it has more data than one person', correct: false },
        { id: 'b', label: "Treat the AI flag as a trigger for human investigation, not an automatic decision", correct: true },
        { id: 'c', label: 'Trust the operator — AI is not reliable for quality decisions', correct: false },
        { id: 'd', label: 'Escalate to management to decide between the two', correct: false },
      ],
      explanation: "AI flags anomalies — humans make the call. An experienced operator's contextual knowledge is exactly the override mechanism you want in any well-designed AI system.",
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
    {
      q: "You want to measure ROI from your AI programme 6 months in. What's the most meaningful metric?",
      options: [
        { id: 'a', label: 'Number of AI tools deployed across the organisation', correct: false },
        { id: 'b', label: 'Time saved per process multiplied by cost of that time, with outcome quality held constant', correct: true },
        { id: 'c', label: 'Employee satisfaction with AI tools', correct: false },
        { id: 'd', label: 'Number of employees who have completed AI training', correct: false },
      ],
      explanation: "ROI measurement must connect AI adoption to business outcomes — time saved at maintained quality is the cleanest signal. Tool count and satisfaction are leading indicators, not outcomes.",
    },
    {
      q: "Your legal team raises concerns about AI governance before a company-wide rollout. What's the right response?",
      options: [
        { id: 'a', label: 'Proceed anyway — legal will always find concerns', correct: false },
        { id: 'b', label: 'Pause rollout and develop a usage policy covering data handling, output review, and accountability before proceeding', correct: true },
        { id: 'c', label: 'Limit rollout to low-risk teams and ignore governance for now', correct: false },
        { id: 'd', label: 'Outsource governance to a third-party AI vendor', correct: false },
      ],
      explanation: "Governance is not a blocker — it's a foundation. A usage policy that defines accountability and data handling protects the organisation and builds the trust that sustains adoption long-term.",
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
    {
      q: "You want to use AI for legal research. What's the most important workflow safeguard?",
      options: [
        { id: 'a', label: 'Only use AI tools specifically built for legal research', correct: false },
        { id: 'b', label: 'Independently verify every case citation AI provides before using it in any work product', correct: true },
        { id: 'c', label: 'Ask AI to confirm its citations are accurate before relying on them', correct: false },
        { id: 'd', label: 'Limit AI research to non-contentious matters only', correct: false },
      ],
      explanation: "AI hallucinating case citations — generating plausible but non-existent references — is one of the most documented failure modes in legal AI use. Independent verification is non-negotiable.",
    },
    {
      q: "A colleague wants to paste a client's confidential documents into a public AI chatbot to get drafting help. What's your advice?",
      options: [
        { id: 'a', label: "It's fine as long as the output is reviewed before sending", correct: false },
        { id: 'b', label: 'This risks breaching privilege and data protection obligations — use an enterprise tool with appropriate data controls instead', correct: true },
        { id: 'c', label: "Delete client names first and it should be compliant", correct: false },
        { id: 'd', label: "Check if the AI tool has a privacy policy and proceed if it does", correct: false },
      ],
      explanation: "Public AI tools may use inputs for training and lack the data isolation guarantees required for privileged or confidential material. Enterprise-grade tools with appropriate DPAs are the only safe option.",
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
    {
      q: "You want to use AI to write a PRD faster. What input gives you the most useful first draft?",
      options: [
        { id: 'a', label: 'A one-line description of the feature', correct: false },
        { id: 'b', label: 'Problem statement, user research findings, success metrics, and the PRD structure you want', correct: true },
        { id: 'c', label: 'A list of requirements from the engineering team', correct: false },
        { id: 'd', label: 'Examples of PRDs from other companies', correct: false },
      ],
      explanation: "AI produces the best PRD drafts when you give it the problem, the evidence, and the desired structure. Without those inputs, it defaults to generic templates that need complete rewriting.",
    },
    {
      q: "Stakeholders push back on a roadmap decision. You used AI to help prioritise — how do you handle this?",
      options: [
        { id: 'a', label: "Say the AI recommended it — that ends the debate", correct: false },
        { id: 'b', label: 'Explain the criteria and trade-offs behind the decision — AI structured the analysis, you made the call', correct: true },
        { id: 'c', label: "Avoid mentioning AI was involved — it undermines credibility", correct: false },
        { id: 'd', label: 'Re-run the analysis with different inputs until the AI agrees with stakeholders', correct: false },
      ],
      explanation: "AI is a thinking tool, not a decision-maker. You own the criteria, the trade-offs, and the outcome. Being clear about that distinction builds trust with stakeholders rather than undermining it.",
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
    {
      q: "You want to use AI to personalise outreach at scale across your book of business. What's the right model?",
      options: [
        { id: 'a', label: 'Have AI generate and send outreach automatically based on health score changes', correct: false },
        { id: 'b', label: 'Use AI to draft personalised messages from account data, then review and send yourself', correct: true },
        { id: 'c', label: 'Use AI to write one message per segment and send it to all accounts in that segment', correct: false },
        { id: 'd', label: 'Personalisation at scale is not possible — focus on your top 20 accounts manually', correct: false },
      ],
      explanation: "AI-drafted, human-reviewed personalisation hits the sweet spot — it covers your full book without sacrificing the authenticity that keeps relationships strong.",
    },
    {
      q: "Your company wants to replace CSM check-in calls with AI-powered automated touchpoints. What's your honest assessment?",
      options: [
        { id: 'a', label: 'Great idea — AI can handle most customer interactions effectively', correct: false },
        { id: 'b', label: 'AI touchpoints can supplement check-ins but replacing them risks relationship quality and early churn signal detection', correct: true },
        { id: 'c', label: 'Fine for low-tier accounts but not enterprise customers', correct: false },
        { id: 'd', label: 'Depends entirely on how good the AI tool is', correct: false },
      ],
      explanation: "The relationship layer of CS is where churn signals surface and trust is built. AI can scale coverage, but removing human touchpoints from the loop means losing the contextual nuance that keeps accounts healthy.",
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
    {
      q: "You're doing secondary research on a client's competitive landscape. How do you use AI responsibly?",
      options: [
        { id: 'a', label: 'Ask AI for a competitive analysis and cite it directly in the client deliverable', correct: false },
        { id: 'b', label: 'Use AI to generate a research framework and initial hypotheses, then verify everything against primary sources', correct: true },
        { id: 'c', label: 'Use AI only for formatting the research, not conducting it', correct: false },
        { id: 'd', label: 'Rely on AI for publicly available data and your judgment for the rest', correct: false },
      ],
      explanation: "AI-generated competitive intelligence is a starting point, not a source. It structures the question and accelerates the hunt — but every claim needs verification before it reaches a client.",
    },
    {
      q: "A client asks if the analysis in your deliverable was AI-generated. What's the right response?",
      options: [
        { id: 'a', label: "Say no — AI was just used for formatting", correct: false },
        { id: 'b', label: 'Be transparent: AI assisted with research synthesis and drafting; all analysis and conclusions were validated by the team', correct: true },
        { id: 'c', label: 'Avoid the question — AI disclosure norms are still emerging', correct: false },
        { id: 'd', label: 'Only disclose if your firm has a policy requiring it', correct: false },
      ],
      explanation: "Transparency about AI use — paired with clear ownership of the analysis — is the professional standard. Clients need to know what they're relying on, and your team's judgment is the thing they're actually paying for.",
    },
  ],
  it: [
    {
      q: "You ask AI to write a Bash script to automate log rotation. The output looks right but you're not sure it handles edge cases. What's the right next step?",
      options: [
        { id: 'a', label: 'Run it in production — if it breaks, roll back', correct: false },
        { id: 'b', label: 'Test it in a staging environment and review each step against your specific system config', correct: true },
        { id: 'c', label: 'Ask AI if there are any edge cases you should worry about', correct: false },
        { id: 'd', label: 'Add error handling and trust that the rest is correct', correct: false },
      ],
      explanation: "AI-generated scripts are a strong first draft, not production code. Staging validation against your real environment is the only way to know if it handles your specific constraints correctly.",
    },
    {
      q: "Your team gets hundreds of security alerts daily and struggles to triage them. How can AI help responsibly?",
      options: [
        { id: 'a', label: 'Let AI automatically close low-priority alerts to reduce noise', correct: false },
        { id: 'b', label: 'Use AI to classify and prioritise alerts for human review, keeping human sign-off on all responses', correct: true },
        { id: 'c', label: 'Feed all alerts to AI and act on whatever it flags as critical', correct: false },
        { id: 'd', label: 'AI is too risky for security workflows — stick with manual triage', correct: false },
      ],
      explanation: "AI is a force multiplier for alert triage, not an autonomous decision-maker. Using it to sort and prioritise while keeping humans in the response loop keeps you fast without losing accountability.",
    },
    {
      q: "You want to use AI to write documentation for an undocumented internal system. What's the most effective approach?",
      options: [
        { id: 'a', label: 'Feed the codebase to AI and publish its output directly', correct: false },
        { id: 'b', label: 'Use AI to structure and draft documentation from your notes and code context, then review for accuracy before publishing', correct: true },
        { id: 'c', label: 'Ask AI to guess what the system does based on its name and architecture', correct: false },
        { id: 'd', label: "Avoid AI for docs — the team knows the system better than any model", correct: false },
      ],
      explanation: "AI can turn rough notes and code snippets into clear, structured documentation far faster than writing from scratch — but your domain knowledge is what makes it accurate. Always review before publishing.",
    },
    {
      q: "Management wants to adopt an AI-powered IT tool that requires sending system logs to a third-party cloud. What's your first question?",
      options: [
        { id: 'a', label: 'How much does it cost compared to our current tooling?', correct: false },
        { id: 'b', label: "What data is transmitted, how is it stored, and does it comply with our data classification and privacy policies?", correct: true },
        { id: 'c', label: 'Does it integrate with our existing stack?', correct: false },
        { id: 'd', label: 'What accuracy rate does the AI model achieve?', correct: false },
      ],
      explanation: "Data sovereignty and compliance are the first gate for any AI tool in an IT environment. Feature quality and cost only matter once you know the tool is safe to use with your data.",
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
    {
      q: "AI gives you a confident, detailed answer to a factual question. How should you treat it?",
      options: [
        { id: 'a', label: "Trust it — AI is trained on vast amounts of accurate data", correct: false },
        { id: 'b', label: 'Treat it as a strong starting point and verify anything consequential through a reliable source', correct: true },
        { id: 'c', label: "Trust it for common knowledge but not specialist topics", correct: false },
        { id: 'd', label: "Ask AI if it's confident in the answer before relying on it", correct: false },
      ],
      explanation: "AI can generate confident, detailed, and completely wrong answers. The confidence of the response is not a signal of accuracy — independent verification is always the right call for anything that matters.",
    },
    {
      q: "You want to build a personal AI workflow that saves time each week. Where should you start?",
      options: [
        { id: 'a', label: 'Try as many AI tools as possible and see which one feels best', correct: false },
        { id: 'b', label: 'Identify your most repetitive, time-consuming task and build one reliable prompt for it', correct: true },
        { id: 'c', label: 'Start with the most complex task to get the biggest time saving', correct: false },
        { id: 'd', label: 'Wait until your organisation has an approved AI tool list', correct: false },
      ],
      explanation: "One reliable prompt for one real pain point beats a dozen half-working tools. Start narrow, get a win, then expand — that's how durable AI habits form.",
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
  it: [
    { id: 'scripting', label: 'Faster scripting & automation', detail: 'Write scripts and automate tasks in less time' },
    { id: 'security-posture', label: 'Stronger security posture', detail: 'Use AI to detect threats and reduce risk' },
    { id: 'docs-knowledge', label: 'Better documentation', detail: 'Clear runbooks, SOPs, and knowledge bases' },
    { id: 'alert-fatigue', label: 'Cut through alert noise', detail: 'Triage and prioritise incidents faster' },
  ],
  other: [
    { id: 'general', label: 'Saving time', detail: 'Too much time on repetitive, manual work' },
    { id: 'better-decisions', label: 'Making better decisions', detail: 'Need better information to decide well' },
    { id: 'lead-ai', label: 'Leading AI in my org', detail: 'Need to guide others through AI change' },
    { id: 'client-value', label: 'Delivering more value', detail: 'Want AI to help me serve others better' },
  ],
}

// ─── Sub-role specific challenges ─────────────────────────────────────────────

const SUB_ROLE_CHALLENGES: Partial<Record<string, Record<string, { id: string; label: string; detail: string }[]>>> = {
  marketing: {
    'brand-comms': [
      { id: 'brand-consistency', label: 'Staying on-brand at scale', detail: 'Copy from freelancers and agencies drifts from brand guidelines' },
      { id: 'creative-speed', label: 'Slow creative reviews', detail: 'Approvals and revisions eat weeks before launch' },
      { id: 'pr-cutthrough', label: 'Getting PR cut-through', detail: 'Hard to stand out in a saturated media landscape' },
      { id: 'exec-comms', label: 'Executive thought leadership', detail: "Writing senior leadership's content takes too much of my time" },
    ],
    'content-seo': [
      { id: 'content-volume', label: 'Not enough content to rank', detail: 'Competitors publish faster and rank higher' },
      { id: 'content-freshness', label: 'Keeping content up to date', detail: 'Older posts decay without a scalable refresh process' },
      { id: 'briefing-quality', label: 'Slow writer briefing', detail: 'Getting freelancers to capture the right angle takes too long' },
      { id: 'seo-roi', label: 'Proving content ROI', detail: "Hard to link organic traffic to pipeline for stakeholders" },
    ],
    'growth-perf': [
      { id: 'roas-pressure', label: 'Rising ad costs, flat ROAS', detail: 'CPCs are up and performance is harder to justify' },
      { id: 'attribution', label: 'Attribution is broken', detail: "Can't reliably credit campaigns with the pipeline they drive" },
      { id: 'experiment-speed', label: 'Too few experiments running', detail: 'Test-and-learn cycles are slower than they need to be' },
      { id: 'data-quality', label: 'Unreliable tracking data', detail: 'Cookie changes and ad blockers distort the numbers' },
    ],
    'campaigns': [
      { id: 'brief-quality', label: 'Poor creative briefs', detail: 'Agencies and designers come back with the wrong direction' },
      { id: 'asset-delays', label: 'Assets always late', detail: 'Production bottlenecks push launch dates back repeatedly' },
      { id: 'campaign-scale', label: 'Can\'t personalise at scale', detail: 'One-size campaign messaging underperforms across segments' },
      { id: 'post-campaign', label: 'Weak post-campaign analysis', detail: 'No time to properly evaluate what worked before the next brief' },
    ],
    'cmo': [
      { id: 'marketing-roi', label: 'Proving marketing\'s business value', detail: "Board wants revenue attribution, not awareness metrics" },
      { id: 'team-velocity', label: 'Team moves too slowly', detail: 'Keeping a lean team competitive with well-resourced rivals' },
      { id: 'ai-tool-sprawl', label: 'AI tool sprawl', detail: 'Everyone is trying different tools with no consistent standard' },
      { id: 'talent-skills', label: 'Skills gaps in the team', detail: 'The team\'s capabilities are not keeping pace with what\'s possible' },
    ],
  },
  finance: {
    'fpa': [
      { id: 'reporting-time', label: 'Reporting takes too long', detail: 'Monthly close and commentary eats the first week of every month' },
      { id: 'forecast-accuracy', label: 'Inaccurate forecasts', detail: 'Projections miss by enough to create credibility problems' },
      { id: 'narrative-gap', label: 'Numbers without story', detail: "Non-finance leaders don't know what to do with the data" },
      { id: 'model-maintenance', label: 'Models are fragile', detail: 'Spreadsheets break when assumptions change mid-cycle' },
    ],
    'accounting': [
      { id: 'manual-entries', label: 'Too much manual data entry', detail: 'Reconciliations and postings take hours that should take minutes' },
      { id: 'close-speed', label: 'Month-end close is too slow', detail: 'The team is always racing deadlines with limited room for error' },
      { id: 'regulatory-changes', label: 'Regulatory changes pile up', detail: 'Hard to keep reporting current as rules evolve across markets' },
      { id: 'error-risk', label: 'Error risk at high volume', detail: 'Transaction volume makes manual review impractical' },
    ],
    'treasury': [
      { id: 'cashflow-visibility', label: 'Limited cash visibility', detail: "Real-time cash position across entities is hard to track" },
      { id: 'fx-risk', label: 'FX volatility', detail: 'Currency moves create exposure that\'s difficult to hedge cost-effectively' },
      { id: 'bank-reconciliation', label: 'Slow bank reconciliation', detail: 'Matching transactions across banks and currencies is time-consuming' },
      { id: 'treasury-comms', label: 'Explaining risk to leadership', detail: "Senior stakeholders don't engage with treasury risk until it's a problem" },
    ],
    'cfo': [
      { id: 'strategic-insight', label: 'Too much reporting, not enough insight', detail: 'The team produces data but leadership wants answers' },
      { id: 'data-latency', label: 'Slow, unreliable data', detail: "Decisions are made on last month's numbers, not today's reality" },
      { id: 'investor-narrative', label: 'Investor narrative prep', detail: 'Building board and investor materials takes the team too long' },
      { id: 'finance-transformation', label: 'Future-proofing the function', detail: 'Finance needs to evolve before the business outgrows it' },
    ],
  },
  hr: {
    'talent': [
      { id: 'cv-volume', label: 'Drowning in CVs', detail: 'High application volumes make fair, fast screening impossible' },
      { id: 'jd-quality', label: 'Weak job descriptions', detail: 'Poor JDs attract the wrong candidates and miss strong ones' },
      { id: 'time-to-hire', label: 'Time-to-hire is too long', detail: 'Slow processes lose candidates to faster-moving competitors' },
      { id: 'candidate-experience', label: 'Inconsistent candidate experience', detail: 'Quality varies depending on who runs the process' },
    ],
    'ld': [
      { id: 'programme-design', label: 'Designing programmes under pressure', detail: 'Not enough time to build learning that actually sticks' },
      { id: 'impact-measurement', label: 'Proving learning impact', detail: 'Completion rates don\'t tell the business whether skills improved' },
      { id: 'personalisation', label: 'One-size learning doesn\'t work', detail: 'Generic programmes don\'t address role-specific skill gaps' },
      { id: 'skills-currency', label: 'Skills needs change faster than programmes', detail: 'Content is outdated before the cohort finishes' },
    ],
    'hrbp': [
      { id: 'people-data', label: 'Turning people data into action', detail: 'Lots of dashboards, not enough insight for the business' },
      { id: 'er-volume', label: 'ER caseload is too high', detail: 'Employee relations cases consume time that should go to strategy' },
      { id: 'manager-support', label: 'Manager capability gaps', detail: 'Managers need more support with conversations and decisions' },
      { id: 'policy-comms', label: 'Making policy clear to everyone', detail: 'HR language confuses managers and employees alike' },
    ],
    'chro': [
      { id: 'ai-culture', label: 'Building AI readiness across the org', detail: "Most employees don't know where to start with AI" },
      { id: 'people-strategy', label: 'Linking people strategy to business outcomes', detail: "Hard to show the board that HR investments drive performance" },
      { id: 'talent-competition', label: 'Competing for talent', detail: 'The best candidates have more options than ever' },
      { id: 'change-fatigue', label: 'Change fatigue in the workforce', detail: 'People are tired of initiatives — adoption is harder than ever' },
    ],
  },
  sales: {
    'ae': [
      { id: 'research-time', label: 'Account research takes too long', detail: 'Personalising for each prospect eats prep time before every call' },
      { id: 'proposal-speed', label: 'Proposals from scratch every time', detail: 'No repeatable way to produce tailored proposals quickly' },
      { id: 'deal-momentum', label: 'Deals go quiet mid-cycle', detail: 'Hard to keep buyers engaged through long internal approval processes' },
      { id: 'objection-handling', label: 'Inconsistent objection handling', detail: 'No shared playbook for the hardest conversations' },
    ],
    'sdr': [
      { id: 'reply-rates', label: 'Outreach gets ignored', detail: 'Generic sequences go to spam or get deleted without a reply' },
      { id: 'prospect-research', label: 'Finding the right contacts fast', detail: 'Identifying decision-makers and their pain points takes too long' },
      { id: 'personalisation-scale', label: 'Personalising at volume', detail: "Can't tailor every message manually and still hit activity targets" },
      { id: 'activity-quality', label: 'Activity vs. quality trade-off', detail: 'Hitting dials and emails often means sacrificing message quality' },
    ],
    'am': [
      { id: 'churn-signals', label: 'Missing early churn signals', detail: 'Customers go quiet before I realise there\'s a problem' },
      { id: 'qbr-prep', label: 'QBR prep takes too long', detail: 'Pulling data and building the narrative eats half a day per account' },
      { id: 'portfolio-scale', label: 'Too many accounts to manage well', detail: 'Hard to give every account the attention it deserves' },
      { id: 'expansion-timing', label: 'Knowing when to push for expansion', detail: "Hard to identify which accounts are ready for an upsell conversation" },
    ],
    'vp-sales': [
      { id: 'forecast-accuracy', label: 'Forecasts are too optimistic', detail: "Reps sandbag or overstate — can't get a clean number" },
      { id: 'ramp-time', label: 'New reps take too long to ramp', detail: 'Time to first deal is long and inconsistent across hires' },
      { id: 'process-adoption', label: 'CRM and process discipline', detail: 'Activity data is patchy and the playbook isn\'t followed consistently' },
      { id: 'playbook-scale', label: 'Scaling what works', detail: "Top rep behaviours don't transfer reliably to the rest of the team" },
    ],
  },
  operations: {
    'process': [
      { id: 'knowledge-loss', label: 'Processes live in people\'s heads', detail: "When someone leaves, so does the knowledge" },
      { id: 'automation-prioritisation', label: 'Not sure what to automate first', detail: "Every process feels important — hard to know where to start" },
      { id: 'change-adoption', label: 'Teams don\'t follow new processes', detail: 'Rolling out improved workflows and getting them to stick is hard' },
      { id: 'ops-reporting', label: 'Slow operational reporting', detail: "Leadership wants data faster than the team can produce it" },
    ],
    'supply-chain': [
      { id: 'disruption-visibility', label: 'Supply disruptions hit without warning', detail: "By the time we know, it's too late to mitigate" },
      { id: 'supplier-management', label: 'Managing supplier performance at scale', detail: 'Too many suppliers to track quality and reliability manually' },
      { id: 'demand-forecast', label: 'Inaccurate demand forecasting', detail: 'Over- and under-stocking creates cost and service problems' },
      { id: 'cost-reliability', label: 'Balancing cost and reliability', detail: 'Cheaper suppliers create risk — hard to quantify the trade-off' },
    ],
    'quality': [
      { id: 'late-detection', label: 'Defects caught too late', detail: 'Problems surface at final inspection instead of earlier in the process' },
      { id: 'sop-maintenance', label: 'SOPs fall out of date', detail: 'Procedures change but documentation doesn\'t keep up' },
      { id: 'audit-readiness', label: 'Audit preparation is a scramble', detail: 'Getting evidence together takes weeks that should take days' },
      { id: 'process-compliance', label: 'Teams bypass quality steps', detail: 'Under pressure, people skip the process to meet deadlines' },
    ],
    'coo': [
      { id: 'ops-visibility', label: 'No real-time operational view', detail: "Can't see what's happening across the business without chasing reports" },
      { id: 'efficiency-gains', label: 'Finding the next efficiency gain', detail: 'Obvious improvements are done — the next ones are harder to find' },
      { id: 'change-programmes', label: 'Change that doesn\'t stick', detail: 'Initiatives get launched but revert to old behaviour within months' },
      { id: 'firefighting', label: 'Always in firefighting mode', detail: 'Operational issues pull focus from strategic priorities constantly' },
    ],
  },
  legal: {
    'in-house': [
      { id: 'contract-volume', label: 'Contract review backlog', detail: 'More agreements come in than the team can process at pace' },
      { id: 'plain-language', label: 'Legal advice that lands', detail: "Business partners want clear guidance, not legal caveats" },
      { id: 'risk-coverage', label: 'Covering risk across a fast-moving business', detail: 'Hard to stay on top of legal exposure when the business moves quickly' },
      { id: 'regulatory-tracking', label: 'Keeping up with regulatory change', detail: 'New rules across multiple areas compete for limited attention' },
    ],
    'compliance': [
      { id: 'regulatory-complexity', label: 'Regulatory landscape keeps changing', detail: 'Monitoring and responding to new rules across jurisdictions is relentless' },
      { id: 'training-effectiveness', label: 'Compliance training that doesn\'t stick', detail: 'Annual checkbox training doesn\'t change employee behaviour' },
      { id: 'audit-evidence', label: 'Keeping documentation audit-ready', detail: 'Evidence and records aren\'t consistently maintained across the business' },
      { id: 'board-comms', label: 'Communicating risk to the board', detail: 'Translating compliance risk into something leadership will act on is hard' },
    ],
    'litigation': [
      { id: 'document-volume', label: 'Large document sets in disputes', detail: 'Reviewing thousands of documents for relevant evidence is exhausting' },
      { id: 'case-law', label: 'Keeping up with case law', detail: 'Staying current with relevant precedents across active matters takes time' },
      { id: 'hearing-prep', label: 'Preparing under deadline pressure', detail: 'Hearing preparation compresses into too short a window' },
      { id: 'strategy-comms', label: 'Explaining strategy to stakeholders', detail: "Senior stakeholders want certainty that litigation can't provide" },
    ],
    'clco': [
      { id: 'team-scalability', label: 'Legal team can\'t keep up with demand', detail: 'Business growth creates more legal work than headcount can absorb' },
      { id: 'business-education', label: 'Educating the business on risk', detail: "Teams take on legal risk without understanding the consequences" },
      { id: 'external-counsel', label: 'Managing external counsel spend', detail: 'Outside counsel bills are high and hard to predict or justify' },
      { id: 'board-reporting', label: 'Board-level legal reporting', detail: "The board wants concise legal updates — not documents they won't read" },
    ],
  },
  product: {
    'pm': [
      { id: 'research-synthesis', label: 'Research piles up faster than insights', detail: 'User interviews and feedback sit unread while the roadmap needs decisions' },
      { id: 'spec-quality', label: 'Engineering pushes back on specs', detail: 'Requirements are ambiguous and cause rework mid-sprint' },
      { id: 'stakeholder-alignment', label: 'Roadmap debates that go in circles', detail: "Everyone has an opinion — hard to get to a decision and move on" },
      { id: 'ruthless-priority', label: 'Everything feels urgent', detail: 'Saying no is hard when every stakeholder has a strong case for their request' },
    ],
    'po': [
      { id: 'backlog-grooming', label: 'Backlog is never ready', detail: 'Sprint planning starts with tickets that aren\'t well defined enough to build' },
      { id: 'story-quality', label: 'User stories cause rework', detail: 'Engineers ask clarifying questions that block progress mid-sprint' },
      { id: 'tech-debt', label: 'Tech debt vs. feature balance', detail: 'Hard to justify maintenance work when product wants new features shipped' },
      { id: 'stakeholder-updates', label: 'Stakeholder communication overhead', detail: 'Keeping everyone updated takes time away from actual delivery work' },
    ],
    'growth-pm': [
      { id: 'experiment-signal', label: 'Experiments don\'t give clear signal', detail: 'Tests run but results are ambiguous or contradictory' },
      { id: 'eng-bandwidth', label: 'Engineering prioritises features over growth', detail: 'Getting dev time for experiments is a constant negotiation' },
      { id: 'funnel-diagnosis', label: 'Diagnosing what\'s driving changes', detail: 'Hard to tell what\'s causing activation or retention to move' },
      { id: 'insight-to-action', label: 'Too slow from data to decision', detail: 'Analysis takes long enough that the window for acting has closed' },
    ],
    'cpo': [
      { id: 'team-alignment', label: 'Multiple teams, diverging direction', detail: 'Keeping product teams aligned on strategy gets harder as headcount grows' },
      { id: 'long-term-vs-short', label: 'Short-term pressure vs. long-term vision', detail: 'Quarterly targets pull the roadmap away from the strategy' },
      { id: 'vision-communication', label: 'Product vision that doesn\'t inspire', detail: 'Hard to articulate a direction the whole team gets excited about' },
      { id: 'customer-proximity', label: 'Losing touch with customers', detail: "As the organisation scales, leadership gets further from user reality" },
    ],
  },
  customer: {
    'csm': [
      { id: 'portfolio-breadth', label: 'Too many accounts to serve well', detail: 'Important things slip through the cracks across a large book' },
      { id: 'at-risk-detection', label: 'At-risk accounts go dark before I notice', detail: 'Churn happens without early warning because signals are buried in data' },
      { id: 'qbr-efficiency', label: 'QBR prep takes half a day', detail: 'Pulling usage data and building the narrative is slow and manual' },
      { id: 'outreach-scale', label: 'Personalised outreach across all accounts', detail: "Generic check-ins don't feel personal, but tailoring everything isn't scalable" },
    ],
    'cs-ops': [
      { id: 'health-score-accuracy', label: 'Health scores don\'t reflect reality', detail: 'The model flags the wrong accounts or misses obvious at-risk signals' },
      { id: 'tool-adoption', label: 'CSMs don\'t use the tech stack properly', detail: "Data quality suffers when the team logs work inconsistently" },
      { id: 'dashboard-action', label: 'Dashboards that nobody acts on', detail: 'Reports get built and shared but don\'t change what the team does' },
      { id: 'process-scale', label: 'Processes break as the team grows', detail: 'What worked for 10 CSMs doesn\'t work for 30' },
    ],
    'support': [
      { id: 'resolution-speed', label: 'Resolution time is too slow', detail: 'Tickets sit in queues longer than customers will tolerate' },
      { id: 'repeat-contacts', label: 'Same issues come back repeatedly', detail: 'Customers contact us again because the first resolution didn\'t stick' },
      { id: 'agent-consistency', label: 'Inconsistent agent quality', detail: 'Response quality varies too much depending on who picks up the ticket' },
      { id: 'volume-spikes', label: 'Volume spikes overwhelm the team', detail: 'Product launches and incidents create backlogs that take weeks to clear' },
    ],
    'vp-cs': [
      { id: 'nrr-improvement', label: 'Improving NRR without adding headcount', detail: "Can't keep hiring to cover every account segment at the right depth" },
      { id: 'team-scale', label: 'Scaling the team without losing quality', detail: 'Growth means onboarding more CSMs while maintaining service standards' },
      { id: 'churn-signal-timing', label: 'Getting churn signals early enough to act', detail: 'By the time the data shows risk, the customer decision is already made' },
      { id: 'cs-value', label: 'Proving CS drives commercial outcomes', detail: "Hard to show the board that CS investment translates to revenue" },
    ],
  },
  consulting: {
    'analyst': [
      { id: 'deadline-pressure', label: 'Models and decks under brutal deadlines', detail: 'Quality suffers when turnaround time is measured in hours' },
      { id: 'data-to-story', label: 'Structuring data into a clear narrative', detail: 'Findings are solid but translating them into a compelling argument is hard' },
      { id: 'polished-output', label: 'Producing polished deliverables fast', detail: 'Formatting, charts, and slide production eat time that should go to thinking' },
      { id: 'industry-learning', label: 'Getting up to speed on new industries fast', detail: 'Each engagement requires deep domain knowledge you don\'t yet have' },
    ],
    'consultant': [
      { id: 'workstream-delivery', label: 'Delivering workstreams under client pressure', detail: 'Quality, speed, and client satisfaction are all in tension at once' },
      { id: 'insight-communication', label: 'Making complex analysis actionable', detail: 'Clients understand the output but struggle to know what to do with it' },
      { id: 'scope-management', label: 'Scope creep erodes margins', detail: 'Clients ask for more and it\'s hard to push back without damaging the relationship' },
      { id: 'team-development', label: 'Developing junior staff while delivering', detail: 'Coaching analysts takes time when you\'re also managing your own work' },
    ],
    'specialist': [
      { id: 'domain-currency', label: 'Staying at the cutting edge of your field', detail: 'Delivering client work leaves little time to develop your own expertise' },
      { id: 'accessibility', label: 'Making specialist knowledge land', detail: 'Expert insight loses impact when clients can\'t follow the reasoning' },
      { id: 'differentiation', label: 'Differentiating from generalist firms', detail: 'Clients sometimes choose a bigger brand over deeper expertise' },
      { id: 'client-development', label: 'Building a client base that values depth', detail: 'Positioning as a specialist can feel limiting to some buyers' },
    ],
    'partner': [
      { id: 'mandate-origination', label: 'Originating new work in a competitive market', detail: 'Winning mandates requires more relationship investment than ever' },
      { id: 'relationship-depth', label: 'Managing client relationships at the right level', detail: 'Staying close to senior clients while running multiple engagements is hard' },
      { id: 'talent-development', label: 'Developing the next generation of talent', detail: 'Building practice capability while hitting personal revenue targets is a real tension' },
      { id: 'practice-roi', label: 'Demonstrating practice value to firm leadership', detail: "Internal buy-in for investment requires making the business case clearly" },
    ],
  },
  it: {
    'sysadmin': [
      { id: 'runbook-gaps', label: 'Undocumented systems everywhere', detail: 'Critical processes exist only in people\'s heads — a departure would be catastrophic' },
      { id: 'toil-reduction', label: 'Repetitive tasks eat the whole day', detail: 'Patching, access provisioning, and backups leave no time for strategic work' },
      { id: 'incident-speed', label: 'Incident resolution takes too long', detail: 'Diagnosing and fixing issues is slower than it should be' },
      { id: 'management-comms', label: 'Explaining IT risk to non-technical management', detail: "Leadership doesn't understand the consequences until something breaks" },
    ],
    'security': [
      { id: 'alert-fatigue', label: 'Alert volume is unmanageable', detail: 'Thousands of alerts a day — finding real threats in the noise is exhausting' },
      { id: 'threat-pace', label: 'Threat landscape moves faster than defences', detail: 'New attack vectors emerge before existing ones are fully mitigated' },
      { id: 'compliance-burden', label: 'Compliance and audit preparation', detail: 'Meeting regulatory requirements takes significant team time every cycle' },
      { id: 'security-culture', label: 'Getting the business to take security seriously', detail: 'Policy violations happen because people prioritise convenience over compliance' },
    ],
    'devops': [
      { id: 'deployment-risk', label: 'Deployments are too risky', detail: 'Releases cause incidents more often than they should' },
      { id: 'cloud-costs', label: 'Cloud costs keep climbing', detail: 'Infrastructure spend grows with usage but optimisation is always deprioritised' },
      { id: 'developer-adoption', label: 'Developers don\'t follow CI/CD practices', detail: 'Pipeline bypasses and manual steps undermine the reliability of releases' },
      { id: 'infra-docs', label: 'Infrastructure docs fall behind', detail: 'Fast-moving changes mean documentation is always out of date' },
    ],
    'developer': [
      { id: 'boilerplate', label: 'Repetitive code slows delivery', detail: 'Too much time on scaffolding and boilerplate instead of solving the real problem' },
      { id: 'tech-docs', label: 'Documentation no one writes', detail: 'Internal tools and APIs go undocumented because there\'s always something more urgent' },
      { id: 'tech-currency', label: 'Keeping up with evolving tools and frameworks', detail: 'The ecosystem moves fast and staying current takes deliberate effort' },
      { id: 'debugging-speed', label: 'Debugging complex issues under pressure', detail: 'Production incidents require fast root cause analysis with incomplete information' },
    ],
    'it-leader': [
      { id: 'budget-justification', label: 'Getting IT investment approved', detail: "Non-technical stakeholders don't see IT as a strategic priority until something fails" },
      { id: 'skills-gap', label: 'Team skills falling behind', detail: 'Technology changes faster than the team\'s capability to keep up' },
      { id: 'vendor-management', label: 'Vendor complexity and cost', detail: 'Too many contracts, renewal dates, and performance issues to manage effectively' },
      { id: 'it-strategy', label: 'Building a strategy that supports growth', detail: 'Current infrastructure creates constraints that slow the business down' },
    ],
  },
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
  it: [
    { id: 'save-time',        label: 'Automate repetitive IT tasks',   detail: 'Scripts, runbooks, and ops tasks off your plate',   icon: Clock  },
    { id: 'better-decisions', label: 'Faster incident response',       detail: 'AI-assisted triage and root cause analysis',        icon: Target },
    { id: 'stay-competitive', label: 'Future-proof my IT career',      detail: 'Build AI skills before they become essential',      icon: Trend  },
    { id: 'client-value',     label: 'Better service to the business', detail: 'Faster resolution and higher quality IT support',   icon: Star   },
    { id: 'lead-ai',          label: 'Lead AI strategy in IT',         detail: 'Shape how your team adopts AI tools responsibly',   icon: Brain  },
    { id: 'upskill-team',     label: 'Upskill my IT team',             detail: 'Get engineers and admins comfortable with AI',      icon: Users  },
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
  roles: [],
  subRole: '',
  roleDescription: '',
  industry: 'technology',
  companySize: 'scaleup',
  currentTools: [],
  experience: 'none',
  skillScore: 0,
  challenges: [],
  goals: [],
  timePerWeek: 'moderate',
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function AssessmentPage() {
  const t = useTranslations('assessment')
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user, signOut } = useAuth()
  const [mounted, setMounted] = useState(false)
  const [stepIdx, setStepIdx] = useState(0)
  const [direction, setDirection] = useState(1)
  const [answers, setAnswers] = useState<AssessmentAnswers>(DEFAULT_ANSWERS)
  const [processingStep, setProcessingStep] = useState(0)
  const redirectChecked = useRef(false)

  // If the user is already logged in and has a completed assessment, send them to results
  // Skip redirect when retake=1 is in the URL (user deliberately clicked Retake)
  useEffect(() => {
    if (!user || redirectChecked.current) return
    if (searchParams.get('retake') === '1') return
    redirectChecked.current = true
    const local = localStorage.getItem('opuslearn-assessment')
    if (local) { router.replace('/assessment/results'); return }
    loadLatestAssessment(user.id).then(remote => {
      if (remote) {
        localStorage.setItem('opuslearn-assessment', JSON.stringify(remote))
        router.replace('/assessment/results')
      }
    }).catch(() => {})
  }, [user, router, searchParams])

  // Pre-fill name from auth metadata and skip welcome step when signed in
  useEffect(() => {
    if (!user) return
    const firstName = user.user_metadata?.full_name?.split(' ')[0]
      ?? user.user_metadata?.name?.split(' ')[0]
      ?? user.email?.split('@')[0]
      ?? ''
    setAnswers(a => ({ ...a, name: firstName }))
    setStepIdx(1) // skip welcome step
  }, [user])

  useEffect(() => { setMounted(true) }, [])

  // Dynamic steps based on role (branching)
  const STEPS = useMemo<StepId[]>(() => {
    const base: StepId[] = ['welcome', 'role']
    const primary = answers.roles[0]
    if (answers.roles.length === 1 && primary !== 'other' && primary !== 'leadership') base.push('subRole')
    return [...base, 'context', 'tools', 'skillCheck', 'challenge', 'goals', 'time', 'processing']
  }, [answers.roles])

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
            localStorage.setItem('opuslearn-assessment', JSON.stringify(result))
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
      case 'role': return answers.roles.length > 0
      case 'subRole': return true
      case 'context': return answers.industry !== undefined && answers.companySize !== undefined
      case 'tools': return answers.currentTools.length > 0
      case 'skillCheck': return true
      case 'challenge': return answers.challenges.length > 0
      case 'goals': return answers.goals.length > 0
      case 'time': return true
      default: return false
    }
  }

  const primaryRole = answers.roles[0] ?? 'other'
  const skillQs = SKILL_QUESTIONS[primaryRole] ?? SKILL_QUESTIONS.other
  const challenges = (answers.subRole && answers.roles.length === 1
    ? SUB_ROLE_CHALLENGES[primaryRole]?.[answers.subRole]
    : undefined)
    ?? answers.roles.flatMap(r => CHALLENGES[r] ?? CHALLENGES.other)
      .filter((c, i, arr) => arr.findIndex(x => x.id === c.id) === i)
  const allGoalOptions = answers.roles.flatMap(r => ROLE_GOALS[r] ?? ROLE_GOALS.other)
  const goals = allGoalOptions.filter((g, i, arr) => arr.findIndex(x => x.id === g.id) === i)
  const progressPct = Math.round((stepIdx / contentStepCount) * 100)

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#EFF6FF', fontFamily: F }}>
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 flex-shrink-0"
        style={{ background: '#FFFFFF', borderBottom: '1px solid #E2E8F0' }}>
        <Link href="/" className="flex items-center gap-2">
          <Logo size="md" />
        </Link>

        <div className="flex items-center gap-4">
          {mounted && currentStep !== 'processing' && (
            <>
              <span className="text-xs hidden sm:block" style={{ color: '#94A3B8' }}>
                {t('stepOf', { current: stepIdx + 1, total: contentStepCount })}
              </span>
              <div className="w-32 h-1.5 rounded-full overflow-hidden" style={{ background: '#E2E8F0' }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: 'linear-gradient(90deg, #2563EB, #22D3EE)' }}
                  animate={{ width: `${progressPct}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </>
          )}
          {user && (
            <button
              onClick={() => signOut()}
              className="text-xs font-medium transition-colors"
              style={{ color: '#94A3B8' }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = '#64748B' }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = '#94A3B8' }}
            >
              Sign out
            </button>
          )}
        </div>
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
                    style={{ background: '#DBEAFE', color: '#2563EB' }}>
                    <Zap size={11} /> {t('fiveMinutes')}
                  </div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4" style={{ color: '#0F172A' }}>
                    Find your perfect<br />
                    <span style={{ background: 'linear-gradient(90deg, #2563EB, #22D3EE)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                      AI learning path
                    </span>
                  </h1>
                  <p className="text-lg" style={{ color: '#64748B' }}>
                    {t('findPerfectSub')}
                  </p>
                </div>

                <div className="mb-8">
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#334155' }}>{t('yourName')}</label>
                  <input
                    type="text"
                    placeholder={t('yourFirstName')}
                    value={answers.name}
                    onChange={e => setAnswers(a => ({ ...a, name: e.target.value }))}
                    onKeyDown={e => e.key === 'Enter' && canProceed() && goNext()}
                    autoFocus
                    className="w-full px-5 py-4 rounded-xl text-base outline-none transition-all"
                    style={{ background: '#FFFFFF', border: '1px solid #CBD5E1', color: '#0F172A' }}
                    onFocus={e => { e.currentTarget.style.borderColor = '#2563EB' }}
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
                  sub="Select all that apply — up to 3. We'll build a blended path across your tracks."
                />
                {answers.roles.length > 0 && (
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: '#DBEAFE', color: '#2563EB' }}>
                      {answers.roles.length} selected
                    </span>
                    {answers.roles.length >= 3 && (
                      <span className="text-xs" style={{ color: '#94A3B8' }}>Maximum reached</span>
                    )}
                  </div>
                )}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-8">
                  {ROLES.map(role => {
                    const Icon = role.icon
                    const sel = answers.roles.includes(role.id)
                    const atMax = answers.roles.length >= 3
                    return (
                      <button key={role.id}
                        onClick={() => setAnswers(a => {
                          const isSelected = a.roles.includes(role.id)
                          if (isSelected) {
                            return { ...a, roles: a.roles.filter(r => r !== role.id), subRole: '', goals: [], challenges: [] }
                          }
                          if (a.roles.length >= 3) return a
                          return { ...a, roles: [...a.roles, role.id], subRole: '', goals: [], challenges: [] }
                        })}
                        className="p-4 rounded-2xl text-left transition-all hover:scale-[1.02]"
                        style={{
                          background: sel ? `${role.color}08` : '#FFFFFF',
                          border: `1px solid ${sel ? role.color : '#E2E8F0'}`,
                          opacity: !sel && atMax ? 0.45 : 1,
                        }}>
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
                <NavButtons canProceed={canProceed()} onNext={goNext} onBack={goBack} />
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
                  {(SUB_ROLES[answers.roles[0]] ?? []).map(sr => {
                    const sel = answers.subRole === sr.id
                    return (
                      <button key={sr.id}
                        onClick={() => setAnswers(a => ({ ...a, subRole: sr.id }))}
                        className="p-4 rounded-2xl text-left transition-all hover:scale-[1.01]"
                        style={{ background: sel ? '#DBEAFE' : '#FFFFFF', border: `1px solid ${sel ? '#2563EB' : '#E2E8F0'}` }}>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-sm font-semibold mb-0.5" style={{ color: '#0F172A' }}>{sr.label}</div>
                            <div className="text-xs" style={{ color: '#94A3B8' }}>{sr.detail}</div>
                          </div>
                          {sel && <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ml-3" style={{ background: '#2563EB' }}><Check size={11} className="text-white" /></div>}
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
                  <p className="text-xs font-semibold mb-3 uppercase tracking-wider" style={{ color: '#94A3B8' }}>{t('industry')}</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {INDUSTRIES.map(ind => {
                      const sel = answers.industry === ind.id
                      return (
                        <button key={ind.id}
                          onClick={() => setAnswers(a => ({ ...a, industry: ind.id }))}
                          className="px-3 py-2.5 rounded-xl text-sm text-left transition-all"
                          style={{ background: sel ? '#DBEAFE' : '#FFFFFF', border: `1px solid ${sel ? '#2563EB' : '#E2E8F0'}`, color: sel ? '#2563EB' : '#475569', fontWeight: sel ? 600 : 400 }}>
                          {ind.label}
                        </button>
                      )
                    })}
                  </div>
                </div>
                <div className="mb-8">
                  <p className="text-xs font-semibold mb-3 uppercase tracking-wider" style={{ color: '#94A3B8' }}>{t('companySize')}</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {COMPANY_SIZES.map(cs => {
                      const sel = answers.companySize === cs.id
                      return (
                        <button key={cs.id}
                          onClick={() => setAnswers(a => ({ ...a, companySize: cs.id }))}
                          className="p-3 rounded-xl text-center transition-all"
                          style={{ background: sel ? '#DBEAFE' : '#FFFFFF', border: `1px solid ${sel ? '#2563EB' : '#E2E8F0'}` }}>
                          <div className="text-sm font-semibold" style={{ color: sel ? '#2563EB' : '#0F172A' }}>{cs.label}</div>
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

            {/* ── Skill Check ── */}
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
                  question="What are your biggest challenges right now?"
                  sub="Select all that apply — we'll make sure your path tackles them head-on."
                />
                <div className="space-y-3 mb-8">
                  {challenges.map(ch => {
                    const sel = answers.challenges.includes(ch.id)
                    return (
                      <button key={ch.id}
                        onClick={() => setAnswers(a => ({
                          ...a,
                          challenges: sel
                            ? a.challenges.filter(c => c !== ch.id)
                            : [...a.challenges, ch.id],
                        }))}
                        className="w-full flex items-center gap-4 p-5 rounded-2xl text-left transition-all hover:scale-[1.01]"
                        style={{ background: sel ? '#DBEAFE' : '#FFFFFF', border: `1px solid ${sel ? '#2563EB' : '#E2E8F0'}` }}>
                        <div className="flex-1">
                          <div className="text-base font-semibold" style={{ color: '#0F172A' }}>{ch.label}</div>
                          <div className="text-sm mt-0.5" style={{ color: '#64748B' }}>{ch.detail}</div>
                        </div>
                        {sel && <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#2563EB' }}><Check size={13} className="text-white" /></div>}
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
                        style={{ background: sel ? '#DBEAFE' : '#FFFFFF', border: `1px solid ${sel ? '#2563EB' : '#E2E8F0'}` }}>
                        <div className="flex items-start justify-between mb-3">
                          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: sel ? '#BFDBFE' : '#EFF6FF' }}>
                            <Icon size={16} color={sel ? '#2563EB' : '#94A3B8'} />
                          </div>
                          {sel && <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: '#2563EB' }}><Check size={11} className="text-white" /></div>}
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
                <NavButtons canProceed onNext={goNext} onBack={goBack} isLast nextLabel={t('buildMyPath')} />
              </motion.div>
            )}

            {/* ── Processing ── */}
            {currentStep === 'processing' && (
              <motion.div key="processing" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-16">
                <div className="relative w-24 h-24 mx-auto mb-10">
                  <motion.div className="absolute inset-0 rounded-full" style={{ border: '2px solid transparent', borderTopColor: '#2563EB' }} animate={{ rotate: 360 }} transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }} />
                  <motion.div className="absolute inset-3 rounded-full" style={{ border: '2px solid transparent', borderTopColor: '#22D3EE' }} animate={{ rotate: -360 }} transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }} />
                  <div className="absolute inset-7 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #DBEAFE, #ECFEFF)' }}>
                    <Zap size={18} color="#2563EB" />
                  </div>
                </div>
                <h2 className="text-2xl font-black mb-6" style={{ color: '#0F172A' }}>{t('buildingPath')}</h2>
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

// ─── Shared sub-components ────────────────────────────────────────────────────

function StepHeader({ question, sub }: { question: string; sub: string }) {
  return (
    <div className="mb-7">
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-black mb-2.5" style={{ color: '#0F172A' }}>{question}</h2>
      <p className="text-base" style={{ color: '#64748B' }}>{sub}</p>
    </div>
  )
}

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
  const [shuffled, setShuffled] = useState<SkillQuestion['options']>([])

  useEffect(() => {
    const opts = [...questions[qIdx].options]
    for (let i = opts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [opts[i], opts[j]] = [opts[j], opts[i]]
    }
    setShuffled(opts)
  }, [qIdx, questions])

  const SKILL_INTROS = [
    "Let's start with something practical.",
    'Good. Now a judgment call.',
    "Nice. Let's think bigger picture.",
    "Last one — this one's about risk.",
  ]
  const NEXT_LABELS = ['Next question →', 'Keep going →', 'One more →', 'See my results']

  const q = questions[qIdx]
  const isLast = qIdx === questions.length - 1

  function handleSelect(id: string) {
    if (revealed) return
    setSelected(id)
    setRevealed(true)
    const correct = questions[qIdx].options.find(o => o.id === id)?.correct ?? false
    const newScore = correct ? score + 1 : score
    if (isLast) {
      setTimeout(() => onComplete(newScore), 900)
    } else {
      setScore(newScore)
    }
  }

  function handleNext() {
    setSelected(null)
    setRevealed(false)
    setQIdx(i => i + 1)
  }

  return (
    <motion.div key={`skillCheck-${qIdx}`} custom={direction} variants={slideIn} initial="hidden" animate="visible" exit="exit">
      <div className="mb-5 flex items-center justify-between">
        <p className="text-sm font-medium" style={{ color: '#64748B' }}>{SKILL_INTROS[qIdx] ?? ''}</p>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: '#DBEAFE', color: '#2563EB' }}>
          Q {qIdx + 1} of {questions.length}
        </span>
      </div>

      <div className="w-full rounded-full h-1.5 mb-6" style={{ background: '#E2E8F0' }}>
        <div className="h-1.5 rounded-full transition-all duration-500"
          style={{ width: `${((qIdx) / questions.length) * 100}%`, background: 'linear-gradient(90deg, #2563EB, #22D3EE)' }} />
      </div>

      <h2 className="text-xl sm:text-2xl font-black mb-6" style={{ color: '#0F172A' }}>{q.q}</h2>

      <div className="space-y-3 mb-6">
        {shuffled.map(opt => {
          const isSelected = selected === opt.id
          const isCorrect = opt.correct
          let bg = '#FFFFFF'
          let border = '#E2E8F0'
          let textColor = '#0F172A'
          if (revealed && isSelected && isCorrect) { bg = '#DCFCE7'; border = '#16A34A'; textColor = '#15803D' }
          else if (revealed && isSelected && !isCorrect) { bg = '#FEE2E2'; border = '#DC2626'; textColor = '#DC2626' }
          else if (revealed && isCorrect) { bg = '#DCFCE7'; border = '#16A34A'; textColor = '#15803D' }
          return (
            <button key={opt.id}
              onClick={() => handleSelect(opt.id)}
              disabled={revealed}
              className="w-full flex items-center gap-4 p-4 rounded-2xl text-left transition-all hover:scale-[1.01] disabled:cursor-default"
              style={{ background: bg, border: `1.5px solid ${border}` }}>
              <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: revealed && isCorrect ? '#16A34A' : revealed && isSelected ? '#DC2626' : '#F1F5F9' }}>
                {revealed && isCorrect
                  ? <Check size={12} className="text-white" />
                  : revealed && isSelected && !isCorrect
                    ? <X size={12} className="text-white" />
                    : null}
              </div>
              <span className="text-sm font-medium" style={{ color: textColor }}>{opt.label}</span>
            </button>
          )
        })}
      </div>

      {revealed && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-2xl mb-6"
          style={{ background: shuffled.find(o => o.id === selected)?.correct ? '#DCFCE7' : '#FEE2E2' }}>
          <p className="text-sm" style={{ color: shuffled.find(o => o.id === selected)?.correct ? '#15803D' : '#991B1B' }}>
            {q.explanation}
          </p>
        </motion.div>
      )}

      <div className="flex items-center gap-3">
        {qIdx === 0 && (
          <button onClick={onBack} className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all hover:bg-slate-100" style={{ color: '#64748B' }}>
            <ArrowLeft size={15} /> Back
          </button>
        )}
        {revealed && !isLast && (
          <button onClick={handleNext}
            className="flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-semibold transition-all hover:scale-[1.02]"
            style={{ background: 'linear-gradient(135deg, #2563EB, #22D3EE)', color: '#FFFFFF', boxShadow: '0 4px 14px rgba(37,99,235,0.25)' }}>
            {NEXT_LABELS[qIdx] ?? 'Next →'} <ArrowRight size={15} />
          </button>
        )}
      </div>
    </motion.div>
  )
}

function NavButtons({
  canProceed,
  onNext,
  onBack,
  isFirst = false,
  isLast = false,
  nextLabel,
}: {
  canProceed: boolean
  onNext: () => void
  onBack?: () => void
  isFirst?: boolean
  isLast?: boolean
  nextLabel?: string
}) {
  const t = useTranslations('assessment')
  const label = nextLabel ?? t('next')
  return (
    <div className="flex items-center gap-3">
      {!isFirst && onBack && (
        <button onClick={onBack} className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all hover:bg-slate-100" style={{ color: '#64748B' }}>
          <ArrowLeft size={15} /> {t('back')}
        </button>
      )}
      <button onClick={onNext} disabled={!canProceed}
        className="flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.02]"
        style={{
          background: canProceed ? 'linear-gradient(135deg, #2563EB, #22D3EE)' : '#E2E8F0',
          color: canProceed ? '#FFFFFF' : '#94A3B8',
          boxShadow: canProceed ? '0 4px 14px rgba(37,99,235,0.25)' : 'none',
        }}>
        {label} <ArrowRight size={15} />
      </button>
    </div>
  )
}
