import { ArrowRight, CheckCircle2, Sparkles, User, Volume2, Zap } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { brand } from "@/lib/site";

/** Clean, minimal simulated voice agent card — shows the product working with zero clutter. */
function CallCard() {
  return (
    <figure className="relative mx-auto w-full max-w-lg">
      {/* Soft background glow */}
      <div
        className="pointer-events-none absolute -inset-2 -z-10 rounded-panel bg-gradient-to-b from-brand-600/20 via-electric-500/10 to-transparent blur-2xl"
        aria-hidden="true"
      />

      <div className="overflow-hidden rounded-panel border border-line bg-card/95 p-5 shadow-raised backdrop-blur-xl sm:p-6">
        {/* Header: Agent status + animated soundwave */}
        <div className="flex items-center justify-between border-b border-line pb-4">
          <div className="flex items-center gap-3">
            <span className="relative grid h-9 w-9 shrink-0 place-items-center rounded-control bg-gradient-brand text-white shadow-glow">
              <Volume2 className="h-4.5 w-4.5" aria-hidden="true" />
              <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-card bg-success" />
            </span>
            <div>
              <p className="flex items-center gap-2 text-sm font-semibold text-fg">
                Deptloy Voice Agent
                <span className="rounded bg-brand-500/15 px-1.5 py-0.5 font-mono text-[10px] text-brand-300">
                  Live Inbound
                </span>
              </p>
              <p className="text-[11px] text-fg-muted">Sub-500ms natural voice pipeline</p>
            </div>
          </div>

          {/* Equalizer animation */}
          <div className="flex h-7 items-center gap-1 rounded-control border border-line bg-black/20 px-2 dark:bg-black/40" aria-hidden="true">
            {[0, 0.2, 0.4, 0.1, 0.3].map((delay, i) => (
              <span
                key={i}
                className="h-2 w-1 rounded-full bg-gradient-to-t from-brand-500 to-electric-400 animate-wave"
                style={{ animationDelay: `${delay}s` }}
              />
            ))}
          </div>
        </div>

        {/* Clean, high-impact conversation preview */}
        <div className="my-5 space-y-3 text-xs sm:text-sm leading-relaxed">
          {/* Caller */}
          <div className="flex items-start gap-2.5">
            <span
              className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-raised text-fg-muted"
              aria-hidden="true"
            >
              <User className="h-3.5 w-3.5" />
            </span>
            <div className="rounded-card rounded-tl-sm border border-line bg-raised/80 px-3.5 py-2.5 text-fg-soft">
              &ldquo;Hi, do you have any openings this Thursday around 3 PM?&rdquo;
            </div>
          </div>

          {/* AI Receptionist */}
          <div className="flex flex-row-reverse items-start gap-2.5">
            <span
              className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-brand-400/40 bg-brand-500/20 text-brand-300"
              aria-hidden="true"
            >
              <Sparkles className="h-3.5 w-3.5" />
            </span>
            <div className="rounded-card rounded-tr-sm border border-brand-400/25 bg-brand-500/10 px-3.5 py-2.5 font-medium text-fg">
              &ldquo;Thursday at 3:15 PM is open with Dr. Harris. Shall I lock that in for you?&rdquo;
            </div>
          </div>
        </div>

        {/* Clean Status Result Bar */}
        <div className="flex items-center justify-between rounded-card border border-emerald-500/25 bg-emerald-500/10 px-3.5 py-2.5 text-xs text-fg">
          <span className="flex items-center gap-1.5 font-medium text-emerald-500 dark:text-emerald-400">
            <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
            Appointment Booked & Synced to CRM
          </span>
          <span className="font-mono text-[11px] text-fg-muted">&lt; 1.8s</span>
        </div>

        {/* Clean footer trigger */}
        <figcaption className="mt-4 flex items-center justify-between border-t border-line pt-3.5 text-xs">
          <span className="text-fg-subtle">Ready to answer your calls</span>
          <Link
            href="/demo"
            className="inline-flex items-center gap-1 font-semibold text-link hover:text-brand-200 transition-colors"
          >
            Launch Interactive Demo <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </figcaption>
      </div>
    </figure>
  );
}

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="glow-brand" aria-hidden="true" />
      <div className="glow-accent" aria-hidden="true" />
      <div
        className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]"
        aria-hidden="true"
      />

      <Container className="relative pb-section-sm pt-12 sm:pt-16 lg:pt-20">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Minimal, punchy copy */}
          <div className="flex flex-col items-start lg:col-span-7">
            <Badge variant="brand" dot pulse>
              24/7 AI Voice Receptionist & Automation
            </Badge>

            <h1 className="mt-6 text-display font-semibold tracking-tight text-fg">
              Let AI Handle the Busywork.{" "}
              <span className="text-gradient-brand sm:block">You Build the Business.</span>
            </h1>

            <p className="mt-5 max-w-xl text-lead text-fg-soft leading-relaxed">
              Never miss a client call again. {brand.name} builds custom AI voice agents and automations
              that answer 24/7, book appointments on the spot, and sync directly into your CRM.
            </p>

            <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Button href="/contact" size="lg" rightIcon={<ArrowRight className="h-4 w-4" aria-hidden="true" />}>
                Book a Consultation
              </Button>
              <Button
                href="/demo"
                variant="outline"
                size="lg"
                leftIcon={<Zap className="h-4 w-4 text-brand-300" aria-hidden="true" />}
              >
                Experience AI Demo
              </Button>
            </div>

            {/* Minimal trust checkmarks — zero reading fatigue */}
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-line pt-6 text-xs text-fg-muted">
              <span className="flex items-center gap-1.5 font-medium text-fg">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" aria-hidden="true" />
                24/7 Inbound Answering
              </span>
              <span className="flex items-center gap-1.5 font-medium text-fg">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" aria-hidden="true" />
                Sub-Second Voice Response
              </span>
              <span className="flex items-center gap-1.5 font-medium text-fg">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" aria-hidden="true" />
                Direct Calendar & CRM Sync
              </span>
            </div>
          </div>

          {/* Right Column: Clean voice agent visual */}
          <div className="relative lg:col-span-5">
            <CallCard />
          </div>
        </div>
      </Container>
    </section>
  );
}
