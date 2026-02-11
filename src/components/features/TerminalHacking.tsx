"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getRandomLogs, type ClassifiedEntry } from "@/lib/data/terminal-logs";

// Generate random words for password guessing
const WORD_LIST = [
  "POWER", "VAULT", "WORLD", "CHAOS", "BLOOD", "DEATH", "STORM",
  "FLAME", "GHOST", "EARTH", "METAL", "LIGHT", "NIGHT", "SPACE",
  "WATER", "FORCE", "SOLAR", "RADIO", "LASER", "BEAST", "CLONE",
  "ROBOT", "CYBER", "NEXUS", "OMEGA", "ALPHA", "DELTA", "GAMMA",
  "TOXIC", "VIRAL", "ZONES", "CRASH", "PULSE", "SHOCK", "BLAST"
];

const BRACKETS = ["<>", "[]", "{}", "()"];

interface TerminalWord {
  word: string;
  isBracket: boolean;
  isPassword: boolean;
  id: string;
}

export function TerminalHacking() {
  const [attempts, setAttempts] = useState(4);
  const [isHacked, setIsHacked] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [words, setWords] = useState<TerminalWord[]>([]);
  const [password, setPassword] = useState("");
  const [logs, setLogs] = useState<ClassifiedEntry[]>([]);
  const [bootComplete, setBootComplete] = useState(false);

  // Boot sequence
  useEffect(() => {
    const timer = setTimeout(() => {
      setBootComplete(true);
      initializeGame();
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const initializeGame = () => {
    // Generate password
    const passwordWord = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];
    setPassword(passwordWord);

    // Generate word bank (15 words + password + 5 bracket sequences)
    const wordBank: TerminalWord[] = [];
    
    // Add password
    wordBank.push({
      word: passwordWord,
      isBracket: false,
      isPassword: true,
      id: `word-password`
    });

    // Add random words
    const availableWords = WORD_LIST.filter(w => w !== passwordWord);
    for (let i = 0; i < 15; i++) {
      const randomWord = availableWords[Math.floor(Math.random() * availableWords.length)];
      wordBank.push({
        word: randomWord,
        isBracket: false,
        isPassword: false,
        id: `word-${i}`
      });
    }

    // Add bracket sequences
    for (let i = 0; i < 5; i++) {
      const bracket = BRACKETS[Math.floor(Math.random() * BRACKETS.length)];
      wordBank.push({
        word: bracket,
        isBracket: true,
        isPassword: false,
        id: `bracket-${i}`
      });
    }

    // Shuffle
    setWords(wordBank.sort(() => Math.random() - 0.5));
    
    setMessages([
      "ROBCO INDUSTRIES UNIFIED OPERATING SYSTEM",
      "COPYRIGHT 2075-2077 ROBCO INDUSTRIES",
      "-SERVER 4-",
      "",
      "> WELCOME TO APOC-BNB TERMINAL",
      "> ACCESSING CLASSIFIED DATABASE...",
      "> PASSWORD REQUIRED",
      "",
      `> ${attempts} ATTEMPT(S) REMAINING`,
      ""
    ]);
  };

  const handleWordClick = (clickedWord: TerminalWord) => {
    if (isHacked || isLocked) return;

    setMessages(prev => [...prev, `> ${clickedWord.word}`]);

    // Handle bracket sequences (remove duds)
    if (clickedWord.isBracket) {
      setMessages(prev => [...prev, "> DUD REMOVED"]);
      // Remove one random non-password word
      setWords(prevWords => {
        const duds = prevWords.filter(w => !w.isPassword && !w.isBracket && w.id !== clickedWord.id);
        if (duds.length > 0) {
          const dudToRemove = duds[Math.floor(Math.random() * duds.length)];
          return prevWords.filter(w => w.id !== dudToRemove.id && w.id !== clickedWord.id);
        }
        return prevWords.filter(w => w.id !== clickedWord.id);
      });
      return;
    }

    // Check if password is correct
    if (clickedWord.isPassword) {
      setMessages(prev => [...prev, "> ACCESS GRANTED", "> LOADING CLASSIFIED FILES..."]);
      setIsHacked(true);
      setLogs(getRandomLogs(5));
      return;
    }

    // Wrong password
    const similarity = Math.floor(Math.random() * clickedWord.word.length);
    setMessages(prev => [...prev, "> ACCESS DENIED", `> LIKENESS=${similarity}`]);
    
    const newAttempts = attempts - 1;
    setAttempts(newAttempts);

    if (newAttempts === 0) {
      setMessages(prev => [...prev, "", "> TERMINAL LOCKED", "> PLEASE CONTACT ADMINISTRATOR"]);
      setIsLocked(true);
    } else {
      setMessages(prev => [...prev, `> ${newAttempts} ATTEMPT(S) REMAINING`]);
    }

    // Remove clicked word
    setWords(prevWords => prevWords.filter(w => w.id !== clickedWord.id));
  };

  const resetGame = () => {
    setAttempts(4);
    setIsHacked(false);
    setIsLocked(false);
    setMessages([]);
    setWords([]);
    setLogs([]);
    initializeGame();
  };

  if (!bootComplete) {
    return (
      <div className="min-h-screen bg-black font-mono text-green-500 p-8 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center space-y-2"
        >
          <div className="text-xl">ROBCO INDUSTRIES</div>
          <div className="text-sm">UNIFIED OPERATING SYSTEM</div>
          <div className="mt-4">
            <div className="inline-block animate-pulse">█</div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black font-mono text-green-500 p-4 md:p-8 relative overflow-hidden">
      {/* CRT Scanlines */}
      <div className="fixed inset-0 pointer-events-none bg-gradient-to-b from-transparent via-green-500/5 to-transparent bg-[length:100%_4px] opacity-30" />
      
      {/* CRT Glow */}
      <div className="fixed inset-0 pointer-events-none bg-green-500/5 mix-blend-screen" />

      <div className="max-w-4xl mx-auto">
        {/* Messages Panel */}
        <div className="mb-8 p-4 border-2 border-green-500/50 bg-black/80 backdrop-blur-sm">
          <AnimatePresence mode="popLayout">
            {messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="leading-tight"
              >
                {msg}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Hacked Content - Show Logs */}
        {isHacked && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-6 border-2 border-green-500/50 bg-black/80 backdrop-blur-sm space-y-6"
          >
            <div className="text-xl mb-4">
              === CLASSIFIED BUNKER DATABASE ===
            </div>
            
            {logs.map((log, idx) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: idx * 0.3 }}
                className="border-l-2 border-green-500/30 pl-4 py-2"
              >
                <div className="text-sm opacity-70 mb-1">
                  [{log.type.toUpperCase()}] - {log.bunkerId === "system" ? "SYSTEM" : log.bunkerId.toUpperCase()}
                </div>
                <div className="mb-1">{log.content}</div>
                {log.from && (
                  <div className="text-xs opacity-50">
                    -- {log.from} | {log.date}
                  </div>
                )}
              </motion.div>
            ))}

            <button
              onClick={resetGame}
              className="mt-6 px-6 py-2 border-2 border-green-500 hover:bg-green-500/20 transition-colors"
            >
              &gt; RESET TERMINAL
            </button>
          </motion.div>
        )}

        {/* Word Bank - Only show if not hacked and not locked */}
        {!isHacked && !isLocked && words.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {words.map((word) => (
              <button
                key={word.id}
                onClick={() => handleWordClick(word)}
                className="p-3 border border-green-500/30 hover:border-green-500 hover:bg-green-500/10 transition-all text-left font-mono"
              >
                {word.word}
              </button>
            ))}
          </div>
        )}

        {/* Locked State */}
        {isLocked && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-2xl mb-4 animate-pulse">!!! TERMINAL LOCKED !!!</div>
            <button
              onClick={resetGame}
              className="mt-4 px-6 py-2 border-2 border-green-500 hover:bg-green-500/20 transition-colors"
            >
              &gt; REBOOT SYSTEM
            </button>
          </motion.div>
        )}

        {/* Footer */}
        <div className="mt-12 text-xs opacity-50 text-center">
          APOC-BNB TERMINAL ACCESS v2.1.7 | RobCo Industries (C) 2077
        </div>
      </div>
    </div>
  );
}
