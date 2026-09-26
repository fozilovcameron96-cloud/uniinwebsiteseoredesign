import { Check, Minus, X } from 'lucide-react';
import { useLang } from '../contexts/LangContext';

// Stage-four differentiation. Every consultancy in Tashkent makes the same
// promises, so the job here is to make the mechanism visible: who pays, who is
// accredited, who applies directly, and what happens when something goes wrong.
//
// Competitor claims are kept generic ("typical local agency", "often charges
// upfront") rather than naming firms or quoting fee figures - defensible, and
// it still does the persuasive work.
type Verdict = 'yes' | 'no' | 'partial';

export default function Comparison() {
  const { t } = useLang();

  const rows: { label: string; us: string; agency: string; alone: string;
                usV: Verdict; agencyV: Verdict; aloneV: Verdict }[] = [
    { label: t.cmpR1, us: t.cmpR1a, agency: t.cmpR1b, alone: t.cmpR1c, usV: 'yes', agencyV: 'no',      aloneV: 'partial' },
    { label: t.cmpR2, us: t.cmpR2a, agency: t.cmpR2b, alone: t.cmpR2c, usV: 'yes', agencyV: 'no',      aloneV: 'no' },
    { label: t.cmpR3, us: t.cmpR3a, agency: t.cmpR3b, alone: t.cmpR3c, usV: 'yes', agencyV: 'partial', aloneV: 'no' },
    { label: t.cmpR4, us: t.cmpR4a, agency: t.cmpR4b, alone: t.cmpR4c, usV: 'yes', agencyV: 'partial', aloneV: 'no' },
    { label: t.cmpR5, us: t.cmpR5a, agency: t.cmpR5b, alone: t.cmpR5c, usV: 'yes', agencyV: 'no',      aloneV: 'no' },
  ];

  const mark = (v: Verdict) =>
    v === 'yes' ? <Check size={13} strokeWidth={3.5} />
    : v === 'partial' ? <Minus size={13} strokeWidth={3.5} />
    : <X size={13} strokeWidth={3.5} />;

  return (
    <section className="cmp-section">
      <div className="cmp-inner">
        <div className="section-label reveal"><div className="dot" /><span>{t.cmpLbl}</span></div>
        <h2 className="section-h2 reveal">{t.cmpTitle}</h2>
        <p className="cmp-sub reveal">{t.cmpSub}</p>

        <div className="cmp-table reveal">
          <div className="cmp-row cmp-head">
            <div className="cmp-cell cmp-label" />
            <div className="cmp-cell cmp-us-head">{t.cmpUs}</div>
            <div className="cmp-cell">{t.cmpAgency}</div>
            <div className="cmp-cell">{t.cmpAlone}</div>
          </div>

          {rows.map((r, i) => (
            <div className="cmp-row" key={i}>
              <div className="cmp-cell cmp-label">{r.label}</div>
              <div className="cmp-cell cmp-us" data-col={t.cmpUs}>
                <span className={`cmp-mark cmp-${r.usV}`}>{mark(r.usV)}</span>
                <span>{r.us}</span>
              </div>
              <div className="cmp-cell" data-col={t.cmpAgency}>
                <span className={`cmp-mark cmp-${r.agencyV}`}>{mark(r.agencyV)}</span>
                <span>{r.agency}</span>
              </div>
              <div className="cmp-cell" data-col={t.cmpAlone}>
                <span className={`cmp-mark cmp-${r.aloneV}`}>{mark(r.aloneV)}</span>
                <span>{r.alone}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .cmp-section { padding: 88px 24px; background: #fff; border-top: 1px solid var(--border); }
        .cmp-inner { max-width: 1040px; margin: 0 auto; }
        .cmp-sub { font-size: 15px; line-height: 1.75; color: var(--sub); max-width: 540px; margin: 14px 0 44px; }

        .cmp-table {
          border: 1.5px solid var(--border); border-radius: 20px;
          overflow: hidden; background: #fff;
        }
        .cmp-row {
          display: grid;
          grid-template-columns: 1.3fr 1.25fr 1.15fr 1.05fr;
          border-bottom: 1px solid var(--border);
        }
        .cmp-row:last-child { border-bottom: none; }
        .cmp-cell {
          padding: 16px 18px; font-size: 13.5px; line-height: 1.5;
          display: flex; align-items: center; gap: 9px; color: var(--sub);
        }
        .cmp-head { background: var(--bg2); }
        .cmp-head .cmp-cell {
          font-size: 11px; font-weight: 800; text-transform: uppercase;
          letter-spacing: .9px; color: var(--sub); padding: 14px 18px;
        }
        .cmp-us-head { color: var(--o) !important; }
        .cmp-label { font-weight: 700; color: var(--navy); font-size: 13px; }

        /* The column that matters gets a persistent tint, not just a hover state. */
        .cmp-us {
          background: linear-gradient(180deg, rgba(255,90,10,.045), rgba(255,90,10,.02));
          font-weight: 700; color: var(--text);
        }
        .cmp-head .cmp-us-head { background: rgba(255,90,10,.06); }

        .cmp-mark {
          flex-shrink: 0; width: 18px; height: 18px; border-radius: 50%;
          display: inline-flex; align-items: center; justify-content: center;
        }
        .cmp-yes { background: var(--o-light); border: 1px solid var(--o-mid); color: var(--o); }
        .cmp-partial { background: var(--bg2); border: 1px solid var(--border); color: var(--sub); }
        .cmp-no { background: var(--bg2); border: 1px solid var(--border); color: #b9bfc9; }

        /* Below 760px a 4-column table stops being readable, so each row becomes
           its own card. The header row is hidden, so each value cell re-states
           which column it belongs to via its data-col attribute - otherwise
           "Usually none" on its own means nothing. */
        @media (max-width: 760px) {
          .cmp-section { padding: 64px 20px; }
          .cmp-table { border: none; border-radius: 0; background: transparent; }
          .cmp-head { display: none; }
          .cmp-row {
            grid-template-columns: 1fr;
            border: 1.5px solid var(--border); border-radius: 16px;
            background: #fff; margin-bottom: 12px; overflow: hidden;
          }
          .cmp-row .cmp-cell {
            padding: 9px 14px; border-top: 1px solid var(--border);
            display: grid; grid-template-columns: 16px 88px 1fr;
            column-gap: 8px; align-items: center;
            font-size: 13px; line-height: 1.4;
          }
          .cmp-row .cmp-cell:first-child { border-top: none; }
          /* ::before is the grid's first child, so without explicit placement
             the label lands in the 16px icon column and collides with the mark
             and the value. All three tracks are assigned by hand. */
          .cmp-row .cmp-cell .cmp-mark { grid-column: 1; }
          .cmp-row .cmp-cell > span:last-child { grid-column: 3; }
          /* The column name sits inline rather than stacked above the value -
             stacking made each row ~295px tall and the section endless. */
          .cmp-row .cmp-cell[data-col]::before {
            content: attr(data-col);
            grid-column: 2;
            font-size: 9.5px; font-weight: 800; text-transform: uppercase;
            letter-spacing: .5px; color: var(--sub); opacity: .75;
            line-height: 1.25;
          }
          .cmp-label {
            background: var(--bg2); font-size: 11px; font-weight: 800;
            text-transform: uppercase; letter-spacing: .8px; color: var(--navy);
            display: block !important; padding: 9px 14px !important;
          }
          .cmp-us { font-size: 13.5px; }
          .cmp-us::before { color: var(--o) !important; opacity: 1 !important; }
        }
      `}</style>
    </section>
  );
}
