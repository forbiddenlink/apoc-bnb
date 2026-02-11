"use client";

import { useEffect, useState, useMemo } from "react";
import { Loader2 } from "lucide-react";
import { getRandomLoadingMessage } from "@/lib/data/loading-messages";

interface LoadingMessageProps {
  message?: string;
  showSpinner?: boolean;
  className?: string;
}

export function LoadingMessage({
  message,
  showSpinner = true,
  className = "",
}: LoadingMessageProps) {
  // Use lazy initializer for initial random message
  const initialMessage = useMemo(() => message || getRandomLoadingMessage(), [message]);
  const [currentMessage, setCurrentMessage] = useState(initialMessage);
  const [isFlickering, setIsFlickering] = useState(false);

  useEffect(() => {
    // If custom message provided, don't rotate
    if (message) return;

    // Rotate message every 3 seconds if no custom message
    const interval = setInterval(() => {
      setCurrentMessage(getRandomLoadingMessage());
    }, 3000);

    return () => clearInterval(interval);
  }, [message]);

  // CRT flicker effect
  useEffect(() => {
    const flickerInterval = setInterval(() => {
      setIsFlickering(true);
      setTimeout(() => setIsFlickering(false), 50);
    }, 2000);

    return () => clearInterval(flickerInterval);
  }, []);

  return (
    <div
      className={`flex flex-col items-center justify-center gap-4 min-h-[50vh] ${className}`}
    >
      {showSpinner && (
        <Loader2 className="h-12 w-12 text-secondary animate-spin" />
      )}
      <p
        className={`font-mono text-lg text-secondary transition-opacity duration-100 ${
          isFlickering ? "opacity-70" : "opacity-100"
        }`}
      >
        {currentMessage}
      </p>
      {/* CRT scanline effect */}
      <div
        className="fixed inset-0 pointer-events-none opacity-5"
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
  );
}
