export type RoomSlug = "king-suite" | "twin-suite" | "pent-house-a" | "pent-house-b";

export type AmenityKey =
  | "privateBathroom"
  | "kitchenette"
  | "airConditioning"
  | "oceanView"
  | "microwave"
  | "balcony"
  | "terrace"
  | "fridge"
  | "wifi"
  | "excellentBeds";

export interface Room {
  slug: RoomSlug;
  name: string;
  maxGuests: number;
  /** Key into dictionary.rooms.beds */
  beds: "king" | "twoQueens" | "one";
  cover: string;
  photos: string[];
  video?: { src: string; poster: string; vertical?: boolean };
  amenities: AmenityKey[];
}

const gallery = (slug: RoomSlug) => [1, 2, 3, 4].map((i) => `/images/rooms/${slug}/${i}.jpg`);

export const ROOMS: Room[] = [
  {
    slug: "king-suite",
    name: "King Suite",
    maxGuests: 3,
    beds: "king",
    cover: "/images/rooms/king-suite/cover.jpg",
    photos: gallery("king-suite"),
    video: { src: "/videos/king-suite.mp4", poster: "/videos/king-suite-poster.jpg" },
    amenities: [
      "privateBathroom",
      "kitchenette",
      "airConditioning",
      "oceanView",
      "microwave",
      "balcony",
      "fridge",
      "wifi",
      "excellentBeds",
    ],
  },
  {
    slug: "twin-suite",
    name: "Twin Suite",
    maxGuests: 4,
    beds: "twoQueens",
    cover: "/images/rooms/twin-suite/cover.jpg",
    photos: gallery("twin-suite"),
    video: { src: "/videos/twin-suite.mp4", poster: "/videos/twin-suite-poster.jpg" },
    amenities: [
      "privateBathroom",
      "kitchenette",
      "airConditioning",
      "oceanView",
      "microwave",
      "balcony",
      "fridge",
      "wifi",
      "excellentBeds",
    ],
  },
  {
    slug: "pent-house-a",
    name: "Pent House A",
    maxGuests: 2,
    beds: "one",
    cover: "/images/rooms/pent-house-a/cover.jpg",
    photos: gallery("pent-house-a"),
    video: {
      src: "/videos/pent-house-a.mp4",
      poster: "/videos/pent-house-a-poster.jpg",
      vertical: true,
    },
    amenities: [
      "privateBathroom",
      "kitchenette",
      "airConditioning",
      "oceanView",
      "microwave",
      "terrace",
      "fridge",
      "wifi",
      "excellentBeds",
    ],
  },
  {
    slug: "pent-house-b",
    name: "Pent House B",
    maxGuests: 2,
    beds: "one",
    cover: "/images/rooms/pent-house-b/cover.jpg",
    photos: gallery("pent-house-b"),
    video: {
      src: "/videos/pent-house-b.mp4",
      poster: "/videos/pent-house-b-poster.jpg",
      vertical: true,
    },
    amenities: ["privateBathroom", "airConditioning", "oceanView", "terrace", "wifi", "excellentBeds"],
  },
];

export function getRoom(slug: string): Room | undefined {
  return ROOMS.find((r) => r.slug === slug);
}
