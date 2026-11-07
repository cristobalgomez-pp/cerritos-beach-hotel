import type { ReactNode } from "react";

/** A list row that opens on tap (native <details>, works without JavaScript) */
export default function DetailRow({ icon, title, meta, badge, children }: { icon: ReactNode; title: string; meta: string; badge?: string; children: ReactNode }) {
  return (
    <li>
      <details className="group border-b border-white/10">
        <summary className="flex min-h-14 cursor-pointer list-none items-center gap-3 py-3 [&::-webkit-details-marker]:hidden">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center text-moon">{icon}</span>
          <span className="min-w-0 flex-1">
            <span className="block font-semibold leading-tight">
              {title}
              {badge && <span className="ml-2 rounded-full bg-moon px-2 py-0.5 align-middle text-[10px] font-bold text-night">{badge}</span>}
            </span>
            <span className="block text-sm text-white/65">{meta}</span>
          </span>
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5 shrink-0 text-white/60 transition-transform group-open:rotate-180"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </summary>
        <div className="pb-5 pl-12 pr-2 text-sm leading-relaxed text-white/80">{children}</div>
      </details>
    </li>
  );
}

/** Rows in one list on phones, split into two fixed columns on large screens (opening a row never moves the others) */
export function DetailList({ rows }: { rows: ReactNode[] }) {
  const half = Math.ceil(rows.length / 2);
  return (
    <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-10">
      <ul className="border-t border-white/10">{rows.slice(0, half)}</ul>
      <ul className="lg:border-t lg:border-white/10">{rows.slice(half)}</ul>
    </div>
  );
}
