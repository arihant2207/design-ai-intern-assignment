export const ACADEMY_NAME = "AI Skills Academy";

// Clearly fake sample WhatsApp number for front-end prototype demo only.
export const WHATSAPP_SAMPLE_URL = "https://wa.me/919000000000";

export const TOOLS_COVERED = [
  "ChatGPT",
  "Claude",
  "Gemini",
  "Canva",
  "Figma",
  "Lovable",
  "n8n",
  "Make",
] as const;

export type HeroAudienceKey = "student" | "professional";

export interface HeroAudienceVariant {
  key: HeroAudienceKey;
  label: string;
  supportingLine: string;
  formStatus: "Student" | "Young professional";
  suggestedTrackId: string;
}

export const HERO_AUDIENCE_VARIANTS: Record<
  HeroAudienceKey,
  HeroAudienceVariant
> = {
  student: {
    key: "student",
    label: "Student",
    supportingLine:
      "Build concrete projects—from verified research briefs to working mini web tools—you can walk through in internship and placement interviews.",
    formStatus: "Student",
    suggestedTrackId: "foundations",
  },
  professional: {
    key: "professional",
    label: "Working professional",
    supportingLine:
      "Turn everyday briefs, slide decks, and repetitive team workflows into clean, reliable systems you can put to work on Monday morning.",
    formStatus: "Young professional",
    suggestedTrackId: "work-and-content",
  },
};

export interface HeroWeekSnapshot {
  week: string;
  label: string;
  deliverable: string;
}

export const HERO_WEEK_PLAN: HeroWeekSnapshot[] = [
  {
    week: "WK 01",
    label: "Prompting & research",
    deliverable: "Source-checked brief",
  },
  {
    week: "WK 02",
    label: "Docs & decks",
    deliverable: "Structured pitch doc",
  },
  {
    week: "WK 03",
    label: "Visual & UI systems",
    deliverable: "Clickable Figma prototype",
  },
  {
    week: "WK 04",
    label: "No-code automation",
    deliverable: "Live n8n / Make flow",
  },
  {
    week: "WK 05",
    label: "Mini web tool",
    deliverable: "Working app in Lovable",
  },
  {
    week: "WK 06",
    label: "Capstone build & live review",
    deliverable: "Critiqued portfolio build",
  },
];

export interface ValueProp {
  code: string;
  title: string;
  description: string;
}

export const VALUE_PROPS: ValueProp[] = [
  {
    code: "01",
    title: "Practical projects every week",
    description:
      "Every module ends with a concrete artifact—a researched brief, an automated workflow, or a working interface—rather than slide theory.",
  },
  {
    code: "02",
    title: "Tool-agnostic workflows",
    description:
      "Learn how to break down a problem, pick the right model or builder for the job, and switch cleanly between ChatGPT, Claude, Gemini, and automation tools.",
  },
  {
    code: "03",
    title: "Feedback on real work",
    description:
      "Bring assignments, job tasks, or side projects to live review sessions where your structure, prompts, and edge cases are critiqued line by line.",
  },
];

export interface TrackItem {
  id: string;
  code: string;
  name: string;
  summary: string;
  forWhom: string;
  focusTools: string[];
  outcomes: [string, string];
  ctaLabel: string;
  featured?: boolean;
}

export const TRACKS: TrackItem[] = [
  {
    id: "foundations",
    code: "TRACK 01",
    name: "AI Foundations & Critical Workflows",
    summary:
      "Build reliable daily habits for research, structured writing, and source verification.",
    forWhom: "College students and fresh graduates starting from scratch.",
    focusTools: ["ChatGPT", "Claude", "Gemini"],
    outcomes: [
      "Design repeatable prompt templates with explicit verification steps",
      "Turn messy notes and PDFs into clean briefs and study guides",
    ],
    ctaLabel: "Enquire for Foundations",
    featured: true,
  },
  {
    id: "work-and-content",
    code: "TRACK 02",
    name: "AI for Work, Decks & Visual Content",
    summary:
      "Produce sharp reports, client decks, and visual layouts while keeping brand voice human.",
    forWhom: "Early-career marketers, analysts, ops associates, and campus leads.",
    focusTools: ["Claude", "Canva", "Figma"],
    outcomes: [
      "Structure executive summaries and slide narratives from raw data",
      "Build reusable visual templates in Canva and component frames in Figma",
    ],
    ctaLabel: "Enquire for Work & Content",
  },
  {
    id: "build-and-automation",
    code: "TRACK 03",
    name: "Build with AI & No-Code Automation",
    summary:
      "Connect forms, inboxes, spreadsheets, and web interfaces into working internal tools.",
    forWhom: "Builders, product-minded students, and professionals automating team ops.",
    focusTools: ["Lovable", "n8n", "Make"],
    outcomes: [
      "Wire multi-step webhooks, filters, and error fallbacks in n8n and Make",
      "Spec and ship a scoped web utility using Lovable and Figma references",
    ],
    ctaLabel: "Enquire for Build & Automation",
  },
];

export interface SyllabusWeek {
  week: string;
  title: string;
  summary: string;
  tools: string[];
  topics: string[];
  artifact: string;
}

export const SYLLABUS_META = {
  caption: "Sample curriculum · 6-week structure",
};

export const SYLLABUS_WEEKS: SyllabusWeek[] = [
  {
    week: "WK 01",
    title: "Prompting, critique & structured research",
    summary:
      "Move past one-line chats into structured context, source verification, and side-by-side model comparison.",
    tools: ["ChatGPT", "Claude", "Gemini"],
    topics: [
      "Framing roles, constraints, output schemas, and negative examples",
      "Synthesising long PDFs and lecture notes without losing citations",
      "Cross-checking model claims against primary sources",
    ],
    artifact: "Verified research brief with a reusable prompt specification",
  },
  {
    week: "WK 02",
    title: "Docs, briefs & presentation decks",
    summary:
      "Turn raw bullet points and data tables into concise memos, project proposals, and structured slide outlines.",
    tools: ["Claude", "ChatGPT", "Canva"],
    topics: [
      "Separating narrative outlining from slide layout",
      "Stripping inflated phrasing so drafts read like a sharp colleague wrote them",
      "Converting meeting transcripts into clear decision logs and action owners",
    ],
    artifact: "8-slide narrative deck + 1-page decision memo",
  },
  {
    week: "WK 03",
    title: "Visual systems & UI prototyping",
    summary:
      "Translate written specs into clean visual layouts, design tokens, and clickable screens you can test with users.",
    tools: ["Figma", "Canva", "Gemini"],
    topics: [
      "Grid discipline, type hierarchy, and readable contrast without clutter",
      "Using Figma components to mock up real workflows before building",
      "Creating consistent social and presentation kits in Canva",
    ],
    artifact: "3-screen clickable Figma prototype + layout checklist",
  },
  {
    week: "WK 04",
    title: "No-code automation workflows",
    summary:
      "Connect everyday apps so repetitive triage, summarisation, and routing happen reliably in the background.",
    tools: ["n8n", "Make"],
    topics: [
      "Triggers, webhooks, JSON payloads, and conditional routing basics",
      "Adding human-in-the-loop approval steps before anything sends externally",
      "Logging failures cleanly so broken runs never fail silently",
    ],
    artifact: "Working multi-step automation with test payload logs",
  },
  {
    week: "WK 05",
    title: "Build a working mini web tool",
    summary:
      "Write a tight product spec and build a small, single-purpose browser tool with clear states and edge-case handling.",
    tools: ["Lovable", "Figma", "Claude"],
    topics: [
      "Scoping an MVP down to one clear input, state flow, and output",
      "Iterating UI details and form validation without breaking existing layout",
      "Reviewing generated code structure and spotting brittle assumptions",
    ],
    artifact: "Interactive mini web utility scoped around a real task",
  },
  {
    week: "WK 06",
    title: "Capstone build & live review",
    summary:
      "Combine research, interface design, and automation into one practical project presented for structured critique.",
    tools: ["All stack"],
    topics: [
      "Combining a front-end interface with an automated backend flow",
      "Writing clear setup notes, limitations, and next-step checklists",
      "Live peer and mentor critique focused on clarity and reliability",
    ],
    artifact: "Finished capstone project + documented workflow breakdown",
  },
];

export interface SampleProject {
  id: string;
  tag: string;
  title: string;
  description: string;
  tools: string[];
  snippetHeader: string;
  snippetLines: { label: string; value: string; accent?: boolean }[];
}

export const SAMPLE_PROJECTS: SampleProject[] = [
  {
    id: "research-matrix",
    tag: "WK 01–02 ARTIFACT",
    title: "Source-Checked Research Brief",
    description:
      "A structured synthesis workflow that extracts claims, tags confidence levels, and preserves exact citations from dense reports.",
    tools: ["Claude", "Gemini"],
    snippetHeader: "brief_spec.md · Verified",
    snippetLines: [
      { label: "SOURCE", value: "14 primary docs indexed" },
      { label: "CHECK", value: "3 unverified claims flagged", accent: true },
      { label: "OUTPUT", value: "1-page executive summary" },
    ],
  },
  {
    id: "ui-prototype",
    tag: "WK 03 ARTIFACT",
    title: "Component-Driven UI Spec",
    description:
      "A responsive multi-screen interface framed in Figma with consistent spacing, clear form states, and accessible contrast.",
    tools: ["Figma", "Canva"],
    snippetHeader: "tokens.json · 3 screens",
    snippetLines: [
      { label: "GRID", value: "12-col desktop / 4-col mobile" },
      { label: "TYPE", value: "Display + 16px body scale" },
      { label: "STATE", value: "Empty, error & success", accent: true },
    ],
  },
  {
    id: "ops-automation",
    tag: "WK 04 ARTIFACT",
    title: "Lead & Inbox Triage Pipeline",
    description:
      "An automated n8n / Make scenario that normalises form entries, drafts a structured reply for review, and logs status.",
    tools: ["n8n", "Make"],
    snippetHeader: "triage_flow · 4 nodes",
    snippetLines: [
      { label: "01", value: "Webhook -> schema validate" },
      { label: "02", value: "Classify intent & urgency" },
      { label: "03", value: "Draft queued for approval", accent: true },
    ],
  },
  {
    id: "mini-web-tool",
    tag: "WK 05–06 ARTIFACT",
    title: "Scoped Web Utility",
    description:
      "A working browser calculator, intake tracker, or study planner built from a clean prompt spec with real input validation.",
    tools: ["Lovable", "ChatGPT"],
    snippetHeader: "utility_app · MVP v1",
    snippetLines: [
      { label: "SCOPE", value: "1 core job, zero bloat" },
      { label: "CHECKS", value: "Inline validation + reset" },
      { label: "DEMO", value: "5-min live walkthrough", accent: true },
    ],
  },
];

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const FAQS: FaqItem[] = [
  {
    id: "prerequisites",
    question: "Do I need coding experience or a technical degree?",
    answer:
      "No prior coding is required. If you are comfortable using a browser, spreadsheets, and everyday documents, you can follow every track. In Week 04–05 we introduce structured logic and JSON concepts step by step.",
  },
  {
    id: "laptop",
    question: "What laptop or hardware specs do I need?",
    answer:
      "Any modern Windows, macOS, or Linux laptop with a reliable browser (Chrome, Edge, Firefox, or Safari) and steady internet works—all primary tools run in the browser. A tablet or phone alone is not enough for building.",
  },
  {
    id: "tools-cost",
    question: "Do I have to buy paid AI subscriptions before joining?",
    answer:
      "No. Most exercises work on free tiers of ChatGPT, Claude, Gemini, Canva, Figma, n8n, Make, and Lovable. Where optional paid features exist, we clarify workarounds and never require upgrades before the cohort starts.",
  },
  {
    id: "schedule",
    question: "When are live sessions held, and how many hours a week does it take?",
    answer:
      "Exact batch dates and evening or weekend timings are shared when you request batch details. Plan for roughly 4–5 hours per week across live workshops and hands-on build time.",
  },
  {
    id: "recordings",
    question: "Are sessions recorded if I miss a live class?",
    answer:
      "Yes—every live workshop is planned with session recordings and step-by-step reference notes so you can catch up before the weekly critique.",
  },
  {
    id: "support",
    question: "How do feedback and doubt-clearing work?",
    answer:
      "Weekly checkpoints include written feedback on submitted artifacts plus live walkthroughs where stuck workflows, prompts, or layouts are debugged together.",
  },
  {
    id: "who-teaches",
    question: "Who teaches the cohort?",
    answer:
      "Cohorts are led by working practitioners across product, design, and workflow automation. Full instructor profiles and live session timings are shared directly with batch details when you enquire.",
  },
  {
    id: "fee-payment",
    question: "What is the programme fee and how do admissions work?",
    answer:
      "Programme fees and payment details are shared when you request batch details below, along with schedule options and track fit guidance before you decide.",
  },
];

export interface NextStepItem {
  step: string;
  title: string;
  detail: string;
}

export const NEXT_STEPS: NextStepItem[] = [
  {
    step: "01",
    title: "Enquiry logged",
    detail: "Your selected track and status help us tailor the cohort note we send back.",
  },
  {
    step: "02",
    title: "Schedule & fee shared",
    detail: "We share upcoming batch dates, timings, and full fee details before you commit.",
  },
  {
    step: "03",
    title: "10-minute track fit check",
    detail: "Optional short message or call on WhatsApp or email to confirm which track fits your goals.",
  },
  {
    step: "04",
    title: "Confirm seat if it fits",
    detail: "Decide with complete clarity on dates, weekly commitment, and tooling setup.",
  },
];
