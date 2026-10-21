import type { Metadata } from "next";
import { Clock, Mail, Phone, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/marketing/PageHero";
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
    { icon: Clock, label: "Engineering Response Time", value: "Monday - Friday • Sub-4 Hour Response" },
  ];

  return (
    <>
      <PageHero
        eyebrow="Technical Consultation"
        title="Let's Build Your Custom AI Infrastructure"
        description="Tell us about your customer communication bottlenecks, appointment volume, and current software. Our technical team will review and outline a concrete deployment scope."
      />

      <section className="pb-section">
        <Container>
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10">
            <Card padding="xl" radius="panel" className="lg:col-span-7">
              <ContactForm />
            </Card>

            <aside className="flex flex-col gap-6 lg:col-span-5">
              <Card padding="lg" radius="panel">
                <h2 className="font-sans text-xl font-semibold text-fg">Direct Communication</h2>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                  Prefer a direct line or have immediate technical questions? Contact our solutions engineering team
                  directly.
                </p>
                <ul className="mt-6 space-y-4 border-t border-line pt-6 text-sm">
                  {contacts.map((c) => (
                    <li key={c.label} className="flex items-start gap-3.5">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-control border border-line bg-raised text-brand-300">
                        <c.icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span>
                        <span className="block text-xs font-semibold uppercase tracking-wide text-fg-muted">{c.label}</span>
                        {c.href ? (
                          <a href={c.href} className="font-medium text-fg hover:text-brand-200">
                            {c.value}
                          </a>
                        ) : (
                          <span className="text-fg-soft">{c.value}</span>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </Card>

              <Card padding="lg" radius="panel" tone="highlight" className="text-center">
                <Sparkles className="mx-auto h-6 w-6 text-brand-300" aria-hidden="true" />
                <h2 className="mt-3 font-sans text-base font-semibold text-fg">Looking for Immediate Hands-On Testing?</h2>
                <p className="mx-auto mt-2 max-w-sm text-sm text-fg-muted">
                  Try our interactive appointment booking prototype right in your browser without waiting for an email
                  reply.
                </p>
                <Button href="/demo" variant="outline" size="md" className="mt-5 w-full">
                  Launch AI Demo Prototype
                </Button>
              </Card>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
