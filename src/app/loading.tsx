"use client";

import { motion } from "framer-motion";
import { ApocMascot } from "@/components/ui/ApocMascot";
import { useEffect, useState } from "react";
import { getRandomLoadingMessage } from "@/lib/data/loading-messages";

export default function Loading() {
  // Use lazy initializer to avoid setState in useEffect for initial value
  const [message, setMessage] = useState(() => getRandomLoadingMessage());

  useEffect(() => {
    // Rotate message every 2.5 seconds
    const interval = setInterval(() => {
      setMessage(getRandomLoadingMessage());
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center relative overflow-hidden">
      {/* Scanline effect */}
      <div className="pointer-events-none fixed inset-0 z-40 scanline opacity-20" />

      {/* Bunker Buddy mascot */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <ApocMascot
          expression="excited"
          size="xl"
          speech={message}
        />
      </motion.div>

      {/* Loading text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8 text-center"
      >
        <h2 className="text-xl font-bold text-foreground uppercase tracking-widest mb-2">
          Initializing Bunker Systems
        </h2>
        <div className="flex items-center gap-1 justify-center text-primary font-mono text-sm">
          <motion.span
            key={message}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {message}
          </motion.span>
          <motion.span
            animate={{ opacity: [0, 1] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
          >
            ...
          </motion.span>
        </div>
      </motion.div>

      {/* Progress bar */}
      <motion.div className="mt-8 w-64 h-1 bg-muted rounded-full overflow-hidden">
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="h-full w-1/3 bg-gradient-to-r from-transparent via-primary to-transparent"
        />
      </motion.div>

      {/* Corner decorations */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-primary/30" />
      <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-primary/30" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-primary/30" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-primary/30" />
    </div>
  );
}
