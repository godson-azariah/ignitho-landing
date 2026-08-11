import { useEffect, useRef, useState } from 'react';
import { observeReveal } from '../lib/revealObserver.js';

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
