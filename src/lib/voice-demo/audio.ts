/** Audio helpers for the voice demo: mic format conversion and lip-sync levels. */

/** Gemini wants 16 kHz, 16-bit mono PCM. Averages each block of input samples, then converts. */
export function downsampleToPcm16(input: Float32Array, inputRate: number, outputRate = 16000): Int16Array {
  const ratio = inputRate / outputRate;
  const out = new Int16Array(Math.floor(input.length / ratio));
  for (let i = 0; i < out.length; i++) {
    const start = Math.floor(i * ratio);
    const end = Math.min(input.length, Math.max(start + 1, Math.floor((i + 1) * ratio)));
    let sum = 0;
    for (let j = start; j < end; j++) sum += input[j];
    const sample = Math.max(-1, Math.min(1, sum / (end - start)));
    out[i] = Math.round(sample < 0 ? sample * 0x8000 : sample * 0x7fff);
  }
  return out;
}

export function pcm16ToBase64(pcm: Int16Array): string {
  const bytes = new Uint8Array(pcm.length * 2);
  const view = new DataView(bytes.buffer);
  pcm.forEach((sample, i) => view.setInt16(i * 2, sample, true));
  let binary = "";
  for (let i = 0; i < bytes.length; i += 0x8000) {
    binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  }
  return btoa(binary);
}

/** Gemini's replies: base64 of 16-bit little-endian PCM. Returns floats for Web Audio. */
export function base64ToFloat32(base64: string): Float32Array {
  const binary = atob(base64);
  const view = new DataView(new ArrayBuffer(binary.length));
  for (let i = 0; i < binary.length; i++) view.setUint8(i, binary.charCodeAt(i));
  const out = new Float32Array(Math.floor(binary.length / 2));
  for (let i = 0; i < out.length; i++) out[i] = view.getInt16(i * 2, true) / 0x8000;
  return out;
}

/** Loudness of one analyser frame (root mean square), 0..1. */
export function rmsLevel(samples: Float32Array): number {
  if (samples.length === 0) return 0;
  let sum = 0;
  for (const s of samples) sum += s * s;
  return Math.sqrt(sum / samples.length);
}

const OPEN_MS = 40;
const CLOSE_MS = 140;

/** Eases toward the new level: opens quickly, closes a little slower, so the mouth doesn't flicker. */
export function smoothLevel(previous: number, target: number, elapsedMs: number): number {
  const tau = target > previous ? OPEN_MS : CLOSE_MS;
  const alpha = 1 - Math.exp(-Math.max(0, elapsedMs) / tau);
  return previous + (target - previous) * alpha;
}

const NOISE_FLOOR = 0.01;
const FULL_OPEN_AT = 0.16;

/** Maps loudness to how open the mouth is, 0..1. */
export function mouthOpenness(level: number): number {
  return Math.max(0, Math.min(1, (level - NOISE_FLOOR) / (FULL_OPEN_AT - NOISE_FLOOR)));
}
