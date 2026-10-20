import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "glow";
  size?: "sm" | "md" | "lg";
  href?: string;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  href,
  isLoading = false,
  disabled,
  leftIcon,
  rightIcon,
  ...props
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed";

  const sizeClasses = {
    sm: "h-9 px-3.5 text-xs gap-1.5",
    md: "h-11 px-5 text-sm gap-2",
    lg: "h-12 px-6 text-base gap-2.5",
  }[size];

  const variantClasses = {
    primary:
      "bg-gradient-to-r from-brand-600 via-brand-500 to-electric-600 text-white shadow-lg shadow-brand-600/20 hover:shadow-brand-600/30 hover:brightness-110 border border-line",
    glow:
      "bg-gradient-to-r from-brand-500 to-electric-400 text-white shadow-[0_0_25px_rgba(139,92,246,0.4)] hover:shadow-[0_0_35px_rgba(139,92,246,0.6)] hover:brightness-110 border border-line-strong font-semibold",
    secondary:
      "bg-raised text-fg-soft hover:text-white hover:bg-raised-hover border border-line hover:border-line-strong",
    outline:
      "bg-transparent text-fg-soft hover:text-white border border-line-strong hover:border-white/30 hover:bg-white/[0.04]",
    ghost:
      "bg-transparent text-fg-soft hover:text-white hover:bg-white/[0.06]",
    danger:
      "bg-red-500/15 text-red-300 border border-red-500/30 hover:bg-red-500/25",
  }[variant];

  const content = (
    <>
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin text-current" />
      ) : (
        leftIcon
      )}
      <span>{children}</span>
      {!isLoading && rightIcon}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={cn(baseClasses, sizeClasses, variantClasses, className)}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      disabled={disabled || isLoading}
      className={cn(baseClasses, sizeClasses, variantClasses, className)}
      {...props}
    >
      {content}
    </button>
  );
}
