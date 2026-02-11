"use client";

import { motion } from "framer-motion";
import { Shield, Zap, Skull, Heart, Brain, Flame } from "lucide-react";

interface HostQuirkBadgeProps {
  quirk: "military" | "obsessive" | "dangerous" | "caring" | "eccentric" | "intense";
  label: string;
  size?: "sm" | "md" | "lg";
}

const quirkConfig = {
  military: {
    icon: Shield,
    color: "text-green-500",
    bg: "bg-green-500/10",
    border: "border-green-500/30",
    animation: { scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] },
  },
  obsessive: {
    icon: Brain,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
    animation: { scale: [1, 1.2, 1] },
  },
  dangerous: {
    icon: Skull,
    color: "text-red-500",
    bg: "bg-red-500/10",
    border: "border-red-500/30",
    animation: { rotate: [0, 10, -10, 0] },
  },
  caring: {
    icon: Heart,
    color: "text-pink-500",
    bg: "bg-pink-500/10",
    border: "border-pink-500/30",
    animation: { scale: [1, 1.15, 1] },
  },
  eccentric: {
    icon: Zap,
    color: "text-yellow-500",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/30",
    animation: { rotate: [0, 360] },
  },
  intense: {
    icon: Flame,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
    border: "border-orange-500/30",
    animation: { scale: [1, 1.3, 1], rotate: [0, 5, -5, 0] },
  },
};

const sizeConfig = {
  sm: "text-xs px-2 py-1",
  md: "text-sm px-3 py-1.5",
  lg: "text-base px-4 py-2",
};

export function HostQuirkBadge({ quirk, label, size = "md" }: HostQuirkBadgeProps) {
  const config = quirkConfig[quirk];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3, type: "spring" }}
      className={`inline-flex items-center gap-2 rounded-full border ${config.bg} ${config.border} ${sizeConfig[size]} font-bold uppercase tracking-wide ${config.color}`}
    >
      <motion.div
        animate={config.animation}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: "easeInOut",
        }}
      >
        <Icon className="h-4 w-4" />
      </motion.div>
      <span>{label}</span>
    </motion.div>
  );
}
