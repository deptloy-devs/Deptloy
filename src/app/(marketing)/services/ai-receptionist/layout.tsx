import type { Metadata } from "next";

// The page itself is a client component, so its metadata lives here.
export const metadata: Metadata = {
  title: "AI Receptionist — 24/7 Call Answering & Booking",
  description:
    "A branded, 24/7 AI voice and chat receptionist that answers calls, books appointments into your calendar, handles FAQs and qualifies leads instantly.",
  alternates: { canonical: "/services/ai-receptionist" },
};

export default function AiReceptionistLayout({ children }: { children: React.ReactNode }) {
  return children;
}
