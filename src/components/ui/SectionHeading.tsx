import * as React from "react";
import { cn } from "@/lib/cn";

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  /** Heading level — keep the page outline in order (h1 → h2 → h3). */
  as?: "h1" | "h2" | "h3";
  className?: string;
}

const titleSize = {
  h1: "text-h1",
  h2: "text-h2",
  h3: "text-h3",
} as const;

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  as: Heading = "h2",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "mx-auto max-w-3xl items-center text-center" : "max-w-2xl items-start text-left",
        className
      )}
    >
      {eyebrow && (
        <p className="text-eyebrow font-semibold uppercase text-brand-300">{eyebrow}</p>
      )}
      <Heading className={cn("font-display font-semibold text-fg", titleSize[Heading])}>{title}</Heading>
      {description && <p className="text-lead text-fg-muted">{description}</p>}
    </div>
  );
}
