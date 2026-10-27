import { beforeEach, describe, expect, it, vi } from "vitest";
import { demoIndustries } from "@/lib/site";
import { createGeminiLiveToken } from "./gemini-token";
import { buildSystemInstruction, RECEPTIONIST_PERSONAS } from "./prompts";

const { create, ctorArgs } = vi.hoisted(() => ({
  create: vi.fn(),
  ctorArgs: [] as unknown[],
}));
vi.mock("@google/genai", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@google/genai")>()),
  GoogleGenAI: class {
    authTokens = { create };
    constructor(options: unknown) {
      ctorArgs.push(options);
    }
  },
}));

describe("buildSystemInstruction", () => {
  it("follows the industry and service the visitor picked", () => {
    const text = buildSystemInstruction("salon", "srv-color", 180);
    const salon = demoIndustries.find((i) => i.id === "salon")!;

    expect(text).toContain("Velvet Studio");
    expect(text).toContain(salon.assistantGreeting);
    expect(text).toContain("Balayage Full Color Treatment");
    for (const service of salon.services) expect(text).toContain(service.name);
    expect(text).toContain("3 minutes");
    expect(text).toContain("check_availability");
    expect(text).toContain("book_appointment");
  });

  it("has a persona with a voice for every demo industry", () => {
    for (const industry of demoIndustries) {
      expect(RECEPTIONIST_PERSONAS[industry.id].voice).toMatch(/^[A-Z][a-z]+$/);
      expect(buildSystemInstruction(industry.id, industry.services[0].id, 180)).toContain(industry.services[0].name);
    }
  });
});

describe("createGeminiLiveToken", () => {
  beforeEach(() => {
    create.mockReset();
    ctorArgs.length = 0;
  });

  it("creates a one-use token that expires at the call limit, with the prompt locked in", async () => {
    create.mockResolvedValue({ name: "auth_tokens/abc" });
    const now = Date.parse("2026-10-27T17:00:00Z");
    const expiresAt = new Date(now + 180_000);

    const token = await createGeminiLiveToken({
      apiKey: "server-key",
      model: "gemini-3.8-live",
      industry: "clinic",
      serviceId: "srv-clean",
      expiresAt,
      now,
    });

    expect(token).toBe("auth_tokens/abc");
    expect(ctorArgs[0]).toMatchObject({ apiKey: "server-key", httpOptions: { apiVersion: "v1alpha" } });
    const { config } = create.mock.calls[0][0];
    expect(config.uses).toBe(1);
    expect(config.expireTime).toBe(expiresAt.toISOString());
    expect(config.newSessionExpireTime).toBe(new Date(now + 60_000).toISOString());
    expect(config.lockAdditionalFields).toEqual([]);

    const constraints = config.liveConnectConstraints;
    expect(constraints.model).toBe("gemini-3.8-live");
    expect(constraints.config.responseModalities).toEqual(["AUDIO"]);
    expect(constraints.config.systemInstruction).toContain("Apex Health Clinic");
    expect(constraints.config.speechConfig.voiceConfig.prebuiltVoiceConfig.voiceName).toBe(
      RECEPTIONIST_PERSONAS.clinic.voice,
    );
    const names = constraints.config.tools[0].functionDeclarations.map((d: { name: string }) => d.name);
    expect(names).toEqual(["check_availability", "book_appointment"]);
    expect(constraints.config.inputAudioTranscription).toEqual({});
    expect(constraints.config.outputAudioTranscription).toEqual({});
  });

  it("fails when Gemini returns no token", async () => {
    create.mockResolvedValue({});
    await expect(
      createGeminiLiveToken({
        apiKey: "k",
        model: "m",
        industry: "clinic",
        serviceId: "srv-clean",
        expiresAt: new Date(),
        now: Date.now(),
      }),
    ).rejects.toThrow();
  });
});
