import * as React from "react";
import { Footer } from "@/components/marketing/Footer";
import { Navbar } from "@/components/marketing/Navbar";
import { ScrollProgress } from "@/components/marketing/ScrollProgress";
import { InteractiveCursor } from "@/components/ui/InteractiveCursor";
import { DepChatProvider } from "@/components/marketing/DepChat";
import { CookieConsentProvider } from "@/components/marketing/CookieConsent";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <CookieConsentProvider>
      <DepChatProvider>
        <ScrollProgress />
        <InteractiveCursor />
        <Navbar />
        <main id="top">{children}</main>
        <Footer />
      </DepChatProvider>
    </CookieConsentProvider>
  );
}
