/* The page's one button — a plain solid pill.

   It used to be a swap: three bands on a tilted track, the resting face sliding
   up and out as a second brand colour arrived behind it, a ripple, a scale, and
   two counter-rotating labels. All of that has gone. A hover state exists to
   confirm that a control is under the pointer, and moving the control to say so
   makes the eye follow something that is not going anywhere. So the pill now
   holds perfectly still and only its tone shifts, which is how Apple's buttons
   behave and why they feel like surfaces rather than animations.

   The shape is untouched: same full-round radius, same paddings, same type.

   The mechanism moved out of here entirely. There is no track to build, so
   there are no face elements, no middle band, no ripple layer and no invisible
   ghost copy sizing the pill — the children are simply the button's contents.
   The variant now picks a class rather than a set of colour utilities, and
   `buttons.css` maps that class to a resting tone and a hover tone.

   The exported names are kept as they are. Every call site on the page imports
   `SwapButton` or `TealButton`, and renaming a component across ten files is a
   large diff in service of nothing a reader of those files would notice. */

/* Resting tone · hover tone, both defined in `buttons.css`. Each pair is one
   hue at two weights — never two different brand colours, which is what the
   old arriving face was and what made a hover read as a change of intent. */
const VARIANT = {
  teal: 'btn--teal',
  violet: 'btn--violet',
  light: 'btn--light',
  ink: 'btn--ink'
};

/* `as` lets this render an anchor instead of a button, which the sign-in control
   needs: it navigates to another origin, and a thing that navigates has to be a
   link — for the middle-click, the copy-link, the status-bar preview and the
   "link" role a screen reader announces. Styling it as a button and handling the
   click in JS would take all of that away. `.btn` is `inline-flex`, so it works
   identically on either element. */
export function SwapButton({ as: Tag = 'button', children, className = '', variant = 'violet', ...rest }) {
  return (
    <Tag {...rest} className={`btn ${VARIANT[variant] || VARIANT.violet} ${className}`}>
      {children}
    </Tag>
  );
}

/* Teal — the primary action everywhere */
export function TealButton({ children, className = '', ...rest }) {
  return (
    <SwapButton
      {...rest}
      variant="teal"
      className={`px-6 py-3.5 text-[13px] font-semibold ${className}`}
    >
      {children}
    </SwapButton>
  );
}
