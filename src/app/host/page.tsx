"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { Button } from "@/components/ui/button";
import { Shield, DollarSign, Users, TrendingUp, CheckCircle2, Radiation } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

export default function HostPage() {
    const handleStartHosting = () => {
        toast.success("Application started! 📝", {
            description: "We'll review your bunker and get back to you within 48 hours."
        });
    };

    return (
        <div className="min-h-screen bg-background font-sans noise-overlay">
            <Navbar />

            <main className="pt-24 pb-20 md:pb-20 pb-mobile-nav">
                {/* Hero Section */}
                <section className="container mx-auto px-4 py-12 md:py-20 text-center relative">
                    {/* Background glow */}
                    <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent pointer-events-none" />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="relative z-10"
                    >
                        <div className="inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-4 py-1.5 text-sm font-medium text-secondary mb-6">
                            <Radiation className="h-4 w-4" />
                            <span className="uppercase tracking-widest text-xs">High Demand Alert</span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tight mb-6">
                            Become a <span className="text-primary text-glow-intense">Warlord Host</span>
                        </h1>
                        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
                            Got a bunker? Turn your survival sanctuary into a profitable shelter.
                            Join thousands of hosts earning CAPS while helping survivors.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                variant="neobrutal"
                                size="xl"
                                className="text-lg md:text-xl px-8 md:px-12"
                                onClick={handleStartHosting}
                            >
                                Start Hosting Today
                            </Button>
                            <Button
                                variant="outline"
                                size="xl"
                                className="text-lg md:text-xl px-8 md:px-12"
                            >
                                Learn More
                            </Button>
                        </div>
                    </motion.div>
                </section>

                {/* Benefits Section */}
                <section className="container mx-auto px-4 py-12 md:py-16">
                    <h2 className="text-2xl md:text-3xl font-black uppercase text-center mb-8 md:mb-12">
                        Why Host With Us?
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                        {[
                            {
                                icon: DollarSign,
                                title: "Earn Extra CAPS",
                                description: "Average hosts earn 2,500+ CAPS per month",
                                highlight: "2,500+ CAPS/mo"
                            },
                            {
                                icon: Shield,
                                title: "Host Protection",
                                description: "Full insurance coverage for your bunker",
                                highlight: "100% Covered"
                            },
                            {
                                icon: Users,
                                title: "Meet Survivors",
                                description: "Connect with the post-apocalyptic community",
                                highlight: "12K+ Members"
                            },
                            {
                                icon: TrendingUp,
                                title: "Grow Your Empire",
                                description: "List multiple bunkers and scale up",
                                highlight: "Unlimited"
                            }
                        ].map((benefit, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="containment-card p-5 md:p-6 group"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                        <benefit.icon className="h-6 w-6 text-primary" />
                                    </div>
                                    <span className="text-xs font-bold text-primary uppercase tracking-wider">
                                        {benefit.highlight}
                                    </span>
                                </div>
                                <h3 className="text-lg md:text-xl font-bold mb-2">{benefit.title}</h3>
                                <p className="text-sm text-muted-foreground">{benefit.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* How It Works */}
                <section className="container mx-auto px-4 py-12 md:py-16 border-y border-border bg-card/30">
                    <h2 className="text-2xl md:text-3xl font-black uppercase text-center mb-8 md:mb-12">
                        How It Works
                    </h2>
                    <div className="max-w-3xl mx-auto space-y-6 md:space-y-8">
                        {[
                            { step: "List your bunker with photos and details", detail: "Upload images, set amenities, describe your shelter" },
                            { step: "Set your own pricing and availability", detail: "You control rates, blackout dates, and minimum stays" },
                            { step: "Guests book and pay through our platform", detail: "Secure payments, identity verification, instant notifications" },
                            { step: "Welcome survivors and earn CAPS", detail: "Payout within 24 hours of guest check-in" }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-start gap-4"
                            >
                                <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-primary text-black flex items-center justify-center font-black text-lg md:text-xl flex-shrink-0 shadow-lg shadow-primary/30">
                                    {index + 1}
                                </div>
                                <div className="flex-1 pt-1">
                                    <p className="text-base md:text-lg font-bold text-foreground">{item.step}</p>
                                    <p className="text-sm text-muted-foreground mt-1">{item.detail}</p>
                                </div>
                                <CheckCircle2 className="h-5 w-5 text-primary/40 flex-shrink-0 mt-2 hidden sm:block" />
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* CTA */}
                <section className="container mx-auto px-4 py-12 md:py-16 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="containment-active p-8 md:p-12 relative overflow-hidden"
                    >
                        {/* Background pattern */}
                        <div className="absolute inset-0 hazard-stripes opacity-30 pointer-events-none" />

                        <div className="relative z-10">
                            <h2 className="text-2xl md:text-3xl font-black uppercase mb-4">
                                Ready to Start?
                            </h2>
                            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                                List your first bunker in under 10 minutes. Join 2,847 hosts already earning.
                            </p>
                            <Button
                                variant="neobrutal"
                                size="xl"
                                className="text-lg"
                                onClick={handleStartHosting}
                            >
                                Get Started Now
                            </Button>
                        </div>
                    </motion.div>
                </section>
            </main>

            <Footer />
            <MobileBottomNav />
        </div>
    );
}
