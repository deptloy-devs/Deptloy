"use client";

import * as React from "react";

export function FinalContactSection() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "submitting" | "success" | "error">("idle");
  const [statusMsg, setStatusMsg] = React.useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

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
        setStatusMsg("Thank you! Your quote request has been sent to deptloy@gmail.com. We'll be in touch shortly.");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        // Fallback mailto
        window.location.href = `mailto:deptloy@gmail.com?subject=${encodeURIComponent(
          "Project inquiry from " + name
        )}&body=${encodeURIComponent(message + "\n\n" + name + " (" + email + ")")}`;
        setStatus("success");
        setStatusMsg("Thanks! Opening your email app to send directly to deptloy@gmail.com.");
      }
    } catch {
      window.location.href = `mailto:deptloy@gmail.com?subject=${encodeURIComponent(
        "Project inquiry from " + name
      )}&body=${encodeURIComponent(message + "\n\n" + name + " (" + email + ")")}`;
      setStatus("success");
      setStatusMsg("Thanks! Opening your email app to send directly to deptloy@gmail.com.");
    }
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
          <button
            className="btn"
            type="submit"
            disabled={status === "submitting"}
          >
            {status === "submitting" ? "Sending..." : "Get the quote"}
          </button>

          {status === "success" && (
            <div
              style={{
                color: "#16875b",
                fontWeight: 700,
                textAlign: "center",
                marginTop: 8,
                fontSize: 14,
              }}
            >
              {statusMsg}
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
