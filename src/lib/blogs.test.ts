import { readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { BLOG_DIR, getAllPosts, getPost } from "./blogs";

// The weekly AI writer runs this file before opening a pull request, so a bad post never reaches review.
describe("blog post files", () => {
  const files = readdirSync(BLOG_DIR).filter((name) => name.endsWith(".json"));

  it("has posts", () => {
    expect(files.length).toBeGreaterThan(0);
  });

  it("every post passes the checks, and its file is named after its slug", () => {
    const posts = getAllPosts();
    expect(posts).toHaveLength(files.length);
    expect(posts.map((p) => `${p.slug}.json`).sort()).toEqual([...files].sort());
  });

  it("lists posts newest first", () => {
    const dates = getAllPosts().map((p) => p.publishedAt);
    expect(dates).toEqual([...dates].sort().reverse());
  });

  it("finds a post by its slug, and nothing for an unknown one", () => {
    const [first] = getAllPosts();
    expect(getPost(first.slug)?.title).toBe(first.title);
    expect(getPost("no-such-post")).toBeUndefined();
  });

  it("only reads post files from the blog folder", () => {
    expect(BLOG_DIR).toBe(join(process.cwd(), "src", "content", "blog"));
  });
});
