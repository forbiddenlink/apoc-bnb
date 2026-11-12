/** Fictional parody surface reading, mSv/h. Obviously not a real measurement. */
export const SURFACE_READING = 14.2
const DIAL_MAX = 16
const SWEEP_DEG = 80

/** Reading at scroll progress 0..1; reaches 0 at progress 0.9 and stays there. */
export function readingAt(progress: number): number {
  const p = Math.min(1, Math.max(0, progress / 0.9))
  return Math.round(SURFACE_READING * (1 - p) * 10) / 10
}

/** Needle angle in degrees for a reading (-80 at zero, +80 at dial max). */
export function needleAngle(reading: number): number {
  return -SWEEP_DEG + (reading / DIAL_MAX) * SWEEP_DEG * 2
}

/** The stamp lands once the needle is within 10% of the end of its sweep. */
export function stampVisible(progress: number): boolean {
  return progress >= 0.85
}
