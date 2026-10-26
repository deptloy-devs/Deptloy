import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

// Display / Headings — bold engineered geometric character
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700", "800", "900"],
});

// Primary Body text
const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

// Monospace — metrics, tags, badges, telemetry
const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
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
    icon: [
      { url: "/deptloy_icon.svg", type: "image/svg+xml" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
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
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0c0b28" },
    { media: "(prefers-color-scheme: light)", color: "#f4f3fb" },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${archivo.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){
              try {
                var stored = localStorage.getItem('deptloy-theme');
                var prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
                var theme = stored ? stored : (prefersLight ? 'light' : 'dark');
                document.documentElement.setAttribute('data-theme', theme);
                if (theme === 'light') {
                  document.documentElement.classList.add('light');
                  document.documentElement.classList.remove('dark');
                } else {
                  document.documentElement.classList.add('dark');
                  document.documentElement.classList.remove('light');
                }
              } catch(e){}
            })();`,
          }}
        />
      </head>
      <body className="min-h-full font-sans transition-colors duration-200">{children}</body>
    </html>
  );
}
