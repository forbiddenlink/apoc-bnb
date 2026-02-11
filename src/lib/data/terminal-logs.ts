// Classified bunker complaint logs and internal memos
// Revealed when "hacking" the terminal

export interface ClassifiedEntry {
  id: string;
  bunkerId: string;
  type: "complaint" | "memo" | "incident" | "review";
  content: string;
  from?: string;
  date?: string;
}

export const classifiedLogs: ClassifiedEntry[] = [
  // Bunker 1 - Commander Shepard
  {
    id: "log-001",
    bunkerId: "bunker-1",
    type: "complaint",
    content: "Host refers to guests as 'crew members.' We're not astronauts. It's a basement. A nice basement, but still.",
    from: "Guest #429",
    date: "2024-03-15"
  },
  {
    id: "log-002",
    bunkerId: "bunker-1",
    type: "memo",
    content: "MEMO: Radiation drills every Tuesday. There is no radiation. It's a basement. Commander Shepard insists it builds character.",
    from: "Management",
    date: "2024-04-01"
  },
  
  // Bunker 2 - The Overseer
  {
    id: "log-003",
    bunkerId: "bunker-2",
    type: "complaint",
    content: "Host keeps insisting Tang is a vegetable. It's been 6 months. Someone please send actual vegetables.",
    from: "Guest #512",
    date: "2024-05-20"
  },
  {
    id: "log-004",
    bunkerId: "bunker-2",
    type: "incident",
    content: "INCIDENT REPORT: Guest Gerald received 10 demerits. Offense: Asking what happens at 10 demerits. We'll find out.",
    from: "The Overseer",
    date: "2024-06-12"
  },
  
  // Bunker 3 - General Winters  
  {
    id: "log-005",
    bunkerId: "bunker-3",
    type: "complaint",
    content: "Mandatory 4 AM drills. EVERY MORNING. I signed up to survive the apocalypse, not join Special Forces.",
    from: "Guest #601",
    date: "2024-07-04"
  },
  {
    id: "log-006",
    bunkerId: "bunker-3",
    type: "memo",
    content: "The 'one accident' policy remains in effect. Nobody asks about the previous accident. This is for everyone's safety.",
    from: "General Winters",
    date: "2024-07-15"
  },
  
  // Bunker 4 - Wasteland Willie
  {
    id: "log-007",
    bunkerId: "bunker-4",
    type: "complaint",
    content: "Asked about 'the stain.' Host said 'which one?' This was not reassuring.",
    from: "Guest #734",
    date: "2024-08-01"
  },
  {
    id: "log-008",
    bunkerId: "bunker-4",
    type: "review",
    content: "BUDGET TIP: If something breaks, Willie's repair method is 'jiggle it harder.' Has 60% success rate. Surprisingly effective.",
    from: "Maintenance",
    date: "2024-08-10"
  },
  
  // Bunker 5 - Captain Cosmos
  {
    id: "log-009",
    bunkerId: "bunker-5",
    type: "memo",
    content: "Host signs off every message with 'Stay stellar! ⭐⭐⭐' - exactly three stars. Every time. We've counted. It's been 18 months.",
    from: "Guest Services",
    date: "2024-09-01"
  },
  {
    id: "log-010",
    bunkerId: "bunker-5",
    type: "complaint",
    content: "Crying near electronics is banned. This seems... overly specific? What happened up there?",
    from: "Guest #892",
    date: "2024-09-15"
  },
  
  // Bunker 6 - Mountain Man Mike
  {
    id: "log-011",
    bunkerId: "bunker-6",
    type: "incident",
    content: "INCIDENT: Host communicates via raven. The raven is also named Mike. Nobody knows which Mike sent the message.",
    from: "Communications Dept",
    date: "2024-10-01"
  },
  {
    id: "log-012",
    bunkerId: "bunker-6",
    type: "complaint",
    content: "Composting toilet is non-negotiable. I tried to negotiate. Mike (the human) said no. Mike (the raven) also said no.",
    from: "Guest #945",
    date: "2024-10-12"
  },
  
  // Bunker 7 - Captain Nemo
  {
    id: "log-013",
    bunkerId: "bunker-7",
    type: "memo",
    content: "The smell. We must discuss the smell. Host refuses to acknowledge the smell. It persists.",
    from: "Facilities",
    date: "2024-11-01"
  },
  {
    id: "log-014",
    bunkerId: "bunker-7",
    type: "complaint",
    content: "Do NOT tap on the glass. The octopus DOES take it personally. I learned this the hard way.",
    from: "Guest #1054",
    date: "2024-11-08"
  },
  
  // Bunker 8 - Karen the Warlord
  {
    id: "log-015",
    bunkerId: "bunker-8",
    type: "incident",
    content: "CRITICAL: Karen WILL quiz you on the PDF. This is not a joke. Study the PDF. All 47 pages.",
    from: "Guest Relations",
    date: "2024-12-01"
  },
  {
    id: "log-016",
    bunkerId: "bunker-8",
    type: "memo",
    content: "The suggestion box remains empty. Karen checks it daily. We're convinced she just enjoys the ritual.",
    from: "Management",
    date: "2024-12-10"
  },
  
  // Bunker 9 - Dr. Glow
  {
    id: "log-017",
    bunkerId: "bunker-9",
    type: "complaint",
    content: "'Spicy but safe' is NOT a reassuring description for a nuclear reactor. Requesting alternative phrasing.",
    from: "Safety Committee",
    date: "2025-01-05"
  },
  {
    id: "log-018",
    bunkerId: "bunker-9",
    type: "incident",
    content: "Host glows in dim lighting. She insists this is 'normal occupational hazard.' We have concerns.",
    from: "Medical",
    date: "2025-01-15"
  },
  
  // Bunker 10 - Reverend Rapture
  {
    id: "log-019",
    bunkerId: "bunker-10",
    type: "memo",
    content: "6 AM organ music is 'optional attendance strongly encouraged mandatory.' Make of that what you will.",
    from: "Guest #1247",
    date: "2025-02-01"
  },
  {
    id: "log-020",
    bunkerId: "bunker-10",
    type: "complaint",
    content: "PowerPoint sermons. POWERPOINT. In the apocalypse. The generator deserves better.",
    from: "Guest #1298",
    date: "2025-02-10"
  },
  
  // Bunker 11 - Flight Attendant Francine
  {
    id: "log-021",
    bunkerId: "bunker-11",
    type: "incident",
    content: "REPORT: Francine's uniform is always pristine. ALWAYS. How? Where does she get detergent? Investigation ongoing.",
    from: "Supply Chain",
    date: "2025-03-01"
  },
  {
    id: "log-022",
    bunkerId: "bunker-11",
    type: "complaint",
    content: "Check-in is exactly 2 hours early. There are no flights. There is nowhere to fly. These rules persist anyway.",
    from: "Guest #1402",
    date: "2025-03-12"
  },
  
  // Bunker 12 - Former Warden Walsh
  {
    id: "log-023",
    bunkerId: "bunker-12",
    type: "memo",
    content: "Warden Walsh assigns inmate numbers 'for fun.' Guest #1501 is now Inmate 847-B. They seem... resigned to this.",
    from: "Administration",
    date: "2025-04-01"
  },
  {
    id: "log-024",
    bunkerId: "bunker-12",
    type: "complaint",
    content: "The meals are institutional. Walsh is PROUD of them. This explains a lot about the pre-apocalypse prison system.",
    from: "Guest #1555",
    date: "2025-04-10"
  },
  
  // Bunker 13 - Aqua-Dan
  {
    id: "log-025",
    bunkerId: "bunker-13",
    type: "incident",
    content: "Dan calls the salt flat an 'ocean view.' Nobody corrects him. He has the water. We need the water.",
    from: "Guest #1604",
    date: "2025-05-01"
  },
  {
    id: "log-026",
    bunkerId: "bunker-13",
    type: "complaint",
    content: "Shower timer is 90 seconds. Dan watches. It's uncomfortable. But again: he has the water.",
    from: "Guest #1650",
    date: "2025-05-15"
  },
  
  // Bunker 14 - Teacher Tim
  {
    id: "log-027",
    bunkerId: "bunker-14",
    type: "memo",
    content: "Tim assigned homework. HOMEWORK. In the apocalypse. It was a worksheet on 'Surviving nuclear winter.' I got a B+.",
    from: "Guest #1701",
    date: "2025-06-01"
  },
  {
    id: "log-028",
    bunkerId: "bunker-14",
    type: "complaint",
    content: "Gold stars are EARNED. Tim takes this very seriously. I'm 42 years old and I wanted that gold star.",
    from: "Guest #1745",
    date: "2025-06-10"
  },
  
  // Generic/System logs
  {
    id: "log-029",
    type: "memo",
    bunkerId: "system",
    content: "SYSTEM NOTICE: If your host has renamed you, communicates via bird, or glows in the dark - this is within normal parameters.",
    from: "APOC-BNB Support",
    date: "2025-07-01"
  },
  {
    id: "log-030",
    type: "incident",
    bunkerId: "system",
    content: "CRITICAL: 14 out of 14 hosts display 'quirks.' This is statistically improbable but legally acceptable. Please adjust expectations.",
    from: "Legal Department",
    date: "2025-07-15"
  }
];

// Helper to get random logs for terminal display
export const getRandomLogs = (count: number = 5): ClassifiedEntry[] => {
  const shuffled = [...classifiedLogs].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

// Helper to get logs for specific bunker
export const getBunkerLogs = (bunkerId: string): ClassifiedEntry[] => {
  return classifiedLogs.filter(log => log.bunkerId === bunkerId || log.bunkerId === "system");
};
