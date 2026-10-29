import { describe, expect, it } from "vitest";
import { BLOG_CATEGORIES, parseBlogPost } from "../src/lib/blog-post";
import { buildPrompt, CATEGORIES, extractJson, prBody, shapePost, toSlug } from "./write-blog-post.mjs";

const draft = {
  title: "Five simple ways AI can save your front desk an hour a day",
  category: "Automation",
  summary: "Small, practical changes that take repetitive work off your team's plate, starting this week.",
  keyTakeaways: ["Start with the task your team repeats most.", "Keep a person in charge of anything unusual."],
  content: [
    { heading: "Start small", body: ["Pick one task."] },
    { heading: "Keep people in charge", body: ["Decide what the AI may do on its own."], points: ["Refunds go to a person"] },
  ],
};

describe("the weekly blog writer", () => {
  it("offers the same topics the site accepts", () => {
    expect(CATEGORIES).toEqual([...BLOG_CATEGORIES]);
  });

  it("tells the AI today's date, the topics, and the posts not to repeat", () => {
    const prompt = buildPrompt({ today: "2026-11-02", existingTitles: ["Turn missed calls into booked appointments"] });
    expect(prompt).toContain("2026-11-02");
    expect(prompt).toContain("Turn missed calls into booked appointments");
    for (const category of BLOG_CATEGORIES) expect(prompt).toContain(category);
  });

  it("reads the JSON out of a reply, with or without a code fence", () => {
    expect(extractJson('Here you go:\n```json\n{"a": 1}\n```')).toEqual({ a: 1 });
    expect(extractJson('{"a": {"b": 2}}')).toEqual({ a: { b: 2 } });
    expect(() => extractJson("Sorry, I can't help with that.")).toThrow("JSON");
  });

  it("makes a short, link-friendly slug", () => {
    expect(toSlug("Five simple ways AI can save your front desk an hour a day!")).toBe(
      "five-simple-ways-ai-can-save-your-front-desk-an-hour-a-day"
    );
    expect(toSlug("x ".repeat(60)).length).toBeLessThanOrEqual(70);
  });

  it("turns the AI's draft into a post the site accepts, dated today, with a new slug", () => {
    const post = shapePost(
      { ...draft, slug: "turn-missed-calls-into-bookings", publishedAt: "1999-01-01", extra: "dropped" },
      { today: "2026-11-02", takenSlugs: ["turn-missed-calls-into-bookings"] }
    );
    expect(post.publishedAt).toBe("2026-11-02");
    expect(post.slug).toBe("turn-missed-calls-into-bookings-2");
    expect(post).not.toHaveProperty("extra");
    expect(() => parseBlogPost(post, "draft.json")).not.toThrow();
  });

  it("makes a slug from the title when the AI leaves it out", () => {
    expect(shapePost(draft, { today: "2026-11-02", takenSlugs: [] }).slug).toBe(
      "five-simple-ways-ai-can-save-your-front-desk-an-hour-a-day"
    );
  });

  it("writes a pull request that lists the sources and what to check", () => {
    const post = shapePost(draft, { today: "2026-11-02", takenSlugs: [] });
    const body = prBody(post, [{ title: "Example news", uri: "https://example.com/news" }]);
    expect(body).toContain(post.title);
    expect(body).toContain("[Example news](https://example.com/news)");
    expect(body).toContain(`/blogs/${post.slug}`);
    expect(prBody(post, [])).toContain("didn't use web search");
  });
});
