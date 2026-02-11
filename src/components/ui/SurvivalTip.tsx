"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { getRandomTip } from "@/lib/data/survival-tips";

interface SurvivalTipProps {
  interval?: number; // milliseconds between tips
  className?: string;
}

export function SurvivalTip({ interval = 8000, className = "" }: SurvivalTipProps) {
  const [currentTip, setCurrentTip] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    // Only run on client to avoid hydration mismatch
    setHasMounted(true);
    setCurrentTip(getRandomTip());
    setIsVisible(true);

    // Rotate tips at interval
    const timer = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentTip(getRandomTip());
        setIsVisible(true);
      }, 500); // Half second fade
    }, interval);

    return () => clearInterval(timer);
  }, [interval]);

  // Prevent hydration mismatch by not rendering until client-side mounted
  if (!hasMounted) {
    return <div className={`h-12 ${className}`} />; // Placeholder to prevent layout shift
  }

  return (
    <div className={`flex items-start gap-3 ${className}`}>
      <AlertTriangle className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.p
            key={currentTip}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="text-sm text-muted-foreground italic font-medium leading-relaxed"
          >
            <span className="text-secondary font-bold not-italic">SURVIVAL TIP:</span>{" "}
            {currentTip}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
