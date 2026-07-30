import { useLang } from '../contexts/LangContext';

const DESTINATIONS = [
  { code: 'gb', name: 'United Kingdom' },
  { code: 'us', name: 'USA' },
  { code: 'ae', name: 'UAE' },
  { code: 'ca', name: 'Canada' },
  { code: 'au', name: 'Australia' },
  { code: 'nz', name: 'New Zealand' },
  { code: 'de', name: 'Germany' },
  { code: 'ie', name: 'Ireland' },
  { code: 'nl', name: 'Netherlands' },
  { code: 'fr', name: 'France' },
];

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
            <div className="dest-chip" key={d.name}>
              <img
                src={`https://flagcdn.com/24x18/${d.code}.png`}
                srcSet={`https://flagcdn.com/48x36/${d.code}.png 2x`}
                width="24"
                height="18"
                alt={d.name}
                style={{ borderRadius: 2, flexShrink: 0 }}
              />
              <span className="dname">{d.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
