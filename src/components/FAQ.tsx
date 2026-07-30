import { useState } from 'react';
import { useLang } from '../contexts/LangContext';

export default function FAQ() {
  const { t } = useLang();
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const faqs = [
    { q: t.faq1q, a: t.faq1a },
    { q: t.faq2q, a: t.faq2a },
    { q: t.faq3q, a: t.faq3a },
    { q: t.faq4q, a: t.faq4a },
    { q: t.faq5q, a: t.faq5a },
    { q: t.faq6q, a: t.faq6a },
  ];

  const toggle = (i: number) => setOpenIdx(openIdx === i ? null : i);

  return (
    <section className="faq-section">
      <div className="faq-inner">
        <div className="section-label reveal"><div className="dot" /><span>{t.faqLbl}</span></div>
        <h2 className="section-h2 reveal">{t.faqTitle}</h2>
        <div className="faq-list reveal">
          {faqs.map((f, i) => (
            <div className={`faq-item${openIdx === i ? ' open' : ''}`} key={i} onClick={() => toggle(i)}>
              <div className="faq-q">
                <span>{f.q}</span>
                <span className="faq-icon">+</span>
              </div>
              <div className="faq-a" style={openIdx === i ? { maxHeight: 300, padding: '0 24px 20px' } : {}}>
                <p>{f.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
