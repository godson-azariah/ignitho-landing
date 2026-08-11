/* Words that should not be left hanging at the end of a line */
const HANGING = new Set(['&', 'and', 'or', 'of', 'the', 'for', 'to', 'with']);

/* Splits a heading into two balanced lines.

   Left to wrap on its own, a name breaks wherever it happens to run out of
   room — which strands "Suite" alone on the second line and reads as an
   accident rather than a setting. Worse, whether it wraps at all depends on
   character count, so a row of cards ends up with some headings on one line
   and some on two, and nothing lines up. Choosing the break by word count
   gives a deliberate pair every time: "Enterprise Data" over "Foundation
   Suite", "Revenue" over "Acceleration".

   Breaks that would leave a connector hanging at the end of the first line are
   penalised rather than forbidden — "Data Trust &" dangling is worse than a
   slightly less even split, but a bad split still beats none. */
export function splitHeading(text) {
  const words = text.split(' ');
  /* Two words is enough to split — the pillar titles are all exactly two, and
     one word per line is what makes them a matching pair. Only a single word
     has nowhere to break. */
  if (words.length < 2) return [text, ' '];

  let bestAt = 1;
  let bestCost = Infinity;
  for (let i = 1; i < words.length; i += 1) {
    const head = words.slice(0, i).join(' ');
    const tail = words.slice(i).join(' ');
    let cost = Math.abs(head.length - tail.length);
    if (HANGING.has(words[i - 1].toLowerCase())) cost += 12;
    if (cost < bestCost) {
      bestCost = cost;
      bestAt = i;
    }
  }
  return [words.slice(0, bestAt).join(' '), words.slice(bestAt).join(' ')];
}
