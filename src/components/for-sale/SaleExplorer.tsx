"use client";

import { useRef, useState } from "react";
import type { Unit } from "@/lib/units";

export interface SaleLabels {
  pickTitle: string;
  pickIntro: string;
  tower: string;
  upper: string;
  lower: string;
  available: string;
  sold: string;
  selected: string;
  formTitle: string;
  pickHint: string;
  close: string;
  name: string;
  email: string;
  phone: string;
  units: string;
  message: string;
  send: string;
  sending: string;
  success: string;
  error: string;
  required: string;
}

type Status = "idle" | "sending" | "sent" | "error";

const usd = (n: number) => `$${Math.round(n / 1000)}k`;

// Vertical step between towers, so the diagram reads like the stepped building
const STEP = 28;

export default function SaleExplorer({
  units,
  towers,
  labels,
  lang,
  fallbackEmail,
}: {
  units: Unit[];
  towers: number[];
  labels: SaleLabels;
  lang: string;
  fallbackEmail: string;
}) {
  const [selected, setSelected] = useState<string[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [validation, setValidation] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);

  const openForm = () => dialogRef.current?.showModal();
  const closeForm = () => dialogRef.current?.close();

  const toggle = (id: string) =>
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    if (!name || !/^\S+@\S+\.\S+$/.test(email)) {
      setValidation(labels.required);
      return;
    }
    setValidation("");
    setStatus("sending");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone: String(form.get("phone") ?? ""),
          message: String(form.get("message") ?? ""),
          company: String(form.get("company") ?? ""), // honeypot
          units: selected,
          lang,
        }),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  const unit = (tower: number, letter: "A" | "B") => units.find((u) => u.id === `${tower}${letter}`);

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
      <div className="relative">
        <div className="max-w-xl lg:max-w-[calc(4/7*100%-1.5rem)]">
          <h2 className="text-4xl font-bold md:text-5xl">{labels.pickTitle}</h2>
          <p className="mt-4 text-lg text-ink/75">{labels.pickIntro}</p>
        </div>

        {/* Building diagram: one column per tower, A on top and B below, stepped like the real building */}
        <div className="mt-12 overflow-x-auto pb-2">
          <div className="grid min-w-[640px] grid-cols-7 gap-3">
            {towers.map((tower, i) => (
              <div key={tower} className="flex flex-col gap-2" style={{ paddingTop: i * STEP }}>
                {(["A", "B"] as const).map((letter) => {
                  const u = unit(tower, letter);
                  if (!u) return null;
                  const sold = u.status === "sold";
                  const isSelected = selected.includes(u.id);
                  return (
                    <button
                      key={u.id}
                      type="button"
                      disabled={sold}
                      onClick={() => toggle(u.id)}
                      aria-pressed={isSelected}
                      aria-label={`${u.id}, ${letter === "A" ? labels.upper : labels.lower}, ${
                        sold ? labels.sold : `${labels.available}, USD ${u.priceUsd.toLocaleString("en-US")}`
                      }`}
                      className={`flex aspect-[4/3] flex-col justify-between rounded-2xl border-2 p-3 text-left transition-colors ${
                        sold
                          ? "cursor-not-allowed border-transparent bg-ink/5 text-ink/35"
                          : isSelected
                            ? "border-adobe bg-adobe text-white"
                            : "border-adobe/30 bg-white text-ink hover:border-adobe"
                      }`}
                    >
                      <span className="font-display text-2xl font-extrabold tracking-tight">{u.id}</span>
                      <span className="text-sm font-semibold">
                        {sold ? labels.sold : isSelected ? labels.selected : usd(u.priceUsd)}
                      </span>
                    </button>
                  );
                })}
                <p className="pt-1 text-center text-sm font-semibold text-ink/60">
                  {labels.tower} {tower}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink/70">
          <span className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-sm border-2 border-adobe/30 bg-white" aria-hidden="true" /> {labels.available}
          </span>
          <span className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-sm bg-adobe" aria-hidden="true" /> {labels.selected}
          </span>
          <span className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-sm bg-ink/10" aria-hidden="true" /> {labels.sold}
          </span>
          <span>A = {labels.upper.toLowerCase()} · B = {labels.lower.toLowerCase()}</span>
        </div>

        {/* Same pop-up from the bottom, for people who scrolled past the corner (the corner prompt already sits here on small screens) */}
        <div className="mt-8 hidden items-center gap-4 lg:flex">
          <button
            type="button"
            onClick={openForm}
            className="rounded-full bg-adobe px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#a83e23]"
          >
            {labels.formTitle}
          </button>
          {selected.length > 0 && <span className="font-display text-lg font-bold text-adobe">{selected.join(", ")}</span>}
        </div>

        {/* Subtle prompt in the empty top-right corner (below the map on small screens) */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-ink/10 pt-5 lg:absolute lg:right-0 lg:top-2 lg:mt-0 lg:w-[calc(3/7*100%-0.5rem)] lg:flex-col lg:items-start lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
          <div>
            <p className="text-sm font-semibold text-ink/60">{labels.units}</p>
            <p className={`mt-1 font-display text-xl font-bold ${selected.length ? "text-adobe" : "text-ink/40"}`} aria-live="polite">
              {selected.length ? selected.join(", ") : labels.pickHint}
            </p>
          </div>
          <button
            type="button"
            onClick={openForm}
            className="rounded-full bg-adobe px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#a83e23]"
          >
            {labels.formTitle}
          </button>
        </div>

        <dialog
          ref={dialogRef}
          aria-labelledby="inquiry-title"
          className="m-auto w-[calc(100%-2rem)] max-w-lg rounded-3xl bg-bone p-0 text-ink shadow-2xl backdrop:bg-night/60"
          onClick={(e) => {
            if (e.target === dialogRef.current) closeForm(); // click on the backdrop
          }}
        >
          <div className="p-6 md:p-8">
            <div className="flex items-start justify-between gap-4">
              <h3 id="inquiry-title" className="text-2xl font-bold">
                {labels.formTitle}
              </h3>
              <button type="button" onClick={closeForm} aria-label={labels.close} className="-mr-2 -mt-1 rounded-full p-2 hover:bg-ink/5">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            {status === "sent" ? (
              <p className="mt-6 font-display text-xl font-bold" role="status">
                {labels.success}
              </p>
            ) : (
              <form onSubmit={onSubmit} noValidate className="mt-5 space-y-4">
                <div>
                  <p className="text-sm font-semibold text-ink/60">{labels.units}</p>
                  <p className={`mt-1 font-display text-lg font-bold ${selected.length ? "text-adobe" : "text-ink/40"}`}>
                    {selected.length ? selected.join(", ") : labels.pickHint}
                  </p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label={labels.name} name="name" autoComplete="name" required />
                  <Field label={labels.email} name="email" type="email" autoComplete="email" required />
                </div>
                <Field label={labels.phone} name="phone" type="tel" autoComplete="tel" />
                <label className="block">
                  <span className="text-sm font-semibold text-ink/60">{labels.message}</span>
                  <textarea
                    name="message"
                    rows={3}
                    className="mt-1 w-full rounded-xl border border-ink/15 bg-white px-3 py-2 outline-none focus:border-pacific"
                  />
                </label>

                {/* Honeypot: hidden from people, bots fill it in */}
                <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

                {validation && (
                  <p className="text-sm font-semibold text-adobe" role="alert">
                    {validation}
                  </p>
                )}
                {status === "error" && (
                  <p className="text-sm font-semibold text-adobe" role="alert">
                    {labels.error}{" "}
                    <a href={`mailto:${fallbackEmail}`} className="underline">
                      {fallbackEmail}
                    </a>
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full rounded-full bg-adobe py-3 text-base font-semibold text-white transition-colors hover:bg-[#a83e23] disabled:opacity-60"
                >
                  {status === "sending" ? labels.sending : labels.send}
                </button>
              </form>
            )}
          </div>
        </dialog>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  autoComplete,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-ink/70">{label}</span>
      <input
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        className="mt-1 w-full rounded-xl border border-ink/15 bg-white px-3 py-2 outline-none focus:border-pacific"
      />
    </label>
  );
}
