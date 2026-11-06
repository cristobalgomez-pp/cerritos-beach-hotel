import { NextResponse } from "next/server";
import { AVAILABLE_UNITS, INQUIRY_RECIPIENTS, formatUsd } from "@/lib/units";

/**
 * Buyer inquiries from the "Homes for sale" page, emailed through Resend.
 * Needs RESEND_API_KEY in Vercel. Sends from cerritosbeachhotel.com (verified in Resend);
 * RESEND_FROM can override the sender.
 */

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  // Honeypot filled → pretend success so bots don't retry
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = String(body.name ?? "").trim().slice(0, 120);
  const email = String(body.email ?? "").trim().slice(0, 200);
  const phone = String(body.phone ?? "").trim().slice(0, 40);
  const message = String(body.message ?? "").trim().slice(0, 4000);
  const lang = body.lang === "es" ? "es" : "en";
  const requested = Array.isArray(body.units) ? body.units.map(String) : [];
  const units = AVAILABLE_UNITS.filter((u) => requested.includes(u.id));

  if (!name || !/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json({ error: "invalid_fields" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[inquiry] RESEND_API_KEY is not set");
    return NextResponse.json({ error: "email_not_configured" }, { status: 503 });
  }

  const unitList = units.length ? units.map((u) => `${u.id} (${formatUsd(u.priceUsd)})`).join(", ") : "—";
  const rows: [string, string][] = [
    ["Nombre", name],
    ["Correo", email],
    ["Teléfono", phone || "—"],
    ["Departamentos", unitList],
    ["Idioma del sitio", lang === "es" ? "Español" : "Inglés"],
    ["Mensaje", message || "—"],
  ];

  const html = `<h2 style="font-family:sans-serif">Nuevo interesado en comprar departamento</h2>
<table style="font-family:sans-serif;font-size:15px;border-collapse:collapse">${rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px 6px 0;color:#666;vertical-align:top">${k}</td><td style="padding:6px 0;white-space:pre-wrap">${escape(v)}</td></tr>`
    )
    .join("")}</table>`;
  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.RESEND_FROM ?? "Desert Moon Hotel <web@cerritosbeachhotel.com>",
      to: INQUIRY_RECIPIENTS,
      reply_to: email,
      subject: `Interesado en depto ${units.map((u) => u.id).join(", ") || "Desert Moon"}: ${name}`,
      html,
      text,
    }),
  });

  if (!res.ok) {
    console.error("[inquiry] Resend error", res.status, await res.text());
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
