import type { Dictionary } from "./en";

const es: Dictionary = {
  meta: {
    siteTitle: "Desert Moon Hotel · Playa Cerritos, Baja California Sur",
    siteDescription:
      "Hotel de surf con 13 cuartos en Playa Cerritos, el más cercano al punto de surf. Alberca infinita, desayuno incluido, bar en la azotea y cuartos con vista al mar, a 15 minutos de Todos Santos.",
    ogLocale: "es_MX",
  },
  nav: {
    home: "Inicio",
    rooms: "Cuartos",
    restaurant: "Bar y restaurante",
    activities: "Qué hacer",
    about: "Nosotros",
    contact: "Contacto",
    book: "Reservar",
    menu: "Menú",
    close: "Cerrar menú",
    language: "English",
    languageShort: "EN",
    skip: "Ir al contenido",
  },
  common: {
    bookRoom: "Reservar cuarto",
    seeRooms: "Ver los cuartos",
    upTo: (n: number) => `Hasta ${n} huéspedes`,
    viewRoom: "Ver cuarto",
    directions: "Cómo llegar",
    oceanViewNote: "La vista al mar depende de la disponibilidad.",
  },
  home: {
    heroLine: "El hotel más cerca del surf en Playa Cerritos.",
    heroSub: "13 cuartos, alberca infinita y bar en la azotea, entre el desierto y el Pacífico.",
    introTitle: "Un hotel pequeño hecho alrededor de la ola",
    introBody:
      "Desert Moon está en el corazón de Playa Cerritos, a unos pasos del punto de surf y a 15 minutos en coche de Todos Santos, Pueblo Mágico. Las mañanas empiezan con desayuno incluido; las tardes terminan en la alberca o en el bar, viendo cómo el sol se mete en el mar.",
    facts: [
      { value: "13", label: "cuartos" },
      { value: "15 min", label: "a Todos Santos" },
      { value: "Incluido", label: "desayuno todos los días" },
      { value: "Infinita", label: "alberca frente al mar" },
    ],
    roomsTitle: "Cuatro formas de quedarte",
    roomsBody:
      "Todos los cuartos tienen baño privado, aire acondicionado y Wi‑Fi rápido. La mayoría tiene cocineta y vista al mar.",
    surfTitle: "Olas de clase mundial, para todos los niveles",
    surfBody:
      "Los principiantes encuentran espuma suave en la orilla y los expertos encuentran el punto. Te reservamos una clase de surf con un instructor local.",
    surfCta: "Qué hacer cerca",
    barTitle: "Rip Tide Bar & Grill",
    barBody:
      "Comida del mar a la mesa, la margarita perfecta y un muro con más de 2,000 piedras pintadas por nuestros huéspedes. Pinta la tuya y deja tu historia.",
    barCta: "Ver el bar",
    reviewsTitle: "Lo que dicen los huéspedes",
    reviews: [
      {
        name: "Angela Sosna",
        text: "Gran ubicación. Personal maravilloso. Margaritas increíbles.",
      },
      {
        name: "Tracey Anne Mcewing",
        text: "Reservamos de último minuto para Año Nuevo. El personal fue muy atento y servicial. Los cuartos eran amplios y muy limpios, y teníamos una linda vista al mar. Sin duda volveremos.",
      },
      {
        name: "Stephanie Kunz",
        text: "Muchas gracias a Bobby y su equipo. Hicieron nuestra estancia inolvidable. ¡Gran servicio y las mejores margaritas!",
      },
    ],
    findUsTitle: "Dónde estamos",
    findUsBody:
      "Parcela 2740, El Pescadero, Baja California Sur. A una hora y media del aeropuerto de Los Cabos.",
  },
  features: {
    title: "Incluido en tu estancia",
    items: [
      "El hotel más cerca del punto de surf",
      "Alberca infinita",
      "Desayuno incluido",
      "Bar y restaurante",
      "Wi‑Fi rápido",
      "Estacionamiento",
    ],
  },
  rooms: {
    title: "Cuartos",
    intro:
      "Suites en los pisos de abajo con balcón y dos penthouses para dos personas en la azotea con terraza propia. Elige las camas que mejor le queden a tu viaje.",
    beds: {
      king: "1 cama king",
      twoQueens: "2 camas queen",
      one: "1 cama",
    },
    bath: "1 baño",
    amenitiesTitle: "En el cuarto",
    galleryTitle: "Fotos",
    videoTitle: "Recorre el cuarto",
    otherRooms: "Otros cuartos",
    backToRooms: "Todos los cuartos",
    photoOf: "{room}, foto {n} de {total}",
    closeGallery: "Cerrar",
    prev: "Foto anterior",
    next: "Foto siguiente",
    amenities: {
      privateBathroom: "Baño privado",
      kitchenette: "Cocineta",
      airConditioning: "Aire acondicionado",
      oceanView: "Vista al mar*",
      microwave: "Microondas",
      balcony: "Balcón",
      terrace: "Terraza privada",
      fridge: "Refrigerador",
      wifi: "Wi‑Fi rápido",
      excellentBeds: "Camas excelentes",
    },
    details: {
      "king-suite": {
        tagline: "Cama king y cocineta, a pasos de la ola",
        description:
          "Nuestra suite favorita para parejas. Cama king, cocineta para el café antes de la sesión, balcón para secar el wetsuit y espacio para un tercer huésped.",
      },
      "twin-suite": {
        tagline: "Dos camas queen para amigos y familias",
        description:
          "Espacio para hasta cuatro personas con dos camas queen, cocineta y balcón. La opción fácil para un viaje de surf con amigos o en familia.",
      },
      "pent-house-a": {
        tagline: "Último piso, puertas corredizas a tu propia terraza",
        description:
          "En la azotea, con puertas de vidrio corredizas que abren a una terraza privada con vista al Pacífico. Tiene cocineta, arte original y mucha luz.",
      },
      "pent-house-b": {
        tagline: "Cuarto en la azotea con vista al mar",
        description:
          "Un penthouse luminoso en el último piso, con ventana al mar, terraza privada y uno de nuestros retratos pop art cuidando la cama.",
      },
    },
  },
  restaurant: {
    title: "Rip Tide Bar & Grill",
    intro:
      "Nuestro bar y restaurante es donde termina el día. Comida fresca del mar, bebidas frías y la gente con la que viniste.",
    sections: [
      {
        title: "El bar",
        body: "Surtido con lo mejor. Ven con tus amigos y deja que nuestro equipo te consienta.",
      },
      {
        title: "El muro de piedras",
        body: "Más de 2,000 piedras pintadas por huéspedes, cada una un pedacito de alguien que pasó por aquí. Pinta la tuya y cuenta tu historia.",
      },
      {
        title: "Del mar a tu mesa",
        body: "Comida fresca y rica para compartir. Pregunta por la pesca del día.",
      },
      {
        title: "La margarita perfecta",
        body: "Olvídate de todo con la bebida de la que nuestros huéspedes no dejan de hablar. O una piña colada bajo el sol. ¿Qué más se puede pedir?",
      },
    ],
    breakfast: "El desayuno está incluido para los huéspedes del hotel todas las mañanas.",
  },
  activities: {
    title: "Qué hacer en Playa Cerritos",
    intro:
      "El surf es la razón por la que casi todos vienen. Esto es lo demás que les encanta a nuestros huéspedes, desde caminar a una playa escondida hasta un día en La Paz.",
    surfTitle: "Clases de surf",
    surfBody:
      "Cerritos tiene olas para todo tipo de surfista, no importa si eres principiante o experto: la orilla es suave y noble, el punto es para cuando estés listo. Pídenos y te reservamos una clase con un instructor local.",
    askFrontDesk: "Pregunta en recepción",
    nearbyTitle: "Saliendo del hotel",
    nearbyIntro: "Sin coche. Pregunta en recepción y te lo organizamos.",
    nearby: [
      {
        title: "Caminatas",
        body: "Camina hacia el norte por la costa y encontrarás playas escondidas, acantilados donde revientan las olas y el mejor lugar para ver el atardecer.",
      },
      {
        title: "Paseos en cuatrimoto",
        body: "Recorre con familia y amigos las huertas y las playas de El Pescadero. Incluye todo el equipo.",
      },
      {
        title: "Pesca",
        body: "Salidas de curricán por Gaspareño, Cerritos y Punta Lobos para sacar dorado, pez gallo, sierra, jurel y más.",
      },
    ],
    tripsTitle: "Paseos de un día",
    tripsIntro: "Tiempos aproximados en coche desde el hotel. Toca un lugar para ver cómo llegar.",
    mapLabel: "Mapa de Baja California Sur con el hotel y los paseos cercanos",
    hotelLabel: "Desert Moon",
    pacific: "Océano Pacífico",
    cortez: "Mar de Cortés",
    trips: [
      {
        id: "todos-santos",
        title: "Todos Santos",
        time: "15 min",
        body: "Un Pueblo Mágico con mucho ambiente artístico: la iglesia, el teatro, el centro cultural, galerías, un festival de arte anual y el famoso Hotel California.",
      },
      {
        id: "las-palmas",
        title: "Playa Las Palmas",
        time: "20 min",
        body: "Una playa larga rodeada de palmeras y con buenas olas, por camino de terracería. Ten cuidado, la corriente puede ponerse fuerte.",
      },
      {
        id: "cabo",
        title: "Cabo San Lucas",
        time: "1 h",
        body: "El Arco, buceo, avistamiento de ballenas, pesca deportiva y vida nocturna en la punta de la península.",
      },
      {
        id: "balandra",
        title: "Balandra",
        time: "1 h 45 min",
        body: "Pasando La Paz, famosa por su piedra en forma de hongo, manglares y dunas, con el agua del Mar de Cortés en todos los tonos de azul.",
      },
    ],
  },
  about: {
    title: "Sobre Desert Moon",
    lead: "Un hotel pequeño y colorido en Playa Cerritos, hecho para surfistas, familias y cualquiera que quiera bajarle el ritmo.",
    body: [
      "Desert Moon está en el corazón de Playa Cerritos: es el hotel más cerca del punto de surf y está a 15 minutos de Todos Santos, Pueblo Mágico.",
      "Tenemos 13 cuartos: suites con cama king para hasta tres personas, suites con dos camas queen para hasta cuatro y dos penthouses en la azotea para dos personas. Toda estancia incluye desayuno, Wi‑Fi rápido y estacionamiento.",
      "Entre sesión y sesión están la alberca infinita, las terrazas en la azotea y el bar Rip Tide, donde los huéspedes han pintado más de 2,000 piedras a lo largo de los años.",
    ],
  },
  contact: {
    title: "Contacto",
    intro: "¿Dudas sobre los cuartos, las clases de surf o cómo llegar? Escríbenos o llámanos.",
    booking: "Reservaciones",
    primary: "Línea principal",
    secondary: "Segunda línea",
    email: "Correo",
    address: "Dirección",
    gettingHere: "Cómo llegar",
    gettingHereBody:
      "El aeropuerto más cercano es Los Cabos (SJD), a una hora y media en coche. La Paz (LAP) está a poco más de una hora. Pregúntanos por traslados desde el aeropuerto.",
    rentACar: "Renta un coche en el aeropuerto",
    mapTitle: "Desert Moon Hotel en el mapa",
  },
  sky: {
    title: "El cielo de esta noche",
    intro: "Lejos de las luces de la ciudad, en Cerritos sí se hace de noche. Así se ve el cielo hoy desde la azotea.",
    phases: {
      new: "Luna nueva",
      waxingCrescent: "Luna creciente",
      firstQuarter: "Cuarto creciente",
      waxingGibbous: "Gibosa creciente",
      full: "Luna llena",
      waningGibbous: "Gibosa menguante",
      lastQuarter: "Cuarto menguante",
      waningCrescent: "Luna menguante",
    },
    lit: "iluminada",
    ratings: { excellent: "Excelente para ver estrellas", good: "Buena para ver estrellas", fair: "Regular para estrellas", poor: "Mucha luna o nubes" },
    sunset: "Atardecer",
    dark: "Noche cerrada",
    moonrise: "Sale la luna",
    moonset: "Se mete la luna",
    clouds: "Nubes",
    cloudsUnknown: "Aún sin pronóstico",
    milkyWay: "Centro de la Vía Láctea",
    milkyWayNo: "No se ve esta noche",
    moonlessHours: (h: string) => `${h} h de cielo oscuro sin luna`,
    seeTitle: "Qué se puede ver desde aquí",
    planetsTitle: "Planetas esta noche",
    noPlanets: "Hoy no hay planetas brillantes. Toca ver estrellas.",
    planets: { mercury: "Mercurio", venus: "Venus", mars: "Marte", jupiter: "Júpiter", saturn: "Saturno" },
    directions: { N: "el norte", NE: "el noreste", E: "el oriente", SE: "el sureste", S: "el sur", SW: "el suroeste", W: "el poniente", NW: "el noroeste" },
    planetLine: (dir: string, time: string) => `Mejor hacia las ${time}, mirando hacia ${dir}`,
    brightness: { veryBright: "Muy brillante", bright: "Brillante", visible: "Visible" },
    showerTitle: "Próxima lluvia de estrellas",
    showers: {
      quadrantids: "Cuadrántidas",
      lyrids: "Líridas",
      etaAquariids: "Eta Acuáridas",
      perseids: "Perseidas",
      orionids: "Oriónidas",
      leonids: "Leónidas",
      geminids: "Gemínidas",
    },
    showerWhen: (days: number) => (days === 0 ? "Esta noche" : days === 1 ? "Mañana en la noche" : `En ${days} días`),
    showerRate: (n: number) => `Hasta ${n} meteoros por hora con cielo oscuro, mejor después de medianoche`,
    showerMoon: { dark: "Casi sin luna: condiciones excelentes", some: "Algo de luz de luna esa noche", bright: "La luna brillante va a tapar las más tenues" },
    seasonTitle: "Esta temporada en Desert Moon",
    highlights: {
      whales: "Temporada de ballenas jorobadas: desde la azotea se ven saltar frente a la playa, de diciembre a abril.",
      orion: "Orión y Sirio mandan en la noche. Orión sale por el oriente al anochecer y a medianoche ya está alto.",
      canopus: "Canopo, la segunda estrella más brillante del cielo, aparece bajita hacia el sur. Desde casi todo EE. UU. no se ve.",
      southernCross: "La Cruz del Sur se asoma sobre el horizonte sur ya entrada la noche, algo que más al norte casi no se ve.",
      milkyWaySeason: "Temporada de Vía Láctea: su centro brillante cruza el cielo del sur en las noches sin luna.",
      andromeda: "La galaxia de Andrómeda, a 2.5 millones de años luz, se ve a simple vista en noches oscuras.",
    },
    weekTitle: "Las mejores noches de la semana",
    tonight: "Hoy",
    source: "Pronóstico de nubes: MET Norway. Horarios de Playa Cerritos.",
  },
  forSale: {
    nav: "Venta de depas",
    title: "Ten tu departamento en Desert Moon",
    intro:
      "{count} departamentos a la venta dentro del hotel, a unos pasos del punto de surf de Playa Cerritos. Úsalo en tus vacaciones, vive aquí o adminístralo a tu manera.",
    pickTitle: "Elige tu departamento",
    pickIntro:
      "El hotel tiene siete torres escalonadas con dos departamentos cada una: el A es el de arriba y el B el de abajo. Están acomodadas como se ve el edificio en persona, de la torre 7 a la 1. Toca los departamentos disponibles que te interesen; tócalos otra vez para quitarlos.",
    tower: "Torre",
    upper: "Departamento de arriba",
    lower: "Departamento de abajo",
    available: "Disponible",
    sold: "Vendido",
    selected: "Seleccionado",
    highlightsTitle: "Por qué comprar aquí",
    highlights: [
      { title: "Frente a la ola", body: "El edificio más cerca del punto de surf de Playa Cerritos, a 15 minutos de Todos Santos." },
      { title: "La vida de hotel alrededor", body: "Alberca infinita, terrazas en la azotea y el bar Rip Tide dentro del mismo lugar." },
      { title: "Lo administras tú", body: "Sin programa de renta: cada dueño decide cómo usar, rentar o mantener su departamento." },
    ],
    formTitle: "Pide información de un departamento",
    pickHint: "Toca departamentos en el mapa",
    name: "Nombre completo",
    email: "Correo",
    phone: "Teléfono (opcional)",
    units: "Departamentos que te interesan",
    message: "Mensaje (opcional)",
    send: "Enviar",
    sending: "Enviando…",
    success: "¡Gracias! Recibimos tu mensaje y te contestamos pronto.",
    error: "No pudimos enviar tu mensaje. Intenta de nuevo o escríbenos a",
    required: "Escribe tu nombre y un correo válido.",
    consent: "Al enviar, aceptas nuestro",
  },
  footer: {
    tagline: "Hotel de surf en Playa Cerritos, Baja California Sur.",
    explore: "Explora",
    contact: "Contacto",
    follow: "Síguenos",
    rights: "Todos los derechos reservados.",
    privacy: "Aviso de privacidad",
  },
  notFound: {
    title: "Esta página se la llevó la corriente",
    body: "Puede que el link sea viejo o esté mal escrito.",
    cta: "Volver al inicio",
  },
};

export default es;
