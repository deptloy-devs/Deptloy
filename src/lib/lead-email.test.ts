import { describe, expect, it, vi } from "vitest";
import { composeLeadEmail, readMailSettings, sendLeadEmail, type Lead } from "./lead-email";

const lead: Lead = {
  id: "CAL-123456",
  fullName: "Ana <b>Ruiz</b>",
  email: "ana@example.com",
  companyName: "Ruiz Dental",
  serviceRequired: "Discovery call (voice booking with Dep)",
  projectDescription: "Wants an AI receptionist.\n<script>alert(1)</script>",
  timestamp: "2026-10-27T17:00:00.000Z",
};

describe("readMailSettings", () => {
  it("needs a Gmail user and app password", () => {
    expect(readMailSettings({})).toBeNull();
    expect(readMailSettings({ GMAIL_USER: "a@gmail.com" })).toBeNull();
  });

  it("strips spaces from the app password and defaults the recipient", () => {
    expect(readMailSettings({ GMAIL_USER: " a@gmail.com ", GMAIL_APP_PASSWORD: "abcd efgh" })).toEqual({
      user: "a@gmail.com",
      pass: "abcdefgh",
      to: "a@gmail.com",
    });
    expect(
      readMailSettings({ EMAIL_USER: "a@gmail.com", EMAIL_PASS: "p", CONTACT_EMAIL: "team@deptloy.com" })?.to,
    ).toBe("team@deptloy.com");
  });
});

describe("composeLeadEmail", () => {
  it("labels call requests and escapes visitor text in the HTML", () => {
    const mail = composeLeadEmail(lead);
    expect(mail.subject).toBe(
      "New Call Request: Ana <b>Ruiz</b> (Discovery call (voice booking with Dep)) - Deptloy [CAL-123456]",
    );
    expect(mail.html).toContain("Discovery Call Request");
    expect(mail.html).toContain("&lt;script&gt;alert(1)&lt;/script&gt;");
    expect(mail.html).not.toContain("<script>");
    expect(mail.text).toContain("Reference ID: CAL-123456");
    expect(mail.text).toContain("Wants an AI receptionist.");
  });

  it("labels everything else as a quote request", () => {
    const mail = composeLeadEmail({ ...lead, serviceRequired: "Web app" });
    expect(mail.subject.startsWith("New Quote Request: Ana <b>Ruiz</b> (Ruiz Dental)")).toBe(true);
  });
});

describe("sendLeadEmail", () => {
  it("sends from the Gmail account to the team, with replies going to the visitor", async () => {
    const sendMail = vi.fn(async () => ({ messageId: "m1" }));
    const createTransport = vi.fn(() => ({ sendMail }));
    const settings = { user: "bot@gmail.com", pass: "p", to: "team@deptloy.com" };

    await sendLeadEmail({ ...lead, fullName: 'Ana "x"\r\nBcc: evil' }, settings, createTransport);

    expect(createTransport).toHaveBeenCalledWith(
      expect.objectContaining({ service: "gmail", auth: { user: "bot@gmail.com", pass: "p" } }),
    );
    expect(sendMail).toHaveBeenCalledWith(
      expect.objectContaining({
        from: '"Ana xBcc: evil via Deptloy" <bot@gmail.com>',
        to: "team@deptloy.com",
        replyTo: "ana@example.com",
      }),
    );
  });
});
