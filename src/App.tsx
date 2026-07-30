import { useEffect, useState } from 'react';
import { LangProvider } from './contexts/LangContext';
import type { Lang } from './data/translations';
import Cursor from './components/Cursor';
import UrgencyBar from './components/UrgencyBar';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Destinations from './components/Destinations';
import ObjectionCrusher from './components/ObjectionCrusher';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Partners from './components/Partners';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import FloatCTA from './components/FloatCTA';
import { UniverseQuiz } from './components/UniverseQuiz';
import DestinationPage from './components/DestinationPage';
import { getDestination } from './data/destinations';

function LandingPage({ initialQuizOpen = false }: { initialQuizOpen?: boolean }) {
const [quizOpen, setQuizOpen] = useState(initialQuizOpen);

  const openQuiz = () => { setQuizOpen(true); document.body.style.overflow = 'hidden'; };
  const closeQuiz = () => { setQuizOpen(false); document.body.style.overflow = ''; };

  useEffect(() => {
    if (initialQuizOpen) document.body.style.overflow = 'hidden';
  }, [initialQuizOpen]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.12 }
    );
    document.querySelectorAll('.reveal').forEach((r) => obs.observe(r));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const tiltCards = document.querySelectorAll('.tm-card, .obj-card, .how-card');
    const onMove = (e: Event) => {
      const card = e.currentTarget as HTMLElement;
      const me = e as MouseEvent;
      const r = card.getBoundingClientRect();
      const rx = -(me.clientY - r.top - r.height / 2) / r.height * 12;
      const ry = (me.clientX - r.left - r.width / 2) / r.width * 12;
      card.style.transform = `perspective(600px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
    };
    const onLeave = (e: Event) => { (e.currentTarget as HTMLElement).style.transform = ''; };
    tiltCards.forEach((c) => {
      c.addEventListener('mousemove', onMove);
      c.addEventListener('mouseleave', onLeave);
    });
    return () => tiltCards.forEach((c) => {
      c.removeEventListener('mousemove', onMove);
      c.removeEventListener('mouseleave', onLeave);
    });
  }, []);

  return (
    <>
      <Cursor />
      <UrgencyBar />
      <Navbar />
      <Hero onOpenChat={openQuiz} />
      <Destinations />
      <Partners />
      <ObjectionCrusher />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <FinalCTA onOpenChat={openQuiz} />
      <Footer />
      <FloatCTA onOpenChat={openQuiz} />
      {quizOpen && <UniverseQuiz onClose={closeQuiz} />}
    </>
  );
}

const SITE = 'https://uni-in.co.uk';
const LANGS: Lang[] = ['ru', 'en', 'uz'];

// Landing/apply have real translated content per language (see translations.ts) -
// so title/description are localized too, not just the body copy.
const TITLES: Record<'landing' | 'apply', Record<Lang, { title: string; description: string }>> = {
  landing: {
    ru: {
      title: 'Universe In — Учёба за рубежом для студентов из Центральной Азии',
      description: 'Учебная консультация из Великобритании, которая помогает студентам из Узбекистана и Таджикистана поступать в лучшие университеты мира. Бесплатная консультация, помощь с визой и стипендиями.',
    },
    en: {
      title: 'Universe In — Study Abroad from Central Asia',
      description: 'UK-registered study abroad consultancy helping students from Uzbekistan and Tajikistan access world-class universities. Free guidance, visa support, scholarships.',
    },
    uz: {
      title: 'Universe In — Markaziy Osiyodan xorijda taʼlim olish',
      description: 'Buyuk Britaniyada roʻyxatdan oʻtgan taʼlim konsalting kompaniyasi Oʻzbekiston va Tojikiston talabalariga dunyoning yetakchi universitetlariga kirishda yordam beradi. Bepul maslahat, viza va stipendiya boʻyicha yordam.',
    },
  },
  apply: {
    ru: {
      title: 'Узнайте свои шансы — бесплатный тест за 2 минуты | Universe In',
      description: 'Ответьте на несколько вопросов о бюджете, уровне английского и сроках — узнайте, какие университеты и стипендии вам подходят. Бесплатно, 2 минуты.',
    },
    en: {
      title: 'Check Your Chances — Free 2-Minute Quiz | Universe In',
      description: 'Answer a few questions about your budget, English level, and timeline to see which universities and scholarships you qualify for. Free, takes 2 minutes.',
    },
    uz: {
      title: 'Imkoniyatlaringizni bilib oling — Bepul 2 daqiqalik test | Universe In',
      description: 'Byudjet, ingliz tili darajangiz va muddatlar haqida bir nechta savolga javob bering — qaysi universitet va stipendiyalarga mos kelishingizni biling. Bepul, 2 daqiqa.',
    },
  },
};

type PageType = 'landing' | 'apply';
type PageState = { type: PageType; lang: Lang } | { type: 'destination'; slug: string };

// ru has no URL prefix (it's the default/x-default) - en and uz are prefixed.
function pathFor(type: PageType, lang: Lang): string {
  const base = type === 'apply' ? '/apply' : '/';
  if (lang === 'ru') return base;
  return type === 'apply' ? `/${lang}/apply` : `/${lang}/`;
}

function resolvePath(pathname: string): PageState {
  const langMatch = pathname.match(/^\/(en|uz)(\/.*)?$/);
  const lang: Lang = langMatch ? (langMatch[1] as Lang) : 'ru';
  const rest = langMatch ? (langMatch[2] || '/') : pathname;

  if (rest === '/apply' || rest === '/apply/') return { type: 'apply', lang };

  const match = rest.match(/^\/study-in-([a-z-]+)\/?$/);
  if (match && getDestination(match[1])) return { type: 'destination', slug: match[1] };

  return { type: 'landing', lang };
}

export default function App() {
  const [page, setPage] = useState<PageState>(() => resolvePath(window.location.pathname));

  useEffect(() => {
    const handlePopState = () => setPage(resolvePath(window.location.pathname));
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    // Destination pages set their own title/meta/schema - only landing/apply use this static map.
    if (page.type === 'destination') return;
    const meta = TITLES[page.type][page.lang];
    document.title = meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description);
    document.documentElement.lang = page.lang;

    let canonicalEl = document.querySelector('link[rel="canonical"]');
    if (!canonicalEl) {
      canonicalEl = document.createElement('link');
      canonicalEl.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute('href', `${SITE}${pathFor(page.type, page.lang)}`);

    const hreflangEls = LANGS.map((l) => {
      const el = document.createElement('link');
      el.setAttribute('rel', 'alternate');
      el.setAttribute('hreflang', l);
      el.setAttribute('href', `${SITE}${pathFor(page.type, l)}`);
      document.head.appendChild(el);
      return el;
    });
    const xDefault = document.createElement('link');
    xDefault.setAttribute('rel', 'alternate');
    xDefault.setAttribute('hreflang', 'x-default');
    xDefault.setAttribute('href', `${SITE}${pathFor(page.type, 'ru')}`);
    document.head.appendChild(xDefault);

    return () => {
      hreflangEls.forEach((el) => el.remove());
      xDefault.remove();
    };
  }, [page]);

  if (page.type === 'destination') {
    const dest = getDestination(page.slug);
    if (dest) return <LangProvider><DestinationPage destination={dest} /></LangProvider>;
  }

  const navigateLang = (l: Lang) => {
    window.history.pushState({}, '', pathFor(page.type, l));
    setPage({ type: page.type, lang: l });
  };

  return (
    <LangProvider initialLang={page.lang} onLangChange={navigateLang}>
      {page.type === 'apply' ? <><Cursor /><UniverseQuiz variant="page" /></>
       : <LandingPage />}
    </LangProvider>
  );
}
