/**
 * Draws the moon as seen from the northern hemisphere: waxing lit on the right, waning on the left.
 * `illumination` is the lit fraction (0–1).
 */
export default function MoonPhase({
  illumination,
  waxing,
  size = 96,
  className = "",
  label,
}: {
  illumination: number;
  waxing: boolean;
  size?: number;
  className?: string;
  label?: string;
}) {
  const r = 48;
  const c = 50;
  const k = Math.min(1, Math.max(0, illumination));
  // Terminator is an ellipse whose horizontal radius shrinks to 0 at quarter moon
  const rx = Math.abs(1 - 2 * k) * r;
  // Lit limb: half circle on the right; terminator bulges outward when gibbous, inward when crescent
  const terminatorSweep = k > 0.5 ? 1 : 0;
  const lit = `M ${c} ${c - r} A ${r} ${r} 0 0 1 ${c} ${c + r} A ${rx} ${r} 0 0 ${terminatorSweep} ${c} ${c - r} Z`;

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <circle cx={c} cy={c} r={r} className="fill-white/10" />
      {k > 0.01 && <path d={lit} className="fill-moon" transform={waxing ? undefined : `translate(100 0) scale(-1 1)`} />}
    </svg>
  );
}
