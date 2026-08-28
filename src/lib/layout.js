/* The one page width, used by every section. Change it here and the whole page
   moves together.

   Also the card header colours, and the shared look of a form field — the
   contact form's inputs and its dropdowns have to be indistinguishable, and a
   select that sits a pixel off its neighbour is the first thing anyone
   notices. */

/* Shared layout and palette constants.

   `SHELL` is the page's one content measure — every section uses it, so the
   left edge of the hero headline lines up with the left edge of the footer.
   Change it here and the whole page moves together. */
/* ONE CAP UNTIL 1536, A WIDER ONE ABOVE IT.

   1360 is right for a laptop and too narrow for a large monitor: at 1920 it
   leaves about 310px of empty ground down each side of every section, which
   reads as a site built for a smaller screen and then left there. Above 1536
   the page opens to 1560, which brings those margins down to about 180.

   It stops there rather than tracking the viewport. Past about 1560 the hero
   copy would be set on a measure no headline can fill and no paragraph should
   be read at, so the gain from opening further goes straight back out as
   ragged type. */
export const SHELL = 'relative mx-auto w-full max-w-[1360px] px-5 md:px-8 2xl:max-w-[1560px]';

/* Card header colours, cycled by index. Violet and blue only: teal is reserved
   for actions, and a teal card would read as a button the size of a card. */
export const BLOCKS = [
  'bg-ig-violet',
  'bg-ig-violet-800',
  'bg-ig-violet-600',
  'bg-ig-violet-500',
  'bg-ig-blue-deep',
  'bg-ig-blue-deepest'
];

/* Row hover fill — one flat colour, wiped in from the edge the pointer crossed */
export const ROW_FILL = 'bg-ig-violet';

/* One form control surface, shared by the contact dialog's text inputs and by
   the trigger on its custom selects. It lives out here for the same reason
   `SHELL` does: the two are meant to be indistinguishable, and a select that is
   a pixel off its neighbouring input is the first thing anyone notices about a
   form. */
export const FORM_FIELD =
  'w-full rounded-[10px] border border-ig-ink/12 bg-ig-paper px-3.5 py-2.5 text-[13.5px] text-ig-ink outline-none transition-colors duration-300 focus:border-ig-purple/45 focus:bg-white';
