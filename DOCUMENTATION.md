# Ignitho AI — the site, explained

Everything in one place: what each file is, what each part does, and why it
works the way it does. Written for someone who knows the website and is opening
the code for the first time.

It is organised the way the [Diátaxis](https://diataxis.fr/) framework suggests,
because a reader is only ever in one of four situations:

| If you want to… | Read |
| --- | --- |
| get it running | **1 · Getting started** |
| find out what a file is | **2 · The map**, then **3 · Every file** |
| make a specific change | **5 · How do I…?** |
| understand why it is like this | **4 · How things work**, **6 · The house rules** |

---

## 1 · Getting started

    npm install      once
    npm run dev      opens the site locally, updates as you save
    npm run build    produces the publishable version in dist/
    npm run lint     checks the code for mistakes

You need Node installed. Nothing else — no database, no server, no accounts. The
site is a set of files a browser reads.

**The whole site is one page.** The suite pages and the questions page are real
web addresses with real back-button behaviour, but they are drawn by the same
running page rather than fetched fresh from a server.

---

## 2 · The map

    index.html            the file the browser asks for first
    package.json          the project's name and its commands
    vite.config.js        build settings
    vercel.json           tells the host to answer every address with index.html
    public/               images served as they are: the world map, the favicon

    src/
      main.jsx            switches the site on — three lines
      App.jsx             the running order of the page, and which page you are on
      index.css           the list of style files, in the order they load

      sections/           ONE FILE PER BAND OF THE PAGE, top to bottom
        Hero.jsx            the dark opening with the headline and search box
        Pillars.jsx         the four violet outcome cards
        RoiCalculator.jsx   the savings slider
        Catalog.jsx         the nine suites, with filters and grid or list
        HowItWorks.jsx      the four steps and their illustration
        ReadyCta.jsx        the white "Ready when you are" card
        ClosingCta.jsx      the dark closing band with the office map
        Colophon.jsx        the footer
        Dossier.jsx         a whole page of its own: one suite
        Faq.jsx             a whole page of its own: the questions

      components/         THE PIECES THOSE BANDS ARE BUILT FROM, grouped by role
        ui/                   used all over the site
          Button.jsx            every button
          Kicker.jsx            the small label above a section heading
          Cross.jsx             the small + marks at section corners
          Reveal.jsx            the fade-in as you scroll
          SuiteCard.jsx         one suite, as a card
          ViewToggle.jsx        the grid-or-list switch
        chrome/               wrapped around every page
          Masthead.jsx          the nav bar
          MenuSheet.jsx         the phone menu
        overlays/             things that open ON TOP of a page
          ContactDialog.jsx     the Contact Sales form
          SelectField.jsx       the country and industry dropdowns
          AgentSimulator.jsx    the Test Agent popup
          ChatWidget.jsx        the Ask Ignitho AI bubble
        stage/                the two big decorative illustrations
          HeroStage.jsx         the moving purple glow behind dark bands
          WalkthroughStage.jsx  the product windows beside the four steps
          walkthrough/
            tokens.js           measurements the four panels share
            chrome.jsx          title bars, toolbars, buttons, status bars
            PickPanel.jsx       step 1 · the catalogue
            TestPanel.jsx       step 2 · a test run
            DeployPanel.jsx     step 3 · going live
            MeasurePanel.jsx    step 4 · the measured return

      hooks/              BEHAVIOUR THAT REACTS TO THE BROWSER
        useRoute.js         the web address and the back button
        useOverlay.js       Escape closes, and the page behind cannot scroll
        useScrollChrome.js  the nav bar's shadow
        useScrollSpy.js     which nav link is highlighted
        useSuitePeek.js     the preview card that follows your pointer

      lib/                PURE HELPERS — give them a value, get a value back
        layout.js           the page width every section shares
        noOrphan.js         stops one word being stranded on its own line
        splitHeading.js     breaks a suite name into two tidy lines
        scrollEase.js       glide or jump, depending on the visitor's settings
        revealObserver.js   the one watcher behind every fade-in

      data/               EVERY WORD AND NUMBER. No layout in here.
        suites.js           the nine suites — the biggest piece of writing
        pillars.js          the four outcome cards
        howItWorks.js       the four steps, and how long each one holds
        faq.js              the questions and answers
        navigation.js       menu labels, the sign-in link, the form's lists
        countries.js        the country dropdown

      styles/             EVERY RULE ABOUT APPEARANCE. No words in here.
        base.css            colours, fonts, the reset
        type.css            headline styles
        backgrounds.css     section backgrounds and textures
        buttons.css         buttons, card hovers, list-row fills
        controls.css        the slider, focus outlines, opening answers
        motion.css          every animation
        overlay.css         the phone menu sliding
        reduced-motion.css  switches motion off for people who ask for that

    reference/            LOCAL ONLY, not in git. Working notes and archived
                          designs kept for us to look at; nothing imports them.

Every file also opens with its own **PLAIN-ENGLISH GUIDE** answering the same
three questions: where you see it, what is in it, what is worth knowing.

---

## 3 · Every file, explained

### The three that hold it all together

**`src/main.jsx`** — finds the empty box in `index.html` and tells the site to
draw itself there. Three lines. Delete it and the page loads blank.

**`src/App.jsx`** — the table of contents. It lists the sections in the order
they appear, decides which of the three page types you are looking at, and keeps
the nav bar, phone menu, chat bubble and contact form present on all of them. It
holds the only two pieces of state more than one section needs: which suite is
open, and what has been searched for.

**`src/index.css`** — lists the eight style files in load order. Later files may
overrule earlier ones, which is why `reduced-motion.css` is last.

### Sections — one per band of the page

**`Hero.jsx`** The dark opening: eyebrow line, headline, the sentence under it,
the white search box, six suggestion chips. Submitting jumps to the catalogue and
filters it.

**`Pillars.jsx`** Four violet cards — Revenue Acceleration, Cost Reduction,
Corporate Governance, Rapid Deployment. Words come from `data/pillars.js`, and all
four share one colour so they read as four outcomes of one thing rather than four
categories.

**`RoiCalculator.jsx`** The slider and the figures that move with it, all worked
out live from the slider position. It exports its two assumptions so the
walkthrough's fourth illustration can quote the same ones instead of inventing
numbers.

**`Catalog.jsx`** The nine suites: three filter buttons, a search box tied to the
hero's, the grid-or-list switch, and either nine cards or nine rows. In list view
a preview card follows the pointer.

**`HowItWorks.jsx`** The four steps and the timer that advances them every 5.6
seconds. Three separate things can hold that timer — a deliberate pause, hovering
the current step, keyboard focus — kept apart because a mouse leaving the section
must not cancel a deliberate pause.

**`ReadyCta.jsx`** The white card between the walkthrough and the closing band:
badge, heading, one sentence, the Sign in button, a link to the questions page,
and three ticked facts along the bottom.

**`ClosingCta.jsx`** The dark closing band: the final heading, the Contact Sales
button, and the dotted office map. Every marker is positioned by hand, so moving
an office means moving a dot in this file.

**`Colophon.jsx`** The footer — wordmark, the menu repeated, the nine suites,
certifications, copyright.

**`Dossier.jsx`** One file that draws all nine suite pages. The layout never
changes; only the suite handed to it does.

**`Faq.jsx`** The questions page. One answer open at a time, so the page stays
scannable.

### Components

**`ui/Button.jsx`** Every button on the site: one rounded pill in one of four
colours. Hover deepens the tone, nothing moves, and pressing dims it slightly.

**`ui/Kicker.jsx`** The `[04] How It Works` label above a section heading, in a
dark variant for pale bands and a light one for dark bands.

**`ui/Cross.jsx`** A printer's alignment mark pinning the corners of a section's
measure. One character.

**`ui/Reveal.jsx`** Wraps a block and fades it upwards into view, once. A delay
can be passed so a row of cards arrives one after another.

**`ui/SuiteCard.jsx`** One suite as a white card. It draws whatever suite it is
handed and holds no words of its own.

**`ui/ViewToggle.jsx`** Two icons in a white pill: cards or rows.

**`chrome/Masthead.jsx`** The nav bar — wordmark, three scroll destinations, FAQ,
Contact Sales, Sign in, collapsing to one button on a phone. It is a three-column
grid with equal flanks, which is what centres the destinations on the page rather
than in the space left over.

**`chrome/MenuSheet.jsx`** The phone menu: the same destinations, the nine suites,
and both buttons.

**`overlays/ContactDialog.jsx`** The Contact Sales form. It checks what you typed,
then says plainly that it cannot send — see §5 to connect it.

**`overlays/SelectField.jsx`** A hand-built dropdown, because a browser's own
decides for itself whether to open upwards and kept choosing wrong.

**`overlays/AgentSimulator.jsx`** The Test Agent popup: a console playing through
the stages of a run on a timer. Nothing is sent anywhere.

**`overlays/ChatWidget.jsx`** The chat bubble. Its answers are written in advance
and matched on keywords; it is not connected to a live assistant.

**`stage/HeroStage.jsx`** Six slowly drifting layers of colour behind the dark
bands, on cycles between 15 and 29 seconds so the light never visibly repeats. It
stops entirely when scrolled off screen.

**`stage/WalkthroughStage.jsx`** The container that cross-fades between the four
illustrations. `walkthrough/tokens.js` holds the measurements they share,
`chrome.jsx` the window parts drawn from them, and one file per step draws that
step's screen.

### Hooks — behaviour that reacts to the browser

**`useRoute.js`** Reads and updates the address bar. This is why `/faq` and
`/suites/…` can be bookmarked and why the back button works.

**`useOverlay.js`** Two rules shared by all three overlays: Escape closes, and the
page behind cannot scroll.

**`useScrollChrome.js`** Whether the page has moved at all, which decides between
a hairline and a shadow under the nav bar.

**`useScrollSpy.js`** Watches a thin band near the top of the screen and reports
which section is crossing it.

**`useSuitePeek.js`** The pointer-following preview card in list view.

### Lib — pure helpers

**`layout.js`** the one page width, plus the card colours and the shared
form-field styling · **`noOrphan.js`** binds the last two words of a line so one
cannot be stranded · **`splitHeading.js`** breaks a suite name at a chosen word so
a row of cards breaks consistently · **`scrollEase.js`** answers glide or jump ·
**`revealObserver.js`** the single watcher behind every fade-in.

### Data and styles

Everything in `data/` is words and numbers with no layout, so it can be edited
with no risk of breaking a design. Everything in `styles/` is appearance with no
words. A section file is the only place the two meet.

---

## 4 · How things work

### Which page you are looking at

There is no page reload. `useRoute` reads the address, `App` maps it to one of
three things, and the address updates when you navigate.

    /                 the home page
    /faq              the questions page
    /suites/<id>      one suite

Two consequences. `vercel.json` exists because a host asked for `/faq` directly
would otherwise look for a file of that name — it tells the host to answer every
address with `index.html`. And **going back is the browser's job**, which is why
there are no drawn "back to home" buttons: the browser returns you to where you
actually came from, and restores your scroll position, which no button can.

### How something fades in as you scroll

One watcher, shared by every revealing block, notices when a block is about to
enter the screen and adds a class. The animation itself is CSS. It fires once —
scrolling back up does not replay it — and a block stops being watched the moment
it has appeared.

Some blocks also blur into focus. That is the same mechanism with one extra
class, used only on the hero and the section headings, because a blur is the one
effect here that costs real graphics work and cheap phones have to render it.

### The four steps and their timer

A step holds for 5.6 seconds. The ring drawn around the icon and the timer
underneath it are driven by one shared condition, so the drawing can never
disagree with the clock. When paused, the countdown **banks how much time was
left** rather than starting over — otherwise the ring would sit four-fifths full
while the clock had gone back to zero, and the countdown would be visibly lying.

Nothing runs while the section is off screen, which is also why everyone sees
step one first rather than whichever step the clock happened to have reached.

### The search

Typing happens in the hero and stays local until you submit; committing sets the
one shared value the catalogue filters on. That is why typing a letter does not
redraw the whole page. Clearing in **either** place ends the search in both.

### The background rhythm

Sections alternate: dark, lavender, near-white, lavender, near-white, dark. The
dark ones are reserved for the top and the bottom, so the page opens and closes on
the same note. Pale bands carry a faint dot texture, and any text on one wears a
`plate` — a soft patch of the band's own colour that clears the pattern behind
the words.

### Motion

Four speeds are defined once in `motion.css` and everything uses one of them,
which is why the site feels like it moves in a single way. Animations either
**arrive** (a block appearing, a window resolving into focus) or **report** (a
countdown, a fill following your pointer). Nothing loops in front of the reader,
and the controls — buttons, the nav bar — hold still.

Anyone who has asked their device for less motion gets none of it:
`reduced-motion.css` cancels the lot and makes sure everything still lands in the
right place, fully visible.

### One trap worth knowing

Tailwind is loaded as a script that generates styles in the browser, and it
injects them **before** our own stylesheet. So a hand-written class beats a
Tailwind utility when both set the same property. Two real bugs came from this: a
class that set a shadow silently cancelled Tailwind's border, and one that set a
position collapsed a background layer to zero height.

**The rule: a hand-written class must not set a property a utility is also
expected to set on the same element.**

---

## 5 · How do I…?

**Change the wording of a suite** — `src/data/suites.js`. Names, taglines,
summaries, figures and accelerators are all there, with no layout to break.

**Add a question to the FAQ** — one entry in `src/data/faq.js`. The page picks it
up with no other change.

**Add or rename a menu item** — `src/data/navigation.js`. The nav bar, the phone
menu and the footer read the same list, so it changes once. A scroll destination
also needs a line in the table at the top of `App.jsx` saying which section it
goes to.

**Connect the contact form** — set `CONTACT_ENDPOINT` in
`src/data/navigation.js` to an address that accepts a POST. The dialog switches to
a real thank-you on its own. Until then it says honestly that it cannot send, and
offers the email address instead.

**Change how long a walkthrough step holds** — `DWELL_MS` in
`src/data/howItWorks.js`. The drawn countdown reads the same number, so both
change together.

**Change a colour** — `src/styles/base.css` names every colour once, and
`index.html` repeats the same names for Tailwind. Change both, or they disagree.

**Change the page width** — `SHELL` in `src/lib/layout.js`. Every section uses it,
so they all move together.

**Add a section to the home page** — write it in `src/sections/`, then add it to
the list in `App.jsx`, with a background flavour that keeps the alternation going.

---

## 6 · The house rules

Settled decisions. Breaking one will look like a mistake even if nobody can say
why.

1. **Green is for actions only.** Violet and blue are the site; green marks what
   you can press, what is confirmed, what is the fix. It never fills a section or
   a card.
2. **No text sits on a texture.** Copy on a dotted band wears `plate`.
3. **Nothing ends with a full stop** — not headings, not card text, not captions.
   Full stops *inside* a sentence stay.
4. **No capitals-only text**, anywhere.
5. **No gradients on flat surfaces.** The two exceptions are the dark aurora
   bands and the 3px brand rule.
6. **Two headings never share a content word.**
7. **Nothing is hidden on a phone without a replacement.** If it matters on a
   computer it has to be reachable on a phone.
8. **Check 320–414px after any layout change** — nothing should scroll sideways.
