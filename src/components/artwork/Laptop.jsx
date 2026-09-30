/* The laptop: a thin-bezelled lid with a notch, on a space-grey base. Its
   screen is whatever it is given. Used by the hero and the method section,
   so the product is always shown on the same device.

   It is sized by `--lw` (its width) on any ancestor; every part of it,
   and anything drawn in em on its screen, scales from that one number.
   Styles are in hero.css (.lap). */

export function Laptop({ className = '', children }) {
  return (
    <div className={`lap ${className}`} aria-hidden="true">
      <div className="lap-lid">
        <span className="lap-cam" />
        {children}
      </div>
      <div className="lap-base">
        <span />
      </div>
    </div>
  );
}
