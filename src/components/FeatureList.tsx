/** Slim band listing what every stay includes */
export default function FeatureList({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="bg-pacific text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-12 md:px-8 lg:flex-row lg:items-center lg:gap-12">
        <h2 className="shrink-0 text-2xl font-bold">{title}</h2>
        <ul className="flex flex-wrap gap-x-8 gap-y-3 text-[15px] text-white/90">
          {items.map((item) => (
            <li key={item} className="flex items-center gap-2">
              <svg viewBox="0 0 16 16" className="h-4 w-4 text-moon" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path d="M3 8.5l3 3 7-7" />
              </svg>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
