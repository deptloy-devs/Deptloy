"use client";

import * as React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, ArrowUpRight, ShieldCheck, FileText } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Modal } from "@/components/ui/Modal";
import { brand, services, industries } from "@/lib/site";

export function Footer() {
  const [activeModal, setActiveModal] = React.useState<"privacy" | "terms" | null>(null);

  return (
    <footer className="border-t border-white/[0.08] bg-[#06080F] text-slate-400 relative z-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand Info */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <Logo size="md" />
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              {brand.shortDescription}
            </p>
            <div className="flex flex-col gap-2 pt-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-purple-400" />
                <a href={`mailto:${brand.contactEmail}`} className="hover:text-white transition-colors">
                  {brand.contactEmail}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-purple-400" />
                <span>{brand.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-purple-400" />
                <span>{brand.address}</span>
              </div>
            </div>
          </div>

          {/* Services Column */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Services</h4>
            <ul className="flex flex-col gap-2.5 text-sm">
              {services.map((srv) => (
                <li key={srv.slug}>
                  <Link href={srv.href} className="hover:text-purple-300 transition-colors">
                    {srv.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions Column */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Tailored Services</h4>
            <ul className="flex flex-col gap-2.5 text-sm">
              {industries.slice(0, 5).map((ind) => (
                <li key={ind.id}>
                  <Link href="/services" className="hover:text-purple-300 transition-colors">
                    {ind.title.split(" ")[0]} & {ind.title.split(" ")[1] || "Practice"}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/services" className="text-purple-400 hover:text-purple-300 transition-colors inline-flex items-center gap-1">
                  View all services <ArrowUpRight className="h-3 w-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Product Column */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Platform</h4>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li>
                <Link href="/demo" className="hover:text-purple-300 transition-colors flex items-center gap-1.5 text-slate-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live AI Demo
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-purple-300 transition-colors">
                  Client Dashboard
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-purple-300 transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-purple-300 transition-colors">
                  Book Consultation
                </Link>
              </li>
              <li>
                <Link href="/#about" className="hover:text-purple-300 transition-colors">
                  About Deptloy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 {brand.legalName}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <button
              onClick={() => setActiveModal("privacy")}
              className="hover:text-slate-300 transition-colors inline-flex items-center gap-1"
            >
              <ShieldCheck className="h-3.5 w-3.5 text-purple-400/80" />
              Privacy Policy
            </button>
            <button
              onClick={() => setActiveModal("terms")}
              className="hover:text-slate-300 transition-colors inline-flex items-center gap-1"
            >
              <FileText className="h-3.5 w-3.5 text-purple-400/80" />
              Terms of Service
            </button>
            <span className="text-slate-600">SOC2 Type II Ready Architecture</span>
          </div>
        </div>
      </div>

      {/* Privacy Policy Modal */}
      <Modal
        isOpen={activeModal === "privacy"}
        onClose={() => setActiveModal(null)}
        title="Privacy Policy"
        description="Last updated: October 2026"
        maxWidth="lg"
      >
        <div className="space-y-4 text-sm text-slate-300 max-h-[60vh] overflow-y-auto pr-2">
          <p>
            At {brand.name}, we hold client data integrity and caller confidentiality to the highest standard. This policy describes how we collect, handle, and protect data across our AI automation and receptionist platforms.
          </p>
          <h4 className="font-semibold text-white">1. Data Ownership</h4>
          <p>
            You retain 100% exclusive ownership of all customer interaction records, audio recordings, customer phone numbers, and pipeline data processed by your instances. We do not sell or monetize your proprietary business data.
          </p>
          <h4 className="font-semibold text-white">2. Model Training & Isolation</h4>
          <p>
            Customer voice recordings and transcripts generated via your tenant are strictly isolated and are never used to train public foundation models without your explicit opt-in consent.
          </p>
          <h4 className="font-semibold text-white">3. Security Standards</h4>
          <p>
            All data in transit is protected using TLS 1.3 encryption, and at-rest databases utilize AES-256 standard encryption.
          </p>
        </div>
      </Modal>

      {/* Terms of Service Modal */}
      <Modal
        isOpen={activeModal === "terms"}
        onClose={() => setActiveModal(null)}
        title="Terms of Service"
        description="Standard Enterprise Services Agreement"
        maxWidth="lg"
      >
        <div className="space-y-4 text-sm text-slate-300 max-h-[60vh] overflow-y-auto pr-2">
          <p>
            These terms govern the deployment and usage of {brand.name}&apos;s software, AI agents, integration pipelines, and custom software services.
          </p>
          <h4 className="font-semibold text-white">1. Service Level & Uptime</h4>
          <p>
            {brand.name} guarantees a 99.9% uptime SLA for production AI receptionist telephony and web webhook processing systems for active subscription tiers.
          </p>
          <h4 className="font-semibold text-white">2. Acceptable Use</h4>
          <p>
            The service may not be used for deceptive impersonation, spam telemarketing, unauthorized robocalls, or any unlawful business practices.
          </p>
          <h4 className="font-semibold text-white">3. Demonstration Disclaimer</h4>
          <p>
            Interactive prototypes, sandbox previews, and public demo pages are illustrative simulations and do not constitute binding commercial transactions or persistent calendar bookings.
          </p>
        </div>
      </Modal>
    </footer>
  );
}
