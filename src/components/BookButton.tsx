import { BOOKING_URL } from "@/lib/constants";

type Variant = "solid" | "light" | "outline";

const styles: Record<Variant, string> = {
  solid: "bg-adobe text-white hover:bg-[#a83e23]",
  light: "bg-bone text-ink hover:bg-white",
  outline: "border border-current text-current hover:bg-white/10",
};

export default function BookButton({
  label,
  variant = "solid",
  className = "",
}: {
  label: string;
  variant?: Variant;
  className?: string;
}) {
  return (
    <a
      href={BOOKING_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-[15px] font-semibold transition-colors ${styles[variant]} ${className}`}
    >
      {label}
    </a>
  );
}
