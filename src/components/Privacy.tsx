import { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useLang } from '../contexts/LangContext';
import { PRIVACY } from '../data/privacy';

// Required before the Meta Instant Form can be published - every lead form has
// a mandatory Privacy Policy URL and Meta will not save the form without one.
//
// Deliberately plain: no hero, no grid, no CTA. Someone reaching this page
// wants to read it or check we are a real company, and a marketing layout
// around a legal document reads as evasive.
export default function Privacy() {
  const { t, lang } = useLang();
  const doc = PRIVACY[lang];

  useEffect(() => {
    document.title = `${doc.title} — Universe In`;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', doc.title);
    // Nothing here should ever rank or be indexed as a landing page.
    const robots = document.createElement('meta');
    robots.setAttribute('name', 'robots');
    robots.setAttribute('content', 'noindex,follow');
    document.head.appendChild(robots);
    return () => { robots.remove(); };
  }, [doc]);

  return (
    <>
      <Navbar />

      <main className="pv">
        <a className="pv-back" href="/">{doc.backToSite}</a>
        <h1 className="pv-title">{doc.title}</h1>
        <p className="pv-updated">{doc.updated}</p>

        {doc.sections.map((s, i) => (
          <section className="pv-section" key={i}>
            <h2>{s.heading}</h2>

            {s.body?.map((p, j) => <p key={j}>{p}</p>)}

            {s.list && (
              <ul>
                {s.list.map((item, j) => <li key={j}>{item}</li>)}
              </ul>
            )}

            {s.processors && (
              <div className="pv-table-wrap">
                <table className="pv-table">
                  <tbody>
                    {s.processors.map(([who, what], j) => (
                      <tr key={j}>
                        <th scope="row">{who}</th>
                        <td>{what}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {s.body2?.map((p, j) => <p key={j}>{p}</p>)}
          </section>
        ))}

        <p className="pv-company">{t.footerCompany}</p>
      </main>

      <Footer />

      <style>{`
        .pv {
          max-width: 720px;
          margin: 0 auto;
          padding: 56px 24px 80px;
        }
        .pv-back {
          display: inline-block;
          font-size: 13px;
          font-weight: 600;
          color: var(--sub);
          text-decoration: none;
          margin-bottom: 28px;
        }
        .pv-back:hover { color: var(--o); }
        .pv-title {
          font-family: var(--font-display);
          font-size: clamp(28px, 4.5vw, 40px);
          font-weight: 600;
          letter-spacing: -.5px;
          color: var(--navy);
          margin: 0 0 8px;
        }
        .pv-updated {
          font-size: 13px;
          color: var(--sub);
          margin: 0 0 40px;
        }
        .pv-section { margin-bottom: 36px; }
        .pv-section h2 {
          font-size: 17px;
          font-weight: 800;
          color: var(--navy);
          margin: 0 0 12px;
          letter-spacing: -.1px;
        }
        .pv-section p {
          font-size: 15px;
          line-height: 1.8;
          color: var(--text);
          margin: 0 0 14px;
        }
        .pv-section ul {
          margin: 0 0 14px;
          padding-left: 20px;
        }
        .pv-section li {
          font-size: 15px;
          line-height: 1.8;
          color: var(--text);
          margin-bottom: 4px;
        }

        /* Scrolls rather than squashing on a phone - the processor names are
           short but the descriptions are not. */
        .pv-table-wrap { overflow-x: auto; margin: 0 0 16px; }
        .pv-table {
          width: 100%;
          border-collapse: collapse;
          border: 1px solid var(--border);
          border-radius: 10px;
          overflow: hidden;
          font-size: 14px;
        }
        .pv-table th, .pv-table td {
          padding: 11px 14px;
          text-align: left;
          border-bottom: 1px solid var(--border);
          line-height: 1.6;
        }
        .pv-table tr:last-child th,
        .pv-table tr:last-child td { border-bottom: none; }
        .pv-table th {
          font-weight: 700;
          color: var(--navy);
          white-space: nowrap;
          background: var(--bg2);
          width: 1%;
        }
        .pv-table td { color: var(--sub); }

        .pv-company {
          margin-top: 48px;
          padding-top: 20px;
          border-top: 1px solid var(--border);
          font-size: 12px;
          color: var(--sub);
        }

        @media (max-width: 640px) {
          .pv { padding: 36px 20px 56px; }
          .pv-section p, .pv-section li { font-size: 14.5px; }
        }
      `}</style>
    </>
  );
}
