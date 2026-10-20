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
  };
}

export default function AutomationServicePage() {
  const integrationCategories = [
    {
      name: "CRMs & Pipelines",
      icon: <Database className="h-5 w-5 text-purple-400" />,
      tools: ["HubSpot", "Salesforce", "Pipedrive", "Close", "Zoho"],
      desc: "Auto-create deals, update contact stages, log call notes, and calculate deal scores.",
    },
    {
      name: "Calendars & Scheduling",
      icon: <Calendar className="h-5 w-5 text-blue-400" />,
      tools: ["Google Calendar", "Microsoft 365", "Calendly", "Acuity"],
      desc: "Check real-time multi-staff availability, insert buffer slots, and enforce booking rules.",
    },
    {
      name: "Communication & Messaging",
      icon: <MessageSquare className="h-5 w-5 text-emerald-400" />,
      tools: ["Twilio SMS", "Slack", "Microsoft Teams", "SendGrid", "WhatsApp"],
      desc: "Instant customer SMS confirmations, emergency staff alerts, and daily briefing digests.",
    },
    {
      name: "Payments & Invoicing",
      icon: <CreditCard className="h-5 w-5 text-amber-400" />,
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
      <section className="relative pt-16 pb-20 lg:pt-24 lg:pb-28 overflow-hidden">
        <div className="glow-brand" />
        <div className="glow-accent" />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
            <Badge variant="violet" dot className="mb-4">
              Enterprise Workflow Engineering
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              Workflows That Run Without Extra Headcount
            </h1>

            <p className="text-lg text-slate-300 leading-relaxed mb-8">
              Tired of copy-pasting customer details across spreadsheets, calendars, and CRMs? We build robust, custom automation pipelines that connect your fragmented business software on autopilot.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Button href="/contact" variant="glow" size="lg" leftIcon={<Zap className="h-4 w-4" />}>
                Discuss Your Automation Project
              </Button>
              <Button href="/demo" variant="outline" size="lg">
                View Live System Demo
              </Button>
            </div>
          </div>

          {/* Interactive Workflow Visualizer */}
          <div className="mt-16 rounded-3xl bg-[#101522] border border-white/10 p-6 sm:p-10 shadow-2xl">
            <div className="text-center max-w-xl mx-auto mb-10">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
                Architecture Blueprint
              </span>
              <h3 className="text-xl font-bold text-white mt-1">
                Real-Time Multi-Branch Operational Pipeline
              </h3>
            </div>

            {/* Workflow Step Nodes */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
              {/* Node 1 */}
              <div className="p-5 rounded-2xl bg-[#111827] border border-white/10 relative">
                <span className="text-[10px] font-mono text-purple-400 font-bold uppercase block mb-1">
                  Step 1 • Inbound Trigger
                </span>
                <h4 className="text-sm font-bold text-white mb-1">Customer Call / Form</h4>
                <p className="text-xs text-slate-400">
                  New appointment request arrives via phone or website.
                </p>
                <div className="mt-3 flex items-center gap-1.5 text-[11px] text-emerald-400">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Payload validated</span>
                </div>
              </div>

              {/* Node 2 */}
              <div className="p-5 rounded-2xl bg-[#111827] border border-purple-500/30 relative shadow-[0_0_20px_rgba(139,92,246,0.1)]">
                <span className="text-[10px] font-mono text-purple-300 font-bold uppercase block mb-1">
                  Step 2 • AI Classification
                </span>
                <h4 className="text-sm font-bold text-white mb-1">Intent & Entity Extraction</h4>
                <p className="text-xs text-slate-400">
                  Model extracts customer name, service type, urgency, and budget.
                </p>
                <div className="mt-3 flex items-center gap-1.5 text-[11px] text-purple-300">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>AI Parsing: 120ms</span>
                </div>
              </div>

              {/* Node 3 */}
              <div className="p-5 rounded-2xl bg-[#111827] border border-white/10 relative">
                <span className="text-[10px] font-mono text-blue-400 font-bold uppercase block mb-1">
                  Step 3 • Conditional Logic
                </span>
                <h4 className="text-sm font-bold text-white mb-1">Calendar & Rule Router</h4>
                <p className="text-xs text-slate-400">
                  Checks staff calendars, locks 45-min window, enforces deposit.
                </p>
                <div className="mt-3 flex items-center gap-1.5 text-[11px] text-blue-400">
                  <GitBranch className="h-3.5 w-3.5" />
                  <span>Rules evaluated</span>
                </div>
              </div>

              {/* Node 4 */}
              <div className="p-5 rounded-2xl bg-[#111827] border border-white/10 relative">
                <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase block mb-1">
                  Step 4 • Multi-Tool Sync
                </span>
                <h4 className="text-sm font-bold text-white mb-1">CRM + SMS + Accounting</h4>
                <p className="text-xs text-slate-400">
                  HubSpot deal created, Twilio SMS dispatched, Stripe invoice held.
                </p>
                <div className="mt-3 flex items-center gap-1.5 text-[11px] text-emerald-400">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Synced across 3 APIs</span>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center text-xs text-slate-500">
              Zero human intervention required. Fully audited with retry logs and alert fallbacks.
            </div>
          </div>
        </div>
      </section>

      {/* Integration Categories */}
      <section className="py-20 bg-[#090D18] border-t border-white/[0.06]">
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
              <div key={idx} className="rounded-2xl bg-[#101522] border border-white/10 p-6 flex flex-col justify-between">
                <div>
                  <div className="rounded-xl bg-[#111827] p-3 w-fit border border-white/10 mb-4">
                    {cat.icon}
                  </div>
                  <h4 className="text-base font-bold text-white mb-2">{cat.name}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">{cat.desc}</p>
                </div>
                <div className="pt-4 border-t border-white/[0.08] flex flex-wrap gap-1.5">
                  {cat.tools.map((tool, tIdx) => (
                    <span key={tIdx} className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-slate-300">
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
      <section className="py-20 bg-[#080B14] border-t border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="High-Impact Scenarios"
            title="Common High-Friction Workflows We Automate"
            align="center"
            className="mb-14"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {automationUseCases.map((uc, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-[#101522] border border-white/10">
                <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                  <Workflow className="h-5 w-5 text-purple-400" />
                  {uc.title}
                </h4>
                <p className="text-sm text-slate-400 leading-relaxed">{uc.desc}</p>
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
