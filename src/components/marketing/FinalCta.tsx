import { Sparkles, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function FinalCta() {
  return (
    <section className="relative py-24 bg-[#080B14] border-t border-white/[0.08] overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[350px] bg-gradient-to-r from-purple-600/20 via-blue-600/15 to-purple-600/20 blur-[130px] rounded-full" />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="rounded-3xl bg-[#0E1322] border border-white/10 p-8 sm:p-14 lg:p-16 shadow-2xl relative overflow-hidden">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold mb-6">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Launch Your Custom AI Infrastructure</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            Ready to Make Your Business Work Smarter?
          </h2>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Stop losing leads to voicemail and hours to manual administrative busywork. Connect with our technical team to design an AI receptionist and automation suite tailored to your business.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              href="/contact"
              variant="glow"
              size="lg"
              className="w-full sm:w-auto font-semibold"
              rightIcon={<ArrowRight className="h-4 w-4" />}
            >
              Book a Consultation
            </Button>
            <Button
              href="/demo"
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
            >
              Explore AI Receptionist
            </Button>
          </div>

          <div className="mt-8 pt-8 border-t border-white/[0.08] flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              Custom Business Scoping
            </span>
            <span>•</span>
            <span>No Complex Migration</span>
            <span>•</span>
            <span>Deploy in 3–7 Days</span>
          </div>

        </div>
      </div>
    </section>
  );
}
