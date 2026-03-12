import type { Metadata } from "next";
import PageHeader from "@/components/shared/PageHeader";
import RestaurantCards from "./RestaurantCards";
import { getRestaurantSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Restaurant & Bar | Desert Moon Hotel — Cerritos Beach",
  description:
    "Enjoy fresh sea-to-table food, craft cocktails, and the best margaritas at Desert Moon Hotel's restaurant and bar in Cerritos Beach, Baja California Sur.",
};

export default function RestaurantPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getRestaurantSchema()),
        }}
      />
      <PageHeader subtitle="Relax and Enjoy" title="Our Restaurant" />
      <RestaurantCards />
    </>
  );
}
