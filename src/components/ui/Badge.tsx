import * as React from "react";
import { cn } from "@/lib/cn";

type Variant = "default" | "brand" | "accent" | "success" | "warning" | "outline";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: Variant;
  size?: "sm" | "md";
  /** Small leading dot. */
  dot?: boolean;
  /** Animate the dot — reserve for genuinely "live" states. */
  pulse?: boolean;
}

const variants: Record<Variant, { badge: string; dot: string }> = {
  default: { badge: "bg-raised text-fg-soft border-line", dot: "bg-fg-muted" },
  brand: {
    badge: "bg-[var(--pur)]/12 text-[var(--pur)] dark:text-[var(--peri)] border-[var(--pur)]/25",
    dot: "bg-[var(--pur)] dark:bg-[var(--peri)]",
  },
  accent: {
    badge: "bg-[var(--or)]/15 text-[var(--or)] border-[var(--or)]/30",
    dot: "bg-[var(--or)]",
  },
  success: { badge: "bg-success/10 text-success border-success/25", dot: "bg-success" },
  warning: { badge: "bg-warning/10 text-warning border-warning/25", dot: "bg-warning" },
  outline: { badge: "bg-transparent text-fg-muted border-line-strong", dot: "bg-fg-subtle" },
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
        size === "sm" ? "px-2 py-0.5 text-xs gap-1" : "px-3 py-1 text-caption gap-1.5",
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
