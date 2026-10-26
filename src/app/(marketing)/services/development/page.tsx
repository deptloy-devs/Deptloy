"use client";

import * as React from "react";
import Link from "next/link";
import {
  Globe,
  Code2,
  Smartphone,
  Gauge,
  CheckCircle2,
  Layers,
  ArrowRight,
  Server,
  Sparkles,
  Lock,
  LayoutDashboard,
  Shield,
} from "lucide-react";

const devModules = [
  {
    title: "High-Converting Next.js Websites",
    desc: "Bespoke digital front doors engineered for lightning speed, mobile ergonomics, and maximum inquiry conversion. Zero bloated WordPress templates.",
    metric: "99+ Lighthouse Score",
  },
  {
    title: "Self-Service Client Portals",
    desc: "Empower patients and clients to book appointments, review service history, download receipts, and update intake forms in 30 seconds.",
    metric: "4x Faster Intake",
  },
  {
    title: "Internal Operations & Dispatch Dashboards",
    desc: "Custom administrative software that gives your team live visibility over daily appointments, dispatch routes, call metrics, and staff workload.",
    metric: "Real-Time Telemetry",
  },
  {
    title: "Bespoke APIs & Database Architectures",
    desc: "Engineered backends that bridge your existing software, EHRs, payment gateways, and carrier phone lines into one cohesive system.",
    metric: "99.99% Uptime",
  },
];

const devFeatures = [
  {
    icon: Gauge,
    title: "Sub-Second Global Edge Delivery",
    desc: "Built on modern Next.js App Router, React 19, and edge caching. Pages render instantaneously worldwide for superior SEO and user retention.",
  },
  {
    icon: Smartphone,
    title: "Mobile-First Ergonomics",
    desc: "Over 70% of appointment bookings occur on mobile devices. Our booking interfaces are designed for frictionless one-thumb interaction.",
  },
  {
    icon: Lock,
    title: "Enterprise Security & Privacy",
    desc: "Bank-grade data encryption, CSRF protection, secure OAuth credential storage, and strict database query parameterization.",
  },
  {
    icon: LayoutDashboard,
    title: "Admin Tools Staff Actually Use",
    desc: "We replace slow, confusing legacy software with minimal, high-contrast dashboards designed around how your coordinators work.",
  },
  {
    icon: Server,
    title: "Custom PostgreSQL & Redis Backends",
    desc: "Full data sovereignty. You own your schemas, tables, and backups. No proprietary vendor lock-in or sudden pricing shifts.",
  },
  {
    icon: Code2,
    title: "Clean, Documented Codebases",
    desc: "TypeScript strict mode, automated CI/CD deployment pipelines, and thorough architectural documentation built to outlast industry trends.",
  },
];

export default function DevelopmentServicePage() {
  return (
    <div className="py-24 sm:py-32">
      <div className="wrap">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-xs font-mono text-[var(--mute)]">
          <Link href="/how-it-works" className="hover:text-[var(--deep)]">
            How It Works
          </Link>
          <span>/</span>
          <span className="text-[var(--pur)] font-bold">Web & App Development</span>
        </div>

        {/* Hero Section */}
        <span className="k">Engineering & Digital Front Doors</span>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[var(--deep)] max-w-3xl">
          High-performance web and mobile interfaces built to convert.
        </h1>
        <p className="lead2 max-w-2xl">
          Your digital front door should work seamlessly with your phone lines, calendar, and CRM. Deptloy engineers bespoke web applications, customer portals, and internal dashboards that turn visitors into loyal clients.
        </p>

        {/* Hero CTAs */}
        <div className="mt-8 flex flex-wrap gap-4 items-center">
          <Link href="/contact" className="btn">
            Build Your Custom Application
          </Link>
          <Link href="/projects" className="btn ghost">
            View Client Case Studies
          </Link>
        </div>

        {/* Dev Modules Grid */}
        <div
          className="mt-16 bg-white border border-[rgba(21,19,74,0.14)] p-8 sm:p-10 shadow-[0_20px_50px_rgba(87,80,168,0.1)]"
          style={{
            borderTop: "5px solid #ef7a5e",
            clipPath: "polygon(0 0, calc(100% - 30px) 0, 100% 30px, 100% 100%, 0 100%)",
          }}
        >
          <div className="flex items-center justify-between flex-wrap gap-4 mb-8 pb-4 border-b border-[var(--mist)]">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--pur)]">
                Bespoke Software Architecture
              </span>
              <h2 className="text-xl font-bold text-[var(--deep)] mt-0.5">
                Front-End & Back-End Application Stack
              </h2>
            </div>
            <div className="text-xs font-mono bg-[var(--paper)] px-3 py-1.5 border border-[var(--peri)]">
              Next.js 16 • React 19 • TypeScript • Tailwind CSS
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {devModules.map((mod) => (
              <div
                key={mod.title}
                className="p-6 bg-[var(--paper)] border border-[var(--peri)] space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-bold text-base text-[var(--deep)]">
                    {mod.title}
                  </h3>
                  <span className="text-[11px] font-mono font-bold px-2 py-0.5 bg-[#ef7a5e]/15 text-[#ef7a5e]">
                    {mod.metric}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[var(--mute)] leading-relaxed">
                  {mod.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 6 Capabilities Grid */}
        <div className="mt-24">
          <span className="k">Engineering Standards</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--deep)] mb-4">
            Custom code that outlasts framework hype.
          </h2>
          <p className="lead2 max-w-2xl mb-12">
            We write clean, modular software that connects natively to your business operations. Fast to load, easy for staff to operate, and built to scale for years.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {devFeatures.map((feat) => {
              const FeatIcon = feat.icon;
              return (
                <div
                  key={feat.title}
                  className="bg-white border border-[rgba(21,19,74,0.12)] p-7 space-y-3 shadow-[0_12px_30px_rgba(87,80,168,0.06)]"
                  style={{
                    clipPath: "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 0 100%)",
                  }}
                >
                  <div className="w-10 h-10 rounded-sm bg-[#ef7a5e]/15 text-[#ef7a5e] flex items-center justify-center">
                    <FeatIcon className="w-5 h-5" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-[var(--deep)]">
                    {feat.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--mute)] leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA Card */}
        <div
          className="mt-20 p-8 sm:p-12 bg-[var(--deep)] text-white flex flex-col md:flex-row items-center justify-between gap-8"
          style={{
            clipPath: "polygon(0 0, calc(100% - 30px) 0, 100% 30px, 100% 100%, 0 100%)",
          }}
        >
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-mono text-[var(--peri)] uppercase">Turnkey Application Development</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Need a bespoke client portal or modern web application?
            </h3>
            <p className="text-xs sm:text-sm text-[#cfd2ee] leading-relaxed">
              We design, build, and deploy production-grade software that seamlessly connects to your phone lines and CRM.
            </p>
          </div>

          <Link href="/contact" className="btn" style={{ background: "var(--or)", color: "var(--deep)" }}>
            Request Application Scope
          </Link>
        </div>
      </div>
    </div>
  );
}
