import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import "./design.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

const ibmSans = IBM_Plex_Sans({
  variable: "--font-ibm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const ibmMono = IBM_Plex_Mono({
  variable: "--font-ibm-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://deptloy.com"),
  title: "Deptloy – Software built to outlast the hype",
  description:
    "We combine AI, CRM, automation and custom apps into one system built around your business, then maintain it so it keeps working for years.",
  keywords: [
    "AI receptionist",
    "business automation",
    "AI agency",
    "CRM automation",
    "appointment booking AI",
    "custom software development",
    "workflow automation",
  ],
  authors: [{ name: "Deptloy" }],
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
  openGraph: {
    title: "Deptloy – Software built to outlast the hype",
    description:
      "We combine AI, CRM, automation and custom apps into one system built around your business, then maintain it so it keeps working for years.",
    url: "https://deptloy.com",
    siteName: "Deptloy",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Deptloy – Software built to outlast the hype",
    description:
      "We combine AI, CRM, automation and custom apps into one system built around your business, then maintain it so it keeps working for years.",
  },
};

export const viewport: Viewport = {
  themeColor: "#f4f3fb",
  colorScheme: "light",
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${ibmSans.variable} ${ibmMono.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@75..125,500..900&family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {/* Global SVG Symbol & Gradient Definitions */}
        <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
          <defs>
            <linearGradient id="lgr" x1="0" x2="1">
              <stop offset="0" stopColor="#8478e0" />
              <stop offset="1" stopColor="#fd9150" />
            </linearGradient>
            <linearGradient id="hd" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#fff" />
              <stop offset="1" stopColor="#d5cffa" />
            </linearGradient>
            <linearGradient id="bd" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#8478e0" />
              <stop offset="1" stopColor="#5750a8" />
            </linearGradient>
            <symbol id="mk" viewBox="-140 -160 280 320">
              <polygon points="0,-150 130,-75 0,0 -130,-75" fill="#8478e0" />
              <polygon points="-130,-75 0,0 0,150 -130,75" fill="#15134a" />
              <polygon points="0,0 130,-75 130,0 0,75" fill="#5750a8" />
              <polygon points="0,75 130,0 130,75 0,150" fill="#ef7a5e" />
              <polygon points="-84,-44 0,-92 84,-44 84,38 4,86 -84,36" fill="#f7f5ff" />
              <polygon points="-48,-8 0,-36 46,-8 46,26 -48,28" fill="#15134a" />
              <polygon points="0,-6 36,28 16,28 16,106 -16,106 -16,28 -36,28" fill="#fd9150" />
            </symbol>
          </defs>
        </svg>

        {children}
      </body>
    </html>
  );
}
