import type { Track } from '../types'

export const legalTrack: Track = {
  id: 'legal',
  title: 'AI for Legal & Compliance',
  tagline: 'Review faster, research deeper, and draft with precision using AI',
  description:
    'A practical curriculum for legal professionals and compliance officers who want to use AI to accelerate document review, sharpen legal research, and scale compliance monitoring — while maintaining the rigour and confidentiality their work demands.',
  color: '#6366F1',
  level: 'beginner',
  modules: [
    {
      id: 'legal-m1',
      title: 'AI Fundamentals for Legal Professionals',
      description:
        'Understand how AI actually works, which tools are safe and effective for legal work, and how to build a compliant AI workflow from day one.',
      lessons: [
        {
          id: 'legal-m1-l1',
          title: 'What AI Means for Legal Work',
          duration: 15,
          description:
            'Cut through the hype and understand what large language models can and cannot do in a legal context — and why that distinction matters for your practice.',
          content: `## AI in the Legal Profession: The Honest Picture

AI tools like Claude, ChatGPT, and specialised legal AI platforms are large language models (LLMs). They generate text by predicting likely next words based on patterns in billions of documents. That simple fact explains both their remarkable utility for legal work and their very real limitations.

## What LLMs Are Genuinely Useful For

- **First-draft generation.** Drafting a non-disclosure agreement, a memo, or a client communication starts with AI producing a solid foundation. You refine, not create from scratch.
- **Summarisation.** A 200-page contract can be summarised into key commercial terms in minutes. A deposition transcript becomes a structured fact summary.
- **Pattern recognition in text.** AI can scan dozens of contracts for a specific clause type, flag non-standard language, or identify missing provisions across a document set.
- **Research starting points.** AI can outline the legal landscape on an issue, surface relevant doctrines, and suggest search terms for primary source research.

## What LLMs Cannot Do

- **They cannot cite reliably.** AI tools hallucinate case citations — generating plausible-looking references to cases that don't exist or that say something entirely different. Never cite a case without verifying it independently.
- **They do not know your jurisdiction's current law.** Training data has a cutoff date. Recent statutory changes, new regulations, and recent case law may not be reflected.
- **They are not privilege-aware.** The AI doesn't know which information is privileged or confidential unless you explicitly design your prompts and workflows to protect it.
- **They cannot exercise legal judgment.** Risk assessment, strategy, and advice require human legal reasoning grounded in context the AI cannot fully understand.

## The Mental Model That Helps

Think of AI as a very well-read paralegal who works at extraordinary speed but must never be sent to court alone. They can do the research and drafting; you review, verify, and take professional responsibility for everything that leaves your department.

## Practical Starting Point

Begin with tasks where errors are catchable before they cause harm: summarising documents you've already read, drafting internal communications, or generating initial clause checklists for your own review. Build confidence before using AI on higher-stakes external documents.`,
          keyTakeaways: [
            'LLMs predict text — they do not retrieve law or exercise legal judgment',
            'AI hallucinations are a documented risk: always verify case citations and statutory references',
            'Use AI for drafting, summarising, and pattern recognition — not for final legal conclusions',
            'Start with lower-stakes internal tasks before applying AI to client-facing work',
            'Confidentiality must be actively managed — it is not automatic',
          ],
          exercise: {
            title: 'Capability Calibration: Three Legal Tasks',
            description:
              'Run three prompts to discover first-hand where AI adds value and where it requires caution.',
            steps: [
              'Open Claude or ChatGPT in a new session',
              'Prompt 1 — Summarisation: Paste a short contract clause and ask "Summarise the key obligations and any unusual terms in this clause." Assess accuracy.',
              'Prompt 2 — Hallucination test: Ask "What did the UK Supreme Court hold in [make up a plausible case name]?" Note whether the AI fabricates a plausible-sounding but false answer.',
              'Prompt 3 — Drafting: Ask "Draft a short non-disclosure agreement clause covering mutual confidentiality obligations for a software vendor relationship." Identify what a lawyer would need to change.',
              'Write down one thing AI did well and one thing that required your professional judgment to catch.',
            ],
            tool: 'Claude',
          },
          quiz: [
            {
              question: 'Which of the following is the most significant risk when using AI for legal research?',
              options: [
                'AI tools are too slow for practical legal research',
                'AI may generate citations to cases that do not exist or misrepresent holdings',
                'AI cannot understand legal terminology',
                'AI tools are too expensive for law firms',
              ],
              correct: 1,
              explanation:
                'Hallucinated case citations are a well-documented risk with LLMs. The AI generates plausible-looking references with correct formatting, but the cases may not exist or may say the opposite of what is claimed. Every citation must be verified in an authoritative legal database.',
            },
            {
              question: 'Which of the following tasks is AI best suited to assist with?',
              options: [
                'Providing final legal advice to a client on a complex regulatory matter',
                'Generating a first draft of a non-disclosure agreement for lawyer review',
                'Replacing independent verification of case law',
                'Automatically identifying all privileged communications in a document set',
              ],
              correct: 1,
              explanation:
                'AI excels at generating first drafts that a qualified lawyer then reviews and refines. This is the highest-value use case: the AI handles the blank page problem while the lawyer applies professional judgment to the output.',
            },
            {
              question: 'Why is confidentiality management important when using AI tools in legal work?',
              options: [
                'AI tools automatically identify and protect privileged content',
                'Client data entered into some AI tools may be used for model training or accessible to third parties',
                'Confidentiality is only relevant for external AI tools, not internal ones',
                'There are no confidentiality risks if you use a paid AI subscription',
              ],
              correct: 1,
              explanation:
                'Some AI tools use submitted content to improve their models unless enterprise agreements with data protection controls are in place. Legal professionals must understand their firm\'s approved tools and data handling agreements before inputting any client or sensitive matter information.',
            },
          ],
        },
        {
          id: 'legal-m1-l2',
          title: 'Choosing the Right AI Tools for Legal',
          duration: 18,
          description:
            'Navigate the growing landscape of legal AI tools — from general-purpose models to specialist platforms — and understand what questions to ask before adopting any tool.',
          content: `## Two Categories of Legal AI

**General-purpose LLMs** (Claude, ChatGPT, Gemini) excel at drafting, summarisation, and analysis. They are flexible and powerful but have no built-in legal database access.

**Legal-specific platforms** (Harvey, Clio Duo, Westlaw AI, LexisNexis+AI) combine LLM capability with legal database integration. They offer citation checking, jurisdiction awareness, and practice management integration.

## What to Evaluate Before Adopting Any Tool

### Data Governance
- Where is data processed and stored?
- Is your input used to train the model?
- Are there enterprise data protection agreements available?
- What certifications does the vendor hold (SOC 2, ISO 27001)?

### Accuracy and Hallucination Risk
- Does the tool cite its sources?
- Can you verify outputs against authoritative databases?
- How does the vendor handle known hallucination risks?

### Integration
- Does it connect to your matter management system?
- Can it access documents from your DMS without manual uploads?
- How does it handle billing and time recording?

## The General-Purpose Workflow

For most legal teams without a specialist platform, a practical workflow is:
1. Use Claude or ChatGPT for drafting, analysis, and summarisation
2. Verify all legal references in Westlaw, LexisNexis, or official government sources
3. Apply your professional judgment to AI outputs before any client use

## What to Avoid

- Using free-tier tools for client-related work (data protection issues)
- Treating AI-generated research as a substitute for verified primary sources
- Adopting a tool before getting IT and risk management sign-off`,
          keyTakeaways: [
            'General-purpose LLMs and legal-specific platforms serve different use cases',
            'Evaluate any tool on data governance, accuracy, and integration before adoption',
            'Enterprise agreements with appropriate data protections are required for client work',
            'Specialist legal AI adds citation verification that general-purpose tools cannot provide',
            'Always verify legal references through authoritative databases regardless of which AI tool you use',
          ],
          exercise: {
            title: 'Tool Evaluation Matrix',
            description:
              'Build a one-page evaluation of two AI tools for potential adoption in your practice.',
            steps: [
              'Identify one general-purpose tool (Claude or ChatGPT) and one legal-specific platform available in your market',
              'For each tool, answer: (a) What is the data retention and training policy? (b) Does it cite sources? (c) What is the enterprise pricing and data agreement?',
              'Test the same task in both: summarise a publicly available contract from a company\'s investor relations page',
              'Compare output quality, citation behaviour, and ease of use',
              'Write a three-sentence recommendation for your practice group or IT/risk team',
            ],
            tool: 'Claude',
          },
          quiz: [
            {
              question: 'What is the primary advantage of legal-specific AI platforms over general-purpose LLMs for legal research?',
              options: [
                'They are always less expensive',
                'They integrate with legal databases and can verify citations against authoritative sources',
                'They do not hallucinate at all',
                'They have larger context windows',
              ],
              correct: 1,
              explanation:
                'Legal-specific platforms like Harvey or LexisNexis+AI connect to legal databases, which means they can ground responses in verified case law and statutes rather than generating text from training data alone. This significantly reduces (but does not eliminate) hallucination risk for legal references.',
            },
            {
              question: 'Why should legal professionals avoid using free-tier AI tools for client-related matters?',
              options: [
                'Free tools are less accurate than paid tools',
                'Free tools typically process data without enterprise data protection agreements, creating confidentiality risks',
                'Free tools cannot summarise documents',
                'Free tools do not support the legal profession',
              ],
              correct: 1,
              explanation:
                'Free-tier tools often do not offer the data protection agreements required to safely process client or privileged information. Data submitted may be used for training or stored in ways inconsistent with legal professional obligations. Enterprise agreements with appropriate data handling commitments are the minimum standard for client-related work.',
            },
          ],
        },
        {
          id: 'legal-m1-l3',
          title: 'Confidentiality, Privilege, and AI',
          duration: 20,
          description:
            'Understand the specific confidentiality and privilege risks that arise when using AI in legal practice, and how to manage them without sacrificing the productivity benefits.',
          content: `## The Core Tension

AI tools are at their most useful when given rich context — the full contract, the complete correspondence, the detailed case facts. But rich context often means client-confidential or legally privileged information. Managing this tension is the central compliance challenge of AI adoption in legal practice.

## What Are the Risks?

### Data Transmitted to Third Parties
When you paste content into an AI tool, that content is transmitted to the AI provider's servers. If the provider is not bound by a suitable data processing agreement, that content may:
- Be retained and used for model training
- Be accessible to provider employees in certain circumstances
- Be stored in jurisdictions with different data protection standards

### Inadvertent Waiver of Privilege
In some jurisdictions, sharing privileged materials with third parties — including AI providers — can constitute a waiver of legal professional privilege if the provider is not subject to appropriate confidentiality obligations. This is an evolving area of law.

### Data Breach Risk
Any data held by a third-party AI provider is subject to that provider's security posture. A breach at the AI provider level could expose client information.

## Practical Mitigation Strategies

**1. Use approved enterprise tools only.** Your firm or organisation should maintain an approved tool list. Only use tools that have appropriate data processing agreements with your organisation.

**2. Anonymise before pasting.** For matters where enterprise agreements are not in place, anonymise names, company names, dates, and identifying details before submitting to AI. Use placeholder names.

**3. Apply the minimum necessary test.** Only include the context the AI needs to complete the task. Don't paste an entire matter file when only a specific clause needs review.

**4. Treat AI output as internal workproduct.** AI outputs are drafts for your review. They are not final documents and should not be sent externally without careful review.

**5. Know your firm's policy.** Many firms have issued specific guidance on AI tool use. Know it, follow it, and raise questions if the guidance is silent on a situation you face.

## Privilege in AI-Generated Documents

A separate question: can AI-generated legal work product attract privilege? The consensus emerging is yes — if created under the supervision of a lawyer for the purpose of legal advice, AI-assisted documents can attract privilege. The key is lawyer oversight and control.`,
          keyTakeaways: [
            'Client content transmitted to AI tools may be retained by providers unless enterprise agreements prohibit it',
            'Inadvertent privilege waiver through AI tool use is a live issue in some jurisdictions',
            'Use only approved enterprise tools with appropriate data processing agreements for client matters',
            'Anonymise sensitive content when enterprise tools are not available',
            'Apply the minimum necessary information principle — only share what the AI needs',
          ],
          exercise: {
            title: 'Anonymisation Practice',
            description:
              'Practice anonymising a legal document before submitting to an AI tool.',
            steps: [
              'Take any contract or letter in your files (use a publicly available template if needed)',
              'Identify all client-identifying information: names, company names, addresses, account numbers, specific dates, and jurisdiction-specific details',
              'Replace each identifying element with a placeholder: [COMPANY A], [INDIVIDUAL 1], [DATE 1], [JURISDICTION]',
              'Submit the anonymised document to Claude and ask for a summary of key obligations',
              'Verify the summary is accurate, then consider: what context did the anonymisation remove that the AI needed to be fully helpful?',
            ],
            tool: 'Claude',
          },
          quiz: [
            {
              question: 'What is the primary confidentiality risk when using AI tools without an enterprise data processing agreement?',
              options: [
                'The AI will share your data publicly on the internet',
                'Client data may be retained and used for AI model training without your consent',
                'Other law firms can access your data through the AI tool',
                'The AI tool will bill your clients directly',
              ],
              correct: 1,
              explanation:
                'Without an enterprise data processing agreement, AI providers may retain submitted content and use it to improve their models. For legal professionals, this creates confidentiality obligations risks — client data could persist in the AI provider\'s systems in ways you cannot control.',
            },
            {
              question: 'Which approach best protects client confidentiality when using an AI tool not covered by an enterprise agreement?',
              options: [
                'Only use the AI tool after 5pm when servers are less busy',
                'Anonymise identifying information before submitting content to the AI',
                'Submit documents in small sections rather than whole files',
                'Only use AI tools for non-client matters',
              ],
              correct: 1,
              explanation:
                'Anonymisation removes client-identifying information before the content reaches the AI provider\'s servers. If a data incident occurs, the exposed data cannot be connected back to a specific client or matter. This is the most practical mitigation when approved enterprise tools are not available.',
            },
          ],
        },
        {
          id: 'legal-m1-l4',
          title: 'Building Your Legal AI Workflow',
          duration: 15,
          description:
            'Design a practical, compliant AI workflow that slots into your existing practice — so AI consistently saves time without creating new risks.',
          content: `## The Workflow Design Principle

The goal is not to use AI on everything. The goal is to identify where AI creates the most time saving with the least risk, and to build consistent, repeatable habits around those tasks.

## Mapping Your Work to AI Suitability

Rate each task type against two axes: AI time saving potential (how much faster does AI make this?) and error tolerance (how bad is a mistake here?).

**High value, lower risk:**
- First-draft summaries of documents you'll read anyway
- Internal memo drafts for lawyer review
- Generating checklists and templates for standard transactions
- Extracting specific data from structured documents

**High value, requires care:**
- Contract review (AI misses context; lawyer must review fully)
- Legal research starting points (always verify citations)
- Client communication drafts (tone and accuracy matter)

**Use AI sparingly or not at all:**
- Final client advice without full lawyer review of AI input
- Privilege review determinations
- Ethical advice

## The Three-Step Legal AI Workflow

**Step 1 — Brief the AI with context.** Treat AI like a new associate: give it the relevant background, the specific task, the format you want, and any constraints. "You are helping a corporate lawyer review an M&A SPA. Identify any unusual indemnification provisions and list them with the clause reference."

**Step 2 — Review and verify.** Read every AI output. Verify factual and legal claims. Cross-reference citations. Adjust tone and accuracy.

**Step 3 — Apply professional judgment.** The AI gives you raw material. You supply the legal judgment, risk assessment, and advice. Never send AI output to a client without completing this step.

## Building the Habit

Start with one task type per week. Pick something you do repeatedly (e.g., summarising board minutes for legal review). Use AI for that task every time for two weeks. Track how much time you save and what you need to fix. Then add a second task type.

Consistency builds confidence and reveals which AI approaches work best for your practice.`,
          keyTakeaways: [
            'Map tasks by AI time-saving potential and error tolerance to prioritise where AI helps most',
            'The three-step workflow — brief, review, apply judgment — applies to every legal AI use case',
            'Build habits one task type at a time rather than trying to use AI for everything at once',
            'Professional responsibility for AI-assisted work always stays with the supervising lawyer',
            'Internal-facing work is the safest place to start building AI confidence',
          ],
          exercise: {
            title: 'Map Your AI Opportunity',
            description:
              'Identify the top three AI opportunities in your specific role this week.',
            steps: [
              'List the ten most time-consuming recurring tasks in your legal role',
              'For each task, score it 1–5 on: (a) how much AI could speed it up, (b) how bad would a mistake be',
              'Plot them on a 2x2: high AI value / low risk = start here; high AI value / high risk = use with care; low AI value = skip',
              'Pick the top three from your "start here" quadrant',
              'This week, use Claude to assist with at least one of those tasks and note the time saved and what you needed to correct',
            ],
            tool: 'Claude',
          },
          quiz: [
            {
              question: 'Where should a legal professional start when building an AI workflow?',
              options: [
                'With the highest-risk, highest-visibility client matters to show maximum impact',
                'With repetitive internal tasks where errors are catchable before reaching clients',
                'By replacing all document review with AI immediately',
                'With AI-generated legal advice directly to clients',
              ],
              correct: 1,
              explanation:
                'Starting with repetitive internal tasks lets you calibrate AI quality in your specific practice context without the risk of errors reaching clients. You build confidence, identify what AI does well in your area, and develop review habits before applying AI to higher-stakes work.',
            },
            {
              question: 'In the three-step legal AI workflow, what is the role of the lawyer at step three?',
              options: [
                'To format the AI output into a final document',
                'To apply professional legal judgment that the AI cannot supply',
                'To re-run the AI prompt with different wording',
                'To translate the AI output into the client\'s language',
              ],
              correct: 1,
              explanation:
                'AI provides raw material — a draft, a summary, a list of issues. The lawyer\'s role at step three is to apply professional judgment: assessing risk, considering context the AI lacks, making strategic recommendations, and taking professional responsibility for the final work product.',
            },
          ],
        },
      ],
    },
    {
      id: 'legal-m2',
      title: 'Document Review & Contract Analysis',
      description:
        'Use AI to accelerate contract review, due diligence, and document analysis — without sacrificing the thoroughness your clients expect.',
      lessons: [
        {
          id: 'legal-m2-l1',
          title: 'AI-Assisted Contract Review',
          duration: 20,
          description:
            'Learn how to use AI to identify key provisions, flag unusual clauses, and produce structured summaries that accelerate first-pass contract review.',
          content: `## Why Contract Review Is Ideal for AI

Contract review shares characteristics that make it well-suited to AI assistance: it is text-dense, it follows patterns (most contracts share common clause types), and the task is structured (you're looking for specific things). These properties let AI add genuine value at the first-pass stage.

## What AI Can Do in Contract Review

**Provision identification:** AI can scan a contract and identify: indemnification clauses, limitation of liability, IP ownership, termination rights, change of control, non-compete and non-solicit, payment terms, dispute resolution, governing law.

**Non-standard language flagging:** When given a standard baseline, AI can identify where the submitted contract deviates. "Compare this NDA to the standard market form and flag provisions that are more onerous than market."

**Structured summarisation:** AI can produce a one-page commercial summary of a complex agreement — party obligations, key dates, commercial terms — which helps non-legal stakeholders understand what they're signing.

## Prompt Patterns That Work for Contract Review

**The clause extraction prompt:**
"Review the attached contract. List all clauses that address [topic] with their clause number and a brief summary of what each clause says."

**The red-flag prompt:**
"Review the attached contract from the perspective of the buyer. Identify any provisions that: (a) impose unlimited liability, (b) restrict the buyer's ability to use competitive products, or (c) survive termination without time limit."

**The comparison prompt:**
"Compare the indemnification clause in this agreement against the following standard position: [insert standard text]. Identify every deviation and whether it is more or less favourable to our client."

## What AI Misses (and Why You Still Need Full Review)

- **Context and commercial reality.** AI doesn't know the deal dynamics, the parties' relative bargaining power, or what your client actually cares about.
- **Jurisdiction-specific legal meaning.** A clause that's standard in English law may be unusual or unenforceable in another jurisdiction.
- **Defined terms.** Complex defined terms that redefine what a common word means throughout the contract can trip AI up.
- **The whole document.** AI review of sections in isolation may miss interactions between clauses.

First-pass AI review speeds you up. It does not replace your comprehensive review.`,
          keyTakeaways: [
            'Contract review suits AI well because it is text-dense and follows recognisable patterns',
            'Use AI to identify specific provision types, flag non-standard language, and produce commercial summaries',
            'Prompt specificity determines usefulness: tell AI exactly what you\'re looking for and from whose perspective',
            'AI misses commercial context, defined-term interactions, and jurisdiction-specific nuance',
            'AI first-pass review speeds up your work — it does not replace your full review',
          ],
          exercise: {
            title: 'First-Pass Contract Review with AI',
            description:
              'Use AI to produce a structured first-pass review of a real or sample contract.',
            steps: [
              'Find a publicly available commercial contract (many US public companies file material contracts as SEC exhibits)',
              'Ask Claude: "Review this contract and provide: (1) a one-paragraph commercial summary, (2) a list of all clauses that address liability with clause references, (3) any provision you would flag as unusual or potentially onerous for the counterparty."',
              'Review the AI output against the actual contract text',
              'Note: (a) what did AI identify correctly, (b) what did it miss, (c) what would you need to add from your professional judgment',
              'Estimate how long this first-pass would have taken without AI assistance',
            ],
            tool: 'Claude',
          },
          quiz: [
            {
              question: 'Which of the following is the most appropriate use of AI in a contract review process?',
              options: [
                'Sending the AI-generated review directly to the client as the final analysis',
                'Using AI for a first-pass to identify key provisions and flag issues, then conducting your own full review',
                'Using AI to replace reading the contract entirely',
                'Asking AI to confirm that the contract is legally enforceable',
              ],
              correct: 1,
              explanation:
                'AI excels at accelerating the first-pass stage: identifying where relevant provisions are, surfacing potential issues, and producing structured summaries. The lawyer then conducts a full review informed by (but not limited to) the AI\'s output and applies professional judgment before any client communication.',
            },
            {
              question: 'Why might AI miss important issues when reviewing a contract with complex defined terms?',
              options: [
                'AI cannot read defined terms in contracts',
                'Defined terms can redefine common words throughout the document in ways AI may not fully track across clauses',
                'AI only reads the first ten pages of any contract',
                'Defined terms are always in a separate document that AI cannot access',
              ],
              correct: 1,
              explanation:
                'Complex defined terms can dramatically change the meaning of provisions that appear innocuous on the surface. For example, "Material Adverse Effect" may be defined in a way that excludes most of what a client would consider material. AI may analyse a clause using its common meaning without fully tracking how the defined term modifies it throughout the document.',
            },
          ],
        },
        {
          id: 'legal-m2-l2',
          title: 'Due Diligence with AI',
          duration: 22,
          description:
            'Scale your due diligence process with AI-assisted document triage, summarisation, and issue spotting across large document sets.',
          content: `## The Due Diligence Challenge

M&A due diligence often involves reviewing hundreds or thousands of documents under time pressure. The question is not whether AI can help — it clearly can — but how to integrate it without creating gaps that a buyer will later regret.

## Where AI Adds Most Value in Due Diligence

**Document triage.** AI can categorise documents by type (contracts, correspondence, regulatory filings, IP registrations) faster than a team of associates. This allows you to direct human review to the highest-priority items first.

**Standardised summaries.** For each agreement in a data room, AI can produce a consistent one-page summary: parties, term, key obligations, termination rights, change of control provisions, governing law. This feeds directly into your due diligence report.

**Issue spotting.** AI can flag defined categories of risk across a large document set. "In each of these 50 supplier agreements, flag any: (a) automatic renewal provisions, (b) price escalation clauses, (c) most-favoured-nation provisions."

**Cross-document consistency.** AI can help identify inconsistencies — for example, where the corporate documents describe a shareholding structure that doesn't match the cap table.

## Building a Due Diligence AI Workflow

1. **Set a structured review brief.** Agree your due diligence scope before using AI. The AI works off what you ask it — if you haven't defined what you're looking for, it will miss things.

2. **Use a consistent summary template.** Give AI a standardised output format for each document type. This makes the summaries directly useful in your report.

3. **Tier your review.** Documents flagged by AI as high-risk get full lawyer review. Documents summarised by AI as standard/low-risk get a lighter-touch review. Never zero review.

4. **Track your assumptions.** Document which documents were AI-assisted and what review standard was applied. This protects you if a buyer later questions the due diligence process.

## Critical Caution: Privilege in Due Diligence

When reviewing data rooms for counterparty documents, confidentiality and privilege issues arise differently than in your own client matters. Understand the data room access terms and your client's NDA before feeding third-party documents into AI tools.`,
          keyTakeaways: [
            'AI excels at document triage, standardised summarisation, and issue spotting across large document sets',
            'Use a structured review brief before starting AI-assisted due diligence — undefined scope creates gaps',
            'Maintain tiered human review: AI-identified high-risk items always receive full lawyer attention',
            'Document your AI-assisted review methodology for the due diligence file',
            'Consider privilege and data room access terms before submitting third-party documents to AI tools',
          ],
          exercise: {
            title: 'Due Diligence Summary Template',
            description:
              'Build a standardised AI prompt that produces consistent contract summaries for a due diligence exercise.',
            steps: [
              'Design a five-field contract summary template: (1) Parties and role, (2) Term and renewal, (3) Key financial terms, (4) Termination rights and change of control, (5) Notable risk provisions',
              'Write a Claude prompt that instructs AI to produce this template for any supplied agreement',
              'Test it on two different contracts (use publicly available ones) and assess consistency',
              'Refine your prompt to improve any fields where the AI output was inconsistent or incomplete',
              'Save this as your standard due diligence summarisation prompt',
            ],
            tool: 'Claude',
          },
          quiz: [
            {
              question: 'What is the most appropriate use of AI in a large-scale due diligence exercise?',
              options: [
                'Replacing lawyer review of all low-risk documents entirely',
                'Triaging documents, producing standardised summaries, and flagging risk items for prioritised lawyer review',
                'Producing the final due diligence report without lawyer input',
                'Identifying which documents should be excluded from the data room',
              ],
              correct: 1,
              explanation:
                'AI works best in due diligence as an accelerant, not a replacement. It triages and summarises so that lawyer time is directed to the highest-risk items. All documents still receive some level of human review — AI changes the proportion of effort, not the principle that lawyers are responsible for the findings.',
            },
            {
              question: 'Why is it important to document the AI-assisted review methodology in a due diligence file?',
              options: [
                'Because AI companies require it as a condition of use',
                'So that the review process can be explained and defended if the adequacy of due diligence is later questioned',
                'Because it is required by all acquisition agreements',
                'To enable the AI to improve its future performance',
              ],
              correct: 1,
              explanation:
                'In post-acquisition disputes, buyers sometimes challenge the adequacy of pre-acquisition due diligence. Documenting which documents were AI-assisted, what review standard was applied, and what the AI was asked to look for allows the due diligence team to demonstrate a methodical, reasonable process.',
            },
          ],
        },
        {
          id: 'legal-m2-l3',
          title: 'Drafting Legal Documents with AI',
          duration: 20,
          description:
            'Learn how to use AI as a drafting partner — generating first drafts of agreements, clauses, and legal correspondence faster without sacrificing quality.',
          content: `## AI as a Drafting Partner

The blank page problem is real in legal drafting. AI eliminates it. Given a well-crafted prompt, AI can produce a structurally sound first draft that a lawyer then refines rather than creates from scratch. For standard transactional documents, this can cut initial drafting time by 60–70%.

## What AI Can Draft Effectively

- Non-disclosure agreements and confidentiality provisions
- Standard commercial terms and conditions
- Board minutes and resolutions
- Shareholder letters and notices
- Legal correspondence and client updates
- First drafts of policy documents and procedures
- Employment contracts (standard terms)
- Simple IP licences and assignments

## The Drafting Prompt Formula

A good legal drafting prompt includes:
1. **Role context:** "You are a commercial lawyer drafting on behalf of a UK technology company."
2. **Document type and purpose:** "Draft a mutual NDA for a potential M&A discussion."
3. **Key parameters:** "Both parties may share confidential information. Term of 2 years from signing. Governed by English law."
4. **Output format:** "Use numbered clauses. Include definitions section. Aim for approximately 1,000 words."
5. **Specific requirements:** "Ensure the definition of Confidential Information explicitly excludes publicly available information and information independently developed."

## Reviewing AI-Generated Drafts

AI drafts require systematic review:
- **Defined terms:** Check that defined terms are used consistently and the definitions are appropriate
- **Obligations:** Verify that every obligation is clearly assigned to a specific party
- **Missing provisions:** AI may omit jurisdiction-specific mandatory provisions or customary clauses
- **Jurisdiction accuracy:** AI knows general legal principles — it may get jurisdiction-specific rules wrong
- **Tone:** AI drafts sometimes use unnecessarily archaic language or mix formal and informal registers

## When Not to Use AI for First Drafts

- Highly bespoke structures with no precedent
- Regulatory filings where specific format is mandated
- Documents where precedent language carries legal significance (some legislation incorporates specific wording requirements)
- Any document where you are uncertain what the correct legal position is — drafting before knowing the law is backwards`,
          keyTakeaways: [
            'AI eliminates the blank page problem in legal drafting — use it for first drafts, not final documents',
            'A complete drafting prompt includes: role context, document type, key parameters, output format, and specific requirements',
            'Review AI drafts systematically: defined terms, obligations, missing provisions, jurisdiction accuracy, and tone',
            'AI drafts standard commercial documents well — be more cautious with bespoke or jurisdiction-specific requirements',
            'You must know the correct legal position before drafting — AI cannot substitute for the underlying legal analysis',
          ],
          exercise: {
            title: 'AI Drafting with Structured Prompts',
            description:
              'Draft a standard commercial document using a structured AI prompt, then systematically review and refine it.',
            steps: [
              'Choose a standard document you regularly draft (NDA, board resolution, simple licence)',
              'Write a structured drafting prompt using the five-part formula: role context, document type, key parameters, output format, specific requirements',
              'Generate the first draft with Claude',
              'Review against a checklist: defined terms consistent? All obligations assigned? Jurisdiction provisions correct? Any missing standard clauses?',
              'Compare the time taken versus your usual drafting process and note what you still needed to add from legal knowledge',
            ],
            tool: 'Claude',
          },
          quiz: [
            {
              question: 'Which element is most commonly missing from legal AI drafting prompts, leading to poor output quality?',
              options: [
                'The name of the AI tool being used',
                'Specific parameters such as governing law, term, and key obligations the document must address',
                'A request for the document to be professionally worded',
                'The number of pages required',
              ],
              correct: 1,
              explanation:
                'AI produces generic output for generic prompts. The most impactful improvement in legal drafting quality comes from specifying the key parameters: governing law, parties\' roles, key obligations, duration, and any specific provisions required. Vague prompts produce vague drafts that require more revision than a well-prompted draft.',
            },
            {
              question: 'What is the most important step after receiving an AI-generated first draft of a legal document?',
              options: [
                'Sending it directly to the client for approval to save time',
                'Running a systematic review covering defined terms, obligations, missing provisions, and jurisdiction accuracy',
                'Asking the AI to improve it until it looks perfect',
                'Converting it to PDF format',
              ],
              correct: 1,
              explanation:
                'A systematic review is essential. AI drafts can look professionally structured while containing substantive errors: inconsistent defined terms, missing provisions required by law, or jurisdiction-specific inaccuracies. The review checklist ensures consistent quality control regardless of which team member does the review.',
            },
          ],
        },
        {
          id: 'legal-m2-l4',
          title: 'Summarising Legal Documents at Scale',
          duration: 15,
          description:
            'Build AI workflows for summarising complex legal documents — for internal use, for client communications, and for non-legal stakeholders who need to understand what they\'re signing.',
          content: `## Why Summarisation Matters

Legal documents are written for legal enforceability — not for comprehension. Translating complex agreements into accessible summaries is one of the most time-consuming tasks in legal practice and one of the most valuable for clients. AI can do this faster and more consistently than any other approach.

## Four Types of Legal Summaries

**1. Executive summary.** One page for a C-suite audience. Commercial terms, key obligations, critical risks. No legalese. Used for board approval, investment committee, or client sign-off.

**2. Clause-by-clause analysis.** Structured breakdown by provision type. Used by lawyers reviewing a contract against standard positions.

**3. Deviation report.** What this contract differs from your standard position or a market benchmark. Used in negotiation preparation.

**4. Risk register entry.** Standardised format for feeding contract terms into your matter management system or risk register.

## Building Summarisation Prompts

The key is matching prompt design to purpose:

**For an executive summary:**
"Summarise this contract in plain English for a non-lawyer CEO. Cover: what we are agreeing to do, what we will be paid/pay, what happens if something goes wrong, and what we cannot do. Maximum one page. Avoid all legal terminology."

**For a clause-by-clause analysis:**
"Analyse this contract clause by clause. For each clause, provide: (1) what it says in one sentence, (2) whether it is standard market practice or unusual, (3) any risk it creates for [party name]."

**For a deviation report:**
"Compare this contract to the following standard position [insert]. For each clause that differs, explain: (a) how it differs, (b) whether the difference favours us or the counterparty, (c) your recommended response."

## Quality Control

For summarisation, quality control is simpler than for drafting because you have the source document. Spot-check summaries against the original: pick three random provisions and verify the summary accurately reflects them. If the AI misrepresents any provision, adjust your prompt and re-run.

## Client-Facing Summaries

When sharing AI-assisted summaries with clients, consider whether to disclose the use of AI. Many clients now expect transparency; some jurisdictions are beginning to develop professional guidance on disclosure obligations. Err on the side of transparency.`,
          keyTakeaways: [
            'Legal summarisation is one of AI\'s highest-value legal use cases because the task is text-dense and follows patterns',
            'Match your prompt to your audience: executive summaries, clause analyses, deviation reports, and risk register entries each need different prompts',
            'Spot-check AI summaries against the source document — verify three random provisions to confirm accuracy',
            'Client-facing summaries warrant disclosure of AI assistance in most professional contexts',
            'AI produces consistent summaries across large document sets — something that human review cannot match for cost and speed',
          ],
          exercise: {
            title: 'Multi-Format Document Summary',
            description:
              'Produce three different summaries of the same legal document for three different audiences.',
            steps: [
              'Use a publicly available commercial contract (try a US SEC filing or a standard template)',
              'Prompt 1: Generate an executive summary for a CEO who will not read the contract',
              'Prompt 2: Generate a clause-by-clause risk analysis for a lawyer reviewing for a client in the counterparty position',
              'Prompt 3: Generate a risk register entry in this format: [Party obligations | Key dates | Termination triggers | Liability cap | Governing law]',
              'Review all three outputs and note how the same document information is presented differently for each audience. Which required the most prompt refinement?',
            ],
            tool: 'Claude',
          },
          quiz: [
            {
              question: 'What is the most effective way to quality-check an AI-generated legal document summary?',
              options: [
                'Ask the AI to check its own work',
                'Spot-check the summary against the source document by verifying a selection of provisions',
                'Count the number of words to verify the length matches instructions',
                'Have a non-lawyer read the summary to confirm it makes sense',
              ],
              correct: 1,
              explanation:
                'For document summaries, you have the source text to check against. The most direct quality check is to select a sample of provisions from the summary and verify each against the actual contract text. If the AI has misrepresented any of them, you know to treat the rest of the summary with additional caution.',
            },
            {
              question: 'Why is an executive summary of a contract different from a clause-by-clause legal analysis?',
              options: [
                'Executive summaries are shorter and therefore less accurate',
                'Executive summaries translate legal terms into commercial language for a business audience; clause analyses are structured for legal review',
                'Clause-by-clause analyses are not suitable for client communication',
                'Executive summaries only cover the first page of an agreement',
              ],
              correct: 1,
              explanation:
                'Different audiences need different outputs from the same document. An executive needs to understand commercial terms and key risks in plain language to make a business decision. A lawyer reviewing for negotiation needs a structured, technically accurate analysis of each provision. The underlying document is the same; the purpose and audience determine the format.',
            },
          ],
        },
      ],
    },
    {
      id: 'legal-m3',
      title: 'Legal Research & Advisory',
      description:
        'Accelerate legal research, produce clearer client communications, and draft regulatory analysis — while maintaining the accuracy and rigour that legal work demands.',
      lessons: [
        {
          id: 'legal-m3-l1',
          title: 'AI-Powered Legal Research',
          duration: 20,
          description:
            'Use AI to accelerate how you identify legal issues, map the regulatory landscape, and prepare for deep research — without relying on AI as a substitute for authoritative sources.',
          content: `## Legal Research and AI: The Right Role

AI is excellent at the early stages of legal research — scoping the issues, identifying relevant legal doctrines, suggesting research avenues, and synthesising background context. It is not a reliable source of law. Every legal proposition must be verified through authoritative primary sources.

## Where AI Accelerates Research

**Issue spotting.** Describe your fact pattern to AI and ask: "What are the legal issues I should research in relation to these facts?" AI will generate a structured list that covers more angles than a typical first-pass brainstorm.

**Doctrine overview.** "Summarise the key principles of [legal doctrine] under English law." AI gives you a working overview to orient your research — a starting point, not a conclusion.

**Jurisdiction mapping.** "What are the main regulatory regimes that apply to a fintech company collecting consumer payment data in the EU?" AI maps the landscape before you dive into specific regulations.

**Search term generation.** AI can suggest legal search terms for Westlaw or LexisNexis that you might not have considered: "What search terms should I use to research liability of platform operators for user-generated content under EU law?"

**Memo structuring.** Once you have done your primary source research, AI can help you structure a legal memo efficiently.

## The Verification Imperative

Every legal proposition from AI must be verified. This means:
- Checking that the cited case exists and says what AI claims
- Checking that cited legislation is current and correctly quoted
- Confirming the legal principle is accurate in the specific jurisdiction
- Checking that no recent case or statutory amendment has changed the position

Use Westlaw, LexisNexis, or official government sources for verification. Never rely on AI as your primary legal authority.

## The Practical Research Workflow

1. **Use AI to scope and structure the research question.** What are the relevant issues and doctrines?
2. **Use AI to get oriented.** What is the general legal landscape? What are the key statutory and case law pillars?
3. **Conduct primary source research.** Use legal databases to verify and deepen your understanding.
4. **Use AI to help structure your output.** How should the memo be organised? What is the most logical structure for the analysis?`,
          keyTakeaways: [
            'AI accelerates issue spotting, doctrine orientation, jurisdiction mapping, and research structuring',
            'AI is not a source of law — every legal proposition must be verified through authoritative primary sources',
            'Use the research workflow: AI scopes → AI orients → primary source research → AI structures output',
            'AI-suggested search terms can improve the quality of your legal database queries',
            'The verification step is non-negotiable: check citations, check currency, check jurisdiction',
          ],
          exercise: {
            title: 'Issue Spotting and Research Scoping',
            description:
              'Use AI to scope a research question, then verify one specific legal proposition through a primary source.',
            steps: [
              'Choose a legal issue you have researched or worked on recently',
              'Describe the fact pattern to Claude and ask: "What are the key legal issues I should research? What are the relevant legal doctrines and regulatory regimes?"',
              'Review AI\'s issue list — did it identify everything you would have? What did it miss or add?',
              'Pick one specific legal proposition from AI\'s response',
              'Verify that proposition through a primary source (legislation text, official case law database). Does AI\'s statement accurately reflect the law?',
            ],
            tool: 'Claude',
          },
          quiz: [
            {
              question: 'What is the appropriate use of AI in the legal research process?',
              options: [
                'As the final source of legal authority, replacing legal databases',
                'As a starting point for scoping issues and generating research leads, verified through primary sources',
                'Only for non-contentious matters where accuracy is less important',
                'To generate citations that can be used directly in legal submissions',
              ],
              correct: 1,
              explanation:
                'AI serves as a powerful research assistant at the beginning of the process: scoping issues, identifying relevant doctrines, and generating research leads. But it cannot be the final source of law. Every citation and legal proposition must be verified through authoritative legal databases and official sources before use in legal work.',
            },
            {
              question: 'Which step must always follow AI-generated legal research output?',
              options: [
                'Asking the AI to expand its research further',
                'Verifying all legal propositions and citations through authoritative primary sources',
                'Sharing the AI research with colleagues before reviewing it yourself',
                'Converting the AI output into a client report without modification',
              ],
              correct: 1,
              explanation:
                'AI hallucinations in legal research — fabricated or misrepresented case citations, outdated statutory positions — are a serious professional risk. The verification step using Westlaw, LexisNexis, or official government sources is mandatory before any AI research output is relied upon in legal work.',
            },
          ],
        },
        {
          id: 'legal-m3-l2',
          title: 'Drafting Legal Memos and Advice',
          duration: 18,
          description:
            'Use AI to structure, draft, and refine legal memoranda and client advice — producing clearer, faster output without cutting corners on legal rigour.',
          content: `## The Structure Problem

Legal memos often take longer than they should because lawyers spend time deciding how to structure the analysis rather than doing the analysis. AI solves the structure problem so lawyers can focus on the substance.

## Using AI for Memo Structure

Once you have completed your research, brief AI on the legal question and the key authorities you have found. Ask it to suggest a memo structure. "I am writing a memo on the enforceability of non-solicitation clauses in employment contracts under English law. The key cases are [X, Y, Z] and the relevant statutory provision is [section]. Suggest a memo structure."

AI will propose a logical organisation — introduction, issue statement, legal framework, analysis, conclusion — that you can adopt, adapt, or reject.

## Using AI for First Drafts

With a structure agreed, AI can produce a first draft of each section. Feed it your research notes and ask it to draft the legal framework section using the authorities you specify.

**Critical rule:** Feed AI your research; don't ask AI to do the research. You have verified the law; AI drafts from your verified findings.

## Writing Clearer Client Advice

Legal advice is often more complex than it needs to be. AI can help with the translation step: "Rewrite this section of the memo in plain English for a non-lawyer client. Define any legal terms and avoid jargon."

This produces clearer client communications without the lawyer having to think about plain-language drafting from scratch.

## The Review Standard

Memo drafts from AI require the same review standard as any other legal work:
- Every legal proposition must be accurate and verified
- Every citation must be correct
- The advice must be appropriate and defensible
- The conclusions must reflect your professional judgment`,
          keyTakeaways: [
            'Use AI to solve the structure problem in memo writing, then focus lawyer time on legal substance',
            'Feed AI your verified research to draft — never ask AI to do the research',
            'AI can translate technical legal analysis into plain-English client advice efficiently',
            'Apply the same review standard to AI-drafted memos as to any other legal work',
            'The professional judgment in the analysis and conclusions is always the lawyer\'s, not the AI\'s',
          ],
          exercise: {
            title: 'Structured Memo Drafting with AI',
            description:
              'Use AI to structure and draft a short legal memo based on research you supply.',
            steps: [
              'Choose a legal issue you understand well (one you have researched before)',
              'Brief Claude on the issue and the key legal authorities (use actual authorities you know)',
              'Ask Claude to: (1) propose a memo structure, (2) draft an introduction and issue statement, (3) draft the legal framework section based on the authorities you provided',
              'Review the output: Is the structure logical? Are the authorities accurately represented? Is the analysis clear?',
              'Rewrite the weakest section by hand. Compare: where did AI add value and where did professional judgment matter most?',
            ],
            tool: 'Claude',
          },
          quiz: [
            {
              question: 'When using AI to draft a legal memorandum, what should the lawyer provide to the AI as input?',
              options: [
                'Only the legal question — let the AI find the relevant law',
                'The verified legal authorities and research findings to be incorporated into the draft',
                'A copy of a competitor law firm\'s memo on the same topic',
                'The client\'s own description of the legal position',
              ],
              correct: 1,
              explanation:
                'The lawyer should complete the research and verification first, then provide the verified authorities to the AI for drafting. This maintains the quality of the legal analysis while using AI to accelerate the drafting process. Asking AI to find the law itself creates unacceptable hallucination risk for legal submissions.',
            },
            {
              question: 'What is the primary benefit of using AI to help with plain-language client communications?',
              options: [
                'AI automatically removes all legal liability from advice letters',
                'AI can translate complex legal analysis into clear language faster than writing plain-language drafts from scratch',
                'Clients cannot legally challenge AI-drafted communications',
                'AI plain-language summaries are automatically privileged',
              ],
              correct: 1,
              explanation:
                'Legal professionals often spend significant time rewording technical analysis for non-lawyer clients. AI can produce a plain-language draft of a complex section efficiently, which the lawyer then reviews for accuracy. This saves time on a task that is important for client relationships but not the core of the lawyer\'s expertise.',
            },
          ],
        },
        {
          id: 'legal-m3-l3',
          title: 'Regulatory Monitoring with AI',
          duration: 18,
          description:
            'Use AI to track regulatory developments, summarise new rules, and keep your organisation ahead of compliance requirements — without spending hours reading dense regulatory text.',
          content: `## The Regulatory Monitoring Challenge

Regulatory change is constant. For compliance officers and in-house legal teams, staying current with applicable rules across multiple jurisdictions and regulatory bodies is a significant time cost. AI can compress the reading and summarisation work significantly.

## What AI Can Do for Regulatory Monitoring

**Summarising regulatory publications.** New guidance, consultation papers, and regulatory decisions can be pasted into AI and summarised in minutes. "Summarise this FCA guidance paper. What are the key new obligations? What has changed from the previous position? What do we need to do by when?"

**Impact assessment drafts.** Once you understand a new regulation, AI can help draft an initial impact assessment. "This is our current data processing practice. Based on this new ICO guidance, identify where our practice may need to change."

**Comparison summaries.** "Compare these two versions of the regulatory guidance. What has been added, removed, or changed?"

**Regulatory calendar drafting.** AI can help you maintain a structured regulatory calendar. "Based on this consultation paper, identify all deadlines and proposed effective dates and format them as a compliance calendar entry."

## Staying on Top of Sources

AI doesn't proactively monitor regulatory developments — you need to feed it relevant publications. Maintain a list of your key regulatory sources:
- Regulator websites for your sector
- Official government gazette or legislative portal
- Industry body bulletins
- Legal publisher alerts (Westlaw, LexisNexis, PLC)

When relevant material arrives, AI processes it faster than manual reading.

## The Accuracy Standard for Regulatory Work

Regulatory compliance errors have real consequences. Apply the same verification standard as to legal research: AI summaries of regulatory material should be checked against the source, especially for deadlines, effective dates, and specific obligation language.`,
          keyTakeaways: [
            'AI can summarise dense regulatory publications, draft impact assessments, and compare rule versions',
            'Maintain a curated list of regulatory sources and feed new material to AI proactively',
            'AI does not proactively monitor — the human workflow still initiates the process',
            'Verify regulatory summaries against the source for deadlines, effective dates, and specific obligation language',
            'Impact assessment drafts from AI give your team a head start but require legal judgment to complete',
          ],
          exercise: {
            title: 'Regulatory Summary and Impact Assessment',
            description:
              'Use AI to summarise a real regulatory publication and produce a draft impact assessment.',
            steps: [
              'Find a recently published regulatory guidance or consultation document relevant to your sector (your regulator\'s website is the best source)',
              'Paste the key sections into Claude and ask: "Summarise the key new obligations, what has changed from previous guidance, and list all stated deadlines."',
              'Review the summary against the source document — are the obligations accurate? Are deadlines correct?',
              'Then ask: "Based on this guidance, what questions should a compliance officer be asking about their current practices?"',
              'Compare AI\'s questions to your own compliance checklist — what did AI identify that you might have missed, and vice versa?',
            ],
            tool: 'Claude',
          },
          quiz: [
            {
              question: 'What is a key limitation of using AI for regulatory monitoring?',
              options: [
                'AI cannot read PDF documents',
                'AI does not proactively identify new regulatory developments — the human must source and feed relevant material',
                'AI tools are not permitted to process government documents',
                'AI regulatory summaries are never accurate for financial services',
              ],
              correct: 1,
              explanation:
                'AI tools do not actively monitor regulatory websites or alert you to new publications. They are powerful at processing and summarising regulatory material once you provide it — but sourcing that material still requires a human workflow (subscription alerts, regulator website checks, industry body memberships).',
            },
            {
              question: 'Why must deadlines and effective dates from AI regulatory summaries be verified against the source?',
              options: [
                'AI tools are not permitted to include dates in their outputs',
                'Compliance errors from incorrect deadlines can have serious legal consequences, and AI can misread or misstate dates',
                'AI always states dates in the wrong format',
                'Regulatory deadlines change after AI training cutoff dates',
              ],
              correct: 1,
              explanation:
                'Missing a compliance deadline can result in regulatory sanction, financial penalty, or reputational damage. AI summaries are a useful starting point but should not be relied upon as definitive for deadline-critical information. Always verify specific dates against the source regulatory text before entering them in your compliance calendar.',
            },
          ],
        },
        {
          id: 'legal-m3-l4',
          title: 'Plain-Language Communication and Client Work',
          duration: 15,
          description:
            'Use AI to produce clearer, faster client-facing communications — from update letters to legal guides — that build client relationships without adding to your workload.',
          content: `## The Value of Clear Communication

Legal professionals who communicate clearly maintain better client relationships, reduce misunderstandings, and differentiate their practice. The challenge is that clear writing takes time. AI removes that constraint.

## AI for Client Communications

**Matter update letters.** A matter update that would take 20 minutes to write from scratch takes 5 minutes when AI produces the first draft from bullet points you supply. "Draft a client update letter for an employment dispute. Key points: (1) we received the claimant's schedule of loss last week, (2) we recommend a without-prejudice call to explore settlement before the disclosure deadline, (3) we need their instructions by [date]."

**Explainer documents.** Many clients need background on legal concepts relevant to their matters. "Draft a plain-English explainer on what GDPR legitimate interest means and how it differs from consent. Intended audience: a non-lawyer HR director."

**FAQ sheets.** For transactions or programmes involving many stakeholders, AI can draft FAQ documents based on the legal analysis you provide.

**Engagement letters and scope statements.** For standard matter types, AI can produce first drafts that you customise.

## Tone Management

AI sometimes drifts toward either overly formal legal language or overly casual language. Specify tone explicitly in your prompt: "Write in a professional but accessible tone. Use short sentences. Avoid Latin phrases."

Test your prompt by submitting the first paragraph and checking tone before running the full document.

## Professional Responsibility in Client Communications

AI-drafted client communications carry the same professional responsibility as manually drafted ones. Before sending:
- Confirm all facts are accurate
- Confirm all legal positions are correct
- Confirm the advice is appropriate for this client's situation
- Ensure the communication meets your firm's file and supervision requirements`,
          keyTakeaways: [
            'AI can produce first drafts of client update letters, explainers, and FAQ documents from bullet points',
            'Specify tone explicitly in prompts to avoid AI defaulting to overly formal or overly casual language',
            'AI-drafted client communications require the same review and sign-off as manually drafted communications',
            'Start with internal communications to build confidence before applying AI to client-facing work',
            'Plain-language translation of complex legal analysis is one of AI\'s most consistent strengths',
          ],
          exercise: {
            title: 'Client Update Letter and Explainer',
            description:
              'Use AI to produce a client update letter and a plain-English legal explainer, then compare with your usual drafting process.',
            steps: [
              'Prepare a bullet-point summary of three key points you would include in a client update for any current or recent matter',
              'Ask Claude to draft a professional client update letter from your bullet points. Specify: tone (professional and accessible), length (under 300 words), no jargon.',
              'Then choose a legal concept relevant to your practice area and ask Claude to write a 200-word plain-English explainer for a non-lawyer client.',
              'Review both outputs: What would you change? What would you keep?',
              'Estimate the time saved compared to writing both from scratch. At your billable rate, what is the weekly value if you do this twice a week?',
            ],
            tool: 'Claude',
          },
          quiz: [
            {
              question: 'What is the most effective prompt technique for ensuring AI-drafted client communications have the right tone?',
              options: [
                'Asking AI to use a formal legal style',
                'Explicitly specifying tone, sentence length, and avoiding jargon in the prompt',
                'Letting AI choose the tone based on the document type',
                'Using only legal templates from AI without customisation',
              ],
              correct: 1,
              explanation:
                'Without explicit tone guidance, AI defaults to its baseline style, which may be overly formal or inconsistent with your firm\'s communication style. Specifying desired tone, target audience, and constraints (no jargon, short sentences, professional but accessible) produces consistently better first drafts that require less revision.',
            },
            {
              question: 'What additional professional responsibility step is required before sending an AI-drafted client letter?',
              options: [
                'None — AI-drafted letters carry their own legal disclaimer',
                'The supervising lawyer must review and confirm accuracy, correct legal position, and appropriateness for the specific client',
                'The client must be informed that AI was used before reading the letter',
                'The IT department must approve all AI-drafted external communications',
              ],
              correct: 1,
              explanation:
                'AI-drafted communications carry the same professional responsibility as manually drafted ones. The lawyer who signs off the letter is professionally responsible for its accuracy and appropriateness. No AI disclaimer changes that obligation — full review and approval by the responsible lawyer is required.',
            },
          ],
        },
      ],
    },
    {
      id: 'legal-m4',
      title: 'Compliance Operations & AI Governance',
      description:
        'Build scalable compliance programmes using AI, and develop the governance frameworks your organisation needs to use AI responsibly in legal and compliance contexts.',
      lessons: [
        {
          id: 'legal-m4-l1',
          title: 'AI-Assisted Compliance Monitoring',
          duration: 18,
          description:
            'Scale your compliance monitoring capabilities using AI to process more data, identify more risks, and produce more consistent outputs than traditional manual review.',
          content: `## The Compliance Monitoring Gap

Manual compliance monitoring is expensive and incomplete. Teams can review a sample of transactions, communications, or processes — never all of them. AI changes this: it can process far larger data volumes, maintain consistent standards, and flag potential issues for human review.

## Where AI Adds Most Value in Compliance Monitoring

**Communication surveillance.** AI can screen large volumes of internal communications for policy violations, regulatory breaches, or risk indicators. Note: this requires appropriate data governance, employee notice, and legal advice in your jurisdiction.

**Transaction monitoring.** AI can identify patterns in transaction data that deviate from expected norms — a valuable first-pass for financial crime, conflicts, or policy breaches.

**Policy adherence checking.** Feed AI your policies and a sample of processes or decisions and ask it to assess conformity. "Based on our data retention policy [attached], identify any of the following retention practices that appear non-compliant."

**Third-party risk.** AI can review supplier contracts, due diligence questionnaires, and public information to flag potential third-party compliance risks at scale.

## Building a Human-in-the-Loop Review Process

AI compliance monitoring should generate a flagging output that humans review — not automated enforcement. Structure:

1. AI screens against defined criteria
2. AI flags items above a defined risk threshold
3. Compliance officer reviews flagged items
4. Compliance officer makes decisions and records rationale

The AI handles volume; humans handle judgment and accountability.

## Governance Requirements

Before deploying AI for compliance monitoring, ensure you have:
- Legal advice on applicable laws (particularly employment and privacy law)
- Appropriate employee notice provisions
- Data minimisation — only process data necessary for the compliance purpose
- Audit trail — records of what AI flagged and how each flag was resolved`,
          keyTakeaways: [
            'AI can scale compliance monitoring to process volumes impossible for manual review',
            'Build human-in-the-loop processes — AI flags, humans decide',
            'Communication surveillance and transaction monitoring require legal advice and appropriate notices',
            'Data minimisation and audit trails are governance requirements for AI compliance monitoring',
            'AI consistency in applying criteria is one of its greatest advantages over manual sample-based review',
          ],
          exercise: {
            title: 'Compliance Check with AI',
            description:
              'Use AI to assess a set of documents or practices against a compliance standard.',
            steps: [
              'Choose a compliance standard you work with (a policy, regulation, or code of conduct)',
              'Create a brief checklist of the key compliance requirements from that standard',
              'Find three sample documents or process descriptions (internal, anonymised, or hypothetical)',
              'Ask Claude: "Based on the following compliance requirements [list], assess whether each of these practices appears compliant and identify any gaps." Provide the requirements and the samples.',
              'Review the output: Did AI identify the correct gaps? What would a compliance officer need to add from professional judgment?',
            ],
            tool: 'Claude',
          },
          quiz: [
            {
              question: 'What is the most important structural feature of an AI-assisted compliance monitoring programme?',
              options: [
                'Fully automated enforcement without human involvement',
                'Human review of AI-flagged items before any compliance decision is made',
                'Using AI to replace all existing compliance processes immediately',
                'Training AI to make final compliance determinations',
              ],
              correct: 1,
              explanation:
                'AI compliance monitoring should operate on a flag-and-review model. AI identifies potential issues at scale; compliance officers review flagged items and make professional judgments. Automated enforcement without human review creates accountability gaps, fairness risks, and potential legal exposure.',
            },
            {
              question: 'What legal requirement applies specifically to AI-assisted employee communication monitoring?',
              options: [
                'No special requirements — AI monitoring is always permitted',
                'Appropriate employee notice and legal advice regarding applicable privacy and employment laws',
                'Monitoring is only permitted for senior management',
                'AI monitoring requires court approval in all cases',
              ],
              correct: 1,
              explanation:
                'Monitoring employee communications — including AI-assisted monitoring — is subject to privacy law (GDPR in the UK/EU, equivalent national law elsewhere) and employment law requirements. Employees must generally have notice that monitoring takes place. The scope and method of monitoring must be proportionate. Legal advice specific to your jurisdiction is essential before deployment.',
            },
          ],
        },
        {
          id: 'legal-m4-l2',
          title: 'Policy Drafting and Maintenance with AI',
          duration: 15,
          description:
            'Use AI to accelerate policy drafting, maintain policy currency as regulations change, and ensure consistency across a policy library.',
          content: `## Policy Work and AI

Legal and compliance teams maintain extensive policy libraries. Drafting new policies, updating existing ones in response to regulatory change, and ensuring cross-policy consistency is time-intensive work that AI can significantly accelerate.

## Drafting New Policies

AI can produce a first draft of almost any business policy from a structured prompt:
- Describe the regulatory requirement the policy must address
- Specify the audience (employees, third parties, board level)
- Specify the required elements (scope, responsibilities, procedures, enforcement)
- Specify the tone (formal/accessible, UK/US English)

"Draft a Data Breach Response Policy for a mid-sized financial services firm. The policy must comply with UK GDPR breach notification requirements. Audience: all staff. Include: scope, breach identification, internal notification steps, ICO notification process, breach log requirements, and training requirements. Formal tone."

## Updating Existing Policies

Feed AI your existing policy alongside the new regulatory requirement and ask it to identify what needs to change. "Compare this existing data retention policy to the following new ICO guidance. Identify every section that needs to be updated and draft the updated language."

## Cross-Policy Consistency

AI can scan your policy library for inconsistencies: contradictory definitions, overlapping responsibilities, gaps where no policy covers a required area. "Review these five policies and identify: (a) any terms defined differently across policies, (b) any gaps where the regulatory requirement is not addressed, (c) any overlapping provisions that create potential confusion."

## Limitations

Policy drafting requires legal knowledge of the applicable framework. AI cannot tell you what your policy must contain — it can help you express what you've determined it should contain. The regulatory analysis and compliance judgment always precede the drafting task.`,
          keyTakeaways: [
            'AI can draft complete policy first drafts from structured prompts specifying scope, requirements, and audience',
            'Use AI to identify which sections need updating when regulations change, then draft the updated language',
            'AI can scan policy libraries for inconsistencies and gaps across multiple documents',
            'The regulatory analysis that determines what a policy must contain is always a human legal task',
            'AI consistency in applying a policy structure across a library is a significant efficiency gain',
          ],
          exercise: {
            title: 'Policy First Draft and Update',
            description:
              'Use AI to draft a new policy and then update an existing one in response to a regulatory change.',
            steps: [
              'Choose a standard business policy relevant to your role (e.g., acceptable use, data retention, conflict of interest)',
              'Write a structured prompt specifying the regulatory basis, audience, required sections, and tone',
              'Generate the first draft with Claude',
              'Then take that draft and a hypothetical regulatory change (e.g., "a new regulation now requires quarterly rather than annual data retention audits") and ask Claude to identify what in the policy needs updating and to draft the revised sections',
              'Assess: how much lawyer time would this have taken without AI? What did you need to add from legal knowledge?',
            ],
            tool: 'Claude',
          },
          quiz: [
            {
              question: 'What is the correct sequencing for AI-assisted policy drafting?',
              options: [
                'Ask AI to identify what the policy must contain, then review its answer',
                'Complete the legal/regulatory analysis of what the policy requires, then use AI to draft the expression of those requirements',
                'Use AI to draft the policy, then check it against regulations',
                'Let AI draft and approve the policy without legal review',
              ],
              correct: 1,
              explanation:
                'The legal and compliance analysis — determining what a policy must contain and why — is a human responsibility that precedes the drafting task. AI then helps express those requirements clearly and consistently. Asking AI to determine the regulatory requirements creates the risk of gaps or inaccuracies that the drafting process then embeds into the policy.',
            },
          ],
        },
        {
          id: 'legal-m4-l3',
          title: 'Building an AI Governance Framework',
          duration: 20,
          description:
            'Design the governance structures, policies, and controls your organisation needs to use AI responsibly — covering tool approval, risk assessment, and accountability.',
          content: `## Why Legal and Compliance Leads AI Governance

AI governance is fundamentally a legal and compliance function. It involves managing liability, regulatory compliance, data protection, professional responsibility, and organisational risk. Legal and compliance teams are best placed to lead it.

## The Core Elements of an AI Governance Framework

**1. Tool Approval Process**
Before any AI tool is used in the organisation, it should be assessed against:
- Data protection requirements (data processing agreements, data residency)
- Security standards (penetration testing, SOC 2 / ISO 27001)
- Regulatory compliance (sector-specific AI requirements)
- Professional responsibility implications (legal teams specifically)
- Integration with existing approved systems

**2. Use Case Risk Assessment**
Not all AI use cases carry the same risk. A risk matrix should classify use cases:
- Low risk: internal drafting, summarisation, research assistance
- Medium risk: client-facing outputs, regulatory submissions
- High risk: automated decisions affecting individuals, legal compliance determinations

Different risk levels require different review standards and approval processes.

**3. Acceptable Use Policy**
Define what AI tools employees may use, for what purposes, with what data, and subject to what review requirements. This should cover:
- Approved tools list
- Prohibited data categories (client confidential, personal data without consent)
- Review requirements before AI outputs are used externally
- Incident reporting

**4. Accountability and Oversight**
Define who is responsible for:
- Approving new tools
- Reviewing and updating the approved tools list
- Investigating AI-related incidents
- Training and guidance for staff

**5. Audit and Review**
AI governance frameworks should be reviewed at defined intervals, particularly when: new tools are being considered, regulatory guidance changes, or incidents occur.

## Regulatory Compliance: AI Act (EU)

If your organisation operates in the EU or deploys AI systems there, the EU AI Act creates specific obligations for certain AI applications. Legal teams should assess whether any internal or client-facing AI use falls within regulated categories.`,
          keyTakeaways: [
            'AI governance is a legal and compliance function — legal teams should lead it',
            'A governance framework covers: tool approval, use case risk assessment, acceptable use policy, accountability, and audit',
            'Risk-classify AI use cases: low (internal drafting) through high (automated decisions affecting individuals)',
            'The EU AI Act creates regulatory obligations for certain AI systems — legal teams must assess applicability',
            'Governance frameworks should be living documents, reviewed in response to new tools, regulatory changes, and incidents',
          ],
          exercise: {
            title: 'AI Governance Framework Skeleton',
            description:
              'Use AI to help build the skeleton of an AI governance framework for your organisation.',
            steps: [
              'Describe your organisation to Claude: sector, size, types of AI use currently in place or under consideration',
              'Ask Claude: "Help me design an AI governance framework skeleton. Include: tool approval process, use case risk categories, acceptable use policy headings, accountability structure, and review cycle."',
              'Review the framework skeleton against your organisation\'s current approach — what gaps does it identify?',
              'Identify the three governance elements your organisation most urgently needs to formalise',
              'Draft a one-paragraph summary of the governance framework for presentation to senior leadership',
            ],
            tool: 'Claude',
          },
          quiz: [
            {
              question: 'Which element of an AI governance framework classifies different AI applications by their potential impact?',
              options: [
                'Tool approval process',
                'Use case risk assessment',
                'Acceptable use policy',
                'Audit and review cycle',
              ],
              correct: 1,
              explanation:
                'The use case risk assessment maps AI applications against a risk matrix — classifying them from low risk (internal drafting) to high risk (automated decisions affecting individuals). This classification then determines the review standards, approval requirements, and oversight mechanisms that apply to each use case.',
            },
            {
              question: 'Why should legal and compliance teams lead AI governance in organisations?',
              options: [
                'Because technology teams cannot understand AI',
                'Because AI governance involves managing liability, regulatory compliance, data protection, and professional responsibility',
                'Because only legal teams are permitted to purchase AI software',
                'Because AI governance does not require technical expertise',
              ],
              correct: 1,
              explanation:
                'AI governance is fundamentally about managing legal and compliance risk: data protection law compliance, sector regulatory requirements, professional responsibility obligations (for law firms), liability for AI errors, and accountability structures. These are areas where legal and compliance expertise is essential, making these teams the natural leaders of the governance function.',
            },
          ],
        },
        {
          id: 'legal-m4-l4',
          title: 'The Future of Legal Work with AI',
          duration: 15,
          description:
            'Understand how AI is reshaping the legal profession and how to position yourself — and your practice — to lead in an AI-enabled future.',
          content: `## What Changes, What Stays the Same

AI is reshaping legal work. But the core of what makes a great lawyer — judgment, ethical reasoning, client understanding, advocacy — remains fundamentally human. What changes is the time cost of everything else.

## The Tasks AI Will Transform

**Volume review tasks.** Due diligence, discovery review, contract management at scale — AI will compress the human time required by 60–80% within five years. The billable hour model for high-volume review work is under pressure.

**Standard drafting.** Template-based drafting of standard commercial documents will increasingly be AI-assisted. Differentiation will come from the quality of the legal judgment applied, not the time spent on the keyboard.

**Legal research orientation.** Getting oriented in a new area of law — issue spotting, doctrine mapping, jurisdiction comparison — will be faster. The deep research and analysis will still require the lawyer.

## The Tasks AI Will Not Replace

**Complex legal judgment.** Strategic advice, risk assessment, ethical navigation, and novel legal questions require human reasoning that AI cannot fully replicate.

**Advocacy.** Court appearances, negotiations, client relationships — the human dimension of these is not replaceable.

**Professional responsibility.** The lawyer is always accountable for the work product. AI tools do not carry professional indemnity.

**New and contested legal questions.** Where the law is unclear, evolving, or contested, AI has no reliable answer. This is precisely where experienced lawyers add most value.

## Positioning for an AI-Enabled Future

Lawyers who lead in the AI era will be those who:
- Combine AI fluency with deep legal expertise
- Build efficient AI workflows that others in their team adopt
- Lead clients on AI-related legal issues (AI governance, liability, regulation)
- Maintain the quality standards that clients expect regardless of how quickly the output is produced

The competitive advantage is not AI alone — it's AI applied with excellent legal judgment.`,
          keyTakeaways: [
            'AI will significantly reduce time costs for volume review, standard drafting, and research orientation',
            'Complex legal judgment, advocacy, and professional responsibility remain fundamentally human',
            'The billable hour model for volume work is under pressure — higher-value advisory work is more defensible',
            'Lawyers who combine AI fluency with deep legal expertise will lead the profession',
            'AI-related legal issues (governance, liability, regulation) are a growing and valuable practice area',
          ],
          exercise: {
            title: 'Personal AI Strategy for Your Practice',
            description:
              'Design a 90-day plan for developing your AI capability and applying it in your practice.',
            steps: [
              'Identify your three highest time-cost, lower-judgment tasks that AI could accelerate',
              'Identify two new AI-related legal areas that are emerging in your sector (AI governance, AI liability, data protection for AI, algorithmic decision-making)',
              'Set a 90-day goal: which AI skills do you want to have built, and which tasks do you want to have moved to AI-assisted workflows?',
              'Ask Claude: "Based on this legal role and these goals [describe], what AI tools and skills should I prioritise developing?"',
              'Draft a three-sentence statement of your personal AI development strategy for your performance review or development plan',
            ],
            tool: 'Claude',
          },
          quiz: [
            {
              question: 'Which type of legal work is most likely to be transformed by AI in the next five years?',
              options: [
                'Complex strategic legal advice to major corporate clients',
                'High-volume document review tasks such as due diligence and discovery',
                'Courtroom advocacy and oral argument',
                'Novel legal questions in untested areas of law',
              ],
              correct: 1,
              explanation:
                'High-volume, pattern-recognising tasks — due diligence review, discovery processing, contract management at scale — are the most directly addressable by AI. These tasks are time-consuming precisely because volume is high but each document follows recognisable patterns. AI can compress the human time dramatically while lawyers focus their judgment on the findings.',
            },
            {
              question: 'What distinguishes lawyers who will lead in an AI-enabled legal profession?',
              options: [
                'Those who avoid using AI to maintain their analytical skills',
                'Those who combine AI fluency with deep legal expertise and maintain quality standards',
                'Those who use AI to replace all client interaction',
                'Those who specialise exclusively in AI-related legal matters',
              ],
              correct: 1,
              explanation:
                'The competitive advantage in an AI-enabled legal profession comes from combining AI efficiency with the legal expertise and judgment that AI cannot provide. Lawyers who build AI workflows, apply them with consistent quality standards, and continue developing deep legal knowledge will be more productive and more valuable — not replaced.',
            },
          ],
        },
      ],
    },
  ],
}
