import * as React from "react";
import { cn } from "@/lib/cn";

type Variant = "default" | "brand" | "accent" | "success" | "warning" | "outline";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: Variant;
  size?: "sm" | "md";
  dot?: boolean;
  pulse?: boolean;
}

const variants: Record<Variant, { badge: string; dot: string }> = {
  default: { badge: "bg-[var(--mist)] text-[var(--deep)] border-[var(--peri)]", dot: "bg-[var(--deep)]" },
  brand: { badge: "bg-[var(--peri)]/50 text-[var(--pur)] border-[var(--lav)]/40 font-mono", dot: "bg-[var(--pur)]" },
  accent: { badge: "bg-[var(--peach)] text-[var(--deep)] border-[var(--or)]/40 font-mono", dot: "bg-[var(--or)]" },
  success: { badge: "bg-emerald-50 text-emerald-800 border-emerald-200 font-mono", dot: "bg-emerald-500" },
  warning: { badge: "bg-amber-50 text-amber-800 border-amber-200 font-mono", dot: "bg-amber-500" },
  outline: { badge: "bg-transparent text-[var(--mute)] border-[rgba(21,19,74,0.18)] font-mono", dot: "bg-[var(--mute)]" },
};

export function Badge({
  children,
  className,
  variant = "default",
  size = "md",
  dot = false,
  pulse = false,
  ...props
}: BadgeProps) {
  const v = variants[variant];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border font-medium whitespace-nowrap",
        size === "sm" ? "px-2 py-0.5 text-xs gap-1" : "px-3 py-1 text-xs gap-1.5",
        v.badge,
        className
      )}
      {...props}
    >
      {dot && (
        <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
          {pulse && <span className={cn("absolute inset-0 rounded-full opacity-60 animate-ping", v.dot)} />}
          <span className={cn("relative h-1.5 w-1.5 rounded-full", v.dot)} />
        </span>
      )}
      {children}
    </span>
  );
}
