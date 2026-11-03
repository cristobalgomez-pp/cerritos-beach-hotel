import Image from "next/image";

/** Photo header for inner pages; the transparent nav sits on top of it */
export default function PageHero({
  title,
  intro,
  image,
  imageAlt,
  children,
}: {
  title: string;
  intro?: string;
  image: string;
  imageAlt: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative isolate flex min-h-[460px] h-[62svh] items-end bg-night text-white">
      <Image src={image} alt={imageAlt} fill priority sizes="100vw" className="-z-10 object-cover" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-night/85 via-night/30 to-night/40" aria-hidden="true" />
      <div className="mx-auto w-full max-w-7xl px-4 pb-12 md:px-8 md:pb-16">
        {children}
        <h1 className="max-w-4xl text-5xl font-extrabold leading-[0.95] tracking-[-0.035em] md:text-7xl">{title}</h1>
        {intro && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/85">{intro}</p>}
      </div>
    </section>
  );
}
