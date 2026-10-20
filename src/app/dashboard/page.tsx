"use client";

import * as React from "react";
import {
  CalendarCheck,
  Clock,
  Users,
  PhoneCall,
  Bot,
  Search,
  Volume2,
  CheckCircle2,
  Copy,
  Play,
  Calendar as CalendarIcon,
  Save,
} from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { Sidebar, type DashboardTab } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/Button";
import { Input, Textarea, Select } from "@/components/ui/Field";
import { Modal } from "@/components/ui/Modal";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import type {
  DashboardAppointment,
  DashboardContact,
  DashboardCallRecord,
  DashboardIntegration,
  ReceptionistConfig,
} from "@/types";

export default function DashboardPage() {
  const [currentTab, setCurrentTab] = React.useState<DashboardTab>("overview");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [selectedOrg, setSelectedOrg] = React.useState("Apex Medical & Dental Group");

  // Toast alert state
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // 1. APPOINTMENTS STATE & DEMO DATA
  const initialAppointments: DashboardAppointment[] = [
    {
      id: "APT-101",
      customerName: "Sarah Jenkins",
      customerEmail: "sarah.j@gmail.com",
      customerPhone: "+1 (555) 782-9014",
      service: "Comprehensive Dental Examination",
      date: "Today, Oct 20",
      time: "03:15 PM",
      status: "confirmed",
      channel: "AI Voice",
      notes: "First-time patient. Inquired about Delta Dental insurance coverage.",
    },
    {
      id: "APT-102",
      customerName: "Marcus Vance",
      customerEmail: "marcus.v@vancecap.com",
      customerPhone: "+1 (555) 349-1102",
      service: "Invisalign Evaluation & Scan",
      date: "Friday, Oct 24",
      time: "04:30 PM",
      status: "confirmed",
      channel: "AI Voice",
      notes: "Requested Friday late afternoon slot.",
    },
    {
      id: "APT-103",
      customerName: "Elena Rostova",
      customerEmail: "elena@rostovadesign.com",
      customerPhone: "+1 (555) 901-4433",
      service: "Teeth Whitening Consultation",
      date: "Monday, Oct 27",
      time: "11:00 AM",
      status: "pending",
      channel: "Web Demo",
      notes: "Awaiting deposit verification.",
    },
    {
      id: "APT-104",
      customerName: "David Kim",
      customerEmail: "dkim@techventures.io",
      customerPhone: "+1 (555) 672-8819",
      service: "Routine Hygiene Cleaning",
      date: "Yesterday",
      time: "09:30 AM",
      status: "completed",
      channel: "AI Voice",
      notes: "Follow-up scheduled in 6 months.",
    },
    {
      id: "APT-105",
      customerName: "Rachel Adams",
      customerEmail: "radams@outlook.com",
      customerPhone: "+1 (555) 412-9908",
      service: "Emergency Tooth Ache Triage",
      date: "Oct 18",
      time: "02:00 PM",
      status: "completed",
      channel: "AI Voice",
    },
    {
      id: "APT-106",
      customerName: "Thomas Wright",
      customerEmail: "twright@wrightlaw.com",
      customerPhone: "+1 (555) 219-0941",
      service: "Comprehensive Dental Examination",
      date: "Oct 16",
      time: "01:00 PM",
      status: "cancelled",
      channel: "Web Form",
      notes: "Caller requested cancellation due to travel conflict.",
    },
  ];

  const [appointments] = React.useState<DashboardAppointment[]>(initialAppointments);
  const [aptFilter, setAptFilter] = React.useState<string>("all");
  const [aptSearch, setAptSearch] = React.useState<string>("");
  const [selectedAptModal, setSelectedAptModal] = React.useState<DashboardAppointment | null>(null);

  // 2. CONTACTS DEMO DATA
  const initialContacts: DashboardContact[] = [
    {
      id: "CON-1",
      name: "Sarah Jenkins",
      email: "sarah.j@gmail.com",
      phone: "+1 (555) 782-9014",
      company: "Jenkins Studio",
      source: "AI Phone Call",
      lastInteraction: "Today, 10:14 AM",
      status: "Customer",
      totalBookings: 2,
    },
    {
      id: "CON-2",
      name: "Marcus Vance",
      email: "marcus.v@vancecap.com",
      phone: "+1 (555) 349-1102",
      company: "Vance Capital",
      source: "AI Phone Call",
      lastInteraction: "Today, 11:42 AM",
      status: "Lead",
      totalBookings: 1,
    },
    {
      id: "CON-3",
      name: "Elena Rostova",
      email: "elena@rostovadesign.com",
      phone: "+1 (555) 901-4433",
      company: "Rostova Design",
      source: "Interactive Web Demo",
      lastInteraction: "Oct 19, 04:20 PM",
      status: "Lead",
      totalBookings: 1,
    },
    {
      id: "CON-4",
      name: "David Kim",
      email: "dkim@techventures.io",
      phone: "+1 (555) 672-8819",
      company: "Tech Ventures LLC",
      source: "AI Phone Call",
      lastInteraction: "Oct 19, 09:30 AM",
      status: "Customer",
      totalBookings: 4,
    },
  ];

  const [contacts] = React.useState<DashboardContact[]>(initialContacts);
  const [contactSearch, setContactSearch] = React.useState("");

  // 3. CALL HISTORY DEMO DATA
  const callRecords: DashboardCallRecord[] = [
    {
      id: "CALL-891",
      callerName: "Marcus Vance",
      callerPhone: "+1 (555) 349-1102",
      duration: "1m 42s",
      timestamp: "Today, 11:42 AM",
      outcome: "Appointment Booked",
      sentiment: "Positive",
      transcriptSnippet:
        "Caller inquired about Invisalign options on Friday. AI identified opening at 4:30 PM and confirmed slot.",
    },
    {
      id: "CALL-890",
      callerName: "Sarah Jenkins",
      callerPhone: "+1 (555) 782-9014",
      duration: "2m 15s",
      timestamp: "Today, 10:14 AM",
      outcome: "Appointment Booked",
      sentiment: "Positive",
      transcriptSnippet:
        "First-time caller verified Delta Dental PPO coverage and reserved deep cleaning for Thursday afternoon.",
    },
    {
      id: "CALL-889",
      callerName: "Unknown Caller",
      callerPhone: "+1 (555) 103-8822",
      duration: "0m 48s",
      timestamp: "Today, 08:30 AM",
      outcome: "Inquiry Answered",
      sentiment: "Neutral",
      transcriptSnippet:
        "Caller asked whether office had free parking on site. AI provided garage validation instructions.",
    },
    {
      id: "CALL-888",
      callerName: "Robert Hughes",
      callerPhone: "+1 (555) 993-0144",
      duration: "3m 12s",
      timestamp: "Yesterday, 06:15 PM",
      outcome: "Transferred",
      sentiment: "Needs Attention",
      transcriptSnippet:
        "Caller described severe tooth fracture with acute swelling. AI immediately initiated emergency doctor line transfer.",
    },
  ];

  // 4. RECEPTIONIST SETTINGS STATE
  const [receptionistConfig, setReceptionistConfig] = React.useState<ReceptionistConfig>({
    assistantName: "Deptloy Voice Coordinator",
    voiceStyle: "Deptloy Neural Female (Natural US English)",
    greetingMessage:
      "Hello! Thank you for calling Apex Medical and Dental Clinic. I am your automated AI receptionist. How can I assist with your appointment today?",
    businessDescription:
      "Comprehensive family dental, orthodontics, emergency tooth triage, and aesthetic care clinic located in San Francisco.",
    businessHoursStart: "08:00 AM",
    businessHoursEnd: "06:00 PM",
    appointmentDuration: "45 minutes",
    bufferBetweenAppointments: "15 minutes",
    notifyEmail: "frontdesk@apexclinic.com",
    notifySms: "+1 (555) 782-9000",
    forwardCallNumber: "+1 (555) 433-8822",
  });

  // 5. INTEGRATIONS DEMO DATA
  const [integrations] = React.useState<DashboardIntegration[]>([
    {
      id: "int-gcal",
      name: "Google Calendar",
      category: "Calendar",
      description: "Bi-directional slot locking across 4 clinician schedules.",
      status: "Connected (Demo)",
      iconName: "Calendar",
      lastSync: "3 mins ago",
    },
    {
      id: "int-hubspot",
      name: "HubSpot CRM",
      category: "CRM",
      description: "Auto-creates contacts, updates deal pipelines, and logs call notes.",
      status: "Connected (Demo)",
      iconName: "Database",
      lastSync: "Just now",
    },
    {
      id: "int-twilio",
      name: "Twilio Telephony & SMS",
      category: "Voice AI Provider",
      description: "Provides inbound phone numbers, call forwarding, and SMS reminders.",
      status: "Connected (Demo)",
      iconName: "Phone",
      lastSync: "Continuous",
    },
    {
      id: "int-stripe",
      name: "Stripe Invoicing",
      category: "Payments",
      description: "Automated deposit authorization for high-ticket cosmetic treatments.",
      status: "Not Connected",
      iconName: "CreditCard",
    },
    {
      id: "int-zapier",
      name: "Zapier & Webhooks",
      category: "Workflow Automation",
      description: "Dispatches payload events to custom internal databases and Slack channels.",
      status: "Connected (Demo)",
      iconName: "Zap",
      lastSync: "1 hour ago",
    },
  ]);

  // Filtered Appointments
  const filteredAppointments = appointments.filter((apt) => {
    const matchesFilter = aptFilter === "all" || apt.status === aptFilter;
    const matchesSearch =
      apt.customerName.toLowerCase().includes(aptSearch.toLowerCase()) ||
      apt.service.toLowerCase().includes(aptSearch.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="flex min-h-screen bg-canvas text-fg">
      
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 rounded-xl bg-brand-600 text-white px-4 py-2.5 text-xs font-semibold shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="h-4 w-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Sidebar (Desktop & Tablet) */}
      <div className="hidden lg:block shrink-0">
        <Sidebar
          currentTab={currentTab}
          onTabChange={setCurrentTab}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="relative w-72 bg-canvas border-r border-line h-full z-10 flex flex-col">
            <Sidebar
              currentTab={currentTab}
              onTabChange={(tab) => {
                setCurrentTab(tab);
                setIsMobileMenuOpen(false);
              }}
              isCollapsed={false}
              onToggleCollapse={() => {}}
            />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          onToggleMobileMenu={() => setIsMobileMenuOpen(true)}
          selectedOrg={selectedOrg}
          onSelectOrg={setSelectedOrg}
        />

        <main className="p-4 sm:p-6 lg:p-8 flex-1 overflow-y-auto">
          
          {/* TAB 1: OVERVIEW */}
          {currentTab === "overview" && (
            <div className="space-y-8">
              
              {/* Top Banner Notice */}
              <div className="p-4 rounded-2xl bg-card border border-line flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-semibold text-white">AI Telephony Active:</span>
                  <span className="text-fg-soft">
                    Routing calls to Deptloy Voice Model v2.4 • Current uptime: 99.98%
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="cyan" size="sm">
                    Simulated Sandbox
                  </Badge>
                </div>
              </div>

              {/* 4 Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                  title="Total Appointments"
                  value="284"
                  change="+18.4%"
                  subtitle="vs last month"
                  icon={<CalendarCheck className="h-5 w-5" />}
                />
                <StatCard
                  title="Today's Bookings"
                  value="14"
                  change="+3 slots open"
                  subtitle="88% utilization"
                  icon={<Clock className="h-5 w-5" />}
                />
                <StatCard
                  title="Active Client Records"
                  value="1,420"
                  change="+64 this week"
                  subtitle="Synced to CRM"
                  icon={<Users className="h-5 w-5" />}
                />
                <StatCard
                  title="Autonomous Inbound Calls"
                  value="892"
                  change="98.2% handled"
                  subtitle="Zero voicemail drops"
                  icon={<PhoneCall className="h-5 w-5" />}
                />
              </div>

              {/* Middle Grid: Activity Visualizer & Quick Actions */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left (8 cols): Recent Appointments Table */}
                <div className="lg:col-span-8 rounded-3xl bg-card border border-line p-6 shadow-xl">
                  <div className="flex items-center justify-between pb-4 border-b border-line mb-4">
                    <div>
                      <h3 className="text-base font-bold text-white">Recent Appointments</h3>
                      <p className="text-xs text-fg-muted">Autonomous calendar bookings across all channels</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setCurrentTab("appointments")}
                      className="text-brand-400 text-xs"
                    >
                      View All
                    </Button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-line text-fg-muted font-semibold uppercase tracking-wider text-[10px]">
                          <th className="py-2.5 px-3">Customer</th>
                          <th className="py-2.5 px-3">Service</th>
                          <th className="py-2.5 px-3">Date & Time</th>
                          <th className="py-2.5 px-3">Status</th>
                          <th className="py-2.5 px-3">Channel</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {appointments.slice(0, 4).map((apt) => (
                          <tr key={apt.id} className="hover:bg-white/[0.02] transition-colors">
                            <td className="py-3 px-3 font-semibold text-white">
                              {apt.customerName}
                              <span className="block text-[10px] text-fg-subtle font-normal">
                                {apt.customerPhone}
                              </span>
                            </td>
                            <td className="py-3 px-3 text-fg-soft max-w-[180px] truncate">
                              {apt.service}
                            </td>
                            <td className="py-3 px-3 text-fg-soft whitespace-nowrap">
                              {apt.date} • {apt.time}
                            </td>
                            <td className="py-3 px-3">
                              <StatusBadge status={apt.status} />
                            </td>
                            <td className="py-3 px-3 text-fg-muted font-mono text-[10px]">
                              {apt.channel}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Right (4 cols): Quick Actions & Real-Time Feed */}
                <div className="lg:col-span-4 flex flex-col gap-6">
                  
                  {/* Quick Actions Card */}
                  <div className="rounded-3xl bg-card border border-line p-5 shadow-xl space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-fg-muted">
                      Quick Operations
                    </h4>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="w-full justify-start text-xs"
                      leftIcon={<PhoneCall className="h-4 w-4 text-brand-400" />}
                      onClick={() => showToast("Simulating inbound call event...")}
                    >
                      Simulate Inbound Call
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="w-full justify-start text-xs"
                      leftIcon={<CalendarIcon className="h-4 w-4 text-blue-400" />}
                      onClick={() => setCurrentTab("appointments")}
                    >
                      Book Manual Appointment
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="w-full justify-start text-xs"
                      leftIcon={<Bot className="h-4 w-4 text-emerald-400" />}
                      onClick={() => setCurrentTab("receptionist")}
                    >
                      Tune AI Receptionist Greeting
                    </Button>
                  </div>

                  {/* Real-time Activity Feed */}
                  <div className="rounded-3xl bg-card border border-line p-5 shadow-xl space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-fg-muted">
                      Live Activity Feed
                    </h4>
                    <div className="space-y-3 text-xs">
                      <div className="flex items-start gap-2.5 pb-2 border-b border-line">
                        <span className="h-2 w-2 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                        <div>
                          <p className="text-fg-soft">
                            <strong>AI Receptionist</strong> booked Marcus Vance for Friday at 4:30 PM.
                          </p>
                          <span className="text-[10px] text-fg-subtle">12 mins ago</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2.5 pb-2 border-b border-line">
                        <span className="h-2 w-2 rounded-full bg-blue-400 shrink-0 mt-1.5" />
                        <div>
                          <p className="text-fg-soft">
                            <strong>HubSpot sync</strong> updated lead score for Sarah Jenkins (+35 pts).
                          </p>
                          <span className="text-[10px] text-fg-subtle">34 mins ago</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <span className="h-2 w-2 rounded-full bg-brand-400 shrink-0 mt-1.5" />
                        <div>
                          <p className="text-fg-soft">
                            <strong>Google Calendar</strong> slot locked for 45-min clean consultation.
                          </p>
                          <span className="text-[10px] text-fg-subtle">1 hour ago</span>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          )}

          {/* TAB 2: AI RECEPTIONIST CONFIGURATION */}
          {currentTab === "receptionist" && (
            <div className="max-w-4xl space-y-8">
              
              {/* Header Status Card */}
              <div className="rounded-3xl bg-gradient-to-r from-brand-900/30 via-card to-card border border-brand-500/30 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-2xl bg-brand-600/30 border border-brand-500/50 flex items-center justify-center text-brand-300">
                    <Bot className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-white">{receptionistConfig.assistantName}</h3>
                      <Badge variant="success" size="sm" dot>Live Telephony Node</Badge>
                    </div>
                    <p className="text-xs text-fg-muted mt-0.5">
                      {receptionistConfig.voiceStyle} • Response Latency: 240ms
                    </p>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<Volume2 className="h-4 w-4 text-brand-400" />}
                  onClick={() => showToast("Playing simulated assistant voice preview...")}
                >
                  Test Voice Greeting
                </Button>
              </div>

              {/* Form Controls */}
              <div className="rounded-3xl bg-card border border-line p-6 sm:p-8 space-y-6 shadow-xl">
                <div className="pb-4 border-b border-line">
                  <h4 className="text-base font-bold text-white">Persona & Greeting Parameters</h4>
                  <p className="text-xs text-fg-muted mt-0.5">
                    Configure how your AI receptionist answers calls and presents your clinic or business.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Assistant Persona Name"
                    value={receptionistConfig.assistantName}
                    onChange={(e) =>
                      setReceptionistConfig({ ...receptionistConfig, assistantName: e.target.value })
                    }
                  />
                  <Select
                    label="Neural Voice Model"
                    value={receptionistConfig.voiceStyle}
                    onChange={(e) =>
                      setReceptionistConfig({ ...receptionistConfig, voiceStyle: e.target.value })
                    }
                  >
                    <option value="Deptloy Neural Female (Natural US English)">Deptloy Neural Female (Natural US English)</option>
                    <option value="Deptloy Neural Male (Warm Professional)">Deptloy Neural Male (Warm Professional)</option>
                    <option value="Deptloy Executive British (Polite British)">Deptloy Executive British (Polite British)</option>
                  </Select>
                </div>

                <Textarea
                  label="Inbound Greeting Message"
                  value={receptionistConfig.greetingMessage}
                  onChange={(e) =>
                    setReceptionistConfig({ ...receptionistConfig, greetingMessage: e.target.value })
                  }
                  rows={3}
                  helperText="This exact phrasing will be spoken when a customer's call is answered."
                />

                <Textarea
                  label="Business & Knowledge Scope"
                  value={receptionistConfig.businessDescription}
                  onChange={(e) =>
                    setReceptionistConfig({ ...receptionistConfig, businessDescription: e.target.value })
                  }
                  rows={3}
                  helperText="Primary background context used by the model to answer common caller questions."
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <Input
                    label="Business Hours (Start)"
                    value={receptionistConfig.businessHoursStart}
                    onChange={(e) =>
                      setReceptionistConfig({ ...receptionistConfig, businessHoursStart: e.target.value })
                    }
                  />
                  <Input
                    label="Business Hours (End)"
                    value={receptionistConfig.businessHoursEnd}
                    onChange={(e) =>
                      setReceptionistConfig({ ...receptionistConfig, businessHoursEnd: e.target.value })
                    }
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Default Appointment Duration"
                    value={receptionistConfig.appointmentDuration}
                    onChange={(e) =>
                      setReceptionistConfig({ ...receptionistConfig, appointmentDuration: e.target.value })
                    }
                  />
                  <Input
                    label="Emergency Human Transfer Number"
                    value={receptionistConfig.forwardCallNumber}
                    onChange={(e) =>
                      setReceptionistConfig({ ...receptionistConfig, forwardCallNumber: e.target.value })
                    }
                  />
                </div>

                <div className="pt-4 border-t border-line flex items-center justify-between">
                  <span className="text-xs text-fg-subtle">
                    Changes take effect on live telephony within 60 seconds.
                  </span>
                  <Button
                    variant="glow"
                    size="md"
                    leftIcon={<Save className="h-4 w-4" />}
                    onClick={() => showToast("Assistant configuration saved successfully (Simulation)!")}
                  >
                    Save Configuration
                  </Button>
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: APPOINTMENTS */}
          {currentTab === "appointments" && (
            <div className="space-y-6">
              
              {/* Header & Filter Controls */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
                <div>
                  <h3 className="text-xl font-bold text-white">Appointments Management</h3>
                  <p className="text-xs text-fg-muted">Monitor and coordinate all calendar bookings.</p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {/* Status Filters */}
                  {["all", "confirmed", "pending", "completed", "cancelled"].map((st) => (
                    <button
                      key={st}
                      onClick={() => setAptFilter(st)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all ${
                        aptFilter === st
                          ? "bg-brand-600 text-white shadow-md shadow-brand-600/30"
                          : "bg-card text-fg-muted hover:text-white border border-line"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Search Bar */}
              <div className="relative max-w-sm">
                <Search className="h-3.5 w-3.5 text-fg-subtle absolute left-3 top-3 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Filter by customer name or service..."
                  value={aptSearch}
                  onChange={(e) => setAptSearch(e.target.value)}
                  className="w-full h-9 pl-9 pr-3 rounded-xl bg-card border border-line text-xs text-white placeholder:text-fg-subtle focus:outline-none focus:ring-1 focus:ring-brand-400"
                />
              </div>

              {/* Data Table */}
              <div className="rounded-3xl bg-card border border-line overflow-hidden shadow-xl">
                {filteredAppointments.length === 0 ? (
                  <EmptyState
                    icon={<CalendarIcon className="h-6 w-6" />}
                    title="No Appointments Found"
                    description="No bookings match your current filter criteria."
                    actionLabel="Reset Filters"
                    onAction={() => {
                      setAptFilter("all");
                      setAptSearch("");
                    }}
                  />
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-line bg-raised text-fg-muted font-semibold uppercase tracking-wider text-[10px]">
                          <th className="py-3 px-4">Ref ID</th>
                          <th className="py-3 px-4">Customer Details</th>
                          <th className="py-3 px-4">Service</th>
                          <th className="py-3 px-4">Date & Time</th>
                          <th className="py-3 px-4">Status</th>
                          <th className="py-3 px-4">Channel</th>
                          <th className="py-3 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {filteredAppointments.map((apt) => (
                          <tr key={apt.id} className="hover:bg-white/[0.02] transition-colors">
                            <td className="py-3.5 px-4 font-mono text-brand-400 text-[11px]">
                              {apt.id}
                            </td>
                            <td className="py-3.5 px-4 font-semibold text-white">
                              {apt.customerName}
                              <span className="block text-[11px] text-fg-muted font-normal">
                                {apt.customerPhone}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 text-fg-soft">
                              {apt.service}
                            </td>
                            <td className="py-3.5 px-4 text-fg-soft whitespace-nowrap">
                              {apt.date} • {apt.time}
                            </td>
                            <td className="py-3.5 px-4">
                              <StatusBadge status={apt.status} />
                            </td>
                            <td className="py-3.5 px-4 text-fg-muted font-mono text-[11px]">
                              {apt.channel}
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setSelectedAptModal(apt)}
                                className="text-xs text-fg-soft"
                              >
                                Details
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Appointment Details Modal */}
              <Modal
                isOpen={!!selectedAptModal}
                onClose={() => setSelectedAptModal(null)}
                title={`Appointment: ${selectedAptModal?.id}`}
                description="Simulated appointment record."
              >
                {selectedAptModal && (
                  <div className="space-y-4 text-xs">
                    <div className="p-3 rounded-xl bg-raised border border-line space-y-2">
                      <div className="flex justify-between">
                        <span className="text-fg-muted">Customer:</span>
                        <span className="font-semibold text-white">{selectedAptModal.customerName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-fg-muted">Phone:</span>
                        <span className="text-fg-soft">{selectedAptModal.customerPhone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-fg-muted">Email:</span>
                        <span className="text-fg-soft">{selectedAptModal.customerEmail}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-fg-muted">Service:</span>
                        <span className="text-fg-soft font-medium">{selectedAptModal.service}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-fg-muted">Date/Time:</span>
                        <span className="text-brand-300 font-bold">{selectedAptModal.date} at {selectedAptModal.time}</span>
                      </div>
                    </div>

                    {selectedAptModal.notes && (
                      <div>
                        <span className="text-fg-muted font-semibold block mb-1">Intake Notes:</span>
                        <p className="p-2.5 rounded-xl bg-black/40 border border-line text-fg-soft">
                          {selectedAptModal.notes}
                        </p>
                      </div>
                    )}

                    <div className="pt-2 flex justify-end gap-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => {
                          showToast("Calendar rescheduled notice simulated.");
                          setSelectedAptModal(null);
                        }}
                      >
                        Reschedule
                      </Button>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => setSelectedAptModal(null)}
                      >
                        Close
                      </Button>
                    </div>
                  </div>
                )}
              </Modal>

            </div>
          )}

          {/* TAB 4: CONTACTS */}
          {currentTab === "contacts" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-white">Contacts & Client Records</h3>
                  <p className="text-xs text-fg-muted">Enriched profiles automatically captured by AI Receptionist.</p>
                </div>

                <div className="relative max-w-xs w-full">
                  <Search className="h-3.5 w-3.5 text-fg-subtle absolute left-3 top-3 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Search contacts..."
                    value={contactSearch}
                    onChange={(e) => setContactSearch(e.target.value)}
                    className="w-full h-9 pl-9 pr-3 rounded-xl bg-card border border-line text-xs text-white placeholder:text-fg-subtle focus:outline-none focus:ring-1 focus:ring-brand-400"
                  />
                </div>
              </div>

              <div className="rounded-3xl bg-card border border-line overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-line bg-raised text-fg-muted font-semibold uppercase tracking-wider text-[10px]">
                        <th className="py-3 px-4">Name</th>
                        <th className="py-3 px-4">Company</th>
                        <th className="py-3 px-4">Contact Info</th>
                        <th className="py-3 px-4">Source</th>
                        <th className="py-3 px-4">Last Interaction</th>
                        <th className="py-3 px-4">Lifecycle Status</th>
                        <th className="py-3 px-4 text-center">Bookings</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {contacts
                        .filter(
                          (c) =>
                            c.name.toLowerCase().includes(contactSearch.toLowerCase()) ||
                            c.email.toLowerCase().includes(contactSearch.toLowerCase())
                        )
                        .map((c) => (
                          <tr key={c.id} className="hover:bg-white/[0.02] transition-colors">
                            <td className="py-3.5 px-4 font-semibold text-white">
                              {c.name}
                            </td>
                            <td className="py-3.5 px-4 text-fg-muted">
                              {c.company}
                            </td>
                            <td className="py-3.5 px-4 text-fg-soft">
                              <div>{c.email}</div>
                              <div className="text-[10px] text-fg-subtle">{c.phone}</div>
                            </td>
                            <td className="py-3.5 px-4 text-fg-soft">
                              {c.source}
                            </td>
                            <td className="py-3.5 px-4 text-fg-muted">
                              {c.lastInteraction}
                            </td>
                            <td className="py-3.5 px-4">
                              <StatusBadge status={c.status} />
                            </td>
                            <td className="py-3.5 px-4 text-center font-bold text-white font-mono">
                              {c.totalBookings}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: CALL HISTORY */}
          {currentTab === "calls" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white">Telephony & Call Logs</h3>
                <p className="text-xs text-fg-muted">Inbound conversational records, transcripts, and sentiment analysis.</p>
              </div>

              <div className="space-y-4">
                {callRecords.map((call) => (
                  <div
                    key={call.id}
                    className="p-5 rounded-2xl bg-card border border-line hover:border-brand-500/20 transition-all space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-line">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-brand-600/20 text-brand-400 flex items-center justify-center">
                          <PhoneCall className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white text-sm">{call.callerName}</span>
                            <span className="text-xs text-fg-muted font-mono">({call.callerPhone})</span>
                          </div>
                          <span className="text-[11px] text-fg-subtle">
                            {call.timestamp} • Duration: {call.duration}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          call.sentiment === "Positive"
                            ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                            : call.sentiment === "Neutral"
                            ? "bg-slate-500/15 text-fg-soft border border-slate-500/30"
                            : "bg-rose-500/15 text-rose-400 border border-rose-500/30"
                        }`}>
                          Sentiment: {call.sentiment}
                        </span>
                        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-brand-500/15 text-brand-300 border border-brand-500/30">
                          {call.outcome}
                        </span>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-raised border border-line text-xs text-fg-soft leading-relaxed">
                      <span className="text-brand-400 font-semibold block mb-0.5">AI Summary & Transcript:</span>
                      &ldquo;{call.transcriptSnippet}&rdquo;
                    </div>

                    <div className="flex items-center justify-between text-xs text-fg-subtle pt-1">
                      <button
                        onClick={() => showToast(`Playing recording for ${call.id} (simulated)...`)}
                        className="inline-flex items-center gap-1.5 text-brand-400 hover:text-brand-300 font-medium"
                      >
                        <Play className="h-3.5 w-3.5" />
                        <span>Play Audio Recording</span>
                      </button>
                      <span className="font-mono text-[11px]">{call.id}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: INTEGRATIONS */}
          {currentTab === "integrations" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white">Connected Tools & APIs</h3>
                <p className="text-xs text-fg-muted">
                  Manage OAuth credentials and webhook sync with your external calendars and business tools.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {integrations.map((int) => (
                  <div
                    key={int.id}
                    className="p-6 rounded-3xl bg-card border border-line flex flex-col justify-between hover:border-brand-500/30 transition-all"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-white/5 text-fg-muted">
                          {int.category}
                        </span>
                        <StatusBadge status={int.status} />
                      </div>

                      <h4 className="text-base font-bold text-white mb-1">{int.name}</h4>
                      <p className="text-xs text-fg-muted leading-relaxed mb-4">{int.description}</p>
                    </div>

                    <div className="pt-4 border-t border-line flex items-center justify-between text-xs">
                      <span className="text-fg-subtle">{int.lastSync ? `Sync: ${int.lastSync}` : "Ready to connect"}</span>
                      <Button
                        variant={int.status.includes("Connected") ? "outline" : "primary"}
                        size="sm"
                        onClick={() =>
                          showToast(
                            int.status.includes("Connected")
                              ? `${int.name} connection re-verified.`
                              : `OAuth prompt triggered for ${int.name} (Demo mode).`
                          )
                        }
                      >
                        {int.status.includes("Connected") ? "Configure" : "Connect"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: SETTINGS */}
          {currentTab === "settings" && (
            <div className="max-w-3xl space-y-8">
              <div>
                <h3 className="text-xl font-bold text-white">Organization & Security Settings</h3>
                <p className="text-xs text-fg-muted">Manage API keys, team roles, and billing limits.</p>
              </div>

              {/* Organization Profile */}
              <div className="p-6 rounded-3xl bg-card border border-line space-y-4">
                <h4 className="text-sm font-bold text-white pb-2 border-b border-line">
                  Organization Profile
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input label="Company Name" value={selectedOrg} readOnly />
                  <Input label="Primary Administrative Email" value="admin@apexclinic.com" readOnly />
                </div>
              </div>

              {/* API Keys */}
              <div className="p-6 rounded-3xl bg-card border border-line space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-line">
                  <div>
                    <h4 className="text-sm font-bold text-white">Developer API Keys</h4>
                    <p className="text-xs text-fg-muted">Used to authenticate webhooks and custom app integrations.</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => showToast("New secret token generated (Demo).")}
                  >
                    Roll Key
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="password"
                    value="dp_live_92f8190c8a14b09e88b2a"
                    readOnly
                    className="flex-1 h-9 px-3 rounded-xl bg-raised border border-line text-xs text-fg-muted font-mono"
                  />
                  <Button
                    variant="secondary"
                    size="sm"
                    leftIcon={<Copy className="h-3.5 w-3.5" />}
                    onClick={() => showToast("API Key copied to clipboard!")}
                  >
                    Copy
                  </Button>
                </div>
              </div>

              {/* Subscription Plan Usage */}
              <div className="p-6 rounded-3xl bg-card border border-line space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-line">
                  <div>
                    <h4 className="text-sm font-bold text-white">Active Plan: Enterprise Automation</h4>
                    <p className="text-xs text-fg-muted">Unlimited telephony hours & 5 calendar connections.</p>
                  </div>
                  <Badge variant="violet">Active Subscription</Badge>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-fg-muted">Monthly AI Telephony Minutes:</span>
                    <span className="text-white font-mono">1,840 / 5,000 used (36%)</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-raised-hover overflow-hidden">
                    <div className="h-full bg-brand-500 rounded-full w-[36%]" />
                  </div>
                </div>
              </div>

            </div>
          )}

        </main>
      </div>

    </div>
  );
}
