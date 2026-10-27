import { describe, expect, it } from "vitest";
import { normalizeTime, runVoiceTool } from "./tools";

const ctx = { industry: "clinic" as const, serviceId: "srv-clean", newReference: () => "BK-123456" };

describe("normalizeTime", () => {
  it.each([
    ["10:30 AM", "10:30 AM"],
    ["10:30am", "10:30 AM"],
    ["9", "09:00 AM"],
    ["9 am", "09:00 AM"],
    ["1:15 pm", "01:15 PM"],
    ["1:15", "01:15 PM"],
    ["13:15", "01:15 PM"],
    ["5.30 PM", "05:30 PM"],
    ["12:00", "12:00 PM"],
  ])("%s -> %s", (input, expected) => {
    expect(normalizeTime(input)).toBe(expected);
  });

  it("returns null for text that isn't a time", () => {
    expect(normalizeTime("tomorrow")).toBeNull();
    expect(normalizeTime("25:00")).toBeNull();
  });
});

describe("runVoiceTool", () => {
  it("lists open times for a day", () => {
    const result = runVoiceTool({ name: "check_availability", args: { date: "Friday" } }, ctx);
    expect(result.status).toBe("ok");
    expect(result.open_times).toEqual(expect.arrayContaining([expect.stringMatching(/^\d{2}:\d{2} (AM|PM)$/)]));
    // Some times are taken so it feels like a real calendar, and the same day always answers the same way.
    expect((result.open_times as string[]).length).toBeLessThan(6);
    expect(runVoiceTool({ name: "check_availability", args: { date: "Friday" } }, ctx)).toEqual(result);
  });

  it("books an open time and returns a reference", () => {
    const open_times = runVoiceTool({ name: "check_availability", args: { date: "Friday" } }, ctx).open_times as string[];
    const result = runVoiceTool(
      { name: "book_appointment", args: { customer_name: "Alex", date: "Friday", time: open_times[0] } },
      ctx,
    );
    expect(result).toEqual({
      status: "confirmed",
      reference: "BK-123456",
      customer_name: "Alex",
      service: "Comprehensive Dental Examination & Cleaning",
      date: "Friday",
      time: open_times[0],
      note: "Demo booking only. No real calendar entry was made.",
    });
  });

  it("books a different service from the same business when asked", () => {
    const open = runVoiceTool({ name: "check_availability", args: { date: "Monday" } }, ctx).open_times as string[];
    const result = runVoiceTool(
      {
        name: "book_appointment",
        args: { customer_name: "Sam", date: "Monday", time: open[0], service: "General Medical Health Consultation" },
      },
      ctx,
    );
    expect(result).toMatchObject({ status: "confirmed", service: "General Medical Health Consultation" });
  });

  it("refuses a taken time, a missing name or an unknown tool", () => {
    const open = runVoiceTool({ name: "check_availability", args: { date: "Friday" } }, ctx).open_times as string[];
    const taken = ["09:00 AM", "10:30 AM", "01:15 PM", "02:45 PM", "04:15 PM", "05:30 PM"].find((t) => !open.includes(t));

    expect(
      runVoiceTool({ name: "book_appointment", args: { customer_name: "Alex", date: "Friday", time: taken } }, ctx),
    ).toMatchObject({ status: "error" });
    expect(
      runVoiceTool({ name: "book_appointment", args: { customer_name: " ", date: "Friday", time: open[0] } }, ctx),
    ).toMatchObject({ status: "error" });
    expect(runVoiceTool({ name: "send_email", args: {} }, ctx)).toMatchObject({ status: "error" });
  });
});
