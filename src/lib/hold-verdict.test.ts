import { describe, it, expect } from 'vitest';
import { holdVerdict } from './hold-verdict';
import { mockBunkers } from './data/bunkers';
import type { BunkerFeatures } from '@/types';

const base: BunkerFeatures = {
  radLevel: 1,
  capacity: 4,
  securityLevel: 4,
  oxygenPurity: 98,
  depth: 100,
  blastDoorRating: 'Class A',
  powerSource: 'x',
  waterSource: 'y',
};

describe('holdVerdict', () => {
  it('passes all three checks for a sound listing', () => {
    const v = holdVerdict(base);
    expect(v.passed).toBe(3);
    expect(v.level).toBe('holds');
  });

  it('fails radiation above 2, matching the RAD-SAFE badge threshold', () => {
    expect(holdVerdict({ ...base, radLevel: 2 }).checks[0].pass).toBe(true);
    expect(holdVerdict({ ...base, radLevel: 3 }).checks[0].pass).toBe(false);
  });

  it('fails security below level 3', () => {
    expect(holdVerdict({ ...base, securityLevel: 3 }).checks[1].pass).toBe(true);
    expect(holdVerdict({ ...base, securityLevel: 2 }).checks[1].pass).toBe(false);
  });

  it('fails oxygen below 97 percent', () => {
    expect(holdVerdict({ ...base, oxygenPurity: 97 }).checks[2].pass).toBe(true);
    expect(holdVerdict({ ...base, oxygenPurity: 96.9 }).checks[2].pass).toBe(false);
  });

  it('maps pass counts to levels', () => {
    expect(holdVerdict({ ...base, radLevel: 5 }).level).toBe('caveats');
    expect(holdVerdict({ ...base, radLevel: 5, securityLevel: 1 }).level).toBe('dubious');
    expect(holdVerdict({ ...base, radLevel: 5, securityLevel: 1, oxygenPurity: 90 }).level).toBe('fails');
  });

  it('gives every listing a verdict from its own fields', () => {
    for (const b of mockBunkers) {
      const v = holdVerdict(b.features);
      expect(v.checks).toHaveLength(3);
      expect(v.passed).toBe(v.checks.filter((c) => c.pass).length);
    }
  });
});
