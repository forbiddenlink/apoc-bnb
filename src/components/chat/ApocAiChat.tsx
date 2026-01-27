"use client";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Bot, X, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getApocAiResponse } from "@/lib/apocAiResponses";

export function ApocAiChat() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ role: 'bot' | 'user', text: string }[]>([
        { role: 'bot', text: "Greetings, survivor. I am APOC-AI. Ask me about radiation levels or corpse disposal." }
    ]);
    const [input, setInput] = useState("");
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMsg = input;
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setInput("");

        // Simulate typing delay
        setTimeout(() => {
            const botResponse = getApocAiResponse(userMsg);
            setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
        }, 800 + Math.random() * 400);
    };

    return (
        <>
            <div className="fixed bottom-4 right-4 z-50">
                <AnimatePresence>
                    {!isOpen && (
                        <motion.button
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            onClick={() => setIsOpen(true)}
                            className="bg-primary text-black p-4 rounded-full shadow-[0_0_15px_rgba(57,255,20,0.5)] hover:scale-110 transition-transform font-bold border-2 border-primary"
                        >
                            <Bot className="h-8 w-8" />
                        </motion.button>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 50, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 50, scale: 0.9 }}
                            className="bg-card border border-primary/50 w-80 md:w-96 rounded-xl shadow-2xl overflow-hidden flex flex-col h-[500px]"
                        >
                            {/* Header */}
                            <div className="bg-primary/20 p-3 border-b border-primary/30 flex justify-between items-center backdrop-blur">
                                <div className="flex items-center gap-2 font-bold text-primary">
                                    <Bot className="h-5 w-5" />
                                    <span>APOC-AI v9.0</span>
                                </div>
                                <button onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-white">
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            {/* Chat Area */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/50" ref={scrollRef}>
                                {messages.map((m, i) => (
                                    <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-[80%] p-3 rounded-lg text-sm ${m.role === 'user'
                                                ? 'bg-primary text-black font-bold rounded-tr-none'
                                                : 'bg-muted text-foreground border border-border rounded-tl-none font-mono'
                                            }`}>
                                            {m.text}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Input Area */}
                            <div className="p-3 border-t border-primary/30 bg-background flex gap-2">
                                <input
                                    className="flex-1 bg-transparent border border-primary/30 rounded p-2 text-sm focus:outline-none focus:border-primary text-foreground placeholder:text-muted-foreground/50"
                                    placeholder="Ask about survival..."
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                />
                                <Button size="icon" variant="ghost" className="text-primary hover:bg-primary/20" onClick={handleSend}>
                                    <Send className="h-5 w-5" />
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
}
