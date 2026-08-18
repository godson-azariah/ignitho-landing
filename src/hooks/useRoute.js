/* Reads and updates the address bar, so /faq and /suites/… are real addresses
   you can bookmark, share or reload.

   Back and forward are the browser's job. It also restores your scroll
   position, which is why the on-page "back to home" buttons could go: a drawn
   button always returns to the same place, while back returns you to wherever
   you actually came from. */

import { useCallback, useEffect, useState } from 'react';

/* Real URLs and real history, without a router.

   `/`                    the home page
   `/faq`                 the questions page
   `/suites/<id>`         one suite

   WHY NOT `react-router`. It is the right answer when routes nest, when they
   carry loaders, or when there are enough of them that a table beats a
   conditional. There are three here, none nested, and the whole mechanism is
   `pushState`, `popstate` and a regex — about thirty lines against a dependency
   that is larger than every icon on the page put together. If a fourth shape
   arrives with children, this stops being the right call.

   THE suite ids were already slugs — `data-engineering`, `supply-chain`, `bfsi`
   — so the URL needs no encoding layer and no lookup table. That is luck rather
   than planning, but it is the difference between this being thirty lines and
   being a hundred.

   `readRoute` is exported because the SSR probe and any future prerender need to
   resolve a path without a hook, and because it is the only place that knows
   what a URL means. It answers `index` when there is no `window`, which is the
   only honest answer off a browser. */

const INDEX = { name: 'index', id: null };

export function readRoute() {
  if (typeof window === 'undefined') return INDEX;
  const path = window.location.pathname.replace(/\/+$/, '');
  if (path === '/faq') return { name: 'faq', id: null };
  const suite = path.match(/^\/suites\/([a-z0-9-]+)$/i);
  if (suite) return { name: 'suite', id: suite[1] };
  return INDEX;
}

export function useRoute() {
  const [route, setRoute] = useState(readRoute);

  /* `popstate` is the back and forward buttons, and it is the entire reason
     this exists — the pages were a `useState` before, so the browser had no
     record of them and back left the site. */
  useEffect(() => {
    const onPop = () => setRoute(readRoute());
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  /* Pushing the SAME path is deliberately a no-op. Without the guard, pressing
     a link to the page you are already on stacks a duplicate entry, and the
     back button then appears to do nothing once for every time it was pressed. */
  const navigate = useCallback((path) => {
    if (typeof window === 'undefined' || window.location.pathname === path) return;
    window.history.pushState(null, '', path);
    setRoute(readRoute());
  }, []);

  return [route, navigate];
}
