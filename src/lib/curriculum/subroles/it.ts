import type { SubRoleLessons } from './types'

export const itSubRoles: SubRoleLessons = {
  'sysadmin': {
    title: 'AI for Systems Administrators',
    description: 'Four focused lessons that show sysadmins how to use AI to document infrastructure, resolve incidents faster, and automate the repetitive tasks that fill every shift.',
    lessons: [
      {
        id: 'it-sysadmin-l1',
        title: 'AI for Systems Administrators: From Reactive to Proactive',
        duration: 16,
        description: 'Understand exactly where AI fits into a sysadmin\'s day — and where it doesn\'t. Build a clear mental model before touching any tool.',
        content: `## The Sysadmin Reality

Your day is a mix of the predictable and the catastrophic. You patch servers, manage access requests, respond to alerts, write runbooks that nobody reads, and occasionally fight a fire at 2am. AI doesn\'t change the fundamentals — but it compresses the time you spend on documentation, analysis, and communication dramatically.

## Where AI Genuinely Helps

**Documentation you\'ll actually write.** The biggest gap in most IT environments isn\'t missing runbooks — it\'s that runbooks take too long to write and fall out of date. AI reduces a 2-hour documentation task to 20 minutes.

**First-pass troubleshooting.** Paste an error log or stack trace into Claude and ask for possible causes. You\'ll still validate the answer, but getting from "unknown error" to "three probable causes" in 30 seconds changes how you start an incident.

**Communication under pressure.** Translating a technical outage into clear stakeholder language while also fixing the outage is brutal. AI drafts the update while you fix the issue.

**Script scaffolding.** You know what the Bash or Python script needs to do. AI writes the boilerplate; you validate the logic and adapt it to your environment.

## Where AI Does Not Help

- It does not have live visibility into your environment
- It cannot run commands or take action on your systems
- It will hallucinate command syntax for less common tools — always test in a non-production environment
- It cannot replace understanding your specific network topology or vendor quirks

## The Right Mental Model

Think of AI as a knowledgeable colleague who has read every man page and RFC but has never touched your specific environment. They can suggest approaches and draft documentation, but you are the one who knows whether those suggestions are safe in your context.

\`\`\`
Prompt: I need to write a runbook for rotating SSL certificates on our nginx servers.
The certificates are managed by Let\'s Encrypt. Include: pre-rotation checks,
rotation steps, validation steps, and rollback procedure.
\`\`\`

## Starting Point

Pick the most painful documentation gap in your environment — the thing you keep meaning to write but never do. That is your first AI task.`,
        keyTakeaways: [
          'AI compresses documentation and communication time but does not replace environment knowledge',
          'Troubleshooting is faster when AI generates probable causes from logs — you validate and act',
          'Script scaffolding is one of the highest-value sysadmin use cases — AI writes the boilerplate, you validate the logic',
          'Always test AI-generated scripts in a non-production environment before deploying',
        ],
        exercise: {
          title: 'First Runbook with AI',
          description: 'Pick an undocumented procedure in your environment and use AI to produce a first-draft runbook in under 20 minutes.',
          steps: [
            'Identify one common procedure you perform that has no written runbook (patch cycle, cert renewal, user offboarding, etc.)',
            'Open Claude and paste this prompt: "Write a runbook for [procedure]. Include: prerequisites, step-by-step instructions, validation steps, common errors and fixes, and rollback procedure."',
            'Review the output against your actual environment — mark anything incorrect or incomplete',
            'Edit the runbook to reflect your real environment specifics (hostnames, paths, tools)',
            'Save the result — note how long it took compared to writing it from scratch',
          ],
          tool: 'Claude',
        },
        quiz: [
          {
            question: 'You paste an error log into an AI tool and it gives you three probable causes. What is the correct next step?',
            options: [
              'Apply the first suggested fix immediately — AI is trained on vast sysadmin knowledge',
              'Validate each suggested cause against your specific environment before taking action',
              'Escalate to the vendor — AI-generated causes are not reliable enough',
              'Run all three fixes in sequence until the error stops',
            ],
            correct: 1,
            explanation: 'AI suggestions are a starting point for investigation, not authorised fixes. Validate each cause against your specific system state before acting — your environment has context the AI cannot see.',
          },
          {
            question: 'Which of these sysadmin tasks is AI LEAST suited to assist with directly?',
            options: [
              'Writing a first-draft runbook for a common procedure',
              'Drafting a stakeholder communication during an outage',
              'Monitoring live system metrics and triggering alerts',
              'Explaining a complex error message from an application log',
            ],
            correct: 2,
            explanation: 'AI tools are stateless — they have no live connection to your systems and cannot monitor, trigger, or act on real-time data. Documentation, communication, and analysis of pasted content are all valid use cases.',
          },
          {
            question: 'You ask AI to write a Bash script to automate disk cleanup. The output looks correct. What should you do?',
            options: [
              'Deploy it to production — it matches your specification',
              'Test it in a staging environment and review each command against your filesystem layout',
              'Ask AI to verify its own script before running it',
              'Run it on one non-critical server first and escalate if it works',
            ],
            correct: 1,
            explanation: 'AI-generated scripts should always be tested in a staging environment first. The script may be logically correct but fail on your specific directory structure, permissions, or filesystem state.',
          },
        ],
        applyThisWeek: {
          action: 'Write one runbook you\'ve been putting off using AI as your first-draft engine. Spend your time editing and validating rather than writing from scratch.',
          promptTemplate: 'Write a runbook for [procedure name] on [OS/platform]. Include: prerequisites, step-by-step instructions with commands, how to validate success, common errors and their fixes, and rollback steps if something goes wrong.',
          tool: 'Claude',
        },
      },
      {
        id: 'it-sysadmin-l2',
        title: 'Infrastructure Documentation, Runbooks, and SOPs with AI',
        duration: 18,
        description: 'Turn the undocumented tribal knowledge in your environment into clear, maintainable documentation — without spending weeks on it.',
        content: `## The Documentation Debt Every Sysadmin Inherits

Most environments have the same problem: critical procedures exist only in the heads of two or three people, runbooks are either missing or six versions out of date, and onboarding a new team member means months of shadowing. AI won\'t fix organisational culture, but it dramatically lowers the cost of writing good documentation.

## Three Documentation Categories AI Handles Well

**Runbooks** (step-by-step operational procedures):
Use AI to generate the structure and boilerplate. You fill in the environment-specific details — hostnames, file paths, tool versions, known gotchas.

**SOPs** (standard operating procedures for repeated tasks):
AI is particularly good at turning a rough bullet list of steps into a formal, readable SOP with consistent formatting.

**Architecture documentation**:
Describe your environment in plain language and ask AI to produce a structured summary, decision log, or diagram description. This is faster than writing it from scratch and gives non-technical stakeholders a readable document.

## The Most Effective Workflow

1. Perform the procedure once and take rough notes as you go
2. Paste your notes into AI: "Turn these rough notes into a formal runbook with the following sections: [list sections]"
3. Review the output — AI will fill in gaps with generic best practices; mark those for your validation
4. Add your environment-specific details
5. Store in your wiki (Confluence, Notion, SharePoint)

\`\`\`
Prompt: Convert these rough notes into a formal SOP for Ubuntu patch management.
Notes: [paste your notes]
Include sections: scope, frequency, pre-patch checks, patch procedure,
post-patch validation, rollback steps, sign-off requirements.
Format: numbered steps with sub-steps where needed.
\`\`\`

## Keeping Documentation Current

The second problem is staleness. AI can help here too: when a procedure changes, paste the old runbook and your change notes and ask AI to produce an updated version. This takes 5 minutes rather than rewriting from scratch.

## Quick Win: The Missing Runbook List

Spend 10 minutes listing every common procedure in your environment that has no runbook. Prioritise by: frequency × risk-if-done-wrong. Start at the top of the list.`,
        keyTakeaways: [
          'AI is best used as a first-draft engine — you provide environment-specific details, AI provides structure and clarity',
          'The rough-notes-to-SOP workflow turns a 2-hour writing task into a 20-minute editing task',
          'Use AI to update existing documentation when procedures change — paste old + change notes, get updated runbook',
          'Prioritise documentation by frequency × risk: what you do often and what breaks badly if done wrong',
        ],
        exercise: {
          title: 'Rough Notes to Published SOP',
          description: 'Take one procedure you perform regularly and produce a publishable SOP in under 30 minutes using AI.',
          steps: [
            'Choose a procedure you perform at least monthly that has no written documentation',
            'Spend 5 minutes writing rough bullet notes covering the steps — don\'t worry about completeness',
            'Paste your notes into Claude with this prompt: "Convert these notes into a formal SOP. Sections: purpose, scope, prerequisites, step-by-step procedure, validation, rollback, revision history."',
            'Review the output — highlight anything that is generic or incorrect for your environment',
            'Edit with your specific details, then save to your team wiki',
          ],
          tool: 'Claude',
        },
        quiz: [
          {
            question: 'When AI generates a runbook from your rough notes, what is the most important review step?',
            options: [
              'Check for spelling and grammar errors',
              'Identify where AI filled in generic steps that may not match your environment',
              'Ensure the runbook is shorter than the original notes',
              'Verify the AI used the correct heading format',
            ],
            correct: 1,
            explanation: 'AI will fill gaps in your notes with generic best practices that may be incorrect for your specific environment. Identifying and replacing these generic steps with your actual procedures is the critical review task.',
          },
          {
            question: 'You have an existing runbook that is now out of date after a major change. What is the most efficient way to update it with AI?',
            options: [
              'Start a new runbook from scratch — old runbooks confuse AI',
              'Paste the old runbook plus your change notes and ask AI to produce an updated version',
              'Ask AI what has changed in the industry since the runbook was written',
              'Ask AI to identify the outdated sections without providing context',
            ],
            correct: 1,
            explanation: 'Providing the old runbook and your change notes gives AI all the context it needs to produce an updated version in one pass. Starting from scratch loses the validated content that is still correct.',
          },
          {
            question: 'Which procedure should you document first?',
            options: [
              'The one that is most interesting technically',
              'The most recent procedure you performed',
              'The one with the highest frequency × risk-if-done-wrong score',
              'The one that is easiest to document',
            ],
            correct: 2,
            explanation: 'Frequency × risk gives you the highest return on documentation effort. A common procedure done wrong under pressure is where undocumented knowledge causes the most damage.',
          },
        ],
        applyThisWeek: {
          action: 'Produce one publishable SOP for a procedure that currently has no documentation. Share it with at least one team member for review.',
          promptTemplate: 'Convert these rough notes into a formal SOP for [procedure name] on [platform/OS]. Sections: purpose, scope, prerequisites, step-by-step procedure (numbered), validation steps, rollback procedure, revision history. Notes: [your notes]',
          tool: 'Claude',
        },
      },
      {
        id: 'it-sysadmin-l3',
        title: 'Troubleshooting, Root Cause Analysis, and Incident Resolution with AI',
        duration: 17,
        description: 'Use AI to accelerate the diagnostic phase of incidents — from raw log to probable causes in seconds, and from incident to post-mortem in minutes.',
        content: `## The Fastest Part of Troubleshooting Just Got Faster

When an incident hits, the most time-consuming phase is often the initial diagnosis: reading logs, forming hypotheses, checking documentation. AI compresses that phase significantly — not by replacing your judgment, but by generating the list of probable causes faster than you can think through them manually.

## Pasting Logs and Error Messages

This is the highest-value sysadmin use of AI. Paste the relevant log section and ask for an analysis:

\`\`\`
Prompt: I\'m seeing this error in my nginx logs. What are the most likely causes
and what should I check first?

[paste error output]

Environment: Ubuntu 22.04, nginx 1.24, reverse proxying to a Node.js app on port 3000.
\`\`\`

The more context you provide — OS version, application stack, recent changes — the more targeted the analysis. AI cannot see your environment, so you must describe it.

## Root Cause Analysis

After resolving an incident, AI can help structure your root cause analysis. Paste your incident timeline and ask for a structured RCA:

\`\`\`
Prompt: Write a root cause analysis for this incident.
Timeline: [paste your notes]
Format: summary, timeline, root cause, contributing factors,
immediate fix, permanent fix, lessons learned, action items.
\`\`\`

This turns a 2-hour post-mortem writing task into a 20-minute review-and-edit task.

## Writing Incident Communications

One of the most stressful parts of a major incident is communicating with non-technical stakeholders while simultaneously working the problem. AI can draft these communications:

\`\`\`
Prompt: Write a stakeholder update for a partial service outage.
Audience: business leadership (non-technical).
Status: investigating, 40% of users affected, cause identified as database
connection pool exhaustion, fix in progress, estimated resolution 45 minutes.
Tone: clear, calm, no jargon.
\`\`\`

## Important Limitation

AI works on the information you give it. If your log is incomplete or you describe the environment incorrectly, the analysis will be wrong. Quality of input determines quality of output.`,
        keyTakeaways: [
          'Pasting logs with environment context gives AI what it needs to generate targeted probable causes',
          'AI reduces post-mortem writing from hours to minutes — paste your incident timeline and let it structure the RCA',
          'Stakeholder communications can be drafted by AI while you focus on resolving the incident',
          'AI analysis quality depends entirely on the completeness and accuracy of what you paste',
        ],
        exercise: {
          title: 'Log Analysis and RCA Draft',
          description: 'Use a real or anonymised incident log to practice AI-assisted diagnosis and post-mortem writing.',
          steps: [
            'Find a recent error log, alert, or incident from your environment (anonymise sensitive data if needed)',
            'Paste it into Claude with your environment context: OS, application stack, any recent changes',
            'Ask: "What are the three most likely causes of this error? What should I check first for each?"',
            'Review the suggestions against your knowledge of the environment — note which are relevant',
            'Now ask Claude to write a structured root cause analysis using the incident details and resolution steps you provide',
          ],
          tool: 'Claude',
        },
        quiz: [
          {
            question: 'You paste an application error log to AI and get three probable causes. The first one matches a recent change you made. What do you do?',
            options: [
              'Trust AI — it has identified the most likely cause',
              'Investigate the first cause while keeping the other two as fallback hypotheses',
              'Dismiss AI\'s analysis and investigate based on your gut instinct',
              'Escalate to the application team — the cause is identified',
            ],
            correct: 1,
            explanation: 'When AI\'s first suggestion aligns with your own suspicion, investigate it — but keep the other hypotheses available. AI can be right for the wrong reasons, and ruling out alternatives is good diagnostic practice.',
          },
          {
            question: 'When writing an incident stakeholder communication with AI, what context is most important to provide?',
            options: [
              'The full technical details of the root cause',
              'Audience type, current status, impact scope, and estimated resolution time',
              'The names of everyone involved in the response',
              'The AI tools you used during diagnosis',
            ],
            correct: 1,
            explanation: 'Stakeholder communications need to match the audience\'s information needs. Providing audience type, status, impact, and ETA gives AI what it needs to produce a clear, appropriately non-technical update.',
          },
          {
            question: 'What is the most important thing to include when pasting a log to AI for analysis?',
            options: [
              'The exact timestamp of every log line',
              'Your environment context — OS, stack, recent changes',
              'The name of the on-call engineer',
              'The full log file regardless of size',
            ],
            correct: 1,
            explanation: 'AI cannot see your environment. Providing OS version, application stack, and recent changes transforms a generic "here are some common causes" response into targeted, environment-relevant analysis.',
          },
        ],
        applyThisWeek: {
          action: 'Next time you encounter an error or alert, paste the relevant log to Claude before starting your usual investigation. Compare AI\'s probable causes to your own hypothesis.',
          promptTemplate: 'Analyse this error from my [application/service] and suggest the three most likely causes. Environment: [OS, version, stack, recent changes]. Error: [paste log]. What should I check first for each cause?',
          tool: 'Claude',
        },
      },
      {
        id: 'it-sysadmin-l4',
        title: 'Automating Repetitive Admin Tasks and Building Your Sysadmin AI Toolkit',
        duration: 17,
        description: 'Build a personal AI workflow that systematically removes the most repetitive parts of your job — and keeps improving over time.',
        content: `## The Repeatability Problem

Sysadmin work is full of tasks you do repeatedly: generating access reports, writing change request descriptions, summarising system health for management, drafting alert response procedures. These tasks are not complex, but they consume time that should go to higher-value work. AI handles all of them.

## Script Generation and Validation

AI is a strong partner for scripting tasks you know how to do but don\'t want to write from scratch:

\`\`\`
Prompt: Write a Python script that:
- Reads a list of hostnames from a CSV file
- SSHes to each host using paramiko
- Checks disk usage on / and /var
- Outputs a CSV report with hostname, / usage %, /var usage %
- Flags any host where either partition is above 80%

Handle SSH failures gracefully — log the error and continue to the next host.
\`\`\`

Always: read the output carefully, test in a non-production environment, validate against your actual filesystem layout.

## Recurring Communication Tasks

**Change request descriptions**: "Write a change request for [what you\'re doing]. Include: business justification, technical approach, risk assessment, rollback plan, testing steps."

**Management reports**: "Summarise these system health metrics for a non-technical audience. Highlight anything that needs attention and explain it in plain language."

**Ticket responses**: "Write a response to this user ticket. The issue was [X], the fix was [Y], they should [next steps]. Tone: helpful and clear."

## Building Your Prompt Library

The most valuable thing you can do after this lesson is build a personal prompt library — a simple document where you save prompts that worked well. Structure it by task type:

- Runbook generation
- Log analysis
- Script scaffolding
- Stakeholder communications
- Change request writing

Over 30 days, a good prompt library becomes a multiplier across your entire workflow.

## The Toolkit

For most sysadmin tasks, Claude handles long-form writing and log analysis best. For coding tasks, GitHub Copilot inside VS Code or a terminal-integrated tool reduces context-switching. ChatGPT works well for quick one-off questions. Pick one primary tool and build fluency before adding others.`,
        keyTakeaways: [
          'Script scaffolding removes the boilerplate burden — you focus on validation and environment-specific logic',
          'Recurring communications (change requests, management reports, ticket responses) are the fastest AI wins',
          'A personal prompt library compounds over time — save every prompt that saves you 10+ minutes',
          'Pick one primary AI tool and build fluency before expanding your toolkit',
        ],
        exercise: {
          title: 'Build Your First Prompt Library',
          description: 'Create a simple prompt library document with your five most valuable recurring sysadmin prompts.',
          steps: [
            'Open a new document in your preferred note-taking or wiki tool',
            'List five tasks you perform at least monthly that involve writing, documentation, or communication',
            'For each task, craft a reusable prompt template using Claude — test it on a real example',
            'Save each prompt under a task-type heading with a one-line description of when to use it',
            'Share the document with your team — a shared prompt library multiplies the value for everyone',
          ],
          tool: 'Claude',
        },
        quiz: [
          {
            question: 'You need to write a change request description for a scheduled maintenance window. What is the most efficient approach with AI?',
            options: [
              'Ask AI to write the entire change request without providing any context',
              'Provide AI with the technical details and ask it to produce a structured change request with business justification, risk assessment, and rollback plan',
              'Write the change request yourself — AI is not reliable for formal IT governance documents',
              'Use AI only for the rollback section, which is the hardest part to write',
            ],
            correct: 1,
            explanation: 'Change requests have a predictable structure. Providing AI with the technical details and asking for a complete structured output with all required sections produces a consistent, professional document in minutes.',
          },
          {
            question: 'What makes a prompt library valuable over time?',
            options: [
              'It stores AI\'s answers for future reuse',
              'It saves tested prompt templates that reliably produce good output for recurring tasks',
              'It prevents you from having to use AI for simple tasks',
              'It gives AI memory of your previous conversations',
            ],
            correct: 1,
            explanation: 'A prompt library saves the prompts — not the answers. A well-crafted prompt for a recurring task produces good output every time you run it, compounding the time saving across every future instance of that task.',
          },
          {
            question: 'You ask AI to write a Python script for log parsing. The script looks correct. What is the mandatory next step before using it?',
            options: [
              'Ask AI to review its own script for errors',
              'Test it in a non-production environment against real data',
              'Submit it to a code review tool for static analysis only',
              'Run it on one file first and assume it will work on all files',
            ],
            correct: 1,
            explanation: 'AI-generated scripts must be tested against your actual data in a safe environment. The script may handle the general case correctly but fail on your specific log format, encoding, or edge cases.',
          },
        ],
        applyThisWeek: {
          action: 'Save three prompts from your work this week that saved you time. Put them in a shared document with your team.',
          promptTemplate: 'Write a [document type: change request / management summary / incident report] for the following: [paste your technical details]. Audience: [who will read this]. Format: [required sections]. Tone: [professional / clear / concise].',
          tool: 'Claude',
        },
      },
    ],
  },

  'security': {
    title: 'AI for IT Security / SecOps',
    description: 'Four targeted lessons for security professionals using AI to accelerate threat triage, vulnerability analysis, and compliance documentation without creating new risks.',
    lessons: [
      {
        id: 'it-security-l1',
        title: 'AI for Security Professionals: Augmenting Your Threat Intelligence',
        duration: 17,
        description: 'Understand where AI genuinely helps in a security workflow — and where it introduces risk if used carelessly.',
        content: `## The Security Professional\'s Dilemma

You work in an environment where caution is not optional. Every tool you adopt is also a potential attack surface, every piece of data you share externally is a potential leak, and every automation that removes human judgment is a potential control gap. AI is no different — it must be evaluated with the same scrutiny you apply to any new tool.

That said, AI genuinely accelerates several critical SecOps tasks. Knowing which ones — and how to use AI without creating the risks you\'re paid to prevent — is what this track is about.

## Where AI Adds Real Value in Security

**Alert triage and classification.** The average SOC analyst reviews hundreds of alerts daily. AI can help classify alert priority and generate initial triage notes — keeping humans in the decision loop while reducing the cognitive load.

**CVE and threat intelligence summarisation.** AI can summarise lengthy CVE advisories, vendor bulletins, and threat intelligence reports into actionable summaries with clear business impact.

**Security documentation.** Incident reports, post-mortems, security awareness content, and policy documents all benefit from AI-assisted drafting.

**Playbook and runbook generation.** Structured incident response playbooks for common attack patterns (phishing, ransomware, account compromise) can be drafted in minutes and then validated by your team.

## The Critical Boundary: Data You Cannot Share

Never paste into a public AI tool:
- Live system logs containing IP addresses, hostnames, or user data
- Vulnerability scan results with asset inventories
- Incident data referencing real customer or employee information
- Internal security policies or architecture diagrams

Use anonymised or synthetic examples. If your organisation has a private AI deployment (Azure OpenAI, AWS Bedrock, self-hosted), use that for security work.

## The Right Starting Point

Start with documentation tasks: summarising CVEs, writing security awareness content, drafting incident response templates. These are high-value, low-risk AI applications that build your confidence with the tool before moving to more sensitive workflows.`,
        keyTakeaways: [
          'AI accelerates alert triage, CVE summarisation, and security documentation — with human oversight retained',
          'Never paste real system logs, asset inventories, or incident data into public AI tools',
          'Start with documentation tasks (CVE summaries, awareness content, playbooks) before moving to more sensitive workflows',
          'If your organisation has a private AI deployment, use it for security work — not public tools',
        ],
        exercise: {
          title: 'CVE Summary and Impact Assessment',
          description: 'Practice using AI to turn a technical CVE advisory into a clear, actionable summary for your team.',
          steps: [
            'Find a recently published CVE that affects technology in your environment (check NVD, vendor advisories, or CISA KEV)',
            'Open Claude and paste the CVE description (the public advisory text — no internal data)',
            'Ask: "Summarise this CVE for a mixed technical/management audience. Include: what it affects, severity, attack conditions, business impact, and recommended action with urgency rating."',
            'Review the output — check whether the severity assessment matches the CVSS score and your environment\'s exposure',
            'Edit for your specific environment context and share with your team',
          ],
          tool: 'Claude',
        },
        quiz: [
          {
            question: 'A SOC analyst wants to use AI to help triage alerts faster. What is the appropriate model?',
            options: [
              'Let AI automatically close low-priority alerts to reduce analyst workload',
              'Use AI to classify and generate initial triage notes for analyst review — human makes all response decisions',
              'Use AI to decide which alerts to escalate to incident status',
              'Feed all raw SIEM data to a public AI tool for real-time analysis',
            ],
            correct: 1,
            explanation: 'AI as a classification and note-generation layer keeps humans in the response loop while reducing cognitive load. Autonomous alert closure or escalation decisions remove the human control that security workflows require.',
          },
          {
            question: 'Which of the following is safe to paste into a public AI tool for security work?',
            options: [
              'A live firewall log with internal IP addresses',
              'The public text of a CVE advisory from the NVD',
              'A vulnerability scan report with your asset inventory',
              'An incident report referencing specific user accounts',
            ],
            correct: 1,
            explanation: 'Publicly available CVE text from the NVD contains no sensitive information about your environment. All other options contain internal data that should never be shared with a public AI service.',
          },
          {
            question: 'What is the best first use of AI for a security professional who is new to the tool?',
            options: [
              'Automating alert triage responses',
              'Writing security awareness training content and CVE summaries',
              'Generating penetration test reports from scan outputs',
              'Analysing live network traffic patterns',
            ],
            correct: 1,
            explanation: 'Security awareness content and CVE summaries use only public information, require no sensitive data, and produce immediate value. This makes them the lowest-risk, highest-confidence starting point for AI adoption in security.',
          },
        ],
        applyThisWeek: {
          action: 'Use AI to summarise the three most relevant CVEs published this week for your environment. Share the summaries with your team as a test of AI-assisted threat intelligence briefing.',
          promptTemplate: 'Summarise this CVE for a technical security audience. Include: affected systems and versions, attack vector and conditions, severity and exploitability, business impact, recommended action, and urgency (patch immediately / patch in next cycle / monitor). CVE text: [paste advisory]',
          tool: 'Claude',
        },
      },
      {
        id: 'it-security-l2',
        title: 'Alert Triage, Threat Classification, and Incident Response with AI',
        duration: 18,
        description: 'Use AI to reduce alert fatigue and produce faster, better-structured incident response — while keeping human judgment in the loop.',
        content: `## Alert Fatigue Is a Security Problem

When analysts are overwhelmed by volume, true positives get missed. AI doesn\'t replace the analyst — it handles the classification and note-generation work that consumes time before any real analysis begins.

## Triage Note Generation

For each alert your SIEM surfaces, you need to decide: investigate, escalate, or close? AI can help generate structured triage notes from alert metadata — but the metadata must be anonymised before it touches a public tool.

\`\`\`
Prompt (using anonymised/synthetic data):
Alert type: Failed authentication — 47 attempts in 3 minutes
Source: external IP (anonymised as EXTERNAL_IP_1)
Target: VPN gateway
Time: 02:14 UTC
Recent context: no travel alerts, no known maintenance

Generate a structured triage note including: alert classification,
probable scenario, recommended first investigation step, and priority (P1/P2/P3).
\`\`\`

## Incident Response Playbook Generation

For common attack patterns, AI can produce first-draft playbooks your team can validate and refine:

\`\`\`
Prompt: Write an incident response playbook for a suspected Business Email
Compromise (BEC) attack. Include: detection indicators, immediate containment steps,
evidence collection, stakeholder notification, recovery steps, and post-incident review.
Format: numbered steps with responsible roles noted.
\`\`\`

This is faster than writing from scratch and gives your team a structured baseline to work from.

## AI-Assisted Threat Hunting Queries

If your SIEM uses a query language (Splunk SPL, KQL for Sentinel, EQL for Elastic), AI can help construct queries for known threat patterns:

\`\`\`
Prompt: Write a KQL query for Microsoft Sentinel to detect potential
lateral movement via SMB. Look for: rapid sequential authentication events
from a single source to multiple internal hosts within a 10-minute window.
\`\`\`

Always validate generated queries in a test environment before running in production.

## The Human Control Boundary

AI must not make response decisions. It should generate options, summaries, and drafts. Contain, escalate, notify, and close decisions stay with the analyst.`,
        keyTakeaways: [
          'AI generates structured triage notes from anonymised alert metadata — analyst makes all response decisions',
          'Common attack pattern playbooks (BEC, ransomware, account compromise) can be drafted by AI and validated by your team',
          'SIEM query construction for known threat patterns is a high-value AI use case — always validate before production use',
          'AI must not make response, containment, or escalation decisions — those require human judgment',
        ],
        exercise: {
          title: 'Playbook First Draft',
          description: 'Use AI to produce a first-draft incident response playbook for a common attack pattern in your environment.',
          steps: [
            'Identify the most common or most feared attack pattern in your environment (phishing, ransomware, insider threat, account compromise)',
            'Open Claude and ask it to write a full incident response playbook for that scenario — include detection, containment, evidence collection, notification, recovery, and post-incident review',
            'Review the output against your organisation\'s actual response capabilities and tooling',
            'Mark any steps that require tool-specific instructions your team uses (e.g., "isolate in CrowdStrike" rather than generic "isolate endpoint")',
            'Edit and save the playbook — this is your validated starting point',
          ],
          tool: 'Claude',
        },
        quiz: [
          {
            question: 'You want to use AI to help triage SIEM alerts. What must you do before pasting alert data into a public AI tool?',
            options: [
              'Nothing — SIEM alerts are not considered sensitive data',
              'Anonymise all identifying information: IPs, hostnames, usernames, and internal identifiers',
              'Only paste alerts that are already classified as low severity',
              'Get written approval from your CISO for each alert you share',
            ],
            correct: 1,
            explanation: 'SIEM alerts contain sensitive internal data — IP addresses, hostnames, and usernames can reveal your network topology and user identities. Anonymise all identifying information before pasting into any public AI tool.',
          },
          {
            question: 'AI generates a KQL query for threat hunting in your Sentinel environment. What is the correct next step?',
            options: [
              'Run it in production — AI-generated queries are safe to execute',
              'Test it in a development or non-production Sentinel workspace first',
              'Submit it to Microsoft for validation before running',
              'Run it during a low-traffic period to minimise impact',
            ],
            correct: 1,
            explanation: 'AI-generated SIEM queries must be tested in a safe environment. A malformed query can return misleading results, cause performance issues, or in worst cases trigger unintended actions in security tooling.',
          },
          {
            question: 'What is the correct role of AI in an incident response workflow?',
            options: [
              'AI should automatically contain affected systems to minimise response time',
              'AI drafts response options and generates documentation — humans make all action decisions',
              'AI decides which incidents to escalate based on severity scoring',
              'AI is too risky to use during an active incident',
            ],
            correct: 1,
            explanation: 'AI is a drafting and analysis tool in incident response — it generates options, structures information, and produces documentation. All containment, escalation, and notification decisions must remain with human analysts.',
          },
        ],
        applyThisWeek: {
          action: 'Write one incident response playbook for a common attack scenario using AI as your first-draft engine. Have a colleague validate it.',
          promptTemplate: 'Write a detailed incident response playbook for [attack scenario]. Include: detection indicators and data sources, immediate containment steps (with responsible role), evidence to collect and how, stakeholder notification procedure, recovery steps, post-incident review checklist. Format: numbered steps, sub-steps where needed.',
          tool: 'Claude',
        },
      },
      {
        id: 'it-security-l3',
        title: 'Vulnerability Assessment, CVE Analysis, and Security Documentation with AI',
        duration: 16,
        description: 'Use AI to accelerate vulnerability prioritisation, produce better security reports, and write technical documentation that non-technical stakeholders can actually understand.',
        content: `## From Scan Output to Actionable Priority

Vulnerability scanners produce lists. What your stakeholders need is prioritised action plans with business context. AI bridges that gap — but you supply the risk context; AI supplies the structure and language.

## CVE Prioritisation Framework with AI

When a CVE affects your environment, prioritisation depends on three factors the scanner doesn\'t know: your exposure (internet-facing vs. internal), compensating controls in place, and business criticality of the affected system.

\`\`\`
Prompt: Help me prioritise this CVE for our environment.
CVE summary: [paste public CVE text — no internal data]
Our context:
- Affected system: internal application server (not internet-facing)
- Compensating control: WAF in place for this application
- Business criticality: medium — used by finance team, not customer-facing
- Current patch cycle: monthly

Given this context, provide: recommended priority tier (immediate / next patch cycle / monitor),
rationale, and any additional mitigations to consider while patch is pending.
\`\`\`

## Vulnerability Report Writing

Translating scan findings into a readable report for management is time-consuming. AI drafts the narrative from your structured data:

\`\`\`
Prompt: Write an executive summary of our monthly vulnerability scan results
for a non-technical audience.
Key data: [paste anonymised summary — no asset names or IPs]
- 3 critical CVEs (all patched this cycle)
- 12 high CVEs (8 patched, 4 in progress)
- 47 medium CVEs (on next patch cycle schedule)
Tone: factual, reassuring where appropriate, clear on action items remaining.
\`\`\`

## Security Awareness Content

Security awareness training content is repetitive to produce and often generic when outsourced. AI can produce phishing scenario training emails, security tips for company newsletters, and policy reminder communications that are specific to your organisation\'s context.

## Penetration Test Report Sections

If you run internal penetration tests, AI can help structure finding descriptions:

\`\`\`
Prompt: Write a penetration test finding for a vulnerability report.
Vulnerability: SQL injection on the /search endpoint
Risk: attacker can extract database contents
Steps to reproduce: [your technical steps]
Impact: exposure of [anonymised description]
Remediation: parameterised queries
Format: finding title, severity, description, steps to reproduce, business impact, remediation recommendation.
\`\`\``,
        keyTakeaways: [
          'CVE prioritisation requires business context AI doesn\'t have — you supply exposure, controls, and criticality; AI structures the recommendation',
          'AI translates scan results into readable executive summaries without requiring management to interpret raw scanner output',
          'Security awareness content is faster to produce and easier to customise with AI assistance',
          'Never include real asset names, IP addresses, or internal identifiers in public AI prompts',
        ],
        exercise: {
          title: 'Executive Vulnerability Summary',
          description: 'Turn a recent scan summary into a clean executive report using AI — in under 15 minutes.',
          steps: [
            'Take your most recent vulnerability scan results and extract an anonymised summary (counts by severity, patch status) — no hostnames, IPs, or asset names',
            'Open Claude and paste the anonymised summary with this prompt: "Write a 200-word executive summary of these scan results for a non-technical audience. Include: overall posture, what was found, what has been addressed, what remains, and any items requiring immediate attention."',
            'Review the output for accuracy against your actual data',
            'Add one sentence of business context that AI cannot know (e.g., "This covers the period leading up to our annual audit")',
            'Save as your monthly reporting template',
          ],
          tool: 'Claude',
        },
        quiz: [
          {
            question: 'You are prioritising a critical CVE. Your vulnerability scanner says it\'s critical. What additional context does AI need from you to give a useful prioritisation recommendation?',
            options: [
              'The CVE\'s CVSS score — AI needs this to assess severity',
              'Your system\'s exposure (internet-facing?), compensating controls, and business criticality of the affected system',
              'The date the CVE was published and whether a public exploit exists',
              'The name of your vulnerability scanner',
            ],
            correct: 1,
            explanation: 'The CVSS score is already in the CVE advisory. What AI needs from you is the environmental context it cannot see: whether the affected system is exposed to the internet, what compensating controls are in place, and how critical the system is to your business.',
          },
          {
            question: 'You want to use AI to write security awareness training content. What makes the content most effective?',
            options: [
              'Using the most technical language possible to ensure accuracy',
              'Providing AI with your organisation\'s specific context, common attack scenarios your users face, and the tone your culture responds to',
              'Asking AI to use generic industry examples so the content applies broadly',
              'Limiting content to official vendor guidance only',
            ],
            correct: 1,
            explanation: 'Generic security awareness content is ineffective because it doesn\'t connect to users\' actual work. Providing AI with your organisation\'s specific context and the scenarios your users actually encounter produces training that people pay attention to.',
          },
          {
            question: 'When writing a penetration test finding with AI, what must you ensure about the data you provide?',
            options: [
              'Include full system names so AI can provide accurate remediation steps',
              'Anonymise all internal identifiers — use generic descriptions like "the search endpoint" rather than actual URLs or system names',
              'Only use AI for medium and low severity findings — write critical findings manually',
              'Provide the client\'s name so AI can personalise the report',
            ],
            correct: 1,
            explanation: 'Real system names, internal URLs, and client identifiers are sensitive data that should never appear in public AI tools. Use generic descriptions for all internal identifiers — the finding structure and narrative quality are not affected by anonymisation.',
          },
        ],
        applyThisWeek: {
          action: 'Take your most recent vulnerability scan results, create an anonymised summary, and use AI to produce an executive-ready report. Compare it to what you would have written manually.',
          promptTemplate: 'Write an executive summary of these vulnerability scan results for a non-technical leadership audience. Findings (anonymised): [paste counts and categories]. Include: overall security posture assessment, what was found and addressed, outstanding items and timeline, any items needing immediate attention. Tone: factual and clear, no jargon.',
          tool: 'Claude',
        },
      },
      {
        id: 'it-security-l4',
        title: 'Compliance Reporting, Security Awareness, and Team Communication with AI',
        duration: 16,
        description: 'Use AI to reduce the documentation burden of compliance, produce security awareness content that actually lands, and communicate risk clearly to leadership.',
        content: `## The Documentation Tax of Security Work

For every hour you spend on security controls, you spend another hour documenting them for auditors, writing evidence for frameworks, and explaining risk to people who don\'t share your technical context. AI compresses the documentation half of your job without compromising the judgment half.

## Compliance Evidence and Control Documentation

When auditors ask for evidence that a control is in place, you need clear, structured documentation. AI helps you produce it from your technical notes:

\`\`\`
Prompt: Write control documentation for an auditor demonstrating our implementation
of access review controls.
Context: we perform quarterly access reviews using [tool name],
review is approved by system owners, results are stored in [system].
Framework: ISO 27001 / SOC 2 (choose relevant one).
Include: control objective, implementation description, frequency, evidence available,
responsible owner.
\`\`\`

## Risk Communication to Leadership

The most important security communication is translating technical risk into business impact. AI helps you write risk briefings that leadership understands:

\`\`\`
Prompt: Write a one-page risk briefing for our leadership team on the business
impact of unpatched systems.
Context: we currently have 4 high-severity CVEs unpatched due to change freeze.
Audience: non-technical CEO and CFO.
Include: business risk in plain language, likelihood and impact, what we\'re doing
about it, what we need from leadership (decision or approval).
Tone: clear and direct, not alarmist.
\`\`\`

## Security Awareness Content at Scale

Phishing simulation follow-up emails, monthly security tips, new joiner security briefings — all of these are repetitive to write and benefit from AI:

- Phishing training email after a failed simulation: "Write a coaching email for an employee who clicked a phishing simulation link. Tone: educational not punitive. Include: what they clicked, why it was suspicious, what to do next time."
- Monthly security tip: specific to a recent threat trend in your sector

## Building a Security Communication Library

Over time, build a library of prompts for your recurring communication tasks. Every compliance framework has predictable documentation needs — prompts for each control type save you hours at audit time.`,
        keyTakeaways: [
          'AI compresses control documentation and compliance evidence writing without replacing the judgment about what controls exist',
          'Risk communication to leadership is most effective when AI helps translate technical risk into business impact language',
          'Security awareness content is faster to produce and more contextual when AI is given your organisation\'s specific scenarios',
          'A compliance prompt library for recurring documentation needs saves significant time at audit time',
        ],
        exercise: {
          title: 'Risk Briefing for Leadership',
          description: 'Write a one-page risk briefing for a non-technical audience using AI — on a real security topic from your environment.',
          steps: [
            'Identify a current security risk or outstanding vulnerability in your environment that leadership should know about',
            'Describe the technical details to Claude and ask it to write a one-page risk briefing for a non-technical audience',
            'Specify: audience (CEO/CFO/board), what decision or awareness you need from them, and the tone (factual, not alarmist)',
            'Review the output — ensure it accurately represents the risk without technical jargon',
            'Share with a trusted colleague to check whether the risk is communicated clearly',
          ],
          tool: 'Claude',
        },
        quiz: [
          {
            question: 'You need to produce evidence for an ISO 27001 audit on your access review control. What is the most efficient approach with AI?',
            options: [
              'Ask AI to generate the evidence on your behalf',
              'Describe your actual control implementation to AI and ask it to structure the evidence documentation in the required format',
              'Use AI to review your auditor\'s requirements and tell you what evidence to collect',
              'AI cannot be used for compliance documentation — auditors require human-authored content',
            ],
            correct: 1,
            explanation: 'AI structures your description of actual controls into audit-ready documentation. You provide the facts about what you actually do; AI provides the structure and formal language that auditors expect. The evidence still reflects your real controls.',
          },
          {
            question: 'Your leadership team is not technical. You need to explain why a critical patch cannot wait for the next maintenance window. What should your AI-assisted briefing emphasise?',
            options: [
              'The CVSS score and CVE details so they understand the severity',
              'The business risk in plain language — what could happen to the business if this is exploited',
              'The technical remediation steps so they can make an informed decision',
              'The cost of patching versus the cost of a breach',
            ],
            correct: 1,
            explanation: 'Non-technical leadership needs business impact, not technical detail. What could be compromised, what that means for customers or operations, and what decision you need from them — that is the communication that gets action.',
          },
          {
            question: 'What makes a phishing simulation follow-up email most effective when written with AI?',
            options: [
              'It should be firm and make clear the employee made a serious error',
              'It should be educational and specific to what the employee clicked, explaining why it was suspicious',
              'It should be generic so it applies to all phishing scenarios in future training',
              'It should be written entirely by AI without personalisation to save time',
            ],
            correct: 1,
            explanation: 'Effective security awareness training is specific and educational, not punitive. An email that explains exactly what made the simulation suspicious — and what to look for next time — creates lasting behaviour change. Generic content does not.',
          },
        ],
        applyThisWeek: {
          action: 'Write one piece of compliance documentation or one security risk briefing using AI this week. Measure the time saved versus writing it manually.',
          promptTemplate: 'Write [document type: control documentation / risk briefing / security awareness email] for [audience]. Context: [your specific situation]. Include: [required sections]. Tone: [professional / educational / clear and non-technical]. Avoid jargon — assume the audience is [technical / non-technical].',
          tool: 'Claude',
        },
      },
    ],
  },

  'devops': {
    title: 'AI for DevOps / Cloud Engineers',
    description: 'Four practical lessons for DevOps and cloud engineers using AI to write IaC faster, optimise pipelines, analyse cloud costs, and produce better incident documentation.',
    lessons: [
      {
        id: 'it-devops-l1',
        title: 'AI for DevOps and Cloud Engineers',
        duration: 16,
        description: 'Map the specific DevOps and cloud engineering tasks where AI accelerates your work — and the ones where it needs careful validation.',
        content: `## The DevOps Workflow and Where AI Fits

Your work spans infrastructure provisioning, CI/CD pipeline management, cloud cost control, incident response, and an endless stream of documentation that nobody has time to write. AI doesn\'t understand your specific environment, but it is remarkably good at generating the boilerplate and structure that consumes your time before the real work starts.

## High-Value AI Use Cases for DevOps

**Infrastructure as Code scaffolding.** Terraform, CloudFormation, Pulumi, Ansible — AI can generate first-draft configurations for common resource patterns. You validate, adapt to your naming conventions and security requirements, and ship.

**CI/CD pipeline configuration.** GitHub Actions, GitLab CI, Jenkins — AI knows the syntax and common patterns. Describe what your pipeline needs to do and get a working first draft.

**Cloud cost analysis narrative.** You have the data. AI helps you write the explanation: what drove the cost change, what the trend means, what action is recommended.

**Post-mortem writing.** After an incident, paste your timeline notes and ask AI to structure a post-mortem report. This turns a 2-hour task into a 20-minute editing session.

**Documentation.** Architecture decision records (ADRs), runbooks, deployment guides — AI drafts, you validate.

## The Validation Requirement

AI-generated IaC and pipeline configuration must always be reviewed and tested in a non-production environment before deployment. Common failure modes:
- Outdated syntax for a specific provider version
- Missing resource dependencies
- Incorrect IAM permissions (typically too permissive)
- Region-specific or account-specific settings that AI cannot know

## Starting Point

The highest-impact starting point is usually IaC scaffolding — the first draft of a Terraform module or CloudFormation template. The boilerplate is predictable; the environment-specific customisation is where your expertise adds value.`,
        keyTakeaways: [
          'IaC scaffolding, pipeline configuration, and post-mortem writing are the highest-value DevOps AI use cases',
          'AI-generated IaC must always be reviewed and tested in a non-production environment before deployment',
          'Common AI failure modes in IaC: outdated syntax, missing dependencies, overly permissive IAM policies',
          'Documentation (ADRs, runbooks, deployment guides) is a fast win — AI drafts, you validate',
        ],
        exercise: {
          title: 'IaC First Draft',
          description: 'Use AI to generate a Terraform or CloudFormation first draft for a resource you commonly provision.',
          steps: [
            'Identify a cloud resource you provision repeatedly (S3 bucket with specific policies, EC2 instance, RDS cluster, etc.)',
            'Open Claude and describe the resource with all requirements: region, sizing, naming convention, tags, security requirements, access policies',
            'Ask for a complete Terraform module (or CloudFormation template) with variables, outputs, and inline comments',
            'Review the output against your organisation\'s standards — check IAM permissions especially (tighten as needed)',
            'Test in a dev environment before adding to your module library',
          ],
          tool: 'Claude',
        },
        quiz: [
          {
            question: 'You ask AI to write a Terraform module for an S3 bucket. The output includes a bucket policy. What should you check first?',
            options: [
              'Whether the bucket name follows your naming convention',
              'Whether the IAM permissions in the bucket policy follow least-privilege — AI tends to be overly permissive',
              'Whether the region is set correctly',
              'Whether the module uses the latest Terraform syntax',
            ],
            correct: 1,
            explanation: 'AI-generated IAM policies frequently include broader permissions than necessary — it\'s the most common security issue in AI-generated IaC. Always review and tighten permissions to least-privilege before deploying.',
          },
          {
            question: 'Which of the following post-mortem sections benefits most from AI assistance?',
            options: [
              'The root cause determination — AI can analyse what went wrong',
              'Structuring the timeline and producing the narrative from your rough notes',
              'The action items — AI can determine what needs to change',
              'The severity classification',
            ],
            correct: 1,
            explanation: 'You determine root cause and action items — those require your knowledge of the system and the incident. AI\'s value is turning your rough timeline notes into a structured, readable narrative, which is the most time-consuming writing task in a post-mortem.',
          },
          {
            question: 'What is the correct environment for testing AI-generated CI/CD pipeline configuration?',
            options: [
              'Production — pipeline errors are usually non-destructive',
              'A non-production branch or environment where a failed pipeline has no impact on live systems',
              'Any branch — CI/CD configuration errors are caught by linting before execution',
              'AI-generated pipeline config does not need testing if the syntax validates',
            ],
            correct: 1,
            explanation: 'Pipeline syntax validation only catches syntax errors — not logical errors, missing secrets, incorrect permissions, or environment-specific issues. Always test in a non-production environment or branch where a failure has no downstream impact.',
          },
        ],
        applyThisWeek: {
          action: 'Use AI to scaffold the next IaC module or pipeline configuration you need to write. Measure the time from prompt to tested first draft.',
          promptTemplate: 'Write a [Terraform module / CloudFormation template / GitHub Actions workflow] that [describe what it does]. Requirements: [list your specific requirements including naming, tags, region, access controls]. Include variables, outputs, and inline comments explaining non-obvious decisions.',
          tool: 'Claude',
        },
      },
      {
        id: 'it-devops-l2',
        title: 'Infrastructure-as-Code, Configuration, and Cloud Resource Management with AI',
        duration: 18,
        description: 'Use AI to write, review, and improve IaC and configuration management code — faster and with fewer errors than starting from scratch.',
        content: `## IaC Is Ideal for AI Assistance

Infrastructure as Code has predictable patterns, well-documented APIs, and a huge training corpus in AI models. This makes it one of the best use cases for AI assistance in a technical role. The patterns are known; the environment-specific customisation is where your expertise matters.

## Terraform Module Generation

For common resource patterns, AI can produce a complete module in one prompt:

\`\`\`
Prompt: Write a Terraform module for an AWS RDS PostgreSQL instance that:
- Uses the latest supported PostgreSQL version
- Deploys in a private subnet (subnet IDs passed as variable)
- Has a security group that allows inbound on port 5432 from a specified CIDR variable
- Enables encrypted storage with a KMS key (key ARN passed as variable)
- Creates automated backups with 7-day retention
- Outputs the endpoint, port, and security group ID
- Uses standard tags: Environment, Owner, Project (passed as variables)

Include: main.tf, variables.tf, outputs.tf. Add inline comments for non-obvious settings.
\`\`\`

Review focus: IAM permissions, encryption settings, subnet and VPC references, provider version compatibility.

## Ansible and Configuration Management

AI generates Ansible playbooks and roles from task descriptions:

\`\`\`
Prompt: Write an Ansible playbook to configure a new Ubuntu 22.04 server:
- Install and configure nginx as a reverse proxy to localhost:3000
- Set up Let\'s Encrypt certificate using certbot
- Configure UFW to allow only ports 80, 443, and 22
- Set up log rotation for nginx logs
- Enable and configure fail2ban for SSH protection

Include handlers for service restarts. Use become: yes where needed.
\`\`\`

## Reviewing Existing IaC

AI is also useful for reviewing code you\'ve already written:

\`\`\`
Prompt: Review this Terraform configuration for security issues,
missing best practices, and potential cost issues.
[paste your Terraform — anonymise account IDs and sensitive values]
\`\`\`

## Naming and Tagging Convention Generation

One of the most useful and underused AI applications in cloud engineering: ask AI to design or validate your resource naming and tagging strategy:

\`\`\`
Prompt: Design a resource naming convention for AWS resources across
Development, Staging, and Production environments. Resources: EC2, RDS, S3,
Lambda. Constraints: must be lowercase, max 63 characters, no spaces.
Include a tagging strategy for cost allocation and environment identification.
\`\`\``,
        keyTakeaways: [
          'Full Terraform modules (main, variables, outputs) can be generated from a detailed prompt — review IAM and encryption carefully',
          'Ansible playbooks benefit from AI scaffolding — handlers, become, and package management patterns are predictable',
          'AI can review your existing IaC for security issues and missing best practices',
          'Naming and tagging convention design is an underused AI use case that pays dividends across the entire environment',
        ],
        exercise: {
          title: 'IaC Security Review',
          description: 'Use AI to review an existing piece of IaC or configuration for security issues and improvement opportunities.',
          steps: [
            'Choose a Terraform module, CloudFormation template, or Ansible playbook from your codebase',
            'Anonymise all sensitive values: account IDs, ARNs, IP addresses, secret names',
            'Paste into Claude with this prompt: "Review this IaC for: security issues (especially IAM permissions and encryption), missing best practices for [provider], potential cost inefficiencies, and anything that would fail a security audit."',
            'Review each flagged issue — determine which are valid for your environment',
            'Create a prioritised list of improvements and address at least one before your next deployment',
          ],
          tool: 'Claude',
        },
        quiz: [
          {
            question: 'You use AI to generate a Terraform module and notice it created an IAM role with `*` actions. What is the correct response?',
            options: [
              'This is acceptable — Terraform manages IAM separately from the resource',
              'Replace the wildcard with the specific actions the role actually needs — apply least privilege',
              'Add a condition to the policy to restrict the scope of the wildcard',
              'Only change it if the resource is internet-facing',
            ],
            correct: 1,
            explanation: 'Wildcard IAM actions (`*`) violate least-privilege and will fail most security audits. Always replace wildcards with the specific actions the role requires. AI generates broad permissions because it doesn\'t know your specific use case.',
          },
          {
            question: 'You paste an Ansible playbook to AI for review and it suggests adding `no_log: true` to a task. When is this correct?',
            options: [
              'Always — logging should be disabled for all Ansible tasks',
              'When the task handles sensitive values like passwords or API keys that should not appear in logs',
              'Only for tasks that run with `become: yes`',
              'Never — logging is required for audit compliance',
            ],
            correct: 1,
            explanation: '`no_log: true` suppresses task output from Ansible logs — correct for tasks that handle passwords, API keys, or other secrets. Using it universally removes the diagnostic value of logs; using it where secrets are handled is a security best practice.',
          },
          {
            question: 'What is the most important thing to anonymise before pasting IaC to a public AI tool for review?',
            options: [
              'Resource type names and provider versions',
              'Account IDs, ARNs, IP addresses, secret references, and any value specific to your environment',
              'Variable names and output names',
              'Comments and inline documentation',
            ],
            correct: 1,
            explanation: 'Account IDs, ARNs, internal IP ranges, and references to secrets are sensitive identifiers. Pasting them into a public AI tool exposes your environment structure. Replace with placeholder values — the review quality is not affected.',
          },
        ],
        applyThisWeek: {
          action: 'Generate a Terraform module or Ansible playbook for a resource you provision manually today. Test in a dev environment and add it to your module library.',
          promptTemplate: 'Write a [Terraform module / Ansible playbook / CloudFormation template] for [resource/task]. Requirements: [detailed list]. Security requirements: [encryption, IAM, network constraints]. Include [variables.tf and outputs.tf / handlers / parameters section]. Add inline comments for non-obvious settings.',
          tool: 'Claude',
        },
      },
      {
        id: 'it-devops-l3',
        title: 'CI/CD Pipeline Optimization, Incident Management, and Post-Mortems with AI',
        duration: 17,
        description: 'Use AI to write and improve pipeline configuration, accelerate incident diagnosis, and produce post-mortems that drive real improvement.',
        content: `## Pipeline Configuration: Pattern Recognition at Scale

GitHub Actions, GitLab CI, Jenkins, CircleCI — each has its own syntax, but the patterns are well-documented and AI knows them. The time you spend wrestling with YAML syntax and workflow triggers is time AI can save.

## GitHub Actions Workflow Generation

\`\`\`
Prompt: Write a GitHub Actions workflow for a Node.js application that:
- Triggers on push to main and on pull requests to main
- Runs on ubuntu-latest
- Steps: checkout, setup Node 20, install dependencies (npm ci),
  run lint, run tests with coverage, build
- On push to main only: deploy to AWS ECS using the task definition in .aws/task-definition.json
- Uses secrets: AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION
- Caches node_modules between runs

Include error handling — fail fast on lint or test failures.
\`\`\`

## Pipeline Performance Analysis

Paste your pipeline configuration and recent run times and ask AI to identify optimisation opportunities:

\`\`\`
Prompt: Analyse this GitHub Actions workflow for performance optimisation opportunities.
Current average runtime: 18 minutes.
[paste your workflow YAML]
Identify: steps that can be parallelised, caching opportunities,
unnecessary steps, and any other improvements that would reduce runtime.
\`\`\`

## Incident Management with AI

During an incident, AI helps with two things you don\'t have time for: structuring your investigation and drafting stakeholder communications.

For investigation structure:
\`\`\`
Prompt: I\'m investigating a production incident. Here\'s what I know so far:
[anonymised description of symptoms and affected systems]
What are the most likely causes given these symptoms?
What should I check in what order?
\`\`\`

## Post-Mortem Writing

After the incident, paste your timeline notes:

\`\`\`
Prompt: Write a post-mortem report from these incident notes.
Format: incident summary, timeline, root cause, contributing factors,
impact (use the numbers I provide), immediate fix, permanent fix,
lessons learned, action items with owners and due dates.
Notes: [paste your raw timeline]
\`\`\`

The result is a structured post-mortem in draft form that you edit and validate — not write from scratch.`,
        keyTakeaways: [
          'Full CI/CD pipeline configurations can be generated from a detailed description — validate secrets handling and permissions carefully',
          'Pipeline optimisation (parallelisation, caching, step elimination) can be analysed by AI given your current workflow YAML',
          'During incidents, AI helps structure investigation hypotheses and draft stakeholder communications simultaneously',
          'Post-mortem writing from raw timeline notes is one of the highest time-saving DevOps AI applications',
        ],
        exercise: {
          title: 'Post-Mortem from Raw Notes',
          description: 'Take notes from a recent incident (or a practice scenario) and use AI to produce a structured post-mortem report.',
          steps: [
            'Find notes from a recent incident or create a realistic scenario: symptoms noticed, investigation steps, root cause found, fix applied, resolution time',
            'Anonymise any sensitive system names or customer-identifying information',
            'Paste to Claude with this prompt: "Write a post-mortem report from these notes. Include: incident summary, timeline, root cause, contributing factors, business impact, immediate fix, permanent fix, lessons learned, action items with placeholder owners."',
            'Review the output — correct any inaccuracies in the cause or impact',
            'Add the specific action item owners and due dates',
          ],
          tool: 'Claude',
        },
        quiz: [
          {
            question: 'You ask AI to write a GitHub Actions workflow that deploys to production. What must you verify specifically about the generated secrets handling?',
            options: [
              'That secret names match exactly what you have configured in your repository secrets',
              'That the workflow uses `env` rather than `secrets` for all variables',
              'That all secrets are echoed to the log for debugging purposes',
              'That secrets are hardcoded for reliability',
            ],
            correct: 0,
            explanation: 'AI generates secret references based on your description, but the names must match exactly what you\'ve configured in your GitHub repository or organisation secrets. A mismatch causes silent failures where the secret value is empty.',
          },
          {
            question: 'Your CI/CD pipeline takes 22 minutes to run. AI suggests parallelising two jobs that currently run sequentially. What should you check before implementing?',
            options: [
              'Whether the CI/CD platform supports parallel jobs',
              'Whether the two jobs have dependencies on each other\'s outputs',
              'Whether the jobs use the same runner',
              'Whether parallelisation will increase cost',
            ],
            correct: 1,
            explanation: 'Jobs can only be parallelised if they are truly independent — no outputs from Job A should be inputs to Job B. Running dependent jobs in parallel causes failures when the dependency is missing. Check the job dependency graph before restructuring.',
          },
          {
            question: 'What is the most time-consuming part of writing a post-mortem that AI most effectively replaces?',
            options: [
              'Determining the root cause',
              'Identifying action items and owners',
              'Structuring raw incident notes into a coherent narrative with the correct sections',
              'Calculating the business impact',
            ],
            correct: 2,
            explanation: 'Root cause, action items, and impact numbers require your knowledge of the incident and system. The time-consuming part AI replaces is structuring disorganised notes into a clear, professional narrative with all required sections — turning 2 hours of writing into 20 minutes of editing.',
          },
        ],
        applyThisWeek: {
          action: 'Take your current slowest CI/CD pipeline and ask AI to analyse it for optimisation opportunities. Implement the one change that looks safest and measure the impact.',
          promptTemplate: 'Analyse this [GitHub Actions / GitLab CI / Jenkins] workflow for performance optimisation. Current runtime: [X] minutes. [paste workflow]. Identify: parallelisation opportunities, caching gaps, unnecessary steps, and any other improvements. Prioritise by estimated time saving.',
          tool: 'Claude',
        },
      },
      {
        id: 'it-devops-l4',
        title: 'Cloud Cost Analysis, Capacity Planning, and Documentation with AI',
        duration: 16,
        description: 'Use AI to turn cost data into actionable narratives, support capacity planning decisions, and produce the documentation your team actually needs.',
        content: `## Cloud Cost: From Data to Decision

Your cloud billing console gives you numbers. Leadership needs to understand what drove costs, what trend they\'re looking at, and what decision is needed. AI bridges the gap between your data and their understanding.

## Cost Analysis Narrative

\`\`\`
Prompt: Write a cloud cost analysis for our engineering leadership team.
Month: May vs April
Data (anonymised):
- Total AWS spend: $47,200 (+12% MoM)
- EC2: $28,000 (+18%) — driven by new staging environment provisioned 2 May
- RDS: $9,500 (+3%) — normal growth
- Data transfer: $6,200 (+35%) — spike around 15-17 May, under investigation
- S3: $3,500 (+2%) — normal growth

Include: what drove the change, what is expected vs. unexpected,
recommended actions, items needing investigation.
Audience: non-technical engineering VP.
\`\`\`

## Capacity Planning Documents

When planning infrastructure changes, AI can help structure the analysis:

\`\`\`
Prompt: Write a capacity planning document for adding a new microservice
to our Kubernetes cluster.
Current cluster: 12 nodes, m5.xlarge (4 vCPU, 16GB each)
New service profile: 0.5 vCPU, 1GB memory, estimated 3 replicas,
peaks to 10 replicas under load
Include: headroom analysis, whether current cluster can absorb this,
recommended node count change if needed, approach for load testing.
\`\`\`

## Architecture Decision Records (ADRs)

ADRs document why a technical decision was made — they\'re essential for future maintainability and often skipped because writing them takes time:

\`\`\`
Prompt: Write an Architecture Decision Record (ADR) for our decision to
use [technology/approach] for [problem].
Context: [describe the problem you were solving]
Options considered: [list options with brief description]
Decision: [what you chose]
Rationale: [why — your actual reasons]
Consequences: [what this means going forward]
Format: standard ADR template (Title, Status, Context, Decision, Rationale, Consequences).
\`\`\`

## Deployment Guides

AI writes first-draft deployment guides from your bullet notes in minutes. This removes the bottleneck of documentation debt that accumulates with every release.

## The Compounding Value

Documentation, cost narratives, and capacity planning documents all compound. Every ADR you write this month is context that prevents a bad decision next year. Every cost narrative you produce trains your leadership to ask better questions.`,
        keyTakeaways: [
          'Cloud cost analysis narratives translate your billing data into decisions your leadership can act on',
          'Capacity planning documents can be scaffolded by AI when you provide current cluster state and new service requirements',
          'Architecture Decision Records prevent future bad decisions — AI makes writing them fast enough to actually do',
          'Documentation compounds: the ADRs and runbooks you write today save hours of investigation next year',
        ],
        exercise: {
          title: 'Cost Narrative for Leadership',
          description: 'Turn your most recent cloud cost summary into a leadership-ready narrative using AI.',
          steps: [
            'Pull your cloud cost report for the last two months (AWS Cost Explorer, GCP Billing, Azure Cost Management)',
            'Create an anonymised summary: total spend, percentage change, top 3-4 cost drivers with their change',
            'Paste to Claude with this prompt: "Write a cloud cost narrative for engineering leadership. Include: what drove the change, what is expected vs. unexpected, any items needing investigation, and recommended next steps."',
            'Review the narrative — ensure it accurately reflects the data and adds context AI cannot know (what projects drove the changes)',
            'Add that context, then save as your monthly reporting template',
          ],
          tool: 'Claude',
        },
        quiz: [
          {
            question: 'You paste anonymised cloud cost data to AI and it identifies a 35% increase in data transfer costs as "potentially a security concern." What is the correct response?',
            options: [
              'Trust AI — data transfer spikes often indicate data exfiltration',
              'Investigate the spike independently using your actual logs — AI cannot determine cause from cost data alone',
              'Dismiss it — AI cannot reliably identify security issues',
              'Immediately alert the security team based on AI\'s assessment',
            ],
            correct: 1,
            explanation: 'AI\'s assessment of cost data is a hypothesis, not a diagnosis. A data transfer spike has many causes: a large deployment, a batch job, a misconfigured service, or yes, a security issue. Investigate using your actual logs before drawing conclusions.',
          },
          {
            question: 'What is the most important thing to include in an ADR to make it useful for future engineers?',
            options: [
              'The technical implementation details of the chosen solution',
              'The options considered and the rationale for rejecting alternatives',
              'The names of the engineers who made the decision',
              'The date of the decision and current tool versions',
            ],
            correct: 1,
            explanation: 'The alternatives considered and why they were rejected is what makes ADRs valuable. Implementation details live in the code. What future engineers need to understand is why this approach was chosen over the alternatives that seemed obvious — that context prevents revisiting bad decisions.',
          },
          {
            question: 'You need to write a capacity planning document for a new service. What information must you provide to AI to get a useful analysis?',
            options: [
              'The business justification for the new service',
              'Current cluster state (size, utilisation) and new service resource requirements (CPU, memory, replica count)',
              'The timeline for the service launch',
              'The name of the cloud provider',
            ],
            correct: 1,
            explanation: 'Capacity planning requires two things: current capacity and projected load. AI needs your current cluster state (node count, size, utilisation) and the new service\'s resource profile (CPU, memory, replicas at steady state and peak) to produce a meaningful analysis.',
          },
        ],
        applyThisWeek: {
          action: 'Write one ADR for a technical decision your team made in the last month. It should take under 20 minutes with AI assistance.',
          promptTemplate: 'Write an Architecture Decision Record for our decision to [technology/approach choice]. Context: [the problem we were solving]. Options considered: [list 2-3 options with one sentence each]. Decision: [what we chose]. Rationale: [your actual reasons — be specific]. Consequences: [positive and negative]. Format: standard ADR template.',
          tool: 'Claude',
        },
      },
    ],
  },

  'developer': {
    title: 'AI for Developers / Engineers',
    description: 'Four focused lessons for software engineers using AI to code faster, debug more efficiently, write better tests, and produce documentation that actually gets written.',
    lessons: [
      {
        id: 'it-developer-l1',
        title: 'AI for Developers: Code Faster, Debug Smarter, Ship with More Confidence',
        duration: 17,
        description: 'Build a clear mental model of where AI fits in a software engineer\'s workflow — and the validation habits that prevent AI-assisted code from becoming a liability.',
        content: `## The Developer AI Landscape in 2025

For software engineers, AI assistance has matured from novelty to utility. The question is no longer whether to use it but how to integrate it without introducing the bugs and security vulnerabilities that come from accepting AI output uncritically.

## Where AI Genuinely Accelerates Development

**Boilerplate and scaffolding.** CRUD endpoints, authentication flows, database migrations, test fixtures — these patterns are well-known and AI produces them reliably. You focus on the business logic.

**Debugging assistance.** Paste an error message and stack trace with relevant code context. AI identifies the most likely cause faster than searching Stack Overflow.

**Code review and refactoring.** AI can review a function for common issues, suggest improvements, and produce a refactored version — useful for a second opinion before a PR.

**Test generation.** Given a function, AI can produce a comprehensive set of unit test cases including edge cases you might not have considered.

**Documentation.** Docstrings, README files, API documentation — AI writes these in seconds from your code.

## Where It Fails (And You Pay the Price)

- Security vulnerabilities in generated code: SQL injection, XSS, insecure deserialization — AI is not security-first by default
- Logic errors that look correct: AI-generated code can pass your first read and fail at runtime
- Hallucinated APIs: AI sometimes invents method names that don\'t exist in the library version you\'re using
- Outdated patterns: AI training data has a cutoff; latest framework conventions may not be reflected

## The Non-Negotiable Validation Habits

1. **Read every line before committing** — not skim, read
2. **Test generated code against real data** — not just the happy path
3. **Run security checks** (SAST, dependency scanners) on AI-generated code
4. **Verify API method names** against the actual library docs for your version

## The Right Framing

Think of AI as a highly capable junior developer who codes fast, never gets tired, but occasionally makes confident mistakes. Your job is senior review — not rubber-stamping.`,
        keyTakeaways: [
          'Boilerplate, debugging, test generation, and documentation are the highest-value developer AI use cases',
          'AI-generated code requires the same review as code from a junior developer — security issues, logic errors, and hallucinated APIs are real risks',
          'Read every generated line before committing — AI code looks correct more often than it is',
          'Verify API method names against actual library documentation for your specific version',
        ],
        exercise: {
          title: 'Debugging with AI',
          description: 'Take a real bug from your current codebase and use AI to accelerate the diagnosis — then evaluate how accurate the suggestions were.',
          steps: [
            'Find a bug you\'re currently working on or a recent one you resolved',
            'Paste the error message, stack trace, and the relevant 20-30 lines of code into Claude',
            'Provide context: language, framework, library versions',
            'Ask: "What are the most likely causes of this error? What should I check first?"',
            'Compare AI\'s suggested causes to the actual root cause — note whether it was in the first suggestion, and why or why not',
          ],
          tool: 'Claude',
        },
        quiz: [
          {
            question: 'AI generates a database query function for you. What is the first security check you should perform?',
            options: [
              'Verify the query returns the correct results on test data',
              'Check whether the query uses parameterised statements or string concatenation that could allow SQL injection',
              'Confirm the function follows your naming convention',
              'Test the function\'s performance with a large dataset',
            ],
            correct: 1,
            explanation: 'SQL injection through string concatenation is one of the most common security vulnerabilities in AI-generated database code. Always verify that user-supplied values are handled through parameterised queries or an ORM, not string interpolation.',
          },
          {
            question: 'AI generates code using a method that you don\'t recognise from the library you\'re using. What do you do?',
            options: [
              'Trust it — AI is trained on extensive library documentation',
              'Verify the method exists in the actual library documentation for your specific version',
              'Try running the code — if it throws an error, the method doesn\'t exist',
              'Search Stack Overflow to see if others have used the method',
            ],
            correct: 1,
            explanation: 'AI sometimes invents method names that sound plausible but don\'t exist in the library. Checking the official library documentation for your specific version is the only reliable way to verify — and it takes 30 seconds.',
          },
          {
            question: 'What is the most accurate description of how to integrate AI into a development workflow?',
            options: [
              'Use AI to write all code and focus your time on architecture decisions',
              'Use AI for generation and scaffolding, and apply the same review standards you would to code from a junior developer',
              'Use AI only for documentation — code generation introduces too much risk',
              'Use AI for solo projects only — team codebases require consistent style that AI cannot match',
            ],
            correct: 1,
            explanation: 'AI-generated code is a starting point that requires the same rigorous review as code from a junior developer. The review standard doesn\'t change because the author was an AI — it changes based on the risk profile of the code.',
          },
        ],
        applyThisWeek: {
          action: 'Use AI to debug the next error you encounter. After resolving it, note whether AI\'s first suggestion was correct — and what context made the difference.',
          promptTemplate: 'I\'m getting this error in my [language/framework] application. Help me identify the most likely causes. Error: [paste error message and stack trace]. Relevant code: [paste the relevant function or section]. Context: [library versions, what the code is supposed to do].',
          tool: 'Claude or GitHub Copilot Chat',
        },
      },
      {
        id: 'it-developer-l2',
        title: 'AI-Assisted Code Review, Debugging, and Refactoring',
        duration: 18,
        description: 'Use AI as a systematic code review tool — catching issues, suggesting improvements, and producing cleaner code before it reaches human reviewers.',
        content: `## AI as Your First Code Reviewer

Before your code reaches a human reviewer, AI can catch a significant portion of common issues: security vulnerabilities, logic problems, missing error handling, performance anti-patterns, and style inconsistencies. This shifts the human review conversation from "fix these basic issues" to "discuss these architectural decisions."

## Self-Review Before PR

\`\`\`
Prompt: Review this [language] function for:
1. Security vulnerabilities (injection risks, insecure data handling)
2. Logic errors or edge cases not handled
3. Missing error handling
4. Performance issues
5. Readability and maintainability improvements

[paste your code]

Be specific about each issue you find — include the line number and what should change.
\`\`\`

## Targeted Refactoring

When you know a piece of code is not ideal but aren\'t sure how to improve it:

\`\`\`
Prompt: Refactor this function to:
- Follow [SOLID principles / functional style / your specific style guide]
- Reduce cognitive complexity
- Improve testability by extracting the [specific dependency] as a parameter

[paste your code]

Explain what you changed and why.
\`\`\`

## Debugging Systematic Approach

For bugs that resist quick diagnosis, use AI to structure a systematic investigation:

\`\`\`
Prompt: I have a bug that is hard to reproduce. Here is what I know:
- Symptoms: [describe]
- Frequency: [when it occurs]
- Recent changes: [last PRs or deployments]
- What I\'ve tried: [list]
- Relevant code: [paste]

Help me design a systematic debugging approach — what would you check and in what order?
\`\`\`

## Language Migration Assistance

When migrating code between languages or frameworks, AI is a strong assistant:

\`\`\`
Prompt: Convert this [source language] function to [target language].
Maintain the same logic, handle the equivalent edge cases, and follow
idiomatic [target language] patterns. Note any places where the languages
handle things differently that I should review carefully.
\`\`\`

## The Review Habit

The most valuable thing you can do with AI and code review: run every significant function through an AI review before opening a PR. The 5 minutes of AI review often saves 30 minutes of back-and-forth with a human reviewer.`,
        keyTakeaways: [
          'AI pre-review before PR catches common issues and shifts human review to higher-level architectural discussion',
          'Targeted refactoring prompts (reduce complexity, improve testability, follow specific pattern) produce more useful output than generic refactoring requests',
          'For hard-to-reproduce bugs, use AI to design a systematic investigation approach — not just suggest causes',
          'Language migration is a strong AI use case — always ask AI to note where the languages differ in ways that require careful review',
        ],
        exercise: {
          title: 'Pre-PR AI Review',
          description: 'Run your next significant code change through an AI review before opening the PR. Track which issues it catches.',
          steps: [
            'Take a code change you\'re about to submit for review (at least one meaningful function or class)',
            'Paste it into Claude with this prompt: "Review for: security vulnerabilities, logic errors, missing error handling, performance issues, and readability. Be specific — include what needs to change and why."',
            'Review each flagged issue — determine which are valid and fix them',
            'Open your PR, then compare what the human reviewer catches versus what AI caught',
            'Note the pattern — this tells you what AI is reliable at catching for your codebase',
          ],
          tool: 'Claude or GitHub Copilot Chat',
        },
        quiz: [
          {
            question: 'You ask AI to review your code and it suggests 8 improvements. What is the correct approach?',
            options: [
              'Apply all 8 suggestions — AI review is more thorough than human review',
              'Evaluate each suggestion on its merit — some may not apply to your context',
              'Accept only the security-related suggestions',
              'Reject them all — AI reviews are not reliable enough to act on',
            ],
            correct: 1,
            explanation: 'AI suggestions are recommendations, not requirements. Each one should be evaluated against your specific context: your style guide, your architecture constraints, and the tradeoffs involved. Some suggestions will be exactly right; others won\'t apply to your situation.',
          },
          {
            question: 'AI suggests refactoring a 40-line function into 5 smaller functions. What should you consider before accepting?',
            options: [
              'Whether the refactoring reduces line count — shorter code is always better',
              'Whether the split makes the code more readable and maintainable in your codebase\'s context, not just in isolation',
              'Whether the refactoring removes the need for tests on the original function',
              'Whether the smaller functions can be reused elsewhere in the codebase',
            ],
            correct: 1,
            explanation: 'Function splitting can improve or harm readability depending on the context. Evaluate whether the abstraction level is appropriate for your codebase, whether the function names communicate intent clearly, and whether the indirection adds cognitive overhead or reduces it.',
          },
          {
            question: 'You need to migrate a Python data processing script to Go. What should you ask AI to specifically flag in the migration?',
            options: [
              'Differences in variable naming conventions between the languages',
              'Places where language semantics differ in ways that could change runtime behaviour (e.g., error handling, type coercion, concurrency)',
              'Differences in library naming conventions',
              'Places where Python is more readable than the Go equivalent',
            ],
            correct: 1,
            explanation: 'Language migrations fail at semantic differences, not syntactic ones. Go\'s error handling (explicit returns) vs Python\'s exceptions, Go\'s goroutines vs Python\'s threading model, and differences in type handling can all introduce bugs that look correct but behave differently at runtime.',
          },
        ],
        applyThisWeek: {
          action: 'Run every significant function in your next PR through an AI review before submission. Track the issues it catches versus what your human reviewer finds.',
          promptTemplate: 'Review this [language] code for: 1) security vulnerabilities including [injection risks / XSS / insecure dependencies], 2) logic errors and unhandled edge cases, 3) missing error handling, 4) performance issues, 5) readability improvements. For each issue, give the specific line and what to change. Code: [paste]',
          tool: 'Claude',
        },
      },
      {
        id: 'it-developer-l3',
        title: 'Test Generation, API Documentation, and Technical Writing with AI',
        duration: 16,
        description: 'Use AI to write the tests, documentation, and technical content that engineers know they should produce but rarely have time for.',
        content: `## The Tests You Know You Should Write

Test coverage is almost universally lower than it should be — not because engineers don\'t value tests, but because writing comprehensive tests for existing code is tedious. AI changes this economics dramatically.

## Unit Test Generation

\`\`\`
Prompt: Write comprehensive unit tests for this [language] function using [testing framework].
Include:
- Happy path tests for normal inputs
- Edge cases: empty inputs, null values, maximum values, boundary conditions
- Error cases: invalid inputs, exception conditions
- At least 8 distinct test cases

[paste your function]

Use the [jest/pytest/JUnit/Go testing] style. Add descriptive test names that explain what is being tested.
\`\`\`

Review generated tests carefully: AI sometimes writes tests that pass even if the function is broken, particularly when it doesn\'t fully understand what "correct" output should be.

## Integration Test Scaffolding

\`\`\`
Prompt: Write integration test scaffolding for this REST API endpoint using [testing framework].
The endpoint: [describe what it does, its inputs, and expected outputs]
Test cases to cover: authentication, valid request, invalid request body,
missing required fields, rate limiting, error response format.
\`\`\`

## API Documentation

OpenAPI/Swagger specs are time-consuming to write. AI can produce them from your route handlers:

\`\`\`
Prompt: Write an OpenAPI 3.0 specification for this Express.js route.
[paste your route handler]
Include: path, method, request body schema with validation rules,
response schemas for 200, 400, 401, and 500 status codes,
and a clear description of what the endpoint does.
\`\`\`

## README and Technical Documentation

\`\`\`
Prompt: Write a README for this project based on its code structure.
Project: [describe what it does]
Key dependencies: [list]
[paste relevant code sections or describe the architecture]
Include: what it does, how to install, how to run, environment variables required,
how to run tests, how to contribute.
\`\`\`

## The Documentation Habit

Technical writing is most effective when it happens immediately after implementation — context is fresh and the cost is lowest. AI makes this fast enough that "I\'ll document it later" becomes "it\'s documented already."`,
        keyTakeaways: [
          'AI generates comprehensive test suites including edge cases that engineers commonly miss — but review that tests actually validate correct behaviour',
          'OpenAPI specifications can be generated from route handlers — saving hours of spec writing per endpoint',
          'READMEs and technical documentation are fastest to produce immediately after implementation when context is fresh',
          'Review AI-generated tests carefully: some may pass even when the function is broken if AI misunderstood the expected output',
        ],
        exercise: {
          title: 'Test Suite for an Untested Function',
          description: 'Use AI to generate a comprehensive test suite for a function in your codebase that currently has no tests.',
          steps: [
            'Find a function in your codebase with no unit tests (or low coverage)',
            'Paste it into Claude with this prompt: "Write comprehensive unit tests using [your framework]. Include: happy path, 5+ edge cases, error conditions. Test names should describe what is being tested."',
            'Run the generated tests — note which pass, which fail, and which test nothing meaningful',
            'Fix the tests that fail due to incorrect expected values',
            'Add the test file to your codebase and commit',
          ],
          tool: 'Claude or GitHub Copilot',
        },
        quiz: [
          {
            question: 'AI generates 10 unit tests for your function. All 10 pass on the first run. What does this tell you?',
            options: [
              'The function is correct and well-tested',
              'The tests may be valid, or they may be testing too little — review each test to confirm it would fail if the function were broken',
              'AI-generated tests are more reliable than human-written tests',
              'You can skip code review for this function since the tests pass',
            ],
            correct: 1,
            explanation: 'Passing tests only prove the tests run — not that they validate the right behaviour. AI sometimes generates tests with assertions that would pass even if the function returned the wrong value. Review each test: would it fail if the function had a bug?',
          },
          {
            question: 'You want AI to generate an OpenAPI spec for your API. What context is most important to provide?',
            options: [
              'The programming language and framework you used',
              'The route handler code including request validation logic and response structures',
              'The database schema the API reads from',
              'The authentication method used',
            ],
            correct: 1,
            explanation: 'The route handler code contains the information AI needs to generate an accurate spec: the HTTP method, path, request body structure, validation rules, and response shapes. Without the actual handler code, AI generates a generic spec that won\'t match your implementation.',
          },
          {
            question: 'When is the best time to write documentation for a new feature?',
            options: [
              'During the next sprint when there is dedicated documentation time',
              'Immediately after implementation when the context is fresh — use AI to make it fast',
              'Before implementation as part of the design process',
              'After QA has validated the feature',
            ],
            correct: 1,
            explanation: 'Documentation quality degrades rapidly after implementation as context fades. Writing it immediately — with AI doing the heavy lifting — produces the most accurate documentation at the lowest cost. "I\'ll do it later" is almost never true.',
          },
        ],
        applyThisWeek: {
          action: 'Write a test suite for the most undertested function in your current codebase. Target 80% coverage for that function by end of week.',
          promptTemplate: 'Write comprehensive unit tests for this [language] function using [testing framework]. Cover: happy path with typical inputs, edge cases (empty, null, boundary values), error conditions and exception handling. Each test name should describe what is being tested. Function: [paste your code]',
          tool: 'Claude or GitHub Copilot',
        },
      },
      {
        id: 'it-developer-l4',
        title: 'Building AI Into Your Development Workflow: Tools, Habits, and Guardrails',
        duration: 16,
        description: 'Integrate AI systematically into your daily development workflow — with the habits and guardrails that make it a sustainable productivity multiplier.',
        content: `## From Ad-Hoc to Systematic

Using AI occasionally when you remember it produces some value. Building it into your workflow systematically produces a compounding advantage. The difference is habit design — knowing which tasks to reach for AI first, every time, without thinking.

## The Developer AI Toolkit

**In the IDE:** GitHub Copilot or Cursor provide inline suggestions and chat within your editor. This is the highest-leverage integration for most developers — AI assistance without context switching.

**For longer tasks:** Claude or ChatGPT in the browser for complex explanations, multi-file refactoring guidance, code review, and documentation.

**For terminal work:** AI-assisted shell commands — describe what you want to achieve and get the command rather than searching man pages.

## The Five Default AI Triggers

Build a habit of reaching for AI first for these tasks — every time:

1. **Starting a new file or component** — scaffold the boilerplate
2. **Encountering an error** — paste it immediately before searching
3. **About to write a test** — generate the suite, then review and fill gaps
4. **Opening a PR** — run an AI review before submitting
5. **Finishing a feature** — draft the documentation immediately

## The Guardrails That Prevent AI Debt

AI debt accumulates when you accept generated code without understanding it:

- **Never commit code you can\'t explain.** If you can\'t describe what a generated function does at interview-question level, you don\'t understand it enough to own it.
- **Run your security scanner on AI-generated code.** Add this to your pre-commit hook or CI pipeline.
- **Keep a dependency inventory current.** AI sometimes suggests adding a new library — evaluate it as you would any dependency.

## Your Prompt Library

As with any tool, reusable patterns compound. Build a personal snippet library of the prompts that reliably produce useful output for your common tasks:

- Code review prompt
- Test generation prompt
- Debugging analysis prompt
- Documentation prompt
- Refactoring prompt

After 30 days of active use, this library becomes a significant part of your development efficiency.

## Measuring the Impact

Track time spent on your before-AI versus after-AI tasks for two weeks. The data will tell you where the gain is real and where you\'re using AI for the wrong tasks.`,
        keyTakeaways: [
          'IDE-integrated AI (Copilot, Cursor) is the highest-leverage integration — no context switching, suggestions in the flow of work',
          'The five default AI triggers (new file, error, test, PR, documentation) make AI systematic rather than ad-hoc',
          'Never commit code you cannot explain — AI debt from accepted-but-not-understood code compounds into maintenance problems',
          'A personal prompt library for recurring tasks compounds into a significant efficiency advantage over time',
        ],
        exercise: {
          title: 'Two-Week AI Integration Experiment',
          description: 'Deliberately integrate AI into your five daily triggers for two weeks and track the impact.',
          steps: [
            'Set up your AI toolkit: install GitHub Copilot or Cursor in your IDE if you haven\'t already; bookmark Claude or ChatGPT for browser use',
            'Create a simple tracking sheet with columns: task, time before AI (estimate), time with AI (actual), issues found in AI output',
            'For two weeks, use AI for every instance of the five triggers: new file, error, test, PR review, documentation',
            'At the end of week 2, review your tracking sheet — which tasks showed the biggest time saving? Which produced the most AI errors?',
            'Build your prompt library from the prompts that worked best',
          ],
          tool: 'GitHub Copilot + Claude',
        },
        quiz: [
          {
            question: 'You accept a 30-line function from GitHub Copilot that passes your tests. A colleague asks you to explain what it does. You struggle to explain one section. What should you do?',
            options: [
              'Merge it — the tests validate it works, that\'s sufficient',
              'Understand that section before merging — code you own must be code you understand',
              'Add a comment explaining the section is AI-generated',
              'Ask your colleague to review it instead',
            ],
            correct: 1,
            explanation: 'Owning a codebase means being able to debug, modify, and explain every piece of code in it. Merging code you don\'t understand transfers the future debugging burden to yourself or your team at the worst possible time — when something breaks in production.',
          },
          {
            question: 'What is the most effective way to build a sustainable AI coding habit?',
            options: [
              'Use AI for every task regardless of whether it saves time',
              'Define specific trigger tasks where you reach for AI first every time, then build from there',
              'Set aside dedicated "AI time" separate from normal development',
              'Use AI only for tasks where you are completely stuck',
            ],
            correct: 1,
            explanation: 'Habits are built on triggers, not intentions. Defining specific task types where you reach for AI first (error encountered, new component, PR submission) builds automatic behaviour faster than general "use AI more" goals.',
          },
          {
            question: 'AI suggests adding a new npm package to solve a problem. What is the correct evaluation process?',
            options: [
              'Add it — AI suggests well-maintained packages',
              'Evaluate it as you would any dependency: maintenance status, download count, licence, security advisories, and whether the problem can be solved without a new dependency',
              'Only add it if the package has more than 1 million weekly downloads',
              'Add it to your dev dependencies only — production dependencies are higher risk',
            ],
            correct: 1,
            explanation: 'AI-suggested packages require the same evaluation as any dependency you\'d add manually. Unmaintained packages, security advisories, licence incompatibilities, and unnecessary dependency weight are all risks that apply regardless of who suggested the package.',
          },
        ],
        applyThisWeek: {
          action: 'Set up one AI tool in your IDE this week and commit to using it for every new file you create and every error you encounter. Track the impact.',
          promptTemplate: 'I need to [describe your development task]. Language/framework: [specify]. Requirements: [list your specific requirements]. Please generate [code / tests / documentation] and explain any non-obvious decisions.',
          tool: 'GitHub Copilot or Cursor (IDE) + Claude (browser)',
        },
      },
    ],
  },

  'it-leader': {
    title: 'AI for IT Managers / CTOs',
    description: 'Four strategic lessons for IT leaders making decisions about AI adoption, vendor selection, team capability building, and governance in their organisations.',
    lessons: [
      {
        id: 'it-it-leader-l1',
        title: 'The IT Leader\'s AI Strategy: Where to Invest, What to Avoid',
        duration: 18,
        description: 'Build a strategic framework for AI adoption in your IT function — prioritising where AI genuinely creates value and avoiding the traps that waste budget and team time.',
        content: `## The IT Leader\'s Unique AI Position

You are simultaneously an AI adopter (using AI in your own work), an AI enabler (helping the broader organisation adopt AI tools), and an AI governor (ensuring AI adoption is secure and compliant). Most AI strategy content addresses one of these roles; your job requires all three.

## A Framework for Prioritisation

Not all AI investments deliver equal return. Evaluate opportunities against three dimensions:

**Value potential:** How much time, cost, or quality improvement does this AI application create? Applications that affect daily workflows for large teams have higher value potential than niche automations.

**Implementation risk:** What could go wrong — security, data privacy, compliance, vendor lock-in? Higher risk requires more due diligence and governance before approval.

**Reversibility:** If this doesn\'t work, how hard is it to undo? Experiments you can reverse quickly have lower effective risk than vendor contracts or architectural decisions.

## High-Return IT AI Applications

Focus your early investment here:
- **Documentation automation** (runbooks, SOPs, change requests): high frequency, low risk, immediate time saving
- **Alert triage assistance**: reduces analyst cognitive load, keeps humans in the decision loop
- **Code review and scripting assistance**: accelerates developer productivity without architectural risk
- **User-facing IT communications**: helpdesk email drafting, incident communications, policy explanations

## Lower-Return (for now) or Higher-Risk Areas

- Fully autonomous incident response: the risk of an AI-triggered false action outweighs current efficiency gains
- AI replacing human judgment in access control decisions: compliance and liability concerns
- Vendor-specific AI features with high lock-in and unclear data handling

## Building Your Investment Case

When presenting AI investment to leadership, structure your case around:
1. Current state: where time is wasted or quality is below standard
2. AI application: specific use case, not "AI generally"
3. Expected outcome: measurable (hours saved, incidents reduced, MTTR improvement)
4. Risk and mitigation: honest assessment of what could go wrong
5. Timeline and success criteria`,
        keyTakeaways: [
          'IT leaders play three AI roles simultaneously: adopter, enabler, and governor — each requires different actions',
          'Evaluate AI investments on value potential, implementation risk, and reversibility',
          'Documentation, alert triage, scripting assistance, and communications are the highest-return early IT AI investments',
          'Investment cases for AI should be built on measurable outcomes — hours saved, MTTR reduction, not general "AI benefits"',
        ],
        exercise: {
          title: 'AI Investment Priority Matrix',
          description: 'Map your IT function\'s top AI opportunities against value potential and implementation risk.',
          steps: [
            'List 8–10 AI application ideas for your IT function — think across documentation, operations, security, development, and communications',
            'For each, score value potential (1–5) and implementation risk (1–5) — low risk scores highest',
            'Plot them on a 2×2 matrix: Value (Y axis) vs. Risk (X axis)',
            'Identify the top 3 in the high-value, low-risk quadrant — these are your first 90 days',
            'Use Claude to draft a one-paragraph investment case for the top priority',
          ],
          tool: 'Claude',
        },
        quiz: [
          {
            question: 'Your CISO wants to approve AI tools only after a full security review that will take 6 months. What is the most effective approach?',
            options: [
              'Wait for the review — security must always come first',
              'Identify low-risk, high-value AI applications that can be approved faster (e.g., documentation drafting with no sensitive data), and run those while the broader review proceeds',
              'Proceed with AI adoption without CISO approval to maintain competitive pace',
              'Commission an external AI security assessment instead of the internal review',
            ],
            correct: 1,
            explanation: 'Security review timelines and AI adoption are not mutually exclusive. Running lower-risk applications (where no sensitive data is involved) allows your team to build skills and demonstrate value while the broader governance framework is developed.',
          },
          {
            question: 'Which of the following is the most important criterion for evaluating an AI vendor for IT operations use?',
            options: [
              'Whether the AI model has the highest benchmark scores',
              'How the vendor handles data — what is retained, for how long, and who has access',
              'Whether the vendor offers enterprise pricing',
              'Whether the AI tool has integrations with your current ITSM platform',
            ],
            correct: 1,
            explanation: 'Data handling is the primary criterion for any AI tool used in IT operations, where data often includes security-sensitive information. Benchmark scores matter less than clear, auditable answers to: what data does this tool retain, who can access it, and what are the compliance implications?',
          },
          {
            question: 'You want to present an AI investment case to your CFO. What makes the strongest argument?',
            options: [
              'Referencing what competitor organisations are doing with AI',
              'Quantifying the current cost of the problem (hours spent, incidents caused) and projecting the improvement with specific AI application and measurable outcome',
              'Showing the AI tool\'s feature list and pricing comparison',
              'Citing industry analyst reports on AI ROI in IT functions',
            ],
            correct: 1,
            explanation: 'CFOs approve investments based on quantified return, not competitive benchmarking or feature lists. A strong IT AI investment case starts with a measurable current cost and projects a measurable improvement from a specific AI application — not "AI generally."',
          },
        ],
        applyThisWeek: {
          action: 'Build a simple AI priority matrix for your IT function. Identify your top 3 opportunities and draft a one-paragraph investment case for the highest priority.',
          promptTemplate: 'Help me build an investment case for AI adoption in our IT function. Context: [describe current pain point — e.g., "our team spends 8 hours/week writing change request documentation"]. AI application: [specific use]. Expected outcome: [measurable improvement]. Risk: [what could go wrong]. What additional data should I gather to strengthen this case?',
          tool: 'Claude',
        },
      },
      {
        id: 'it-it-leader-l2',
        title: 'AI for Vendor Evaluation, Technology Selection, and Build vs. Buy Decisions',
        duration: 17,
        description: 'Apply a structured evaluation framework to AI vendor selection — and use AI itself to accelerate the evaluation process.',
        content: `## The AI Vendor Landscape for IT

The number of AI tools targeting IT functions has grown dramatically. Security vendors embed AI into their products. ITSM platforms add "AI-powered" features. Standalone tools promise to automate everything from ticket triage to infrastructure management. Distinguishing genuine capability from marketing requires a structured evaluation framework.

## The IT AI Vendor Evaluation Framework

**Data handling (non-negotiable first gate):**
- What data does the tool process? Can it access production data, logs, or credentials?
- Where is data stored? What is the retention policy?
- Does it use your data to train models? (Critical for proprietary data)
- What are the compliance certifications (SOC 2, ISO 27001)?

**Capability validation:**
- Does the AI capability work in your environment? Request a proof of concept with your data and configuration, not vendor demos with curated scenarios
- What is the error rate? "AI-powered" tools often have high false positive rates that create more work than they save

**Integration and lock-in:**
- Does the tool integrate with your existing stack (ITSM, SIEM, monitoring)?
- What does off-boarding look like? Can you export your data?

**Build vs. Buy Decision**

Build when:
- The use case is specific to your environment and requires deep context
- You have engineering capacity
- The capability is a core differentiator for your IT function

Buy when:
- The use case is standard (ticket triage, documentation generation)
- A vendor has significantly more training data and research investment than you can replicate
- Time to value is critical

## Using AI to Accelerate Evaluation

AI can help you structure RFPs, generate evaluation criteria, summarise vendor documentation, and draft comparison reports:

\`\`\`
Prompt: Help me write an RFP questionnaire for an AI-powered ITSM tool.
Our requirements: [list your requirements]
Key concerns: data handling, integration with ServiceNow, SOC 2 compliance.
Generate 15 questions that will reveal genuine capability versus marketing claims.
\`\`\``,
        keyTakeaways: [
          'Data handling is the first gate in AI vendor evaluation for IT — retention policy, training use, and compliance certifications must be answered before capability assessment',
          'Vendor demos use curated scenarios; a proof of concept with your data is the only reliable capability test',
          'Build vs. buy depends on use case specificity, engineering capacity, and vendor advantage in training data',
          'AI can accelerate vendor evaluation by generating RFP questions, summarising documentation, and structuring comparison reports',
        ],
        exercise: {
          title: 'Vendor Evaluation Questionnaire',
          description: 'Use AI to generate a rigorous evaluation questionnaire for an AI tool you are currently considering.',
          steps: [
            'Identify an AI tool category you are evaluating or considering (AI-powered SIEM, ticketing assistant, documentation tool, etc.)',
            'Open Claude and describe the tool type, your environment, and your three biggest concerns',
            'Ask: "Generate 12 evaluation questions that would reveal genuine capability versus marketing claims. Include at least 4 questions on data handling and security."',
            'Review the questions — add any that reflect your organisation\'s specific compliance requirements',
            'Send the questionnaire to two or three vendors and compare their responses',
          ],
          tool: 'Claude',
        },
        quiz: [
          {
            question: 'A security vendor claims their AI-powered SIEM reduces false positives by 70%. How do you validate this claim?',
            options: [
              'Request the benchmark study and verify the methodology',
              'Request a proof of concept using your actual alert data and measure the false positive rate in your environment',
              'Ask for customer references who have achieved similar results',
              'Accept the claim — security vendors have regulatory obligations to be accurate',
            ],
            correct: 1,
            explanation: 'Vendor benchmarks use curated, idealised data that rarely reflects the noise and specificity of a real enterprise environment. The only valid validation is a proof of concept using your actual alert data — the false positive rate in your environment is the only number that matters.',
          },
          {
            question: 'A vendor\'s AI tool processes your IT log data. What is the most critical contractual term to secure?',
            options: [
              'The pricing model for data volume overage',
              'Explicit prohibition on using your data to train or improve the vendor\'s AI models',
              'SLA guarantees for uptime and availability',
              'The right to audit the vendor\'s AI model for bias',
            ],
            correct: 1,
            explanation: 'Your IT log data contains sensitive information about your environment, vulnerabilities, and incident history. Without explicit contractual prohibition, vendors may use your data to improve their models — which could expose your environment\'s characteristics to their broader system.',
          },
          {
            question: 'When does building an AI tool internally make more sense than buying a vendor solution?',
            options: [
              'When the AI model you need is available as open source',
              'When the use case requires deep context about your specific environment that a general-purpose vendor cannot have',
              'When your team wants to build AI experience for career development',
              'When the vendor solution is more than 20% more expensive than building',
            ],
            correct: 1,
            explanation: 'Build decisions are justified when the competitive advantage comes from environment-specific context that no vendor can replicate. Vendor solutions win when the use case is standard enough that their training data advantage, research investment, and support infrastructure outweigh the customisation benefit.',
          },
        ],
        applyThisWeek: {
          action: 'Apply the data handling questions to one AI tool your team is currently using or evaluating. If you can\'t answer all four data handling questions from the vendor\'s documentation, request a formal response.',
          promptTemplate: 'Help me evaluate [AI tool category] vendors. Our environment: [brief description]. Key requirements: [list]. Main concerns: [list]. Generate an evaluation matrix with criteria, weighting, and scoring guidance that I can use to compare 3 vendors objectively.',
          tool: 'Claude',
        },
      },
      {
        id: 'it-it-leader-l3',
        title: 'Building an AI-Ready IT Team and Culture',
        duration: 16,
        description: 'Move your team from AI curiosity to AI capability — with a structured approach to skill building, experimentation, and knowledge sharing.',
        content: `## The Capability Gap is Real

Most IT teams have a significant spread in AI capability: a few engineers who use AI tools daily and have developed strong instincts for when and how to use them, and a larger group who have tried AI a few times with mixed results. Closing this gap is a leadership responsibility, not a personal choice.

## The Four Enablers of Team AI Adoption

**Permission:** People will not experiment with tools they think might be against policy. Make clear that AI tool use is encouraged, define which tools are approved, and communicate that learning through experimentation is expected.

**Time:** AI skill development requires protected practice time. Engineers who are 100% allocated to feature delivery will not develop AI skills on the side. Build AI learning into sprint planning or allocate explicit time.

**Shared learning:** Individual skill development does not compound. A monthly 30-minute team session where engineers share one AI prompt or workflow they found effective is worth more than individual learning alone.

**Psychological safety:** People avoid tools when they fear being judged for getting something wrong. AI output is unreliable — that\'s a feature, not a bug, as long as the culture treats verification as standard practice rather than failure.

## The Practical Team Enablement Plan

**Month 1:** Define approved tools, communicate the policy, run a 90-minute team workshop on practical AI use for their specific role tasks.

**Month 2:** Assign one AI experiment per team member (a specific task they will use AI to improve). Review outcomes as a team.

**Month 3:** Build a shared prompt library. Identify two or three workflows where AI is now standard practice.

**Ongoing:** Monthly 30-minute AI learning share. Celebrate effective AI use, not just output quality.

## Hiring and Performance for an AI-Ready Team

Update your hiring process: ask candidates how they use AI in their work. Update performance frameworks: AI tool proficiency is a measurable skill, not a personal preference.

## Using AI to Build AI Capability

Ironically, AI is one of the best tools for training your team on AI. Custom learning paths, role-specific prompt libraries, and training materials can all be generated with AI assistance.`,
        keyTakeaways: [
          'Team AI adoption requires four enablers: explicit permission, protected time, shared learning, and psychological safety',
          'Individual AI skill development does not compound — structured team sharing is what builds organisational capability',
          'Monthly AI learning sessions where engineers share effective prompts compound into a team advantage over time',
          'Hiring and performance frameworks should reflect AI proficiency as a measurable skill',
        ],
        exercise: {
          title: 'Team AI Enablement Plan',
          description: 'Draft a 90-day AI enablement plan for your team using AI to structure it.',
          steps: [
            'Open Claude and describe your team: size, roles (sysadmins, developers, SecOps, etc.), current AI tool usage, biggest time sinks',
            'Ask: "Draft a 90-day AI enablement plan for this IT team. Include: approved tool recommendation, month 1 workshop agenda, month 2 experiment structure, month 3 knowledge-sharing format, and ongoing cadence."',
            'Review and adapt the plan to your organisation\'s constraints and culture',
            'Identify the biggest obstacle to adoption in your specific team and ask Claude how other IT leaders have addressed it',
            'Share the draft plan with one or two senior engineers for input before finalising',
          ],
          tool: 'Claude',
        },
        quiz: [
          {
            question: 'Your team has been told AI tools are available but adoption remains low. What is the most likely root cause?',
            options: [
              'The team does not believe AI is useful for IT work',
              'Insufficient permission, time, shared learning, or psychological safety — most likely a combination',
              'The approved AI tools are not capable enough',
              'IT professionals are more resistant to new technology than other departments',
            ],
            correct: 1,
            explanation: 'Low adoption despite tool availability is almost always an enablement problem, not a capability or motivation problem. Permission may be ambiguous, time may not be protected, learning may be individual rather than shared, or failure may feel risky. Diagnose which enabler is missing before changing tools.',
          },
          {
            question: 'What is the most effective format for building AI capability across an IT team?',
            options: [
              'Sending the team links to AI tutorials and expecting self-directed learning',
              'Monthly 30-minute team sessions where each person shares one AI prompt or workflow they found effective',
              'Enrolling the team in a formal AI certification programme',
              'Designating one team member as the AI expert and routing all AI questions through them',
            ],
            correct: 1,
            explanation: 'Shared learning sessions compound in a way individual learning does not. When engineers share specific prompts and workflows that worked for them, the whole team benefits immediately — and the conversation generates new ideas. This format is also low-cost and builds psychological safety around AI use.',
          },
          {
            question: 'A senior engineer on your team is resistant to using AI tools. What is the most effective approach?',
            options: [
              'Make AI tool usage a performance requirement',
              'Start with a specific task they find time-consuming and have them try AI for that task only — remove the pressure to adopt broadly',
              'Assign them to mentor junior engineers on AI, which will force engagement',
              'Accept the resistance — senior engineers have earned the right to work how they prefer',
            ],
            correct: 1,
            explanation: 'Resistance to AI tools often comes from bad early experiences with low-quality output, or from a general "new tool" scepticism. Starting with one specific pain point removes the need to believe in AI broadly — a single genuine time saving on a task they hate is more persuasive than any policy.',
          },
        ],
        applyThisWeek: {
          action: 'Run a 30-minute AI share session with your team. Ask each person to bring one AI prompt they\'ve tried — successful or not. Discuss what worked and why.',
          promptTemplate: 'Design a 90-minute AI workshop for an IT team of [size] including [role types]. Goals: reduce scepticism, give practical first wins, establish ongoing practice. Include: agenda, 3 hands-on exercises specific to IT work, key messages, and how to handle common objections.',
          tool: 'Claude',
        },
      },
      {
        id: 'it-it-leader-l4',
        title: 'AI Governance, Security Risk, and Responsible Adoption for IT Leadership',
        duration: 17,
        description: 'Build the governance framework that allows your organisation to adopt AI at pace while managing the security, compliance, and ethical risks your role requires you to own.',
        content: `## Governance Is What Makes Speed Possible

IT leaders who approach AI governance as a barrier to adoption usually end up with one of two outcomes: they approve tools without adequate oversight (creating risk), or they block tools with lengthy reviews (creating frustration and shadow AI). The goal of governance is neither — it is to move fast in low-risk areas while applying rigorous controls where they matter.

## The AI Risk Tiers for IT

**Tier 1 — Low risk (approve by default with basic controls):**
- AI tools for writing assistance using only non-sensitive content (documentation, communications, training material)
- AI code assistance tools that do not transmit proprietary business logic
- Public AI tools for non-sensitive research and analysis

**Tier 2 — Medium risk (require security assessment):**
- AI tools that process internal operational data (logs, alerts, tickets)
- AI features embedded in approved enterprise software (Microsoft Copilot in M365, Salesforce Einstein)
- AI tools with access to employee or customer data

**Tier 3 — High risk (require legal, security, and compliance review):**
- AI tools with access to production systems or credentials
- AI tools that make or influence access control decisions
- AI tools processing regulated data (PII, PHI, financial records)

## Core Governance Policies Every IT Leader Should Have

1. **Approved tool register** — which AI tools are approved for what data classification
2. **Data classification guidance** — what data types may be used with which tier of tools
3. **Incident and disclosure protocol** — what to do if an AI tool produces a harmful output or a data handling incident occurs
4. **Review cadence** — annual review of the approved tool register and risk tier assignments

## Using AI to Build Your Governance Framework

\`\`\`
Prompt: Help me draft an AI acceptable use policy for our IT department.
We want to: approve low-risk AI tools quickly, require security review for tools
handling internal data, and prohibit AI tools processing regulated data without
legal and compliance sign-off.
Include: scope, risk tiers with examples, approved tool criteria,
prohibited uses, incident reporting, and review cadence.
\`\`\`

## The Shadow AI Problem

Employees will use AI tools whether you govern them or not. The role of governance is to channel that usage towards approved tools with appropriate controls — not to ban it. A governance framework that bans AI usage will be ignored; one that enables responsible use will be followed.`,
        keyTakeaways: [
          'Effective AI governance enables speed in low-risk areas while applying controls where they matter — it is not a blanket approval or blanket ban',
          'A three-tier risk framework (documentation, internal data, regulated data) covers most IT AI use cases with appropriate controls',
          'Core governance policies (approved tool register, data classification guide, incident protocol) are achievable in 30 days',
          'Shadow AI is the alternative to governance — employees will use AI tools regardless; governance channels that into approved tools',
        ],
        exercise: {
          title: 'AI Governance Framework Draft',
          description: 'Use AI to produce a first-draft AI acceptable use policy for your IT organisation.',
          steps: [
            'Describe your organisation to Claude: industry, size, key compliance frameworks (SOC 2, HIPAA, GDPR, ISO 27001), and current AI tool usage',
            'Ask it to draft an AI acceptable use policy using a three-tier risk framework',
            'Review the draft against your existing security policies — identify any conflicts or gaps',
            'Circulate to your CISO and compliance lead for input',
            'Add your organisation-specific examples to the risk tiers and approved tool guidance',
          ],
          tool: 'Claude',
        },
        quiz: [
          {
            question: 'An engineer is using ChatGPT to draft internal documentation. Under which risk tier does this fall, and what control is appropriate?',
            options: [
              'Tier 3 — require full legal and compliance review before allowing',
              'Tier 1 — approve with basic controls: ensure no sensitive or proprietary data is included in prompts',
              'Tier 2 — require a security assessment of OpenAI\'s data handling',
              'No tier — personal AI use is outside the scope of IT policy',
            ],
            correct: 1,
            explanation: 'Using a public AI tool for non-sensitive documentation drafting is Tier 1: the content is not sensitive, the risk is low, and the control is simple — ensure engineers know not to include sensitive data in prompts. Requiring a full security review for this use case creates unnecessary friction without meaningful risk reduction.',
          },
          {
            question: 'Your legal team asks whether your AI governance policy needs to address the EU AI Act. What is the correct initial step?',
            options: [
              'Determine which AI systems you use that fall under the Act\'s high-risk categories',
              'Block all AI tool usage until the legal assessment is complete',
              'Only address the EU AI Act if your organisation operates in the EU',
              'Wait for regulatory guidance before updating your policy',
            ],
            correct: 0,
            explanation: 'The EU AI Act applies to AI systems by risk category, not by geography (it applies to systems used in or affecting EU users). The first step is inventorying which AI systems you use and whether any fall into the Act\'s prohibited or high-risk categories — that determines the scope of your compliance obligation.',
          },
          {
            question: 'Despite having an AI governance policy, you discover engineers are using unapproved AI tools. What does this most likely indicate?',
            options: [
              'The engineers are acting irresponsibly and should be disciplined',
              'The approved tools do not meet their needs, or the approval process for new tools is too slow',
              'AI governance is inherently unenforceable in an IT environment',
              'The policy needs to be communicated more clearly',
            ],
            correct: 1,
            explanation: 'Shadow AI use is almost always a signal that the governance framework is not meeting a legitimate need — either the approved tools are inadequate, or the process to add tools is too slow. The response should be to understand the need and expand the approved list or accelerate review, not to tighten restrictions that will be ignored.',
          },
        ],
        applyThisWeek: {
          action: 'Audit which AI tools your team is currently using — approved and unapproved. For each unapproved tool, determine which risk tier it falls into and fast-track the appropriate review.',
          promptTemplate: 'Draft an AI acceptable use policy for [organisation type and size]. Compliance frameworks we operate under: [list]. Include: purpose and scope, three-tier risk framework with examples for each tier, approved tool criteria, prohibited uses (with rationale), incident reporting procedure, and annual review cadence. Keep it actionable — under 1,200 words.',
          tool: 'Claude',
        },
      },
    ],
  },
}
