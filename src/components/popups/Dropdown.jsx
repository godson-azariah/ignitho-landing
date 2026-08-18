/* The country and industry pickers. Built by hand rather than using the
   browser's own, because the browser decides for itself whether its list opens
   up or down, and it kept choosing up.

   Long lists can be typed into. Matches that start with what you typed come
   first, which is what makes "united" find United Kingdom before Réunion. */

import { useEffect, useMemo, useRef, useState } from 'react';
import { Check, ChevronDown, Search } from 'lucide-react';
import { FORM_FIELD } from '../../lib/layout.js';

/* A select that opens DOWNWARD, which a native one cannot be made to do.

   Why this exists at all. The browser decides where a native `<select>`'s popup
   goes, and it decides on room: with 199 countries the popup is 400-500px tall,
   so a field sitting in the lower half of a centred dialog has nowhere near that
   below it and the popup flips up. That placement is done by the platform, not
   the page — there is no CSS property, no attribute and no ordering trick that
   reaches it. Controlling the direction means owning the list.

   Three things come free once you do:
     · IT matches THE form. A native popup is drawn by the OS, so on Windows the
       one control on this form that was not in our palette was the one asking
       for a country.
     · IT can be filtered. Nineteen-nine options is a scroll of about ten screens;
       typing "ind" is the difference between a usable field and a chore. Turned
       on past twelve options, off below, so Industry gets a plain list.
     · Prefix matches sort first. Typing "un" should reach United Kingdom before
       Brunei, which a plain `includes` filter gets backwards.

   What IT costs, stated plainly: on a phone a native select hands you the OS
   picker — a big, familiar, thumb-friendly wheel — and this does not. It is a
   real loss and the reason to keep it in mind if the form ever gets more selects.
   The compensation is that the panel is full-width, its rows are 38px, and the
   filter means a country is two taps and three letters rather than a long drag.

   Keyboard is complete: arrows move, Enter picks, Escape closes the LIST rather
   than the dialog, Home/End jump, Tab leaves. */
export function Dropdown({
  id,
  label,
  value,
  onChange,
  options,
  placeholder = 'Select',
  error,
  required = false
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [cursor, setCursor] = useState(-1);

  const rootRef = useRef(null);
  const panelRef = useRef(null);
  const listRef = useRef(null);
  const filterRef = useRef(null);
  const triggerRef = useRef(null);

  const searchable = options.length > 12;

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;
    const starts = [];
    const contains = [];
    for (const o of options) {
      const l = o.toLowerCase();
      if (l.startsWith(q)) starts.push(o);
      else if (l.includes(q)) contains.push(o);
    }
    return [...starts, ...contains];
  }, [options, query]);

  /* Pointerdown rather than click, so the list is already gone by the time a
     press on something else lands on it. With `click` the panel is still open
     while the next control receives its own press, and a select that closes one
     frame late feels like it was fighting you. */
  useEffect(() => {
    if (!open) return undefined;
    const away = (e) => {
      if (!rootRef.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener('pointerdown', away);
    return () => document.removeEventListener('pointerdown', away);
  }, [open]);

  /* On open: put the cursor on what is already chosen, focus the filter if there
     is one, and pull the panel into view.

     That last part IS NOT cosmetic. This lives inside the dialog's
     `overflow-y-auto` form column, which clips anything that reaches its bottom
     edge — so a panel that opens downward from a field near the foot of the form
     would be half invisible. `block: 'nearest'` scrolls the nearest scrollable
     ancestor by the minimum needed and leaves the page alone. */
  useEffect(() => {
    if (!open) return;
    setCursor(Math.max(0, shown.indexOf(value)));
    if (searchable) filterRef.current?.focus();
    panelRef.current?.scrollIntoView({ block: 'nearest' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  /* Keep the highlighted row on screen as the arrows move through 199 of them. */
  useEffect(() => {
    if (!open || cursor < 0) return;
    listRef.current?.children[cursor]?.scrollIntoView({ block: 'nearest' });
  }, [cursor, open]);

  const commit = (option) => {
    onChange({ target: { value: option } });
    setOpen(false);
    setQuery('');
    triggerRef.current?.focus();
  };

  const onKeyDown = (e) => {
    /* Escape closes THE list, NOT THE dialog. `useOverlay` listens for Escape on
       `window`, and React dispatches from its root container, so the native event
       would carry on up and shut the whole form while the reader only wanted to
       abandon a dropdown. React's `stopPropagation` calls the native one too,
       which is what keeps it here. */
    if (e.key === 'Escape' && open) {
      e.stopPropagation();
      setOpen(false);
      setQuery('');
      triggerRef.current?.focus();
      return;
    }
    if (e.key === 'Tab') {
      setOpen(false);
      return;
    }
    if (!open && (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      setOpen(true);
      return;
    }
    if (!open) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setCursor((c) => Math.min(shown.length - 1, c + 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setCursor((c) => Math.max(0, c - 1));
    } else if (e.key === 'Home') {
      e.preventDefault();
      setCursor(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setCursor(shown.length - 1);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (shown[cursor]) commit(shown[cursor]);
    }
  };

  return (
    <span className="relative block" ref={rootRef} onKeyDown={onKeyDown}>
      <label className="mb-1.5 block text-[11.5px] font-bold tracking-[-0.005em] text-ig-ink" htmlFor={id}>
        {label} {required && <span className="text-ig-purple">*</span>}
      </label>

      <button
        id={id}
        ref={triggerRef}
        type="button"
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={`${id}-list`}
        onClick={() => setOpen((o) => !o)}
        className={`${FORM_FIELD} flex items-center justify-between gap-2 text-left ${
          open ? 'border-ig-purple/45 bg-white' : ''
        }`}
      >
        <span className={`min-w-0 truncate ${value ? 'text-ig-ink' : 'text-ig-muted/55'}`}>
          {value || placeholder}
        </span>
        <ChevronDown
          className={`h-3.5 w-3.5 shrink-0 text-ig-muted transition-transform duration-300 ${
            open ? 'rotate-180' : ''
          }`}
          strokeWidth={2.4}
        />
      </button>

      {/* `top-full` is the entire answer to the question this component exists
          for: the panel is anchored to the bottom of the trigger and has no logic
          that could ever place it anywhere else. */}
      {open && (
        <span
          ref={panelRef}
          className="absolute inset-x-0 top-full z-30 mt-1.5 block overflow-hidden rounded-[10px] border border-ig-ink/12 bg-white shadow-[0_18px_44px_-20px_rgba(22,6,58,0.45)]"
        >
          {searchable && (
            <span className="flex items-center gap-2 border-b border-ig-ink/10 px-3 py-2">
              <Search className="h-3 w-3 shrink-0 text-ig-purple" strokeWidth={2.6} />
              <input
                ref={filterRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setCursor(0);
                }}
                placeholder="Type to filter"
                aria-label={`Filter ${label.toLowerCase()}`}
                className="min-w-0 flex-1 bg-transparent text-[12.5px] text-ig-ink outline-none placeholder:text-ig-muted/55"
              />
            </span>
          )}

          <span
            id={`${id}-list`}
            role="listbox"
            ref={listRef}
            className="block max-h-[210px] overflow-y-auto py-1"
          >
            {shown.length === 0 ? (
              <span className="block px-3.5 py-3 font-mono text-[11px] tracking-[0.03em] text-ig-muted">
                No match for “{query}”
              </span>
            ) : (
              shown.map((o, i) => {
                const on = o === value;
                return (
                  <span
                    key={o}
                    role="option"
                    aria-selected={on}
                    /* `onPointerDown` rather than `onClick`: the outside-press
                        listener above also runs on pointerdown, and a click
                        handler would fire after it had already closed the panel
                        and unmounted this row. */
                    onPointerDown={(e) => {
                      e.preventDefault();
                      commit(o);
                    }}
                    onPointerEnter={() => setCursor(i)}
                    className={`flex cursor-pointer items-center justify-between gap-2 px-3.5 py-2 text-[13px] ${
                      on
                        ? 'bg-ig-purple/[0.11] font-bold text-ig-ink'
                        : i === cursor
                          ? 'bg-ig-paper-2 text-ig-ink'
                          : 'text-ig-text'
                    }`}
                  >
                    <span className="min-w-0 truncate">{o}</span>
                    {on && <Check className="h-3 w-3 shrink-0 text-ig-teal" strokeWidth={3} />}
                  </span>
                );
              })
            )}
          </span>
        </span>
      )}

      {error && (
        <span className="mt-1 block font-mono text-[10px] tracking-[0.03em] text-ig-purple">
          {error}
        </span>
      )}
    </span>
  );
}
