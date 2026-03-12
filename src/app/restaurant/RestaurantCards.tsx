"use client";

import ScrollReveal from "@/components/shared/ScrollReveal";

const CARDS = [
  {
    title: "Our Bar",
    description:
      "Our bar is equipped with only the best there is. Come and hang out with your friends and let our staff treat you like family.",
    gradient: "from-terracotta to-gold",
  },
  {
    title: "The Rock Wall",
    description:
      "We have over 2,000 rocks painted by our guests that reflect each and every personality that has come through our bar. Paint your rock and tell your story!",
    gradient: "from-ocean to-sand",
  },
  {
    title: "Quality Time",
    description:
      "Spend quality time surrounded by your loved ones. Leave all the troubles behind and sip on The Perfect Margarita.",
    gradient: "from-gold to-terracotta",
  },
  {
    title: "Are You Hungry?",
    description:
      "From sea to table. At our bar, you will get to experience tasty, fresh food to share with your loved ones.",
    gradient: "from-sand to-ocean",
  },
  {
    title: "Only Good Times",
    description:
      "At our bar, we focus on giving our customers only good times. Come and enjoy!",
    gradient: "from-charcoal to-ocean",
  },
  {
    title: "Enjoy!",
    description:
      "Bathe under the sun with a Piña Colada. What else can you ask for?",
    gradient: "from-terracotta to-sand",
  },
];

export default function RestaurantCards() {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-14">
            <p className="text-gold uppercase tracking-[0.2em] text-sm font-semibold mb-3">
              DESERT MOON
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-ocean font-bold">
              Explore
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {CARDS.map((card, index) => (
            <ScrollReveal key={card.title} delay={index * 0.1}>
              <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                {/* Image placeholder */}
                <div
                  className={`aspect-[4/3] bg-gradient-to-br ${card.gradient} relative`}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg
                      className="w-12 h-12 text-white/20"
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

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-serif text-xl font-bold text-ocean mb-3">
                    {card.title}
                  </h3>
                  <p className="text-charcoal/70 text-sm leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
