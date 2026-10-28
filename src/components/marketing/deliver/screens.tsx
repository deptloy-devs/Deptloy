import type * as React from "react";
import { Check } from "lucide-react";
import { EXAMPLE_BUSINESS } from "@/lib/solutions";

/**
 * Example screens for the Projects page: what a customer gets from each
 * service, and what each build step looks like. Pictures only, so screen
 * readers hear the label instead of every made-up row.
 */

type Tone = "green" | "lav" | "orange";

function Screen({ label, title, status, children }: { label: string; title: string; status?: string; children: React.ReactNode }) {
  return (
    <div className="wd-screen" role="img" aria-label={label}>
      <div className="wd-ui" aria-hidden="true">
        <div className="wd-ui-head">
          <b>{title}</b>
          {status && <span className="wd-chip green">{status}</span>}
        </div>
        {children}
      </div>
    </div>
  );
}

const Chip = ({ tone, children }: { tone: Tone; children: React.ReactNode }) => (
  <span className={`wd-chip ${tone}`}>{children}</span>
);

/* ---------- One screen per service ---------- */

export function ReceptionistScreen() {
  const calls: [string, string, Tone, string][] = [
    ["8:42 PM", "New patient", "green", "Booked · Thu 10:00 AM"],
    ["7:15 PM", "Maria G.", "lav", "Asked about prices"],
    ["6:58 PM", "Sam T.", "orange", "Sent to your team"],
  ];
  return (
    <Screen label="Example screen: the AI receptionist's call log" title="AI receptionist · Tonight" status="Answering">
      <div className="wd-rows">
        {calls.map(([time, who, tone, outcome]) => (
          <div className="wd-row" key={time}>
            <span className="wd-muted">{time}</span>
            <span className="wd-strong">{who}</span>
            <Chip tone={tone}>{outcome}</Chip>
          </div>
        ))}
      </div>
      <div className="wd-chat">
        <p>Can I come in Thursday morning?</p>
        <p className="ai">Thursday at 10 works. You&apos;re booked!</p>
      </div>
    </Screen>
  );
}

export function AutomationScreen() {
  const steps = ["New booking comes in", "Patient added to your list", "Confirmation text sent", "Reminder the day before"];
  return (
    <Screen label="Example screen: an automation that runs after every booking" title="When a booking comes in" status="Running">
      <ol className="wd-flow">
        {steps.map((step) => (
          <li key={step}>
            <Check aria-hidden="true" />
            {step}
          </li>
        ))}
      </ol>
      <p className="wd-muted wd-foot">Last run 3 minutes ago · nobody had to lift a finger</p>
    </Screen>
  );
}

export function CrmScreen() {
  const columns: [string, string[]][] = [
    ["New", ["Maya R.", "Tom B."]],
    ["Booked", ["Dan K.", "Lea M."]],
    ["Won", ["Priya S."]],
  ];
  return (
    <Screen label="Example screen: a CRM pipeline from new lead to won" title="Customers" status="Up to date">
      <div className="wd-board">
        {columns.map(([name, people]) => (
          <div className="wd-col" key={name}>
            <span className="wd-muted">{name}</span>
            {people.map((person) => (
              <span className="wd-card" key={person}>
                {person}
              </span>
            ))}
          </div>
        ))}
      </div>
      <div className="wd-note">
        <span className="wd-strong">Follow up with Tom B.</span>
        <span className="wd-muted">Friday · added automatically</span>
      </div>
    </Screen>
  );
}

export function WebScreen() {
  const times = ["9:00", "10:30", "2:30", "4:00"];
  return (
    <Screen label="Example screen: an online booking page" title="brightsmile.example" status="Live">
      <div className="wd-site">
        <p className="wd-site-title">Book your visit in 30 seconds</p>
        <div className="wd-pills">
          <span className="on">Cleaning</span>
          <span>Check-up</span>
          <span>Whitening</span>
        </div>
        <div className="wd-times">
          {times.map((time) => (
            <span key={time} className={time === "2:30" ? "on" : undefined}>
              {time}
            </span>
          ))}
        </div>
        <span className="wd-book">Book Thursday, 2:30 PM</span>
      </div>
    </Screen>
  );
}

/* ---------- One picture per build step ---------- */

export function DiscoverPicture() {
  const notes = ["Calls after 6 PM go to voicemail", "Bookings live in a paper diary", "Patients forget their appointments"];
  return (
    <Screen label={`Example: notes from the first call with ${EXAMPLE_BUSINESS}`} title="Notes from our first call">
      <ul className="wd-notes">
        {notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
      <p className="wd-muted wd-foot">Goal: never miss a patient, and fewer no-shows.</p>
    </Screen>
  );
}

export function ArchitectPicture() {
  const pieces = ["Phone receptionist", "Booking page", "Patient list", "Reminders"];
  return (
    <Screen label="Example: a sketch of four pieces connected to the clinic" title="The plan">
      <div className="wd-map">
        <svg viewBox="0 0 100 60" preserveAspectRatio="none">
          <path d="M22 14 L50 30 L78 14 M22 46 L50 30 L78 46" />
        </svg>
        {pieces.map((piece, i) => (
          <span key={piece} className={`wd-node n${i}`}>
            {piece}
          </span>
        ))}
        <span className="wd-node wd-hub">{EXAMPLE_BUSINESS}</span>
      </div>
    </Screen>
  );
}

export function EngineerPicture() {
  return (
    <Screen label="Example: an early version of the booking page with a change request" title="Preview · week 2">
      <div className="wd-site small">
        <p className="wd-site-title">Book your visit</p>
        <div className="wd-times">
          <span>Mon</span>
          <span>Wed</span>
          <span className="on">Sat</span>
        </div>
      </div>
      <div className="wd-chat">
        <p>Owner: Can patients book Saturdays too?</p>
        <p className="ai">Added. Try it now.</p>
      </div>
    </Screen>
  );
}

export function LaunchPicture() {
  const events: [string, string][] = [
    ["Tue 8:42 PM", "Call answered by the AI receptionist"],
    ["Tue 8:43 PM", "Booked: cleaning, Thursday 10 AM"],
    ["Wed 10:00 AM", "Reminder text sent"],
    ["Thu 10:00 AM", "Patient walks in, on time"],
  ];
  return (
    <Screen label="Example: one booking moving through the live system" title="A booking, start to finish" status="Live">
      <ol className="wd-timeline">
        {events.map(([when, what]) => (
          <li key={when}>
            <span className="wd-muted">{when}</span>
            <span className="wd-strong">{what}</span>
          </li>
        ))}
      </ol>
    </Screen>
  );
}

export function EvolvePicture() {
  const items: [string, Tone, string][] = [
    ["Spanish on the phone line", "green", "Live"],
    ["Forms patients fill in before visits", "lav", "Building"],
    ["Monthly bookings report", "orange", "Next"],
  ];
  return (
    <Screen label="Example: improvements added after launch" title="What we're adding">
      <div className="wd-rows">
        {items.map(([what, tone, status]) => (
          <div className="wd-row two" key={what}>
            <span className="wd-strong">{what}</span>
            <Chip tone={tone}>{status}</Chip>
          </div>
        ))}
      </div>
    </Screen>
  );
}
