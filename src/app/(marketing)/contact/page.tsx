import type { Metadata } from "next";
import { ArrowRight, Clock, Mail, Phone, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/marketing/ContactForm";
import { brand } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact — Book a Consultation",
  description:
    "Tell us about your call volume, booking workflow and software. Deptloy's team will outline a concrete AI receptionist and automation scope for your business.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const telHref = `tel:${brand.phone.replace(/[^\d+]/g, "")}`;
  const contacts = [
    { icon: Mail, label: "Solutions Email", value: brand.contactEmail, href: `mailto:${brand.contactEmail}` },
    { icon: Phone, label: "Direct Phone", value: brand.phone, href: telHref },
    { icon: Clock, label: "Turnaround", value: "Monday – Friday • Sub-4 Hour Response" },
  ];

  return (
    <div className="relative isolate min-h-[calc(100dvh-4rem)] overflow-hidden">
      {/* Subtle brand glow and grid backdrop */}
      <div className="glow-brand" aria-hidden="true" />
      <div className="glow-accent" aria-hidden="true" />
      <div
        className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]"
        aria-hidden="true"
      />

      <Container className="relative pt-6 sm:pt-8 lg:pt-10 pb-12 sm:pb-16">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Left Column: Heading, Direct Communication & Fast Demo Action */}
          <div className="flex flex-col gap-6 lg:col-span-5">
            <div>
              <Badge variant="brand" dot pulse>
                Technical Consultation
              </Badge>
              <h1 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-fg">
                Let&apos;s Build Your AI Infrastructure
              </h1>
              <p className="mt-3 text-sm sm:text-base leading-relaxed text-fg-soft">
                Tell us about your customer call volume, booking workflow, and current software. Our technical team
                will outline a concrete deployment scope with zero guesswork.
              </p>
            </div>

            {/* Direct Communication Channels */}
            <Card padding="md" radius="panel" className="border-line bg-card/80 backdrop-blur-md">
              <h2 className="text-xs font-bold uppercase tracking-wider text-fg-muted">
                Direct Engineering Channels
              </h2>
              <ul className="mt-3.5 space-y-3">
                {contacts.map((c) => (
                  <li key={c.label} className="flex items-center gap-3">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-control border border-line bg-raised text-brand-300">
                      <c.icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <span className="block text-[10px] font-semibold uppercase tracking-wide text-fg-muted">
                        {c.label}
                      </span>
                      {c.href ? (
                        <a href={c.href} className="text-xs sm:text-sm font-medium text-fg hover:text-brand-300 transition-colors truncate block">
                          {c.value}
                        </a>
                      ) : (
                        <span className="text-xs sm:text-sm text-fg-soft truncate block">{c.value}</span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Interactive Demo Callout */}
            <Card padding="md" radius="panel" tone="highlight" className="flex items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="flex items-center gap-1.5 text-xs font-bold text-fg">
                  <Sparkles className="h-3.5 w-3.5 text-brand-400" aria-hidden="true" />
                  Want Immediate Hands-On Testing?
                </span>
                <p className="text-xs text-fg-muted">
                  Test our live interactive AI booking prototype right in your browser.
                </p>
              </div>
              <Button href="/demo" variant="outline" size="sm" className="shrink-0">
                Try Demo <ArrowRight className="h-3.5 w-3.5 ml-1" />
              </Button>
            </Card>
          </div>

          {/* Right Column: Full Contact Form Immediately Visible Above the Fold */}
          <div className="lg:col-span-7">
            <Card padding="lg" radius="panel" className="border-line bg-card/95 shadow-raised backdrop-blur-xl">
              <ContactForm />
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
}
