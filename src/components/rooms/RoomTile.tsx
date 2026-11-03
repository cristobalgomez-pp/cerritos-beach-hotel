import Image from "next/image";
import Link from "next/link";
import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";
import type { Room } from "@/lib/rooms";

export default function RoomTile({ room, lang, t }: { room: Room; lang: Locale; t: Dictionary }) {
  return (
    <Link href={localePath(lang, `/rooms/${room.slug}`)} className="group block">
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-sand">
        <Image
          src={room.cover}
          alt={room.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
      </div>
      <h3 className="mt-4 text-2xl font-bold">{room.name}</h3>
      <p className="mt-1 text-ink/70">{t.rooms.details[room.slug].tagline}</p>
      <p className="mt-3 text-sm font-medium text-pacific">
        {t.common.upTo(room.maxGuests)}, {t.rooms.beds[room.beds]}
      </p>
    </Link>
  );
}
