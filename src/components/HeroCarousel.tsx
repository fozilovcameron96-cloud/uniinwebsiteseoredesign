import { useCallback, useEffect, useRef, useState } from 'react';
import { OFFERS, offerSrc } from '../data/offers';

// Every real offer letter the agency has, cycling on its own.
//
// The fee-model and accreditation slides that used to sit in here are gone:
// both messages already appear in the hero copy and in their own sections, and
// with twelve letters ahead of them they would have landed at slide 13 where
// nobody would ever reach them.
//
// Letters crop to the top (object-position: top) rather than letterboxing - the
// crest and opening line are the recognisable part, and a full portrait page
// would not fit above the fold.
const ADVANCE_MS = 3500;

export default function HeroCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  // Autoplay is a nicety, so anything that suggests the visitor wants control
  // ends it permanently rather than fighting them for the scroll position.
  const [userTookOver, setUserTookOver] = useState(false);
  const [visible, setVisible] = useState(true);

  const scrollToIndex = useCallback((i: number, smooth = true) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: i * el.clientWidth, behavior: smooth ? 'smooth' : 'auto' });
  }, []);

  // Track which slide is showing, from the scroll position rather than from a
  // counter, so manual swipes and autoplay can never disagree.
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onScroll = () => {
      if (!el.clientWidth) return;
      setActive(Math.round(el.scrollLeft / el.clientWidth));
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  // Hand control over for good on the first touch, drag or wheel.
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const stop = () => setUserTookOver(true);
    const opts = { passive: true } as const;
    el.addEventListener('pointerdown', stop, opts);
    el.addEventListener('touchstart', stop, opts);
    el.addEventListener('wheel', stop, opts);
    return () => {
      el.removeEventListener('pointerdown', stop);
      el.removeEventListener('touchstart', stop);
      el.removeEventListener('wheel', stop);
    };
  }, []);

  // Don't animate a carousel nobody is looking at - off-screen or on a
  // background tab it is pure battery cost on a phone.
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => setVisible(e.isIntersecting),
      { threshold: 0.35 }
    );
    io.observe(el);
    const onVis = () => setVisible(!document.hidden);
    document.addEventListener('visibilitychange', onVis);
    return () => { io.disconnect(); document.removeEventListener('visibilitychange', onVis); };
  }, []);

  useEffect(() => {
    if (userTookOver || !visible) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;

    const id = window.setInterval(() => {
      const el = trackRef.current;
      if (!el || !el.clientWidth) return;
      const i = Math.round(el.scrollLeft / el.clientWidth);
      const next = i + 1;
      // Rewinding twelve slides with smooth scrolling looks like a glitch, so
      // the wrap jumps instead.
      if (next >= OFFERS.length) scrollToIndex(0, false);
      else scrollToIndex(next, true);
    }, ADVANCE_MS);

    return () => window.clearInterval(id);
  }, [userTookOver, visible, scrollToIndex]);

  const go = (i: number) => { setUserTookOver(true); scrollToIndex(i); };

  return (
    <div className="hc">
      <div className="hc-track" ref={trackRef}>
        {OFFERS.map((o, i) => (
          <div className="hc-slide" key={o.src}>
            <div className="hc-visual">
              <img
                src={offerSrc(o)}
                alt={`${o.uni} — ${o.course}`}
                className="hc-doc-img"
                /* The first few carry the fold; the rest can wait. */
                loading={i < 3 ? 'eager' : 'lazy'}
                decoding="async"
                width={900}
                height={675}
              />
            </div>
            <div className="hc-caption">
              <div className="hc-caption-t">{o.uni}</div>
              <div className="hc-caption-d">{o.course}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="hc-dots">
        {OFFERS.map((o, i) => (
          <button
            key={o.src}
            className={`hc-dot${active === i ? ' active' : ''}`}
            onClick={() => go(i)}
            aria-label={`${o.uni} (${i + 1}/${OFFERS.length})`}
            aria-current={active === i}
          />
        ))}
      </div>

      <style>{`
        .hc { position: relative; }
        .hc-track {
          display: flex;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          scrollbar-width: none;
          -ms-overflow-style: none;
          border-radius: 20px;
        }
        .hc-track::-webkit-scrollbar { display: none; }
        .hc-slide {
          flex: 0 0 100%;
          scroll-snap-align: start;
          display: flex;
          flex-direction: column;
        }
        .hc-visual {
          aspect-ratio: 4 / 3;
          background: var(--bg2);
          border: 1.5px solid var(--border);
          border-radius: 20px;
          overflow: hidden;
        }
        .hc-doc-img {
          width: 100%; height: 100%;
          object-fit: cover;
          object-position: top center;
          display: block;
          background: #fff;
        }

        .hc-caption { padding: 11px 4px 0; }
        .hc-caption-t {
          font-size: 13.5px; font-weight: 800; color: var(--navy);
          letter-spacing: -.1px;
        }
        .hc-caption-d {
          font-size: 12px; color: var(--sub);
          line-height: 1.5; margin-top: 2px;
        }

        /* Twelve dots need to stay compact enough not to wrap on a phone. */
        .hc-dots {
          display: flex; justify-content: center; flex-wrap: wrap;
          gap: 5px; margin-top: 11px;
        }
        .hc-dot {
          width: 6px; height: 6px; border-radius: 50%;
          border: none; padding: 0;
          background: var(--border);
          cursor: pointer; transition: all .25s;
        }
        .hc-dot.active { background: var(--o); width: 18px; border-radius: 3px; }
      `}</style>
    </div>
  );
}
