import type { Metadata } from "next";
import PageHeader from "@/components/shared/PageHeader";
import RoomCards from "@/components/home/RoomCards";
import CTABanner from "@/components/shared/CTABanner";

export const metadata: Metadata = {
  title: "Our Rooms | Desert Moon Hotel — Cerritos Beach",
  description:
    "Explore our ocean view rooms at Desert Moon Hotel in Cerritos Beach. King Suite, Twin Suite, and Penthouse options with private balconies, kitchenettes, and stunning views.",
};

export default function RoomsPage() {
  return (
    <>
      <PageHeader subtitle="Our Rooms" title="Explore Our Rooms" />
      <RoomCards />
      <CTABanner />
    </>
  );
}
