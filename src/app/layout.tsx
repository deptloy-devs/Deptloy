import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://deptloy.com"),
  title: {
    default: "Deptloy — AI-Powered Business Solutions Agency",
    template: "%s | Deptloy AI",
  },
  description:
    "Deptloy helps businesses automate customer interactions, manage appointments, streamline operations, improve CRM workflows, and build custom digital products.",
  keywords: [
    "AI receptionist",
    "business automation",
    "AI agency",
    "CRM automation",
    "appointment booking AI",
    "custom software development",
    "workflow automation",
  ],
  authors: [{ name: "Deptloy AI Solutions" }],
  icons: {
    icon: "/favicon.svg",
    apple: "/logo.jpg",
  },
  openGraph: {
    title: "Deptloy — Premium AI Automation Agency",
    description: "Let AI Handle the Busywork. You Build the Business.",
    url: "https://deptloy.com",
    siteName: "Deptloy",
    images: [
      {
        url: "/logo.jpg",
        width: 640,
        height: 640,
        alt: "Deptloy AI Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geist.variable} h-full antialiased dark`}>
      <body className="min-h-full bg-[#080B14] font-sans text-[#F8FAFC] selection:bg-[#8B5CF6]/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
