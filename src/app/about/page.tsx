"use client";

import { Navbar } from "@/components/layout/Navbar";
import { GlitchText } from "@/components/ui/GlitchText";
import { motion } from "framer-motion";
import {
  Radiation,
  Calendar,
  Coins,
  MapPin,
  Building2,
  Skull,
  AlertTriangle,
  Sparkles,
  Shield,
  Clock
} from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />

      <main className="pt-24 pb-20">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-4 py-1.5 text-sm font-medium text-secondary mb-6">
              <Skull className="h-4 w-4" />
              <span className="uppercase tracking-widest">Declassified Lore</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-500 uppercase tracking-tighter mb-6">
              The World That <GlitchText text="Was" className="text-primary text-glow" />
            </h1>

            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Before the bunkers. Before the bottle caps. Before APOC-BNB became humanity&apos;s
              most trusted platform for luxury survival accommodations. There was... The Event.
            </p>
          </motion.div>
        </section>

        {/* The Event Section */}
        <section className="container mx-auto px-4 py-16">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-8">
              <Radiation className="h-8 w-8 text-secondary" />
              <h2 className="text-3xl font-black uppercase tracking-tight">The Event</h2>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="bg-card border border-border rounded-xl p-8 space-y-6"
            >
              <div className="border-l-4 border-secondary pl-6 italic text-muted-foreground">
                &quot;Nobody agrees on what happened. Everyone agrees it was bad.&quot;
                <span className="block mt-2 text-sm not-italic">— The Overseer, Vault 101 Replica</span>
              </div>

              <p className="text-foreground leading-relaxed">
                On a day that survivors can&apos;t quite pin down (calendars weren&apos;t a priority),
                civilization as we knew it underwent what historians now call <span className="text-primary font-bold">&quot;The Event.&quot;</span>
                What caused it? Excellent question. Here are the leading theories:
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <TheoryCard
                  title="The Solar Flare Theory"
                  description="A massive electromagnetic pulse fried every circuit on Earth. Proponents point to the permanently aurora-lit skies over what used to be Canada."
                  probability="23%"
                />
                <TheoryCard
                  title="The Rogue AI Theory"
                  description="An algorithm designed to optimize shipping routes achieved sentience and decided humanity was 'inefficient.' The Amazon warehouses went dark first."
                  probability="31%"
                />
                <TheoryCard
                  title="The 'Oops' Theory"
                  description="Someone in a government facility pressed the wrong button. Possibly labeled in a font too small to read. This theory is popular among survivors who worked in IT."
                  probability="19%"
                />
                <TheoryCard
                  title="The Convergence Theory"
                  description="All of the above happened simultaneously because the universe has a dark sense of humor. Statistically improbable. Emotionally accurate."
                  probability="27%"
                />
              </div>

              <p className="text-muted-foreground text-sm">
                <AlertTriangle className="h-4 w-4 inline mr-2 text-secondary" />
                Official APOC-BNB policy is to not discuss The Event during check-in. It upsets the hosts.
              </p>
            </motion.div>
          </motion.div>
        </section>

        {/* The Zones Section */}
        <section className="container mx-auto px-4 py-16">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-8">
              <MapPin className="h-8 w-8 text-primary" />
              <h2 className="text-3xl font-black uppercase tracking-tight">The Zones</h2>
            </motion.div>

            <motion.p variants={fadeInUp} className="text-muted-foreground mb-8">
              What used to be &quot;countries&quot; are now &quot;zones.&quot; Borders are more suggestions than rules.
              The good news: no customs. The bad news: everything else.
            </motion.p>

            <motion.div variants={fadeInUp} className="space-y-4">
              <ZoneCard
                name="North American Fallout Zone"
                status="Mostly Survivable"
                statusColor="text-primary"
                description="The eastern seaboard is a patchwork of fortified settlements and 'don't go there' territories. Major bunker concentration around former metropolitan areas. Surprisingly good pizza scene in the ruins of New Jersey."
                radiation="Low to Moderate"
                threats={["Roving trader caravans (annoying)", "Mutated wildlife (dangerous)", "Toll booth operators (worst of all)"]}
              />

              <ZoneCard
                name="West Coast Wasteland"
                status="Spicy"
                statusColor="text-secondary"
                description="What didn't fall into the ocean is thriving. Vault-Tec facilities dot the landscape like mushrooms after rain. The tech bros who survived are trying to 'disrupt' the wasteland economy. Nobody asked them to."
                radiation="Variable"
                threats={["Silicon Valley cults", "Former influencers", "Aggressive wellness communities"]}
              />

              <ZoneCard
                name="Midwest Dead Zone"
                status="Quiet"
                statusColor="text-accent"
                description="Vast, empty, and surprisingly peaceful. The corn mutated but still grows. Military installations converted to bunker complexes offer no-nonsense protection. General Winters runs a tight ship out here."
                radiation="Low"
                threats={["Boredom", "Corn-based diet", "Mandatory 6 AM wake-ups"]}
              />

              <ZoneCard
                name="Southern Territories"
                status="It's Complicated"
                statusColor="text-orange-500"
                description="A loose federation of settlements, budget bunkers, and 'that place we don't talk about.' Humidity is still a problem. Mosquitoes may have gotten worse. Or better, depending on your relationship with mosquitoes."
                radiation="Moderate"
                threats={["Humidity", "Mega-mosquitoes", "Overly friendly survivors"]}
              />

              <ZoneCard
                name="Mountain Territory"
                status="Scenic Death"
                statusColor="text-emerald-500"
                description="Natural protection, stunning views, occasional avalanche. The mountains don't care what happened below—they're still majestic. Geothermal power makes this region surprisingly cozy. Bears are still bears."
                radiation="Low"
                threats={["Altitude sickness", "Regular bears", "Suspiciously large bears"]}
              />

              <ZoneCard
                name="Space (Low Earth Orbit)"
                status="Premium"
                statusColor="text-purple-400"
                description="For those who looked at the apocalypse and said 'no thank you.' Zero radiation, zero gravity, zero fun if you're claustrophobic. Captain Cosmos runs the only orbital accommodation and charges accordingly."
                radiation="None"
                threats={["Space debris", "Cabin fever", "Astronomical prices (literally)"]}
              />
            </motion.div>
          </motion.div>
        </section>

        {/* CAPS Currency Section */}
        <section className="container mx-auto px-4 py-16">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-8">
              <Coins className="h-8 w-8 text-secondary" />
              <h2 className="text-3xl font-black uppercase tracking-tight">The Bottle Cap Economy</h2>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="bg-gradient-to-br from-secondary/10 to-primary/5 border border-secondary/30 rounded-xl p-8"
            >
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-secondary">Why Bottle Caps?</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    When the banks collapsed and cryptocurrency servers caught fire (ironic), survivors
                    needed something durable, portable, and hard to counterfeit. Enter: the humble bottle cap.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Specifically, <span className="text-primary font-bold">Nuka-Cola caps</span> became the gold standard,
                    though most vendors accept generic caps at a 15% discount. The cap economy stabilized
                    around Year 2 PE (Post-Event) and has remained surprisingly inflation-resistant.
                  </p>
                  <div className="bg-background/50 rounded-lg p-4 border border-border">
                    <div className="text-sm text-muted-foreground mb-2">Current Exchange Rates</div>
                    <div className="space-y-2 font-mono text-sm">
                      <div className="flex justify-between">
                        <span>1 Nuka-Cola Cap</span>
                        <span className="text-primary">1.00 CAPS</span>
                      </div>
                      <div className="flex justify-between">
                        <span>1 Generic Cap</span>
                        <span className="text-secondary">0.85 CAPS</span>
                      </div>
                      <div className="flex justify-between">
                        <span>1 Sunset Sarsaparilla Star Cap</span>
                        <span className="text-accent">Priceless*</span>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground mt-2">*Not actually accepted as currency</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-primary">Alternative Currencies</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    APOC-BNB also accepts Bitcoin (BTC) for our more technologically preserved guests.
                    Satellite uplinks in select bunkers maintain blockchain access, though transaction
                    times vary based on orbital positioning.
                  </p>
                  <div className="space-y-3">
                    <CurrencyTier
                      name="CAPS (Bottle Caps)"
                      icon={<Coins className="h-5 w-5" />}
                      description="Universal acceptance. Jingles pleasantly."
                      accepted={true}
                    />
                    <CurrencyTier
                      name="Bitcoin (BTC)"
                      icon={<Sparkles className="h-5 w-5" />}
                      description="For the preppers who prepped right."
                      accepted={true}
                    />
                    <CurrencyTier
                      name="Pre-War Currency"
                      icon={<AlertTriangle className="h-5 w-5" />}
                      description="Good for toilet paper. Nothing else."
                      accepted={false}
                    />
                    <CurrencyTier
                      name="Barter (Goods/Services)"
                      icon={<Shield className="h-5 w-5" />}
                      description="Host-dependent. Ask nicely."
                      accepted="maybe"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Timeline Section */}
        <section className="container mx-auto px-4 py-16">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-8">
              <Calendar className="h-8 w-8 text-accent" />
              <h2 className="text-3xl font-black uppercase tracking-tight">Timeline Since The Event</h2>
            </motion.div>

            <motion.div variants={fadeInUp} className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-secondary via-primary to-accent" />

              <div className="space-y-8">
                <TimelineEvent
                  year="Year 0"
                  title="The Event"
                  description="The world as we knew it ends. Social media goes offline. Nobody is sure if that's related or just a silver lining."
                  side="left"
                />
                <TimelineEvent
                  year="Day 3"
                  title="The Panic"
                  description="Grocery stores empty. Gas stations run dry. Everyone realizes they should have learned survival skills instead of TikTok dances."
                  side="right"
                />
                <TimelineEvent
                  year="Month 2"
                  title="The Bunker Rush"
                  description="Those with bunkers become very popular. Those without bunkers become very creative. Basement renovations spike 4000%."
                  side="left"
                />
                <TimelineEvent
                  year="Month 6"
                  title="The Cap Standard"
                  description="Bottle caps emerge as the dominant currency after a three-way war between cap supporters, crypto enthusiasts, and one guy who really believed in seashells."
                  side="right"
                />
                <TimelineEvent
                  year="Year 1"
                  title="The Founding of APOC-BNB"
                  description="Two former tech workers, hiding in a converted missile silo, realize there's a market opportunity. They create the first post-apocalyptic booking platform using salvaged servers and questionable optimism."
                  side="left"
                  highlight
                />
                <TimelineEvent
                  year="Year 2"
                  title="The Zone Treaties"
                  description="Major settlements agree to stop shooting at each other long enough to establish trade routes. Tourism becomes possible, if not advisable."
                  side="right"
                />
                <TimelineEvent
                  year="Year 3"
                  title="The Superhost Program"
                  description="APOC-BNB introduces verification for hosts who haven't gotten any guests killed (intentionally). Standards are created. Stars are earned."
                  side="left"
                />
                <TimelineEvent
                  year="Present Day"
                  title="The New Normal"
                  description="APOC-BNB operates across all major zones with 50+ verified bunkers. Humanity adapts. Survival becomes an industry. Luxury survives. Somehow."
                  side="right"
                  highlight
                />
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* About APOC-BNB Section */}
        <section className="container mx-auto px-4 py-16">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-8">
              <Building2 className="h-8 w-8 text-primary" />
              <h2 className="text-3xl font-black uppercase tracking-tight">About APOC-BNB</h2>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="bg-card border border-border rounded-xl overflow-hidden"
            >
              <div className="bg-gradient-to-r from-primary/20 to-secondary/20 p-8 border-b border-border">
                <p className="text-2xl font-bold text-foreground italic">
                  &quot;The world ended. Your standards didn&apos;t.&quot;
                </p>
                <p className="text-muted-foreground mt-2">— APOC-BNB founding principle, Year 1 PE</p>
              </div>

              <div className="p-8 space-y-6">
                <div className="prose prose-invert max-w-none">
                  <p className="text-muted-foreground leading-relaxed">
                    APOC-BNB was founded in Year 1 PE (Post-Event) by two former Silicon Valley engineers who
                    found themselves sharing a decommissioned missile silo with 47 strangers, a hydroponics
                    system, and entirely too much time to think.
                  </p>

                  <p className="text-muted-foreground leading-relaxed">
                    <span className="text-primary font-bold">Sarah Chen</span> (CEO, Chief Survival Officer) had been building
                    Airbnb&apos;s recommendation algorithm when The Event hit. She survived by hiding in a server
                    room for 72 hours, emerging with a renewed appreciation for air conditioning and a startup idea.
                  </p>

                  <p className="text-muted-foreground leading-relaxed">
                    <span className="text-secondary font-bold">Marcus &quot;Rad-Proof&quot; Williams</span> (CTO, Chief Technical Operator)
                    was a doomsday prepper before it was necessary. When everyone else was panic-buying, he was
                    already 300 feet underground, live-streaming the apocalypse to an audience of 12 (the WiFi
                    cut out on Day 4, but by then the point was made).
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 pt-6 border-t border-border">
                  <StatCard number="50+" label="Verified Bunkers" />
                  <StatCard number="10,000+" label="Survivors Housed" />
                  <StatCard number="0" label="Confirmed Casualties*" />
                </div>

                <p className="text-xs text-muted-foreground text-center">
                  *Unconfirmed casualties are a separate metric. We don&apos;t track those. On purpose.
                </p>

                <div className="bg-background/50 rounded-lg p-6 border border-border">
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Our Promise
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary">01.</span>
                      Every bunker is verified by our team. We&apos;ve been inside. We&apos;ve survived the night.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">02.</span>
                      Radiation levels are tested monthly. Numbers don&apos;t lie (hosts sometimes do, but we catch them).
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">03.</span>
                      24/7 support via ham radio (when signals allow). We&apos;re here for you. Probably.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">04.</span>
                      No hidden fees. The caps price is the caps price. Tips appreciated but not expected.
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <Clock className="h-12 w-12 text-secondary mx-auto mb-4" />
            <h2 className="text-3xl font-black uppercase tracking-tight mb-4">
              The Past is Prologue
            </h2>
            <p className="text-muted-foreground mb-8">
              Now that you know where we came from, it&apos;s time to find where you&apos;re going.
              Browse our verified bunkers and book your next survival experience.
            </p>
            <a
              href="/search"
              className="inline-flex items-center gap-2 bg-primary text-black font-bold px-8 py-4 rounded-lg hover:bg-primary-dim transition-colors uppercase tracking-wide"
            >
              Browse All Bunkers
            </a>
          </motion.div>
        </section>
      </main>
    </div>
  );
}

// Component: Theory Card
function TheoryCard({ title, description, probability }: {
  title: string;
  description: string;
  probability: string
}) {
  return (
    <div className="bg-background/50 border border-border rounded-lg p-4 hover:border-primary/50 transition-colors">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-bold text-foreground">{title}</h4>
        <span className="text-xs bg-secondary/20 text-secondary px-2 py-1 rounded font-mono">
          {probability}
        </span>
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

// Component: Zone Card
function ZoneCard({ name, status, statusColor, description, radiation, threats }: {
  name: string;
  status: string;
  statusColor: string;
  description: string;
  radiation: string;
  threats: string[];
}) {
  return (
    <div className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-colors">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
        <h3 className="text-xl font-bold">{name}</h3>
        <div className="flex items-center gap-4">
          <span className={`text-sm font-bold ${statusColor}`}>{status}</span>
          <span className="text-xs bg-background px-2 py-1 rounded font-mono text-muted-foreground">
            RAD: {radiation}
          </span>
        </div>
      </div>
      <p className="text-muted-foreground mb-4">{description}</p>
      <div className="flex flex-wrap gap-2">
        {threats.map((threat, i) => (
          <span key={i} className="text-xs bg-background/50 border border-border px-2 py-1 rounded text-muted-foreground">
            {threat}
          </span>
        ))}
      </div>
    </div>
  );
}

// Component: Currency Tier
function CurrencyTier({ name, icon, description, accepted }: {
  name: string;
  icon: React.ReactNode;
  description: string;
  accepted: boolean | "maybe";
}) {
  return (
    <div className="flex items-center gap-3 bg-background/50 rounded-lg p-3 border border-border">
      <div className={`${accepted === true ? 'text-primary' : accepted === "maybe" ? 'text-secondary' : 'text-muted-foreground'}`}>
        {icon}
      </div>
      <div className="flex-1">
        <div className="font-bold text-sm">{name}</div>
        <div className="text-xs text-muted-foreground">{description}</div>
      </div>
      <div className={`text-xs font-bold ${accepted === true ? 'text-primary' : accepted === "maybe" ? 'text-secondary' : 'text-red-500'}`}>
        {accepted === true ? 'ACCEPTED' : accepted === "maybe" ? 'MAYBE' : 'REJECTED'}
      </div>
    </div>
  );
}

// Component: Timeline Event
function TimelineEvent({ year, title, description, side, highlight }: {
  year: string;
  title: string;
  description: string;
  side: "left" | "right";
  highlight?: boolean;
}) {
  return (
    <div className={`relative flex items-center ${side === 'right' ? 'md:flex-row-reverse' : ''}`}>
      {/* Timeline dot */}
      <div className="absolute left-4 md:left-1/2 w-3 h-3 -ml-1.5 rounded-full bg-primary border-2 border-background z-10" />

      {/* Content */}
      <div className={`ml-12 md:ml-0 md:w-1/2 ${side === 'left' ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
        <div className={`${highlight ? 'bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/30' : 'bg-card border-border'} border rounded-lg p-4`}>
          <div className={`text-sm font-mono ${highlight ? 'text-primary' : 'text-secondary'} mb-1`}>{year}</div>
          <h4 className="font-bold text-lg mb-2">{title}</h4>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </div>
  );
}

// Component: Stat Card
function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-4xl font-black text-primary mb-1">{number}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  );
}
