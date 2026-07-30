import { useLang } from '../contexts/LangContext';

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
          <img src="/images/hero-graduates.jpg" alt="Students who studied abroad with Universe In" className="hero-photo" />
        </div>
      </div>
      <div className="hero-inner">
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
