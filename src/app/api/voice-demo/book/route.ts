import type { NextRequest } from "next/server";
import { requestBooking } from "@/lib/voice-demo/booking";
import { getClientIp } from "@/lib/voice-demo/client-ip";
import { readVoiceDemoConfig } from "@/lib/voice-demo/config";
import { logOutcome } from "@/lib/voice-demo/http";
import { bookingDeps } from "@/lib/voice-demo/server";

/** Dep's "book a discovery call" tool: emails the request to the team during a live call. */
export async function POST(req: NextRequest) {
  const config = readVoiceDemoConfig();
  const ip = getClientIp(req.headers);
  const raw: unknown = await req.json().catch(() => null);
  const body = raw && typeof raw === "object" && !Array.isArray(raw) ? (raw as Record<string, unknown>) : {};

  const result = await requestBooking(
    { origin: req.headers.get("origin"), ip, sessionId: body.sessionId, details: body },
    bookingDeps(config),
  );

  logOutcome(ip, result.ok ? "booking_sent" : `booking_${result.reason}`);
  return Response.json(result.body, { status: result.status, headers: { "cache-control": "no-store" } });
}
