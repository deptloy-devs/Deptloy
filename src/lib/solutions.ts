import type { ServiceSlug } from "@/types";

/**
 * Words for the Projects page ("What we deliver"): what each service gives a
 * customer, and how one example project gets built. Plain words, no tech terms.
 */

export type ServiceShowcase = {
  slug: ServiceSlug;
  /** What it does for the customer, in a few words. */
  promise: string;
  /** Who it suits, in one line. */
  forWho?: string;
  included: string[];
  /** Only for services with a known rollout time. */
  timeline?: string;
};

export const serviceShowcases: ServiceShowcase[] = [
  {
    slug: "ai-receptionist",
    promise: "Never miss a call or a booking again.",
    forWho: "For clinics, salons, home services and any business that lives on the phone.",
    included: [
      "Answers calls and chats 24/7, in your business's own voice",
      "Books appointments straight into your calendar",
      "Answers the questions your customers ask most",
      "Passes new leads to your team or your CRM",
    ],
    timeline: "Usually live in 3–7 business days",
  },
  {
    slug: "automation",
    promise: "Stop doing the same small tasks by hand.",
    forWho: "For teams losing hours to copy-paste, reminders and follow-ups.",
    included: [
      "Connects the tools you already use",
      "Sends reminders and updates on its own",
      "Moves information between systems, so nobody retypes it",
      "Flags the right person when something needs a human",
    ],
  },
  {
    slug: "crm",
    promise: "Know where every customer stands.",
    forWho: "For businesses that want every lead and customer in one place.",
    included: [
      "Every customer and conversation in one place",
      "A clear pipeline from new lead to won deal",
      "Automatic follow-ups, so no lead goes cold",
      "Simple reports you'll actually read",
    ],
  },
  {
    slug: "development",
    promise: "Software shaped around the way you work.",
    forWho: "For when off-the-shelf tools just don't fit.",
    included: [
      "Websites and booking pages that turn visitors into customers",
      "Client portals and tools for your team",
      "Works on phones, tablets and computers",
      "Connected to the rest of your system",
    ],
  },
];

export type BuildStep = {
  label: "Discover" | "Architect" | "Engineer" | "Launch" | "Evolve";
  title: string;
  body: string;
  youGet: string;
};

/** The example project: a made-up dental clinic, built in the five How It Works steps. */
export const EXAMPLE_BUSINESS = "Bright Smile Dental";

export const buildSteps: BuildStep[] = [
  {
    label: "Discover",
    title: "We learn how the clinic really works.",
    body: "A call with the owner and the front desk: where calls get missed, how bookings are kept, and what patients complain about.",
    youGet: "A short summary of the problems worth solving",
  },
  {
    label: "Architect",
    title: "We sketch the system before we build it.",
    body: "Four pieces that fit together: a receptionist for the phone, a booking page, a patient list and automatic reminders.",
    youGet: "A simple plan you approve before any building starts",
  },
  {
    label: "Engineer",
    title: "We build it and show you as we go.",
    body: "You try working screens early and often, and tell us what to change while it's still easy to change.",
    youGet: "Working screens to click through and comment on",
  },
  {
    label: "Launch",
    title: "It goes live, and the team learns it.",
    body: "We connect it to the clinic's calendar and phone line, then walk the team through their new day-to-day.",
    youGet: "A live system and a team that knows how to use it",
  },
  {
    label: "Evolve",
    title: "It keeps getting better.",
    body: "As the clinic grows, we add what it needs next, one small improvement at a time.",
    youGet: "Improvements on your schedule, not a one-off handover",
  },
];
