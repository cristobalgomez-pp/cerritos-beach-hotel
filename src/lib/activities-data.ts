export interface Activity {
  id: number;
  slug: string;
  title: string;
  description: string;
}

export const ACTIVITIES: Activity[] = [
  {
    id: 1,
    slug: "surf-lessons",
    title: "Surf Lessons",
    description:
      "Cerritos Beach is home to world class waves for every surfer level. Whether you're a beginner catching your first wave or an experienced surfer looking for a challenge, our local instructors will guide you through an unforgettable session in the Pacific.",
  },
  {
    id: 2,
    slug: "hiking",
    title: "Hiking",
    description:
      "Explore hidden beaches, dramatic cliffs, and stunning sunset spots along the Baja coastline. The desert landscape meets the ocean in ways you've never seen — trails for all levels with breathtaking views at every turn.",
  },
  {
    id: 3,
    slug: "las-palmas-beach",
    title: "Las Palmas Beach",
    description:
      "Just a 20-minute drive from the hotel, Las Palmas Beach offers palm-tree-lined shores and great waves. A local favorite that feels like your own private paradise — perfect for a day trip with the family.",
  },
  {
    id: 4,
    slug: "todos-santos-town",
    title: "Todos Santos Town",
    description:
      "Visit this designated Pueblo Mágico just 15 minutes away. Explore vibrant art galleries, the legendary Hotel California, charming streets, and world-class restaurants. A cultural gem of Baja California Sur.",
  },
  {
    id: 5,
    slug: "balandra",
    title: "Balandra",
    description:
      "Discover the famous mushroom rock, crystal-clear waters, and mangrove forests at Balandra Beach on the Sea of Cortes. Consistently rated one of Mexico's most beautiful beaches — an absolute must-visit.",
  },
  {
    id: 6,
    slug: "atvs",
    title: "ATVs",
    description:
      "Take the whole family on an exciting ATV ride through orchards, desert trails, and coastal paths. A thrilling way to explore the stunning Baja landscape beyond the beach.",
  },
  {
    id: 7,
    slug: "fishing",
    title: "Fishing",
    description:
      "Fish the waters of Gaspareno, Cerritos, and Point Lobos for roosterfish, dorado, yellowtail, and more. Whether you're a seasoned angler or first-timer, the fishing in Baja is legendary.",
  },
  {
    id: 8,
    slug: "cabo-san-lucas",
    title: "Cabo San Lucas",
    description:
      "Just an hour's drive south, Cabo San Lucas is one of Mexico's top 5 tourist destinations. Visit El Arco, enjoy world-class dining, nightlife, and endless water activities in this iconic resort town.",
  },
];
