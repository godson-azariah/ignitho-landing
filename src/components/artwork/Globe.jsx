/* The globe in the workflow section: land as dots on a pale sphere, the
   offices as markers, and arcs drawn between them.

   Drawn on one canvas, in an orthographic projection, so every marker sits
   at its real latitude and longitude (data/globeMarkers.js) and stays pinned
   there as the globe turns. The land is ~4,000 dots precomputed from Natural
   Earth (data/globeDots.js); dots toward the edge of the disc shrink and fade,
   which is what gives the sphere its depth without any shading.

   It is light on purpose, the opposite of the hero: violet-ink dots on a
   pale lavender sphere, thin purple arcs, teal points, no glow.

   Motion: it sways a little east and west over a minute rather than
   spinning, bringing the Americas and India round in turn; it can be dragged, and eases back
   to its sway when let go. The labels are real elements, moved every frame
   to their marker and faded out as it turns away. Nothing runs while the
   section is off screen, and under reduced motion it is drawn once, still. */

import { useEffect, useRef } from 'react';
import { LAND_DOTS } from '../../data/globeDots.js';
import { GLOBE_ARCS, GLOBE_MARKERS } from '../../data/globeMarkers.js';

const RAD = Math.PI / 180;
const TILT = 4 * RAD; // latitude turned to face the viewer
const SWAY_CENTRE = 20 * RAD;
const SWAY = 24 * RAD;
const SWAY_S = 64;
const ARC_S = 7.2;
/* The canvas runs this far past the globe's box on every side (as a share
   of its width), so lifted arcs and the haze are never cut off. */
const BLEED = 0.14;

/* Unit vectors for every land dot, computed once. */
const COUNT = LAND_DOTS.length / 2;
const DX = new Float32Array(COUNT);
const DY = new Float32Array(COUNT);
const DZ = new Float32Array(COUNT);
for (let i = 0; i < COUNT; i += 1) {
  const la = LAND_DOTS[i * 2] * RAD;
  const lo = LAND_DOTS[i * 2 + 1] * RAD;
  DX[i] = Math.cos(la) * Math.sin(lo);
  DY[i] = Math.sin(la);
  DZ[i] = Math.cos(la) * Math.cos(lo);
}

const vec = (lat, lon) => [
  Math.cos(lat * RAD) * Math.sin(lon * RAD),
  Math.sin(lat * RAD),
  Math.cos(lat * RAD) * Math.cos(lon * RAD)
];
const GRID_LON = Array.from({ length: 73 }, (_, i) => -180 + i * 5);
const GRID_LAT = Array.from({ length: 33 }, (_, i) => -80 + i * 5);
const MARKS = GLOBE_MARKERS.map((m) => ({ ...m, v: vec(m.lat, m.lon) }));
const BY_ID = Object.fromEntries(MARKS.map((m) => [m.id, m]));

/* Points along each arc: the great circle between its ends, lifted off the
   surface in the middle by an amount that grows with its length. */
const ARCS = GLOBE_ARCS.map(([a, b]) => {
  const p = BY_ID[a].v;
  const q = BY_ID[b].v;
  const dot = Math.min(1, Math.max(-1, p[0] * q[0] + p[1] * q[1] + p[2] * q[2]));
  const om = Math.acos(dot);
  const lift = 0.03 + om * 0.03;
  const pts = [];
  const N = 64;
  for (let i = 0; i <= N; i += 1) {
    const t = i / N;
    const s = Math.sin(om) || 1;
    const k1 = Math.sin((1 - t) * om) / s;
    const k2 = Math.sin(t * om) / s;
    const h = 1 + lift * Math.sin(Math.PI * t);
    pts.push([(p[0] * k1 + q[0] * k2) * h, (p[1] * k1 + q[1] * k2) * h, (p[2] * k1 + q[2] * k2) * h]);
  }
  return pts;
});

const reducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true;

export function Globe() {
  const wrap = useRef(null);
  const canvas = useRef(null);
  const labels = useRef([]);

  useEffect(() => {
    const box = wrap.current;
    const cv = canvas.current;
    if (!box || !cv) return undefined;
    const ctx = cv.getContext('2d');
    const still = reducedMotion();

    let size = 0;
    let dpr = 1;
    let frame = 0;
    let visible = true;
    const start = performance.now();

    /* Drag: an offset on top of the sway, which eases home when released. */
    const drag = { on: false, x: 0, y: 0, lon: 0, lat: 0, vLon: 0 };

    const fit = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      size = box.clientWidth;
      const full = size * (1 + BLEED * 2);
      cv.width = Math.round(full * dpr);
      cv.height = Math.round(full * dpr);
      cv.style.width = `${full}px`;
      cv.style.height = `${full}px`;
      cv.style.left = cv.style.top = `${-size * BLEED}px`;
    };

    const draw = (now) => {
      /* nothing to draw until the box has a size */
      if (size < 40) return;
      const t = (now - start) / 1000;
      const R = size * 0.46;
      const off = size * BLEED;
      const cx = off + size / 2;
      const cy = off + size / 2;

      if (!drag.on) {
        drag.lon += drag.vLon;
        drag.vLon *= 0.94;
        drag.lon *= 0.985;
        drag.lat *= 0.96;
      }
      const lon0 = SWAY_CENTRE + (still ? 0 : SWAY * Math.sin((t / SWAY_S) * Math.PI * 2)) + drag.lon;
      const lat0 = TILT + drag.lat;
      const ca = Math.cos(-lon0);
      const sa = Math.sin(-lon0);
      const cb = Math.cos(lat0);
      const sb = Math.sin(lat0);
      const turn = (x, y, z) => {
        const x1 = x * ca + z * sa;
        const z1 = -x * sa + z * ca;
        return [x1, y * cb - z1 * sb, y * sb + z1 * cb];
      };

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, size + off * 2, size + off * 2);

      /* The atmosphere: a thin lavender haze just outside the sphere. */
      const halo = ctx.createRadialGradient(cx, cy, R * 0.96, cx, cy, R * 1.12);
      halo.addColorStop(0, 'rgba(143, 111, 232, 0.28)');
      halo.addColorStop(0.35, 'rgba(143, 111, 232, 0.1)');
      halo.addColorStop(1, 'rgba(143, 111, 232, 0)');
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.12, 0, Math.PI * 2);
      ctx.fillStyle = halo;
      ctx.fill();

      /* The sphere: white, a faint lavender toward its edge, a hairline. */
      const g = ctx.createRadialGradient(cx - R * 0.35, cy - R * 0.4, R * 0.1, cx, cy, R);
      g.addColorStop(0, '#f6f2fe');
      g.addColorStop(0.65, '#e6ddf8');
      g.addColorStop(1, '#d2c4f0');
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = g;
      ctx.fill();
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(44, 10, 120, 0.14)';
      ctx.stroke();

      /* The graticule: lines of latitude and longitude every 20 degrees,
         near side only, faint enough to read as structure, not pattern. */
      ctx.beginPath();
      const line = (pts) => {
        let on = false;
        for (const [la, lo] of pts) {
          const [x, y, z] = turn(...vec(la, lo));
          if (z > 0) {
            if (on) ctx.lineTo(cx + x * R, cy - y * R);
            else ctx.moveTo(cx + x * R, cy - y * R);
            on = true;
          } else on = false;
        }
      };
      for (let la = -60; la <= 60; la += 20) line(GRID_LON.map((lo) => [la, lo]));
      for (let lo = -180; lo < 180; lo += 20) line(GRID_LAT.map((la) => [la, lo]));
      ctx.strokeStyle = 'rgba(44, 10, 120, 0.09)';
      ctx.lineWidth = 1;
      ctx.stroke();

      /* Rim light: the lit edge on the upper left. */
      const rim = ctx.createLinearGradient(cx - R, cy - R, cx + R, cy + R);
      rim.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
      rim.addColorStop(0.5, 'rgba(214, 205, 238, 0.35)');
      rim.addColorStop(1, 'rgba(143, 111, 232, 0.5)');
      ctx.beginPath();
      ctx.arc(cx, cy, R - 0.75, 0, Math.PI * 2);
      ctx.strokeStyle = rim;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      /* Land: bucketed by depth so each bucket is one path and one fill. */
      const BUCKETS = 6;
      const paths = Array.from({ length: BUCKETS }, () => new Path2D());
      const dot = Math.max(0.9, R / 380);
      for (let i = 0; i < COUNT; i += 1) {
        const [x, y, z] = turn(DX[i], DY[i], DZ[i]);
        if (z <= 0.02) continue;
        const b = Math.min(BUCKETS - 1, Math.floor(z * BUCKETS));
        const px = cx + x * R;
        const py = cy - y * R;
        const r = dot * (0.55 + z * 0.75);
        paths[b].moveTo(px + r, py);
        paths[b].arc(px, py, r, 0, Math.PI * 2);
      }
      for (let b = 0; b < BUCKETS; b += 1) {
        ctx.fillStyle = `rgba(44, 10, 120, ${(0.16 + (b / (BUCKETS - 1)) * 0.5).toFixed(3)})`;
        ctx.fill(paths[b]);
      }

      /* Arcs: each draws in, holds, and fades, one after another. */
      ctx.lineCap = 'round';
      ARCS.forEach((pts, n) => {
        const phase = still ? 0.5 : (((t + n * (ARC_S / ARCS.length)) % ARC_S) / ARC_S);
        const grow = Math.min(phase / 0.4, 1);
        const ease = 1 - Math.pow(1 - grow, 3);
        const fade = phase > 0.75 ? (1 - phase) / 0.25 : 1;
        const upto = Math.max(1, Math.floor(ease * (pts.length - 1)));
        ctx.beginPath();
        let drawing = false;
        let head = null;
        for (let i = 0; i <= upto; i += 1) {
          const [x, y, z] = turn(...pts[i]);
          const px = cx + x * R;
          const py = cy - y * R;
          const seen = z > 0 || x * x + y * y > 1;
          if (seen) {
            if (drawing) ctx.lineTo(px, py);
            else ctx.moveTo(px, py);
            drawing = true;
            head = [px, py];
          } else {
            drawing = false;
            head = null;
          }
        }
        ctx.strokeStyle = `rgba(122, 0, 194, ${(0.6 * fade).toFixed(3)})`;
        ctx.lineWidth = Math.max(1.4, R / 260);
        ctx.stroke();
        if (head && grow < 1) {
          ctx.beginPath();
          ctx.arc(head[0], head[1], Math.max(2.5, R / 150), 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(122, 0, 194, 0.9)';
          ctx.fill();
        }
      });

      /* Markers, and their labels moved to them. */
      MARKS.forEach((m, i) => {
        const [x, y, z] = turn(...m.v);
        const px = cx + x * R;
        const py = cy - y * R;
        const face = Math.max(0, Math.min(1, (z - 0.05) / 0.25));
        if (z > 0) {
          const pulse = still ? 0.5 : ((t * 0.6 + i * 0.37) % 1);
          const s = Math.max(3, R / 110);
          ctx.beginPath();
          ctx.arc(px, py, s + pulse * s * 3, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(0, 162, 116, ${((1 - pulse) * 0.5 * face).toFixed(3)})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(px, py, s, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 162, 116, ${face.toFixed(3)})`;
          ctx.fill();
          ctx.lineWidth = 2;
          ctx.strokeStyle = `rgba(255, 255, 255, ${face.toFixed(3)})`;
          ctx.stroke();
        }
        const el = labels.current[i];
        if (el) {
          el.style.transform = `translate3d(${(px - off).toFixed(1)}px, ${(py - off).toFixed(1)}px, 0)`;
          el.style.opacity = face.toFixed(3);
        }
      });
    };

    const loop = (now) => {
      draw(now);
      frame = visible && !still ? requestAnimationFrame(loop) : 0;
    };

    fit();
    draw(performance.now());
    const ro = new ResizeObserver(() => {
      fit();
      draw(performance.now());
    });
    ro.observe(box);

    let io;
    if (!still) {
      io = new IntersectionObserver(([e]) => {
        visible = e.isIntersecting;
        if (visible && !frame) frame = requestAnimationFrame(loop);
      });
      io.observe(box);
    }

    const down = (e) => {
      drag.on = true;
      drag.x = e.clientX;
      drag.y = e.clientY;
      drag.vLon = 0;
      cv.setPointerCapture?.(e.pointerId);
    };
    const move = (e) => {
      if (!drag.on) return;
      const k = Math.PI / size;
      /* the centre longitude moves against the pointer, so the surface
         follows it: drag right and the land moves right */
      const dLon = -(e.clientX - drag.x) * k;
      drag.lon += dLon;
      drag.lat = Math.max(-0.5, Math.min(0.5, drag.lat + (e.clientY - drag.y) * k));
      drag.vLon = dLon;
      drag.x = e.clientX;
      drag.y = e.clientY;
      if (still) draw(performance.now());
    };
    const up = () => {
      drag.on = false;
    };
    cv.addEventListener('pointerdown', down);
    cv.addEventListener('pointermove', move);
    cv.addEventListener('pointerup', up);
    cv.addEventListener('pointercancel', up);

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      io?.disconnect();
      cv.removeEventListener('pointerdown', down);
      cv.removeEventListener('pointermove', move);
      cv.removeEventListener('pointerup', up);
      cv.removeEventListener('pointercancel', up);
    };
  }, []);

  return (
    <div ref={wrap} className="globe" aria-hidden="true">
      <canvas ref={canvas} className="globe-canvas" />
      {MARKS.map((m, i) =>
        m.quiet ? (
          <span key={m.id} ref={() => (labels.current[i] = null)} hidden />
        ) : (
          <span key={m.id} ref={(el) => (labels.current[i] = el)} className="globe-label">
            <b>{m.name}</b>
            <span>{m.region}</span>
          </span>
        )
      )}
    </div>
  );
}
