import type { Track } from '../types'

export const productTrack: Track = {
  id: 'product',
  title: 'AI for Product Managers',
  tagline: 'Discover faster, prioritise smarter, and ship better products with AI',
  description:
    'A practical curriculum for product managers and product owners who want to use AI across the full product lifecycle — from user research and discovery to roadmap planning, PRD writing, and building AI-powered features.',
  color: '#14B8A6',
  level: 'beginner',
  modules: [
    {
      id: 'product-m1',
      title: 'AI Fundamentals for Product Managers',
      description:
        'Understand what AI can and cannot do in a product context, which tools matter for PMs, and how to set up an AI workflow that improves your output without adding noise.',
      lessons: [
        {
          id: 'product-m1-l1',
          title: 'What AI Means for Product Work',
          duration: 15,
          description:
            'Understand how AI changes the PM role, where it genuinely helps, and where human judgment is still the irreplaceable core of great product work.',
          content: `## AI and the Product Manager Role

Product management is fundamentally about making good decisions under uncertainty. AI doesn't change that. What AI changes is the cost of the work that surrounds those decisions: research synthesis, document drafting, competitive analysis, stakeholder communication. When that work takes less time, PMs can think more carefully about the decisions themselves.

## What AI Is Good at for PMs

**Synthesis and summarisation.** PM work generates enormous volumes of text: user interviews, support tickets, survey responses, stakeholder feedback, market reports. AI can process this faster and more systematically than any team.

**First-draft generation.** PRDs, user stories, one-pagers, update emails — AI eliminates the blank page and produces a usable starting point in minutes.

**Brainstorming at scale.** Ask for 20 feature ideas, 15 problem framings, or 10 risk scenarios. Filter from abundance rather than straining for ideas.

**Structured analysis.** AI can apply frameworks (RICE, JTBD, competitor mapping) to your inputs and produce structured outputs that accelerate analysis.

## What AI Cannot Do

**Replace product judgment.** AI doesn't know your users as well as you do from having spent time with them. It doesn't feel the friction in the product. It can't attend the customer call. Product sense is still built by humans.

**Understand your company's strategy.** AI doesn't know your organisation's priorities, political dynamics, resource constraints, or what the CEO cares about this quarter. You bring that context; AI doesn't have it.

**Make trade-off decisions.** Prioritisation involves values, constraints, and strategic context that AI cannot fully understand. AI can inform the decision; it cannot make it.

**Validate assumptions.** AI can generate hypotheses rapidly. Only real users and real data validate them.

## The PM's New Role

With AI, PMs spend less time producing documents and more time:
- Building relationships with users and stakeholders
- Exercising the strategic judgment that AI cannot replicate
- Defining the right questions that AI then helps answer
- Verifying and refining AI-generated outputs with domain expertise

This is a more senior version of the PM role, not a diminished one.`,
          keyTakeaways: [
            'AI accelerates research synthesis, drafting, and analysis — the scaffolding around PM decisions',
            'Product judgment, strategic context, and stakeholder understanding remain fundamentally human',
            'AI generates quantity (20 ideas, 15 framings) that your judgment then filters',
            'Prompting AI well requires knowing the right question — which is itself a core PM skill',
            'With AI handling more production work, PMs can invest more time in user proximity and strategic thinking',
          ],
          exercise: {
            title: 'PM Workflow Mapping',
            description:
              'Map your current weekly PM tasks to AI suitability to identify where to start.',
            steps: [
              'List your ten most time-consuming recurring PM tasks this week',
              'For each task, score: (a) how much of it is drafting/synthesis vs. judgment, (b) how repetitive it is, (c) how bad an error would be',
              'High drafting content + repetitive + recoverable errors = great AI candidate',
              'Identify your top three AI candidate tasks',
              'This week, use Claude for one of them. Track time saved and what you needed to change in the AI output.',
            ],
            tool: 'Claude',
          },
          quiz: [
            {
              question: 'Which type of PM task benefits most from AI assistance?',
              options: [
                'Making final prioritisation decisions for the quarterly roadmap',
                'Synthesising themes from 50 user interview transcripts into structured insights',
                'Deciding which features align with company strategy',
                'Running user research sessions',
              ],
              correct: 1,
              explanation:
                'Text synthesis — reading, categorising, and summarising large volumes of qualitative data — is one of AI\'s strongest capabilities. Synthesising 50 interview transcripts manually might take a PM a full day. AI can produce a structured themes summary in minutes, which the PM then reviews and refines with their contextual knowledge.',
            },
            {
              question: 'What does a PM provide to AI-assisted product work that the AI cannot supply?',
              options: [
                'Word count and document length',
                'Strategic context, user proximity, and the judgment to make trade-off decisions',
                'Document templates and formatting instructions',
                'Grammar and spell-checking',
              ],
              correct: 1,
              explanation:
                'AI lacks the context that defines great PM work: your organisation\'s strategy, what your specific users feel and need, the political dynamics around a product decision, and the values that should guide trade-offs. These are the PM\'s contributions to AI-assisted work — the AI produces raw material; the PM brings the judgment.',
            },
          ],
        },
        {
          id: 'product-m1-l2',
          title: 'AI Tools for Product Managers',
          duration: 18,
          description:
            'Navigate the AI tools that are most useful for PM work and build a simple, effective AI toolkit without the tool paralysis that slows many teams down.',
          content: `## The PM AI Toolkit

You don't need many tools. The risk is spending more time evaluating and switching tools than doing the actual work. Most PMs can build an excellent AI workflow with three to four tools.

## Tier 1: General-Purpose AI (Essential)

**Claude or ChatGPT** — Your primary AI assistant for writing, analysis, synthesis, and brainstorming. These are the workhorses. Either works; pick one and build fluency with it rather than switching constantly.

**Use for:** PRD drafting, user story writing, one-pagers, meeting summaries, research synthesis, competitor summaries, brainstorming.

## Tier 2: Specialised PM Tools (High Value)

**Dovetail / Maze / Notion AI** — Research synthesis tools that integrate with your existing research workflow. Dovetail specifically is built for qualitative research analysis and tagging at scale.

**Linear / Jira AI add-ons** — Some PM tools now embed AI for ticket writing, sprint planning, and backlog management. Check what's available in your existing tools before adding new ones.

## Tier 3: Analytical AI (Situational)

**Perplexity or Claude with web access** — For competitive intelligence that needs current data. General-purpose LLMs have training cutoffs; web-enabled tools can access current product announcements and competitor updates.

**ChatGPT Data Analysis / Claude with CSV** — For lightweight data analysis when you don't have data team support. Paste a CSV and ask questions.

## Tool Selection Principles

1. **Start with what you have.** Many organisations have ChatGPT Enterprise or Claude Team. Use those before adding new tools.
2. **Integrate, don't parallel-process.** AI tools you use inside Notion or Linear are less disruptive than switching to a separate browser tab.
3. **Build fluency before variety.** You get more from knowing one tool deeply than from knowing five tools shallowly.`,
          keyTakeaways: [
            'A two to three tool stack (general AI + research tool + existing PM tool integrations) covers most PM AI needs',
            'Build fluency with one general-purpose AI before adding specialist tools',
            'Many organisations already have enterprise AI access — use what is approved before adding unapproved tools',
            'Integrate AI into existing workflows rather than creating parallel processes',
            'Web-enabled AI tools are better for competitive intelligence that requires current data',
          ],
          exercise: {
            title: 'Your PM AI Stack Audit',
            description:
              'Audit what AI tools are available to you and build a simple, focused PM toolkit.',
            steps: [
              'Check with IT what AI tools are currently approved and available in your organisation',
              'List any AI features built into your existing PM, research, and documentation tools (Jira, Linear, Notion, Dovetail, etc.)',
              'Identify gaps: what PM tasks do you want AI help with that your current tools don\'t cover?',
              'Choose one new tool (or existing approved tool you haven\'t used) to trial for two weeks',
              'After two weeks: is it still in your workflow? Did it save time? Should it stay in your stack?',
            ],
            tool: 'Claude',
          },
          quiz: [
            {
              question: 'What is the most common mistake PMs make when building their AI toolkit?',
              options: [
                'Using AI tools that are too powerful for PM work',
                'Adding too many tools without building fluency in any of them',
                'Using AI for research synthesis tasks',
                'Relying on enterprise AI tools rather than consumer tools',
              ],
              correct: 1,
              explanation:
                'Tool proliferation is a real trap — each new tool requires onboarding time, mental switching cost, and integration effort. The PMs who extract most value from AI are those who pick one or two tools and use them deeply across many task types, rather than picking a specialist tool for each task.',
            },
          ],
        },
        {
          id: 'product-m1-l3',
          title: 'Prompt Engineering for Product Managers',
          duration: 18,
          description:
            'Learn the prompting techniques that produce genuinely useful AI output for PM tasks — and why vague prompts produce vague results.',
          content: `## Why Prompting Matters for PMs

Product managers are professional communicators. The skills that make you good at writing a brief — specificity, context, clear desired outcome — are exactly the skills that make you good at prompting AI. The difference is that with AI, you get the output immediately, so you can iterate in real time.

## The PM Prompt Framework

Every good PM AI prompt includes:

1. **Role context.** What kind of PM are you? What type of product? B2B or B2C? What's the stage?
   *"You are helping a B2B SaaS product manager at a 200-person company..."*

2. **Task and desired output.** What do you want? In what format?
   *"...write a one-page PRD for a new notifications feature. Format: background, problem statement, goals, user stories (3–5), non-goals, success metrics."*

3. **Relevant context.** What does the AI need to know to do the task well?
   *"...The target user is an operations manager who receives email digests today and wants real-time alerts for critical events. The feature should not require app download."*

4. **Constraints.** What limitations apply?
   *"...Maximum 500 words. Avoid implementation details. Frame success metrics as user behaviours, not technical metrics."*

## Prompt Patterns for Common PM Tasks

**User story prompt:**
"Write 5 user stories for [feature] following the format: As a [persona], I want to [action] so that [benefit]. The persona is [describe]. The product is [describe]. Acceptance criteria for each story."

**Competitor analysis prompt:**
"Analyse [competitor product] from the perspective of a PM at a competing company. Cover: target user, core value proposition, key differentiators, apparent weaknesses, and strategic positioning. Base your analysis on publicly available information."

**Problem statement prompt:**
"I'm going to describe a user problem. Help me reframe it as a clear, testable problem statement that separates the symptom from the root cause. User description: [paste interview excerpt or your summary]."

## The Iteration Principle

A prompt is rarely perfect on first try. Treat prompting like product iteration: ship something, see what's wrong, refine. "Make it more specific to B2B users" or "Reframe the problem statement to focus on the outcome, not the feature" are valid iterations.`,
          keyTakeaways: [
            'PM communication skills translate directly into prompting skills — specificity and context determine output quality',
            'The four elements of every good PM prompt: role context, task and format, relevant context, and constraints',
            'Build a personal prompt library for your most common tasks (PRDs, user stories, research synthesis)',
            'Treat prompting iteratively — refine based on output quality, just like a product',
            'Vague prompts produce generic output; specific prompts produce immediately useful output',
          ],
          exercise: {
            title: 'Build Your PM Prompt Library',
            description:
              'Create and test three AI prompts for the PM tasks you do most frequently.',
            steps: [
              'Identify three PM tasks you do repeatedly: examples might be writing user stories, synthesising research, drafting PRD sections, writing release notes, or summarising stakeholder feedback',
              'For each task, write a prompt using the four-part framework: role context, task and format, relevant context, constraints',
              'Run each prompt with a real example from your work (use non-sensitive, recent material)',
              'Assess output: what did you need to edit? Refine your prompt and run it again',
              'Save your three refined prompts as your starting PM prompt library',
            ],
            tool: 'Claude',
          },
          quiz: [
            {
              question: 'Which element most improves AI output quality for PM tasks?',
              options: [
                'Using longer prompts with more words',
                'Providing specific context about your product, user, and desired output format',
                'Asking the AI to be creative',
                'Using technical PM terminology in every prompt',
              ],
              correct: 1,
              explanation:
                'Specificity is the primary driver of output quality. The more the AI knows about your specific context — the product, the user, the company stage, the desired format — the more directly applicable the output will be. Generic prompts produce generic answers; contextual prompts produce contextual answers.',
            },
            {
              question: 'What is the most effective approach when an AI-generated user story is too generic?',
              options: [
                'Switch to a different AI tool',
                'Add more specific context about the persona and product in a follow-up prompt',
                'Accept the generic version since user stories are standard',
                'Ask the AI to write 20 user stories so there is more to choose from',
              ],
              correct: 1,
              explanation:
                'Generic output almost always results from a generic prompt. The solution is to add more specific context in a follow-up: describe the persona more precisely, specify what the product is, name the specific workflow the story is part of. AI is iterative — treat it the same way you\'d treat refining any product draft.',
            },
          ],
        },
        {
          id: 'product-m1-l4',
          title: 'AI Quality Control in Product Work',
          duration: 15,
          description:
            'Develop the habits and review standards that keep AI-generated product work accurate, on-strategy, and genuinely useful — rather than superficially impressive.',
          content: `## The Quality Problem with AI in PM Work

AI produces confident, well-structured output that can look finished when it isn't. Product managers who use AI effectively develop a specific skill: recognising good-looking but wrong outputs and correcting them efficiently.

## The Four Quality Risks in PM AI Work

**1. Strategic drift.** AI doesn't know your strategy, so it may produce technically correct content that is off-strategy. A PRD that looks well-structured but proposes features that don't align with your current focus.

**2. Generic personas.** AI defaults to generic user descriptions unless you've been very specific. "A busy professional who wants to save time" is an AI output. "A senior operations manager at a logistics company who spends 40% of their week on manual exception handling" is a PM output.

**3. Hallucinated specifics.** AI may generate plausible-sounding statistics, feature comparisons, or market data that is fabricated. Any specific claim should be verified.

**4. Missing context.** AI doesn't know what was decided in last week's strategy offsite, what the engineering team said is technically infeasible, or what the top customer complaint has been for two quarters. These gaps create outputs that miss what matters.

## Building a PM Review Checklist

Before using any AI-generated product document:
- [ ] Does this reflect our actual strategy and current priorities?
- [ ] Are the user descriptions specific and accurate, not generic?
- [ ] Have I verified any statistics or market claims?
- [ ] Have I added the context AI didn't have (recent decisions, engineering constraints, customer signals)?
- [ ] Would my team lead approve this as-is, or does it need more of my thinking?

## The Minimum Viable Review

For quick AI tasks (user stories, meeting summaries, draft emails), a lighter review standard applies: read for accuracy, check tone, and send. For higher-stakes documents (PRDs, roadmaps, strategy memos), apply the full checklist above.

The key is calibrating review depth to document stakes — not applying the same review to a Slack update that you'd apply to a board presentation.`,
          keyTakeaways: [
            'Well-structured AI output can still be strategically wrong — develop the skill of spotting confident but incorrect outputs',
            'The four quality risks: strategic drift, generic personas, hallucinated specifics, missing context',
            'Build a review checklist calibrated to document stakes: lighter for quick tasks, thorough for high-stakes documents',
            'Adding context AI doesn\'t have (recent decisions, engineering constraints, customer signals) is the PM\'s primary editing task',
            'AI outputs are starting points, not finished work — the PM\'s judgment is what makes them good',
          ],
          exercise: {
            title: 'Quality Review Practice',
            description:
              'Generate a PRD section with AI, then systematically identify where it needs PM judgment to be genuinely useful.',
            steps: [
              'Choose a feature you are currently working on or planning',
              'Ask Claude to draft the problem statement and goals section of a PRD for this feature',
              'Apply the quality checklist: strategy alignment, persona specificity, hallucinated claims, missing context',
              'Mark every section that needs editing and categorise the type of issue (strategy drift, generic, etc.)',
              'Rewrite the flagged sections using your actual product knowledge',
              'Compare the before and after: how much of the AI output survived your review? What did your judgment change?',
            ],
            tool: 'Claude',
          },
          quiz: [
            {
              question: 'Why might an AI-generated PRD look professional but still be a poor starting point?',
              options: [
                'AI cannot write in a professional format',
                'AI lacks your strategic context, user proximity, and recent organisational decisions',
                'AI PRDs are always too long',
                'AI does not understand product terminology',
              ],
              correct: 1,
              explanation:
                'AI produces structurally professional output but fills it with generic content when it lacks specific context. Without knowing your strategy, your users, recent decisions, and engineering constraints, AI produces a competent-looking template rather than a strategically grounded document. The PM\'s job is to replace the generic with the specific.',
            },
          ],
        },
      ],
    },
    {
      id: 'product-m2',
      title: 'Discovery & User Research with AI',
      description:
        'Use AI to accelerate user research synthesis, competitive intelligence, and insight generation — getting to validated understanding faster without cutting corners on quality.',
      lessons: [
        {
          id: 'product-m2-l1',
          title: 'Synthesising User Research with AI',
          duration: 20,
          description:
            'Transform large volumes of raw user research into structured, actionable insights faster using AI — without losing the nuance that makes research valuable.',
          content: `## The Research Synthesis Problem

User research generates raw material: interview transcripts, survey responses, usability recordings, support tickets. Turning this raw material into structured insights that a product team can act on is time-intensive. AI changes the economics dramatically.

## What AI Can Synthesise

**Interview transcripts.** Paste a transcript (or series of transcripts) and ask AI to: identify recurring themes, extract specific quotes that illustrate each theme, map themes to your problem space, or highlight unexpected findings.

**Survey responses.** Open-ended survey responses are particularly valuable for AI synthesis. AI can categorise responses, identify the most common sentiments, and surface minority views that might otherwise be missed in a large dataset.

**Support tickets and reviews.** Customer support tickets and app store reviews represent unfiltered user voice. AI can process hundreds of these and produce a structured breakdown of: problem categories, frequency, sentiment, and specific pain points.

**Session notes.** Turn raw bullet-point session notes into a structured insight document with AI, then apply your judgment to validate the structure.

## Prompt Patterns for Research Synthesis

**Theme extraction:**
"Here are transcripts from 8 user interviews about [topic]. Identify the 5–7 recurring themes across all interviews. For each theme, provide: a clear label, a one-sentence description, and 2–3 representative quotes from the transcripts."

**Insight clustering:**
"I have grouped these survey responses into rough categories. For each category, identify: the core unmet need, what users are trying to achieve, and any workarounds they are currently using."

**Sentiment analysis:**
"Analyse these 50 support ticket descriptions. Categorise by: problem type, emotional intensity (frustrated/neutral/positive), and whether the user appears likely to churn based on their language."

## What AI Cannot Replace in Research

AI synthesis finds patterns in what users said. It cannot tell you:
- Whether what users said is what they actually mean or do (the say/do gap)
- The emotional subtext visible in body language or tone of voice
- The surprising thing a user did during a usability session
- The strategic significance of a pattern in your specific competitive context

The researcher who was in the room still provides the most important layer of insight.`,
          keyTakeaways: [
            'AI can synthesise interview transcripts, survey responses, support tickets, and session notes faster than any manual method',
            'Prompt AI to extract themes, representative quotes, and unmet needs from research materials',
            'AI synthesis finds patterns in stated data — the researcher still interprets meaning and strategic significance',
            'Always review AI synthesis against the source material for accuracy before sharing with stakeholders',
            'The say/do gap and emotional subtext are insight layers only the researcher who was present can add',
          ],
          exercise: {
            title: 'Research Synthesis Sprint',
            description:
              'Use AI to synthesise a body of user research in a fraction of the usual time.',
            steps: [
              'Gather 3–5 user interview transcripts, or 20+ open-ended survey responses, or 50+ support tickets from any recent research or feedback you have access to',
              'Paste the content into Claude with the theme extraction prompt: identify recurring themes, one-sentence descriptions, and representative quotes',
              'Review the AI output: which themes are accurate? What important theme did it miss? What did it over-index on?',
              'Add the themes it missed from your own research memory and edit the descriptions that don\'t capture the nuance',
              'Estimate: how long would this synthesis have taken without AI? What did your judgment add that AI couldn\'t?',
            ],
            tool: 'Claude',
          },
          quiz: [
            {
              question: 'What is the primary limitation of AI-synthesised user research?',
              options: [
                'AI cannot read transcripts longer than one page',
                'AI finds patterns in stated data but cannot interpret the emotional subtext or say/do gap that researchers observe',
                'AI research synthesis is too expensive for most product teams',
                'AI synthesis requires perfect transcripts with no errors',
              ],
              correct: 1,
              explanation:
                'AI synthesis is excellent at pattern-finding in text — identifying themes, clustering sentiments, extracting quotes. What it cannot do is interpret the fuller research context: what the user was doing while they spoke, the tone of voice, the moment they hesitated, or the thing they did that contradicted what they said. These researcher observations are the most valuable insights and can only be added by the human who was present.',
            },
          ],
        },
        {
          id: 'product-m2-l2',
          title: 'Competitive Intelligence with AI',
          duration: 18,
          description:
            'Build a systematic competitive intelligence practice using AI to monitor competitors, analyse their product moves, and identify strategic opportunities at a fraction of the previous time cost.',
          content: `## Competitive Intelligence as a PM Discipline

Most PMs do competitive research reactively — when a competitor launches something, or before a strategy review. AI makes proactive, systematic competitive monitoring affordable in terms of time investment.

## What AI Can Do for Competitive Intelligence

**Competitor product analysis.** AI can analyse a competitor's website, app store listing, feature documentation, and help centre content to produce a structured product breakdown: target user, core value proposition, feature set, pricing model, and apparent strategic positioning.

**Change detection.** If you track competitor websites and documentation, AI can compare versions and identify what has changed. "Compare these two versions of [competitor]'s pricing page. What has changed and what does this suggest about their strategy?"

**Review mining.** App store reviews and G2/Capterra reviews for competitors are a goldmine. AI can process hundreds of reviews and produce: key strengths users cite, key weaknesses, specific features praised or criticised, and competitive switching patterns ("I switched from X because...").

**Market narrative analysis.** AI can analyse competitor content (blogs, case studies, social media) to understand their go-to-market narrative and positioning.

## The Verification Standard for Competitive Intelligence

AI-generated competitive intelligence is only as good as the data it's given. Verify key claims by checking the actual product, website, or documentation. AI may:
- Have outdated information from its training data
- Misinterpret feature capabilities from documentation
- Miss recent product updates that post-date its training

Use web-enabled AI tools (Perplexity, Claude with web search) for competitive intelligence where currency matters.

## Building a Competitive Intelligence Template

Create a standard competitor profile template and have AI fill it for each competitor quarterly:
1. Target user and use case
2. Core value proposition (their words, from website)
3. Feature categories and apparent strengths
4. Pricing model and positioning
5. Customer sentiment themes (from reviews)
6. Recent product moves and strategic signals
7. Apparent weaknesses from customer reviews`,
          keyTakeaways: [
            'AI makes systematic competitive intelligence affordable by compressing research and summarisation time',
            'Mine competitor reviews on G2, Capterra, and app stores for unfiltered user voice about competitors',
            'Use web-enabled AI tools for competitive intelligence to avoid outdated training data',
            'Build a standard competitor profile template and populate it systematically with AI assistance',
            'Verify AI competitive claims against actual product or documentation before presenting to stakeholders',
          ],
          exercise: {
            title: 'Competitor Profile with AI',
            description:
              'Build a complete competitor profile using AI-assisted research.',
            steps: [
              'Choose one direct competitor you want to understand better',
              'Gather raw material: visit their website, note their key messaging, find their app store listing, and locate 10–20 G2 or Capterra reviews',
              'Ask Claude: "Based on the following [website copy / app store listing / reviews], build a competitor profile covering: target user, core value proposition, feature strengths, apparent weaknesses, and customer sentiment themes."',
              'Add your own competitive observations that AI couldn\'t see (pricing from a demo, UX you\'ve explored, things sales has told you)',
              'Is this analysis materially different from your previous understanding of this competitor? What surprised you?',
            ],
            tool: 'Claude',
          },
          quiz: [
            {
              question: 'Which competitive intelligence source provides the most unfiltered user voice about a competitor?',
              options: [
                'The competitor\'s own website and marketing materials',
                'Customer reviews on G2, Capterra, or the app store',
                'Industry analyst reports',
                'The competitor\'s job postings',
              ],
              correct: 1,
              explanation:
                'Customer reviews on third-party platforms (G2, Capterra, App Store) represent users who have actually used the product and have no incentive to be charitable. They consistently surface specific pain points, praised features, and reasons for switching that competitor marketing materials would never reveal. AI can process hundreds of these reviews quickly and extract structured competitive intelligence.',
            },
          ],
        },
        {
          id: 'product-m2-l3',
          title: 'Problem Framing and Opportunity Sizing with AI',
          duration: 18,
          description:
            'Use AI to sharpen how you frame problems, stress-test your opportunity definitions, and produce market sizing estimates faster.',
          content: `## Why Problem Framing Matters

A poorly framed problem leads to a well-executed solution to the wrong thing. PMs who frame problems precisely — separating symptom from root cause, user from stakeholder, stated preference from actual behaviour — build better products. AI can accelerate this work significantly.

## Using AI for Problem Framing

**Separating symptom from cause.** Describe the user problem to AI and ask it to distinguish the symptom from the underlying root causes. "Users say they can't find the feature they need. Help me separate the symptoms from possible root causes."

**JTBD analysis.** "Using the Jobs-to-be-Done framework, analyse this user behaviour [describe]. What functional, social, and emotional jobs is the user hiring this product to do?"

**Problem statement refinement.** Write a problem statement and ask AI to critique it: "Is this problem statement specific enough to guide a solution? What is it missing? What assumptions is it making?"

**Reframing exercise.** "Generate 5 alternative framings of this problem. Each framing should suggest a different type of solution." This is valuable when a team is stuck in one way of seeing a problem.

## Opportunity Sizing with AI

AI can accelerate market sizing estimates, though all estimates require validation through real data:

**Bottom-up sizing:**
"Help me build a bottom-up market size estimate for [feature/product]. Start with the target user population, then estimate: how many are in our addressable market, what percentage have this problem, how often they'd pay for a solution, and at what price."

**Benchmark gathering:**
"What publicly available data exists on the size of the [specific market segment] and the prevalence of [specific problem]?" (Use web-enabled AI for current data.)

**Assumption testing:**
"Here is my market size estimate [share]. What are the most questionable assumptions I am making? What data would validate or invalidate each?"

## Caution: AI-Generated Numbers

AI will produce numbers. Those numbers may be fabricated or outdated. Any opportunity size estimate that influences strategic decisions must be verified through: investor reports, industry studies, analyst data, or your own customer data.`,
          keyTakeaways: [
            'Use AI to stress-test problem statements, separate symptoms from root causes, and generate alternative framings',
            'JTBD analysis prompts produce structured functional/social/emotional job breakdowns quickly',
            'AI can build bottom-up market size estimates efficiently — but all specific numbers must be verified',
            'Alternative problem framings from AI help teams break out of a fixed perspective',
            'Good problem framing is a multiplier on everything that follows — AI makes it faster but not less important',
          ],
          exercise: {
            title: 'Problem Framing Workshop with AI',
            description:
              'Apply AI-assisted problem framing techniques to a current product problem.',
            steps: [
              'Choose a user problem or product opportunity you are currently working on',
              'Ask Claude to: (1) separate stated symptoms from possible root causes, (2) generate a JTBD analysis of the user behaviour, (3) critique your current problem statement, (4) offer 3 alternative framings',
              'Review each output: which reframing is most interesting? Which root cause had you not considered?',
              'Write a revised problem statement incorporating the most valuable AI-generated insights',
              'Share the revised statement with one colleague — did the reframing change their understanding of the problem?',
            ],
            tool: 'Claude',
          },
          quiz: [
            {
              question: 'What is the most valuable use of AI in problem framing for product managers?',
              options: [
                'Having AI decide which problems to solve',
                'Generating alternative framings and stress-testing assumptions to break out of fixed perspectives',
                'Producing a definitive root cause analysis without further validation',
                'Replacing user research entirely',
              ],
              correct: 1,
              explanation:
                'The most common product failure mode is building a well-executed solution to a poorly framed problem. AI excels at generating multiple problem framings quickly, which forces the PM to choose the most accurate one rather than defaulting to the first framing that occurred to them. This is a reasoning scaffold, not a replacement for domain knowledge.',
            },
          ],
        },
        {
          id: 'product-m2-l4',
          title: 'Designing Better Research with AI',
          duration: 15,
          description:
            'Use AI to design more rigorous user research — better discussion guides, clearer hypotheses, and more targeted research plans.',
          content: `## AI in Research Design

The quality of user research depends on the quality of research design: are you asking the right questions? Are you testing the right hypotheses? Does your methodology match your research goal? AI can be a powerful thinking partner in the design phase.

## Discussion Guide Development

AI can draft interview discussion guides from your research objectives. The output will be generic, but it gives you a starting point faster and surfaces questions you might not have included.

Prompt: "I am planning user interviews to understand how operations managers at logistics companies manage exception handling today. Generate an interview discussion guide covering: current process, pain points, workarounds, and desired outcomes. Use open-ended questions only. 10–12 questions."

Review AI output critically: cut leading questions, add follow-ups that dig into specific points, add opening questions that establish rapport.

## Hypothesis Formulation

Clear hypotheses make research more focused. AI can help formulate them from your assumptions:

"I believe that [operations managers] [struggle to identify exception events quickly] because [our current notification system requires manual checking]. We'll know this is true when [interview participants describe a check-based rather than alert-based workflow in their current process]."

Ask AI: "Help me formulate five testable hypotheses for [feature] based on these user assumptions [list your assumptions]."

## Survey Design

AI can draft survey questions, but requires careful review for:
- Leading questions that bias responses
- Double-barrelled questions (two questions in one)
- Questions with no clearly correct answer options
- Questions that measure stated preference rather than behaviour

Always pilot-test AI-drafted surveys with 3–5 internal respondents before fielding.

## Synthesis Pre-Planning

Before doing research, ask AI: "If I am researching [topic] with these questions, what themes would I expect to find? What would a surprising finding look like?" This pre-planning makes you a sharper analyst when you're in the research.`,
          keyTakeaways: [
            'AI can draft interview discussion guides, survey questions, and research hypotheses as starting points',
            'Review AI discussion guides for leading questions, double-barrelled questions, and closed questions',
            'Hypothesis formulation with AI produces more testable, focused research objectives',
            'Pre-planning expected findings with AI makes you a sharper analyst during actual research',
            'AI research design output is a scaffold — the researcher\'s domain expertise produces the final research plan',
          ],
          exercise: {
            title: 'Research Design with AI',
            description:
              'Use AI to design a user interview discussion guide and a set of research hypotheses for an upcoming research project.',
            steps: [
              'Choose an upcoming or recent research project you have conducted or plan to conduct',
              'Ask Claude to generate: (1) a 10-question interview discussion guide for your target user and topic, (2) three testable hypotheses in the "I believe / because / we\'ll know" format',
              'Review the discussion guide: remove any leading questions, add follow-up probes, and replace any closed questions with open-ended versions',
              'Review the hypotheses: are they testable with the methods you\'re planning? Are they specific enough to guide analysis?',
              'Compare AI\'s guide to a guide you\'ve previously designed for a similar research project. What did AI include that you wouldn\'t have? What did it miss?',
            ],
            tool: 'Claude',
          },
          quiz: [
            {
              question: 'What is the most important quality check when reviewing an AI-drafted interview discussion guide?',
              options: [
                'Verifying the guide has exactly 12 questions',
                'Reviewing for leading questions that could bias participant responses',
                'Ensuring all questions are closed-format for consistency',
                'Checking that the guide covers competitor products',
              ],
              correct: 1,
              explanation:
                'Leading questions are the most common flaw in AI-drafted discussion guides. A leading question like "How frustrating is it when the feature doesn\'t work as expected?" primes the user to confirm a hypothesis rather than describing their actual experience. Open-ended, neutral questions ("Tell me about a recent time when...") produce more reliable qualitative data.',
            },
          ],
        },
      ],
    },
    {
      id: 'product-m3',
      title: 'Roadmap, Prioritisation & Stakeholder Communication',
      description:
        'Use AI to produce sharper PRDs, apply prioritisation frameworks faster, and communicate your product strategy more clearly to every audience.',
      lessons: [
        {
          id: 'product-m3-l1',
          title: 'Writing PRDs with AI',
          duration: 20,
          description:
            'Produce clearer, more comprehensive product requirements documents faster by using AI as a drafting partner while maintaining the strategic thinking that makes PRDs valuable.',
          content: `## PRDs: Why AI Helps and Where It Doesn't

A great PRD requires two things: a clear understanding of the problem and user, and a precise articulation of what to build and why. AI is excellent at the articulation step but cannot supply the understanding. The PM must bring the thinking; AI helps express it.

## The AI-Assisted PRD Workflow

**Step 1 — Supply the thinking.** Before opening an AI tool, know: Who is the user? What is the problem? What does success look like? What are the key constraints (technical, resource, strategic)?

**Step 2 — Give AI a structured brief.** Paste your thinking into Claude with a PRD structure prompt.

**Step 3 — Review and enrich.** AI will produce a structurally complete draft. Your job: replace generic content with specific content, add engineering constraints and open questions, ensure the goals align with your strategy, and add context AI doesn't have.

**Step 4 — Share for input.** A draft PRD shared with engineering and design in the first hour of your writing session is more valuable than a polished PRD shared at the end of the day.

## PRD Prompt Template

"I am writing a PRD for [feature name] at [company type]. Here are my notes:
- User: [who]
- Problem: [what problem, evidenced by what data or research]
- Proposed solution: [high-level what]
- Success metrics: [how we'll measure it]
- Non-goals: [what we're explicitly not solving]
- Constraints: [tech, resource, timeline]

Draft a PRD with: Background & context, Problem statement, Goals & non-goals, User stories (5-8), Success metrics, Open questions, Out of scope. Be specific, not generic."

## The Sections AI Gets Right and Wrong

**Gets right:** Structure, headings, logical organisation, background context, user story format.

**Gets wrong (without your input):** Specific success metrics (AI generates placeholders like "increase retention by X%"), technical feasibility notes, alignment with your specific company strategy, specific user quotes or research evidence, open questions that reflect your actual unknowns.`,
          keyTakeaways: [
            'Bring the product thinking first; AI helps articulate it — not the other way around',
            'The AI-assisted PRD workflow: supply thinking → structured brief → review and enrich → share early',
            'AI gets structure right but fills success metrics, engineering notes, and strategic alignment with generic content',
            'A PRD draft shared early is more valuable than a polished PRD shared late',
            'Your specific user evidence, research quotes, and strategic context are what make AI PRDs genuinely useful',
          ],
          exercise: {
            title: 'PRD First Draft in 20 Minutes',
            description:
              'Use the structured AI PRD workflow to produce a first draft of a feature PRD faster than your current process.',
            steps: [
              'Choose a feature you are currently planning or recently shipped',
              'Spend 5 minutes writing bullet-point notes covering: user, problem, solution, success metrics, non-goals, constraints',
              'Paste your notes into the PRD prompt template and generate a first draft with Claude',
              'Mark in red everything that is generic, placeholder, or strategically wrong',
              'Rewrite those sections with your actual knowledge',
              'Track total time. How does this compare to your usual PRD drafting process?',
            ],
            tool: 'Claude',
          },
          quiz: [
            {
              question: 'What must a PM bring to the AI PRD drafting process that AI cannot supply?',
              options: [
                'The PRD template structure and section headings',
                'Clear understanding of the user, the problem, and strategic alignment — the thinking behind the document',
                'Correct grammar and professional writing style',
                'Knowledge of engineering implementation approaches',
              ],
              correct: 1,
              explanation:
                'AI can produce a structurally excellent PRD from vague inputs. What it cannot produce is strategically grounded, evidence-based content: the specific user research that validates the problem, the success metrics that reflect your actual business model, the alignment with your quarterly strategy, and the open questions that reflect your real uncertainties. The PM must supply this thinking; AI helps express it.',
            },
          ],
        },
        {
          id: 'product-m3-l2',
          title: 'AI-Assisted Prioritisation',
          duration: 18,
          description:
            'Apply prioritisation frameworks more rigorously with AI help, and use AI to stress-test your roadmap decisions before you commit to them.',
          content: `## Prioritisation and AI

Prioritisation is fundamentally a values and strategy exercise. AI cannot make the call — it doesn't know your organisation's strategic priorities, engineering capacity, or stakeholder constraints. What AI can do is make frameworks faster to apply, help you stress-test your reasoning, and generate considerations you might miss.

## Applying Frameworks with AI

**RICE scoring.** Give AI your list of backlog items and your best estimates of reach, impact, confidence, and effort. Ask it to compute RICE scores, rank items, and flag where your estimates seem inconsistent (e.g., where you've scored confidence high on items with weak user evidence).

**Opportunity scoring.** "Rate each of these opportunities on a 1–10 scale for: how important is this to the user, and how satisfied are they currently with existing solutions. Flag high importance + low satisfaction items as top opportunities."

**MoSCoW mapping.** "Help me categorise these features into Must-have, Should-have, Could-have, and Won't-have for the next quarter. I'll give you the strategic context and constraints."

## Stress-Testing Your Roadmap

This is where AI adds surprising value. Give it your draft roadmap and ask it to challenge it:

"Here is my Q3 roadmap. Challenge it from three perspectives: (1) a power user who uses our product daily, (2) an investor who wants us to show revenue growth, (3) an engineer who has to build it with a small team. What would each of them object to?"

This surfaces objections before your stakeholder review, not during it.

## AI for Trade-Off Analysis

"I need to make a decision between [option A] and [option B]. Option A benefits [user segment X] and increases [metric Y]. Option B benefits [user segment Z] and increases [metric W]. Help me think through the trade-offs I should consider before deciding."

AI will generate considerations you can evaluate. The decision is still yours.`,
          keyTakeaways: [
            'AI applies RICE, opportunity scoring, and MoSCoW frameworks faster — but the scores still require your estimates',
            'Stress-testing your roadmap through multiple stakeholder lenses surfaces objections early',
            'AI generates trade-off considerations for complex decisions — the decision itself is always the PM\'s',
            'Inconsistency detection (high confidence on low-evidence items) is a valuable AI quality check on your reasoning',
            'Prioritisation frameworks are tools for structured thinking, not algorithms — AI makes them faster to apply, not less important to apply well',
          ],
          exercise: {
            title: 'Roadmap Stress Test',
            description:
              'Use AI to challenge your current roadmap or backlog priorities from multiple stakeholder perspectives.',
            steps: [
              'List your top 8–10 backlog items or next quarter\'s roadmap',
              'Ask Claude to rank them using RICE (give your estimates for each dimension) or apply opportunity scoring (importance vs. satisfaction)',
              'Then ask Claude to challenge the resulting ranking from three perspectives: a power user, your CEO, and your lead engineer',
              'Note every objection that you hadn\'t already considered',
              'Which objections would change your prioritisation? Revise your ranking to incorporate the valid challenges.',
            ],
            tool: 'Claude',
          },
          quiz: [
            {
              question: 'What is the most valuable way to use AI in a roadmap prioritisation session?',
              options: [
                'Having AI set the final roadmap priorities based on user data',
                'Applying frameworks faster and stress-testing priorities through multiple stakeholder perspectives',
                'Replacing the prioritisation exercise with an AI-generated roadmap',
                'Having AI set RICE scores without PM input',
              ],
              correct: 1,
              explanation:
                'AI doesn\'t know your strategy, resource constraints, or organisational context well enough to set priorities. Where it adds value is in making frameworks faster to apply (computing RICE scores from your estimates), and in stress-testing your thinking by generating objections from multiple perspectives before your stakeholder review.',
            },
          ],
        },
        {
          id: 'product-m3-l3',
          title: 'Stakeholder Communication with AI',
          duration: 15,
          description:
            'Use AI to produce clearer, more audience-appropriate stakeholder communications — from product updates to strategy memos and executive presentations.',
          content: `## Communication as a PM Superpower

PMs who communicate clearly with every stakeholder — engineers, designers, executives, sales, customers — build faster, more aligned products. The challenge is that each audience requires different content, depth, and framing. AI makes tailoring faster.

## Audience-Specific Communication

**Engineering team.** Focus on user problem, success criteria, and constraints. Not on implementation. "Write an engineering kickoff brief for [feature]. Cover: the user problem, what done looks like from a user perspective, what success metrics matter, and the key constraints. Avoid implementation prescriptions."

**Executive update.** Focus on strategic alignment, progress against goals, and decisions needed. "Write a 5-bullet executive product update for [month/sprint]. Cover: what shipped, key learnings, progress toward [metric], upcoming priorities, and one decision needed from leadership."

**Sales enablement.** Focus on customer benefit and competitive positioning. "Write a feature announcement for our sales team covering: what the customer can now do that they couldn't before, which customer problems this solves, how to position this versus [competitor], and suggested talk track."

**Customers.** Focus on what's in it for them, clearly and specifically. "Write a product update email to customers announcing [feature]. Focus exclusively on customer benefit. No engineering jargon. One specific example of how it changes their workflow."

## The One-Pager Prompt

One-pagers are a PM staple for getting alignment. A structured prompt produces a first draft in two minutes:

"Write a product one-pager for [feature] targeting [audience]. Structure: (1) The problem — one sentence, (2) Why now — one sentence, (3) Our solution — two sentences, (4) How it works — three bullets, (5) What success looks like — two metrics, (6) What we need from [audience] — one clear ask."

## Editing for Audience Fit

The most common problem with AI-generated stakeholder communications is that they're written for a generic audience, not your specific one. The PM's editing task: replace generic with specific, cut what your audience doesn't need to know, add what AI didn't know about their priorities.`,
          keyTakeaways: [
            'Different stakeholders need different depth, framing, and content — AI makes this tailoring faster',
            'Engineering briefs focus on problem and criteria; executive updates focus on strategy and decisions; sales comms focus on customer benefit',
            'The one-pager prompt structure produces a first draft in minutes — edit for audience specificity',
            'AI defaults to generic audiences — your editing job is to replace generic with specific and add what AI doesn\'t know about your stakeholders',
            'Clear communication reduces meeting overhead and accelerates alignment — AI makes it affordable to do it well',
          ],
          exercise: {
            title: 'One Feature, Three Audiences',
            description:
              'Practice producing audience-specific communications for the same feature for three different stakeholders.',
            steps: [
              'Choose a feature you have recently shipped or are about to ship',
              'Write three AI prompts — one for your engineering lead, one for an executive, one for customers — each specifying what this audience cares about',
              'Generate all three drafts',
              'Compare: how different should the content be? Review each draft for audience appropriateness',
              'Edit the one that needs most work. What specifically did you need to change to make it right for that audience?',
            ],
            tool: 'Claude',
          },
          quiz: [
            {
              question: 'What is the most common problem with AI-generated stakeholder communications?',
              options: [
                'They are too short for most stakeholders',
                'They are written for a generic audience rather than the specific stakeholder\'s priorities and context',
                'They always use too much technical jargon',
                'They focus too much on user benefits',
              ],
              correct: 1,
              explanation:
                'AI produces well-structured communications for a generic professional reader. Your actual stakeholders are not generic: your engineering lead cares about specific constraints; your CEO cares about specific strategic metrics; your customers have specific workflows. Editing AI output for audience specificity — replacing generic language with specific references your audience will recognise — is the PM\'s most important editing task.',
            },
          ],
        },
        {
          id: 'product-m3-l4',
          title: 'Sprint Planning and Execution with AI',
          duration: 15,
          description:
            'Use AI to make sprint planning faster and more consistent — from writing clear tickets to producing sprint retrospective summaries.',
          content: `## AI in the Sprint Cycle

Every sprint cycle involves recurring production tasks: writing tickets, estimating work, running retrospectives, producing sprint summaries. These are time-consuming but follow patterns, making them ideal for AI assistance.

## Writing Better Tickets with AI

Clear tickets reduce back-and-forth between PM and engineering. AI can produce well-structured tickets from brief descriptions:

"Write a Jira user story for the following feature: [describe]. Include: user story format, acceptance criteria (5 items), edge cases to consider, and a definition of done."

Review AI tickets for: accuracy of acceptance criteria, missing edge cases, and over-specification of implementation approach.

## Estimation Support

AI won't estimate engineering effort (it doesn't know your team's velocity or tech stack), but it can help with:
- Generating a story breakdown for a large feature: "Break this epic into individual user stories small enough to fit in one sprint"
- Identifying hidden complexity: "What edge cases, integrations, or technical considerations might a development team encounter when building [feature] that aren't obvious from the user story?"

## Sprint Retrospective Summaries

Paste your retrospective notes into AI and ask it to produce: a structured summary of what went well, what didn't, and action items. This is particularly useful for creating consistent documentation across sprints.

"Summarise this retrospective into: top 3 things that went well (with brief context), top 3 areas for improvement (with the root cause where identified), and action items with owners and deadlines."

## Velocity and Progress Reports

AI can turn raw sprint data (completed stories, incomplete items, blockers) into a readable progress report for stakeholders in minutes. Far faster than writing from scratch and more consistent than notes from memory.`,
          keyTakeaways: [
            'AI produces well-structured tickets from brief descriptions — review for acceptance criteria accuracy and missing edge cases',
            'Use AI to identify hidden complexity and edge cases in features before sprint planning',
            'Retrospective summaries from AI are faster and more consistent than manual documentation',
            'AI cannot estimate engineering effort — that requires team velocity knowledge and technical context',
            'Consistent sprint documentation produced with AI creates institutional memory faster than ad hoc notes',
          ],
          exercise: {
            title: 'AI-Powered Sprint Preparation',
            description:
              'Use AI to prepare a set of sprint tickets and a sprint planning brief faster than your current process.',
            steps: [
              'Choose an upcoming feature or the next sprint\'s planned work',
              'Write brief descriptions (2–3 sentences each) of three to five tickets you need to write',
              'Use Claude to generate full user stories with acceptance criteria for each',
              'Review each ticket: are the acceptance criteria testable? Are edge cases identified? Is implementation over-specified?',
              'Edit one ticket by hand. Note: what did AI miss that required your product knowledge to add?',
            ],
            tool: 'Claude',
          },
          quiz: [
            {
              question: 'What is the most valuable use of AI in sprint ticket writing?',
              options: [
                'Replacing the PM\'s judgment about what should be in the sprint',
                'Producing well-structured first drafts of user stories with acceptance criteria from brief descriptions',
                'Estimating story points based on complexity',
                'Deciding which tickets are highest priority',
              ],
              correct: 1,
              explanation:
                'Writing clear, complete user stories with acceptance criteria is time-consuming but follows a consistent pattern. AI can produce a well-structured first draft from a brief description, which the PM then reviews for accuracy, completeness of edge cases, and appropriate level of implementation detail. This saves significant time per ticket without reducing quality when properly reviewed.',
            },
          ],
        },
      ],
    },
    {
      id: 'product-m4',
      title: 'Building AI Into Your Product',
      description:
        'Understand how AI features work, how to define requirements for AI-powered functionality, and how to evaluate and ship AI features responsibly.',
      lessons: [
        {
          id: 'product-m4-l1',
          title: 'Understanding AI Capabilities for Product Features',
          duration: 20,
          description:
            'Develop the technical literacy you need to make good product decisions about AI features — without becoming an ML engineer.',
          content: `## Why PMs Need AI Technical Literacy

You don't need to build AI systems. But you need enough understanding to: make informed build/buy/partner decisions, write meaningful requirements, evaluate vendor claims, and manage user expectations. This is the PM's AI literacy gap.

## The Core AI Capability Types

**Classification.** AI that categorises inputs into predefined categories. Examples: sentiment analysis (positive/negative/neutral), content moderation (safe/unsafe), document type recognition. Relatively mature, reliable, and trainable on domain-specific data.

**Generation.** AI that produces new content: text, images, code, summaries. Examples: email drafting, product description generation, code completion. Powerful but requires careful output validation.

**Retrieval-Augmented Generation (RAG).** AI that retrieves relevant information from a knowledge base before generating a response. Examples: customer-specific chatbots, internal knowledge assistants. More reliable than pure generation because it grounds responses in real information.

**Recommendation.** AI that suggests next actions or items based on user behaviour patterns. Examples: "You might also like," personalised content feeds, predictive search.

**Extraction.** AI that pulls structured data from unstructured text. Examples: extracting contract dates, invoice data, or customer preferences from emails.

## Questions PMs Should Ask Vendors

- What data does this model need to produce reliable outputs?
- What is the expected accuracy rate, and how is it measured?
- How does the system handle inputs it doesn't recognise?
- How do you prevent hallucination or unsafe outputs?
- What data from our users is used to train or improve the model?
- How do we customise or fine-tune for our specific use case?

## Setting User Expectations for AI Features

AI features have failure modes that traditional software doesn't. Design for them:
- What does the UI show when AI is uncertain?
- How does the user correct an AI error?
- What do users understand about why the AI made its recommendation?`,
          keyTakeaways: [
            'The five AI capability types PMs need to understand: classification, generation, RAG, recommendation, extraction',
            'PM AI literacy enables informed build/buy/partner decisions and meaningful requirements',
            'Always ask vendors about accuracy rates, failure modes, data usage, and customisation options',
            'AI features have different failure modes from traditional software — design the UX to handle them',
            'User trust in AI features depends on appropriate expectation setting and visible error correction',
          ],
          exercise: {
            title: 'AI Feature Audit',
            description:
              'Identify the AI capability type behind your product\'s AI features and assess how well users are prepared for failure modes.',
            steps: [
              'List all AI-powered features in your current product (or a competitor\'s product if you don\'t have AI features yet)',
              'For each feature, identify which capability type it uses: classification, generation, RAG, recommendation, or extraction',
              'For one AI feature, identify: (a) what happens in the UI when the AI is wrong, (b) how users can correct an AI error, (c) whether users understand why the AI made its recommendation',
              'Identify the biggest UX gap you found for AI failure modes',
              'Draft a one-paragraph recommendation for improving that gap',
            ],
            tool: 'Claude',
          },
          quiz: [
            {
              question: 'What distinguishes Retrieval-Augmented Generation (RAG) from standard text generation?',
              options: [
                'RAG is faster than standard generation',
                'RAG grounds responses in retrieved information from a specific knowledge base before generating output',
                'RAG only works for customer service applications',
                'RAG does not require any training data',
              ],
              correct: 1,
              explanation:
                'RAG addresses one of the key weaknesses of pure generation models — hallucination and generic responses — by first retrieving relevant information from a curated knowledge base, then using that retrieved information as context for generation. This makes RAG-based features significantly more reliable for knowledge-specific applications like customer support chatbots or internal knowledge assistants.',
            },
          ],
        },
        {
          id: 'product-m4-l2',
          title: 'Defining Requirements for AI Features',
          duration: 18,
          description:
            'Write AI feature requirements that give engineering and data teams what they need to build reliably — covering data needs, accuracy expectations, failure modes, and user controls.',
          content: `## Why AI PRDs Are Different

Traditional software PRDs define: what the user can do, what the system does in response, and what constitutes done. AI feature PRDs must also define: what data the model needs, what accuracy is acceptable, what happens when the model is wrong, and how users stay in control.

## The Additional Sections of an AI Feature PRD

**Data requirements.** What data does this feature need to function? Where does it come from? Is it available, or does it need to be collected? What are the privacy implications?

**Accuracy and quality thresholds.** What is the minimum acceptable accuracy rate? Who defines what "correct" means? How will accuracy be measured in production? What is the acceptable false positive / false negative rate, and what are the relative consequences of each error type?

**Failure modes and fallbacks.** What happens when the model is uncertain? What happens when no relevant information exists? What is the graceful degradation path? Does the feature fail silently or notify the user?

**User controls.** Can users override, correct, or dismiss AI outputs? How are corrections used to improve the model? How do users understand why the AI made its recommendation?

**Transparency requirements.** Does the user need to know that AI generated this output? If so, how is that surfaced? What information about how the AI works is disclosed?

**Ongoing maintenance.** Who monitors model accuracy in production? How frequently is the model retrained? What is the process for handling performance degradation?

## Worked Example: AI-Generated Email Replies

User story: As a customer success manager, I want AI-suggested reply drafts for incoming customer emails so that I can respond faster.

Additional AI sections:
- Data: customer email history for training/context; requires data classification to exclude PII in training data
- Accuracy: acceptable if CSM edits <30% of words; unacceptable if CSM must rewrite completely
- Failure mode: if confidence is below threshold, show blank compose window (no suggestion) rather than a poor suggestion
- User control: one-click to dismiss suggestion; edited versions logged (with consent) for model improvement
- Transparency: subtle "AI-drafted" label on suggestions; no label on sent email`,
          keyTakeaways: [
            'AI feature PRDs require additional sections: data requirements, accuracy thresholds, failure modes, user controls, and transparency',
            'Define accuracy thresholds before engineering builds — measuring "good enough" requires knowing what good looks like',
            'Failure mode design for AI features is a PM responsibility, not an engineering afterthought',
            'User controls (override, correct, dismiss) are not nice-to-haves — they are trust-building requirements',
            'Ongoing monitoring and maintenance requirements for AI features must be defined before launch',
          ],
          exercise: {
            title: 'AI Feature PRD Section',
            description:
              'Write the AI-specific sections of a PRD for an AI feature in your product.',
            steps: [
              'Choose an AI feature you are planning, have shipped, or would like to build',
              'Draft the five AI-specific PRD sections: data requirements, accuracy thresholds, failure modes and fallbacks, user controls, and transparency requirements',
              'Review each section: is it specific enough for an engineer to implement from? What would be ambiguous?',
              'Identify the one section that would be hardest for your team to implement and write a note on what you\'d need to learn or decide first',
              'Compare your AI PRD sections to a standard PRD you\'ve written — what percentage more content did the AI feature require?',
            ],
            tool: 'Claude',
          },
          quiz: [
            {
              question: 'What is the most important difference between a standard software PRD and an AI feature PRD?',
              options: [
                'AI PRDs must be approved by a data scientist before use',
                'AI PRDs must define accuracy thresholds, failure modes, and user controls in addition to standard functional requirements',
                'AI PRDs are shorter because AI handles more of the implementation detail',
                'AI PRDs do not need success metrics since AI performance is self-optimising',
              ],
              correct: 1,
              explanation:
                'AI features have characteristics that traditional software doesn\'t: probabilistic output quality, failure modes that produce wrong (not just broken) responses, and user trust considerations. A PRD that doesn\'t define acceptable accuracy, failure mode behaviour, and user control mechanisms will produce an AI feature that may technically work but damages user trust and creates ongoing support burden.',
            },
          ],
        },
        {
          id: 'product-m4-l3',
          title: 'Evaluating and Testing AI Features',
          duration: 18,
          description:
            'Design evaluation frameworks and testing approaches for AI features that catch quality problems before they reach users.',
          content: `## Why AI Feature Testing Is Different

Traditional QA tests whether the system does what it should. AI QA tests whether the system does what it should often enough, gracefully handles the cases where it doesn't, and doesn't create new problems (bias, hallucination, safety) that weren't in the requirements.

## The AI Feature Evaluation Framework

**Offline evaluation.** Before deployment, test the model against a held-out dataset of labelled examples. Measure: accuracy, precision, recall (or equivalent metrics for your task type). Establish your pre-launch quality bar here.

**Human evaluation.** For generation tasks (where there is no single correct answer), use human evaluators to rate outputs: is this response helpful? Is it accurate? Is it on-brand? Human evaluation is slow and expensive but irreplaceable for generation quality.

**A/B testing.** Launch the AI feature to a subset of users. Measure the effect on user outcomes (task completion rate, time on task, NPS) rather than just model metrics. What matters is user experience, not just model accuracy.

**Red-teaming.** Actively try to make the feature produce bad outputs: offensive content, incorrect information, privacy violations, adversarial inputs. This is particularly important for generation features.

**Production monitoring.** Define the metrics you will track in production before launch. User override rate, reported error rate, completion rate, and model drift indicators are relevant depending on feature type.

## The PM's Role in AI Feature Testing

PMs are not model evaluators — that is a data science responsibility. The PM's role:
- Define what good looks like (the quality bar) before testing begins
- Participate in human evaluation to calibrate understanding of output quality
- Interpret A/B test results in the context of user outcomes
- Advocate for red-teaming when engineering is focused on accuracy but not edge cases
- Define the production monitoring requirements and review cadence`,
          keyTakeaways: [
            'AI feature testing includes offline evaluation, human evaluation, A/B testing, red-teaming, and production monitoring',
            'The PM defines the quality bar before testing — what counts as good enough to ship?',
            'User outcome metrics (task completion, NPS) matter more than model accuracy metrics alone',
            'Red-teaming is a PM advocacy responsibility — push for it even when engineering is focused on core accuracy',
            'Production monitoring requirements must be defined before launch, not after something breaks',
          ],
          exercise: {
            title: 'AI Feature Evaluation Plan',
            description:
              'Design an evaluation plan for an AI feature covering pre-launch and post-launch quality checks.',
            steps: [
              'Choose an AI feature you are planning to build or have recently shipped',
              'Define the pre-launch quality bar: what accuracy rate is your minimum for launch?',
              'Design a human evaluation rubric: what would evaluators rate the AI outputs on (1–5 scale)? What does a 5 look like? What does a 3 look like?',
              'Identify three adversarial inputs you would use in red-teaming to stress-test the feature',
              'Define two production metrics you would monitor in the first 30 days post-launch',
              'Ask Claude to review your evaluation plan and identify any blind spots',
            ],
            tool: 'Claude',
          },
          quiz: [
            {
              question: 'What is the purpose of red-teaming an AI feature before launch?',
              options: [
                'To evaluate the feature\'s speed and performance under load',
                'To actively try to produce bad, incorrect, or harmful outputs in order to find failure modes before users encounter them',
                'To test whether the feature works correctly on the most common use cases',
                'To measure the feature\'s impact on user retention',
              ],
              correct: 1,
              explanation:
                'Red-teaming deliberately tries to break the AI feature — testing adversarial inputs, edge cases, attempts to generate inappropriate content, or misleading prompts. It surfaces failure modes that don\'t appear in normal testing but will appear in production when users try unexpected inputs. For generation features especially, red-teaming is critical for catching safety and quality issues before launch.',
            },
          ],
        },
        {
          id: 'product-m4-l4',
          title: 'The AI Product Roadmap',
          duration: 15,
          description:
            'Think strategically about AI in your product — building a roadmap that responsibly incorporates AI capabilities in a way that creates lasting user value.',
          content: `## AI as a Product Strategy Question

Adding AI to a product is not a technical decision — it is a product strategy decision. The questions are: Where does AI create user value that justifies its cost and complexity? Where does adding AI create more problems than it solves? How do you sequence AI investments to build capability progressively?

## Where AI Creates Real Product Value

AI creates durable product value when it:
- Reduces user effort for a task they do frequently
- Produces output quality that would otherwise require significant user expertise
- Processes volume that would be impossible for users to handle manually
- Surfaces insights from data that users couldn't derive themselves

AI creates disappointing product value when it:
- Replaces a simple workflow with a complex AI-dependent one
- Produces output that users can't validate or trust
- Adds AI to a problem that a simpler deterministic solution solves equally well
- Builds on data the product doesn't actually have

## The AI Product Roadmap Framework

**Stage 1 — Augmentation.** AI assists users in tasks they already do: drafting, suggestions, summarisation. Low risk, builds user familiarity with AI in your product.

**Stage 2 — Automation.** AI handles tasks autonomously for users who have opted in, with review and override available. Moderate risk, high time savings.

**Stage 3 — Intelligence.** AI surfaces insights, predictions, or recommendations that users couldn't derive themselves. Highest value, requires significant data and model maturity.

Most AI product roadmaps should start at Stage 1 and earn the right to move to Stage 3 by demonstrating quality and building user trust.

## Responsible AI Product Development

Build for:
- **Transparency.** Users understand when AI is involved and why it made a recommendation.
- **User control.** Users can override, correct, or opt out of AI features.
- **Fairness.** AI features perform consistently across user groups; biases in training data are identified and addressed.
- **Privacy.** User data used for AI is subject to appropriate consent and protection.

These aren't just ethical considerations — they are the foundations of user trust, which is the prerequisite for AI feature adoption.`,
          keyTakeaways: [
            'AI product decisions are strategy decisions, not just technical ones — ask where AI creates user value first',
            'The three-stage AI product roadmap: augmentation → automation → intelligence',
            'Start at Stage 1 and earn the right to advance by demonstrating quality and building user trust',
            'Responsible AI product development requires transparency, user control, fairness, and privacy by design',
            'AI that solves a problem a simpler solution could address equally well adds complexity without value',
          ],
          exercise: {
            title: 'AI Product Strategy Assessment',
            description:
              'Map your product\'s AI opportunities and design a responsible AI product roadmap.',
            steps: [
              'List the five most time-consuming or frustrating tasks your users currently perform in your product',
              'For each, assess: (a) what type of AI would help (generation, classification, recommendation, etc.), (b) does your product have the data needed, (c) what AI product stage does this represent?',
              'Identify your Stage 1 (augmentation) opportunity — the AI feature most likely to build user trust with low risk',
              'Draft a three-sentence AI product strategy for your product: where are you now, what will you build first, and what does your longer-term AI vision look like?',
              'Ask Claude to review your strategy and challenge you on: user value, feasibility, and responsible AI considerations',
            ],
            tool: 'Claude',
          },
          quiz: [
            {
              question: 'What is the correct sequencing for an AI product roadmap?',
              options: [
                'Start with full automation to demonstrate AI ambition, then add user controls',
                'Start with augmentation (AI assists users) and progress to automation and intelligence as trust is earned',
                'Start with the most complex AI features to differentiate from competitors quickly',
                'Build all AI stages simultaneously to accelerate time to market',
              ],
              correct: 1,
              explanation:
                'AI product roadmaps should progress from augmentation (AI assists users in existing tasks) through automation (AI handles tasks with oversight) to intelligence (AI surfaces insights users couldn\'t generate themselves). Starting with augmentation builds user familiarity, trust, and feedback loops before you commit to more complex AI features that depend on that trust foundation.',
            },
          ],
        },
      ],
    },
    {
      id: 'product-m5',
      title: 'Growth, Analytics & the AI-Era PM',
      description:
        'Master the growth and analytics skills that define the modern PM — using AI to run smarter experiments, extract sharper insights from data, and build the product-led loops that compound over time.',
      lessons: [
        {
          id: 'product-m5-l1',
          title: 'AI for Growth Experimentation',
          duration: 16,
          description:
            'Use AI to generate stronger A/B test hypotheses, design experiments more rigorously, and extract clearer conclusions from experiment results.',
          content: `## The Experimentation Problem

Most product teams run fewer experiments than they should and draw weaker conclusions than they could. The constraint is rarely data — it's the time cost of hypothesis generation, test design, and results analysis. AI compresses all three.

## Generating Better Hypotheses with AI

The quality of an experiment depends entirely on the quality of the hypothesis it tests. Weak hypotheses produce technically valid results that don't inform decisions. AI accelerates the hypothesis generation step so you start with a richer, more considered set.

Prompt pattern: "I'm trying to improve [metric] for [user segment] in [product area]. Generate 10 A/B test hypotheses. For each, specify: what changes, what behaviour we expect to change, why, and what we'd need to see to call it a win."

Review AI's hypotheses critically: which are genuinely testable in your product? Which assumptions are they making? Which align with your current understanding of user behaviour? Select and refine, don't accept wholesale.

**Prioritising the hypothesis backlog.** Once you have a pool of hypotheses, AI can apply prioritisation frameworks: "Score each hypothesis against: expected impact on [metric], ease of implementation, confidence in the mechanism, and risk of negative side effects."

## Experiment Design with AI

Beyond the hypothesis, experiment design involves sample size, duration, success metrics, and guardrail metrics. AI can help you think through these systematically.

"I want to test [hypothesis]. My current [metric] is [X] and I want to detect a [Y%] improvement. Help me think through: minimum detectable effect, required sample size (assume [Z] daily users), duration, primary metric, and two guardrail metrics I should watch to avoid inadvertent harm."

AI won't run the statistical calculation — for that you need a power calculator or your data team. But it will surface considerations you might skip when moving quickly.

## Analysing Experiment Results with AI

When a test concludes, AI can help you move from raw numbers to insight faster.

"Here are the results of my A/B test [paste results]. The hypothesis was [X]. Help me interpret these results: is the finding statistically significant? What are the alternative explanations for this outcome? What does this tell us about user behaviour beyond the tested metric? What should we test next based on these results?"

The last question is often missed: experiment results always imply the next question. AI can make this follow-up thinking more systematic.

## What AI Cannot Do in Experimentation

AI can help design and analyse experiments. It cannot tell you which hypothesis will win — that's what experiments are for. And it cannot tell you whether a statistically significant result is practically significant for your business. A 0.3% improvement in conversion may be statistically real and commercially irrelevant. That judgment belongs to you.`,
          keyTakeaways: [
            'AI accelerates hypothesis generation — use it to build a richer pool of testable ideas, then apply judgment to select and refine',
            'Experiment design prompts surface sample size, duration, and guardrail metric considerations you might skip under time pressure',
            'Use AI to move from raw results to insight: ask for alternative explanations and implications beyond the primary metric',
            'Statistically significant and practically significant are different — AI can help with the former, you decide the latter',
            'Always ask AI what the experiment results imply for the next test — systematic learning compounds over time',
          ],
          exercise: {
            title: 'Hypothesis Generation Sprint',
            description:
              'Use AI to generate and evaluate a set of A/B test hypotheses for a current product metric you want to improve.',
            steps: [
              'Choose one product metric you want to improve (activation rate, feature adoption, conversion from free to paid, etc.)',
              'Use the hypothesis generation prompt to produce 10 hypotheses targeting that metric',
              'Score each hypothesis on: testability in your product today, confidence in the mechanism, and expected impact',
              'Select your top three hypotheses and ask Claude to draft an experiment design brief for the highest-priority one',
              'Identify the guardrail metrics you would track to ensure the experiment doesn\'t improve one metric at the cost of another',
            ],
            tool: 'Claude',
          },
          quiz: [
            {
              question: 'What is the most common weakness in A/B test hypotheses that AI can help address?',
              options: [
                'Hypotheses that are too specific about what will change',
                'Hypotheses that describe what will change without stating why — missing the causal mechanism',
                'Hypotheses that focus on user behaviour rather than business metrics',
                'Hypotheses that require too large a sample size to test',
              ],
              correct: 1,
              explanation:
                'A hypothesis without a causal mechanism ("Changing the button colour will increase conversion") provides no learning even if it wins. A strong hypothesis states the cause and the expected behaviour change ("Changing the button colour from grey to blue will increase conversion because the blue colour is more visible and creates stronger affordance in our design system"). If the test wins, you\'ve confirmed the mechanism. If it loses, you\'ve learned something about the mechanism. AI can help you articulate the "why" that turns tests into learning.',
            },
            {
              question: 'What should you always ask after reviewing A/B test results with AI?',
              options: [
                'Whether the AI agrees with your interpretation',
                'What the results imply for the next experiment to run',
                'Whether the test should be rerun with a larger sample',
                'Which team member was responsible for the hypothesis',
              ],
              correct: 1,
              explanation:
                'Every experiment result — whether a win, loss, or inconclusive — generates information about user behaviour. That information implies a follow-up question worth testing. Teams that treat experiments as one-off events miss the compound learning that comes from systematically building on each result. Using AI to identify what each result implies for the next experiment creates a more rigorous learning loop.',
            },
          ],
        },
        {
          id: 'product-m5-l2',
          title: 'Product Metrics and Analytics with AI',
          duration: 18,
          description:
            'Define the right metrics for your product, use AI to interpret data more quickly, and build the habit of distinguishing signal from noise in your analytics.',
          content: `## The Metric Definition Problem

Most products are over-measured and under-understood. Teams track dozens of metrics and act confidently on movements that are noise. The PM's job is not to track everything — it is to identify the handful of metrics that genuinely predict the outcomes that matter, and to understand what they're telling you.

## Defining the Right Metrics with AI

Before you can interpret data, you need to be confident you're measuring the right things. AI can stress-test your metric framework.

"Here is our current product metric set [list your metrics]. We are trying to [describe your strategic goal]. Identify: (a) which of these metrics are leading indicators of our goal, (b) which are lagging indicators or vanity metrics, (c) what important signal is missing."

The output will challenge your current framework. Some metrics you track religiously may not correlate with outcomes you care about. Some signals you're missing may be your strongest predictors.

**Input vs. output metrics.** Output metrics (revenue, churn rate) tell you what happened. Input metrics (feature adoption, onboarding completion, weekly active users by segment) tell you what's about to happen. Great PM measurement systems are built on input metrics that reliably predict output metrics. AI can help you map your inputs to their output effects.

## AI-Assisted Data Interpretation

When product metrics move, PMs need to ask: why did this change? This is harder than it looks. Changes have multiple possible explanations, and picking the wrong one produces the wrong intervention.

Use AI as a thinking partner when a metric changes unexpectedly: "My [metric] dropped [X%] over [time period]. Here is what I know about the context: [product changes, marketing changes, seasonal factors, new competitors]. Help me generate the five most plausible explanations for this drop and the data I would need to rule each one in or out."

This forces systematic hypothesis generation before you act, rather than latching onto the first explanation that comes to mind.

## Avoiding Metric Obsession

The failure mode of data-driven culture is optimising for metrics at the expense of the user experience that produces them. AI can help you think through second-order effects: "We're considering [optimisation]. This would improve [metric A]. What user experience or product quality tradeoffs might this create that wouldn't show up in [metric A] but could affect [metric B] over time?"

## Building a Metrics Dashboard Brief

AI can help you design better dashboards — not by building them, but by specifying what they should show and why. "Design a product metrics dashboard for a [product type] PM. Include: one north star metric, three input metrics that predict it, two guardrail metrics to watch for unintended effects, and the review cadence recommended for each."`,
          keyTakeaways: [
            'Distinguish leading input metrics (what\'s about to happen) from lagging output metrics (what happened) — build your system on inputs',
            'Use AI to stress-test your metric framework: identify vanity metrics, missing signals, and disconnected measures',
            'When a metric moves unexpectedly, generate multiple explanations before acting — AI can help structure this systematically',
            'Metric obsession is a real failure mode — AI can help you think through second-order effects of optimising any single metric',
            'A north star metric plus three to five input metrics is a more actionable framework than a 20-metric dashboard',
          ],
          exercise: {
            title: 'Metrics Framework Audit',
            description:
              'Audit your current product metrics framework using AI to identify vanity metrics, missing signals, and disconnected measures.',
            steps: [
              'List every metric you currently track in your product analytics or CS reviews',
              'Ask Claude to categorise each metric as: leading input indicator, lagging output indicator, or vanity metric — explain the reasoning',
              'Identify your north star metric (if you have one) and ask AI to identify which of your input metrics most strongly predict movement in that north star',
              'Identify the most important metric you are NOT currently tracking based on AI\'s analysis',
              'Design a simplified dashboard of no more than six metrics — one north star, three inputs, two guardrails — and ask Claude to review the logic',
            ],
            tool: 'Claude',
          },
          quiz: [
            {
              question: 'What is the difference between an input metric and an output metric in product management?',
              options: [
                'Input metrics are measured daily; output metrics are measured monthly',
                'Input metrics measure what users do (leading indicators of future outcomes); output metrics measure what resulted (lagging indicators of past behaviour)',
                'Input metrics come from product data; output metrics come from financial data',
                'Input metrics are more important than output metrics for all products',
              ],
              correct: 1,
              explanation:
                'Output metrics like revenue and churn rate tell you what happened — they\'re lagging indicators you can\'t directly influence today. Input metrics like feature adoption rate, time to first value, and weekly active users by cohort tell you what\'s about to happen — they\'re leading indicators you can influence through product decisions. Building a measurement system primarily on input metrics that reliably predict output outcomes gives PMs earlier warning and more actionable signals.',
            },
            {
              question: 'What is the first step when a key product metric drops unexpectedly?',
              options: [
                'Immediately roll back the most recent product change',
                'Generate multiple plausible explanations and identify the data needed to distinguish between them before acting',
                'Alert stakeholders and schedule an emergency meeting',
                'Ask AI to identify the root cause directly',
              ],
              correct: 1,
              explanation:
                'Acting on the first plausible explanation for a metric drop is a common mistake. A conversion rate drop could be caused by a product change, a marketing traffic shift, a seasonal effect, or a competitor action — each requiring a completely different response. Generating multiple hypotheses and identifying which data would distinguish between them before acting produces better decisions and avoids expensive false starts.',
            },
          ],
        },
        {
          id: 'product-m5-l3',
          title: 'Product-Led Growth and AI',
          duration: 14,
          description:
            'Apply AI to the core PLG challenges: designing onboarding that activates users faster, identifying the signals that predict expansion, and finding the loops that drive viral and usage-based growth.',
          content: `## PLG and the PM's Role

Product-led growth (PLG) shifts the acquisition and expansion engine from sales-led to product-led. In a PLG model, the product itself acquires, activates, retains, and expands users. The PM's job is to design and optimise the product loops that make this happen. AI accelerates the analysis that tells you which loops are working and which aren't.

## Designing PLG Loops with AI

A PLG loop is a cycle where one set of user actions leads to more users or more usage. AI is useful for identifying loops you might not have considered.

"I am building a [product type] with a freemium model. Help me map five potential PLG growth loops — each as a circular diagram in text: [action] → [outcome] → [next action]. For each loop, identify the activation event that starts it and the metric that would tell me it's working."

The loops AI generates will vary in quality — some obvious, some genuinely novel. Your job is to evaluate which loops your product currently enables and which require new product investments.

## Onboarding Optimisation with AI

In PLG, the onboarding experience is the most critical part of the product. AI can help you analyse and improve it systematically.

**Activation milestone identification.** "Here are our user cohorts and their 30-day and 90-day retention rates [paste or describe data patterns]. Which actions in week one are most correlated with long-term retention? What does this suggest our activation milestone should be?"

**Onboarding friction analysis.** "Here is our current onboarding flow [describe each step]. Identify the steps most likely to cause users to drop off and suggest: what could be simplified, deferred, or removed entirely."

**Time-to-value optimisation.** The metric that drives PLG is not activation rate — it's time-to-first-value. AI can help you design onboarding paths that reach the specific moment of value for each user type as fast as possible.

## Expansion Signal Detection

In PLG, expansion typically happens at natural usage thresholds: a team hitting a seat limit, a user adopting a feature that correlates with paid conversion, a company growing its footprint beyond the free tier.

"Here is our product usage data schema [describe your data]. What signals in this data would suggest a free user is ready to convert to paid, or that a paying team is ready to expand their account? Design a scoring model using these signals."

AI can't run the data analysis — your analytics team does that. But it can help you design the signal model before you ask them to build it.

## The Virality Loop

For products with sharing or collaboration mechanics, AI can help you map and optimise viral loops: "A user invites a colleague. The colleague [action]. The original user sees [outcome]. This should loop because [mechanism]. Where in this loop does friction break the cycle and what would fix it?"`,
          keyTakeaways: [
            'PLG loops are cycles where user actions produce more users or usage — map yours explicitly before trying to optimise them',
            'Time-to-first-value is the PLG metric that drives everything — optimise onboarding for speed to the specific value moment',
            'Activation milestones should be derived from retention correlation, not intuition — AI can help you design the analysis',
            'Expansion signals in PLG are usage-based; identify them before building the data model so you know what to measure',
            'Onboarding optimisation is iterative — AI can help generate friction hypotheses, but user data validates them',
          ],
          exercise: {
            title: 'PLG Loop Mapping',
            description:
              'Map your product\'s PLG growth loops and identify the highest-leverage intervention to strengthen the activation loop.',
            steps: [
              'Describe your product\'s model to Claude: what users do, how they get value, whether they share or collaborate, and what the upgrade trigger is',
              'Ask Claude to map three to five growth loops your product could support in the circular action → outcome → action format',
              'For each loop, identify: the activation event, the current metric measuring it, and where the loop most likely breaks',
              'Choose the activation loop (free user to first value moment) and ask Claude to suggest three specific onboarding changes that could accelerate time-to-value',
              'For one suggested change, design a simple A/B test to validate whether it works',
            ],
            tool: 'Claude',
          },
          quiz: [
            {
              question: 'What is the most important metric in a product-led growth model?',
              options: [
                'Monthly recurring revenue growth rate',
                'Time-to-first-value — how quickly a new user reaches the moment that demonstrates the product\'s core value',
                'Total number of free sign-ups per month',
                'Average revenue per user',
              ],
              correct: 1,
              explanation:
                'In PLG, the product must convince users of its value before they are willing to pay or refer others. The faster users reach the specific moment of value — sending their first report, completing their first workflow, seeing meaningful output — the higher the conversion and retention rates. All onboarding optimisation in PLG should be measured against time-to-first-value because it is the most direct predictor of paid conversion and long-term retention.',
            },
            {
              question: 'How does AI most usefully contribute to PLG loop design?',
              options: [
                'By running the usage correlation analysis that identifies activation milestones',
                'By helping map potential loops and design signal models before the data team builds them',
                'By automatically optimising onboarding flows without PM input',
                'By generating acquisition campaigns for free tier growth',
              ],
              correct: 1,
              explanation:
                'AI contributes most in the design and framing stages of PLG work: mapping growth loops the PM might not have considered, designing signal models for expansion detection before engaging the data team, and generating hypotheses about where loops break. The actual analysis requires data infrastructure and analytical skills that go beyond AI — but arriving at that analysis with a clear model to test produces better and faster results.',
            },
          ],
        },
        {
          id: 'product-m5-l4',
          title: 'The AI-Era Product Manager Career',
          duration: 18,
          description:
            'Understand how AI is reshaping the PM role, which skills compound in value as AI handles more, and how to build a career that leads rather than follows the changes ahead.',
          content: `## What Changes for PMs

AI is changing what product management work looks like. The PMs who are thriving are not the ones who do more of the same work faster. They're the ones who've shifted the composition of their work — spending less time on production and more time on judgment, user proximity, and strategic framing.

This shift is an opportunity, not a threat. The aspects of the PM role that AI cannot replicate — judgment, user insight, strategic context, stakeholder relationships — are also the aspects that the best PMs are most valued for.

## How AI Changes PM Seniority

One of the more interesting effects of AI is how it shifts the expected output at every career level. Junior PMs who use AI well can produce work that was previously expected of seniors: comprehensive PRDs, structured research synthesis, thorough competitive analysis. This raises the baseline — but it also means that senior PM differentiation increasingly comes from judgment, context, and leadership rather than production quality.

If you're a senior PM, AI raises the floor of your team. If you're a junior PM, AI gives you more capacity to demonstrate judgment earlier. In both cases, the differentiator becomes the quality of your thinking, not the speed of your drafting.

## Skills That Compound in an AI Era

**User proximity and empathy.** AI cannot spend time with users, interpret their silences, or feel the friction in the product experience. PMs who maintain genuine user proximity — not through synthesis, but through time — will have insights no AI workflow can generate.

**Strategic context.** Understanding why your company is making the decisions it is, what the CEO is genuinely worried about, which trade-offs reflect actual strategic conviction — this is not in any document. It's built through relationships and attention. AI doesn't have access to it.

**Systems thinking.** AI is good at analysis in pieces. The PM who sees how a feature decision affects the business model, the competitive positioning, the engineering org, and the customer segment simultaneously has a capability that compounds with experience.

**Taste.** Knowing which of ten AI-generated options is actually good — in the context of your product, your users, your strategy — is a judgment that requires deep product knowledge. This is irreplaceable and increasingly visible when everyone has access to the same generation tools.

## Staying Ahead of the Curve

The risk is not that AI replaces PMs. The risk is that PMs who don't engage with AI are replaced by PMs who do. The practical response:

**Build AI fluency as a continuous practice, not a one-time course.** The tools are changing every six months. Build the habit of trying new capabilities, not just the ability to use current tools.

**Develop a point of view on AI in your product category.** The PMs who lead are those who understand what AI means for their specific market — which features will commoditise, where the new competitive moats are, how user expectations are shifting.

**Use AI to do better work, not just faster work.** The PMs who build career capital are those who use AI to analyse more hypotheses, synthesise more user research, and pressure-test more decisions — not those who use it to produce faster-but-similar outputs.`,
          keyTakeaways: [
            'AI raises the production baseline at every career level — differentiation increasingly comes from judgment, not output quality',
            'User proximity, strategic context, systems thinking, and product taste are the PM skills that compound in an AI era',
            'Junior PMs gain capacity to demonstrate judgment earlier; senior PMs raise the floor of their teams',
            'Build AI fluency as a continuous practice — the tools change every six months and staying current compounds over time',
            'Use AI to do better work (more hypotheses, deeper synthesis, more rigorous pressure-testing), not just faster work',
          ],
          exercise: {
            title: 'Personal AI PM Development Plan',
            description:
              'Design a 90-day plan for developing the AI-era PM skills that will differentiate your career.',
            steps: [
              'Assess honestly: which of the four compounding skills (user proximity, strategic context, systems thinking, product taste) is currently your weakest?',
              'For that skill, identify one specific habit or practice you could build over the next 90 days to strengthen it',
              'Audit your current AI usage: are you using AI to do faster work, or to do better work? What would "better work" look like for your three most important current responsibilities?',
              'Ask Claude: "Based on a PM role focused on [your product type and stage], what AI capabilities are most underused by PMs in this context that could create significant leverage?"',
              'Write a three-sentence statement of your AI-era PM positioning that you could use in a performance review, a hiring conversation, or a job application',
            ],
            tool: 'Claude',
          },
          quiz: [
            {
              question: 'How does AI change the differentiation between junior and senior PMs?',
              options: [
                'AI makes junior PMs obsolete because senior PMs can produce more with AI',
                'AI raises the production baseline — junior PMs can produce senior-quality documents, so senior differentiation shifts further toward judgment, context, and leadership',
                'AI has no effect on PM seniority because judgment cannot be replicated',
                'AI makes senior PM skills less relevant because production quality becomes the new differentiator',
              ],
              correct: 1,
              explanation:
                'When AI enables junior PMs to produce comprehensive PRDs, structured research, and thorough competitive analyses, the gap between junior and senior outputs on production tasks narrows. This is good for junior PMs — they can demonstrate higher-level thinking earlier. And it makes senior PM differentiation more clearly about the things that can\'t be produced: judgment about which problems to solve, strategic context about why the company is making the bets it is, and the quality of thinking that turns good tools into great products.',
            },
            {
              question: 'What does "using AI to do better work" mean for a PM, as opposed to just faster work?',
              options: [
                'Producing the same outputs more quickly and using the saved time for breaks',
                'Using AI to test more hypotheses, synthesise more user research, and pressure-test more decisions than would be possible without AI',
                'Delegating all documentation to AI so PMs focus only on meetings',
                'Using the highest-cost AI models to ensure maximum quality',
              ],
              correct: 1,
              explanation:
                '"Faster work" means using AI to produce the same PRDs, research summaries, and analyses you already produce, but in less time. "Better work" means using the time AI saves to do things you previously couldn\'t afford: testing ten growth hypotheses instead of two, synthesising 30 user interviews instead of five, pressure-testing a recommendation from six stakeholder perspectives instead of one. The PMs who build the most career capital are those who use AI to expand the scope of their thinking, not just the speed of their drafting.',
            },
          ],
        },
      ],
    },
  ],
}
