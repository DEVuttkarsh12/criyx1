export const navItems = [
  { label: 'Why us', to: '/why-us' },
  { label: 'Benefits', to: '/benefits' },
  { label: 'Process', to: '/process' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Contact', to: '/contact' },
];

export const productPages = [
  {
    slug: 'ai-voice-agent',
    label: 'AI Voice Agent',
    eyebrow: 'Our Products',
    title:
      'AI voice agents built for qualification, intake, support, and handoff without losing operational control.',
    intro:
      'This product is designed for teams that need voice-first interactions to feel immediate, structured, and useful. Criyx builds voice agents that can answer defined questions, capture lead or service context, route conversations correctly, and escalate to people whenever the workflow moves beyond what automation should handle alone.',
    stats: [
      {
        value: '24/7',
        label: 'Voice coverage for inbound qualification, service intake, or guided customer response.',
      },
      {
        value: 'Real-time',
        label: 'Context retrieval and workflow decisions while the conversation is still in progress.',
      },
      {
        value: 'Human-safe',
        label: 'Escalation paths for ambiguity, urgency, compliance-sensitive cases, or low-confidence moments.',
      },
    ],
    pillars: [
      {
        title: 'Structured voice qualification',
        body:
          'The agent follows a clear conversational path so the business captures the details it actually needs, instead of producing long transcripts with no operational value.',
      },
      {
        title: 'Routing and action orchestration',
        body:
          'Once the call intent is understood, the system can tag the interaction, trigger follow-up tasks, update records, and send the case to the right queue or team.',
      },
      {
        title: 'Controlled escalation',
        body:
          'Not every call should stay automated. Criyx designs voice systems with transfer rules, fallback logic, and exception handling so the customer never gets trapped in a dead-end interaction.',
      },
    ],
    journey: [
      {
        step: '01',
        title: 'Capture intent and required fields',
        body:
          'The voice agent greets, frames the conversation, and collects the inputs the workflow needs, whether that means budget, location, service issue, appointment type, or product interest.',
      },
      {
        step: '02',
        title: 'Retrieve context and decide next action',
        body:
          'The system can check knowledge, compare rules, inspect the caller context, and determine whether it should answer, qualify further, create a task, or route to a person.',
      },
      {
        step: '03',
        title: 'Log outcomes and continue the workflow',
        body:
          'Every call should leave a usable record. Criyx connects the conversation outcome to CRM updates, ticketing actions, summaries, notifications, and follow-up sequences.',
      },
    ],
    useCases: [
      {
        title: 'Inbound sales qualification',
        body:
          'Screen incoming leads, capture structured requirements, score urgency, and book or route the opportunity without making the sales team repeat basic intake work.',
      },
      {
        title: 'Service intake and dispatch',
        body:
          'Collect issue details, identify severity, confirm location and contact data, then move the request into the right support or field operations flow.',
      },
      {
        title: 'Guided information response',
        body:
          'Handle repetitive voice questions around availability, process steps, documentation, or next actions while keeping the answer grounded in approved business context.',
      },
    ],
    modules: [
      {
        title: 'Conversation layer',
        points: [
          'Brand-appropriate greeting, tone, and response design.',
          'Prompting built around structured questions instead of open-ended drift.',
          'Low-latency voice turn handling for a more natural call experience.',
        ],
      },
      {
        title: 'Workflow layer',
        points: [
          'Routing rules for qualification, escalation, call outcomes, and follow-up actions.',
          'CRM, calendar, support, or internal tool integration based on the use case.',
          'Fallback handling when the conversation leaves the approved path.',
        ],
      },
      {
        title: 'Reporting layer',
        points: [
          'Call summaries that operators can use immediately.',
          'Visibility into conversion, transfer, abandonment, and exception patterns.',
          'Audit trails showing what the agent said, decided, and triggered.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Where do AI voice agents usually fit best?',
        answer:
          'They fit best in workflows where the first part of the conversation is structured and repetitive, such as qualification, intake, appointment screening, or standard support triage. The more clearly the required fields and routing logic are defined, the stronger the result.',
      },
      {
        question: 'Can the voice agent hand over to a human smoothly?',
        answer:
          'Yes. Criyx designs the handoff path as part of the system. That includes deciding when escalation should happen, what context should be passed to the human, and how the call outcome should be logged so the team does not lose continuity.',
      },
    ],
    ctaTitle:
      'If your team handles repetitive inbound calls, a voice agent should reduce workload and improve response quality at the same time.',
    ctaBody:
      'The right design depends on the workflow, the escalation conditions, and the systems that need to update after each interaction.',
  },
  {
    slug: 'marketing-agent',
    label: 'Marketing Agent',
    eyebrow: 'Our Products',
    title:
      'Marketing agents that help plan, generate, route, and review campaign work as an actual operating system.',
    intro:
      'Criyx treats a marketing agent as more than a copy generator. It should help marketing teams move from briefs to assets, from assets to approvals, and from approvals to publishing without losing brand consistency or execution speed. The system is designed to support the workflow, not replace every marketer in it.',
    stats: [
      {
        value: 'Multi-channel',
        label: 'Built for content and workflow support across email, social, landing pages, outbound, and internal launch coordination.',
      },
      {
        value: 'Approval-ready',
        label: 'Drafts, variants, and recommended next steps presented in formats teams can review quickly.',
      },
      {
        value: 'Ops-focused',
        label: 'Useful for campaign management, coordination, distribution, and reporting, not only ideation.',
      },
    ],
    pillars: [
      {
        title: 'Brief-to-output execution',
        body:
          'The agent translates campaign inputs into tasks, copy directions, asset needs, channel variants, and next actions so execution starts with more clarity.',
      },
      {
        title: 'Brand and workflow consistency',
        body:
          'Outputs are grounded in approved messaging, offer positioning, and content rules so the system supports the brand instead of adding more cleanup work.',
      },
      {
        title: 'Operational support for the team',
        body:
          'A good marketing agent helps with routing, summarizing, checklists, performance notes, and campaign follow-through, not just headline generation.',
      },
    ],
    journey: [
      {
        step: '01',
        title: 'Interpret the campaign brief',
        body:
          'The system captures objectives, audience, offer, timing, channel mix, and conversion goals so every next action is tied to a real campaign frame.',
      },
      {
        step: '02',
        title: 'Generate and organize deliverables',
        body:
          'The agent can produce draft copy, asset outlines, launch tasks, approval packets, and channel-specific variants in a review-friendly structure.',
      },
      {
        step: '03',
        title: 'Support launch and iteration',
        body:
          'After approval, the system can route tasks, summarize campaign status, surface missing assets, and prepare post-launch reporting notes for the team.',
      },
    ],
    useCases: [
      {
        title: 'Campaign rollout support',
        body:
          'Move from brief to launch checklist faster by generating structured assets, workback plans, and channel-ready first drafts.',
      },
      {
        title: 'Always-on content operations',
        body:
          'Keep recurring content programs moving with systems for ideation, draft creation, internal review, and publishing support.',
      },
      {
        title: 'Sales and marketing alignment',
        body:
          'Produce messaging packs, outbound variations, enablement summaries, and launch notes that sales teams can actually use.',
      },
    ],
    modules: [
      {
        title: 'Planning layer',
        points: [
          'Campaign brief intake with audience, goal, and channel structure.',
          'Task sequencing for launches, approvals, dependencies, and review cycles.',
          'Reusable templates for repeated campaign motions.',
        ],
      },
      {
        title: 'Generation layer',
        points: [
          'Copy generation for email, social, landing pages, and outbound support.',
          'Variant creation for different channels, personas, or offers.',
          'Structured output formats that reduce manual rework.',
        ],
      },
      {
        title: 'Reporting layer',
        points: [
          'Launch summaries, status updates, and handoff notes.',
          'Performance review scaffolding for weekly or campaign-level reporting.',
          'Visibility into bottlenecks, incomplete approvals, and missing assets.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Does a marketing agent only generate copy?',
        answer:
          'No. Criyx treats it as a workflow product, not a writing toy. The stronger use case is helping the team move from brief to assets, approvals, launch readiness, and reporting support with less coordination overhead.',
      },
      {
        question: 'How do you keep the outputs aligned with the brand?',
        answer:
          'The agent is grounded in approved messaging, offer context, audience framing, and content rules. Review steps still matter, but the system starts much closer to what the team actually wants to publish.',
      },
    ],
    ctaTitle:
      'Marketing teams usually do not need more raw ideas. They need a system that helps campaigns move cleanly from brief to launch.',
    ctaBody:
      'Criyx builds that system around the channels, reviewers, content standards, and approval steps your team already works with.',
  },
  {
    slug: 'content-generator',
    label: 'Content Generator',
    eyebrow: 'Our Products',
    title:
      'Content generation systems that turn source material into usable, reviewable, brand-consistent outputs at scale.',
    intro:
      'This product is for teams that need content creation to be faster without making it chaotic. Criyx builds generation systems that pull from approved source material, apply structure to the output, and fit into an editorial or commercial workflow that still includes review, correction, and publishing control.',
    stats: [
      {
        value: 'Long-form',
        label: 'Supports blog posts, landing pages, product explainers, guides, and internal documentation.',
      },
      {
        value: 'Variant-ready',
        label: 'Creates multiple versions for channels, audiences, or formats from one content base.',
      },
      {
        value: 'Review-safe',
        label: 'Built for revision loops, approval checkpoints, and quality control before publishing.',
      },
    ],
    pillars: [
      {
        title: 'Source-grounded generation',
        body:
          'The system should create from validated product context, briefs, offers, notes, or knowledge sources so the output is easier to trust and edit.',
      },
      {
        title: 'Structured drafting',
        body:
          'Criyx designs generation flows that can produce outlines, first drafts, alternate versions, summaries, and formatted deliverables instead of unstructured text blocks.',
      },
      {
        title: 'Editorial workflow support',
        body:
          'Good content systems respect owners, reviewers, publishing rules, and revision steps so the output fits the team process rather than disrupting it.',
      },
    ],
    journey: [
      {
        step: '01',
        title: 'Ingest the source material',
        body:
          'The system receives product notes, campaign context, interview points, offer details, or internal references that define what the content must actually say.',
      },
      {
        step: '02',
        title: 'Generate structured drafts and variants',
        body:
          'Criyx can produce outlines, body copy, social derivatives, sales collateral, or multiple angle variations based on the same source pack.',
      },
      {
        step: '03',
        title: 'Route the draft into review and publishing',
        body:
          'Content should move into editing, approval, CMS upload, or distribution workflows with version visibility and ownership built in.',
      },
    ],
    useCases: [
      {
        title: 'Blog and SEO production',
        body:
          'Generate first drafts, summaries, meta ideas, and repurposed channel copy while keeping the article tied to the real source material.',
      },
      {
        title: 'Product and sales collateral',
        body:
          'Create product pages, one-pagers, feature explainers, outbound snippets, and FAQ-style assets from a single approved knowledge base.',
      },
      {
        title: 'Internal knowledge content',
        body:
          'Turn notes, decisions, and operational documentation into clean internal references that are easier for teams to read and reuse.',
      },
    ],
    modules: [
      {
        title: 'Source layer',
        points: [
          'Knowledge inputs from briefs, notes, product docs, and approved reference material.',
          'Context controls that keep generation closer to the intended message.',
          'Formatting rules for content type, length, and audience expectations.',
        ],
      },
      {
        title: 'Generation layer',
        points: [
          'Outline, draft, summarize, rewrite, and repurpose flows.',
          'Support for multiple content formats from a single source pack.',
          'Variant generation that remains consistent with the core message.',
        ],
      },
      {
        title: 'Governance layer',
        points: [
          'Review and approval steps before publishing or sending.',
          'Version visibility so teams can compare outputs and revisions.',
          'Quality gates for tone, structure, and unacceptable claim patterns.',
        ],
      },
    ],
    faqs: [
      {
        question: 'What makes this different from a basic AI writing tool?',
        answer:
          'A basic tool generates text. This product is designed as a content system. It starts from approved source material, produces structured deliverables, and fits into a real review and publishing workflow so the output is easier to trust.',
      },
      {
        question: 'Can it create multiple formats from the same source?',
        answer:
          'Yes. One of the main advantages is turning a single source pack into long-form content, short-form derivatives, internal summaries, outbound snippets, or channel variants without rebuilding the context from scratch each time.',
      },
    ],
    ctaTitle:
      'A content generator becomes valuable when it saves time without creating new review chaos.',
    ctaBody:
      'Criyx builds content systems around your actual source material, publishing flow, and quality standard so the outputs are useful from day one.',
  },
  {
    slug: 'exhibition-lead-capture',
    label: 'Exhibition Lead Capture',
    eyebrow: 'Our Products',
    title:
      'Exhibition lead capture systems that turn booth traffic into tagged, trackable follow-up without losing context after the event.',
    intro:
      'Teams often lose value after exhibitions because lead details are incomplete, follow-up is delayed, and the context of the booth conversation disappears. Criyx builds exhibition lead capture systems that collect visitor details quickly, qualify interest while the interaction is still fresh, send the right material, and route the lead into the correct sales or follow-up workflow immediately. WhatsApp can be part of that system, but the product is built around lead capture and conversion, not only the messaging channel.',
    stats: [
      {
        value: 'Instant',
        label: 'Lead capture and follow-up starts while the event conversation is still fresh.',
      },
      {
        value: 'Tagged',
        label: 'Contacts are grouped by product interest, urgency, segment, or event-specific qualifiers.',
      },
      {
        value: 'Tracked',
        label: 'The sales team can see what was captured, what was sent, and which leads still need action.',
      },
    ],
    pillars: [
      {
        title: 'Fast event lead capture',
        body:
          'The workflow makes it easy for booth visitors to enter the system without long forms, manual typing, or messy post-event cleanup.',
      },
      {
        title: 'Useful qualification and follow-up',
        body:
          'Criyx adds logic for product interest, timeline, buyer intent, geography, and next-step routing so the captured lead is commercially meaningful and ready for action.',
      },
      {
        title: 'Sales-ready visibility',
        body:
          'Every event lead should end up with context, tags, and the right owner. That is how event traffic becomes pipeline instead of a spreadsheet backlog.',
      },
    ],
    journey: [
      {
        step: '01',
        title: 'Capture and confirm the contact',
        body:
          'The visitor enters through a QR, short link, form, kiosk flow, or staff-assisted interaction and receives an immediate confirmation that the lead has been captured.',
      },
      {
        step: '02',
        title: 'Qualify and segment the lead',
        body:
          'The system asks the small number of questions needed to tag the lead correctly and determine which product, team, or sequence should follow.',
      },
      {
        step: '03',
        title: 'Send content and assign ownership',
        body:
          'Relevant material can be sent instantly while the lead record is updated, the right sales owner is alerted, and the next follow-up task is created.',
      },
    ],
    useCases: [
      {
        title: 'Booth lead capture at exhibitions',
        body:
          'Convert walk-up traffic into a tagged and trackable lead flow without depending on paper cards or manual CRM entry after the event.',
      },
      {
        title: 'Product-specific lead qualification',
        body:
          'Direct visitors toward the relevant offer, team, or product line based on what they actually asked about at the booth.',
      },
      {
        title: 'Immediate and post-event follow-up',
        body:
          'Continue the conversation with the right documents, reminders, next steps, and internal owner visibility so the lead does not go cold.',
      },
    ],
    modules: [
      {
        title: 'Entry layer',
        points: [
          'QR, short link, kiosk, or assisted booth capture flows.',
          'Opt-in confirmation and contact validation.',
          'Event-specific entry logic for region, booth, or product line.',
        ],
      },
      {
        title: 'Automation layer',
        points: [
          'Segmentation and tagging based on structured questions.',
          'Instant send-outs for brochures, offers, demo links, or scheduling options.',
          'Routing logic for owner assignment and follow-up sequence selection.',
        ],
      },
      {
        title: 'Sales coordination layer',
        points: [
          'CRM updates and task creation after each completed interaction.',
          'Visibility into unanswered leads and pending callbacks.',
          'Event-level reporting on interest patterns and follow-up progress.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Why build a dedicated exhibition lead capture system?',
        answer:
          'Because it reduces the gap between the live event conversation and the first next step. Teams capture better context while it is still fresh, sales gets a cleaner handoff, and follow-up starts before the lead goes cold. WhatsApp can be one part of that system, but the main value is the overall capture and routing flow.',
      },
      {
        question: 'Can the system route leads to different teams or products?',
        answer:
          'Yes. That is one of the main reasons to build it properly. The workflow can tag by interest, urgency, geography, or segment and then send the lead into the right owner queue, content path, or follow-up sequence.',
      },
    ],
    ctaTitle:
      'Exhibition traffic only matters if lead capture and follow-up are fast, organized, and visible to sales.',
    ctaBody:
      'Criyx builds the lead capture system that moves visitors from booth interaction to tagged, trackable pipeline with far less manual cleanup.',
  },
  {
    slug: 'workflow-automation',
    label: 'Workflow Automation',
    eyebrow: 'Our Products',
    title:
      'Workflow automation systems that connect triggers, context, approvals, AI steps, and reporting into one operating flow.',
    intro:
      'This product is for businesses that want to reduce manual coordination across recurring work. Criyx builds workflow automations that do more than pass data from one tool to another. They route decisions, check conditions, summarize context, trigger follow-up actions, and preserve visibility so the process still feels governable after launch.',
    stats: [
      {
        value: 'Cross-system',
        label: 'Designed to work across CRMs, support tools, forms, messaging layers, docs, and internal operating software.',
      },
      {
        value: 'Approval-led',
        label: 'Sensitive steps can stay behind human checkpoints while low-risk tasks continue automatically.',
      },
      {
        value: 'Audit-ready',
        label: 'Outcomes, exceptions, and triggered actions remain visible for teams that need trust and accountability.',
      },
    ],
    pillars: [
      {
        title: 'Business-rule orchestration',
        body:
          'Criyx maps the actual decision rules inside the workflow so the automation behaves like an operating process, not a brittle chain of tool actions.',
      },
      {
        title: 'AI where it adds leverage',
        body:
          'Automation can include summarization, routing support, content generation, or recommendation logic, but only where that improves the workflow.',
      },
      {
        title: 'Exception and fallback handling',
        body:
          'Strong automation systems are clear about where they stop, when they escalate, and how they behave when the input does not fit the expected pattern.',
      },
    ],
    journey: [
      {
        step: '01',
        title: 'Trigger and gather context',
        body:
          'The workflow begins with a form, message, ticket, lead, update, or business event and gathers the data needed to decide what should happen next.',
      },
      {
        step: '02',
        title: 'Route, enrich, and decide',
        body:
          'The system can apply business rules, request AI help where appropriate, retrieve reference context, and determine the correct action path.',
      },
      {
        step: '03',
        title: 'Approve, execute, and record',
        body:
          'Tasks are completed, stakeholders are notified, systems are updated, and the final outcome is logged in a way the team can inspect later.',
      },
    ],
    useCases: [
      {
        title: 'Lead and revenue operations',
        body:
          'Clean, enrich, score, route, and follow up on inbound opportunities without losing ownership or response quality.',
      },
      {
        title: 'Support and escalation flows',
        body:
          'Summarize requests, tag priority, send the case to the correct queue, and keep internal visibility on pending action.',
      },
      {
        title: 'Internal reporting and coordination',
        body:
          'Turn repeated manual updates, summaries, reminders, and cross-team notifications into a connected operating system.',
      },
    ],
    modules: [
      {
        title: 'Integration layer',
        points: [
          'Triggers from the systems your team already uses.',
          'Data movement between CRM, support, docs, messaging, and internal tools.',
          'Field mapping and context preservation across steps.',
        ],
      },
      {
        title: 'Decision layer',
        points: [
          'Rule-based branching and approval checkpoints.',
          'Optional AI steps for summarization, categorization, or guided recommendations.',
          'Fallback handling for incomplete or ambiguous cases.',
        ],
      },
      {
        title: 'Observability layer',
        points: [
          'Status visibility for operators and managers.',
          'Exception tracking and retry awareness.',
          'Outcome logs that make the workflow easier to trust and tune.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Do workflow automations always need AI inside them?',
        answer:
          'No. Criyx uses AI only where it adds leverage. Some steps should stay deterministic and rule-based. Others benefit from summarization, classification, or context synthesis. The system should reflect the real needs of the workflow, not force AI everywhere.',
      },
      {
        question: 'How do you keep automations from becoming black boxes?',
        answer:
          'By designing for visibility from the start. That means clear triggers, readable logic, approval points where needed, outcome logs, and exception handling that operators can actually inspect instead of guess about later.',
      },
    ],
    ctaTitle:
      'The value of workflow automation comes from reducing friction without hiding how the business process works.',
    ctaBody:
      'Criyx builds automation systems that move faster while still leaving the team with visibility, control, and clear exception handling.',
  },
  {
    slug: 'custom-apps',
    label: 'Custom Apps',
    eyebrow: 'Our Products',
    title:
      'Custom apps and operator-facing software built around the workflow that the AI system is supposed to improve.',
    intro:
      'Some workflows do not just need automation behind the scenes. They need a surface people can use every day. Criyx builds internal tools, control panels, dashboards, and lightweight web apps that sit on top of AI-driven workflows so teams can review outputs, approve actions, monitor status, and keep control of the process.',
    stats: [
      {
        value: 'Operator-first',
        label: 'Designed around the people who need to review, approve, correct, and act on the system every day.',
      },
      {
        value: 'Workflow-fit',
        label: 'Interfaces are shaped by the real process, not by generic SaaS templates.',
      },
      {
        value: 'Deployment-ready',
        label: 'Connected to the automation, reporting, and business tools that need to participate in the workflow.',
      },
    ],
    pillars: [
      {
        title: 'Practical control surfaces',
        body:
          'The app should give the team the smallest useful interface for reviewing work, acting on exceptions, and monitoring the system without extra complexity.',
      },
      {
        title: 'Embedded workflow intelligence',
        body:
          'AI features become more useful when they live inside the place where people already make decisions, approve actions, and inspect context.',
      },
      {
        title: 'Business-specific usability',
        body:
          'Criyx designs around your process, vocabulary, handoffs, and reporting needs so the software feels tied to the operation instead of to a generic template.',
      },
    ],
    journey: [
      {
        step: '01',
        title: 'Map the operator journey',
        body:
          'We identify who needs to use the app, what decisions they make, which records they inspect, and what actions should be available from the interface.',
      },
      {
        step: '02',
        title: 'Design the workflow surface',
        body:
          'The app is structured around queues, approvals, summaries, dashboards, forms, or actions that reflect the real operating motion of the team.',
      },
      {
        step: '03',
        title: 'Connect the app to the automation layer',
        body:
          'The interface then connects to the workflows, records, and reporting signals that keep the system useful after launch.',
      },
    ],
    useCases: [
      {
        title: 'Approval and exception centers',
        body:
          'Give managers or operators one place to review AI outputs, approve sensitive actions, correct edge cases, and keep the workflow moving.',
      },
      {
        title: 'Internal operations portals',
        body:
          'Create lightweight tools for support, sales ops, delivery, or internal reporting teams that need structured workflow visibility.',
      },
      {
        title: 'Customer-facing workflow surfaces',
        body:
          'Build simple web experiences that expose the right AI-assisted flow to users without revealing the complexity behind the scenes.',
      },
    ],
    modules: [
      {
        title: 'Interface layer',
        points: [
          'Dashboards, queues, records, and action panels aligned to the workflow.',
          'Views tailored to roles such as operators, managers, or reviewers.',
          'Useful information hierarchy instead of generic admin clutter.',
        ],
      },
      {
        title: 'Action layer',
        points: [
          'Approve, reject, edit, reroute, trigger, or escalate actions from the interface.',
          'Embedded summaries, AI assistance, and workflow context where decisions happen.',
          'Connected state changes that update the wider system immediately.',
        ],
      },
      {
        title: 'Governance layer',
        points: [
          'Permission-aware access and role-sensitive actions.',
          'Activity logs showing who changed what and when.',
          'Reporting hooks for throughput, exception rates, and team usage.',
        ],
      },
    ],
    faqs: [
      {
        question: 'When does a workflow need a custom app instead of just automation?',
        answer:
          'It needs a custom app when people still have to review, approve, correct, compare, or act on the workflow regularly. If the team needs a daily operating surface, pure background automation is usually not enough.',
      },
      {
        question: 'Are these apps only for internal teams?',
        answer:
          'Not necessarily. Many are internal tools, but the same model can support customer-facing workflow surfaces when a business wants users to interact with an AI-assisted process through a controlled interface.',
      },
    ],
    ctaTitle:
      'When the workflow needs a real operating surface, automation alone is not enough.',
    ctaBody:
      'Criyx can build the software layer that makes the AI system understandable, actionable, and maintainable for the people who use it.',
  },
];

export const productNavItems = productPages.map((product) => ({
  label: product.label,
  to: `/products/${product.slug}`,
}));

export const productCatalog = productPages.map((product) => ({
  id: product.slug,
  title: product.label,
  body: product.intro,
  to: `/products/${product.slug}`,
}));

export const technologies = [
  { label: 'n8n', iconKey: 'n8n', mark: 'n' },
  { label: 'Claude', iconKey: 'claude', mark: 'C' },
  { label: 'OpenAI', iconKey: 'openai', mark: 'O' },
  { label: 'Make', iconKey: 'make', mark: 'M' },
  { label: 'LangChain', iconKey: 'langchain', mark: 'L' },
  { label: 'Flutter', iconKey: 'flutter', mark: 'F' },
  { label: 'Twilio', iconKey: 'twilio', mark: 'T' },
  { label: 'React', iconKey: 'react', mark: 'R' },
];

export const whyUsStats = [
  {
    value: '21+',
    label:
      'Teams supported across operations, sales, service, and internal reporting workflows.',
  },
  {
    value: '4 weeks',
    label:
      'Average sprint to move from workflow audit to a usable AI-assisted production system.',
  },
  {
    value: '24/7',
    label:
      'Automation coverage for repetitive business actions that should not wait on manual follow-up.',
  },
];

export const whyUsPrinciples = [
  {
    title: 'Business-first scoping',
    body:
      'Criyx starts with the real operating issue, the owner of the workflow, and the outcome metric that matters. That means the solution is anchored to cost, speed, quality, or throughput from day one.',
  },
  {
    title: 'Systems that survive handoff',
    body:
      'The delivery model must produce a workflow your internal team can understand and maintain. Documentation, approvals, exceptions, and ownership paths are treated as part of the product, not cleanup work.',
  },
  {
    title: 'Practical AI orchestration',
    body:
      'We combine models, automations, data routing, and interfaces only where they add leverage. If a workflow should stay deterministic, Criyx keeps it deterministic.',
  },
  {
    title: 'Clear operational governance',
    body:
      'Decision-makers need visibility into what the system does, when it escalates, and where it can fail. Criyx builds with those controls in place so AI does not become a black box inside the business.',
  },
];

export const engagementModel = [
  {
    step: '01',
    title: 'Discovery with operating context',
    body:
      'We map the current workflow, identify human dependencies, inspect tool usage, and clarify where the highest-value improvements are likely to come from.',
  },
  {
    step: '02',
    title: 'Solution architecture and risk mapping',
    body:
      'Criyx defines inputs, outputs, approval points, fallbacks, prompt strategy, and integration requirements so the plan is implementation-ready before building starts.',
  },
  {
    step: '03',
    title: 'Delivery with measurable checkpoints',
    body:
      'The system is rolled out in stages with visible milestones, stakeholder reviews, and acceptance criteria that confirm whether the workflow is genuinely better than the prior state.',
  },
  {
    step: '04',
    title: 'Operational refinement after launch',
    body:
      'We review real usage, exception rates, model behavior, and business outcomes to tune the system instead of treating deployment as the finish line.',
  },
];

export const proofPoints = [
  {
    title: 'For buyers',
    body:
      'The commercial case stays concrete. Criyx frames each engagement around efficiency, service quality, speed to action, or revenue leverage rather than vague AI positioning.',
  },
  {
    title: 'For operators',
    body:
      'Teams receive interfaces and workflows that reduce repetitive effort, improve consistency, and still leave room for manual control when a process requires judgment.',
  },
  {
    title: 'For leadership',
    body:
      'Executives get the reporting, guardrails, and implementation visibility needed to support AI adoption without losing trust in how the system behaves.',
  },
];

export const whyUsCta = {
  title: 'If you need AI to improve execution instead of just sounding modern, Criyx is built for that.',
  body:
    'We focus on clear delivery, measurable outcomes, and systems that fit how real teams already work.',
};

export const benefitHighlights = [
  {
    title: 'Lower manual workload',
    body:
      'Repetitive updates, routing, summaries, and triage tasks can be automated so teams spend more time on decision-making and customer-facing work.',
  },
  {
    title: 'Faster operational response',
    body:
      'Criyx shortens the distance between new information and the action it should trigger, whether that means internal escalation, customer follow-up, or management review.',
  },
  {
    title: 'Better decision quality',
    body:
      'Teams should receive structured outputs, synthesized data, and clearer recommendation logic so business decisions are less dependent on fragmented manual analysis.',
  },
  {
    title: 'Improved consistency',
    body:
      'With defined prompts, rules, and workflows, outputs become more repeatable across operators, shifts, and departments, which makes scaling easier.',
  },
];

export const benefitOutcomes = [
  {
    title: 'Operational relief for growing teams',
    body:
      'As volume increases, headcount is not the only lever available. Criyx helps remove repetitive coordination work before it turns into process drag.',
  },
  {
    title: 'More useful visibility for managers',
    body:
      'Leads and managers get summaries, alerts, and dashboard signals that are easier to act on than raw system data or scattered notes.',
  },
  {
    title: 'More dependable customer follow-through',
    body:
      'When reminders, routing, documentation, and status updates are consistent, the customer experience becomes steadier without requiring more manual chasing.',
  },
];

export const benefitUseCases = [
  {
    step: 'A',
    title: 'Lead qualification and routing',
    body:
      'Inbound data can be reviewed, categorized, prioritized, and routed automatically so sales teams start with cleaner context and less admin overhead.',
  },
  {
    step: 'B',
    title: 'Internal reporting and summaries',
    body:
      'Criyx can condense performance data, operations logs, and team updates into readable reporting packs for leaders who need signal, not noise.',
  },
  {
    step: 'C',
    title: 'Support and escalation workflows',
    body:
      'Requests can be tagged, summarized, drafted, or escalated based on defined rules so service teams move faster without losing control.',
  },
  {
    step: 'D',
    title: 'Knowledge access for teams',
    body:
      'Internal documents, decisions, and reference material can be made easier to search and use inside day-to-day execution workflows.',
  },
];

export const featurePillars = [
  {
    title: 'AI workflow orchestration',
    body:
      'We design flows that combine model calls, tool actions, routing logic, approvals, and human review into one operating sequence.',
  },
  {
    title: 'Prompt and decision design',
    body:
      'Criyx defines prompts, instructions, guardrails, and fallback behaviors so responses are more stable and better aligned with the workflow.',
  },
  {
    title: 'Integrations with your stack',
    body:
      'The system must connect with the tools your team already depends on, from communication platforms to internal dashboards and operational software.',
  },
  {
    title: 'Reporting and observability',
    body:
      'Teams need to see what happened, why it happened, and where exceptions occurred. Criyx builds those views into the delivery.',
  },
];

export const featureModules = [
  {
    title: 'Automation layer',
    points: [
      'Trigger-based workflows for repetitive actions',
      'Conditional routing and escalation logic',
      'Approval gates for sensitive operations',
    ],
  },
  {
    title: 'Data and context layer',
    points: [
      'Structured inputs pulled from business systems',
      'Knowledge retrieval for grounded responses',
      'Summaries that preserve useful context',
    ],
  },
  {
    title: 'Interface layer',
    points: [
      'Operator-facing tools for review and action',
      'Leadership views for performance and risk tracking',
      'Practical dashboards instead of opaque automations',
    ],
  },
];

export const featureDeliveryFlow = [
  {
    step: '01',
    title: 'Workflow mapping',
    body:
      'We document where work enters the system, who touches it, what information is needed, and where decisions currently slow down.',
  },
  {
    step: '02',
    title: 'Tooling blueprint',
    body:
      'Criyx selects the right orchestration, model, interface, and integration approach based on the needs of the workflow instead of forcing one stack everywhere.',
  },
  {
    step: '03',
    title: 'Build and validate',
    body:
      'Each feature is tested against real use cases, not abstract examples, so the system reflects the operating conditions it will actually face.',
  },
  {
    step: '04',
    title: 'Launch with visibility',
    body:
      'We put reporting, ownership, and exception handling in place so the feature can be trusted after release.',
  },
];

export const faqCategories = [
  {
    title: 'Engagement model',
    body:
      'These questions cover how Criyx works, how projects are scoped, and what the build process looks like from the client side.',
    items: [
      {
        question: 'What does a first engagement with Criyx usually look like?',
        answer:
          'Most engagements begin with a workflow audit and implementation outline. We identify the process to improve, define the target business outcome, and map the systems that will need to participate in the solution.',
      },
      {
        question: 'Do you only advise, or do you also deliver the system?',
        answer:
          'Criyx can handle strategy, architecture, workflow design, implementation, and post-launch refinement. The goal is to move from idea to a working operating layer, not stop at planning.',
      },
      {
        question: 'How long does a project usually take?',
        answer:
          'That depends on the number of systems, approval points, and workflow branches involved. A focused workflow can move quickly, while multi-team operations require a more staged rollout.',
      },
    ],
  },
  {
    title: 'Technical approach',
    body:
      'These answers explain how Criyx thinks about reliability, integrations, data context, and model usage in production workflows.',
    items: [
      {
        question: 'How do you make AI outputs reliable enough for business use?',
        answer:
          'We treat reliability as a system design problem. That means prompts are not enough on their own. Criyx uses routing logic, approval checkpoints, retrieval context, monitoring, and fallback rules to keep critical flows dependable.',
      },
      {
        question: 'Can Criyx work with our existing tools?',
        answer:
          'Yes, that is usually the preferred path. We design around the systems teams already use whenever possible so adoption is faster and the rollout is less disruptive.',
      },
      {
        question: 'Do you use a single model or multiple systems together?',
        answer:
          'The stack depends on the workflow. Some flows only need one model and deterministic routing. Others benefit from orchestration across multiple tools and data sources.',
      },
    ],
  },
  {
    title: 'Commercial and operational fit',
    body:
      'These are the common questions from buyers and decision-makers who want to know whether Criyx is the right fit before committing time and budget.',
    items: [
      {
        question: 'What kind of company is the best fit for Criyx?',
        answer:
          'Teams with recurring workflows, meaningful business data, and pressure to improve speed or operational consistency usually benefit most from the approach.',
      },
      {
        question: 'How do you show value after launch?',
        answer:
          'We define operational metrics early, then track whether the system reduces manual work, improves response quality, shortens turnaround time, or creates clearer decision visibility.',
      },
      {
        question: 'Can Criyx start small and expand later?',
        answer:
          'Yes. A focused first workflow is often the best way to prove value, build confidence, and create a practical foundation for broader AI adoption later on.',
      },
    ],
  },
];

export const contactOptions = [
  {
    title: 'Workflow audit',
    body:
      'Best if you know there is friction in the process but need help finding the highest-value place to start.',
    action: 'Discuss an audit',
  },
  {
    title: 'Implementation planning',
    body:
      'Best if you already know the workflow to improve and want a concrete delivery plan, stack direction, and rollout path.',
    action: 'Plan delivery',
  },
  {
    title: 'System refinement',
    body:
      'Best if you already have AI or automation in place and need to improve reliability, usability, or reporting quality.',
    action: 'Improve an existing system',
  },
];

export const contactSteps = [
  {
    step: '01',
    title: 'Share the workflow or operating problem',
    body:
      'Explain what the team is doing today, where the bottleneck appears, and what result would actually matter if the process improved.',
  },
  {
    step: '02',
    title: 'Review constraints and systems',
    body:
      'Criyx looks at tools, approvals, data availability, and workflow complexity to make sure the recommendation fits the real environment.',
  },
  {
    step: '03',
    title: 'Receive a practical direction',
    body:
      'You get a grounded view of what should be automated, what should stay manual, and what the implementation path would look like.',
  },
];

export const processJourney = [
  {
    step: '01',
    label: 'Discovery',
    title: 'We start by finding the real operating problem, not just the AI idea.',
    summary:
      'The first stage is about understanding the actual workflow, the team involved, and the pressure points that make the process slow, inconsistent, or hard to scale.',
    body:
      'Criyx reviews how work currently moves through the business, where context is lost, where people are repeating manual tasks, and where decision quality depends too heavily on fragmented information. This is where we separate interesting possibilities from the workflow that is most worth improving first.',
    deliverables: [
      'Current-state workflow map with owners, systems, and handoffs.',
      'Initial risk list showing where automation or AI could fail if applied carelessly.',
      'Shortlist of high-value workflows ranked by urgency, complexity, and measurable upside.',
    ],
    outcome:
      'By the end of discovery, the team should know exactly which workflow is being targeted and why it matters.',
  },
  {
    step: '02',
    label: 'Strategy',
    title: 'We define the business outcome and the rules the system must respect.',
    summary:
      'Before building anything, Criyx translates the workflow into operating goals, implementation constraints, and governance rules.',
    body:
      'This stage turns business intent into a delivery direction. We define what the workflow should improve, what still needs human review, how exceptions should be handled, and what kinds of model outputs are acceptable inside the process. It keeps the implementation grounded and stops the project from drifting into generic AI experimentation.',
    deliverables: [
      'Success metrics tied to throughput, quality, response time, or reporting clarity.',
      'Decision rules covering approvals, escalation paths, and fallback behavior.',
      'Implementation scope that keeps the first release practical and defensible.',
    ],
    outcome:
      'The system has a clear operating brief, so every later design choice can be evaluated against the same business logic.',
  },
  {
    step: '03',
    label: 'Architecture',
    title: 'We design the workflow as a connected system of inputs, actions, and checkpoints.',
    summary:
      'This is the point where the process becomes concrete. Criyx maps the orchestration layer, the data context, the prompts, the integrations, and the places where humans stay in the loop.',
    body:
      'A strong AI workflow is not a single prompt. It is a connected operating flow that decides what information enters the system, how it is interpreted, when tools are triggered, what response format is allowed, and when the output needs review. We design the flow so it is understandable to both technical and non-technical stakeholders.',
    deliverables: [
      'System blueprint covering model usage, tooling, routing logic, and interfaces.',
      'Prompt and context strategy designed for repeatable outputs rather than one-off responses.',
      'Exception-handling plan for sensitive, ambiguous, or low-confidence cases.',
    ],
    outcome:
      'Everyone involved can see how the system will behave before implementation starts, which reduces surprises and weak assumptions.',
  },
  {
    step: '04',
    label: 'Build',
    title: 'We implement the workflow with real operational conditions in mind.',
    summary:
      'The build stage turns the architecture into a working system using the right mix of automation, model logic, interfaces, and reporting.',
    body:
      'Criyx builds against actual use cases instead of idealized examples. That means the workflow is tested against real business inputs, expected exception cases, and the practical needs of the people who will use it. The objective is not just technical completion. It is operational usefulness on day one.',
    deliverables: [
      'Working workflow with connected tools, prompts, and control logic.',
      'Operator-ready interfaces or views for review, approval, and follow-up.',
      'Acceptance checks against the original success criteria defined earlier in the process.',
    ],
    outcome:
      'The team receives a system that is usable in context, not a fragile prototype that only works in a demo.',
  },
  {
    step: '05',
    label: 'Launch',
    title: 'We release with visibility, training, and enough structure for adoption.',
    summary:
      'Launch is where trust is either created or lost. Criyx focuses on making the workflow understandable, monitorable, and easy to operate across the people who own it.',
    body:
      'A process only matters if the business can keep using it after go-live. We make sure the workflow has reporting, ownership clarity, alerting, and documentation so the team can see what is happening and respond when conditions change. This makes adoption smoother and prevents the system from becoming a black box.',
    deliverables: [
      'Launch checklist covering readiness, ownership, and communication.',
      'Monitoring and reporting views for ongoing visibility into workflow behavior.',
      'Documentation that supports internal handoff and day-to-day operation.',
    ],
    outcome:
      'The workflow enters the business as an operating system with visibility and accountability, not as a one-time deployment.',
  },
  {
    step: '06',
    label: 'Refinement',
    title: 'We optimize the workflow using real usage data and exception patterns.',
    summary:
      'After launch, Criyx reviews how the system behaves under live conditions and adjusts the workflow to improve reliability, clarity, and business impact.',
    body:
      'No serious workflow stays static. Teams change, exceptions surface, and new bottlenecks appear once a process is running at scale. Criyx uses operational feedback to tune prompts, approvals, routing logic, and reporting so the system continues to earn trust over time.',
    deliverables: [
      'Post-launch review of outcomes, exception rates, and operator feedback.',
      'Prioritized refinement list for the next cycle of improvements.',
      'A roadmap for expanding the workflow or applying the model to adjacent processes.',
    ],
    outcome:
      'The system improves with use, which is how AI becomes a durable operating advantage instead of a short-lived initiative.',
  },
];

export const servicePages = [
  {
    slug: 'ai-automation',
    label: 'AI Automation',
    eyebrow: 'Services',
    overviewBody:
      'Automation systems that reduce repetitive work, improve routing, and keep business execution moving with more consistency.',
    bullets: [
      'Workflow orchestration for internal operations and customer-facing tasks.',
      'Approval logic, exception handling, and fallback paths for sensitive actions.',
      'Reporting and summaries that keep operators and managers in control.',
    ],
    title:
      'AI automation systems built to remove repetitive operational work without removing operational oversight.',
    intro:
      'Criyx designs automation systems for teams that need work to move faster, cleaner, and with less manual coordination. The focus is not only triggering actions. It is building a dependable operating flow with routing logic, approvals, context retrieval, summaries, and reporting so the process remains usable once volume grows.',
    stats: [
      {
        value: 'Faster',
        label: 'Reduce turnaround time between new information and the action the business should take next.',
      },
      {
        value: 'Safer',
        label: 'Approval gates and fallback rules keep sensitive workflow steps from becoming uncontrolled automations.',
      },
      {
        value: 'Clearer',
        label: 'Structured logs, summaries, and visibility make the system easier to trust and operate.',
      },
    ],
    pillars: [
      {
        title: 'Workflow-first design',
        body:
          'We map how work really moves, who owns the decision, what context is required, and where repetitive effort is slowing the business down before automation is introduced.',
      },
      {
        title: 'Controlled execution',
        body:
          'Automations are built with conditions, approvals, escalation paths, and exception handling so the workflow remains dependable under real operating pressure.',
      },
      {
        title: 'Operational visibility',
        body:
          'Teams get summaries, status signals, and reporting surfaces that make the automation understandable after launch rather than opaque in production.',
      },
    ],
    journey: [
      {
        step: '01',
        title: 'Map the repetitive workflow',
        body:
          'We document where the process starts, what data it needs, which people are involved, and where delay or inconsistency is currently introduced.',
      },
      {
        step: '02',
        title: 'Design the automation logic',
        body:
          'Criyx defines triggers, decision points, escalations, approvals, summaries, and fallback behavior so the workflow is production-ready before implementation.',
      },
      {
        step: '03',
        title: 'Launch with reporting and controls',
        body:
          'The finished system includes the operator views, notifications, and audit signals required to manage the workflow once it is live.',
      },
    ],
    useCases: [
      {
        title: 'Lead qualification and routing',
        body:
          'Incoming requests can be categorized, enriched, prioritized, and handed to the correct person or queue without forcing teams to repeat the same intake work all day.',
      },
      {
        title: 'Support and escalation workflows',
        body:
          'Tickets, service requests, and internal issues can be summarized, tagged, routed, and escalated based on urgency, ownership, and workflow rules.',
      },
      {
        title: 'Internal reporting and review packs',
        body:
          'Performance data, operations updates, and workflow outcomes can be turned into concise summaries leaders can actually use.',
      },
    ],
    modules: [
      {
        title: 'Automation layer',
        points: [
          'Trigger design for routine tasks and recurring operations.',
          'Conditional routing and escalation logic for edge cases.',
          'Approval gates for actions that should not run unattended.',
        ],
      },
      {
        title: 'Context layer',
        points: [
          'Structured business inputs pulled from the systems the workflow depends on.',
          'Knowledge retrieval to keep outputs grounded in approved information.',
          'Summary logic that preserves the details teams still need after handoff.',
        ],
      },
      {
        title: 'Control layer',
        points: [
          'Status tracking and reporting surfaces for operators and managers.',
          'Fallback handling for low-confidence or out-of-scope cases.',
          'Operational logs that make the workflow auditable after launch.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Where does automation usually create the most value?',
        answer:
          'It usually creates the most value in workflows with repeated decisions, repeated handoffs, or repeated admin effort. The strongest candidates are the processes teams already know are costing them time every day.',
      },
      {
        question: 'Can the automation still leave room for human review?',
        answer:
          'Yes. Criyx usually keeps humans in the loop wherever approvals, judgment, or exception handling matter. The goal is to reduce repetitive work, not remove control from the people who own the process.',
      },
    ],
    ctaTitle:
      'If your team repeats the same routing, follow-up, and review work every day, automation should reduce that load without making the workflow harder to trust.',
    ctaBody:
      'Criyx scopes the triggers, approvals, integrations, and reporting needed to make the automation operationally reliable.',
  },
  {
    slug: 'ai-agents',
    label: 'AI Agents',
    eyebrow: 'Services',
    overviewBody:
      'Agent systems that can reason within guardrails, use tools, retrieve context, and complete multi-step workflow tasks.',
    bullets: [
      'Task agents for research, documentation, triage, and coordination.',
      'Controlled tool usage with scope boundaries and escalation behavior.',
      'Agent systems designed around real workflow ownership instead of demos.',
    ],
    title:
      'AI agent systems designed to complete structured work inside real business workflows, not just generate responses.',
    intro:
      'Criyx builds agent systems for teams that need more than basic chat output. These systems retrieve context, use tools, take multi-step actions, and stay bounded by workflow logic so they can support real operations without becoming unpredictable.',
    stats: [
      {
        value: 'Multi-step',
        label: 'Designed for workflows that require retrieval, reasoning, action, and handoff in one sequence.',
      },
      {
        value: 'Bounded',
        label: 'Guardrails define what the agent can do, what it must escalate, and where it should stop.',
      },
      {
        value: 'Integrated',
        label: 'Agent behavior is connected to business tools, rules, and reporting instead of running in isolation.',
      },
    ],
    pillars: [
      {
        title: 'Task-bound autonomy',
        body:
          'A useful agent should complete a defined class of work well. Criyx scopes the task boundaries carefully so the system stays helpful without drifting beyond what it should own.',
      },
      {
        title: 'Tool and context orchestration',
        body:
          'Agents become more valuable when they can retrieve the right context, inspect tools, and use workflow logic to decide what should happen next.',
      },
      {
        title: 'Escalation by design',
        body:
          'The system should know when not to proceed. That is why escalation rules, fallback behavior, and operator visibility are treated as core product requirements.',
      },
    ],
    journey: [
      {
        step: '01',
        title: 'Define the agent task and limits',
        body:
          'We identify which workflow the agent will support, what actions it can take, what context it can use, and what conditions require escalation.',
      },
      {
        step: '02',
        title: 'Connect tools and decision logic',
        body:
          'Criyx wires the agent into retrieval layers, external tools, internal systems, and control rules so it acts within a usable operating flow.',
      },
      {
        step: '03',
        title: 'Launch with oversight',
        body:
          'The result includes monitoring, summaries, and operator review points so the team can trust the agent once it is in production.',
      },
    ],
    useCases: [
      {
        title: 'Research and document handling',
        body:
          'Agents can gather context, compare sources, draft outputs, and prepare review-ready summaries for internal teams.',
      },
      {
        title: 'Sales and support coordination',
        body:
          'Operational agents can assist with intake, follow-up, case summaries, and next-step recommendations across customer-facing workflows.',
      },
      {
        title: 'Marketing and content support',
        body:
          'Agent systems can help plan deliverables, generate structured outputs, route approvals, and keep campaign work moving with less coordination overhead.',
      },
    ],
    modules: [
      {
        title: 'Reasoning layer',
        points: [
          'Prompt and instruction design for stable task execution.',
          'Decision boundaries that limit where the agent is allowed to act.',
          'Fallback logic for ambiguous or incomplete inputs.',
        ],
      },
      {
        title: 'Tool layer',
        points: [
          'Controlled tool use for retrieval, updates, notifications, and workflow actions.',
          'System permissions scoped to the tasks the agent is meant to support.',
          'Sequencing for multi-step workflows with explicit checkpoints.',
        ],
      },
      {
        title: 'Governance layer',
        points: [
          'Human review and escalation flows for sensitive moments.',
          'Visibility into actions taken, outputs produced, and next steps triggered.',
          'Reporting that helps the team tune reliability after launch.',
        ],
      },
    ],
    faqs: [
      {
        question: 'What makes an agent different from a normal AI workflow?',
        answer:
          'An agent is useful when the workflow needs bounded autonomy across several steps, not just one output. That usually means retrieval, decision logic, tool use, and action sequencing inside one controlled flow.',
      },
      {
        question: 'How do you keep the agent from becoming unreliable?',
        answer:
          'By limiting scope, grounding context, defining escalation rules, and attaching the agent to a workflow with visibility. Reliability usually improves when autonomy is carefully shaped instead of broadly promised.',
      },
    ],
    ctaTitle:
      'If the workflow needs retrieval, reasoning, and action in one connected system, an agent may be the right service model.',
    ctaBody:
      'Criyx defines the boundaries, tools, review logic, and reporting needed to make that agent operationally useful.',
  },
  {
    slug: 'voice-media-agents',
    label: 'Voice and Media Agents',
    eyebrow: 'Services',
    overviewBody:
      'Voice-led and media-led AI systems for qualification, intake, support, branded interactions, and content-heavy workflows.',
    bullets: [
      'Voice agents for qualification, intake, support, and guided response.',
      'Media workflows where visual or voice output improves the operating process.',
      'Brand-consistent interaction design with controlled escalation paths.',
    ],
    title:
      'Voice and media agent systems built for teams that need AI interaction to be immediate, structured, and operationally useful.',
    intro:
      'Criyx builds voice and media-oriented agent workflows when the business benefits from spoken interaction, guided response, branded delivery, or media generation as part of the operating process. The focus stays on usefulness, control, and continuity rather than novelty.',
    stats: [
      {
        value: 'Responsive',
        label: 'Designed for workflows where immediate interaction matters, such as qualification, intake, or guided support.',
      },
      {
        value: 'Structured',
        label: 'Conversation and media flows are shaped around the fields, outcomes, and routing decisions the business actually needs.',
      },
      {
        value: 'Brand-safe',
        label: 'Tone, output structure, and escalation rules are defined so the experience remains consistent.',
      },
    ],
    pillars: [
      {
        title: 'Voice-first workflow design',
        body:
          'The interaction is structured around the data the workflow needs, not just around making the conversation sound natural.',
      },
      {
        title: 'Contextual response systems',
        body:
          'Voice and media agents can retrieve approved information, evaluate intent, and decide whether they should answer, qualify further, or hand off.',
      },
      {
        title: 'Operational continuity',
        body:
          'Every interaction should produce usable context for the next person or system in the workflow rather than leaving teams with disconnected transcripts or assets.',
      },
    ],
    journey: [
      {
        step: '01',
        title: 'Define the interaction path',
        body:
          'We map what the user should be asked, what the system must capture, and what outcomes the interaction is meant to produce.',
      },
      {
        step: '02',
        title: 'Build the response and routing flow',
        body:
          'Criyx configures the voice or media behavior, context retrieval, routing logic, and escalation conditions required for real production use.',
      },
      {
        step: '03',
        title: 'Connect the outcome to the workflow',
        body:
          'The interaction result is logged, routed, summarized, and handed to the right system or person so nothing useful is lost after the conversation ends.',
      },
    ],
    useCases: [
      {
        title: 'Inbound qualification and intake',
        body:
          'Voice agents can capture structured customer details, route requests, and prepare clean handoffs without making teams repeat the same questions manually.',
      },
      {
        title: 'Guided support and information response',
        body:
          'Businesses with repetitive information requests can use voice-led response systems grounded in approved knowledge and escalation logic.',
      },
      {
        title: 'Media generation workflows',
        body:
          'Where visual or voice output supports the business process, Criyx can design generation pipelines with review checkpoints and brand controls.',
      },
    ],
    modules: [
      {
        title: 'Interaction layer',
        points: [
          'Voice, response, or media output design aligned to workflow needs.',
          'Structured conversational paths instead of open-ended drift.',
          'Tone controls for brand consistency and clarity.',
        ],
      },
      {
        title: 'Workflow layer',
        points: [
          'Routing rules for intake, qualification, escalation, and follow-up.',
          'Integration with CRM, support, calendar, or internal systems.',
          'Outcome logging so each interaction creates a usable next step.',
        ],
      },
      {
        title: 'Control layer',
        points: [
          'Review flows for sensitive or low-confidence moments.',
          'Audit visibility into what the system said, decided, and triggered.',
          'Performance signals around transfer, conversion, and exception patterns.',
        ],
      },
    ],
    faqs: [
      {
        question: 'When do voice agents make the most sense?',
        answer:
          'They make the most sense when the first stage of a workflow is repetitive, structured, and time-sensitive, especially for qualification, intake, support triage, or guided customer response.',
      },
      {
        question: 'Can these systems still hand off to a person cleanly?',
        answer:
          'Yes. Criyx treats handoff design as a core part of the system so the human receives context, the workflow remains continuous, and the user is not trapped in a dead end.',
      },
    ],
    ctaTitle:
      'If a workflow depends on fast, structured interaction, voice and media agents should improve speed without making the process harder to control.',
    ctaBody:
      'Criyx scopes the interaction design, context layer, escalation logic, and follow-through systems that make that possible.',
  },
  {
    slug: 'custom-software',
    label: 'Custom Software and Apps',
    eyebrow: 'Services',
    overviewBody:
      'Custom software, internal apps, and operator-facing products that give AI systems a usable interface and a reliable operating surface.',
    bullets: [
      'Internal tools, dashboards, workflow panels, and customer-facing apps.',
      'Software built around automation, approvals, visibility, and control.',
      'Operator-ready interfaces that make AI systems easier to trust and maintain.',
    ],
    title:
      'Custom software and internal apps built around the workflow so AI systems have a usable operating surface, not just a backend process.',
    intro:
      'Many business problems are not solved by orchestration alone. Teams often need a software layer to review outputs, approve actions, inspect context, track exceptions, and manage the workflow day to day. Criyx builds that layer as part of the system so the AI work is actually usable after deployment.',
    stats: [
      {
        value: 'Operator-ready',
        label: 'Interfaces are designed for the people who need to review, approve, and act on workflow outputs.',
      },
      {
        value: 'Integrated',
        label: 'Apps connect the automation layer, the data context, and the team using the system.',
      },
      {
        value: 'Scalable',
        label: 'A well-designed software surface keeps the workflow understandable as usage, volume, and team size grow.',
      },
    ],
    pillars: [
      {
        title: 'Workflow-native interfaces',
        body:
          'The software should reflect how the team actually works, not force operators to adapt to a generic panel with no operational context.',
      },
      {
        title: 'Visibility and action in one place',
        body:
          'Teams need the context, status, approvals, and next actions connected inside the same interface so they can work without jumping across scattered tools.',
      },
      {
        title: 'AI made usable',
        body:
          'The software layer is where AI outputs become operationally trustworthy because people can inspect them, correct them, and act on them in a structured way.',
      },
    ],
    journey: [
      {
        step: '01',
        title: 'Define the software surface',
        body:
          'We map what the user needs to see, what they need to decide, and what workflow actions the interface must support.',
      },
      {
        step: '02',
        title: 'Connect the app to the operating system',
        body:
          'Criyx wires the interface into data sources, workflow logic, reporting, and approvals so the software supports the real process instead of sitting beside it.',
      },
      {
        step: '03',
        title: 'Launch an operator-ready tool',
        body:
          'The end result is a maintainable app or internal tool that helps the business use the automation and agent layer with more confidence.',
      },
    ],
    useCases: [
      {
        title: 'Internal review and approval panels',
        body:
          'Create interfaces where teams can inspect AI outputs, approve actions, manage exceptions, and keep the workflow moving.',
      },
      {
        title: 'Workflow dashboards and management apps',
        body:
          'Build internal tools that bring status, performance, ownership, and action controls into one usable operating surface.',
      },
      {
        title: 'Customer-facing workflow products',
        body:
          'Where the use case calls for it, Criyx can build web apps or lightweight platforms that connect the AI layer directly to customers or partners.',
      },
    ],
    modules: [
      {
        title: 'Interface layer',
        points: [
          'Workflow-specific screens for review, action, and status visibility.',
          'Design systems aligned to clarity, speed, and operator confidence.',
          'Interaction patterns that reduce admin effort instead of adding more steps.',
        ],
      },
      {
        title: 'System layer',
        points: [
          'Integrations with automations, agents, databases, and business tools.',
          'Permissions and ownership paths suited to the actual workflow.',
          'Reporting connections that keep the app useful to both operators and leadership.',
        ],
      },
      {
        title: 'Maintainability layer',
        points: [
          'Documentation and structure that make the software easier to evolve.',
          'Visibility into workflow state, exceptions, and manual overrides.',
          'A build approach designed for long-term operational use, not a one-off prototype.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Why build software if the automation already works?',
        answer:
          'Because many workflows still need an operating surface. Teams often need to review, approve, track, inspect, and manage what the automation is doing. Without that layer, the system can become harder to trust as it grows.',
      },
      {
        question: 'Is this only for internal tools?',
        answer:
          'No. Internal tools are common, but Criyx can also build customer-facing apps or lightweight platforms when the business process benefits from a dedicated product surface.',
      },
    ],
    ctaTitle:
      'If your workflow needs a real interface for people to review, approve, and manage AI-driven work, custom software is usually part of the right solution.',
    ctaBody:
      'Criyx builds that software layer so the automation and agent system stays usable in day-to-day operations.',
  },
  {
    slug: 'full-stack-marketing',
    label: 'Full-Stack Marketing',
    eyebrow: 'Services',
    overviewBody:
      'Full-stack marketing support across positioning, campaigns, content, landing pages, outbound systems, and reporting.',
    bullets: [
      'Campaign strategy, messaging, content systems, and execution support.',
      'Landing pages, outbound assets, funnels, and launch coordination.',
      'Marketing operations that connect planning, creation, distribution, and iteration.',
    ],
    title:
      'Full-stack marketing systems built to help teams plan, create, launch, and improve growth work without fragmentation.',
    intro:
      'Criyx supports marketing teams that need more than isolated content output. We help shape positioning, campaigns, landing pages, outbound systems, launch workflows, and reporting structures so the marketing motion is not only creative, but operationally strong. The work is designed to connect strategy, assets, execution, and iteration inside one cleaner system.',
    stats: [
      {
        value: 'End-to-end',
        label: 'Support across messaging, campaigns, landing pages, content operations, and launch execution.',
      },
      {
        value: 'Conversion-aware',
        label: 'Built around audience clarity, offer framing, response quality, and measurable next steps.',
      },
      {
        value: 'Ops-backed',
        label: 'Marketing systems structured so planning, approvals, publishing, and follow-through do not break apart.',
      },
    ],
    pillars: [
      {
        title: 'Positioning that carries through execution',
        body:
          'Good marketing starts with the offer, audience, and message. Criyx helps define that clearly enough that the rest of the campaign work can stay aligned.',
      },
      {
        title: 'Execution across the full funnel',
        body:
          'The service can cover campaign assets, landing pages, outbound support, content workflows, and launch coordination so growth work does not stall between teams.',
      },
      {
        title: 'A system, not just assets',
        body:
          'Strong marketing work needs repeatable structure around approvals, publishing, reporting, and optimization. That is where the service becomes more valuable than one-off deliverables.',
      },
    ],
    journey: [
      {
        step: '01',
        title: 'Clarify the offer and growth motion',
        body:
          'We identify the audience, the commercial objective, the offer framing, and the channels that should carry the work.',
      },
      {
        step: '02',
        title: 'Build the campaign and asset system',
        body:
          'Criyx develops the assets, landing surfaces, messaging directions, outbound support, and operational structure needed to launch cleanly.',
      },
      {
        step: '03',
        title: 'Launch, measure, and refine',
        body:
          'Once live, the work is tracked, adjusted, and improved so the marketing system becomes sharper instead of restarting from zero every cycle.',
      },
    ],
    useCases: [
      {
        title: 'Campaign and launch execution',
        body:
          'Move from idea to launch with stronger coordination across messaging, assets, timelines, and channel-specific execution.',
      },
      {
        title: 'Landing page and funnel support',
        body:
          'Build clearer conversion paths with better copy, sharper page structure, and tighter alignment between campaign intent and landing experience.',
      },
      {
        title: 'Content and outbound operations',
        body:
          'Support recurring content, sales collateral, outbound sequences, and internal launch workflows without making the team manage every detail manually.',
      },
    ],
    modules: [
      {
        title: 'Strategy layer',
        points: [
          'Audience, offer, and positioning clarity for campaigns and launches.',
          'Messaging direction that can be reused across channels.',
          'Channel and funnel decisions tied to real business goals.',
        ],
      },
      {
        title: 'Execution layer',
        points: [
          'Landing pages, campaign assets, outbound support, and content deliverables.',
          'Workflow support for briefs, approvals, handoffs, and publishing.',
          'Structured systems that reduce chaos across multi-channel marketing work.',
        ],
      },
      {
        title: 'Optimization layer',
        points: [
          'Performance readouts, iteration notes, and reporting support.',
          'Refinement of pages, messaging, and sequence logic after launch.',
          'A feedback loop that improves execution instead of relying on guesswork.',
        ],
      },
    ],
    faqs: [
      {
        question: 'What does full-stack marketing mean in practice?',
        answer:
          'It means the work is not limited to one channel or one asset type. Criyx can support the strategy, pages, content, outbound, launch workflow, and reporting structure needed to make the marketing system hold together.',
      },
      {
        question: 'Is this for teams that already have internal marketers?',
        answer:
          'Yes. Sometimes the value is acting as an execution and systems partner for an internal team that needs sharper campaign infrastructure, clearer landing surfaces, or more reliable launch support.',
      },
    ],
    ctaTitle:
      'If your marketing work is fragmented between strategy, assets, pages, and execution, the fix is usually a stronger system rather than more isolated output.',
    ctaBody:
      'Criyx helps build that full-stack marketing system so your team can launch and iterate with more clarity.',
  },
  {
    slug: 'web-design-development',
    label: 'Web Design and Development',
    eyebrow: 'Services',
    overviewBody:
      'Stunning websites and landing pages designed to look sharp, communicate clearly, and convert without feeling generic.',
    bullets: [
      'Marketing sites, landing pages, and product-facing web experiences.',
      'Strong visual direction paired with clear information hierarchy and performance.',
      'Design and development that support brand perception and conversion at the same time.',
    ],
    title:
      'Web design and development for teams that need stunning websites with strong messaging, clean structure, and credible execution.',
    intro:
      'Criyx designs and builds websites that need to do more than exist online. They need to present the brand sharply, explain the offer clearly, and move the visitor toward the right next step. That means visual quality matters, but so do structure, copy, responsiveness, performance, and the overall feel of the experience.',
    stats: [
      {
        value: 'Striking',
        label: 'Built to feel intentional, polished, and distinct instead of template-driven.',
      },
      {
        value: 'Clear',
        label: 'Site structure and copy are shaped so visitors understand the offer quickly.',
      },
      {
        value: 'Conversion-ready',
        label: 'Design and development decisions support trust, response, and the action the page is meant to drive.',
      },
    ],
    pillars: [
      {
        title: 'Visual quality with purpose',
        body:
          'A strong website should look impressive, but the design still needs to serve the message, the brand, and the user journey instead of chasing visual noise.',
      },
      {
        title: 'Messaging-led page structure',
        body:
          'Criyx shapes site sections, hierarchy, and flow around what the visitor needs to understand, believe, and do next.',
      },
      {
        title: 'Build quality that holds up',
        body:
          'The frontend should be responsive, performant, and cleanly implemented so the site feels credible when real traffic and real users hit it.',
      },
    ],
    journey: [
      {
        step: '01',
        title: 'Define the site objective and visual direction',
        body:
          'We clarify what the site needs to communicate, who it is for, and how the visual language should support the brand.',
      },
      {
        step: '02',
        title: 'Design and build the web experience',
        body:
          'Criyx develops the layouts, copy structure, interaction patterns, and frontend implementation needed for a strong live experience.',
      },
      {
        step: '03',
        title: 'Refine for launch quality',
        body:
          'The site is reviewed for responsiveness, clarity, presentation, and next-step flow so it feels ready when people actually land on it.',
      },
    ],
    useCases: [
      {
        title: 'Brand and company websites',
        body:
          'Present the business with more clarity and confidence through a site that reflects the quality of the actual work.',
      },
      {
        title: 'Landing pages for offers and campaigns',
        body:
          'Build focused pages that support launches, lead generation, sales outreach, or product-specific conversion goals.',
      },
      {
        title: 'Product and service explanation pages',
        body:
          'Create web experiences that make technical or AI-enabled offerings easier for buyers to understand and trust.',
      },
    ],
    modules: [
      {
        title: 'Design layer',
        points: [
          'Visual direction, layout systems, typography, and section rhythm.',
          'Page hierarchy built around message clarity and conversion intent.',
          'Brand-sensitive design choices that avoid generic website patterns.',
        ],
      },
      {
        title: 'Development layer',
        points: [
          'Responsive frontend implementation across desktop and mobile.',
          'Performance-aware build quality and clean interaction behavior.',
          'Reusable structure that makes the site easier to extend later.',
        ],
      },
      {
        title: 'Launch layer',
        points: [
          'Review of copy flow, CTA placement, and page readiness.',
          'Final refinement for presentation quality and user confidence.',
          'A website that feels strong both visually and operationally after go-live.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Do you only build brochure sites?',
        answer:
          'No. Criyx can build marketing sites, landing pages, product pages, and other web experiences where design quality, clarity, and conversion all matter together.',
      },
      {
        question: 'What makes the website service different from standard web development?',
        answer:
          'The focus is not only on code. It is on the combined outcome: strong presentation, clear messaging, structured user flow, and a live site that feels credible enough to represent the business properly.',
      },
    ],
    ctaTitle:
      'If the website is supposed to make the business look sharper, explain the offer better, and convert more cleanly, the work needs more than basic implementation.',
    ctaBody:
      'Criyx designs and builds websites that aim for that higher standard in both presentation and execution.',
  },
];

export const serviceNavItems = servicePages.map((service) => ({
  label: service.label,
  to: `/services/${service.slug}`,
}));

export const serviceCatalog = servicePages.map((service) => ({
  id: service.slug,
  title: service.label,
  body: service.overviewBody,
  bullets: service.bullets,
  to: `/services/${service.slug}`,
}));

export const serviceCategories = [
  ...servicePages.map((service) => ({
    title: service.label,
    body: service.overviewBody,
    bullets: service.bullets,
    to: `/services/${service.slug}`,
  })),
];

export const serviceHighlights = [
  {
    step: '01',
    title: 'AI workflow automation',
    body:
      'From lead routing to support operations, we build automation systems that combine business rules, context retrieval, and AI outputs inside a usable operating flow.',
  },
  {
    step: '02',
    title: 'Advanced multi-step automations',
    body:
      'Some workflows require branching logic, approvals, tool calls, and escalation control. Criyx structures these as reliable, production-ready automations instead of brittle one-off chains.',
  },
  {
    step: '03',
    title: 'Custom apps and software',
    body:
      'If the team needs a dedicated interface to review, approve, monitor, or act on automation outputs, we design and build the software layer that supports the system.',
  },
  {
    step: '04',
    title: 'Agent systems across channels',
    body:
      'We build AI agents, marketing agents, research agents, voice agents, and media-oriented agent systems with clear task boundaries and workflow context.',
  },
];

export const serviceVisualSlides = [
  {
    title: 'Automation architecture',
    body:
      'Connected business rules, triggers, approvals, and model steps working as one coordinated system.',
    image: 'automation',
  },
  {
    title: 'Agent orchestration',
    body:
      'Multi-tool AI agents that retrieve context, reason within guardrails, and complete structured tasks.',
    image: 'agents',
  },
  {
    title: 'Voice and media workflows',
    body:
      'Voice, cloning, and media pipelines designed for repeatable business use rather than isolated generation.',
    image: 'voice',
  },
  {
    title: 'Custom software surfaces',
    body:
      'Internal dashboards, operator panels, and web apps that make advanced automation usable by real teams.',
    image: 'apps',
  },
];

export const serviceDeliveryModels = [
  {
    title: 'Advisory plus implementation',
    body:
      'Best when the team needs help shaping the right solution and also wants the system built and delivered in the same engagement.',
  },
  {
    title: 'Focused build sprint',
    body:
      'Best when the target workflow is already clear and the priority is shipping a well-scoped system quickly.',
  },
  {
    title: 'Platform expansion',
    body:
      'Best when the business already has one successful workflow and wants to extend the same operating model into new areas.',
  },
];
