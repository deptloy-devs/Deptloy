import type { Lead } from "@/lib/lead-email";
import { isAllowedOrigin, type VoiceDemoConfig } from "./config";
import { keys } from "./gatekeeper";
import type { VoiceDemoStore } from "./store";

/**
 * Dep's discovery call requests. The browser forwards Dep's tool call here,
 * and the team gets the same email as a contact-form call request.
 *
 * Only a live Dep call can send one, from the visitor who started it, once per call.
 * That call already passed Turnstile and the rate limits.
 */

export type BookDeps = {
  config: VoiceDemoConfig;
  store: VoiceDemoStore | null;
  /** Null when Gmail isn't configured. */
  sendLead: ((lead: Lead) => Promise<void>) | null;
  now(): number;
  newReference(): string;
};

export type BookInput = {
  origin: string | null;
  ip: string;
  sessionId: unknown;
  details: Record<string, unknown>;
};

export type BookingReason = "origin" | "not_configured" | "no_call" | "invalid" | "already_sent" | "send_failed";

export type BookingRequested = {
  status: "requested";
  reference: string;
  name: string;
  email: string;
  preferred_time: string;
};

export type BookResult =
  | { ok: true; status: 200; body: BookingRequested }
  | { ok: false; status: number; reason: BookingReason; body: { status: "error"; message: string } };

/** What Dep is told when a request fails. Dep says it to the visitor in its own words. */
const MESSAGES: Record<Exclude<BookingReason, "invalid">, string> = {
  origin: "Call requests only work on deptloy.com.",
  not_configured: "Call requests can't be sent right now. Suggest the Book a Call page on deptloy.com instead.",
  no_call: "This call can't send requests. Suggest the Book a Call page on deptloy.com instead.",
  already_sent: "A call request was already sent during this call. Tell the visitor the team will email them.",
  send_failed: "The request didn't go through. Try once more, or suggest the Book a Call page on deptloy.com.",
};

const MAX = { name: 80, email: 120, topic: 600, preferred_time: 120, company: 100 } as const;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const DAY = 86400;

const SERVICE = "Discovery call (voice request via Dep)";

function refuse(status: number, reason: BookingReason, message: string): BookResult {
  return { ok: false, status, reason, body: { status: "error", message } };
}

/** One line of plain text: no control characters, single spaces. */
function clean(value: unknown): string {
  return typeof value === "string" ? value.replace(/[\u0000-\u001f\u007f]+/g, " ").replace(/\s+/g, " ").trim() : "";
}

type Details = { name: string; email: string; topic: string; preferred_time: string; company: string };

function readDetails(raw: Record<string, unknown>): Details | string {
  const details: Details = {
    name: clean(raw.name),
    // Heard by voice, so "Ana.Ruiz @ Example.com" is common.
    email: clean(raw.email).replace(/\s+/g, "").toLowerCase(),
    topic: clean(raw.topic),
    preferred_time: clean(raw.preferred_time),
    company: clean(raw.company),
  };

  if (!details.name) return "Ask for the visitor's name.";
  if (!EMAIL.test(details.email)) return "That email address doesn't look complete. Ask the visitor to spell it again.";
  if (!details.topic) return "Ask what they want to build or fix.";
  if (!details.preferred_time) return "Ask for a preferred day and time, with their time zone.";
  for (const field of Object.keys(MAX) as (keyof typeof MAX)[]) {
    if (details[field].length > MAX[field]) return `The ${field.replace("_", " ")} is too long. Use a shorter version.`;
  }
  return details;
}

export async function requestBooking(input: BookInput, deps: BookDeps): Promise<BookResult> {
  const { config, store, sendLead } = deps;
  if (!isAllowedOrigin(input.origin, config)) return refuse(403, "origin", MESSAGES.origin);
  if (!store || !sendLead) return refuse(503, "not_configured", MESSAGES.not_configured);

  const { sessionId, ip } = input;
  if (typeof sessionId !== "string" || !sessionId) return refuse(403, "no_call", MESSAGES.no_call);
  const isDepCall = Boolean(await store.getString(keys.canBook(sessionId)));
  if (!isDepCall || (await store.getString(keys.ipCall(ip))) !== sessionId) {
    return refuse(403, "no_call", MESSAGES.no_call);
  }

  const details = readDetails(input.details);
  if (typeof details === "string") return refuse(400, "invalid", details);

  if (!(await store.setIfAbsent(keys.booked(sessionId), "1", DAY))) {
    return refuse(409, "already_sent", MESSAGES.already_sent);
  }

  const reference = deps.newReference();
  const lead: Lead = {
    id: reference,
    fullName: details.name,
    email: details.email,
    companyName: details.company || "Not given",
    serviceRequired: SERVICE,
    projectDescription: [
      `Preferred time: ${details.preferred_time}`,
      "",
      "What they want to build or fix:",
      details.topic,
      "",
      "Requested by voice during a call with Dep on the home page. Dep heard these details by voice,",
      "so check the email address and confirm the time with them.",
    ].join("\n"),
    timestamp: new Date(deps.now()).toISOString(),
  };

  try {
    await sendLead(lead);
  } catch {
    await store.del(keys.booked(sessionId));
    return refuse(502, "send_failed", MESSAGES.send_failed);
  }

  return {
    ok: true,
    status: 200,
    body: {
      status: "requested",
      reference,
      name: details.name,
      email: details.email,
      preferred_time: details.preferred_time,
    },
  };
}
