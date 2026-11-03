import Image from "next/image";
import type { Metadata } from "next";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { directionsFromHotel } from "@/lib/constants";
import { pageMetadata } from "@/lib/structured-data";
import PageHero from "@/components/PageHero";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDictionary(lang);
  return pageMetadata(lang, "/activities", t.activities.title, t.activities.intro, "/images/surf/surfer.jpg");
}

export default async function ActivitiesPage({ params }: Props) {
  const lang = (await params).lang as Locale;
  const t = getDictionary(lang);

  return (
    <>
      <PageHero title={t.activities.title} intro={t.activities.intro} image="/images/surf/surfer.jpg" imageAlt="Surfer carving a wave" />

      {/* Surf comes first: it's why most guests are here */}
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-20 md:px-8 md:py-28 lg:grid-cols-12 lg:items-center">
        <div className="relative aspect-[16/10] overflow-hidden rounded-3xl lg:col-span-7">
          <Image src="/images/surf/big-wave.jpg" alt="Surfer on a big wave" fill sizes="(min-width: 1024px) 58vw, 100vw" className="object-cover" />
        </div>
        <div className="lg:col-span-5">
          <h2 className="text-4xl font-bold md:text-5xl">{t.activities.surfTitle}</h2>
          <p className="mt-5 text-lg leading-relaxed text-ink/80">{t.activities.surfBody}</p>
          <p className="mt-6 font-semibold text-pacific">{t.activities.askFrontDesk}</p>
        </div>
      </section>

      <section className="bg-sand">
        <ul className="mx-auto grid max-w-7xl gap-px overflow-hidden px-4 py-20 md:grid-cols-2 md:px-8 md:py-24">
          {t.activities.items.map((item) => (
            <li key={item.title} className="border-t border-ink/15 py-8 md:pr-12">
              <p className="text-sm font-semibold text-adobe">{item.distance}</p>
              <h3 className="mt-1 text-3xl font-bold">{item.title}</h3>
              <p className="mt-3 max-w-[54ch] leading-relaxed text-ink/80">{item.body}</p>
              {item.destination && (
                <a
                  href={directionsFromHotel(item.destination)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex font-semibold text-pacific underline underline-offset-4 hover:no-underline"
                >
                  {t.common.directions}
                </a>
              )}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
