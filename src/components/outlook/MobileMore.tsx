"use client";

import { useId, useState, type ReactNode } from "react";

/**
 * A block that is always open on tablets and computers but folds into a tappable
 * title on phones, so the slider panels stay short there. The content is always in the HTML.
 */
export default function MobileMore({
  title,
  children,
  className = "",
  titleClassName = "text-2xl font-bold",
}: {
  title: string;
  children: ReactNode;
  className?: string;
  titleClassName?: string;
}) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <div className={className}>
      <h4 className={`hidden md:block ${titleClassName}`}>{title}</h4>
      <h4 className="md:hidden">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen((v) => !v)}
          className="flex min-h-11 w-full items-center justify-between gap-4 text-left text-lg font-bold"
        >
          {title}
          <svg
            viewBox="0 0 24 24"
            className={`h-5 w-5 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
      </h4>
      <div id={id} className={open ? "" : "hidden md:block"}>
        {children}
      </div>
    </div>
  );
}
