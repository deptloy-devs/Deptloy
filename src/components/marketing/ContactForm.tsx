"use client";

import * as React from "react";
import { AlertCircle, CheckCircle2, Send, ShieldCheck, Sparkles, Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input, Select, Textarea } from "@/components/ui/Field";
import { services } from "@/lib/site";
import type { ContactFormData, ContactFormErrors, ServiceSlug } from "@/types";

const initialData: ContactFormData = {
  fullName: "",
  email: "",
  companyName: "",
  serviceRequired: "",
  projectDescription: "",
};

const fieldOrder: (keyof ContactFormErrors)[] = [
  "fullName",
  "email",
  "companyName",
  "serviceRequired",
  "projectDescription",
];

function validate(data: ContactFormData): ContactFormErrors {
  const errors: ContactFormErrors = {};
  if (!data.fullName.trim()) errors.fullName = "Please enter your full name";
  else if (data.fullName.trim().length < 2) errors.fullName = "Name must be at least 2 characters";

  if (!data.email.trim()) errors.email = "Email address is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = "Please enter a valid email address";

  if (!data.companyName.trim()) errors.companyName = "Company or practice name is required";
  if (!data.serviceRequired) errors.serviceRequired = "Please select the primary service needed";

  if (!data.projectDescription.trim()) errors.projectDescription = "Please provide brief details about your inquiry";
  else if (data.projectDescription.trim().length < 5)
    errors.projectDescription = "Please enter at least 5 characters describing your needs";
  return errors;
}

export function ContactForm() {
  const [formData, setFormData] = React.useState<ContactFormData>(initialData);
  const [errors, setErrors] = React.useState<ContactFormErrors>({});
  const [submitAttempted, setSubmitAttempted] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [submissionId, setSubmissionId] = React.useState("");
  const [apiError, setApiError] = React.useState<string | null>(null);

  const formRef = React.useRef<HTMLFormElement>(null);
  const successRef = React.useRef<HTMLHeadingElement>(null);

  const update = <K extends keyof ContactFormData>(key: K, value: ContactFormData[K]) => {
    const next = { ...formData, [key]: value };
    setFormData(next);
    if (submitAttempted) setErrors(validate(next));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitAttempted(true);
    setApiError(null);

    const found = validate(formData);
    setErrors(found);
    const firstInvalid = fieldOrder.find((k) => found[k]);
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Failed to submit quote request. Please try again.");
      }

      setIsSubmitted(true);
      setSubmissionId(result.submissionId || `DEP-${Math.floor(100000 + Math.random() * 900000)}`);
      requestAnimationFrame(() => successRef.current?.focus());
    } catch (err: unknown) {
      console.error("Submission error:", err);
      const msg = err instanceof Error ? err.message : "Network error. Please try again or email deptloy@gmail.com directly.";
      setApiError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData(initialData);
    setErrors({});
    setSubmitAttempted(false);
    setIsSubmitted(false);
    setApiError(null);
  };

  const errorCount = Object.keys(errors).length;

  if (isSubmitted) {
    return (
      <div className="space-y-6 py-6 text-center animate-fade-in" role="status">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 shadow-glow">
          <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
        </span>
        <div className="space-y-2">
          <h2 ref={successRef} tabIndex={-1} className="font-display text-2xl font-bold tracking-tight text-fg focus:outline-none">
            Quote Request Received!
          </h2>
          <p className="font-mono text-xs text-brand-300">Reference: {submissionId}</p>
          <p className="mx-auto max-w-md text-sm text-fg-muted leading-relaxed">
            Thank you, <strong className="text-fg">{formData.fullName}</strong>. Your inquiry has been dispatched to our engineering team at <span className="font-semibold text-brand-300">deptloy@gmail.com</span>. We will review your requirements and reply with a custom scope within 4 hours.
          </p>
        </div>

        <div className="mx-auto max-w-md space-y-2 rounded-card border border-line bg-raised/70 p-4 text-left text-xs">
          <p className="font-semibold text-fg flex items-center gap-1.5">
            <Mail className="h-4 w-4 text-brand-400" />
            Inquiry Summary
          </p>
          <dl className="space-y-1.5 border-t border-line pt-2 text-fg-soft">
            <div className="flex justify-between gap-2"><dt className="text-fg-muted">Name:</dt><dd className="font-medium text-fg">{formData.fullName}</dd></div>
            <div className="flex justify-between gap-2"><dt className="text-fg-muted">Company:</dt><dd className="font-medium text-fg">{formData.companyName}</dd></div>
            <div className="flex justify-between gap-2"><dt className="text-fg-muted">Email:</dt><dd className="font-medium text-fg">{formData.email}</dd></div>
            <div className="flex justify-between gap-2">
              <dt className="text-fg-muted">Service:</dt>
              <dd className="font-medium text-fg">{services.find((s) => s.slug === formData.serviceRequired)?.title ?? formData.serviceRequired}</dd>
            </div>
          </dl>
        </div>

        <div className="flex flex-col items-stretch justify-center gap-3 pt-2 sm:flex-row sm:items-center">
          <Button onClick={handleReset} variant="secondary" size="md">
            Submit Another Request
          </Button>
          <Button href="/demo" variant="outline" size="md">
            Test Live AI Voice Demo
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-4">
      {/* Form Header */}
      <div className="border-b border-line pb-3.5 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-fg">Get a Quote</h2>
          <p className="mt-1 text-xs text-fg-muted">
            All fields marked with an asterisk (<span className="text-brand-300">*</span>) are required.
          </p>
        </div>
        <span className="hidden sm:inline-flex items-center gap-1 rounded-full border border-brand-400/25 bg-brand-500/10 px-2.5 py-1 text-[11px] font-medium text-brand-300">
          <Sparkles className="h-3 w-3" />
          Sub-4hr Response
        </span>
      </div>

      {/* Validation Alert */}
      {errorCount > 0 && (
        <div role="alert" className="flex items-start gap-2.5 rounded-card border border-danger/30 bg-danger/10 p-3 text-xs text-fg-soft">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-danger" aria-hidden="true" />
          <span>
            Please fix {errorCount} {errorCount === 1 ? "field" : "fields"} highlighted below.
          </span>
        </div>
      )}

      {/* API Submission Error Alert */}
      {apiError && (
        <div role="alert" className="flex items-start gap-2.5 rounded-card border border-danger/30 bg-danger/10 p-3 text-xs text-fg-soft">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-danger" aria-hidden="true" />
          <span>{apiError}</span>
        </div>
      )}

      {/* Row 1: Full Name & Email */}
      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
        <Input
          name="fullName"
          label="Full Name"
          placeholder="e.g. Jordan Hayes"
          autoComplete="name"
          value={formData.fullName}
          onChange={(e) => update("fullName", e.target.value)}
          error={errors.fullName}
          required
        />
        <Input
          name="email"
          label="Email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="jordan@company.com"
          value={formData.email}
          onChange={(e) => update("email", e.target.value)}
          error={errors.email}
          required
        />
      </div>

      {/* Row 2: Company & Service */}
      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
        <Input
          name="companyName"
          label="Company or Practice Name"
          placeholder="Apex Health Clinic"
          autoComplete="organization"
          value={formData.companyName}
          onChange={(e) => update("companyName", e.target.value)}
          error={errors.companyName}
          required
        />
        <Select
          name="serviceRequired"
          label="Primary Service Needed"
          value={formData.serviceRequired}
          onChange={(e) => update("serviceRequired", e.target.value as ServiceSlug)}
          error={errors.serviceRequired}
          required
        >
          <option value="" disabled>
            Select a solution...
          </option>
          {services.map((srv) => (
            <option key={srv.slug} value={srv.slug}>
              {srv.title}
            </option>
          ))}
        </Select>
      </div>

      {/* Row 3: Project Details */}
      <Textarea
        name="projectDescription"
        label="Project Details & Current Pain Points"
        placeholder="Describe your current phone/inquiry volume, tools you use (e.g. Google Calendar, HubSpot), and what you want automated..."
        value={formData.projectDescription}
        onChange={(e) => update("projectDescription", e.target.value)}
        error={errors.projectDescription}
        rows={3}
        required
      />

      {/* Submit Button */}
      <div className="pt-1">
        <Button
          type="submit"
          size="lg"
          className="w-full text-base font-semibold shadow-glow"
          isLoading={isSubmitting}
          rightIcon={<Send className="h-4 w-4" aria-hidden="true" />}
        >
          {isSubmitting ? "Sending Request…" : "Get the Quote"}
        </Button>
      </div>

      {/* Security Guarantee */}
      <p className="flex items-center justify-center gap-1.5 text-center text-xs text-fg-subtle">
        <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-emerald-400" aria-hidden="true" />
        Protected by non-disclosure boundaries • Sent to deptloy@gmail.com
      </p>
    </form>
  );
}
