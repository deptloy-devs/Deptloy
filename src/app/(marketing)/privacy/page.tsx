import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ShieldCheck,
  Lock,
  Database,
  Mail,
  Phone,
  AlertCircle,
  Eye,
  Server,
  FileText,
  UserCheck,
  Scale,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy & Data Governance Policy | Deptloy",
  description:
    "Explore Deptloy's comprehensive privacy policy, client data sovereignty standards, zero model training guarantees, and security architecture.",
  alternates: { canonical: "/privacy" },
};

const SECTIONS = [
  { id: "framework", num: "01", title: "Privacy Framework & Legal Roles" },
  { id: "zero-training", num: "02", title: "Zero Foundation Model Training" },
  { id: "collection", num: "03", title: "Information We Collect" },
  { id: "legal-bases", num: "04", title: "Legal Bases for Processing" },
  { id: "usage", num: "05", title: "How We Use Ingested Information" },
  { id: "infrastructure", num: "06", title: "Infrastructure & Subprocessors" },
  { id: "retention", num: "07", title: "Data Retention & Disposal" },
  { id: "security", num: "08", title: "Encryption & Security Controls" },
  { id: "rights", num: "09", title: "Your Global Privacy Rights" },
  { id: "transfers", num: "10", title: "International Transfers" },
  { id: "children", num: "11", title: "Children's Privacy" },
  { id: "contact", num: "12", title: "Privacy Inquiries & Contact" },
];

export default function PrivacyPage() {
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
            <span>Data Sovereignty &amp; Privacy Policy</span>
          </div>

          <h1
            style={{ fontSize: "clamp(28px, 4vw, 44px)", lineHeight: 1.15 }}
            className="font-extrabold tracking-tight text-[var(--deep)]"
          >
            Privacy &amp; Data Governance Policy
          </h1>

          <p className="text-sm sm:text-base text-[var(--mute)] mt-3.5 leading-relaxed max-w-3xl">
            This policy outlines how Deptloy protects client information, enforces strict database isolation, and
            guarantees that customer records and call interactions are never used to train commercial AI foundation models.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs font-mono text-[var(--mute)]">
            <span>Last Updated: October 30, 2026</span>
            <span className="opacity-30">•</span>
            <span>Applies Globally</span>
          </div>
        </div>

        {/* Unified Document Sheet */}
        <article className="legal-doc bg-white border border-[rgba(21,19,74,0.12)] p-6 sm:p-10 lg:p-12 rounded-2xl shadow-[0_12px_40px_rgba(87,80,168,0.06)] space-y-8 text-[#34325e] text-sm sm:text-[15px] leading-relaxed">
          {/* Core Guarantee Callout */}
          <div className="p-5 sm:p-6 bg-[#f7fdf9] border border-[#3ccf91]/40 rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-[#16875b] font-bold text-sm">
              <ShieldCheck className="w-5 h-5 shrink-0" />
              <span>The Deptloy Zero-Training Commitment</span>
            </div>
            <p className="text-xs sm:text-sm text-[var(--mute)] leading-relaxed">
              Customer inquiries, client database tables, and production software engineered or hosted by Deptloy are{" "}
              <strong className="text-[var(--deep)]">
                never sold, rented, monetized, or used to train third-party public foundation AI models
              </strong>{" "}
              (such as public models by Google, ElevenLabs, OpenAI, Meta, or Anthropic). You retain 100% data sovereignty
              for all commercial client engagements. (For details regarding our free website demonstration sandbox, see Section 3.B).
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
          <section id="framework" style={{ scrollMarginTop: "105px" }} className="space-y-3 pt-2">
            <h2 className="text-lg sm:text-xl font-extrabold text-[var(--deep)] flex items-center gap-2.5">
              <FileText className="w-5 h-5 text-[var(--pur)] shrink-0" />
              <span>1. Privacy Framework &amp; Legal Roles</span>
            </h2>
            <p>
              Deptloy (&ldquo;Deptloy,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) operates the
              website at{" "}
              <a href="https://www.deptloy.com" className="text-[var(--pur)] font-semibold hover:underline">
                https://www.deptloy.com
              </a>{" "}
              and provides custom software development, database engineering, automated systems integration, and
              autonomous AI receptionist services.
            </p>
            <p>Under international data protection laws (including the GDPR and UK GDPR), our roles are defined as:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
              <div className="bg-[var(--paper)] p-4 rounded-xl border border-[var(--peri)]">
                <span className="text-[11px] font-mono font-bold uppercase text-[var(--pur)] block mb-1">
                  Data Controller
                </span>
                <p className="text-xs leading-relaxed text-[var(--mute)]">
                  For prospective clients and website visitors submitting technical inquiries or requesting custom
                  system quotes directly through our website.
                </p>
              </div>

              <div className="bg-[var(--paper)] p-4 rounded-xl border border-[var(--peri)]">
                <span className="text-[11px] font-mono font-bold uppercase text-[#16875b] block mb-1">
                  Data Processor / Service Provider
                </span>
                <p className="text-xs leading-relaxed text-[var(--mute)]">
                  When building or maintaining client-specific databases, CRMs, or voice agents, the Client is the Data
                  Controller and Deptloy acts strictly as a Data Processor under an executed DPA.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section id="zero-training" style={{ scrollMarginTop: "105px" }} className="border-t border-[var(--mist)] pt-8 space-y-3">
            <h2 className="text-lg sm:text-xl font-extrabold text-[var(--deep)] flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-[#16875b] shrink-0" />
              <span>2. Zero Foundation Model Training</span>
            </h2>
            <p>
              Many consumer and commercial AI platforms incorporate customer telemetry and input data into public model
              training sets. <strong className="text-[var(--deep)]">Deptloy enforces a strict architectural boundary:</strong>
            </p>
            <ul className="space-y-2 pl-2 list-disc list-inside text-[var(--mute)] text-xs sm:text-sm">
              <li>
                <strong className="text-[var(--deep)]">Production Zero Model Training:</strong> Inbound phone call audio,
                speech transcripts, customer CRM records, appointment details, and proprietary code in production are
                never used to train, fine-tune, or improve third-party foundation models.
              </li>
              <li>
                <strong className="text-[var(--deep)]">Production API Boundaries:</strong> All production generative AI
                and conversational voice synthesis engines (including ElevenLabs for voice synthesis and commercial LLM
                providers) are configured under commercial API agreements with model training explicitly disabled and
                zero data retention settings where supported.
              </li>
              <li>
                <strong className="text-[var(--deep)]">Free Demonstration Sandbox Notice:</strong> Our website provides a
                free interactive voice demonstration simulator (<Link href="/demo" className="text-[var(--pur)] font-semibold hover:underline">/demo</Link>)
                powered by the free developer tier of the Google Gemini API. As disclosed directly on the demo console,
                Google may review and use unpaid developer tier interactions to improve its products. Deptloy does not store
                demo audio or transcripts, but visitors must avoid speaking real sensitive data during public demo tests.
              </li>
              <li>
                <strong className="text-[var(--deep)]">No Data Brokerage:</strong> Deptloy does not sell, trade, or
                commercialize personal records, client lists, or telemetry logs to data brokers or advertisers.
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section id="collection" style={{ scrollMarginTop: "105px" }} className="border-t border-[var(--mist)] pt-8 space-y-3">
            <h2 className="text-lg sm:text-xl font-extrabold text-[var(--deep)] flex items-center gap-2.5">
              <Eye className="w-5 h-5 text-[var(--pur)] shrink-0" />
              <span>3. Information We Collect</span>
            </h2>
            <p>We collect information through three primary touchpoints:</p>
            <div className="space-y-3 pt-1">
              <div className="p-4 bg-[var(--paper)] rounded-xl border border-[var(--peri)]">
                <h3 style={{ fontSize: "14px", fontWeight: 700 }} className="text-[var(--deep)] mb-1">
                  A. Project Inquiries &amp; Technical Discovery Form
                </h3>
                <p className="text-xs leading-relaxed text-[var(--mute)]">
                  When you submit an inquiry via our contact form at{" "}
                  <Link href="/contact#form" className="text-[var(--pur)] font-semibold hover:underline">
                    deptloy.com/contact
                  </Link>{" "}
                  or email our engineering team directly, we collect: Your Full Name, Work Email Address, optional
                  Company/Project Name, optional Preferred Date &amp; Time Window preferences, and your Project
                  Description.
                </p>
              </div>

              <div className="p-4 bg-[var(--paper)] rounded-xl border border-[var(--peri)]">
                <h3 style={{ fontSize: "14px", fontWeight: 700 }} className="text-[var(--deep)] mb-1">
                  B. Interactive Voice Receptionist Simulator (/demo)
                </h3>
                <p className="text-xs leading-relaxed text-[var(--mute)]">
                  When you test our interactive voice receptionist simulator at{" "}
                  <Link href="/demo" className="text-[var(--pur)] font-semibold hover:underline">
                    deptloy.com/demo
                  </Link>
                  , voice audio and conversational turns are streamed ephemerally through a secure real-time WebSocket
                  connection using the free developer tier of the Google Gemini API to demonstrate real-time reasoning and
                  conversational speech. Deptloy does not store your demo audio or transcripts. However, as noted directly on
                  the simulator interface and in accordance with Google&apos;s standard terms for free developer quotas, Google
                  may log and review conversations from unpaid developer tiers to improve its machine learning models. We
                  recommend visitors test using hypothetical business scenarios and refrain from speaking sensitive personal
                  information (such as credit card numbers, passwords, health data, or national identification numbers).
                  All commercial client systems run on dedicated, isolated enterprise pipelines.
                </p>
              </div>

              <div className="p-4 bg-[var(--paper)] rounded-xl border border-[var(--peri)]">
                <h3 style={{ fontSize: "14px", fontWeight: 700 }} className="text-[var(--deep)] mb-1">
                  C. Automated Technical Telemetry &amp; Cookies
                </h3>
                <p className="text-xs leading-relaxed text-[var(--mute)]">
                  When you navigate our website, our edge infrastructure automatically logs essential technical headers:
                  browser user-agent, operating system, referring URL, and timestamp. We use only strictly necessary
                  session headers for security and site routing. We do not deploy third-party advertising or tracking pixels.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section id="legal-bases" style={{ scrollMarginTop: "105px" }} className="border-t border-[var(--mist)] pt-8 space-y-3">
            <h2 className="text-lg sm:text-xl font-extrabold text-[var(--deep)] flex items-center gap-2.5">
              <Scale className="w-5 h-5 text-[var(--pur)] shrink-0" />
              <span>4. Legal Bases for Processing (GDPR Compliance)</span>
            </h2>
            <p>Deptloy processes personal data under the following recognized legal bases:</p>
            <ul className="space-y-2 pl-2 list-disc list-inside text-[var(--mute)] text-xs sm:text-sm">
              <li>
                <strong className="text-[var(--deep)]">Performance of Contract:</strong> Necessary to scope, engineer,
                deploy, and support custom software platforms and voice receptionists.
              </li>
              <li>
                <strong className="text-[var(--deep)]">Legitimate Business Interests:</strong> Responding to inbound
                project inquiries, scheduling technical consultations, protecting our network against malicious attacks,
                and maintaining platform security.
              </li>
              <li>
                <strong className="text-[var(--deep)]">Legal Compliance:</strong> Adhering to statutory accounting,
                corporate record-keeping, and telecommunications regulatory mandates.
              </li>
              <li>
                <strong className="text-[var(--deep)]">Consent:</strong> Where affirmative consent is obtained (e.g.,
                voluntary participation in recorded discovery calls or optional notifications).
              </li>
            </ul>
          </section>

          {/* Section 5 */}
          <section id="usage" style={{ scrollMarginTop: "105px" }} className="border-t border-[var(--mist)] pt-8 space-y-3">
            <h2 className="text-lg sm:text-xl font-extrabold text-[var(--deep)] flex items-center gap-2.5">
              <Database className="w-5 h-5 text-[var(--pur)] shrink-0" />
              <span>5. How We Use Ingested Information</span>
            </h2>
            <p>Data collected by Deptloy is used solely for the following explicit purposes:</p>
            <ul className="space-y-2 pl-2 list-disc list-inside text-[var(--mute)] text-xs sm:text-sm">
              <li>Reviewing technical requirements and delivering fixed-milestone architectural proposals.</li>
              <li>Configuring dedicated PostgreSQL databases, CRM tables, and custom workflow automations.</li>
              <li>
                Executing real-time caller intake, appointment scheduling, and CRM synchronization for deployed AI
                receptionists.
              </li>
              <li>Preventing fraudulent telephony spoofing, bot attacks, and unauthorized system intrusion.</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section id="infrastructure" style={{ scrollMarginTop: "105px" }} className="border-t border-[var(--mist)] pt-8 space-y-3">
            <h2 className="text-lg sm:text-xl font-extrabold text-[var(--deep)] flex items-center gap-2.5">
              <Server className="w-5 h-5 text-[var(--pur)] shrink-0" />
              <span>6. Infrastructure &amp; Subprocessors</span>
            </h2>
            <p>
              Deptloy enforces strict environment isolation. Client application backends are deployed into isolated
              instances rather than aggregated multi-tenant data pools. Our vetted technology infrastructure providers include:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
              <div className="p-3 bg-[var(--paper)] rounded-lg border border-[var(--peri)]">
                <strong className="text-[var(--deep)] block">Vercel Inc.</strong>
                <span className="text-[var(--mute)]">
                  Primary web application hosting, global edge CDN routing, SSL/TLS certificate termination, and serverless compute infrastructure.
                </span>
              </div>
              <div className="p-3 bg-[var(--paper)] rounded-lg border border-[var(--peri)]">
                <strong className="text-[var(--deep)] block">ElevenLabs Inc.</strong>
                <span className="text-[var(--mute)]">
                  Conversational voice synthesis and speech generation for custom production AI receptionist deployments (configured with model training disabled).
                </span>
              </div>
              <div className="p-3 bg-[var(--paper)] rounded-lg border border-[var(--peri)]">
                <strong className="text-[var(--deep)] block">Google Cloud (Gemini API)</strong>
                <span className="text-[var(--mute)]">
                  Real-time conversational intelligence powering the website&apos;s free demonstration simulator (`/demo`) under Google&apos;s standard developer tier terms.
                </span>
              </div>
              <div className="p-3 bg-[var(--paper)] rounded-lg border border-[var(--peri)]">
                <strong className="text-[var(--deep)] block">Cloudflare Inc.</strong>
                <span className="text-[var(--mute)]">
                  Edge shielding, Turnstile human bot verification, DNS routing, and DDoS mitigation.
                </span>
              </div>
              <div className="p-3 bg-[var(--paper)] rounded-lg border border-[var(--peri)]">
                <strong className="text-[var(--deep)] block">Supabase &amp; AWS RDS</strong>
                <span className="text-[var(--mute)]">
                  Dedicated relational PostgreSQL storage and database infrastructure for custom client software with AES-256 encryption at rest.
                </span>
              </div>
              <div className="p-3 bg-[var(--paper)] rounded-lg border border-[var(--peri)]">
                <strong className="text-[var(--deep)] block">Twilio &amp; Telnyx</strong>
                <span className="text-[var(--mute)]">
                  Telephony carrier trunking, virtual numbers, and SIP audio routing for client voice deployments.
                </span>
              </div>
            </div>
          </section>

          {/* Section 7 */}
          <section id="retention" style={{ scrollMarginTop: "105px" }} className="border-t border-[var(--mist)] pt-8 space-y-3">
            <h2 className="text-lg sm:text-xl font-extrabold text-[var(--deep)] flex items-center gap-2.5">
              <Lock className="w-5 h-5 text-[var(--pur)] shrink-0" />
              <span>7. Data Retention &amp; Disposal</span>
            </h2>
            <p>
              We adhere to the principle of data minimization and retain information only for the duration necessary:
            </p>
            <ul className="space-y-2 pl-2 list-disc list-inside text-[var(--mute)] text-xs sm:text-sm">
              <li>
                <strong className="text-[var(--deep)]">Prospective Inquiries:</strong> Retained for active scoping or up
                to twenty-four (24) months, or purged immediately upon receipt of a verified deletion request.
              </li>
              <li>
                <strong className="text-[var(--deep)]">Client Production Records:</strong> Controlled exclusively by the
                Client&apos;s custom data retention policy (e.g., rolling 30-day transcript retention, immediate audio
                stream discard, or long-term archiving).
              </li>
              <li>
                <strong className="text-[var(--deep)]">Cryptographic Purging:</strong> Upon contract completion or verified
                deletion request, all client secrets, staging databases, and credentials are permanently purged in
                accordance with NIST SP 800-88 sanitization standards.
              </li>
            </ul>
          </section>

          {/* Section 8 */}
          <section id="security" style={{ scrollMarginTop: "105px" }} className="border-t border-[var(--mist)] pt-8 space-y-3">
            <h2 className="text-lg sm:text-xl font-extrabold text-[var(--deep)] flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-[#16875b] shrink-0" />
              <span>8. Encryption &amp; Security Controls</span>
            </h2>
            <p>
              Deptloy implements defense-in-depth security engineering across all public endpoints and dedicated client deployments:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-4 bg-[var(--paper)] rounded-xl border border-[var(--peri)]">
                <strong className="text-[var(--deep)] block font-bold mb-1">Encryption in Transit</strong>
                <p className="text-xs leading-relaxed text-[var(--mute)]">
                  All web traffic, API transactions, and voice streaming WebSockets enforce TLS 1.3 encryption with
                  strict HTTP Strict Transport Security (HSTS) headers.
                </p>
              </div>
              <div className="p-4 bg-[var(--paper)] rounded-xl border border-[var(--peri)]">
                <strong className="text-[var(--deep)] block font-bold mb-1">Encryption at Rest</strong>
                <p className="text-xs leading-relaxed text-[var(--mute)]">
                  All database tables, disk volumes, environment secrets, and automated backups are encrypted using
                  industry-standard AES-256 encryption.
                </p>
              </div>
            </div>
          </section>

          {/* Section 9 */}
          <section id="rights" style={{ scrollMarginTop: "105px" }} className="border-t border-[var(--mist)] pt-8 space-y-3">
            <h2 className="text-lg sm:text-xl font-extrabold text-[var(--deep)] flex items-center gap-2.5">
              <UserCheck className="w-5 h-5 text-[var(--pur)] shrink-0" />
              <span>9. Your Global Privacy Rights</span>
            </h2>
            <p>
              Depending on your jurisdiction (such as the European Union, United Kingdom, California, or Canada), you
              possess explicit legal rights regarding your personal data:
            </p>
            <ul className="space-y-2 pl-2 list-disc list-inside text-[var(--mute)] text-xs sm:text-sm">
              <li><strong className="text-[var(--deep)]">Right to Access / Know:</strong> Request confirmation of whether we process your personal data and obtain a readable copy.</li>
              <li><strong className="text-[var(--deep)]">Right to Rectification:</strong> Correct inaccurate or incomplete personal information.</li>
              <li><strong className="text-[var(--deep)]">Right to Erasure:</strong> Request the deletion of your personal records (&ldquo;Right to be Forgotten&rdquo;).</li>
              <li><strong className="text-[var(--deep)]">Right to Data Portability:</strong> Receive your data in a structured, commonly used machine-readable format.</li>
              <li><strong className="text-[var(--deep)]">Non-Discrimination (CCPA/CPRA):</strong> We will never discriminate against you in pricing, service quality, or responsiveness for exercising your privacy rights.</li>
            </ul>
            <div className="p-4 bg-[var(--paper)] rounded-xl border border-[var(--peri)] text-xs text-[var(--mute)]">
              To exercise any of these statutory rights, please send an email to{" "}
              <a href="mailto:deptloy@gmail.com" className="text-[var(--pur)] font-bold hover:underline">
                deptloy@gmail.com
              </a>
              . We verify identity prior to fulfilling requests and respond within thirty (30) days.
            </div>
          </section>

          {/* Section 10 */}
          <section id="transfers" style={{ scrollMarginTop: "105px" }} className="border-t border-[var(--mist)] pt-8 space-y-3">
            <h2 className="text-lg sm:text-xl font-extrabold text-[var(--deep)] flex items-center gap-2.5">
              <Server className="w-5 h-5 text-[var(--pur)] shrink-0" />
              <span>10. International Transfers</span>
            </h2>
            <p>
              Deptloy operates globally with cloud infrastructure distributed across Tier-1 data centers in the United
              States and Europe. When personal data originating in the European Economic Area (EEA), United Kingdom, or
              Switzerland is transferred to other jurisdictions, we ensure adequate protection through standard contractual
              safeguards, including the European Commission&apos;s Standard Contractual Clauses (SCCs).
            </p>
          </section>

          {/* Section 11 */}
          <section id="children" style={{ scrollMarginTop: "105px" }} className="border-t border-[var(--mist)] pt-8 space-y-3">
            <h2 className="text-lg sm:text-xl font-extrabold text-[var(--deep)] flex items-center gap-2.5">
              <AlertCircle className="w-5 h-5 text-[var(--or)] shrink-0" />
              <span>11. Children&apos;s Privacy</span>
            </h2>
            <p>
              Deptloy&apos;s website, custom software, and AI voice platforms are strictly intended for professional
              business enterprises and adults aged eighteen (18) and older. We do not knowingly solicit, collect, or
              maintain data from individuals under eighteen.
            </p>
          </section>

          {/* Section 12 */}
          <section id="contact" style={{ scrollMarginTop: "105px" }} className="border-t border-[var(--mist)] pt-8 space-y-4">
            <h2 className="text-lg sm:text-xl font-extrabold text-[var(--deep)] flex items-center gap-2.5">
              <Mail className="w-5 h-5 text-[var(--or)] shrink-0" />
              <span>12. Privacy Inquiries &amp; Contact</span>
            </h2>
            <p className="text-[var(--mute)]">
              If you have questions regarding data governance, need an executed Data Processing Addendum (DPA) for your
              enterprise, or wish to exercise your statutory privacy rights, our team can be reached directly:
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
                href="/terms"
                className="inline-flex items-center gap-1.5 text-[var(--pur)] font-semibold hover:underline p-2.5 sm:ml-auto"
              >
                <span>Terms of Service</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </section>

          {/* Tail Note for Enterprise DPA */}
          <div className="pt-6 border-t border-[var(--mist)] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-[var(--mute)]">
            <p>
              Need a custom Master Services Agreement (MSA) or corporate DPA? We execute tailored compliance contracts for enterprise projects.
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
