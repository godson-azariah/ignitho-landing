/* ==========================================================================
   PLAIN-ENGLISH GUIDE  ·  THE ILLUSTRATED PRODUCT WINDOWS IN THE WALKTHROUGH

   WHERE YOU SEE THIS
     The right-hand side of "Four steps, days not months".

   WHAT IS IN HERE
     · Two overlapping white windows per step, one on a phone, drawn to
       look like real screens: title bars, toolbars, tables, sliders,
       progress bars.
     · Step 1 shows the catalogue, step 2 a test run, step 3 a
       deployment, step 4 the measured return.
     · When the step changes the outgoing windows blur away and the new
       ones blur into focus, one element after another.

   WORTH KNOWING
     It is a picture, not a real interface — nothing in it can be
     clicked, and screen readers skip it, because every word in it is
     already in the step text beside it.
   ========================================================================== */
import { useEffect, useState } from 'react';

import { PickPanel } from './walkthrough/PickPanel.jsx';
import { TestPanel } from './walkthrough/TestPanel.jsx';
import { DeployPanel } from './walkthrough/DeployPanel.jsx';
import { MeasurePanel } from './walkthrough/MeasurePanel.jsx';

/* The illustration beside the four steps: two windows per step, each one built
   to read as a working screen rather than as a picture of one.

   WHAT MAKES A MOCK-UP LOOK LIKE AN INTERFACE, and what these windows now have:

     · CHROME THAT DOES SOMETHING. A title bar with dots and a name, plus a
       right-hand slot carrying live state — a count, an elapsed time, a unit.
     · A TOOLBAR UNDER THE CHROME. Real apps put controls in a strip of their
       own, separated by a hairline: a field, icon buttons, a segmented view
       switch. A screen with no controls is a diagram.
     · COLUMN HEADERS OVER ROWS. Two words of tiny mono over a list is the
       single cheapest signal that the list is DATA.
     · A STATUS BAR AT THE FOOT. Count on the left, context on the right, above
       a hairline. Every real window has one and no illustration ever does.
     · EDGES BETWEEN THE DAG NODES. They were three adjacent boxes with gaps,
       which is a row of cards; a pipeline needs the connections drawn, and the
       reached ones fill teal behind the node that follows.
     · CONTROLS IN THEIR REAL STATES. The calculator window carries the actual
       stepper, the actual slider with its 50 and 10,000 end stops, and the
       handle sitting at the position 500 employees really puts it.
     · RIGHT-ALIGNED VALUES AGAINST LEFT-ALIGNED LABELS, mono for anything
       numeric. That one alignment habit does more for realism than any amount
       of decoration.

   THE PALETTE IS UNTOUCHED. White windows, `paper-2` for recessed controls,
   violet tints for selection, ink for type, `divider` hairlines, and teal on
   the accent alone — one confirmed state and one measured outcome per window.
   Nothing here goes dark and nothing new enters the palette.

   THE COMPOSITION IS A DIAGONAL: a wide window at the TOP against one side, a
   narrow one at the BOTTOM against the OTHER, alternating which side leads. Their
   widths sum past 100% so they must overlap horizontally, and a 22px negative
   top margin overlaps them vertically — so the meeting is a CORNER, the only
   overlap that reads as two depths rather than one thing covering another. The
   22px lands inside the upper window's own bottom padding, so it never covers
   content, and every offset is measured from the windows' own edges so the
   diagonal survives the stage being three different heights.

   ONE WINDOW ON A PHONE. Two overlapping windows in a 290px box is a pile.

   THE WHOLE STAGE IS DECORATION — everything it says is in the step copy beside
   it, so it is `aria-hidden` at the root and none of it is announced. */


const PANELS = {
  pick: PickPanel,
  test: TestPanel,
  deploy: DeployPanel,
  measure: MeasurePanel
};

/* Must match `mg-out`'s duration in `motion.css`. If this is shorter the
   outgoing panel is torn out mid-fade; if it is longer an invisible panel sits
   in the stage doing nothing until the timer catches up. */
const EXIT_MS = 360;

const CENTRE = 'absolute inset-0 grid place-items-center p-5 sm:p-8';

/* THE OUTGOING PANEL HAS TO STAY MOUNTED TO BE ABLE TO LEAVE.

   `key={activeId}` alone gives a free entrance — a freshly mounted element runs
   its CSS animations from the top — but it also means the old panel is gone from
   the DOM in the same commit, and something that is not there cannot animate.

   So the stage keeps two ids. `shown` is what is playing and is what the `key`
   hangs off, so entrances work exactly as before. `leaving` is the one that just
   stopped being shown, held for `EXIT_MS` then dropped. Both render into the
   same absolutely-positioned centre box, so they occupy identical space and
   cross-fade rather than shifting anything.

   The guard is `activeId === shown` rather than a ref or a previous-value trick:
   if the parent re-renders for any other reason, this effect compares the two
   ids, sees they agree, and does nothing. */
export function WalkthroughStage({ activeId, live }) {
  const [shown, setShown] = useState(activeId);
  const [leaving, setLeaving] = useState(null);

  /* NOTHING IN HERE RENDERS UNTIL THE SECTION HAS BEEN REACHED ONCE.

     The panel is in the DOM from first paint, so its entrance — eight to
     thirteen elements each animating a blur — used to run during page load,
     against everything else competing for the main thread at exactly that
     moment, and finish long before anyone had scrolled far enough to see it.
     All of that work went nowhere.

     `awake` latches on and never off. Unmounting when the section leaves the
     viewport would save a little more and cost far more than it saved: the
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

  const Panel = PANELS[shown] ?? PickPanel;
  const Leaving = leaving ? PANELS[leaving] : null;

  return (
    /* THE PANEL IS A KEYED LAYER INSIDE A PLAIN SIZING BOX, NOT THE BOX ITSELF.

       The block has to bounce when the step changes, and in React the way an
       element replays a CSS animation is by being remounted — which is what a
       changing `key` does. But this element also holds the outgoing panel that is
       mid-exit, and remounting the parent would tear that child out on the spot.
       A container cannot both restart itself and preserve what is leaving.

       So they are separated. The outer div only measures. The panel's entire skin
       — fill, border, rounding — is a sibling layer at `inset-0`, keyed on
       `shown`, so it remounts and replays `stage-pulse` on every change while the
       crossfade layers beside it are left alone.

       NO `overflow-hidden` ON THE OUTER BOX: the clip belongs to the skin, which
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
          card's 1px violet hairline. Both live in `.panel-field` — the fill
          because a literal beats an alpha whose result shifts with what is
          behind it, the border because Tailwind's `ring` IS a box-shadow and a
          hand-written class in this bundle overrides a Play-CDN utility at equal
          specificity, so a `ring-*` here gets silently discarded. */}
      <div
        key={`skin-${shown}`}
        className="panel-field stage-pulse absolute inset-0 overflow-hidden rounded-[26px] bg-[#f7f2ff]"
      />

      {/* BOTH BLURS SIT ON THE 470px BLOCK, NOT ON THE FULL-SIZE WRAPPER, and
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

