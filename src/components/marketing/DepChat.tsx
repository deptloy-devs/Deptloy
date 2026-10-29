"use client";

import * as React from "react";
import { Mic, Send, Volume2, VolumeX, X } from "lucide-react";
import { cn } from "@/lib/cn";

export const DepChatContext = React.createContext<{
  isOpen: boolean;
  openChat: (initialMsg?: string) => void;
  closeChat: () => void;
}>({
  isOpen: false,
  openChat: () => {},
  closeChat: () => {},
});

export function useDepChat() {
  return React.useContext(DepChatContext);
}

const KB: [RegExp, string][] = [
  [
    /hi\b|hello|hey|greetings/i,
    "Hello! I'm Dep, Deptloy's assistant. I can explain our AI receptionists, custom software capabilities, solution blueprints, or help you book a discovery call.",
  ],
  [
    /receptionist|phone|call(s)?|voice|answer|telephony/i,
    "Our flagship AI receptionist answers phone calls 24/7 in your brand's voice with natural streaming conversational cadence. It checks live calendar availability, books appointments, triages urgent inquiries, and syncs directly into your CRM. You can test an interactive text-based simulation right now on our /demo page!",
  ],
  [
    /demo|test|try/i,
    "You can experience an interactive text simulation of our AI Receptionist at /demo! You can choose an industry, test caller intake, ask sample questions, and simulate real-time slot booking.",
  ],
  [
    /custom|software|platform|app|web|saas|engineer/i,
    "Beyond AI receptionists, Deptloy designs, engineers, and maintains custom software products: client portals, business management platforms, staff dispatch dashboards, SaaS apps, and relational databases tailored around how your team actually works.",
  ],
  [
    /crm|database|pipeline|leads|contacts|postgres/i,
    "We architect custom PostgreSQL and Supabase databases shaped around your sales and fulfillment workflows. Inbound calls, notes, transcripts, and stages update automatically with dedicated architecture where you retain complete data ownership.",
  ],
  [
    /automat|workflow|integration|api|sync/i,
    "We automate repetitive administrative busywork: two-way SMS reminders that reduce missed appointments, instant post-call follow-ups, team alerts, and API bridges to systems like EHRs, accounting software, and CRMs.",
  ],
  [
    /project(s)?|blueprint(s)?|case|example/i,
    "Visit our /projects page to explore our interactive solution blueprints—including a unified operations platform for multi-location healthcare networks and a live dispatch hub for field services.",
  ],
  [
    /price|cost|pricing|quote|how much/i,
    "We provide transparent, fixed-scope engineering proposals tailored to your operational volume. You can submit a quote request on our /contact page or schedule a 30-minute discovery call.",
  ],
  [
    /book|talk|contact|schedule|appointment|meeting/i,
    "You can request a discovery call or submit a quote request directly at /contact, or email our engineering team directly at deptloy@gmail.com.",
  ],
  [
    /build|what do you do|services/i,
    "Deptloy combines two major areas of expertise: our flagship autonomous AI Receptionists and end-to-end custom software engineering (web apps, platforms, CRMs, and automations).",
  ],
];

function getBotReply(question: string): string {
  const q = question.toLowerCase();
  for (const [re, answer] of KB) {
    if (re.test(q)) return answer;
  }
  return "I can tell you about our AI receptionists, custom software platforms, solution blueprints, or help you book a discovery call. What would you like to explore?";
}

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
}

export function DepChatProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [voiceEnabled, setVoiceEnabled] = React.useState(false);
  const [messages, setMessages] = React.useState<Message[]>([
    {
      id: "intro",
      sender: "bot",
      text: "Hi, I’m Dep, Deptloy’s assistant. What would you like to know about our systems?",
    },
  ]);
  const [inputVal, setInputVal] = React.useState("");
  const [isTyping, setIsTyping] = React.useState(false);
  const [isListening, setIsListening] = React.useState(false);

  const msgsEndRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const speakText = React.useCallback((text: string) => {
    if (!voiceEnabled || typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.05;
    window.speechSynthesis.speak(utterance);
  }, [voiceEnabled]);

  const handleUserSend = React.useCallback((text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: "user",
      text: trimmed,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal("");
    setIsTyping(true);

    setTimeout(() => {
      const reply = getBotReply(trimmed);
      const botMsg: Message = {
        id: `b-${Date.now()}`,
        sender: "bot",
        text: reply,
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
      speakText(reply);
    }, 600);
  }, [speakText]);

  const openChat = React.useCallback((initialMsg?: string) => {
    setIsOpen(true);
    if (initialMsg) {
      handleUserSend(initialMsg);
    }
    setTimeout(() => {
      inputRef.current?.focus();
    }, 300);
  }, [handleUserSend]);

  const closeChat = React.useCallback(() => {
    setIsOpen(false);
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  }, []);

  React.useEffect(() => {
    msgsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleMicToggle = () => {
    if (typeof window === "undefined") return;
    interface SpeechEvent {
      results: Array<Array<{ transcript: string }>>;
    }
    interface SpeechInstance {
      lang: string;
      interimResults: boolean;
      onstart: () => void;
      onend: () => void;
      onerror: () => void;
      onresult: (event: SpeechEvent) => void;
      start: () => void;
    }
    type SpeechCtor = new () => SpeechInstance;
    const win = window as unknown as {
      SpeechRecognition?: SpeechCtor;
      webkitSpeechRecognition?: SpeechCtor;
    };
    const SpeechRecognition = win.SpeechRecognition || win.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      recognition.interimResults = false;

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);

      recognition.onresult = (event: SpeechEvent) => {
        const transcript = event.results[0]?.[0]?.transcript;
        if (transcript) {
          handleUserSend(transcript);
        }
      };

      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  return (
    <DepChatContext.Provider value={{ isOpen, openChat, closeChat }}>
      {children}

      {/* Floating launcher button in bottom right - responsive sizing for mobile/desktop */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Chat with Dep"
        className={cn(
          "fixed right-3.5 sm:right-5 bottom-3.5 sm:bottom-5 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#15134a] text-white shadow-2xl z-[70] grid place-items-center cursor-pointer transition-all duration-300 hover:scale-105 hover:bg-[#fd9150] hover:text-[#15134a]",
          isOpen ? "scale-90 opacity-0 pointer-events-none" : "scale-100 opacity-100"
        )}
      >
        <svg className="w-6 h-6 sm:w-8 sm:h-8" viewBox="0 0 40 40" fill="none">
          <rect x="5" y="8" width="30" height="24" rx="11" fill="#f7f5ff" />
          <rect x="9" y="12" width="22" height="16" rx="8" fill="#15134a" />
          <rect x="14" y="16" width="4" height="7" rx="2" fill="#bfe3f5" />
          <rect x="22" y="16" width="4" height="7" rx="2" fill="#bfe3f5" />
          <circle cx="20" cy="5" r="3" fill="#fd9150" />
        </svg>
      </button>

      {/* Chat Slide-up Modal Dialog - full responsive adaptation */}
      <div
        role="dialog"
        aria-label="Chat with Dep"
        className={cn(
          "fixed right-2.5 sm:right-6 bottom-2.5 sm:bottom-6 w-[380px] max-w-[calc(100vw-1.25rem)] h-[min(560px,calc(100svh-24px))] bg-white rounded-2xl shadow-[0_30px_90px_rgba(21,19,74,0.35)] border border-[rgba(87,80,168,0.18)] z-[75] flex flex-col overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.2,0.8,0.2,1)] origin-bottom-right",
          isOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none translate-y-6"
        )}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#15134a] to-[#2d2a85] text-white px-4 py-3.5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#e8e6f7] grid place-items-center shrink-0">
              <svg width="24" height="24" viewBox="0 0 40 40" fill="none">
                <rect x="5" y="8" width="30" height="24" rx="11" fill="#15134a" />
                <rect x="9" y="12" width="22" height="16" rx="8" fill="#fff" />
                <rect x="14" y="16" width="4" height="7" rx="2" fill="#8478e0" />
                <rect x="22" y="16" width="4" height="7" rx="2" fill="#8478e0" />
                <circle cx="20" cy="5" r="3" fill="#fd9150" />
              </svg>
            </div>
            <div>
              <p className="font-display font-bold text-sm tracking-tight text-white leading-tight">Dep</p>
              <p className="text-[11px] text-[#d2cdf3]">Deptloy Assistant</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => {
                setVoiceEnabled((v) => !v);
                if (voiceEnabled && typeof window !== "undefined" && "speechSynthesis" in window) {
                  window.speechSynthesis.cancel();
                }
              }}
              title={voiceEnabled ? "Mute speech" : "Read aloud"}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white grid place-items-center text-xs transition-colors cursor-pointer"
            >
              {voiceEnabled ? <Volume2 className="w-3.5 h-3.5 text-[#fd9150]" /> : <VolumeX className="w-3.5 h-3.5 text-white/70" />}
            </button>
            <button
              onClick={closeChat}
              aria-label="Close chat"
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white grid place-items-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Message Log */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#f4f3fb]">
          {messages.map((m) => (
            <div
              key={m.id}
              className={cn(
                "max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed",
                m.sender === "bot"
                  ? "bg-white text-[#15134a] border border-[#e8e6f7] rounded-bl-sm shadow-sm"
                  : "bg-[#15134a] text-white self-end ml-auto rounded-br-sm"
              )}
            >
              {m.text}
            </div>
          ))}

          {isTyping && (
            <div className="bg-white border border-[#e8e6f7] text-[#15134a] max-w-[80px] px-3.5 py-2.5 rounded-2xl rounded-bl-sm flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8478e0] animate-bounce" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#8478e0] animate-bounce [animation-delay:0.15s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#8478e0] animate-bounce [animation-delay:0.3s]" />
            </div>
          )}
          <div ref={msgsEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="flex flex-wrap gap-1.5 px-3 py-2 bg-[#f4f3fb] border-t border-[#e8e6f7]">
          {["What do you build?", "Test AI Receptionist", "Custom software capabilities", "Book a discovery call"].map((chip) => (
            <button
              key={chip}
              onClick={() => handleUserSend(chip)}
              className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white hover:bg-[#e8e6f7] border border-[#d2cdf3] text-[#15134a] transition-colors cursor-pointer"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleUserSend(inputVal);
          }}
          className="p-3 bg-white border-t border-[#e8e6f7] flex items-center gap-2"
        >
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Ask Dep anything…"
            className="flex-1 min-w-0 px-3.5 py-2 text-sm rounded-full border border-[#d2cdf3] bg-[#f4f3fb] focus:outline-none focus:border-[#8478e0] text-[#15134a]"
          />
          <button
            type="button"
            onClick={handleMicToggle}
            className={cn(
              "w-9 h-9 rounded-full grid place-items-center transition-colors cursor-pointer text-xs",
              isListening ? "bg-[#fd9150] text-[#15134a] animate-pulse" : "bg-[#e8e6f7] text-[#15134a] hover:bg-[#d2cdf3]"
            )}
            title="Speech to text"
          >
            <Mic className="w-4 h-4" />
          </button>
          <button
            type="submit"
            className="w-9 h-9 rounded-full bg-[#15134a] hover:bg-[#fd9150] text-white hover:text-[#15134a] grid place-items-center transition-colors cursor-pointer shrink-0"
            title="Send"
          >
            <Send className="w-4 h-4 ml-0.5" />
          </button>
        </form>
      </div>
    </DepChatContext.Provider>
  );
}
