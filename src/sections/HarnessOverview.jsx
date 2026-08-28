/* The overview film, and the one section on the page that loads a video.

   It does not load until it is asked to. The file is 7.8MB — heavier than
   everything else on the site put together — so what sits here at rest is a
   still panel with a play control, and the video element is only created once
   somebody presses it. `preload="none"` keeps the browser from fetching it even
   then until playback starts.

   That is the whole reason this is a button that becomes a video, rather than a
   video with a poster: a poster still costs a request, and an autoplaying file
   this size would undo every other performance decision on the page. */

import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { FadeIn } from '../components/ui/FadeIn.jsx';
import { SectionLabel } from '../components/ui/SectionLabel.jsx';
import { CornerMark } from '../components/ui/CornerMark.jsx';
import { Button } from '../components/ui/Button.jsx';
import { SHELL } from '../lib/layout.js';

/* Where the button goes when nothing is pointing at it. It is placed with
   `left-1/2 top-1/2` and centred on itself, so the resting transform is zero and
   nothing has to be measured on mount — which is the whole reason it does not
   flash in the corner on the first paint. */
const PARKED = 'translate3d(0px, 0px, 0)';

/* ── A SPRING, NOT AN EASE ────────────────────────────────────────────────

   Closing a fixed fraction of the gap per frame — the first attempt — is an
   exponential decay: it always approaches from one side and it always arrives
   with the speed bleeding out of it. Nothing physical moves that way, which is
   why it still read as a lag rather than as weight.

   These numbers are the ones every published version of this effect uses, and
   they are Framer Motion's own spring config: stiffness 300, damping 20, mass
   0.5. Integrated by hand rather than pulled in as a dependency, because it is
   six lines and this page carries no animation library.

   Critical damping for k=300 m=0.5 is 2·sqrt(k·m) = 24.5, and 20 is under it.
   That is the point: the button arrives slightly past the pointer and settles
   back onto it. The overshoot is the whole effect — it is the difference
   between something being moved and something having mass. */
const STIFFNESS = 300;
const DAMPING = 20;
const MASS = 0.5;

/* ── MAGNETIC, NOT ATTACHED ───────────────────────────────────────────────

   The button used to be given the pointer's position outright, which made it a
   cursor: wherever the hand went, it went, and the middle of the frame stopped
   meaning anything the moment you crossed the edge.

   It is now given a FRACTION of that distance, so the centre stays its home and
   the pointer only pulls it off. Reaching for the far corner draws it about
   four tenths of the way there and no further — it leans towards the hand, and
   never gets to it. That is the difference between a thing that follows you and
   a thing that is attracted to you, and it is the whole of it: one multiply. */
const PULL = 0.42;

/* And a looser spring for the trip home. 20 against a critical 24.5 barely
   overshoots — right while it is chasing a pointer, where a bounce would read
   as imprecision. Nothing is chasing anything on the way back, so the damping
   drops to 14 and it passes the centre by about a tenth of the distance it came
   before settling on it. */
const RETURN_DAMPING = 14;

/* ── AND THE STRETCH, WITHOUT THE ROTATION ────────────────────────────────

   The second half of the technique, and the half that actually reads as
   expensive: the shape deforms along the direction it is travelling. The
   distance between where the pointer is and where the button has got to IS the
   velocity, so nothing has to track it separately.

   The published version takes `atan2` over that gap and rotates the shape to
   the heading. That works because it is a 60px dot, where a rotation is
   invisible. This is a 180x56 pill, and rotating a box that shape to 90 degrees
   stands it on end — a 56-wide box behind a 150-wide label, which is exactly
   the overflow: the pill turned and the words did not.

   So the pull is resolved onto the two axes instead, which needs no rotation at
   all. Moving sideways stretches it sideways and thins it top to bottom, which
   is safe because the height is mostly padding. Moving up and down stretches it
   top to bottom and leaves the width ALONE — the width is set by the words
   inside it, and anything that narrows it puts them outside it again.

   Applied to the pill's BACKGROUND and not to the pill, so the icon and the
   words ride on top at their true size. Stretching the type would be the tell.

   The frame does not move. It leaned towards the pointer for a while and the
   film is not a product card: everything the band has to say happens on the
   surface, and tilting the surface underneath it only put two things in motion
   where one was doing the work. */
const MAX_LAG = 48;
const STRETCH = 0.18;
const SQUASH = 0.1;
const REST = 'scaleX(1) scaleY(1)';

/* HOW CLOSE TO THE EDGE IT IS ALLOWED TO GET, measured from the pill's own edge
   to the frame's.

   The frame is `overflow-hidden`, so a button that follows the pointer all the
   way into a corner gets sliced in half by the rounded rectangle it is standing
   on. Nothing about that reads as intentional — it reads as an element that has
   escaped its container.

   So the pointer is followed and the button is not: past the boundary the
   pointer keeps going and the button stops, which is the same thing a physical
   object does when it reaches the side of the tray it is in. 10px of air, and
   the half-size it is held back by is the STRETCHED half-size, so the deformed
   shape is what clears the edge rather than the resting one. */
const EDGE = 10;

const prefersReduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true;

export function HarnessOverview({ onExploreHarness }) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef(null);

  /* ── THE PLAY BUTTON BECOMES THE CURSOR ───────────────────────────────
     At rest it sits in the middle of the frame, which is where a play button
     belongs. Point at the film and it leaves that spot, follows the pointer for
     as long as it is inside the frame, and opens out to say what pressing it
     does. There is only one of them: it is not a static button plus a hover
     cursor, it is the same object in two places, which is why it glides back to
     the centre instead of appearing and disappearing.

     `hot` is the only state, and it changes twice per visit — on the way in and
     on the way out. The position is written straight to the node's transform
     through a ref, because a `setState` per pointermove would re-render this
     section on every frame of the gesture.

     `translate3d` rather than left/top: it is composited, so following the
     pointer costs no layout. `pointer-events-none` on the follower keeps it
     from stealing the press from the button underneath it. Both are what every
     write-up of this effect says to do, and both are load-bearing.

     Touch is excluded by pointer type rather than by a media query, so the
     button still renders on a phone — it simply stays parked in the middle,
     which is the plain play button it always was. */
  const [hot, setHot] = useState(false);
  /* Bumped once each time the button lands back in the middle. It is the key on
     the ripple element, so incrementing it remounts that element and the CSS
     animation on it starts again from nothing. */
  const [ripple, setRipple] = useState(0);
  const followRef = useRef(null);

  /* Where the pointer is, where the button is, and whether the pointer is still
     in the frame. All refs: the loop below reads and writes them sixty times a
     second, and a single `setState` in that path would re-render this section on
     every frame of the gesture. `hot` is state because it changes twice per
     visit and the label has to re-render when it does. */
  const blobRef = useRef(null);
  const boxRef = useRef(null);
  const target = useRef({ x: 0, y: 0 });
  const at = useRef({ x: 0, y: 0 });
  const vel = useRef({ x: 0, y: 0 });
  /* The last place the pointer was reported, in page coordinates. Kept so the
     target can be recomputed without a pointer event — see the scroll listener
     below, which is one of the two ways the button used to get stuck. */
  const client = useRef({ x: 0, y: 0 });
  const size = useRef({ w: 0, h: 0 });
  const inside = useRef(false);
  const springy = useRef(true);
  const damp = useRef(DAMPING);
  const last = useRef(0);
  const frame = useRef(0);

  /* ONE LOOP FOR BOTH DIRECTIONS. Following the pointer and springing back to
     the centre are the same move with a different target, so there is no second
     code path for the way out and no CSS transition to switch on and off. The
     bounce on the way home is the same spring as the bounce on the way out,
     which is why the two feel like one object rather than two behaviours.

     It stops itself once it is home and idle, so nothing runs while the section
     is just sitting on the page. */
  const step = useCallback((now) => {
    const f = followRef.current;
    if (!f) {
      frame.current = 0;
      return;
    }
    /* Real elapsed time, capped at a 30fps frame. Integrating a spring against
       `dt` is what keeps it identical on a 60Hz and a 144Hz screen; the cap is
       what stops a dropped frame or a backgrounded tab from handing it a step
       large enough to fling the button off the page. */
    const dt = Math.min((now - last.current) / 1000, 1 / 30) || 1 / 60;
    last.current = now;

    const a = at.current;
    const v = vel.current;
    const t = target.current;

    /* HELD OFF THE EDGES, here and not where the target is set, because the pill
       is still growing for 700ms after the label opens: clamping once against
       the size it was would let it walk out through the side while it widened.
       `offsetWidth` is a layout box and ignores the transform on it, so this is
       the pill's true size whatever the stretch is currently doing to it. */
    const pill = blobRef.current;
    if (pill && size.current.w) {
      const mx = Math.max(0, size.current.w / 2 - (pill.offsetWidth * (1 + STRETCH)) / 2 - EDGE);
      const my = Math.max(0, size.current.h / 2 - (pill.offsetHeight * (1 + STRETCH)) / 2 - EDGE);
      t.x = Math.max(-mx, Math.min(mx, t.x));
      t.y = Math.max(-my, Math.min(my, t.y));
    }

    if (springy.current) {
      v.x += ((-STIFFNESS * (a.x - t.x) - damp.current * v.x) / MASS) * dt;
      v.y += ((-STIFFNESS * (a.y - t.y) - damp.current * v.y) / MASS) * dt;
      a.x += v.x * dt;
      a.y += v.y * dt;
    } else {
      a.x = t.x;
      a.y = t.y;
      v.x = 0;
      v.y = 0;
    }

    /* The gap the spring has not closed yet is the velocity, so the stretch
       comes free from the same two numbers the position does. Resolved per
       axis, because the pill cannot be rotated. */
    const dx = t.x - a.x;
    const dy = t.y - a.y;
    const px = Math.min(Math.abs(dx) / MAX_LAG, 1);
    const py = Math.min(Math.abs(dy) / MAX_LAG, 1);
    const b = blobRef.current;

    /* At rest AND slow. Position alone is not enough: the spring
       passes through its target at full speed on the way to the overshoot, and
       stopping there would cut the bounce off at the one moment it is most
       visible. */
    if (
      Math.abs(dx) < 0.15 &&
      Math.abs(dy) < 0.15 &&
      Math.abs(v.x) + Math.abs(v.y) < 2
    ) {
      a.x = t.x;
      a.y = t.y;
      v.x = 0;
      v.y = 0;
      f.style.transform = inside.current
        ? `translate3d(${a.x.toFixed(2)}px, ${a.y.toFixed(2)}px, 0)`
        : PARKED;
      if (b) b.style.transform = REST;
      /* HOME. One `setState` for the whole visit, at the one instant it is
         worth one: the ring goes out from where the button came to rest, so the
         return ends on a full stop rather than just stopping. */
      if (!inside.current) setRipple((n) => n + 1);
      frame.current = 0;
      return;
    }

    f.style.transform = `translate3d(${a.x.toFixed(2)}px, ${a.y.toFixed(2)}px, 0)`;
    if (b) {
      /* Sideways: stretch X, thin Y. Up and down: stretch Y only. */
      b.style.transform = `scaleX(${(1 + px * STRETCH).toFixed(3)}) scaleY(${(
        1 +
        py * STRETCH -
        px * SQUASH
      ).toFixed(3)})`;
    }
    frame.current = requestAnimationFrame(step);
  }, []);

  /* `last` is stamped here and not in the loop: without it the first frame
     after an idle spell gets the whole idle period as its `dt`. */
  const run = useCallback(() => {
    if (frame.current) return;
    last.current = performance.now();
    frame.current = requestAnimationFrame(step);
  }, [step]);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  /* Arming is here rather than only in `enter`, and that is the fix for the
     button sometimes doing nothing.

     `pointerenter` fires once, on the crossing. Every case where the pointer is
     already over the film when the button appears has no crossing to fire on:
     the cover comes back when the video ends, under a hand that has not moved;
     the section arrives under the pointer at the end of a scroll; the window
     regains focus with the pointer already there. In all three the button sat
     parked and stayed parked until you left the frame and came back — which is
     exactly "it works most of the time".

     A pointermove inside the frame is proof enough of a pointer in the frame,
     so it arms on its own and `enter` is now only the fast path for someone who
     stops the instant they cross the edge. */
  const arm = () => {
    if (inside.current) return;
    inside.current = true;
    /* Read once per visit rather than once per frame. With the spring off the
       button lands with no travel and no deformation at all, which is what
       someone who has asked for less motion is asking for. */
    springy.current = !prefersReduced();
    damp.current = DAMPING;
    setHot(true);
  };

  const aim = (cx, cy) => {
    const box = boxRef.current;
    if (!box) return;
    const r = box.getBoundingClientRect();
    client.current.x = cx;
    client.current.y = cy;
    size.current.w = r.width;
    size.current.h = r.height;
    target.current.x = (cx - r.left - r.width / 2) * PULL;
    target.current.y = (cy - r.top - r.height / 2) * PULL;
    run();
  };

  const enter = (e) => {
    if (e.pointerType === 'touch') return;
    arm();
    aim(e.clientX, e.clientY);
  };

  const move = (e) => {
    if (e.pointerType === 'touch') return;
    arm();
    aim(e.clientX, e.clientY);
  };

  /* THE OTHER WAY IT GOT STUCK. Scrolling moves the frame under a stationary
     pointer and fires no pointer event at all, so the target — which is stored
     relative to the frame — kept pointing at where the pointer used to be. The
     button would sit several inches from the cursor until the hand moved again.

     Only listened for while the pointer is actually in the frame, and passive,
     so it cannot hold up a scroll. */
  useEffect(() => {
    if (!hot) return undefined;
    const resync = () => {
      const box = boxRef.current;
      if (!box) return;
      const r = box.getBoundingClientRect();
      size.current.w = r.width;
      size.current.h = r.height;
      target.current.x = (client.current.x - r.left - r.width / 2) * PULL;
      target.current.y = (client.current.y - r.top - r.height / 2) * PULL;
      run();
    };
    window.addEventListener('scroll', resync, { passive: true });
    window.addEventListener('resize', resync);
    return () => {
      window.removeEventListener('scroll', resync);
      window.removeEventListener('resize', resync);
    };
  }, [hot, run]);

  const leave = (e) => {
    if (e.pointerType === 'touch') return;
    inside.current = false;
    damp.current = RETURN_DAMPING;
    target.current.x = 0;
    target.current.y = 0;
    setHot(false);
    run();
  };

  /* Unmute and start. The promise rejects if the browser blocks playback, and
     there is nothing useful to do about that except leave the cover off so it
     can be pressed again. */
  const start = () => {
    const el = videoRef.current;
    if (!el) return;
    /* Wound all the way back, because the cover is about to be removed and
       there will be no `pointerleave` to do it. Left as it was, the button that
       comes back when the film ends is armed, open, and holding a position from
       a gesture that finished a minute ago. */
    inside.current = false;
    target.current.x = 0;
    target.current.y = 0;
    at.current.x = 0;
    at.current.y = 0;
    vel.current.x = 0;
    vel.current.y = 0;
    setHot(false);
    setPlaying(true);
    el.muted = false;
    el.play().catch(() => {});
  };

  return (
    <section id="harness-overview" className="bg-b dots relative py-16 md:py-24">
      <div className={SHELL}>
        <CornerMark className="-top-7 left-1 md:left-3" />
        <CornerMark className="-top-7 right-1 md:right-3" />

        <FadeIn className="reveal-soft plate mx-auto max-w-4xl text-center">
          <SectionLabel index="04" centered>
            Method Overview
          </SectionLabel>
          <h2 className="balance mt-5 font-extrabold leading-[1.02] tracking-[-0.035em] text-[clamp(30px,4.8vw,64px)] text-ig-ink">
            See the method in action
          </h2>
          <p className="mx-auto mt-5 max-w-[60ch] text-[15.5px] leading-[1.6] text-ig-muted md:text-[17px]">
            See how business intent moves through governed orchestration, validation and
            production-ready output
          </p>
        </FadeIn>

        {/* 1120, between the 900 it was and the full 1496 shell it briefly ran
            to. 900 left 300 of empty band down each side of the one thing in
            the section anybody came to look at; the full measure made a
            630-tall film 840 tall and handed the band to it entirely. At 1120 it
            is plainly the biggest thing here and still sits inside margins,
            which is what stops it reading as a section that has burst.

            Roughly 385 of travel each way for the button, against 270 at 900. */}
        <FadeIn delay={120} className="mx-auto mt-10 max-w-[1120px] md:mt-12">
          {/* The frame. Same radius and shadow as the illustrated windows in
              the walkthrough, so the film sits in the same furniture as
              everything else rather than arriving as a bare rectangle.

              It is also what the pointer is measured against, which is why it
              carries no transform of its own: a box that moves because of the
              measurement is a poor thing to take the measurement from. */}
          <div
            ref={boxRef}
            className="relative overflow-hidden rounded-[20px] bg-ig-ink shadow-[0_1px_2px_rgba(22,6,58,0.18),0_36px_80px_-40px_rgba(22,6,58,0.7)]"
          >
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 z-10 block h-[3px] bg-[linear-gradient(90deg,#4A2FD4_0%,#7A00C2_52%,#00A274_100%)]"
            />

            {/* A REAL FRAME OF THE FILM IS THE PREVIEW.

                There is no poster image to load, and the drawn placeholder that
                was here before told you nothing about what you were about to
                watch. `preload="metadata"` with `#t=2` on the source is what
                makes that cheap: the browser fetches the header and just enough
                of the stream to paint the frame two seconds in, then stops. The
                other 7.8MB waits until somebody presses play.

                `muted` and `playsInline` are set before it plays as well —
                without both, iOS refuses to paint a frame at all and shows a
                grey box instead. */}
            {/* eslint-disable-next-line jsx-a11y/media-has-caption -- no
                caption track exists for this file yet, and a wrong one is worse
                than none */}
            <video
              ref={videoRef}
              src="/harness-overview.mp4#t=2"
              preload="metadata"
              muted
              playsInline
              controls={playing}
              onEnded={() => setPlaying(false)}
              className="block aspect-video w-full"
            />

            {/* The cover comes off on the first press and does not come back:
                once it is running, the browser's own controls are the right
                thing to be looking at. */}
            {!playing && (
              <>
                {/* `cursor-none` only where there is a pointer to hide. The
                    button is the whole frame, so the follower above it is
                    standing in for the arrow across the entire film. */}
                <button
                  type="button"
                  onClick={start}
                  onPointerEnter={enter}
                  onPointerMove={move}
                  onPointerLeave={leave}
                  aria-label="Play the overview"
                  className="absolute inset-0 block bg-ig-console/50 transition-colors duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-ig-console/30 [@media(pointer:fine)]:cursor-none"
                >
                  {/* The running time stays put while the button walks off with
                      the pointer — it is the one thing here the button cannot
                      also say once it has opened out. It steps back while the
                      pointer is in the frame, because two things asking to be
                      read is what makes an interaction feel busy rather than
                      considered. */}
                  <span
                    className={`absolute inset-x-0 bottom-6 block text-center font-mono text-[11px] font-bold tracking-[0.055em] text-white transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      hot ? 'opacity-35' : 'opacity-80'
                    }`}
                  >
                    Watch overview · 1:00
                  </span>
                </button>

                <span
                  ref={followRef}
                  aria-hidden="true"
                  style={{ transform: PARKED }}
                  className="pointer-events-none absolute left-1/2 top-1/2 z-20 block will-change-transform"
                >
                  {/* The pill grows from the icon's own padding rather than
                      from a width: the icon never moves relative to the
                      pointer, and the label opens out to the right of it. A
                      width transition would slide the icon sideways as the
                      words arrived, which is the one thing a cursor must not
                      do. */}
                  {/* SET IN THE HEADING'S FACE — same weight, same tracking, the
                      same shape of clamp — but not at the heading's size.

                      At the full 64 the open pill came to 450 of a 900-wide
                      frame, and once it is held off the edges a button half the
                      width of its container has barely a third of the frame to
                      move in: the pointer crossed the film and the button
                      shuffled. The size that reads as display type and still
                      leaves the effect somewhere to happen is 40, where the pill
                      is about 280 and there is 270 of travel each way.

                      Everything inside is in `em` and nothing is in pixels: the
                      icon, both paddings, the gap and the label's own width all
                      come off that one clamp. One number sets the whole button,
                      which is what makes the size a single thing to change.

                      AND IT IS ROUND, which took getting the two things in the
                      row to the same height. The label is collapsed to zero
                      WIDTH, not removed — it is still a line box a full em tall,
                      and the icon was 0.62em, so the row was an em high and only
                      0.62 wide and the circle came out an upright oval. Both are
                      1em now, and the vertical padding is the same in both
                      states, so the height never changes at all: opening the
                      label is purely a change of width.

                      The words are set at 0.55 of that, and the size of the
                      BUTTON and the size of the TEXT ON IT are not the same
                      question — a play control wants to be caught out of the
                      corner of an eye, and a two-word label read at a glance
                      does not need to be the size of a headline to manage it.
                      The icon still holds the em, so shrinking the label cannot
                      make the circle oval again. */}
                  <span
                    className={`relative flex -translate-x-1/2 -translate-y-1/2 items-center text-[clamp(22px,2.9vw,40px)] font-extrabold leading-none tracking-[-0.035em] text-white transition-[gap,padding] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      hot ? 'gap-[0.2em] py-[0.34em] pl-[0.4em] pr-[0.56em]' : 'gap-0 p-[0.34em]'
                    }`}
                  >
                    {/* The pill itself, and the only thing the stretch is
                        applied to. `rounded-full` under a non-uniform scale
                        goes elliptical, which is exactly the liquid the effect
                        is after — and the icon and the words sitting on top of
                        it, outside the transform, stay the size they were
                        drawn. */}
                    <span
                      ref={blobRef}
                      aria-hidden="true"
                      style={{ transform: REST }}
                      className={`absolute inset-0 rounded-full bg-ig-teal transition-shadow duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform ${
                        hot
                          ? 'shadow-[0_26px_60px_-18px_rgba(0,162,116,0.95)]'
                          : 'shadow-[0_20px_50px_-20px_rgba(0,162,116,0.9)]'
                      }`}
                    />
                    {/* Keyed on the counter, so each return mounts a NEW node
                        and the animation on it runs from the start. Restarting
                        a CSS animation on the same element means removing the
                        class, forcing a reflow and putting it back; a changed
                        key does the same thing and says what it means.

                        Not rendered at all until the first return, or it would
                        fire once on load for a gesture nobody made. */}
                    {ripple > 0 && (
                      <span
                        key={ripple}
                        aria-hidden="true"
                        className="ripple-out pointer-events-none absolute inset-0 rounded-full ring-2 ring-ig-teal"
                      />
                    )}
                    {/* 1em square, to match the label's line box exactly. The
                        glyph inside lucide's 24-unit viewBox carries its own
                        margin, so the triangle still comes out at about a third
                        of the circle rather than filling it. */}
                    <Play
                      className="relative h-[1em] w-[1em] shrink-0 fill-current"
                      strokeWidth={0}
                    />
                    {/* The words are last to arrive and first to leave: opening
                        on a delay lets the button reach the pointer before it
                        starts talking, and closing without one gets them out of
                        the way before it starts the walk back. Two durations,
                        because an interaction that takes as long to undo as it
                        did to do is the one that feels slow.

                        The padding-and-negative-margin pair is what keeps the
                        row exactly one em tall while still giving the clip box
                        room: at `leading-none` the line box stops at the
                        baseline, and the descender of the y in "Play video"
                        hangs below it, straight into the `overflow-hidden` that
                        does the reveal. The padding lets it through; the
                        matching negative margin keeps it out of the layout. */}
                    <span
                      className={`relative -my-[0.14em] overflow-hidden whitespace-nowrap py-[0.14em] text-[0.55em] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        hot
                          ? 'max-w-[6em] opacity-100 transition-[max-width,opacity] delay-150 duration-700'
                          : 'max-w-0 opacity-0 transition-[max-width,opacity] duration-500'
                      }`}
                    >
                      Play video
                    </span>
                  </span>
                </span>
              </>
            )}
          </div>
          {/* The two ends of the run, named under the frame: what the method
              guarantees on the way in, and what comes out the other side. */}
          <div className="mt-5 flex items-center justify-between font-mono text-[10.5px] font-bold tracking-[0.055em] text-ig-muted">
            <span>Governed orchestration</span>
            <span>Production ready</span>
          </div>


          <div className="mt-8 flex justify-center">
            <Button
              onClick={onExploreHarness}
              variant="light"
              className="px-6 py-3.5 text-[13px] font-semibold"
            >
              Explore the method
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
