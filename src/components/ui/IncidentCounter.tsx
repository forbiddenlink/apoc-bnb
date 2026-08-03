"use client";

import { useState } from "react";
import { useVisibleInterval } from "@/lib/hooks/useVisibleInterval";

/**
 * Fake "days since last incident" board — periodically resets to 0 for comedy.
 * Purely decorative; sits in the footer-adjacent zone of the homepage.
 */
export function IncidentCounter({ className = "" }: { className?: string }) {
  const [days, setDays] = useState(0);
  const [flash, setFlash] = useState(false);

  useVisibleInterval(() => {
    // ~8% chance to "have an incident" and reset; otherwise climb slowly
    if (Math.random() < 0.08) {
      setDays(0);
      setFlash(true);
      window.setTimeout(() => setFlash(false), 1200);
    } else {
      setDays((d) => Math.min(d + 1, 47));
    }
  }, 4000);

  return (
    <div
      className={`inline-flex items-center gap-3 border border-white/10 bg-black/50 px-4 py-2 font-mono text-xs tracking-wider ${className}`}
      aria-live="polite"
    >
      <span className="text-muted-foreground uppercase">Days Since Last Incident</span>
      <span
        className={`min-w-[2ch] text-center text-lg font-bold tabular-nums ${
          flash || days === 0 ? "text-accent animate-pulse" : "text-primary"
        }`}
      >
        {days}
      </span>
    </div>
  );
}
