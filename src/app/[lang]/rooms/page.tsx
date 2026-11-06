import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { isLocale, localePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { ROOMS } from "@/lib/rooms";
import { pageMetadata } from "@/lib/structured-data";
import PageHero from "@/components/PageHero";
import BookButton from "@/components/BookButton";
import FeatureList from "@/components/FeatureList";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDictionary(lang);
  return pageMetadata(lang, "/rooms", t.rooms.title, t.rooms.intro, "/images/rooms/pent-house-a/cover.jpg");
}

export default async function RoomsPage({ params }: Props) {
  const lang = (await params).lang as Locale;
  const t = getDictionary(lang);

  return (
    <>
      <PageHero title={t.rooms.title} intro={t.rooms.intro} image="/images/hd/balcony-ocean.jpg" imageAlt="Balcony looking out to Cerritos Beach" />

      <div className="mx-auto max-w-7xl space-y-20 px-4 py-20 md:space-y-28 md:px-8 md:py-28">
        {ROOMS.map((room, i) => {
          const detail = t.rooms.details[room.slug];
          return (
            <article key={room.slug} className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-14">
              <Link
                href={localePath(lang, `/rooms/${room.slug}`)}
                className={`group relative block aspect-[16/10] overflow-hidden rounded-3xl bg-sand lg:col-span-7 ${
                  i % 2 === 1 ? "lg:order-2" : ""
                }`}
              >
                <Image
                  src={room.cover}
                  alt={room.name}
                  fill
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </Link>
              <div className="lg:col-span-5">
                <h2 className="text-4xl font-bold md:text-5xl">{room.name}</h2>
                <p className="mt-2 text-lg font-medium text-pacific">{detail.tagline}</p>
                <p className="mt-5 leading-relaxed text-ink/80">{detail.description}</p>
                <ul className="mt-6 flex flex-wrap gap-2 text-sm">
                  {[t.common.upTo(room.maxGuests), t.rooms.beds[room.beds], t.rooms.bath].map((x) => (
                    <li key={x} className="rounded-full bg-sand px-3 py-1.5 font-medium">
                      {x}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href={localePath(lang, `/rooms/${room.slug}`)}
                    className="inline-flex items-center justify-center rounded-full border border-ink/25 px-6 py-3 text-[15px] font-semibold transition-colors hover:border-ink"
                  >
                    {t.common.viewRoom}
                  </Link>
                  <BookButton label={t.nav.book} />
                </div>
              </div>
            </article>
          );
        })}
        <p className="text-sm text-ink/75">* {t.common.oceanViewNote}</p>
      </div>

      <FeatureList title={t.features.title} items={t.features.items} />
    </>
  );
}
