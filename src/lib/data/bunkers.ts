import { Bunker } from "@/types";

export const mockBunkers: Bunker[] = [
  {
    id: "bunker-1",
    title: "The Deep Earth Citadel",
    description: "Decomissioned missile silo with 12-foot concrete walls",
    longDescription: `Escape the wasteland in style. This decomissioned missile silo features 12-foot concrete walls,
      a filtered air supply (HEPA + Charcoal), and a fully stocked hydroponic garden.
      
      Enjoy panoramic views of the desolation via our 8K wall-screens, or relax in the
      lead-lined spa. WARNING: Surface excursions are at your own risk.`,
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
      "/images/hero-bunker.png",
      "/images/armory.png",
      "/images/hydroponics.png",
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
      bio: "Veteran survivor with 15 years in the wasteland. Specializing in luxury bunker experiences.",
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
  },
  {
    id: "bunker-2",
    title: "Vault 101 Replica",
    description: "Authentic pre-war vault experience with modern amenities",
    longDescription: `Step into history with this meticulously recreated Vault-Tec facility. 
      Complete with original fixtures, vintage terminals, and that classic vault smell (radiation-free, we promise).`,
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
    images: ["/images/hero-bunker.png", "/images/armory.png"],
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
  },
  {
    id: "bunker-3",
    title: "The Silo Complex",
    description: "Military-grade protection with 5-star amenities",
    longDescription: `Former ICBM launch facility converted into the ultimate survival suite. 
      8-foot steel doors, redundant power systems, and enough supplies for a decade.`,
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
    images: ["/images/armory.png", "/images/hero-bunker.png"],
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
  },
  {
    id: "bunker-4",
    title: "Cozy Underground Haven",
    description: "Budget-friendly shelter with essential amenities",
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
    images: ["/images/hydroponics.png"],
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
    images: ["/images/hero-bunker.png"],
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
    images: ["/images/armory.png", "/images/hydroponics.png"],
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
