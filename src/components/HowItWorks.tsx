import { useLang } from '../contexts/LangContext';

export default function HowItWorks() {
  const { t } = useLang();

  const steps = [
    { num: '01', title: t.how1t, desc: t.how1d },
    { num: '02', title: t.how2t, desc: t.how2d },
    { num: '03', title: t.how3t, desc: t.how3d },
  ];

  return (
    <section className="how-section">
      <div className="how-inner">
        <div className="section-label reveal"><div className="dot" /><span>{t.howLbl}</span></div>
        <h2 className="section-h2 reveal">{t.howTitle}</h2>
        <div className="how-steps">
          {steps.map((s, i) => (
            <div className={`how-card reveal reveal-delay-${i + 1}`} key={i}>
              <div className="how-num">{s.num}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
