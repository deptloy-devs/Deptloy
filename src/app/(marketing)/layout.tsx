import { Footer } from "@/components/marketing/Footer";
import { Navbar } from "@/components/marketing/Navbar";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-full flex-col relative">
      {/* Background ambient lighting spheres */}
      <div className="blobs" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </div>

      <Navbar />
      <main id="main" className="flex-1 pt-20 sm:pt-24 relative z-10">
        {children}
      </main>
      <Footer />
    </div>
  );
}
