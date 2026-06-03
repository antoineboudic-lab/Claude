import type { SubRoleLessons } from "./types"

export const customerSubRoles: SubRoleLessons = {
  "csm": {
    title: "AI for Customer Success Managers",
    description: "Handle more accounts at a higher standard without burning out — using AI to draft onboarding plans, prepare QBRs, monitor health signals, and build the personal toolkit that makes you a CSM at scale.",
    lessons: [
      {
        id: "customer-csm-l1",
        title: "AI for CSMs: Do More for More Accounts Without Burning Out",
        duration: 17,
        description: "Understand where AI fits in the CSM role, which high-volume tasks it reduces from hours to minutes, and how to start building a personal AI workflow without losing the human touch that drives retention.",
        content: `## The CSM Bandwidth Problem

Customer Success Managers are asked to deliver high-touch experiences at scale. The average CSM carries 30–80 accounts depending on the segment. The manual work required to do this well — personalised onboarding plans, health monitoring, QBR preparation, follow-up emails, renewal tracking — is simply too high to execute consistently across a large book of business. AI directly attacks this problem.

## Where AI Saves CSMs the Most Time

**Communication drafting.** Follow-up emails, check-in messages, escalation notifications, and renewal outreach are high-frequency but low-cognitive-load tasks. AI drafts them; you personalise and send.

**Onboarding plan creation.** Instead of building a custom onboarding plan from a template every time, AI generates a first draft based on the customer's use case, team size, and goals.

**QBR preparation.** Pulling together account data, success milestones, usage highlights, and renewal context into a coherent QBR deck is one of the most time-consuming CSM tasks. AI can produce the narrative framework in minutes.

**Meeting summaries.** After a customer call, AI can convert your bullet notes into a structured account note, follow-up action list, and internal update.

## The CSM AI Starter Prompt

\`\`\`
You are a Customer Success Manager at a B2B SaaS company. Your customer is:
- Company: [name and industry]
- Tier: [SMB/Mid-Market/Enterprise]
- Primary use case: [how they use the product]
- Current health status: [green/yellow/red and why]
- Key contacts: [names and roles]
- Upcoming milestone: [renewal date, QBR, onboarding step]

Task: [what you need — e.g., draft a check-in email, prepare a QBR agenda,
write an onboarding plan for the first 30 days]
\`\`\`

## What AI Cannot Replace in CS

**Relationship trust.** The reason customers renew with you — not the product, but you — is built through genuine human interaction: listening, remembering, responding when things go wrong. AI cannot build that.

**Reading the room.** The tone of a customer's voice on a call, the hesitation before answering a question about expansion, the tension in a reply email — these signals require human perception and contextual knowledge.

**Escalation judgment.** Deciding when to escalate, how hard to push, and when to involve leadership is a judgment call that depends on context AI doesn't have.`,
        keyTakeaways: [
          "AI addresses the CSM bandwidth problem by reducing the production time of high-frequency tasks: emails, onboarding plans, QBR prep, and meeting notes",
          "The CSM starter prompt (customer context + task) produces personalised first drafts that you edit rather than create from scratch",
          "Relationship trust, reading the room, and escalation judgment are irreplaceably human — AI handles the production work around them",
          "Start with one recurring high-volume task this week, track time saved, and use what you edit to improve your prompt template",
        ],
        exercise: {
          title: "CSM Workflow Audit",
          description: "Identify the three highest-volume, most time-consuming recurring CSM tasks in your week and design an AI workflow for each.",
          steps: [
            "List your ten most time-consuming recurring tasks from the past two weeks",
            "Score each on: (1) how much is drafting vs. relationship judgment, (2) how often it repeats, (3) how similar each instance is to the last",
            "Identify your top three AI candidates from the list",
            "For your top candidate, write a starter prompt using the CSM prompt template and run it in Claude",
            "Note what you had to edit in the output — that edit list is your prompt improvement backlog",
          ],
          tool: "Claude",
        },
        quiz: [
          {
            question: "Which CSM task type is the highest-leverage candidate for AI assistance?",
            options: [
              "Deciding whether to escalate a customer issue to the VP of CS",
              "Reading the emotional tone of a customer during a video call",
              "Drafting high-frequency, repetitive communications like check-in emails and follow-up notes",
              "Building trust with a new executive sponsor at a key account",
            ],
            correct: 2,
            explanation: "High-frequency, repetitive drafting tasks (emails, notes, summaries) have a consistent structure and low contextual complexity — exactly where AI produces useful first drafts quickly. Escalation judgment and relationship building require human perception and cannot be automated.",
          },
          {
            question: "A CSM uses AI to draft a check-in email for a yellow-health account. What is the most important editing step before sending?",
            options: [
              "Making it longer to demonstrate effort",
              "Adding the customer's name in the subject line",
              "Personalising it with specific recent events, conversations, or details that only you know from the relationship",
              "Removing any mention of product features",
            ],
            correct: 2,
            explanation: "AI produces a structurally sound draft but lacks the relationship-specific detail that makes an email feel genuinely personal. Adding concrete references to recent conversations, specific goals the customer mentioned, or their latest usage milestone is what elevates the AI draft.",
          },
          {
            question: "What does 'reading the room' mean in a CS context, and why can't AI do it?",
            options: [
              "Reading the customer's CRM notes before a call — AI can do this",
              "Interpreting tone, hesitation, body language, and subtle signals during live customer interactions — which requires human perception and relational context",
              "Reviewing the customer's NPS score before a QBR — AI can do this",
              "Identifying the customer's decision-maker from LinkedIn — AI can assist with this",
            ],
            correct: 1,
            explanation: "Reading the room means interpreting real-time human signals — the pause before answering, the shift in tone, the unspoken tension — that require human presence and relational history. No AI tool currently processes these signals during a live customer call.",
          },
        ],
        applyThisWeek: {
          action: "Use AI to draft your next five check-in or follow-up emails and track how much time you save versus writing from scratch",
          promptTemplate: "You are a CSM at a B2B SaaS company. Customer: [name, industry, tier]. Use case: [how they use the product]. Health status: [green/yellow/red, brief reason]. Last interaction: [date and what was discussed]. Upcoming milestone: [renewal date or next step]. Draft a [check-in email / follow-up note / QBR agenda request] that is warm, professional, and specific to this customer's situation.",
          tool: "Claude",
        },
      },
      {
        id: "customer-csm-l2",
        title: "Onboarding Plan Design and Customer Communication with AI",
        duration: 20,
        description: "Use AI to build personalised onboarding plans, draft customer-facing communications across the onboarding journey, and reduce time-to-value for new customers without sacrificing the engagement quality that drives activation.",
        content: `## Why Onboarding Is the Highest-Stakes CS Moment

Time-to-value (TTV) is the most predictive metric in the early customer lifecycle. Customers who reach their first meaningful outcome quickly are significantly more likely to expand and renew. Customers who stall in onboarding churn before you have a chance to recover them. AI lets you invest more energy in the conversations that drive TTV while handling the planning and communication scaffolding automatically.

## The Onboarding Plan Prompt

\`\`\`
You are a Customer Success Manager onboarding a new customer.

Customer context:
- Company: [name], [industry], [company size]
- Product tier: [SMB/Mid-Market/Enterprise]
- Primary use case: [specific workflow or problem they purchased to solve]
- Team adopting the product: [who will use it, their roles, estimated number of users]
- Key success metric: [what the customer defined as success in the sales process]
- Existing tools this integrates with: [relevant integrations]
- Agreed go-live date: [date]

Design a 30-60-90 day onboarding plan:
- Day 1-30: Setup, core activation, first value milestone
- Day 31-60: Deeper feature adoption, team enablement, early wins documented
- Day 61-90: Full adoption, success metric review, expansion conversation readiness
For each phase: 3–4 milestones, responsible party (CSM vs. customer), and a success
indicator that confirms the phase is complete.
\`\`\`

## Onboarding Communication Sequences

AI can generate the full onboarding email sequence so you're never behind on touchpoints:

\`\`\`
Generate a 6-email onboarding communication sequence for a new customer going live in 2 weeks.
Customer context: [paste key details].
Emails to produce:
1. Pre-go-live welcome and what to expect (send: day before go-live)
2. Go-live day kickoff (send: day 0)
3. First check-in (send: day 7)
4. Early win acknowledgement or friction flag (send: day 14)
5. 30-day milestone review prompt (send: day 28)
6. Expansion readiness signal (send: day 45)
For each email: subject line, 150-word body, and one clear CTA.
\`\`\`

## Handling Onboarding Friction

When a customer is stalling, AI helps you diagnose and respond:

\`\`\`
My customer is stalling in onboarding: they haven't completed setup after 3 weeks.
Context: [company size, use case, what they've done so far, what's blocking them].
Draft:
1. A re-engagement email with a specific offer (troubleshooting call, simplified
   getting-started resource, stakeholder escalation option)
2. Three questions to ask in the follow-up call to diagnose the root blocker
3. An internal note for the account summarising the risk and next action
\`\`\`

## Measuring Onboarding Success

Define clear indicators for each phase so "onboarding complete" means something:
- **Phase 1 complete:** First login by >50% of intended users, core workflow executed once
- **Phase 2 complete:** Weekly active usage across primary use case, first internal CS champion identified
- **Phase 3 complete:** Customer-defined success metric measured and shared, expansion conversation initiated`,
        keyTakeaways: [
          "Time-to-value is the most predictive metric in the early customer lifecycle — AI helps you protect it by reducing onboarding planning time",
          "The 30-60-90 day onboarding plan prompt produces a personalised plan with milestones, owners, and success indicators in under 5 minutes",
          "Generate the full onboarding communication sequence upfront so no touchpoint is missed when your book of business grows",
          "When a customer stalls, use AI to draft a re-engagement email, prepare diagnostic questions, and write the internal risk note simultaneously",
        ],
        exercise: {
          title: "Onboarding Plan Sprint",
          description: "Build a complete AI-generated onboarding plan and communication sequence for a new or recently onboarded customer.",
          steps: [
            "Select a customer currently in onboarding or a new one coming up in the next two weeks",
            "Run the 30-60-90 day onboarding plan prompt with full customer context",
            "Generate the 6-email communication sequence using the sequence prompt",
            "Review both outputs against what you know about this customer — add specifics, adjust tone, correct anything AI got wrong about their situation",
            "Share the plan with the customer and track whether milestones are hit on schedule",
          ],
          tool: "Claude",
        },
        quiz: [
          {
            question: "Why is time-to-value (TTV) the most critical metric during onboarding?",
            options: [
              "Because it determines the contract length for the next renewal",
              "Because customers who reach their first meaningful outcome quickly are significantly more likely to expand and renew",
              "Because TTV is the primary metric in CS OKRs",
              "Because slow onboarding increases support ticket volume",
            ],
            correct: 1,
            explanation: "TTV predicts the customer's early experience of the product's value. Customers who experience value quickly stay; those who stall in onboarding churn before the relationship can recover. Protecting TTV is the most important onboarding outcome.",
          },
          {
            question: "What is the most important step after generating a customer onboarding plan with AI?",
            options: [
              "Sending it to the customer immediately — AI plans are accurate and complete",
              "Filing it in the CRM without further editing",
              "Reviewing it for accuracy and adding customer-specific context that AI didn't have access to",
              "Getting the plan approved by the CS Ops team before sharing",
            ],
            correct: 2,
            explanation: "AI generates a strong structural plan but doesn't know your customer's personality, internal politics, specific blockers, or the commitments made during the sales process. That context makes the difference between a generic plan and one the customer actually follows.",
          },
          {
            question: "A customer hasn't completed setup after three weeks. What is the best use of AI in this situation?",
            options: [
              "Use AI to automatically send an escalation to the customer's executive team",
              "Use AI to draft a re-engagement email, prepare diagnostic call questions, and write an internal risk note — all at once",
              "Use AI to mark the account as churned in the CRM",
              "Use AI to generate a list of replacement customers to prioritise",
            ],
            correct: 1,
            explanation: "When a customer stalls, speed of response and the quality of the re-engagement matter. AI can produce all three artefacts (re-engagement email, diagnostic questions, internal note) in one session, letting you act immediately rather than spending an hour preparing.",
          },
        ],
        applyThisWeek: {
          action: "Generate a 30-60-90 day onboarding plan and 6-email communication sequence for a new customer using AI",
          promptTemplate: "Design a 30-60-90 day onboarding plan for: Company [name], [industry], [size]. Use case: [workflow]. Success metric: [what customer defined as success]. Go-live: [date]. For each phase (Day 1–30, 31–60, 61–90): 3–4 milestones, who owns each (CSM or customer), and the success indicator that confirms the phase is complete. Then generate a 6-email touchpoint sequence with subject lines, 150-word bodies, and one CTA per email.",
          tool: "Claude",
        },
      },
      {
        id: "customer-csm-l3",
        title: "QBR Preparation, Health Monitoring, and Renewal Readiness with AI",
        duration: 19,
        description: "Use AI to prepare compelling Quarterly Business Reviews, maintain proactive health monitoring across your book of business, and build the renewal readiness signals that let you walk into every renewal conversation in a position of strength.",
        content: `## The QBR Preparation Problem

A well-executed QBR is one of the most powerful retention and expansion tools in CS. But preparation is genuinely time-consuming: pulling usage data, identifying milestones, connecting product usage to customer-stated goals, and building a narrative that justifies renewal and seeds expansion. AI compresses this from a half-day task to under an hour.

## The QBR Preparation Prompt

\`\`\`
You are a CSM preparing a Quarterly Business Review for an important customer.

Account context:
- Customer: [name, industry, tier]
- Contract value: [ACV]
- Product in use: [which modules or features]
- Key contacts attending QBR: [names, roles, decision authority]
- Customer's stated goals at the start of the period: [what they wanted to achieve]
- What was accomplished this quarter: [usage highlights, milestones, outcomes delivered]
- Current health score: [score and trend]
- Renewal date: [date]
- Expansion opportunity: [any upsell or cross-sell potential]

Build a QBR agenda and talking points:
1. Opening: what success looks like for this meeting
2. Progress against goals: outcomes delivered vs. what was committed
3. Usage and adoption highlights: 3 data points that tell a positive story
4. Looking ahead: goals and initiatives for the next quarter
5. Renewal and expansion: how to frame the renewal conversation
6. Close: action items and next steps

Include 2–3 specific questions to draw the customer into the conversation at each stage.
\`\`\`

## Health Monitoring with AI

Use AI to triage and synthesise health signals across your book of business:

\`\`\`
Here is a summary of my book of business health data: [paste account list with
health scores, last contact date, usage trend, and renewal date].
Identify:
1. The 3 accounts most at risk of churn in the next 90 days and why
2. The 3 accounts most ready for an expansion conversation and what signals suggest it
3. Accounts where I haven't had meaningful contact in 60+ days and which to prioritise
4. The highest-leverage action I could take this week across my portfolio
\`\`\`

## Building Renewal Readiness

Renewal readiness is built 90 days before the renewal date, not in the final month:

\`\`\`
My customer's renewal is in 90 days. Current health: [status]. Here is what
I know about their sentiment and key stakeholders: [describe].
Build a 90-day renewal readiness plan:
- Actions in Days 1–30 to shore up health or accelerate adoption
- The success narrative to build for the renewal conversation (outcomes + ROI)
- Stakeholder engagement plan: who to reach and what message for each
- Early warning signals to watch for that would indicate the renewal is at risk
- Objections likely to arise and how to address each
\`\`\``,
        keyTakeaways: [
          "AI compresses QBR preparation from a half-day task to under an hour — freeing time for the customer conversation itself",
          "A health monitoring synthesis prompt across your full book of business surfaces the highest-priority actions in one pass",
          "Renewal readiness is built 90 days out, not in the final month — AI generates the proactive plan you need to start early",
          "Include AI-generated questions in your QBR talking points to drive customer engagement — the best QBRs are conversations, not presentations",
        ],
        exercise: {
          title: "QBR Prep in 45 Minutes",
          description: "Prepare a complete QBR for an upcoming customer meeting using AI — and track how long it takes versus your previous approach.",
          steps: [
            "Select an upcoming QBR or renewal conversation in the next 4 weeks",
            "Gather the input data: account metrics, milestones achieved, customer goals, renewal date, expansion potential",
            "Run the QBR preparation prompt with full account context",
            "Review the agenda and talking points — add specific examples, adjust the narrative to match your relationship style, add any sensitive context",
            "Note how long this took versus your previous QBR prep process and what you'd improve in the prompt next time",
          ],
          tool: "Claude",
        },
        quiz: [
          {
            question: "When should a CSM start building renewal readiness for an account?",
            options: [
              "In the final 30 days before renewal — when the customer is focused on the decision",
              "At the 60-day mark — enough time to address concerns but not too early",
              "90 days before renewal — early enough to address health issues and build the success narrative",
              "Only after the customer initiates the renewal conversation",
            ],
            correct: 2,
            explanation: "Renewals won 90 days out are won because the CSM built the success narrative, addressed health issues, and aligned stakeholders proactively. Renewals that start at 30 days are often reactive — responding to risk rather than reinforcing value.",
          },
          {
            question: "What is the most valuable section of an AI-generated QBR agenda for driving the renewal conversation?",
            options: [
              "Product roadmap preview — it shows what's coming and builds anticipation",
              "Usage statistics table — concrete data on how much the customer uses the product",
              "Progress against the customer's stated goals — connecting product usage to the outcomes they bought for",
              "Support ticket resolution history — demonstrating responsive service",
            ],
            correct: 2,
            explanation: "Customers renew because they believe the product delivers value toward their stated goals. Connecting usage data to the outcomes they cared about — in their language — is the most compelling renewal argument and the hardest for a competitor to counter.",
          },
          {
            question: "What should a health monitoring AI prompt across a book of business identify first?",
            options: [
              "The accounts with the highest contract value",
              "Accounts where the CSM has sent the most emails this quarter",
              "Accounts most at risk of churn in the next 90 days and the signals driving that risk",
              "Accounts that have opened the most product features",
            ],
            correct: 2,
            explanation: "The most urgent priority in health monitoring is identifying churn risk early enough to intervene. High-value accounts with positive trends can wait; at-risk accounts need immediate attention before the window to recover closes.",
          },
        ],
        applyThisWeek: {
          action: "Use AI to prepare your next QBR or run a health monitoring triage across your book of business",
          promptTemplate: "I'm preparing a QBR for [customer name, industry, tier]. Contract value: [ACV]. Renewal: [date]. Goals stated at period start: [goals]. What was accomplished: [milestones and usage highlights]. Health score: [score/trend]. Expansion opportunity: [describe]. Build a QBR agenda with talking points for each section and 2–3 engagement questions per section to draw the customer into a conversation rather than a presentation.",
          tool: "Claude",
        },
      },
      {
        id: "customer-csm-l4",
        title: "Building Your CSM AI Toolkit and Personal Workflow",
        duration: 16,
        description: "Build a personal AI system that makes you consistently faster and more effective across your entire book of business — with reusable prompt templates, account-level AI routines, and a daily workflow that compounds over time.",
        content: `## From Ad Hoc AI Use to a Personal System

Most CSMs start using AI reactively — when they need to write something fast. The next level is building a personal system: a prompt library, a set of account templates, and a daily AI routine that applies consistently across every account without requiring effort to remember.

## Building Your Prompt Library

A prompt library is a personal collection of tested, reusable prompts for every recurring CSM task. Start with ten:

1. Check-in email (green health)
2. Check-in email (yellow/red health)
3. Onboarding welcome email
4. QBR agenda and talking points
5. Escalation notification (internal)
6. Executive stakeholder update
7. Renewal outreach email
8. Expansion conversation opener
9. Meeting summary and follow-up action list
10. Churn risk internal alert

For each, include the context variables as placeholders so you can fill them in quickly. Keep your library in a Notion page, Google Doc, or Obsidian note that you can access from anywhere.

## The Daily AI Routine

\`\`\`
Morning CSM AI review — 10 minutes:
Accounts to touch today: [paste 3–5 account names with brief context].
For each account, generate:
- A one-sentence status summary (what's happening with this account right now)
- The highest-priority action I should take today
- A suggested communication if contact is due
Output as a prioritised action list I can work through this morning.
\`\`\`

## Account Summary Cards

Before every customer call, generate an account summary card:

\`\`\`
Generate a pre-call brief for my customer call in 30 minutes.
Account: [name]. Last interaction: [date and summary]. Current health: [status].
Recent product usage: [any notable activity or gaps]. Open action items: [list].
Upcoming milestones: [renewal, QBR, feature launch].
In 5 bullet points: what matters most going into this call, and one thing
I should confirm or move forward during the conversation.
\`\`\`

## Sharing Your Toolkit With the Team

A CSM's personal AI system becomes more valuable when shared. Your best prompts — the ones you've iterated and proven — should be in your team's shared resource library. This is how AI capability compounds across the CS organisation:

- Monthly "best prompt" sharing sessions
- Team prompt library in your CS wiki
- Onboarding new CSMs with your prompt templates from day one

The CSMs who invest in building and sharing their toolkit will define the standard of CS execution in their organisation.`,
        keyTakeaways: [
          "A personal prompt library with ten reusable templates for recurring CSM tasks transforms AI from ad hoc to systematic",
          "A daily 10-minute AI morning review across accounts produces a prioritised action list that keeps your entire book of business moving",
          "Pre-call account summary cards prepare you for every customer conversation in under 2 minutes",
          "Sharing your best prompts with the team compounds your individual investment — it raises the CS standard for everyone",
        ],
        exercise: {
          title: "CSM Prompt Library Build",
          description: "Build and test your personal CSM prompt library with at least six reusable templates.",
          steps: [
            "List the ten most common communication or planning tasks you do for customers each month",
            "For each task, write a prompt template with [placeholder] variables for account-specific context",
            "Test each template on a real account this week — run it in Claude and evaluate the output quality",
            "Iterate on the two or three templates that produced the weakest output — refine the context variables and instruction specificity",
            "Share your three best-performing templates in your team's CS channel or wiki with a note on what makes each work",
          ],
          tool: "Claude",
        },
        quiz: [
          {
            question: "What is the main advantage of a personal prompt library over ad hoc AI use?",
            options: [
              "It allows you to use AI without internet access",
              "It eliminates the need to review AI-generated outputs before sending",
              "It makes AI use consistent, fast, and improving over time — reducing the effort to get good outputs for every recurring task",
              "It prevents other CSMs from using the same prompts",
            ],
            correct: 2,
            explanation: "Ad hoc AI use produces inconsistent results because you rewrite the prompt each time. A tested prompt library applies consistent, proven context to every recurring task — so output quality is reliable and improves as you iterate on the templates.",
          },
          {
            question: "What should a pre-call account summary card include to be most useful?",
            options: [
              "A complete history of all customer interactions since day one",
              "Only the customer's current NPS score",
              "Last interaction, current health, recent usage patterns, open action items, upcoming milestones, and one priority for this call",
              "A list of all features the customer has not yet activated",
            ],
            correct: 2,
            explanation: "A pre-call card is a 2-minute preparation tool, not a comprehensive account history. The right elements surface the most relevant context for this specific call — what happened last, where the account stands, and what needs to move forward today.",
          },
          {
            question: "Why should CSMs share their best prompts with the team rather than keeping them personal?",
            options: [
              "To reduce their own workload by having others maintain the templates",
              "Because team prompt libraries are a compliance requirement in most CS organisations",
              "Shared prompts compound the AI investment — raising the execution standard across the whole CS team and benefiting from collective iteration",
              "To demonstrate AI expertise and visibility in the organisation",
            ],
            correct: 2,
            explanation: "Your prompt investment multiplies when shared. Ten CSMs each iterating on a shared template improve it faster than one CSM working alone. The team's collective AI capability — and therefore customer experience quality — rises as a result.",
          },
        ],
        applyThisWeek: {
          action: "Build your personal CSM prompt library with at least six templates and use the daily morning review prompt every day this week",
          promptTemplate: "Morning CSM review. Accounts to touch today: [paste 3–5 accounts with brief context — health status, last contact, upcoming milestone]. For each account: (1) one-sentence status summary, (2) highest-priority action I should take today, (3) suggested communication if contact is due. Output as a prioritised action list ordered by urgency.",
          tool: "Claude",
        },
      },
    ],
  },

  "cs-ops": {
    title: "AI for CS Operations",
    description: "Use AI to design better health scores, build scalable playbooks, automate reporting, and give your CS organisation the analytical infrastructure it needs to operate at scale without proportional headcount growth.",
    lessons: [
      {
        id: "customer-cs-ops-l1",
        title: "AI for CS Operations: The Engine Behind a Scalable CS Function",
        duration: 17,
        description: "Understand where AI transforms CS Ops work — from health score design and tooling intelligence to playbook creation and metrics reporting — and how to build an AI-enabled Ops function that scales ahead of the business.",
        content: `## What CS Operations Actually Does

CS Ops is the operating system of the Customer Success organisation. It designs the playbooks that CSMs execute, maintains the tools and data that CSMs rely on, produces the reporting that leadership uses to make decisions, and builds the systems that allow CS to scale without linear headcount growth. AI accelerates all of these functions.

## Where AI Changes CS Ops Work

**Health score design and analysis.** AI can help you identify which data signals correlate most strongly with churn or expansion — informing a more accurate health score model.

**Playbook design.** AI can generate complete, structured playbooks for every CS motion (onboarding, risk mitigation, QBR, renewal, expansion) in a fraction of the time a human team would require.

**Data synthesis and reporting.** AI can convert raw CS metrics into executive-ready narratives, identify anomalies in cohort or segment data, and generate the "so what" layer that goes beyond tables and charts.

**Process documentation.** AI can turn process notes and meeting discussions into formal SOPs, training guides, and enablement content.

**Tooling intelligence.** AI can help you analyse CRM data, interpret health score outputs, and identify patterns across the account portfolio that would take analysts hours to surface manually.

## The CS Ops AI Opportunity

\`\`\`
You are a CS Operations leader. Our CS organisation serves [N] accounts
across [segments]. Our current tech stack: [list key tools — CRM, CS platform,
analytics, communication].
Current challenges:
1. [Challenge 1 — e.g., health scoring is inaccurate or manual]
2. [Challenge 2 — e.g., playbooks are inconsistent across CSMs]
3. [Challenge 3 — e.g., reporting takes too long and is too backward-looking]

For each challenge, suggest:
- Where AI can help most in the next 90 days
- What data or tooling prerequisite is needed before AI can help effectively
- A first experiment to test AI's value in this area
\`\`\`

## The CS Ops AI Investment Ladder

1. **Reporting automation:** AI drafts summaries and narratives from raw data
2. **Playbook generation:** AI drafts playbooks; Ops refines and validates
3. **Health signal analysis:** AI identifies correlations in account data
4. **Predictive insights:** AI surfaces at-risk accounts before human review catches them
5. **Scale automation:** AI handles routine CSM tasks (check-ins, onboarding emails) at scale`,
        keyTakeaways: [
          "CS Ops is the operating system of the CS function — AI accelerates health score design, playbook creation, reporting, and process documentation",
          "The CS Ops AI investment ladder (reporting → playbooks → health analysis → predictive insights → automation) provides a sequenced adoption path",
          "AI requires good data infrastructure to deliver on health and predictive use cases — data quality is a prerequisite, not a byproduct",
          "Start with the reporting and playbook use cases first — they deliver immediate value without requiring advanced data work",
        ],
        exercise: {
          title: "CS Ops AI Opportunity Assessment",
          description: "Identify the three highest-impact AI opportunities for your CS Ops function and design a 90-day adoption plan.",
          steps: [
            "List your five most time-consuming or most error-prone CS Ops processes",
            "For each, score: (1) how much of it is documentation/analysis vs. judgment, (2) how frequently it runs, (3) how much AI could compress the time required",
            "Run the CS Ops AI opportunity prompt with your top three challenges",
            "Identify the prerequisite data or tooling changes needed before each AI use case can work reliably",
            "Design a 90-day sequence: what do you tackle first, second, and third, and why?",
          ],
          tool: "Claude",
        },
        quiz: [
          {
            question: "Which CS Ops function benefits most immediately from AI assistance with the least data infrastructure required?",
            options: [
              "Predictive churn modelling",
              "Health score signal correlation analysis",
              "Playbook generation and process documentation",
              "Automated account segmentation",
            ],
            correct: 2,
            explanation: "Playbook generation and process documentation require good context inputs but not advanced data infrastructure. They can be started immediately. Predictive modelling and health signal analysis require clean, structured data pipelines first.",
          },
          {
            question: "What is the most important prerequisite before deploying AI for health score signal analysis?",
            options: [
              "A minimum of 500 accounts in the portfolio",
              "A clean, structured data set with reliable signals that correspond to actual customer outcomes",
              "Approval from the product team to access usage data",
              "A dedicated data science team to interpret AI output",
            ],
            correct: 1,
            explanation: "AI for health score analysis is only as good as the data it analyses. Incomplete, inconsistent, or poorly labelled input data produces inaccurate health signals — potentially worse than the manual process it replaces.",
          },
          {
            question: "What does 'the CS Ops AI investment ladder' mean in practice?",
            options: [
              "A framework for purchasing progressively more expensive AI tools",
              "A sequenced adoption path from low-complexity AI use cases (reporting) to high-complexity ones (predictive automation)",
              "A headcount reduction plan tied to AI capability milestones",
              "A certification programme for CS Ops professionals learning AI",
            ],
            correct: 1,
            explanation: "The ladder provides a sequenced roadmap: start with high-value, low-prerequisite use cases (reporting, playbooks), build the data infrastructure, then advance to more complex applications (predictive insights, scale automation). Each step builds on the previous one.",
          },
        ],
        applyThisWeek: {
          action: "Run the CS Ops AI opportunity assessment and identify your three highest-leverage AI investments for the next 90 days",
          promptTemplate: "You are a CS Operations leader. Our CS organisation serves [N] accounts across [segments]. Current tech stack: [list tools]. Challenges: (1) [challenge], (2) [challenge], (3) [challenge]. For each challenge: where AI can help most in the next 90 days, what data or tooling prerequisite is needed, and a first experiment to test AI's value here.",
          tool: "Claude",
        },
      },
      {
        id: "customer-cs-ops-l2",
        title: "Health Score Design, Tooling Intelligence, and Data Analysis with AI",
        duration: 20,
        description: "Use AI to design more accurate health scores, surface insights from CS platform data, and build the analytical foundation that lets your CS organisation act on signals rather than react to events.",
        content: `## Health Scores: The Problem With Most Models

Most health scores are built on intuition — "we think usage and support tickets matter" — rather than data-validated correlation with actual outcomes. The result: CSMs trust scores that don't predict churn, ignore signals that do, and lack the framework to improve the model over time. AI can help you build a data-grounded health score and continuously improve it.

## Health Score Design with AI

\`\`\`
You are a CS analytics specialist helping design a customer health score model.
Our product: [describe what it does].
Customer segments: [segment names, ARR range, typical team size].
Data signals available in our CRM and product analytics platform:
- Usage signals: [e.g., DAU/WAU/MAU, feature adoption, login frequency]
- Engagement signals: [e.g., email open rates, support tickets submitted, QBR attendance]
- Financial signals: [e.g., invoice payment timeliness, add-on purchase history]
- Relationship signals: [e.g., NPS, CSAT, executive sponsor presence]

Churn data from the last 12 months: [describe — e.g., X% of churned accounts had Y pattern].

Design a health score model:
1. Recommended signals to include and their relative weighting
2. Signals to exclude (low predictive value or too easily gamed)
3. How to score each signal (threshold definitions for green/yellow/red)
4. How to combine signals into a composite score
5. A validation approach: how to test whether the model predicts churn accurately
\`\`\`

## Analysing CRM and CS Platform Data

\`\`\`
Here is account data from our CS platform for the last quarter:
[paste or describe: health scores by segment, NRR by cohort, churn by health score
band, feature adoption rates, average time-to-first-value].
Analyse this data:
1. Which health score band has the highest churn rate? Is it what you'd expect?
2. Is there a pattern in churn timing (e.g., concentrated at month 3, 6, or 12)?
3. Which customer segment has the best and worst NRR — and what might explain it?
4. What is the single most actionable insight from this data for the CS leadership team?
\`\`\`

## Signal Correlation Analysis

\`\`\`
I want to identify which signals in our data are most predictive of churn.
Here is a summary of churned accounts from the last 12 months: [describe
key attributes — usage levels, health scores at 30/60/90 days pre-churn,
support ticket volume, engagement metrics].
And here is the same summary for accounts that renewed: [describe].
Identify:
1. The 3–5 signals that most clearly differentiate churned vs. renewed accounts
2. How far in advance these signals appeared before the churn event
3. The earliest reliable leading indicator we should be monitoring more closely
\`\`\``,
        keyTakeaways: [
          "Most health scores are built on intuition rather than validated correlation — AI helps design data-grounded models with explicit signal weighting",
          "Signal correlation analysis across churned vs. renewed accounts reveals the leading indicators that appear earliest before a churn event",
          "CS platform data analysis with AI surfaces the 'so what' layer: which health bands predict churn, which segments have NRR problems, and what the single most actionable insight is",
          "A health score model needs a validation approach — test it against historical churn data before relying on it for live decision-making",
        ],
        exercise: {
          title: "Health Score Audit",
          description: "Use AI to evaluate your current health score model and identify the highest-priority improvement.",
          steps: [
            "Document your current health score model: what signals are included, how they're weighted, and how the composite score is calculated",
            "Gather 6–12 months of churn data: what did churned accounts look like in the model in the 90 days before churn?",
            "Run the signal correlation analysis prompt with your churned vs. renewed account data",
            "Compare AI recommendations against your current model — what is your model missing? What is it over-weighting?",
            "Design one specific change to the model and a method to validate whether it improves churn prediction accuracy",
          ],
          tool: "Claude",
        },
        quiz: [
          {
            question: "What is the main weakness of a health score built on intuition rather than data validation?",
            options: [
              "It is too expensive to maintain in the CRM",
              "CSMs can manually override it, reducing its reliability",
              "It may not correlate with actual churn or expansion outcomes — producing false signals that misdirect CS effort",
              "It is too simple for enterprise accounts",
            ],
            correct: 2,
            explanation: "An intuition-based health score may feel right but produce red scores for accounts that renew and green scores for accounts that churn. Without validation against actual outcomes, CSMs can't trust the signal — and a health score that can't be trusted doesn't scale CS effort effectively.",
          },
          {
            question: "Why is identifying the 'earliest reliable leading indicator' of churn the most valuable outcome of signal correlation analysis?",
            options: [
              "Because it allows the CS team to close the account before churn and avoid the cost of intervention",
              "Because the earlier a risk signal appears, the more time the CSM has to intervene and recover the account",
              "Because early indicators are required for CRM automation to function correctly",
              "Because leading indicators are more legally defensible in renewal contract disputes",
            ],
            correct: 1,
            explanation: "The earlier a risk signal appears reliably before churn, the larger the intervention window. A signal that appears 90 days before churn gives the CSM time to recover the account; one that appears 7 days before churn often doesn't.",
          },
          {
            question: "Before deploying a new AI-designed health score model in production, what is the most important step?",
            options: [
              "Getting sign-off from the VP of Sales to ensure alignment",
              "Replacing the existing health score immediately to avoid running parallel systems",
              "Back-testing the model against historical churn data to validate whether it would have predicted actual outcomes",
              "Training all CSMs on the new signal definitions",
            ],
            correct: 2,
            explanation: "A model that performs well on design assumptions may perform poorly on real data. Back-testing against historical outcomes reveals whether the model's predictions would have aligned with actual churn — before CSMs rely on it for live account decisions.",
          },
        ],
        applyThisWeek: {
          action: "Audit your current health score model using AI and identify the most important signal to add or reweight",
          promptTemplate: "I'm evaluating our customer health score model. Current signals and weights: [list]. Churned account patterns in the last 12 months: [describe usage levels, health score at 90/60/30 days pre-churn, engagement signals]. Renewed account patterns: [describe the same]. Identify: (1) the 3–5 signals that most differentiate churned vs. renewed accounts, (2) the earliest leading indicator, (3) one specific change to our current model that would improve churn prediction accuracy.",
          tool: "Claude",
        },
      },
      {
        id: "customer-cs-ops-l3",
        title: "Playbook Design, Process Documentation, and Enablement with AI",
        duration: 18,
        description: "Use AI to build comprehensive CS playbooks, produce clear process documentation, and create the enablement materials that allow your CS team to execute consistently — at any scale.",
        content: `## Why Playbooks Fail in Practice

Most CS playbooks are created once and rarely updated. CSMs treat them as optional references rather than required frameworks. The result: execution inconsistency across the team, lost institutional knowledge when CSMs leave, and no systematic way to improve processes based on what's working. AI can solve all three problems — by making playbook creation faster, iteration easier, and enablement more accessible.

## The CS Playbook Generation Prompt

\`\`\`
You are a CS Operations specialist. Design a comprehensive playbook for the
following CS motion: [choose one: onboarding / risk mitigation / QBR / renewal /
expansion / escalation].

CS organisation context:
- Customer segment: [SMB/Mid-Market/Enterprise]
- Average account ARR: [range]
- CSM team size: [N]
- Key tools: [CRM, CS platform, communication tools]

Playbook structure:
1. Trigger: what event or signal initiates this playbook
2. Owner: who runs this playbook and who supports
3. Timeline: duration and key milestones
4. Step-by-step actions: each step with owner, timing, tool used, and expected output
5. Email/communication templates to use at each step (2–3 touchpoints)
6. Success criteria: how we know the playbook worked
7. Escalation path: when and how to escalate beyond the standard playbook
\`\`\`

## Process Documentation from Notes

CS Ops often needs to document a process that lives in people's heads. AI can convert raw process notes into formal documentation:

\`\`\`
Here are rough notes on how we currently handle [process name]: [paste notes —
can be bullet points, meeting notes, or a verbal description].
Convert these into a formal Standard Operating Procedure (SOP) with:
1. Process name and purpose
2. Scope (who this applies to, when)
3. Prerequisites (what must be in place before starting)
4. Step-by-step instructions with decision points flagged
5. Common errors and how to avoid them
6. Owner and review cadence
Format it clearly enough for a new CSM joining next week to follow without additional guidance.
\`\`\`

## Enablement Content Creation

\`\`\`
I need to create a training module for a new CS motion we're rolling out: [describe motion].
The audience is our CSM team (mix of experience levels, from 6 months to 5 years in CS).
Create:
1. A one-page quick reference card: key steps, key talking points, what to avoid
2. A FAQ list covering the 8 most common questions CSMs will have
3. A practice scenario for role-play training (customer context, their situation, CSM objective)
4. Three common mistakes to discuss in the team training session
\`\`\``,
        keyTakeaways: [
          "AI generates complete CS playbooks with triggers, step-by-step actions, email templates, and success criteria in a single prompt — making iteration much faster",
          "Converting process notes into formal SOPs using AI captures institutional knowledge before it walks out the door when a team member leaves",
          "Enablement content (quick reference cards, FAQs, role-play scenarios) produced with AI reduces new CSM ramp time significantly",
          "Playbooks only improve if they're updated — AI makes iteration fast enough that quarterly playbook reviews become realistic rather than aspirational",
        ],
        exercise: {
          title: "Playbook Rebuild",
          description: "Rebuild or create from scratch one CS playbook using AI and compare it to your current version.",
          steps: [
            "Select one CS motion where your current playbook is outdated, incomplete, or inconsistently followed",
            "Run the playbook generation prompt with full CS organisation context",
            "Review the AI-generated playbook against what your best CSMs actually do in practice — where do they differ?",
            "Add the real-world nuances the AI missed (specific tool names, customer-specific scripts, internal escalation contacts)",
            "Share the updated playbook in your next CSM team meeting and gather feedback on what's still missing",
          ],
          tool: "Claude",
        },
        quiz: [
          {
            question: "What is the most common reason CS playbooks fail to improve team execution consistency?",
            options: [
              "They are too long for CSMs to read",
              "They are created once and rarely updated, so CSMs stop trusting them as current",
              "They require CRM integration to be useful",
              "They are too generic to apply to specific customer segments",
            ],
            correct: 1,
            explanation: "A playbook that isn't updated becomes irrelevant as the product, team, and customer base evolve. CSMs learn which steps no longer apply and start ignoring the whole document. AI makes iteration fast enough that quarterly updates become achievable.",
          },
          {
            question: "What is the primary benefit of converting informal process notes into a formal SOP using AI?",
            options: [
              "It satisfies ISO compliance requirements for CS organisations",
              "It captures institutional knowledge in a documented, transferable format that survives team changes",
              "It eliminates the need for new CSM onboarding sessions",
              "It automatically syncs process steps to the CRM",
            ],
            correct: 1,
            explanation: "Informal process knowledge lives in people's heads and disappears when they leave. Converting it to formal documentation preserves institutional knowledge, enables consistent onboarding, and provides a baseline for continuous improvement.",
          },
          {
            question: "Which enablement artefact is most useful for a new CSM learning a new CS motion?",
            options: [
              "A 40-page comprehensive playbook covering all edge cases",
              "A one-page quick reference card with key steps, talking points, and what to avoid",
              "A recording of a senior CSM's call using the motion",
              "A certification exam about the motion's theoretical background",
            ],
            correct: 1,
            explanation: "New CSMs need immediate, accessible guidance they can reference during a live customer interaction. A one-page quick reference card is scannable in 30 seconds and actionable in the moment — more useful for early adoption than comprehensive documentation.",
          },
        ],
        applyThisWeek: {
          action: "Generate a complete playbook for one CS motion and convert one informal process into a formal SOP using AI",
          promptTemplate: "Design a CS playbook for [motion: onboarding/risk/QBR/renewal/expansion]. Segment: [segment]. CSM team size: [N]. Key tools: [list]. Include: (1) trigger event, (2) owner and support roles, (3) timeline with milestones, (4) step-by-step actions with owner/timing/tool/expected output, (5) 2–3 communication templates, (6) success criteria, (7) escalation path when standard playbook is insufficient.",
          tool: "Claude",
        },
      },
      {
        id: "customer-cs-ops-l4",
        title: "CS Reporting, Metrics, and Insight Generation with AI",
        duration: 16,
        description: "Use AI to transform CS data into executive-ready reports, surface the 'so what' layer from metrics, and build a reporting cadence that gives leadership the insights they need to make faster, better decisions.",
        content: `## The CS Reporting Problem

CS reporting is often high-effort and low-insight. Hours of data pulling produce a dashboard that leadership looks at briefly and then asks the same question every quarter: "What does this actually mean for our churn risk and NRR forecast?" AI can answer that question — turning metrics into narrative, and narrative into prioritised actions.

## The CS Monthly Report Prompt

\`\`\`
You are a CS Operations analyst. Generate a monthly CS performance report narrative.

Key metrics this month:
- NRR: [value] vs. prior month [value] vs. target [value]
- Gross churn: [value] vs. prior month [value]
- Health score distribution: [% green/yellow/red] vs. prior month
- Onboarding completion rate: [value]
- Average time-to-first-value: [days]
- QBRs completed: [value] vs. plan
- Expansion pipeline created: [value]

Write:
1. A 3-bullet executive summary (what happened, what it means, what needs to happen next)
2. A narrative for each metric: trend, driver, and recommended action if off-target
3. The single biggest risk to NRR over the next 90 days based on this data
4. The single biggest opportunity for the CS team to act on this month
Format for a leadership report. Avoid jargon. Be direct about what's concerning.
\`\`\`

## Leading vs. Lagging Indicator Analysis

\`\`\`
Here are our CS metrics for the past 6 months: [paste or describe key monthly data].
Identify:
1. Which metrics are lagging indicators (they tell us what happened) vs. leading
   indicators (they predict what will happen)?
2. Is there a correlation between any leading indicator and our NRR performance
   3 months later?
3. Which metric should we be watching most closely right now to predict NRR
   in Q[next quarter]?
4. What data are we not currently tracking that would improve our predictive ability?
\`\`\`

## Cohort Analysis for CS Insight

\`\`\`
Here is NRR data broken down by customer cohort (onboarding quarter) and segment
for the past 8 quarters: [paste or describe data].
Analyse:
1. Which cohorts are performing best and worst — and is the trend improving?
2. Which customer segment has the highest and lowest NRR — and what might explain it?
3. Is there a pattern in expansion timing (when do customers most often expand)?
4. Based on the cohort trends, what should CS Ops prioritise to improve NRR in the next 2 quarters?
\`\`\`

## Reporting Cadence Design

\`\`\`
Design a CS reporting cadence for our organisation:
- CS team size: [N] CSMs
- Segments served: [list]
- Key stakeholders: CS leadership, CFO, VP Sales
Design:
1. Daily metrics (for CSMs and CS leadership)
2. Weekly CS performance summary (for CS leadership)
3. Monthly executive report (for CFO and VP Sales)
4. Quarterly CS review (board or exec team)
For each report: audience, format, key metrics, and who owns it.
\`\`\``,
        keyTakeaways: [
          "AI transforms CS metrics into a three-bullet executive summary plus per-metric narrative with recommended actions — in under 5 minutes",
          "Leading vs. lagging indicator analysis reveals which metrics to watch now to predict NRR in 90 days — the most actionable insight for CS leadership",
          "Cohort analysis surfaces which customer segments and onboarding classes are driving NRR improvement or drag — informing resource allocation",
          "A structured reporting cadence (daily/weekly/monthly/quarterly) with defined owners and audiences makes reporting systematic rather than reactive",
        ],
        exercise: {
          title: "Monthly CS Report Draft",
          description: "Produce a complete monthly CS performance report using AI and test it with your CS leadership.",
          steps: [
            "Gather last month's CS metrics: NRR, gross churn, health distribution, TTFV, QBR completion, expansion pipeline",
            "Run the monthly report prompt with all available data — use placeholders for metrics you don't have",
            "Review the AI-generated narrative for accuracy and directness — AI often softens bad news; add the honest assessment",
            "Share the draft with your CS leader and ask: does this tell you what you need to know to make a decision?",
            "Use their feedback to refine the prompt template for the following month",
          ],
          tool: "Claude",
        },
        quiz: [
          {
            question: "What is the key difference between a lagging indicator and a leading indicator in CS reporting?",
            options: [
              "Lagging indicators are collected monthly; leading indicators are collected daily",
              "Lagging indicators are owned by CS Ops; leading indicators are owned by individual CSMs",
              "Lagging indicators describe what already happened; leading indicators predict what is likely to happen",
              "Lagging indicators measure churn; leading indicators measure expansion",
            ],
            correct: 2,
            explanation: "Lagging indicators (churn rate, NRR) confirm outcomes after they've occurred. Leading indicators (health score trend, onboarding completion rate, feature adoption) signal what is likely to happen — giving the CS team time to intervene before the outcome is locked.",
          },
          {
            question: "Why should CS Ops produce a three-bullet executive summary at the top of every monthly report?",
            options: [
              "Because executives prefer not to read detailed metrics",
              "Because the three-bullet format is a regulatory requirement for SaaS companies",
              "Because it ensures leadership gets the most important signal — what happened, what it means, and what to do — regardless of whether they read the full report",
              "Because it is easier for AI to generate than a full narrative",
            ],
            correct: 2,
            explanation: "Executives receive many reports. The three-bullet summary ensures the critical information is captured at the top — the trend, its implication for the business, and the recommended action — so decisions can be made even when the full report isn't read in detail.",
          },
          {
            question: "What is the most actionable outcome of a CS cohort analysis?",
            options: [
              "Identifying which cohort generated the most support tickets",
              "Producing a historical record of every customer's NRR contribution",
              "Identifying which customer segments or onboarding periods drive the best and worst NRR — informing where to invest CS resources next",
              "Calculating the average contract value by cohort",
            ],
            correct: 2,
            explanation: "Cohort analysis answers: which customers perform best and why? That answer drives resource allocation decisions — which segments to invest CS effort in, which onboarding processes to improve, and which cohorts need intervention before NRR suffers further.",
          },
        ],
        applyThisWeek: {
          action: "Draft this month's CS performance report using AI and share it with your CS leadership for feedback",
          promptTemplate: "Generate a monthly CS performance report. Metrics this month: NRR [value vs. prior vs. target], gross churn [value], health distribution [% green/yellow/red vs. prior], onboarding completion [%], average TTFV [days], QBRs completed [vs. plan], expansion pipeline [value]. Write: (1) 3-bullet executive summary (what happened, what it means, what's next), (2) narrative per metric with trend, driver, and action if off-target, (3) biggest NRR risk in next 90 days, (4) biggest CS opportunity this month.",
          tool: "Claude",
        },
      },
    ],
  },

  "support": {
    title: "AI for Customer Support",
    description: "Resolve tickets faster, write better responses, build a self-service knowledge base that actually works, and improve support quality systematically — using AI to raise the bar without raising headcount.",
    lessons: [
      {
        id: "customer-support-l1",
        title: "AI for Customer Support: Faster Resolutions, Better Experiences",
        duration: 17,
        description: "Understand where AI transforms customer support work — from first-response drafting to ticket categorisation — and how to integrate it into your existing support workflow without creating new problems.",
        content: `## The Support Speed-Quality Trade-off

Customer support teams are caught between two demands: speed (customers expect fast responses) and quality (bad responses create more tickets, escalations, and churn). AI breaks this trade-off by enabling support agents to respond faster without sacrificing response quality.

## Where AI Changes Support Work

**Response drafting.** AI generates a first-draft response to a support ticket in seconds. The agent reviews, personalises, and sends. What took 5–10 minutes of writing takes 60 seconds of review.

**Ticket categorisation and routing.** AI can classify incoming tickets by type, urgency, and product area — routing them to the right agent or queue automatically.

**Knowledge base retrieval.** Instead of searching for the right article, AI finds the most relevant documentation and surfaces it alongside the ticket for the agent's reference.

**Tone and empathy adjustment.** AI can generate a response and then adjust its tone — making it warmer, more technical, more apologetic — based on the ticket's emotional context.

**Macro and template generation.** AI can draft new response templates for recurring issue types, reducing future ticket handling time.

## The Support Agent AI Prompt

\`\`\`
You are a customer support specialist for [product name].
Ticket: [paste the customer's message]
Context: [any known account context — customer tier, recent interactions, product version]
Tone required: [empathetic / technical / brief / detailed]

Draft a support response that:
1. Acknowledges the issue and shows you understand the impact on the customer
2. Provides a clear, step-by-step resolution or next step
3. Closes with a clear invitation to respond if the issue persists
Keep the response under 200 words unless technical complexity requires more.
\`\`\`

## What AI Cannot Do in Support

**Replace empathy.** AI can write an empathetic sentence. Genuine empathy — the sense that someone actually cares about your frustration — still comes from a human who means it.

**Handle genuinely novel problems.** AI responds based on patterns in training data and knowledge base content. Truly new issues require human judgment and creative problem-solving.

**Make judgment calls on policy exceptions.** Deciding whether to issue a refund, extend a trial, or escalate a case involves business context, relationship history, and authority that AI cannot hold.`,
        keyTakeaways: [
          "AI breaks the speed-quality trade-off in support: agents review and personalise AI-generated drafts in 60 seconds rather than writing from scratch in 5–10 minutes",
          "The support agent prompt (ticket + context + tone) produces a structurally correct response the agent reviews rather than creates",
          "Genuine empathy, novel problem-solving, and policy exception judgment remain irreplaceably human",
          "Start with response drafting — it delivers immediate time savings and is low-risk to implement",
        ],
        exercise: {
          title: "Response Drafting Test",
          description: "Compare AI-drafted responses against manually written ones across five real tickets and measure quality and time.",
          steps: [
            "Select five recent tickets that represent your most common issue types",
            "For each ticket, write your response manually first (as normal), then run the AI drafting prompt",
            "Compare: which response is more accurate? More empathetic? More likely to resolve on first contact?",
            "Track the time taken for each approach",
            "Identify which ticket types produce the best AI drafts — and which require the most human editing — to prioritise where to use AI by default",
          ],
          tool: "Claude",
        },
        quiz: [
          {
            question: "What is the primary benefit of AI-assisted response drafting for support agents?",
            options: [
              "AI responses never require editing — they are sent directly to customers",
              "Agents can respond faster without sacrificing quality, because they review and personalise rather than write from scratch",
              "AI eliminates the need for a support knowledge base",
              "AI responses are always more empathetic than human-written ones",
            ],
            correct: 1,
            explanation: "AI shifts the agent's role from writer to reviewer and editor. A 60-second review of an AI draft is faster and often produces higher-quality output than a 5-minute write from scratch — especially for routine issue types.",
          },
          {
            question: "What is the most important element a support agent should add when personalising an AI-generated response?",
            options: [
              "Their full name and job title",
              "The customer's account number",
              "Specifics from the customer's situation that show the agent actually read and understood their problem",
              "A longer explanation of the resolution steps",
            ],
            correct: 2,
            explanation: "Customers can tell when a response is generic. Adding specific references to what the customer described — their exact situation, the impact they mentioned — transforms a structurally correct AI draft into a genuinely helpful and personalised response.",
          },
          {
            question: "Which support task is least suitable for AI handling without human review?",
            options: [
              "Drafting a response to a common billing question",
              "Suggesting which knowledge base article to include in a reply",
              "Making a policy exception decision (e.g., approving a refund outside standard policy)",
              "Categorising an incoming ticket by product area",
            ],
            correct: 2,
            explanation: "Policy exception decisions require business context, relationship history, and authority that AI cannot hold. They involve judgment calls about company interests, customer relationships, and precedent that must remain with a human decision-maker.",
          },
        ],
        applyThisWeek: {
          action: "Use AI to draft responses to your next 20 support tickets and track the average editing time and first-contact resolution rate",
          promptTemplate: "You are a customer support specialist for [product]. Customer message: [paste ticket]. Customer context: [tier, recent interactions if known]. Tone: [empathetic/technical/brief]. Draft a response that: (1) acknowledges the issue and its impact on the customer, (2) provides a clear step-by-step resolution or next step, (3) closes with an invitation to follow up if needed. Under 200 words unless technical complexity requires more.",
          tool: "Claude",
        },
      },
      {
        id: "customer-support-l2",
        title: "Ticket Triage, Response Drafting, and Resolution Speed with AI",
        duration: 20,
        description: "Build an AI-assisted triage and response workflow that reduces average handle time, improves first-contact resolution, and allows your support team to handle more volume at a consistently high standard.",
        content: `## Why Triage Matters as Much as Response

Slow triage is invisible but expensive. When tickets sit in the wrong queue, or agents spend 5 minutes classifying a ticket before they can start resolving it, resolution time suffers even if the response itself is fast. AI-assisted triage removes this overhead and gets the right ticket to the right agent faster.

## The Triage Classification Prompt

\`\`\`
You are a support triage specialist. Classify the following incoming support ticket:

Ticket: [paste full ticket content]

Classify by:
1. Issue type: [choose from: billing / technical / account access / feature request /
   integration / other]
2. Urgency: [critical — service down / high — significant workflow impact /
   medium — partial impact / low — informational or enhancement]
3. Sentiment: [frustrated / neutral / positive]
4. Likely root cause: [one-line hypothesis]
5. Recommended routing: [tier 1 / tier 2 / billing team / technical specialist / CS escalation]
6. Recommended first response approach: [direct resolution / clarifying question /
   internal investigation needed before response]
\`\`\`

## Tiered Response Drafting

Different urgency levels require different response structures:

**Critical (service down):**
\`\`\`
Ticket: [paste critical ticket]
Draft a Critical Incident Response:
- Immediate acknowledgement with empathy for business impact (2 sentences)
- Current status of what we know and are doing (2–3 sentences)
- What the customer should do right now (1–2 actions)
- ETA for next update (be specific, not vague)
Tone: urgent, empathetic, action-oriented. No corporate language.
\`\`\`

**Standard resolution:**
\`\`\`
Ticket: [paste ticket]
Draft a standard response. Context: [agent's findings or known solution].
Include: acknowledgement, step-by-step resolution, confirmation ask ("Let us know if this resolves the issue").
Under 200 words. Tone: warm and clear.
\`\`\`

## First-Contact Resolution Improvement

AI can help identify why tickets require multiple contacts:

\`\`\`
Here are 20 tickets that required more than 2 interactions to resolve: [paste titles
or descriptions].
Identify:
1. Common patterns in why these tickets couldn't be resolved in one contact
2. Which issue types are most likely to require multiple touches
3. What additional information in the first response would have resolved more of these tickets
4. One change to our response template or triage process that would improve FCR
\`\`\``,
        keyTakeaways: [
          "AI-assisted triage classifies tickets by issue type, urgency, sentiment, and routing in seconds — removing manual classification overhead from agents",
          "Tiered response drafting (critical vs. standard) ensures the tone and structure match the urgency of the ticket",
          "Analysing multi-touch tickets with AI reveals the patterns that prevent first-contact resolution — surfacing process improvements rather than individual performance issues",
          "Average handle time and first-contact resolution rate are the two most important metrics that AI triage and drafting directly improve",
        ],
        exercise: {
          title: "FCR Improvement Analysis",
          description: "Use AI to analyse your multi-touch tickets and identify the single highest-leverage process change to improve first-contact resolution.",
          steps: [
            "Pull the last 20–30 tickets that required three or more interactions to resolve",
            "Summarise each in one line (issue type, what went wrong, how it eventually resolved)",
            "Run the first-contact resolution analysis prompt with all 20–30 summaries",
            "Identify the single change AI recommends that would have the broadest impact",
            "Design a test: implement the change for one week and compare FCR before and after",
          ],
          tool: "Claude",
        },
        quiz: [
          {
            question: "What is the highest-value output of AI-assisted ticket triage?",
            options: [
              "Providing a sentiment score that triggers an escalation",
              "Classifying tickets instantly so agents spend their time resolving rather than categorising",
              "Generating an automated response without agent involvement",
              "Predicting which customers will submit a ticket in the next 30 days",
            ],
            correct: 1,
            explanation: "The primary value of triage automation is speed of routing — getting the ticket to the right agent or queue without the agent spending minutes on classification. This reduces average handle time and allows agents to start resolution work immediately.",
          },
          {
            question: "Why does a critical incident response require a different structure from a standard support response?",
            options: [
              "Critical tickets are handled by a different team and require a different writing style for consistency",
              "Critical incidents have significant business impact — requiring immediate acknowledgement, action status, and a specific ETA to restore customer confidence",
              "Critical tickets are sent to more recipients and must be formally written",
              "The legal team requires formal language in critical incident communications",
            ],
            correct: 1,
            explanation: "When a customer's service is down, they need to know: you know about it, you're working on it, and you'll update them by a specific time. Vague or delayed responses in critical incidents destroy trust. The structure forces these three elements to be explicit.",
          },
          {
            question: "What does analysing multi-touch tickets with AI reveal that standard performance reviews typically miss?",
            options: [
              "Which individual agents have the worst FCR metrics",
              "The systemic patterns in ticket types and information gaps that prevent resolution in one contact",
              "The average customer satisfaction score for each agent",
              "How many tickets were escalated without following the escalation procedure",
            ],
            correct: 1,
            explanation: "Multi-touch analysis reveals process and knowledge gaps — not individual performance problems. If a certain issue type consistently requires 3+ contacts, the fix is a better template, more training content, or a process change — not agent coaching.",
          },
        ],
        applyThisWeek: {
          action: "Run the triage classification prompt on your next 50 incoming tickets and measure the time saved versus manual classification",
          promptTemplate: "Classify this incoming support ticket: [paste ticket]. Classify by: (1) issue type (billing/technical/account access/feature request/integration/other), (2) urgency (critical/high/medium/low), (3) customer sentiment (frustrated/neutral/positive), (4) likely root cause in one line, (5) recommended routing, (6) recommended first response approach (direct resolution/clarifying question/investigation needed first).",
          tool: "Claude",
        },
      },
      {
        id: "customer-support-l3",
        title: "Knowledge Base Creation, Article Writing, and Self-Service with AI",
        duration: 19,
        description: "Use AI to build and maintain a knowledge base that actually deflects tickets — with well-structured articles, clear language, and the coverage to handle your most common support questions without agent intervention.",
        content: `## The Self-Service Gap

Most support knowledge bases are incomplete, out of date, or written for people who already know the answer. When customers can't find what they need, they open a ticket — adding to agent workload for questions that should be self-service. AI helps you close the self-service gap faster than any previous approach by making article creation dramatically faster.

## Article Creation from Tickets

The most reliable knowledge base is built from real support questions. AI can convert resolved tickets into knowledge base articles automatically:

\`\`\`
You are a technical writer for a customer support knowledge base.
Here is a resolved support ticket: [paste ticket conversation — question and resolution].

Convert this into a knowledge base article:
1. Title: clear, searchable, written as the question a customer would search
2. Applies to: [which product version, plan, or user type this applies to]
3. Overview: one-sentence explanation of the issue and when it occurs
4. Step-by-step instructions: numbered, clear, with one action per step
5. What to do if this doesn't resolve the issue (escalation path or alternative)
6. Related articles: [suggest 2–3 topics this article should link to]
Target reading level: clear enough for a non-technical user to follow without help.
\`\`\`

## Gap Analysis: What's Missing From Your Knowledge Base

\`\`\`
Here are the top 30 support tickets by volume from last month: [paste titles or brief
descriptions].
Analyse:
1. Which ticket types have no corresponding knowledge base article?
2. Which ticket types have a knowledge base article but customers still contact support
   (suggesting the article isn't working)?
3. Ranked list of articles to create or update, by potential deflection impact.
\`\`\`

## Improving Existing Articles

\`\`\`
Here is a current knowledge base article: [paste article].
Improve it:
1. Rewrite the title so it matches how customers would actually search for this
2. Add a one-sentence overview at the top
3. Break any paragraph longer than 3 lines into bullet points or numbered steps
4. Add a 'Related articles' section at the bottom
5. Flag any step that is ambiguous or assumes prior knowledge the reader may not have
\`\`\`

## Building the Self-Service Habit

AI-powered knowledge base creation only works if the team maintains it. Build a simple process:
- **New ticket type appears:** create an article before closing the second ticket of the same type
- **Monthly ticket volume review:** identify top 10 ticket types and check if articles exist
- **Quarterly article review:** run the improvement prompt on your 20 most-visited articles`,
        keyTakeaways: [
          "Convert resolved tickets into knowledge base articles using AI — the article is a byproduct of the resolution, not a separate task",
          "Gap analysis using your top 30 tickets reveals which articles to create or update for the highest deflection impact",
          "AI-improved articles should have searchable titles, a one-sentence overview, numbered steps, and a clear escalation path",
          "A simple maintenance process (create on second ticket, monthly review, quarterly improvement) keeps the knowledge base current without a dedicated team",
        ],
        exercise: {
          title: "Knowledge Base Sprint",
          description: "Create five new knowledge base articles from resolved tickets using AI in under two hours.",
          steps: [
            "Identify five high-volume ticket types that have no knowledge base article or an outdated one",
            "Pull one resolved ticket for each type that includes a clear problem and resolution",
            "Run the article creation prompt for each ticket",
            "Review each article for accuracy (does the resolution actually work?), clarity (can a non-technical user follow it?), and completeness (is anything missing?)",
            "Publish the five articles and track whether ticket volume for those issue types decreases in the following month",
          ],
          tool: "Claude",
        },
        quiz: [
          {
            question: "What is the most reliable source for knowledge base content?",
            options: [
              "Product documentation written by the engineering team",
              "Resolved support tickets — real questions and real resolutions from actual customer interactions",
              "Competitor knowledge bases adapted for your product",
              "FAQs generated by the marketing team during product launch",
            ],
            correct: 1,
            explanation: "Resolved tickets capture the exact questions customers ask, in their own language, with the proven resolution. This produces articles that match how customers search and answer the questions they actually have — not the questions the team assumes they have.",
          },
          {
            question: "A knowledge base article exists for a common issue but customers still contact support about it. What is the most likely problem?",
            options: [
              "Customers prefer speaking to a human regardless of self-service quality",
              "The article is hard to find, unclear in its instructions, or doesn't match how customers describe the problem when searching",
              "The knowledge base platform is not working correctly",
              "The issue is too technical to ever be self-serve",
            ],
            correct: 1,
            explanation: "If customers can't find the article (discoverability), can't follow it (clarity), or the article doesn't match their search terms (title and language), they open a ticket. The fix is usually a title rewrite, a clarity improvement, or better search tagging.",
          },
          {
            question: "When should a support agent create a knowledge base article for a new ticket type?",
            options: [
              "After the hundredth ticket of the same type — at that point it's clearly worth documenting",
              "After the second ticket of the same type — early enough to deflect further volume",
              "Only when a senior agent identifies it as high-priority during a monthly review",
              "After the knowledge base team schedules it into their sprint",
            ],
            correct: 1,
            explanation: "The second ticket of the same type is the signal that this will keep coming. Creating the article at that point deflects tickets three and beyond. Waiting until the hundredth means hundreds of avoidable agent interactions before the self-service option exists.",
          },
        ],
        applyThisWeek: {
          action: "Convert your five most common ticket types into knowledge base articles using AI",
          promptTemplate: "Convert this resolved support ticket into a knowledge base article: [paste ticket conversation]. Article structure: (1) title written as the customer's search query, (2) applies to: [product version or user type], (3) one-sentence overview of when this issue occurs, (4) numbered step-by-step instructions (one action per step), (5) what to do if these steps don't resolve the issue, (6) 2–3 related articles to link. Writing level: clear enough for a non-technical user.",
          tool: "Claude",
        },
      },
      {
        id: "customer-support-l4",
        title: "Escalation Pattern Analysis and Quality Improvement with AI",
        duration: 16,
        description: "Use AI to analyse escalation patterns, identify the systemic issues driving repeat contacts and escalations, and build the quality improvement framework that raises your team's support standard continuously.",
        content: `## Escalations as a Quality Signal

Every escalation is a data point. Individually, an escalation is a customer problem to solve. In aggregate, escalations reveal the systemic issues: the product gaps, process failures, knowledge base holes, and agent skill gaps that generate elevated customer frustration. AI can analyse escalation patterns at scale — turning reactive case management into proactive quality improvement.

## Escalation Pattern Analysis

\`\`\`
Here is a summary of our last 50 escalated tickets: [paste ticket titles, issue types,
original tier-1 resolution attempts, and reasons for escalation].

Analyse:
1. What are the top 3–5 escalation drivers? (root cause categories, not just issue types)
2. Are any of these escalations caused by tier-1 agents not having access to the right
   information or authority?
3. Are any caused by product gaps that generate recurring customer frustration?
4. What is the single most high-leverage change that would reduce escalation volume in
   the next 90 days?
5. Suggest which escalation type should be de-escalated (resolved by tier-1 with
   better training or tooling) versus which requires genuine tier-2 expertise.
\`\`\`

## Response Quality Review

\`\`\`
Review the following support response for quality: [paste response].

Evaluate on:
1. Acknowledgement: does it show genuine understanding of the customer's issue and impact?
2. Clarity: are the instructions clear enough for a non-technical customer to follow?
3. Completeness: does it address everything the customer asked?
4. Tone: is it warm without being unprofessional?
5. Close: does it invite follow-up if the issue persists?

Score each dimension 1–5. Identify the single most important improvement.
Rewrite the weakest section.
\`\`\`

## Building a Continuous Improvement System

\`\`\`
I want to build a monthly quality improvement process for our support team.
Team size: [N] agents. Volume: [tickets per month]. Key metrics: FCR [%], CSAT [%],
average handle time [minutes], escalation rate [%].

Design:
1. A weekly quality review process: which tickets to sample, who reviews, how feedback is delivered
2. A monthly team calibration session: how to ensure all agents apply the same quality standards
3. Agent coaching structure: how to turn quality review findings into individual development actions
4. How AI can assist in the quality review process without replacing the human judgment call
\`\`\`

## The Improvement Loop

Quality improvement compounds when it's systematic:
- **Identify patterns** (escalation analysis, CSAT review)
- **Diagnose root causes** (process gap, knowledge gap, skill gap, product gap)
- **Design interventions** (training, templates, knowledge base updates, product feedback)
- **Measure impact** (track the metric the intervention was designed to move)
- **Repeat**`,
        keyTakeaways: [
          "Escalation pattern analysis reveals whether escalations are driven by agent knowledge gaps, process failures, product issues, or policy limitations — directing the right fix",
          "AI response quality reviews score acknowledgement, clarity, completeness, tone, and close — producing specific improvement feedback faster than manual QA",
          "A systematic quality improvement process (weekly sampling, monthly calibration, individual coaching) compounds over time — each cycle raises the baseline",
          "The improvement loop (identify → diagnose → intervene → measure → repeat) is the structure that separates teams that improve from teams that stay the same",
        ],
        exercise: {
          title: "Escalation Root Cause Analysis",
          description: "Analyse your last 30–50 escalations with AI to identify the highest-leverage process change.",
          steps: [
            "Pull your last 30–50 escalated tickets with issue type, tier-1 resolution attempt, and escalation reason",
            "Run the escalation pattern analysis prompt with all cases",
            "Identify which escalation driver falls into a category you can fix: agent training, knowledge base gap, process change, or product feedback",
            "Design a specific intervention for the highest-volume fixable escalation driver",
            "Implement the change, track escalation volume for that category over the next 30 days, and report the result",
          ],
          tool: "Claude",
        },
        quiz: [
          {
            question: "What is the most valuable output of an escalation pattern analysis?",
            options: [
              "A list of which customers escalate most frequently",
              "The identification of systemic root causes — enabling interventions that reduce future escalation volume across all similar tickets",
              "A ranking of agents by their escalation rate",
              "A prediction of which tickets will be escalated before they're submitted",
            ],
            correct: 1,
            explanation: "Individual escalations are managed in the moment. Pattern analysis reveals the systemic causes — process gaps, knowledge deficits, product issues — that generate escalations repeatedly. Fixing the root cause prevents future escalations; managing individual cases doesn't.",
          },
          {
            question: "When AI reviews a support response for quality, what is the most important action the reviewer should take afterward?",
            options: [
              "Accept the AI quality score as the agent's official performance rating",
              "Use the AI feedback as one input alongside human judgment before delivering coaching to the agent",
              "Send the AI review directly to the customer as an apology",
              "Automate the re-sending of every response that scored below 3",
            ],
            correct: 1,
            explanation: "AI quality reviews surface patterns and specific improvement areas faster than manual review. But agent coaching requires human judgment about context, the agent's development stage, and the relationship. AI is a tool in the QA process, not the final arbiter.",
          },
          {
            question: "What is the key difference between an escalation caused by a product gap versus one caused by an agent knowledge gap?",
            options: [
              "Product gap escalations are always higher urgency than knowledge gap escalations",
              "Product gap escalations require a product team response; knowledge gap escalations can be resolved through training or better knowledge base content",
              "Knowledge gap escalations are always the agent's fault",
              "Product gap escalations are handled by engineering; all others are handled by support leadership",
            ],
            correct: 1,
            explanation: "The fix depends on the root cause. An agent knowledge gap means the agent could resolve the ticket if they had better information or training. A product gap means no amount of training helps — the product needs to change. Conflating the two leads to the wrong intervention.",
          },
        ],
        applyThisWeek: {
          action: "Analyse your last 30 escalations with AI to identify the highest-volume systemic root cause and design a fix",
          promptTemplate: "Analyse our last [N] escalated support tickets: [paste issue types, tier-1 resolution attempts, and escalation reasons]. Identify: (1) top 3–5 escalation drivers by root cause category, (2) which are caused by agent knowledge gaps vs. product gaps vs. policy limitations, (3) the single most high-leverage change to reduce escalation volume in 90 days, (4) which escalation type could be handled at tier-1 with better training or tooling.",
          tool: "Claude",
        },
      },
    ],
  },

  "vp-cs": {
    title: "AI for VP and Head of Customer Success",
    description: "Use AI to sharpen your CS strategy, improve team performance and capacity planning, drive NRR and churn intelligence, and build the AI-powered CS organisation that scales without proportional cost growth.",
    lessons: [
      {
        id: "customer-vp-cs-l1",
        title: "The CS Leader's AI Strategy",
        duration: 18,
        description: "Develop a strategic framework for AI investment across your CS organisation — identifying where AI creates the most durable competitive advantage in customer retention, expansion, and operational efficiency.",
        content: `## AI Is Now a CS Leadership Responsibility

The question for CS leaders is no longer whether to integrate AI into the CS function — it's where AI investment produces the most durable return: in team efficiency, customer experience, and the retention and expansion metrics that define CS value to the business. Getting this wrong means either investing in the wrong places or moving too slowly while competitors do it first.

## The CS Leader AI Strategy Framework

**Layer 1: Team productivity.** AI reduces the production cost of CSM work — communication, documentation, QBR prep, reporting. Immediate ROI, low risk, high adoption if led well.

**Layer 2: Customer experience.** AI improves the quality and consistency of CS delivery — faster response, more personalised onboarding, proactive health monitoring. Medium complexity, requires data and tooling investment.

**Layer 3: Intelligence and prediction.** AI enables the CS organisation to act on leading indicators rather than lagging ones — predicting churn before it happens, identifying expansion signals before the customer raises them. Highest complexity, requires data infrastructure and model validation.

## AI Strategy Prompt for CS Leaders

\`\`\`
You are advising a VP of Customer Success at a [company type and stage].
CS organisation: [N] CSMs, [N] CS Ops, segments: [list].
Current NRR: [%], gross churn: [%], average book of business per CSM: [N accounts].
Biggest challenges:
1. [Challenge 1]
2. [Challenge 2]
3. [Challenge 3]

Design a 12-month AI strategy for this CS organisation:
- Where to invest in the first 90 days (Layer 1 — team productivity)
- Where to build toward in months 4–9 (Layer 2 — customer experience improvement)
- The Layer 3 intelligence capability to target by month 12
- The most likely obstacle to each layer's success
- How to measure ROI on the AI investment at each stage
\`\`\`

## What CS Leaders Must Own

**The make-or-buy decision for AI tooling.** Native AI in your CS platform versus standalone tools versus custom builds — this requires strategic judgment about vendor lock-in, data control, and long-term cost.

**The change management plan.** AI adoption fails when it's mandated without support. The CS leader designs the adoption path that makes AI a genuine capability upgrade rather than an unwelcome mandate.

**The data quality investment.** Layer 2 and 3 AI capabilities require clean, structured CS data. This is a leadership decision — it requires investment before the payoff is visible.`,
        keyTakeaways: [
          "The CS leader's AI strategy operates in three layers: team productivity, customer experience, and intelligence/prediction — each requiring different investment and infrastructure",
          "Layer 1 (team productivity) delivers immediate ROI and builds team AI capability before the more complex layers are attempted",
          "Make-or-buy tooling decisions, change management plans, and data quality investment are leadership decisions that cannot be delegated to CS Ops alone",
          "Measuring AI ROI at each layer (time saved, CSAT impact, NRR lift) is a leadership accountability — not just a reporting function",
        ],
        exercise: {
          title: "CS AI Strategy Design",
          description: "Design a 12-month AI strategy for your CS organisation using the three-layer framework.",
          steps: [
            "Document your current state: team size, NRR, churn rate, biggest operational bottlenecks",
            "Run the AI strategy prompt with your full CS context",
            "Review each layer's recommended investments against your current tooling and data maturity",
            "Identify the biggest obstacle to each layer — is it data quality, tooling, budget, or change management?",
            "Present the 12-month AI strategy to your CS leadership team and use their reactions to pressure-test the plan",
          ],
          tool: "Claude",
        },
        quiz: [
          {
            question: "Why should CS leaders start with Layer 1 (team productivity) AI investments rather than jumping to Layer 3 (intelligence)?",
            options: [
              "Layer 3 is too expensive for most CS organisations",
              "Layer 1 delivers immediate ROI, builds team AI capability, and reveals data quality gaps that Layer 3 will require — creating the foundation for more complex investments",
              "Layer 3 is not yet technically feasible with current AI tools",
              "Layer 1 requires no data infrastructure, making it faster to implement",
            ],
            correct: 1,
            explanation: "Layer 1 success builds the organisation's AI muscle, generates early wins that fund further investment, and surfaces the data and tooling gaps that Layer 2 and 3 require. Jumping to Layer 3 without Layer 1 foundation typically fails due to adoption and data quality issues.",
          },
          {
            question: "What is the most common reason AI adoption fails in CS organisations?",
            options: [
              "The AI tools are not yet good enough for CS use cases",
              "AI is mandated without a change management plan — CSMs feel it is an unwelcome burden rather than a genuine capability upgrade",
              "CS leaders lack the technical knowledge to evaluate AI tools",
              "AI adoption requires too much budget for most CS organisations to justify",
            ],
            correct: 1,
            explanation: "Technology adoption fails when the people expected to use it don't see the value or trust it. A well-designed change management plan — showing CSMs how AI reduces their workload and improves their accounts — is what turns mandate into genuine adoption.",
          },
          {
            question: "What is a 'make-or-buy' decision in the context of AI tooling for CS?",
            options: [
              "Deciding whether to hire an AI specialist or outsource AI work to a consultant",
              "Choosing between building custom AI capabilities, buying a standalone AI tool, or using native AI within your existing CS platform",
              "Deciding whether to invest in AI training for CSMs or hire AI-native candidates",
              "Choosing whether to build a CS knowledge base internally or purchase one from a vendor",
            ],
            correct: 1,
            explanation: "The make-or-buy decision determines your vendor lock-in exposure, data control, long-term cost, and integration complexity. It's a strategic leadership decision with implications beyond any single tool — and requires balancing immediate capability against long-term flexibility.",
          },
        ],
        applyThisWeek: {
          action: "Draft your 12-month CS AI strategy using the three-layer framework and present it to your CS leadership team",
          promptTemplate: "Design a 12-month AI strategy for a VP of CS at [company type and stage]. CS org: [N] CSMs, segments: [list]. Current NRR: [%], gross churn: [%]. Biggest challenges: [list 3]. For each layer (Layer 1: team productivity / Layer 2: customer experience / Layer 3: intelligence and prediction): recommended investments, timing, most likely obstacle to success, and how to measure ROI.",
          tool: "Claude",
        },
      },
      {
        id: "customer-vp-cs-l2",
        title: "AI for Team Performance, Coaching, and Capacity Planning",
        duration: 19,
        description: "Use AI to improve team performance analysis, design more effective coaching programmes, and build data-driven capacity models — so your team grows in capability and your organisation scales efficiently.",
        content: `## From Anecdote to Evidence in CS Performance

Most CS team performance is assessed through a combination of metrics and anecdote: the leader knows intuitively which CSMs are strong and which are struggling, but the evidence base for coaching decisions is often thin. AI can help surface more rigorous performance patterns across the team — making coaching more targeted and capacity planning more accurate.

## Team Performance Pattern Analysis

\`\`\`
Here is performance data for my CS team of [N] CSMs:
[Paste or describe: NRR per CSM, churn rate, health score accuracy, CSAT,
onboarding completion rate, QBR completion, book of business size,
average account ARR, tenure].

Analyse this data:
1. Which CSMs are outperforming on NRR relative to their book of business complexity?
2. Which performance metrics are most correlated with high NRR across the team?
3. Are there any patterns suggesting a CSM is at risk of underperformance or burnout?
4. What is the most impactful skill or behaviour gap to address at the team level?
5. Identify two or three CSMs who could be elevated to senior roles based on this data.
\`\`\`

## AI-Assisted Coaching Preparation

\`\`\`
I am preparing for a coaching 1:1 with a CSM:
- Their performance this quarter: [describe key metrics and qualitative observations]
- A strength to build on: [describe]
- A gap to address: [describe]
- Their stated career goal: [describe]

Prepare for this coaching conversation:
1. Three powerful questions that will help them self-diagnose the gap
2. A way to connect the gap to their career goal (not just their manager's agenda)
3. A specific, time-bound development action they could take in the next 30 days
4. How to measure progress on this action in 30 days
\`\`\`

## Capacity Planning with AI

\`\`\`
I need to plan CS capacity for the next 4 quarters.
Current state: [N] CSMs, [N] accounts, average book of business [N accounts per CSM].
Growth projections: [X] new accounts per quarter, [Y% expected churn].
Segments: [list with account counts and target book-of-business ratios].

Model three capacity scenarios:
Scenario A: Maintain current CSM-to-account ratios
Scenario B: Increase accounts per CSM by 20% with AI productivity gains
Scenario C: Segment-based ratio differentiation (high-touch enterprise, scaled digital)
For each scenario: headcount requirements by quarter, cost implication, and the
NRR risk if the scenario underperforms.
\`\`\``,
        keyTakeaways: [
          "AI-assisted performance analysis surfaces which behaviours and metrics most correlate with high NRR — making coaching decisions evidence-based rather than intuitive",
          "Coaching preparation with AI produces better questions, career-connected development actions, and measurable 30-day goals — making 1:1s more effective",
          "Capacity modelling with three scenarios (maintain ratios / increase efficiency / segment differentiation) gives leadership a structured choice rather than a single projection",
          "Connecting AI productivity gains to capacity planning (Scenario B) creates the business case for AI investment in CSM tools",
        ],
        exercise: {
          title: "Team Performance Deep Dive",
          description: "Use AI to analyse your team's performance data and design one targeted coaching intervention.",
          steps: [
            "Gather Q-over-Q performance data for your CS team: NRR, churn, CSAT, health accuracy, QBR completion",
            "Run the team performance pattern analysis prompt with all available data",
            "Identify the most consistent performance differentiator between your top and median CSMs",
            "Select one CSM who would benefit from targeted coaching and run the coaching preparation prompt",
            "Conduct the 1:1 using the AI-generated questions and action, then evaluate 30 days later",
          ],
          tool: "Claude",
        },
        quiz: [
          {
            question: "What is the primary value of AI-assisted team performance analysis versus a manager's qualitative assessment?",
            options: [
              "AI is always more accurate than human judgment about performance",
              "AI surfaces patterns across the full team simultaneously — identifying correlations between behaviours and NRR that are hard to see case by case",
              "AI removes the need for performance reviews",
              "AI assessment is legally safer than human judgment in performance decisions",
            ],
            correct: 1,
            explanation: "A manager knows their team well but assesses performance case by case. AI processes the full team's data simultaneously and surfaces correlations — which CSM behaviours consistently predict high NRR — that are difficult to identify through individual observation.",
          },
          {
            question: "Why should coaching 1:1 questions help a CSM self-diagnose a gap rather than the manager diagnosing it for them?",
            options: [
              "Self-diagnosis is required by most employment law frameworks",
              "Managers are not qualified to diagnose CSM performance gaps",
              "Self-diagnosed gaps create intrinsic motivation to close them; manager-diagnosed gaps can feel like criticism and create defensiveness",
              "Self-diagnosis sessions take less time than manager-led feedback sessions",
            ],
            correct: 2,
            explanation: "Insight that a person arrives at themselves is more durable than insight delivered by another person. Coaching questions that guide self-discovery create ownership of the development action — making follow-through more likely than when the manager delivers the diagnosis directly.",
          },
          {
            question: "What is the key assumption Scenario B (increase accounts per CSM by 20% with AI productivity gains) is betting on?",
            options: [
              "That hiring will slow down due to budget constraints",
              "That AI will reduce CSM production work enough that each CSM can effectively manage 20% more accounts without NRR impact",
              "That customers in the scaled segment do not require high-touch engagement",
              "That the CS platform will automatically handle 20% of customer interactions",
            ],
            correct: 1,
            explanation: "Scenario B is a bet on AI productivity gains being real and large enough to absorb higher account loads without degrading NRR. If AI saves time on production work but CSMs can't actually handle more accounts effectively, the NRR assumption is wrong.",
          },
        ],
        applyThisWeek: {
          action: "Analyse your team's performance data with AI and prepare for your next three coaching 1:1s using the coaching preparation prompt",
          promptTemplate: "I'm preparing a coaching 1:1 for a CSM. Their performance this quarter: [key metrics and observations]. Strength to build on: [describe]. Gap to address: [describe]. Their career goal: [describe]. Generate: (1) three questions that help them self-diagnose the gap, (2) a way to connect the gap to their career goal, (3) a specific 30-day development action, (4) how to measure progress at 30 days.",
          tool: "Claude",
        },
      },
      {
        id: "customer-vp-cs-l3",
        title: "NRR, Churn Intelligence, and Portfolio Analytics with AI",
        duration: 19,
        description: "Use AI to build a deeper understanding of the drivers behind your NRR, identify churn risk earlier, and generate the portfolio-level intelligence that allows CS leadership to act proactively rather than reactively.",
        content: `## From NRR Reporting to NRR Intelligence

Most CS leaders report NRR. The best CS leaders understand it. There's a significant difference: reporting tells you what the number is; intelligence tells you why it moved, which accounts drove the change, which customer behaviours predict future movement, and where intervention will have the most impact. AI helps you build this intelligence layer faster.

## NRR Driver Analysis

\`\`\`
Here is our NRR performance for the last four quarters by segment:
[paste or describe: gross retention, expansion rate, net revenue churn,
top churned accounts by ARR, top expanded accounts by ARR].

Analyse:
1. What drove NRR above or below 100% each quarter? Break down by gross retention
   vs. expansion contribution.
2. Which customer segment is contributing most positively to NRR — and what patterns
   explain their success?
3. Which churned accounts had health scores that should have flagged the risk? Which
   were surprises?
4. What is the most realistic intervention that would move NRR by +5 percentage points
   in the next two quarters?
\`\`\`

## Churn Intelligence: Predicting Before It Happens

\`\`\`
Here is data on accounts that churned in the last 12 months: [describe key attributes
at 90, 60, and 30 days before churn — health score trajectory, usage patterns,
engagement signals, stakeholder changes, support ticket volume].
And comparable data for accounts that renewed: [describe same attributes].

Build a churn intelligence model:
1. The top 5 signals that differentiate churned from renewed accounts
2. The earliest point at which these signals appeared reliably before churn
3. A red flag checklist: if [signal A] + [signal B] + [signal C] are present, escalate
4. Which signals are most commonly overlooked in our current monitoring process
\`\`\`

## Portfolio Risk and Opportunity Map

\`\`\`
Here is my current account portfolio data: [paste accounts with ARR, health score,
renewal date, usage trend, segment, and last QBR date].

Generate:
1. A risk map: accounts where churn risk is highest in the next 90 days (with rationale)
2. An expansion map: accounts most ready for an upsell or cross-sell conversation
3. The top 5 accounts I should personally engage with as CS leader in the next 30 days
4. The segment or cohort with the highest systemic risk — and what's driving it
\`\`\`

## Communicating NRR Intelligence to the Board

\`\`\`
Here is our NRR data for the quarter: [paste key metrics].
Write a board-level NRR narrative:
- What happened (3 bullets: gross retention, expansion, net churn)
- What drove it (root causes, not just the numbers)
- What we're doing about the gaps (specific actions, not generic commitments)
- Forward outlook: NRR forecast for next quarter based on current portfolio signals
Tone: direct, evidence-based, no corporate language.
\`\`\``,
        keyTakeaways: [
          "NRR intelligence means understanding why the number moved — driver analysis breaks down gross retention vs. expansion contributions by segment",
          "Churn intelligence identifies the earliest reliable leading indicators and combines them into a red flag checklist for proactive CSM intervention",
          "A portfolio risk and opportunity map tells CS leaders which accounts to prioritise personally — not just which ones have the worst health scores",
          "Board-level NRR narratives should explain root causes and forward outlook with specific actions — not just report the metric",
        ],
        exercise: {
          title: "NRR Driver Analysis",
          description: "Use AI to build a deeper understanding of what drove last quarter's NRR and identify the highest-leverage intervention for next quarter.",
          steps: [
            "Gather last quarter's NRR data by segment: gross retention rate, expansion rate, churned accounts by ARR, expanded accounts by ARR",
            "Run the NRR driver analysis prompt with full portfolio context",
            "Identify the single intervention that AI recommends for the highest NRR impact",
            "Test the churn intelligence prompt against your actual churned account data from the last 12 months",
            "Use the portfolio risk and opportunity map prompt to identify your personal engagement priorities for the next 30 days",
          ],
          tool: "Claude",
        },
        quiz: [
          {
            question: "What is the difference between NRR reporting and NRR intelligence?",
            options: [
              "NRR reporting is done monthly; NRR intelligence is done quarterly",
              "NRR reporting states the number; NRR intelligence explains why it moved, what drove it, and what predicts future movement",
              "NRR intelligence is calculated by AI; NRR reporting is calculated by the finance team",
              "NRR reporting covers gross retention; NRR intelligence covers expansion only",
            ],
            correct: 1,
            explanation: "A VP of CS who only reports NRR is telling leadership what already happened. NRR intelligence explains the causation (which behaviours and segments drove it), enabling proactive decisions rather than retrospective explanations.",
          },
          {
            question: "Why is a churn red flag checklist (if Signal A + Signal B + Signal C are present, escalate) more useful than a single health score threshold?",
            options: [
              "A checklist is easier to train CSMs on than a composite health score",
              "A single threshold misses accounts where multiple moderate signals combine to create high churn risk — the checklist captures compounding risk signals",
              "Checklists can be automated in most CS platforms without data science support",
              "A single threshold approach requires too much historical data to be accurate",
            ],
            correct: 1,
            explanation: "An account with one moderate risk signal may be fine. An account with three simultaneous signals (declining usage, stakeholder departure, missed QBR) is at high risk even if each individual signal doesn't cross a threshold. The checklist captures compounding risk.",
          },
          {
            question: "What should a board-level NRR narrative include beyond the metric itself?",
            options: [
              "A complete list of every churned account and their ARR",
              "A technical explanation of how NRR is calculated",
              "Root cause analysis of what drove the result, specific actions being taken on gaps, and a forward outlook based on current portfolio signals",
              "A competitor benchmark showing our NRR relative to industry peers",
            ],
            correct: 2,
            explanation: "Boards invest in CS leadership to understand what's happening and whether the team can predict and improve NRR. Root causes, specific actions, and a forward outlook give boards the confidence that CS leadership understands the business — not just the metrics.",
          },
        ],
        applyThisWeek: {
          action: "Run an NRR driver analysis for last quarter and identify your highest-priority portfolio intervention using AI",
          promptTemplate: "Analyse our NRR performance for last quarter by segment. Gross retention: [%], expansion rate: [%], net churn: [%]. Top churned accounts: [list with ARR and reason if known]. Top expanded accounts: [list with ARR]. Analyse: (1) what drove NRR above/below 100% — break down gross retention vs. expansion, (2) which segment contributed most positively and why, (3) which churned accounts should have been flagged earlier, (4) the most realistic intervention to move NRR +5pp in next two quarters.",
          tool: "Claude",
        },
      },
      {
        id: "customer-vp-cs-l4",
        title: "Building an AI-Powered CS Organisation at Scale",
        duration: 17,
        description: "Design the operating model, governance structure, and change management plan that transforms your CS organisation into one that compounds AI capability over time — and uses it to drive measurable NRR improvement.",
        content: `## The Difference Between an AI-Aware and an AI-Powered Organisation

An AI-aware CS organisation has some CSMs who use AI sometimes. An AI-powered organisation has AI embedded in its operating model — in the playbooks CSMs follow, the health scores they rely on, the reporting cadence leadership uses, and the hiring criteria for new CSMs. The difference is not technology; it's leadership design.

## The AI-Powered CS Operating Model

**People:** Hiring criteria include AI fluency. Onboarding includes AI workflow training. Performance reviews include AI adoption metrics alongside NRR.

**Process:** Playbooks reference AI-assisted workflows for each CS motion. Weekly team syncs include prompt sharing. Quarterly reviews include AI capability assessments.

**Tools:** CS platform selected or configured to support AI-assisted workflows. Prompt library maintained in the team wiki. Data infrastructure supports health scoring and cohort analysis.

**Governance:** Clear guidelines on which customer interactions should be AI-assisted vs. always human. Data use policies for AI tools. Regular review of AI outputs for quality and bias.

## Designing the Change Management Plan

\`\`\`
I am rolling out AI-assisted workflows across my CS organisation of [N] CSMs.
Current AI maturity: [low/medium — describe].
Key concerns I anticipate: [list — e.g., "will AI replace my job?", "outputs aren't
accurate enough", "too much time to set up"].

Design a change management plan:
1. Communication plan: how to frame AI as a CSM capability upgrade, not a threat
2. Pilot design: which 3–5 CSMs to pilot with and why, what they test for 30 days
3. Feedback loop: how to capture what's working and what isn't during the pilot
4. Scale plan: how to roll out to the full team after pilot learnings
5. Success metrics: how to know the rollout is working at 30, 60, and 90 days
\`\`\`

## The AI Governance Framework for CS

\`\`\`
Design an AI governance framework for a CS organisation:
Key considerations:
- Which customer interactions should always be handled by a human (no AI drafting)?
- What data from customer accounts can be used as AI prompt context?
- What quality checks should exist before AI-generated content reaches customers?
- How should CSMs disclose to customers when they're using AI-assisted tools?
- What escalation path exists when an AI output is wrong and causes a customer issue?
Produce a one-page governance policy draft the leadership team can review and adapt.
\`\`\`

## Sustaining AI Capability Over Time

An AI programme without a sustaining system degrades. Build these into your CS operating rhythm:
- **Monthly:** best prompt sharing session, new use case identification
- **Quarterly:** AI capability review, tool assessment, playbook updates for new AI workflows
- **Annually:** AI strategy refresh — what's changed in capability, what new investments are warranted, how the competitive landscape has shifted`,
        keyTakeaways: [
          "An AI-powered CS organisation has AI embedded in its people practices, processes, tooling, and governance — not just used ad hoc by individual CSMs",
          "Change management is the most critical success factor for AI rollout — how AI is framed (capability upgrade vs. threat) determines adoption quality",
          "A pilot-then-scale approach (3–5 CSMs for 30 days, with structured feedback) reduces rollout risk and generates the evidence needed to build team-wide confidence",
          "Sustaining AI capability requires a regular operating rhythm: monthly prompt sharing, quarterly capability reviews, annual strategy refresh",
        ],
        exercise: {
          title: "AI Organisation Design",
          description: "Design the AI-powered CS operating model and change management plan for your organisation.",
          steps: [
            "Assess your current state: how many CSMs regularly use AI, what they use it for, and what the main barriers are",
            "Run the change management plan prompt with your specific concerns and team context",
            "Design the pilot: select three to five CSMs representing different experience levels and segments",
            "Define your 30-day pilot success metrics before it starts",
            "After the pilot, run the governance framework prompt to produce a governance policy before rolling out to the full team",
          ],
          tool: "Claude",
        },
        quiz: [
          {
            question: "What distinguishes an AI-powered CS organisation from one that is merely AI-aware?",
            options: [
              "An AI-powered organisation has purchased more AI tools",
              "An AI-powered organisation has AI embedded in its operating model — people practices, processes, tooling, and governance — rather than used sporadically by individuals",
              "An AI-powered organisation uses AI for all customer communications without human review",
              "An AI-powered organisation has a dedicated AI team supporting CS",
            ],
            correct: 1,
            explanation: "AI-awareness is individual; AI-powered is organisational. The difference is whether AI is embedded in the systems, processes, and expectations that govern how the team works — or whether it depends on individual motivation and self-direction.",
          },
          {
            question: "Why is a pilot-then-scale approach recommended for CS AI rollout rather than a full team launch?",
            options: [
              "A full team launch is too expensive and requires phased budget approval",
              "A pilot generates real evidence about what works, what doesn't, and which concerns are valid — making the full rollout faster and higher quality",
              "Most CSMs are not ready for AI tools and need to be individually certified first",
              "AI tools are not yet reliable enough for full production use",
            ],
            correct: 1,
            explanation: "A pilot with a small group of CSMs surfaces the real friction points, prompt quality issues, and adoption barriers before they affect the whole team. The pilot's learnings make the full rollout faster and more successful — and the pilot CSMs become internal champions.",
          },
          {
            question: "Which customer interaction type should always be handled by a human with no AI drafting, according to a robust AI governance framework?",
            options: [
              "Check-in emails for green-health accounts",
              "QBR agenda creation",
              "High-stakes sensitive conversations: executive escalations, churn conversations, and incidents with significant business impact",
              "Onboarding welcome emails for new customers",
            ],
            correct: 2,
            explanation: "High-stakes conversations require genuine human engagement — trust, judgment, empathy, and contextual awareness that AI cannot fully replicate. Using AI drafts for escalations or churn conversations risks producing responses that feel generic or tone-deaf at exactly the moment relationship quality matters most.",
          },
        ],
        applyThisWeek: {
          action: "Design your CS AI rollout plan — including pilot design, change management framing, and 30-day success metrics",
          promptTemplate: "I am rolling out AI-assisted workflows across my CS org of [N] CSMs. Current AI maturity: [low/medium]. Anticipated concerns: [list]. Design a change management plan: (1) how to frame AI as a CSM capability upgrade in internal communications, (2) which 3–5 CSMs to pilot with and why, (3) what they test in 30 days, (4) how to capture feedback during the pilot, (5) scale plan after pilot learnings, (6) success metrics at 30/60/90 days.",
          tool: "Claude",
        },
      },
    ],
  },
}
