"use client";

import * as React from "react";
import {
  Mail,
  Phone,
  Clock,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input, Textarea, Select } from "@/components/ui/Field";
import { Badge } from "@/components/ui/Badge";
import { brand, services } from "@/lib/site";
import type { ContactFormData, ContactFormErrors, ServiceSlug } from "@/types";

export default function ContactPage() {
  const [formData, setFormData] = React.useState<ContactFormData>({
    fullName: "",
    businessEmail: "",
    companyName: "",
    serviceRequired: "",
    projectDescription: "",
    budgetRange: "$2,500 - $5,000",
    timeline: "Within 2-4 weeks",
  });

  const [errors, setErrors] = React.useState<ContactFormErrors>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [submissionId, setSubmissionId] = React.useState("");

  const validate = (): boolean => {
    const newErrors: ContactFormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Please enter your full name";
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Name must be at least 2 characters";
    }

    if (!formData.businessEmail.trim()) {
      newErrors.businessEmail = "Business email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.businessEmail)) {
      newErrors.businessEmail = "Please enter a valid email address";
    }

    if (!formData.companyName.trim()) {
      newErrors.companyName = "Company or practice name is required";
    }

    if (!formData.serviceRequired) {
      newErrors.serviceRequired = "Please select the primary service needed";
    }

    if (!formData.projectDescription.trim()) {
      newErrors.projectDescription = "Please provide brief details about your inquiry";
    } else if (formData.projectDescription.trim().length < 10) {
      newErrors.projectDescription = "Please enter at least 10 characters describing your needs";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate realistic asynchronous validation and local storage logging
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setSubmissionId(`DEP-${Math.floor(100000 + Math.random() * 900000)}`);
    }, 1200);
  };

  const handleReset = () => {
    setFormData({
      fullName: "",
      businessEmail: "",
      companyName: "",
      serviceRequired: "",
      projectDescription: "",
      budgetRange: "$2,500 - $5,000",
      timeline: "Within 2-4 weeks",
    });
    setErrors({});
    setIsSubmitted(false);
  };

  return (
    <div className="flex flex-col">
      {/* Hero Header */}
      <section className="relative pt-16 pb-12 lg:pt-20 lg:pb-16 overflow-hidden">
        <div className="glow-brand" />
        <div className="glow-accent" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <Badge variant="violet" dot className="mb-4">
            Technical Consultation
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            Let&apos;s Build Your Custom AI Infrastructure
          </h1>
          <p className="text-lg text-fg-soft leading-relaxed">
            Tell us about your customer communication bottlenecks, appointment volume, and current software. Our technical team will review and outline a concrete deployment scope.
          </p>
        </div>
      </section>

      {/* Main Grid: Form + Direct Contact Information */}
      <section className="pb-24 bg-canvas">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Form Column */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl bg-card border border-line p-6 sm:p-10 shadow-2xl relative">
                
                {isSubmitted ? (
                  /* Honest Demonstration Confirmation Screen */
                  <div className="text-center py-8 space-y-6">
                    <div className="mx-auto h-16 w-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                      <CheckCircle2 className="h-8 w-8" />
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold text-white">
                        Inquiry Validated Successfully
                      </h3>
                      <p className="text-xs font-mono text-brand-400">
                        Reference Token: {submissionId}
                      </p>
                    </div>

                    {/* Honest Notice */}
                    <div className="p-4 rounded-2xl bg-raised border border-line text-xs text-fg-soft space-y-2 text-left max-w-md mx-auto">
                      <div className="flex items-center gap-2 text-amber-400 font-semibold">
                        <AlertCircle className="h-4 w-4" />
                        <span>Demonstration Mode Active</span>
                      </div>
                      <p className="text-fg-muted leading-relaxed">
                        Your submission payload has been successfully validated on the frontend and simulated locally. In production, this form triggers an automated lead intake webhook to our CRM.
                      </p>
                      <div className="pt-2 border-t border-line space-y-1 text-fg-soft">
                        <p><strong>Name:</strong> {formData.fullName}</p>
                        <p><strong>Company:</strong> {formData.companyName}</p>
                        <p><strong>Email:</strong> {formData.businessEmail}</p>
                        <p><strong>Service:</strong> {formData.serviceRequired}</p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                      <Button onClick={handleReset} variant="secondary" size="md">
                        Submit Another Inquiry
                      </Button>
                      <Button href="/demo" variant="glow" size="md">
                        Explore Live AI Receptionist
                      </Button>
                    </div>
                  </div>
                ) : (
                  /* Active Form */
                  <form onSubmit={handleSubmit} noValidate className="space-y-5">
                    <div className="pb-4 border-b border-line">
                      <h3 className="text-xl font-bold text-white">Project Inquiry Form</h3>
                      <p className="text-xs text-fg-muted mt-1">
                        All fields marked with an asterisk (<span className="text-brand-400">*</span>) are required.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        label="Full Name"
                        placeholder="e.g. Dr. Jordan Hayes"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        error={errors.fullName}
                        required
                      />

                      <Input
                        label="Business Email"
                        type="email"
                        placeholder="jordan@apexclinic.com"
                        value={formData.businessEmail}
                        onChange={(e) => setFormData({ ...formData, businessEmail: e.target.value })}
                        error={errors.businessEmail}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        label="Company or Practice Name"
                        placeholder="Apex Health Clinic"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        error={errors.companyName}
                        required
                      />

                      <Select
                        label="Primary Service Needed"
                        value={formData.serviceRequired}
                        onChange={(e) =>
                          setFormData({ ...formData, serviceRequired: e.target.value as ServiceSlug })
                        }
                        error={errors.serviceRequired}
                        required
                      >
                        <option value="" disabled className="bg-raised">
                          Select a solution...
                        </option>
                        {services.map((srv) => (
                          <option key={srv.slug} value={srv.slug} className="bg-raised">
                            {srv.title}
                          </option>
                        ))}
                      </Select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Select
                        label="Estimated Budget Range"
                        value={formData.budgetRange}
                        onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                      >
                        <option value="$1,500 - $3,000" className="bg-raised">$1,500 - $3,000 / month</option>
                        <option value="$3,000 - $6,000" className="bg-raised">$3,000 - $6,000 / month</option>
                        <option value="$6,000+" className="bg-raised">$6,000+ / custom enterprise</option>
                      </Select>

                      <Select
                        label="Desired Rollout Timeline"
                        value={formData.timeline}
                        onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                      >
                        <option value="Immediately (1-2 weeks)" className="bg-raised">Immediately (1-2 weeks)</option>
                        <option value="Within 3-4 weeks" className="bg-raised">Within 3-4 weeks</option>
                        <option value="Exploring for next quarter" className="bg-raised">Exploring for next quarter</option>
                      </Select>
                    </div>

                    <Textarea
                      label="Project Details & Current Pain Points"
                      placeholder="Describe your current phone/inquiry volume, software stack (e.g. Google Calendar, HubSpot, Dentrix), and what you want automated..."
                      value={formData.projectDescription}
                      onChange={(e) =>
                        setFormData({ ...formData, projectDescription: e.target.value })
                      }
                      error={errors.projectDescription}
                      rows={4}
                      required
                    />

                    <div className="pt-2">
                      <Button
                        type="submit"
                        variant="glow"
                        size="lg"
                        className="w-full font-semibold"
                        isLoading={isSubmitting}
                        rightIcon={<Send className="h-4 w-4" />}
                      >
                        Submit Consultation Request
                      </Button>
                    </div>

                    <div className="pt-2 text-center text-xs text-fg-subtle flex items-center justify-center gap-1.5">
                      <ShieldCheck className="h-4 w-4 text-emerald-400" />
                      <span>Your information is strictly protected under non-disclosure boundaries.</span>
                    </div>
                  </form>
                )}

              </div>
            </div>

            {/* Direct Contact Info & Office Column */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              
              {/* Direct Info Card */}
              <div className="rounded-3xl bg-card border border-line p-6 sm:p-8 space-y-6">
                <h3 className="text-xl font-bold text-white">Direct Communication</h3>
                <p className="text-sm text-fg-muted leading-relaxed">
                  Prefer a direct line or have immediate technical questions? Contact our solutions engineering team directly.
                </p>

                <div className="space-y-4 pt-2 border-t border-line text-sm">
                  <div className="flex items-start gap-3.5">
                    <div className="rounded-xl bg-raised p-2.5 border border-line text-brand-400 shrink-0">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-fg-muted block">
                        Solutions Email
                      </span>
                      <a href={`mailto:${brand.contactEmail}`} className="text-white hover:text-brand-300 font-medium">
                        {brand.contactEmail}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="rounded-xl bg-raised p-2.5 border border-line text-brand-400 shrink-0">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-fg-muted block">
                        Direct Phone
                      </span>
                      <span className="text-white font-medium">{brand.phone}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="rounded-xl bg-raised p-2.5 border border-line text-brand-400 shrink-0">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-fg-muted block">
                        Engineering Response Time
                      </span>
                      <span className="text-fg-soft">Monday - Friday • Sub-4 Hour Response</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Instant Scheduling Callout */}
              <div className="rounded-3xl bg-gradient-to-br from-brand-950/40 to-card border border-brand-500/20 p-6 text-center space-y-3">
                <Sparkles className="h-6 w-6 text-brand-400 mx-auto" />
                <h4 className="text-base font-bold text-white">Looking for Immediate Hands-On Testing?</h4>
                <p className="text-xs text-fg-soft max-w-sm mx-auto">
                  Try our interactive appointment booking prototype right in your browser without waiting for an email reply.
                </p>
                <div className="pt-2">
                  <Button href="/demo" variant="outline" size="sm" className="w-full">
                    Launch AI Demo Prototype
                  </Button>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
