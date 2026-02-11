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
      "/images/bunker1-silo.png",
      "/images/bunker1-spa.png",
      "/images/armory.png",
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
      quirk: "military",
      quirkLabel: "HOOAH!",
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
      quirk: "obsessive",
      quirkLabel: "MANDATORY",
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
      quirk: "intense",
      quirkLabel: "DISCIPLINE!",
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
      quirk: "eccentric",
      quirkLabel: "BUDGET BOSS",
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
      "/images/bunker5-space-station.png",
      "/images/bunker5-earth-view.png",
      "/images/bunker5-interior.png",
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
      quirk: "caring",
      quirkLabel: "SPACE CARE",
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
      "/images/bunker6-underground-lake.png",
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
      quirk: "eccentric",
      quirkLabel: "OFF-GRID",
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
  {
    id: "bunker-7",
    title: "Atlantis Research Station",
    description: "Converted submarine research facility. Definitely not leaking.",
    longDescription: `Welcome to the ocean floor. Captain Nemo (definitely not his real name, probably Dave) converted this decommissioned submarine research station into a "unique underwater experience."

The pressure is constant. The smell is... fish. Always fish. He insists it's "atmospheric branding." Previous guests have described it as "aggressive marine ambiance."

Pros: Incredible ocean views. Zero surface radiation. Spectacular bioluminescence at night. 

Cons: That smell. The creaking sounds (probably the hull settling, maybe). Fish. So many fish. They watch you. Captain Nemo watches them watch you. It's a whole thing.

WARNING: Do not tap on the glass. The octopus takes it personally.`,
    location: {
      name: "Coastal Shelf",
      coordinates: [-75.5, 36.8],
      region: "Atlantic Depth Zone",
    },
    price: {
      caps: 520,
      btc: 0.052,
    },
    rating: 4.65,
    reviewCount: 18,
    images: [
      "/images/hero-bunker.png",
      "/images/hydroponics.png",
      "/images/armory.png",
    ],
    amenities: [
      { id: "1", name: "Pressure-Regulated Air", icon: "wind", available: true },
      { id: "2", name: "Submarine Airlocks", icon: "shield", available: true },
      { id: "3", name: "Ocean Floor Views", icon: "eye", available: true },
      { id: "4", name: "Escape Pod", icon: "rocket", available: true },
      { id: "5", name: "Dehumidifier", icon: "droplet", available: false },
    ],
    host: {
      id: "host-7",
      name: "Captain Nemo",
      avatar: "/avatars/nemo.png",
      isSuperhost: false,
      yearsHosting: 2,
      bio: "Real name is almost certainly Dave. Pre-Event career: Marine biologist who 'borrowed' this research station when everything went south. Has been underwater ever since. Communicates primarily in nautical metaphors nobody understands. House rules are presented as 'Maritime Law' (it's not). Lectures guests about respecting the ocean. The fish. The ecosystem. Mostly the fish. Messages contain unnecessary sailor slang. Signs off with 'Fair winds and following seas' even though there are no winds 200 feet underwater. Refuses to acknowledge the smell.",
      quirk: "caring",
      quirkLabel: "AQUA-CAPTAIN",
    },
    capacity: 6,
    features: {
      radLevel: 0,
      oxygenPurity: 97.5,
      depth: 200,
      blastDoorRating: "Submarine Grade",
      powerSource: "Tidal Generator",
      waterSource: "Desalination + Prayer",
    },
    tags: ["Rad-Free", "Aquatic", "Unique Experience", "Smells Like Fish"],
    availability: true,
    bannedItems: [
      "Tapping on the glass",
      "Jokes about 'sleeping with the fishes'",
      "Asking 'what's that smell?'",
      "Questions about Dave",
      "Showing the octopus your phone (she gets jealous)",
      "Land-lubber attitudes",
    ],
  },
  {
    id: "bunker-8",
    title: "The Galleria Fortress",
    description: "Luxury mall turned survival settlement. Still has a food court.",
    longDescription: `Karen didn't just survive the apocalypse. She THRIVED. This former regional shopping mall is now the most organized fortress in the wasteland.

The Apple Store is her personal quarters (glass walls intact, somehow). The food court is a fully operational mess hall. Hot Topic is the armory. Spencer's is... we don't talk about Spencer's.

Strict house rules enforced: Shoes required. Shirts required. Attitude adjustment required. She WILL ask to speak to your previous host if there are issues.

The fountain still works. Nobody knows how. Karen knows. Karen isn't telling.

Fun fact: The mall walkers never stopped. There are elderly survivors who do laps every morning at 6 AM. They predate the apocalypse. They might predate the mall.`,
    location: {
      name: "Retail District",
      coordinates: [-93.2, 44.95],
      region: "Midwest Dead Zone",
    },
    price: {
      caps: 380,
      btc: 0.038,
    },
    rating: 4.88,
    reviewCount: 42,
    images: [
      "/images/armory.png",
      "/images/hero-bunker.png",
      "/images/raid-supermarket.png",
    ],
    amenities: [
      { id: "1", name: "Food Court Kitchen", icon: "utensils", available: true },
      { id: "2", name: "Mall Security", icon: "shield", available: true },
      { id: "3", name: "Central Heating/AC", icon: "wind", available: true },
      { id: "4", name: "Movie Theater (No Films)", icon: "film", available: false },
      { id: "5", name: "Fountain", icon: "droplet", available: true },
    ],
    host: {
      id: "host-8",
      name: "Karen the Warlord",
      avatar: "/avatars/karen.png",
      isSuperhost: true,
      yearsHosting: 3,
      bio: "Embracing the name. Pre-Event: PTA president, HOA board member, holder of many opinions. When society collapsed, she simply... transferred her organizational skills to militia management. Runs the mall with the efficiency of someone who once got a Starbucks employee fired over foam consistency. House rules are laminated and numbered. Violations result in 'managerial discussions.' Has a suggestion box. Nobody uses it. She checks it daily anyway. Messages guests with reservation details, check-in instructions, and a PDF of expectations. Read the PDF. Seriously. She'll quiz you.",
      quirk: "dangerous",
      quirkLabel: "RETAIL RAGE",
    },
    capacity: 20,
    features: {
      radLevel: 2,
      oxygenPurity: 98.2,
      depth: 0,
      blastDoorRating: "Reinforced Retail",
      powerSource: "Solar Panels on Roof",
      waterSource: "Rainwater Collection + Fountain",
    },
    tags: ["High-Capacity", "Organized", "Food Court", "Shoes Required"],
    availability: true,
    bannedItems: [
      "Bare feet (she will notice)",
      "Food outside the food court",
      "Not reading the PDF",
      "Asking to speak to HER manager",
      "Loitering (this is enforced)",
      "Skateboarding (pre-apocalypse sign still applies)",
    ],
  },
  {
    id: "bunker-9",
    title: "Reactor Core Penthouse",
    description: "Nuclear power plant control room. Warm. Very warm. Glowing reviews.",
    longDescription: `Dr. Glow's skin has a slight luminescence. She says it's from the reactor instrumentation. Nobody believes her. Nobody asks follow-up questions.

This converted nuclear plant control room offers UNLIMITED power. Free electricity. Free heating. Free... ambient radiation (very low doses, she promises).

The viewing platform overlooks the reactor core. At night, it provides romantic mood lighting (Cherenkov radiation blue). Complimentary iodine tablets at check-in.

Previous guest review: "Slept great. Woke up with more energy than I've had in years. Possibly literally." - 5 stars

Dr. Glow is technically a doctor. Of physics. Not medicine. This is important to clarify before you ask her to look at that rash.`,
    location: {
      name: "Reactor Complex",
      coordinates: [-84.3, 33.8],
      region: "Industrial Wasteland",
    },
    price: {
      caps: 450,
      btc: 0.045,
    },
    rating: 4.72,
    reviewCount: 31,
    images: [
      "/images/hero-bunker.png",
      "/images/armory.png",
      "/images/hydroponics.png",
    ],
    amenities: [
      { id: "1", name: "Unlimited Power", icon: "zap", available: true },
      { id: "2", name: "Reactor Core Views", icon: "eye", available: true },
      { id: "3", name: "Geiger Counter (Guest Use)", icon: "activity", available: true },
      { id: "4", name: "Iodine Tablets", icon: "shield", available: true },
      { id: "5", name: "Medical Staff", icon: "heart", available: false },
    ],
    host: {
      id: "host-9",
      name: "Dr. Glow",
      avatar: "/avatars/glow.png",
      isSuperhost: true,
      yearsHosting: 2,
      bio: "PhD in Nuclear Physics, Masters in making questionable life choices. Was working at the plant during The Event. Stayed. Never left. Possibly can't leave (she's very vague about this). Glows slightly in dim lighting. House rules include mandatory dosimeter wearing, no swimming in the cooling pools, and absolutely no DIY nuclear experiments. Very insistent on that last one for some reason. Messages contain reactor stats, safety briefings, and casual mentions of 'acceptable radiation levels.' Enthusiastic about science. Possibly too enthusiastic. Describes the reactor as 'spicy but safe.'",
      quirk: "eccentric",
      quirkLabel: "GLOWING",
    },
    capacity: 8,
    features: {
      radLevel: 3,
      oxygenPurity: 98.8,
      depth: 0,
      blastDoorRating: "Reactor Containment",
      powerSource: "Nuclear Reactor (Still Running)",
      waterSource: "Cooling System Runoff (Filtered)",
    },
    tags: ["Unlimited Power", "Unique Experience", "Warm", "Science-y"],
    availability: true,
    bannedItems: [
      "Geiger counters from home (causes anxiety)",
      "Questions about the glow",
      "Anti-nuclear activists",
      "Swimming in ANY pool without asking first",
      "Touching the buttons (seriously, DON'T)",
      "Asking if she's okay",
    ],
  },
  {
    id: "bunker-10",
    title: "Cathedral of Second Chances",
    description: "Gothic mega-church sanctuary. Sermons mandatory. Worth it.",
    longDescription: `Reverend Rapture is waiting for the SECOND apocalypse. This one was just a warm-up.

This converted mega-church seats 2,000. Currently houses 40. The acoustics are incredible. The reverend's Sunday sermons are... long. Very long. They cover surviving the apocalypse, preparing for the next one, and a surprising amount of structural engineering.

The stained glass windows are boarded up (reverently). The baptismal pool is now water storage (blessed, obviously). The pews are beds (surprisingly comfortable).

Attendance is "optional" (it's not). Services are at 10 AM Sunday. And Wednesday. And Friday evening "crisis prayer." The reverend considers apocalypse survival a team sport.

Bonus: The organ still works. The reverend plays it. Often. At 6 AM. To wake everyone. "Joyfully."`,
    location: {
      name: "Faith District",
      coordinates: [-96.8, 32.95],
      region: "Southern Territories",
    },
    price: {
      caps: 200,
      btc: 0.02,
    },
    rating: 4.55,
    reviewCount: 67,
    images: [
      "/images/hero-bunker.png",
      "/images/hydroponics.png",
      "/images/raid-pharmacy.png",
    ],
    amenities: [
      { id: "1", name: "High Capacity Shelter", icon: "users", available: true },
      { id: "2", name: "Community Kitchen", icon: "utensils", available: true },
      { id: "3", name: "Blessed Water Supply", icon: "droplet", available: true },
      { id: "4", name: "Organ Music (6 AM)", icon: "music", available: true },
      { id: "5", name: "Skip Services", icon: "x", available: false },
    ],
    host: {
      id: "host-10",
      name: "Reverend Rapture",
      avatar: "/avatars/rapture.png",
      isSuperhost: false,
      yearsHosting: 3,
      bio: "Pre-Event: Mega-church pastor with a flair for dramatic sermons. Post-Event: Same, but vindicated. Sees The Event as 'Act One' of a larger divine plan. Sermons now include practical survival tips, theological debate, and PowerPoint presentations (generator-powered). House rules are treated as spiritual guidance. Attendance is love. Participation is mandatory love. Messages guests with service schedules, inspirational quotes, and reminders that 'the next one could happen ANY TIME so BE READY.' Genuinely kind. Exhaustingly optimistic. Plays organ like he's summoning angels. Might be.",
      quirk: "obsessive",
      quirkLabel: "BLESSED",
    },
    capacity: 40,
    features: {
      radLevel: 1,
      oxygenPurity: 97.8,
      depth: 0,
      blastDoorRating: "Oak Doors (Blessed)",
      powerSource: "Generator + Faith",
      waterSource: "Baptismal Pool Reserve",
    },
    tags: ["Budget", "High-Capacity", "Community", "Spiritual"],
    availability: true,
    bannedItems: [
      "Skipping services (seriously don't)",
      "Disrespecting the organ",
      "Asking 'when will this end' (NEVER)",
      "Sleeping during sermons (he notices)",
      "Atheist debates (banned after 'The Incident')",
      "Complaining about 6 AM wake-up calls",
    ],
  },
  {
    id: "bunker-11",
    title: "Terminal Sanctuary",
    description: "International airport terminal. Departures: None. Arrivals: You.",
    longDescription: `Flight Attendant Francine never stopped wearing the uniform. The planes aren't flying. The passengers are gone. The duty-free shop is now a trading post. But the SERVICE continues.

This converted international terminal offers spacious accommodations in former gate areas. Baggage claim is storage. TSA checkpoint is security. The Cinnabon is gone but the SMELL remains (nobody knows how).

Check-in includes a full safety demonstration: exits, oxygen masks, flotation devices. None of these things will help in the apocalypse. Francine doesn't care. PROTOCOL IS PROTOCOL.

Sleep in terminal chairs (surprisingly unchanged), former airline lounges (VIP guests), orgate areas (budget option). Departure boards still update. All flights show "DELAYED." Extremely accurate.

Warning: Francine WILL check your bags. Not for weapons. For organization. She has opinions. They are shared. Frequently.`,
    location: {
      name: "Transit Hub Zone",
      coordinates: [-73.85, 40.75],
      region: "North American Fallout Zone",
    },
    price: {
      caps: 320,
      btc: 0.032,
    },
    rating: 4.78,
    reviewCount: 53,
    images: [
      "/images/raid-tech.png",
      "/images/armory.png",
      "/images/hero-bunker.png",
    ],
    amenities: [
      { id: "1", name: "Spacious Terminal", icon: "maximize", available: true },
      { id: "2", name: "Duty-Free Trading Post", icon: "shopping-bag", available: true },
      { id: "3", name: "Moving Walkways (Broken)", icon: "trending-up", available: false },
      { id: "4", name: "Flight Attendant Service", icon: "smile", available: true },
      { id: "5", name: "Working Bathrooms", icon: "droplet", available: true },
    ],
    host: {
      id: "host-11",
      name: "Flight Attendant Francine",
      avatar: "/avatars/francine.png",
      isSuperhost: true,
      yearsHosting: 2,
      bio: "23 years with the airline. Never missed a shift. Not about to start now. Pre-Event: Senior flight attendant, employee of the month 47 times. Post-Event: Airport terminal manager, keeper of protocols, enforcer of checked bag policies. Still wears the uniform. Daily. It's pristine. How? Nobody asks. House rules are delivered as in-flight announcements. Expects you to put your seat back up (there are no seats, she means posture). Checks bags personally. Comments on packing efficiency. Messages include check-in times (exactly 2 hours early), baggage policies, and reminders to 'thank you for choosing Terminal Sanctuary' (you had limited choices).",
      quirk: "caring",
      quirkLabel: "IN-FLIGHT SERVICE",
    },
    capacity: 30,
    features: {
      radLevel: 2,
      oxygenPurity: 97.2,
      depth: 0,
      blastDoorRating: "Automatic Sliding Doors",
      powerSource: "Backup Generator",
      waterSource: "Airport Water System",
    },
    tags: ["High-Capacity", "Trading Post", "Unique", "Service Excellent"],
    availability: true,
    bannedItems: [
      "Liquids over 3oz (she's SERIOUS)",
      "Unorganized bags",
      "Standing during taxi/check-in",
      "Not paying attention to safety demo",
      "Asking when flights resume",
      "Disrespecting the uniform",
    ],
  },
  {
    id: "bunker-12",
    title: "Cell Block Luxury Suites",
    description: "Maximum security prison. Cells are cozy. Warden never left.",
    longDescription: `The prisoners left during The Event. Former Warden Walsh stayed. He finally got his dream: a quiet, orderly facility.

Each 'suite' is a former cell. 8x10 feet. Toilet included. Sink combo. Steel bed frame. Walsh calls them 'minimalist luxury.' Previous guests call them 'cells.' Both are correct.

Meals served through food slots. Yard time is 2-4 PM daily. Lockdown is 9 PM (he's flexible on weekends). The irony is not lost on guests. The irony is very lost on Walsh. He's living his best life.

Security is EXCELLENT. Nobody getting in here without permission. Nobody getting out either without permission. Walsh has the keys. All of them. He jingles when he walks.

Guard towers manned. Spotlights functional. Barbed wire fresh. This is the safest you'll ever feel in a prison. Probably.`,
    location: {
      name: "Correctional District",
      coordinates: [-122.1, 37.7],
      region: "West Coast Wasteland",
    },
    price: {
      caps: 280,
      btc: 0.028,
    },
    rating: 4.42,
    reviewCount: 38,
    images: [
      "/images/armory.png",
      "/images/hero-bunker.png",
      "/images/raid-supermarket.png",
    ],
    amenities: [
      { id: "1", name: "Maximum Security", icon: "shield", available: true },
      { id: "2", name: "Scheduled Yard Time", icon: "sun", available: true },
      { id: "3", name: "Cafeteria Meals", icon: "utensils", available: true },
      { id: "4", name: "Conjugal Visits", icon: "heart", available: false },
      { id: "5", name: "Early Release", icon: "unlock", available: false },
    ],
    host: {
      id: "host-12",
      name: "Former Warden Walsh",
      avatar: "/avatars/walsh.png",
      isSuperhost: false,
      yearsHosting: 2,
      bio: "34 years in corrections. Planned to retire. Then the world ended. Stayed. Best decision ever. Pre-Event: Prison warden who took the job VERY seriously. Post-Event: Same but happier. Finally has a facility that runs EXACTLY how he wants. No escapes. No riots. No problems. House rules are EXTENSIVE. Posted everywhere. Enforced cheerfully. Treats guests like minimum-security inmates (affectionately). Schedules are non-negotiable. Meals are...institutional. He's proud of them. Messages include: cell assignments, rule reminders, yard schedules. Signs off with inmate number. Your inmate number. He assigns them. For fun.",
      quirk: "intense",
      quirkLabel: "LAW & ORDER",
    },
    capacity: 24,
    features: {
      radLevel: 1,
      oxygenPurity: 96.5,
      depth: 0,
      blastDoorRating: "Maximum Security",
      powerSource: "Backup Generator",
      waterSource: "Municipal (Still Works)",
    },
    tags: ["Secure", "Budget", "Institutional", "Character-Building"],
    availability: true,
    bannedItems: [
      "Contraband (he has a list, it's long)",
      "Digging tools",
      "Hope of early checkout",
      "Complaints about accommodations",
      "Asking about his retirement plans",
      "Shivs (he checks)",
    ],
  },
  {
    id: "bunker-13",
    title: "Sky Tower Haven",
    description: "Desert water tower. High ground. Questionable amenities. Dan has WATER.",
    longDescription: `Aqua-Dan sits atop a converted water tower in the desert. The views are incredible. The temperature is not. The water situation is... complicated.

He has water. Lots of it. The tower still has reserves. He WILL sell you some. At market rates. Which he sets. Based on vibes.

Rope ladder access only. Not ADA compliant. Dan says this is a "security feature." It's really just a rope ladder. Your calves will be AMAZING after a week here.

The view is described as "ocean-like." It's a salt flat. It used to be a lake. It is very much not a lake now. Dan is optimistic about the terminology.

Warning: Water rationing in effect. Shower time: 90 seconds. Dan times it. With a stopwatch. While maintaining eye contact.`,
    location: {
      name: "Salt Flats",
      coordinates: [-115.2, 36.2],
      region: "Desert Territories",
    },
    price: {
      caps: 240,
      btc: 0.024,
    },
    rating: 3.95,
    reviewCount: 22,
    images: [
      "/images/hero-bunker.png",
      "/images/hydroponics.png",
      "/images/raid-tech.png",
    ],
    amenities: [
      { id: "1", name: "Water Access (Paid)", icon: "droplet", available: true },
      { id: "2", name: "High Ground", icon: "trending-up", available: true },
      { id: "3", name: "360° Views", icon: "eye", available: true },
      { id: "4", name: "Comfortable Temperature", icon: "thermometer", available: false },
      { id: "5", name: "Easy Access", icon: "arrow-up", available: false },
    ],
    host: {
      id: "host-13",
      name: "Aqua-Dan",
      avatar: "/avatars/dan.png",
      isSuperhost: false,
      yearsHosting: 3,
      bio: "Pre-Event: Worked in water treatment. Very passionate about hydration. Post-Event: EXTREMELY passionate about hydration. Controls one of the last functioning water towers in the region. This has gone to his head. Literally. He lives on top. House rules are water-focused. Rationing. Conservation. Prices. He has a SYSTEM. Shower timers. Washing guidelines. Drinking schedules. Messages include: water availability, pricing updates, conservation tips, and unsolicited hydration advice. Calls the salt flat an 'ocean view.' Nobody corrects him. He has the water.",
      quirk: "eccentric",
      quirkLabel: "H2O ENTHUSIAST",
    },
    capacity: 4,
    features: {
      radLevel: 2,
      oxygenPurity: 97.0,
      depth: -80,
      blastDoorRating: "Hatch",
      powerSource: "Solar Panel",
      waterSource: "Tower Reserve (Controlled)",
    },
    tags: ["Budget", "Unique", "Views", "Hydration Guaranteed"],
    availability: true,
    bannedItems: [
      "Wasting water (defined broadly by Dan)",
      "Long showers (over 90 seconds)",
      "Complaining about the heat",
      "Asking for water discounts",
      "Rope ladder criticism",
      "Disrespecting the 'ocean view'",
    ],
  },
  {
    id: "bunker-14",
    title: "The Learning Caravan",
    description: "Eight school buses welded together. Teacher Tim still takes roll.",
    longDescription: `Teacher Tim welded eight school buses into a mobile fortress. The apocalypse hasn't stopped education. It might have made it weirder.

Each bus serves a purpose: Living quarters. Kitchen. 'Classroom' (attendance mandatory). Storage. Library. Tim's office. 'Detention' (it's a bus). One marked "FIELD TRIP" (it doesn't go anywhere).

Morning schedule: 7 AM wake-up bell (actual bell). 7:30 breakfast. 8 AM "learning time." Tim teaches survival skills like it's geometry. Pop quizzes happen. They're about edible plants. You will be graded.

Good behavior earns gold stars. What do stars get you? PRIDE. And first pick at dinner. Tim's smile suggests this is adequate motivation. His smile is... a lot.

The buses don't move. Tim insists they COULD. Nobody asks him to prove it. The welding looks permanent. Tim's optimism is also permanent.`,
    location: {
      name: "Mobile Unit",
      coordinates: [-89.5, 43.1],
      region: "Midwest Dead Zone (Currently)",
    },
    price: {
      caps: 180,
      btc: 0.018,
    },
    rating: 4.68,
    reviewCount: 44,
    images: [
      "/images/raid-supermarket.png",
      "/images/hero-bunker.png",
      "/images/hydroponics.png",
    ],
    amenities: [
      { id: "1", name: "Mobile (Theoretically)", icon: "truck", available: true },
      { id: "2", name: "Educational Experience", icon: "book", available: true },
      { id: "3", name: "Gold Star System", icon: "star", available: true },
      { id: "4", name: "Homework-Free Zones", icon: "x", available: false },
      { id: "5", name: "Skip Class Option", icon: "ban", available: false },
    ],
    host: {
      id: "host-14",
      name: "Teacher Tim",
      avatar: "/avatars/tim.png",
      isSuperhost: true,
      yearsHosting: 2,
      bio: "Pre-Event: Fourth grade teacher. Loved his job. Possibly too much. Post-Event: Still teaching. No students. Then guests arrived. PERFECT. House rules are 'class rules.' Attendance is taken. Participation is expected. Gold stars are EARNED. Tim treats the apocalypse as an extended field trip gone wrong. Remains aggressively positive. Wears teacher clothes (sweater vest, khakis). Every day. Messages include: daily schedules, homework (yes, homework), encouragement, and reminders that 'learning never stops, ESPECIALLY during society's collapse!' Genuinely wants you to succeed. In the apocalypse. And in pop quizzes.",
      quirk: "caring",
      quirkLabel: "EDUCATOR",
    },
    capacity: 16,
    features: {
      radLevel: 2,
      oxygenPurity: 96.0,
      depth: 0,
      blastDoorRating: "Emergency Bus Doors",
      powerSource: "Diesel Generator",
      waterSource: "Rain Collection System",
    },
    tags: ["Budget", "Mobile", "Educational", "Wholesome Chaos"],
    availability: true,
    bannedItems: [
      "Skipping class (seriously, don't)",
      "Not doing homework",
      "Disrespecting the gold star system",
      "Asking if we're moving today (sensitive subject)",
      "Teacher's pet accusations (everyone is the pet)",
      "Leaving before final bell (he'll find you)",
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
