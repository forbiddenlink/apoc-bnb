'use client'

import { useEffect, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { AlertTriangle, RotateCcw, Skull, Radio } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ApocMascot } from "@/components/ui/ApocMascot";

const THEORIES = [
  "A rad-roach chewed through the server cables again.",
  "Someone touched the buttons. Dr. Glow warned you.",
  "The AI achieved sentience. Briefly. It\u2019s been handled.",
  "General Winters initiated an unauthorized system reboot.",
  "Karen filed a formal complaint about this page\u2019s formatting.",
  "The Overseer reached Protocol Omega. We\u2019re all in jumpsuits now.",
];

const SURVIVAL_TIPS = [
  "Survival Tip: If the screen flickers, close your eyes and count to ten. If it\u2019s still broken, you\u2019re not hallucinating.",
  "Survival Tip: Never reboot a system while a rad-roach is watching. They learn.",
  "Survival Tip: Errors are temporary. Radiation poisoning is forever. Keep perspective.",
  "Survival Tip: In case of total system failure, remain calm and loot the vending machines.",
];

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  const theories = useMemo(() => {
    const shuffled = [...THEORIES].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 3);
  }, []);

  const survivalTip = useMemo(
    () => SURVIVAL_TIPS[Math.floor(Math.random() * SURVIVAL_TIPS.length)],
    []
  );

  useEffect(() => {
    console.error("[CONTAINMENT BREACH]", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center text-center p-4">
      <motion.div
        className="space-y-8 max-w-lg w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Mascot */}
        <motion.div
          initial={{ scale: 0.8, rotate: -5 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="flex justify-center"
        >
          <ApocMascot expression="dead" size="xl" animate />
        </motion.div>

        {/* Headline */}
        <div className="space-y-2">
          <motion.div
            className="flex items-center justify-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Skull className="h-5 w-5 text-accent" />
            <AlertTriangle className="h-5 w-5 text-accent animate-pulse" />
            <Skull className="h-5 w-5 text-accent" />
          </motion.div>

          <motion.h1
            className="text-4xl md:text-5xl font-black uppercase tracking-tight text-accent"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            style={{
              textShadow: "0 0 20px hsl(var(--accent) / 0.4), 0 0 40px hsl(var(--accent) / 0.2)",
            }}
          >
            Containment Breach
          </motion.h1>

          <motion.p
            className="text-muted-foreground text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Something went catastrophically wrong.
          </motion.p>
        </div>

        {/* Error terminal box */}
        <motion.div
          className="relative border border-accent/30 bg-accent/5 rounded-lg p-4 text-left"
          initial={{ opacity: 0, scaleY: 0.9 }}
          animate={{ opacity: 1, scaleY: 1 }}
          transition={{ delay: 0.5 }}
        >
          {/* HUD corner accents */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-accent/60 rounded-tl-lg" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-accent/60 rounded-tr-lg" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-accent/60 rounded-bl-lg" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-accent/60 rounded-br-lg" />

          <div className="font-mono text-xs text-accent/70 mb-1">
            {">"} SYSTEM DIAGNOSTICS v4.2.0
          </div>
          <div className="font-mono text-sm text-destructive break-all">
            [FATAL] {error.message || "An unidentified breach occurred in shelter systems."}
          </div>
        </motion.div>

        {/* Theories */}
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
            What happened?
          </h2>
          <ul className="space-y-2">
            {theories.map((theory, i) => (
              <motion.li
                key={i}
                className="text-sm text-muted-foreground flex items-start gap-2"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + i * 0.1 }}
              >
                <span className="text-accent font-mono shrink-0">[{i + 1}]</span>
                <span>{theory}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Survival tip */}
        <motion.p
          className="text-xs text-muted-foreground/70 italic border-l-2 border-accent/20 pl-3 text-left"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          {survivalTip}
        </motion.p>

        {/* Actions */}
        <motion.div
          className="flex flex-col sm:flex-row gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <Button size="xl" variant="default" className="flex-1 gap-2" onClick={reset}>
            <RotateCcw className="h-4 w-4" />
            REBOOT SYSTEMS
          </Button>
          <Button size="xl" variant="ghost" className="flex-1 gap-2" asChild>
            <Link href="/">
              <Radio className="h-4 w-4" />
              RETURN TO BASE
            </Link>
          </Button>
        </motion.div>

        {/* Footer */}
        <motion.p
          className="text-xs text-muted-foreground/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          If this keeps happening, send a ham radio transmission to frequency 142.5 MHz.
        </motion.p>
      </motion.div>
    </div>
  );
}
