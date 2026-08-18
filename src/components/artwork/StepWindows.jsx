/* Holds the four step pictures and fades between them.

   The outgoing panel stays mounted while it blurs away, which is the only way
   an exit animation can run at all. The 360ms it waits has to match the length
   of the animation in motion.css; if the two drift apart the panel either
   vanishes halfway or hangs around after it has finished.

   All of it is decoration, so the whole thing is hidden from screen readers.
   Every word in these pictures is already in the step text beside them. */

import { useEffect, useState } from 'react';

import { Step1Choose } from './steps/Step1Choose.jsx';
import { Step2Test } from './steps/Step2Test.jsx';
import { Step3Deploy } from './steps/Step3Deploy.jsx';
import { Step4Measure } from './steps/Step4Measure.jsx';

/* The illustration beside the four steps: two windows per step, each one built
   to read as a working screen rather than as a picture of one.

   WHAT MAKES A Mock-up look like an interface, and what these windows now have:

     · Chrome that does something. A title bar with dots and a name, plus a
       right-hand slot carrying live state — a count, an elapsed time, a unit.
     · A Toolbar under THE chrome. Real apps put controls in a strip of their
       own, separated by a thin line: a field, icon buttons, a segmented view
       switch. A screen with no controls is a diagram.
     · Column headers over rows. Two words of tiny mono over a list is the
       single cheapest signal that the list is DATA.
     · A Status bar at THE foot. Count on the left, context on the right, above
       a thin line. Every real window has one and no illustration ever does.
     · Edges between THE DAG nodes. They were three adjacent boxes with gaps,
       which is a row of cards; a pipeline needs the connections drawn, and the
       reached ones fill teal behind the node that follows.
     · Controls in their real states. The calculator window carries the actual
       stepper, the actual slider with its 50 and 10,000 end stops, and the
       handle sitting at the position 500 employees really puts it.
     · Right-aligned values against left-aligned labels, mono for anything
       numeric. That one alignment habit does more for realism than any amount
       of decoration.

   THE palette IS untouched. White windows, `paper-2` for recessed controls,
   violet tints for selection, ink for type, `divider` thin lines, and teal on
   the accent alone — one confirmed state and one measured outcome per window.
   Nothing here goes dark and nothing new enters the palette.

   THE composition IS A DIAGONAL: a wide window at the TOP against one side, a
   narrow one at the BOTTOM against the OTHER, alternating which side leads. Their
   widths sum past 100% so they must overlap horizontally, and a 22px negative
   top margin overlaps them vertically — so the meeting is a CORNER, the only
   overlap that reads as two depths rather than one thing covering another. The
   22px lands inside the upper window's own bottom padding, so it never covers
   content, and every offset is measured from the windows' own edges so the
   diagonal survives the illustration being three different heights.

   One window on A PHONE. Two overlapping windows in a 290px box is a pile.

   THE whole stage IS decoration — everything it says is in the step copy beside
   it, so it is `aria-hidden` at the root and none of it is announced. */


const PANELS = {
  pick: Step1Choose,
  test: Step2Test,
  deploy: Step3Deploy,
  measure: Step4Measure
};

/* Must match `mg-out`'s duration in `motion.css`. If this is shorter the
   outgoing panel is torn out mid-fade; if it is longer an invisible panel sits
   in the illustration doing nothing until the timer catches up. */
const EXIT_MS = 360;

const CENTRE = 'absolute inset-0 grid place-items-center p-5 sm:p-8';

/* THE outgoing panel has to stay mounted to be able to leave.

   `key={activeId}` alone gives a free entrance — a freshly mounted element runs
   its CSS animations from the top — but it also means the old panel is gone from
   the page structure in the same commit, and something that is not there cannot animate.

   So the illustration keeps two ids. `shown` is what is playing and is what the `key`
   hangs off, so entrances work exactly as before. `leaving` is the one that just
   stopped being shown, held for `EXIT_MS` then dropped. Both render into the
   same absolutely-positioned centre box, so they occupy identical space and
   cross-fade rather than shifting anything.

   The guard is `activeId === shown` rather than a ref or a previous-value trick:
   if the parent re-renders for any other reason, this effect compares the two
   ids, sees they agree, and does nothing. */
export function StepWindows({ activeId, live }) {
  const [shown, setShown] = useState(activeId);
  const [leaving, setLeaving] = useState(null);

  /* Nothing in here renders until THE section has been reached once.

     The panel is in the page structure from first paint, so its entrance — eight to
     thirteen elements each animating a blur — used to run during page load,
     against everything else competing for the main thread at exactly that
     moment, and finish long before anyone had scrolled far enough to see it.
     All of that work went nowhere.

     `awake` latches on and never off. Unmounting when the section leaves the
     visible part of the screen would save a little more and cost far more than it saved: the
     entrance would replay every time the reader scrolled past, which is both a
     surprise and the same expensive work over again.

     The skin above renders unconditionally, so the panel's box, fill and border
     are there from the start and nothing shifts when the contents arrive. */
  const [awake, setAwake] = useState(false);
  useEffect(() => {
    if (live) setAwake(true);
  }, [live]);

  useEffect(() => {
    if (activeId === shown) return undefined;
    setLeaving(shown);
    setShown(activeId);
    const t = setTimeout(() => setLeaving(null), EXIT_MS);
    return () => clearTimeout(t);
  }, [activeId, shown]);

  const Panel = PANELS[shown] ?? Step1Choose;
  const Leaving = leaving ? PANELS[leaving] : null;

  return (
    /* THE panel IS A Keyed layer inside A Plain sizing box, NOT THE box itself.

       The block has to bounce when the step changes, and in React the way an
       element replays a CSS animation is by being remounted — which is what a
       changing `key` does. But this element also holds the outgoing panel that is
       mid-exit, and remounting the parent would tear that child out on the spot.
       A container cannot both restart itself and preserve what is leaving.

       So they are separated. The outer div only measures. The panel's entire skin
       — fill, border, rounding — is a sibling layer at `inset-0`, keyed on
       `shown`, so it remounts and replays `stage-pulse` on every change while the
       crossfade layers beside it are left alone.

       NO `overflow-hidden` On THE outer box: the clip belongs to the skin, which
       is what has rounded corners to clip. Leaving the outer open is also what
       lets the skin scale without being cut, and nothing else can escape — the
       compositions are centred inside 40-64px of padding and the largest
       transform in play is 1.04. */
    <div
      aria-hidden="true"
      /* Heights measured against the tallest composition, `pick`, which the
         toolbar, column headers and status bar bring to about 436px; plus 64px
         of padding at `sm`. `lg:min-h` is a floor, not a height — the row is
         `items-stretch`, so whichever of this and the step list is taller sets
         both. */
      className="relative h-[380px] sm:h-[520px] lg:h-full lg:min-h-[530px]"
    >
      {/* The fill is the specified #F7F2FF and the border is the active step
          card's 1px violet thin line. Both live in `.panel-field` — the fill
          because a literal beats an alpha whose result shifts with what is
          behind it, the border because Tailwind's `ring` IS a box-shadow and a
          hand-written class in this bundle overrides a Play-CDN utility at equal
          which style rule wins, so a `ring-*` here gets silently discarded. */}
      <div
        key={`skin-${shown}`}
        className="panel-field stage-pulse absolute inset-0 overflow-hidden rounded-[26px] bg-[#f7f2ff]"
      />

      {/* Both blurs sit on THE 470px Block, NOT on THE full-size wrapper, and
          that is the single biggest thing that could be done for weak hardware
          without touching a pixel of the result.

          `stage-swap` and `mg-out` animate `filter: blur()`, which is a
          separable convolution the GPU re-runs every frame over the element's
          whole paint area. On the wrapper — `inset-0` less its padding — that
          area is 652×466 at a desktop width. On the block it actually contains
          it is 470×440. Identical output, because the wrapper is transparent
          everywhere the block is not, and 32% fewer pixels to convolve.

          The transform is identical too: `place-items-center` puts the block's
          centre on the wrapper's, so scaling about either origin is the same
          scale. Nothing moves that did not move before. */}
      {awake && Leaving && (
        <div key={`out-${leaving}`} className={`${CENTRE} pointer-events-none`}>
          <div className="mg-out w-full max-w-[470px]">
            <Leaving />
          </div>
        </div>
      )}

      {/* `stage-swap` is the group ripple for the CONTENTS: the window group
          arrives oversized and out of focus and settles back, so the staggered
          windows read as a ripple through one panel rather than as a queue.
          `stage-pulse` on the skin above moves the panel itself at the same
          moment — together they are one object reacting. */}
      {awake && (
        <div key={shown} className={CENTRE}>
          <div className="stage-swap w-full max-w-[470px]">
            <Panel />
          </div>
        </div>
      )}
    </div>
  );
}

