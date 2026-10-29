import { describe, expect, it } from "vitest";
import {
  BLOGS_SHOWN,
  formatPostDate,
  headingId,
  latestPosts,
  parseBlogPost,
  readMinutes,
  relatedPosts,
  sortNewestFirst,
  type BlogPost,
} from "./blog-post";

const valid = {
  slug: "turn-missed-calls-into-bookings",
  title: "Turn missed calls into booked appointments",
  category: "AI Receptionists",
  publishedAt: "2026-08-25",
  summary: "Every unanswered call is a customer who might ring someone else next. Here is a simple fix.",
  keyTakeaways: ["Answer every call.", "Confirm by text."],
  content: [
    { heading: "The cost of voicemail", body: ["Many callers never leave a message."] },
    { heading: "Getting started", body: ["Start small."], points: ["List common questions", "Try it after hours"] },
  ],
};

const post = (overrides: Partial<BlogPost>): BlogPost => ({ ...(valid as BlogPost), ...overrides });

describe("parseBlogPost", () => {
  it("accepts a well-formed post", () => {
    expect(parseBlogPost(valid, "test.json")).toEqual(valid);
  });

  it.each([
    ["a slug with spaces", { slug: "Missed calls" }, "slug"],
    ["an unknown topic", { category: "Crypto" }, "category"],
    ["a date that doesn't exist", { publishedAt: "2026-02-30" }, "publishedAt"],
    ["a date in another format", { publishedAt: "August 2026" }, "publishedAt"],
    ["a very long title", { title: "x".repeat(91) }, "title"],
    ["a summary that's too short", { summary: "Short." }, "summary"],
    ["no takeaways", { keyTakeaways: [] }, "keyTakeaways"],
    ["only one section", { content: [valid.content[0]] }, "content"],
    ["a section with no paragraphs", { content: [{ heading: "A", body: [] }, valid.content[1]] }, "content[0].body"],
    ["an extra field", { readTime: "3 min read" }, "readTime"],
  ])("rejects %s, naming the field", (_, change, field) => {
    expect(() => parseBlogPost({ ...valid, ...change }, "bad.json")).toThrow(field);
  });

  it("names the file in its error", () => {
    expect(() => parseBlogPost({ ...valid, slug: "" }, "my-post.json")).toThrow("my-post.json");
  });
});

describe("sortNewestFirst", () => {
  it("puts the most recent post first", () => {
    const posts = [post({ slug: "a", publishedAt: "2026-08-01" }), post({ slug: "b", publishedAt: "2026-10-01" })];
    expect(sortNewestFirst(posts).map((p) => p.slug)).toEqual(["b", "a"]);
  });
});

describe("latestPosts", () => {
  it("shows six posts at most", () => {
    const posts = Array.from({ length: 9 }, (_, i) => post({ slug: `post-${i + 1}` }));
    expect(BLOGS_SHOWN).toBe(6);
    expect(latestPosts(posts).map((p) => p.slug)).toEqual(["post-1", "post-2", "post-3", "post-4", "post-5", "post-6"]);
  });

  it("shows every post when there are fewer than six", () => {
    expect(latestPosts([post({}), post({})])).toHaveLength(2);
  });
});

describe("relatedPosts", () => {
  it("prefers the same topic, never repeats the post itself", () => {
    const current = post({ slug: "current", category: "Automation" });
    const posts = [
      current,
      post({ slug: "other-1", category: "Privacy & Security" }),
      post({ slug: "same-topic", category: "Automation" }),
      post({ slug: "other-2", category: "AI for Business" }),
      post({ slug: "other-3", category: "AI for Business" }),
    ];
    expect(relatedPosts(current, posts).map((p) => p.slug)).toEqual(["same-topic", "other-1", "other-2"]);
  });
});

describe("readMinutes", () => {
  it("counts about 200 words a minute, and at least one", () => {
    const words = (n: number) => Array.from({ length: n }, () => "word").join(" ");
    expect(readMinutes(post({ summary: words(10), keyTakeaways: [], content: [] }))).toBe(1);
    expect(readMinutes(post({ summary: "", keyTakeaways: [], content: [{ heading: "", body: [words(610)] }] }))).toBe(4);
  });
});

describe("formatPostDate", () => {
  it("writes the date out in words", () => {
    expect(formatPostDate("2026-08-25")).toBe("August 25, 2026");
  });
});

describe("headingId", () => {
  it("turns a heading into a link-friendly id", () => {
    expect(headingId("Five questions to ask any AI provider!")).toBe("five-questions-to-ask-any-ai-provider");
    expect(headingId("Answer every call, book on the spot")).toBe("answer-every-call-book-on-the-spot");
  });
});
