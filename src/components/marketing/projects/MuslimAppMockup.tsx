"use client";

import * as React from "react";
import {
  BookOpen,
  Scroll,
  Sparkles,
  Calendar,
  Users,
  CheckCircle2,
  Clock,
  Flame,
  Heart,
  Plus,
} from "lucide-react";

type AppTab = "quran" | "hadith" | "term" | "planner" | "social";

interface MuslimAppMockupProps {
  interactive?: boolean;
  className?: string;
}

export function MuslimAppMockup({
  interactive = true,
  className = "",
}: MuslimAppMockupProps) {
  const [activeTab, setActiveTab] = React.useState<AppTab>("quran");

  const tabs: { id: AppTab; label: string; icon: React.ElementType }[] = [
    { id: "quran", label: "Quran", icon: BookOpen },
    { id: "hadith", label: "Daily Hadith", icon: Scroll },
    { id: "term", label: "Daily Term", icon: Sparkles },
    { id: "planner", label: "Schedule", icon: Calendar },
    { id: "social", label: "Circle", icon: Users },
  ];

  return (
    <div
      className={`rounded-2xl border border-[rgba(22,135,91,0.22)] bg-gradient-to-b from-[#0f291e] to-[#0a1c14] text-white p-4 sm:p-6 shadow-2xl overflow-hidden ${className}`}
    >
      {/* Top App Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#16875b] text-white grid place-items-center font-bold text-sm shadow-md shadow-[#16875b]/30">
            ☪
          </div>
          <div>
            <div className="text-xs font-mono font-bold tracking-wider uppercase text-[#38d39f]">
              Akhirah
            </div>
            <div className="text-sm font-bold text-white leading-tight">
              Today • 1447 AH
            </div>
          </div>
        </div>

        {/* Streak Indicator */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#fd9150]">
          <Flame className="w-3.5 h-3.5 fill-[#fd9150]" />
          <span className="font-bold">14 Days Streak</span>
        </div>
      </div>

      {/* Tab Switcher */}
      {interactive && (
        <div className="grid grid-cols-5 gap-1 p-1 bg-black/30 rounded-xl border border-white/10 mb-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isCur = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg text-[11px] font-medium transition-all ${
                  isCur
                    ? "bg-[#16875b] text-white shadow-sm font-bold"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon className="w-4 h-4 mb-0.5" />
                <span className="truncate w-full text-center leading-none">
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* Screen Body */}
      <div className="min-h-[290px] rounded-xl bg-black/25 border border-white/10 p-4 transition-all">
        {/* TAB 1: QURAN TRACKER */}
        {activeTab === "quran" && (
          <div className="space-y-3.5 animate-fadeIn">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-[#38d39f] font-bold">
                Reading Progress
              </span>
              <span className="text-xs font-mono text-white/50">Juz 18 • 62%</span>
            </div>

            {/* Current Bookmarked Surah Card */}
            <div className="p-3.5 rounded-xl bg-gradient-to-r from-[#16875b]/30 to-emerald-950/40 border border-[#16875b]/40">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[11px] font-mono text-white/60 uppercase">
                    Last Read Bookmark
                  </span>
                  <h4 className="text-base font-bold text-white mt-0.5">
                    Surah Al-Kahf (The Cave)
                  </h4>
                  <p className="text-xs text-white/70 mt-0.5">
                    Ayah 28 of 110 • Page 297
                  </p>
                </div>
                <div className="w-9 h-9 rounded-lg bg-[#16875b]/40 border border-[#16875b]/60 grid place-items-center text-sm font-arabic font-bold text-[#38d39f]">
                  ١٨
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-3">
                <div className="h-1.5 w-full bg-black/40 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#16875b] to-[#38d39f] rounded-full"
                    style={{ width: "62%" }}
                  />
                </div>
              </div>
            </div>

            {/* Daily Reading Goal */}
            <div className="grid grid-cols-2 gap-2.5">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-1.5 text-xs text-white/60 mb-1">
                  <Clock className="w-3.5 h-3.5 text-[#38d39f]" />
                  <span>Today&apos;s Time</span>
                </div>
                <div className="text-lg font-bold text-white">22 mins</div>
                <div className="text-[11px] text-white/50">Goal: 20m / day</div>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-1.5 text-xs text-white/60 mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#fd9150]" />
                  <span>Khatmah Target</span>
                </div>
                <div className="text-lg font-bold text-white">Day 41 / 60</div>
                <div className="text-[11px] text-white/50">On schedule</div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: DAILY HADITH */}
        {activeTab === "hadith" && (
          <div className="space-y-3 animate-fadeIn">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-[#fd9150] font-bold">
                Hadith of the Day
              </span>
              <span className="text-xs font-mono text-white/50">
                Sahih al-Bukhari 13
              </span>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2.5">
              <p className="text-sm sm:text-[14.5px] leading-relaxed text-white/95 italic">
                &ldquo;None of you truly believes until he loves for his brother what
                he loves for himself.&rdquo;
              </p>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-white/60">
                <span>Narrated by Anas (RA)</span>
                <span className="px-2 py-0.5 rounded-full bg-[#16875b]/30 text-[#38d39f] font-mono text-[10px] font-bold">
                  Core Character
                </span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#16875b]/15 border border-[#16875b]/30 text-xs leading-relaxed text-white/80">
              <strong className="text-white block mb-0.5">Today&apos;s Reflection:</strong>
              Practice active empathy in conversations today. Celebrate a peer&apos;s
              success as if it were your own.
            </div>
          </div>
        )}

        {/* TAB 3: DAILY TERM */}
        {activeTab === "term" && (
          <div className="space-y-3 animate-fadeIn">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-[#8478e0] font-bold">
                Islamic Term of the Day
              </span>
              <span className="text-xs font-mono text-white/50">Vocabulary</span>
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-br from-[#8478e0]/20 to-purple-950/30 border border-[#8478e0]/40 space-y-2">
              <div className="flex items-baseline justify-between">
                <h4 className="text-lg font-bold text-white tracking-wide">
                  Iḥsān <span className="font-arabic font-normal text-white/70 ml-1">إحسان</span>
                </h4>
                <span className="text-[11px] font-mono text-[#8478e0]">Excellence</span>
              </div>

              <p className="text-sm leading-relaxed text-white/90">
                To worship and live with spiritual excellence—to act as if you see
                God, and if you cannot see Him, knowing that He sees you.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-white/5 border border-white/10">
                <span className="text-white/50 block text-[10px] uppercase font-mono">
                  Context
                </span>
                <span className="text-white/90 font-medium">Hadith Jibril</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white/5 border border-white/10">
                <span className="text-white/50 block text-[10px] uppercase font-mono">
                  Daily Application
                </span>
                <span className="text-white/90 font-medium">Quality in craft</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: SCHEDULE & GOALS */}
        {activeTab === "planner" && (
          <div className="space-y-3 animate-fadeIn">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-[#38d39f] font-bold">
                Daily Focus &amp; Schedule
              </span>
              <span className="text-xs font-mono text-white/50">Next: Asr 3:45 PM</span>
            </div>

            {/* Active Focus Session */}
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#fd9150]/20 text-[#fd9150] grid place-items-center font-mono font-bold text-xs">
                  ⏱
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Tajweed &amp; Revision</div>
                  <div className="text-[11px] text-white/50">Focus Timer • 25m block</div>
                </div>
              </div>
              <span className="px-2 py-1 rounded-md bg-[#fd9150] text-[#15134a] font-mono font-bold text-xs">
                18:24 left
              </span>
            </div>

            {/* Project List */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs text-white/70 px-1">
                <span>Active Projects &amp; Notes</span>
                <span className="text-[#38d39f] cursor-pointer flex items-center gap-0.5">
                  <Plus className="w-3 h-3" /> Add
                </span>
              </div>

              <div className="p-2 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between text-xs">
                <span className="text-white/90">Memorize Surah Al-Mulk</span>
                <span className="font-mono text-[#38d39f] text-[11px]">80%</span>
              </div>

              <div className="p-2 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between text-xs">
                <span className="text-white/90">Charity Volunteer Coordination</span>
                <span className="font-mono text-white/50 text-[11px]">3 notes</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: SOCIAL CIRCLE */}
        {activeTab === "social" && (
          <div className="space-y-3 animate-fadeIn">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-[#38d39f] font-bold">
                Accountability Circle
              </span>
              <span className="text-xs font-mono text-white/50">4 Friends Active</span>
            </div>

            {/* Friend Feed */}
            <div className="space-y-2">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-start justify-between gap-2">
                <div className="flex items-start gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#16875b] grid place-items-center text-xs font-bold text-white shrink-0 mt-0.5">
                    Z
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Zaid K.</div>
                    <div className="text-[11px] text-white/70">
                      Completed daily reading: <span className="text-[#38d39f]">Juz 3 finished</span>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  className="text-xs text-[#fd9150] hover:text-white flex items-center gap-1 font-mono"
                  title="Cheer"
                >
                  <Heart className="w-3.5 h-3.5 fill-[#fd9150]" />
                  <span>Cheer</span>
                </button>
              </div>

              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-start justify-between gap-2">
                <div className="flex items-start gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#8478e0] grid place-items-center text-xs font-bold text-white shrink-0 mt-0.5">
                    A
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Amira H.</div>
                    <div className="text-[11px] text-white/70">
                      14-day streak on daily Hadith &amp; Terms 🔥
                    </div>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-white/40 mt-1">
                  12m ago
                </span>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-[#16875b]/20 border border-[#16875b]/30 text-center text-xs text-white/80">
              <span>Invite close friends to share milestones and keep each other motivated.</span>
            </div>
          </div>
        )}
      </div>

      {/* Footer Hint */}
      <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-white/50">
        <span>5 Core Tabs • Akhirah</span>
        <span className="text-[#38d39f] font-bold">Beta Coming Soon</span>
      </div>
    </div>
  );
}

