import * as React from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "danger" | "glow";
type Size = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  href?: string;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const base =
  "group/btn relative inline-flex items-center justify-center whitespace-nowrap font-mono font-medium uppercase tracking-wider select-none cursor-pointer " +
  "transition-all duration-200 ease-out " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--pur)] focus-visible:ring-offset-2 " +
  "disabled:opacity-50 disabled:pointer-events-none aria-disabled:opacity-50 aria-disabled:pointer-events-none";

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-xs gap-1.5",
  md: "h-11 px-6 text-xs gap-2",
  lg: "h-13 px-8 text-sm gap-2.5",
};

const primary =
  "bg-[var(--deep)] text-white hover:bg-[var(--or)] hover:text-[var(--deep)] [clip-path:polygon(0_0,calc(100%-11px)_0,100%_11px,100%_100%,11px_100%,0_calc(100%-11px))]";

const variants: Record<Variant, string> = {
  primary,
  glow: primary,
  secondary:
    "bg-[var(--mist)] text-[var(--deep)] border border-[var(--peri)] hover:bg-[var(--peri)] [clip-path:polygon(0_0,calc(100%-11px)_0,100%_11px,100%_100%,11px_100%,0_calc(100%-11px))]",
  outline:
    "bg-transparent text-[var(--deep)] border border-[rgba(21,19,74,0.3)] hover:bg-white hover:border-[var(--deep)] [clip-path:polygon(0_0,calc(100%-11px)_0,100%_11px,100%_100%,11px_100%,0_calc(100%-11px))]",
  ghost:
    "bg-transparent text-[var(--deep)] hover:bg-[var(--mist)] rounded-full",
  danger:
    "bg-[var(--co)] text-white hover:bg-red-600 [clip-path:polygon(0_0,calc(100%-11px)_0,100%_11px,100%_100%,11px_100%,0_calc(100%-11px))]",
};

const isExternal = (href: string) => /^(https?:|mailto:|tel:)/.test(href);

export function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  href,
  isLoading = false,
  leftIcon,
  rightIcon,
  disabled,
  type = "button",
  ...rest
}: ButtonProps) {
  const classes = cn(base, sizes[size], variants[variant], className);

  const content = (
    <>
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin text-current" aria-hidden="true" />
      ) : (
        leftIcon
      )}
      <span>{children}</span>
      {!isLoading && rightIcon}
    </>
  );

  if (href) {
    if (isExternal(href)) {
      return (
        <a
          href={href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
          aria-disabled={disabled || isLoading}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} aria-disabled={disabled || isLoading}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      {...rest}
    >
      {content}
    </button>
  );
}
