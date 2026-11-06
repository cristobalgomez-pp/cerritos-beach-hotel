import type { Locale } from "@/i18n/config";
import { CONTACT } from "@/lib/constants";

/**
 * Aviso de privacidad (LFPDPPP, DOF 20-mar-2025).
 * Draft: have it reviewed by a lawyer before launch, and fill in the legal owner name below.
 */
export const PRIVACY_OWNER = "Desert Moon Hotel"; // TODO: razón social o nombre de la persona física titular
export const PRIVACY_UPDATED = { en: "November 6, 2026", es: "6 de noviembre de 2026" } as const;

export interface PrivacySection {
  heading: string;
  paragraphs: string[];
  list?: string[];
}

export interface PrivacyNotice {
  title: string;
  lead: string;
  updatedLabel: string;
  sections: PrivacySection[];
}

const email = CONTACT.email;
const address = CONTACT.address;

const es: PrivacyNotice = {
  title: "Aviso de privacidad",
  lead: "Cómo tratamos los datos personales que nos compartes a través de este sitio.",
  updatedLabel: "Última actualización",
  sections: [
    {
      heading: "Quién es responsable de tus datos",
      paragraphs: [
        `${PRIVACY_OWNER} (“Desert Moon”), con domicilio en ${address}, es responsable del tratamiento de tus datos personales conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares. Para cualquier tema de privacidad puedes escribirnos a ${email}.`,
      ],
    },
    {
      heading: "Qué datos recabamos",
      paragraphs: ["Solo recabamos los datos que tú nos das o que se generan al navegar el sitio:"],
      list: [
        "Datos de identificación y contacto que escribes en el formulario de departamentos en venta: nombre, correo, teléfono (opcional), los departamentos que te interesan y tu mensaje.",
        "Los datos que nos compartas si nos escribes por correo, WhatsApp o teléfono.",
        "Datos de navegación recabados con cookies de Google Analytics: dirección IP abreviada, páginas visitadas, tipo de dispositivo y navegador, y ubicación aproximada (ciudad o país).",
      ],
    },
    {
      heading: "No recabamos datos sensibles",
      paragraphs: [
        "No te pedimos datos personales sensibles (salud, origen étnico, creencias, etc.) ni datos financieros. Por favor no los incluyas en tus mensajes.",
      ],
    },
    {
      heading: "Para qué usamos tus datos",
      paragraphs: ["Finalidades necesarias para atender tu solicitud:"],
      list: [
        "Contestar tus preguntas sobre el hotel o sobre los departamentos en venta.",
        "Enviarte la información, disponibilidad y precios que nos pediste y darle seguimiento a tu solicitud.",
      ],
    },
    {
      heading: "Finalidades adicionales",
      paragraphs: [
        "Usamos los datos de navegación para generar estadísticas del uso del sitio y mejorarlo. Esta finalidad no es necesaria para atenderte; puedes oponerte en cualquier momento desactivando las cookies en tu navegador, instalando el complemento de inhabilitación de Google Analytics (tools.google.com/dlpage/gaoptout) o escribiéndonos.",
      ],
    },
    {
      heading: "Reservaciones",
      paragraphs: [
        "Las reservaciones de habitaciones se hacen en el motor de reservas de Staygrid, una plataforma de un tercero. Los datos que captures ahí (incluyendo datos de pago) se tratan conforme al aviso de privacidad de esa plataforma.",
      ],
    },
    {
      heading: "Con quién compartimos tus datos",
      paragraphs: [
        "No vendemos ni rentamos tus datos. No los transferimos a terceros sin tu consentimiento, salvo en los casos que permite la ley o cuando lo requiera una autoridad competente.",
        "Para operar el sitio nos apoyamos en proveedores que tratan los datos solo por cuenta nuestra y bajo nuestras instrucciones: Vercel (hospedaje del sitio), Resend (envío de los correos del formulario) y Google (analítica). Estos proveedores pueden almacenar la información en servidores fuera de México.",
      ],
    },
    {
      heading: "Tus derechos ARCO y cómo revocar tu consentimiento",
      paragraphs: [
        `Tienes derecho a Acceder a tus datos, Rectificarlos, Cancelarlos u Oponerte a su uso (derechos ARCO), así como a revocar tu consentimiento o limitar el uso de tus datos. Para hacerlo, escríbenos a ${email} indicando: tu nombre y un medio para responderte; una copia de tu identificación (o la de tu representante legal y el documento que lo acredite); qué derecho quieres ejercer y sobre qué datos; y cualquier documento que ayude a localizarlos.`,
        "Te responderemos en un máximo de 20 días hábiles desde que recibamos tu solicitud completa. Si consideras que tu derecho no fue atendido, puedes acudir a la autoridad en materia de protección de datos personales (actualmente, la Secretaría Anticorrupción y Buen Gobierno).",
      ],
    },
    {
      heading: "Cookies",
      paragraphs: [
        "Este sitio no usa cookies propias; solo usa cookies de Google Analytics para estadísticas. Puedes borrarlas o bloquearlas desde la configuración de tu navegador; el sitio seguirá funcionando.",
      ],
    },
    {
      heading: "Cambios a este aviso",
      paragraphs: [
        "Podemos actualizar este aviso por cambios en la ley o en nuestros servicios. Siempre publicaremos la versión vigente en esta página, con su fecha de actualización.",
      ],
    },
  ],
};

const en: PrivacyNotice = {
  title: "Privacy notice",
  lead: "How we handle the personal data you share with us through this website.",
  updatedLabel: "Last updated",
  sections: [
    {
      heading: "Who is responsible for your data",
      paragraphs: [
        `${PRIVACY_OWNER} (“Desert Moon”), located at ${address}, is responsible for processing your personal data under Mexico’s Federal Law on the Protection of Personal Data Held by Private Parties. For any privacy matter, write to us at ${email}.`,
      ],
    },
    {
      heading: "What data we collect",
      paragraphs: ["We only collect the data you give us or that is generated when you browse the site:"],
      list: [
        "Identification and contact details you enter in the apartments-for-sale form: name, email, phone (optional), the apartments you are interested in and your message.",
        "Any data you share if you contact us by email, WhatsApp or phone.",
        "Browsing data collected with Google Analytics cookies: shortened IP address, pages visited, device and browser type, and approximate location (city or country).",
      ],
    },
    {
      heading: "We don’t collect sensitive data",
      paragraphs: [
        "We don’t ask for sensitive personal data (health, ethnic origin, beliefs, etc.) or financial data. Please don’t include it in your messages.",
      ],
    },
    {
      heading: "How we use your data",
      paragraphs: ["Purposes needed to handle your request:"],
      list: [
        "Answering your questions about the hotel or the apartments for sale.",
        "Sending you the information, availability and prices you asked for, and following up on your request.",
      ],
    },
    {
      heading: "Additional purposes",
      paragraphs: [
        "We use browsing data to produce statistics on how the site is used and to improve it. This purpose isn’t needed to serve you; you can opt out at any time by disabling cookies in your browser, installing the Google Analytics opt-out add-on (tools.google.com/dlpage/gaoptout) or writing to us.",
      ],
    },
    {
      heading: "Bookings",
      paragraphs: [
        "Room bookings are made on the Staygrid booking engine, a third-party platform. Any data you enter there (including payment details) is handled under that platform’s privacy notice.",
      ],
    },
    {
      heading: "Who we share your data with",
      paragraphs: [
        "We don’t sell or rent your data. We don’t transfer it to third parties without your consent, except where the law allows it or a competent authority requires it.",
        "To run the site we rely on providers that process data only on our behalf and under our instructions: Vercel (website hosting), Resend (sending the form emails) and Google (analytics). These providers may store information on servers outside Mexico.",
      ],
    },
    {
      heading: "Your ARCO rights and withdrawing consent",
      paragraphs: [
        `You have the right to Access, Rectify and Cancel your data or to Oppose its use (ARCO rights), and to withdraw your consent or limit how your data is used. To do so, write to ${email} including: your name and a way to reply to you; a copy of your ID (or your legal representative’s, with proof of representation); which right you want to exercise and over which data; and any document that helps us find it.`,
        "We will reply within 20 business days of receiving your complete request. If you feel your request wasn’t properly handled, you can turn to the Mexican data-protection authority (currently the Secretaría Anticorrupción y Buen Gobierno).",
      ],
    },
    {
      heading: "Cookies",
      paragraphs: [
        "This site doesn’t set its own cookies; it only uses Google Analytics cookies for statistics. You can delete or block them in your browser settings; the site will keep working.",
      ],
    },
    {
      heading: "Changes to this notice",
      paragraphs: [
        "We may update this notice because of changes in the law or in our services. The current version will always be published on this page with its update date. If there is any discrepancy, the Spanish version prevails.",
      ],
    },
  ],
};

export function getPrivacyNotice(lang: Locale): PrivacyNotice {
  return lang === "es" ? es : en;
}
