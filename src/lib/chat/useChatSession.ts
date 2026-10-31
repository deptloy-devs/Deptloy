"use client";

import * as React from "react";
import type { ChatAssistantType, ChatMessagePayload, ChatSessionResponse } from "./types";

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
const STORAGE_KEY = "deptloy_chat_session";

let scriptLoadingPromise: Promise<void> | null = null;

function loadTurnstileScript(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.turnstile) return Promise.resolve();

  scriptLoadingPromise ??= new Promise<void>((resolve, reject) => {
    // Check if script already exists in DOM
    const existing = document.querySelector(`script[src^="https://challenges.cloudflare.com/turnstile"]`);
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("Turnstile script failed")));
      return;
    }

    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      scriptLoadingPromise = null;
      reject(new Error("Turnstile script failed to load"));
    };
    document.head.appendChild(script);
  });

  return scriptLoadingPromise;
}

export function useChatSession() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const widgetIdRef = React.useRef<string | null>(null);

  // Retrieve cached session from sessionStorage if still valid
  const getStoredToken = React.useCallback((): string | null => {
    if (typeof window === "undefined") return null;
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const data = JSON.parse(raw) as { token: string; exp: number };
      // Buffer by 60 seconds
      if (data.token && data.exp && Date.now() < data.exp - 60_000) {
        return data.token;
      }
      sessionStorage.removeItem(STORAGE_KEY);
      return null;
    } catch {
      return null;
    }
  }, []);

  const saveToken = React.useCallback((token: string, expiresAt: number) => {
    if (typeof window === "undefined") return;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ token, exp: expiresAt }));
    } catch {
      // Storage unavailable or disabled
    }
  }, []);

  // Obtains a single-use Turnstile token and exchanges it for a 1-hour session token
  const acquireSessionToken = React.useCallback(async (): Promise<string> => {
    const cached = getStoredToken();
    if (cached) return cached;

    let turnstileToken = "test-turnstile-token";

    if (SITE_KEY && typeof window !== "undefined") {
      try {
        await loadTurnstileScript();
        const api = window.turnstile;

        if (api && containerRef.current) {
          if (widgetIdRef.current) {
            try {
              api.remove(widgetIdRef.current);
            } catch {
              // Ignore
            }
          }

          turnstileToken = await new Promise<string>((resolve, reject) => {
            const timeout = setTimeout(() => {
              reject(new Error("Turnstile timed out"));
            }, 30_000);

            try {
              widgetIdRef.current = api.render(containerRef.current!, {
                sitekey: SITE_KEY,
                action: "deptloy_chat",
                appearance: "interaction-only",
                callback: (token) => {
                  clearTimeout(timeout);
                  resolve(token);
                },
                "error-callback": () => {
                  clearTimeout(timeout);
                  reject(new Error("Turnstile verification failed"));
                },
              });
            } catch (err) {
              clearTimeout(timeout);
              reject(err);
            }
          });
        }
      } catch (e) {
        console.warn("[Deptloy Chat] Turnstile challenge error:", e);
        // Fallback for local development or mock environments
      }
    }

    // Exchange turnstileToken for signed 1-hour sessionToken
    const res = await fetch("/api/chat/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ turnstileToken }),
    });

    if (!res.ok) {
      const errorData = (await res.json().catch(() => ({}))) as ChatSessionResponse;
      throw new Error(errorData.error || `Session creation failed (${res.status})`);
    }

    const data = (await res.json()) as ChatSessionResponse;
    if (!data.sessionToken || !data.expiresAt) {
      throw new Error("No session token returned");
    }

    saveToken(data.sessionToken, data.expiresAt);
    return data.sessionToken;
  }, [getStoredToken, saveToken]);

  // Sends message with streaming updates
  const streamChat = React.useCallback(
    async ({
      assistant,
      messages,
      industryId,
      serviceId,
      onChunk,
    }: {
      assistant: ChatAssistantType;
      messages: ChatMessagePayload[];
      industryId?: string;
      serviceId?: string;
      onChunk: (accumulated: string) => void;
    }): Promise<string> => {
      let sessionToken: string | undefined;
      try {
        sessionToken = await acquireSessionToken();
      } catch (err) {
        console.warn("[Deptloy Chat] Proceeding without verified session:", err);
      }

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          assistant,
          messages,
          sessionToken,
          industryId,
          serviceId,
        }),
      });

      if (!res.ok) {
        const errorJson = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(errorJson.error || `Request failed with status ${res.status}`);
      }

      const reader = res.body?.getReader();
      if (!reader) {
        throw new Error("Streaming is not supported by your browser");
      }

      const decoder = new TextDecoder("utf-8");
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const text = decoder.decode(value, { stream: true });
        accumulated += text;
        onChunk(accumulated);
      }

      return accumulated;
    },
    [acquireSessionToken]
  );

  return {
    containerRef,
    streamChat,
    acquireSessionToken,
  };
}
