import type { Metadata } from "next";
import { Hero } from "@/components/marketing/Hero";
import { WhyDeptloySection } from "@/components/marketing/WhyDeptloySection";
import { AssemblyTrack } from "@/components/marketing/AssemblyTrack";
import { ExpertiseSection } from "@/components/marketing/ExpertiseSection";
import { FeaturedProjectsSection } from "@/components/marketing/FeaturedProjectsSection";
import { ShortProcessSection } from "@/components/marketing/ShortProcessSection";
import { SimpleFinalCta } from "@/components/marketing/SimpleFinalCta";

export const metadata: Metadata = {
  title: "Deptloy – Software built to outlast the hype",
  description:
    "From intelligent AI receptionists to complete custom software platforms, Deptloy designs, builds and maintains software tailored to how your business actually operates.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      {/* 1. Hero with animated Dep */}
      <Hero />

      {/* 2. Animated Connected System (AssemblyTrack) */}
      <AssemblyTrack />

      {/* 3. Why Custom Software (Comparison) */}
      <WhyDeptloySection />

      {/* 4. Engineering Capabilities */}
      <ExpertiseSection />

      {/* 5. Featured Projects */}
      <FeaturedProjectsSection />

      {/* 6. Three-Step Process */}
      <ShortProcessSection />

      {/* 7. Final Contact CTA */}
      <SimpleFinalCta />
    </>
  );
}
