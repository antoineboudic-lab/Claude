import type { SubRoleLessons } from "./types"

export const consultingSubRoles: SubRoleLessons = {
  analyst: {
    title: "AI for Analysts",
    description:
      "Equip analysts and associates with AI techniques for faster research, sharper financial models, and client-ready decks — without sacrificing the analytical rigour that builds consulting credibility.",
    lessons: [
      {
        id: "consulting-analyst-l1",
        title: "AI for Consultants at the Analyst Level: Research, Models, and Decks Faster",
        duration: 15,
        description:
          "Understand how AI fits into the analyst workflow, where it saves the most time, and the professional habits that keep AI-generated work up to client-ready standards.",
        content: `## The Analyst's AI Opportunity

As an analyst or associate, the majority of your time goes into four things: secondary research, data gathering, financial model construction, and slide production. These tasks are the backbone of every engagement — and they are exactly where AI provides the highest leverage. Done well, AI can compress what used to take a full day into a morning, freeing cognitive energy for the analytical judgment that actually builds your consulting reputation.

## What AI Does Best at the Analyst Level

**Secondary research synthesis.** AI reads and synthesises large bodies of source material quickly. You can feed it analyst reports, news articles, regulatory filings, and earnings transcripts and receive a structured synthesis within minutes.

**Issue tree and hypothesis generation.** A well-structured prompt can produce a MECE issue tree or a set of testable hypotheses in seconds. This does not replace analytical judgment — you will refine and challenge what the AI generates — but it gives you a structured starting point rather than a blank page.

**Deck narrative and slide structure.** AI is particularly strong at drafting storyboard outlines and translating bullet-point analysis into narrative sentences that hold up in a client-ready context.

**Financial model commentary.** AI can draft the written commentary that contextualises model outputs — the management summary, the key assumptions section, the sensitivity analysis narrative.

## The Analyst Quality Standard Still Applies

AI output requires the same quality bar your EngM or partner applies to your work. Check every factual claim. Verify every number. Ensure the structure is MECE. Rewrite until the language is tight and precise. AI drafts faster; your professional judgment makes it client-ready.

## Prompt Example: Synthesising Research

\`\`\`
You are a management consultant preparing a market sizing brief.

Context: I am building a deck on the UAE private healthcare market for a strategy engagement. I have gathered the following research notes: [paste notes].

Task: Synthesise these notes into a structured 4-section brief covering: (1) market size and growth rate, (2) key demand drivers, (3) competitive landscape, (4) regulatory environment. Use bullet points. Flag any gaps where further research is needed.

Tone: factual, concise, client-ready. Avoid filler language.
\`\`\`

## Building the Habit

The analysts who develop strong AI habits in their first year consistently outperform peers on throughput and deliverable quality by year two. Start with research synthesis. Move to slide narrative. Then tackle model commentary. Each step builds prompt literacy that compounds across every future engagement.`,
        keyTakeaways: [
          "Secondary research synthesis, issue tree generation, and slide narrative are the highest-leverage AI applications at analyst level",
          "AI drafts faster — your professional judgment and quality check make the output client-ready",
          "Prompt structure (context, task, tone) determines output quality; invest time in learning to prompt well",
          "AI habits built early compound across every future engagement and accelerate career progression",
        ],
        exercise: {
          title: "Research Synthesis Sprint",
          description:
            "Use AI to synthesise a body of secondary research into a structured brief for a live or recent engagement.",
          steps: [
            "Select a research task from your current engagement — a market overview, competitor profile, or regulatory landscape",
            "Gather your raw source material (articles, reports, notes) and paste the key content into Claude",
            "Use the structured prompt format: context (engagement and client), task (synthesis with specific sections), tone (client-ready, concise)",
            "Review the output against your source material — fact-check every claim and flag any gaps",
            "Refine the language until it meets the standard you would send to your EngM for review",
          ],
          tool: "Claude",
        },
        quiz: [
          {
            question:
              "Which analyst task delivers the highest AI leverage in terms of time saved versus quality risk?",
            options: [
              "Financial model formula construction",
              "Secondary research synthesis into structured briefs",
              "Client meeting facilitation",
              "Stakeholder interview analysis",
            ],
            correct: 1,
            explanation:
              "Secondary research synthesis — reading, organising, and structuring large volumes of source material — is time-intensive but relatively low-judgment, making it the highest-leverage entry point for AI at analyst level. The output can be verified against sources and refined by the analyst before it reaches the team.",
          },
          {
            question:
              "An analyst uses AI to generate a market sizing figure for a client deck. What is the essential next step?",
            options: [
              "Include the figure immediately — AI is accurate on market data",
              "Ask a colleague to review the AI output",
              "Verify the figure against primary sources and document the methodology",
              "Add a disclaimer footnote to the slide",
            ],
            correct: 2,
            explanation:
              "AI can hallucinate or misquote market data. Every AI-generated figure must be verified against a primary or authoritative secondary source before inclusion in a client-ready deliverable. The analyst remains professionally responsible for the accuracy of any output they submit.",
          },
          {
            question:
              "A manager asks an analyst to produce a MECE issue tree for a new engagement brief. How should AI best be used here?",
            options: [
              "Use AI to generate a final issue tree and submit it directly",
              "Avoid AI entirely — issue tree construction is a core consulting skill",
              "Use AI to generate a first-draft issue tree, then critically evaluate and restructure it using your own analytical judgment",
              "Use AI to format the tree after the analyst has built it manually",
            ],
            correct: 2,
            explanation:
              "AI is strong at generating structured frameworks quickly, including issue trees. Using it for a first draft reduces time spent on a blank page and surfaces structural options you might not have considered. The analyst's job is then to evaluate the MECE integrity, challenge the logic, and refine it — which is where the real analytical skill development happens.",
          },
        ],
        applyThisWeek: {
          action:
            "Take one secondary research task from your current engagement and run it through AI synthesis before writing up your findings manually.",
          promptTemplate:
            "You are a management consultant building a research brief. Context: [engagement context]. I have the following source material: [paste notes or summaries]. Task: Synthesise into a structured brief with sections: [list sections]. Flag any information gaps. Tone: concise, factual, client-ready.",
          tool: "Claude",
        },
      },
      {
        id: "consulting-analyst-l2",
        title: "Secondary Research, Market Sizing, and Data Synthesis with AI",
        duration: 18,
        description:
          "Master the techniques for using AI to dramatically accelerate secondary research, produce defensible market sizing estimates, and synthesise data into structured insights for engagement deliverables.",
        content: `## Why Research Is the Analyst's Biggest Time Sink

Secondary research can consume 30–50% of an analyst's working week on a typical engagement. The mechanics of the task — reading reports, extracting relevant data points, cross-referencing sources, and organising findings into a coherent structure — are time-intensive but largely mechanical. This is the perfect AI use case: high volume, structured output, verifiable against sources.

## Market Sizing with AI

AI is effective at structuring market sizing approaches, not at generating authoritative market data. Use it to:

- **Build the sizing framework.** Define the top-down vs. bottom-up approach, identify the key variables, and structure the calculation logic before you touch a spreadsheet.
- **Identify data sources.** AI knows which market intelligence providers, regulatory filings, and industry databases are likely to carry the data you need.
- **Draft sizing commentary.** Once you have the numbers, AI drafts the written explanation of methodology, assumptions, and confidence intervals.

**What AI cannot do reliably:** provide accurate market size figures, growth rates, or competitor revenue data without being connected to current, verified sources. All numbers must come from citable sources.

## Data Synthesis Workflow

When you have gathered research across multiple sources, use this structured synthesis approach:

1. **Paste raw notes** — include source names and dates
2. **Prompt for structured synthesis** — specify the exact sections you need
3. **Flag contradictions** — ask the AI to highlight where sources disagree
4. **Request gap analysis** — ask what key data is missing before you can draw conclusions

\`\`\`
I am an analyst working on a market entry strategy engagement for a B2B SaaS client entering the GCC HR technology market.

I have gathered the following research notes from multiple sources [paste notes].

Please synthesise into:
1. Market size and 3-year CAGR (flag if conflicting data exists between sources)
2. Key demand drivers (rank by importance if evidence supports it)
3. Competitive landscape (tier the players if possible)
4. Regulatory and localisation considerations
5. Data gaps that require further research before conclusions can be drawn

Be precise. Do not add information not present in my notes. Flag all uncertainties.
\`\`\`

## Building a Source-Verified Research Brief

Every AI-synthesised brief must be source-verified before it enters the engagement workstream. Build the habit of tagging AI-generated content with [VERIFY] markers during drafting, then removing them only once each claim is traced to a primary source. This discipline protects the engagement and your professional credibility.

## Competitive Intelligence Gathering

AI can structure competitor analysis frameworks, draft comparison tables from information you provide, and help you synthesise earnings call transcripts or press releases. It is a strong synthesis engine — feed it the raw material and it organises; do not ask it to generate competitor data from memory.`,
        keyTakeaways: [
          "AI accelerates research synthesis and framework construction but cannot reliably generate accurate market data — all numbers must come from verified sources",
          "The structured synthesis prompt (context, raw notes, output sections, gap flag) is the core technique for research-heavy analyst work",
          "Build a [VERIFY] tagging habit to ensure every AI-generated claim is traced to a primary source before entering the workstream",
          "Competitive intelligence uses AI as an organiser and synthesiser, not a data generator — feed it source material, not memory prompts",
        ],
        exercise: {
          title: "Market Sizing Brief",
          description:
            "Use AI to structure and draft a market sizing brief for a live or practice engagement scenario.",
          steps: [
            "Define the market you are sizing and choose your approach: top-down (industry data to segment) or bottom-up (units × price)",
            "Gather 3–5 relevant data sources: industry reports, regulatory filings, analyst estimates, or comparable market benchmarks",
            "Prompt AI to build the sizing framework — the variable tree and calculation logic — before adding numbers",
            "Populate the framework with data from your sources, then prompt AI to draft the methodology commentary and assumption documentation",
            "Fact-check every number and flag sources on the output before submitting for EngM review",
          ],
          tool: "Claude",
        },
        quiz: [
          {
            question:
              "An analyst needs a market size estimate for a client deck. What is the correct role for AI in this task?",
            options: [
              "Ask AI for the market size figure directly and cite AI as the source",
              "Use AI to structure the sizing framework and draft commentary while sourcing actual numbers from verified databases",
              "Skip AI for market sizing — it is too risky for this type of data",
              "Use AI to generate a range of estimates and present the median to the client",
            ],
            correct: 1,
            explanation:
              "AI is a strong framework builder and commentary drafter but an unreliable source of accurate market data. The correct workflow uses AI to structure the sizing logic and draft written explanation while the analyst sources all figures from citable, authoritative databases. This produces both speed and defensibility.",
          },
          {
            question:
              "When synthesising research from multiple sources that contain conflicting data, what should the analyst prompt AI to do?",
            options: [
              "Average the conflicting figures and present a single number",
              "Select the most authoritative source and ignore the others",
              "Flag the conflict explicitly and present the range with source attribution",
              "Omit the conflicting data point from the synthesis",
            ],
            correct: 2,
            explanation:
              "Conflicting data between sources is analytically significant. A rigorous synthesis flags the conflict, presents the range of estimates, attributes each to its source, and invites the analyst to investigate the reason for the discrepancy. Averaging or ignoring conflicts produces misleading deliverables.",
          },
          {
            question:
              "What does a [VERIFY] tagging discipline protect against in AI-assisted research?",
            options: [
              "AI generating text that is too long for the brief",
              "Unverified AI-generated claims reaching the client without source confirmation",
              "Plagiarism from competitor research reports",
              "AI misunderstanding the engagement context",
            ],
            correct: 1,
            explanation:
              "AI can generate plausible-sounding but inaccurate data — a risk sometimes called hallucination. Tagging AI-generated claims with [VERIFY] and removing the tag only once each claim is traced to a primary source prevents unverified information from entering client-ready deliverables, protecting both the engagement and the analyst's professional credibility.",
          },
        ],
        applyThisWeek: {
          action:
            "Run one piece of engagement research through the structured AI synthesis prompt, apply [VERIFY] tagging, and time how long the process takes compared to your manual approach.",
          promptTemplate:
            "I am an analyst on a [engagement type] engagement. I have gathered the following research: [paste notes with source names]. Synthesise into: [list required sections]. Flag where sources conflict. Flag data gaps that prevent sound conclusions. Do not add information not present in my notes.",
          tool: "Claude",
        },
      },
      {
        id: "consulting-analyst-l3",
        title: "Financial Modelling Support, Slide Narrative, and Deck Structure with AI",
        duration: 18,
        description:
          "Learn how to use AI to support financial model construction, generate model commentary, structure deck narratives, and produce slide-ready language — the production tasks that consume analyst hours at every engagement milestone.",
        content: `## AI and Financial Modelling: Where the Line Is

AI cannot build a financial model for you — at least not one you should trust without rebuilding it yourself. What AI is genuinely useful for in financial modelling:

- **Structuring the model architecture.** Given the engagement context, AI can propose the right model type (DCF, LBO, unit economics, scenario analysis) and the key variables to include.
- **Drafting model commentary.** The written output that accompanies a model — the management summary, key assumptions section, sensitivity analysis narrative, and scenario descriptions — is AI's strongest financial application.
- **Checking logic and documentation.** You can paste model logic (not formulas) and ask AI to identify gaps, inconsistencies, or missing variables.
- **Stress-testing assumption sets.** AI can help you articulate the qualitative rationale behind each key assumption, which is often the part that takes longest to write up.

## Deck Structure and Slide Narrative

The hardest part of slide production is not formatting — it is constructing a narrative that flows logically from situation to complication to resolution, landing each slide as a point that advances the argument. This is the consulting pyramid principle applied at slide level.

**AI for deck structure:**

\`\`\`
I am building a strategy deck for a SteerCo presentation on a post-merger integration engagement. The client is a UAE-based financial services group that has acquired a regional fintech.

The deck needs to cover: (1) current integration status, (2) risks and blockers, (3) recommended actions for the next 90 days, (4) resource and budget implications.

Please propose a slide-by-slide structure with: the message headline for each slide (the single point the slide must make), the supporting data or analysis that belongs on it, and the logical flow between slides.
\`\`\`

## From Bullet Points to Narrative Language

Analysts often produce bullet-point slides that describe rather than argue. AI is effective at upgrading descriptive bullets into narrative sentences that make a point. Feed it your bullet points with the context of what the slide needs to argue, and it returns tighter, more assertive language.

**Before:** "Revenue declined 12% YoY. Market share fell in three segments."
**After (AI-assisted):** "Revenue decline of 12% YoY reflects structural market share erosion across three core segments — the pattern that underpins our restructuring recommendation."

## Quality Control for Deck Production

Even with AI-drafted narrative, the analyst's job is to ensure every sentence is accurate, every claim is evidenced, and the flow reads as a coherent argument from slide one to the final recommendation. Read the full deck as a narrative, not slide by slide, before it goes to the EngM.`,
        keyTakeaways: [
          "AI supports model commentary, assumption documentation, and architecture scoping — not formula construction or number generation",
          "Deck structure prompts work best when you give AI the engagement context, the audience, and the sections needed, then ask for message headlines and supporting logic",
          "Upgrading descriptive bullets to narrative sentences is one of the highest-value AI applications for analyst slide production",
          "Always read the full AI-assisted deck as a narrative arc before sending for review — slide-level quality checks miss flow and logic errors",
        ],
        exercise: {
          title: "Deck Narrative Upgrade",
          description:
            "Take a draft slide set and use AI to upgrade the narrative quality from descriptive bullets to argument-led slide messages.",
          steps: [
            "Select a recent or current deck that is in bullet-point draft form",
            "Identify the core argument the deck needs to make (the 'so what' for the client)",
            "Prompt AI with the deck context, the argument, and your bullet-point slides, asking it to propose message headlines for each slide",
            "For 3 slides, ask AI to rewrite the bullet points as narrative sentences that argue the slide message",
            "Read the revised slides as a sequence — check that the narrative flows logically and each slide advances the argument",
          ],
          tool: "Claude",
        },
        quiz: [
          {
            question:
              "An analyst wants to use AI to build a DCF model for a client valuation. What is the appropriate use of AI?",
            options: [
              "Ask AI to generate the full model with formulas and present it to the client",
              "Use AI to propose the model architecture and assumption framework, then build and verify the model manually",
              "Avoid AI entirely for financial models — the risk is too high",
              "Use AI to generate the valuation figure and verify the output against the model",
            ],
            correct: 1,
            explanation:
              "AI is useful for scoping model architecture and drafting the assumption framework and commentary, but the model itself must be built and verified by the analyst. AI should not generate financial formulas or valuation outputs that go to clients — the analyst remains professionally responsible for the model's accuracy and integrity.",
          },
          {
            question:
              "What is the most impactful AI application for improving the quality of analyst-produced slides?",
            options: [
              "Formatting and design layout",
              "Converting descriptive bullet points into narrative sentences that argue the slide message",
              "Generating data visualisations from raw numbers",
              "Creating title slide and section divider content",
            ],
            correct: 1,
            explanation:
              "The shift from descriptive bullets ('revenue declined') to narrative sentences that make a point ('revenue decline reflects structural erosion — the pattern driving our restructuring recommendation') is where AI adds the most visible quality uplift in slide production. It directly addresses the most common quality gap in analyst-produced decks.",
          },
          {
            question:
              "What should an analyst always do after using AI to draft a full deck narrative?",
            options: [
              "Submit it directly — AI produces client-ready content",
              "Check each slide individually for formatting errors",
              "Read the entire deck as a narrative arc to verify logical flow and argument coherence",
              "Run it through a grammar checker before sending to the EngM",
            ],
            correct: 2,
            explanation:
              "AI can produce individually well-written slides that fail to connect as a coherent argument. Reading the deck as a continuous narrative — rather than checking slides in isolation — catches flow breaks, logic gaps, and missing transitions that slide-level review misses. This is the same quality standard that applies to manually produced decks.",
          },
        ],
        applyThisWeek: {
          action:
            "Take one set of draft slides from a current engagement and run the slide narrative through AI to upgrade from bullets to argument-led messages.",
          promptTemplate:
            "I am building a [deck type] for a [audience, e.g. SteerCo] on a [engagement description] engagement. The deck's core argument is: [state the key recommendation or finding]. Here are my current bullet-point slides: [paste slides]. Please: (1) propose a message headline for each slide, (2) rewrite the bullets as narrative sentences that argue the headline, (3) flag any slides where the logical connection to the overall argument is weak.",
          tool: "Claude",
        },
      },
      {
        id: "consulting-analyst-l4",
        title: "Building an Analyst AI Workflow: From Brief to Delivery Faster",
        duration: 16,
        description:
          "Design a personal AI workflow that integrates across the full analyst workstream — from receiving an engagement brief to delivering a client-ready output — so AI becomes a consistent productivity multiplier rather than an occasional experiment.",
        content: `## Why Workflow Design Matters

Using AI ad hoc — pasting text into a chat window when you remember to — captures only a fraction of the available productivity gain. The analysts who build the most consistent AI advantage design a repeatable workflow: specific prompts for recurring tasks, a prompt library they maintain and improve, and clear decision points for when AI enters and exits each task.

## The Analyst AI Workflow: Four Stages

**Stage 1: Brief and scoping.** When you receive a new task or workstream, use AI to rapidly map the issue tree, identify information gaps, and structure your research plan before you start gathering.

**Stage 2: Research and synthesis.** Use AI to synthesise secondary research as you gather it — not at the end. Progressive synthesis (synthesising each source as you read it) means your research brief writes itself.

**Stage 3: Analysis and structure.** Use AI to generate MECE framework options, test hypothesis sets, and draft the narrative logic of your analysis before committing to slide structure.

**Stage 4: Production and polish.** Use AI to draft slide narratives, model commentary, and written sections. Then apply your professional quality judgment to refine.

## Building a Prompt Library

Your prompt library is one of the highest-value assets you can build as an analyst. Every time you write a prompt that produces excellent output, save it. Categorise by task type: research synthesis, market sizing, issue tree, slide narrative, model commentary, stakeholder communication.

\`\`\`
PROMPT LIBRARY TEMPLATE

Task type: [e.g. competitive landscape synthesis]
Engagement context: [generalised — remove client-specific data]
Prompt:

"You are a management consultant building a competitive intelligence brief.
Context: [engagement type and sector].
I have the following research: [paste notes].
Synthesise into: (1) player overview, (2) positioning and differentiation, (3) pricing and business model, (4) strategic direction.
Flag where data is thin or conflicting. Tone: factual, concise, client-ready."

Notes on what made this prompt effective: [your observations]
\`\`\`

## The Compounding Effect

Analysts who build a prompt library in their first year consistently report 30–40% faster delivery on recurring task types by year two. The library also provides a record of your analytical approach that you can share with junior analysts you mentor as you progress.

## Guardrails for Sustainable AI Use

- Never paste client-confidential data into public AI tools without checking your firm's policy
- Always verify AI-generated facts against primary sources before they enter deliverables
- Maintain your own analytical skills — use AI to accelerate judgment tasks, not to bypass them
- Disclose AI use to your EngM if your firm has a disclosure policy`,
        keyTakeaways: [
          "A repeatable four-stage AI workflow (brief, research, analysis, production) captures far more productivity gain than ad hoc AI use",
          "Progressive research synthesis — synthesising each source as you read it — means your research brief writes itself throughout the engagement",
          "A prompt library is a compounding asset: saved, categorised prompts reduce ramp time on every future engagement",
          "Firm data policy compliance, source verification, and skill maintenance are non-negotiable guardrails for sustainable AI use",
        ],
        exercise: {
          title: "Build Your Analyst Prompt Library",
          description:
            "Create the first version of your personal prompt library with prompts for your four most common analyst tasks.",
          steps: [
            "Identify the four task types you perform most frequently on engagements (e.g. research synthesis, market sizing, slide narrative, model commentary)",
            "For each task type, write a reusable prompt template using the format: context placeholder, task specification, output structure, tone instruction",
            "Test each prompt on a real task from your current or most recent engagement",
            "Save the four prompts in a document with notes on what made each effective and what you would refine next time",
            "Commit to updating the library with one new or improved prompt per engagement milestone",
          ],
          tool: "Claude",
        },
        quiz: [
          {
            question:
              "What distinguishes analysts who capture sustained AI productivity gains from those who see only occasional benefit?",
            options: [
              "Access to more powerful AI tools",
              "Higher seniority that gives them more AI-appropriate tasks",
              "A repeatable workflow and maintained prompt library applied consistently across engagements",
              "Using AI exclusively for research tasks and avoiding production work",
            ],
            correct: 2,
            explanation:
              "The consistent productivity differentiator is not tool access or seniority — it is the habit of using AI at defined points in a repeatable workflow combined with a prompt library that improves with every engagement. Analysts with this discipline report 30–40% faster recurring task delivery within 12 months.",
          },
          {
            question:
              "Why is progressive research synthesis (synthesising each source as you read it) more effective than end-of-research synthesis?",
            options: [
              "It allows you to skip sources that seem less relevant",
              "It produces a research brief incrementally, so the document builds as research proceeds rather than requiring a separate synthesis step at the end",
              "AI performs better with smaller volumes of input text",
              "It reduces the number of sources needed for the brief",
            ],
            correct: 1,
            explanation:
              "End-of-research synthesis creates a separate time-intensive step — reviewing all your notes and producing a brief after the research phase ends. Progressive synthesis integrates the brief-writing into the research phase itself, so each source is processed and added to the structure as it is read. The brief is essentially complete when the research phase ends.",
          },
          {
            question:
              "An analyst's firm has no stated policy on AI tool use with client data. What is the correct approach?",
            options: [
              "Use any AI tool freely — if there is no policy, there is no restriction",
              "Avoid AI entirely until the firm publishes a policy",
              "Ask your EngM or compliance team for guidance before pasting client-confidential data into any external AI tool",
              "Remove all client names from data before pasting it into public AI tools",
            ],
            correct: 2,
            explanation:
              "Absence of a written policy does not mean absence of obligation. Client confidentiality is a core professional duty in consulting regardless of AI policy status. The correct step is to seek guidance from your EngM or compliance team before exposing client-specific data to any external AI service. Anonymising data alone may not be sufficient depending on context.",
          },
        ],
        applyThisWeek: {
          action:
            "Create your prompt library starter document with prompts for your four most common analyst tasks, test each on a real task, and commit to updating it at each engagement milestone.",
          promptTemplate:
            "Help me build a reusable prompt template for the following analyst task: [describe task type]. The prompt should include: a context placeholder, a specific task instruction, the output structure I need, and a tone instruction. Make it generalisable so I can reuse it across different engagements by filling in the context placeholder.",
          tool: "Claude",
        },
      },
    ],
  },

  consultant: {
    title: "AI for Consultants and Managers",
    description:
      "Help consultants and managers use AI to lead workstreams more effectively — structuring hypotheses faster, producing sharper deliverables, and facilitating better client interactions without losing the judgment and relationship quality that define great consulting.",
    lessons: [
      {
        id: "consulting-consultant-l1",
        title: "AI for Consultants and Managers: Better Client Work in Less Time",
        duration: 15,
        description:
          "Understand how AI reshapes the consultant and manager role — accelerating workstream delivery, sharpening deliverable quality, and freeing time for the client judgment work that differentiates great consulting.",
        content: `## The Consultant and Manager AI Opportunity

At consultant and manager level, your value is increasingly defined by two things: the quality of your analytical judgment and the quality of your client relationships. AI creates its biggest opportunity by removing the production work — workstream planning, research coordination, first-draft writing, slide production — that currently competes for the same time and cognitive energy as those two high-value activities.

## Where AI Changes the Consultant's Game

**Hypothesis-driven analysis.** Structuring a problem, building a hypothesis tree, and designing a workstream to test it is the analytical core of consulting. AI can generate hypothesis sets, challenge your framing, and propose issue tree structures that you then critically evaluate and refine. The thinking remains yours; AI compresses the time to a structured starting point.

**Deliverable production.** Interim memos, analytical slides, recommendation decks, and stakeholder communications all require significant production time. AI produces high-quality first drafts that the consultant refines — typically cutting production time by 40–60%.

**Meeting preparation and facilitation.** AI can generate structured agendas, prepare discussion guides, draft pre-read documents, and help you think through likely client objections before a key meeting.

**Quality assurance.** Before a deliverable goes to the partner or client, AI can review it for logic gaps, MECE failures, narrative inconsistencies, and missing evidence — a structured QA pass that catches issues a tired consultant misses at 11pm before a deadline.

## What Remains Irreplaceable at This Level

Consultants and managers are the primary point of client contact on most engagements. The trust clients place in you — the confidence that you understand their organisation, their politics, and their leadership dynamics — cannot be delegated to AI. Neither can the judgment call about which recommendation to make when the data is ambiguous and the stakes are high.

\`\`\`
WORKSTREAM PLANNING PROMPT

I am a consultant managing the market entry workstream on a strategy engagement for a UAE consumer goods client entering the GCC e-commerce market.

I need to structure the next three weeks of workstream activity. Key questions to answer for the SteerCo in week 4: (1) Is the market attractive enough to justify entry? (2) What is the right entry mode? (3) What are the critical risks?

Please propose: (a) a hypothesis tree that maps the key analytical questions, (b) the priority workstreams that would test each hypothesis, (c) a week-by-week work plan with the key outputs at each stage.
\`\`\`

## Building AI Into Your Management Style

As a manager, your AI use has a multiplier effect — the habits you model and the workflow you establish for your team shape how the entire engagement uses AI. Establish clear protocols: which tools are approved, how to verify AI output before it enters the workstream, and how to maintain client confidentiality. Your standards become the team's standards.`,
        keyTakeaways: [
          "At consultant and manager level, AI's highest value is freeing time from production work for the client judgment and relationship work that defines consulting excellence",
          "Hypothesis generation, deliverable drafting, meeting preparation, and QA review are the four highest-leverage AI applications at this level",
          "The trust clients place in the consultant and the judgment applied to ambiguous recommendations remain irreplaceable by AI",
          "The AI habits a manager models become the team's standards — establish clear protocols for tool use, verification, and confidentiality",
        ],
        exercise: {
          title: "Workstream AI Audit",
          description:
            "Map the AI leverage points across your current workstream and identify where to introduce AI this week.",
          steps: [
            "List the five highest-time-cost tasks in your workstream over the next two weeks",
            "For each task, categorise it: production (research, drafting, formatting) vs. judgment (analysis, recommendation, client navigation)",
            "For each production task, identify whether AI could produce a first draft that you then refine",
            "Select the two highest-value AI opportunities and schedule time to apply AI to them this week",
            "After completing each AI-assisted task, note: time saved, quality of AI first draft, and what judgment you had to apply to make it client-ready",
          ],
          tool: "Claude",
        },
        quiz: [
          {
            question:
              "A consultant is preparing for a key client meeting where the analysis is complete but the recommendation remains contested within the team. What is AI's most appropriate role?",
            options: [
              "Generate the final recommendation from the analysis data",
              "Draft the meeting agenda and prepare discussion questions that will surface the contested issues constructively",
              "Simulate the client's likely reaction to each recommendation option",
              "Replace the pre-meeting team discussion with an AI-moderated review",
            ],
            correct: 1,
            explanation:
              "When analytical judgment is contested, the human team needs to resolve the question — AI cannot arbitrate between competing professional judgments. However, AI can productively help by structuring the meeting agenda, drafting discussion questions, and helping the team prepare for likely client responses — freeing mental energy for the actual judgment calls.",
          },
          {
            question:
              "How does a manager's AI use differ from an analyst's in terms of impact?",
            options: [
              "Managers use AI for more complex tasks, so AI provides less value",
              "Manager AI use has a multiplier effect because the habits and protocols they establish shape how the entire team engages with AI",
              "Managers should avoid AI to maintain the quality oversight role above the analyst's AI output",
              "The difference is minimal — AI applications are the same at every level",
            ],
            correct: 1,
            explanation:
              "At manager level, AI use has leverage beyond personal productivity. The protocols a manager establishes — approved tools, verification standards, confidentiality rules — become the team's operating standards. A manager who uses AI well and models good AI habits creates an AI-capable team; one who uses it poorly or inconsistently creates confusion and risk.",
          },
          {
            question:
              "A manager asks AI to QA a 40-slide deck the night before a SteerCo presentation. What is the most useful prompt?",
            options: [
              "Does this deck look good?",
              "Check this deck for spelling and formatting errors",
              "Review this deck for: (a) logical flow and argument coherence, (b) MECE failures in any section, (c) slides where the evidence does not support the headline message, (d) missing transitions between sections",
              "Summarise this deck into five bullet points",
            ],
            correct: 2,
            explanation:
              "A QA prompt needs to specify exactly what to check for — logic, MECE integrity, evidence-to-claim alignment, and narrative flow. Generic prompts ('does this look good?') produce generic feedback. A structured QA prompt with specific quality dimensions produces actionable, specific findings that can be addressed before the deck goes to the client.",
          },
        ],
        applyThisWeek: {
          action:
            "Run an AI-assisted QA pass on a current client deliverable before it goes to the partner for review.",
          promptTemplate:
            "I am a consultant on a [engagement type] engagement. Please review the following deliverable for: (1) logical flow — does each section connect coherently to the next? (2) MECE integrity — are any sections overlapping or missing coverage? (3) evidence gaps — flag any claims not supported by the content provided. (4) narrative strength — does each section advance the core argument? Here is the deliverable: [paste content].",
          tool: "Claude",
        },
      },
      {
        id: "consulting-consultant-l2",
        title: "Hypothesis-Driven Analysis and Workstream Design with AI",
        duration: 18,
        description:
          "Use AI to accelerate hypothesis generation, issue tree construction, and workstream design — the analytical core of consulting that determines whether an engagement generates genuine insight or just organised data.",
        content: `## Hypothesis-Driven Consulting and AI

The hypothesis-driven approach is the methodological backbone of strategy consulting: you form a hypothesis about the answer, design work to test it, update based on evidence, and refine until you reach a defensible conclusion. AI is most useful in this process at two points: generating the initial hypothesis set and structuring the issue tree that organises the testing workstream.

## Building Issue Trees with AI

An issue tree (or logic tree) breaks the central question into MECE sub-questions that, if answered, collectively resolve the top-level question. Building a rigorous MECE issue tree requires time and structural discipline. AI can generate a first-draft issue tree in seconds — your job is to evaluate the MECE integrity and refine it against your contextual knowledge of the client situation.

\`\`\`
ISSUE TREE PROMPT

I am structuring the problem for a profitability improvement engagement. Our client is a mid-market professional services firm in the UAE whose EBITDA margin has declined from 22% to 14% over three years.

Please build a MECE issue tree that maps all possible drivers of this margin decline. The top-level question is: "Why has EBITDA margin declined by 8 percentage points?"

Structure the tree to: (1) separate revenue-side and cost-side drivers at level 1, (2) break each into 3–4 MECE sub-hypotheses at level 2, (3) identify the data or analysis needed to test each level-2 hypothesis.

Flag any level where MECE integrity is uncertain.
\`\`\`

## Hypothesis Set Generation

A good consulting hypothesis is specific, testable, and directionally falsifiable — "The margin decline is driven primarily by cost structure in the delivery function" is a hypothesis; "the business has operational issues" is not. AI can generate a set of specific, testable hypotheses for a given problem at speed.

Once you have the hypothesis set, apply your contextual judgment: which hypotheses are most likely given what you know about the client? Which are the highest stakes if true? Prioritise your workstream to test the highest-priority hypotheses first.

## Workstream Design

A workstream is the organised set of analyses, research, and stakeholder engagements that test a set of hypotheses and produce the evidence base for the final recommendation. AI can help you design a workstream structure once the hypothesis tree is established.

**Key workstream design prompt elements:**
- The hypotheses being tested
- The available time and team resource
- The key deliverable dates and milestones
- The primary and secondary data sources available
- The client's data access constraints

## Keeping the Judgment Central

AI-generated hypothesis trees and workstream designs are starting points, not final structures. The hypotheses that matter are determined by your understanding of the client organisation, the political sensitivities in play, and the analytical instincts built from previous engagements. Use AI to compress the time to a structured starting point — then apply the judgment that makes it the right structure for this client, on this engagement, right now.`,
        keyTakeaways: [
          "AI is most valuable in hypothesis-driven consulting at two points: generating the initial hypothesis set and drafting the MECE issue tree structure",
          "Issue tree quality depends on MECE integrity — AI generates a fast first draft, but the consultant must critically evaluate and refine the structure",
          "Workstream design prompts need to specify hypotheses, time and resource constraints, milestones, and data availability to produce useful outputs",
          "AI-generated analytical structures are starting points that client context, organisational politics, and consulting experience must refine into the right structure for this specific situation",
        ],
        exercise: {
          title: "Issue Tree Construction",
          description:
            "Use AI to build an issue tree for a current engagement question, then critically evaluate and refine the MECE structure.",
          steps: [
            "Define the central question for a current or recent engagement in one precise sentence",
            "Prompt AI to build a two-level MECE issue tree that decomposes the question into testable sub-hypotheses",
            "Evaluate the AI output: are the level-1 branches truly MECE? Are any sub-hypotheses missing, overlapping, or too vague to test?",
            "Revise the tree based on your evaluation — add, remove, or restructure branches using your contextual knowledge of the client situation",
            "For each level-2 hypothesis, identify the specific data or analysis that would confirm or falsify it",
          ],
          tool: "Claude",
        },
        quiz: [
          {
            question:
              "What is the correct use of AI in building a hypothesis tree for a strategy engagement?",
            options: [
              "Use AI to generate the final hypothesis tree and proceed directly to workstream design",
              "Use AI to generate a first-draft tree, then critically evaluate MECE integrity and refine using contextual knowledge",
              "Build the hypothesis tree manually first, then use AI to add additional hypotheses",
              "Use AI only to format a manually built hypothesis tree for client presentation",
            ],
            correct: 1,
            explanation:
              "AI is most effective as a first-draft generator for hypothesis trees — it produces a structured starting point quickly. The critical evaluation step, where the consultant assesses MECE integrity and applies client-specific contextual knowledge, is where the professional judgment that makes the tree analytically rigorous and situationally relevant is applied. Skipping this step produces generic frameworks, not engagement-specific analytical structures.",
          },
          {
            question:
              "Which of the following best describes a hypothesis in the consulting sense?",
            options: [
              "A description of the client's current situation",
              "A specific, testable, directionally falsifiable statement about the cause of or solution to the problem",
              "A summary of the research findings gathered so far",
              "A question that the workstream needs to answer",
            ],
            correct: 1,
            explanation:
              "A consulting hypothesis is a specific, testable statement that can be confirmed or falsified by analysis — for example, 'The margin decline is driven primarily by cost structure in the delivery function.' It is directional (it makes a claim), specific (it identifies a mechanism), and falsifiable (data can confirm or disprove it). Generic statements about the client situation or open-ended questions are not hypotheses in the analytical sense.",
          },
          {
            question:
              "A manager's AI-generated workstream plan does not account for a known stakeholder alignment issue that will affect data access. What does this reveal about AI workstream design?",
            options: [
              "The AI tool being used is inadequate",
              "AI-generated workstream designs must be refined with contextual knowledge of client organisation dynamics that AI cannot access",
              "The manager should have included more detail in the prompt",
              "Workstream planning is not appropriate for AI assistance",
            ],
            correct: 1,
            explanation:
              "AI generates workstream designs based on the information in the prompt — it has no access to the client relationship history, organisational politics, or stakeholder dynamics that often determine what is actually feasible. The manager's contextual knowledge is the essential input that transforms an AI-generated workstream template into an executable plan for this specific client situation.",
          },
        ],
        applyThisWeek: {
          action:
            "Build an AI-generated issue tree for your current engagement's central question, evaluate its MECE integrity, and use the refined version to prioritise your workstream for the next two weeks.",
          promptTemplate:
            "I am structuring the problem for a [engagement type] engagement. The central question is: [state the question precisely]. The client context is: [1-2 sentences on the client situation]. Please build a MECE issue tree with: (1) 2–3 MECE branches at level 1, (2) 3–4 testable sub-hypotheses under each branch at level 2, (3) the data or analysis needed to test each level-2 hypothesis. Flag any level where MECE integrity is uncertain.",
          tool: "Claude",
        },
      },
      {
        id: "consulting-consultant-l3",
        title: "Client Deliverable Production: From Insight to Output with AI",
        duration: 18,
        description:
          "Use AI to accelerate the production of consulting deliverables — interim memos, analytical slides, recommendation decks, and client communications — while maintaining the quality standard that clients and partners expect.",
        content: `## The Production Gap in Consulting

Most consultants spend 40–60% of their time on production: turning analysis into slides, writing interim memos, drafting stakeholder communications, and formatting client-ready documents. This production overhead is necessary but not where consulting value is created. AI's greatest impact at consultant and manager level is compressing this production time so that more hours go into the analysis and client interaction that actually differentiate the work.

## Deliverable Types and AI Approach

**Interim memos and status updates.** These are AI's strongest deliverable application — structured written documents that follow a consistent format. Provide AI with your key findings, the audience, and the memo structure, and it produces a draft that typically requires 20–30% editing rather than 100% writing.

**Analytical slide narratives.** Slides with complex analytical content — scenario comparisons, market sizing outputs, financial analysis summaries — benefit from AI narrative generation. Provide the data and the point the slide must make; AI drafts the narrative that connects them.

**Recommendation decks.** For full decks, the most effective approach is slide-by-slide narrative generation: provide the slide headline and supporting data, and ask AI to draft the talking-point narrative. Review for accuracy and argument strength.

**Client emails and stakeholder communications.** AI is highly effective for drafting professional communications — update emails, meeting confirmations, difficult message framing — that require careful tone calibration.

\`\`\`
INTERIM MEMO PROMPT

I need to write a two-page interim memo for the client leadership team on a cost reduction engagement. We are at the end of week two of a four-week sprint.

Key findings so far: (1) operational costs are 18% above industry benchmark in the back-office function; (2) the gap is primarily driven by over-staffing in finance operations (1.4× industry average headcount ratio); (3) three process improvement opportunities have been identified that could close 60% of the gap without headcount reduction; (4) the remaining 40% requires a structural review of the finance function.

Please draft a two-page interim memo structure with: (a) executive summary (3 sentences max), (b) progress against work plan, (c) key findings to date, (d) preliminary implications, (e) next steps and outstanding questions. Tone: professional, direct, confident in findings but appropriately caveated where analysis is incomplete.
\`\`\`

## Managing Quality in AI-Assisted Production

The quality risk in AI-assisted production is not that AI produces bad language — it usually produces competent prose. The risk is that AI produces accurate-sounding language that misrepresents the analysis. The consultant's quality check must focus on factual accuracy: does every claim in the draft accurately reflect the underlying analysis? Does the draft introduce nuance or qualifications that were not in the original analysis?

## The Client-Ready Standard

A deliverable is client-ready when: every claim is evidenced, the narrative flows without logical gaps, the language is precise and unambiguous, and the tone is appropriate for the audience. AI assists with the drafting; the consultant certifies client-readiness. That certification is a professional judgment that cannot be delegated.`,
        keyTakeaways: [
          "AI compresses production time by 40–60% on interim memos, slide narratives, recommendation deck content, and client communications",
          "The highest-risk quality failure in AI-assisted production is language that accurately sounds like consulting analysis but misrepresents the underlying findings — always fact-check against the analysis",
          "The most effective approach for complex decks is slide-by-slide narrative generation: headline + data → AI draft → consultant refinement",
          "Client-ready certification is a professional judgment that remains with the consultant regardless of how much of the draft AI produced",
        ],
        exercise: {
          title: "Interim Memo Draft",
          description:
            "Use AI to draft an interim memo or status update for a current engagement, then apply a structured quality check.",
          steps: [
            "Identify a current deliverable — an interim memo, status update, or slide narrative that you need to produce this week",
            "Summarise the key findings and the audience for the deliverable in 5–8 bullet points",
            "Prompt AI with the findings, audience, and required structure to produce a first draft",
            "Apply a structured quality check: (a) does every claim accurately reflect your analysis? (b) has AI introduced any nuance or qualification not in your analysis? (c) does the narrative flow logically?",
            "Revise the draft based on your quality check and submit for partner review",
          ],
          tool: "Claude",
        },
        quiz: [
          {
            question:
              "What is the primary quality risk in AI-assisted consulting deliverable production?",
            options: [
              "AI produces overly technical language that clients cannot understand",
              "AI produces grammatically poor prose that requires extensive editing",
              "AI produces accurate-sounding language that may misrepresent the underlying analysis",
              "AI produces content that is too long for client-ready deliverables",
            ],
            correct: 2,
            explanation:
              "The most serious quality risk is not language quality — AI generally produces competent prose. It is analytical accuracy: AI can draft a sentence that reads as a confident finding but introduces nuance, qualifications, or conclusions that are not present in or supported by the actual analysis. Every AI-drafted deliverable must be fact-checked against the underlying analysis, not just edited for language quality.",
          },
          {
            question:
              "A consultant needs to draft a 25-slide recommendation deck under time pressure. What is the most effective AI-assisted approach?",
            options: [
              "Ask AI to generate the full 25-slide deck in a single prompt",
              "Use AI for formatting and design layout, and write all content manually",
              "Generate slide narratives slide-by-slide: provide each slide headline and supporting data, then ask AI to draft the narrative",
              "Use AI to produce an executive summary and write the remaining slides manually",
            ],
            correct: 2,
            explanation:
              "Slide-by-slide narrative generation is more effective than single-prompt full deck generation because it keeps the consultant in control of the analytical content at each slide and produces more accurate, tightly argued narrative. Providing AI with the headline (the point the slide must make) and the supporting data (the evidence) produces targeted narrative that serves the argument rather than generic content that fills space.",
          },
          {
            question:
              "When is a consulting deliverable 'client-ready'?",
            options: [
              "When AI has produced a polished draft with no obvious language errors",
              "When the partner has reviewed and approved the structure",
              "When every claim is evidenced, the narrative is logically coherent, and the tone is appropriate for the audience — verified by the responsible consultant",
              "When the document has been formatted to the firm's template standards",
            ],
            correct: 2,
            explanation:
              "Client-readiness is a substantive quality standard, not a formatting or approval status. It requires that every claim in the deliverable is evidenced (not just asserted), the narrative is logically coherent (not just fluent), and the tone is appropriate for the specific audience receiving it. The responsible consultant certifies this standard — it cannot be delegated to AI or satisfied by formatting compliance alone.",
          },
        ],
        applyThisWeek: {
          action:
            "Draft an AI-assisted interim memo or client communication for a current engagement, applying the three-step quality check before submission.",
          promptTemplate:
            "I need to draft a [deliverable type, e.g. interim memo] for [audience, e.g. client leadership team] on a [engagement type] engagement. Key findings to communicate: [list 4–6 findings as bullets]. Required structure: [list sections]. Tone: [professional/direct/appropriately caveated]. Please produce a first draft. Flag any section where the findings you have been given seem insufficient to support a confident statement.",
          tool: "Claude",
        },
      },
      {
        id: "consulting-consultant-l4",
        title: "Workshop Design, Meeting Facilitation, and Client Communication with AI",
        duration: 16,
        description:
          "Use AI to design high-quality client workshops, prepare for difficult meetings, sharpen stakeholder communications, and build the facilitation materials that make client interactions more productive.",
        content: `## Client Interaction as a Core Consulting Competency

At consultant and manager level, the quality of your client interactions — workshops, steering committee presentations, stakeholder interviews, difficult conversations — increasingly determines engagement outcomes. AI can significantly improve the preparation quality for these interactions, giving you more time to focus on the live facilitation that no tool can replace.

## Workshop Design with AI

A well-designed workshop is structured to achieve a specific output — a decision, a prioritised backlog, a validated hypothesis set, a shared strategic narrative. Weak workshops are discussion sessions without clear outputs. AI is effective at helping you design output-oriented workshop structures.

\`\`\`
WORKSHOP DESIGN PROMPT

I am designing a two-hour workshop for a retail client's leadership team (8 people) at the end of week three of a strategy engagement. The workshop objective is to align the leadership team on three strategic options and reach a decision on the preferred direction before the final deck is built.

Please design a two-hour workshop agenda that: (1) takes 15 minutes to present the strategic context and the three options, (2) structures a discussion that surfaces the key decision criteria, (3) includes a decision methodology that avoids endless discussion, (4) ends with a clear agreed direction.

Include: time allocation per section, the facilitator's key moves at each stage, and the materials needed to prepare in advance.
\`\`\`

## Preparing for Difficult Conversations

AI is particularly useful for preparing for conversations where client reactions are unpredictable: delivering an uncomfortable finding, proposing a project scope change, or navigating a SteerCo where political dynamics are tense. AI can help you:

- Anticipate likely objections to your position
- Draft alternative framings of a difficult message
- Prepare responses to foreseeable pushback
- Structure the conversation so the most important points land clearly

## Client Communication Tone and Register

Consulting client communications carry a professional register that balances directness, confidence, and appropriate deference to the client relationship. AI is strong at calibrating this register when given clear instructions on audience, relationship stage, and message sensitivity. Specify these elements in every communication prompt.

## Building Facilitation Materials

Workshop materials — discussion guides, prioritisation matrices, decision frameworks, pre-read documents — take significant time to produce. AI can generate first drafts of all of these given the workshop context and objectives. The facilitator then refines them against their knowledge of the specific group dynamics and decision history.`,
        keyTakeaways: [
          "Workshop design prompts need to specify the workshop objective as a concrete output (a decision, aligned priorities) — not a discussion topic — to produce useful AI-generated agendas",
          "AI preparation for difficult conversations works best when you ask it to anticipate objections, propose alternative framings, and draft responses to foreseeable pushback",
          "Client communication tone requires explicit instructions on audience, relationship stage, and message sensitivity — do not assume AI defaults to the right register",
          "Facilitation materials generated by AI must be refined against knowledge of the specific group's dynamics, history, and political context before use",
        ],
        exercise: {
          title: "Workshop Agenda Design",
          description:
            "Use AI to design a workshop agenda for an upcoming client interaction, including facilitator moves and materials checklist.",
          steps: [
            "Identify an upcoming client workshop, meeting, or working session you are responsible for facilitating",
            "Define the concrete output the session must produce — a decision, a validated hypothesis, an aligned priority list",
            "Prompt AI with the session objective, audience profile, time available, and the output you need",
            "Review the AI-generated agenda for: (a) is the output achievable in the time? (b) are the discussion questions likely to surface the key issues? (c) is the decision methodology workable with this specific group?",
            "Refine the agenda against your knowledge of the group dynamics and confirm the materials preparation needed",
          ],
          tool: "Claude",
        },
        quiz: [
          {
            question:
              "What distinguishes a well-designed workshop from a discussion session in consulting?",
            options: [
              "A well-designed workshop is longer and includes more participants",
              "A well-designed workshop is structured to achieve a specific, concrete output — a decision, aligned priorities, or validated hypothesis set",
              "A well-designed workshop uses more sophisticated facilitation tools",
              "A well-designed workshop is led by a partner rather than a consultant",
            ],
            correct: 1,
            explanation:
              "The defining characteristic of an effective consulting workshop is that it is structured to produce a specific output, not to generate discussion. Specifying the output — a decision, a prioritised backlog, an aligned strategic narrative — determines the agenda structure, discussion methodology, and facilitation approach. Workshops without defined outputs tend to produce interesting discussion but no actionable conclusions.",
          },
          {
            question:
              "A consultant needs to tell a client that the engagement's preliminary findings do not support the client's preferred strategic direction. How should AI best be used to prepare for this conversation?",
            options: [
              "Ask AI to soften the message so it is less likely to create conflict",
              "Ask AI to find evidence that supports the client's preferred direction",
              "Ask AI to anticipate the client's likely objections, propose alternative message framings, and draft responses to foreseeable pushback",
              "Use AI to generate a script for the conversation and follow it precisely",
            ],
            correct: 2,
            explanation:
              "Difficult client conversations require preparation, not avoidance or script-following. AI's most valuable role is helping the consultant anticipate what the client's likely responses and objections will be, explore alternative ways to frame a difficult message that lands without damaging the relationship, and prepare considered responses to foreseeable pushback. This builds the consultant's confidence and flexibility going into a high-stakes conversation.",
          },
          {
            question:
              "When prompting AI to draft a client email, what information is most important to include?",
            options: [
              "The email word count limit and formatting requirements",
              "The audience (who will read it), the relationship stage, the key message, and the appropriate tone register",
              "The full history of the engagement to date",
              "A list of similar emails the consultant has sent previously",
            ],
            correct: 1,
            explanation:
              "Client email quality depends primarily on tone calibration — getting the register right for the audience and relationship stage. AI needs explicit information on who is receiving the email (seniority, relationship to the engagement), the stage of the relationship (early engagement versus trusted advisor), the key message, and the appropriate tone (direct, diplomatic, confident but appropriately tentative). Without these inputs, AI defaults to generic professional language that may not suit the specific situation.",
          },
        ],
        applyThisWeek: {
          action:
            "Design a workshop agenda or prepare for a difficult client conversation using AI, and note where your contextual knowledge of the client required you to refine the AI output.",
          promptTemplate:
            "I am designing a [duration] workshop for [number] participants from [client description] at the [stage] of a [engagement type] engagement. The workshop objective is to [specific output, e.g. reach a decision on X]. The participants include [describe the group dynamics or decision-making style if relevant]. Please design an agenda with: (1) time allocation per section, (2) the key facilitator moves at each stage, (3) discussion questions that will surface the most important issues, (4) a decision methodology for the final 20 minutes, (5) materials needed in advance.",
          tool: "Claude",
        },
      },
    ],
  },

  specialist: {
    title: "AI for Specialists and Domain Experts",
    description:
      "Help specialist consultants and domain experts use AI to amplify their expertise — accelerating deep research, translating knowledge into client-ready outputs, and building a systematic AI knowledge system that compounds across every engagement.",
    lessons: [
      {
        id: "consulting-specialist-l1",
        title: "AI as a Domain Amplifier: Specialists Who Use AI Win More Work",
        duration: 15,
        description:
          "Understand why domain expertise combined with AI creates a stronger market position than either alone, and how specialists can use AI without diluting the knowledge depth that makes them valuable.",
        content: `## The Specialist's AI Advantage

Your competitive position as a specialist rests on depth of expertise that generalists cannot replicate. AI does not threaten that position — it amplifies it. What AI enables a specialist to do is deploy that expertise more broadly: more client engagements, faster research, deeper literature coverage, and higher-volume output without proportional effort increase.

The specialists who do not adopt AI face a different competitive threat: generalist consultants using AI to approximate specialist outputs at lower cost. AI-assisted generalism is not the same as genuine specialist depth, but it is increasingly competitive for the production tasks that previously required specialist time.

## Where AI Amplifies Specialist Value

**Literature and research coverage.** Specialists often need to monitor large volumes of literature — academic research, regulatory guidance, industry reports, competitor publications. AI can synthesise this volume of material at a pace that would otherwise require multiple analysts.

**Rapid hypothesis generation in your domain.** Your domain expertise allows you to evaluate AI-generated hypotheses that a non-specialist could not assess. Use AI to generate fast, broad hypothesis sets and apply your specialist lens to prioritise and refine them.

**Client-ready translation.** The gap between specialist knowledge and client-ready output is often significant — the technical precision required by peer reviewers versus the accessible clarity required by a CEO. AI bridges this translation gap effectively when given clear instructions.

**Proposal and origination support.** Writing compelling bids and proposals for specialist work is time-intensive. AI accelerates the production of high-quality bid content, allowing specialists to pursue more origination opportunities.

\`\`\`
SPECIALIST RESEARCH SYNTHESIS PROMPT

I am a specialist in [domain, e.g. healthcare regulatory affairs] preparing a client brief on [topic, e.g. new UAE MOHAP approval pathways for Class III medical devices].

I have gathered the following materials: [paste regulatory guidance, research notes, industry commentary].

Please synthesise into:
1. Key regulatory changes and their effective dates
2. Implications for Class III device manufacturers currently in the approval pipeline
3. Areas of regulatory uncertainty requiring specialist interpretation
4. Recommended actions for our client's regulatory strategy

Flag any areas where the guidance is ambiguous and specialist judgment is required. Tone: technically precise but accessible to a senior non-technical client audience.
\`\`\`

## The Expertise Verification Responsibility

AI will occasionally produce outputs in your domain that are technically incorrect in ways that a non-specialist would not detect. This is the specialist's most important AI responsibility: your domain expertise is the quality gate that prevents plausible-sounding but incorrect specialist content from reaching clients. Never submit AI-generated specialist content without applying your expert verification.`,
        keyTakeaways: [
          "AI amplifies specialist value by enabling broader coverage, faster research, and higher-output translation without sacrificing the depth that differentiates specialists",
          "The competitive risk is not AI replacing specialists — it is AI-assisted generalism competing for production tasks that previously required specialist time",
          "Specialist AI prompts must explicitly require technical precision alongside client-accessible language — AI defaults to generic professional prose without this instruction",
          "Expert verification of AI-generated domain content is the specialist's most important AI responsibility — technical inaccuracies that non-specialists cannot detect must be caught before they reach clients",
        ],
        exercise: {
          title: "Domain Research Synthesis",
          description:
            "Use AI to synthesise a volume of domain-specific research into a structured specialist brief, then apply expert verification.",
          steps: [
            "Identify a current or recent engagement topic where you have gathered significant research material",
            "Compile the research into a single document — articles, guidance notes, reports — with source labels",
            "Prompt AI to synthesise into a structured brief with sections relevant to your domain and the client brief",
            "Apply expert verification: for each key claim in the AI output, assess whether it is technically accurate and appropriately nuanced",
            "Mark any sections requiring specialist correction or additional qualification before client delivery",
          ],
          tool: "Claude",
        },
        quiz: [
          {
            question:
              "Why do specialists have a particular responsibility when verifying AI-generated domain content?",
            options: [
              "Because AI tools are not designed for specialist domains",
              "Because specialists are held to a higher standard of accuracy than generalists",
              "Because AI can produce plausible-sounding technical content that is incorrect in ways only a specialist can detect",
              "Because specialist clients expect a higher volume of citations",
            ],
            correct: 2,
            explanation:
              "AI can generate confident-sounding technical content that contains subtle inaccuracies — incorrect regulatory interpretations, outdated clinical data, misapplied technical standards — that a non-specialist reviewer would not detect. The specialist's domain expertise is the essential quality gate that prevents these errors from reaching clients. This is a more critical responsibility for specialists than for generalists precisely because the errors are harder to spot.",
          },
          {
            question:
              "What is the competitive risk AI poses to specialists who do not adopt it?",
            options: [
              "AI will replace specialists entirely within five years",
              "Junior consultants using AI will produce outputs of equal quality to specialist work",
              "AI-assisted generalists will compete effectively for the production tasks that previously required specialist time, reducing specialist billing opportunities",
              "Clients will no longer pay specialist rate card premiums",
            ],
            correct: 2,
            explanation:
              "The primary competitive risk is not AI replacing specialist expertise — the depth of genuine specialist knowledge remains differentiating. The risk is that AI enables generalists to approximate specialist outputs at the production level (well-written briefs, structured analyses, accessible reports) and at lower cost, reducing the specialist's competitive advantage on engagements where depth is less critical than production output. Specialists who use AI maintain the advantage on both dimensions.",
          },
          {
            question:
              "An AI-generated specialist brief contains technically accurate information but uses language that a senior client audience will find impenetrable. What should the specialist do?",
            options: [
              "Submit the technically accurate version — precision is the specialist's value proposition",
              "Ask a generalist colleague to rewrite the language for accessibility",
              "Prompt AI to rework the language with explicit instructions on technical precision balanced with client accessibility, then verify the technical accuracy of the revised version",
              "Append a glossary to help the client understand the technical terms",
            ],
            correct: 2,
            explanation:
              "Client-ready specialist content requires both technical accuracy and accessible communication. The right approach is to use AI to rework the language with explicit instructions on the target audience (senior non-technical executive) and the required balance (technically rigorous but accessible), then re-verify the technical accuracy of the revised version. Specialist verification cannot be delegated to a generalist colleague who cannot assess the technical content.",
          },
        ],
        applyThisWeek: {
          action:
            "Take a piece of specialist research or guidance from your current domain focus and use AI to produce a client-accessible brief, then apply your expert verification before sharing.",
          promptTemplate:
            "I am a specialist in [domain]. I have gathered the following [research/guidance/literature]: [paste material]. Please synthesise into a brief for a senior client audience who understands the business context but not the technical detail. Structure as: (1) key findings and their business implications, (2) areas of uncertainty or ongoing debate in the field, (3) recommended actions. Use precise technical language where necessary but explain each technical concept in accessible terms. Flag any areas where specialist interpretation is required beyond synthesis.",
          tool: "Claude",
        },
      },
      {
        id: "consulting-specialist-l2",
        title: "Deep Research, Literature Synthesis, and Competitive Intelligence with AI",
        duration: 18,
        description:
          "Master AI techniques for systematic literature coverage, deep research synthesis, and competitive intelligence gathering that give specialist consultants a research capability that was previously only available to large research teams.",
        content: `## The Research Volume Problem for Specialists

Specialist consultants face a persistent tension: staying at the frontier of their domain requires reading and processing large volumes of literature — academic papers, regulatory updates, industry reports, competitor publications, conference outputs — while simultaneously delivering on client engagements. The volume of specialist literature has increased dramatically with AI-generated content entering every domain. AI is the only scalable response to this volume challenge.

## Systematic Literature Synthesis

Systematic literature synthesis — the structured review of all relevant literature on a question, with documented methodology for source selection and synthesis — is a rigorous research approach borrowed from academic evidence review. AI can assist at multiple stages of this process while the specialist applies the critical evaluation that AI cannot perform.

**AI-assisted stages:**
- Drafting the synthesis structure and research questions
- Processing and summarising individual documents from a provided corpus
- Identifying themes and patterns across documents
- Flagging contradictions and gaps between sources

**Specialist-only stages:**
- Evaluating source quality and methodological rigour
- Interpreting ambiguous or technically complex findings
- Assessing the relevance of findings to the specific client context

\`\`\`
SYSTEMATIC LITERATURE SYNTHESIS PROMPT

I am conducting a specialist research review on [topic] for a client engagement. I have gathered 12 sources covering [date range]. My research question is: [state question precisely].

I will provide the sources one at a time. For each source, please:
1. Summarise the key findings relevant to my research question (3–5 bullets)
2. Note the source's methodology and assess its reliability (strong/moderate/weak, with brief rationale)
3. Flag any findings that contradict previous sources I have provided

After all sources, please synthesise across all sources: (a) key themes and consensus findings, (b) contested areas where sources disagree, (c) gaps where the literature does not address my research question.
\`\`\`

## Competitive Intelligence for Specialists

Specialist competitive intelligence — understanding what competitor firms are claiming in your domain, what expertise they are presenting to market, and where they are investing their thought leadership — is strategically important for maintaining market positioning. AI can help process large volumes of competitor publications, job postings, proposal language, and public content to identify positioning patterns.

## Monitoring Your Domain at Scale

The most sustainable AI application for specialist research is continuous monitoring: setting up structured AI-assisted processes for regularly processing new literature and flagging content relevant to your active client engagements and domain focus areas. This transforms domain currency from a periodic intensive effort into a continuous low-effort process.`,
        keyTakeaways: [
          "AI can process large volumes of specialist literature for synthesis but cannot evaluate source quality or interpret technically complex findings — those remain specialist responsibilities",
          "The sequential document synthesis prompt (process each source, then synthesise across sources) is more accurate than pasting all sources simultaneously for complex literature reviews",
          "Competitive intelligence for specialists means monitoring competitor firms' domain claims and thought leadership positioning — AI processes the volume while the specialist interprets the strategic implications",
          "Continuous monitoring through structured AI-assisted processes is more sustainable than periodic intensive literature reviews",
        ],
        exercise: {
          title: "Literature Synthesis Session",
          description:
            "Conduct an AI-assisted systematic literature synthesis on a domain question relevant to a current or upcoming engagement.",
          steps: [
            "Define a specific research question for a current engagement or domain area you are developing",
            "Gather 5–8 relevant sources (papers, reports, regulatory guidance, industry publications)",
            "Use the sequential synthesis prompt to process each source one at a time, asking AI to summarise findings and flag contradictions with prior sources",
            "After processing all sources, prompt AI to synthesise across sources: consensus findings, contested areas, and research gaps",
            "Apply your specialist evaluation: which sources are methodologically strong? Which findings require domain-specific interpretation before client application?",
          ],
          tool: "Claude",
        },
        quiz: [
          {
            question:
              "Why is the sequential document synthesis approach (one document at a time) more reliable than pasting all sources simultaneously for specialist literature reviews?",
            options: [
              "AI tools have character limits that prevent processing multiple documents at once",
              "Sequential processing allows the specialist to verify each document summary before proceeding and catches contradictions between sources more reliably",
              "Simultaneous processing produces outputs that are too long for practical use",
              "Sequential processing is faster for the AI to complete",
            ],
            correct: 1,
            explanation:
              "Sequential processing gives the specialist a verification checkpoint after each document — the summary can be checked against the original before the process continues. It also produces more reliable contradiction detection, since AI is explicitly tracking what previous documents said when it processes each new one. When all documents are pasted simultaneously, the AI must juggle the full corpus at once, and source attribution and contradiction tracking become less reliable.",
          },
          {
            question:
              "A specialist uses AI to synthesise 15 academic papers on a topic. The AI output identifies 'consensus findings' across the papers. What must the specialist do before presenting these as established evidence to a client?",
            options: [
              "Check that the AI has cited the correct paper numbers",
              "Evaluate the methodological quality of the papers producing the consensus and assess whether the consensus is genuine or reflects publication bias",
              "Run the synthesis again with a different AI tool to confirm the consensus",
              "Add confidence intervals to each consensus finding",
            ],
            correct: 1,
            explanation:
              "AI counts papers and identifies agreement between them — it cannot evaluate whether the papers producing the apparent consensus are methodologically sound, peer-reviewed, or representative of the full evidence base, or whether the consensus reflects genuine scientific agreement or publication bias. The specialist's evaluation of source quality and methodological rigour is the essential step between AI synthesis and client-ready evidence claims.",
          },
          {
            question:
              "What is the strategic purpose of specialist competitive intelligence?",
            options: [
              "To copy competitor firms' research approaches",
              "To identify competitor rate card pricing for bid strategy",
              "To understand competitor positioning claims in the domain and identify where differentiation opportunities exist",
              "To monitor for client conflicts of interest",
            ],
            correct: 2,
            explanation:
              "Specialist competitive intelligence is strategically focused on understanding how competitor firms are positioning their domain expertise to clients — what they are claiming, where they are investing in thought leadership, and how their proposition compares to yours. This intelligence informs your own positioning decisions, identifies differentiation opportunities, and helps you anticipate the competitive landscape in client bids and origination conversations.",
          },
        ],
        applyThisWeek: {
          action:
            "Conduct a five-source AI-assisted literature synthesis on a domain question relevant to a current or upcoming engagement and share the output with your team.",
          promptTemplate:
            "I am conducting a literature review on [research question] for a [engagement type] engagement. I will provide you with summaries of [number] sources. For each source I provide, please: (1) identify the key findings relevant to my research question, (2) note any methodological limitations I should consider, (3) flag any findings that contradict what previous sources in this review have said. When I have provided all sources, synthesise into: consensus findings, contested areas, and gaps in the evidence base.",
          tool: "Claude",
        },
      },
      {
        id: "consulting-specialist-l3",
        title: "Translating Expertise into Client-Ready Outputs with AI",
        duration: 17,
        description:
          "Use AI to bridge the gap between specialist knowledge depth and client-accessible deliverables — producing reports, briefing documents, presentation narratives, and executive summaries that communicate complex expertise with precision and clarity.",
        content: `## The Translation Problem in Specialist Consulting

Specialist knowledge and client-ready communication are two different skills. Deep domain expertise expressed in technical language that peer reviewers would accept is often inaccessible to the executive audiences who need to act on it. The translation step — converting rigorous specialist analysis into clear, actionable client communication — is time-intensive and cognitively demanding. AI significantly reduces the friction of this translation.

## Types of Specialist Client Output

**Executive briefings.** Two-to-four-page documents that communicate a specialist finding and its business implications to a senior non-technical audience. AI drafts effectively when given the specialist input and the audience profile.

**Technical appendices.** Full-detail specialist analysis intended for technical client counterparts. AI formats and structures technical content, though the specialist writes or closely supervises the technical substance.

**Presentation narratives.** The spoken or written narrative that accompanies specialist slides — AI is particularly effective at converting bullet-point specialist analysis into fluent narrative that maintains precision while improving accessibility.

**Policy and regulatory briefs.** Structured documents interpreting regulatory developments for client business impact. AI can draft the business implication sections from specialist interpretation input.

\`\`\`
EXECUTIVE BRIEFING PROMPT

I am a specialist in [domain]. I need to produce a 2-page executive briefing for the Chief Operating Officer of a [sector] business on the following specialist topic: [topic and key findings].

Specialist findings: [paste your technical analysis or notes].

Please draft the briefing with:
1. Headline finding (1 sentence — what the COO needs to know)
2. Why this matters for the business (3 bullets — business implications, not technical detail)
3. What the evidence shows (3–4 bullets — accessible summary of the specialist analysis, flagging where there is uncertainty)
4. Recommended actions (3 bullets — specific, prioritised, actionable)

Requirements: technically precise but accessible to a senior executive with no specialist background. No jargon without immediate plain-language explanation. Every recommendation must follow directly from the evidence.
\`\`\`

## Quality Control for Specialist Outputs

The specialist's quality gate for AI-assisted client outputs has two dimensions: technical accuracy (does the content correctly represent the specialist analysis?) and translation fidelity (has the accessible language introduced any ambiguity or oversimplification that changes the meaning?). Both must be checked before client delivery.

## Building a Translation Prompt Library

Specialists who invest in developing high-quality translation prompts for their domain accumulate a significant efficiency asset. A well-calibrated prompt for "translate specialist regulatory findings into a COO briefing" produces increasingly good results as you refine it across engagements, to the point where the AI draft requires minimal editing.`,
        keyTakeaways: [
          "The translation gap between specialist depth and client accessibility is the most time-consuming writing challenge for specialist consultants — AI reduces this friction significantly",
          "Executive briefings benefit most from explicit audience specification in the prompt: seniority, technical background, and what action the reader needs to take",
          "Quality control for specialist AI outputs has two dimensions: technical accuracy of the content and fidelity of the translation (accessible language must not introduce ambiguity or change the meaning)",
          "A domain-specific translation prompt library is a compounding efficiency asset — refined prompts produce increasingly good first drafts across every engagement",
        ],
        exercise: {
          title: "Executive Briefing Production",
          description:
            "Use AI to translate a piece of specialist analysis into a client-ready executive briefing for a non-technical senior audience.",
          steps: [
            "Select a specialist finding or analysis from a current or recent engagement",
            "Define the executive audience: their seniority, their technical background, and what action they need to take based on the briefing",
            "Draft the specialist input for the prompt: your key findings in technical language, the business context, and the recommended actions",
            "Prompt AI to produce the executive briefing with explicit audience instructions and the required structure",
            "Apply the two-dimensional quality check: (a) technical accuracy — does it correctly represent your analysis? (b) translation fidelity — has accessible language introduced any ambiguity or oversimplification?",
          ],
          tool: "Claude",
        },
        quiz: [
          {
            question:
              "What are the two quality dimensions a specialist must check in AI-assisted client deliverable production?",
            options: [
              "Language quality and formatting compliance",
              "Technical accuracy (does the content correctly represent the analysis?) and translation fidelity (has accessibility compromised precision?)",
              "Citation completeness and word count compliance",
              "Client feedback responsiveness and structural coherence",
            ],
            correct: 1,
            explanation:
              "Specialist AI-assisted deliverables require two separate quality checks that other consultant types may not need to apply as rigorously: first, that the technical content correctly represents the specialist analysis (AI can introduce technically incorrect simplifications), and second, that the accessibility-oriented language has not introduced ambiguity or changed the meaning of the specialist findings. Both checks require the specialist's domain expertise.",
          },
          {
            question:
              "Why does specifying the executive audience's technical background improve the quality of AI-generated executive briefings?",
            options: [
              "It helps AI choose the correct formatting template",
              "It determines the appropriate vocabulary level and depth of explanation, calibrating the translation for the specific reader",
              "It prevents AI from including confidential client information",
              "It reduces the length of the AI output to match executive attention spans",
            ],
            correct: 1,
            explanation:
              "An AI-generated executive briefing that does not know the reader's technical background defaults to a generic professional register that may be either too technical for a non-specialist executive or too basic for a technically sophisticated one. Specifying the audience's technical background allows the AI to calibrate the vocabulary, the depth of explanation, and the assumed baseline knowledge — the difference between a briefing that lands and one that misses the reader.",
          },
          {
            question:
              "A specialist has built a refined prompt for translating regulatory findings into COO briefings and used it across five engagements. What is the most valuable thing to do with this prompt?",
            options: [
              "Keep it private as a personal competitive advantage",
              "Delete it after each engagement for client confidentiality reasons",
              "Add it to a prompt library with notes on what makes it effective, and share with team members who produce similar outputs",
              "Submit it to the firm's knowledge management system as a best practice document",
            ],
            correct: 2,
            explanation:
              "A refined specialist translation prompt is a shared team asset. Saving it in a prompt library with notes on what makes it effective (and what generalised context needs to be filled in for each engagement) allows team members to benefit from the refinement investment rather than developing equivalent prompts independently. Sharing knowledge through a prompt library is the consulting equivalent of sharing a model template or a methodology document.",
          },
        ],
        applyThisWeek: {
          action:
            "Produce an AI-assisted executive briefing for a current specialist finding and save the refined prompt to your team's shared prompt library.",
          promptTemplate:
            "I am a specialist in [domain] and need to produce an executive briefing on [topic] for [audience description, e.g. a CFO with a financial background but no specialist knowledge of this domain]. My specialist findings are: [paste technical analysis]. The business context is: [2 sentences]. Recommended actions: [list]. Please draft a 2-page briefing with: (1) headline finding, (2) business implications, (3) accessible evidence summary, (4) recommended actions. Every technical term must be followed by a plain-language explanation in parentheses. Every recommendation must connect explicitly to a finding.",
          tool: "Claude",
        },
      },
      {
        id: "consulting-specialist-l4",
        title: "Building a Specialist AI Knowledge System and Prompt Library",
        duration: 16,
        description:
          "Design a systematic AI knowledge infrastructure — a prompt library, a research synthesis system, and a domain monitoring process — that makes AI a permanent, compounding advantage for your specialist consulting practice.",
        content: `## From Tool Use to Knowledge Infrastructure

Most specialists use AI opportunistically — when they remember to, for the task in front of them. The specialists who build a sustainable competitive advantage treat AI as an infrastructure investment: a systematic prompt library, a structured research monitoring process, and a knowledge synthesis system that builds over time. The difference in output between opportunistic and systematic AI use grows with every engagement.

## The Specialist Prompt Library

A specialist prompt library is organised by task type and domain context. Unlike a generalist prompt library, specialist prompts must encode domain-specific precision requirements, appropriate technical vocabulary, and the quality standards your field expects.

**Prompt library categories for specialists:**
- Literature synthesis (systematic review, rapid scan, single-source analysis)
- Client output translation (executive briefing, technical appendix, board paper)
- Research monitoring (new publications, regulatory updates, competitive intelligence)
- Proposal and bid content (domain expertise section, capability narrative, relevant experience)
- Workshop facilitation (domain education session, technical working group facilitation)

\`\`\`
PROMPT LIBRARY MAINTENANCE TEMPLATE

Prompt name: [descriptive name, e.g. "Regulatory briefing — COO audience"]
Domain: [your specialist domain]
Task type: [e.g. client output translation]
Engagement context: [generalised description — remove all client-specific data]

Prompt:
[Full prompt text with placeholders in square brackets for variable elements]

What makes this prompt effective: [2–3 observations from using it]
Known limitations: [when does this prompt produce weaker output?]
Last refined: [date]
Engagements used on: [count only — no client names]
\`\`\`

## Domain Monitoring System

A sustainable domain monitoring system has three components: (1) a curated source list (the publications, regulatory bodies, and organisations whose outputs you need to track), (2) a regular synthesis schedule (weekly or fortnightly AI-assisted processing of new content), and (3) a dissemination habit (sharing relevant synthesis with your team and clients).

## Knowledge Accumulation Over Time

The highest long-term value of a specialist AI system is knowledge accumulation. AI-assisted synthesis outputs, refined over multiple engagements, create a growing proprietary knowledge base that represents your documented domain expertise in a reusable form. This knowledge base has three values: personal reference (faster ramp on new but related engagement topics), team development (onboarding new team members with existing synthesis), and origination (demonstrating domain currency to prospective clients).

## Ethics and Attribution

When using AI to synthesise specialist literature, maintain clear documentation of original sources. AI synthesis does not replace citation — the specialist's name and professional reputation are attached to outputs that must be traceable to primary sources. Never allow AI synthesis to obscure the source of ideas that require attribution.`,
        keyTakeaways: [
          "Systematic AI infrastructure (prompt library, monitoring system, knowledge accumulation) compounds in value across every engagement — opportunistic use captures only a fraction of the available advantage",
          "Specialist prompt libraries must encode domain-specific precision requirements, not just generic task instructions — the domain context is what makes a specialist prompt more valuable than a generic one",
          "A domain monitoring system (curated sources, regular synthesis schedule, dissemination habit) transforms domain currency from periodic intensive effort to continuous low-effort process",
          "AI synthesis outputs must always maintain clear source documentation — the specialist's professional reputation requires that every synthesised claim is traceable to a verifiable primary source",
        ],
        exercise: {
          title: "Prompt Library Foundation Build",
          description:
            "Create the foundation of your specialist prompt library with five prompts covering your most critical domain task types.",
          steps: [
            "List the five task types you perform most frequently in your specialist domain (e.g. literature synthesis, regulatory briefing, client report, competitive intelligence, proposal writing)",
            "For each task type, draft a reusable prompt template using the prompt library maintenance template format",
            "Test each prompt on a real or practice task and note what makes it effective and where it produces weaker output",
            "Store the five prompts in a shared document accessible to your team with the maintenance template fields completed for each",
            "Commit to reviewing and refining each prompt after every engagement where it is used",
          ],
          tool: "Claude",
        },
        quiz: [
          {
            question:
              "What distinguishes a specialist prompt library from a generalist one?",
            options: [
              "Specialist prompt libraries are longer and more detailed",
              "Specialist prompts encode domain-specific precision requirements, technical vocabulary standards, and the quality expectations of the field",
              "Specialist prompt libraries are only used by senior practitioners",
              "Specialist prompts use more complex formatting instructions",
            ],
            correct: 1,
            explanation:
              "The defining characteristic of a specialist prompt library is domain specificity — prompts that encode the technical precision requirements of the field, the appropriate vocabulary standards, the quality bar that specialist peer review expects, and the translation calibration needed for different client audiences. Generic task instructions produce generic outputs; domain-encoded instructions produce outputs calibrated to the specialist's professional standards.",
          },
          {
            question:
              "A specialist's AI-assisted synthesis outputs from 20 engagements over three years represent what type of organisational asset?",
            options: [
              "A compliance record of AI tool use",
              "A growing proprietary knowledge base that represents documented domain expertise in a reusable form",
              "A training dataset for future AI tools",
              "A billing records supplement",
            ],
            correct: 1,
            explanation:
              "Accumulated AI-assisted synthesis outputs, maintained with clear source documentation, represent a growing proprietary knowledge base — the specialist's domain expertise made explicit and reusable. This knowledge base has concrete value for personal reference on new engagements, team development (onboarding with existing synthesis), and origination (demonstrating domain currency and thought leadership to prospective clients).",
          },
          {
            question:
              "Why must AI synthesis maintain clear source documentation even when the output is a synthesis across many sources?",
            options: [
              "To comply with AI tool terms of service",
              "To enable clients to verify the specialist's work",
              "Because the specialist's professional reputation is attached to outputs that must be traceable to primary sources, and AI synthesis does not replace citation obligations",
              "To facilitate future AI training on the synthesis outputs",
            ],
            correct: 2,
            explanation:
              "Professional credibility in specialist consulting rests on the quality and traceability of the evidence base. AI synthesis is a processing tool — it does not originate ideas or findings, and it does not replace the obligation to attribute ideas and data to their original sources. The specialist's name is attached to the output, and professional standards (and in regulated domains, legal requirements) require that synthesised claims remain traceable to verifiable primary sources.",
          },
        ],
        applyThisWeek: {
          action:
            "Build the foundation of your specialist prompt library — five prompts for your most critical domain task types — and share it with your team.",
          promptTemplate:
            "Help me build a specialist prompt template for the following task in my domain of [specialist domain]: [describe task type]. The prompt should: (1) encode the precision requirements of my field, (2) specify the appropriate technical vocabulary level, (3) include placeholders for the variable context I will fill in for each engagement, (4) produce output that meets the quality standard for [client audience type]. Format it using this structure: prompt name, domain, task type, full prompt text with placeholders, and a section for notes on known limitations.",
          tool: "Claude",
        },
      },
    ],
  },

  partner: {
    title: "AI for Partners and Directors",
    description:
      "Give partners and directors a practical AI playbook for origination, client intelligence, practice leadership, and strategic positioning — the activities that determine practice growth, client retention, and market reputation.",
    lessons: [
      {
        id: "consulting-partner-l1",
        title: "The Partner's AI Playbook: Origination, Value, and Practice Leadership",
        duration: 15,
        description:
          "Understand how AI reshapes the partner role — from creating new origination capacity and sharpening client intelligence to building an AI-forward practice that attracts better talent and commands premium positioning.",
        content: `## AI and the Partner's Value Equation

Partners and directors create value through three activities: originating new work, leading client relationships, and building the practice. AI does not change what these activities are — it changes the leverage available in each of them. The partners who understand this and act on it early will build stronger practices faster. Those who treat AI as their team's productivity tool while staying personally disengaged will gradually cede ground to partners who have built AI into their own operating model.

## Origination and AI

Origination — identifying new client opportunities, building relationships with prospective clients, and converting them into engagements — is time-constrained by the number of relationships a partner can actively maintain. AI creates leverage in origination by:

- **Client intelligence acceleration.** Preparing for a prospect meeting now takes minutes rather than hours. AI synthesises company filings, news, industry developments, and competitor activity into a structured brief that makes every conversation better informed.
- **Proposal drafting.** AI drafts high-quality proposal content — capability narratives, methodology sections, relevant case summaries — that reduces proposal production time by 50–70%.
- **Thought leadership production.** Maintaining a stream of published perspectives that sustain market visibility requires consistent output. AI accelerates the production of articles, briefings, and LinkedIn content that keep a partner's market presence active.

## Practice Leadership and AI

As a practice leader, your AI decisions affect every member of your team. The protocols you establish — which tools are approved, how AI output is quality-checked, what the confidentiality standards are — determine how effectively your practice uses AI and what risks it is exposed to. Establishing clear AI governance is now a practice leadership responsibility.

\`\`\`
PARTNER CLIENT INTELLIGENCE PROMPT

I am preparing for a first meeting with the CFO of [company type] in [sector]. The meeting purpose is to explore a potential [engagement type] opportunity.

Please produce a structured pre-meeting brief covering:
1. Company overview: key financials, recent strategic developments, market position
2. The CFO's likely priorities and pain points given the company's current situation
3. Recent industry developments that are likely to be on their agenda
4. 3–5 conversation starters that demonstrate sector knowledge and create space for a strategic discussion
5. Questions that will surface whether a [engagement type] opportunity exists and what scope it might take

[Paste any relevant research, news, or company information you have gathered]
\`\`\`

## The Partner AI Credibility Question

Partners who can speak knowledgeably about AI — its capabilities, limitations, governance implications, and practical applications — are increasingly well-positioned in conversations with senior clients who are grappling with their own AI adoption decisions. Personal AI fluency is becoming a credibility signal at partner level, not just a productivity tool.`,
        keyTakeaways: [
          "Partners who build AI into their own operating model — not just their team's — create compounding advantage in origination, client intelligence, and thought leadership production",
          "AI governance at practice level — approved tools, quality standards, confidentiality protocols — is now a practice leadership responsibility, not an IT decision",
          "Personal AI fluency is a growing credibility signal for partners in conversations with senior clients navigating their own AI adoption decisions",
          "Origination leverage from AI comes from three sources: faster client intelligence, accelerated proposal production, and consistent thought leadership output",
        ],
        exercise: {
          title: "Partner Pre-Meeting Intelligence Brief",
          description:
            "Use AI to prepare a structured intelligence brief for an upcoming client or prospect meeting.",
          steps: [
            "Identify an upcoming meeting with a client or prospect where preparation quality will directly affect the outcome",
            "Gather available information about the contact and their organisation: company reports, recent news, sector developments",
            "Prompt AI to synthesise this material into a structured pre-meeting brief with the sections specified in the partner client intelligence prompt format",
            "Add your own knowledge of the relationship and any confidential context that AI could not access",
            "Use the brief to prepare your opening questions and conversation strategy for the meeting",
          ],
          tool: "Claude",
        },
        quiz: [
          {
            question:
              "Why is partner-level personal AI engagement strategically important beyond individual productivity?",
            options: [
              "Partners need to use the same tools as their analysts for consistency",
              "Partners who are personally AI-fluent can credibly advise clients on AI adoption, and the governance decisions they make shape practice-wide AI effectiveness",
              "Partners are billed at a higher rate, so their time savings are more financially significant",
              "AI tools require partner-level approval to be used in client engagements",
            ],
            correct: 1,
            explanation:
              "Partner-level AI engagement matters for two reasons beyond personal productivity: governance impact (the protocols partners establish determine practice-wide AI effectiveness and risk exposure) and client credibility (partners who are personally AI-fluent are better positioned in conversations with senior clients navigating their own AI decisions). Both effects are practice-level, not individual.",
          },
          {
            question:
              "What is the most time-efficient way for a partner to use AI to maintain market presence and thought leadership?",
            options: [
              "Delegating all thought leadership production to AI with minimal personal input",
              "Using AI to draft first versions of articles and briefings based on the partner's perspective input, then refining and publishing under the partner's name",
              "Using AI to curate and share other people's thought leadership",
              "Limiting AI to proposal drafting and keeping thought leadership entirely manual to maintain authenticity",
            ],
            correct: 1,
            explanation:
              "Effective partner thought leadership combines the partner's genuine expertise and perspective (which is the source of differentiated value) with AI's ability to produce polished drafts at speed. The partner provides the perspective, domain insight, and directional argument; AI drafts the structured, well-written content; the partner refines and publishes. This model produces more consistent output than fully manual production without sacrificing the intellectual authenticity that makes partner thought leadership valuable.",
          },
          {
            question:
              "A partner is establishing AI protocols for their practice. Which decision is most critical to get right first?",
            options: [
              "Which AI tools produce the most impressive client presentation slides",
              "How AI-generated content will be quality-checked before reaching clients",
              "Which team members will use AI versus which will not",
              "How AI cost savings will be reflected in team utilisation targets",
            ],
            correct: 1,
            explanation:
              "The most critical first decision in practice-level AI governance is the quality assurance protocol — specifically, how AI-generated content is verified for accuracy and client-readiness before it enters a deliverable or reaches a client. This decision determines the practice's risk exposure on every AI-assisted engagement. Tool selection, team allocation, and utilisation impacts are secondary to establishing the quality gate that protects client relationships and professional reputation.",
          },
        ],
        applyThisWeek: {
          action:
            "Use AI to prepare a structured intelligence brief for your next client or prospect meeting, and note how the preparation quality compared to your usual approach.",
          promptTemplate:
            "I am a partner preparing for a [meeting type] with [role, e.g. CFO] at [company description] in [sector]. My objective for the meeting is: [specific outcome]. I have gathered the following background: [paste relevant information]. Please produce a structured pre-meeting brief covering: (1) company overview and recent developments, (2) likely priorities for this executive, (3) relevant industry context, (4) conversation starters that demonstrate sector knowledge, (5) discovery questions that will surface whether a [engagement type] opportunity exists.",
          tool: "Claude",
        },
      },
      {
        id: "consulting-partner-l2",
        title: "AI for Client Intelligence, Relationship Management, and Bid Writing",
        duration: 17,
        description:
          "Use AI to systematically enhance client intelligence, maintain relationship depth across a broader portfolio, and produce higher-quality bid responses faster — the three activities that most directly drive partner revenue.",
        content: `## The Partner's Revenue Equation

Partner revenue ultimately comes from three sources: retaining existing clients, growing existing relationships, and winning new clients. AI creates leverage across all three. The partner who uses AI systematically for client intelligence, relationship maintenance, and bid writing will outperform a peer of equal talent who does not.

## Client Intelligence at Scale

Partners typically manage 10–30 active and prospect client relationships. Staying deeply informed about each — tracking company developments, understanding strategic pressures, monitoring leadership changes and board priorities — is a full-time job that competes with delivery responsibilities. AI converts this intelligence management from a reactive (reading what crosses your desk) to a proactive (systematic processing of curated information) activity.

**AI-assisted client intelligence system:**
1. A curated source list per major client (company website, filings, sector news, competitor announcements)
2. A weekly AI synthesis pass that produces a structured update on each client
3. A relationship action log that tracks follow-up opportunities identified through intelligence

## Bid Writing and Proposal Production

Consulting bids have a consistent structure: executive summary, understanding of the client's need, proposed approach and methodology, team credentials, relevant experience, rate card, and commercial terms. AI is highly effective at drafting all non-commercial sections, particularly capability narratives, methodology descriptions, and case study summaries.

\`\`\`
BID WRITING PROMPT

I am writing a proposal for a [engagement type] for a [sector] client. The client's stated need is: [paste from brief or RFP].

Please draft the "Our Approach" section of the proposal. This section should:
1. Demonstrate that we understand the client's specific situation and challenges (not generic consulting language)
2. Describe our proposed approach in 3–4 phases with clear deliverables and decision points at each phase
3. Explain the analytical methodology we will use and why it is appropriate for this type of problem
4. Address the key risks the client is likely to have about engaging on this type of work and how our approach mitigates them

Tone: confident, specific, client-focused. Avoid generic consulting phrases like "leveraging best practices" or "delivering value." Every sentence should be specific to this engagement.
\`\`\`

## Relationship Depth Across a Larger Portfolio

AI enables partners to maintain higher relationship quality across a larger client portfolio by reducing the administrative overhead of relationship management: drafting follow-up emails, preparing for periodic check-in calls, summarising meeting notes, and tracking open commitments. The time freed by this administrative acceleration goes back into the higher-value relationship activity that AI cannot perform: the authentic human engagement that builds lasting client trust.`,
        keyTakeaways: [
          "A systematic AI client intelligence process (curated sources, weekly synthesis, relationship action log) converts client knowledge from reactive to proactive across a partner's full portfolio",
          "AI is highly effective at drafting all non-commercial bid sections — capability narratives, methodology descriptions, approach sections — reducing proposal production time by 50–70%",
          "Bid writing quality improves when prompts explicitly prohibit generic consulting language and require specific client-context sentences",
          "Administrative relationship management (follow-up drafting, meeting preparation, commitment tracking) is the right AI delegation target — freeing time for the authentic engagement that builds client trust",
        ],
        exercise: {
          title: "Bid Section Draft",
          description:
            "Use AI to draft a key section of an active or practice bid response, then evaluate the output against your quality standard for client-facing proposals.",
          steps: [
            "Select an active bid or a recent proposal to use as the basis for this exercise",
            "Identify the approach or methodology section as the target for AI drafting",
            "Prepare the prompt inputs: the client's stated need, your proposed approach, the methodology rationale, and the key client concerns you want to address",
            "Generate the AI draft with explicit instructions against generic language and in favour of client-specific sentences",
            "Evaluate the draft: does it read as specific to this client and this situation, or does it feel like template language? Revise until it passes the specificity test",
          ],
          tool: "Claude",
        },
        quiz: [
          {
            question:
              "What is the primary benefit of converting client intelligence management from reactive to proactive using AI?",
            options: [
              "It reduces the time partners spend reading industry news",
              "It enables partners to stay deeply informed about more client situations simultaneously, improving the quality of every client interaction",
              "It eliminates the need for sector specialist support",
              "It allows partners to delegate all client communication to their team",
            ],
            correct: 1,
            explanation:
              "The reactive approach to client intelligence — reading what crosses your desk — produces uneven coverage across a partner's portfolio. Proactive AI-assisted intelligence (curated sources processed systematically) produces consistent depth across all active and prospect clients. This breadth improvement means every client conversation is better informed, creating more origination opportunities and demonstrating the sector awareness that differentiates a trusted advisor from a transactional service provider.",
          },
          {
            question:
              "Why should bid writing prompts explicitly prohibit generic consulting phrases?",
            options: [
              "Because AI does not understand consulting terminology",
              "Because generic phrases waste word count in proposals",
              "Because AI defaults to generic professional language, and the only way to produce client-specific proposal content is to explicitly require specificity and prohibit generic substitutes",
              "Because clients have told consulting firms they dislike jargon",
            ],
            correct: 2,
            explanation:
              "Without explicit constraints, AI tends to produce technically correct but generic consulting language — the kind of phrases ('leveraging best practices', 'delivering sustainable value') that appear in every proposal and distinguish no one. Explicit prohibition of generic language forces AI to use specific, client-contextual sentences. This produces proposals that feel tailored rather than templated, which is a material differentiator in competitive bid situations.",
          },
          {
            question:
              "A partner uses AI to draft relationship maintenance emails for 20 client contacts each week. What is the correct way to use this time saving?",
            options: [
              "Increase the number of client contacts managed by adding 20 more prospects",
              "Reduce client-facing time proportionally, since AI is handling the communication",
              "Invest the freed time in higher-value relationship activities — more meaningful conversations, deeper client knowledge, and the authentic engagement that builds trust",
              "Use the time for internal practice management tasks",
            ],
            correct: 2,
            explanation:
              "The purpose of AI administrative delegation in relationship management is to free time for the human relationship activities that AI cannot perform: authentic engagement, deep listening, empathic navigation of client concerns, and the trusted advisor conversations that determine whether clients expand engagements and refer new work. Using AI to increase the volume of managed contacts without reinvesting the freed time in relationship depth negates the primary strategic benefit.",
          },
        ],
        applyThisWeek: {
          action:
            "Draft the approach section of an active bid using AI, evaluate it against the specificity test, and note how much time you saved compared to manual drafting.",
          promptTemplate:
            "I am drafting the approach section of a proposal for a [engagement type] with a [sector] client. The client's stated challenge is: [describe the need]. Our proposed approach is: [describe in 3–4 phases]. The client's likely concerns about this type of engagement are: [list 2–3]. Please draft the approach section. Requirements: (1) every sentence must be specific to this client's situation — no generic consulting phrases, (2) each phase must have a clear deliverable and decision point, (3) the methodology rationale must explain why this approach is right for this type of problem specifically, (4) address each client concern explicitly within the narrative.",
          tool: "Claude",
        },
      },
      {
        id: "consulting-partner-l3",
        title: "Building an AI-Forward Practice: Culture, Governance, and Capability",
        duration: 16,
        description:
          "Design the governance framework, capability development approach, and cultural conditions that enable your practice to use AI effectively, safely, and consistently — building a sustainable competitive advantage rather than pockets of individual AI competence.",
        content: `## Practice-Level AI Is a Leadership Problem

Individual AI adoption at analyst and consultant level is a personal productivity question. Practice-level AI adoption is a leadership question: the decisions you make about governance, tool standards, quality protocols, capability development, and culture determine whether your practice benefits systematically from AI or inherits a patchwork of inconsistent, unmanaged AI use that creates quality and compliance risk.

## The Four Pillars of an AI-Forward Practice

**Governance.** Clear decisions on approved tools, data handling standards, client confidentiality protocols for AI use, and quality verification requirements for AI-assisted deliverables. These decisions protect the practice and enable team members to use AI with confidence.

**Capability development.** A structured approach to building team AI competence — not ad hoc training or individual self-learning, but deliberate skill development with specific outcomes: prompt literacy, output quality assessment, and domain-specific AI application skills.

**Quality standards.** Explicit standards for what AI-assisted content must meet before it reaches a client — the verification steps, the review requirements, and the professional judgment checkpoints that maintain the quality standard regardless of how much of the production AI contributed.

**Culture.** A practice culture that treats AI fluency as a professional skill worth developing, normalises sharing what works (prompt libraries, workflow innovations), and rewards AI-enabled quality uplift rather than just AI-enabled time reduction.

\`\`\`
AI GOVERNANCE FRAMEWORK PROMPT

I am a partner designing an AI governance framework for a [practice size] consulting practice in [sector]. We need to balance enabling AI productivity gains with managing quality and confidentiality risk.

Please draft a governance framework covering:
1. Approved and prohibited AI tool categories with rationale
2. Data classification rules for what can and cannot be input into AI tools
3. Quality verification requirements for AI-assisted client deliverables
4. Team training and competence standards
5. Escalation process for AI-related concerns or incidents

Format as a practical policy document, not a theoretical framework. Each section should include specific rules, not principles only.
\`\`\`

## Building AI Capability in Your Team

The most effective practice-level AI capability building is not a training programme — it is deliberate integration of AI into live engagement work with structured reflection on what works. Designate early engagements as AI capability development opportunities where the team documents what they tried, what produced good output, and what the quality issues were. This converts engagement work into a learning system.

## The Culture Question

Practices where AI adoption is patchy often have a culture problem rather than a skill problem: team members who are using AI effectively are not sharing what they have learned, and those who are not confident are not asking. The partner's role is to normalise sharing — prompt libraries on shared drives, brief AI workflow reviews in team meetings, and explicit recognition of AI-enabled work quality improvements.`,
        keyTakeaways: [
          "Practice-level AI governance requires four explicit decisions: approved tools and data standards, quality verification requirements, structured capability development, and a sharing culture",
          "AI governance documents should specify rules, not principles — what is permitted, what is prohibited, and what the quality verification steps are for each deliverable type",
          "Embedding AI into live engagement work with structured reflection is more effective for capability building than standalone training programmes",
          "Patchy AI adoption is usually a culture problem (no sharing, no normalisation) rather than a skill problem — the partner's leadership role is to model and incentivise sharing",
        ],
        exercise: {
          title: "Practice AI Governance Draft",
          description:
            "Draft the key elements of an AI governance framework for your practice, tailored to your practice's size, sector, and client confidentiality requirements.",
          steps: [
            "Identify the three highest-risk AI governance gaps in your current practice: where is AI being used without clear protocols?",
            "Prompt AI to draft a governance framework covering the four pillars (approved tools, data standards, quality requirements, capability development)",
            "Review the draft against your practice's actual risk profile: which rules are appropriate, which are too restrictive, which gaps does it miss?",
            "Add practice-specific rules that AI could not infer from the general prompt",
            "Share the draft with your practice leadership team for input before finalising",
          ],
          tool: "Claude",
        },
        quiz: [
          {
            question:
              "What is the difference between AI governance principles and AI governance rules?",
            options: [
              "Principles are for senior team members; rules are for junior team members",
              "Principles state what is valued; rules specify what is permitted, prohibited, and required — rules are what enable consistent, confident practice-level AI use",
              "Principles are strategic; rules are operational",
              "There is no meaningful difference — they serve the same purpose",
            ],
            correct: 1,
            explanation:
              "Principles ('we value quality and confidentiality') are necessary but insufficient for governance — they do not tell a consultant whether they can paste a client's financial model into Claude or how they must verify AI-drafted content before sending it to a client. Rules specify the actual permissions and requirements ('only use AI tools from the approved list', 'all AI-drafted client content must be fact-checked by the responsible consultant before submission'). Rules enable confident, consistent action; principles only set the intent.",
          },
          {
            question:
              "Why is embedding AI into live engagement work more effective for capability building than standalone training programmes?",
            options: [
              "Training programmes are too expensive for most practices",
              "Live engagement work creates real-stakes learning with immediate feedback on quality and application, which transfers to competence faster than simulated exercises",
              "Team members are too busy to attend training programmes",
              "AI tools change too quickly for training programmes to stay relevant",
            ],
            correct: 1,
            explanation:
              "Capability is built through application in context, not through instruction in isolation. When AI is applied to real engagement tasks with structured reflection on what worked and what quality issues arose, the learning is immediately connected to professional outcomes that matter. Training programmes provide knowledge; live engagement integration develops judgment — the ability to decide when and how to apply AI to achieve the quality standard a specific client situation requires.",
          },
          {
            question:
              "A partner notices that three consultants in the practice have developed excellent AI prompts for research synthesis but are keeping them to themselves. What should the partner do?",
            options: [
              "Mandate that all prompts be submitted to a central repository",
              "Do nothing — individual competitive advantage within the team is healthy",
              "Create a normalised sharing culture: establish a shared prompt library, recognise contributors, and make sharing a team norm rather than an individual choice",
              "Assign a junior team member to extract the prompts from the three consultants",
            ],
            correct: 2,
            explanation:
              "Prompt hoarding is a symptom of a culture that does not normalise sharing — usually because the practice has not established clear norms or incentives for sharing AI innovations. The partner's role is to create the conditions for sharing: a practical shared prompt library, explicit recognition of contributors, and visible use of shared prompts in the partner's own work. Mandating submission creates compliance without culture; recognising contribution builds the norm organically.",
          },
        ],
        applyThisWeek: {
          action:
            "Draft the approved tools and quality verification sections of an AI governance framework for your practice, and share it with your practice leadership team for input.",
          promptTemplate:
            "I am drafting an AI governance framework for a consulting practice of [size] people working in [sector]. Draft the following two sections: (1) Approved AI tools — include categories of approved tools (specify what makes a tool approved), prohibited tool categories, and the rationale for each decision. (2) Quality verification requirements — specify the verification steps required before AI-assisted content can be included in any client deliverable, including who must verify, what they must check, and how the verification must be documented. Write as practical policy rules, not general principles. Each rule should be specific enough that a team member knows exactly what to do.",
          tool: "Claude",
        },
      },
      {
        id: "consulting-partner-l4",
        title: "AI for Strategic Positioning, Thought Leadership, and Market Development",
        duration: 16,
        description:
          "Use AI to sustain a visible market presence, produce consistent thought leadership, sharpen your strategic positioning, and build the origination pipeline that drives practice growth — without the time investment that has historically made these activities the first to be deprioritised under delivery pressure.",
        content: `## The Market Presence Problem for Partners

Partners in delivery-intensive practices face a consistent tension: the engagement work that generates current revenue competes for the time that builds future revenue — thought leadership, conference presence, client relationship development, and market positioning activities. AI directly addresses this tension by compressing the production time for market presence activities, making consistent output achievable even under high delivery pressure.

## AI-Accelerated Thought Leadership

Thought leadership that sustains market presence requires two ingredients: genuine expertise (which is the partner's; AI cannot supply it) and consistent, well-produced output (where AI provides significant acceleration).

**The thought leadership production workflow:**
1. **Position the perspective.** What is the insight or argument that is genuinely differentiated? This is the partner's intellectual contribution and cannot be generated by AI.
2. **Draft the structure.** Provide AI with the perspective and ask it to propose an article or briefing structure that would resonate with the target audience.
3. **Generate the draft.** AI drafts from the structure, the partner's notes, and any research provided.
4. **Refine and authenticate.** The partner rewrites sections that do not capture their genuine voice or add nuance the AI lacked context for.
5. **Publish and distribute.** AI can draft the LinkedIn post, the email distribution note, and the summary for the firm's newsletter.

\`\`\`
THOUGHT LEADERSHIP DRAFT PROMPT

I am a partner with [domain] expertise writing a thought leadership article for [target audience, e.g. CFOs of mid-market businesses in the UAE].

My core argument is: [state your differentiated perspective in 2–3 sentences].

The key evidence or examples that support this argument: [list 3–5 data points, client observations, or sector developments].

Please draft a 600-word article with:
- A headline that would make a CFO want to read it
- An opening that establishes the relevance of the topic without cliché
- A structured argument in 3–4 sections, each making one point clearly
- A practical conclusion with one specific recommendation the reader can act on

Tone: authoritative but direct. The partner has strong views and is not hedging them. Avoid academic hedging language and management consulting clichés.
\`\`\`

## Strategic Positioning With AI

A partner's strategic positioning — what they are known for, which problems they are the obvious choice for, what their market reputation is built on — requires deliberate development and consistent communication. AI can assist in articulating, refining, and consistently communicating positioning across different contexts: website bios, LinkedIn, conference submissions, award nominations, and business development conversations.

## Building the Origination Pipeline

An origination pipeline — a structured set of prospective engagements at different stages of development — is the partner's most important business development asset. AI supports pipeline development through systematic prospect research, outreach message drafting, and follow-up communication management. The partner's relationship and judgment determine pipeline outcomes; AI removes the administrative friction that lets pipelines go stale.`,
        keyTakeaways: [
          "Thought leadership quality comes from the partner's genuine expertise and differentiated perspective — AI accelerates production but cannot generate the intellectual content that makes thought leadership valuable",
          "The five-step thought leadership workflow (position, structure, draft, refine, distribute) produces consistent output under delivery pressure by separating the intellectual contribution from the production work",
          "Strategic positioning must be deliberately developed and consistently communicated — AI assists in articulating and adapting positioning statements across multiple contexts",
          "Origination pipeline management with AI support removes administrative friction that causes pipelines to stall — keeping prospect relationships active without displacing the partner judgment that converts prospects to clients",
        ],
        exercise: {
          title: "Thought Leadership Draft",
          description:
            "Use the five-step thought leadership workflow to produce a draft article or briefing for your target market audience.",
          steps: [
            "Identify a perspective or argument that is genuinely differentiated in your domain — what do you believe that most of your competitors would not say?",
            "Gather the evidence: data points, client observations, sector developments that support the argument",
            "Prompt AI to propose an article structure for your target audience, then generate a full draft from your notes and evidence",
            "Read the draft critically: where does it capture your genuine voice? Where does it feel generic or lack the conviction of your actual position?",
            "Rewrite the sections that do not authenticate your perspective, and produce the final version ready for publication",
          ],
          tool: "Claude",
        },
        quiz: [
          {
            question:
              "What is the partner's irreplaceable contribution to thought leadership that AI cannot generate?",
            options: [
              "The formatting and length of the article",
              "The distribution strategy and publication timing",
              "The genuinely differentiated perspective and the expertise-based insight that makes the argument credible and valuable to the target audience",
              "The research and evidence base cited in the article",
            ],
            correct: 2,
            explanation:
              "AI can draft, structure, and polish — it can produce competent professional prose from any set of inputs. What it cannot generate is the partner's genuine expertise-derived perspective: the view built from years of domain experience, the insight that comes from pattern recognition across many client situations, and the intellectual courage to make a specific argument rather than a hedged, balanced view. This is the actual value of partner thought leadership, and it must come from the partner.",
          },
          {
            question:
              "Why does an origination pipeline go stale, and how does AI address this?",
            options: [
              "Pipelines go stale because prospects change their minds; AI maintains contact so prospects stay engaged",
              "Pipelines go stale because administrative friction (drafting follow-ups, preparing for calls, tracking next steps) crowds out relationship maintenance under delivery pressure; AI removes this friction",
              "Pipelines go stale because partners do not spend enough time on business development; AI increases business development time by doing delivery work",
              "Pipelines go stale because competitor firms make better offers; AI helps partners respond to competitive proposals faster",
            ],
            correct: 1,
            explanation:
              "Origination pipelines stall most commonly not because of strategic failures but because of administrative neglect under delivery pressure: the follow-up email that was not drafted, the call that was not prepared for, the next step that was not tracked. AI directly addresses this by compressing the administrative overhead of pipeline maintenance — drafting follow-ups, preparing call briefs, tracking commitments — so that relationship activity continues even when delivery demands are high.",
          },
          {
            question:
              "A partner's thought leadership article draft produced by AI does not capture their genuine voice or the conviction of their actual position. What is the correct response?",
            options: [
              "Use the AI draft as-is to save time — voice authenticity is less important than consistent output",
              "Abandon AI for thought leadership and return to manual drafting",
              "Rewrite the sections that do not authenticate the partner's perspective, treating the AI draft as a structural scaffold rather than the final content",
              "Ask the AI to rewrite in a more assertive tone without the partner's additional input",
            ],
            correct: 2,
            explanation:
              "The AI draft's value in thought leadership is structural — it produces a well-organised, fluently written scaffold that the partner then fills with authentic voice and genuine conviction. Sections that sound generic or lack the partner's actual position should be rewritten, not polished. Asking AI to be 'more assertive' without the partner's input produces assertive-sounding generic content, not the partner's real perspective. The rewriting step is the intellectual contribution that makes the final article valuable.",
          },
        ],
        applyThisWeek: {
          action:
            "Use the five-step thought leadership workflow to produce a draft article or briefing for your target audience, and schedule it for publication this week.",
          promptTemplate:
            "I am drafting a thought leadership article for [target audience, e.g. HR Directors at mid-market companies in the GCC]. My core argument is: [state your differentiated position in 2–3 sentences]. Supporting evidence and examples: [list 3–5 points]. Please: (1) propose a headline that would make a [target audience role] want to read it, (2) suggest a 4-section structure that builds the argument clearly, (3) draft a full article of approximately [word count] words using the headline and structure. Requirements: authoritative, direct tone with a specific recommendation in the conclusion. No hedging. No management consulting clichés. Every paragraph must advance the argument.",
          tool: "Claude",
        },
      },
    ],
  },
}
