"use client";

import { useEffect, useState } from "react";

const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "KeyB",
  "KeyA",
];

export function useKonamiCode(callback: () => void) {
  const [keys, setKeys] = useState<string[]>([]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      setKeys((prevKeys) => {
        const newKeys = [...prevKeys, event.code];
        
        // Keep only the last 10 keys
        if (newKeys.length > KONAMI_CODE.length) {
          newKeys.shift();
        }

        // Check if the sequence matches
        if (
          newKeys.length === KONAMI_CODE.length &&
          newKeys.every((key, index) => key === KONAMI_CODE[index])
        ) {
          callback();
          return []; // Reset after successful match
        }

        return newKeys;
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [callback]);
}
