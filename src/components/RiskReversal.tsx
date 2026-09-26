import { BadgeCheck, FileX, Landmark, MessageSquareWarning } from 'lucide-react';
import { useLang } from '../contexts/LangContext';

// The single biggest thing stopping a Central Asian family from contacting an
// education agency is the fear of being taken for money. Nothing else on the
// page addresses that head-on, so this does - and it deliberately sits directly
// before the final CTA.
//
// Every claim here is independently checkable, including the Companies House
// number, which is the point.
const ICONS = [BadgeCheck, FileX, Landmark, MessageSquareWarning];

export default function RiskReversal() {
  const { t } = useLang();

  const points = [
    { title: t.rr1t, desc: t.rr1d },
    { title: t.rr2t, desc: t.rr2d },
    { title: t.rr3t, desc: t.rr3d },
    { title: t.rr4t, desc: t.rr4d },
  ];

  return (
    <section className="rr-section">
      <div className="rr-inner">
        <div className="section-label reveal"><div className="dot" /><span>{t.rrLbl}</span></div>
        <h2 className="section-h2 rr-h2 reveal">{t.rrTitle}</h2>
        <p className="rr-sub reveal">{t.rrSub}</p>

        <div className="rr-grid">
          {points.map((p, i) => {
            const Icon = ICONS[i];
            return (
              <div className={`rr-card reveal reveal-delay-${(i % 3) + 1}`} key={i}>
                <div className="rr-icon"><Icon size={19} strokeWidth={2} /></div>
                <div className="rr-card-t">{p.title}</div>
                <p className="rr-card-d">{p.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .rr-section {
          padding: 88px 24px; background: var(--navy);
          border-top: 1px solid var(--border);
        }
        .rr-inner { max-width: 1040px; margin: 0 auto; }
        .rr-section .section-label span { color: var(--o); }
        .rr-h2 { color: #fff; }
        .rr-sub {
          font-size: 15px; line-height: 1.75;
          color: rgba(255,255,255,.55);
          max-width: 520px; margin: 14px 0 44px;
        }
        .rr-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
          gap: 18px;
        }
        .rr-card {
          background: rgba(255,255,255,.04);
          border: 1px solid rgba(255,255,255,.1);
          border-radius: 20px; padding: 24px;
          display: flex; flex-direction: column; gap: 11px;
          transition: border-color .3s, background .3s, transform .3s;
        }
        .rr-card:hover {
          border-color: rgba(255,90,10,.45);
          background: rgba(255,255,255,.06);
          transform: translateY(-3px);
        }
        .rr-icon {
          width: 40px; height: 40px; border-radius: 12px;
          display: inline-flex; align-items: center; justify-content: center;
          background: rgba(255,90,10,.12);
          border: 1px solid rgba(255,90,10,.28);
          color: var(--o);
        }
        .rr-card-t { font-size: 15px; font-weight: 800; color: #fff; letter-spacing: -.1px; }
        .rr-card-d { font-size: 13px; line-height: 1.7; color: rgba(255,255,255,.6); margin: 0; }

        @media (max-width: 640px) {
          .rr-section { padding: 64px 20px; }
          .rr-card { padding: 20px; }
          .rr-sub { font-size: 14px; margin-bottom: 30px; }
        }
      `}</style>
    </section>
  );
}
