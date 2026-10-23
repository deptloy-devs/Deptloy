"use client";

import * as React from "react";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/cn";

export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = React.useState<"dark" | "light">("dark");
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    const attr = document.documentElement.getAttribute("data-theme");
    if (attr === "light" || attr === "dark") {
      setTheme(attr);
    } else {
      const stored = localStorage.getItem("deptloy-theme");
      if (stored === "light" || stored === "dark") {
        setTheme(stored);
        applyTheme(stored);
      } else {
        const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
        const initial = prefersLight ? "light" : "dark";
        setTheme(initial);
        applyTheme(initial);
      }
    }
  }, []);

  const applyTheme = (next: "dark" | "light") => {
    document.documentElement.setAttribute("data-theme", next);
    if (next === "light") {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    }
    try {
      localStorage.setItem("deptloy-theme", next);
    } catch {
      // localStorage unavailable in private iframe/sandbox
    }
  };

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={
        theme === "dark"
          ? "Switch appearance to light mode (white)"
          : "Switch appearance to dark mode (black)"
      }
      title={
        theme === "dark"
          ? "Switch to light mode"
          : "Switch to dark mode"
      }
      className={cn(
        "relative grid h-10 w-10 shrink-0 place-items-center rounded-control border border-line bg-card/90 text-fg shadow-sm transition-all duration-200 hover:border-brand-400/40 hover:bg-raised focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 cursor-pointer",
        className
      )}
    >
      {/*
        When black (dark), show Sun SVG to switch to light.
        When white (light), show Moon SVG to switch back to black.
      */}
      {theme === "dark" ? (
        <Sun
          className="h-5 w-5 text-amber-400 transition-transform duration-300 hover:rotate-45"
          aria-hidden="true"
        />
      ) : (
        <Moon
          className="h-5 w-5 text-brand-600 transition-transform duration-300 hover:-rotate-12"
          aria-hidden="true"
        />
      )}
    </button>
  );
}
