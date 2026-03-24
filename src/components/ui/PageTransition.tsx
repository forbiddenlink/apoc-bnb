"use client";

import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

interface PageTransitionProps {
    children: ReactNode;
    className?: string;
}

const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

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

export function PageTransition({ children, className }: PageTransitionProps) {
    return (
        <motion.div
            initial="initial"
            animate="enter"
            exit="exit"
            variants={pageVariants}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export function StaggerChild({ children, className }: PageTransitionProps) {
    return (
        <motion.div variants={childVariants} className={className}>
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
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
                duration: 0.5,
                delay,
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
    return (
        <motion.div
            initial="initial"
            whileInView="enter"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
                initial: {},
                enter: {
                    transition: {
                        staggerChildren: staggerDelay,
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
    return (
        <motion.div
            variants={{
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
