import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  Cpu,
  Scale,
  ShieldCheck,
  AlertTriangle,
  Lock,
  PhoneCall,
  FileText,
  Mail,
  Phone,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service & Engagement | Deptloy",
  description:
    "Comprehensive terms of service, engagement standards, and legal guidelines governing Deptloy's software engineering, AI receptionist deployments, and website use.",
  alternates: { canonical: "/terms" },
};

const SECTIONS = [
  { id: "acceptance", num: "01", title: "Acceptance of Terms & Scope" },
  { id: "services", num: "02", title: "Services & Engagement Model" },
  { id: "ip-ownership", num: "03", title: "IP & Code Ownership" },
  { id: "ai-telephony", num: "04", title: "AI & Telephony Compliance" },
  { id: "emergency-disclaimer", num: "05", title: "Emergency Services Disclaimer" },
  { id: "acceptable-use", num: "06", title: "Acceptable Use Policy" },
  { id: "fees-payment", num: "07", title: "Fees & Milestones" },
  { id: "warranties-ai", num: "08", title: "Warranties & AI Disclaimer" },
  { id: "liability", num: "09", title: "Limitation of Liability" },
  { id: "indemnification", num: "10", title: "Indemnification" },
  { id: "confidentiality", num: "11", title: "Confidentiality" },
  { id: "termination", num: "12", title: "Term & Termination" },
  { id: "governing-law", num: "13", title: "Governing Law & Disputes" },
  { id: "contact", num: "14", title: "Legal Notices & Contact" },
];

export default function TermsPage() {
  return (
    <div className="pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-24">
      <div className="wrap max-w-4xl">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[var(--pur)] hover:text-[var(--deep)] transition-colors mb-6 group"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
          <span>Back to Home</span>
        </Link>

        {/* Header Block */}
        <div className="mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--paper)] border border-[var(--peri)] text-xs font-mono font-bold uppercase tracking-wider text-[var(--pur)] mb-4">
            <span className="w-2 h-2 rounded-full bg-[#3ccf91] shrink-0" />
            <span>Studio Legal Framework • Version 2.4</span>
          </div>

          <h1
            style={{ fontSize: "clamp(28px, 4vw, 44px)", lineHeight: 1.15 }}
            className="font-extrabold tracking-tight text-[var(--deep)]"
          >
            Terms of Service &amp; Engagement
          </h1>

          <p className="text-sm sm:text-base text-[var(--mute)] mt-3.5 leading-relaxed max-w-3xl">
            These terms set forth the legal agreement governing technical discovery, software engineering engagements,
            autonomous AI receptionist deployments, and general use of the Deptloy platform and website.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs font-mono text-[var(--mute)]">
            <span>Last Updated: October 30, 2026</span>
            <span className="opacity-30">•</span>
            <span>Applies Globally</span>
          </div>
        </div>

        {/* Unified Document Sheet */}
        <article className="legal-doc bg-white border border-[rgba(21,19,74,0.12)] p-6 sm:p-10 lg:p-12 rounded-2xl shadow-[0_12px_40px_rgba(87,80,168,0.06)] space-y-8 text-[#34325e] text-sm sm:text-[15px] leading-relaxed">
          {/* Master Agreement Notice Banner */}
          <div className="p-5 sm:p-6 bg-[var(--paper)] border-l-4 border-[var(--or)] rounded-r-xl border-y border-r border-[rgba(21,19,74,0.08)] space-y-1 text-xs sm:text-sm text-[var(--mute)] leading-relaxed">
            <strong className="text-[var(--deep)] block font-bold">
              Commercial Client Notice &amp; Master Agreements
            </strong>
            <p>
              These terms govern public access to deptloy.com and establish the baseline principles for our engineering
              services. Commercial client engagements are further governed by mutually executed Statements of Work (SOWs),
              Master Services Agreements (MSAs), and Data Processing Addenda (DPAs). In the event of conflict, the executed
              agreement governs.
            </p>
          </div>

          {/* Table of Contents */}
          <div className="bg-[var(--paper)] border border-[var(--peri)] p-5 sm:p-6 rounded-xl space-y-3.5">
            <div className="flex items-center justify-between gap-2 border-b border-[var(--peri)] pb-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[var(--pur)]">
                <FileText className="w-4 h-4 text-[var(--pur)] shrink-0" />
                <span>Table of Contents</span>
              </div>
              <span className="text-xs font-mono text-[var(--mute)]">
                {SECTIONS.length} Sections
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              {SECTIONS.map((sec) => (
                <a
                  key={sec.id}
                  href={`#${sec.id}`}
                  className="flex items-center gap-2.5 p-2 sm:px-3 sm:py-2.5 rounded-lg bg-white/70 hover:bg-white text-xs font-mono text-[var(--mute)] hover:text-[var(--deep)] border border-transparent hover:border-[var(--peri)] transition-all group"
                >
                  <span className="w-5 h-5 rounded bg-[var(--paper)] group-hover:bg-[var(--mist)] text-[var(--pur)] font-bold text-[11px] grid place-items-center shrink-0 border border-[var(--peri)]/50">
                    {sec.num}
                  </span>
                  <span className="truncate group-hover:translate-x-0.5 transition-transform font-medium">
                    {sec.title}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Section 1 */}
          <section id="acceptance" style={{ scrollMarginTop: "105px" }} className="space-y-3 pt-2">
            <h2 className="text-lg sm:text-xl font-extrabold text-[var(--deep)] flex items-center gap-2.5">
              <FileText className="w-5 h-5 text-[var(--pur)] shrink-0" />
              <span>1. Acceptance of Terms &amp; Scope of Application</span>
            </h2>
            <p>
              By accessing or using the Deptloy website (
              <a href="https://www.deptloy.com" className="text-[var(--pur)] font-semibold hover:underline">
                https://www.deptloy.com
              </a>
              ), submitting an inquiry or custom quote request, testing our interactive voice demos, or engaging
              Deptloy (&ldquo;Deptloy,&rdquo; &ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;), you
              (&ldquo;Client,&rdquo; &ldquo;User,&rdquo; or &ldquo;you&rdquo;) agree to be legally bound by these Terms
              and our Privacy Policy.
            </p>
            <p>
              If you are accepting these Terms on behalf of an enterprise or other legal entity, you represent and
              warrant that you possess full legal authority to bind that entity. If you lack such authority or do not agree
              to every provision, you must discontinue access to the website and services.
            </p>
          </section>

          {/* Section 2 */}
          <section id="services" style={{ scrollMarginTop: "105px" }} className="border-t border-[var(--mist)] pt-8 space-y-3">
            <h2 className="text-lg sm:text-xl font-extrabold text-[var(--deep)] flex items-center gap-2.5">
              <Cpu className="w-5 h-5 text-[var(--pur)] shrink-0" />
              <span>2. Services &amp; Commercial Engagement Model</span>
            </h2>
            <p>
              Deptloy is a specialized software engineering studio delivering custom applications, relational database
              systems, automated workflows, and conversational AI receptionists. Engagements follow structured phases:
            </p>
            <ul className="space-y-2 pl-2 list-disc list-inside text-[var(--mute)] text-xs sm:text-sm">
              <li>
                <strong className="text-[var(--deep)]">Technical Discovery:</strong> Defining schemas, data contracts,
                third-party integrations, and concrete acceptance criteria prior to production development.
              </li>
              <li>
                <strong className="text-[var(--deep)]">Fixed Turnkey Milestones:</strong> Engineering deliverables are
                executed under defined milestones with explicit deliverables rather than open-ended hourly billing.
              </li>
              <li>
                <strong className="text-[var(--deep)]">Client Cooperation:</strong> Clients are responsible for
                providing timely access to third-party services (cloud accounts, telephony trunks, CRM credentials) and
                prompt feedback during verification milestones.
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section id="ip-ownership" style={{ scrollMarginTop: "105px" }} className="border-t border-[var(--mist)] pt-8 space-y-3">
            <h2 className="text-lg sm:text-xl font-extrabold text-[var(--deep)] flex items-center gap-2.5">
              <Lock className="w-5 h-5 text-[#16875b] shrink-0" />
              <span>3. Intellectual Property, Code Ownership &amp; Licensing</span>
            </h2>
            <p>
              We believe businesses must own their core technology and data infrastructure. Our intellectual property
              architecture is structured as follows:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
              <div className="bg-[var(--paper)] p-4 rounded-xl border border-[var(--peri)]">
                <h3 style={{ fontSize: "14px", fontWeight: 700 }} className="text-[var(--deep)] mb-1">
                  Client Deliverables &amp; Data
                </h3>
                <p className="text-xs leading-relaxed text-[var(--mute)]">
                  Upon receipt of full payment for the applicable milestone or project, the Client owns all right,
                  title, and interest in bespoke code, database schemas, custom UI, proprietary business workflows, and
                  client databases developed specifically for the Client.
                </p>
              </div>

              <div className="bg-[var(--paper)] p-4 rounded-xl border border-[var(--peri)]">
                <h3 style={{ fontSize: "14px", fontWeight: 700 }} className="text-[var(--deep)] mb-1">
                  Deptloy Background IP
                </h3>
                <p className="text-xs leading-relaxed text-[var(--mute)]">
                  Deptloy retains all ownership in its pre-existing libraries, starter architectures, foundational code
                  generators, internal tools, prompt frameworks, and studio branding (including the Dep mascot). Clients
                  receive an irrevocable, royalty-free, perpetual license to use background IP embedded in deliverables.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section id="ai-telephony" style={{ scrollMarginTop: "105px" }} className="border-t border-[var(--mist)] pt-8 space-y-3">
            <h2 className="text-lg sm:text-xl font-extrabold text-[var(--deep)] flex items-center gap-2.5">
              <PhoneCall className="w-5 h-5 text-[var(--or)] shrink-0" />
              <span>4. AI Receptionist, Voice Agents &amp; Telephony Compliance</span>
            </h2>
            <p>
              Where an engagement involves Deptloy configuring, deploying, or interfacing with telephony carriers or
              autonomous AI receptionists, the Client agrees to the following requirements:
            </p>
            <ul className="space-y-2 pl-2 list-disc list-inside text-[var(--mute)] text-xs sm:text-sm">
              <li>
                <strong className="text-[var(--deep)]">Carrier &amp; Speech Accounts:</strong> Clients maintain their own upstream
                carrier accounts (e.g. Twilio, Telnyx) and commercial voice synthesis credentials (such as ElevenLabs enterprise API keys)
                unless explicitly bundled under a managed service SLA. Direct carrier fees, minute tariffs, and regulatory registrations
                (such as A2P 10DLC) remain the Client&apos;s responsibility.
              </li>
              <li>
                <strong className="text-[var(--deep)]">Data Isolation &amp; Zero Training:</strong> Production AI receptionist
                pipelines and voice synthesis integrations are configured under enterprise API boundaries where customer prompts,
                caller speech, and CRM records are not used to train commercial foundation models.
              </li>
              <li>
                <strong className="text-[var(--deep)]">Call Recording &amp; Consent:</strong> If recording or
                transcription is enabled, the Client is exclusively responsible for ensuring compliance with wiretapping
                and recording statutes (including two-party/all-party consent states).
              </li>
              <li>
                <strong className="text-[var(--deep)]">Telemarketing Regulations:</strong> Clients must strictly comply
                with TCPA, TSR, CAN-SPAM, PECR, and Do-Not-Call registry rules. Outbound telephony agents may not be used
                for unsolicited cold calls or deceptive practices.
              </li>
            </ul>
          </section>

          {/* Section 5 - Emergency Disclaimer */}
          <section id="emergency-disclaimer" style={{ scrollMarginTop: "105px" }} className="border-t border-[var(--mist)] pt-8 space-y-3">
            <div className="p-5 sm:p-6 bg-[#fff7f5] border border-[var(--or)]/40 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-[#d9383a] font-bold text-sm">
                <AlertTriangle className="w-5 h-5 shrink-0" />
                <span>5. CRITICAL DISCLAIMER: No Emergency Services (No 911 / 999 / 112)</span>
              </div>
              <p className="text-xs sm:text-sm text-[var(--deep)] leading-relaxed font-semibold">
                DEPTLOY&apos;S AI RECEPTIONISTS AND VOICE AGENTS ARE ADMINISTRATIVE BUSINESS TOOLS DESIGNED STRICTLY FOR
                ROUTINE INQUIRIES, APPOINTMENT BOOKING, AND CUSTOMER TRIAGE.
              </p>
              <p className="text-xs sm:text-sm text-[var(--mute)] leading-relaxed">
                THEY ARE <strong>NOT</strong> CONNECTED TO PUBLIC SAFETY ANSWERING POINTS (PSAP), EMERGENCY OPERATORS,
                OR 911 / 999 / 112 SERVICES. CLIENTS MUST NEVER CONFIGURE OR ADVERTISE DEPTLOY SYSTEMS AS A PRIMARY OR
                EMERGENCY LIFELINE FOR CRITICAL MEDICAL, FIRE, OR LIFE-SAFETY RESCUE DISPATCH.
              </p>
            </div>
          </section>

          {/* Section 6 */}
          <section id="acceptable-use" style={{ scrollMarginTop: "105px" }} className="border-t border-[var(--mist)] pt-8 space-y-3">
            <h2 className="text-lg sm:text-xl font-extrabold text-[var(--deep)] flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-[var(--pur)] shrink-0" />
              <span>6. Acceptable Use Policy</span>
            </h2>
            <p>You agree to use Deptloy&apos;s website, APIs, platforms, and simulators only for lawful business purposes. You shall not:</p>
            <ul className="space-y-2 pl-2 list-disc list-inside text-[var(--mute)] text-xs sm:text-sm">
              <li>Engage in caller ID spoofing, fraudulent voice phishing (&ldquo;vishing&rdquo;), or deceptive impersonation.</li>
              <li>Transmit unconsented promotional telemarketing, spam, or abusive high-frequency automated calls.</li>
              <li>Input or speak real confidential business records, unencrypted payment card numbers, medical data, or sensitive personal data into the public `/demo` sandbox.</li>
              <li>Attempt to bypass, disable, probe, or tamper with security controls, Cloudflare Turnstile verification, or rate limits.</li>
              <li>Reverse-engineer, decompile, extract, or reconstruct proprietary algorithms, prompts, or voice demo code hosted on deptloy.com.</li>
            </ul>
          </section>

          {/* Section 7 */}
          <section id="fees-payment" style={{ scrollMarginTop: "105px" }} className="border-t border-[var(--mist)] pt-8 space-y-3">
            <h2 className="text-lg sm:text-xl font-extrabold text-[var(--deep)] flex items-center gap-2.5">
              <Scale className="w-5 h-5 text-[var(--pur)] shrink-0" />
              <span>7. Fees, Milestone Invoicing &amp; Payment Terms</span>
            </h2>
            <p>
              Fees for custom engineering, architectural discovery, platform development, and recurring AI maintenance
              are defined in individual Statements of Work (SOWs) or formal proposals.
            </p>
            <ul className="space-y-2 pl-2 list-disc list-inside text-[var(--mute)] text-xs sm:text-sm">
              <li>
                <strong className="text-[var(--deep)]">Milestones:</strong> Engagements are invoiced upon achievement
                of agreed milestones (e.g. Architecture Definition, Core Engineering, Staging, Final Handover).
              </li>
              <li>
                <strong className="text-[var(--deep)]">Payment Terms:</strong> Invoices are payable within fifteen (15)
                calendar days unless otherwise agreed in writing. All fees are in United States Dollars (USD).
              </li>
              <li>
                <strong className="text-[var(--deep)]">Overdue Accounts:</strong> Undisputed overdue amounts may accrue
                a late fee of 1.5% per month (or the maximum permitted by law).
              </li>
            </ul>
          </section>

          {/* Section 8 */}
          <section id="warranties-ai" style={{ scrollMarginTop: "105px" }} className="border-t border-[var(--mist)] pt-8 space-y-3">
            <h2 className="text-lg sm:text-xl font-extrabold text-[var(--deep)] flex items-center gap-2.5">
              <Cpu className="w-5 h-5 text-[var(--pur)] shrink-0" />
              <span>8. Warranties, Generative AI &amp; Demo Sandbox Disclaimer</span>
            </h2>
            <p>
              Deptloy warrants that all custom engineering services will be executed in a professional, workmanlike manner
              in accordance with standard industry practices.
            </p>
            <div className="p-4 bg-[var(--paper)] rounded-xl border border-[var(--peri)] space-y-2 text-xs text-[var(--mute)]">
              <div>
                <strong className="text-[var(--deep)] block font-bold mb-1">Production Generative AI Notice:</strong>
                <p className="leading-relaxed">
                  Large language models, voice synthesis engines (including ElevenLabs), and generative AI systems operate
                  through probabilistic reasoning. While Deptloy builds deterministic guardrails, schema validation, and
                  structured handoffs, AI output cannot guarantee 100% factual perfection under all conversational edge cases.
                  Clients acknowledge that AI receptionists should incorporate human escalation options for high-stakes or
                  sensitive transactions.
                </p>
              </div>

              <div className="pt-2 border-t border-[var(--peri)]/60">
                <strong className="text-[var(--deep)] block font-bold mb-1">Free Website Demonstration Simulator (/demo):</strong>
                <p className="leading-relaxed">
                  The interactive voice simulator at <Link href="/demo" className="text-[var(--pur)] font-semibold hover:underline">deptloy.com/demo</Link>{" "}
                  is a free evaluation tool powered by the free developer tier of the Google Gemini API. As noted on the demo
                  console, interactions in this free sandbox are subject to Google&apos;s standard developer terms. The demo is
                  provided strictly &ldquo;AS IS&rdquo; for conceptual evaluation and does not constitute a production service or
                  service-level agreement (SLA).
                </p>
              </div>
            </div>
            <p className="text-xs uppercase font-mono tracking-wider text-[var(--mute)]">
              EXCEPT AS EXPRESSLY STATED IN AN EXECUTED SOW, ALL SERVICES, DEMOS, AND BLUEPRINTS ARE PROVIDED &ldquo;AS
              IS&rdquo; WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED.
            </p>
          </section>

          {/* Section 9 */}
          <section id="liability" style={{ scrollMarginTop: "105px" }} className="border-t border-[var(--mist)] pt-8 space-y-3">
            <h2 className="text-lg sm:text-xl font-extrabold text-[var(--deep)] flex items-center gap-2.5">
              <Scale className="w-5 h-5 text-[#d9383a] shrink-0" />
              <span>9. Limitation of Liability</span>
            </h2>
            <ul className="space-y-2 pl-2 list-disc list-inside text-[var(--mute)] text-xs sm:text-sm">
              <li>
                <strong className="text-[var(--deep)]">Exclusion of Consequential Damages:</strong> IN NO EVENT SHALL
                EITHER PARTY BE LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, PUNITIVE, OR CONSEQUENTIAL DAMAGES (INCLUDING
                LOSS OF REVENUE, PROFITS, GOODWILL, CUSTOMER DATA, OR BUSINESS INTERRUPTION).
              </li>
              <li>
                <strong className="text-[var(--deep)]">Liability Cap:</strong> EXCEPT FOR GROSS NEGLIGENCE OR WILLFUL
                MISCONDUCT, EACH PARTY&apos;S TOTAL CUMULATIVE LIABILITY UNDER THESE TERMS SHALL BE STRICTLY LIMITED TO
                THE FEES ACTUALLY PAID BY THE CLIENT TO DEPTLOY DURING THE SIX (6) MONTHS PRECEDING THE CLAIM, OR ONE
                HUNDRED DOLLARS ($100.00 USD) FOR NON-PAYING WEBSITE VISITORS.
              </li>
            </ul>
          </section>

          {/* Section 10 */}
          <section id="indemnification" style={{ scrollMarginTop: "105px" }} className="border-t border-[var(--mist)] pt-8 space-y-3">
            <h2 className="text-lg sm:text-xl font-extrabold text-[var(--deep)] flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-[#16875b] shrink-0" />
              <span>10. Indemnification</span>
            </h2>
            <p>
              <strong>By Deptloy:</strong> We agree to defend and hold harmless the Client against third-party claims
              alleging that custom code authored solely by Deptloy infringes any valid patent or copyright, provided the
              Client promptly notifies Deptloy and allows control of the defense.
            </p>
            <p>
              <strong>By Client:</strong> The Client agrees to defend and hold harmless Deptloy from any third-party
              claims, regulatory fines, or damages arising from Client-provided assets, unlawful telemarketing or consent
              violations originating from Client campaigns, or breach of these Terms.
            </p>
          </section>

          {/* Section 11 */}
          <section id="confidentiality" style={{ scrollMarginTop: "105px" }} className="border-t border-[var(--mist)] pt-8 space-y-3">
            <h2 className="text-lg sm:text-xl font-extrabold text-[var(--deep)] flex items-center gap-2.5">
              <Lock className="w-5 h-5 text-[var(--pur)] shrink-0" />
              <span>11. Confidentiality &amp; Non-Disclosure</span>
            </h2>
            <p>
              Both parties agree to treat all technical specifications, customer databases, source code, pricing, and
              business workflows exchanged during discovery and execution with the same standard of care used for their own
              confidential information (and not less than reasonable care).
            </p>
          </section>

          {/* Section 12 */}
          <section id="termination" style={{ scrollMarginTop: "105px" }} className="border-t border-[var(--mist)] pt-8 space-y-3">
            <h2 className="text-lg sm:text-xl font-extrabold text-[var(--deep)] flex items-center gap-2.5">
              <FileText className="w-5 h-5 text-[var(--pur)] shrink-0" />
              <span>12. Term, Termination &amp; Survival</span>
            </h2>
            <p>
              Either party may terminate an active project engagement in accordance with the terms set forth in the
              applicable SOW or MSA, or upon thirty (30) days written notice for material uncured breach. Upon termination,
              the Client shall settle all approved milestones, and Deptloy shall deliver all completed code and database
              dumps. Sections 3, 5, 7, 8, 9, 10, 11, and 13 shall survive termination.
            </p>
          </section>

          {/* Section 13 */}
          <section id="governing-law" style={{ scrollMarginTop: "105px" }} className="border-t border-[var(--mist)] pt-8 space-y-3">
            <h2 className="text-lg sm:text-xl font-extrabold text-[var(--deep)] flex items-center gap-2.5">
              <Scale className="w-5 h-5 text-[var(--pur)] shrink-0" />
              <span>13. Governing Law &amp; Dispute Resolution</span>
            </h2>
            <p>
              These Terms are governed by the laws of the State of California, United States. The parties agree to
              attempt in good faith to resolve any dispute informally for at least thirty (30) business days prior to
              initiating formal legal proceedings. YOU AND DEPTLOY AGREE THAT CLAIMS MAY ONLY BE BROUGHT IN AN INDIVIDUAL
              CAPACITY AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS PROCEEDING.
            </p>
          </section>

          {/* Section 14 */}
          <section id="contact" style={{ scrollMarginTop: "105px" }} className="border-t border-[var(--mist)] pt-8 space-y-4">
            <h2 className="text-lg sm:text-xl font-extrabold text-[var(--deep)] flex items-center gap-2.5">
              <Mail className="w-5 h-5 text-[var(--or)] shrink-0" />
              <span>14. Legal Notices &amp; Contact</span>
            </h2>
            <p className="text-[var(--mute)]">
              For contract inquiries, Master Services Agreements (MSAs), custom Statements of Work (SOWs), or formal
              legal notices, our team can be reached directly through the channels below:
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs sm:text-sm">
              <a
                href="mailto:deptloy@gmail.com"
                className="inline-flex items-center gap-2 text-[var(--deep)] font-semibold hover:text-[var(--or)] transition-colors p-2.5 sm:px-3.5 bg-[var(--paper)] rounded-lg border border-[var(--peri)]"
              >
                <Mail className="w-4 h-4 text-[var(--or)]" />
                <span>deptloy@gmail.com</span>
              </a>

              <a
                href="tel:+14743491561"
                className="inline-flex items-center gap-2 text-[var(--deep)] font-semibold hover:text-[var(--or)] transition-colors p-2.5 sm:px-3.5 bg-[var(--paper)] rounded-lg border border-[var(--peri)]"
              >
                <Phone className="w-4 h-4 text-[#16875b]" />
                <span>+1 (474) 349-1561</span>
              </a>

              <Link
                href="/privacy"
                className="inline-flex items-center gap-1.5 text-[var(--pur)] font-semibold hover:underline p-2.5 sm:ml-auto"
              >
                <span>Privacy Policy</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </section>

          {/* Tail Note for Custom Enterprise Terms */}
          <div className="pt-6 border-t border-[var(--mist)] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-[var(--mute)]">
            <p>
              Need a customized Master Services Agreement (MSA) or statement of work? We tailor terms to client compliance standards.
            </p>
            <Link
              href="/contact#form"
              className="text-[var(--or)] font-bold font-mono inline-flex items-center gap-1 hover:underline shrink-0"
            >
              <span>Contact Engineering</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}
