"use client";

import * as React from "react";
import Link from "next/link";
import {
  Send,
  ArrowRight,
  Sparkles,
  Mic,
  Stethoscope,
  Building2,
  Briefcase,
  Wrench,
  Calendar,
  Database,
  Smartphone,
  ShieldCheck,
  RotateCcw,
  AlertCircle,
} from "lucide-react";
import { VoiceReceptionist } from "@/components/marketing/voice-demo/VoiceReceptionist";
import { demoIndustries } from "@/lib/site";
import { useChatSession } from "@/lib/chat/useChatSession";
import type { DemoIndustryId, ChatMessage } from "@/types";
import type { ChatMessagePayload } from "@/lib/chat/types";

let messageCounter = 100;
function getNextId(prefix: string) {
  messageCounter += 1;
  return `${prefix}-${messageCounter}`;
}

const INDUSTRY_ICONS: Record<DemoIndustryId, React.ElementType> = {
  clinic: Stethoscope,
  salon: Sparkles,
  "real-estate": Building2,
  consulting: Briefcase,
  "home-services": Wrench,
};

export default function DemoPage() {
  // Guarantee page stays at the top on mount (fixes auto-scrolling bug)
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Selected industry
  const [selectedIndustryId, setSelectedIndustryId] = React.useState<DemoIndustryId>("clinic");

  const currentIndustry =
    demoIndustries.find((i) => i.id === selectedIndustryId) || demoIndustries[0];

  const selectedService = currentIndustry.services[0];

  // Chat Messages State
  const [messages, setMessages] = React.useState<ChatMessage[]>([
    {
      id: "msg-1",
      sender: "assistant",
      text: currentIndustry.assistantGreeting,
      timestamp: "Just now",
    },
  ]);
  const [inputMessage, setInputMessage] = React.useState("");
  const [isTyping, setIsTyping] = React.useState(false);
  const [isStreaming, setIsStreaming] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [panelMode, setPanelMode] = React.useState<"text" | "voice">("text");

  const chatContainerRef = React.useRef<HTMLDivElement>(null);
  const lastUserPromptRef = React.useRef<string>("");

  const { containerRef: turnstileContainerRef, streamChat } = useChatSession();

  // Reset conversation when industry changes
  const handleIndustryChange = (id: DemoIndustryId) => {
    setSelectedIndustryId(id);
    const ind = demoIndustries.find((i) => i.id === id) || demoIndustries[0];
    setErrorMessage(null);
    setIsStreaming(false);
    setIsTyping(false);
    setMessages([
      {
        id: getNextId("msg"),
        sender: "assistant",
        text: ind.assistantGreeting,
        timestamp: "Just now",
      },
    ]);
  };

  // Restart active industry chat
  const handleRestartChat = () => {
    setErrorMessage(null);
    setIsStreaming(false);
    setIsTyping(false);
    setInputMessage("");
    setMessages([
      {
        id: getNextId("msg"),
        sender: "assistant",
        text: currentIndustry.assistantGreeting,
        timestamp: "Just now",
      },
    ]);
  };

  // Send message in interactive chat simulator
  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isStreaming) return;

    lastUserPromptRef.current = text;
    setErrorMessage(null);

    const userMsg: ChatMessage = {
      id: getNextId("user"),
      sender: "customer",
      text,
      timestamp: "Just now",
    };

    const assistantMsgId = getNextId("assistant");
    const assistantPlaceholder: ChatMessage = {
      id: assistantMsgId,
      sender: "assistant",
      text: "",
      timestamp: "Just now",
    };

    const nextMessages = [...messages, userMsg];
    setMessages([...nextMessages, assistantPlaceholder]);
    if (!textToSend) setInputMessage("");
    setIsTyping(true);
    setIsStreaming(true);

    // Build payload for API
    const historyPayload: ChatMessagePayload[] = nextMessages
      .filter((m) => m.text.trim().length > 0 && m.sender !== "system")
      .map((m) => ({
        role: m.sender === "customer" ? "user" : "assistant",
        content: m.text,
      }));

    try {
      await streamChat({
        assistant: "receptionist",
        messages: historyPayload,
        industryId: currentIndustry.id,
        serviceId: selectedService.id,
        onChunk: (accumulated) => {
          setIsTyping(false);
          setMessages((prev) =>
            prev.map((m) => (m.id === assistantMsgId ? { ...m, text: accumulated } : m))
          );
        },
      });

      setIsStreaming(false);
      setIsTyping(false);
    } catch (err: unknown) {
      setIsStreaming(false);
      setIsTyping(false);
      setMessages((prev) => prev.filter((m) => m.id !== assistantMsgId || m.text.length > 0));
      const msg =
        err instanceof Error ? err.message : "Unable to reach receptionist. Please try again.";
      setErrorMessage(msg);
    }
  };

  const handleRetry = () => {
    if (lastUserPromptRef.current) {
      handleSendMessage(lastUserPromptRef.current);
    }
  };

  // ONLY scroll internal chat container when messages change (NEVER window scroll)
  React.useEffect(() => {
    if (messages.length > 1 && chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping, errorMessage]);

  return (
    <div className="pt-20 sm:pt-24 pb-12 sm:pb-16 min-h-screen">
      {/* Invisible Turnstile Verification Mount */}
      <div ref={turnstileContainerRef} className="hidden" aria-hidden="true" />

      <div className="wrap max-w-6xl">
        {/* Compact, Clean Studio Header (Starts at the top with zero unwanted scroll) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10.5px] font-mono font-bold uppercase bg-[var(--mist)] text-[var(--pur)] border border-[var(--peri)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#16875b] animate-pulse" />
                Live Voice &amp; Text Simulator
              </span>
              <span className="text-[11px] font-mono text-[var(--mute)] hidden md:inline">
                · Sample business verticals · Instant browser testing
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--deep)]">
              AI Receptionist Simulator
            </h1>
            <p className="text-xs sm:text-sm text-[var(--mute)] mt-1 max-w-xl">
              Experience how Deptloy&apos;s custom AI receptionist handles inbound calls, answers customer inquiries, and schedules appointments in real time.
            </p>
          </div>

          {/* Prototype Notice Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-[rgba(21,19,74,0.1)] text-xs text-[var(--mute)] shadow-2xs self-start md:self-auto shrink-0">
            <span className="w-2 h-2 rounded-full bg-[var(--or)] shrink-0" />
            <span className="text-[11.5px]">
              Chat by text or switch to <strong>Voice</strong> to speak live.
            </span>
          </div>
        </div>

        {/* 1-CLICK HORIZONTAL INDUSTRY SWITCHER BAR */}
        <div className="bg-white border border-[rgba(21,19,74,0.12)] p-2 rounded-2xl shadow-xs mb-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {demoIndustries.map((ind) => {
              const Icon = INDUSTRY_ICONS[ind.id as DemoIndustryId] || Stethoscope;
              const isSelected = ind.id === selectedIndustryId;
              return (
                <button
                  key={ind.id}
                  type="button"
                  onClick={() => handleIndustryChange(ind.id as DemoIndustryId)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                    isSelected
                      ? "bg-[var(--deep)] text-white shadow-sm"
                      : "bg-[var(--paper)] text-[var(--mute)] hover:text-[var(--deep)] hover:bg-[var(--mist)]"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isSelected ? "text-[var(--or)]" : "text-[var(--pur)]"}`} />
                  <span>{ind.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* MAIN 2-COLUMN COCKPIT (Fixed equal height on desktop) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* LEFT COLUMN (7 cols): Interactive Live Voice & Text Intake Terminal */}
          <div className="lg:col-span-7 bg-[#0b0a1d] rounded-2xl border border-[rgba(87,80,168,0.25)] shadow-xl overflow-hidden flex flex-col justify-between h-[560px]">
            {/* Terminal Header */}
            <div className="p-3.5 bg-black/25 border-b border-white/10 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[var(--pur)] to-[var(--or)] p-0.5 shadow-sm shrink-0">
                  <div className="w-full h-full rounded-full bg-[#0f0e26] grid place-items-center text-white font-mono font-bold text-xs">
                    AI
                  </div>
                </div>
                <div className="min-w-0">
                  <h3 className="text-xs sm:text-[13px] font-bold text-white flex items-center gap-1.5 truncate">
                    {currentIndustry.name} Receptionist
                  </h3>
                  <span className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    {panelMode === "voice" ? "Live Voice Engine Active" : "Gemini AI Receptionist Active"}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {panelMode === "text" && (
                  <button
                    type="button"
                    onClick={handleRestartChat}
                    title="Restart Conversation"
                    aria-label="Restart Conversation"
                    className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white grid place-items-center transition-colors cursor-pointer text-xs"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-white/80" />
                  </button>
                )}

                {/* Text / Live Voice Switch */}
                <div
                  role="tablist"
                  aria-label="Receptionist demo mode"
                  className="flex items-center p-0.5 rounded-full bg-white/10 border border-white/15 text-[10px] font-mono shrink-0"
                >
                  {(["text", "voice"] as const).map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      role="tab"
                      aria-selected={panelMode === mode}
                      onClick={() => setPanelMode(mode)}
                      className={`flex items-center gap-1 px-3 py-1 rounded-full transition-colors cursor-pointer ${
                        panelMode === mode
                          ? mode === "voice"
                            ? "bg-[var(--or)] text-[var(--deep)] font-bold shadow-xs"
                            : "bg-white text-[var(--deep)] font-bold shadow-xs"
                          : "text-[#cfd2ee] hover:text-white"
                      }`}
                    >
                      {mode === "voice" && <Mic className="w-3 h-3" />}
                      {mode === "voice" ? "Voice" : "Text"}
                      {mode === "voice" && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" aria-label="live" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {panelMode === "voice" ? (
              <VoiceReceptionist
                key={`${currentIndustry.id}:${selectedService.id}`}
                industry={currentIndustry}
                service={selectedService}
              />
            ) : (
              <>
                {/* Quick Sample Questions Bar */}
                <div className="px-3.5 py-2.5 bg-black/20 border-b border-white/10 shrink-0">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--peri)] block mb-1.5 font-bold">
                    SAMPLE INQUIRIES (CLICK TO ASK):
                  </span>
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                    {currentIndustry.sampleQuestions.map((q) => (
                      <button
                        key={q}
                        type="button"
                        disabled={isStreaming}
                        onClick={() => handleSendMessage(q)}
                        className="px-2.5 py-1 text-[11px] font-mono bg-white/10 hover:bg-white/20 border border-white/15 hover:border-[var(--or)]/60 text-[#e4e6fb] hover:text-white rounded-md whitespace-nowrap transition-colors cursor-pointer shrink-0 disabled:opacity-50"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message Thread */}
                <div
                  ref={chatContainerRef}
                  className="p-3.5 sm:p-4 flex-1 overflow-y-auto space-y-3 text-xs leading-relaxed"
                >
                  {messages.map((msg) => {
                    if (!msg.text && msg.sender === "assistant" && isTyping) return null;
                    const isSummary = msg.text.includes("[APPOINTMENT SUMMARY]");
                    return (
                      <div
                        key={msg.id}
                        className={`flex flex-col ${
                          msg.sender === "customer" ? "items-end" : "items-start"
                        }`}
                      >
                        <span className="text-[9.5px] font-mono text-slate-400 mb-1 px-1">
                          {msg.sender === "customer" ? "You (Caller)" : `${currentIndustry.name} AI`}
                        </span>
                        <div
                          className={`p-3 max-w-[88%] text-xs sm:text-[12.5px] leading-relaxed rounded-xl shadow-xs whitespace-pre-wrap ${
                            msg.sender === "customer"
                              ? "bg-[var(--or)] text-[var(--deep)] font-semibold rounded-tr-xs"
                              : isSummary
                              ? "bg-[#141d33] text-white border-2 border-emerald-400/60 rounded-tl-xs shadow-[0_0_20px_rgba(52,211,153,0.15)]"
                              : "bg-white/10 text-white border border-white/10 rounded-tl-xs"
                          }`}
                        >
                          {msg.text}
                        </div>
                      </div>
                    );
                  })}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="bg-white/10 border border-white/10 text-white max-w-[70px] px-3 py-2 rounded-xl rounded-tl-xs flex items-center gap-1.5 shadow-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--or)] animate-bounce" />
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--or)] animate-bounce [animation-delay:0.15s]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--or)] animate-bounce [animation-delay:0.3s]" />
                    </div>
                  )}

                  {/* Error Box */}
                  {errorMessage && (
                    <div className="bg-red-950/60 border border-red-500/40 text-red-200 text-xs rounded-xl p-3 flex flex-col gap-2">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                        <p className="flex-1 text-[11.5px]">{errorMessage}</p>
                      </div>
                      <button
                        type="button"
                        onClick={handleRetry}
                        className="self-end px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-md font-semibold text-[10.5px] transition-colors cursor-pointer"
                      >
                        Retry
                      </button>
                    </div>
                  )}
                </div>

                {/* Chat Input Bar */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="p-3 bg-black/25 border-t border-white/10 flex items-center gap-2 shrink-0"
                >
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    disabled={isStreaming}
                    placeholder={isStreaming ? "Receptionist is replying…" : "Ask about hours, fees, or slot availability..."}
                    className="flex-1 bg-white/10 border border-white/15 text-white placeholder:text-slate-400 px-3 py-2 text-xs rounded-lg focus:outline-none focus:border-[var(--or)] transition-colors disabled:opacity-60"
                  />
                  <button
                    type="button"
                    onClick={() => setPanelMode("voice")}
                    aria-label="Talk to the receptionist"
                    title="Talk to the receptionist"
                    className="h-8 px-2.5 rounded-lg border border-white/20 bg-white/10 text-white text-[10.5px] font-mono font-bold flex items-center gap-1.5 hover:bg-white/20 transition-colors cursor-pointer shrink-0"
                  >
                    <Mic className="w-3.5 h-3.5 text-[var(--or)]" />
                    <span className="hidden sm:inline">Talk</span>
                  </button>
                  <button
                    type="submit"
                    disabled={isStreaming || !inputMessage.trim()}
                    aria-label="Send message"
                    className="w-8 h-8 rounded-lg bg-[var(--or)] text-[var(--deep)] grid place-items-center hover:bg-white transition-colors cursor-pointer shrink-0 shadow-xs disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </>
            )}
          </div>

          {/* RIGHT COLUMN (5 cols): AI Receptionist Capabilities & Live Connected Systems */}
          <div className="lg:col-span-5 bg-white border border-[rgba(21,19,74,0.12)] p-5 sm:p-6 rounded-2xl shadow-[0_12px_36px_rgba(87,80,168,0.06)] flex flex-col justify-between h-[560px]">
            <div>
              {/* Header */}
              <div className="pb-3 border-b border-[rgba(21,19,74,0.08)] mb-3.5">
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--pur)]">
                    AI SYSTEM CAPABILITIES
                  </span>
                  <span className="text-[10px] font-mono font-bold text-[#16875b] bg-[#edfbf4] px-2 py-0.5 rounded border border-[#c2eed8] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#16875b] animate-pulse" />
                    Connected Live
                  </span>
                </div>
                <h3 className="text-base font-extrabold text-[var(--deep)]">
                  How Deptloy Powers This Receptionist
                </h3>
                <p className="text-xs text-[var(--mute)] mt-0.5">
                  Behind the voice and chat, this assistant connects to your business tools and workflows.
                </p>
              </div>

              {/* 3 Core Connected Capabilities */}
              <div className="space-y-2.5 mb-3.5">
                <div className="p-3 rounded-xl bg-[var(--paper)]/80 border border-[var(--peri)]/80 flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-white border border-[var(--peri)] grid place-items-center text-[var(--pur)] shrink-0 shadow-2xs mt-0.5">
                    <Calendar className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[var(--deep)]">Real-Time Calendar Booking</h4>
                    <p className="text-[11px] text-[var(--mute)] leading-relaxed mt-0.5">
                      Checks live open slots, prevents double bookings, and books directly into Google or Outlook calendars.
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[var(--paper)]/80 border border-[var(--peri)]/80 flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-white border border-[var(--peri)] grid place-items-center text-[var(--pur)] shrink-0 shadow-2xs mt-0.5">
                    <Database className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[var(--deep)]">CRM &amp; Lead Ingestion</h4>
                    <p className="text-[11px] text-[var(--mute)] leading-relaxed mt-0.5">
                      Caller names, inquiry topics, and phone numbers are automatically logged into your CRM database.
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[var(--paper)]/80 border border-[var(--peri)]/80 flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-white border border-[var(--peri)] grid place-items-center text-[var(--pur)] shrink-0 shadow-2xs mt-0.5">
                    <Smartphone className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[var(--deep)]">Automated SMS &amp; Webhooks</h4>
                    <p className="text-[11px] text-[var(--mute)] leading-relaxed mt-0.5">
                      Dispatches instant text confirmations and reminders to callers so appointments never slip away.
                    </p>
                  </div>
                </div>
              </div>

              {/* Active Verification Stats Bar */}
              <div className="p-3 rounded-xl bg-[#0f0e26] text-white space-y-2">
                <div className="flex items-center justify-between text-[10px] font-mono text-[var(--peri)]">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    <span>PRODUCTION TELEMETRY</span>
                  </span>
                  <span className="text-emerald-400 font-bold">99.9% Uptime</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center font-mono">
                  <div className="p-1.5 rounded bg-white/10">
                    <span className="text-[8.5px] text-slate-400 block truncate">VOICE LATENCY</span>
                    <span className="text-xs font-bold text-white">~280ms</span>
                  </div>
                  <div className="p-1.5 rounded bg-white/10">
                    <span className="text-[8.5px] text-slate-400 block truncate">CALENDAR SYNC</span>
                    <span className="text-xs font-bold text-emerald-400">Instant</span>
                  </div>
                  <div className="p-1.5 rounded bg-white/10">
                    <span className="text-[8.5px] text-slate-400 block truncate">HALLUCINATION</span>
                    <span className="text-xs font-bold text-[var(--or)]">Guarded</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct CTA at Bottom of Right Panel */}
            <div className="pt-3 border-t border-[rgba(21,19,74,0.08)]">
              <Link
                href="/contact#form"
                className="btn sm w-full inline-flex items-center justify-center gap-1.5 text-xs font-bold"
              >
                <span>Deploy an AI Receptionist for Your Business</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
