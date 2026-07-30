import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Lang, L, Translation } from '../data/translations';

interface LangContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Translation;
}

const LangContext = createContext<LangContextType>({
  lang: 'ru',
  setLang: () => {},
  t: L.ru,
});

interface LangProviderProps {
  children: ReactNode;
  initialLang?: Lang;
  // Called when the user switches language via the UI - lets the page owner
  // (App.tsx) navigate to the real per-language URL so hreflang stays honest.
  onLangChange?: (l: Lang) => void;
}

export function LangProvider({ children, initialLang = 'ru', onLangChange }: LangProviderProps) {
  const [lang, setLangState] = useState<Lang>(initialLang);

  // Keep in sync when the owning page's URL-derived language changes
  // underneath us (e.g. browser back/forward between language URLs).
  useEffect(() => { setLangState(initialLang); }, [initialLang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    onLangChange?.(l);
  };

  return (
    <LangContext.Provider value={{ lang, setLang, t: L[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
