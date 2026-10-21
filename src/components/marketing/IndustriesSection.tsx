import Link from "next/link";
import { ArrowRight, Briefcase, Building2, Scale, Sparkles, Stethoscope, Wrench, type LucideIcon } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { industries, services } from "@/lib/site";

const icons: Record<string, LucideIcon> = { Stethoscope, Sparkles, Building2, Briefcase, Wrench, Scale };

export function IndustriesSection() {
  return (
    <Section id="industries" tone="surface" divider>
      <SectionHeading
        eyebrow="Services by Sector"
        title="Tailored Services for Every Business Type"
        description="Every business operates with distinct customer questions, booking workflows, and staff needs. We tailor each AI service deployment to your exact operations."
        className="mb-14"
      />

      <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {industries.map((ind, idx) => {
          const Icon = icons[ind.iconName] ?? Briefcase;
          const recommended = ind.recommendedServices
            .map((name) => services.find((s) => s.title === name))
            .filter((s) => s !== undefined);
          return (
            <li key={ind.id}>
              <Reveal delay={(idx % 3) * 80} className="h-full">
                <Card className="flex h-full flex-col">
                  <span className="grid h-11 w-11 place-items-center rounded-card border border-line bg-raised text-brand-300">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-h3 font-semibold">{ind.title}</h3>
                  <p className="mt-2 text-sm font-medium text-brand-300">{ind.tagline}</p>
                  <p className="mt-3 text-fg-muted">{ind.description}</p>

                  <dl className="mt-5 space-y-3 rounded-card border border-line bg-raised/60 p-4 text-sm">
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-wide text-fg-subtle">Operational friction</dt>
                      <dd className="mt-1 text-fg-soft">{ind.commonBottleneck}</dd>
                    </div>
                    <div className="border-t border-line pt-3">
                      <dt className="text-xs font-semibold uppercase tracking-wide text-brand-300">Deptloy configuration</dt>
                      <dd className="mt-1 text-fg-soft">{ind.deptloySolution}</dd>
                    </div>
                  </dl>

                  <div className="mt-auto pt-5">
                    <p className="sr-only">Recommended services:</p>
                    <ul className="flex flex-wrap gap-2">
                      {recommended.map((srv) => (
                        <li key={srv.slug}>
                          <Link
                            href={srv.href}
                            className="inline-flex items-center rounded-full border border-line bg-raised px-3 py-1 text-xs font-medium text-fg-soft transition-colors hover:border-brand-400/40 hover:text-fg"
                          >
                            {srv.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              </Reveal>
            </li>
          );
        })}
      </ul>

      <div className="mt-10 text-center">
        <Link href="/services" className="inline-flex items-center gap-2 font-semibold text-link hover:text-brand-200">
          Explore all tailored services & solutions <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </Section>
  );
}
