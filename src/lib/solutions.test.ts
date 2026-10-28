import { describe, expect, it } from "vitest";
import { services } from "./site";
import { buildSteps, serviceShowcases } from "./solutions";

describe("serviceShowcases", () => {
  it("covers every service once, in the site's order", () => {
    expect(serviceShowcases.map((s) => s.slug)).toEqual(services.map((s) => s.slug));
  });

  it("keeps each service short: three or four plain points", () => {
    for (const showcase of serviceShowcases) {
      expect(showcase.included.length).toBeGreaterThanOrEqual(3);
      expect(showcase.included.length).toBeLessThanOrEqual(4);
    }
  });
});

describe("buildSteps", () => {
  it("follows the five steps on the How It Works page", () => {
    expect(buildSteps.map((s) => s.label)).toEqual(["Discover", "Architect", "Engineer", "Launch", "Evolve"]);
  });
});
