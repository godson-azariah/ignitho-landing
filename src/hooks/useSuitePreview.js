/* The preview card that trails your pointer down the suite list, and the lit
   row underneath it.

   It follows the pointer's real position rather than plain hover, because the
   browser does not re-check hover while the page scrolls under a still mouse,
   and the card would stick to whichever row you were over before. It keeps
   clear of the number on the left and the text on the right, and flips sides
   near the edge of the screen. On touch screens it never appears. */

import { useCallback, useEffect, useRef, useState } from 'react';

/* Dead zones: the number gutter on the left, the impact text and arrow on the
   right. The card gets out of the way so those stay readable. */
const EDGE_L = 84;
const EDGE_R = 132;
export const PEEK_W = 300;
export const PEEK_H = 292;

/* The hover-preview that trails the pointer down the suite list, and the lit
   state of the row under it.

   Two things make this harder than a `:hover` rule, and both come from the same
   place — the page can move under a cursor that has not.

   1. The card is positioned inside the list, so scrolling carries it away from
      a stationary pointer. Anything stored relative to the list is stale the
      instant the page scrolls; visible part of the screen coordinates are the only frame of
      reference that survives it.
   2. The browser does not re-run `:hover` while the page scrolls beneath a
      still cursor — Firefox not at all, Chrome with a delay. So which row is
      lit has to be hit-tested from the pointer rather than taken from
      `mouseenter`, or the fill stays behind on the row you have left.

   Everything below is therefore derived from one pointer position plus a fresh
   measurement, by a single function that both the move and the scroll handler
   call — so the two can never disagree. */
export function useSuitePreview(suites) {
  const listRef = useRef(null);
  const previewRef = useRef(null);
  const activeRow = useRef(null);
  const pointer = useRef(null);

  const [previewSuite, setPreviewSuite] = useState(null);
  const [previewOn, setPreviewOn] = useState(false);
  const [hoverId, setHoverId] = useState(null);

  const aim = useRef({ x: 0, y: 0 });
  const at = useRef({ x: 0, y: 0 });
  const settled = useRef(false);

  /* `suites` changes with the filter; a ref keeps `syncPeek` stable so the
     window listeners are not torn down and rebound on every keystroke. */
  const suitesRef = useRef(suites);
  suitesRef.current = suites;

  const syncPeek = useCallback(() => {
    const list = listRef.current;
    const p = pointer.current;
    if (!list || !p) return;
    const box = list.getBoundingClientRect();

    /* Cheap bounds test first — this runs on every mouse move anywhere on the
       page, and there is no reason to hit-test the document unless the pointer
       is actually over the list. */
    const inside = p.x >= box.left && p.x <= box.right && p.y >= box.top && p.y <= box.bottom;

    /* The card is pointer-events:none, so this can never find the card instead
       of the row underneath it. */
    let row = null;
    if (inside) {
      const hit = document.elementFromPoint(p.x, p.y);
      row = hit?.closest?.('[data-suite-id]') || null;
    }

    /* Direction-aware fill, set once per change of row — the leaving row
       retracts toward the edge the pointer left by, the arriving one grows from
       the edge it came in by. Setting it every frame would swing the origin
       mid-transition. */
    if (row !== activeRow.current) {
      for (const el of [activeRow.current, row]) {
        if (!el) continue;
        const r = el.getBoundingClientRect();
        el.style.setProperty('--fill-origin', p.y < r.top + r.height / 2 ? 'top' : 'bottom');
      }
      activeRow.current = row;
      setHoverId(row ? row.getAttribute('data-suite-id') : null);
    }

    if (!row) {
      setPreviewOn(false);
      return;
    }

    aim.current = { x: p.x - box.left, y: p.y - box.top };
    if (!settled.current) {
      at.current = { ...aim.current };
      settled.current = true;
    }

    // same object identity each time, so React bails out on a no-op set
    const suite = suitesRef.current.find((s) => s.id === row.getAttribute('data-suite-id'));
    if (suite) setPreviewSuite(suite);

    setPreviewOn(aim.current.x > EDGE_L && aim.current.x < box.width - EDGE_R);
  }, []);

  /* Tracked on the window, not on the list. Bound to the list, the pointer was
     unknown until you moved it *inside* the list — so scrolling the section up
     under a cursor already sitting over a row did nothing until you jiggled the
     mouse. Both events share one rAF gate, so this costs one derivation per
     frame at most. */
  useEffect(() => {
    let ticking = false;
    const schedule = () => {
      if (ticking || !pointer.current) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        syncPeek();
      });
    };
    const onMove = (e) => {
      pointer.current = { x: e.clientX, y: e.clientY };
      schedule();
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('scroll', schedule, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('scroll', schedule);
    };
  }, [syncPeek]);

  /* The card eases toward the pointer rather than snapping to it. Written
     straight to the node — putting a position into state would re-render the
     whole list sixty times a second. */
  useEffect(() => {
    if (!previewOn) {
      settled.current = false;
      return undefined;
    }
    let raf = 0;
    const loop = () => {
      at.current.x += (aim.current.x - at.current.x) * 0.13;
      at.current.y += (aim.current.y - at.current.y) * 0.13;
      const el = previewRef.current;
      const box = listRef.current;
      if (el && box) {
        const max = Math.max(box.clientWidth - PEEK_W, 0);
        const x = Math.min(Math.max(at.current.x - PEEK_W / 2, 0), max);
        const y = at.current.y - PEEK_H / 2;
        el.style.transform = `translate3d(${Math.round(x)}px, ${Math.round(y)}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [previewOn]);

  return { listRef, previewRef, previewSuite, previewOn, hoverId, setPreviewOn };
}
