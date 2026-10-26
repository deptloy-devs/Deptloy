import * as React from "react";
import { Footer } from "@/components/marketing/Footer";
import { Navbar } from "@/components/marketing/Navbar";
import { ScrollProgress } from "@/components/marketing/ScrollProgress";
import { InteractiveCursor } from "@/components/ui/InteractiveCursor";
import { DepChatProvider } from "@/components/marketing/DepChat";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <DepChatProvider>
      <ScrollProgress />
      <InteractiveCursor />
      <div className="flex min-h-full flex-col">
        <Navbar />
        <main id="top" className="flex-1">
          {children}
        </main>
        <Footer />
      </div>
    </DepChatProvider>
  );
}
