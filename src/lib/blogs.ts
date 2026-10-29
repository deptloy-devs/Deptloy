import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { parseBlogPost, sortNewestFirst, type BlogPost } from "./blog-post";

/** One JSON file per post, named after its slug. */
export const BLOG_DIR = join(process.cwd(), "src", "content", "blog");

/** Every post, newest first. Read at build time; a post that fails its checks stops the build. */
export function getAllPosts(): BlogPost[] {
  if (!existsSync(BLOG_DIR)) return [];
  const posts = readdirSync(BLOG_DIR)
    .filter((name) => name.endsWith(".json"))
    .map((name) => {
      const post = parseBlogPost(JSON.parse(readFileSync(join(BLOG_DIR, name), "utf8")), name);
      if (`${post.slug}.json` !== name) throw new Error(`${name}: the file name must match its slug "${post.slug}"`);
      return post;
    });
  return sortNewestFirst(posts);
}

export function getPost(slug: string): BlogPost | undefined {
  return getAllPosts().find((post) => post.slug === slug);
}
