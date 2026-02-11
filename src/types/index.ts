export interface Bunker {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  location: {
    name: string;
    coordinates: [number, number]; // [lng, lat]
    region: string;
  };
  price: {
    caps: number;
    btc: number;
  };
  rating: number;
  reviewCount: number;
  images: string[];
  amenities: Amenity[];
  host: Host;
  capacity: number;
  features: BunkerFeatures;
  tags: string[];
  availability: boolean;
  bannedItems?: string[]; // Things not allowed in this bunker
}

export interface Host {
  id: string;
  name: string;
  avatar: string;
  isSuperhost: boolean;
  yearsHosting: number;
  bio?: string;
  quirk?: "military" | "obsessive" | "dangerous" | "caring" | "eccentric" | "intense";
  quirkLabel?: string;
}

export interface BunkerFeatures {
  radLevel: number; // 0-10 scale
  oxygenPurity: number; // percentage
  depth: number; // feet underground
  blastDoorRating: string;
  powerSource: string;
  waterSource: string;
}

export interface Amenity {
  id: string;
  name: string;
  icon: string;
  available: boolean;
}

export interface Review {
  id: string;
  bunkerId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export interface RaidParty {
  id: number;
  title: string;
  host: string;
  difficulty: "Easy" | "Medium" | "Hard" | "Extreme" | "Suicide Mission";
  loot: string;
  price: string;
  image: string;
  location: string;
  duration: string;
  maxParticipants: number;
  description?: string;
  successRate?: string;
}

export interface SearchFilters {
  location: string;
  minPrice: number;
  maxPrice: number;
  minRating: number;
  radFree: boolean;
  guests: number;
  amenities: string[];
  maxRadLevel: number;
}

// Horror stories / Verified Incidents
export interface VerifiedIncident {
  id: string;
  bunkerId: string;
  title: string;
  description: string;
  date: string;
  severity: "Minor Inconvenience" | "Moderate Trauma" | "Existential Crisis" | "We Don't Talk About It";
  resolved: boolean;
  resolutionNote?: string;
}
