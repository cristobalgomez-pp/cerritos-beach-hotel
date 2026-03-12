import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BookNowFloat from "@/components/layout/BookNowFloat";
import { getHotelSchema, getLodgingBusinessSchema } from "@/lib/structured-data";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cerritos Beach Hotel Desert Moon | Surf Hotel in Baja California Sur",
  description:
    "Desert Moon Hotel — the closest hotel to the surf point in Cerritos Beach, Baja California Sur. Infinity pool, free breakfast, ocean view rooms.",
  metadataBase: new URL("https://cerritosbeachhotel.com"),
  openGraph: {
    title: "Cerritos Beach Hotel Desert Moon | Surf Hotel in Baja California Sur",
    description:
      "Desert Moon Hotel — the closest hotel to the surf point in Cerritos Beach, Baja California Sur. Infinity pool, free breakfast, ocean view rooms.",
    url: "https://cerritosbeachhotel.com",
    siteName: "Desert Moon Hotel",
    images: [
      {
        url: "/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Desert Moon Hotel — Cerritos Beach, Baja California Sur",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cerritos Beach Hotel Desert Moon",
    description:
      "The closest hotel to the surf point in Cerritos Beach. Infinity pool, free breakfast, ocean view rooms.",
    images: ["/images/og-default.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getHotelSchema()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getLodgingBusinessSchema()),
          }}
        />
      </head>
      <body
        className={`${playfair.variable} ${dmSans.variable} font-sans antialiased bg-offwhite text-charcoal`}
      >
        <Header />
        <main>{children}</main>
        <Footer />
        <BookNowFloat />
      </body>
    </html>
  );
}
