import { ArrowRight, CalendarCheck, CheckCircle2, Clock, Sparkles, User, Volume2, Zap } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { brand, trustPoints } from "@/lib/site";

/** Simulated call card — the product shown working is the hero's main visual. */
function CallCard() {
  return (
    <figure className="relative">
      {/* Signal rings + glow behind the card (decorative) */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute left-1/2 top-1/2 h-[130%] w-[130%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.05]" />
        <div className="absolute left-1/2 top-1/2 h-[165%] w-[165%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.035]" />
        <div className="absolute left-1/2 top-1/2 h-3/4 w-3/4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-600/25 blur-[90px]" />
      </div>

      <div className="rounded-panel bg-gradient-to-b from-brand-400/35 via-white/10 to-white/[0.03] p-px shadow-raised">
        <div className="rounded-[calc(var(--radius-panel)-1px)] bg-card/95 p-5 backdrop-blur-xl sm:p-6">
          <div className="flex items-center justify-between border-b border-line pb-4">
            <div className="flex items-center gap-3">
              <span className="relative grid h-10 w-10 place-items-center rounded-control bg-gradient-brand text-white shadow-glow">
                <Volume2 className="h-5 w-5" aria-hidden="true" />
                <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-card bg-success" />
              </span>
              <div>
                <p className="flex items-center gap-2 text-sm font-semibold text-fg">
                  Deptloy Voice Agent
                  <span className="rounded bg-brand-500/15 px-1.5 py-px font-mono text-xs text-brand-300">v2.4</span>
                </p>
                <p className="flex items-center gap-1.5 text-xs text-fg-muted">
                  <span className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden="true" />
                  Live • Inbound Line Active
                </p>
              </div>
            </div>
            <div className="flex h-8 items-center gap-1 rounded-control border border-line bg-black/30 px-2.5" aria-hidden="true">
              {[0, 0.2, 0.4, 0.1, 0.3].map((delay, i) => (
                <span
                  key={i}
                  className="h-1.5 w-1 rounded-full bg-gradient-to-t from-brand-500 to-electric-400 animate-wave"
                  style={{ animationDelay: `${delay}s` }}
                />
              ))}
            </div>
          </div>

          <div className="my-5 flex flex-col gap-3 text-sm leading-relaxed">
            <div className="flex max-w-[88%] items-start gap-2.5">
              <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-raised-hover text-fg-muted" aria-hidden="true">
                <User className="h-3.5 w-3.5" />
              </span>
              <p className="rounded-card rounded-tl-sm border border-line bg-raised p-3 text-fg-soft">
                <span className="sr-only">Caller: </span>
                &ldquo;Hi, I need to schedule a consultation this Thursday afternoon for our team. Do you have an opening around 3 PM?&rdquo;
              </p>
            </div>
            <div className="flex max-w-[92%] flex-row-reverse items-start gap-2.5 self-end">
              <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-brand-400/40 bg-brand-500/20 text-brand-300" aria-hidden="true">
                <Sparkles className="h-3 w-3" />
              </span>
              <p className="rounded-card rounded-tr-sm border border-brand-400/25 bg-brand-500/10 p-3 text-fg">
                <span className="sr-only">AI receptionist: </span>
                &ldquo;Yes, absolutely! We have an opening on Thursday at 3:15 PM with Dr. Harris. Shall I reserve that slot and send you the calendar invite?&rdquo;
              </p>
            </div>
          </div>

          <div className="rounded-card border border-line bg-raised/70 p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wide text-fg-muted">Confirmed Booking</span>
              <Badge variant="success" size="sm" dot>
                Confirmed
              </Badge>
            </div>
            <div className="flex items-center justify-between text-sm text-fg">
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-brand-300" aria-hidden="true" />
                Thursday, 3:15 PM
              </span>
              <span className="text-xs text-fg-muted">Duration: 45 min</span>
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-line pt-3 text-xs text-fg-muted">
              <span>Client: Sarah Jenkins</span>
              <span className="font-medium text-brand-300">Synced to CRM</span>
            </div>
          </div>

          <figcaption className="mt-4 flex items-center justify-between gap-3 border-t border-line pt-4 text-xs">
            <span className="text-fg-subtle">Simulated live dashboard preview</span>
            <Link href="/demo" className="inline-flex items-center gap-1 font-semibold text-link hover:text-brand-200">
              Launch Interactive Demo <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </figcaption>
        </div>
      </div>

      {/* Floating status chips (decorative echoes of the card) */}
      <div
        className="absolute -top-5 left-10 hidden items-center gap-2 rounded-full border border-line bg-card/95 px-3 py-2 text-xs text-fg-soft shadow-card backdrop-blur-md xl:flex"
        aria-hidden="true"
      >
        <CheckCircle2 className="h-4 w-4 text-success" /> Caller verified via CallerID
      </div>
      <div
        className="absolute -bottom-5 right-10 hidden items-center gap-2 rounded-full border border-line bg-card/95 px-3 py-2 text-xs text-fg-soft shadow-card backdrop-blur-md xl:flex"
        aria-hidden="true"
      >
        <CalendarCheck className="h-4 w-4 text-electric-400" /> Calendar slot reserved
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

      <Container className="relative pb-section pt-12 sm:pt-16 lg:pt-20">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="flex flex-col items-start lg:col-span-7">
            <Badge variant="brand" dot pulse>
              AI-Powered Business Solutions
            </Badge>

            <h1 className="mt-6 text-display font-semibold">
              Let AI Handle the Busywork. <span className="text-gradient-brand sm:block">You Build the Business.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-lead text-fg-soft">
              Turn missed calls and manual data entry into autonomous revenue. {brand.name} builds branded AI voice
              receptionists, intelligent workflow automations, CRM pipelines, and custom software that work around the
              clock.
            </p>

            <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Button href="/contact" size="lg" rightIcon={<ArrowRight className="h-4 w-4" aria-hidden="true" />}>
                Book a Consultation
              </Button>
              <Button href="/demo" variant="outline" size="lg" leftIcon={<Zap className="h-4 w-4 text-brand-300" aria-hidden="true" />}>
                Experience AI Receptionist
              </Button>
            </div>

            <ul className="mt-12 grid w-full grid-cols-1 gap-5 border-t border-line pt-8 sm:grid-cols-3">
              {trustPoints.map((tp) => (
                <li key={tp.title}>
                  <p className="flex items-center gap-2 text-sm font-semibold text-fg">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-300" aria-hidden="true" />
                    {tp.title}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{tp.description}</p>
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
