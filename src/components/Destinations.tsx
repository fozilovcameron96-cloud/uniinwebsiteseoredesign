import { useLang } from '../contexts/LangContext';
import { DESTINATIONS } from '../data/destinations';

export default function Destinations() {
  const { t } = useLang();

  return (
    <section className="dest-section">
      <div className="dest-inner">
        <div className="section-label reveal">
          <div className="dot" /><span>{t.destLbl}</span>
        </div>
        <div className="dest-grid reveal">
          {DESTINATIONS.map((d) => (
            <a className="dest-chip" href={`/study-in-${d.slug}`} key={d.slug}>
              <img
                src={`https://flagcdn.com/24x18/${d.code}.png`}
                srcSet={`https://flagcdn.com/48x36/${d.code}.png 2x`}
                width="24"
                height="18"
                alt={d.name}
                style={{ borderRadius: 2, flexShrink: 0 }}
              />
              <span className="dname">{d.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
