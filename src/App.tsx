import { lazy, Suspense, useEffect, useState } from 'react';
import { LangProvider, useLang } from './contexts/LangContext';
import type { Lang } from './data/translations';
import UrgencyBar from './components/UrgencyBar';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Destinations from './components/Destinations';
import ObjectionCrusher from './components/ObjectionCrusher';
import HowItWorks from './components/HowItWorks';
import ProofWall from './components/ProofWall';
import Accreditation from './components/Accreditation';
import Comparison from './components/Comparison';
import RiskReversal from './components/RiskReversal';
import FAQ from './components/FAQ';
import Partners from './components/Partners';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import FloatCTA from './components/FloatCTA';
import DestinationPage from './components/DestinationPage';
import Privacy from './components/Privacy';
import ThankYou from './components/ThankYou';
import Enquiry from './components/Enquiry';
import { getDestination } from './data/destinations';

// Fallback only: in production vercel.json sends /start to start.html, its own
// lightweight entry. This keeps /start working if that route is ever missing.
// Lazy, so the phone-number data it carries never slows down the rest of the site.
const StartForm = lazy(() => import('./components/StartForm'));
function StartRoute() {
  const { lang, setLang } = useLang();
  return <StartForm lang={lang} setLang={setLang} />;
}

// The old /apply quiz page now sends people to /start. vercel.json does this
// as a 301 before the app even loads; this covers anywhere that rule isn't.
function ToStart({ lang }: { lang: Lang }) {
  useEffect(() => { window.location.replace(startPath(lang) + window.location.search); }, [lang]);
  return <div style={{ minHeight: '100vh', background: '#F0F2F5' }} />;
}

// Every "apply" button on the site goes to the one application form, /start
// (18 Nov 2026). The old quiz (UniverseQuiz) only asked for $5k and had no £10k
// rule, so a visitor filtered out on /start could still become a lead through
// it. Uzbek visitors get the Russian form: it has no Uzbek version.
function startPath(lang: Lang): string {
  return lang === 'en' ? '/en/start' : '/start';
}

function LandingPage() {
  const { lang } = useLang();
  const openQuiz = () => { window.location.href = startPath(lang); };

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
      <UrgencyBar />
      <Navbar />
      <Hero onOpenChat={openQuiz} />
      {/* Proof immediately after the hero. Destinations used to sit here - ten
          links pointing off the page at exactly the moment the only job is to
          earn the next scroll - so it has moved down near the footer where it
          still carries its SEO value to the destination pages. */}
      <ProofWall />
      <Partners />
      <ObjectionCrusher />
      <HowItWorks />
      {/* Straight after "how it works", which is where someone starts wondering
          whether to just do this themselves. It used to sit ~7700px down a
          12900px page, so far in that it read as an afterthought. */}
      <Comparison />
      {/* The three real objections (cost, English level, visa refusal) answered
          directly above a CTA. The informational rest are further down. */}
      <FAQ pick={[0, 1, 5]} onOpenChat={openQuiz} />
      <Accreditation />
      <Destinations />
      <RiskReversal />
      <FAQ pick={[2, 3, 4]} secondary />
      <FinalCTA onOpenChat={openQuiz} />
      <Footer />
      <FloatCTA onOpenChat={openQuiz} />
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
      description: 'Учебная консультация из Великобритании, которая помогает студентам из Узбекистана и Таджикистана поступать в лучшие университеты мира. Консультация, помощь с визой и жильём.',
    },
    en: {
      title: 'Universe In — Study Abroad from Central Asia',
      description: 'UK-registered study abroad consultancy helping students from Uzbekistan and Tajikistan access world-class universities. Guidance, visa support and accommodation help.',
    },
    uz: {
      title: 'Universe In — Markaziy Osiyodan xorijda taʼlim olish',
      description: 'Buyuk Britaniyada roʻyxatdan oʻtgan taʼlim konsalting kompaniyasi Oʻzbekiston va Tojikiston talabalariga dunyoning yetakchi universitetlariga kirishda yordam beradi. Maslahat, viza va turar joy boʻyicha yordam.',
    },
  },
  apply: {
    ru: {
      title: 'Узнайте свои шансы — тест за 2 минуты | Universe In',
      description: 'Ответьте на несколько вопросов о бюджете, уровне английского и сроках — узнайте, какие университеты и стипендии вам подходят. 2 минуты.',
    },
    en: {
      title: 'Check Your Chances — 2-Minute Quiz | Universe In',
      description: 'Answer a few questions about your budget, English level, and timeline to see which universities and scholarships you qualify for. Takes 2 minutes.',
    },
    uz: {
      title: 'Imkoniyatlaringizni bilib oling — 2 daqiqalik test | Universe In',
      description: 'Byudjet, ingliz tili darajangiz va muddatlar haqida bir nechta savolga javob bering — qaysi universitet va stipendiyalarga mos kelishingizni biling. 2 daqiqa.',
    },
  },
};

// Privacy is its own type rather than a PageType because it has no hreflang
// set and no localized title map - it is one page in whichever language the
// visitor is already reading, and it should never be indexed.
type PageType = 'landing' | 'apply';
type PageState =
  | { type: PageType; lang: Lang }
  | { type: 'destination'; slug: string }
  | { type: 'privacy'; lang: Lang }
  | { type: 'thanks'; lang: Lang }
  | { type: 'enquiry'; lang: Lang }
  // The Round 3 ad landing page (18 Nov 2026): an instant-form-style apply
  // flow. Not indexed, no nav, nothing to click away to. See StartForm.tsx.
  | { type: 'start'; lang: Lang };

// ru has no URL prefix (it's the default/x-default) - en and uz are prefixed.
// Privacy is included so the language switcher keeps you on the page you are
// reading instead of dropping you back on the homepage mid-policy.
function pathFor(type: PageType | 'privacy' | 'thanks' | 'enquiry' | 'start', lang: Lang): string {
  const base = type === 'landing' ? '/' : `/${type}`;
  if (lang === 'ru') return base;
  return type === 'landing' ? `/${lang}/` : `/${lang}/${type}`;
}

function resolvePath(pathname: string): PageState {
  const langMatch = pathname.match(/^\/(en|uz)(\/.*)?$/);
  const lang: Lang = langMatch ? (langMatch[1] as Lang) : 'ru';
  const rest = langMatch ? (langMatch[2] || '/') : pathname;

  if (rest === '/apply' || rest === '/apply/') return { type: 'apply', lang };
  if (rest === '/privacy' || rest === '/privacy/') return { type: 'privacy', lang };
  if (rest === '/thanks' || rest === '/thanks/') return { type: 'thanks', lang };
  if (rest === '/enquiry' || rest === '/enquiry/') return { type: 'enquiry', lang };
  if (rest === '/start' || rest === '/start/') return { type: 'start', lang };

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
    // Destination pages set their own title/meta/schema, and Privacy sets its
    // own and is noindex - neither has an entry in TITLES, so reading one
    // would throw.
    if (page.type === 'destination' || page.type === 'privacy' || page.type === 'thanks' || page.type === 'enquiry' || page.type === 'start') return;
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
    // resolvePath only produces a destination state for a slug that exists, so
    // this is unreachable - but the branch has to return unconditionally,
    // otherwise a destination state falls through into code below that reads
    // page.lang, which a destination state does not have.
    return <LangProvider><LandingPage /></LangProvider>;
  }

  const navigateLang = (l: Lang) => {
    window.history.pushState({}, '', pathFor(page.type, l));
    setPage({ type: page.type, lang: l });
  };

  return (
    <LangProvider initialLang={page.lang} onLangChange={navigateLang}>
      {page.type === 'start' ? <Suspense fallback={<div style={{ minHeight: '100vh', background: '#F0F2F5' }} />}><StartRoute /></Suspense>
       : page.type === 'apply' ? <ToStart lang={page.lang} />
       : page.type === 'privacy' ? <Privacy />
       : page.type === 'thanks' ? <ThankYou />
       : page.type === 'enquiry' ? <Enquiry />
       : <LandingPage />}
    </LangProvider>
  );
}
