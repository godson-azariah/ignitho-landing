/* Wrap anything in this and it fades upwards into view as you scroll to it.
   Once only — scrolling back up does not replay it.

   Pass a delay and a row of cards will arrive one after another instead of all
   at once. Add the reveal-soft class as well and it sharpens from blurred to
   clear; that costs real work on the graphics card, so it is only used on the
   opening band and the section headings. */

import { useEffect, useRef, useState } from 'react';
import { observeReveal } from '../../lib/revealObserver.js';

/* Fades and lifts its children in as they arrive. `as` lets it stand in for
   whatever element the layout needs, so wrapping something in a reveal never
   costs an extra div. */
export function FadeIn({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    return observeReveal(el, () => setSeen(true));
  }, []);

  return (
    <Tag
      ref={ref}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={`reveal ${seen ? 'is-in' : ''} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}
