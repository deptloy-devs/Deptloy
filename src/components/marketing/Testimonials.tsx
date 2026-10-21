import { Quote } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { PlaceholderTag } from "@/components/ui/PlaceholderTag";
import { testimonials } from "@/lib/site";

export function Testimonials() {
  return (
    <Section divider>
      <SectionHeading
        eyebrow="Client Stories"
        title="What Our Clients Say"
        description="How working with Deptloy changes the day-to-day for service teams."
        className="mb-14"
      />

      <ul className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {testimonials.map((t, idx) => (
          <li key={idx}>
            <Reveal delay={idx * 80} className="h-full">
              <Card as="article" className="flex h-full flex-col">
                <div className="flex items-start justify-between gap-3">
                  <Quote className="h-7 w-7 text-brand-400/70" aria-hidden="true" />
                  {t.isPlaceholder && <PlaceholderTag />}
                </div>
                <blockquote className="mt-4 flex-1 text-fg-soft">
                  <p>&ldquo;{t.quote}&rdquo;</p>
                </blockquote>
                <footer className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                  <span
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line bg-raised text-sm font-semibold text-fg-muted"
                    aria-hidden="true"
                  >
                    {t.name.charAt(0)}
                  </span>
                  <span className="text-sm">
                    <span className="block font-semibold text-fg">{t.name}</span>
                    <span className="text-fg-muted">
                      {t.role}, {t.company}
                    </span>
                  </span>
                </footer>
              </Card>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
