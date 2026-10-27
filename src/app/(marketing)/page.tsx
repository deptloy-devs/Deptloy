import type { Metadata } from "next";
import { Hero } from "@/components/marketing/Hero";
import { AssemblyTrack } from "@/components/marketing/AssemblyTrack";
import { Marquee } from "@/components/marketing/Marquee";
import { ServicesModule } from "@/components/marketing/ServicesModule";
import { SolutionsSection } from "@/components/marketing/SolutionsSection";
import { StoryTimeline } from "@/components/marketing/StoryTimeline";
import { WhyDeptloySection } from "@/components/marketing/WhyDeptloySection";
import { ProcessSection } from "@/components/marketing/ProcessSection";
import { AboutStudioSection } from "@/components/marketing/AboutStudioSection";
import { FaqSection } from "@/components/marketing/FaqSection";
import { FinalContactSection } from "@/components/marketing/FinalContactSection";

export const metadata: Metadata = {
  title: "Deptloy – Software built to outlast the hype",
  description:
    "Custom software, AI systems and connected digital products designed, built and maintained around your business.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <AssemblyTrack />
      <Marquee />
      <ServicesModule />
      <SolutionsSection />
      <StoryTimeline />
      <WhyDeptloySection />
      <ProcessSection />
      <AboutStudioSection />
      <FaqSection />
      <FinalContactSection />
    </>
  );
}
