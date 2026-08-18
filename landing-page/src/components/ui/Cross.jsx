/* ==========================================================================
   PLAIN-ENGLISH GUIDE  ·  THE SMALL + MARKS AT THE CORNERS OF SECTIONS

   WHERE YOU SEE THIS
     Tiny grey plus signs at the top corners of several sections.

   WHAT IS IN HERE
     · One character. It is a printer alignment mark, borrowed as
       decoration.

   WORTH KNOWING
     It shows where the page content edges are, which is part of what
     makes the sections feel aligned with each other.
   ========================================================================== */

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
