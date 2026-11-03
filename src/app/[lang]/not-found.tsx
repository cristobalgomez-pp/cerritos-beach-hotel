import Link from "next/link";
import { getDictionary } from "@/i18n/get-dictionary";

// not-found doesn't receive params; English copy with a Spanish line keeps it useful for both
export default function NotFound() {
  const en = getDictionary("en");
  const es = getDictionary("es");
  return (
    <section className="mx-auto flex min-h-[80svh] max-w-3xl flex-col justify-center px-4 pt-24">
      <h1 className="text-5xl font-extrabold md:text-6xl">{en.notFound.title}</h1>
      <p className="mt-4 text-lg text-ink/75">
        {en.notFound.body} {es.notFound.body}
      </p>
      <div className="mt-8 flex gap-3">
        <Link href="/en" className="rounded-full bg-adobe px-6 py-3 font-semibold text-white">
          {en.notFound.cta}
        </Link>
        <Link href="/es" className="rounded-full border border-ink/25 px-6 py-3 font-semibold">
          {es.notFound.cta}
        </Link>
      </div>
    </section>
  );
}
