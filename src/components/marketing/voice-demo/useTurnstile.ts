"use client";

import * as React from "react";

type TurnstileOptions = {
  sitekey: string;
  action?: string;
  theme?: "light" | "dark" | "auto";
  appearance?: "always" | "execute" | "interaction-only";
  callback?: (token: string) => void;
  "expired-callback"?: () => void;
  "error-callback"?: () => void;
};

type TurnstileApi = {
  render(container: HTMLElement, options: TurnstileOptions): string;
  reset(widgetId: string): void;
  remove(widgetId: string): void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
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
 * Cloudflare Turnstile in "only show if needed" mode. Most visitors never see it.
 * Tokens work once, so call `reset()` after each use.
 */
export function useTurnstile(siteKey: string | undefined) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const widgetRef = React.useRef<string | null>(null);
  const [token, setToken] = React.useState<string | null>(null);
  const [failed, setFailed] = React.useState(false);

  React.useEffect(() => {
    if (!siteKey) return;
    let cancelled = false;
    loadTurnstile()
      .then(() => {
        if (cancelled || !containerRef.current || !window.turnstile) return;
        widgetRef.current = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          action: "voice_demo",
          theme: "dark",
          appearance: "interaction-only",
          callback: (t) => {
            setToken(t);
            setFailed(false);
          },
          "expired-callback": () => setToken(null),
          "error-callback": () => {
            setToken(null);
            setFailed(true);
          },
        });
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });

    return () => {
      cancelled = true;
      if (widgetRef.current) window.turnstile?.remove(widgetRef.current);
      widgetRef.current = null;
    };
  }, [siteKey]);

  const reset = React.useCallback(() => {
    setToken(null);
    if (widgetRef.current) window.turnstile?.reset(widgetRef.current);
  }, []);

  return { containerRef, token, failed, reset };
}
