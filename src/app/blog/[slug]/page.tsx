import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ArrowLeft, Clock, ArrowRight } from 'lucide-react'
import EditorialNav from '@/components/editorial/Nav'
import EditorialFooter from '@/components/editorial/Footer'
import { GrainOverlay } from '@/components/editorial/Atmosphere'
import {
  PAPER, INK, INK_SOFT, INK_FAINT,
  COBALT, COBALT_TX, RULE, SERIF, MONO, SANS,
} from '@/components/editorial/theme'

type Block =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'bullets'; items: string[] }
  | { type: 'callout'; text: string }

interface PostData {
  slug: string
  category: string
  categoryColor: string
  title: string
  excerpt: string
  author: string
  authorRole: string
  date: string
  readTime: string
  blocks: Block[]
  trackSlug: string
  trackName: string
}

const POSTS: Record<string, PostData> = {
  'marketing-ai-briefs': {
    slug: 'marketing-ai-briefs',
    category: 'Marketing',
    categoryColor: '#E04D2A',
    title: 'How Marketing Teams Are Using AI to Write Better Campaign Briefs',
    excerpt: "The best marketing teams aren't replacing their creative instincts with AI — they're using it to sharpen their thinking before a single word of copy is written.",
    author: 'OpusLearn Team',
    authorRole: "Head of Marketing, L'Oréal",
    date: 'May 12, 2026',
    readTime: '8 min read',
    trackSlug: 'marketing',
    trackName: 'AI for Marketing',
    blocks: [
      { type: 'p', text: "The brief is the most important document in marketing — and the least thought about. Most teams rush through it to get to execution. AI doesn't fix that instinct. But used correctly, it can force more rigorous thinking before anything is written." },
      { type: 'h2', text: "The problem isn't the copy — it's the brief" },
      { type: 'p', text: "When AI-generated marketing content disappoints, the usual diagnosis is 'the AI isn't good enough.' The real diagnosis, almost every time, is 'the brief wasn't specific enough.' AI tools are remarkably capable at generating content when given the right inputs. What they cannot do is compensate for a vague or underdeveloped brief. 'Write a campaign for our new product targeting young professionals' produces generic output not because the model is bad at copywriting — but because that brief is bad." },
      { type: 'h2', text: 'Invert the workflow' },
      { type: 'p', text: "The teams getting the best results have flipped the process. Instead of using AI to generate content directly, they use it to pressure-test the brief before a single word of copy is written. The prompt isn't 'write this campaign.' It's 'here's our brief — what's missing? What assumptions am I making? What questions would a senior creative director ask before approving this?'" },
      { type: 'p', text: "That single shift produces better input — which produces dramatically better output downstream. It also surfaces strategic gaps before you've committed to a creative direction." },
      { type: 'h2', text: 'Three prompts that improve any brief' },
      { type: 'bullets', items: [
        '"You\'re a sceptical creative director. What\'s the weakest part of this brief, and what would you need to see to approve it?"',
        '"What are three different angles we could take on this positioning? List the risks and opportunities of each."',
        '"Our target audience is [X]. What\'s the most common objection they\'d have to this message — and how would we address it?"',
      ]},
      { type: 'h2', text: 'What this looks like in practice' },
      { type: 'p', text: "At L'Oréal, we introduced a required AI interrogation step before creative review. Teams share their brief with an AI tool, run it through three to five critique prompts, and incorporate the feedback before presenting to the creative team. The result: fewer revisions, faster approvals, and noticeably more focused creative work." },
      { type: 'p', text: "The time invested in AI interrogation is recovered many times over in reduced back-and-forth later. The brief improves. The creative improves. The client relationship improves." },
      { type: 'h2', text: "The skill that's actually in demand" },
      { type: 'p', text: "What's emerging in marketing isn't 'AI skill' in isolation — it's the ability to think more rigorously about inputs. Prompting well is really brief-writing well. The teams outperforming their peers aren't using AI more; they're using it to hold themselves to a higher standard before they start. That's a skill worth developing intentionally." },
      { type: 'callout', text: "The AI literacy gap in marketing isn't about knowing which tools to use. It's about knowing what to ask — and being precise enough about the problem that the answer is actually useful." },
    ],
  },
  'finance-prompting-mistakes': {
    slug: 'finance-prompting-mistakes',
    category: 'Finance',
    categoryColor: '#F59E0B',
    title: 'The 5 AI Prompting Mistakes Finance Professionals Make',
    excerpt: 'Most finance teams get poor results from AI not because the model is bad, but because the prompts are structured the wrong way for analytical tasks.',
    author: 'OpusLearn Team',
    authorRole: 'Editorial',
    date: 'May 5, 2026',
    readTime: '6 min read',
    trackSlug: 'finance',
    trackName: 'AI for Finance',
    blocks: [
      { type: 'p', text: "After eighteen months running AI adoption programmes with finance teams, one pattern is consistent: the output quality is almost always a function of prompt quality, not model quality. Here are the five mistakes I see most often — and the fixes that produce immediate improvement." },
      { type: 'h2', text: 'Mistake 1: Asking for conclusions without providing context' },
      { type: 'p', text: "'What should our revenue forecast be for Q3?' produces useless output. AI has no access to your historical data, market position, or business model unless you provide it. The fix: front-load context. Before any analytical question, share relevant numbers, constraints, and assumptions. 'Given these Q1–Q2 actuals [data], our YoY growth trend, and a 12% currency headwind — model three Q3 scenarios: conservative, base, and upside.'" },
      { type: 'h2', text: 'Mistake 2: Not specifying output format' },
      { type: 'p', text: "Finance outputs need to work in Excel, in board packs, or in verbal briefings — and those formats are entirely different. Without a format specification, you get a generic paragraph that's useful to nobody. End every analytical prompt with explicit format instructions: 'Format as a table with columns for scenario name, revenue, gross margin, and one-line rationale. No introductory text.'" },
      { type: 'h2', text: 'Mistake 3: Leaving out constraints' },
      { type: 'p', text: "Analytical models without constraints produce unreliable output. Currency, time periods, accounting standards, rounding rules — if these aren't specified, AI makes assumptions that may not match your organisation's standards. Add a constraints block to complex prompts: 'GBP, FY ending 31 Dec, IFRS 15 revenue recognition, round to nearest £10k.'" },
      { type: 'h2', text: 'Mistake 4: Treating prompting as single-shot' },
      { type: 'p', text: "The best financial models take multiple iterations. First-pass AI output should be treated as a rough draft, not a final answer. Build an iterative workflow: first prompt for structure, second for refining assumptions, third for stress-testing, fourth for formatting. The incremental time investment is minimal; the quality improvement is substantial." },
      { type: 'h2', text: 'Mistake 5: Skipping validation' },
      { type: 'p', text: "AI will confidently produce a calculation with a subtle error. Finance professionals who treat AI output as a black box — rather than a first draft to be reviewed — take on unnecessary risk. Treat AI outputs as analyst work product: your review process should be identical to reviewing a junior analyst's first draft." },
      { type: 'callout', text: "The underlying problem isn't AI quality — it's that effective prompting requires the same discipline as good financial analysis. Bring that discipline to your prompts and the results follow." },
    ],
  },
  'hr-opuslearn-strategy': {
    slug: 'hr-opuslearn-strategy',
    category: 'HR & People',
    categoryColor: '#10B981',
    title: 'Why Your HR Team Needs an OpusLearn Strategy in 2026',
    excerpt: "The organisations closing the AI skills gap fastest aren't the ones with the biggest budgets — they're the ones where HR took ownership of the problem.",
    author: 'OpusLearn Team',
    authorRole: 'Editorial',
    date: 'April 28, 2026',
    readTime: '5 min read',
    trackSlug: 'hr',
    trackName: 'AI for HR',
    blocks: [
      { type: 'p', text: "Most AI upskilling programmes fail because they're owned by IT. IT understands the technology but not the workflows, the people, or the change dynamics. HR understands all three. The organisations closing the AI skills gap fastest are the ones where HR took ownership — not as a training function, but as a change management function." },
      { type: 'h2', text: 'What AI literacy actually means at enterprise scale' },
      { type: 'p', text: "'AI literacy' is often treated as binary: people either know how to use AI or they don't. In practice it's a three-tier capability. Awareness means understanding what AI can and can't do in your specific function. Application means using AI tools effectively in day-to-day workflows. Advanced means building or adapting AI workflows and evaluating new tools for the team. Most enterprise programmes are designed for awareness training when the real competitive advantage lies in application." },
      { type: 'h2', text: 'How to prioritise which roles to upskill first' },
      { type: 'p', text: "Not every role has equal leverage in an AI-enabled world. The roles with the highest return on AI upskilling share three characteristics: high-volume repetitive tasks, access to structured data, and output that needs to be adapted for multiple audiences. In most organisations, this points to finance, marketing, HR operations, and sales — ahead of leadership, which should be second-wave." },
      { type: 'h2', text: 'The three mistakes most training programmes make' },
      { type: 'bullets', items: [
        "Generic content that doesn't connect to actual role workflows — people complete it and then don't change how they work",
        "One-time events instead of embedded habits — skills learned in workshops decay within 30 days without reinforcement",
        "Measuring completion instead of application — programme success metrics that incentivise ticking a box rather than changing behaviour",
      ]},
      { type: 'h2', text: 'Building for the second wave' },
      { type: 'p', text: "The first wave of AI literacy — helping employees understand what AI is — is largely over. The second wave is harder: helping employees fundamentally change how they work. That requires HR to go beyond training design into job architecture, performance frameworks, and team structure. The organisations thinking about this now will have a structural advantage in two years." },
      { type: 'callout', text: "The companies that win on AI aren't the ones with the most tools. They're the ones where the most people know how to use them well. That's an HR problem, not an IT one." },
    ],
  },
  'sales-ai-journey': {
    slug: 'sales-ai-journey',
    category: 'Sales',
    categoryColor: '#2563EB',
    title: "From Sceptic to Advocate: One Sales Leader's AI Journey",
    excerpt: "Six months ago, I thought AI in sales was overhyped. Then I used it to cut my proposal prep time by 70%. Here's what changed my mind.",
    author: 'OpusLearn Team',
    authorRole: 'Editorial',
    date: 'April 20, 2026',
    readTime: '7 min read',
    trackSlug: 'sales',
    trackName: 'AI for Sales',
    blocks: [
      { type: 'p', text: "My objection wasn't that AI was useless. It was that sales is fundamentally a relationship business. The parts of the job that matter — building trust, reading a room, navigating complex buying dynamics — aren't things any model can replicate. What I missed was that those weren't the parts of the job I was spending most of my time on." },
      { type: 'h2', text: 'The first experiment' },
      { type: 'p', text: "I was preparing a proposal for a €2.5M deal. Five stakeholders, a technical procurement process, a competitor with a stronger price position. I usually spent a full day on a proposal like this. I tried drafting the executive summary, risk section, and pricing justification with AI assistance. It took three hours. The quality was better than my usual first draft." },
      { type: 'h2', text: 'What surprised me' },
      { type: 'p', text: "The proposal wasn't better because the AI was smarter than me. It was better because the prompting process forced me to be more precise about the client's actual problem, our specific differentiation, and the objections I expected. That discipline produced sharper thinking — which produced sharper writing. The AI accelerated the process and improved the output simultaneously." },
      { type: 'h2', text: 'The current workflow' },
      { type: 'p', text: "I now use AI in three parts of every sales cycle. In research: building account intelligence before the first call. In communication: drafting outreach, follow-up emails, and proposals. In debrief: analysing lost deals for patterns I might have missed. None of this replaces judgment. All of it gives me more time and better information to apply it." },
      { type: 'h2', text: 'Advice for other sceptics' },
      { type: 'p', text: "Don't try to AI-ify your highest-leverage activities first. Start with the work that feels like overhead: research, email drafts, CRM updates, proposal templates. When you recover three hours a week from that overhead, you can decide how to reinvest it. For me, that reinvestment went back into relationship work — the part of the job I'm actually best at." },
      { type: 'callout', text: "The question isn't whether AI belongs in sales. It's whether you'd rather spend your time on the 20% that builds the relationship or the 80% that supports it." },
    ],
  },
  'operations-decision-support': {
    slug: 'operations-decision-support',
    category: 'Operations',
    categoryColor: '#06B6D4',
    title: "AI as a Decision Support Layer: What Operations Leaders Get Wrong",
    excerpt: "The mistake isn't adopting AI too quickly — it's deploying it in the wrong part of the decision-making process. Here's the framework that actually works.",
    author: 'OpusLearn Team',
    authorRole: 'Editorial',
    date: 'April 14, 2026',
    readTime: '9 min read',
    trackSlug: 'operations',
    trackName: 'AI for Operations',
    blocks: [
      { type: 'p', text: "The most common mistake operations leaders make with AI isn't adopting it too quickly — it's deploying it in the wrong part of the decision-making process. AI is not a decision-maker. It is, at its best, the most powerful decision support tool that's ever existed. The distinction matters more than it sounds." },
      { type: 'h2', text: 'The wrong use cases' },
      { type: 'p', text: "Organisations that automate decisions with AI — rather than using AI to inform decisions made by humans — create two problems. First, accountability disappears: when AI makes the decision, nobody owns the outcome. Second, edge cases get mishandled: AI performs well on patterns it's seen and poorly on genuinely novel situations. Operations is full of novel situations." },
      { type: 'h2', text: 'The right framework' },
      { type: 'p', text: "Think of every decision in three stages: gather, synthesise, decide. AI should own the first two — aggregating data from multiple systems, identifying anomalies, generating scenario options — and a human should own the third. This isn't excessive caution. It's the architecture that actually produces better outcomes." },
      { type: 'h2', text: 'What this looks like in practice' },
      { type: 'bullets', items: [
        "Demand forecasting: AI synthesises sales data, seasonality, and external signals — the operations lead makes the call on inventory commitment",
        "Supplier risk: AI monitors financial filings, news, and delivery performance — the procurement lead decides whether to dual-source",
        "Capacity planning: AI models scenarios across equipment, headcount, and demand variables — the plant manager signs off on the investment",
      ]},
      { type: 'h2', text: 'How to implement it without creating dependency' },
      { type: 'p', text: "The risk of decision support AI is that humans defer to it even when they shouldn't — because it's faster and easier than thinking. Build explicit review checkpoints into AI-assisted workflows. Require the decision-maker to articulate why they agreed or disagreed with the AI recommendation. This preserves the quality control benefit without creating learned helplessness." },
      { type: 'callout', text: "AI that makes you a better decision-maker is far more valuable than AI that makes decisions for you. The first compounds over time. The second erodes the capability it replaces." },
    ],
  },
  'leadership-ai-change': {
    slug: 'leadership-ai-change',
    category: 'Leadership',
    categoryColor: '#F97316',
    title: "The Executive's Guide to Leading AI Transformation Without Losing Your Team",
    excerpt: "The biggest barrier to enterprise AI adoption isn't the technology — it's the fear and uncertainty it creates in people. Here's how to lead through it.",
    author: 'OpusLearn Team',
    authorRole: 'Editorial',
    date: 'April 7, 2026',
    readTime: '10 min read',
    trackSlug: 'leadership',
    trackName: 'AI for Leaders',
    blocks: [
      { type: 'p', text: "Most executives underestimate how much fear AI generates in their workforce. Not because employees aren't rational, but because the uncertainty is genuine. Nobody knows exactly which roles will change, by how much, or how fast. In that vacuum, people fill the gap with worst-case scenarios. The leader's job is not to eliminate the uncertainty — it can't be — but to make people feel capable of navigating it." },
      { type: 'h2', text: 'What most leaders get wrong about communication' },
      { type: 'p', text: "The most common mistake is over-communicating vision and under-communicating specifics. 'AI will make us more competitive' doesn't reduce anxiety. 'Here's what AI will and won't affect in your team's work over the next 12 months' does. People can handle difficult truths. They struggle with vague reassurances that don't match their day-to-day experience." },
      { type: 'h2', text: 'The framework that works' },
      { type: 'bullets', items: [
        "Be honest about what's changing: name the specific workflows, roles, and processes that will shift, and when",
        "Be specific about what isn't changing: most people's core value isn't in the tasks AI replaces — it's in judgment, relationships, and domain knowledge",
        "Create visible competence: public upskilling programmes, shared wins, and peer recognition for AI-enabled work",
        "Maintain consistency: one leader who says 'AI is a tool' while another reduces headcount citing AI efficiency destroys trust faster than any single communication can rebuild it",
      ]},
      { type: 'h2', text: 'Managing early adopters vs resistors' },
      { type: 'p', text: "Organisations have both, and they need different approaches. Early adopters need permission and recognition — they'll often run ahead if you get out of the way. Resistors need patience and proof, not persuasion. The best conversion story isn't an executive presentation. It's a colleague in the same role, at the same level, showing their new workflow and saying 'this took half the time.'" },
      { type: 'h2', text: 'Measuring adoption without creating anxiety' },
      { type: 'p', text: "Avoid measuring AI usage as a metric — it inverts the incentive structure, rewarding frequency over quality of use. Instead measure output quality, cycle time, and employee confidence. Run regular pulse checks on 'how capable do you feel to use AI in your current role?' That metric, tracked over time, tells you more than any tool adoption dashboard." },
      { type: 'callout', text: "The executives who lead AI transformation well aren't the most technically informed. They're the ones who understand that this is a people challenge first, and a technology challenge second." },
    ],
  },
  'legal-ai-contract-review': {
    slug: 'legal-ai-contract-review',
    category: 'Legal',
    categoryColor: '#0284C7',
    title: "How In-House Counsel Are Using AI to Review Contracts Faster — Without Cutting Corners",
    excerpt: "AI won't replace legal judgment. But lawyers who use it to cut first-pass review time by 60% will replace those who don't. Here's the workflow that actually holds up.",
    author: 'OpusLearn Team',
    authorRole: 'Editorial',
    date: 'March 31, 2026',
    readTime: '7 min read',
    trackSlug: 'legal',
    trackName: 'AI for Legal',
    blocks: [
      { type: 'p', text: "Contract review is one of the highest-value, most time-intensive parts of legal work. First-pass review of a standard commercial agreement — checking against playbook positions, flagging non-standard clauses, summarising key terms — typically takes two to four hours for a junior lawyer and one to two hours for a senior. AI reduces first-pass time to twenty to thirty minutes. For a team handling fifty contracts a month, that's a structural change." },
      { type: 'h2', text: "What AI is actually good at in contract review" },
      { type: 'p', text: "AI performs well on pattern matching: identifying clauses that deviate from a standard position, comparing against a redline playbook, summarising non-standard positions across multiple documents. It also performs well on extraction tasks: pulling defined terms, key dates, and obligations from dense legalese, and formatting them into a usable summary." },
      { type: 'h2', text: "What it's not good at" },
      { type: 'p', text: "AI performs poorly on judgment tasks: deciding whether a deviation from a standard clause is acceptable given the specific commercial context, weighing legal risk against business need, or advising on strategy in a negotiation. This distinction matters because the value of a lawyer isn't in reading the contract — it's in knowing what to do about what they find." },
      { type: 'h2', text: 'The workflow that holds up in practice' },
      { type: 'bullets', items: [
        "Run the contract through an AI review tool to flag non-standard clauses and produce an issues summary",
        "Review the AI summary against your playbook — this takes 15 to 20 minutes instead of two hours",
        "Apply judgment to each flagged issue: accept, push back, or escalate",
        "Draft the redline using AI assistance, then review before sending",
        "Document AI use per your firm's or company's AI governance policy",
      ]},
      { type: 'h2', text: 'On risk and governance' },
      { type: 'p', text: "The legal profession's instinct to be cautious about AI is appropriate — not because the technology isn't useful, but because the stakes of getting it wrong are high. Teams with clear AI use policies — addressing confidentiality, review requirements, and disclosure — use AI more confidently, not less. Governance enables adoption; the absence of it prevents it." },
      { type: 'callout', text: "The competitive divide in legal is increasingly between those who use AI to recover time for judgment — and those who still spend that time on tasks a model could do in minutes." },
    ],
  },
  'product-ai-discovery': {
    slug: 'product-ai-discovery',
    category: 'Product',
    categoryColor: '#14B8A6',
    title: "The PM's Unfair Advantage: Using AI to Go from User Interview to PRD in Half the Time",
    excerpt: "The best PMs aren't writing better PRDs — they're synthesising discovery faster, spotting patterns earlier, and spending the time they save on the decisions that actually matter.",
    author: 'OpusLearn Team',
    authorRole: 'Editorial',
    date: 'March 24, 2026',
    readTime: '8 min read',
    trackSlug: 'product',
    trackName: 'AI for Product',
    blocks: [
      { type: 'p', text: "In product work, the bottleneck is rarely getting information. It's synthesising it. A week of user interviews generates ten to fifteen hours of recordings, dozens of notes, and hundreds of data points. Turning that into a coherent understanding of user needs — the work that has to happen before good prioritisation can happen — typically takes another one to two weeks. That lag slows everything downstream." },
      { type: 'h2', text: 'What AI changes in the discovery phase' },
      { type: 'p', text: "AI doesn't replace the interviews — the quality of insight still comes from being in the room, asking good follow-up questions, and building the kind of trust that gets people to tell you what they actually think. What AI changes is the time from 'data collected' to 'patterns identified.' Interview transcripts, survey responses, and support ticket data can be synthesised in hours, not weeks." },
      { type: 'h2', text: 'Three specific applications that work' },
      { type: 'bullets', items: [
        "Interview synthesis: feed ten transcripts into an AI tool with the prompt 'identify the top five friction points mentioned, with representative quotes for each.' Compare the AI synthesis to your own reading — where they diverge is often where the most interesting insight lives",
        "PRD first draft: give AI the problem statement, research synthesis, and success metrics. Ask for a draft PRD structure. Use it as a starting point, not a final document",
        "Competitive positioning: give AI your feature set and three competitors' public documentation. Ask for a structured comparison of positioning gaps. Validates or challenges your assumptions in minutes",
      ]},
      { type: 'h2', text: "What doesn't change" },
      { type: 'p', text: "The most important parts of product work are still entirely human. The judgment about which user segment to prioritise. The decision about what to build and what to defer. The narrative that brings engineering and design into a shared understanding of the problem. AI compresses the time you spend on synthesis. It doesn't replace the thinking — it gives you more time for it." },
      { type: 'callout', text: "The PMs pulling ahead aren't the ones using AI to write PRDs. They're the ones using it to think more quickly — so they can spend more time on the decisions that actually determine whether the product wins." },
    ],
  },
  'customer-success-ai-retention': {
    slug: 'customer-success-ai-retention',
    category: 'Customer Success',
    categoryColor: '#DC2626',
    title: "How Our CS Team Cut Churn by 18% Using AI to Spot At-Risk Accounts Earlier",
    excerpt: "We weren't missing the signals — we were drowning in them. AI didn't replace our CSMs' instincts; it gave them the bandwidth to actually act on what they already knew.",
    author: 'OpusLearn Team',
    authorRole: 'Editorial',
    date: 'March 17, 2026',
    readTime: '6 min read',
    trackSlug: 'customer',
    trackName: 'AI for Customer Success',
    blocks: [
      { type: 'p', text: "Most CS teams aren't missing signals — they're drowning in them. CRM activity, product usage metrics, support ticket volume, NPS scores, billing changes, stakeholder turnover — any one of these can indicate churn risk. The problem is that no individual signal is reliable enough on its own, and most CSMs don't have the bandwidth to monitor all of them for all accounts simultaneously." },
      { type: 'h2', text: 'What we built' },
      { type: 'p', text: "We built a health score model that ingests data from our CRM, product analytics platform, and support system and runs it through an AI model trained to identify early churn indicators. The model doesn't replace CSM judgment — it surfaces the accounts that need attention so CSMs can apply that judgment where it matters most." },
      { type: 'h2', text: "What the AI found that humans were missing" },
      { type: 'p', text: "The most predictive signals weren't the obvious ones. NPS scores and support ticket volume were lagging indicators — by the time those moved, churn risk was already high. The leading indicators were more subtle: declining feature adoption in month two of a contract, a reduction in active users relative to licences purchased, and stakeholder email response latency increasing. The AI identified these patterns across hundreds of accounts simultaneously. A CSM covering forty accounts couldn't do the same." },
      { type: 'h2', text: 'The results' },
      { type: 'p', text: "In the twelve months after deployment, we reduced churn by eighteen percent. The reduction was concentrated in medium-risk accounts. High-risk accounts — where churn was often already decided — didn't move as much. That finding reshaped our intervention strategy: AI-assisted early warning for medium-risk accounts is where the leverage actually lives." },
      { type: 'h2', text: 'What to consider before building your own' },
      { type: 'bullets', items: [
        "Start with the signals you already have reliable data on — don't try to build a perfect model; build a useful one",
        "Involve your CSMs in defining the signals — they know what actually precedes churn in your customer base better than any model built from scratch",
        "Build for triage, not prediction — the value isn't in a churn probability score; it's in a prioritised list of accounts to call this week",
      ]},
      { type: 'callout', text: "The best AI in customer success doesn't make CSMs redundant. It makes them more effective — by giving them the visibility to act on what they already know before it becomes a lost account." },
    ],
  },
  'consulting-ai-research': {
    slug: 'consulting-ai-research',
    category: 'Consulting',
    categoryColor: '#0EA5E9',
    title: 'From 3 Days to 4 Hours: How AI Is Compressing the Research Phase of Strategy Work',
    excerpt: "The insight hasn't changed — the partner still has to think. But the desk research that used to burn an analyst's week now takes an afternoon. Here's what that changes.",
    author: 'OpusLearn Team',
    authorRole: 'Editorial',
    date: 'March 10, 2026',
    readTime: '9 min read',
    trackSlug: 'consulting',
    trackName: 'AI for Consulting',
    blocks: [
      { type: 'p', text: "Every strategy engagement starts the same way: three to five days of desk research before a single piece of original thinking can happen. Industry landscape, competitive positioning, financial benchmarking, regulatory context, case studies. It's necessary. It's important. And it used to burn a full week of analyst time before the senior team could even frame the problem." },
      { type: 'h2', text: 'What changed' },
      { type: 'p', text: "AI tools can now complete first-pass desk research in four to eight hours that previously took three days. The output isn't perfect — it requires review, triangulation against primary sources, and judgment about what's reliable — but the structural compression is real and it has materially changed what a team of five can accomplish in a two-week engagement." },
      { type: 'h2', text: 'The new workflow' },
      { type: 'p', text: "Research in a modern consulting context now typically has three phases. First, AI-assisted synthesis: give the model the question, the scope, and the constraints. It produces a structured first-pass landscape. Second, gap analysis: review what the AI found, identify what's missing or uncertain, and prioritise the primary sources that need verification. Third, human synthesis: the insight layer — connecting the dots, identifying the counterintuitive finding, building the narrative — remains entirely human." },
      { type: 'h2', text: 'What this means for analyst development' },
      { type: 'p', text: "The legitimate concern is what happens to analysts who used to develop judgment through the research grind. The research itself wasn't the point — the discipline of reading closely, finding the interesting signal in a mass of data, and synthesising under time pressure was. That skill needs to be developed deliberately now, not assumed to happen as a by-product of research tasks." },
      { type: 'h2', text: 'The quality question' },
      { type: 'p', text: "Is AI research as good as analyst research? For factual synthesis and landscape mapping: often comparable, sometimes better. For primary source triangulation, nuanced interpretation, and identifying what's missing: worse, and probably always will be. The most effective teams are clear-eyed about which parts of the research question fall into each category." },
      { type: 'callout', text: "The competitive implication is structural: a team that has integrated AI into its research workflow can outbid on engagements, deliver faster, or invest the recovered time into more original primary research. The question isn't whether to adopt — it's whether the speed advantage is passed to clients or retained as margin." },
    ],
  },
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = POSTS[slug]
  if (!post) return { title: 'Post not found' }
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      authors: [post.author],
      publishedTime: post.date,
    },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = POSTS[slug]
  if (!post) notFound()

  return (
    <main style={{ background: PAPER, minHeight: '100vh' }}>
      <GrainOverlay />
      <EditorialNav active="blog" />

      {/* Article */}
      <div className="max-w-2xl mx-auto px-6 pt-36 pb-12">
        {/* Back */}
        <Link href="/blog"
          className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.14em] mb-10 transition-opacity hover:opacity-60"
          style={{ color: INK_FAINT, fontFamily: MONO }}>
          <ArrowLeft size={13} /> Back to blog
        </Link>

        {/* Header */}
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.16em] px-2.5 py-1"
              style={{ border: `1px solid ${RULE}`, color: INK_SOFT, borderRadius: 4, fontFamily: MONO }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: post.categoryColor }} />
              {post.category}
            </span>
          </div>
          <h1 className="mb-6"
            style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 'clamp(2rem, 4.5vw, 3rem)', lineHeight: 1.1, letterSpacing: '-0.025em', color: INK }}>
            {post.title}
          </h1>
          <p className="text-lg leading-relaxed mb-8" style={{ color: INK_SOFT, fontFamily: SANS }}>
            {post.excerpt}
          </p>
          <div className="flex items-center gap-4 pb-8" style={{ borderBottom: `1px solid ${RULE}` }}>
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white"
              style={{ background: COBALT }}>
              {post.author.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold" style={{ color: INK, fontFamily: SANS }}>{post.author}</p>
              <p className="text-xs" style={{ color: INK_FAINT, fontFamily: SANS }}>{post.authorRole}</p>
            </div>
            <div className="flex items-center gap-4 text-[11px] uppercase tracking-[0.12em]" style={{ color: INK_FAINT, fontFamily: MONO }}>
              <span>{post.date}</span>
              <span className="flex items-center gap-1"><Clock size={11} /> {post.readTime}</span>
            </div>
          </div>
        </header>

        {/* Body */}
        <article className="space-y-6">
          {post.blocks.map((block, i) => {
            if (block.type === 'h2') {
              return (
                <h2 key={i} className="pt-4"
                  style={{ fontFamily: SERIF, fontWeight: 500, fontSize: '1.5rem', letterSpacing: '-0.015em', color: INK }}>
                  {block.text}
                </h2>
              )
            }
            if (block.type === 'p') {
              return (
                <p key={i} className="text-[1.05rem]" style={{ color: INK_SOFT, fontFamily: SANS, lineHeight: 1.8 }}>
                  {block.text}
                </p>
              )
            }
            if (block.type === 'bullets') {
              return (
                <ul key={i} className="space-y-3 pl-2">
                  {block.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3 text-[1.05rem] leading-relaxed" style={{ color: INK_SOFT, fontFamily: SANS }}>
                      <span className="mt-2.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: post.categoryColor }} />
                      {item}
                    </li>
                  ))}
                </ul>
              )
            }
            if (block.type === 'callout') {
              return (
                <div key={i} className="px-6 py-5 my-8"
                  style={{ background: 'rgba(36,64,216,0.06)', borderLeft: `3px solid ${COBALT}`, borderRadius: 6 }}>
                  <p className="text-lg italic leading-relaxed" style={{ color: INK, fontFamily: SERIF }}>
                    {block.text}
                  </p>
                </div>
              )
            }
            return null
          })}
        </article>

        {/* CTA */}
        <div className="mt-16 p-8 text-center"
          style={{ background: COBALT, borderRadius: 10, boxShadow: '0 20px 48px rgba(36,64,216,0.18)' }}>
          <p className="text-[11px] uppercase tracking-[0.18em] mb-3" style={{ color: 'rgba(255,255,255,0.6)', fontFamily: MONO }}>
            Ready to apply this?
          </p>
          <h3 className="text-2xl text-white mb-3" style={{ fontFamily: SERIF, fontWeight: 500, letterSpacing: '-0.02em' }}>{post.trackName} Track</h3>
          <p className="text-sm mb-6 max-w-md mx-auto leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)', fontFamily: SANS }}>
            Go from reading about AI to using it in your daily work — with role-specific lessons built around your actual job.
          </p>
          <Link
            href={`/tracks/${post.trackSlug}`}
            className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-sm transition-opacity hover:opacity-90"
            style={{ background: '#FFFFFF', color: COBALT_TX, borderRadius: 3, fontFamily: SANS }}>
            View track <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      <EditorialFooter />
    </main>
  )
}
