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
  brand: { badge: "bg-brand-500/12 text-brand-300 border-brand-400/25", dot: "bg-brand-300" },
  accent: { badge: "bg-electric-400/10 text-electric-300 border-electric-400/25", dot: "bg-electric-400" },
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
