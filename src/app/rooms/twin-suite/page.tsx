import type { Metadata } from "next";
import PageHeader from "@/components/shared/PageHeader";
import RoomDetail from "@/components/rooms/RoomDetail";
import { ROOMS } from "@/lib/rooms-data";

export const metadata: Metadata = {
  title: "Twin Suite | Desert Moon Hotel — Ocean View Room in Cerritos Beach",
  description:
    "Book our Twin Suite at Desert Moon Hotel. Room with two queen beds, ocean view, private balcony, kitchenette, and all amenities. Perfect for families and friends.",
};

const DESCRIPTION =
  "Enjoy a comfortable stay, with large spaces, great amenities, delicious food, views of the sea. In addition to providing the ideal combination of quality, comfort and location, it offers a romantic atmosphere with a wide variety of services designed for travelers like you.";

export default function TwinSuitePage() {
  const room = ROOMS.find((r) => r.slug === "twin-suite")!;

  return (
    <>
      <PageHeader subtitle="Relax and Enjoy" title="Twin Suite" />
      <RoomDetail room={room} description={DESCRIPTION} />
    </>
  );
}
