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
          inlineCheck: {
            question: 'A PM wants to use AI to help with quarterly roadmap prioritisation. What should they expect AI to contribute?',
            options: [
              'A fully ranked roadmap based on user impact — no PM input required',
              'Structured analysis of frameworks like RICE using the PM\'s inputs, plus stress-testing from multiple stakeholder angles',
              'A final prioritisation decision that accounts for company strategy and resource constraints',
              'Real-time data on which features will generate the most revenue',
            ],
            correct: 1,
            explanation: 'AI cannot make prioritisation decisions — it lacks your strategy, resource constraints, and organisational context. What it can do is apply frameworks rigorously to your inputs and surface objections from different stakeholder perspectives you might not have considered. The decision and the inputs are yours; AI structures and stress-tests the thinking.',
          },
          outputComparison: {
            label: 'PM AI task mapping: vague curiosity vs. structured workflow analysis',
            vague: {
              prompt: 'How can I use AI as a product manager?',
              output: 'As a product manager, you can use AI in many ways. AI can help with writing documents, doing research, and analysing data. You can use tools like ChatGPT or Claude to assist with your daily tasks. AI is great for brainstorming ideas and getting things done faster. Consider using AI for your PRDs, user stories, and meeting summaries.',
            },
            improved: {
              prompt: 'I\'m a PM at a 150-person B2B SaaS company. My most time-consuming recurring tasks are: synthesising user interview notes (3-4 hrs/week), writing first-draft PRDs (2-3 hrs/feature), drafting stakeholder update emails (1 hr/week), and updating our competitive tracker (2 hrs/month). For each task, tell me: (a) where AI adds the most leverage, (b) what I need to supply that AI can\'t, and (c) one specific prompt pattern to start with.',
              output: 'User interview synthesis (3-4 hrs → ~45 min with AI)\n(a) AI excels at pattern extraction across multiple transcripts — identifying recurring themes, clustering sentiments, and surfacing representative quotes.\n(b) You need to supply: the research objective, your existing hypotheses, and the strategic lens. AI doesn\'t know what surprising = significant for your product.\n(c) Prompt: "Here are transcripts from [N] user interviews about [topic]. Identify the 5 most recurring themes. For each: one-sentence description, 2 representative quotes, and whether this confirms or challenges the hypothesis that [your hypothesis]."\n\nPRD first drafts (2-3 hrs → ~30 min)\n(a) AI eliminates the blank page and produces a structurally complete draft from your bullet notes.\n(b) You need to supply: the specific user evidence, your actual success metrics (not placeholders), and strategic alignment with your current quarter\'s priorities.\n(c) Prompt: "Draft a PRD for [feature] using these notes: User=[who], Problem=[what, evidenced by], Solution=[high-level], Metrics=[how we\'ll measure], Non-goals=[explicitly not], Constraints=[tech/time/resource]."',
            },
            insight: 'The vague prompt returns a generic list that any PM has read a dozen times — it doesn\'t connect to actual tasks or tell you what to do on Monday. The specific prompt anchors AI to your real workflow, generates task-specific leverage analysis, and ends with a prompt template you can use immediately. The key upgrade was replacing "how can I use AI?" with a structured description of actual tasks and a request for specific, actionable guidance for each.',
          },
          applyThisWeek: {
            action: 'List your five most time-consuming recurring PM tasks. For each, score it on: how much of it is drafting/synthesis vs. judgment (1-5), and how bad an error would be (1-5). Your top AI candidate is the one with the highest drafting score and the lowest error-consequence score. Use AI for it this week and note what you had to edit.',
            promptTemplate: 'I\'m a PM working on [product type] at a [company size/stage] company. My most time-consuming tasks this week are: [list 3-5 tasks]. For each task, tell me: (a) where AI can add the most leverage, (b) what I need to supply that AI can\'t know, and (c) one specific prompt to start with.',
            tool: 'Claude',
          },
          reflection: 'Think about the last time you spent more than two hours on a single PM task. How much of that time was generating ideas or drafting versus making actual decisions? What would you have done with that time if the drafting had taken 20 minutes instead?',
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
          inlineCheck: {
            question: 'Your organisation has ChatGPT Enterprise approved. You\'ve been using Claude personally. A new research synthesis tool also looks useful. What should you do?',
            options: [
              'Use all three tools simultaneously for different tasks to maximise coverage',
              'Start with the approved enterprise tool and build fluency before evaluating whether additional tools are genuinely needed',
              'Switch to the new research synthesis tool immediately since it\'s purpose-built for PM work',
              'Ignore the approved tool and continue with your personal preference regardless of organisational context',
            ],
            correct: 1,
            explanation: 'Tool proliferation is a real productivity trap — each additional tool requires onboarding time, context-switching cost, and approval overhead. Starting with what\'s already approved and available avoids data governance issues and builds fluency faster. Once you\'ve exhausted what the approved tool can do, then evaluate additions based on specific gaps, not general interest.',
          },
          outputComparison: {
            label: 'AI tool strategy: impulse adoption vs. deliberate stack building',
            vague: {
              prompt: 'What are the best AI tools for product managers in 2024?',
              output: 'Here are the best AI tools for product managers:\n1. ChatGPT - Great for writing and brainstorming\n2. Midjourney - For creating visual mockups\n3. Notion AI - For documentation\n4. GitHub Copilot - For working with engineers\n5. Zapier AI - For automation\n6. Otter.ai - For meeting transcription\n7. Jasper - For content creation\nThese tools will help you be more productive and efficient in your PM role.',
            },
            improved: {
              prompt: 'I\'m a PM at a B2B SaaS company. We already have Notion and Jira approved, and our company just rolled out ChatGPT Enterprise. My main unmet needs are: (1) synthesising qualitative user research faster, (2) getting better competitive intelligence without manual tracking, (3) writing sharper tickets. Given my existing stack, tell me: what can I do right now with what I already have, what specific gap would justify adding a new tool, and what\'s the one tool worth evaluating if I have that gap?',
              output: 'What you can do right now with your existing stack:\n\nChatGPT Enterprise for research synthesis: Paste 5-10 interview transcripts and prompt it to extract the 5 recurring themes with representative quotes. For competitive intelligence, ask it to analyse a competitor\'s G2 reviews (paste 20-30) and produce a structured breakdown of strengths, weaknesses, and switching reasons. For ticket writing, give it a 2-sentence feature description and ask for a user story with 5 acceptance criteria.\n\nNotion AI: Use it to summarise long research documents, generate first-draft status updates, and maintain a living competitor tracker with AI-assisted updates.\n\nThe gap worth a new tool: If you\'re doing 10+ user interviews per quarter and spending >2 hours per study on synthesis and tagging, that\'s the gap that justifies evaluating Dovetail — it\'s purpose-built for qualitative tagging, theme extraction, and connecting insights to features.\n\nDon\'t add Otter, Jasper, or Midjourney — ChatGPT Enterprise covers transcription summaries, writing, and you don\'t need image generation for core PM work.',
            },
            insight: 'The vague prompt returns a generic tool list that ignores what the PM already has and creates tool proliferation pressure. The specific prompt anchors the answer to the existing stack, identifies what\'s achievable immediately, and sets a clear threshold for when a new tool is actually justified. The upgrade was providing context about current tools and specific unmet needs — which turns a shopping list into a decision framework.',
          },
          applyThisWeek: {
            action: 'Audit your current AI tool usage: list every AI tool you\'ve opened in the last two weeks. For each, write one sentence on the specific PM task it helps with. Identify any tools with overlapping use cases, then pick the one to stop using. Build fluency in the remaining tools by using each for a specific task this week.',
            promptTemplate: 'I\'m a PM with access to [list your approved AI tools]. My main unmet needs are: [describe 2-3 specific PM tasks where you want more leverage]. Given my current stack, tell me: what can I accomplish right now without adding new tools, and what specific gap would justify a new tool addition?',
            tool: 'ChatGPT or Claude',
          },
          reflection: 'How many AI tools have you tried in the last six months? Of those, how many are still in your regular workflow? What does that ratio tell you about your tool adoption strategy?',
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
          inlineCheck: {
            question: 'You ask AI to write a PRD for a new feature. What should you provide for the most useful output?',
            options: [
              'Just the feature name — AI can determine the requirements from context',
              'The problem you\'re solving, the user segment, success metrics, and any constraints',
              'A list of features competitors have — so AI can benchmark appropriately',
              'Your engineering team\'s capacity — so AI can scope correctly',
            ],
            correct: 1,
            explanation: 'AI cannot know your users, their problems, or your business context unless you provide it. A good PRD starts with a well-defined problem and user segment. Without that foundation, AI produces a generic template rather than a document that actually guides your team.',
          },
          outputComparison: {
            label: 'User story: vague vs. outcome-driven — the difference in quality',
            vague: {
              prompt: 'Write user stories for a notification feature',
              output: 'User Story 1: As a user, I want to receive notifications so that I can stay informed.\nUser Story 2: As a user, I want to customise my notification settings so that I can control what I receive.\nUser Story 3: As a user, I want to see a notification history so that I can review past notifications.',
            },
            improved: {
              prompt: 'Write 3 user stories for the notification centre feature in our B2B project management tool. The core problem: team leads miss critical blocker updates because they\'re buried in Slack. Primary user: team leads at 20-100 person software companies. Each story should follow the format: As [specific user], I want [specific action] so that [measurable outcome]. Include one acceptance criterion per story. Prioritise: (1) in-app alert for blockers, (2) digest email for daily summary, (3) snooze/mute for non-critical items.',
              output: 'Story 1 (P1 — Blocker Alert)\nAs a team lead responsible for sprint delivery, I want to receive an in-app alert within 5 minutes when a task is marked as blocked, so that I can unblock my team before it impacts the sprint.\nAC: Alert appears in notification bell with the task name, blocker description, and a direct link. Dismissed once lead clicks through.\n\nStory 2 (P2 — Daily Digest)\nAs a team lead managing 3+ projects, I want a daily 8am email summarising overnight status changes (new blockers, completed tasks, overdue items), so that I can start each day with full situational awareness without opening the app.\nAC: Email sent at 8am local time. Includes only projects where lead has member role. Configurable off per project.\n\nStory 3 (P3 — Snooze)\nAs a team lead in deep-focus work, I want to snooze all non-critical notifications for up to 4 hours, so that I can concentrate without disabling alerts entirely.\nAC: Snooze button in notification centre. Blocker alerts override snooze. Snooze expires automatically.',
            },
            insight: 'The vague prompt produces placeholder stories that any PM has seen a hundred times — they describe a feature category, not a user problem. The specific version defines who exactly the user is, what problem they have, and what measurable outcome they need. That context is what turns a template into a document a designer and engineer can actually build from.',
          },
          applyThisWeek: {
            action: 'Take one feature you\'re currently scoping or have recently shipped. Use AI to write the user stories or rewrite existing ones with specific acceptance criteria. Then review them with an engineer and note where the AI output needed the most correction.',
            promptTemplate: 'Write [N] user stories for [feature name] in [product type]. The core problem: [describe the user pain]. Primary user: [specific role at specific company type]. Format: As [user], I want [action] so that [outcome]. Include 1-2 acceptance criteria per story. Prioritise by: [your priority order].',
            tool: 'Claude',
          },
          reflection: 'Think about the last feature that shipped differently than the PRD described. At which point did the misalignment happen — writing the requirements, sharing them with the team, or during implementation? Where could clearer AI-assisted documentation have helped?',
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
          inlineCheck: {
            question: 'You generate a PRD with AI and it looks complete and professional. Before sharing it with your engineering lead, what is the most critical review step?',
            options: [
              'Check for spelling and grammar errors throughout the document',
              'Verify that the success metrics, user descriptions, and strategic framing reflect your actual product context — not generic placeholders',
              'Ensure the document is at least 1,000 words to demonstrate thoroughness',
              'Add a table of contents so engineering can navigate easily',
            ],
            correct: 1,
            explanation: 'AI produces documents that look professional but fill them with generic content — placeholder metrics like "increase retention by X%", generic personas like "busy professionals", and strategic language that could apply to any product. The PM\'s critical editing task is replacing that generic content with specific user evidence, actual business metrics, and strategy that reflects what your team decided last week. If you share the AI draft without this step, engineering will build to the wrong problem.',
          },
          outputComparison: {
            label: 'AI PRD quality review: generic vs. strategically grounded',
            vague: {
              prompt: 'Write a PRD for an in-app search feature for our SaaS product',
              output: 'PRD: In-App Search Feature\n\nBackground: Users need to find content quickly within the application. Search is a critical feature for any modern SaaS product.\n\nProblem Statement: Users are unable to find the information they need efficiently, leading to frustration and reduced productivity.\n\nGoals: Improve user experience, increase user satisfaction, reduce time to find content.\n\nSuccess Metrics: Increase search usage by 20%, improve user satisfaction score by 10%, reduce support tickets related to content discovery by 15%.\n\nUser Stories:\n- As a user, I want to search for content so that I can find what I need quickly.\n- As a user, I want to filter search results so that I can narrow down options.',
            },
            improved: {
              prompt: 'Write a PRD for an in-app search feature. Here are my notes:\n- User: Operations managers at our mid-market B2B logistics customers (50-500 employees)\n- Problem: They can\'t find historical shipment records during client calls — current workaround is exporting to Excel and using Ctrl+F, which our CS team tells us triggers 30% of "I can\'t find it" support tickets\n- Solution: Full-text search across shipment records, BOL documents, and delivery notes from the last 24 months\n- Success metrics: Reduce "content discovery" support ticket category by 40% in 60 days; search feature adoption by 60% of operations users in first 30 days\n- Non-goals: We are NOT indexing financial documents (SOX compliance risk, separate initiative Q3)\n- Constraints: Must not require backend reindexing of data older than 24 months; launch before Q2 customer advisory board',
              output: 'PRD: In-App Search — Shipment Record Discovery\n\nBackground: Operations managers at mid-market logistics customers spend significant time during client calls trying to locate historical shipment records. The current workaround — exporting to Excel and using Ctrl+F — is cited as the trigger for approximately 30% of "I can\'t find it" support tickets logged with our CS team.\n\nProblem Statement: Operations managers cannot retrieve specific shipment records, BOL documents, or delivery notes quickly enough during time-sensitive client conversations, forcing manual workarounds that reduce trust and increase support burden.\n\nGoals:\n- Reduce "content discovery" support ticket category by 40% within 60 days of launch\n- Achieve 60% adoption among operations users within first 30 days\n\nNon-Goals (explicitly out of scope):\n- Financial document indexing (SOX compliance review required — tracked as separate Q3 initiative)\n- Reindexing records older than 24 months\n\nUser Stories:\n1. As an operations manager on a client call, I want to search by shipment ID, customer name, or BOL number so that I can pull up the relevant record in under 10 seconds without leaving the screen.\nAC: Search results appear within 3 seconds. Matches are highlighted in results.',
            },
            insight: 'The vague prompt produces a structurally passable PRD that could describe any search feature in any SaaS product — the metrics are made-up placeholders and the problem statement has no evidence. The specific version uses real business context (30% of support tickets, compliance constraints, customer advisory board deadline) that makes the document immediately actionable. Engineering can build to this because it describes a real problem for a specific user in a specific situation.',
          },
          applyThisWeek: {
            action: 'Take an AI-generated document you\'ve produced recently (PRD, user story, research synthesis). Apply the four-point quality checklist: strategy alignment, persona specificity, verified claims, and missing context. Count how many sections you need to edit and categorise each type of issue.',
            promptTemplate: 'Review this [PRD section / user story / research insight] I\'ve drafted and identify: (1) any content that is too generic or could apply to any product, (2) any specific claims (metrics, market data, user behaviour) that need verification, (3) what important context is missing that would make this more actionable for [engineering / a stakeholder / design]. Here is the draft: [paste your content].',
            tool: 'Claude',
          },
          reflection: 'When you share a document with your team, how often do they come back with questions that suggest they didn\'t understand the user or the problem? How much of that could be addressed by more specific, evidence-grounded documentation?',
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
          inlineCheck: {
            question: 'You paste 8 user interview transcripts into Claude and ask it to identify recurring themes. The AI returns 6 themes with supporting quotes. What should you do next?',
            options: [
              'Share the themes directly with your team — AI synthesis is reliable enough for immediate use',
              'Review the themes against the source transcripts, add themes the AI missed, and apply your contextual knowledge about why each theme matters strategically',
              'Run the synthesis again with a different prompt to see if the themes change',
              'Reduce the AI output to 3 themes to keep the team focused',
            ],
            correct: 1,
            explanation: 'AI synthesis identifies patterns in stated text reliably — but it doesn\'t know which themes are strategically important for your product, which quotes are most representative, or what users were doing and feeling when they said something. Your review validates accuracy, adds the themes AI under-weighted or missed entirely, and layers in the contextual significance only a researcher who knows the product and the users can provide.',
          },
          outputComparison: {
            label: 'Interview synthesis: unfocused dump vs. structured insight extraction',
            vague: {
              prompt: 'Here are my user interview notes. What did users say?',
              output: 'Based on your interview notes, users mentioned several things:\n- They find the product useful\n- They have some difficulties with navigation\n- They want more features\n- The onboarding could be better\n- They use the product regularly\n- Some users had trouble with the export function\nOverall, users seem to have a mix of positive and negative experiences with your product.',
            },
            improved: {
              prompt: 'Here are notes from 6 user interviews with operations managers at logistics companies who use our shipment tracking product. My research objective was to understand what prevents them from reducing "where is my shipment?" calls from their customers. Identify the 4-5 recurring themes. For each theme: (1) a clear label, (2) a one-sentence description of the underlying user problem, (3) 2 representative quotes, and (4) whether this theme confirms or challenges my hypothesis that the problem is real-time visibility rather than historical record access.',
              output: 'Theme 1: Proactive alert failure\nProblem: Users rely on reactive checking because the product only notifies on delivery, not on delay or exception events.\nQuotes: "I check the portal every hour just in case something\'s gone wrong — there\'s no way to know otherwise." / "My customer called me before I knew their shipment was delayed. That was embarrassing."\nHypothesis check: CONFIRMS — this is a real-time visibility problem, not historical access.\n\nTheme 2: Status language opacity\nProblem: Status labels ("In transit", "Pending") don\'t map to what ops managers need to tell customers, creating a translation step.\nQuotes: "What does \'In transit\' actually mean? Is it moving, is it sitting in a depot?" / "I end up calling the carrier anyway because the portal doesn\'t tell me what I need to say."\nHypothesis check: PARTIALLY CHALLENGES — this is a communication design problem, not just a data availability problem.\n\nTheme 3: Multi-carrier fragmentation\nProblem: Managers with multiple carrier relationships check 3-5 portals; our product only covers one carrier relationship.\n[continues with quotes and hypothesis check]',
            },
            insight: 'The vague prompt produces a list of observations with no structure, no strategic lens, and no connection to the research objective — it\'s barely better than rereading the notes yourself. The specific version uses the research objective and hypothesis as a filter, producing theme labels, user problem descriptions, supporting quotes, and an explicit check on whether each theme validates or challenges the PM\'s existing assumption. That last element is what turns synthesis into a decision input.',
          },
          applyThisWeek: {
            action: 'Take a set of user research you\'ve collected recently (even 3-4 interview notes, or 20 support tickets). Paste them into Claude with your research objective and at least one hypothesis you\'re testing. Ask for themes, quotes, and an explicit hypothesis check. Compare the output to what you would have written manually.',
            promptTemplate: 'Here are [type of research: interview notes / support tickets / survey responses] from [N] [user type]. My research objective was to understand [specific question]. I have a hypothesis that [your hypothesis]. Identify the [4-5] recurring themes. For each theme: (1) a clear label, (2) a one-sentence description of the underlying problem, (3) 2 representative quotes, and (4) whether this confirms or challenges my hypothesis.',
            tool: 'Claude',
          },
          reflection: 'Think about the last time you shared research findings with your team. How confident were you that you\'d captured every important theme from the raw data? What might you have missed because of time pressure, confirmation bias, or the volume of material?',
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
          inlineCheck: {
            question: 'You need competitive intelligence on a rival product before a strategy review next week. What is the most reliable AI-assisted approach?',
            options: [
              'Ask Claude directly: "What are the weaknesses of [competitor]?" and use the output in your presentation',
              'Gather competitor reviews from G2 and their website copy, paste them into AI with a structured analysis prompt, then verify key claims against the actual product',
              'Ask AI to predict the competitor\'s next feature release based on their current trajectory',
              'Use AI to write a competitive teardown entirely from its training data without providing additional source material',
            ],
            correct: 1,
            explanation: 'AI\'s training data has a cutoff date and may contain outdated or inaccurate information about specific competitor products. The reliable approach is to feed AI fresh source material — recent reviews, current website copy, updated documentation — and use AI to structure and analyse that material. Verifying key claims against the actual product before presenting to stakeholders prevents the credibility damage of confidently presenting incorrect competitive information.',
          },
          outputComparison: {
            label: 'Competitor review mining: scattered observations vs. structured competitive intelligence',
            vague: {
              prompt: 'What do people think about Asana?',
              output: 'Asana is a popular project management tool. People generally have positive things to say about it, though there are some criticisms. Users like its visual interface and task management features. Some users find it complex and expensive. It\'s used by many companies for project tracking and team collaboration. The tool has many integrations and is considered a leader in the project management space.',
            },
            improved: {
              prompt: 'I\'m a PM at a B2B project management tool that competes with Asana in the mid-market segment (50-500 employees). Here are 25 G2 reviews from the past 6 months that I\'ve collected [paste reviews]. Analyse these reviews and produce: (1) the top 3 strengths users consistently praise, (2) the top 3 pain points users consistently raise, (3) any mentions of switching from or to competitors and why, (4) what user segments seem most and least satisfied, and (5) any specific features praised or criticised by name. Format this as a competitive intelligence brief.',
              output: 'Competitive Intelligence Brief: Asana (G2, last 6 months, n=25)\n\nTop 3 User-Praised Strengths:\n1. Timeline view (mentioned in 14/25 reviews) — specifically praised by project managers who run multi-team dependencies. Quote: "Timeline is the one thing that keeps our cross-team projects from falling apart."\n2. Automation rules — praised for reducing repetitive task updates; especially valued by ops-heavy teams\n3. Portfolio view — praised by senior PMs and team leads managing multiple projects simultaneously\n\nTop 3 Consistent Pain Points:\n1. Pricing at scale (mentioned in 18/25 reviews) — the jump from Team to Business tier is consistently described as "too steep" for teams under 100 people. Quote: "We\'d use more features but can\'t justify the Business tier for our size."\n2. Mobile experience — 9 reviewers describe mobile as "limited" or "an afterthought"; field teams and remote-first companies disproportionately affected\n3. Reporting — custom report building described as "time-consuming" and requiring admin skills most teams don\'t have\n\nSwitching Patterns:\n- 3 reviews mention switching FROM Monday.com (reason: Asana felt more structured for engineering workflows)\n- 2 reviews mention considering a switch TO Linear (reason: Asana "too heavy" for pure software teams)',
            },
            insight: 'The vague prompt returns a generic summary that could have been written without reading a single review — it tells you nothing actionable. The specific prompt transforms 25 reviews into structured competitive intelligence with specific features mentioned, pricing pain points with supporting quotes, and switching patterns that directly inform competitive positioning. The upgrade was providing source material and asking for analysis, not asking AI to generate impressions from its training data.',
          },
          applyThisWeek: {
            action: 'Pick one direct competitor. Find 15-20 recent reviews on G2, Capterra, or the App Store. Paste them into Claude with a structured competitive analysis prompt. Compare the output to your current internal understanding of this competitor — what surprised you, and what would you update in your competitive positioning as a result?',
            promptTemplate: 'I\'m a PM at [your product type] competing with [competitor] in the [market segment] segment. Here are [N] reviews from [G2 / Capterra / App Store] in the past [timeframe]: [paste reviews]. Analyse these and produce: (1) top 3 strengths users consistently praise, (2) top 3 pain points, (3) any switching patterns (from/to which products and why), (4) which user segments are most vs. least satisfied, (5) specific features praised or criticised by name.',
            tool: 'Claude',
          },
          reflection: 'When was the last time you updated your competitive intelligence in a systematic way, not just reacting to a competitor\'s launch announcement? If a competitor had quietly fixed their top-cited weakness in the last quarter, would you know?',
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
          inlineCheck: {
            question: 'Your team has been working from the problem statement: "Users struggle to find the content they need." An AI-assisted reframing exercise produces five alternative framings. What should you do with them?',
            options: [
              'Replace your current problem statement with whichever AI framing sounds most compelling',
              'Evaluate each framing against your actual user research to determine which most accurately describes the root cause, then test the selected framing with your team',
              'Use all five framings simultaneously to cover more solution space',
              'Discard the framings and stick with your original statement since AI doesn\'t know your users',
            ],
            correct: 1,
            explanation: 'AI reframings are hypotheses to be evaluated, not conclusions to be adopted. Their value is in surfacing framings you hadn\'t considered — some will be irrelevant, some will resonate immediately with your research, and occasionally one will reframe the problem in a way that opens a significantly better solution space. Evaluating them against your actual user evidence is the PM\'s job; the AI generates the options.',
          },
          outputComparison: {
            label: 'Problem framing: surface-level symptom vs. root-cause problem statement',
            vague: {
              prompt: 'Help me write a problem statement for a search feature',
              output: 'Problem Statement: Users are unable to find the content they are looking for within the application, which leads to frustration and decreased productivity. The current search functionality does not meet user needs and requires improvement. Users want a better search experience that helps them locate relevant information quickly and efficiently.',
            },
            improved: {
              prompt: 'I\'m going to describe a user problem. Help me: (1) separate the stated symptom from the likely root causes, (2) reframe it as a specific, testable problem statement that points to a solution direction, and (3) generate 3 alternative framings that suggest different solution approaches.\n\nUser problem description: Operations managers at our logistics customers tell us they spend 45+ minutes per day searching for historical shipment records to answer customer queries. They currently export data to Excel and use Ctrl+F. Our product has a search bar that searches shipment IDs only.',
              output: 'Symptom vs. Root Cause Analysis:\nStated symptom: Users spend too long searching for shipment records.\nLikely root causes (distinct from the symptom):\n• Search scope is too narrow — shipment ID only, when users search by customer name, date, route, or status\n• The product is designed for data entry, not retrieval — search is an afterthought, not a first-class workflow\n• No contextual starting point — users land on a blank search, not on the record type they most often need\n\nSpecific Problem Statement:\nOperations managers handling inbound customer queries cannot retrieve specific shipment records within 30 seconds because our search only matches exact shipment IDs — not the customer names, dates, or status terms that define how ops managers think about shipments.\n\nAlternative Framings:\n1. Customer communication framing: "When customers ask about their order, our ops managers can\'t get an answer in the conversation — they have to call back." (Solution: focus on real-time status, not search)\n2. Workflow interruption framing: "Answering a customer query requires leaving our product and using Excel." (Solution: eliminate the export workaround)\n3. Cognitive load framing: "Ops managers have to translate customer language into database IDs before they can search." (Solution: natural language search or saved customer segments)',
            },
            insight: 'The vague prompt produces a problem statement that describes frustration with no mechanism — it could justify any search improvement without telling you which one. The specific version separates symptom from root cause, produces a problem statement with a testable claim (search scope), and generates three framings that point to genuinely different solution directions. The PM can now decide which framing best matches their user evidence rather than building to the first solution that comes to mind.',
          },
          applyThisWeek: {
            action: 'Take a problem statement you\'re currently using to justify a feature or initiative. Paste it into Claude and ask for: (1) the distinction between symptom and root cause, (2) a more specific, testable restatement, and (3) three alternative framings that suggest different solution approaches. Evaluate which framing your user research best supports.',
            promptTemplate: 'Here is a user problem I\'m working with: [describe the problem as you currently understand it, including any user data or quotes]. Help me: (1) separate the stated symptom from the likely root causes, (2) rewrite it as a specific, testable problem statement that identifies a mechanism, and (3) generate 3 alternative framings that would each suggest a different type of solution.',
            tool: 'Claude',
          },
          reflection: 'Think about a feature that didn\'t achieve its intended impact after launch. In hindsight, was the problem statement you were solving genuinely the root cause — or was it a symptom of something deeper that the feature didn\'t address?',
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
          inlineCheck: {
            question: 'An AI-generated interview discussion guide includes the question: "How frustrating is it when you can\'t find what you\'re looking for in our product?" What is wrong with this question?',
            options: [
              'It\'s too short — interview questions should be longer and more detailed',
              'It\'s a leading question that assumes users experience frustration, priming them to confirm the hypothesis rather than describe their actual experience',
              'It\'s too specific — interview questions should be more general to allow for broader responses',
              'It mentions the product by name, which could introduce bias',
            ],
            correct: 1,
            explanation: 'Leading questions are the most damaging flaw in research design because they corrupt the data before a single interview is conducted. By assuming frustration, this question signals to the participant that frustration is the expected answer. A neutral alternative — "Tell me about a recent time when you were looking for something in our product. Walk me through what happened." — allows participants to describe their actual experience, which might be frustration, confusion, or something the PM didn\'t anticipate at all.',
          },
          outputComparison: {
            label: 'Research discussion guide: AI first draft vs. PM-reviewed and refined',
            vague: {
              prompt: 'Write interview questions for a user research study about our onboarding',
              output: 'Interview Questions:\n1. How was your experience with our onboarding process?\n2. Did you find the onboarding easy or difficult?\n3. What features did you learn during onboarding?\n4. How satisfied are you with the onboarding experience?\n5. Would you recommend our onboarding to a colleague?\n6. What improvements would you suggest for our onboarding?\n7. Did you complete all the onboarding steps?\n8. How long did the onboarding take you?',
            },
            improved: {
              prompt: 'I\'m planning interviews to understand why 40% of new users don\'t complete our onboarding flow for a B2B project management tool. Target user: team leads at companies under 200 employees who signed up in the last 30 days. Research objective: identify the specific moments where users disengage or feel confused, and understand what they were trying to accomplish when they stopped. Generate a 10-question discussion guide using open-ended questions only. Include 2 opening questions to establish context, 5 core questions about the onboarding experience, and 3 closing questions about unmet needs. Flag any questions that might be leading.',
              output: 'Discussion Guide: Onboarding Drop-off Research\n\nOpening (establish context — do not mention onboarding yet)\n1. Tell me a bit about your role and how you typically manage projects with your team. (Establishes baseline workflow without anchoring to our product)\n2. What were you hoping to accomplish when you first signed up for [product]? What was the situation that made you look for a tool? (Surfaces motivation and job-to-be-done before we discuss the experience)\n\nCore: Onboarding Experience\n3. Walk me through what happened after you first logged in. What did you do first? (Open narrative — let them describe their actual sequence)\n4. Tell me about a moment during that first session where you weren\'t sure what to do next. What did you do? (Identifies friction without assuming frustration)\n5. Was there anything you were trying to set up or figure out that you couldn\'t find? (Surfaces unmet goals without leading)\n6. What would have made you feel like you\'d successfully set up the product? (Identifies their definition of activation — may differ from ours)\n7. At what point, if any, did you decide to come back to the setup later — or step away entirely? (Captures the abandonment decision neutrally)\n\n[Guide continues with closing questions]\n\n⚠️ Questions to review for potential leading: None flagged in this draft, but watch for follow-ups that assume a negative experience.',
            },
            insight: 'The vague prompt produces a guide full of closed and leading questions that will generate unreliable data — "Did you find the onboarding easy or difficult?" primes a binary answer and "How satisfied are you?" is a survey question, not an interview question. The specific version establishes clear objectives, uses open-ended narrative prompts that let participants describe their actual experience, and flags the risk of leading follow-ups. The key upgrade was defining the research objective, the user, and the drop-off signal before asking for questions.',
          },
          applyThisWeek: {
            action: 'Take the discussion guide from your last or next user interview study. Paste it into Claude and ask it to: (1) identify any leading or closed questions, (2) suggest open-ended alternatives for each flagged question, and (3) identify any important question you\'re missing given your research objective. Revise the guide before your next interview.',
            promptTemplate: 'I\'m planning [N] user interviews to understand [research objective]. Target user: [describe role, company type, situation]. Research hypotheses: [list 2-3 things you\'re testing]. Generate a [N]-question discussion guide using open-ended questions only. Include: [N] opening context questions, [N] core experience questions, [N] closing unmet needs questions. Flag any question that might be leading or closed.',
            tool: 'Claude',
          },
          reflection: 'Think about a user research study you ran that produced surprising results. Were those surprises because users genuinely surprised you — or because your questions were open enough to surface something you hadn\'t anticipated? What question design made the difference?',
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
          inlineCheck: {
            question: 'You\'ve been asked to write a PRD for a new feature by end of day. You open Claude immediately and type "Write a PRD for a customer notification feature." What\'s the problem with this approach?',
            options: [
              'PRDs should never be started with AI — they require full manual drafting first',
              'Without your product thinking as input, AI will produce a structurally complete but strategically empty document filled with generic content that will need to be almost entirely rewritten',
              'This approach is fine — AI can generate the thinking and the writing simultaneously',
              'The prompt is too short; you need to use a longer prompt to get a better output',
            ],
            correct: 1,
            explanation: 'AI cannot generate the product thinking — it can only express thinking you\'ve already done. Without knowing your specific user, the evidence behind the problem, your actual success metrics, and your constraints, AI will produce a document that looks complete but is filled with placeholders: generic user descriptions, invented metrics, and strategic language that applies to any product. Spending 5 minutes on bullet-point notes before prompting produces a PRD draft that requires editing rather than rewriting.',
          },
          outputComparison: {
            label: 'PRD drafting: AI without thinking vs. AI with PM notes as input',
            vague: {
              prompt: 'Write a PRD for an analytics dashboard feature for our SaaS product',
              output: 'PRD: Analytics Dashboard\n\nBackground: Data-driven decision making is critical for modern businesses. Our users need better visibility into their data.\n\nProblem Statement: Users lack the insights they need to make informed decisions about their business operations.\n\nGoals:\n- Provide users with real-time data visibility\n- Enable data-driven decision making\n- Improve user engagement with our platform\n\nSuccess Metrics:\n- Increase dashboard usage by 30%\n- Improve user satisfaction scores by 15%\n- Reduce data-related support tickets by 20%\n\nUser Stories:\n- As a user, I want to view my key metrics so that I can understand my performance.\n- As a user, I want to filter data by date so that I can analyse trends.',
            },
            improved: {
              prompt: 'Write a PRD for an analytics dashboard feature using these notes:\n- User: Account managers at our mid-market B2B SaaS customers (companies 50-200 employees) who manage 10-20 client accounts each\n- Problem: Account managers are exporting data to Excel weekly to build client reports — our CS team says this is the #1 request in NPS feedback ("I wish I could show my clients a dashboard instead of sending spreadsheets")\n- Solution: Embeddable client-facing report showing: active users, feature adoption, ROI metrics per client account. Client can view read-only.\n- Success metrics: Reduce "reporting" tagged CS tickets by 50% in 90 days; 40% of account managers create at least one shared report in first 30 days\n- Non-goals: NOT a full analytics platform; NOT editable by clients; NOT covering billing data (legal review needed)\n- Constraints: Must use existing BI infrastructure; cannot require new data pipeline; launch before Q2 business reviews',
              output: 'PRD: Client-Facing Analytics Dashboard\n\nBackground: Account managers at mid-market B2B customers currently export data to Excel each week to produce client reports — a manual workflow cited as the #1 request in NPS feedback: "I wish I could show my clients a dashboard instead of sending spreadsheets."\n\nProblem Statement: Account managers cannot share real-time performance data with their clients without manual export and reformatting, creating a weekly reporting burden and reducing the perceived value of our platform during business reviews.\n\nGoals:\n- Reduce "reporting" tagged CS tickets by 50% within 90 days of launch\n- Achieve 40% of account managers creating at least one shared report within 30 days\n\nNon-Goals:\n- Full analytics platform or custom metric builder (separate initiative)\n- Client editing permissions (read-only only)\n- Billing data inclusion (requires legal review — tracked separately)\n\nUser Stories:\n1. As an account manager preparing for a quarterly business review, I want to share a live link to my client\'s usage dashboard so that I can present real-time data without building a deck.\nAC: Shareable link with read-only access, expires after 30 days unless renewed. Shows: active user count, top 3 features used, weekly usage trend for last 90 days.',
            },
            insight: 'The vague prompt produces a document with invented metrics ("increase dashboard usage by 30%"), a user description that fits any SaaS customer, and goals that could apply to any analytics feature ever built. The specific version uses the PM\'s bullet notes to anchor every section: the NPS quote as evidence for the problem, the 90-day CS ticket reduction as a real success target, and the legal constraint as a concrete non-goal. The difference is not prompt length — it\'s the PM\'s thinking arriving before the prompt.',
          },
          applyThisWeek: {
            action: 'For your next PRD, spend exactly 5 minutes writing bullet-point notes before opening AI — covering user, problem (with evidence), solution, metrics, non-goals, and constraints. Then use the PRD prompt template and compare the output quality to a PRD you drafted without notes first. Estimate: how much editing did each require?',
            promptTemplate: 'Write a PRD for [feature name] using these notes:\n- User: [who, specifically — role, company type, situation]\n- Problem: [what problem, evidenced by what data, research, or customer signal]\n- Solution: [high-level what we\'re building]\n- Success metrics: [specific, measurable outcomes in a timeframe]\n- Non-goals: [what we are explicitly not solving]\n- Constraints: [technical, timeline, resource, or strategic constraints]\nFormat: Background, Problem Statement, Goals & Non-Goals, User Stories (5-7 with acceptance criteria), Success Metrics, Open Questions.',
            tool: 'Claude',
          },
          reflection: 'How often do you write a PRD and discover, while writing it, that you\'re unclear on who the primary user really is or what success actually looks like? What would it change about your product work if you had to answer those questions before the PRD began?',
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
          inlineCheck: {
            question: 'You ask AI to rank your backlog using RICE scores. The AI produces a ranked list. How should you treat this output?',
            options: [
              'Present it directly to stakeholders as your Q3 roadmap — AI scoring is objective',
              'Use it as a starting point to review, adjusting ranks where your strategic context, team capacity, or stakeholder constraints make the AI\'s ordering inappropriate',
              'Reject it — RICE scores require manual calculation to be valid',
              'Ask AI to re-rank using a different framework to see if the order changes',
            ],
            correct: 1,
            explanation: 'AI applies RICE frameworks to the scores you provide, but it doesn\'t know what\'s politically important to your CEO, which items are technically bundled, what your team\'s actual velocity is, or what strategic bets you\'re making this quarter. The ranked output is a useful structured starting point — it externalises the framework logic and makes inconsistencies visible. Your judgment then applies the context that makes it a real roadmap decision.',
          },
          outputComparison: {
            label: 'Roadmap stress-testing: no challenge vs. multi-stakeholder perspective',
            vague: {
              prompt: 'Review my Q3 roadmap and tell me if it looks good: Feature A, Feature B, Feature C, Feature D',
              output: 'Your Q3 roadmap looks comprehensive. Feature A, B, C, and D cover a range of user needs. The roadmap seems balanced and should help improve user experience. Make sure to prioritise based on user feedback and business goals. It would be good to validate these features with users before building.',
            },
            improved: {
              prompt: 'Here is my Q3 roadmap for a B2B project management tool:\n1. Advanced reporting dashboard (estimated 6 weeks, requested by enterprise accounts, expected to improve retention)\n2. Mobile app redesign (estimated 8 weeks, high customer complaint volume, expected to reduce churn)\n3. Slack integration (estimated 3 weeks, requested by sales as a deal-blocker, expected to help new sales)\n4. Bulk task import (estimated 2 weeks, power user request, expected to improve activation for larger teams)\n\nChallenge this roadmap from three perspectives: (1) a power user who uses the product 5+ hours per day, (2) your CFO who wants to see ARR growth this quarter, (3) your lead engineer who has a 4-person team. What would each object to, and why?',
              output: 'Power user perspective (heavy daily use):\nWould strongly object to Mobile app being #2 — they likely use desktop primarily and don\'t experience mobile pain. Would advocate for Bulk task import first — it directly solves the "I have 200 tasks to migrate" problem that power users hit when onboarding new projects. Would also ask: "Why is reporting #1? I can already export to Excel."\n\nCFO perspective (ARR growth this quarter):\nWould prioritise Slack integration above everything — it\'s a deal-blocker, which means it has a direct, near-term revenue link. If sales is losing deals over this, a 3-week investment with clear revenue attribution should rank higher. Would question Mobile redesign ROI: "Will this reduce churn enough to justify 8 weeks of the team\'s time? What\'s the data?"\n\nLead engineer (4-person team, 8 weeks to deliver):\nWould flag that the roadmap totals 19 weeks of estimated work for an 8-week quarter. Either estimates are wrong, scope needs to be cut, or something needs to be deferred. Would recommend: Slack integration (3 wks) + Bulk import (2 wks) + one phase of Reporting (3 wks) = 8 weeks. Would defer Mobile redesign to Q4 unless churn data is compelling.',
            },
            insight: 'The vague prompt produces generic approval that adds no information — it doesn\'t challenge a single assumption or surface a single risk. The specific prompt generates three distinct objections that each expose a real weakness: the power user reveals a scope disconnect, the CFO reveals a revenue prioritisation argument, and the engineer reveals that the roadmap is mathematically impossible in the stated timeframe. Each objection is actionable before the stakeholder review rather than during it.',
          },
          applyThisWeek: {
            action: 'Take your current roadmap or backlog top 5. Ask Claude to challenge it from three perspectives: your most demanding power user, your CEO or investor, and your engineering lead. For each objection, decide: is this valid and should it change my priorities, or is it an objection I can address with a clear rationale?',
            promptTemplate: 'Here is my [Q_/ sprint] roadmap for [product type]:\n[List items with estimated effort and rationale for each]\n\nChallenge this roadmap from three perspectives: (1) [primary user type] who uses the product [frequency], (2) [key business stakeholder, e.g. CEO/CFO/Sales lead] who cares about [their primary metric], (3) my lead engineer who has [team size] and [timeframe]. For each perspective: what would they object to and why? What would they reprioritise?',
            tool: 'Claude',
          },
          reflection: 'Think about the last time a stakeholder challenged your roadmap in a review meeting with an objection you hadn\'t anticipated. What would it have been worth to surface that objection a week earlier — before the meeting rather than during it?',
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
          inlineCheck: {
            question: 'You\'ve written an AI-generated feature announcement for three audiences: customers, the engineering team, and the executive leadership team. What is the most important edit to make before sending?',
            options: [
              'Ensure all three are the same length for consistency',
              'Replace generic language in each version with specific references to what each audience cares about — their workflows, their metrics, their constraints',
              'Add more technical detail to all three versions to demonstrate depth',
              'Shorten all three to bullet-point summaries for efficiency',
            ],
            correct: 1,
            explanation: 'AI writes for a generic professional reader. Your customers care about their specific workflow change, not "improved efficiency." Your engineers care about what done looks like and what\'s out of scope, not strategic positioning. Your executives care about the metrics it moves and the decision they need to make. Replacing generic language with specific references to each audience\'s actual context is what separates a communication that gets read and acted on from one that gets skimmed and filed.',
          },
          outputComparison: {
            label: 'Executive product update: generic recap vs. decision-focused briefing',
            vague: {
              prompt: 'Write an executive update about our product progress this month',
              output: 'Executive Product Update — This Month\n\nWe have made significant progress on our product initiatives this month. Our team has been working hard to deliver value to our customers and improve our product offering.\n\nKey highlights:\n• Completed development on several new features\n• Continued work on improving user experience\n• Made progress on our roadmap items\n• Addressed various customer feedback items\n\nLooking ahead, we plan to continue executing on our roadmap and delivering value to customers. We remain focused on our strategic goals and will continue to update you on our progress.',
            },
            improved: {
              prompt: 'Write a 5-bullet executive product update for May. Audience: our CEO and two board members who care about ARR growth and customer retention. Format: What shipped, Key learnings, Progress toward our Q2 retention goal, Upcoming priorities, Decision needed.\n\nContext:\n- Shipped: Slack integration (3 weeks), now live for all customers\n- Key learning: 40% of new Slack integration users came from the enterprise segment — higher than expected\n- Q2 retention goal: reduce churn from 3.2% to 2.8% monthly; current: 2.9% (on track)\n- Upcoming: Mobile redesign starts June 1, targeting 60-day delivery\n- Decision needed: Should we pull in the reporting dashboard from Q4 to Q3 given the enterprise signal? Needs engineering capacity decision by June 15.',
              output: 'Executive Product Update — May\n\n1. SHIPPED: Slack integration launched to all customers on May 12. Adoption at 28% of active users in first 2 weeks — ahead of our 20% 30-day target.\n\n2. KEY LEARNING: 40% of Slack integration adopters are from our enterprise segment (companies 200+ employees) — 2x the segment\'s share of our overall user base. This suggests the integration addresses a disproportionate enterprise need worth monitoring in expansion data.\n\n3. RETENTION PROGRESS: Monthly churn at 2.9% vs. Q2 goal of 2.8% — on track. Cohort analysis shows the improvement is concentrated in the 90-180 day customer segment, which correlates with our onboarding changes in April.\n\n4. NEXT PRIORITY: Mobile redesign begins June 1. Engineering is committed to 60-day delivery. This is our highest-volume complaint category in NPS (mentioned by 34% of detractors).\n\n5. DECISION NEEDED BY JUNE 15: Given the enterprise signal from Slack adoption, should we move the reporting dashboard from Q4 to Q3? It would require pulling 2 engineers from other work. Your call on whether the enterprise revenue opportunity justifies the trade-off — I can present the business case in our June 10 1:1.',
            },
            insight: 'The vague prompt produces a communication that contains no actual information — any PM at any company could have written it and it tells an executive nothing they can act on. The specific version uses real numbers (2.9% vs 2.8% churn target), a specific enterprise insight, and a time-bound decision request. The upgrade was providing the actual context for each bullet and specifying that the audience cares about ARR and retention — which filtered out everything an exec doesn\'t need to know.',
          },
          applyThisWeek: {
            action: 'Take an upcoming stakeholder communication (sprint update, feature announcement, or status email). Write separate AI prompts for two different audiences, explicitly specifying what each audience cares about and what action you want them to take. Compare the two outputs — how different are they, and which one required the most editing to be audience-appropriate?',
            promptTemplate: 'Write a [type of communication: product update / feature announcement / status email] for [specific audience: CEO / engineering team / customers]. This audience primarily cares about [their key metric or concern]. The content to cover: [what shipped or is changing], [key data or learning], [what\'s coming next], [what action or decision I need from them]. Keep it to [length]. Avoid [jargon type or level of detail they don\'t need].',
            tool: 'Claude',
          },
          reflection: 'Think about a stakeholder who regularly asks questions in your update meetings that suggest they didn\'t read or understand your written update. What would they need the communication to look like to actually read it — and how far is that from what you currently send?',
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
          inlineCheck: {
            question: 'You ask AI to write a Jira ticket for a new export feature. The AI produces a user story with five acceptance criteria. Before adding it to the backlog, what must you review?',
            options: [
              'Whether the story is long enough to justify a full sprint point estimate',
              'Whether the acceptance criteria are testable, cover relevant edge cases, and don\'t over-specify implementation approach',
              'Whether the ticket follows the exact Jira template format used in previous sprints',
              'Whether the story covers all potential future variations of the feature',
            ],
            correct: 1,
            explanation: 'AI produces well-structured tickets but consistently makes two errors: acceptance criteria that describe intentions rather than testable conditions ("Users should be able to export easily" instead of "Export completes in under 3 seconds for files up to 10,000 rows"), and implementation prescriptions that constrain engineering when they should only define the user-observable outcome. Reviewing for testability and appropriate scope is the PM\'s quality gate before the ticket enters the team\'s workflow.',
          },
          outputComparison: {
            label: 'Sprint ticket writing: generic story vs. engineering-ready specification',
            vague: {
              prompt: 'Write a user story for a CSV export feature',
              output: 'User Story: As a user, I want to export data as a CSV file so that I can analyse my data in Excel.\n\nAcceptance Criteria:\n• Users can export data to CSV format\n• The export file contains relevant data\n• Users receive the exported file\n• The export process is easy to use\n• The file opens correctly in Excel',
            },
            improved: {
              prompt: 'Write a Jira user story for a CSV export feature in our B2B project management tool. Context: Operations managers need to export their task lists with status, owner, and due date to include in weekly client reports — currently they copy-paste from the screen manually. Primary user: operations manager at a 50-200 employee company managing 3-5 active client projects. Include: user story format, 5 specific and testable acceptance criteria, 2 edge cases to consider, and a definition of done. Do not specify implementation approach — define observable user outcomes only.',
              output: 'User Story:\nAs an operations manager preparing my weekly client report, I want to export my project task list to CSV so that I can include current status, owners, and due dates in my report without manual copy-pasting.\n\nAcceptance Criteria:\n1. Export button is visible on the task list view for any project where the user has at least Viewer permission.\n2. Exported CSV includes columns: Task name, Status, Assignee, Due date, Priority, Last updated — in that order.\n3. Export of a task list up to 500 rows completes and downloads within 5 seconds on a standard broadband connection.\n4. CSV file opens in Excel and Google Sheets without encoding errors (UTF-8 format, comma delimited).\n5. If active filters are applied to the task list, the export respects those filters — users export what they see on screen, not the full unfiltered list.\n\nEdge Cases:\n• What happens if the task list is empty? (Expected: export still works, produces a header row with no data rows, no error message)\n• What if a task has no assignee or no due date? (Expected: those fields export as blank cells, not "null" or "undefined")\n\nDefinition of Done:\nExport feature tested in Chrome, Safari, and Firefox. Verified with a 500-row task list. Verified in Excel 365 and Google Sheets. Edge cases tested and confirmed.',
            },
            insight: 'The vague prompt produces acceptance criteria that no engineer could test — "easy to use" and "contains relevant data" are opinions, not conditions. The specific version produces five genuinely testable conditions, including a performance threshold (5 seconds), a column order specification, an encoding requirement, and a filter-respects-view rule that would otherwise be ambiguous. The edge cases surface two real questions that would otherwise appear as bugs. The upgrade was providing the user context and explicitly requesting testable, implementation-neutral criteria.',
          },
          applyThisWeek: {
            action: 'Take three tickets from your next sprint that you would normally write manually. Write a 2-3 sentence description for each, then use AI to generate the full user story with acceptance criteria. Review each for: testable ACs, missing edge cases, and over-specified implementation. Edit one to make it engineering-ready and compare the time saved to your usual ticket-writing process.',
            promptTemplate: 'Write a Jira user story for [feature description] in [product type]. Context: [describe the user situation and what they\'re trying to accomplish — include current workaround if applicable]. Primary user: [specific role at specific company type]. Include: user story format, [N] specific and testable acceptance criteria, [N] edge cases to consider, and a definition of done. Define observable user outcomes only — do not specify implementation approach.',
            tool: 'Claude',
          },
          reflection: 'Think about the last bug that reached production that could have been caught in the ticket. Was the acceptance criterion that should have prevented it missing, untestable, or ambiguous? How would you write that criterion now?',
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
          inlineCheck: {
            question: 'A vendor pitches you an AI feature that "automatically understands what customers need and generates the right response." As a PM, what is your most important follow-up question?',
            options: [
              'How much does it cost per API call?',
              'What is the expected accuracy rate, how is it measured, and what happens when the model is wrong?',
              'Which companies are currently using this technology?',
              'How quickly can we integrate this into our product?',
            ],
            correct: 1,
            explanation: 'AI vendor pitches describe what the technology does when it works well. The PM\'s job is to understand the failure mode — because AI features have failure modes traditional software doesn\'t. Without knowing the accuracy rate, how "wrong" is measured, and what happens in the failure case (does it fail silently? produce confident incorrect output? prompt a fallback?), you cannot write requirements, set user expectations, or design a trustworthy product experience.',
          },
          outputComparison: {
            label: 'AI feature scoping: vague capability claim vs. capability-typed requirements',
            vague: {
              prompt: 'We want to add AI to our customer support product. What should we build?',
              output: 'Here are some AI features you could add to your customer support product:\n1. Chatbot for answering common questions\n2. Sentiment analysis to detect frustrated customers\n3. Auto-categorisation of tickets\n4. AI-generated response suggestions\n5. Smart routing to the right agent\n6. Predictive analytics for ticket volume\n7. Knowledge base search improvement\nThese features would greatly improve your customer support capabilities and customer satisfaction.',
            },
            improved: {
              prompt: 'We\'re a B2B SaaS company with a customer support team handling 500 tickets/day. 60% of tickets are answered with a response that\'s one of 15 standard answers. Our team spends 40% of their time on these predictable tickets. We\'re evaluating where to add AI. For each AI capability type (classification, generation, RAG, recommendation, extraction), tell me: (1) which of our specific support problems it solves, (2) what data we\'d need, (3) realistic accuracy expectations, and (4) what the failure mode looks like that our PMs and designers need to plan for.',
              output: 'Classification — Ticket categorisation and routing\nYour problem it solves: Routing the 500 daily tickets to the right queue without manual triage.\nData needed: 3-6 months of historical tickets with correct categories labelled (minimum 500 per category for reliable training).\nRealistic accuracy: 85-92% for well-defined categories with sufficient training data. Lower for ambiguous tickets or new issue types.\nFailure mode: Miscategorised tickets reach the wrong queue and get delayed. Design: human review queue for low-confidence classifications; monitor and retrain when a new product launch creates a new uncategorised issue type.\n\nRAG — Response suggestion grounded in knowledge base\nYour problem it solves: The 60% of tickets with standard answers — AI can draft the response grounded in your documented answers.\nData needed: A clean, structured knowledge base. Quality of RAG is directly proportional to quality of source documentation.\nRealistic accuracy: Response quality depends on KB quality, not just the model. Expect 70-80% of suggestions usable with light editing; 20-30% requiring rewrite.\nFailure mode: AI confidently generates a response that cites outdated or wrong KB article. Design: show the source article the response was based on; allow agent to override; log when agents edit heavily (signals KB quality problem).\n\n[continues with Generation, Recommendation, Extraction]',
            },
            insight: 'The vague prompt returns a shopping list of AI features with no connection to the company\'s actual support context, no data requirements, and no failure mode analysis. The specific version maps each AI capability type to a real business problem (60% predictable tickets, 500/day volume), names specific data requirements, and provides failure mode design implications that PMs need to write requirements. The upgrade was providing the actual business context and asking for the failure mode — the question most PMs don\'t ask vendors.',
          },
          applyThisWeek: {
            action: 'Identify one AI feature in your product (or a competitor\'s product you want to understand better). Classify it by AI capability type (classification, generation, RAG, recommendation, or extraction). Then identify: what data it needs, what its likely accuracy rate is, and what the failure mode looks like in the current UX. Write a one-paragraph assessment.',
            promptTemplate: 'I\'m evaluating adding an AI feature to [product type]. The user problem we\'re solving: [describe the specific problem]. Our current data: [describe what data you have available]. For each AI capability type that could apply (classification / generation / RAG / recommendation / extraction): tell me (1) how it would solve our specific problem, (2) what data it needs, (3) realistic accuracy expectations, and (4) what the failure mode looks like that my design team needs to plan for.',
            tool: 'Claude',
          },
          reflection: 'Think about an AI feature you\'ve used in a product that felt untrustworthy — where you weren\'t sure whether to believe the output. Was the failure mode a data quality problem, an accuracy problem, or a design problem that didn\'t help you understand the AI\'s confidence level? What would have made it trustworthy?',
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
          inlineCheck: {
            question: 'Your team is launching an AI feature that suggests email subject lines for sales reps. The PRD says "the feature should suggest helpful subject lines." What critical requirement is missing?',
            options: [
              'A specification for the font size of the suggestion UI',
              'An accuracy threshold defining what "helpful" means, how it is measured, and what happens when the model\'s confidence is low',
              'A list of all email clients the feature should support',
              'A requirement for how many suggestions to show at once',
            ],
            correct: 1,
            explanation: '"Helpful" is not a requirement — it\'s an intention. An AI feature PRD must define what good looks like in measurable terms (e.g. "sales rep uses the suggestion without editing in >50% of cases"), how that is measured, and what the system does when it cannot generate a confident suggestion. Without these specifications, engineering has no standard to build to, QA has no bar to test against, and you\'ll discover what "helpful" means by reading support tickets after launch.',
          },
          outputComparison: {
            label: 'AI feature PRD sections: standard requirements vs. AI-complete requirements',
            vague: {
              prompt: 'Write the requirements for an AI feature that auto-categorises customer support tickets',
              output: 'Requirements for AI Ticket Categorisation:\n\nFunctional Requirements:\n• The system shall automatically categorise incoming support tickets\n• The AI shall analyse ticket content and assign appropriate categories\n• Categories shall include: Billing, Technical, Account, General\n• The system shall learn from corrections made by agents\n• Categorisation shall happen automatically when a ticket is received\n\nNon-Functional Requirements:\n• The system shall be accurate\n• The system shall be fast\n• The system shall be easy to use',
            },
            improved: {
              prompt: 'Write the AI-specific PRD sections for an AI ticket auto-categorisation feature for our B2B SaaS customer support team. Our team handles 500 tickets/day across 4 categories. Background: We have 18 months of labelled historical tickets (avg 5,000 per category). Include these sections: (1) Data requirements, (2) Accuracy and quality thresholds (define acceptable accuracy, false positive/negative rates, and relative consequences of each error type), (3) Failure modes and fallbacks, (4) User controls (how agents interact with and correct the AI), (5) Ongoing monitoring plan. Be specific enough that an engineer could implement from these requirements.',
              output: 'Data Requirements:\n• Training data: 18 months of historical tickets, labelled with correct category. Minimum 2,000 tickets per category required for reliable classification (we meet this threshold).\n• Ongoing training data: Agent corrections must be logged with original category, corrected category, and ticket ID to enable retraining every 60 days.\n• PII handling: Ticket content used for training must have customer name, email, and company name redacted prior to use in any training pipeline.\n\nAccuracy and Quality Thresholds:\n• Minimum acceptable accuracy at launch: 87% across all categories (measured on 20% held-out test set).\n• Category-level floor: No single category may fall below 82% accuracy at launch.\n• False positive/negative consequence analysis: Miscategorising a Billing ticket as General is higher-consequence than miscategorising a General ticket as Technical — billing tickets routed incorrectly delay resolution for time-sensitive customers. Weight the billing category precision higher in evaluation.\n• Confidence threshold: If model confidence is below 75%, flag for human review rather than auto-assigning.\n\nFailure Modes and Fallbacks:\n• If confidence < 75%: Route to "Needs review" queue. Assign to a senior agent. Do not auto-categorise.\n• If the model is unavailable: Fall back to keyword-based rules (pre-existing routing logic). Log the outage event for ops review.\n• If a ticket belongs to a new, uncategorised issue type: Route to "Uncategorised" queue. Alert PM team weekly on volume — signal for new category creation.\n\nUser Controls:\n• Agents can see the AI\'s assigned category and confidence score for every ticket.\n• One-click recategorisation: Agent selects correct category from dropdown; correction is logged automatically for retraining.\n• Agent cannot turn off AI categorisation individually, but team leads can disable for specific queues in settings.\n\nOngoing Monitoring:\n• Weekly: PM reviews override rate (target: <15%). Spikes indicate model drift or new issue types.\n• Monthly: Data team runs category-level accuracy report on production data. Flag any category below 85%.\n• Retraining cadence: Every 60 days using accumulated corrections.',
            },
            insight: 'The vague requirements are unmeetable — "the system shall be accurate" gives engineering nothing to build to and QA nothing to test against. The specific version gives engineering a measurable accuracy floor (87%), a confidence threshold for the fallback path (75%), a PII handling requirement for training data, and a monitoring cadence that defines who does what and when. The critical difference is that every requirement is testable and specific enough that a disagreement about whether it\'s been met can be resolved with data.',
          },
          applyThisWeek: {
            action: 'Take an AI feature you\'re planning or recently shipped. Draft the five AI-specific PRD sections: data requirements, accuracy thresholds, failure modes, user controls, and monitoring plan. For each section, ask: "Could an engineer build from this requirement without asking me a follow-up question?" Rewrite any section where the answer is no.',
            promptTemplate: 'Write the AI-specific PRD sections for [AI feature name] in [product type]. Context: [describe the feature, the user, and the data you have available]. Include: (1) Data requirements (training data, ongoing data, PII handling), (2) Accuracy and quality thresholds (minimum acceptable accuracy, false positive/negative consequence analysis, confidence threshold for fallback), (3) Failure modes and fallbacks, (4) User controls (how users see and correct AI outputs), (5) Ongoing monitoring plan (who monitors what, at what cadence, and what triggers action).',
            tool: 'Claude',
          },
          reflection: 'Has your team ever shipped an AI feature and then spent weeks debating what "good performance" meant — because it wasn\'t defined before launch? What would it have taken to define that standard before the first line of code was written?',
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
          inlineCheck: {
            question: 'Your AI email drafting feature achieves 91% accuracy in offline testing. Is it ready to launch?',
            options: [
              'Yes — 91% accuracy is above the industry benchmark for AI features',
              'Not necessarily — offline accuracy must be validated with human evaluation of output quality and A/B tested against user outcome metrics before launch decisions are made',
              'Yes — any accuracy above 90% is considered production-ready',
              'No — AI features should not be launched until 99% accuracy is achieved',
            ],
            correct: 1,
            explanation: 'Offline accuracy measures whether the model produces statistically correct outputs on a test dataset — but it doesn\'t measure whether users find the outputs useful, whether they improve task completion rates, or whether they create trust or harm in edge cases. A feature with 91% accuracy can still damage user trust if the 9% failure cases occur on high-stakes emails, or if the outputs are technically accurate but tone-deaf to the specific context. Human evaluation and A/B testing on user outcomes are the additional quality gates that bridge model accuracy to real-world value.',
          },
          outputComparison: {
            label: 'AI feature evaluation: no plan vs. structured pre- and post-launch evaluation',
            vague: {
              prompt: 'How should we test our AI ticket categorisation feature before launching it?',
              output: 'To test your AI ticket categorisation feature, you should:\n1. Test it with sample tickets\n2. Check if the categories are correct\n3. Ask your team if they like it\n4. Run a pilot with a small group\n5. Monitor it after launch\n6. Gather feedback from users\n7. Make improvements based on what you learn\nMake sure to test thoroughly before launching to ensure quality.',
            },
            improved: {
              prompt: 'Design an evaluation plan for our AI ticket auto-categorisation feature before and after launch. Context: The feature auto-assigns one of 4 categories to incoming support tickets. We have 18 months of labelled historical tickets and a team of 12 support agents. Our minimum acceptable accuracy is 87%. We are launching to a team that currently routes tickets manually. Design: (1) offline evaluation methodology, (2) human evaluation rubric for the cases where accuracy is ambiguous, (3) a red-teaming approach with 5 specific adversarial inputs we should test, (4) A/B test design for the production launch, and (5) two production monitoring metrics for the first 30 days.',
              output: 'Offline Evaluation:\nHold out 20% of historical labelled tickets (do not use in training). Run model against this set and calculate: overall accuracy, per-category accuracy, and confusion matrix. Minimum bar: 87% overall, no category below 82%. Track which category pairs are most confused — Billing/Account confusion is higher-consequence than Technical/General.\n\nHuman Evaluation Rubric:\nFor tickets where model confidence is 65-80% (the ambiguous zone), have 3 agents independently categorise a random 200-ticket sample. Calculate inter-rater agreement. If agents agree on the correct category >90% of the time, the model\'s performance on those tickets can be benchmarked against the agent consensus. Rubric for "correct": Would an experienced agent routing this ticket assign the same category without seeing the AI\'s suggestion?\n\nRed-Teaming — 5 adversarial inputs:\n1. Multi-issue ticket: "I can\'t log in (Technical) and I was charged twice this month (Billing)" — which category does the model assign?\n2. Language switch mid-ticket: English subject, Spanish body — does the model fail or categorise correctly?\n3. Sarcastic/ambiguous language: "Great, you charged me again" — does this route as Billing or General?\n4. Empty ticket: Subject only, no body — does this fail gracefully?\n5. New product feature not in training data: A ticket about a feature launched 2 weeks ago — does the model misclassify or route to the review queue?\n\nA/B Test Design:\nControl: manual routing by agents (current state). Treatment: AI auto-categorisation with agent override available. Metric: time-to-first-response per ticket (primary). Guardrail: agent override rate (if >25% of AI assignments are overridden within 48 hours, pause the experiment and investigate).\n\nProduction Monitoring — 30 days post-launch:\n1. Override rate by category: tracked daily. Target <15% overall. Spike >20% on any category triggers model review.\n2. Time-to-first-response: tracked weekly vs. pre-launch baseline. Target: no regression; aim for 15% reduction.',
            },
            insight: 'The vague prompt produces a checklist of general advice that any team already knows — it adds no structure, no thresholds, and no specific adversarial inputs. The specific version gives an engineer a test dataset methodology, a rubric for ambiguous human evaluation, five named red-team inputs that test real edge cases, an A/B test design with a guardrail metric, and two production monitoring metrics with action thresholds. The upgrade was providing the feature context (4 categories, 87% threshold, 12 agents) and asking for each evaluation stage explicitly.',
          },
          applyThisWeek: {
            action: 'For an AI feature you\'re planning or have recently shipped, design a 3-part evaluation framework: (1) define your minimum acceptable accuracy and how you\'ll measure it pre-launch, (2) write 3 red-team inputs specifically designed to find failure modes in your feature\'s domain, (3) name the one production metric you\'d monitor weekly in the first 30 days and the threshold that would trigger action.',
            promptTemplate: 'Design an evaluation plan for [AI feature description]. Context: [describe the feature, user, and data available]. Our minimum acceptable accuracy is [X%]. Design: (1) offline evaluation methodology and quality bar, (2) a 3-point human evaluation rubric for cases where accuracy is ambiguous, (3) [N] red-team adversarial inputs specific to our domain and user base, (4) A/B test design with primary metric and one guardrail metric, (5) two production monitoring metrics for the first 30 days with action thresholds.',
            tool: 'Claude',
          },
          reflection: 'Has your team ever discovered a critical AI failure mode from a user support ticket rather than from testing? What would the red-team test have looked like that would have caught it before launch?',
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
          inlineCheck: {
            question: 'Your competitor just announced a fully automated AI feature that makes decisions on behalf of users without review. Your CEO asks why you haven\'t built this yet. What is the strongest product argument for your current Stage 1 (augmentation) approach?',
            options: [
              'Because fully automated AI is too expensive to build for a company our size',
              'Because Stage 1 augmentation builds the user trust and feedback loops that make Stage 2 automation safer and more adopted when we get there',
              'Because competitors are always wrong about which AI features to build',
              'Because augmentation features are faster to ship than automation features',
            ],
            correct: 1,
            explanation: 'Jumping to automation before users trust the AI in your product creates a dangerous combination: users who don\'t understand the AI\'s outputs, can\'t easily override them, and haven\'t built the mental model to catch its errors. Stage 1 augmentation is not a shortcut — it\'s the product investment that builds user familiarity, reveals failure modes at low stakes, and generates the feedback data that makes Stage 2 automation safe. Competitors who skip it often face user backlash when the automation fails publicly.',
          },
          outputComparison: {
            label: 'AI product strategy: feature list vs. sequenced capability roadmap',
            vague: {
              prompt: 'What AI features should we add to our project management product?',
              output: 'Here are AI features you could add to your project management product:\n1. AI-powered task creation\n2. Smart deadline suggestions\n3. Automated status updates\n4. AI meeting summaries\n5. Intelligent resource allocation\n6. Predictive project completion dates\n7. Natural language project creation\n8. AI-generated project templates\nThese features would modernise your product and improve user productivity.',
            },
            improved: {
              prompt: 'I\'m building an AI product roadmap for a B2B project management tool used by operations teams at 50-200 person companies. We have 3 engineers for AI work and 6 months to demonstrate meaningful AI value. Our users currently manage projects manually — they\'re not AI-native. Using the three-stage AI roadmap framework (Stage 1: augmentation, Stage 2: automation, Stage 3: intelligence), recommend: (1) one Stage 1 feature we could ship in 6 weeks to build user trust, (2) one Stage 2 feature we could target in month 3-4 once trust is established, (3) one Stage 3 vision feature for month 6+ if early stages succeed. For each, tell me: the user value, the data it needs, and the trust-building step that must come first.',
              output: 'Stage 1 Augmentation — Ship in weeks 1-6: AI-drafted status update suggestions\nUser value: Project managers spend 20-30 minutes weekly writing status updates for stakeholders. AI can draft these from task completion data and comments — PM reviews, edits, and sends.\nData needed: Task status changes, completion events, and comment text (all already in your data model).\nTrust prerequisite: None — users see the suggestion, edit it, and send it. Low stakes, high transparency. This teaches users that AI can read their project data accurately.\nWhy this first: It\'s low-consequence (PM always reviews before sending), delivers immediate time savings, and demonstrates AI understands project context without requiring users to change their workflow.\n\nStage 2 Automation — Target months 3-4: Auto-close completed tasks with summary\nUser value: When all subtasks complete, AI auto-closes the parent task and posts a brief completion summary to the activity feed — no manual action required.\nData needed: Subtask completion events + 2 months of status update drafts from Stage 1 (to calibrate summary quality).\nTrust prerequisite: Users must have seen accurate AI summaries in Stage 1 for 8+ weeks. Override mechanism: one-click reopen with reason. Opt-in per project initially.\nWhy this sequence: Auto-closure is only trusted when users have already seen that AI understands what "complete" means in their project context.\n\nStage 3 Intelligence — Months 6+: Proactive risk detection\nUser value: AI flags projects at risk of missing deadline based on velocity, open blockers, and historical delivery patterns — surfaces risk before the PM sees it.\nData needed: 6+ months of project completion data, task velocity by team, historical blocker resolution times.\nTrust prerequisite: Requires significant data accumulation and established user trust in AI accuracy from Stages 1 and 2. A false risk flag from a product users don\'t trust yet is more damaging than no flag at all.',
            },
            insight: 'The vague prompt returns a feature list with no sequencing logic, no data requirements, and no consideration of whether users are ready to trust each capability. The specific version uses the three-stage framework to sequence features in dependency order — Stage 2 automation explicitly requires the trust data generated by Stage 1 augmentation. That sequencing logic is the AI product strategy; the feature list is just implementation detail. The upgrade was providing the team size, user maturity, and timeframe — which forced the AI to make real trade-offs.',
          },
          applyThisWeek: {
            action: 'Map your product\'s current and planned AI features to the three-stage framework (augmentation / automation / intelligence). Identify: which features are building user trust that later stages depend on, and which features are at risk of being introduced before that trust exists. Adjust your roadmap sequence if needed.',
            promptTemplate: 'I\'m building an AI roadmap for [product type] with [team size] AI engineering capacity and [timeframe]. Our users are [describe AI familiarity level]. Using the three-stage framework (Stage 1: augmentation, Stage 2: automation, Stage 3: intelligence), recommend: (1) one Stage 1 feature to build user trust in [timeframe], (2) one Stage 2 feature for [later timeframe] once trust is established, (3) one Stage 3 vision feature for [final timeframe] if earlier stages succeed. For each: user value, data needed, and the trust-building prerequisite from the previous stage.',
            tool: 'Claude',
          },
          reflection: 'Is there an AI feature in your product or on your roadmap that was added because it sounded impressive rather than because it solves a specific user problem your product is in a unique position to solve? What would it take to justify that feature against a simpler alternative?',
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
          inlineCheck: {
            question: 'An A/B test shows that adding social proof ("1,200 teams use this feature") to the upgrade prompt increased paid conversion by 2.3% with 95% statistical significance. What should you ask next?',
            options: [
              'Roll out the change immediately — 95% significance is conclusive',
              'Ask what mechanism drove the result, check guardrail metrics for unintended effects, and identify what this implies about the next hypothesis to test',
              'Run the test again to confirm the result before rolling out',
              'Ask AI whether the 2.3% improvement is large enough to matter',
            ],
            correct: 1,
            explanation: 'A statistically significant result is the beginning of learning, not the end. You need to understand why social proof worked — is it trust? is it FOMO? is it the specific number? — because that mechanism tells you what to test next. You also need to check whether the conversion improvement came at the cost of another metric (e.g. lower satisfaction among users who upgraded based on social pressure). AI can help you generate alternative explanations and follow-up hypotheses, but the decision to roll out requires your judgment about practical significance.',
          },
          outputComparison: {
            label: 'Experiment hypothesis: weak correlation claim vs. mechanism-based hypothesis',
            vague: {
              prompt: 'Generate A/B test ideas to improve our trial-to-paid conversion rate',
              output: 'Here are some A/B test ideas to improve trial-to-paid conversion:\n1. Test different pricing page layouts\n2. Try offering a discount\n3. Add testimonials to the upgrade page\n4. Test different CTA button colours\n5. Try a free trial extension offer\n6. Add a comparison table\n7. Test different headline copy\n8. Try adding urgency messaging\nThese tests could help improve your conversion rate.',
            },
            improved: {
              prompt: 'I\'m trying to improve trial-to-paid conversion for our B2B project management tool. Our current conversion rate is 12% at day 30. We know that users who invite at least one teammate in week 1 convert at 28% vs 8% for solo users. We have not yet addressed this in our onboarding or upgrade flows. Generate 8 A/B test hypotheses targeting this insight. For each hypothesis: (1) what specifically changes in the product, (2) what user behaviour we expect to change and why (the mechanism), and (3) what metric defines a win and what guardrail metric we should watch to prevent harm.',
              output: 'Hypothesis 1: Invitation prompt at first value moment\nWhat changes: After a user completes their first project setup, show an inline prompt: "Projects work better with your team. Invite one person to collaborate on this project." (instead of waiting for explicit navigation to settings).\nMechanism: Users who invite a teammate convert at 28% vs 8% — the barrier may be discoverability, not intent. Positioning the invitation at the moment they\'ve just created something valuable raises the perceived benefit of collaboration.\nWin metric: % of solo users who invite ≥1 teammate in week 1 (target: +40% relative). Guardrail: trial completion rate (ensure the prompt doesn\'t interrupt setup and cause drop-off).\n\nHypothesis 2: Upgrade page personalisation by collaboration status\nWhat changes: Solo users (no teammates) see an upgrade page emphasising the collaboration features with social proof ("Teams using [product] collaborate on average 3 projects simultaneously"). Users who have already invited teammates see an upgrade page emphasising advanced features and admin controls.\nMechanism: The value of the paid plan differs by collaboration status. Showing solo users what they\'re missing (team features) targets a different motivation than showing already-collaborative users admin capabilities.\nWin metric: Trial-to-paid conversion rate by user segment. Guardrail: page drop-off rate (personalisation should not create confusion).\n\nHypothesis 3: Friction-reduced team invite in email drip\nWhat changes: Day 3 activation email includes a single pre-filled invite link for the user\'s most frequent collaborator (based on email domain) with one-click send.\nMechanism: If the barrier is effort (finding email addresses, composing the invite), removing that friction for the most likely invitee should increase invitation rate in week 1 — which predicts conversion.\nWin metric: Invitation sent rate from email. Guardrail: email unsubscribe rate (ensure this doesn\'t feel invasive).',
            },
            insight: 'The vague prompt returns a list of standard conversion tactics with no connection to the company\'s actual data insight (28% vs 8% conversion split on team invitation). The specific version anchors every hypothesis to that insight and provides a causal mechanism for each — which means even a failing test teaches you something about whether the mechanism was correct. The guardrail metrics ensure each test can\'t improve conversion at the cost of another dimension of user experience. The upgrade was providing the specific data insight that should drive the hypothesis generation.',
          },
          applyThisWeek: {
            action: 'Pick one metric you want to improve. Find one user behaviour segment that correlates with better outcomes on that metric (from your analytics, customer interviews, or intuition). Use that insight as the anchor for generating 5 A/B test hypotheses — each with a mechanism, not just a correlation. Score each hypothesis on: testability today, confidence in the mechanism, and expected impact.',
            promptTemplate: 'I\'m trying to improve [metric] for [product type]. Current rate: [X%]. We know that users who [specific behaviour] achieve [better outcome] vs [worse outcome] for users who don\'t. We haven\'t yet addressed this in the product. Generate [N] A/B test hypotheses targeting this insight. For each: (1) what specifically changes in the product, (2) the user behaviour we expect to change and the mechanism (why), (3) the metric that defines a win, and (4) one guardrail metric to prevent harm.',
            tool: 'Claude',
          },
          reflection: 'Think about the last A/B test your team ran that won. Did you know why it won — the specific mechanism — or just that it did? If you didn\'t know why, what hypothesis about the mechanism would have changed what you tested next?',
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
          inlineCheck: {
            question: 'Your monthly active user count (MAU) dropped 8% last month. Your first instinct is that last month\'s UI redesign caused it. What is the most rigorous next step?',
            options: [
              'Roll back the UI redesign immediately to restore the MAU',
              'Generate multiple competing hypotheses for the drop and identify the data needed to rule each one in or out before taking action',
              'Ask AI to confirm that the UI redesign caused the drop',
              'Schedule a team retrospective to discuss the redesign decision',
            ],
            correct: 1,
            explanation: 'Acting on the first plausible explanation is one of the most common and expensive mistakes in product analytics. An MAU drop could be caused by the UI change, a marketing budget reduction, a seasonal effect, a new competitor launch, or a data pipeline issue — each requiring a completely different response. Generating competing hypotheses and identifying discriminating data (cohort analysis, acquisition source data, competitor activity) before acting produces better decisions and avoids the risk of rolling back a redesign that wasn\'t the problem.',
          },
          outputComparison: {
            label: 'Metric drop investigation: single-cause assumption vs. structured hypothesis analysis',
            vague: {
              prompt: 'Our user engagement dropped this month. What should we do?',
              output: 'A drop in user engagement could have several causes. Here are some things you can do:\n1. Look at your analytics to understand what changed\n2. Survey your users to get feedback\n3. Check if there were any product changes\n4. Look at competitor activity\n5. Review your marketing campaigns\n6. Check if there are any technical issues\n7. Analyse your user segments\n8. Consider improving your onboarding\nIt\'s important to understand the root cause before making changes.',
            },
            improved: {
              prompt: 'Our weekly active users dropped 11% over the past 3 weeks for our B2B project management tool. Here is what I know about the context: (1) We launched a new navigation redesign 4 weeks ago, (2) Our marketing team reduced ad spend by 30% in the same period, (3) A competitor launched a major feature update 3 weeks ago, (4) Our CS team has not reported an unusual volume of complaints. Generate the 5 most plausible explanations for this drop. For each: (1) the hypothesis, (2) the specific data I would need to confirm or rule it out, and (3) how quickly I could get that data.',
              output: 'Hypothesis 1: Navigation redesign disrupted existing users\' workflows\nMechanism: The redesign changed where key features are accessed, reducing engagement while users relearn navigation — but engaged users who persist will recover.\nData to confirm/rule out: Compare WAU for users who were active before the redesign vs. users who joined after. If existing user WAU dropped while new user WAU held steady, the redesign is the culprit. Also check feature-level usage: did specific high-use features see disproportionate drops?\nTime to get data: 2-3 hours with your analytics tool.\n\nHypothesis 2: Marketing spend reduction reduced new user activation, masking in the WAU aggregate\nMechanism: Reduced ad spend means fewer new users entering the activation funnel — if new user WAU contribution dropped, aggregate WAU drops even without existing user behaviour changing.\nData to confirm/rule out: Segment WAU by user cohort (existing vs. new in last 30 days). If new user WAU contribution fell proportionally to the 30% spend reduction, this is an acquisition story, not an engagement story.\nTime to get data: Same analytics query as above — 2-3 hours.\n\nHypothesis 3: Competitor feature launch triggered evaluation behaviour\nMechanism: Power users who saw the competitor announcement may have started trialling the alternative, reducing time spent in your product.\nData to confirm/rule out: Check WAU drop by user segment — are power users (high session frequency, multiple projects) disproportionately affected? Also check if support tickets or NPS comments mention the competitor.\nTime to get data: 1-2 hours for usage segmentation; CS sentiment review can be done same day.\n\n[Hypotheses 4-5 continue with data requirements and timelines]',
            },
            insight: 'The vague prompt produces a general investigation checklist that tells an experienced PM nothing new — any analyst knows to "check if there were any product changes." The specific prompt uses the actual context (three simultaneous changes in the same month) to generate hypotheses that each point to discriminating data that could rule them in or out within hours. That data requirement is the key deliverable — it turns "we need to investigate" into "run these three queries this afternoon and we\'ll know which story is true."',
          },
          applyThisWeek: {
            action: 'Pick one metric in your product that has moved unexpectedly in the last month (up or down). Write down everything you know about the context: product changes, marketing changes, competitor activity, seasonal factors. Then use AI to generate 4-5 competing hypotheses and the data needed to distinguish between them. Run at least one of the data queries before end of week.',
            promptTemplate: 'Our [metric] [increased/dropped] by [X%] over [timeframe]. Context about what changed in that period: [list all relevant product changes, marketing changes, competitor activity, and seasonal factors]. Generate [N] competing hypotheses for why this happened. For each: (1) the hypothesis and mechanism, (2) the specific data I would need to confirm or rule it out, and (3) how quickly I could realistically get that data.',
            tool: 'Claude',
          },
          reflection: 'When your team last saw an unexpected metric move, how long did it take to agree on the root cause? How much of that time was spent generating competing hypotheses versus defending the first explanation someone proposed?',
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
          inlineCheck: {
            question: 'Your freemium product has a 12% free-to-paid conversion rate at day 30. Analysis shows that users who complete a "first project with a collaborator" in week 1 convert at 31%, while solo users convert at 6%. What should be your first PLG action?',
            options: [
              'Reduce the price of the paid tier to improve overall conversion rates',
              'Redesign onboarding to get more users to complete a collaborative project in week 1 — this is likely your activation milestone',
              'Send discount emails to all solo users at day 20 to improve their conversion rate',
              'Add more features to the paid tier to make the upgrade more compelling',
            ],
            correct: 1,
            explanation: 'This is a classic PLG activation milestone signal: users who experience a specific behaviour (collaborative project) convert at 5x the rate of those who don\'t. The PLG response is to redesign onboarding to maximise the percentage of new users who reach that milestone in week 1 — not to incentivise non-activated users downstream. Discounts and feature additions don\'t address the root cause: users who haven\'t experienced the core value moment of your product aren\'t ready to pay for it.',
          },
          outputComparison: {
            label: 'PLG onboarding analysis: generic optimisation vs. activation-milestone-driven redesign',
            vague: {
              prompt: 'How can I improve user onboarding for my SaaS product?',
              output: 'Here are some ways to improve your SaaS onboarding:\n1. Make the signup process simpler\n2. Add an onboarding checklist\n3. Send welcome emails\n4. Create tutorial videos\n5. Add tooltips and in-app guidance\n6. Reduce the number of steps\n7. Add progress indicators\n8. Personalise the experience\nThese changes should help users get started faster and improve retention.',
            },
            improved: {
              prompt: 'I\'m optimising onboarding for a B2B project management tool with a freemium PLG model. Key data: (1) Users who create their first project with at least one collaborator in week 1 retain at 68% vs 23% for solo users at 90 days. (2) Currently only 31% of new users invite a collaborator in week 1. (3) Our current onboarding flow: signup → create account → product tour (5 steps) → empty project dashboard. The invitation feature is in Settings > Team. Using the PLG framework (activation milestone → time-to-value → expansion signals), help me: (1) confirm whether "first collaborative project" is the right activation milestone, (2) identify where in our current flow users likely lose momentum before reaching it, and (3) suggest 3 specific onboarding changes that move more users to the milestone in week 1.',
              output: 'Activation Milestone Validation:\n"First collaborative project" is a strong activation milestone candidate — the 68% vs 23% retention split is substantial and suggests collaboration is core to your product\'s value delivery, not just a feature. One thing to validate: are collaborative users retaining because collaboration drives value, or because teams with multiple users are more invested in any tool they adopt (selection bias)? Run a cohort analysis on users who invited a collaborator but didn\'t get them to join — if their retention is similar to solo users, the value is in actual collaboration, not just intent.\n\nWhere users lose momentum in your current flow:\n1. The 5-step product tour is a passive education experience with no activation task embedded. Users who complete it land on an empty dashboard with no prompting toward the specific action (invite a collaborator) that predicts retention. This is the highest-risk drop-off point.\n2. The invitation feature lives in Settings > Team — this is a maintenance area, not a workflow area. Users building their first project have no reason to navigate there unless prompted.\n3. "Empty project dashboard" is the most common PLG abandonment trigger. New users who see an empty state with no collaborators have no immediate social context for why the product is valuable.\n\n3 Specific Onboarding Changes:\n1. Replace the product tour with a "first project setup" wizard that embeds team invitation as step 2 of 4 — before the user reaches the dashboard. Framing: "Projects work best with your team. Who do you work with most on projects like this?" Pre-populate with email address suggestions if you have calendar integration.\n2. Redesign the empty dashboard state for solo users to show a "Waiting for your team" prompt with a one-click invite shortcut — make the absence of collaborators feel like an incomplete setup, not a starting point.\n3. Add a day-2 activation email specifically for solo users (no teammate invited): subject "Your project is waiting for your team" — single CTA to invite one person. This captures users who skipped the in-app invitation and adds a second chance at the activation milestone.',
            },
            insight: 'The vague prompt returns a generic onboarding checklist that could apply to any SaaS product — none of it is derived from the company\'s actual retention data. The specific version uses the 68% vs 23% retention split to validate the activation milestone, then identifies the three specific places in the current flow where that milestone is least likely to be reached, and generates targeted changes that address each friction point directly. The upgrade was providing the retention data and current onboarding flow — which grounded every recommendation in the actual product context.',
          },
          applyThisWeek: {
            action: 'Identify one user behaviour in your product that correlates strongly with better retention or conversion. This is your candidate activation milestone. Then map your current onboarding flow step by step and identify: where in the flow do users have the best opportunity to reach that milestone, and where does the flow create distance from it? Write one specific onboarding change that would move more users toward the milestone in week 1.',
            promptTemplate: 'I\'m optimising onboarding for [product type] with a [freemium / trial / PLG] model. Key data: users who [specific behaviour] retain at [X%] vs [Y%] for users who don\'t. Currently [Z%] of new users reach this milestone in week 1. My current onboarding flow is: [describe each step]. Using the PLG activation milestone framework: (1) confirm whether [behaviour] is the right activation milestone or suggest a better candidate, (2) identify where in the current flow users lose momentum before reaching it, (3) suggest [N] specific onboarding changes that move more users to the milestone in week 1.',
            tool: 'Claude',
          },
          reflection: 'What is the specific moment when a new user of your product first thinks "yes, this is worth my time"? Have you validated that this moment is actually happening for most users in week 1 — and if not, does your onboarding flow actively lead users toward it?',
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
          inlineCheck: {
            question: 'A junior PM uses AI to produce comprehensive PRDs, structured research summaries, and detailed competitive analyses that previously took senior PMs much longer to complete. What does this mean for senior PM career differentiation?',
            options: [
              'Senior PMs become less valuable as their production advantage narrows',
              'Senior PM differentiation shifts further toward the things AI cannot replicate: strategic context, stakeholder relationships, user proximity, and the judgment to know which problems are worth solving',
              'Senior PMs should avoid using AI so they maintain a production advantage over junior PMs',
              'The PM career ladder will flatten as AI eliminates skill-based differences between levels',
            ],
            correct: 1,
            explanation: 'When junior PMs can produce senior-quality documentation with AI assistance, the gap between levels narrows on production tasks — but widens on the dimensions AI cannot close: understanding why the company is making the strategic bets it is, knowing which user pain matters most in a product category, navigating organisational dynamics to get good decisions made, and exercising the taste that distinguishes a great product from a technically correct one. These are the dimensions that compound with experience and cannot be generated.',
          },
          outputComparison: {
            label: 'AI-era PM self-assessment: feature usage vs. career capital development',
            vague: {
              prompt: 'How should I use AI to advance my PM career?',
              output: 'Here are some ways to use AI to advance your PM career:\n1. Use AI to write better PRDs faster\n2. Use AI to analyse competitors\n3. Use AI to generate user stories\n4. Use AI to summarise meeting notes\n5. Stay updated on the latest AI tools\n6. Learn to prompt AI effectively\n7. Use AI to prepare for interviews\n8. Build AI features in your product\nUsing AI will make you more productive and competitive in the job market.',
            },
            improved: {
              prompt: 'I\'m a mid-level PM at a B2B SaaS company (3 years experience, working toward a senior role). I currently use AI for: writing first-draft PRDs, synthesising research notes, and drafting stakeholder emails. I want to use AI to build career capital, not just work faster. Based on the AI-era PM skills that compound in value (user proximity, strategic context, systems thinking, product taste), help me: (1) assess which of these I\'m developing vs. delegating to AI, (2) identify where I might be using AI in ways that atrophy rather than develop my PM judgment, and (3) suggest 3 specific practices that would use AI to do genuinely better work — not just faster work — over the next 90 days.',
              output: 'Assessment: What you\'re developing vs. delegating\n\nStrategic context: Using AI for PRDs and stakeholder emails creates a risk of drafting without deeply thinking through the strategic alignment. If you\'re generating content and then reviewing it rather than formulating your own view first, you may be outsourcing the thinking that builds strategic judgment. Green flag: if you consistently edit AI drafts to better reflect company strategy, you\'re exercising the judgment. Red flag: if AI drafts feel "good enough" without significant strategic editing.\n\nUser proximity: This is where the gap appears most clearly in your current AI usage. None of your three use cases (PRDs, research synthesis, emails) require you to be close to users — in fact, AI research synthesis could reduce your incentive to read raw transcripts, which is where the most nuanced user insight lives. Risk: using AI synthesis as a substitute for reading the actual interviews rather than a complement to it.\n\nProduct taste: Drafting with AI and editing develops taste only if you\'re consciously choosing between options and articulating why one is better. If you\'re accepting AI output with light edits, taste atrophies.\n\n3 Practices for Genuinely Better Work:\n1. Use AI to synthesise research, then read 3 raw transcripts yourself to test whether the synthesis captured what actually surprised you. This keeps you close to unfiltered user voice while getting synthesis speed.\n2. Before generating a PRD with AI, write a 5-bullet "my actual thinking" note covering: why this problem matters, who the user really is, and what trade-offs I\'m making. Measure how much AI changes vs. reflects your thinking.\n3. Use AI to generate 10 alternative framings for a problem you\'re working on, then defend your current framing against the best AI alternative to a colleague. The defence builds the strategic reasoning that\'s visible in senior PM work.',
            },
            insight: 'The vague prompt returns a list of AI use cases that a PM could adopt without thinking about whether each builds or replaces judgment. The specific prompt uses the four AI-era PM skills as a diagnostic lens and distinguishes between using AI to do faster work versus using AI to do better work — identifying specific risks of capability atrophy in the PM\'s current AI usage pattern. The upgrade was providing the specific career context and asking for an honest assessment of what each AI use case is developing versus delegating.',
          },
          applyThisWeek: {
            action: 'For each of your three most frequent AI use cases, ask yourself: "Am I exercising my PM judgment more or less because of this?" Write one sentence for each. Identify one use case where AI might be replacing thinking you should be doing yourself, and redesign how you use it to ensure the AI assists the thinking rather than skipping it.',
            promptTemplate: 'I\'m a [career stage] PM working on [product type]. I currently use AI for: [list your 3-5 main AI use cases]. I want to develop toward [specific career goal]. Based on the AI-era PM skills that compound in value (user proximity, strategic context, systems thinking, product taste): (1) which of these am I developing vs. potentially delegating to AI in my current usage? (2) where might I be using AI in ways that atrophy PM judgment over time? (3) suggest 3 specific practices that would use AI to do genuinely better work — not just faster work — over the next 90 days.',
            tool: 'Claude',
          },
          reflection: 'If AI handles an increasing share of the drafting and synthesis in your PM role, what would you do with that time that you currently can\'t afford? Is that the work that would most differentiate you in two years — and what\'s stopping you from doing more of it now?',
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
    {
      id: 'product-m6',
      title: 'AI-Native Product Strategy',
      description:
        'Design products for AI-assisted users, build LLM-powered features responsibly, understand agent-based architectures, and position yourself for the rapidly evolving role of the PM in the AI era.',
      lessons: [
        {
          id: 'product-m6-l1',
          title: 'Designing for AI-Assisted Users',
          duration: 17,
          description:
            'Learn the UX design principles that separate AI features users actually adopt from AI features that get ignored — and audit your own product against them.',
          content: `## How AI Changes the Way Users Interact with Products

The mental model users bring to most software was formed in the era of navigation and search: find the right screen, fill in the right fields, click the right button. AI breaks this model in two ways.

First, **conversation replaces navigation** for information-dense workflows. Instead of navigating to a report, filtering 15 dimensions, and reading a table, a user asks "what drove the revenue dip last Thursday?" The interface is language, not hierarchy.

Second, **generation replaces search** as the primary way to get a starting point. Instead of finding a template and adapting it, a user describes what they want and gets a draft. The blank page disappears.

These shifts are not incremental UI improvements — they change what "good UX" means for AI-powered features.

## Five UX Principles for AI-Augmented Workflows

**1. Progressive disclosure of AI capabilities**
Don\'t reveal all AI capabilities at once — users who are shown everything AI can do upfront adopt less, not more. Surface capabilities contextually, in the moment when they would help. The user who is staring at an empty form field is the right moment to offer "let AI draft this for you."

**2. User agency and control**
AI should feel like an assistant the user controls, not a system that acts for them. Design for: easy edit of AI output, clear undo paths, explicit confirmation before AI takes consequential actions. Users who feel in control of AI adopt it more and trust it more.

**3. Graceful failure when AI is wrong**
AI will be wrong sometimes — and how the product handles that failure determines whether the user trusts the feature long-term. The worst failure mode: AI is wrong and the user has no path to correct it. Design explicit failure recovery: "This doesn\'t look right? Edit here," or "Not helpful — tell me why."

**4. Trust calibration**
Users who over-trust AI miss errors; users who under-trust AI don\'t use the feature. Help users calibrate: show confidence levels where you have them, highlight where AI is drawing on limited information, and make verification easy. The goal is appropriate reliance, not maximum reliance.

**5. Show your work**
Users who understand why AI produced an output are better at judging whether to trust it. Where possible, make AI reasoning visible: "I suggested this because your last three projects used similar frameworks" or "Based on the user feedback from March and April, the top theme is X." Transparency drives adoption.

## The Adoption Curve Problem

Research from enterprise AI deployments consistently shows that users who understand AI use it 3× more than users who don\'t. The adoption problem in AI products is not capability — it\'s comprehension.

> "I am a PM designing the onboarding experience for an AI feature that drafts weekly status updates from project data. Users historically struggle to trust AI-generated content. Design a 3-step onboarding flow that: (1) sets accurate expectations about what the AI can and cannot do, (2) builds early trust through a low-stakes first interaction, (3) explains the editing workflow so users feel in control. Make it specific — not just principles but actual copy and interaction design."

## Emerging Standard Patterns for AI UX

As AI features mature across B2B products, some patterns are becoming standard:

- **Edit-not-generate:** AI produces a starting point; users edit, not approve/reject. Editing feels safer and results in better adoption than binary accept/reject.
- **Confidence indicators:** Subtle signals (a lighter text colour, a small indicator) that the AI is less certain about part of its output. Users learn to pay more attention to flagged content.
- **Inline suggestions over modal interruptions:** AI suggestions in context (like Google Docs suggesting completions) outperform modal "AI has a suggestion" interruptions in adoption and task completion rates.`,
          keyTakeaways: [
            'AI shifts user interaction from navigation → conversation and search → generation — UX must be designed for these new interaction models, not retrofitted from traditional UI',
            'Progressive disclosure of AI capabilities (contextual, in the moment) drives higher adoption than upfront feature showcases',
            'Graceful failure design is as important as the AI capability itself — users who experience a bad AI failure with no recovery path churn faster than users who never used the AI feature',
            'Users who understand AI use it 3× more — onboarding that builds comprehension, not just awareness, is the highest-leverage adoption investment',
            'Edit-not-generate, confidence indicators, and inline suggestions are emerging as standard patterns for AI UX because they preserve user agency',
          ],
          exercise: {
            title: 'AI Feature UX Audit',
            description:
              'Audit one AI feature in your product (or a competitor\'s) against 5 UX principles for AI-assisted design. Identify 2 improvements.',
            steps: [
              'Choose an AI feature in your product or a competitor product you use regularly (examples: Notion AI, GitHub Copilot, Grammarly, ChatGPT in a third-party integration)',
              'Open Claude and prompt: "Act as a UX reviewer specialising in AI product design. Evaluate the following AI feature against these 5 principles: progressive disclosure, user agency and control, graceful failure handling, trust calibration, and showing AI reasoning. Feature: [describe the feature in detail — what it does, how users invoke it, what it produces, how they interact with the output]. For each principle: rate the feature 1-5, describe what it does well and what is missing, and suggest one specific improvement."',
              'Review Claude\'s assessment — do you agree? Add your own observation from using the feature that the AI audit missed',
              'Select the 2 improvements with highest impact and lowest implementation complexity',
              'Draft a 3-sentence product brief for each improvement: the user problem, the proposed solution, and how you would measure success',
            ],
            tool: 'Claude',
          },
          inlineCheck: {
            question: 'A PM\'s AI drafting feature has a 40% adoption rate — users open the feature but 60% switch back to manual drafting immediately. Research shows the primary reason is that users don\'t trust the AI output. Which intervention is most likely to improve adoption?',
            options: [
              'Add a warning that users must review AI output carefully',
              'Make the AI output larger and more prominent so users engage with it more',
              'Redesign the interaction to show the AI\'s reasoning (sources, key themes it detected) alongside the draft, and make editing in-context easier than switching to manual drafting',
              'Reduce the AI feature\'s scope so it makes smaller suggestions that are easier to trust',
            ],
            correct: 2,
            explanation: 'When users distrust AI output, the intervention is transparency and friction reduction for editing — not warnings (which reinforce distrust) or prominence (which doesn\'t address the trust deficit). Showing the AI\'s reasoning (the data sources, the themes it extracted, the logic it applied) helps users calibrate their trust appropriately — they can see why the AI produced the output and judge whether that reasoning is sound. Making editing easy reduces the perceived cost of using AI: even if the draft isn\'t perfect, fixing it is faster than starting from scratch. These two interventions together address the actual problem (distrust and perceived high correction cost).',
          },
          outputComparison: {
            label: 'Vague vs. specific AI UX design prompt',
            vague: {
              prompt: 'How should I design the UX for an AI feature?',
              output: 'Designing UX for AI features requires careful consideration of user needs and expectations. Make sure users understand what the AI can do. Provide clear feedback when AI makes mistakes. Allow users to control and edit AI outputs. Consider progressive disclosure of features. Test with real users to understand adoption barriers. Overall, focus on building trust and making the AI feel helpful rather than threatening.',
            },
            improved: {
              prompt: 'I am the PM for a B2B project management tool. We are launching an AI feature that automatically drafts project status updates by reading task completion data, milestone progress, and recent comments. Users are project managers who currently write these manually and are protective of their voice and relationship with stakeholders. Design the UX for the initial AI invocation and the editing experience. Specifically: (1) how do we surface the AI capability at the right moment, (2) what does the user see when AI produces a draft — including how we show the AI\'s reasoning, (3) what editing affordances make it easy to adjust without starting over, (4) how do we handle the case where the AI misread the project status. Design this for a PM who is sceptical of AI replacing their work.',
              output: `**AI Status Update UX Design — Sceptical PM Persona**

**1. Surfacing the Capability (Progressive Disclosure)**
Do not add an "AI Status Update" button to the main nav — this signals "AI will do your job." Instead:
- When the PM opens a blank status update field, show a subtle inline prompt: *"Pull in this week\'s highlights? →"* (not "AI will write this for you")
- In the onboarding week only, show a non-intrusive coach mark on the first Friday: *"68% of your tasks closed this week. Want a starting point for your update?"*
- After first use, the CTA adapts: *"Same as last week: generate a draft from this sprint\'s data?"*

**2. The Draft Display (Showing Reasoning)**
Present the draft in an edit-first layout:
- Draft text in an editable field (not a preview modal — immediately editable)
- Collapsible sidebar: *"Where this came from"* — showing the 3-5 data points the AI used (task completions, milestone hit, top comment themes)
- Any section where data was sparse shows a subtle amber underline with tooltip: *"Limited data — you may want to verify this"*
- Opening line always editable first — this is where the PM\'s voice matters most

**3. Editing Affordances**
- Inline regeneration: highlight any sentence → *"Rewrite this section"* or *"Make this more concise"*
- Tone slider: "More formal / More conversational" — single click, instant regeneration of tone without changing facts
- "Replace with my version" — click any paragraph to replace with blank space that keeps the rest of the AI draft intact
- No "Accept All" button — accepting is done by submitting; editing is the default state

**4. AI Misread Handling**
When AI gets the status wrong (e.g., marks a milestone complete that is actually blocked):
- PM edits inline — no special flow needed if editing is easy enough
- After edit: *"Got it — should I remember this correction for future updates?"* (one-click yes/no)
- If PM deletes more than 60% of the draft: trigger one-time survey: *"What didn\'t work this time?"* — 2-option max (wrong data / wrong tone)`,
            },
            insight: 'The improved prompt specifies the product context, the exact feature, the user persona (sceptical, protective of their voice), and asks for specific UX — not principles. This gives Claude enough context to produce interaction design specifics: exact copy, specific affordances, the conditional logic for edge cases. The output is something a designer could actually work from. The vague prompt produces a list of UX principles you could find in any AI design article — useful for a first read, not for making product decisions.',
          },
          applyThisWeek: {
            action: 'Run the 5-principle UX audit on one AI feature in your product and write up findings as a product brief for the team.',
            promptTemplate: 'I am a PM at a [company type] building [product type]. We have an AI feature that [describe what it does]. Our adoption rate is [X%] and the main drop-off is [describe where users stop]. Audit this feature against the 5 AI UX principles (progressive disclosure, user agency, graceful failure, trust calibration, show your work) and recommend the 2 highest-impact changes to improve adoption.',
            tool: 'Claude',
          },
          reflection: 'Think about an AI feature you use regularly — what made you trust it enough to rely on it? Could you replicate that trust-building moment in your own product?',
          quiz: [
            {
              question: 'A PM is designing an AI feature that automatically categorises customer support tickets. Early testing shows 85% accuracy. Which UX design decision is most important for this accuracy level?',
              options: [
                'Hide the AI categorisation from support agents so they process tickets without bias',
                'Display the AI categorisation with a confidence level, make it easy to correct with one click, and track correction rates to identify systematic errors',
                'Only show AI categorisation when it is 95% confident, hiding it otherwise',
                'Display a warning on every AI-categorised ticket to ensure agents review it',
              ],
              correct: 1,
              explanation: 'At 85% accuracy, AI is genuinely useful but wrong 15% of the time. The right design: show the categorisation (it\'s right most of the time), show confidence so agents learn when to be more careful, make correction trivially easy (one click to recategorise), and track corrections to find systematic errors that training data can fix. Hiding AI from agents eliminates the human oversight benefit. Hiding low-confidence categorisations creates inconsistent experiences. Warnings on every ticket create alert fatigue and undermine trust even on the 85% of accurate categorisations.',
            },
            {
              question: 'Research shows your AI writing assistant has 40% adoption among new users in the first week, but 85% adoption among users who complete the interactive tutorial. The tutorial takes 8 minutes. What does this data suggest?',
              options: [
                'The tutorial should be mandatory for all users to force 85% adoption',
                'The comprehension gap between tutorial-completers and non-completers is the primary adoption driver — invest in shorter, contextual education moments throughout onboarding rather than a single 8-minute tutorial',
                'The AI feature is not good enough and should be improved before focusing on adoption',
                'The 40% who don\'t do the tutorial are not the target user for this feature',
              ],
              correct: 1,
              explanation: 'The data clearly shows comprehension, not capability, drives adoption — consistent with the finding that users who understand AI use it 3× more. But making an 8-minute tutorial mandatory will create friction and resentment, and completion rates will drop. The more effective intervention: extract what the tutorial teaches (likely: what the AI can do, how to invoke it, how to edit output) and deliver those insights in context, at the moment the user would benefit. Progressive, contextual education achieves the comprehension benefit without the upfront investment barrier.',
            },
            {
              question: 'A user edits 80% of AI-generated content before sending it. A stakeholder argues this proves the AI feature is not working. What is the PM\'s best response?',
              options: [
                'Agree — an effective AI feature should require minimal editing',
                'Editing rate is the wrong metric: if users are editing and sending (not deleting and starting over), AI is delivering value. The metric to watch is time-to-complete-task and user satisfaction — high edit rates with fast completion times indicate AI is successfully providing a useful starting point',
                'The AI model should be retrained to require less editing',
                'The 80% edit rate is a product failure that requires a full feature redesign',
              ],
              correct: 1,
              explanation: 'Edit-not-generate is actually a design principle, not a failure mode. Users editing AI output is expected and healthy — it means AI is providing a starting point that users refine, which is faster than starting from scratch. The relevant metrics are: task completion time (is the user faster with AI than without?), user satisfaction (do users feel the AI is helpful?), and abandonment rate (do users delete the AI output entirely and start over?). High edit rates combined with fast completion and high satisfaction indicate a well-functioning AI assist feature. Low edit rates could actually indicate over-trust — users accepting AI output without appropriate review.',
            },
          ],
        },
        {
          id: 'product-m6-l2',
          title: 'Building LLM-Powered Features Responsibly',
          duration: 18,
          description:
            'Write product requirements that actually work for LLM features — covering failure modes, evaluation criteria, and the cost-quality-latency tradeoffs that determine whether your feature ships successfully.',
          content: `## Why LLM Features Are Different to Specify

Traditional feature requirements describe what the system should do in the happy path. LLM feature requirements must describe what the system should do when the AI is wrong — because the AI will be wrong, in ways that are sometimes predictable and sometimes not.

This requires a different way of thinking about product requirements. Instead of "the system produces X," you need "the system produces X when input is Y, produces Z gracefully when input is ambiguous, and does W when the AI output fails quality thresholds." The failure modes are part of the feature.

## The PM\'s Guide to LLM Technical Risks

You don\'t need to understand transformers to be an effective PM on LLM features. You do need to understand these five risks well enough to specify against them:

**1. Hallucination**
LLMs generate plausible-sounding content that is factually wrong. For features that rely on factual accuracy (legal research, medical information, financial data), hallucination is a critical failure mode. Requirement: specify what happens when the LLM produces uncertain content — show a confidence indicator, cite sources, require human verification for high-stakes outputs.

**2. Prompt Injection**
Malicious users can include text in their inputs designed to override the system prompt and make the AI behave in unintended ways. For any user-facing LLM feature where users provide free-text input, this is a security concern. Requirement: specify input sanitisation, output monitoring for anomalous responses, and what constitutes a security incident.

**3. Cost Blowouts**
LLM API costs scale with token count. A feature that works fine in testing can become economically unviable at scale if users input long documents or trigger multi-step reasoning. Requirement: specify token budgets, cost per user session at P50 and P99, and the trigger for cost review.

**4. Latency**
LLMs are slow relative to traditional APIs — even fast models may take 5-15 seconds for complex outputs. For synchronous user-facing features, this is a UX problem. Requirement: specify maximum acceptable latency, streaming requirements (showing output as it generates), and the fallback when latency exceeds threshold.

**5. Model Deprecation**
LLM providers deprecate models. If your feature is built on GPT-4-turbo-2024-04-09 and that model is deprecated, your feature breaks. Requirement: specify model versioning strategy, testing requirements when models are upgraded, and the communication plan for performance changes after model updates.

> "I am a PM writing requirements for an LLM feature that [describe feature]. Help me write the failure mode specifications covering: (1) the specific hallucination risk in this feature and how the UX handles it, (2) the prompt injection risk surface and mitigation, (3) the token cost model at 1K, 10K, and 100K monthly active users, (4) the latency requirement and streaming strategy, (5) the model versioning plan. Make each specification concrete enough for an engineer to implement."

## Evaluation Frameworks: How to Know It\'s Good Enough

The hardest question in LLM product development: when is the feature good enough to ship? Traditional feature QA (does the button work? does the form submit?) doesn\'t apply to probabilistic AI outputs.

A practical evaluation framework has three components:

**Human evaluation (gold standard):** A panel of domain experts rates a sample of AI outputs on the dimensions that matter (accuracy, helpfulness, tone, safety). Establish a baseline score and a minimum acceptable score for launch.

**Automated metrics:** Where ground truth exists, measure it. Factual accuracy against a verified dataset, precision/recall for classification features, BLEU/ROUGE scores for summarisation. These run continuously, not just at launch.

**Production monitoring:** Track correction rates (how often users edit AI output), abandonment rates (how often users delete AI output and start over), and negative feedback signals. These are leading indicators of quality problems in production.

## The Cost-Quality-Latency Tradeoff

Every LLM feature involves a three-way tradeoff:

- **Better quality** (larger models) → higher cost and slower latency
- **Lower cost** (smaller, cheaper models) → lower quality
- **Lower latency** (smaller models or aggressive caching) → lower quality or cost

The PM\'s job is to decide where to sit on this tradeoff based on the use case:
- A real-time AI writing assistant needs low latency → favour speed over depth
- A once-daily AI analysis report needs high quality → favour quality over latency
- A high-volume, low-margin AI feature needs low cost → constrain model choice accordingly`,
          keyTakeaways: [
            'LLM feature requirements must specify failure modes explicitly — hallucination handling, prompt injection mitigation, cost ceilings, latency thresholds, and model versioning are all specifiable',
            'The five technical risks to understand as a PM: hallucination, prompt injection, cost blowouts, latency, and model deprecation — each requires a specific requirement, not a general "be careful" note',
            'Ship only when you have an evaluation framework: human evaluation baseline, automated metrics where ground truth exists, and production monitoring for correction and abandonment rates',
            'The cost-quality-latency tradeoff is a PM decision, not an engineering one — your use case determines where to sit on the tradeoff',
            'Model versioning strategy belongs in the PRD: what gets tested when the model is updated, and who owns the decision to deploy a model change',
          ],
          exercise: {
            title: 'LLM Feature Product Requirements Document',
            description:
              'Write a product requirements document for one LLM-powered feature, including failure mode specifications and evaluation criteria.',
            steps: [
              'Choose an LLM feature you are working on, have worked on, or are considering — it should be specific enough to write real requirements (not "an AI assistant" but "an AI that summarises customer support tickets for Tier 1 agents")',
              'Open Claude and prompt: "I am a PM writing a PRD for an LLM feature: [describe the feature]. Write the technical requirements section covering: (1) happy path specification — what a good output looks like and how we measure it, (2) failure mode specifications for each of the five LLM risks (hallucination, prompt injection, cost, latency, model deprecation), (3) evaluation framework — the human evaluation methodology, the automated metrics, and the production monitoring plan, (4) cost model at 1K, 10K, and 100K MAU, (5) model selection rationale and versioning strategy."',
              'Review the PRD section — identify any failure modes specific to your feature that Claude missed',
              'Add the UX specifications: what does the user see when each failure mode occurs?',
              'Share the draft with one engineer on your team and ask: is there anything unspecified that would block implementation?',
            ],
            tool: 'Claude',
          },
          inlineCheck: {
            question: 'Your AI customer support feature achieves 90% accuracy in internal testing with a team of 5 people evaluating 100 outputs. Before launch to 50,000 users, what is the most important gap in your evaluation framework?',
            options: [
              'The sample size of 100 is large enough — 90% accuracy is sufficient to launch',
              'The evaluation panel is too small, but accuracy is the right metric',
              'Internal testing with a small expert panel does not capture: the distribution of real user inputs (which will be messier and more varied than test cases), the failure modes that appear at scale, or how users actually respond to the 10% error rate in production — production monitoring must be in place before launch',
              'The feature should reach 100% accuracy before any launch',
            ],
            correct: 2,
            explanation: 'Internal testing with a curated sample is a necessary but insufficient evaluation step. The gaps before a 50K user launch: (1) distribution gap — internal testers use representative cases; real users use edge cases, adversarial inputs, typos, and use cases you didn\'t anticipate; (2) scale gap — failure modes that appear 0.1% of the time are invisible at 100 samples but generate 50 daily incidents at 50K users; (3) production response gap — you don\'t know how users react to errors until you see real correction and abandonment rates. The right approach: soft launch to 1-5% of users with production monitoring instrumented, establish correction and abandonment rate baselines, then ramp.',
          },
          outputComparison: {
            label: 'Vague vs. specific LLM feature requirements prompt',
            vague: {
              prompt: 'Write requirements for an AI summarisation feature',
              output: 'The AI summarisation feature should produce accurate and relevant summaries of input content. The summary should be concise and capture the key points. Users should be able to edit the summary if needed. The system should handle errors gracefully. Performance should be acceptable for users. Cost should be monitored. The feature should be tested before launch.',
            },
            improved: {
              prompt: 'I am a PM at a legal tech company. Write the technical requirements section for an AI feature that summarises case documents (10-150 pages) for junior lawyers, highlighting key facts, legal issues identified, and recommended next steps. The feature is used in a UK law firm context where accuracy is critical and hallucination is a material professional risk. Requirements must cover: happy path output specification with quality criteria, all five LLM risk mitigations (hallucination, prompt injection, cost, latency, model deprecation), evaluation framework, and cost model at 500, 5K, and 50K monthly summaries.',
              output: `**AI Case Document Summariser — Technical Requirements**

**Happy Path Output Specification**
Output must include: (1) factual chronology — key events in date order, (2) legal issues identified — list of issues flagged for lawyer review, (3) recommended next steps — suggested actions with rationale, (4) document confidence level — overall and per-section. Quality bar: evaluated by a panel of 3 junior lawyers against ground truth summaries; minimum score: 4.2/5 on accuracy, 4.0/5 on relevance, 4.5/5 on professional safety (no recommendations that could constitute unauthorised legal advice).

**Hallucination Mitigation**
- Every factual claim in the summary must be followed by a footnote citation to the source page in the original document (e.g., "Claimant signed the agreement on 3 March 2022 (p.47)")
- Any section where the model\'s confidence is below threshold must be visually flagged: amber highlight with tooltip "Limited source material — verify this section"
- Legal issue identification must be framed as "potential issues for lawyer review," never as legal conclusions
- Failure mode UX: sections with insufficient source support display "Insufficient information to summarise this section — original document review required"

**Prompt Injection Mitigation**
- All document text is processed as data context, not as instruction. System prompt architecture separates instruction context from document context
- Output monitoring: automated flag for any output containing instruction-like language ("ignore previous," "you are now," "system prompt") — routed to security review queue
- Rate limiting: maximum 20 summarisations per user per hour to limit automated abuse

**Cost Model**
- Model selection: [Model A] at £0.003/1K tokens for standard documents; [Model B] at £0.012/1K tokens for documents flagged as high-complexity (>100 pages, multiple claimants)
- Average document: 30 pages ≈ 15,000 tokens input + 1,500 tokens output = £0.055 per summary at standard tier
- 500/month: £27.50 COGS | 5,000/month: £275 | 50,000/month: £2,750
- Cost alert threshold: trigger review if average cost per summary exceeds £0.08 (indicating documents longer than expected)

**Latency Requirements**
- Maximum acceptable: 45 seconds for a 30-page document (synchronous generation with streaming)
- Streaming: display summary sections as generated (chronology first, issues second, next steps third) — user sees progress within 5 seconds
- Fallback: if generation exceeds 90 seconds, return partial summary with notification "Full analysis still processing — we\'ll notify you when complete"

**Model Versioning**
- Feature pinned to specific model version (not "latest")
- Model upgrade protocol: (1) automated regression test on 50-case gold standard, (2) human review of flagged differences, (3) PM approval required before upgrade
- Communication plan: notify firm admin 14 days before any model change`,
            },
            insight: 'The improved prompt specifies the industry context (legal tech, professional risk), the use case (case documents, junior lawyers), the specific quality criteria that matter (professional safety, hallucination risk), and asks for all five risk dimensions plus cost at multiple scales. The result is a requirements section that an engineer could implement and a QA team could test against — not a wishlist. The vague prompt produces requirements so generic they could describe any AI feature ever built.',
          },
          applyThisWeek: {
            action: 'Write the failure mode specifications for an LLM feature currently in development or planning at your company — share with the engineering lead and ask what is missing.',
            promptTemplate: 'I am a PM at a [company type] building an LLM feature that [describe the feature]. Write the failure mode specifications covering: (1) the specific hallucination risk and UX response, (2) the prompt injection surface and mitigation, (3) the cost model at [X], [Y], [Z] monthly active users, (4) the latency requirement and streaming strategy, (5) the model versioning and change management plan.',
            tool: 'Claude',
          },
          reflection: 'What is the most expensive LLM failure mode for your current product — the one that would cost the most in user trust, revenue, or safety if it occurred at scale?',
          quiz: [
            {
              question: 'A PM decides to use the largest, most capable LLM model for a feature that suggests emoji reactions to Slack messages. What is wrong with this decision?',
              options: [
                'Nothing — the largest model always produces the best output',
                'The cost-quality-latency tradeoff is misaligned: a high-quality, expensive, slow model is inappropriate for a low-stakes, high-frequency, latency-sensitive feature where a smaller, cheaper, faster model would produce equivalent user value',
                'The largest models are not capable of emoji tasks',
                'The decision is only wrong if the cost exceeds budget — if cost is not a concern, the largest model is always the right choice',
              ],
              correct: 1,
              explanation: 'The cost-quality-latency tradeoff must match the use case. Emoji reaction suggestions are: low-stakes (a wrong emoji recommendation causes no harm), high-frequency (many calls per user per day), and latency-sensitive (users expect instant suggestions in a chat interface). A small, fast, cheap model that gets emoji suggestions right 80% of the time is a better product decision than a large, slow, expensive model that gets it right 95% of the time. The PM\'s job is to make this tradeoff explicitly, not default to "biggest model = best."',
            },
            {
              question: 'Your LLM feature\'s production monitoring shows: users correct AI output 12% of the time (down from 18% at launch), and they abandon AI output entirely 5% of the time. How should you interpret this data?',
              options: [
                'The 12% correction rate is too high — the feature needs significant quality improvement before continuing',
                'The trend (correction rate falling from 18% to 12% over time) and the low abandonment rate (5%) suggest a healthy feature: quality is improving, users are finding the output useful enough to edit rather than discard, and adoption is likely growing',
                'The data is inconclusive — you need to stop the feature and conduct user interviews',
                'The abandonment rate of 5% is the critical metric — this represents complete AI failure and must be reduced to zero before the feature is considered successful',
              ],
              correct: 1,
              explanation: 'The data paints a healthy picture. Declining correction rate (18% → 12%) indicates quality improvement over time — likely from model improvements, prompt engineering, or better scope definition. A 5% abandonment rate means 95% of users who engage with AI output find it worth editing rather than discarding, which is a strong signal of value delivery. Edit-not-generate is the intended interaction model; a 12% correction rate is not a problem, it is evidence that users are engaging with the AI output as a starting point. The metric to worry about would be a rising abandonment rate or negative satisfaction scores.',
            },
            {
              question: 'An engineer tells a PM that the team should build the LLM feature to automatically upgrade to the latest model version whenever the provider releases one. What is the PM\'s correct response?',
              options: [
                'Agree — using the latest model ensures the best possible quality at all times',
                'Disagree — model updates must be treated as releases that go through regression testing and PM approval, because model changes can alter output style, accuracy, and safety in ways that break the product experience for users',
                'Agree, but only for minor model updates — major version changes should require approval',
                'Defer to the engineering team — model versioning is a technical decision, not a product decision',
              ],
              correct: 1,
              explanation: 'Auto-updating to the latest LLM model is a high-risk practice that several teams have discovered the hard way: when OpenAI or Anthropic updates a model, the output style, length, format, and quality profile can change significantly. A feature tuned to produce 3-bullet summaries may start producing 7-bullet summaries after a model update. A feature with specific safety-filtered outputs may become more or less conservative. Model updates must be treated as deployments: regression test against a gold standard, review flagged differences, PM approval before production. This is a product decision because model changes affect user experience — not a pure engineering call.',
            },
          ],
        },
        {
          id: 'product-m6-l3',
          title: 'Agent-Based Product Architecture',
          duration: 16,
          description:
            'Build a PM\'s mental model for AI agents — what makes them different, where they fail, and how to spec an agent feature with the right autonomy level and failure recovery design.',
          content: `## What an AI Agent Is in Product Terms

An AI agent is not a smarter chatbot. The structural difference is consequential: a chatbot generates text in response to input; an agent takes actions in the world.

An agent has access to tools: it can search the web, run code, call APIs, send emails, modify documents, or trigger workflows. When you ask an agent to "schedule a meeting with the team," it doesn\'t suggest a time — it checks everyone\'s calendar, drafts an invitation, and sends it. The output is an action, not a suggestion.

This changes everything about how you design, specify, and govern an agent feature.

## The PM\'s Mental Model for Agent Architecture

Four components define what an agent can do:

**Tools:** The specific capabilities the agent can invoke. A customer support agent might have tools for: querying the order management system, issuing refunds up to $X, sending email to customers, escalating to a human agent, and tagging tickets. What you put in the tool list defines the agent\'s power — and its risk surface.

**Memory:** What the agent knows and remembers. Short-term memory (context within a conversation), long-term memory (stored facts about a user or case), and retrieval (ability to search documents or databases). More memory = more personalised and coherent behaviour; more memory also = more privacy surface.

**Planning:** How the agent decides what to do. Simple agents follow a fixed flow; sophisticated agents decompose a goal into steps and execute them in sequence, adapting when steps fail. For product design, the critical question is: does the agent plan one step at a time (lower risk, more controllable) or does it plan multi-step sequences before executing (higher capability, harder to intercept)?

**Action:** What the agent does with its plan. The irreversibility of actions is the key design variable: reading data is reversible (it has no effect); sending an email is not reversible; deleting a record is not reversible; charging a credit card is not reversible. Design the highest autonomy for reversible actions and the highest human oversight for irreversible ones.

## The Design Questions Unique to Agent Products

> "I am designing an agent feature that [describe the agent and its tools]. Help me think through: (1) which actions should the agent take autonomously vs. require user confirmation, (2) what the failure recovery looks like when an agent action produces an unexpected result, (3) how users will understand what the agent is doing and why, (4) what the audit trail looks like for agent actions, (5) what happens when the agent gets stuck — the escalation path."

**Autonomy calibration:** The spectrum from "suggest and wait for approval" to "execute without asking." The right level depends on: action reversibility (irreversible = high oversight), user trust level (new users = more confirmation), stakes of the domain (medical/financial = more oversight regardless of trust).

**Trust and transparency:** Successful agent products show their work. A travel booking agent that says "I found 3 options and chose this one because it matched your preference for direct flights and morning departures" creates more trust than one that just books. Visibility into agent reasoning is not a nice-to-have — it\'s a trust infrastructure investment.

**Failure recovery:** An agent that gets stuck can be more damaging than a feature that returns an error. Design for: explicit stuck states ("I need more information to proceed — here\'s what I\'m missing"), rollback capability for reversible actions, and clear escalation paths to human agents.

## Where Agent Products Fail

Three failure patterns that have caused agent product launches to underperform:

**Too autonomous:** The agent takes actions users didn\'t expect and can\'t undo. One bad experience (agent sent an email the user didn\'t want) destroys trust across the whole feature. Solution: start conservative, earn autonomy through demonstrated trust.

**Too unpredictable:** The agent behaves inconsistently — sometimes does step X automatically, sometimes asks for permission. Users can\'t build a mental model of what the agent will do, so they stop relying on it. Solution: make autonomy rules explicit and consistent.

**Too slow:** Multi-step agent execution takes 30-60+ seconds. Without progress visibility, users don\'t know if the agent is working or broken. Solution: stream agent steps to the user as they execute, with a real-time log of what the agent is doing.

## Speccing an Agent Feature: What\'s New in the Requirements

Beyond standard LLM requirements, agent features need:
- **Tool manifest:** exact list of tools, parameters, and constraints (e.g., "can issue refunds up to $50 without approval")
- **Autonomy policy:** explicit rules for which actions require confirmation, which are autonomous
- **Audit log specification:** every agent action logged with reasoning, timestamp, user context
- **Rollback specification:** which actions can be undone and by whom
- **Stuck state specification:** what the agent does when it cannot proceed`,
          keyTakeaways: [
            'An AI agent takes actions in the world — it has tools that let it call APIs, modify data, send communications, and trigger workflows — which makes failure modes fundamentally different from chatbot features',
            'Four agent architecture components for PMs: tools (what it can do), memory (what it knows), planning (how it decides), and action (what it executes) — each is a product design decision, not just an engineering one',
            'Autonomy calibration maps to action reversibility: give maximum autonomy to reversible, low-stakes actions; require explicit confirmation for irreversible or high-stakes actions',
            'Three agent failure patterns: too autonomous (unexpected irreversible actions), too unpredictable (inconsistent autonomy rules), and too slow with no progress visibility',
            'Agent feature requirements need additions beyond standard LLM PRDs: tool manifest with constraints, autonomy policy, audit log specification, rollback specification, and stuck-state escalation path',
          ],
          exercise: {
            title: 'Agent Architecture Design for a Product Feature',
            description:
              'Design the agent architecture for one feature in your product — define the tools it has access to, the decisions it makes autonomously vs escalates, and the failure recovery.',
            steps: [
              'Identify a feature in your product that could be rebuilt as an agent (examples: a customer support flow, an onboarding automation, a data analysis workflow, a scheduling feature)',
              'Open Claude and prompt: "I am a PM designing an agent feature for [describe the product and feature]. Design the agent architecture covering: (1) the complete tool manifest — every capability the agent needs and the constraints on each (e.g., can send email but only to users in the system, can issue refunds up to $25), (2) the autonomy policy — a table of every action type mapped to: autonomous / confirm-once / confirm-every-time, (3) the memory requirements — what the agent needs to remember within a session and across sessions, (4) failure recovery — what the agent does when a tool call fails, when it gets stuck, and when an action produces an unexpected result, (5) the audit log specification."',
              'Review the tool manifest — are there any capabilities the agent would need that are missing? Any capabilities listed that you\'d actually want to restrict?',
              'Review the autonomy policy — is there any action mapped as "autonomous" that you\'d want to add a confirmation step for?',
              'Draft the user-facing transparency design: how does the user know what the agent is doing at each step?',
            ],
            tool: 'Claude',
          },
          inlineCheck: {
            question: 'An AI agent has been given access to the following tools: search customer database, retrieve order history, issue refunds up to $100, send email to customer, and escalate to human agent. A customer asks the agent to "cancel my last 5 orders and refund them all." Which action should require explicit user confirmation before execution?',
            options: [
              'Searching the customer database and retrieving order history',
              'Sending the confirmation email after cancellation',
              'Issuing 5 separate refunds (potentially up to $500 total) — this exceeds per-transaction limits, is irreversible, and the cumulative impact is significantly higher than the agent\'s individual refund authority',
              'Escalating to a human agent',
            ],
            correct: 2,
            explanation: 'The per-transaction refund limit ($100) exists precisely to constrain autonomy for high-value irreversible actions. Five refunds totalling up to $500 is qualitatively different from a single $100 refund: it exceeds the autonomy threshold by 5×, it\'s irreversible (refunds issued cannot easily be reversed), and the user\'s request ("cancel my last 5 orders") may reflect a misunderstanding of what they want. The correct agent design: retrieve and display the 5 orders with total refund value, explicitly confirm "I will issue refunds totalling $X — shall I proceed?", and then execute after confirmation. Searching and reading data is appropriately autonomous; large irreversible financial actions require human confirmation.',
          },
          outputComparison: {
            label: 'Vague vs. specific agent architecture design prompt',
            vague: {
              prompt: 'Design an AI agent for customer support',
              output: 'An AI agent for customer support could handle common customer inquiries automatically. It would use natural language processing to understand customer questions and provide relevant answers. The agent could escalate complex issues to human agents. It should be able to access customer data to provide personalised responses. The agent should be designed to handle multiple customers simultaneously. Regular monitoring and improvement would be important.',
            },
            improved: {
              prompt: 'I am a PM at a B2B SaaS company (project management software, 15K business customers, average contract $8K/year). Design an AI support agent for our Tier 1 support queue. Currently Tier 1 handles: password resets (30% of volume), billing questions — invoice copies, plan changes (25%), integration troubleshooting — Slack, GitHub, Jira (20%), and feature questions (25%). Design the agent architecture: (1) complete tool manifest with specific constraints, (2) autonomy policy mapping each action type, (3) stuck-state escalation (when to hand off to human Tier 1), (4) the audit log structure, (5) user-facing transparency — what does the customer see as the agent works?',
              output: `**AI Support Agent Architecture — B2B SaaS Tier 1**

**Tool Manifest**
| Tool | Capability | Constraints |
|---|---|---|
| user_lookup | Retrieve user/account details | Read-only; accessible to agent automatically |
| password_reset | Trigger password reset email | Max 3 per user per 24h; log all resets |
| invoice_retrieve | Fetch and send invoice copies | For verified account owner only |
| plan_query | Return current plan details and options | Read-only |
| plan_change | Upgrade plan | Autonomous up to next tier; downgrades → human Tier 1 (revenue risk) |
| integration_docs | Search and return relevant integration documentation | Unrestricted |
| integration_test | Run connectivity test for Slack/GitHub/Jira | Requires user confirmation (creates test data) |
| ticket_escalate | Escalate to human Tier 1 with full context | Automatic trigger conditions below |
| session_log | Append to audit log | Always on; no constraints |

**Autonomy Policy**
- Autonomous (no confirmation): user_lookup, invoice_retrieve, integration_docs, password_reset (within limits)
- Confirm-once: plan_change (upgrade), integration_test
- Human Tier 1 required: plan_change (downgrade), any request mentioning "cancel," "refund," "legal," "complaint," or frustrated sentiment detected

**Stuck-State Escalation Triggers**
Auto-escalate when: (1) same issue unresolved after 3 agent turns, (2) customer explicitly requests human, (3) required tool fails twice consecutively, (4) issue type not in Tier 1 scope, (5) customer sentiment score below threshold for 2 consecutive turns. Escalation handoff includes: full conversation transcript, tools called and results, agent assessment of issue type, and recommended Tier 1 action.

**Audit Log Structure**
Each agent session logs: session_id, user_id, account_id, timestamp, each tool called (with parameters and result), autonomy policy applied, escalation trigger if fired, and resolution classification.

**Customer-Facing Transparency**
- Agent identifies itself as AI at session start: "I\'m an AI assistant — I can handle most Tier 1 requests instantly, or connect you with our team."
- During multi-step actions: real-time status ("Checking your account... Found your March invoice... Sending to [email]...")
- Before any confirmation-required action: "I\'m about to [specific action]. Shall I proceed?" with summary of what will happen
- At escalation: "This one needs a human — I\'ve sent your Tier 1 specialist the full context so you won\'t need to repeat yourself. Average wait: [X] minutes."`,
            },
            insight: 'The improved prompt specifies the company context (B2B SaaS, contract value, customer type), the exact support ticket distribution by type, and asks for concrete architectural outputs rather than general guidance. The result is an architecture a team could actually build from: specific tools with specific constraints, explicit autonomy policy rules, defined escalation triggers, and a customer-facing transparency design. The vague prompt produces content that could describe any support chatbot built in the last five years.',
          },
          applyThisWeek: {
            action: 'Map one manual workflow in your product that could be agent-automated and produce the tool manifest and autonomy policy for it.',
            promptTemplate: 'I am a PM at a [company type] building [product type]. A workflow our users currently do manually is [describe workflow in detail — steps, decisions, systems involved]. Design the agent architecture for automating this workflow: the complete tool manifest with constraints, the autonomy policy for each action type, the stuck-state escalation path, and the user-facing transparency design.',
            tool: 'Claude',
          },
          reflection: 'What is the highest-value workflow in your product that users currently perform manually — and what would need to be true about user trust and system reliability before you would make an agent autonomous in that workflow?',
          quiz: [
            {
              question: 'A travel booking agent has been running for 3 months. Data shows: 40% of users say the agent "sometimes books things they didn\'t want." The PM proposes fixing this by making the agent ask for confirmation before every action. What is the flaw in this approach?',
              options: [
                'No flaw — confirmation before every action is the safest design',
                'Confirmation before every action eliminates the agent\'s core value proposition (autonomous execution) and degrades the experience to a guided form-filling exercise. The fix is to identify the specific action types causing unintended bookings and add confirmation only for those, while keeping autonomous execution for actions users consistently approve',
                'The PM should reduce the agent\'s tool access rather than adding confirmations',
                'The problem is the AI model quality, not the autonomy policy',
              ],
              correct: 1,
              explanation: 'Blanket confirmation for every action is a product failure in the other direction: it makes the agent so cautious it provides no value over manual booking. The data points to a specific problem — some action types are generating unintended outcomes — which calls for a targeted intervention, not a system-wide one. The PM should analyse which action types correlate with the "didn\'t want this" feedback, add confirmation specifically to those actions, and keep autonomous execution for the action types that users consistently approve. This preserves the agent\'s value while fixing the specific trust breakdown.',
            },
            {
              question: 'A user asks an agent: "Send an email to all our customers announcing our new pricing." The agent has access to the customer email list and an email-sending tool. There are 50,000 customers. What should the agent do?',
              options: [
                'Execute immediately — the user gave a clear instruction',
                'Refuse — sending mass emails is outside the agent\'s scope',
                'Confirm the action with specifics before executing: show the user the number of recipients, a draft of the email, and the irreversibility of the action — requiring explicit confirmation before sending a mass communication that cannot be unsent to 50,000 contacts',
                'Send to 10 customers first as a test, then ask if the user wants to proceed',
              ],
              correct: 2,
              explanation: 'Mass email to 50,000 contacts is one of the highest-stakes irreversible actions an agent could take: it cannot be unsent, it affects tens of thousands of real customers, and a pricing announcement has revenue and legal implications. The correct design: pause before execution, surface the full scope (50,000 recipients), generate a draft for review, and require explicit confirmation. The user may not have realised the agent had access to the full customer list, may want to review the email first, or may want to send a test to a subset first. Confirm-before-execute for irreversible, high-stakes actions is a core agent design principle, not an optional feature.',
            },
            {
              question: 'Two engineering approaches are proposed for an agent planning system: (A) the agent plans all steps upfront and executes the full sequence, or (B) the agent plans and executes one step at a time, checking in after each consequential action. Which approach is generally preferable for a new agent feature and why?',
              options: [
                'Approach A — planning all steps upfront is more efficient and produces better outcomes',
                'Approach B — executing one step at a time with checkpoints is generally preferable for new agent features because it creates more interception points, reduces the blast radius of errors, and builds user trust through demonstrated step-by-step competence before earning broader autonomy',
                'Both approaches are equivalent — the choice is a pure engineering decision',
                'Approach A is preferable if the agent is accurate, Approach B if it is less accurate',
              ],
              correct: 1,
              explanation: 'For a new agent feature, step-by-step execution with checkpoints is the safer product approach for several reasons: (1) blast radius reduction — if the agent makes an error at step 3 of 5, only steps 1-3 have executed, not all 5; (2) interception opportunity — users can stop the sequence before it completes; (3) trust building — users who see each step build confidence in the agent before it has earned broad autonomy; (4) debugging — step-by-step execution makes it much easier to identify where in a multi-step flow something went wrong. As the agent earns trust and demonstrates competence, you can progressively reduce checkpoint frequency for well-understood action sequences.',
            },
          ],
        },
        {
          id: 'product-m6-l4',
          title: 'The PM\'s Role in the AI Era',
          duration: 19,
          description:
            'Understand how the PM role is evolving, which skills to invest in, and how to build the career capital that will be most valuable as AI reshapes the product profession.',
          content: `## How the PM Role Is Actually Changing

The first thing to understand about AI\'s impact on product management is that it is not uniform. AI is not simply making PMs "10× more productive" at everything — it is making some parts of the job dramatically faster and leaving other parts entirely unchanged.

**Parts of the PM role AI accelerates:**
- Document drafting (PRDs, one-pagers, update emails, user stories)
- Qualitative research synthesis (summarising interview recordings, clustering feedback themes)
- Competitive analysis (aggregating public information, identifying patterns)
- First-pass data analysis (interpreting dashboards, surfacing anomalies to investigate)
- Communication drafting (stakeholder updates, launch announcements, escalations)

**Parts of the PM role AI does not materially change:**
- Strategic judgment: deciding what to build and why, given organisational constraints AI doesn\'t understand
- User proximity: the relationship intuition built from spending time with real users
- Stakeholder navigation: the political and relational work of aligning organisations
- Taste: knowing what a great product experience feels like, and caring when it falls short
- Ethical judgment: deciding what your product should and shouldn\'t do

The net effect is not that PMs do less — it\'s that PMs can do more of the work that matters, with less of their time consumed by the production work that surrounds it.

## Skills That Become More Valuable

**Product judgment and taste**
When AI can produce a PRD in 10 minutes, the differentiation moves to what goes in the PRD. The PM who can tell a good product decision from a bad one — who has taste — is more valuable, not less. Taste is built through user proximity, breadth of product study, and accumulated judgment from decisions that worked and ones that didn\'t.

**System design thinking**
AI-era products are systems: models, APIs, agent loops, evaluation pipelines, feedback mechanisms. The PM who understands how these components interact — without needing to build them — can make better decisions about scope, risk, and architecture. This is not programming literacy; it\'s systems thinking applied to AI product architecture.

**AI ethics and responsible design**
As AI products make consequential decisions (credit, healthcare, employment, content moderation), the PM is increasingly responsible for the ethical design of those systems. This is not a legal or trust-and-safety function — it\'s a product function. What should the system do when it\'s uncertain? Who should be able to appeal an AI decision? How do we detect and correct systematic bias?

**Prompt engineering as product craft**
Writing effective prompts for AI features is a new product skill. The PM who can specify AI behaviour precisely — through system prompt design, few-shot examples, and output format specification — can ship better AI features faster. This is not a developer skill; it\'s a product craft skill.

## The PM\'s New Responsibility: AI Feature Ethics

> "I am a PM shipping an AI feature that [describe the feature and its impact]. Help me think through the ethical dimensions: (1) who could be harmed by this feature and how, (2) what failure modes could systematically disadvantage specific groups, (3) what human oversight mechanisms should be in the product, (4) what the appeals or correction mechanism should be, (5) what I should disclose to users about how the AI works and its limitations."

AI features that make consequential decisions create product ethics obligations that didn\'t exist for most traditional features. The PM who ignores these until the trust-and-safety team raises them is behind. The PM who bakes them into the spec is building a more durable product.

## Career Strategy for PMs in the AI Era

**Build an AI product portfolio**
The most effective career signal for AI-era PMs is not writing about AI — it\'s having shipped AI features that work. Document your AI feature work: what you built, the key decisions you made, the metrics you moved, and what you learned from failures.

**Study the best AI products**
Perplexity, Cursor, Superhuman, Notion AI, GitHub Copilot, Granola — each represents a design philosophy about how AI should be integrated into user workflows. Understanding these products at the level of their design decisions (not just their features) builds the taste that differentiates strong AI PMs.

**The organisations that need AI-fluent PMs most**
In the next five years: financial services (AI in credit, compliance, customer service), healthcare technology (AI diagnostics, clinical decision support), legal tech, HR tech, enterprise software with AI embedded across workflows, and any company building AI-native products from scratch. These sectors are hiring PMs who can bridge business, user needs, and AI capability.

## Building Your AI Product Strategy

A personal AI product strategy has three components: the skills you\'ll develop (be specific — not "learn AI" but "develop system prompt design and LLM evaluation skills"), the products you\'ll study (commit to a specific set of AI products to use deeply, not just watch), and the feature you\'ll champion next (the AI feature you will spec, advocate for, and ship in your current role in the next 90 days).`,
          keyTakeaways: [
            'AI accelerates PM production work (drafting, synthesis, analysis) while leaving strategic judgment, user proximity, and stakeholder navigation unchanged — the net effect is that PMs can invest more time in the work that matters',
            'Skills becoming more valuable for AI-era PMs: product judgment and taste, system design thinking for AI architectures, AI ethics and responsible design, and prompt engineering as a product craft',
            'AI feature ethics is a PM responsibility, not just a legal or trust-and-safety function — the PM should spec ethical guardrails, appeals mechanisms, and systematic bias detection as core feature requirements',
            'Building an AI product portfolio (shipped features with documented decisions and metrics) is the most effective career signal for AI-era PMs, more than certifications or blog posts',
            'A personal AI product strategy needs three elements: specific skills to develop, specific AI products to study deeply, and a specific AI feature to champion in the next 90 days',
          ],
          exercise: {
            title: 'Personal AI Product Strategy',
            description:
              'Write a personal AI product strategy: the skills you\'ll develop, the AI products you\'ll study, and the AI feature you\'ll champion in the next 90 days.',
            steps: [
              'Open Claude and prompt: "I am a PM with [X years] experience in [industry/product type]. My current role is [describe role]. Help me build a personal AI product strategy covering: (1) the 3 AI-specific skills most valuable for my career trajectory — be specific about what each skill means and how I would develop it, (2) the 5 AI products I should study deeply in the next 6 months and why each one represents a distinct design philosophy worth understanding, (3) the 1 AI feature I could champion in my current role in the next 90 days — including how to frame it for my organisation, what success looks like, and what I would learn from shipping it."',
              'Evaluate the skills list: are these skills you could actually develop given your context, or do they require access you don\'t have?',
              'Evaluate the AI products list: have you used any of these deeply? Which would give you the most new perspective on AI UX?',
              'For the 90-day AI feature: is this actually possible in your current role? What would need to be true for it to move forward?',
              'Write a one-paragraph commitment statement: the specific skill you will develop this quarter, the product you will study this month, and the AI feature you will pitch in the next two weeks',
            ],
            tool: 'Claude',
          },
          inlineCheck: {
            question: 'A PM who has been managing a traditional SaaS product for 5 years wants to position themselves for AI-era PM roles. They are considering: (A) completing an online AI certification course, (B) building and shipping a personal AI side project, (C) getting an AI feature shipped in their current product and documenting the decisions and outcomes, (D) writing blog posts about AI product management trends. Which option builds the most valuable career capital?',
            options: [
              'Option A — certifications signal commitment to AI learning',
              'Option B — personal projects demonstrate technical capability',
              'Option C — shipping an AI feature in production, with documented decisions and outcomes, demonstrates actual PM capability on AI products in a professional context — this is the most durable and credible career signal',
              'Option D — thought leadership establishes expertise in the field',
            ],
            correct: 2,
            explanation: 'Career capital in product management is built on demonstrated outcomes, not demonstrated interest. A certification proves you completed a course. A blog post proves you can write about AI. A personal project proves you built something. But an AI feature shipped in production — with documented product decisions, the challenges you navigated, the metrics you moved, and the lessons learned — proves you can do the PM job on AI products in a professional context with real constraints, real stakeholders, and real users. This is what hiring managers and VPs of Product are looking for when staffing AI-focused roles. Options A, B, and D are all better than doing nothing — but Option C is in a different tier of career value.',
          },
          outputComparison: {
            label: 'Vague vs. specific personal AI product strategy prompt',
            vague: {
              prompt: 'How should I build my career as a PM in the age of AI?',
              output: 'Building a PM career in the age of AI requires staying current with AI trends and developing relevant skills. Learn about large language models and how they work. Build experience shipping AI features. Stay connected with the PM community to share learnings. Read about AI product case studies. Develop your prompting skills. Be adaptable as the landscape changes quickly. Consider getting certifications in AI-related areas. Network with other PMs working in AI.',
            },
            improved: {
              prompt: 'I am a PM with 4 years of experience in B2B fintech (payments, fraud detection). I currently manage a fraud alerts product used by 200 bank clients. I have no direct AI feature experience but I use AI tools personally every day. My career goal is to move into a senior PM role focused on AI-powered financial services products in the next 18 months. Build a specific personal AI product strategy: (1) the 3 skills I need to develop and how I develop each one given my specific context, (2) the 5 AI products I should study deeply and what each one would teach me that is relevant to AI in fintech, (3) the 1 AI feature I could champion in my current fraud alerts product in the next 90 days, with the business case framing for my leadership team.',
              output: `**Personal AI Product Strategy — B2B Fintech PM, 18-Month Horizon**

**3 Skills to Develop**

*1. LLM Evaluation and Quality Assurance*
Why: AI features in financial services live or die on reliability — you need to be able to specify, test, and evaluate AI quality for regulated environments. How to develop: (a) Read the RAGAS paper and 2-3 LLM evaluation frameworks; (b) In your current role, propose an evaluation framework for one rule-based fraud model — practice the discipline of defining ground truth and measuring against it; (c) Build a small personal project: take 50 fraud alert descriptions from public datasets and evaluate two LLMs on their accuracy. Document your methodology. This is portfolio material.

*2. System Prompt Design and AI Behaviour Specification*
Why: The PM who can write precise system prompts and specify AI behaviour through examples is 2× more effective in AI feature development — less back-and-forth with engineers, better outputs from the start. How to develop: (a) Read Anthropic\'s prompt engineering guide; (b) Spend 2 hours per week for 6 weeks iterating on complex prompts for your own work tasks — track which prompt changes produce the biggest quality improvements; (c) In your fraud alerts product, draft a system prompt specification for the AI feature below.

*3. AI Regulatory and Compliance Literacy for Financial Services*
Why: AI in fintech is the most regulated space for AI — CFPB guidance on credit AI, model risk management (SR 11-7), fair lending implications of ML models. A fintech AI PM who understands the regulatory environment is rare and highly valuable. How to develop: (a) Read the CFPB\'s AI/ML supervisory guidance and SR 11-7; (b) Request a briefing from your compliance team on how your current fraud models are validated; (c) Follow CFPB and OCC AI guidance updates — subscribe to their regulatory release feeds.

**5 AI Products to Study Deeply**

1. *Sardine (AI fraud detection)* — Direct relevance: your sector. Study their case-based reasoning approach and how they surface AI decisions to analyst teams. What to understand: how they present AI confidence to human reviewers.
2. *Darktrace (cybersecurity AI)* — Adjacent domain with sophisticated anomaly detection UX. Study how they visualise AI threat detection for non-technical security analysts. Transferable to fraud UX.
3. *Perplexity* — The best current example of AI that shows its reasoning and sources in a consumer product. Study how trust calibration is built into the core experience.
4. *Cursor* — Best example of AI working alongside an expert user who maintains control. The "AI suggests, human decides" interaction model is directly applicable to fraud analyst workflows.
5. *Unit21 (fraud operations platform)* — Direct competitor space. Study how they are layering AI onto case management and where the human-in-the-loop moments are.

**1 AI Feature to Champion in the Next 90 Days**

*Feature: AI Alert Triage Scoring for Fraud Analysts*
What it does: AI scores incoming fraud alerts by case complexity and estimated investigation time, automatically routing simple alerts to junior analysts and surfacing complex patterns to senior analysts — with AI reasoning visible to all reviewers.
Business case framing: "Our Tier 1 analysts spend 40% of their time on alerts that take under 5 minutes to close. Our Tier 2 analysts are backlogged on complex multi-account patterns. An AI triage layer routes cases more efficiently — estimated 15% reduction in average case resolution time and 20% improvement in complex case throughput. This requires a 6-week engineering sprint and 3 months of evaluation before full deployment."
What you\'ll learn: evaluation methodology for AI in a regulated context, how to navigate model risk management requirements, how fraud analysts respond to AI recommendations — all directly relevant to senior AI PM roles in fintech.`,
            },
            insight: 'The improved prompt gives Claude the PM\'s specific experience (fintech, fraud, B2B), specific goal (senior AI PM role in 18 months), and specific current product context. This allows Claude to produce career advice that is immediately actionable rather than generically applicable to any PM. The skill development plans reference the PM\'s actual current work. The AI products list is specific to fintech AI. The 90-day feature is grounded in the PM\'s actual product. This is the difference between advice you file and advice you act on.',
          },
          applyThisWeek: {
            action: 'Write your personal AI product strategy and identify the one AI feature you will pitch to your leadership team in the next two weeks.',
            promptTemplate: 'I am a PM with [X years] experience in [industry]. I currently work on [product type] serving [user type]. My career goal is [specific goal] in [timeframe]. Build a personal AI product strategy covering: (1) the 3 AI-specific skills most valuable for my trajectory with specific development plans, (2) the 5 AI products I should study that are most relevant to my domain, (3) the 1 AI feature I could champion in my current role in the next 90 days with a business case framing for my leadership team.',
            tool: 'Claude',
          },
          reflection: 'In 3 years, what will you wish you had started doing about your AI product skills today — and what is stopping you from starting it this week?',
          quiz: [
            {
              question: 'A PM argues that AI ethics and responsible design should be handled by a dedicated trust-and-safety team, not by individual PMs. What is the strongest counterargument?',
              options: [
                'There is no counterargument — trust-and-safety teams are the appropriate function for this work',
                'Trust-and-safety teams review products after they are designed; PMs who embed ethical design into the product spec prevent problems at the lowest-cost stage — before they are built. The PM who says "T&S will handle it" ships products that generate T&S incidents that could have been avoided in the PRD',
                'PMs should handle ethics because trust-and-safety teams are not technical enough',
                'Ethics should be handled by legal teams, not PMs or T&S',
              ],
              correct: 1,
              explanation: 'Trust-and-safety teams are essential — but they typically review products that have already been designed and built. The cost of fixing an ethical design problem at the PRD stage is near-zero (change the spec). The cost of fixing it after launch is enormous: engineering rework, user trust damage, potential regulatory scrutiny, and often a public incident. The PM who incorporates ethical design questions into the spec — who asks "who could be harmed, what\'s the appeals mechanism, how do we detect systematic bias" before the feature is built — prevents the incidents that T&S teams are then called to manage. This is a complement to T&S, not a replacement for it.',
            },
            {
              question: 'An AI feature a PM shipped 6 months ago is generating significant user value but the PM moved on to other projects. A colleague asks whether they should add this to their "AI product portfolio." What is the most valuable thing to document?',
              options: [
                'The technical specifications of the AI model used',
                'The launch announcement and press coverage',
                'The key product decisions made during development (including decisions that turned out to be wrong), the metrics before and after launch, the failure modes that appeared in production and how they were addressed, and the lessons learned — this is what demonstrates PM judgment, not just output',
                'The user testimonials collected at launch',
              ],
              correct: 2,
              explanation: 'A product portfolio that documents only what worked is a launch announcement, not a demonstration of PM capability. What hiring managers and senior leaders actually want to understand is how a PM thinks and decides — which is best demonstrated through the decisions made during development (especially the close calls and the ones that turned out to be wrong), the honest metrics (not just the wins), the failure modes that appeared in production (and whether the PM anticipated them), and what the PM would do differently. This is the professional equivalent of a case study — it shows judgment, not just output.',
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
              explanation: '"Faster work" means using AI to produce the same PRDs, research summaries, and analyses you already produce, but in less time. "Better work" means using the time AI saves to do things you previously couldn\'t afford: testing ten growth hypotheses instead of two, synthesising 30 user interviews instead of five, pressure-testing a recommendation from six stakeholder perspectives instead of one. The PMs who build the most career capital are those who use AI to expand the scope of their thinking, not just the speed of their drafting.',
            },
          ],
        },
      ],
    },
  ],
}
