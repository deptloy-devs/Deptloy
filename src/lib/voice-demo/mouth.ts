import { mouthOpenness } from "./audio";

/**
 * Lip sync for Dep: turns the voice's sound into a mouth shape.
 *
 * Two things in a vowel's sound decide the mouth, for any voice:
 * - The low resonance (200–1000 Hz) rises as the jaw opens: "ah" is high, "ee" and "oo" are low.
 * - Bright high sound (2200–3500 Hz) compared with the middle marks spread lips: "ee" is bright, "oo"/"oh" are dull.
 * Tuned on recorded "ah", "oh", "oo" and "ee" from three different voices.
 */

export type VoiceFeatures = {
  /** Centre of the 200–1000 Hz sound, in Hz. */
  f1: number;
  /** How much brighter 2200–3500 Hz is than 700–1500 Hz, in dB. */
  spread: number;
};

/** 0..1 each. `wide` is spread lips ("ee"), `round` is rounded lips ("oo", "oh"). */
export type MouthShape = { open: number; wide: number; round: number };

/** Where to draw the mouth on Dep's face, in the robot's SVG units. */
export type MouthGeometry = { x: number; y: number; width: number; height: number; rx: number };

/** Mean power below this (in the 200–1000 Hz band) counts as silence. */
const SILENCE_DB = -90;

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

/** Reads the features from an analyser's frequency data (dB per bin, as from getFloatFrequencyData). */
export function voiceFeatures(spectrumDb: Float32Array, sampleRate: number): VoiceFeatures | null {
  const binHz = sampleRate / 2 / spectrumDb.length;

  const band = (fromHz: number, toHz: number) => {
    let power = 0;
    let weighted = 0;
    let count = 0;
    const first = Math.max(0, Math.ceil(fromHz / binHz));
    const last = Math.min(spectrumDb.length - 1, Math.floor(toHz / binHz));
    for (let i = first; i <= last; i++) {
      const p = 10 ** (spectrumDb[i] / 10);
      power += p;
      weighted += p * i * binHz;
      count++;
    }
    const mean = count ? power / count : 0;
    return { db: 10 * Math.log10(Math.max(mean, 1e-30)), centre: power > 0 ? weighted / power : 0 };
  };

  const low = band(200, 1000);
  if (low.db < SILENCE_DB) return null;
  const spread = band(2200, 3500).db - (band(700, 1000).db + band(1000, 1500).db) / 2;
  return { f1: low.centre, spread };
}

/** The mouth for this moment: loudness sets how far it opens, the sound sets its shape. */
export function mouthShape(level: number, features: VoiceFeatures | null): MouthShape {
  const loudness = mouthOpenness(level);
  if (!features) return { open: loudness * 0.8, wide: 0, round: 0 };

  const wide = clamp01((features.spread - 2) / 9);
  // Quiet consonants ("m", "n") sound like "oo" here, so only clear, loud sounds round the lips.
  // On test sentences this rounds about a quarter of the time, mostly on "oo"-like sounds.
  const round = (1 - wide) * clamp01((460 - features.f1) / 120) * clamp01(loudness / 0.5);
  const jaw = 0.55 + 0.45 * clamp01((features.f1 - 300) / 350);
  return { open: loudness * jaw, wide, round };
}

/** Closed, the mouth is a short line where the smile sits; it opens mostly downward, like a jaw. */
export function mouthGeometry({ open, wide, round }: MouthShape): MouthGeometry {
  const width = Math.max(12, Math.min(50, 26 + 8 * open + 16 * wide - 12 * round));
  const height = 3 + 22 * open * (1 - 0.55 * wide);
  return {
    x: 150 - width / 2,
    y: 144.5 - height * 0.3,
    width,
    height,
    rx: Math.min(width, height) / 2,
  };
}

/** Moves `previous` toward `target`; `tauMs` is how quickly (about 63% of the way after tauMs). */
export function ease(previous: number, target: number, elapsedMs: number, tauMs: number): number {
  return previous + (target - previous) * (1 - Math.exp(-Math.max(0, elapsedMs) / tauMs));
}
