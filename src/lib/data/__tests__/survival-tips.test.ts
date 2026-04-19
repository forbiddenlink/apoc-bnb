import { describe, it, expect } from 'vitest';
import { survivalTips, getRandomTip, getTip } from '../survival-tips';

describe('Survival Tips', () => {
  it('has at least 40 tips', () => {
    expect(survivalTips.length).toBeGreaterThanOrEqual(40);
  });

  it('all tips are non-empty strings', () => {
    for (const tip of survivalTips) {
      expect(typeof tip).toBe('string');
      expect(tip.length).toBeGreaterThan(0);
    }
  });

  it('getRandomTip returns a string from the array', () => {
    const tip = getRandomTip();
    expect(survivalTips).toContain(tip);
  });

  it('getTip wraps around with modulo', () => {
    const first = getTip(0);
    expect(first).toBe(survivalTips[0]);

    const wrapped = getTip(survivalTips.length);
    expect(wrapped).toBe(survivalTips[0]);

    const wrapped2 = getTip(survivalTips.length + 1);
    expect(wrapped2).toBe(survivalTips[1]);
  });

  it('no duplicate tips', () => {
    const unique = new Set(survivalTips);
    expect(unique.size).toBe(survivalTips.length);
  });
});
