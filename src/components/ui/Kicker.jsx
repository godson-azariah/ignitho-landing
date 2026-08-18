/* ==========================================================================
   PLAIN-ENGLISH GUIDE  ·  THE SMALL LABEL ABOVE EVERY SECTION HEADING

   WHERE YOU SEE THIS
     Just above each section title — for example "[04] How It Works"
     over "Four steps, days not months".

   WHAT IS IN HERE
     · A number in brackets, the section name in small type, and a short
       dash rule.
     · Centred headings get a matching dash on both sides.

   WORTH KNOWING
     It comes in two shades: dark for the pale bands, light for the dark
     bands.
   ========================================================================== */

/* The small monospace label above a section heading. `centered` draws a rule
   on both sides — a single trailing rule reads as left-aligned however the box
   itself is positioned. */
export function Kicker({ index, children, tone = 'ink', centered = false }) {
  const dark = tone !== 'ink';
  const rule = `h-px w-6 sm:w-10 ${dark ? 'bg-white/25' : 'bg-ig-divider'}`;
  return (
    <span
      className={`flex items-center gap-3 font-mono text-[11px] font-bold tracking-[0.03em] ${
        centered ? 'justify-center' : ''
      } ${dark ? 'text-white/55' : 'text-ig-muted'}`}
    >
      {/* a matching rule on the left when centred — one trailing dash on its
          own reads as left-aligned however the box is positioned */}
      {centered && <span className={rule} />}
      <span className={dark ? 'text-ig-sky' : 'text-ig-purple'}>[{index}]</span>
      <span>{children}</span>
      <span className={rule} />
    </span>
  );
}
