"use client";

import * as React from "react";

type TurnstileOptions = {
  sitekey: string;
  action?: string;
  theme?: "light" | "dark" | "auto";
  appearance?: "always" | "execute" | "interaction-only";
  callback?: (token: string) => void;
  "error-callback"?: () => void;
};

type TurnstileApi = {
  render(container: HTMLElement, options: TurnstileOptions): string;
  remove(widgetId: string): void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
/** Long enough for a visitor to tick the box if Cloudflare asks. */
const CHECK_TIMEOUT_MS = 45_000;
let scriptLoading: Promise<void> | null = null;

function loadTurnstile(): Promise<void> {
  if (window.turnstile) return Promise.resolve();
  scriptLoading ??= new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      scriptLoading = null;
      reject(new Error("Turnstile failed to load"));
    };
    document.head.appendChild(script);
  });
  return scriptLoading;
}

/**
 * Cloudflare Turnstile, loaded only when a visitor starts a call.
 * Most visitors never see it; it shows a checkbox in `containerRef` only if Cloudflare needs one.
 */
export function useTurnstile(siteKey: string | undefined, theme: "light" | "dark") {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const widgetRef = React.useRef<string | null>(null);

  const clear = React.useCallback(() => {
    if (!widgetRef.current) return;
    try {
      window.turnstile?.remove(widgetRef.current);
    } catch {
      // Already gone.
    }
    widgetRef.current = null;
  }, []);

  React.useEffect(() => clear, [clear]);

  /** Runs a fresh check and resolves with its token. Tokens work once, so every call gets a new one. */
  const getToken = React.useCallback(async (): Promise<string> => {
    if (!siteKey) throw new Error("Turnstile is not configured");
    await loadTurnstile();
    const container = containerRef.current;
    const api = window.turnstile;
    if (!container || !api) throw new Error("Turnstile is not available");
    clear();

    return new Promise<string>((resolve, reject) => {
      const timer = setTimeout(() => {
        clear();
        reject(new Error("Turnstile timed out"));
      }, CHECK_TIMEOUT_MS);
      widgetRef.current = api.render(container, {
        sitekey: siteKey,
        action: "voice_demo",
        theme,
        appearance: "interaction-only",
        callback: (token) => {
          clearTimeout(timer);
          resolve(token);
        },
        "error-callback": () => {
          clearTimeout(timer);
          reject(new Error("Turnstile check failed"));
        },
      });
    });
  }, [siteKey, theme, clear]);

  return { containerRef, getToken };
}
