import type { Track } from '../types'

export const marketingTrack: Track = {
  id: 'marketing',
  title: 'AI for Marketers',
  tagline: 'Create better content, faster campaigns, and smarter strategy with AI',
  description:
    'A practical curriculum for marketing professionals who want to harness AI across the full marketing workflow — from content creation and campaign planning to audience intelligence and performance reporting.',
  color: '#2563EB',
  level: 'beginner',
  modules: [
    {
      id: 'marketing-m1',
      title: 'AI Fundamentals for Marketers',
      description:
        'Understand what AI actually is, which tools matter for marketing, and how to set up a productive AI toolkit from day one.',
      lessons: [
        {
          id: 'marketing-m1-l1',
          title: 'What AI Actually Is (and Isn\'t) for Marketers',
          duration: 15,
          description:
            'Cut through the hype and understand what large language models do, where they excel, and where they fall short. You\'ll leave with a clear mental model that makes every future AI interaction more effective.',
          content: `## The One Concept That Changes Everything

AI tools like ChatGPT, Claude, and Gemini are **large language models (LLMs)**. They predict the next most-likely word based on patterns learned from billions of documents. That one fact explains both their remarkable capabilities and their key limitations.

## What LLMs Are Genuinely Great At

- **Generating first drafts fast.** An LLM can produce a serviceable email subject line, blog intro, or social caption in seconds. It won't be perfect, but it eliminates the blank-page problem.
- **Rewriting and reformatting.** Paste in a long report and ask for a three-bullet executive summary. The model compresses and restructures fluently.
- **Brainstorming at scale.** Ask for 20 campaign angles and you'll get 20. Filter from abundance rather than straining for ideas.
- **Tone-shifting.** Take formal copy and make it conversational, or vice versa, without rewriting from scratch.

## What LLMs Are Not

- **They are not search engines.** They don't retrieve live data. Information has a training cutoff date.
- **They are not fact-checkers.** They'll confidently state incorrect statistics. Always verify numbers before publishing.
- **They are not strategic thinkers.** They reflect patterns in training data, not genuine market understanding. Your judgement is still the product.

## The Marketing Implication

Think of AI as a very fast, very well-read junior copywriter who never gets tired but sometimes makes things up. Your job shifts from *writing everything* to *directing, editing, and verifying*. The creative instinct and brand knowledge stay with you.

## How to Approach Your First Interactions

Start with low-stakes tasks: rewriting an existing email, generating five headline options, or summarising a competitor's homepage. These let you calibrate the tool's output quality before trusting it with higher-visibility work.

**Key principle:** The quality of your output depends almost entirely on the quality of your input. Vague prompts produce generic content. Specific prompts produce useful content. The rest of this curriculum teaches you to write specific prompts.`,
          keyTakeaways: [
            'LLMs predict likely next words — they don\'t understand content the way humans do',
            'AI excels at drafting, rewriting, summarising, and brainstorming — not fact-checking',
            'Your role shifts from writer to director and editor, which is a more strategic position',
            'Always verify statistics, dates, and factual claims before publishing AI-generated content',
            'Prompt quality directly determines output quality — specificity is the core skill',
          ],
          exercise: {
            title: 'Calibration Test: Three Prompts, Three Outputs',
            description:
              'Run three different prompts for the same task to experience first-hand how specificity changes output quality.',
            steps: [
              'Open ChatGPT or Claude and start a new conversation',
              'Type the vague prompt: "Write a social media post about our product" and note the output',
              'Now try: "Write a 280-character LinkedIn post for a B2B SaaS company announcing a new analytics feature, targeting marketing directors. Tone: confident and specific, not salesy."',
              'Compare the two outputs. List three specific differences in quality',
              'Refine the second prompt by adding one more detail (your actual product, a specific benefit, or a desired CTA) and observe how the output shifts again',
            ],
            tool: 'ChatGPT',
          },
          inlineCheck: {
            question: 'An AI tool confidently states that a competitor\'s market share grew 34% last quarter. What should you do?',
            options: [
              'Trust it — AI is trained on massive datasets and tends to be accurate',
              'Include it in your report but flag it as AI-sourced',
              'Verify through a reliable primary source before using it anywhere',
              'Only use it for internal presentations, not external reports',
            ],
            correct: 2,
            explanation: 'LLMs can state incorrect statistics with complete confidence — the number sounds plausible, which makes it dangerous. Always verify specific figures through primary sources before publishing or presenting.',
          },
          outputComparison: {
            label: 'Why specificity matters — see it in action',
            vague: {
              prompt: 'Write a social media post about our product',
              output: '✨ Discover our amazing new product that will transform your daily routine! Perfect for everyone who wants to upgrade their lifestyle. Try it today and see the difference! 🌟 #NewProduct #MustHave #GameChanger',
            },
            improved: {
              prompt: 'Write a 280-character LinkedIn post for a B2B analytics SaaS announcing a new real-time dashboard. Audience: marketing directors at 50–500 person companies. Tone: confident and specific, not promotional. End with a question to drive comments.',
              output: 'Real-time campaign attribution is now live in [Product]. Marketing directors can see cross-channel performance update as it happens — no more end-of-day reports while your budget burns.\n\nWhat\'s the first metric you check every morning?',
            },
            insight: 'The vague prompt produces generic filler. The specific prompt produces something you could actually post — because it defined a role, audience, format constraint, and goal. That\'s the only difference.',
          },
          applyThisWeek: {
            action: 'Pick one piece of content you write every week — a report, email update, or social post. Use an AI tool for the first draft with a specific prompt. Note how much editing it needs versus writing from scratch.',
            promptTemplate: 'Act as a [your role] writing [content type] for [specific audience]. Goal: [what you want them to think or do]. Format: [structure]. Tone: [adjective]. Keep it under [word count].',
            tool: 'ChatGPT or Claude',
          },
          reflection: 'Think about the last piece of content you wrote at work. Which part took longest — coming up with the structure, the first draft, or the editing? AI is strongest at the part that slowed you down most.',
          quiz: [
            {
              question: 'What is the most accurate description of how a large language model works?',
              options: [
                'It searches the internet in real time to find the best answer',
                'It predicts likely next words based on patterns in its training data',
                'It uses a database of pre-written marketing templates',
                'It analyses your brand guidelines and generates matched content',
              ],
              correct: 1,
              explanation:
                'LLMs generate text by predicting the statistically most likely next token based on patterns learned during training. They do not search the internet in real time (unless given a specific tool to do so) and do not have access to your brand guidelines unless you provide them.',
            },
            {
              question: 'Which of the following tasks is AI LEAST suited for without human verification?',
              options: [
                'Generating five alternative subject line options for an email campaign',
                'Rewriting a press release in a more casual tone',
                'Providing accurate industry statistics for a whitepaper',
                'Summarising a long customer feedback report into bullet points',
              ],
              correct: 2,
              explanation:
                'LLMs frequently hallucinate statistics and facts — they generate plausible-sounding numbers that may be entirely fabricated. Always verify any specific statistics, dates, or factual claims through primary sources before publishing.',
            },
            {
              question: 'What is the primary skill that determines the quality of AI-generated marketing content?',
              options: [
                'Choosing the most expensive AI tool',
                'Writing detailed and specific prompts',
                'Using AI only for social media, not email',
                'Regenerating outputs until you find a good one',
              ],
              correct: 1,
              explanation:
                'Prompt quality is the single biggest lever. A vague prompt produces generic, unusable content. A detailed prompt that specifies audience, tone, format, and goal produces content that requires minimal editing. This is the core skill taught throughout this curriculum.',
            },
          ],
        },
        {
          id: 'marketing-m1-l2',
          title: 'The Marketer\'s AI Toolkit: Which Tool for What',
          duration: 18,
          description:
            'Map the major AI tools to specific marketing tasks. You\'ll understand the practical differences between ChatGPT, Claude, Gemini, and Copilot so you can choose the right tool without wasting time.',
          content: `## The Landscape in 2024

Dozens of AI tools compete for attention, but for marketers without a technical background, four platforms cover 90% of use cases: **ChatGPT**, **Claude**, **Google Gemini**, and **Microsoft Copilot**. Each has distinct strengths.

## ChatGPT (OpenAI)

**Best for:** Creative copywriting, brainstorming, campaign concepts, DALL-E image generation.

ChatGPT's strength is creative generation. It handles tone variation well, produces varied output styles, and integrates image generation via DALL-E. The GPT-4o model handles long documents, and custom GPTs let you build a pre-configured marketing assistant.

**Use it when:** You need campaign ideas, need images alongside copy, or want to experiment with creative formats.

## Claude (Anthropic)

**Best for:** Long-form content, nuanced editing, analysing documents, maintaining voice consistency.

Claude handles very long documents without losing context — useful for analysing a 40-page competitor report or rewriting a lengthy white paper. It tends to produce more nuanced, less generic text and is particularly good at following complex style instructions.

**Use it when:** You're working with long documents, need careful editing, or have precise tone requirements.

## Google Gemini

**Best for:** Research tasks, Google Workspace integration, real-time information.

Gemini connects to current search results, making it better than other tools for questions that require up-to-date information. It integrates into Gmail, Docs, and Sheets — useful for marketers already in the Google ecosystem.

**Use it when:** You need current market data, or want AI embedded in your Google Workspace workflow.

## Microsoft Copilot

**Best for:** Teams and organisations using Microsoft 365.

Copilot sits inside Word, Excel, PowerPoint, Outlook, and Teams. It's not the most powerful creative tool, but its integration means you can draft a report, build a deck, and summarise email threads without switching tabs.

**Use it when:** Your organisation is Microsoft-first and you want AI inside existing tools.

## The Practical Rule

Don't try to master all four simultaneously. Pick one as your primary tool and use it for 80% of tasks. Add a second for specific gaps. Most marketers find ChatGPT + Claude covers everything.`,
          keyTakeaways: [
            'ChatGPT is strongest for creative copy, brainstorming, and image generation',
            'Claude excels at long documents, nuanced editing, and consistent voice replication',
            'Gemini\'s integration with Google Search makes it better for tasks requiring current information',
            'Copilot\'s value is deep integration with Microsoft 365 rather than raw output quality',
            'Pick one primary tool and become fluent with it before adding others to your workflow',
          ],
          exercise: {
            title: 'Side-by-Side Tool Comparison',
            description:
              'Run the same marketing prompt in two different tools and compare results to develop a personal preference based on real output.',
            steps: [
              'Choose a real marketing task you\'re currently working on (e.g., a product description, email subject lines, or a social post)',
              'Write one clear, specific prompt for the task',
              'Run the exact same prompt in ChatGPT (chatgpt.com)',
              'Run the exact same prompt in Claude (claude.ai)',
              'Compare: Which output is closer to your brand voice? Which needed less editing? Write two sentences noting the difference — this is your personal reference for which tool to reach for first',
            ],
            tool: 'ChatGPT',
          },
          quiz: [
            {
              question: 'A marketing manager needs to summarise a 50-page competitor analysis report and extract key strategic insights. Which tool is best suited for this task?',
              options: [
                'ChatGPT, because it has the most users and is best known',
                'Claude, because it handles very long documents and produces nuanced analysis',
                'Gemini, because it can search the internet for more information',
                'Copilot, because it works inside Microsoft Word',
              ],
              correct: 1,
              explanation:
                'Claude is specifically designed to handle very long documents with a large context window. For tasks requiring careful analysis of lengthy documents with nuanced output, Claude consistently outperforms alternatives. Copilot in Word could work but is less capable at analysis tasks.',
            },
            {
              question: 'Which AI tool is the best choice for a marketer who needs to generate a blog post alongside a matching hero image?',
              options: [
                'Claude, because it produces the best long-form writing',
                'Gemini, because it connects to Google Images',
                'ChatGPT, because it integrates DALL-E for image generation alongside text',
                'Copilot, because it works in Microsoft Office',
              ],
              correct: 2,
              explanation:
                'ChatGPT with DALL-E integration allows you to generate both text copy and images within the same conversation. Claude and Gemini do not natively generate images in the same workflow (as of 2024 training). Copilot has some image generation but it\'s less integrated for marketing use cases.',
            },
            {
              question: 'What is the main strategic advantage of using Microsoft Copilot for a marketing team already using Microsoft 365?',
              options: [
                'It produces the most creative campaign concepts of any tool',
                'It provides the most accurate factual information',
                'It embeds directly into Word, Excel, PowerPoint, and Outlook — no context-switching',
                'It has the largest training dataset of marketing content',
              ],
              correct: 2,
              explanation:
                'Copilot\'s primary value is integration, not raw capability. For teams already in Microsoft 365, having AI assistance available inside the tools they already use reduces friction and speeds up existing workflows without requiring new apps or tab-switching.',
            },
          ],
        },
        {
          id: 'marketing-m1-l3',
          title: 'How LLMs Process Your Marketing Content',
          duration: 16,
          description:
            'Understanding the mechanics of tokenisation, context windows, and training data helps you write better prompts and debug outputs that miss the mark. This lesson is practical, not technical.',
          content: `## Why Understanding Mechanics Makes You Better at Prompting

You don't need to understand how a car engine works to drive. But knowing *why* your car struggles uphill changes your driving habits. The same applies to AI. Understanding two key concepts — the context window and training data — will directly improve your results.

## The Context Window: AI's Working Memory

Every AI conversation happens inside a "context window" — the amount of text the model can see at once. Think of it as the model's working memory. If your conversation gets very long, older messages may fall outside this window and the AI effectively "forgets" them.

**Practical implications:**
- For long projects (e.g., rewriting an entire website), break work into sections rather than dumping everything into one conversation
- If the AI's responses seem to drift or lose track of earlier instructions, start a fresh conversation with a summary of key constraints
- Place the most important instructions (brand voice, audience, format) at the **beginning** of your prompt, not the end

## Training Data and the Cutoff Problem

LLMs are trained on text scraped from the internet up to a specific date. After that cutoff, they have no knowledge of new events, products, or market changes.

**What this means for marketers:**
- Don't ask AI for this year's industry statistics — verify independently
- AI won't know about your competitor's product launch from last month
- Trend-based content ("what's trending in marketing right now") will be stale

**The workaround:** Paste current information into your prompt. If you have a recent report, share the key data and ask the AI to incorporate it. This is called "retrieval" and it's highly effective.

## Tokens, Not Words

AI processes text in "tokens" — roughly ¾ of a word on average. A 1,000-word document is approximately 1,300 tokens. This matters for:
- Understanding pricing (most paid tiers charge per token)
- Knowing why very long documents get truncated

## The Practical Golden Rules

1. **Front-load your instructions** — most important constraints go first
2. **Provide context the AI can't have** — paste in current data, your brand guidelines, your audience description
3. **Work in sections** for long-form projects — don't try to produce a 3,000-word piece in one prompt`,
          keyTakeaways: [
            'The context window is the AI\'s working memory — long conversations may cause it to "forget" earlier instructions',
            'Front-load important constraints (tone, audience, format) at the start of every prompt',
            'Training data has a cutoff date — always verify current statistics and recent events',
            'Paste current information directly into your prompt to get AI to work with up-to-date data',
            'Break long projects into sections rather than attempting one enormous generation',
          ],
          exercise: {
            title: 'Front-Loading Practice',
            description:
              'Rewrite a prompt you\'ve used before to move all constraints to the beginning, and compare the output difference.',
            steps: [
              'Think of a recent AI output that missed the mark — wrong tone, wrong audience, too generic',
              'Write out what that original prompt looked like',
              'Rewrite it so that the first sentence specifies: (1) your audience, (2) the tone, and (3) the format',
              'Run the new prompt and compare outputs side by side',
              'Note which specific front-loaded constraint had the biggest impact on quality',
            ],
            tool: 'Claude',
          },
          quiz: [
            {
              question: 'What is the "context window" in an AI conversation?',
              options: [
                'The visual interface where you type your prompt',
                'The total amount of text the AI can see and reference at one time',
                'The number of images the AI can process simultaneously',
                'The time limit before an AI session expires',
              ],
              correct: 1,
              explanation:
                'The context window is the maximum amount of text — including your prompts and the AI\'s responses — that the model can process at once. When a conversation exceeds this limit, earlier content falls out and the AI loses access to those earlier instructions or information.',
            },
            {
              question: 'You need AI to write about your company\'s Q3 2024 results, which were just released. What is the correct approach?',
              options: [
                'Ask ChatGPT to search for your Q3 results online',
                'Assume the AI knows about recent earnings releases and prompt normally',
                'Paste the key financial data and metrics directly into your prompt',
                'Use only Gemini since it has more recent training data',
              ],
              correct: 2,
              explanation:
                'Any data released after the model\'s training cutoff will not be known to the AI. The correct approach is to paste your actual results into the prompt, then ask the AI to work with that data. This technique — providing the AI with current context it can\'t otherwise access — is fundamental for business use.',
            },
            {
              question: 'Where should you place the most important instructions in a long prompt?',
              options: [
                'At the end, so the AI reads them last and they\'re freshest in memory',
                'In the middle, so they\'re surrounded by supporting context',
                'At the beginning, before other context or content',
                'It doesn\'t matter — AI reads all parts of a prompt equally',
              ],
              correct: 2,
              explanation:
                'Research on LLM attention shows that models tend to give more weight to content at the start (and end) of prompts. Placing key constraints — your target audience, required tone, output format — at the very beginning of your prompt ensures they shape the entire response. This is especially important for long prompts.',
            },
          ],
        },
        {
          id: 'marketing-m1-l4',
          title: 'Setting Up Your AI Workflow from Day One',
          duration: 17,
          description:
            'Build the habits, folder structure, and prompt library that will make you 10x faster within two weeks. This lesson covers the practical setup that most marketers skip — and later regret.',
          content: `## The Setup Most Marketers Skip

Most people open an AI tool, type something, get a result, and close the tab. They repeat this every time, reinventing the wheel. The marketers who get compounding value from AI do three things differently: they maintain a prompt library, they build a brand context document, and they establish a consistent workflow.

## Your Brand Context Document

This is the single highest-leverage asset you can create. It's a text document (500-800 words) that contains:

- **Brand voice description:** Three adjectives, what you sound like, what you never sound like
- **Target audience:** Specific description of primary customer persona
- **Key messages:** Your 3-5 core value propositions
- **Things to avoid:** Competitor names, over-used phrases, claims you can't back
- **Sample content:** Two or three paragraphs that represent your ideal tone

Paste this document at the start of any important AI conversation. It eliminates generic-sounding output in one step.

## Your Prompt Library

Create a simple folder in Google Drive or Notion. For every prompt that produces a great output, save it with a descriptive title. Organise by task type:

- \`📁 Email\` — subject lines, nurture sequences, newsletters
- \`📁 Social\` — LinkedIn, Instagram, Twitter/X formats
- \`📁 Content\` — blog intros, CTAs, product descriptions
- \`📁 Research\` — competitor analysis, audience research, trend summaries

Within a month, you'll have 30-40 proven prompts you can reuse and modify.

## The Three-Stage Workflow

**Stage 1: Generate.** Use a broad prompt to produce a first draft. Don't overthink the prompt at this stage — volume is the goal.

**Stage 2: Refine.** In the same conversation, give feedback: "Make this shorter," "The second paragraph is too formal," "Add a specific statistic placeholder where I'll insert a real number."

**Stage 3: Polish.** Do your own editing pass. AI produces the 80%. You produce the final 20% that makes it distinctly yours.

## Protecting Sensitive Information

Never paste customer data, personal identifiable information (PII), or confidential financial information into consumer AI tools. Most consumer tools (free tiers) use your inputs to improve their models. Use enterprise versions (ChatGPT Enterprise, Claude for Work) or check your company's AI policy before sharing sensitive content.

## Weekly Review Habit

Every Friday, spend 10 minutes: What prompts worked this week? Save the best two to your library. What output missed? What would you change about the prompt?`,
          keyTakeaways: [
            'A brand context document (500-800 words) eliminates generic AI output — create one this week',
            'A prompt library in Google Drive or Notion turns one-time wins into repeatable assets',
            'The three-stage workflow (generate, refine, polish) is more efficient than trying to perfect in one go',
            'Never paste PII or confidential data into consumer AI tools — check your company\'s AI policy',
            'A 10-minute Friday review habit compounds into significant capability improvement over time',
          ],
          exercise: {
            title: 'Build Your Brand Context Document',
            description:
              'Create the foundational document you\'ll use in every future AI session to instantly calibrate the AI to your brand.',
            steps: [
              'Open a new Google Doc or Notion page titled "AI Brand Context — [Your Company]"',
              'Write 3-5 sentences describing your brand voice: "We sound like... We never sound like... Our tone is..."',
              'Add a one-paragraph description of your primary customer persona (who they are, their main challenge, what they care about)',
              'List your top 3 value propositions as bullet points',
              'Paste two examples of existing content that you think best represents your brand voice, with a note saying "Write in a style similar to these examples"',
            ],
            tool: 'Claude',
          },
          quiz: [
            {
              question: 'What is the primary purpose of a "brand context document" for AI marketing work?',
              options: [
                'To train a custom AI model on your brand data',
                'To provide the AI with consistent brand information at the start of each session, eliminating generic output',
                'To store your password and API keys for AI tools',
                'To share your marketing strategy with your AI tool provider',
              ],
              correct: 1,
              explanation:
                'A brand context document is pasted at the start of AI sessions to give the model the information it needs to produce on-brand output. Because AI tools have no memory of your brand between sessions, providing this context each time is the fastest way to get useful, brand-appropriate results.',
            },
            {
              question: 'Which of the following should you NEVER paste into a consumer AI tool like free-tier ChatGPT?',
              options: [
                'A draft blog post for review and editing',
                'Your brand voice guidelines',
                'A list of customer names and email addresses',
                'A competitor\'s publicly available homepage copy',
              ],
              correct: 2,
              explanation:
                'Customer personally identifiable information (PII) — names, emails, purchase history — must never be pasted into consumer AI tools. Free-tier tools may use inputs to improve their models. Always use enterprise/business versions with data processing agreements, or check your company\'s AI policy, before working with any customer data.',
            },
            {
              question: 'In the three-stage AI workflow (Generate, Refine, Polish), what is the marketer\'s primary role?',
              options: [
                'Only in the Generate stage — writing the initial prompt',
                'Only in the Polish stage — fixing grammar and spelling',
                'Across all three stages, with the Polish stage being where human judgement is most critical',
                'The workflow is fully automated — no human input needed after the initial prompt',
              ],
              correct: 2,
              explanation:
                'Effective AI use is collaborative across all three stages. You write the prompt (Generate), give feedback to improve it (Refine), then bring your own expertise, brand knowledge, and judgement to the final edit (Polish). The 80/20 rule applies: AI handles 80% of the drafting work; you provide the 20% that makes content genuinely yours.',
            },
          ],
        },
      ],
    },
    {
      id: 'marketing-m2',
      title: 'AI Copywriting & Content',
      description:
        'Master the prompting techniques that produce great copy — for campaigns, email, social, and long-form content — while maintaining your brand voice.',
      lessons: [
        {
          id: 'marketing-m2-l1',
          title: 'The Anatomy of a High-Performance Marketing Prompt',
          duration: 18,
          description:
            'Learn the five-part prompt structure that consistently produces usable first drafts. You\'ll apply it immediately to real copy tasks and see the difference it makes.',
          content: `## Why Most Marketing Prompts Fail

The most common AI prompt a marketer writes looks like: "Write a blog post about our new product." The output is predictably generic. The issue isn't the AI — it's the prompt. Great prompts are built, not improvised.

## The Five-Part Prompt Structure

**1. Role** — Tell the AI who it is.
*"You are a senior B2B copywriter specialising in SaaS..."*

This shapes the register, terminology, and sophistication of output. "Senior copywriter" produces different results than "marketing assistant."

**2. Context** — Give relevant background.
*"Our product is a project management tool for remote engineering teams. Our main competitors are Jira and Asana. Our key differentiator is that we automatically surface blockers before they delay the sprint."*

Don't make the AI guess what it doesn't know.

**3. Task** — State the deliverable precisely.
*"Write three versions of a LinkedIn post announcing our new Slack integration..."*

Specify format, length, quantity, and purpose.

**4. Audience** — Describe the reader.
*"...targeting engineering managers at Series B startups who are frustrated with status update meetings..."*

The AI adjusts vocabulary, pain points, and desired emotional response based on the audience you specify.

**5. Constraints** — State what to avoid or include.
*"Each post must be under 200 characters, include one concrete metric, avoid the words 'streamline' and 'empower', and end with a question."*

Constraints are not restrictions — they're the difference between generic and specific.

## Putting It Together

> You are a senior B2B copywriter specialising in SaaS. Our product is a project management tool for remote engineering teams. Write three LinkedIn posts announcing our new Slack integration. Target engineering managers at Series B startups frustrated by status update meetings. Each post must be under 200 characters, include one concrete metric, avoid the words "streamline" and "empower", and end with a question.

This takes 45 seconds to write and saves 20 minutes of editing.

## The Iteration Principle

Your first prompt is a starting point, not a final answer. Treat the first response as a draft. Then refine with single, specific feedback: "Make the second post shorter," "The tone in post 3 is too formal," "Add a specific time-saving claim."`,
          keyTakeaways: [
            'The five-part structure (Role, Context, Task, Audience, Constraints) consistently outperforms one-line prompts',
            'Assigning the AI a specific role (e.g., "senior B2B copywriter") shapes the sophistication of its output',
            'Audience specification is the single biggest lever on whether content resonates with real readers',
            'Constraints eliminate generic language — listing words to avoid forces more specific alternatives',
            'Always treat the first output as a draft and refine with specific, targeted follow-up instructions',
          ],
          exercise: {
            title: 'Build a Five-Part Prompt for Real Copy',
            description:
              'Apply the five-part structure to an actual piece of copy you need this week.',
            steps: [
              'Choose a real copy task: an email subject line batch, a product description, a social post series, or an ad headline test',
              'Write each of the five components separately: Role, Context, Task, Audience, Constraints',
              'Combine them into one prompt and run it in ChatGPT',
              'Identify the single weakest element in the output and write one specific follow-up instruction to address it',
              'Compare the refined output to the first draft and note how many editing rounds you saved',
            ],
            tool: 'ChatGPT',
          },
          quiz: [
            {
              question: 'Which component of the five-part prompt structure has the greatest impact on whether content resonates emotionally with readers?',
              options: [
                'Role — because it determines the AI\'s expertise level',
                'Context — because it gives the AI factual background',
                'Audience — because it shapes which pain points and language the AI uses',
                'Constraints — because they prevent generic language',
              ],
              correct: 2,
              explanation:
                'Audience specification shapes the emotional register, vocabulary, pain points, and aspirations that the AI addresses. A post for "IT managers at enterprise firms" sounds completely different from one for "startup founders." Getting the audience right ensures the content speaks to real problems, not imagined ones.',
            },
            {
              question: 'What is the most effective way to improve an AI-generated draft that is too generic?',
              options: [
                'Regenerate the response multiple times until one is better',
                'Switch to a different AI tool',
                'Give one specific piece of follow-up feedback identifying exactly what needs to change',
                'Ask the AI to "make it better"',
              ],
              correct: 2,
              explanation:
                '"Make it better" gives the AI no direction. Specific feedback — "the third paragraph is too formal, rewrite it as if explaining to a frustrated colleague" — produces targeted improvements. Regenerating is essentially rolling dice. Switching tools doesn\'t solve a prompt problem.',
            },
            {
              question: 'You want AI to write a product description that avoids the overused phrase "industry-leading." Where do you put this instruction?',
              options: [
                'In a separate follow-up prompt after you see the first output',
                'In the Constraints section of your initial prompt',
                'You can\'t prevent AI from using common phrases',
                'In the Role section, by specifying a "non-cliché writer"',
              ],
              correct: 1,
              explanation:
                'Specific exclusions belong in the Constraints section of your prompt. Listing words or phrases to avoid is one of the most effective constraints — it forces the AI to find more specific, differentiated language. Doing it upfront saves an editing round.',
            },
          ],
        },
        {
          id: 'marketing-m2-l2',
          title: 'Campaign Briefs and Creative Concepts at Speed',
          duration: 17,
          description:
            'Use AI to compress the campaign briefing process from days to hours. You\'ll produce creative concepts, messaging hierarchies, and channel strategies faster than ever before.',
          content: `## The Campaign Brief Bottleneck

Every campaign starts with a brief. Writing a thorough brief takes time — time that marketers rarely have. AI doesn't replace strategic thinking in this process, but it dramatically accelerates the documentation and exploration stages.

## Using AI for the Briefing Stage

**Generating the brief itself.** Share your campaign objective and key facts, then ask the AI to produce a draft brief. You'll get the structure filled in fast, and your job becomes reviewing and correcting rather than writing from scratch.

Prompt example:
> "Generate a campaign brief for a product launch email series. Product: [X]. Target audience: [Y]. Campaign goal: drive 200 trial sign-ups in 30 days. Budget: mid-range, digital-only. Format: include objective, audience, key message, channels, success metrics, and creative direction."

**Exploring creative territories.** Before committing to a creative direction, use AI to generate 5-8 campaign concept territories — different emotional or strategic angles. This takes 2 minutes and gives you a range to evaluate with your team.

> "Give me 6 campaign concept territories for a B2B SaaS product launch. Each territory should have a name, one-sentence strategic rationale, and one sample headline. Make them genuinely different from each other."

**Building the messaging hierarchy.** Ask AI to organise your key messages from most-to-least important, grouped by audience.

## Validating Concepts with AI

Once you have concepts, use AI to pressure-test them:
- "What are the three weakest elements of this campaign concept?"
- "How would a skeptical CFO respond to this message?"
- "Generate three objections a customer might have to this claim."

This kind of pre-mortem analysis used to require a workshop. Now it takes five minutes.

## What to Do Yourself

AI generates options. You make decisions. Your strategic judgment — which concept fits your brand, which message matches your sales motion, which channel makes sense for your audience — is irreplaceable. Use AI to generate the menu; you choose the meal.`,
          keyTakeaways: [
            'AI can draft a campaign brief structure in minutes — your role is to review, correct, and add strategic depth',
            'Generating 6-8 creative territories with AI before committing gives you a real range to evaluate',
            'Using AI for pre-mortem analysis ("what are the weaknesses of this concept?") replaces entire workshop stages',
            'Always generate more options than you need — abundance is the AI\'s advantage over individual human brainstorming',
            'Strategic decisions (which concept, which channel, which message) remain a human responsibility',
          ],
          exercise: {
            title: 'Generate a Campaign Brief in 15 Minutes',
            description:
              'Use AI to produce a complete campaign brief for an upcoming initiative, then pressure-test the creative direction.',
            steps: [
              'Choose an upcoming campaign (even a small one — a newsletter series, a product announcement, a seasonal promotion)',
              'Write a prompt specifying: campaign objective, product/service, target audience, timeline, budget range, and desired output format',
              'Ask the AI to produce the brief AND generate four creative concept territories',
              'Select the concept territory that most resonates and ask the AI: "What are the three biggest risks or weaknesses in this creative direction?"',
              'Incorporate one of the AI-identified risks into your brief as a mitigation note',
            ],
            tool: 'Claude',
          },
          quiz: [
            {
              question: 'What is the most strategic use of AI during the campaign briefing stage?',
              options: [
                'Having AI make all creative decisions to remove human bias',
                'Using AI to generate a range of options and draft documentation, freeing humans for strategic decisions',
                'Replacing the brief entirely with a quick AI-generated campaign plan',
                'Using AI only to check spelling in the final brief',
              ],
              correct: 1,
              explanation:
                'AI excels at generating options, drafting documents, and exploring creative territories quickly. The strategic value comes from generating more options faster — briefing, concept territories, pressure-testing — while leaving final decisions (which concept, which channel, which message) to humans with actual market knowledge.',
            },
            {
              question: 'You\'ve used AI to generate six campaign concept territories. What should you do next?',
              options: [
                'Pick the first one and move forward immediately',
                'Ask AI to pick the best one for you',
                'Evaluate them as a team and select based on strategic fit, then use AI to pressure-test the chosen concept',
                'Discard all six and write a new prompt for better options',
              ],
              correct: 2,
              explanation:
                'AI-generated options are starting points for human decision-making, not final selections. Evaluate the territories based on your brand, market knowledge, and sales context — then use AI again to stress-test the chosen direction. This human-AI collaboration is where the real value lies.',
            },
            {
              question: 'Which prompt is most likely to produce useful campaign concept territories?',
              options: [
                '"Write a campaign for our product launch"',
                '"Give me 6 campaign concept territories for a B2B SaaS launch. Each should have a name, one-sentence rationale, and a sample headline. Make them genuinely different from each other."',
                '"What is the best campaign concept for our business?"',
                '"Help me with marketing"',
              ],
              correct: 1,
              explanation:
                'The second prompt specifies quantity (6), format (name + rationale + headline), and crucially asks for genuinely different territories. Without that last instruction, AI tends to produce variations on a theme. Specificity about quantity and differentiation is what turns a generic list into a useful creative exploration.',
            },
          ],
        },
        {
          id: 'marketing-m2-l3',
          title: 'Repurposing Content Across Channels',
          duration: 16,
          description:
            'Turn one piece of content into ten. Learn the repurposing workflow that extracts maximum value from every asset you create, without losing quality in translation.',
          content: `## The Repurposing Opportunity

Most marketing teams underinvest in repurposing. A 2,000-word blog post contains enough material for 8-10 LinkedIn posts, a 5-email nurture sequence, an executive summary, three slide concepts, and a script for a short video. AI makes this extraction process fast enough to actually do.

## The Core Repurposing Workflow

**Step 1: Create the "source" asset.** Write or commission your highest-quality long-form piece — a detailed blog post, a case study, a guide, a webinar script.

**Step 2: Paste and instruct.** Share the full content with Claude or ChatGPT and use the following structure:

> "I'm going to share a piece of long-form marketing content. From this source material, I want you to generate: [list of formats]. Maintain the key arguments and our brand voice throughout. [Brand voice description]. Source content: [paste content]"

**Step 3: Generate by format.** Rather than asking for everything at once, ask for each format separately. This keeps outputs focused and easier to evaluate.

## Format-Specific Instructions

**LinkedIn posts:** "Extract the single most provocative or counter-intuitive insight from this content. Write a 250-word LinkedIn post structured as: hook line, 3-4 short paragraphs, question at end."

**Email sequence:** "Turn this content into a 3-part email series. Each email should focus on one key argument. Subject line, 150-word body, one clear CTA per email."

**Executive summary:** "Summarise this content in 200 words for a time-pressed executive who will only read this version. Lead with the conclusion."

**Tweet thread:** "Convert the main points into a 7-tweet thread. First tweet must be a hook. Last tweet must be a CTA."

## Maintaining Quality Across Formats

The biggest repurposing risk is format-appropriate content that loses the argument. Always check: Does this version convey the same core insight, or just the surface-level topic? The LinkedIn post should teach something. The email should move the reader to action. The summary should reach the same conclusion as the original.`,
          keyTakeaways: [
            'One long-form asset can yield 8-10 pieces of content across formats — AI makes this extraction fast',
            'Always start with the highest-quality "source" asset — repurposing amplifies quality and amplifies weakness',
            'Generate each format separately with format-specific instructions for better results than asking for all at once',
            'The executive summary format requires leading with the conclusion — specify this explicitly in your prompt',
            'Audit repurposed pieces to ensure the core argument is preserved, not just the topic',
          ],
          exercise: {
            title: 'Repurpose One Asset into Four Formats',
            description:
              'Take a piece of content your team has already published and extract maximum value by generating four new formats.',
            steps: [
              'Choose a published long-form asset: a blog post, case study, whitepaper section, or webinar transcript (paste or upload it)',
              'Prompt Claude: "From this content, generate a 250-word LinkedIn post leading with the most surprising insight"',
              'Then prompt: "Now write a 3-email sequence based on the same content. Subject lines, 150-word bodies, one CTA each"',
              'Then prompt: "Write a 200-word executive summary leading with the conclusion"',
              'Review all four versions and note: which required the most editing? That format needs a more specific prompt next time',
            ],
            tool: 'Claude',
          },
          quiz: [
            {
              question: 'What is the most important quality to start with when repurposing content?',
              options: [
                'A short piece, since shorter content is easier for AI to work with',
                'A high-quality source asset, since repurposing amplifies both strengths and weaknesses',
                'Content that was published at least six months ago',
                'Content written entirely by the marketing team, not by AI',
              ],
              correct: 1,
              explanation:
                'Repurposing multiplies what\'s already there. A weak argument in the original will be a weak argument across all 10 derived formats. Always repurpose from your strongest, most insightful content — case studies with real results, posts that got genuine engagement, or guides that sales uses regularly.',
            },
            {
              question: 'Why is it better to generate each repurposed format in a separate prompt rather than all at once?',
              options: [
                'AI can\'t handle multiple format requests in one prompt',
                'It keeps outputs focused and easier to evaluate individually, producing better results per format',
                'Separate prompts cost less',
                'It\'s a platform requirement for most AI tools',
              ],
              correct: 1,
              explanation:
                'When you ask for everything at once, the AI spreads its attention and produces lower-quality outputs for each format. Separate prompts allow you to give format-specific instructions (e.g., "this LinkedIn post should lead with a counter-intuitive claim") and evaluate each output against that format\'s specific quality standards.',
            },
            {
              question: 'When creating an executive summary from a longer piece, what instruction should you always include?',
              options: [
                '"Include all the same examples as the original piece"',
                '"Lead with the conclusion — busy executives read the first paragraph and often stop"',
                '"Keep the same length as the original but remove images"',
                '"Use bullet points for every sentence"',
              ],
              correct: 1,
              explanation:
                'Executive audiences typically read the first paragraph and skim the rest. Without explicit instruction, AI summarises chronologically — starting with context and building to the conclusion, just like the original. Explicitly instructing it to lead with the conclusion is the single most important format-specific instruction for this use case.',
            },
          ],
        },
        {
          id: 'marketing-m2-l4',
          title: 'Maintaining Brand Voice at Scale',
          duration: 19,
          description:
            'The biggest quality risk in AI-assisted content is a drift toward generic output. This lesson teaches the techniques that keep AI firmly inside your brand voice, even across large volumes.',
          content: `## Why AI Drifts Toward Generic

LLMs are trained on enormous volumes of average internet text. Without strong guidance, they regress to the mean: polished, bland, inoffensive, and forgettable. Maintaining brand voice is an active, deliberate process — not something that happens by default.

## The Voice Calibration Technique

**Step 1: Write your "anti-examples."** What does your brand *not* sound like? Be specific.
- "We don't use corporate buzzwords like 'leverage', 'synergy', 'value-add'"
- "We're direct, not diplomatic. We say 'this doesn't work' not 'there may be room for improvement'"
- "We don't use exclamation marks"

Anti-examples are often more powerful than positive descriptions because they create hard rails.

**Step 2: Provide two gold-standard examples.** Select two pieces of existing content that perfectly represent your brand voice. Paste them with the instruction: "Write in a style consistent with these examples."

**Step 3: Introduce "Voice Scoring."** After generating content, add: "Rate this output from 1-10 on brand voice, explain the deduction, and rewrite at a 9+." The AI is often surprisingly good at its own critique when prompted explicitly.

## The Style Guide Prompt

Distil your brand voice into a short, structured prompt section you can reuse:

> **Voice:** Confident and direct. We write short sentences. We don't hedge. We avoid superlatives.
> **Vocabulary:** Use [industry-specific terms]. Avoid: 'leverage', 'seamless', 'game-changer', 'next-level'.
> **Reader respect:** We assume the reader is smart. We don't explain obvious things. We don't soften hard truths.

Copy this section into every prompt for content that will be published.

## Scaling Without Dilution

When generating at volume (10 social posts, 20 subject lines), explicitly remind the AI mid-sequence: "Maintain the same voice throughout. Do not let quality drift in later items." This simple instruction prevents the common pattern of strong early outputs and weaker later ones.

## The Human Layer

No matter how good your voice instructions are, always do a final read-aloud test. If a sentence sounds like something no human would actually say in conversation, revise it. Your authentic voice is the final filter that AI cannot replicate.`,
          keyTakeaways: [
            'AI defaults to generic without strong voice guidance — maintaining brand voice is active, not passive',
            'Anti-examples (what you never sound like) are often more powerful constraints than positive descriptions',
            'A reusable "style guide prompt section" that specifies voice, vocabulary, and reader assumptions prevents drift',
            'Ask the AI to self-rate its output on brand voice and rewrite — it\'s surprisingly effective at self-critique',
            'A read-aloud test is the final quality gate: if it sounds unnatural spoken aloud, revise it',
          ],
          exercise: {
            title: 'Build a Voice Calibration Prompt',
            description:
              'Create a reusable prompt section that locks AI output to your brand voice, then test it on five pieces of content.',
            steps: [
              'List five words or phrases your brand NEVER uses (corporate jargon, overused claims, competitor terminology)',
              'List three characteristics of your brand voice as "We [verb]" statements (e.g., "We write short sentences", "We lead with the user\'s problem")',
              'Select two published pieces that best represent your voice — copy a paragraph from each',
              'Combine these into a "Voice Block" — a 100-150 word prompt section you\'ll paste at the start of content prompts',
              'Test it: generate five LinkedIn posts with and without the Voice Block, compare the outputs, and share the Voice Block with your team',
            ],
            tool: 'ChatGPT',
          },
          quiz: [
            {
              question: 'Why do "anti-examples" (what the brand does NOT sound like) work better than positive descriptions alone?',
              options: [
                'They are easier for AI to process than positive descriptions',
                'They create specific hard rails that eliminate common generic patterns and corporate jargon',
                'Positive descriptions are not understood by AI tools',
                'Anti-examples are shorter and save on token count',
              ],
              correct: 1,
              explanation:
                'Positive voice descriptions ("confident, direct, friendly") are interpreted broadly. Anti-examples are specific exclusions: "never use \'leverage\' or \'seamless\'" eliminates entire categories of generic language. The combination of both — what to sound like AND what to never say — is far more effective than either alone.',
            },
            {
              question: 'You\'ve generated 15 social posts in one session and notice the later posts are weaker and more generic. What is the most effective fix?',
              options: [
                'Start a new session for every batch of five posts',
                'Add the instruction: "Maintain the same voice throughout. Do not let quality drift in later items" before generating the full batch',
                'Only use AI for the first five posts and write the rest manually',
                'Reduce the batch size to three posts at a time',
              ],
              correct: 1,
              explanation:
                'AI does tend to drift toward generic in longer sequences, especially later in a batch. Explicitly instructing the model to maintain consistency prevents this. Adding this reminder at the start of a batch-generation prompt costs nothing and meaningfully improves consistency across the full set.',
            },
            {
              question: 'What is the "read-aloud test" and why does it matter for AI-generated content?',
              options: [
                'A test where you ask the AI to read its own output and critique it',
                'Reading AI content out loud to check if it sounds natural as spoken language — an indicator of authentic, human-sounding voice',
                'A test conducted by your legal team to ensure compliance',
                'A feature built into some AI tools that reads text back to you',
              ],
              correct: 1,
              explanation:
                'AI-generated text often sounds plausible when scanned silently but awkward when spoken aloud. Sentences that no human would naturally say in conversation are a signal that the AI has reverted to statistical patterns rather than genuine voice. Reading aloud catches these phrases before they reach your audience.',
            },
          ],
        },
      ],
    },
    {
      id: 'marketing-m3',
      title: 'Campaign Intelligence',
      description:
        'Use AI to conduct faster, deeper market research, audience segmentation, competitor analysis, and A/B testing strategy than was previously possible.',
      lessons: [
        {
          id: 'marketing-m3-l1',
          title: 'AI-Powered Market Research',
          duration: 18,
          description:
            'Replace hours of desk research with targeted AI-assisted analysis. You\'ll learn how to structure research prompts, synthesise findings, and identify gaps the AI can\'t fill.',
          content: `## Rethinking Market Research

Traditional market research is time-consuming: search, read, synthesise, repeat. AI doesn't eliminate this process, but it dramatically accelerates two stages: initial synthesis of known information and structuring what you need to find.

## What AI Is Good At in Research

- **Summarising publicly known information** about markets, categories, and consumer behaviour
- **Generating research questions** you haven't thought to ask
- **Structuring findings** from raw notes into coherent analysis
- **Identifying gaps** — asking "what would I need to know to be confident in this conclusion?"

## The Research Prompt Stack

**Start broad, then narrow.** Don't ask for everything in one prompt.

Prompt 1: *"Describe the key trends shaping [industry] in the last 18 months. Focus on shifts in customer behaviour, competitive dynamics, and technology adoption."*

Prompt 2: *"Based on these trends, what are the three biggest strategic questions a [company type] should be investigating?"*

Prompt 3: *"For the question '[your chosen question]', what data would a market researcher gather to answer it? List 8 specific data points or sources."*

This stack goes from orientation → prioritisation → research design in 15 minutes.

## Feeding AI Real Research

The real power comes when you paste actual research — reports, survey results, interview transcripts — and ask AI to synthesise:

*"I'm going to share notes from 6 customer interviews. Identify the three most common themes, note any contradictions between respondents, and highlight the most surprising insight."*

This kind of synthesis that used to take a day can take 20 minutes.

## The Limitations You Must Respect

- AI's knowledge has a cutoff date — treat it as a starting point, not a source
- It cannot access proprietary databases (Mintel, Nielsen, etc.)
- It will generate plausible-sounding statistics that may be fabricated
- Primary research (talking to real customers) remains irreplaceable`,
          keyTakeaways: [
            'AI excels at synthesising known information and structuring research questions — not replacing primary research',
            'Use a prompt stack (broad → narrow → specific) rather than one enormous research request',
            'Feeding AI your own research notes for synthesis is where the biggest time savings occur',
            'Always verify statistics from AI independently — fabricated numbers are the most common research error',
            'Primary research (customer interviews, surveys) cannot be replaced by AI and remains your competitive advantage',
          ],
          exercise: {
            title: 'Research Audit: 30-Minute Market Overview',
            description:
              'Use the three-prompt research stack to produce a structured market overview for a category you\'re marketing in.',
            steps: [
              'Identify the market or product category you want to understand better',
              'Run Prompt 1: "Describe the key trends shaping [your category] in the last 18 months. Focus on customer behaviour shifts, competitive dynamics, and technology adoption."',
              'Run Prompt 2: "Based on these trends, what are the three biggest strategic questions I should investigate to sharpen my marketing positioning?"',
              'Run Prompt 3: Choose the most relevant question and ask: "What specific data points or sources would I need to gather to answer this question confidently?"',
              'Flag every specific statistic the AI provided and mark each one for independent verification before using in any external document',
            ],
            tool: 'Claude',
          },
          quiz: [
            {
              question: 'What is the most valuable use of AI in market research for a marketer?',
              options: [
                'Replacing primary customer research entirely',
                'Accessing proprietary market databases like Nielsen or Mintel',
                'Synthesising your own qualitative research notes and structuring research questions',
                'Generating accurate, up-to-date market statistics for reports',
              ],
              correct: 2,
              explanation:
                'AI is most valuable in market research as a synthesis and structuring tool. Pasting your own customer interview notes, survey responses, or research findings and asking for pattern identification, theme clustering, or contradiction-spotting is where AI saves the most time and produces genuinely useful output.',
            },
            {
              question: 'A colleague uses an AI-generated market size statistic ("the market is worth $4.7B") in a board presentation without verification. What is the risk?',
              options: [
                'No risk — AI statistics are drawn from reliable sources',
                'Minor formatting issues only',
                'The statistic may be completely fabricated, causing credibility damage if challenged',
                'The statistic will be accurate but slightly outdated',
              ],
              correct: 2,
              explanation:
                'LLMs regularly produce specific-sounding statistics that are entirely fabricated — a phenomenon called hallucination. The numbers often sound precise and plausible, making them particularly dangerous in presentations. Always verify market size, growth rate, and other specific figures through primary sources (industry reports, analyst research) before using them.',
            },
            {
              question: 'In the three-prompt research stack, what is the purpose of Prompt 3?',
              options: [
                'To ask the AI to conduct the research itself',
                'To translate research findings into marketing copy',
                'To design the specific data points and sources needed to answer the priority research question',
                'To summarise the output of Prompts 1 and 2',
              ],
              correct: 2,
              explanation:
                'Prompt 3 converts the prioritised research question from Prompt 2 into a research plan — the specific data points, sources, and methodology a researcher would need to actually answer the question. This bridges strategic framing and practical execution, turning an interesting question into an actionable research brief.',
            },
          ],
        },
        {
          id: 'marketing-m3-l2',
          title: 'Competitor Analysis with AI',
          duration: 17,
          description:
            'Build a structured competitor intelligence process that takes hours instead of days. You\'ll learn what AI can and can\'t know about competitors, and how to get maximum insight from what\'s publicly available.',
          content: `## The Competitor Intelligence Problem

Competitor analysis is important but often skipped because it's time-consuming. Most marketers either ignore competitors or spend a whole day on one. AI enables a middle path: systematic, regular, efficient competitor monitoring that doesn't consume your week.

## What AI Can Analyse

AI can analyse anything that's text-based and publicly available:
- Competitor websites, landing pages, and pricing pages
- Public job postings (reveals priorities and investment areas)
- Blog posts, case studies, and thought leadership
- LinkedIn company posts and executive commentary
- App store reviews and G2/Capterra review text
- Press releases and news coverage

**The key:** You copy and paste the text. AI provides the analysis.

## The Competitor Analysis Prompt Framework

For any competitor page or document:

> "Analyse this competitor content and tell me: (1) What key messages are they emphasising most prominently? (2) Who does their ideal customer appear to be? (3) What claims are they making that we could challenge? (4) What topics or advantages are they *not* mentioning that we could own? Competitor content: [paste text]"

## The Positioning Gap Technique

After analysing 3-4 competitors, ask:

> "Based on the competitor analyses above, what positioning territory is currently unoccupied? What claim or angle could our brand own that none of our competitors are making?"

This surfaces white space in your competitive landscape faster than any workshop.

## Job Posting Intelligence

Competitor job postings are underused intelligence gold. A company posting five "AI Engineer" roles tells you they're building internal AI capability. A cluster of "Enterprise Sales" hires tells you they're moving upmarket.

> "Here are job postings from [competitor]. What do these hiring patterns suggest about their strategic priorities over the next 12-18 months?"`,
          keyTakeaways: [
            'AI can analyse any publicly available text — websites, job postings, reviews, press releases, LinkedIn posts',
            'The four-question analysis framework (messages, ICP, challengeable claims, unoccupied territory) works on any competitor page',
            'Analysing 3-4 competitors and asking for unoccupied positioning territory reveals white space quickly',
            'Competitor job postings are underused strategic intelligence — hiring patterns signal investment priorities',
            'Copy-paste is the key workflow: you gather the text, AI provides the structured analysis',
          ],
          exercise: {
            title: 'Three-Competitor Positioning Analysis',
            description:
              'Conduct a rapid competitor analysis to identify positioning white space in your category.',
            steps: [
              'Choose three direct competitors. For each, copy the text from their homepage and "About" or "Product" page',
              'Run the four-question framework on each competitor separately in Claude',
              'After completing all three, paste the three analyses and ask: "What positioning territory is unoccupied across all three competitors? What angle could a fourth brand own?"',
              'Copy two or three job postings from your primary competitor and ask: "What do these hiring patterns suggest about their next 12-18 month strategic priorities?"',
              'Write three sentences summarising the biggest competitive positioning opportunity you\'ve identified',
            ],
            tool: 'Claude',
          },
          quiz: [
            {
              question: 'Which of the following is NOT a reliable source of competitor intelligence that AI can analyse?',
              options: [
                'Competitor product pages and pricing pages',
                'G2 and Capterra customer reviews of competitor products',
                'Competitor internal sales decks and strategy documents',
                'Competitor LinkedIn company posts and executive commentary',
              ],
              correct: 2,
              explanation:
                'Internal sales decks and strategy documents are not publicly available. AI can only analyse text you provide — and you should only provide legitimately obtained, publicly available content. Internal competitor documents are typically confidential, and obtaining them through improper means creates legal and ethical risk.',
            },
            {
              question: 'You\'ve analysed three competitors using AI. What is the most strategically valuable next step?',
              options: [
                'Write a report summarising each competitor\'s strengths',
                'Ask AI to identify what positioning territory is unoccupied across all three analyses',
                'Choose the weakest competitor and copy their strategy',
                'Ask AI to predict which competitor will win market share',
              ],
              correct: 1,
              explanation:
                'After individual competitor analyses, the most valuable question is: where is the white space? Asking the AI to synthesise across multiple analyses to identify unoccupied positioning territory turns individual snapshots into strategic opportunity. This is the insight that informs differentiation strategy.',
            },
            {
              question: 'A competitor has posted 8 new "Enterprise Sales Director" roles in the last month. What does this pattern most likely indicate?',
              options: [
                'The competitor is downsizing their SMB team',
                'The competitor is experiencing high sales team turnover',
                'The competitor is strategically moving upmarket toward enterprise customers',
                'No useful inference can be drawn from job postings',
              ],
              correct: 2,
              explanation:
                'Hiring patterns are reliable signals of strategic intent. A cluster of enterprise sales hires indicates an upmarket movement — often in response to market saturation at lower segments or a desire for larger deal sizes. Job postings are one of the most underused intelligence sources because they\'re public and specific about company priorities.',
            },
          ],
        },
        {
          id: 'marketing-m3-l3',
          title: 'Audience Segmentation and Persona Development',
          duration: 16,
          description:
            'Move beyond demographic personas to behavioural and psychographic segmentation using AI. You\'ll build richer audience models faster and learn how to pressure-test them against real customer language.',
          content: `## The Problem with Standard Personas

Most marketing personas describe demographics: "Sarah, 34, Marketing Manager, $85K salary, Boston." These profiles look complete but tell you almost nothing about what motivates buying decisions. AI helps you build richer, behaviourally grounded personas in less time.

## The Behavioural Segmentation Prompt

Instead of starting with demographics, start with behaviour and situation:

> "I want to develop a buyer persona for [product]. Rather than focusing on demographics, help me identify: (1) What specific situation or trigger event prompts someone to look for this solution? (2) What do they believe before discovering us, and what misconceptions do they hold? (3) What does success look like to them — how do they measure the value of this purchase? (4) What are the top three objections that stop them from buying?"

This produces personas that marketing can actually use for copy and content.

## Psychographic Depth: The "Day in the Life" Technique

> "Describe a typical Tuesday for a [target persona] at a [company type]. What are they worried about at 9am? What meeting frustrates them most? What do they read over lunch? What do they tell their manager at end of day?"

This level of detail — which AI can generate from pattern recognition across vast amounts of content about this type of professional — makes your messaging resonate at an emotional level, not just a functional one.

## Validating Personas Against Real Language

Paste customer reviews, support tickets, or sales call notes and ask:

> "Does the language in these customer responses match the persona I described? What assumptions in my persona does this real customer language contradict?"

This grounds AI-generated personas in reality.

## Multiple Segments, Multiple Messages

For products with multiple buyer types, generate segments side-by-side and ask: "For each of these segments, what is the single most important message we should lead with? Why might the same feature have different value for each segment?"`,
          keyTakeaways: [
            'Behavioural and situational personas (triggers, beliefs, objections) outperform demographic profiles for marketing use',
            'The "day in the life" technique generates psychographic depth that makes copy resonate emotionally',
            'Always validate AI-generated personas against real customer language from reviews, calls, or support tickets',
            'The same feature can have completely different value for different segments — segmentation should shape messaging, not just channel',
            'Side-by-side segment comparison reveals which message to lead with for each audience',
          ],
          exercise: {
            title: 'Behavioural Persona Development',
            description:
              'Build one rich behavioural persona using the situational prompting technique, then validate it against real customer language.',
            steps: [
              'Choose your primary customer segment and run the four-question behavioural prompt (trigger, beliefs, success definition, objections)',
              'Follow up with the "Day in the Life" prompt for the same persona',
              'Find five real customer reviews or testimonials for your product (or a competitor\'s)',
              'Paste them and ask: "Does the language in these reviews match the persona I described? What does real customer language contradict or confirm?"',
              'Revise your persona based on contradictions between AI-generated assumptions and real customer language',
            ],
            tool: 'Claude',
          },
          quiz: [
            {
              question: 'Which persona type is most useful for writing marketing copy that drives conversions?',
              options: [
                'A demographic persona: age, income, location, job title',
                'A behavioural persona: trigger events, beliefs, objections, and success definition',
                'An aspirational persona: what the customer wants to become',
                'A competitor persona: who is buying from competitors instead',
              ],
              correct: 1,
              explanation:
                'Behavioural personas answer the questions that copy must address: what made them look for a solution now (trigger), what misconceptions do they hold (beliefs to challenge), what stops them from buying (objections to handle), and how they measure value (outcomes to promise). Demographics tell you who they are; behaviour tells you how to move them.',
            },
            {
              question: 'What is the purpose of validating an AI-generated persona against real customer reviews?',
              options: [
                'To comply with data privacy regulations',
                'To identify gaps and contradictions between AI assumptions and actual customer language and priorities',
                'Real customer reviews are not useful for persona development',
                'To make the persona document longer and more detailed',
              ],
              correct: 1,
              explanation:
                'AI generates personas based on pattern recognition across general content about professional types. Your actual customers may have different priorities, use different language, and have different objections. Validating against real customer language — reviews, call recordings, support tickets — corrects AI assumptions with ground truth.',
            },
            {
              question: 'You have a product that appeals to both CFOs and Marketing Directors. What should you ask AI to do with these two segments?',
              options: [
                'Combine them into one "business leader" persona to simplify your messaging',
                'Choose the more valuable segment and ignore the other',
                'Generate both personas and ask what single most important message to lead with for each, and why the same feature might have different value',
                'Only market to CFOs since they control budget',
              ],
              correct: 2,
              explanation:
                'Different segments have fundamentally different motivations even for the same product. A CFO cares about ROI and risk; a Marketing Director cares about campaign performance and speed. The same feature (e.g., "real-time analytics") has different value propositions for each. Generating and comparing side-by-side ensures your messaging is segment-appropriate, not generic.',
            },
          ],
        },
        {
          id: 'marketing-m3-l4',
          title: 'A/B Testing Strategy with AI',
          duration: 15,
          description:
            'Use AI to generate more test hypotheses, more systematically, than your team could brainstorm alone. Then use it to interpret test results and design the next iteration.',
          content: `## Why Most A/B Testing Fails

A/B testing fails for one of two reasons: teams test inconsequential variations (button colour changes) or they don't test enough variations to find real improvements. AI solves both problems by generating a wider range of genuinely different hypotheses.

## Generating Test Hypotheses with AI

Give AI full context on what you're testing:

> "I'm running an A/B test on a landing page for [product]. Current conversion rate is [X%]. Primary CTA is [text]. Hero headline is [current headline]. Target audience is [segment]. Generate 8 test hypotheses. For each: what specifically to change, the rationale (what psychological principle makes this likely to improve performance), and what result would mean the test succeeded."

The psychological rationale component is key — it forces hypotheses that are grounded in why behaviour might change, not just what might change.

## The Hypothesis Hierarchy

Not all tests are equal. Prioritise with AI:

> "From these 8 hypotheses, which three should I test first? Rank by: (1) likelihood of meaningful impact based on conversion principles, (2) ease of implementation, (3) what you'd learn even if the test loses."

## Interpreting Results

After a test concludes:

> "My A/B test results: control had [X] conversions from [Y] visitors. Variant had [A] conversions from [B] visitors. Statistical significance is [X%]. What does this tell us? What should we test next based on this result?"

AI won't replace a statistician for complex analysis, but for common business tests, it provides useful interpretation quickly.

## The Learning Orientation

The goal of A/B testing isn't just to improve this specific element — it's to build a body of knowledge about what your audience responds to. After every test, ask: "What did this test teach us about our audience that applies beyond this specific page?"`,
          keyTakeaways: [
            'AI generates more test hypotheses faster — include the psychological rationale requirement to avoid trivial variations',
            'Prioritise hypotheses by impact potential, implementation ease, and learning value — even losing tests should teach something',
            'The psychological principle behind each hypothesis (social proof, loss aversion, specificity) should drive test design',
            'AI can provide useful interpretation of common A/B test results, though complex statistical analysis still needs expert review',
            'The true goal of A/B testing is audience intelligence — insights that apply beyond the specific element tested',
          ],
          exercise: {
            title: 'Generate an A/B Test Hypothesis Backlog',
            description:
              'Build a prioritised backlog of test hypotheses for a key marketing asset using the psychological rationale framework.',
            steps: [
              'Choose a landing page, email, or ad that could be improved. Note the current key metrics (open rate, CTR, conversion rate)',
              'Run the hypothesis generation prompt: ask for 8 hypotheses with specific change, psychological rationale, and success definition',
              'Ask AI to rank the top 3 by impact likelihood, implementation ease, and learning value',
              'For your top hypothesis, ask: "Write the control and variant version of the specific element being tested"',
              'Add all 8 hypotheses to a tracking document with the rationale — this is your test backlog',
            ],
            tool: 'ChatGPT',
          },
          quiz: [
            {
              question: 'Why should you require a "psychological rationale" when asking AI to generate A/B test hypotheses?',
              options: [
                'It makes the document look more professional',
                'It grounds hypotheses in why behaviour might change, not just what might change — filtering out trivial tests',
                'AI tools require this format to function correctly',
                'It helps the development team implement the test faster',
              ],
              correct: 1,
              explanation:
                'Requiring a psychological rationale (e.g., "specificity builds credibility," "urgency reduces procrastination") forces hypotheses based on why a change might move behaviour. Without this, AI generates superficial variations (change "Submit" to "Get Started") without strategic grounding. Hypotheses with clear behavioural rationale are both more likely to produce significant results and more informative when they lose.',
            },
            {
              question: 'An A/B test shows no statistically significant difference between control and variant. What is the most useful next step?',
              options: [
                'Abandon A/B testing for this page — it clearly doesn\'t work',
                'Declare the control the winner and move on',
                'Ask AI what the null result teaches about your audience, and use this to generate a different category of hypothesis',
                'Run the same test again with a larger sample size',
              ],
              correct: 2,
              explanation:
                'A null result (no significant difference) is informative — it tells you that the variable you changed didn\'t matter to your audience. This is learning. Asking AI to interpret a null result and suggest a genuinely different hypothesis category (changing the value proposition instead of the headline, for example) keeps the testing program moving forward productively.',
            },
            {
              question: 'What distinguishes a high-quality A/B test hypothesis from a low-quality one?',
              options: [
                'High-quality hypotheses always test visual elements like colour and font',
                'High-quality hypotheses test small, easy-to-implement changes',
                'High-quality hypotheses specify what changes, why it should affect behaviour, and what result proves the hypothesis correct',
                'High-quality hypotheses are generated by experienced marketers without AI assistance',
              ],
              correct: 2,
              explanation:
                'A complete hypothesis has three parts: (1) the specific change, (2) the mechanism — why this should affect behaviour based on a principle like social proof or specificity, and (3) the success criterion — what metric improvement and at what significance level constitutes confirmation. Hypotheses missing any of these components are incomplete and harder to learn from.',
            },
          ],
        },
      ],
    },
    {
      id: 'marketing-m4',
      title: 'Personalisation & Automation',
      description:
        'Scale personalised marketing without scaling headcount. Learn how AI enables email personalisation, content calendars, and dynamic content at a level previously requiring large teams.',
      lessons: [
        {
          id: 'marketing-m4-l1',
          title: 'Email Personalisation at Scale',
          duration: 18,
          description:
            'Move beyond first-name personalisation to genuinely relevant email experiences. Learn how to use AI to generate personalised content variations, subject line testing, and segment-specific messaging.',
          content: `## Beyond "Hi [First Name]"

First-name personalisation is table stakes in 2024. Genuine personalisation addresses the recipient's specific situation, industry, challenge, or behaviour. The gap between "Hi Sarah" and "Hi Sarah — we noticed you've been looking at our enterprise plan" is enormous. AI helps bridge that gap at scale.

## Segment-Based Content Variation

The most achievable personalisation for most teams is segment-based: different content for different audience segments, not individual-level personalisation.

**The workflow:**
1. Identify 3-5 meaningful audience segments (e.g., by industry, company size, product usage, lifecycle stage)
2. Write one "master" email template
3. Ask AI to generate segment-specific variations:

> "Here is a master email template for our monthly newsletter. Generate five variations for these audience segments: [list segments]. For each variation, adapt the opening example and value statement to be directly relevant to that segment. Keep structure and CTA identical."

## The Subject Line Matrix

Subject lines are the highest-leverage element to personalise. A segment-appropriate subject line can increase open rates by 15-25%.

> "Generate 5 subject lines for each of these 4 audience segments: [segments]. For each segment, the subject line should reference a challenge specific to their role or industry. Total: 20 subject lines in a table format with columns: Segment, Subject Line, Psychological Hook."

## Behavioural Trigger Emails

When you have behavioural data (someone viewed a pricing page, downloaded a guide, attended a webinar), the most powerful personalisation refers to that behaviour:

> "Write a follow-up email for a prospect who attended our webinar on [topic] but has not yet booked a demo. They work in [industry]. Acknowledge the webinar topic, connect it to their likely challenge, and offer a low-friction next step."`,
          keyTakeaways: [
            'Segment-based personalisation (3-5 segments) is achievable for most teams and significantly outperforms one-size-fits-all email',
            'Subject lines are the highest-leverage personalisation element — test segment-specific subject lines before personalising body content',
            'Behavioural trigger emails (responding to a specific action) convert better than any time-based campaign',
            'The "master template + AI variations" workflow keeps brand consistency while enabling segment relevance',
            'Always track open rate and click rate by segment to learn which personalisation approach drives the most lift',
          ],
          exercise: {
            title: 'Create Segment Variations for an Email Campaign',
            description:
              'Take an existing email campaign and use AI to produce segment-specific variations for three audience types.',
            steps: [
              'Choose a recent email or newsletter — paste the full text into ChatGPT',
              'Define three distinct audience segments you\'d like to reach with variations of this email',
              'Prompt: "Generate variations of this email for each of these three segments. Adapt the opening example and main value statement to be directly relevant to each segment. Keep the CTA and overall structure identical."',
              'For each variation, also ask for three subject line options that reference a segment-specific challenge',
              'Compare the variations — note which changes made the biggest difference in relevance and mark the approach for future campaigns',
            ],
            tool: 'ChatGPT',
          },
          quiz: [
            {
              question: 'What is the most impactful element to personalise in an email campaign?',
              options: [
                'The sender name',
                'The font and colour scheme',
                'The subject line, as it directly determines whether the email gets opened',
                'The email footer and unsubscribe link',
              ],
              correct: 2,
              explanation:
                'The subject line is the single highest-leverage personalisation element because it determines open rate — and an email that isn\'t opened has zero impact. Segment-appropriate subject lines that reference a challenge specific to the recipient\'s role or industry can increase open rates by 15-25% compared to generic subject lines.',
            },
            {
              question: 'What is "segment-based personalisation" and why is it practical for most marketing teams?',
              options: [
                'Creating a unique email for every individual recipient — it\'s automated so it\'s easy',
                'Creating 3-5 content variations for defined audience segments — achievable without technical personalisation infrastructure',
                'Personalising only the sender name and email address',
                'Using purchase history to recommend specific products',
              ],
              correct: 1,
              explanation:
                'Individual-level personalisation requires sophisticated CRM and automation infrastructure. Segment-based personalisation — creating 3-5 variations of an email for defined audience groups — delivers most of the relevance benefit with a fraction of the complexity. AI makes generating these variations fast enough to be practical for small marketing teams.',
            },
            {
              question: 'A prospect viewed your enterprise pricing page twice but hasn\'t booked a demo. What type of email is most likely to convert them?',
              options: [
                'A standard monthly newsletter',
                'A re-engagement email asking if they\'re still interested in your product',
                'A behavioural trigger email acknowledging their pricing page visits and addressing common enterprise concerns',
                'A promotional email with a time-limited discount',
              ],
              correct: 2,
              explanation:
                'Behavioural trigger emails that reference a specific, known action consistently outperform time-based campaigns because they\'re relevant to what the prospect is actually doing. Referencing the pricing page visit signals that you understand they\'re evaluating, and a targeted message addressing common enterprise buying considerations (security, ROI, implementation) directly addresses their decision-stage needs.',
            },
          ],
        },
        {
          id: 'marketing-m4-l2',
          title: 'Building a Content Calendar with AI',
          duration: 17,
          description:
            'Stop scrambling for content ideas at the last minute. Build a structured 90-day content calendar using AI that aligns with business objectives, seasonal moments, and audience interests.',
          content: `## The Content Calendar Problem

Most content calendars are either too vague ("publish 3x per week on LinkedIn") or too rigid (every slot planned 6 months out). The practical goal is a 90-day rolling calendar that has enough structure to execute and enough flexibility to respond to market moments.

## Building the Calendar Framework

**Step 1: Define your content pillars.** Ask AI to help:
> "I'm a [role] at a [company type]. Our target audience is [segment]. Suggest 4-5 content pillar themes that would be consistently valuable to this audience and align with our product category of [category]. For each pillar, give 3 example post topics."

**Step 2: Map to your business rhythm.**
What campaigns, product launches, events, and seasonal moments do you have in the next 90 days? Add these to your framework before filling in regular content.

**Step 3: Fill the calendar.**
> "Create a 90-day content calendar for LinkedIn, starting [date]. Use these 4 content pillars: [list pillars]. Include these fixed moments: [list launches, events]. Post frequency: 3x per week. For each slot, provide: date, pillar, post topic (specific enough to write from immediately), and content format (tips, question, case study angle, data point, etc.)"

## The Topic-to-Draft Pipeline

Once you have a calendar, generate drafts in batches:
> "Here are 10 post topics from my content calendar. For each, write a 200-word LinkedIn post draft. I'll edit and schedule them in batches."

Working in batches — generating 10 drafts at once, editing them in a session, scheduling them — is dramatically more efficient than writing one post per day.

## Staying Relevant Without Breaking the Calendar

Leave 20-30% of your calendar slots as "reactive" — unfilled placeholders for timely content that responds to industry news, competitor moves, or trending conversations. AI can help you fill these quickly when the moment arrives.`,
          keyTakeaways: [
            'A 90-day rolling calendar with content pillars provides structure without losing flexibility for reactive moments',
            'Content pillars (4-5 themes) give every post strategic purpose — AI can help define pillars aligned with audience and product',
            'Batch generation (10 drafts at once) and batch scheduling is dramatically more efficient than daily post writing',
            'Reserve 20-30% of calendar slots as reactive placeholders for timely, relevant content',
            'The topic-to-draft pipeline (calendar → batch prompt → batch edit → schedule) is the operating model to build',
          ],
          exercise: {
            title: 'Build a 30-Day Content Calendar',
            description:
              'Create a structured 30-day content calendar using the pillar framework and batch generation approach.',
            steps: [
              'Prompt Claude or ChatGPT to suggest 4 content pillars for your audience and business, with 3 example topics each',
              'Choose your 4 pillars and add 3-5 fixed moments (product news, events, campaigns) for the next 30 days',
              'Prompt: "Create a 30-day LinkedIn calendar posting 3x per week using these 4 pillars and fixed dates. For each slot: date, pillar, specific post topic, and recommended format."',
              'Take the first 6 post topics and run a batch draft prompt: "Write 200-word LinkedIn post drafts for each of these 6 topics. Maintain consistent voice throughout."',
              'Edit and schedule the batch — note how long the batch approach took vs. your normal per-post process',
            ],
            tool: 'Claude',
          },
          quiz: [
            {
              question: 'What is a "content pillar" and why is it the foundation of a content calendar?',
              options: [
                'A platform where you publish content, like LinkedIn or a blog',
                'A recurring theme or topic category that gives every post strategic purpose and coherence',
                'The main piece of long-form content from which all other content is repurposed',
                'A metric used to measure content performance',
              ],
              correct: 1,
              explanation:
                'Content pillars are 4-5 recurring theme categories (e.g., "customer success stories," "industry insights," "product education," "team culture") that ensure every post serves a strategic purpose and that your content mix is balanced. Without pillars, content calendars become arbitrary — you publish what seems interesting that week rather than building consistent authority in defined areas.',
            },
            {
              question: 'Why is batch generation and batch scheduling more efficient than writing one post per day?',
              options: [
                'It isn\'t — daily writing keeps content fresher and more reactive',
                'It eliminates context-switching, allows thematic coherence across posts, and compresses AI prompting and editing into focused work sessions',
                'AI tools work faster in batch mode than single-post mode',
                'Scheduling platforms require batch uploads',
              ],
              correct: 1,
              explanation:
                'Daily writing creates constant context-switching overhead — stopping your main work to brainstorm, draft, edit, and schedule one post. Batching — generating 10 post topics, then 10 drafts, then editing all 10 in one session — is significantly more efficient. It also produces more thematically consistent content because you\'re thinking about the full week or month, not just today.',
            },
            {
              question: 'What percentage of content calendar slots should be left as "reactive" placeholders?',
              options: [
                '0% — all slots should be planned in advance for maximum efficiency',
                '20-30% — providing flexibility for timely content without abandoning the plan',
                '50% — equal balance between planned and reactive content',
                '80% — only the biggest campaigns should be planned in advance',
              ],
              correct: 1,
              explanation:
                'A fully pre-planned calendar prevents you from responding to industry news, viral conversations, competitor moves, or timely moments that make content highly relevant. Leaving 20-30% of slots as flexible placeholders — "topical post TBD" — gives you structure without rigidity. AI can help you fill these quickly when a relevant moment emerges.',
            },
          ],
        },
        {
          id: 'marketing-m4-l3',
          title: 'Social Media Automation Strategy',
          duration: 16,
          description:
            'Design a sustainable social media system where AI handles generation and you handle strategy and judgment. Avoid the common traps that make AI-assisted social media feel inauthentic.',
          content: `## The Authenticity Problem

The most common failure in AI-assisted social media is content that feels manufactured: technically correct, grammatically polished, emotionally empty. Your followers can sense it. The solution isn't to avoid AI — it's to maintain your authentic voice as the final layer.

## The Human-AI Division of Labour

**AI handles:** First drafts, format variations, caption options, hashtag research, repurposing long-form into posts, generating response templates

**You handle:** Final editing, deciding what topics are worth posting about, adding personal experience or opinion, timing decisions, engagement responses (never automate replies)

The rule: AI produces the 80%, you add the 20% that makes it distinctly human.

## Platform-Specific Prompting

Each platform has different conventions. Be specific:

**LinkedIn:** "Write a 250-word LinkedIn post in first person. Open with a counter-intuitive observation. Use short paragraphs (max 2 sentences each). End with a question that invites comments. No hashtags in the post body."

**Instagram:** "Write a 150-word Instagram caption. First sentence must hook immediately. Use line breaks for readability. Include a CTA to click the link in bio. Suggest 10 niche hashtags separately."

**Twitter/X:** "Write a 5-tweet thread on [topic]. First tweet must stand alone as a complete thought and hook. Subsequent tweets add depth. Final tweet includes CTA."

## The Reactive Content System

When industry news breaks, use this prompt:

> "Here is a news article about [topic]. This affects my audience of [describe audience]. Write a LinkedIn post sharing my perspective on this news. My angle: [your genuine view in one sentence]. Keep it under 200 words."

Your angle is the critical input — AI provides the words, you provide the perspective.

## What to Never Automate

- Replies to comments and DMs (feels robotic, violates platform community standards)
- Crisis communications (requires real human judgment)
- Sensitive topics (political, cultural, controversial industry issues)`,
          keyTakeaways: [
            'The human-AI division: AI drafts, you decide what to say, add personal perspective, and handle all engagement',
            'Platform-specific prompting (LinkedIn, Instagram, Twitter conventions) produces far better output than generic "write a social post"',
            'Never automate replies or engagement — your audience can tell, and it damages trust',
            'Reactive content (responding to industry news) is high-performing: your genuine angle + AI\'s execution speed',
            'The 20% human layer (personal opinion, real experience, authentic judgment) is what makes AI-assisted content feel real',
          ],
          exercise: {
            title: 'Build a Week of Platform-Specific Content',
            description:
              'Generate a week\'s worth of social content across two platforms using platform-specific prompting, then edit for authentic voice.',
            steps: [
              'Choose two platforms: LinkedIn and one other (Instagram, Twitter, or Facebook)',
              'Select 3 post topics from your content calendar (or create three relevant topics)',
              'For each topic, write a platform-specific prompt using the conventions for each platform (LinkedIn format vs. Instagram format)',
              'Run all 6 prompts (3 topics × 2 platforms) in one session',
              'Edit each post: read aloud and add at least one sentence that only you could write — a personal opinion, a specific example from your experience, or a nuanced observation. These are your 20%.',
            ],
            tool: 'ChatGPT',
          },
          quiz: [
            {
              question: 'Which social media task should NEVER be automated with AI?',
              options: [
                'Generating first draft post captions',
                'Repurposing a blog post into platform-specific formats',
                'Replying to comments and direct messages from followers',
                'Creating hashtag suggestions for Instagram posts',
              ],
              correct: 2,
              explanation:
                'Automated replies and DM responses feel robotic to recipients and violate the community spirit of social platforms. Followers who comment or message are seeking human connection. Automated responses — even well-crafted ones — erode trust when discovered and often violate platform terms of service. This is the category where human presence is non-negotiable.',
            },
            {
              question: 'What makes reactive content (responding to industry news) high-performing on social media?',
              options: [
                'It\'s easier to write because the topic is already chosen',
                'It combines timeliness (when a topic is trending) with your genuine perspective, creating relevant and credible content',
                'Algorithms always boost news-related content',
                'It requires less editing than planned content',
              ],
              correct: 1,
              explanation:
                'Reactive content performs well because it\'s timely (people are already discussing the topic) and credible (you\'re adding a real professional perspective to an ongoing conversation). The combination of AI speed (draft in 60 seconds) and your genuine angle (what you actually think about this news) is uniquely powerful — and difficult for competitors to replicate at the same speed.',
            },
            {
              question: 'What is the most important "human 20%" to add to every AI-generated social post?',
              options: [
                'Grammar corrections and punctuation fixes',
                'More hashtags to increase reach',
                'A piece of personal experience, opinion, or nuanced observation that only you could authentically write',
                'A promotional call-to-action for your product',
              ],
              correct: 2,
              explanation:
                'The "human 20%" isn\'t about correcting errors — it\'s about adding authentic signal that distinguishes your content from generic AI output. A specific example from your experience, an opinion you genuinely hold, or a nuanced observation that required real expertise: these elements make content feel human because they ARE human. This is the difference between content that gets reshared and content that gets scrolled past.',
            },
          ],
        },
        {
          id: 'marketing-m4-l4',
          title: 'Dynamic Content and Lead Nurture at Scale',
          duration: 19,
          description:
            'Design multi-stage nurture sequences and dynamic content strategies that feel personal to each recipient. You\'ll build the prompts and frameworks your team can use repeatedly.',
          content: `## The Nurture Sequence Problem

Most nurture sequences are either too short (3 emails then silence) or too generic (same content regardless of what the prospect did). AI enables you to design richer, more responsive sequences without proportionally more work.

## Designing a Nurture Sequence with AI

Start with the architecture before writing a word:

> "Design the architecture for a 6-email nurture sequence for a prospect who downloaded our guide on [topic]. They work in [industry] at a [company size] company. Our product is [X]. The sequence goal is to book a discovery call within 21 days. For each email, specify: send day, subject line angle, email purpose (educate/challenge/social proof/urgency), and the specific call to action."

Get the architecture right first. Then generate each email individually with the specific context of its purpose.

## The Branch Logic Framework

High-performing nurture sequences branch based on behaviour. You don't need complex automation to apply this logic — you need clear rules.

> "Create a branch logic for a 4-email sequence. If the prospect opens Email 1 and clicks the CTA: send Sequence B (more advanced content). If they open but don't click: send Sequence C (objection-handling content). If they don't open: resend with a different subject line, then exit. Write Email 1 and the opening email for both Sequences B and C."

## Dynamic Content Blocks

For email platforms that support dynamic content:

> "Write five variations of the opening paragraph for this email, each speaking to a different industry: technology, financial services, healthcare, retail, and manufacturing. Each variation should reference a challenge specific to that industry without changing the overall email structure."

These five variations, swapped in dynamically based on the contact's industry tag, turn one email into five relevant messages.

## Measuring Nurture Effectiveness

Always define your success metrics before you launch:
- Open rate per email (target: above your list average)
- Click rate on primary CTA
- Sequence completion rate (reached Email 6)
- Conversion rate (booked a call or took desired action)

Ask AI to help interpret underperforming metrics: "My Email 3 open rate dropped 40% from Email 2. What are the most likely causes and what should I test?"`,
          keyTakeaways: [
            'Design sequence architecture (purpose, CTA, timing per email) before writing any copy — AI helps you plan the full arc',
            'Branch logic (if open + click → path A; if open, no click → path B) dramatically improves sequence relevance',
            'Dynamic content blocks (5 industry-specific opening paragraphs) turn one email into multiple relevant experiences',
            'Define conversion metrics before launch — open rate, click rate, completion rate, conversion rate',
            'Use AI to interpret underperforming emails by describing the metrics drop and asking for likely causes',
          ],
          exercise: {
            title: 'Design a 4-Email Nurture Sequence Architecture',
            description:
              'Build the complete architecture and first three emails for a nurture sequence targeting a real prospect segment.',
            steps: [
              'Choose a lead magnet (guide, webinar, trial) and the prospect profile who typically downloads or attends it',
              'Run the architecture prompt: ask for a 4-email sequence with send day, subject angle, email purpose, and CTA for each',
              'Generate Email 1 in full, including subject line, body, and CTA',
              'Generate one branch: "If the prospect clicks the CTA in Email 1, what should Email 2 look like? Write it." Then: "If they don\'t click, write an alternative Email 2 focused on overcoming hesitation."',
              'Add your industry-specific dynamic opening paragraph for your top three industries',
            ],
            tool: 'Claude',
          },
          quiz: [
            {
              question: 'Why should you design the sequence architecture before writing any email copy?',
              options: [
                'It\'s an industry best practice with no practical benefit',
                'It ensures each email has a distinct purpose and the sequence as a whole has a logical arc toward conversion',
                'Email platforms require architecture documents before allowing campaigns',
                'Writing architecture is faster than writing copy',
              ],
              correct: 1,
              explanation:
                'Without a planned architecture, sequences become repetitive — each email saying roughly the same thing in a different way. Defining each email\'s specific purpose (educate → challenge → social proof → urgency) before writing ensures progression. A prospect who receives a well-architected sequence should feel like each email builds meaningfully on the last.',
            },
            {
              question: 'What is the primary benefit of branch logic in a nurture sequence?',
              options: [
                'It reduces the number of emails you need to write',
                'It ensures prospects receive content relevant to their actual engagement behaviour, not just their download date',
                'It automates the entire sales process without human involvement',
                'It improves email deliverability scores',
              ],
              correct: 1,
              explanation:
                'Branch logic sends different content based on what a prospect actually does — click, open-but-not-click, or ignore. A prospect who clicked the CTA in Email 1 is clearly more engaged than one who didn\'t open it. Sending them identical Email 2 is a missed opportunity. Branch logic matches content sophistication and intensity to demonstrated interest level.',
            },
            {
              question: 'Open rate drops 40% between Email 2 and Email 3 in a nurture sequence. What is the most useful prompt to diagnose this?',
              options: [
                '"Write a better Email 3"',
                '"My Email 3 open rate dropped 40% from Email 2. What are the most likely causes and what should I test to understand which cause is correct?"',
                '"Is my email marketing broken?"',
                '"Should I delete Email 3 from the sequence?"',
              ],
              correct: 1,
              explanation:
                'A diagnostic prompt that describes the specific symptom and asks for causes produces useful analysis. Common causes of sequence open rate drops include: subject line fatigue (similar angle to previous emails), send timing (Email 3 arrives on a weekend), list fatigue (too many emails too fast), or content mismatch (Email 3 topic doesn\'t follow logically from Email 2). A well-framed diagnostic question gets you testable hypotheses rather than a rewrite.',
            },
          ],
        },
      ],
    },
    {
      id: 'marketing-m5',
      title: 'Reporting & Strategy',
      description:
        'Turn data into decisions faster. Use AI for performance analysis, executive reporting, forecasting, and building an AI-first marketing strategy that scales.',
      lessons: [
        {
          id: 'marketing-m5-l1',
          title: 'Performance Analysis with AI',
          duration: 17,
          description:
            'Transform raw campaign data into clear insights and recommendations using AI. You\'ll learn the prompts that turn a spreadsheet of metrics into a strategy-shaping narrative.',
          content: `## The Data-to-Decision Gap

Most marketing teams have more data than they can use. The bottleneck isn't collection — it's analysis and synthesis. AI closes this gap by helping you move from raw metrics to narrative insight faster than any manual process.

## Preparing Data for AI Analysis

AI tools work best with structured, contextualised data. Before prompting:
1. Export your campaign metrics to a clean table (CSV or pasted into the prompt)
2. Include column headers and the metric definitions (e.g., "CTR = clicks / impressions")
3. Add context: "This is a 30-day email campaign targeting [segment]. Industry benchmark open rate is 22%."

## The Analysis Prompt Framework

> "Here is campaign performance data for [period]. Industry benchmarks: [list benchmarks]. Our targets were: [list targets]. Analyse this data and provide: (1) three key insights about what worked and what didn't, (2) the single most important factor explaining performance, (3) three specific recommendations for the next campaign cycle."

The "single most important factor" instruction prevents AI from producing a long list of equal-weight observations. Force prioritisation.

## Anomaly Detection

> "Review this weekly performance data across the last 12 weeks. Identify any anomalies — weeks where metrics diverged significantly from the trend — and suggest likely causes for each."

AI pattern recognition is particularly good at spotting deviations you might miss in a long table.

## Cohort Comparison

> "Compare the performance of campaigns in Q1 vs Q2. Identify what changed between the two periods and which specific changes correlate with performance improvement or decline."

This comparative analysis — which would take hours manually — takes minutes with AI.

## Communicating Uncertainty

AI-generated analysis should be treated as hypothesis-generation, not definitive conclusions. Always note: "these are patterns and likely explanations, not proven causes." Real causation requires controlled testing (A/B tests).`,
          keyTakeaways: [
            'Providing context (benchmarks, targets, segment) with your data dramatically improves the quality of AI analysis',
            'Always ask for the "single most important factor" — it forces prioritisation over an undifferentiated list of observations',
            'AI excels at anomaly detection across time-series data — patterns that humans miss in long tables',
            'AI analysis generates hypotheses, not proven causes — use A/B testing to confirm suspected causal relationships',
            'Comparative analysis (Q1 vs Q2, campaign A vs campaign B) is one of the highest-value AI analysis use cases',
          ],
          exercise: {
            title: 'Analyse Last Month\'s Campaign Data',
            description:
              'Run a structured AI analysis of a recent campaign and extract three actionable recommendations.',
            steps: [
              'Export last month\'s campaign performance data — choose email, social, or paid. Create a clean table with metric names in headers',
              'Find the industry benchmark for your primary metric (open rate, CTR, conversion rate) — note the source',
              'Paste the data table into Claude with context: campaign type, audience segment, campaign goal, and the benchmark you found',
              'Run the three-part analysis prompt: insights, single most important factor, three recommendations',
              'For each recommendation, write one sentence on how you\'d implement it in the next campaign — this turns analysis into action',
            ],
            tool: 'Claude',
          },
          quiz: [
            {
              question: 'What is the most important piece of context to include when asking AI to analyse campaign performance data?',
              options: [
                'The names of the team members who ran the campaign',
                'Industry benchmarks and your original campaign targets, so AI can assess performance against relevant comparisons',
                'The budget spent on the campaign',
                'The dates the campaign ran',
              ],
              correct: 1,
              explanation:
                'Raw numbers mean nothing without context. A 25% open rate is excellent in some industries and poor in others. An AI analysing data without benchmarks will produce vague assessments. Providing benchmarks and your specific targets allows AI to assess whether performance was good, bad, or mixed — and to identify where the biggest gaps lie.',
            },
            {
              question: 'Why should you ask for the "single most important factor" rather than "all factors" in a performance analysis?',
              options: [
                'AI can only identify one factor at a time',
                'It forces prioritisation and produces a more actionable recommendation than an undifferentiated list',
                'Multiple factors confuse AI analysis',
                'It reduces the length of the AI response for easier reading',
              ],
              correct: 1,
              explanation:
                'Without this constraint, AI produces comprehensive lists where ten factors are presented as equally important. This is rarely actionable — you can\'t fix ten things at once. Asking for the single most important factor forces the model to weigh and prioritise, producing the kind of focused recommendation that actually drives next campaign improvements.',
            },
            {
              question: 'How should you treat AI-generated campaign analysis conclusions?',
              options: [
                'As definitive findings — AI analysis is objective and reliable',
                'As worthless — only data scientists should conduct marketing analysis',
                'As hypothesis-generating insights that should be confirmed through controlled testing',
                'As suitable for direct inclusion in board reports without review',
              ],
              correct: 2,
              explanation:
                'AI analysis identifies patterns and plausible explanations, but correlation is not causation. An AI might correctly identify that Monday-sent emails had 30% higher open rates, but the cause could be audience behaviour, email content, or competitive email volume on other days. Treating AI analysis as hypothesis-generation — then designing A/B tests to confirm — is the correct epistemological approach.',
            },
          ],
        },
        {
          id: 'marketing-m5-l2',
          title: 'Writing Executive Marketing Reports',
          duration: 16,
          description:
            'Produce clear, credible executive marketing reports in half the time. Learn the AI-assisted workflow that transforms data and bullet points into compelling narrative for leadership audiences.',
          content: `## What Executives Actually Need

Executive marketing reports fail for one of three reasons: too much data, too little narrative, or recommendations that don't connect to business outcomes. AI helps on all three dimensions, but only if you're clear about the executive audience's actual needs.

## The Executive Report Framework

**Section 1: Performance headline.** One paragraph. What was the period's performance in business terms (revenue influenced, pipeline generated, audience reached), not marketing metrics (impressions, clicks)?

**Section 2: Three key findings.** Specific, evidence-based, stated as conclusions not observations. "Q2 email campaigns outperformed Q1 by 34% in pipeline generated, driven primarily by improved subject line testing across the enterprise segment" — not "email open rates were higher."

**Section 3: What we learned.** One insight that has strategic implications for how the team operates.

**Section 4: Recommendations.** Two or three specific, resource-tied recommendations for Q3.

## Using AI for Each Section

**For Section 1:**
> "Rewrite these marketing metrics as a business performance paragraph for a CMO audience. Frame everything in terms of revenue influenced, pipeline generated, or audience reached. Avoid marketing jargon. Metrics: [paste data]"

**For Sections 2-3:**
> "From these campaign results and the analysis above, write three key findings in the format: '[Specific result] driven by [specific cause], which tells us [strategic implication].'"

**For Section 4:**
> "Based on these findings, write two specific Q3 recommendations. Each recommendation should include: what to do, why (connecting to the findings), and what resource or investment it requires."

## The Credibility Checks

Before sharing any AI-drafted executive content:
- Verify every number
- Ensure every claim connects to evidence in your data
- Have one colleague read it aloud and flag anything that sounds hollow or unsubstantiated`,
          keyTakeaways: [
            'Frame all performance in business terms (revenue, pipeline) rather than marketing metrics (impressions, clicks) for executive audiences',
            'State findings as conclusions with causation, not observations — "email outperformed because..." not "email metrics were high"',
            'The four-section structure (headline, findings, learning, recommendations) covers everything an executive needs',
            'Recommendations must include what to do, why (connecting to findings), and what it requires — without this, they\'re suggestions not plans',
            'Always verify numbers and have a colleague read for hollow claims before sending AI-drafted executive content',
          ],
          exercise: {
            title: 'Draft an Executive Summary for Last Quarter',
            description:
              'Use the four-section framework and AI to produce an executive marketing summary for your last quarter\'s activity.',
            steps: [
              'Gather the key data from last quarter: top-line metrics, any A/B test results, campaign highlights, and notable underperformance',
              'Run the business-translation prompt: rewrite your metrics as a one-paragraph business performance headline for a CEO audience',
              'Run the findings prompt: three findings in the "specific result driven by specific cause" format',
              'Run the recommendations prompt: two Q3 recommendations with what, why, and resource requirement',
              'Assemble all four sections, then do the credibility checks: verify every number, read aloud for hollow language, have one colleague review',
            ],
            tool: 'Claude',
          },
          quiz: [
            {
              question: 'Why should executive marketing reports frame performance in business terms rather than marketing metrics?',
              options: [
                'Executives don\'t understand marketing metrics',
                'Business terms (revenue, pipeline) connect marketing activity to what executives are accountable for and care about',
                'Marketing metrics are confidential and shouldn\'t be shared at executive level',
                'It makes the report shorter',
              ],
              correct: 1,
              explanation:
                'Executives are accountable for revenue, growth, and competitive position — not impressions or click-through rates. When marketing reports are written in marketing language, executives have to translate to understand the business impact. Presenting in business terms (revenue influenced, pipeline generated, market share impact) removes that translation step and makes marketing\'s contribution visible and credible.',
            },
            {
              question: 'Which statement is a finding (suitable for an executive report) rather than an observation?',
              options: [
                '"Email open rates increased in Q2"',
                '"We sent more emails in Q2 than Q1"',
                '"Q2 email campaigns generated 34% more pipeline than Q1, driven by improved subject line testing in the enterprise segment, suggesting this approach should be expanded in Q3"',
                '"Email is one of our highest-performing channels"',
              ],
              correct: 2,
              explanation:
                'A finding states what happened, why it happened, and what it means. The third option includes all three: the result (34% more pipeline), the cause (subject line testing in enterprise segment), and the strategic implication (expand this approach). Options 1, 2, and 4 are observations — they describe what occurred without explaining significance, causation, or recommendation.',
            },
            {
              question: 'What three elements must a recommendation in an executive marketing report include?',
              options: [
                'The team member responsible, the deadline, and the budget code',
                'What to do, why (connecting to the findings), and what resource or investment it requires',
                'The marketing channel, the target audience, and the expected ROI',
                'The campaign name, the creative concept, and the distribution plan',
              ],
              correct: 1,
              explanation:
                'An executive recommendation that lacks rationale or resource requirement is not actionable — it\'s a suggestion. "What to do" specifies the action; "why" grounds it in evidence from the findings (making it credible, not arbitrary); and "what it requires" enables the executive to make a resource decision. All three are necessary for the recommendation to move from the report into action.',
            },
          ],
        },
        {
          id: 'marketing-m5-l3',
          title: 'Forecasting and Planning with AI',
          duration: 18,
          description:
            'Build more robust marketing forecasts and plans using AI for scenario planning, assumption testing, and sensitivity analysis. No advanced statistics required.',
          content: `## Why Marketing Forecasts Are Notoriously Unreliable

Marketing forecasts fail because they are usually point estimates ("we'll generate 500 leads") presented as certainties. Real forecasting requires ranges, explicit assumptions, and scenario analysis. AI makes building this kind of robust forecast accessible without needing a data science background.

## The Assumption Extraction Technique

Before building any forecast, surface your assumptions:

> "I'm building a Q3 marketing forecast. My forecast states we'll generate 400 qualified leads. What are the key assumptions this forecast depends on? List each assumption explicitly and rate the confidence level (high/medium/low) for each."

AI will surface assumptions you made implicitly — and identifying low-confidence assumptions tells you exactly where your forecast risk lies.

## Scenario Planning with AI

Don't build one forecast — build three:

> "Based on these inputs [list your key metrics: CAC, conversion rates, budget, channel mix], build three scenarios for Q3 lead generation: (1) Base case: trends continue as in H1. (2) Upside case: what if our new LinkedIn campaign performs at the top quartile for our industry? (3) Downside case: what if our primary channel underperforms by 30%? Show me the lead generation and pipeline impact of each scenario."

Presenting three scenarios to leadership is more credible than one forecast and demonstrates planning sophistication.

## Sensitivity Analysis Made Simple

> "Which of these three variables has the biggest impact on our pipeline forecast: [variable 1], [variable 2], or [variable 3]? Show me what happens to the forecast if each changes by +/- 20%."

Identifying which variable drives forecast variance most tells you where to focus monitoring and optimisation.

## What AI Cannot Do

AI cannot predict the future. It can help you think more rigorously about the range of likely outcomes and the assumptions that drive them. The final judgment about which scenario is most likely and what plans to make is yours.`,
          keyTakeaways: [
            'Point forecasts ("we\'ll generate 400 leads") are misleading — three-scenario planning (base/upside/downside) is more honest and credible',
            'Surfacing implicit assumptions before building a forecast reveals where risk lives',
            'Sensitivity analysis (which variable drives the forecast most?) tells you what to monitor most closely',
            'Presenting three scenarios to leadership demonstrates sophistication and builds credibility',
            'AI helps structure rigorous forecasting thinking — final judgment on which scenario is most likely remains with you',
          ],
          exercise: {
            title: 'Build a Three-Scenario Q3 Marketing Forecast',
            description:
              'Create a credible, assumption-based three-scenario forecast for your most important marketing metric.',
            steps: [
              'Identify your primary Q3 marketing metric (leads, pipeline, revenue influenced, or audience growth)',
              'Run the assumption extraction prompt: what assumptions does your current forecast depend on? List each with confidence level',
              'Run the three-scenario prompt: base, upside (+20% on your primary driver), and downside (-25% on your primary driver)',
              'Run the sensitivity analysis prompt: which of your top 3 variables drives forecast variance most?',
              'Summarise the three scenarios and your assessment of which is most likely and why — this becomes your forecast narrative for leadership',
            ],
            tool: 'Claude',
          },
          quiz: [
            {
              question: 'Why is three-scenario planning more credible than a single point forecast for executive audiences?',
              options: [
                'It takes longer to prepare and therefore appears more thorough',
                'It honestly acknowledges uncertainty and shows you\'ve stress-tested your assumptions, which is more intellectually honest than false precision',
                'Executives prefer having three numbers to choose from',
                'Single point forecasts are not allowed in regulated industries',
              ],
              correct: 1,
              explanation:
                'Single point forecasts present one number as if the future is knowable. Experienced executives know forecasts are uncertain and find false precision less credible, not more. Three scenarios acknowledge uncertainty explicitly, show that you\'ve considered the range of likely outcomes, and demonstrate the planning sophistication that turns forecasting from a budgeting exercise into strategic decision support.',
            },
            {
              question: 'What does sensitivity analysis tell you in the context of a marketing forecast?',
              options: [
                'How sensitive your audience is to your messaging',
                'Which variable, if it changes, has the biggest impact on your forecast outcome',
                'How accurately your data has been collected',
                'Whether your forecast is too optimistic',
              ],
              correct: 1,
              explanation:
                'Sensitivity analysis identifies which input variable drives the most forecast variance. If a 20% change in lead-to-MQL conversion rate changes your pipeline forecast by 60%, but a 20% change in email open rate changes it by only 5%, you should be monitoring and optimising conversion rates far more than email open rates. Sensitivity analysis tells you where to focus operational attention.',
            },
            {
              question: 'What is the role of AI in marketing forecasting?',
              options: [
                'AI can accurately predict future marketing performance based on historical data',
                'AI helps structure rigorous thinking — surfacing assumptions, building scenarios, and calculating variable impacts — but cannot predict the future',
                'AI should replace the finance team\'s involvement in marketing forecasting',
                'AI is not useful for forecasting and should only be used for content creation',
              ],
              correct: 1,
              explanation:
                'AI is a thinking partner for forecasting, not an oracle. It excels at structured tasks: surfacing implicit assumptions, building consistent scenario models, and running sensitivity calculations. But market conditions, competitive dynamics, and the future are inherently uncertain — no AI can reliably predict them. Your judgment about which scenario is most likely and why remains the irreplaceable human contribution.',
            },
          ],
        },
        {
          id: 'marketing-m5-l4',
          title: 'Building an AI-First Marketing Strategy',
          duration: 19,
          description:
            'Synthesise everything you\'ve learned into a coherent AI marketing strategy for your team. This lesson covers how to audit your current workflow, identify the highest-leverage AI opportunities, and build the habits that compound over time.',
          content: `## From Individual Tactics to Team Strategy

Using AI for individual tasks is valuable. Building a team-wide AI strategy is transformational. The difference is the difference between one person running faster and an entire team changing how it operates.

## The Workflow Audit

Start by mapping your team's existing marketing workflow:

> "Here is a description of how our marketing team currently operates: [describe your weekly/monthly workflow in 200 words]. Identify the five highest-leverage opportunities for AI to increase output quality, speed, or both. For each, specify the AI tool to use, the specific task, and the estimated time saving per week."

This gives you a prioritised roadmap based on your actual operations, not generic AI advice.

## The AI Maturity Framework

**Level 1: Individual tools.** One person uses AI for their own tasks. No shared prompts, no team protocols, no consistent approach.

**Level 2: Shared assets.** The team shares a prompt library, a brand context document, and common workflows. AI output consistency improves.

**Level 3: Process integration.** AI is built into standard processes: every campaign brief uses AI for concept generation, every executive report uses AI for drafting, every research project uses AI for synthesis.

**Level 4: Strategic advantage.** The team uses AI to do things competitors can't: faster testing cycles, deeper personalisation, more rigorous forecasting. AI becomes a genuine competitive differentiator.

Most teams are at Level 1. Level 2 is achievable in 30 days. Level 3 takes a quarter.

## Building Team Capability

The fastest way to level up your team:
- Weekly 15-minute "AI win" share: who produced something great this week? Share the prompt.
- Monthly prompt library audit: remove outdated prompts, promote the best new ones
- One team member owns AI for Marketing: curates tools, prompts, and experiments

## Measuring AI Impact

Track: time saved per week (self-reported), content output volume, content quality ratings (team-scored), and campaign performance trends. Make the value visible to keep investment justified.`,
          keyTakeaways: [
            'Team-wide AI strategy requires shared assets (prompt library, brand context document) and shared workflows — not just individual tool use',
            'The four maturity levels (Individual → Shared → Integrated → Strategic) provide a roadmap from current state to competitive advantage',
            'A weekly "AI win" share — who produced something great and what prompt did they use — is the fastest way to level up team capability',
            'Assign one team member as AI lead to curate tools, prompts, and experiments',
            'Measure AI impact explicitly: time saved, output volume, quality ratings, and performance trends to keep investment justified',
          ],
          exercise: {
            title: 'Conduct an AI Opportunity Audit for Your Team',
            description:
              'Identify the five highest-leverage AI opportunities specific to your team\'s workflow and build a 30-day implementation plan.',
            steps: [
              'Write a 200-word description of your team\'s current weekly marketing workflow (what you do, in what order, who does what)',
              'Run the workflow audit prompt in Claude: identify five highest-leverage AI opportunities with tool, task, and time saving estimate',
              'Assess your current maturity level (1-4) honestly and identify what specific change would move you to the next level',
              'Choose the single highest-leverage opportunity and write a one-page implementation plan: what changes, who owns it, and how you\'ll measure success',
              'Schedule a 30-day check-in to assess whether the change produced the expected impact and identify the next opportunity to tackle',
            ],
            tool: 'Claude',
          },
          quiz: [
            {
              question: 'What distinguishes an AI Level 3 marketing team from a Level 2 team?',
              options: [
                'Level 3 teams use more AI tools than Level 2 teams',
                'Level 3 teams have larger budgets for AI subscriptions',
                'Level 3 teams have integrated AI into standard processes so every campaign, report, and research project systematically uses AI',
                'Level 3 teams have a dedicated AI department separate from marketing',
              ],
              correct: 2,
              explanation:
                'Level 2 is about shared assets — prompt libraries, brand context documents, common prompts. Level 3 is about process integration — AI is embedded in how the team operates, not just available as an option. Every campaign brief includes an AI concept generation step. Every executive report goes through an AI drafting stage. This systematisation is what creates compounding value over time.',
            },
            {
              question: 'What is the most effective team habit for accelerating AI capability improvement?',
              options: [
                'Mandatory weekly AI training sessions for all team members',
                'A weekly 15-minute "AI win" share where team members share what worked and the prompt they used',
                'Purchasing access to all available AI tools',
                'Having each team member read AI industry news daily',
              ],
              correct: 1,
              explanation:
                'The "AI win" share works because it\'s low-friction (15 minutes), immediately practical (you get a prompt you can use this week), and creates social reinforcement for AI experimentation. It distributes learning across the team without requiring dedicated training infrastructure. Over 12 weeks, a team of five sharing two wins each has produced 120 prompt examples and techniques.',
            },
            {
              question: 'How should you measure the impact of AI on your marketing team?',
              options: [
                'Number of AI tools purchased and team members trained',
                'Time saved per week (self-reported), content output volume, quality ratings, and campaign performance trends',
                'The number of AI-generated posts published per month',
                'Customer satisfaction scores — the only metric that matters',
              ],
              correct: 1,
              explanation:
                'AI investment needs to demonstrate measurable value to remain justified. A multi-metric approach covers efficiency (time saved), output (volume), quality (team-scored ratings), and effectiveness (campaign performance). Self-reported time savings are imperfect but directionally reliable. Campaign performance trends connect AI investment to business outcomes — the language that matters most to leadership.',
            },
          ],
        },
      ],
    },
  ],
}
