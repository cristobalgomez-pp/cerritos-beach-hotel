"use client";

import { ACTIVITIES } from "@/lib/activities-data";
import ScrollReveal from "@/components/shared/ScrollReveal";

const GRADIENTS = [
  "from-ocean to-sand",
  "from-terracotta to-gold",
  "from-sand to-ocean",
  "from-gold to-terracotta",
  "from-charcoal to-ocean",
  "from-terracotta to-sand",
  "from-ocean to-gold",
  "from-sand to-terracotta",
];

export default function ActivitySections() {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 space-y-20 md:space-y-28">
        {ACTIVITIES.map((activity, index) => {
          const isReversed = index % 2 !== 0;

          return (
            <ScrollReveal key={activity.id}>
              <div
                className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${
                  isReversed ? "lg:direction-rtl" : ""
                }`}
              >
                {/* Image */}
                <div
                  className={`${isReversed ? "lg:order-2" : "lg:order-1"}`}
                >
                  <div
                    className={`aspect-video rounded-xl bg-gradient-to-br ${GRADIENTS[index]} relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg
                        className="w-14 h-14 text-white/20"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Text */}
                <div
                  className={`${isReversed ? "lg:order-1" : "lg:order-2"}`}
                >
                  <p className="text-gold uppercase tracking-[0.2em] text-sm font-semibold mb-3">
                    Activities
                  </p>
                  <h2 className="font-serif text-3xl md:text-4xl text-ocean font-bold mb-5">
                    {activity.title}
                  </h2>
                  <p className="text-charcoal/70 leading-relaxed text-lg">
                    {activity.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
}
