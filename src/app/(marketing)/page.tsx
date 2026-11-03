import type { Metadata } from "next";
import { Hero } from "@/components/marketing/Hero";
import { AssemblyTrack } from "@/components/marketing/AssemblyTrack";
import { Marquee } from "@/components/marketing/Marquee";
import { FeaturedSolutions } from "@/components/marketing/FeaturedSolutions";
import { SimpleFinalCta } from "@/components/marketing/SimpleFinalCta";

export const metadata: Metadata = {
  title: "Deptloy | Custom Software & AI Receptionists",
  description:
    "Deptloy builds custom software, AI receptionists, CRM systems, and intelligent business automation tailored to the way your company works.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      {/* 1. Hero with animated Dep */}
      <Hero />

      {/* 2. Animated Connected System */}
      <AssemblyTrack />

      {/* 3. Capabilities & Services Ticker */}
      <Marquee />

      {/* 4. Featured Solutions (Interactive miniature application previews) */}
      <FeaturedSolutions />

      {/* 5. Final Contact CTA */}
      <SimpleFinalCta />
    </>
  );
}
