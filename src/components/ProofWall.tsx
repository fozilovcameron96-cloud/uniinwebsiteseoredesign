import { useState } from 'react';
import { useLang } from '../contexts/LangContext';
import { OFFERS, offerSrc } from '../data/offers';

// Real redacted offer letters. Six are shown by default and the rest expand on
// click, so the section proves volume without adding a screen of scrolling to
// an already long page.
//
// Cards crop to the top of each letter: the crest and opening line are what
// make it recognisable at thumbnail size.
const INITIAL = 6;

export default function ProofWall() {
  const { t } = useLang();
  const [expanded, setExpanded] = useState(false);

  const shown = expanded ? OFFERS : OFFERS.slice(0, INITIAL);
  const hidden = OFFERS.length - INITIAL;

  return (
    <section className="pw-section">
      <div className="pw-inner">
        <div className="section-label reveal"><div className="dot" /><span>{t.proofLbl}</span></div>
        <h2 className="section-h2 reveal">{t.proofTitle}</h2>
        <p className="pw-sub reveal">{t.proofSub}</p>

        <div className="pw-grid">
          {shown.map((o, i) => (
            <figure className={`pw-card reveal reveal-delay-${(i % 3) + 1}`} key={o.src}>
              <div className="pw-doc">
                <img
                  src={offerSrc(o)}
                  alt={`${o.uni} — ${o.course}`}
                  loading="lazy"
                  width={900}
                  height={1200}
                />
              </div>
              <figcaption>
                <div className="pw-card-t">{o.uni}</div>
                <div className="pw-card-d">{o.course}</div>
              </figcaption>
            </figure>
          ))}
        </div>

        {!expanded && hidden > 0 && (
          <button className="pw-more reveal" onClick={() => setExpanded(true)}>
            {t.proofMore.replace('{n}', String(hidden))}
          </button>
        )}
      </div>

      <style>{`
        .pw-section { padding: 88px 24px; background: var(--bg2); border-top: 1px solid var(--border); }
        .pw-inner { max-width: 1140px; margin: 0 auto; }
        .pw-sub {
          font-size: 15px; line-height: 1.75; color: var(--sub);
          max-width: 560px; margin: 14px 0 44px;
        }
        .pw-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
          gap: 20px;
        }
        .pw-card {
          /* Grid items default to min-width:auto; without this the document
             image's intrinsic width pushes the mobile grid past the screen. */
          min-width: 0;
          background: #fff; border: 1.5px solid var(--border);
          border-radius: 18px; padding: 12px;
          display: flex; flex-direction: column; gap: 12px;
          transition: border-color .3s, box-shadow .3s, transform .3s;
        }
        .pw-card:hover {
          border-color: var(--o-mid);
          box-shadow: 0 16px 40px rgba(255,90,10,.08);
          transform: translateY(-3px);
        }
        .pw-doc {
          aspect-ratio: 3 / 4;
          border-radius: 10px; overflow: hidden;
          border: 1px solid var(--border);
          background: #fff;
        }
        .pw-doc img {
          width: 100%; height: 100%;
          object-fit: cover; object-position: top center;
          display: block;
        }
        .pw-card-t { font-size: 13.5px; font-weight: 800; color: var(--navy); letter-spacing: -.1px; }
        .pw-card-d { font-size: 12px; color: var(--sub); line-height: 1.5; margin-top: 2px; }

        .pw-more {
          display: block; margin: 32px auto 0;
          padding: 12px 26px; border-radius: 100px;
          background: #fff; border: 1.5px solid var(--border);
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 13.5px; font-weight: 700; color: var(--navy);
          cursor: pointer; transition: all .2s;
        }
        .pw-more:hover { border-color: var(--o); color: var(--o); }

        @media (max-width: 640px) {
          .pw-section { padding: 64px 20px; }
          .pw-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
          .pw-card { padding: 9px; border-radius: 14px; gap: 9px; }
          .pw-sub { font-size: 14px; margin-bottom: 30px; }
        }
      `}</style>
    </section>
  );
}
