import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Let's Connect | Deptloy",
  description:
    "Reach Deptloy's engineering team directly. Inquire about custom software platforms, workflow automations, and intelligent voice AI systems.",
  alternates: { canonical: "/contact" },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
