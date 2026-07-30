import { useEffect, useState } from 'react';
import { LangProvider } from './contexts/LangContext';
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

const TITLES: Record<'landing' | 'apply', { title: string; description: string }> = {
  landing: {
    title: 'Universe In — Study Abroad from Central Asia',
    description: 'UK-registered study abroad consultancy helping students from Uzbekistan and Tajikistan access world-class universities. Free guidance, visa support, scholarships.',
  },
  apply: {
    title: 'Check Your Chances — Free 2-Minute Quiz | Universe In',
    description: 'Answer a few questions about your budget, English level, and timeline to see which universities and scholarships you qualify for. Free, takes 2 minutes.',
  },
};

type PageState = { type: 'landing' } | { type: 'apply' } | { type: 'destination'; slug: string };

function resolvePath(pathname: string): PageState {
  if (pathname === '/apply') return { type: 'apply' };
  const match = pathname.match(/^\/study-in-([a-z-]+)\/?$/);
  if (match && getDestination(match[1])) return { type: 'destination', slug: match[1] };
  return { type: 'landing' };
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
    const meta = TITLES[page.type];
    document.title = meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description);
  }, [page]);

  if (page.type === 'destination') {
    const dest = getDestination(page.slug);
    if (dest) return <LangProvider><DestinationPage destination={dest} /></LangProvider>;
  }

  return (
    <LangProvider>
      {page.type === 'apply' ? <><Cursor /><UniverseQuiz variant="page" /></>
       : <LandingPage />}
    </LangProvider>
  );
}
