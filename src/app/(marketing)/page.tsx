import type { Metadata } from "next";
import { Hero } from "@/components/marketing/Hero";
import { AssemblyTrack } from "@/components/marketing/AssemblyTrack";
import { WhyDeptloySection } from "@/components/marketing/WhyDeptloySection";
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

      {/* 2. Animated Connected System */}
      <AssemblyTrack />

      {/* 3. Why Custom Software (Compact comparison with comfortable spacing) */}
      <WhyDeptloySection />

      {/* 4. Final Contact CTA */}
      <SimpleFinalCta />
    </>
  );
}
