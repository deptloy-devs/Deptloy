import { demoIndustries } from "@/lib/site";
import type { DemoIndustryId } from "@/types";

/**
 * Who answers a voice call:
 * - "receptionist": a sample business from /demo, picked by industry and service.
 * - "dep": Dep, Deptloy's own assistant on the home page. Dep can send real call requests to the team.
 */
export type VoiceAgent =
  | { kind: "receptionist"; industry: DemoIndustryId; serviceId: string }
  | { kind: "dep" };

/** Reads the agent from a start request. Null when it doesn't name a real agent. */
export function parseVoiceAgent(input: { agent?: unknown; industry?: unknown; serviceId?: unknown }): VoiceAgent | null {
  if (input.agent === "dep") return { kind: "dep" };
  if (input.agent !== undefined && input.agent !== "receptionist") return null;

  const industry = demoIndustries.find((i) => i.id === input.industry);
  if (!industry || typeof input.serviceId !== "string") return null;
  if (!industry.services.some((s) => s.id === input.serviceId)) return null;
  return { kind: "receptionist", industry: industry.id, serviceId: input.serviceId };
}
