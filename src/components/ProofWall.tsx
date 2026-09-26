import { useLang } from '../contexts/LangContext';
import DocPlaceholder from './DocPlaceholder';

// The page previously rendered no student proof at all - Testimonials.tsx only
// ever showed accreditation cards, and the three testimonial strings in
// translations.ts were never mounted anywhere.
//
// This is the replacement, built on the proof the agency actually holds:
// redacted offer letters and visa approvals. For this market a real offer
// letter from a named university is stronger than a stock portrait, and it is
// something a competing agency cannot fake as easily.
//
// Written testimonials are intentionally absent. The three in translations.ts
// are unverified, and publishing invented student reviews under a registered UK
// company is not worth the exposure. The slot below is ready for real ones.
export default function ProofWall() {
  const { t } = useLang();

  const items = [
    { title: t.pf1t, desc: t.pf1d },
    { title: t.pf2t, desc: t.pf2d },
    { title: t.pf3t, desc: t.pf3d },
    { title: t.pf4t, desc: t.pf4d },
  ];

  return (
    <section className="pw-section">
      <div className="pw-inner">
        <div className="section-label reveal"><div className="dot" /><span>{t.proofLbl}</span></div>
        <h2 className="section-h2 reveal">{t.proofTitle}</h2>
        <p className="pw-sub reveal">{t.proofSub}</p>

        <div className="pw-grid">
          {items.map((it, i) => (
            <figure className={`pw-card reveal reveal-delay-${(i % 3) + 1}`} key={i}>
              <div className="pw-doc">
                <DocPlaceholder label={t.proofPending} lines={4} />
              </div>
              <figcaption>
                <div className="pw-card-t">{it.title}</div>
                <div className="pw-card-d">{it.desc}</div>
              </figcaption>
            </figure>
          ))}
        </div>
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
          grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
          gap: 20px;
        }
        .pw-card {
          /* Grid items default to min-width:auto; without this the document
             placeholder's intrinsic width pushes the two-up mobile grid wider
             than the screen. */
          min-width: 0;
          background: #fff; border: 1.5px solid var(--border);
          border-radius: 20px; padding: 16px;
          display: flex; flex-direction: column; gap: 14px;
          transition: border-color .3s, box-shadow .3s, transform .3s;
        }
        .pw-card:hover {
          border-color: var(--o-mid);
          box-shadow: 0 16px 40px rgba(255,90,10,.08);
          transform: translateY(-3px);
        }
        .pw-doc { aspect-ratio: 3 / 4; }
        .pw-card-t { font-size: 14px; font-weight: 800; color: var(--navy); letter-spacing: -.1px; }
        .pw-card-d { font-size: 12.5px; color: var(--sub); line-height: 1.6; margin-top: 3px; }

        @media (max-width: 640px) {
          .pw-section { padding: 64px 20px; }
          .pw-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
          .pw-card { padding: 11px; border-radius: 16px; gap: 10px; }
          .pw-sub { font-size: 14px; margin-bottom: 32px; }
        }
      `}</style>
    </section>
  );
}
