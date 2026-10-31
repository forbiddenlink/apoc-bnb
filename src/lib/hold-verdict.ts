import type { BunkerFeatures } from "@/types";

export type HoldLevel = "holds" | "caveats" | "dubious" | "fails";

export interface HoldCheck {
  label: string;
  rule: string;
  value: string;
  pass: boolean;
}

export interface HoldVerdict {
  checks: HoldCheck[];
  passed: number;
  level: HoldLevel;
  headline: string;
  note: string;
}

const VERDICTS: Record<HoldLevel, { headline: string; note: string }> = {
  holds: {
    headline: "It will hold.",
    note: "Every check passed. We would not put that in writing.",
  },
  caveats: {
    headline: "It will hold, mostly.",
    note: "One check failed. Read the failed line before you pack.",
  },
  dubious: {
    headline: "It might hold.",
    note: "Two checks failed. The host has been told.",
  },
  fails: {
    headline: "It will not hold.",
    note: "Every check failed. Book it for the story.",
  },
};

// Thresholds: radiation matches the RAD-SAFE badge on listing cards (radLevel <= 2).
export function holdVerdict(f: BunkerFeatures): HoldVerdict {
  const checks: HoldCheck[] = [
    { label: "Radiation", rule: "level 2 or lower", value: `level ${f.radLevel}`, pass: f.radLevel <= 2 },
    { label: "Security", rule: "level 3 or higher", value: `level ${f.securityLevel}`, pass: f.securityLevel >= 3 },
    { label: "Oxygen", rule: "97% or purer", value: `${f.oxygenPurity}%`, pass: f.oxygenPurity >= 97 },
  ];
  const passed = checks.filter((c) => c.pass).length;
  const level: HoldLevel = passed === 3 ? "holds" : passed === 2 ? "caveats" : passed === 1 ? "dubious" : "fails";
  return { checks, passed, level, ...VERDICTS[level] };
}
