import type { Track } from '../types'

export const leadershipTrack: Track = {
  id: 'leadership',
  title: 'Leadership',
  tagline: 'Lead your organisation into the AI era with confidence',
  description:
    'Develop the strategic clarity to lead AI transformation — from setting a compelling vision to managing your team through change and building the culture that makes AI adoption stick.',
  color: '#F97316',
  level: 'intermediate',
  modules: [
    {
      id: 'leadership-m1',
      title: 'Understanding AI as a Leader',
      description:
        'Build the conceptual foundation you need to lead AI adoption with confidence and credibility.',
      lessons: [
        {
          id: 'leadership-m1-l1',
          title: 'What Every Leader Needs to Know About AI',
          duration: 15,
          description:
            'A grounded, non-technical understanding of how AI works and what it means for your organisation.',
          content: `## What Every Leader Needs to Know About AI

You do not need to understand how AI works technically to lead its adoption effectively. But you do need a clear mental model that lets you ask the right questions, set realistic expectations, and make sound strategic decisions.

### The two things AI is very good at

**Recognising patterns in large amounts of data**
AI learns from examples. Given millions of examples of a task — emails, customer conversations, financial data, images — it learns to produce outputs that follow the patterns in those examples. This is why AI can write professionally, translate languages, summarise documents, and identify anomalies: it has learned from enormous amounts of human-produced examples.

**Generating plausible responses quickly**
AI does not retrieve facts from a database. It generates responses based on what is statistically likely given the input. This is powerful for drafting, brainstorming, and synthesis — and it is also why AI can be confidently wrong. Plausible is not the same as correct.

### What AI cannot do

AI cannot exercise genuine judgment in novel situations. It cannot be accountable for decisions. It cannot build relationships. It cannot navigate ambiguous power dynamics or organisational politics. It cannot lead. These capabilities — which define effective leadership — are precisely what AI cannot replicate.

This is not a limitation to apologise for. It means the most important leadership work becomes more valuable, not less, as AI handles more cognitive tasks.

### The question every leader should be asking

Not: "Will AI replace my team?" But: "What would my team be able to accomplish if AI handled the cognitive tasks that currently consume most of their time?" That reframe changes the leadership challenge from threat management to opportunity development.`,
          keyTakeaways: [
            'AI is powerful at pattern recognition and text generation, not reasoning or judgment',
            'AI confidence does not equal accuracy — outputs always require human review',
            'Leadership capabilities become more valuable, not less, as AI handles routine cognitive work',
            'Reframe from "what will AI replace?" to "what could my team accomplish with AI support?"',
          ],
          exercise: {
            title: 'Your Leadership AI Frame',
            description:
              'Articulate your personal mental model for AI in your leadership context.',
            steps: [
              'Write three things AI can do that currently consume significant time in your team',
              'Write three things you do as a leader that AI genuinely cannot do',
              'For each AI-capable task, estimate: what would your team do with that time?',
              'Draft a one-paragraph statement of how you see AI\'s role in your organisation for the next 12 months',
              'Share it with a trusted colleague and ask: does this sound credible and balanced?',
            ],
            tool: 'Claude (claude.ai)',
          },
          quiz: [
            {
              question:
                'Why does AI sometimes give confidently wrong answers?',
              options: [
                'AI is designed to always give a definitive answer, even when uncertain',
                'AI generates statistically plausible responses rather than retrieving verified facts',
                'AI models are not updated frequently enough to be accurate',
                'AI lacks access to real-time information',
              ],
              correct: 1,
              explanation:
                'AI generates responses based on what is most likely given the input — not by checking facts against a verified database. A plausible-sounding response and a correct response are not the same thing. This is why expert review of AI outputs remains essential, particularly for consequential decisions.',
            },
            {
              question:
                'Which of the following leadership capabilities does AI most directly support?',
              options: [
                'Building trust with your team through consistent behaviour',
                'Rapidly synthesising large amounts of information for decision preparation',
                'Reading the political dynamics in a difficult stakeholder conversation',
                'Developing people through coaching and honest feedback',
              ],
              correct: 1,
              explanation:
                'Information synthesis — pulling together research, reports, data, and options into a coherent picture for a decision — is exactly what AI does well. The other options require emotional intelligence, contextual judgment, and relational sensitivity that AI cannot replicate. AI handles the information work so you can focus on the leadership work.',
            },
            {
              question:
                'A member of your leadership team says: "AI will replace half our workforce within two years." What is the most useful response?',
              options: [
                'Agree and begin planning for workforce reduction',
                'Dismiss the concern — AI cannot replace human workers',
                'Acknowledge the uncertainty, distinguish hype from evidence, and focus on near-term productivity opportunity',
                'Defer the discussion until you have more information about the technology',
              ],
              correct: 2,
              explanation:
                'Extreme predictions in either direction are unhelpful. The evidence supports significant AI impact on work patterns without near-term wholesale replacement of workforces. Acknowledging the genuine uncertainty, distinguishing evidence from speculation, and grounding the conversation in what is actually achievable in the next 12-18 months is the leadership response that moves the organisation forward.',
            },
          ],
        },
        {
          id: 'leadership-m1-l2',
          title: 'Reading the AI Landscape: Separating Signal from Noise',
          duration: 18,
          description:
            'Develop a framework for evaluating AI developments, vendor claims, and competitive intelligence.',
          content: `## Reading the AI Landscape: Separating Signal from Noise

The AI news cycle is relentless. Every week brings announcements of breakthrough capabilities, predictions of transformation, and vendor claims of revolutionary impact. Leaders who cannot distinguish meaningful signals from hype will either over-invest in the wrong things or under-react to genuine opportunities.

### The hype cycle problem

Technology adoption follows a consistent pattern: initial excitement drives inflated expectations, then a period of disillusionment when reality does not match the hype, followed by gradual adoption as the technology finds its real applications. AI is currently navigating this cycle — extraordinary genuine capability exists alongside significant over-claiming.

The practical challenge: the same technology that is genuinely transforming how professionals work is being sold with exaggerated claims that make scepticism seem rational. Leaders who dismiss AI wholesale because the claims feel overblown will miss real competitive advantage.

### A framework for evaluating AI developments

When you encounter an AI claim — whether from a vendor, a news article, a board member, or a competitor — ask four questions:

**1. What specifically does it do?**
Vague claims ("transforms how you work") are not useful. Specific claims ("reduces invoice processing time by 60% by automating three-way matching") are evaluable.

**2. What does it require to work well?**
AI tools require good data, clear processes, and trained users. Claims that ignore these prerequisites are incomplete.

**3. What evidence exists?**
Demos are optimised for best-case scenarios. Peer company case studies — particularly from organisations similar to yours — are more reliable than vendor testimonials.

**4. What is the cost of not acting?**
Sometimes the right answer is to wait. But "wait" should be a deliberate choice based on evaluated evidence, not a default response to uncertainty.

### Evaluating competitor AI adoption

Do not benchmark against announcements — benchmark against operational reality. Most organisations that announce AI transformation are at a very early stage of adoption. Monitor what your competitors are actually delivering to customers rather than what they are saying in press releases.`,
          keyTakeaways: [
            'AI hype is real but so is genuine capability — leaders must distinguish between them',
            'Evaluate AI claims by asking: what specifically, what requirements, what evidence, what cost of waiting',
            'Peer company case studies are more reliable than vendor demos or announcements',
            'Benchmark competitors against what they deliver, not what they announce',
          ],
          exercise: {
            title: 'Evaluate One AI Claim',
            description:
              'Apply the four-question framework to an AI claim your organisation is currently considering.',
            steps: [
              'Choose one AI claim you have encountered recently (vendor pitch, news article, board discussion)',
              'Apply each of the four questions: specific capability, requirements, evidence, cost of waiting',
              'Identify what additional information you would need before making a decision',
              'Write a one-paragraph assessment: what is genuinely compelling? What requires more scrutiny?',
              'Share the framework with one other leader in your organisation and discuss a claim together',
            ],
            tool: 'Claude (claude.ai)',
          },
          quiz: [
            {
              question:
                'A vendor demo shows AI completing a complex task in 30 seconds. What is the most important question to ask?',
              options: [
                'How much does the tool cost?',
                'What are the conditions in the demo — and how do they compare to your actual situation?',
                'How many other companies are using this tool?',
                'When will the next version be released?',
              ],
              correct: 1,
              explanation:
                'Demos are constructed to show the tool at its best: clean data, simple inputs, optimised conditions. Your situation will have messier data, more complex inputs, and less ideal conditions. The gap between demo performance and real-world performance is where implementation plans succeed or fail. Always ask what the demo is hiding.',
            },
            {
              question:
                'Your competitor announces a major AI transformation initiative. How should you respond?',
              options: [
                'Immediately launch a matching initiative to avoid falling behind',
                'Monitor what they actually deliver to customers over the next 6-12 months before deciding',
                'Dismiss the announcement as marketing',
                'Commission an external consultant to assess the competitive threat',
              ],
              correct: 1,
              explanation:
                'Announcements are not achievements. The gap between announced AI strategy and operational reality is typically 12-24 months. Reactive "me too" initiatives launched in response to competitor announcements are among the most common causes of wasted AI investment. Monitor what competitors actually deliver, then assess the genuine competitive impact.',
            },
            {
              question:
                'What is the most reliable source for evaluating whether an AI tool would work in your organisation?',
              options: [
                'The vendor\'s case study library on their website',
                'Industry analyst reports ranking AI vendors',
                'Peer organisations similar to yours who have implemented the tool in real conditions',
                'Pilot results from the vendor\'s recommended trial customers',
              ],
              correct: 2,
              explanation:
                'Peer organisations who have implemented in real conditions — not recommended by the vendor, not in a managed pilot — give you the most unfiltered view of actual performance, implementation challenges, and ongoing support quality. Find these through professional networks, industry associations, and conferences, not through vendor-curated reference lists.',
            },
          ],
        },
        {
          id: 'leadership-m1-l3',
          title: 'Understanding AI Risk: What Leaders Must Know',
          duration: 18,
          description:
            'Develop a clear understanding of the risk categories that matter to leadership and how to govern them.',
          content: `## Understanding AI Risk: What Leaders Must Know

Every powerful tool carries risk. Leaders who fail to understand AI risk expose their organisations to data breaches, regulatory penalties, reputational damage, and strategic missteps. Leaders who understand risk can govern it rather than be governed by it.

### The risk categories that matter to leadership

**Accuracy and reliability risk**
AI can be confidently wrong. Decisions made on AI outputs without appropriate human review can be as flawed as decisions made on bad human analysis — with the added danger that AI's confident delivery suppresses the healthy scepticism that would catch a human error.

Governance response: establish human review requirements for consequential decisions; create error reporting mechanisms; audit AI output quality periodically.

**Data security and privacy risk**
When employees use AI tools with organisational data — customer information, employee records, financial data, strategic plans — there is risk of exposure to the AI provider, to third-party data brokers, or through security vulnerabilities.

Governance response: establish an approved tool list with clear data classification rules; train employees on what can and cannot go into AI systems.

**Bias and fairness risk**
AI systems trained on historical data reflect historical patterns, including historical biases. In HR applications — screening, performance assessment, promotion decisions — AI can perpetuate discrimination at scale, faster and more consistently than humans.

Governance response: apply heightened scrutiny to any AI application that influences employment decisions; require bias audits for high-stakes people applications.

**Dependency and resilience risk**
If critical processes become dependent on AI tools that fail, are discontinued, or change pricing significantly, operational resilience is compromised.

Governance response: maintain manual process capability for critical decisions; avoid single-vendor concentration; include AI tools in business continuity planning.

**Reputational risk**
Visible AI failures — offensive outputs, discriminatory decisions, privacy breaches — can cause significant reputational damage, particularly if the organisation is seen to have failed to take reasonable precautions.

Governance response: maintain human oversight for any customer-facing AI; establish incident response plans before they are needed.`,
          keyTakeaways: [
            'Five AI risk categories for leaders: accuracy, data security, bias, dependency, reputation',
            'Governance responses exist for each risk — this is a management problem, not a reason to avoid AI',
            'Bias risk is highest in people applications — apply greatest scrutiny there',
            'Build AI tools into business continuity planning before they become critical',
          ],
          exercise: {
            title: 'AI Risk Assessment for Your Organisation',
            description:
              'Identify the top two AI risks most relevant to your current or planned AI use.',
            steps: [
              'List the AI tools your organisation currently uses or is evaluating',
              'For each, assess: which of the five risk categories is most significant?',
              'Identify your two highest-priority risks and describe the specific scenario that concerns you most',
              'For each, write a governance response: what control would you put in place?',
              'Ask Claude to identify any additional risks you may have missed for your specific context',
            ],
            tool: 'Claude (claude.ai)',
          },
          quiz: [
            {
              question:
                'Why is AI bias particularly dangerous in HR applications?',
              options: [
                'HR is the function most likely to over-rely on AI outputs',
                'AI can perpetuate historical biases at scale, faster and more consistently than individual humans',
                'HR data is more sensitive than other types of organisational data',
                'Employment law makes AI errors in HR more legally costly',
              ],
              correct: 1,
              explanation:
                'Scale and consistency are what make AI bias different from human bias. Individual human bias is inconsistent and can be challenged in individual decisions. AI bias applies the same pattern to every decision it influences — potentially affecting hundreds of candidates or employees before anyone notices. The combination of historical bias in training data and high-volume consistent application creates systemic risk.',
            },
            {
              question:
                'An employee uses a consumer AI tool to draft a strategy document that contains your company\'s confidential market expansion plans. What is the primary risk?',
              options: [
                'The strategy document may contain inaccuracies',
                'Confidential strategic information may be stored and used by the AI provider',
                'The document may not be in the company\'s brand voice',
                'The employee may become over-dependent on AI for strategic thinking',
              ],
              correct: 1,
              explanation:
                'Confidential strategic information shared with a consumer AI tool is potentially stored, used for model training, and accessible to the provider and their partners. This is a material data security risk with competitive implications. Governance requires clear rules about what types of information can go into which tools — and this scenario represents exactly the type of use that should be restricted to approved enterprise tools.',
            },
            {
              question:
                'Why should AI tools be included in business continuity planning?',
              options: [
                'Regulators require all technology tools to be included in BCP',
                'Critical processes that depend on AI tools become vulnerable if those tools fail or are discontinued',
                'AI tools are more likely to fail than traditional software systems',
                'Business continuity planning is required for all cloud-based tools',
              ],
              correct: 1,
              explanation:
                'If a process is critical enough that AI failure would cause significant disruption, it must be in your BCP. The relevant scenarios: the AI tool\'s API goes down during a critical period; the vendor is acquired and the service changes; pricing becomes unaffordable; a security incident triggers a compliance-required suspension. None of these are likely at any given moment — but their impact if they occur without a continuity plan can be severe.',
            },
          ],
        },
        {
          id: 'leadership-m1-l4',
          title: 'Your AI Leadership Credibility',
          duration: 15,
          description:
            'Build the personal credibility to lead AI adoption by developing your own AI practice.',
          content: `## Your AI Leadership Credibility

Leaders who advocate for AI adoption without practising it themselves face a credibility problem. Your team will take AI seriously when they see you taking it seriously — using it, talking about what works and what does not, and making visible choices about when AI helps and when it does not.

### The personal AI practice for leaders

Effective leadership in the AI era does not require deep technical knowledge. It requires a personal practice: regular, deliberate use of AI tools in your own work, sufficient to develop genuine insight into their capabilities and limitations.

Three areas where leaders consistently find AI valuable:

**Communication drafting and refinement**
Use AI to draft communications, then refine them with your voice and context. This builds intuition for where AI drafts capture your intent and where they diverge — insight you cannot get from any briefing.

**Preparation and synthesis**
Before board meetings, strategy sessions, or difficult conversations, use AI to synthesise the relevant background information, generate the questions you might face, and identify perspectives you might have missed.

**Thinking partner**
Describe a complex decision or situation to Claude and ask it to challenge your assumptions, propose alternative framings, or identify what you are not considering. This is not delegation — it is augmented thinking.

### Modelling appropriate AI use

How you talk about AI matters as much as whether you use it. Share both the wins and the limitations. When AI gives you a useful insight, say so. When it misses something important, say that too. Balanced, honest commentary from a leader builds a culture of realistic AI expectations — far more valuable than uncritical enthusiasm or reflexive scepticism.

### Building your AI credibility checklist

You are ready to lead AI adoption credibly when you can: demonstrate at least three AI applications you use regularly, describe clearly what AI cannot do in your context, articulate the governance principles your organisation applies, and answer the question "why should my team change how they work?" with evidence from your own practice.`,
          keyTakeaways: [
            'Leadership credibility in AI comes from personal practice, not position or advocacy',
            'Three high-value leader AI applications: communication drafting, preparation and synthesis, thinking partner',
            'Modelling balanced AI use — wins and limitations — builds a culture of realistic expectations',
            'You are ready to lead AI adoption when you can demonstrate practice, not just advocate for it',
          ],
          exercise: {
            title: 'Build Your Personal AI Practice',
            description:
              'Establish three regular AI practices you will use in your leadership role.',
            steps: [
              'Identify three recurring leadership tasks that currently take more time than they should',
              'For each, design an AI-assisted workflow: what prompt would you use, what review would you apply?',
              'Try each workflow this week with a real task',
              'Note: what worked, what did not, what surprised you?',
              'Write a two-paragraph reflection you could share with your team about what you learned',
            ],
            tool: 'Claude (claude.ai)',
          },
          quiz: [
            {
              question:
                'Why is personal AI practice more important for a leader\'s credibility than formal AI training?',
              options: [
                'Training courses are not rigorous enough to build genuine understanding',
                'Practice generates the firsthand experience and authentic insight that training cannot replace',
                'Formal training is only available to technical roles',
                'Leaders do not have time for formal training programmes',
              ],
              correct: 1,
              explanation:
                'Training provides conceptual knowledge. Practice generates experiential knowledge — the intuitions, edge cases, and real limitations that you can only discover by doing. When a team member asks "what happens when AI misses the context?" a leader who has experienced this firsthand can answer credibly. A leader who has only attended training cannot.',
            },
            {
              question:
                'What is the most effective way for a leader to model healthy AI culture?',
              options: [
                'Enthusiastically promote AI in every team communication',
                'Share both successful AI applications and honest assessments of limitations from your own practice',
                'Delegate all AI adoption to a designated AI champion',
                'Focus on AI governance and risk management to signal responsible use',
              ],
              correct: 1,
              explanation:
                'Uncritical enthusiasm creates unrealistic expectations that lead to disillusionment. Excessive caution signals that AI is not serious. Balanced, honest sharing — "I used AI to prepare for this presentation and it saved me an hour; it also got one fact completely wrong that I had to correct" — builds a culture of realistic expectations and appropriate verification habits.',
            },
            {
              question:
                'Using AI as a "thinking partner" means:',
              options: [
                'Delegating decisions to AI and implementing the recommendation',
                'Having AI make the initial assessment and humans review the output',
                'Sharing your thinking with AI to get challenges, alternative framings, and blind spots identified',
                'Using AI to generate options before bringing the decision to the team',
              ],
              correct: 2,
              explanation:
                'A thinking partner challenges your reasoning, not replaces it. When you describe a complex decision to Claude and ask it to push back on your assumptions, identify what you might be missing, or propose an alternative interpretation — you are using AI to augment your thinking, not substitute for it. The decision remains yours; the quality of the thinking improves.',
            },
          ],
        },
      ],
    },
    {
      id: 'leadership-m2',
      title: 'Setting the AI Vision and Strategy',
      description:
        'Develop and articulate a compelling AI vision that aligns your organisation and drives sustained adoption.',
      lessons: [
        {
          id: 'leadership-m2-l1',
          title: 'Defining Your Organisational AI Vision',
          duration: 20,
          description:
            'Create a clear, compelling AI vision that connects technology opportunity to organisational purpose.',
          content: `## Defining Your Organisational AI Vision

An AI vision is not a technology statement. It is an answer to: what kind of organisation do we want to be, and how does AI help us get there? Leaders who frame AI adoption in terms of technology miss the most important questions — the ones their teams are actually asking.

### Why most AI visions fail

The most common AI vision problem is technology-centricity: "We will become an AI-first organisation" or "We will adopt AI across all functions by 2026." These statements tell people what the organisation will do, not why. They do not answer: why does this matter? What will be different for customers, employees, and the organisation itself?

The second common problem is unrealistic ambition: visions that promise transformation in timeframes inconsistent with the pace of real organisational change. When reality does not match the vision, credibility suffers and cynicism grows.

### The elements of an effective AI vision

**Grounded in organisational purpose**
Your AI vision should connect directly to what your organisation exists to do. If your purpose is to deliver exceptional client service, the vision should articulate how AI enables your team to do that better — not how AI will transform your operations in the abstract.

**Specific about what changes**
What will employees be able to do that they cannot do now? What will customers experience that they cannot experience now? What decisions will be faster, better, or more consistent? Specific answers to these questions make the vision credible and motivating.

**Honest about what it requires**
Vision without acknowledgment of difficulty loses credibility. The best AI visions acknowledge: this will require us to learn new skills, challenge existing processes, and accept that some things will not work the first time.

**Anchored in a compelling reason to change**
The most effective change visions create urgency without fear. Not: "We must do this or competitors will beat us." But: "This is the capability that lets us deliver on our promise to [customers/patients/students] in a way we have never been able to before."`,
          keyTakeaways: [
            'Effective AI visions connect technology to organisational purpose, not technology to technology',
            'Specificity makes visions credible: what will change for employees and customers?',
            'Acknowledge difficulty honestly — credibility is built on realism, not optimism alone',
            'Ground urgency in positive aspiration, not competitive fear',
          ],
          exercise: {
            title: 'Draft Your AI Vision',
            description:
              'Write a compelling one-paragraph AI vision for your organisation.',
            steps: [
              'Start with your organisation\'s core purpose: what does it exist to do for whom?',
              'Identify three specific ways AI could help your organisation fulfil that purpose better',
              'Draft a vision statement that connects AI capability to organisational purpose in specific terms',
              'Test it: could someone reading this understand what would be different in 2 years? What they would need to do?',
              'Share it with Claude and ask: "Does this sound credible? What is unclear? What might cause cynicism?"',
            ],
            tool: 'Claude (claude.ai)',
          },
          quiz: [
            {
              question:
                'What is the most common reason AI visions fail to drive adoption?',
              options: [
                'They are too technically complex for non-technical employees to understand',
                'They describe technology changes rather than what employees and customers will experience differently',
                'They do not include enough detail about implementation timelines and milestones',
                'They lack buy-in from the board before being communicated',
              ],
              correct: 1,
              explanation:
                'Technology-centric visions answer the wrong question. Employees are not asking "what technology will we adopt?" They are asking "what will be different about my work?" and "what does this mean for me?" Visions that answer those questions in concrete terms drive the behaviour change that makes adoption real.',
            },
            {
              question:
                'Which of the following is the most effective AI vision statement?',
              options: [
                '"We will be an AI-first organisation by 2027"',
                '"We will implement AI tools across all business functions within 18 months"',
                '"AI will free our client teams from administrative work so every hour is spent on the advice and relationships our clients value most"',
                '"We will invest £5 million in AI capability to drive competitive advantage"',
              ],
              correct: 2,
              explanation:
                'The third option connects AI capability to a specific change in what employees do and why it matters to clients. It answers: what changes (administrative work), who benefits (client teams and clients), and why it matters (hours on advice and relationships that clients value). The others describe actions without explaining the purpose or the specific change.',
            },
            {
              question:
                'Why is acknowledging difficulty important in an AI vision?',
              options: [
                'Leaders are legally required to disclose implementation risks',
                'Honest acknowledgment of difficulty builds credibility and prepares people for the real challenges ahead',
                'It reduces liability if the AI initiative does not deliver the expected results',
                'Teams are more motivated when they know a task is difficult',
              ],
              correct: 1,
              explanation:
                'Visions that promise only positive outcomes create cynicism when reality is messier — and reality always is. Leaders who acknowledge "this will be hard, here is specifically why, and here is why we are doing it anyway" build more trust than those who sell transformation as straightforward. Credibility earned through honesty drives the sustained commitment that makes adoption succeed.',
            },
          ],
        },
        {
          id: 'leadership-m2-l2',
          title: 'Building the AI Business Case for Leadership',
          duration: 18,
          description:
            'Develop and present a compelling business case for AI investment to your board and executive team.',
          content: `## Building the AI Business Case for Leadership

Every significant AI investment requires a business case. For leaders, this means translating between the AI opportunity you see and the financial and strategic language that boards and executive teams use to make decisions.

### What a board-level AI business case needs

**Financial impact with credible assumptions**
Boards want to see financial projections with stated assumptions they can evaluate. Not: "AI will save millions." But: "If AI reduces processing time by 40% on our highest-volume workflows, and our fully-loaded team cost is £X, the annual saving is £Y. This assumes Z, which we have validated with a 6-week pilot."

**Strategic positioning, not just cost savings**
Cost reduction business cases are approved and forgotten. Strategic positioning business cases are funded and championed. Frame AI investment as capability development: what will this organisation be able to do in 3 years that it cannot do today, and why does that matter for competitive position?

**Risk picture**
Boards that are not shown risks assume risks are being hidden. A credible business case includes: data security risks and mitigations, regulatory considerations, implementation risk, and what happens if the initiative underperforms.

**Governance and oversight**
How will AI use be governed? Who is accountable? What review mechanisms exist? Boards want to know that leadership has thought about this, not that they will improvise as problems arise.

**Phased approach**
Boards distrust big-bang AI programmes. A phased approach — pilot, validate, scale — with clear decision gates at each phase is more fundable and more credible than a multi-year transformation programme with a single approval point.

### Common business case mistakes

Over-promising on timeline: AI implementation always takes longer than projected. Build in realistic contingency. Under-representing total cost: tool costs are visible; training, change management, process redesign, and technical integration are often underestimated. Ignoring the baseline: without a clear current-state baseline, it is impossible to demonstrate that AI delivered the projected benefit.`,
          keyTakeaways: [
            'Boards need: financial impact with assumptions, strategic positioning, risks, governance, and phased approach',
            'Strategic capability framing attracts more sustained investment than cost reduction framing alone',
            'Always show risks — boards that see no risks assume they are being hidden',
            'Phased approaches with decision gates are more fundable than big-bang programmes',
          ],
          exercise: {
            title: 'Executive Business Case Summary',
            description:
              'Draft a two-page executive summary for an AI investment you want to propose.',
            steps: [
              'Define the investment: what AI capability, for which functions, over what timeline?',
              'Calculate the financial impact: efficiency, quality, and strategic value with stated assumptions',
              'Identify the top three risks and your mitigation for each',
              'Describe your governance approach: who owns it, how is it reviewed?',
              'Draft a phased approach: pilot, validate, scale — with decision gates and resource requirements at each phase',
            ],
            tool: 'Claude (claude.ai)',
          },
          quiz: [
            {
              question:
                'Why do strategic positioning business cases attract more sustained investment than cost reduction cases?',
              options: [
                'Boards care more about strategy than financial performance',
                'Cost savings are one-time; strategic capabilities compound and attract ongoing investment',
                'Strategic cases are easier to measure and track over time',
                'Cost reduction initiatives are subject to more regulatory scrutiny',
              ],
              correct: 1,
              explanation:
                'Cost reduction delivers a one-time saving, then gets absorbed. A capability — the ability to serve clients better, develop products faster, make decisions with better information — delivers ongoing competitive value that grows as the organisation gets better at using it. Boards invest in capabilities because they see compounding returns; cost savings are funded and forgotten.',
            },
            {
              question:
                'A board member asks: "What could go wrong with this AI programme?" What is the best response?',
              options: [
                '"We have identified and mitigated all significant risks" — this signals rigour',
                '"The main risks are X, Y, and Z. Here is how we are addressing each, and here is what we would do if they materialise"',
                '"The risks are manageable and should not delay approval"',
                '"We will identify and address risks as they arise during implementation"',
              ],
              correct: 1,
              explanation:
                'Boards are risk oversight bodies. Claiming all risks are mitigated triggers scepticism. Dismissing risks as manageable signals lack of rigour. Improvising risk management during implementation is the approach that produces disasters. Naming specific risks and demonstrating you have thought about each one — including contingency responses — is what credible risk governance looks like.',
            },
            {
              question:
                'What is the most commonly underestimated cost in AI programme business cases?',
              options: [
                'AI tool licence fees and API costs',
                'Hardware and infrastructure requirements',
                'Change management, training, and process redesign costs',
                'External consultant fees for implementation support',
              ],
              correct: 2,
              explanation:
                'Tool costs are visible and easy to obtain from vendors. Change management, training, and process redesign are often treated as existing team capacity — which creates both an unrealistic business case and an overloaded team. In reality, sustainable AI adoption requires significant investment in people change: training, coaching, process documentation, and management time. These typically exceed tool costs for successful implementations.',
            },
          ],
        },
        {
          id: 'leadership-m2-l3',
          title: 'Prioritising AI Initiatives: A Strategic Framework',
          duration: 18,
          description:
            'Use a structured framework to choose which AI initiatives to pursue, sequence, and scale.',
          content: `## Prioritising AI Initiatives: A Strategic Framework

Most organisations face the opposite of a shortage of AI ideas — they have too many. Different functions want different tools; different leaders champion different initiatives; different vendors offer different visions. Without a prioritisation framework, organisations spread effort across too many initiatives and achieve meaningful progress in none.

### The strategic prioritisation dimensions

**Value potential**
What is the realistic financial or strategic impact if this succeeds? Consider: size of the opportunity, how directly AI addresses the underlying problem, and how durable the value is likely to be.

**Implementation feasibility**
How ready is the organisation to implement this well? Consider: data availability and quality, process clarity, technical integration requirements, change management complexity, and skill availability.

**Strategic alignment**
Does this AI application reinforce or distract from the organisation's stated strategic priorities? The best AI applications accelerate strategy rather than running alongside it.

**Risk and reversibility**
What happens if this does not work? Some AI applications are low-risk experiments; others are high-stakes bets. The portfolio should balance risk appropriately.

### Building the AI initiative portfolio

Plot your candidate initiatives on a value vs. feasibility matrix. This gives you four categories:

**High value, high feasibility (pursue first)**: These are your quick wins and strategic anchors. Fund them properly and build them well.

**High value, low feasibility (invest to unlock)**: These are worth pursuing but require building capability first — better data, clearer processes, stronger governance. Create a path to feasibility.

**Low value, high feasibility (optional and selective)**: These can fill gaps and build skills without consuming strategic resources. Pursue opportunistically.

**Low value, low feasibility (decline)**: These are exactly what they appear to be. Say no clearly and move on.

### Sequencing for momentum

Sequence your portfolio to build momentum: start with a high-visibility, achievable application that delivers results quickly. Success in this first initiative builds organisational confidence, develops internal capability, and creates the evidence base for larger investments.`,
          keyTakeaways: [
            'Prioritise across four dimensions: value, feasibility, strategic alignment, and risk',
            'Plot initiatives on a value vs. feasibility matrix to categorise and sequence',
            'Sequence for momentum: early visible wins build confidence for larger investments',
            'Strategic alignment is the deciding factor when value and feasibility are similar',
          ],
          exercise: {
            title: 'Prioritise Your AI Initiative Portfolio',
            description:
              'Apply the framework to your current list of AI opportunities.',
            steps: [
              'List all AI initiatives currently under discussion or consideration in your organisation',
              'Score each on value (1-5) and feasibility (1-5) using the criteria from the lesson',
              'Plot on a 2x2 matrix and categorise each initiative',
              'Sequence the top three: which goes first, second, third, and why?',
              'Identify the one initiative most worth saying no to — and draft how you will explain the decision',
            ],
            tool: 'Claude (claude.ai)',
          },
          quiz: [
            {
              question:
                'An AI initiative has high value potential but low feasibility due to poor data quality. What is the right decision?',
              options: [
                'Pursue it anyway — the value potential justifies the risk',
                'Decline it permanently — low feasibility means it should not be pursued',
                'Invest in building the data capability first, then re-evaluate feasibility',
                'Pilot it with available data and accept that results will be suboptimal',
              ],
              correct: 2,
              explanation:
                'High value, low feasibility is the category worth investing to unlock. If data quality is the barrier, fix the data. This may take 3-6 months longer, but the alternative — implementing AI on poor data — produces unreliable outputs that undermine confidence in the initiative and in AI broadly. Build the foundation, then build the application.',
            },
            {
              question:
                'Why is an early, visible AI win strategically important even if the absolute value is modest?',
              options: [
                'It allows the organisation to recover implementation costs quickly',
                'It builds organisational confidence, develops capability, and creates evidence for larger investments',
                'It demonstrates to competitors that the organisation is AI-capable',
                'Early wins generate board approval for the AI programme budget',
              ],
              correct: 1,
              explanation:
                'Early wins are momentum builders, not just value generators. An organisation that has successfully implemented an AI application — even a modest one — has developed skills, resolved integration questions, learned how to govern AI, and built the internal credibility to pursue larger initiatives. The organisational learning from early wins often exceeds the direct financial value.',
            },
            {
              question:
                'Two AI initiatives have similar value potential. One strongly reinforces your strategic priority of personalised customer experience; the other improves back-office efficiency. How should strategic alignment affect prioritisation?',
              options: [
                'Prioritise the back-office efficiency initiative — it is typically faster to implement',
                'Prioritise the customer experience initiative — strategic alignment is the deciding factor',
                'Pursue both simultaneously — similar value means similar priority',
                'Let the function most prepared to implement decide',
              ],
              correct: 1,
              explanation:
                'When value is similar, strategic alignment should decide. AI initiatives that directly accelerate your stated strategy generate additional organisational energy — the CEO references them, the strategy reinforces them, budget decisions favour them. Initiatives that run alongside strategy get deprioritised when resources are constrained. Alignment is a force multiplier.',
            },
          ],
        },
        {
          id: 'leadership-m2-l4',
          title: 'Communicating the AI Strategy: Narrative and Messaging',
          duration: 15,
          description:
            'Develop and deliver compelling AI strategy communications for different audiences.',
          content: `## Communicating the AI Strategy: Narrative and Messaging

The best AI strategy will fail if it is not communicated well. Leaders underestimate how much communication strategy matters — and how differently different audiences need to hear the same message.

### The four audiences and what they need to hear

**Board and executive team**: Strategic rationale, investment case, risk governance, and competitive positioning. They need to understand why this is the right bet and that it is being managed responsibly. Keep it high-level, evidence-based, and decision-focused.

**Middle managers**: What this means for their team, what they are being asked to do differently, how they will be supported, and how they will be judged. They need operational clarity, not strategic framing. They are the implementation layer — their confusion or resistance is where strategies stall.

**Frontline team members**: What will change about my work? What will I need to learn? Will my job still exist? They need honest, specific answers to these questions, delivered before the rumour mill provides its own answers.

**External stakeholders (clients, partners, regulators)**: Depending on your sector and the visibility of AI use, some external communication may be needed. Clients care about what AI use means for service quality, data security, and their experience. Lead with these concerns rather than your internal efficiency narrative.

### The narrative structure that works

Great strategy communications follow a consistent structure: here is the world as it is, here is the opportunity we see, here is the path we are taking, here is what it means for you, here is what we need from you.

This structure works because it respects the audience's intelligence, answers their real questions in order, and ends with a clear call to action rather than a vague aspiration.

### Using AI to develop communications

Use AI to help draft and test your strategy communications. Describe your audience, your key messages, and the concerns you anticipate, and ask Claude to draft a communication and then critique it: "What is unclear? What question does this leave unanswered? What might cause this audience to be resistant?" This combination of AI drafting and AI critique produces more polished communications faster than unaided drafting.`,
          keyTakeaways: [
            'Four audiences need different messages: board, middle managers, frontline, external stakeholders',
            'Middle managers are the implementation layer — their clarity is the most operationally critical',
            'The effective narrative structure: world as it is → opportunity → path → what it means for you → what we need',
            'Use AI to draft and critique communications before delivery',
          ],
          exercise: {
            title: 'Develop Your AI Strategy Communications Plan',
            description:
              'Create tailored communications for two different audiences.',
            steps: [
              'Choose two of your four key audiences: board, middle managers, frontline, or external',
              'For each, answer: what are their top three concerns about AI? What do they most need to know?',
              'Draft a communication for each using the narrative structure from the lesson',
              'Use Claude to critique each draft: "What is unclear? What concern is not addressed? What might trigger resistance?"',
              'Revise and prepare to deliver',
            ],
            tool: 'Claude (claude.ai)',
          },
          quiz: [
            {
              question:
                'Why is communication to middle managers particularly critical for AI strategy success?',
              options: [
                'Middle managers control the AI tool budget in most organisations',
                'They are the implementation layer — their clarity or confusion directly determines whether strategy reaches frontline teams',
                'Middle managers are typically the most resistant to AI adoption',
                'Middle managers need more technical understanding of AI than other audiences',
              ],
              correct: 1,
              explanation:
                'Strategy stalls at middle management because they translate strategy into operational action. If a middle manager is unclear about what AI adoption means for their team, ambivalent about the change, or does not know how to answer their team\'s questions — the strategy stops there. The board can be fully aligned, the frontline can be willing, and the whole initiative will still fail if middle managers are not equipped to implement.',
            },
            {
              question:
                'A frontline employee asks: "Is AI going to replace my job?" What is the most effective response?',
              options: [
                '"No — AI is just a tool and will never replace human workers"',
                '"That\'s a question for HR to answer"',
                '"Here is honestly what we know, what we don\'t know, and how we will support you through the changes that do happen"',
                '"AI will make everyone more productive, which is good for job security"',
              ],
              correct: 2,
              explanation:
                'Honest, specific answers to real concerns build more trust than reassuring generalities. "AI will never replace jobs" is demonstrably false in some contexts. "It is fine, don\'t worry" is dismissive. The effective response acknowledges the legitimate concern, shares what is actually known, is honest about uncertainty, and commits to the support that will be provided. This is harder to say but much more credible.',
            },
            {
              question:
                'In the effective narrative structure for AI strategy communications, what comes after explaining the opportunity?',
              options: [
                'The specific AI tools being adopted',
                'The path being taken — how the organisation will pursue the opportunity',
                'The risks and mitigation strategies',
                'The investment required and expected returns',
              ],
              correct: 1,
              explanation:
                'Opportunity without path creates anxiety ("so what do we do?"). After showing the audience what is possible, the next question they are asking is "and what are we doing about it?" The path section answers this: the specific choices being made, the sequencing, and the rationale. Only after this does "what it means for you" land effectively — because now the audience understands the direction they are being asked to move in.',
            },
          ],
        },
      ],
    },
    {
      id: 'leadership-m3',
      title: 'Leading Change Through AI Adoption',
      description:
        'Develop the change leadership capabilities to drive sustained AI adoption across your organisation.',
      lessons: [
        {
          id: 'leadership-m3-l1',
          title: 'Understanding Resistance to AI: Root Causes and Responses',
          duration: 18,
          description:
            'Diagnose the real sources of AI resistance in your organisation and respond to each effectively.',
          content: `## Understanding Resistance to AI: Root Causes and Responses

Resistance to AI adoption is not irrational. Most of it has rational roots — experience with past technology failures, legitimate concerns about job security, or genuine scepticism about AI claims. Leaders who dismiss resistance as irrationality miss the opportunity to address its real causes.

### The five root causes of AI resistance

**Fear of job displacement**
The most common and most powerful source of resistance. Often unstated, because raising it feels professionally risky. Manifests as: excessive scrutiny of AI quality, slow adoption despite stated enthusiasm, or active obstruction framed as quality concern.

Response: be explicit and honest about the intent. If AI is freeing time for higher-value work, say so — and show what that higher-value work is. If some roles will change significantly, acknowledge it and describe the support that will be provided. Ambiguity feeds fear.

**Past technology implementation trauma**
Organisations that have suffered through failed technology implementations — systems that did not deliver, processes that broke down, promised support that did not materialise — carry that experience into every new initiative.

Response: acknowledge the experience directly. Show specifically how this is different: smaller scope, clear evidence of value, sustained support. Deliver on commitments consistently — one missed commitment reactivates the trauma.

**Genuine scepticism about capability**
Some resistance comes from people who have actually tried AI and found it inadequate for their specific needs, or who are asking the right questions about AI limitations.

Response: welcome this. Sceptics who engage are far more valuable than enthusiasts who do not. Their questions improve your AI implementation. Give them the opportunity to test AI in a controlled way with support — and acknowledge when they are right about limitations.

**Ethical and values concerns**
Concerns about data privacy, algorithmic bias, transparency, or the broader social impact of AI. Often held by high-performing, thoughtful employees whose concerns are worth hearing.

Response: take these seriously. Engage with the substance. Show how your governance addresses the concerns. Do not dismiss values concerns as obstacles to progress.

**Inertia**
The simplest form of resistance: "We have always done it this way." Not hostile, just unchanged.

Response: make it easier to change than to stay the same. Remove friction from adoption, celebrate early adopters visibly, and ensure the status quo has a visible cost.`,
          keyTakeaways: [
            'Five root causes of AI resistance: fear, trauma, scepticism, values concerns, and inertia',
            'Address each cause with a specific response — generic reassurance works for none of them',
            'Sceptics who engage are more valuable than passive enthusiasts',
            'Ambiguity about job impact feeds fear — be explicit about intent',
          ],
          exercise: {
            title: 'Map Resistance in Your Organisation',
            description:
              'Identify the primary resistance sources in your organisation and design a response.',
            steps: [
              'List the three most common resistance patterns you observe in your team or organisation',
              'For each, diagnose the root cause using the five categories from the lesson',
              'Design a specific response for each root cause',
              'Identify the one resistance source that is most likely to derail your AI initiative if unaddressed',
              'Draft a conversation you will have with a key resister this week',
            ],
            tool: 'Claude (claude.ai)',
          },
          quiz: [
            {
              question:
                'An employee consistently finds technical reasons why AI outputs are inadequate for their specific use case. What is this most likely to be?',
              options: [
                'Inertia — they prefer familiar ways of working',
                'Genuine scepticism or fear of job displacement manifesting as technical critique',
                'Values concerns about AI transparency',
                'Past technology trauma affecting their confidence in new systems',
              ],
              correct: 1,
              explanation:
                'Technical critique that persists across multiple AI applications often has a non-technical root. It may be genuine scepticism (in which case, engage with the substance — they may be right). It may be fear of displacement (in which case, the technical critique is the face-saving framing). Distinguish by engaging directly with the technical concerns: if they dissolve when addressed, the root was fear; if they deepen and become more sophisticated, the root was genuine scepticism.',
            },
            {
              question:
                'Your organisation suffered a major ERP implementation failure three years ago. You are now proposing an AI initiative. How does that history affect your approach?',
              options: [
                'It should not affect it — this is a different technology and a different initiative',
                'You should acknowledge the history directly and show specifically how this initiative avoids the same failure modes',
                'You should minimise discussion of the ERP failure to avoid reactivating negative associations',
                'You should get leadership to mandate the AI adoption to overcome historical resistance',
              ],
              correct: 1,
              explanation:
                'Past implementation trauma is present in the room whether you acknowledge it or not. Ignoring it allows it to operate implicitly — as unstated scepticism that you cannot address. Naming it directly ("I know the ERP implementation three years ago was painful — here is specifically how this is different") respects the experience, builds credibility, and makes the implicit explicit so it can be addressed.',
            },
            {
              question:
                'Which type of AI resistance is generally most productive for the organisation in the long run?',
              options: [
                'Inertia — it slows adoption enough to allow problems to be identified',
                'Fear — it ensures leaders are held accountable for workforce impacts',
                'Genuine scepticism — it improves implementation quality and identifies real limitations',
                'Values concerns — they create legal and reputational protection',
              ],
              correct: 2,
              explanation:
                'Genuine sceptics ask the questions that prevent bad AI implementations. They push on data quality, edge cases, governance gaps, and capability limitations. When their concerns are engaged seriously and they are given controlled testing opportunities, they become the most rigorous AI adopters — and often the most credible advocates once they see it working well.',
            },
          ],
        },
        {
          id: 'leadership-m3-l2',
          title: 'Building the Coalition for AI Change',
          duration: 15,
          description:
            'Identify, develop, and activate the change coalition that will drive AI adoption.',
          content: `## Building the Coalition for AI Change

Sustained organisational change does not happen through top-down mandate. It happens when a critical mass of people throughout the organisation believe in the direction and actively work to drive it. Building that coalition is the central change leadership task in AI adoption.

### The coalition architecture

**Executive sponsor**
One executive — ideally you — who is visibly committed, provides resources, removes barriers, and takes accountability for outcomes. The sponsor makes the change real by making visible decisions in its favour.

**AI champion network**
Individuals throughout the organisation — not necessarily senior — who are enthusiastic about AI, willing to try new things, and credible with their peers. These are your scouts and early adopters. They demonstrate what AI adoption looks like in practice and support colleagues who are earlier in the journey.

**Function leads**
Senior leaders in each function who own AI adoption within their area. They set expectations, allocate time for learning and experimentation, and connect AI adoption to functional performance.

**Sceptic allies**
Respected individuals whose concerns are taken seriously by their peers. When a credible sceptic becomes an advocate — having tested AI and found genuine value — that advocacy is worth more than ten enthusiasts. Identify your most credible sceptics and invest in giving them a positive, well-supported AI experience.

### Developing the champion network

Champions are not appointed — they emerge. They are the people who have already started experimenting with AI, who ask questions in town halls, who share what they are learning with colleagues.

To develop this network:
- Create visibility: give champions opportunities to share what they are doing
- Create community: a regular champion call or channel where they share tips and support each other
- Create resources: give champions access to tools, training, and management support
- Create recognition: celebrate champion contributions visibly`,
          keyTakeaways: [
            'Sustained change requires a coalition: sponsor, champions, function leads, and sceptic allies',
            'Champions emerge — find them through experimentation behaviour, then invest in them',
            'A credible sceptic who becomes an advocate is worth more than many enthusiasts',
            'Create visibility, community, resources, and recognition to develop the champion network',
          ],
          exercise: {
            title: 'Map and Activate Your Coalition',
            description:
              'Identify the key people in your AI change coalition and plan your first activation step.',
            steps: [
              'Identify three people in your organisation who are already experimenting with AI (your potential champions)',
              'Identify two function leads whose active sponsorship you need most',
              'Identify one credible sceptic whose advocacy would be most valuable',
              'Design one activation step for each group this month',
              'Ask Claude to help you draft a brief for your first champion community meeting',
            ],
            tool: 'Claude (claude.ai)',
          },
          quiz: [
            {
              question: 'Why are sceptic allies potentially the most valuable members of an AI change coalition?',
              options: [
                'Sceptics slow adoption enough to allow quality control',
                'Respected sceptics who become advocates have more credibility with peers than existing enthusiasts',
                'Sceptics provide the risk management expertise the coalition needs',
                'Converting sceptics is the most efficient path to organisation-wide adoption',
              ],
              correct: 1,
              explanation:
                'Credibility is the mechanism. When a known sceptic — someone whose peers respect their rigour and whose concerns carry weight — says "I tested this and it genuinely works," that advocacy is more persuasive to the unconvinced majority than any number of messages from obvious enthusiasts. Peer credibility is the currency of change, and sceptics who become advocates spend it most effectively.',
            },
            {
              question: 'What is the most common mistake in AI champion programmes?',
              options: [
                'Selecting champions who are too senior',
                'Providing too many resources and creating dependency',
                'Appointing champions through official designation rather than identifying natural champions',
                'Focusing champions on training delivery rather than peer support',
              ],
              correct: 2,
              explanation:
                'Appointed champions who lack genuine enthusiasm perform the role mechanically and ineffectively. Natural champions — who are already experimenting, sharing, and supporting colleagues — perform the role authentically and credibly. The leadership task is identification and investment, not appointment. Find who is already doing the behaviour, then amplify it.',
            },
            {
              question: 'What does a function lead need from the executive sponsor to drive AI adoption in their area?',
              options: [
                'A detailed implementation plan they can follow',
                'Technical AI expertise to answer team questions',
                'Clear expectations, allocated time for adoption activities, and active problem removal',
                'A dedicated AI budget separate from operational spending',
              ],
              correct: 2,
              explanation:
                'Function leads adopt AI when they know what is expected of them (clear expectations), can allocate team time without it being seen as distraction from operational performance (time allocation), and can escalate barriers to someone with the authority to remove them (active problem removal). The sponsor\'s role is to create these conditions, not to manage the implementation.',
            },
          ],
        },
        {
          id: 'leadership-m3-l3',
          title: 'Creating Psychological Safety for AI Experimentation',
          duration: 18,
          description:
            'Build the organisational conditions where your team will try, fail, learn, and improve with AI.',
          content: `## Creating Psychological Safety for AI Experimentation

AI adoption requires experimentation. Experimentation requires that people are willing to try things that might not work. And trying things that might not work requires psychological safety — the belief that failure will not be punished and that honest communication about what is not working will be valued.

### What psychological safety means for AI adoption

In AI contexts, psychological safety means:
- People share when AI gives wrong answers without fear of being seen as failing
- Teams experiment with new AI approaches without needing to guarantee success upfront
- Individuals are honest about what they do not understand without fear of seeming incompetent
- Leaders are told when AI initiatives are underperforming, not when they are looking for more investment

Without this, you get the opposite: teams that quietly abandon AI tools without telling anyone, individuals who pretend competence rather than ask for help, and leaders who hear "it is going well" right up until the initiative collapses.

### How leaders create psychological safety

**Model vulnerability**
Talk publicly about your own AI learning journey — including the mistakes. "I tried to use AI for X and it got it wrong in a way I should have caught. Here is what I learned." Leaders who model imperfection normalise it for their teams.

**Celebrate intelligent failure**
When a team tries an AI application that does not work and learns something from it, celebrate the learning. "Tell me about what did not work and what you figured out" is a different conversation from "why did this not succeed?"

**Separate learning metrics from performance metrics**
During AI adoption, create a space for experimentation that is evaluated on learning and iteration rather than results. This does not mean abandoning accountability — it means being clear about where exploration norms apply and where execution norms apply.

**Ask questions, not just for answers**
Leaders who ask "what are we learning?" and "what is not working?" create different information flows than leaders who only ask "are we on track?" The former surfaces problems while they are still fixable.`,
          keyTakeaways: [
            'Psychological safety is the prerequisite for the experimentation that AI adoption requires',
            'Leaders create safety by modelling vulnerability, celebrating intelligent failure, and asking learning questions',
            'Without safety, initiatives look successful until they collapse — not because people failed but because they could not speak up',
            'Separate learning metrics from performance metrics during AI experimentation phases',
          ],
          exercise: {
            title: 'Assess Your Team\'s Psychological Safety',
            description:
              'Evaluate the current psychological safety in your team and identify one action to strengthen it.',
            steps: [
              'Ask yourself: in the last month, how many times did a team member tell you something was not working with AI before being asked?',
              'Reflect: when you hear about an AI failure, what is your first reaction? What does your team see?',
              'Identify one recent AI setback or underperformance. How was it communicated to you and when?',
              'Design one action this week to signal that honest reporting of AI problems is valued',
              'Ask Claude to help you design a short team conversation: "What would make it easier to share when something with AI is not working?"',
            ],
            tool: 'Claude (claude.ai)',
          },
          quiz: [
            {
              question:
                'What is the main risk of low psychological safety in an AI adoption programme?',
              options: [
                'Teams adopt AI too slowly, missing competitive opportunity',
                'Leaders receive positive signals about AI progress until problems become unmanageable',
                'Employees become over-reliant on AI and lose critical thinking skills',
                'AI governance gaps go unaddressed because teams avoid raising concerns',
              ],
              correct: 1,
              explanation:
                'In low-safety environments, bad news travels slowly. People quietly abandon tools that are not working without reporting the failure. They claim competence they do not have. They tell leaders what leaders want to hear. The result: AI initiatives appear to be progressing right up until the gap between appearance and reality becomes impossible to hide. By then, the problem is much larger than it needed to be.',
            },
            {
              question:
                'What is "intelligent failure" in the context of AI experimentation?',
              options: [
                'Failures that occur because of AI system errors rather than human mistakes',
                'Failures that happen in controlled, low-stakes contexts where learning is the goal',
                'Failures that are analysed by AI tools to prevent recurrence',
                'Failures that occur at the beginning of implementation before the system is calibrated',
              ],
              correct: 1,
              explanation:
                'Intelligent failure is failure that happens for the right reasons: the team was trying something new, in a bounded context, with the genuine intent to learn. It is distinguished from unintelligent failure (ignoring known risks, repeating known mistakes, failing in high-stakes contexts unnecessarily). Celebrating intelligent failure — "you tried something we had not tried before, it did not work, you learned X, that is valuable" — normalises the experimentation that drives progress.',
            },
            {
              question:
                'A leader discovers that a team\'s AI initiative is underperforming significantly. The team only revealed this when pressed. What does this signal?',
              options: [
                'The team is not committed to the AI initiative',
                'The AI tools being used are not sufficiently capable',
                'The team does not feel safe sharing bad news proactively',
                'The reporting mechanisms for the initiative are inadequate',
              ],
              correct: 2,
              explanation:
                'When teams only share bad news when pressed, the signal is almost always about psychological safety rather than commitment or competence. They knew the news; they chose not to share it proactively. That choice is driven by their expectation of the response — if they expected curiosity and problem-solving, they would have raised it earlier. The leader\'s response in this moment determines whether the behaviour changes.',
            },
          ],
        },
        {
          id: 'leadership-m3-l4',
          title: 'Measuring and Accelerating AI Adoption',
          duration: 15,
          description:
            'Track adoption progress, identify blockers, and accelerate the adoption curve.',
          content: `## Measuring and Accelerating AI Adoption

You cannot manage what you do not measure. AI adoption is no different. Leaders who rely on subjective impressions of adoption progress miss the early signals that allow course correction when adoption is stalling.

### Adoption metrics that matter

**Activity metrics**: How many people are using approved AI tools? How frequently? What types of tasks? Activity metrics tell you whether adoption is happening at all, and at what pace. They are the leading indicators of everything else.

**Capability metrics**: Can team members demonstrate AI skills at the level required for their role? Simple capability assessments — asking people to complete a standard task with AI — reveal skill gaps that self-reported confidence misses.

**Output quality metrics**: Are AI-assisted outputs meeting quality standards? This requires sampling and reviewing AI-assisted work — not to catch failures but to calibrate the guidance teams are using.

**Adoption curve metrics**: Where on the adoption curve is each function or team? Early adopters (10-15%), early majority (35%), late majority (35%), laggards (15%) have different needs and respond to different interventions.

**Impact metrics**: Are the business outcomes that justified the AI investment being realised? Efficiency, quality, speed — track these against the baseline established before implementation.

### Accelerating the adoption curve

**Remove friction**: The single biggest accelerator of adoption is reducing the effort required to use AI. If accessing AI tools requires multiple logins, approvals, or technical setup, usage will be low regardless of enthusiasm. Make the path to AI use as frictionless as possible.

**Make early adopters visible**: Share their stories, their results, their tips. Visible peer success is a more powerful adoption driver than management encouragement.

**Address the late majority with peer support**: The late majority adopt when they see people like them succeeding. Design peer-support mechanisms — learning pairs, drop-in sessions, team champions — specifically for the late majority.

**Set adoption expectations**: Make it clear that AI use is expected, not optional. Combine this with support — expectation without support creates resentment. But expectation with support creates accountability that drives adoption.`,
          keyTakeaways: [
            'Track five adoption metrics: activity, capability, output quality, adoption curve position, and impact',
            'Removing friction is the single highest-leverage adoption accelerator',
            'Peer success stories drive the early and late majority more than management encouragement',
            'Expectation plus support drives adoption; expectation without support drives resentment',
          ],
          exercise: {
            title: 'Design Your Adoption Dashboard',
            description:
              'Create a simple adoption tracking framework for your AI initiative.',
            steps: [
              'Define one metric for each of the five adoption dimensions: activity, capability, output quality, curve position, impact',
              'For each metric, identify: how will you measure it, how frequently, who is responsible?',
              'Establish your current baseline for each metric',
              'Identify the two metrics that most need improvement and design one action for each',
              'Set a 90-day review point and define what good progress looks like',
            ],
            tool: 'Claude (claude.ai)',
          },
          quiz: [
            {
              question: 'What are activity metrics in AI adoption, and why are they important?',
              options: [
                'Metrics that measure how active the AI tools are in processing requests',
                'Metrics that track how many people are using AI tools, how frequently, and for what tasks — leading indicators of adoption progress',
                'Metrics that assess the quality of activities performed with AI assistance',
                'Metrics that measure the business activities where AI delivers the most value',
              ],
              correct: 1,
              explanation:
                'Activity metrics are the leading indicators: if people are not using the tools, no benefit is possible. Monitoring usage frequency, user numbers, and task types tells you whether adoption is happening before you can see impact in business outcomes — which typically lag by weeks or months. Activity drops are the earliest warning of adoption stalling.',
            },
            {
              question: 'Which intervention is most effective for accelerating adoption in the late majority?',
              options: [
                'Mandatory AI training courses',
                'Management directives about AI usage expectations',
                'Peer support from similar colleagues who have already adopted successfully',
                'Demonstrations by AI vendors of new tool capabilities',
              ],
              correct: 2,
              explanation:
                'The late majority adopt when they see people like them succeeding. They are not persuaded by management directives or vendor demos — they are persuaded by credible peers who have navigated the same doubts and found real value. This is why investing in champions who can provide hands-on peer support specifically for the late majority is more effective than any top-down adoption push.',
            },
            {
              question:
                'You discover that 30% of your team is using AI tools daily, but 70% have not used them at all in the past month. What is the most useful first diagnostic question?',
              options: [
                'Are the tools technically accessible and functioning?',
                'Does the 70% know how to use the tools?',
                'Is the 70% aware that they are expected to use the tools?',
                'What barriers does the 70% cite when asked directly?',
              ],
              correct: 3,
              explanation:
                'Asking directly what barriers the non-adopting 70% faces is the most diagnostic question because the barriers vary: access issues, awareness gaps, skill gaps, workload pressure, or genuine scepticism. Each requires a different intervention. Asking the same question and getting different answers from different people tells you whether there is a single systemic barrier or multiple individual ones.',
            },
          ],
        },
      ],
    },
    {
      id: 'leadership-m4',
      title: 'AI Ethics, Governance, and Responsible Leadership',
      description:
        'Lead AI adoption with the ethical clarity and governance rigour that builds lasting trust.',
      lessons: [
        {
          id: 'leadership-m4-l1',
          title: 'AI Ethics for Leaders: The Decisions That Define You',
          duration: 20,
          description:
            'Understand the ethical dimensions of AI leadership and make principled decisions under uncertainty.',
          content: `## AI Ethics for Leaders: The Decisions That Define You

AI leadership is not just strategic and operational — it is ethical. The decisions you make about how your organisation uses AI will affect employees, customers, and communities. Leaders who treat these decisions as purely technical problems will make choices they later regret.

### The ethical dimensions of AI in organisations

**Transparency**: Are you honest with employees, customers, and other stakeholders about when and how you are using AI? Transparency does not mean disclosing every technical detail — it means not creating false impressions about human involvement or the nature of AI-generated content.

**Fairness**: Are your AI applications treating people equitably? AI systems trained on historical data often perpetuate historical inequities. Leaders must actively check for and address bias, particularly in applications that affect employment, lending, healthcare, or access to services.

**Privacy**: Are you using AI in ways that respect people's reasonable expectations about how their data will be used? AI capabilities that are technically permitted may still violate reasonable privacy expectations.

**Accountability**: When AI-influenced decisions have significant consequences for people, is there a clear human accountable for those decisions? AI diffuses accountability in ways that can leave people without recourse when things go wrong.

**Autonomy**: Are you using AI in ways that respect human agency? AI that subtly manipulates decisions — even toward outcomes you think are beneficial — treats people as objects to be optimised rather than agents to be respected.

### Making ethical decisions under uncertainty

Most AI ethics decisions do not have clear right answers. They require weighing competing considerations — organisational efficiency against employee privacy, customer personalisation against data sovereignty, competitive necessity against fairness.

A useful framework: ask whether you would be comfortable if the decision were reported in full detail on the front page of a respected newspaper, read by your employees, your customers, and the communities you operate in. If the answer is no, reconsider.

The harder version: ask whether you would be comfortable if the people most affected by the decision could see the full reasoning behind it. This tests whether your decision respects their dignity as well as their interests.`,
          keyTakeaways: [
            'Five ethical dimensions of AI leadership: transparency, fairness, privacy, accountability, and autonomy',
            'Ethical AI decisions are not binary — they require weighing competing considerations',
            'The "front page test" is a useful but insufficient ethical check',
            'The deeper test: would the people most affected find the reasoning respectful of their dignity?',
          ],
          exercise: {
            title: 'Ethical Review of One AI Application',
            description:
              'Apply the five ethical dimensions to an AI application your organisation is using or considering.',
            steps: [
              'Choose one current or planned AI application in your organisation',
              'For each of the five dimensions, assess: is this application handling this dimension well?',
              'Identify the dimension where your assessment is most uncertain or concerning',
              'Design one action that would strengthen the ethical standing of the application in that dimension',
              'Ask Claude: "What ethical concerns might stakeholders raise about this application that I have not considered?"',
            ],
            tool: 'Claude (claude.ai)',
          },
          quiz: [
            {
              question:
                'Your customer service team is using AI to draft responses. Customers receive these as normal emails. What ethical dimension is most directly relevant?',
              options: [
                'Fairness — AI responses may not treat all customers equally',
                'Transparency — customers may reasonably expect to know when they are receiving AI-drafted communication',
                'Privacy — AI responses may include customer data in ways they did not authorise',
                'Autonomy — customers cannot choose to interact with a human instead',
              ],
              correct: 1,
              explanation:
                'Transparency is the most directly relevant dimension: customers who receive what appears to be a personal response from a human representative may have a reasonable expectation that it is human-written. Whether disclosure is ethically or legally required depends on the nature of the communication and the relationship — but leaders should make this decision deliberately, not by default.',
            },
            {
              question:
                'AI is used to shortlist candidates in your hiring process. Three years of data show significantly lower shortlisting rates for women in senior technical roles. What is the ethical obligation?',
              options: [
                'Pause the AI application and investigate the root cause before continuing',
                'Add a human review step for all female candidates to compensate',
                'Accept the outcome as reflecting the candidate pool accurately',
                'Adjust the AI output to meet diversity targets',
              ],
              correct: 0,
              explanation:
                'An AI system that produces systematically different outcomes for protected groups requires investigation before continued use. The bias could reflect: historical biases in training data, proxy variables that correlate with gender, or genuine differences in the applicant pool that are themselves worth understanding. Continuing to use a system with known discriminatory outcomes without understanding the cause is ethically and legally untenable.',
            },
            {
              question:
                'Why is "AI decided it" insufficient as an explanation for a consequential decision affecting an individual?',
              options: [
                'AI decisions are technically complex to explain and should not be oversimplified',
                'People affected by AI-influenced decisions have a right to human accountability and meaningful explanation',
                'AI decision explanations require technical expertise that most leaders lack',
                'Regulatory requirements prohibit referencing AI as the basis for individual decisions',
              ],
              correct: 1,
              explanation:
                '"AI decided it" diffuses accountability in a way that leaves people without recourse. It also frames the decision as inevitable and unchallengeable — which it is not. Humans made the choices that led to the AI decision: the training data, the model selection, the threshold setting, the deployment context. A human accountable for those choices must also be accountable for the decision they produced.',
            },
          ],
        },
        {
          id: 'leadership-m4-l2',
          title: 'Designing AI Governance That Works',
          duration: 18,
          description:
            'Build a practical governance framework that enables AI innovation while managing risk responsibly.',
          content: `## Designing AI Governance That Works

AI governance that is too restrictive slows adoption to the point where the organisation falls behind. AI governance that is too permissive creates risk that materialises in damaging incidents. Effective AI governance is a balancing act — enabling innovation with appropriate safeguards.

### The governance design principles

**Proportionate to risk**: Governance requirements should match the risk level of the AI application. A general-purpose writing assistant for internal use needs light governance. An AI system making credit decisions or screening job candidates needs heavy governance with explicit human review.

**Clear and practical**: Governance that people cannot understand or follow creates the illusion of control without the reality. A one-page policy that is actually read and followed beats a 50-page framework that exists only in the compliance folder.

**Enabling as well as constraining**: Good governance articulates what is permitted and supported, not just what is prohibited. Teams that understand the approved space for AI experimentation will explore it confidently. Teams that only know what is forbidden will avoid anything near the boundary.

**Regularly reviewed**: AI capabilities and risks are evolving rapidly. Governance designed for today's AI landscape will be inadequate in 18 months. Build in regular review cycles and update processes.

### The governance framework components

**Approved tool list with data classification**: Which tools can be used with which types of data? Enterprise-approved tools with appropriate data security for sensitive information; free tools for non-sensitive, public-facing content.

**Use case taxonomy**: Which types of AI applications require which level of review? High-stakes applications (employment decisions, financial decisions, public-facing content) require explicit approval; standard applications require awareness; experimental use is supported through a defined process.

**Human review requirements**: For which AI outputs is human review mandatory before action? Define this clearly for your highest-risk applications.

**Incident reporting**: How should AI errors, unexpected outputs, or potential harms be reported and addressed? A clear, blame-free reporting path is essential.

**Roles and accountability**: Who owns AI governance overall? Who owns it in each function? Who handles incident escalation?`,
          keyTakeaways: [
            'Governance must be proportionate to risk — heavy governance for high-stakes applications, light for low-stakes',
            'Practical and clear governance is followed; comprehensive but unreadable governance is ignored',
            'Articulate what is permitted, not just what is prohibited',
            'Build regular review cycles — AI governance has a shorter shelf life than other policies',
          ],
          exercise: {
            title: 'Design Your AI Governance Framework',
            description:
              'Create a one-page AI governance framework for your organisation.',
            steps: [
              'Define your data classification levels and which AI tools are approved for each',
              'Create a three-level use case taxonomy: high-risk (approval required), standard (notification required), experimental (self-directed)',
              'Define human review requirements for your highest-risk AI applications',
              'Draft an incident reporting process: how, to whom, within what timeframe?',
              'Assign governance roles: who owns this overall and in each major function?',
            ],
            tool: 'Claude (claude.ai)',
          },
          quiz: [
            {
              question:
                'An organisation has a 40-page AI governance policy that has been distributed to all staff. Evidence shows very few staff have read it. What is the governance failure?',
              options: [
                'The policy needs to be made mandatory reading with a sign-off requirement',
                'The policy is comprehensive but not practical — governance that is not followed provides no protection',
                'Staff training on the policy should be made compulsory',
                'The policy needs to be updated to reflect current AI capabilities',
              ],
              correct: 1,
              explanation:
                'A policy that exists but is not followed creates liability without protection: the organisation can be criticised for having rules that were ignored. The failure is in the design, not the distribution. Governance must be simple enough to be understood and practical enough to be followed by people doing real work under real time pressure. A one-page reference guide that everyone follows beats a comprehensive document that no one reads.',
            },
            {
              question:
                'What is the purpose of a "use case taxonomy" in AI governance?',
              options: [
                'To catalogue all AI applications in use for audit purposes',
                'To classify AI applications by risk level so governance requirements can be proportionate',
                'To standardise the types of tasks AI is approved to perform across the organisation',
                'To ensure AI is used consistently across different teams and functions',
              ],
              correct: 1,
              explanation:
                'Proportionality is the governance design challenge: not every AI application carries the same risk and therefore should not require the same level of review and approval. A taxonomy that classifies applications by risk level allows governance to be heavy where it matters and light where it can be — enabling innovation in low-risk areas while maintaining rigorous control in high-risk ones.',
            },
            {
              question: 'Why must AI governance policies be reviewed more frequently than most other policies?',
              options: [
                'AI regulations are changing more rapidly than other regulatory areas',
                'AI capabilities and associated risks are evolving rapidly, making last year\'s governance inadequate for this year\'s tools',
                'AI tools change pricing frequently, requiring policy updates',
                'Staff turnover in AI roles requires more frequent policy refreshes',
              ],
              correct: 1,
              explanation:
                'An AI governance policy written for the capabilities of 18 months ago may be simultaneously too restrictive (prohibiting applications that are now well-understood and low-risk) and too permissive (not addressing new capabilities that carry risks not contemplated at the time of writing). The rate of capability change in AI is genuinely faster than in most other technology domains, requiring shorter review cycles.',
            },
          ],
        },
        {
          id: 'leadership-m4-l3',
          title: 'AI and the Future of Work: Leading Through Uncertainty',
          duration: 18,
          description:
            'Navigate the workforce implications of AI adoption with honesty, clarity, and care.',
          content: `## AI and the Future of Work: Leading Through Uncertainty

The most uncomfortable AI leadership question is about jobs. Leaders who avoid it leave a vacuum that is filled by speculation, fear, and rumour. Leaders who over-promise certainty in either direction lose credibility when reality diverges. The honest path is harder but more effective.

### What we actually know

AI is changing the nature of work faster than most previous technology transitions. It is particularly capable at cognitive tasks that were previously assumed to be safe from automation: drafting, summarising, analysing, translating, coding, and generating creative content.

Roles that consist primarily of these tasks will change significantly. Roles where AI handles the cognitive workload free the human for higher-touch, higher-judgment work — or create a mismatch if the higher-touch work does not exist or is not valued.

What we do not know with confidence: the pace of change, which specific roles will be most affected, how many new roles AI creates relative to those it displaces, and how quickly organisations and individuals will adapt.

### Leading with honesty about uncertainty

The leadership failure mode on this question is not ignorance — it is false certainty. Leaders who say "no jobs will be affected" are making a promise they cannot keep. Leaders who say "AI will replace most roles within five years" are creating fear that outpaces evidence.

The honest leadership position: acknowledge what is known, acknowledge what is uncertain, commit to transparency as the situation develops, and commit to the specific support your organisation will provide to employees whose roles change significantly.

### The employer obligations

Organisations that deploy AI that displaces significant employee work have obligations that go beyond legal requirements:
- Transparency about which roles are likely to be most affected and when
- Investment in reskilling for affected employees, not just survivors
- Honest timelines that allow employees to make informed decisions about their own careers
- Involvement of affected employees in the process of redesigning their own roles

Leaders who approach these obligations seriously build organisations that navigate AI-driven change without the trust destruction that accompanies forced, opaque workforce transitions.`,
          keyTakeaways: [
            'False certainty in either direction — "no impact" or "mass displacement" — loses credibility',
            'The honest position acknowledges what is known, what is uncertain, and commits to transparency',
            'Employer obligations go beyond legal requirements when AI-driven change significantly affects employees',
            'Involving affected employees in role redesign is both ethical and practically effective',
          ],
          exercise: {
            title: 'Workforce AI Impact Assessment',
            description:
              'Assess the realistic workforce implications of AI adoption in your organisation.',
            steps: [
              'Identify the three roles or role types most likely to be significantly affected by AI in the next 18 months',
              'For each, describe specifically what changes: which tasks, what proportion of current work, what is left?',
              'Define the reskilling or role evolution path for each',
              'Design a communication approach for affected employees: what will you say, when, and how?',
              'Ask Claude to challenge your assessment: "What am I underestimating? Who else might be affected?"',
            ],
            tool: 'Claude (claude.ai)',
          },
          quiz: [
            {
              question:
                'An operations director tells their team: "AI will make everyone\'s job better and no jobs will be affected." What is the problem with this statement?',
              options: [
                'It is technically inaccurate about AI capabilities',
                'It makes a promise the organisation cannot keep and will lose credibility when reality diverges',
                'It focuses too much on the positive and not enough on the governance challenges',
                'It is appropriate reassurance for a team that is anxious about AI',
              ],
              correct: 1,
              explanation:
                'The statement is likely false in some cases — some roles will change significantly — and making it trades short-term comfort for long-term credibility damage. When changes do occur, employees will remember the reassurance and interpret subsequent change as evidence that they were misled. Honest, calibrated communication — "we expect most roles to evolve, some significantly, and here is our commitment to supporting that transition" — is harder to deliver but more trustworthy.',
            },
            {
              question:
                'Why does involving affected employees in AI-driven role redesign produce better outcomes?',
              options: [
                'It satisfies legal requirements for workforce consultation',
                'Employees have contextual knowledge about their work that leaders and AI tools lack, making their involvement practically valuable',
                'Involvement reduces resistance even if the outcomes do not change',
                'It is the ethical minimum that prevents discrimination claims',
              ],
              correct: 1,
              explanation:
                'The practical case for involvement is as strong as the ethical one. Employees who do a job know what the work actually requires in a way that AI impact assessments often miss. Their involvement surfaces the tasks that cannot be automated, identifies the higher-value work that AI creates space for, and designs transitions that are actually workable. Involvement is not just consultation — it is access to essential knowledge.',
            },
            {
              question:
                'What is the single most important commitment a leader can make to employees whose roles will change significantly due to AI?',
              options: [
                'A guarantee that their overall compensation will not decrease',
                'A promise that their specific job title will be preserved',
                'A commitment to transparency about what is changing and genuine investment in their reskilling',
                'Assurance that any role changes will happen gradually rather than all at once',
              ],
              correct: 2,
              explanation:
                'Transparency and reskilling investment address the two things employees most need: information to make decisions about their career and capabilities for the roles that exist as work changes. Title preservation is not sustainable if the underlying work changes; compensation guarantees may not be possible; gradual change is preferable but not always controllable. Transparency and investment are commitments a serious organisation can make and keep.',
            },
          ],
        },
        {
          id: 'leadership-m4-l4',
          title: 'Regulatory and Legal Dimensions of AI Leadership',
          duration: 15,
          description:
            'Understand the emerging regulatory landscape and ensure your AI adoption is legally sound.',
          content: `## Regulatory and Legal Dimensions of AI Leadership

AI regulation is moving faster than many leaders recognise. The regulatory environment that applies to your organisation's AI use today may be significantly different in 12-18 months. Leaders who treat AI regulation as IT's problem will be caught unprepared.

### The current regulatory landscape

**European AI Act**: The most comprehensive AI regulation currently in force, creating a risk-based framework that classifies AI applications by risk level and applies different obligations accordingly. High-risk applications — including those used in employment, education, and critical infrastructure — require conformity assessments, transparency obligations, and human oversight mechanisms. Organisations operating in the EU or selling to EU customers must understand which category their AI applications fall into.

**Data protection and privacy**: Existing data protection frameworks — GDPR in Europe, state privacy laws in the US, and equivalents in other jurisdictions — apply to AI systems that process personal data. AI use cases involving customer data, employee data, or any personal information must comply with consent, transparency, and data minimisation requirements.

**Employment law**: In many jurisdictions, using AI to make or significantly influence employment decisions creates specific legal obligations around transparency and non-discrimination. Using AI to screen job applications, assess performance, or make redundancy decisions requires careful legal review.

**Sector-specific regulation**: Financial services, healthcare, and other regulated sectors face AI-specific rules alongside existing sectoral regulations. Leaders in these sectors need both general AI regulatory understanding and deep sector-specific legal advice.

### Building regulatory readiness

**Inventory your AI applications**: You cannot assess regulatory compliance without knowing what AI is being used where. Create a comprehensive inventory of AI tools and applications across your organisation.

**Classify by risk and jurisdiction**: For each application, assess: what type of data does it process? Who does it affect? In which jurisdictions does it operate? What risk category does it fall into under applicable regulations?

**Engage legal and compliance early**: AI projects are much easier to make compliant before deployment than after. Legal and compliance should be involved in the design and approval process, not brought in to validate after launch.

**Document decision logic**: Regulations increasingly require explainability for AI-influenced decisions affecting individuals. Ensure you have the documentation to explain how AI influences significant decisions.`,
          keyTakeaways: [
            'The regulatory environment is evolving rapidly — build a monitoring process, not just a point-in-time assessment',
            'The EU AI Act creates risk-based obligations that apply to many organisations regardless of where they are headquartered',
            'Employment law AI obligations exist in many jurisdictions — legal review before deployment is essential',
            'Regulatory readiness starts with a comprehensive inventory of AI applications',
          ],
          exercise: {
            title: 'AI Regulatory Readiness Assessment',
            description:
              'Assess your organisation\'s regulatory readiness for current AI applications.',
            steps: [
              'Create a list of all AI tools and applications currently in use across your organisation',
              'For each, note: what data is processed, who is affected, in which jurisdictions',
              'Identify the two highest-risk applications from a regulatory perspective',
              'List the specific regulatory obligations that apply to those applications in your primary jurisdictions',
              'Identify the gaps between current practice and regulatory requirements and prioritise actions',
            ],
            tool: 'Claude (claude.ai)',
          },
          quiz: [
            {
              question:
                'Which EU AI Act risk category most likely applies to an AI system that screens job applications?',
              options: [
                'Minimal risk — AI tools for administrative tasks are low risk',
                'Limited risk — transparency obligations apply but no conformity assessment',
                'High risk — employment decisions affecting individuals carry significant obligations',
                'Unacceptable risk — AI in employment contexts is prohibited',
              ],
              correct: 2,
              explanation:
                'The EU AI Act classifies AI systems used in employment and worker management — including recruitment, selection, and performance evaluation — as high-risk. This triggers requirements including conformity assessments, technical documentation, data governance, human oversight mechanisms, and transparency to affected individuals. Organisations using AI in hiring must ensure compliance with these requirements.',
            },
            {
              question:
                'Why should legal and compliance teams be involved in AI projects before deployment rather than after?',
              options: [
                'Legal teams need time to review vendor contracts before AI tools are procured',
                'Redesigning AI applications for compliance after deployment is significantly more expensive and disruptive than building compliance in from the start',
                'Regulators require legal sign-off before any AI application can be launched',
                'Legal teams need to train on AI tools before they can assess compliance',
              ],
              correct: 1,
              explanation:
                'Post-deployment compliance retrofitting is the most expensive form of compliance management. It may require architecture changes, data handling redesigns, feature limitations, or even withdrawal of the application. Pre-deployment involvement allows compliance requirements to be built into the design — which is dramatically cheaper and faster. The upfront time investment is almost always worth it.',
            },
            {
              question:
                'What is the most important first step in building AI regulatory readiness?',
              options: [
                'Appointing a Chief AI Officer to own regulatory compliance',
                'Conducting a comprehensive inventory of all AI tools and applications in use across the organisation',
                'Engaging an external law firm specialising in AI regulation',
                'Implementing a moratorium on new AI applications until the regulatory environment is clearer',
              ],
              correct: 1,
              explanation:
                'You cannot assess or manage regulatory risk you do not know about. Many organisations are using AI applications across functions without central visibility — shadow AI is a governance reality. A comprehensive inventory is the prerequisite for all subsequent regulatory work: risk classification, jurisdiction analysis, compliance gap assessment, and prioritisation. Without it, compliance efforts are incomplete by definition.',
            },
          ],
        },
      ],
    },
    {
      id: 'leadership-m5',
      title: 'Building an AI-Ready Organisation',
      description:
        'Develop the culture, structures, and capabilities that sustain AI leadership over the long term.',
      lessons: [
        {
          id: 'leadership-m5-l1',
          title: 'Designing the AI-Ready Organisation',
          duration: 20,
          description:
            'Understand what structural and cultural changes enable sustained AI leadership.',
          content: `## Designing the AI-Ready Organisation

AI-readiness is not a destination — it is an ongoing capability. Organisations that are "AI-ready" are not those that have implemented the most AI tools; they are those with the culture, structures, and capabilities to keep improving as AI evolves.

### The five dimensions of AI organisational readiness

**Data readiness**: Can you access, trust, and use the data that AI requires? This is the foundation. Organisations with fragmented, inconsistent, or poor-quality data will struggle with any AI application that requires data as input.

**Process clarity**: Are your processes documented clearly enough that AI can support them? AI works best on well-defined processes with clear inputs and outputs. Organisations with informal, inconsistent processes must clarify them before AI can help.

**Talent capability**: Does your workforce have the AI skills required for their roles? This is a moving target — the AI skills required in 2027 will differ from those required today. Building a learning infrastructure is more important than achieving a specific skill level.

**Governance and trust**: Do employees and stakeholders trust how AI is being used? Governance that is rigorous enough to prevent harm but permissive enough to enable innovation is the hardest balance to achieve.

**Leadership commitment**: Is AI seen as a strategic priority at the top and managed with the same rigour as other strategic investments? Leadership commitment is the variable that determines whether all other dimensions get sustained attention.

### Structural changes that enable AI readiness

**AI ownership**: Designate clear ownership for AI strategy and governance — this may be a CAIO (Chief AI Officer), a transformed CTO/CDO role, or a cross-functional AI committee. Ambiguous ownership produces ambiguous progress.

**Cross-functional AI teams**: The most effective AI implementations bring together business domain expertise, data capability, and change management. Organisational structures that keep these capabilities separate slow AI adoption significantly.

**Learning infrastructure**: Continuous capability development requires dedicated resources: time, budget, content, and coaching. Treating AI learning as something that happens in spare moments produces spare-moment results.`,
          keyTakeaways: [
            'Five dimensions of AI readiness: data, process clarity, talent capability, governance, and leadership commitment',
            'AI readiness is an ongoing capability, not a one-time achievement',
            'Clear AI ownership is the structural prerequisite for sustained progress',
            'Cross-functional teams beat siloed approaches for AI implementation effectiveness',
          ],
          exercise: {
            title: 'Assess Your AI Organisational Readiness',
            description:
              'Score your organisation on each of the five readiness dimensions.',
            steps: [
              'Score your organisation 1-5 on each dimension: data, process clarity, talent, governance, leadership commitment',
              'Identify your two lowest scores and describe specifically what is weak',
              'For each weakness, design one structural or cultural change that would improve the score',
              'Identify which dimension, if improved, would have the most positive knock-on effect on the others',
              'Draft a 90-day plan for your single highest-priority readiness improvement',
            ],
            tool: 'Claude (claude.ai)',
          },
          quiz: [
            {
              question: 'Why is data readiness the foundation of AI organisational readiness?',
              options: [
                'AI tools are sold based on data volume and require large datasets to function',
                'AI applications require accurate, accessible data — without it, outputs are unreliable regardless of tool quality',
                'Data management is a legal requirement for AI deployment in most jurisdictions',
                'Data readiness enables the measurement of AI impact across the organisation',
              ],
              correct: 1,
              explanation:
                'AI output quality is bounded by data input quality. The most sophisticated AI model applied to inaccurate, incomplete, or inaccessible data will produce unreliable outputs. Data readiness is the prerequisite that determines the ceiling for everything else. Organisations frequently invest in AI tools before fixing data problems — and then attribute the resulting poor performance to the tool rather than the foundation.',
            },
            {
              question:
                'What is the most common organisational barrier to effective AI implementation?',
              options: [
                'Insufficient budget for AI tool licences',
                'Lack of technical expertise in the IT function',
                'Siloed structures that separate business domain expertise from data and change management capability',
                'Regulatory uncertainty creating hesitation to invest',
              ],
              correct: 2,
              explanation:
                'AI implementation requires three types of capability working together: domain expertise (knowing what problem needs solving and what good looks like), data capability (understanding how to access, process, and use data), and change management (driving adoption and managing the people dimensions). Most organisational structures separate these capabilities — IT owns data, HR owns change, business owns domain. Bridging these silos is the most common implementation challenge.',
            },
            {
              question:
                'What does "AI readiness as ongoing capability" mean in practice?',
              options: [
                'The organisation monitors AI developments continuously to update its strategy',
                'AI readiness assessments are conducted annually rather than as a one-time exercise',
                'The organisation builds the systems, culture, and structures to keep improving as AI evolves, rather than achieving a static state',
                'AI tools are updated automatically to maintain readiness without manual intervention',
              ],
              correct: 2,
              explanation:
                'AI is not a fixed technology landscape that organisations achieve readiness for. It is a rapidly evolving capability set that requires ongoing adaptation. Organisations that treat AI readiness as a project to complete will find themselves behind in 18 months. Those that build the capability to continuously learn, adapt, and experiment — in their culture, their processes, and their people — maintain readiness dynamically.',
            },
          ],
        },
        {
          id: 'leadership-m5-l2',
          title: 'Building a Learning Culture for the AI Era',
          duration: 18,
          description:
            'Develop the learning culture that enables your organisation to keep pace with AI evolution.',
          content: `## Building a Learning Culture for the AI Era

The half-life of AI knowledge is short. What your organisation knows about AI today will be partially outdated in 18 months. The organisations that lead in the AI era will not be those that learn AI once — they will be those with the culture and infrastructure to keep learning continuously.

### What a learning culture for AI looks like

**Curiosity as a leadership value**: Leaders who model curiosity about AI — asking questions, experimenting, sharing what they are learning — create permission for their teams to do the same. Leaders who project certainty about AI suppress the questions that drive genuine learning.

**Time for learning built in, not squeezed in**: Learning that happens in spare moments produces spare-moment results. Organisations serious about AI capability build learning time into schedules — a monthly AI learning hour, quarterly AI immersion sessions, regular peer-sharing opportunities.

**Failure as learning, not performance failure**: The AI learning process involves many small failures: prompts that do not work, tools that disappoint, use cases that turn out to be wrong-headed. A culture that treats these as performance failures rather than learning opportunities will have a team that hides its failures and does not learn from them.

**External orientation**: AI is not only learned internally. The most effective AI learning cultures connect to external communities — conferences, peer networks, academic research, vendor communities — that provide exposure to what is possible and what is being tried elsewhere.

### The leader's role in building learning culture

You cannot command a learning culture. But you can create the conditions for one.

**Model learning**: Talk about what you are learning, including your mistakes. Share what surprised you. Ask questions rather than projecting expertise.

**Protect learning time**: When learning time is cut first under operational pressure, the message is clear. Protecting learning time signals that it is genuinely valued.

**Celebrate learning contributions**: Recognise people who share what they have learned, who experiment, who help colleagues. Recognition shapes culture more reliably than any policy statement.

**Connect learning to purpose**: Learning for its own sake is harder to sustain than learning that is connected to making a real difference. Help your team see how AI capability connects to what they are trying to achieve.`,
          keyTakeaways: [
            'AI knowledge has a short half-life — continuous learning culture is the organisational competency that matters',
            'Leaders model learning culture by demonstrating curiosity and sharing failures, not just successes',
            'Built-in learning time signals real priority; squeezed-in learning signals it is optional',
            'Connect AI learning to purpose — capability for its own sake is harder to sustain',
          ],
          exercise: {
            title: 'Design Your AI Learning Architecture',
            description:
              'Create a practical learning architecture for your organisation\'s ongoing AI capability development.',
            steps: [
              'Identify three regular learning touchpoints you will build into your team\'s calendar',
              'Design one peer-sharing mechanism: how will your team share what they are learning with each other?',
              'Identify two external learning sources you will connect your team to this quarter',
              'Create one recognition mechanism for learning contributions',
              'Write a personal commitment: what is your own AI learning practice for the next 90 days?',
            ],
            tool: 'Claude (claude.ai)',
          },
          quiz: [
            {
              question:
                'Why is learning time that is "squeezed in" less effective than built-in learning time?',
              options: [
                'Squeezed-in learning produces lower quality output than scheduled learning',
                'The cultural signal of scheduled learning — that it is a genuine priority — is as important as the learning itself',
                'Squeezed-in learning is harder to measure and report on',
                'Scheduled learning allows for better curriculum design and progression',
              ],
              correct: 1,
              explanation:
                'In most organisations, what gets scheduled gets done; what is left to spare moments gets displaced by operational pressure. The scheduling decision is a signal: "this is important enough to protect." When learning time is consistently the first thing cut, the message — regardless of what leaders say about the importance of learning — is that it is not actually a priority. The behaviour speaks louder than the words.',
            },
            {
              question:
                'A leader says: "I have been using AI for three months and I am still finding things that do not work the way I expected. Here is one example." What effect does this have on learning culture?',
              options: [
                'It undermines confidence in AI by highlighting its limitations',
                'It models the curiosity and honest engagement with failure that creates permission for others to learn similarly',
                'It may cause team members to question the organisation\'s AI strategy',
                'It is appropriate only if followed immediately by a successful AI example to balance the message',
              ],
              correct: 1,
              explanation:
                'Leaders who only share successes create the impression that competence means always succeeding. This makes failure feel like inadequacy rather than learning. Sharing genuine failures and curiosities — "I expected this and got that, and here is what I think it means" — models the learning orientation that makes AI capability development sustainable. It also makes the leader more credible, not less.',
            },
            {
              question:
                'What is the most effective way to sustain AI learning motivation in your team over the long term?',
              options: [
                'Setting mandatory AI training completion requirements',
                'Offering financial incentives for AI skill certification',
                'Connecting AI capability to the purpose and work your team finds most meaningful',
                'Providing access to the most advanced AI tools available',
              ],
              correct: 2,
              explanation:
                'Extrinsic motivation — mandates and incentives — produces minimum compliance, not genuine capability development. Purpose connection produces intrinsic motivation: "I am learning this because it helps me do the work I care about better." When team members see AI as making them better at what they value — better service to clients, better decisions, more time for the work that matters — the motivation to learn sustains itself.',
            },
          ],
        },
        {
          id: 'leadership-m5-l3',
          title: 'Measuring AI Leadership Impact',
          duration: 15,
          description:
            'Define, track, and communicate the leadership-level metrics that demonstrate AI programme success.',
          content: `## Measuring AI Leadership Impact

AI leadership produces results at multiple levels: individual efficiency, team capability, function performance, and organisational competitive position. Leaders need to measure across all levels to tell the full story of AI impact and make informed investment decisions.

### The AI impact measurement hierarchy

**Operational metrics**: The improvements in specific processes — time saved, error rates reduced, throughput increased. These are the most direct and measurable outcomes of AI implementation. They validate specific initiatives and provide evidence for continued investment.

**Capability metrics**: The increase in AI skills and adoption across the organisation. How many people are AI-capable? At what level? What proportion of relevant workflows are AI-assisted? Capability metrics predict future operational improvements.

**Strategic metrics**: The impact on your organisation's ability to deliver its strategic objectives. Is client satisfaction improving? Is time-to-market for new products shortening? Are key talent metrics improving? Strategic metrics connect AI investment to outcomes that leadership and boards care about.

**Competitive position metrics**: How is your AI capability changing your competitive position? This is the hardest to measure directly but often the most important to leadership. Indicators include: customer acquisition and retention trends, talent attraction versus competitors, analyst and media commentary on AI capability.

### Communicating AI impact to different audiences

**To the board**: Strategic and competitive position metrics, with operational evidence as supporting detail. Focus on: are we making progress on the outcomes that justified the investment? What is the competitive trajectory?

**To the executive team**: The balance of operational, capability, and strategic metrics. Focus on: what is working, what is not, and what decisions need to be made?

**To the organisation**: Operational and capability metrics, with individual stories that make the data tangible. Focus on: what has changed, what is possible now that was not possible before, what comes next?

**To yourself**: All four levels, honestly assessed. Are we making real progress or managing the appearance of progress? What would I change if I were starting this programme today?`,
          keyTakeaways: [
            'Measure AI impact at four levels: operational, capability, strategic, and competitive position',
            'Match metrics to audience — boards need strategic metrics, teams need operational ones',
            'The most important measurement is honest self-assessment: real progress or appearance of progress?',
            'Individual stories make data tangible for organisational communications',
          ],
          exercise: {
            title: 'Build Your AI Impact Measurement Framework',
            description:
              'Define the metrics you will use to measure AI leadership impact at each level.',
            steps: [
              'Choose two operational metrics for your highest-priority AI initiative',
              'Define one capability metric that tracks AI adoption across your organisation',
              'Identify one strategic metric that connects AI adoption to your organisation\'s strategic objectives',
              'Define how you will communicate progress to: the board, your team, and yourself',
              'Set your 12-month targets for each metric and build a review cadence',
            ],
            tool: 'Claude (claude.ai)',
          },
          quiz: [
            {
              question: 'Why do boards need strategic and competitive metrics rather than operational metrics?',
              options: [
                'Boards do not have time to review detailed operational data',
                'Operational metrics do not capture the value that justifies board-level investment decisions',
                'Strategic metrics are more accurate than operational metrics',
                'Boards are responsible for competitive strategy, not operational execution',
              ],
              correct: 1,
              explanation:
                'Boards invest in AI because they believe it will improve competitive position, strategic capability, and long-term value. Telling a board that invoice processing is 40% faster answers the wrong question. Telling them that client retention has improved, time-to-market has shortened, or that AI capability is attracting better talent connects the investment to the outcomes that justified it. Operational metrics are evidence; strategic metrics are the answer.',
            },
            {
              question:
                'An executive reports to the board: "Our AI programme is on track — we have delivered 15 AI initiatives this year." What is the limitation of this metric?',
              options: [
                '15 initiatives is likely too many — breadth signals lack of strategic focus',
                'Initiative count measures activity rather than impact — it says nothing about whether the initiatives delivered value',
                'The board cannot evaluate this metric without seeing the full initiative list',
                'Activity metrics should not be reported at board level',
              ],
              correct: 1,
              explanation:
                'Counting initiatives is the most common AI measurement failure: it measures activity (we did things) rather than impact (our organisation is different and better because of it). A single AI initiative that delivers £1M in verified savings and builds a new strategic capability is worth more than 15 initiatives that deliver marginal process improvements. The board needs to know about the former; the latter is an operational detail.',
            },
            {
              question:
                'What does "honest self-assessment" of AI impact mean for a leader?',
              options: [
                'Commissioning an independent external review of AI programme outcomes',
                'Asking whether you are making real organisational progress or managing the appearance of progress',
                'Comparing your AI outcomes against industry benchmarks',
                'Acknowledging AI failures publicly before they become known to the board',
              ],
              correct: 1,
              explanation:
                'The most important audience for AI impact assessment is yourself. Leaders can be the last to know when programmes are underperforming — information filters upward, and people share what leaders want to hear. Regularly asking yourself "if I were an external observer, would I say this programme is delivering real change?" — and being honest about the answer — is what distinguishes leaders who course-correct from those who persist in underperforming programmes.',
            },
          ],
        },
        {
          id: 'leadership-m5-l4',
          title: 'Your Leadership Legacy in the AI Era',
          duration: 15,
          description:
            'Reflect on the leader you want to be in the AI era and design the path to get there.',
          content: `## Your Leadership Legacy in the AI Era

The AI era will define the careers of most leaders working today. How you navigate it — with what values, what approach to uncertainty, what commitment to your people — will shape your leadership legacy as significantly as any single decision you make.

### The leader the AI era needs

The AI era amplifies leadership qualities that have always mattered and reveals gaps in leadership qualities that may have been hidden by organisational inertia.

**Intellectual honesty**: The willingness to say "I was wrong" and "I don't know" in an environment where over-confident prediction is common. The leaders who will guide their organisations well through AI are those who can distinguish what they know from what they hope, and communicate the difference clearly.

**Human-centred orientation**: As AI handles more cognitive work, the distinctly human aspects of leadership — connection, empathy, trust-building, meaning-making — become more important, not less. Leaders who invest in these capabilities will be more effective, not less, as AI becomes more capable.

**Adaptive courage**: The willingness to change direction when evidence warrants it, even when you have publicly committed to a course. AI is moving too fast for any strategy to be right for longer than two years without revision. Leaders who can adapt without appearing inconsistent will navigate this better than those whose identity is bound to any particular approach.

**Ethical clarity**: The AI era presents leaders with choices about how to treat their people, their customers, and their communities that were previously less consequential at scale. Leaders with clear ethical frameworks will make better decisions faster; leaders without them will be reactive to crises rather than proactive in prevention.

### Designing your AI leadership development

This module has given you a foundation. What comes next is practice: using AI, leading AI initiatives, making decisions about AI with imperfect information, and learning from all of it.

The most important next steps are concrete and small: the first AI practice you establish for yourself, the first honest conversation you have with your team about what AI means for their work, the first governance decision you make with a clear ethical framework. These small steps are where leadership legacies begin.`,
          keyTakeaways: [
            'The AI era amplifies human leadership qualities rather than replacing them',
            'Intellectual honesty, human-centred orientation, adaptive courage, and ethical clarity are the defining leadership capabilities',
            'Leadership legacy in the AI era is built through concrete small actions, not grand strategy statements',
            'The most important next step is specific and small — begin with one practice',
          ],
          exercise: {
            title: 'Your AI Leadership Development Plan',
            description:
              'Design your personal AI leadership development for the next 12 months.',
            steps: [
              'Reflect on the four leadership qualities from the lesson. Which is your strongest? Which needs most development?',
              'Design one practice for each quality that you will build into your leadership in the next 90 days',
              'Define the AI leadership impact you want to be able to point to in 12 months',
              'Identify one person you will develop as an AI leader this year',
              'Write a one-paragraph statement of the AI leadership legacy you are working to build — and what you will do differently because of it',
            ],
            tool: 'Claude (claude.ai)',
          },
          quiz: [
            {
              question:
                'Why do human-centred leadership skills become more important, not less, as AI becomes more capable?',
              options: [
                'AI cannot fully replicate human emotional responses, requiring humans to compensate',
                'As AI handles more cognitive work, the distinctly human capabilities — connection, trust, meaning-making — become the scarce, differentiating resource',
                'Human-centred skills help teams accept AI changes more easily',
                'Regulatory requirements increasingly mandate human oversight of AI systems',
              ],
              correct: 1,
              explanation:
                'When AI handles more of the cognitive workload — analysis, drafting, pattern recognition — the value of what AI cannot do becomes more prominent: genuine connection, contextual empathy, trust built through consistent human behaviour, and meaning-making in uncertain times. Leaders who invest in these capabilities position themselves better, not worse, as AI capability increases.',
            },
            {
              question:
                'What does "adaptive courage" mean in the context of AI leadership?',
              options: [
                'The willingness to adopt AI tools before they are proven',
                'The courage to change direction when evidence warrants it, even after public commitment to a different course',
                'Taking calculated risks with AI applications in high-stakes contexts',
                'Defending AI adoption against resistant stakeholders',
              ],
              correct: 1,
              explanation:
                'AI is evolving faster than any strategic plan can anticipate. Leaders who commit publicly to specific AI approaches and then cannot change when evidence requires it — because changing would feel like inconsistency — will make worse decisions than leaders who can say "we have learned something new and we are adjusting." Adaptive courage is the quality that makes learning from evidence possible.',
            },
            {
              question:
                'Why do small, concrete next steps matter more than grand strategy statements in AI leadership?',
              options: [
                'Grand strategy statements are too visible to be honest about uncertainty',
                'Small steps accumulate into the habit patterns and demonstrated capabilities that constitute real AI leadership',
                'Strategy statements should wait until AI capabilities are more stable',
                'Leadership teams are more motivated by concrete actions than strategic vision',
              ],
              correct: 1,
              explanation:
                'Leadership is demonstrated through action, not articulation. A strategy statement that is not followed by changed personal behaviour and changed organisational behaviour is not leadership — it is announcement. The personal AI practice you establish, the conversation you have with your team, the governance decision you make with ethical clarity: these accumulate into the changed organisation that makes a leadership legacy real.',
            },
          ],
        },
      ],
    },
  ],
}
