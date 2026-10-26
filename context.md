# Deptloy — Business Architecture & Context Specification

> **Target Audience**: AI Coding Assistants, Codex, Developers, and LLM Agents working on the Deptloy codebase.  
> **Repository**: [https://github.com/deptloy-devs/Deptloy](https://github.com/deptloy-devs/Deptloy)  
> **Contact / Lead Routing**: `deptloy@gmail.com`  
> **Tagline**: *"Software built to outlast the hype."* / *"Let AI Handle the Busywork. You Build the Business."*

---

## 1. Executive Summary & Company Identity

**Deptloy** (`Deptloy AI Solutions Inc.`) is a premium software engineering and AI systems studio. We build, deploy, and maintain custom, production-hardened operational infrastructure for businesses whose growth relies on high-velocity inbound calls, leads, appointments, and client workflows.

### Core Philosophy: "Systems, Not Tools"
- **The Problem**: Service businesses and growing companies suffer from SaaS tool fatigue. They bolt together chatbots, generic CRMs, appointment calendars, and Zapier zaps that break, create data silos, and generate administrative busywork.
- **The Deptloy Solution**: We design and engineer one unified system around how the business actually operates. Rather than handing off a brittle template or demo, Deptloy builds production software, integrates every touchpoint into a single customer record, and stays on as long-term engineering partners to monitor, maintain, and upgrade the system as the business scales.

### Operating Pillars
1. **Systems, Not Tools**: Everything connects natively (Voice AI → CRM → Automation → Web/Client Portal). No bolted-on afterthoughts.
2. **Plain-Spoken**: Zero hype or jargon. Clients always know what is being built, why, and the exact business outcome it drives.
3. **Production-Hardened**: Built for high-stakes operational environments with sub-second response times, data privacy boundaries, and fail-safe fallbacks.
4. **We Stay**: Launch is day one. We monitor infrastructure health, tune AI conversational rules against real caller behavior, and extend functionality as business needs evolve.

---

## 2. The 4 Core Building Blocks (Services)

Deptloy combines four modular pillars into one cohesive operating system:

```
                  ┌──────────────────────────────┐
                  │       1. AI Receptionist     │
                  │  (24/7 Voice & Chat Intake)  │
                  └──────────────┬───────────────┘
                                 │
                  ┌──────────────▼───────────────┐
                  │        2. Custom CRM         │
                  │   (Single Source of Truth)   │
                  └──────────────┬───────────────┘
                                 │
                  ┌──────────────▼───────────────┐
                  │    3. Workflow Automation    │
                  │   (Reminders, Sync, Tasks)   │
                  └──────────────┬───────────────┘
                                 │
                  ┌──────────────▼───────────────┐
                  │    4. Web & App Development  │
                  │  (Client Portals, Dashboards)│
                  └──────────────────────────────┘
```

### 1. AI Voice & Web Receptionist
- **What it does**: Answers phone calls and web messages 24/7 in the client's custom brand voice with human-grade neural speech and sub-500ms latency.
- **Key Capabilities**:
  - Live calendar slot locking (two-way sync with Google Calendar, Outlook, Calendly, Dentrix, etc.).
  - Answers complex service catalog and pricing FAQs from verified business knowledge.
  - Triage routing: urgent inquiries or VIP clients are routed immediately to human staff.
  - Automatic CRM transcript, call summary, and sentiment tagging.
- **Metrics**: `< 2.4s` average inquiry response time; `94%+` capture rate of after-hours opportunities.

### 2. Custom CRM Architecture
- **What it does**: A purpose-built, clutter-free CRM shaped strictly around how the client's team sells and delivers.
- **Key Capabilities**:
  - Zero bloated fields or generic templates that staff ignore.
  - Complete customer interaction timeline (calls, recordings, texts, bookings, notes).
  - Custom role permissions and team task assignment queues.
  - Transparent visual pipeline from new inquiry to completed service and repeat booking.

### 3. Intelligent Workflow Automation
- **What it does**: Background orchestration that eliminates manual data entry, human coordination delays, and dropped balls.
- **Key Capabilities**:
  - Instant SMS and email confirmations after calls or web inquiries.
  - Two-way natural language reminder sequences (e.g., patient replies "Running 10m late" → AI adjusts calendar and alerts staff).
  - Automated review requests and post-service rebooking nudges.
  - Internal staff notifications via Slack, SMS, or email when action is needed.
- **Metrics**: Saves `22+ hours` of manual administrative coordination each week; `35%+` drop in no-show rates.

### 4. Web & Application Development
- **What it does**: Custom web platforms, self-service client portals, mobile web apps, and executive dashboards.
- **Key Capabilities**:
  - Blazing fast Next.js & React architectures with 99+ Lighthouse performance.
  - Frictionless booking flows where customers can self-schedule or reschedule in 30 seconds.
  - Internal administrative dashboards for reporting on lead throughput and conversion.

---

## 3. Target Industries & Sector Solutions

Deptloy designs specialized system blueprints for sectors running on high-stakes scheduling:

| Sector | Primary Bottleneck | Deptloy Solution Blueprint |
| :--- | :--- | :--- |
| **Clinics & Healthcare** | Phones tied up during peak hours; after-hours patients lost to answering machines. | 24/7 AI Receptionist with calendar slot locking, triage rules, and appointment reminder sequences. |
| **Salons & Luxury Aesthetics** | Stylists interrupted mid-treatment to answer booking calls; no-show revenue losses. | Multi-staff calendar matching, automated Stripe deposit collection, and conversational rebooking. |
| **Real Estate Brokerages** | Night-time portal leads go cold before agents respond next morning. | Sub-30-second AI inquiry response, property spec Q&A, instant showing tour booking, and CRM deal creation. |
| **Home Services (HVAC/Plumbing)** | Field technicians miss high-ticket emergency calls while on ladders or under sinks. | 24/7 call triage, urgent contractor alert dispatch, and geographic booking windows. |
| **Legal & Professional Advisory** | Senior partners waste billable hours on unqualified discovery calls and email ping-pong. | Prequalification intake questionnaire, conflict check logging, and executive calendar scheduling. |
| **Startups & Tech Agencies** | Fragmented SaaS stack and lack of internal tools to handle customer volume. | Custom Next.js web applications, client portals, internal dashboards, and scalable API bridges. |

---

## 4. Operational Methodology (The 5-Step Process)

1. **Discover**: In-depth audit of current operational flows, phone volume, software stack, and where leads or administrative hours are slipping away.
2. **Design**: Architect one unified blueprint detailing what connects, what is automated, what rules apply, and what triggers human handoff.
3. **Build**: Build and test every component against real-world scenarios and edge cases in a staging environment.
4. **Launch**: Production rollout, team onboarding and training, with close engineering monitoring during initial operational weeks.
5. **Care**: Ongoing infrastructure monitoring, conversational prompt tuning against real customer queries, and continuous system expansion.

---

## 5. Contact, Quote Ingestion & Backend Routing

### Business Lead Destination
- **Official Lead Recipient**: `deptloy@gmail.com`
- **Response SLA**: Sub-4 hour response time on business days.
- **Quote Form Philosophy**: **Minimal & Frictionless**.
  - Fields: **Name**, **Email** (never "Business Email"), and **Message / Project Details** ("What would you like to improve?").
  - Action Button: **"Get the quote"**.
  - Zero bloated fields (no estimate range, no desired rollout timeline selects).

### Backend Lead Ingestion (`src/app/api/contact/route.ts`)
- **Direct Web Dispatch**: Utilizes FormSubmit / custom HTTP dispatch to deliver clean lead records directly to `deptloy@gmail.com` with `_replyto` set to the customer's email.
- **Production SMTP / Resend Support**: Seamlessly dispatches via `GMAIL_APP_PASSWORD` or `RESEND_API_KEY` if configured in `.env.local` / host environment.
- **Local Persistence Fail-Safe**: Every inquiry is automatically written to `data/leads.json` so no lead is ever lost even during network downtime.
- **Routing Structure**: All contact links across the site navigate to the canonical `#contact` anchor.

---

## 6. Brand Identity & Visual Language

- **Design Philosophy**: Minimal, technical, editorial, and engineered. Chamfered polygonal geometry, subtle isometric depth, light paper background, and high typography contrast.
- **Color Palette (CSS Variables)**:
  - `--paper`: `#f4f3fb` (Warm, premium paper canvas)
  - `--deep`: `#15134a` (Authoritative deep technical navy)
  - `--pur`: `#5750a8` (Structural purple)
  - `--lav`: `#8478e0` (Voice AI & receptionist lavender)
  - `--or`: `#fd9150` (Vibrant kinetic orange accent)
  - `--co`: `#ef7a5e` (Coral accent)
  - `--peri`: `#d2cdf3` (Soft periwinkle borders)
  - `--mute`: `#5c5a86` (Secondary slate copy)
- **Official Logo**: 3D Isometric Cube with an upward-pointing vibrant orange arrow inside a faceted hexagon (rendered via SVG `<use href="#mk" />` defined in `src/app/layout.tsx`).
- **Typography**:
  - `Archivo` (Display, Headings, Technical Authority)
  - `IBM Plex Sans` (Readable editorial body copy)
  - `IBM Plex Mono` (Labels, category pills, metrics, time stamps)

---

## 7. Technical Architecture & Directory Structure

```
Deptloy/
├── context.md                    # This master business context file
├── AGENTS.md                     # Next.js 16 agent rules & guidance
├── package.json                  # Next 16.4.2, React 19, Tailwind CSS v4, Lucide
├── .env.example                  # Email configuration guide (Gmail / Resend)
├── data/
│   └── leads.json                # Local backup store of submitted quotes
├── public/
│   ├── favicon.svg               # 3D isometric cube favicon
│   └── deptloy_icon.svg          # Standalone SVG brand mark
└── src/
    ├── app/
    │   ├── layout.tsx            # Global HTML shell, SVG symbol defs (#mk, #lgr, #hd, #bd)
    │   ├── design.css            # Complete design system tokens, keyframes, components
    │   ├── globals.css           # Tailwind CSS v4 core import
    │   ├── icon.svg              # Next.js app icon
    │   ├── (marketing)/
    │   │   ├── page.tsx          # Homepage composing all modular sections
    │   │   ├── layout.tsx        # Marketing shell (Navbar, Footer, Cursor, DepChat)
    │   │   ├── about/page.tsx    # Studio overview & 4 core pillars
    │   │   ├── blogs/page.tsx    # Technical architecture articles & insights
    │   │   ├── how-it-works/page.tsx # End-to-end engineering expertise, lifecycle & SRE
    │   │   ├── services/page.tsx # Seamless redirect to /how-it-works
    │   │   ├── projects/page.tsx # Interconnected enterprise case studies & blueprints
    │   │   ├── contact/page.tsx  # Direct quote form & appointment scheduler
    │   │   └── demo/page.tsx     # Interactive AI receptionist simulator
    │   ├── api/
    │   │   └── contact/route.ts  # Quote ingestion & dispatch to deptloy@gmail.com
    │   └── dashboard/page.tsx    # Interactive client administrative analytics demo
    ├── components/
    │   ├── marketing/
    │   │   ├── Navbar.tsx        # Pill navigation & responsive mobile menu
    │   │   ├── Hero.tsx          # Minimal hero with kinetic robot Dep
    │   │   ├── AssemblyTrack.tsx # Interactive live assembly line visualizer
    │   │   ├── ServicesModule.tsx# 4 modular building blocks tab viewer
    │   │   ├── SolutionsSection.tsx # Industry-specific cards & blueprints
    │   │   ├── StoryTimeline.tsx # Morning-to-evening automated business day
    │   │   ├── AboutStudioSection.tsx # Interactive "Systems not tools" stage
    │   │   ├── ProcessSection.tsx# 5-step delivery process with scroll tracking
    │   │   ├── DepChat.tsx       # Floating interactive AI assistant Dep
    │   │   ├── FinalContactSection.tsx # Branded 3-field quote form
    │   │   └── Footer.tsx        # Clean footer & channel links
    │   └── ui/
    │       ├── Logo.tsx          # 3D Isometric LogoMark & LogoText
    │       ├── Button.tsx        # Pill & chamfered buttons
    │       ├── Badge.tsx         # Monospace category badges
    │       └── Field.tsx         # Clean input fields
    ├── lib/
    │   ├── site.ts               # Core site constants, services, industries, FAQs
    │   ├── blogs.ts              # In-depth editorial engineering articles
    │   └── cn.ts                 # Classname utility
    └── types/
        └── index.ts              # TypeScript schemas for services, cases, appointments
```

---

## 8. Development & Coding Agent Rules

When modifying or generating code for Deptloy, all agents and developers **MUST** observe the following conventions:

1. **Never Reintroduce Deleted Legacy Code**:
   - The old dark-mode templates, placeholder logos, `ProofStrip`, `HowItWorks`, and multi-step forms with budget/timeline selects have been permanently retired. Do not re-create them.
2. **Contact Form Minimalism**:
   - The contact form is always a minimal 3-field quote form (`name`, `email`, `message`) with the submit button labeled **"Get the quote"**.
   - The email field must always be labeled **"Email"** (never "Business Email").
   - Quote leads must always route to **`deptloy@gmail.com`**.
3. **Styling & CSS Separation**:
   - Custom tokens, chamfered clips, and keyframes live in [`src/app/design.css`](file:///Users/ahmad/Documents/Deptloy/src/app/design.css).
   - Tailwind utility styles live in [`src/app/globals.css`](file:///Users/ahmad/Documents/Deptloy/src/app/globals.css).
   - Do not merge raw CSS into `globals.css` where Turbopack's Tailwind v4 compiler might strip custom non-utility classes.
4. **SVG Logo Dimensions**:
   - Always provide explicit inline dimensions (`width="28" height="32"`) on SVG logos to prevent flash-of-unstyled-content (FOUC) scaling during page hydration.
5. **Brand Tone**:
   - Write with technical authority, precision, and restrained confidence. Avoid generic marketing hyperbole like "revolutionary", "game-changing", or "10x synergy". Emphasize operational uptime, hours saved, and unified systems.
