/* ==========================================================================
   PLAIN-ENGLISH GUIDE  ·  THE TABLE OF CONTENTS FOR THE WHOLE SITE

   WHERE YOU SEE THIS
     Everything. This file says which sections exist and in what order.

   WHAT IS IN HERE
     · The running order of the home page: hero, the four outcome cards,
       the savings calculator, the nine suites, the four steps, the
       ready-when-you-are card, the dark closing section with the map,
       then the footer.
     · Which PAGE you are looking at — the home page, one suite page, or
       the questions page — and the web address, so the browser back
       button works.
     · The nav bar, the phone menu, the chat bubble and the Contact
       Sales form, which are on every page because they live here.

   WORTH KNOWING
     To move a section up or down the home page, or to remove one, this
     is the only file you need.
   ========================================================================== */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { ChatWidget } from './components/overlays/ChatWidget.jsx';
import { ContactDialog } from './components/overlays/ContactDialog.jsx';
import { Masthead } from './components/chrome/Masthead.jsx';
import { MenuSheet } from './components/chrome/MenuSheet.jsx';
import { Catalog } from './sections/Catalog.jsx';
import { ClosingCta } from './sections/ClosingCta.jsx';
import { Colophon } from './sections/Colophon.jsx';
import { Dossier } from './sections/Dossier.jsx';
import { Faq } from './sections/Faq.jsx';
import { Hero } from './sections/Hero.jsx';
import { HowItWorks } from './sections/HowItWorks.jsx';
import { Pillars } from './sections/Pillars.jsx';
import { ReadyCta } from './sections/ReadyCta.jsx';
import { RoiCalculator } from './sections/RoiCalculator.jsx';
import { SUITES } from './data/suites.js';
import { scrollEase } from './lib/scrollEase.js';
import { useRoute } from './hooks/useRoute.js';
import { useScrollSpy } from './hooks/useScrollSpy.js';

/* Which section each destination scrolls to. Every id here is the `id` on a
   real section element; "Overview" is deliberately absent because it means
   "back to the index", not "scroll somewhere". */
const NAV_TARGETS = {
  'ROI Calculator': 'roi-calculator',
  '9 Core Suites': 'suites-catalog',
  'How It Works': 'how-it-works'
};

/* Both derived from the table above rather than written out again, so a
   destination can never be scroll-spied under one name and navigated to under
   another. Module-level because `SPY_IDS` is a hook dependency: rebuilt on each
   render it would tear the observer down and recreate it on each render too. */
const SPY_IDS = Object.values(NAV_TARGETS);
const NAV_BY_ID = Object.fromEntries(Object.entries(NAV_TARGETS).map(([k, v]) => [v, k]));

/* The shell.

   Everything left here is genuinely shared: which suite is open (the page is
   either the index or one dossier), whether the menu is showing, and the three
   ways of moving between them. Every other piece of state lives in the section
   that uses it — the employee count in the calculator, the filters in the
   catalog, the conversation in the chat widget — which is why dragging a
   slider no longer re-renders the whole site. */
export default function App() {
  /* THE PAGES ARE URLS NOW, NOT BOOLEANS.

     They were `activeSuiteId` and `faqOpen`, which the browser knew nothing
     about — so back left the site entirely from a suite page, a suite could not
     be linked to or reloaded, and every one of them shared the index's title.
     `useRoute` puts them in `history` where they belong, and the back button
     becomes the way out, which is why the on-page ones could be removed. */
  const [route, rawNavigate] = useRoute();
  const [menuOpen, setMenuOpen] = useState(false);

  /* The catalogue's search term. It is up here because two sections need it —
     the hero field that sets it and the catalogue that filters on it — and
     nowhere lower is an ancestor of both. It changes on submit only, never
     per keystroke: the hero holds what you are typing until you commit it. */
  const [searchQuery, setSearchQuery] = useState('');

  /* WHAT TO DO ABOUT SCROLL AFTER A ROUTE CHANGE, and `null` is a real answer.

     A push is ours, so we place the reader: at the top of the new page, or at
     the section they asked for. A POP is the browser's, and the browser already
     restores the scroll position the reader left — so on `popstate` this stays
     null and we keep our hands off it. Going back from a suite page lands you
     where you were in the catalogue, which is the entire point of using real
     history rather than imitating it. */
  const pendingScroll = useRef(null);

  const navigate = useCallback(
    (path, anchor = 'top') => {
      pendingScroll.current = anchor;
      rawNavigate(path);
    },
    [rawNavigate]
  );

  /* An unknown slug resolves to nothing and the shell falls through to the
     index — a typed URL cannot produce a blank page. */
  const activeSuite = useMemo(
    () => (route.name === 'suite' ? SUITES.find((s) => s.id === route.id) || null : null),
    [route]
  );
  const onIndex = route.name === 'index' || (route.name === 'suite' && !activeSuite);

  /* The contact dialog is the one thing here that is still NOT a page: it covers
     the index rather than replacing it, so it has no URL and the back button
     should not close it. */
  const [contactOpen, setContactOpen] = useState(false);
  const openContact = useCallback(() => setContactOpen(true), []);
  const closeContact = useCallback(() => setContactOpen(false), []);

  const goHome = useCallback(() => navigate('/'), [navigate]);
  const openSuite = useCallback((id) => navigate(`/suites/${id}`), [navigate]);
  const openFaq = useCallback(() => navigate('/faq'), [navigate]);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const openMenu = useCallback(() => setMenuOpen(true), []);

  /* From the index a destination is a scroll; from anywhere else it is a
     navigation that carries the destination with it, because the target section
     is not mounted until the index is back. */
  const goTo = useCallback(
    (id) => {
      if (onIndex) document.getElementById(id)?.scrollIntoView({ behavior: scrollEase() });
      else navigate('/', id);
    },
    [onIndex, navigate]
  );

  /* Run a search from the hero: set the term, then go to the results. Routed
     through `goTo` rather than a direct scroll so it still behaves if it is
     ever called while a dossier is open. */
  /* THE SCROLL IS CONDITIONAL ON THERE BEING SOMETHING TO SCROLL TO.

     Clearing the hero's field now commits an empty search — that is how one
     clear can undo both ends of it — and an empty search must not then drag the
     reader down to the catalogue. Nothing has been asked for, so there is
     nothing to go and look at. A non-empty search still scrolls, which is the
     behaviour the field was built for. */
  const searchFor = useCallback(
    (q) => {
      setSearchQuery(q);
      if (q) goTo('suites-catalog');
    },
    [goTo]
  );

  /* A LOOKUP RATHER THAN A TERNARY CHAIN, and the change is not cosmetic.

     The old form ended in a fallback that sent anything unrecognised to the
     catalogue, so adding "How It Works" to `NAV_LINKS` would have silently
     scrolled to the wrong section — a new destination that looked wired up and
     was not. A table cannot do that: a label either has an id or it does not.

     "FAQ" is the exception now that "Overview" has gone: it is not a scroll at
     all but a page, so it is handled before the table is consulted rather than
     given an id that does not exist. Anything unrecognised still falls back to
     `goHome`, which is a safe answer to a question this component should never
     be asked. */
  const navAction = useCallback(
    (label) => {
      if (label === 'FAQ') return openFaq;
      const id = NAV_TARGETS[label];
      return id ? () => goTo(id) : goHome;
    },
    [goHome, goTo, openFaq]
  );

  /* WHICH DESTINATION TO MARK IN THE NAVBAR, and it comes from two different
     places because the destinations are two different kinds of thing.

     "FAQ" is a page, so it is answered by the URL — flatly true or false, no
     measuring involved. The other three are sections of the index, so they are
     answered by where the reader has scrolled to. One label out, whichever way
     it was arrived at.

     The spy is off everywhere but the index, and not as an optimisation: those
     three sections are not in the DOM on the other pages, so left running it
     would observe nothing and report a stale answer from before the navigation. */
  const spySection = useScrollSpy(SPY_IDS, onIndex);
  const activeNav = route.name === 'faq' ? 'FAQ' : (NAV_BY_ID[spySection] ?? null);

  /* Place the reader after a push, and do nothing after a pop. `route` is a
     fresh object on every change, so this runs for both — and the null is what
     distinguishes them. */
  useEffect(() => {
    const want = pendingScroll.current;
    pendingScroll.current = null;
    if (!want) return;
    if (want === 'top') {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      return;
    }
    document.getElementById(want)?.scrollIntoView({ behavior: scrollEase() });
  }, [route]);

  /* A page with its own URL needs its own title, or every one of them is filed
     under the index's name in history, in bookmarks and in a tab strip. */
  useEffect(() => {
    const base = 'Ignitho AI | Ignitho Technologies';
    document.title =
      route.name === 'faq'
        ? `Questions | ${base}`
        : activeSuite
          ? `${activeSuite.name} | ${base}`
          : base;
  }, [route, activeSuite]);

  return (
    <div className="relative min-h-screen bg-ig-paper font-sans text-ig-text">
      <Masthead
        menuOpen={menuOpen}
        onOpenMenu={openMenu}
        goHome={goHome}
        navAction={navAction}
        openContact={openContact}
        activeNav={activeNav}
      />

      <MenuSheet
        open={menuOpen}
        onClose={closeMenu}
        goHome={goHome}
        navAction={navAction}
        openContact={openContact}
        activeNav={activeNav}
      />

      {/* THREE PAGES, ONE AT A TIME, and the order of the test matters: the FAQ
          is checked first so that reaching it from a suite page shows the FAQ
          rather than the suite it was opened from. `goHome` clears both, so
          nothing can end up with two set at once. */}
      {route.name === 'faq' ? (
        <Faq openContact={openContact} />
      ) : !activeSuite ? (
        <>
          {/* `committed` is the search the CATALOGUE is currently filtered by.
              The hero owns what is being typed; this is what has actually been
              asked for, and the field follows it so the two can never disagree
              about whether a search is in effect. */}
          <Hero onSearch={searchFor} committed={searchQuery} />
          <Pillars />
          <RoiCalculator />
          <Catalog
            openSuite={openSuite}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          {/* After the catalogue and before the closing bookend, which is also
              where the background alternation wants it: the calculator is C,
              the catalogue is B, so this is C and the dark CTA follows. */}
          <HowItWorks />
          {/* The soft prompt between the walkthrough and the dark bookend. B,
              which keeps the alternation running C → B → A into the close. */}
          {/* The card's quiet second destination. `navAction` already knows the
              FAQ is a page rather than a scroll target, so this is the same
              handler the masthead and the menu sheet use — one route change,
              defined once. */}
          <ReadyCta openFaq={navAction('FAQ')} />
        </>
      ) : (
        <Dossier suite={activeSuite} openContact={openContact} />
      )}

      {/* z-[65], above the chat widget at 55 and below the menu sheet at 70 —
          the sheet has to be able to cover it, because the sheet is what opened
          it on a phone. */}
      <ContactDialog open={contactOpen} onClose={closeContact} />

      <ChatWidget />
      <ClosingCta openContact={openContact} />
      <Colophon openSuite={openSuite} navAction={navAction} goHome={goHome} />
    </div>
  );
}
