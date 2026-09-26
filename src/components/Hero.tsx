import { Check } from 'lucide-react';
import { useLang } from '../contexts/LangContext';
import HeroCarousel from './HeroCarousel';

interface HeroProps {
  onOpenChat: () => void;
}

export default function Hero({ onOpenChat }: HeroProps) {
  const { t } = useLang();

  return (
    <section className="hero">
      <div className="hero-grid" />
      <div className="hero-inner hero-inner-split">
        <div className="hero-copy">
          <div className="hero-badge">
            <div className="hero-badge-dot" />
            <span>{t.badge}</span>
          </div>
          <h1 className="hero-title" dangerouslySetInnerHTML={{ __html: t.title }} />
          <p className="hero-sub" dangerouslySetInnerHTML={{ __html: t.sub }} />

          {/* Benefit-driven, deliberately not feature-driven - the mechanism
              detail lives further down the page in HowItWorks/Comparison. */}
          <ul className="hero-bullets">
            {[t.hb1, t.hb2, t.hb3].map((b, i) => (
              <li key={i}>
                <span className="hero-bullet-icon"><Check size={12} strokeWidth={3.5} /></span>
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <div className="cta-group">
            <button className="btn-primary" onClick={onOpenChat}>
              <span>{t.cta}</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
            <span className="cta-note">{t.note}</span>
          </div>
        </div>
        <div className="hero-media">
          <HeroCarousel />
        </div>
      </div>
      <div className="hero-inner">
        {/* TODO: s1/s2 figures are the agency's own and are not audited.
            Confirm both before launch, or drop them for credential-only proof. */}
        <div className="stats-bar">
          <div className="stat-item">
            <div className="stat-n">1,000<span>+</span></div>
            <div className="stat-l">{t.s1}</div>
          </div>
          <div className="stat-item">
            <div className="stat-n">100<span>+</span></div>
            <div className="stat-l">{t.s2}</div>
          </div>
          <div className="stat-item">
            <div className="stat-n">10</div>
            <div className="stat-l">{t.s3}</div>
          </div>
          <div className="stat-item">
            <div className="stat-n" style={{ color: 'var(--o)' }}>Free</div>
            <div className="stat-l">{t.s4}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
