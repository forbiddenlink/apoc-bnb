"use client";

import { motion } from "framer-motion";

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
