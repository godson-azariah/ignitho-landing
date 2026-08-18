/* ==========================================================================
   PLAIN-ENGLISH GUIDE  ·  THE FADE-IN AS YOU SCROLL

   WHERE YOU SEE THIS
     Everywhere. Almost every block on the site is wrapped in this,
     which is why things ease upwards into place as you scroll to them.

   WHAT IS IN HERE
     · It watches for its content coming into view, then fades and lifts
       it in.
     · It happens ONCE — scrolling back up does not replay it.
     · A delay can be passed in, which is how rows of cards arrive one
       after another instead of all together.

   WORTH KNOWING
     Some blocks — the hero and the section headings — also blur into
     focus. That is the same mechanism with one extra class on it.
   ========================================================================== */

import { useEffect, useRef, useState } from 'react';
import { observeReveal } from '../../lib/revealObserver.js';

/* Fades and lifts its children in as they arrive. `as` lets it stand in for
   whatever element the layout needs, so wrapping something in a reveal never
   costs an extra div. */
export function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
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
