import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { ArchitectureStage } from "@/components/marketing/ArchitectureStage";
import { projectBlueprints } from "@/lib/project-blueprints";

interface PageProps { params: Promise<{ slug: string }> }

export const instant = false;

export function generateStaticParams() {
  return projectBlueprints.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const blueprint = projectBlueprints.find((item) => item.slug === slug);
  return {
    title: blueprint ? `${blueprint.title} | Solution Blueprint | Deptloy` : "Solution blueprint | Deptloy",
    description: blueprint?.solution,
    alternates: { canonical: `/projects/${slug}` },
  };
}

export default async function BlueprintPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projectBlueprints.find((item) => item.slug === slug);
  if (!project) notFound();

  return (
    <div className="py-24 sm:py-32">
      <div className="wrap">
        <Link href="/projects" className="inline-flex items-center gap-2 text-xs font-mono uppercase font-bold text-[var(--pur)] hover:text-[var(--deep)] mb-10">
          <ArrowLeft size={14} /> All blueprints
        </Link>
        <span className="k">{project.categoryLabel} / Engineering concept</span>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-[var(--deep)] leading-tight max-w-5xl">{project.title}</h1>
        <p className="lead2 max-w-3xl">{project.solution}</p>
        <div className="mt-7 mb-12 bg-white border-l-4 border-[var(--or)] p-4 text-sm text-[var(--mute)]">
          Illustrative solution blueprint. This is not a completed client case study, product demo, or statement of measured outcomes.
        </div>
        <ArchitectureStage modules={project.modules} title="One connected product" accent={project.accent} eyebrow="INTERACTIVE ARCHITECTURE" />
        <div className="grid md:grid-cols-2 gap-10 lg:gap-20 mt-20">
          <section>
            <span className="k">The problem to solve</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--deep)] mt-2 mb-5">Software should follow the work.</h2>
            <p className="text-[var(--mute)] leading-relaxed">{project.challenge}</p>
          </section>
          <section>
            <span className="k">The connected approach</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--deep)] mt-2 mb-5">One product. Clear handoffs.</h2>
            <p className="text-[var(--mute)] leading-relaxed">{project.solution}</p>
          </section>
        </div>
        <section className="mt-20">
          <span className="k">A possible workflow</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--deep)] mt-2 mb-8">From first action to finished outcome.</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {project.journey.map((step, index) => (
              <div key={step} className="bg-white border border-[var(--peri)] p-6">
                <span className="font-mono text-[var(--or)] font-bold text-lg">0{index + 1}</span>
                <h3 className="text-lg font-bold mt-7 text-[var(--deep)] leading-snug">{step}</h3>
              </div>
            ))}
          </div>
        </section>
        <section className="mt-20 grid lg:grid-cols-2 gap-10 items-center bg-[var(--mist)] p-8 sm:p-12">
          <div>
            <span className="k">Designed outcomes</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--deep)] mt-2">What this product would aim to improve.</h2>
          </div>
          <ul className="space-y-4">
            {project.possibilities.map((outcome) => (
              <li key={outcome} className="flex items-start gap-3 text-[var(--deep)] font-semibold">
                <CheckCircle2 className="w-5 h-5 shrink-0 text-[var(--pur)]" /> {outcome}
              </li>
            ))}
          </ul>
        </section>
        <div className="mt-16 flex flex-wrap justify-between items-center gap-6">
          <div><span className="k">Build something different</span><h2 className="text-3xl font-extrabold mt-2">Let&apos;s map your idea.</h2></div>
          <Link href="/contact" className="btn">Start a conversation <ArrowRight size={16}/></Link>
        </div>
      </div>
    </div>
  );
}
