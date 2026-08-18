/* ==========================================================================
   PLAIN-ENGLISH GUIDE  ·  THE GRID-OR-LIST SWITCH

   WHERE YOU SEE THIS
     To the right of the search box in the nine-suites section.

   WHAT IS IN HERE
     · Two small icons in a white pill. The active one is filled in.
     · Grid shows the nine suites as cards; list shows them as rows.

   WORTH KNOWING
     It keeps one fixed position so it never moves when you switch
     views.
   ========================================================================== */

import { LayoutGrid, List } from 'lucide-react';

/* Grid or list. One fixed home under the search field, so it never moves
   between views. */
export function ViewToggle({ view, setView }) {
  return (
    <div className="flex items-center gap-1 rounded-full bg-white p-1 shadow-[0_10px_28px_-18px_rgba(22,6,58,0.8)]">
      {[
        { id: 'grid', Icon: LayoutGrid },
        { id: 'index', Icon: List }
      ].map(({ id, Icon }) => (
        <button
          key={id}
          onClick={() => setView(id)}
          aria-label={id}
          aria-pressed={view === id}
          className={`grid h-9 w-9 place-items-center rounded-full transition-colors duration-300 ${
            view === id ? 'bg-ig-violet text-white' : 'text-ig-muted hover:text-ig-ink'
          }`}
        >
          <Icon className="h-4 w-4" strokeWidth={2.2} />
        </button>
      ))}
    </div>
  );
}
