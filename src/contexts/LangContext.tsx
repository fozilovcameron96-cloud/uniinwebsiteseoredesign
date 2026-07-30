import { createContext, useContext, useState, ReactNode } from 'react';
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

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('ru');
  return (
    <LangContext.Provider value={{ lang, setLang, t: L[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
