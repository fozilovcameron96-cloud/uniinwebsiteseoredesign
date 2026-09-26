import { useLang } from '../contexts/LangContext';

// Was Testimonials.tsx, which was a misnomer: it rendered only these
// accreditation cards and never mounted the tm1q/tm2q/tm3q strings, so the site
// shipped with no student proof at all. Renamed so the gap can't hide again -
// real proof now lives in ProofWall.tsx.
//
// All copy was previously hardcoded in English, which the Russian-speaking
// primary audience read untranslated. It now goes through translations.ts.
export default function Accreditation() {
  const { t } = useLang();

  const cards = [
    {
      logo: '/logos/british-council.png',
      alt: 'British Council',
      pill: t.acc1pill, name: t.acc1name, role: t.acc1role, desc: t.acc1desc,
      tags: [t.acc1tag1, t.acc1tag2, t.acc1tag3],
    },
    {
      logo: '/logos/icef.png',
      alt: 'ICEF',
      pill: t.acc2pill, name: t.acc2name, role: t.acc2role, desc: t.acc2desc,
      tags: [t.acc2tag1, t.acc2tag2, t.acc2tag3],
    },
  ];

  return (
    <section className="tm-section tm-section-dark">
      <div className="tm-inner">
        <div className="accred-section reveal">
          <div className="section-label accred-label-dark" style={{ justifyContent: 'center', marginBottom: 10 }}>
            <div className="dot" />
            <span>{t.accLbl}</span>
          </div>
          <h2
            className="section-h2 accred-h2-dark"
            style={{ textAlign: 'center', marginBottom: 8 }}
            dangerouslySetInnerHTML={{ __html: t.accTitle }}
          />
          <p className="accred-intro accred-intro-dark">{t.accSub}</p>

          <div className="accred-cards">
            {cards.map((c, i) => (
              <div className="accred-card-p" key={i}>
                <div className="accred-logo-wrap">
                  <img
                    src={c.logo}
                    alt={c.alt}
                    className="accred-img"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                </div>
                <div className="accred-pill">
                  <span className="accred-dot" />
                  {c.pill}
                </div>
                <div className="accred-name-p">{c.name}</div>
                <div className="accred-role-p">{c.role}</div>
                <p className="accred-desc-p">{c.desc}</p>
                <div className="accred-tags">
                  {c.tags.map((tag, j) => (
                    <span className="accred-tag" key={j}>{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="accred-trust-bar accred-trust-bar-dark">
            <div className="accred-trust-item"><span className="accred-check">✓</span> {t.accBar1}</div>
            <div className="accred-trust-sep" />
            <div className="accred-trust-item"><span className="accred-check">✓</span> {t.accBar2}</div>
            <div className="accred-trust-sep" />
            <div className="accred-trust-item"><span className="accred-check">✓</span> {t.accBar3}</div>
          </div>
        </div>
      </div>

      <style>{`
        .tm-section-dark {
          background: var(--navy);
          border-top-color: transparent;
        }
        .accred-label-dark span { color: var(--o); }
        .accred-h2-dark { color: #fff; }
        .accred-intro-dark { color: rgba(255,255,255,0.55); }
        .accred-trust-bar-dark { border-top-color: rgba(255,255,255,0.12); }
        .accred-trust-bar-dark .accred-trust-item { color: rgba(255,255,255,0.7); }
        .accred-trust-bar-dark .accred-trust-sep { background: rgba(255,255,255,0.15); }
        .accred-intro {
          text-align: center;
          font-size: 14px;
          color: var(--sub);
          max-width: 480px;
          margin: 0 auto 48px;
          line-height: 1.75;
        }
        .accred-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
          margin-bottom: 36px;
        }
        .accred-card-p {
          background: #fff;
          border: 1.5px solid var(--border);
          border-radius: 24px;
          padding: 32px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          transition: all 0.3s;
          position: relative;
          overflow: hidden;
        }
        .accred-card-p::before {
          content: "";
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--o), var(--o2));
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s;
        }
        .accred-card-p:hover::before { transform: scaleX(1); }
        .accred-card-p:hover {
          border-color: var(--o-mid);
          box-shadow: 0 16px 48px rgba(255,90,10,0.1);
          transform: translateY(-4px);
        }
        .accred-logo-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg2);
          border: 1.5px solid var(--border);
          border-radius: 16px;
          padding: 24px 32px;
          min-height: 100px;
        }
        .accred-img {
          width: 100%;
          max-width: 200px;
          max-height: 72px;
          object-fit: contain;
        }
        .accred-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: var(--o-light);
          border: 1px solid var(--o-mid);
          border-radius: 100px;
          padding: 5px 12px;
          font-size: 11px;
          font-weight: 700;
          color: var(--o);
          width: fit-content;
        }
        .accred-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--o);
        }
        .accred-name-p {
          font-size: 20px;
          font-weight: 800;
          color: var(--text);
        }
        .accred-role-p {
          font-size: 11px;
          color: var(--sub);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.8px;
        }
        .accred-desc-p {
          font-size: 13px;
          color: var(--sub);
          line-height: 1.75;
          margin: 0;
        }
        .accred-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
        }
        .accred-tag {
          padding: 4px 11px;
          border-radius: 100px;
          background: var(--bg2);
          border: 1.5px solid var(--border);
          font-size: 10px;
          font-weight: 700;
          color: var(--sub);
        }
        .accred-trust-bar {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          padding: 24px 0 0;
          border-top: 1px solid var(--border);
        }
        .accred-trust-item {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 6px 24px;
          font-size: 13px;
          font-weight: 600;
          color: var(--sub);
        }
        .accred-check {
          color: var(--o);
          font-weight: 900;
          font-size: 14px;
        }
        .accred-trust-sep {
          width: 1px;
          height: 18px;
          background: var(--border);
        }
        @media (max-width: 640px) {
          .accred-card-p { padding: 24px; }
          .accred-trust-sep { display: none; }
          .accred-trust-item { padding: 6px 14px; }
        }
      `}</style>
    </section>
  );
}
