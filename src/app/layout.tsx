import type { Metadata, Viewport } from "next";
import { Geist, Outfit } from "next/font/google";
import "./globals.css";

// Body text
const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

// Headings — geometric, close to the logo wordmark
const outfit = Outfit({
  variable: "--font-outfit",
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
  // favicon.ico, apple-icon.png, opengraph-image.png and twitter-image.png live in
  // src/app and are picked up automatically; the SVG is the sharp version for modern browsers.
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    // Declared explicitly: setting `icons` here stops Next from auto-linking app/apple-icon.png.
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: "Deptloy — Premium AI Automation Agency",
    description: "Let AI Handle the Busywork. You Build the Business.",
    url: "https://deptloy.com",
    siteName: "Deptloy",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Deptloy — Premium AI Automation Agency",
    description: "Let AI Handle the Busywork. You Build the Business.",
  },
};

export const viewport: Viewport = {
  themeColor: "#070a12",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${geist.variable} ${outfit.variable} h-full dark`}>
      <body className="min-h-full font-sans">{children}</body>
    </html>
  );
}
