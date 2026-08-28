/* The turning globe in the workflow picture: a world drawn in points, with two
   satellite planes crossing it.

   THE POINTS ARE PAINTED, NOT BUILT. Every previous version put one element on
   the page per point, inside a `preserve-3d` scene — and that is what made it
   stutter. A 3D scene cannot be flattened and reused, so the browser transforms
   and composites every child again on each frame the world turns. Six hundred
   points was the most that stayed smooth, and six hundred is not enough land to
   look like land.

   One canvas draws two thousand of them in a single pass, and the page has one
   element to composite instead of six hundred. The work per frame is a handful
   of multiplications each and about a thousand two-pixel fills — well under a
   millisecond — where the DOM version was asking the compositor to manage six
   hundred separate layers sixty times a second.

   It costs the thing this file used to be proud of: there is a repaint now,
   where before there was none. It is a 200-pixel square repainting inside its
   own layer, which is a fraction of what was being spent to avoid it.

   THREE THINGS THE PAINTED VERSION GETS FOR FREE.

   Depth. A point's brightness now falls off towards the edge of the disc,
   because its distance from the viewer is a number we already have. The far
   side is skipped by testing that number rather than by asking the browser to
   cull back faces.

   Sync. The ground stations and their pings are drawn on the same clock as the
   land, so they cannot drift from it. As separate elements on a CSS animation
   they were on a second timer and slowly would.

   And rest. The loop stops when the section scrolls out of view and starts again
   when it comes back, so a globe nobody is looking at costs nothing at all.

   THE LAND IS IN THIS FILE, AS A MAP YOU CAN READ. Thirty-six rows of seventy-two
   characters, five degrees to a cell, `#` for land. It is generated from
   coastline spans rather than typed, so the rows cannot drift out of alignment
   with each other.

   THE POINTS ARE NOT ON THAT GRID, THOUGH. One point per cell would bunch them
   at the poles and thin them at the equator, which is what a grid of latitude
   and longitude does to a sphere. They are spread by the golden angle — evenly
   over the surface — and each one then asks the map whether it landed on land.
   Even covering, real coastlines. */

import { useEffect, useRef } from 'react';

/* THE WORLD, five degrees to a character. Row 0 is 90–85°N and column 0 is
   180–175°W, so a cell's centre is `87.5 − 5r` north and `5c − 177.5` east. */
const LAND = [
  '........................................................................',
  '..................###############............#####......................',
  '............#####################......###....#########.................',
  '....#############################...####################################',
  '...#############################.##..###################################',
  '..###############.....#########..#######################################',
  '..###############.....#######.....######################################',
  '......###########....########.....######################################',
  '......#######################.....######################################',
  '......######################......########..##..########################',
  '......######################......##.###################################',
  '.......####################......#######################################',
  '.........#################.......#########.#############################',
  '...........#############.........#########.######.###############.......',
  '..............###########.......###############...#############.........',
  '................##########......#############......###..#######.........',
  '......................#######...###############.....#...#########.......',
  '......................##########.###############........###########.....',
  '.....................###########..###############.......#############...',
  '.....................###########...#############..........#############.',
  '.....................###########...###########..............########....',
  '.....................###########...###########............##########....',
  '......................##########...########..#............##########....',
  '......................#########.....#######................########.....',
  '.......................#######.......#####..................######......',
  '........................######.......................................##.',
  '.........................#####.......................................###',
  '.........................####...........................................',
  '..........................###...........................................',
  '..........................##............................................',
  '.........................##.............................................',
  '########################################################################',
  '########################################################################',
  '########################################################################',
  '........................................................................',
  '........................................................................'
];

/* Four thousand candidates leave a little under two thousand on land, which at a
   sphere 200 across is a point every four pixels or so — dense enough that the
   continents read as filled land rather than as dotted outlines.

   The number is set by how it looks now, not by what it costs. Painting two
   thousand points is cheap; it was building them that was not. */
const CANDIDATES = 4000;
const GOLDEN = 137.50776405003785;
const RAD = Math.PI / 180;

/* Each point as a unit vector, worked out once when the module loads. Screen
   axes: x right, y down, z towards the viewer — so north is negative y, which is
   why the latitude term is negated.

   Equal slices of HEIGHT, not of angle, is what makes the covering even: a
   horizontal band cut from a sphere has the same area wherever it is taken from.

   `tone` is a small fixed variation in weight, so the land has texture instead of
   looking printed. */
const DOTS = [];
for (let i = 0; i < CANDIDATES; i += 1) {
  const h = 1 - ((i + 0.5) * 2) / CANDIDATES;
  const lat = Math.asin(h) / RAD;
  const lon = ((i * GOLDEN) % 360) - 180;

  const row = Math.min(35, Math.max(0, Math.floor((90 - lat) / 5)));
  const col = Math.min(71, Math.max(0, Math.floor((lon + 180) / 5)));
  if (LAND[row][col] !== '#') continue;

  const cl = Math.cos(lat * RAD);
  DOTS.push({
    x: cl * Math.sin(lon * RAD),
    y: -Math.sin(lat * RAD),
    z: cl * Math.cos(lon * RAD),
    tone: 0.72 + ((i * 7) % 9) / 32
  });
}

/* The ground stations, on real land: the American midwest, central Europe, and
   the coast of southern China. Three rather than a scattering — a globe covered
   in marks is a map of nothing. */
const SITES = [
  { lon: -96, lat: 39 },
  { lon: 9, lat: 50 },
  { lon: 118, lat: 24 }
].map(({ lon, lat }) => {
  const cl = Math.cos(lat * RAD);
  return {
    x: cl * Math.sin(lon * RAD),
    y: -Math.sin(lat * RAD),
    z: cl * Math.cos(lon * RAD)
  };
});

/* THE AXIS. Twenty-eight degrees clockwise, so the north pole points up and to
   the right and the south pole down and to the left, and sixteen degrees of tip
   so we are looking at it from slightly above its equator. A world spinning
   about a dead-vertical axis is the default every drawing arrives at, and
   nothing in space stands upright. */
const AXIS = 28;
const TIP = 16;
const TURN = 26000;
const PING = 2800;

/* THE TWO ORBITAL PLANES.

   TWO, NOT THREE. Three paths at one altitude cross each other six times, and
   over a globe covered in points that is a tangle — every crossing is another
   line the eye has to separate from the land underneath. Two cross twice.

   THE ALTITUDE IS A COMPROMISE, AND WORTH NAMING. A real low orbit is under nine
   per cent above the surface, and at that height only about two fifths of the
   path clears the silhouette; the rest runs across the face, where it reads as a
   line drawn ON the world rather than around it. At 34 out of 100 nearly three
   fifths is clear of the edge. It was 44 once, and paths half again as big as
   the world they go round stop being orbits and become swooping arcs.

   The rest is how a constellation is actually arranged: one inclination, one
   altitude, evenly spaced about the axis. Starlink's shells sit near 53 degrees;
   these are 55, spread 64 apart so they cross at a clear angle. */
const ORBITS = [
  { out: 34, tilt: 55, roll: AXIS - 32, dot: 5, speed: 15, back: false, phase: 0 },
  { out: 34, tilt: 55, roll: AXIS + 32, dot: 5, speed: 23, back: true, phase: -6 }
];

/* HALF A PATH.

   A ring drawn as one element goes over the world for its whole circuit, which
   is a hoop lying on a ball and not an orbit. Half of every orbit is behind the
   thing it goes round, and that half has to disappear — and nothing here can
   work it out alone, because the world is painted into a canvas that the browser
   has no depth information about.

   So each path is drawn twice and cut in half. `clip-path` runs in the element's
   own coordinates, BEFORE its parent tips it, and after a tip of `rotateX` the
   local top half is the half at negative depth. Clip the top and you get the
   half that goes behind; clip the bottom and you get the half in front. Back
   halves are painted before the world, front halves after.

   One weight and one colour for both. The near half used to be brighter, which
   is a depth cue the world already gives by hiding whatever passes behind it —
   two cues saying the same thing left one half looking half-erased. */
function Path({ orbit: { tilt, roll, out }, half }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      style={{
        transformStyle: 'preserve-3d',
        /* the roll goes OUTSIDE the tip. Tipped first and rolled second turns
           the ring about its own normal, and a circle turned about its own
           normal is the same circle — every roll would be thrown away. */
        transform: `rotateZ(${roll}deg) rotateX(${tilt}deg)`
      }}
    >
      <span
        className="absolute rounded-full"
        style={{
          inset: -out,
          border: '1.25px solid rgba(226,220,255,0.6)',
          clipPath: half === 'back' ? 'inset(0 0 50% 0)' : 'inset(50% 0 0 0)'
        }}
      />
    </div>
  );
}

/* TWO SATELLITES TO A PLANE, half a turn apart, the two planes phased so the
   four are never at the same point of their circuits.

   Each has to face the viewer: it rides in a plane tipped 55 degrees away, and a
   circle in that plane projects to a line — which is why these drew as streaks
   before. Turning it back by the angle it was tipped by squares it to the
   camera.

   Five pixels, down from seven, and the glow down with it. A satellite has to sit
   ON its path, and at seven it was wider than the 1.25px line it rode — the dot
   read as a bead threaded onto the orbit rather than as something travelling it.
   The glow was scaled by the same three tenths: a halo sized for a larger dot
   would have kept the bead exactly as wide as it was.

   And each has to go behind. Its depth is `R · sin(spin)`, positive for exactly
   the first half of every circuit, so the fade runs on the same duration and
   direction as the spin. Reversed, both timelines run backwards together and the
   pairing holds. The second of a pair is behind when the first is in front, so
   its fade runs half a period out of step. */
function Satellites({ orbit: { tilt, roll, out, dot, speed, back, phase }, size }) {
  const spin = {
    animationDuration: `${speed}s`,
    animationDirection: back ? 'reverse' : 'normal'
  };

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      style={{
        transformStyle: 'preserve-3d',
        transform: `rotateZ(${roll}deg) rotateX(${tilt}deg)`
      }}
    >
      <div className="globe-orbit absolute inset-0" style={{ ...spin, animationDelay: `${phase}s` }}>
        {[0, 180].map((at) => (
          <span
            key={at}
            className="globe-sat absolute rounded-full bg-white"
            style={{
              ...spin,
              animationDelay: `${phase - (at / 360) * speed}s`,
              left: '50%',
              top: '50%',
              height: dot,
              width: dot,
              marginLeft: -dot / 2,
              marginTop: -dot / 2,
              transform: `rotateZ(${at}deg) translateX(${size / 2 + out}px) rotateZ(${-at}deg) rotateX(${-tilt}deg)`,
              boxShadow: '0 0 11px 3px rgba(255,255,255,0.8)'
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* `size` is a prop rather than a constant because a sphere cannot be laid out in
   percentages — every depth has to be a real distance — so the one number it
   needs comes in from the card that holds it. */
export function HarnessGlobe({ size = 200 }) {
  const canvas = useRef(null);

  useEffect(() => {
    const el = canvas.current;
    if (!el) return undefined;

    const ctx = el.getContext('2d');
    if (!ctx) return undefined;

    /* Draw at the screen's own resolution. A two-pixel point on a retina display
       is four device pixels across, and drawn at CSS resolution it would be a
       soft grey smudge rather than a point. Capped at 2: past that the cost
       doubles again for a difference nobody can see at this size. */
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    el.width = size * dpr;
    el.height = size * dpr;
    ctx.scale(dpr, dpr);

    const mid = size / 2;
    const r = mid - 4;

    /* The tip and the roll never change, so their sines and cosines are worked
       out once rather than sixty times a second. */
    const ct = Math.cos(TIP * RAD);
    const st = Math.sin(TIP * RAD);
    const ca = Math.cos(AXIS * RAD);
    const sa = Math.sin(AXIS * RAD);

    /* BRIGHTNESS IN FIVE STEPS, NOT TWO THOUSAND.

       Every point could carry its own exact shade, but changing the fill colour
       is the expensive part of drawing on a canvas — far more so than the fill
       itself. Rounding each point into one of five buckets and drawing a bucket
       at a time turns two thousand colour changes into five. Five is enough that
       no banding is visible at this size. */
    const STEPS = 5;
    const buckets = Array.from({ length: STEPS }, () => []);

    const frame = (now) => {
      const spin = ((now % TURN) / TURN) * Math.PI * 2;
      const cs = Math.cos(spin);
      const ss = Math.sin(spin);

      ctx.clearRect(0, 0, size, size);
      for (let b = 0; b < STEPS; b += 1) buckets[b].length = 0;

      const place = (p) => {
        /* spin about the world's own axis, then tip it, then lean it */
        const x1 = p.x * cs + p.z * ss;
        const z1 = p.z * cs - p.x * ss;
        const y2 = p.y * ct - z1 * st;
        const z2 = p.y * st + z1 * ct;
        return {
          sx: mid + r * (x1 * ca - y2 * sa),
          sy: mid + r * (x1 * sa + y2 * ca),
          z: z2
        };
      };

      for (let i = 0; i < DOTS.length; i += 1) {
        const p = place(DOTS[i]);
        if (p.z <= 0) continue;
        /* Dimmer towards the edge of the disc. The depth is already in hand, so
           the falloff is free — and it is what stops a flat disc of points from
           looking like a sticker. */
        const lit = DOTS[i].tone * (0.34 + 0.66 * p.z);
        buckets[Math.min(STEPS - 1, Math.max(0, Math.round(lit * (STEPS - 1))))].push(p.sx, p.sy);
      }

      for (let b = 0; b < STEPS; b += 1) {
        const list = buckets[b];
        if (!list.length) continue;
        ctx.fillStyle = `rgba(216,208,255,${(0.2 + (b / (STEPS - 1)) * 0.72).toFixed(2)})`;
        for (let i = 0; i < list.length; i += 2) ctx.fillRect(list[i] - 1, list[i + 1] - 1, 2, 2);
      }

      /* the ground stations, and the ring each one sends out */
      const pulse = (now % PING) / PING;
      for (let i = 0; i < SITES.length; i += 1) {
        const p = place(SITES[i]);
        if (p.z <= 0) continue;

        ctx.beginPath();
        ctx.arc(p.sx, p.sy, 3 + 13 * pulse, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0,188,106,${(0.5 * (1 - pulse)).toFixed(2)})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(p.sx, p.sy, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#00BC6A';
        ctx.fill();
      }
    };

    const still =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (still) {
      frame(0);
      return undefined;
    }

    /* RUNNING ONLY WHILE ANYONE CAN SEE IT. A globe below the fold turning at
       sixty frames a second is work nobody asked for, and it competes with the
       scroll that is carrying the reader past it. */
    let raf = 0;
    const tick = (now) => {
      frame(now);
      raf = window.requestAnimationFrame(tick);
    };

    const watch = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !raf) raf = window.requestAnimationFrame(tick);
        else if (!entry.isIntersecting && raf) {
          window.cancelAnimationFrame(raf);
          raf = 0;
        }
      },
      { rootMargin: '120px' }
    );
    watch.observe(el);

    return () => {
      watch.disconnect();
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [size]);

  return (
    <div
      role="img"
      aria-label="A turning globe drawn in points, with satellites crossing it, standing for the platform running across the systems you already have"
      className="relative"
      style={{ height: size, width: size, perspective: 900 }}
    >
      {/* the light it stands in, spilling well past the world and onto the card */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 block -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          height: size * 1.8,
          width: size * 2.7,
          background:
            'radial-gradient(closest-side, rgba(122,0,194,0.46) 0%, rgba(74,47,212,0.13) 50%, transparent 100%)'
        }}
      />

      {/* the far side of every path, before the body so the body covers it */}
      {ORBITS.map((orbit) => (
        <Path key={`back-${orbit.roll}`} orbit={orbit} half="back" />
      ))}

      {/* THE BODY. Dark, deliberately: the land is the subject and a bright ball
          would swallow it. Opaque, so the far side of the orbits cannot show
          through — that alone was what made the world read as a glass shell. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute rounded-full"
        style={{
          inset: 4,
          background: 'radial-gradient(circle at 32% 26%, #45189B 0%, #260A5E 48%, #10042E 100%)',
          boxShadow: 'inset 0 0 60px rgba(10,3,32,0.9)'
        }}
      />

      <canvas
        ref={canvas}
        aria-hidden="true"
        className="pointer-events-none absolute"
        style={{ inset: 0, height: size, width: size }}
      />

      {/* the rim, and the shading that turns a lit circle into a lit ball */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute rounded-full"
        style={{ inset: 4, border: '1px solid rgba(190,182,250,0.34)' }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute rounded-full"
        style={{
          inset: 4,
          background:
            'linear-gradient(128deg, rgba(255,255,255,0.05) 0%, transparent 38%, rgba(8,2,26,0.6) 100%)'
        }}
      />

      {/* the near side of every path, and the satellites, both in front */}
      {ORBITS.map((orbit) => (
        <Path key={`front-${orbit.roll}`} orbit={orbit} half="front" />
      ))}
      {ORBITS.map((orbit) => (
        <Satellites key={`sat-${orbit.roll}`} orbit={orbit} size={size} />
      ))}
    </div>
  );
}
