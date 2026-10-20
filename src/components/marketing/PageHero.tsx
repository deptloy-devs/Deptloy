import * as React from "react";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";

interface PageHeroProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Buttons — primary first. */
  actions?: React.ReactNode;
  align?: "center" | "left";
  /** Extra content under the actions (notices, filters…). */
  children?: React.ReactNode;
}

/** Shared top section for inner pages: same glow, rhythm and type scale everywhere. */
export function PageHero({ eyebrow, title, description, actions, align = "center", children }: PageHeroProps) {
  const centered = align === "center";
  return (
    <section className="relative isolate overflow-hidden">
      <div className="glow-brand" aria-hidden="true" />
      <div className="glow-accent" aria-hidden="true" />
      <div
        className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]"
        aria-hidden="true"
      />
      <Container className="relative pb-section-sm pt-14 sm:pt-20">
        <div className={cn("flex max-w-3xl flex-col", centered ? "mx-auto items-center text-center" : "items-start")}>
          {eyebrow && (
            <Badge variant="brand" dot>
              {eyebrow}
            </Badge>
          )}
          <h1 className="mt-5 text-h1 font-semibold">{title}</h1>
          {description && <p className="mt-5 text-lead text-fg-soft">{description}</p>}
          {actions && (
            <div className={cn("mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row", centered && "sm:justify-center")}>
              {actions}
            </div>
          )}
          {children}
        </div>
      </Container>
    </section>
  );
}
