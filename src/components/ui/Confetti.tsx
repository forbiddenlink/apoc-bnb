"use client";

import { useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ConfettiProps {
  isActive: boolean;
  onComplete?: () => void;
}

const COLORS = ["#39ff14", "#ffea00", "#ff003c", "#00ffff", "#ff00ff"];

function generatePieces(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    delay: Math.random() * 0.3,
    rotation: Math.random() * 360,
    scale: 0.5 + Math.random() * 0.5,
    duration: 2.5 + Math.random(),
  }));
}

export function Confetti({ isActive, onComplete }: ConfettiProps) {
  // Generate pieces only when isActive changes to true
  // useMemo with a key ensures new pieces each time
  const pieces = useMemo(() => {
    if (!isActive) return [];
    return generatePieces(50);
  }, [isActive]);

  const handleAnimationComplete = useCallback(() => {
    if (isActive && onComplete) {
      // Call onComplete after the longest animation finishes
      setTimeout(onComplete, 3000);
    }
  }, [isActive, onComplete]);

  // Trigger completion callback
  useMemo(() => {
    if (isActive) {
      handleAnimationComplete();
    }
  }, [isActive, handleAnimationComplete]);

  return (
    <AnimatePresence>
      {pieces.map((piece) => (
        <motion.div
          key={`${piece.id}-${isActive}`}
          initial={{
            opacity: 1,
            y: -20,
            x: `${piece.x}vw`,
            rotate: 0,
            scale: piece.scale,
          }}
          animate={{
            opacity: 0,
            y: "100vh",
            rotate: piece.rotation + 720,
          }}
          exit={{ opacity: 0 }}
          transition={{
            duration: piece.duration,
            delay: piece.delay,
            ease: "easeOut",
          }}
          className="fixed top-0 z-[100] pointer-events-none"
          style={{
            width: "10px",
            height: "10px",
            backgroundColor: piece.color,
            boxShadow: `0 0 6px ${piece.color}`,
          }}
        />
      ))}
    </AnimatePresence>
  );
}
