import type { NextRequest } from "next/server";
import { getClientIp } from "@/lib/voice-demo/client-ip";
import { readVoiceDemoConfig } from "@/lib/voice-demo/config";
import { startSession } from "@/lib/voice-demo/gatekeeper";
import { logOutcome, startResponse } from "@/lib/voice-demo/http";
import { gateDeps } from "@/lib/voice-demo/server";

/** Starts a voice demo call: runs every abuse check, then hands out a short-lived Gemini token. */
export async function POST(req: NextRequest) {
  const config = readVoiceDemoConfig();
  const ip = getClientIp(req.headers);
  const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;

  const result = await startSession(
    {
      origin: req.headers.get("origin"),
      ip,
      agent: body.agent,
      industry: body.industry,
      serviceId: body.serviceId,
      turnstileToken: body.turnstileToken,
    },
    gateDeps(config),
  );

  logOutcome(ip, result.ok ? "issued" : result.reason);
  return startResponse(result);
}
