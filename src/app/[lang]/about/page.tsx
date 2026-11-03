import Image from "next/image";
import type { Metadata } from "next";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { pageMetadata } from "@/lib/structured-data";
import PageHero from "@/components/PageHero";
import BookButton from "@/components/BookButton";
import FeatureList from "@/components/FeatureList";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDictionary(lang);
  return pageMetadata(lang, "/about", t.about.title, t.about.lead, "/images/hotel/facade.jpg");
}

const PHOTOS = [
  { src: "/images/hotel/infinity-pool.jpg", alt: "Infinity pool overlooking the ocean", span: "col-span-2 row-span-2" },
  { src: "/images/hotel/balconies.jpg", alt: "Terracotta balconies of the hotel", span: "" },
  { src: "/images/hotel/garden-entrance.jpg", alt: "Cactus garden at a room entrance", span: "" },
  { src: "/images/hotel/terrace-table.jpg", alt: "Table on the terrace with a view of the hills", span: "" },
  { src: "/images/hotel/pool-edge.jpg", alt: "Edge of the infinity pool", span: "" },
];

export default async function AboutPage({ params }: Props) {
  const lang = (await params).lang as Locale;
  const t = getDictionary(lang);

  return (
    <>
      <PageHero title={t.about.title} intro={t.about.lead} image="/images/hotel/facade.jpg" imageAlt="Desert Moon Hotel building" />

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

      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
        <h2 className="text-4xl font-bold md:text-5xl">{t.home.reviewsTitle}</h2>
        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {t.home.reviews.map((r) => (
            <figure key={r.name} className="border-l-2 border-adobe pl-6">
              <blockquote className="text-lg leading-relaxed">“{r.text}”</blockquote>
              <figcaption className="mt-4 font-semibold text-ink/70">{r.name}</figcaption>
            </figure>
          ))}
        </div>
      </section>
    </>
  );
}
