/* Swiss registration mark — a printer's alignment cross, used to pin the
   corners of a section's measure. */
export function Cross({ className = '', tone = 'ink' }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute select-none font-mono text-[14px] leading-none ${
        tone === 'ink' ? 'text-ig-divider' : 'text-white/30'
      } ${className}`}
    >
      +
    </span>
  );
}
