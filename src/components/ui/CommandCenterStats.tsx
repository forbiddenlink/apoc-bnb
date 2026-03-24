"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Radiation, ShieldAlert, Users, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

interface AnimatedCounterProps {
    value: number;
    suffix?: string;
    prefix?: string;
    duration?: number;
    decimals?: number;
}

function AnimatedCounter({
    value,
    suffix = "",
    prefix = "",
    duration = 1500,
    decimals = 0,
}: AnimatedCounterProps) {
    const [displayValue, setDisplayValue] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        if (!isInView) return;

        const startTime = Date.now();
        const startValue = 0;

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = startValue + (value - startValue) * easeOut;

            setDisplayValue(current);

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                setDisplayValue(value);
            }
        };

        requestAnimationFrame(animate);
    }, [isInView, value, duration]);

    const formattedValue =
        decimals > 0
            ? displayValue.toFixed(decimals)
            : Math.round(displayValue).toLocaleString();

    return (
        <span ref={ref} className="tabular-nums">
            {prefix}
            {formattedValue}
            {suffix}
        </span>
    );
}

const stats = [
    {
        value: 2847,
        label: "ACTIVE BUNKERS",
        icon: Radiation,
        color: "text-primary",
        bgColor: "bg-primary/10",
        borderColor: "border-primary/30",
    },
    {
        value: 99.9,
        suffix: "%",
        decimals: 1,
        label: "SURVIVAL RATE",
        icon: ShieldAlert,
        color: "text-secondary",
        bgColor: "bg-secondary/10",
        borderColor: "border-secondary/30",
    },
    {
        value: 12500,
        label: "SURVIVORS HOUSED",
        icon: Users,
        color: "text-white",
        bgColor: "bg-white/5",
        borderColor: "border-white/10",
    },
    {
        value: 0,
        label: "BREACH INCIDENTS",
        icon: Activity,
        color: "text-accent",
        bgColor: "bg-accent/10",
        borderColor: "border-accent/30",
    },
];

export function CommandCenterStats() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section
            ref={ref}
            className="relative py-16 md:py-20 border-y border-white/5 bg-black/80 backdrop-blur-md overflow-hidden"
        >
            {/* Scan line effect */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
            >
                <motion.div
                    className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
                    animate={{
                        top: ["-10%", "110%"],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />
            </motion.div>

            {/* Subtle hazard pattern */}
            <div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                    backgroundImage: `repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 10px,
            rgba(212, 175, 55, 1) 10px,
            rgba(212, 175, 55, 1) 20px
          )`,
                }}
            />

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="flex items-center justify-center gap-3 mb-10"
                >
                    <div className="h-px flex-1 max-w-[100px] bg-gradient-to-r from-transparent to-primary/30" />
                    <span className="text-label text-muted-foreground flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                        </span>
                        COMMAND CENTER STATUS
                    </span>
                    <div className="h-px flex-1 max-w-[100px] bg-gradient-to-l from-transparent to-primary/30" />
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className={cn(
                                "relative p-6 md:p-8 border rounded-sm",
                                "bg-black/40 backdrop-blur-sm",
                                stat.borderColor,
                                "group hover:border-opacity-60 transition-all duration-300"
                            )}
                        >
                            {/* Corner accents */}
                            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-primary/30 -translate-x-px -translate-y-px" />
                            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-primary/30 translate-x-px -translate-y-px" />
                            <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-primary/30 -translate-x-px translate-y-px" />
                            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-primary/30 translate-x-px translate-y-px" />

                            {/* Icon */}
                            <div
                                className={cn(
                                    "inline-flex items-center justify-center w-10 h-10 rounded-sm mb-4",
                                    stat.bgColor,
                                    "border",
                                    stat.borderColor
                                )}
                            >
                                <stat.icon
                                    className={cn(
                                        "h-5 w-5",
                                        stat.color,
                                        "animate-pulse"
                                    )}
                                />
                            </div>

                            {/* Value */}
                            <div
                                className={cn(
                                    "text-3xl md:text-4xl lg:text-5xl font-light tracking-tight mb-2",
                                    stat.color
                                )}
                            >
                                <AnimatedCounter
                                    value={stat.value}
                                    suffix={stat.suffix}
                                    decimals={stat.decimals}
                                />
                            </div>

                            {/* Label */}
                            <div className="text-[10px] md:text-xs text-muted-foreground font-mono uppercase tracking-[0.15em]">
                                {stat.label}
                            </div>

                            {/* Glow effect on hover */}
                            <div
                                className={cn(
                                    "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-sm",
                                    stat.value === 0
                                        ? "shadow-[inset_0_0_30px_rgba(255,0,60,0.1)]"
                                        : "shadow-[inset_0_0_30px_rgba(57,255,20,0.05)]"
                                )}
                            />
                        </motion.div>
                    ))}
                </div>

                {/* Bottom status line */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.6 }}
                    className="mt-8 flex items-center justify-center gap-4 text-[10px] font-mono text-muted-foreground/50"
                >
                    <span>SYS.METRICS.v2.4.1</span>
                    <span className="text-primary/30">|</span>
                    <span>REAL-TIME SYNC ENABLED</span>
                    <span className="text-primary/30">|</span>
                    <span>LAST UPDATE: NOW</span>
                </motion.div>
            </div>
        </section>
    );
}
