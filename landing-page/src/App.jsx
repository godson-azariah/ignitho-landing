import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { ChatWidget } from './components/ChatWidget.jsx';
import { Masthead } from './components/Masthead.jsx';
import { MenuSheet } from './components/MenuSheet.jsx';
import { Catalog } from './sections/Catalog.jsx';
import { ClosingCta } from './sections/ClosingCta.jsx';
import { Colophon } from './sections/Colophon.jsx';
import { Dossier } from './sections/Dossier.jsx';
import { Hero } from './sections/Hero.jsx';
import { Pillars } from './sections/Pillars.jsx';
import { RoiCalculator } from './sections/RoiCalculator.jsx';
import { SUITES } from './data/suites.js';
import { scrollEase } from './lib/scrollEase.js';

/* The shell.

   Everything left here is genuinely shared: which suite is open (the page is
   either the index or one dossier), whether the menu is showing, and the three
   ways of moving between them. Every other piece of state lives in the section
   that uses it — the employee count in the calculator, the filters in the
   catalog, the conversation in the chat widget — which is why dragging a
   slider no longer re-renders the whole site. */
export default function App() {
  const [activeSuiteId, setActiveSuiteId] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  /* Set when a jump is requested from a dossier: the target does not exist yet,
     so we return to the index first and scroll once it has mounted. */
  const pendingAnchor = useRef(null);

  const activeSuite = useMemo(
    () => SUITES.find((s) => s.id === activeSuiteId) || null,
    [activeSuiteId]
  );

  const goHome = useCallback(() => setActiveSuiteId(null), []);
  const openSuite = useCallback((id) => setActiveSuiteId(id), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const openMenu = useCallback(() => setMenuOpen(true), []);

  const goTo = useCallback(
    (id) => {
      if (activeSuiteId) {
        pendingAnchor.current = id;
        setActiveSuiteId(null);
      } else {
        document.getElementById(id)?.scrollIntoView({ behavior: scrollEase() });
      }
    },
    [activeSuiteId]
  );

  const navAction = useCallback(
    (label) =>
      label === 'Overview'
        ? goHome
        : label === 'ROI Calculator'
          ? () => goTo('roi-calculator')
          : () => goTo('suites-catalog'),
    [goHome, goTo]
  );

  /* Changing page starts at the top, unless a jump was queued on the way out. */
  useEffect(() => {
    const anchor = pendingAnchor.current;
    pendingAnchor.current = null;
    if (anchor) {
      const el = document.getElementById(anchor);
      if (el) {
        el.scrollIntoView({ behavior: scrollEase() });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [activeSuiteId]);

  return (
    <div className="relative min-h-screen bg-ig-paper font-sans text-ig-text">
      <Masthead
        menuOpen={menuOpen}
        onOpenMenu={openMenu}
        goHome={goHome}
        navAction={navAction}
      />

      <MenuSheet open={menuOpen} onClose={closeMenu} goHome={goHome} navAction={navAction} />

      {!activeSuite ? (
        <>
          <Hero goTo={goTo} />
          <Pillars />
          <RoiCalculator />
          <Catalog openSuite={openSuite} />
        </>
      ) : (
        <Dossier suite={activeSuite} goHome={goHome} />
      )}

      <ChatWidget />
      <ClosingCta />
      <Colophon openSuite={openSuite} navAction={navAction} goHome={goHome} />
    </div>
  );
}
