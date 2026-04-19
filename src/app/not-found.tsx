"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { Button } from "@/components/ui/button";
import { GlitchText } from "@/components/ui/GlitchText";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Radiation,
  AlertTriangle,
  Radio,
  Compass,
  ShieldAlert,
  TriangleAlert,
  Home,
  Search,
} from "lucide-react";
import Link from "next/link";

const theories = [
  {
    id: "radiation",
    text: "Your nav-computer absorbed a lethal dose of gamma radiation. It happens more than you'd think.",
    icon: Radiation,
  },
  {
    id: "raiders",
    text: "Raiders intercepted your signal and rerouted you to a dead zone. Classic raider move.",
    icon: ShieldAlert,
  },
  {
    id: "coordinates",
    text: "Someone gave you coordinates to a bunker that was decommissioned in Year 1 PE. They do that for fun.",
    icon: Compass,
  },
  {
    id: "corrupted",
    text: "Your map data got corrupted during the last EMP storm. Have you tried turning your Pip-Boy off and on?",
    icon: AlertTriangle,
  },
  {
    id: "signal",
    text: "The satellite relay in Sector 7-G went offline again. We've filed a maintenance ticket. With a pigeon.",
    icon: Radio,
  },
  {
    id: "toll",
    text: "You took a wrong turn at the toll booth. The operator swears he gave correct directions. He did not.",
    icon: TriangleAlert,
  },
];

const survivalTips = [
  "If the walls are glowing, the bunker is not 'cozy.' Leave immediately.",
  "Never accept directions from someone wearing a traffic cone as a hat.",
  "A locked door in the wasteland means 'keep out,' not 'mystery treasure inside.'",
  "If your Geiger counter starts clicking rhythmically, it is not playing music for you.",
  "The two-headed dog is friendly. The three-headed one is not. We don't talk about the four-headed one.",
  "Always verify your host's 'no cannibalism' policy is current, not historical.",
];

function generateErrorCode(): string {
  const prefixes = ["ERR", "SIG", "NAV", "SEC", "RAD"];
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const num = Math.floor(Math.random() * 9000) + 1000;
  const suffixes = ["DELTA", "GAMMA", "OMEGA", "ALPHA", "SIGMA", "THETA"];
  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
  return `${prefix}-${num}-${suffix}`;
}

// HUD corner accents
function HUDCorners() {
  return (
    <>
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary/40" />
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary/40" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary/40" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary/40" />
    </>
  );
}

export default function NotFound() {
  const [errorCode, setErrorCode] = useState("ERR-0000-NULL");
  const [theoryIndex, setTheoryIndex] = useState(0);
  const [tipIndex, setTipIndex] = useState(0);

  useEffect(() => {
    setErrorCode(generateErrorCode());
    setTheoryIndex(Math.floor(Math.random() * theories.length));
    setTipIndex(Math.floor(Math.random() * survivalTips.length));
  }, []);

  // Cycle theories every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setTheoryIndex((prev) => (prev + 1) % theories.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentTheory = theories[theoryIndex];
  const TheoryIcon = currentTheory.icon;

  return (
    <div className="min-h-screen bg-background font-sans noise-overlay">
      <Navbar />

      <main className="pt-24 pb-20 md:pb-20 pb-mobile-nav">
        <section className="container mx-auto px-4 py-16 text-center relative">
          {/* Scanline effect */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.03]">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-transparent animate-scanline" />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative max-w-3xl mx-auto"
          >
            {/* Error code badge */}
            <div className="inline-flex items-center gap-2 rounded border border-accent/30 bg-accent/10 px-4 py-1.5 text-label text-accent mb-8 relative">
              <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-accent animate-pulse rounded-full" />
              <AlertTriangle className="h-4 w-4" />
              <span>TERMINAL ERROR</span>
              <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-accent animate-pulse rounded-full" />
            </div>

            {/* Error code in monospace */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="font-mono text-xs text-muted-foreground mb-6 tracking-[0.3em]"
            >
              {errorCode}
            </motion.div>

            {/* 404 number with glitch */}
            <div className="mb-4">
              <GlitchText
                text="404"
                className="text-[8rem] md:text-[12rem] font-black leading-none text-primary text-glow"
              />
            </div>

            {/* Main headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-h1 md:text-display text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-500 uppercase tracking-tighter mb-6"
            >
              SECTOR NOT FOUND
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-body text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-12"
            >
              You&apos;ve wandered into uncharted wasteland. The coordinates you
              followed lead to nothing but irradiated dust and the faint echo of
              a Geiger counter that&apos;s seen better days.
            </motion.p>

            {/* Rotating theories panel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="bg-card border border-border rounded-xl p-6 md:p-8 mb-12 relative overflow-hidden max-w-2xl mx-auto"
            >
              <HUDCorners />

              <div className="text-label text-secondary mb-4 tracking-widest">
                DIAGNOSTIC ANALYSIS: WHAT WENT WRONG
              </div>

              <motion.div
                key={theoryIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="flex items-start gap-4 text-left"
              >
                <div className="p-2 bg-secondary/10 rounded border border-secondary/30 shrink-0 mt-1">
                  <TheoryIcon className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <div className="text-sm font-mono text-secondary/70 mb-1">
                    THEORY {theoryIndex + 1}/{theories.length}
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {currentTheory.text}
                  </p>
                </div>
              </motion.div>

              {/* Theory indicator dots */}
              <div className="flex justify-center gap-2 mt-6">
                {theories.map((_, i) => (
                  <div
                    key={i}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      i === theoryIndex
                        ? "bg-secondary w-4"
                        : "bg-secondary/30"
                    }`}
                  />
                ))}
              </div>
            </motion.div>

            {/* Action buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
            >
              <Button asChild size="lg" variant="default" className="gap-2">
                <Link href="/">
                  <Home className="h-4 w-4" />
                  Return to Base
                </Link>
              </Button>
              <Button asChild size="lg" variant="tactical-gold" className="gap-2">
                <Link href="/search">
                  <Search className="h-4 w-4" />
                  Search for Bunkers
                </Link>
              </Button>
            </motion.div>

            {/* Survival tip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.6 }}
              className="border-t border-border pt-8 max-w-xl mx-auto"
            >
              <div className="flex items-center justify-center gap-2 text-label text-primary/60 mb-3 tracking-widest">
                <Radiation className="h-3 w-3" />
                <span>WASTELAND SURVIVAL TIP</span>
                <Radiation className="h-3 w-3" />
              </div>
              <p className="text-sm text-muted-foreground italic">
                &quot;{survivalTips[tipIndex]}&quot;
              </p>
            </motion.div>

            {/* Terminal footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="mt-12 text-mono text-xs text-muted-foreground"
            >
              APOC-BNB NAVIGATION SYSTEM | STATUS: SIGNAL LOST | RETRY: MANUAL
            </motion.div>
          </motion.div>
        </section>
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}
