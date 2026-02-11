"use client";

import { useCallback, useRef } from "react";

type SoundType = "click" | "hover" | "success" | "error" | "geiger" | "radiation";

// Audio context singleton
let audioContext: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
  }
  return audioContext;
}

// Generate synthetic sounds using Web Audio API
function playSound(type: SoundType, volume: number = 0.3) {
  const ctx = getAudioContext();
  if (!ctx) return;

  // Resume context if suspended (browser autoplay policy)
  if (ctx.state === "suspended") {
    ctx.resume();
  }

  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  const now = ctx.currentTime;

  switch (type) {
    case "click":
      // Short, crisp click
      oscillator.type = "square";
      oscillator.frequency.setValueAtTime(800, now);
      oscillator.frequency.exponentialRampToValueAtTime(200, now + 0.05);
      gainNode.gain.setValueAtTime(volume * 0.5, now);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      oscillator.start(now);
      oscillator.stop(now + 0.05);
      break;

    case "hover":
      // Subtle tick
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(1200, now);
      gainNode.gain.setValueAtTime(volume * 0.2, now);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.02);
      oscillator.start(now);
      oscillator.stop(now + 0.02);
      break;

    case "success":
      // Ascending tone
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(400, now);
      oscillator.frequency.exponentialRampToValueAtTime(800, now + 0.15);
      gainNode.gain.setValueAtTime(volume * 0.4, now);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      oscillator.start(now);
      oscillator.stop(now + 0.2);
      break;

    case "error":
      // Descending buzzy tone
      oscillator.type = "sawtooth";
      oscillator.frequency.setValueAtTime(400, now);
      oscillator.frequency.exponentialRampToValueAtTime(150, now + 0.2);
      gainNode.gain.setValueAtTime(volume * 0.3, now);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      oscillator.start(now);
      oscillator.stop(now + 0.2);
      break;

    case "geiger":
      // Classic geiger counter click
      oscillator.type = "square";
      oscillator.frequency.setValueAtTime(2000, now);
      gainNode.gain.setValueAtTime(volume * 0.4, now);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.01);
      oscillator.start(now);
      oscillator.stop(now + 0.01);
      break;

    case "radiation":
      // Ominous low hum pulse
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(80, now);
      oscillator.frequency.setValueAtTime(60, now + 0.1);
      gainNode.gain.setValueAtTime(volume * 0.2, now);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      oscillator.start(now);
      oscillator.stop(now + 0.3);
      break;
  }
}

interface UseSoundEffectsOptions {
  enabled?: boolean;
  volume?: number;
}

export function useSoundEffects(options: UseSoundEffectsOptions = {}) {
  const { enabled = true, volume = 0.3 } = options;
  const lastGeigerTime = useRef(0);

  const play = useCallback(
    (type: SoundType) => {
      if (!enabled) return;
      playSound(type, volume);
    },
    [enabled, volume]
  );

  // Geiger counter effect - plays clicks at random intervals based on radiation level
  const playGeigerBurst = useCallback(
    (radLevel: number) => {
      if (!enabled || radLevel <= 0) return;

      const now = Date.now();
      // Throttle to max 10 clicks per second
      if (now - lastGeigerTime.current < 100) return;
      lastGeigerTime.current = now;

      // More radiation = more clicks
      const clickCount = Math.min(Math.floor(radLevel / 2) + 1, 5);
      for (let i = 0; i < clickCount; i++) {
        setTimeout(() => playSound("geiger", volume * 0.5), i * 50 + Math.random() * 30);
      }
    },
    [enabled, volume]
  );

  return {
    play,
    playClick: () => play("click"),
    playHover: () => play("hover"),
    playSuccess: () => play("success"),
    playError: () => play("error"),
    playGeiger: () => play("geiger"),
    playRadiation: () => play("radiation"),
    playGeigerBurst,
  };
}
