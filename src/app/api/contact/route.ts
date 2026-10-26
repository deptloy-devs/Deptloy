import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import fs from "fs/promises";
import path from "path";

const RECIPIENT_EMAIL = process.env.CONTACT_EMAIL || "deptloy@gmail.com";

interface ContactRequestBody {
  fullName?: string;
  name?: string;
  email: string;
  companyName?: string;
  company?: string;
  serviceRequired?: string;
  service?: string;
  projectType?: string;
  projectDescription?: string;
  message?: string;
  description?: string;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<ContactRequestBody>;
    
    // Normalize fields from both minimal (home page) and detailed (/contact) forms
    const fullName = (body.fullName || body.name || "").trim();
    const email = (body.email || "").trim().toLowerCase();
    const companyName = (body.companyName || body.company || "Direct Client Inquiry").trim();
    const serviceRequired = (
      body.serviceRequired ||
      body.service ||
      body.projectType ||
      "Full System Quote / Consultation"
    ).trim();
    const projectDescription = (
      body.projectDescription ||
      body.message ||
      body.description ||
      ""
    ).trim();

    // Server-side validation
    if (!fullName || fullName.length < 2) {
      return NextResponse.json(
        { error: "Please enter your name (at least 2 characters)." },
        { status: 400 }
      );
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (!projectDescription || projectDescription.length < 3) {
      return NextResponse.json(
        { error: "Please share a few words about what you would like to build or improve." },
        { status: 400 }
      );
    }

    const submissionId = `DEP-${Math.floor(100000 + Math.random() * 900000)}`;
    const timestamp = new Date().toISOString();

    const leadRecord = {
      id: submissionId,
      fullName,
      email,
      companyName,
      serviceRequired,
      projectDescription,
      timestamp,
    };

    console.log("=== NEW QUOTE REQUEST RECEIVED ===");
    console.log(leadRecord);

    let emailSent = false;
    let emailError: string | null = null;

    // 1. Try sending via Resend API if RESEND_API_KEY is configured
    if (process.env.RESEND_API_KEY) {
      try {
        const resendRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: process.env.EMAIL_FROM || "Deptloy <onboarding@resend.dev>",
            to: [RECIPIENT_EMAIL],
            reply_to: email,
            subject: `New Quote Request: ${companyName} (${fullName})`,
            html: generateHtmlEmail(leadRecord),
          }),
        });

        if (resendRes.ok) {
          emailSent = true;
          console.log("Quote email dispatched via Resend API to", RECIPIENT_EMAIL);
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

    // 2. Try sending via Gmail App Password or custom SMTP
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
          from: `"${fullName} via Deptloy" <${smtpUser}>`,
          to: RECIPIENT_EMAIL,
          replyTo: email,
          subject: `New Quote Request: ${companyName} (${fullName})`,
          text: `
New Quote Request Received on Deptloy

Name: ${fullName}
Email: ${email}
Company: ${companyName}
Service: ${serviceRequired}
Reference ID: ${submissionId}
Date: ${timestamp}

Details / Message:
${projectDescription}
          `,
          html: generateHtmlEmail(leadRecord),
        });

        emailSent = true;
        console.log("Quote email dispatched via Gmail SMTP to", RECIPIENT_EMAIL);
      } catch (err) {
        console.error("Failed to dispatch via SMTP:", err);
        emailError = String(err);
      }
    }

    // 3. Persist lead record locally to data/leads.json as a guaranteed backup
    try {
      const dataDir = path.join(process.cwd(), "data");
      await fs.mkdir(dataDir, { recursive: true });
      const leadsFilePath = path.join(dataDir, "leads.json");
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
      console.warn("Could not write to data/leads.json:", fsErr);
    }

    return NextResponse.json({
      success: true,
      submissionId,
      emailSent,
      recipient: RECIPIENT_EMAIL,
      notice: emailSent
        ? `Quote request sent directly to ${RECIPIENT_EMAIL}.`
        : `Quote request recorded successfully under Ref: ${submissionId}.`,
      ...(emailError && !emailSent ? { debugNote: emailError } : {}),
    });
  } catch (error) {
    console.error("Contact API route error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while processing your request. Please try again or email deptloy@gmail.com directly." },
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
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background-color: #f4f3fb;
      color: #15134a;
      margin: 0;
      padding: 32px 16px;
    }
    .wrapper {
      max-width: 580px;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 16px;
      border: 1px solid rgba(87, 80, 168, 0.16);
      box-shadow: 0 16px 40px rgba(87, 80, 168, 0.08);
      overflow: hidden;
    }
    .header {
      background: #15134a;
      padding: 24px 28px;
      color: #ffffff;
    }
    .header h2 {
      margin: 0 0 6px;
      font-size: 20px;
      letter-spacing: -0.02em;
      color: #ffffff;
    }
    .badge {
      display: inline-block;
      background: #fd9150;
      color: #15134a;
      font-size: 11px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      padding: 4px 10px;
      border-radius: 99px;
      margin-bottom: 12px;
    }
    .body {
      padding: 28px;
    }
    .row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 0;
      border-bottom: 1px solid #e8e6f7;
      font-size: 14px;
    }
    .label {
      color: #5c5a86;
      font-weight: 500;
    }
    .value {
      color: #15134a;
      font-weight: 700;
      text-align: right;
    }
    .box {
      margin-top: 20px;
      background: #f4f3fb;
      border: 1px solid #d2cdf3;
      border-radius: 12px;
      padding: 16px;
    }
    .box-title {
      font-size: 11px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #5750a8;
      margin-bottom: 8px;
    }
    .box-text {
      color: #15134a;
      font-size: 14px;
      line-height: 1.6;
      white-space: pre-wrap;
      margin: 0;
    }
    .action {
      margin-top: 24px;
      text-align: center;
    }
    .btn {
      display: inline-block;
      background: #15134a;
      color: #ffffff !important;
      text-decoration: none;
      padding: 12px 28px;
      border-radius: 99px;
      font-weight: 700;
      font-size: 14px;
    }
    .footer {
      padding: 16px 28px 24px;
      text-align: center;
      font-size: 12px;
      color: #5c5a86;
      border-top: 1px solid #e8e6f7;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <span class="badge">New Quote Request</span>
      <h2>${escapeHtml(lead.companyName)}</h2>
      <p style="margin: 0; font-size: 13px; color: #d2cdf3;">
        Submitted by <strong>${escapeHtml(lead.fullName)}</strong> • ${new Date(lead.timestamp).toLocaleString("en-US", { timeZone: "America/New_York" })}
      </p>
    </div>
    
    <div class="body">
      <div class="row">
        <span class="label">Contact Name</span>
        <span class="value">${escapeHtml(lead.fullName)}</span>
      </div>
      <div class="row">
        <span class="label">Email Address</span>
        <span class="value"><a href="mailto:${escapeHtml(lead.email)}" style="color: #5750a8;">${escapeHtml(lead.email)}</a></span>
      </div>
      <div class="row">
        <span class="label">Company / Practice</span>
        <span class="value">${escapeHtml(lead.companyName)}</span>
      </div>
      <div class="row">
        <span class="label">Requested Focus</span>
        <span class="value">${escapeHtml(lead.serviceRequired)}</span>
      </div>
      <div class="row">
        <span class="label">Reference ID</span>
        <span class="value" style="font-family: monospace;">${escapeHtml(lead.id)}</span>
      </div>

      <div class="box">
        <div class="box-title">Project Details & Pain Points</div>
        <p class="box-text">${escapeHtml(lead.projectDescription)}</p>
      </div>

      <div class="action">
        <a href="mailto:${escapeHtml(lead.email)}?subject=Re:%20Deptloy%20Quote%20Inquiry%20(${encodeURIComponent(lead.id)})" class="btn">
          Reply Directly to ${escapeHtml(lead.fullName)}
        </a>
      </div>
    </div>

    <div class="footer">
      Deptloy • Software built to outlast the hype • Lead Routing System
    </div>
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
