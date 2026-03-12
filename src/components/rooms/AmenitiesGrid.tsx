interface AmenitiesGridProps {
  amenities: string[];
}

export default function AmenitiesGrid({ amenities }: AmenitiesGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {amenities.map((amenity) => (
        <div
          key={amenity}
          className="flex items-center gap-2 bg-offwhite rounded-lg px-4 py-3"
        >
          <svg
            className="w-5 h-5 text-gold shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span className="text-sm text-charcoal">{amenity}</span>
        </div>
      ))}
    </div>
  );
}
