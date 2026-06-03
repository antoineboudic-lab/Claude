import type { SubRoleLessons } from './types'

export const financeSubRoles: SubRoleLessons = {
  'fpa': {
    title: "AI for FP&A & Reporting",
    description: "Use AI to accelerate variance commentary, management reporting, and forecast cycles — so your FP&A team spends less time producing the pack and more time on analysis and strategic insight.",
    lessons: [
      {
        id: "finance-fpa-l1",
        title: "AI for FP&A Professionals: Where It Fits in the Finance Workflow",
        duration: 15,
        description: "Understand which parts of the FP&A cycle AI improves, which it doesn't, and how to start without creating data integrity or governance problems.",
        content: `## The FP&A Workflow AI Actually Fits

FP&A work divides into two types: **structured, analytical tasks** (building models, reconciling data, producing reports) and **interpretive, strategic tasks** (explaining variances, presenting to leadership, recommending decisions). AI is useful in specific parts of both — but its role is different in each.

## Where AI Adds Genuine Value

**Variance commentary.** Turning a table of actuals versus budget into written commentary is time-consuming and often done under time pressure. AI generates first-draft commentary in seconds from the numbers you provide. This is one of the highest-leverage AI use cases in FP&A.

**Report narrative.** Management accounts, board packs, and investor updates all need written narrative alongside the numbers. AI drafts this narrative from your input data and key messages.

**Scenario descriptions.** When you've modelled three reforecast scenarios, AI can write the narrative description of each — translating your model assumptions into clear prose for non-finance stakeholders.

**Summarising large documents.** Monthly management packs, analyst reports, and board packs contain a lot of text. AI summarises these quickly when you need to brief upwards fast.

## What AI Cannot Do in FP&A

- **Access your financial data.** AI has no connection to your ERP, FP&A platform, or data warehouse. You must extract and provide the data.
- **Build or audit your models.** AI cannot review an Excel model for formula errors or trace a variance back through your data.
- **Make forecasting judgements.** AI can describe scenarios you've modelled, but the assumptions that go into a forecast are a human and business decision.
- **Replace your commercial understanding.** Why a variance happened — whether it's a timing issue, a structural shift, or a one-off — requires your knowledge of the business.

## The Right Starting Point

Begin with variance commentary. It's the most time-consuming regular writing task in FP&A, the output is structured and predictable, and the risk of error is manageable if you verify the numbers you provide.

\`\`\`
Write management accounts variance commentary for the following data. Format: one paragraph per variance, professional finance tone, no jargon. For each variance: state the actual versus budget figure, the variance amount and percentage, and the business reason for the variance. Data: [paste your variance table]. Business context: [any relevant operational factors — e.g. "delayed project start", "one-off cost in June"].
\`\`\``,
        keyTakeaways: [
          "AI's highest-value FP&A use cases are variance commentary, report narrative, and scenario descriptions — not model building or data analysis",
          "AI has no access to your financial systems — you must extract and provide data; AI works on what you give it",
          "Start with variance commentary: it is the most time-consuming writing task in FP&A and the safest AI starting point",
          "Commercial judgement — why a variance happened and what it means — remains a human responsibility"
        ],
        exercise: {
          title: "First Variance Commentary with AI",
          description: "Use AI to generate variance commentary for a real set of actuals versus budget — then measure how much editing it needs.",
          steps: [
            "Extract a variance table from your most recent month-end close — actuals versus budget for 5–8 P&L lines",
            "For each variance, note the business reason in one sentence (e.g. 'project delayed to Q3', 'headcount underspend due to open roles')",
            "Open Claude and run the variance commentary prompt from the lesson with your data and business context",
            "Read the output carefully — verify that every number matches your source data exactly",
            "Track: how long the AI draft took, how many edits you made, and whether the output was usable as a starting point"
          ],
          tool: "Claude"
        },
        quiz: [
          {
            question: "What is the most important thing to check after AI generates variance commentary from your data?",
            options: [
              "Whether the writing style matches your company's reporting tone",
              "That every number in the commentary matches the source data you provided",
              "Whether the commentary is concise enough for the management pack",
              "That the commentary doesn't include any technical accounting terminology"
            ],
            correct: 1,
            explanation: "AI works from the data you provide — if you input an error, AI will comment on it confidently. Every number in AI-generated variance commentary must be verified against your source data before inclusion in any management report."
          },
          {
            question: "An FP&A analyst wants AI to explain why revenue came in below budget. What should they do?",
            options: [
              "Ask AI to analyse the revenue data and identify the cause",
              "Provide the commercial context themselves — AI can write the explanation, but the analyst must know the business reason",
              "Connect AI to their CRM to extract the revenue data",
              "Ask the sales team to provide their analysis to AI directly"
            ],
            correct: 1,
            explanation: "AI can articulate a business explanation clearly and professionally — but only if you provide the reason. The commercial understanding of why a variance occurred requires your knowledge of the business, not AI's."
          },
          {
            question: "Which of the following is NOT a suitable AI use case in FP&A?",
            options: [
              "Writing the narrative section of a board pack",
              "Summarising a 40-page analyst report for the CFO",
              "Auditing Excel model formulas for errors in the three-statement model",
              "Drafting the written assumptions section of a reforecast"
            ],
            correct: 2,
            explanation: "AI cannot audit Excel models — it has no access to your files and cannot trace formulas, check cell references, or identify errors in model logic. Formula auditing requires human review or a dedicated Excel audit tool."
          }
        ],
        applyThisWeek: {
          action: "Use AI to generate first-draft variance commentary for your next month-end close — track time saved and note what needed editing.",
          promptTemplate: "Write variance commentary for a management accounts report. Professional finance tone. For each line item: state the actual figure, the budget figure, the variance (amount and percentage), and the business reason. Structure as one clear paragraph per variance. Data: [paste variance table with actuals, budget, and variance columns]. Business context: [one sentence per major variance explaining the operational reason — e.g. 'marketing underspend due to campaign delay', 'revenue ahead due to large Q3 contract']. Target reader: [CFO / board / business unit leaders].",
          tool: "Claude"
        }
      },
      {
        id: "finance-fpa-l2",
        title: "Variance Commentary and Management Reporting with AI",
        duration: 18,
        description: "Build a systematic approach to AI-assisted variance commentary and management accounts narrative — covering the full monthly pack from P&L commentary to KPI analysis and executive summary.",
        content: `## The Management Accounts Writing Challenge

Monthly management accounts require commentary across the full P&L — revenue, gross margin, operating costs, EBITDA, and cash — plus KPI narrative, an executive summary, and often divisional or departmental breakdowns. This writing typically happens under time pressure, after a demanding close process.

AI handles the mechanical writing layer. You handle the business intelligence layer.

## Full P&L Commentary Workflow

Structure your prompt to match your management accounts layout:

\`\`\`
Write management accounts commentary for [Month] [Year]. Audience: [CFO / board / divisional leaders]. For each section, write a clear paragraph explaining performance versus budget and versus prior period. Sections:

1. Revenue: Actual £[X]m, Budget £[X]m, Prior Year £[X]m. Key variances: [business reasons].
2. Gross Margin: Actual [X]%, Budget [X]%. Key variances: [reasons].
3. Operating Costs: Actual £[X]m, Budget £[X]m. Key cost lines above/below budget: [detail].
4. EBITDA: Actual £[X]m, Budget £[X]m, Prior Year £[X]m.
5. Cash: Closing balance £[X]m. Key movements: [receivables, capex, debt].

Executive Summary: Write a 150-word summary of the month's key messages for the CEO.
\`\`\`

## KPI Narrative

Non-financial KPIs require the same treatment as financial variances. For each KPI, AI needs: the metric name, the actual, the target, and the business context.

\`\`\`
Write KPI commentary for the following metrics. For each: state the actual versus target, the trend versus prior periods, and the business reason for any significant variance. Metrics: [paste KPI table with actuals, targets, prior month, and prior year]. Context: [any operational factors affecting the metrics].
\`\`\`

## Quality Control Protocol

Before including AI-generated commentary in any management report:
1. **Verify every number** against your source data — AI reflects what you input, and input errors become output errors
2. **Check for hallucinated context** — AI sometimes adds explanatory context you didn't provide; remove anything that wasn't in your brief
3. **Validate business reasons** — ensure every stated reason is accurate and reflects actual events, not AI inference
4. **Adjust tone** — AI commentary tone may need tightening for your organisation's specific report style

## The Executive Summary: Highest-Value AI Output

The executive summary — 150–200 words that capture the month's most important messages — is the hardest section to write and the most valuable. It requires selectivity: not everything is equally important. Your job is to tell AI which variances matter most; AI writes the summary well once you make those choices.`,
        keyTakeaways: [
          "Structure your AI prompt to match your management accounts layout — provide actual, budget, and prior period figures for every section",
          "AI sometimes adds business context you didn't provide — always remove any explanation that wasn't in your brief before publishing",
          "KPI commentary follows the same workflow as financial variance commentary — provide metric, actual, target, and business context",
          "The executive summary is where AI adds the most value — but you must tell AI which variances are most important; editorial selectivity is your job"
        ],
        exercise: {
          title: "Full Month Management Accounts Commentary",
          description: "Use AI to produce commentary for a complete section of your management accounts — from P&L to executive summary.",
          steps: [
            "Gather the data for your most recent month: actuals versus budget for P&L, key KPIs, and cash position",
            "For each major variance, write the business reason in one sentence — this is the intelligence AI cannot supply",
            "Open Claude and run the full P&L commentary prompt from the lesson, providing data and business reasons for each section",
            "Read the output section by section: verify every number, remove any context AI added that you didn't provide, and adjust the tone to match your organisation's style",
            "Draft the executive summary using AI — check that it accurately reflects the priorities you set, not AI's assessment of what matters"
          ],
          tool: "Claude"
        },
        quiz: [
          {
            question: "AI generates management accounts commentary that includes an explanation you did not provide: 'The cost overrun was likely due to inflationary pressure on supplier contracts.' What should you do?",
            options: [
              "Include it if it sounds plausible — AI may have inferred correctly",
              "Remove it — only include business reasons you have verified and provided",
              "Ask AI to verify its own explanation",
              "Flag it as 'management assessment' rather than 'actual cause'"
            ],
            correct: 1,
            explanation: "AI sometimes infers business context that sounds plausible but was not in your brief. Management accounts commentary must be factually accurate — any explanation for a variance must be one you have verified, not one AI generated through inference."
          },
          {
            question: "What is the most important editorial decision the FP&A professional makes when AI drafts an executive summary?",
            options: [
              "Whether the word count is within the target range",
              "Deciding which variances are the most important business messages — editorial selectivity that AI cannot determine",
              "Whether the tone matches the board's preferred communication style",
              "Checking that every financial figure appears in the summary"
            ],
            correct: 1,
            explanation: "An executive summary requires selectivity — not everything is equally important. Deciding which variances and trends are the most significant business messages for leadership is a human editorial call that requires commercial judgement. AI writes well once you make those choices."
          },
          {
            question: "An FP&A analyst provides AI with a variance table containing an input error — actual revenue is stated as £4.2m when it should be £2.4m. What will AI do?",
            options: [
              "Detect the error and correct it automatically",
              "Flag the error as implausible and request confirmation",
              "Write commentary based on the incorrect figure without identifying the error",
              "Refuse to generate commentary until the data is verified"
            ],
            correct: 2,
            explanation: "AI works from the data you provide. It has no access to your source systems and cannot identify input errors. If the data you provide contains an error, AI will generate commentary based on that error — which is why source data verification before prompting is essential."
          }
        ],
        applyThisWeek: {
          action: "Use AI to draft the narrative for one full section of your next management accounts — P&L commentary, KPIs, or executive summary — and track time saved against your normal process.",
          promptTemplate: "Write management accounts variance commentary for [Month] [Year]. Target reader: [CFO / board / divisional leaders]. Tone: professional finance narrative, clear and concise. For each section below, write a paragraph explaining performance: 1) Revenue: Actual [£X], Budget [£X], Prior Year [£X]. Key variances and reasons: [list]. 2) Gross Margin: Actual [X]%, Budget [X]%. Drivers: [list]. 3) Operating Costs: Actual [£X], Budget [£X]. Key movements: [list]. 4) EBITDA: Actual [£X], Budget [£X]. Then write a 150-word executive summary capturing the three most important messages from this month.",
          tool: "Claude"
        }
      },
      {
        id: "finance-fpa-l3",
        title: "AI-Assisted Forecasting and Scenario Planning",
        duration: 17,
        description: "Use AI to accelerate scenario planning documentation, assumption narratives, and reforecast communication — so your team moves faster from model to stakeholder-ready output.",
        content: `## Where AI Fits in the Forecasting Cycle

The forecasting cycle involves two distinct layers: **model building** (Excel, Anaplan, Adaptive, or similar tools) and **communication** (assumption documentation, scenario narratives, stakeholder-facing reports). AI adds almost no value in the model-building layer — but it dramatically accelerates the communication layer.

## Documenting Forecast Assumptions with AI

Every reforecast or budget submission needs written assumption documentation. This is typically rushed and inconsistent. AI produces it systematically from structured inputs.

\`\`\`
Write a forecast assumptions document for our [Q3 reforecast / FY budget]. Format: one paragraph per major assumption area, professional tone. Include: the assumption, the rationale, and the key risk or sensitivity. Assumption areas: Revenue: [describe your revenue assumptions and rationale]. Headcount: [describe headcount assumptions]. Cost inflation: [your assumptions]. Capex: [your assumptions]. Working capital: [your assumptions]. Key risks to the base case: [list].
\`\`\`

## Writing Scenario Narratives

When presenting multiple scenarios — base, upside, downside — stakeholders need the scenarios described in plain English before they can engage with the numbers. AI writes these descriptions once you define the assumptions.

\`\`\`
Write three scenario descriptions for a quarterly reforecast. Each scenario should be described in 100 words covering: the key assumptions that define the scenario, the resulting revenue and EBITDA versus budget, and what would need to happen for this scenario to materialise. Base case: [your assumptions and outputs]. Upside case: [your assumptions and outputs]. Downside case: [your assumptions and outputs].
\`\`\`

## Sensitivity and Risk Narrative

For presentations to leadership or the board, sensitivity analysis outputs (e.g. a £0.5m revenue impact for every 1% volume change) need contextualising in plain English. AI translates these outputs clearly:

\`\`\`
Translate the following sensitivity analysis into plain English for a board presentation. Target audience: non-finance board members. For each sensitivity, write two sentences: what the variable is and why it matters, and the financial impact of a [X]% movement. Sensitivities: [paste your sensitivity table].
\`\`\`

## What Remains Entirely Human

The assumptions themselves — the commercial judgement about what is realistic, conservative, or appropriately ambitious — are not AI's domain. AI documents and communicates assumptions you set. It does not generate forecast inputs.`,
        keyTakeaways: [
          "AI adds value in the forecasting communication layer — assumption documentation, scenario narratives, sensitivity explanations — not model building",
          "Forecast assumption documentation is typically rushed and inconsistent — AI produces it systematically from structured inputs",
          "Scenario descriptions in plain English are essential for non-finance stakeholders; AI writes these efficiently once you define the assumptions",
          "The forecast assumptions themselves — the commercial judgement — are not AI's domain; AI documents what you decide"
        ],
        exercise: {
          title: "Reforecast Scenario Narrative Pack",
          description: "Use AI to produce the written narrative for your next reforecast — assumption documentation and three scenario descriptions.",
          steps: [
            "Gather your latest reforecast assumptions by category: revenue, headcount, costs, capex, working capital",
            "For each assumption, write: the assumption itself, the rationale, and the key risk in one sentence each",
            "Define your three scenarios (base, upside, downside) with the key differentiating assumptions and the resulting P&L outcomes",
            "Open Claude and run both prompts from the lesson — assumption documentation and scenario descriptions",
            "Review the outputs for accuracy and business reasonableness — adjust any description that doesn't accurately reflect the assumption you set"
          ],
          tool: "Claude"
        },
        quiz: [
          {
            question: "Which part of the forecasting cycle does AI improve most significantly?",
            options: [
              "Building the three-statement financial model",
              "Setting revenue and cost assumptions for the budget",
              "Writing the assumption documentation and scenario narrative that communicates the forecast to stakeholders",
              "Reconciling the forecast to management accounts actuals"
            ],
            correct: 2,
            explanation: "AI accelerates the communication layer — assumption documentation, scenario narratives, sensitivity explanations — not the modelling layer. AI has no access to your financial models and cannot generate or validate forecast assumptions."
          },
          {
            question: "What must an FP&A professional provide before AI can write useful scenario descriptions?",
            options: [
              "A description of what good scenario planning looks like in general",
              "The specific assumptions that define each scenario and the resulting financial outputs",
              "The names of the scenarios only — AI can infer the assumptions from industry context",
              "Access to the financial model used to generate the scenarios"
            ],
            correct: 1,
            explanation: "AI cannot generate scenario assumptions — it documents and communicates the ones you provide. For useful scenario descriptions, you must supply the specific assumptions that differentiate each scenario and the financial outcomes they produce."
          },
          {
            question: "A CFO asks for plain-English descriptions of the downside scenario for a board presentation. What should the FP&A analyst do?",
            options: [
              "Ask AI to generate the downside scenario assumptions based on industry benchmarks",
              "Provide AI with the downside assumptions and financial outputs and ask it to write a 100-word plain-English description",
              "Write the description manually — this is too sensitive for AI",
              "Ask AI to compare the downside scenario to competitor financial performance"
            ],
            correct: 1,
            explanation: "Writing a plain-English scenario description for board use is exactly the right AI task — you provide the assumptions and outputs, AI writes clearly for a non-finance audience. The assumptions themselves are set by the FP&A team, not generated by AI."
          }
        ],
        applyThisWeek: {
          action: "Use AI to write the assumption documentation for your next reforecast cycle — compare the time taken to your normal process and share the draft with your FP&A lead for feedback.",
          promptTemplate: "Write a forecast assumptions document for our [Q3 reforecast / FY budget submission]. Professional finance tone. One paragraph per category covering: the assumption, the rationale, and the key risk or sensitivity. Categories: Revenue: [assumptions, rationale, risk]. Headcount: [assumptions, rationale, risk]. Operating costs: [assumptions, rationale, risk]. Capex: [assumptions, rationale, risk]. Working capital: [assumptions, rationale, risk]. Conclude with a 50-word paragraph on the key sensitivities to the base case and the direction of risk (upside or downside).",
          tool: "Claude"
        }
      },
      {
        id: "finance-fpa-l4",
        title: "Automating the Monthly Pack and Board Reporting Cycle",
        duration: 19,
        description: "Build a repeatable, AI-assisted workflow for the monthly management pack and board reporting cycle — reducing writing time, improving consistency, and freeing your team for analysis.",
        content: `## The Monthly Pack Problem

The management pack is the FP&A team's highest-visibility deliverable. It is also the most time-consuming writing task — often produced under close pressure, late in the month, by the same people who just completed the close. AI cannot do the close, but it can dramatically reduce the pack production time.

## Building the Monthly Pack Workflow

A repeatable AI-assisted monthly pack workflow has four stages:

**Stage 1: Data extraction and preparation (human)**
Extract variance tables, KPI data, and cash position from your source systems. Prepare structured inputs: actuals vs budget vs prior year for every P&L line, with business reasons noted alongside.

**Stage 2: Section-by-section commentary generation (AI)**
Run AI commentary prompts for each section of the pack — P&L, KPIs, cash, divisional/departmental. This is the mechanical writing layer AI handles well.

**Stage 3: Quality review and intelligence layer (human)**
Review every AI section: verify numbers, remove any hallucinated context, add the commercial intelligence AI cannot provide (early signals, strategic context, leadership messages). This is where the FP&A team's analytical value sits.

**Stage 4: Executive summary and leadership narrative (AI + human)**
AI drafts the executive summary; the FP&A director or CFO adds the leadership perspective and approves the final narrative.

## Board Pack Reporting

Board packs require a higher standard of precision, clarity, and strategic framing than internal management accounts. Apply a more rigorous review protocol:

\`\`\`
Review the following management accounts commentary for board presentation. The board audience is non-executive directors and the CEO. Assess: 1) Is every number accurate and consistent with the data I have provided? 2) Is every business explanation clear to a non-finance board member? 3) Are there any sections that use unnecessary jargon or internal acronyms? 4) What is the single most important message this board needs to take from this pack, and is it clearly stated in the executive summary? Commentary: [paste]
\`\`\`

## Building Your Pack Template Library

Create a set of AI prompt templates — one per pack section — tested and refined over three months of use. These become your team's production infrastructure. New team members use the same templates, producing consistent output from day one.

The biggest value: eliminating blank-page time at the end of each close. Your team opens the template, pastes the data, and has a commentary draft in five minutes.`,
        keyTakeaways: [
          "A four-stage workflow — data prep, AI commentary generation, quality review, and executive summary — is the most effective monthly pack structure",
          "Board packs require a more rigorous review protocol than internal management accounts — precision, clarity, and strategic framing are higher-stakes",
          "Build a template library of tested AI prompts — one per pack section — so every team member produces consistent output from day one",
          "The biggest time saving is eliminating blank-page time at close: a tested template plus data equals a commentary draft in five minutes"
        ],
        exercise: {
          title: "Build Your Monthly Pack Prompt Template Library",
          description: "Create and test three AI prompt templates for your most time-consuming monthly pack sections.",
          steps: [
            "Identify the three most time-consuming written sections of your monthly pack (e.g. P&L commentary, KPI narrative, executive summary)",
            "For each section, draft a prompt template with placeholders for: data, business context, target audience, and tone",
            "Test each template using last month's data — run the prompts and review the output quality",
            "Refine any template that produced output needing significant editing — adjust the instruction detail until the output is consistently usable as a first draft",
            "Store the three finalised templates in a shared team document, labelled with the section name and the data inputs required"
          ],
          tool: "Claude"
        },
        quiz: [
          {
            question: "In a four-stage AI-assisted monthly pack workflow, which stage should always be completed entirely by a human?",
            options: [
              "Section-by-section commentary generation",
              "Data extraction and preparation, including noting business reasons for variances",
              "Formatting the final document for distribution",
              "Converting the pack to PDF for board distribution"
            ],
            correct: 1,
            explanation: "Data extraction, preparation, and the addition of business reasons for variances are human tasks — they require access to source systems and commercial knowledge of the business that AI does not have. This is the intelligence layer that makes all subsequent AI commentary useful."
          },
          {
            question: "Why should board pack commentary undergo a more rigorous review than internal management accounts commentary?",
            options: [
              "Because board members read more carefully than internal managers",
              "Because board packs are legally binding documents",
              "Because non-executive board members need higher clarity and precision, and errors in board reporting carry reputational and governance consequences",
              "Because AI produces lower quality output for board-level content"
            ],
            correct: 2,
            explanation: "Board reporting carries governance responsibility — directors rely on the accuracy of pack content for fiduciary decisions. Non-executive members also typically require greater clarity and less finance jargon than internal audiences. Both factors require a higher review standard."
          },
          {
            question: "What is the primary benefit of building a tested AI prompt template library for the monthly pack?",
            options: [
              "It eliminates the need for human review of pack commentary",
              "It allows AI to access your financial systems directly each month",
              "It eliminates blank-page time at close and produces consistent output quality regardless of which team member runs the prompts",
              "It ensures the pack is always produced by the most experienced FP&A team member"
            ],
            correct: 2,
            explanation: "A tested template library removes the blank-page bottleneck — team members open the template, paste the data, and get a usable first draft immediately. It also ensures consistency: the same prompt structure produces comparable output quality regardless of who runs it."
          }
        ],
        applyThisWeek: {
          action: "Build and test one AI prompt template for your most time-consuming monthly pack section — aim to produce a first draft in under five minutes from the moment you have the data.",
          promptTemplate: "Write the [section name] for our monthly management pack. Target reader: [CFO / board / divisional leaders]. Tone: professional finance narrative — clear, concise, no unnecessary jargon. Data: [paste actuals vs budget vs prior year table for this section]. Business context: [one sentence per major variance explaining the operational reason]. Format: [one paragraph per major item / bullet points / narrative only]. Flag: [any areas where you need more context to comment accurately].",
          tool: "Claude"
        }
      }
    ]
  },

  'accounting': {
    title: "AI for Accounting & Controlling",
    description: "Use AI to accelerate month-end close documentation, reconciliation commentary, accounts payable and receivable workflows, and audit-ready record-keeping — without compromising accuracy or compliance.",
    lessons: [
      {
        id: "finance-accounting-l1",
        title: "AI for Accountants: Practical Applications That Work Today",
        duration: 15,
        description: "Understand the accounting tasks where AI adds genuine value today — and the important limits to understand before adopting AI in a function where accuracy is non-negotiable.",
        content: `## The Accuracy Imperative

Accounting is a function where errors have direct consequences — financial statements, tax filings, audit reports, and regulatory submissions demand accuracy that most AI tools cannot guarantee independently. This does not mean AI has no place in accounting. It means AI's role is different here than in many other functions.

## Where AI Adds Real Value in Accounting

**Documentation and narrative.** Month-end commentary, reconciliation explanations, journal entry narratives, and procedure documentation are writing tasks. AI produces first drafts of these quickly and consistently.

**Exception identification support.** Paste a set of transaction data or account balances and ask AI to flag items that look unusual — large round numbers, sign reversals, items in unexpected periods. AI does not replace your professional judgement, but it can help surface items worth investigating.

**Policy and procedure writing.** Accounting policies, internal control procedures, and reconciliation process guides are structured documents AI drafts well from your inputs.

**Query and correspondence drafts.** Responses to audit queries, internal questions about account treatment, and intercompany reconciliation queries are written communications AI assists with.

## What AI Cannot Do

- **Access your accounting systems.** AI has no connection to your ERP, general ledger, or consolidation tool. You must extract and provide data.
- **Perform audit procedures.** AI cannot verify that a transaction is real, that a balance is supported, or that a control has been performed.
- **Interpret accounting standards.** AI can summarise IFRS or GAAP guidance, but it will sometimes get it wrong or be out of date. Regulatory interpretation requires qualified professional judgement.
- **Sign off on anything.** AI output does not constitute professional accountancy judgement.

## Starting Right: Low-Risk, High-Value

Begin with documentation tasks: journal entry descriptions, reconciliation narrative, and month-end commentary. These are low-risk (you verify the numbers) and high-value (they consume significant time in every close).

\`\`\`
Write a journal entry description for the following posting. Professional accounting tone. Include: the accounts debited and credited, the reason for the posting, the period it relates to, and the supporting documentation reference. Posting: [debit account, credit account, amount]. Reason: [why this posting is required]. Period: [accounting period]. Supporting reference: [invoice number / contract reference / supporting document].
\`\`\``,
        keyTakeaways: [
          "AI's role in accounting is in documentation and narrative tasks — not in verification, audit procedures, or regulatory interpretation",
          "AI cannot access your accounting systems — you must extract and provide data; AI never has independent access to your ledger",
          "Start with journal entry descriptions, reconciliation narrative, and month-end commentary — high-value, manageable-risk starting points",
          "AI output does not constitute professional accountancy judgement; qualified review is always required before any output is relied upon"
        ],
        exercise: {
          title: "Journal Entry Documentation Sprint",
          description: "Use AI to write descriptions for a set of journal entries — then verify each against your source documentation.",
          steps: [
            "Select five journal entries from your most recent month-end close across different types (accrual, prepayment, reclass, intercompany)",
            "For each entry, note: debit account, credit account, amount, period, reason for posting, and supporting document reference",
            "Open Claude and run the journal entry description prompt for each entry",
            "Review every description: verify the accounting basis is correct, the amounts match your source, and the language is appropriate for your audit file",
            "Note which entry types AI handled well and which needed significant editing — refine your prompt for those types"
          ],
          tool: "Claude"
        },
        quiz: [
          {
            question: "An accountant uses AI to check a list of posted transactions for unusual items. What is the correct interpretation of AI's output?",
            options: [
              "AI has completed the exception review — no further investigation is needed",
              "AI has flagged items that may warrant investigation — the accountant must review each flagged item using professional judgement",
              "AI's exception flags can be included in the audit file as evidence of review",
              "AI has validated that the unflagged items are correct"
            ],
            correct: 1,
            explanation: "AI assists with pattern recognition — it can flag items that look unusual. But the investigation, judgement about whether an item is genuinely an exception, and any corrective action are professional accountancy responsibilities that require human expertise."
          },
          {
            question: "A junior accountant asks AI to explain how IFRS 16 applies to a specific lease contract. How should they use AI's response?",
            options: [
              "Apply AI's guidance directly — AI is trained on accounting standards",
              "Use AI's response as a starting point for understanding, then verify the specific application with a qualified accountant or primary standard source",
              "AI cannot comment on IFRS — this question should not be asked",
              "Accept AI's guidance if it cites the specific standard paragraph"
            ],
            correct: 1,
            explanation: "AI can provide a useful orientation on accounting standards but can be wrong, outdated, or imprecise in specific application. For any material accounting judgement, AI's response must be verified against the primary standard and reviewed by a qualified professional."
          },
          {
            question: "Which of the following accounting tasks is MOST appropriate for AI assistance?",
            options: [
              "Signing off on the completeness of accruals at month-end",
              "Verifying that a supplier invoice matches the purchase order",
              "Writing the narrative explanation for a balance sheet reconciliation",
              "Determining the correct tax treatment of a complex transaction"
            ],
            correct: 2,
            explanation: "Writing the narrative explanation for a reconciliation is a documentation task — AI produces clear, consistent first drafts from the information you provide. Sign-offs, verification procedures, and complex tax treatments require professional judgement AI cannot provide."
          }
        ],
        applyThisWeek: {
          action: "Use AI to write journal entry descriptions for your next month-end close — select five entries across different types and compare AI's descriptions to your current documentation standard.",
          promptTemplate: "Write a journal entry description for an accounting file. Professional accounting tone. Include: accounts debited and credited with account codes, the accounting basis for the posting, the period it relates to, and the reference for the supporting documentation. Entry details: Debit: [account name, code, £amount]. Credit: [account name, code, £amount]. Reason: [why this entry is required — accrual / prepayment / reclass / correction]. Period: [accounting period]. Supporting document: [invoice number / contract / calculation reference].",
          tool: "Claude"
        }
      },
      {
        id: "finance-accounting-l2",
        title: "Month-End Close and Reconciliation with AI",
        duration: 18,
        description: "Use AI to accelerate reconciliation commentary, checklist documentation, and close status reporting — reducing the narrative burden on the accounting team during the highest-pressure period of the month.",
        content: `## The Close Pressure Problem

Month-end close is the accounting team's most time-constrained period. Reconciliations, journal postings, and sign-offs compete for the same hours. Documentation and commentary — essential for audit trail and management reporting — often gets done quickly and inconsistently.

AI doesn't accelerate the actual reconciliation work (that requires your systems and professional judgement). It accelerates the documentation and commentary layer — which is where accounting teams spend more time than they realise.

## Balance Sheet Reconciliation Commentary

A balance sheet reconciliation explanation has a predictable structure: opening balance, movements in the period, closing balance, and confirmation that the balance is adequately supported. AI produces this consistently at scale.

\`\`\`
Write a balance sheet reconciliation narrative for the following account. Professional accounting tone suitable for an audit file. Include: account name, opening balance, movements in the period with descriptions, closing balance, and a brief statement confirming supporting documentation. Account: [name and code]. Opening balance: [£X]. Movements: [list each movement with description and amount]. Closing balance: [£X]. Supported by: [description of supporting documentation].
\`\`\`

## Close Status Reporting

During close, controllers and finance managers typically maintain a status log — which tasks are complete, which are outstanding, and what is blocking completion. AI drafts status update communications from structured inputs.

\`\`\`
Write a month-end close status update for [date]. Target audience: [CFO / finance director / shared services]. For each close area, state: status (complete / in progress / blocked), who is responsible, and the expected completion time if not yet done. Areas: [list close areas with status, owner, and ETA]. Outstanding blockers: [describe any system, data, or approver delays]. Expected close completion: [date and time].
\`\`\`

## Reconciliation Exception Commentary

When a reconciliation has unreconciled items or known differences, these need clear explanation. AI writes these explanations consistently from your description of the item:

\`\`\`
Write a reconciliation exception note for an unreconciled item. Professional tone, suitable for audit review. Cover: the nature of the item, the amount, why it is unreconciled at this date, what action is being taken, and the expected resolution date. Item: [description]. Amount: [£X]. Reason unreconciled: [explain]. Action: [what is being done]. Resolution expected: [date].
\`\`\`

## What to Never Delegate to AI

The professional sign-off — confirming that balances are adequately supported and reconciliations are complete — must remain with a qualified accountant. AI assists with documentation; the accountant retains responsibility for the content.`,
        keyTakeaways: [
          "AI accelerates the documentation layer of month-end close — reconciliation commentary, status updates, exception notes — not the reconciliation work itself",
          "Balance sheet reconciliation narrative has a predictable structure AI handles well: opening balance, movements, closing balance, supporting documentation",
          "Exception commentary for unreconciled items requires a clear explanation of cause, action, and expected resolution — AI drafts this from your description",
          "Professional sign-off on reconciliation completeness and adequacy of support always remains with a qualified accountant"
        ],
        exercise: {
          title: "Reconciliation Commentary Pack",
          description: "Use AI to produce commentary for three balance sheet account reconciliations — testing how much editing each requires.",
          steps: [
            "Select three balance sheet accounts from your most recent close: one straightforward, one with movements, one with an exception or unreconciled item",
            "For each account, note the opening balance, every movement with a description, the closing balance, and what documentation supports the balance",
            "Open Claude and run the reconciliation commentary prompt for each account",
            "For the account with an exception, run the exception note prompt separately",
            "Compare the AI-generated commentary to your current reconciliation documentation standard — note what was usable as-is and what needed editing"
          ],
          tool: "Claude"
        },
        quiz: [
          {
            question: "What information must an accountant provide before AI can write useful balance sheet reconciliation commentary?",
            options: [
              "The account number only — AI can source the balance from public databases",
              "Opening balance, every movement with a description, closing balance, and the supporting documentation reference",
              "The closing balance and the account name",
              "A description of the reconciliation result only"
            ],
            correct: 1,
            explanation: "AI needs structured inputs to produce accurate reconciliation commentary. Opening balance, all movements with descriptions, closing balance, and supporting documentation references are the minimum required — without these, AI cannot produce commentary that is factually accurate."
          },
          {
            question: "During month-end close, an intercompany account has an unreconciled difference of £15,000. What is the correct AI-assisted approach?",
            options: [
              "Ask AI to identify the cause of the difference from the account data",
              "Have AI draft an exception note explaining the nature, amount, action being taken, and expected resolution — using your description of the cause",
              "Ask AI to contact the intercompany counterpart to resolve the difference",
              "Use AI to post a clearing entry to remove the difference"
            ],
            correct: 1,
            explanation: "AI can draft a clear, professional exception note from your description of the unreconciled item — covering nature, amount, cause, action, and resolution date. The identification of why the difference exists is an accounting investigation task that requires professional judgement."
          },
          {
            question: "An accounting manager wants to use AI to sign off that all reconciliations are complete and adequately supported. Is this appropriate?",
            options: [
              "Yes — AI can review all reconciliation documentation and confirm completeness",
              "Yes, but only for accounts below a materiality threshold",
              "No — professional sign-off on reconciliation completeness requires qualified accountant responsibility that AI cannot assume",
              "Only if a second AI review is also performed"
            ],
            correct: 2,
            explanation: "Professional sign-off on reconciliation completeness and adequacy of supporting documentation is a qualified accountant's responsibility. AI assists with documentation — it cannot assume, confirm, or substitute for professional accountability."
          }
        ],
        applyThisWeek: {
          action: "Use AI to write reconciliation commentary for your three most time-consuming balance sheet account reconciliations at next month-end close.",
          promptTemplate: "Write a balance sheet reconciliation narrative suitable for an audit file. Professional accounting tone. Account: [name and code]. Period: [accounting period]. Opening balance: [£X]. Movements in period: 1) [description, £amount]; 2) [description, £amount]; 3) [description, £amount]. Closing balance: [£X]. The balance is supported by: [description of supporting documentation — e.g. 'invoice schedule attached', 'bank statement reconciled to bank', 'prepayment schedule']. Include a one-sentence confirmation that the account has been reconciled and is adequately supported.",
          tool: "Claude"
        }
      },
      {
        id: "finance-accounting-l3",
        title: "AI for Accounts Payable, Receivable, and Error Detection",
        duration: 17,
        description: "Use AI to draft supplier and customer correspondence, identify potential data entry errors in transaction lists, and document AP/AR processes — reducing manual writing and improving consistency in transactional accounting.",
        content: `## Transactional Accounting Has a Lot of Writing

AP and AR generate significant volumes of written communication: supplier queries, payment remittances, customer statements, dispute letters, credit hold notifications, and internal escalations. These are structured, repeatable communications — an ideal AI use case.

## Accounts Payable Correspondence

**Supplier payment queries.** When a supplier chases payment, your response needs to confirm receipt, provide a payment timeline, or explain a hold.

\`\`\`
Write a professional response to a supplier payment query. Supplier name: [name]. Invoice number: [ref]. Invoice amount: [£X]. Issue causing delay: [describe — e.g. 'invoice not matched to PO', 'bank details awaiting verification', 'approval required from [department]']. Expected payment date: [date]. Tone: professional and courteous. Keep it under 100 words.
\`\`\`

**Invoice dispute letters.** When disputing an invoice — incorrect amount, duplicate, delivery not received — the dispute letter needs to be clear and include the specific grounds.

**Payment run communications.** Internally, payment run approval requests, remittance advice narratives, and payment exception reports are all structured writing tasks AI handles efficiently.

## Accounts Receivable Correspondence

**Aged debt chasers.** AI drafts a consistent, professional-tone debt chase letter at each stage of the collections process.

\`\`\`
Write an accounts receivable collection letter at [first / second / final] stage. Customer name: [company name]. Outstanding amount: [£X]. Original invoice date: [date]. Payment terms: [days]. Tone appropriate for the stage: [first: polite reminder / second: firm but professional / final: formal notice]. Include: outstanding amount, original due date, payment instructions, and a contact for queries. Keep it under 150 words.
\`\`\`

**Dispute acknowledgement.** When a customer disputes an invoice, the acknowledgement letter sets the right tone for resolution.

## Error Detection Assistance

Paste a transaction list into AI and ask it to flag items that appear unusual — this is not an audit procedure but a useful first-pass review:

\`\`\`
Review this accounts payable transaction list and flag any items that appear unusual for a second look. Items to flag: duplicate amounts or references, round number transactions above [£X], transactions with unexpected supplier names or codes, items posted to unusual accounts for this transaction type. Transaction list: [paste data]. Note: this is a preliminary review only — all flagged items require human verification.
\`\`\`

**Important:** AI error flagging is a starting point, not a conclusion. Every flagged item requires your professional review.`,
        keyTakeaways: [
          "AP and AR generate high volumes of structured, repeatable correspondence — this is AI's highest-value territory in transactional accounting",
          "Stage-appropriate tone for debt collection letters is a key AI input — specify the stage (first, second, final) explicitly",
          "AI transaction error flagging is a starting point only — flagged items require human verification before any action",
          "Invoice disputes, payment holds, and customer correspondence all benefit from AI first drafts with consistent professional tone"
        ],
        exercise: {
          title: "AP/AR Correspondence Templates",
          description: "Build a set of AI-assisted correspondence templates for your most common AP and AR communications.",
          steps: [
            "List the five most frequent written communications your AP/AR team produces (e.g. supplier payment query responses, aged debt chasers at three stages, invoice dispute letters)",
            "For each, write down the standard information required: supplier/customer name, invoice reference, amount, due date, reason for query",
            "Open Claude and draft each correspondence type using the prompts from the lesson — generating a template that uses placeholders for variable information",
            "Test each template with a real example from the past month — review for professional tone, completeness, and accuracy",
            "Store the final templates in a shared team document for use by all AP/AR staff"
          ],
          tool: "Claude"
        },
        quiz: [
          {
            question: "A customer has disputed an invoice claiming they did not receive the goods. What should the AI-drafted acknowledgement letter include?",
            options: [
              "An apology and immediate credit note",
              "Confirmation of receipt of the dispute, the invoice details, the next step in the dispute resolution process, and a contact for queries",
              "A copy of all delivery documentation",
              "A threat of legal action if the dispute is not resolved within seven days"
            ],
            correct: 1,
            explanation: "A dispute acknowledgement letter should be professional and process-oriented: confirm receipt of the dispute, reference the invoice, explain the next step (investigation, documentation request, credit note process), and provide a contact. AI drafts this efficiently once you provide the invoice details and dispute reason."
          },
          {
            question: "AI flags three round-number transactions above £10,000 in an AP transaction list as unusual. What is the correct response?",
            options: [
              "Reverse the three transactions immediately as they are likely errors",
              "Include the AI flag as formal evidence of error in the audit file",
              "Investigate each flagged transaction against the original invoice and purchase order before taking any action",
              "Ask AI to check whether these transactions appear in the bank statement"
            ],
            correct: 2,
            explanation: "AI transaction flagging is preliminary pattern recognition — it identifies items worth investigating, not confirmed errors. Each flagged transaction must be investigated against source documentation (invoice, PO, contract) before any conclusion or action."
          },
          {
            question: "What is the most important variable to specify when asking AI to draft a debt collection letter?",
            options: [
              "The customer's credit rating",
              "The collection stage (first, second, or final) to ensure tone is appropriate",
              "The name of the collections team member who will sign the letter",
              "The customer's payment history over the past 12 months"
            ],
            correct: 1,
            explanation: "The collection stage determines the appropriate tone — from a polite first reminder to a firm final notice. Without this specification, AI defaults to a generic tone that may be too aggressive for an early-stage contact or too soft for a final notice."
          }
        ],
        applyThisWeek: {
          action: "Build AI-assisted templates for your three most common AP or AR correspondence types and share them with your team — track how much time they save compared to writing from scratch.",
          promptTemplate: "Write a [first / second / final] stage accounts receivable collection letter. Customer: [company name]. Contact name: [name if known]. Outstanding amount: [£X]. Original invoice reference: [ref]. Invoice date: [date]. Payment due date: [date]. Payment terms: [e.g. 30 days net]. Tone: [first stage: polite and professional reminder / second stage: firm and professional / final stage: formal notice with consequence]. Include: outstanding amount and due date, payment instructions [bank details / payment link / cheque instructions], and a contact for queries or disputes. Maximum 150 words.",
          tool: "Claude"
        }
      },
      {
        id: "finance-accounting-l4",
        title: "Building Audit-Ready Documentation with AI",
        duration: 18,
        description: "Use AI to produce consistently structured, comprehensive audit documentation — from accounting policy notes to workpaper narratives and management representation letters — reducing the documentation burden without compromising quality.",
        content: `## Documentation Quality Is an Audit Risk

Audit findings frequently cite inadequate documentation as a control weakness — not because the accounting was wrong, but because the evidence trail was insufficient. AI does not improve the underlying accounting, but it dramatically improves the consistency and completeness of documentation.

## Accounting Policy Notes

Accounting policy notes for statutory accounts or internal policy documents are structured narrative. AI drafts these from your inputs about the policy, standard reference, and any company-specific elections.

\`\`\`
Write an accounting policy note for [subject — e.g. revenue recognition / lease accounting / depreciation] suitable for inclusion in statutory accounts under [IFRS / UK GAAP]. Include: the accounting standard reference, the policy applied, any accounting judgements or estimates, and the company's specific elections or treatment where applicable. Our policy: [describe your specific accounting treatment]. Key judgements: [list any significant estimates or judgements].
\`\`\`

**Important:** All accounting policy notes must be reviewed by a qualified accountant and signed off by the finance director or CFO before inclusion in statutory accounts. AI produces the first draft; human review and approval are mandatory.

## Workpaper Narratives

Audit workpapers need clear narrative explaining the purpose of the test, the procedure performed, the population tested, and the conclusion. AI produces this framework consistently:

\`\`\`
Write an audit workpaper narrative for the following test. Purpose: [what control or balance this tests]. Procedure: [what the accountant did]. Population: [what was tested — all items / sample of X items / items above £X threshold]. Findings: [what the test found — no exceptions / N exceptions noted with description]. Conclusion: [whether the balance is adequately supported / control is operating effectively]. Any follow-up: [none / describe action].
\`\`\`

## Management Representation Letters

Management representation letters (MRLs) are formal statements from management to auditors confirming specific assertions. Drafting the standard sections is a structured writing task AI handles well — but the content must be reviewed and signed by the appropriate senior executive, not delegated to AI.

## Creating a Documentation Standard Library

Build a library of AI prompt templates for recurring documentation types:
- Journal entry descriptions
- Balance sheet reconciliation narratives
- Intercompany reconciliation commentary
- Accounting policy notes
- Workpaper frameworks

Standardised templates produce consistent audit-ready documentation regardless of which team member runs them — which is the practical definition of a documentation control.`,
        keyTakeaways: [
          "AI improves the consistency and completeness of audit documentation — it does not improve the underlying accounting",
          "Accounting policy notes drafted by AI require qualified accountant review and finance director or CFO sign-off before inclusion in statutory accounts",
          "Workpaper narratives have a predictable structure — purpose, procedure, population, findings, conclusion — that AI produces consistently",
          "A documentation standard library of AI prompt templates produces consistent audit-ready output regardless of which team member runs the prompts"
        ],
        exercise: {
          title: "Build Your Audit Documentation Template Library",
          description: "Create and test four AI prompt templates for recurring audit documentation types.",
          steps: [
            "Identify the four most frequently produced audit documentation types in your team (e.g. journal entry descriptions, reconciliation narratives, workpaper narratives, policy notes)",
            "For each, define the required structure: what information goes in, what sections must be covered, what the output should look like",
            "Open Claude and draft a prompt template for each documentation type — with clear placeholders for variable information",
            "Test each template against a real recent example — compare the AI output to your current standard for that document type",
            "Refine any template that produced output below your documentation standard, then store all four in a shared team document"
          ],
          tool: "Claude"
        },
        quiz: [
          {
            question: "What is the mandatory step after AI drafts an accounting policy note for inclusion in statutory accounts?",
            options: [
              "Running the note through a second AI tool to check accuracy",
              "Review by a qualified accountant and sign-off by the finance director or CFO",
              "Submitting the note to the auditors for their review before internal approval",
              "Comparing the note to prior year policy notes for consistency"
            ],
            correct: 1,
            explanation: "Accounting policy notes in statutory accounts are formally reviewed and approved by qualified accountants and senior management. AI produces a first draft — human review and executive sign-off are mandatory steps before any inclusion in formal financial statements."
          },
          {
            question: "A standardised AI documentation template library reduces which specific audit risk?",
            options: [
              "The risk that financial figures are incorrect",
              "The risk that accounting standards are misapplied",
              "The risk of inconsistent or incomplete documentation that creates an inadequate audit trail",
              "The risk that auditors will not accept electronic workpapers"
            ],
            correct: 2,
            explanation: "Documentation inconsistency and incompleteness are common audit findings. Standardised templates ensure every team member produces documentation to the same structure and standard — reducing the risk of gaps in the audit trail regardless of experience level."
          },
          {
            question: "An audit workpaper narrative states 'no exceptions noted.' What must the accountant confirm before including this AI-generated conclusion?",
            options: [
              "That the sentence is grammatically correct",
              "That the testing was actually performed and the conclusion is accurate — AI generates the framework, the accountant confirms the facts",
              "That the auditor has pre-approved the conclusion",
              "That the conclusion matches prior year workpaper language"
            ],
            correct: 1,
            explanation: "AI generates the workpaper structure and narrative framework — but the factual content (that the test was actually performed, that no exceptions were genuinely found) is the accountant's responsibility to confirm. The conclusion must reflect what actually happened, not just what the template says."
          }
        ],
        applyThisWeek: {
          action: "Build one AI prompt template for your most frequently produced audit documentation type and test it against three recent examples — refine until the output is consistently at your documentation standard.",
          promptTemplate: "Write an audit workpaper narrative for the following procedure. Format: structured workpaper narrative suitable for external audit review. Sections: Purpose: [what balance, control, or assertion this procedure tests]. Procedure performed: [describe exactly what the accountant did]. Population and sample: [total population size, sample size, selection method]. Findings: [describe what was found — no exceptions / number of exceptions with description]. Conclusion: [whether the balance is adequately supported or the control is operating effectively]. Follow-up actions required: [none / describe any open items]. Prepared by: [name]. Date: [date].",
          tool: "Claude"
        }
      }
    ]
  },

  'treasury': {
    title: "AI for Treasury & Risk",
    description: "Use AI to accelerate cash flow forecasting commentary, FX risk narrative, liquidity analysis, and treasury reporting — so your treasury team produces clearer, faster stakeholder communication without compromising analytical rigour.",
    lessons: [
      {
        id: "finance-treasury-l1",
        title: "AI for Treasury Professionals",
        duration: 15,
        description: "Map where AI fits in the treasury workflow — from cash forecasting commentary to FX monitoring and board reporting — and understand the important boundaries before adopting AI in a high-stakes function.",
        content: `## Treasury Is a High-Stakes Function

Treasury manages liquidity, financial risk, and capital structure. Errors in treasury decisions have direct and immediate financial consequences. This does not mean AI has no place in treasury — but it means the boundary between AI assistance and professional judgement must be clearly drawn and rigidly maintained.

## Where AI Adds Value in Treasury

**Narrative and commentary.** Cash flow forecast commentary, liquidity analysis narrative, FX risk summaries, and board treasury reports all require clear written communication. AI produces first drafts of these structured documents quickly and consistently.

**Scenario descriptions.** When modelling liquidity scenarios or stress tests, AI translates the model outputs into plain English for non-treasury stakeholders — a recurring communication challenge in treasury.

**Policy documentation.** Treasury policy documents — investment policy, FX hedging policy, liquidity risk policy — are structured documents with established frameworks. AI drafts these from your inputs.

**Correspondence and instructions.** Bank correspondence, internal payment instructions documentation, and facility utilisation updates are structured communications AI assists with.

## What AI Cannot Do in Treasury

- **Access market data.** AI has no live access to FX rates, LIBOR/SOFR rates, commodity prices, or credit market spreads unless connected to a data feed.
- **Make hedging or investment decisions.** Whether to execute a hedge, extend a facility, or rebalance a cash portfolio are treasury professional decisions — AI cannot make them.
- **Model cash flows.** Cash flow forecasting requires your systems, your data, and your commercial understanding of the business.
- **Guarantee regulatory compliance.** Treasury operates within regulatory frameworks (FCA, EMIR, etc.) that AI cannot reliably interpret for specific situations.

## Starting Right

Begin with treasury report commentary — monthly cash position summaries, liquidity headroom narrative, and FX exposure summaries. These are high-volume writing tasks with a predictable structure that AI handles well, and the risk of error is manageable if you verify inputs carefully.

\`\`\`
Write a monthly treasury position summary for [Month] [Year]. Professional treasury tone. Cover: cash position versus target, liquidity headroom, key movements during the month, FX exposure summary, and any upcoming facility or maturity events. Data: [paste your key treasury metrics]. Context: [any material developments — e.g. 'drawn on RCF in week 3', 'EUR/GBP rate moved 2% against us this month'].
\`\`\``,
        keyTakeaways: [
          "AI's treasury value is in narrative and commentary tasks — not in market data access, hedging decisions, or cash flow modelling",
          "AI has no live access to FX rates, money market rates, or credit spreads — you must provide current data",
          "Start with monthly treasury position summaries — high-volume, structured writing AI handles well with manageable error risk",
          "Hedging, investment, and liquidity decisions remain treasury professional responsibilities — AI assists communication, not decision-making"
        ],
        exercise: {
          title: "Monthly Treasury Position Summary",
          description: "Use AI to produce a treasury position summary for your most recent month — then compare it to how you currently produce this document.",
          steps: [
            "Gather your key treasury metrics for the most recent month: cash position, liquidity headroom, FX exposures by currency, and any facility utilisation",
            "Note two or three material developments during the month (rate movements, RCF drawings, large cash movements)",
            "Open Claude and run the treasury position summary prompt from the lesson with your data and context",
            "Review the output: verify every number, check that no AI-generated context was added that you didn't provide, and assess whether the tone matches your organisation's treasury reporting standard",
            "Note how much time the AI draft saved compared to your normal process"
          ],
          tool: "Claude"
        },
        quiz: [
          {
            question: "A treasurer asks AI for the current EUR/GBP exchange rate. What will AI do?",
            options: [
              "Provide the current live rate from a market data feed",
              "Provide the rate as of its training data cutoff, which may be significantly out of date",
              "Refuse to answer financial market questions",
              "Provide an estimate based on recent trend data"
            ],
            correct: 1,
            explanation: "AI has no live access to market data. Any rate it provides reflects its training data cutoff — which can be months or over a year out of date. For current rates, use your market data system or a live FX source."
          },
          {
            question: "Which of the following is an appropriate use of AI in a treasury function?",
            options: [
              "Deciding whether to execute a EUR/USD forward contract this morning",
              "Modelling the three-month cash flow forecast from business unit submissions",
              "Writing the monthly liquidity headroom narrative for the board pack",
              "Confirming whether a proposed hedge structure complies with EMIR reporting requirements"
            ],
            correct: 2,
            explanation: "Writing liquidity headroom narrative — translating treasury data into clear prose for board stakeholders — is a documentation task that AI handles well. Hedging decisions, cash flow modelling, and regulatory compliance interpretation all require professional treasury judgement."
          },
          {
            question: "What does 'manageable error risk' mean when applying AI to treasury commentary?",
            options: [
              "AI errors in treasury commentary are not material enough to matter",
              "You can always edit AI errors before distribution — so no verification is needed",
              "The risk is manageable because you verify every number in the AI output against your source data before distribution",
              "Treasury errors are covered by your banking relationships, so AI errors do not create liability"
            ],
            correct: 2,
            explanation: "Error risk in AI-assisted treasury commentary is manageable only because the human verifies every number and business reason before distributing. Without that verification step, the risk is not managed — it is deferred."
          }
        ],
        applyThisWeek: {
          action: "Use AI to produce your next monthly treasury position summary — provide your key metrics and context, and compare the time taken to your normal process.",
          promptTemplate: "Write a monthly treasury position summary for [Month] [Year]. Audience: [CFO / board / finance committee]. Professional treasury tone — clear and concise, avoid unexplained acronyms. Cover: 1) Cash position: actual [£X], target [£X], variance and reason. 2) Liquidity headroom: available facilities [£X], drawn [£X], headroom [£X]. 3) Key cash movements in the month: [describe top 2-3 inflows and outflows]. 4) FX exposure summary: [currency, notional exposure, hedged amount, unhedged position]. 5) Upcoming maturities or events: [any facility renewals, debt maturities, or significant upcoming payments]. Total length: 300 words.",
          tool: "Claude"
        }
      },
      {
        id: "finance-treasury-l2",
        title: "Cash Flow Forecasting and Liquidity Analysis with AI",
        duration: 17,
        description: "Use AI to produce clear cash flow forecast commentary, liquidity scenario narratives, and variance explanations — accelerating the communication layer of the forecasting cycle.",
        content: `## The Two Layers of Cash Flow Forecasting

Cash flow forecasting has a modelling layer (building the forecast, consolidating business unit submissions, stress-testing assumptions) and a communication layer (explaining the forecast to stakeholders, documenting assumptions, writing scenario narratives). AI is useful in the communication layer; it has no access to the modelling layer.

## Cash Flow Forecast Commentary

When presenting a cash flow forecast to the CFO, board, or finance committee, the narrative needs to explain: the forecast methodology, key assumptions, the resulting liquidity position, and the risks to the forecast.

\`\`\`
Write a cash flow forecast narrative for [period]. Audience: [CFO / board / finance committee]. Include: forecast methodology and key assumptions, expected cash inflows by category with rationale, expected outflows by category with rationale, resulting closing cash position and liquidity headroom, and the top two risks to the forecast. Data: Operating inflows: [£X — describe key drivers]. Capex: [£X — describe major projects]. Financing: [£X — describe debt service or drawings]. Closing position: [£X]. Target minimum balance: [£X]. Headroom: [£X]. Key risks: [describe].
\`\`\`

## Liquidity Scenario Narratives

For stress testing or scenario planning, AI translates your model outputs into clear descriptions of each scenario — what it assumes, what the liquidity impact is, and what management action might be triggered.

\`\`\`
Write three liquidity scenario descriptions. Audience: board or finance committee. For each scenario: describe the key assumptions that differentiate it from base case, the resulting minimum liquidity position over the forecast period, the period at which minimum headroom is reached, and the management actions available if this scenario materialises. Base case: [assumptions and outputs]. Downside scenario: [assumptions and outputs]. Severe stress: [assumptions and outputs].
\`\`\`

## Forecast Variance Commentary

When actual cash flows differ from forecast, the variance commentary needs to explain: what drove the difference, whether it is timing or structural, and the implication for the next period forecast.

The most common cash flow forecast variances: receipts timing, capex slippage, working capital movement, and unplanned financing. Provide AI with the variance and the business reason — it writes the commentary clearly.`,
        keyTakeaways: [
          "AI accelerates the communication layer of cash flow forecasting — commentary, assumptions documentation, scenario narratives, and variance explanations",
          "Forecast variance commentary requires the business reason — AI cannot identify why receipts were delayed or capex slipped without your input",
          "Liquidity scenario narratives for board use require three elements: differentiating assumptions, resulting minimum headroom, and available management actions",
          "All cash flow commentary must be verified against your source data before distribution to any stakeholder"
        ],
        exercise: {
          title: "Cash Flow Forecast Narrative Pack",
          description: "Use AI to produce the narrative for your next cash flow forecast presentation — including base case commentary and one scenario description.",
          steps: [
            "Prepare the key inputs for your next cash flow forecast: operating inflows, capex, financing movements, closing position, and target minimum balance",
            "Identify the top two risks to the forecast and write a one-sentence description of each",
            "Open Claude and run the cash flow forecast narrative prompt from the lesson with your data",
            "Define one downside scenario and run the scenario description prompt",
            "Review both outputs: verify every number, check that the risk language is accurate, and adjust the tone to match your organisation's treasury reporting style"
          ],
          tool: "Claude"
        },
        quiz: [
          {
            question: "A treasury analyst's cash flow forecast shows that receipts came in £2m below forecast. What must the analyst provide to AI before it can write useful variance commentary?",
            options: [
              "The forecast model file",
              "The business reason why receipts were lower — e.g. which customers paid late and why",
              "The historical variance trend over the past 12 months",
              "Confirmation from the credit controller that the receipts will arrive next month"
            ],
            correct: 1,
            explanation: "AI can write clear, professional variance commentary — but only if provided with the business reason for the variance. Whether receipts were delayed due to a large customer paying late, timing of billing, or a disputed invoice is information only the treasury analyst has."
          },
          {
            question: "What are the three essential elements of a board-ready liquidity scenario description?",
            options: [
              "The scenario name, the probability of occurrence, and the expected EBITDA impact",
              "The differentiating assumptions, the resulting minimum liquidity headroom, and the available management actions",
              "The interest rate assumption, the FX assumption, and the credit rating assumption",
              "The opening cash balance, the period-end cash balance, and the net cash movement"
            ],
            correct: 1,
            explanation: "A board-ready scenario description needs to answer three questions: What makes this different from base case? When is liquidity tightest and by how much? What can management do if this materialises? These three elements allow board members to assess the risk and the response."
          },
          {
            question: "AI produces a cash flow forecast narrative that describes a capex project as 'the new headquarters fit-out.' The treasury analyst did not mention this. What should they do?",
            options: [
              "Include it — AI has correctly identified the major capex project from the amount",
              "Remove the description — AI inferred a project name that may be incorrect; only include information you provided",
              "Ask AI to confirm the project name before including it",
              "Flag it as 'management commentary' rather than 'factual description'"
            ],
            correct: 1,
            explanation: "AI sometimes infers descriptive context from amounts or patterns in the data. Treasury documentation must be accurate — any project name, purpose, or business reason that was not explicitly provided must be removed and replaced with the accurate description."
          }
        ],
        applyThisWeek: {
          action: "Use AI to produce the narrative for your next cash flow forecast — provide key metrics, assumptions, and risks, and compare the quality and time taken to your normal process.",
          promptTemplate: "Write a cash flow forecast narrative for [period — e.g. Q3 2026]. Audience: [CFO / board / finance committee]. Professional treasury tone. Structure: 1) Forecast overview: methodology and key assumptions. 2) Inflows: expected total [£X], key categories [operating receipts £X — key drivers; other inflows £X — describe]. 3) Outflows: total [£X], key categories [operating payments £X; capex £X — describe projects; financing £X — describe]. 4) Closing position: forecast [£X], target minimum [£X], headroom [£X]. 5) Key risks to the forecast: [risk 1 — describe and quantify]; [risk 2 — describe and quantify]. Total: 250–300 words.",
          tool: "Claude"
        }
      },
      {
        id: "finance-treasury-l3",
        title: "FX Risk Monitoring and Hedging Commentary with AI",
        duration: 17,
        description: "Use AI to produce FX exposure summaries, hedging programme narratives, and rate movement commentary — communicating currency risk clearly to non-treasury stakeholders.",
        content: `## The FX Communication Challenge

Foreign exchange risk is one of the most difficult treasury topics to communicate clearly. CFOs, board members, and business unit leaders need to understand FX exposure and hedging without a detailed currency derivatives background. AI helps bridge this communication gap — not by providing FX expertise, but by translating treasury data into clear prose.

## FX Exposure Summary

The FX exposure summary describes the organisation's currency exposures, hedged positions, and unhedged risk at a point in time.

\`\`\`
Write an FX exposure summary for inclusion in the monthly treasury report. Audience: CFO and finance committee — professional but not specialist. Include: total transactional FX exposure by currency, hedged amount and percentage for each currency, unhedged position and the P&L sensitivity to a 1% rate movement, and the current hedging programme rationale. Data: EUR exposure: [£X total / £X hedged / £X unhedged / £X P&L sensitivity per 1% move]. USD exposure: [same structure]. [Other currencies as required]. Hedging policy: we hedge [X]% of forecast exposures [X months] forward using [forward contracts / options / natural hedge].
\`\`\`

## Rate Movement Commentary

When FX rates move materially, stakeholders need a clear explanation of the impact on the P&L and balance sheet — and what, if anything, hedging has mitigated.

\`\`\`
Write an FX rate movement commentary for the following situation. Audience: CFO. Cover: the rate movement that occurred, the gross P&L impact before hedging, the amount mitigated by hedging positions, the net P&L impact, and whether any additional hedging action is planned. Rate movement: [currency pair], moved from [rate] to [rate], a [X]% [appreciation / depreciation] against GBP. Gross exposure: [£X]. Hedged amount: [£X at rate X]. Net impact: [£X]. Hedging action: [describe or 'no additional hedging at this time'].
\`\`\`

## Hedging Programme Narrative

When presenting the hedging programme to the board or audit committee, AI helps write the clear rationale explaining what is being hedged, why, using what instruments, and at what cost.

**Key boundary:** AI describes the hedging programme you have designed. It does not advise whether to hedge, what percentage to cover, or what instruments to use. Those are treasury professional decisions.`,
        keyTakeaways: [
          "AI translates FX treasury data into clear prose for non-treasury stakeholders — it does not provide FX expertise or market insight",
          "FX exposure summaries require structured inputs: exposure by currency, hedged amount, unhedged position, and P&L sensitivity",
          "Rate movement commentary must include gross impact, hedging mitigation, net impact, and planned action — in that sequence",
          "Hedging decisions — what to hedge, how much, using which instruments — are treasury professional decisions AI cannot and should not advise on"
        ],
        exercise: {
          title: "FX Exposure Summary and Rate Movement Commentary",
          description: "Use AI to produce an FX summary and one rate movement commentary for your current currency exposures.",
          steps: [
            "Gather your current FX exposure data: exposures by currency, hedged amounts and rates, unhedged positions, and P&L sensitivity per 1% rate move",
            "Identify the most significant rate movement in the past month and the gross and net P&L impact",
            "Open Claude and run the FX exposure summary prompt with your data",
            "Run the rate movement commentary prompt for the most significant rate movement",
            "Review both outputs: verify every number against your treasury system, check that the hedging rationale accurately describes your programme, and remove any AI-generated context you didn't provide"
          ],
          tool: "Claude"
        },
        quiz: [
          {
            question: "A CFO asks the treasury team for a recommendation on whether to increase EUR hedging coverage from 70% to 90%. How should AI be used in this situation?",
            options: [
              "Ask AI to recommend the optimal hedging percentage based on current rate volatility",
              "AI should not be used — hedging coverage decisions are treasury professional judgements based on risk appetite and commercial context",
              "Ask AI to summarise the arguments for and against increased coverage, then make the decision yourself",
              "Use AI to calculate the cost of increasing to 90% coverage and present the options to the CFO"
            ],
            correct: 2,
            explanation: "AI can usefully summarise arguments for and against a hedging decision — drawing out the trade-offs. But the decision itself requires treasury professional judgement about risk appetite, market conditions, cost, and commercial context. Using AI to structure the decision analysis is appropriate; having AI make the decision is not."
          },
          {
            question: "When writing an FX rate movement commentary, what is the correct order of information?",
            options: [
              "Net impact, hedging mitigation, gross exposure, rate movement",
              "Rate movement, gross P&L impact before hedging, hedging mitigation, net P&L impact",
              "Hedging programme rationale, rate movement, P&L impact",
              "Opening rate, closing rate, period change, portfolio impact"
            ],
            correct: 1,
            explanation: "The logical sequence for FX rate movement commentary — rate movement, gross impact, hedging mitigation, net impact — mirrors how a non-treasury stakeholder needs to understand it: what happened, what it would have cost without hedging, how much hedging protected us, and what our actual exposure is."
          },
          {
            question: "AI generates an FX summary stating that the EUR hedging programme 'will protect the company from all EUR/GBP volatility this quarter.' Is this accurate?",
            options: [
              "Yes — a 70% hedge ratio means only 30% is unprotected",
              "No — a hedge ratio below 100% means some unhedged exposure remains; and even fully hedged positions lock in a rate, not protection from all movement",
              "It depends on whether the hedges are forward contracts or options",
              "Yes if the hedges are at-the-money at execution date"
            ],
            correct: 1,
            explanation: "AI sometimes overstates hedging protection. Any claim that hedging 'protects from all' volatility is inaccurate for partial hedges — and even full hedging locks in a rate rather than eliminating exposure. Treasury commentary must be precise about hedge coverage and residual exposure."
          }
        ],
        applyThisWeek: {
          action: "Produce an AI-assisted FX exposure summary for your current currency positions and share it with your CFO as part of the next treasury update — track whether the clarity of the communication improves.",
          promptTemplate: "Write an FX exposure summary for the monthly treasury report. Audience: CFO and finance committee. Professional tone — accessible to non-specialists. For each currency: total transactional exposure [£X], hedged amount [£X] at average rate [rate], unhedged position [£X], and estimated P&L sensitivity per 1% unfavourable rate movement [£X]. Currencies: [EUR: data; USD: data; other: data]. Hedging programme overview: we hedge [X]% of forecast exposures [X months] forward using [instruments]. The programme rationale is [describe — e.g. 'to reduce P&L volatility on confirmed contracted revenues']. Net unhedged exposure summary: [£X total across all currencies].",
          tool: "Claude"
        }
      },
      {
        id: "finance-treasury-l4",
        title: "Treasury Reporting and Stakeholder Communication with AI",
        duration: 16,
        description: "Use AI to build a systematic, high-quality treasury reporting workflow — from monthly position reports to board treasury papers and bank relationship communications.",
        content: `## Treasury Reporting Demands Are Increasing

Boards and audit committees expect more detailed and more frequent treasury reporting than a decade ago. Banking relationships require proactive communication. Regulatory reporting is increasing in scope. At the same time, most treasury teams are not growing. AI allows teams to maintain quality across a higher reporting volume without proportional headcount growth.

## The Monthly Treasury Report Structure

A well-structured monthly treasury report covers:
1. Cash and liquidity position
2. Debt and facilities summary
3. FX exposure and hedging
4. Interest rate risk
5. Key upcoming events (maturities, renewals, debt service)
6. Covenant compliance summary

AI produces the narrative for each section from structured data inputs. The discipline is preparing the inputs correctly before running the prompts.

## Board Treasury Paper

The quarterly board treasury paper is a higher-stakes document — reviewed by non-executive directors who may have limited treasury background. The writing must be clearer, the explanations more accessible, and the strategic context more prominent.

\`\`\`
Write a board treasury paper for [Quarter] [Year]. Audience: non-executive directors and CEO — not treasury specialists. Cover: 1) Cash and liquidity summary — current position, headroom, and trend. 2) Key risk position — FX and interest rate exposure and hedging coverage. 3) Debt structure and maturity profile — next significant event. 4) Covenant compliance — current position relative to covenants. 5) Outlook and actions — any material decisions or risks in the next quarter. Each section: 100 words maximum. Plain English throughout — define any technical terms used. Data: [paste key metrics for each section].
\`\`\`

## Bank Relationship Communication

Treasury regularly communicates with banking relationships — facility utilisation updates, waiver requests, amendment discussions, and relationship updates. These are structured communications where professional tone and precision matter.

\`\`\`
Draft a letter to our relationship bank regarding [subject]. Tone: professional and courteous. Include: [summary of the situation or request], [relevant financial data or covenant position], [the specific request or action required from the bank], and [timeline]. Sender: [treasury director name and title]. Recipient: [bank relationship manager name, bank name].
\`\`\`

## Building Your Treasury Communication Calendar

Map out the recurring treasury reports and communications across the year — monthly reports, board papers, bank reviews, regulatory submissions — and build AI prompt templates for each. This creates a reproducible communication infrastructure that maintains quality as reporting volume increases.`,
        keyTakeaways: [
          "AI allows treasury teams to maintain reporting quality across higher volumes without proportional headcount growth",
          "Board treasury papers require a different standard — plain English, accessible to non-specialists, strategic context more prominent than technical detail",
          "Bank relationship communications benefit from AI first drafts: professional tone, precise financial detail, and clear request or action",
          "A treasury communication calendar with AI prompt templates per report type creates a reproducible infrastructure across the year"
        ],
        exercise: {
          title: "Build Your Treasury Report Template Library",
          description: "Create AI prompt templates for your three most frequently produced treasury reports.",
          steps: [
            "List your three most frequent treasury reports (e.g. monthly position report, board treasury paper, bank utilisation update)",
            "For each, define the required sections, the data inputs needed, and the target audience",
            "Open Claude and draft a prompt template for each report — with clear structure and placeholders for variable data",
            "Test each template with one month of real data — review output quality and note what needed editing",
            "Refine the templates until the output is consistently at your reporting standard, then store in a shared treasury team document"
          ],
          tool: "Claude"
        },
        quiz: [
          {
            question: "What is the primary difference in writing standard between a monthly internal treasury report and a quarterly board treasury paper?",
            options: [
              "The board paper should use more detailed financial analysis",
              "The board paper requires plain English accessible to non-specialists, strategic context, and a higher standard of clarity and precision",
              "The monthly report should be longer to cover all treasury activity",
              "The board paper should be prepared by a more senior team member"
            ],
            correct: 1,
            explanation: "Board papers must be accessible to non-executive directors who are not treasury specialists. This means plain English, defined technical terms, and strategic context at least as prominent as technical data. The monthly internal report can assume a more financially literate internal audience."
          },
          {
            question: "A treasurer needs to request a short-term covenant waiver from their relationship bank. How should AI assist?",
            options: [
              "AI should negotiate the waiver terms on the treasurer's behalf",
              "AI should draft the formal waiver request letter with the relevant financial data and the specific request, for the treasurer's review and signature",
              "AI should advise on whether to request a waiver or restructure the facility",
              "AI is not appropriate for bank communications — these require entirely manual drafting"
            ],
            correct: 1,
            explanation: "Drafting a waiver request letter — describing the situation, providing the relevant financial data, and stating the specific request clearly — is a writing task AI handles well. The decision to request a waiver, the negotiation, and the signature are all treasury professional responsibilities."
          },
          {
            question: "Why does building a treasury communication calendar with AI prompt templates create long-term value?",
            options: [
              "It eliminates the need for treasury staff to understand what the reports contain",
              "It allows AI to send reports automatically without human involvement",
              "It creates a reproducible infrastructure that maintains consistent quality as reporting volume increases and as team members change",
              "It reduces the number of reports required by streamlining reporting into a single template"
            ],
            correct: 2,
            explanation: "A template library with tested prompts ensures that every report — regardless of who produces it — follows the same structure and quality standard. This is especially valuable when team members change or when reporting volume increases without corresponding headcount growth."
          }
        ],
        applyThisWeek: {
          action: "Build an AI prompt template for one treasury report you produce every month — test it against your last three months of data and refine until the output is consistently at your standard.",
          promptTemplate: "Write a [report type — e.g. monthly treasury position report / board treasury paper / bank utilisation update] for [Period]. Audience: [specific audience]. Professional treasury tone — [plain English for non-specialists / technical treasury language for internal finance audience]. Sections: 1) [Section name]: [describe what to cover, provide data]. 2) [Section name]: [describe, data]. 3) [Section name]: [describe, data]. 4) Key events or actions in the next [period]: [describe upcoming material items]. Maximum length per section: [word count]. Flag any section where you need additional data to comment accurately.",
          tool: "Claude"
        }
      }
    ]
  },

  'cfo': {
    title: "AI for CFO & Finance Leaders",
    description: "Lead your finance organisation's AI adoption with the right strategic framework — from prioritising use cases and building the finance AI operating model to governing risk, ensuring compliance, and communicating AI strategy to the board.",
    lessons: [
      {
        id: "finance-cfo-l1",
        title: "The CFO's AI Strategy: Priorities, Risks, and ROI",
        duration: 16,
        description: "Build a structured CFO-level AI strategy for your finance function — identifying the highest-value use cases, quantifying the ROI case, and managing the risks specific to finance and accounting.",
        content: `## The CFO's AI Mandate

Finance leaders face a specific version of the AI adoption challenge. The productivity case for AI in finance is compelling — manual processes, high-volume reporting, and document-intensive workflows are all AI-addressable. But finance also carries specific risks: data accuracy, regulatory compliance, audit integrity, and fiduciary responsibility. Getting the balance right is the CFO's strategic task.

## Where AI Has the Clearest ROI in Finance

**FP&A commentary and reporting.** Variance commentary, management pack narrative, and board pack production are high-volume, time-consuming writing tasks. AI accelerates these significantly with manageable risk.

**Accounts payable and receivable.** AP/AR correspondence, collections communications, and process documentation are structured writing tasks with clear AI value.

**Documentation and audit preparation.** Journal entry descriptions, reconciliation narratives, policy notes, and workpaper frameworks benefit from AI-driven consistency.

**Treasury reporting.** Cash position summaries, FX exposure reports, and board treasury papers are recurring structured communications AI accelerates.

## Quantifying the ROI Case

A practical ROI framework for finance AI:
- **Time saved per task × frequency:** Estimate hours saved per month across the highest-use cases
- **Quality improvement value:** Fewer revision cycles, more consistent documentation, reduced audit finding risk
- **Reallocation value:** Hours freed from mechanical writing redirected to analysis, insight, and strategic support

\`\`\`
Help me build an ROI case for AI adoption in a finance function. Team size: [number]. Key functions: [FP&A, accounting, treasury, etc.]. Primary time-consuming tasks: [list your top 5 manual or writing-intensive tasks]. For each task, help me estimate: weekly time spent, the proportion AI could handle as first-draft, and the realistic time saving after human review. Then summarise the business case in terms suitable for a board investment approval.
\`\`\`

## The Finance-Specific Risk Map

Before adopting AI in finance, map the risks that matter most in this function:
- **Data accuracy risk:** AI works from data you provide — input errors become output errors
- **Audit integrity risk:** AI-generated documentation must meet audit standards
- **Regulatory risk:** AI cannot interpret regulations reliably for specific transactions
- **Confidentiality risk:** Sensitive financial data input into public AI tools`,
        keyTakeaways: [
          "Finance AI ROI is clearest in FP&A commentary, AP/AR correspondence, documentation, and treasury reporting — high-volume, time-consuming writing tasks",
          "Quantify the ROI case in terms of time saved per task times frequency, quality improvement, and reallocation of hours to higher-value analysis",
          "Finance-specific risks — data accuracy, audit integrity, regulatory interpretation, and data confidentiality — require explicit governance before adoption",
          "The CFO's role is to set the strategic priorities, govern the risks, and build the infrastructure — not to be the AI practitioner"
        ],
        exercise: {
          title: "Finance AI ROI Assessment",
          description: "Build a structured ROI case for AI adoption in your finance function using the framework from this lesson.",
          steps: [
            "List your five most time-consuming recurring writing or documentation tasks across the finance function",
            "For each, estimate: hours spent per week, the proportion AI could produce as a usable first draft, and the realistic time saving after human review",
            "Open Claude and run the ROI case prompt from the lesson with your specific team and task data",
            "Review Claude's output — adjust the estimates based on your knowledge of your team's actual workflows",
            "Produce a one-page business case for AI investment, suitable for board or executive team approval"
          ],
          tool: "Claude"
        },
        quiz: [
          {
            question: "What is the most important consideration before inputting financial data into a public AI tool?",
            options: [
              "Whether the AI tool is fast enough for finance tasks",
              "Whether sensitive financial data, customer information, or strategic data can be safely input given the tool's data handling policies",
              "Whether the AI tool has been used by other finance teams",
              "Whether the output will be accurate enough for financial reporting"
            ],
            correct: 1,
            explanation: "Data confidentiality is a critical finance-specific AI risk. Before inputting any financial data into a public AI tool, the CFO must ensure the organisation's data policies permit it — particularly for sensitive financial data, customer information, and strategic figures."
          },
          {
            question: "Which of the following best describes the CFO's role in the finance function's AI adoption?",
            options: [
              "The CFO should become proficient in prompt engineering to lead by example",
              "The CFO should set strategic priorities, govern the risks, and build the infrastructure — not be the AI practitioner",
              "The CFO should delegate all AI decisions to the head of FP&A",
              "The CFO should wait until AI tools are more mature before committing to adoption"
            ],
            correct: 1,
            explanation: "The CFO's role in AI adoption is strategic, not operational. Setting the priority use cases, defining governance rules, managing risk, and building the organisational capability are CFO responsibilities — the practitioner expertise sits with the finance team."
          },
          {
            question: "A CFO presents an AI investment case to the board. Which ROI framing is most compelling?",
            options: [
              "The number of AI prompts run per month demonstrates active adoption",
              "Time saved per task multiplied by frequency, quality improvement value, and hours redirected to higher-value analysis",
              "The cost per AI licence compared to a comparable headcount cost",
              "The percentage of finance tasks that can be fully automated"
            ],
            correct: 1,
            explanation: "The most compelling ROI frame combines quantified time savings, measurable quality improvement (fewer revision cycles, reduced audit findings), and the strategic value of redirecting those hours to analysis and insight. This connects AI investment to finance function strategic value, not just cost reduction."
          }
        ],
        applyThisWeek: {
          action: "Produce a one-page AI investment case for your finance function this week — including the five highest-value use cases, the estimated ROI, and your governance framework.",
          promptTemplate: "Build an ROI case for AI adoption in a finance function of [size] people covering [functions]. Primary time-consuming tasks: [list 5 tasks with approximate weekly hours]. For each task: estimate the percentage AI could handle as a usable first draft, the realistic time saving after human review, and the annual hour saving across the team. Then: summarise the business case in 200 words for board presentation, covering productivity gain, quality improvement, and the strategic value of redirected analyst time. Include one paragraph on the governance framework that would mitigate the main risks.",
          tool: "Claude"
        }
      },
      {
        id: "finance-cfo-l2",
        title: "AI for Board Packs, Investor Decks, and Executive Narrative",
        duration: 18,
        description: "Use AI to produce clearer, faster board packs, investor communications, and executive financial narrative — elevating the communication quality of the finance function without increasing team workload.",
        content: `## Financial Communication Is an Underrated CFO Value Driver

The quality of financial communication — how clearly the finance story is told in the board pack, how compellingly the investment case is presented to investors, how precisely the CFO articulates the strategic financial position — is a direct driver of stakeholder confidence. AI accelerates the mechanical writing that currently limits this quality.

## The Board Pack Challenge

Most board packs are produced under time pressure, by teams that are also completing the close. The result: narrative that is rushed, inconsistent, and often less clear than the underlying analysis deserves. AI helps by accelerating the drafting layer — allowing the finance team to spend more time on editorial quality rather than blank-page generation.

**The CFO's narrative section — the highest-value piece:**

\`\`\`
Write the CFO's board narrative for [Month/Quarter] [Year]. Audience: board of directors — mixed finance and non-finance background. 300–400 words. Cover: 1) The headline financial performance versus plan and why. 2) The top two business insights from this period's results. 3) The most significant risk or opportunity in the outlook. 4) One strategic or operational item requiring board input or decision. Tone: confident, direct, and clear — this is the CFO speaking with authority. Data and context: [paste your key metrics and the business context you want to convey].
\`\`\`

## Investor Communications

Investor communications — results commentaries, investor day scripts, analyst Q&A preparation — require precision, regulatory compliance, and a clear financial narrative. AI drafts the structural elements; the CFO adds the market judgement and the strategic emphasis.

For analyst Q&A preparation:
\`\`\`
Prepare a set of 10 likely analyst questions for our [results / investor day] and draft suggested responses. Context: our reported results are [brief summary]. Key messages we want to convey: [list]. Sensitive areas we need to address carefully: [list]. For each question: the likely question and a 75-word suggested response that is accurate, concise, and aligned with our key messages.
\`\`\`

## The Editing Standard for External Comms

External financial communications — anything that goes to investors, analysts, or regulators — require a more rigorous review than internal documents. Every number must be cross-referenced to signed-off management accounts. Every forward-looking statement must be reviewed for regulatory compliance. AI produces the structure and first draft; the review standard is higher than for internal reporting.`,
        keyTakeaways: [
          "The CFO's board narrative section is the highest-value piece in the pack — AI accelerates drafting so more time goes to editorial quality",
          "Investor communications benefit from AI structural drafting — but every forward-looking statement requires regulatory compliance review",
          "Analyst Q&A preparation with AI produces a question set and suggested responses that the CFO team refines and rehearses",
          "External financial communications require a higher review standard than internal reporting — every number cross-referenced, every claim verified"
        ],
        exercise: {
          title: "CFO Board Narrative Draft",
          description: "Use AI to produce the CFO's board narrative for your next board meeting and compare it to your normal drafting process.",
          steps: [
            "Identify the key financial messages from your most recent reporting period: headline performance, top insight, key risk or opportunity, and any item requiring board input",
            "Prepare the supporting data: actuals versus plan for key metrics, and two or three business context points the board needs to understand",
            "Open Claude and run the CFO board narrative prompt from the lesson with your data and context",
            "Edit the output: sharpen the CFO voice, ensure the strategic emphasis is correct, and verify every number against your signed-off management accounts",
            "Compare the final edited time to your normal process — note where AI saved time and where editorial judgement was still entirely human"
          ],
          tool: "Claude"
        },
        quiz: [
          {
            question: "What is the most important editorial decision the CFO makes when AI drafts the board narrative?",
            options: [
              "Whether the word count is within the target range",
              "Which financial messages are the most important business story — strategic emphasis that AI cannot determine",
              "Whether the language style matches prior board papers",
              "Whether the narrative includes the correct accounting terminology"
            ],
            correct: 1,
            explanation: "Strategic emphasis — deciding which financial performance, risk, or opportunity is the most important message for the board at this specific moment — requires the CFO's commercial judgement, market context, and knowledge of board priorities. AI drafts clearly once you make those decisions."
          },
          {
            question: "An investor relations team uses AI to draft a results commentary. What additional review step is mandatory before distribution?",
            options: [
              "Running a spell-check",
              "Having a second AI tool review the draft",
              "Legal and regulatory compliance review, and cross-referencing every financial figure to signed-off management accounts",
              "Board approval of the specific wording"
            ],
            correct: 2,
            explanation: "Results commentaries are market-sensitive communications. Every number must be cross-referenced to signed-off accounts, and every forward-looking statement must be reviewed for regulatory compliance. This review is mandatory — AI produces the draft, compliance review validates it."
          },
          {
            question: "When using AI to prepare analyst Q&A responses, what must the CFO team do before using any suggested response?",
            options: [
              "Translate the response from AI's language into the CFO's personal speaking style and verify accuracy",
              "Ask AI to generate three alternative versions of each response",
              "Have the IR team approve the responses without CFO involvement",
              "Compare the responses to what competitors said in their last results call"
            ],
            correct: 0,
            explanation: "AI-generated Q&A responses are starting points — they need to reflect the CFO's actual voice, the organisation's specific situation, and accurate financial data. The team refines for voice accuracy and factual precision; the CFO rehearses and owns the final responses."
          }
        ],
        applyThisWeek: {
          action: "Use AI to draft the CFO board narrative for your next board meeting — spend the time you save on editorial sharpening rather than blank-page drafting.",
          promptTemplate: "Write the CFO's board narrative for [Month or Quarter] [Year]. Audience: board of directors with mixed finance and non-finance background. CFO voice — confident and direct. 300–400 words. Structure: 1) Headline financial performance: [actual versus plan, key metric]. Why: [business context]. 2) Top insight from this period's results: [what the numbers reveal about the business]. 3) Key risk or opportunity in the outlook: [describe and quantify if possible]. 4) Item requiring board input or decision: [describe the decision or discussion point]. Data: [paste key financial metrics for the period].",
          tool: "Claude"
        }
      },
      {
        id: "finance-cfo-l3",
        title: "Building the Finance AI Operating Model",
        duration: 18,
        description: "Design the operating model your finance function needs to use AI systematically — covering capability building, process integration, tool selection, and how to measure whether AI is genuinely improving finance performance.",
        content: `## The Finance AI Operating Model

Most finance functions adopt AI tools one at a time, driven by individual enthusiasts, without a coherent operating model. This produces inconsistent use, variable quality, and no ability to scale. A finance AI operating model defines: what tools are used for what purposes, how capability is built, where human review gates sit, and how success is measured.

## Four Building Blocks of the Finance AI Operating Model

**1. Tool and Use Case Architecture**

Define which AI tools are approved for which use cases. Separate public tools (where data input must be controlled) from enterprise tools (where data security is managed). Map the primary finance use cases to approved tools.

**2. Capability Framework**

Finance AI capability has three tiers:
- **Foundation:** All finance staff understand what AI does, how to write effective prompts, and the governance rules. Delivered through a half-day workshop.
- **Role-specific:** FP&A, accounting, and treasury teams each have AI workflows for their primary tasks. Delivered through function-specific practice sessions.
- **Advanced:** Finance managers and business partners use AI for analysis, stakeholder communication, and strategic tasks. Ongoing development.

**3. Process Integration Points**

Map where AI fits in existing finance processes — at which stages AI assists, where human review is required, and what the approval gate is before output is used.

**4. Performance Measurement**

\`\`\`
Help me design a performance measurement framework for finance function AI adoption. We want to measure: productivity improvement, output quality change, and the reallocation of team time to higher-value activities. Our finance team covers: [functions]. Primary AI use cases: [list]. Suggest specific metrics, data collection methods, and a reporting cadence that would allow us to assess whether AI is delivering value without creating new risks.
\`\`\`

## The CFO as AI-Literate Leader

You don't need to be an AI practitioner — but you do need to be literate enough to evaluate claims, ask good questions, and set appropriate expectations. The most important CFO AI skills: understanding what AI can and cannot do, knowing which use cases have the clearest evidence of finance value, and being able to interrogate vendor claims critically.`,
        keyTakeaways: [
          "A finance AI operating model has four building blocks: tool architecture, capability framework, process integration, and performance measurement",
          "Capability building requires three tiers: foundation for all staff, role-specific for each function, and advanced for finance managers and business partners",
          "Performance measurement should track productivity improvement, output quality, and time reallocation — not just AI tool adoption rates",
          "CFO AI literacy means understanding what AI can and cannot do, not being a prompt engineering practitioner"
        ],
        exercise: {
          title: "Design Your Finance AI Operating Model",
          description: "Produce a one-page finance AI operating model covering the four building blocks for your specific finance function.",
          steps: [
            "List your approved AI tools (or tools under consideration) and the specific use cases each is approved for",
            "Sketch your three-tier capability framework: what foundation, role-specific, and advanced levels cover for your team",
            "Map the top three finance processes where AI will be integrated — identifying the AI stage and the human review gate for each",
            "Open Claude and run the performance measurement framework prompt from the lesson for your specific finance context",
            "Combine all four building blocks into a one-page operating model document — share with your finance leadership team for input"
          ],
          tool: "Claude"
        },
        quiz: [
          {
            question: "What is the most important distinction between public AI tools and enterprise AI tools in a finance context?",
            options: [
              "Enterprise tools are more accurate and produce better finance output",
              "Public tools require data input controls because financial data input to public tools may be used for model training or stored externally",
              "Enterprise tools are always more expensive than public tools",
              "Public tools cannot be used for professional finance tasks"
            ],
            correct: 1,
            explanation: "The critical distinction is data handling. Public AI tools may store, process, or use inputs in ways that are incompatible with financial data confidentiality requirements. Enterprise tools typically have explicit data protection terms. The CFO must understand this distinction before approving tool use with financial data."
          },
          {
            question: "What should a finance AI performance measurement framework track — beyond AI tool adoption rates?",
            options: [
              "The number of prompts run by each team member per month",
              "The AI tool with the highest user satisfaction score",
              "Productivity improvement per task, output quality change, and reallocation of time to higher-value activities",
              "The percentage of finance tasks that are fully automated"
            ],
            correct: 2,
            explanation: "Adoption rates measure input, not outcome. The right metrics are: how much faster are tasks being completed, has output quality improved or declined, and are the hours saved being redirected to analysis and strategic support — the activities that create the most CFO function value."
          },
          {
            question: "A finance technology vendor claims their AI tool will reduce the monthly close by 40%. How should a CFO evaluate this claim?",
            options: [
              "Accept the claim if the vendor provides reference customers",
              "Ask for peer-reviewed evidence of the specific close reduction in comparable finance functions",
              "Request to pilot the tool for one close cycle and measure the actual time reduction against a documented baseline",
              "Compare the claim to other vendors' claims and choose the highest projected saving"
            ],
            correct: 2,
            explanation: "Vendor claims should be tested empirically in your specific context. A piloted close cycle with documented baseline measurement is the only reliable way to assess actual time reduction for your finance function's specific workflows, systems, and complexity."
          }
        ],
        applyThisWeek: {
          action: "Draft your finance AI operating model this week — one page covering tool architecture, capability framework, process integration points, and success metrics.",
          promptTemplate: "Help me design a finance function AI operating model. Finance team: [size and functions]. AI tools in use or under consideration: [list]. Primary use cases: [list top 5]. Design: 1) Tool and use case architecture — which tools are approved for which purposes. 2) Three-tier capability framework — what foundation, role-specific, and advanced levels cover. 3) Process integration — for our top 3 finance processes, where AI assists and where human review is required. 4) Performance metrics — specific measures for productivity, quality, and time reallocation. Present as a structured one-page operating model.",
          tool: "Claude"
        }
      },
      {
        id: "finance-cfo-l4",
        title: "AI Governance, Compliance, and Risk in Finance",
        duration: 17,
        description: "Build the governance framework your finance function needs to use AI responsibly — covering data handling, audit compliance, regulatory risk, and how to communicate AI governance to auditors and the board.",
        content: `## Finance AI Governance Is a CFO Responsibility

Finance operates under regulatory, audit, and fiduciary obligations that most other functions do not face. The governance of AI in finance is not an IT function — it is a CFO accountability. Getting it wrong creates audit findings, regulatory exposure, and reputational risk that the CFO owns.

## The Finance-Specific Governance Requirements

**Data confidentiality.** Financial data — actuals, forecasts, valuations, M&A-sensitive information — must not be input into public AI tools without explicit policy approval. Your data handling policy must address AI tools specifically.

**Audit trail integrity.** AI-generated documents that form part of the audit trail — reconciliation narratives, journal entry descriptions, workpaper frameworks — must be reviewed and approved by a qualified accountant. The AI provenance of the document must be either disclosed or the human reviewer must take full ownership of the content.

**Regulatory compliance.** AI cannot reliably interpret regulatory requirements for specific transactions. Finance professionals retain responsibility for all regulatory judgements — AI assists with documentation, not interpretation.

**Segregation of duties.** AI does not create new segregation of duties risks by itself, but the controls around AI use must be documented and auditable.

## Communicating AI Governance to Auditors

Your external auditors will increasingly ask about AI use in the finance function. Be prepared to explain:
- Which finance processes have AI involvement
- Where human review gates sit and who is responsible
- How you ensure the accuracy of AI-assisted documentation
- Whether AI-generated documents are disclosed or fully human-reviewed and owned

\`\`\`
Help me prepare a briefing for our external auditors on our finance function AI governance. We use AI for: [list use cases]. Our governance framework includes: [human review requirements, data input rules, documentation standards]. Questions I anticipate from auditors: [list]. Draft: a 300-word governance summary, and suggested responses to the three most likely auditor questions about AI use in our finance processes.
\`\`\`

## The Governance Policy Document

A finance AI governance policy should cover: approved tools and use cases, data input rules, human review requirements by document type, quality assurance standards, and the audit or review cadence. This document should be reviewed by legal and compliance, and approved by the CFO and Audit Committee.`,
        keyTakeaways: [
          "Finance AI governance is a CFO accountability — regulatory, audit, and fiduciary obligations make this non-delegable to IT",
          "Data confidentiality policy must explicitly address AI tools — financial data in public tools creates confidentiality and regulatory risk",
          "Prepare for external auditor questions on AI use: which processes, where human gates sit, how accuracy is ensured, and how AI involvement is disclosed",
          "The finance AI governance policy requires legal and compliance review and Audit Committee approval — not just internal sign-off"
        ],
        exercise: {
          title: "Finance AI Governance Policy Draft",
          description: "Produce a finance AI governance policy draft covering the key governance requirements for external auditor review.",
          steps: [
            "List all the finance processes where AI is currently used or being considered — note the specific tool and the output type for each",
            "Write down your current data input rules: what financial data can and cannot be input into public AI tools",
            "Identify the human review requirements for each document type — who reviews, at what stage, and what approval means",
            "Open Claude and run the auditor briefing prompt from the lesson with your specific governance context",
            "Draft a one-page governance policy covering: approved use cases, data rules, review requirements, and quality assurance standard — then share with your legal and compliance team for review"
          ],
          tool: "Claude"
        },
        quiz: [
          {
            question: "A new external auditor asks: 'Does your finance team use AI, and if so, how do you ensure the accuracy of AI-assisted documents?' What is the correct CFO response?",
            options: [
              "Confirm that AI is not used in the finance function",
              "Explain which processes use AI, where human review gates sit, how accuracy is verified, and how AI involvement is managed in audit-relevant documents",
              "Refer the auditor to the IT team for AI governance information",
              "State that AI use is commercially confidential and cannot be disclosed"
            ],
            correct: 1,
            explanation: "External auditors have legitimate interest in AI use within finance processes. The correct response is transparent and governance-focused: explain which processes use AI, the human review requirements, the accuracy verification steps, and how AI involvement is handled in audit-relevant documents."
          },
          {
            question: "An FP&A team member inputs this month's full management accounts figures into a free public AI tool to get commentary assistance. What risk has this created?",
            options: [
              "No risk — AI tools are generally secure",
              "Data confidentiality risk — financial figures that may be market-sensitive or subject to confidentiality obligations have been input into a system with undefined data handling",
              "Audit risk only — auditors may ask about the source of the commentary",
              "Model risk — the AI may produce commentary that contains errors"
            ],
            correct: 1,
            explanation: "Inputting management accounts figures — which may include unreported performance data, M&A-sensitive information, or regulatory-restricted data — into a public AI tool creates data confidentiality risk. The finance AI governance policy must address this specifically, with clear rules on what financial data may and may not be input into which tool types."
          },
          {
            question: "What is the minimum governance requirement before a CFO can approve the use of AI in producing audit-relevant documentation?",
            options: [
              "A team member has tested the AI tool and found the output to be accurate",
              "A defined human review and approval process, documented data input rules, and Audit Committee awareness of AI use in audit-relevant processes",
              "External auditor pre-approval of the specific AI tool",
              "A vendor certification that the AI tool meets financial services accuracy standards"
            ],
            correct: 1,
            explanation: "The minimum governance requirements for AI in audit-relevant finance documentation are: a defined human review process with clear accountability, documented data input controls, and Audit Committee awareness. The committee that oversees audit integrity should know that AI is involved in producing documents it relies upon."
          }
        ],
        applyThisWeek: {
          action: "Draft a finance AI governance policy this week and schedule a review with your legal, compliance, and external audit contacts before finalising.",
          promptTemplate: "Draft a finance function AI governance policy. Audience: internal finance team, legal and compliance reviewers, and external auditors. Sections: 1) Approved AI tools and permitted use cases — [list tools and approved uses]. 2) Data input rules — what financial data may and may not be input into [public tools / enterprise tools]. 3) Human review requirements by document type: [list document types with review owner and approval standard]. 4) Quality assurance standard — how AI-assisted output is verified before use. 5) Audit and review cadence — how compliance with this policy will be monitored. 6) Policy owner and approval: [CFO name, Audit Committee, date of approval]. Professional tone — suitable for inclusion in the finance policy framework.",
          tool: "Claude"
        }
      }
    ]
  }
}
