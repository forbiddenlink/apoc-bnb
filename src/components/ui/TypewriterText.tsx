"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface TypewriterTextProps {
    text: string;
    className?: string;
    speed?: number;
    delay?: number;
    showCursor?: boolean;
    onComplete?: () => void;
}

export function TypewriterText({
    text,
    className,
    speed = 40,
    delay = 0,
    showCursor = true,
    onComplete,
}: TypewriterTextProps) {
    const [displayedText, setDisplayedText] = useState("");
    const [isComplete, setIsComplete] = useState(false);
    const [showCursorState, setShowCursorState] = useState(true);
    const onCompleteRef = useRef(onComplete);
    onCompleteRef.current = onComplete;

    useEffect(() => {
        let intervalId: ReturnType<typeof setInterval> | undefined;
        const timeout = setTimeout(() => {
            let currentIndex = 0;
            intervalId = setInterval(() => {
                if (currentIndex <= text.length) {
                    setDisplayedText(text.slice(0, currentIndex));
                    currentIndex++;
                } else {
                    if (intervalId) clearInterval(intervalId);
                    setIsComplete(true);
                    onCompleteRef.current?.();

                    if (showCursor) {
                        setTimeout(() => {
                            setShowCursorState(false);
                        }, 1500);
                    }
                }
            }, speed);
        }, delay);

        return () => {
            clearTimeout(timeout);
            if (intervalId) clearInterval(intervalId);
        };
    }, [text, speed, delay, showCursor]);

    return (
        <span className={cn("relative inline", className)}>
            {displayedText}
            <AnimatePresence>
                {showCursor && showCursorState && (
                    <motion.span
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={cn(
                            "inline-block w-[3px] h-[1em] bg-primary ml-1 align-middle",
                            isComplete && "animate-cursor-blink"
                        )}
                    />
                )}
            </AnimatePresence>
        </span>
    );
}

interface TypewriterLineProps {
    lines: { text: string; className?: string }[];
    speed?: number;
    lineDelay?: number;
    initialDelay?: number;
}

export function TypewriterLines({
    lines,
    speed = 40,
    lineDelay = 300,
    initialDelay = 0,
}: TypewriterLineProps) {
    const [currentLine, setCurrentLine] = useState(0);
    const [completedLines, setCompletedLines] = useState<number[]>([]);

    const handleLineComplete = (index: number) => {
        setCompletedLines((prev) => [...prev, index]);
        setTimeout(() => {
            if (index < lines.length - 1) {
                setCurrentLine(index + 1);
            }
        }, lineDelay);
    };

    return (
        <>
            {lines.map((line, index) => (
                <div key={index} className={line.className}>
                    {index <= currentLine && (
                        <TypewriterText
                            text={line.text}
                            speed={speed}
                            delay={index === 0 ? initialDelay : 0}
                            showCursor={index === currentLine && !completedLines.includes(lines.length - 1)}
                            onComplete={() => handleLineComplete(index)}
                        />
                    )}
                </div>
            ))}
        </>
    );
}
