import type { Metadata } from "next";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { CONTACT, MAP_DIRECTIONS_URL, MAP_EMBED_URL, RENT_A_CAR, telHref } from "@/lib/constants";
import { pageMetadata } from "@/lib/structured-data";
import PageHero from "@/components/PageHero";
import BookButton from "@/components/BookButton";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDictionary(lang);
  return pageMetadata(lang, "/contact", t.contact.title, t.contact.intro);
}

export default async function ContactPage({ params }: Props) {
  const lang = (await params).lang as Locale;
  const t = getDictionary(lang);

  const rows = [
    {
      label: t.contact.booking,
      content: <BookButton label={t.common.bookRoom} />,
    },
    {
      label: t.contact.primary,
      content: (
        <a href={telHref(CONTACT.phonePrimary)} className="hover:text-adobe">
          {CONTACT.phonePrimary}
        </a>
      ),
    },
    {
      label: t.contact.secondary,
      content: (
        <a href={telHref(CONTACT.phoneSecondary)} className="hover:text-adobe">
          {CONTACT.phoneSecondary}
        </a>
      ),
    },
    {
      label: t.contact.email,
      content: (
        <a href={`mailto:${CONTACT.email}`} className="hover:text-adobe">
          {CONTACT.email}
        </a>
      ),
    },
    { label: t.contact.address, content: <span>{CONTACT.address}</span> },
  ];

  return (
    <>
      <PageHero title={t.contact.title} intro={t.contact.intro} image="/images/rooms/king-suite/1.jpg" imageAlt="Cerritos Beach from a room window" />

      <section className="mx-auto grid max-w-7xl gap-16 px-4 py-20 md:px-8 md:py-28 lg:grid-cols-12">
        <dl className="divide-y divide-ink/10 border-y border-ink/10 lg:col-span-6">
          {rows.map((row) => (
            <div key={row.label} className="grid gap-2 py-6 sm:grid-cols-3 sm:items-center">
              <dt className="font-semibold text-ink/60">{row.label}</dt>
              <dd className="font-display text-xl font-semibold sm:col-span-2">{row.content}</dd>
            </div>
          ))}
        </dl>

        <div className="lg:col-span-6">
          <h2 className="text-3xl font-bold">{t.contact.gettingHere}</h2>
          <p className="mt-4 text-lg leading-relaxed text-ink/80">{t.contact.gettingHereBody}</p>
          <a
            href={MAP_DIRECTIONS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex rounded-full bg-pacific px-6 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-[#0b4552]"
          >
            {t.common.directions}
          </a>
          <h3 className="mt-12 text-xl font-bold">{t.contact.rentACar}</h3>
          <ul className="mt-4 flex flex-wrap gap-3">
            {RENT_A_CAR.map((r) => (
              <li key={r.name}>
                <a
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex rounded-full border border-ink/20 px-5 py-2.5 font-semibold transition-colors hover:border-ink"
                >
                  {r.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 pb-24 md:px-8">
        <iframe
          title={t.contact.mapTitle}
          src={MAP_EMBED_URL}
          className="h-[420px] w-full rounded-3xl"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </>
  );
}
