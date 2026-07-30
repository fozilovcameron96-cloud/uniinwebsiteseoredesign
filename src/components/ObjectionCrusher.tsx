import { FileText, DollarSign, ShieldCheck, GraduationCap, Clock, Globe } from 'lucide-react';
import { useLang } from '../contexts/LangContext';

const ICONS = [FileText, DollarSign, ShieldCheck, GraduationCap, Clock, Globe];

export default function ObjectionCrusher() {
  const { t } = useLang();

  const objections = [
    { Icon: ICONS[0], fear: t.obj1f, answer: t.obj1a, desc: t.obj1d },
    { Icon: ICONS[1], fear: t.obj2f, answer: t.obj2a, desc: t.obj2d },
    { Icon: ICONS[2], fear: t.obj3f, answer: t.obj3a, desc: t.obj3d },
    { Icon: ICONS[3], fear: t.obj4f, answer: t.obj4a, desc: t.obj4d },
    { Icon: ICONS[4], fear: t.obj5f, answer: t.obj5a, desc: t.obj5d },
    { Icon: ICONS[5], fear: t.obj6f, answer: t.obj6a, desc: t.obj6d },
  ];

  return (
    <section className="obj-section">
      <div className="obj-inner">
        <div className="section-label reveal"><div className="dot" /><span>{t.objLbl}</span></div>
        <h2 className="section-h2 reveal">{t.objTitle}</h2>
        <div className="obj-grid">
          {objections.map((o, i) => (
            <div className={`obj-card reveal reveal-delay-${(i % 3) + 1}`} key={i}>
              <div className="obj-icon">
                <o.Icon size={20} color="var(--o)" strokeWidth={2} />
              </div>
              <div className="obj-fear">{o.fear}</div>
              <div className="obj-answer">{o.answer}</div>
              <div className="obj-desc">{o.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
