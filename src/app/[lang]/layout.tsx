import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import { Bricolage_Grotesque, Figtree } from "next/font/google";
import { isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { SITE_URL } from "@/lib/constants";
import { getHotelSchema } from "@/lib/structured-data";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileBookBar from "@/components/layout/MobileBookBar";
import "../globals.css";

const GA_ID = "G-4T4P346CJL";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  display: "swap",
});

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const viewport: Viewport = {
  themeColor: "#18233a",
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDictionary(lang);
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: t.meta.siteTitle, template: "%s · Desert Moon Hotel" },
    description: t.meta.siteDescription,
    alternates: {
      canonical: `/${lang}`,
      languages: { en: "/en", es: "/es", "x-default": "/en" },
    },
    openGraph: {
      title: t.meta.siteTitle,
      description: t.meta.siteDescription,
      url: `/${lang}`,
      siteName: "Desert Moon Hotel",
      images: [{ url: "/images/og-default.jpg", width: 1200, height: 630 }],
      locale: t.meta.ogLocale,
      type: "website",
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);

  return (
    <html lang={lang} className={`${bricolage.variable} ${figtree.variable}`}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getHotelSchema(lang)) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
        >
          {t.nav.skip}
        </a>
        <Header
          lang={lang}
          labels={{
            home: t.nav.home,
            rooms: t.nav.rooms,
            restaurant: t.nav.restaurant,
            activities: t.nav.activities,
            about: t.nav.about,
            contact: t.nav.contact,
            forSale: t.forSale.nav,
            book: t.nav.book,
            menu: t.nav.menu,
            close: t.nav.close,
            language: t.nav.language,
            languageShort: t.nav.languageShort,
          }}
        />
        <main id="main">{children}</main>
        <Footer lang={lang} t={t} />
        <MobileBookBar label={t.nav.book} />
        {/* Same Google Analytics property as the old site, so traffic history continues */}
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="lazyOnload" />
        <Script id="ga4" strategy="lazyOnload">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
        </Script>
      </body>
    </html>
  );
}
