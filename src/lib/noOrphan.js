/* ==========================================================================
   PLAIN-ENGLISH GUIDE  ·  STOPS A HEADING ENDING WITH ONE WORD ALONE ON A LINE

   WHERE YOU SEE THIS
     Every page heading and the sentence under it.

   WHAT IS IN HERE
     · It glues the last two words of a line together so they can never
       be split. If they no longer fit, BOTH move to the next line.

   WORTH KNOWING
     A single stranded word at the end of a heading is the thing this
     prevents.
   ========================================================================== */

/* This is U+00A0, a literal non-breaking space, not a plain one. It looks
   identical in every editor, so a search-and-replace typed with the ordinary
   space bar will silently fail to match this line. */
const NBSP = ' ';

/* Stops a sentence ending with one word stranded on its own line.

   Binding the last two words with a non-breaking space means the line breaker
   can never put them apart: if the pair no longer fits, BOTH drop to the next
   line together. That is the whole trick — you do not tell the browser where
   to break, you tell it one place it may not.

   Why not `text-wrap: pretty`? It does the same job, but Firefox and Safari
   only shipped it recently and it interacts badly with `-webkit-line-clamp`,
   which every clamped block in the card uses. A non-breaking space is a plain
   character: it has worked in every layout engine ever written, and it keeps
   working inside a clamp.

   Note this cannot make text overflow in practice — the pair only moves down
   when it does not fit where it is, which is exactly the case being fixed.
*/
export function noOrphan(text) {
  if (typeof text !== 'string') return text;
  const at = text.trimEnd().lastIndexOf(' ');
  if (at < 0) return text;
  return `${text.slice(0, at)}${NBSP}${text.slice(at + 1)}`;
}
