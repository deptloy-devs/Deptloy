import { describe, expect, it } from "vitest";
import { ease, mouthGeometry, mouthShape, voiceFeatures, type MouthShape } from "./mouth";

const SAMPLE_RATE = 48000;
const BINS = 512; // a 1024-point analyser

/** A fake analyser spectrum (dB) with resonances at the given frequencies, like a sung vowel. */
function vowelSpectrum(formants: [hz: number, db: number][]): Float32Array {
  const out = new Float32Array(BINS);
  const binHz = SAMPLE_RATE / 2 / BINS;
  for (let i = 0; i < BINS; i++) {
    const hz = i * binHz;
    let power = 1e-9;
    for (const [center, db] of formants) power += 10 ** (db / 10) * Math.exp(-(((hz - center) / 90) ** 2));
    out[i] = 10 * Math.log10(power);
  }
  return out;
}

// Rough formants for an adult voice (Hz, loudness in dB).
const AH = vowelSpectrum([[700, -20], [1200, -26], [2600, -40]]);
// Real "oh" recordings measured a 515–565 Hz low-band centre; this matches them.
const OH = vowelSpectrum([[480, -20], [880, -28], [2500, -42]]);
const OO = vowelSpectrum([[320, -20], [850, -30], [2300, -44]]);
const EE = vowelSpectrum([[300, -20], [2300, -30], [3000, -32]]);

describe("voiceFeatures", () => {
  it("finds the low resonance that sets how open a vowel is", () => {
    const ah = voiceFeatures(AH, SAMPLE_RATE)!;
    const ee = voiceFeatures(EE, SAMPLE_RATE)!;
    expect(ah.f1).toBeGreaterThan(600);
    expect(ee.f1).toBeLessThan(400);
  });

  it("sees the bright top end of 'ee'", () => {
    expect(voiceFeatures(EE, SAMPLE_RATE)!.spread).toBeGreaterThan(10);
    expect(voiceFeatures(AH, SAMPLE_RATE)!.spread).toBeLessThan(0);
    expect(voiceFeatures(OO, SAMPLE_RATE)!.spread).toBeLessThan(5);
  });

  it("returns null for silence", () => {
    expect(voiceFeatures(new Float32Array(BINS).fill(-120), SAMPLE_RATE)).toBeNull();
  });
});

describe("mouthShape", () => {
  const loud = 0.16;
  const shape = (spectrum: Float32Array) => mouthShape(loud, voiceFeatures(spectrum, SAMPLE_RATE));

  it("opens 'ah' wide and tall, with no rounding or spreading", () => {
    const ah = shape(AH);
    expect(ah.open).toBeGreaterThan(0.9);
    expect(ah.round).toBe(0);
    expect(ah.wide).toBe(0);
  });

  it("rounds 'oo' most, 'oh' less, and spreads 'ee'", () => {
    expect(shape(OO).round).toBeGreaterThan(0.6);
    expect(shape(OH).round).toBeLessThan(shape(OO).round);
    expect(shape(EE).wide).toBeGreaterThan(0.8);
    expect(shape(OO).open).toBeLessThan(shape(AH).open);
  });

  it("only rounds the lips on clear, loud sounds, not quiet consonants like 'm' and 'n'", () => {
    const quiet = 0.03;
    expect(mouthShape(quiet, voiceFeatures(OO, SAMPLE_RATE)).round).toBeLessThan(0.5);
  });

  it("closes in silence and stays neutral when the sound can't be read", () => {
    expect(mouthShape(0, voiceFeatures(AH, SAMPLE_RATE)).open).toBe(0);
    expect(mouthShape(loud, null)).toEqual({ open: expect.any(Number), wide: 0, round: 0 });
  });
});

describe("mouthGeometry", () => {
  const closed: MouthShape = { open: 0, wide: 0, round: 0 };
  const ah: MouthShape = { open: 1, wide: 0, round: 0 };
  const oo: MouthShape = { open: 0.6, wide: 0, round: 1 };
  const ee: MouthShape = { open: 0.6, wide: 1, round: 0 };

  it("is a thin line when closed", () => {
    expect(mouthGeometry(closed)).toMatchObject({ width: 26, height: 3 });
  });

  it("gives each vowel its own look", () => {
    const [a, o, e] = [mouthGeometry(ah), mouthGeometry(oo), mouthGeometry(ee)];
    expect(a.height).toBeGreaterThan(o.height);
    expect(o.width).toBeLessThan(a.width);
    expect(e.width).toBeGreaterThan(a.width);
    expect(e.height).toBeLessThan(a.height / 2);
  });

  it("always stays on Dep's face screen, below the eyes", () => {
    for (const s of [closed, ah, oo, ee, { open: 1, wide: 1, round: 1 }]) {
      const g = mouthGeometry(s);
      expect(g.x).toBeGreaterThanOrEqual(95);
      expect(g.x + g.width).toBeLessThanOrEqual(205);
      expect(g.y).toBeGreaterThan(130);
      expect(g.y + g.height).toBeLessThan(168);
      expect(g.rx).toBeLessThanOrEqual(Math.min(g.width, g.height) / 2);
    }
  });
});

describe("ease", () => {
  it("moves part of the way toward the target, more with more time", () => {
    expect(ease(0, 1, 0, 70)).toBe(0);
    expect(ease(0, 1, 70, 70)).toBeCloseTo(1 - Math.exp(-1));
    expect(ease(0, 1, 1000, 70)).toBeCloseTo(1, 3);
  });
});
