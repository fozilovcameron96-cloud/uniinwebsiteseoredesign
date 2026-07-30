import { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import UrgencyBar from './UrgencyBar';
import Cursor from './Cursor';
import type { Destination } from '../data/destinations';

interface DestinationPageProps {
  destination: Destination;
}

export default function DestinationPage({ destination: d }: DestinationPageProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    document.title = d.metaTitle;
    document.querySelector('meta[name="description"]')?.setAttribute('content', d.metaDescription);

    // FAQPage schema for this destination - lets AI answer engines and Google
    // extract the Q&A directly instead of needing to parse prose.
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: d.faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    });
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, [d]);

  // Destination pages are English-only content, so route to the English apply flow.
  const goToApply = () => { window.location.href = '/en/apply'; };

  return (
    <>
      <Cursor />
      <UrgencyBar />
      <Navbar />

      <section className="dest-hero">
        <img src={d.heroImage} alt={d.heroImageAlt} className="dest-hero-img" />
        <div className="dest-hero-overlay" />
        <div className="dest-hero-content">
          <img
            className="dest-hero-flag"
            src={`https://flagcdn.com/48x36/${d.code}.png`}
            srcSet={`https://flagcdn.com/96x72/${d.code}.png 2x`}
            width={48} height={36}
            alt={`${d.name} flag`}
          />
          <h1 className="dest-hero-title">{d.h1}</h1>
          <p className="dest-hero-intro">{d.intro}</p>
          <div className="cta-group" style={{ alignItems: 'center' }}>
            <button className="btn-primary" onClick={goToApply}>
              <span>Check My Eligibility</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
            <span className="dest-hero-note">Free · 2 minutes · No commitment</span>
          </div>
        </div>
      </section>

      <section className="obj-section">
        <div className="obj-inner" style={{ maxWidth: 760 }}>
          <div className="section-label"><div className="dot" /><span>Visa & Cost</span></div>
          <h2 className="section-h2">What it actually takes</h2>
          <div className="obj-grid" style={{ gridTemplateColumns: '1fr 1fr', marginTop: 32 }}>
            <div className="obj-card">
              <div className="obj-answer">{d.visaName}</div>
              <div className="obj-desc">{d.visaNote}</div>
            </div>
            <div className="obj-card">
              <div className="obj-answer">{d.costRange}/year</div>
              <div className="obj-desc">{d.costNote}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="how-section">
        <div className="how-inner" style={{ maxWidth: 760 }}>
          <div className="section-label"><div className="dot" /><span>Why {d.name}</span></div>
          <h2 className="section-h2">What makes it different</h2>
          <div className="how-steps" style={{ marginTop: 32 }}>
            {d.whyThisCountry.map((reason, i) => (
              <div className="how-card" key={i}>
                <div className="how-num">{String(i + 1).padStart(2, '0')}</div>
                <p style={{ fontSize: 14, color: 'var(--sub)', lineHeight: 1.7 }}>{reason}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 56 }}>
            <div className="section-label"><div className="dot" /><span>Popular fields</span></div>
            <div className="dest-grid" style={{ marginTop: 20 }}>
              {d.popularFields.map((field) => (
                <div className="dest-chip" key={field}>
                  <span className="dname">{field}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 40, padding: '16px 20px', background: 'var(--bg2)', borderRadius: 12, borderLeft: '3px solid var(--o)' }}>
            <strong style={{ fontSize: 13, color: 'var(--text)' }}>Typical timeline: </strong>
            <span style={{ fontSize: 13, color: 'var(--sub)' }}>{d.timeline}</span>
          </div>
        </div>
      </section>

      <section className="faq-section">
        <div className="faq-inner">
          <div className="section-label"><div className="dot" /><span>FAQ</span></div>
          <h2 className="section-h2">Questions about studying in {d.name}</h2>
          <div className="faq-list">
            {d.faqs.map((faq, i) => (
              <div className={`faq-item${openFaq === i ? ' open' : ''}`} key={i}>
                <div className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  {faq.q}
                  <span className="faq-icon">+</span>
                </div>
                <div className="faq-a"><p>{faq.a}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="final-section">
        <div className="final-inner">
          <div className="section-label" style={{ justifyContent: 'center' }}>
            <div className="dot" /><span>Ready to find out?</span>
          </div>
          <h2 className="final-title">See if {d.name} is right for you.</h2>
          <p className="final-sub">Free 2-minute quiz — get matched with universities that actually fit your budget and level.</p>
          <button className="btn-final" onClick={goToApply} style={{ margin: '0 auto' }}>
            <span>Check My Eligibility</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </section>

      <Footer />
    </>
  );
}
