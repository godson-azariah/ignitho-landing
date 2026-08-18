# Ignitho AI — the website, explained

What every file is, what the moving parts do, and why things are built the way
they are. Written for someone who knows the website but not the code.

Start wherever you need to:

- **Just want to run it?** Section 1.
- **Looking for a particular file?** Section 2 has the map, section 3 says what
  each one does.
- **Trying to change something?** Section 5 has the common jobs.
- **Wondering why it works this way?** Sections 4 and 6.
- **Hit a short word you don't recognise?** Section 8 is a word list.

---

## 1 · Getting started

    npm install      once, the first time
    npm run dev      opens the site on your machine, updates as you save
    npm run build    makes the version that gets published, into dist/
    npm run lint     checks the code for mistakes

You need Node. That's it — no database, no server, no accounts.

One thing worth knowing up front: the whole site is a single page. The suite
pages and the questions page have proper web addresses and the back button works
normally, but nothing is fetched again when you move between them. That's why
navigating feels instant.

---

## 2 · The map

    index.html               the file the browser asks for first
    package.json             the project name and its commands
    vite.config.js           build settings
    vercel.json              tells the host to answer every address with
                             index.html
    public/                  pictures used as they are: the world map, the
                             browser-tab icon

    src/
      main.jsx               starts the site. Three lines.
      App.jsx                the running order of the page, and which page
                             you're on
      index.css              the style files, in the order they load

      sections/              one file per band of the page, top to bottom
        Hero.jsx               the dark opening, headline and search
        OutcomeCards.jsx       the four violet cards
        SavingsCalculator.jsx  the slider and the figures
        Catalog.jsx            the nine suites, filters, grid or list
        HowItWorks.jsx         the four steps and their picture
        ReadyPrompt.jsx        the white "Ready when you are" card
        ClosingSection.jsx     the dark closing band with the office map
        Footer.jsx             the footer
        SuitePage.jsx          a page of its own: one suite
        Faq.jsx                a page of its own: the questions

      components/            the pieces those bands are built from
        ui/                    small things used all over
          Button.jsx             every button
          SectionLabel.jsx       the small label above a section heading
          CornerMark.jsx         the + marks at section corners
          FadeIn.jsx             the fade-in as you scroll
          SuiteCard.jsx          one suite, drawn as a card
          ViewToggle.jsx         the grid-or-list switch
        navigation/            the menus
          TopBar.jsx             the bar across the top
          PhoneMenu.jsx          the panel that slides down on a phone
        popups/                things that open on top of a page
          ContactForm.jsx        the Contact Sales form
          Dropdown.jsx           the country and industry pickers
          AgentDemo.jsx          the Test Agent window
          ChatBubble.jsx         the chat bubble
        artwork/               the two big decorative pictures
          HeroGlow.jsx           the purple light behind the dark bands
          StepWindows.jsx        the product windows beside the four steps
          steps/
            sharedStyles.js      sizes and colours the four pictures share
            WindowParts.jsx      title bars, toolbars, buttons, status bars
            Step1Choose.jsx      the catalogue
            Step2Test.jsx        a test run
            Step3Deploy.jsx      going live
            Step4Measure.jsx     the measured return

      hooks/                 things that react to the browser
        useRoute.js            the web address and the back button
        useOverlay.js          Escape closes a popup, page behind can't scroll
        useTopBarShadow.js     the shadow under the top bar
        useScrollSpy.js        which menu link is highlighted
        useSuitePreview.js     the preview card that follows your pointer

      lib/                   small helpers. Give them a value, get one back.
        layout.js              the page width every section shares
        noOrphan.js            stops one word being left alone on a line
        splitHeading.js        breaks a suite name into two tidy lines
        scrollEase.js          glide or jump
        revealObserver.js      the one watcher behind every fade-in

      data/                  every word and number. No design in here.
        suites.js              the nine suites
        outcomes.js            the four violet cards
        howItWorks.js          the four steps and their timing
        faq.js                 the questions and answers
        navigation.js          menu labels, the sign-in link, the form lists
        countries.js           the country dropdown

      styles/                everything about appearance. No words in here.
        base.css               colours, fonts, and the word list
        type.css               headline styles
        backgrounds.css        section backgrounds and their patterns
        buttons.css            buttons, card hovers, row fills
        controls.css           slider, keyboard outlines, opening answers
        motion.css             every animation
        overlay.css            the phone menu sliding
        reduced-motion.css     turns motion off for people who ask

    reference/               on your machine only, not in git. Working notes
                             and old designs.

Every file also opens with a short note saying what it draws and anything odd
about it.

---

## 3 · Every file, explained

### The three that hold it together

**`main.jsx`** finds the empty div in `index.html` and hands it to `App`. Three
lines, and deleting it gives you a blank page.

**`App.jsx`** is the table of contents. It lists the sections in order, works out
which of the three kinds of page you're on, and keeps the top bar, phone menu,
chat bubble and contact form present everywhere. Two things live here because two
sections each need them: which suite is open, and the last search.

**`index.css`** lists the style files in load order. Later files can overrule
earlier ones, and `reduced-motion.css` is last for exactly that reason.

### Sections

**`Hero.jsx`** The dark band at the top. Small line above a rule, big headline,
one sentence, the white search box, six suggestion buttons. Searching scrolls you
to the suites with results already filtered.

**`OutcomeCards.jsx`** Four violet cards. Words in `data/outcomes.js`, along with
the colour they share. They each had their own colour once, and it made them look
like four categories rather than four results of one thing.

**`SavingsCalculator.jsx`** The slider and the figures under it. Nothing is
stored; everything is worked out from where the slider sits. Its two assumptions
are shared with the fourth step picture so the two can't end up disagreeing.

**`Catalog.jsx`** The nine suites, with filters, a search box tied to the one
upstairs, and the grid-or-list switch. In list view a preview card follows your
pointer.

**`HowItWorks.jsx`** The four steps and the timer that advances them every 5.6
seconds. Three separate things can stop that timer — the pause control, hovering
the step that's showing, or tabbing into the list. They're tracked separately so a
mouse leaving the section can't cancel a pause you meant.

**`ReadyPrompt.jsx`** The white card before the closing band. This one went
through several drafts; an earlier version is kept in `reference/backups`.

**`ClosingSection.jsx`** The dark closing band and the dotted world map. The map
is a picture, and every office marker is placed by hand in that file.

**`Footer.jsx`** Name, menu, the nine suites, certifications, copyright. The menu
reads the same list as the top bar.

**`SuitePage.jsx`** One file draws all nine suite pages. The layout never changes;
only the suite handed to it does.

**`Faq.jsx`** The questions page. Opening one answer closes the last one, which is
the only reason the page stays scannable.

### Components

**`ui/Button.jsx`** Every button: a rounded pill in one of four colours. It used
to slide its label and change colour on hover; now it holds still and only the
tone shifts.

**`ui/SectionLabel.jsx`** The small `[04] How It Works` line above a heading.

**`ui/CornerMark.jsx`** The `+` at a section's corners, borrowed from printing.

**`ui/FadeIn.jsx`** Wrap something and it fades upwards into view, once. Pass a
delay and a row of cards arrives one after another.

**`ui/SuiteCard.jsx`** One suite as a card. It draws whatever it's handed.

**`ui/ViewToggle.jsx`** Cards or rows, in one fixed spot so it doesn't jump.

**`navigation/TopBar.jsx`** The bar across the top. Three columns with the outer
two forced to equal width, which is what puts the middle links on the centre of
the page rather than in whatever gap is left.

**`navigation/PhoneMenu.jsx`** The slide-down panel: same links, plus the nine
suites and both buttons.

**`popups/ContactForm.jsx`** The Contact Sales form. It doesn't send yet — see
section 5.

**`popups/Dropdown.jsx`** The country and industry pickers, built by hand because
the browser's own kept opening upwards.

**`popups/AgentDemo.jsx`** The Test Agent window: a console that plays through a
run on a timer. Nothing leaves the browser.

**`popups/ChatBubble.jsx`** The chat bubble. Replies are written in advance and
matched on keywords.

**`artwork/HeroGlow.jsx`** Six layers of light drifting on cycles between 15 and
29 seconds, so nothing visibly repeats. Stops when scrolled past.

**`artwork/StepWindows.jsx`** Holds the four step pictures and fades between
them. `sharedStyles.js` has the sizes, `WindowParts.jsx` the pieces, and one file
per step.

### Hooks

**`useRoute.js`** reads and updates the address bar, so `/faq` and `/suites/…`
can be bookmarked and the back button works properly.

**`useOverlay.js`** gives all three popups the same two rules: Escape closes,
page behind can't scroll.

**`useTopBarShadow.js`** answers one question — has the page scrolled at all.

**`useScrollSpy.js`** works out which section you're looking at. It watches a
narrow band near the top rather than the whole screen, because sections are
taller than the screen and otherwise three of them are "in view" at once.

**`useSuitePreview.js`** the pointer-following preview card in list view.

### Helpers, words, appearance

`lib/` is five small functions: the page width, the one that stops a word being
stranded, the one that breaks suite names consistently, the glide-or-jump answer,
and the shared fade-in watcher.

`data/` is words and numbers with no design attached, so it's the safest place to
edit. `styles/` is appearance with no words. A section file is the only place the
two meet.

---

## 4 · How things work

### Which page you're on

The page never reloads. `useRoute.js` reads the address, `App.jsx` turns it into
one of three things, and the address updates as you move.

    /                 home
    /faq              the questions
    /suites/<name>    one suite

`vercel.json` exists because a host asked for `/faq` directly would otherwise go
looking for a file with that name. It tells the host to answer everything with
`index.html` and let the page work it out.

There are no "back to home" buttons drawn on the page, on purpose. The browser's
back button returns you to wherever you actually came from and restores your
scroll position; a drawn button always goes to the same place and can't.

### Fading in as you scroll

One watcher, shared by every fading block, notices when something is about to
come into view and marks it. The movement itself is in the style files. It
happens once. A block stops being watched as soon as it has appeared.

A few blocks also sharpen from blurred to clear — the opening band and the
section headings. That's deliberately rare; see section 7 for why.

### The four steps and their timer

A step holds for 5.6 seconds. The ring drawn around the icon and the timer behind
it run off the same switch, so what you see can't disagree with what's happening.
When it pauses, the countdown remembers how much time was left rather than
starting over — otherwise the ring would sit nearly full while the clock behind
it had gone back to zero.

Nothing runs while the section is off screen, which is also why everyone sees
step one first rather than whichever step the clock had reached.

### The search

What you type stays in the opening band until you press enter. Pressing enter
sets the one value the catalogue filters on, which is why typing a letter doesn't
redraw the page. Clearing the search in either place ends it in both.

### The backgrounds

Dark, pale lavender, near-white, pale lavender, near-white, dark. The dark ones
are kept for the very top and very bottom so the page opens and closes on the
same note. The pale ones carry a faint dot pattern, and text sitting on one gets
a soft patch of plain colour behind it so the dots never run under words.

### Movement

Four speeds are written down once and everything uses one of them. Animations
either arrive (something appearing, a window sharpening) or report something (the
countdown, a colour following your pointer). Nothing loops in front of the
reader, and the controls hold still.

Anyone whose device asks for reduced motion gets none of it.

### A trap to watch for

Tailwind is loaded as a script that writes its styles into the page *before* our
own style files. So when both set the same property, ours wins. Two real bugs
came from this: one of our rules set a shadow and silently cancelled a border
that was meant to be there, and another set a position and collapsed a background
to nothing.

The rule: don't set something in our own CSS that a Tailwind class is also
expected to set on the same element.

---

## 5 · How do I…?

**Change the words for a suite** — `src/data/suites.js`. No layout in there, so
nothing can break visually. Much longer text will wrap differently on the cards,
and that's the only thing to watch.

**Add a question to the FAQ** — one entry in `src/data/faq.js`.

**Add or rename a menu item** — `src/data/navigation.js`. The top bar, phone menu
and footer read the same list. If it scrolls to a section it also needs a line in
the short table at the top of `App.jsx`.

**Make the contact form send** — put a real address into `CONTACT_ENDPOINT` in
`src/data/navigation.js`. The form switches to a proper thank-you by itself.

**Change how long a step holds** — `DWELL_MS` in `src/data/howItWorks.js`. The
countdown ring reads the same number.

**Change a colour** — `src/styles/base.css` names every colour once, and
`index.html` repeats the same names for Tailwind. Change both or they disagree.

**Change the page width** — `SHELL` in `src/lib/layout.js`.

**Add a band to the home page** — write it in `src/sections/`, add it to the list
in `App.jsx`, and give it a background that keeps the alternation going.

---

## 6 · The rules

Settled decisions. Breaking one looks like a mistake even if nobody can say
exactly why.

1. Green is for actions only. Violet and blue are the site; green marks what you
   can press, what's confirmed, what's the fix. It never fills a section or a
   card.
2. No text sits on a pattern.
3. Nothing ends with a full stop — not headings, not card text, not captions.
   Full stops inside a sentence stay.
4. No words in capitals only.
5. No colour fades on flat surfaces. The exceptions are the dark bands top and
   bottom, and the 3px stripe.
6. Two headings never share the same important word.
7. Nothing is hidden on a phone without a replacement.
8. Check narrow screens (320–414px) after any layout change. Nothing should
   scroll sideways.

---

## 7 · Where the site was made faster

Most of this came from one rule: a lot of people will open this on a cheap phone,
and it has to be smooth there.

**Blur is the expensive one.** A blur makes the graphics card redraw the blurred
area on every frame, and the cost grows with the *square* of the radius, so 10px
costs four times what 5px costs. Three things follow from that:

- Every radius on the site was cut by about 30% (roughly half the work, since it
  squares). They now run from 3.5px on a phone to 18px for the patch behind text.
- A blur always finishes early. Where a block fades in over 1.05 seconds, the
  blur clears in 0.72 — so the expensive part is over in the first two-thirds
  while the movement finishes as ordinary text.
- It's always put on the smallest element that holds the content, never a
  wrapper. Moving two blurs off a centring wrapper and onto the block inside cut
  the blurred area by about a third for an identical result.

**The purple glow in the dark bands has no blur at all.** Six full-width blurred
layers is what made that section drag on older machines. The softness is baked
into the colour steps of the gradients instead — a gradient is drawn once and
then just moved about, which is nearly free. At these speeds you can't tell the
difference.

**Nothing animates off screen.** The glow, the step timer, the countdown ring and
every fade-in are switched off unless their section is actually visible. Before
that, a page left open ran six animated layers behind a section nobody was
looking at.

**One watcher instead of fifty.** Every fade-in shares a single observer rather
than creating its own, and each element is dropped from it the moment it has
appeared, so the list empties as you read down the page.

**Scroll is read once per frame.** Scroll events fire far faster than the screen
can redraw, and asking the browser for the scroll position forces it to
recalculate layout. So the answer is taken at most once per frame.

**No `will-change` on anything repeated.** It was on the buttons, which meant the
graphics card held a separate layer for about 25 of them permanently. Browsers
promote an element on their own while it's actually animating.

**Filters end at `none`, not zero.** A zero-radius blur is still a blur as far as
the browser is concerned, and it keeps that separate layer alive for as long as
the page is open.

**The suite list moves one thing.** Changing rows slides a single pre-drawn strip
rather than mounting and unmounting cards, so no image is ever loaded twice.

**Images are told their size in advance**, so nothing jumps around as they
arrive, and everything below the first screen loads lazily.

**Reduced motion cancels animations rather than shortening them.** A shortened
one still fires the blur and the movement, which is the whole thing the setting
is asking us not to do.

---

## 8 · Word list

Short names used all through the code. The browser has to match them exactly, so
they can't be spelled out every time. The same list sits at the top of
`src/styles/base.css`.

| Name | What it means |
| --- | --- |
| `aurora` | the dark purple background, top and bottom of the page only |
| `bg-b` | the pale lavender background |
| `bg-c` | the near-white background |
| `dots` | the faint dot pattern on the pale backgrounds |
| `plate` | a patch of plain colour behind text, keeping the dots out from under words |
| `flank-field` | the same dots, showing only down the outer edges of a white card |
| `reveal` | fade in and rise slightly, once |
| `reveal-soft` | the same, but also sharpening from blurred to clear |
| `mg` | the blur-into-focus arrival inside the product windows |
| `dwell-ring` | the countdown drawn around the current step |
| `disclose` | an answer opening to exactly the height of its own text |
| `SHELL` | the page width every section shares |
| `DWELL_MS` | how long a step holds — 5.6 seconds |
| `DAG` | the client's own term, used in the site's copy: steps that run in a fixed, checkable order |
