import { describe, it, expect } from "vitest";
import sitemap from "./sitemap";
import robots from "./robots";
import manifest from "./manifest";

describe("SEO, Metadata & Appearance Verification", () => {
  it("generates correct robots.txt rules and canonical sitemap URL", () => {
    const r = robots();
    expect(r.sitemap).toBe("https://www.deptloy.com/sitemap.xml");
    // Rules can be array or object
    const rules = Array.isArray(r.rules) ? r.rules[0] : r.rules;
    expect(rules.allow).toBe("/");
    expect(rules.disallow).toContain("/dashboard/");
    expect(rules.disallow).toContain("/api/");
  });

  it("generates complete sitemap with canonical https://www.deptloy.com URLs", () => {
    const map = sitemap();
    expect(map.length).toBeGreaterThan(10);

    for (const entry of map) {
      expect(entry.url).toMatch(/^https:\/\/www\.deptloy\.com/);
      expect(entry.url).not.toMatch(/^https:\/\/deptloy\.com/);
      expect(entry.url).not.toContain("/services");
      expect(entry.url).not.toContain("/industries");
      expect(entry.url).not.toContain("/case-studies");
    }

    // Verify key pages are in sitemap
    const urls = map.map((e) => e.url);
    expect(urls).toContain("https://www.deptloy.com");
    expect(urls).toContain("https://www.deptloy.com/how-it-works");
    expect(urls).toContain("https://www.deptloy.com/projects");
    expect(urls).toContain("https://www.deptloy.com/demo");
    expect(urls).toContain("https://www.deptloy.com/about");
    expect(urls).toContain("https://www.deptloy.com/blogs");
    expect(urls).toContain("https://www.deptloy.com/contact");
  });

  it("generates valid web manifest with square icon assets", () => {
    const m = manifest();
    expect(m.name).toBe("Deptloy");
    expect(m.short_name).toBe("Deptloy");
    expect(m.start_url).toBe("/");
    expect(m.icons?.length).toBeGreaterThanOrEqual(3);
  });
});
