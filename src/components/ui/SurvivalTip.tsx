"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { getRandomTip } from "@/lib/data/survival-tips";

interface SurvivalTipProps {
  interval?: number; // milliseconds between tips
  className?: string;
}

// Hook to detect client-side mounting without setState in useEffect
function useHasMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

export function SurvivalTip({ interval = 8000, className = "" }: SurvivalTipProps) {
  // Use lazy initializer for initial tip
  const [currentTip, setCurrentTip] = useState(() => getRandomTip());
  const [isVisible, setIsVisible] = useState(true);
  const hasMounted = useHasMounted();

  useEffect(() => {
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
