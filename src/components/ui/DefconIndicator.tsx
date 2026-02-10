"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

const DEFCON_LEVELS = [
  { level: 1, label: "NUCLEAR WAR", color: "bg-red-500", textColor: "text-red-500" },
  { level: 2, label: "IMMINENT THREAT", color: "bg-orange-500", textColor: "text-orange-500" },
  { level: 3, label: "ELEVATED ALERT", color: "bg-yellow-500", textColor: "text-yellow-500" },
  { level: 4, label: "INCREASED READINESS", color: "bg-blue-500", textColor: "text-blue-500" },
  { level: 5, label: "NORMAL", color: "bg-green-500", textColor: "text-green-500" },
];

export function DefconIndicator() {
  const [defcon, setDefcon] = useState(3);
  const [isBlinking, setIsBlinking] = useState(false);

  // Simulate random DEFCON changes
  useEffect(() => {
    const interval = setInterval(() => {
      // 10% chance to change DEFCON level
      if (Math.random() < 0.1) {
        setDefcon((prev) => {
          const change = Math.random() > 0.5 ? 1 : -1;
          const newLevel = Math.max(1, Math.min(5, prev + change));
          if (newLevel !== prev) {
            setIsBlinking(true);
            setTimeout(() => setIsBlinking(false), 2000);
          }
          return newLevel;
        });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const currentLevel = DEFCON_LEVELS.find((d) => d.level === defcon)!;

  return (
    <motion.div
      animate={isBlinking ? { scale: [1, 1.05, 1] } : {}}
      transition={{ duration: 0.3, repeat: isBlinking ? 3 : 0 }}
      className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-black/50 backdrop-blur border border-border rounded-full font-mono text-xs"
    >
      <AlertTriangle className={`h-3 w-3 ${currentLevel.textColor} ${defcon <= 2 ? "animate-pulse" : ""}`} />
      <span className="text-muted-foreground">DEFCON</span>
      <motion.span
        key={defcon}
        initial={{ scale: 1.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={`font-bold ${currentLevel.textColor}`}
      >
        {defcon}
      </motion.span>
      <div className={`w-2 h-2 rounded-full ${currentLevel.color} ${defcon <= 2 ? "animate-pulse" : ""}`} />
    </motion.div>
  );
}
