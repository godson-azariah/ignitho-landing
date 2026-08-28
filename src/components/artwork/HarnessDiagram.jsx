/* Beside the opening headline: a laptop, and the harness's five notifications
   out across it.

   ── WHAT EVERYTHING IS ALIGNED TO ────────────────────────────────────────

   TWO VERTICALS AND A CENTRE LINE, and every horizontal number in the file is
   one of the three.

   The two verticals are the edges of the box, 0 and 598. A card on the left
   starts on one, a card on the right ends on the other — and SO DOES THE BASE.
   The base is exactly the width of the box, so the machine's feet and the
   notifications' outer edges sit on the same two lines, and both overhang the
   lid by the same 48. That is the alignment that was missing: the cards hung out
   60 while the base hung out 48, which is close enough to look like neither was
   meant.

   The centre line is 299, and it is the centre of the box, the lid, the screen,
   the notch, and the channel the cards leave between them. Nothing is off it.

   ONE PITCH, 80, and one gap, 30 — the same all the way down. The first card
   laps the top of the lid by 8; the last clears the bottom of the screen by 7.

   ── AND FIVE OF THEM ─────────────────────────────────────────────────────

   All five, fixed, in the order the work passes through: four agents and the
   pull request they produce. Nothing rotates. It used to cycle five notices
   through four places, which is a reason to make a picture move that has nothing
   to do with the picture — a hero swapping words while someone reads the
   headline beside it is asking for attention it has not earned.

   Fitting five without putting one below the screen is what set the sizes. The
   screen is the source and the base is the bottom of a solid object, so nothing
   sits across the base; that leaves the 326 of screen height, less the 20 of
   menu bar, to hold four cards and three gaps. At 50 and 30 they fit with room,
   and 61 per cent of the screen still shows.

   THE MACHINE IS ONE OBJECT. The aluminium is a border and a ring outside it,
   because against this page's violet a single hairline draws nothing and the lid
   reads as a hole. The base carries the groove the lid seats into, and its top
   edge is two things along its length — a groove under the lid's footprint, a
   lit surface either side of it. And the screen is running code, which is the
   one thing on it that is not also on a card.

   EVERY CARD IS THE SAME SIZE. What an object's height off a surface changes is
   its SHADOW — so with all five at one distance, all five carry one shadow. */

import { memo } from 'react';
import { WORKFLOW_AGENTS, WORKFLOW_CORE, WORKFLOW_OUTPUT } from '../../data/workflow.js';

const W = 598;

/* THE LAPTOP. 1.46 to 1, eight of bezel, and a base exactly as wide as the box
   so that its ends and the notifications' outer edges are the same two lines. */
const LID_W = 502;
const LID_H = 344;
const BEZEL = 8;
const NOTCH_W = 52;
const NOTCH_H = 16;
const BAR_H = 20;
/* Narrower than the box on purpose. It used to be the full 598 so its ends and
   the outer edges of the cards fell on the same two verticals — a real
   alignment, and the thing that made it read as a plinth the laptop was standing
   on rather than the bottom of the laptop. At 560 it overhangs the lid by 29 a
   side, which is the proportion in the photograph, and it stops well inside the
   picture. */
const BASE_W = 560;
const BASE_H = 22;
const LIP_H = 5;

const CARD_W = 268;
const CARD_H = 50;
const RADIUS = 15;

const LID_X = (W - LID_W) / 2;

/* ── THE ARRANGEMENT ───────────────────────────────────────────────────────
   The cards are placed first and the machine is placed against them, which is
   what lets the box hug the drawing instead of carrying dead space at the ends.

   HORIZONTALLY, FIVE PLACES SPREAD EVENLY ACROSS THE RANGE, in an order that is
   not.

   The last two attempts both failed on this and in opposite directions. Flushing
   every card to nought or to the full width is an alignment, but the alignment
   you get is a two-column list. Anchoring each one to a real edge of the machine
   instead sounds better and is worse: it put a card's left edge on 48, which is
   the lid's left edge, and another card's right edge on 550, which is the lid's
   right. An edge that exactly coincides with the edge it is lying on top of is a
   TANGENT — it reads as a mistake, and it destroys the one thing the overlap was
   for, which is telling you which of the two is in front.

   So the five sit at 0, 110, 178, 240 and 330 — spread across the whole range a
   card can occupy, and not one of them within 30 of the lid's edges at 48 and 550
   or the screen's at 57 and 541; the closest any card edge comes to a machine
   edge is 33. Then they are dealt out down the rows in an order that is not
   sorted: 110, 330, 0, 240, 178.

   The two extremes are still the box's own edges, which is what keeps the
   drawing filling its column and the right-hand card landing on the page margin.

   AND THEY ARE ALL AT ONE ELEVATION. Every card carries the same shadow and the
   same full opacity. They used to fade 1.00, 0.96, 0.92, 0.88, 0.84 down the
   stack, with the shadow shrinking to 40 per cent of the first one's — which was
   right when they were a receding column, because then the index meant distance.
   Scattered, they are all the same distance away, so a card lower down being
   dimmer and flatter is arbitrary. It was most of why the last one looked stuck
   to the screen rather than floating over it.

   Not every card overhangs the machine, and that is fine rather than a
   compromise: the card is 268 and the lid is 502, so any card whose left edge
   falls between 48 and 282 is inside the lid whatever else it does. What says a
   thing is in front is its shadow, and they all have the same one.

   AND VERTICALLY THE GAPS VARY — 32, 16, 26, 44 — which is what was missing.
   With one pitch of 80 all the way down, the five fell in a perfect ladder: the
   horizontal placement was scattered and the descent was a metronome, and the
   metronome is what you see.

   The gaps are not jittered, though. They follow one rule: THE CLOSER TWO CARDS
   ARE VERTICALLY, THE FURTHER APART THEY MUST BE HORIZONTALLY. Two cards sixteen
   pixels apart look crowded if they are also nearly above one another, and look
   like nothing at all if they are at opposite ends of the frame. So the pair with
   the widest horizontal separation, 330, gets the smallest gap at 16; the pair
   with the narrowest, 62, gets the largest at 44; and the two in between fall in
   order. Written out below and checked, rather than felt — and the first anchor
   moved from 90 to 110 to make the check possible at all, because at 90 two of
   the four pairs were the same distance apart and nothing could order them.

   That is also what keeps the three things the even pitch was protecting: the
   first card still stops above the menu bar, the last still clears the bottom of
   the screen by 7, and the four bands of clear screen between them are now four
   different heights instead of four identical ones.

   `LAP` is the eight pixels by which the first card laps the top of the lid:
   enough to say it came off the machine rather than happening to be above it,
   and no more, because eight is where it stops short of the menu bar. */
const FIRST_Y = 10;
const LAP = 8;

const ANCHORS = [110, 330, 0, 240, 178];
const GAPS = [32, 16, 26, 44];

const PLACES = [];
ANCHORS.reduce((y, x, i) => {
  PLACES.push({ x, y });
  return y + CARD_H + GAPS[i];
}, FIRST_Y);

/* One shadow, because they are all one distance away. */
const CAST = '0 18px 40px -14px rgba(2,0,10,0.82)';

/* WHEN EACH ONE ARRIVED. A notification has the time in its top right corner —
   the one part of the form that was missing, and also what was leaving forty per
   cent of every card as empty white. Newest at the top, the way a stack reads. */
const WHEN = ['now', '1m', '3m', '6m', '9m'];

/* And the drift: each card on its own period, started part-way through it, so no
   two are ever in step and the group never pulses together. */
const DRIFT = [7.4, 8.6, 7.9, 9.2, 8.1];

const LID_Y = FIRST_Y + CARD_H - LAP;

/* THE BOX STOPS AT THE FOOT OF THE BASE. It used to carry another 22 below it
   for the contact shadow to fall into, which nothing needed: no ancestor clips
   this drawing, so the shadow draws outside the box either way.

   What the 22 did do was make the box lopsided — 10 of clearance above the
   first card against 32 below the base. Invisible on its own, and not invisible
   at all beside a column of copy, because the grid centres THE BOX and not the
   drawing inside it, so the picture sat high while the box sat straight. Ink
   runs 10 to 418 inside 428, which is 10 at either end. */
const H = LID_Y + LID_H + BASE_H + FIRST_Y;

const SCR_W = LID_W - 2 - BEZEL * 2;
const SCR_H = LID_H - 2 - BEZEL * 2;

/* ── WHAT IS ON THE SCREEN ─────────────────────────────────────────────────
   Eighteen lines of code: an indent in steps of twelve, then two to six
   SEGMENTS with a gap between them. The segments are the point. One bar per
   line is the universal skeleton-loading pattern — grey rounded rectangles in a
   stack read as content that has not arrived, which is the opposite of what this
   screen is for. Broken into tokens, with a keyword in violet at the head of a
   line and the odd string in teal, the same bars read as code.

   AND THEY REACH ACROSS THE SCREEN. The first set of these ran from 46 to 241
   inside a screen 484 wide, so the code filled the left two fifths and the
   machine looked like it was rendering into a corner. The longest lines carry
   six segments now and run past 420, with the short ones left short — a page of
   code is ragged, but it is ragged across the whole page.

   Written out rather than generated: a random width is a different width on the
   server than in the browser, and React throws away any subtree that disagrees. */
const INDENT = 12;
const LINE_Y = 34;
const LINE_PITCH = 16;
const SEG_GAP = 5;
const CODE = [
  [0, [[26, 'k'], [70, 't'], [48, 't'], [110, 's']]],
  [1, [[22, 'k'], [88, 't'], [56, 't'], [40, 't'], [74, 't']]],
  [2, [[52, 't'], [36, 't']]],
  [2, [[28, 'k'], [66, 't'], [42, 't'], [90, 't'], [34, 't']]],
  [1, [[36, 't'], [104, 's'], [48, 't'], [62, 't']]],
  [0, [[24, 'k'], [58, 't']]],
  [1, [[32, 'k'], [76, 't'], [54, 't'], [118, 't']]],
  [2, [[44, 't'], [68, 's'], [30, 't']]],
  [2, [[24, 'k'], [82, 't'], [40, 't'], [96, 't'], [36, 't'], [52, 't']]],
  [1, [[38, 't'], [52, 't'], [74, 't']]],
  [0, [[30, 'k'], [72, 't'], [50, 't'], [88, 't']]],
  [1, [[46, 't'], [36, 's'], [92, 't']]],
  [2, [[26, 'k'], [64, 't'], [58, 't'], [104, 't'], [30, 't'], [44, 't']]],
  [2, [[34, 't'], [46, 't']]],
  [1, [[28, 'k'], [78, 't'], [46, 't'], [66, 't']]],
  [0, [[22, 'k'], [56, 't'], [40, 't']]],
  [1, [[40, 't'], [66, 's'], [34, 't'], [82, 't']]],
  [2, [[30, 't'], [50, 't'], [28, 't'], [72, 't']]]
];
const TONE = {
  k: 'rgba(178,124,255,0.34)',
  t: 'rgba(255,255,255,0.13)',
  s: 'rgba(78,227,174,0.28)'
};

/* ── THE SYSTEM ────────────────────────────────────────────────────────────
   Three sizes, two weights, three levels of ink. */
const T1 = 12.5;
const T2 = 10.5;
const T3 = 8.5;

const PRIMARY = 'rgba(255,255,255,0.92)';
const FAINT = 'rgba(214,205,238,0.38)';

const INK = '#16063A';
const MUTED = '#54595F';
const META = 'rgba(84,89,95,0.5)';
const EDGE = 'rgba(22,6,58,0.07)';

/* The machine. The aluminium has to be brighter than a photograph would want
   it, and it has to be two things rather than one: a border and a ring outside
   it. Against white a black lid draws its own outline; against this page's
   violet a single hairline draws nothing and the lid reads as a hole. */
const RIM_TOP = '#F1EFF7';
const RIM_SIDE = '#CFCBDA';
const RING = 'rgba(226,222,238,0.28)';
const SHELL = '#111114';
const SCREEN = '#0C0C10';

/* And darker, because it was the lightest thing in the picture — which put the
   eye on a bar under a box rather than on any of the work. */
const BASE_TOP = '#BEBACC';
const BASE_BODY = '#88849A';
const BASE_LIP = '#67637A';

const BRAND = '#7A00C2';
const LIVE = '#00A274';

/* All five, in the order the work passes through them: the four agents, then
   the pull request they produce. */
const NOTICES = [
  ...WORKFLOW_AGENTS.map(({ icon, name, role }) => ({ icon, name, role })),
  {
    icon: WORKFLOW_OUTPUT.icon,
    name: WORKFLOW_OUTPUT.name,
    role: 'Tested and ready to merge',
    done: true
  }
];

/* The one thing left that moves: each card lands 90ms after the one above it,
   once, on the way in. */
const STAGGER = 90;

/* ── ONE NOTIFICATION ──────────────────────────────────────────────────────
   App icon, a bold line, a lighter line, and the time in the corner — which is
   the shape a notification actually has. That corner used to carry the agent's
   number; I took it out because 8.5px of mono at half opacity is unreadable, and
   taking it out left every card forty per cent empty on the right. The corner is
   not decoration in this form, it is part of it.

   The tick on the finished one went with it — notifications do not carry tick
   marks, and the teal icon already says which one is done. */
function Row({ notice, when }) {
  const Icon = notice.icon;

  return (
    <span
      className="absolute inset-0 flex items-center"
      style={{
        gap: 10,
        paddingLeft: 13,
        paddingRight: 13,
        borderRadius: RADIUS,
        backgroundColor: '#FFFFFF',
        border: `1px solid ${EDGE}`
      }}
    >
      <span
        className="grid shrink-0 place-items-center"
        style={{
          width: 30,
          height: 30,
          borderRadius: 9,
          backgroundColor: notice.done ? LIVE : BRAND
        }}
      >
        <Icon style={{ width: 14, height: 14, color: '#FFFFFF' }} strokeWidth={1.9} />
      </span>

      <span className="min-w-0 flex-1">
        <span
          className="block truncate font-semibold"
          style={{ fontSize: T1, lineHeight: 1.25, letterSpacing: '-0.015em', color: INK }}
        >
          {notice.name}
        </span>
        <span
          className="block truncate"
          style={{ marginTop: 1, fontSize: T2, lineHeight: 1.3, color: MUTED }}
        >
          {notice.role}
        </span>
      </span>

      <span
        className="shrink-0 self-start font-mono font-bold"
        style={{ marginTop: 11, fontSize: T3, letterSpacing: '0.06em', color: META }}
      >
        {when}
      </span>
    </span>
  );
}

/* No state, no timer, no hover handler: the drawing is the same drawing on every
   frame after the five cards have landed. */
export const HarnessDiagram = memo(function HarnessDiagram() {
  return (
    <div aria-hidden="true" className="relative" style={{ width: W, height: H }}>
      {/* the light the whole thing stands in */}
      <span
        className="pointer-events-none absolute"
        style={{
          left: -60,
          top: -10,
          width: W + 120,
          height: H + 20,
          background:
            'radial-gradient(ellipse closest-side, rgba(104,26,190,0.4) 0%, rgba(84,18,160,0.11) 52%, transparent 100%)'
        }}
      />

      {/* ── THE LID ───────────────────────────────────────────────────── */}
      <div
        className="absolute"
        style={{
          left: LID_X,
          top: LID_Y,
          width: LID_W,
          height: LID_H,
          padding: BEZEL,
          borderRadius: 14,
          backgroundColor: SHELL,
          borderTop: `1px solid ${RIM_TOP}`,
          borderLeft: `1px solid ${RIM_SIDE}`,
          borderRight: `1px solid ${RIM_SIDE}`,
          borderBottom: '1px solid rgba(0,0,0,0.55)',
          boxShadow: `0 0 0 1px ${RING}, 0 32px 76px -34px rgba(2,0,10,0.9)`
        }}
      >
        <div
          className="relative overflow-hidden"
          style={{ width: SCR_W, height: SCR_H, borderRadius: 6, backgroundColor: SCREEN }}
        >
          {/* the light behind it */}
          <span
            className="absolute"
            style={{
              left: '-12%',
              top: '-16%',
              width: '124%',
              height: '106%',
              background:
                'radial-gradient(ellipse closest-side, rgba(150,70,255,0.32) 0%, rgba(122,0,194,0.09) 56%, transparent 100%)'
            }}
          />

          {/* THE CODE. The one thing on this screen that is not also on a card,
              and the thing the machine is actually for. */}
          <span
            className="absolute"
            style={{
              left: 36,
              top: LINE_Y - 6,
              width: 1,
              height: CODE.length * LINE_PITCH,
              backgroundColor: 'rgba(255,255,255,0.06)'
            }}
          />
          {CODE.map(([indent, segs], i) => {
            let x = 46 + indent * INDENT;
            return segs.map(([width, tone], k) => {
              const left = x;
              x += width + SEG_GAP;
              return (
                <span
                  key={`${i}-${k}`}
                  className="absolute"
                  style={{
                    left,
                    top: LINE_Y + i * LINE_PITCH,
                    width,
                    height: 3.5,
                    borderRadius: 1.75,
                    backgroundColor: TONE[tone]
                  }}
                />
              );
            });
          })}

          {/* THE MENU BAR, either side of the notch the way the machine has it. */}
          <span
            className="absolute left-0 top-0 flex items-center"
            style={{ width: SCR_W / 2 - NOTCH_W / 2, height: BAR_H, gap: 6, paddingLeft: 12 }}
          >
            <span
              className="grid shrink-0 place-items-center"
              style={{ width: 14, height: 14, borderRadius: 5, backgroundColor: BRAND }}
            >
              <span
                className="font-mono font-bold leading-none"
                style={{ fontSize: 6, color: '#FFFFFF' }}
              >
                AI
              </span>
            </span>
            <span
              className="truncate font-semibold"
              style={{ fontSize: 9, letterSpacing: '-0.01em', color: PRIMARY }}
            >
              {WORKFLOW_CORE.name}
            </span>
          </span>

          <span
            className="absolute top-0 flex items-center justify-end"
            style={{
              left: SCR_W / 2 + NOTCH_W / 2,
              width: SCR_W / 2 - NOTCH_W / 2,
              height: BAR_H,
              gap: 5,
              paddingRight: 12
            }}
          >
            <span
              className="block shrink-0 rounded-full"
              style={{ width: 4, height: 4, backgroundColor: LIVE }}
            />
            <span
              className="font-mono font-bold uppercase"
              style={{ fontSize: T3 - 1, letterSpacing: '0.12em', color: FAINT }}
            >
              Running
            </span>
          </span>

          {/* the reflection on the glass */}
          <span
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(122deg, rgba(255,255,255,0.055) 0%, rgba(255,255,255,0.014) 24%, transparent 46%)'
            }}
          />

          {/* THE NOTCH, in the bezel's own colour. On a real laptop with a dark
              screen it is nearly invisible, and that is correct: what draws it is
              the gap it leaves in the menu bar either side. */}
          <span
            className="absolute"
            style={{
              left: SCR_W / 2 - NOTCH_W / 2,
              top: 0,
              width: NOTCH_W,
              height: NOTCH_H,
              borderRadius: '0 0 8px 8px',
              backgroundColor: SHELL,
              boxShadow: 'inset 0 -1px 0 rgba(255,255,255,0.05)'
            }}
          />
        </div>
      </div>

      {/* ── THE BASE ─────────────────────────────────────────────────────
          Exactly the width of the box, so its ends and the outer edges of the
          notifications are the same two verticals — and both overhang the lid by
          the same 48. */}
      <span
        className="pointer-events-none absolute rounded-[50%]"
        style={{
          left: (W - BASE_W) / 2 - 24,
          top: LID_Y + LID_H + BASE_H - 8,
          width: BASE_W + 48,
          height: 30,
          background:
            'radial-gradient(closest-side, rgba(3,0,12,0.8) 0%, rgba(3,0,12,0.28) 46%, transparent 100%)'
        }}
      />
      <div
        className="absolute overflow-hidden"
        style={{
          left: (W - BASE_W) / 2,
          top: LID_Y + LID_H,
          width: BASE_W,
          height: BASE_H,
          borderRadius: '2px 2px 8px 8px',
          backgroundColor: BASE_BODY
        }}
      >
        {/* THE TOP EDGE is two different things along its length. Under the
            lid's footprint there is a groove for the lid to seat into; either
            side of it there is no lid, so you are looking at the top surface of
            the base and it catches the light. Drawn as one highlight all the way
            across with a groove laid over it, the base came out in four tones
            side by side and read as a striped bar. */}
        <span
          className="absolute left-0 top-0"
          style={{ width: (BASE_W - LID_W) / 2, height: 1.5, backgroundColor: BASE_TOP }}
        />
        <span
          className="absolute right-0 top-0"
          style={{ width: (BASE_W - LID_W) / 2, height: 1.5, backgroundColor: BASE_TOP }}
        />
        {/* THE SEAM. A groove for the lid to seat into and, under it, the shadow
            the lid throws onto the base. The groove on its own was not enough: a
            two-pixel line at this size reads as a scratch, and without the shadow
            the lid's bottom edge simply stopped and a grey bar began. */}
        <span
          className="absolute top-0"
          style={{
            left: (BASE_W - LID_W) / 2,
            width: LID_W,
            height: 3,
            backgroundColor: 'rgba(10,3,28,0.55)'
          }}
        />
        <span
          className="absolute"
          style={{
            left: (BASE_W - LID_W) / 2,
            top: 3,
            width: LID_W,
            height: 8,
            background: 'linear-gradient(180deg, rgba(10,3,28,0.32) 0%, transparent 100%)'
          }}
        />
        <span
          className="absolute bottom-0 left-0 w-full"
          style={{ height: LIP_H, backgroundColor: BASE_LIP }}
        />
        <span
          className="absolute bottom-0"
          style={{
            left: BASE_W / 2 - 38,
            width: 76,
            height: 4,
            borderRadius: '4px 4px 0 0',
            backgroundColor: 'rgba(20,6,52,0.34)'
          }}
        />
      </div>

      {/* ── THE FIVE ─────────────────────────────────────────────────────
          Painted last, in reverse, so the one furthest back is laid down first
          and the one at the front ends up on top of everything. The arrival runs
          once, on mount, staggered down the stack. */}
      {PLACES.map((place, j) => (
        <span
          key={j}
          className="note-float pointer-events-none absolute"
          style={{
            left: place.x,
            top: place.y,
            width: CARD_W,
            height: CARD_H,
            zIndex: PLACES.length - j,
            animationDuration: `${DRIFT[j]}s`,
            animationDelay: `-${(DRIFT[j] * 0.37 * j).toFixed(2)}s`
          }}
        >
          <span
            className="note-in absolute inset-0"
            style={{
              borderRadius: RADIUS,
              animationDelay: `${j * STAGGER}ms`,
              boxShadow: CAST
            }}
          >
            <Row notice={NOTICES[j]} when={WHEN[j]} />
          </span>
        </span>
      ))}
    </div>
  );
});
