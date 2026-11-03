export const locales = ["en", "es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Builds a locale-prefixed path: localePath("es", "/rooms") → "/es/rooms" */
export function localePath(lang: Locale, path = "/"): string {
  return path === "/" ? `/${lang}` : `/${lang}${path}`;
}
