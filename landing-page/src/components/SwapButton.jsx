/* The page's one button.

   Three solid bands ride a single tilted track: the resting face, a middle
   band in a fully saturated brand colour, then the arriving face. Hover shifts
   the track by exactly one button height so the faces swap with no seam, a
   ripple blooms from the centre, and the labels counter-rotate so they read
   level at rest and at the end, tilting only in transit. `TealButton` is the
   primary action — the same machine with the variant fixed. */
/* Rest colour · the band that sweeps between · arrival colour.
   Every middle band is a fully saturated brand colour — never a tint or a
   shade of its neighbours, which is what made it look washed out. */
const SWAP = {
  teal: {
    faceA: 'bg-ig-teal text-white',
    faceM: 'bg-ig-violet-500',
    faceB: 'bg-ig-violet text-white',
    rip: 'bg-white/30'
  },
  violet: {
    faceA: 'bg-ig-violet text-white',
    faceM: 'bg-ig-purple',
    faceB: 'bg-white text-ig-ink',
    rip: 'bg-white/25'
  },
  light: {
    faceA: 'bg-white text-ig-ink',
    faceM: 'bg-ig-teal-ring',
    faceB: 'bg-ig-teal text-white',
    rip: 'bg-ig-ink/12'
  },
  ink: {
    faceA: 'bg-ig-ink text-white',
    faceM: 'bg-ig-violet-500',
    faceB: 'bg-ig-teal text-white',
    rip: 'bg-white/25'
  }
};

/* Every button on the site is a swap button: three solid bands ride one
   tilted track on a springy curve, a ripple blooms from the centre, and the
   whole pill scales up a touch. Labels counter-rotate so they read level. */
export function SwapButton({ children, className = '', variant = 'violet', ...rest }) {
  const { faceA, faceM, faceB, rip } = SWAP[variant] || SWAP.violet;
  return (
    <button {...rest} className={`swap group ${faceA} ${className}`}>
      <span className="swap-ghost">{children}</span>
      <span aria-hidden="true" className="swap-track">
        <span className={`swap-face swap-face--a ${faceA}`}>
          <span className="swap-text">{children}</span>
        </span>
        <span className={`swap-mid ${faceM}`} />
        <span className={`swap-face swap-face--b ${faceB}`}>
          <span className="swap-text">{children}</span>
        </span>
      </span>
      <span aria-hidden="true" className={`swap-ripple ${rip}`} />
    </button>
  );
}

/* Teal rests, deep violet arrives — the primary action everywhere */
export function TealButton({ children, className = '', ...rest }) {
  return (
    <SwapButton
      {...rest}
      variant="teal"
      className={`px-6 py-3.5 text-[13px] font-semibold ${className}`}
    >
      {children}
    </SwapButton>
  );
}

/* =========================================================================
   APP
   ========================================================================= */
