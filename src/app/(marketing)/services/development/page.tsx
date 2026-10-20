import {
  Code2,
  Layout,
  Smartphone,
  Globe,
  Terminal,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FinalCta } from "@/components/marketing/FinalCta";

export function generateMetadata() {
  return {
    title: "Custom Web & App Development Services",
    description: "Bespoke digital platforms, high-conversion marketing websites, customer booking portals, and custom SaaS dashboards built with Next.js, React, and TypeScript.",
  };
}

export default function DevelopmentServicePage() {
  const capabilities = [
    {
      title: "Conversion-Focused Agency & SaaS Websites",
      desc: "Ultra-fast marketing platforms with dark-mode aesthetic, micro-interactions, responsive typography, and sub-second Lighthouse scores.",
      icon: <Globe className="h-5 w-5 text-brand-400" />,
      tags: ["Next.js 16", "Tailwind CSS", "TypeScript", "SEO Optimization"],
    },
    {
      title: "Custom Client & Booking Portals",
      desc: "Self-service client dashboards allowing customers to view appointments, manage invoices, download treatment notes, and message staff directly.",
      icon: <Layout className="h-5 w-5 text-blue-400" />,
      tags: ["OAuth Auth", "Real-Time Sync", "Stripe Checkout", "Role Permissions"],
    },
    {
      title: "Internal Business Tools & Dashboards",
      desc: "Replace clumsy spreadsheets with elegant, high-throughput administrative web applications tailored to your specific dispatch, inventory, or billing logic.",
      icon: <Terminal className="h-5 w-5 text-emerald-400" />,
      tags: ["PostgreSQL", "REST & GraphQL", "Audit Logging", "Custom Filters"],
    },
    {
      title: "Mobile-First Progressive Web Apps",
      desc: "Fast, installable web experiences that look and feel like native iOS and Android apps without the overhead of app-store review delays.",
      icon: <Smartphone className="h-5 w-5 text-cyan-400" />,
      tags: ["PWA", "Offline Sync", "Push Notifications", "Touch Ergonomics"],
    },
  ];

  const devProcess = [
    {
      step: "01",
      title: "Architecture & User Journey",
      desc: "Wireframing, database schema design, and defining exact technical constraints before writing a single line of code.",
    },
    {
      step: "02",
      title: "Component-Driven Build",
      desc: "Clean React/Next.js architecture with atomic design tokens, type-safe APIs, and responsive mobile layouts.",
    },
    {
      step: "03",
      title: "API & Voice Agent Integration",
      desc: "Connecting telephony webhooks, payment gateways, calendar OAuth providers, and automated CRM pipelines.",
    },
    {
      step: "04",
      title: "Audit, Security & Global Deployment",
      desc: "Automated test suites, accessibility auditing, edge-caching configuration, and zero-downtime production launch.",
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative pt-16 pb-20 lg:pt-24 lg:pb-28 overflow-hidden">
        <div className="glow-brand" />
        <div className="glow-accent" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
            <Badge variant="violet" dot className="mb-4">
              Full-Stack Engineering
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              Custom Software That Matches How You Operate
            </h1>

            <p className="text-lg text-fg-soft leading-relaxed mb-8">
              We design and engineer bespoke web applications, high-converting digital portals, and administrative dashboards that give your business a permanent technological edge.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Button href="/contact" variant="glow" size="lg" leftIcon={<Code2 className="h-4 w-4" />}>
                Start a Development Project
              </Button>
              <Button href="/demo" variant="outline" size="lg">
                Explore Interactive Demo
              </Button>
            </div>
          </div>

          {/* Interactive Code & Interface Mockup */}
          <div className="mt-16 rounded-3xl bg-card border border-line p-6 sm:p-10 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-line mb-6">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-rose-500/80" />
                <span className="h-3 w-3 rounded-full bg-amber-500/80" />
                <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 text-xs font-mono text-fg-muted">deptloy-app-v2.tsx</span>
              </div>
              <Badge variant="cyan" size="sm">
                TypeScript • Next.js
              </Badge>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center font-mono text-xs">
              <div className="lg:col-span-7 bg-surface p-5 rounded-2xl border border-line space-y-2 text-fg-soft overflow-x-auto">
                <p><span className="text-brand-400">export async function</span> <span className="text-blue-400">handleAppointmentWebhook</span>(req: <span className="text-amber-300">Request</span>) &#123;</p>
                <p className="pl-4 text-fg-subtle">{"// 1. Validate cryptographic webhook signature"}</p>
                <p className="pl-4"><span className="text-brand-400">const</span> signature = req.headers.<span className="text-blue-300">get</span>(<span className="text-emerald-300">&quot;x-deptloy-signature&quot;</span>);</p>
                <p className="pl-4"><span className="text-brand-400">const</span> payload = <span className="text-brand-400">await</span> req.<span className="text-blue-300">json</span>();</p>
                <p className="pl-4 text-fg-subtle">{"// 2. Reserve provider slot with zero race conditions"}</p>
                <p className="pl-4"><span className="text-brand-400">const</span> reservation = <span className="text-brand-400">await</span> calendar.<span className="text-blue-300">lockSlot</span>(payload);</p>
                <p className="pl-4 text-fg-subtle">{"// 3. Dispatch SMS & trigger CRM record creation"}</p>
                <p className="pl-4"><span className="text-brand-400">await</span> Promise.<span className="text-blue-300">all</span>([</p>
                <p className="pl-8">smsClient.<span className="text-blue-300">sendConfirmation</span>(payload.phone),</p>
                <p className="pl-8">crm.<span className="text-blue-300">upsertContact</span>(payload.customer),</p>
                <p className="pl-4">]);</p>
                <p className="pl-4"><span className="text-brand-400">return</span> Response.<span className="text-blue-300">json</span>(&#123; success: <span className="text-amber-300">true</span>, reservation &#125;);</p>
                <p>&#125;</p>
              </div>

              <div className="lg:col-span-5 flex flex-col gap-3 font-sans">
                <div className="p-4 rounded-xl bg-raised border border-line">
                  <span className="text-xs font-bold text-white block mb-1">Production-Ready Architecture</span>
                  <p className="text-xs text-fg-muted leading-relaxed">
                    Zero tech debt. Strict TypeScript typing, automated CI/CD pipelines, and high-concurrency database queries.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-raised border border-line">
                  <span className="text-xs font-bold text-white block mb-1">Sub-Second Global Edge Latency</span>
                  <p className="text-xs text-fg-muted leading-relaxed">
                    Deployed across global edge networks to ensure rapid page load times for prospective customers worldwide.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-20 bg-surface border-t border-line">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Specializations"
            title="What We Engineer for Growing Businesses"
            align="center"
            className="mb-14"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {capabilities.map((cap, idx) => (
              <div key={idx} className="p-7 rounded-2xl bg-card border border-line flex flex-col justify-between">
                <div>
                  <div className="rounded-xl bg-raised p-3 w-fit border border-line mb-4">
                    {cap.icon}
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">{cap.title}</h4>
                  <p className="text-sm text-fg-muted leading-relaxed mb-6">{cap.desc}</p>
                </div>
                <div className="pt-4 border-t border-line flex flex-wrap gap-2">
                  {cap.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="text-xs px-2.5 py-1 rounded-md bg-white/5 border border-line text-fg-soft">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-canvas border-t border-line">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Delivery Methodology"
            title="How We Build & Ship Software"
            align="center"
            className="mb-14"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {devProcess.map((proc, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-card border border-line flex flex-col justify-between">
                <div>
                  <span className="text-2xl font-bold font-mono text-brand-400 mb-2 block">{proc.step}</span>
                  <h4 className="text-base font-bold text-white mb-2">{proc.title}</h4>
                  <p className="text-xs text-fg-muted leading-relaxed">{proc.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <FinalCta />
    </div>
  );
}
