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
    "Hello! I'm Dep, Deptloy's assistant. I can tell you about our AI receptionists, custom CRMs, automations, or help you book a consultation.",
  ],
  [
    /receptionist|phone|call(s)?|voice|answer/i,
    "Our AI receptionist answers phone calls 24/7 in your brand's voice with sub-500ms latency. It checks your real-time calendar, books appointments, answers FAQs, and logs every call directly into your CRM.",
  ],
  [
    /crm|pipeline|leads|contacts/i,
    "We build custom CRMs configured around how your team actually sells and serves clients. Call transcripts, notes, tasks, and follow-up stages are created automatically without manual data entry.",
  ],
  [
    /automat|workflow|busywork|integration/i,
    "We automate repetitive administrative busywork: instant SMS confirmations after calls, two-way calendar sync, reminder sequences that prevent no-shows, and team alerts when human attention is needed.",
  ],
  [
    /web|app|site|mobile|portal|dashboard/i,
    "We engineer high-performance Next.js websites, self-service client portals, booking dashboards, and mobile experiences built to convert traffic into revenue.",
  ],
  [
    /price|cost|pricing|quote|how much/i,
    "Every system is scoped around your operational volume. We provide clear, fixed project quotes with turnkey setup. Use the 'Get the Quote' form below or let me help you book a strategy call.",
  ],
  [
    /book|talk|contact|demo|meeting|call/i,
    "You can scroll down to our contact form, click 'Book a call' in the header, or email deptloy@gmail.com. We typically respond with a concrete scope within 4 hours.",
  ],
  [
    /build|service|offer|what do you do/i,
    "We combine four core services: AI voice receptionists, custom CRMs, workflow automations, and web & mobile apps into one unified, long-lasting system for your business.",
  ],
];

function getBotReply(question: string): string {
  const q = question.toLowerCase();
  for (const [re, answer] of KB) {
    if (re.test(q)) return answer;
  }
  return "I can explain our AI receptionists, custom CRMs, workflow automations, or help you request a quote. What would you like to explore?";
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

  const openChat = React.useCallback((initialMsg?: string) => {
    setIsOpen(true);
    if (initialMsg) {
      handleUserSend(initialMsg);
    }
    setTimeout(() => {
      inputRef.current?.focus();
    }, 300);
  }, []);

  const closeChat = React.useCallback(() => {
    setIsOpen(false);
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  }, []);

  React.useEffect(() => {
    msgsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const speakText = (text: string) => {
    if (!voiceEnabled || typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.05;
    window.speechSynthesis.speak(utterance);
  };

  const handleUserSend = (text: string) => {
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
  };

  const handleMicToggle = () => {
    if (typeof window === "undefined") return;
    const SpeechRecognition =
      (window as unknown as { SpeechRecognition?: any; webkitSpeechRecognition?: any }).SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition?: any }).webkitSpeechRecognition;

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

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          handleUserSend(transcript);
        }
      };

      recognition.start();
    } catch (e) {
      setIsListening(false);
    }
  };

  return (
    <DepChatContext.Provider value={{ isOpen, openChat, closeChat }}>
      {children}

      {/* Floating launcher button in bottom right */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Chat with Dep"
        className={cn(
          "fixed right-5 bottom-5 w-16 h-16 rounded-full bg-[#15134a] text-white shadow-2xl z-[70] grid place-items-center cursor-pointer transition-all duration-300 hover:scale-105 hover:bg-[#fd9150] hover:text-[#15134a]",
          isOpen ? "scale-90 opacity-0 pointer-events-none" : "scale-100 opacity-100"
        )}
      >
        <svg width="34" height="34" viewBox="0 0 40 40" fill="none">
          <rect x="5" y="8" width="30" height="24" rx="11" fill="#f7f5ff" />
          <rect x="9" y="12" width="22" height="16" rx="8" fill="#15134a" />
          <rect x="14" y="16" width="4" height="7" rx="2" fill="#bfe3f5" />
          <rect x="22" y="16" width="4" height="7" rx="2" fill="#bfe3f5" />
          <circle cx="20" cy="5" r="3" fill="#fd9150" />
        </svg>
      </button>

      {/* Chat Slide-up Modal Dialog */}
      <div
        role="dialog"
        aria-label="Chat with Dep"
        className={cn(
          "fixed right-4 sm:right-6 bottom-4 sm:bottom-6 w-[380px] max-w-[calc(100vw-2rem)] h-[min(560px,calc(100svh-40px))] bg-white rounded-2xl shadow-[0_30px_90px_rgba(21,19,74,0.35)] border border-[rgba(87,80,168,0.18)] z-[75] flex flex-col overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.2,0.8,0.2,1)] origin-bottom-right",
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
          {["What do you build?", "How does pricing work?", "Book a call"].map((chip) => (
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
