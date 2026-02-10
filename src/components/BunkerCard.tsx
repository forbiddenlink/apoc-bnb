"use client";

import Link from "next/link";
import { Star, MapPin } from "lucide-react";
import { Bunker } from "@/types";
import { FavoriteButton } from "@/components/ui/FavoriteButton";
import { motion } from "framer-motion";

interface BunkerCardProps {
  bunker: Bunker;
  index?: number;
  variant?: "default" | "dotted" | "hazard" | "featured";
  size?: "sm" | "md" | "lg" | "tall";
}

export function BunkerCard({ bunker, index = 0, variant = "default", size }: BunkerCardProps) {
  const variantClasses = {
    default: "containment-card",
    dotted: "containment-card-dotted",
    hazard: "containment-card-hazard",
    featured: "containment-active",
  };

  const sizeClasses = {
    sm: "bento-sm",
    md: "bento-md",
    lg: "bento-lg",
    tall: "bento-tall",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={size ? sizeClasses[size] : ""}
    >
      <Link href={`/bunkers/${bunker.id}`}>
        <div className={`group relative overflow-hidden cursor-pointer h-full flex flex-col ${variantClasses[variant]}`}>
          {/* Image */}
          <div className="aspect-[4/3] bg-muted relative overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
              style={{ backgroundImage: `url(${bunker.images[0]})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />

            {/* Rad Level Badge */}
            <div className="absolute top-3 left-3 z-20 bg-black/50 backdrop-blur border border-primary/30 text-primary text-xs font-bold px-2 py-1 rounded uppercase">
              {bunker.features.radLevel <= 2
                ? `${100 - bunker.features.radLevel * 5}% Radiation Free`
                : `Rad Level: ${bunker.features.radLevel}`}
            </div>

            {/* Favorite Button */}
            <div className="absolute top-3 right-3 z-20">
              <FavoriteButton bunkerId={bunker.id} size="sm" />
            </div>

            {/* Tags */}
            {bunker.tags.length > 0 && (
              <div className="absolute bottom-3 left-3 z-20 flex gap-1 flex-wrap">
                {bunker.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="bg-secondary/90 text-black text-xs font-bold px-2 py-0.5 rounded uppercase"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-4 flex-1 flex flex-col">
            {/* Location */}
            <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
              <MapPin className="h-3 w-3" />
              <span>{bunker.location.name} • {bunker.location.region}</span>
            </div>

            {/* Title & Rating */}
            <div className="flex justify-between items-start mb-2 gap-2">
              <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors line-clamp-2 flex-1">
                {bunker.title}
              </h3>
              <div className="flex items-center gap-1 text-sm font-bold flex-shrink-0">
                <Star className="h-4 w-4 text-secondary fill-secondary" />
                <span>{bunker.rating.toFixed(2)}</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-muted-foreground text-sm mb-4 line-clamp-2 flex-1">
              {bunker.description}
            </p>

            {/* Host Badge */}
            {bunker.host.isSuperhost && (
              <div className="text-xs text-primary font-bold mb-3 flex items-center gap-1">
                <span className="inline-block h-2 w-2 bg-primary rounded-full animate-pulse" />
                SUPERHOST
              </div>
            )}

            {/* Price */}
            <div className="flex items-baseline gap-1 mt-auto">
              <span className="font-black text-xl text-secondary">{bunker.price.caps} CAPS</span>
              <span className="text-muted-foreground text-xs">/ night</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
