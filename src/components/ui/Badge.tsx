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
    default: "bg-[#1E293B]/80 text-slate-300 border border-white/10",
    violet: "bg-[#8B5CF6]/15 text-[#A78BFA] border border-[#8B5CF6]/30 shadow-[0_0_12px_rgba(139,92,246,0.15)]",
    cyan: "bg-[#38BDF8]/15 text-[#38BDF8] border border-[#38BDF8]/30",
    success: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
    warning: "bg-amber-500/15 text-amber-400 border border-amber-500/30",
    outline: "bg-transparent text-slate-400 border border-white/15",
  }[variant];

  const dotColor = {
    default: "bg-slate-400",
    violet: "bg-[#A78BFA]",
    cyan: "bg-[#38BDF8]",
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
