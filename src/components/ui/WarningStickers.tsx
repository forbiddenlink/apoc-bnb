"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

// Utility to generate consistent random rotation based on seed
// Round to 2 decimal places to avoid hydration mismatches
function seededRotation(seed: number, min: number = -5, max: number = 5): number {
  const x = Math.sin(seed * 9999) * 10000;
  const rand = x - Math.floor(x);
  return Math.round((min + rand * (max - min)) * 100) / 100;
}

// Base sticker styles
const baseStickerStyles = `
  inline-flex items-center justify-center
  font-black uppercase tracking-wider
  border-2 border-black
  shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]
  select-none
`;

// Distressed border effect using pseudo-elements
const distressedClasses = `
  relative
  before:absolute before:inset-0 before:border-2 before:border-black/20
  before:translate-x-[1px] before:translate-y-[1px] before:-z-10
`;

interface StickerProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  seed?: number;
}

// RADIATION WARNING STICKER
export function RadiationSticker({ className = "", size = "md", seed = 1 }: StickerProps) {
  const rotation = useMemo(() => seededRotation(seed), [seed]);

  const sizeClasses = {
    sm: "text-xs px-2 py-1 gap-1",
    md: "text-sm px-3 py-1.5 gap-1.5",
    lg: "text-base px-4 py-2 gap-2",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotate: rotation }}
      animate={{ opacity: 1, scale: 1, rotate: rotation }}
      whileHover={{ scale: 1.05, rotate: rotation + 2 }}
      className={`
        ${baseStickerStyles}
        ${distressedClasses}
        ${sizeClasses[size]}
        bg-yellow-400 text-black
        rounded-sm
        ${className}
      `}
    >
      <span className="text-lg leading-none" aria-hidden="true">☢</span>
      <span>RADIATION</span>
    </motion.div>
  );
}

// CAUTION: AREA UNSTABLE BADGE
export function CautionUnstableSticker({ className = "", size = "md", seed = 2 }: StickerProps) {
  const rotation = useMemo(() => seededRotation(seed), [seed]);

  const sizeClasses = {
    sm: "text-[10px] px-2 py-1",
    md: "text-xs px-3 py-1.5",
    lg: "text-sm px-4 py-2",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotate: rotation }}
      animate={{ opacity: 1, scale: 1, rotate: rotation }}
      whileHover={{ scale: 1.05, rotate: rotation - 2 }}
      className={`
        ${baseStickerStyles}
        ${distressedClasses}
        ${sizeClasses[size]}
        bg-amber-500 text-black
        flex flex-col leading-tight
        rounded-sm
        ${className}
      `}
    >
      <span className="text-[0.6em] tracking-widest">CAUTION</span>
      <span className="font-black">AREA UNSTABLE</span>
    </motion.div>
  );
}

// BIOHAZARD STICKER
export function BiohazardSticker({ className = "", size = "md", seed = 3 }: StickerProps) {
  const rotation = useMemo(() => seededRotation(seed), [seed]);

  const sizeClasses = {
    sm: "text-xs px-2 py-1 gap-1",
    md: "text-sm px-3 py-1.5 gap-1.5",
    lg: "text-base px-4 py-2 gap-2",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotate: rotation }}
      animate={{ opacity: 1, scale: 1, rotate: rotation }}
      whileHover={{ scale: 1.05, rotate: rotation + 3 }}
      className={`
        ${baseStickerStyles}
        ${distressedClasses}
        ${sizeClasses[size]}
        bg-red-600 text-white
        rounded-sm
        ${className}
      `}
    >
      <span className="text-lg leading-none" aria-hidden="true">☣</span>
      <span>BIOHAZARD</span>
    </motion.div>
  );
}

// VERIFIED RAD-FREE STAMP
export function RadFreeSticker({ className = "", size = "md", seed = 4 }: StickerProps) {
  const rotation = useMemo(() => seededRotation(seed), [seed]);

  const sizeClasses = {
    sm: "text-[10px] px-2 py-1 gap-1",
    md: "text-xs px-3 py-2 gap-1.5",
    lg: "text-sm px-4 py-2.5 gap-2",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotate: rotation }}
      animate={{ opacity: 1, scale: 1, rotate: rotation }}
      whileHover={{ scale: 1.05, rotate: rotation - 1 }}
      className={`
        ${baseStickerStyles}
        ${distressedClasses}
        ${sizeClasses[size]}
        bg-green-500 text-black
        rounded-full
        flex flex-col items-center leading-none
        ${className}
      `}
    >
      <span className="text-[0.7em] tracking-[0.2em]">VERIFIED</span>
      <span className="font-black text-[1.1em]">RAD-FREE</span>
      <span className="text-[0.6em] opacity-70">GEIGER TESTED</span>
    </motion.div>
  );
}

// SOLD OUT TAG
export function SoldOutSticker({ className = "", size = "md", seed = 5 }: StickerProps) {
  const rotation = useMemo(() => seededRotation(seed, -8, 8), [seed]);

  const sizeClasses = {
    sm: "text-xs px-3 py-1",
    md: "text-sm px-4 py-1.5",
    lg: "text-base px-5 py-2",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotate: rotation }}
      animate={{ opacity: 1, scale: 1, rotate: rotation }}
      whileHover={{ scale: 1.05 }}
      className={`
        ${baseStickerStyles}
        ${distressedClasses}
        ${sizeClasses[size]}
        bg-neutral-900 text-white
        uppercase tracking-widest
        ${className}
      `}
    >
      SOLD OUT
    </motion.div>
  );
}

// LIMITED SUPPLY TAG
export function LimitedSupplySticker({ className = "", size = "md", seed = 6 }: StickerProps) {
  const rotation = useMemo(() => seededRotation(seed, -6, 6), [seed]);

  const sizeClasses = {
    sm: "text-[10px] px-2 py-1",
    md: "text-xs px-3 py-1.5",
    lg: "text-sm px-4 py-2",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotate: rotation }}
      animate={{ opacity: 1, scale: 1, rotate: rotation }}
      whileHover={{ scale: 1.05, rotate: rotation + 2 }}
      className={`
        ${baseStickerStyles}
        ${distressedClasses}
        ${sizeClasses[size]}
        bg-orange-500 text-black
        flex flex-col items-center leading-tight
        ${className}
      `}
    >
      <span className="text-[0.7em] tracking-wider">LIMITED</span>
      <span className="font-black">SUPPLY</span>
    </motion.div>
  );
}

// LAST SPOT TAG
export function LastSpotSticker({ className = "", size = "md", seed = 7 }: StickerProps) {
  const rotation = useMemo(() => seededRotation(seed, -4, 4), [seed]);

  const sizeClasses = {
    sm: "text-[10px] px-2 py-0.5",
    md: "text-xs px-3 py-1",
    lg: "text-sm px-4 py-1.5",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotate: rotation }}
      animate={{ opacity: 1, scale: 1, rotate: rotation }}
      whileHover={{ scale: 1.1 }}
      className={`
        ${baseStickerStyles}
        ${sizeClasses[size]}
        bg-red-500 text-white
        animate-pulse
        ${className}
      `}
    >
      LAST SPOT!
    </motion.div>
  );
}

// SURVIVOR APPROVED BADGE
export function SurvivorApprovedSticker({ className = "", size = "md", seed = 8 }: StickerProps) {
  const rotation = useMemo(() => seededRotation(seed), [seed]);

  const sizeClasses = {
    sm: "w-12 h-12 text-[8px]",
    md: "w-16 h-16 text-[10px]",
    lg: "w-20 h-20 text-xs",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotate: rotation }}
      animate={{ opacity: 1, scale: 1, rotate: rotation }}
      whileHover={{ scale: 1.1, rotate: rotation + 5 }}
      className={`
        ${sizeClasses[size]}
        rounded-full
        bg-primary text-black
        border-4 border-black
        shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]
        flex flex-col items-center justify-center
        font-black uppercase leading-none
        select-none
        ${className}
      `}
    >
      <span className="text-[1.5em]">★</span>
      <span>SURVIVOR</span>
      <span>APPROVED</span>
    </motion.div>
  );
}

// Floating stickers container for page decoration
interface FloatingStickersProps {
  variant?: "hero" | "scattered" | "corner";
  className?: string;
}

export function FloatingStickers({ variant = "hero", className = "" }: FloatingStickersProps) {
  if (variant === "hero") {
    return (
      <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
        {/* Top right area */}
        <div className="absolute top-20 right-[5%] opacity-60 hidden lg:block">
          <RadFreeSticker size="md" seed={42} />
        </div>

        {/* Left side */}
        <div className="absolute top-1/3 left-[3%] opacity-50 hidden xl:block">
          <CautionUnstableSticker size="sm" seed={17} />
        </div>

        {/* Bottom right */}
        <div className="absolute bottom-32 right-[8%] opacity-40 hidden lg:block">
          <LimitedSupplySticker size="sm" seed={33} />
        </div>
      </div>
    );
  }

  if (variant === "scattered") {
    return (
      <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
        <div className="absolute top-[10%] left-[5%] opacity-50">
          <RadiationSticker size="sm" seed={11} />
        </div>
        <div className="absolute top-[20%] right-[10%] opacity-60">
          <RadFreeSticker size="sm" seed={22} />
        </div>
        <div className="absolute bottom-[30%] left-[8%] opacity-40">
          <BiohazardSticker size="sm" seed={33} />
        </div>
        <div className="absolute bottom-[15%] right-[5%] opacity-50">
          <CautionUnstableSticker size="sm" seed={44} />
        </div>
      </div>
    );
  }

  if (variant === "corner") {
    return (
      <div className={`absolute top-4 right-4 flex flex-col gap-2 ${className}`}>
        <RadFreeSticker size="sm" seed={99} />
      </div>
    );
  }

  return null;
}

// Export all stickers as a collection for easy importing
export const Stickers = {
  Radiation: RadiationSticker,
  CautionUnstable: CautionUnstableSticker,
  Biohazard: BiohazardSticker,
  RadFree: RadFreeSticker,
  SoldOut: SoldOutSticker,
  LimitedSupply: LimitedSupplySticker,
  LastSpot: LastSpotSticker,
  SurvivorApproved: SurvivorApprovedSticker,
};
