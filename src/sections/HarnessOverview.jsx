/* The overview film. It plays, muted and on a loop, as soon as the section
   comes into view, and pauses when it leaves. There are no controls and no
   full screen: the film is part of the page. Over it the pointer becomes a
   sound badge that says what a click will do (turn the sound on, or off),
   and a click does it. On a touch screen the same badge sits in the corner.

   THE REVEAL. As the section scrolls in, the film arrives at the full width
   of the screen with square corners, and settles to its own size, corners
   rounding, by the time it is well into view. It is one scale on the frame,
   tied to scroll, with the corner radius divided by the same scale so the
   corners stay true. Under reduced motion it simply sits at its size.

   The play-button version is kept in design-research/backup. */

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowRight, Volume2, VolumeX } from 'lucide-react';
import { FadeIn } from '../components/ui/FadeIn.jsx';
import { SectionLabel } from '../components/ui/SectionLabel.jsx';
import { CornerMark } from '../components/ui/CornerMark.jsx';
import { Button } from '../components/ui/Button.jsx';
import { SHELL } from '../lib/layout.js';

const RADIUS = 24;

const prefersReduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true;

/* smoothstep, so the settle has no hard start or stop */
const ease = (t) => t * t * (3 - 2 * t);

export function HarnessOverview({ onExploreHarness }) {
  const frameRef = useRef(null);
  const videoRef = useRef(null);
  const badgeRef = useRef(null);
  const [muted, setMuted] = useState(true);
  const [hot, setHot] = useState(false);

  /* play in view, pause out of it */
  useEffect(() => {
    const frame = frameRef.current;
    const video = videoRef.current;
    if (!frame || !video || typeof IntersectionObserver === 'undefined') return undefined;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.35 }
    );
    io.observe(frame);
    return () => io.disconnect();
  }, []);

  /* the reveal: full width on the way in, its own size once it is in */
  useEffect(() => {
    const frame = frameRef.current;
    if (!frame || prefersReduced()) return undefined;
    let raf = 0;
    const draw = () => {
      raf = 0;
      const vh = window.innerHeight;
      const w = frame.offsetWidth || 1;
      const big = Math.max(1, document.documentElement.clientWidth / w);
      const top = frame.parentElement.getBoundingClientRect().top;
      const p = Math.min(1, Math.max(0, (vh - top) / (vh * 0.8)));
      const s = big + (1 - big) * ease(p);
      frame.style.transform = `scale(${s.toFixed(4)})`;
      /* the corners stay the final radius on screen throughout: the radius
         is divided by the scale so it never grows or squares off */
      frame.style.borderRadius = `${(RADIUS / s).toFixed(2)}px`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(draw);
    };
    draw();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  /* THE TIMELINE: a bar along the foot of the film showing where it is, and
     letting the viewer drag or press to any point, or step with the arrow
     keys. Its fill is written straight to the node each frame, so it moves
     smoothly rather than in the video's quarter-second time updates. Its
     presses never reach the frame, so scrubbing does not toggle the sound,
     and the sound badge steps aside while the pointer is on it. */
  const trackRef = useRef(null);
  const fillRef = useRef(null);
  const [time, setTime] = useState({ at: 0, len: 0 });
  const scrub = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;
    let raf = 0;
    let lastSec = -1;
    const tick = () => {
      const len = video.duration || 0;
      const at = video.currentTime || 0;
      if (fillRef.current && len) fillRef.current.style.transform = `scaleX(${(at / len).toFixed(4)})`;
      const sec = Math.floor(at);
      if (sec !== lastSec) {
        lastSec = sec;
        setTime({ at, len });
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const seekTo = (clientX) => {
    const video = videoRef.current;
    const track = trackRef.current;
    if (!video || !track || !video.duration) return;
    const r = track.getBoundingClientRect();
    const f = Math.min(1, Math.max(0, (clientX - r.left) / r.width));
    video.currentTime = f * video.duration;
  };
  const onTrackDown = (e) => {
    e.stopPropagation();
    scrub.current = true;
    e.currentTarget.setPointerCapture?.(e.pointerId);
    seekTo(e.clientX);
  };
  const onTrackMove = (e) => {
    if (scrub.current) seekTo(e.clientX);
  };
  const onTrackUp = (e) => {
    scrub.current = false;
    e.currentTarget.releasePointerCapture?.(e.pointerId);
  };
  const onTrackKey = (e) => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    const step = e.shiftKey ? 10 : 5;
    if (e.key === 'ArrowRight') video.currentTime = Math.min(video.duration, video.currentTime + step);
    else if (e.key === 'ArrowLeft') video.currentTime = Math.max(0, video.currentTime - step);
    else if (e.key === 'Home') video.currentTime = 0;
    else if (e.key === 'End') video.currentTime = video.duration - 0.1;
    else return;
    e.preventDefault();
    e.stopPropagation();
  };
  const clock = (t) => `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, '0')}`;

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
    if (video.paused) video.play().catch(() => {});
  };

  /* any scroll puts the badge away at once, and it stays away until the
     pointer itself moves again */
  useEffect(() => {
    const off = () => setHot(false);
    window.addEventListener('scroll', off, { passive: true });
    window.addEventListener('wheel', off, { passive: true });
    return () => {
      window.removeEventListener('scroll', off);
      window.removeEventListener('wheel', off);
    };
  }, []);

  /* the badge follows the pointer, fixed to the screen */
  const move = (e) => {
    const b = badgeRef.current;
    if (b) b.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
  };

  const Icon = muted ? VolumeX : Volume2;
  const label = muted ? 'Sound on' : 'Sound off';

  return (
    <section id="harness-overview" className="hv bg-c dots relative py-16 md:py-24">
      <div className={SHELL}>
        <CornerMark className="-top-7 left-1 md:left-3" />
        <CornerMark className="-top-7 right-1 md:right-3" />

        <FadeIn className="reveal-soft plate mx-auto max-w-4xl text-center">
          <SectionLabel index="04" centered>
            Method Overview
          </SectionLabel>
          <h2 className="sec-title mt-5">
            <span>See the method</span>
            <span className="sec-accent">in action</span>
          </h2>
          <p className="mx-auto mt-5 max-w-[60ch] text-[15.5px] leading-[1.6] text-ig-muted md:text-[17px]">
            See how business intent moves through governed orchestration, validation and
            production-ready output
          </p>
        </FadeIn>

        <div className="hv-wrap">
          <div
            ref={frameRef}
            className={`hv-frame ${hot ? 'is-hot' : ''}`}
            role="button"
            tabIndex={0}
            aria-label={muted ? 'Turn the sound on' : 'Turn the sound off'}
            onClick={toggle}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggle();
              }
            }}
            onPointerMove={(e) => {
              /* only a real movement of the pointer shows the badge; content
                 scrolling under a still pointer never does */
              move(e);
              setHot(true);
            }}
            onPointerLeave={() => setHot(false)}
          >
            {/* eslint-disable-next-line jsx-a11y/media-has-caption -- no
                caption track exists for this file yet */}
            <video
              ref={videoRef}
              src="/harness-overview.mp4"
              preload="metadata"
              muted
              loop
              playsInline
              disablePictureInPicture
              className="hv-video"
            />
            {/* the same badge, parked in the corner, for touch screens */}
            <span className="hv-corner" aria-hidden="true">
              <Icon strokeWidth={2} />
            </span>

            <div
              className="hv-bar"
              onClick={(e) => e.stopPropagation()}
              onPointerEnter={() => setHot(false)}
              onPointerMove={(e) => {
                e.stopPropagation();
                setHot(false);
              }}
            >
              <span className="hv-time">{clock(time.at)}</span>
              <div
                ref={trackRef}
                className="hv-track"
                role="slider"
                tabIndex={0}
                aria-label="Seek the video"
                aria-valuemin={0}
                aria-valuemax={Math.round(time.len)}
                aria-valuenow={Math.round(time.at)}
                aria-valuetext={`${clock(time.at)} of ${clock(time.len)}`}
                onPointerDown={onTrackDown}
                onPointerMove={onTrackMove}
                onPointerUp={onTrackUp}
                onPointerCancel={onTrackUp}
                onKeyDown={onTrackKey}
              >
                <span className="hv-rail">
                  <span ref={fillRef} className="hv-fill" />
                </span>
              </div>
              <span className="hv-time">{clock(time.len)}</span>
            </div>
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <Button
            onClick={onExploreHarness}
            variant="light"
            className="px-6 py-3.5 text-[13px] font-semibold"
          >
            Explore the method
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {typeof document !== 'undefined' &&
        createPortal(
          <span ref={badgeRef} className={`hv-badge ${hot ? 'is-on' : ''}`} aria-hidden="true">
            <span className="hv-badge-in">
              <Icon strokeWidth={2} />
              {label}
            </span>
          </span>,
          document.body
        )}
    </section>
  );
}
