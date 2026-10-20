import {
  Zap,
  CheckCircle2,
  GitBranch,
  Database,
  Calendar,
  CreditCard,
  MessageSquare,
  Workflow,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FinalCta } from "@/components/marketing/FinalCta";

export function generateMetadata() {
  return {
    title: "Business Automation & Workflow Engineering",
    description: "Eliminate repetitive manual tasks. We map, connect, and automate business workflows between your tools, staff, and customers.",
    alternates: { canonical: "/services/automation" },
  };
}

export default function AutomationServicePage() {
  const integrationCategories = [
    {
      name: "CRMs & Pipelines",
      icon: <Database className="h-5 w-5 text-brand-400" />,
      tools: ["HubSpot", "Salesforce", "Pipedrive", "Close", "Zoho"],
      desc: "Auto-create deals, update contact stages, log call notes, and calculate deal scores.",
    },
    {
      name: "Calendars & Scheduling",
      icon: <Calendar className="h-5 w-5 text-brand-300" />,
      tools: ["Google Calendar", "Microsoft 365", "Calendly", "Acuity"],
      desc: "Check real-time multi-staff availability, insert buffer slots, and enforce booking rules.",
    },
    {
      name: "Communication & Messaging",
      icon: <MessageSquare className="h-5 w-5 text-success" />,
      tools: ["Twilio SMS", "Slack", "Microsoft Teams", "SendGrid", "WhatsApp"],
      desc: "Instant customer SMS confirmations, emergency staff alerts, and daily briefing digests.",
    },
    {
      name: "Payments & Invoicing",
      icon: <CreditCard className="h-5 w-5 text-brand-300" />,
      tools: ["Stripe", "QuickBooks", "Xero", "Square"],
      desc: "Automated deposit collection, receipt creation, invoice dispatch, and payment reminders.",
    },
  ];

  const automationUseCases = [
    {
      title: "Automated Intake to Invoice Sequence",
      desc: "When a customer submits a project inquiry, AI extracts specifications, generates an estimate in your billing tool, and creates an approval task for leadership.",
    },
    {
      title: "Cross-Platform Customer Sync",
      desc: "Ensure customer phone numbers, addresses, and interaction history stay synchronized across your phone system, CRM, and accounting software with zero human data entry.",
    },
    {
      title: "Smart Escalation & Triage Routing",
      desc: "Distinguish between routine appointment requests and urgent emergency calls, routing high-ticket opportunities directly to the on-call specialist's mobile device.",
    },
    {
      title: "Automated Review & Follow-up Generation",
      desc: "Automatically trigger post-service satisfaction surveys via SMS 2 hours after appointment completion, funneling happy clients directly to Google Reviews.",
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative pt-14 sm:pt-20 pb-section-sm overflow-hidden">
        <div className="glow-brand" />
        <div className="glow-accent" />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
            <Badge variant="brand" dot className="mb-4">
              Enterprise Workflow Engineering
            </Badge>

            <h1 className="text-h1 font-semibold mb-6">
              Workflows That Run Without Extra Headcount
            </h1>

            <p className="text-lg text-fg-soft leading-relaxed mb-8">
              Tired of copy-pasting customer details across spreadsheets, calendars, and CRMs? We build robust, custom automation pipelines that connect your fragmented business software on autopilot.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
              <Button href="/contact" variant="primary" size="lg" leftIcon={<Zap className="h-4 w-4" />}>
                Discuss Your Automation Project
              </Button>
              <Button href="/demo" variant="outline" size="lg">
                View Live System Demo
              </Button>
            </div>
          </div>

          {/* Interactive Workflow Visualizer */}
          <div className="mt-16 rounded-panel bg-card border border-line p-6 sm:p-10 shadow-raised">
            <div className="text-center max-w-xl mx-auto mb-10">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-400">
                Architecture Blueprint
              </span>
              <h2 className="text-xl font-bold text-fg mt-1">
                Real-Time Multi-Branch Operational Pipeline
              </h2>
            </div>

            {/* Workflow Step Nodes */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
              {/* Node 1 */}
              <div className="p-5 rounded-card bg-raised border border-line relative">
                <span className="text-xs font-mono text-brand-400 font-bold uppercase block mb-1">
                  Step 1 • Inbound Trigger
                </span>
                <h3 className="text-sm font-bold text-fg mb-1">Customer Call / Form</h3>
                <p className="text-xs text-fg-muted">
                  New appointment request arrives via phone or website.
                </p>
                <div className="mt-3 flex items-center gap-1.5 text-xs text-success">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Payload validated</span>
                </div>
              </div>

              {/* Node 2 */}
              <div className="p-5 rounded-card bg-raised border border-brand-500/30 relative shadow-[0_0_20px_rgba(139,92,246,0.1)]">
                <span className="text-xs font-mono text-brand-300 font-bold uppercase block mb-1">
                  Step 2 • AI Classification
                </span>
                <h3 className="text-sm font-bold text-fg mb-1">Intent & Entity Extraction</h3>
                <p className="text-xs text-fg-muted">
                  Model extracts customer name, service type, urgency, and budget.
                </p>
                <div className="mt-3 flex items-center gap-1.5 text-xs text-brand-300">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>AI Parsing: 120ms</span>
                </div>
              </div>

              {/* Node 3 */}
              <div className="p-5 rounded-card bg-raised border border-line relative">
                <span className="text-xs font-mono text-brand-300 font-bold uppercase block mb-1">
                  Step 3 • Conditional Logic
                </span>
                <h3 className="text-sm font-bold text-fg mb-1">Calendar & Rule Router</h3>
                <p className="text-xs text-fg-muted">
                  Checks staff calendars, locks 45-min window, enforces deposit.
                </p>
                <div className="mt-3 flex items-center gap-1.5 text-xs text-brand-300">
                  <GitBranch className="h-3.5 w-3.5" />
                  <span>Rules evaluated</span>
                </div>
              </div>

              {/* Node 4 */}
              <div className="p-5 rounded-card bg-raised border border-line relative">
                <span className="text-xs font-mono text-success font-bold uppercase block mb-1">
                  Step 4 • Multi-Tool Sync
                </span>
                <h3 className="text-sm font-bold text-fg mb-1">CRM + SMS + Accounting</h3>
                <p className="text-xs text-fg-muted">
                  HubSpot deal created, Twilio SMS dispatched, Stripe invoice held.
                </p>
                <div className="mt-3 flex items-center gap-1.5 text-xs text-success">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Synced across 3 APIs</span>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center text-xs text-fg-subtle">
              Zero human intervention required. Fully audited with retry logs and alert fallbacks.
            </div>
          </div>
        </div>
      </section>

      {/* Integration Categories */}
      <section className="py-20 bg-surface border-t border-line">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Ecosystem Compatibility"
            title="Integrations Across Your Complete Business Stack"
            description="We connect with hundreds of enterprise and modern cloud APIs securely."
            align="center"
            className="mb-14"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {integrationCategories.map((cat, idx) => (
              <div key={idx} className="rounded-card bg-card border border-line p-6 flex flex-col justify-between">
                <div>
                  <div className="rounded-control bg-raised p-3 w-fit border border-line mb-4">
                    {cat.icon}
                  </div>
                  <h3 className="text-base font-bold text-fg mb-2">{cat.name}</h3>
                  <p className="text-xs text-fg-muted leading-relaxed mb-4">{cat.desc}</p>
                </div>
                <div className="pt-4 border-t border-line flex flex-wrap gap-1.5">
                  {cat.tools.map((tool, tIdx) => (
                    <span key={tIdx} className="text-xs px-2 py-0.5 rounded bg-white/5 text-fg-soft">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Use Cases */}
      <section className="py-20 bg-canvas border-t border-line">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="High-Impact Scenarios"
            title="Common High-Friction Workflows We Automate"
            align="center"
            className="mb-14"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {automationUseCases.map((uc, idx) => (
              <div key={idx} className="p-6 rounded-card bg-card border border-line">
                <h3 className="text-lg font-bold text-fg mb-2 flex items-center gap-2">
                  <Workflow className="h-5 w-5 text-brand-400" />
                  {uc.title}
                </h3>
                <p className="text-sm text-fg-muted leading-relaxed">{uc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <FinalCta />
    </div>
  );
}
