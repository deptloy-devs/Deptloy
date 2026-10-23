"use client";

import * as React from "react";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Modal } from "@/components/ui/Modal";
import { Container } from "@/components/ui/Container";
import { brand, industries, services } from "@/lib/site";

const columns = [
  {
    title: "Services",
    links: services.map((s) => ({ href: s.href, label: s.title })),
  },
  {
    title: "Industries",
    links: industries.map((i) => ({ href: "/services", label: i.shortTitle })),
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/blogs", label: "Blogs" },
      { href: "/projects", label: "Projects" },
      { href: "/contact", label: "Contact" },
      { href: "/demo", label: "AI demo" },
      { href: "/dashboard", label: "Client portal preview" },
    ],
  },
];

const linkClass = "text-sm text-fg-muted transition-colors hover:text-fg";

export function Footer() {
  const [activeModal, setActiveModal] = React.useState<"privacy" | "terms" | null>(null);
  const telHref = `tel:${brand.phone.replace(/[^\d+]/g, "")}`;

  return (
    <footer className="relative border-t border-line bg-surface">
      <Container className="pb-10 pt-14">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand + contact */}
          <div className="col-span-2 flex flex-col gap-5 lg:col-span-2">
            <Logo size="md" />
            <p className="max-w-sm text-sm leading-relaxed text-fg-muted">{brand.shortDescription}</p>
            <ul className="flex flex-col gap-3 text-sm">
              <li>
                <a href={`mailto:${brand.contactEmail}`} className="inline-flex items-center gap-2.5 text-fg-soft hover:text-fg">
                  <Mail className="h-4 w-4 text-brand-300" aria-hidden="true" />
                  {brand.contactEmail}
                </a>
              </li>
              <li>
                <a href={telHref} className="inline-flex items-center gap-2.5 text-fg-soft hover:text-fg">
                  <Phone className="h-4 w-4 text-brand-300" aria-hidden="true" />
                  {brand.phone}
                </a>
              </li>
              <li className="inline-flex items-center gap-2.5 text-fg-muted">
                <MapPin className="h-4 w-4 text-brand-300" aria-hidden="true" />
                {brand.address}
              </li>
            </ul>
          </div>

          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="font-sans text-eyebrow font-semibold uppercase text-fg">{col.title}</h2>
              <ul className="mt-4 flex flex-col gap-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className={linkClass}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col gap-4 border-t border-line pt-6 text-caption text-fg-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {brand.legalName}. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <button type="button" onClick={() => setActiveModal("privacy")} className="cursor-pointer hover:text-fg">
              Privacy Policy
            </button>
            <button type="button" onClick={() => setActiveModal("terms")} className="cursor-pointer hover:text-fg">
              Terms of Service
            </button>
            <span>SOC2 Type II Ready Architecture</span>
          </div>
        </div>
      </Container>

      <Modal
        isOpen={activeModal === "privacy"}
        onClose={() => setActiveModal(null)}
        title="Privacy Policy"
        description="Last updated: October 2026"
        maxWidth="lg"
      >
        <div className="max-h-[60vh] space-y-4 overflow-y-auto pr-2 text-sm text-fg-soft">
          <p>
            At {brand.name}, we hold client data integrity and caller confidentiality to the highest standard. This policy describes how we collect, handle, and protect data across our AI automation and receptionist platforms.
          </p>
          <h3 className="font-sans text-base font-semibold">1. Data Ownership</h3>
          <p>
            You retain 100% exclusive ownership of all customer interaction records, audio recordings, customer phone numbers, and pipeline data processed by your instances. We do not sell or monetize your proprietary business data.
          </p>
          <h3 className="font-sans text-base font-semibold">2. Model Training & Isolation</h3>
          <p>
            Customer voice recordings and transcripts generated via your tenant are strictly isolated and are never used to train public foundation models without your explicit opt-in consent.
          </p>
          <h3 className="font-sans text-base font-semibold">3. Security Standards</h3>
          <p>All data in transit is protected using TLS 1.3 encryption, and at-rest databases utilize AES-256 standard encryption.</p>
        </div>
      </Modal>

      <Modal
        isOpen={activeModal === "terms"}
        onClose={() => setActiveModal(null)}
        title="Terms of Service"
        description="Standard Enterprise Services Agreement"
        maxWidth="lg"
      >
        <div className="max-h-[60vh] space-y-4 overflow-y-auto pr-2 text-sm text-fg-soft">
          <p>
            These terms govern the deployment and usage of {brand.name}&apos;s software, AI agents, integration pipelines, and custom software services.
          </p>
          <h3 className="font-sans text-base font-semibold">1. Service Level & Uptime</h3>
          <p>
            {brand.name} guarantees a 99.9% uptime SLA for production AI receptionist telephony and web webhook processing systems for active subscription tiers.
          </p>
          <h3 className="font-sans text-base font-semibold">2. Acceptable Use</h3>
          <p>
            The service may not be used for deceptive impersonation, spam telemarketing, unauthorized robocalls, or any unlawful business practices.
          </p>
          <h3 className="font-sans text-base font-semibold">3. Demonstration Disclaimer</h3>
          <p>
            Interactive prototypes, sandbox previews, and public demo pages are illustrative simulations and do not constitute binding commercial transactions or persistent calendar bookings.
          </p>
        </div>
      </Modal>
    </footer>
  );
}
