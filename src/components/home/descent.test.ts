import { describe, expect, it } from 'vitest'
import { needleAngle, readingAt, SURFACE_READING, stampVisible } from './descent'

describe('descent to zero', () => {
  it('starts at the surface reading with no stamp (the poster frame)', () => {
    expect(readingAt(0)).toBe(SURFACE_READING)
    expect(stampVisible(0)).toBe(false)
  })
  it('reaches 0.0 and stamps by the end', () => {
    expect(readingAt(1)).toBe(0)
    expect(stampVisible(1)).toBe(true)
  })
  it('clamps out-of-range progress', () => {
    expect(readingAt(-1)).toBe(SURFACE_READING)
    expect(readingAt(5)).toBe(0)
  })
  it('maps zero to the left end of the dial', () => {
    expect(needleAngle(0)).toBe(-80)
    expect(needleAngle(16)).toBe(80)
  })
})
