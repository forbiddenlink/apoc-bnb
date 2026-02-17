"use client";

import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { Button } from "@/components/ui/button";
import { Skull, Crosshair, Map as MapIcon, Trophy, Clock, Users, Target, AlertTriangle, Radiation } from "lucide-react";
import { mockRaids } from "@/lib/data/raids";
import { motion } from "framer-motion";
import { toast } from "sonner";

export default function ExperiencesPage() {
    const handleJoinRaid = (raidTitle: string) => {
        toast.success("Raid squad joined!", {
            description: `You're registered for "${raidTitle}". Good luck out there!`
        });
    };

    return (
        <div className="min-h-screen bg-background font-sans noise-overlay">
            <Navbar />

            <main className="pt-24 pb-20 md:pb-20 pb-mobile-nav container mx-auto px-4 max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12 md:mb-16"
                >
                    <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent mb-6">
                        <Radiation className="h-4 w-4 animate-pulse" />
                        <span className="uppercase tracking-widest text-xs">High Risk, High Reward</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4">
                        <span className="text-primary text-glow-intense">Raid</span> Parties
                    </h1>
                    <p className="text-base sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                        Join elite scavenging teams led by 5-star Warlords.
                        Keep what you kill. (10% tithe to the platform).
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {mockRaids.map((raid, index) => (
                        <motion.div 
                            key={raid.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:-translate-y-2"
                        >
                            <div className="aspect-video relative overflow-hidden">
                                <Image
                                    src={raid.image}
                                    alt={raid.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                                <div className="absolute bottom-4 left-4">
                                    <div className="flex items-center gap-2 text-primary font-bold uppercase text-xs tracking-widest mb-1">
                                        <Skull className="h-4 w-4" /> {raid.difficulty}
                                    </div>
                                    <h3 className="text-2xl font-black text-white leading-none">{raid.title}</h3>
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <div className="text-xs text-muted-foreground uppercase font-bold">Warlord</div>
                                        <div className="font-bold text-lg">{raid.host}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-xs text-muted-foreground uppercase font-bold">Entry Fee</div>
                                        <div className="font-bold text-lg text-secondary">{raid.price}</div>
                                    </div>
                                </div>

                                {/* Success Rate Badge */}
                                {raid.successRate && (
                                    <div className="mb-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase font-bold">
                                                <Target className="h-3 w-3" />
                                                <span>Survival Odds</span>
                                            </div>
                                            <span className={`text-sm font-black ${
                                                parseInt(raid.successRate) >= 80 ? 'text-green-500' :
                                                parseInt(raid.successRate) >= 60 ? 'text-accent' :
                                                parseInt(raid.successRate) >= 40 ? 'text-orange-500' :
                                                'text-destructive'
                                            }`}>
                                                {raid.successRate}
                                            </span>
                                        </div>
                                        <div className="h-2 bg-muted rounded-full overflow-hidden border border-border">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: raid.successRate }}
                                                transition={{ delay: index * 0.1 + 0.3, duration: 0.8, ease: "easeOut" }}
                                                className={`h-full rounded-full ${
                                                    parseInt(raid.successRate) >= 80 ? 'bg-green-500' :
                                                    parseInt(raid.successRate) >= 60 ? 'bg-accent' :
                                                    parseInt(raid.successRate) >= 40 ? 'bg-orange-500' :
                                                    'bg-destructive'
                                                }`}
                                            />
                                        </div>
                                        {parseInt(raid.successRate) < 50 && (
                                            <div className="flex items-center gap-1 mt-1 text-xs text-destructive">
                                                <AlertTriangle className="h-3 w-3" />
                                                <span className="uppercase font-bold tracking-wide">High casualty risk</span>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Description Card */}
                                {raid.description && (
                                    <div className="mb-4 p-3 bg-muted/50 border border-dashed border-border rounded-lg">
                                        <p className="text-sm text-muted-foreground italic leading-relaxed">
                                            &ldquo;{raid.description}&rdquo;
                                        </p>
                                    </div>
                                )}

                                <div className="space-y-3 mb-6">
                                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                        <Trophy className="h-4 w-4 text-accent" />
                                        <span>Loot: <span className="text-foreground font-bold">{raid.loot}</span></span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                        <MapIcon className="h-4 w-4" />
                                        <span>{raid.location}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                        <Clock className="h-4 w-4" />
                                        <span>{raid.duration}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                        <Users className="h-4 w-4" />
                                        <span>Max {raid.maxParticipants} survivors</span>
                                    </div>
                                </div>

                                <Button
                                    className="w-full gap-2 font-black"
                                    variant="default"
                                    onClick={() => handleJoinRaid(raid.title)}
                                >
                                    <Crosshair className="h-4 w-4" /> JOIN SQUAD
                                </Button>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </main>

            <Footer />
            <MobileBottomNav />
        </div>
    );
}
