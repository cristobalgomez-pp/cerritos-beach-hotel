/** Crescent moon used as the hotel's mark */
export default function MoonMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className}>
      <path
        fill="currentColor"
        d="M20.5 3.2A13 13 0 1 0 28.8 22 11 11 0 0 1 20.5 3.2Z"
      />
    </svg>
  );
}
