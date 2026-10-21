"use client";

import * as React from "react";
import {
  Clock,
  CheckCircle2,
  RotateCcw,
  Send,
  ChevronRight,
  ShieldAlert,
  ArrowRight,
  Bot,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Field";
import { Badge } from "@/components/ui/Badge";
import { demoIndustries } from "@/lib/site";
import type {
  DemoIndustryId,
  ChatMessage,
  DemoBookingState,
} from "@/types";

let messageCounter = 100;
function getNextId(prefix: string) {
  messageCounter += 1;
  return `${prefix}-${messageCounter}`;
}

export default function DemoPage() {
  // Step state: 1: Industry, 2: Service, 3: Contact & Time, 4: Review/Confirm
  const [currentStep, setCurrentStep] = React.useState<number>(1);

  // Selected industry
  const [selectedIndustryId, setSelectedIndustryId] =
    React.useState<DemoIndustryId>("clinic");

  const currentIndustry =
    demoIndustries.find((i) => i.id === selectedIndustryId) || demoIndustries[0];

  // Booking Form State
  const [bookingData, setBookingData] = React.useState<DemoBookingState>({
    industry: "clinic",
    serviceId: currentIndustry.services[0].id,
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    selectedDate: "2026-10-24",
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
  const availableSlots = [
    "09:00 AM",
    "10:30 AM",
    "01:15 PM",
    "02:45 PM",
    "04:15 PM",
    "05:30 PM",
  ];

  // Send message in interactive chat
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

    // Simulate smart AI response
    setTimeout(() => {
      let reply = "I understand. I can certainly help coordinate that. Would you like to reserve an available time slot right now?";
      const lower = text.toLowerCase();

      if (lower.includes("hour") || lower.includes("open") || lower.includes("close")) {
        reply = "We are open Monday through Friday from 8:00 AM to 6:00 PM, and Saturdays from 9:00 AM to 2:00 PM.";
      } else if (lower.includes("price") || lower.includes("cost") || lower.includes("fee")) {
        reply = `For ${selectedService.name}, the standard rate is ${selectedService.price} with a scheduled duration of ${selectedService.duration}.`;
      } else if (lower.includes("reschedule") || lower.includes("cancel")) {
        reply = "You can reschedule or modify bookings at any time up to 24 hours prior to your slot at no penalty.";
      } else if (lower.includes("insurance") || lower.includes("delta")) {
        reply = "We accept most major PPO insurance plans including Delta Dental, BlueCross, and Cigna. We can verify benefits prior to your appointment.";
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
    }, 600);
  };

  React.useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Form Validation
  const validateStep3 = (): boolean => {
    const errs: Record<string, string> = {};
    if (!bookingData.customerName.trim()) {
      errs.customerName = "Name is required";
    }
    if (!bookingData.customerEmail.trim()) {
      errs.customerEmail = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(bookingData.customerEmail)) {
      errs.customerEmail = "Enter a valid email";
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
          text: `Awesome news, ${bookingData.customerName}! Your appointment for "${selectedService.name}" on ${bookingData.selectedDate} at ${bookingData.selectedTime} is confirmed (Ref: ${ref}). A calendar invite and simulated SMS have been dispatched.`,
          timestamp: "Just now",
        },
      ]);
    }, 1000);
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
      selectedDate: "2026-10-24",
      selectedTime: "10:30 AM",
      notes: "",
    });
    setFormErrors({});
    handleIndustryChange("clinic");
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <section className="relative pt-12 pb-8 lg:pt-16 lg:pb-10 border-b border-line bg-canvas">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <Badge variant="brand" dot className="mb-3">
            Interactive Frontend Prototype
          </Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-fg tracking-tight mb-3">
            Experience the AI Receptionist
          </h1>
          <p className="text-sm sm:text-base text-fg-soft">
            Simulate how a customer interacts with our conversational booking engine across multiple industries in real time.
          </p>

          {/* Persistent Honest Notice */}
          <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-warning/10 border border-warning/20 text-brand-300 text-xs">
            <ShieldAlert className="h-4 w-4 shrink-0 text-brand-300" />
            <span>
              <strong>Demonstration Prototype:</strong> This simulated workflow does not charge credit cards or add real entries to your personal calendar.
            </span>
          </div>
        </div>
      </section>

      {/* Main Interactive Workspace: 2 Columns */}
      <section className="py-10 bg-surface flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column (7 cols): Step-by-Step Interactive Booking Engine */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              
              {/* Stepper Progress Indicator */}
              <div className="rounded-card bg-card border border-line p-4 flex items-center justify-between text-xs">
                {[
                  { step: 1, label: "Industry" },
                  { step: 2, label: "Service" },
                  { step: 3, label: "Details & Time" },
                  { step: 4, label: "Review & Confirm" },
                ].map((s, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span
                      className={`h-6 w-6 rounded-full flex items-center justify-center font-bold text-xs ${
                        isConfirmed
                          ? "bg-success/20 text-success border border-success/30"
                          : currentStep === s.step
                          ? "bg-brand-600 text-fg shadow-md shadow-brand-600/40"
                          : currentStep > s.step
                          ? "bg-brand-500/20 text-brand-300"
                          : "bg-raised-hover text-fg-subtle"
                      }`}
                    >
                      {s.step}
                    </span>
                    <span
                      className={`hidden sm:inline font-medium ${
                        currentStep === s.step ? "text-fg" : "text-fg-subtle"
                      }`}
                    >
                      {s.label}
                    </span>
                    {idx < 3 && <ChevronRight className="h-4 w-4 text-fg-subtle hidden sm:block" />}
                  </div>
                ))}
              </div>

              {/* Step Content Container */}
              <div className="rounded-panel bg-card border border-line p-6 sm:p-8 shadow-card relative min-h-[440px] flex flex-col justify-between">
                
                {/* Confirmed Screen */}
                {isConfirmed ? (
                  <div className="py-8 text-center space-y-6">
                    <div className="mx-auto h-16 w-16 rounded-full bg-success/20 border border-success/40 flex items-center justify-center text-success">
                      <CheckCircle2 className="h-8 w-8" />
                    </div>

                    <div className="space-y-1">
                      <span className="text-xs uppercase font-mono text-success tracking-wider">
                        Simulated Reservation Complete
                      </span>
                      <h3 className="text-2xl font-bold text-fg">
                        Appointment Confirmed!
                      </h3>
                      <p className="text-xs text-fg-muted font-mono">
                        Booking ID: {confirmedBookingId}
                      </p>
                    </div>

                    <div className="rounded-card bg-raised border border-line p-5 text-left text-xs space-y-2.5 max-w-md mx-auto">
                      <div className="flex justify-between pb-2 border-b border-line">
                        <span className="text-fg-muted">Industry:</span>
                        <span className="text-fg font-medium">{currentIndustry.name}</span>
                      </div>
                      <div className="flex justify-between pb-2 border-b border-line">
                        <span className="text-fg-muted">Service:</span>
                        <span className="text-fg font-medium">{selectedService.name}</span>
                      </div>
                      <div className="flex justify-between pb-2 border-b border-line">
                        <span className="text-fg-muted">Date & Time:</span>
                        <span className="text-brand-300 font-bold">{bookingData.selectedDate} at {bookingData.selectedTime}</span>
                      </div>
                      <div className="flex justify-between pb-2 border-b border-line">
                        <span className="text-fg-muted">Customer:</span>
                        <span className="text-fg">{bookingData.customerName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-fg-muted">SMS Notification:</span>
                        <span className="text-success font-medium">Simulated Dispatched</span>
                      </div>
                    </div>

                    <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                      <Button onClick={handleStartAgain} variant="secondary" size="md" leftIcon={<RotateCcw className="h-4 w-4" />}>
                        Start Again
                      </Button>
                      <Button href="/dashboard" variant="primary" size="md">
                        View in Client Dashboard
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div>
                    {/* STEP 1: Select Industry */}
                    {currentStep === 1 && (
                      <div className="space-y-5">
                        <div>
                          <h2 className="text-xl font-bold text-fg">Select Sample Business Vertical</h2>
                          <p className="text-xs text-fg-muted mt-1">
                            Choose an industry to simulate its specialized booking rules and assistant tone.
                          </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {demoIndustries.map((ind) => (
                            <button
                              key={ind.id}
                              type="button"
                              onClick={() => handleIndustryChange(ind.id)}
                              className={`p-4 rounded-card border text-left transition-all ${
                                selectedIndustryId === ind.id
                                  ? "bg-brand-600/15 border-brand-500/50 shadow-[0_0_20px_rgba(139,92,246,0.15)] ring-1 ring-brand-500/50"
                                  : "bg-raised border-line hover:border-line-strong"
                              }`}
                            >
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-bold text-fg">{ind.name}</span>
                                <span className="text-xs text-brand-400 uppercase font-mono">{ind.category}</span>
                              </div>
                              <p className="text-xs text-fg-muted line-clamp-2">{ind.services[0].name}</p>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* STEP 2: Select Service */}
                    {currentStep === 2 && (
                      <div className="space-y-5">
                        <div>
                          <h3 className="text-xl font-bold text-fg">Select Service Offering</h3>
                          <p className="text-xs text-fg-muted mt-1">
                            Configured service catalog for {currentIndustry.name}.
                          </p>
                        </div>

                        <div className="space-y-3">
                          {currentIndustry.services.map((srv) => (
                            <button
                              key={srv.id}
                              type="button"
                              onClick={() => setBookingData({ ...bookingData, serviceId: srv.id })}
                              className={`w-full p-4 rounded-card border text-left transition-all flex items-center justify-between ${
                                bookingData.serviceId === srv.id
                                  ? "bg-brand-600/15 border-brand-500/50 ring-1 ring-brand-500/50 shadow-md"
                                  : "bg-raised border-line hover:border-line-strong"
                              }`}
                            >
                              <div>
                                <h3 className="text-sm font-bold text-fg">{srv.name}</h3>
                                <div className="flex items-center gap-3 text-xs text-fg-muted mt-1">
                                  <span className="flex items-center gap-1">
                                    <Clock className="h-3 w-3 text-brand-400" /> {srv.duration}
                                  </span>
                                  <span>•</span>
                                  <span>{srv.price}</span>
                                </div>
                              </div>
                              <span className={`h-4 w-4 rounded-full border flex items-center justify-center ${
                                bookingData.serviceId === srv.id ? "border-brand-400 bg-brand-400" : "border-slate-600"
                              }`}>
                                {bookingData.serviceId === srv.id && <span className="h-1.5 w-1.5 rounded-full bg-black" />}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* STEP 3: Contact & Slot Selection */}
                    {currentStep === 3 && (
                      <div className="space-y-5">
                        <div>
                          <h3 className="text-xl font-bold text-fg">Customer Info & Desired Time</h3>
                          <p className="text-xs text-fg-muted mt-1">
                            Input details to simulate caller contact intake.
                          </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <Input
                            label="Customer Full Name"
                            placeholder="e.g. Elena Woods"
                            value={bookingData.customerName}
                            onChange={(e) => setBookingData({ ...bookingData, customerName: e.target.value })}
                            error={formErrors.customerName}
                            required
                          />
                          <Input
                            label="Customer Phone"
                            placeholder="+1 (555) 234-5678"
                            value={bookingData.customerPhone}
                            onChange={(e) => setBookingData({ ...bookingData, customerPhone: e.target.value })}
                            error={formErrors.customerPhone}
                            required
                          />
                        </div>

                        <Input
                          label="Customer Email"
                          type="email"
                          placeholder="elena@example.com"
                          value={bookingData.customerEmail}
                          onChange={(e) => setBookingData({ ...bookingData, customerEmail: e.target.value })}
                          error={formErrors.customerEmail}
                          required
                        />

                        {/* Preferred Time Slots */}
                        <div>
                          <label className="text-xs font-semibold uppercase tracking-wider text-fg-soft block mb-2">
                            Available Real-Time Slots (Thursday, Oct 24)
                          </label>
                          <div className="grid grid-cols-3 gap-2">
                            {availableSlots.map((slot) => (
                              <button
                                key={slot}
                                type="button"
                                onClick={() => setBookingData({ ...bookingData, selectedTime: slot })}
                                className={`py-2 px-3 rounded-control text-xs font-semibold transition-all ${
                                  bookingData.selectedTime === slot
                                    ? "bg-brand-600 text-fg shadow-md shadow-brand-600/30"
                                    : "bg-raised text-fg-soft border border-line hover:border-line-strong"
                                }`}
                              >
                                {slot}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* STEP 4: Review Selections */}
                    {currentStep === 4 && (
                      <div className="space-y-5">
                        <div>
                          <h3 className="text-xl font-bold text-fg">Review Appointment Parameters</h3>
                          <p className="text-xs text-fg-muted mt-1">
                            Verify your simulated details prior to testing confirmation.
                          </p>
                        </div>

                        <div className="rounded-card bg-raised border border-line p-5 space-y-3 text-xs">
                          <div className="flex justify-between pb-2 border-b border-line">
                            <span className="text-fg-muted">Industry:</span>
                            <span className="text-fg font-medium">{currentIndustry.name}</span>
                          </div>
                          <div className="flex justify-between pb-2 border-b border-line">
                            <span className="text-fg-muted">Service:</span>
                            <span className="text-fg font-medium">{selectedService.name}</span>
                          </div>
                          <div className="flex justify-between pb-2 border-b border-line">
                            <span className="text-fg-muted">Duration & Fee:</span>
                            <span className="text-fg-soft">{selectedService.duration} • {selectedService.price}</span>
                          </div>
                          <div className="flex justify-between pb-2 border-b border-line">
                            <span className="text-fg-muted">Reserved Slot:</span>
                            <span className="text-brand-300 font-bold">{bookingData.selectedDate} at {bookingData.selectedTime}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-fg-muted">Client:</span>
                            <span className="text-fg">{bookingData.customerName} ({bookingData.customerPhone})</span>
                          </div>
                        </div>

                        <div className="p-3.5 rounded-control bg-brand-500/10 border border-brand-500/20 text-xs text-brand-300">
                          Clicking &ldquo;Simulate Booking&rdquo; will demonstrate the confirmation flow, generate a booking token, and update the conversation transcript.
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Footer Controls (when not confirmed) */}
                {!isConfirmed && (
                  <div className="pt-6 mt-6 border-t border-line flex items-center justify-between">
                    {currentStep > 1 ? (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setCurrentStep(currentStep - 1)}
                      >
                        Back
                      </Button>
                    ) : (
                      <div />
                    )}

                    {currentStep < 4 ? (
                      <Button
                        type="button"
                        variant="primary"
                        size="md"
                        onClick={handleNextStep}
                        rightIcon={<ArrowRight className="h-4 w-4" />}
                      >
                        Continue to Step {currentStep + 1}
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        variant="primary"
                        size="md"
                        isLoading={isSubmitting}
                        onClick={handleConfirmBooking}
                      >
                        Simulate Booking
                      </Button>
                    )}
                  </div>
                )}

              </div>
            </div>

            {/* Right Column (5 cols): Live Conversation Panel & Interactive Chat */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="rounded-panel bg-card border border-line p-5 sm:p-6 shadow-card flex flex-col h-[580px]">
                
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-line">
                  <div className="flex items-center gap-2.5">
                    <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-brand-600 to-brand-500 flex items-center justify-center text-fg">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-fg">Receptionist Stream</h3>
                      <p className="text-xs text-fg-muted">Simulated AI Telephony</p>
                    </div>
                  </div>

                  <span className="flex items-center gap-1.5 text-xs text-success bg-success/10 px-2 py-0.5 rounded-full border border-success/20 font-mono">
                    <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
                    Interactive
                  </span>
                </div>

                {/* Messages Scroll Area */}
                <div className="flex-1 overflow-y-auto py-4 space-y-3 pr-1">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${
                        msg.sender === "customer" ? "items-end" : "items-start"
                      }`}
                    >
                      <div
                        className={`max-w-[88%] p-3 rounded-card text-xs leading-relaxed ${
                          msg.sender === "customer"
                            ? "bg-brand-600 text-fg rounded-br-none"
                            : "bg-raised text-fg-soft rounded-bl-none border border-line"
                        }`}
                      >
                        {msg.text}
                      </div>
                      <span className="text-xs text-fg-subtle mt-1 px-1">
                        {msg.sender === "customer" ? "You" : "Deptloy Assistant"} • {msg.timestamp}
                      </span>
                    </div>
                  ))}
                  <div ref={chatBottomRef} />
                </div>

                {/* Quick Prompts */}
                <div className="py-2 border-t border-line">
                  <span className="text-xs text-fg-subtle uppercase font-semibold block mb-1.5">
                    Quick Sample Questions:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {currentIndustry.sampleQuestions.map((q, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSendMessage(q)}
                        className="text-xs px-2.5 py-1 rounded-full bg-white/[0.04] text-fg-soft hover:text-fg hover:bg-white/10 border border-line transition-colors"
                      >
                        &ldquo;{q}&rdquo;
                      </button>
                    ))}
                  </div>
                </div>

                {/* Input Bar */}
                <div className="pt-2 flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Type an inquiry (e.g. hours, pricing)..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSendMessage();
                    }}
                    className="flex-1 h-9 px-3 rounded-control bg-raised border border-line text-xs text-fg placeholder:text-fg-subtle focus:outline-none focus:ring-1 focus:ring-brand-400"
                  />
                  <button
                    type="button"
                    onClick={() => handleSendMessage()}
                    className="h-9 w-9 rounded-control bg-brand-600 text-fg flex items-center justify-center hover:bg-brand-500 transition-colors"
                    aria-label="Send message"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
