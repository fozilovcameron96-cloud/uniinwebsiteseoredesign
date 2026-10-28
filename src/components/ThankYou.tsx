import { useEffect } from 'react';
import { Check } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';
import Navbar from './Navbar';
import Footer from './Footer';
import ProofWall from './ProofWall';
import Partners from './Partners';
import Accreditation from './Accreditation';
import Comparison from './Comparison';
import RiskReversal from './RiskReversal';
import { useLang } from '../contexts/LangContext';

// Where the Meta lead form's closing screen sends people.
//
// It cannot be the homepage. Meta requires a button on that screen, and the
// first thing the homepage offers is the quiz - so someone who has just filled
// in the ad form would be invited to fill in a second one, and the same student
// would arrive twice: two Sheet rows, two alert emails, one person.
//
// So this page carries every reason to trust the business - the real offer
// letters, the accreditations, the comparison - and no way to submit anything.
// Hero, FinalCTA, FloatCTA and the FAQ's CTA are all deliberately absent, and
// Destinations is left out too because each destination page carries its own
// "check my eligibility" button.
//
// It is noindex: it is the end of a funnel, not a page anyone should arrive at
// from search.
export default function ThankYou() {
  const { t } = useLang();
  // Every section below starts at opacity 0 and is faded in by an
  // IntersectionObserver. LandingPage sets one up; this page did not, so the
  // offer letters, accreditations and comparison all rendered correctly and
  // were invisible - the page looked like nothing but a heading.
  const revealRoot = useReveal();

  useEffect(() => {
    document.title = `${t.tyTitle} — Universe In`;
    const robots = document.createElement('meta');
    robots.setAttribute('name', 'robots');
    robots.setAttribute('content', 'noindex,nofollow');
    document.head.appendChild(robots);
    return () => { robots.remove(); };
  }, [t]);

  return (
    <>
      <Navbar />

      <section className="ty-hero">
        <div className="ty-inner">
          <div className="ty-tick"><Check size={30} strokeWidth={3} /></div>
          <h1 className="ty-title">{t.tyTitle}</h1>
          <p className="ty-sub">{t.tySub}</p>

          <div className="ty-next">
            <div className="ty-next-label">{t.tyNextLabel}</div>
            <ol className="ty-steps">
              <li>{t.tyStep1}</li>
              <li>{t.tyStep2}</li>
              <li>{t.tyStep3}</li>
            </ol>
          </div>
        </div>
      </section>

      {/* Everything below is proof, not persuasion - there is nothing left to
          persuade them of, they have already applied. The ref is what makes it
          visible; see revealRoot above. */}
      <div ref={revealRoot as React.RefObject<HTMLDivElement>}>
        <ProofWall />
        <Partners />
        <Accreditation />
        <Comparison />
        <RiskReversal />
      </div>

      <Footer />

      <style>{`
        .ty-hero {
          background: #fff;
          padding: 72px 24px 64px;
          text-align: center;
          border-bottom: 1px solid var(--border);
        }
        .ty-inner { max-width: 620px; margin: 0 auto; }
        .ty-tick {
          width: 62px; height: 62px; border-radius: 50%;
          background: var(--o-light); border: 1.5px solid var(--o-mid);
          color: var(--o);
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 24px;
        }
        .ty-title {
          font-family: var(--font-display);
          font-size: clamp(27px, 4.5vw, 40px);
          font-weight: 600; letter-spacing: -.5px; line-height: 1.15;
          color: var(--navy); margin: 0 0 14px;
        }
        .ty-sub {
          font-size: 16px; line-height: 1.75; color: var(--sub);
          margin: 0 auto; max-width: 480px;
        }
        .ty-next {
          margin-top: 36px; padding: 22px 26px;
          background: var(--bg2); border: 1.5px solid var(--border);
          border-radius: 18px; text-align: left;
        }
        .ty-next-label {
          font-size: 11px; font-weight: 800; letter-spacing: 1.4px;
          text-transform: uppercase; color: var(--o); margin-bottom: 12px;
        }
        .ty-steps {
          margin: 0; padding-left: 20px;
          display: flex; flex-direction: column; gap: 9px;
        }
        .ty-steps li {
          font-size: 14.5px; line-height: 1.6; color: var(--text);
        }
        @media (max-width: 640px) {
          .ty-hero { padding: 48px 20px 44px; }
          .ty-sub { font-size: 15px; }
          .ty-next { padding: 18px 20px; }
        }
      `}</style>
    </>
  );
}
