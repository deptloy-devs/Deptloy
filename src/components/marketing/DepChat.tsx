"use client";

import * as React from "react";
import Link from "next/link";
import { AlertCircle, Mic, RotateCcw, Send, Volume2, VolumeX, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { useChatSession } from "@/lib/chat/useChatSession";
import type { ChatMessagePayload } from "@/lib/chat/types";

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

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
}

const INTRO_MESSAGE: Message = {
  id: "intro",
  sender: "bot",
  text: "Hi, I’m Dep, Deptloy’s AI representative! I can walk you through our autonomous AI receptionists, custom software platforms, solution blueprints, or help scope your next engineering project. What would you like to explore?",
};

function renderFormattedMessage(text: string) {
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    const label = match[1];
    const url = match[2];
    parts.push(
      <Link
        key={`${match.index}-${url}`}
        href={url}
        className="font-semibold text-[#685bc7] underline underline-offset-2 hover:text-[#15134a] transition-colors"
      >
        {label}
      </Link>
    );
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}

export function DepChatProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [voiceEnabled, setVoiceEnabled] = React.useState(false);
  const [messages, setMessages] = React.useState<Message[]>([INTRO_MESSAGE]);
  const [inputVal, setInputVal] = React.useState("");
  const [isTyping, setIsTyping] = React.useState(false);
  const [isStreaming, setIsStreaming] = React.useState(false);
  const [isListening, setIsListening] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const msgsEndRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const lastUserPromptRef = React.useRef<string>("");

  const { containerRef: turnstileContainerRef, streamChat } = useChatSession();

  const speakText = React.useCallback(
    (text: string) => {
      if (!voiceEnabled || typeof window === "undefined" || !("speechSynthesis" in window)) return;
      window.speechSynthesis.cancel();
      // Remove markdown links syntax for clean audio speech
      const cleanedText = text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
      const utterance = new SpeechSynthesisUtterance(cleanedText);
      utterance.rate = 1.05;
      window.speechSynthesis.speak(utterance);
    },
    [voiceEnabled]
  );

  const handleUserSend = React.useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isStreaming) return;

      lastUserPromptRef.current = trimmed;
      setErrorMessage(null);

      const userMsg: Message = {
        id: `u-${Date.now()}`,
        sender: "user",
        text: trimmed,
      };

      const botMsgId = `b-${Date.now()}`;
      const botPlaceholder: Message = {
        id: botMsgId,
        sender: "bot",
        text: "",
      };

      const nextMessages = [...messages, userMsg];
      setMessages([...nextMessages, botPlaceholder]);
      setInputVal("");
      setIsTyping(true);
      setIsStreaming(true);

      // Build conversation history for API
      const historyPayload: ChatMessagePayload[] = nextMessages
        .filter((m) => m.text.trim().length > 0)
        .map((m) => ({
          role: m.sender === "user" ? "user" : "assistant",
          content: m.text,
        }));

      try {
        let finalReply = "";
        await streamChat({
          assistant: "dep",
          messages: historyPayload,
          onChunk: (accumulated) => {
            setIsTyping(false);
            finalReply = accumulated;
            setMessages((prev) =>
              prev.map((m) => (m.id === botMsgId ? { ...m, text: accumulated } : m))
            );
          },
        });

        setIsStreaming(false);
        setIsTyping(false);
        if (finalReply) {
          speakText(finalReply);
        }
      } catch (err: unknown) {
        setIsStreaming(false);
        setIsTyping(false);
        // Remove empty bot placeholder if it failed with no content
        setMessages((prev) => prev.filter((m) => m.id !== botMsgId || m.text.length > 0));
        const message =
          err instanceof Error ? err.message : "Unable to reach Dep. Please check your connection.";
        setErrorMessage(message);
      }
    },
    [messages, isStreaming, streamChat, speakText]
  );

  const handleRetry = React.useCallback(() => {
    if (lastUserPromptRef.current) {
      handleUserSend(lastUserPromptRef.current);
    }
  }, [handleUserSend]);

  const handleRestart = React.useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setMessages([INTRO_MESSAGE]);
    setErrorMessage(null);
    setIsTyping(false);
    setIsStreaming(false);
    setInputVal("");
  }, []);

  const openChat = React.useCallback(
    (initialMsg?: string) => {
      setIsOpen(true);
      if (initialMsg) {
        handleUserSend(initialMsg);
      }
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    },
    [handleUserSend]
  );

  const closeChat = React.useCallback(() => {
    setIsOpen(false);
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  }, []);

  React.useEffect(() => {
    msgsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping, errorMessage]);

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

      {/* Invisible Turnstile Verification Mount */}
      <div ref={turnstileContainerRef} className="hidden" aria-hidden="true" />

      {/* Floating launcher button in bottom right */}
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

      {/* Chat Slide-up Modal Dialog */}
      <div
        role="dialog"
        aria-label="Chat with Dep"
        className={cn(
          "fixed right-2.5 sm:right-6 bottom-2.5 sm:bottom-6 w-[390px] max-w-[calc(100vw-1.25rem)] h-[min(580px,calc(100svh-24px))] bg-white rounded-2xl shadow-[0_30px_90px_rgba(21,19,74,0.35)] border border-[rgba(87,80,168,0.18)] z-[75] flex flex-col overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.2,0.8,0.2,1)] origin-bottom-right",
          isOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none translate-y-6"
        )}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#15134a] to-[#2d2a85] text-white px-4 py-3 flex items-center justify-between gap-3 shrink-0">
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
              <div className="flex items-center gap-2">
                <p className="font-display font-bold text-sm tracking-tight text-white leading-tight">Dep</p>
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9.5px] font-mono font-semibold bg-[#fd9150]/20 text-[#fd9150] border border-[#fd9150]/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#fd9150] animate-pulse" />
                  AI Assistant
                </span>
              </div>
              <p className="text-[11px] text-[#d2cdf3]">Deptloy Studio Assistant</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleRestart}
              title="Restart conversation"
              aria-label="Restart conversation"
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white grid place-items-center transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-white/80" />
            </button>
            <button
              type="button"
              onClick={() => {
                setVoiceEnabled((v) => !v);
                if (voiceEnabled && typeof window !== "undefined" && "speechSynthesis" in window) {
                  window.speechSynthesis.cancel();
                }
              }}
              title={voiceEnabled ? "Mute speech" : "Read aloud"}
              aria-label={voiceEnabled ? "Mute speech" : "Read aloud"}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white grid place-items-center text-xs transition-colors cursor-pointer"
            >
              {voiceEnabled ? <Volume2 className="w-3.5 h-3.5 text-[#fd9150]" /> : <VolumeX className="w-3.5 h-3.5 text-white/70" />}
            </button>
            <button
              type="button"
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
          {messages.map((m) => {
            if (!m.text && m.sender === "bot" && isTyping) return null;
            return (
              <div
                key={m.id}
                className={cn(
                  "max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap",
                  m.sender === "bot"
                    ? "bg-white text-[#15134a] border border-[#e8e6f7] rounded-bl-sm shadow-sm"
                    : "bg-[#15134a] text-white self-end ml-auto rounded-br-sm"
                )}
              >
                {m.sender === "bot" ? renderFormattedMessage(m.text) : m.text}
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="bg-white border border-[#e8e6f7] text-[#15134a] max-w-[80px] px-3.5 py-2.5 rounded-2xl rounded-bl-sm flex items-center gap-1.5 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8478e0] animate-bounce" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#8478e0] animate-bounce [animation-delay:0.15s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#8478e0] animate-bounce [animation-delay:0.3s]" />
            </div>
          )}

          {/* Error State with Retry Button */}
          {errorMessage && (
            <div className="bg-red-50 border border-red-200 text-red-800 text-xs rounded-xl p-3 flex flex-col gap-2">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <p className="flex-1">{errorMessage}</p>
              </div>
              <button
                type="button"
                onClick={handleRetry}
                className="self-end px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-md font-semibold text-[11px] transition-colors cursor-pointer"
              >
                Retry
              </button>
            </div>
          )}

          <div ref={msgsEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="flex flex-wrap gap-1.5 px-3 py-2 bg-[#f4f3fb] border-t border-[#e8e6f7] shrink-0">
          {["What do you build?", "Test AI Receptionist", "Custom software platforms"].map((chip) => (
            <button
              key={chip}
              type="button"
              disabled={isStreaming}
              onClick={() => handleUserSend(chip)}
              className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white hover:bg-[#e8e6f7] border border-[#d2cdf3] text-[#15134a] transition-colors cursor-pointer disabled:opacity-50"
            >
              {chip}
            </button>
          ))}
          <Link
            href="/contact#form"
            onClick={closeChat}
            className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white hover:bg-[#e8e6f7] border border-[#d2cdf3] text-[#15134a] transition-colors cursor-pointer inline-flex items-center"
          >
            Discuss Your Project
          </Link>
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleUserSend(inputVal);
          }}
          className="p-3 bg-white border-t border-[#e8e6f7] flex items-center gap-2 shrink-0"
        >
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            disabled={isStreaming}
            placeholder={isStreaming ? "Dep is thinking…" : "Ask Dep anything…"}
            className="flex-1 min-w-0 px-3.5 py-2 text-sm rounded-full border border-[#d2cdf3] bg-[#f4f3fb] focus:outline-none focus:border-[#8478e0] text-[#15134a] disabled:opacity-60"
          />
          <button
            type="button"
            onClick={handleMicToggle}
            disabled={isStreaming}
            className={cn(
              "w-9 h-9 rounded-full grid place-items-center transition-colors cursor-pointer text-xs disabled:opacity-50 shrink-0",
              isListening ? "bg-[#fd9150] text-[#15134a] animate-pulse" : "bg-[#e8e6f7] text-[#15134a] hover:bg-[#d2cdf3]"
            )}
            title="Speech to text"
            aria-label="Speech to text"
          >
            <Mic className="w-4 h-4" />
          </button>
          <button
            type="submit"
            disabled={isStreaming || !inputVal.trim()}
            className="w-9 h-9 rounded-full bg-[#15134a] hover:bg-[#fd9150] text-white hover:text-[#15134a] grid place-items-center transition-colors cursor-pointer shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
            title="Send message"
            aria-label="Send message"
          >
            <Send className="w-4 h-4 ml-0.5" />
          </button>
        </form>
      </div>
    </DepChatContext.Provider>
  );
}
