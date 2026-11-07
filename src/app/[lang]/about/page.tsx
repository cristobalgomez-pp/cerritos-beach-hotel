import Image from "next/image";
import type { Metadata } from "next";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { pageMetadata } from "@/lib/structured-data";
import PageHero from "@/components/PageHero";
import BookButton from "@/components/BookButton";
import FeatureList from "@/components/FeatureList";
import GuestReviews from "@/components/GuestReviews";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDictionary(lang);
  return pageMetadata(lang, "/about", t.about.title, t.about.lead, "/images/hd/facade.jpg");
}

const PHOTOS = [
  { src: "/images/hd/pool-loungers.jpg", alt: "Infinity pool and loungers facing the ocean", span: "col-span-2 row-span-2" },
  { src: "/images/hd/rooftop-pergola.jpg", alt: "Rooftop pergola with rocking chairs", span: "" },
  { src: "/images/hd/rock-wall.jpg", alt: "Wall of rocks painted by guests", span: "" },
  { src: "/images/hd/terrace-dusk.jpg", alt: "Terrace at dusk", span: "" },
  { src: "/images/hd/rooftop-grill.jpg", alt: "Rooftop terrace with grill and mountain views", span: "" },
];

export default async function AboutPage({ params }: Props) {
  const lang = (await params).lang as Locale;
  const t = getDictionary(lang);

  return (
    <>
      <PageHero title={t.about.title} intro={t.about.lead} image="/images/hd/towers-cactus.jpg" imageAlt="Desert Moon towers among cactus" />

      <section className="mx-auto grid max-w-7xl gap-14 px-4 py-20 md:px-8 md:py-28 lg:grid-cols-12">
        <div className="space-y-6 text-lg leading-relaxed text-ink/85 lg:col-span-5">
          {t.about.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <BookButton label={t.common.bookRoom} className="mt-4" />
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:col-span-7 lg:grid-cols-3">
          {PHOTOS.map((p) => (
            <div key={p.src} className={`relative aspect-square overflow-hidden rounded-2xl bg-sand ${p.span}`}>
              <Image src={p.src} alt={p.alt} fill sizes="(min-width: 1024px) 30vw, 50vw" className="object-cover" />
            </div>
          ))}
        </div>
      </section>

      <FeatureList title={t.features.title} items={t.features.items} />

      <GuestReviews lang={lang} t={t} />
    </>
  );
}
