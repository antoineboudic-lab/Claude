import type { Track } from '../types'

export const consultingTrack: Track = {
  id: 'consulting',
  title: 'AI for Consulting',
  tagline: 'Research deeper, structure faster, and deliver sharper insights with AI',
  description:
    'A practical curriculum for consultants and advisory professionals who want to use AI across the full project lifecycle — from proposal writing and research to slide production, client communication, and delivering higher-quality recommendations faster.',
  color: '#0EA5E9',
  level: 'beginner',
  modules: [
    {
      id: 'consulting-m1',
      title: 'AI Fundamentals for Consultants',
      description:
        'Understand how AI applies to consulting work, which tools are worth your time, and how to build an AI workflow that raises the quality of every engagement.',
      lessons: [
        {
          id: 'consulting-m1-l1',
          title: 'What AI Means for Consulting',
          duration: 15,
          description:
            'Understand where AI genuinely accelerates consulting work and where the analytical judgment and client relationships that define great consulting remain irreplaceable.',
          content: `## AI and the Consulting Value Proposition

Consulting value comes from two things: insight quality and client trust. AI cannot create either on its own. What AI can do is remove the production overhead that currently consumes 40–60% of a consultant's time — secondary research, data synthesis, slide drafting, memo writing — so that more time is invested in the judgment and relationships that actually differentiate a great consultant from an average one.

## Where AI Accelerates Consulting Work

**Secondary research.** Gathering market data, competitor analysis, regulatory landscape, and industry benchmarks is time-intensive. AI can compress hours of research into minutes, giving consultants more time for primary research and analysis.

**Synthesis and structuring.** Turning raw research notes, interview transcripts, and data into a structured argument is one of the most cognitively demanding parts of consulting. AI can propose structures, synthesise themes, and generate first drafts that consultants then refine.

**Document production.** Proposal writing, interim memos, stakeholder updates, and final decks all involve significant production time. AI produces high-quality first drafts that reduce production time by 50–70%.

**Hypothesis generation.** AI can generate issue trees, MECE frameworks, and hypothesis sets at speed, giving the consulting team more hypotheses to evaluate and test.

## What AI Cannot Do in Consulting

**Form and maintain client trust.** The senior partner relationship, the ability to read a room, and the credibility that comes from demonstrated judgment — these are human. Clients pay for the person, not the slide.

**Exercise situation-specific judgment.** The recommendation for this client, in this market, at this moment requires contextual reasoning that AI cannot fully replicate.

**Navigate client organisation politics.** Understanding which stakeholder to bring onside, how to sequence difficult messages, and how to manage competing interests within a client organisation requires the human intelligence built from experience.

**Take professional responsibility.** The consultant and the firm are accountable for their recommendations. AI generates content; humans are responsible for it.

## The New Consulting Model

With AI handling research synthesis and production work, consulting value increasingly comes from: the quality of the primary research and client insights that AI cannot access, the experience-based judgment applied to AI-generated frameworks, and the client relationship that makes recommendations land. AI makes great consultants more productive, not less valuable.`,
          keyTakeaways: [
            'AI removes production overhead (secondary research, synthesis, drafting) that consumes 40–60% of consulting time',
            'Client trust, situation-specific judgment, and organisational politics navigation remain irreplaceable',
            'Professional responsibility for recommendations always stays with the consultant',
            'AI makes great consultants more productive — the judgment gap between average and great consultants becomes more visible, not less',
            'Start with production tasks (research synthesis, first drafts) before applying AI to analytical judgment tasks',
          ],
          exercise: {
            title: 'Consulting Task Mapping',
            description:
              'Map your current consulting tasks by AI potential to identify where to start.',
            steps: [
              'List your ten most time-consuming recurring tasks on a current engagement',
              'For each task, classify: (a) production (research gathering, writing, formatting) vs. judgment (analysis, recommendations, client navigation), (b) how error-sensitive is it?',
              'Production + moderate error tolerance = strong AI candidate',
              'Identify your top three AI candidate tasks',
              'This week, use Claude for one of them. Track time saved and what professional judgment the AI couldn\'t supply.',
            ],
            tool: 'Claude',
          },
          quiz: [
            {
              question: 'Which consulting task has the highest potential for AI acceleration?',
              options: [
                'Advising a CEO on a sensitive organisational restructuring',
                'Synthesising 30 industry reports into a structured competitive landscape overview',
                'Navigating stakeholder resistance to a change programme recommendation',
                'Building the client relationship during a difficult engagement phase',
              ],
              correct: 1,
              explanation:
                'Secondary research synthesis — reading multiple sources and extracting structured insights — is exactly the kind of high-volume text processing that AI excels at. What would take a consultant three to four hours of reading and note-taking can be compressed to 30–40 minutes with AI synthesis. This frees time for the judgment and client relationship work that AI cannot do.',
            },
          ],
        },
        {
          id: 'consulting-m1-l2',
          title: 'Consulting AI Tools and Workflow Setup',
          duration: 18,
          description:
            'Build an effective consulting AI toolkit and establish the workflow habits that make AI consistently useful across different engagement types.',
          content: `## The Consulting AI Stack

Consultants work across research, analysis, writing, and presentation. A well-chosen set of three to four tools covers all of these without creating tool-switching overhead.

## Core Tools for Consulting Work

**General-purpose AI (Essential):**
Claude or ChatGPT for: secondary research synthesis, hypothesis generation, framework application, memo and proposal drafting, slide content writing, and analysis structuring.

**Web-enabled AI:**
Claude with web search or Perplexity for: current market data, recent M&A activity, current competitor positioning, regulatory changes. Use when you need information more current than a general AI's training data.

**Document-specific AI:**
Tools like NotebookLM (Google) or Claude's document upload for: reading and synthesising long primary documents (client reports, industry studies, regulatory filings) without manually copying text.

**Slide AI:**
Some teams use Gamma or Beautiful.ai for AI-assisted slide creation. Evaluate against your firm's preferred tools — some slide tools integrate AI into existing PowerPoint workflows.

## Client Data Protocols

The most important setup task: understand what client data can and cannot be entered into AI tools. This is not optional — it is a professional obligation.

Most consulting firms have policies on:
- Which AI tools are approved for client engagement work
- Whether client-identifying information can be entered into AI tools
- How to anonymise before using unapproved tools

If your firm's policy is unclear, ask. And when in doubt, anonymise before pasting.

## The Daily AI Workflow

Build AI into the start of every major production task:
1. Before writing a memo: "Give me five potential structures for a memo on [topic]"
2. Before synthesising research: Paste materials → "Identify the 5 key themes"
3. Before client prep: "What questions is the client most likely to ask about [recommendation]?"

Consistency matters more than tool sophistication. One tool used systematically produces more value than five tools used occasionally.`,
          keyTakeaways: [
            'A three to four tool stack (general AI + web-enabled + document AI) covers most consulting needs',
            'Client data protocols are a professional obligation — understand firm policy before using any AI tool',
            'Anonymise client information before entering into unapproved AI tools',
            'Consistency of workflow use produces more value than tool sophistication',
            'Web-enabled AI for current market data; document AI for long primary source analysis',
          ],
          exercise: {
            title: 'Consulting AI Stack Setup',
            description:
              'Audit your current AI tools and firm policies, then establish your core consulting workflow.',
            steps: [
              'Review your firm\'s AI policy (or ask risk/IT if there is one): which tools are approved, and what data can be entered?',
              'Identify which tools from the consulting AI stack you already have access to',
              'Set up one workflow habit: for the next five working days, start every research synthesis task with AI before doing it manually',
              'After five days: did AI save time? What did you need to correct? What types of output were most directly useful?',
              'Based on the trial, decide which task type to make a permanent AI-first workflow',
            ],
            tool: 'Claude',
          },
          quiz: [
            {
              question: 'What is the most important step before using any AI tool on a client engagement?',
              options: [
                'Choosing the most powerful AI model available',
                'Understanding your firm\'s policy on which tools are approved and what client data can be entered',
                'Getting client approval to use AI',
                'Training the AI on the client\'s industry',
              ],
              correct: 1,
              explanation:
                'Client data protection is a professional and contractual obligation in consulting. Many clients include data handling restrictions in engagement letters. Most consulting firms have policies on AI tool use that balance productivity with confidentiality. Understanding these policies before using AI on any client engagement is the non-negotiable first step.',
            },
          ],
        },
        {
          id: 'consulting-m1-l3',
          title: 'The Consulting Prompt Mindset',
          duration: 18,
          description:
            'Develop the prompting approach that works for consulting\'s specific demands — where structure, analytical rigour, and client-readiness are the standard for every output.',
          content: `## Why Consulting Prompting Is Different

Consulting output is expected to be structured, logical, evidence-based, and client-ready. Generic AI output rarely meets this standard. Consulting prompts need to specify: the analytical framework, the level of rigour, the client context, and the output format.

## The Consulting Prompt Elements

**1. Project context.** What is the engagement? What is the client situation? What decision are you trying to inform?

**2. Analytical framework.** What structure should the output follow? MECE breakdown? McKinsey problem solving? Porter's Five Forces? Specify the framework explicitly.

**3. Evidence standard.** How specific should claims be? Should they be supported by data? What level of assertion is appropriate here?

**4. Output format.** Bullet points for speed, or prose for a client memo? Slide-ready text, or analytical working notes?

**5. Consulting voice.** Client-ready language, or working analysis? Should it read like a senior consultant wrote it?

## Prompt Patterns for Consulting Tasks

**Issue tree prompt:**
"I am working on a [type] engagement for a [client type]. The central question is [state it]. Build a MECE issue tree that breaks down this question into the key sub-questions a consultant would need to answer. Three levels deep."

**Hypothesis generation:**
"For a [industry] client facing [problem], generate eight potential hypotheses about the root cause. Organise them into three to four theme buckets. For each hypothesis, suggest one data source or analysis that would test it."

**Framework application:**
"Apply Porter's Five Forces to the [industry] sector. For each force, assess the current intensity (high/medium/low) and provide three specific supporting observations. Then summarise the overall industry attractiveness."

## Calibrating for Client-Ready Output

AI defaults to a generic professional voice. Consulting output needs to be more precise, more assertion-heavy (so what, not just what), and more structured. The calibration prompt: "Rewrite this in the voice of a senior McKinsey consultant writing for a CEO audience. Lead with the insight, not the analysis. Use pyramid principle structure: answer first, then supporting evidence."`,
          keyTakeaways: [
            'Consulting prompts require five elements: project context, analytical framework, evidence standard, output format, and consulting voice',
            'Specify the framework explicitly — MECE, Porter\'s Five Forces, issue trees — for structured analytical output',
            'AI defaults to generic professional voice; calibrate for consulting\'s answer-first, assertion-heavy standard',
            'The pyramid principle prompt ("answer first, then evidence") produces more client-ready output than default AI style',
            'Build a consulting prompt library for your most common task types to accelerate future engagements',
          ],
          exercise: {
            title: 'Build Your Consulting Prompt Library',
            description:
              'Create and test three consulting-specific prompts for your most common engagement tasks.',
            steps: [
              'Identify three tasks you do on every engagement: examples might be issue tree development, competitive landscape, executive summary drafting, interview guide design, or hypothesis generation',
              'For each, write a prompt using the five consulting prompt elements: project context, framework, evidence standard, format, voice',
              'Test each prompt with a recent or current engagement example (anonymise client details)',
              'Assess: is the output immediately usable in a client context, or does it need significant rework?',
              'Refine the weakest prompt and save all three as your core consulting prompt library',
            ],
            tool: 'Claude',
          },
          quiz: [
            {
              question: 'What distinguishes a consulting-grade AI prompt from a general-purpose prompt?',
              options: [
                'Consulting prompts must be written in formal English',
                'Consulting prompts specify the analytical framework, evidence standard, and output format expected of professional consulting work',
                'Consulting prompts are always longer than general prompts',
                'Consulting prompts must reference specific client names',
              ],
              correct: 1,
              explanation:
                'Generic AI output uses generic professional language but typically lacks the analytical structure, evidence-backed assertions, and pyramid-principle organisation that characterises consulting output. Consulting-grade prompts specify the framework (MECE, issue tree), the evidence standard (supported by data, three examples per claim), and the voice (senior consultant writing for C-suite) to produce output that is closer to client-ready.',
            },
          ],
        },
        {
          id: 'consulting-m1-l4',
          title: 'Quality Control for Consulting AI Output',
          duration: 15,
          description:
            'Develop the review habits and quality standards that ensure AI-generated consulting work meets the professional standard your clients expect.',
          content: `## The Quality Problem in Consulting AI

AI output looks professional. That is the risk. In consulting, professional-looking output that is factually wrong, analytically shallow, or strategically misaligned can damage the client relationship and the firm's reputation. The quality standard is not "does this look like consulting?" — it is "is this good consulting?"

## The Consulting AI Quality Checklist

**Factual accuracy:**
- [ ] Are specific data points, statistics, and market claims verified through primary sources?
- [ ] Are companies, market positions, and competitive facts accurate?
- [ ] Are regulatory or legal claims current and jurisdiction-accurate?

**Analytical quality:**
- [ ] Is the structure genuinely MECE, or does it have overlaps and gaps?
- [ ] Are the insights "so what" (actionable) or just "what" (descriptive)?
- [ ] Is the logic chain complete — do conclusions follow from the analysis?

**Client context:**
- [ ] Does this reflect what we know about this client's specific situation?
- [ ] Is the recommendation calibrated to this client's constraints and risk tolerance?
- [ ] Would the client's leadership recognise their own organisation in this analysis?

**Professional standard:**
- [ ] Would a senior partner at this firm be comfortable sending this to the client?
- [ ] Is the language at the right level of assertiveness (consulting communicates conclusions, not hedges)?

## The Two-Speed Review

For production tasks (research summaries, interim memos, draft sections), a speed review applies: scan for factual errors, add client-specific context, adjust tone. For strategic outputs (final recommendations, board presentations), full review against all four checklist categories.

The mistake is applying the same review standard to both — either over-reviewing routine outputs (time waste) or under-reviewing strategic outputs (professional risk).`,
          keyTakeaways: [
            'Professional-looking AI output is the risk — review for analytical quality, not just professional appearance',
            'The four quality dimensions: factual accuracy, analytical quality, client context, and professional standard',
            'Verify specific data points, statistics, and competitive facts through primary sources before client use',
            'Insights must be "so what" not just "what" — AI tends toward description; consultants need prescription',
            'Apply two-speed review: speed review for production tasks, full checklist for strategic outputs',
          ],
          exercise: {
            title: 'Quality Review in Practice',
            description:
              'Generate a strategic insight section with AI, then apply the full quality checklist to identify what needs improvement.',
            steps: [
              'Choose an industry or strategic question relevant to a current or recent engagement',
              'Ask Claude to "analyse the top three strategic challenges facing [industry] companies and the recommended responses"',
              'Apply the quality checklist to the output: factual accuracy check, analytical quality check, client context check, professional standard check',
              'Mark every element that fails the quality check and categorise the issue type',
              'Rewrite the section by hand, incorporating both AI\'s useful content and your own professional judgment',
              'Estimate: how much better is the revised output, and was the AI still time-saving overall?',
            ],
            tool: 'Claude',
          },
          quiz: [
            {
              question: 'What is the most common analytical quality issue in AI-generated consulting content?',
              options: [
                'AI uses too many technical terms',
                'AI outputs are descriptive ("what") rather than prescriptive ("so what") — they report observations without drawing actionable conclusions',
                'AI cannot produce MECE structures',
                'AI always generates too many slides',
              ],
              correct: 1,
              explanation:
                'AI naturally tends toward balanced, descriptive analysis: "Company X has strong market position but faces competitive pressure in segment Y." A consulting answer requires the prescriptive leap: "Given X\'s market position and the competitive dynamics in Y, the recommended strategy is Z, which should be prioritised over alternative W for these reasons." Converting AI\'s descriptive output to prescriptive consulting insight is one of the most common editing tasks in consulting AI workflow.',
            },
          ],
        },
      ],
    },
    {
      id: 'consulting-m2',
      title: 'Research, Analysis & Structured Thinking',
      description:
        'Use AI to accelerate secondary research, apply analytical frameworks faster, and produce more rigorous analysis in less time.',
      lessons: [
        {
          id: 'consulting-m2-l1',
          title: 'Secondary Research with AI',
          duration: 20,
          description:
            'Compress secondary research from days to hours using AI to synthesise industry reports, market data, and competitive intelligence systematically.',
          content: `## Secondary Research as an AI-First Task

Secondary research — reading, extracting, and synthesising information from existing sources — is exactly what large language models are trained to do at scale. A consultant who doesn't use AI for secondary research is spending hours on a task that could take minutes.

## The Research Synthesis Workflow

**Step 1 — Define the research questions.** Before gathering any sources, define exactly what you need to know. Research without clear questions produces interesting-but-not-useful outputs.

**Step 2 — Gather sources.** Industry reports, analyst publications, company filings, academic research, news. Use web-enabled AI to surface sources you might miss.

**Step 3 — AI synthesis.** For each source: paste key sections into Claude and ask for a structured extract. For sets of sources: ask Claude to synthesise across them, identifying consensus views and diverging perspectives.

**Step 4 — Analyst verification.** Verify specific data points, statistics, and market share claims through the original source before including in client deliverables.

## Synthesis Prompt Patterns

**Single document synthesis:**
"Summarise this industry report [paste key sections]. Extract: (1) key market trends, (2) competitive dynamics, (3) regulatory developments, (4) growth drivers and headwinds. Use specific data points where available."

**Cross-source synthesis:**
"I have gathered four perspectives on [topic] from different sources [paste summaries]. Identify: (a) where sources agree, (b) where they diverge, (c) the most important insight a strategy consultant should take from this research."

**Competitive landscape synthesis:**
"From the following sources [paste], produce a structured competitive landscape for [industry]: top players by segment, their apparent strategic positioning, recent strategic moves, and any notable gaps or white spaces."

## The Research Shortcut You Should Resist

AI can generate what appears to be research: market size estimates, competitor positioning, industry trends — based on its training data. This is not research. It is AI's probabilistic prediction of what research would say. It can contain hallucinated statistics and outdated market data. Real secondary research requires real sources, with AI used to synthesise them — not to replace them.`,
          keyTakeaways: [
            'Secondary research synthesis (reading and extracting from real sources) is the highest-value AI task in consulting',
            'Always gather real sources first; use AI to synthesise them — not to replace primary research',
            'Verify specific statistics and data points from AI synthesis against the original source before client use',
            'Define your research questions before gathering sources — this shapes more useful AI synthesis',
            'Cross-source synthesis that identifies consensus and divergence is more valuable than single-source summaries',
          ],
          exercise: {
            title: 'AI Research Synthesis Sprint',
            description:
              'Use AI to synthesise secondary research for a current or hypothetical consulting question in under an hour.',
            steps: [
              'Define three research questions for a market or strategic question relevant to a current engagement',
              'Gather three to five relevant sources (industry reports, analyst notes, company filings, news)',
              'Use the single document synthesis prompt on each source',
              'Then use the cross-source synthesis prompt to combine your summaries',
              'Identify one specific data point from AI\'s synthesis that needs verification',
              'Verify it against the original source. Was the AI accurate?',
            ],
            tool: 'Claude',
          },
          quiz: [
            {
              question: 'What is the critical distinction between AI-generated research and AI-synthesised research?',
              options: [
                'There is no meaningful difference',
                'AI-generated research comes from AI\'s training data (risk of hallucination); AI-synthesised research extracts from real sources you have provided (verifiable)',
                'AI-synthesised research is always more recent',
                'AI-generated research is more structured',
              ],
              correct: 1,
              explanation:
                'When you ask AI to "tell me about the market" without providing sources, you receive AI-generated content based on training data — which may include fabricated statistics, outdated market data, and unverifiable claims. When you provide real sources and ask AI to synthesise them, you receive a structured extraction of verifiable content. The second approach meets consulting\'s professional standard; the first does not.',
            },
          ],
        },
        {
          id: 'consulting-m2-l2',
          title: 'Hypothesis-Driven Problem Solving with AI',
          duration: 20,
          description:
            'Use AI to accelerate hypothesis generation, issue tree development, and the structured analytical approach that distinguishes great consulting from generic analysis.',
          content: `## Hypothesis-Driven Consulting and AI

The hypothesis-driven approach — start with a hypothesis about the answer, then build the analysis to test and refine it — is one of the most powerful methodologies in consulting. AI can dramatically accelerate the front end of this process: generating the initial hypothesis set and building the issue tree.

## AI for Issue Tree Development

An issue tree breaks the central business question into its component sub-questions in a MECE structure. AI can generate issue trees quickly; your job is to evaluate their quality, correct MECE violations, and apply client-specific context.

Prompt: "Build a MECE issue tree for the following central question: [state the strategic question]. I am working with a [client type] in the [industry] sector. Go three levels deep. Use consulting-standard structure (not generic categories)."

Review AI's issue tree for:
- Genuine MECE-ness (no overlaps, no gaps)
- Appropriate depth for the question
- Client-specific relevance (generic vs. situation-specific)

## Generating the Initial Hypothesis Set

Before primary research, generating hypotheses about likely answers makes you a sharper analyst — you know what you're looking for.

Prompt: "For a [industry] company facing [describe the situation], generate eight to ten hypotheses about [root cause / strategic opportunity / recommended action]. Organise by hypothesis theme (e.g., market-related, operational, competitive). For each hypothesis, suggest one analysis that would test it."

## The AI-Human Divide in Problem Solving

AI can generate issues and hypotheses at speed. The critical analytical work — deciding which hypotheses are most plausible given your knowledge of this client, ranking which analyses to prioritise given time and budget, and synthesising what the analysis actually means for the client's decision — requires the consultant.

AI produces the forest; the consultant navigates it.`,
          keyTakeaways: [
            'AI can generate issue trees and hypothesis sets rapidly — accelerating the front end of hypothesis-driven work',
            'Review AI issue trees for genuine MECE quality, depth, and client-specific relevance',
            'Hypothesis generation before research makes you a sharper analyst — AI makes this fast',
            'The consultant decides which hypotheses are most plausible and which analyses to prioritise — AI cannot do this',
            'Generate more hypotheses than you need with AI, then apply judgment to select the most valuable ones to test',
          ],
          exercise: {
            title: 'Issue Tree and Hypothesis Generation',
            description:
              'Use AI to build an issue tree and hypothesis set for a consulting problem, then evaluate the output analytically.',
            steps: [
              'Choose a strategic business question relevant to a current engagement or a hypothetical (e.g., "Should [company type] enter [new market]?")',
              'Generate an issue tree using the MECE prompt',
              'Review the tree: mark any branches that are not truly MECE. How many overlaps or gaps did AI introduce?',
              'Generate a hypothesis set using the hypothesis prompt',
              'Rank the top three hypotheses by your assessment of their plausibility given the client situation',
              'For each of your top three, identify one analysis you would run to test it',
            ],
            tool: 'Claude',
          },
          quiz: [
            {
              question: 'What is the consultant\'s most important contribution when using AI for issue tree development?',
              options: [
                'Correcting the formatting of the issue tree',
                'Evaluating the MECE quality of AI\'s structure and applying client-specific context that AI cannot supply',
                'Expanding each branch with more sub-questions',
                'Converting the issue tree into a slide format',
              ],
              correct: 1,
              explanation:
                'AI generates issue trees quickly but without the client-specific context and real-world judgment that determines which branches matter most. The consultant\'s contribution is: verifying that the structure is genuinely MECE (AI often introduces overlaps), adding or adjusting branches based on knowledge of this specific client and situation, and prioritising which branches to pursue based on time, resources, and importance.',
            },
          ],
        },
        {
          id: 'consulting-m2-l3',
          title: 'Framework Application and Benchmarking with AI',
          duration: 18,
          description:
            'Apply consulting frameworks faster and benchmark clients more systematically using AI to do the analytical scaffolding while you focus on the insight.',
          content: `## Frameworks as Thinking Tools

Consulting frameworks — Porter's Five Forces, value chain analysis, the 7-S model, BCG matrix — exist to structure thinking consistently. AI can apply these frameworks quickly, producing a scaffold that the consultant then fills with client-specific content and insight.

## AI for Framework Application

**Porter's Five Forces:**
"Apply Porter's Five Forces to the [industry] sector in [geography/year]. For each force, assess intensity as high/medium/low and provide three specific supporting observations. Conclude with an overall industry attractiveness assessment."

**Value chain analysis:**
"Analyse the value chain for [company type or industry]. For each activity (inbound logistics, operations, outbound logistics, marketing & sales, service, and support activities), identify: the typical cost position, sources of competitive advantage, and where AI is beginning to disrupt the activity."

**SWOT:**
"Conduct a SWOT analysis for a [company type] in the context of [strategic question]. For each quadrant, provide four specific, non-generic points with brief supporting rationale."

**McKinsey 7-S:**
"Apply the McKinsey 7-S framework to analyse the organisational readiness of [company type] for [change programme]. Assess each element (strategy, structure, systems, shared values, skills, style, staff) and identify the elements most likely to create implementation risk."

## AI for Benchmarking

AI can produce benchmark comparisons using publicly available data — competitive metrics, industry standards, operational KPIs. Always verify specific numbers against sources.

"What are typical EBITDA margins for [industry] companies, and what factors drive the spread between top-quartile and median performers? Provide approximate benchmarks and the key operational drivers of outperformance."

## What AI Gets Wrong in Framework Application

AI applies frameworks generically. It doesn't know that your client's operational model is structurally different from the industry norm, or that the competitive dynamic it's describing shifted after a recent merger. Framework output from AI is a starting template, not a finished analysis.`,
          keyTakeaways: [
            'AI applies consulting frameworks (Porter\'s, SWOT, 7-S) in minutes — producing scaffolding for consultant insight',
            'Framework AI output is generic; the consultant adds client-specific content and calibrates observations to the actual situation',
            'Benchmark AI output requires verification of specific figures through primary sources',
            'Use AI frameworks as thinking starters, not analytical conclusions',
            'The most valuable framework application combines AI\'s structural rigour with the consultant\'s contextual knowledge',
          ],
          exercise: {
            title: 'Framework Application and Client Calibration',
            description:
              'Apply a consulting framework with AI, then demonstrate the gap between generic AI output and client-specific analysis.',
            steps: [
              'Choose a strategic framework relevant to a current engagement (Porter\'s Five Forces, SWOT, 7-S, or value chain)',
              'Run the framework application prompt for the relevant industry or strategic context',
              'Review the AI output: circle every item that is generic (applies to most companies in this sector) vs. specific (unique to your client)',
              'Rewrite three items by replacing generic content with client-specific observations from your engagement knowledge',
              'What percentage of the AI output was directly useful? What percentage needed significant client-specific calibration?',
            ],
            tool: 'Claude',
          },
          quiz: [
            {
              question: 'What is the consultant\'s primary task after AI applies a consulting framework?',
              options: [
                'Adding more sub-categories to make the framework more comprehensive',
                'Replacing generic observations with client-specific content based on engagement knowledge',
                'Converting the framework into a PowerPoint format',
                'Selecting which framework to use in the final client presentation',
              ],
              correct: 1,
              explanation:
                'AI applies frameworks using general industry knowledge. The result is typically accurate for the industry average but misses the client-specific context that makes analysis valuable. The consultant\'s task is to calibrate: replacing "industry typically has moderate supplier power" with "this client faces concentrated supplier power because of its dependence on three key component manufacturers for 70% of its inputs." Specificity is the consulting value-add.',
            },
          ],
        },
        {
          id: 'consulting-m2-l4',
          title: 'Synthesising Interviews and Primary Research',
          duration: 18,
          description:
            'Use AI to systematically synthesise primary research — interview transcripts, workshop outputs, and stakeholder feedback — into structured insights faster than manual analysis.',
          content: `## Primary Research Synthesis: The Time Sink AI Solves

A typical consulting engagement involves 15–30 stakeholder interviews. Manually reading transcripts, coding themes, and synthesising across interviews is extremely time-intensive. AI can produce a first-pass synthesis in a fraction of the time, which the consultant then refines with their contextual reading of the interviews.

## Interview Synthesis with AI

The key is giving AI the structure you need for synthesis, not just asking it to "summarise the interviews."

**Theme extraction prompt:**
"Here are notes from 10 stakeholder interviews about [topic]. Identify the five to seven recurring themes. For each theme: a clear label, a one-sentence description, the number of interviewees who mentioned it, and three representative quotes."

**Divergence analysis prompt:**
"Here are interview summaries from senior leaders and frontline employees on the topic of [organisational change]. Identify where their perspectives align and where they diverge significantly. What are the most important divergences for a change management programme to address?"

**Hypothesis validation prompt:**
"Before these interviews, our hypotheses were [list]. Based on the interview evidence [paste summaries], which hypotheses are supported, which are contradicted, and which remain uncertain? For each, cite the specific evidence."

## What AI Cannot Do with Interviews

- **Capture non-verbal signals.** What the interviewee didn't say. The hesitation before answering a question. The defensive body language.
- **Interpret organisational subtext.** "Everyone says the strategy is clear" may mean the opposite when combined with your observation of how quickly the meeting ended.
- **Assess interviewee credibility.** Some voices are more reliable than others. Only the consultant in the room can calibrate this.

## The Synthesis Review Standard

AI synthesis of primary research requires careful review: it will sometimes over-weight one interviewee's vivid language, miss a subtle but important divergence, or create false consensus by averaging views that are actually incompatible.`,
          keyTakeaways: [
            'AI can produce structured first-pass interview synthesis (themes, divergences, hypothesis validation) quickly',
            'Structure your synthesis prompt with the analytical output you need — not just "summarise the interviews"',
            'AI cannot capture non-verbal signals, organisational subtext, or interviewee credibility assessments',
            'Review AI synthesis for false consensus, over-weighting of vivid language, and missed divergences',
            'Hypothesis validation synthesis — checking which hypotheses interview evidence supports or contradicts — is highly valuable',
          ],
          exercise: {
            title: 'Interview Synthesis with AI',
            description:
              'Synthesise a set of interview notes using AI and compare the output to your own manual analysis.',
            steps: [
              'Gather notes from three to five interviews on any topic (engagement work, anonymised, or hypothetical)',
              'Run the theme extraction prompt',
              'Then run the hypothesis validation prompt (create three hypotheses that these interviews should test)',
              'Compare AI\'s output to your own reading of the interviews: what did AI miss that you noticed? What did AI surface that you hadn\'t explicitly articulated?',
              'Identify the one synthesis insight from AI that most changes your understanding of the interview data',
            ],
            tool: 'Claude',
          },
          quiz: [
            {
              question: 'Which interview insight can only be captured by the consultant who conducted the interview?',
              options: [
                'The total number of times a specific topic was mentioned',
                'The non-verbal signals, hesitations, and subtext that reveal what interviewees didn\'t explicitly say',
                'The most common theme across all interviews',
                'The verbatim quotes that best illustrate each theme',
              ],
              correct: 1,
              explanation:
                'AI synthesis works on text — it processes what interviewees said. What it cannot process is what happened around what was said: the executive who paused before answering the question about leadership alignment, the frontline worker who looked uncomfortable when discussing their manager, the room that went quiet when you mentioned a competitor. These observations, recorded as consultant notes and applied to the synthesis, are uniquely human contributions.',
            },
          ],
        },
      ],
    },
    {
      id: 'consulting-m3',
      title: 'Deliverable Production & Client Communication',
      description:
        'Produce better consulting deliverables faster — from compelling proposals to polished slide decks and clear client communications.',
      lessons: [
        {
          id: 'consulting-m3-l1',
          title: 'Proposal Writing with AI',
          duration: 20,
          description:
            'Use AI to produce compelling proposal first drafts faster, sharpen your value proposition, and tailor language to each client\'s specific situation.',
          content: `## Why Proposals Benefit From AI

Proposals are high-stakes but follow predictable structures: situation, complication, approach, team, and fees. AI can produce structurally complete first drafts quickly; the consultant's job is to tailor them to the specific client's language, concerns, and decision criteria.

## The AI Proposal Workflow

**Step 1 — Client context brief.** Before prompting AI, document: client industry and situation, specific problem they are trying to solve, why they would choose us over competitors, their decision criteria (price, methodology, relationships, track record).

**Step 2 — First draft with AI.** Prompt: "Draft a consulting proposal for [client type] with [situation]. We are proposing to [describe scope]. Our differentiation is [describe]. The proposal should cover: executive summary, situation and complication, our approach and methodology, indicative timeline, team overview, and why us. Client-ready language, 800–1200 words."

**Step 3 — Client tailoring.** Replace generic language with client-specific language. Use their terminology. Reference their stated priorities. Add specific examples from your firm's track record.

**Step 4 — Differentiator sharpening.** Ask AI: "Here is our draft proposal. Here is what we know about the other firms likely bidding for this work. How should we adjust our messaging to differentiate more effectively?"

## What Makes Proposals Win

AI can produce a well-structured proposal. What wins proposals are elements AI cannot supply without your input:
- Specific references to what the client said in the brief or previous meetings
- Track record examples from your firm that are genuinely relevant
- Evidence that you understand their situation better than competitors do
- The personal relationship element that makes the client trust your team

Tailor AI's structure with these human elements before sending.

## Executive Summary Focus

The executive summary is often the only section the decision-maker reads. AI prompt: "Write a five-sentence executive summary of this proposal that leads with the client's most important business issue, our specific response, and the primary reason to choose us. No methodology jargon."`,
          keyTakeaways: [
            'AI produces structurally complete proposal first drafts quickly — tailoring is the consultant\'s job',
            'Brief AI with client context before generating: situation, problem, differentiation, and decision criteria',
            'Client-specific language, track record examples, and relationship evidence are the winning elements AI cannot supply without your input',
            'The executive summary is the most important section — prompt AI to lead with the business issue, not the methodology',
            'Use AI to stress-test proposal messaging against likely competitor positioning',
          ],
          exercise: {
            title: 'AI Proposal Draft',
            description:
              'Use AI to produce a first draft proposal for a real or hypothetical engagement, then tailor it for the client.',
            steps: [
              'Choose a current or recent RFP or proposal opportunity (or create a realistic hypothetical)',
              'Document your client context brief: situation, problem, your differentiation, their decision criteria',
              'Generate the first draft proposal using the AI workflow prompt',
              'Mark everything that is generic and needs client-specific tailoring',
              'Rewrite the executive summary by hand using client language and specific track record references',
              'Compare: how much of the AI draft survived your editing? Was it still time-saving?',
            ],
            tool: 'Claude',
          },
          quiz: [
            {
              question: 'What is the most important element a consultant must add to an AI-generated proposal draft?',
              options: [
                'Correct spelling and grammar',
                'Client-specific language, relevant track record references, and evidence of understanding the client\'s situation better than competitors',
                'A detailed methodology appendix',
                'The firm\'s standard terms and conditions',
              ],
              correct: 1,
              explanation:
                'AI produces generic professional proposals. Winning proposals are specific: they use the client\'s own language from the brief or previous meetings, they reference track record examples that are genuinely relevant to the client\'s situation, and they demonstrate that this team understands the client\'s problem more deeply than competitors. These elements cannot come from AI — they come from the client relationship and the firm\'s track record.',
            },
          ],
        },
        {
          id: 'consulting-m3-l2',
          title: 'Slide Deck Production with AI',
          duration: 20,
          description:
            'Use AI to accelerate slide content development — from structuring the narrative to writing slide titles and body content — without losing the analytical rigour that makes consulting decks valuable.',
          content: `## The Consulting Slide Standard

Consulting slides follow specific conventions: one idea per slide, assertion-based titles (not descriptive titles), supporting evidence in the body, MECE structure at the deck level. AI can produce content that meets this standard if you prompt it correctly.

## AI in the Slide Production Workflow

**Stage 1 — Storyboard.** AI can generate a slide-by-slide storyboard from an outline of your argument. "I am building a 20-slide deck arguing [recommendation] for [client]. The key supporting arguments are [list]. Generate a slide-by-slide storyboard with an assertion-based title for each slide and two to three bullet points of body content."

**Stage 2 — Assertion title writing.** Assertion titles state the insight ("Digital channels drive 3× higher NPS than traditional channels"), not the topic ("Channel performance comparison"). AI can convert descriptive titles to assertion titles at speed. "Rewrite these descriptive slide titles as assertion-based titles that state the key finding."

**Stage 3 — Body content development.** For each slide, AI can draft the supporting bullets from your research notes and analysis. "For a slide arguing [assertion], write three concise supporting bullets. Each bullet should be a specific, evidence-backed observation, not a generic statement."

**Stage 4 — Executive summary slide.** AI is particularly useful for the exec summary: "Write a five-bullet executive summary slide for this deck. Each bullet should be an action-oriented conclusion. Start each bullet with the key insight, not the analysis."

## The Storyboard Quality Check

Before generating slide content, review the storyboard for:
- Does each slide title tell one clear story?
- Does the sequence tell a logical, building narrative?
- Is the overall argument structure persuasive?

Fixing the storyboard takes 20 minutes. Fixing a poorly structured deck after all slides are drafted takes four hours.

## What AI Cannot Build

AI builds content, not visual design. The actual slide layout, data visualisation, and graphical treatment require human judgment (and often a designer). AI helps you know exactly what to design before you open PowerPoint.`,
          keyTakeaways: [
            'Use AI to build the storyboard before any slides are designed — structure is faster to fix than content',
            'Assertion-based slide titles state the finding, not the topic — AI can convert descriptive titles quickly',
            'AI slide body content needs evidence-backed specifics, not generic observations — check quality carefully',
            'Fix the storyboard structure before generating all slide content — a well-structured outline produces better AI content',
            'AI builds the content architecture; visual design still requires human judgment',
          ],
          exercise: {
            title: 'AI Slide Storyboard',
            description:
              'Use AI to build a slide storyboard for a recent presentation, then convert descriptive titles to assertion titles.',
            steps: [
              'Choose a recent or current presentation you are working on or have recently delivered',
              'Ask Claude to generate a 10-slide storyboard from your key argument and supporting points',
              'Review each slide title: is it descriptive ("Market overview") or assertion-based ("Market is growing at 12% CAGR, driven by three structural shifts")?',
              'Ask Claude to convert all descriptive titles to assertion titles',
              'Evaluate the result: do the assertion titles tell the story of your argument when read in sequence?',
              'Identify the two slides where the assertion is weakest — what additional analysis or data do you need to make those assertions confidently?',
            ],
            tool: 'Claude',
          },
          quiz: [
            {
              question: 'What is the difference between a descriptive slide title and an assertion-based slide title?',
              options: [
                'Descriptive titles are shorter than assertion titles',
                'Descriptive titles label the topic ("Market overview"); assertion titles state the finding ("Market growing at 12% CAGR driven by three structural shifts")',
                'Assertion titles always include data; descriptive titles do not',
                'Descriptive titles are used in appendices; assertion titles in the main deck',
              ],
              correct: 1,
              explanation:
                'The assertion title principle is fundamental to consulting slide standards. A descriptive title tells the reader what the slide is about, requiring them to read the body to understand the insight. An assertion title states the insight directly in the title — the reader knows the key finding without reading the body. This structure is faster to read and forces the consultant to have a clear point of view rather than presenting data without conclusions.',
            },
          ],
        },
        {
          id: 'consulting-m3-l3',
          title: 'Client Communication and Stakeholder Management',
          duration: 18,
          description:
            'Use AI to produce clearer, better-calibrated client communications — from difficult message sequencing to executive briefings and status updates.',
          content: `## Communication as a Consulting Differentiator

The quality of client communication is one of the most visible differentiators between consulting firms. Clients remember how well (or poorly) they were kept informed, how difficult messages were handled, and how clearly the team communicated progress and decisions. AI makes high-quality communication more consistent.

## AI for Difficult Message Communication

Consulting often involves delivering unwelcome findings: the strategy isn't working, the business case doesn't support the investment, the change programme is behind schedule. AI can help structure these messages sensitively but clearly.

Prompt: "I need to communicate to a senior client that [difficult message]. The client context is [describe]. Help me structure this message using the pyramid principle (bottom line up front, then reasoning). Tone should be direct but constructive — avoid hedging but acknowledge the difficulty."

## Stakeholder-Specific Communication

Different stakeholders need different versions of the same message. AI can produce adapted versions for:
- The CEO: decision-focused, brief, strategic implications prominent
- The CFO: financial impact, risk, and assumptions
- The project sponsor: progress, milestones, decisions needed
- The working team: task-level clarity, deadlines, next steps

Prompt: "Here is our key finding for this engagement [describe]. Write versions for: (1) the CEO who will read it in 30 seconds, (2) the CFO who wants the financial implications, (3) the project team lead who needs action items."

## Status Update Automation

Consulting status updates (weekly project emails, steering committee packs) follow predictable structures. AI can produce first drafts in minutes.

Prompt: "Write a consulting engagement status update email for a [type] engagement. Progress this week: [bullet points]. Issues/risks: [describe]. Decisions needed: [describe]. Next week focus: [describe]. Tone: professional, brief, action-oriented."

## The Communication Review Standard

Client communications require human review for:
- Tone calibration (is this appropriately direct without being blunt?)
- Political sensitivity (does this message acknowledge the right stakeholders?)
- Accuracy (are commitments and deadlines correct?)
- Firmness where needed (is the message hedged where it should be clear?)`,
          keyTakeaways: [
            'Difficult messages should use pyramid principle: bottom line up front, then reasoning — AI can structure this',
            'Adapt the same finding for different stakeholders: CEO, CFO, project sponsor, working team each need different emphasis',
            'Status update emails follow predictable structures that AI can draft from bullet-point inputs',
            'Review AI client communications for tone, political sensitivity, accuracy, and appropriate firmness',
            'Clear communication about risks and decisions is a consulting differentiator — AI makes consistency achievable',
          ],
          exercise: {
            title: 'Multi-Stakeholder Communication',
            description:
              'Practice producing stakeholder-adapted communications for the same consulting finding.',
            steps: [
              'Choose a consulting finding or recommendation from a current or recent engagement (or create a realistic hypothetical)',
              'Use AI to produce three versions: for the CEO (30 seconds), the CFO (financial implications), and the working team lead (action items)',
              'Review each for stakeholder appropriateness: is the CEO version strategic enough? Is the CFO version financially specific? Is the team version action-oriented?',
              'Identify the hardest communication to write — what makes it hard? What additional information does AI need to make it right?',
              'Rewrite the hardest one by hand, incorporating the AI draft and your own judgment on tone and sensitivity',
            ],
            tool: 'Claude',
          },
          quiz: [
            {
              question: 'What is the pyramid principle in consulting communication?',
              options: [
                'Building the argument from many data points up to one conclusion',
                'Leading with the bottom-line conclusion, followed by the supporting reasoning and evidence',
                'Starting with broad context before narrowing to the specific recommendation',
                'Using a three-tier hierarchy of slides in every deck',
              ],
              correct: 1,
              explanation:
                'The pyramid principle (developed by Barbara Minto at McKinsey) is a communication structure that leads with the conclusion and then provides supporting evidence. It is opposite to academic writing, which builds evidence to a conclusion. Consulting clients are busy executives who need the answer first and the reasoning second. AI can structure communications using pyramid principle if you specify this in the prompt.',
            },
          ],
        },
        {
          id: 'consulting-m3-l4',
          title: 'Recommendation Development and Story Building',
          duration: 15,
          description:
            'Use AI to pressure-test recommendations, build compelling narratives, and anticipate client objections before you present.',
          content: `## The Recommendation Quality Standard

A consulting recommendation must meet three tests: it must be logically sound (the evidence supports it), strategically appropriate (it fits the client's context and constraints), and persuasively argued (it lands with the client's decision-makers). AI can help with the first and third; the second requires the consultant's judgment.

## Pressure-Testing Recommendations with AI

Before presenting a recommendation, ask AI to challenge it:

"Here is our recommendation for [client]: [state it]. The supporting logic is [summarise]. Generate the five strongest objections a sceptical senior executive would raise. For each objection, suggest how we should pre-empt or respond to it."

This surfaces objections before your client does, giving you time to either strengthen the recommendation or prepare your response.

## Building the Recommendation Narrative

The most persuasive consulting narrative follows a story structure: situation, complication, resolution (answer), key arguments (why this answer), implications (what it means for you), and call to action (what we need you to decide).

Prompt: "Build a consulting narrative structure for the following recommendation: [state it]. Client situation: [describe]. The complication is: [describe]. Use the situation-complication-resolution structure, followed by three key supporting arguments and a clear call to action."

## Anticipating Alternative Conclusions

Clients sometimes prefer a different answer. AI can help you understand why and how to address it:

"A client might prefer [alternative recommendation] to our recommendation. What are the most plausible reasons they would prefer the alternative? How should we acknowledge these reasons while still defending our recommendation?"

## The Professional Responsibility of Recommendations

The consultant is professionally responsible for every recommendation. AI can help structure the argument and anticipate objections — but the judgment that this recommendation is correct for this client, at this time, given these constraints, is always the consultant's. Never present an AI-generated recommendation without having assessed its appropriateness with your own expertise.`,
          keyTakeaways: [
            'Pressure-test recommendations with AI before presenting: generate the five strongest executive objections',
            'Build recommendation narratives using situation-complication-resolution-arguments-implications-call to action',
            'Anticipating alternative conclusions clients might prefer helps you prepare more persuasive presentations',
            'Professional responsibility for all recommendations stays with the consultant — AI helps structure the argument, not make the judgment',
            'A recommendation that survives AI pressure-testing is more likely to survive client scrutiny',
          ],
          exercise: {
            title: 'Recommendation Pressure Test',
            description:
              'Use AI to stress-test a recommendation and build a more robust narrative before client presentation.',
            steps: [
              'Choose a recommendation from a current or recent engagement',
              'Generate the five strongest executive objections using the pressure-test prompt',
              'Assess each objection: can you answer it confidently? Does any objection suggest a flaw in the recommendation you should address?',
              'Build the recommendation narrative using the S-C-R structure prompt',
              'Ask Claude: "What alternative conclusions might a CFO draw from this same analysis?" Review AI\'s alternatives and prepare your response to the most plausible one.',
            ],
            tool: 'Claude',
          },
          quiz: [
            {
              question: 'Why should a consultant pressure-test a recommendation with AI before presenting it to a client?',
              options: [
                'To ensure AI agrees with the recommendation before presenting it',
                'To surface likely client objections in advance so the consultant can either strengthen the recommendation or prepare responses',
                'To get AI\'s opinion on whether the recommendation is correct',
                'To generate alternative recommendations the client might prefer',
              ],
              correct: 1,
              explanation:
                'Pressure-testing surfaces objections that will come up during the client presentation, but gives you time to address them before the meeting rather than on the spot. If a pressure-test objection reveals a genuine weakness in the recommendation, you have time to strengthen it. If the objection is addressable, you prepare your response. Either outcome makes the presentation more successful.',
            },
          ],
        },
      ],
    },
    {
      id: 'consulting-m4',
      title: 'Advanced Consulting AI Applications',
      description:
        'Apply AI to the higher-order consulting challenges: financial modelling, change management, client upskilling, and building your long-term competitive advantage as an AI-enabled consultant.',
      lessons: [
        {
          id: 'consulting-m4-l1',
          title: 'AI for Financial and Business Modelling',
          duration: 20,
          description:
            'Use AI to accelerate financial model development, scenario planning, and the quantitative analysis that supports consulting recommendations.',
          content: `## AI in Quantitative Consulting Work

Consulting often requires building financial models, running scenario analysis, and producing quantitative evidence for recommendations. AI can accelerate this work meaningfully — particularly in the design, documentation, and communication stages of modelling — though the actual modelling expertise remains with the consultant.

## Where AI Helps in Financial Work

**Model structure design.** Before building a model, AI can help you design the structure: "For a three-year business case model for a [type of investment], what should the income statement, cash flow, and balance sheet structure look like? What are the key drivers and assumptions?"

**Assumption documentation.** Models are only as good as their assumptions. AI can help document assumption rationale: "Write documentation for the following model assumptions: [list assumptions]. For each, explain the rationale, the source if applicable, and the sensitivity of the model to this assumption."

**Scenario development.** "For a [business type] model, define three scenarios: base case, downside case (pessimistic), and upside case (optimistic). For each scenario, specify how the following five key drivers should be adjusted from the base case and the narrative rationale for each adjustment."

**Model-to-narrative translation.** Translating model outputs into executive-readable language: "Based on these model results [paste key outputs], write an executive summary that describes what the model shows, the key sensitivities, and the recommendation the model supports."

## What AI Cannot Do in Modelling

**Build the actual model.** AI cannot replace Excel or financial modelling expertise. It can suggest structure and document assumptions, but the analyst builds the model.

**Verify the numbers.** AI will not catch a formula error in your model. Numerical accuracy in models requires human review.

**Provide client-specific benchmarks.** AI benchmarks from training data may be outdated. Verify key benchmark assumptions through current sources.`,
          keyTakeaways: [
            'AI accelerates model design, assumption documentation, scenario development, and model-to-narrative translation',
            'AI cannot build the actual model or replace Excel and financial modelling expertise',
            'Document model assumptions with AI to produce more thorough sensitivity analysis and audit trails',
            'Model-to-narrative translation from AI helps non-financial stakeholders understand quantitative outputs',
            'Verify benchmark assumptions from AI through current primary sources before including in financial models',
          ],
          exercise: {
            title: 'Model Structure and Narrative',
            description:
              'Use AI to design a business case model structure and translate model outputs into an executive narrative.',
            steps: [
              'Choose a type of investment or business case relevant to your consulting practice',
              'Ask Claude to design a three-year model structure: key income statement drivers, cash flow structure, and key assumptions',
              'Create a set of hypothetical model outputs (revenue growth %, margin, NPV, payback period)',
              'Ask Claude to translate these outputs into a five-sentence executive narrative that communicates the key finding and recommendation',
              'Review the narrative: is it clear, assertive, and free of financial jargon that a CEO might not understand?',
            ],
            tool: 'Claude',
          },
          quiz: [
            {
              question: 'Which stage of financial modelling does AI accelerate most effectively?',
              options: [
                'Building the Excel formulas and financial model structure',
                'Model design, assumption documentation, and translating model outputs into executive-readable narrative',
                'Checking formula accuracy and model validation',
                'Selecting the appropriate accounting standards to apply',
              ],
              correct: 1,
              explanation:
                'AI excels at structured thinking and text generation tasks within financial work: designing model architecture (what should go in each section), documenting assumption rationale, developing scenario narratives, and translating quantitative outputs into clear executive communication. It cannot build or validate the actual model, which requires financial modelling expertise and careful human verification.',
            },
          ],
        },
        {
          id: 'consulting-m4-l2',
          title: 'Helping Clients Build AI Capability',
          duration: 18,
          description:
            'Develop the expertise to guide client organisations through AI adoption — positioning your firm as a strategic AI partner, not just a project delivery resource.',
          content: `## AI Consulting as a Growth Opportunity

AI adoption is one of the largest and fastest-growing areas of consulting work. Clients need help with: identifying AI opportunities, building AI governance frameworks, managing AI change programmes, selecting AI vendors, and measuring AI ROI. Consultants who understand AI — not just as a tool for their own work but as a business transformation challenge — are positioned to capture this demand.

## Common Client AI Challenges

**Opportunity identification.** Where should we apply AI in our organisation? Most clients want AI but don't have a systematic approach to identifying where it creates most value. Consulting can provide: AI opportunity assessment, use case prioritisation, and pilot design.

**Build vs. buy vs. partner.** Should the client build proprietary AI, implement an off-the-shelf solution, or partner with an AI provider? This is a strategy question that involves: competitive differentiation, data considerations, cost and risk, and speed to value.

**Governance and risk.** As clients deploy AI, they need: AI policies, acceptable use frameworks, risk assessment processes, and regulatory compliance (particularly EU AI Act for European clients). This is an area where consulting adds significant value.

**Change management.** AI adoption requires employees to change how they work. Most AI programmes underperform not because of technology failure but because of adoption failure. Change management is a core consulting competency that is especially valuable here.

**AI ROI measurement.** Clients need to justify AI investment to boards and leadership. Consulting can design measurement frameworks, establish baselines, and track business impact.

## Your AI Consulting Positioning

When clients ask about your firm's AI capabilities, be ready to discuss:
- How you use AI in your own delivery (with client consent)
- Your firm's AI strategy and governance approach
- Your experience advising clients on AI adoption
- Specific AI engagements you have delivered or supported`,
          keyTakeaways: [
            'AI consulting is a major growth area: opportunity identification, governance, change management, and ROI measurement',
            'Most AI programme failures are adoption failures, not technology failures — change management expertise is high value',
            'The EU AI Act creates compliance consulting opportunities for clients operating in Europe',
            'Position your firm as a strategic AI partner by demonstrating AI fluency in your own delivery',
            'Build vs. buy vs. partner decisions for AI require strategy consulting expertise, not just technical knowledge',
          ],
          exercise: {
            title: 'AI Consulting Service Design',
            description:
              'Design a consulting service offering around one of the common client AI challenges.',
            steps: [
              'Choose one of the common client AI challenges: opportunity identification, governance, change management, or ROI measurement',
              'Ask Claude: "Help me design a consulting service offering for [chosen challenge]. Include: the client problem, the value we deliver, the approach (at a high level), typical deliverables, and the case for why a consultant adds value versus the client doing this internally."',
              'Review the service design: does it leverage distinctly consulting capabilities, or could the client do this alone?',
              'Identify the one component where external consulting adds most value and sharpen the value proposition for that component',
              'Draft a one-paragraph pitch for this service you could use in a client conversation',
            ],
            tool: 'Claude',
          },
          quiz: [
            {
              question: 'Why do most AI adoption programmes underperform against their business case?',
              options: [
                'The AI technology is not mature enough for business use',
                'Adoption failure — employees don\'t change how they work, so the technology never delivers its intended business impact',
                'AI programmes are always over-budget',
                'Business cases for AI are always over-optimistic',
              ],
              correct: 1,
              explanation:
                'The pattern in AI programme performance consistently shows that technology delivery is rarely the limiting factor — the AI tools often work as designed. The limiting factor is adoption: employees who continue using old processes, managers who don\'t model AI-enabled behaviour, training that doesn\'t translate to daily workflow change. Change management is the highest-value component of AI consulting because it is where programmes most commonly fail.',
            },
          ],
        },
        {
          id: 'consulting-m4-l3',
          title: 'AI Ethics and Responsible Use in Consulting',
          duration: 15,
          description:
            'Develop the ethical framework for responsible AI use in consulting — including client disclosure, data handling, bias awareness, and the professional responsibilities that remain human.',
          content: `## Professional Responsibility in AI-Assisted Consulting

The consulting profession is built on trust: clients trust that the advice they receive is in their interest, is professionally rigorous, and represents the consultant's best judgment. AI assistance does not change these obligations — it creates new questions about how they are met.

## Disclosure: When and How Much to Tell Clients

There is an evolving professional conversation about whether consultants should disclose AI use to clients. Current practice varies. The relevant questions:

- Does your firm's engagement agreement include AI in scope?
- Does the client have expectations about how work is produced?
- Are client-confidential documents being processed through AI tools the client hasn't agreed to?
- Would the client's view of the work change if they knew AI was involved?

When in doubt, err toward transparency. Many clients are themselves exploring AI and welcome the conversation. Treating it as a secret creates risk if they discover it later.

## Data Privacy in Consulting AI Use

Client data — financial models, strategic plans, organisational information, customer data — is highly sensitive. Before processing any client data through an AI tool:

- Confirm your firm's approved tool list
- Confirm the client's data processing and confidentiality requirements
- Anonymise where required
- Understand how the AI tool handles data submitted to it

The professional standard: treat client AI data handling with the same care as any other client confidential information.

## Bias Awareness in AI-Generated Analysis

AI can embed biases from its training data. In consulting, this can manifest as:
- Geographic or market biases (stronger data for some markets than others)
- Recency biases (better information on recent trends than historical patterns)
- Size biases (more data on large companies than SMEs)

When AI analysis will inform a client recommendation, consider where these biases might affect the output and apply appropriate scepticism.

## The Undelegate-able Responsibilities

Regardless of how much AI is used in a consulting engagement, the following remain the consultant's professional responsibility:
- The quality and accuracy of the final recommendation
- The ethical appropriateness of the advice
- The protection of client confidential information
- Professional judgment when AI output and evidence diverge`,
          keyTakeaways: [
            'AI use in consulting creates new disclosure questions — when in doubt, err toward client transparency',
            'Client data processed by AI tools is subject to the same confidentiality obligations as all client information',
            'AI biases (geographic, recency, size) can affect the quality of AI-generated analysis — apply appropriate scepticism',
            'Professional responsibility for recommendation quality, ethics, and confidentiality is undelegate-able',
            'Treating AI use as a secret creates professional risk — proactive disclosure builds trust',
          ],
          exercise: {
            title: 'AI Ethics Self-Assessment',
            description:
              'Audit your current AI consulting workflow against the ethical framework.',
            steps: [
              'Review your current use of AI tools on client engagements against three criteria: (a) are you using approved tools only, (b) is any client-confidential data being processed without appropriate agreements, (c) have you disclosed AI use where the client would likely want to know?',
              'Identify the one area where your current practice is least aligned with the ethical framework',
              'Ask Claude: "Help me design a short checklist I can use before using AI on any client engagement to ensure responsible use. Cover: tool approval, data handling, disclosure, and output quality."',
              'Review the checklist against your firm\'s existing policies',
              'Adopt the checklist for your next AI-assisted engagement task',
            ],
            tool: 'Claude',
          },
          quiz: [
            {
              question: 'When should a consultant disclose their use of AI to a client?',
              options: [
                'Never — AI use is a competitive advantage that should be kept confidential',
                'Only when the client specifically asks',
                'When the engagement agreement doesn\'t address it, when client data is being processed, or when the client would likely want to know — err toward transparency',
                'Only when the AI output is used verbatim without editing',
              ],
              correct: 2,
              explanation:
                'The professional standard is evolving but trends toward transparency. Clients who discover undisclosed AI use — particularly where their confidential data was processed — may view it as a breach of trust. Proactive disclosure, framed as "here\'s how we use AI to improve efficiency and quality in your engagement," is increasingly expected and often welcomed. Treat disclosure as an opportunity to demonstrate AI sophistication, not as a risk to manage.',
            },
          ],
        },
        {
          id: 'consulting-m4-l4',
          title: 'Building Your AI Competitive Advantage',
          duration: 15,
          description:
            'Design your personal AI development strategy to build a durable competitive advantage as a consultant in a rapidly AI-enabled profession.',
          content: `## Why AI is a Consulting Career Differentiator

Consulting is highly competitive. AI fluency — knowing how to use AI effectively, how to help clients use it strategically, and how to deliver better work faster using AI — is rapidly becoming a differentiator between consultants and firms. Those who build this capability now compound its advantage over time.

## What "AI Fluent" Means for Consultants

AI fluency in consulting is not knowing how AI systems are built. It is:
- Using AI tools effectively in your own delivery (this programme is the foundation)
- Understanding AI business applications well enough to advise clients
- Being able to explain AI's capabilities and limitations credibly to senior clients
- Having a perspective on where AI is creating and disrupting value in your clients' industries

This combination — AI as a tool AND AI as a subject matter — is the career-defining opportunity.

## The Three-Layer AI Consulting Advantage

**Layer 1 — Productivity.** Use AI to produce better work faster. Every consultant benefits. This is the table stakes. You have built this through this programme.

**Layer 2 — Insight quality.** Use AI to run more hypotheses, synthesise more research, pressure-test more recommendations. Your analytical output improves. This differentiates you from peers at the same career level.

**Layer 3 — Client advisory.** Advise clients on their AI strategy, adoption, and governance. This differentiates you as a practice leader and opens a significant and growing market.

## Building Your AI Expertise Plan

Over the next 90 days:
1. **Apply AI consistently** to your daily consulting work (Layer 1)
2. **Learn one client AI use case deeply** relevant to your practice area
3. **Develop a perspective** on where AI is creating the most value in your clients' industries

Over the next 12 months:
- Develop a track record of AI-enabled consulting delivery
- Build expertise in one AI-specific consulting offering (AI governance, change management, opportunity assessment)
- Establish yourself internally as an AI resource for your team`,
          keyTakeaways: [
            'AI fluency combines effective tool use AND subject matter expertise for client advisory',
            'Three-layer AI consulting advantage: productivity (table stakes), insight quality (differentiator), and client advisory (practice leadership)',
            'The 90-day plan: daily AI application, one client AI use case deep dive, and an industry AI perspective',
            'AI expertise compounds over time — those building it now develop a durable advantage',
            'Being the AI resource for your team is a visible, career-accelerating position in most consulting firms',
          ],
          exercise: {
            title: 'My AI Consulting Strategy',
            description:
              'Design your 90-day AI development plan to build consulting-specific AI expertise.',
            steps: [
              'Assess your current AI fluency level honestly: Layer 1 (productivity) — how consistently are you using AI? Layer 2 (insight quality) — where have you used AI to improve your analytical output? Layer 3 (client advisory) — can you have a credible conversation with a client about their AI strategy?',
              'Identify your most important gap',
              'Choose one client AI topic relevant to your practice area to develop deeper expertise in (AI governance, change management, opportunity identification, or a sector-specific AI application)',
              'Ask Claude: "Help me develop a 90-day learning plan to build expertise in [chosen topic]. What should I read, what should I practise, and how should I develop a point of view?"',
              'Write a three-sentence summary of your AI consulting positioning that you could use in an internal career conversation',
            ],
            tool: 'Claude',
          },
          quiz: [
            {
              question: 'What distinguishes a Layer 3 AI-fluent consultant from a Layer 1 AI-fluent consultant?',
              options: [
                'Layer 3 consultants use more AI tools than Layer 1 consultants',
                'Layer 3 consultants can advise clients on their AI strategy and adoption, not just use AI for their own productivity',
                'Layer 3 consultants spend more time on AI than on consulting',
                'Layer 3 consultants work exclusively on AI-focused engagements',
              ],
              correct: 1,
              explanation:
                'Layer 1 AI fluency (using AI for your own productivity) is increasingly the minimum standard in consulting. Layer 3 fluency — being able to have a credible, substantive conversation with a CEO or board about their AI strategy, helping clients prioritise AI investments, and designing AI governance frameworks — is where consulting value and fee growth are concentrated. The distance between Layer 1 and Layer 3 is subject matter expertise about AI as a business transformation challenge, not just a personal productivity tool.',
            },
          ],
        },
      ],
    },
  ],
}
