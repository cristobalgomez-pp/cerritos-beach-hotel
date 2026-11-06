import type { Metadata } from "next";
import { isLocale, type Locale } from "@/i18n/config";
import { pageMetadata } from "@/lib/structured-data";
import { getPrivacyNotice, PRIVACY_UPDATED } from "@/lib/privacy";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const p = getPrivacyNotice(lang);
  return pageMetadata(lang, "/privacy", p.title, p.lead);
}

export default async function PrivacyPage({ params }: Props) {
  const lang = (await params).lang as Locale;
  const p = getPrivacyNotice(lang);

  return (
    <>
      {/* Dark band so the transparent header stays readable on a page without a photo hero */}
      <section className="bg-night px-4 pb-14 pt-32 text-white md:px-8 md:pb-20 md:pt-40">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-5xl font-extrabold md:text-6xl">{p.title}</h1>
          <p className="mt-4 text-lg text-white/80">{p.lead}</p>
          <p className="mt-6 text-sm text-white/60">
            {p.updatedLabel}: {PRIVACY_UPDATED[lang]}
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl space-y-10 px-4 py-16 md:px-8 md:py-24">
        {p.sections.map((s) => (
          <section key={s.heading}>
            <h2 className="text-2xl font-bold md:text-3xl">{s.heading}</h2>
            {s.paragraphs.map((para) => (
              <p key={para} className="mt-3 leading-relaxed text-ink/85">
                {para}
              </p>
            ))}
            {s.list && (
              <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed text-ink/85">
                {s.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </article>
    </>
  );
}
