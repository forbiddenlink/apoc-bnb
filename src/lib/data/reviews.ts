import { Review } from "@/types";

export const mockReviews: Review[] = [
  {
    id: "review-1",
    bunkerId: "bunker-1",
    userId: "user-1",
    userName: "WastelandWarrior99",
    userAvatar: "/avatars/warrior.png",
    rating: 5,
    comment: "Great place to hide from the raiders. The canned peaches were expired though. Still, 10/10 would survive again.",
    date: "2025-12-15",
    verified: true,
  },
  {
    id: "review-2",
    bunkerId: "bunker-1",
    userId: "user-2",
    userName: "RadRoachKing",
    userAvatar: "/avatars/roach.png",
    rating: 5,
    comment: "Very clean. No mutants in the vents. The host was super helpful when we heard scratching sounds at night (turned out to be wind, not ghouls).",
    date: "2025-11-28",
    verified: true,
  },
  {
    id: "review-3",
    bunkerId: "bunker-1",
    userId: "user-3",
    userName: "VaultDweller",
    userAvatar: "/avatars/dweller.png",
    rating: 4,
    comment: "Loved the hydroponic garden. WiFi was down but honestly, who needs internet when society collapsed?",
    date: "2025-10-10",
    verified: false,
  },
  {
    id: "review-4",
    bunkerId: "bunker-2",
    userId: "user-4",
    userName: "SurvivalistSue",
    userAvatar: "/avatars/sue.png",
    rating: 5,
    comment: "Authentic Vault-Tec experience! The Overseer was very accommodating. Would recommend to any wasteland wanderer.",
    date: "2025-12-01",
    verified: true,
  },
  {
    id: "review-5",
    bunkerId: "bunker-3",
    userId: "user-5",
    userName: "TacticalTim",
    userAvatar: "/avatars/tim.png",
    rating: 5,
    comment: "Military-grade protection is no joke. Felt completely safe. The armory access was a nice touch.",
    date: "2025-11-15",
    verified: true,
  },
];

export const getReviewsByBunkerId = (bunkerId: string): Review[] => {
  return mockReviews.filter((review) => review.bunkerId === bunkerId);
};
