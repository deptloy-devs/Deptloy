import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import fs from "fs/promises";
import path from "path";

const RECIPIENT_EMAIL = process.env.CONTACT_EMAIL || "deptloy@gmail.com";

interface ContactRequestBody {
  fullName: string;
  email: string;
  companyName: string;
  serviceRequired: string;
  projectDescription: string;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<ContactRequestBody>;
    const { fullName, email, companyName, serviceRequired, projectDescription } = body;

    // Server-side validation
    if (!fullName || typeof fullName !== "string" || fullName.trim().length < 2) {
      return NextResponse.json({ error: "Please enter your full name." }, { status: 400 });
    }

    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    if (!companyName || typeof companyName !== "string" || companyName.trim().length < 1) {
      return NextResponse.json({ error: "Please enter your company or practice name." }, { status: 400 });
    }

    if (!serviceRequired || typeof serviceRequired !== "string") {
      return NextResponse.json({ error: "Please select the primary service needed." }, { status: 400 });
    }

    if (!projectDescription || typeof projectDescription !== "string" || projectDescription.trim().length < 5) {
      return NextResponse.json({ error: "Please provide brief details about your inquiry." }, { status: 400 });
    }

    const submissionId = `DEP-${Math.floor(100000 + Math.random() * 900000)}`;
    const timestamp = new Date().toISOString();

    const leadRecord = {
      id: submissionId,
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      companyName: companyName.trim(),
      serviceRequired: serviceRequired.trim(),
      projectDescription: projectDescription.trim(),
      timestamp,
    };

    console.log("=== NEW QUOTE REQUEST RECEIVED ===");
    console.log(leadRecord);

    let emailSent = false;
    let emailError: string | null = null;

    // 1. Try sending via Resend if RESEND_API_KEY is configured
    if (process.env.RESEND_API_KEY) {
      try {
        const resendRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: process.env.EMAIL_FROM || "Deptloy Quotes <onboarding@resend.dev>",
            to: [RECIPIENT_EMAIL],
            reply_to: email.trim(),
            subject: `New Quote Request: ${companyName.trim()} (${fullName.trim()})`,
            html: generateHtmlEmail(leadRecord),
          }),
        });

        if (resendRes.ok) {
          emailSent = true;
          console.log("Email dispatched via Resend API to", RECIPIENT_EMAIL);
        } else {
          const errData = await resendRes.text();
          console.error("Resend API error:", errData);
          emailError = `Resend error: ${errData}`;
        }
      } catch (err) {
        console.error("Failed to dispatch via Resend:", err);
        emailError = String(err);
      }
    }

    // 2. Try sending via SMTP / Gmail App Password if configured
    const smtpPass = process.env.EMAIL_PASS || process.env.GMAIL_APP_PASSWORD;
    const smtpUser = process.env.EMAIL_USER || process.env.GMAIL_USER || RECIPIENT_EMAIL;

    if (!emailSent && smtpPass) {
      try {
        const transporter = nodemailer.createTransport({
          service: process.env.SMTP_SERVICE || "gmail",
          host: process.env.SMTP_HOST,
          port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : undefined,
          secure: process.env.SMTP_SECURE === "true",
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        await transporter.sendMail({
          from: `"${fullName.trim()} via Deptloy" <${smtpUser}>`,
          to: RECIPIENT_EMAIL,
          replyTo: email.trim(),
          subject: `New Quote Request: ${companyName.trim()} (${fullName.trim()})`,
          text: `
New Quote Request from Deptloy Website

Name: ${fullName.trim()}
Email: ${email.trim()}
Company / Practice: ${companyName.trim()}
Service: ${serviceRequired.trim()}
Reference: ${submissionId}
Date: ${timestamp}

Details:
${projectDescription.trim()}
          `,
          html: generateHtmlEmail(leadRecord),
        });

        emailSent = true;
        console.log("Email dispatched via SMTP to", RECIPIENT_EMAIL);
      } catch (err) {
        console.error("Failed to dispatch via SMTP:", err);
        emailError = String(err);
      }
    }

    // 3. Persist lead record locally to data/leads.json as backup
    try {
      const leadsFilePath = path.join(process.cwd(), "data", "leads.json");
      let existingLeads = [];
      try {
        const fileContent = await fs.readFile(leadsFilePath, "utf8");
        existingLeads = JSON.parse(fileContent);
      } catch {
        existingLeads = [];
      }
      existingLeads.unshift(leadRecord);
      await fs.writeFile(leadsFilePath, JSON.stringify(existingLeads, null, 2), "utf8");
      console.log("Lead successfully persisted to data/leads.json");
    } catch (fsErr) {
      console.warn("Could not write to local leads.json (read-only environment):", fsErr);
    }

    return NextResponse.json({
      success: true,
      submissionId,
      emailSent,
      recipient: RECIPIENT_EMAIL,
      notice: emailSent
        ? `Quote request sent directly to ${RECIPIENT_EMAIL}.`
        : `Quote request recorded successfully. (Ref: ${submissionId})`,
      ...(emailError && !emailSent ? { debugNote: emailError } : {}),
    });
  } catch (error) {
    console.error("Contact API route error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while processing your request. Please try again." },
      { status: 500 }
    );
  }
}

function generateHtmlEmail(lead: {
  id: string;
  fullName: string;
  email: string;
  companyName: string;
  serviceRequired: string;
  projectDescription: string;
  timestamp: string;
}) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #070a12; color: #f4f6fb; margin: 0; padding: 24px; }
    .card { background-color: #111625; border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; max-width: 600px; margin: 0 auto; padding: 28px; }
    .badge { display: inline-block; background-color: #4840f5; color: #ffffff; padding: 4px 10px; border-radius: 6px; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px; }
    h1 { color: #ffffff; font-size: 22px; margin-top: 14px; margin-bottom: 6px; }
    .sub { color: #a0abbf; font-size: 14px; margin-bottom: 24px; }
    .row { display: flex; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.06); padding: 10px 0; font-size: 14px; }
    .label { color: #a0abbf; font-weight: 500; }
    .value { color: #ffffff; font-weight: 600; text-align: right; }
    .details { background-color: #181f33; border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 16px; margin-top: 20px; font-size: 14px; line-height: 1.6; color: #cbd3e1; white-space: pre-wrap; }
    .cta { margin-top: 24px; text-align: center; }
    .btn { display: inline-block; background: linear-gradient(100deg, #4840f5 0%, #2f62e6 100%); color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: bold; font-size: 14px; }
    .footer { text-align: center; color: #8692a8; font-size: 12px; margin-top: 24px; }
  </style>
</head>
<body>
  <div class="card">
    <span class="badge">New Quote Request</span>
    <h1>${escapeHtml(lead.companyName)}</h1>
    <p class="sub">Submitted by <strong>${escapeHtml(lead.fullName)}</strong> on ${new Date(lead.timestamp).toLocaleString("en-US", { timeZone: "America/Los_Angeles" })} (PT)</p>

    <div class="row"><span class="label">Client Name:</span><span class="value">${escapeHtml(lead.fullName)}</span></div>
    <div class="row"><span class="label">Email:</span><span class="value"><a href="mailto:${escapeHtml(lead.email)}" style="color: #60a5fa;">${escapeHtml(lead.email)}</a></span></div>
    <div class="row"><span class="label">Company / Practice:</span><span class="value">${escapeHtml(lead.companyName)}</span></div>
    <div class="row"><span class="label">Primary Service:</span><span class="value">${escapeHtml(lead.serviceRequired)}</span></div>
    <div class="row"><span class="label">Reference ID:</span><span class="value" style="font-family: monospace;">${escapeHtml(lead.id)}</span></div>

    <div style="margin-top: 20px;">
      <span class="label" style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Project Details & Pain Points:</span>
      <div class="details">${escapeHtml(lead.projectDescription)}</div>
    </div>

    <div class="cta">
      <a href="mailto:${escapeHtml(lead.email)}?subject=Re: Deptloy Quote for ${encodeURIComponent(lead.companyName)}" class="btn">
        Reply Directly to Client
      </a>
    </div>

    <p class="footer">Deptloy AI Solutions • Automated Quote Delivery System</p>
  </div>
</body>
</html>
  `;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
