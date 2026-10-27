import { demoIndustries, demoTimeSlots } from "@/lib/site";
import type { DemoIndustryId } from "@/types";

/**
 * The receptionist's two tools, answered in the browser with mock data.
 * Nothing here touches a real calendar.
 */

export type ToolCall = { name?: string; args?: Record<string, unknown> };

export type ToolContext = {
  industry: DemoIndustryId;
  serviceId: string;
  newReference(): string;
};

export type ToolResult = { status: "ok" | "confirmed" | "requested" | "error"; [key: string]: unknown };

export type ConfirmedBooking = {
  status: "confirmed";
  reference: string;
  customer_name: string;
  service: string;
  date: string;
  time: string;
  note: string;
};

/** "1:15 pm", "13:15", "9" -> the slot format "01:15 PM". Times without am/pm assume business hours. */
export function normalizeTime(input: string): string | null {
  const match = input
    .trim()
    .toLowerCase()
    .match(/^(\d{1,2})(?:[:.](\d{2}))?\s*(a\.?m\.?|p\.?m\.?)?$/);
  if (!match) return null;

  let hour = Number(match[1]);
  const minute = match[2] ? Number(match[2]) : 0;
  if (minute > 59) return null;

  let suffix: "AM" | "PM";
  if (match[3]) {
    if (hour < 1 || hour > 12) return null;
    suffix = match[3].startsWith("a") ? "AM" : "PM";
  } else if (hour >= 13 && hour <= 23) {
    hour -= 12;
    suffix = "PM";
  } else if (hour === 12 || (hour >= 1 && hour <= 7)) {
    suffix = "PM";
  } else if (hour >= 8 && hour <= 11) {
    suffix = "AM";
  } else {
    return null;
  }
  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")} ${suffix}`;
}

/** The same day always has the same two times taken. */
function openTimes(date: string): string[] {
  let hash = 0;
  for (const ch of date.trim().toLowerCase()) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
  const taken = new Set([hash % demoTimeSlots.length, (hash + 3) % demoTimeSlots.length]);
  return demoTimeSlots.filter((_, i) => !taken.has(i));
}

const text = (value: unknown) => (typeof value === "string" ? value.trim() : "");

const error = (message: string): ToolResult => ({ status: "error", message });

export function runVoiceTool(call: ToolCall, ctx: ToolContext): ToolResult {
  const args = call.args ?? {};
  const industry = demoIndustries.find((i) => i.id === ctx.industry);
  if (!industry) return error("This demo business is not available.");

  if (call.name === "check_availability") {
    const date = text(args.date);
    if (!date) return error("Ask the caller which day they would like.");
    return { status: "ok", date, open_times: openTimes(date) };
  }

  if (call.name === "book_appointment") {
    const name = text(args.customer_name);
    const date = text(args.date);
    const time = normalizeTime(text(args.time));
    if (!name) return error("Ask the caller for their name before booking.");
    if (!date) return error("Ask the caller which day they would like.");
    if (!time || !openTimes(date).includes(time)) {
      return error(`That time is not open. Open times on ${date}: ${openTimes(date).join(", ")}.`);
    }

    const wanted = text(args.service).toLowerCase();
    const service = wanted
      ? industry.services.find((s) => s.id === wanted || s.name.toLowerCase() === wanted)
      : industry.services.find((s) => s.id === ctx.serviceId);
    if (!service) return error(`We offer: ${industry.services.map((s) => s.name).join("; ")}.`);

    const booking: ConfirmedBooking = {
      status: "confirmed",
      reference: ctx.newReference(),
      customer_name: name,
      service: service.name,
      date,
      time,
      note: "Demo booking only. No real calendar entry was made.",
    };
    return booking;
  }

  return error("Unknown tool.");
}
