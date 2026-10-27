import { describe, expect, it } from "vitest";
import { base64ToFloat32, downsampleToPcm16, mouthOpenness, pcm16ToBase64, rmsLevel, smoothLevel } from "./audio";

describe("downsampleToPcm16", () => {
  it("converts 48 kHz float audio to 16 kHz 16-bit samples", () => {
    const input = new Float32Array(480).fill(0.5);
    const out = downsampleToPcm16(input, 48000, 16000);
    expect(out).toBeInstanceOf(Int16Array);
    expect(out.length).toBe(160);
    expect(out[0]).toBe(Math.round(0.5 * 0x7fff));
  });

  it("clips samples outside -1..1", () => {
    const out = downsampleToPcm16(new Float32Array([2, -2]), 16000, 16000);
    expect(Array.from(out)).toEqual([0x7fff, -0x8000]);
  });

  it("averages samples when downsampling, so high-pitched noise doesn't alias", () => {
    const out = downsampleToPcm16(new Float32Array([1, -1, 1, -1, 1, -1]), 48000, 16000);
    expect(Array.from(out).every((v) => Math.abs(v) < 0x7fff / 2)).toBe(true);
  });
});

describe("PCM base64 round trip", () => {
  it("decodes what it encodes, as floats", () => {
    const pcm = new Int16Array([0, 16384, -16384, 32767, -32768]);
    const floats = base64ToFloat32(pcm16ToBase64(pcm));
    expect(Array.from(floats)).toEqual([0, 0.5, -0.5, 32767 / 32768, -1]);
  });

  it("decodes little-endian bytes", () => {
    // 0x0100 little-endian = 256
    expect(base64ToFloat32(btoa(String.fromCharCode(0x00, 0x01)))[0]).toBeCloseTo(256 / 32768);
  });
});

describe("lip sync levels", () => {
  it("rmsLevel is 0 for silence and grows with volume", () => {
    expect(rmsLevel(new Float32Array(128))).toBe(0);
    expect(rmsLevel(new Float32Array(128).fill(0.5))).toBeCloseTo(0.5);
  });

  it("smoothLevel opens fast and closes slower", () => {
    const opening = smoothLevel(0, 1, 16);
    const closing = 1 - smoothLevel(1, 0, 16);
    expect(opening).toBeGreaterThan(closing);
    expect(opening).toBeLessThanOrEqual(1);
    expect(smoothLevel(0.4, 0.4, 16)).toBeCloseTo(0.4);
  });

  it("mouthOpenness ignores background hiss and caps at fully open", () => {
    expect(mouthOpenness(0.005)).toBe(0);
    expect(mouthOpenness(0.08)).toBeGreaterThan(0.3);
    expect(mouthOpenness(1)).toBe(1);
  });
});
