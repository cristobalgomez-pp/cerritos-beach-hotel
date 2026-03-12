import { CONTACT, HOTEL, BOOKING_URL } from "./constants";

export function getHotelSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Hotel",
    name: HOTEL.name,
    description:
      "The closest hotel to the surf point in Cerritos Beach, Baja California Sur. Boutique hotel with 14 ocean view rooms, infinity pool, free breakfast, and restaurant.",
    url: "https://cerritosbeachhotel.com",
    telephone: CONTACT.phonePrimary,
    email: CONTACT.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Parcela 2740",
      addressLocality: "El Pescadero",
      addressRegion: "Baja California Sur",
      postalCode: "23310",
      addressCountry: "MX",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: HOTEL.coordinates.lat,
      longitude: HOTEL.coordinates.lng,
    },
    numberOfRooms: HOTEL.totalRooms,
    starRating: {
      "@type": "Rating",
      ratingValue: "3",
    },
    priceRange: "$$",
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Infinity Pool" },
      { "@type": "LocationFeatureSpecification", name: "Free Breakfast" },
      { "@type": "LocationFeatureSpecification", name: "Restaurant & Bar" },
      { "@type": "LocationFeatureSpecification", name: "Free Wi-Fi" },
      { "@type": "LocationFeatureSpecification", name: "Air Conditioning" },
      { "@type": "LocationFeatureSpecification", name: "Car Parking" },
      { "@type": "LocationFeatureSpecification", name: "Ocean View Rooms" },
    ],
    image: "https://cerritosbeachhotel.com/images/og-default.jpg",
    potentialAction: {
      "@type": "ReserveAction",
      target: BOOKING_URL,
      name: "Book a Room",
    },
  };
}

export function getLodgingBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: HOTEL.name,
    url: "https://cerritosbeachhotel.com",
    telephone: CONTACT.phonePrimary,
    email: CONTACT.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Parcela 2740",
      addressLocality: "El Pescadero",
      addressRegion: "Baja California Sur",
      postalCode: "23310",
      addressCountry: "MX",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: HOTEL.coordinates.lat,
      longitude: HOTEL.coordinates.lng,
    },
    makesOffer: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "HotelRoom",
          name: "King Suite",
          description: "King suite with ocean view, kitchenette, and balcony",
          occupancy: { "@type": "QuantitativeValue", maxValue: 3 },
          bed: { "@type": "BedDetails", typeOfBed: "King" },
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "HotelRoom",
          name: "Twin Suite",
          description: "Twin suite with two queen beds, ocean view, and balcony",
          occupancy: { "@type": "QuantitativeValue", maxValue: 3 },
          bed: { "@type": "BedDetails", typeOfBed: "Queen", numberOfBeds: 2 },
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "HotelRoom",
          name: "Pent House A",
          description: "Premium penthouse with ocean view and balcony",
          occupancy: { "@type": "QuantitativeValue", maxValue: 3 },
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "HotelRoom",
          name: "Pent House B",
          description: "Intimate penthouse for couples with ocean view",
          occupancy: { "@type": "QuantitativeValue", maxValue: 2 },
        },
      },
    ],
  };
}

export function getRestaurantSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: "Desert Moon Restaurant & Bar",
    description:
      "Sea-to-table restaurant and bar at Desert Moon Hotel, Cerritos Beach. Fresh Mexican and international cuisine with ocean views.",
    url: "https://cerritosbeachhotel.com/restaurant",
    telephone: CONTACT.phonePrimary,
    servesCuisine: ["Mexican", "Seafood", "International"],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Parcela 2740",
      addressLocality: "El Pescadero",
      addressRegion: "Baja California Sur",
      postalCode: "23310",
      addressCountry: "MX",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: HOTEL.coordinates.lat,
      longitude: HOTEL.coordinates.lng,
    },
    image: "https://cerritosbeachhotel.com/images/og-default.jpg",
  };
}
