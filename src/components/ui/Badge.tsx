import * as React from "react";
import { cn } from "@/lib/cn";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "violet" | "cyan" | "success" | "warning" | "outline";
  size?: "sm" | "md";
  dot?: boolean;
}

export function Badge({
  children,
  className,
  variant = "default",
  size = "md",
  dot = false,
  ...props
}: BadgeProps) {
  const sizeClasses = {
    sm: "px-2 py-0.5 text-[10px] gap-1",
    md: "px-2.5 py-1 text-xs gap-1.5",
  }[size];

  const variantClasses = {
    default: "bg-raised-hover/80 text-fg-soft border border-line",
    violet: "bg-brand-500/15 text-brand-300 border border-brand-500/30 shadow-[0_0_12px_rgba(139,92,246,0.15)]",
    cyan: "bg-electric-400/15 text-electric-400 border border-electric-400/30",
    success: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
    warning: "bg-amber-500/15 text-amber-400 border border-amber-500/30",
    outline: "bg-transparent text-fg-muted border border-line-strong",
  }[variant];

  const dotColor = {
    default: "bg-slate-400",
    violet: "bg-brand-300",
    cyan: "bg-electric-400",
    success: "bg-emerald-400",
    warning: "bg-amber-400",
    outline: "bg-slate-500",
  }[variant];

  return (
    <span
      className={cn(
        "inline-flex items-center font-medium rounded-full select-none backdrop-blur-sm",
        sizeClasses,
        variantClasses,
        className
      )}
      {...props}
    >
      {dot && <span className={cn("h-1.5 w-1.5 rounded-full animate-pulse", dotColor)} />}
      {children}
    </span>
  );
}
