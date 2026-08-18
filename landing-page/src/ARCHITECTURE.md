# How this project is laid out

Written for someone who knows the website and is opening the code for the first
time. Every file also carries its own PLAIN-ENGLISH GUIDE at the top saying what
part of the site it draws.

## The one-minute version

    src/
      main.jsx        switches the site on. Three lines.
      App.jsx         the running order of the page, and which page you are on.
      index.css       the list of style files, in the order they load.

      sections/       one file per BAND of the page, top to bottom.
      components/     the pieces those bands are built from.
      hooks/          behaviour that reacts to the browser (scroll, history, keys).
      lib/            pure helpers. Give them a value, get a value back.
      data/           all the words and numbers. No layout.
      styles/         all the appearance. No words.

## Why the folders split where they do

**`sections/` is the page in reading order.** Hero, Pillars, RoiCalculator,
Catalog, HowItWorks, ReadyCta, ClosingCta, Colophon — plus two files that are
whole pages of their own, Dossier (a suite) and Faq. If you can point at a band
of the site, there is one file here for it.

**`components/` is split by ROLE, not by page**, because "component" on its own
had stopped meaning anything — the folder held a 6-line plus sign next to a
380-line dialog.

    components/ui/         the small pieces used all over: Button, Kicker, Cross,
                           Reveal, SuiteCard, ViewToggle.
    components/chrome/     what is wrapped around every page: Masthead, MenuSheet.
    components/overlays/   everything that opens ON TOP of a page: ContactDialog,
                           SelectField, AgentSimulator, ChatWidget.
    components/stage/      the two big decorative illustrations: HeroStage (the
                           moving purple glow) and WalkthroughStage (the product
                           windows), the latter with a folder of its own.

The test for which one a new file belongs in: *is it used everywhere, is it page
furniture, does it open on top, or is it decoration?*

**`hooks/` and `lib/` were one folder and should not have been.** A hook runs
inside React and can hold state or touch the browser; a lib function is pure —
same input, same output, no React. Keeping them apart means you can read
anything in `lib/` without knowing React at all.

**`data/` holds every word on the site.** Nothing in it knows how it will look,
which is why the wording can be edited with no risk of breaking a layout.

**`styles/` holds every rule about appearance**, in eight files that must load in
the order `index.css` lists — later files are allowed to overrule earlier ones,
and `reduced-motion.css` is last because its whole job is overruling.

## The one folder that goes deeper

`components/stage/walkthrough/` is the four illustrated product windows:

    tokens.js       measurements shared by all four panels — the window itself,
                    its shadow, the three type sizes inside it.
    chrome.jsx      the parts drawn from those measurements: title bar, toolbar,
                    buttons, status bar.
    PickPanel.jsx   step 1, the catalogue
    TestPanel.jsx   step 2, a test run
    DeployPanel.jsx step 3, going live
    MeasurePanel.jsx step 4, the measured return

This was one 833-line file. Four unrelated illustrations sharing a file is four
reasons to open it and no way to find the one you want.

`tokens.js` and `chrome.jsx` are separate for a mechanical reason: a file that
exports both constants and components breaks hot-reloading while you work.

## Rules worth knowing before you change anything

- **Words live in `data/`, appearance lives in `styles/`, and neither knows about
  the other.** A section file is the only place they meet.
- **No text ever sits on a texture.** Any copy on a dotted band wears `plate`,
  which clears the pattern behind it.
- **Green is for actions only.** Violet and blue are the site; green marks the
  thing you can press, the thing that is confirmed, the thing that is the fix.
- **Nothing on a page ends with a full stop** — not headings, not card text, not
  captions. Full stops inside a sentence stay.
- **Motion is defined once, in `styles/motion.css`.** Four speeds, and everything
  uses one of them.
