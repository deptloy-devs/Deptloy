import type { Metadata } from "next";

// The demo page is a client component, so its metadata lives here.
export const metadata: Metadata = {
  title: "Live AI Receptionist Demo",
  description:
    "Try Deptloy's AI receptionist in your browser: pick an industry, ask questions and book a sample appointment. No sign-up needed.",
  alternates: { canonical: "/demo" },
};

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
