"use client";

import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

interface HostAvatarProps {
  name: string;
  isSuperhost?: boolean;
  avatar?: string;
  size?: "sm" | "md" | "lg" | "xl";
  showBadge?: boolean;
}

const sizeClasses = {
  sm: "h-10 w-10 text-sm",
  md: "h-16 w-16 text-2xl",
  lg: "h-24 w-24 text-4xl",
  xl: "h-32 w-32 text-5xl",
};

const badgeSizes = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
  xl: "h-8 w-8",
};

export function HostAvatar({ 
  name, 
  isSuperhost = false, 
  avatar, 
  size = "md",
  showBadge = true 
}: HostAvatarProps) {
  const [imageError, setImageError] = useState(false);
  
  // Generate initials from name
  const initials = name
    .split(" ")
    .map(word => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  // Generate consistent color based on name
  const getColor = (str: string) => {
    const colors = [
      "from-primary/20 to-primary/40 text-primary",
      "from-secondary/20 to-secondary/40 text-secondary",
      "from-accent/20 to-accent/40 text-accent",
      "from-blue-500/20 to-blue-600/40 text-blue-300",
      "from-purple-500/20 to-purple-600/40 text-purple-300",
      "from-green-500/20 to-green-600/40 text-green-300",
    ];
    const hash = str.split('').reduce((acc, char) => {
      return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);
    return colors[Math.abs(hash) % colors.length];
  };

  const colorClass = getColor(name);

  return (
    <div className="relative inline-block">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`${sizeClasses[size]} rounded-full overflow-hidden relative group cursor-pointer border-2 ${
          isSuperhost ? "border-primary" : "border-border"
        }`}
      >
        {avatar && !imageError ? (
          <img
            src={avatar}
            alt={name}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${colorClass} font-mono font-bold transition-transform group-hover:scale-110`}>
            {initials}
          </div>
        )}
        
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
      </motion.div>

      {/* Superhost Badge */}
      {isSuperhost && showBadge && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="absolute -bottom-1 -right-1 bg-primary rounded-full p-1 border-2 border-background shadow-lg"
        >
          <ShieldCheck className={badgeSizes[size]} />
        </motion.div>
      )}
    </div>
  );
}
