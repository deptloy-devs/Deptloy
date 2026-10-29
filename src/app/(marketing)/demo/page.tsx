"use client";

import * as React from "react";
import Link from "next/link";
import {
  Clock,
  CheckCircle2,
  RotateCcw,
  Send,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Mic,
} from "lucide-react";
import { VoiceReceptionist } from "@/components/marketing/voice-demo/VoiceReceptionist";
import { demoIndustries, demoTimeSlots } from "@/lib/site";
import type { DemoIndustryId, ChatMessage, DemoBookingState } from "@/types";

let messageCounter = 100;
function getNextId(prefix: string) {
  messageCounter += 1;
  return `${prefix}-${messageCounter}`;
}

export default function DemoPage() {
  // Stepper state: 1: Industry, 2: Service, 3: Contact & Time, 4: Review/Confirm
  const [currentStep, setCurrentStep] = React.useState<number>(1);

  // Selected industry
  const [selectedIndustryId, setSelectedIndustryId] = React.useState<DemoIndustryId>("clinic");

  const currentIndustry =
    demoIndustries.find((i) => i.id === selectedIndustryId) || demoIndustries[0];

  // Booking Form State
  const [bookingData, setBookingData] = React.useState<DemoBookingState>({
    industry: "clinic",
    serviceId: currentIndustry.services[0].id,
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    selectedDate: "2026-10-28",
    selectedTime: "10:30 AM",
    notes: "",
  });

  const [formErrors, setFormErrors] = React.useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isConfirmed, setIsConfirmed] = React.useState(false);
  const [confirmedBookingId, setConfirmedBookingId] = React.useState("");

  // Simulated Chat Messages
  const [messages, setMessages] = React.useState<ChatMessage[]>([
    {
      id: "msg-1",
      sender: "assistant",
      text: currentIndustry.assistantGreeting,
      timestamp: "Just now",
    },
  ]);
  const [inputMessage, setInputMessage] = React.useState("");
  // Right panel: the text simulator, or a live voice call.
  const [panelMode, setPanelMode] = React.useState<"text" | "voice">("text");
  const chatBottomRef = React.useRef<HTMLDivElement>(null);

  // When industry changes, reset selected service & conversation greeting
  const handleIndustryChange = (id: DemoIndustryId) => {
    setSelectedIndustryId(id);
    const ind = demoIndustries.find((i) => i.id === id) || demoIndustries[0];
    setBookingData((prev) => ({
      ...prev,
      industry: id,
      serviceId: ind.services[0].id,
    }));
    setMessages([
      {
        id: getNextId("msg"),
        sender: "assistant",
        text: ind.assistantGreeting,
        timestamp: "Just now",
      },
    ]);
  };

  const selectedService =
    currentIndustry.services.find((s) => s.id === bookingData.serviceId) ||
    currentIndustry.services[0];

  // Time Slots
  const availableSlots = demoTimeSlots;

  // Send message in interactive chat simulator
  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: getNextId("user"),
      sender: "customer",
      text,
      timestamp: "Just now",
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMessage("");

    // Simulate smart receptionist reasoning
    setTimeout(() => {
      let reply =
        "I understand. I can help coordinate that. Would you like to reserve an available time slot right now?";
      const lower = text.toLowerCase();

      if (lower.includes("hour") || lower.includes("open") || lower.includes("close")) {
        reply =
          "We are open Monday through Friday from 8:00 AM to 6:00 PM, and Saturdays from 9:00 AM to 2:00 PM. Would a morning or afternoon slot work better for you?";
      } else if (lower.includes("price") || lower.includes("cost") || lower.includes("fee")) {
        reply = `For ${selectedService.name}, the rate is ${selectedService.price} with an estimated duration of ${selectedService.duration}.`;
      } else if (lower.includes("reschedule") || lower.includes("cancel")) {
        reply =
          "You can reschedule or modify bookings at any time up to 24 hours prior to your slot. Just reply to your confirmation SMS or call back.";
      } else if (lower.includes("insurance") || lower.includes("delta") || lower.includes("payment")) {
        reply =
          "We accept most major PPO insurance plans and health benefit networks. We can collect your policy details during digital intake to verify coverage.";
      } else if (lower.includes("book") || lower.includes("appointment") || lower.includes("schedule") || lower.includes("tomorrow")) {
        reply = `I would be happy to schedule that for you. I have ${availableSlots[1]} or ${availableSlots[2]} open. Which one would you prefer?`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: getNextId("ai"),
          sender: "assistant",
          text: reply,
          timestamp: "Just now",
        },
      ]);
    }, 550);
  };

  React.useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Quick prefill helper for rapid tester convenience
  const handleFillDemoData = () => {
    setBookingData((prev) => ({
      ...prev,
      customerName: "Alex Jordan",
      customerEmail: "alex.jordan@example.com",
      customerPhone: "+1 (555) 234-5678",
      notes: "First-time consultation. Please send SMS reminder.",
    }));
    setFormErrors({});
  };

  // Form Validation for Step 3
  const validateStep3 = (): boolean => {
    const errs: Record<string, string> = {};
    if (!bookingData.customerName.trim()) {
      errs.customerName = "Name is required";
    }
    if (!bookingData.customerEmail.trim()) {
      errs.customerEmail = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(bookingData.customerEmail)) {
      errs.customerEmail = "Enter a valid email address";
    }
    if (!bookingData.customerPhone.trim()) {
      errs.customerPhone = "Phone number is required";
    }

    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNextStep = () => {
    if (currentStep === 1) setCurrentStep(2);
    else if (currentStep === 2) setCurrentStep(3);
    else if (currentStep === 3) {
      if (validateStep3()) setCurrentStep(4);
    }
  };

  const handleConfirmBooking = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsConfirmed(true);
      const ref = `BK-${Math.floor(100000 + Math.random() * 900000)}`;
      setConfirmedBookingId(ref);

      // Add confirmation event to chat
      setMessages((prev) => [
        ...prev,
        {
          id: getNextId("conf"),
          sender: "assistant",
          text: `Great news, ${bookingData.customerName}! Your simulated booking for "${selectedService.name}" on ${bookingData.selectedDate} at ${bookingData.selectedTime} is confirmed (Reference: ${ref}). In a live deployment, a calendar invite and confirmation SMS would now be dispatched.`,
          timestamp: "Just now",
        },
      ]);
    }, 800);
  };

  const handleStartAgain = () => {
    setCurrentStep(1);
    setIsConfirmed(false);
    setBookingData({
      industry: "clinic",
      serviceId: demoIndustries[0].services[0].id,
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      selectedDate: "2026-10-28",
      selectedTime: "10:30 AM",
      notes: "",
    });
    setFormErrors({});
    handleIndustryChange("clinic");
  };

  return (
    <div className="py-12 sm:py-16">
      <div className="wrap">
        {/* Header Section */}
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[var(--paper)] text-[var(--pur)] border border-[var(--peri)] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[var(--or)]" />
            Text &amp; Live Voice Simulation
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--deep)] leading-tight">
            AI Receptionist Simulator
          </h1>
          <p className="lead2 mt-2 text-sm sm:text-base">
            Experience how a tailored AI receptionist handles customer inquiries, service catalogs, and calendar slot booking.
          </p>

          {/* Honest Prototype Notice & Distinction from Dep Mascot */}
          <div className="mt-4 p-3 bg-white border-l-4 border-[var(--or)] text-xs text-[var(--mute)] shadow-sm space-y-1">
            <div>
              <strong>Demonstration Prototype:</strong> Chat by text, or switch to Voice and talk to the receptionist live in your browser. Bookings use sample data only.
            </div>
            <div className="text-[11px] text-[var(--pur)] font-mono">
              Note: This simulator represents the receptionist Deptloy builds for your company. In voice mode, Dep, our studio mascot, gives it a face.
            </div>
          </div>
        </div>

        {/* Stepper Progress Indicator */}
        <div className="mb-8 p-3 sm:p-4 bg-white border border-[rgba(21,19,74,0.12)] shadow-sm flex items-center justify-between text-xs font-mono">
          {[
            { step: 1, label: "1. Industry" },
            { step: 2, label: "2. Service" },
            { step: 3, label: "3. Details & Time" },
            { step: 4, label: "4. Confirm" },
          ].map((s, idx) => (
            <div key={idx} className="flex items-center gap-1.5 sm:gap-2">
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                  isConfirmed
                    ? "bg-[#16875b]/15 text-[#16875b] border border-[#16875b]/30"
                    : currentStep === s.step
                    ? "bg-[var(--deep)] text-white shadow-sm"
                    : currentStep > s.step
                    ? "bg-[var(--peri)] text-[var(--deep)] font-bold"
                    : "bg-[var(--paper)] text-[var(--mute)] border border-[var(--peri)]"
                }`}
              >
                {s.step}
              </span>
              <span
                className={`hidden md:inline font-semibold ${
                  currentStep === s.step ? "text-[var(--deep)] font-bold" : "text-[var(--mute)]"
                }`}
              >
                {s.label}
              </span>
              {idx < 3 && <ChevronRight className="w-3.5 h-3.5 text-[var(--peri)] hidden sm:block" />}
            </div>
          ))}
        </div>

        {/* Main 2-Column Interactive Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* LEFT COLUMN (7 cols): Stepper Workflow Container */}
          <div className="lg:col-span-7 bg-white border border-[rgba(21,19,74,0.14)] p-6 sm:p-8 shadow-[0_16px_40px_rgba(87,80,168,0.08)] flex flex-col justify-between min-h-[500px]"
            style={{
              clipPath: "polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 0 100%)",
            }}
          >
            {/* Confirmed Screen */}
            {isConfirmed ? (
              <div className="py-6 text-center space-y-5 my-auto">
                <div className="w-14 h-14 rounded-full bg-[#16875b]/15 text-[#16875b] grid place-items-center mx-auto border border-[#16875b]/30">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div>
                  <span className="text-xs font-mono font-bold uppercase text-[#16875b] tracking-wider">
                    Simulated Booking Successful
                  </span>
                  <h3 className="text-2xl font-extrabold text-[var(--deep)] mt-1">
                    Appointment Reserved
                  </h3>
                  <p className="text-xs font-mono text-[var(--pur)] mt-1">
                    Simulation Ref: {confirmedBookingId}
                  </p>
                </div>

                <div className="p-4 bg-[var(--paper)] border border-[var(--peri)] text-left text-xs space-y-2 max-w-md mx-auto rounded-sm">
                  <div className="flex justify-between pb-1.5 border-b border-[var(--mist)]">
                    <span className="text-[var(--mute)]">Industry:</span>
                    <span className="font-bold text-[var(--deep)]">{currentIndustry.name}</span>
                  </div>
                  <div className="flex justify-between pb-1.5 border-b border-[var(--mist)]">
                    <span className="text-[var(--mute)]">Service:</span>
                    <span className="font-bold text-[var(--deep)]">{selectedService.name}</span>
                  </div>
                  <div className="flex justify-between pb-1.5 border-b border-[var(--mist)]">
                    <span className="text-[var(--mute)]">Scheduled Slot:</span>
                    <span className="font-bold text-[var(--or)]">{bookingData.selectedDate} at {bookingData.selectedTime}</span>
                  </div>
                  <div className="flex justify-between pb-1.5 border-b border-[var(--mist)]">
                    <span className="text-[var(--mute)]">Caller Name:</span>
                    <span className="font-bold text-[var(--deep)]">{bookingData.customerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--mute)]">Simulated SMS:</span>
                    <span className="font-bold text-[#16875b]">Dispatched to {bookingData.customerPhone}</span>
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={handleStartAgain}
                    className="btn ghost sm inline-flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Test Another Vertical</span>
                  </button>
                  <Link
                    href="/contact#form"
                    className="btn sm"
                    style={{ background: "var(--or)", color: "var(--deep)", fontWeight: 700 }}
                  >
                    <span>Deploy For Your Business</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Link>
                </div>
              </div>
            ) : (
              <div>
                {/* STEP 1: Select Industry */}
                {currentStep === 1 && (
                  <div className="space-y-5">
                    <div>
                      <span className="text-xs font-mono text-[var(--pur)] uppercase font-bold">Step 1 of 4</span>
                      <h2 className="text-xl sm:text-2xl font-extrabold text-[var(--deep)] mt-1">
                        Select a Sample Business Industry
                      </h2>
                      <p className="text-xs sm:text-sm text-[var(--mute)] mt-1">
                        Choose an industry to see how the assistant adapts its greeting, service catalog, and conversational tone.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {demoIndustries.map((ind) => (
                        <button
                          key={ind.id}
                          type="button"
                          onClick={() => handleIndustryChange(ind.id)}
                          className={`p-3.5 text-left border rounded-sm transition-all cursor-pointer ${
                            selectedIndustryId === ind.id
                              ? "bg-[var(--paper)] border-[var(--pur)] ring-2 ring-[var(--pur)]/40 shadow-sm"
                              : "bg-white border-[var(--peri)] hover:bg-[var(--mist)]/40"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-bold text-[var(--deep)]">{ind.name}</span>
                            <span className="text-[10px] font-mono text-[var(--pur)] uppercase font-bold bg-white px-1.5 py-0.5 border border-[var(--peri)]">
                              {ind.category}
                            </span>
                          </div>
                          <p className="text-xs text-[var(--mute)] truncate">{ind.services[0].name}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 2: Select Service */}
                {currentStep === 2 && (
                  <div className="space-y-5">
                    <div>
                      <span className="text-xs font-mono text-[var(--pur)] uppercase font-bold">Step 2 of 4</span>
                      <h2 className="text-xl sm:text-2xl font-extrabold text-[var(--deep)] mt-1">
                        Select Service for {currentIndustry.name}
                      </h2>
                      <p className="text-xs sm:text-sm text-[var(--mute)] mt-1">
                        The AI checks real calendar slot availability based on configured service durations.
                      </p>
                    </div>

                    <div className="space-y-2.5">
                      {currentIndustry.services.map((srv) => (
                        <button
                          key={srv.id}
                          type="button"
                          onClick={() => setBookingData({ ...bookingData, serviceId: srv.id })}
                          className={`w-full p-3.5 text-left border rounded-sm transition-all cursor-pointer flex items-center justify-between ${
                            bookingData.serviceId === srv.id
                              ? "bg-[var(--paper)] border-[var(--pur)] ring-2 ring-[var(--pur)]/40 shadow-sm"
                              : "bg-white border-[var(--peri)] hover:bg-[var(--mist)]/40"
                          }`}
                        >
                          <div>
                            <h3 className="text-sm font-bold text-[var(--deep)]">{srv.name}</h3>
                            <div className="flex items-center gap-3 text-xs text-[var(--mute)] mt-1">
                              <span className="flex items-center gap-1 font-mono">
                                <Clock className="w-3 h-3 text-[var(--pur)]" /> {srv.duration}
                              </span>
                              <span>•</span>
                              <span className="font-mono font-bold text-[var(--deep)]">{srv.price}</span>
                            </div>
                          </div>
                          <span
                            className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                              bookingData.serviceId === srv.id
                                ? "border-[var(--pur)] bg-[var(--pur)]"
                                : "border-slate-300"
                            }`}
                          >
                            {bookingData.serviceId === srv.id && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 3: Contact & Slot Selection */}
                {currentStep === 3 && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs font-mono text-[var(--pur)] uppercase font-bold">Step 3 of 4</span>
                        <h2 className="text-xl sm:text-2xl font-extrabold text-[var(--deep)] mt-1">
                          Caller Details &amp; Preferred Time
                        </h2>
                      </div>
                      <button
                        type="button"
                        onClick={handleFillDemoData}
                        className="px-2.5 py-1 text-xs font-mono font-bold uppercase text-[var(--pur)] bg-[var(--paper)] border border-[var(--peri)] hover:bg-[var(--mist)] transition-colors cursor-pointer"
                      >
                        ⚡ Pre-fill Sample
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-mono font-bold uppercase text-[var(--mute)] mb-1">
                          Preferred Date
                        </label>
                        <input
                          type="date"
                          value={bookingData.selectedDate}
                          min="2026-10-25"
                          onChange={(e) => setBookingData({ ...bookingData, selectedDate: e.target.value })}
                          className="w-full bg-[var(--paper)] border border-[var(--peri)] p-2.5 text-xs rounded-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono font-bold uppercase text-[var(--mute)] mb-1">
                          Caller Full Name *
                        </label>
                        <input
                          type="text"
                          value={bookingData.customerName}
                          placeholder="e.g. Alex Jordan"
                          onChange={(e) => {
                            setBookingData({ ...bookingData, customerName: e.target.value });
                            setFormErrors((prev) => ({ ...prev, customerName: "" }));
                          }}
                          className={`w-full bg-[var(--paper)] border p-2.5 text-xs rounded-sm ${
                            formErrors.customerName ? "border-red-500" : "border-[var(--peri)]"
                          }`}
                        />
                        {formErrors.customerName && (
                          <span className="text-[10px] text-red-500 mt-0.5 block">{formErrors.customerName}</span>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-mono font-bold uppercase text-[var(--mute)] mb-1">
                          Caller Email *
                        </label>
                        <input
                          type="email"
                          value={bookingData.customerEmail}
                          placeholder="alex@example.com"
                          onChange={(e) => {
                            setBookingData({ ...bookingData, customerEmail: e.target.value });
                            setFormErrors((prev) => ({ ...prev, customerEmail: "" }));
                          }}
                          className={`w-full bg-[var(--paper)] border p-2.5 text-xs rounded-sm ${
                            formErrors.customerEmail ? "border-red-500" : "border-[var(--peri)]"
                          }`}
                        />
                        {formErrors.customerEmail && (
                          <span className="text-[10px] text-red-500 mt-0.5 block">{formErrors.customerEmail}</span>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-mono font-bold uppercase text-[var(--mute)] mb-1">
                          Mobile Phone * (For SMS Preview)
                        </label>
                        <input
                          type="tel"
                          value={bookingData.customerPhone}
                          placeholder="+1 (555) 000-0000"
                          onChange={(e) => {
                            setBookingData({ ...bookingData, customerPhone: e.target.value });
                            setFormErrors((prev) => ({ ...prev, customerPhone: "" }));
                          }}
                          className={`w-full bg-[var(--paper)] border p-2.5 text-xs rounded-sm ${
                            formErrors.customerPhone ? "border-red-500" : "border-[var(--peri)]"
                          }`}
                        />
                        {formErrors.customerPhone && (
                          <span className="text-[10px] text-red-500 mt-0.5 block">{formErrors.customerPhone}</span>
                        )}
                      </div>
                    </div>

                    {/* Time Slots */}
                    <div>
                      <label className="block text-xs font-mono font-bold uppercase text-[var(--mute)] mb-1.5">
                        Available Calendar Slots ({selectedService.duration})
                      </label>
                      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                        {availableSlots.map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setBookingData({ ...bookingData, selectedTime: slot })}
                            className={`p-2 text-center text-xs font-mono font-bold rounded-xs border transition-colors cursor-pointer ${
                              bookingData.selectedTime === slot
                                ? "bg-[var(--deep)] text-white border-[var(--deep)] shadow-sm"
                                : "bg-white text-[var(--deep)] border-[var(--peri)] hover:bg-[var(--paper)]"
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 4: Review Parameters */}
                {currentStep === 4 && (
                  <div className="space-y-4">
                    <div>
                      <span className="text-xs font-mono text-[var(--pur)] uppercase font-bold">Step 4 of 4</span>
                      <h2 className="text-xl sm:text-2xl font-extrabold text-[var(--deep)] mt-1">
                        Review Booking Parameters
                      </h2>
                      <p className="text-xs sm:text-sm text-[var(--mute)] mt-1">
                        Confirming writes this reservation into the simulator state and sends an assistant confirmation.
                      </p>
                    </div>

                    <div className="p-4 bg-[var(--paper)] border border-[var(--peri)] text-xs space-y-2 rounded-sm">
                      <div className="flex justify-between pb-1.5 border-b border-[var(--mist)]">
                        <span className="text-[var(--mute)]">Selected Vertical:</span>
                        <span className="font-bold text-[var(--deep)]">{currentIndustry.name}</span>
                      </div>
                      <div className="flex justify-between pb-1.5 border-b border-[var(--mist)]">
                        <span className="text-[var(--mute)]">Service &amp; Price:</span>
                        <span className="font-bold text-[var(--deep)]">{selectedService.name} ({selectedService.price})</span>
                      </div>
                      <div className="flex justify-between pb-1.5 border-b border-[var(--mist)]">
                        <span className="text-[var(--mute)]">Date &amp; Time Slot:</span>
                        <span className="font-bold text-[var(--or)]">{bookingData.selectedDate} at {bookingData.selectedTime}</span>
                      </div>
                      <div className="flex justify-between pb-1.5 border-b border-[var(--mist)]">
                        <span className="text-[var(--mute)]">Caller Name:</span>
                        <span className="font-bold text-[var(--deep)]">{bookingData.customerName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[var(--mute)]">Phone &amp; Email:</span>
                        <span className="font-bold text-[var(--deep)]">{bookingData.customerPhone} • {bookingData.customerEmail}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Stepper Navigation Buttons */}
            {!isConfirmed && (
              <div className="pt-6 mt-6 border-t border-[var(--mist)] flex items-center justify-between">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentStep((prev) => prev - 1)}
                    className="btn ghost sm"
                  >
                    Back
                  </button>
                ) : (
                  <span className="text-xs font-mono text-[var(--mute)]">Industry: {currentIndustry.name}</span>
                )}

                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="btn sm"
                    style={{ background: "var(--deep)", color: "#fff" }}
                  >
                    <span>Continue to Step {currentStep + 1}</span>
                    <ChevronRight className="w-3.5 h-3.5 ml-1" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleConfirmBooking}
                    disabled={isSubmitting}
                    className="btn sm"
                    style={{ background: "var(--or)", color: "var(--deep)", fontWeight: 700 }}
                  >
                    <CheckCircle2 className="w-4 h-4 mr-1" />
                    <span>{isSubmitting ? "Locking Slot..." : "Simulate Instant Booking"}</span>
                  </button>
                )}
              </div>
            )}
          </div>

          {/* RIGHT COLUMN (5 cols): Conversational Phone / Chat Simulator */}
          <div className="lg:col-span-5 bg-[var(--deep)] text-white rounded-sm shadow-xl flex flex-col justify-between h-[540px] border border-white/10 relative overflow-hidden"
            style={{
              clipPath: "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 0 100%)",
            }}
          >
            {/* Receptionist Header Bar */}
            <div className="p-4 bg-black/20 border-b border-white/10 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[var(--or)] text-[var(--deep)] grid place-items-center font-bold font-mono text-xs shadow-sm">
                  AI
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                    {currentIndustry.name} Receptionist
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  </h3>
                  <span className="text-[10px] font-mono text-[var(--peri)]">
                    {panelMode === "voice" ? "Live Voice Engine Active" : "Text Intake Engine Active"}
                  </span>
                </div>
              </div>

              {/* Text / live voice switch */}
              <div
                role="tablist"
                aria-label="Receptionist demo mode"
                className="flex items-center p-0.5 rounded-full bg-white/10 border border-white/15 text-[10px] font-mono"
              >
                {(["text", "voice"] as const).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    role="tab"
                    aria-selected={panelMode === mode}
                    onClick={() => setPanelMode(mode)}
                    className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full transition-colors cursor-pointer ${
                      panelMode === mode ? "bg-white text-[var(--deep)] font-bold" : "text-[#cfd2ee] hover:text-white"
                    }`}
                  >
                    {mode === "voice" && <Mic className="w-3 h-3" />}
                    {mode === "voice" ? "Voice" : "Text"}
                    {mode === "voice" && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" aria-label="live" />}
                  </button>
                ))}
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
            <div className="p-2.5 bg-black/10 border-b border-white/10 shrink-0">
              <span className="text-[10px] font-mono uppercase text-[var(--peri)] block mb-1.5">
                Ask Sample Question:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {currentIndustry.sampleQuestions.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => handleSendMessage(q)}
                    className="px-2 py-1 text-[10px] font-mono bg-white/10 hover:bg-white/20 border border-white/15 text-white rounded-xs truncate max-w-[200px] transition-colors cursor-pointer"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Message Thread */}
            <div className="p-4 flex-1 overflow-y-auto space-y-3 text-xs leading-relaxed">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.sender === "customer" ? "items-end" : "items-start"
                  }`}
                >
                  <span className="text-[9px] font-mono text-slate-400 mb-0.5">
                    {msg.sender === "customer" ? "Caller" : "AI Receptionist"}
                  </span>
                  <div
                    className={`p-3 max-w-[85%] rounded-sm ${
                      msg.sender === "customer"
                        ? "bg-[var(--or)] text-[var(--deep)] font-medium rounded-tr-none"
                        : "bg-white/10 text-white border border-white/10 rounded-tl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={chatBottomRef} />
            </div>

            {/* Chat Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 bg-black/20 border-t border-white/10 flex items-center gap-2 shrink-0"
            >
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask about hours, fees, or slot availability..."
                className="flex-1 bg-white/10 border border-white/15 text-white placeholder:text-slate-400 p-2 text-xs rounded-sm focus:outline-none focus:border-[var(--or)]"
              />
              <button
                type="button"
                onClick={() => setPanelMode("voice")}
                aria-label="Talk to the receptionist"
                title="Talk to the receptionist"
                className="h-8 px-2.5 rounded-sm border border-white/20 bg-white/10 text-white text-[10px] font-mono font-bold flex items-center gap-1.5 hover:bg-white/20 transition-colors cursor-pointer shrink-0"
              >
                <Mic className="w-3.5 h-3.5 text-[var(--or)]" />
                <span className="hidden sm:inline">Talk</span>
              </button>
              <button
                type="submit"
                aria-label="Send message"
                className="w-8 h-8 rounded-sm bg-[var(--or)] text-[var(--deep)] grid place-items-center hover:bg-white transition-colors cursor-pointer shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
