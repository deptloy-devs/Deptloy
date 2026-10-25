import { ArrowRight, CalendarCheck, CheckCircle2, Clock, Sparkles, User, Volume2, Zap } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";

/** Simulated call card — simplified, spacious, zero text clutter */
function CallCard() {
  return (
    <figure className="relative mx-auto max-w-lg lg:max-w-none">
      {/* Decorative background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute left-1/2 top-1/2 h-3/4 w-3/4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-600/20 blur-[90px]" />
      </div>

      <div className="rounded-panel border border-brand-400/30 bg-card/95 p-5 shadow-raised backdrop-blur-xl sm:p-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-line pb-4">
          <div className="flex items-center gap-3">
            <span className="relative grid h-10 w-10 place-items-center rounded-control bg-gradient-brand text-white shadow-glow">
              <Volume2 className="h-5 w-5" aria-hidden="true" />
              <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-card bg-success" />
            </span>
            <div>
              <p className="flex items-center gap-2 text-sm font-semibold text-fg">
                Deptloy Voice Agent
                <span className="rounded bg-brand-500/15 px-1.5 py-0.5 font-mono text-[10px] text-brand-300">
                  Live
                </span>
              </p>
              <p className="flex items-center gap-1.5 text-xs text-fg-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" aria-hidden="true" />
                Inbound Active
              </p>
            </div>
          </div>

          <div className="flex h-8 items-center gap-1 rounded-control border border-line bg-raised px-2.5" aria-hidden="true">
            {[0, 0.2, 0.4, 0.1, 0.3].map((delay, i) => (
              <span
                key={i}
                className="h-2 w-1 rounded-full bg-gradient-to-t from-brand-500 to-electric-400 animate-wave"
                style={{ animationDelay: `${delay}s` }}
              />
            ))}
          </div>
        </div>

        {/* Short, crisp dialogue */}
        <div className="my-5 flex flex-col gap-3 text-sm">
          <div className="flex max-w-[88%] items-start gap-2.5">
            <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-raised text-fg-muted" aria-hidden="true">
              <User className="h-3.5 w-3.5" />
            </span>
            <p className="rounded-card rounded-tl-sm border border-line bg-raised p-3 text-fg-soft text-xs sm:text-sm">
              &ldquo;Hi, do you have an opening for a consultation this Thursday around 3 PM?&rdquo;
            </p>
          </div>
          <div className="flex max-w-[92%] flex-row-reverse items-start gap-2.5 self-end">
            <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-brand-400/40 bg-brand-500/20 text-brand-300" aria-hidden="true">
              <Sparkles className="h-3 w-3" />
            </span>
            <p className="rounded-card rounded-tr-sm border border-brand-400/25 bg-brand-500/10 p-3 text-fg text-xs sm:text-sm">
              &ldquo;Yes! Dr. Harris is open at 3:15 PM. Shall I reserve that and send your invite?&rdquo;
            </p>
          </div>
        </div>

        {/* Booking Confirmation Box */}
        <div className="rounded-card border border-line bg-raised/70 p-3.5">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-xs font-semibold text-fg">
              <Clock className="h-3.5 w-3.5 text-brand-300" aria-hidden="true" />
              Thursday, 3:15 PM
            </span>
            <Badge variant="success" size="sm" dot>
              Confirmed
            </Badge>
          </div>
          <div className="mt-2 flex items-center justify-between border-t border-line/60 pt-2 text-[11px] text-fg-muted">
            <span>Client: Sarah J.</span>
            <span className="font-medium text-brand-300">Synced to CRM</span>
          </div>
        </div>

        <figcaption className="mt-4 flex items-center justify-between gap-3 border-t border-line pt-3 text-xs">
          <span className="text-fg-subtle">Live preview</span>
          <Link href="/demo" className="inline-flex items-center gap-1 font-semibold text-link hover:text-brand-200">
            Launch Interactive Demo <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </figcaption>
      </div>
    </figure>
  );
}

const trustItems = [
  {
    title: "Tailored Solutions",
    description: "Built around your rules & brand.",
  },
  {
    title: "Workflow Automation",
    description: "2-way calendar & CRM sync.",
  },
  {
    title: "Scalable Tech",
    description: "Sub-second voice, 99.9% uptime.",
  },
];

export function DemoHero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="glow-brand" aria-hidden="true" />
      <div className="glow-accent" aria-hidden="true" />
      <div
        className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]"
        aria-hidden="true"
      />

      <Container className="relative pb-16 pt-12 sm:pt-16 lg:pt-20">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="flex flex-col items-start lg:col-span-7">
            <Badge variant="brand" dot pulse>
              AI-Powered Business Solutions
            </Badge>

            <h1 className="mt-6 text-display font-semibold tracking-tight text-fg">
              Let AI Handle the Busywork.{" "}
              <span className="text-gradient-brand sm:block">You Build the Business.</span>
            </h1>

            {/* Concise 1-sentence lead instead of heavy 3-line block */}
            <p className="mt-5 max-w-xl text-base sm:text-lg leading-relaxed text-fg-soft">
              Turn missed calls and manual data entry into autonomous revenue with custom AI voice agents,
              smart workflows, and CRM systems.
            </p>

            <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Button href="/contact" size="lg" rightIcon={<ArrowRight className="h-4 w-4" aria-hidden="true" />}>
                Book a Consultation
              </Button>
              <Button href="/demo" variant="outline" size="lg" leftIcon={<Zap className="h-4 w-4 text-brand-300" aria-hidden="true" />}>
                Experience AI Receptionist
              </Button>
            </div>

            {/* Uncrowded, short trust points with 70% reduced text */}
            <ul className="mt-10 grid w-full grid-cols-1 gap-4 border-t border-line pt-6 sm:grid-cols-3">
              {trustItems.map((tp) => (
                <li key={tp.title}>
                  <p className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-fg">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-300" aria-hidden="true" />
                    {tp.title}
                  </p>
                  <p className="mt-1 text-xs text-fg-muted">{tp.description}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative lg:col-span-5">
            <CallCard />
          </div>
        </div>
      </Container>
    </section>
  );
}
