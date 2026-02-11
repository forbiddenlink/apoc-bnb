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
];

export function getRandomGuestStories(count: number = 5): GuestStory[] {
  const shuffled = [...guestStories].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
