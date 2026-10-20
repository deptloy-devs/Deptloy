"use client";

import * as React from "react";
import {
  Bot,
  Zap,
  BarChart3,
  Code2,
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { services } from "@/lib/site";
import type { ServiceSlug } from "@/types";

export function ServicesSection() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [touchStartX, setTouchStartX] = React.useState<number | null>(null);
  const [touchDeltaX, setTouchDeltaX] = React.useState(0);
  const [isDragging, setIsDragging] = React.useState(false);

  const total = services.length;
  const activeService = services[activeIndex];

  const nextCard = React.useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevCard = React.useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Touch Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    setTouchDeltaX(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const currentX = e.touches[0].clientX;
    setTouchDeltaX(currentX - touchStartX);
  };

  const handleTouchEnd = () => {
    if (touchStartX === null) return;
    if (touchDeltaX < -50) {
      nextCard();
    } else if (touchDeltaX > 50) {
      prevCard();
    }
    setTouchStartX(null);
    setTouchDeltaX(0);
  };

  // Mouse Drag Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setTouchStartX(e.clientX);
    setTouchDeltaX(0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || touchStartX === null) return;
    setTouchDeltaX(e.clientX - touchStartX);
  };

  const handleMouseUp = () => {
    if (!isDragging || touchStartX === null) return;
    if (touchDeltaX < -50) {
      nextCard();
    } else if (touchDeltaX > 50) {
      prevCard();
    }
    setIsDragging(false);
    setTouchStartX(null);
    setTouchDeltaX(0);
  };

  const iconMap: Record<ServiceSlug, React.ReactNode> = {
    "ai-receptionist": <Bot className="h-6 w-6 text-brand-400" />,
    automation: <Zap className="h-6 w-6 text-blue-400" />,
    crm: <BarChart3 className="h-6 w-6 text-emerald-400" />,
    development: <Code2 className="h-6 w-6 text-cyan-400" />,
  };

  const serviceColors: Record<ServiceSlug, { glow: string; border: string; pill: string }> = {
    "ai-receptionist": {
      glow: "from-brand-600/25 via-brand-900/10 to-transparent",
      border: "border-brand-500/40",
      pill: "bg-brand-500/15 text-brand-300 border-brand-500/30",
    },
    automation: {
      glow: "from-blue-600/25 via-blue-900/10 to-transparent",
      border: "border-blue-500/40",
      pill: "bg-blue-500/15 text-blue-300 border-blue-500/30",
    },
    crm: {
      glow: "from-emerald-600/25 via-emerald-900/10 to-transparent",
      border: "border-emerald-500/40",
      pill: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    },
    development: {
      glow: "from-cyan-600/25 via-cyan-900/10 to-transparent",
      border: "border-cyan-500/40",
      pill: "bg-cyan-500/15 text-cyan-300 border-cyan-500/30",
    },
  };

  const currentTheme = serviceColors[activeService.slug];

  return (
    <section id="services" className="relative py-20 lg:py-28 bg-surface border-y border-line overflow-hidden scroll-mt-20">
      
      {/* Background ambient radial glow matching active card */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[400px] bg-brand-600/10 blur-[140px] pointer-events-none transition-all duration-700" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <SectionHeading
          eyebrow="Our Services"
          title="Technology That Works for Your Business"
          description="Explore our specialized services one at a time. Swipe left or right, or click the tabs below to browse."
          align="center"
          className="mb-10"
        />

        {/* Top Category Tabs: Quick direct click navigation */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8 max-w-4xl mx-auto">
          {services.map((srv, idx) => {
            const isCurrent = idx === activeIndex;
            return (
              <button
                key={srv.slug}
                onClick={() => setActiveIndex(idx)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  isCurrent
                    ? "bg-brand-600 text-white shadow-lg shadow-brand-600/40 border border-brand-400/50 scale-[1.02]"
                    : "bg-raised text-fg-muted hover:text-white hover:bg-white/[0.06] border border-line"
                }`}
              >
                <span className="shrink-0">{iconMap[srv.slug]}</span>
                <span>{srv.title}</span>
                <span className="text-[10px] opacity-60 font-mono">0{idx + 1}</span>
              </button>
            );
          })}
        </div>

        {/* Swipe Instructions / Control Header */}
        <div className="flex items-center justify-between max-w-5xl mx-auto mb-4 px-2 text-xs text-fg-muted">
          <div className="flex items-center gap-2">
            <span className="font-mono text-brand-400 font-bold">
              0{activeIndex + 1} / 0{total}
            </span>
            <span>•</span>
            <span className="hidden sm:inline">Swipe along to browse services</span>
            <span className="sm:hidden">Swipe card</span>
          </div>

          {/* Prev / Next Arrow Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={prevCard}
              className="h-9 w-9 rounded-full bg-raised border border-line hover:border-brand-400 hover:bg-white/10 flex items-center justify-center text-fg-soft hover:text-white transition-all active:scale-95 cursor-pointer shadow-md"
              aria-label="Previous Service"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextCard}
              className="h-9 w-9 rounded-full bg-raised border border-line hover:border-brand-400 hover:bg-white/10 flex items-center justify-center text-fg-soft hover:text-white transition-all active:scale-95 cursor-pointer shadow-md"
              aria-label="Next Service"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* SWIPEABLE CARD CONTAINER (One at a time) */}
        <div
          className="max-w-5xl mx-auto cursor-grab active:cursor-grabbing select-none"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div
            key={activeService.slug}
            className={`relative rounded-3xl bg-gradient-to-br ${currentTheme.glow} bg-card border ${currentTheme.border} p-6 sm:p-10 lg:p-12 shadow-2xl transition-all duration-300 animate-in fade-in slide-in-from-right-4`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column (7 cols): Service Overview & Capabilities */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  {/* Top Badge & Number */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <div className="rounded-2xl bg-raised p-3 border border-line">
                        {iconMap[activeService.slug]}
                      </div>
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${currentTheme.pill}`}>
                        {activeService.badge || "Core Service"}
                      </span>
                    </div>
                    <span className="text-sm font-mono font-bold text-fg-subtle">
                      Service 0{activeIndex + 1}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-3xl sm:text-4xl font-extrabold text-white mb-2 tracking-tight">
                    {activeService.title}
                  </h3>
                  <p className="text-base font-semibold text-brand-300 mb-4">
                    {activeService.short}
                  </p>
                  <p className="text-sm text-fg-soft leading-relaxed mb-6">
                    {activeService.description}
                  </p>

                  {/* Key Capabilities Checklist */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-line mb-8">
                    {activeService.points.map((pt, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-xs text-fg-soft">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action & Metric Footer */}
                <div className="pt-4 border-t border-line flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  {activeService.metrics && (
                    <div className="flex flex-col">
                      <span className="text-[11px] text-fg-muted uppercase tracking-wider font-semibold">
                        {activeService.metrics.label}
                      </span>
                      <span className="text-lg font-bold text-white font-mono text-brand-300">
                        {activeService.metrics.value}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <Button
                      href={activeService.href}
                      variant="glow"
                      size="md"
                      className="w-full sm:w-auto font-semibold"
                      rightIcon={<ArrowRight className="h-4 w-4" />}
                    >
                      Explore {activeService.title}
                    </Button>
                  </div>
                </div>

              </div>

              {/* Right Column (5 cols): Interactive Mini-Visual Preview */}
              <div className="lg:col-span-5 flex flex-col justify-center">
                <div className="rounded-2xl bg-surface border border-line p-5 sm:p-6 shadow-inner space-y-4">
                  
                  {/* Service 0: AI Receptionist Preview */}
                  {activeService.slug === "ai-receptionist" && (
                    <div className="space-y-3 text-xs">
                      <div className="flex items-center justify-between pb-3 border-b border-line">
                        <span className="font-semibold text-white flex items-center gap-2">
                          <Bot className="h-4 w-4 text-brand-400" />
                          Live Voice Inbound Agent
                        </span>
                        <Badge variant="success" size="sm" dot>Live</Badge>
                      </div>

                      <div className="rounded-xl bg-raised p-3 text-fg-soft border border-line leading-relaxed">
                        &ldquo;Thanks for calling Bayview Clinic! I have an opening this Thursday at 3:15 PM with Dr. Harris. Would you like me to book that for you?&rdquo;
                      </div>

                      <div className="p-2.5 rounded-xl bg-brand-500/10 border border-brand-500/20 text-brand-300 flex items-center justify-between">
                        <span>Acoustic Latency: 240ms</span>
                        <span className="font-mono font-bold">99.8% Uptime</span>
                      </div>
                    </div>
                  )}

                  {/* Service 1: Automation Preview */}
                  {activeService.slug === "automation" && (
                    <div className="space-y-3 text-xs">
                      <div className="flex items-center justify-between pb-3 border-b border-line">
                        <span className="font-semibold text-white flex items-center gap-2">
                          <Zap className="h-4 w-4 text-blue-400" />
                          Automated Workflow Pipeline
                        </span>
                        <Badge variant="cyan" size="sm">Active</Badge>
                      </div>

                      <div className="space-y-2">
                        <div className="p-2.5 rounded-xl bg-raised border border-line flex items-center justify-between">
                          <span className="text-fg-soft">1. Webhook Intake Form</span>
                          <span className="text-emerald-400 text-[10px]">Instant</span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-raised border border-line flex items-center justify-between">
                          <span className="text-fg-soft">2. Calendar Slot Lock</span>
                          <span className="text-blue-400 text-[10px]">Zero Overlap</span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-raised border border-line flex items-center justify-between">
                          <span className="text-fg-soft">3. CRM & Invoice Dispatch</span>
                          <span className="text-brand-300 text-[10px]">Autopilot</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Service 2: CRM Solutions Preview */}
                  {activeService.slug === "crm" && (
                    <div className="space-y-3 text-xs">
                      <div className="flex items-center justify-between pb-3 border-b border-line">
                        <span className="font-semibold text-white flex items-center gap-2">
                          <BarChart3 className="h-4 w-4 text-emerald-400" />
                          Customer Pipeline View
                        </span>
                        <span className="font-mono text-emerald-400 font-bold">$139k Pipeline</span>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
                          <span>New Inbound Leads (18)</span>
                          <span className="font-mono font-bold">$14,200</span>
                        </div>
                        <div className="flex items-center justify-between p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-300">
                          <span>Qualified & Verified (12)</span>
                          <span className="font-mono font-bold">$28,400</span>
                        </div>
                        <div className="flex items-center justify-between p-2 rounded-lg bg-brand-500/10 border border-brand-500/20 text-brand-300">
                          <span>Consultation Booked (7)</span>
                          <span className="font-mono font-bold">$34,000</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Service 3: Development Preview */}
                  {activeService.slug === "development" && (
                    <div className="space-y-3 text-xs">
                      <div className="flex items-center justify-between pb-3 border-b border-line">
                        <span className="font-semibold text-white flex items-center gap-2">
                          <Code2 className="h-4 w-4 text-cyan-400" />
                          Next.js & React Full-Stack
                        </span>
                        <Badge variant="cyan" size="sm">TypeScript</Badge>
                      </div>

                      <div className="p-3 rounded-xl bg-black/60 font-mono text-[11px] text-fg-soft space-y-1">
                        <p><span className="text-brand-400">const</span> app = <span className="text-blue-300">createAgencyApp</span>(&#123;</p>
                        <p className="pl-3">framework: <span className="text-emerald-300">&quot;Next.js 16&quot;</span>,</p>
                        <p className="pl-3">styling: <span className="text-emerald-300">&quot;Tailwind CSS v4&quot;</span>,</p>
                        <p className="pl-3">telephony: <span className="text-brand-300">&quot;Deptloy Voice&quot;</span>,</p>
                        <p>&#125;);</p>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-fg-muted">
                        <span>Lighthouse Score: 99+</span>
                        <span className="text-cyan-400 font-semibold">Sub-second Edge</span>
                      </div>
                    </div>
                  )}

                  {/* Micro Swipe Hint */}
                  <div className="pt-2 border-t border-line flex items-center justify-between text-[11px] text-fg-subtle">
                    <span>Swipe card to see next service</span>
                    <span className="text-brand-400 font-mono">← Swipe →</span>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Visual Progress Bar & Step Dots */}
        <div className="max-w-xs mx-auto mt-6 flex flex-col items-center gap-2">
          <div className="flex items-center gap-2">
            {services.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === activeIndex
                    ? "w-8 bg-brand-500 shadow-sm shadow-brand-500/50"
                    : "w-2.5 bg-slate-700 hover:bg-slate-500"
                }`}
                aria-label={`Jump to Service ${idx + 1}`}
              />
            ))}
          </div>
          <span className="text-[11px] text-fg-subtle">
            Card {activeIndex + 1} of {total}
          </span>
        </div>

      </div>
    </section>
  );
}
