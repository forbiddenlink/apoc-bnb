"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export function AnimatedHeroBackground() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Slow-moving radial gradient */}
            <motion.div
                className="absolute inset-0"
                animate={{
                    background: [
                        "radial-gradient(circle at 30% 20%, rgba(57, 255, 20, 0.08) 0%, transparent 50%)",
                        "radial-gradient(circle at 70% 60%, rgba(57, 255, 20, 0.08) 0%, transparent 50%)",
                        "radial-gradient(circle at 40% 80%, rgba(57, 255, 20, 0.08) 0%, transparent 50%)",
                        "radial-gradient(circle at 30% 20%, rgba(57, 255, 20, 0.08) 0%, transparent 50%)",
                    ],
                }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />

            {/* Secondary gold gradient */}
            <motion.div
                className="absolute inset-0"
                animate={{
                    background: [
                        "radial-gradient(circle at 80% 80%, rgba(212, 175, 55, 0.05) 0%, transparent 40%)",
                        "radial-gradient(circle at 20% 40%, rgba(212, 175, 55, 0.05) 0%, transparent 40%)",
                        "radial-gradient(circle at 60% 20%, rgba(212, 175, 55, 0.05) 0%, transparent 40%)",
                        "radial-gradient(circle at 80% 80%, rgba(212, 175, 55, 0.05) 0%, transparent 40%)",
                    ],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />

            {/* Grid pulse effect */}
            <RadarPulse />

            {/* Floating particles */}
            <FloatingParticles />
        </div>
    );
}

function RadarPulse() {
    return (
        <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
                className="absolute w-[200vw] h-[200vw] border border-primary/5 rounded-full"
                initial={{ scale: 0, opacity: 0.3 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear",
                    repeatDelay: 0,
                }}
            />
            <motion.div
                className="absolute w-[200vw] h-[200vw] border border-primary/5 rounded-full"
                initial={{ scale: 0, opacity: 0.3 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 5,
                }}
            />
        </div>
    );
}

function FloatingParticles() {
    const particles = Array.from({ length: 6 }, (_, i) => ({
        id: i,
        initialX: Math.random() * 100,
        initialY: Math.random() * 100,
        size: 2 + Math.random() * 3,
        duration: 15 + Math.random() * 20,
        delay: Math.random() * 10,
    }));

    return (
        <>
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="absolute rounded-full bg-primary/30"
                    style={{
                        width: particle.size,
                        height: particle.size,
                        left: `${particle.initialX}%`,
                        top: `${particle.initialY}%`,
                        filter: "blur(1px)",
                    }}
                    animate={{
                        x: [0, 100, -50, 0],
                        y: [0, -100, -200, -300],
                        opacity: [0, 0.6, 0.4, 0],
                    }}
                    transition={{
                        duration: particle.duration,
                        repeat: Infinity,
                        delay: particle.delay,
                        ease: "linear",
                    }}
                />
            ))}
        </>
    );
}

export function ScrollIndicator() {
    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
            <span className="text-[10px] font-mono text-muted-foreground/60 uppercase tracking-[0.2em]">
                Scroll to explore
            </span>
            <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-5 h-8 border border-muted-foreground/30 rounded-full flex justify-center pt-1.5"
            >
                <motion.div
                    animate={{ opacity: [1, 0.3, 1], y: [0, 6, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="w-1 h-2 bg-primary rounded-full"
                />
            </motion.div>
        </motion.div>
    );
}
