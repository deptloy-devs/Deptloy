import type { BookingRequested } from "@/lib/voice-demo/booking";
import type { ToolCall, ToolResult } from "@/lib/voice-demo/tools";

const FALLBACK: ToolResult = {
  status: "error",
  message: "The request didn't go through. Suggest the Book a Call page on deptloy.com.",
};

/**
 * Answers Dep's book_discovery_call tool by sending the details to the server,
 * which emails the team. The result goes back to Dep so it can tell the visitor.
 */
export async function sendDepBooking(call: ToolCall, sessionId: string): Promise<ToolResult> {
  if (call.name !== "book_discovery_call") return { status: "error", message: "Unknown tool." };
  try {
    const res = await fetch("/api/voice-demo/book", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...call.args, sessionId }),
    });
    const body: unknown = await res.json().catch(() => null);
    if (body && typeof body === "object" && "status" in body) return body as ToolResult;
  } catch {
    // Network trouble: fall through.
  }
  return FALLBACK;
}

export function isBookingRequested(result: ToolResult): result is ToolResult & BookingRequested {
  return result.status === "requested";
}
