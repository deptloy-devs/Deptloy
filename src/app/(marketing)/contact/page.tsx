"use client";

import * as React from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Send,
  CheckCircle2,
  Copy,
  Check,
  Lock,
  Headphones,
} from "lucide-react";

const TIME_SLOTS = [
  "Morning (9 AM–12 PM)",
  "Afternoon (12–5 PM)",
  "Evening (5–8 PM)",
];

export default function ContactPage() {
  // Form State
  const [quoteName, setQuoteName] = React.useState("");
  const [quoteEmail, setQuoteEmail] = React.useState("");
  const [quoteCompany, setQuoteCompany] = React.useState("");
  const [quoteMessage, setQuoteMessage] = React.useState("");

  // Preferred Date & Time preferences (from picture)
  const [selectedDate, setSelectedDate] = React.useState("");
  const [preferredTimeZone, setPreferredTimeZone] = React.useState("");
  const [selectedSlot, setSelectedSlot] = React.useState(TIME_SLOTS[0]);

  const [quoteStatus, setQuoteStatus] = React.useState<"idle" | "submitting" | "success" | "error">("idle");
  const [quoteRefId, setQuoteRefId] = React.useState("");
  const [quoteError, setQuoteError] = React.useState("");

  // Copy states
  const [copiedEmail, setCopiedEmail] = React.useState(false);
  const [copiedPhone, setCopiedPhone] = React.useState(false);

  // Smooth scroll to form area when hash is #form or #contact-form or when landing
  React.useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash === "#form" || hash === "#contact-form" || hash === "#inquiry") {
        const el = document.getElementById("form");
        if (el) {
          setTimeout(() => {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 80);
        }
      }
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const handleCopyEmail = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText("deptloy@gmail.com");
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  const handleCopyPhone = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText("+14743491561");
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  // Handle Quote Submit
  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setQuoteStatus("submitting");
    setQuoteError("");

    const refId = `DEP-${Math.floor(100000 + Math.random() * 900000)}`;

    const timingDetails = [
      selectedDate ? `Preferred Date: ${selectedDate}` : null,
      selectedSlot ? `Window: ${selectedSlot}` : null,
      preferredTimeZone ? `Time Zone: ${preferredTimeZone}` : null,
    ]
      .filter(Boolean)
      .join(" | ");

    const finalMessage = timingDetails
      ? `${quoteMessage.trim()}\n\n[Suggested Timing: ${timingDetails}]`
      : quoteMessage.trim();

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: quoteName,
          email: quoteEmail,
          companyName: quoteCompany || "Direct Inquiry",
          serviceRequired: timingDetails ? "Project Inquiry & Consultation" : "Project Inquiry",
          message: finalMessage,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setQuoteStatus("success");
        setQuoteRefId(data.submissionId || refId);
        return;
      }
      throw new Error(data.error || "Failed to deliver inquiry.");
    } catch (err) {
      setQuoteStatus("error");
      const msg =
        err instanceof Error
          ? err.message
          : "Could not deliver your inquiry. Please try again or email deptloy@gmail.com directly.";
      setQuoteError(msg);
    }
  };

  return (
    <div className="pt-24 sm:pt-28 lg:pt-32 pb-14 sm:pb-20">
      <div className="wrap">
        {/* Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-start">
          {/* Left Column: Direct Channels & Trust (order-2 on mobile so form appears first) */}
          <div className="order-2 lg:order-1 lg:col-span-5 space-y-6">
            {/* Direct Engineering Channels Card */}
            <div className="bg-white border border-[rgba(21,19,74,0.12)] p-6 sm:p-7 rounded-2xl shadow-[0_12px_36px_rgba(87,80,168,0.06)] space-y-5">
              <div className="flex items-center justify-between border-b border-[var(--mist)] pb-3.5">
                <span
                  style={{ fontSize: "11px", letterSpacing: "0.08em" }}
                  className="font-mono font-bold uppercase text-[var(--pur)]"
                >
                  Direct Engineering Channels
                </span>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-semibold text-[#16875b] bg-[#16875b]/10 px-2.5 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#16875b]" />
                  Active
                </span>
              </div>

              <ul className="space-y-4">
                {/* Phone Channel */}
                <li className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[var(--paper)] border border-[var(--peri)] grid place-items-center text-[var(--deep)] shrink-0 mt-0.5">
                    <Phone className="w-4 h-4 text-[#3ccf91]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="block text-[11px] font-mono font-semibold uppercase tracking-wider text-[var(--mute)]">
                      Direct Phone &amp; SMS
                    </span>
                    <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                      <a
                        href="tel:+14743491561"
                        className="text-sm font-bold text-[var(--deep)] hover:text-[var(--or)] transition-colors"
                      >
                        +1 (474) 349-1561
                      </a>
                      <button
                        type="button"
                        onClick={handleCopyPhone}
                        className="inline-flex items-center gap-1 text-[11px] font-mono text-[var(--mute)] hover:text-[var(--deep)] bg-[var(--paper)] border border-[var(--peri)] px-2 py-0.5 rounded hover:border-[var(--pur)] transition-colors cursor-pointer"
                        title="Copy phone number to clipboard"
                      >
                        {copiedPhone ? (
                          <>
                            <Check className="w-3 h-3 text-[#16875b]" />
                            <span className="text-[#16875b]">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </li>

                {/* Email Channel */}
                <li className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[var(--paper)] border border-[var(--peri)] grid place-items-center text-[var(--deep)] shrink-0 mt-0.5">
                    <Mail className="w-4 h-4 text-[var(--or)]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="block text-[11px] font-mono font-semibold uppercase tracking-wider text-[var(--mute)]">
                      Primary Engineering Inquiries
                    </span>
                    <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                      <a
                        href="mailto:deptloy@gmail.com"
                        className="text-sm font-bold text-[var(--deep)] hover:text-[var(--or)] transition-colors break-all"
                      >
                        deptloy@gmail.com
                      </a>
                      <button
                        type="button"
                        onClick={handleCopyEmail}
                        className="inline-flex items-center gap-1 text-[11px] font-mono text-[var(--mute)] hover:text-[var(--deep)] bg-[var(--paper)] border border-[var(--peri)] px-2 py-0.5 rounded hover:border-[var(--pur)] transition-colors cursor-pointer"
                        title="Copy email to clipboard"
                      >
                        {copiedEmail ? (
                          <>
                            <Check className="w-3 h-3 text-[#16875b]" />
                            <span className="text-[#16875b]">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </li>

                {/* Response SLA */}
                <li className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[var(--paper)] border border-[var(--peri)] grid place-items-center text-[var(--deep)] shrink-0 mt-0.5">
                    <Clock className="w-4 h-4 text-[var(--lav)]" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-mono font-semibold uppercase tracking-wider text-[var(--mute)]">
                      Engineering Response SLA
                    </span>
                    <span className="text-sm font-semibold text-[var(--deep)]">
                      Monday – Friday • Within 4 Hours
                    </span>
                  </div>
                </li>

                {/* Turnkey Scope Guarantee */}
                <li className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[var(--paper)] border border-[var(--peri)] grid place-items-center text-[var(--deep)] shrink-0 mt-0.5">
                    <ShieldCheck className="w-4 h-4 text-[#16875b]" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-mono font-semibold uppercase tracking-wider text-[var(--mute)]">
                      Scope Guarantee
                    </span>
                    <span className="text-sm font-semibold text-[var(--deep)]">
                      Fixed Turnkey Architecture • Transparent Milestones
                    </span>
                  </div>
                </li>

                {/* Direct Consultation */}
                <li className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[var(--paper)] border border-[var(--peri)] grid place-items-center text-[var(--deep)] shrink-0 mt-0.5">
                    <Headphones className="w-4 h-4 text-[var(--pur)]" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-mono font-semibold uppercase tracking-wider text-[var(--mute)]">
                      Technical Discovery
                    </span>
                    <span className="text-sm font-semibold text-[var(--deep)]">
                      Direct review with senior systems architects
                    </span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Interactive Voice Demo Callout Card */}
            <div className="bg-[var(--deep)] text-white p-6 sm:p-7 rounded-2xl relative overflow-hidden shadow-[0_16px_40px_rgba(21,19,74,0.18)]">
              {/* Radial gradient glow */}
              <div
                className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none opacity-20"
                style={{
                  background: "radial-gradient(circle, var(--lav) 0%, transparent 70%)",
                  transform: "translate(30%, -30%)",
                }}
              />

              <div className="relative z-10 space-y-3">
                <div className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--peri)]">
                  <Sparkles className="w-3.5 h-3.5 text-[var(--or)]" />
                  <span>Interactive Voice Demo</span>
                </div>
                <h3
                  style={{ fontSize: "18px", fontWeight: 700, lineHeight: 1.25 }}
                  className="text-white"
                >
                  Experience our AI receptionist live
                </h3>
                <p className="text-xs sm:text-sm text-[#cfd2ee] leading-relaxed">
                  Test conversational caller intake, dynamic calendar availability, and CRM sync directly in your
                  browser.
                </p>
                <div className="pt-1">
                  <Link
                    href="/demo"
                    className="btn sm inline-flex items-center gap-2"
                    style={{ background: "var(--or)", color: "var(--deep)", fontWeight: 700 }}
                  >
                    <span>Test AI Receptionist</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Studio Principles Card */}
            <div className="bg-[var(--paper)] border border-[var(--peri)] rounded-2xl p-5 space-y-2.5 text-xs text-[var(--mute)]">
              <div className="font-mono font-bold uppercase tracking-wider text-[var(--deep)] text-[11px] flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-[#16875b]" />
                <span>Client Privacy &amp; Data Sovereignty</span>
              </div>
              <p className="leading-relaxed">
                We never train third-party public models on client data. You retain 100% intellectual property ownership
                of all custom code, workflows, and database schemas.
              </p>
            </div>
          </div>

          {/* Right Column: Project Inquiry Form (order-1 on mobile so it displays directly at the top) */}
          <div className="order-1 lg:order-2 lg:col-span-7" id="form" style={{ scrollMarginTop: "105px" }}>
            <div className="bg-white border border-[rgba(21,19,74,0.12)] p-6 sm:p-8 lg:p-10 rounded-2xl shadow-[0_20px_50px_rgba(87,80,168,0.08)]">
              {quoteStatus === "success" ? (
                <div className="text-center py-8 sm:py-12 space-y-5">
                  <div className="w-16 h-16 rounded-full bg-[#16875b]/12 text-[#16875b] grid place-items-center mx-auto ring-8 ring-[#16875b]/5">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <div>
                    <h2
                      style={{ fontSize: "26px", fontWeight: 800 }}
                      className="text-[var(--deep)]"
                    >
                      Project Inquiry Received!
                    </h2>
                    <p className="text-sm text-[var(--mute)] max-w-md mx-auto mt-2 leading-relaxed">
                      Thank you, <strong className="text-[var(--deep)]">{quoteName}</strong>. Your project inquiry has
                      been dispatched to our engineering team at{" "}
                      <strong className="text-[var(--deep)]">deptloy@gmail.com</strong>.
                    </p>
                  </div>

                  <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[var(--pur)] bg-[var(--paper)] px-4 py-2 rounded-full border border-[var(--peri)]">
                    <span>Reference Code:</span>
                    <span className="text-[var(--deep)] font-extrabold">{quoteRefId}</span>
                  </div>

                  <div className="pt-4 flex justify-center">
                    <button
                      type="button"
                      onClick={() => {
                        setQuoteStatus("idle");
                        setQuoteName("");
                        setQuoteEmail("");
                        setQuoteCompany("");
                        setQuoteMessage("");
                        setSelectedDate("");
                        setPreferredTimeZone("");
                      }}
                      className="btn sm ghost"
                    >
                      Submit another inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleQuoteSubmit} className="space-y-5">
                  {/* Form Header */}
                  <div className="border-b border-[var(--mist)] pb-4">
                    <h1
                      style={{ fontSize: "clamp(22px, 2.5vw, 26px)", fontWeight: 800, lineHeight: 1.2 }}
                      className="text-[var(--deep)]"
                    >
                      Tell Us About Your Project
                    </h1>
                    <p className="text-xs sm:text-sm text-[var(--mute)] mt-1.5 leading-relaxed">
                      Share your requirements below. Our principal engineers review every inquiry and reply within 4 hours.
                    </p>
                  </div>

                  {/* Name and Email Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[var(--mute)] mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={quoteName}
                        onChange={(e) => setQuoteName(e.target.value)}
                        placeholder="e.g. Jordan Hayes"
                        className="w-full bg-[var(--paper)] border border-[var(--peri)] p-3 text-[16px] sm:text-sm rounded-xl focus:outline-none focus:bg-white focus:border-[var(--pur)] focus:ring-2 focus:ring-[var(--pur)]/15 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[var(--mute)] mb-1.5">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={quoteEmail}
                        onChange={(e) => setQuoteEmail(e.target.value)}
                        placeholder="jordan@company.com"
                        className="w-full bg-[var(--paper)] border border-[var(--peri)] p-3 text-[16px] sm:text-sm rounded-xl focus:outline-none focus:bg-white focus:border-[var(--pur)] focus:ring-2 focus:ring-[var(--pur)]/15 transition-all"
                      />
                    </div>
                  </div>

                  {/* Company / Organization (Optional) */}
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[var(--mute)] mb-1.5">
                      Company or Project Name (Optional)
                    </label>
                    <input
                      type="text"
                      value={quoteCompany}
                      onChange={(e) => setQuoteCompany(e.target.value)}
                      placeholder="e.g. Acme Health or Startup Idea"
                      className="w-full bg-[var(--paper)] border border-[var(--peri)] p-3 text-[16px] sm:text-sm rounded-xl focus:outline-none focus:bg-white focus:border-[var(--pur)] focus:ring-2 focus:ring-[var(--pur)]/15 transition-all"
                    />
                  </div>

                  {/* Suggest a Date and Time preferences (from picture) */}
                  <div className="pt-2 border-t border-[var(--mist)] space-y-2.5">
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[var(--mute)]">
                      Suggest a Date and Time (Optional)
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        aria-label="Preferred call date"
                        className="w-full bg-[var(--paper)] border border-[var(--peri)] p-3 text-[16px] sm:text-sm rounded-xl focus:outline-none focus:bg-white focus:border-[var(--pur)] focus:ring-2 focus:ring-[var(--pur)]/15 transition-all text-[var(--deep)]"
                      />
                      <input
                        type="text"
                        value={preferredTimeZone}
                        onChange={(e) => setPreferredTimeZone(e.target.value)}
                        placeholder="Your time zone (e.g. PKT, UTC+5)"
                        aria-label="Your time zone"
                        className="w-full bg-[var(--paper)] border border-[var(--peri)] p-3 text-[16px] sm:text-sm rounded-xl focus:outline-none focus:bg-white focus:border-[var(--pur)] focus:ring-2 focus:ring-[var(--pur)]/15 transition-all"
                      />
                    </div>

                    {/* Preferred Time Window Slots */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {TIME_SLOTS.map((slot) => {
                        const isSelected = selectedSlot === slot;
                        return (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setSelectedSlot(isSelected ? "" : slot)}
                            className={`px-3.5 py-2 text-xs font-mono font-semibold rounded-lg border transition-all cursor-pointer ${
                              isSelected
                                ? "bg-[var(--deep)] text-white border-[var(--deep)] shadow-sm"
                                : "bg-[var(--paper)] text-[var(--deep)] border-[var(--peri)] hover:border-[var(--deep)] hover:bg-white"
                            }`}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>

                    <p className="text-xs text-[var(--mute)] leading-relaxed">
                      These are preferences, not real-time available slots. We will confirm the date and time by email.
                    </p>
                  </div>

                  {/* Project Details */}
                  <div className="pt-2 border-t border-[var(--mist)]">
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[var(--mute)] mb-1.5">
                      Project Details &amp; Goals *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={quoteMessage}
                      onChange={(e) => setQuoteMessage(e.target.value)}
                      placeholder="Describe what you want to build, current operational bottlenecks, integrations needed (e.g. CRM, Calendly, Postgres), or desired launch timeline..."
                      className="w-full bg-[var(--paper)] border border-[var(--peri)] p-3 text-[16px] sm:text-sm rounded-xl focus:outline-none focus:bg-white focus:border-[var(--pur)] focus:ring-2 focus:ring-[var(--pur)]/15 transition-all leading-relaxed"
                    />
                  </div>

                  {quoteStatus === "error" && (
                    <div className="p-3.5 bg-[rgba(217,56,58,0.08)] border border-[rgba(217,56,58,0.25)] text-[#d9383a] text-xs rounded-xl text-center leading-relaxed font-medium">
                      {quoteError}
                    </div>
                  )}

                  {/* Submit Button & Assurance */}
                  <div className="pt-2 space-y-3">
                    <button
                      type="submit"
                      disabled={quoteStatus === "submitting"}
                      className="btn w-full justify-center text-sm font-bold py-3.5 rounded-xl cursor-pointer"
                      style={{ background: "var(--or)", color: "var(--deep)" }}
                    >
                      <Send className="w-4 h-4 mr-2" />
                      {quoteStatus === "submitting" ? "Dispatching to Engineering..." : "Submit Project Inquiry"}
                    </button>

                    <div className="flex items-center justify-center gap-2 text-xs font-mono text-[var(--mute)] text-center">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#16875b] shrink-0" />
                      <span>Direct scope with engineering • No sales spam</span>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
