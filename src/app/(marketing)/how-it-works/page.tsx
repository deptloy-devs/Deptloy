import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Layers3, Rocket, ShieldCheck } from "lucide-react";
import { ArchitectureStage } from "@/components/marketing/ArchitectureStage";

export const metadata: Metadata = {
  title: "How We Build Custom Software | Deptloy",
  description: "From discovery and architecture to engineering, launch and long-term care. See how Deptloy turns business challenges into connected software products.",
  alternates: { canonical: "/how-it-works" },
};

const exampleModules = [
  { name: "Customer experience", detail: "The portals and applications people actually use." },
  { name: "Business logic", detail: "Your rules, approvals and operational workflows." },
  { name: "Data & integrations", detail: "A consistent data layer connected to the systems you need." },
  { name: "AI & automation", detail: "Intelligence applied where it adds practical value." },
];

const steps = [
  {
    n: "01", label: "Discover", tag: "Understand the real problem",
    title: "First, we learn how your business works.",
    body: "We map who uses the software, the decisions they make, where information moves and which bottlenecks matter most.",
    output: "A clear problem statement and prioritized goals",
  },
  {
    n: "02", label: "Architect", tag: "Shape the right product",
    title: "Then we design the system around the work.",
    body: "We define features, user journeys, data models, integration boundaries and a delivery plan that fits your situation.",
    output: "Product blueprint, scope and milestones",
  },
  {
    n: "03", label: "Engineer", tag: "Make the pieces work together",
    title: "We build and validate the complete experience.",
    body: "Frontend, backend, APIs and any useful AI capabilities are developed as parts of one coherent product, then tested against real scenarios.",
    output: "A working product with tested workflows",
  },
  {
    n: "04", label: "Launch", tag: "Move into everyday use",
    title: "We prepare the people as well as the platform.",
    body: "We plan deployment, data migration where needed, operational handover and the feedback loop after launch.",
    output: "A live system and a practical handover",
  },
  {
    n: "05", label: "Evolve", tag: "Keep improving",
    title: "Your software grows with your business.",
    body: "We can continue supporting integrations, performance, reliability and new features as priorities change.",
    output: "A roadmap for ongoing improvement",
  },
];

const principles = [
  { icon: Layers3, title: "Expertise, not a menu", text: "We choose the capabilities a product requires instead of selling a predefined bundle of services." },
  { icon: ShieldCheck, title: "Built for real use", text: "Security, maintainability and clear interfaces are part of the engineering conversation from day one." },
  { icon: Rocket, title: "Designed to evolve", text: "We aim for useful first releases and an architecture that can adapt as the product grows." },
];

export default function HowItWorksPage() {
  return (
    <div className="py-24 sm:py-32">
      <div className="wrap">
        <span className="k">How Deptloy works</span>
        <div className="grid lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8">
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[var(--deep)] leading-tight mt-3">
              Your challenge is the starting point. Not a list of services.
            </h1>
          </div>
          <p className="lg:col-span-4 text-base text-[var(--mute)] leading-relaxed">
            We bring software engineering, product design, data systems and AI expertise together to create whatever your business actually needs.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 mt-9 mb-16">
          <Link href="/contact" className="btn">Discuss your project <ArrowRight size={16}/></Link>
          <Link href="/projects" className="btn ghost">Explore blueprints</Link>
        </div>

        <ArchitectureStage modules={exampleModules} title="Your custom product" eyebrow="CAPABILITIES WORKING TOGETHER" />
        <p className="text-sm text-[var(--mute)] mt-4 max-w-2xl">
          Select any module to explore its role. This is an illustrative architecture, not a fixed package. Your system might use all, some or entirely different capabilities.
        </p>

        <section className="mt-24" id="process">
          <span className="k">From idea to everyday use</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[var(--deep)] max-w-3xl mt-3">
            Five clear stages. One engineering partner.
          </h2>
          <div className="mt-11 space-y-4">
            {steps.map((step) => (
              <article key={step.n} className="group bg-white border border-[var(--peri)] p-6 sm:p-8 grid md:grid-cols-12 gap-4 md:gap-8 items-start transition-transform duration-300 hover:-translate-y-0.5">
                <div className="md:col-span-2 flex md:flex-col items-center md:items-start gap-3">
                  <span className="font-mono text-3xl font-bold text-[var(--or)]">{step.n}</span>
                  <span className="font-mono uppercase text-xs font-bold text-[var(--pur)] tracking-wider">{step.label}</span>
                </div>
                <div className="md:col-span-6">
                  <span className="text-xs uppercase font-mono tracking-wider text-[var(--mute)]">{step.tag}</span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[var(--deep)] leading-tight mt-2 mb-3">{step.title}</h3>
                  <p className="text-sm sm:text-base text-[var(--mute)] leading-relaxed">{step.body}</p>
                </div>
                <div className="md:col-span-4 md:border-l md:border-[var(--peri)] md:pl-7">
                  <span className="text-xs font-mono uppercase text-[var(--pur)] font-bold">What comes out of it</span>
                  <p className="mt-3 text-sm font-semibold text-[var(--deep)] flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[var(--pur)] shrink-0" />{step.output}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-24">
          <span className="k">Why this approach</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[var(--deep)] mt-3 mb-10">Systems, not disconnected tools.</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {principles.map((principle) => {
              const Icon = principle.icon;
              return (
                <div key={principle.title} className="bg-[var(--mist)] border border-[var(--peri)] p-7">
                  <Icon className="w-8 h-8 text-[var(--pur)] mb-7" />
                  <h3 className="text-xl font-extrabold text-[var(--deep)] mb-3">{principle.title}</h3>
                  <p className="text-sm text-[var(--mute)] leading-relaxed">{principle.text}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mt-24 bg-[var(--deep)] text-white p-8 sm:p-12 flex flex-wrap gap-8 items-end justify-between">
          <div className="max-w-2xl">
            <span className="text-xs font-mono text-[var(--peri)] uppercase tracking-wider">Understand the challenge</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold mt-3">You bring the problem. We help define the product.</h2>
          </div>
          <Link href="/contact" className="btn" style={{ background: "var(--or)", color: "var(--deep)" }}>
            Start a conversation <ArrowRight size={16}/>
          </Link>
        </section>
      </div>
    </div>
  );
}
