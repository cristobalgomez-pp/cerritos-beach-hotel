/**
 * Real guest reviews of the hotel, taken from its Google Maps listing (checked 6 Nov 2026).
 * Quotes are short excerpts in the guest's own words, unedited; the full reviews live on Google.
 * Update the summary numbers from time to time (Google Maps → Reviews).
 */

export const GOOGLE_REVIEWS_URL = "https://maps.google.com/?cid=5157441057911262790";

export const REVIEW_SUMMARY = {
  rating: 4.3,
  total: 141,
  // Number of reviews per star, 5 → 1
  byStars: [91, 25, 8, 4, 13] as const,
};

export interface GuestReview {
  name: string;
  stars: 5 | 4;
  source: "Google" | "Tripadvisor";
  year: number;
  quote: string; // short excerpt, original wording
  topic: "staff" | "food" | "views" | "beach" | "vibe" | "again";
}

export const REVIEWS: GuestReview[] = [
  { name: "Katy Varaleau", stars: 5, source: "Google", year: 2022, topic: "food", quote: "…you MUST go there just for the wood fire pizza!" },
  {
    name: "Bret Pierson",
    stars: 5,
    source: "Google",
    year: 2021,
    topic: "staff",
    quote: "Nice smaller place where you get to know everyone within a day or two.",
  },
  {
    name: "James Scott",
    stars: 5,
    source: "Google",
    year: 2022,
    topic: "views",
    quote: "Great view from our balcony and nice to be able to walk right to beach.",
  },
  {
    name: "Xavier Lam",
    stars: 5,
    source: "Google",
    year: 2022,
    topic: "beach",
    quote: "If you need to relax and enjoy the waves this is the place to go.",
  },
  { name: "Adrian Lamothe", stars: 5, source: "Google", year: 2022, topic: "vibe", quote: "…an amazing rustic and mesmerizing hotel." },
  {
    name: "mpfewel",
    stars: 5,
    source: "Tripadvisor",
    year: 2024,
    topic: "again",
    quote: "…we chose Desert Moon and would absolutely stay here again!",
  },
];
