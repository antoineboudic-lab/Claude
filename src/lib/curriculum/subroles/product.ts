import type { SubRoleLessons } from "./types"

export const productSubRoles: SubRoleLessons = {
  "pm": {
    title: "AI for Product Managers",
    description: "From discovery to delivery, use AI to accelerate research synthesis, PRD writing, and stakeholder communication without sacrificing the product judgment that only you can bring.",
    lessons: [
      {
        id: "product-pm-l1",
        title: "AI for Product Managers: Discovery to Delivery",
        duration: 18,
        description: "Understand where AI fits across the full PM lifecycle — from user research and discovery through delivery and stakeholder alignment — and which tasks to tackle first.",
        content: `## AI Across the Product Lifecycle

Product management spans a wide surface area: discovery, synthesis, planning, writing, communication, and delivery. AI doesn't transform all of these equally. The highest leverage is where output volume matters — research synthesis, first-draft generation, and structured analysis.

## The PM AI Opportunity Map

**High leverage (start here):**
- Synthesising user interviews, survey data, and support tickets
- First drafts of PRDs, one-pagers, and update emails
- Competitive research summarisation
- Generating edge cases, risk scenarios, and failure modes

**Medium leverage (add next):**
- User story writing and acceptance criteria generation
- Backlog descriptions and sprint notes
- Stakeholder messaging by audience

**Lower leverage (still useful, but slower ROI):**
- Roadmap prioritisation logic (AI can scaffold, but judgment is yours)
- Strategic positioning (requires deep company context)

## The Prompt That Changes Everything

Most PMs start with vague prompts and get vague outputs. The skill is giving AI the context it needs to act as a useful collaborator:

\`\`\`
You are a senior product manager helping me prepare a discovery summary.
Context: We interviewed 8 B2B SaaS users about their invoicing workflow.
Key pain points emerging: manual data entry, lack of audit trail, approval delays.
Task: Synthesise these themes into 3 core problem statements using JTBD format
(When I… I want to… so that I…). Keep each under 2 sentences.
\`\`\`

Notice the structure: role, context, task, format, constraint. This pattern works across almost every PM use case.

## What AI Cannot Replace

**Product intuition.** The feeling that a feature is wrong even when the data says it should work is built from proximity to users — calls, sessions, feedback reviews. AI cannot replicate it.

**Organisational context.** AI doesn't know that engineering is stretched this quarter, that the CEO cares about enterprise deals right now, or that a key stakeholder will block anything that touches the billing page. You carry that context; AI doesn't.

**Strategic judgment.** Prioritisation involves trade-offs shaped by company values, funding stage, and competitive dynamics. AI can surface data; it cannot make the call.

## Starting This Week

Pick one recurring task — a customer interview you need to summarise, a PRD section you've been procrastinating, a stakeholder update you're dreading. Run it through Claude or ChatGPT. Track what you changed. That edit list is your personal prompt-improvement backlog.`,
        keyTakeaways: [
          "AI highest leverage in PM work: research synthesis, first drafts, competitive analysis, and edge-case generation",
          "Structure your prompts with role, context, task, format, and constraint — this pattern works across all PM use cases",
          "Product intuition, organisational context, and strategic trade-off judgment remain irreplaceably human",
          "Start with one recurring task this week, track what you edited in the AI output, and use that to sharpen your prompting",
        ],
        exercise: {
          title: "PM AI Opportunity Audit",
          description: "Map your current weekly tasks to AI suitability to find where to invest first.",
          steps: [
            "List your ten most time-consuming recurring tasks from the past two weeks",
            "Score each on three dimensions: (1) drafting/synthesis vs. judgment, (2) how repetitive it is, (3) how recoverable an error would be",
            "Identify the two or three tasks that score highest on drafting, repetition, and recoverability",
            "For your top candidate, write a structured prompt using the role-context-task-format-constraint framework",
            "Run it in Claude, note what you had to edit, and save the improved version as your reusable template",
          ],
          tool: "Claude",
        },
        quiz: [
          {
            question: "Which PM task type offers the highest immediate leverage for AI assistance?",
            options: [
              "Strategic roadmap prioritisation and trade-off decisions",
              "Research synthesis, first-draft writing, and competitive summarisation",
              "Hiring and team structure decisions",
              "Managing stakeholder relationships and trust",
            ],
            correct: 1,
            explanation: "Research synthesis, drafting, and competitive summarisation are high-volume, time-consuming tasks where AI can produce 80% of the output quickly. Strategic decisions and relationship management require human judgment AI cannot replicate.",
          },
          {
            question: "A PM gives Claude the prompt: 'Write a PRD.' What is the most important missing element?",
            options: [
              "The word count requirement",
              "Context about the product, users, and problem being solved",
              "A list of competitors",
              "The engineering team's velocity",
            ],
            correct: 1,
            explanation: "Without context — who the users are, what problem is being solved, and what constraints apply — AI produces generic output. Context is the most critical element of an effective PM prompt.",
          },
          {
            question: "What should a PM do when AI generates a prioritised feature list for the roadmap?",
            options: [
              "Use it as-is — AI optimises objectively without bias",
              "Share it directly with engineering to avoid subjective filtering",
              "Treat it as a structured starting point and apply strategic judgment, org context, and user insight before finalising",
              "Discard it — AI cannot contribute to prioritisation",
            ],
            correct: 2,
            explanation: "AI-generated prioritisation is a useful scaffold, but it lacks organisational context, strategic nuance, and your proximity to users. Apply your judgment before treating any AI output as a decision.",
          },
        ],
        applyThisWeek: {
          action: "Synthesise your next user interview or feedback batch with AI instead of manually",
          promptTemplate: "You are a senior product manager. I conducted [N] user interviews about [topic]. Here are the key quotes and notes: [paste notes]. Synthesise the top 3 themes as JTBD problem statements (When I… I want to… so that I…). Flag any contradictions across respondents.",
          tool: "Claude",
        },
      },
      {
        id: "product-pm-l2",
        title: "User Research Synthesis and Insight Generation with AI",
        duration: 20,
        description: "Turn hours of interview notes, survey responses, and support tickets into clear, structured insights using AI — without losing the nuance that makes research valuable.",
        content: `## The Research Synthesis Bottleneck

User research is one of the most impactful PM activities, and one of the most time-consuming to process. A typical round of 8 customer interviews generates 4–6 hours of notes. Synthesising them into actionable insights takes another 2–4 hours. AI can compress that second phase dramatically.

## What AI Does in Synthesis

**Pattern recognition across volume.** When you paste 500 lines of interview notes, AI can surface recurring themes, contradictions, and outliers faster than manual affinity mapping.

**JTBD and problem framing.** AI can convert raw quotes into structured "Jobs to Be Done" statements, helping you move from what users said to what they actually need.

**Sentiment analysis.** AI can scan support tickets or NPS comments and bucket them by sentiment and topic cluster — giving you a signal layer before you read in depth.

**Quote selection.** Ask AI to pull the most representative or emotionally resonant quotes per theme. Use these directly in your PRD or stakeholder presentation.

## The Research Synthesis Prompt

\`\`\`
You are a UX researcher helping a product manager synthesise user interviews.
I interviewed 6 B2B customers about their experience with our reporting feature.
Here are the raw notes from each interview: [paste notes]

1. Identify the top 4 recurring themes. For each: a theme label, 2–3 supporting
   quotes, and a problem statement in JTBD format.
2. Flag any contradictions between participants.
3. Identify one insight that surprised you — something not obvious from the brief.
\`\`\`

## From Insights to Decisions

AI synthesis is an input, not a conclusion. After running notes through AI:

- **Verify themes against your memory of the calls.** AI might miss tone, hesitation, or context that changed the meaning of a quote.
- **Check for selection bias in the input.** Notes are already filtered by what you wrote down. AI synthesises your notes, not the full interview.
- **Use themes to challenge assumptions.** If the AI surfaces a theme you didn't expect, that's worth following up on — not dismissing.

## Survey and Ticket Analysis at Scale

For larger data sets — NPS surveys, feature requests, support tickets — AI becomes even more valuable:

\`\`\`
I have 200 NPS responses. Here they are: [paste].
Group them into 5–7 themes. For each theme: theme name, count of mentions,
3 representative quotes, and whether it skews toward promoters or detractors.
Output as a markdown table.
\`\`\`

This replaces hours of manual tagging and produces a shareable artefact immediately.`,
        keyTakeaways: [
          "AI compresses the synthesis phase of user research from hours to minutes while preserving the patterns that matter",
          "Structure research prompts to extract themes, JTBD statements, supporting quotes, and contradictions in one pass",
          "Always verify AI-generated themes against your first-hand memory of the calls — notes don't capture everything",
          "Use AI for large-scale data (NPS, tickets, surveys) where manual pattern recognition is genuinely impractical",
        ],
        exercise: {
          title: "Interview Synthesis Sprint",
          description: "Synthesise a real batch of user research using AI and compare to your instinctive read of the data.",
          steps: [
            "Take your most recent set of user interview notes (or support ticket batch) — even 3–4 is enough",
            "Paste them into Claude with the structured research synthesis prompt from this lesson",
            "Review the AI output: do the themes match your instinctive read? Are any surprising?",
            "For each theme, check whether the supporting quotes actually support the label AI gave it",
            "Write a one-paragraph 'insight summary' combining the AI synthesis with your own qualitative read",
          ],
          tool: "Claude",
        },
        quiz: [
          {
            question: "When AI synthesises user interview notes, what is the most important limitation to keep in mind?",
            options: [
              "AI cannot handle more than 5 interviews at once",
              "AI synthesises your written notes, not the full interview — bias in what you recorded affects the output",
              "AI cannot produce JTBD statements from qualitative data",
              "AI themes are never accurate for B2B SaaS products",
            ],
            correct: 1,
            explanation: "AI processes whatever you give it. Your notes are already filtered by what you chose to write down. The synthesis quality is constrained by the quality and completeness of your input.",
          },
          {
            question: "A PM receives an AI-generated theme they didn't expect from their interview synthesis. What is the best response?",
            options: [
              "Discard it — AI often hallucinates themes with no basis in the data",
              "Treat it as a validated insight and add it to the PRD immediately",
              "Investigate it further: re-read supporting quotes, check if it warrants follow-up research",
              "Report it to the research team as an AI error",
            ],
            correct: 2,
            explanation: "Unexpected themes are worth examining rather than dismissing. They may reveal a genuine insight your own biases caused you to overlook — or they may be an AI artefact. Check the supporting evidence before deciding.",
          },
          {
            question: "Which data type benefits most from AI synthesis at scale?",
            options: [
              "A single 90-minute user interview with rich detail",
              "The CEO's strategic vision document",
              "200 NPS responses, support tickets, or feature request submissions",
              "A competitor's product changelog",
            ],
            correct: 2,
            explanation: "Large-volume text data — NPS, tickets, requests — is where AI synthesis is hardest to replicate manually. A single rich interview benefits more from your direct attention and nuanced interpretation.",
          },
        ],
        applyThisWeek: {
          action: "Run your next NPS batch or support ticket summary through AI before reading them manually",
          promptTemplate: "I have [N] customer feedback responses about [topic]. Here they are: [paste]. Group them into 5–7 themes. For each: theme name, number of mentions, 3 representative quotes, and whether sentiment skews positive or negative. Output as a markdown table.",
          tool: "Claude",
        },
      },
      {
        id: "product-pm-l3",
        title: "PRD Writing, Requirements, and Spec Clarity with AI",
        duration: 19,
        description: "Use AI to go from a rough feature idea to a complete, structured PRD faster — while maintaining the strategic clarity and specificity that makes a PRD actually useful.",
        content: `## Why PRD Writing Is a Prime AI Use Case

PRDs are among the most time-consuming PM deliverables, and the blank page is often the hardest part. AI eliminates the blank page. Given the right inputs, it can produce a solid first draft of a PRD in minutes — one you then refine with your product judgment, stakeholder knowledge, and domain expertise.

## The PRD Prompt Stack

Great PRDs require context. Before prompting, gather:
- **Problem statement**: what user pain are you solving and for whom?
- **Goals and success metrics**: what does "done well" look like?
- **Constraints**: technical, time, scope, or dependency limits
- **Out of scope**: explicit exclusions that prevent scope creep
- **Stakeholder context**: who cares about this and why?

Then prompt:

\`\`\`
You are a senior product manager. Write a PRD for the following feature.

Feature: [name]
Problem: [what pain, for which users, with what evidence]
Goals: [2–3 measurable success metrics]
Constraints: [technical, timing, or scope constraints]
Out of scope: [explicit exclusions]
Key stakeholders: [who needs to approve or be informed]

Structure the PRD with: Summary, Problem Statement, Goals & Success Metrics,
User Stories (3–5), Functional Requirements, Non-Functional Requirements,
Out of Scope, Open Questions.
\`\`\`

## Sharpening Requirements with AI

Once you have a draft, use AI to stress-test it:

\`\`\`
Review this PRD section: [paste requirements].
Identify:
1. Any requirements that are ambiguous or could be interpreted two ways
2. Missing edge cases or error states
3. Any requirement that conflicts with another
4. Questions an engineer would likely ask that the PRD doesn't answer
\`\`\`

This is one of the highest-value PM uses of AI — turning a "good enough" spec into one that actually saves engineering time and prevents back-and-forth.

## Acceptance Criteria That Engineers Trust

Vague acceptance criteria cause rework. Use AI to generate precise, testable criteria from user stories:

\`\`\`
Given this user story: [paste story]
Write 4–6 acceptance criteria in Gherkin format (Given… When… Then…).
Include at least one error state and one edge case.
\`\`\`

## The Iteration Loop

Draft → stress-test → refine → stakeholder review. AI accelerates the first two steps, which means you can spend more time on the last one. The PRD you share with stakeholders should have your fingerprints on it — the AI draft is a working document, not the final deliverable.`,
        keyTakeaways: [
          "AI eliminates the blank page for PRDs — give it problem, goals, constraints, and exclusions to get a usable first draft",
          "Use AI to stress-test requirements: ambiguities, missing edge cases, conflicting statements, and unanswered engineering questions",
          "Acceptance criteria in Gherkin format (Given/When/Then) are more precise and testable — AI can generate these quickly",
          "The PRD you share should reflect your strategic judgment; AI produces the working draft, not the final deliverable",
        ],
        exercise: {
          title: "PRD Stress-Test",
          description: "Use AI to find the gaps in a PRD you've already written or are currently drafting.",
          steps: [
            "Take a current or recent PRD section — requirements, user stories, or acceptance criteria",
            "Paste it into Claude with the stress-test prompt: ask for ambiguities, missing edge cases, conflicts, and likely engineering questions",
            "Review the AI-identified gaps: which are real issues you missed? Which are not applicable?",
            "For each real gap, either write the clarification yourself or use AI to draft options and then pick one",
            "Share the improved section with a developer and ask if there are still open questions — track what AI missed",
          ],
          tool: "Claude",
        },
        quiz: [
          {
            question: "What is the most important input to include when prompting AI to write a PRD?",
            options: [
              "The names of competitors who have similar features",
              "The feature's brand name and marketing tagline",
              "The problem statement, success metrics, constraints, and explicit out-of-scope items",
              "The engineering team's preferred technology stack",
            ],
            correct: 2,
            explanation: "A PRD is a decision document. Without the problem, success metrics, constraints, and scope boundaries, AI produces generic feature descriptions rather than a useful product specification.",
          },
          {
            question: "A PM asks AI to review their requirements and gets back a list of ambiguities and missing edge cases. What should they do next?",
            options: [
              "Rewrite the entire PRD from scratch based on the AI feedback",
              "Share the AI feedback directly with the engineering team as-is",
              "Evaluate each issue: decide which are real gaps to address and which don't apply, then update the spec",
              "Dismiss the feedback — AI doesn't understand product requirements",
            ],
            correct: 2,
            explanation: "AI identifies potential issues, but you decide which matter given your context. Not every flag will be relevant. Evaluate, decide, and then sharpen the spec where the feedback is valid.",
          },
          {
            question: "Which acceptance criteria format produces the most precise and testable output?",
            options: [
              "Bullet point descriptions of what the feature should do",
              "Gherkin format: Given… When… Then…",
              "Free-form prose describing the expected user experience",
              "A numbered list of design requirements",
            ],
            correct: 1,
            explanation: "Gherkin format (Given/When/Then) makes preconditions, triggers, and expected outcomes explicit. This reduces interpretation variance and makes QA testing directly traceable to the requirement.",
          },
        ],
        applyThisWeek: {
          action: "Use AI to stress-test the requirements in a PRD you're currently writing",
          promptTemplate: "Review these requirements: [paste section]. Identify: (1) any requirement that is ambiguous or can be read two ways, (2) missing error states or edge cases, (3) any two requirements that conflict, (4) questions an engineer would likely ask that this spec doesn't answer.",
          tool: "Claude",
        },
      },
      {
        id: "product-pm-l4",
        title: "Roadmap Communication, Stakeholder Alignment, and Prioritisation with AI",
        duration: 17,
        description: "Use AI to craft roadmap narratives for different audiences, prepare for stakeholder pushback, and structure prioritisation frameworks — without losing the strategic judgment that makes your roadmap defensible.",
        content: `## The Communication Gap in Roadmap Work

A roadmap is only as useful as it is understood. Most PMs spend far more time building the roadmap than communicating it. AI flips the ratio — it can produce audience-tailored versions of the same plan in minutes, freeing you to focus on the conversations themselves.

## Tailoring the Roadmap by Audience

The same roadmap item needs different framing depending on who you're talking to:

\`\`\`
I have a roadmap item: [feature name and brief description].
Write three versions of a one-paragraph explanation:
1. For the CEO: focus on business impact, revenue potential, and strategic fit
2. For the engineering team: focus on scope, technical decisions, and dependencies
3. For a customer: focus on the problem it solves and how it improves their workflow

Keep each under 100 words. Use plain language for the customer version.
\`\`\`

## Preparing for Pushback

Every roadmap review involves stakeholders who want something different. AI helps you anticipate and prepare:

\`\`\`
Here is my proposed roadmap for Q3: [paste items with brief rationale].
What are the 5 most likely objections a sales leader would raise?
For each objection: the likely concern, and a concise, evidence-based response
I could give. Focus on commercial impact and customer commitments.
\`\`\`

Run this for each key stakeholder group before your review meeting. You'll arrive prepared rather than reactive.

## AI-Assisted Prioritisation Frameworks

Prioritisation requires judgment, but AI can apply structured frameworks to your feature list systematically:

\`\`\`
I have this feature list: [paste list with one-line descriptions].
Score each feature using the RICE framework:
- Reach (how many users affected)
- Impact (effect on key metric, scale 1–3)
- Confidence (how sure are we, expressed as a percentage)
- Effort (person-weeks)
Calculate a RICE score for each and rank the list.
Note: use placeholders where I haven't provided data; flag these explicitly.
\`\`\`

The RICE scores are a starting point. Apply your North Star metric alignment and strategic priorities as a second filter.

## The Weekly Stakeholder Update

AI eliminates the "update paralysis" that delays most stakeholder communication:

\`\`\`
Write a weekly product update email for engineering, design, and business stakeholders.
This week: [what shipped, what's in progress, what's blocked, key decisions made].
Tone: clear, confident, brief. Target length: 200 words.
Include one 'why it matters' line for the business audience.
\`\`\`

Consistent, well-framed updates build stakeholder trust faster than quarterly roadmap decks.`,
        keyTakeaways: [
          "AI can produce audience-tailored roadmap explanations (CEO, engineering, customer) in minutes — invest that saved time in the actual conversation",
          "Prepare for stakeholder pushback by prompting AI to generate likely objections and concise responses before every review meeting",
          "Use RICE and other prioritisation frameworks with AI as a systematic starting point, then apply your North Star metric and strategic judgment",
          "Regular, brief stakeholder updates (weekly emails) build more trust than infrequent big-deck presentations",
        ],
        exercise: {
          title: "Roadmap Communication Prep",
          description: "Use AI to prepare a complete stakeholder communication package for one roadmap item.",
          steps: [
            "Pick one significant roadmap item for the next quarter",
            "Generate three audience-tailored versions: CEO/leadership, engineering, and a customer-facing version",
            "Run the pushback preparation prompt for your most challenging stakeholder (e.g., sales leader or CFO)",
            "Apply the RICE framework prompt to your top 5–8 backlog candidates and review the ranking",
            "Draft a weekly update email using AI, then edit for tone accuracy before sending",
          ],
          tool: "Claude",
        },
        quiz: [
          {
            question: "Why should the same roadmap item be framed differently for the CEO versus the engineering team?",
            options: [
              "Because the CEO cannot understand technical details",
              "Because each audience has different priorities, questions, and decision criteria",
              "Because roadmap items need to be kept confidential from engineers",
              "Because AI performs better when generating shorter outputs",
            ],
            correct: 1,
            explanation: "Effective communication means speaking to what each audience cares about. CEOs care about business impact and strategy; engineers care about scope, dependencies, and technical decisions. Same item, different framing.",
          },
          {
            question: "A PM uses AI to generate RICE scores for a feature backlog. What is the correct next step?",
            options: [
              "Use the RICE ranking as the final roadmap — it is objective and bias-free",
              "Share the RICE scores with stakeholders without context",
              "Treat the RICE ranking as a starting point and apply strategic priorities and North Star alignment before finalising",
              "Discard the framework — RICE is too simplistic for real product decisions",
            ],
            correct: 2,
            explanation: "RICE is a structured signal, not a decision. It surfaces patterns and forces explicit thinking about each dimension. You then apply strategic context — company priorities, dependencies, and North Star alignment — before locking the roadmap.",
          },
          {
            question: "What is the best use of the time saved when AI drafts stakeholder communication?",
            options: [
              "Running more AI prompts to generate additional content",
              "Reducing the frequency of stakeholder communication since drafts take less time",
              "Investing in the actual conversations — preparation, listening, and relationship depth",
              "Automating all future communications so no manual effort is needed",
            ],
            correct: 2,
            explanation: "Drafting is the overhead; the conversation is the work. When AI handles the drafting, the PM's time is freed for the higher-value activity: building relationships, understanding reactions, and adjusting the strategy based on live feedback.",
          },
        ],
        applyThisWeek: {
          action: "Prepare your next roadmap review by generating audience-tailored versions and a pushback preparation brief with AI",
          promptTemplate: "Here is my roadmap item: [name and description]. Write three versions: (1) for CEO (business impact, strategy), (2) for engineering (scope, dependencies, technical decisions), (3) for a customer (problem solved, workflow improvement). Then list the 4 most likely objections from a sales leader and a concise response to each.",
          tool: "Claude",
        },
      },
    ],
  },

  "po": {
    title: "AI for Product Owners",
    description: "Master backlog management, user story writing, sprint planning, and retrospective analysis using AI — so you spend less time on documentation and more time ensuring the team builds the right things.",
    lessons: [
      {
        id: "product-po-l1",
        title: "AI for Product Owners: Backlog Mastery and Sprint Efficiency",
        duration: 17,
        description: "Understand how AI fits into the Product Owner role — which backlog and sprint activities it accelerates, and where your judgment and team knowledge remain essential.",
        content: `## The Product Owner's Daily Reality

The PO role is defined by throughput: keeping the backlog healthy, stories well-defined, acceptance criteria clear, and the team unblocked. It's a constant, volume-heavy workload. AI directly reduces the production cost of this work — not the judgment behind it, but the writing, structuring, and formatting that surrounds it.

## Where AI Saves POs the Most Time

**User story writing.** Converting a rough feature idea into a well-formed user story with acceptance criteria takes 15–30 minutes manually. With AI, the draft takes 2 minutes. You spend the remaining time refining rather than creating from scratch.

**Backlog descriptions.** Keeping backlog items descriptive enough that they make sense without explanation is a perpetual PO challenge. AI can enrich thin backlog entries into clear, self-contained descriptions.

**Sprint notes and meeting prep.** Synthesis of what was discussed in refinement or planning — AI can turn bullet notes into structured summaries.

**Retrospective analysis.** AI can cluster retrospective feedback into themes and surface patterns across multiple sprints.

## The PO's Starter Prompt

\`\`\`
You are a product owner working on [product name], a [brief description].
Our users are [user type]. The current sprint goal is: [sprint goal].
I need you to help me write a user story for the following feature idea: [idea].
Include: User Story (As a… I want to… So that…), 4–6 Acceptance Criteria in
Gherkin format, and 2 edge cases to consider.
\`\`\`

## What AI Cannot Do in the PO Role

**Understand your team's velocity and capacity.** Story point estimates require knowing your team — how they work, their skill mix, and what "normal" looks like for your sprint. AI can suggest estimates; you and the team calibrate.

**Know your Definition of Done.** AI doesn't know what your team has agreed constitutes "done." Always layer your DoD on top of AI-generated acceptance criteria.

**Replace refinement conversations.** The backlog grooming session is where the team aligns on what they're building and why. AI prepares you for that conversation — it doesn't replace it.`,
        keyTakeaways: [
          "AI reduces the production cost of PO work — story writing, backlog descriptions, sprint notes — not the judgment behind them",
          "A well-structured starter prompt (product context + sprint goal + feature idea) produces usable first drafts in under 2 minutes",
          "Always layer your team's Definition of Done on top of AI-generated acceptance criteria",
          "AI prepares you for refinement conversations; it cannot replace the alignment those conversations create",
        ],
        exercise: {
          title: "Backlog Health Sprint",
          description: "Use AI to improve the quality of your five thinnest backlog items in a single session.",
          steps: [
            "Identify five backlog items that are underdeveloped — missing context, vague descriptions, or no acceptance criteria",
            "For each item, write a two-sentence brief: what it is, who it's for, and what problem it solves",
            "Paste all five briefs into Claude with the starter prompt and generate full user stories with acceptance criteria",
            "Review each output against your team's Definition of Done and add anything missing",
            "Bring the improved items to your next refinement session and track whether the team's questions decrease",
          ],
          tool: "Claude",
        },
        quiz: [
          {
            question: "Which PO activity is the highest-leverage use case for AI assistance?",
            options: [
              "Deciding which stories to include in the sprint",
              "Writing and refining user stories and acceptance criteria",
              "Facilitating the daily standup",
              "Setting the sprint goal with the Scrum Master",
            ],
            correct: 1,
            explanation: "User story and acceptance criteria writing is high-volume, repetitive, and structurally consistent — exactly where AI reduces effort most dramatically while leaving the judgment decisions to the PO.",
          },
          {
            question: "An AI generates acceptance criteria for a user story. What must the PO add before the story is refinement-ready?",
            options: [
              "Story points agreed by the development team",
              "A link to the competitor product that inspired the feature",
              "A review against the team's Definition of Done to catch anything AI doesn't know about",
              "Approval from the project sponsor",
            ],
            correct: 2,
            explanation: "AI doesn't know your team's Definition of Done, which is unique to your context and agreements. Always check AI-generated acceptance criteria against your DoD before treating a story as ready.",
          },
          {
            question: "What is the correct role of AI in backlog refinement sessions?",
            options: [
              "AI should run the session to ensure consistency",
              "AI replaces the need for refinement by producing complete, final stories",
              "AI prepares better-quality input for refinement; the session itself remains a team alignment activity",
              "AI should vote on story point estimates to remove subjectivity",
            ],
            correct: 2,
            explanation: "Refinement is fundamentally a team alignment activity. AI improves the quality of what the team reviews — making sessions more productive — but cannot replace the shared understanding that emerges from the conversation itself.",
          },
        ],
        applyThisWeek: {
          action: "Use AI to draft complete user stories for your next five backlog items before your next refinement session",
          promptTemplate: "You are a product owner for [product]. Users are [user type]. Write a user story for this feature: [idea]. Include: User Story (As a… I want to… So that…), 5 acceptance criteria in Gherkin format (Given/When/Then), and 2 edge cases to explore in refinement.",
          tool: "Claude",
        },
      },
      {
        id: "product-po-l2",
        title: "User Story Writing, Acceptance Criteria, and Backlog Grooming with AI",
        duration: 20,
        description: "Build a repeatable AI-assisted workflow for writing high-quality user stories, precise acceptance criteria, and well-maintained backlog descriptions — consistently and at scale.",
        content: `## The Cost of Vague Stories

The most expensive thing in software delivery is ambiguity. A vague user story generates back-and-forth between the PO and developers, leads to wrong implementations, and causes rework that eats into sprint velocity. AI helps PMs produce stories that are precise enough to build from on the first attempt.

## The Story Writing Workflow

**Step 1: Brief.** Capture the rough idea in 2–3 sentences: what, who, and why.

**Step 2: Generate.** Use AI to structure the story and draft acceptance criteria.

**Step 3: Stress-test.** Ask AI to identify ambiguities and missing edge cases in the draft.

**Step 4: Refine.** Apply your team's context, Definition of Done, and any domain knowledge the AI lacks.

**Step 5: Validate.** Bring to refinement. The story should answer most questions before they're asked.

## The Story Writing Prompt

\`\`\`
You are a product owner. Write a complete user story for the following feature:

Feature: [name and one-line description]
User type: [who this is for]
Problem being solved: [what pain point or job to be done]
Business context: [why this matters now]

Output:
1. User story in As a / I want to / So that format
2. 5 acceptance criteria in Gherkin format (Given / When / Then)
3. 2 edge cases or error states to consider
4. Any ambiguities in my brief that need clarification before development
\`\`\`

## Backlog Grooming at Scale

When your backlog has 40+ items and they're all thin, AI can enrich them in bulk:

\`\`\`
Here are 8 thin backlog items from our product board: [paste titles and brief notes].
For each item:
1. Write a one-paragraph description clear enough for a developer who wasn't in the
   meeting where it was discussed
2. Identify the primary user type
3. Flag any item where the problem statement is still unclear
\`\`\`

## Story Splitting with AI

Large stories that won't fit in a sprint need splitting. AI can propose vertical slices:

\`\`\`
This story is too large for one sprint: [paste story].
Propose 3–4 vertical slices — each independently deliverable and valuable.
Each slice should follow the As a / I want to / So that format.
Explain what value each slice delivers on its own.
\`\`\`

Vertical slices are preferred over horizontal layers (front-end in one sprint, back-end in the next) because they maintain flow of value to users.`,
        keyTakeaways: [
          "The five-step story workflow (brief, generate, stress-test, refine, validate) produces consistently higher-quality output than writing from scratch",
          "Asking AI to identify ambiguities in your own brief is one of the most powerful PO uses of AI — it catches gaps before development does",
          "Use AI to enrich thin backlog items in bulk — a 40-item backlog cleanup that took a day now takes an hour",
          "Story splitting with AI produces vertical slices that maintain independent value delivery in each sprint",
        ],
        exercise: {
          title: "Story Quality Benchmark",
          description: "Compare the quality of an AI-assisted story against a manually written one using developer feedback.",
          steps: [
            "Pick two similar backlog items: write one entirely by hand, and use the AI workflow for the other",
            "Bring both to your next refinement session without telling the team which was AI-assisted",
            "Track the number of clarifying questions asked for each story during refinement",
            "After the sprint, compare rework rates or back-and-forth messages for items based on each story",
            "Use the comparison to refine your prompt template — what context produced the best AI output?",
          ],
          tool: "Claude",
        },
        quiz: [
          {
            question: "Why should a PO ask AI to identify ambiguities in their own feature brief before generating a full story?",
            options: [
              "To reduce the length of the final user story",
              "To catch unclear requirements before development raises them — preventing costly mid-sprint clarifications",
              "To demonstrate technical knowledge during refinement sessions",
              "Because AI cannot generate acceptance criteria without a complete brief",
            ],
            correct: 1,
            explanation: "Mid-sprint clarifications are expensive because they interrupt flow and sometimes require rework. Catching ambiguities in the brief before the story is written and estimated prevents this cost.",
          },
          {
            question: "What does 'vertical slicing' mean in the context of story splitting?",
            options: [
              "Splitting a story by UI layer, back-end, and database work",
              "Splitting a story into independently valuable slices each of which delivers end-to-end functionality",
              "Dividing a story between two different developers",
              "Reducing a story's acceptance criteria to fit it into a sprint",
            ],
            correct: 1,
            explanation: "Vertical slicing means each sub-story delivers a thin but complete piece of value to the user — front-to-back in scope. Horizontal splitting (UI in one sprint, API in the next) delays value delivery and increases integration risk.",
          },
          {
            question: "A PO uses AI to enrich 30 thin backlog items overnight. What should they do before adding the enriched descriptions to the product board?",
            options: [
              "Nothing — AI output is accurate and can be published directly",
              "Have the development team review all 30 items for technical accuracy",
              "Review each AI-generated description for accuracy and add any missing business context the AI couldn't know",
              "Ask the Scrum Master to approve the items before adding them",
            ],
            correct: 2,
            explanation: "AI doesn't have your business context, stakeholder agreements, or team-specific constraints. A quick review pass ensures the enriched descriptions are accurate and complete before the team relies on them.",
          },
        ],
        applyThisWeek: {
          action: "Enrich your five thinnest backlog items using AI and bring them to your next refinement session",
          promptTemplate: "Here are [N] thin backlog items: [paste titles and notes]. For each: (1) write a one-paragraph description that a developer who wasn't in the original meeting can understand, (2) identify the primary user type, (3) flag items where the problem statement is still unclear and list what information is missing.",
          tool: "Claude",
        },
      },
      {
        id: "product-po-l3",
        title: "Sprint Planning, Estimation, and Dependency Mapping with AI",
        duration: 18,
        description: "Use AI to prepare for sprint planning, structure estimation conversations, surface dependency risks, and produce better sprint goal clarity — so your sprints start with alignment rather than confusion.",
        content: `## Where Sprint Planning Goes Wrong

Sprint planning fails when stories are underspecified, dependencies are invisible, or the team discovers scope problems mid-session. AI can help the PO prepare more thoroughly so that planning sessions are decision-making meetings rather than clarification sessions.

## Pre-Planning Preparation with AI

Before the planning session, use AI to:

**Summarise what's in scope:**
\`\`\`
Here is our candidate list for the next sprint: [paste items].
Our sprint goal is: [goal].
Summarise how each item contributes to the sprint goal. Flag any item
that doesn't clearly connect. Suggest a tighter sprint goal if the
current one is too broad.
\`\`\`

**Map dependencies:**
\`\`\`
Here are 8 stories planned for our next sprint: [paste stories with brief descriptions].
Identify potential dependencies between stories. For each dependency: which story
depends on which, what the risk is if the dependency isn't met, and whether the
dependency can be resolved before the sprint starts.
\`\`\`

## AI-Assisted Estimation Conversations

AI doesn't replace planning poker or team-calibrated estimates, but it can structure the conversation:

\`\`\`
Here is a user story: [paste story with acceptance criteria].
Based on typical complexity patterns for this type of work, suggest a story point
range (using Fibonacci: 1, 2, 3, 5, 8, 13).
List the main factors that would push the estimate higher or lower.
Identify any unknowns that the team should resolve before finalising the estimate.
\`\`\`

This gives the team a starting point and surfaces the right estimation discussion — instead of starting from zero every time.

## Sprint Goal Clarity

A vague sprint goal makes mid-sprint trade-off decisions harder. AI can sharpen it:

\`\`\`
Our sprint candidate list: [paste items].
Draft 3 versions of a sprint goal that captures the theme of this work:
1. User-outcome focused: what will users be able to do?
2. Business-outcome focused: what metric or business result does this advance?
3. Team-learning focused: what will the team understand better by end of sprint?
We will choose one in planning. Keep each under 15 words.
\`\`\`

## Post-Planning Sprint Summary

After planning, AI can produce the sprint summary the team references during standups:

\`\`\`
Here is the sprint plan: [paste committed stories and assignments].
Write a sprint summary in plain language: sprint goal, committed stories with one-line
descriptions, identified risks, and key dependencies to monitor.
\`\`\``,
        keyTakeaways: [
          "Use AI before sprint planning to align candidate stories to the sprint goal and surface hidden dependencies",
          "AI estimation prompts give teams a structured starting point and surface the unknowns that drive planning poker disagreement",
          "A well-drafted sprint goal (under 15 words, outcome-focused) makes mid-sprint decisions easier — AI can generate three options for the team to choose from",
          "A post-planning sprint summary produced by AI gives the team a shared reference for standups and scope questions during the sprint",
        ],
        exercise: {
          title: "Sprint Pre-Planning Pack",
          description: "Produce a complete pre-planning brief using AI before your next sprint planning session.",
          steps: [
            "One day before planning, paste your candidate story list into Claude with the sprint goal alignment prompt",
            "Run the dependency mapping prompt — identify which dependencies need resolution before the sprint starts",
            "Use the sprint goal clarity prompt to generate three goal options for the team to select from in planning",
            "After planning, generate the sprint summary and share it in your team channel",
            "At the end of the sprint, check how many of the AI-identified risks actually materialised",
          ],
          tool: "Claude",
        },
        quiz: [
          {
            question: "What is the primary benefit of using AI to map dependencies before sprint planning?",
            options: [
              "AI can assign stories to developers automatically based on dependencies",
              "Dependency risks are surfaced before planning rather than discovered mid-sprint, where they cause disruption",
              "It eliminates the need for a sprint planning session",
              "AI generates a complete sprint plan without team input",
            ],
            correct: 1,
            explanation: "Dependencies discovered mid-sprint cause blocking, scope changes, and missed goals. Surfacing them before planning allows the team to sequence work correctly or resolve blockers proactively.",
          },
          {
            question: "How should AI-suggested story point ranges be used in sprint planning?",
            options: [
              "As the final estimate — teams should accept AI suggestions to save time",
              "As a structured starting point that gives the team a reference and surfaces the key estimation variables",
              "They should be ignored — only team-calibrated estimates are valid",
              "As a check on whether developers are estimating accurately",
            ],
            correct: 1,
            explanation: "AI estimation suggestions give teams a reference point and surface complexity factors — making planning poker faster and more focused. The team still owns the final estimate because only they know their specific context and velocity.",
          },
          {
            question: "What makes a sprint goal effective according to this lesson?",
            options: [
              "It lists every story committed to the sprint",
              "It is written by the Scrum Master during the planning session",
              "It is outcome-focused, concise (under 15 words), and helps the team make mid-sprint trade-off decisions",
              "It includes story point totals so capacity is clear",
            ],
            correct: 2,
            explanation: "A good sprint goal is a decision-making tool. When scope trade-offs arise mid-sprint, the team checks against the goal to decide what stays and what gets cut. Vague goals make this impossible.",
          },
        ],
        applyThisWeek: {
          action: "Generate a pre-planning brief and dependency map for your next sprint using AI",
          promptTemplate: "Here are the stories being considered for our next sprint: [paste list]. Our sprint goal is: [goal]. (1) Identify which stories don't clearly connect to the goal. (2) Map any dependencies between stories and flag which must be resolved before the sprint starts. (3) Draft 3 alternative sprint goal statements — each under 15 words — that better capture the intended outcome.",
          tool: "Claude",
        },
      },
      {
        id: "product-po-l4",
        title: "Retrospective Analysis and Continuous Improvement with AI",
        duration: 16,
        description: "Use AI to analyse retrospective feedback across sprints, surface recurring patterns, and generate actionable improvement experiments — turning retrospectives from conversations into a continuous improvement engine.",
        content: `## The Retrospective Problem

Most teams hold retrospectives diligently, generate good feedback, and then struggle to close the loop. Action items get lost. Patterns repeat across sprints without anyone noticing. AI can solve both problems: it synthesises feedback into themes and tracks whether the same issues keep appearing.

## Single-Sprint Retrospective Analysis

After collecting retrospective feedback (sticky notes, Miro board, FigJam export), use AI to synthesise:

\`\`\`
Here is the raw retrospective feedback from our sprint: [paste all inputs,
including what went well, what didn't, and suggestions].
Synthesise into:
1. Top 3 themes from "what went well" — what should we protect?
2. Top 3 themes from "what didn't go well" — what most needs addressing?
3. 2–3 improvement experiments: specific, time-boxed actions the team could try
   next sprint. Format each as: Action / Owner / How we'll know it worked.
\`\`\`

## Cross-Sprint Pattern Recognition

The real power comes when you feed multiple sprints of retrospective data:

\`\`\`
Here are retrospective summaries from our last 6 sprints: [paste summaries].
Identify:
1. Recurring problems that appear in 3 or more sprints (systemic issues vs. one-offs)
2. Improvements that have been tried and whether they appear to have worked
3. One blind spot — something the team consistently doesn't mention that the data
   suggests is a problem
\`\`\`

This turns scattered feedback into a development health dashboard.

## Converting Insights to Experiments

Good retrospectives produce action items. Great retrospectives produce experiments — time-boxed, measurable changes the team tries and evaluates:

\`\`\`
Here is a recurring problem from our retrospectives: [describe the issue].
Propose 3 improvement experiments using the format:
- Hypothesis: if we [change], then [outcome] because [reason]
- Action: what specifically we will do differently next sprint
- Measure: how we will know after one sprint if it worked
Keep each experiment small enough to implement in one sprint.
\`\`\`

## Closing the Loop

The retrospective only improves the team if action items are reviewed at the start of the next retro. AI can generate a retro opener:

\`\`\`
Here were the action items from last sprint's retrospective: [list items].
Write a one-paragraph recap of what we committed to and what questions to open
the next retrospective with to assess whether it worked.
\`\`\``,
        keyTakeaways: [
          "AI converts raw retrospective inputs (sticky notes, votes) into structured themes and improvement experiments in minutes",
          "Feeding multiple sprints of retro data to AI reveals systemic patterns that single-sprint analysis misses",
          "Structure improvement actions as experiments with a hypothesis, action, and measure — not just to-do items",
          "Closing the loop (reviewing last retro's actions at the start of the next) is where improvement compounds — AI can generate the opener",
        ],
        exercise: {
          title: "Cross-Sprint Retrospective Audit",
          description: "Use AI to find the recurring patterns across your last four to six retrospectives.",
          steps: [
            "Gather the written outputs from your last four to six retrospectives (raw notes, summaries, or action item lists)",
            "Paste them into Claude with the cross-sprint pattern recognition prompt",
            "Identify which recurring issues are systemic (appearing 3+ times) versus one-off events",
            "For your most persistent problem, use the experiment design prompt to generate three testable improvement experiments",
            "Pick one experiment to run next sprint and add a review of it as the first agenda item in your next retrospective",
          ],
          tool: "Claude",
        },
        quiz: [
          {
            question: "What is the main advantage of feeding multiple retrospective summaries to AI rather than a single one?",
            options: [
              "AI can generate more action items from larger inputs",
              "It reveals systemic patterns and recurring issues that single-sprint analysis obscures",
              "Multi-sprint analysis produces more accurate story point estimates",
              "It reduces the time needed to run each individual retrospective",
            ],
            correct: 1,
            explanation: "Individual retrospectives show what happened this sprint. Multi-sprint analysis shows what keeps happening — the systemic patterns that need structural changes rather than sprint-level fixes.",
          },
          {
            question: "What makes a retrospective action item more effective when structured as an experiment?",
            options: [
              "Experiments require CEO sign-off before they can be tried",
              "Experiments have a hypothesis, specific action, and a measure of success — making evaluation objective",
              "Experiments are longer-term and don't need to be reviewed every sprint",
              "Experiments are assigned to individuals rather than the whole team",
            ],
            correct: 1,
            explanation: "An experiment has a hypothesis (what we expect), an action (what we'll change), and a measure (how we'll know). This turns vague action items into something the team can evaluate objectively after one sprint.",
          },
          {
            question: "How often should the team review previous retrospective action items?",
            options: [
              "Quarterly, during the product review cycle",
              "Only when the Scrum Master requests it",
              "At the start of each retrospective, to assess what was tried and whether it worked",
              "At the end of each retrospective, after new issues have been discussed",
            ],
            correct: 2,
            explanation: "Reviewing previous actions at the start of the retrospective creates accountability and closes the improvement loop. Doing it at the end — or not at all — means the team generates action items that disappear into a backlog never acted on.",
          },
        ],
        applyThisWeek: {
          action: "Run a cross-sprint retrospective analysis using AI and identify your team's most persistent systemic issue",
          promptTemplate: "Here are retrospective summaries from our last [N] sprints: [paste summaries]. Identify: (1) recurring problems appearing in 3 or more sprints, (2) improvement experiments that were tried and whether they appear to have worked, (3) one blind spot the team consistently doesn't surface but the data implies is a problem. Recommend one experiment to run next sprint with a hypothesis, action, and measurable outcome.",
          tool: "Claude",
        },
      },
    ],
  },

  "growth-pm": {
    title: "AI for Growth PMs",
    description: "Design experiments faster, synthesise funnel data more deeply, and communicate growth results with clarity — using AI to compress the analysis loop so you can run more experiments and learn faster.",
    lessons: [
      {
        id: "product-growth-pm-l1",
        title: "AI for Growth PMs: Experiment Fast, Learn Faster",
        duration: 18,
        description: "Understand how AI fits into the growth PM workflow — from hypothesis generation through experiment analysis — and where human judgment about user psychology and business context is irreplaceable.",
        content: `## The Growth PM's Core Loop

Growth is an experimentation discipline. The faster you can move through the hypothesis → design → run → learn loop, the more you learn per quarter. AI compresses every phase of this loop except the "run" phase — the part where real users decide whether your hypothesis was right.

## Where AI Changes Growth Work

**Hypothesis generation.** AI can produce 20 testable hypotheses from a funnel problem description in minutes. You filter for the ones worth running.

**Experiment design.** AI can structure A/B test parameters, define control vs. treatment, and flag common design errors (underpowered tests, multiple variants, confounding changes).

**Data synthesis.** AI can interpret cohort tables, funnel drop-off data, and segment breakdowns — surfacing the "so what" layer that often takes analysts hours to produce.

**Communication.** Growth reports, OKR updates, and stakeholder briefs are faster to produce with AI and better structured for non-technical audiences.

## The Growth PM Hypothesis Prompt

\`\`\`
We are a [product type] with [user type] as our primary audience.
Our current North Star metric is [metric].
We're seeing a [X%] drop-off at [funnel stage].
Generate 10 testable hypotheses for why this drop-off is occurring.
For each hypothesis: the behavioural explanation, the experiment that would
test it, and what a positive result would look like.
Rank by estimated effort to test (low/medium/high).
\`\`\`

## What AI Cannot Do in Growth

**Replace running experiments.** AI can design the test, but only real users can validate it. There is no shortcut to the run phase.

**Know your product's behavioural context.** AI doesn't know your user psychology, your specific conversion funnel, or your historical experiment results. You bring all of that context.

**Prevent p-hacking.** If you give AI partial data and ask it to analyse results, it will. Statistical rigour is your responsibility — AI won't stop you from calling an underpowered test early.

**Replace curiosity.** The best growth PMs are relentlessly curious about user behaviour. AI can accelerate the analysis; it can't generate the curiosity that makes the analysis meaningful.`,
        keyTakeaways: [
          "AI compresses every phase of the growth loop (hypothesis, design, analysis, communication) except the experiment itself",
          "Use AI to generate 10–20 hypotheses quickly and then filter for the ones worth running — abundance over scarcity",
          "Statistical rigour (sample size, significance, early stopping rules) is your responsibility; AI will not enforce it",
          "AI doesn't know your product's behavioural context — you supply that in every prompt to get useful outputs",
        ],
        exercise: {
          title: "Funnel Problem Hypothesis Sprint",
          description: "Generate a prioritised hypothesis list for a real funnel problem using AI.",
          steps: [
            "Identify the biggest drop-off point in your current acquisition or activation funnel",
            "Write a two-paragraph brief: what the drop-off is, what you already know about it, what you've tried",
            "Paste the brief into Claude with the hypothesis generation prompt — ask for 10–15 hypotheses",
            "Filter the list: remove any hypothesis you've already tested, and rank the rest by estimated impact and testability",
            "Pick the top two hypotheses and draft an experiment design for each",
          ],
          tool: "Claude",
        },
        quiz: [
          {
            question: "What is the most valuable use of AI in the growth experimentation loop?",
            options: [
              "Running the A/B test automatically so no engineering support is needed",
              "Replacing the analysis phase entirely once data is collected",
              "Compressing hypothesis generation, experiment design, and results communication — leaving the test itself to real users",
              "Predicting experiment outcomes before any test is run",
            ],
            correct: 2,
            explanation: "AI accelerates the phases that surround the experiment — hypothesis ideation, design structuring, and results synthesis. The experiment itself requires real users and cannot be shortcut.",
          },
          {
            question: "A Growth PM feeds partial A/B test data to AI and asks for an analysis. What is the key risk?",
            options: [
              "AI will refuse to analyse incomplete data",
              "AI may produce a confident-sounding analysis on data that isn't statistically significant — p-hacking risk",
              "AI cannot process A/B test data formats",
              "The analysis will take too long to be useful",
            ],
            correct: 1,
            explanation: "AI will analyse whatever data you give it and can produce plausible-sounding conclusions from underpowered or early-stopped tests. Statistical rigour — knowing when data is sufficient for a call — is a human responsibility.",
          },
          {
            question: "Why should growth PMs prompt AI to generate 15–20 hypotheses rather than just 3–5?",
            options: [
              "More hypotheses means more tests need to be run",
              "Filtering from abundance produces better hypotheses than straining to generate a few",
              "AI performs better with larger output targets",
              "15–20 hypotheses fills a standard sprint backlog",
            ],
            correct: 1,
            explanation: "When you generate abundantly and then filter with your domain judgment, you're more likely to surface the non-obvious, high-quality hypothesis that wouldn't have appeared in a small set. Curation beats scarcity.",
          },
        ],
        applyThisWeek: {
          action: "Generate a prioritised hypothesis list for your highest-priority funnel problem",
          promptTemplate: "We are a [product type]. Our North Star metric is [metric]. We're seeing [X%] drop-off at [funnel stage]. Known context: [what you already know]. Generate 12 testable hypotheses for this drop-off. For each: the behavioural explanation, the experiment that would test it, and what a positive result looks like. Rank by effort to test (low/medium/high).",
          tool: "Claude",
        },
      },
      {
        id: "product-growth-pm-l2",
        title: "Hypothesis Generation, Experiment Design, and A/B Testing with AI",
        duration: 20,
        description: "Build rigorous A/B test designs using AI — from structured hypotheses through sample size, variant design, and success metrics — so every experiment you run is designed to produce a clear learning.",
        content: `## The Difference Between a Test and an Experiment

A test changes something and measures the outcome. An experiment starts with a falsifiable hypothesis, specifies the conditions for a clear result, and produces a learning regardless of whether the variant wins or loses. AI helps you move from ad hoc testing to structured experimentation.

## From Observation to Hypothesis

The best growth hypotheses are specific and falsifiable:

**Weak hypothesis:** "Users drop off at checkout because it's confusing."
**Strong hypothesis:** "Users who reach the checkout step abandon because the total price including shipping is not visible until they click 'Proceed to Payment' — creating a surprise cost reveal that triggers abandonment."

AI can help you sharpen vague observations into specific, testable claims:

\`\`\`
Here is a behaviour I've observed in our funnel data: [describe the pattern].
Convert this into 3 specific, falsifiable hypotheses. For each:
- The hypothesis in if/then form
- The specific user psychology or behaviour it implies
- How you would design a test to validate or invalidate it
- What a null result would still tell you
\`\`\`

## Experiment Design with AI

\`\`\`
I want to test this hypothesis: [paste hypothesis].
Design an A/B test for this experiment:
1. Control: what the current experience is
2. Treatment: what changes and why it should affect the metric
3. Primary metric: what we measure to determine success
4. Guard-rail metrics: what we watch to ensure we're not causing harm elsewhere
5. Minimum detectable effect: the smallest change worth detecting
6. Sample size and duration estimate: based on [baseline conversion rate] and
   [daily unique visitors]
7. Risks: what could confound the results
\`\`\`

## Common Design Errors AI Can Flag

\`\`\`
Here is my proposed A/B test design: [paste design].
Review it for common experiment design errors:
- Is the hypothesis falsifiable?
- Are control and treatment clearly differentiated by one variable?
- Is the primary metric directly tied to the hypothesis?
- Are there likely confounds (seasonal effects, overlapping tests, audience drift)?
- Is the sample size likely to be sufficient for the stated MDE?
\`\`\`

Catching design errors before a test runs saves weeks of wasted traffic and false signals.`,
        keyTakeaways: [
          "A strong growth hypothesis is falsifiable and specific — it names the user behaviour and the mechanism, not just the symptom",
          "A complete experiment design includes primary metric, guard-rail metrics, MDE, sample size, duration, and confound risks",
          "Use AI to review your test designs for common errors before running — catching problems in design is far cheaper than catching them in results",
          "A null result from a well-designed experiment is still a learning — structure tests to produce insight regardless of which variant wins",
        ],
        exercise: {
          title: "Experiment Design Review",
          description: "Use AI to design and then review a real upcoming experiment before it goes live.",
          steps: [
            "Pick an A/B test currently in planning or about to be designed",
            "Write a one-paragraph description of the current experience, the change being made, and what you expect to happen",
            "Use the experiment design prompt to produce a complete test specification",
            "Run the design review prompt on your own spec — ask AI to flag errors and gaps",
            "Fix the issues AI identifies before launching the test and track whether any of the flagged risks materialise",
          ],
          tool: "Claude",
        },
        quiz: [
          {
            question: "What distinguishes a strong growth hypothesis from a weak one?",
            options: [
              "A strong hypothesis is generated by the data team rather than the PM",
              "A strong hypothesis is specific, falsifiable, and names the user behaviour and mechanism — not just the symptom",
              "A strong hypothesis predicts a very large uplift to justify the engineering effort",
              "A strong hypothesis requires no prior data to support it",
            ],
            correct: 1,
            explanation: "A falsifiable, specific hypothesis allows you to design a test that produces a clear yes or no — and understand why. Vague hypotheses produce ambiguous results that don't inform the next decision.",
          },
          {
            question: "Why should A/B tests include guard-rail metrics alongside the primary metric?",
            options: [
              "To give the data team more data to analyse",
              "To ensure a variant that wins on the primary metric hasn't caused harm to other user outcomes",
              "Guard-rail metrics are optional and only needed for high-traffic tests",
              "They are required by most A/B testing tools",
            ],
            correct: 1,
            explanation: "A variant that increases checkout conversion but reduces 30-day retention might appear to be a win on the primary metric while causing net harm. Guard-rail metrics catch these trade-offs before a damaging change is shipped.",
          },
          {
            question: "When is the best time to use AI to review an A/B test design?",
            options: [
              "After the test has run and data is being analysed",
              "Before the test launches — catching design errors in the design phase is far cheaper than in analysis",
              "During test setup in the experimentation platform",
              "After results are significant but before the decision is made",
            ],
            correct: 1,
            explanation: "Design errors discovered after a test runs mean the traffic and time invested produced a flawed signal. Reviewing the design before launch costs minutes; discovering the error in analysis costs weeks.",
          },
        ],
        applyThisWeek: {
          action: "Design your next A/B test using the structured experiment design prompt and run a design review before launching",
          promptTemplate: "I want to test this hypothesis: [hypothesis]. Design an A/B test: (1) Control vs. Treatment with one variable changed, (2) Primary metric, (3) Guard-rail metrics, (4) Minimum detectable effect, (5) Sample size and duration based on [baseline rate] and [daily visitors], (6) Confound risks. Then review this design for common errors: is the hypothesis falsifiable? Is only one variable changed? Is the MDE realistic?",
          tool: "Claude",
        },
      },
      {
        id: "product-growth-pm-l3",
        title: "Funnel Analysis, Cohort Insights, and Behaviour Synthesis with AI",
        duration: 19,
        description: "Use AI to extract the 'so what' layer from funnel data, cohort tables, and behavioural metrics — turning raw numbers into prioritised insights and clear next actions.",
        content: `## The Data-to-Insight Gap

Growth PMs are often data-rich and insight-poor. A cohort table shows you retention curves; it doesn't tell you why the curves look the way they do. A funnel chart shows you drop-off rates; it doesn't explain the user decision behind each drop-off. AI can help bridge that gap — generating candidate explanations and surface questions that deepen the analysis.

## Funnel Analysis Synthesis

\`\`\`
Here is our current conversion funnel data: [paste stage names and conversion rates].
Our North Star metric is [metric]. Primary user segment is [segment].
Analyse this funnel:
1. Identify the biggest drop-off point and its magnitude
2. Generate 5 candidate explanations for why users exit at that stage
3. Identify which explanations are testable with existing data vs. would require
   a new experiment
4. Suggest the highest-priority action: run an experiment, investigate with
   qualitative research, or fix an obvious UX issue
\`\`\`

## Cohort Analysis Interpretation

\`\`\`
Here is a cohort retention table for the last 6 cohorts: [paste table or describe
key numbers — D7, D14, D30 retention by cohort].
Identify:
1. Are retention rates improving, declining, or flat across cohorts?
2. Is there a specific cohort that behaves significantly differently? What might
   have changed around that time?
3. At what day does retention most sharply decline? What does that suggest about
   the product experience at that point in the user journey?
4. What is the likely LTV implication if the current D30 rate holds?
\`\`\`

## Segment Behaviour Synthesis

\`\`\`
I have behavioural data for three user segments: [describe segments and their
key metrics — activation rate, feature usage, retention].
Compare these segments:
1. Which segment is highest value by [North Star metric]?
2. What behaviour most differentiates the highest-value segment from the others?
3. If we could move 10% of Segment B users to behave more like Segment A users,
   what would need to change in the product or onboarding experience?
\`\`\`

## Turning Insights into Actions

\`\`\`
Here are three insights from our latest growth analysis: [paste insights].
For each insight, generate:
- One experiment we could run to validate the implication
- One product or onboarding change the insight suggests if it's already validated
- One question this insight raises that we can't answer with existing data
\`\`\``,
        keyTakeaways: [
          "AI bridges the gap between raw funnel and cohort data and the 'so what' layer — generating candidate explanations and prioritised actions",
          "Cohort analysis prompts should ask AI to identify trend direction, outlier cohorts, and the day-of-sharpest-drop — all leading to specific hypotheses",
          "Segment comparison with AI surfaces the behaviours that differentiate high-value users — the input to activation and onboarding improvements",
          "Always use AI insights as hypotheses to test, not conclusions — the data AI sees is the data you gave it, not the full picture",
        ],
        exercise: {
          title: "Funnel Insight Sprint",
          description: "Use AI to produce a prioritised insight brief from your current funnel or cohort data.",
          steps: [
            "Export or copy your current conversion funnel data (stage names and rates) or a cohort retention table",
            "Run the funnel analysis synthesis prompt — ask for the top drop-off, five explanations, and the highest-priority action",
            "If you have cohort data, run the cohort analysis prompt and identify any outlier cohort or sharp retention drop",
            "Pick the most actionable insight and use the 'turning insights into actions' prompt to generate an experiment or product change",
            "Share the output with your analytics or growth counterpart and calibrate — what did AI get right? What did it miss?",
          ],
          tool: "Claude",
        },
        quiz: [
          {
            question: "A funnel shows a 65% drop-off at the 'Start Free Trial' step. What should AI generate in response to a synthesis prompt?",
            options: [
              "A confirmed diagnosis of why users are dropping off",
              "Candidate explanations for the drop-off and a recommendation for the next investigative step",
              "A complete redesign of the trial signup flow",
              "A statistical model predicting future drop-off rates",
            ],
            correct: 1,
            explanation: "AI generates candidate explanations and prioritises next steps — it does not diagnose causation from conversion rate data alone. The explanation still needs validation through qualitative research or a controlled experiment.",
          },
          {
            question: "What is the most useful thing to look for in a cohort retention analysis?",
            options: [
              "Which cohort has the highest absolute number of users",
              "The average D30 retention rate across all cohorts",
              "Trend direction across cohorts, outlier cohorts, and the day where retention drops most sharply",
              "The total revenue generated per cohort",
            ],
            correct: 2,
            explanation: "Trend direction tells you if retention is improving. Outlier cohorts point to specific changes (product releases, acquisition channel shifts) that affected behaviour. The sharpest drop day reveals where the product experience breaks down.",
          },
          {
            question: "When AI identifies that high-value users share a specific behaviour (e.g., completing a setup step within 24 hours), what is the correct interpretation?",
            options: [
              "Forcing all users to complete that step will improve retention for everyone",
              "This behaviour is likely causally driving retention and should be made mandatory",
              "This is a correlation worth investigating — it may reveal an activation lever, but requires a controlled test to confirm causation",
              "The behaviour should be removed since it creates a barrier for lower-value users",
            ],
            correct: 2,
            explanation: "Correlation between a behaviour and high value does not confirm causation. High-value users may complete that step because they are already more engaged — not because the step made them engaged. A controlled test is needed to confirm the causal link.",
          },
        ],
        applyThisWeek: {
          action: "Run a funnel or cohort analysis using AI and produce a prioritised insight brief for your next growth review",
          promptTemplate: "Here is our funnel data: [paste stages and rates]. Our North Star metric is [metric]. Analyse: (1) identify the biggest drop-off point and its magnitude, (2) generate 5 candidate explanations for exits at that stage, (3) classify each explanation as testable with existing data or requires a new experiment, (4) recommend the highest-priority next action.",
          tool: "Claude",
        },
      },
      {
        id: "product-growth-pm-l4",
        title: "Growth Reporting, OKR Tracking, and Stakeholder Communication with AI",
        duration: 17,
        description: "Use AI to transform growth data into compelling, audience-appropriate narratives — for weekly growth reviews, OKR updates, and leadership briefings — without spending hours on presentation preparation.",
        content: `## The Reporting Tax on Growth PMs

Growth PMs often spend as much time reporting on experiments as running them. Weekly reviews, monthly OKR updates, quarterly business reviews — each requires the same data repackaged for a different audience with a different level of technical depth. AI eliminates most of the repackaging effort.

## The Weekly Growth Review Brief

\`\`\`
Here is our growth data for the week ending [date]:
- North Star metric: [metric name], [current value], [week-over-week change]
- Active experiments: [list with brief status]
- Experiments completed this week: [results summary]
- Key anomalies or surprises: [any unusual data]
- Next week's priorities: [top 3 actions]

Write a weekly growth review brief for the product and leadership team.
Format: 3-bullet executive summary at the top, then a structured breakdown by section.
Tone: data-driven, direct, no hedging. Flag anything that requires a decision.
\`\`\`

## OKR Progress Narrative

\`\`\`
Our growth OKRs for this quarter:
Objective: [objective statement]
Key Results:
- KR1: [target] → current: [current value] ([% complete])
- KR2: [target] → current: [current value] ([% complete])
- KR3: [target] → current: [current value] ([% complete])

Write a one-paragraph OKR progress narrative for the quarterly business review.
Be honest about what's off track and why. Suggest one specific action for any KR
that is behind. Avoid corporate hedging language.
\`\`\`

## Experiment Portfolio Summary

\`\`\`
Here is our experiment portfolio for Q[X]: [list experiments with hypothesis,
status, and result — win/loss/inconclusive + effect size].

Summarise the quarter's experimentation programme:
1. Win rate and what types of hypotheses performed best
2. Most significant learning — including from failed experiments
3. What the portfolio tells us about where the highest-leverage opportunities are
4. Recommended focus areas for next quarter based on learnings
\`\`\`

## Making Growth Results Accessible

Growth results often contain statistical concepts (confidence intervals, p-values, MDE) that non-technical stakeholders find opaque. AI can translate:

\`\`\`
Here are the results of our experiment: [paste results including statistical details].
Translate this for a non-technical executive audience in 3–4 sentences.
Use plain language. Avoid statistical jargon. Make the decision implication clear:
what should we do with this result, and why?
\`\`\``,
        keyTakeaways: [
          "AI can transform raw growth data into audience-appropriate narratives in minutes — reducing reporting time dramatically",
          "OKR progress narratives should be honest about what's off track and why — use AI to draft clearly but review for corporate hedging before sending",
          "An experiment portfolio review reveals which hypothesis types produce wins and where the highest-leverage opportunities lie — AI can generate this analysis",
          "Translating statistical results into plain-language decision implications for executives is one of the highest-value growth communication tasks AI can support",
        ],
        exercise: {
          title: "Growth Review Pack",
          description: "Produce a complete weekly growth review brief and an OKR progress update using AI.",
          steps: [
            "Gather this week's growth data: North Star metric movement, active experiments, completed experiments with results",
            "Use the weekly growth review brief prompt to produce a structured brief for your next review meeting",
            "Run the OKR progress narrative prompt for your current quarter's growth OKRs",
            "If you have an experiment that produced statistical results, use the plain-language translation prompt",
            "Review all AI outputs for accuracy and corporate hedging before sharing — AI tends toward diplomatic softness on bad news",
          ],
          tool: "Claude",
        },
        quiz: [
          {
            question: "What is the primary goal of translating A/B test results into plain language for executives?",
            options: [
              "To hide the statistical complexity of the analysis",
              "To make the decision implication clear — what should be done and why — without requiring statistical knowledge",
              "To reduce the length of the growth report",
              "To make growth work appear simpler than it is",
            ],
            correct: 1,
            explanation: "Executives need to make decisions, not understand statistical methods. The translation turns statistical output into a clear recommendation: ship it, don't ship it, or run a larger test — with the reason stated plainly.",
          },
          {
            question: "What should a Growth PM review AI-generated OKR progress narratives for before sharing?",
            options: [
              "Grammar and spelling errors only",
              "Corporate hedging language that softens bad news — AI often defaults to diplomatic softness",
              "Whether the narrative is long enough to seem thorough",
              "Whether all three Key Results are mentioned equally",
            ],
            correct: 1,
            explanation: "AI tends to soften negative news with qualifications and hedging. OKR updates are more useful when they're honest about what's off track and why. Edit AI output to restore directness before sharing with leadership.",
          },
          {
            question: "What does an experiment portfolio review reveal that a single experiment result cannot?",
            options: [
              "The exact statistical significance of each individual test",
              "Which hypothesis types consistently produce wins and where the highest-leverage growth opportunities are",
              "The revenue impact of each individual experiment",
              "Which developers built the most reliable experiments",
            ],
            correct: 1,
            explanation: "A portfolio view surfaces patterns: do copy changes consistently outperform UX changes? Do activation experiments beat retention experiments? This informs where to focus experimentation effort in the next quarter.",
          },
        ],
        applyThisWeek: {
          action: "Produce this week's growth review brief and OKR progress update using AI, then edit for directness before sharing",
          promptTemplate: "Here is our growth data for the week: North Star metric: [metric, value, WoW change]. Active experiments: [list]. Completed experiments: [results]. Key anomalies: [any surprises]. Next week's priorities: [top 3]. Write a weekly growth review brief: 3-bullet executive summary at the top, then structured breakdown by section. Tone: data-driven, direct, flag anything requiring a decision.",
          tool: "Claude",
        },
      },
    ],
  },

  "cpo": {
    title: "AI for CPOs and Product Leaders",
    description: "Use AI to sharpen portfolio strategy, accelerate resource allocation decisions, build an AI-native product culture, and govern AI risk — so you lead the product organisation with greater clarity and speed.",
    lessons: [
      {
        id: "product-cpo-l1",
        title: "The CPO's AI Product Strategy Framework",
        duration: 18,
        description: "Develop a structured framework for integrating AI into your product strategy — across portfolio prioritisation, competitive positioning, and the decisions that define the kind of company you're building.",
        content: `## AI as a Strategic Variable, Not a Feature

For CPOs, AI is no longer a feature decision — it's a strategic variable that affects how you compete, what talent you need, how fast you can learn, and what kind of product organisation you're building. The question is no longer whether to integrate AI, but where it creates the most durable competitive advantage.

## The CPO AI Strategy Framework

**Layer 1: Internal productivity.** AI as a force multiplier for your team — research synthesis, spec writing, experiment design, reporting. Lower risk, immediate ROI, no customer-facing risk.

**Layer 2: AI-enhanced product capabilities.** AI inside the product — personalisation, summarisation, search, recommendation, intelligent defaults. Requires data infrastructure and trust design.

**Layer 3: AI-native competitive positioning.** AI as the core of your competitive differentiation — where your product does something that competitors cannot replicate without a comparable AI investment.

Most organisations should be actively executing Layer 1, building Layer 2, and thinking carefully about where Layer 3 applies to their market position.

## Using AI for Competitive Intelligence

\`\`\`
You are a product strategist. I need to understand the AI capabilities of our
key competitors. Here is what I know about each: [paste competitor summaries].
Analyse:
1. Which competitors have the deepest AI investment and where it's deployed
2. Which AI capabilities appear to be durable differentiators vs. easily copied
3. Where our product has an AI capability gap vs. where we have an advantage
4. The most defensible AI-powered positioning we could develop in the next 12 months
\`\`\`

## The Strategic Questions AI Helps You Answer

- **Portfolio allocation:** Given our resources, which bets have the best expected return?
- **Build vs. buy vs. partner:** For each AI capability we need, what's the right sourcing decision?
- **Speed to market:** Where can AI compress our development cycle enough to change our competitive timing?
- **Moat building:** Where does AI investment compound over time (data flywheel, model improvement) versus where does it commoditise?

## What CPOs Must Still Own

Strategy is inherently about values and priorities. AI can model scenarios and surface options — it cannot decide what kind of company you're building, which customers matter most, or what trade-offs are acceptable. Those remain irreducibly human leadership decisions.`,
        keyTakeaways: [
          "Frame AI strategy in three layers: internal productivity, AI-enhanced product capabilities, and AI-native competitive positioning",
          "Use AI for competitive intelligence synthesis — identifying durable differentiators versus easily-copied AI features",
          "The strategic questions (portfolio allocation, build/buy/partner, moat building) are the right frame for CPO AI investment decisions",
          "Strategy decisions about company direction, customer priorities, and acceptable trade-offs remain irreducibly human leadership choices",
        ],
        exercise: {
          title: "AI Strategy Layer Assessment",
          description: "Assess where your product organisation sits across the three AI strategy layers and identify the highest-priority next investment.",
          steps: [
            "Map your current AI investments and plans to the three layers (internal productivity, product capabilities, competitive positioning)",
            "Identify gaps at each layer: where is the team underinvesting relative to competitive pressure?",
            "Use the competitive intelligence prompt to assess your three biggest competitors' AI positioning",
            "Identify one AI bet at each layer that would advance your competitive position in the next 12 months",
            "Present the framework and your layer assessment to your leadership team and use their reactions to refine your strategic priorities",
          ],
          tool: "Claude",
        },
        quiz: [
          {
            question: "What is the key distinction between an AI capability that is a durable differentiator versus one that is easily copied?",
            options: [
              "Durable differentiators cost more to build",
              "Durable differentiators rely on proprietary data, network effects, or compounding model improvements that competitors cannot quickly replicate",
              "Easily copied capabilities use open-source models",
              "Durable differentiators are only available to enterprise products",
            ],
            correct: 1,
            explanation: "AI capabilities that improve with proprietary data (data flywheels), rely on network effects, or require domain-specific model training compound over time. Generic AI features built on the same underlying models as competitors can be replicated quickly.",
          },
          {
            question: "Which AI strategy layer should most organisations prioritise first?",
            options: [
              "Layer 3 — AI-native competitive positioning — because it has the highest strategic upside",
              "Layer 2 — AI-enhanced product capabilities — because customers expect them",
              "Layer 1 — internal AI productivity — because it is lower risk, immediate ROI, and builds team AI capability",
              "All three layers simultaneously to maximise speed",
            ],
            correct: 2,
            explanation: "Layer 1 (internal productivity) delivers immediate ROI, builds the team's AI muscle, and carries minimal customer-facing risk. It's the right foundation before investing heavily in Layers 2 and 3.",
          },
          {
            question: "What is the most important thing a CPO must own personally that AI cannot replace?",
            options: [
              "Competitive intelligence gathering",
              "Portfolio performance reporting",
              "The strategic direction decisions — what kind of company you're building, which customers matter most, and which trade-offs are acceptable",
              "Experiment design and A/B test analysis",
            ],
            correct: 2,
            explanation: "Strategy is about values, priorities, and trade-offs shaped by the company's context, funding stage, and culture. AI can model scenarios and surface options, but the decision about what kind of company you're building is an irreducibly human leadership responsibility.",
          },
        ],
        applyThisWeek: {
          action: "Map your product organisation's AI investments to the three strategy layers and identify the most critical gap",
          promptTemplate: "You are a product strategist. Here is what I know about my key competitors' AI capabilities: [paste summaries]. Analyse: (1) which competitors have the deepest AI investment and where it's deployed, (2) which AI capabilities appear to be durable differentiators vs. easily copied, (3) where we have an AI capability gap and where we have an advantage, (4) the most defensible AI-powered positioning we could develop in the next 12 months.",
          tool: "Claude",
        },
      },
      {
        id: "product-cpo-l2",
        title: "Portfolio Prioritisation and Resource Allocation with AI",
        duration: 19,
        description: "Use AI to model portfolio trade-offs, stress-test allocation decisions, and structure the evidence base for investment choices — so your resource decisions are faster, clearer, and better defended.",
        content: `## The Portfolio Prioritisation Challenge

CPOs operate across multiple product lines, platforms, and investment horizons simultaneously. The portfolio prioritisation question — where to allocate engineering, design, and PM capacity for maximum impact — is one of the hardest decisions in product leadership. AI cannot make that decision, but it can dramatically improve the quality of the evidence and scenario modelling that informs it.

## Building the Evidence Base

\`\`\`
I need to prioritise resource allocation across these product areas for the next quarter:
[List product areas with brief descriptions, current metrics, and strategic importance]

For each area, generate a structured assessment:
1. Current momentum (are metrics trending up, flat, or declining?)
2. Opportunity size (what is the realistic upside if this area receives more investment?)
3. Investment risk (what is the downside if this area is under-resourced?)
4. Strategic fit (how directly does this advance our North Star metric and company OKRs?)
5. Dependencies (does this area block or enable other areas?)

Output as a decision matrix I can use in a leadership prioritisation session.
\`\`\`

## Scenario Modelling for Allocation Decisions

\`\`\`
Here are three resource allocation scenarios for Q[X]:
Scenario A: [describe allocation — e.g., 60% core product, 30% new initiative, 10% platform]
Scenario B: [describe allocation]
Scenario C: [describe allocation]

For each scenario, project:
- What is most likely to go well?
- What is most likely to go wrong?
- What assumption is each scenario betting on being true?
- Which scenario is most resilient if the primary assumption turns out to be wrong?
\`\`\`

## Preparing the Prioritisation Discussion

\`\`\`
I am preparing a portfolio prioritisation discussion for the leadership team.
Here are the competing investment cases on the table: [paste briefs].
Generate:
1. The three most important questions the leadership team should answer before
   making an allocation decision
2. The most common allocation mistakes companies make at our stage [describe stage]
3. A suggested decision-making framework for the session: criteria, weighting,
   and how to handle ties or near-ties
\`\`\`

## After the Decision: Communication

Once allocation decisions are made, AI helps communicate them with clarity:

\`\`\`
We have made the following portfolio allocation decisions for Q[X]: [describe decisions].
Write a communication to the product and engineering leadership team:
- What was decided
- The strategic rationale (not just "the business needs it")
- What this means for teams whose priorities have changed
- How we will reassess if key assumptions prove wrong
Tone: direct, empathetic, no corporate language.
\`\`\``,
        keyTakeaways: [
          "Use AI to build a structured decision matrix for portfolio areas — momentum, opportunity size, risk, strategic fit, and dependencies",
          "Scenario modelling reveals which assumption each allocation choice is betting on — making the decision logic explicit and testable",
          "The best portfolio prioritisation discussions are shaped by the right questions, not just the available data — AI can generate those questions",
          "Communicate allocation decisions with the strategic rationale, not just the outcome — AI can draft this in plain language",
        ],
        exercise: {
          title: "Portfolio Prioritisation Prep",
          description: "Use AI to prepare a structured portfolio prioritisation brief for your next leadership resource discussion.",
          steps: [
            "List your three to five main product investment areas with current metrics and brief strategic context",
            "Run the evidence base prompt to generate a structured assessment for each area",
            "Define two to three allocation scenarios and run the scenario modelling prompt",
            "Use the prioritisation discussion prep prompt to generate the three key questions for your leadership session",
            "After the session, use the communication prompt to draft the allocation decision communication",
          ],
          tool: "Claude",
        },
        quiz: [
          {
            question: "What is the most valuable output of AI-assisted portfolio scenario modelling for a CPO?",
            options: [
              "A definitive resource allocation recommendation that removes the need for leadership debate",
              "Making explicit which assumption each scenario is betting on — so the decision logic can be examined and tested",
              "A ranked list of product areas by ROI that the CFO can approve",
              "An analysis of competitor resource allocation that benchmarks your decisions",
            ],
            correct: 1,
            explanation: "Allocation decisions are bets on assumptions about the future. Making those assumptions explicit — rather than implicit — allows leadership to debate the right thing: which future is most likely, and which bet is most resilient if the assumption is wrong.",
          },
          {
            question: "Why should portfolio allocation decisions be communicated with strategic rationale rather than just the outcome?",
            options: [
              "To make the decision appear more complex and well-considered",
              "Because teams whose priorities have changed need to understand why to stay aligned and motivated",
              "To satisfy investor reporting requirements",
              "So that the decision can be reversed if stakeholders disagree",
            ],
            correct: 1,
            explanation: "Teams that understand the 'why' behind a decision can make better micro-decisions during execution and are more resilient when conditions change. Teams that only know the 'what' feel managed, not led.",
          },
          {
            question: "Which dimension is most critical to assess when building a portfolio decision matrix?",
            options: [
              "The number of engineers currently assigned to each area",
              "The design team's preference for each product area",
              "Strategic fit — how directly each area advances the North Star metric and company OKRs",
              "The age of each product area in the portfolio",
            ],
            correct: 2,
            explanation: "Resource allocation should advance the company's strategic priorities. Without assessing strategic fit, you risk investing heavily in areas that perform well in isolation but don't advance the company's most important goals.",
          },
        ],
        applyThisWeek: {
          action: "Build a decision matrix for your next portfolio prioritisation discussion using AI",
          promptTemplate: "I need to prioritise resource allocation across these product areas for next quarter: [list areas with metrics and context]. For each area: (1) current momentum (trending up/flat/down), (2) opportunity size if invested, (3) risk if under-resourced, (4) strategic fit with our North Star metric, (5) dependencies on or from other areas. Output as a decision matrix for a leadership prioritisation session.",
          tool: "Claude",
        },
      },
      {
        id: "product-cpo-l3",
        title: "Building an AI-Native Product Culture and Team",
        duration: 17,
        description: "Develop the leadership practices, hiring criteria, team norms, and learning culture that make your product organisation genuinely AI-capable — not just AI-aware.",
        content: `## AI Capability Is a Team Sport

Individual AI proficiency scales linearly. An AI-capable team scales exponentially. The CPO's job is not to become the best AI user on the team — it's to build an organisation where AI fluency is a shared capability that compounds over time.

## What an AI-Native Product Culture Looks Like

**Norms:** Teams share prompts that work. AI-assisted work is reviewed and improved, not hidden or over-credited. Failure to use AI for high-volume production work is as notable as failure to use version control.

**Rituals:** Weekly "best prompt" sharing. Monthly AI tool reviews. Sprint retrospectives include "where could AI have helped more?" as a standing question.

**Hiring signals:** Candidates demonstrate AI-assisted work in their portfolio. Interview questions include "walk me through how you use AI in your daily PM workflow." AI fluency is a hiring criterion, not a nice-to-have.

## Building Team AI Capability

\`\`\`
I lead a product team of [N] PMs at [company type]. I want to build team-wide
AI capability over the next quarter.
Design a 90-day capability-building plan with:
1. Week 1–4: Foundation — what tools, practices, and norms to establish first
2. Week 5–8: Depth — where to build specialised AI capability by PM function
3. Week 9–12: Culture — how to make AI usage self-sustaining and evolving
Include specific activities, not just principles. Assume team members range
from AI beginners to intermediate users.
\`\`\`

## AI-Assisted Performance and Coaching

\`\`\`
I manage [N] PMs. Here is context on one PM's recent performance: [describe
recent work — what they shipped, what feedback they received, where they struggled].
Suggest:
1. Two or three specific AI use cases this PM could adopt to address their gaps
2. A coaching conversation framing that connects AI adoption to their growth goals
3. How to set a 30-day AI experimentation goal that is specific and measurable
\`\`\`

## The CPO's Own AI Practise

You cannot lead an AI-native product culture if you're not practicing it yourself. CPO-level AI use cases:

- Market trend synthesis and competitive intelligence
- Leadership communication drafts (board updates, all-hands, team memos)
- Scenario modelling and strategic option generation
- Coaching question generation for 1:1s
- First drafts of hiring scorecards and interview frameworks

The CPO's role is to model the behaviour, not just mandate it.`,
        keyTakeaways: [
          "AI capability is a team sport — build shared norms, rituals, and hiring criteria rather than relying on individual champions",
          "The 90-day team capability plan (foundation, depth, culture) turns AI adoption from a mandate into a self-sustaining practice",
          "Connect AI adoption to individual PM growth goals in coaching conversations — it's a professional development lever, not a productivity demand",
          "CPOs must model AI practise personally — market synthesis, leadership communications, coaching prep — to lead a genuine AI-native culture",
        ],
        exercise: {
          title: "90-Day AI Culture Plan",
          description: "Design and begin executing a 90-day plan to build genuine AI capability across your product team.",
          steps: [
            "Run the 90-day capability-building prompt with your team size and current AI maturity level",
            "Review the AI output against what you know about your team — adjust for specific individuals and team dynamics",
            "Share the draft plan with your senior PMs and ask for their input on what's realistic and what's missing",
            "Identify three team norms you will establish in the first two weeks (e.g., weekly prompt sharing, AI retrospective question)",
            "Set a 30-day review: what changed in how the team uses AI? What needs reinforcing?",
          ],
          tool: "Claude",
        },
        quiz: [
          {
            question: "What is the most effective way for a CPO to build AI capability across a product team?",
            options: [
              "Mandate AI tool usage in all PM deliverables and audit compliance",
              "Hire only new PMs who are already AI-proficient and gradually replace the existing team",
              "Build shared norms, rituals, and learning structures that make AI adoption self-sustaining — and model it personally",
              "Delegate AI capability building entirely to a designated AI champion on the team",
            ],
            correct: 2,
            explanation: "Mandates without culture create compliance without capability. Shared norms, rituals (weekly prompt sharing, retro questions), and the CPO's personal modelling create the conditions for genuine, self-reinforcing AI adoption.",
          },
          {
            question: "How should AI adoption be framed in PM coaching conversations?",
            options: [
              "As a compliance requirement linked to performance reviews",
              "As a professional development opportunity connected to the PM's specific growth goals",
              "As a cost-cutting measure that will reduce headcount needs",
              "As a trend the PM needs to follow to stay relevant",
            ],
            correct: 1,
            explanation: "Connecting AI adoption to a PM's personal growth goals — becoming a better researcher, communicator, or strategic thinker — makes it intrinsically motivated rather than externally imposed. That produces deeper capability, not just surface compliance.",
          },
          {
            question: "Which of the following is the strongest signal that an AI-native product culture is taking hold?",
            options: [
              "The CPO presents AI usage statistics at the quarterly all-hands",
              "All PMs have completed the required AI training module",
              "Teams spontaneously share prompts that worked, incorporate AI questions into retrospectives, and improve each other's AI practice",
              "The product team has adopted a single approved AI tool",
            ],
            correct: 2,
            explanation: "Spontaneous peer-to-peer AI learning — prompt sharing, retro discussions, mutual improvement — is the sign that AI adoption has become a cultural norm rather than a top-down initiative. That's the self-sustaining state the CPO should be building toward.",
          },
        ],
        applyThisWeek: {
          action: "Design your 90-day team AI capability plan and establish your first shared AI norm this week",
          promptTemplate: "I lead a product team of [N] PMs at a [company type and stage]. Current AI maturity: [beginner/mixed/intermediate]. Design a 90-day capability-building plan: Week 1–4 (foundation: tools, norms, practices), Week 5–8 (depth: specialised AI capability by PM function), Week 9–12 (culture: making AI usage self-sustaining). Include specific activities, not just principles. Team ranges from AI beginners to intermediate users.",
          tool: "Claude",
        },
      },
      {
        id: "product-cpo-l4",
        title: "AI Governance, Ethics, and Product Risk Management",
        duration: 18,
        description: "Develop the governance frameworks, ethical guardrails, and risk management practices that allow your product organisation to move fast with AI while building the trust that makes AI-powered products defensible and durable.",
        content: `## Why Governance Is a Product Strategy Decision

AI governance is often treated as a compliance function. For product leaders, it's a competitive advantage decision. Products that build trust through transparent AI design, clear data practices, and responsible deployment earn user and regulator goodwill that is increasingly hard to replicate. Products that move fast without guardrails carry compounding reputational and legal risk.

## The CPO's AI Risk Framework

**Risk Category 1: Model quality.** AI models produce incorrect, biased, or outdated outputs. Mitigation: human review gates, confidence thresholds, user correction mechanisms.

**Risk Category 2: Data privacy.** User data used in AI features may be retained, trained on, or exposed in ways users don't expect. Mitigation: clear data use disclosures, opt-in for training data use, data minimisation.

**Risk Category 3: Bias and fairness.** AI recommendations or decisions may systematically disadvantage specific user groups. Mitigation: bias audits, diverse evaluation panels, disaggregated performance metrics.

**Risk Category 4: Transparency.** Users may not know when they're interacting with AI. Mitigation: clear AI disclosure, explainability features for high-stakes outputs.

**Risk Category 5: Dependency and brittleness.** Product features that depend on third-party AI APIs introduce vendor risk, cost unpredictability, and reliability exposure. Mitigation: fallback design, cost controls, vendor diversification.

## AI Ethics Review for Product Features

\`\`\`
We are considering adding an AI-powered feature to our product: [describe feature].
Conduct an AI ethics and risk review:
1. What could go wrong for users if this feature produces an incorrect output?
2. Are there user groups who could be systematically disadvantaged by this feature?
3. What data does this feature require, and are there privacy concerns with how it's collected or used?
4. How should we disclose to users that this feature is AI-powered?
5. What human oversight mechanism should exist for high-stakes outputs?
Recommend: (a) risks to address before launch, (b) risks to monitor post-launch,
(c) features or disclosures that would make this feature more trustworthy.
\`\`\`

## Building the AI Governance System

A governance system is more than a review checklist. It includes:
- **An AI design review process** for features meeting certain criteria (automation level, data sensitivity, decision stakes)
- **Clear internal guidelines** on acceptable and unacceptable AI use cases
- **A feedback mechanism** for users to flag AI errors or concerns
- **A rapid response protocol** for when an AI feature produces harmful outputs at scale`,
        keyTakeaways: [
          "AI governance is a competitive advantage decision, not just compliance — trust compounds over time in ways that short-cut products cannot replicate",
          "The five risk categories (model quality, data privacy, bias, transparency, dependency) frame the CPO's governance responsibility",
          "Run an AI ethics review for any feature that automates decisions, uses sensitive data, or has high-stakes outputs before launch",
          "A governance system includes a design review process, internal guidelines, user feedback mechanisms, and a rapid response protocol — not just a checklist",
        ],
        exercise: {
          title: "AI Ethics Review",
          description: "Conduct a structured AI ethics and risk review for an AI feature you are planning or have recently shipped.",
          steps: [
            "Select an AI-powered feature in your current or planned product — ideally one that affects user decisions or uses personal data",
            "Run the AI ethics review prompt with a detailed description of the feature",
            "Review each risk category against what you know about your users and regulatory context",
            "Identify which risks require action before launch and which require post-launch monitoring",
            "Draft a one-page AI governance brief for this feature that you could present to legal, design, and engineering leadership",
          ],
          tool: "Claude",
        },
        quiz: [
          {
            question: "Why should CPOs treat AI governance as a product strategy decision rather than a compliance function?",
            options: [
              "Because regulators require CPO-level sign-off on all AI features",
              "Because governance decisions affect user trust, which is a durable competitive advantage that compounds over time",
              "Because the legal team cannot assess AI product risks without product leadership input",
              "Because governance is needed to unlock additional funding from investors",
            ],
            correct: 1,
            explanation: "Products that build trust through transparent AI design earn user loyalty and regulator goodwill that is difficult for competitors to replicate quickly. Governance is not a tax on speed — it's an investment in durable competitive position.",
          },
          {
            question: "Which AI risk category is introduced when a product depends heavily on a third-party AI API?",
            options: [
              "Model bias — third-party models may reflect the training data choices of the vendor",
              "Dependency and brittleness — vendor changes, outages, or cost increases become product risks",
              "Data privacy — all user data is exposed to the third party",
              "Transparency — users will not know which company built the underlying AI",
            ],
            correct: 1,
            explanation: "Third-party AI API dependency introduces vendor risk (API changes, deprecation), cost unpredictability (pricing changes), and reliability exposure (outages). Fallback design and vendor diversification mitigate this risk.",
          },
          {
            question: "What should a product's AI ethics review include for features with high-stakes outputs (e.g., financial recommendations, health information)?",
            options: [
              "A declaration that the AI is accurate and should be trusted by users",
              "A human oversight mechanism so users can verify or challenge the AI output",
              "A disclaimer that removes the company's legal liability for AI errors",
              "A confidence score displayed to users that the AI generates internally",
            ],
            correct: 1,
            explanation: "High-stakes AI outputs — where an error has significant consequences for the user — require human oversight mechanisms. This may be a review step, an appeal mechanism, or a clear way to access a human alternative. Transparency alone is insufficient when the stakes are high.",
          },
        ],
        applyThisWeek: {
          action: "Run an AI ethics review for one AI-powered feature in your current or planned product",
          promptTemplate: "We are adding an AI-powered feature: [describe it including what it automates, what data it uses, and what decision or output it produces for users]. Conduct an AI ethics and risk review: (1) what could go wrong for users if the output is incorrect, (2) which user groups could be systematically disadvantaged, (3) data privacy concerns, (4) how we should disclose the AI involvement to users, (5) what human oversight mechanism is needed. Recommend what to address before launch, what to monitor post-launch, and what would make this feature more trustworthy.",
          tool: "Claude",
        },
      },
    ],
  },
}
