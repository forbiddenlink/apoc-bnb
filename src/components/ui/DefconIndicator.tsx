"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

const DEFCON_LEVELS = [
    {
        level: 1,
        label: "NUCLEAR WAR",
        description: "Maximum readiness. Hostile forces detected. Seek shelter immediately.",
        color: "bg-red-500",
        textColor: "text-red-500",
        glowColor: "shadow-[0_0_10px_rgba(239,68,68,0.5)]",
    },
    {
        level: 2,
        label: "IMMINENT THREAT",
        description: "Next step to nuclear war. Armed forces ready to deploy in 6 hours.",
        color: "bg-orange-500",
        textColor: "text-orange-500",
        glowColor: "shadow-[0_0_10px_rgba(249,115,22,0.5)]",
    },
    {
        level: 3,
        label: "ELEVATED ALERT",
        description: "Air Force ready to mobilize in 15 minutes. Stay vigilant.",
        color: "bg-yellow-500",
        textColor: "text-yellow-500",
        glowColor: "shadow-[0_0_10px_rgba(234,179,8,0.5)]",
    },
    {
        level: 4,
        label: "INCREASED READINESS",
        description: "Above normal readiness. Intelligence reports indicate elevated activity.",
        color: "bg-blue-500",
        textColor: "text-blue-500",
        glowColor: "shadow-[0_0_10px_rgba(59,130,246,0.5)]",
    },
    {
        level: 5,
        label: "NORMAL",
        description: "Lowest state of readiness. All systems nominal. Enjoy your stay.",
        color: "bg-green-500",
        textColor: "text-green-500",
        glowColor: "shadow-[0_0_10px_rgba(34,197,94,0.5)]",
    },
];

export function DefconIndicator() {
    const [defcon, setDefcon] = useState(3);
    const [isBlinking, setIsBlinking] = useState(false);
    const [isFlickering, setIsFlickering] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    const [displayLevel, setDisplayLevel] = useState(3);
    const tooltipTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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

    // Random flicker effect (environmental storytelling)
    useEffect(() => {
        const flickerInterval = setInterval(() => {
            // Small chance to flicker between levels
            if (Math.random() < 0.05 && !showTooltip) {
                setIsFlickering(true);
                // Rapidly change display level
                const flickerSequence = async () => {
                    const randomLevel = Math.floor(Math.random() * 5) + 1;
                    setDisplayLevel(randomLevel);
                    await new Promise((r) => setTimeout(r, 100));
                    setDisplayLevel(defcon);
                    await new Promise((r) => setTimeout(r, 80));
                    setDisplayLevel(randomLevel);
                    await new Promise((r) => setTimeout(r, 100));
                    setDisplayLevel(defcon);
                    setIsFlickering(false);
                };
                flickerSequence();
            }
        }, 60000); // Every 60 seconds, 5% chance

        return () => clearInterval(flickerInterval);
    }, [defcon, showTooltip]);

    // Sync display level with actual defcon
    useEffect(() => {
        if (!isFlickering) {
            setDisplayLevel(defcon);
        }
    }, [defcon, isFlickering]);

    const currentLevel = DEFCON_LEVELS.find((d) => d.level === displayLevel)!;
    const actualLevel = DEFCON_LEVELS.find((d) => d.level === defcon)!;

    const handleMouseEnter = () => {
        if (tooltipTimeoutRef.current) {
            clearTimeout(tooltipTimeoutRef.current);
        }
        setShowTooltip(true);
    };

    const handleMouseLeave = () => {
        tooltipTimeoutRef.current = setTimeout(() => {
            setShowTooltip(false);
        }, 150);
    };

    return (
        <div className="relative hidden md:block">
            <motion.div
                animate={isBlinking ? { scale: [1, 1.05, 1] } : {}}
                transition={{ duration: 0.3, repeat: isBlinking ? 3 : 0 }}
                className={cn(
                    "flex items-center gap-2 px-3 py-1.5 bg-black/50 backdrop-blur border border-border rounded-full font-mono text-xs cursor-pointer transition-all duration-200",
                    showTooltip && "border-primary/30",
                    isFlickering && "opacity-80"
                )}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <AlertTriangle
                    className={cn(
                        "h-3 w-3 transition-colors",
                        currentLevel.textColor,
                        defcon <= 2 && "animate-pulse"
                    )}
                />
                <span className="text-muted-foreground">DEFCON</span>
                <motion.span
                    key={displayLevel}
                    initial={isFlickering ? { opacity: 0.5 } : { scale: 1.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className={cn("font-bold tabular-nums", currentLevel.textColor)}
                >
                    {displayLevel}
                </motion.span>
                <div
                    className={cn(
                        "w-2 h-2 rounded-full transition-all",
                        currentLevel.color,
                        defcon <= 2 && "animate-pulse",
                        currentLevel.glowColor
                    )}
                />
            </motion.div>

            {/* Tooltip */}
            <AnimatePresence>
                {showTooltip && (
                    <motion.div
                        initial={{ opacity: 0, y: 5, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 5, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full right-0 mt-2 z-50"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <div className="bg-black/95 backdrop-blur-xl border border-border rounded-lg p-4 w-72 shadow-2xl">
                            {/* Header */}
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-label text-muted-foreground">
                                    THREAT ASSESSMENT
                                </span>
                                <div
                                    className={cn(
                                        "w-2 h-2 rounded-full animate-breathe",
                                        actualLevel.color
                                    )}
                                />
                            </div>

                            {/* Current Status */}
                            <div className="space-y-2">
                                <div className="flex items-center gap-3">
                                    <span
                                        className={cn(
                                            "text-3xl font-black tabular-nums",
                                            actualLevel.textColor
                                        )}
                                    >
                                        {defcon}
                                    </span>
                                    <div>
                                        <div className={cn("font-bold text-sm", actualLevel.textColor)}>
                                            {actualLevel.label}
                                        </div>
                                        <div className="text-xs text-muted-foreground">
                                            Current Status
                                        </div>
                                    </div>
                                </div>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                    {actualLevel.description}
                                </p>
                            </div>

                            {/* Level Bar */}
                            <div className="mt-4 flex gap-1">
                                {DEFCON_LEVELS.map((level) => (
                                    <div
                                        key={level.level}
                                        className={cn(
                                            "flex-1 h-1.5 rounded-full transition-all",
                                            level.level <= defcon
                                                ? level.color
                                                : "bg-muted/30",
                                            level.level === defcon && level.glowColor
                                        )}
                                    />
                                ))}
                            </div>

                            {/* Timestamp */}
                            <div className="mt-3 pt-3 border-t border-border/50 flex items-center justify-between text-[10px] text-muted-foreground/60 font-mono">
                                <span>LAST UPDATE: NOW</span>
                                <span>SYS.MONITOR.ACTIVE</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
