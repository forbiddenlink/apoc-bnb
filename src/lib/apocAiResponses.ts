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
