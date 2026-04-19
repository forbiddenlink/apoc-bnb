"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_KEY = "apoc-bnb-ebs-seen";
const TRIGGER_CHANCE = 0.03;
const CHECK_INTERVAL_MS = 60_000;
const INITIAL_DELAY_MS = 30_000;
const DISPLAY_DURATION_MS = 4_000;

const BROADCAST_MESSAGES = [
  "RADIATION SPIKE DETECTED IN SECTOR 7. ALL PERSONNEL SEEK SHELTER IMMEDIATELY.",
  "UNIDENTIFIED CREATURES REPORTED NEAR SAFE ZONE ALPHA. MAINTAIN PERIMETER.",
  "SUPPLY DROP CONFIRMED AT GRID REF 47-BRAVO. FIRST COME, FIRST SERVED.",
  "DEFCON LEVEL CHANGE: 3 \u2192 2. THIS IS NOT A DRILL. PROBABLY.",
  "SATELLITE UPLINK RESTORED. ESTIMATED WINDOW: 4 MINUTES. USE WISELY.",
  "WANDERING TRADER CARAVAN APPROACHING FROM THE EAST. WEAPONS POLICY IN EFFECT.",
];

export function EmergencyBroadcast() {
  const [phase, setPhase] = useState<
    "idle" | "glitch-in" | "broadcast" | "glitch-out"
  >("idle");
  const [message, setMessage] = useState("");
  const hasFiredRef = useRef(false);

  const trigger = useCallback(() => {
    if (hasFiredRef.current) return;
    hasFiredRef.current = true;
    sessionStorage.setItem(STORAGE_KEY, "true");

    setMessage(
      BROADCAST_MESSAGES[Math.floor(Math.random() * BROADCAST_MESSAGES.length)]
    );

    // Glitch in
    setPhase("glitch-in");
    setTimeout(() => setPhase("broadcast"), 100);

    // Auto-dismiss after duration
    setTimeout(() => {
      setPhase("glitch-out");
      setTimeout(() => setPhase("idle"), 100);
    }, DISPLAY_DURATION_MS);
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    const delayTimer = setTimeout(() => {
      // Check immediately after delay, then on interval
      const interval = setInterval(() => {
        if (hasFiredRef.current) {
          clearInterval(interval);
          return;
        }
        if (Math.random() < TRIGGER_CHANCE) {
          trigger();
          clearInterval(interval);
        }
      }, CHECK_INTERVAL_MS);

      return () => clearInterval(interval);
    }, INITIAL_DELAY_MS);

    return () => clearTimeout(delayTimer);
  }, [trigger]);

  const isVisible = phase === "glitch-in" || phase === "broadcast" || phase === "glitch-out";
  const isGlitch = phase === "glitch-in" || phase === "glitch-out";

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[90] flex items-center justify-center"
          aria-live="assertive"
          role="alert"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-black/90" />

          {/* CRT scanline overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.08]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.4) 2px, rgba(0,0,0,0.4) 4px)",
            }}
          />

          {/* Static/glitch overlay */}
          {isGlitch && (
            <div
              className="absolute inset-0 pointer-events-none animate-pulse"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
                backgroundSize: "128px 128px",
                mixBlendMode: "overlay",
                opacity: 0.6,
              }}
            />
          )}

          {/* Hazard stripes - top */}
          <div className="absolute top-0 left-0 right-0 h-8 hazard-stripes opacity-60" />
          <div className="absolute top-8 left-0 right-0 h-px bg-primary/60" />

          {/* Hazard stripes - bottom */}
          <div className="absolute bottom-8 left-0 right-0 h-px bg-primary/60" />
          <div className="absolute bottom-0 left-0 right-0 h-8 hazard-stripes opacity-60" />

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{
              opacity: isGlitch ? 0 : 1,
              scale: 1,
            }}
            transition={{ duration: 0.3 }}
            className="relative z-10 max-w-2xl mx-auto px-6 text-center space-y-6"
          >
            {/* Title */}
            <div className="space-y-2">
              <p className="text-xs font-mono uppercase tracking-[0.3em] text-primary/60">
                &gt;&gt;&gt; INCOMING TRANSMISSION &lt;&lt;&lt;
              </p>
              <h2
                className="text-2xl md:text-4xl font-bold uppercase tracking-[0.15em] text-red-500 font-mono animate-pulse"
                style={{
                  textShadow:
                    "0 0 20px rgba(239,68,68,0.5), 0 0 40px rgba(239,68,68,0.2)",
                }}
              >
                Emergency Broadcast System
              </h2>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />

            {/* Message */}
            <p
              className="text-sm md:text-base font-mono text-white/90 leading-relaxed tracking-wide"
              style={{
                textShadow: "0 0 10px rgba(255,255,255,0.15)",
              }}
            >
              {message}
            </p>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />

            {/* Footer */}
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground/50">
              This has been a test of the Emergency Broadcast System
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
