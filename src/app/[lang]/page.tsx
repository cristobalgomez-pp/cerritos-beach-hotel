import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { isLocale, localePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { MAP_DIRECTIONS_URL, MAP_EMBED_URL, CONTACT } from "@/lib/constants";
import { ROOMS } from "@/lib/rooms";
import { pageMetadata } from "@/lib/structured-data";
import HeroSlideshow from "@/components/home/HeroSlideshow";
import RoomTile from "@/components/rooms/RoomTile";
import BookButton from "@/components/BookButton";
import FeatureList from "@/components/FeatureList";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDictionary(lang);
  return { ...pageMetadata(lang, "", t.meta.siteTitle, t.meta.siteDescription), title: { absolute: t.meta.siteTitle } };
}

export default async function Home({ params }: Props) {
  const { lang: raw } = await params;
  const lang = raw as Locale;
  const t = getDictionary(lang);

  return (
    <>
      {/* Hero */}
      <section className="relative isolate flex min-h-[600px] h-[100svh] items-end text-white">
        <HeroSlideshow
          slides={[
            { src: "/images/hotel/facade.jpg", alt: "Desert Moon Hotel, Cerritos Beach" },
            { src: "/images/hotel/rooftop-terrace.jpg", alt: "Rooftop terrace with red umbrellas" },
            { src: "/images/surf/big-wave.jpg", alt: "Surfer on a big wave" },
            { src: "/images/surf/surfer.jpg", alt: "Surfer carving a wave" },
          ]}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-night/85 via-night/25 to-night/30" aria-hidden="true" />
        <div className="relative mx-auto w-full max-w-7xl px-4 pb-14 md:px-8 md:pb-20">
          <h1>
            <span className="block font-display text-[clamp(3.5rem,13vw,10.5rem)] font-extrabold leading-[0.85] tracking-[-0.045em]">
              Desert Moon
            </span>
            <span className="mt-5 block max-w-2xl font-display text-2xl font-semibold leading-tight tracking-tight md:text-4xl">
              {t.home.heroLine}
            </span>
          </h1>
          <p className="mt-4 max-w-xl text-lg text-white/85">{t.home.heroSub}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <BookButton label={t.common.bookRoom} />
            <Link
              href={localePath(lang, "/rooms")}
              className="inline-flex items-center justify-center rounded-full border border-white/70 px-6 py-3 text-[15px] font-semibold transition-colors hover:bg-white/10"
            >
              {t.common.seeRooms}
            </Link>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="mx-auto grid max-w-7xl gap-14 px-4 py-20 md:px-8 md:py-28 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-6">
          <h2 className="text-4xl font-bold leading-[1.05] md:text-5xl">{t.home.introTitle}</h2>
          <p className="mt-6 max-w-[60ch] text-lg leading-relaxed text-ink/80">{t.home.introBody}</p>
          <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-ink/10 pt-8">
            {t.home.facts.map((f) => (
              <div key={f.label}>
                <dt className="sr-only">{f.label}</dt>
                <dd>
                  <span className="block font-display text-3xl font-bold tracking-tight text-adobe">{f.value}</span>
                  <span className="text-ink/70">{f.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="relative lg:col-span-6">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
            <Image
              src="/images/rooms/king-suite/1.jpg"
              alt="Cerritos Beach seen from one of the rooms"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-10 -left-4 hidden w-[42%] overflow-hidden rounded-2xl border-[6px] border-bone sm:block md:-left-10">
            <div className="relative aspect-square">
              <Image src="/images/hotel/pool-edge.jpg" alt="Infinity pool edge" fill sizes="260px" className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Rooms */}
      <section className="mx-auto max-w-7xl px-4 pb-20 pt-8 md:px-8 md:pb-28">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h2 className="text-4xl font-bold md:text-5xl">{t.home.roomsTitle}</h2>
            <p className="mt-4 max-w-xl text-lg text-ink/75">{t.home.roomsBody}</p>
          </div>
          <Link href={localePath(lang, "/rooms")} className="font-semibold text-pacific underline underline-offset-4 hover:no-underline">
            {t.common.seeRooms}
          </Link>
        </div>
        <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {ROOMS.map((room) => (
            <RoomTile key={room.slug} room={room} lang={lang} t={t} />
          ))}
        </div>
      </section>

      {/* Surf */}
      <section className="relative isolate overflow-hidden bg-night text-white">
        <Image
          src="/images/surf/whale-lineup.jpg"
          alt="Surfers waiting in the lineup while a whale breaches"
          fill
          sizes="100vw"
          className="-z-10 object-cover opacity-60"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-night via-night/70 to-transparent" aria-hidden="true" />
        <div className="mx-auto max-w-7xl px-4 py-28 md:px-8 md:py-40">
          <h2 className="max-w-xl text-4xl font-bold leading-[1.05] md:text-6xl">{t.home.surfTitle}</h2>
          <p className="mt-6 max-w-lg text-lg text-white/85">{t.home.surfBody}</p>
          <Link
            href={localePath(lang, "/activities")}
            className="mt-8 inline-flex rounded-full bg-bone px-6 py-3 text-[15px] font-semibold text-ink transition-colors hover:bg-white"
          >
            {t.home.surfCta}
          </Link>
        </div>
      </section>

      {/* Bar */}
      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-20 md:px-8 md:py-28 lg:grid-cols-12 lg:items-center">
        <div className="grid grid-cols-2 gap-3 lg:col-span-7">
          {[
            { src: "/images/restaurant/rock-wall.jpg", alt: "Wall of painted rocks" },
            { src: "/images/restaurant/food.jpg", alt: "Nachos at the bar" },
            { src: "/images/restaurant/friends.jpg", alt: "Friends with drinks on the terrace" },
            { src: "/images/restaurant/pina-colada.jpg", alt: "Piña colada served in a pineapple" },
          ].map((p, i) => (
            <div key={p.src} className={`relative aspect-[4/3] overflow-hidden rounded-2xl ${i % 2 === 1 ? "translate-y-6" : ""}`}>
              <Image src={p.src} alt={p.alt} fill sizes="(min-width: 1024px) 28vw, 50vw" className="object-cover" />
            </div>
          ))}
        </div>
        <div className="lg:col-span-5 lg:pl-6">
          <h2 className="text-4xl font-bold md:text-5xl">{t.home.barTitle}</h2>
          <p className="mt-6 text-lg leading-relaxed text-ink/80">{t.home.barBody}</p>
          <Link
            href={localePath(lang, "/restaurant")}
            className="mt-8 inline-flex font-semibold text-pacific underline underline-offset-4 hover:no-underline"
          >
            {t.home.barCta}
          </Link>
        </div>
      </section>

      <FeatureList title={t.features.title} items={t.features.items} />

      {/* Reviews */}
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

      {/* Find us */}
      <section className="bg-sand">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 md:px-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-4">
            <h2 className="text-4xl font-bold">{t.home.findUsTitle}</h2>
            <p className="mt-4 text-lg leading-relaxed text-ink/80">{t.home.findUsBody}</p>
            <p className="mt-2 text-ink/70">{CONTACT.email}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={MAP_DIRECTIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex rounded-full bg-pacific px-6 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-[#0b4552]"
              >
                {t.common.directions}
              </a>
              <BookButton label={t.common.bookRoom} />
            </div>
          </div>
          <div className="overflow-hidden rounded-3xl lg:col-span-8">
            <iframe
              title={t.contact.mapTitle}
              src={MAP_EMBED_URL}
              className="h-[360px] w-full md:h-[440px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}
