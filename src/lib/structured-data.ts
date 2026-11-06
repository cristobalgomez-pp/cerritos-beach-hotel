import type { Metadata } from "next";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { BOOKING_URL, CONTACT, HOTEL, SITE_URL, SOCIAL } from "./constants";
import { ROOMS } from "./rooms";

const ADDRESS = {
  "@type": "PostalAddress",
  streetAddress: "Parcela 2740",
  addressLocality: "El Pescadero",
  addressRegion: "Baja California Sur",
  postalCode: "23310",
  addressCountry: "MX",
};

const GEO = {
  "@type": "GeoCoordinates",
  latitude: HOTEL.coordinates.lat,
  longitude: HOTEL.coordinates.lng,
};

export function getHotelSchema(lang: Locale) {
  const t = getDictionary(lang);
  return {
    "@context": "https://schema.org",
    "@type": "Hotel",
    name: HOTEL.name,
    alternateName: ["Cerritos Beach Hotel", "Desert Moon Hotel", "Desert Moon"],
    description: t.meta.siteDescription,
    url: `${SITE_URL}/${lang}`,
    telephone: CONTACT.phonePrimary,
    email: CONTACT.email,
    address: ADDRESS,
    geo: GEO,
    numberOfRooms: HOTEL.totalRooms,
    priceRange: "$$",
    image: [`${SITE_URL}/images/hotel/facade.jpg`, `${SITE_URL}/images/hotel/infinity-pool.jpg`],
    sameAs: [SOCIAL.instagram, SOCIAL.facebook],
    amenityFeature: t.features.items.map((name) => ({
      "@type": "LocationFeatureSpecification",
      name,
      value: true,
    })),
    containsPlace: ROOMS.map((room) => ({
      "@type": "HotelRoom",
      name: room.name,
      description: t.rooms.details[room.slug].description,
      occupancy: { "@type": "QuantitativeValue", maxValue: room.maxGuests },
      url: `${SITE_URL}/${lang}/rooms/${room.slug}`,
    })),
    potentialAction: { "@type": "ReserveAction", target: BOOKING_URL },
  };
}

export function getRestaurantSchema(lang: Locale) {
  const t = getDictionary(lang);
  return {
    "@context": "https://schema.org",
    "@type": "BarOrPub",
    name: "Rip Tide Bar & Grill — Cerritos Beach Hotel Desert Moon",
    description: t.restaurant.intro,
    url: `${SITE_URL}/${lang}/restaurant`,
    telephone: CONTACT.phonePrimary,
    servesCuisine: ["Mexican", "Seafood"],
    address: ADDRESS,
    geo: GEO,
    image: `${SITE_URL}/images/restaurant/bar-wide.jpg`,
  };
}

/** Per-page metadata with canonical + hreflang alternates */
export function pageMetadata(lang: Locale, path: string, title: string, description: string, image?: string): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: `/${lang}${path}`,
      languages: { en: `/en${path}`, es: `/es${path}`, "x-default": `/en${path}` },
    },
    openGraph: {
      title,
      description,
      url: `/${lang}${path}`,
      images: image ? [{ url: image }] : [{ url: "/images/og-default.jpg", width: 1200, height: 630 }],
    },
  };
}
