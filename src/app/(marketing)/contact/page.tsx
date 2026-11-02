"use client";

import * as React from "react";
import Link from "next/link";
import {
  Mail,
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  Send,
  CheckCircle2,
  Copy,
  Check,
  Code2,
} from "lucide-react";

function WhatsAppIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

export default function ContactPage() {
  // Form State
  const [quoteName, setQuoteName] = React.useState("");
  const [quoteEmail, setQuoteEmail] = React.useState("");
  const [quoteCompany, setQuoteCompany] = React.useState("");
  const [quoteMessage, setQuoteMessage] = React.useState("");

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

  const handleCopyEmail = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText("deptloy@gmail.com");
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  const handleCopyPhone = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText("+14743491561");
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const openWhatsApp = () => {
    window.open("https://wa.me/14743491561", "_blank", "noopener,noreferrer");
  };

  const openEmail = () => {
    window.location.href = "mailto:deptloy@gmail.com";
  };

  // Handle Quote Submit
  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setQuoteStatus("submitting");
    setQuoteError("");

    const refId = `DEP-${Math.floor(100000 + Math.random() * 900000)}`;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: quoteName,
          email: quoteEmail,
          companyName: quoteCompany || "Direct Inquiry",
          serviceRequired: "Project Inquiry",
          message: quoteMessage.trim(),
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
    <div className="pt-12 sm:pt-16 lg:pt-20 pb-10 sm:pb-14">
      <div className="wrap">
        {/* Page Header (Tightened gap, no extra paragraph) */}
        <div className="mb-3 sm:mb-4">
          <span className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider text-[var(--or)]">
            Get In Touch
          </span>
          <h1
            style={{ fontSize: "clamp(26px, 3.8vw, 38px)", fontWeight: 800, lineHeight: 1.15 }}
            className="text-[var(--deep)] mt-1 tracking-tight"
          >
            Let&apos;s Connect
          </h1>
        </div>

        {/* Responsive Grid: Form on Left (col-span-7), Direct Channels Card on Right (col-span-5) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-7 lg:gap-8 items-start">
          {/* Left Column: Project Inquiry Form */}
          <div className="order-1 lg:col-span-7" id="form" style={{ scrollMarginTop: "90px" }}>
            <div className="bg-white border border-[rgba(21,19,74,0.12)] p-5 sm:p-7 rounded-2xl shadow-[0_16px_45px_rgba(87,80,168,0.07)]">
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
                      }}
                      className="btn sm ghost"
                    >
                      Submit another inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleQuoteSubmit} className="space-y-3.5">
                  {/* Form Header: Shortened, concise, no excessive gaps */}
                  <div className="border-b border-[var(--mist)] pb-3 mb-1">
                    <p className="text-sm sm:text-[14.5px] text-[var(--deep)] leading-snug font-medium">
                      Have a project in mind, an operational bottleneck to automate, or need an AI receptionist?{" "}
                      <span className="font-bold text-[var(--pur)]">Let&apos;s discuss.</span>
                    </p>
                  </div>

                  {/* Name and Email Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[var(--mute)] mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={quoteName}
                        onChange={(e) => setQuoteName(e.target.value)}
                        placeholder="e.g. Jordan Hayes"
                        className="w-full bg-[var(--paper)] border border-[var(--peri)] p-2.5 sm:p-3 text-[15px] sm:text-sm rounded-xl focus:outline-none focus:bg-white focus:border-[var(--pur)] focus:ring-2 focus:ring-[var(--pur)]/15 transition-all text-[var(--deep)]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[var(--mute)] mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={quoteEmail}
                        onChange={(e) => setQuoteEmail(e.target.value)}
                        placeholder="jordan@company.com"
                        className="w-full bg-[var(--paper)] border border-[var(--peri)] p-2.5 sm:p-3 text-[15px] sm:text-sm rounded-xl focus:outline-none focus:bg-white focus:border-[var(--pur)] focus:ring-2 focus:ring-[var(--pur)]/15 transition-all text-[var(--deep)]"
                      />
                    </div>
                  </div>

                  {/* Company / Organization (Optional) */}
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[var(--mute)] mb-1">
                      Company or Project Name (Optional)
                    </label>
                    <input
                      type="text"
                      value={quoteCompany}
                      onChange={(e) => setQuoteCompany(e.target.value)}
                      placeholder="e.g. Acme Health or Startup Idea"
                      className="w-full bg-[var(--paper)] border border-[var(--peri)] p-2.5 sm:p-3 text-[15px] sm:text-sm rounded-xl focus:outline-none focus:bg-white focus:border-[var(--pur)] focus:ring-2 focus:ring-[var(--pur)]/15 transition-all text-[var(--deep)]"
                    />
                  </div>

                  {/* Project Details */}
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[var(--mute)] mb-1">
                      Project Details &amp; Goals *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={quoteMessage}
                      onChange={(e) => setQuoteMessage(e.target.value)}
                      placeholder="Describe what you want to build, current operational bottlenecks, systems to connect (e.g. CRM, Calendly, Postgres, AI phone line), or your target launch timeline..."
                      className="w-full bg-[var(--paper)] border border-[var(--peri)] p-2.5 sm:p-3 text-[15px] sm:text-sm rounded-xl focus:outline-none focus:bg-white focus:border-[var(--pur)] focus:ring-2 focus:ring-[var(--pur)]/15 transition-all leading-relaxed text-[var(--deep)]"
                    />
                  </div>

                  {quoteStatus === "error" && (
                    <div className="p-3 bg-[rgba(217,56,58,0.08)] border border-[rgba(217,56,58,0.25)] text-[#d9383a] text-xs rounded-xl text-center leading-relaxed font-medium">
                      {quoteError}
                    </div>
                  )}

                  {/* Submit Button & Assurance */}
                  <div className="pt-1.5 space-y-2.5">
                    <button
                      type="submit"
                      disabled={quoteStatus === "submitting"}
                      className="btn w-full justify-center text-sm font-bold py-3 rounded-xl cursor-pointer hover:brightness-110 hover:shadow-lg transition-all disabled:opacity-60 disabled:cursor-wait"
                      style={{ background: "var(--deep)", color: "#ffffff" }}
                    >
                      <Send className="w-4 h-4 mr-2 text-white shrink-0" />
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

          {/* Right Column: Direct Channels & Information */}
          <div className="order-2 lg:col-span-5 space-y-4">
            {/* Direct Contact Card */}
            <div className="bg-white border border-[rgba(21,19,74,0.12)] p-5 sm:p-6 rounded-2xl shadow-[0_12px_36px_rgba(87,80,168,0.06)] space-y-3.5">
              <div className="border-b border-[var(--mist)] pb-2.5">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--pur)]">
                  Direct Lines
                </span>
                <h3 className="text-base sm:text-lg font-bold text-[var(--deep)] tracking-tight mt-0.5">
                  Prefer chatting or direct emails?
                </h3>
              </div>

              {/* WhatsApp & Phone Item: Clicking anywhere triggers WhatsApp, copy button works independently */}
              <div
                role="button"
                tabIndex={0}
                onClick={openWhatsApp}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openWhatsApp();
                  }
                }}
                aria-label="Chat with Deptloy on WhatsApp at +1 474 349-1561"
                className="p-3.5 rounded-xl border border-[rgba(21,19,74,0.1)] bg-[var(--paper)]/50 hover:bg-white hover:border-[#25D366] hover:shadow-[0_6px_20px_rgba(37,211,102,0.12)] transition-all duration-200 cursor-pointer group select-none"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-[#25D366]/15 text-[#128C7E] grid place-items-center shrink-0">
                      <WhatsAppIcon className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--mute)]">
                      WhatsApp &amp; Direct Line
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-0.5 text-xs font-mono font-bold text-[#128C7E] group-hover:underline">
                    Chat on WhatsApp <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </div>

                <div className="mt-2.5 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopyPhone(e);
                    }}
                    onKeyDown={(e) => e.stopPropagation()}
                    className="p-1.5 rounded-md text-[var(--mute)] hover:text-[var(--deep)] hover:bg-[var(--mist)] border border-transparent hover:border-[var(--peri)] transition-all cursor-copy shrink-0 z-10"
                    title={copiedPhone ? "Copied!" : "Click to copy phone number"}
                    aria-label="Copy phone number"
                  >
                    {copiedPhone ? (
                      <Check className="w-3.5 h-3.5 text-[#16875b]" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>

                  <span className="text-sm sm:text-base font-bold text-[var(--deep)] group-hover:text-[#128C7E] tracking-tight transition-colors">
                    +1 (474) 349-1561
                  </span>

                  {copiedPhone && (
                    <span className="text-[11px] font-mono text-[#16875b] font-bold ml-auto">
                      Copied!
                    </span>
                  )}
                </div>
              </div>

              {/* Email Inquiries Item: Clicking anywhere triggers email client, copy button works independently */}
              <div
                role="button"
                tabIndex={0}
                onClick={openEmail}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openEmail();
                  }
                }}
                aria-label="Send email to deptloy@gmail.com"
                className="p-3.5 rounded-xl border border-[rgba(21,19,74,0.1)] bg-[var(--paper)]/50 hover:bg-white hover:border-[var(--or)] hover:shadow-[0_6px_20px_rgba(253,145,80,0.12)] transition-all duration-200 cursor-pointer group select-none"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-[var(--or)]/15 text-[var(--or)] grid place-items-center shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--mute)]">
                      Primary Engineering Inbox
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-0.5 text-xs font-mono font-bold text-[var(--or)] group-hover:underline">
                    Open Mail <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </div>

                <div className="mt-2.5 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopyEmail(e);
                    }}
                    onKeyDown={(e) => e.stopPropagation()}
                    className="p-1.5 rounded-md text-[var(--mute)] hover:text-[var(--deep)] hover:bg-[var(--mist)] border border-transparent hover:border-[var(--peri)] transition-all cursor-copy shrink-0 z-10"
                    title={copiedEmail ? "Copied!" : "Click to copy email address"}
                    aria-label="Copy email address"
                  >
                    {copiedEmail ? (
                      <Check className="w-3.5 h-3.5 text-[#16875b]" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>

                  <span className="text-sm sm:text-base font-bold text-[var(--deep)] group-hover:text-[var(--or)] tracking-tight transition-colors break-all">
                    deptloy@gmail.com
                  </span>

                  {copiedEmail && (
                    <span className="text-[11px] font-mono text-[#16875b] font-bold ml-auto shrink-0">
                      Copied!
                    </span>
                  )}
                </div>
              </div>

              {/* Relevant Studio Highlights */}
              <div className="pt-2.5 border-t border-[var(--mist)] space-y-2 text-xs text-[var(--mute)]">
                <div className="flex items-start gap-2.5">
                  <Code2 className="w-4 h-4 text-[var(--pur)] shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    <strong className="text-[var(--deep)]">Direct Engineer Access:</strong> You communicate directly with
                    lead architects — zero account managers or sales runaround.
                  </p>
                </div>
                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#16875b] shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    <strong className="text-[var(--deep)]">100% IP &amp; Data Sovereignty:</strong> You own all source
                    code and schemas. Client data is never used to train commercial models.
                  </p>
                </div>
              </div>
            </div>

            {/* Interactive Voice Demo Callout Card */}
            <div className="bg-[var(--deep)] text-white p-5 rounded-2xl relative overflow-hidden shadow-[0_16px_40px_rgba(21,19,74,0.18)]">
              {/* Radial gradient glow */}
              <div
                className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none opacity-20"
                style={{
                  background: "radial-gradient(circle, var(--lav) 0%, transparent 70%)",
                  transform: "translate(30%, -30%)",
                }}
              />

              <div className="relative z-10 space-y-2">
                <div className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--peri)]">
                  <Sparkles className="w-3.5 h-3.5 text-[var(--or)]" />
                  <span>Interactive Voice Demo</span>
                </div>
                <h3
                  style={{ fontSize: "16px", fontWeight: 700, lineHeight: 1.25 }}
                  className="text-white"
                >
                  Experience our AI receptionist live
                </h3>
                <p className="text-xs text-[#cfd2ee] leading-relaxed">
                  Test conversational caller intake, dynamic calendar availability, and CRM sync directly in your
                  browser.
                </p>
                <div className="pt-0.5">
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


          </div>
        </div>
      </div>
    </div>
  );
}
