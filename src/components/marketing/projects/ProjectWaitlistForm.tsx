"use client";

import * as React from "react";
import { CheckCircle2, Send, Sparkles, Shield, AlertCircle } from "lucide-react";

interface ProjectWaitlistFormProps {
  projectName: string;
  category?: string;
  accent?: string;
}

export function ProjectWaitlistForm({
  projectName,
  accent = "var(--or)",
}: ProjectWaitlistFormProps) {
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = React.useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setErrorMsg("Please enter a valid email address.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: name.trim() || "Early Adopter",
          email: email.trim().toLowerCase(),
          serviceRequired: `${projectName} Waitlist & Early Access`,
          projectDescription: `User requested early access / beta sign-up for ${projectName}. Name: ${name || "Not specified"}. Email: ${email}.`,
        }),
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || "Unable to join waitlist. Please try again.");
      }

      setStatus("success");
    } catch (err) {
      console.error("[ProjectWaitlistForm]", err);
      setErrorMsg(
        err instanceof Error ? err.message : "Something went wrong. Please email contact@deptloy.com directly."
      );
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[rgba(22,135,91,0.25)] shadow-lg text-center space-y-3">
        <div className="w-12 h-12 rounded-full bg-[#16875b]/15 text-[#16875b] grid place-items-center mx-auto">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold text-[var(--deep)]">
          You&apos;re on the early access list!
        </h3>
        <p className="text-sm text-[var(--mute)] max-w-md mx-auto leading-relaxed">
          Thank you for joining. We will notify you directly at <strong className="text-[var(--deep)]">{email}</strong> as soon as private beta invites open.
        </p>
        <div className="pt-2">
          <button
            type="button"
            onClick={() => {
              setStatus("idle");
              setEmail("");
              setName("");
            }}
            className="text-xs font-mono font-bold text-[var(--pur)] hover:underline cursor-pointer"
          >
            Add another email
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[rgba(21,19,74,0.12)] shadow-xl relative overflow-hidden">
      {/* Decorative top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-1.5"
        style={{ background: accent }}
      />

      <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[var(--pur)] mb-2">
        <Sparkles className="w-3.5 h-3.5" style={{ color: accent }} />
        <span>Early Access &amp; Beta</span>
      </div>

      <h3 className="text-xl sm:text-2xl font-bold text-[var(--deep)] tracking-tight">
        Be the first to try {projectName}
      </h3>
      <p className="text-sm text-[var(--mute)] mt-1.5 max-w-xl leading-relaxed">
        Sign up to get notified the moment the app goes live on the App Store and Google Play, and test private beta releases before public launch.
      </p>

      <form onSubmit={handleSubmit} className="mt-5 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[var(--mute)] mb-1">
              Your Name (Optional)
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Tariq or Sara"
              className="w-full bg-[var(--paper)] border border-[var(--peri)] p-3 text-sm rounded-xl focus:outline-none focus:bg-white focus:border-[var(--pur)] text-[var(--deep)]"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[var(--mute)] mb-1">
              Your Email *
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@domain.com"
              className="w-full bg-[var(--paper)] border border-[var(--peri)] p-3 text-sm rounded-xl focus:outline-none focus:bg-white focus:border-[var(--pur)] text-[var(--deep)]"
            />
          </div>
        </div>

        {status === "error" && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <button
            type="submit"
            disabled={status === "submitting"}
            className="btn justify-center font-bold text-sm py-3 px-6 rounded-xl cursor-pointer"
            style={{ background: accent, color: "#fff" }}
          >
            <Send className="w-4 h-4 mr-1.5" />
            {status === "submitting" ? "Joining waitlist..." : "Get Early Access"}
          </button>

          <div className="flex items-center gap-1.5 text-xs text-[var(--mute)] font-mono">
            <Shield className="w-3.5 h-3.5 text-[#16875b]" />
            <span>Zero spam. Only beta invite announcements.</span>
          </div>
        </div>
      </form>
    </div>
  );
}

