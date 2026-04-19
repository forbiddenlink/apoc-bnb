"use client";

import { motion, Variants } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";

interface PageTransitionProps {
    children: ReactNode;
    className?: string;
}

const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

function usePrefersReducedMotion(): boolean {
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    useEffect(() => {
        const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
        setPrefersReducedMotion(mql.matches);

        const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
        mql.addEventListener("change", handler);
        return () => mql.removeEventListener("change", handler);
    }, []);

    return prefersReducedMotion;
}

const pageVariants: Variants = {
    initial: {
        opacity: 0,
        y: 20,
    },
    enter: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
            ease: easeOutExpo,
            when: "beforeChildren",
            staggerChildren: 0.1,
        },
    },
    exit: {
        opacity: 0,
        transition: {
            duration: 0.2,
        },
    },
};

const reducedMotionPageVariants: Variants = {
    initial: { opacity: 1, y: 0 },
    enter: { opacity: 1, y: 0, transition: { duration: 0 } },
    exit: { opacity: 1, transition: { duration: 0 } },
};

const childVariants: Variants = {
    initial: {
        opacity: 0,
        y: 20,
    },
    enter: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
            ease: easeOutExpo,
        },
    },
};

const reducedMotionChildVariants: Variants = {
    initial: { opacity: 1, y: 0 },
    enter: { opacity: 1, y: 0, transition: { duration: 0 } },
};

export function PageTransition({ children, className }: PageTransitionProps) {
    const prefersReducedMotion = usePrefersReducedMotion();

    return (
        <motion.div
            initial="initial"
            animate="enter"
            exit="exit"
            variants={prefersReducedMotion ? reducedMotionPageVariants : pageVariants}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export function StaggerChild({ children, className }: PageTransitionProps) {
    const prefersReducedMotion = usePrefersReducedMotion();

    return (
        <motion.div variants={prefersReducedMotion ? reducedMotionChildVariants : childVariants} className={className}>
            {children}
        </motion.div>
    );
}

// For scroll-triggered animations
export function ScrollReveal({
    children,
    className,
    delay = 0,
}: PageTransitionProps & { delay?: number }) {
    const prefersReducedMotion = usePrefersReducedMotion();

    return (
        <motion.div
            initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
                duration: prefersReducedMotion ? 0 : 0.5,
                delay: prefersReducedMotion ? 0 : delay,
                ease: easeOutExpo,
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// For staggered grid items
export function StaggerGrid({
    children,
    className,
    staggerDelay = 0.08,
}: PageTransitionProps & { staggerDelay?: number }) {
    const prefersReducedMotion = usePrefersReducedMotion();

    return (
        <motion.div
            initial="initial"
            whileInView="enter"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
                initial: {},
                enter: {
                    transition: {
                        staggerChildren: prefersReducedMotion ? 0 : staggerDelay,
                    },
                },
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export function StaggerItem({ children, className }: PageTransitionProps) {
    const prefersReducedMotion = usePrefersReducedMotion();

    return (
        <motion.div
            variants={prefersReducedMotion ? {
                initial: { opacity: 1, y: 0 },
                enter: { opacity: 1, y: 0, transition: { duration: 0 } },
            } : {
                initial: { opacity: 0, y: 20 },
                enter: {
                    opacity: 1,
                    y: 0,
                    transition: {
                        duration: 0.4,
                        ease: easeOutExpo,
                    },
                },
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
