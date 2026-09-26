import { useEffect, useRef, useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import { useLang } from '../contexts/LangContext';
import { OFFERS, offerSrc } from '../data/offers';

// The first thing a visitor does on mobile is swipe the images, so every slide
// has a job: three real offer letters, the fee model, then accreditation.
//
// The stock photo of graduates in red gowns that used to open this carousel is
// gone - it was a library image with no connection to the agency, and it was
// sitting where the actual proof belongs.
//
// Letters are cropped to the top (object-position: top) rather than letterboxed:
// the university crest and the opening line are the recognisable part, and a
// full portrait page would not fit above the fold.
type SlideKind = 'doc' | 'statement' | 'logos';

interface Slide {
  kind: SlideKind;
  title: string;
  desc: string;
  img?: string;
}

export default function HeroCarousel() {
  const { t } = useLang();
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const featured = OFFERS.slice(0, 3);

  const slides: Slide[] = [
    ...featured.map((o) => ({
      kind: 'doc' as SlideKind,
      title: o.uni,
      desc: o.course,
      img: offerSrc(o),
    })),
    { kind: 'statement', title: t.car4t, desc: t.car4d },
    { kind: 'logos', title: t.car5t, desc: t.car5d },
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
              {s.kind === 'doc' && (
                <img
                  src={s.img}
                  alt={`${s.title} — ${s.desc}`}
                  className="hc-doc-img"
                  loading={i === 0 ? 'eager' : 'lazy'}
                  width={900}
                  height={675}
                />
              )}

              {s.kind === 'statement' && (
                <div className="hc-statement">
                  <div className="hc-statement-figure">£0</div>
                  <div className="hc-statement-line">{t.car4t}</div>
                  <div className="hc-statement-sub">{t.car4d}</div>
                </div>
              )}

              {s.kind === 'logos' && (
                <div className="hc-logos">
                  <img src="/logos/british-council.png" alt="British Council" loading="lazy" />
                  <div className="hc-logos-rule" />
                  <img src="/logos/icef.png" alt="ICEF" loading="lazy" />
                  <div className="hc-logos-badge">
                    <ShieldCheck size={13} strokeWidth={2.5} />
                    <span>No. 16049326</span>
                  </div>
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
            aria-label={`${i + 1} / ${slides.length}`}
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
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .hc-doc-img {
          width: 100%; height: 100%;
          object-fit: cover;
          object-position: top center;
          display: block;
          background: #fff;
        }

        /* --- fee-model slide --- */
        .hc-statement {
          text-align: center;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 7px; padding: 14px 20px;
        }
        .hc-statement-figure {
          font-family: var(--font-display);
          font-size: clamp(46px, 8vw, 66px);
          font-weight: 700; line-height: 1;
          color: var(--o);
        }
        .hc-statement-line {
          font-family: var(--font-display);
          font-size: clamp(16px, 2.3vw, 20px);
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
          gap: 14px; width: 100%; padding: 14px 20px;
        }
        .hc-logos img { max-width: 160px; max-height: 48px; object-fit: contain; }
        .hc-logos-rule { width: 40px; height: 1px; background: var(--border); }
        .hc-logos-badge {
          display: inline-flex; align-items: center; gap: 6px;
          margin-top: 2px; padding: 5px 12px; border-radius: 100px;
          background: var(--navy); color: #fff;
          font-size: 11px; font-weight: 700; letter-spacing: .4px;
        }

        /* --- caption + dots --- */
        .hc-caption { padding: 11px 4px 0; }
        .hc-caption-t {
          font-size: 13.5px; font-weight: 800; color: var(--navy);
          letter-spacing: -.1px;
        }
        .hc-caption-d {
          font-size: 12px; color: var(--sub);
          line-height: 1.5; margin-top: 2px;
        }
        .hc-dots {
          display: flex; justify-content: center;
          gap: 7px; margin-top: 11px;
        }
        .hc-dot {
          width: 7px; height: 7px; border-radius: 50%;
          border: none; padding: 0;
          background: var(--border);
          cursor: pointer; transition: all .25s;
        }
        .hc-dot.active { background: var(--o); width: 22px; border-radius: 4px; }
      `}</style>
    </div>
  );
}
