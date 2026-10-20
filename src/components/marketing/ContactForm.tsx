"use client";

import * as React from "react";
import { AlertCircle, CheckCircle2, Send, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input, Select, Textarea } from "@/components/ui/Field";
import { services } from "@/lib/site";
import type { ContactFormData, ContactFormErrors, ServiceSlug } from "@/types";

const budgetOptions = [
  { value: "$1,500 - $3,000", label: "$1,500 - $3,000 / month" },
  { value: "$3,000 - $6,000", label: "$3,000 - $6,000 / month" },
  { value: "$6,000+", label: "$6,000+ / custom enterprise" },
];

const timelineOptions = ["Immediately (1-2 weeks)", "Within 3-4 weeks", "Exploring for next quarter"];

// Defaults now match real options (previously "$2,500 - $5,000" / "Within 2-4 weeks" didn't exist).
const initialData: ContactFormData = {
  fullName: "",
  businessEmail: "",
  companyName: "",
  serviceRequired: "",
  projectDescription: "",
  budgetRange: budgetOptions[0].value,
  timeline: timelineOptions[0],
};

const fieldOrder: (keyof ContactFormErrors)[] = [
  "fullName",
  "businessEmail",
  "companyName",
  "serviceRequired",
  "projectDescription",
];

function validate(data: ContactFormData): ContactFormErrors {
  const errors: ContactFormErrors = {};
  if (!data.fullName.trim()) errors.fullName = "Please enter your full name";
  else if (data.fullName.trim().length < 2) errors.fullName = "Name must be at least 2 characters";

  if (!data.businessEmail.trim()) errors.businessEmail = "Business email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.businessEmail)) errors.businessEmail = "Please enter a valid email address";

  if (!data.companyName.trim()) errors.companyName = "Company or practice name is required";
  if (!data.serviceRequired) errors.serviceRequired = "Please select the primary service needed";

  if (!data.projectDescription.trim()) errors.projectDescription = "Please provide brief details about your inquiry";
  else if (data.projectDescription.trim().length < 10)
    errors.projectDescription = "Please enter at least 10 characters describing your needs";
  return errors;
}

export function ContactForm() {
  const [formData, setFormData] = React.useState<ContactFormData>(initialData);
  const [errors, setErrors] = React.useState<ContactFormErrors>({});
  const [submitAttempted, setSubmitAttempted] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [submissionId, setSubmissionId] = React.useState("");
  const formRef = React.useRef<HTMLFormElement>(null);
  const successRef = React.useRef<HTMLHeadingElement>(null);

  const update = <K extends keyof ContactFormData>(key: K, value: ContactFormData[K]) => {
    const next = { ...formData, [key]: value };
    setFormData(next);
    // After the first submit, re-validate as the visitor fixes fields.
    if (submitAttempted) setErrors(validate(next));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitAttempted(true);
    const found = validate(formData);
    setErrors(found);
    const firstInvalid = fieldOrder.find((k) => found[k]);
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    setIsSubmitting(true);
    // DEMO MODE: nothing is sent yet. Wire this to an email/CRM endpoint before launch.
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setSubmissionId(`DEP-${Math.floor(100000 + Math.random() * 900000)}`);
      requestAnimationFrame(() => successRef.current?.focus());
    }, 1200);
  };

  const handleReset = () => {
    setFormData(initialData);
    setErrors({});
    setSubmitAttempted(false);
    setIsSubmitted(false);
  };

  const errorCount = Object.keys(errors).length;

  if (isSubmitted) {
    return (
      <div className="space-y-6 py-6 text-center" role="status">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-success/30 bg-success/10 text-success">
          <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
        </span>
        <div className="space-y-2">
          <h2 ref={successRef} tabIndex={-1} className="text-h3 font-semibold focus:outline-none">
            Inquiry Validated Successfully
          </h2>
          <p className="font-mono text-sm text-brand-300">Reference Token: {submissionId}</p>
        </div>

        <div className="mx-auto max-w-md space-y-2 rounded-card border border-line bg-raised p-4 text-left text-sm">
          <p className="flex items-center gap-2 font-semibold text-warning">
            <AlertCircle className="h-4 w-4" aria-hidden="true" />
            Demonstration Mode Active
          </p>
          <p className="leading-relaxed text-fg-muted">
            Your submission payload has been successfully validated on the frontend and simulated locally. In production,
            this form triggers an automated lead intake webhook to our CRM.
          </p>
          <dl className="space-y-1 border-t border-line pt-2 text-fg-soft">
            <div className="flex gap-1"><dt className="font-semibold">Name:</dt><dd>{formData.fullName}</dd></div>
            <div className="flex gap-1"><dt className="font-semibold">Company:</dt><dd>{formData.companyName}</dd></div>
            <div className="flex gap-1"><dt className="font-semibold">Email:</dt><dd>{formData.businessEmail}</dd></div>
            <div className="flex gap-1">
              <dt className="font-semibold">Service:</dt>
              <dd>{services.find((s) => s.slug === formData.serviceRequired)?.title ?? formData.serviceRequired}</dd>
            </div>
          </dl>
        </div>

        <div className="flex flex-col items-stretch justify-center gap-3 pt-2 sm:flex-row sm:items-center">
          <Button onClick={handleReset} variant="secondary" size="md">
            Submit Another Inquiry
          </Button>
          <Button href="/demo" variant="outline" size="md">
            Explore Live AI Receptionist
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="border-b border-line pb-5">
        <h2 className="text-h3 font-semibold">Project Inquiry Form</h2>
        <p className="mt-1 text-sm text-fg-muted">
          All fields marked with an asterisk (<span className="text-brand-300">*</span>) are required.
        </p>
      </div>

      {errorCount > 0 && (
        <div role="alert" className="flex items-start gap-2.5 rounded-card border border-danger/30 bg-danger/10 p-4 text-sm text-fg-soft">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-danger" aria-hidden="true" />
          <span>
            Please fix {errorCount} {errorCount === 1 ? "field" : "fields"} highlighted below.
          </span>
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Input
          name="fullName"
          label="Full Name"
          placeholder="e.g. Dr. Jordan Hayes"
          autoComplete="name"
          value={formData.fullName}
          onChange={(e) => update("fullName", e.target.value)}
          error={errors.fullName}
          required
        />
        <Input
          name="businessEmail"
          label="Business Email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="jordan@apexclinic.com"
          value={formData.businessEmail}
          onChange={(e) => update("businessEmail", e.target.value)}
          error={errors.businessEmail}
          required
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
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

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Select
          name="budgetRange"
          label="Estimated Budget Range"
          value={formData.budgetRange}
          onChange={(e) => update("budgetRange", e.target.value)}
        >
          {budgetOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </Select>
        <Select
          name="timeline"
          label="Desired Rollout Timeline"
          value={formData.timeline}
          onChange={(e) => update("timeline", e.target.value)}
        >
          {timelineOptions.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </Select>
      </div>

      <Textarea
        name="projectDescription"
        label="Project Details & Current Pain Points"
        placeholder="Describe your current phone/inquiry volume, software stack (e.g. Google Calendar, HubSpot, Dentrix), and what you want automated..."
        value={formData.projectDescription}
        onChange={(e) => update("projectDescription", e.target.value)}
        error={errors.projectDescription}
        rows={4}
        required
      />

      <div className="pt-2">
        <Button
          type="submit"
          size="lg"
          className="w-full"
          isLoading={isSubmitting}
          rightIcon={<Send className="h-4 w-4" aria-hidden="true" />}
        >
          {isSubmitting ? "Sending…" : "Submit Consultation Request"}
        </Button>
      </div>

      <p className="flex items-center justify-center gap-1.5 text-center text-sm text-fg-subtle">
        <ShieldCheck className="h-4 w-4 shrink-0 text-success" aria-hidden="true" />
        Your information is strictly protected under non-disclosure boundaries.
      </p>
    </form>
  );
}
