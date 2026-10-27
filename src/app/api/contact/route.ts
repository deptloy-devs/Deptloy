import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { isCallRequest, readMailSettings, sendLeadEmail, type Lead } from "@/lib/lead-email";

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
    const mail = readMailSettings();

    if (!mail) {
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
    const recipientEmail = mail.to;

    const prefix = isCallRequest(serviceRequired) ? "CAL" : "DEP";
    const submissionId = `${prefix}-${Math.floor(100000 + Math.random() * 900000)}`;
    const timestamp = new Date().toISOString();

    const leadRecord: Lead = {
      id: submissionId,
      fullName,
      email,
      companyName,
      serviceRequired,
      projectDescription,
      timestamp,
    };

    // 4–5. Send the email via Gmail SMTP (see src/lib/lead-email.ts)
    try {
      const messageId = await sendLeadEmail(leadRecord, mail);
      console.log(`[api/contact] Email dispatched successfully: ${messageId} -> ${recipientEmail}`);
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
