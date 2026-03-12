import type { Metadata } from "next";
import PageHeader from "@/components/shared/PageHeader";
import RoomDetail from "@/components/rooms/RoomDetail";
import { ROOMS } from "@/lib/rooms-data";

export const metadata: Metadata = {
  title: "King Suite | Desert Moon Hotel — Ocean View Room in Cerritos Beach",
  description:
    "Book our King Suite at Desert Moon Hotel. Spacious room with king bed, ocean view, private balcony, kitchenette, and all amenities. Cerritos Beach, Baja California Sur.",
};

const DESCRIPTION =
  "Enjoy a comfortable stay, with large spaces, great amenities, delicious food, views of the sea. In addition to providing the ideal combination of quality, comfort and location, it offers a romantic atmosphere with a wide variety of services designed for travelers like you.";

export default function KingSuitePage() {
  const room = ROOMS.find((r) => r.slug === "king-suite")!;

  return (
    <>
      <PageHeader subtitle="Relax and Enjoy" title="King Suite" />
      <RoomDetail room={room} description={DESCRIPTION} />
    </>
  );
}
