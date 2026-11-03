export const BOOKING_URL =
  "https://14910.staygrid.com/webreservation/index/index/hidHotelIdWebOut/QV5TX0ZSczM0XzE0OTEwX0Y1dGVyOTA4N3NfKWRoZl9kcnRlcjdfMTQ5MTBfaGdmaF9nXmQ4NTQ";

export const CONTACT = {
  phonePrimary: "+52 81 3556 1653",
  phoneSecondary: "+52 81 1496 0967",
  email: "info@desertmoonhotel.com",
  address: "Parcela 2740, El Pescadero, La Paz, Baja California Sur, México",
} as const;

export const HOTEL = {
  name: "Cerritos Beach Hotel Desert Moon",
  shortName: "Desert Moon",
  totalRooms: 14,
  coordinates: {
    lat: 23.3317986,
    lng: -110.1783617,
  },
  googleMapsUrl:
    "https://maps.google.com/maps/dir//Cerritos+Beach+Hotel+Sin+Nombre,+Sin+Numero+El+Pescadero+23310+La+Paz,+B.C.S./@23.3317986,-110.1783617,16z",
} as const;

export const SOCIAL = {
  instagram: "https://www.instagram.com/desertmoonhotel",
  facebook: "https://www.facebook.com/desertmoonhotel",
  tripadvisor: "",
} as const;

export const RENT_A_CAR = [
  {
    name: "Alamo",
    url: "https://www.alamo.com/es/oficinas-de-alquiler-de-autos/mx/apto-int-de-los-cabos-kk54.html",
  },
  {
    name: "Hertz",
    url: "https://www.hertz.com/rentacar/location/m%C3%A9xico/sanjosedelcabo/SJDT50",
  },
  {
    name: "Avis",
    url: "https://avis.mx/",
  },
] as const;
