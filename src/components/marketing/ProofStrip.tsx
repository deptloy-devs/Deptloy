import { Container } from "@/components/ui/Container";
import { PlaceholderTag } from "@/components/ui/PlaceholderTag";
import { clientLogos, proofStats } from "@/lib/site";

/** Credibility band right under the hero: headline numbers + client logos. */
export function ProofStrip() {
  const logosArePlaceholders = clientLogos.some((l) => l.isPlaceholder);

  return (
    <section aria-label="Results and clients" className="border-y border-line bg-surface">
      <Container className="py-10 sm:py-12">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
          {proofStats.map((s) => (
            <div key={s.label} className="flex flex-col-reverse gap-1 lg:border-l lg:border-line lg:pl-6 lg:first:border-l-0 lg:first:pl-0">
              <dt className="text-sm text-fg-muted">{s.label}</dt>
              <dd className="font-display text-3xl font-semibold tracking-tight text-fg sm:text-4xl">{s.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-10 border-t border-line pt-8">
          <div className="flex flex-wrap items-center justify-center gap-3 text-center">
            <p className="text-sm text-fg-muted">Built for service businesses in healthcare, beauty, real estate and the trades</p>
            {logosArePlaceholders && <PlaceholderTag label="Logos: placeholder" />}
          </div>
          <ul className="mt-6 flex flex-wrap justify-center gap-3">
            {clientLogos.map((logo, i) => (
              <li
                key={i}
                className="grid h-14 w-[calc(50%-0.375rem)] place-items-center rounded-control border border-dashed border-line-strong text-xs font-medium text-fg-subtle sm:w-[calc(33.333%-0.5rem)] lg:w-auto lg:flex-1"
              >
                {logo.name}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
