import { Bunker } from "@/types";

export const mockBunkers: Bunker[] = [
  {
    id: "bunker-1",
    title: "The Deep Earth Citadel",
    description: "Decomissioned missile silo with 12-foot concrete walls",
    longDescription: `Former ICBM silo that was *supposed* to be decommissioned in 1998. Oops.

Descend 300 feet into 12-foot concrete walls, a climate-controlled command center (originally designed to survive a direct hit), and a fully operational hydroponic garden staffed by... well, let's call them 'dedicated staff.'

Our flagship feature: the Lead-Lined Spa. Originally a decontamination chamber during the Cold War, now a luxury wellness experience. Bathing in 3 inches of lead-infused water has NEVER made survivors feel more secure.

The scratching sounds in the walls? Just the water recycling system. Probably. Commander Shepard is very reassuring about it.

WARNING: Surface excursions at your own risk. We keep a tally board. Current record: 47 minutes.`,
    location: {
      name: "Sector 7",
      coordinates: [-74.006, 40.7128],
      region: "North American Fallout Zone",
    },
    price: {
      caps: 420,
      btc: 0.042,
    },
    rating: 4.98,
    reviewCount: 12,
    images: [
      "https://images.unsplash.com/photo-1541123603104-512919d6a96c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1517331156700-3c241d2b4d83?w=800&h=600&fit=crop",
    ],
    amenities: [
      { id: "1", name: "O2 Scrubbers (99.9% Pure)", icon: "wind", available: true },
      { id: "2", name: "Blast Doors (Class A)", icon: "shield", available: true },
      { id: "3", name: "Ham Radio Station", icon: "radio", available: true },
      { id: "4", name: "Internet", icon: "wifi-off", available: false },
      { id: "5", name: "Hydroponic Garden", icon: "leaf", available: true },
      { id: "6", name: "Lead-Lined Spa", icon: "sparkles", available: true },
    ],
    host: {
      id: "host-1",
      name: "Commander Shepard",
      avatar: "/avatars/commander.png",
      isSuperhost: true,
      yearsHosting: 3,
      bio: "Former NASA flight director who commandeered this missile silo during the Initial Event while everyone else was panic-buying toilet paper. Runs the bunker like a spacecraft: airlock protocols, mandatory decontamination showers, and a disturbing amount of Tang. Will give you a 47-minute briefing on oxygen recycler maintenance whether you want it or not. House rules include no whistling (attracts tunnel creatures), no mentioning the 'scratching sounds,' and absolutely no questions about the locked sub-level. Communicates exclusively in military time and astronaut jargon.",
    },
    capacity: 8,
    features: {
      radLevel: 2,
      oxygenPurity: 99.9,
      depth: 300,
      blastDoorRating: "Class A",
      powerSource: "Nuclear Generator",
      waterSource: "Underground Aquifer",
    },
    tags: ["Rad-Free", "Mutant-Proof", "Cannibal-Free", "Luxury"],
    availability: true,
    bannedItems: [
      "Pre-war optimism",
      "Emotional baggage (physical baggage limit: 2 bags)",
      "Whistling (attracts tunnel creatures)",
      "Questions about Sub-Level 7",
      "Geiger counters (ruins the vibe)",
      "That look of hope in your eyes",
    ],
  },
  {
    id: "bunker-2",
    title: "Vault 101 Replica",
    description: "Authentic pre-war vault experience with modern amenities",
    longDescription: `Step into history with this meticulously recreated Vault-Tec facility. Complete with original fixtures, vintage terminals, and that classic vault smell (radiation-free, we promise).

The Overseer runs this place like it's 2077. Immersive experience. VERY immersive. He might role-play. He probably will. Jumpsuit provided. Wearing it is "strongly encouraged."

The G.E.C.K. is listed as unavailable because it never existed. We asked. The Overseer got emotional. Don't bring it up.

Previous guests have reported hearing the Pip-Boy startup sound in their dreams for weeks afterward. We consider this a feature, not a bug.`,
    location: {
      name: "Zone 4",
      coordinates: [-118.2437, 34.0522],
      region: "West Coast Wasteland",
    },
    price: {
      caps: 350,
      btc: 0.035,
    },
    rating: 4.85,
    reviewCount: 28,
    images: [
      "https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1551269901-5c5e14c25df7?w=800&h=600&fit=crop",
    ],
    amenities: [
      { id: "1", name: "Air Filtration", icon: "wind", available: true },
      { id: "2", name: "Security System", icon: "shield", available: true },
      { id: "3", name: "Vintage Terminal", icon: "monitor", available: true },
      { id: "4", name: "G.E.C.K.", icon: "package", available: false },
    ],
    host: {
      id: "host-2",
      name: "The Overseer",
      avatar: "/avatars/overseer.png",
      isSuperhost: true,
      yearsHosting: 5,
      bio: "Real name: Gerald. Pre-apocalypse occupation: Assistant Regional Manager at a mid-tier insurance firm. Built this vault replica as a 'hobby project' in 2019 and has been waiting for this moment ever since. Now fully committed to the bit. Will only respond to 'Overseer' and speaks exclusively in vaguely threatening corporate announcements. House rules are posted on terminals throughout the facility in Vault-Tec font. Demerits are issued. Nobody knows what happens at 10 demerits because nobody has tested Gerald. Messages guests with: 'Vault-Tec reminds you that compliance is mandatory. Breakfast is at 0700. Sincerely, The Overseer.'",
    },
    capacity: 12,
    features: {
      radLevel: 1,
      oxygenPurity: 98.5,
      depth: 250,
      blastDoorRating: "Vault-Tec Standard",
      powerSource: "Fusion Core",
      waterSource: "Purified Reservoir",
    },
    tags: ["Rad-Free", "Vintage", "High-Capacity"],
    availability: true,
    bannedItems: [
      "Non-Vault-Tec branded items",
      "Memories of the surface",
      "The word 'outside'",
      "Complaints (file Form 27-B/6 instead)",
      "Asking about the G.E.C.K.",
      "Civilian clothing (jumpsuits provided)",
      "Free will (temporarily suspended during stay)",
    ],
  },
  {
    id: "bunker-3",
    title: "The Silo Complex",
    description: "Military-grade protection with 5-star amenities",
    longDescription: `Former ICBM launch facility converted into the ultimate survival suite. 8-foot steel doors, redundant power systems, and enough supplies for a decade. General Winters runs it with military precision.

Wake-up call at 0600. Mandatory. Breakfast is served at 0630. Attendance is "optional" (it's not optional). Room inspection happens. You will pass.

The armory access is real. The weapons are real. The training is mandatory if you want to touch anything. General Winters has a "one accident" policy. Nobody knows what happened after the one accident.

Best for: Survivors who need structure. People fleeing chaos. Anyone who responds well to being yelled at affirmatively.`,
    location: {
      name: "Sector 12",
      coordinates: [-87.6298, 41.8781],
      region: "Midwest Dead Zone",
    },
    price: {
      caps: 580,
      btc: 0.058,
    },
    rating: 4.92,
    reviewCount: 8,
    images: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1598928506311-c55ez9a9c8fa?w=800&h=600&fit=crop",
    ],
    amenities: [
      { id: "1", name: "Military-Grade Filtration", icon: "wind", available: true },
      { id: "2", name: "Armory Access", icon: "crosshair", available: true },
      { id: "3", name: "Satellite Uplink", icon: "satellite", available: true },
      { id: "4", name: "Escape Tunnel", icon: "map", available: true },
    ],
    host: {
      id: "host-3",
      name: "General Winters",
      avatar: "/avatars/general.png",
      isSuperhost: false,
      yearsHosting: 1,
      bio: "Self-appointed rank. Pre-war career: CrossFit instructor and weekend paintball referee. Seized this military installation during the chaos by simply walking in with a clipboard and acting like he belonged. Now runs it with the intensity of someone who has definitely memorized Sun Tzu quotes. House rules are shouted, not posted. Bed checks happen. Push-ups are 'encouraged' for minor infractions. Responds to all messages within 30 seconds, usually in all caps, always ending with 'HOOAH.' Not a Superhost because three guests filed complaints about mandatory 5AM drills. He considers this a badge of honor.",
    },
    capacity: 6,
    features: {
      radLevel: 4,
      oxygenPurity: 97.0,
      depth: 400,
      blastDoorRating: "Military Spec",
      powerSource: "Solar + Backup Diesel",
      waterSource: "Rainwater Collection",
    },
    tags: ["High Security", "Armed Guards", "Military"],
    availability: true,
    bannedItems: [
      "Sleeping past 0600",
      "The phrase 'just five more minutes'",
      "Unmade beds",
      "Weakness",
      "Questions about the 'one accident'",
      "Decaf coffee",
      "Participation trophies",
    ],
  },
  {
    id: "bunker-4",
    title: "Cozy Underground Haven",
    description: "The Honest Budget Bunker - No Frills, No Thrills, Just Survival",
    longDescription: `This isn't your luxury vault. It's a converted grain silo filled with hand-me-down cots, a temperamental air filter from 2022, and that smell nobody wants to talk about.

But here's the thing: it works. You'll survive. Your neighbors might hear you. The WiFi definitely won't work. And that stain on the wall? It was there when Wasteland Willie took over the lease.

Perfect for: solo survivors, people bad at making decisions, anyone who says "how bad could it be?" The answer is: not that bad, actually. Willie's honest about everything. Refreshingly so.

Amenities include: Steel door (it sticks sometimes), 'air' filtration (we assume the air is being filtered), and canned goods (expiration dates are more of a suggestion post-apocalypse).`,
    location: {
      name: "Safe Zone Alpha",
      coordinates: [-95.3698, 29.7604],
      region: "Southern Territories",
    },
    price: {
      caps: 150,
      btc: 0.015,
    },
    rating: 4.3,
    reviewCount: 45,
    images: [
      "https://images.unsplash.com/photo-1558618047-f4b511abca86?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
    ],
    amenities: [
      { id: "1", name: "Basic Air Filter", icon: "wind", available: true },
      { id: "2", name: "Steel Door", icon: "shield", available: true },
      { id: "3", name: "Canned Food Stock", icon: "package", available: true },
    ],
    host: {
      id: "host-4",
      name: "Wasteland Willie",
      avatar: "/avatars/willie.png",
      isSuperhost: false,
      yearsHosting: 2,
      bio: "Former used car salesman, and honestly? The apocalypse hasn't changed his energy much. Willie survived the Initial Event by hiding in this grain silo for three days eating nothing but expired ranch dressing. Now he's making the best of it. What you see is what you get: working door, mostly-filtered air, and canned beans that probably won't kill you. House rules: don't ask about the stain, don't touch Willie's bean stash, and if something breaks, just jiggle it. Messages guests like he's texting a buddy: 'hey man door sticks sometimes just give it a good kick. see u soon - W'",
    },
    capacity: 4,
    features: {
      radLevel: 3,
      oxygenPurity: 95.0,
      depth: 50,
      blastDoorRating: "Standard",
      powerSource: "Generator",
      waterSource: "Well",
    },
    tags: ["Budget", "Basic Amenities"],
    availability: true,
    bannedItems: [
      "Expectations",
      "Questions about the stain",
      "Touching Willie's bean stash",
      "Fancy words like 'amenities'",
      "That attitude",
      "Glowing pets (non-glowing pets negotiable)",
    ],
  },
  {
    id: "bunker-5",
    title: "Orbital Safe House",
    description: "Space station suite with zero radiation guarantee",
    location: {
      name: "Low Earth Orbit",
      coordinates: [0, 0],
      region: "Space",
    },
    price: {
      caps: 2000,
      btc: 0.2,
    },
    rating: 5.0,
    reviewCount: 3,
    images: [
      "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1457364887197-9150188c107b?w=800&h=600&fit=crop",
    ],
    amenities: [
      { id: "1", name: "Zero Gravity Experience", icon: "rocket", available: true },
      { id: "2", name: "Earth Views", icon: "globe", available: true },
      { id: "3", name: "Recycled Air", icon: "wind", available: true },
      { id: "4", name: "Space Suit Included", icon: "shield", available: true },
    ],
    host: {
      id: "host-5",
      name: "Captain Cosmos",
      avatar: "/avatars/cosmos.png",
      isSuperhost: true,
      yearsHosting: 1,
      bio: "Actual astronaut. Was on the ISS when everything happened below. Watched the whole thing through the cupola with a bag of freeze-dried ice cream. Has not emotionally processed this. Now rents out the station because, quote, 'What else am I going to do up here?' House rules include no crying near the electronics, mandatory awe at Earth views, and absolutely no discussing 'what it used to look like.' Communication style is aggressively cheerful in a way that suggests deep psychological compartmentalization. Signs off every message with 'Stay stellar!' followed by exactly three star emojis.",
    },
    capacity: 2,
    features: {
      radLevel: 0,
      oxygenPurity: 100,
      depth: 0,
      blastDoorRating: "Airlock Sealed",
      powerSource: "Solar Panels",
      waterSource: "Recycled",
    },
    tags: ["Luxury", "Zero-Rad", "Space", "Premium"],
    availability: false,
    bannedItems: [
      "Gravity",
      "Discussions about 'what it used to look like'",
      "Crying near the electronics",
      "More than 3 consecutive minutes of staring at Earth",
      "The concept of 'down'",
      "Unsealed beverages",
      "Existential dread (save it for therapy)",
    ],
  },
  {
    id: "bunker-6",
    title: "Mountain Fortress",
    description: "Hollowed-out mountain with natural protection",
    location: {
      name: "Rocky Peaks",
      coordinates: [-105.2705, 40.015],
      region: "Mountain Territory",
    },
    price: {
      caps: 680,
      btc: 0.068,
    },
    rating: 4.75,
    reviewCount: 19,
    images: [
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=800&h=600&fit=crop",
    ],
    amenities: [
      { id: "1", name: "Natural Rock Shield", icon: "mountain", available: true },
      { id: "2", name: "Underground Lake", icon: "droplet", available: true },
      { id: "3", name: "Cave System", icon: "map", available: true },
      { id: "4", name: "Geothermal Heating", icon: "flame", available: true },
    ],
    host: {
      id: "host-6",
      name: "Mountain Man Mike",
      avatar: "/avatars/mike.png",
      isSuperhost: true,
      yearsHosting: 4,
      bio: "Was living in this mountain before the apocalypse. The apocalypse actually improved his social life. Former 'off-grid lifestyle influencer' with 12 YouTube subscribers (all bots, he suspects). Had been preparing for societal collapse since 2015, so when it finally happened, his main emotion was vindication. House rules are carved into wooden plaques throughout the cave system. No synthetic fabrics. No complaining about the lack of phone signal. Composting toilet is non-negotiable. Communicates through handwritten notes delivered by a raven he trained. The raven's name is also Mike. He will not explain this.",
    },
    capacity: 10,
    features: {
      radLevel: 1,
      oxygenPurity: 98.0,
      depth: 200,
      blastDoorRating: "Reinforced Steel",
      powerSource: "Geothermal",
      waterSource: "Underground Lake",
    },
    tags: ["Natural Protection", "Scenic", "High-Capacity"],
    availability: true,
    bannedItems: [
      "Synthetic fabrics",
      "Phone signal complaints",
      "Questions about the other Mike (the raven)",
      "Flashlights with batteries (torches only)",
      "Disrespecting the composting toilet",
      "Modern concepts of time",
      "Shoes with arch support (we suffer as nature intended)",
    ],
  },
];

export const getBunkerById = (id: string): Bunker | undefined => {
  return mockBunkers.find((bunker) => bunker.id === id);
};

export const filterBunkers = (filters: Partial<{
  maxPrice: number;
  minRating: number;
  radFree: boolean;
  location: string;
}>): Bunker[] => {
  return mockBunkers.filter((bunker) => {
    if (filters.maxPrice && bunker.price.caps > filters.maxPrice) return false;
    if (filters.minRating && bunker.rating < filters.minRating) return false;
    if (filters.radFree && bunker.features.radLevel > 2) return false;
    if (filters.location && !bunker.location.name.toLowerCase().includes(filters.location.toLowerCase())) return false;
    return bunker.availability;
  });
};
