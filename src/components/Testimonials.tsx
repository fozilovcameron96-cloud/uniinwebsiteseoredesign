import { useLang } from "../contexts/LangContext";

export default function Testimonials() {
  const { t } = useLang();

  return (
    <section className="tm-section tm-section-dark">
      <div className="tm-inner">

        <div className="accred-section reveal">
          <div className="section-label accred-label-dark" style={{ justifyContent: "center", marginBottom: 10 }}>
            <div className="dot" />
            <span>RECOGNISED & ACCREDITED BY</span>
          </div>
          <h2 className="section-h2 accred-h2-dark" style={{ textAlign: "center", marginBottom: 8 }}>
            Officially recognised.<br />Globally trusted.
          </h2>
          <p className="accred-intro accred-intro-dark">
            Universe In holds accreditations from two of the most respected international education bodies in the world.
          </p>

          <div className="accred-cards">

            <div className="accred-card-p">
              <div className="accred-logo-wrap">
                <img
                  src="/logos/british-council.png"
                  alt="British Council"
                  className="accred-img"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
              </div>
              <div className="accred-pill">
                <span className="accred-dot" />
                Verified Partner
              </div>
              <div className="accred-name-p">British Council</div>
              <div className="accred-role-p">UK Government Cultural Relations Body</div>
              <p className="accred-desc-p">
                The British Council is the UK's international organisation for cultural relations and educational opportunities, operating in 190+ countries. Their recognition signals genuine quality to universities worldwide.
              </p>
              <div className="accred-tags">
                <span className="accred-tag">Est. 1934</span>
                <span className="accred-tag">190+ Countries</span>
                <span className="accred-tag">UK Government Body</span>
              </div>
            </div>

            <div className="accred-card-p">
              <div className="accred-logo-wrap">
                <img
                  src="/logos/icef.png"
                  alt="ICEF"
                  className="accred-img"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
              </div>
              <div className="accred-pill">
                <span className="accred-dot" />
                Accredited Agency
              </div>
              <div className="accred-name-p">ICEF Accredited</div>
              <div className="accred-role-p">International Education Standard</div>
              <p className="accred-desc-p">
                ICEF accreditation is the gold standard for international student recruitment agencies. Only agencies meeting strict ethical and professional benchmarks receive this recognition.
              </p>
              <div className="accred-tags">
                <span className="accred-tag">Gold Standard</span>
                <span className="accred-tag">Ethical Agency</span>
                <span className="accred-tag">Verified Quality</span>
              </div>
            </div>

          </div>

          <div className="accred-trust-bar accred-trust-bar-dark">
            <div className="accred-trust-item"><span className="accred-check">✓</span> Free for students — always</div>
            <div className="accred-trust-sep" />
            <div className="accred-trust-item"><span className="accred-check">✓</span> UK-registered company</div>
            <div className="accred-trust-sep" />
            <div className="accred-trust-item"><span className="accred-check">✓</span> 1,000+ students placed</div>
          </div>
        </div>

      </div>

      <style>{`
        .tm-section-dark {
          background: var(--navy);
          border-top-color: transparent;
        }
        .accred-label-dark span { color: var(--o); }
        .accred-h2-dark { color: #fff; }
        .accred-intro-dark { color: rgba(255,255,255,0.55); }
        .accred-trust-bar-dark {
          border-top-color: rgba(255,255,255,0.12);
        }
        .accred-trust-bar-dark .accred-trust-item { color: rgba(255,255,255,0.7); }
        .accred-trust-bar-dark .accred-trust-sep { background: rgba(255,255,255,0.15); }
        .accred-intro {
          text-align: center;
          font-size: 14px;
          color: var(--sub);
          max-width: 480px;
          margin: 0 auto 48px;
          line-height: 1.75;
        }
        .accred-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
          margin-bottom: 36px;
        }
        .accred-card-p {
          background: #fff;
          border: 1.5px solid var(--border);
          border-radius: 24px;
          padding: 32px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          transition: all 0.3s;
          position: relative;
          overflow: hidden;
        }
        .accred-card-p::before {
          content: "";
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--o), var(--o2));
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s;
        }
        .accred-card-p:hover::before { transform: scaleX(1); }
        .accred-card-p:hover {
          border-color: var(--o-mid);
          box-shadow: 0 16px 48px rgba(255,90,10,0.1);
          transform: translateY(-4px);
        }
        .accred-logo-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg2);
          border: 1.5px solid var(--border);
          border-radius: 16px;
          padding: 24px 32px;
          min-height: 100px;
        }
        .accred-img {
          width: 100%;
          max-width: 200px;
          max-height: 72px;
          object-fit: contain;
        }
        .accred-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: var(--o-light);
          border: 1px solid var(--o-mid);
          border-radius: 100px;
          padding: 5px 12px;
          font-size: 11px;
          font-weight: 700;
          color: var(--o);
          width: fit-content;
        }
        .accred-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--o);
        }
        .accred-name-p {
          font-size: 20px;
          font-weight: 800;
          color: var(--text);
        }
        .accred-role-p {
          font-size: 11px;
          color: var(--sub);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.8px;
        }
        .accred-desc-p {
          font-size: 13px;
          color: var(--sub);
          line-height: 1.75;
          margin: 0;
        }
        .accred-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
        }
        .accred-tag {
          padding: 4px 11px;
          border-radius: 100px;
          background: var(--bg2);
          border: 1.5px solid var(--border);
          font-size: 10px;
          font-weight: 700;
          color: var(--sub);
        }
        .accred-trust-bar {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          padding: 24px 0 0;
          border-top: 1px solid var(--border);
        }
        .accred-trust-item {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 6px 24px;
          font-size: 13px;
          font-weight: 600;
          color: var(--sub);
        }
        .accred-check {
          color: var(--o);
          font-weight: 900;
          font-size: 14px;
        }
        .accred-trust-sep {
          width: 1px;
          height: 18px;
          background: var(--border);
        }
        @media (max-width: 640px) {
          .accred-card-p { padding: 24px; }
          .accred-trust-sep { display: none; }
          .accred-trust-item { padding: 6px 14px; }
        }
      `}</style>
    </section>
  );
}