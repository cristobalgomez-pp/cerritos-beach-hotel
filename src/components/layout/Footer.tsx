import Link from "next/link";
import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { CONTACT, SOCIAL, telHref } from "@/lib/constants";
import { ROOMS } from "@/lib/rooms";
import MoonMark from "@/components/MoonMark";

export default function Footer({ lang, t }: { lang: Locale; t: Dictionary }) {
  const explore = [
    { href: "/rooms", label: t.nav.rooms },
    { href: "/restaurant", label: t.nav.restaurant },
    { href: "/activities", label: t.nav.activities },
    { href: "/about", label: t.nav.about },
    { href: "/for-sale", label: t.forSale.nav },
    { href: "/contact", label: t.nav.contact },
  ];

  return (
    <footer className="bg-night text-white/80">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 pb-28 pt-16 md:grid-cols-12 md:px-8 lg:pb-16">
        <div className="md:col-span-4">
          <Link href={localePath(lang)} className="flex items-center gap-2 text-white">
            <MoonMark className="h-7 w-7 text-moon" />
            <span className="font-display text-2xl font-extrabold tracking-tight">Desert Moon</span>
          </Link>
          <p className="mt-4 max-w-xs leading-relaxed">{t.footer.tagline}</p>
        </div>

        <div className="md:col-span-2">
          <h2 className="font-sans text-sm font-semibold tracking-normal text-white">{t.footer.explore}</h2>
          <ul className="mt-3 space-y-0.5">
            {explore.map((l) => (
              <li key={l.href}>
                <Link href={localePath(lang, l.href)} className="inline-block py-1.5 hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <h2 className="font-sans text-sm font-semibold tracking-normal text-white">{t.nav.rooms}</h2>
          <ul className="mt-3 space-y-0.5">
            {ROOMS.map((r) => (
              <li key={r.slug}>
                <Link href={localePath(lang, `/rooms/${r.slug}`)} className="inline-block py-1.5 hover:text-white">
                  {r.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <h2 className="font-sans text-sm font-semibold tracking-normal text-white">{t.footer.contact}</h2>
          <address className="mt-3 space-y-0.5 not-italic">
            <p>
              <a href={telHref(CONTACT.phonePrimary)} className="inline-block py-1.5 hover:text-white">
                {CONTACT.phonePrimary}
              </a>
            </p>
            <p>
              <a href={telHref(CONTACT.phoneSecondary)} className="inline-block py-1.5 hover:text-white">
                {CONTACT.phoneSecondary}
              </a>
            </p>
            <p>
              <a href={`mailto:${CONTACT.email}`} className="inline-block py-1.5 hover:text-white">
                {CONTACT.email}
              </a>
            </p>
            <p className="max-w-xs leading-relaxed">{CONTACT.address}</p>
          </address>
          <div className="mt-6 flex gap-5">
            <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer" className="inline-block py-1.5 hover:text-white">
              Instagram
            </a>
            <a href={SOCIAL.facebook} target="_blank" rel="noopener noreferrer" className="inline-block py-1.5 hover:text-white">
              Facebook
            </a>
          </div>
        </div>

        <p className="border-t border-white/10 pt-6 text-sm text-white/50 md:col-span-12">
          © {new Date().getFullYear()} Desert Moon Hotel. {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}
