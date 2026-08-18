/* ==========================================================================
   PLAIN-ENGLISH GUIDE  ·  THE PARTS EVERY ILLUSTRATED WINDOW IS BUILT FROM

   WHERE YOU SEE THIS
     Inside the product windows beside "Four steps, days not months".

   WHAT IS IN HERE
     · The white window itself: its rounded corners, hairline and three-layer shadow.
     · The title bar with its three grey dots, the toolbar strip, the small square buttons, and the status bar along the bottom.
     · The type sizes used for labels, values and micro-captions, so all four panels speak with one voice.

   WORTH KNOWING
     Nothing here is a real control. It is a drawing of an interface, and every part of it is shared so the four panels cannot drift apart.
   ========================================================================== */

import {  } from './tokens.js';

/* Window chrome. Three dots in neutral ink rather than red/amber/green —
   traffic lights would import a palette this page does not own, and the shape
   alone already says "window". The right slot is where a real title bar keeps
   live state. */
export function Bar({ title, right }) {
  return (
    <span className={`flex items-center gap-2 border-b ${RULE} px-3.5 py-2.5`}>
      <span className="flex shrink-0 gap-[5px]">
        {[0, 1, 2].map((i) => (
          <span key={i} className="h-[7px] w-[7px] rounded-full bg-ig-ink/[0.17]" />
        ))}
      </span>
      <span className={`ml-1 min-w-0 flex-1 truncate ${LABEL}`}>{title}</span>
      {right}
    </span>
  );
}

/* The control strip. Its own row, its own hairline — which is exactly what
   makes it read as a toolbar rather than as the first line of content. */
export function Tool({ children }) {
  return (
    <span className={`flex items-center gap-2 border-b ${RULE} px-3 py-2`}>{children}</span>
  );
}

/* A square icon button, in the two states a toolbar always has one of. */
export function Btn({ icon: Icon, on = false }) {
  return (
    <span
      className={`grid h-5 w-5 shrink-0 place-items-center rounded-[6px] ${
        on ? 'bg-ig-purple/[0.12] text-ig-purple' : 'text-ig-divider'
      }`}
    >
      <Icon className="h-2.5 w-2.5" strokeWidth={2.6} />
    </span>
  );
}

/* The status bar. Count left, context right, over a hairline. */
export function Foot({ left, right, delay }) {
  return (
    <span
      className={`mg mt-2.5 flex items-center justify-between border-t ${RULE} pt-2`}
      style={at(delay)}
    >
      <span className={LABEL}>{left}</span>
      {right}
    </span>
  );
}

/* 01 — THE CATALOGUE, as a table view: toolbar with a search field and the real
   grid/list switch, segmented filters, column headers, three data rows and a
   status bar. Rows and labels come out of `suites.js` and `navigation.js`, so
   the window cannot drift away from the catalogue it illustrates. */
