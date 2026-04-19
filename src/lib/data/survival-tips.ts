// Darkly funny apocalyptic survival tips that display during loading states
// and throughout the site for added humor and immersion

export const survivalTips = [
  "Remember: Suspiciously cheap bunkers usually have a catch. Usually cannibals.",
  "Pro Tip: Share your location only if you trust them not to raid you.",
  "Reminder: Flush toilets are a privilege, not a right.",
  "Fun Fact: 3 out of 4 bunkers have 'mysterious scratching sounds'.",
  "Safety Tip: If the host glows in the dark, ask about their filtration system.",
  "The apocalypse destroyed manners. Tipping your bunker host is still appreciated.",
  "Helpful Hint: 'Rad-Free' is a claim, not a guarantee. Bring your own Geiger counter.",
  "Travel Advice: Pack light. You can't outrun raiders with a heavy backpack.",
  "Etiquette: Don't ask about the previous guests. Seriously.",
  "Fact: Pre-war currency makes excellent kindling. CAPS are forever.",
  "Warning: 'Vintage' and 'antique' are code for 'we haven't cleaned it yet'.",
  "Tip: If the host offers you 'mystery meat', it's polite to decline.",
  "Note: '99.9% oxygen purity' means there's 0.1% something else. Ask what.",
  "Reminder: Read the banned items list BEFORE booking, not AFTER arrival.",
  "Safety: Sub-levels are off-limits for a reason. Usually a scary reason.",
  "Wisdom: The phrase 'just like pre-war' is always a lie.",
  "Alert: Mandatory 5AM drills are not negotiable at military bunkers.",
  "Advice: Bring your own toilet paper. Trust us on this one.",
  "Fact: 'Organic' means it probably wasn't grown with radiation. Probably.",
  "Tip: If you hear 'that's just the wind', it's never just the wind.",
  "Warning: Budget bunkers have budget everything. Including safety.",
  "Note: Superhosts are super for a reason. Or they ate the competition.",
  "Reminder: Check reviews before booking. Especially the 1-star ones.",
  "Safety: Never volunteer to check on strange noises. Send someone you don't like.",
  "Wisdom: If it sounds too good to be true, check for the cult.",
  "Alert: Orbital bunkers have amazing views but terrible WiFi.",
  "Advice: Make friends with the person who controls the air supply.",
  "Fact: Most hosts are perfectly normal. The rest make memorable stories.",
  "Tip: Tang is NOT a food group, despite what some hosts claim.",
  "Warning: If the bunker has a 'one accident' policy, don't be the second.",
  "Note: Decontamination showers are mandatory. No, we don't care if you 'feel clean'.",
  "Reminder: Questions about weird stains are considered rude in most bunkers.",
  "Safety: Glowing mushrooms might be food or might be radioactive. Test carefully.",
  "Wisdom: The best bunker is the one that doesn't eat you.",
  "Alert: If everyone else is running, you should probably run too.",
  "Advice: Pack snacks. Bunker food is... an acquired taste.",
  "Fact: No bunker has ever had a 5-star health inspection. Because who's inspecting?",
  "Tip: Learn your host's quirks early. It might save your life. Or at least your sanity.",
  "Warning: 'Pet-friendly' doesn't always mean your kind of pet.",
  "Note: Some bunkers are hotels. Some are death traps. Read reviews to know which.",
  "If the raven delivers your room key, thank it. It remembers who doesn't.",
  "Gold stars from Teacher Tim are non-transferable. We learned this the hard way.",
  "Karen's PDF is 47 pages. Read all 47. She WILL quiz you at check-in.",
  "The Cinnabon smell at Terminal Sanctuary has been investigated by 3 scientific teams. No conclusions.",
  "Aqua-Dan's 'ocean view' is a salt flat. Do not correct him. He controls the water.",
  "If Dr. Glow says the readings are 'spicy,' leave immediately.",
  "The Overseer's jumpsuit is not optional. Resistance is futile. Also unnecessary. The jumpsuit is comfortable.",
  "Captain Cosmos's 'Stay stellar!' sign-off is not ironic. He means it. Deeply.",
  "Former Warden Walsh assigns inmate numbers based on a system only he understands.",
  "Reverend Rapture considers sermons under 2 hours 'brief.' Plan accordingly.",
  "If Mountain Man Mike's raven follows you, it's not stalking. It's 'monitoring.' (It's stalking.)",
  "The octopus at Atlantis Research Station has a name. Captain Nemo won't tell you. She prefers it that way.",
  "General Winters's 'one accident' policy means what you think it means.",
  "Never ask Wasteland Willie about the bean vault combination. That information died with the last person who asked.",
  "The Learning Caravan's FIELD TRIP bus has never left the lot. Teacher Tim insists 'next week.'",
];

export const getRandomTip = (): string => {
  return survivalTips[Math.floor(Math.random() * survivalTips.length)];
};

export const getTip = (index: number): string => {
  return survivalTips[index % survivalTips.length];
};
