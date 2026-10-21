import { ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";

export function FinalCta() {
  return (
    <Section divider container="narrow" className="overflow-hidden">
      <div className="relative isolate overflow-hidden rounded-panel border border-brand-400/20 bg-card px-6 py-12 text-center shadow-raised sm:px-12 sm:py-16">
        <div
          className="absolute left-1/2 top-0 -z-10 h-72 w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-600/30 blur-[100px]"
          aria-hidden="true"
        />
        <div className="bg-grid absolute inset-0 -z-10 opacity-50 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" aria-hidden="true" />

        <p className="text-eyebrow font-semibold uppercase text-brand-300">Launch Your Custom AI Infrastructure</p>
        <h2 className="mx-auto mt-4 max-w-2xl text-h2 font-semibold">Ready to Make Your Business Work Smarter?</h2>
        <p className="mx-auto mt-5 max-w-2xl text-lead text-fg-soft">
          Stop losing leads to voicemail and hours to manual administrative busywork. Connect with our technical team to
          design an AI receptionist and automation suite tailored to your business.
        </p>

        <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <Button href="/contact" size="lg" rightIcon={<ArrowRight className="h-4 w-4" aria-hidden="true" />}>
            Book a Consultation
          </Button>
          <Button href="/demo" variant="outline" size="lg">
            Explore AI Receptionist
          </Button>
        </div>

        <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t border-line pt-8 text-sm text-fg-muted">
          <li className="flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-success" aria-hidden="true" />
            Custom Business Scoping
          </li>
          <li>No Complex Migration</li>
          <li>Deploy in 3–7 Days</li>
        </ul>
      </div>
    </Section>
  );
}
