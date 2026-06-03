import type { SubRoleLessons } from './types'

export const marketingSubRoles: SubRoleLessons = {
  'brand-comms': {
    title: "AI for Brand & Communications",
    description: "Master AI tools to craft compelling brand narratives, streamline PR workflows, and maintain brand consistency at scale — without losing the human voice that makes your brand distinct.",
    lessons: [
      {
        id: "marketing-brand-comms-l1",
        title: "AI for Brand Professionals: What Changes, What Doesn't",
        duration: 16,
        description: "Understand where AI genuinely helps brand and communications work — and where it creates risk. Build the mental model you need before touching any tool.",
        content: `## The Brand Paradox

Your job is to make a brand feel distinctly human. AI is a machine. So where does AI actually fit in brand and communications work — and where should you keep it far away?

The answer depends on understanding what AI does well and what it cannot do.

## What AI Can Do for Brand Professionals

**First-draft acceleration.** Brand writing is often bottlenecked at the blank-page stage. AI eliminates that. Give it your tone of voice guidelines, a content objective, and a format — you'll have a working draft in seconds.

**Variant generation at scale.** Need ten tagline options, not two? AI produces abundance. You curate. That's a better creative process than agonising over two ideas.

**Tone-shifting and adaptation.** Adapting brand copy for different channels (LinkedIn vs Instagram vs a press release) is tedious. AI handles the structural shifts while you check the voice holds.

**Research and summarisation.** Competitive communications landscape, analyst tone shifts, media coverage themes — AI can synthesise quickly so you brief and strategise faster.

## What AI Cannot Do

- **Own your brand voice.** AI reflects patterns in its training data, not the specific voice in your guidelines. Without explicit instruction, it defaults to generic.
- **Make editorial judgements.** Whether a reactive statement strikes the right tone in a specific cultural moment is a human call.
- **Know your audience.** AI has no real knowledge of your customer's lived experience. You do.
- **Protect you from off-brand output.** AI will confidently produce copy that violates your brand guidelines if you don't brief it properly.

## The Practical Implication

AI is your fastest, most tireless copywriter — but one with no brand memory and no cultural instinct. Your value shifts to **briefing quality, editorial judgement, and consistency stewardship**. These are higher-order brand skills, not lower ones.

## Starting Right

Before using AI for any brand copy, assemble a **brand brief block**: your tone of voice descriptors, three examples of on-brand copy, and three examples of what you actively avoid. Paste this at the start of every session.

\`\`\`
You are writing brand copy for [Company]. Our tone of voice is [adjectives: e.g. "direct, warm, never jargon-heavy"]. We always [e.g. "use active voice and speak to one person"]. We never [e.g. "use exclamation marks or superlatives"]. Here are three on-brand examples: [paste]. Now write [task].
\`\`\`

This single habit accounts for 80% of brand consistency in AI-generated output.`,
        keyTakeaways: [
          "AI accelerates brand writing but has no brand memory — brief it explicitly every time",
          "Your value shifts to briefing quality, editorial judgement, and consistency stewardship",
          "AI cannot make cultural or tonal editorial calls — those remain human decisions",
          "A reusable brand brief block pasted at the start of each session is your most important habit"
        ],
        exercise: {
          title: "Build Your Brand Brief Block",
          description: "Create the reusable AI briefing text that will underpin all your brand copy sessions.",
          steps: [
            "Open Claude or ChatGPT and start a new conversation",
            "Write out your brand's tone of voice in 3–5 adjectives and one sentence each explaining what they mean in practice",
            "Find two on-brand copy examples (real, published) and two examples of what your brand explicitly avoids",
            "Draft a brand brief block using the template in the lesson and paste it into the chat",
            "Ask AI to write a 100-word LinkedIn post about a hypothetical product update — review whether the output feels on-brand and note exactly where it deviates"
          ],
          tool: "Claude"
        },
        quiz: [
          {
            question: "What is the most important thing to include when prompting AI to write brand copy?",
            options: [
              "The word count and target platform",
              "Your tone of voice guidelines and on-brand examples",
              "The name of the AI model you are using",
              "A list of competitor brand names to avoid referencing"
            ],
            correct: 1,
            explanation: "AI has no memory of your brand between sessions. Tone of voice descriptors and on-brand examples are the single most impactful inputs — without them, AI defaults to generic patterns from its training data."
          },
          {
            question: "Which of the following is AI LEAST capable of handling independently in brand communications work?",
            options: [
              "Generating ten tagline options from a brief",
              "Rewriting a press release in a more conversational tone",
              "Judging whether a reactive statement is appropriate given current media sentiment",
              "Summarising competitor brand messaging from provided web copy"
            ],
            correct: 2,
            explanation: "Editorial judgement — especially in reactive or culturally sensitive situations — requires human context, lived experience, and real-time awareness that AI does not have."
          },
          {
            question: "A brand professional uses AI to adapt their LinkedIn copy for Instagram. What should they do after receiving the AI output?",
            options: [
              "Publish immediately — AI handles tone adaptation reliably",
              "Check the output against brand guidelines and edit before publishing",
              "Run a second AI session to fact-check the output",
              "Only use the output as inspiration, never as actual copy"
            ],
            correct: 1,
            explanation: "AI output should be treated as a first draft. Checking against brand guidelines and editing for voice accuracy before publishing is the correct workflow — AI accelerates, humans approve."
          }
        ],
        applyThisWeek: {
          action: "Write your brand brief block and use it for one real piece of copy this week — a social post, an email, or a media statement draft.",
          promptTemplate: "You are writing brand copy for [Company Name]. Our tone of voice is [adjective 1: meaning], [adjective 2: meaning], [adjective 3: meaning]. We always [behaviour 1]. We never [behaviour 2]. On-brand example: [paste]. Now write [specific task] for [audience] in [format], under [word count] words.",
          tool: "Claude"
        }
      },
      {
        id: "marketing-brand-comms-l2",
        title: "Writing Brand Guidelines and Tone of Voice with AI",
        duration: 18,
        description: "Use AI to create, pressure-test, and extend brand guidelines — from tone of voice frameworks to messaging pillars and writing do's and don'ts.",
        content: `## The Problem with Most Brand Guidelines

Most brand guidelines are either too abstract to use ("be authentic") or so long that nobody reads them. AI helps you solve both problems — by generating working examples at scale and by stress-testing guidelines against real scenarios.

## Where AI Adds the Most Value

**Generating worked examples.** The most useful section of any brand guidelines document is examples — on-brand vs off-brand sentences, before-and-after rewrites. AI can generate dozens in minutes once you establish the framework.

**Drafting the tone of voice narrative.** If you have workshop notes, interview transcripts, or a rough framework, AI can synthesise these into a coherent first draft of your tone of voice section.

**Stress-testing consistency.** Paste a tone of voice section and a piece of copy into AI and ask: "Does this copy match these guidelines? Where does it deviate?" AI surfaces inconsistencies you may have stopped seeing.

**Adapting guidelines for different audiences.** Your internal copywriting guidelines may need a simplified version for agencies, a checklist for social media managers, and a reference card for executive communications. AI drafts all three from the same source.

## The Core Workflow

1. **Source your raw material.** Notes from brand workshops, existing copy samples, interview quotes from leadership about what the brand should feel like.
2. **Synthesise with AI.** Feed the raw material and ask AI to identify tone patterns, draft adjective descriptions, and generate examples.
3. **Edit and validate.** Your judgement, not AI's, decides what is true to the brand.
4. **Scale the examples.** Use AI to generate 20+ on-brand/off-brand example pairs across different content types.

## Tone of Voice Prompt Example

\`\`\`
I am writing a tone of voice section for [Brand Name]'s brand guidelines. Here are three pieces of copy we consider on-brand: [paste]. Here are two pieces we consider off-brand: [paste]. Based on these examples, identify the five most distinctive tonal characteristics of our brand voice. For each, write: a one-sentence definition, a do example, and a don't example.
\`\`\`

## What to Keep Human

The final decision on what "authentic to the brand" means must come from the people who built and know the brand. AI reflects patterns — it cannot determine whether a tonal description is true to your company's values or just plausible-sounding.`,
        keyTakeaways: [
          "AI excels at generating worked examples and before/after rewrites — the most useful part of any guidelines document",
          "Feed AI your raw workshop notes and existing copy to synthesise a tone of voice first draft",
          "Use AI to stress-test consistency: paste guidelines and copy together and ask where they diverge",
          "Final tonal decisions must remain with the humans who know the brand — AI synthesises, you validate"
        ],
        exercise: {
          title: "Generate On-Brand/Off-Brand Example Pairs",
          description: "Use AI to create the worked examples section of a tone of voice document — the section that makes guidelines actually usable.",
          steps: [
            "Choose a brand you work with and write down 3–5 tone of voice adjectives (e.g. 'direct', 'warm', 'never condescending')",
            "Find two existing pieces of on-brand copy — a social post, a campaign line, or a web headline",
            "Open Claude and paste the adjectives plus the copy examples with the prompt from the lesson",
            "Ask Claude to generate 10 on-brand/off-brand sentence pairs across three content types: social post, email subject line, and web headline",
            "Review each pair — mark which feel accurate, which need adjustment, and rewrite any that miss the mark"
          ],
          tool: "Claude"
        },
        quiz: [
          {
            question: "What is the most efficient use of AI when creating brand guidelines?",
            options: [
              "Having AI write the entire guidelines document from scratch with no human input",
              "Feeding AI raw workshop notes and copy samples to generate a structured first draft",
              "Using AI to research competitor brand guidelines and replicate the best elements",
              "Asking AI to define what your brand's tone of voice should be based on your industry"
            ],
            correct: 1,
            explanation: "AI works best when given source material to synthesise. Workshop notes, interview quotes, and existing copy samples give AI the raw material to structure a useful first draft — which humans then validate and refine."
          },
          {
            question: "A brand manager uses AI to stress-test their tone of voice guidelines. What is the best way to do this?",
            options: [
              "Ask AI whether the guidelines sound professional",
              "Paste the guidelines and a piece of existing copy together and ask AI where the copy deviates from the guidelines",
              "Ask AI to score the guidelines on a scale of 1 to 10",
              "Compare the guidelines to industry benchmark examples using AI research"
            ],
            correct: 1,
            explanation: "Pasting both the guidelines and a specific piece of copy into the same prompt and asking AI to identify deviations is the most practical consistency check — it gives concrete, actionable feedback rather than abstract scores."
          },
          {
            question: "When AI generates a tone of voice description that sounds accurate, what should the brand professional do?",
            options: [
              "Accept it — AI has synthesised the input data correctly",
              "Validate it against the company's actual values and reject anything that is merely plausible rather than true",
              "Run it past a second AI tool to confirm accuracy",
              "A/B test it against the previous tone of voice description"
            ],
            correct: 1,
            explanation: "AI produces plausible-sounding descriptions, not necessarily true ones. Only people who know the brand can determine whether a tonal description reflects genuine brand values or just sounds like it could."
          }
        ],
        applyThisWeek: {
          action: "Take one section of your existing brand guidelines — or a rough set of notes — and use AI to generate 10 on-brand/off-brand example pairs that you could add to the document.",
          promptTemplate: "I am building the tone of voice section of brand guidelines for [Company Name]. Our tone is [adjective 1], [adjective 2], [adjective 3]. Here are two on-brand copy examples: [paste]. Generate 10 on-brand/off-brand sentence pairs for these content types: social media post, email subject line, and website headline. For each pair, briefly explain what makes the off-brand version wrong.",
          tool: "Claude"
        }
      },
      {
        id: "marketing-brand-comms-l3",
        title: "AI-Assisted PR: Media Pitches, Press Releases, and Reactive Comms",
        duration: 17,
        description: "Speed up PR writing without losing editorial control — from first drafts of press releases to reactive holding statements and targeted media pitches.",
        content: `## PR Writing Is Ideal AI Territory — With Conditions

Press releases, media pitches, and reactive statements are highly structured communications with established conventions. AI is excellent at producing first drafts within known structures. The conditions: you must verify every fact, maintain editorial control on tone, and never let AI make judgement calls on sensitive situations.

## Press Releases

AI can draft a standard press release in under two minutes if you provide:
- The announcement (what, who, when)
- A quote (in quotation marks, attributed to the right person)
- Two or three supporting facts or context points
- The target audience (trade press, national media, specialist sector)

What AI cannot do: verify the facts, ensure the quote sounds like the person who supposedly said it, or judge whether the announcement is genuinely newsworthy.

\`\`\`
Write a press release for the following announcement. Follow standard press release structure: strong headline, dateline, opening paragraph covering who/what/when/why, two supporting paragraphs, one attributed quote, boilerplate. Announcement: [detail]. Quote: "[exact quote]" — [Name, Title]. Target: [trade/national/specialist] press. Tone: [professional/conversational/corporate]. Key messages to include: [1, 2, 3].
\`\`\`

## Media Pitches

A media pitch is a personalised email to a specific journalist. AI's value here is in drafting the structural elements quickly — then you personalise. A useful AI workflow:

1. Draft the pitch hook using AI (the opening that connects your story to what that journalist covers)
2. Generate five different angle framings for the same announcement
3. Adapt the pitch length for different outlets (50 words for a quick tip; 200 words for a feature pitch)

## Reactive Communications

This is where human judgement is most critical. For reactive statements and crisis comms:

- Use AI only for structure and first drafts on **low-sensitivity situations**
- For anything involving public controversy, legal risk, or reputational sensitivity, AI should not draft — it should assist with language check after a human writes
- Never ask AI to judge whether a statement is appropriate for the situation

## Holding Statement Template

\`\`\`
Draft a holding statement for the following situation: [brief factual description of situation]. We cannot yet confirm [specific unknown]. We can confirm [what you know for certain]. Tone: measured and professional. Length: 50–80 words. Do not speculate or commit to timelines.
\`\`\``,
        keyTakeaways: [
          "AI drafts press releases well when given the announcement, quote, and key messages — you verify all facts",
          "For media pitches, use AI to generate multiple angle framings and adapt length — then personalise manually",
          "Reactive and crisis comms require human authorship; use AI only for low-sensitivity situations and post-draft language checks",
          "Never let AI judge whether a statement is tonally appropriate for a specific sensitive situation"
        ],
        exercise: {
          title: "Draft and Pressure-Test a Press Release",
          description: "Use AI to draft a press release for a real or hypothetical announcement, then systematically test its accuracy and tone.",
          steps: [
            "Choose a real or realistic announcement (a product launch, a hire, an award, a partnership)",
            "Assemble the inputs: a headline, key facts, one attributed quote, two context points, and a target audience",
            "Open Claude and use the press release prompt from the lesson to generate a first draft",
            "Read the draft and highlight every factual claim — verify each one against your source material",
            "Identify any line where the tone feels off-brand or where the AI has added a claim you didn't provide — rewrite those lines"
          ],
          tool: "Claude"
        },
        quiz: [
          {
            question: "What is the most important thing to check after AI drafts a press release?",
            options: [
              "Whether the headline is punchy enough",
              "That every factual claim in the draft was explicitly provided by you and is accurate",
              "Whether the word count meets standard press release length",
              "That the boilerplate section is at the end"
            ],
            correct: 1,
            explanation: "AI will confidently include details that sound plausible but were not in your brief, or extrapolate from what you provided. Every factual claim must be traced back to a source you supplied."
          },
          {
            question: "A brand enters a controversy involving a product safety concern. How should AI be used in the communications response?",
            options: [
              "Ask AI to draft the first reactive statement immediately — speed matters",
              "Have AI judge the appropriate tone and seriousness of the response",
              "Have a human write the statement first; use AI only to check language clarity after",
              "Use AI to research similar brand crises and replicate their response style"
            ],
            correct: 2,
            explanation: "In high-sensitivity situations — especially those involving legal, safety, or reputational risk — AI should not author the response. Humans write the statement; AI can then assist with clarity and consistency checks."
          },
          {
            question: "When using AI to generate media pitch angles, what is the correct follow-up step?",
            options: [
              "Send the AI-generated pitch directly to the journalist list",
              "Use the AI angles as a starting point, then personalise each pitch to the specific journalist and outlet",
              "Ask AI to identify which journalist would be most interested in each angle",
              "Run a grammar check and send"
            ],
            correct: 1,
            explanation: "AI generates structural options; personalisation is the human step. A pitch that feels tailored to a specific journalist's beat and previous coverage is far more likely to land than a generic AI draft."
          }
        ],
        applyThisWeek: {
          action: "Use AI to draft a press release or media pitch for your next announcement — then spend your editing time on personalisation and fact-checking rather than first-draft writing.",
          promptTemplate: "Write a press release for the following announcement. Use standard press release structure. Announcement: [what is happening, who is involved, when]. Key facts: [1, 2, 3]. Attributed quote: '[exact words]' — [Name, Title, Company]. Target audience: [trade press / national media / [sector] press]. Tone: [professional / conversational]. Include a standard boilerplate at the end: [company description in 2–3 sentences].",
          tool: "Claude"
        }
      },
      {
        id: "marketing-brand-comms-l4",
        title: "Protecting Brand Consistency in an AI-Assisted Team",
        duration: 18,
        description: "When your team uses AI, brand consistency is at risk. Learn how to build prompt libraries, review processes, and governance habits that keep the brand coherent at scale.",
        content: `## The New Brand Consistency Problem

When one person writes all the copy, consistency is a function of their memory and taste. When ten people use AI to produce copy — each with different prompts, different instructions, and different editing habits — consistency requires systems.

Brand governance in an AI-assisted team is not about restricting AI use. It's about building the shared infrastructure that makes AI output consistently on-brand.

## Three Systems That Work

**1. A Shared Prompt Library**

Create a team repository of approved prompt templates for recurring brand tasks. Each template should include the brand brief block (tone of voice, do's and don'ts, examples). Templates to start with:
- Social media post (by platform)
- Product announcement copy
- Campaign headline options
- Email subject line variants
- Media pitch opening paragraph

Store these in a shared doc, Notion, or a dedicated tool like PromptBase. When a team member uses an approved template, the brand guardrails are already built in.

**2. AI Output Review Protocols**

Establish a lightweight review standard:
- AI output is always a draft — no AI-generated copy goes live without human review
- Reviewer checks: tone match, factual accuracy, no invented details, brand vocabulary compliance
- For external copy (press, ads, web): mandatory senior review
- For internal or lower-stakes copy: self-review with checklist

**3. A Brand Vocabulary Reference**

Compile the words and phrases your brand owns and the ones it avoids. Include these in every AI prompt. Example format:
\`\`\`
Brand vocabulary — always use: [word list]
Brand vocabulary — never use: [word list]
Phrases we own: [e.g. a specific tagline or brand expression]
Phrases that sound like competitors: [list] — avoid
\`\`\`

## What to Brief Agencies and Freelancers

If external partners also use AI, your brand brief block becomes contractual guidance. Require them to:
- Use your approved prompt templates for any AI-assisted work
- Submit AI-assisted drafts at the same stage as any other draft — no skipping review
- Flag when content is AI-assisted so your team can apply the right review standard

## Your AI Brand Consistency Audit

Once a month, pull five pieces of AI-assisted copy from across your team and assess them against your tone of voice guidelines. This surfaces where the shared templates need updating — and where individual team members need coaching.`,
        keyTakeaways: [
          "Brand consistency in an AI-assisted team requires systems, not just individual discipline",
          "A shared prompt library with the brand brief block built in is the highest-leverage governance tool",
          "Establish a clear review protocol: AI output is always a draft, external copy gets senior review",
          "Extend your brand brief block to agency and freelancer briefs — AI use by partners needs the same guardrails"
        ],
        exercise: {
          title: "Build a Team Prompt Library Starter Kit",
          description: "Create three approved, ready-to-use AI prompt templates your team can use immediately for recurring brand copy tasks.",
          steps: [
            "Identify the three most frequently written types of copy in your team (e.g. LinkedIn posts, email subject lines, campaign headlines)",
            "For each, draft a prompt template that includes: the brand brief block, the content type, the target audience, and the format",
            "Test each template by running it in Claude and reviewing the output against your brand guidelines",
            "Refine any template that produced off-brand output, then document the final three templates in a shared location (Notion, Google Doc, or similar)",
            "Share the templates with one team member and ask them to run one — review their output and note what worked and what still needed editing"
          ],
          tool: "Claude"
        },
        quiz: [
          {
            question: "What is the primary purpose of a shared AI prompt library for a brand team?",
            options: [
              "To save time by eliminating the need for human review",
              "To ensure brand guardrails are built into every AI interaction, regardless of who is prompting",
              "To standardise which AI tool the team uses",
              "To replace the brand guidelines document"
            ],
            correct: 1,
            explanation: "A shared prompt library ensures that the brand brief block — tone of voice, vocabulary, examples — is embedded in every AI session, not just when an individual remembers to include it. It makes brand consistency a system, not a habit."
          },
          {
            question: "An agency partner submits AI-generated copy for a campaign. How should the brand team handle it?",
            options: [
              "Accept it at a higher standard — AI doesn't make creative errors",
              "Apply the same review process as any other draft, checking tone, accuracy, and brand compliance",
              "Reject all AI-generated agency work to protect brand standards",
              "Ask the agency to disclose which AI tool they used before reviewing"
            ],
            correct: 1,
            explanation: "AI-generated copy from external partners requires the same review rigour as any other draft. The source doesn't change the standard — the brand team remains accountable for what goes live."
          },
          {
            question: "How often should a brand team audit AI-assisted copy against their tone of voice guidelines?",
            options: [
              "Never — if templates are correct, output will always be on-brand",
              "Only when a brand refresh is planned",
              "Regularly (e.g. monthly), to surface where templates need updating and where coaching is needed",
              "Only after receiving external feedback about off-brand content"
            ],
            correct: 2,
            explanation: "Regular audits catch drift before it becomes visible externally. They also reveal which prompt templates need updating as the brand evolves — and identify team members who may need additional coaching on AI use."
          }
        ],
        applyThisWeek: {
          action: "Create your first shared prompt template for the most common type of copy your team produces — and test it with one colleague this week.",
          promptTemplate: "You are writing [content type] for [Company Name]. Brand voice: [adjective 1 — what it means in practice], [adjective 2 — what it means in practice]. Always use: [vocabulary list]. Never use: [vocabulary list]. On-brand example: [paste]. Write [specific task] for [audience] on [platform/channel]. Length: [word count]. Goal: [what you want the reader to do or feel].",
          tool: "Claude"
        }
      }
    ]
  },

  'content-seo': {
    title: "AI for Content & SEO",
    description: "Build a faster, smarter content operation — from AI-assisted research and briefs to keyword strategy, on-page optimisation, and a scalable content pipeline that doesn't sacrifice quality.",
    lessons: [
      {
        id: "marketing-content-seo-l1",
        title: "AI for Content Professionals: The Practical Starting Point",
        duration: 15,
        description: "Cut through the noise about AI in content and SEO. Understand exactly which parts of your workflow AI improves, which it doesn't, and how to start without creating new problems.",
        content: `## The Content Professional's Reality

AI content tools are everywhere, the promises are enormous, and the output quality varies wildly. Before adopting any tool, content professionals need a clear-eyed view of what AI actually changes — and what it doesn't.

## Where AI Genuinely Accelerates Content Work

**Research synthesis.** Feed AI a set of sources, articles, or data points and ask it to synthesise key themes. What takes an hour of reading takes minutes of prompting.

**Brief and outline generation.** AI can structure a content brief — covering angle, audience, key sections, tone, and SEO intent — in under two minutes. This isn't a final brief; it's a starting point that saves 30–45 minutes of structural thinking.

**First-draft acceleration.** AI produces serviceable first drafts for listicles, how-to articles, and explainer content. Quality varies significantly by content type — AI drafts work best where structure is predictable.

**Repurposing.** Turn a long-form article into a LinkedIn post, an email introduction, or five social captions. AI handles the structural reformatting; you check the tone.

## Where AI Creates Risk

- **Factual accuracy.** AI confidently states incorrect facts. Every claim in AI-assisted content must be verified before publication.
- **Original insight.** AI reflects existing knowledge — it cannot produce genuine proprietary analysis, original research, or novel perspective.
- **E-E-A-T.** Google's quality signals reward Experience, Expertise, Authoritativeness, and Trustworthiness. AI-generated content without human expertise layered in will underperform on these signals.
- **Brand voice.** Generic AI output sounds like every other AI-generated article — unless you brief it rigorously.

## The Right Mental Model

AI is the research assistant and structural scaffolder. You provide the expertise, the angle, the original insight, and the editorial voice. AI removes the mechanical work so you can spend more time on the parts that only humans can contribute.

\`\`\`
Act as a content strategist helping me plan an article. Topic: [topic]. Target audience: [description]. Primary search intent: [informational / commercial / navigational]. Suggest: an article angle that would differentiate from existing content, a working title, and an outline with 5–6 sections. Flag any section where first-hand expertise or original data would strengthen the piece.
\`\`\``,
        keyTakeaways: [
          "AI accelerates research synthesis, brief creation, first drafts, and repurposing — not original insight",
          "Every factual claim in AI-assisted content must be verified: AI will confidently produce incorrect information",
          "E-E-A-T signals require human expertise — AI output alone will underperform on Google quality assessments",
          "Your role shifts from mechanical writing to editorial direction, which produces better content outcomes"
        ],
        exercise: {
          title: "AI Content Workflow Audit",
          description: "Map your current content workflow and identify the three highest-leverage points for AI assistance.",
          steps: [
            "Write out the steps you follow to produce one typical piece of content from brief to publish (e.g. research → outline → draft → edit → SEO review → publish)",
            "For each step, estimate how long it takes and whether it involves mechanical work or creative/editorial judgement",
            "Open ChatGPT and ask it to suggest AI use cases for each step you identified",
            "Identify the two or three steps that are most time-consuming and least dependent on your specific expertise",
            "Run a test on one of those steps this week and track how much time AI saves versus how much editing the output needs"
          ],
          tool: "ChatGPT"
        },
        quiz: [
          {
            question: "Which content task is AI MOST reliable for without significant human editing?",
            options: [
              "Writing an opinion piece with a novel industry take",
              "Structuring a content outline for a how-to article",
              "Providing accurate statistics for an industry report",
              "Producing an E-E-A-T-optimised long-form article from scratch"
            ],
            correct: 1,
            explanation: "Structuring outlines for predictable content types — especially how-to articles with clear sections — is where AI performs most reliably. Novel takes, accurate statistics, and E-E-A-T signals all require significant human input."
          },
          {
            question: "What does E-E-A-T stand for and why does it matter for AI-generated content?",
            options: [
              "Engagement, Efficiency, Accuracy, Traffic — a social media metric",
              "Experience, Expertise, Authoritativeness, Trustworthiness — Google quality signals that AI alone cannot satisfy",
              "Editorial, Ethical, Accessible, Transparent — a content governance framework",
              "Earn, Engage, Attract, Transform — a content marketing funnel model"
            ],
            correct: 1,
            explanation: "E-E-A-T are Google's core content quality signals. AI-generated content without genuine human expertise, first-hand experience, or authoritative sourcing will underperform in search — because AI reflects existing knowledge, not original expertise."
          },
          {
            question: "A content manager uses AI to repurpose a long-form article into five social captions. What should they check before posting?",
            options: [
              "That the captions are the right character count for each platform",
              "That the captions are accurate, on-brand, and retain the article's key message without distortion",
              "That the AI tool used is approved by the marketing team",
              "That the captions include a call to action"
            ],
            correct: 1,
            explanation: "When AI repurposes content, it can subtly distort the original message, strip nuance, or add claims not in the source. Checking accuracy, brand voice, and message fidelity is more important than format compliance."
          }
        ],
        applyThisWeek: {
          action: "Pick one piece of content in your current pipeline and use AI to handle the research synthesis and outline stage — track time saved versus quality of starting point.",
          promptTemplate: "I am planning a [article / guide / post] on [topic] for [audience description]. The primary search intent is [informational / commercial / navigational]. Synthesise the key themes a reader at this stage would expect to find, then create a content outline with 5–6 sections, each with 1–2 bullet points of what that section should cover. Flag where original data, case studies, or first-hand expertise would strengthen the piece.",
          tool: "ChatGPT"
        }
      },
      {
        id: "marketing-content-seo-l2",
        title: "Research, Briefs, and Outlines: AI as Your Content Strategist",
        duration: 17,
        description: "Use AI to dramatically speed up content research, competitive analysis, and brief creation — so your team produces better-planned content in less time.",
        content: `## The Most Time-Consuming Part of Content Work

For most content professionals, research and planning take longer than writing. Reading competitors, identifying gaps, structuring a brief, and building an outline is often 40–60% of total production time. This is the highest-leverage area for AI assistance.

## AI-Assisted Competitive Content Research

Provide AI with the text of competitor articles (paste them in or describe their structure) and ask:

\`\`\`
I am researching competitor content on the topic [topic]. Here are three competitor articles: [paste or describe structure]. Analyse: 1) What angles and subtopics do all three cover? 2) What is missing or underserved? 3) Where do they rely on generic information rather than specific expertise? 4) What differentiating angle could I take that is both accurate and genuinely useful to a reader?
\`\`\`

This takes a 90-minute competitive review down to 15 minutes of AI analysis plus 15 minutes of your editorial judgement.

## Building a Content Brief with AI

A content brief should capture: target audience, primary keyword and intent, article angle, required sections, key sources, tone, word count, and internal links. AI can draft this entirely if you provide the inputs.

The key input is **search intent clarity** — before running the brief prompt, decide: is this informational (reader wants to learn), commercial (reader is evaluating options), or transactional (reader is ready to act)? Brief accuracy depends on this decision.

\`\`\`
Create a content brief for the following article. Primary keyword: [keyword]. Search intent: [informational / commercial / navigational]. Target audience: [description]. Desired outcome: [what you want the reader to do after reading]. Include: article angle and working title, recommended word count, key sections with brief descriptions, tone of voice, and 3–4 internal link opportunities from [your site's content areas]. Flag where original expertise or data would add the most value.
\`\`\`

## From Brief to Outline

Once the brief is approved, outline generation is fast. The critical step is making the outline **specific**, not generic. Ask AI to flag where sections risk being too generic and suggest what specific data, examples, or expertise would make each section distinctive.

## What Still Requires You

- Deciding which angle is right for your audience and brand
- Identifying what original insight your organisation can add
- Validating that the brief aligns with your editorial calendar and business goals
- Ensuring the outline serves the reader's actual question, not just SEO structure`,
        keyTakeaways: [
          "Research and planning are the highest-leverage areas for AI in content — they consume the most time and involve the most mechanical work",
          "Competitive content analysis with AI takes 90 minutes of reading down to 15 minutes of AI analysis plus editorial review",
          "Search intent classification is the most important input for AI-generated briefs — decide this before prompting",
          "Always ask AI to flag where sections risk being generic and what expertise or data would make them distinctive"
        ],
        exercise: {
          title: "AI Competitive Brief in 30 Minutes",
          description: "Run a full competitive analysis and produce a content brief for a real article using AI assistance.",
          steps: [
            "Choose a topic you are planning to write about in the next two weeks",
            "Find three competitor articles on that topic — copy their headings and subheadings into a document",
            "Open Claude and run the competitive analysis prompt from the lesson using the structure you collected",
            "Use Claude's competitive analysis output to draft a content brief using the brief prompt from the lesson",
            "Review the brief — add your angle, adjust the tone, and mark any section where you have original expertise or data to contribute"
          ],
          tool: "Claude"
        },
        quiz: [
          {
            question: "What is the most important decision to make before using AI to generate a content brief?",
            options: [
              "Which AI tool to use",
              "The word count of the finished article",
              "The search intent of the target keyword",
              "Whether to include images in the article"
            ],
            correct: 2,
            explanation: "Search intent — informational, commercial, or navigational — determines the entire structure, tone, and goal of a content brief. Getting this right before prompting produces a usable brief; getting it wrong produces a brief that serves the wrong reader."
          },
          {
            question: "When using AI for competitive content analysis, what is the most valuable output to request?",
            options: [
              "A word count comparison of competitor articles",
              "A list of keywords each competitor ranks for",
              "Identification of subtopics all competitors cover and what angles or insights are missing",
              "A sentiment analysis of competitor article comments"
            ],
            correct: 2,
            explanation: "Gap analysis — what competitors cover, what they miss, and where they rely on generic information — is where AI competitive research creates real editorial value. It points directly to differentiation opportunities."
          },
          {
            question: "An AI-generated content outline includes a section titled 'Key Statistics on [Topic].' What should the content professional do?",
            options: [
              "Ask AI to populate the section with statistics",
              "Remove the section — AI cannot source reliable statistics",
              "Flag the section as requiring verified primary sources before writing, and identify where those sources will come from",
              "Use the section as-is and verify statistics after publishing"
            ],
            correct: 2,
            explanation: "Statistics sections are high-risk for AI hallucination. The correct step is to flag the section in the brief and identify verified primary sources before the writing stage — not after."
          }
        ],
        applyThisWeek: {
          action: "Run an AI competitive analysis for your next planned article and use the output to produce a content brief — compare the quality of this brief to ones you've written without AI.",
          promptTemplate: "I am planning an article on [topic] targeting [audience]. Primary keyword: [keyword]. Search intent: [informational / commercial]. Here are the headings from three competitor articles: [paste]. Analyse: what subtopics do all three cover? What is underserved or missing? What differentiating angle could I take? Then draft a content brief including: working title, article angle, 5–6 sections with descriptions, recommended word count, and 2–3 places where original expertise or data would strengthen the piece.",
          tool: "Claude"
        }
      },
      {
        id: "marketing-content-seo-l3",
        title: "SEO with AI: Keyword Clusters, Meta Copy, and On-Page Optimisation",
        duration: 18,
        description: "Use AI to accelerate keyword research, build topical clusters, write meta titles and descriptions at scale, and optimise on-page elements — without replacing your SEO judgement.",
        content: `## What AI Changes in SEO Workflows

AI doesn't replace SEO tools like Ahrefs, Semrush, or Search Console. It accelerates the interpretation and application of the data those tools produce. The key shift: AI handles the pattern recognition and copy generation, you handle the strategy and validation.

## Keyword Clustering with AI

Keyword clustering — grouping related keywords by topic and intent — is one of the most time-consuming SEO tasks. AI can take a raw keyword list and propose cluster groupings in minutes.

\`\`\`
I have a list of keywords related to [topic]. Group them into topical clusters where each cluster represents a distinct search intent or subtopic. For each cluster: name the cluster, identify the primary keyword (highest intent and relevance), list the supporting keywords, and suggest the content type best suited to target this cluster (e.g. long-form guide, product page, FAQ, comparison article). Keyword list: [paste]
\`\`\`

**Important:** AI clustering is a starting point. You validate against search volume, competition, and your site's existing coverage before accepting any grouping.

## Meta Titles and Descriptions at Scale

Writing meta copy at scale is tedious. AI is fast here if you give it the right inputs:

\`\`\`
Write SEO meta titles and descriptions for the following pages. For each: meta title under 60 characters including [primary keyword], meta description 140–155 characters that includes [secondary keyword] and a clear benefit or action. Pages: [list page titles and one-sentence descriptions of each].
\`\`\`

Review outputs for keyword placement, character count accuracy (AI often misjudges length), and whether they match actual page content.

## On-Page Optimisation Review

Paste the text of a page into AI and ask for an on-page SEO review:

\`\`\`
Review this page for on-page SEO. Primary keyword: [keyword]. Assess: keyword placement in H1, H2s, first paragraph, and naturally throughout; internal linking opportunities; any sections that could be restructured to better match search intent; readability for the target audience. Suggest specific rewrites where needed. Page text: [paste]
\`\`\`

## What to Validate Manually

- Character counts on meta copy (always verify in a character counter)
- Keyword density suggestions (AI can over-optimise)
- Internal link suggestions (AI doesn't know your site's actual URL structure)
- Cluster assignments (validate against actual search volume data from your SEO tool)`,
        keyTakeaways: [
          "AI accelerates keyword clustering, meta copy generation, and on-page review — but validates nothing, that remains your job",
          "Keyword clustering with AI takes a raw list to structured clusters in minutes — then you validate against volume and competition data",
          "Always verify meta title and description character counts manually — AI frequently misjudges length",
          "On-page SEO review prompts work best when you paste the actual page text alongside the target keyword"
        ],
        exercise: {
          title: "Keyword Cluster and Meta Copy Sprint",
          description: "Take a raw keyword list and use AI to cluster it, then write meta copy for three pages in one session.",
          steps: [
            "Export 20–30 keywords related to a topic from your SEO tool (Ahrefs, Semrush, or Google Search Console)",
            "Open Claude and run the keyword clustering prompt from the lesson with your keyword list",
            "Review the clusters — accept, merge, or split based on your knowledge of search intent",
            "For three pages on your site, run the meta copy prompt and generate titles and descriptions",
            "Check every meta title and description in a character counter — note how many needed adjustment and what AI got wrong"
          ],
          tool: "Claude"
        },
        quiz: [
          {
            question: "What is the most important thing to do after AI generates keyword clusters?",
            options: [
              "Publish the cluster plan immediately to your content calendar",
              "Validate each cluster against search volume and competition data from your SEO tool",
              "Ask AI to assign difficulty scores to each cluster",
              "Have a second team member re-run the same prompt to check for consistency"
            ],
            correct: 1,
            explanation: "AI groups keywords by semantic similarity but has no access to search volume or competition data. Every cluster must be validated against your SEO tool's data before it informs a content decision."
          },
          {
            question: "A content team asks AI to write meta descriptions and receives outputs averaging 180 characters. What should they do?",
            options: [
              "Use them as-is — AI is calibrated to search engine standards",
              "Manually count each description and trim those that exceed 155 characters",
              "Ask AI to run a character count on its own output",
              "Reduce the number of keywords in the prompt to shorten the output"
            ],
            correct: 1,
            explanation: "AI frequently misjudges character counts. Every meta description must be checked in a character counter and trimmed manually if over 155 characters — AI's self-assessment of length is unreliable."
          },
          {
            question: "Which SEO task does AI REPLACE rather than accelerate?",
            options: [
              "Sourcing search volume data for keyword prioritisation",
              "Interpreting Search Console performance drops",
              "Drafting meta copy variations for A/B testing",
              "None — AI accelerates tasks but does not replace SEO tool data or professional judgement"
            ],
            correct: 3,
            explanation: "AI accelerates interpretation, copy generation, and pattern recognition but does not replace SEO tools or the professional judgement required to prioritise, validate, and implement SEO strategy."
          }
        ],
        applyThisWeek: {
          action: "Take one underperforming page on your site and run an AI on-page SEO review — use the output as a structured checklist for your next round of optimisation.",
          promptTemplate: "Review this page for on-page SEO. Primary keyword: [keyword]. Secondary keywords: [list]. Assess: keyword placement in H1, H2s, and first paragraph; whether the content matches informational / commercial / navigational intent; readability; internal linking gaps; and any structural changes that would improve relevance for the primary keyword. Suggest specific rewrites where the current copy is weak. Page content: [paste full page text].",
          tool: "Claude"
        }
      },
      {
        id: "marketing-content-seo-l4",
        title: "Building a Scalable AI Content Pipeline",
        duration: 19,
        description: "Design a repeatable, quality-controlled content production workflow that uses AI at every appropriate stage — from ideation to publishing — without sacrificing brand voice or E-E-A-T.",
        content: `## Why Most AI Content Pipelines Fail

Teams that jump straight to AI content generation without a workflow design end up with more content that performs less well. The problem isn't AI — it's the absence of human expertise gates and quality controls. A scalable pipeline requires both.

## The Five-Stage AI Content Pipeline

**Stage 1: Ideation and Research (AI: high)**
- AI generates topic clusters from keyword data and competitive gaps
- AI synthesises research sources into theme summaries
- Human: selects topics aligned with business goals and editorial judgement

**Stage 2: Brief and Outline (AI: high)**
- AI drafts the full content brief from your inputs
- AI generates a detailed outline with section-by-section guidance
- Human: approves angle, adds original insight hooks, validates SEO intent

**Stage 3: First Draft (AI: medium)**
- AI writes the structural draft for predictable content types
- Human writes sections requiring original expertise, case studies, or data analysis
- The split depends on content type — AI does more on evergreen how-tos, humans do more on thought leadership

**Stage 4: Editorial Review (AI: low)**
- Human edits for voice, accuracy, original insight, and E-E-A-T signals
- AI assists with specific rewrites (tone shifts, tightening paragraphs)
- Fact-checking is entirely human

**Stage 5: SEO and Publication Prep (AI: high)**
- AI generates meta copy, alt text, and social captions from the finished article
- AI suggests internal links based on topic clusters
- Human validates character counts, link URLs, and publishing details

## Quality Gates That Protect Standards

Insert these non-negotiable human checkpoints:
1. **Brief approval:** no AI drafting until brief is signed off
2. **Expertise injection:** at least one section in every article must contain original expert input
3. **Fact verification:** every statistic, claim, and quoted figure verified before publication
4. **Brand voice check:** final edit for voice consistency

\`\`\`
I am finalising an article for publication. Perform a pre-publication check: 1) Flag any sentence that makes a specific factual claim I should verify. 2) Identify any paragraph where the voice sounds generic rather than on-brand (our voice is [adjectives]). 3) Suggest one place where adding a specific data point or example would strengthen the piece. Article: [paste]
\`\`\``,
        keyTakeaways: [
          "A scalable pipeline uses AI heavily at ideation, brief, and publication prep stages — less so at editorial and expertise stages",
          "Quality gates — brief approval, expertise injection, fact verification, brand voice check — are non-negotiable in any AI pipeline",
          "Content types determine AI's role: AI does more on evergreen how-tos, humans do more on thought leadership and original analysis",
          "The pre-publication AI check is a useful final pass for catching factual claims and generic voice before articles go live"
        ],
        exercise: {
          title: "Design Your Team's Content Pipeline",
          description: "Map out a five-stage AI content pipeline for your team's most common content type, with defined human and AI roles at each stage.",
          steps: [
            "Choose the most common content type your team produces (e.g. blog article, case study, product comparison)",
            "For each of the five pipeline stages, write: what AI does, what the human does, and how long each step should take",
            "Identify your three non-negotiable quality gates and write a one-sentence protocol for each",
            "Run a test using this pipeline on your next piece of content — track time at each stage",
            "After publication, compare the production time and quality of this piece versus a recent piece produced without the pipeline"
          ],
          tool: "Claude"
        },
        quiz: [
          {
            question: "In a well-designed AI content pipeline, which stage should involve the LEAST AI assistance?",
            options: [
              "Ideation and competitive research",
              "Brief and outline creation",
              "Editorial review and expertise injection",
              "Meta copy and social caption generation"
            ],
            correct: 2,
            explanation: "Editorial review — fact-checking, expertise injection, and brand voice alignment — requires human judgement that AI cannot reliably provide. This is the stage where human involvement should be highest, not lowest."
          },
          {
            question: "Why should every article in an AI content pipeline contain at least one section with original expert input?",
            options: [
              "To comply with copyright law on AI-generated content",
              "Because Google's algorithms detect AI content and penalise it",
              "Because E-E-A-T signals require genuine expertise and experience that AI cannot generate",
              "To make the content feel more conversational"
            ],
            correct: 2,
            explanation: "Experience, Expertise, Authoritativeness, and Trustworthiness are Google's core quality signals. AI reflects existing knowledge — it cannot generate first-hand experience or original expertise. Human expert input is what satisfies these signals."
          },
          {
            question: "A content team uses AI to generate internal link suggestions for a new article. What must they verify before using those suggestions?",
            options: [
              "That the suggested links use the correct anchor text style",
              "That the linked URLs actually exist on their site and the linked pages are relevant",
              "That AI used the most authoritative pages as link targets",
              "That no more than five internal links are suggested per article"
            ],
            correct: 1,
            explanation: "AI suggests internal links based on topic relevance but has no knowledge of your site's actual URL structure or which pages exist. Every suggested link must be verified for accuracy and relevance before use."
          }
        ],
        applyThisWeek: {
          action: "Run your next piece of content through a structured five-stage pipeline — even a rough version — and track where AI saved the most time and where human judgement was irreplaceable.",
          promptTemplate: "I am performing a pre-publication quality check on this article. Please: 1) Flag every specific factual claim or statistic that I should verify against a primary source. 2) Identify any paragraph where the tone sounds generic or corporate rather than [your brand voice adjectives]. 3) Suggest one concrete addition — a specific example, data point, or expert perspective — that would make the article more authoritative. Article: [paste full text].",
          tool: "Claude"
        }
      }
    ]
  },

  'growth-perf': {
    title: "AI for Growth & Performance",
    description: "Accelerate paid media, CRO, and reporting workflows with AI — generating ad copy variants, identifying conversion opportunities, and turning data into actionable insight faster than ever before.",
    lessons: [
      {
        id: "marketing-growth-perf-l1",
        title: "AI for Growth and Performance Marketers",
        duration: 15,
        description: "Understand the specific AI use cases that move the needle in growth and performance marketing — and the critical limits to respect before automating any part of your funnel.",
        content: `## Performance Marketing Meets AI

Growth and performance marketers live in data, iteration, and speed. AI fits naturally into this context — it accelerates the mechanical parts of the workflow so you can spend more time on analysis and strategic decisions.

## Where AI Has the Highest ROI in Performance Work

**Copy generation at scale.** Testing ad variants requires volume. Writing ten headline variations for a single ad set manually takes an hour. AI produces them in two minutes.

**Audience persona drafting.** AI can synthesise customer data, interview notes, and CRM insights into structured audience persona documents that inform targeting and messaging strategy.

**Performance commentary.** AI can turn a data table into a written performance summary in seconds — a weekly update, a campaign wrap, or an anomaly explanation.

**Landing page and CTA experimentation.** AI generates multiple versions of headline, subheadline, and CTA combinations quickly — giving your team more hypotheses to test.

## What AI Cannot Do in Performance Marketing

- **Analyse live platform data.** AI doesn't have access to your Google Ads, Meta Ads Manager, or GA4 unless you paste the data in or use a connected tool.
- **Predict which variant will win.** AI generates copy — it cannot predict CTR, conversion rate, or ROAS. Only real-world testing does that.
- **Replace attribution understanding.** Multi-touch attribution, view-through vs click-through, and cross-channel modelling require your strategic judgement.
- **Manage campaigns.** AI is not a campaign management tool — it assists with inputs and outputs, not live optimisation.

## The Right Starting Point

Start with copy variant generation for a live campaign. Pick one ad set, use AI to generate ten headline variations, and test the best three against your control. This single habit demonstrates value quickly and builds your intuition for AI-assisted iteration.

\`\`\`
Generate 10 headline variations for a paid search ad. Product: [description]. Target audience: [who they are and what they care about]. Primary value proposition: [one clear benefit]. Each headline must be under 30 characters. Vary the approach: some benefit-led, some curiosity-driven, some urgency-led. Do not use exclamation marks.
\`\`\``,
        keyTakeaways: [
          "AI's highest ROI in performance marketing is copy variant generation, persona drafting, and performance commentary",
          "AI cannot access your live platform data, predict winning variants, or manage campaigns",
          "Start with copy variant generation for a live ad set — test AI-generated options against your control creative",
          "Attribution and multi-channel strategy decisions remain human — AI assists inputs and reporting, not judgement"
        ],
        exercise: {
          title: "Ad Copy Variant Sprint",
          description: "Generate a full set of ad copy variants for a live campaign using AI — ready to load into your ad platform.",
          steps: [
            "Choose one live ad set that could benefit from fresh creative testing",
            "Write down the core value proposition, target audience, and any character or format constraints from the platform",
            "Open Claude and generate 10 headline variants using the prompt from the lesson",
            "Filter the outputs: select three to test, one to use as your control, and note which AI approaches (benefit-led, urgency, curiosity) you want to compare",
            "Load the selected variants into your ad platform and set up the test"
          ],
          tool: "Claude"
        },
        quiz: [
          {
            question: "Which statement about AI in performance marketing is accurate?",
            options: [
              "AI can predict which ad variant will achieve the highest conversion rate",
              "AI accelerates copy generation and reporting but cannot access live platform data without integration",
              "AI can manage campaign budgets and bidding strategy automatically",
              "AI-generated ad copy outperforms human-written copy in most A/B tests"
            ],
            correct: 1,
            explanation: "AI accelerates the mechanical parts of performance marketing — copy generation, reporting, persona drafting — but cannot access live platform data unless connected, cannot predict test outcomes, and does not manage campaigns."
          },
          {
            question: "A growth marketer asks AI to 'analyse our campaign performance.' What should they provide for AI to be useful?",
            options: [
              "Their ad account login credentials",
              "The campaign name and the platform it runs on",
              "A pasted table or export of the actual performance data they want analysed",
              "A description of what they think is performing well"
            ],
            correct: 2,
            explanation: "AI has no access to live campaign data. To get useful analysis, you must paste the actual data — a CSV export, a metrics table, or a copied performance summary — into the prompt."
          },
          {
            question: "What is the best way to validate AI-generated ad copy variants?",
            options: [
              "Ask AI to score each variant on estimated CTR",
              "Run a live A/B test against your existing control creative",
              "Have three team members vote on the best option",
              "Use a readability tool to assess each variant"
            ],
            correct: 1,
            explanation: "The only reliable way to validate ad copy is live performance data. A/B testing AI-generated variants against your control creative is the correct methodology — AI cannot predict winner, only generate candidates."
          }
        ],
        applyThisWeek: {
          action: "Run an AI copy variant sprint for one live ad set — generate at least 8 headline variations and select the best 3 for testing.",
          promptTemplate: "Generate [number] ad headline variations for a [Google / Meta / LinkedIn] ad. Product or service: [description]. Target audience: [who they are]. Primary pain point: [what problem we solve]. Primary benefit: [what the reader gains]. Character limit per headline: [number]. Generate a mix of: benefit-led headlines, problem-aware headlines, and curiosity or question-based headlines. Avoid exclamation marks and superlatives.",
          tool: "Claude"
        }
      },
      {
        id: "marketing-growth-perf-l2",
        title: "Paid Media Copy and Variant Testing with AI",
        duration: 18,
        description: "Build a systematic process for generating, organising, and testing paid media copy variants across search, social, and display — using AI to produce volume without sacrificing strategy.",
        content: `## From One Ad to Twenty: The Variant Production Problem

Effective paid media testing requires volume. If you're testing one or two variants, you're not learning fast enough. The constraint isn't ideas — it's production time. AI solves the production problem.

## Platform-Specific Copy Constraints

Each platform has different copy formats and audience contexts. AI needs these constraints to produce usable output:

**Google Search Ads**
- Headlines: up to 30 characters, up to 15 per RSA
- Descriptions: up to 90 characters, up to 4 per RSA
- Intent: user is actively searching — match their intent closely

**Meta Ads**
- Primary text: 125 characters recommended (more is shown but truncated)
- Headline: up to 40 characters
- Context: user is not searching — interrupt with a relevant problem or benefit

**LinkedIn Ads**
- Headline: up to 70 characters
- Introductory text: 150 characters recommended
- Context: professional mindset — lead with role-relevant value

Provide these constraints explicitly in your prompt:

\`\`\`
Write paid media ad copy for [platform]. Product: [description]. Audience: [role, company size, pain point]. Primary message: [benefit or problem]. Format: headline under [X] characters, body text under [X] characters. Generate 6 variations — vary the angle: 2 benefit-led, 2 problem-aware, 2 social proof or urgency. Use plain language, no jargon, no exclamation marks.
\`\`\`

## Organising Variants for Testing

AI generates volume — you need a system to test it strategically. A simple spreadsheet structure:

| Variant | Angle | Headline | Body | Platform | Test Status | Result |
|---|---|---|---|---|---|---|

Group variants by angle (benefit, problem, urgency, social proof) before testing — this lets you learn which messaging approach works for your audience, not just which individual ad won.

## Reading AI Copy with a Performance Lens

Before loading AI-generated copy into an ad platform, assess each variant:
- Does the headline match the search intent or interrupt effectively for social?
- Is the CTA clear and action-oriented?
- Does the body support the headline's promise?
- Have you verified any claims made in the copy?

AI sometimes produces copy with implied claims ("the most effective" or "proven results") that can violate platform policies or mislead. Catch these before they go live.`,
        keyTakeaways: [
          "Each platform has specific copy format constraints — always provide these to AI for usable output",
          "Group AI-generated variants by message angle before testing to learn what resonates, not just which ad won",
          "Review every AI variant for implied claims, superlatives, or policy-violating language before uploading",
          "AI solves the production volume problem — strategy, testing structure, and interpretation remain human"
        ],
        exercise: {
          title: "Multi-Platform Copy Sprint",
          description: "Generate a full set of tested-ready ad copy variants for one campaign across two platforms.",
          steps: [
            "Choose an active campaign and one key audience segment you want to test messaging for",
            "Open Claude and run the platform-specific prompt for your primary platform, generating 6 variants",
            "Review all variants: flag any implied claims, check character counts against platform specs, and mark which angle each variant uses",
            "Repeat for a second platform, adapting the copy to match that platform's context and audience mindset",
            "Organise all approved variants in a spreadsheet by angle, ready to load into your ad platform"
          ],
          tool: "Claude"
        },
        quiz: [
          {
            question: "Why should you provide platform-specific character limits when prompting AI for ad copy?",
            options: [
              "To prevent AI from generating too many variants at once",
              "Because AI does not know platform-specific formats without being told, and will produce unusable copy",
              "To ensure AI uses the platform's preferred writing style",
              "Character limits are optional — you can trim after the fact"
            ],
            correct: 1,
            explanation: "AI does not reliably know or apply platform-specific ad format constraints without being told. Providing headline and body character limits in the prompt is the only way to get output that fits the platform specifications."
          },
          {
            question: "What is the strategic advantage of grouping test variants by message angle rather than testing all variants together?",
            options: [
              "It reduces the number of variants needed in the test",
              "It allows you to learn which messaging approach resonates with your audience, not just which individual ad won",
              "Platform algorithms perform better with angle-grouped variant sets",
              "It simplifies the reporting process by reducing the number of data points"
            ],
            correct: 1,
            explanation: "Testing by angle — benefit-led vs problem-aware vs urgency — produces strategic insight about what your audience responds to. Testing individual ads without angle grouping only tells you which headline won, not why."
          },
          {
            question: "AI generates an ad headline: 'The most effective solution for team productivity.' What should you check before using it?",
            options: [
              "Whether the headline is under the character limit",
              "Whether the superlative 'most effective' is substantiated and complies with platform advertising policies",
              "Whether AI used the word 'solution' in any other variants",
              "Whether the headline matches the brand tone of voice"
            ],
            correct: 1,
            explanation: "Superlatives like 'most effective' and 'proven' can violate platform advertising policies and mislead users. Any implied or comparative claim in AI-generated copy must be verified against your evidence and the platform's ad policy before use."
          }
        ],
        applyThisWeek: {
          action: "Generate a full set of 6–10 ad copy variants for your next paid campaign and organise them by angle before loading into your ad platform.",
          promptTemplate: "Write [number] ad copy variants for [platform: Google Search / Meta / LinkedIn]. Product: [description]. Target audience: [role, pain point, company context]. Primary benefit: [one clear statement]. Format: headline under [X] characters, body text under [X] characters. Create a mix: [number] benefit-led, [number] problem-aware, [number] urgency or social proof. Use plain, direct language. Flag any claim that requires substantiation.",
          tool: "Claude"
        }
      },
      {
        id: "marketing-growth-perf-l3",
        title: "AI-Assisted Conversion Rate Optimisation",
        duration: 17,
        description: "Use AI to generate CRO hypotheses, write landing page variants, analyse user feedback, and prioritise your testing roadmap — accelerating the insight-to-experiment cycle.",
        content: `## The CRO Bottleneck AI Solves

CRO is hypothesis-driven. The more quality hypotheses you generate and test, the faster you improve conversion rates. The bottleneck is usually two things: generating enough strong hypotheses and producing the copy variants to test them. AI accelerates both.

## Using AI to Generate CRO Hypotheses

Feed AI your conversion problem and the data you have — heatmap observations, session recording themes, exit survey responses, user interview highlights — and ask it to generate hypotheses in the standard format: "We believe [change] will improve [metric] because [rationale]."

\`\`\`
I am working to improve conversion rates on [page type: landing page / checkout / pricing page]. Current conversion rate: [X]%. Here are the key observations from our user research: [paste heatmap findings, exit survey quotes, or session recording themes]. Generate 10 CRO hypotheses in this format: "We believe changing [specific element] from [current state] to [proposed change] will improve [metric] because [user behaviour rationale]." Prioritise by likely impact.
\`\`\`

## Writing Landing Page Variants with AI

For any CRO test involving copy, AI generates the variants. Key elements to test:

**Above the fold:** headline, subheadline, hero image alt text, primary CTA
**Value proposition section:** benefits framing (feature-led vs outcome-led vs pain-point-led)
**Social proof:** testimonial formatting, specificity of results claims
**CTA buttons:** text, placement, surrounding context

Provide the current copy and ask AI to generate one or two alternatives for each element — specifying the hypothesis you are testing.

## Synthesising Qualitative Feedback at Scale

If you have user survey responses, support ticket themes, or NPS verbatims, AI can synthesise these into structured insight summaries that inform your hypothesis backlog:

\`\`\`
I have [number] open-text survey responses from users who abandoned our checkout. Synthesise the key themes. Identify: the top 3 objections or friction points mentioned, any language users use to describe the problem we solve (voice of customer), and any unexpected findings. Survey responses: [paste]
\`\`\`

## Prioritising Your Testing Roadmap

AI can help structure a prioritised test backlog using the ICE framework (Impact, Confidence, Ease). Provide your hypothesis list and the relevant data — AI helps you think through the scoring, you make the final prioritisation calls.`,
        keyTakeaways: [
          "AI accelerates hypothesis generation and variant production — the two key CRO bottlenecks",
          "Feed AI your actual user research data — heatmap findings, exit surveys, session themes — for hypothesis quality",
          "Use AI to synthesise open-text user feedback into structured insight summaries that populate your hypothesis backlog",
          "AI assists ICE scoring for test prioritisation but the final roadmap decisions remain with the CRO practitioner"
        ],
        exercise: {
          title: "CRO Hypothesis Generation Sprint",
          description: "Generate a prioritised set of CRO hypotheses for one page using user research data and AI.",
          steps: [
            "Choose one page with a conversion problem — landing page, pricing page, or checkout",
            "Gather whatever user research you have: heatmap data, exit survey responses, support tickets, or session recording notes",
            "Open Claude and run the hypothesis generation prompt from the lesson with your research data",
            "Review the 10 hypotheses — mark which have sufficient data support, which need more research, and which are impractical to test",
            "Select the top 3 hypotheses for your next testing cycle and draft the copy variant for one of them"
          ],
          tool: "Claude"
        },
        quiz: [
          {
            question: "What input produces the highest quality CRO hypotheses from AI?",
            options: [
              "The current conversion rate and a goal conversion rate",
              "Actual user research data — heatmap findings, exit survey responses, or session recording observations",
              "A description of competitor landing pages",
              "The number of monthly visitors to the page"
            ],
            correct: 1,
            explanation: "AI produces hypothesis quality proportional to the quality of the user research data it receives. Heatmap findings, exit survey quotes, and session recording observations give AI the behavioural rationale needed to generate testable, grounded hypotheses."
          },
          {
            question: "A CRO practitioner wants to synthesise 200 NPS verbatim responses to identify friction themes. How should they approach this with AI?",
            options: [
              "Ask AI to score each response on a sentiment scale",
              "Paste the responses and ask AI to identify the top objections, voice of customer language, and unexpected findings",
              "Ask AI to delete duplicate responses and count the remaining themes",
              "Use AI to translate the responses into a structured database"
            ],
            correct: 1,
            explanation: "Asking AI to identify key themes, friction points, and voice-of-customer language from qualitative feedback is its most valuable CRO use case. This turns hours of manual thematic analysis into minutes of synthesis."
          },
          {
            question: "When should a CRO professional NOT rely on AI for decision-making?",
            options: [
              "When generating copy variants for a test",
              "When synthesising user survey responses",
              "When making final test prioritisation decisions based on business context and strategic priorities",
              "When drafting hypothesis statements for review"
            ],
            correct: 2,
            explanation: "Test prioritisation decisions require business context, resource constraints, and strategic priorities that AI does not have. AI can help structure the thinking, but the final roadmap decision must be made by the practitioner who knows the full context."
          }
        ],
        applyThisWeek: {
          action: "Run an AI hypothesis generation session for your lowest-converting page this week — use your existing user research data as input and aim to produce 5 testable hypotheses.",
          promptTemplate: "Generate CRO hypotheses for our [page type]. Current conversion rate: [X]%. User research data: [paste heatmap summary / exit survey responses / session recording observations]. Generate 8 hypotheses in this format: 'We believe changing [element] from [current] to [new] will improve [metric] because [user behaviour rationale].' For each hypothesis, rate the evidence strength as Strong, Moderate, or Weak based on the data I provided.",
          tool: "Claude"
        }
      },
      {
        id: "marketing-growth-perf-l4",
        title: "Reporting, Attribution, and Insight Generation with AI",
        duration: 16,
        description: "Transform performance data into clear, insight-driven reports faster with AI — from weekly channel summaries to cross-channel attribution narrative and executive-ready performance stories.",
        content: `## The Reporting Problem in Performance Marketing

Performance reporting is high-volume, high-frequency, and often under-resourced. A weekly paid media update, a monthly channel report, a campaign wrap-up — each requires turning raw numbers into narrative. AI handles the narrative generation when you provide the numbers.

## Turning Data into Commentary

The core AI reporting workflow:

1. **Export your data** from your ad platform, GA4, or attribution tool
2. **Paste the key metrics** — not the raw CSV, but the structured summary: channel, spend, impressions, clicks, CTR, conversions, CPA, ROAS
3. **Provide context** — prior period comparison, goals, any known anomalies
4. **Ask for commentary** — performance summary, key observations, recommended actions

\`\`\`
I am writing the weekly paid media performance update. Here is this week's data versus last week: [paste metrics table]. Campaign goal: [objective]. Budget: [total spent]. Key context: [any known factors — e.g. "we reduced Meta budget by 20% on Thursday"]. Write a 200-word performance summary covering: overall performance versus goal, what drove changes week-on-week, and two recommended actions for next week.
\`\`\`

## Attribution Narrative

Attribution is where performance marketing gets most complex — and where clear communication is hardest. AI helps translate your attribution model's logic into language non-technical stakeholders can understand.

Describe your attribution model and the result, and ask AI to write the explanation:

\`\`\`
Explain the following attribution finding in plain English for a marketing director who is not technical. Attribution model used: [data-driven / last-click / linear]. Finding: [describe the key attribution insight or result]. Context: [what this means for budget allocation]. Keep it under 100 words.
\`\`\`

## Building a Reporting Template with AI

Rather than writing from scratch each week, build a reusable reporting template with AI. Draft the structure once, test it with one week's data, then refine. The template should include standard sections, AI prompt placeholders, and approved commentary formats.

## What Stays Human

- **Interpreting anomalies.** AI explains the data it receives — it cannot diagnose causes it wasn't told about. Platform outages, tracking issues, budget errors: you identify these.
- **Strategic recommendations.** AI can suggest standard optimisation moves but cannot make strategic budget reallocation decisions that account for business context.
- **Stakeholder calibration.** How much to emphasise a metric depends on what your stakeholder cares about — AI doesn't know your internal political context.`,
        keyTakeaways: [
          "AI generates performance commentary from structured data — export metrics, provide context, then ask for narrative",
          "Use AI to translate attribution model findings into plain English for non-technical stakeholders",
          "Build a reusable reporting template with AI prompts embedded — eliminate weekly writing from scratch",
          "Anomaly diagnosis, strategic recommendations, and stakeholder calibration remain human responsibilities"
        ],
        exercise: {
          title: "Build a Reusable Weekly Report Template",
          description: "Use AI to design a reporting template with embedded prompts that your team can use every week.",
          steps: [
            "List the five metrics your weekly paid media report always covers (e.g. spend, impressions, CTR, CPA, ROAS)",
            "Write the structure of your ideal weekly report: sections, length, and what each section needs to communicate",
            "Open Claude and ask it to design a reporting template with placeholder sections and an AI prompt embedded in each section",
            "Test the template with last week's real data — paste the metrics into each section and run the prompts",
            "Refine the template based on the outputs — adjust any section where the AI commentary needed significant editing"
          ],
          tool: "Claude"
        },
        quiz: [
          {
            question: "What data should you provide to AI to generate useful paid media performance commentary?",
            options: [
              "A description of your campaign goals only",
              "Raw CSV exports directly from the ad platform",
              "A structured summary of key metrics, prior period comparison, and relevant context",
              "A list of which AI tool each team member uses"
            ],
            correct: 2,
            explanation: "AI generates commentary from the data it receives. Structured metrics with prior period comparison and context — known anomalies, budget changes, external factors — produce useful commentary. Raw CSVs without context produce generic observations."
          },
          {
            question: "A campaign's CPA spiked 40% week-on-week. AI's commentary says performance declined without explaining why. What should the marketer do?",
            options: [
              "Ask AI to diagnose the cause by providing the campaign setup details",
              "Accept the commentary — AI has correctly identified the performance decline",
              "Investigate the cause manually — tracking issues, budget errors, or platform changes — and add that context to the report",
              "Remove the CPA metric from the report to avoid the spike appearing"
            ],
            correct: 2,
            explanation: "AI explains the data it receives — it cannot diagnose causes it wasn't told about. Anomaly investigation is a human task: check tracking, budget changes, audience updates, and platform notifications before reporting the cause."
          },
          {
            question: "Which of the following is an appropriate use of AI in performance reporting?",
            options: [
              "Making the final budget reallocation decision for next month based on performance data",
              "Diagnosing why a conversion pixel stopped firing",
              "Writing a plain-English explanation of an attribution model finding for a non-technical stakeholder",
              "Deciding which channels to cut based on last quarter's ROAS"
            ],
            correct: 2,
            explanation: "Translating attribution findings into plain English is a straightforward AI writing task — provide the technical finding and context, ask for a plain-language explanation. Strategic budget and channel decisions require human judgement with full business context."
          }
        ],
        applyThisWeek: {
          action: "Take your next weekly performance report and use AI to write the commentary section — provide the metrics table, prior period data, and relevant context, and compare the output to what you would have written manually.",
          promptTemplate: "Write a performance commentary for the following paid media data. Report period: [date range]. Data: [paste metrics table with this week and last week]. Campaign objective: [e.g. leads, purchases, traffic]. Budget: [total spend]. Context: [any known factors affecting performance — budget changes, platform issues, seasonal events]. Write: a 150-word summary of performance versus objective, 2–3 key observations explaining the main changes week-on-week, and 2 specific recommended actions for next week.",
          tool: "Claude"
        }
      }
    ]
  },

  'campaigns': {
    title: "AI for Campaigns & Creative",
    description: "Use AI to accelerate campaign ideation, creative production, and multi-channel planning — so your team delivers more campaigns, faster, without compromising creative quality.",
    lessons: [
      {
        id: "marketing-campaigns-l1",
        title: "AI in the Campaign Workflow",
        duration: 15,
        description: "Map where AI fits in the end-to-end campaign workflow — from brief to post-campaign analysis — and identify the highest-value entry points for your team right now.",
        content: `## Campaigns Are AI's Natural Habitat

A campaign involves a brief, ideation, creative production, copy writing, channel planning, trafficking, optimisation, and reporting. That's a lot of steps — and AI fits usefully into most of them.

The mistake most teams make is starting with "let's use AI for everything." A better approach: identify the two or three highest-friction stages in your current workflow and start there.

## Stage-by-Stage AI Value Map

**Briefing:** AI reviews briefs for completeness, generates the creative rationale, and drafts the target audience profile from your CRM or research inputs.

**Ideation:** AI generates campaign concept options, taglines, and messaging frameworks at volume. You curate and develop the strongest ideas.

**Copywriting:** AI drafts all body copy, headlines, CTAs, email sequences, and social captions. You edit for voice and accuracy.

**Creative Production:** AI tools generate image concepts, storyboard descriptions, and video script structures. Production still requires human creative and technical skill.

**Channel Planning:** AI can model basic channel mix scenarios and draft channel-specific copy adaptations from a master brief.

**Trafficking and QA:** AI assists with copy QA — checking consistency across variants, flagging mismatches between headlines and landing pages.

**Reporting and Wrap:** AI generates campaign wrap commentary from data, and first-draft post-mortems from your notes.

## The Honest Assessment

AI is genuinely fast in the **writing stages** (copy, briefs, commentary) and useful in the **ideation stage** (volume generation). It is less useful in stages that require original creative vision, production craft, or live platform knowledge.

\`\`\`
I am starting a new marketing campaign. Here is our campaign brief: [paste brief]. Review the brief and: 1) Identify any gaps — missing audience clarity, unclear success metrics, or ambiguous creative direction. 2) Suggest three campaign concept directions, each with a working name, one-sentence rationale, and a potential tagline. 3) Draft a target audience profile from the brief information.
\`\`\``,
        keyTakeaways: [
          "AI adds value across most campaign stages — highest in writing, ideation, and reporting; lower in production craft and live platform management",
          "Start by identifying the two or three highest-friction stages in your current workflow rather than trying to use AI everywhere",
          "AI reviews campaign briefs for completeness — a fast way to catch missing elements before briefing the creative team",
          "Use AI for volume in ideation; your role is to curate and develop the strongest concepts, not to accept AI output wholesale"
        ],
        exercise: {
          title: "Campaign Workflow Friction Audit",
          description: "Map your team's current campaign workflow and identify the three highest-leverage AI entry points.",
          steps: [
            "List every stage in your typical campaign workflow from brief to post-campaign wrap",
            "For each stage, estimate: time spent, level of mechanical vs creative work, and your biggest frustration",
            "Open ChatGPT and describe your workflow — ask it to suggest AI use cases for each stage",
            "Select the two or three stages where AI could save the most time with the least risk to quality",
            "For one of those stages, run a test this week and record time saved versus output quality"
          ],
          tool: "ChatGPT"
        },
        quiz: [
          {
            question: "Which campaign stage is AI LEAST useful for without significant human creative input?",
            options: [
              "Generating 10 campaign concept options",
              "Drafting social media caption variants",
              "Producing final visual creative assets that require design craft",
              "Writing post-campaign performance commentary"
            ],
            correct: 2,
            explanation: "AI is strongest in text-based stages — ideation, writing, and reporting. Final visual creative production requires human design skill and creative judgement that AI tools cannot replicate at production quality for most campaigns."
          },
          {
            question: "A campaign manager uses AI to review a campaign brief. What is the most valuable output to request?",
            options: [
              "A score out of 10 for brief quality",
              "A complete rewrite of the brief in AI's preferred format",
              "Identification of gaps in the brief — missing audience clarity, unclear metrics, or ambiguous creative direction",
              "A comparison of the brief to industry best practice templates"
            ],
            correct: 2,
            explanation: "Brief gap analysis is AI's most useful contribution to the briefing stage. Identifying missing audience clarity, undefined success metrics, or ambiguous creative direction before the brief is issued prevents expensive rework downstream."
          },
          {
            question: "What should happen after AI generates five campaign concept options?",
            options: [
              "Present all five to the client and let them choose",
              "Select the concept AI rated highest based on its assessment",
              "The campaign team evaluates each concept against the brief and business objectives and develops the strongest one",
              "Run the concepts through a second AI tool to identify the winner"
            ],
            correct: 2,
            explanation: "AI generates options — human creative and strategic judgement selects and develops the best one. The team must evaluate AI concepts against actual brief requirements, business context, and creative potential before committing to a direction."
          }
        ],
        applyThisWeek: {
          action: "Run your next campaign brief through an AI review before distributing to the creative team — ask AI to identify gaps and generate three initial concept directions.",
          promptTemplate: "Review the following campaign brief and: 1) List any gaps — what information is missing that the creative team will need? 2) Flag any sections where the objective, audience, or creative direction is unclear. 3) Suggest three initial campaign concept directions, each with a working name and one-sentence rationale. Brief: [paste full brief].",
          tool: "Claude"
        }
      },
      {
        id: "marketing-campaigns-l2",
        title: "Campaign Ideation and Briefing with AI",
        duration: 18,
        description: "Use AI to generate richer campaign concepts, pressure-test ideas, and write better creative briefs — faster than traditional brainstorm processes.",
        content: `## The Problem with Traditional Brainstorming

Brainstorms are slow, biased toward confident voices, and often produce the obvious idea first. AI changes the dynamic: it generates volume instantly, has no ego investment in ideas, and can be prompted to think in deliberately unusual directions.

## Using AI to Generate Campaign Concepts

The key to useful AI ideation is **constraining the brief and diversifying the approach**. Give AI a tightly defined brief — audience, objective, message, channel mix — then ask it to generate concepts across different creative territories:

- Rational/functional (product benefit-led)
- Emotional (audience feeling-led)
- Cultural (tension or moment-led)
- Unexpected (subverts category conventions)

\`\`\`
Generate 8 campaign concepts for the following brief. Target audience: [description — who they are and what they care about]. Campaign objective: [awareness / consideration / conversion]. Key message: [one clear idea]. Channel mix: [channels]. For each concept, provide: a working campaign name, a one-paragraph concept description, a sample tagline, and the insight or tension it exploits. Cover all four territories: rational/functional, emotional, cultural, and unexpected.
\`\`\`

## Pressure-Testing Ideas with AI

Once you have shortlisted concepts, use AI to stress-test them:

\`\`\`
Here is a campaign concept we are considering: [describe concept]. Pressure-test it: 1) What assumptions does this concept rely on? 2) What could go wrong — culturally, legally, or in execution? 3) What does this concept have to do better than any currently running campaign in this category to succeed? 4) What is the strongest version of this concept, and what needs to be true for it to land?
\`\`\`

## Writing a Creative Brief with AI

A strong creative brief includes: audience portrait, insight, single-minded proposition, desired response, mandatories, tone, and channel-specific guidance. AI drafts the first version from your inputs — you add the strategic insight and lived brand knowledge.

The single-minded proposition is the hardest element. AI can generate options, but the right one requires your judgement — it must be true, differentiated, and emotionally resonant. Generate five candidates with AI, then choose and refine the strongest.`,
        keyTakeaways: [
          "AI generates ideation volume across different creative territories — rational, emotional, cultural, and unexpected",
          "Always constrain the brief tightly before AI ideation — a loose brief produces generic concepts",
          "Use AI to pressure-test shortlisted concepts before committing: surface assumptions, risks, and what needs to be true",
          "The single-minded proposition is the creative brief element that most requires human judgement — use AI to generate options, not to decide"
        ],
        exercise: {
          title: "AI Concept Generation and Brief Draft",
          description: "Run an AI ideation session for a real or upcoming campaign and use the output to draft a creative brief.",
          steps: [
            "Choose an upcoming campaign with a defined brief or objective",
            "Write down the essentials: audience, objective, key message, channel mix, and any mandatories",
            "Open Claude and run the concept generation prompt from the lesson — aim for 8 concepts across all four territories",
            "Review the concepts: shortlist the two most interesting ones and run the pressure-test prompt on each",
            "Use the strongest concept and Claude's brief-drafting capability to produce a first-draft creative brief — then add the strategic insight section yourself"
          ],
          tool: "Claude"
        },
        quiz: [
          {
            question: "Why should AI campaign ideation be constrained to a tightly defined brief?",
            options: [
              "To reduce the number of concepts AI generates",
              "Because AI works better with fewer input words",
              "Because vague briefs produce generic concepts that don't differentiate from category conventions",
              "To prevent AI from generating concepts in creative territories you didn't plan to explore"
            ],
            correct: 2,
            explanation: "The quality of AI ideation output is directly proportional to brief specificity. A vague brief produces generic, category-expected concepts. A tight brief — audience portrait, specific objective, clear message — produces more interesting, differentiated options."
          },
          {
            question: "A campaign team uses AI to pressure-test a campaign concept. What is the most valuable question to ask?",
            options: [
              "What is this concept's estimated reach on social media?",
              "What assumptions does this concept rely on, and what could go wrong culturally or in execution?",
              "Has this concept been used in any other category?",
              "What tone of voice does this concept use?"
            ],
            correct: 1,
            explanation: "Pressure-testing for underlying assumptions and execution risks is where AI adds the most strategic value in ideation. It surfaces the 'what needs to be true' questions that teams often skip when excited by an idea."
          },
          {
            question: "What is the correct role of AI in developing the single-minded proposition for a creative brief?",
            options: [
              "AI should write the final SMP — it has no emotional investment in a particular direction",
              "AI should generate multiple SMP options for the team to evaluate and refine",
              "AI cannot contribute to SMP development — this is entirely a human task",
              "AI should score competing SMP options to identify the strongest"
            ],
            correct: 1,
            explanation: "AI is useful for generating multiple SMP candidates quickly — but the selection and refinement of the right proposition requires human judgement about brand truth, differentiation, and emotional resonance that AI cannot make."
          }
        ],
        applyThisWeek: {
          action: "Run an AI ideation session for your next campaign — use it to generate 8 concepts across four territories, then pressure-test your favourite two before committing to a direction.",
          promptTemplate: "Generate 8 campaign concepts for this brief. Audience: [description]. Objective: [awareness / consideration / conversion]. Key message: [one sentence]. Channels: [list]. Mandatories: [any required brand or legal elements]. For each concept: a campaign name, one-paragraph description, sample tagline, and the audience insight it exploits. Generate 2 concepts in each territory: rational/functional, emotional, cultural, and category-unexpected.",
          tool: "Claude"
        }
      },
      {
        id: "marketing-campaigns-l3",
        title: "Creative Production at Scale with AI",
        duration: 18,
        description: "Use AI to adapt master creative across formats, channels, and markets — maintaining consistency while eliminating the manual copy adaptation work that slows campaign production.",
        content: `## The Creative Adaptation Bottleneck

A campaign might have one core concept but twenty or thirty deliverables: a hero video, six social sizes, three email versions, paid search ads, OOH copy, display banners, and market-specific adaptations. The creative concept is one decision; the production is fifty.

AI cannot produce final creative assets — but it can dramatically accelerate the copy and content adaptation layer of production.

## Master Copy to Channel Copy

The most effective workflow: write one **master copy document** — the full campaign narrative, key messages, tagline, and copy hierarchy — and use AI to adapt it for each channel and format.

\`\`\`
I have a master campaign copy document. Adapt it for the following channels and formats. For each, follow the format constraints and audience context listed. Master copy: [paste headline, body, tagline, key messages]. Adaptations needed: 1) LinkedIn ad — headline under 70 characters, body under 150 characters, professional context. 2) Instagram caption — 125 characters, conversational, include 3 hashtags. 3) Google Search ad — headline under 30 characters, description under 90 characters, match search intent directly. 4) Email subject line — under 50 characters, personalised opener, A/B variant.
\`\`\`

## Market and Audience Localisation

For campaigns running across markets or audience segments, AI handles the localisation layer — adapting tone, examples, and cultural references while maintaining the core message.

Important: AI localisation is not translation. For language translation, use a dedicated translation tool or professional service. For tonal and cultural adaptation within the same language, AI is effective.

## Copy QA at Scale

When you have 20+ copy variants in production, consistency errors creep in. AI assists with copy QA:

\`\`\`
Review the following set of ad copy variants for consistency. Check: 1) Does the campaign tagline appear consistently across all variants? 2) Are there any variants where the value proposition contradicts the master message? 3) Flag any typos, character limit violations, or formatting inconsistencies. Copy variants: [paste all variants]
\`\`\`

## What AI Cannot Produce

- Final visual creative (photography, video, designed assets)
- Original creative concepts — adaptation requires a human-developed master concept first
- Legal or compliance review of copy claims
- Authentic cultural localisation in languages other than English`,
        keyTakeaways: [
          "Write one master copy document, then use AI to adapt it across all channels and formats — eliminating manual adaptation work",
          "AI handles tonal and cultural adaptation within the same language; do not use it as a translation tool",
          "AI copy QA at scale catches consistency errors, tagline omissions, and formatting issues across large variant sets",
          "AI adapts creative — it cannot originate it. A human-developed master concept must come first"
        ],
        exercise: {
          title: "Master Copy Adaptation Sprint",
          description: "Take a campaign's master copy and use AI to produce a full set of channel-specific adaptations in one session.",
          steps: [
            "Choose a campaign with approved master copy (headline, body, tagline, key messages)",
            "List the channels and formats you need adaptations for — include the character or word constraints for each",
            "Open Claude and run the master copy adaptation prompt from the lesson with your full requirements",
            "Review every adaptation: check character counts manually, flag any where the core message was distorted, and mark any where AI deviated from the brand voice",
            "Rewrite any problematic adaptations — note which channels AI handled well versus where it consistently needed editing"
          ],
          tool: "Claude"
        },
        quiz: [
          {
            question: "What should always exist before using AI for creative adaptation work?",
            options: [
              "An approved AI content policy",
              "A human-developed master campaign concept and master copy document",
              "A channel allocation budget",
              "A set of AI-generated design mockups"
            ],
            correct: 1,
            explanation: "AI adapts — it doesn't originate. A human-developed master concept and master copy document are the source material that AI works from. Without a clear creative direction established by humans, AI adaptations will be inconsistent and off-strategy."
          },
          {
            question: "A campaign is running in English across the UK, Australia, and the US. How should AI be used for localisation?",
            options: [
              "Use AI to fully localise for all three markets without human review",
              "Use AI to adapt tone, examples, and cultural references for each market, with human review before use",
              "Do not use AI for any localisation — all market adaptations must be written by local teams",
              "Use AI to translate the UK copy into US and Australian English"
            ],
            correct: 1,
            explanation: "AI is effective for tonal and cultural adaptation within the same language — adjusting examples, idioms, and references to feel native for each market. Human review is required to catch anything AI misses about local cultural context."
          },
          {
            question: "When using AI to QA 25 copy variants, what specific checks should you request?",
            options: [
              "Whether each variant would pass a readability grade test",
              "Tagline consistency, message contradictions, character limit violations, and formatting errors",
              "Whether the variants are sufficiently different from each other for A/B testing",
              "Which variants AI predicts will achieve the highest click-through rate"
            ],
            correct: 1,
            explanation: "Copy QA with AI should focus on consistency and compliance: tagline presence, message integrity, character limits, and formatting rules. These are objective checks AI can perform reliably across a large variant set."
          }
        ],
        applyThisWeek: {
          action: "For your next campaign with multiple channel deliverables, create a master copy document first and use AI to generate all channel adaptations in one session — track production time saved.",
          promptTemplate: "I have approved master campaign copy. Adapt it for the following channels, following the format constraints exactly. Master copy: Headline: [headline]. Tagline: [tagline]. Body: [body copy]. Key messages: [1, 2, 3]. Adaptations: 1) [Channel] — [format], [character limit]. 2) [Channel] — [format], [character limit]. 3) [Channel] — [format], [character limit]. For each adaptation, maintain the core message and tagline while adapting tone and length to the channel context.",
          tool: "Claude"
        }
      },
      {
        id: "marketing-campaigns-l4",
        title: "Multi-Channel Planning and Performance Analysis with AI",
        duration: 17,
        description: "Use AI to model channel mix scenarios, adapt campaign messaging across touchpoints, and generate post-campaign analysis — so your team plans smarter and learns faster.",
        content: `## Planning Across Channels Is Where AI Saves Strategic Time

Multi-channel campaign planning involves a lot of structured thinking: audience journey mapping, touchpoint sequencing, message hierarchy by channel, budget allocation logic, and timeline planning. Much of this is analytical and structural — exactly where AI assists well.

## Audience Journey Mapping with AI

Describe your target audience and campaign objective, and ask AI to map the typical decision journey — from awareness to conversion — and suggest where each channel fits.

\`\`\`
Map the customer decision journey for the following audience and campaign objective. Audience: [description]. Objective: [what you want them to do]. Product or service: [brief description]. For each stage of the journey — awareness, consideration, evaluation, conversion, retention — suggest: the most likely channels where this audience can be reached, the type of message most appropriate at that stage, and the desired response from the audience. Then suggest a channel sequencing rationale.
\`\`\`

## Channel-Specific Message Adaptation

A common campaign mistake is running the same message on every channel. AI can draft channel-specific message recommendations from a single master brief — specifying how the message should shift between awareness channels (broad, emotion-led) and conversion channels (specific, benefit-led).

## Post-Campaign Analysis with AI

Post-campaign analysis often gets rushed or skipped. AI speeds up the documentation layer — which means your team spends more time on strategic interpretation.

\`\`\`
I am writing a post-campaign analysis. Campaign: [name and objective]. Results versus KPIs: [paste]. What worked well: [your observations]. What did not work: [your observations]. Generate a structured post-campaign report covering: executive summary (150 words), performance against each KPI, key learnings (with specific detail), and recommended changes for the next campaign. Flag anywhere you need additional data to be specific.
\`\`\`

## Building a Campaign Learning Library

Each post-campaign analysis is a strategic asset. Build a simple library of AI-synthesised learning documents — one per campaign — that future campaign teams can query before planning the next brief. Over time, this becomes a proprietary knowledge base that makes your team's AI-assisted planning progressively smarter.`,
        keyTakeaways: [
          "AI maps audience decision journeys and channel sequencing rationale from a brief — a structural planning task AI handles well",
          "Use AI to draft channel-specific message adaptations from a master brief rather than running the same message everywhere",
          "Post-campaign analysis documentation with AI frees your team to focus on strategic interpretation rather than report writing",
          "Maintain a campaign learning library — AI-synthesised post-mortems that inform future planning decisions"
        ],
        exercise: {
          title: "AI-Assisted Post-Campaign Wrap",
          description: "Use AI to produce a structured post-campaign analysis for a recently completed campaign.",
          steps: [
            "Choose a campaign that completed in the last three months",
            "Gather the performance data against each KPI and write two or three observations about what worked and what didn't",
            "Open Claude and run the post-campaign analysis prompt from the lesson with your data and observations",
            "Review the output — add any strategic context AI couldn't know (internal resource constraints, external events, stakeholder decisions)",
            "Extract two to three specific learnings to carry forward to your next campaign brief"
          ],
          tool: "Claude"
        },
        quiz: [
          {
            question: "What is the most appropriate use of AI in multi-channel campaign planning?",
            options: [
              "Setting the media budget allocation across channels based on audience size",
              "Structuring the audience decision journey and suggesting channel sequencing rationale",
              "Negotiating media rates with publishers",
              "Making final decisions about which channels to include in the plan"
            ],
            correct: 1,
            explanation: "Audience journey mapping and channel sequencing rationale are analytical and structural tasks where AI produces useful first drafts. Budget allocation and final channel decisions require human strategic judgement and market knowledge."
          },
          {
            question: "Why should post-campaign analyses be AI-assisted rather than fully AI-generated?",
            options: [
              "Because AI cannot write in a professional tone",
              "Because the most valuable strategic interpretations require context AI was not given during the campaign",
              "Because AI-generated reports do not comply with data protection regulations",
              "Because stakeholders prefer reading human-written analyses"
            ],
            correct: 1,
            explanation: "Post-campaign analysis requires strategic interpretation — understanding why performance deviated from forecast, what internal or external factors shaped results, and what this means for future strategy. These insights require campaign context that AI was not present to observe."
          },
          {
            question: "What makes a campaign learning library built with AI-synthesised post-mortems strategically valuable over time?",
            options: [
              "It eliminates the need for campaign planning meetings",
              "It creates a searchable record of what has worked and what hasn't across campaigns, making future AI-assisted planning progressively more informed",
              "It allows AI to manage future campaigns autonomously",
              "It provides legal documentation of campaign decisions"
            ],
            correct: 1,
            explanation: "A library of structured post-mortems becomes a proprietary knowledge base — a record of real campaign learnings specific to your brand, audience, and market. Future teams can query this library before planning, making each campaign benefit from what came before."
          }
        ],
        applyThisWeek: {
          action: "Write one AI-assisted post-campaign analysis this week — even for a small campaign — and store it in a shared document as the start of your team's learning library.",
          promptTemplate: "Generate a structured post-campaign analysis. Campaign name: [name]. Objective: [goal]. Duration: [dates]. Results versus KPIs: [paste metrics and targets]. What worked (my observations): [list]. What did not work (my observations): [list]. External factors: [any market, seasonal, or competitive context]. Write: a 100-word executive summary, performance against each KPI with brief commentary, 3 specific learnings with supporting evidence, and 2 recommended changes for the next campaign of this type.",
          tool: "Claude"
        }
      }
    ]
  },

  'cmo': {
    title: "AI for CMO & Marketing Leaders",
    description: "Lead your marketing organisation's AI adoption with clarity — from setting the adoption framework and building competitive intelligence capability to managing brand risk and communicating AI strategy to the board.",
    lessons: [
      {
        id: "marketing-cmo-l1",
        title: "The CMO's Framework for AI Adoption",
        duration: 16,
        description: "Build a structured approach to AI adoption across your marketing organisation — setting priorities, managing risk, and making the case for investment without being distracted by hype.",
        content: `## The CMO's AI Problem

Marketing leaders face AI adoption pressure from every direction: the board wants a strategy, the team wants tools, vendors claim everything is "AI-powered," and the business wants results. The trap is reacting to all of this without a framework.

A useful framework for CMO-level AI adoption has three components: **where to start**, **what to protect**, and **how to govern**.

## Where to Start: The Value/Risk Matrix

Plot your marketing activities on two dimensions:
- **Value of AI acceleration:** how much time and quality improvement AI offers
- **Risk of AI error:** the consequence if AI output is wrong or off-brand

Start with high-value, low-risk tasks: performance reporting commentary, first drafts of internal documents, keyword clustering, social media caption variants. These build capability and confidence before you move to higher-stakes use cases.

## What to Protect: The Non-Negotiables

Before deploying AI across the team, define what cannot be AI-generated without senior review:
- Public brand communications (press releases, campaign copy)
- Crisis and reactive communications
- Content making specific performance claims
- Legal and compliance-sensitive copy

These categories don't prohibit AI — they require a human approval gate.

## How to Govern: The Three Rules

1. **AI output is always a draft.** Nothing goes live without human review.
2. **Verify before publishing.** Every factual claim in AI-assisted content is verified against a primary source.
3. **Brand brief required.** AI sessions for brand copy must include the approved brand brief block.

\`\`\`
I am developing an AI adoption strategy for my marketing team of [size]. Our primary marketing activities are [list]. Help me: 1) Identify the five highest-value AI use cases for a marketing team of this type. 2) List the three highest-risk use cases that require governance protocols before adoption. 3) Draft a 90-day AI capability building plan with milestones.
\`\`\``,
        keyTakeaways: [
          "CMO AI adoption needs a framework with three components: where to start, what to protect, and how to govern",
          "Start with high-value, low-risk tasks to build team capability and confidence before higher-stakes use cases",
          "Define the categories of marketing output that require a human approval gate — regardless of AI involvement",
          "Three non-negotiable governance rules: AI output is always a draft, verify before publishing, brand brief required"
        ],
        exercise: {
          title: "Build Your AI Adoption Value/Risk Matrix",
          description: "Map your team's marketing activities onto the value/risk matrix and identify your first three AI use case priorities.",
          steps: [
            "List the ten most common marketing activities in your team (e.g. weekly social posts, performance reports, campaign briefs, press releases)",
            "For each, estimate: value of AI acceleration (high/medium/low) and risk if AI output is wrong (high/medium/low)",
            "Plot the activities on a simple 2x2 matrix — identify which sit in the high-value/low-risk quadrant",
            "Open Claude and run the AI adoption strategy prompt from the lesson for your team context",
            "Review Claude's suggestions against your matrix — select your first three use case priorities and the governance rule for each"
          ],
          tool: "Claude"
        },
        quiz: [
          {
            question: "What should CMOs do FIRST when building an AI adoption strategy for their marketing team?",
            options: [
              "Buy enterprise licenses for the AI tools the team prefers",
              "Map marketing activities by AI value and risk to identify the right starting points",
              "Commission a full AI audit of the marketing technology stack",
              "Appoint a dedicated AI manager to own the adoption programme"
            ],
            correct: 1,
            explanation: "Mapping activities by value and risk creates a rational starting point — prioritising high-value, low-risk use cases builds capability and confidence before moving to more complex or sensitive applications."
          },
          {
            question: "Which of the following marketing outputs should require a human approval gate regardless of AI involvement?",
            options: [
              "Weekly performance reporting commentary for internal stakeholders",
              "First drafts of content briefs for the editorial team",
              "Public press releases and crisis communications",
              "Keyword clustering and meta copy drafts"
            ],
            correct: 2,
            explanation: "Public brand communications and crisis comms carry the highest brand and reputational risk if AI output is wrong, off-brand, or culturally inappropriate. These require a senior human approval gate — AI may assist, but a human must approve before publication."
          },
          {
            question: "A CMO's team reports that AI is saving them time but their content quality has declined. What is the most likely cause?",
            options: [
              "The AI tool they are using is lower quality than competitors",
              "The team is publishing AI output without adequate human review and brand brief inclusion",
              "AI is not suitable for marketing content creation",
              "The team needs more training in prompt writing"
            ],
            correct: 1,
            explanation: "Quality decline in AI-assisted content almost always traces back to insufficient human review or absent brand briefing. When AI output is treated as final rather than as a draft requiring editorial improvement, quality drops."
          }
        ],
        applyThisWeek: {
          action: "Produce a one-page AI adoption framework for your marketing team this week — including your top five use cases, your non-negotiable governance rules, and a 90-day build plan.",
          promptTemplate: "Help me build an AI adoption framework for a marketing team. Team size: [number]. Marketing activities: [list your main activities]. AI tools already in use: [list or 'none']. Provide: 1) Top 5 AI use cases ranked by value and risk. 2) The 3 highest-risk use cases requiring governance protocols. 3) Three non-negotiable governance rules. 4) A 90-day capability building plan with specific monthly milestones. Keep each section concise and actionable.",
          tool: "Claude"
        }
      },
      {
        id: "marketing-cmo-l2",
        title: "AI for Competitive Intelligence and Market Insight",
        duration: 17,
        description: "Use AI to build a faster, more systematic competitive intelligence capability — tracking competitor messaging, synthesising market signals, and generating strategic insight at the speed decisions actually require.",
        content: `## The Competitive Intelligence Problem

Most marketing teams have no systematic approach to competitive intelligence. It happens reactively — someone spots a competitor's campaign, a sales team flags a pricing change, or a leadership team asks for a competitive review the day before a strategy meeting.

AI doesn't fix the reactive culture — but it dramatically reduces the time cost of doing competitive analysis properly, which makes systematic intelligence more feasible.

## What AI Does Well in Competitive Intelligence

**Messaging analysis.** Paste competitor web copy, campaign lines, or PR quotes and AI identifies positioning patterns, messaging shifts, and whitespace.

**Signal synthesis.** Feed AI a set of competitor news items, analyst quotes, or earnings transcript excerpts and ask for a strategic summary.

**Positioning comparison.** Provide your positioning alongside competitor positioning and ask AI to identify where you are distinctive and where you overlap.

**Content gap analysis.** For content-heavy markets, AI can analyse competitor content themes against yours to identify topics and angles you're not covering.

## What AI Cannot Do

- **Provide live data.** AI's knowledge has a training cutoff and cannot access real-time market data, live competitor websites, or recent campaign launches without a connected tool.
- **Make strategic calls.** AI can surface patterns — it cannot tell you whether the pattern represents a threat or an opportunity. That requires your market knowledge.

## A Systematic CI Workflow

Set up a simple monthly process:
1. Assign one team member 30 minutes per month to collect competitor signals (web, press, social, analyst coverage)
2. Synthesise with AI in a structured prompt
3. Distribute a one-page AI-generated competitive brief to leadership

\`\`\`
I am compiling a monthly competitive intelligence brief. Here are recent developments from our main competitors: [paste news items, messaging updates, or campaign observations]. Synthesise: 1) What strategic moves are competitors making? 2) What positioning shifts are visible? 3) What does this signal about market direction? 4) What are the top two implications for our marketing strategy? Keep it to a one-page executive summary.
\`\`\``,
        keyTakeaways: [
          "AI makes systematic competitive intelligence feasible by reducing synthesis time from hours to minutes",
          "AI analyses messaging patterns and synthesises signals — it cannot access live data or make strategic calls",
          "A 30-minute monthly collection plus AI synthesis produces a one-page competitive brief that most teams currently don't have at all",
          "Positioning comparison with AI identifies distinctive territory and overlap — the foundation for messaging strategy decisions"
        ],
        exercise: {
          title: "Build Your First Monthly CI Brief",
          description: "Collect competitor signals and use AI to produce a one-page competitive intelligence brief.",
          steps: [
            "Identify your three primary competitors",
            "Spend 20 minutes collecting recent signals: check their websites, press pages, LinkedIn, and any analyst coverage you have access to — note any messaging changes, product news, or campaign activity",
            "Open Claude and run the competitive intelligence brief prompt from the lesson with your collected signals",
            "Review the output: mark any synthesis you disagree with and add your own strategic interpretation",
            "Format the final brief as one page and share with your leadership team — note their reactions and what questions it raised"
          ],
          tool: "Claude"
        },
        quiz: [
          {
            question: "What is the primary limitation of using AI for competitive intelligence?",
            options: [
              "AI cannot read competitor websites",
              "AI cannot make strategic judgements about whether competitive signals represent threats or opportunities",
              "AI competitive analysis is too time-consuming to be worth doing regularly",
              "AI cannot compare your positioning to competitor positioning"
            ],
            correct: 1,
            explanation: "AI synthesises patterns from the data it receives — it cannot assess whether those patterns are strategically significant for your specific business, market position, or competitive context. That interpretation requires your expertise."
          },
          {
            question: "A CMO asks their team to set up a competitive intelligence process. What is the most feasible monthly workflow?",
            options: [
              "Daily monitoring by a dedicated analyst using AI tools",
              "30 minutes of signal collection by a team member, synthesised into a one-page AI brief monthly",
              "Commissioning a quarterly research agency report supplemented with AI",
              "Asking AI to monitor competitor websites automatically"
            ],
            correct: 1,
            explanation: "A 30-minute monthly collection plus AI synthesis is realistic for a marketing team without dedicated research resources. It produces a usable competitive brief that most teams currently produce only reactively."
          },
          {
            question: "What should a CMO include when asking AI to compare their brand positioning to competitors?",
            options: [
              "Only their own brand positioning statement",
              "Their own positioning and competitor positioning statements or key messages, so AI can identify overlap and whitespace",
              "A description of what they think competitors are doing",
              "Their target audience only"
            ],
            correct: 1,
            explanation: "Positioning comparison requires AI to have both sides of the comparison. Providing your own positioning and the competitor's actual copy or key messages allows AI to identify genuine overlap and distinctive territory — not just confirm your existing assumptions."
          }
        ],
        applyThisWeek: {
          action: "Spend 30 minutes collecting competitor signals this week and use AI to produce your first one-page competitive intelligence brief — distribute it to your leadership team.",
          promptTemplate: "Compile a competitive intelligence brief from the following signals. My brand's positioning: [your key messages or value proposition]. Competitor signals this month: [paste competitor web copy changes, campaign lines, press announcements, product updates, or pricing changes for each competitor]. Synthesise: 1) Key positioning moves each competitor has made. 2) Any shifts in messaging strategy or tone. 3) Market whitespace our brand could own more clearly. 4) Two strategic implications for our marketing approach. Format as a one-page executive summary.",
          tool: "Claude"
        }
      },
      {
        id: "marketing-cmo-l3",
        title: "Building and Leading an AI-Ready Marketing Team",
        duration: 18,
        description: "Design the capability, culture, and structure your marketing team needs to use AI effectively — including how to upskill people, which roles change most, and how to lead through the transition.",
        content: `## The Capability Gap Is the Real AI Problem

Most marketing teams have access to AI tools. Very few have the capability to use them systematically. The gap isn't technology — it's skill, habit, and confidence. CMOs who close this gap create a durable competitive advantage; those who don't end up with AI licenses and unchanged output quality.

## How Roles Change in an AI-Assisted Team

**Content roles** shift from writing volume to editorial direction — curating, editing, and improving AI output rather than producing from scratch. The premium skills become brief quality, voice consistency, and fact-checking discipline.

**Performance roles** shift from reporting generation to insight interpretation — AI handles commentary, humans focus on diagnosis and strategy.

**Creative roles** shift to concept development and creative direction — AI handles adaptation, humans lead the idea and the vision.

**The roles that don't change** significantly: strategy, relationship management, brand stewardship, and cultural judgement. These are the highest-value human contributions.

## A Practical Capability Building Approach

**Tier 1 — Foundation (all team members):** What AI is and isn't, how to write effective prompts, and the governance rules. Achievable in a half-day workshop.

**Tier 2 — Role-specific (by function):** AI workflows for each team's primary tasks — content, performance, campaigns, brand. Achievable through role-specific practice sessions.

**Tier 3 — Advanced (team leads and managers):** Prompt library management, quality governance, and using AI for strategic tasks. Requires ongoing learning.

\`\`\`
I am designing an AI capability programme for a marketing team of [size] across these functions: [list]. Suggest: 1) A three-tier capability framework appropriate for this team. 2) The key skills to develop at each tier. 3) A realistic 90-day rollout plan. 4) How to measure whether AI capability is actually improving team output quality, not just adoption rates.
\`\`\`

## Leading Through Resistance

Some team members will resist AI — often for legitimate reasons. The most effective leadership response: acknowledge the concern (usually job security or skill devaluation), demonstrate that AI raises the standard bar rather than lowering the bar on human skill, and create psychological safety for experimentation and failure.`,
        keyTakeaways: [
          "The AI capability gap is a skill and habit problem, not a technology problem — upskilling the team is the CMO's primary lever",
          "Content roles shift to editorial direction, performance roles to insight interpretation, creative roles to concept leadership",
          "A three-tier capability framework — foundation, role-specific, advanced — is the most practical structure for most marketing teams",
          "Measure capability improvement through output quality and time savings, not just AI tool adoption rates"
        ],
        exercise: {
          title: "Design Your Team's AI Capability Programme",
          description: "Draft a three-tier capability building plan for your marketing team with specific content, timelines, and success measures.",
          steps: [
            "Map your team's functions and the five most common tasks in each function",
            "For each function, identify: which tasks AI can accelerate most, which skills will become more valuable, and what the main capability gap is today",
            "Open Claude and run the capability programme prompt from the lesson for your specific team context",
            "Review the output — adjust the timeline to match your team's current bandwidth and learning culture",
            "Identify one person in each function to be an AI champion who tests and shares AI workflows with their peers"
          ],
          tool: "Claude"
        },
        quiz: [
          {
            question: "Which marketing function changes MOST significantly with AI adoption?",
            options: [
              "Brand strategy and positioning",
              "Stakeholder relationship management",
              "Content production — shifting from writing volume to editorial direction and quality control",
              "Marketing budget allocation"
            ],
            correct: 2,
            explanation: "Content roles see the most significant shift — from producing first drafts to directing, editing, and quality-controlling AI output. The premium skill becomes editorial judgement and brand voice stewardship, not writing speed."
          },
          {
            question: "How should a CMO measure whether AI capability building is succeeding?",
            options: [
              "By the number of team members who have completed AI training",
              "By the number of AI tool licences purchased and activated",
              "By improvements in output quality, reduction in production time, and team confidence scores",
              "By the percentage of content that is AI-assisted"
            ],
            correct: 2,
            explanation: "Adoption metrics (training completions, licence activations) measure input, not outcome. The right measures are output quality improvements, production time reduction, and whether the team feels more capable — not just more informed."
          },
          {
            question: "A content manager on your team is resistant to using AI because they fear their writing skills will become less valued. What is the most effective leadership response?",
            options: [
              "Mandate AI use across the team with a set adoption target",
              "Explain that AI replaces the mechanical writing work and elevates the value of editorial judgement and brand stewardship",
              "Reassign the team member to a non-content role",
              "Allow them to opt out of AI use entirely"
            ],
            correct: 1,
            explanation: "The most effective response to resistance based on skill devaluation is demonstrating that AI raises the standard — editorial judgement, brand voice expertise, and fact-checking rigour become more valuable, not less, when AI handles first drafts."
          }
        ],
        applyThisWeek: {
          action: "Design a half-day foundation workshop for your marketing team — covering AI basics, prompt writing, and your team's governance rules — and schedule it in the next four weeks.",
          promptTemplate: "Design a half-day AI foundation workshop for a marketing team of [size] across these functions: [list]. The workshop should cover: 1) What AI tools are and how they work (at a practical level, not technical). 2) How to write effective prompts — with exercises for each function. 3) Our team's governance rules. 4) A hands-on practice session where each person completes one real task using AI. Include a suggested agenda with timings, suggested exercises for each function, and how to assess whether participants leave with usable skills.",
          tool: "Claude"
        }
      },
      {
        id: "marketing-cmo-l4",
        title: "AI Governance, Brand Risk, and Board Communication",
        duration: 17,
        description: "Build the governance framework your marketing organisation needs, manage the brand and reputational risks of AI use, and communicate your AI strategy clearly to the board and executive team.",
        content: `## Why Governance Is a CMO Responsibility

AI governance in marketing is not an IT function. The brand, reputational, and legal risks of AI-generated content are marketing risks — which means the CMO owns the governance framework, not the CTO.

The governance challenge: AI can produce copy that is off-brand, factually wrong, legally problematic, or culturally inappropriate at the speed of a single prompt. The volume risk is significant when a team of 20 is all prompting simultaneously.

## The Marketing AI Governance Framework

**Policy layer:** What AI can and cannot be used for, without approval. A clear written policy that covers: tool authorisation, data input rules (no confidential client data in public AI tools), content categories requiring senior approval, and attribution rules for AI-assisted content.

**Process layer:** Where human review gates sit in the content production workflow. Not every piece of content needs a senior review — but external communications, paid advertising, and PR all do.

**Audit layer:** Regular sampling of AI-assisted content against brand guidelines and factual accuracy standards. Monthly is sufficient; quarterly is the minimum.

## Brand Risk Categories

**Factual error risk:** AI states incorrect information with confidence. Mitigation: fact-verification protocol, especially for content containing statistics, claims, or product specifications.

**Off-brand voice risk:** AI defaults to generic if not briefed correctly. Mitigation: mandatory brand brief block in all AI content sessions.

**Cultural sensitivity risk:** AI can produce copy that is insensitive or inappropriate for specific markets or contexts. Mitigation: human review for any content touching cultural, political, or sensitive social topics.

**Legal and compliance risk:** AI can produce copy that implies claims you can't substantiate. Mitigation: legal review for any copy making performance claims or comparisons.

## Communicating AI Strategy to the Board

\`\`\`
Help me prepare a board communication on our marketing AI strategy. Context: [brief description of your AI adoption stage, team size, use cases]. Draft a 300-word executive summary covering: what AI we are using and why, the business case (productivity, quality, cost), the governance framework in place, and the risks we are actively managing. Tone: confident and factual, not evangelical.
\`\`\`

Board members typically want to know: what is the business return, what are the risks and how are they managed, and what is the competitive context. Frame AI strategy in these terms — not in terms of technology enthusiasm.`,
        keyTakeaways: [
          "Marketing AI governance is a CMO responsibility — brand, reputational, and legal risks of AI content are marketing risks",
          "Governance needs three layers: policy (what is permitted), process (where review gates sit), and audit (regular sampling against standards)",
          "The four brand risk categories — factual error, off-brand voice, cultural sensitivity, and legal claims — each require specific mitigation protocols",
          "Board communication on AI strategy should address business return, risk management, and competitive context — not technology enthusiasm"
        ],
        exercise: {
          title: "Draft Your Marketing AI Governance Policy",
          description: "Produce a one-page marketing AI governance policy covering the key risk categories and protocols.",
          steps: [
            "List the AI tools your team currently uses or plans to use",
            "Write down your current data input rules (what can and cannot be put into public AI tools — customer data, financial data, confidential campaign information)",
            "Open Claude and ask it to draft a one-page marketing AI governance policy covering: tool authorisation, data input rules, content categories requiring senior approval, fact-verification protocol, and brand brief requirements",
            "Review the draft — add any company-specific requirements and remove anything that doesn't fit your context",
            "Share the draft with your legal or compliance team for input before finalising"
          ],
          tool: "Claude"
        },
        quiz: [
          {
            question: "Who should own the marketing AI governance framework in a large organisation?",
            options: [
              "The CTO, as AI is a technology responsibility",
              "The CMO, as brand, reputational, and legal content risks are marketing risks",
              "A dedicated AI ethics committee reporting to the board",
              "The head of content, as the primary user of AI tools"
            ],
            correct: 1,
            explanation: "While IT and legal should be consulted, the CMO owns marketing AI governance — because the risks (brand reputation, factual accuracy, cultural appropriateness, legal claims in copy) are marketing risks with marketing consequences."
          },
          {
            question: "Which brand risk category is mitigated by requiring a brand brief block in every AI content session?",
            options: [
              "Factual error risk",
              "Legal and compliance risk",
              "Off-brand voice risk",
              "Cultural sensitivity risk"
            ],
            correct: 2,
            explanation: "Off-brand voice risk — AI defaulting to generic content that doesn't match your brand's tone, vocabulary, and style — is directly mitigated by including the brand brief block (tone of voice descriptors, do's and don'ts, on-brand examples) in every AI session."
          },
          {
            question: "What three questions does a board typically want answered about a CMO's AI strategy?",
            options: [
              "Which AI tools are being used, how many prompts are run monthly, and what training has been completed",
              "What is the business return, what are the risks and how are they managed, and what is the competitive context",
              "What is the total cost of AI licences, which competitor uses AI most, and what is the adoption timeline",
              "What percentage of content is AI-assisted, what is the productivity gain, and what is the headcount impact"
            ],
            correct: 1,
            explanation: "Board members focus on three things: return on investment (is this generating business value?), risk management (are we protected from the downside?), and competitive positioning (are we ahead of or behind our competitors?). Frame AI strategy in these terms."
          }
        ],
        applyThisWeek: {
          action: "Draft a one-page marketing AI governance policy this week and share it with your legal or compliance team for input — formalising your governance framework before it becomes an issue.",
          promptTemplate: "Draft a one-page marketing AI governance policy for a team of [size]. Include sections on: 1) Approved AI tools and their permitted use cases. 2) Data input rules — what information cannot be entered into public AI tools. 3) Content categories requiring senior human approval before publication. 4) Fact-verification protocol for AI-assisted content. 5) Brand brief requirement for all AI content sessions. 6) Audit process (how and how often AI-assisted content will be reviewed). Tone: clear and practical, written for a marketing team, not a legal audience.",
          tool: "Claude"
        }
      }
    ]
  }
}
