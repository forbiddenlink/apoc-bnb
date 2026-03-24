"use client";

import type { Bunker } from "@/types";
import { useComparison } from "@/lib/hooks/useComparison";
import { useBunkers } from "@/lib/hooks/useBunkers";
import { X, AlertTriangle, Loader2, Trophy, Target, Radiation, Shield } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

// Calculate host eccentricity rating (1-5 stars)
const getEccentricityRating = (quirk?: string): number => {
  const ratings: Record<string, number> = {
    caring: 2,
    military: 3,
    obsessive: 4,
    intense: 4,
    eccentric: 5,
    dangerous: 5,
  };
  return quirk ? ratings[quirk] || 3 : 3;
};

// Calculate survival likelihood
const getSurvivalLikelihood = (bunker: Bunker): string => {
  let score = 100;
  score -= (bunker.features.radLevel || 0) * 10; // Higher rad = lower survival
  score -= getEccentricityRating(bunker.host.quirk) * 5;
  score += bunker.rating * 5;

  if (score >= 80) return "EXCELLENT";
  if (score >= 60) return "GOOD";
  if (score >= 40) return "RISKY";
  return "QUESTIONABLE";
};

// Get survival score
const getSurvivalScore = (bunker: Bunker): number => {
  let score = 100;
  score -= (bunker.features.radLevel || 0) * 10;
  score -= getEccentricityRating(bunker.host.quirk) * 5;
  score += bunker.rating * 5;
  return Math.max(0, Math.min(100, score));
};

// Visual comparison bar
function ComparisonBar({ value, max, color, label }: { value: number; max: number; color: string; label: string }) {
  const percentage = (value / max) * 100;
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className={color}>{value}</span>
      </div>
      <div className="h-2 bg-muted/30 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5 }}
          className={`h-full rounded-full ${color.replace('text-', 'bg-')}`}
        />
      </div>
    </div>
  );
}

export function BunkerComparison() {
  const { bunkerIds, removeBunker, clearAll } = useComparison();
  const { bunkers, isLoading } = useBunkers();

  const comparedBunkers = bunkerIds
    .map(id => bunkers.find(b => b.id === id))
    .filter((b): b is Bunker => b !== undefined);

  // Find winner (highest survival score)
  const winnerIndex = comparedBunkers.length > 1
    ? comparedBunkers.reduce((best, bunker, index, arr) =>
        getSurvivalScore(bunker) > getSurvivalScore(arr[best]) ? index : best, 0)
    : -1;

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 mx-auto text-secondary animate-spin" />
          <p className="text-mono text-sm text-muted-foreground">ANALYZING BUNKER DATA...</p>
        </div>
      </div>
    );
  }

  if (comparedBunkers.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-4 max-w-md bg-card border border-border rounded-xl p-8 relative overflow-hidden"
        >
          {/* HUD corners */}
          <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-secondary/30" />
          <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-secondary/30" />
          <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-secondary/30" />
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-secondary/30" />

          <div className="w-20 h-20 mx-auto rounded-full border-2 border-dashed border-secondary/30 flex items-center justify-center">
            <Target className="h-10 w-10 text-secondary/30" />
          </div>
          <div className="text-label text-secondary">NO TARGETS SELECTED</div>
          <h2 className="text-h3 font-bold text-foreground">Analysis Queue Empty</h2>
          <p className="text-body-sm text-muted-foreground">
            Add bunkers to your comparison from their detail pages to see a side-by-side tactical breakdown.
          </p>
          <Link
            href="/search"
            className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground rounded font-bold hover:bg-secondary/90 transition-colors"
          >
            <Target className="h-4 w-4" />
            Acquire Targets
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-h2 font-bold mb-2 flex items-center gap-3">
            <div className="p-2 bg-secondary/10 rounded border border-secondary/30">
              <Shield className="h-6 w-6 text-secondary" />
            </div>
            Bunker Comparison
          </h1>
          <p className="text-muted-foreground">
            Analyzing <span className="text-secondary font-bold">{comparedBunkers.length}</span> bunker{comparedBunkers.length > 1 ? 's' : ''} for survival viability
          </p>
        </div>
        {comparedBunkers.length > 1 && (
          <button
            onClick={clearAll}
            className="px-4 py-2 text-sm border border-accent/30 hover:bg-accent/10 hover:border-accent/50 text-accent transition-all rounded flex items-center gap-2"
          >
            <X className="h-4 w-4" />
            Clear All
          </button>
        )}
      </div>

      {/* Terminal-Style Comparison Table */}
      <div className="bg-black/60 border border-secondary/30 p-6 rounded-xl font-mono text-sm relative overflow-hidden">
        {/* HUD corners */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-secondary/50" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-secondary/50" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-secondary/50" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-secondary/50" />

        {/* Scan line effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.02]">
          <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 to-transparent animate-scanline" />
        </div>
        <div className="text-secondary mb-4">=== SURVIVAL ANALYSIS REPORT ===</div>
        
        {/* Comparison Grid */}
        <div className="space-y-6">
          {/* Bunker Names Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {comparedBunkers.map((bunker) => (
              <div key={bunker.id} className="space-y-2">
                <div className="flex justify-between items-start">
                  <Link
                    href={`/bunkers/${bunker.id}`}
                    className="text-secondary font-bold hover:underline"
                  >
                    {bunker.title}
                  </Link>
                  <button
                    onClick={() => removeBunker(bunker.id)}
                    className="text-muted-foreground hover:text-destructive transition-colors"
                    title="Remove from comparison"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="text-xs text-muted-foreground">{bunker.location.name}</div>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="border-t border-secondary/20" />

          {/* Metrics */}
          <div className="space-y-4">
            <MetricRow
              label="Price (CAPS/night)"
              values={comparedBunkers.map(b => b.price.caps.toString())}
              highlight="lower"
            />

            {/* Radiation Level */}
            <MetricRow
              label="Radiation Level"
              values={comparedBunkers.map(b => `${b.features.radLevel || 0}/10`)}
              highlight="lower"
            />

            {/* Air Quality */}
            <MetricRow
              label="Air Quality"
              values={comparedBunkers.map(b => `${b.features.oxygenPurity || 95}%`)}
              highlight="higher"
            />

            {/* Depth */}
            <MetricRow
              label="Depth Underground"
              values={comparedBunkers.map(b => `${b.features.depth || 0} ft`)}
            />

            {/* Capacity */}
            <MetricRow
              label="Max Capacity"
              values={comparedBunkers.map(b => `${b.capacity} guests`)}
            />

            {/* Host Eccentricity */}
            <MetricRow
              label="Host Eccentricity"
              values={comparedBunkers.map(b => 
                "★".repeat(getEccentricityRating(b.host.quirk)) + 
                "☆".repeat(5 - getEccentricityRating(b.host.quirk))
              )}
            />

            {/* Banned Items */}
            <MetricRow
              label="Banned Items"
              values={comparedBunkers.map(b => b.bannedItems?.length?.toString() || "0")}
              highlight="lower"
            />

            {/* Rating */}
            <MetricRow
              label="Guest Rating"
              values={comparedBunkers.map(b => `${b.rating}/5`)}
              highlight="higher"
            />

            {/* Survival Likelihood (Calculated) */}
            <MetricRow
              label="Survival Likelihood"
              values={comparedBunkers.map(b => getSurvivalLikelihood(b))}
              highlight="text"
              textHighlight={["EXCELLENT", "GOOD"]}
            />
          </div>

          {/* Footer */}
          <div className="border-t border-secondary/20 pt-4">
            <div className="text-xs text-muted-foreground">
              * Survival likelihood calculated from radiation, host eccentricity, and guest rating
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Metric Row Component
function MetricRow({
  label,
  values,
  highlight,
  textHighlight = [],
}: {
  label: string;
  values: string[];
  highlight?: "higher" | "lower" | "text";
  textHighlight?: string[];
}) {
  const getHighlightClass = (value: string) => {
    if (highlight === "text") {
      return textHighlight.includes(value) ? "text-green-500" : "text-yellow-500";
    }
    
    if (highlight === "higher") {
      const numValues = values.map(v => parseFloat(v.replace(/[^\d.]/g, "")));
      const maxValue = Math.max(...numValues);
      return parseFloat(value.replace(/[^\d.]/g, "")) === maxValue ? "text-green-500" : "";
    }
    
    if (highlight === "lower") {
      const numValues = values.map(v => parseFloat(v.replace(/[^\d.]/g, "")));
      const minValue = Math.min(...numValues);
      return parseFloat(value.replace(/[^\d.]/g, "")) === minValue ? "text-green-500" : "";
    }
    
    return "";
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="text-secondary font-bold">{label}:</div>
      {values.map((value, idx) => (
        <div key={idx} className={`${getHighlightClass(value)} font-medium`}>
          {value}
        </div>
      ))}
    </div>
  );
}
