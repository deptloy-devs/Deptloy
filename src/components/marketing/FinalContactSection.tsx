"use client";

import * as React from "react";
import { CheckCircle2, Send, Mail } from "lucide-react";

export function FinalContactSection() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "submitting" | "success" | "error">("idle");
  const [submissionId, setSubmissionId] = React.useState("");
  const [errorMsg, setErrorMsg] = React.useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: name,
          email,
          projectType: "Full System Quote",
          message,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatus("success");
        setSubmissionId(data.submissionId || `DEP-${Math.floor(100000 + Math.random() * 900000)}`);
      } else {
        throw new Error(data.error || "Failed to deliver quote request.");
      }
    } catch (err: unknown) {
      console.error("Submission error:", err);
      setErrorMsg(
        err instanceof Error
          ? err.message
          : "Could not send right now. You can email deptloy@gmail.com directly."
      );
      setStatus("error");
    }
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setMessage("");
    setStatus("idle");
    setSubmissionId("");
    setErrorMsg("");
  };

  return (
    <section className="final" id="contact">
      <div className="wrap">
        <div>
          <h2>Let’s build something that lasts.</h2>
          <p>
            Tell us how your business runs today. We’ll show you how it could run with a system built around it.
          </p>
        </div>

        {status === "success" ? (
          <div
            style={{
              background: "#fff",
              borderRadius: "22px",
              padding: "36px 30px",
              color: "var(--deep)",
              boxShadow: "0 20px 50px rgba(0,0,0,0.25)",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "14px",
            }}
          >
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                background: "rgba(22, 135, 91, 0.12)",
                color: "#16875b",
                display: "grid",
                placeItems: "center",
              }}
            >
              <CheckCircle2 style={{ width: "32px", height: "32px" }} />
            </div>

            <h3 style={{ fontSize: "24px", fontWeight: 800, margin: 0, color: "var(--deep)" }}>
              Quote Request Sent!
            </h3>

            <div
              style={{
                fontSize: "12px",
                fontFamily: "IBM Plex Mono, monospace",
                fontWeight: 600,
                color: "var(--pur)",
                background: "var(--mist)",
                padding: "4px 12px",
                borderRadius: "99px",
              }}
            >
              Reference: {submissionId}
            </div>

            <p style={{ fontSize: "15px", color: "var(--mute)", margin: "4px 0 10px", lineHeight: 1.5 }}>
              Thank you, <strong>{name}</strong>. Your request was delivered directly to{" "}
              <strong style={{ color: "var(--deep)" }}>deptloy@gmail.com</strong>. We’ll review your inquiry and reply within 4 hours.
            </p>

            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center" }}>
              <button
                type="button"
                onClick={handleReset}
                className="btn sm ghost"
                style={{ borderRadius: "99px" }}
              >
                Submit another inquiry
              </button>
              <a
                href={`mailto:deptloy@gmail.com?subject=Quote%20Inquiry%20from%20${encodeURIComponent(name)}%20(${submissionId})&body=${encodeURIComponent(message)}`}
                className="btn sm"
                style={{ borderRadius: "99px", background: "var(--or)", color: "var(--deep)" }}
              >
                <Mail style={{ width: "14px", height: "14px" }} /> Open in Mail App
              </a>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} id="form">
            <input
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              required
              aria-label="Your name"
              disabled={status === "submitting"}
            />
            <input
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              aria-label="Email"
              disabled={status === "submitting"}
            />
            <textarea
              name="message"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="What would you like to improve?"
              required
              aria-label="Message"
              disabled={status === "submitting"}
            />

            {status === "error" && (
              <div
                style={{
                  color: "#d9383a",
                  background: "rgba(217, 56, 58, 0.08)",
                  border: "1px solid rgba(217, 56, 58, 0.2)",
                  padding: "10px 14px",
                  borderRadius: "10px",
                  fontSize: "13px",
                  textAlign: "center",
                }}
              >
                {errorMsg}
                <div style={{ marginTop: "6px" }}>
                  <a
                    href={`mailto:deptloy@gmail.com?subject=Inquiry%20from%20${encodeURIComponent(name)}&body=${encodeURIComponent(message)}`}
                    style={{ textDecoration: "underline", fontWeight: 700, color: "var(--deep)" }}
                  >
                    Click here to send directly to deptloy@gmail.com
                  </a>
                </div>
              </div>
            )}

            <button
              className="btn"
              type="submit"
              disabled={status === "submitting"}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              <Send style={{ width: "16px", height: "16px" }} />
              {status === "submitting" ? "Sending..." : "Get the quote"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
