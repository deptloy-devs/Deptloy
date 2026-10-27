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
      {/* 1. Hero with animated Dep & clear flagship + custom CTAs */}
      <Hero />

      {/* 2. Why companies outgrow generic tools */}
      <WhyDeptloySection />

      {/* 3. Interactive system assembly: Different capabilities. One connected product. */}
      <AssemblyTrack />

      {/* 4. Four concise capability areas */}
      <ExpertiseSection />

      {/* 5. Two featured solution blueprints */}
      <FeaturedProjectsSection />

      {/* 6. Simplified 3-stage delivery process */}
      <ShortProcessSection />

      {/* 7. Visually striking final CTA */}
      <SimpleFinalCta />
    </>
  );
}
