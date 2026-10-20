import {
  Sparkles,
  ArrowRight,
  PhoneCall,
  Calendar,
  Clock,
  CheckCircle,
  MessageSquare,
  Shield,
  Zap,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export function ReceptionistShowcase() {
  return (
    <section id="receptionist" className="relative py-24 lg:py-32 overflow-hidden scroll-mt-20">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <SectionHeading
          eyebrow="Flagship AI Agent"
          title="Never Miss an Opportunity to Connect"
          description="Every unanswered phone call or late message is lost revenue. Deptloy's AI Receptionist answers instantly, qualifies the caller, checks live availability, and locks in the appointment."
          align="center"
          className="mb-16"
        />

        {/* Interactive-looking Receptionist Dashboard Preview */}
        <div className="relative rounded-3xl p-1 bg-gradient-to-r from-purple-500/30 via-cyan-500/20 to-purple-500/30 shadow-2xl shadow-purple-950/40">
          <div className="rounded-[22px] bg-[#0C101D] border border-white/10 p-6 sm:p-8 lg:p-10">
            
            {/* Top Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/[0.08] gap-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
                  <PhoneCall className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-bold text-white">Live Receptionist Telephony Node</h4>
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-semibold">
                      Connected
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Model: Deptloy Voice-Engine v2.4 • Average Latency: 280ms • Noise Filter Active
                  </p>
                </div>
              </div>

              {/* Simulation Notice Tag */}
              <div className="flex items-center gap-2">
                <Badge variant="outline" size="sm">
                  Interactive Demo Mode
                </Badge>
              </div>
            </div>

            {/* Main Interactive Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-8 items-start">
              
              {/* Left Column: Sample Live Transcript */}
              <div className="lg:col-span-7 flex flex-col gap-4">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                  <span className="flex items-center gap-1.5 font-medium">
                    <MessageSquare className="h-3.5 w-3.5 text-purple-400" />
                    Live Speech-to-Text Conversation Stream
                  </span>
                  <span className="font-mono text-purple-400">01:42</span>
                </div>

                {/* Conversation Box */}
                <div className="rounded-2xl bg-[#111827] border border-white/10 p-5 space-y-4">
                  {/* Assistant Message 1 */}
                  <div className="flex items-start gap-3">
                    <div className="h-7 w-7 rounded-lg bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 text-xs shrink-0 mt-0.5">
                      <Sparkles className="h-3.5 w-3.5" />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[11px] font-semibold text-purple-300">Deptloy Receptionist</span>
                      <p className="text-xs text-slate-200 leading-relaxed bg-[#161F33] p-3 rounded-xl rounded-tl-none border border-white/5">
                        &ldquo;Good afternoon! Thanks for calling Bayview Orthodontics. Are you looking to schedule an initial consultation, or calling regarding an existing treatment plan?&rdquo;
                      </p>
                    </div>
                  </div>

                  {/* Customer Message 1 */}
                  <div className="flex items-start gap-3">
                    <div className="h-7 w-7 rounded-lg bg-slate-800 flex items-center justify-center text-slate-300 text-xs shrink-0 mt-0.5">
                      C
                    </div>
                    <div className="space-y-1">
                      <span className="text-[11px] font-semibold text-slate-400">Marcus Vance (Caller)</span>
                      <p className="text-xs text-slate-200 leading-relaxed bg-[#1F293D] p-3 rounded-xl rounded-tl-none border border-white/5">
                        &ldquo;I need to book a consultation for Invisalign for my daughter this Friday if possible. Do you have anything after 4 PM?&rdquo;
                      </p>
                    </div>
                  </div>

                  {/* Assistant Message 2 */}
                  <div className="flex items-start gap-3">
                    <div className="h-7 w-7 rounded-lg bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 text-xs shrink-0 mt-0.5">
                      <Sparkles className="h-3.5 w-3.5" />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[11px] font-semibold text-purple-300">Deptloy Receptionist</span>
                      <p className="text-xs text-slate-200 leading-relaxed bg-[#161F33] p-3 rounded-xl rounded-tl-none border border-white/5">
                        &ldquo;Checking our schedule right now... Yes, Dr. Martinez has an opening at 4:30 PM this Friday. The evaluation takes about 45 minutes and is completely complimentary. Would you like me to book Marcus and send a text confirmation?&rdquo;
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Shield className="h-3.5 w-3.5 text-slate-400" />
                  <span>Demonstration transcript — caller tone classified as Enthusiastic (98% confidence).</span>
                </div>
              </div>

              {/* Right Column: Dynamic Booking Confirmation Card & Actions */}
              <div className="lg:col-span-5 flex flex-col gap-4">
                <span className="text-xs font-medium text-slate-400">
                  Automated Appointment Card
                </span>

                <div className="rounded-2xl bg-[#111827] border border-white/10 p-5 shadow-lg">
                  <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-purple-400" />
                      <span className="text-xs font-bold text-white">Friday, Oct 24, 2026</span>
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                      Confirmed
                    </span>
                  </div>

                  <div className="my-4 space-y-3 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Service:</span>
                      <span className="font-semibold text-white">Invisalign Consultation</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Time Window:</span>
                      <span className="font-semibold text-white flex items-center gap-1">
                        <Clock className="h-3 w-3 text-purple-400" /> 4:30 PM - 5:15 PM
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Provider:</span>
                      <span className="font-semibold text-white">Dr. Martinez</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Client Contact:</span>
                      <span className="font-semibold text-slate-200">+1 (555) 782-9014</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/[0.08] space-y-2">
                    <div className="flex items-center gap-2 text-[11px] text-emerald-400">
                      <CheckCircle className="h-3.5 w-3.5 shrink-0" />
                      <span>Google Calendar invite dispatched</span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-emerald-400">
                      <CheckCircle className="h-3.5 w-3.5 shrink-0" />
                      <span>SMS reminder sequence scheduled</span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-purple-300">
                      <Zap className="h-3.5 w-3.5 shrink-0" />
                      <span>Client record created in CRM pipeline</span>
                    </div>
                  </div>
                </div>

                {/* Direct CTA to Live Interactive Demo */}
                <div className="rounded-2xl bg-gradient-to-br from-purple-900/30 via-[#131A2C] to-[#101522] border border-purple-500/20 p-5 text-center flex flex-col items-center">
                  <h4 className="text-sm font-bold text-white mb-1">
                    Try Booking in Real Time
                  </h4>
                  <p className="text-xs text-slate-300 mb-4 max-w-xs">
                    Interact with our live frontend appointment booking prototype across healthcare, beauty, real estate, and services.
                  </p>
                  <Button
                    href="/demo"
                    variant="glow"
                    size="md"
                    className="w-full font-semibold"
                    rightIcon={<ArrowRight className="h-4 w-4" />}
                  >
                    Try the Live Demo
                  </Button>
                </div>

              </div>

            </div>

            {/* Bottom Disclaimer */}
            <div className="pt-4 border-t border-white/[0.08] text-center text-xs text-slate-500">
              Note: This preview illustrates conversational turn-taking and automated booking workflows. Try our live prototype at /demo.
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
