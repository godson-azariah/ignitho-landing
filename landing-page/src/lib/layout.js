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
