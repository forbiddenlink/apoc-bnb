"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Shield, DollarSign, Users, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

export default function HostPage() {
    const handleStartHosting = () => {
        toast.success("Application started! 📝", {
            description: "We'll review your bunker and get back to you within 48 hours."
        });
    };

    return (
        <div className="min-h-screen bg-background font-sans">
            <Navbar />

            <main className="pt-24 pb-20">
                {/* Hero Section */}
                <section className="container mx-auto px-4 py-20 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight mb-6">
                            Become a <span className="text-primary text-glow">Warlord Host</span>
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
                            Got a bunker? Turn your survival sanctuary into a profitable shelter.
                            Join thousands of hosts earning CAPS while helping survivors.
                        </p>
                        <Button 
                            variant="neobrutal" 
                            size="xl" 
                            className="text-xl px-12"
                            onClick={handleStartHosting}
                        >
                            Start Hosting Today
                        </Button>
                    </motion.div>
                </section>

                {/* Benefits Section */}
                <section className="container mx-auto px-4 py-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                icon: DollarSign,
                                title: "Earn Extra CAPS",
                                description: "Average hosts earn 2,500+ CAPS per month"
                            },
                            {
                                icon: Shield,
                                title: "Host Protection",
                                description: "Full insurance coverage for your bunker"
                            },
                            {
                                icon: Users,
                                title: "Meet Survivors",
                                description: "Connect with the post-apocalyptic community"
                            },
                            {
                                icon: TrendingUp,
                                title: "Grow Your Empire",
                                description: "List multiple bunkers and scale up"
                            }
                        ].map((benefit, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors"
                            >
                                <benefit.icon className="h-12 w-12 text-primary mb-4" />
                                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                                <p className="text-muted-foreground">{benefit.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* How It Works */}
                <section className="container mx-auto px-4 py-16">
                    <h2 className="text-3xl font-black uppercase text-center mb-12">
                        How It Works
                    </h2>
                    <div className="max-w-3xl mx-auto space-y-8">
                        {[
                            "List your bunker with photos and details",
                            "Set your own pricing and availability",
                            "Guests book and pay through our platform",
                            "Welcome survivors and earn CAPS"
                        ].map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-center gap-4"
                            >
                                <div className="h-12 w-12 rounded-full bg-primary text-black flex items-center justify-center font-black text-xl flex-shrink-0">
                                    {index + 1}
                                </div>
                                <p className="text-lg text-foreground">{step}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* CTA */}
                <section className="container mx-auto px-4 py-16 text-center">
                    <div className="bg-primary/10 border border-primary/30 rounded-2xl p-12">
                        <h2 className="text-3xl font-black uppercase mb-4">
                            Ready to Start?
                        </h2>
                        <p className="text-muted-foreground mb-8">
                            List your first bunker in under 10 minutes
                        </p>
                        <Button 
                            variant="neobrutal" 
                            size="xl"
                            onClick={handleStartHosting}
                        >
                            Get Started Now
                        </Button>
                    </div>
                </section>
            </main>
        </div>
    );
}
