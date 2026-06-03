import type { SubRoleLessons } from './types'

export const salesSubRoles: SubRoleLessons = {
  ae: {
    title: "AI for Account Executives",
    description:
      "Practical AI skills for Account Executives — spending more time selling and less time prepping, with better research, stronger proposals, and sharper objection handling.",
    lessons: [
      {
        id: "sales-ae-l1",
        title: "AI for Account Executives: More Time Selling, Less Time Prepping",
        duration: 16,
        description:
          "Understand where AI creates the most leverage in an AE's week — and build the habits that shift time from preparation and administration into active selling.",
        content: `## The AE Time Problem

Account Executives typically spend 30–40% of their time on non-selling activities: pre-call research, CRM updates, proposal drafting, follow-up emails, and internal reporting. This is not laziness — it is the structural reality of modern B2B selling. AI does not change the structure, but it compresses many of these tasks dramatically, returning hours to the week for what actually moves deals.

## Where AI Creates AE Leverage

**Account research:** Understanding a prospect's business, strategic priorities, recent announcements, and competitive context before a discovery call. What used to take 45 minutes can take 10.

**Email drafting:** First drafts of follow-up emails, meeting confirmations, proposal summaries, and stakeholder communications. AI produces a usable first draft in seconds that you edit in 2 minutes.

**Proposal and pricing summaries:** Structuring a clear, compelling commercial summary for a complex deal — tailored to the economic buyer rather than the technical evaluator.

**Objection preparation:** Generating likely objections for a specific prospect and drafting strong responses before the call.

**CRM hygiene:** Summarising meeting notes and updating opportunity fields after a call, rather than spending 30 minutes on data entry.

\`\`\`
Prompt example — pre-call research brief:
"I have a discovery call tomorrow with the [VP of Operations] at [Acme Corp],
a [450-person logistics company]. They recently announced [expanding into 3 new markets].
Give me: (1) 3 likely strategic priorities for their VP Ops right now,
(2) 5 discovery questions tailored to their context,
(3) the business case angle most likely to resonate with an ops leader,
(4) one insightful observation I can open the call with."
\`\`\`

## What AI Cannot Do

AI cannot build relationships, read the room on a live call, exercise commercial judgment on deal strategy, or navigate the political dynamics of a complex enterprise sale. These are the skills that distinguish top AEs — and they are entirely human.

## The Discipline

AI only saves time if you build the habit. The AEs who get the most from AI are those who use it consistently for specific task types rather than reaching for it occasionally.`,
        keyTakeaways: [
          "AEs typically spend 30–40% of their time on non-selling activities — AI can compress most of these tasks and return hours to the selling week",
          "The highest-leverage AI tasks for AEs are pre-call research, email drafting, proposal structuring, objection prep, and CRM note summarisation",
          "Relationship building, live call judgment, deal strategy, and political navigation remain irreducibly human — these are the AE's competitive advantage",
          "Consistent habit application of AI to specific task types produces compounding time savings — occasional use does not",
        ],
        exercise: {
          title: "Pre-Call Research Brief in 10 Minutes",
          description:
            "Build a complete pre-call research brief for a live prospect using AI — then compare it to how long the same research would have taken manually.",
          steps: [
            "Choose an upcoming discovery or qualification call with a prospect you have not deeply researched yet",
            "Open Claude and prompt: 'I have a [call type] with [prospect role] at [company name], a [company description]. Context: [any recent news or known trigger event]. Give me: (1) top 3 likely strategic priorities for this person right now, (2) 5 tailored discovery questions, (3) the business case angle most likely to resonate, (4) one insightful opening observation.'",
            "Note how long the AI research took vs how long the same research would have taken manually",
            "Add 2–3 things you know from prior interactions that the AI could not have known",
            "Use the brief on the actual call — note after the call which parts were accurate and which missed the mark",
          ],
          tool: "Claude",
        },
        quiz: [
          {
            question:
              "What is the most accurate way to describe AI's role in an AE's selling workflow?",
            options: [
              "AI can qualify deals and determine which prospects to prioritise",
              "AI compresses non-selling preparation tasks, returning time to the activities only the AE can do: building relationships, running discovery, and closing",
              "AI replaces the need for AEs to do account research themselves",
              "AI is primarily useful for SDR handoffs, not full-cycle AE work",
            ],
            correct: 1,
            explanation:
              "The core value proposition of AI for AEs is time reallocation — not capability replacement. Compressing research, email drafting, and CRM admin from hours to minutes creates space for the high-leverage human activities (relationship depth, live call quality, deal strategy) that determine whether deals close.",
          },
          {
            question:
              "An AE uses AI to generate a pre-call research brief but does not add any personal context before the call. What is the most likely consequence?",
            options: [
              "The prospect will know the research was AI-generated",
              "The brief will be too long to read before the call",
              "The brief lacks the relationship context, prior conversation history, and political knowledge only the AE has — leading to a generic conversation rather than a tailored one",
              "AI research briefs always contain factual errors about the company",
            ],
            correct: 2,
            explanation:
              "AI can synthesise public information about a company and generate logical hypotheses about a buyer's priorities — but it has no access to the relationship history, previous objections raised, internal sponsor dynamics, or organisational politics that experienced AEs carry in their heads. The AE's annotation of AI output with personal context is what makes a brief genuinely useful.",
          },
          {
            question:
              "Which of the following is NOT an appropriate use of AI for an Account Executive?",
            options: [
              "Drafting a follow-up email after a discovery call",
              "Generating likely objections for a specific prospect before a call",
              "Deciding unilaterally which deals to close this quarter based on AI deal scoring",
              "Summarising call notes for CRM entry",
            ],
            correct: 2,
            explanation:
              "Pipeline prioritisation and close decisions require commercial judgment informed by relationship quality, deal dynamics, political intelligence, and quota context — all of which are human judgments. AI deal scoring tools can inform prioritisation thinking, but the decision sits with the AE and their manager.",
          },
        ],
        applyThisWeek: {
          action:
            "Run an AI pre-call research brief for every discovery and qualification call this week. At the end of the week, calculate the total time saved and identify which part of the brief was most useful.",
          promptTemplate:
            "I have a [call type] with [prospect role] at [company name], a [company description]. Context: [recent news, trigger event, or known situation]. Give me: (1) top 3 likely strategic priorities for this buyer right now, (2) 5 tailored discovery questions, (3) the business case angle most likely to resonate, (4) 2 likely objections and strong responses, (5) one insightful opening observation.",
          tool: "Claude",
        },
      },
      {
        id: "sales-ae-l2",
        title: "Account Research, Qualification, and Demo Preparation with AI",
        duration: 18,
        description:
          "Use AI to build deeper account intelligence faster, sharpen your qualification framework, and prepare demos that are tailored to the specific buyer's business context and priorities.",
        content: `## Why Deep Research Wins Deals

Enterprise deals are won on specificity. Buyers can tell within 10 minutes whether an AE has done their homework. Generic discovery questions and untailored demos signal that you are running a playbook, not solving their problem. Deep account research produces the specificity that builds credibility — and AI compresses the time required to achieve it.

## Building Account Intelligence with AI

Account intelligence has three layers: company context (what does the business do, what is happening strategically), buyer context (who is this person, what do they care about, what pressure are they under), and competitive context (what alternatives might they consider, what objections will come from comparing to competitors).

\`\`\`
Prompt example — account intelligence:
"Build a pre-deal account intelligence brief for [Acme Corp], a [B2B SaaS company,
800 employees, Series C, expanding in EMEA]. I'm selling [enterprise data management software].
My champion is the [CTO], economic buyer is the [CFO].
Include: (1) likely strategic priorities for each stakeholder, (2) the financial impact
argument most likely to resonate with the CFO, (3) the technical credibility points
most important for the CTO, (4) top 3 competitors they may be evaluating,
(5) likely objections from each stakeholder."
\`\`\`

## Sharpening Qualification with MEDDIC/MEDDPICC

AI can help AEs structure qualification rigorously using MEDDIC or MEDDPICC frameworks — identifying gaps in current qualification and generating questions to fill them.

\`\`\`
Prompt example — qualification gap analysis:
"I'm qualifying an opportunity with [Company]. Here is what I know about each
MEDDIC element: [paste current qualification notes by element].
For each element where I have gaps, generate 2 questions I should ask in my next
conversation to complete the qualification."
\`\`\`

## Demo Personalisation

A tailored demo — showing the buyer their industry, their use cases, their pain points — is significantly more compelling than a standard product walkthrough. AI can help structure the narrative arc of a personalised demo before you build the environment.

## Post-Demo Follow-Up

The post-demo follow-up is a high-leverage touchpoint that many AEs underinvest in. AI can draft a comprehensive recap email — covering what was shown, what resonated, agreed next steps, and the business case summary — in minutes.`,
        keyTakeaways: [
          "Account intelligence has three layers: company, buyer, and competitive context — AI builds all three faster than manual research",
          "MEDDIC/MEDDPICC qualification gaps can be identified and filled systematically using AI to generate targeted questions for each missing element",
          "Demo personalisation starts with a narrative arc — AI helps structure the story before you build the demo environment",
          "Post-demo follow-up emails that recap value, confirm next steps, and reinforce the business case are a high-leverage touchpoint AI makes fast to produce",
        ],
        exercise: {
          title: "MEDDIC Qualification Gap Analysis",
          description:
            "Take a live opportunity and use AI to identify qualification gaps and generate the questions to fill them.",
          steps: [
            "Choose a live opportunity that you believe has good potential but has not fully progressed",
            "Write out what you currently know about each MEDDIC element: Metrics, Economic Buyer, Decision Criteria, Decision Process, Identify Pain, Champion",
            "Prompt Claude: 'I'm qualifying a deal with [company]. Here is my current MEDDIC qualification by element: [paste notes]. For each element where I have significant gaps, generate: (1) a diagnosis of what the gap means for deal risk, (2) 2 questions to ask in my next conversation to fill it.'",
            "Review the gap analysis — note which gaps you already knew about vs which the structured review surfaced",
            "Build these questions into your next meeting agenda",
          ],
          tool: "Claude",
        },
        quiz: [
          {
            question:
              "What makes a tailored demo more effective than a standard product walkthrough?",
            options: [
              "Tailored demos are shorter and therefore keep buyer attention better",
              "Standard demos are legally required to cover all product features",
              "Tailored demos show buyers their specific industry, use cases, and pain points — making the connection between product capability and their business problem concrete rather than hypothetical",
              "Tailored demos are more technically accurate than standard walkthroughs",
            ],
            correct: 2,
            explanation:
              "Buyers buy outcomes, not features. A standard demo shows what the product can do; a tailored demo shows what the product will do for this buyer's specific situation. The cognitive work of 'how would this apply to us?' is eliminated when the demo already speaks the buyer's language and reflects their context.",
          },
          {
            question:
              "An AE uses AI to build a MEDDIC gap analysis and discovers they have no confirmed Economic Buyer. What should they do next?",
            options: [
              "Continue progressing the deal — the Economic Buyer will emerge naturally as the process advances",
              "Ask their champion directly: 'Who in your organisation would need to approve a purchase of this scope?' and map a path to that person",
              "Ask AI to generate the name of the likely Economic Buyer based on the company org chart",
              "Include the Economic Buyer gap in the CRM as a deal risk and move on",
            ],
            correct: 1,
            explanation:
              "No confirmed Economic Buyer is one of the most common reasons enterprise deals stall or die in late stages. The right response is immediate action: using the champion relationship to map the approval process and identify the budget owner. Waiting for them to emerge, or accepting the gap as a logged risk, allows the deal to drift.",
          },
          {
            question:
              "Why is the post-demo follow-up email a high-leverage touchpoint?",
            options: [
              "It is the only documented record of what was shown in the demo",
              "It keeps the deal in the buyer's inbox for longer",
              "It reinforces value, confirms next steps, and gives the champion the language and business case they need to sell internally — at a moment when the buyer's interest is highest",
              "It reduces the need for a formal proposal later in the process",
            ],
            correct: 2,
            explanation:
              "The period immediately after a positive demo is when buyer interest peaks. A strong follow-up email that recaps what resonated, confirms next steps, and provides champion-ready business case language gives internal advocates what they need to sell up the chain — at exactly the right moment. Many AEs underinvest here because it takes time to write well. AI eliminates that barrier.",
          },
        ],
        applyThisWeek: {
          action:
            "Run a MEDDIC gap analysis on your top three opportunities this week. For each gap identified, build the qualification question into your next meeting with that account.",
          promptTemplate:
            "I'm qualifying a deal with [company name], a [company description]. I'm selling [product/solution]. Here is my current MEDDIC qualification: Metrics: [X], Economic Buyer: [X], Decision Criteria: [X], Decision Process: [X], Identify Pain: [X], Champion: [X]. For each element with gaps, give me: (1) what the gap means for deal risk, (2) 2 questions to ask to fill it in my next conversation.",
          tool: "Claude",
        },
      },
      {
        id: "sales-ae-l3",
        title: "Proposals, Follow-Ups, and Objection Handling with AI",
        duration: 17,
        description:
          "Use AI to write compelling commercial proposals, craft follow-up sequences that maintain momentum, and prepare sharp responses to the objections you know are coming.",
        content: `## The Proposal Problem

Most proposals are too long, too feature-focused, and too generic. Buyers read the pricing page and the executive summary — the rest is skimmed or ignored. A strong commercial proposal is a narrative document that connects the buyer's business problem to your solution's value in their specific context. AI helps you write this faster — but the commercial judgment and client knowledge have to come from you.

## Writing a Compelling Executive Summary

The executive summary is the most important section of any proposal. It should demonstrate that you understand the buyer's situation, quantify the business impact of solving their problem, and articulate why your solution is the right choice. AI drafts strong executive summaries when given the right inputs.

\`\`\`
Prompt example — proposal executive summary:
"Write the executive summary for a proposal to [Acme Corp], a [1,200-person
professional services firm]. Their problem: [manual contract review process is creating
72-hour average review cycles, delaying client onboarding by 3 weeks per engagement].
Our solution: [AI-powered contract review platform]. Quantified value: [reducing review
cycle to 8 hours, saving £340k in staff time annually]. Tone: business-like, direct,
confident. Length: 3 paragraphs."
\`\`\`

## Follow-Up Sequences That Maintain Momentum

Deal momentum is fragile. AEs who go quiet between meetings lose deals to inertia. AI can help maintain consistent, value-adding touchpoints between milestones.

\`\`\`
Prompt example — follow-up sequence:
"Draft a 3-touch follow-up sequence after a successful demo with [VP of Finance at Acme].
Touch 1 (same day): post-demo recap and next step confirmation.
Touch 2 (day 5 if no reply): add a new piece of value — send a relevant case study,
a relevant insight, or a business case element.
Touch 3 (day 10 if still no reply): low-pressure check-in that reopens the conversation
without feeling desperate. Each message should be under 100 words."
\`\`\`

## Objection Handling Preparation

The best objection responses feel natural because they were practised. AI can generate likely objections for a specific deal and draft strong, non-defensive responses that you refine until they sound like you.

The objections you should prepare for every deal: price, timing, competitor comparison, internal priority conflict, and 'we'll do it ourselves.'`,
        keyTakeaways: [
          "Strong proposals are narrative documents, not feature lists — the executive summary must connect buyer problem, quantified value, and solution fit",
          "Follow-up sequences should add value at every touchpoint, not just check whether the buyer has made a decision",
          "Objection preparation before a call produces more composed, effective responses than improvising in the moment",
          "AI draft proposals and follow-ups require AE editing for specificity, commercial accuracy, and personal voice — never send unedited AI content",
        ],
        exercise: {
          title: "Objection Bank for Your Top Deal",
          description:
            "Build a personal objection bank for your most advanced live opportunity — preparation that will compound across similar deals.",
          steps: [
            "Choose your most advanced live opportunity where objections could stall or kill the deal",
            "Prompt Claude: 'I'm selling [product/solution] to [company, role]. The deal is at [stage]. Generate the top 7 objections this buyer is most likely to raise — cover: price, timing, competitive alternatives, internal priority conflict, risk/change management, and any industry-specific objections. For each, draft a response that is honest, confident, and not defensive.'",
            "Review each response — edit any that sound too salesy, too aggressive, or not like your natural voice",
            "Add two objections specific to this deal that the AI did not generate",
            "Practise delivering the three most likely objections out loud before your next meeting with this account",
          ],
          tool: "Claude",
        },
        quiz: [
          {
            question:
              "What is the most important element of a strong proposal executive summary?",
            options: [
              "A comprehensive list of product features and technical specifications",
              "Proof that the vendor has global enterprise customers",
              "Demonstrating understanding of the buyer's specific problem, quantifying the business impact of solving it, and connecting it to your solution in their context",
              "A detailed implementation timeline",
            ],
            correct: 2,
            explanation:
              "The executive summary is read by economic buyers who make decisions based on business impact, not product features. The winning formula is: I understand your problem precisely → here is what it costs you → here is what we will change → here is why we are the right choice. Features, references, and timelines support this narrative — they do not replace it.",
          },
          {
            question:
              "An AE sends an AI-generated follow-up email directly after a demo without editing it. The buyer responds 'This feels like a template — did you even read your own notes from our call?' What went wrong?",
            options: [
              "The email was too long",
              "AI follow-up emails are always detected by email clients",
              "AI generated generic content that lacked the specific conversation details, agreed next steps, and personal tone that would have signalled genuine attention to this buyer",
              "The AE should have used a different AI tool",
            ],
            correct: 2,
            explanation:
              "AI cannot know what was actually said on a call, what the buyer's specific language was, what they got excited about, or what follow-up was specifically agreed. An unedited AI email signals the opposite of what a strong follow-up is meant to communicate: genuine attention and personalised value. Every AI-generated client-facing message needs AE editing for specificity and voice.",
          },
          {
            question:
              "A prospect says: 'Your price is 40% more than your competitor.' What is the most effective structure for handling this objection?",
            options: [
              "Offer an immediate discount to match the competitor's price",
              "Explain that competitors have lower quality and cannot be compared fairly",
              "Acknowledge the price difference, reframe the comparison on total value and ROI rather than licence cost, and isolate whether price alone is the blocker or whether other factors are also at play",
              "Ask the prospect to provide the competitor's pricing in writing before responding",
            ],
            correct: 2,
            explanation:
              "Effective objection handling follows a three-step pattern: acknowledge (never dismiss), reframe (shift from cost to value/ROI), and isolate (test whether price is the real issue or whether it is covering another concern). Discounting immediately signals that the original price was inflated; attacking competitors damages credibility; demanding written proof is adversarial.",
          },
        ],
        applyThisWeek: {
          action:
            "Draft the executive summary for one active proposal using the AI prompt structure, and build an objection bank for your most advanced deal. Use the objection bank in your next meeting with that account.",
          promptTemplate:
            "Write the executive summary for a proposal to [company], a [company description]. Their problem: [specific business problem with quantified impact]. Our solution: [solution description]. Quantified value: [ROI or specific business outcome]. Tone: direct, business-focused, confident. Length: 3 paragraphs. Avoid product feature lists — focus entirely on business problem and business value.",
          tool: "Claude",
        },
      },
      {
        id: "sales-ae-l4",
        title: "Building Your Personal AI Sales Playbook",
        duration: 19,
        description:
          "Design a repeatable, personalised AI-assisted selling workflow — from prospecting through close — that compounds efficiency over time and reflects your specific selling motion.",
        content: `## From Ad Hoc to Systematic

Most AEs who use AI do so inconsistently — trying it for one task, forgetting about it for three days, using it differently for each deal. The compounding efficiency gains come from systematising: the same high-quality prompt, used consistently for the same task type, every time.

## Mapping Your Selling Motion

Every AE has a selling motion — the sequence of activities that moves a deal from discovery to close in their specific market. Mapping AI touchpoints onto your specific selling motion is more valuable than generic AI adoption advice.

**Stage 1 — Research and qualification:** Account intelligence brief, MEDDIC gap analysis, stakeholder mapping.

**Stage 2 — Discovery:** Pre-call brief, discovery question bank, call debrief summary for CRM.

**Stage 3 — Solution presentation / demo:** Demo narrative arc, value quantification model, personalised deck talking points.

**Stage 4 — Proposal:** Executive summary, commercial summary, business case one-pager for the economic buyer.

**Stage 5 — Negotiation and close:** Objection bank, multi-stakeholder communication drafts, follow-up sequence.

\`\`\`
Prompt example — CRM call summary:
"Summarise the following call notes into a structured CRM opportunity update.
Format: (1) call summary (3 sentences), (2) key takeaways (3 bullets),
(3) MEDDIC updates — what new information was gathered for each element,
(4) agreed next steps with owner and date, (5) deal risk flags if any.
[Paste raw call notes]"
\`\`\`

## Building Your Prompt Library

Document the prompts that consistently produce good output for your selling context: your industry, your ICP, your product's value proposition, your typical deal structure. These prompts compound in value over time.

## Protecting Your Selling Voice

AI output sounds like AI. The AEs who win with AI are those who use it to generate structure and speed, then layer their own voice, relationship knowledge, and commercial judgment on top. Never send first-draft AI content to a buyer.

## Reviewing and Improving

Set a monthly review: which prompts are producing the best output? Which are you not using? Where is AI saving the most time? Where is it still creating rework?`,
        keyTakeaways: [
          "Systematising AI across your full selling motion — not using it ad hoc — is where compounding efficiency gains come from",
          "Map AI touchpoints onto your specific selling stages: research, discovery, presentation, proposal, negotiation",
          "A personal prompt library — tuned to your ICP, industry, and product — compounds in value with every iteration",
          "All AI output requires your voice, relationship context, and commercial judgment before it reaches a buyer",
        ],
        exercise: {
          title: "Personal AI Sales Playbook",
          description:
            "Build a one-page personal AI sales playbook: your selling stages, the AI touchpoints at each stage, and the three prompts you will use most consistently.",
          steps: [
            "Map your typical selling motion into 4–5 stages (e.g. research, discovery, proposal, close)",
            "For each stage, identify: the most time-consuming non-selling task and the AI use case that addresses it",
            "Prompt Claude: 'Help me build an AI-assisted sales playbook for an [Account Executive] selling [product type] to [ICP description]. For each stage of a [average deal length] sales cycle, identify: (1) the highest-impact AI use case, (2) the prompt structure to use, (3) time saved vs current approach.'",
            "Extract your top 3 prompts and save them with your own customisations to a personal document",
            "Commit to using these 3 prompts consistently for 30 days — then review what changed",
          ],
          tool: "Claude",
        },
        quiz: [
          {
            question:
              "Why does systematic AI use produce greater results than ad hoc AI use for AEs?",
            options: [
              "AI tools perform better when used more frequently due to personalisation algorithms",
              "Consistent use of the same high-quality prompts for the same task types builds a library of refined outputs that improve over time and eliminates the time cost of deciding when and how to use AI for each task",
              "Ad hoc use triggers AI rate limits",
              "Sales managers prefer systematic AI use on inspection calls",
            ],
            correct: 1,
            explanation:
              "Consistency is the compounding mechanism. An AE who uses the same pre-call brief prompt for every discovery call builds a refined prompt over time, creates predictable time savings, and eliminates the decision overhead of 'should I use AI for this, and how?' Ad hoc use produces occasional wins; systematic use produces structural efficiency improvement.",
          },
          {
            question:
              "An AE builds a personal prompt library for their selling context. What makes a prompt library valuable over time?",
            options: [
              "It allows the AE to share prompts with competitors",
              "Prompts become more refined with each iteration — tested against real buyer interactions, adjusted for what produces the most useful output, and increasingly tuned to the specific ICP and product",
              "AI tools provide better answers to frequently used prompts",
              "A prompt library replaces the need for sales training",
            ],
            correct: 1,
            explanation:
              "A prompt library compounds in value because each iteration teaches you what produces useful output vs what produces generic noise. Over time, the prompt library encodes AE expertise: which angles resonate with which buyer types, which objection framings work best, what structure produces the strongest executive summaries. This is intellectual capital that grows with use.",
          },
          {
            question:
              "An AE sends an AI-generated proposal summary to a CFO without editing it. The CFO responds that the financial projections are 'generic and don't reflect our conversation.' What is the root cause?",
            options: [
              "AI cannot generate financial content",
              "The AE used the wrong AI tool",
              "AI generated plausible-sounding financial language without access to the specific numbers, business context, and conversation history that would make it accurate and compelling for this CFO",
              "CFOs are resistant to AI-generated content on principle",
            ],
            correct: 2,
            explanation:
              "AI generates financial language that sounds credible but is not grounded in the actual numbers, specific conversation, or business context of a real deal. An AE must populate AI-generated proposal structures with the specific data, agreed metrics, and language from actual buyer conversations. AI provides the structure; the AE provides the substance.",
          },
        ],
        applyThisWeek: {
          action:
            "Build your personal AI sales playbook — map your selling stages, identify the AI touchpoint at each stage, and commit to using three specific prompts consistently for 30 days. Review at the end of the month.",
          promptTemplate:
            "Help me build an AI sales playbook for an Account Executive selling [product/solution category] to [ICP: company type, size, buyer role]. Our typical deal length is [X weeks/months] and average deal value is [range]. For each stage of the sales cycle (research, discovery, solution presentation, proposal, close), identify: (1) the highest-impact AI use case, (2) the prompt structure to use, (3) expected time saving, (4) quality gate before sending to buyer.",
          tool: "Claude",
        },
      },
    ],
  },

  sdr: {
    title: "AI for SDRs and BDRs",
    description:
      "Practical AI skills for SDRs and BDRs — building pipeline at scale with personalised outreach, smart prospect research, and call prep that books more meetings.",
    lessons: [
      {
        id: "sales-sdr-l1",
        title: "AI for SDRs: Volume, Personalisation, and Pipeline at Scale",
        duration: 16,
        description:
          "Understand where AI changes the SDR role — how it enables genuine personalisation at volume, compresses research time, and lets you focus on the conversations that matter.",
        content: `## The SDR's Core Tension

The SDR role lives in a permanent tension: volume and personalisation are in direct conflict. High-volume outreach at scale produces low response rates. Deep personalisation produces strong responses but does not scale. AI resolves this tension — enabling genuine personalisation at a volume that would previously have required a team to produce.

## Where AI Changes the SDR Game

**Prospect research:** Understanding a prospect's company, role, recent activity, and likely challenges in 5 minutes rather than 30.

**Personalised outreach drafting:** First-line personalisation, tailored subject lines, and contextualised cold emails that reference real signals rather than generic pain points.

**Sequence building:** Structuring multi-touch outreach sequences with variation across channels and touchpoints.

**Call preparation:** Discovery question generation, likely objection prep, and company-specific pain point hypotheses before every call.

**List building assistance:** Using AI to identify trigger events, refine ICP criteria, and generate criteria for list qualification.

\`\`\`
Prompt example — personalised cold email:
"Write a personalised cold email to [Sarah, VP of Customer Success] at [TechCorp],
a [B2B SaaS company, 300 employees, recently raised Series B].
Signal to personalise on: [they just announced a 40% headcount expansion in CS].
I'm selling [a customer onboarding platform]. Pain hypothesis: [rapid CS team growth
creates onboarding consistency problems]. Under 100 words. Direct, not salesy.
One clear CTA: 15-minute call."
\`\`\`

## What AI Does Not Fix

AI cannot replace consistent calling activity, relationship authenticity, or the resilience required to handle rejection at volume. The SDRs who thrive with AI are those who use it to spend more time having genuine conversations — not to hide from the phone.

## The Volume Trap

More outreach is not better if it is generic. AI-assisted personalisation at lower volume consistently outperforms template blasting at high volume. Quality-adjusted volume is the metric that matters.`,
        keyTakeaways: [
          "AI resolves the SDR tension between volume and personalisation — enabling genuine personalisation at scale that was previously impossible",
          "The highest-leverage AI tasks for SDRs are prospect research, personalised email drafting, sequence building, and call preparation",
          "Quality-adjusted volume (personalised outreach that converts) outperforms raw volume (generic blasting) — AI makes quality-adjusted volume sustainable",
          "AI enables more conversations — it does not replace the resilience, authenticity, and consistent activity that define top-performing SDRs",
        ],
        exercise: {
          title: "Personalised Outreach vs Generic Template Comparison",
          description:
            "Build both a generic template and an AI-personalised version for the same prospect and evaluate the difference.",
          steps: [
            "Choose a live prospect from your current target list",
            "Write the email you would typically send using your existing template (take no more than 2 minutes)",
            "Research the prospect for 5 minutes: company website, LinkedIn, recent news, any trigger events",
            "Prompt Claude: 'Write a personalised cold email to [prospect role] at [company]. Signal: [specific trigger or context]. I'm selling [solution]. Pain hypothesis: [what their specific challenge likely is based on context]. Under 100 words, direct tone, one CTA.'",
            "Compare the two versions — note the specific differences that make the personalised version more likely to convert, and how long each took",
          ],
          tool: "Claude",
        },
        quiz: [
          {
            question:
              "How does AI resolve the SDR tension between volume and personalisation?",
            options: [
              "AI allows SDRs to send more templates faster, increasing overall volume",
              "AI eliminates the need for personalisation by making generic templates more persuasive",
              "AI compresses prospect research and personalised drafting time to minutes per prospect — making genuine personalisation sustainable at the volume SDR roles require",
              "AI replaces cold calling with automated email sequences",
            ],
            correct: 2,
            explanation:
              "The volume-personalisation tension exists because personalised research and drafting has historically taken 20–40 minutes per prospect — impossible at volume. AI reduces this to 5–10 minutes without sacrificing genuine personalisation. This is the structural shift: quality-adjusted volume at scale becomes achievable.",
          },
          {
            question:
              "An SDR team switches from manual personalisation (5 emails per day, deeply researched) to AI-assisted personalisation (25 emails per day, moderately researched and personalised). What is the most likely result?",
            options: [
              "Response rates will fall because AI-generated emails are always detected",
              "Response rates may increase modestly while pipeline volume increases significantly — the net result is more qualified meetings booked",
              "The team will burn through their prospect lists faster without generating more meetings",
              "Email deliverability will decline due to increased sending volume",
            ],
            correct: 1,
            explanation:
              "The math of SDR outreach is: meetings booked = (emails sent) × (response rate) × (qualification rate). AI typically maintains or slightly improves response rates vs generic templates while dramatically increasing volume — producing more absolute meetings even if per-email response rate is marginally lower than fully manual deep research.",
          },
          {
            question:
              "Which SDR activity does AI NOT significantly improve?",
            options: [
              "Prospect research and trigger event identification",
              "First-line personalisation in cold outreach",
              "Building the resilience to handle high volumes of rejection and maintain consistent calling activity",
              "Drafting multi-touch outreach sequences",
            ],
            correct: 2,
            explanation:
              "Rejection resilience, psychological fortitude, and the discipline to maintain consistent activity through difficult periods are character and habit qualities — not information processing tasks. These are what separate top-performing SDRs from average ones, and they are irreducibly human.",
          },
        ],
        applyThisWeek: {
          action:
            "Replace your standard cold email template with an AI-personalised version for 20 prospects this week. Track response rates and compare to your baseline. Identify the two most effective personalisation signals.",
          promptTemplate:
            "Write a personalised cold email to [prospect role] at [company name], a [company description]. Signal to personalise on: [trigger event or specific context]. I'm selling [solution]. Pain hypothesis: [what their specific challenge likely is]. Keep it under 100 words. Direct tone, not salesy. One clear CTA: [desired next step].",
          tool: "Claude",
        },
      },
      {
        id: "sales-sdr-l2",
        title: "Prospect Research and List Building with AI",
        duration: 18,
        description:
          "Use AI to build higher-quality prospect lists, identify buying signals faster, and qualify prospects before outreach — so every message goes to someone who could actually buy.",
        content: `## The List Quality Problem

The fastest way to improve SDR output is to improve list quality. Sending 100 highly targeted, signal-driven emails to the right prospects consistently outperforms sending 1,000 emails to a loosely defined ICP. AI compresses the research required to identify high-quality targets and qualify them before first contact.

## Refining Your ICP with AI

Many SDRs work with a loosely defined ICP that has never been rigorously stress-tested. AI can help tighten ICP criteria by asking the right questions.

\`\`\`
Prompt example — ICP refinement:
"Help me refine my ICP for a [contract management SaaS] solution. Current ICP:
[B2B companies, 200–1,000 employees, any industry].
Ask me 10 questions that would help me identify the specific company characteristics,
buying triggers, and role combinations most likely to result in a successful sale.
Then use my answers to write a more precise ICP definition."
\`\`\`

## Identifying Buying Signals and Trigger Events

Timing is everything in outbound. Reaching a prospect during a buying trigger — a funding round, leadership change, geographic expansion, headcount growth, or compliance change — dramatically increases conversion. AI helps identify and interpret these signals faster.

\`\`\`
Prompt example — trigger event research:
"What trigger events should I look for that suggest a [mid-market legal department]
might be evaluating [contract management software]? List 8 specific signals,
where to find them, and what the pain hypothesis is for each."
\`\`\`

## Qualifying Prospects Before Contact

Before sending an email or making a call, a 5-minute AI-assisted qualification check can save 30 minutes of outreach effort on a prospect who cannot buy: wrong company size, no budget authority, technology stack incompatibility, or recent competitor win.

## Building Targeted Lists

AI can help generate criteria for list building tools (Sales Navigator, Apollo, ZoomInfo) — translating ICP characteristics into specific filter combinations that produce tighter, more qualified prospect lists.`,
        keyTakeaways: [
          "ICP quality directly determines outreach quality — AI helps tighten ICP criteria through structured questioning, not assumption",
          "Trigger event targeting dramatically outperforms timing-blind outreach — AI identifies and interprets buying signals faster than manual monitoring",
          "A 5-minute AI-assisted pre-outreach qualification check saves 30 minutes on prospects who cannot buy",
          "List building tool filters (Sales Navigator, Apollo) should be derived from a precise ICP — AI helps translate ICP criteria into specific filter parameters",
        ],
        exercise: {
          title: "ICP Refinement and Trigger Event Mapping",
          description:
            "Stress-test your current ICP with AI and build a trigger event monitoring framework for your target market.",
          steps: [
            "Write your current ICP definition (company size, industry, role, technology, any other criteria)",
            "Prompt Claude: 'My current ICP is: [paste definition]. Ask me 8 questions that would help identify the most specific characteristics, buying triggers, and disqualifying factors within this ICP. Then use my answers to produce a more precise ICP definition.'",
            "Answer Claude's questions honestly based on your best deals and lost deals",
            "Prompt: 'Now list 8 specific trigger events that suggest a company within this ICP might be actively evaluating solutions like mine. For each, tell me: where to find the signal, how to interpret it, and what the pain hypothesis is.'",
            "Build a one-page trigger event cheat sheet you can reference when researching prospects",
          ],
          tool: "Claude",
        },
        quiz: [
          {
            question:
              "Why does trigger-event-based outreach outperform timing-blind outreach?",
            options: [
              "Trigger events allow SDRs to send more personalised subject lines",
              "Buyers who have recently experienced a trigger event are actively aware of a pain or change — making them more receptive to a relevant solution at that specific moment",
              "Trigger events are required by GDPR for cold outreach compliance",
              "Sales Navigator requires trigger events for contact export",
            ],
            correct: 1,
            explanation:
              "Trigger events (funding, leadership change, expansion, compliance requirement) create a window of change-readiness — the prospect is already thinking about what needs to change in their business. Outreach timed to this window competes with a live, felt need rather than trying to create urgency from scratch.",
          },
          {
            question:
              "An SDR has a loosely defined ICP: 'B2B technology companies, 100–2,000 employees.' What is the primary problem with this definition?",
            options: [
              "The employee range is too broad for Sales Navigator to filter effectively",
              "It does not comply with GDPR targeting requirements",
              "It is too vague to enable meaningful qualification — most companies would technically match, producing a list of low-signal prospects with very different needs and buying dynamics",
              "B2B technology companies are too competitive to target effectively",
            ],
            correct: 2,
            explanation:
              "An ICP that matches most companies provides no targeting guidance. An effective ICP specifies: company stage, revenue range, technology stack characteristics, specific roles involved in the buying decision, trigger events that create buying urgency, and disqualifying factors. The more specific the ICP, the higher the outreach relevance and conversion rate.",
          },
          {
            question:
              "What should an SDR do when AI-assisted research reveals a prospect is likely a wrong-fit before first contact?",
            options: [
              "Send the outreach anyway — the prospect's situation may have changed",
              "Add the prospect to a lower-priority nurture sequence rather than removing them",
              "Remove them from the active list and document the disqualification criteria so the same type of prospect is not added in future",
              "Ask a manager whether to proceed",
            ],
            correct: 2,
            explanation:
              "Pre-contact disqualification is one of the highest-value SDR activities. Time spent on wrong-fit prospects is opportunity cost — it is time not spent on prospects who can actually buy. Documenting disqualification criteria also improves list-building quality over time, preventing the same profile from being added in future.",
          },
        ],
        applyThisWeek: {
          action:
            "Refine your ICP using the AI questioning framework and build a trigger event cheat sheet for your target market. Apply both to your next 25 prospects before adding them to your active sequence.",
          promptTemplate:
            "Help me identify the 8 most valuable buying signals and trigger events for [product/solution type] sold to [ICP description]. For each trigger event: (1) what the signal is, (2) where to find it (LinkedIn, company news, job postings, etc.), (3) the pain hypothesis it creates, (4) the opening line I should use in my outreach to reference it naturally.",
          tool: "Claude",
        },
      },
      {
        id: "sales-sdr-l3",
        title: "Personalised Outreach Sequences and Cold Email with AI",
        duration: 19,
        description:
          "Build high-converting cold email sequences with genuine personalisation at every touchpoint — using AI to produce first drafts that you edit into your own voice.",
        content: `## Why Most Cold Email Fails

Most cold email fails for one of three reasons: no personalisation (the prospect knows it is a template), no relevant pain (the email talks about the product rather than the prospect's problem), or no clear reason to respond (the CTA is vague or commitment-heavy). AI helps with all three — if used correctly.

## The Anatomy of a High-Converting Cold Email

**Subject line:** Specific, not clickbait. References a signal or the prospect's context.

**First line:** Genuine personalisation — not 'I saw you went to [university]' but something specific to their role, company news, or apparent challenge.

**Pain bridge:** One or two sentences connecting their likely situation to a pain that your solution addresses. Hypothesis-driven, not assumed.

**Value statement:** What you do, in one sentence, for people like them — not feature-listed.

**CTA:** Low-commitment. 'Would a 15-minute call be worth 20 minutes of your time?' beats 'Let me know a time that works for a full discovery call.'

\`\`\`
Prompt example — full sequence:
"Build a 4-touch cold outreach sequence for [Director of Finance] at a [mid-market
manufacturing company that recently raised debt financing].
Signal: [they just expanded their finance team by 40% per LinkedIn].
I'm selling [spend management software]. Sequence:
Email 1 (day 1): personalised cold email, under 100 words.
Email 2 (day 5 if no reply): different angle, add a relevant insight or stat.
Email 3 (day 12 if no reply): pattern interrupt — shorter, direct, almost a question only.
Email 4 (day 20 if no reply): breakup email, leave door open."
\`\`\`

## Multi-Channel Sequences

AI can help design sequences that combine email with LinkedIn connection requests, LinkedIn messages, and phone call timing — creating a coordinated multi-channel approach rather than email-only.

## Editing for Voice

The most important step: edit every AI-drafted email until it sounds like you. Your voice, your natural phrasing, your conversational style — these create authenticity. Generic AI language creates exactly the opposite impression.`,
        keyTakeaways: [
          "Cold email fails from lack of personalisation, irrelevant pain framing, or a commitment-heavy CTA — AI directly addresses all three when used with the right prompt structure",
          "A four-touch sequence with a distinct approach at each touchpoint (angle variation, pattern interrupt, breakup) consistently outperforms single-touch campaigns",
          "Multi-channel sequences (email + LinkedIn + phone) dramatically outperform email-only — AI helps design the coordinated approach",
          "Editing AI drafts until they sound like your natural voice is non-negotiable — generic AI language destroys the authenticity that personalisation is trying to create",
        ],
        exercise: {
          title: "Build a Four-Touch Sequence for Your Top Prospect",
          description:
            "Create a complete four-touch multi-channel outreach sequence for one high-priority prospect — then edit each message until it sounds exactly like you.",
          steps: [
            "Choose your top prospect this week — someone you have identified as high-fit with a clear trigger event",
            "Prompt Claude: 'Build a 4-touch cold outreach sequence for [role] at [company]. Signal: [trigger event]. I'm selling [solution]. Pain hypothesis: [their likely challenge]. Sequence: Email 1 (day 1, under 100 words), Email 2 (day 5, different angle), Email 3 (day 12, pattern interrupt — shorter), LinkedIn message (between email 1 and 2), Email 4 (day 20, breakup).'",
            "Read each message out loud — edit any sentence that you would not say in a real conversation",
            "Add one specific, personal detail to each touchpoint that AI could not have known",
            "Send the sequence and track opens, replies, and calls booked",
          ],
          tool: "Claude",
        },
        quiz: [
          {
            question:
              "Which of the following subject lines is most likely to generate an open from a busy VP of Finance?",
            options: [
              "'Improve your financial processes with our award-winning platform'",
              "'Quick question about Acme Corp's Q4 spend visibility'",
              "'[First name], are you open to learning about spend management?'",
              "'How leading CFOs are saving 23% on operational spend'",
            ],
            correct: 1,
            explanation:
              "The highest-performing subject lines are specific (reference the company or an element of the prospect's situation) and imply relevance without making a claim. Generic benefit statements ('award-winning,' 'improve your processes') are immediately identified as sales email. First-name-only openers feel manipulative. Broad benchmarks work better in email body than subject line.",
          },
          {
            question:
              "What is the purpose of a 'pattern interrupt' in the third touch of a cold email sequence?",
            options: [
              "To use bold or italic formatting that stands out visually in the inbox",
              "To switch to a completely different topic to confuse the prospect into replying",
              "To break the expectations built by the first two touches with a dramatically different format — shorter, more direct, sometimes just a question — to provoke a response from a prospect who has gone quiet",
              "To mention a competitor to create urgency",
            ],
            correct: 2,
            explanation:
              "By the third touch, a prospect who has not replied has effectively decided to ignore the pattern of your outreach. A pattern interrupt disrupts this — by being unexpectedly brief, unusually direct, or structured as a single genuine question rather than a sales pitch. It breaks the 'this is another sales email' mental model and can prompt a response that the previous touches did not.",
          },
          {
            question:
              "Why is editing AI-generated cold emails until they sound like your natural voice critical to sequence performance?",
            options: [
              "AI emails trigger spam filters in major email clients",
              "Sales managers require all outreach to be human-written",
              "Generic AI language produces a homogeneous, corporate tone that undermines the personalisation the email is attempting — authenticity is what makes personalisation work",
              "Prospects can algorithmically detect AI-written content",
            ],
            correct: 2,
            explanation:
              "Personalisation works because it signals genuine attention — 'this person actually looked at my situation.' If the email reads as corporate AI output, the personalisation is undermined: the prospect feels they received a slightly customised template, not a genuine individual message. Your natural voice, phrasing, and conversational style are what make personalisation believable.",
          },
        ],
        applyThisWeek: {
          action:
            "Build and send a four-touch sequence to your top 10 prospects this week. Read every message out loud before sending. Track response rates and identify which touch and angle generated the most replies.",
          promptTemplate:
            "Build a 4-touch cold outreach sequence for [prospect role] at [company name]. Signal to reference: [trigger event]. I'm selling [solution]. Pain hypothesis: [specific challenge]. Format: Email 1 (day 1, under 100 words, personalised open, pain bridge, value statement, low-commitment CTA), Email 2 (day 5, different angle or insight), Email 3 (day 12, pattern interrupt — 3 sentences max), Email 4 (day 20, honest breakup, leave door open).",
          tool: "Claude",
        },
      },
      {
        id: "sales-sdr-l4",
        title: "Call Prep, Discovery Questions, and Booking More Meetings with AI",
        duration: 17,
        description:
          "Use AI to prepare for every cold call and discovery conversation — with tailored openers, sharp discovery questions, and confident objection responses that turn more conversations into booked meetings.",
        content: `## Why Call Preparation Matters

The SDRs who book the most meetings are not necessarily the most naturally confident — they are the most prepared. A prospect senses within the first 30 seconds whether an SDR knows their business or is reading from a generic script. Preparation creates the credibility that earns the next 3 minutes of conversation.

## The 5-Minute AI Call Prep Brief

For every cold call, a 5-minute AI prep brief produces better outcomes than 30 minutes of unfocused research.

\`\`\`
Prompt example — cold call prep:
"I'm cold calling [Michael, Head of IT] at [RetailCo], a [250-person retail company
that recently announced a digital transformation initiative].
I'm selling [cybersecurity awareness training].
Give me: (1) a 2-sentence personalised opener that references their context,
(2) the most likely IT pain point for someone in his role at this stage,
(3) 3 discovery questions to understand whether they're a fit,
(4) the 2 most likely objections and a confident response to each,
(5) a clear CTA for the call — what am I trying to get?"
\`\`\`

## Discovery Question Excellence

The quality of a discovery call determines whether you book a meeting or waste 20 minutes. Strong discovery questions are specific, open-ended, hypothesis-driven, and connect to the prospect's context — not generic sales framework questions.

## Handling Common SDR Objections

'I'm not interested' — you have 5 seconds to earn 60 seconds.
'Send me an email' — the call is not over.
'We're already using [competitor]' — this is an opening, not a close.
'Not the right time' — diagnose whether this is real or a deflection.

AI can generate confident, non-pushy responses for each of these that you practise until they are natural.

## The Booking Mindset

Every call has one goal: get the meeting. Not educate the prospect, not pitch the product, not build the relationship. Book the meeting. AI prep should be structured entirely around: what do I need to say to earn the right to 30 minutes?`,
        keyTakeaways: [
          "A 5-minute AI call prep brief — opener, pain hypothesis, discovery questions, objection responses, CTA — consistently outperforms unfocused manual research",
          "Discovery questions that are specific, hypothesis-driven, and contextualised to the prospect outperform generic BANT questions",
          "Standard SDR call objections ('not interested,' 'send me an email,' 'wrong time') should be prepared for before every call — not improvised in the moment",
          "Every cold call has one goal: book the meeting — AI prep should be structured entirely around earning the right to 30 minutes",
        ],
        exercise: {
          title: "Call Prep for Tomorrow's Calls",
          description:
            "Use AI to build a call prep brief for every cold call you plan to make tomorrow — then practise your objection responses out loud.",
          steps: [
            "List the 5 prospects you plan to call tomorrow",
            "For each, do 3 minutes of research: company, role, any trigger event or context",
            "Prompt Claude for each: 'I'm calling [role] at [company, description]. Trigger/context: [X]. I'm selling [solution]. Give me: personalised 2-sentence opener, top pain hypothesis, 3 discovery questions, 2 likely objections with responses, and my one clear CTA.'",
            "Read the objection responses for each prospect out loud at least twice — edit any that do not sound natural coming from you",
            "After each call, note: which prep element was most useful, what objection you were NOT prepared for",
          ],
          tool: "Claude",
        },
        quiz: [
          {
            question:
              "Why is a personalised opener more effective than 'Hi, I'm [name] from [company]' on a cold call?",
            options: [
              "Longer openers keep prospects on the line longer",
              "A personalised opener demonstrates that you have done specific research on the prospect — creating a credibility signal within the first 10 seconds that earns the next 30 seconds of conversation",
              "Personalised openers are required by cold calling regulations",
              "Generic openers trigger call blocking software",
            ],
            correct: 1,
            explanation:
              "The first 10 seconds of a cold call determine whether you get 30 more seconds. A generic opener ('Hi, I'm calling from X company') immediately signals a random dial. A personalised opener ('I noticed you just announced a digital transformation initiative at RetailCo — I wanted to call specifically because of that') signals preparation and relevance, earning the credibility to continue.",
          },
          {
            question:
              "A prospect says 'Just send me an email' within the first 20 seconds of a cold call. What is the most effective response?",
            options: [
              "'Of course — what's your email address?'",
              "'I can do that — but before I do, can I ask one quick question to make sure the email is relevant to you? [pause for confirmation, then ask the qualification question]'",
              "'I'd prefer to explain our solution on the call if you have 2 minutes'",
              "'We don't do email outreach — calls only'",
            ],
            correct: 1,
            explanation:
              "'Send me an email' is often a soft deflection, not a genuine request. The most effective response acknowledges it, commits to the email, but uses the permission to ask one qualifying question — which either qualifies the prospect (allowing a better-targeted email) or continues the conversation. This approach respects the prospect's stated preference while not immediately ending the call.",
          },
          {
            question:
              "What is the single goal of an SDR cold call?",
            options: [
              "Educate the prospect about all the features of the product",
              "Qualify the prospect against the full BANT framework",
              "Book a meeting — every call question and response should be structured around earning the right to 30 minutes of the prospect's time",
              "Get the prospect to agree they have a problem",
            ],
            correct: 2,
            explanation:
              "Cold calls are not discovery calls and not demos. They are credibility-building conversations with one goal: earn the right to a longer conversation with a more qualified prospect. Trying to fully educate, fully qualify, or pitch on a cold call typically loses the prospect before the goal is achieved. Prep, opener, one pain hypothesis, three questions, CTA — book the meeting.",
          },
        ],
        applyThisWeek: {
          action:
            "Run AI call prep for every cold call you make this week. Track which prep element (opener, pain hypothesis, objection response) was most useful. Build your personal objection response bank from what you learn.",
          promptTemplate:
            "I'm cold calling [prospect role] at [company name], a [company description]. Trigger or context: [any relevant signal]. I'm selling [solution]. Give me: (1) a 2-sentence personalised opener referencing their context, (2) the most likely pain point for this person in their role, (3) 3 open-ended discovery questions, (4) 2 most likely objections with confident non-pushy responses, (5) my one clear CTA — what I'm trying to book.",
          tool: "Claude",
        },
      },
    ],
  },

  am: {
    title: "AI for Account Managers",
    description:
      "Practical AI skills for Account Managers — protecting and growing your book with better QBR preparation, smarter renewal intelligence, and proactive coverage at scale.",
    lessons: [
      {
        id: "sales-am-l1",
        title: "AI for Account Managers: Protecting and Growing Your Book",
        duration: 16,
        description:
          "Understand where AI creates leverage for Account Managers — compressing QBR preparation, identifying expansion signals, and maintaining proactive coverage across a large book of accounts.",
        content: `## The Account Manager's Competing Demands

Account Managers are pulled in three directions simultaneously: retaining existing revenue (churn prevention), growing existing accounts (expansion), and ensuring customers are getting value (success and adoption). In a book of 30–80 accounts, giving each account the attention it deserves is structurally impossible without tools that compress the time required for each activity.

## Where AI Creates AM Leverage

**QBR preparation:** Business reviews take hours to prepare well. AI compresses account research, data narrative building, and slide talking point generation from days to hours.

**Renewal intelligence:** Identifying churn signals — declining usage, stakeholder changes, support ticket patterns, competitive activity — before they become loss risks.

**Expansion signal identification:** Spotting growth opportunities: headcount increases, new business units, adjacent use cases, product feature adoption patterns.

**Proactive communication:** Maintaining regular, value-adding touchpoints across a large book without every account getting generic newsletter-style updates.

**Account strategy documentation:** Building account plans, stakeholder maps, and risk assessments that most AMs never have time to document.

\`\`\`
Prompt example — account health summary:
"Create a structured account health summary for [Acme Corp], a customer since [18 months].
Context: [ARR: £85k, 3 licences, primary contact is VP Operations, renewal in 4 months,
recent support tickets: 3 in last month on [feature X], usage down 12% QoQ,
expansion conversation attempted 2 months ago — stalled on budget].
Include: health score assessment, top risk factors, top expansion signals,
recommended next 3 actions, and renewal risk rating."
\`\`\`

## The Proactive Account Manager Advantage

Reactive AMs learn about problems when customers call. Proactive AMs identify risks before they become problems and opportunities before competitors do. AI makes proactive coverage sustainable across a full book — not just the top 10 accounts.`,
        keyTakeaways: [
          "AI creates the most AM leverage in QBR preparation, renewal intelligence, expansion signal identification, and proactive communication at scale",
          "Account health summaries built with AI help AMs triage a full book and focus human time where it matters most",
          "Proactive account management — identifying risks and opportunities before they surface — is the competitive advantage AI makes sustainable across a large book",
          "The goal is not to automate account management — it is to give AMs the intelligence and time to be genuinely proactive with every account",
        ],
        exercise: {
          title: "Account Health Audit",
          description:
            "Use AI to build a structured health summary for your three highest-risk accounts and produce a prioritised action plan.",
          steps: [
            "Identify your three accounts you are most concerned about from a renewal or churn perspective",
            "For each, gather the key data: ARR, tenure, usage trends, last meaningful contact, open support issues, any stakeholder changes, previous expansion attempts",
            "Prompt Claude for each: 'Create an account health summary for [company]. Context: [paste data]. Include: health assessment, top 3 risk factors, recommended next 3 actions with priority, and renewal risk rating (High/Medium/Low).'",
            "Review the summaries — add any context AI does not have (relationship quality, political dynamics, verbal commitments)",
            "Build a one-week action plan from the three highest-priority actions across all three accounts",
          ],
          tool: "Claude",
        },
        quiz: [
          {
            question:
              "What is the primary risk of a reactive account management approach in a book of 50+ accounts?",
            options: [
              "Reactive AMs spend too much time on low-value accounts",
              "Reactive AMs only learn about problems when customers raise them — meaning churn and competitive threats are often identified too late to prevent them",
              "Reactive approaches reduce QBR attendance rates",
              "Reactive AMs cannot identify upsell opportunities",
            ],
            correct: 1,
            explanation:
              "By the time a customer raises a problem, they have often already begun evaluating alternatives or made an internal decision. Reactive account management means you are always responding to a situation that has been developing for weeks or months — with far less leverage to turn it around. Proactive intelligence (usage signals, stakeholder changes, support patterns) creates time to intervene before the decision is made.",
          },
          {
            question:
              "An AM has a book of 60 accounts and currently does detailed account reviews for the top 10 by ARR. What is the problem with this approach?",
            options: [
              "The top 10 accounts should receive less attention — they are already retained",
              "Churn and expansion opportunities exist across the full book — accounts outside the top 10 can represent significant cumulative ARR risk or growth that goes unmanaged",
              "Account reviews are not necessary for accounts under a certain ARR threshold",
              "This approach violates standard account management practice",
            ],
            correct: 1,
            explanation:
              "The accounts an AM does not actively manage are the ones most likely to churn quietly or to be expanded by a competitor. Collectively, the bottom 50 accounts in a book often represent as much ARR as the top 10. AI makes it economically feasible to maintain structured intelligence and proactive coverage across the full book, not just the largest accounts.",
          },
          {
            question:
              "Which combination of signals most strongly indicates an account at risk of churn?",
            options: [
              "High usage, frequent support tickets, multiple stakeholders engaged",
              "Declining usage, primary stakeholder departure, no QBR attendance, recent competitor inquiry",
              "Low usage in month 1 followed by recovery, one support ticket",
              "Delayed renewal signature with no other risk signals",
            ],
            correct: 1,
            explanation:
              "Churn risk compounds with multiple concurrent signals. Declining usage indicates decreasing value realisation; stakeholder departure removes the internal champion; missed QBRs indicate disengagement; competitor inquiry indicates active evaluation. Any single signal warrants attention; multiple concurrent signals require immediate priority escalation.",
          },
        ],
        applyThisWeek: {
          action:
            "Build AI-generated account health summaries for your five highest-risk accounts and your five highest-expansion-potential accounts. Create a two-week action plan from the output.",
          promptTemplate:
            "Create a structured account health summary for [company name], a customer for [tenure]. ARR: [X], contacts: [names and roles], renewal: [date], usage trend: [direction], recent support issues: [summary], last meaningful engagement: [date], expansion potential: [context]. Include: overall health rating, top 3 risk factors, top 3 expansion opportunities, recommended next 3 actions with owner and timeline.",
          tool: "Claude",
        },
      },
      {
        id: "sales-am-l2",
        title: "QBR and Business Review Preparation with AI",
        duration: 18,
        description:
          "Use AI to prepare Business Reviews that demonstrate genuine value, advance the relationship, and open expansion conversations — rather than presenting slides the customer already has.",
        content: `## What Makes a QBR Worth Attending

Customers dread QBRs when they expect a slide deck full of usage metrics they can see themselves in the platform. They value QBRs when they expect strategic conversation: what is changing in their business, where are they getting value, what should change in how they use the product, and what does the next 12 months look like.

AI compresses the preparation required to run the second type of QBR — and helps structure an agenda that keeps conversation at the centre.

## Building the QBR Data Narrative

Usage data is not a story. The AM's job is to turn data into a narrative: here is what you set out to achieve, here is what the data shows about progress, here is where we should focus next.

\`\`\`
Prompt example — QBR narrative:
"Help me build the narrative for a QBR with [Acme Corp]. Context:
They bought [our platform] 12 months ago with these goals: [reduce contract review time
by 50%, improve cross-team visibility on active deals].
Current usage data: [average review cycle now 4.2 days vs 8.1 days previously,
3 of 5 teams actively using, 2 teams have < 20% adoption].
Draft: (1) a 3-paragraph executive narrative (what you set out to achieve, what we
see in the data, what the next focus area is), (2) 3 discussion questions to make this
a conversation, (3) the expansion angle most natural to raise from this context."
\`\`\`

## Pre-QBR Research

Before every QBR, understand what has changed in the customer's business since your last review. AI can help synthesise public signals: news, hiring patterns, leadership changes, financial results, strategic announcements.

## The Expansion Conversation

Every QBR should include a natural expansion moment — not a pitch, but a strategic conversation: 'Given what we are seeing in your data and what you have told us about [upcoming initiative], we think there may be value in exploring [adjacent capability].' AI helps structure this moment in the QBR narrative so it feels earned, not bolted on.

## Follow-Up After the QBR

A strong post-QBR summary — key takeaways, agreed actions, next milestone — maintains momentum and accountability. AI drafts this in minutes from your notes.`,
        keyTakeaways: [
          "QBRs are worth attending when they drive strategic conversation about business outcomes — not when they present metrics the customer already has",
          "The AM's job is to turn usage data into a narrative: goals set, progress shown, next focus defined",
          "Pre-QBR research into what has changed in the customer's business demonstrates the level of attention that differentiates trusted partners from vendors",
          "Expansion conversations should be structured into the QBR narrative as a natural progression from value demonstration, not as an add-on pitch",
        ],
        exercise: {
          title: "QBR Narrative Builder",
          description:
            "Use AI to build the core narrative and discussion questions for your next Business Review — then layer in the relationship context only you have.",
          steps: [
            "Choose your next upcoming QBR",
            "Gather: the customer's original goals when they purchased, current usage data highlights, any major account events since last QBR (stakeholder changes, business initiatives, support issues)",
            "Prompt Claude: 'Build the QBR narrative for [company]. Goals: [X]. Current data: [Y]. Business context: [Z]. Include: 3-paragraph executive narrative (goals, progress, next focus), 4 discussion questions to drive conversation, the most natural expansion angle given the context, and 3 things to confirm as agreed actions by the end of the meeting.'",
            "Review and annotate with relationship-specific context the AI does not have",
            "Build the QBR agenda around the discussion questions, not around the slides",
          ],
          tool: "Claude",
        },
        quiz: [
          {
            question:
              "A customer skips two consecutive QBRs. What does this most likely indicate?",
            options: [
              "Their schedule is unusually full — QBRs are low priority when business is busy",
              "Declining engagement, possibly indicating reduced perceived value of the relationship or the product — a churn signal requiring immediate attention",
              "They prefer asynchronous updates to live meetings",
              "The AM has not provided enough notice for the QBR scheduling",
            ],
            correct: 1,
            explanation:
              "Customers who are getting value from a vendor prioritise QBRs because the conversation is useful. When customers cancel or skip consistently, it typically signals disengagement — they do not see the meeting as worth their time. This is a churn indicator that warrants a direct conversation about whether the relationship is delivering what was expected.",
          },
          {
            question:
              "Why should expansion conversations happen within the QBR narrative rather than as a separate pitch at the end?",
            options: [
              "Pitching after the main agenda reduces meeting time",
              "When expansion is framed as a natural progression from the value conversation — 'given what we have achieved together and what you have told us is coming' — it feels earned and strategic rather than opportunistic",
              "QBR attendees are more receptive to sales pitches after reviewing usage data",
              "Post-agenda expansion conversations require a separate opportunity in the CRM",
            ],
            correct: 1,
            explanation:
              "The quality of an expansion conversation depends on the emotional context it arises in. If the QBR has demonstrated genuine value and the AM has shown deep knowledge of the customer's business direction, an expansion conversation feels like a natural strategic recommendation from a trusted partner. Bolted on at the end, it feels like a pitch — undermining the relationship work of the previous hour.",
          },
          {
            question:
              "What is the most important difference between a strong QBR and a poor one?",
            options: [
              "A strong QBR includes more slides and more detailed usage data",
              "A strong QBR is driven by discussion questions and customer input rather than AM monologue — the customer does more than 50% of the talking",
              "A strong QBR includes a product roadmap presentation",
              "A strong QBR is shorter — under 45 minutes",
            ],
            correct: 1,
            explanation:
              "The most common QBR failure mode is the AM presenting at the customer for an hour. A strong QBR uses data and narrative as a launch pad for genuine two-way conversation — about the customer's evolving priorities, what is working, what is not, and where to focus next. Discussion questions are the structural mechanism for this. The customer talking is how the AM learns what is really going on.",
          },
        ],
        applyThisWeek: {
          action:
            "Prepare your next QBR using an AI-built narrative and agenda. Redesign the session structure so discussion questions drive 60% of the meeting time. Note how the customer engagement level differs from previous reviews.",
          promptTemplate:
            "Build a QBR preparation pack for [company name]. Original goals: [list]. Current data highlights: [key metrics with context]. Business context changes since last review: [any relevant developments]. Include: (1) 3-paragraph executive narrative (goals set, progress shown, next focus), (2) 4 strategic discussion questions, (3) the most natural expansion angle from this context, (4) 3 agreed actions to confirm by end of meeting, (5) post-QBR follow-up email structure.",
          tool: "Claude",
        },
      },
      {
        id: "sales-am-l3",
        title: "Renewal Intelligence and Expansion Signals with AI",
        duration: 19,
        description:
          "Use AI to identify churn risk early, spot expansion opportunities before competitors do, and build a renewal and growth strategy that is driven by intelligence rather than hope.",
        content: `## The Renewal Equation

Retention is not a renewal meeting — it is everything that happens in the 11 months before the renewal meeting. AMs who only focus on accounts 90 days before renewal are managing the outcome of 9 months of relationship investment (or neglect). AI helps build the intelligence infrastructure for year-round proactive retention.

## Building a Churn Risk Model

Churn signals cluster into four categories: adoption signals (are they using the product?), relationship signals (are key stakeholders engaged?), business signals (is their business stable?), and competitive signals (are they evaluating alternatives?).

\`\`\`
Prompt example — churn signal analysis:
"Build a churn risk framework for [B2B SaaS customer accounts]. For each of these
signal categories — adoption, relationship, business, competitive — give me:
(1) 4 specific signals to monitor, (2) where to find each signal (platform data,
LinkedIn, support tickets, CRM activity), (3) what each signal means when it appears,
(4) the recommended action when the signal fires."
\`\`\`

## Expansion Signal Identification

Expansion signals often appear before the customer asks: headcount growth in a specific team, a new business initiative that creates an adjacent use case, increased platform adoption suggesting readiness for the next tier, a leadership change that brings in someone with experience of expanded deployments.

\`\`\`
Prompt example — expansion opportunity mapping:
"I manage [Acme Corp], a current customer using [our project management platform]
for their [engineering team of 30]. I've noticed: [their company just raised Series B,
marketing headcount grew by 50% on LinkedIn, their CMO posted about needing better
cross-team workflow visibility].
Identify: (1) the expansion opportunity this signals, (2) how to frame the conversation,
(3) which stakeholder to approach first, (4) the ROI argument to make."
\`\`\`

## The Renewal Conversation Framework

Renewal is not a transaction — it is a milestone in a relationship. Structuring renewal conversations around value delivered, risk reviewed, and future planned produces better outcomes than leading with contract terms.

## Competitive Intelligence

AI can help AMs prepare for competitive conversations: understanding where competitors are strong, where your solution has genuine advantages, and how to respond when a customer signals they are evaluating alternatives.`,
        keyTakeaways: [
          "Retention is built in the 11 months before renewal — not in the 90-day window; AI enables year-round signal monitoring",
          "Churn signals cluster into four categories: adoption, relationship, business, and competitive — each requiring different monitoring and response",
          "Expansion signals appear before customers ask — headcount growth, new initiatives, increased adoption, leadership changes with relevant experience",
          "Renewal conversations led by value delivered and future planned consistently outperform contract-led renewal approaches",
        ],
        exercise: {
          title: "Churn Risk and Expansion Signal Audit",
          description:
            "Build a structured churn and expansion intelligence framework for your book and apply it to your five most important accounts.",
          steps: [
            "Prompt Claude: 'Build a churn risk and expansion signal monitoring framework for [B2B SaaS account management]. For each signal type (adoption, relationship, business, competitive, expansion), give me: 4 specific signals to monitor, where to find each, what each means when it appears, and the recommended response.'",
            "Review and customise to your specific product and customer type",
            "Apply the framework to your five most important accounts — rate each on each signal category",
            "Identify your single highest-churn-risk account and your single highest-expansion-potential account",
            "Build a 60-day action plan for each account based on the intelligence",
          ],
          tool: "Claude",
        },
        quiz: [
          {
            question:
              "An account's product usage drops 35% over 60 days with no explanation. What is the correct immediate action?",
            options: [
              "Wait until the next scheduled QBR to discuss",
              "Proactively reach out to the primary contact within 48 hours to understand what has changed — frame as a check-in on value realisation, not an alarm about usage",
              "Escalate to the customer success team to handle",
              "Flag as a churn risk in the CRM and update the renewal probability",
            ],
            correct: 1,
            explanation:
              "Usage decline is one of the highest-predictive churn signals. Acting within 48 hours — before the customer has made a decision — gives the AM the best chance of understanding the cause (technical issue, team change, strategic shift) and responding appropriately. Waiting until the scheduled QBR means the window to intervene proactively has closed. Framing it as a check-in (not an alarm) maintains the relationship dynamic.",
          },
          {
            question:
              "A customer's LinkedIn shows they have hired 40 new salespeople in the last 90 days. The customer currently uses your CRM for 25 users. What is this signal most likely indicating?",
            options: [
              "The customer is consolidating vendors and may reduce spend",
              "A natural expansion opportunity — 40 new sales hires typically need CRM access, creating a potential licence expansion conversation",
              "The customer is underperforming commercially and may need to cut costs",
              "The customer is hiring to replace employees using your platform",
            ],
            correct: 1,
            explanation:
              "Headcount growth in the same function that uses your product is one of the clearest expansion signals. 40 new salespeople almost certainly need CRM licences. The AM who identifies this signal first and opens the conversation proactively — rather than waiting for the customer to ask — captures the expansion naturally. Waiting means competing against procurement-driven alternative evaluation.",
          },
          {
            question:
              "A customer says at renewal: 'Your price has gone up and we're being asked to review all vendor spend. We need to see a significant reduction.' What is the most effective first response?",
            options: [
              "Immediately offer a 15% reduction to avoid the conversation escalating",
              "Acknowledge the budget pressure, then shift the conversation to value delivered — quantified in business terms — before discussing commercial terms",
              "Ask for a 30-day extension to consult with your manager",
              "Point out that contract terms do not permit renegotiation mid-cycle",
            ],
            correct: 1,
            explanation:
              "Price objections at renewal are often about value perception, not just cost. Leading with the value story — specifically quantified business outcomes delivered — before engaging on commercial terms repositions the conversation from 'cost to cut' to 'investment to justify.' After value is established, discussing commercial flexibility from a position of demonstrated impact is more effective than negotiating from weakness.",
          },
        ],
        applyThisWeek: {
          action:
            "Run a churn risk and expansion signal audit across your full book this week. Identify your top three churn risks and top three expansion opportunities. Build a 30-day action plan for each.",
          promptTemplate:
            "I manage an account: [company name], [ARR, tenure, product, primary contacts]. Recent signals: [usage trend, last contact date, any stakeholder changes, support tickets, external news]. Assess: (1) overall churn risk rating and top 3 contributing factors, (2) top 2 expansion opportunities with recommended approach, (3) recommended next 3 actions with priority and timeline, (4) what I should prepare before the next conversation with this account.",
          tool: "Claude",
        },
      },
      {
        id: "sales-am-l4",
        title: "Proactive Account Coverage and Communication at Scale with AI",
        duration: 17,
        description:
          "Use AI to maintain proactive, personalised coverage across your full book of accounts — not just your top 10 — with communications that add value rather than check boxes.",
        content: `## The Scale Problem

The fundamental account management challenge is that proactive, personalised attention does not scale manually. An AM with 50 accounts who gives each account genuine weekly attention would need to work 200 hours a week. The result: the top 10 accounts by ARR get attention, the other 40 get neglect. AI changes this equation.

## The Proactive Communication Framework

Proactive communication is not a monthly check-in email. It is a systematic approach to delivering value at regular intervals — value that is specific to each account's situation, not generic company updates.

Types of valuable proactive communication:
- **Relevant insight delivery:** 'I saw this report on [their industry challenge] — thought it might be relevant to what you mentioned about [their initiative].'
- **Usage milestone acknowledgement:** 'Your team hit [X milestone] in the platform this month — here's what that looks like in terms of [business outcome].'
- **Trigger-event reference:** 'Congratulations on [company announcement] — given your current setup, here's a thought on how we could support [the new initiative].'
- **Proactive issue flag:** 'I noticed [usage pattern] — wanted to flag it before it becomes a problem and suggest [solution].'

\`\`\`
Prompt example — scaled proactive outreach:
"I'm an Account Manager for [B2B data analytics platform].
Generate 5 different proactive email templates for existing customers, each addressing
a different scenario: (1) usage milestone reached, (2) relevant industry news to share,
(3) triggering an expansion conversation from a business signal, (4) proactive feature
recommendation based on usage pattern, (5) relationship maintenance touchpoint.
Each under 100 words. Warm, specific, not salesy. Leave [brackets] for personalisation."
\`\`\`

## Account Communication Planning

AI can help build a simple 90-day communication calendar for each account tier — defining the touchpoints, the communication type, and the value angle at each.

## The Personalisation Layer

Templates are the infrastructure — personalisation is what makes them work. For every AI-generated template, the AM adds: one specific detail from the account's recent context, one reference to a previous conversation, and their authentic voice.`,
        keyTakeaways: [
          "AI enables proactive, value-adding communication across a full book of accounts — not just the top 10 by ARR",
          "Proactive communication adds genuine value (insights, milestone acknowledgements, trigger-event references) rather than checking-in boxes",
          "Template infrastructure built with AI requires personalisation by the AM — one specific detail per communication that makes it genuinely relevant to this account",
          "A 90-day communication calendar per account tier ensures every account receives structured attention, preventing the neglect-then-rescue cycle",
        ],
        exercise: {
          title: "90-Day Communication Calendar",
          description:
            "Build a 90-day proactive communication plan for one account tier in your book — then create the template library to support it.",
          steps: [
            "Choose an account tier you currently under-serve (e.g. accounts in the £20k–£50k ARR band)",
            "Prompt Claude: 'Design a 90-day proactive account communication plan for [B2B SaaS account management]. Account tier: [ARR range, typical tenure, typical stakeholder]. Plan should include: touchpoint frequency, communication type for each touchpoint, value angle for each, and the personalisation element needed. Format as a calendar view.'",
            "Review the plan — adjust frequency and communication types based on your actual customer expectations and relationship norms",
            "Prompt: 'Now create the 5 email templates needed to execute this communication plan. Leave [brackets] for account-specific personalisation. Each under 100 words. Tone: [warm and direct].'",
            "Pilot with 5 accounts from this tier for 30 days — track engagement (replies, meeting requests, expansion conversations opened)",
          ],
          tool: "Claude",
        },
        quiz: [
          {
            question:
              "What distinguishes a proactive communication strategy from a reactive one in account management?",
            options: [
              "Proactive AMs communicate more frequently — reactive AMs communicate only when required",
              "Proactive AMs deliver value-adding communication based on account intelligence before customers raise issues — reactive AMs respond to customer-initiated contact",
              "Proactive AMs use more channels — reactive AMs use only email",
              "Proactive communication requires a dedicated customer success team",
            ],
            correct: 1,
            explanation:
              "Proactive is not about frequency — it is about timing and intent. Proactive AMs are already monitoring account health, identifying risks before they are raised, and delivering relevant value before customers ask. Reactive AMs are always in response mode — which means arriving at risk situations when the customer has already partially made a decision.",
          },
          {
            question:
              "An AM sends the same monthly 'product update' email to all 60 accounts. Why is this not effective proactive communication?",
            options: [
              "Monthly frequency is too low for proactive account management",
              "Product update emails are too long to read",
              "Generic communication delivered uniformly signals that the AM does not know or care about each account's specific situation — the opposite of what proactive relationship management aims to convey",
              "Product updates should come from the marketing team, not the AM",
            ],
            correct: 2,
            explanation:
              "Proactive communication works because it signals genuine attention to this customer's specific situation. 'I thought of you when I saw this' is powerful; 'here is our monthly update' is noise. The value is in the specificity — which requires the AM to know enough about each account to connect a communication to their particular context.",
          },
          {
            question:
              "An AM uses AI to build 10 communication templates, sends them to accounts without adding personalisation, and sees no improvement in engagement. What went wrong?",
            options: [
              "The templates were the wrong format",
              "AI-generated templates are automatically filtered by email clients",
              "Templates without account-specific personalisation signal the same thing as generic newsletters — the customer knows they received a template, undermining the relationship signal",
              "10 templates are too many for one account tier",
            ],
            correct: 2,
            explanation:
              "Templates are infrastructure — they provide structure and efficiency. Personalisation is what converts a template into a communication that feels genuine. An unedited AI template sent to all accounts is functionally identical to a bulk email — it does not signal individual attention. The AM's personalisation layer (one specific reference, one detail from a real conversation) is what makes the template work.",
          },
        ],
        applyThisWeek: {
          action:
            "Build a 90-day communication calendar for your most underserved account tier and create the five template library to support it. Pilot with five accounts for 30 days and track engagement rates.",
          promptTemplate:
            "Design a 90-day proactive account communication plan for [account tier: ARR range, typical profile]. The plan should include: touchpoint cadence, communication type at each touchpoint (value insight, usage milestone, trigger-event, expansion signal, relationship maintenance), the value angle for each, and what personalisation to add. Then generate the 5 email templates to execute the plan — under 100 words each, [warm, direct] tone, with [bracket] placeholders for personalisation.",
          tool: "Claude",
        },
      },
    ],
  },

  "vp-sales": {
    title: "AI for Sales Leaders and VPs",
    description:
      "Strategic AI skills for Sales Managers and VPs — coaching at scale, forecast accuracy, pipeline intelligence, and building AI-first sales processes that compound across the team.",
    lessons: [
      {
        id: "sales-vp-sales-l1",
        title: "The Sales Leader's AI Playbook",
        duration: 17,
        description:
          "Develop a clear strategic view of where AI creates genuine leverage for sales leadership — from coaching and forecast accuracy through pipeline intelligence and team capability building.",
        content: `## The Sales Leader's AI Opportunity

Sales leaders are typically the last to personally adopt new tools — they are measured on team output, not their own productivity. This changes with AI. The highest-leverage AI applications for a VP of Sales sit at the intersection of the two activities that most directly drive revenue: coaching and inspection.

## Where AI Creates Sales Leader Leverage

**Pipeline inspection:** Reviewing deals across a large team systematically — identifying risk signals, qualification gaps, and deals likely to slip without direct attention to every call recording.

**Coaching at scale:** Generating deal-specific coaching questions for rep conversations, identifying patterns across a team's call recordings, and building rep development plans informed by performance data.

**Forecast accuracy:** Synthesising pipeline data, historical conversion rates, and deal-specific risk signals into a more structured forecast methodology.

**Playbook development:** Building, documenting, and maintaining the sales playbook — the best practices, objection responses, and qualification frameworks that the whole team should use.

**Manager enablement:** Helping first-line managers become better coaches — building coaching frameworks, call review rubrics, and rep development tools.

\`\`\`
Prompt example — pipeline review preparation:
"I'm a VP of Sales preparing for my weekly pipeline review with a team of 8 AEs.
The review covers 45 active opportunities. Give me: (1) a deal inspection framework —
the 7 questions I should ask about every deal to identify risk and velocity,
(2) 3 signs of healthy deal progression vs 3 red flags for a deal at risk,
(3) the coaching questions I should ask AEs for a deal that has stalled,
(4) how to structure the 90-minute review to cover the full pipeline efficiently."
\`\`\`

## What Sales Leaders Should Not Delegate to AI

Coaching relationship quality, strategic account decisions, hiring judgment, and cultural leadership cannot be generated by AI. The leadership that creates a high-performance sales culture is irreducibly human.`,
        keyTakeaways: [
          "The highest-leverage AI applications for sales leaders sit at pipeline inspection and coaching — not administrative efficiency",
          "AI enables systematic pipeline inspection across large teams without requiring the VP to be in every deal conversation",
          "Forecast accuracy improves when deal inspection is structured and consistent — AI helps build and maintain the inspection framework",
          "Coaching relationship quality, cultural leadership, and strategic judgment remain irreducibly human — AI supports the infrastructure, not the leadership",
        ],
        exercise: {
          title: "Pipeline Review Framework",
          description:
            "Build a structured deal inspection and pipeline review framework using AI — then run your next pipeline review using it.",
          steps: [
            "Prompt Claude: 'Build a structured pipeline review framework for a VP of Sales managing [8 AEs] with [45 active opportunities] across an average [6-month] sales cycle. Include: (1) 7 deal inspection questions to ask for every opportunity, (2) red flags indicating a deal is at risk, (3) green lights indicating a deal is progressing well, (4) coaching questions for stalled deals, (5) a 90-minute pipeline review agenda.'",
            "Review against your current review process — identify what you would add or remove",
            "Share the framework with your first-line managers before the next review",
            "Run your next pipeline review using the structured framework",
            "Note: which inspection questions surfaced risks you had not previously identified?",
          ],
          tool: "Claude",
        },
        quiz: [
          {
            question:
              "Why is pipeline inspection one of the highest-leverage AI applications for sales leaders?",
            options: [
              "AI can predict which deals will close with 95% accuracy",
              "Pipeline inspection is the most time-consuming administrative task for VPs",
              "Systematic inspection across all deals — identifying risk signals, qualification gaps, and velocity issues — directly influences revenue outcomes without requiring the VP to be in every conversation",
              "AI can update CRM data automatically from rep call notes",
            ],
            correct: 2,
            explanation:
              "Pipeline inspection is where coaching meets commercial accountability. A VP who can identify which deals are genuinely at risk (not just marked at risk in CRM), which are stalled on factors that coaching can address, and which are likely to slip by quarter-end — has a direct lever on revenue. AI systematises the inspection criteria, making it consistent and comprehensive across the full team.",
          },
          {
            question:
              "A VP's team has 50 active opportunities. She reviews the top 15 by deal value in detail and checks the others only at a macro level. What is the risk of this approach?",
            options: [
              "The bottom 35 deals will feel neglected by their AEs",
              "Risk is not evenly distributed by deal size — a significant revenue risk or a coaching opportunity in a mid-tier deal will go undetected, and the VP will be surprised in the forecast",
              "Pipeline reviews should cover all 50 deals in equal depth",
              "This approach is standard best practice — the top 15 accounts represent most of the ARR",
            ],
            correct: 1,
            explanation:
              "Deal risk does not correlate precisely with deal size. A mid-tier deal with a qualification gap, a competitive threat, or a disengaged champion can slip or be lost without surfacing in the top-deal review. AI-structured inspection frameworks create a consistent minimum bar across all 50 deals — catching risks that size-based prioritisation would miss.",
          },
          {
            question:
              "Which activity should a VP of Sales NOT attempt to use AI for?",
            options: [
              "Building a call review rubric for first-line managers to use in coaching sessions",
              "Generating deal-specific coaching questions for rep 1:1s",
              "Building the authentic trust and cultural leadership that makes a sales team perform at its best",
              "Drafting the sales playbook section on competitive differentiation",
            ],
            correct: 2,
            explanation:
              "Trust, culture, and authentic leadership are built through consistent human behaviour, demonstrated values, and genuine care for rep development — not through AI-generated content. A VP who uses AI to produce coaching content must still show up as a genuine leader who knows their reps, cares about their development, and sets a cultural tone that AI cannot replicate.",
          },
        ],
        applyThisWeek: {
          action:
            "Build an AI-generated deal inspection framework and run your next pipeline review using it. Identify three deals you would not have flagged as risks without the structured inspection process.",
          promptTemplate:
            "Build a structured pipeline inspection framework for a VP of Sales managing [X AEs] with an average deal size of [£Y] and [Z-month] sales cycle. Include: (1) 7 universal deal inspection questions, (2) 5 red flags indicating a deal is at risk, (3) 4 coaching questions for a stalled opportunity, (4) how to structure a [90-minute] pipeline review to cover [X opportunities], (5) criteria for escalating a deal to 'at risk' status in the forecast.",
          tool: "Claude",
        },
      },
      {
        id: "sales-vp-sales-l2",
        title: "AI for Coaching, Call Analysis, and Rep Development",
        duration: 18,
        description:
          "Use AI to build a systematic coaching infrastructure — from call review frameworks through rep development plans and deal-specific coaching conversations — that scales across a large team.",
        content: `## The Coaching Leverage Problem

Coaching is the highest-leverage activity a sales leader performs — and the one most commonly under-invested in. A VP with 8 direct reports who coaches effectively can compound team performance across the entire revenue base. The problem: consistent, quality coaching requires more time than most VP schedules allow.

AI does not replace coaching relationship quality. It builds the infrastructure — the frameworks, review rubrics, and development plans — that makes coaching conversations more efficient and targeted.

## Call Review Frameworks

Most sales teams have no structured call review framework. AEs are told to 'listen to their calls' without criteria for what good looks like. AI helps build structured rubrics.

\`\`\`
Prompt example — call review rubric:
"Build a call review rubric for [discovery calls] for a [B2B SaaS company] selling to
[mid-market operations leaders]. The rubric should assess: (1) opening and rapport,
(2) needs discovery — depth and quality of questions, (3) pain acknowledgement and
qualification, (4) solution positioning, (5) next step commitment. For each dimension,
define what 'excellent,' 'adequate,' and 'needs development' looks like with specific
observable behaviours."
\`\`\`

## Deal-Specific Coaching Questions

The most effective coaching conversations are deal-specific, not generic. AI can generate targeted coaching questions for a specific deal based on the deal stage, known risks, and qualification gaps.

\`\`\`
Prompt example — deal coaching questions:
"I'm coaching an AE on a deal with [Acme Corp] — [£120k ARR, 5 months in pipeline,
proposal stage, economic buyer engaged but no champion identified, competitor shortlisted].
Generate 6 coaching questions for my 1:1 that will help the AE think through the deal
risk and develop their own path forward — not questions I answer for them."
\`\`\`

## Rep Development Plans

AI can help structure rep development plans based on observed performance patterns — identifying the specific competencies to develop and the activities that will build them.

## The Coaching Mindset

AI-generated coaching questions are the starting point, not the destination. The quality of a coaching conversation depends on listening, follow-up questions, and genuine engagement with the rep's thinking — things AI cannot substitute for.`,
        keyTakeaways: [
          "Consistent, structured coaching is the highest-leverage VP activity — AI builds the infrastructure that makes it scale across a large team",
          "Call review rubrics with specific observable behaviours are more useful than generic feedback — AI generates these frameworks quickly",
          "Deal-specific coaching questions that help reps develop their own thinking are more effective than the VP providing answers",
          "AI generates the coaching infrastructure; the VP provides the listening, follow-up questions, and genuine engagement that makes coaching work",
        ],
        exercise: {
          title: "Deal-Specific Coaching Preparation",
          description:
            "Prepare deal-specific coaching questions for your top three rep 1:1s this week using AI.",
          steps: [
            "Identify three rep 1:1s coming up this week where you want to focus on deal coaching",
            "For each, gather the deal context: stage, ARR, known qualification gaps, competitive situation, timeline to close",
            "Prompt Claude for each: 'I'm coaching [rep name] on a deal with [company]. Context: [stage, ARR, key risks, competitive situation]. Generate 6 coaching questions that will help the rep think through the deal risks and develop their own path forward — these should be Socratic questions that the rep answers, not questions I answer for them.'",
            "Review the questions — add any deal-specific context that would sharpen them",
            "Run the 1:1s using the questions as a framework — note which questions generated the best rep thinking",
          ],
          tool: "Claude",
        },
        quiz: [
          {
            question:
              "What makes deal-specific coaching more effective than generic sales coaching?",
            options: [
              "Deal-specific coaching is faster because it focuses on one opportunity",
              "Generic coaching does not apply to any specific situation the rep is currently in — deal-specific coaching applies directly to a real challenge the rep is navigating now, making the insight immediately actionable",
              "Deal-specific coaching requires less preparation from the manager",
              "Generic coaching is appropriate for junior reps; deal-specific coaching for senior reps",
            ],
            correct: 1,
            explanation:
              "Learning transfers best when it is applied to real, live situations. A coaching conversation about a specific deal the rep owns — where the stakes are real and the application is immediate — produces better retention and behaviour change than abstract skills training. The deal is the teaching vehicle.",
          },
          {
            question:
              "Why should coaching questions help reps develop their own thinking rather than the VP providing answers?",
            options: [
              "VP deal knowledge is less current than the AE's",
              "Socratic coaching builds the rep's own judgment and capability — VPs who provide answers create dependency rather than developing the analytical skills that make reps effective when the VP is not in the room",
              "Providing answers takes too much coaching time",
              "Reps respond better to questions than to direct advice",
            ],
            correct: 1,
            explanation:
              "The goal of coaching is not to solve the deal — it is to develop the rep's ability to solve deals independently. When a VP provides answers, reps learn what the VP thinks about this deal. When the VP asks questions that help reps think through risks and options themselves, reps build the analytical capability to navigate the next deal without coaching support.",
          },
          {
            question:
              "A VP reviews 10 call recordings per week manually. AI call analysis tools summarise call themes, talk ratio, and key moments automatically. What is the most valuable use of the time saved?",
            options: [
              "Review an additional 10 call recordings per week",
              "Use the time to prepare more detailed written feedback for each rep",
              "Shift from passive listening to targeted coaching conversations — using the AI summary to identify the specific moment or pattern to discuss in the 1:1",
              "Share the AI summaries with reps and let them self-coach",
            ],
            correct: 2,
            explanation:
              "The efficiency gain from AI call analysis should be reinvested in higher-quality coaching conversations, not in reviewing more calls passively. An AI summary that identifies the moment where the rep lost control of the qualification question allows the VP to go straight to that moment in the 1:1 — making the coaching targeted, evidence-based, and time-efficient.",
          },
        ],
        applyThisWeek: {
          action:
            "Build a call review rubric for your most common call type (discovery, demo, or negotiation) and run one structured call review per rep this week using it. Track what the rubric surfaces that informal listening misses.",
          promptTemplate:
            "Build a call review rubric for [discovery / demo / negotiation] calls for a [company type] selling [solution] to [buyer profile]. Assess: (1) opening and tone-setting, (2) discovery question quality and depth, (3) pain identification and quantification, (4) solution positioning, (5) next step commitment. For each dimension, define 'excellent,' 'adequate,' and 'needs development' with specific observable behaviours.",
          tool: "Claude",
        },
      },
      {
        id: "sales-vp-sales-l3",
        title: "Forecast Accuracy and Pipeline Intelligence with AI",
        duration: 19,
        description:
          "Use AI to build a more structured, data-informed forecasting methodology — reducing the reliance on gut feel and CRM stage, and improving the accuracy of the calls you make to the business.",
        content: `## Why Sales Forecasts Miss

Most sales forecasts miss for one of four reasons: CRM stage does not reflect deal reality, reps are optimistic about deals they own emotionally, inspection is inconsistent across the team, or the methodology conflates pipeline coverage with close likelihood. AI does not eliminate these problems, but it helps build the structured inspection framework that surfaces them before the quarter-end conversation.

## Building a Structured Forecast Methodology

A reliable forecast methodology goes beyond CRM stage × probability. It incorporates: deal-specific qualification completeness, stakeholder engagement signals, velocity indicators (is this deal moving?), and historical conversion rates by stage, segment, and rep.

\`\`\`
Prompt example — forecast methodology:
"Help me build a structured sales forecast methodology for a [B2B SaaS company]
with [30 AEs], average deal size [£85k], average sales cycle [5 months].
The methodology should: (1) define the criteria for each forecast category (Commit,
Best Case, Pipeline), (2) specify the deal-level evidence required for each category,
(3) include deal inspection questions that help managers validate commit deals,
(4) describe how to build the roll-up from rep to manager to VP level."
\`\`\`

## Pipeline Coverage Analysis

Pipeline health is the leading indicator of next-quarter revenue. AI can help structure pipeline coverage analysis: is there enough pipeline at each stage, for each rep, to hit the number?

\`\`\`
Prompt example — pipeline coverage:
"I'm a VP of Sales with a Q3 target of £2.4M ARR. Current pipeline breakdown:
[Commit: £800k, Best Case: £1.1M, Pipeline: £2.8M, Early: £4.2M].
Historical win rates: [Commit: 85%, Best Case: 45%, Pipeline: 25%].
Analyse: (1) expected revenue from current pipeline, (2) gap to target,
(3) what needs to be true for me to make the number, (4) the 3 pipeline actions I should take now."
\`\`\`

## Deal Risk Stratification

Not all at-risk deals are equally at risk. AI can help stratify the pipeline by risk profile — helping VPs focus human intervention time on the deals most likely to respond to coaching and support.

## Communicating the Forecast

Board and executive forecast communication requires confident, structured narrative — not just a number. AI helps structure the forecast narrative: the number, the composition, the risks, and the assumptions.`,
        keyTakeaways: [
          "Forecast accuracy requires deal-specific evidence for each forecast category, not just CRM stage — AI helps build and maintain the inspection criteria",
          "Pipeline coverage analysis (expected revenue from current pipeline vs target) is the leading indicator of whether the number is achievable — AI runs this analysis quickly",
          "Deal risk stratification helps VPs allocate their coaching intervention time to the deals most likely to benefit",
          "Executive forecast communication requires a structured narrative (number, composition, risks, assumptions) — AI drafts this from structured input quickly",
        ],
        exercise: {
          title: "Q-Forward Pipeline Coverage Analysis",
          description:
            "Run an AI-assisted pipeline coverage analysis for next quarter and identify the three actions required to protect the forecast.",
          steps: [
            "Gather your current pipeline data: total pipeline by stage, historical win rates by stage, next-quarter target",
            "Prompt Claude: 'Run a pipeline coverage analysis for a VP of Sales with a [quarter] target of [£X ARR]. Pipeline breakdown: [paste by stage with £ amounts]. Historical win rates by stage: [paste rates]. Give me: (1) expected revenue from current pipeline, (2) gap to target at expected win rates, (3) what win rate improvement is needed to make the number, (4) the minimum new pipeline needed to close the gap, (5) top 3 actions to take now.'",
            "Review the analysis — note where your own knowledge of deal quality differs from the stage-based model",
            "Build a forecast narrative from the output for your next exec review",
            "Identify two deals currently in 'Best Case' that you believe should be either promoted to Commit or downgraded to Pipeline based on deal-specific evidence",
          ],
          tool: "Claude",
        },
        quiz: [
          {
            question:
              "A VP's CRM shows £3.2M in 'Commit' deals against a £2.8M quarterly target. Should she be confident in making the number?",
            options: [
              "Yes — Commit exceeds target, indicating the number is safe",
              "Not necessarily — the £3.2M Commit figure is only reliable if each deal has been qualified against specific Commit criteria and verified through deal inspection, not just based on rep self-reporting",
              "No — Commit deals always close at lower amounts than forecasted",
              "Yes — she should focus on sandbagging to exceed quota",
            ],
            correct: 1,
            explanation:
              "CRM Commit figures reflect rep-entered probabilities, not verified qualification evidence. In most teams without a structured inspection methodology, 15–25% of Commit deals do not close in the quarter. The forecast is only as reliable as the deal inspection behind it — which is why structured inspection criteria (not just stage + probability) are required for accurate forecasting.",
          },
          {
            question:
              "What does pipeline coverage ratio measure and why is it a leading indicator?",
            options: [
              "The ratio of pipeline deals won vs lost — measuring team win rate performance",
              "The ratio of total pipeline value to quarterly target — measuring whether enough pipeline exists at current win rates to hit the number",
              "The number of active deals per rep — measuring activity levels",
              "The ratio of pipeline generated this quarter vs last quarter — measuring pipeline growth",
            ],
            correct: 1,
            explanation:
              "Pipeline coverage (total pipeline ÷ quarterly target, weighted by historical win rates) is a leading indicator because it shows, before the quarter is halfway through, whether there is mathematically enough pipeline to hit the number. A VP with 2.5× coverage at the start of a quarter has a much more defensible forecast than one with 1.2× — even if both have the same Commit figure.",
          },
          {
            question:
              "A sales VP is asked to present the Q2 forecast to the CEO. Which format is most effective?",
            options: [
              "A spreadsheet showing all 45 active opportunities with their CRM probability",
              "A verbal summary of the top 10 deals by ARR",
              "A structured narrative: target, expected close from current pipeline, key risks and mitigations, assumptions underlying the Commit number, and actions underway to protect it",
              "A comparison of this quarter's pipeline to the same quarter last year",
            ],
            correct: 2,
            explanation:
              "CEOs and boards want forecast confidence, not data dumps. A structured narrative — here is the number, here is the evidence base, here are the risks, here is what we are doing about them — demonstrates rigour and gives executives what they need to plan. Raw pipeline data without analysis signals uncertainty; structured narrative signals command of the business.",
          },
        ],
        applyThisWeek: {
          action:
            "Run a pipeline coverage analysis for next quarter and build a structured forecast narrative for your next exec review. Identify the three pipeline actions most likely to improve forecast accuracy.",
          promptTemplate:
            "Run a pipeline coverage analysis for a VP of Sales with a [quarter] target of [£X ARR]. Current pipeline: Commit [£X], Best Case [£X], Pipeline [£X], Early Stage [£X]. Historical win rates: Commit [X%], Best Case [X%], Pipeline [X%]. Give me: (1) expected revenue at current win rates, (2) gap to target, (3) what needs to be true to make the number, (4) top 3 pipeline actions to take now, (5) a structured 150-word exec forecast narrative covering number, evidence, risks, and assumptions.",
          tool: "Claude",
        },
      },
      {
        id: "sales-vp-sales-l4",
        title: "Building AI-First Sales Processes and Playbooks",
        duration: 18,
        description:
          "Design and implement an AI-first sales process — from prospecting through close — and build the playbook infrastructure that compounds AI benefits across the full team.",
        content: `## From Individual AI Use to Team System

Individual AEs adopting AI ad hoc produces pockets of efficiency. A VP who builds AI into the team's standard operating procedures — the processes, playbooks, and tools that define how the team sells — produces compounding, team-wide gains. This is the difference between personal productivity improvement and systematic performance uplift.

## Mapping AI to the Sales Process

The first step is mapping AI touchpoints to every stage of your specific sales process — where does AI compress time, improve quality, or enable analysis that was previously impossible?

**Prospecting:** AI-assisted ICP refinement, trigger event identification, personalised outreach sequences.

**Qualification:** MEDDIC/MEDDPICC gap analysis, qualification question generation, deal risk assessment.

**Discovery:** Pre-call brief, discovery question bank, call debrief template for CRM.

**Solution presentation:** Demo narrative arc, value quantification, stakeholder-specific talking points.

**Proposal:** Executive summary, commercial narrative, business case one-pager.

**Negotiation and close:** Objection bank, multi-stakeholder communication, deal risk mitigation.

\`\`\`
Prompt example — AI-assisted sales playbook section:
"Write the objection handling section of a sales playbook for an [Account Executive]
selling [B2B project management software] to [mid-market operations leaders].
Include the top 8 objections most common in this market, with: the underlying concern
behind each objection, a response framework (acknowledge, reframe, evidence, progress),
and 2 specific response options for each objection — one assertive, one collaborative."
\`\`\`

## Building the Team Prompt Library

The team's most valuable AI asset is a shared prompt library — the prompts that consistently produce high-quality output for your specific sales context, refined through team-wide use.

## Governance and Quality Standards

AI adoption at team level requires governance: which tools are approved, what data can be shared, what is the quality gate before AI output reaches a prospect or customer.

## Measuring the Impact

Track the metrics that matter: average time from discovery to proposal, outreach response rates, pipeline velocity, forecast accuracy, win rate by stage. Compare pre- and post-AI adoption to build the business case for continued investment and identify where AI is creating the most value.`,
        keyTakeaways: [
          "AI embedded in team processes and playbooks produces compounding team-wide gains — individual AI adoption produces isolated productivity improvements",
          "Mapping AI touchpoints to every stage of your specific sales process creates a systematic adoption roadmap rather than ad hoc tool use",
          "A shared team prompt library is the highest-leverage AI investment a sales leader can make — it encodes best practices and compounds with every iteration",
          "Measuring pipeline velocity, win rates, and forecast accuracy before and after AI adoption builds the business case and identifies where to focus next",
        ],
        exercise: {
          title: "Sales Playbook AI Section",
          description:
            "Build one key section of your sales playbook using AI — then test it with two reps and measure whether it changes their approach.",
          steps: [
            "Identify the playbook section your team most needs: objection handling, discovery question bank, competitive differentiation, or qualification framework",
            "Prompt Claude: 'Write the [section] of a sales playbook for [AE/SDR] selling [product] to [ICP]. Include: [specify the components that should be in this section based on what you chose]. Make it specific to [your market/buyer/competitive context].'",
            "Review the draft — identify what is strong, what is generic, and what is missing that your team actually needs",
            "Add the specific competitive intelligence, customer language, and real examples that make the section genuinely useful",
            "Share with two reps — ask for feedback after one week on what they used and what was missing",
          ],
          tool: "Claude",
        },
        quiz: [
          {
            question:
              "What is the difference between individual AI adoption and AI embedded in team processes?",
            options: [
              "Individual AI adoption is faster to implement",
              "Individual AI adoption produces personal productivity gains for those who adopt; AI embedded in team processes produces consistent, compounding gains across the full team — raising the floor and ceiling for everyone",
              "Team process AI adoption requires more expensive tools",
              "Individual adoption is appropriate for AEs; team process adoption is for SDRs",
            ],
            correct: 1,
            explanation:
              "The compounding mechanism is standardisation and shared learning. When AI is embedded in the standard process — discovery prep, CRM update, follow-up drafting — every rep benefits from the infrastructure, not just those who proactively adopted it. And a shared prompt library means each individual's experimentation improves the tools for the whole team.",
          },
          {
            question:
              "A sales leader builds a shared prompt library for the team. What should happen to the library over time?",
            options: [
              "It should remain stable — changing prompts creates inconsistency",
              "It should be reviewed and updated quarterly based on what is producing the best output, what the market requires, and what new AI capabilities enable",
              "It should be managed by the RevOps team, not the sales team",
              "Each rep should build their own version rather than sharing",
            ],
            correct: 1,
            explanation:
              "A prompt library is a living document. Prompts that produce excellent output for a new product feature need to be added; prompts that produce generic output need to be refined or retired; prompts that are not being used need to be reviewed. A quarterly review cadence with the team — which prompts are producing the most value? — keeps the library relevant and improves adoption.",
          },
          {
            question:
              "Which metric is most useful for measuring the impact of AI adoption on a sales team's performance?",
            options: [
              "Number of AI tools used per rep per week",
              "Hours saved on administrative tasks reported in team surveys",
              "Pipeline velocity (average days from stage to stage) and win rate by stage, measured before and after AI adoption — showing whether AI is creating genuine commercial improvement",
              "Volume of AI-generated emails sent per month",
            ],
            correct: 2,
            explanation:
              "The only metrics that matter for evaluating AI investment in sales are commercial outcomes: is the pipeline moving faster? Are more deals converting at each stage? Is forecast accuracy improving? Activity metrics (tools used, hours saved) indicate adoption but do not demonstrate impact. Commercial metrics demonstrate whether AI is actually changing the trajectory of revenue.",
          },
        ],
        applyThisWeek: {
          action:
            "Map AI touchpoints to every stage of your team's sales process and identify the three highest-value gaps — then build the tools (prompts, playbook sections, or frameworks) to address the top gap this week.",
          promptTemplate:
            "Map AI touchpoints for a [AE / SDR] sales process at a [company type] selling [product] to [ICP]. Stages: [list your stages from prospecting to close]. For each stage: (1) the highest-impact AI use case, (2) the prompt structure to use, (3) the expected time saving vs current approach, (4) the quality gate before AI output is used in the sales process. Highlight the 3 stages where AI creates the most leverage for this specific team.",
          tool: "Claude",
        },
      },
    ],
  },
}
