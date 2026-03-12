"use client";

import { CONTACT } from "@/lib/constants";
import ScrollReveal from "@/components/shared/ScrollReveal";

const CARDS = [
  {
    title: "Booking",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
        />
      </svg>
    ),
    content: (
      <div className="space-y-2">
        <div>
          <p className="text-xs text-charcoal/40 uppercase tracking-wide">Primary</p>
          <a
            href={`tel:${CONTACT.phonePrimary.replace(/\s/g, "")}`}
            className="text-charcoal hover:text-gold transition-colors font-medium"
          >
            {CONTACT.phonePrimary}
          </a>
        </div>
        <div>
          <p className="text-xs text-charcoal/40 uppercase tracking-wide">Secondary</p>
          <a
            href={`tel:${CONTACT.phoneSecondary.replace(/\s/g, "")}`}
            className="text-charcoal hover:text-gold transition-colors font-medium"
          >
            {CONTACT.phoneSecondary}
          </a>
        </div>
      </div>
    ),
  },
  {
    title: "E-mail",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
        />
      </svg>
    ),
    content: (
      <a
        href={`mailto:${CONTACT.email}`}
        className="text-charcoal hover:text-gold transition-colors font-medium"
      >
        {CONTACT.email}
      </a>
    ),
  },
  {
    title: "Address",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
        />
      </svg>
    ),
    content: (
      <p className="text-charcoal font-medium leading-relaxed">
        {CONTACT.address}
      </p>
    ),
  },
];

export default function ContactInfo() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {CARDS.map((card, index) => (
        <ScrollReveal key={card.title} delay={index * 0.1}>
          <div className="bg-white rounded-xl border border-sand/50 p-8 text-center">
            <div className="w-14 h-14 rounded-full bg-gold/10 text-gold flex items-center justify-center mx-auto mb-4">
              {card.icon}
            </div>
            <h3 className="font-serif text-lg font-bold text-ocean mb-4">
              {card.title}
            </h3>
            {card.content}
          </div>
        </ScrollReveal>
      ))}
    </div>
  );
}
