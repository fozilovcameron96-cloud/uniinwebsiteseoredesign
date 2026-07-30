import { MessageSquare, Target, Plane } from 'lucide-react';
import { useLang } from '../contexts/LangContext';

const STEP_ICONS = [MessageSquare, Target, Plane];

export default function HowItWorks() {
  const { t } = useLang();

  const steps = [
    { num: '01', Icon: STEP_ICONS[0], title: t.how1t, desc: t.how1d },
    { num: '02', Icon: STEP_ICONS[1], title: t.how2t, desc: t.how2d },
    { num: '03', Icon: STEP_ICONS[2], title: t.how3t, desc: t.how3d },
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
              <div className="how-icon">
                <s.Icon size={18} color="var(--o)" strokeWidth={2} />
              </div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
