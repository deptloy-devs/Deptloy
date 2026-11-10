/**
 * Deptloy's own projects: things we've shipped and things we're building.
 *
 * Adding a project = adding one object to `projects` below. The /projects grid and the
 * /projects/[slug] page are both generated from it.
 *
 * Images: drop files in /public/projects/<slug>/ and reference them as "/projects/<slug>/file.png".
 * Until a project has real screenshots, `visual` draws a clean illustrated preview instead.
 */

export type ProjectStatus = "live" | "beta" | "in-development";

/** The main button on a project. */
export type ProjectAction =
  | { kind: "link"; label: string; href: string; external?: boolean }
  /** Opens the Dep chat assistant that lives on every page. */
  | { kind: "chat"; label: string }
  /** Shows a sign-up form on the project page. Sign-ups arrive in the contact@ inbox. */
  | { kind: "waitlist"; label: string };

export interface ProjectImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface Project {
  slug: string;
  name: string;
  /** One line shown on the card. */
  tagline: string;
  /** Short label above the name, e.g. "Voice AI". */
  category: string;
  status: ProjectStatus;
  /** Year the project started, shown in the meta row. */
  year: string;
  platform: string;
  /** Brand colour used for the card glow and accents. */
  accent: string;
  /** Illustrated preview used when there is no cover image. */
  visual: "voice" | "chat" | "simulator" | "web" | "app";
  cover?: ProjectImage;
  gallery?: ProjectImage[];
  tags: string[];
  /** Detail page. */
  summary: string;
  problem: string;
  built: string;
  features: { title: string; text: string }[];
  steps: string[];
  /** Optional: tech used. Leave out to hide the section. */
  stack?: string[];
  action: ProjectAction;
  secondaryAction?: ProjectAction;
}

export const STATUS_LABEL: Record<ProjectStatus, string> = {
  live: "Live",
  beta: "Beta",
  "in-development": "In development",
};

export const projects: Project[] = [
  {
    slug: "akhirah",
    name: "Akhirah",
    tagline:
      "One app for a Muslim's day: Quran progress, a hadith and a term to learn daily, goals and schedules, and friends to grow with.",
    category: "Mobile app",
    status: "in-development",
    year: "2026",
    platform: "iOS & Android",
    accent: "#16875b",
    visual: "app",
    tags: ["Quran tracker", "Daily hadith", "Planner", "Community"],
    summary:
      "Akhirah is a daily companion built for Muslims who want to stay consistent. Track your Quran reading, learn one hadith and one Islamic term every day, plan your time and projects, and keep each other motivated with friends on the app.",
    problem:
      "Staying consistent with Quran, learning and personal goals usually means juggling a Quran app, a notes app, a calendar and a group chat. Progress gets scattered and motivation fades when nobody is walking with you.",
    built:
      "One calm, focused app with five tabs that work together: a Quran tracker, a daily hadith, a daily term, a planner for goals, schedules, projects and notes, and a social tab where you connect with people you trust and follow each other's progress.",
    features: [
      { title: "Quran progress tracker", text: "Log what you read, see your streak and know exactly where to pick up next." },
      { title: "A hadith every day", text: "One authentic hadith daily with its meaning, so learning becomes a habit." },
      { title: "Term of the day", text: "Learn a new Islamic term each day, explained simply." },
      { title: "Goals & schedules", text: "Time your tasks, set goals, create projects and schedules, and keep notes in one place." },
      { title: "Grow together", text: "Connect with friends and family, follow each other's progress and encourage one another." },
      { title: "Built around your day", text: "Gentle reminders and a clear daily view, without noise or clutter." },
    ],
    steps: ["Set your daily Quran goal", "Read today's hadith and term", "Plan your day, projects and notes", "Share progress with your circle"],
    action: { kind: "waitlist", label: "Join the waitlist" },
  },
  {
    slug: "dep-voice-receptionist",
    name: "Dep, the voice receptionist",
    tagline: "A real-time voice AI you can talk to straight from the browser. It answers questions and books calls.",
    category: "Voice AI",
    status: "live",
    year: "2026",
    platform: "Web (any modern browser)",
    accent: "#8478e0",
    visual: "voice",
    tags: ["Voice AI", "Real-time audio", "Booking"],
    summary:
      "Dep is the robot on our homepage, and he picks up when you press call. He listens, talks back with a natural voice, answers questions about what we do, and books a discovery call without anyone on our side lifting a finger.",
    problem:
      "Most businesses still lose callers to voicemail after hours or during busy moments. Typical phone bots feel like menus, not conversations, so people hang up.",
    built:
      "A browser-based voice agent that streams your microphone to a live speech model and plays its reply back in real time. You can interrupt it mid-sentence, it keeps context, and when you want to book it collects your details and emails a confirmation.",
    features: [
      { title: "Natural conversation", text: "Low-latency, two-way audio. Interrupt it like you would a person." },
      { title: "Books the call", text: "Collects name, email and a preferred time, then sends the booking to our inbox." },
      { title: "A face that talks", text: "Dep's mouth moves with his voice and live captions show what he says." },
      { title: "Protected from abuse", text: "Bot checks and rate limits keep the line open for real visitors." },
    ],
    steps: ["Press call on the homepage", "Ask anything about Deptloy", "Dep answers out loud, live", "Book a call and get an email confirmation"],
    stack: ["Next.js", "Gemini Live", "Web Audio / AudioWorklet", "Cloudflare Turnstile", "Nodemailer"],
    action: { kind: "link", label: "Talk to Dep", href: "/" },
    secondaryAction: { kind: "link", label: "See the simulator", href: "/projects/ai-receptionist-simulator" },
  },
  {
    slug: "ai-receptionist-simulator",
    name: "AI Receptionist Simulator",
    tagline: "Pick a business type and see how an AI receptionist would handle your customers, by chat or by voice.",
    category: "Conversational AI",
    status: "live",
    year: "2026",
    platform: "Web",
    accent: "#fd9150",
    visual: "simulator",
    tags: ["Chat", "Voice", "Multi-industry"],
    summary:
      "An interactive demo where you play the customer. Switch between sample businesses like a dental clinic or a salon and the receptionist changes its knowledge, tone and services to match.",
    problem:
      "Business owners find it hard to picture what an AI receptionist would actually say to their customers. Slide decks and screenshots don't answer that.",
    built:
      "A simulator with a set of sample businesses, each with its own services, greeting and suggested questions. Replies stream in as they're written, and you can switch to a voice call with the same receptionist.",
    features: [
      { title: "One-click industries", text: "Swap between sample businesses and the receptionist adapts instantly." },
      { title: "Chat or voice", text: "Type your questions or call the receptionist and hear it answer." },
      { title: "Suggested questions", text: "Starter prompts so you can see the useful answers in seconds." },
      { title: "Streaming replies", text: "Answers appear word by word, the way a real conversation feels." },
    ],
    steps: ["Choose a business type", "Ask a question or tap a suggestion", "Watch the receptionist reply", "Switch to voice to hear it"],
    stack: ["Next.js", "React 19", "Gemini", "Server-sent streaming", "Cloudflare Turnstile"],
    action: { kind: "link", label: "Try the simulator", href: "/demo" },
  },
  {
    slug: "dep-chat-assistant",
    name: "Dep Chat",
    tagline: "The assistant in the corner of every page. It answers visitor questions and points them to the right place.",
    category: "Website assistant",
    status: "live",
    year: "2026",
    platform: "Web (embedded on deptloy.com)",
    accent: "#5750a8",
    visual: "chat",
    tags: ["Chat", "Lead capture", "Guardrails"],
    summary:
      "Dep Chat is the floating assistant on deptloy.com. Visitors ask what we build, how a project works or what it might involve, and it answers in plain words with links to the right page.",
    problem:
      "Visitors have quick questions but won't fill in a form to ask them. Generic chat widgets either know nothing about the business or can be tricked into saying anything.",
    built:
      "An assistant grounded in what Deptloy actually offers, with signed sessions, origin checks and rate limits so it only serves real visitors on our site, and stays on topic.",
    features: [
      { title: "Knows the business", text: "Answers come from what we actually offer, not generic filler." },
      { title: "Links you onward", text: "Points to the demo, solutions or contact form when it helps." },
      { title: "Locked to our site", text: "Signed sessions and origin checks stop other sites from using it." },
      { title: "Stays on topic", text: "Guardrails keep conversations useful and limit abuse." },
    ],
    steps: ["Open the chat bubble", "Ask a question", "Get a plain answer with links", "Jump straight to the right page"],
    stack: ["Next.js", "Gemini", "Signed sessions", "Upstash Redis", "Rate limiting"],
    action: { kind: "chat", label: "Open Dep Chat" },
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
