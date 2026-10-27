import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import fs from "fs/promises";
import path from "path";

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
  phone?: string;
  honeypot?: string;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<ContactRequestBody>;

    // Honeypot spam protection
    if (body.honeypot) {
      return NextResponse.json(
        { error: "Spam submission rejected." },
        { status: 400 }
      );
    }

    // 1. Normalize and sanitize incoming fields
    const fullName = (body.fullName || body.name || "").trim();
    const email = (body.email || "").trim().toLowerCase();
    const companyName = (body.companyName || body.company || "Direct Inquiry").trim();
    const serviceRequired = (
      body.serviceRequired ||
      body.service ||
      body.projectType ||
      "Custom software inquiry"
    ).trim();
    const projectDescription = (
      body.projectDescription ||
      body.message ||
      body.description ||
      ""
    ).trim();

    // 2. Server-side validation
    if (!fullName || fullName.length < 2) {
      return NextResponse.json(
        { error: "Please enter your name (at least 2 characters)." },
        { status: 400 }
      );
    }

    if (fullName.length > 100) {
      return NextResponse.json(
        { error: "Name must be under 100 characters." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email) || email.length > 150) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (!projectDescription || projectDescription.length < 3) {
      return NextResponse.json(
        { error: "Please share what you would like to build or your inquiry details." },
        { status: 400 }
      );
    }

    if (projectDescription.length > 5000) {
      return NextResponse.json(
        { error: "Message length must be under 5,000 characters." },
        { status: 400 }
      );
    }

    // 3. Resolve Gmail Credentials (accessed ONLY on the server)
    const gmailUser = (process.env.GMAIL_USER || process.env.EMAIL_USER || "").trim();
    const gmailPass = (process.env.GMAIL_APP_PASSWORD || process.env.EMAIL_PASS || "").replace(/\s+/g, "");
    const recipientEmail = (process.env.CONTACT_EMAIL || gmailUser || "deptloy@gmail.com").trim();

    if (!gmailUser || !gmailPass) {
      console.error(
        "[api/contact] Missing Gmail credentials. GMAIL_USER and GMAIL_APP_PASSWORD environment variables must be set."
      );
      return NextResponse.json(
        {
          error:
            "Email service is currently unconfigured on the server. Please contact deptloy@gmail.com directly while we configure server credentials.",
        },
        { status: 503 }
      );
    }

    const isCallRequest =
      serviceRequired.toLowerCase().includes("call") ||
      serviceRequired.toLowerCase().includes("appointment");
    const prefix = isCallRequest ? "CAL" : "DEP";
    const submissionId = `${prefix}-${Math.floor(100000 + Math.random() * 900000)}`;
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

    // 4. Configure Nodemailer with Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: gmailPass,
      },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 15000,
    });

    const subject = isCallRequest
      ? `New Call Request: ${fullName} (${serviceRequired}) - Deptloy [${submissionId}]`
      : `New Quote Request: ${fullName} (${companyName}) - Deptloy [${submissionId}]`;

    const plainText = `
New Submission Received on Deptloy
------------------------------------------------
Reference ID: ${submissionId}
Date:         ${timestamp}
Type:         ${serviceRequired}

Contact Name: ${fullName}
Email:        ${email}
Company:      ${companyName}

Message / Details:
${projectDescription}

------------------------------------------------
Reply directly to this email to contact ${fullName} (${email}).
    `.trim();

    const htmlContent = generateHtmlEmail(leadRecord);

    // 5. Send Email via Gmail SMTP
    try {
      const info = await transporter.sendMail({
        from: `"${fullName.replace(/["\r\n]/g, "")} via Deptloy" <${gmailUser}>`,
        to: recipientEmail,
        replyTo: email,
        subject,
        text: plainText,
        html: htmlContent,
      });

      console.log(`[api/contact] Email dispatched successfully: ${info.messageId} -> ${recipientEmail}`);
    } catch (mailError) {
      console.error("[api/contact] Nodemailer Gmail dispatch failed:", mailError);
      return NextResponse.json(
        {
          error:
            "Failed to send email. Please check server credentials or email deptloy@gmail.com directly.",
        },
        { status: 500 }
      );
    }

    // 6. Safe local backup for development environments (ignored if filesystem is read-only)
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
    } catch {
      // Ignored in read-only environments like Vercel serverless
    }

    // 7. Return success ONLY after Nodemailer sendMail has succeeded
    return NextResponse.json({
      success: true,
      submissionId,
      message: `Your request was successfully delivered to ${recipientEmail}.`,
    });
  } catch (error) {
    console.error("[api/contact] Unexpected route error:", error);
    return NextResponse.json(
      {
        error:
          "An unexpected error occurred while processing your request. Please try again or email deptloy@gmail.com directly.",
      },
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
  const isCall = lead.serviceRequired.toLowerCase().includes("call");
  const badgeLabel = isCall ? "Discovery Call Request" : "New Quote Request";
  const badgeColor = isCall ? "#8478e0" : "#fd9150";

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(badgeLabel)}</title>
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
      background: ${badgeColor};
      color: ${isCall ? "#ffffff" : "#15134a"};
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
      <span class="badge">${escapeHtml(badgeLabel)}</span>
      <h2>${escapeHtml(lead.companyName)}</h2>
      <p style="margin: 0; font-size: 13px; color: #d2cdf3;">
        Submitted by <strong>${escapeHtml(lead.fullName)}</strong> • ${new Date(lead.timestamp).toUTCString()}
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
        <span class="label">Request Type</span>
        <span class="value">${escapeHtml(lead.serviceRequired)}</span>
      </div>
      <div class="row">
        <span class="label">Reference ID</span>
        <span class="value" style="font-family: monospace;">${escapeHtml(lead.id)}</span>
      </div>

      <div class="box">
        <div class="box-title">Details & Context</div>
        <p class="box-text">${escapeHtml(lead.projectDescription)}</p>
      </div>

      <div class="action">
        <a href="mailto:${escapeHtml(lead.email)}?subject=Re:%20Deptloy%20Inquiry%20[${encodeURIComponent(lead.id)}]" class="btn">
          Reply Directly to ${escapeHtml(lead.fullName)}
        </a>
      </div>
    </div>

    <div class="footer">
      Deptloy • Software built to outlast the hype • Server-side Notification
    </div>
  </div>
</body>
</html>
  `.trim();
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}