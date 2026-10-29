/**
 * The blog post format, and the checks every post must pass. Posts live as JSON
 * files in src/content/blog (one per post), so the weekly AI writer can add one
 * in a pull request. Anything that fails these checks stops the build.
 */

export const BLOG_CATEGORIES = [
  "AI Receptionists",
  "Automation",
  "Customers & CRM",
  "Websites & Apps",
  "AI for Business",
  "Privacy & Security",
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export type BlogSection = {
  heading: string;
  body: string[];
  /** Optional bullet list shown after the paragraphs. */
  points?: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  category: BlogCategory;
  /** YYYY-MM-DD */
  publishedAt: string;
  summary: string;
  keyTakeaways: string[];
  content: BlogSection[];
};

/** How many posts the blog page lists. Older posts keep their own pages. */
export const BLOGS_SHOWN = 6;

const FIELDS = ["slug", "title", "category", "publishedAt", "summary", "keyTakeaways", "content"];
const SECTION_FIELDS = ["heading", "body", "points"];
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const DATE = /^(\d{4})-(\d{2})-(\d{2})$/;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

function text(value: unknown, field: string, min: number, max: number, fail: (msg: string) => never): string {
  if (typeof value !== "string") fail(`"${field}" must be text`);
  const trimmed = (value as string).trim();
  if (trimmed.length < min || trimmed.length > max) fail(`"${field}" must be ${min}–${max} characters`);
  return trimmed;
}

function list(value: unknown, field: string, min: number, max: number, fail: (msg: string) => never): string[] {
  if (!Array.isArray(value) || value.length < min || value.length > max) fail(`"${field}" must list ${min}–${max} items`);
  return (value as unknown[]).map((item, i) => text(item, `${field}[${i}]`, 1, 600, fail));
}

function isRealDate(value: string): boolean {
  const match = DATE.exec(value);
  if (!match) return false;
  const [, y, m, d] = match.map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  return date.getUTCFullYear() === y && date.getUTCMonth() === m - 1 && date.getUTCDate() === d;
}

/** Checks one post and returns it tidied, or throws an error naming the file and the field. */
export function parseBlogPost(value: unknown, source: string): BlogPost {
  const fail = (msg: string): never => {
    throw new Error(`${source}: ${msg}`);
  };
  if (!isRecord(value)) fail("must be a JSON object");
  const raw = value as Record<string, unknown>;
  for (const key of Object.keys(raw)) if (!FIELDS.includes(key)) fail(`unknown field "${key}"`);

  const slug = text(raw.slug, "slug", 3, 80, fail);
  if (!SLUG.test(slug)) fail(`"slug" must be lowercase words joined by hyphens`);
  const category = raw.category as BlogCategory;
  if (!BLOG_CATEGORIES.includes(category)) fail(`"category" must be one of: ${BLOG_CATEGORIES.join(", ")}`);
  const publishedAt = text(raw.publishedAt, "publishedAt", 10, 10, fail);
  if (!isRealDate(publishedAt)) fail(`"publishedAt" must be a real date written YYYY-MM-DD`);

  if (!Array.isArray(raw.content) || raw.content.length < 2 || raw.content.length > 8) {
    fail(`"content" must have 2–8 sections`);
  }
  const content = (raw.content as unknown[]).map((section, i): BlogSection => {
    const field = `content[${i}]`;
    if (!isRecord(section)) fail(`"${field}" must be an object`);
    const s = section as Record<string, unknown>;
    for (const key of Object.keys(s)) if (!SECTION_FIELDS.includes(key)) fail(`unknown field "${field}.${key}"`);
    const tidy: BlogSection = {
      heading: text(s.heading, `${field}.heading`, 1, 100, fail),
      body: list(s.body, `${field}.body`, 1, 8, fail),
    };
    if (s.points !== undefined) tidy.points = list(s.points, `${field}.points`, 1, 8, fail);
    return tidy;
  });

  return {
    slug,
    title: text(raw.title, "title", 10, 90, fail),
    category,
    publishedAt,
    summary: text(raw.summary, "summary", 40, 260, fail),
    keyTakeaways: list(raw.keyTakeaways, "keyTakeaways", 2, 5, fail),
    content,
  };
}

export function sortNewestFirst(posts: BlogPost[]): BlogPost[] {
  return [...posts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

/** The posts the blog page lists; expects them newest first. */
export function latestPosts(posts: BlogPost[], limit = BLOGS_SHOWN): BlogPost[] {
  return posts.slice(0, limit);
}

/** Posts to suggest after this one: same topic first, then the newest of the rest. */
export function relatedPosts(post: BlogPost, posts: BlogPost[], count = 3): BlogPost[] {
  const others = posts.filter((p) => p.slug !== post.slug);
  const sameTopic = others.filter((p) => p.category === post.category);
  const rest = others.filter((p) => p.category !== post.category);
  return [...sameTopic, ...rest].slice(0, count);
}

const words = (value: string) => value.split(/\s+/).filter(Boolean).length;

/** Reading time in minutes, at about 200 words a minute. */
export function readMinutes(post: BlogPost): number {
  const parts = [
    post.summary,
    ...post.keyTakeaways,
    ...post.content.flatMap((s) => [s.heading, ...s.body, ...(s.points ?? [])]),
  ];
  const total = parts.reduce((sum, part) => sum + words(part), 0);
  return Math.max(1, Math.ceil(total / 200));
}

const DATE_FORMAT = new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });

export function formatPostDate(isoDate: string): string {
  return DATE_FORMAT.format(new Date(`${isoDate}T00:00:00Z`));
}

/** An id for a section heading, so the "In this post" links can jump to it. */
export function headingId(heading: string): string {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
