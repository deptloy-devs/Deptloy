import {
  BarChart3,
  GitBranch,
  CheckCircle2,
  PhoneCall,
  Sparkles,
  PieChart,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FinalCta } from "@/components/marketing/FinalCta";

export function generateMetadata() {
  return {
    title: "Tailored CRM Architectures & Lead Pipelines",
    description: "Organize every lead, automate sales follow-ups, and track your revenue pipeline with custom CRM implementations engineered around your business.",
  };
}

export default function CrmServicePage() {
  const pipelineStages = [
    {
      stage: "Stage 1",
      title: "New Inbound Lead",
      count: "18 Active",
      value: "$14,200",
      color: "border-brand-500/30 text-brand-400",
      items: ["Dr. Sarah Mitchell", "Apex Design Studio", "Elena Rostova"],
    },
    {
      stage: "Stage 2",
      title: "AI Qualified & Verified",
      count: "12 In Scope",
      value: "$28,400",
      color: "border-blue-500/30 text-blue-400",
      items: ["Highland Dental", "Summit Advisory", "Luxe Aesthetics"],
    },
    {
      stage: "Stage 3",
      title: "Consultation Booked",
      count: "7 Scheduled",
      value: "$34,000",
      color: "border-cyan-500/30 text-cyan-400",
      items: ["Pacific Brokerage", "Marcus Vance", "Beacon Legal Group"],
    },
    {
      stage: "Stage 4",
      title: "Closed / Onboarded",
      count: "14 This Month",
      value: "$62,500",
      color: "border-emerald-500/30 text-emerald-400",
      items: ["Cascade Family Clinic", "Rivera Hair Spa", "Nova Capital"],
    },
  ];

  const crmFeatures = [
    {
      title: "Complete Interaction Timeline",
      desc: "Every AI receptionist phone call, website booking, SMS reminder, and email interaction is automatically logged into the customer's permanent record.",
      icon: <PhoneCall className="h-5 w-5 text-brand-400" />,
    },
    {
      title: "Automated Lead Scoring",
      desc: "Custom algorithms evaluate prospect budget, urgency, and timeline, immediately highlighting high-value commercial accounts for executive review.",
      icon: <Sparkles className="h-5 w-5 text-blue-400" />,
    },
    {
      title: "Smart Follow-Up Cadences",
      desc: "Never let warm leads drop off. Automated SMS and email drip campaigns re-engage prospects who didn't finalize their initial booking slot.",
      icon: <GitBranch className="h-5 w-5 text-emerald-400" />,
    },
    {
      title: "Executive Revenue Dashboards",
      desc: "Actionable real-time reporting on appointment conversion rates, staff utilization, customer acquisition cost, and revenue forecast.",
      icon: <PieChart className="h-5 w-5 text-amber-400" />,
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
            <Badge variant="brand" dot className="mb-4">
              Revenue & Pipeline Infrastructure
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              A Cleaner Picture of Every Customer Relationship
            </h1>

            <p className="text-lg text-fg-soft leading-relaxed mb-8">
              Generic CRMs are bloated and cluttered with fields your team never uses. Deptloy designs streamlined, purpose-built CRM architectures with automated lead capture, contact timelines, and automated follow-ups.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Button href="/contact" variant="glow" size="lg" leftIcon={<BarChart3 className="h-4 w-4" />}>
                Request a CRM Consultation
              </Button>
              <Button href="/dashboard" variant="outline" size="lg">
                Preview Client Dashboard UI
              </Button>
            </div>
          </div>

          {/* Lead Pipeline Visualizer Card */}
          <div className="mt-16 rounded-3xl bg-card border border-line p-6 sm:p-10 shadow-2xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-line gap-4 mb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-400">
                  Interactive Pipeline Stage Simulation
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  Active Deal Flow & Automated Routing
                </h3>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="accent" size="sm">
                  Live Syncing
                </Badge>
                <span className="text-xs text-fg-muted font-mono">Total Pipeline: $139,100</span>
              </div>
            </div>

            {/* Pipeline Stage Columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {pipelineStages.map((stage, idx) => (
                <div key={idx} className={`rounded-2xl bg-raised border ${stage.color} p-4 flex flex-col justify-between`}>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono uppercase text-fg-muted">{stage.stage}</span>
                      <span className="text-xs font-bold text-white font-mono">{stage.value}</span>
                    </div>
                    <h4 className="text-sm font-bold text-white mb-1">{stage.title}</h4>
                    <span className="text-[11px] text-fg-muted block mb-4">{stage.count}</span>

                    <div className="space-y-2">
                      {stage.items.map((item, iIdx) => (
                        <div key={iIdx} className="p-2.5 rounded-xl bg-black/40 border border-line text-xs text-fg-soft">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 mt-4 border-t border-line flex items-center justify-between text-[11px] text-fg-muted">
                    <span>Automated Trigger</span>
                    <span className="text-brand-400 font-medium">Active</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* CRM Features */}
      <section className="py-20 bg-surface border-t border-line">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Core Architecture"
            title="Engineered Around How Your Team Actually Works"
            align="center"
            className="mb-14"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {crmFeatures.map((feat, idx) => (
              <div key={idx} className="p-7 rounded-2xl bg-card border border-line flex flex-col justify-between">
                <div>
                  <div className="rounded-xl bg-raised p-3 w-fit border border-line mb-4">
                    {feat.icon}
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">{feat.title}</h4>
                  <p className="text-sm text-fg-muted leading-relaxed">{feat.desc}</p>
                </div>
                <div className="pt-4 mt-4 border-t border-line flex items-center gap-2 text-xs text-emerald-400 font-medium">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Fully configured & tested prior to rollout</span>
                </div>
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
