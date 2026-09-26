// Stands in for a real redacted offer letter / visa approval until the agency
// supplies the scans. Deliberately obvious - dashed border plus an explicit
// "awaiting verified document" stamp - so it can never read as real proof.
//
// Replacing it means swapping this component for an <img> of the redacted scan
// at the same call sites (HeroCarousel slides 2/3/6, ProofWall grid).
import { Stamp } from 'lucide-react';

const WIDTHS = [92, 48, 84, 70, 88, 56];

interface Props {
  label: string;
  lines?: number;
  compact?: boolean;
}

export default function DocPlaceholder({ label, lines = 5, compact = false }: Props) {
  return (
    <div className={`dp${compact ? ' dp-compact' : ''}`} role="img" aria-label={label}>
      <div className="dp-head">
        <div className="dp-crest" />
        <div className="dp-headlines">
          <span className="dp-bar" style={{ width: '62%' }} />
          <span className="dp-bar dp-bar-sm" style={{ width: '40%' }} />
        </div>
      </div>
      <div className="dp-body">
        {Array.from({ length: lines }).map((_, i) => (
          <span
            key={i}
            className={`dp-bar${i === 1 ? ' dp-bar-redacted' : ''}`}
            style={{ width: `${WIDTHS[i % WIDTHS.length]}%` }}
          />
        ))}
      </div>
      <div className="dp-stamp">
        <Stamp size={13} strokeWidth={2.5} />
        <span>{label}</span>
      </div>

      <style>{`
        .dp {
          width: 100%; height: 100%;
          background: #fff;
          border: 1.5px dashed var(--border);
          border-radius: 12px;
          padding: 14px;
          display: flex; flex-direction: column; gap: 12px;
          position: relative; overflow: hidden;
        }
        .dp-head { display: flex; align-items: center; gap: 10px; }
        .dp-crest {
          width: 30px; height: 30px; border-radius: 6px; flex-shrink: 0;
          background: linear-gradient(135deg, var(--navy), #24365c);
        }
        .dp-headlines { display: flex; flex-direction: column; gap: 5px; flex: 1; }
        .dp-body { display: flex; flex-direction: column; gap: 7px; flex: 1; }
        .dp-bar { display: block; height: 7px; border-radius: 4px; background: var(--navy-light); }
        .dp-bar-sm { height: 5px; }
        .dp-bar-redacted { background: var(--navy); opacity: .82; }
        /* The label must stay readable at every card size - it is the only thing
           marking this as a placeholder rather than real proof - so it wraps
           rather than being clipped by the card's overflow:hidden. */
        .dp-stamp {
          display: inline-flex; align-items: center; gap: 5px; align-self: flex-start;
          max-width: 100%;
          padding: 4px 9px; border-radius: 100px;
          background: var(--o-light); border: 1px solid var(--o-mid);
          color: var(--o); font-size: 9.5px; font-weight: 800;
          letter-spacing: .3px; text-transform: uppercase; line-height: 1.35;
        }
        .dp-stamp svg { flex-shrink: 0; }
        .dp-stamp span { min-width: 0; }
        .dp-compact { padding: 9px; gap: 8px; }
        .dp-compact .dp-crest { width: 20px; height: 20px; }
        .dp-compact .dp-stamp { padding: 4px; gap: 0; }
        .dp-compact .dp-stamp span { display: none; }
      `}</style>
    </div>
  );
}
