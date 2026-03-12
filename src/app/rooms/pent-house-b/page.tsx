import type { Metadata } from "next";
import PageHeader from "@/components/shared/PageHeader";
import RoomDetail from "@/components/rooms/RoomDetail";
import { ROOMS } from "@/lib/rooms-data";

export const metadata: Metadata = {
  title: "Pent House B | Desert Moon Hotel — Couples Room in Cerritos Beach",
  description:
    "Book Pent House B at Desert Moon Hotel. Intimate penthouse for couples with ocean view, private balcony, kitchenette, and all amenities. Cerritos Beach, BCS.",
};

const DESCRIPTION =
  "Enjoy a comfortable stay, with large spaces, great amenities, delicious food, views of the sea. In addition to providing the ideal combination of quality, comfort and location, it offers a romantic atmosphere with a wide variety of services designed for travelers like you.";

export default function PentHouseBPage() {
  const room = ROOMS.find((r) => r.slug === "pent-house-b")!;

  return (
    <>
      <PageHeader subtitle="Relax and Enjoy" title="Pent House B" />
      <RoomDetail room={room} description={DESCRIPTION} />
    </>
  );
}
