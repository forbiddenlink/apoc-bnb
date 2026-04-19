"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Radiation,
  AlertTriangle,
  HelpCircle,
  ChevronDown,
  Coins,
  Home,
  Users,
  Terminal,
  Mail,
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

// Declassified document stamp component
function ClassifiedStamp({ text = "DECLASSIFIED" }: { text?: string }) {
  return (
    <div className="absolute -right-2 -top-2 md:right-4 md:top-4 rotate-12 pointer-events-none">
      <div className="border-2 border-accent/60 text-accent/60 px-3 py-1 text-xs md:text-sm font-black tracking-widest uppercase">
        {text}
      </div>
    </div>
  );
}

// Document corner accents
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

// Accordion FAQ item
function FAQItem({
  question,
  answer,
  index,
}: {
  question: string;
  answer: string;
  index: number;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      variants={fadeInUp}
      className="border border-border rounded-lg overflow-hidden hover:border-primary/30 transition-colors"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 md:p-5 text-left bg-card hover:bg-card/80 transition-colors"
      >
        <div className="flex items-center gap-3 pr-4">
          <span className="text-xs font-mono text-primary shrink-0">
            {String(index).padStart(2, "0")}
          </span>
          <span className="font-bold text-foreground text-sm md:text-base">
            {question}
          </span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0"
        >
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-4 md:px-5 pb-4 md:pb-5 pt-0">
              <div className="pl-8 border-l-2 border-primary/20 text-sm text-muted-foreground leading-relaxed">
                {answer}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

type ColorKey = "primary" | "secondary" | "accent";

const colorClasses: Record<
  ColorKey,
  { bg: string; border: string; text: string; label: string }
> = {
  primary: {
    bg: "bg-primary/10",
    border: "border-primary/30",
    text: "text-primary",
    label: "text-primary",
  },
  secondary: {
    bg: "bg-secondary/10",
    border: "border-secondary/30",
    text: "text-secondary",
    label: "text-secondary",
  },
  accent: {
    bg: "bg-accent/10",
    border: "border-accent/30",
    text: "text-accent",
    label: "text-accent",
  },
};

interface FAQSection {
  chapter: string;
  title: string;
  icon: React.ReactNode;
  iconColor: ColorKey;
  stampText?: string;
  items: { question: string; answer: string }[];
}

const faqSections: FAQSection[] = [
  {
    chapter: "CHAPTER 01",
    title: "Booking & Reservations",
    icon: <Coins className="h-6 w-6" />,
    iconColor: "secondary",
    stampText: "PUBLIC ACCESS",
    items: [
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept CAPS (bottle caps), Bitcoin (when the satellite uplink cooperates), and select barter arrangements at host discretion. Pre-war currency is NOT accepted. We don't care how many zeros are on your bills \u2014 they're worth exactly zero caps. Some hosts will take ammunition as payment, but we strongly discourage this for insurance reasons.",
      },
      {
        question: "Can I cancel my booking?",
        answer:
          "Cancellations made 72+ hours before check-in receive a full refund minus a 15-cap processing fee. Cancellations within 72 hours are subject to the host's discretion \u2014 and some hosts take cancellations personally. No-shows forfeit their deposit and may receive a Wasteland Credit Score demerit. We don't make the rules. Actually, we do. But they're non-negotiable.",
      },
      {
        question: "What's the check-in process?",
        answer:
          "Standard check-in involves three steps: (1) Decontamination rinse at the airlock, (2) Identity verification via thumbprint or retinal scan (hosts vary), and (3) A mandatory host briefing covering emergency exits, ration schedules, and \"the things we don't talk about.\" Plan for 30-45 minutes. Arriving irradiated adds another hour.",
      },
      {
        question: "Is early check-in available?",
        answer:
          "Early check-in is available on a case-by-case basis, contingent primarily on whether the previous guests completed their checkout successfully. \"Completed\" here means \"left alive and voluntarily.\" If the listing shows \"Cleaning in Progress,\" we recommend waiting. Trust us on this one.",
      },
      {
        question: "What if my bunker isn't as described?",
        answer:
          "File Form 27-B/6 (available in triplicate at any APOC-BNB kiosk or via ham radio request). Complaints are reviewed by the Regional Overseer within 5-7 business days. Note: \"business days\" is a loose concept. Also note: discrepancies between listing photos and reality may be due to \"creative staging,\" which is technically not a violation. We're working on that.",
      },
    ],
  },
  {
    chapter: "CHAPTER 02",
    title: "Safety & Radiation",
    icon: <Radiation className="h-6 w-6" />,
    iconColor: "primary",
    stampText: "CAUTION ADVISED",
    items: [
      {
        question: 'Is the radiation really "low"?',
        answer:
          "\"Low\" is relative. Pre-war, \"low radiation\" meant background levels that required sensitive equipment to detect. Post-war, \"low radiation\" means you probably won't grow a third arm during a standard 3-night stay. Our ratings are calibrated to current conditions: Low (<50 mSv/night), Moderate (50-200 mSv/night), Spicy (bring your own lead underwear). All measurements are approximate.",
      },
      {
        question: "What do I do during a raid?",
        answer:
          "Follow your host's instructions immediately and without debate. Most bunkers have a designated safe room. Get in it. Do not attempt to \"help\" defend the perimeter unless explicitly asked \u2014 friendly fire incidents account for 40% of our guest incident reports. If your host says \"get in the hole,\" get in the hole. Questions can wait.",
      },
      {
        question: "Are the hosts verified?",
        answer:
          "Every APOC-BNB host undergoes our rigorous verification process: we send a team member to spend the night. If they come back, the host is verified. If they come back with all their original limbs, that's a Superhost candidate. We've been inside. We survived the night. That's verification. We don't pretend it's more scientific than that.",
      },
      {
        question: "What about the scratching sounds at night?",
        answer:
          "It's the water recycling system. Always. Every bunker has one, and they all make that noise. It is categorically, definitively, 100% the water recycling system and absolutely nothing else. Please do not investigate the scratching. Please do not open the maintenance panel. The water recycling system is fine. You're fine. Go back to sleep.",
      },
      {
        question: "Should I bring my own Geiger counter?",
        answer:
          "Yes, absolutely. But be discreet about it. Some hosts consider visible Geiger counters to be a passive-aggressive comment on their listing's radiation rating, and hospitality in the wasteland is not something you want to jeopardize. We recommend the pocket-sized models. Tuck it in a boot. Check readings in the bathroom. Don't wave it around at dinner.",
      },
    ],
  },
  {
    chapter: "CHAPTER 03",
    title: "Amenities & Expectations",
    icon: <Home className="h-6 w-6" />,
    iconColor: "accent",
    stampText: "MANAGE EXPECTATIONS",
    items: [
      {
        question: "Do bunkers have WiFi?",
        answer:
          "Ha. No. Some bunkers have ham radio access, which is basically WiFi if you squint and lower your expectations dramatically. A handful of premium listings in the Mountain Territory have satellite uplink, but bandwidth is shared with the orbital defense grid, so don't try to stream anything. Several hosts offer \"library privileges,\" which means actual books. Made of paper. It's not so bad.",
      },
      {
        question: "What about food?",
        answer:
          "This varies wildly. Read the listing carefully. \"Complimentary breakfast\" could mean fresh eggs from a rooftop coop or a 200-year-old MRE. \"Gourmet\" is relative \u2014 one host's \"gourmet radstag Wellington\" is another host's \"I found a deer and a blowtorch.\" If the listing says \"BYO rations,\" they mean it. Don't show up hungry and hope for the best.",
      },
      {
        question: "Can I bring pets?",
        answer:
          "Check the individual listing. \"Pet-friendly\" has some creative interpretations in the wasteland. Some hosts welcome dogs. Some hosts welcome mutant dogs. One host in the Southern Territories considers a pet brahmin acceptable but draws the line at deathclaws. If your pet glows, disclose that upfront. If your pet has more than four legs, check with the host first.",
      },
      {
        question: 'What are "Banned Items"?',
        answer:
          "Every listing has a Banned Items section. Read it. Seriously. Common bans include: explosives (obvious), pre-war government IDs (paranoia, but respected), and \"haunted objects\" (don't ask). Your host Karen at Bunker 47-B personally inspects all luggage and she WILL find your contraband jerky. She has a gift. Don't test her.",
      },
    ],
  },
  {
    chapter: "CHAPTER 04",
    title: "Hosts & Community",
    icon: <Users className="h-6 w-6" />,
    iconColor: "secondary",
    items: [
      {
        question: 'What\'s a "Superhost"?',
        answer:
          "A Superhost is a host who has maintained a 4.5+ star rating, a 90% response rate, and \u2014 most importantly \u2014 hasn't gotten any guests killed intentionally. The bar sounds low, but you'd be surprised how many hosts don't clear it. Superhosts receive a special badge, priority listing placement, and a complimentary lead-lined vest (annual).",
      },
      {
        question: "Can I become a host?",
        answer:
          "Yes! We're always looking for new hosts. If you have a fortified structure, consistent access to clean(ish) water, and a willingness to share your space with strangers who may or may not be mutants, visit our Host Application page at /host. Background checks are conducted, but let's be honest \u2014 everyone's background is complicated now.",
      },
      {
        question: 'What are "host quirks"?',
        answer:
          "Host quirks are behavioral patterns we disclose in listings so guests can prepare. Examples include: \"Mandatory group meditation at dawn,\" \"Host collects teeth (not yours, hopefully),\" and \"No eye contact before noon.\" Quirks are not dealbreakers \u2014 they're features. The wasteland made us all a little weird. Embrace it.",
      },
      {
        question: "What happens at 10 demerits?",
        answer:
          "We are legally unable to disclose what happens at 10 demerits. What we can tell you is that no guest who has reached 10 demerits has ever filed a complaint about the process. Draw your own conclusions. We recommend staying at 9 or below. The demerit counter resets annually, which we consider generous.",
      },
    ],
  },
  {
    chapter: "CHAPTER 05",
    title: "Technical Support",
    icon: <Terminal className="h-6 w-6" />,
    iconColor: "primary",
    stampText: "UPLINK REQUIRED",
    items: [
      {
        question: "The booking system isn't working.",
        answer:
          "Our booking platform runs on a network of salvaged satellites in increasingly unstable orbits. Service interruptions are normal and usually resolve when the satellite completes its next pass (45-90 minutes). If the issue persists, try adjusting your dish 15 degrees east. If you don't have a dish, that's your problem, not ours. Carrier pigeon backup is available in select zones.",
      },
      {
        question: "I can't log in to my account.",
        answer:
          "Authentication requires a working satellite uplink. Check your bunker's uplink status, verify your retinal profile hasn't changed (radiation can cause iris mutations \u2014 re-register if needed), and ensure your password still meets our requirements: 12+ characters, one uppercase, one number, one pre-war cultural reference, and the blood type of your nearest ally.",
      },
      {
        question: "How do I report a mutant sighting?",
        answer:
          "Mutant Report Form MR-7 is available in the footer of every page (when the site loads). Provide location, time, estimated size, number of limbs, and hostility level on a scale of 1 to \"run.\" Response time is 24-48 hours. In the meantime, we recommend running faster than the mutant. If you cannot run faster than the mutant, we recommend running faster than your travel companion.",
      },
    ],
  },
];

export default function FAQPage() {
  useEffect(() => { document.title = "Radiation FAQ | APOC-BNB"; }, []);

  return (
    <div className="min-h-screen bg-background font-sans noise-overlay">
      <Navbar />

      <main id="main-content" className="pt-24 pb-20 md:pb-20 pb-mobile-nav">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 text-center relative">
          {/* Scan line effect */}
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
              <HelpCircle className="h-4 w-4" />
              <span>INFORMATION TERMINAL</span>
              <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-secondary animate-pulse rounded-full" />
            </div>

            <h1 className="text-h1 md:text-display text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-500 uppercase tracking-tighter mb-6">
              Frequently Asked{" "}
              <span className="text-primary text-glow">Questions</span>
            </h1>

            <p className="text-body text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Everything you need to know about surviving your stay. If your
              question isn&apos;t answered here, it&apos;s either classified or
              nobody has survived long enough to ask it.
            </p>

            {/* Document ID */}
            <div className="mt-8 text-mono text-xs text-muted-foreground">
              DOCUMENT ID: APOC-FAQ-001 | CLEARANCE: PUBLIC | REV. 14 | YEAR 3
              PE
            </div>
          </motion.div>
        </section>

        {/* FAQ Sections */}
        {faqSections.map((section, sectionIndex) => (
          <section
            key={section.chapter}
            className="container mx-auto px-4 py-12"
          >
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              {/* Chapter Header */}
              <motion.div
                variants={fadeInUp}
                className="flex items-center gap-3 mb-8"
              >
                <div
                  className={`p-2 ${colorClasses[section.iconColor].bg} rounded border ${colorClasses[section.iconColor].border}`}
                >
                  <div className={colorClasses[section.iconColor].text}>
                    {section.icon}
                  </div>
                </div>
                <div>
                  <div
                    className={`text-label ${colorClasses[section.iconColor].label} mb-1`}
                  >
                    {section.chapter}
                  </div>
                  <h2 className="text-h2 font-black uppercase tracking-tight">
                    {section.title}
                  </h2>
                </div>
              </motion.div>

              {/* FAQ Items Card */}
              <motion.div
                variants={fadeInUp}
                className="bg-card border border-border rounded-xl p-4 md:p-6 relative overflow-hidden"
              >
                <DocumentCorners />
                {section.stampText && (
                  <ClassifiedStamp text={section.stampText} />
                )}

                <div className="space-y-3">
                  {section.items.map((item, itemIndex) => {
                    // Calculate global index across all sections
                    const globalIndex =
                      faqSections
                        .slice(0, sectionIndex)
                        .reduce((acc, s) => acc + s.items.length, 0) +
                      itemIndex +
                      1;
                    return (
                      <FAQItem
                        key={itemIndex}
                        question={item.question}
                        answer={item.answer}
                        index={globalIndex}
                      />
                    );
                  })}
                </div>
              </motion.div>
            </motion.div>
          </section>
        ))}

        {/* Still Have Questions CTA */}
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
                  <Mail className="h-8 w-8 text-secondary" />
                </div>
                <div className="text-label text-secondary mb-2">
                  STILL HAVE QUESTIONS?
                </div>
                <h2 className="text-h2 font-black uppercase tracking-tight mb-4">
                  Send a Distress Signal
                </h2>
                <p className="text-muted-foreground mb-4">
                  If your question wasn&apos;t answered above, reach out to our
                  support team. Response times vary based on satellite
                  positioning, raider activity, and whether Dave remembered to
                  charge the radio.
                </p>
                <p className="text-muted-foreground mb-8 text-sm">
                  <AlertTriangle className="h-4 w-4 inline mr-2 text-secondary" />
                  For life-threatening emergencies, do not email. Run.
                </p>
                <a
                  href="mailto:distress@apoc-bnb.com"
                  className="inline-flex items-center gap-2 bg-primary text-black font-bold px-8 py-4 rounded-lg hover:bg-primary/90 transition-all uppercase tracking-wide group relative overflow-hidden"
                >
                  <span className="relative z-10">
                    distress@apoc-bnb.com
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                </a>
              </div>

              {/* Document footer */}
              <div className="mt-8 pt-4 border-t border-border text-mono text-xs text-muted-foreground">
                APOC-BNB KNOWLEDGE BASE | DOCUMENT APOC-FAQ-001 | ACCESS
                GRANTED | YEAR 3 PE
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
