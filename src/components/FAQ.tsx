import { useState } from 'react';
import { useLang } from '../contexts/LangContext';

interface FAQProps {
  // Which questions to render, by index into the full list below. The page
  // mounts this twice: the three real objections (cost, English level, visa
  // refusal) sit high up next to a CTA, and the informational rest go near the
  // bottom. Objections answered next to the button do more work than a single
  // accordion buried in the footer.
  pick?: number[];
  secondary?: boolean;
  onOpenChat?: () => void;
}

export default function FAQ({ pick, secondary = false, onOpenChat }: FAQProps) {
  const { t } = useLang();
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const all = [
    { q: t.faq1q, a: t.faq1a },
    { q: t.faq2q, a: t.faq2a },
    { q: t.faq3q, a: t.faq3a },
    { q: t.faq4q, a: t.faq4a },
    { q: t.faq5q, a: t.faq5a },
    { q: t.faq6q, a: t.faq6a },
  ];

  const faqs = pick ? pick.map((i) => all[i]).filter(Boolean) : all;

  const toggle = (i: number) => setOpenIdx(openIdx === i ? null : i);

  return (
    <section className={`faq-section${secondary ? ' faq-section-alt' : ''}`}>
      <div className="faq-inner">
        <div className="section-label reveal">
          <div className="dot" />
          <span>{secondary ? t.faqLbl2 : t.faqLbl}</span>
        </div>
        <h2 className="section-h2 reveal">{secondary ? t.faqTitle2 : t.faqTitle}</h2>
        <div className="faq-list reveal">
          {faqs.map((f, i) => (
            <div className={`faq-item${openIdx === i ? ' open' : ''}`} key={i} onClick={() => toggle(i)}>
              <div className="faq-q">
                <span>{f.q}</span>
                <span className="faq-icon">+</span>
              </div>
              <div className="faq-a" style={openIdx === i ? { maxHeight: 520, padding: '0 24px 20px' } : {}}>
                <p>{f.a}</p>
              </div>
            </div>
          ))}
        </div>

        {onOpenChat && (
          <div className="faq-cta reveal">
            <span className="faq-cta-t">{t.faqCtaTitle}</span>
            <button className="btn-primary" onClick={onOpenChat}>
              <span>{t.faqCta}</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>

      <style>{`
        .faq-section-alt { background: var(--bg2); }
        .faq-cta {
          margin-top: 36px; padding: 28px;
          border: 1.5px solid var(--o-mid); border-radius: 20px;
          background: var(--o-light);
          display: flex; align-items: center; justify-content: space-between;
          gap: 20px; flex-wrap: wrap;
        }
        .faq-cta-t {
          font-family: var(--font-display);
          font-size: clamp(17px, 2.2vw, 21px);
          font-weight: 600; color: var(--navy); line-height: 1.3;
        }
        @media (max-width: 640px) {
          .faq-cta { flex-direction: column; align-items: stretch; text-align: center; padding: 22px; }
          .faq-cta .btn-primary { justify-content: center; }
        }
      `}</style>
    </section>
  );
}
