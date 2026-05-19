import type { Track } from '../types'

export const customerTrack: Track = {
  id: 'customer',
  title: 'AI for Customer Success',
  tagline: 'Predict churn, personalise engagement, and scale your team with AI',
  description:
    'A practical curriculum for customer success managers and CS leaders who want to use AI to monitor customer health proactively, personalise every touchpoint, and scale their operations — without sacrificing the human relationships that drive retention.',
  color: '#DC2626',
  level: 'beginner',
  modules: [
    {
      id: 'customer-m1',
      title: 'AI Fundamentals for Customer Success',
      description:
        'Understand how AI applies to CS work, which tools are worth your time, and how to build an AI workflow that makes you more effective with every customer.',
      lessons: [
        {
          id: 'customer-m1-l1',
          title: 'What AI Means for Customer Success',
          duration: 15,
          description:
            'Understand where AI genuinely improves CS outcomes and where the human relationship is still the irreplaceable driver of customer retention.',
          content: `## AI and the Customer Relationship

Customer success is fundamentally about human relationships. AI doesn't change that. What AI changes is your capacity: how many customers you can monitor proactively, how quickly you can spot a risk signal, how consistent your engagement can be at scale. With AI, a team of five CSMs can do what previously required a team of twelve — without the quality drop.

## Where AI Creates Real CS Value

**Signal processing.** AI can monitor product usage data, support ticket frequency, NPS scores, and engagement patterns across hundreds of accounts simultaneously. No CSM can watch every signal for every account. AI can.

**Synthesis and preparation.** Preparing for a QBR or customer call typically takes 30–60 minutes per account. AI can produce a structured account summary in two minutes, which you then enrich with relationship context only you have.

**Communication at scale.** Personalised outreach at scale is a contradiction — until AI. AI can produce individualised emails for 50 customers faster than a CSM can write five from scratch.

**Data pattern recognition.** AI can identify churn signals in usage data (declining logins, feature abandonment, support spike) earlier than the CSM's gut feeling, giving more time to intervene.

## What AI Cannot Do in CS

**Replace relationship trust.** A customer who trusts you doesn't trust an AI that simulates you. The authenticity of the relationship is human. AI prepares and scales your engagement; it doesn't replace it.

**Read unspoken dynamics.** The tension in a customer's voice on a call. The delayed response that signals frustration. The executive sponsor who seems disengaged. These are signals only a human in the relationship can read.

**Advocate internally for a customer.** When a customer has a legitimate complaint that needs internal escalation, they need a human champion. AI cannot do that.

**Replace good judgment on churn.** AI can flag risk signals. Deciding whether a customer is genuinely at risk or just in a temporary trough requires relationship knowledge and business judgment.

## Your New Role with AI

With AI handling signal monitoring, preparation, and communication drafting, you invest your human time where it matters most: the quality of customer conversations, internal advocacy for your customers, and the strategic relationships that drive expansion.`,
          keyTakeaways: [
            'AI expands CS capacity by handling signal processing, preparation, and communication drafting at scale',
            'Human relationships, trust, and internal advocacy remain irreplaceable in CS',
            'AI spots risk signals earlier than human observation alone — giving more time to intervene',
            'With AI handling preparation, CSMs invest human time in higher-quality customer conversations',
            'The goal is not AI replacing the CSM — it is AI making each CSM significantly more effective',
          ],
          exercise: {
            title: 'CS Task Mapping',
            description:
              'Map your current CS tasks to identify where AI would have the most impact on your accounts.',
            steps: [
              'List your ten most time-consuming recurring CS activities this week',
              'For each task, note: (a) how much of it is data gathering/preparation vs. relationship work, (b) how many accounts it affects, (c) how bad a delay or quality reduction would be',
              'Rank by: high data/prep content + many accounts + recoverable quality gap = highest AI potential',
              'Identify your top three AI candidate tasks',
              'This week, use Claude for one of them and track: time saved and what relationship context AI couldn\'t supply',
            ],
            tool: 'Claude',
          },
          quiz: [
            {
              question: 'Which customer success task benefits most from AI assistance?',
              options: [
                'Executive sponsor relationship calls that determine contract renewal',
                'Monitoring product usage signals across a large portfolio of accounts',
                'Deciding which customer complaint to escalate internally',
                'Building rapport with a new customer contact',
              ],
              correct: 1,
              explanation:
                'Monitoring usage signals across a large account portfolio is a data-scale problem. AI can watch dozens of metrics across hundreds of accounts continuously — flagging anomalies, declines, and risk patterns far faster than any CSM team. This is exactly the kind of high-volume pattern recognition where AI adds most value in CS.',
            },
            {
              question: 'What remains irreplaceable by AI in customer success work?',
              options: [
                'Writing follow-up emails after customer calls',
                'Summarising account health before a QBR',
                'The authentic human trust that drives customer retention and expansion',
                'Categorising support tickets by urgency',
              ],
              correct: 2,
              explanation:
                'Customer retention ultimately depends on whether customers trust that you understand and advocate for their success. That trust is built through human relationship work — authentic conversations, internal advocacy, demonstrated understanding of their business. AI prepares and scales the efficiency of that relationship work; it cannot replace the relationship itself.',
            },
          ],
        },
        {
          id: 'customer-m1-l2',
          title: 'AI Tools for Customer Success Teams',
          duration: 18,
          description:
            'Navigate the CS AI tool landscape — from platform-native AI to general-purpose models — and build a practical toolkit that works with your existing stack.',
          content: `## The CS AI Tool Landscape

CS tools are rapidly embedding AI. Your primary platform (Gainsight, ChurnZero, Totango, HubSpot) likely already has AI features. Understanding what's already available is the starting point before adding new tools.

## Tier 1: Your CS Platform's Native AI

Most modern CS platforms now offer AI for:
- Health score calculation and churn prediction
- Automated playbook triggering based on health signals
- Meeting and call transcription and summary (Gong, Chorus)
- Sentiment analysis on support interactions

Audit what your current platform already provides before seeking external solutions. Platform-native AI integrates with your existing data and workflow with zero additional overhead.

## Tier 2: General-Purpose AI (Essential)

**Claude or ChatGPT** — Your primary AI assistant for:
- QBR and call preparation summaries
- Personalised email drafting
- Customer communication templates
- Account analysis and synthesis
- Success plan drafting

## Tier 3: Communication and Productivity AI

**Gong / Chorus** — Call recording, transcription, and AI summary. If you have heavy customer call volume, this is transformative. AI summaries of every call with follow-up items and risk signals.

**Notion AI / Confluence AI** — For CS playbook documentation and knowledge base maintenance.

## Selecting Tools Against Your Stack

The best CS AI tool is the one that integrates with your CRM, your CS platform, and your communication tools. A brilliant AI tool that requires you to manually paste data from four systems is not better than a moderate AI feature that's embedded in the tool you already use.

Before adding any tool, ask: what does this connect to? How will I actually use it in a customer interaction?`,
          keyTakeaways: [
            'Audit your existing CS platform\'s native AI before adding new tools — you may already have more than you\'re using',
            'A general-purpose AI (Claude or ChatGPT) covers most CS drafting and analysis needs',
            'Call intelligence tools (Gong, Chorus) are transformative for high call-volume CS teams',
            'Integration with your existing CRM and CS platform is more important than any individual tool\'s features',
            'The best AI tool is one that fits your current workflow — not one that requires building a new workflow around it',
          ],
          exercise: {
            title: 'CS Tool Audit',
            description:
              'Map what AI capabilities you currently have and identify your highest-value gap.',
            steps: [
              'List every tool your CS team currently uses (CS platform, CRM, communication tools, call recording)',
              'For each tool, check: does it have AI features? Are you using them? What do they do?',
              'List the three CS tasks where you spend most time that are not currently AI-assisted',
              'Identify which gap is most valuable to close',
              'Research whether your existing tools already solve this gap before considering a new tool',
            ],
            tool: 'Claude',
          },
          quiz: [
            {
              question: 'What is the most important criterion when selecting an AI tool for a CS team?',
              options: [
                'The tool with the most features wins',
                'Integration with the CS team\'s existing CRM, CS platform, and communication tools',
                'The AI tool with the largest model',
                'The most recently launched AI tool',
              ],
              correct: 1,
              explanation:
                'CS teams operate in an ecosystem of tools. An AI tool that doesn\'t connect to your CRM, health scoring platform, or email system creates friction rather than reducing it. The highest-value AI tools are those that integrate with existing workflows — embedding intelligence where the CSM is already working rather than creating a parallel process.',
            },
          ],
        },
        {
          id: 'customer-m1-l3',
          title: 'Data-Driven CS with AI',
          duration: 18,
          description:
            'Build a data foundation for AI-powered customer success — understanding which data matters, how to structure it, and how to turn data signals into actions.',
          content: `## Why Data Is the Foundation

AI in customer success is only as good as the data it works from. A health score model built on the wrong signals produces false confidence. An AI that predicts churn from incomplete data misses the customers who actually churn. Before asking "what can AI do?" ask "what data do we have?"

## The CS Data Hierarchy

**Tier 1 — Behavioural data (most reliable):**
- Product login frequency and recency
- Feature adoption breadth and depth
- Time-to-value for new users
- Support ticket frequency and severity

**Tier 2 — Engagement data (reliable with context):**
- Email open and response rates
- Meeting attendance and participation
- Champion engagement (are decision-makers active?)
- NPS and CSAT scores

**Tier 3 — Self-reported data (requires interpretation):**
- Customer-stated goals and success criteria
- Survey responses
- Verbal feedback in calls

The most reliable churn predictors come from Tier 1 data — what customers actually do, not what they say.

## Connecting Data to AI

AI can process and surface patterns in your data — but it works on the data you give it. Common gaps:
- **Incomplete CRM data.** If account details are incomplete, AI health models miss context.
- **Siloed data.** If product data and CRM data aren't connected, AI can't see the full picture.
- **Lagging indicators.** If your data only captures problems after they've escalated, AI can't provide early warning.

## Turning Data into Action

The data-action loop in AI-powered CS:
1. AI monitors data signals continuously
2. AI flags accounts that cross a defined threshold (health score drop, usage decline, support spike)
3. CSM reviews the flag with relationship context
4. CSM takes defined action (call, email, escalation)
5. Outcome is logged and feeds back to improve the model

The key is defining the actions before you build the monitoring — otherwise AI generates signals that no one acts on.`,
          keyTakeaways: [
            'Behavioural data (what customers do) is more reliable than self-reported data (what customers say)',
            'AI health models are only as good as the data they process — audit your data quality before building AI on it',
            'The data-action loop: AI monitors → flags threshold breach → CSM reviews → action → outcome logged',
            'Define the actions you\'ll take for each signal before building the monitoring — otherwise signals don\'t produce outcomes',
            'Siloed data is the most common block to effective AI in CS — CRM and product data need to connect',
          ],
          exercise: {
            title: 'CS Data Audit',
            description:
              'Assess the quality and completeness of your CS data foundation.',
            steps: [
              'List the data signals currently in your CS platform or health score model',
              'Categorise each signal as: Tier 1 (behavioural), Tier 2 (engagement), or Tier 3 (self-reported)',
              'Identify your most important missing Tier 1 signals — what customer behaviours should you be tracking but aren\'t?',
              'For your current top churn predictor: is it a leading indicator (predicts future churn) or a lagging indicator (confirms churn that\'s already happening)?',
              'Identify one data improvement that would most improve your ability to predict churn 60+ days early',
            ],
            tool: 'Claude',
          },
          quiz: [
            {
              question: 'Why is behavioural data more reliable than self-reported data for churn prediction?',
              options: [
                'Behavioural data is always more recent',
                'Behavioural data reflects what customers actually do, while self-reported data reflects what they say — which often diverges',
                'Behavioural data is easier to collect',
                'Self-reported data cannot be processed by AI',
              ],
              correct: 1,
              explanation:
                'Customers often say they\'re happy (in surveys, on calls) while their behaviour tells a different story: login frequency dropping, fewer features being used, champions going silent. Behavioural data captures the actual reality of customer engagement; self-reported data captures their perception or their desire to appear satisfied. For churn prediction, behaviour wins.',
            },
          ],
        },
        {
          id: 'customer-m1-l4',
          title: 'Building Your AI-Powered CS Workflow',
          duration: 15,
          description:
            'Design an AI workflow that slots into your existing CS process — boosting every customer interaction without creating new overhead.',
          content: `## Workflow Design for CS

The risk of AI in CS is adding tools that require more time to use than they save. The goal is AI that makes every existing activity faster and higher quality — not AI that adds new activities.

## The Four CS AI Workflow Patterns

**Pattern 1 — Preparation.** AI generates an account summary before every customer interaction. You add relationship context. Total prep time: 5 minutes instead of 30.

**Pattern 2 — Drafting.** AI produces a first draft of every customer communication. You review and personalise. Total writing time: 3 minutes instead of 15.

**Pattern 3 — Monitoring.** AI flags at-risk accounts based on defined signals. You review flags weekly and action the genuine risks. Total monitoring: 30 minutes per week instead of constant manual tracking.

**Pattern 4 — Analysis.** AI synthesises feedback, survey data, and support tickets into structured insights. You review and add strategic context. Analysis time: 20 minutes instead of 3 hours.

## Building the Preparation Habit

This is the highest-value place to start. Before every customer call or QBR, run a preparation prompt:

"Summarise the current state of this customer account based on the following data: [paste CRM notes, health score data, recent support tickets, last meeting notes]. Identify: current health status, key risks, open action items, topics to address in the next call."

You add: what you know from the relationship that isn't in the data.

## What Not to Automate

- First outreach to a customer you haven't spoken to (relationship context matters from the start)
- Renewal conversations (too strategic, too relationship-dependent)
- Escalation responses when a customer is angry or at risk
- Any communication where the customer explicitly wants a human response

Automation serves scale. Use judgment for the moments that define the relationship.`,
          keyTakeaways: [
            'Four CS AI workflow patterns: preparation, drafting, monitoring, and analysis',
            'Start with the preparation pattern — highest time saving, lowest relationship risk',
            'Don\'t automate renewal conversations, escalations, or first-touch relationship moments',
            'AI workflow success is measured by time saved AND quality of customer interaction maintained',
            'The best AI workflow is invisible to the customer — they experience a better-prepared, more responsive CSM',
          ],
          exercise: {
            title: 'Build Your Preparation Workflow',
            description:
              'Design and test an AI-powered account preparation workflow for your next customer call.',
            steps: [
              'Choose an upcoming customer call (QBR, check-in, or renewal discussion)',
              'Gather all available data: CRM notes, last meeting summary, recent support tickets, usage data, NPS scores',
              'Write a preparation prompt asking Claude to: summarise account health, identify key risks, list open action items, and suggest topics for the call',
              'Run the prompt and review the output',
              'Add relationship context Claude couldn\'t know: recent informal conversations, customer mood, internal dynamics',
              'Compare the preparation quality to your usual process. Time saved?',
            ],
            tool: 'Claude',
          },
          quiz: [
            {
              question: 'Which customer interaction should NOT be handled with an AI-drafted communication?',
              options: [
                'A routine monthly check-in email to an engaged customer',
                'A renewal negotiation with a customer who has expressed budget concerns',
                'A feature adoption tip sent to new users',
                'A follow-up email after a successful QBR',
              ],
              correct: 1,
              explanation:
                'Renewal conversations with at-risk customers are high-stakes, relationship-sensitive interactions where generic AI drafting is likely to miss the nuance required. The communication needs to reflect specific knowledge of the customer\'s situation, concerns, and relationship history. AI may assist in preparation, but the actual renewal communication should be crafted with full human attention.',
            },
          ],
        },
      ],
    },
    {
      id: 'customer-m2',
      title: 'Health Monitoring & Churn Prevention',
      description:
        'Build AI-powered customer health monitoring that surfaces risk earlier, lets you intervene more effectively, and protects your renewal base.',
      lessons: [
        {
          id: 'customer-m2-l1',
          title: 'Building Customer Health Scores with AI',
          duration: 20,
          description:
            'Design health scoring models that use AI to combine and weight signals intelligently — giving you a more accurate view of which customers need attention and when.',
          content: `## Why Health Scores Fail (and How AI Fixes It)

Most CS health scores fail because they combine signals with equal weighting that shouldn't be equal, use lagging indicators that tell you a customer has already churned, or don't adapt to different customer types and use cases.

AI changes what's possible: dynamic weighting based on what actually predicts churn in your customer base, early warning signals from behavioural patterns, and models that can be updated as your product and customer base evolves.

## The Components of an AI-Informed Health Score

**Usage signals** (most predictive for most SaaS products):
- DAU/MAU ratio for your product
- Feature adoption — are they using core value-generating features?
- Time-to-value for new users — are they getting value quickly?
- Seat utilisation — are all purchased seats active?

**Engagement signals:**
- Champion activity — is the economic buyer engaged?
- Response time to CSM outreach
- Meeting attendance
- Training and onboarding completion

**Relationship signals:**
- NPS score and trend
- Support ticket frequency and severity
- Executive relationship quality

## Designing Your Health Score with AI Assistance

AI can help you: identify which signals in your data correlate with actual churn, suggest appropriate weighting for each signal type, identify customer segments that need different health models.

Prompt: "Here is our customer health score formula [describe current formula] and our churn data for the last 12 months [describe patterns]. Identify which signals most correlate with churn, which signals we may be over-weighting, and what signals we should consider adding."

## Early Warning vs. Late Indicators

The goal of a health score is early warning — ideally 60–90 days before a renewal conversation. If your health score only drops when a customer is already in active churn, it's a lagging indicator, not a predictive one. Audit your health model: does a score drop predict churn, or confirm it?`,
          keyTakeaways: [
            'Health scores fail when signals are equally weighted, lagging, or not adapted to customer segments',
            'Usage signals (feature adoption, DAU/MAU, seat utilisation) are the most predictive for most SaaS products',
            'AI can identify which signals actually correlate with churn in your specific customer base',
            'The goal is early warning (60–90 days before renewal) — not confirmation that churn has already happened',
            'A health score that only drops after a customer is already leaving is a lagging indicator, not a tool for intervention',
          ],
          exercise: {
            title: 'Health Score Audit with AI',
            description:
              'Audit your current health score model for leading vs. lagging indicators and identify improvements.',
            steps: [
              'List all signals in your current customer health score and their current weightings',
              'For each signal, classify: is it a leading indicator (predicts future churn) or a lagging indicator (reflects current/past state)?',
              'Ask Claude: "Based on these health score signals [list them], which are most likely to be leading indicators of churn risk? Which may be lagging? What signals are commonly predictive in B2B SaaS that I\'m not measuring?"',
              'Identify your top three health score improvements based on this analysis',
              'Draft a recommendation for your CS operations or RevOps team on one specific health score change',
            ],
            tool: 'Claude',
          },
          quiz: [
            {
              question: 'What is the difference between a leading health indicator and a lagging health indicator?',
              options: [
                'Leading indicators are measured more frequently than lagging indicators',
                'Leading indicators predict future churn risk; lagging indicators confirm churn that has already begun',
                'Leading indicators come from product data; lagging indicators come from survey data',
                'Leading indicators are more accurate than lagging indicators',
              ],
              correct: 1,
              explanation:
                'A leading indicator changes before a problem manifests: feature adoption dropping signals that a customer is finding less value, which may lead to churn if not addressed. A lagging indicator changes after the problem is already visible: an NPS drop after a customer has already decided not to renew. Effective health scores are built primarily from leading indicators to enable early intervention.',
            },
          ],
        },
        {
          id: 'customer-m2-l2',
          title: 'Churn Prediction and Early Intervention',
          duration: 20,
          description:
            'Use AI to identify at-risk accounts earlier, understand why they\'re at risk, and design interventions that actually turn customers around.',
          content: `## The Churn Prevention Window

Churn decisions are typically made 90–120 days before the renewal date — often earlier. By the time a customer tells you they\'re not renewing, the decision is usually already made. AI-powered churn prediction is valuable only if it identifies risk early enough to act.

## AI Churn Prediction Approaches

**Rule-based triggers.** Define thresholds that automatically flag risk: login frequency drops by 50% over 30 days; feature X not used in 45 days; support tickets spike to 3+ per week. Simple, transparent, and immediately actionable.

**Correlation models.** More sophisticated: AI analyses historical churn data and identifies which combinations of signals most reliably predicted churned accounts. This produces a churn probability score rather than binary red/green.

**Cohort analysis.** AI identifies accounts that look similar to historical churn cohorts based on their behavioural profile at a given point in their lifecycle.

## Designing the Intervention

When AI flags an at-risk account, the critical question is: why is this account at risk? The signal tells you there's a problem; the reason tells you how to respond.

AI can help analyse the flagged account: "This account has shown declining logins and hasn't used [core feature] in 30 days. Based on the following account notes and support history, what might explain this pattern? What intervention approach should the CSM consider?"

Common risk categories and intervention approaches:
- **Value not realised.** Schedule a value realisation call; work through success plan together
- **Product fit issues.** Loop in product; identify workarounds; flag for roadmap
- **Champion change.** Reintroduce the product to new stakeholder; rebuild relationship
- **Budget pressure.** Engage earlier on commercial flexibility; surface ROI data
- **Competitive threat.** Understand competitor; position strengths; involve sales

## Logging Interventions for Model Improvement

Every intervention outcome — whether the account was retained or churned — is training data for your model. Log: the risk signal, the intervention, and the outcome. Over time, this makes your prediction model more accurate and your interventions more targeted.`,
          keyTakeaways: [
            'Churn decisions are made 90–120 days before renewal — prediction is only valuable if it fires early enough',
            'Rule-based triggers are simple and immediately actionable; correlation models add sophistication',
            'AI identifies risk signals; understanding why helps design the right intervention',
            'Map risk categories to intervention approaches: value unrealised, product fit, champion change, budget, competitive',
            'Log every intervention and outcome — this is training data that improves your model over time',
          ],
          exercise: {
            title: 'At-Risk Account Analysis',
            description:
              'Use AI to analyse an at-risk account and design a targeted intervention plan.',
            steps: [
              'Choose one account that you currently consider at risk (or recently churned)',
              'Gather all available data: health score history, usage trends, support tickets, meeting notes, NPS history',
              'Ask Claude: "Based on this account data [paste], identify the most likely reasons this account is at risk and recommend an intervention approach."',
              'Compare AI\'s analysis to your own assessment — what did it catch that you hadn\'t articulated? What did it miss that your relationship knowledge adds?',
              'Write a one-paragraph intervention plan for this account that combines AI\'s analysis with your relationship context',
            ],
            tool: 'Claude',
          },
          quiz: [
            {
              question: 'Why is it important to identify WHY an account is at risk, not just THAT it is at risk?',
              options: [
                'Because AI cannot produce interventions without knowing the reason',
                'Because different risk causes require fundamentally different interventions — a value gap and a champion change need completely different responses',
                'Because at-risk accounts that don\'t have a clear reason should be deprioritised',
                'Because it makes the health score more accurate',
              ],
              correct: 1,
              explanation:
                'A one-size-fits-all churn intervention is unlikely to work. A customer who hasn\'t realised value needs a success planning conversation and product education. A customer whose champion has left needs relationship rebuilding with new stakeholders. A customer facing budget pressure needs commercial flexibility and ROI data. The intervention must match the cause of the risk.',
            },
          ],
        },
        {
          id: 'customer-m2-l3',
          title: 'Automated Touchpoints and Proactive Outreach',
          duration: 18,
          description:
            'Design automated outreach sequences that feel personal and relevant — using AI to personalise at scale without losing the human touch.',
          content: `## The Personalisation at Scale Problem

Every customer deserves timely, relevant, personalised communication. At portfolio scale, that is impossible to do manually. AI makes it achievable — but only if you build your outreach sequences thoughtfully.

## What to Automate and What Not To

**Automate:**
- Usage milestone congratulations ("You've reached 100 active users — here's how other customers used this milestone to...")
- Feature adoption nudges based on what the customer hasn't tried yet
- Check-in sequences for low-engagement periods
- Training and onboarding completion follow-ups
- New feature announcements personalised to the customer's use case

**Don't automate:**
- First engagement with a new customer contact
- Renewal conversations
- Responses to negative sentiment (low NPS, complaints)
- Executive-level relationship communications
- Any touchpoint that requires specific relationship context

## Building an AI-Personalised Outreach Sequence

The key is giving AI enough context to make communications genuinely specific:

"Draft a check-in email for [customer name] at [company]. Context: they have been with us 6 months, primary use case is [X], they haven't used [feature Y] which other customers in their segment find valuable, last interaction was [Z weeks] ago. Tone: helpful and specific, not generic sales language."

The resulting email feels personally crafted — because it is, just with AI assistance rather than 20 minutes of writing.

## Triggered vs. Scheduled Outreach

**Triggered outreach** fires based on a signal (usage drops, milestone reached, feature not used in 30 days). It is more relevant because it responds to the customer's actual behaviour.

**Scheduled outreach** fires at fixed intervals regardless of customer behaviour. It is simpler to build but risks irrelevance.

For highest impact, prioritise triggered outreach sequences over scheduled ones.`,
          keyTakeaways: [
            'Automate usage milestones, feature adoption nudges, and low-engagement check-ins — not renewals or escalations',
            'AI personalisation requires specific customer context in the prompt — generic input produces generic output',
            'Triggered outreach (fires on a signal) is more relevant than scheduled outreach (fires on a calendar)',
            'The customer experience of AI-personalised outreach should be indistinguishable from personal outreach',
            'Over-automation erodes trust — preserve human touchpoints for moments that define the relationship',
          ],
          exercise: {
            title: 'AI Personalised Outreach Sequence',
            description:
              'Build a personalised outreach email for three different customer scenarios using AI.',
            steps: [
              'Choose three different customer scenarios: (a) a customer who reached a usage milestone, (b) a customer who hasn\'t used a key feature in 45 days, (c) a customer with a declining health score',
              'For each scenario, write a prompt that includes customer context (company type, use case, history)',
              'Generate all three emails with Claude',
              'Review each: does it feel genuinely personalised or generic? Would you be comfortable sending it to a customer without editing?',
              'Send the weakest one to a colleague and ask for honest feedback on whether it feels personal',
            ],
            tool: 'Claude',
          },
          quiz: [
            {
              question: 'What makes AI-personalised outreach genuinely feel personal rather than generic?',
              options: [
                'Using the customer\'s first name in the email',
                'Including specific customer context in the prompt: use case, recent activity, history, and relevant comparison to other customers',
                'Sending more emails more frequently',
                'Using a different email template for each customer',
              ],
              correct: 1,
              explanation:
                'Personalisation that feels real comes from specific context: referencing the customer\'s actual use case, noting their specific usage pattern, comparing them to customers who look similar. "Your team has completed onboarding but hasn\'t activated the [specific feature] that customers in your industry use most" is specific. "We wanted to check in on your progress" is generic. The prompt must contain the specifics for the output to contain them.',
            },
          ],
        },
        {
          id: 'customer-m2-l4',
          title: 'Renewal Forecasting with AI',
          duration: 15,
          description:
            'Build more accurate renewal forecasts using AI to combine health signals, engagement data, and relationship intelligence into a probability view of your renewal portfolio.',
          content: `## Why Renewal Forecasting Is Hard

Renewal forecasting requires combining objective data (health scores, product usage) with subjective assessment (relationship quality, CSM gut feel). Both are important. Both are imperfect. AI can help combine them systematically and reduce the optimism bias that makes most renewal forecasts inaccurate.

## Building an AI-Assisted Renewal Forecast

The input to AI renewal forecasting:
- Current health score and trend (last 90 days)
- Usage data (current vs. same period last year)
- Engagement quality (recent meeting, champion activity)
- Commercial context (expansion history, price increases, budget context)
- CSM qualitative assessment

The AI output:
- Risk classification (high/medium/low)
- Key risk factors identified
- Recommended actions before the renewal date

A prompt that works: "Based on the following account data [list], classify renewal risk as high/medium/low. Identify the top three factors driving your assessment and recommend two to three actions the CSM should take in the next 30 days."

## Calibrating the Forecast

Optimism bias is the most common forecasting error in CS. CSMs believe accounts will renew because they have good relationships — often correct, sometimes not. AI can provide a more dispassionate risk assessment that counter-balances CSM optimism.

Build a calibration habit: compare AI's risk assessment to your own. Where they diverge, investigate. If AI flags a risk you've dismissed, validate that your relationship evidence genuinely overrides the signal.

## The Portfolio Forecast

AI can process your entire renewal portfolio and produce a stratified view: accounts at high risk (total ARR at risk), accounts at medium risk (require proactive engagement), and accounts at low risk (standard renewal process). This tells leadership where to focus CS resources.`,
          keyTakeaways: [
            'Renewal forecasting combines objective health data with subjective relationship assessment — AI helps structure this combination',
            'Optimism bias is the most common forecasting error — AI provides a more dispassionate risk view',
            'Calibrate your forecasts: where AI and CSM assessment diverge, investigate rather than dismiss one',
            'Portfolio-level AI forecasting shows leadership where to concentrate CS resources',
            'Renewal forecast accuracy improves over time as you log outcomes and update the model',
          ],
          exercise: {
            title: 'Renewal Forecast Review',
            description:
              'Use AI to assess your current renewal pipeline and identify where your intuition and data may diverge.',
            steps: [
              'List your top 10 upcoming renewals by ARR',
              'For each, note: health score, recent usage trend, last meaningful interaction, CSM confidence (high/medium/low)',
              'Ask Claude: "Based on this renewal data [paste], which accounts show the largest gap between CSM confidence and data signals? What risks might be underweighted?"',
              'Review AI\'s assessment: which accounts are you most confident about despite weak data signals?',
              'For the top gap account, schedule a proactive conversation in the next 2 weeks to validate your optimism',
            ],
            tool: 'Claude',
          },
          quiz: [
            {
              question: 'Why do CSM renewal forecasts often overestimate renewal probability?',
              options: [
                'CSMs don\'t have access to usage data when forecasting',
                'Optimism bias — CSMs who have good relationships with customers often believe those relationships will drive renewal regardless of product engagement signals',
                'Renewal forecasting models are always wrong',
                'Customers always signal renewal intent accurately in advance',
              ],
              correct: 1,
              explanation:
                'Optimism bias is a documented cognitive pattern: people with good relationships with others tend to attribute positive outcomes to those relationships even when objective data suggests risk. CSMs with strong customer relationships often rate renewal probability higher than health data supports. AI can provide a more data-driven counterweight — not to replace the relationship assessment, but to ensure it isn\'t the only input.',
            },
          ],
        },
      ],
    },
    {
      id: 'customer-m3',
      title: 'Personalising the Customer Journey',
      description:
        'Use AI to deliver a personalised customer experience at every stage — from onboarding through expansion — that makes every customer feel like your most important one.',
      lessons: [
        {
          id: 'customer-m3-l1',
          title: 'AI-Powered Onboarding',
          duration: 18,
          description:
            'Design onboarding experiences that get customers to value faster using AI to personalise the journey, automate progress tracking, and identify customers at risk of failing to activate.',
          content: `## Why Onboarding Determines Retention

Research consistently shows that customers who reach a defined activation milestone in the first 30–60 days retain at dramatically higher rates. Onboarding is not administrative — it is the most important retention investment you make.

## AI in the Onboarding Journey

**Personalised onboarding plans.** AI can generate a customised onboarding plan based on the customer's stated goals, use case, team size, and industry. Rather than a generic checklist, the customer gets: here are the three things you should do in week one for your specific situation.

**Progress monitoring.** AI monitors onboarding milestone completion and flags accounts falling behind. "No user has completed training module 2 after 14 days" triggers a specific intervention.

**Activation risk identification.** Combine early usage data with onboarding completion to identify customers who are at risk of never activating — before they give up and become churn risks.

**Communication personalisation.** Onboarding emails can reference the specific use case and goals the customer expressed during sales, making every communication feel relevant rather than templated.

## The Onboarding Personalisation Prompt

"Draft a week 1 onboarding plan for a new customer at [company type]. Their primary use case is [X], they have [Y] seats purchased, and their stated goal is [Z]. Format as: three key actions for week 1, two things to avoid, and the milestone that signals they\'ve achieved early value."

## What AI Cannot Do in Onboarding

AI cannot replace the kick-off call. The human moment at the start of the customer relationship sets the tone, builds trust, and surfaces the context that makes all subsequent AI-personalised communication genuinely relevant. The kick-off call is where you gather the inputs for AI personalisation — it shouldn't be the thing you automate away.`,
          keyTakeaways: [
            'Reaching activation milestones in the first 30–60 days is the strongest predictor of long-term retention',
            'AI enables personalised onboarding plans based on customer use case, goals, and team profile',
            'Monitor onboarding milestone completion with AI and flag customers falling behind early',
            'The kick-off call is where you gather inputs for AI personalisation — it should not be automated',
            'Onboarding email personalisation that references specific customer goals dramatically increases engagement',
          ],
          exercise: {
            title: 'Personalised Onboarding Plan',
            description:
              'Create a personalised onboarding plan for a new customer using AI.',
            steps: [
              'Choose a new customer who onboarded recently or is about to onboard',
              'Gather their context: company type, use case, team size, stated goals from the sales handoff',
              'Ask Claude to generate: a week 1 onboarding plan specific to their situation, three common mistakes customers in their situation make, and the milestone that signals initial value achieved',
              'Compare the AI output to your standard onboarding template — how personalised is it? What did it get wrong about their specific situation?',
              'Refine with your knowledge of this specific customer and use it in your next onboarding conversation',
            ],
            tool: 'Claude',
          },
          quiz: [
            {
              question: 'What is the most important human touchpoint to preserve in an AI-assisted onboarding process?',
              options: [
                'Monthly check-in emails',
                'The kick-off call that establishes the relationship and gathers the context for all subsequent personalisation',
                'Feature announcement emails',
                'Training module completion notifications',
              ],
              correct: 1,
              explanation:
                'The kick-off call does two irreplaceable things: it establishes human trust at the start of the relationship, and it gathers the specific customer context that makes all subsequent AI-personalised communication genuinely relevant. Automating the kick-off call loses both — you start the relationship on the wrong foot and lose the input that makes personalisation work.',
            },
          ],
        },
        {
          id: 'customer-m3-l2',
          title: 'QBR Preparation and Success Planning with AI',
          duration: 20,
          description:
            'Use AI to prepare comprehensive, data-rich QBRs in a fraction of the usual time — and turn success plans from aspirational documents into living operational tools.',
          content: `## The QBR Preparation Problem

A QBR that demonstrates genuine insight into the customer\'s business outcome builds the renewal. A QBR that presents generic product adoption data does not. The challenge is that building a genuinely insightful QBR takes hours — data gathering, analysis, narrative construction, slide preparation.

AI cuts that time to 20–30 minutes without reducing quality.

## The AI QBR Preparation Workflow

**Step 1 — Data gathering (10 minutes).** Pull from: product usage analytics, support ticket history, feature adoption data, previous QBR notes, health score history, any expansion history.

**Step 2 — AI synthesis (5 minutes).** Prompt: "Based on this account data [paste], prepare a QBR narrative covering: progress since last QBR, key value moments and ROI indicators, current challenges and open items, and recommended next steps for the next quarter."

**Step 3 — Add relationship context (10 minutes).** You add: what you know about the customer\'s business priorities this quarter, any strategic changes in their organisation, competitive context, expansion opportunities you\'ve identified.

**Step 4 — Slide structure (5 minutes).** Ask Claude: "Structure this QBR content into a 5-slide agenda: executive summary, value delivered, challenges and solutions, roadmap preview, and proposed success goals for next quarter."

## Living Success Plans with AI

Success plans often start as detailed documents and end as artifacts no one updates. AI can help maintain them as living tools:

- Monthly: "Review this success plan [paste] and update the progress on each milestone based on this recent data [paste]. Flag any goals that are falling behind schedule."
- Quarterly: Generate a revised success plan for the next quarter based on what was achieved and what the customer's goals are now.

## The ROI Framework

Customers renew when they believe they're getting value. AI can help calculate and communicate ROI:
"Based on this customer's usage data [paste] and the following product ROI benchmarks [e.g., X hours saved per feature used per month], calculate an estimated ROI for this customer and format it for a QBR executive summary."`,
          keyTakeaways: [
            'AI QBR preparation workflow: 10 min data → 5 min AI synthesis → 10 min relationship context → 5 min slide structure',
            'AI can maintain living success plans by automatically updating progress from usage data',
            'QBR ROI calculations based on usage data and benchmarks are achievable with AI in minutes',
            'The relationship context you add in step 3 is what makes an AI-prepared QBR genuinely insightful',
            'A QBR that demonstrates customer business impact builds renewals; a data dump does not',
          ],
          exercise: {
            title: 'AI QBR Preparation',
            description:
              'Prepare a full QBR summary for a customer account using the AI workflow in under 30 minutes.',
            steps: [
              'Choose a customer account with an upcoming or recent QBR',
              'Gather available data: usage metrics, support history, health score, previous QBR notes',
              'Run the AI synthesis prompt to generate a QBR narrative',
              'Add your relationship context and any information AI couldn\'t have',
              'Ask Claude to structure the content into a 5-slide QBR agenda',
              'Time the full process. How does it compare to your usual QBR prep time?',
            ],
            tool: 'Claude',
          },
          quiz: [
            {
              question: 'What is the most critical element that a CSM must add to an AI-prepared QBR that AI cannot supply?',
              options: [
                'The correct slide format and design',
                'The customer\'s current business priorities, strategic changes, and relationship context that isn\'t in any system',
                'Product usage statistics and adoption rates',
                'The company logo and branding',
              ],
              correct: 1,
              explanation:
                'AI can synthesise product usage data, health scores, and support history efficiently. What it cannot access is what you know from the relationship: the customer\'s Q3 initiative that changes their priorities, the executive sponsor who is looking for a promotion win, the competitive pressure they\'re under, the budget conversation they mentioned on the last call. This relationship intelligence is what elevates a data-rich QBR into a genuinely strategic conversation.',
            },
          ],
        },
        {
          id: 'customer-m3-l3',
          title: 'Customer Feedback Analysis at Scale',
          duration: 18,
          description:
            'Turn customer feedback from NPS surveys, support tickets, and user interviews into actionable product and CS insights using AI to synthesise at volumes that manual review can\'t match.',
          content: `## Why Feedback Analysis Matters

Customer feedback is one of the most valuable inputs for both CS strategy and product development. The problem is volume: hundreds of NPS comments, thousands of support tickets, dozens of interview transcripts. Manual analysis creates sampling bias — you read the loudest voices, not necessarily the most representative ones. AI removes that constraint.

## NPS Comment Analysis

NPS scores tell you the number; comments tell you the why. AI can categorise hundreds of NPS comments by: sentiment theme, specific product areas mentioned, feature requests, competitor references, and likelihood of expanding vs. contracting.

Prompt: "Analyse these NPS comments [paste] from [score range]. Categorise by: (1) main reason cited, (2) product areas mentioned positively/negatively, (3) any competitive references, (4) any feature requests. Provide a structured summary and flag the three most concerning themes."

## Support Ticket Pattern Analysis

Support tickets reveal friction points before they surface in NPS or churn data. Monthly or quarterly AI analysis of support ticket themes can surface emerging product issues, training gaps, and documentation problems.

Prompt: "Analyse these 100 support tickets from the past month. Identify: top 5 issue categories, most frequent error messages or feature areas, any issues that appear to be increasing in frequency, and any issues that suggest an onboarding or documentation gap."

## Connecting Feedback to Product

The highest-value output of feedback analysis is a structured view for the product team: here are the top 5 user pain points evidenced by [X NPS comments, Y support tickets], here is representative verbatim user language, and here is a prioritised recommendation.

AI makes this CS-to-product feedback loop faster and more systematic — which means product teams actually use it rather than waiting for it.`,
          keyTakeaways: [
            'AI feedback analysis removes sampling bias — it reads all voices, not just the loudest ones',
            'NPS comment analysis should identify themes, product areas, competitors, and feature requests',
            'Support ticket pattern analysis surfaces friction points before they appear in churn data',
            'Structured AI feedback reports that connect to product priorities are more likely to be acted on',
            'Monthly or quarterly AI feedback analysis creates a systematic CS-to-product intelligence loop',
          ],
          exercise: {
            title: 'Feedback Theme Analysis',
            description:
              'Use AI to analyse a batch of customer feedback and produce a structured insight report.',
            steps: [
              'Gather 20+ NPS comments, support tickets, or user feedback items from the past month',
              'Run the NPS comment or support ticket analysis prompt',
              'Review AI\'s theme categorisation: are the categories accurate? What did AI miss or over-weight?',
              'Ask Claude to format the top three themes as a product team brief: theme, evidence (sample verbatim quotes), frequency, and recommended action',
              'Share the brief with a product team member. Is it useful? What format would make it more actionable?',
            ],
            tool: 'Claude',
          },
          quiz: [
            {
              question: 'What is the main advantage of AI feedback analysis over manual reading of NPS comments?',
              options: [
                'AI generates more positive NPS comments',
                'AI processes all feedback systematically, removing the sampling bias that comes from manually reading a selection',
                'AI can automatically respond to negative NPS comments',
                'AI feedback analysis requires fewer resources than traditional survey tools',
              ],
              correct: 1,
              explanation:
                'Manual feedback analysis creates sampling bias because humans tend to read recent feedback first, remember dramatic feedback most clearly, and unconsciously weight feedback that confirms existing beliefs. AI processes all items with consistent criteria, which means quieter but representative voices are not missed. This produces a more accurate picture of what customers actually experience.',
            },
          ],
        },
        {
          id: 'customer-m3-l4',
          title: 'Expansion and Upsell Intelligence with AI',
          duration: 15,
          description:
            'Identify and prioritise expansion opportunities in your portfolio using AI to surface the right signals at the right time for upsell and cross-sell conversations.',
          content: `## Expansion as CS Responsibility

In most SaaS businesses, net revenue retention (NRR) — which includes expansion — is as important as renewal rates for demonstrating CS value. AI can make expansion conversations more timely, relevant, and successful by identifying the right accounts, at the right moment, with the right context.

## AI Expansion Signal Detection

AI can monitor your portfolio for expansion signals:

**Usage-based signals:**
- Approaching seat limit (users at 90%+ of purchased capacity)
- Heavy feature usage suggesting readiness for advanced tier
- Power users who might benefit from additional products
- Departments within the account not yet using the product

**Outcome-based signals:**
- Account reports strong ROI in a QBR — timing for expansion conversation
- Champion gets promoted — new stakeholder to introduce additional products
- Account grows in headcount significantly (hiring data)
- New use case mentioned in a call that you can solve

**Engagement-based signals:**
- Customer requests features available in the next tier
- Customer asks about capabilities outside their current subscription

## Structuring the Expansion Conversation

AI can help prepare the expansion conversation with relevant context:

"Based on this account's usage data and our product portfolio [describe], identify the most relevant expansion opportunity, draft a value proposition specific to their use case, and prepare three questions to uncover whether they're ready for a conversation."

## The Right Moment Matters

An expansion conversation at the wrong time (mid-onboarding, immediately after a support issue) damages relationships. AI can flag expansion signals and add a timing note: this account shows expansion potential, but health score is currently medium — schedule for post-resolution, not now.`,
          keyTakeaways: [
            'AI expansion monitoring surfaces usage, outcome, and engagement signals that indicate expansion readiness',
            'Approaching seat limits, heavy feature usage, and champion promotions are strong expansion triggers',
            'Timing matters: AI should flag expansion potential AND whether the relationship is healthy enough for the conversation',
            'Expansion conversations are most successful when framed around the customer\'s specific use case and outcomes',
            'NRR improvement is a demonstrable CS business impact that AI-powered expansion intelligence directly drives',
          ],
          exercise: {
            title: 'Expansion Opportunity Audit',
            description:
              'Use AI to identify and prioritise expansion opportunities across your account portfolio.',
            steps: [
              'List your top 15 accounts by ARR',
              'For each, note: current product tier, seat utilisation, recent positive signals (QBR success, strong ROI reported, growth), and relationship health',
              'Ask Claude: "Based on this account data [paste], rank accounts by expansion potential. For your top three, suggest the most relevant expansion opportunity and the best timing."',
              'Review AI\'s ranking — does it match your intuition? Which accounts surprised you?',
              'Schedule a proactive outreach for the top expansion account identified in the next 10 business days',
            ],
            tool: 'Claude',
          },
          quiz: [
            {
              question: 'What combination of signals most strongly indicates expansion readiness?',
              options: [
                'Low health score and high support ticket volume',
                'High product usage, approaching capacity limits, and a recent positive business outcome',
                'A customer who requested a discount at renewal',
                'A new contact added to the account in your CRM',
              ],
              correct: 1,
              explanation:
                'The strongest expansion signal is a combination of high engagement (heavy product usage), capacity pressure (approaching seat limits), and a demonstrated positive outcome (strong ROI reported, business metric improved). These together indicate that the customer is deriving genuine value and has organisational appetite to expand — the timing is right for a conversation.',
            },
          ],
        },
      ],
    },
    {
      id: 'customer-m4',
      title: 'Scaling CS Operations with AI',
      description:
        'Build scalable CS operations using AI — from knowledge bases and self-service to team productivity and strategic metrics — so your team can manage more customers without sacrificing relationship quality.',
      lessons: [
        {
          id: 'customer-m4-l1',
          title: 'AI-Powered Knowledge Bases and Self-Service',
          duration: 18,
          description:
            'Build AI-enhanced knowledge bases and self-service tools that resolve customer questions faster and reduce the repetitive burden on your CS team.',
          content: `## The Self-Service Opportunity in CS

The most scalable CS motion is one where customers can find answers independently — without waiting for a CSM response. AI-enhanced self-service doesn't mean removing the human relationship; it means making sure customers never have to wait for routine answers when they need them at 11pm.

## AI for Knowledge Base Creation and Maintenance

**Content generation.** AI can draft knowledge base articles from support ticket resolution notes, product documentation, and CS team expertise. "Based on these support ticket resolutions [paste], draft a knowledge base article explaining how to [task] in [product]."

**Content improvement.** AI can review existing knowledge base articles and identify: unclear steps, missing information, outdated content, and articles that frequently lead to follow-up tickets (suggesting the article isn't resolving the question).

**Gap identification.** AI can analyse support ticket themes against your knowledge base index and identify: topics frequently asked but not covered, or topics covered but not resolving tickets.

## Building AI-Powered Search

Standard knowledge base search requires exact keyword match. AI-powered search understands intent: "How do I get my team set up?" matches articles about user provisioning, onboarding, and permissions — not just articles with the word "team" in them.

Most modern CS platforms and documentation tools (Notion, Confluence, Zendesk, Intercom) are adding AI search. Audit what\'s available in your current stack.

## The Self-Service/Human Balance

Self-service handles routine questions efficiently. But design your self-service experience to escalate to human support when:
- The issue is account-specific (requires CRM context)
- The customer is expressing frustration
- The question has no self-service resolution
- The customer explicitly requests human support

Never trap a customer in self-service who needs a human. The frustration this creates is worse than no self-service at all.`,
          keyTakeaways: [
            'AI can draft knowledge base articles from support resolutions and identify coverage gaps',
            'AI-powered search understands intent, not just keywords — dramatically improves self-service success rates',
            'Design escalation paths from self-service to human support for account-specific or frustration-driven queries',
            'Trapping customers in self-service who need a human causes more damage than no self-service',
            'Knowledge base ROI is measurable: track deflection rate, first-contact resolution, and CSM time on routine queries',
          ],
          exercise: {
            title: 'Knowledge Base Gap Analysis',
            description:
              'Use AI to identify gaps in your customer-facing knowledge base and draft one missing article.',
            steps: [
              'Pull your top 20 support ticket categories from the past month',
              'Index your current knowledge base articles (list the topics covered)',
              'Ask Claude: "Based on these support ticket topics [paste] and knowledge base coverage [paste], identify the top 5 topics that customers are asking about that aren\'t covered or are inadequately covered."',
              'Choose the most important gap',
              'Ask Claude to draft a knowledge base article for that topic based on your product knowledge',
              'Review the draft: is it accurate? Is it clear for a non-expert? What did you need to add?',
            ],
            tool: 'Claude',
          },
          quiz: [
            {
              question: 'How does AI-powered knowledge base search improve on standard keyword search?',
              options: [
                'AI search is faster than keyword search',
                'AI search understands customer intent, matching queries to relevant articles even when exact keywords don\'t match',
                'AI search automatically updates articles',
                'AI search allows customers to speak their questions rather than typing them',
              ],
              correct: 1,
              explanation:
                'Standard keyword search requires customers to guess the exact terminology used in an article. AI search understands intent — a customer asking "Why can\'t my colleague see the dashboard?" can be matched to articles about permissions, user roles, and visibility settings, even if none of those articles use the word "colleague." This dramatically improves self-service success rates and reduces the follow-up support tickets generated by failed self-service.',
            },
          ],
        },
        {
          id: 'customer-m4-l2',
          title: 'CS Team Productivity with AI',
          duration: 15,
          description:
            'Apply AI tools and workflows that make every CSM on your team more productive — from call preparation to documentation to internal collaboration.',
          content: `## Scaling Team Productivity, Not Just Individual Productivity

The goal of AI in CS is not to make one CSM more productive — it is to raise the capability of every CSM on the team. This requires: shared workflows that everyone follows, shared prompt libraries that work for your product and customers, and a learning culture where AI improvements are shared across the team.

## CS Team AI Playbook

A CS AI playbook documents:
- Approved tools for specific task types
- Standard prompts for common workflows (QBR prep, health assessment, renewal analysis)
- Quality standards for AI-generated communications (what must be reviewed before sending)
- Data protocols (what information should never be entered into unapproved tools)

Sharing a playbook means every new CSM onboards with AI capability from day one, rather than discovering it individually over months.

## Call Intelligence for the Team

Call intelligence tools (Gong, Chorus) create AI-powered value for the whole team:
- Best practice call examples identified by AI and shared with team
- Risk signals in calls flagged and reviewed in team meetings
- New CSM onboarding with AI-indexed examples of great calls
- Consistent follow-up action tracking across the team

## AI for Manager Efficiency

CS managers can use AI to:
- Synthesise team health portfolio summaries for leadership review
- Generate coaching notes from call recordings
- Produce renewal pipeline views from CRM data
- Identify coaching priorities by comparing CSM metrics and call patterns

## The Learning Loop

Every AI-assisted workflow improvement discovered by one CSM should be shared with the team. Build a regular habit: monthly AI learning session where CSMs share their most effective prompts and workflows. The team improves together, not individually.`,
          keyTakeaways: [
            'Standardise AI workflows across the CS team with a shared playbook and prompt library',
            'Call intelligence tools create team-wide value: coaching, onboarding, and best practice sharing',
            'CS managers can use AI to synthesise portfolio health, generate coaching notes, and identify priorities',
            'Build a monthly AI learning loop where the team shares effective prompts and workflows',
            'New CSMs onboarding with a shared AI playbook hit productivity faster than those discovering it individually',
          ],
          exercise: {
            title: 'CS AI Playbook Starter',
            description:
              'Draft the first version of a CS AI playbook for your team.',
            steps: [
              'List the five most common CS tasks your team does repeatedly',
              'For each, write: (a) the approved tool, (b) a standard prompt template, (c) what must be reviewed before sending to a customer',
              'Identify any data types that should never be entered into unapproved AI tools (define the red line)',
              'Ask Claude to help format this into a one-page team AI playbook',
              'Share a draft with one colleague and collect their feedback on what\'s missing or unclear',
            ],
            tool: 'Claude',
          },
          quiz: [
            {
              question: 'Why is a shared CS AI playbook more valuable than individual CSMs discovering AI workflows independently?',
              options: [
                'A shared playbook prevents CSMs from using AI without permission',
                'It ensures the whole team benefits immediately from improvements, new CSMs onboard with AI capability, and data protocols are consistently applied',
                'A playbook makes AI mandatory rather than optional',
                'Individual discovery is always faster than team documentation',
              ],
              correct: 1,
              explanation:
                'When AI workflows are discovered individually, the knowledge stays with the individual. A shared playbook ensures that every effective prompt and workflow improvement is immediately available to the whole team, new CSMs start with full AI capability rather than spending months discovering it, and data handling protocols are applied consistently to prevent accidental exposure of sensitive customer information.',
            },
          ],
        },
        {
          id: 'customer-m4-l3',
          title: 'Measuring CS AI Impact',
          duration: 15,
          description:
            'Define and track the metrics that demonstrate AI\'s impact on CS outcomes — from operational efficiency to business results — and build the business case for continued AI investment.',
          content: `## Measuring What Matters

AI investment in CS is justified by outcomes, not activity. The question is not "how many AI tools do we use?" but "what has AI improved in our CS results?" Define your measurement framework before you deploy AI, so you have a baseline to compare against.

## The CS AI Metrics Framework

**Operational efficiency metrics:**
- Average QBR preparation time (before vs. after AI)
- CSM accounts managed per head (portfolio size before vs. after AI)
- Time from risk flag to intervention (monitoring speed)
- Support ticket first-response time

**Quality metrics:**
- QBR satisfaction score (are customers getting more value from QBRs?)
- Personalisation quality score (internal team self-assessment of AI vs. manual communications)
- Health score accuracy (how often do health scores predict actual churn?)

**Business outcome metrics:**
- Gross renewal rate (are fewer customers churning?)
- Net revenue retention (is expansion increasing?)
- Time-to-value for new customers (is AI-powered onboarding faster?)
- CSAT and NPS trends

## Building the Business Case

To build the case for AI investment, calculate:
- CSM time saved per week × team size × average fully-loaded cost per hour
- Improvement in renewal rate × average contract value × number of accounts
- Portfolio capacity increase (accounts per CSM) × cost of equivalent headcount

AI prompt: "Help me build a business case for AI investment in our CS team. We have [X] CSMs, [Y] accounts, average ACV of [Z]. We\'ve seen [specific improvement]. What metrics should I present and how should I frame the ROI?"

## Reporting to Leadership

Translate CS AI metrics into leadership language: revenue retained, cost efficiency, capacity unlocked. Leaders don\'t need to know which tools you used; they need to know what results they produced.`,
          keyTakeaways: [
            'Measure AI impact against a pre-AI baseline — establish metrics before deployment, not after',
            'Three metric categories: operational efficiency, quality, and business outcomes',
            'The business case combines time saved, retention improvements, and capacity unlocked',
            'Report AI impact in leadership language: revenue retained, cost efficiency, capacity',
            'Accuracy of health scores and churn predictions is a quality metric that often improves with AI',
          ],
          exercise: {
            title: 'CS AI Impact Dashboard',
            description:
              'Design a measurement framework for your CS AI initiatives and establish your baseline metrics.',
            steps: [
              'Choose three metrics from each category: operational efficiency, quality, and business outcomes',
              'Document your current baseline for each metric (what is the number today, before AI improvement?)',
              'Set a 90-day improvement target for each metric',
              'Ask Claude to: (a) suggest any metrics you\'ve missed, (b) help you calculate a projected ROI from your target improvements',
              'Format this as a one-page CS AI impact tracking dashboard for your manager or CS leadership',
            ],
            tool: 'Claude',
          },
          quiz: [
            {
              question: 'Why is it important to establish baseline CS metrics before deploying AI?',
              options: [
                'AI tools require baseline data to function',
                'Without a pre-AI baseline, you cannot demonstrate that AI caused improvements rather than other factors',
                'Baselines prevent AI from making incorrect recommendations',
                'Regulatory requirements mandate pre-deployment measurement',
              ],
              correct: 1,
              explanation:
                'Attribution is the challenge in measuring AI impact. Without a documented pre-AI baseline, any improvement in renewal rates or efficiency could be attributed to other factors: a new CS manager, better product-market fit, or a favourable market environment. A clear baseline measured before AI deployment lets you demonstrate that specific metrics changed specifically because of AI-powered workflows.',
            },
          ],
        },
        {
          id: 'customer-m4-l4',
          title: 'The Future of Customer Success with AI',
          duration: 15,
          description:
            'Understand where AI is taking the CS function and how to position yourself and your team for a career that gets stronger as AI becomes more powerful.',
          content: `## What Changes in CS With AI

AI is already changing the economics of customer success. The ratio of accounts-to-CSM is increasing as AI handles more monitoring and communication tasks. The nature of CS work is shifting toward higher-value activities. The question for every CS professional is: how do I ensure my value increases as AI handles more?

## The Shift in CS Value

**Moving from:** Volume work — monitoring all accounts manually, writing every communication from scratch, preparing QBRs from raw data.

**Moving toward:** Strategic relationship management — executive relationship building, complex churn interventions, expansion conversations, customer advocacy, voice-of-customer to product.

The highest-value CS activities are the ones AI cannot do: being trusted by a customer, advocating for a customer internally, understanding the human dynamics in a customer's organisation. These become more valuable, not less, as AI handles the volume.

## Skills That Become More Valuable

- **Executive relationship management.** AI can prepare; humans build trust.
- **Strategic advisory conversations.** Helping customers achieve business outcomes, not just product adoption.
- **Internal advocacy.** Fighting for customers inside your organisation.
- **Change management.** Helping customers drive AI adoption internally.
- **AI-fluent CS.** CSMs who understand AI — both using it for their own work and helping customers use the product's AI features — are increasingly valuable.

## The AI-Fluent CSM

Customers are also adopting AI in their businesses. CSMs who understand AI — who can speak credibly about their customers' AI adoption challenges, who can help customers get value from AI features in your product — will build stronger relationships and be harder to replace than CSMs who treat AI as a threat.

Being AI-fluent is a career advantage, not a threat to the role.

## Building Your AI Career Capital

This programme is your foundation. From here:
- Build your personal AI workflow and document what works
- Develop depth in one AI-adjacent CS skill (AI feature adoption, AI success metrics)
- Share your knowledge with your team and build a reputation as the person who knows how AI changes CS`,
          keyTakeaways: [
            'AI shifts CS work from volume monitoring to strategic relationship management and advisory conversations',
            'Executive trust, internal advocacy, and human change management become more valuable as AI handles volume',
            'AI-fluent CSMs who help customers adopt AI are increasingly valuable in every CS organisation',
            'CS career capital in an AI era comes from: personal AI workflow, AI specialisation, and team knowledge sharing',
            'Being AI-fluent is a career advantage, not a threat — it makes CSMs more strategic, not less relevant',
          ],
          exercise: {
            title: 'My AI CS Career Strategy',
            description:
              'Design your personal development plan for building AI-fluent CS expertise over the next 90 days.',
            steps: [
              'Identify the three AI tools or workflows you\'ve built in this programme that have saved you the most time',
              'Identify one AI-adjacent CS skill you want to develop deeper: AI feature adoption success, AI health scoring, AI personalisation at scale',
              'Set a 90-day goal: what specific AI capability do you want to have that you don\'t have today?',
              'Identify one way you can share your AI CS knowledge with your team this month',
              'Ask Claude: "Based on this CS role and AI skill foundation, what AI capabilities should I develop to be the most valuable CS professional in my organisation in 2 years?"',
            ],
            tool: 'Claude',
          },
          quiz: [
            {
              question: 'How does AI make strong CS professionals more valuable rather than less relevant?',
              options: [
                'AI completely automates CS work, freeing CSMs for other roles',
                'AI handles volume tasks, allowing CSMs to focus on strategic relationship management and advisory work that AI cannot do',
                'AI makes all CS jobs identical, so experience doesn\'t matter',
                'AI replaces CSMs in all interactions except the annual renewal call',
              ],
              correct: 1,
              explanation:
                'AI excels at scale tasks: monitoring signals across hundreds of accounts, drafting routine communications, summarising data. These tasks take time but don\'t require deep relationship expertise. When AI handles them, CSMs can invest their time in the activities that require human trust and judgment: executive relationships, complex churn interventions, strategic advisory conversations, internal advocacy. These are the highest-value CS activities — and they become more prominent, not less, in an AI-enabled CS organisation.',
            },
          ],
        },
      ],
    },
  ],
}
