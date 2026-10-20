import * as React from "react";
import { cn } from "@/lib/cn";
import { Container, type ContainerProps } from "./Container";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  /** Background: page canvas or the slightly lighter alternate surface. */
  tone?: "canvas" | "surface";
  /** Vertical rhythm: standard section or a tighter band. */
  spacing?: "default" | "sm" | "none";
  /** Hairline divider above the section. */
  divider?: boolean;
  container?: ContainerProps["size"] | false;
}

/** Page section with consistent vertical rhythm, background tone and container. */
export function Section({
  tone = "canvas",
  spacing = "default",
  divider = false,
  container = "default",
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        "relative",
        tone === "surface" ? "bg-surface" : "bg-canvas",
        spacing === "default" && "py-section",
        spacing === "sm" && "py-section-sm",
        divider && "border-t border-line",
        className
      )}
      {...props}
    >
      {container === false ? children : <Container size={container}>{children}</Container>}
    </section>
  );
}
