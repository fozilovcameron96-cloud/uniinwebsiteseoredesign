import { useEffect, useState } from 'react';
import { useLang } from '../contexts/LangContext';

interface FloatCTAProps {
  onOpenChat: () => void;
}

export default function FloatCTA({ onOpenChat }: FloatCTAProps) {
  const { t } = useLang();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const nearBottom = scrolled + winHeight >= docHeight - 120;
      setShow(scrolled > 500 && !nearBottom);
    };
    window.addEventListener('scroll', onScroll);
    const timer = setTimeout(() => {
      if (window.scrollY < 100) setShow(true);
    }, 3500);
    return () => { window.removeEventListener('scroll', onScroll); clearTimeout(timer); };
  }, []);

  return (
    <div className={`float-cta${show ? ' show' : ''}`}>
      <button className="float-btn" onClick={onOpenChat}>
        <span>{t.floatTxt}</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
