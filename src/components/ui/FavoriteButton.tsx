"use client";

import { useState, useRef, useCallback } from "react";
import { Heart } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { motion } from "framer-motion";

interface FavoriteButtonProps {
  bunkerId: string;
  size?: "sm" | "md" | "lg";
  showCount?: boolean;
}

export function FavoriteButton({ bunkerId, size = "md", showCount = false }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite, favorites } = useAppStore();
  const favorite = isFavorite(bunkerId);
  const [isProcessing, setIsProcessing] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const handleToggle = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Prevent rapid clicks
    if (isProcessing) return;

    // Clear any pending debounce
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    setIsProcessing(true);
    toggleFavorite(bunkerId);

    // Reset processing state after short delay
    debounceRef.current = setTimeout(() => {
      setIsProcessing(false);
    }, 300);
  }, [bunkerId, isProcessing, toggleFavorite]);

  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  };

  const iconSizes = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.05 }}
      onClick={handleToggle}
      className={`${sizeClasses[size]} rounded-full flex items-center justify-center transition-all ${
        favorite
          ? "bg-accent text-white shadow-[0_0_15px_rgba(255,0,60,0.5)]"
          : "bg-background/80 backdrop-blur text-muted-foreground hover:text-accent hover:bg-background border border-border"
      }`}
      aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
    >
      <Heart className={`${iconSizes[size]} ${favorite ? "fill-current" : ""}`} />
      {showCount && favorites.length > 0 && (
        <span className="absolute -top-1 -right-1 bg-primary text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
          {favorites.length}
        </span>
      )}
    </motion.button>
  );
}
