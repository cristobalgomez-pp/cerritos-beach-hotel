"use client";

import { RENT_A_CAR } from "@/lib/constants";
import ScrollReveal from "@/components/shared/ScrollReveal";

export default function RentACar() {
  return (
    <ScrollReveal>
      <div className="text-center">
        <h3 className="font-serif text-2xl md:text-3xl text-ocean font-bold mb-3">
          Rent a Car
        </h3>
        <p className="text-charcoal/60 mb-8">
          You can also ask how to get from the airport.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {RENT_A_CAR.map((company) => (
            <a
              key={company.name}
              href={company.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-white border border-sand/50 rounded-xl px-10 py-5 font-semibold text-ocean hover:border-gold hover:text-gold hover:shadow-md transition-all duration-300"
            >
              {company.name}
            </a>
          ))}
        </div>
      </div>
    </ScrollReveal>
  );
}
