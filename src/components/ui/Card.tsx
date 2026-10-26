import * as React from "react";
import { cn } from "@/lib/cn";

type CardElement = "div" | "article" | "li";

export interface CardProps extends React.HTMLAttributes<HTMLElement> {
  as?: CardElement;
  /** Lift + brand border on hover. Use when the whole card is clickable. */
  interactive?: boolean;
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  /** card = default surface, raised = nested surface, highlight = brand-tinted callout. */
  tone?: "card" | "raised" | "highlight";
  radius?: "card" | "panel";
}

// Note: cn() concatenates (no class merging), so variants live here instead of
// being overridden through className.
const paddings = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-6 sm:p-8",
  xl: "p-6 sm:p-10",
} as const;

const tones = {
  card: "border-line bg-card/90",
  raised: "border-line bg-raised/80",
  highlight: "border-[var(--pur)]/25 bg-card/90 bg-gradient-to-br from-[var(--mist)]/50 to-card dark:from-[var(--pur)]/15",
} as const;

/** Standard surface for content blocks. */
export function Card({
  as: Tag = "div",
  interactive = false,
  padding = "md",
  tone = "card",
  radius = "card",
  className,
  ...props
}: CardProps) {
  return (
    <Tag
      className={cn(
        "relative border shadow-card",
        radius === "panel" ? "rounded-panel" : "rounded-card",
        tones[tone],
        paddings[padding],
        interactive &&
          "transition-[transform,border-color,box-shadow] duration-200 ease-out-soft hover:-translate-y-0.5 hover:border-brand-400/35 hover:shadow-raised focus-within:border-brand-400/35",
        className
      )}
      {...props}
    />
  );
}
