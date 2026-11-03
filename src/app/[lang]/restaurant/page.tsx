import Image from "next/image";
import type { Metadata } from "next";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { getRestaurantSchema, pageMetadata } from "@/lib/structured-data";
import PageHero from "@/components/PageHero";
import BookButton from "@/components/BookButton";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDictionary(lang);
  return pageMetadata(lang, "/restaurant", t.restaurant.title, t.restaurant.intro, "/images/hotel/rooftop-terrace.jpg");
}

// Photos for each section of the dictionary, in the same order
const SECTION_PHOTOS = [
  [
    { src: "/images/restaurant/bar.jpg", alt: "The bar with bamboo stools" },
    { src: "/images/restaurant/rip-tide-sign.jpg", alt: "Desert Moon Rip Tide Bar & Grill sign" },
  ],
  [
    { src: "/images/restaurant/rock-wall.jpg", alt: "Wall of rocks painted by guests" },
    { src: "/images/restaurant/rock-window.jpg", alt: "Painted rock wall framing the desert" },
  ],
  [
    { src: "/images/restaurant/food.jpg", alt: "Plate of nachos with guacamole" },
    { src: "/images/restaurant/good-times.jpg", alt: "Guest laughing at the bar" },
  ],
  [
    { src: "/images/restaurant/friends.jpg", alt: "Friends toasting with margaritas" },
    { src: "/images/restaurant/pina-colada.jpg", alt: "Piña colada served in a pineapple" },
  ],
];

export default async function RestaurantPage({ params }: Props) {
  const lang = (await params).lang as Locale;
  const t = getDictionary(lang);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getRestaurantSchema(lang)) }} />
      <PageHero
        title={t.restaurant.title}
        intro={t.restaurant.intro}
        image="/images/hotel/rooftop-terrace.jpg"
        imageAlt="Rooftop terrace with red umbrellas"
      />

      <div className="mx-auto max-w-6xl space-y-20 px-4 py-20 md:space-y-28 md:px-8 md:py-28">
        {t.restaurant.sections.map((section, i) => (
          <section key={section.title} className="grid gap-8 md:grid-cols-12 md:items-center md:gap-12">
            <div className={`md:col-span-5 ${i % 2 === 1 ? "md:order-2" : ""}`}>
              <h2 className="text-3xl font-bold md:text-4xl">{section.title}</h2>
              <p className="mt-4 text-lg leading-relaxed text-ink/80">{section.body}</p>
            </div>
            <div className="grid grid-cols-2 gap-3 md:col-span-7">
              {SECTION_PHOTOS[i].map((p, j) => (
                <div key={p.src} className={`relative aspect-[4/5] overflow-hidden rounded-2xl bg-sand ${j === 1 ? "mt-10" : ""}`}>
                  <Image src={p.src} alt={p.alt} fill sizes="(min-width: 768px) 28vw, 50vw" className="object-cover" />
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <section className="bg-adobe text-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-14 md:flex-row md:items-center md:justify-between md:px-8">
          <p className="max-w-xl font-display text-2xl font-bold leading-snug md:text-3xl">{t.restaurant.breakfast}</p>
          <BookButton label={t.common.bookRoom} variant="light" />
        </div>
      </section>
    </>
  );
}
