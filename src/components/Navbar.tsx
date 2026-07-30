import { useEffect, useState } from 'react';
import { useLang } from '../contexts/LangContext';
import { Lang } from '../data/translations';

const LOGO = '/logo.png';

export default function Navbar() {
  const { lang, setLang } = useLang();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={scrolled ? 'scrolled' : ''}>
      <a className="nav-logo" href="#">
        <img src={LOGO} alt="Universe In" />
        <span className="nav-logo-text">Universe<em>.in</em></span>
      </a>
      <div className="lang-row">
        {(['en', 'ru', 'uz'] as Lang[]).map((l) => (
          <button
            key={l}
            className={`lang-btn${lang === l ? ' active' : ''}`}
            onClick={() => setLang(l)}
          >
            {l.toUpperCase()}
          </button>
        ))}
      </div>
    </nav>
  );
}
