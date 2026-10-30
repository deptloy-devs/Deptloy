import type {
  Stat,
  ServiceItem,
  IndustryItem,
  CaseStudyItem,
  DemoIndustryOption,
} from "@/types";

export const brand = {
  name: "Deptloy",
  legalName: "Deptloy AI Solutions Inc.",
  tagline: "Let AI Handle the Busywork. You Build the Business.",
  shortDescription:
    "Deptloy is a premium AI business solutions agency. We build autonomous AI receptionists, intelligent workflow automations, modern CRM architectures, and custom digital software.",
  heroHeadline: "Let AI Handle the Busywork. You Build the Business.",
  heroSubheadline:
    "AI receptionists, intelligent automation, CRM pipelines, and custom software that capture every inbound lead, eliminate manual coordination, and scale your operations 24/7.",
  contactEmail: "deptloy@gmail.com",
  phone: "+1 (888) 433-7856",
  address: "San Francisco, CA & Global Remote",
};

export const trustPoints = [
  {
    title: "Tailored Solutions",
    description: "Configured strictly to your specific business rules, service catalog, and brand tone.",
  },
  {
    title: "Workflow Automation",
    description: "End-to-end sync across calendars, CRMs, invoicing, and team messaging.",
  },
  {
    title: "Scalable Technology",
    description: "Enterprise-grade uptime, sub-second latency, and bank-grade privacy controls.",
  },
];

export const services: ServiceItem[] = [
  {
    slug: "ai-receptionist",
    href: "/services/ai-receptionist",
    title: "AI Receptionist",
    short: "Never miss a customer inquiry, call, or booking opportunity again.",
    description:
      "A branded, 24/7 conversational voice and text assistant that answers customer calls, schedules appointments into your calendar, handles FAQs, and qualifies leads instantly.",
    points: [
      "AI-powered voice & chat conversations",
      "Real-time appointment scheduling & calendar sync",
      "Instant answers to business & pricing FAQs",
      "Automated lead capture & CRM handoff",
    ],
    badge: "Flagship Service",
    metrics: { label: "Inbound Inquiry Response Time", value: "< 2.4s" },
  },
  {
    slug: "automation",
    href: "/services/automation",
    title: "Business Automation",
    short: "Eliminate repetitive administrative tasks and accelerate team throughput.",
    description:
      "Intelligent workflows that connect your fragmented tools. From customer intake to automated invoicing, notifications, and task routing, your systems run on autopilot.",
    points: [
      "Cross-platform workflow automation",
      "Deep API and legacy tool integrations",
      "Automated client notifications & reminders",
      "90% reduction in manual data entry",
    ],
    badge: "Efficiency Service",
    metrics: { label: "Admin Hours Saved Weekly", value: "22+ hrs" },
  },
  {
    slug: "crm",
    href: "/services/crm",
    title: "CRM Solutions",
    short: "Organize customer relationships, track sales pipelines, and prevent lost deals.",
    description:
      "Custom-tailored CRM implementations with automated lead enrichment, lifecycle tracking, interaction history, and actionable executive sales dashboards.",
    points: [
      "Automated lead management & score tagging",
      "Comprehensive customer interaction timelines",
      "Visual sales pipeline tracking",
      "Automated follow-up sequences & reporting",
    ],
    badge: "Pipeline Service",
    metrics: { label: "Lead Capture Completeness", value: "99.8%" },
  },
  {
    slug: "development",
    href: "/services/development",
    title: "Web & App Development",
    short: "Bespoke digital platforms built for scale, speed, and conversion.",
    description:
      "Engineering modern, high-performance web applications, client portals, internal software, and mobile-friendly experiences engineered to convert traffic into revenue.",
    points: [
      "Custom Next.js & React web applications",
      "Interactive customer portals & booking dashboards",
      "Mobile-responsive cloud applications",
      "Robust API architectures & database design",
    ],
    badge: "Engineering Service",
    metrics: { label: "Performance & Lighthouse Score", value: "99+" },
  },
];

export const industries: IndustryItem[] = [
  {
    id: "clinics",
    slug: "clinics",
    title: "Clinics and Healthcare Practices",
    shortTitle: "Clinics & Healthcare",
    tagline: "24/7 patient intake, triage routing, and appointment scheduling.",
    description:
      "Enable patients to book consultations, verify clinic hours, and receive preparation instructions without tying up front-desk staff during busy clinic hours.",
    commonBottleneck: "Busy phone lines during operating hours and lost inquiries after closing.",
    deptloySolution: "AI Receptionist with calendar slot locking and HIPAA-compliant privacy measures.",
    iconName: "Stethoscope",
    recommendedServices: ["AI Receptionist", "CRM Solutions"],
  },
  {
    id: "salons",
    slug: "salons",
    title: "Salons and Beauty Businesses",
    shortTitle: "Salons & Beauty",
    tagline: "Seamless bookings, service inquiries, and deposit collection.",
    description:
      "Eliminate phone interruptions while stylists and therapists are serving clients. Customers can book specific stylists, request treatment details, and receive automated SMS reminders.",
    commonBottleneck: "Stylists stepping away from clients to answer booking calls and manual rescheduling.",
    deptloySolution: "Automated booking flows with staff calendar matching and SMS appointment confirmations.",
    iconName: "Sparkles",
    recommendedServices: ["AI Receptionist", "Business Automation"],
  },
  {
    id: "real-estate",
    slug: "real-estate",
    title: "Real Estate Agencies",
    shortTitle: "Real Estate",
    tagline: "Instant listing inquiries, showing requests, and buyer qualification.",
    description:
      "Capture prospective buyers and tenants immediately when they find a property. Qualify buyer timelines, budget, and route showing requests straight to the listing agent.",
    commonBottleneck: "Slow response times on new portal leads leading to lost buyer opportunities.",
    deptloySolution: "Instant AI intake, calendar booking for property walkthroughs, and automated CRM deal creation.",
    iconName: "Building2",
    recommendedServices: ["AI Receptionist", "CRM Solutions", "Business Automation"],
  },
  {
    id: "consulting",
    slug: "consulting",
    title: "Consulting & Advisory Firms",
    shortTitle: "Consulting & Advisory",
    tagline: "Prequalify inbound executive interest and schedule discovery calls.",
    description:
      "Screen prospect inquiries against your ideal client profile before booking partner calendar time. Automatically sync notes, company details, and agendas into your CRM.",
    commonBottleneck: "Senior consultants wasting time on unqualified discovery calls and manual email back-and-forth.",
    deptloySolution: "Smart intake qualification questionnaire and executive calendar scheduling.",
    iconName: "Briefcase",
    recommendedServices: ["CRM Solutions", "Business Automation"],
  },
  {
    id: "home-services",
    slug: "home-services",
    title: "Home Service Businesses",
    shortTitle: "Home Services",
    tagline: "Emergency dispatch, quote requests, and job window scheduling.",
    description:
      "Plumbers, HVAC contractors, electricians, and roofers can capture urgent repair calls even while on job sites or after-hours, locking in customer commitments.",
    commonBottleneck: "Missing high-ticket emergency calls while working in the field.",
    deptloySolution: "24/7 call triage, urgent notification dispatch, and geographic booking windows.",
    iconName: "Wrench",
    recommendedServices: ["AI Receptionist", "Business Automation"],
  },
  {
    id: "professional",
    slug: "professional",
    title: "Professional Service Companies",
    shortTitle: "Professional Services",
    tagline: "Confidential intake, document collection, and partner scheduling.",
    description:
      "Law firms, accounting practices, and financial advisors provide a white-glove first impression, organizing client records and appointment prep seamlessly.",
    commonBottleneck: "Administrative back-and-forth collecting initial intake documents and scheduling.",
    deptloySolution: "Encrypted intake workflows, calendar sync, and automated client document checklists.",
    iconName: "Scale",
    recommendedServices: ["AI Receptionist", "CRM Solutions", "Web & App Development"],
  },
];

export const projects: CaseStudyItem[] = [
  {
    id: "cs-clinic",
    category: "healthcare",
    industry: "Healthcare & Dental Clinic",
    title: "Automated 24/7 patient intake and after-hours emergency booking",
    clientPlaceholder: "Regional Wellness Practice",
    challenge:
      "Patient inquiries arrived outside clinic operating hours, leaving staff to return calls manually the following morning while patients called competing practices.",
    solution:
      "Implemented Deptloy AI Voice & Web Receptionist integrated with calendar rules, triaging routine cleanings versus urgent care and reserving time slots automatically.",
    outcome:
      "Conceptual outcome: Inbound appointment requests captured around the clock without extra front-desk headcount, routing urgent triage directly to on-call providers.",
    metrics: [
      { label: "Intake Availability", value: "24/7" },
      { label: "Staff Call Routing", value: "Automated" },
      { label: "Calendar Sync", value: "Real-time" },
    ],
    tags: ["AI Receptionist", "Calendar sync", "After-hours booking"],
    isDemonstration: true,
  },
  {
    id: "cs-salon",
    category: "beauty",
    industry: "Multi-Location Salon & Spa",
    title: "Appointment booking and automated calendar verification",
    clientPlaceholder: "Boutique Aesthetics Studio",
    challenge:
      "Staff frequently interrupted client sessions to answer ringing phones. Peak-hour appointment overlap created double-bookings and last-minute cancellations.",
    solution:
      "Deployed conversational booking assistant across phone line and web widget, paired with automated confirmation sequences and calendar slot reservation.",
    outcome:
      "Conceptual outcome: Routine inquiries and scheduling handled autonomously, preventing interruptions during in-person client appointments.",
    metrics: [
      { label: "Booking Mode", value: "Autonomous" },
      { label: "Client Confirmation", value: "Instant SMS" },
      { label: "Staff Interruption", value: "Minimized" },
    ],
    tags: ["AI Receptionist", "Automation", "SMS reminders"],
    isDemonstration: true,
  },
  {
    id: "cs-realty",
    category: "real-estate",
    industry: "Real Estate Brokerage",
    title: "Instant property showing coordination and automated CRM pipeline routing",
    clientPlaceholder: "Metropolitan Properties Group",
    challenge:
      "Prospective buyers viewing listings in the evening submitted web inquiries that sat unaddressed until the next business morning.",
    solution:
      "Connected Deptloy Conversational AI to property listings and agent calendars, allowing callers to check availability and request showings instantly.",
    outcome:
      "Conceptual outcome: Inbound leads receive immediate confirmation with property specs and scheduled walkthrough times routed directly to agent pipelines.",
    metrics: [
      { label: "Response Time", value: "Immediate" },
      { label: "Showing Workflow", value: "Coordinated" },
      { label: "CRM Routing", value: "Direct" },
    ],
    tags: ["AI Receptionist", "CRM Solutions", "Lead routing"],
    isDemonstration: true,
  },
];


/** Sample appointment times offered by the /demo receptionist (text and voice). */
export const demoTimeSlots = ["09:00 AM", "10:30 AM", "01:15 PM", "02:45 PM", "04:15 PM", "05:30 PM"];

export const demoIndustries: DemoIndustryOption[] = [
  {
    id: "clinic",
    name: "Medical / Dental Clinic",
    category: "Healthcare",
    assistantGreeting: "Hello! Thank you for calling Apex Health Clinic. I'm your AI health coordinator. How may I assist with your appointment today?",
    services: [
      { id: "srv-clean", name: "Comprehensive Dental Examination & Cleaning", duration: "45 mins", price: "$149" },
      { id: "srv-consult", name: "General Medical Health Consultation", duration: "30 mins", price: "$95" },
      { id: "srv-urgent", name: "Same-Day Urgent Care Assessment", duration: "30 mins", price: "$120" },
    ],
    sampleQuestions: [
      "What are your working hours?",
      "Do you accept Delta Dental insurance?",
      "Can I reschedule my appointment?",
    ],
  },
  {
    id: "salon",
    name: "Hair & Beauty Salon",
    category: "Personal Care",
    assistantGreeting: "Welcome to Velvet Studio! I can check stylist availability, explain our hair care packages, or book your next appointment.",
    services: [
      { id: "srv-cut", name: "Signature Haircut & Blowout Styling", duration: "60 mins", price: "$85" },
      { id: "srv-color", name: "Balayage Full Color Treatment", duration: "120 mins", price: "$220" },
      { id: "srv-spa", name: "Revitalizing Scalp & Facial Therapy", duration: "45 mins", price: "$110" },
    ],
    sampleQuestions: [
      "Can I choose a specific senior stylist?",
      "Do you require a deposit?",
      "What is your cancellation policy?",
    ],
  },
  {
    id: "real-estate",
    name: "Real Estate Brokerage",
    category: "Property",
    assistantGreeting: "Hi! You've reached Pacific Ridge Real Estate. Looking to tour a listing or discuss selling a property?",
    services: [
      { id: "srv-tour", name: "Private Property Showing Walkthrough", duration: "45 mins", price: "Free" },
      { id: "srv-eval", name: "Home Valuation & Market Strategy Session", duration: "60 mins", price: "Free" },
      { id: "srv-buyer", name: "Buyer Advisory & Pre-Approval Consultation", duration: "30 mins", price: "Free" },
    ],
    sampleQuestions: [
      "Can I schedule an open house tour for this weekend?",
      "Are you available for evening showings?",
      "What documents do I need to bring?",
    ],
  },
  {
    id: "consulting",
    name: "Management Consulting",
    category: "Professional",
    assistantGreeting: "Good day. You are speaking with Deptloy Advisory AI. I can arrange an initial discovery call with one of our principal partners.",
    services: [
      { id: "srv-disc", name: "Executive Discovery & Scope Call", duration: "30 mins", price: "Complimentary" },
      { id: "srv-audit", name: "AI Architecture & Operations Audit", duration: "90 mins", price: "$450" },
      { id: "srv-strat", name: "Growth Strategy Working Session", duration: "60 mins", price: "$300" },
    ],
    sampleQuestions: [
      "What industries do you specialize in?",
      "Can you send an NDA before our call?",
      "Do you provide fixed-scope sprint packages?",
    ],
  },
  {
    id: "home-services",
    name: "Home Services (HVAC & Plumbing)",
    category: "Trades",
    assistantGreeting: "Thanks for calling Rapid Response Home Services! Need an emergency technician or an estimate on a replacement?",
    services: [
      { id: "srv-diag", name: "HVAC System Diagnostic & Inspection", duration: "60 mins", price: "$89" },
      { id: "srv-plumb", name: "Emergency Plumbing Leak Resolution", duration: "90 mins", price: "$149" },
      { id: "srv-est", name: "New System Installation Free Estimate", duration: "45 mins", price: "Free" },
    ],
    sampleQuestions: [
      "How quickly can a technician arrive today?",
      "Do you charge for after-hours emergency calls?",
      "Are your technicians licensed and insured?",
    ],
  },
];

export const faqList = [
  {
    question: "How does the AI Receptionist integrate with our existing calendar?",
    answer:
      "Deptloy connects via secure OAuth APIs directly to Google Calendar, Microsoft 365 / Outlook, Calendly, or your proprietary EHR/booking system. It only offers open slots that obey your buffer times, lunch breaks, and staff schedules.",
  },
  {
    question: "Can the AI handle unexpected or complex customer questions?",
    answer:
      "Yes. The AI is trained on your exact business knowledge base, website FAQs, and price books. If a caller asks something outside its verified scope, it gracefully offers to forward the call to a live staff member or captures a detailed message.",
  },
  {
    question: "Does it sound like a robotic automated telephone menu?",
    answer:
      "No. We deploy state-of-the-art neural speech engines with conversational turn-taking, natural pausing, sub-second latency, and warm human inflections. Callers experience a smooth, intelligent back-and-forth conversation.",
  },
  {
    question: "How long does implementation and configuration take?",
    answer:
      "A standard AI Receptionist rollout typically takes between 3 to 7 business days. We ingest your business rules, configure custom integrations, test edge cases, and provide an interactive staging sandbox for your team before going live.",
  },
  {
    question: "Is customer and patient data protected?",
    answer:
      "Absolutely. We adhere to enterprise security best practices: end-to-end TLS encryption, zero storage of payment credentials, role-based access control, and strict data retention boundaries.",
  },
];

/** Primary navigation (Services also has a dropdown in the navbar). */
export const mainNav = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Solutions" },
  { href: "/about", label: "About" },
  { href: "/blogs", label: "Blogs" },
  { href: "/contact", label: "Contact" },
];
