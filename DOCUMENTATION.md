# Ignitho AI — the website, explained

What every file is, what every part does, and why it works the way it does.
Written in plain words for someone who knows the website but not the code.

It is laid out the way the [Diátaxis](https://diataxis.fr/) approach suggests,
because anyone opening this is in one of four situations:

| If you want to… | Read |
| --- | --- |
| get it running on your computer | **1 · Getting started** |
| find out what a file is | **2 · The map**, then **3 · Every file** |
| make a particular change | **5 · How do I…?** |
| understand why it is built this way | **4 · How things work**, **6 · The rules** |

A note on names: a few short words appear all through the code because the
browser has to match them exactly. They are all explained in **7 · Word list**.

---

## 1 · Getting started

    npm install      once, the first time
    npm run dev      opens the site on your computer, updates as you save
    npm run build    makes the version that gets published, into dist/
    npm run lint     checks the code for mistakes

You need Node installed. Nothing else — no database, no server, no accounts. The
website is a set of files that a browser reads.

**The whole website is one page.** The suite pages and the questions page have
real web addresses and the back button works properly, but they are drawn by the
same running page rather than fetched fresh each time. That is why moving around
the site feels instant.

---

## 2 · The map

    index.html               the file the browser asks for first
    package.json             the project name and its commands
    vite.config.js           settings for building the site
    vercel.json              tells the web host to answer every address
                             with index.html
    public/                  pictures used as they are: the world map, the
                             little icon in the browser tab

    src/
      main.jsx               switches the site on. Three lines.
      App.jsx                the running order of the page, and which page
                             you are looking at
      index.css              the list of style files, in the order they load

      sections/              ONE FILE PER BAND OF THE PAGE, top to bottom
        Hero.jsx               the dark opening, with the headline and search
        OutcomeCards.jsx       the four violet cards
        SavingsCalculator.jsx  the slider and the figures
        Catalog.jsx            the nine suites, with filters and grid or list
        HowItWorks.jsx         the four steps and their picture
        ReadyPrompt.jsx        the white "Ready when you are" card
        ClosingSection.jsx     the dark closing band with the office map
        Footer.jsx             the footer
        SuitePage.jsx          a page of its own: one suite
        Faq.jsx                a page of its own: the questions

      components/            THE PIECES THOSE BANDS ARE BUILT FROM
        ui/                    small pieces used all over the site
          Button.jsx             every button
          SectionLabel.jsx       the small label above a section heading
          CornerMark.jsx         the small + marks at section corners
          FadeIn.jsx             the fade-in as you scroll
          SuiteCard.jsx          one suite, drawn as a card
          ViewToggle.jsx         the grid-or-list switch
        navigation/            the menus, present on every page
          TopBar.jsx             the bar across the top
          PhoneMenu.jsx          the menu that slides down on a phone
        popups/                things that open ON TOP of a page
          ContactForm.jsx        the Contact Sales form
          Dropdown.jsx           the country and industry dropdowns
          AgentDemo.jsx          the Test Agent window
          ChatBubble.jsx         the Ask Ignitho AI bubble
        artwork/               the two big decorative pictures
          HeroGlow.jsx           the moving purple glow behind the dark bands
          StepWindows.jsx        the product windows beside the four steps
          steps/
            sharedStyles.js      sizes and colours the four pictures share
            WindowParts.jsx      title bars, toolbars, buttons, status bars
            Step1Choose.jsx      step 1 · the catalogue
            Step2Test.jsx        step 2 · a test run
            Step3Deploy.jsx      step 3 · going live
            Step4Measure.jsx     step 4 · the measured return

      hooks/                 THINGS THAT REACT TO THE BROWSER
        useRoute.js            the web address and the back button
        useOverlay.js          Escape closes a popup, page behind cannot scroll
        useTopBarShadow.js     the shadow under the top bar
        useScrollSpy.js        which menu link is highlighted
        useSuitePreview.js     the preview card that follows your pointer

      lib/                   SMALL HELPERS. Give them a value, get one back.
        layout.js              the page width every section shares
        noOrphan.js            stops one word being left alone on a line
        splitHeading.js        breaks a suite name into two tidy lines
        scrollEase.js          glide or jump, depending on the visitor's setting
        revealObserver.js      the one watcher behind every fade-in

      data/                  EVERY WORD AND NUMBER. No design in here.
        suites.js              the nine suites — the biggest piece of writing
        outcomes.js            the four violet cards
        howItWorks.js          the four steps, and how long each one holds
        faq.js                 the questions and answers
        navigation.js          menu labels, the sign-in link, the form's lists
        countries.js           the country dropdown

      styles/                EVERY RULE ABOUT APPEARANCE. No words in here.
        base.css               colours, fonts, and the word list
        type.css               headline styles
        backgrounds.css        section backgrounds and their patterns
        buttons.css            buttons, card hovers, list-row fills
        controls.css           the slider, keyboard outlines, opening answers
        motion.css             every animation
        overlay.css            the phone menu sliding
        reduced-motion.css     switches motion off for people who ask for that

    reference/               ON YOUR COMPUTER ONLY, not in git. Working notes
                             and old designs kept to look back at.

Every file also opens with its own **PLAIN-ENGLISH GUIDE**, answering the same
three questions: where you see it, what is in it, what is worth knowing.

---

## 3 · Every file, explained

### The three that hold it all together

**`main.jsx`** finds the empty box in `index.html` and tells the site to draw
itself there. Three lines. Delete it and the page loads blank.

**`App.jsx`** is the table of contents. It lists the sections in the order they
appear, works out which of the three kinds of page you are on, and keeps the top
bar, phone menu, chat bubble and contact form on all of them. It holds the only
two things more than one section needs to know: which suite is open, and what has
been searched for.

**`index.css`** lists the eight style files in the order they load. A later file
can overrule an earlier one, which is why the one that switches motion off is
last.

### Sections — one per band of the page

**`Hero.jsx`** The dark opening: the small line at the top, the big headline, the
sentence under it, the white search box and six suggestion buttons. Searching
jumps down to the nine suites and filters them.

**`OutcomeCards.jsx`** Four violet cards — Revenue Acceleration, Cost Reduction,
Corporate Governance, Rapid Deployment. The words come from `data/outcomes.js`.
All four share one colour, so they read as four results of one thing rather than
four separate categories.

**`SavingsCalculator.jsx`** The slider and the figures that move with it, all
worked out live from where the slider sits. It shares its two assumptions with
the fourth step picture, so the two can never quote different numbers.

**`Catalog.jsx`** The nine suites: three filter buttons, a search box tied to the
one in the opening band, the grid-or-list switch, and either nine cards or nine
rows. In list view a small preview card follows your pointer.

**`HowItWorks.jsx`** The four steps and the timer that moves them along every 5.6
seconds. Three separate things can hold that timer — pressing pause, hovering the
step that is currently showing, or reaching it with the keyboard — and they are
kept apart so that a mouse leaving the section cannot cancel a deliberate pause.

**`ReadyPrompt.jsx`** The white card between the four steps and the dark closing
band: badge, heading, one sentence, the Sign in button, a link to the questions
page, and three ticked facts along the bottom.

**`ClosingSection.jsx`** The dark closing band: the last heading, the Contact
Sales button, and the dotted world map. Every office marker is placed by hand, so
moving an office means moving a dot in this file.

**`Footer.jsx`** The bottom of every page — the Ignitho AI name, the menu
repeated, the nine suites, the certifications and the copyright line.

**`SuitePage.jsx`** One file that draws all nine suite pages. The layout is the
same every time; only the suite handed to it changes.

**`Faq.jsx`** The questions page. One answer open at a time, so the page stays
easy to scan.

### The pieces they are built from

**`ui/Button.jsx`** Every button on the site: one rounded pill in one of four
colours. Hovering deepens the colour slightly and nothing moves; pressing dims
it.

**`ui/SectionLabel.jsx`** The small `[04] How It Works` label above a section
heading, in a dark version for pale backgrounds and a light one for dark
backgrounds.

**`ui/CornerMark.jsx`** A small `+` marking the corners of a section. One
character, borrowed from printing, where it is used to line plates up.

**`ui/FadeIn.jsx`** Wraps a block and fades it upwards into view, once. A delay
can be given, which is how a row of cards arrives one after another instead of
all together.

**`ui/SuiteCard.jsx`** One suite as a white card. It draws whatever suite it is
handed and holds no words of its own.

**`ui/ViewToggle.jsx`** Two small icons in a white pill: cards or rows.

**`navigation/TopBar.jsx`** The bar across the top — the Ignitho AI name, three
links that scroll to a section, FAQ, Contact Sales and Sign in, shrinking to one
round button on a phone. It is built as three columns of equal width, which is
what puts the middle links on the centre of the page rather than in whatever
space is left over.

**`navigation/PhoneMenu.jsx`** The panel that slides down on a phone: the same
links, the nine suites, and both buttons.

**`popups/ContactForm.jsx`** The Contact Sales form. It checks what you typed and
then says plainly that it cannot send yet — see §5 for how to connect it.

**`popups/Dropdown.jsx`** A dropdown built by hand, because the browser's own
decides for itself whether to open upwards or downwards, and it kept opening
upwards.

**`popups/AgentDemo.jsx`** The Test Agent window: a dark console that plays
through the stages of a run on a timer. Nothing is really run and nothing is
sent.

**`popups/ChatBubble.jsx`** The chat bubble in the corner. Its answers are
written in advance and picked by keyword; it is not connected to a real
assistant.

**`artwork/HeroGlow.jsx`** Six layers of colour drifting slowly behind the dark
bands, on cycles between 15 and 29 seconds so the light never visibly repeats. It
stops completely once scrolled past.

**`artwork/StepWindows.jsx`** The container that fades between the four pictures,
with one file per step drawing that step's screen. `sharedStyles.js` holds the
sizes they all use and `WindowParts.jsx` the pieces built from them, so the four
cannot drift apart.

### Things that react to the browser

**`useRoute.js`** reads and updates the web address. This is why `/faq` and
`/suites/…` can be bookmarked and shared, and why the back button works.

**`useOverlay.js`** gives all three popups the same two rules: Escape closes
them, and the page behind cannot scroll while one is open.

**`useTopBarShadow.js`** answers one question — has the page been scrolled at
all? — which decides between a thin line and a soft shadow under the top bar.

**`useScrollSpy.js`** watches a narrow band near the top of the screen and
reports which section is crossing it, so that menu link turns violet.

**`useSuitePreview.js`** runs the preview card that follows your pointer in list
view.

### Small helpers

**`layout.js`** the one page width every section uses · **`noOrphan.js`** ties
the last two words of a line together so one cannot be left alone ·
**`splitHeading.js`** breaks a suite name at a chosen word so a row of cards
breaks in the same place · **`scrollEase.js`** answers glide or jump ·
**`revealObserver.js`** the single watcher behind every fade-in.

### Words and appearance

Everything in `data/` is words and numbers with no design attached, so it can be
edited with no risk of breaking a layout. Everything in `styles/` is appearance
with no words. A section file is the only place the two meet.

---

## 4 · How things work

### Which page you are looking at

The page never reloads. `useRoute.js` reads the address, `App.jsx` turns it into
one of three things, and the address updates as you move around.

    /                 the home page
    /faq              the questions page
    /suites/<name>    one suite

Two things follow from that. `vercel.json` exists because a web host asked for
`/faq` directly would otherwise go looking for a file with that name — the file
tells it to answer every address with `index.html` and let the page sort it out.
And **going back is the browser's job**, which is why there are no "back to home"
buttons drawn on the page: the browser returns you to wherever you actually came
from and puts you back at the same scroll position, which no button can do.

### How something fades in as you scroll

One watcher, shared by every fading block on the page, notices when a block is
about to come into view and adds a marker to it. The movement itself is done by
the style files. It happens once — scrolling back up does not replay it — and a
block stops being watched as soon as it has appeared.

A few blocks also sharpen from blurred to clear. That is the same thing with one
extra marker, used only on the opening band and the section headings, because
blurring is the one effect here that makes the graphics card work hard and cheap
phones have to draw it too.

### The four steps and their timer

A step holds for 5.6 seconds. The ring drawn around the icon and the timer
underneath it are driven by the same switch, so what you see can never disagree
with what is actually happening. When it pauses, the countdown **remembers how
much time was left** instead of starting over — otherwise the ring would sit
nearly full while the clock behind it had gone back to zero.

Nothing runs while the section is off screen. That is also why everyone sees step
one first, rather than whichever step the clock happened to have reached.

### The search

What you type stays in the opening band until you press enter; pressing enter
sets the one value the nine suites are filtered by. That is why typing a letter
does not redraw the whole page. Clearing the search in **either** place ends it in
both.

### The backgrounds

Sections alternate: dark, pale lavender, near-white, pale lavender, near-white,
dark. The dark ones are kept for the very top and the very bottom, so the page
opens and closes on the same note. The pale ones carry a faint dot pattern, and
any text on top of one gets a soft patch of plain colour behind it, so the
pattern never sits under words.

### Movement

Four speeds are written down once and everything uses one of them, which is why
the whole site feels like it moves in a single way. Animations either **arrive**
(something appearing, a window sharpening into focus) or **report** something
(a countdown, a colour following your pointer). Nothing loops in front of the
reader, and the controls — buttons, the top bar — hold still.

Anyone whose device is set to reduce motion gets none of it. One style file
switches the lot off and makes sure everything still ends up in the right place,
fully visible.

### One trap worth knowing about

The styling tool (Tailwind) is loaded as a script that writes its styles into the
page **before** our own style files. So when both set the same thing, ours wins.
Two real bugs came from this: one of our rules set a shadow and silently
cancelled a border that was supposed to be there, and another set a position and
collapsed a background to nothing.

**The rule: one of our own style rules must not set something the styling tool is
also expected to set on the same element.**

---

## 5 · How do I…?

**Change the words for a suite** — `src/data/suites.js`. Names, taglines,
summaries, figures and the agent list are all there, with no layout to break.

**Add a question to the FAQ** — one entry in `src/data/faq.js`. The page picks it
up with no other change.

**Add or rename a menu item** — `src/data/navigation.js`. The top bar, the phone
menu and the footer all read the same list, so it is changed once. If it scrolls
to a section, it also needs a line in the short table at the top of `App.jsx`
saying which section that is.

**Make the contact form actually send** — put a real web address into
`CONTACT_ENDPOINT` in `src/data/navigation.js`. The form switches to a proper
thank-you on its own. Until then it says honestly that it cannot send and offers
the email address instead.

**Change how long a step holds** — `DWELL_MS` in `src/data/howItWorks.js`. The
countdown ring reads the same number, so both change together.

**Change a colour** — `src/styles/base.css` names every colour once, and
`index.html` repeats the same names for the styling tool. Change both, or they
will disagree.

**Change the page width** — `SHELL` in `src/lib/layout.js`. Every section uses
it, so they all move together.

**Add a new band to the home page** — write it in `src/sections/`, then add it to
the list in `App.jsx`, giving it a background that keeps the alternation going.

---

## 6 · The rules

Settled decisions. Breaking one will look like a mistake even if nobody can say
exactly why.

1. **Green is for actions only.** Violet and blue are the site; green marks what
   you can press, what is confirmed, what is the fix. It never fills a whole
   section or a whole card.
2. **No text sits on a pattern.** Text on a dotted background gets a plain patch
   behind it.
3. **Nothing ends with a full stop** — not headings, not card text, not captions.
   Full stops *inside* a sentence stay.
4. **No words in capitals only**, anywhere.
5. **No colour fades on flat surfaces.** The only two exceptions are the dark
   bands at the top and bottom, and the 3px coloured stripe.
6. **Two headings never share the same important word.**
7. **Nothing is hidden on a phone without a replacement.** If it matters on a
   computer, it has to be reachable on a phone.
8. **Check narrow screens (320–414px) after any layout change** — nothing should
   scroll sideways.

---

## 7 · Word list

Short names that appear all through the code. The browser has to match them
exactly, so they cannot be spelled out every time. The same list is kept at the
top of `src/styles/base.css`.

| Name | What it means |
| --- | --- |
| `aurora` | the dark purple background, used only at the very top and very bottom |
| `bg-b` | the pale lavender background |
| `bg-c` | the near-white background |
| `dots` | the faint dot pattern on the two pale backgrounds |
| `plate` | a soft patch of plain background colour behind text, so the dots never sit under words |
| `flank-field` | the same dot pattern showing only down the outer edges of a white card |
| `reveal` | fade in and rise slightly, once, as you scroll to it |
| `reveal-soft` | the same, but also sharpening from blurred to clear |
| `mg` | the blur-into-focus arrival inside the product windows |
| `dwell-ring` | the countdown drawn around the current step |
| `disclose` | an answer opening to exactly the height of its own text |
| `SHELL` | the one page width every section shares |
| `DWELL_MS` | how long a step holds — 5.6 seconds |
| `DAG` | the client's own term, used in the site's copy: a set of steps that run in a fixed, checkable order |
