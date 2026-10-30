"use client";

/**
 * Deptloy Cookie & Data Governance System
 * Compliant with GDPR/ePrivacy Directive with zero third-party tracking pixels.
 */
import * as React from "react";
import Link from "next/link";
import { Cookie, Shield, Check, X, SlidersHorizontal, ArrowRight } from "lucide-react";

export interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  timestamp: string;
}

const STORAGE_KEY = "deptloy_cookie_consent_v1";

interface CookieConsentContextType {
  preferences: CookiePreferences | null;
  isOpen: boolean;
  isCustomizing: boolean;
  setIsCustomizing: (val: boolean) => void;
  openPreferences: () => void;
  closeBanner: () => void;
  acceptAll: () => void;
  acceptNecessaryOnly: () => void;
  saveCustomPreferences: (analytics: boolean) => void;
}

const CookieConsentContext = React.createContext<CookieConsentContextType | undefined>(undefined);

export function useCookieConsent() {
  const context = React.useContext(CookieConsentContext);
  if (!context) {
    throw new Error("useCookieConsent must be used within a CookieConsentProvider");
  }
  return context;
}

const emptySubscribe = () => () => {};
function useIsClient() {
  return React.useSyncExternalStore(emptySubscribe, () => true, () => false);
}

export function CookieConsentProvider({ children }: { children: React.ReactNode }) {
  const isClient = useIsClient();
  const [preferences, setPreferences] = React.useState<CookiePreferences | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? (JSON.parse(saved) as CookiePreferences) : null;
    } catch {
      return null;
    }
  });
  const [isOpen, setIsOpen] = React.useState(false);
  const [isCustomizing, setIsCustomizing] = React.useState(false);

  // Show banner after brief delay if no preference has been saved yet
  React.useEffect(() => {
    if (!preferences) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [preferences]);

  const savePreferences = (prefs: CookiePreferences) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    } catch {
      // Storage might be disabled
    }
    setPreferences(prefs);
    setIsOpen(false);
    setIsCustomizing(false);
  };

  const acceptAll = () => {
    savePreferences({
      necessary: true,
      analytics: true,
      timestamp: new Date().toISOString(),
    });
  };

  const acceptNecessaryOnly = () => {
    savePreferences({
      necessary: true,
      analytics: false,
      timestamp: new Date().toISOString(),
    });
  };

  const saveCustomPreferences = (analytics: boolean) => {
    savePreferences({
      necessary: true,
      analytics,
      timestamp: new Date().toISOString(),
    });
  };

  const openPreferences = () => {
    setIsCustomizing(true);
    setIsOpen(true);
  };

  const closeBanner = () => {
    // If closed without explicit choice, treat as necessary only
    acceptNecessaryOnly();
  };

  return (
    <CookieConsentContext.Provider
      value={{
        preferences,
        isOpen,
        isCustomizing,
        setIsCustomizing,
        openPreferences,
        closeBanner,
        acceptAll,
        acceptNecessaryOnly,
        saveCustomPreferences,
      }}
    >
      {children}
      {isClient && <CookieConsentBanner />}
    </CookieConsentContext.Provider>
  );
}

function CookieConsentBanner() {
  const {
    preferences,
    isOpen,
    isCustomizing,
    setIsCustomizing,
    closeBanner,
    acceptAll,
    acceptNecessaryOnly,
    saveCustomPreferences,
  } = useCookieConsent();

  const [analyticsOptIn, setAnalyticsOptIn] = React.useState(() => preferences?.analytics ?? false);

  if (!isOpen) return null;

  return (
    <aside
      aria-label="Cookie and privacy preferences"
      role="region"
      className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-[70] w-[calc(100vw-2rem)] sm:w-[420px] bg-white border border-[rgba(21,19,74,0.14)] p-5 sm:p-6 rounded-2xl shadow-[0_20px_50px_rgba(87,80,168,0.18)] transition-all duration-300 animate-in fade-in slide-in-from-bottom-5"
    >
      {/* Top Header Badge & Close Button */}
      <div className="flex items-center justify-between gap-2 pb-3 border-b border-[rgba(21,19,74,0.08)]">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[var(--paper)] border border-[var(--peri)] text-[10.5px] font-mono font-bold uppercase tracking-wider text-[var(--pur)]">
          <Cookie className="w-3.5 h-3.5 text-[var(--or)]" />
          <span>Cookie Governance</span>
        </div>

        <button
          type="button"
          onClick={closeBanner}
          className="w-7 h-7 rounded-lg text-[var(--mute)] hover:text-[var(--deep)] hover:bg-[var(--paper)] grid place-items-center transition-colors cursor-pointer"
          aria-label="Dismiss cookie banner"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {!isCustomizing ? (
        /* =================================================================== */
        /* STANDARD VIEW                                                       */
        /* =================================================================== */
        <div className="pt-3.5 space-y-3.5">
          <div>
            <h3 className="text-sm sm:text-base font-extrabold text-[var(--deep)] tracking-tight">
              We value data sovereignty.
            </h3>
            <p className="text-xs text-[var(--mute)] mt-1.5 leading-relaxed">
              We use strictly necessary cookies for site security and session edge routing. Optional anonymous telemetry helps us monitor performance. We do not use third-party advertising trackers.
            </p>
            <div className="pt-1.5">
              <Link
                href="/privacy"
                className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold text-[var(--pur)] hover:text-[var(--deep)] transition-colors group"
              >
                <span>Read our Data Governance Policy</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-col sm:flex-row gap-2 pt-1">
            <button
              type="button"
              onClick={acceptAll}
              className="btn sm flex-1 justify-center text-xs"
            >
              <span>Accept All</span>
            </button>

            <button
              type="button"
              onClick={acceptNecessaryOnly}
              className="btn sm ghost flex-1 justify-center text-xs"
            >
              <span>Essential Only</span>
            </button>
          </div>

          {/* Customize Preferences Link */}
          <div className="pt-0.5 text-center">
            <button
              type="button"
              onClick={() => {
                setAnalyticsOptIn(preferences?.analytics ?? false);
                setIsCustomizing(true);
              }}
              className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[var(--mute)] hover:text-[var(--deep)] transition-colors cursor-pointer hover:underline"
            >
              <SlidersHorizontal className="w-3 h-3 text-[var(--pur)]" />
              <span>Customize Preferences</span>
            </button>
          </div>
        </div>
      ) : (
        /* =================================================================== */
        /* CUSTOMIZE VIEW                                                      */
        /* =================================================================== */
        <div className="pt-3.5 space-y-3.5">
          <div>
            <h3 className="text-sm sm:text-base font-extrabold text-[var(--deep)] tracking-tight">
              Cookie Preferences
            </h3>
            <p className="text-xs text-[var(--mute)] mt-1 leading-relaxed">
              Choose which categories of cookies you allow while navigating Deptloy.
            </p>
          </div>

          <div className="space-y-2.5">
            {/* Category 1: Strictly Necessary */}
            <div className="p-3 rounded-xl bg-[var(--paper)] border border-[var(--peri)] space-y-1">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-[#16875b]" />
                  <span className="text-xs font-bold text-[var(--deep)]">Strictly Necessary</span>
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#edfbf4] text-[#16875b] border border-[#c2eed8]">
                  Always Active
                </span>
              </div>
              <p className="text-[11px] text-[var(--mute)] leading-relaxed">
                Required for site security, edge routing, and cloud infrastructure protection. Cannot be switched off.
              </p>
            </div>

            {/* Category 2: Anonymous Analytics */}
            <div className="p-3 rounded-xl bg-white border border-[rgba(21,19,74,0.12)] space-y-1">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-[var(--deep)]">Anonymous Analytics</span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={analyticsOptIn}
                  onClick={() => setAnalyticsOptIn(!analyticsOptIn)}
                  className={`relative w-10 h-5 rounded-full transition-colors cursor-pointer ${
                    analyticsOptIn ? "bg-[var(--deep)]" : "bg-gray-300"
                  }`}
                  aria-label="Toggle anonymous analytics cookies"
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                      analyticsOptIn ? "translate-x-5 bg-[var(--or)]" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
              <p className="text-[11px] text-[var(--mute)] leading-relaxed">
                Aggregated, non-personally identifiable telemetry to evaluate page performance and resolve user workflow issues.
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2 pt-1">
            <button
              type="button"
              onClick={() => saveCustomPreferences(analyticsOptIn)}
              className="btn sm w-full justify-center text-xs"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Save My Preferences</span>
            </button>

            <button
              type="button"
              onClick={() => {
                if (preferences) {
                  closeBanner();
                } else {
                  setIsCustomizing(false);
                }
              }}
              className="text-[11px] font-mono text-[var(--mute)] hover:text-[var(--deep)] text-center transition-colors cursor-pointer hover:underline"
            >
              {preferences ? "Close Preferences" : "Back to Quick Choices"}
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}
