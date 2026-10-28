import { describe, expect, it } from "vitest";
import { tabKeyTarget } from "./tab-keys";

describe("tabKeyTarget", () => {
  it.each([
    ["ArrowRight", 0, 1],
    ["ArrowRight", 3, 0],
    ["ArrowLeft", 2, 1],
    ["ArrowLeft", 0, 3],
    ["Home", 2, 0],
    ["End", 1, 3],
  ])("%s from tab %i moves to tab %i", (key, from, to) => {
    expect(tabKeyTarget(key, from, 4)).toBe(to);
  });

  it("ignores other keys", () => {
    expect(tabKeyTarget("Enter", 1, 4)).toBeNull();
    expect(tabKeyTarget("a", 1, 4)).toBeNull();
  });
});
