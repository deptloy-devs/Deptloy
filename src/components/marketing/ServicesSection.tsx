"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceIcon } from "./ServiceIcon";
import { services } from "@/lib/site";
import { cn } from "@/lib/cn";

/** Four service cards — shared by /services overview. Minimal and focused. */
export function ServiceGrid() {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2">
      {services.map((srv, idx) => (
        <li key={srv.slug}>
          <Reveal delay={(idx % 2) * 60} className="h-full">
            <article className="group relative flex h-full flex-col justify-between rounded-card border border-line bg-card p-5 sm:p-6 shadow-card transition-all duration-200 hover:-translate-y-1 hover:border-brand-400/35 hover:shadow-raised">
              <div>
                <div className="flex items-start justify-between gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-control border border-brand-400/25 bg-brand-500/10 text-brand-300">
                    <ServiceIcon slug={srv.slug} className="h-5 w-5" />
                  </span>
                  {srv.badge && <Badge size="sm" variant={idx === 0 ? "brand" : "default"}>{srv.badge}</Badge>}
                </div>

                <h3 className="mt-4 text-xl font-semibold text-fg">
                  <Link href={srv.href} className="after:absolute after:inset-0 focus-visible:outline-none">
                    {srv.title}
                  </Link>
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{srv.short}</p>

                {/* Only 2 core capabilities */}
                <ul className="mt-4 space-y-1.5">
                  {srv.points.slice(0, 2).map((pt) => (
                    <li key={pt} className="flex items-center gap-2 text-xs text-fg-soft">
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-500" aria-hidden="true" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-5 border-t border-line pt-3.5">
                <div className="flex items-end justify-between gap-4">
                  {srv.metrics && (
                    <div>
                      <p className="text-[11px] text-fg-muted">{srv.metrics.label}</p>
                      <p className="font-display text-base font-semibold text-fg">{srv.metrics.value}</p>
                    </div>
                  )}
                  <span className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-link group-hover:text-brand-200 transition-colors">
                    Explore
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </div>
              </div>
            </article>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}

/** Home page services section — 3D Stacked Circular Swipe Carousel with Minimal Cards */
export function ServicesSection() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [dragX, setDragX] = React.useState(0);
  const [isDragging, setIsDragging] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const startXRef = React.useRef(0);
  const hasMovedRef = React.useRef(false);

  const total = services.length;

  const nextCard = React.useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevCard = React.useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Pointer drag events without setPointerCapture to keep native clicks 100% working
  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0 && e.pointerType === "mouse") return;
    startXRef.current = e.clientX;
    hasMovedRef.current = false;
    setIsDragging(true);
    setDragX(0);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const currentX = e.clientX;
    const delta = currentX - startXRef.current;
    if (Math.abs(delta) > 8) {
      hasMovedRef.current = true;
      setDragX(delta);
    }
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    if (dragX < -40) {
      nextCard();
    } else if (dragX > 40) {
      prevCard();
    }
    setIsDragging(false);
    setDragX(0);
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      prevCard();
    } else if (e.key === "ArrowRight") {
      nextCard();
    }
  };

  return (
    <Section id="services" tone="surface" divider className="overflow-hidden">
      {/* Centered Section Header */}
      <SectionHeading
        eyebrow="Technology That Works for Your Business"
        title="Our Services"
        align="center"
        className="mb-10"
      />

      {/* 3D Stacked Carousel Arena with Left & Right Flank Arrows Beside Cards */}
      <div className="relative mx-auto flex items-center justify-center gap-3 sm:gap-6 lg:gap-8 max-w-6xl px-2 sm:px-4">
        {/* Left Side Arrow Button */}
        <button
          type="button"
          onClick={prevCard}
          aria-label="Previous service"
          className="shrink-0 grid h-11 w-11 sm:h-12 sm:w-12 lg:h-13 lg:w-13 place-items-center rounded-full border border-line bg-card/95 text-fg shadow-raised backdrop-blur-md transition-all duration-200 hover:scale-105 hover:border-brand-400/50 hover:bg-raised hover:text-brand-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 cursor-pointer z-30"
        >
          <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
        </button>

        {/* 3D Carousel Arena in Center — Compact, minimal height */}
        <div
          ref={containerRef}
          tabIndex={0}
          role="region"
          aria-label="Services carousel: swipe left or right"
          onKeyDown={handleKeyDown}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          className="relative flex-1 h-[340px] sm:h-[355px] max-w-2xl select-none cursor-grab active:cursor-grabbing focus:outline-none"
          style={{
            perspective: "1200px",
            touchAction: "pan-y",
          }}
        >
          {services.map((srv, idx) => {
            let diff = idx - activeIndex;
            while (diff > total / 2) diff -= total;
            while (diff < -total / 2) diff += total;

            // Normalized real-time drag progress
            const progress = isDragging ? Math.max(-1, Math.min(1, dragX / 300)) : 0;
            const offset = diff + progress;
            const absOffset = Math.abs(offset);

            // Hide cards stacked completely behind
            if (absOffset > 1.7) {
              return (
                <div
                  key={srv.slug}
                  aria-hidden="true"
                  className="absolute inset-x-0 mx-auto w-full max-w-md sm:max-w-lg h-full pointer-events-none opacity-0 invisible"
                  style={{
                    transform: `translateX(0%) translateZ(-260px) rotateY(0deg) scale(0.7)`,
                    zIndex: 0,
                  }}
                />
              );
            }

            // 3D Circular Arc Path transforms with clean containment
            const translateX = offset * 36;
            const translateZ = -absOffset * 110;
            const rotateY = -offset * 22;
            const scale = Math.max(0.84, 1 - absOffset * 0.12);
            const opacity = Math.max(0.25, 1 - absOffset * 0.45);
            const zIndex = Math.round(30 - absOffset * 10);
            const isActive = absOffset < 0.35;

            // Inner Card Markup: Minimal, essential information only
            const CardBody = (
              <>
                {/* Active Card Radial Aura */}
                {isActive && (
                  <div
                    className="pointer-events-none absolute -top-16 left-1/2 -z-10 h-48 w-64 -translate-x-1/2 rounded-full bg-brand-500/15 blur-[60px]"
                    aria-hidden="true"
                  />
                )}

                <div>
                  {/* Top Bar: Icon, Badge, Step Counter */}
                  <div className="flex items-center justify-between gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-control border border-brand-400/25 bg-brand-500/10 text-brand-300 shadow-sm">
                      <ServiceIcon slug={srv.slug} className="h-5 w-5" />
                    </span>
                    <div className="flex items-center gap-2">
                      {srv.badge && (
                        <Badge size="sm" variant={idx === 0 ? "brand" : "default"}>
                          {srv.badge}
                        </Badge>
                      )}
                      <span className="font-mono text-xs font-semibold text-fg-subtle">
                        0{idx + 1} / 0{total}
                      </span>
                    </div>
                  </div>

                  {/* Heading & Crisp Tagline */}
                  <h3 className="mt-4 font-display text-xl sm:text-2xl font-bold tracking-tight text-fg group-hover:text-brand-300 transition-colors">
                    {srv.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-fg-soft font-medium">
                    {srv.short}
                  </p>

                  {/* Only 2 Effective Highlights (No walls of text) */}
                  <ul className="mt-4 space-y-1.5">
                    {srv.points.slice(0, 2).map((pt) => (
                      <li key={pt} className="flex items-center gap-2 text-xs text-fg-muted">
                        <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-500" aria-hidden="true" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Bar: Key Metric + Direct Page Link */}
                <div className="mt-5 border-t border-line pt-3.5">
                  <div className="flex items-end justify-between gap-4">
                    {srv.metrics && (
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-fg-subtle">{srv.metrics.label}</p>
                        <p className="font-display text-base font-bold text-fg">{srv.metrics.value}</p>
                      </div>
                    )}
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-link group-hover:text-brand-200 transition-colors">
                      View Service
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </>
            );

            return (
              <div
                key={srv.slug}
                aria-hidden={!isActive}
                style={{
                  transform: `translateX(${translateX}%) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                  opacity,
                  zIndex,
                  transition: isDragging
                    ? "none"
                    : "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.5s ease-out",
                  transformStyle: "preserve-3d",
                }}
                className={cn(
                  "absolute inset-x-0 mx-auto w-full max-w-md sm:max-w-lg h-full transition-[border-color,box-shadow]"
                )}
              >
                {isActive ? (
                  /* The active card is a native Next.js Link */
                  <Link
                    href={srv.href}
                    onClick={(e) => {
                      if (hasMovedRef.current) {
                        e.preventDefault();
                      }
                    }}
                    className="group relative flex h-full flex-col justify-between rounded-panel border bg-card/95 p-5 sm:p-6 backdrop-blur-xl transition-[border-color,box-shadow] duration-300 border-brand-400/40 shadow-glow ring-1 ring-brand-400/20 hover:border-brand-400/60 block cursor-pointer"
                  >
                    {CardBody}
                  </Link>
                ) : (
                  /* Side cards rotate to front on click */
                  <article
                    onClick={() => {
                      if (hasMovedRef.current) return;
                      if (diff === 1) nextCard();
                      else if (diff === -1) prevCard();
                    }}
                    className="relative flex h-full flex-col justify-between rounded-panel border bg-card/95 p-5 sm:p-6 backdrop-blur-xl transition-[border-color,box-shadow] duration-300 border-line shadow-card hover:border-brand-400/30 cursor-pointer"
                  >
                    {CardBody}
                  </article>
                )}
              </div>
            );
          })}
        </div>

        {/* Right Side Arrow Button */}
        <button
          type="button"
          onClick={nextCard}
          aria-label="Next service"
          className="shrink-0 grid h-11 w-11 sm:h-12 sm:w-12 lg:h-13 lg:w-13 place-items-center rounded-full border border-line bg-card/95 text-fg shadow-raised backdrop-blur-md transition-all duration-200 hover:scale-105 hover:border-brand-400/50 hover:bg-raised hover:text-brand-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 cursor-pointer z-30"
        >
          <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
        </button>
      </div>

      {/* Swipe Status Indicator & Navigation Dots */}
      <div className="mt-8 flex flex-col items-center gap-2.5">
        <div className="flex items-center gap-2">
          {services.map((srv, idx) => (
            <button
              key={srv.slug}
              type="button"
              onClick={() => setActiveIndex(idx)}
              aria-label={`Jump to ${srv.title}`}
              className={cn(
                "h-2 rounded-full transition-all duration-300 cursor-pointer",
                idx === activeIndex
                  ? "w-8 bg-brand-400 shadow-glow"
                  : "w-2 bg-line-strong hover:bg-fg-muted"
              )}
            />
          ))}
        </div>
        <p className="flex items-center gap-2 font-mono text-[11px] text-fg-subtle">
          <Sparkles className="h-3 w-3 text-brand-400" />
          <span>Click active card to view page • Swipe or use side arrows</span>
        </p>
      </div>
    </Section>
  );
}
