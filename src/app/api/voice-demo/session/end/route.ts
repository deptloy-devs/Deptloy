import type { NextRequest } from "next/server";
import { getClientIp } from "@/lib/voice-demo/client-ip";
import { readVoiceDemoConfig } from "@/lib/voice-demo/config";
import { endSession } from "@/lib/voice-demo/gatekeeper";
import { logOutcome } from "@/lib/voice-demo/http";
import { getVoiceDemoStore } from "@/lib/voice-demo/server";

/** The browser calls this when a call ends, so the caller's slot and line free up right away. */
export async function POST(req: NextRequest) {
  const config = readVoiceDemoConfig();
  const ip = getClientIp(req.headers);
  const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;

  const result = await endSession(
    { origin: req.headers.get("origin"), ip, sessionId: body.sessionId },
    { config, store: getVoiceDemoStore(config) },
  );
  logOutcome(ip, result.ok ? "ended" : `end_rejected_${result.status}`);
  return new Response(null, { status: result.status, headers: { "cache-control": "no-store" } });
}
