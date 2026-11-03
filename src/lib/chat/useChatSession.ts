"use client";

import * as React from "react";
import { useTurnstile } from "@/components/marketing/voice-demo/useTurnstile";
import type { ChatAssistantType, ChatMessagePayload, ChatSessionResponse } from "./types";

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
const STORAGE_KEY = "deptloy_chat_session";

const HUMAN_CHECK_FAILED = "We couldn't confirm you're human. Refresh the page and try again.";
const CONNECTION_FAILED = "We couldn't reach the chat. Check your connection and try again.";

function readStoredToken(): string | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as { token?: string; exp?: number };
    // Treat it as expired a minute early so it can't run out mid-request.
    if (data.token && data.exp && Date.now() < data.exp - 60_000) return data.token;
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // Storage blocked: we just ask for a new session.
  }
  return null;
}

function storeToken(token: string, exp: number) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ token, exp }));
  } catch {
    // Storage blocked.
  }
}

function forgetToken() {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // Storage blocked.
  }
}

async function errorFrom(res: Response, fallback: string): Promise<string> {
  const data = (await res.json().catch(() => ({}))) as { error?: unknown };
  return typeof data.error === "string" && data.error ? data.error : fallback;
}

function isAbort(err: unknown): boolean {
  return err instanceof DOMException && err.name === "AbortError";
}

/**
 * Talks to /api/chat. A Turnstile check opens a 1-hour session, which is reused
 * across messages and tabs-in-session. Put `containerRef` on a visible element in
 * the chat panel: Cloudflare shows a checkbox there when it needs one.
 */
export function useChatSession(theme: "light" | "dark") {
  const { containerRef, getToken } = useTurnstile(SITE_KEY, theme);

  const acquireSessionToken = React.useCallback(async (): Promise<string> => {
    const cached = readStoredToken();
    if (cached) return cached;

    let turnstileToken = "";
    if (SITE_KEY) {
      try {
        turnstileToken = await getToken();
      } catch {
        throw new Error(HUMAN_CHECK_FAILED);
      }
    }

    const res = await fetch("/api/chat/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ turnstileToken }),
    });
    if (!res.ok) throw new Error(await errorFrom(res, "We couldn't start the chat. Please try again."));

    const data = (await res.json()) as ChatSessionResponse;
    if (!data.sessionToken || !data.expiresAt) throw new Error("We couldn't start the chat. Please try again.");

    storeToken(data.sessionToken, data.expiresAt);
    return data.sessionToken;
  }, [getToken]);

  /** Sends the conversation and calls `onChunk` with the reply so far. Resolves with the full reply. */
  const streamChat = React.useCallback(
    async ({
      assistant,
      messages,
      industryId,
      serviceId,
      signal,
      onChunk,
    }: {
      assistant: ChatAssistantType;
      messages: ChatMessagePayload[];
      industryId?: string;
      serviceId?: string;
      signal?: AbortSignal;
      onChunk: (accumulated: string) => void;
    }): Promise<string> => {
      const send = async (sessionToken: string) =>
        fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ assistant, messages, sessionToken, industryId, serviceId }),
          signal,
        });

      try {
        let res = await send(await acquireSessionToken());
        if (res.status === 401) {
          // The session ran out or the visitor's network changed. Open a new one once.
          forgetToken();
          res = await send(await acquireSessionToken());
        }
        if (!res.ok) throw new Error(await errorFrom(res, `Request failed (${res.status})`));

        const reader = res.body?.getReader();
        if (!reader) throw new Error("Streaming is not supported by your browser");

        const decoder = new TextDecoder("utf-8");
        let accumulated = "";
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          accumulated += decoder.decode(value, { stream: true });
          onChunk(accumulated);
        }
        accumulated += decoder.decode();
        return accumulated;
      } catch (err) {
        if (isAbort(err)) throw err;
        // fetch and stream reads throw TypeError when the network drops.
        if (err instanceof TypeError || !(err instanceof Error)) throw new Error(CONNECTION_FAILED);
        throw err;
      }
    },
    [acquireSessionToken],
  );

  return { containerRef, streamChat };
}
