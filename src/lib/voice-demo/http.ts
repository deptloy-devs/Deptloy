import type { StartResult } from "./gatekeeper";
import { REFUSAL_MESSAGES } from "./messages";

/** Turns the gatekeeper's answer into the HTTP response the browser gets. */
export function startResponse(result: StartResult): Response {
  const headers = new Headers({ "cache-control": "no-store" });
  if (result.ok) return Response.json(result.session, { headers });

  if (result.retryAfter !== undefined) headers.set("retry-after", String(result.retryAfter));
  return Response.json(
    { reason: result.reason, message: REFUSAL_MESSAGES[result.reason], retryAfter: result.retryAfter },
    { status: result.status, headers },
  );
}

/** One line per outcome. Never keys, tokens or audio. */
export function logOutcome(ip: string, outcome: string) {
  console.info(`[voice-demo] ${JSON.stringify({ ip, at: new Date().toISOString(), outcome })}`);
}
