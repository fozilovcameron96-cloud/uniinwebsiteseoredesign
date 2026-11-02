import { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useLang } from '../contexts/LangContext';

// Where the Meta lead form's non-lead screen sends people: the students the
// form's conditional logic has filtered out on budget.
//
// It cannot be the homepage, for the same reason as ThankYou: Meta requires a
// button on that screen, and the homepage opens with the quiz, so the student
// the form has just turned away could apply there straight afterwards.
//
// It carries no proof sections either, unlike ThankYou. That page reassures
// someone who has applied. This one only closes the conversation politely.
//
// It is noindex: it is the end of a funnel, not a page anyone should arrive at
// from search.
export default function Enquiry() {
  const { t } = useLang();

  useEffect(() => {
    document.title = `${t.dqTitle} — Universe In`;
    const robots = document.createElement('meta');
    robots.setAttribute('name', 'robots');
    robots.setAttribute('content', 'noindex,nofollow');
    document.head.appendChild(robots);
    return () => { robots.remove(); };
  }, [t]);

  return (
    <>
      <Navbar />

      <section className="dq-hero">
        <div className="dq-inner">
          <h1 className="dq-title">{t.dqTitle}</h1>
          <p className="dq-body">{t.dqBody}</p>
          <p className="dq-body">{t.dqNote}</p>
        </div>
      </section>

      <Footer />

      <style>{`
        .dq-hero {
          background: #fff;
          padding: 96px 24px 88px;
          text-align: center;
          border-bottom: 1px solid var(--border);
        }
        .dq-inner { max-width: 560px; margin: 0 auto; }
        .dq-title {
          font-family: var(--font-display);
          font-size: clamp(27px, 4.5vw, 40px);
          font-weight: 600; letter-spacing: -.5px; line-height: 1.15;
          color: var(--navy); margin: 0 0 18px;
        }
        .dq-body {
          font-size: 16px; line-height: 1.65; color: var(--text);
          margin: 0 0 10px;
        }
        @media (max-width: 640px) {
          .dq-hero { padding: 64px 20px 56px; }
        }
      `}</style>
    </>
  );
}
