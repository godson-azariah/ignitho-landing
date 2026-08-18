/* ==========================================================================
   PLAIN-ENGLISH GUIDE  ·  THE CONTACT SALES FORM

   WHERE YOU SEE THIS
     Opens over whatever page you are on, from any Contact Sales button.

   WHAT IS IN HERE
     · A dark violet panel down the left with the invitation on it, and
       the form on the right: name, work email, company, job title,
       country, industry, and a message box.
     · A privacy note under the Submit button.
     · The Escape key closes it, as does clicking outside it.

   WORTH KNOWING
     IT IS NOT CONNECTED YET. The form checks what you typed and then
     says plainly that it cannot send, offering info@ignitho.com instead
     — rather than thanking you for a message that went nowhere.
     Connecting it is one line in data/navigation.js.
   ========================================================================== */

import { useState } from 'react';
import { ArrowRight, Check, Mail, X } from 'lucide-react';
import { SelectField } from './SelectField.jsx';
import { PrimaryButton } from '../ui/Button.jsx';
import { FORM_FIELD } from '../../lib/layout.js';
import { useOverlay } from '../../hooks/useOverlay.js';
import {
  CONTACT_COUNTRIES,
  CONTACT_EMAIL,
  CONTACT_ENDPOINT,
  CONTACT_INDUSTRIES
} from '../../data/navigation.js';

/* The contact form, as a dialog over the page.

   TWO PANELS, WHICH IS THE SHAPE THE REFERENCE USES AND THE RIGHT ONE: the left
   says why you are here and the right is the work. On our palette that becomes
   the page's own dark bookend ground on the left — the same `aurora` the hero and
   the closing section stand on — against a white form. It is the only place on
   the page where those two grounds meet inside one box, and that is what makes
   the panel read as a moment rather than as another section.

   The left panel is hidden below `lg`. On a phone a form is the whole screen and
   a decorative half would push every field below the fold.

   FIELDS AND VALIDATION MATCH THE REFERENCE EXACTLY: name, surname, business
   e-mail, company, industry, country, message with a 2000-character counter, and
   the five that carry an asterisk are the five that are required. What is ours is
   the copy and the options — the industries are the catalogue's six verticals,
   the countries are the markets the offices on our map sit in. */
/* The one field surface, shared with `SelectField`'s trigger via `layout.js` so
   the selects and the inputs cannot drift apart. Only the placeholder colour is
   added here, since a button has no placeholder to colour. */
const FIELD = `${FORM_FIELD} placeholder:text-ig-muted/55`;
const LABEL = 'mb-1.5 block text-[11.5px] font-bold tracking-[-0.005em] text-ig-ink';
const ERR = 'mt-1 block font-mono text-[10px] tracking-[0.03em] text-ig-purple';
const MAX = 2000;

const BLANK = {
  name: '',
  surname: '',
  email: '',
  company: '',
  industry: '',
  country: '',
  message: ''
};

/* Required fields, and the one format check worth making. Nothing here tries to
   be clever about e-mail: a single `@` with something either side is the most any
   client-side check can honestly assert, and anything stricter rejects addresses
   that are perfectly valid. */
function validate(v) {
  const e = {};
  if (!v.name.trim()) e.name = 'Required';
  if (!v.surname.trim()) e.surname = 'Required';
  if (!v.email.trim()) e.email = 'Required';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) e.email = 'Enter a valid address';
  if (!v.company.trim()) e.company = 'Required';
  if (!v.industry) e.industry = 'Required';
  if (!v.country) e.country = 'Required';
  return e;
}

function Req() {
  return <span className="text-ig-purple">*</span>;
}

export function ContactDialog({ open, onClose }) {
  const [values, setValues] = useState(BLANK);
  const [errors, setErrors] = useState({});
  /* 'editing' | 'sending' | 'sent' | 'blocked' — `blocked` is the honest state
     for "validated, but there is nowhere to send it". */
  const [phase, setPhase] = useState('editing');

  useOverlay(open, onClose);
  if (!open) return null;

  const set = (k) => (ev) => {
    const next = ev.target.value;
    setValues((v) => ({ ...v, [k]: k === 'message' ? next.slice(0, MAX) : next }));
    /* Clear this field's error as it is corrected rather than waiting for the
       next submit — an error that persists while you fix it reads as broken. */
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const submit = async (ev) => {
    ev.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) return;

    if (!CONTACT_ENDPOINT) {
      setPhase('blocked');
      return;
    }
    setPhase('sending');
    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      });
      setPhase(res.ok ? 'sent' : 'blocked');
    } catch {
      setPhase('blocked');
    }
  };

  const close = () => {
    onClose();
    /* Reset on the way out, not the way in: a dialog that reopens holding a
       half-finished enquiry looks like it kept something it should not have. */
    setValues(BLANK);
    setErrors({});
    setPhase('editing');
  };

  return (
    <div
      className="fixed inset-0 z-[65] flex items-center justify-center bg-ig-ink/55 p-4 backdrop-blur-[5px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-title"
      onClick={close}
    >
      <div
        onClick={(ev) => ev.stopPropagation()}
        /* `max-w-5xl` — 1024px, which is what the reference dialog actually
           measures. At `3xl` the two-column field rows were 198px each: wide
           enough for the inputs and far too narrow for a form that is the only
           thing on the screen. At 1024 with a 34% panel they are 298px, which is
           where a name field stops looking like a search box.

           `w-full` with the backdrop's 16px of padding is the responsive half:
           the dialog is 343px on a phone, 736px on a tablet and 1024px capped
           from a laptop up. The field grid folds to one column below `sm` and
           the left panel drops out below `lg`, so nothing has to be scrolled
           sideways at any width. */
        className="pop-c relative flex max-h-full w-full max-w-5xl overflow-hidden rounded-[22px] bg-white shadow-[0_44px_100px_-28px_rgba(22,6,58,0.6),0_8px_24px_-12px_rgba(22,6,58,0.3)]"
      >
        {/* the left panel — the page's own dark ground, and the only decorative
            surface in the dialog. 34%, not 38%: the reference gives its panel
            29% and the form is the part that needed the width. */}
        {/* CENTRED, AND SET IN ONE FACE THROUGHOUT.

            The second line was `serif-accent` — Instrument Serif italic, which
            is the page's editorial voice and belongs on section headings where
            there is room for it to be read as a deliberate change of tone. In a
            348px panel at this size it just reads as a different font, so both
            lines are Urbanist now and the accent is carried by colour alone.

            The block centres on both axes with the wordmark pinned to the foot,
            rather than sitting at the top of a column with 300px of empty ground
            under it — centred text in a top-aligned box is the one arrangement
            that looks unfinished from every angle. */}
        <div className="aurora dots-inv relative hidden w-[34%] shrink-0 flex-col items-center justify-center p-8 text-center lg:flex">
          <div>
            <h2
              id="contact-title"
              className="font-extrabold leading-[1.08] tracking-[-0.035em] text-[34px] text-white xl:text-[38px]"
            >
              <span className="block">Tell us</span>
              <span className="block text-ig-sky">where to start</span>
            </h2>
            {/* Grounded in the page's central claim rather than written as
                atmosphere: every suite here is pre-built, so the first
                conversation genuinely is about a process and not about scoping
                a build. */}
            <p className="mt-5 text-[15px] leading-[1.55] text-ig-lavender xl:text-[16px]">
              Every suite in the catalogue is already built, so the first conversation is about
              your process rather than about scoping a build
            </p>
          </div>
          <span className="absolute bottom-8 font-mono text-[10.5px] font-bold tracking-[0.055em] text-ig-lavender/60">
            Ignitho AI
          </span>
        </div>

        {/* the form side — its own scroll, so the panel beside it never moves */}
        <div className="min-w-0 flex-1 overflow-y-auto p-6 sm:p-8">
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full text-ig-muted transition-colors hover:bg-ig-ink/[0.07] hover:text-ig-ink"
          >
            <X className="h-4 w-4" />
          </button>

          {phase === 'sent' ? (
            <div className="flex min-h-[280px] flex-col items-center justify-center text-center">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-ig-teal/[0.12] text-ig-teal">
                <Check className="h-5 w-5" strokeWidth={3} />
              </span>
              <p className="mt-5 text-[19px] font-extrabold tracking-[-0.02em] text-ig-ink">
                Thanks, that is with us
              </p>
              <p className="mt-2 max-w-sm text-[13.5px] leading-[1.5] text-ig-muted">
                Someone who has deployed the suite you asked about will pick this up
              </p>
              <div className="mt-6">
                <PrimaryButton onClick={close}>Close</PrimaryButton>
              </div>
            </div>
          ) : (
            <form onSubmit={submit} noValidate>
              <h3 className="pr-10 text-[19px] font-extrabold tracking-[-0.02em] text-ig-ink lg:text-[21px]">
                Contact information
              </h3>
              <p className="mt-1.5 text-[13px] leading-[1.5] text-ig-muted">
                For enterprise teams evaluating a suite or a single accelerator
              </p>

              <div className="mt-5 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                <span className="block">
                  <label className={LABEL} htmlFor="c-name">
                    Name <Req />
                  </label>
                  <input
                    id="c-name"
                    className={FIELD}
                    value={values.name}
                    onChange={set('name')}
                    autoComplete="given-name"
                  />
                  {errors.name && <span className={ERR}>{errors.name}</span>}
                </span>

                <span className="block">
                  <label className={LABEL} htmlFor="c-surname">
                    Surname <Req />
                  </label>
                  <input
                    id="c-surname"
                    className={FIELD}
                    value={values.surname}
                    onChange={set('surname')}
                    autoComplete="family-name"
                  />
                  {errors.surname && <span className={ERR}>{errors.surname}</span>}
                </span>

                <span className="block sm:col-span-2">
                  <label className={LABEL} htmlFor="c-email">
                    Business e-mail <Req />
                  </label>
                  <input
                    id="c-email"
                    type="email"
                    className={FIELD}
                    value={values.email}
                    onChange={set('email')}
                    autoComplete="email"
                  />
                  {errors.email && <span className={ERR}>{errors.email}</span>}
                </span>

                <span className="block sm:col-span-2">
                  <label className={LABEL} htmlFor="c-company">
                    Company <Req />
                  </label>
                  <input
                    id="c-company"
                    className={FIELD}
                    value={values.company}
                    onChange={set('company')}
                    autoComplete="organization"
                  />
                  {errors.company && <span className={ERR}>{errors.company}</span>}
                </span>

                {/* Both selects are ours rather than native, and only because a
                    native popup's DIRECTION is the platform's decision: with 199
                    countries it is 400-500px tall, so a field in the lower half
                    of a centred dialog gets it flipped upward and no CSS reaches
                    that. See `SelectField` — it also gets these two into our
                    palette and gives the country list a filter. */}
                <SelectField
                  id="c-industry"
                  label="Industry"
                  required
                  placeholder="Select industry"
                  options={CONTACT_INDUSTRIES}
                  value={values.industry}
                  onChange={set('industry')}
                  error={errors.industry}
                />

                <SelectField
                  id="c-country"
                  label="Country"
                  required
                  placeholder="Select country"
                  options={CONTACT_COUNTRIES}
                  value={values.country}
                  onChange={set('country')}
                  error={errors.country}
                />

                <span className="block sm:col-span-2">
                  <label className={LABEL} htmlFor="c-message">
                    Message
                  </label>
                  <textarea
                    id="c-message"
                    rows={3}
                    className={`${FIELD} resize-none`}
                    value={values.message}
                    onChange={set('message')}
                  />
                  {/* the reference's counter, and it is genuinely useful — the
                      field is capped, so without it the cap is invisible until
                      typing stops working */}
                  <span className="mt-1 block text-right font-mono text-[10px] tracking-[0.03em] text-ig-muted">
                    {values.message.length}/{MAX}
                  </span>
                </span>
              </div>

              {/* NOT A LINK, AND THAT IS DELIBERATE. The reference underlines
                  "privacy policy" and points it somewhere. I do not have the real
                  URL, and a href that guesses at one — or a `#` that goes
                  nowhere — is worse than plain text on a line about a legal
                  agreement. Give me the address and it becomes an anchor. */}
              <p className="mt-4 text-[11.5px] leading-[1.5] text-ig-muted">
                By submitting this form you confirm that you agree to Ignitho&rsquo;s privacy
                policy
              </p>

              {phase === 'blocked' && (
                <p className="mt-4 flex items-start gap-2 rounded-[10px] bg-ig-paper-2 px-3.5 py-3 text-[12.5px] leading-[1.5] text-ig-ink">
                  <Mail className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ig-purple" strokeWidth={2.4} />
                  <span>
                    This form is not connected to a mailbox yet, so nothing was sent. Write to{' '}
                    <span className="font-bold text-ig-purple">{CONTACT_EMAIL}</span> and it will
                    reach the same people
                  </span>
                </p>
              )}

              <div className="mt-6 flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={close}
                  className="text-[13.5px] font-semibold text-ig-muted transition-colors duration-300 hover:text-ig-ink"
                >
                  Back
                </button>
                <PrimaryButton type="submit" disabled={phase === 'sending'}>
                  {phase === 'sending' ? 'Sending' : 'Submit'}
                  <ArrowRight className="h-3.5 w-3.5" />
                </PrimaryButton>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
