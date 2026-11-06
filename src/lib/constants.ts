export const SITE_URL = "https://cerritosbeachhotel.com";

export const BOOKING_URL =
  "https://14910.staygrid.com/webreservation/index/index/hidHotelIdWebOut/QV5TX0ZSczM0XzE0OTEwX0Y1dGVyOTA4N3NfKWRoZl9kcnRlcjdfMTQ5MTBfaGdmaF9nXmQ4NTQ";

export const CONTACT = {
  phonePrimary: "+52 81 3556 1653",
  phoneSecondary: "+52 81 1496 0967",
  email: "info@desertmoonhotel.com",
  address: "Parcela 2740, El Pescadero, La Paz, Baja California Sur, México",
} as const;

export const telHref = (phone: string) => `tel:${phone.replace(/\s/g, "")}`;

export const HOTEL = {
  name: "Cerritos Beach Hotel Desert Moon",
  shortName: "Desert Moon",
  totalRooms: 13,
  coordinates: {
    lat: 23.3317986,
    lng: -110.1783617,
  },
} as const;

export const MAP_EMBED_URL = `https://maps.google.com/maps?q=${HOTEL.coordinates.lat},${HOTEL.coordinates.lng}&z=14&output=embed`;
export const MAP_DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${HOTEL.coordinates.lat},${HOTEL.coordinates.lng}`;

/** Google Maps directions from the hotel to a destination */
export const directionsFromHotel = (destination: string) =>
  `https://www.google.com/maps/dir/?api=1&origin=${HOTEL.coordinates.lat},${HOTEL.coordinates.lng}&destination=${encodeURIComponent(destination)}`;

export const SOCIAL = {
  instagram: "https://www.instagram.com/desertmoonhotel",
  facebook: "https://www.facebook.com/desertmoonhotel",
} as const;

// Rental desks at Los Cabos airport (SJD). Hertz has no stable page for its SJD desk, so it links to its San José del Cabo search.
export const RENT_A_CAR = [
  {
    name: "Alamo",
    url: "https://www.alamo.com/en/car-rental-locations/mx/los-cabos-international-airport-kk54.html",
  },
  {
    name: "Hertz",
    url: "https://www.hertz.com/us/en/location/mexico/sanjosedelcabo",
  },
  {
    name: "Avis",
    url: "https://www.avis.com/en/locations/lat/mx/san-jose-del-cabo/sjd",
  },
] as const;
