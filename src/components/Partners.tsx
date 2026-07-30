import { useRef, useEffect } from 'react';
import { useLang } from '../contexts/LangContext';

const LOGOS = [
  'https://jumpshare.com/share/zsUS7agyqrZxTTBAYasQ',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpW5dOV1J8WOULMEWQGv6GCdYHF6AArNmMMQ&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLkloBMcChCHRfjUCPLimyKBgz-qMq3kJzxQ&s',
  'https://www.boosteducationservice.co.uk/wp-content/uploads/2018/07/studygrouplogo.jpg.webp',
  'https://student-cms.prd.timeshighereducation.com/sites/default/files/inline-images/INTO_logo_red.png',
  'https://www.oncampus.global/themes/custom/oncampus/assets/img/logo.svg',
  'https://www.stgiles-international.com/wp-content/uploads/2023/06/65th-logoNew.png',
  'https://corporate.shorelight.com/wp-content/uploads/2017/05/Shorelight-Logo-640x640-orange.png',
  'https://fiu-original.b-cdn.net/fontsinuse.com/use-images/N187/187302/187302.png',
  'https://upload.wikimedia.org/wikipedia/commons/b/b6/HULT_IBS_Logo_Outline_Black_%28cropped%29.png',
  'https://upload.wikimedia.org/wikipedia/commons/0/03/Heriot-Watt_University_logo.svg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpRFd-TZXHM_3XpVgFwixRIXA9WGgfJ_oygw&s',
];

const TRACK = [...LOGOS, ...LOGOS];

export default function Partners() {
  const { t } = useLang();
  const trackRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number | null>(null);
  const posRef = useRef(0);
  const pausedRef = useRef(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const speed = 0.5;

    const tick = () => {
      if (!pausedRef.current) {
        posRef.current += speed;
        const half = track.scrollWidth / 2;
        if (posRef.current >= half) posRef.current = 0;
        track.style.transform = `translateX(-${posRef.current}px)`;
      }
      animRef.current = requestAnimationFrame(tick);
    };

    animRef.current = requestAnimationFrame(tick);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, []);

  return (
    <section className="partners-section">
      <div className="partners-inner">
        <div className="section-label reveal" style={{ justifyContent: 'center' }}>
          <div className="dot" /><span>{t.partLbl}</span>
        </div>
      </div>
      <div className="carousel-wrap reveal">
        <div
          className="carousel-track"
          ref={trackRef}
          onMouseEnter={() => { pausedRef.current = true; }}
          onMouseLeave={() => { pausedRef.current = false; }}
        >
          {TRACK.map((src, i) => (
            <div className="carousel-item" key={i}>
              <img src={src} alt="Partner logo" loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
