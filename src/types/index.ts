export type ServiceSlug = "ai-receptionist" | "automation" | "crm" | "development";

export interface ServiceItem {
  slug: ServiceSlug;
  href: string;
  title: string;
  short: string;
  description: string;
  points: string[];
  metrics?: { label: string; value: string };
  badge?: string;
}

export interface IndustryItem {
  id: string;
  slug: string;
  title: string;
  /** Short label for menus and footer links. */
  shortTitle: string;
  tagline: string;
  description: string;
  commonBottleneck: string;
  deptloySolution: string;
  iconName: string;
  recommendedServices: string[];
}

export interface CaseStudyItem {
  id: string;
  industry: string;
  category: "healthcare" | "beauty" | "real-estate" | "professional";
  title: string;
  clientPlaceholder: string;
  challenge: string;
  solution: string;
  outcome: string;
  metrics: { label: string; value: string }[];
  /** Services/tools involved — shown as tags on project cards. */
  tags: string[];
  isDemonstration: boolean;
}

/** Content the client still needs to supply. Rendered with a visible "Placeholder" marker. */
export interface Placeholder {
  isPlaceholder: true;
}

export interface Testimonial extends Partial<Placeholder> {
  quote: string;
  name: string;
  role: string;
  company: string;
}

export interface TeamMember extends Partial<Placeholder> {
  name: string;
  role: string;
  bio: string;
  initials: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface ContactFormData {
  fullName: string;
  email: string;
  companyName: string;
  serviceRequired: ServiceSlug | "";
  projectDescription: string;
}

export interface ContactFormErrors {
  fullName?: string;
  email?: string;
  companyName?: string;
  serviceRequired?: string;
  projectDescription?: string;
}

export type DemoIndustryId = "clinic" | "salon" | "real-estate" | "consulting" | "home-services";

export interface DemoIndustryOption {
  id: DemoIndustryId;
  name: string;
  category: string;
  services: { id: string; name: string; duration: string; price: string }[];
  sampleQuestions: string[];
  assistantGreeting: string;
}

export interface DemoBookingState {
  industry: DemoIndustryId;
  serviceId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  selectedDate: string;
  selectedTime: string;
  notes: string;
}

export interface ChatMessage {
  id: string;
  sender: "customer" | "assistant" | "system";
  text: string;
  timestamp: string;
  badge?: string;
}

export type AppointmentStatus = "confirmed" | "pending" | "completed" | "cancelled";

export interface DashboardAppointment {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  service: string;
  date: string;
  time: string;
  status: AppointmentStatus;
  notes?: string;
  channel: "AI Voice" | "Web Demo" | "Web Form" | "SMS";
}

export interface DashboardContact {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  source: string;
  lastInteraction: string;
  status: "Active" | "Lead" | "Customer" | "Follow-up";
  totalBookings: number;
}

export interface DashboardCallRecord {
  id: string;
  callerName: string;
  callerPhone: string;
  duration: string;
  timestamp: string;
  outcome: "Appointment Booked" | "Inquiry Answered" | "Callback Scheduled" | "Transferred";
  sentiment: "Positive" | "Neutral" | "Needs Attention";
  transcriptSnippet: string;
}

export interface DashboardIntegration {
  id: string;
  name: string;
  category: "Calendar" | "CRM" | "Email" | "Workflow Automation" | "Voice AI Provider" | "Payments";
  description: string;
  status: "Connected (Demo)" | "Not Connected" | "Pending Auth";
  iconName: string;
  lastSync?: string;
}

export interface ReceptionistConfig {
  assistantName: string;
  voiceStyle: string;
  greetingMessage: string;
  businessDescription: string;
  businessHoursStart: string;
  businessHoursEnd: string;
  appointmentDuration: string;
  bufferBetweenAppointments: string;
  notifyEmail: string;
  notifySms: string;
  forwardCallNumber: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  category: "Voice AI" | "Automation" | "Architecture" | "Security";
  date: string;
  readTime: string;
  summary: string;
  keyTakeaways: string[];
  content: {
    heading: string;
    body: string[];
  }[];
}

