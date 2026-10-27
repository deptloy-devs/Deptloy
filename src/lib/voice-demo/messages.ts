/** Why a call couldn't start, and what the visitor sees. Shared by the token route and the UI. */
export type RefusalReason =
  | "origin"
  | "not_configured"
  | "bad_request"
  | "blocked"
  | "turnstile"
  | "rate_hour"
  | "rate_day"
  | "busy_ip"
  | "busy_lines"
  | "budget"
  | "token_failed";

export const REFUSAL_MESSAGES: Record<RefusalReason, string> = {
  origin: "The voice demo only runs on deptloy.com.",
  not_configured: "Voice calls aren't available right now. You can still chat by text.",
  bad_request: "Something went wrong starting the call. Refresh the page and try again.",
  blocked: "Too many attempts from your network. Please try again later, or book a call with us.",
  turnstile: "We couldn't confirm you're human. Refresh the page and try again.",
  rate_hour: "You've used this hour's demo calls. Try again later, or book a call with us.",
  rate_day: "You've used today's demo calls. Try again tomorrow, or book a call with us.",
  busy_ip: "You already have a call open. End it before starting a new one.",
  busy_lines: "All demo lines are busy. Please try again in a minute.",
  budget: "The demo is resting for today. Try again later, or book a call with us.",
  token_failed: "We couldn't start the call. Please try again.",
};

/** Refusals where we offer the "book a call" link. */
export const OFFER_BOOKING: ReadonlySet<RefusalReason> = new Set(["blocked", "rate_hour", "rate_day", "budget"]);

export const BOOK_A_CALL_HREF = "/contact#appointment";

export function isRefusalReason(value: unknown): value is RefusalReason {
  return typeof value === "string" && value in REFUSAL_MESSAGES;
}
