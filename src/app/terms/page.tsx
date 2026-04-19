"use client";

import { useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { motion } from "framer-motion";
import {
  ScrollText,
  Shield,
  Skull,
  AlertTriangle,
  Ban,
  Star,
  Gavel,
  Lock,
  Pencil,
  Radio,
  BookOpen,
  XCircle,
  CircleDollarSign,
  Users,
} from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

function ClassifiedStamp({ text = "LEGALLY BINDING" }: { text?: string }) {
  return (
    <div className="absolute -right-2 -top-2 md:right-4 md:top-4 rotate-12 pointer-events-none">
      <div className="border-2 border-accent/60 text-accent/60 px-3 py-1 text-xs md:text-sm font-black tracking-widest uppercase">
        {text}
      </div>
    </div>
  );
}

function DocumentCorners() {
  return (
    <>
      <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-secondary/30" />
      <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-secondary/30" />
      <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-secondary/30" />
      <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-secondary/30" />
    </>
  );
}

function SectionHeader({
  icon: Icon,
  number,
  title,
  color = "secondary",
}: {
  icon: React.ComponentType<{ className?: string }>;
  number: string;
  title: string;
  color?: string;
}) {
  const colorClasses: Record<string, { bg: string; border: string; text: string }> = {
    secondary: { bg: "bg-secondary/10", border: "border-secondary/30", text: "text-secondary" },
    primary: { bg: "bg-primary/10", border: "border-primary/30", text: "text-primary" },
    accent: { bg: "bg-accent/10", border: "border-accent/30", text: "text-accent" },
  };
  const c = colorClasses[color] ?? colorClasses.secondary;

  return (
    <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-6">
      <div className={`p-2 ${c.bg} rounded border ${c.border}`}>
        <Icon className={`h-5 w-5 ${c.text}`} />
      </div>
      <div>
        <div className={`text-label ${c.text} mb-0.5`}>SECTION {number}</div>
        <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight">{title}</h2>
      </div>
    </motion.div>
  );
}

export default function TermsPage() {
  useEffect(() => { document.title = "Terms of Survival | APOC-BNB"; }, []);

  return (
    <div className="min-h-screen bg-background font-sans noise-overlay">
      <Navbar />

      <main id="main-content" className="pt-24 pb-20 md:pb-20 pb-mobile-nav">
        {/* Hero */}
        <section className="container mx-auto px-4 py-16 text-center relative">
          <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.02]">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-transparent animate-scanline" />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="inline-flex items-center gap-2 rounded border border-secondary/30 bg-secondary/10 px-4 py-1.5 text-label text-secondary mb-6 relative">
              <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-secondary animate-pulse rounded-full" />
              <ScrollText className="h-4 w-4" />
              <span>LEGAL DOCUMENTATION</span>
              <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-secondary animate-pulse rounded-full" />
            </div>

            <h1 className="text-h1 md:text-display text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-500 uppercase tracking-tighter mb-6">
              Terms of Survival
            </h1>

            <p className="text-body text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              The following document constitutes a binding agreement between you (the &quot;Guest&quot;),
              APOC-BNB (the &quot;Platform&quot;), and whatever higher power you believe in (the &quot;Witness&quot;).
              Read carefully. Or don&apos;t. We&apos;re not your parents.
            </p>

            <div className="mt-8 text-mono text-xs text-muted-foreground">
              DOCUMENT ID: APOC-LEGAL-001 | CLEARANCE: PUBLIC | LAST REVISED: YEAR 3 PE
            </div>
          </motion.div>
        </section>

        {/* Section 1: Acceptance of Terms */}
        <section className="container mx-auto px-4 py-8">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <SectionHeader icon={BookOpen} number="01" title="Acceptance of Terms" color="primary" />

            <motion.div
              variants={fadeInUp}
              className="bg-card border border-border rounded-xl p-8 space-y-4 relative overflow-hidden"
            >
              <DocumentCorners />
              <ClassifiedStamp text="BINDING" />

              <p className="text-muted-foreground leading-relaxed">
                By accessing, browsing, or booking any accommodation through APOC-BNB, you hereby accept
                these Terms of Survival in their entirety, including but not limited to: the risk of death,
                the possibility that your host is &quot;eccentric,&quot; and the near-certainty that conditions
                will not match the listing photos (the lighting was better that day).
              </p>

              <p className="text-muted-foreground leading-relaxed">
                Clicking &quot;Book Now&quot; constitutes a legally binding agreement under both pre-war
                contract law (to the extent any court still exists to enforce it) and current wasteland
                customary law (which is more of a vibe than a system).
              </p>

              <div className="bg-background/50 rounded-lg p-4 border border-border">
                <p className="text-sm text-muted-foreground flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-secondary mt-0.5 shrink-0" />
                  If you cannot read these terms due to illiteracy, radiation-induced vision loss, or
                  general apathy toward legal documents, that is not our problem. Ignorance of the terms
                  is not a defense. Neither is &quot;I thought it was a joke.&quot; It is not a joke. Mostly.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Section 2: Definitions */}
        <section className="container mx-auto px-4 py-8">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <SectionHeader icon={BookOpen} number="02" title="Definitions" color="secondary" />

            <motion.div variants={fadeInUp} className="space-y-3">
              <DefinitionCard
                term="Guest"
                definition='Any breathing entity that has paid the listed rate in full. Breathing is verified at check-in. If you stop breathing during your stay, your guest status is revoked and your remains become host property (see Section 4).'
              />
              <DefinitionCard
                term="Host"
                definition='Any entity currently in control of a habitable shelter who has registered with APOC-BNB. Verification of "entity" status is pending for several of our more... unusual hosts.'
              />
              <DefinitionCard
                term="Bunker"
                definition="Any structure providing greater than 50% protection from outside threats, including but not limited to: radiation, mutants, weather, salespeople, and existential dread."
              />
              <DefinitionCard
                term="CAPS"
                definition="The official currency of the post-event economy. Bottle caps, preferably Nuka-Cola brand. Generic caps accepted at a discount. Counterfeit caps are punishable by exile, or worse: a 1-star review."
              />
              <DefinitionCard
                term="The Event"
                definition="We don't talk about it."
                redacted
              />
              <DefinitionCard
                term="Survival"
                definition="Continued biological function for the duration of your stay. Not guaranteed. Not implied. Not even particularly likely at some of our more adventurous listings."
              />
              <DefinitionCard
                term="Amenities"
                definition='Things that may or may not work, including but not limited to: running water, electricity, heating, cooling, doors, and "WiFi" (a generous term for what some hosts provide).'
              />
            </motion.div>
          </motion.div>
        </section>

        {/* Section 3: Liability Waiver */}
        <section className="container mx-auto px-4 py-8">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <SectionHeader icon={Shield} number="03" title="Liability Waiver" color="accent" />

            <motion.div
              variants={fadeInUp}
              className="bg-card border border-border rounded-xl p-8 space-y-6 relative overflow-hidden"
            >
              <DocumentCorners />
              <ClassifiedStamp text="READ THIS" />

              <p className="text-muted-foreground leading-relaxed">
                APOC-BNB, its founders, employees, contractors, and the one intern who somehow survived,
                shall not be held liable, responsible, or even mildly accountable for any of the following:
              </p>

              <div className="grid md:grid-cols-2 gap-3">
                {[
                  "Radiation exposure (mild, moderate, or glowing)",
                  "Mutant encounters of any kind",
                  "Host personality quirks, including but not limited to: paranoia, megalomania, and excessive taxidermy",
                  "Mysterious scratching sounds from walls, floors, ceilings, or dimensions unknown",
                  "Existential crises triggered by viewing Earth from orbit",
                  "Involuntary cult membership",
                  "Loss of free will at Vault-Tec facilities",
                  "The smell at Atlantis Research Station",
                  "Anything that happens at Sub-Level 7",
                  "Gold star addiction and resulting antisocial behavior",
                  "Temporal anomalies in or around the premises",
                  "Spontaneous philosophical awakenings",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2 bg-background/50 rounded-lg p-3 border border-border"
                  >
                    <XCircle className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>

              <div className="border-l-4 border-accent pl-6 italic text-muted-foreground text-sm">
                By continuing to read this document, you acknowledge that you have read this section
                and accept that APOC-BNB is not responsible for literally anything. You are on your own
                out there. We just help you find a bed.
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Section 4: Cancellation Policy */}
        <section className="container mx-auto px-4 py-8">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <SectionHeader icon={CircleDollarSign} number="04" title="Cancellation Policy" color="primary" />

            <motion.div variants={fadeInUp} className="space-y-4">
              <CancellationTier
                window="48+ Hours Before Check-in"
                refund="Full Refund"
                refundColor="text-primary"
                description="100% refund in CAPS. We'll even count them back to you nicely. No questions asked, though we may silently judge you for your lack of commitment to survival."
              />
              <CancellationTier
                window="24-48 Hours Before Check-in"
                refund="50% Refund"
                refundColor="text-secondary"
                description='50% refund to you. The other 50% is donated to your host&apos;s "Emotional Recovery Fund," which is a real thing we made up that hosts use to buy themselves something nice for the inconvenience.'
              />
              <CancellationTier
                window="Under 24 Hours Before Check-in"
                refund="No Refund"
                refundColor="text-red-500"
                description="Zero CAPS returned. Your host has already prepared the bunker, possibly cleaned the sheets, and definitely told all their friends about you. They may express displeasure. We cannot control how."
              />
              <CancellationTier
                window="No-Show"
                refund="Forfeiture"
                refundColor="text-red-700"
                description="No refund. Your belongings (if any were sent ahead) become community property. Your reservation slot may be given to whoever shows up next. The wasteland does not wait, and neither do we."
              />
            </motion.div>
          </motion.div>
        </section>

        {/* Section 5: Guest Conduct */}
        <section className="container mx-auto px-4 py-8">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <SectionHeader icon={Users} number="05" title="Guest Conduct" color="secondary" />

            <motion.div
              variants={fadeInUp}
              className="bg-card border border-border rounded-xl p-8 space-y-6 relative overflow-hidden"
            >
              <DocumentCorners />

              <p className="text-muted-foreground leading-relaxed">
                As a guest, you agree to conduct yourself in a manner that does not endanger yourself,
                your host, other guests, or the structural integrity of the bunker. Specifically:
              </p>

              <div className="space-y-4">
                <div className="bg-background/50 rounded-lg p-4 border border-border">
                  <h4 className="font-bold text-foreground mb-2 flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-primary" />
                    Read and obey the house rules.
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Every bunker has them. They exist for a reason. The reason is usually that someone
                    did something terrible and now there&apos;s a rule about it. Don&apos;t be the next
                    reason for a new rule.
                  </p>
                </div>

                <div className="bg-background/50 rounded-lg p-4 border border-border">
                  <h4 className="font-bold text-foreground mb-2 flex items-center gap-2">
                    <Ban className="h-4 w-4 text-red-500" />
                    Read the banned items list.
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    If something is on the banned items list, it is banned. If something is not on the
                    list but seems like it should be, it is also probably banned. Use common sense. If you
                    don&apos;t have common sense, use someone else&apos;s.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-red-500/10 to-secondary/10 rounded-lg p-6 border border-red-500/30">
                  <h4 className="font-bold text-foreground mb-2 flex items-center gap-2 text-lg">
                    <Skull className="h-5 w-5 text-red-500" />
                    If your host says don&apos;t go to Sub-Level 7, don&apos;t go to Sub-Level 7.
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    We cannot stress this enough. We have stressed it in meetings. We have stressed it
                    in training materials. We have stressed it on posters, flyers, and one very expensive
                    ham radio PSA campaign.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Do. Not. Go. To. Sub-Level. 7.
                  </p>
                  <p className="text-xs text-muted-foreground mt-3 italic">
                    (If your bunker does not have a Sub-Level 7, this section does not apply to you. Lucky.)
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Section 6: Reviews & Ratings */}
        <section className="container mx-auto px-4 py-8">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <SectionHeader icon={Star} number="06" title="Reviews & Ratings" color="accent" />

            <motion.div
              variants={fadeInUp}
              className="bg-card border border-border rounded-xl p-8 space-y-6 relative overflow-hidden"
            >
              <DocumentCorners />

              <p className="text-muted-foreground leading-relaxed">
                APOC-BNB relies on honest, thoughtful reviews from guests to maintain the quality and
                trustworthiness of our platform. The following guidelines apply:
              </p>

              <div className="space-y-3">
                <ReviewRule
                  rule="Reviews must be honest."
                  detail="Exaggeration is acceptable. Outright fabrication is not. We can tell the difference. Usually."
                />
                <ReviewRule
                  rule='"I died" is not a valid review.'
                  detail="If you died, how are you writing it? We have received 14 of these reviews. We have rejected all 14. If you are a ghost with internet access, please contact our engineering team instead -- we have questions."
                />
                <ReviewRule
                  rule="Ratings below 1 star are not possible."
                  detail="The system does not support it. Several guests have tried. One attempted to submit negative stars. The server crashed. We've since added input validation."
                />
                <ReviewRule
                  rule="Ratings above 5 stars are also not possible."
                  detail='Despite what some guests insist about the Lead-Lined Spa experience. We understand it was transformative. We are happy for you. Five stars is the maximum. Please stop emailing us about this.'
                />
              </div>

              <div className="bg-background/50 rounded-lg p-4 border border-border text-center">
                <div className="flex items-center justify-center gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-5 w-5 text-secondary fill-secondary" />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  This is the maximum. Stop asking.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Section 7: Dispute Resolution */}
        <section className="container mx-auto px-4 py-8">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <SectionHeader icon={Gavel} number="07" title="Dispute Resolution" color="primary" />

            <motion.div
              variants={fadeInUp}
              className="bg-card border border-border rounded-xl p-8 space-y-6 relative overflow-hidden"
            >
              <DocumentCorners />

              <p className="text-muted-foreground leading-relaxed">
                All disputes between guests, hosts, and/or APOC-BNB shall be resolved through
                the following process, which we are calling a &quot;process&quot; very generously:
              </p>

              <div className="space-y-4">
                <div className="bg-background/50 rounded-lg p-4 border border-border">
                  <h4 className="font-bold text-foreground mb-2">The APOC-BNB Tribunal</h4>
                  <p className="text-sm text-muted-foreground">
                    The Tribunal meets every third Wednesday, if the signal is clear and at least two of the
                    three tribunal members can make it. (The third one lives in a zone with unreliable
                    roads. We&apos;re working on it.)
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-3">
                  <div className="bg-background/50 rounded-lg p-4 border border-border text-center">
                    <ScrollText className="h-8 w-8 text-primary mx-auto mb-2" />
                    <h5 className="font-bold text-sm mb-1">Bring Evidence</h5>
                    <p className="text-xs text-muted-foreground">
                      Written, photographic, or verbal. &quot;Trust me bro&quot; is not evidence.
                    </p>
                  </div>
                  <div className="bg-background/50 rounded-lg p-4 border border-border text-center">
                    <CircleDollarSign className="h-8 w-8 text-secondary mx-auto mb-2" />
                    <h5 className="font-bold text-sm mb-1">Bring CAPS</h5>
                    <p className="text-xs text-muted-foreground">
                      Filing fee: 25 CAPS. Non-refundable. Goes toward tribunal snacks.
                    </p>
                  </div>
                  <div className="bg-background/50 rounded-lg p-4 border border-border text-center">
                    <Users className="h-8 w-8 text-accent mx-auto mb-2" />
                    <h5 className="font-bold text-sm mb-1">Bring Snacks</h5>
                    <p className="text-xs text-muted-foreground">
                      Tribunal sessions are long. Hangry tribunal members rule unfairly.
                    </p>
                  </div>
                </div>

                <div className="border-l-4 border-red-500/50 pl-6">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-bold text-red-500">RE: Trial by Combat.</span> Trial by combat
                    is available in select zones but is officially discouraged by APOC-BNB. If both parties
                    consent, we will not stop you, but we will not watch either. Our insurance (such as it is)
                    does not cover it.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Section 8: Privacy Policy */}
        <section className="container mx-auto px-4 py-8">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <SectionHeader icon={Lock} number="08" title="Privacy Policy" color="secondary" />

            <motion.div
              variants={fadeInUp}
              className="bg-card border border-border rounded-xl p-8 space-y-6 relative overflow-hidden"
            >
              <DocumentCorners />
              <ClassifiedStamp text="PRIVATE-ISH" />

              <p className="text-muted-foreground leading-relaxed">
                APOC-BNB takes your privacy as seriously as infrastructure allows, which is to say:
                we try our best.
              </p>

              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
                    <Lock className="h-4 w-4 text-primary" />
                    We Collect:
                  </h4>
                  <div className="grid md:grid-cols-3 gap-3">
                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
                      <div className="font-bold text-sm text-primary mb-1">Your Name</div>
                      <div className="text-xs text-muted-foreground">Or alias. Or whatever you told us. We don&apos;t verify.</div>
                    </div>
                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
                      <div className="font-bold text-sm text-primary mb-1">Your Location</div>
                      <div className="text-xs text-muted-foreground">Approximate. We know what zone you&apos;re in. Roughly.</div>
                    </div>
                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
                      <div className="font-bold text-sm text-primary mb-1">Survival Status</div>
                      <div className="text-xs text-muted-foreground">Updated periodically. If you stop responding, we assume the worst.</div>
                    </div>
                  </div>
                </div>

                <div className="bg-background/50 rounded-lg p-4 border border-border space-y-3">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-bold text-foreground">We do NOT sell your data.</span> We barely
                    have servers. The concept of &quot;selling data&quot; implies an infrastructure and a buyer,
                    neither of which reliably exist.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Your data is stored on a salvaged hard drive in Bunker HQ. It is backed up on a second
                    hard drive. Both hard drives are in the same room. We are aware this is not ideal.
                    We are working on it. The intern has been asked to find a third hard drive. Progress
                    is slow.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Section 9: Modifications to Terms */}
        <section className="container mx-auto px-4 py-8">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <SectionHeader icon={Pencil} number="09" title="Modifications to Terms" color="accent" />

            <motion.div
              variants={fadeInUp}
              className="bg-card border border-border rounded-xl p-8 relative overflow-hidden"
            >
              <DocumentCorners />

              <p className="text-muted-foreground leading-relaxed mb-4">
                APOC-BNB reserves the right to modify these terms at any time, for any reason, or
                for no reason at all. In practice, modifications happen infrequently because the person
                who writes them is also our only lawyer, and she is busy running raids on Tuesdays.
              </p>

              <p className="text-muted-foreground leading-relaxed mb-4">
                When terms are modified, we will make a reasonable effort to notify users via ham radio
                broadcast and/or a note pinned to the community board at Bunker HQ. &quot;Reasonable
                effort&quot; is defined by us and is not subject to appeal.
              </p>

              <div className="bg-background/50 rounded-lg p-4 border border-border">
                <p className="text-sm text-muted-foreground flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-secondary mt-0.5 shrink-0" />
                  Continued use of the platform after modifications constitutes acceptance of the new
                  terms. If you disagree with the modifications, your recourse is to stop using the
                  platform and find shelter on your own. Good luck with that.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Section 10: Contact */}
        <section className="container mx-auto px-4 py-8">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <SectionHeader icon={Radio} number="10" title="Contact" color="primary" />

            <motion.div
              variants={fadeInUp}
              className="bg-card border border-border rounded-xl p-8 relative overflow-hidden"
            >
              <DocumentCorners />

              <p className="text-muted-foreground leading-relaxed mb-6">
                Questions, concerns, complaints, or existential observations about these terms?
                We are available through the following channels:
              </p>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="bg-background/50 rounded-lg p-4 border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <Radio className="h-5 w-5 text-secondary" />
                    <h4 className="font-bold text-foreground">Ham Radio</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Frequency: <span className="font-mono text-secondary">142.5 MHz</span>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Best reception: dawn and dusk. Avoid transmitting during electrical storms
                    unless you enjoy surprises.
                  </p>
                </div>

                <div className="bg-background/50 rounded-lg p-4 border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <ScrollText className="h-5 w-5 text-primary" />
                    <h4 className="font-bold text-foreground">Email</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    <span className="font-mono text-primary">distress@apoc-bnb.com</span>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Server uptime: intermittent. Response time: when we get to it. Which could
                    be hours, days, or after the next supply run. We appreciate your patience.
                  </p>
                </div>
              </div>

              <div className="text-center text-sm text-muted-foreground">
                <p>Please do not attempt to contact us via carrier pigeon. The birds have changed.</p>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Document Footer */}
        <section className="container mx-auto px-4 py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto relative"
          >
            <div className="containment-active p-8 md:p-12 relative overflow-hidden">
              <DocumentCorners />

              <div className="relative z-10">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-secondary/10 border border-secondary/30 flex items-center justify-center">
                  <Skull className="h-8 w-8 text-secondary" />
                </div>

                <div className="text-label text-secondary mb-2">END OF DOCUMENT</div>

                <h2 className="text-h2 font-black uppercase tracking-tight mb-4">
                  Survive Accordingly
                </h2>

                <p className="text-muted-foreground mb-8">
                  You have reached the end of the Terms of Survival. By reaching this point, you have
                  demonstrated more commitment to reading legal documents than 97% of our users.
                  Congratulations. Your diligence will not protect you.
                </p>

                <a
                  href="/search"
                  className="inline-flex items-center gap-2 bg-primary text-black font-bold px-8 py-4 rounded-lg hover:bg-primary/90 transition-all uppercase tracking-wide group relative overflow-hidden"
                >
                  <span className="relative z-10">Browse All Bunkers</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                </a>
              </div>

              {/* Document metadata footer */}
              <div className="mt-8 pt-4 border-t border-border space-y-2">
                <div className="text-mono text-xs text-muted-foreground">
                  DOCUMENT NO: APOC-LEGAL-001-REV-3 | CLASSIFICATION: PUBLIC
                </div>
                <div className="text-mono text-xs text-muted-foreground">
                  LAST REVISED: YEAR 3 PE | EFFECTIVE: UNTIL FURTHER NOTICE (OR SOCIETAL COLLAPSE. AGAIN.)
                </div>
                <div className="text-mono text-xs text-muted-foreground mt-4 italic">
                  This document has been reviewed by 0 licensed attorneys. Proceed accordingly.
                </div>
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

// Component: Definition Card
function DefinitionCard({
  term,
  definition,
  redacted,
}: {
  term: string;
  definition: string;
  redacted?: boolean;
}) {
  return (
    <div className="bg-card border border-border rounded-lg p-4 flex items-start gap-4 hover:border-primary/30 transition-colors">
      <div className="bg-primary/10 border border-primary/30 rounded px-2 py-1 text-xs font-mono text-primary shrink-0 uppercase tracking-wider">
        {term}
      </div>
      <p className={`text-sm text-muted-foreground leading-relaxed ${redacted ? "line-through decoration-red-500/50 decoration-2" : ""}`}>
        {redacted && <AlertTriangle className="h-3 w-3 inline mr-1 text-red-500" />}
        {definition}
      </p>
    </div>
  );
}

// Component: Cancellation Tier
function CancellationTier({
  window: timeWindow,
  refund,
  refundColor,
  description,
}: {
  window: string;
  refund: string;
  refundColor: string;
  description: string;
}) {
  return (
    <div className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-colors">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-3">
        <h3 className="font-bold text-foreground">{timeWindow}</h3>
        <span className={`text-sm font-bold font-mono ${refundColor}`}>{refund}</span>
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

// Component: Review Rule
function ReviewRule({ rule, detail }: { rule: string; detail: string }) {
  return (
    <div className="bg-background/50 rounded-lg p-4 border border-border">
      <h4 className="font-bold text-foreground mb-1 flex items-center gap-2">
        <Star className="h-4 w-4 text-secondary" />
        {rule}
      </h4>
      <p className="text-sm text-muted-foreground">{detail}</p>
    </div>
  );
}
