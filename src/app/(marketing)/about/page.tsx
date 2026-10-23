import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Compass, Handshake, LineChart, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { PlaceholderTag } from "@/components/ui/PlaceholderTag";
import { PageHero } from "@/components/marketing/PageHero";
import { ServiceIcon } from "@/components/marketing/ServiceIcon";
import { brand, companyValues, industries, proofStats, services, team } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `${brand.name} builds AI receptionists, workflow automation, CRM systems and custom software for service businesses. Meet the team and how we work.`,
  alternates: { canonical: "/about" },
};

const valueIcons = [Compass, ShieldCheck, LineChart, Handshake];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Deptloy"
        title="We Build the Systems That Let Service Businesses Grow"
        description={brand.shortDescription}
        actions={
          <>
            <Button href="/contact" size="lg" rightIcon={<ArrowRight className="h-4 w-4" aria-hidden="true" />}>
              Book a Consultation
            </Button>
            <Button href="/projects" variant="outline" size="lg">
              See Our Work
            </Button>
          </>
        }
      />

      {/* Story + credibility */}
      <Section tone="surface" divider>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-eyebrow font-semibold uppercase text-brand-300">Our Story</p>
              <PlaceholderTag label="Story: placeholder" />
            </div>
            <h2 className="mt-4 text-h2 font-semibold">Built for the businesses that can&apos;t afford to miss a call</h2>
            <div className="mt-6 space-y-4 text-lead text-fg-muted">
              <p>
                Tell the Deptloy story here: when and why the company started, who founded it, and the problem you saw
                service businesses struggling with — missed calls, manual admin, disconnected tools.
              </p>
              <p>
                Then describe what makes your approach different and who you serve today. Two or three short
                paragraphs is plenty.
              </p>
            </div>

            <h3 className="mt-10 font-sans text-base font-semibold text-fg">What we do</h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={s.href}
                    className="flex items-center gap-3 rounded-card border border-line bg-card px-4 py-3 text-sm font-medium text-fg-soft transition-colors hover:border-brand-400/40 hover:text-fg"
                  >
                    <ServiceIcon slug={s.slug} className="h-4 w-4 text-brand-300" />
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <aside className="lg:col-span-5">
            <Card padding="lg" className="lg:sticky lg:top-28">
              <p className="text-eyebrow font-semibold uppercase text-fg-muted">At a glance</p>
              <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-8">
                {proofStats.map((s) => (
                  <div key={s.label} className="flex flex-col-reverse gap-1">
                    <dt className="text-sm text-fg-muted">{s.label}</dt>
                    <dd className="font-display text-3xl font-semibold text-fg">{s.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-8 border-t border-line pt-6">
                <p className="text-sm font-semibold text-fg">Industries we serve</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {industries.map((i) => (
                    <li key={i.id} className="rounded-full border border-line bg-raised px-3 py-1 text-xs font-medium text-fg-soft">
                      {i.shortTitle}
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </aside>
        </div>
      </Section>

      {/* Values */}
      <Section divider>
        <SectionHeading
          eyebrow="How We Work"
          title="The Principles Behind Every Build"
          description="What you can expect from us on every project, from the first call to long after launch."
          className="mb-14"
        />
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {companyValues.map((v, idx) => {
            const Icon = valueIcons[idx % valueIcons.length];
            return (
              <li key={v.title}>
                <Reveal delay={idx * 80} className="h-full">
                  <Card className="h-full">
                    <span className="grid h-11 w-11 place-items-center rounded-card border border-line bg-raised text-brand-300">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h3 className="mt-5 font-sans text-lg font-semibold text-fg">{v.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-fg-muted">{v.description}</p>
                  </Card>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </Section>

      {/* Team */}
      <Section tone="surface" divider>
        <div className="mb-14 flex flex-col items-center gap-4">
          <SectionHeading
            eyebrow="The Team"
            title="The People Behind Deptloy"
            description="The people who will scope, build and support your project."
          />
          {team.some((m) => m.isPlaceholder) && <PlaceholderTag label="Team: placeholder" />}
        </div>
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((m, idx) => (
            <li key={idx}>
              <Card as="article" className="flex h-full flex-col items-center text-center">
                <span
                  className="grid h-24 w-24 place-items-center rounded-full border border-dashed border-line-strong bg-raised font-display text-2xl font-semibold text-fg-subtle"
                  aria-hidden="true"
                >
                  {m.initials}
                </span>
                <h3 className="mt-5 font-sans text-lg font-semibold text-fg">{m.name}</h3>
                <p className="text-sm font-medium text-brand-300">{m.role}</p>
                <p className="mt-3 text-sm text-fg-muted">{m.bio}</p>
              </Card>
            </li>
          ))}
        </ul>
        <ul className="mx-auto mt-12 flex max-w-3xl flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-fg-soft">
          {/* Each item comes from the existing "How it works" copy */}
          {["Discovery & operational mapping", "Private sandbox testing", "Live in 3–7 days", "Bi-weekly accuracy tuning"].map((t) => (
            <li key={t} className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-brand-300" aria-hidden="true" />
              {t}
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
