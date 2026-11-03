import type { Metadata } from "next";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { CONTACT } from "@/lib/constants";
import { pageMetadata } from "@/lib/structured-data";
import { AVAILABLE_UNITS, TOWERS, UNITS } from "@/lib/units";
import PageHero from "@/components/PageHero";
import SaleExplorer from "@/components/for-sale/SaleExplorer";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const f = getDictionary(lang).forSale;
  return pageMetadata(lang, "/for-sale", f.title, f.intro.replace("{count}", String(AVAILABLE_UNITS.length)), "/images/hotel/facade.jpg");
}

export default async function ForSalePage({ params }: Props) {
  const lang = (await params).lang as Locale;
  const f = getDictionary(lang).forSale;

  return (
    <>
      <PageHero
        title={f.title}
        intro={f.intro.replace("{count}", String(AVAILABLE_UNITS.length))}
        image="/images/hotel/facade.jpg"
        imageAlt="Desert Moon towers in Cerritos Beach"
      />

      <section className="bg-night text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-20">
          <h2 className="text-3xl font-bold md:text-4xl">{f.highlightsTitle}</h2>
          <div className="mt-10 grid gap-10 md:grid-cols-3">
            {f.highlights.map((h) => (
              <div key={h.title} className="border-t border-white/15 pt-6">
                <h3 className="text-2xl font-bold text-moon">{h.title}</h3>
                <p className="mt-3 leading-relaxed text-white/80">{h.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SaleExplorer
        units={UNITS}
        towers={[...TOWERS].reverse()}
        lang={lang}
        fallbackEmail={CONTACT.email}
        labels={{
          pickTitle: f.pickTitle,
          pickIntro: f.pickIntro,
          tower: f.tower,
          upper: f.upper,
          lower: f.lower,
          available: f.available,
          sold: f.sold,
          selected: f.selected,
          formTitle: f.formTitle,
          pickHint: f.pickHint,
          close: getDictionary(lang).rooms.closeGallery,
          name: f.name,
          email: f.email,
          phone: f.phone,
          units: f.units,
          message: f.message,
          send: f.send,
          sending: f.sending,
          success: f.success,
          error: f.error,
          required: f.required,
        }}
      />
    </>
  );
}
