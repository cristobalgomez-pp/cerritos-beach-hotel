import Image from "next/image";
import type { Metadata } from "next";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { HOTEL } from "@/lib/constants";
import { pageMetadata } from "@/lib/structured-data";
import PageHero from "@/components/PageHero";
import TripsMap, { TRIP_COORDS } from "@/components/activities/TripsMap";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDictionary(lang);
  return pageMetadata(lang, "/activities", t.activities.title, t.activities.intro, "/images/surf/surfer.jpg");
}

const directionsTo = ([lon, lat]: [number, number]) =>
  `https://www.google.com/maps/dir/?api=1&origin=${HOTEL.coordinates.lat},${HOTEL.coordinates.lng}&destination=${lat},${lon}`;

export default async function ActivitiesPage({ params }: Props) {
  const lang = (await params).lang as Locale;
  const t = getDictionary(lang);
  const a = t.activities;
  const trips = a.trips.map((trip, i) => ({ ...trip, number: i + 1 }));

  return (
    <>
      <PageHero title={a.title} intro={a.intro} image="/images/surf/surfer.jpg" imageAlt="Surfer carving a wave" />

      {/* Surf comes first: it's why most guests are here */}
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-20 md:px-8 md:py-28 lg:grid-cols-12 lg:items-center">
        <div className="relative aspect-[16/10] overflow-hidden rounded-3xl lg:col-span-7">
          <Image src="/images/surf/big-wave.jpg" alt="Surfer on a big wave" fill sizes="(min-width: 1024px) 58vw, 100vw" className="object-cover" />
        </div>
        <div className="lg:col-span-5">
          <h2 className="text-4xl font-bold md:text-5xl">{a.surfTitle}</h2>
          <p className="mt-5 text-lg leading-relaxed text-ink/80">{a.surfBody}</p>
          <p className="mt-6 font-semibold text-pacific">{a.askFrontDesk}</p>
        </div>
      </section>

      {/* Things you can do without a car */}
      <section className="bg-night text-white">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-24">
          <div className="grid gap-6 md:grid-cols-12 md:items-end">
            <h2 className="text-4xl font-bold md:col-span-6 md:text-5xl">{a.nearbyTitle}</h2>
            <p className="text-lg text-white/75 md:col-span-6">{a.nearbyIntro}</p>
          </div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-3xl bg-white/10 md:grid-cols-3">
            {a.nearby.map((item) => (
              <div key={item.title} className="bg-night p-8">
                <h3 className="text-2xl font-bold text-moon">{item.title}</h3>
                <p className="mt-3 leading-relaxed text-white/80">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Day trips with the map */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
        <div className="max-w-2xl">
          <h2 className="text-4xl font-bold md:text-5xl">{a.tripsTitle}</h2>
          <p className="mt-4 text-lg text-ink/75">{a.tripsIntro}</p>
        </div>
        <div className="mt-12 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <div className="lg:sticky lg:top-28">
              <TripsMap
                trips={trips}
                labels={{ map: a.mapLabel, hotel: a.hotelLabel, pacific: a.pacific, cortez: a.cortez }}
              />
            </div>
          </div>
          <ol className="space-y-10 lg:col-span-6">
            {trips.map((trip) => (
              <li key={trip.id} className="grid grid-cols-[auto_1fr] gap-x-5">
                <span
                  className="mt-1 flex h-9 w-9 items-center justify-center rounded-full bg-adobe font-display font-bold text-white"
                  aria-hidden="true"
                >
                  {trip.number}
                </span>
                <div>
                  <h3 className="text-3xl font-bold">{trip.title}</h3>
                  <p className="mt-1 font-semibold text-adobe">{trip.time}</p>
                  <p className="mt-3 max-w-[54ch] leading-relaxed text-ink/80">{trip.body}</p>
                  {TRIP_COORDS[trip.id] && (
                    <a
                      href={directionsTo(TRIP_COORDS[trip.id])}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex font-semibold text-pacific underline underline-offset-4 hover:no-underline"
                    >
                      {t.common.directions}
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
