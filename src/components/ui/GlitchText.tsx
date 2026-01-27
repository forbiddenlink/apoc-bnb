"use client";
import { motion } from "framer-motion";

export function GlitchText({ text, className }: { text: string; className?: string }) {
    return (
        <div className={`relative inline-block ${className}`}>
            <motion.span
                className="relative z-10"
                animate={{
                    x: [0, -2, 2, -1, 1, 0],
                    y: [0, 1, -1, 0],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "mirror",
                    times: [0, 0.1, 0.2, 0.3, 0.4, 1]
                }}
            >
                {text}
            </motion.span>
            <span className="absolute top-0 left-0 -z-10 text-primary opacity-50 translate-x-[2px] animate-pulse">
                {text}
            </span>
            <span className="absolute top-0 left-0 -z-10 text-accent opacity-50 -translate-x-[2px] animate-pulse delay-75">
                {text}
            </span>
        </div>
    );
}
