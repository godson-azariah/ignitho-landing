/* Draws every page and every popup once, and fails if any of them throws.

   This exists because of a bug that reached the live site: a file was left with
   an empty import, so the four step pictures threw the moment they drew and the
   whole page went blank when you scrolled to them. Nothing caught it, because
   the pictures only appear once that section is scrolled to, and until then
   there is nothing on the page to check.

   So this draws the things that are normally hidden as well: each step picture
   on its own, and each popup in its open state.

   Run it with `npm run check`. */
import { renderToStaticMarkup } from 'react-dom/server';

import App from '../src/App.jsx';
import { SuitePage } from '../src/sections/SuitePage.jsx';
import { Faq } from '../src/sections/Faq.jsx';


import { ContactForm } from '../src/components/popups/ContactForm.jsx';
import { AgentDemo } from '../src/components/popups/AgentDemo.jsx';
import { ChatBubble } from '../src/components/popups/ChatBubble.jsx';
import { PhoneMenu } from '../src/components/navigation/PhoneMenu.jsx';
import { Dropdown } from '../src/components/popups/Dropdown.jsx';

import { SUITES } from '../src/data/suites.js';
import { COUNTRIES } from '../src/data/countries.js';

const noop = () => {};

const cases = {
  'home page': <App />,
  'questions page': <Faq openContact={noop} />,
  ...Object.fromEntries(
    SUITES.map((s) => [`suite: ${s.id}`, <SuitePage key={s.id} suite={s} openContact={noop} />])
  ),


  /* hidden until something is pressed */
  'contact form, open': <ContactForm open onClose={noop} />,
  'test agent window': <AgentDemo accelerator={SUITES[0].accelerators[0]} onClose={noop} />,
  'chat bubble': <ChatBubble />,
  'phone menu, open': (
    <PhoneMenu
      open
      onClose={noop}
      openSuite={noop}
      navAction={() => noop}
      openContact={noop}
      goHome={noop}
    />
  ),
  'country dropdown': <Dropdown label="Country" value="" onChange={noop} options={COUNTRIES} />
};

let failed = 0;
for (const [name, el] of Object.entries(cases)) {
  try {
    const html = renderToStaticMarkup(el);
    if (!html.length) throw new Error('drew nothing');
    console.log(`  ok    ${name}`);
  } catch (e) {
    console.log(`  FAIL  ${name}: ${e.message}`);
    failed += 1;
  }
}

console.log(
  failed
    ? `\n${failed} of ${Object.keys(cases).length} failed\n`
    : `\nall ${Object.keys(cases).length} drew without error\n`
);
process.exit(failed ? 1 : 0);
