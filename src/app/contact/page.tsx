import type { Metadata } from "next";
import PageHeader from "@/components/shared/PageHeader";
import ContactInfo from "@/components/contact/ContactInfo";
import GoogleMap from "@/components/contact/GoogleMap";
import RentACar from "@/components/contact/RentACar";
import ScrollReveal from "@/components/shared/ScrollReveal";

export const metadata: Metadata = {
  title: "Contact Us | Desert Moon Hotel — Cerritos Beach, BCS",
  description:
    "Contact Desert Moon Hotel in Cerritos Beach, Baja California Sur. Call us, email us, or find us on the map. Rent a car from the airport.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader subtitle="How can we help?" title="Get In Touch" />

      {/* Contact Info Cards */}
      <section className="py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-6 space-y-20">
          <ContactInfo />

          {/* Map Section */}
          <ScrollReveal>
            <div>
              <div className="text-center mb-8">
                <p className="text-gold uppercase tracking-[0.2em] text-sm font-semibold mb-3">
                  Location
                </p>
                <h2 className="font-serif text-2xl md:text-3xl text-ocean font-bold">
                  How to get?
                </h2>
              </div>
              <GoogleMap />
            </div>
          </ScrollReveal>

          {/* Rent a Car */}
          <RentACar />
        </div>
      </section>
    </>
  );
}
