import type { Metadata } from "next";
import Link from "next/link";
import { Mail, Clock, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";
import { ContactForm } from "@/components/marketing/ContactForm";

export const metadata: Metadata = {
  title: "Contact Deptloy — Book a Consultation",
  description:
    "Tell us about your call volume, booking workflow and software. Deptloy's team will outline a concrete AI receptionist and automation scope for your business.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="py-24 sm:py-32">
      <div className="wrap">
        <span className="k">Technical Consultation</span>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[var(--deep)] max-w-3xl">
          Let’s build something that lasts.
        </h1>
        <p className="lead2 max-w-2xl">
          Tell us how your business runs today. We’ll show you how it could run with a system built around it.
        </p>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct details */}
          <div className="lg:col-span-5 space-y-6">
            <div
              className="bg-white border border-[rgba(21,19,74,0.14)] p-8 space-y-6 shadow-[0_16px_40px_rgba(87,80,168,0.1)]"
              style={{
                clipPath: "polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 0 100%)",
              }}
            >
              <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--pur)]">
                Direct Engineering Channels
              </h2>

              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-sm bg-[var(--paper)] border border-[var(--peri)] grid place-items-center text-[var(--deep)] shrink-0">
                    <Mail className="w-4 h-4 text-[var(--or)]" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-mono font-semibold uppercase tracking-wider text-[var(--mute)]">
                      Primary Inquiries
                    </span>
                    <a
                      href="mailto:deptloy@gmail.com"
                      className="text-sm font-semibold text-[var(--deep)] hover:text-[var(--or)] transition-colors"
                    >
                      deptloy@gmail.com
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-sm bg-[var(--paper)] border border-[var(--peri)] grid place-items-center text-[var(--deep)] shrink-0">
                    <Clock className="w-4 h-4 text-[var(--lav)]" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-mono font-semibold uppercase tracking-wider text-[var(--mute)]">
                      Turnaround
                    </span>
                    <span className="text-sm font-semibold text-[var(--deep)]">
                      Monday – Friday • Sub-4 Hour Response
                    </span>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-sm bg-[var(--paper)] border border-[var(--peri)] grid place-items-center text-[var(--deep)] shrink-0">
                    <ShieldCheck className="w-4 h-4 text-[#3ccf91]" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-mono font-semibold uppercase tracking-wider text-[var(--mute)]">
                      Scope Guarantee
                    </span>
                    <span className="text-sm font-semibold text-[var(--deep)]">
                      Zero Guesswork • Fixed Project Architecture
                    </span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Live Interactive Demo Callout */}
            <div
              className="bg-[var(--deep)] text-white p-6 space-y-3"
              style={{
                clipPath: "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 0 100%)",
              }}
            >
              <div className="flex items-center gap-2 text-xs font-mono text-[var(--peri)] uppercase">
                <Sparkles className="w-3.5 h-3.5 text-[var(--or)]" />
                Want immediate testing?
              </div>
              <p className="text-xs text-[#cfd2ee] leading-relaxed">
                Test our interactive AI booking agent simulation directly in your browser without booking a call.
              </p>
              <Link
                href="/demo"
                className="btn sm"
                style={{ background: "var(--or)", color: "var(--deep)" }}
              >
                Try Interactive Demo <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            </div>
          </div>

          {/* Right Column: Complete Quote & Contact Form */}
          <div
            className="lg:col-span-7 bg-white border border-[rgba(21,19,74,0.14)] p-8 sm:p-10 shadow-[0_24px_60px_rgba(87,80,168,0.15)]"
            style={{
              clipPath: "polygon(0 0, calc(100% - 30px) 0, 100% 30px, 100% 100%, 0 100%)",
            }}
          >
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
