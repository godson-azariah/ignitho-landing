/* The little + at the corners of a section. It is a printer's alignment mark,
   used here to show where the page's content edges are. */

/* Swiss registration mark — a printer's alignment cross, used to pin the
   corners of a section's measure. */
export function CornerMark({ className = '', tone = 'ink' }) {
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
