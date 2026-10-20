import * as React from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "danger" | "glow";
type Size = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** "glow" is kept as an alias of "primary" for older call sites. */
  variant?: Variant;
  size?: Size;
  href?: string;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const base =
  "group/btn relative inline-flex items-center justify-center whitespace-nowrap font-semibold rounded-control select-none cursor-pointer " +
  "transition-[background,box-shadow,border-color,color,transform] duration-200 ease-out-soft " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-canvas " +
  "active:translate-y-px disabled:opacity-50 disabled:pointer-events-none aria-disabled:opacity-50 aria-disabled:pointer-events-none";

// Heights: 40 / 44 / 48px — md and lg meet the 44px touch-target guideline.
const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-sm gap-1.5",
  md: "h-11 px-5 text-sm gap-2",
  lg: "h-12 px-6 text-base gap-2",
};

// White text stays >= 5.2:1 on every primary fill (normal and hover).
const primary =
  "bg-gradient-brand text-white shadow-glow hover:bg-gradient-brand-strong hover:shadow-[0_14px_36px_-12px_rgb(72_64_245/0.7)]";

const variants: Record<Variant, string> = {
  primary,
  glow: primary,
  secondary: "bg-raised text-fg border border-line hover:bg-raised-hover hover:border-line-strong",
  outline: "bg-transparent text-fg border border-line-strong hover:border-brand-400/60 hover:bg-white/[0.04]",
  ghost: "bg-transparent text-fg-soft hover:text-fg hover:bg-white/[0.06]",
  danger: "bg-danger/15 text-danger border border-danger/30 hover:bg-danger/25",
};

const isExternal = (href: string) => /^(https?:|mailto:|tel:)/.test(href);

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
  onClick,
  ...props
}: ButtonProps) {
  const classes = cn(base, sizes[size], variants[variant], className);

  const content = (
    <>
      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : leftIcon}
      <span>{children}</span>
      {!isLoading && rightIcon && (
        <span className="transition-transform duration-200 group-hover/btn:translate-x-0.5">{rightIcon}</span>
      )}
    </>
  );

  if (href) {
    const linkClick = onClick as unknown as React.MouseEventHandler<HTMLAnchorElement> | undefined;
    return isExternal(href) ? (
      <a href={href} className={classes} onClick={linkClick}>
        {content}
      </a>
    ) : (
      <Link href={href} className={classes} onClick={linkClick}>
        {content}
      </Link>
    );
  }

  return (
    <button
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
      className={classes}
      onClick={onClick}
      {...props}
    >
      {content}
    </button>
  );
}
