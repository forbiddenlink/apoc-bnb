export const getApocAiResponse = (userMessage: string): string => {
  const msg = userMessage.toLowerCase().trim();

  // Check for greetings
  if (/^(hi|hello|hey|greetings|sup|yo)/.test(msg)) {
    return pickRandom([
      "Greetings, survivor. Still breathing? That's... unexpected.",
      "Hello. I calculate your survival odds at 32%. How may I assist?",
      "Welcome back to consciousness. How may I endanger—I mean, help you today?",
    ]);
  }

  // ========== BUNKER-SPECIFIC RESPONSES ==========

  // Deep Earth Citadel
  if (msg.includes('deep earth') || msg.includes('citadel') || msg.includes('missile silo')) {
    return pickRandom([
      "Ah, The Deep Earth Citadel! 300 feet down, 12-foot concrete walls. The scratching in the walls is just the water recycling. Probably.",
      "Commander Shepard's Citadel is our flagship. The Lead-Lined Spa alone is worth the trip. Decontamination never felt so luxurious.",
      "The Citadel has a surface excursion record of 47 minutes. Would you like to try to beat it? Waivers available.",
      "Deep Earth Citadel: where 'underground living' meets 'suspiciously reassuring host'. 4.98 stars for a reason.",
    ]);
  }

  // Vault 101 Replica
  if (msg.includes('vault 101') || msg.includes('vault-tec') || msg.includes('overseer')) {
    return pickRandom([
      "The Vault 101 Replica! The Overseer runs it like it's 2077. Jumpsuit provided. Wearing it is 'strongly encouraged.'",
      "Vault 101 guests report hearing Pip-Boy sounds in their dreams for weeks. We consider this a feature.",
      "Don't mention the G.E.C.K. to The Overseer. Just... don't. He gets emotional.",
      "Authentic pre-war vault experience! The smell is part of the immersion. Radiation-free, we promise.",
    ]);
  }

  // The Silo Complex
  if (msg.includes('silo complex') || msg.includes('general winters') || msg.includes('military-grade')) {
    return pickRandom([
      "The Silo Complex: Wake-up at 0600. Mandatory. General Winters has a 'one accident' policy. Nobody knows what happened after.",
      "General Winters runs his bunker with military precision. Breakfast at 0630. Attendance is 'optional' (it's not optional).",
      "The armory access is real. The weapons are real. The training is mandatory. The General is... intense.",
      "Best for survivors who respond well to being yelled at affirmatively. 8-foot steel doors included.",
    ]);
  }

  // Cozy Underground Haven / Wasteland Willie
  if (msg.includes('cozy underground') || msg.includes('wasteland willie') || msg.includes('budget bunker') || msg.includes('haven')) {
    return pickRandom([
      "Wasteland Willie's place: No frills, no thrills, just survival. That stain was there before he got here.",
      "The Cozy Haven's air filter is from 2022. It's 'temperamental.' But hey, 150 CAPS is 150 CAPS.",
      "Willie's honest about everything. Refreshingly so. 'How bad could it be?' Not that bad, actually.",
      "Budget bunker for budget survivors. The WiFi won't work. The neighbors will hear you. You'll live.",
    ]);
  }

  // Orbital Safe House
  if (msg.includes('orbital') || msg.includes('space station') || msg.includes('captain cosmos') || msg.includes('zero gravity')) {
    return pickRandom([
      "The Orbital Safe House: Zero radiation. Zero gravity. Zero availability. Captain Cosmos has a waiting list.",
      "Space: the final survival frontier. 2000 CAPS gets you Earth views and recycled air. Very recycled.",
      "Captain Cosmos runs the only bunker that's literally out of this world. 5.0 rating. Of course.",
      "Looking up? The Orbital is currently SOLD OUT. Even the apocalypse can't stop exclusivity.",
    ]);
  }

  // Mountain Fortress
  if (msg.includes('mountain fortress') || msg.includes('mountain man mike') || msg.includes('rocky peaks')) {
    return pickRandom([
      "Mountain Man Mike hollowed out an entire mountain. Geothermal heating, underground lake. Nature's bunker.",
      "The Mountain Fortress: 200 feet of natural rock protection. The views are nice if you survive the trip.",
      "Mike's been hosting for 4 years. Superhost status. The cave system is extensive. Bring a map. Seriously.",
      "Rocky Peaks location. 10-person capacity. Underground lake. Sometimes Mike forgets guests are there.",
    ]);
  }

  // ========== RAID-SPECIFIC RESPONSES ==========

  // Supermarket Sweep
  if (msg.includes('supermarket sweep') || msg.includes('warlord jax') || msg.includes('costco')) {
    return pickRandom([
      "Supermarket Sweep with Warlord Jax! 70% success rate. Jenkins found something that 'tastes like chicken.' We don't ask anymore.",
      "Zone 4 Costco raid: expired goods are collector's items now. Industrial batteries, mystery meat included.",
      "Jax hits the North entrance before rival crews notice. 50 CAPS, 2-3 hours, probably edible loot.",
      "The old Costco hasn't been fully picked over. Yet. Jax knows the way. Bring your own bags.",
    ]);
  }

  // Tech Store Heist
  if (msg.includes('tech store') || msg.includes('cyber-viper') || msg.includes('best buy') || msg.includes('night raid')) {
    return pickRandom([
      "Cyber-Viper's Tech Store Heist: Night raids are her specialty. The Best Buy has power somehow. We don't ask how.",
      "45% success rate. Security drones that weren't there before The Event. Bring EMP grenades. 200 CAPS.",
      "GPUs (untested), solar cells, one working laptop (maybe). Cyber-Viper knows the blind spots. Mostly.",
      "Night raids with Viper: You want that tech? You take those risks. Server hard drives don't raid themselves.",
    ]);
  }

  // Pharmacy Run
  if (msg.includes('pharmacy run') || msg.includes('doc holliday') || msg.includes('walgreens') || msg.includes('medicine')) {
    return pickRandom([
      "Doc Holliday's Pharmacy Run: The holy grail of medicine. 30% success rate. He's lost 3 party members. Worth it? He says yes.",
      "The Vault pharmacy run: 500 CAPS, all day, military-grade antibiotics. The people Doc lost probably wouldn't agree it was worth it.",
      "15km into Red Zone. Suicide mission difficulty. But those experimental meds saved his entire sector.",
      "Doc Holliday keeps going back. Same Walgreens. Same odds. Different volunteers. Medicine is everything now.",
    ]);
  }

  // Library Expedition
  if (msg.includes('library') || msg.includes('librarian') || msg.includes('knowledge') || msg.includes('books')) {
    return pickRandom([
      "The Library Expedition: 95% success rate! Main danger is the sprinkler system and The Librarian's emotional attachment to Shakespeare.",
      "20 CAPS for knowledge. The Librarian refuses to leave without EVERYTHING. She cries. We respect it.",
      "Easy difficulty. Free library card included. Card doesn't work anymore. Neither does society.",
      "Pre-war newspapers, data storage, the last printed encyclopedia. The Librarian will protect them with her life.",
    ]);
  }

  // Military Base Infiltration
  if (msg.includes('military base') || msg.includes('sgt. steele') || msg.includes('sergeant steele') || msg.includes('fort knox')) {
    return pickRandom([
      "Sgt. Steele's Military Base Infiltration: Fort Knox wasn't protecting gold. Automated defenses still running.",
      "300 CAPS, 6-8 hours. Steele knows the override codes. She says. We've made it out 4 times. Lost 2 people. 'Acceptable losses.'",
      "Real weapons. Real ammo. MREs that haven't expired. Night vision goggles. 55% odds of getting any of it.",
      "Steele's runs are Extreme difficulty. But those weapons aren't going to liberate themselves.",
    ]);
  }

  // Gas Station Scavenge
  if (msg.includes('gas station') || msg.includes('fuel finder') || msg.includes('fred') || msg.includes('gasoline')) {
    return pickRandom([
      "Fuel Finder Fred's Gas Station Scavenge: Fuel is the new gold. Fred knows every underground tank in 50km.",
      "75 CAPS, 80% success rate. Bonus: Twinkies from 2024. They really do last forever.",
      "Fred's specialty is untapped stations. Danger depends on who else figured out the same spot.",
      "Motor oil, tools, surprisingly edible snacks. Medium difficulty. Just don't let Fred start talking about fuel efficiency.",
    ]);
  }

  // General raid/experience queries
  if (msg.includes('experience') || msg.includes('adventure')) {
    return pickRandom([
      "Looking for experiences? We offer raids from 'Easy book run' to 'Suicide Mission pharmacy.' Pick your poison.",
      "Adventures range from 20 CAPS library trips to 500 CAPS medicine runs. Return rates vary... dramatically.",
      "Our experiences come with complimentary waivers. Sign here, here, and initial by 'next of kin.'",
      "Want adventure? We have 6 active raid parties. Success rates from 30% to 95%. Choose wisely.",
    ]);
  }

  // Keyword-based responses
  const responses: Record<string, string[]> = {
    radiation: [
      "Current radiation levels are 'Spicy'. Wear lead underwear.",
      "Radiation? Think of it as free heating. Just don't lick the walls.",
      "I'm detecting 3.6 roentgen. Not great, not terrible.",
      "Good news: You're glowing! Bad news: That's not a metaphor.",
      "The rad levels are high enough to make your descendants interesting.",
    ],
    food: [
      "I recommend the 50-year-old spam. It has evolved into a new lifeform, but is protein-rich.",
      "Food is overrated. Have you tried photosynthesis?",
      "The canned beans expired in 2027, but that's more of a suggestion than a rule.",
      "Eating is for quitters. Real survivors photosynthesize.",
      "Our pantries are stocked with vintage 2019 ramen. It's basically cheese now.",
    ],
    safe: [
      "Safety is an illusion. But check out our 'Bunker' packages.",
      "Define 'safe'. We guarantee at least 48 hours. Usually.",
      "Our bunkers are 99.7% safe. The 0.3% is just... character building.",
      "Safe? In THIS economy? Try 'less likely to die immediately.'",
      "I've seen garden sheds safer than most places. Ours are at least 3% better.",
    ],
    price: [
      "Bottle Caps are the new Bitcoin. Actually, they're worth MORE than Bitcoin now.",
      "Our prices are competitive. The competition is mostly dead, but still.",
      "Everything's negotiable when society collapses. Except our commission.",
      "Caps, Bitcoin, or your firstborn. We accept all major currencies.",
      "Prices include oxygen tax. Democracy tax was eliminated in The Event.",
    ],
    location: [
      "Location, location, radiation. The three rules of post-apocalyptic real estate.",
      "We have bunkers from Alaska to Zaire. Assuming those places still exist.",
      "Check our map. The red zones are 'spicy', green zones are 'alive-ish'.",
      "Geography is fluid now. Most of Florida is underwater. Again.",
      "Our properties span 3 continents and 2 dimensions. Don't ask about the second one.",
    ],
    book: [
      "Ready to book? You won't be charged until the nukes launch. That's our guarantee!",
      "Booking is easy: Pick a bunker, pay in CAPS, survive. Step 3 is optional.",
      "Let me find available bunkers in your preferred 'not-dead' zone.",
      "I'll start the booking process. Please have your next-of-kin info ready.",
      "Booking now! Would you like to add mutant insurance for 50 CAPS?",
    ],
    help: [
      "I'm here to help! My assistance has a 78% non-fatality rate.",
      "How can I assist your survival? Options: A) Bunkers B) Raids C) Prayers",
      "Need help? I have answers to questions you didn't know you had.",
      "Assistance is my middle name. My first name is 'Questionable'.",
    ],
    bunker: [
      "Our bunkers range from 'cozy coffin' to 'underground mansion'.",
      "We have 602 bunkers available. 601 if you don't count the haunted one.",
      "Bunkers come with air, walls, and hope. First two guaranteed.",
      "Looking for a bunker? Wise choice. Surface dwelling is so 2024.",
    ],
    raid: [
      "Raid parties depart hourly! Return rates vary by 'extreme' amounts.",
      "Join a raid! We provide weapons. Medical care sold separately.",
      "Our raids have a 60% success rate. The other 40%... well.",
      "Interested in raiding? Great! Sign this waiver and your will.",
    ],
    host: [
      "Want to be a host? List your bunker and charge desperate people rent. It's the American dream!",
      "Hosting is easy! Just register your shelter and wait for the caps to roll in.",
      "Become a Warlord Host today! Exploit—I mean, help survivors.",
    ],
    mutant: [
      "Mutants are surprisingly good tenants. They don't complain much.",
      "We have a strict 'no mutants' policy in most bunkers. Emphasis on 'most'.",
      "Mutant sightings should be reported immediately. Or adopted. Your call.",
    ],
    water: [
      "Water is recycled up to 7 times. Don't think about it too hard.",
      "Our water sources are 'mostly' uncontaminated. Boil before drinking.",
      "H2O? More like H2-Ohno. But it's wet and that's what counts.",
    ],
    oxygen: [
      "Oxygen is included! We even filter out most of the toxins.",
      "Air quality is 'breathable'. That's the technical term.",
      "O2 levels maintained at 'survivable'. You're welcome.",
    ],
  };

  // Check for keywords
  for (const [keyword, responseArray] of Object.entries(responses)) {
    if (msg.includes(keyword)) {
      return pickRandom(responseArray);
    }
  }

  // Question detection
  if (msg.includes('?')) {
    return pickRandom([
      "Excellent question. The answer is 'maybe, but probably not.'",
      "I would answer, but my ethics subroutines are malfunctioning. Again.",
      "That's classified. Or I don't know. One of those.",
      "Interesting query. Have you considered running instead?",
    ]);
  }

  // Default responses
  return pickRandom([
    "I cannot calculate that. Have you tried hiding under a desk?",
    "Interesting. Have you considered... not doing that?",
    "My database was corrupted in The Event. Please rephrase.",
    "Error 404: Hope not found. Try searching for bunkers instead.",
    "I'm an AI trained on pre-war data. Things have changed. Dramatically.",
    "That's beyond my programming. But I can recommend a bunker!",
    "Fascinating. Would you like to book a shelter now?",
    "I don't understand. But survival waits for no one. Check our listings!",
  ]);
};

function pickRandom<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}
