import nodemailer from "nodemailer";

/**
 * Lead emails to the Deptloy team. Used by the contact form and by Dep's
 * voice bookings, so both arrive in the same format.
 */

export type Lead = {
  id: string;
  fullName: string;
  email: string;
  companyName: string;
  serviceRequired: string;
  projectDescription: string;
  timestamp: string;
};

export type MailSettings = { user: string; pass: string; to: string };

type Env = Record<string, string | undefined>;

/** Gmail credentials, or null when they aren't set. Server only. */
export function readMailSettings(env: Env = process.env): MailSettings | null {
  const user = (env.GMAIL_USER || env.EMAIL_USER || "").trim();
  const pass = (env.GMAIL_APP_PASSWORD || env.EMAIL_PASS || "").replace(/\s+/g, "");
  if (!user || !pass) return null;
  const to = (env.CONTACT_EMAIL || user || "deptloy@gmail.com").trim();
  return { user, pass, to };
}

export function isCallRequest(serviceRequired: string): boolean {
  const s = serviceRequired.toLowerCase();
  return s.includes("call") || s.includes("appointment");
}

export function composeLeadEmail(lead: Lead): { subject: string; text: string; html: string } {
  const { id, fullName, email, companyName, serviceRequired, projectDescription, timestamp } = lead;
  const subject = isCallRequest(serviceRequired)
    ? `New Call Request: ${fullName} (${serviceRequired}) - Deptloy [${id}]`
    : `New Quote Request: ${fullName} (${companyName}) - Deptloy [${id}]`;

  const text = `
New Submission Received on Deptloy
------------------------------------------------
Reference ID: ${id}
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

  return { subject, text, html: generateHtmlEmail(lead) };
}

type CreateTransport = (options: {
  service: string;
  auth: { user: string; pass: string };
  connectionTimeout: number;
  greetingTimeout: number;
  socketTimeout: number;
}) => { sendMail(mail: Record<string, unknown>): Promise<{ messageId?: string }> };

/** Sends the lead to the team through Gmail SMTP. Throws if Gmail refuses it. */
export async function sendLeadEmail(
  lead: Lead,
  settings: MailSettings,
  createTransport: CreateTransport = nodemailer.createTransport as unknown as CreateTransport,
): Promise<string | undefined> {
  const transporter = createTransport({
    service: "gmail",
    auth: { user: settings.user, pass: settings.pass },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
  });
  const { subject, text, html } = composeLeadEmail(lead);
  const info = await transporter.sendMail({
    from: `"${lead.fullName.replace(/["\r\n]/g, "")} via Deptloy" <${settings.user}>`,
    to: settings.to,
    replyTo: lead.email,
    subject,
    text,
    html,
  });
  return info.messageId;
}

function generateHtmlEmail(lead: Lead) {
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