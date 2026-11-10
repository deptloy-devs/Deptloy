"use client";

import * as React from "react";
import { Mic, Sparkles, Bot } from "lucide-react";
import { MuslimAppMockup } from "./MuslimAppMockup";
import type { Project } from "@/lib/projects";

export function ProjectVisualPreview({ project }: { project: Project }) {
  if (project.visual === "app") {
    return <MuslimAppMockup interactive={true} />;
  }

  if (project.visual === "voice") {
    return (
      <div className="rounded-2xl border border-[rgba(132,120,224,0.3)] bg-gradient-to-b from-[#181546] to-[#0e0c30] text-white p-5 shadow-xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#16875b] animate-ping" />
            <span className="text-[#38d39f] font-bold">LIVE DUPLEX AUDIO</span>
          </div>
          <span className="text-white/50">Sub-500ms Latency</span>
        </div>

        {/* Voice Visualizer Monitor */}
        <div className="p-4 rounded-xl bg-black/30 border border-white/10 flex flex-col items-center justify-center text-center py-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--lav)] to-[var(--pur)] grid place-items-center shadow-lg shadow-[var(--lav)]/20 mb-4">
            <Mic className="w-8 h-8 text-white" />
          </div>

          <div className="text-sm font-bold text-white mb-1">
            Dep • Live AI Receptionist
          </div>
          <p className="text-xs text-white/60 max-w-xs mb-4">
            Streaming two-way neural audio. Capable of instant interruptions and dynamic calendar locking.
          </p>

          {/* Sound wave bars */}
          <div className="flex items-center gap-1.5 h-7">
            {[40, 75, 55, 95, 30, 80, 100, 60, 85, 45, 90, 35].map((h, i) => (
              <span
                key={i}
                className="w-1 rounded-full bg-gradient-to-t from-[var(--lav)] to-[var(--or)]"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>

        <div className="mt-3.5 flex items-center justify-between text-[11px] font-mono text-white/60">
          <span>Integrated with: Google Calendar &amp; CRM</span>
          <span className="text-[var(--or)] font-bold">Tested in Browser</span>
        </div>
      </div>
    );
  }

  if (project.visual === "simulator") {
    return (
      <div className="rounded-2xl border border-[rgba(253,145,80,0.3)] bg-gradient-to-b from-[#241712] to-[#120d09] text-white p-5 shadow-xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4 text-xs font-mono">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[var(--or)]" />
            <span className="text-[var(--or)] font-bold">INTERACTIVE SIMULATOR</span>
          </div>
          <span className="text-white/50">Multi-Vertical</span>
        </div>

        <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-3">
          {/* Vertical switcher pills */}
          <div className="flex flex-wrap gap-1.5">
            {["Apex Health Clinic", "Velvet Salon", "Pacific Real Estate", "Advisory"].map((v, i) => (
              <span
                key={v}
                className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-medium ${
                  i === 0
                    ? "bg-[var(--or)] text-[#15134a] font-bold"
                    : "bg-white/5 text-white/60 border border-white/5"
                }`}
              >
                {v}
              </span>
            ))}
          </div>

          {/* Chat excerpt */}
          <div className="space-y-2 pt-2 border-t border-white/10 text-xs">
            <div className="bg-white/5 p-2.5 rounded-lg border border-white/5 max-w-[85%]">
              <span className="text-[10px] font-mono text-white/40 block mb-0.5">Caller</span>
              <span>&ldquo;Do you have openings this Thursday afternoon for a cleaning?&rdquo;</span>
            </div>
            <div className="bg-[var(--or)]/15 border border-[var(--or)]/30 p-2.5 rounded-lg max-w-[90%] ml-auto text-right">
              <span className="text-[10px] font-mono text-[var(--or)] block mb-0.5">Apex Health AI</span>
              <span>&ldquo;Yes, Dr. Reynolds has 2:15 PM and 4:30 PM open. Shall I lock in 2:15 PM for you?&rdquo;</span>
            </div>
          </div>
        </div>

        <div className="mt-3.5 flex items-center justify-between text-[11px] font-mono text-white/60">
          <span>Real-time dynamic calendar matching</span>
          <span className="text-[var(--or)] font-bold">Try Live at /demo</span>
        </div>
      </div>
    );
  }

  // Dep chat assistant
  return (
    <div className="rounded-2xl border border-[rgba(87,80,168,0.3)] bg-gradient-to-b from-[#171442] to-[#0c0a27] text-white p-5 shadow-xl">
      <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4 text-xs font-mono">
        <div className="flex items-center gap-2">
          <Bot className="w-4 h-4 text-[var(--lav)]" />
          <span className="text-[var(--lav)] font-bold">WEBSITE INTELLIGENCE</span>
        </div>
        <span className="text-white/50">Signed Sessions</span>
      </div>

      <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-3">
        <div className="flex items-start gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[var(--pur)] grid place-items-center text-xs font-bold shrink-0">
            D
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-white/90 leading-relaxed">
            &ldquo;Hi! I&apos;m Dep. Whether you need a 24/7 AI receptionist, a custom CRM, or business automation, I can guide you to live demos or help scope your project.&rdquo;
          </div>
        </div>

        {/* Quick action chips */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {["Test Voice Demo", "See Solutions", "Get a Quote"].map((pill) => (
            <span
              key={pill}
              className="px-2.5 py-1 rounded-full bg-white/10 border border-white/10 text-[11px] font-mono text-white/80 hover:bg-white/20 cursor-default"
            >
              {pill}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-3.5 flex items-center justify-between text-[11px] font-mono text-white/60">
        <span>Protected by origin checks &amp; Redis rate limits</span>
        <span className="text-[var(--lav)] font-bold">Embedded on Every Page</span>
      </div>
    </div>
  );
}

