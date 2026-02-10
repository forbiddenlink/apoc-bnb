"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Modal } from "./Modal";
import { Keyboard, Skull, Radiation, AlertTriangle } from "lucide-react";

const shortcuts = [
  { keys: ["?"], description: "Show keyboard shortcuts" },
  { keys: ["H"], description: "Go to Home" },
  { keys: ["S"], description: "Go to Search" },
  { keys: ["E"], description: "Go to Experiences" },
  { keys: ["F"], description: "Go to Favorites" },
  { keys: ["Esc"], description: "Close modals" },
];

// Konami Code: Up Up Down Down Left Right Left Right B A
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

const SECRET_MESSAGES = [
  "VAULT-TEC EMERGENCY BROADCAST: You have unlocked... nothing. Just kidding. You're special now.",
  "CLASSIFIED: The scratching in the walls? It's friendly. Mostly.",
  "DECLASSIFIED: There IS a Sub-Level 7. We lied. Don't go there.",
  "WARNING: Your optimism levels have been detected. Please report for recalibration.",
  "ALERT: You've discovered the secret. The secret is that there is no secret. Or is there?",
  "NOTICE: Congratulations, survivor. You've wasted valuable apocalypse time on a cheat code.",
  "TRANSMISSION RECEIVED: The beans are not what they seem. Trust no one. Especially Willie.",
  "INTERCEPTED MESSAGE: Captain Cosmos knows you're looking at Earth. He's disappointed.",
  "PROTOCOL OMEGA ACTIVATED: Just kidding. Unless...?",
  "SYSTEM MESSAGE: You have been awarded 0 bonus caps. Survival is its own reward.",
];

export function KeyboardShortcuts() {
  const [showHelp, setShowHelp] = useState(false);
  const [konamiIndex, setKonamiIndex] = useState(0);
  const [showSecret, setShowSecret] = useState(false);
  const [secretMessage, setSecretMessage] = useState("");
  const [glitchMode, setGlitchMode] = useState(false);
  const router = useRouter();

  const activateSecretMode = useCallback(() => {
    const randomMessage = SECRET_MESSAGES[Math.floor(Math.random() * SECRET_MESSAGES.length)];
    setSecretMessage(randomMessage);
    setShowSecret(true);
    setGlitchMode(true);

    // Add glitch effect to body
    document.body.classList.add("konami-glitch");

    // Remove glitch after animation
    setTimeout(() => {
      setGlitchMode(false);
      document.body.classList.remove("konami-glitch");
    }, 2000);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      // Check for Konami Code
      const key = e.code;
      if (key === KONAMI_CODE[konamiIndex]) {
        const newIndex = konamiIndex + 1;
        setKonamiIndex(newIndex);

        if (newIndex === KONAMI_CODE.length) {
          activateSecretMode();
          setKonamiIndex(0);
        }
      } else if (key === KONAMI_CODE[0]) {
        setKonamiIndex(1);
      } else {
        setKonamiIndex(0);
      }

      switch (e.key.toLowerCase()) {
        case "?":
          setShowHelp((prev) => !prev);
          break;
        case "h":
          router.push("/");
          break;
        case "s":
          router.push("/search");
          break;
        case "e":
          router.push("/experiences");
          break;
        case "f":
          router.push("/favorites");
          break;
        case "escape":
          setShowHelp(false);
          setShowSecret(false);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router, konamiIndex, activateSecretMode]);

  return (
    <>
      {/* Floating help button */}
      <button
        onClick={() => setShowHelp(true)}
        className="fixed bottom-20 left-4 z-40 p-2 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors group"
        title="Keyboard shortcuts (?)"
      >
        <Keyboard className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
      </button>

      <Modal isOpen={showHelp} onClose={() => setShowHelp(false)} title="Keyboard Shortcuts" size="sm">
        <div className="space-y-3">
          {shortcuts.map((shortcut) => (
            <div
              key={shortcut.keys.join("+")}
              className="flex items-center justify-between py-2 border-b border-border last:border-0"
            >
              <span className="text-muted-foreground">{shortcut.description}</span>
              <div className="flex gap-1">
                {shortcut.keys.map((key) => (
                  <kbd
                    key={key}
                    className="px-2 py-1 text-xs font-mono bg-muted rounded border border-border text-foreground"
                  >
                    {key}
                  </kbd>
                ))}
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-4 text-center">
          Press <kbd className="px-1 py-0.5 text-xs bg-muted rounded border border-border">?</kbd> anytime to toggle this menu
        </p>
      </Modal>

      {/* Secret Konami Code Modal */}
      <Modal
        isOpen={showSecret}
        onClose={() => setShowSecret(false)}
        title=""
        size="md"
      >
        <div className={`text-center space-y-6 py-4 ${glitchMode ? "animate-pulse" : ""}`}>
          <div className="flex justify-center gap-4">
            <Radiation className="h-12 w-12 text-warning animate-spin" style={{ animationDuration: "3s" }} />
            <Skull className="h-12 w-12 text-danger animate-bounce" />
            <AlertTriangle className="h-12 w-12 text-warning animate-ping" style={{ animationDuration: "2s" }} />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-primary font-mono tracking-wider">
              [CLASSIFIED TRANSMISSION]
            </h2>
            <div className="h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
          </div>

          <p className="text-lg text-foreground font-mono leading-relaxed px-4">
            {secretMessage}
          </p>

          <div className="space-y-2 pt-4">
            <p className="text-xs text-muted-foreground font-mono">
              KONAMI PROTOCOL EXECUTED SUCCESSFULLY
            </p>
            <p className="text-xs text-muted-foreground/60 font-mono">
              This message will self-destruct when you close it. Maybe.
            </p>
          </div>

          <button
            onClick={() => setShowSecret(false)}
            className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-mono hover:bg-primary/90 transition-colors"
          >
            [ACKNOWLEDGE AND FORGET]
          </button>
        </div>
      </Modal>

      {/* Glitch effect styles */}
      <style jsx global>{`
        .konami-glitch {
          animation: glitch 0.3s ease-in-out infinite;
        }

        @keyframes glitch {
          0%, 100% {
            filter: none;
          }
          25% {
            filter: hue-rotate(90deg) saturate(1.5);
          }
          50% {
            filter: hue-rotate(180deg) contrast(1.2);
          }
          75% {
            filter: hue-rotate(270deg) brightness(1.1);
          }
        }
      `}</style>
    </>
  );
}
