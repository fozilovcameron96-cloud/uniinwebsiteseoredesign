import { useEffect, useRef, useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import { useLang } from '../contexts/LangContext';
import DocPlaceholder from './DocPlaceholder';

// Replaces the single static hero photo. The first thing a visitor does on
// mobile is swipe the images, so every slide has one job rather than being
// decorative:
//   1 photo     - what this is
//   2 doc       - transformation (offer letter)
//   3 doc       - transformation (visa approval)
//   4 statement - the #1 objection, pre-handled (cost / "is this a scam")
//   5 logos     - credibility
//   6 collage   - volume of proof
//
// Built on CSS scroll-snap rather than a carousel library: native momentum
// swipe on mobile, keyboard/scrollbar support for free, no new dependency
// (see .bolt/prompt).
type SlideKind = 'photo' | 'doc' | 'statement' | 'logos' | 'collage';

interface Slide {
  kind: SlideKind;
  title: string;
  desc: string;
}

export default function HeroCarousel() {
  const { t } = useLang();
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const slides: Slide[] = [
    { kind: 'photo', title: t.car1t, desc: t.car1d },
    { kind: 'doc', title: t.car2t, desc: t.car2d },
    { kind: 'doc', title: t.car3t, desc: t.car3d },
    { kind: 'statement', title: t.car4t, desc: t.car4d },
    { kind: 'logos', title: t.car5t, desc: t.car5d },
    { kind: 'collage', title: t.car6t, desc: t.car6d },
  ];

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

  const go = (i: number) => {
    const el = trackRef.current;
    if (el) el.scrollTo({ left: i * el.clientWidth, behavior: 'smooth' });
  };

  return (
    <div className="hc">
      <div className="hc-track" ref={trackRef}>
        {slides.map((s, i) => (
          <div className="hc-slide" key={i}>
            <div className="hc-visual">
              {s.kind === 'photo' && (
                <img
                  src="/images/hero-graduates.jpg"
                  alt="Students who studied abroad with Universe In"
                  className="hc-photo"
                  loading={i === 0 ? 'eager' : 'lazy'}
                />
              )}

              {s.kind === 'doc' && <DocPlaceholder label={t.proofPending} />}

              {s.kind === 'statement' && (
                <div className="hc-statement">
                  <div className="hc-statement-figure">£0</div>
                  <div className="hc-statement-line">{t.car4t}</div>
                  <div className="hc-statement-sub">{t.rr1d}</div>
                </div>
              )}

              {s.kind === 'logos' && (
                <div className="hc-logos">
                  <img src="/logos/british-council.png" alt="British Council" />
                  <div className="hc-logos-rule" />
                  <img src="/logos/icef.png" alt="ICEF" />
                  <div className="hc-logos-badge">
                    <ShieldCheck size={13} strokeWidth={2.5} />
                    <span>No. 16049326</span>
                  </div>
                </div>
              )}

              {s.kind === 'collage' && (
                <div className="hc-collage">
                  <DocPlaceholder label={t.proofPending} lines={3} compact />
                  <DocPlaceholder label={t.proofPending} lines={3} compact />
                  <DocPlaceholder label={t.proofPending} lines={3} compact />
                </div>
              )}
            </div>

            <div className="hc-caption">
              <div className="hc-caption-t">{s.title}</div>
              <div className="hc-caption-d">{s.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="hc-dots">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`hc-dot${active === i ? ' active' : ''}`}
            onClick={() => go(i)}
            aria-label={`Slide ${i + 1} of ${slides.length}`}
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
          border-radius: 24px;
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
          border-radius: 24px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 18px;
        }
        .hc-photo {
          width: 100%; height: 100%;
          object-fit: cover;
          border-radius: 14px;
          margin: -18px;
          max-width: calc(100% + 36px);
        }

        /* --- objection-handler slide --- */
        .hc-statement {
          text-align: center;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 8px; padding: 8px 18px;
        }
        .hc-statement-figure {
          font-family: var(--font-display);
          font-size: clamp(52px, 9vw, 76px);
          font-weight: 700; line-height: 1;
          color: var(--o);
        }
        .hc-statement-line {
          font-family: var(--font-display);
          font-size: clamp(17px, 2.4vw, 21px);
          font-weight: 600; color: var(--navy);
        }
        .hc-statement-sub {
          font-size: 12px; line-height: 1.6;
          color: var(--sub); max-width: 280px;
        }

        /* --- credibility slide --- */
        .hc-logos {
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 16px; width: 100%; padding: 8px 20px;
        }
        .hc-logos img { max-width: 170px; max-height: 54px; object-fit: contain; }
        .hc-logos-rule { width: 40px; height: 1px; background: var(--border); }
        .hc-logos-badge {
          display: inline-flex; align-items: center; gap: 6px;
          margin-top: 4px; padding: 5px 12px; border-radius: 100px;
          background: var(--navy); color: #fff;
          font-size: 11px; font-weight: 700; letter-spacing: .4px;
        }

        /* --- proof collage --- */
        .hc-collage {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 9px; width: 100%; height: 100%;
        }

        /* --- caption + dots --- */
        .hc-caption { padding: 14px 4px 0; }
        .hc-caption-t {
          font-size: 14px; font-weight: 800; color: var(--navy);
          letter-spacing: -.1px;
        }
        .hc-caption-d {
          font-size: 12.5px; color: var(--sub);
          line-height: 1.6; margin-top: 3px;
        }
        .hc-dots {
          display: flex; justify-content: center;
          gap: 7px; margin-top: 14px;
        }
        .hc-dot {
          width: 7px; height: 7px; border-radius: 50%;
          border: none; padding: 0;
          background: var(--border);
          cursor: pointer; transition: all .25s;
        }
        .hc-dot.active { background: var(--o); width: 22px; border-radius: 4px; }

        @media (max-width: 640px) {
          .hc-caption-d { font-size: 12px; }
          .hc-collage { gap: 6px; }
        }
      `}</style>
    </div>
  );
}
