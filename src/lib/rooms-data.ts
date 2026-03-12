export interface Room {
  slug: string;
  name: string;
  maxPeople: number;
  beds: string;
  baths: number;
  wifi: boolean;
  description: string;
  special: string[];
  amenities: string[];
}

export const ROOMS: Room[] = [
  {
    slug: "king-suite",
    name: "King Suite",
    maxPeople: 3,
    beds: "1 King Bed",
    baths: 1,
    wifi: true,
    description:
      "Spacious suite with a king-size bed, private balcony, and stunning ocean views. The perfect retreat after a day of surfing.",
    special: ["Ocean View*", "Kitchenette", "Balcony"],
    amenities: [
      "Private Bathroom",
      "Kitchenette",
      "Air Conditioning",
      "Ocean View*",
      "Microwave",
      "Balcony/Terrace",
      "Fridge",
      "Excellent Beds",
    ],
  },
  {
    slug: "twin-suite",
    name: "Twin Suite",
    maxPeople: 3,
    beds: "2 Queen Beds",
    baths: 1,
    wifi: true,
    description:
      "Comfortable suite with two queen beds, ideal for families or friends traveling together. Enjoy ocean breezes from your private terrace.",
    special: ["Ocean View*", "Kitchenette", "Balcony"],
    amenities: [
      "Private Bathroom",
      "Kitchenette",
      "Air Conditioning",
      "Ocean View*",
      "Microwave",
      "Balcony/Terrace",
      "Fridge",
      "Excellent Beds",
    ],
  },
  {
    slug: "pent-house-a",
    name: "Pent House A",
    maxPeople: 3,
    beds: "1 Bed",
    baths: 1,
    wifi: true,
    description:
      "Elevated penthouse living with panoramic views of Cerritos Beach. A premium experience with extra space and luxury amenities.",
    special: ["Ocean View*", "Kitchenette", "Balcony"],
    amenities: [
      "Private Bathroom",
      "Kitchenette",
      "Air Conditioning",
      "Ocean View*",
      "Microwave",
      "Balcony/Terrace",
      "Fridge",
      "Excellent Beds",
    ],
  },
  {
    slug: "pent-house-b",
    name: "Pent House B",
    maxPeople: 2,
    beds: "1 Bed",
    baths: 1,
    wifi: true,
    description:
      "Intimate penthouse perfect for couples. Wake up to ocean sunrises and fall asleep to the sound of waves crashing on the shore.",
    special: ["Ocean View*", "Kitchenette", "Balcony"],
    amenities: [
      "Private Bathroom",
      "Kitchenette",
      "Air Conditioning",
      "Ocean View*",
      "Microwave",
      "Balcony/Terrace",
      "Fridge",
      "Excellent Beds",
    ],
  },
];
