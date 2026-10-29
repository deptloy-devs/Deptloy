// Writes one new blog post with Gemini, for the weekly blog workflow
// (.github/workflows/weekly-blog-post.yml). The workflow then checks the post with
// src/lib/blogs.test.ts and opens a pull request for a person to review.
//
// Needs BLOG_GEMINI_API_KEY. Optional: BLOG_GEMINI_MODEL, PR_BODY_FILE, GITHUB_OUTPUT.

import { appendFileSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { GoogleGenAI } from "@google/genai";

const BLOG_DIR = join(process.cwd(), "src", "content", "blog");
const DEFAULT_MODEL = "gemini-flash-latest";
const ATTEMPTS = 2;

/** Keep in step with BLOG_CATEGORIES in src/lib/blog-post.ts (a test checks this). */
export const CATEGORIES = [
  "AI Receptionists",
  "Automation",
  "Customers & CRM",
  "Websites & Apps",
  "AI for Business",
  "Privacy & Security",
];

export function buildPrompt({ today, existingTitles }) {
  return `You write the weekly blog post for Deptloy (deptloy.com). Deptloy builds AI receptionists, business automation, CRM systems, and websites and apps for businesses.

Readers: owners and managers of small and medium businesses, such as clinics, salons, home services, law firms, shops and agencies. They are curious about AI but not technical.

Today is ${today}.

Step 1: Use Google Search to find something from the last few weeks that matters to these readers: news about AI tools, a change in how businesses answer customers or handle admin, or a practical trend. If nothing recent fits, choose a practical, timeless how-to topic instead.
Step 2: Write one post about it.

Rules:
- Plain, friendly English. Short sentences. No jargon; if a term is unavoidable, explain it in a few words.
- Do not invent statistics, percentages, prices, quotes, studies or customer stories. Only use a number or fact that came from your search results, and name the source in the sentence ("according to ...").
- Do not promise anything about Deptloy beyond what is stated above. Mention Deptloy at most once, naturally, in the last section.
- Give the reader something practical they could do this week.
- 450 to 800 words in total.
- Do not repeat these existing posts:
${existingTitles.map((title) => `  - ${title}`).join("\n")}

Reply with only a JSON object and no other text, in this shape:
{
  "slug": "lowercase-words-joined-by-hyphens",
  "title": "At most 70 characters",
  "category": "One of: ${CATEGORIES.join(", ")}",
  "summary": "One or two sentences, 60 to 220 characters",
  "keyTakeaways": ["3 or 4 short sentences"],
  "content": [
    { "heading": "Section heading", "body": ["Paragraph", "Paragraph"], "points": ["Optional short bullet"] }
  ]
}
Use 4 to 6 sections. "points" is optional; leave it out when a section has no list.`;
}

/** The JSON object in the model's reply, with or without a code fence around it. */
export function extractJson(text) {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end <= start) throw new Error("The reply had no JSON object in it");
  try {
    return JSON.parse(text.slice(start, end + 1));
  } catch (error) {
    throw new Error(`The reply's JSON couldn't be read: ${error.message}`);
  }
}

export function toSlug(text) {
  const slug = String(text)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  if (slug.length <= 70) return slug;
  return slug.slice(0, 70).replace(/-[^-]*$/, "");
}

/** Keeps only the fields the site uses, dates the post today and gives it an unused slug. */
export function shapePost(draft, { today, takenSlugs }) {
  const base = toSlug(draft.slug || draft.title || "");
  let slug = base;
  for (let n = 2; takenSlugs.includes(slug); n++) slug = `${base}-${n}`;

  return {
    slug,
    title: draft.title,
    category: draft.category,
    publishedAt: today,
    summary: draft.summary,
    keyTakeaways: draft.keyTakeaways,
    content: (Array.isArray(draft.content) ? draft.content : []).map((section) => ({
      heading: section?.heading,
      body: section?.body,
      ...(Array.isArray(section?.points) && section.points.length ? { points: section.points } : {}),
    })),
  };
}

export function prBody(post, sources) {
  const sourceList = sources.length
    ? sources.map((source) => `- [${source.title || source.uri}](${source.uri})`).join("\n")
    : "- None. The AI didn't use web search for this post, so check any facts with extra care.";
  return `## New blog post: ${post.title}

**Topic:** ${post.category}

${post.summary}

Written by Gemini for this week's post. **Nothing goes live until this pull request is merged.**

### Before you merge
- [ ] Read it on the Vercel preview link below, at \`/blogs/${post.slug}\`
- [ ] Check any facts or numbers against the sources
- [ ] Make sure it doesn't promise anything Deptloy doesn't offer
- [ ] Happy with it? Merge. Want changes? Edit \`src/content/blog/${post.slug}.json\` here on GitHub first. Don't want it? Close this pull request.

### Sources the AI looked at
${sourceList}
`;
}

function readExisting() {
  return readdirSync(BLOG_DIR)
    .filter((name) => name.endsWith(".json"))
    .map((name) => JSON.parse(readFileSync(join(BLOG_DIR, name), "utf8")));
}

async function main() {
  const apiKey = process.env.BLOG_GEMINI_API_KEY;
  if (!apiKey) throw new Error("BLOG_GEMINI_API_KEY is not set");
  const model = process.env.BLOG_GEMINI_MODEL || DEFAULT_MODEL;
  const today = new Date().toISOString().slice(0, 10);
  const existing = readExisting();
  const prompt = buildPrompt({ today, existingTitles: existing.map((post) => post.title) });
  const ai = new GoogleGenAI({ apiKey });

  let draft;
  let response;
  for (let attempt = 1; !draft; attempt++) {
    response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: { tools: [{ googleSearch: {} }], temperature: 0.7 },
    });
    try {
      draft = extractJson(response.text ?? "");
    } catch (error) {
      if (attempt >= ATTEMPTS) throw error;
      console.warn(`Attempt ${attempt}: ${error.message}. Trying again.`);
    }
  }

  const post = shapePost(draft, { today, takenSlugs: existing.map((p) => p.slug) });
  writeFileSync(join(BLOG_DIR, `${post.slug}.json`), `${JSON.stringify(post, null, 2)}\n`);

  const sources = (response.candidates?.[0]?.groundingMetadata?.groundingChunks ?? [])
    .map((chunk) => chunk.web)
    .filter((web) => web?.uri);
  if (process.env.PR_BODY_FILE) writeFileSync(process.env.PR_BODY_FILE, prBody(post, sources));
  if (process.env.GITHUB_OUTPUT) {
    appendFileSync(process.env.GITHUB_OUTPUT, `slug=${post.slug}\ntitle<<END_OF_TITLE\n${post.title}\nEND_OF_TITLE\n`);
  }
  console.log(`Wrote src/content/blog/${post.slug}.json: ${post.title}`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    console.error(error.message ?? error);
    process.exit(1);
  });
}
