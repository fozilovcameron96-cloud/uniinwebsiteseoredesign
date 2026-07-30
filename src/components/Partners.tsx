import { useRef, useEffect } from 'react';
import { useLang } from '../contexts/LangContext';

// Locally bundled - previously hotlinked from 9 different third-party domains
// (a broken Jumpshare share-link, 3 unidentifiable Google-thumbnail proxy URLs,
// and one unrelated fontsinuse.com image) with zero uptime guarantee. Vite
// bundles/hashes these automatically.
const LOGOS = [
  { src: '/logos/study-group.webp', alt: 'Study Group' },
  { src: '/logos/into.png', alt: 'INTO' },
  { src: '/logos/oncampus.svg', alt: 'OnCampus' },
  { src: '/logos/st-giles.png', alt: 'St Giles International' },
  { src: '/logos/shorelight.png', alt: 'Shorelight' },
  { src: '/logos/hult.png', alt: 'Hult International Business School' },
  { src: '/logos/heriot-watt.svg', alt: 'Heriot-Watt University' },
  { src: '/logos/british-council.png', alt: 'British Council' },
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
          {TRACK.map((logo, i) => (
            <div className="carousel-item" key={i}>
              <img src={logo.src} alt={logo.alt} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
