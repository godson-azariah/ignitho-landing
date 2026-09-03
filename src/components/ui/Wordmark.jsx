/* The logo, in the two versions the page needs.

   It is a three-line lockup — "Ignitho's" over FRIEND over FRAMEWORK — not a
   single word, so it is sized by HEIGHT and the width follows. Anything that
   sets a width instead will squash it the first time the box changes.

   TWO FILES, BECAUSE ONE CANNOT WORK ON BOTH GROUNDS. "Ignitho's" is set in a
   plum so dark it measures 1.4:1 against the violet the phone menu is painted
   in — on that surface a third of the logo simply is not there. The light
   version is the same artwork with every near-black pixel taken to white, so
   the FRIEND gradient and the green dot over the i are untouched and only the
   parts that would have disappeared change.

   Both are cut from the supplied master, which is 2000x2000 with the logo
   sitting in the middle 10 per cent of it. Dropped in as it came, a 34px-tall
   box would have held about 11px of logo and 23px of nothing. These are
   trimmed to the ink and scaled to 640 wide, which is three times what the
   largest placement asks for and a fifth of the file size.

   `alt` carries the full name because this is the site's name, and on the
   pages where it is a link back to the top it is the only thing naming the
   destination. */

const SRC = {
  ink: '/friend-logo.png',
  light: '/friend-logo-light.png'
};

export function Wordmark({ tone = 'ink', className = '' }) {
  return (
    <img
      src={SRC[tone] ?? SRC.ink}
      alt="Ignitho's FRIEND Framework"
      width={640}
      height={235}
      /* `w-auto` and not a width: the caller sets a height and the aspect ratio
         does the rest. The intrinsic pair above is here so the row does not
         reflow when the file lands — the browser reserves the right box before
         it has the image. */
      className={`block w-auto select-none ${className}`}
      draggable={false}
    />
  );
}
