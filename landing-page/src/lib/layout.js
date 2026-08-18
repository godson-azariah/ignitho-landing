/* ==========================================================================
   PLAIN-ENGLISH GUIDE  ·  THE PAGE WIDTH, USED BY EVERY SECTION

   WHERE YOU SEE THIS
     Everywhere, invisibly — it is why every section left and right
     edges line up.

   WHAT IS IN HERE
     · One measurement: how wide the content may be, and how far it sits
       from the screen edges.
     · The list of card header colours, and the shared styling for form
       fields.

   WORTH KNOWING
     Change the width here and the whole page moves together, which is
     why it is one setting instead of fifty.
   ========================================================================== */

/* Shared layout and palette constants.

   `SHELL` is the page's one content measure — every section uses it, so the
   left edge of the hero headline lines up with the left edge of the footer.
   Change it here and the whole page moves together. */
export const SHELL = 'relative mx-auto w-full max-w-[1360px] px-5 md:px-8';

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
