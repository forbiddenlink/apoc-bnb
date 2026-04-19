// Darkly funny guest horror stories for APOC-BNB
export interface GuestStory {
  quote: string;
  guestName: string;
  bunkerRef: string;
  rating: number; // 1-5
  survived: boolean;
}

export const guestStories: GuestStory[] = [
  {
    quote: "The host said 'no questions' about the freezer. I should've asked questions.",
    guestName: "Former Guest",
    bunkerRef: "Bunker-8",
    rating: 2,
    survived: true,
  },
  {
    quote: "Great stay! We lasted 3 days before the incident.",
    guestName: "Survivor",
    bunkerRef: "Bunker-3",
    rating: 4,
    survived: true,
  },
  {
    quote: "WiFi was surprisingly good. Screaming from sub-level 4 kept me up though.",
    guestName: "Tech Worker",
    bunkerRef: "Bunker-1",
    rating: 3,
    survived: true,
  },
  {
    quote: "Host was very accommodating. Didn't even mind when we accidentally opened the containment chamber.",
    guestName: "Whoops",
    bunkerRef: "Bunker-12",
    rating: 5,
    survived: false,
  },
  {
    quote: "The 'gourmet meal' was expired ration bars. Still better than outside though!",
    guestName: "Foodie",
    bunkerRef: "Bunker-6",
    rating: 3,
    survived: true,
  },
  {
    quote: "Location was perfect - only one mutant attack per week.",
    guestName: "Optimist",
    bunkerRef: "Bunker-4",
    rating: 5,
    survived: true,
  },
  {
    quote: "The 'vintage decor' was just pre-war junk not cleaned up. Loved it!",
    guestName: "Collector",
    bunkerRef: "Bunker-9",
    rating: 4,
    survived: true,
  },
  {
    quote: "Host's quirks were... well, let's just say 'eccentric' doesn't cover it.",
    guestName: "Therapist (former)",
    bunkerRef: "Bunker-5",
    rating: 2,
    survived: true,
  },
  {
    quote: "Radiation levels were 'mostly safe.' I now glow in the dark. 4 stars.",
    guestName: "Glowy",
    bunkerRef: "Bunker-7",
    rating: 4,
    survived: true,
  },
  {
    quote: "The bunker had character. Specifically, the character of a serial killer's lair.",
    guestName: "Detective",
    bunkerRef: "Bunker-11",
    rating: 2,
    survived: true,
  },
  {
    quote: "Air filtration 'mostly' worked. I now have three lungs. Thanks!",
    guestName: "Mutant Dave",
    bunkerRef: "Bunker-2",
    rating: 3,
    survived: true,
  },
  {
    quote: "The emergency exit was welded shut 'for safety.' Ironic, considering what happened.",
    guestName: "[REDACTED]",
    bunkerRef: "Bunker-13",
    rating: 1,
    survived: false,
  },
  {
    quote: "Host collected bottle caps obsessively. At least the currency was right!",
    guestName: "Trader",
    bunkerRef: "Bunker-10",
    rating: 5,
    survived: true,
  },
  {
    quote: "Clean sheets, hot water, and only minor psychological trauma. Would stay again!",
    guestName: "Low Standards Larry",
    bunkerRef: "Bunker-14",
    rating: 5,
    survived: true,
  },
  {
    quote: "The 'garden view' was a concrete wall. But hey, no raiders!",
    guestName: "Realist",
    bunkerRef: "Bunker-1",
    rating: 4,
    survived: true,
  },
  {
    quote: "Checked in at 3pm. By 5pm I was wearing a jumpsuit and answering to 'Vault Dweller 47.' By day 3, I understood. The jumpsuit is freedom.",
    guestName: "Vault Dweller 47",
    bunkerRef: "Bunker-2",
    rating: 5,
    survived: true,
  },
  {
    quote: "Host assured me the reactor was 'within acceptable parameters.' I can now charge my phone by holding it. 4 stars.",
    guestName: "Human Battery",
    bunkerRef: "Bunker-9",
    rating: 4,
    survived: true,
  },
  {
    quote: "The pop quiz was about edible mushrooms. I failed. Teacher Tim made me write 'I will learn my fungi' 100 times. I'm 34 years old.",
    guestName: "Adult Student",
    bunkerRef: "Bunker-14",
    rating: 3,
    survived: true,
  },
  {
    quote: "Karen asked to see my packing list. BEFORE I arrived. She had notes.",
    guestName: "Unprepared Guest",
    bunkerRef: "Bunker-8",
    rating: 4,
    survived: true,
  },
  {
    quote: "The raven delivered my room assignment. It stared at me. It's still staring.",
    guestName: "Bird Watcher",
    bunkerRef: "Bunker-6",
    rating: 4,
    survived: true,
  },
  {
    quote: "90-second showers. I timed mine at 91 seconds. Dan KNEW. He always knows.",
    guestName: "Rule Breaker",
    bunkerRef: "Bunker-13",
    rating: 3,
    survived: true,
  },
  {
    quote: "Warden Walsh assigned me Inmate #4471. I tried to correct him. He said it wasn't a discussion.",
    guestName: "Inmate #4471",
    bunkerRef: "Bunker-12",
    rating: 3,
    survived: true,
  },
  {
    quote: "The Cinnabon smell is REAL. Three years post-apocalypse and that smell PERSISTS. Nobody can explain it. Francine won't discuss it.",
    guestName: "Scent Investigator",
    bunkerRef: "Bunker-11",
    rating: 5,
    survived: true,
  },
  {
    quote: "Reverend Rapture's PowerPoint had 847 slides. I counted. The animations were... excessive.",
    guestName: "Captive Audience",
    bunkerRef: "Bunker-10",
    rating: 3,
    survived: true,
  },
  {
    quote: "The octopus remembers faces. I came back a second time. She was waiting.",
    guestName: "Repeat Visitor",
    bunkerRef: "Bunker-7",
    rating: 4,
    survived: true,
  },
  {
    quote: "Five stars because I'm writing this from orbit and nothing can hurt me anymore.",
    guestName: "Astronaut",
    bunkerRef: "Bunker-5",
    rating: 5,
    survived: true,
  },
  {
    quote: "I booked a 'cozy underground haven.' It was a grain silo with a stain. Willie winked and said 'she's got character.' He meant the stain.",
    guestName: "City Slicker",
    bunkerRef: "Bunker-4",
    rating: 4,
    survived: true,
  },
  {
    quote: "General Winters told us lights out was at 2100 hours. Someone laughed. We never saw them again.",
    guestName: "[FILE MISSING]",
    bunkerRef: "Bunker-3",
    rating: 2,
    survived: false,
  },
  {
    quote: "The host smiled the entire time. Through dinner. Through the screaming. Through the silence after the screaming. Five-star hospitality though.",
    guestName: "Last Entry",
    bunkerRef: "Bunker-15",
    rating: 5,
    survived: false,
  },
];

export function getRandomGuestStories(count: number = 5): GuestStory[] {
  const shuffled = [...guestStories].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
