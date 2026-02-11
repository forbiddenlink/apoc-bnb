"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Terminal as TerminalIcon } from "lucide-react";

interface SecretTerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SecretTerminal({ isOpen, onClose }: SecretTerminalProps) {
  const [text, setText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  const fullText = `ROBCO INDUSTRIES UNIFIED OPERATING SYSTEM
COPYRIGHT 2075-2077 ROBCO INDUSTRIES
-DEVELOPER ACCESS GRANTED-

> CONGRATULATIONS, VAULT DWELLER!

You've discovered the secret developer terminal.
Your survival instincts are top-tier.

ACHIEVEMENT UNLOCKED: Code Breaker
REWARD: +100 CAPS (digital only, unfortunately)
SPECIAL PERK: "Eagle Eye" - You notice things others miss

Fun fact: The Konami Code was originally created
to make testing games easier. Now it's an Easter
egg tradition. Just like questioning authority
and hoarding bottle caps.

Stay vigilant, wastelander.

- The APOC-BNB Development Team

[Press ESC or click X to close]`;

  useEffect(() => {
    if (!isOpen) {
      setText("");
      return;
    }

    let index = 0;
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 20); // Typewriter speed

    return () => clearInterval(interval);
  }, [isOpen, fullText]);

  useEffect(() => {
    if (!isOpen) return;
    
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 20 }}
            className="relative w-full max-w-3xl max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Terminal Window */}
            <div className="bg-black border-2 border-secondary/50 rounded-lg shadow-2xl shadow-secondary/20">
              {/* Terminal Header */}
              <div className="flex items-center justify-between px-4 py-2 border-b border-secondary/30 bg-secondary/10">
                <div className="flex items-center gap-2">
                  <TerminalIcon className="h-4 w-4 text-secondary" />
                  <span className="text-sm font-mono text-secondary">SECRET_TERMINAL.exe</span>
                </div>
                <button
                  onClick={onClose}
                  className="text-secondary hover:text-secondary/80 transition-colors"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Terminal Content */}
              <div className="p-6 font-mono text-sm leading-relaxed">
                <pre className="text-secondary whitespace-pre-wrap">
                  {text}
                  {showCursor && text.length < fullText.length && (
                    <span className="inline-block w-2 h-4 bg-secondary animate-pulse ml-0.5" />
                  )}
                </pre>
              </div>

              {/* CRT Effect */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-secondary/5 to-transparent animate-pulse" />
              <div
                className="pointer-events-none absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `repeating-linear-gradient(
                    0deg,
                    rgba(0, 255, 0, 0.15),
                    rgba(0, 255, 0, 0.15) 1px,
                    transparent 1px,
                    transparent 2px
                  )`,
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
