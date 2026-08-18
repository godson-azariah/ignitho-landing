/* ==========================================================================
   PLAIN-ENGLISH GUIDE  ·  THE MEASUREMENTS THE ILLUSTRATED WINDOWS SHARE

   WHERE YOU SEE THIS
     Inside the product windows beside "Four steps, days not months".

   WHAT IS IN HERE
     · The white window: its rounded corners, thin line and three-layer
       shadow, written once so all four panels match.
     · The three type sizes used inside the windows — a label, a value,
       and a micro-caption.
     · The tint used for a selected row, and the two window positions,
       one wide at the top and one narrow at the bottom.

   WORTH KNOWING
     No components live here, only measurements. Anything drawn is in
     chrome.jsx next door, which is what keeps hot-reloading working.
   ========================================================================== */

import { SUITES } from '../../../data/suites.js';
import { TABS } from '../../../data/navigation.js';

export const SHADOW =
  'shadow-[0_1px_2px_rgba(22,6,58,0.18),0_10px_20px_-6px_rgba(22,6,58,0.22),0_36px_64px_-20px_rgba(22,6,58,0.32)]';
export const WIN = `relative overflow-hidden rounded-[14px] bg-white ring-1 ring-inset ring-ig-purple/[0.16] ${SHADOW}`;
export const RULE = 'border-ig-purple/[0.11]';
export const MICRO = 'font-mono text-[8.5px] font-bold tracking-[0.055em] text-ig-divider';
export const LABEL = 'font-mono text-[9.5px] font-bold tracking-[0.055em] text-ig-muted';
export const VALUE = 'font-mono text-[9.5px] font-bold tracking-[0.03em] text-ig-ink';
/* Selection: a violet tint with ink type, never a violet fill with white type.
   Nothing inside these panels goes dark. */
export const PICKED = 'bg-ig-purple/[0.11] text-ig-ink ring-1 ring-inset ring-ig-purple/25';

export const TOP = 'mg w-[82%]';
export const BOT = 'mg relative z-10 -mt-[22px] hidden w-[60%] sm:block';

export const at = (ms, more) => ({ '--mg-d': `${ms}ms`, ...more });
export const UP = { '--mg-x': '0px', '--mg-y': '101%' };

export const FOUNDATIONS = SUITES.filter((s) => s.type === 'foundation').slice(0, 3);
export const FOUNDATION_TAB = TABS.find((t) => t.id === 'FOUNDATION')?.label ?? '';
export const CHOSEN = FOUNDATIONS[1] ?? FOUNDATIONS[0];
