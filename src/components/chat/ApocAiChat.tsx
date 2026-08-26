"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Bot, X, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getApocAiResponse } from "@/lib/apocAiResponses";

export function ApocAiChat() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ role: "bot" | "user"; text: string }[]>([
        {
            role: "bot",
            text: "Greetings, survivor. I am APOC-AI. Ask me about radiation levels, check-in protocol, or whether that scratching sound is 'normal.'",
        },
    ]);
    const [input, setInput] = useState("");
    const scrollRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = useCallback(() => {
        if (!input.trim()) return;

        const userMsg = input;
        setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
        setInput("");

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            const botResponse = getApocAiResponse(userMsg);
            setMessages((prev) => [...prev, { role: "bot", text: botResponse }]);
        }, 800 + Math.random() * 400);
    }, [input]);

    return (
        <div className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-[55]">
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        onClick={() => setIsOpen(true)}
                        className="flex items-center gap-2 bg-primary text-black pl-3 pr-4 py-2.5 shadow-[0_0_15px_rgba(57,255,20,0.35)] hover:scale-[1.03] transition-transform font-bold border border-primary/80"
                        aria-label="Open APOC-AI chat"
                    >
                        <Bot className="h-5 w-5" />
                        <span className="text-xs uppercase tracking-[0.15em]">Ask APOC-AI</span>
                    </motion.button>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        className="bg-card border border-primary/50 w-[min(100vw-2rem,22rem)] md:w-96 shadow-2xl overflow-hidden flex flex-col h-[min(70vh,500px)] rounded-sm"
                    >
                        <div className="bg-primary/20 p-3 border-b border-primary/30 flex justify-between items-center backdrop-blur">
                            <div className="flex items-center gap-2 font-bold text-primary font-mono text-sm tracking-wide">
                                <Bot className="h-5 w-5" />
                                <span>APOC-AI · v9.0</span>
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="text-muted-foreground hover:text-white"
                                aria-label="Close chat"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/50" ref={scrollRef}>
                            {messages.map((m, i) => (
                                <div
                                    key={`${m.role}-${i}`}
                                    className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`max-w-[80%] p-3 text-sm ${
                                            m.role === "user"
                                                ? "bg-primary text-black font-bold rounded-sm"
                                                : "bg-muted text-foreground border border-border rounded-sm font-mono"
                                        }`}
                                    >
                                        {m.text}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="p-3 border-t border-primary/30 bg-background flex gap-2">
                            <input
                                className="flex-1 bg-transparent border border-primary/30 rounded-sm p-2 text-sm focus:outline-none focus:border-primary text-foreground placeholder:text-muted-foreground/50"
                                placeholder="Ask about survival..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                                aria-label="Message APOC-AI"
                            />
                            <Button
                                size="icon"
                                variant="ghost"
                                className="text-primary hover:bg-primary/20"
                                onClick={handleSend}
                                aria-label="Send message"
                            >
                                <Send className="h-5 w-5" />
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
