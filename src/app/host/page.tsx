"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { Button } from "@/components/ui/button";
import { Shield, DollarSign, Users, TrendingUp, CheckCircle2, Radiation, Target, Crosshair } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useState, useEffect } from "react";

// Animated connecting line between steps
function ConnectingLine({ index }: { index: number }) {
    return (
        <div className="hidden md:block absolute left-6 top-14 w-0.5 h-full">
            <motion.div
                initial={{ height: 0 }}
                whileInView={{ height: "100%" }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 + 0.3, duration: 0.5 }}
                className="bg-gradient-to-b from-primary via-primary to-transparent"
            />
        </div>
    );
}

// Rotating border CTA
function EnlistButton({ onClick }: { onClick: () => void }) {
    return (
        <motion.button
            onClick={onClick}
            className="relative px-10 py-5 bg-primary text-black font-black text-xl uppercase tracking-wider overflow-hidden group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
        >
            {/* Rotating dash border effect */}
            <div className="absolute inset-0 border-2 border-dashed border-black/30 animate-spin-slow pointer-events-none" style={{ animationDuration: '10s' }} />
            <span className="relative z-10 flex items-center gap-3">
                <Target className="h-6 w-6" />
                ENLIST NOW
            </span>
            {/* Scan line on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        </motion.button>
    );
}

export default function HostPage() {
    const [missionCode, setMissionCode] = useState("GENERATING...");

    useEffect(() => { document.title = "Become a Warlord | APOC-BNB"; }, []);

    useEffect(() => {
        // Generate random mission code
        const code = `WH-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Date.now().toString(36).substring(-4).toUpperCase()}`;
        setMissionCode(code);
    }, []);

    const handleStartHosting = () => {
        toast.success("Application submitted!", {
            description: `Mission code: ${missionCode}. We'll contact you within 48 hours.`
        });
    };

    return (
        <div className="min-h-screen bg-background font-sans noise-overlay">
            <Navbar />

            <main className="pt-24 pb-20 md:pb-20 pb-mobile-nav">
                {/* Hero Section - Recruitment Briefing */}
                <section className="container mx-auto px-4 py-12 md:py-20 text-center relative">
                    {/* Background effects */}
                    <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.02]">
                        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-transparent animate-scanline" />
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="relative z-10"
                    >
                        {/* Mission header */}
                        <div className="inline-flex items-center gap-2 rounded border border-accent/30 bg-accent/10 px-4 py-1.5 text-label text-accent mb-6 relative">
                            <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-accent animate-pulse rounded-full" />
                            <Crosshair className="h-4 w-4 animate-pulse" />
                            <span>RECRUITMENT BRIEFING</span>
                            <span className="w-px h-4 bg-accent/30" />
                            <span className="font-mono">{missionCode}</span>
                            <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-accent animate-pulse rounded-full" />
                        </div>

                        <h1 className="text-h1 md:text-display font-black uppercase tracking-tight mb-6">
                            Become a <span className="text-primary text-glow-intense">Warlord Host</span>
                        </h1>
                        <p className="text-body text-muted-foreground max-w-2xl mx-auto mb-10">
                            Got a bunker? Turn your survival sanctuary into a profitable shelter.
                            Join <span className="text-secondary font-bold">2,847 hosts</span> earning CAPS while helping survivors.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                variant="default"
                                size="xl"
                                className="text-lg md:text-xl px-8 md:px-12 relative overflow-hidden group"
                                onClick={handleStartHosting}
                            >
                                <span className="relative z-10">Start Hosting Today</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                            </Button>
                            <Button
                                variant="outline"
                                size="xl"
                                className="text-lg md:text-xl px-8 md:px-12 border-primary/30 hover:border-primary/60 hover:bg-primary/5"
                                onClick={() => {
                                    const section = document.getElementById('how-it-works');
                                    section?.scrollIntoView({ behavior: 'smooth' });
                                }}
                            >
                                View Mission Details
                            </Button>
                        </div>

                        {/* Mission stats */}
                        <div className="mt-12 flex flex-wrap justify-center gap-8 text-mono text-xs text-muted-foreground">
                            <div>ACTIVE HOSTS: <span className="text-primary">2,847</span></div>
                            <div>AVG EARNINGS: <span className="text-secondary">2,500 CAPS/mo</span></div>
                            <div>SUCCESS RATE: <span className="text-primary">98.7%</span></div>
                        </div>
                    </motion.div>
                </section>

                {/* Benefits Section - Mission Advantages */}
                <section className="container mx-auto px-4 py-12 md:py-16">
                    <div className="text-center mb-8 md:mb-12">
                        <div className="text-label text-secondary mb-2">MISSION ADVANTAGES</div>
                        <h2 className="text-h2 font-black uppercase">
                            Why Host With Us?
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                        {[
                            {
                                icon: DollarSign,
                                title: "Earn Extra CAPS",
                                description: "Average hosts earn 2,500+ CAPS per month",
                                highlight: "2,500+ CAPS/mo",
                                color: "secondary"
                            },
                            {
                                icon: Shield,
                                title: "Host Protection",
                                description: "Full insurance coverage for your bunker",
                                highlight: "100% Covered",
                                color: "primary"
                            },
                            {
                                icon: Users,
                                title: "Meet Survivors",
                                description: "Connect with the post-apocalyptic community",
                                highlight: "12K+ Members",
                                color: "primary"
                            },
                            {
                                icon: TrendingUp,
                                title: "Grow Your Empire",
                                description: "List multiple bunkers and scale up",
                                highlight: "Unlimited",
                                color: "secondary"
                            }
                        ].map((benefit, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ delay: index * 0.1, duration: 0.4 }}
                                className="containment-card p-5 md:p-6 group relative overflow-hidden"
                            >
                                {/* HUD corners */}
                                <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-primary/30 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-primary/30 opacity-0 group-hover:opacity-100 transition-opacity" />

                                <div className="flex items-center gap-4 mb-4">
                                    <div className={`h-12 w-12 rounded border bg-${benefit.color}/10 border-${benefit.color}/30 flex items-center justify-center group-hover:shadow-[0_0_15px_rgba(57,255,20,0.2)] transition-all`}>
                                        <benefit.icon className={`h-6 w-6 text-${benefit.color}`} />
                                    </div>
                                    <span className={`text-label text-${benefit.color}`}>
                                        {benefit.highlight}
                                    </span>
                                </div>
                                <h3 className="text-h3 mb-2">{benefit.title}</h3>
                                <p className="text-body-sm text-muted-foreground">{benefit.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Warlord Testimonials - Field Reports */}
                <section className="container mx-auto px-4 py-12 md:py-16">
                    <div className="text-center mb-8 md:mb-12">
                        <div className="text-label text-secondary mb-2">FIELD REPORTS</div>
                        <h2 className="text-h2 font-black uppercase">
                            What Our Warlords Say
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                        {[
                            {
                                name: "Karen the Warlord",
                                initial: "K",
                                bunker: "The Galleria Fortress",
                                earnings: "4,200 CAPS/mo",
                                quote: "I was managing a mall before the apocalypse. Now I'm managing a mall AFTER the apocalypse. The difference? Nobody argues with me anymore. APOC-BNB gave me a platform. The laminated rulesheets? Those were always there."
                            },
                            {
                                name: "The Overseer",
                                initial: "O",
                                bunker: "Vault 101 Replica",
                                earnings: "3,800 CAPS/mo",
                                quote: "I built this vault as a 'hobby project.' My ex-wife called it 'concerning.' Now it's a 5-star rated facility with a waitlist. Who's concerning NOW, Linda?"
                            },
                            {
                                name: "Wasteland Willie",
                                initial: "W",
                                bunker: "Cozy Underground Haven",
                                earnings: "1,200 CAPS/mo",
                                quote: "Listen, I ain't gonna pretend it's fancy. But people keep booking. They keep coming back. One guy's been here 6 months. I think he forgot he can leave. Whatever. His CAPS are good."
                            },
                            {
                                name: "Teacher Tim",
                                initial: "T",
                                bunker: "The Learning Caravan",
                                earnings: "1,800 CAPS/mo",
                                quote: "Hosting lets me do what I love: teach. My guests learn survival skills, edible plant identification, and the importance of a positive attitude. Several have cried. I consider this progress."
                            },
                            {
                                name: "Dr. Glow",
                                initial: "D",
                                bunker: "Reactor Core Penthouse",
                                earnings: "3,500 CAPS/mo",
                                quote: "The reactor needed maintenance anyway. Might as well have company while I do it. The extra CAPS fund my research. Into what? It's better if you don't ask."
                            },
                            {
                                name: "Flight Attendant Francine",
                                initial: "F",
                                bunker: "Terminal Sanctuary",
                                earnings: "2,800 CAPS/mo",
                                quote: "The planes stopped. The service didn't. APOC-BNB understood that. My guests arrive on time, follow the safety demonstration, and receive the hospitality they deserve. Even if they didn't choose this airline."
                            }
                        ].map((testimonial, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ delay: index * 0.1, duration: 0.4 }}
                                className="bg-card border border-border hover:border-primary/30 rounded p-5 md:p-6 group relative overflow-hidden transition-colors"
                            >
                                {/* HUD corners on hover */}
                                <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-primary/30 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-primary/30 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-primary/30 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-primary/30 opacity-0 group-hover:opacity-100 transition-opacity" />

                                {/* Quote */}
                                <p className="text-body-sm text-muted-foreground italic mb-5 leading-relaxed">
                                    &ldquo;{testimonial.quote}&rdquo;
                                </p>

                                {/* Host info */}
                                <div className="flex items-center gap-3">
                                    {/* Avatar placeholder */}
                                    <div className="h-10 w-10 rounded border border-primary/30 bg-primary/10 flex items-center justify-center font-black text-primary text-sm flex-shrink-0">
                                        {testimonial.initial}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="font-bold text-sm text-foreground">{testimonial.name}</div>
                                        <div className="text-xs text-muted-foreground truncate">{testimonial.bunker}</div>
                                    </div>
                                    <div className="text-label text-secondary flex-shrink-0">
                                        {testimonial.earnings}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* How It Works - Mission Protocol */}
                <section id="how-it-works" className="container mx-auto px-4 py-12 md:py-16 border-y border-primary/10 bg-card/30 relative">
                    {/* Hazard stripes */}
                    <div className="absolute inset-0 hazard-stripes opacity-5 pointer-events-none" />

                    <div className="relative z-10">
                        <div className="text-center mb-8 md:mb-12">
                            <div className="text-label text-primary mb-2">MISSION PROTOCOL</div>
                            <h2 className="text-h2 font-black uppercase">
                                How It Works
                            </h2>
                        </div>
                        <div className="max-w-3xl mx-auto space-y-0">
                            {[
                                { step: "List your bunker with photos and details", detail: "Upload images, set amenities, describe your shelter's survival features", code: "INIT" },
                                { step: "Set your own pricing and availability", detail: "You control rates, blackout dates, and minimum stays", code: "CONFIG" },
                                { step: "Guests book and pay through our platform", detail: "Secure payments, identity verification, instant notifications", code: "SECURE" },
                                { step: "Welcome survivors and earn CAPS", detail: "Payout within 24 hours of guest check-in", code: "PROFIT" }
                            ].map((item, index, arr) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.15 }}
                                    className="flex items-start gap-4 md:gap-6 relative pb-8 last:pb-0"
                                >
                                    {/* Connecting line */}
                                    {index < arr.length - 1 && (
                                        <div className="absolute left-5 md:left-6 top-12 md:top-14 w-0.5 h-[calc(100%-3rem)] overflow-hidden">
                                            <motion.div
                                                initial={{ height: 0 }}
                                                whileInView={{ height: "100%" }}
                                                viewport={{ once: true }}
                                                transition={{ delay: index * 0.15 + 0.3, duration: 0.4 }}
                                                className="bg-gradient-to-b from-primary to-primary/20 w-full"
                                            />
                                        </div>
                                    )}

                                    {/* Step number */}
                                    <div className="relative">
                                        <div className="h-10 w-10 md:h-12 md:w-12 rounded border-2 border-primary bg-black flex items-center justify-center font-black text-lg md:text-xl flex-shrink-0 shadow-[0_0_15px_rgba(57,255,20,0.3)] text-primary">
                                            {index + 1}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 pt-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-mono text-xs text-primary/60">[{item.code}]</span>
                                        </div>
                                        <p className="text-base md:text-lg font-bold text-foreground">{item.step}</p>
                                        <p className="text-body-sm text-muted-foreground mt-1">{item.detail}</p>
                                    </div>

                                    {/* Status indicator */}
                                    <div className="hidden sm:flex items-center gap-2 pt-2">
                                        <CheckCircle2 className="h-5 w-5 text-primary/40" />
                                        <span className="text-mono text-xs text-primary/40">READY</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA - Final Deployment */}
                <section className="container mx-auto px-4 py-12 md:py-16 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="containment-active p-8 md:p-12 relative overflow-hidden max-w-2xl mx-auto"
                    >
                        {/* Background pattern */}
                        <div className="absolute inset-0 hazard-stripes opacity-20 pointer-events-none" />

                        {/* HUD corners */}
                        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary/50" />
                        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary/50" />
                        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary/50" />
                        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary/50" />

                        <div className="relative z-10">
                            <div className="text-label text-accent mb-4 flex items-center justify-center gap-2">
                                <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                                FINAL DEPLOYMENT
                                <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                            </div>
                            <h2 className="text-h2 font-black uppercase mb-4">
                                Ready to Start?
                            </h2>
                            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                                List your first bunker in under <span className="text-primary font-bold">10 minutes</span>.
                                Join <span className="text-secondary font-bold">2,847 hosts</span> already earning.
                            </p>
                            <EnlistButton onClick={handleStartHosting} />

                            {/* Mission footer */}
                            <div className="mt-8 pt-4 border-t border-primary/20 text-mono text-xs text-muted-foreground">
                                MISSION CODE: {missionCode} | STATUS: AWAITING DEPLOYMENT
                            </div>
                        </div>
                    </motion.div>
                </section>
            </main>

            <Footer />
            <MobileBottomNav />
        </div>
    );
}
