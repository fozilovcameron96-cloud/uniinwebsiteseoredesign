import { useLang } from '../contexts/LangContext';

interface FinalCTAProps {
  onOpenChat: () => void;
}

export default function FinalCTA({ onOpenChat }: FinalCTAProps) {
  const { t } = useLang();

  return (
    <section className="final-section">
      <div className="final-inner reveal">
        <div className="section-label" style={{ justifyContent: 'center' }}>
          <div className="dot" /><span>{t.finalLbl}</span>
        </div>
        <h2 className="final-title" dangerouslySetInnerHTML={{ __html: t.finalTitle }} />
        <p className="final-sub">{t.finalSub}</p>
        <button className="btn-primary" onClick={onOpenChat} style={{ margin: '0 auto' }}>
          <span>{t.finalCta}</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
        <div className="trust-row">
          <span className="trust-item">{t.t1}</span>
          <span className="trust-item">{t.t2}</span>
          <span className="trust-item">{t.t3}</span>
        </div>
      </div>
    </section>
  );
}
