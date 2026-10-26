import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Bot, Database, Workflow, Globe, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Services — AI Receptionist, CRM, Automation & Apps",
  description:
    "Explore Deptloy's core services: AI voice receptionists, custom CRMs, workflow automations, and custom web & mobile apps designed to connect seamlessly.",
  alternates: { canonical: "/services" },
};

const serviceCards = [
  {
    icon: Bot,
    name: "AI Receptionist",
    badge: "Voice & Messaging",
    color: "#8478e0",
    headline: "Answers every call in your brand’s voice, day and night.",
    desc: "Sub-500ms voice response latency, real-time calendar synchronization, emergency call routing, and immediate transcription into your customer records.",
    features: [
      "Books, reschedules, and cancels appointments directly in your calendar",
      "Answers complex inquiries using your specific business knowledge base",
      "Qualifies lead intent and routes urgent calls directly to your cell phone",
      "Transcribes every conversation and attaches audio recordings to your CRM",
    ],
  },
  {
    icon: Database,
    name: "Custom CRM",
    badge: "Customer Intelligence",
    color: "#5750a8",
    headline: "A customer record shaped around how your team actually works.",
    desc: "Eliminate manual data entry. Every call, email, form submission, and follow-up is automatically logged with pipeline stages customized to your business.",
    features: [
      "Full contact history and live conversation logs in a single unified view",
      "Custom role permissions and team task assignment queues",
      "Automatic lead scoring based on urgency and historical booking value",
      "Real-time visual dashboards tracking conversion rates and lost opportunities",
    ],
  },
  {
    icon: Workflow,
    name: "Workflow Automation",
    badge: "Background Execution",
    color: "#fd9150",
    headline: "The administrative busywork, handled quietly in the background.",
    desc: "Stop chasing clients manually. Automated confirmation SMS, appointment reminders that cut no-shows by 70%, review requests, and billing sync happen reliably.",
    features: [
      "Instant SMS and email confirmations sent immediately after calls end",
      "Automated reminder sequences 24 hours and 2 hours prior to bookings",
      "Post-appointment review requests and recurring client nurture sequences",
      "Instant team Slack, SMS, or email alerts when high-value leads arrive",
    ],
  },
  {
    icon: Globe,
    name: "Web & App Development",
    badge: "Digital Front Doors",
    color: "#ef7a5e",
    headline: "High-performance web and mobile interfaces built to convert.",
    desc: "Fast, accessible Next.js websites, client booking portals, and mobile-friendly admin dashboards engineered to feed directly into your connected CRM system.",
    features: [
      "Sub-second load times built on modern Next.js and edge architecture",
      "Frictionless 30-second appointment booking and client self-service portals",
      "Custom internal operations dashboards for staff dispatch and scheduling",
      "Engineered APIs connecting existing legacy tools with your new system",
    ],
  },
];

export default function ServicesPage() {
  return (
    <div className="py-24 sm:py-32">
      <div className="wrap">
        <span className="k">What we build</span>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[var(--deep)] max-w-3xl">
          The building blocks of your system.
        </h1>
        <p className="lead2 max-w-2xl">
          We combine these services into one custom, long-lasting system that runs your business. Start with the piece that matters most; everything is designed to connect.
        </p>

        {/* 4 Core Services Cards Grid */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {serviceCards.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.name}
                className="bg-white border border-[rgba(21,19,74,0.14)] p-8 sm:p-10 flex flex-col justify-between"
                style={{
                  borderTop: `4px solid ${service.color}`,
                  clipPath: "polygon(0 0, calc(100% - 28px) 0, 100% 28px, 100% 100%, 0 100%)",
                }}
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-sm flex items-center justify-center text-white"
                        style={{ backgroundColor: service.color }}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <h2 className="font-display font-bold text-2xl text-[var(--deep)]">
                        {service.name}
                      </h2>
                    </div>
                    <span className="text-xs font-mono font-medium uppercase tracking-wider text-[var(--mute)] bg-[var(--paper)] px-3 py-1 border border-[var(--peri)]">
                      {service.badge}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-lg sm:text-xl text-[var(--deep)] mb-3">
                    {service.headline}
                  </h3>

                  <p className="text-sm sm:text-base text-[var(--mute)] leading-relaxed mb-6">
                    {service.desc}
                  </p>

                  <ul className="space-y-2.5 text-sm text-[var(--deep)] font-medium mb-8">
                    {service.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5">
                        <CheckCircle2
                          className="w-4 h-4 shrink-0 mt-0.5"
                          style={{ color: service.color }}
                        />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 border-t border-[rgba(21,19,74,0.1)] flex items-center justify-between flex-wrap gap-4">
                  <Link href="/demo" className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--deep)] hover:text-[var(--or)] transition-colors inline-flex items-center gap-1.5">
                    Test live voice demo <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link href="/#contact" className="btn sm">
                    Get custom quote
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Integration banner */}
        <div className="mt-16 p-8 bg-[var(--deep)] text-white rounded-none flex flex-col md:flex-row md:items-center justify-between gap-6"
          style={{
            clipPath: "polygon(0 0, calc(100% - 30px) 0, 100% 30px, 100% 100%, 0 100%)",
          }}
        >
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-mono text-[var(--peri)] uppercase tracking-wider">
              No Throwaway Software
            </span>
            <h3 className="font-display font-bold text-2xl text-white">
              Start with one module. Expand when your operations need it.
            </h3>
            <p className="text-sm text-[#cfd2ee] leading-relaxed">
              Because every piece is architected with unified data schemas, adding custom apps or workflow automation to an existing receptionist is instant and clean.
            </p>
          </div>

          <Link href="/#contact" className="btn" style={{ background: "var(--or)", color: "var(--deep)" }}>
            Book a Strategy Call
          </Link>
        </div>
      </div>
    </div>
  );
}
