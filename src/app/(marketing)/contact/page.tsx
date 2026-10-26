"use client";

import * as React from "react";
import Link from "next/link";
import {
  Mail,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Send,
  Calendar,
  CheckCircle2,
  PhoneCall,
  MessageSquare,
  Bot,
  Database,
  Workflow,
  Globe,
} from "lucide-react";

const consultationTopics = [
  {
    id: "voice-ai",
    title: "AI Voice Receptionist Scope",
    duration: "30 mins",
    icon: Bot,
    color: "#8478e0",
  },
  {
    id: "crm-scope",
    title: "Custom CRM & Lead Pipeline",
    duration: "45 mins",
    icon: Database,
    color: "#5750a8",
  },
  {
    id: "automation",
    title: "Workflow Automation Audit",
    duration: "30 mins",
    icon: Workflow,
    color: "#fd9150",
  },
  {
    id: "full-system",
    title: "Full Unified System Architecture",
    duration: "45 mins",
    icon: Globe,
    color: "#ef7a5e",
  },
];

const availableTimeSlots = [
  "9:30 AM",
  "11:00 AM",
  "1:30 PM",
  "3:00 PM",
  "4:30 PM",
];

export default function ContactPage() {
  const [activeTab, setActiveTab] = React.useState<"quote" | "appointment">("quote");

  // Quote Form State
  const [quoteName, setQuoteName] = React.useState("");
  const [quoteEmail, setQuoteEmail] = React.useState("");
  const [quoteService, setQuoteService] = React.useState("Full System Quote");
  const [quoteMessage, setQuoteMessage] = React.useState("");
  const [quoteStatus, setQuoteStatus] = React.useState<"idle" | "submitting" | "success" | "error">("idle");
  const [quoteRefId, setQuoteRefId] = React.useState("");
  const [quoteError, setQuoteError] = React.useState("");

  // Appointment Form State
  const [selectedTopic, setSelectedTopic] = React.useState(consultationTopics[0].title);
  const [selectedDate, setSelectedDate] = React.useState("Tomorrow, 11:00 AM");
  const [selectedSlot, setSelectedSlot] = React.useState("11:00 AM");
  const [apptName, setApptName] = React.useState("");
  const [apptEmail, setApptEmail] = React.useState("");
  const [apptPhone, setApptPhone] = React.useState("");
  const [apptNotes, setApptNotes] = React.useState("");
  const [apptStatus, setApptStatus] = React.useState<"idle" | "submitting" | "success" | "error">("idle");
  const [apptRefId, setApptRefId] = React.useState("");
  const [apptError, setApptError] = React.useState("");

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
          serviceRequired: quoteService,
          message: quoteMessage,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setQuoteStatus("success");
        setQuoteRefId(data.submissionId || refId);
        return;
      }
      throw new Error(data.error || "Server could not send directly.");
    } catch {
      // Direct fail-safe to FormSubmit
      try {
        const fsRes = await fetch("https://formsubmit.co/ajax/deptloy@gmail.com", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            name: quoteName,
            email: quoteEmail,
            service: quoteService,
            message: quoteMessage,
            reference_id: refId,
            _subject: `New Quote Request: ${quoteName} - Deptloy`,
            _replyto: quoteEmail,
            _captcha: "false",
          }),
        });
        const fsData = await fsRes.json();
        if (fsData.success === "true" || fsData.success === true || (fsData.message && fsData.message.includes("Activation"))) {
          setQuoteStatus("success");
          setQuoteRefId(refId);
          return;
        }
      } catch {
        // Fall through
      }

      setQuoteStatus("error");
      setQuoteError("Could not deliver automatically. You can email deptloy@gmail.com directly with the button below.");
    }
  };

  // Handle Appointment Submit
  const handleAppointmentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApptStatus("submitting");
    setApptError("");

    const refId = `CAL-${Math.floor(100000 + Math.random() * 900000)}`;

    const details = `Appointment Request: ${selectedTopic} | Slot: ${selectedSlot} | Phone: ${apptPhone} | Notes: ${apptNotes || "None"}`;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: apptName,
          email: apptEmail,
          serviceRequired: `Scheduled Appointment: ${selectedTopic}`,
          message: details,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setApptStatus("success");
        setApptRefId(data.submissionId || refId);
        return;
      }
      throw new Error(data.error || "Could not lock appointment slot.");
    } catch {
      // Direct fail-safe
      try {
        const fsRes = await fetch("https://formsubmit.co/ajax/deptloy@gmail.com", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            name: apptName,
            email: apptEmail,
            service: `Appointment Request: ${selectedTopic}`,
            message: details,
            reference_id: refId,
            _subject: `New Strategy Call Request: ${apptName} (${selectedTopic})`,
            _replyto: apptEmail,
            _captcha: "false",
          }),
        });
        const fsData = await fsRes.json();
        if (fsData.success === "true" || fsData.success === true || (fsData.message && fsData.message.includes("Activation"))) {
          setApptStatus("success");
          setApptRefId(refId);
          return;
        }
      } catch {
        // Fall through
      }

      setApptStatus("error");
      setApptError("Could not lock appointment online. Please email deptloy@gmail.com directly.");
    }
  };

  return (
    <div className="py-24 sm:py-32">
      <div className="wrap">
        <span className="k">Technical Inquiries & Appointments</span>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[var(--deep)] max-w-3xl">
          Let’s build something that lasts.
        </h1>
        <p className="lead2 max-w-2xl">
          Tell us how your business runs today. Request a custom quote, schedule a live strategy session, or connect with our engineering team directly.
        </p>

        {/* 2 Main Action Modes Toggle */}
        <div className="mt-12 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setActiveTab("quote")}
            className={`px-5 py-3 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer border ${
              activeTab === "quote"
                ? "bg-[var(--deep)] text-white border-[var(--deep)] shadow-md"
                : "bg-white text-[var(--mute)] border-[var(--peri)] hover:text-[var(--deep)] hover:border-[var(--deep)]"
            }`}
          >
            Option 1: Request a Custom Quote
          </button>
          <button
            type="button"
            id="appointment"
            onClick={() => setActiveTab("appointment")}
            className={`px-5 py-3 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer border flex items-center gap-2 ${
              activeTab === "appointment"
                ? "bg-[var(--deep)] text-white border-[var(--deep)] shadow-md"
                : "bg-white text-[var(--mute)] border-[var(--peri)] hover:text-[var(--deep)] hover:border-[var(--deep)]"
            }`}
          >
            <Calendar className="w-3.5 h-3.5 text-[var(--or)]" />
            Option 2: Schedule a Strategy Call
          </button>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Engineering Channels & Quick Actions */}
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
                  <div className="w-9 h-9 rounded-sm bg-[var(--paper)] border border-[var(--peri)] grid place-items-center text-[var(--deep)] shrink-0">
                    <Mail className="w-4 h-4 text-[var(--or)]" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-mono font-semibold uppercase tracking-wider text-[var(--mute)]">
                      Primary Email Inquiries
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
                  <div className="w-9 h-9 rounded-sm bg-[var(--paper)] border border-[var(--peri)] grid place-items-center text-[var(--deep)] shrink-0">
                    <Clock className="w-4 h-4 text-[var(--lav)]" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-mono font-semibold uppercase tracking-wider text-[var(--mute)]">
                      Response SLA
                    </span>
                    <span className="text-sm font-semibold text-[var(--deep)]">
                      Monday – Friday • Sub-4 Hour Response
                    </span>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-sm bg-[var(--paper)] border border-[var(--peri)] grid place-items-center text-[var(--deep)] shrink-0">
                    <ShieldCheck className="w-4 h-4 text-[#16875b]" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-mono font-semibold uppercase tracking-wider text-[var(--mute)]">
                      Scope Guarantee
                    </span>
                    <span className="text-sm font-semibold text-[var(--deep)]">
                      Fixed Turnkey Architecture • Zero Hidden Fees
                    </span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Live Interactive Voice Demo Callout */}
            <div
              className="bg-[var(--deep)] text-white p-6 sm:p-7 space-y-3"
              style={{
                clipPath: "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 0 100%)",
              }}
            >
              <div className="flex items-center gap-2 text-xs font-mono text-[var(--peri)] uppercase">
                <Sparkles className="w-3.5 h-3.5 text-[var(--or)]" />
                Want immediate voice testing?
              </div>
              <p className="text-xs text-[#cfd2ee] leading-relaxed">
                Test our interactive AI booking agent simulation directly in your browser without booking a call.
              </p>
              <Link
                href="/demo"
                className="btn sm inline-flex"
                style={{ background: "var(--or)", color: "var(--deep)" }}
              >
                Try Interactive Demo <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            </div>
          </div>

          {/* Right Column: Tab 1 (Quote Form) or Tab 2 (Appointment Booking) */}
          <div className="lg:col-span-7">
            {activeTab === "quote" ? (
              /* TAB 1: Quote Form */
              <div
                className="bg-white border border-[rgba(21,19,74,0.14)] p-8 sm:p-10 shadow-[0_24px_60px_rgba(87,80,168,0.12)]"
                style={{
                  clipPath: "polygon(0 0, calc(100% - 30px) 0, 100% 30px, 100% 100%, 0 100%)",
                }}
              >
                {quoteStatus === "success" ? (
                  <div className="text-center py-6 space-y-4">
                    <div className="w-14 h-14 rounded-full bg-[#16875b]/12 text-[#16875b] grid place-items-center mx-auto">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-extrabold text-[var(--deep)]">
                      Quote Request Delivered!
                    </h3>
                    <div className="text-xs font-mono font-bold text-[var(--pur)] bg-[var(--paper)] px-3 py-1 rounded-full inline-block border border-[var(--peri)]">
                      Reference: {quoteRefId}
                    </div>
                    <p className="text-sm text-[var(--mute)] max-w-md mx-auto leading-relaxed">
                      Thank you, <strong>{quoteName}</strong>. Your inquiry has been dispatched to our engineering team at <strong className="text-[var(--deep)]">deptloy@gmail.com</strong>. We will review your requirements and respond within 4 hours.
                    </p>
                    <div className="pt-2 flex justify-center gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setQuoteStatus("idle");
                          setQuoteName("");
                          setQuoteEmail("");
                          setQuoteMessage("");
                        }}
                        className="btn sm ghost"
                      >
                        Submit another inquiry
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleQuoteSubmit} className="space-y-4">
                    <div className="border-b border-[var(--mist)] pb-3">
                      <h2 className="text-xl font-extrabold text-[var(--deep)]">
                        Get a Custom System Quote
                      </h2>
                      <p className="text-xs text-[var(--mute)] mt-1">
                        Responses dispatched directly to engineering at deptloy@gmail.com.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono font-bold uppercase text-[var(--mute)] mb-1">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={quoteName}
                          onChange={(e) => setQuoteName(e.target.value)}
                          placeholder="e.g. Jordan Hayes"
                          className="w-full bg-[var(--paper)] border border-[var(--peri)] p-3 text-sm rounded-lg focus:outline-none focus:border-[var(--pur)]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono font-bold uppercase text-[var(--mute)] mb-1">
                          Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={quoteEmail}
                          onChange={(e) => setQuoteEmail(e.target.value)}
                          placeholder="jordan@company.com"
                          className="w-full bg-[var(--paper)] border border-[var(--peri)] p-3 text-sm rounded-lg focus:outline-none focus:border-[var(--pur)]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold uppercase text-[var(--mute)] mb-1">
                        Primary Service Focus
                      </label>
                      <select
                        value={quoteService}
                        onChange={(e) => setQuoteService(e.target.value)}
                        className="w-full bg-[var(--paper)] border border-[var(--peri)] p-3 text-sm rounded-lg focus:outline-none focus:border-[var(--pur)]"
                      >
                        <option value="Full System Quote">Complete Unified System (Voice + CRM + Automation + Web)</option>
                        <option value="AI Receptionist">AI Voice & Text Receptionist (24/7 Call Intake)</option>
                        <option value="Custom CRM">Custom CRM & Pipeline Architecture</option>
                        <option value="Workflow Automation">Workflow Automation & Background Synchronization</option>
                        <option value="Web & App Development">Web Platforms & Bespoke Client Portals</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold uppercase text-[var(--mute)] mb-1">
                        What would you like to improve? *
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={quoteMessage}
                        onChange={(e) => setQuoteMessage(e.target.value)}
                        placeholder="Describe your current phone/inquiry volume, tools you use, and what manual bottlenecks you want eliminated..."
                        className="w-full bg-[var(--paper)] border border-[var(--peri)] p-3 text-sm rounded-lg focus:outline-none focus:border-[var(--pur)]"
                      />
                    </div>

                    {quoteStatus === "error" && (
                      <div className="p-3 bg-[rgba(217,56,58,0.08)] border border-[rgba(217,56,58,0.2)] text-[#d9383a] text-xs rounded-lg text-center">
                        {quoteError}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={quoteStatus === "submitting"}
                      className="btn w-full justify-center text-sm font-bold"
                    >
                      <Send className="w-4 h-4 mr-1.5" />
                      {quoteStatus === "submitting" ? "Sending Request..." : "Get the quote"}
                    </button>
                  </form>
                )}
              </div>
            ) : (
              /* TAB 2: Appointment / Strategy Call Scheduler */
              <div
                className="bg-white border border-[rgba(21,19,74,0.14)] p-8 sm:p-10 shadow-[0_24px_60px_rgba(87,80,168,0.12)]"
                style={{
                  clipPath: "polygon(0 0, calc(100% - 30px) 0, 100% 30px, 100% 100%, 0 100%)",
                }}
              >
                {apptStatus === "success" ? (
                  <div className="text-center py-6 space-y-4">
                    <div className="w-14 h-14 rounded-full bg-[#16875b]/12 text-[#16875b] grid place-items-center mx-auto">
                      <Calendar className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-extrabold text-[var(--deep)]">
                      Strategy Session Reserved!
                    </h3>
                    <div className="text-xs font-mono font-bold text-[var(--pur)] bg-[var(--paper)] px-3 py-1 rounded-full inline-block border border-[var(--peri)]">
                      Booking Reference: {apptRefId}
                    </div>
                    <p className="text-sm text-[var(--mute)] max-w-md mx-auto leading-relaxed">
                      Thank you, <strong>{apptName}</strong>. Your session for <strong>{selectedTopic}</strong> ({selectedSlot}) has been dispatched to <strong className="text-[var(--deep)]">deptloy@gmail.com</strong>. You will receive a calendar invite within 2 hours.
                    </p>
                    <div className="pt-2 flex justify-center gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setApptStatus("idle");
                          setApptName("");
                          setApptEmail("");
                        }}
                        className="btn sm ghost"
                      >
                        Schedule another time
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleAppointmentSubmit} className="space-y-4">
                    <div className="border-b border-[var(--mist)] pb-3">
                      <h2 className="text-xl font-extrabold text-[var(--deep)]">
                        Schedule a Technical Strategy Call
                      </h2>
                      <p className="text-xs text-[var(--mute)] mt-1">
                        Meet with a principal systems engineer. 100% technical scope, zero sales pressure.
                      </p>
                    </div>

                    {/* Step 1: Select Topic */}
                    <div>
                      <label className="block text-xs font-mono font-bold uppercase text-[var(--mute)] mb-2">
                        1. Select Consultation Focus
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {consultationTopics.map((topic) => (
                          <button
                            key={topic.id}
                            type="button"
                            onClick={() => setSelectedTopic(topic.title)}
                            className={`p-3 text-left border rounded-lg transition-all cursor-pointer ${
                              selectedTopic === topic.title
                                ? "bg-[var(--paper)] border-[var(--pur)] ring-1 ring-[var(--pur)]"
                                : "bg-white border-[var(--peri)] hover:bg-[var(--paper)]"
                            }`}
                          >
                            <div className="text-xs font-bold text-[var(--deep)]">{topic.title}</div>
                            <div className="text-[11px] font-mono text-[var(--mute)] mt-0.5">{topic.duration}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Step 2: Available Time Window */}
                    <div>
                      <label className="block text-xs font-mono font-bold uppercase text-[var(--mute)] mb-2">
                        2. Select Time Window (EST / PT)
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {availableTimeSlots.map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setSelectedSlot(slot)}
                            className={`px-3 py-1.5 text-xs font-mono font-semibold rounded border cursor-pointer ${
                              selectedSlot === slot
                                ? "bg-[var(--deep)] text-white border-[var(--deep)]"
                                : "bg-[var(--paper)] text-[var(--deep)] border-[var(--peri)] hover:border-[var(--deep)]"
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Step 3: Attendee Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div>
                        <label className="block text-xs font-mono font-bold uppercase text-[var(--mute)] mb-1">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={apptName}
                          onChange={(e) => setApptName(e.target.value)}
                          placeholder="Dr. Alex Rivera"
                          className="w-full bg-[var(--paper)] border border-[var(--peri)] p-3 text-sm rounded-lg focus:outline-none focus:border-[var(--pur)]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono font-bold uppercase text-[var(--mute)] mb-1">
                          Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={apptEmail}
                          onChange={(e) => setApptEmail(e.target.value)}
                          placeholder="alex@company.com"
                          className="w-full bg-[var(--paper)] border border-[var(--peri)] p-3 text-sm rounded-lg focus:outline-none focus:border-[var(--pur)]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold uppercase text-[var(--mute)] mb-1">
                        Phone Number (Optional for SMS Invite)
                      </label>
                      <input
                        type="tel"
                        value={apptPhone}
                        onChange={(e) => setApptPhone(e.target.value)}
                        placeholder="+1 (555) 000-0000"
                        className="w-full bg-[var(--paper)] border border-[var(--peri)] p-3 text-sm rounded-lg focus:outline-none focus:border-[var(--pur)]"
                      />
                    </div>

                    {apptStatus === "error" && (
                      <div className="p-3 bg-[rgba(217,56,58,0.08)] border border-[rgba(217,56,58,0.2)] text-[#d9383a] text-xs rounded-lg text-center">
                        {apptError}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={apptStatus === "submitting"}
                      className="btn w-full justify-center text-sm font-bold"
                      style={{ background: "var(--or)", color: "var(--deep)" }}
                    >
                      <Calendar className="w-4 h-4 mr-1.5" />
                      {apptStatus === "submitting" ? "Locking Slot..." : "Confirm Strategy Call"}
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
