import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, localePath, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { getRoom, ROOMS } from "@/lib/rooms";
import { pageMetadata } from "@/lib/structured-data";
import PageHero from "@/components/PageHero";
import BookButton from "@/components/BookButton";
import Gallery from "@/components/rooms/Gallery";
import RoomTile from "@/components/rooms/RoomTile";

type Props = { params: Promise<{ lang: string; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((lang) => ROOMS.map((room) => ({ lang, slug: room.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  const room = getRoom(slug);
  if (!isLocale(lang) || !room) return {};
  const t = getDictionary(lang);
  const d = t.rooms.details[room.slug];
  return pageMetadata(lang, `/rooms/${room.slug}`, `${room.name} — ${d.tagline}`, d.description, room.cover);
}

export default async function RoomPage({ params }: Props) {
  const { lang: raw, slug } = await params;
  const lang = raw as Locale;
  const room = getRoom(slug);
  if (!room) notFound();
  const t = getDictionary(lang);
  const detail = t.rooms.details[room.slug];
  const photos = [room.cover, ...room.photos];

  return (
    <>
      <PageHero title={room.name} intro={detail.tagline} image={room.cover} imageAlt={room.name}>
        <Link
          href={localePath(lang, "/rooms")}
          className="mb-4 inline-flex items-center gap-1 text-sm font-semibold text-white/80 hover:text-white"
        >
          <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path d="M10 3L5 8l5 5" />
          </svg>
          {t.rooms.backToRooms}
        </Link>
      </PageHero>

      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 md:px-8 md:py-24 lg:grid-cols-12">
        <div className="space-y-16 lg:col-span-8">
          <p className="max-w-[62ch] text-xl leading-relaxed text-ink/85">{detail.description}</p>

          <section aria-labelledby="gallery-title">
            <h2 id="gallery-title" className="mb-6 text-3xl font-bold">
              {t.rooms.galleryTitle}
            </h2>
            <Gallery
              photos={photos}
              labels={{
                close: t.rooms.closeGallery,
                prev: t.rooms.prev,
                next: t.rooms.next,
                photoOf: t.rooms.photoOf.replace("{room}", room.name),
              }}
            />
          </section>

          {room.video && (
            <section aria-labelledby="video-title">
              <h2 id="video-title" className="mb-6 text-3xl font-bold">
                {t.rooms.videoTitle}
              </h2>
              <video
                controls
                muted
                playsInline
                preload="none"
                poster={room.video.poster}
                className={`w-full rounded-2xl bg-night ${room.video.vertical ? "mx-auto max-h-[80vh] max-w-sm" : "aspect-video"}`}
              >
                <source src={room.video.src} type="video/mp4" />
              </video>
            </section>
          )}
        </div>

        <aside className="lg:col-span-4">
          <div className="rounded-3xl bg-sand p-7 lg:sticky lg:top-28">
            <ul className="space-y-1 font-display text-2xl font-bold">
              <li>{t.common.upTo(room.maxGuests)}</li>
              <li>{t.rooms.beds[room.beds]}</li>
              <li>{t.rooms.bath}</li>
            </ul>
            <h2 className="mt-8 font-sans text-sm font-semibold tracking-normal text-ink/75">{t.rooms.amenitiesTitle}</h2>
            <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-[15px] lg:grid-cols-1 xl:grid-cols-2">
              {room.amenities.map((a) => (
                <li key={a} className="flex items-start gap-2">
                  <svg viewBox="0 0 16 16" className="mt-1 h-4 w-4 shrink-0 text-pacific" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path d="M3 8.5l3 3 7-7" />
                  </svg>
                  {t.rooms.amenities[a]}
                </li>
              ))}
            </ul>
            <BookButton label={t.nav.book} className="mt-8 w-full py-4 text-base" />
            <p className="mt-4 text-xs text-ink/75">* {t.common.oceanViewNote}</p>
          </div>
        </aside>
      </div>

      <section className="mx-auto max-w-7xl px-4 pb-24 md:px-8">
        <h2 className="text-3xl font-bold">{t.rooms.otherRooms}</h2>
        <div className="mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-3">
          {ROOMS.filter((r) => r.slug !== room.slug).map((r) => (
            <RoomTile key={r.slug} room={r} lang={lang} t={t} />
          ))}
        </div>
      </section>
    </>
  );
}
