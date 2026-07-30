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
import EnquiryForm from './components/EnquiryForm';

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

export default function App() {
  const [page, setPage] = useState<'landing' | 'enquiry' | 'apply'>(() => {
    const p = window.location.pathname;
    if (p === '/enquiry') return 'enquiry';
    if (p === '/apply') return 'apply';
    return 'landing';
  });

  useEffect(() => {
    const handlePopState = () => {
      const p = window.location.pathname;
      setPage(p === '/enquiry' ? 'enquiry' : p === '/apply' ? 'apply' : 'landing');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    <LangProvider>
      {page === 'enquiry' ? <EnquiryForm />
       : page === 'apply' ? <><Cursor /><UniverseQuiz variant="page" /></>
       : <LandingPage />}
    </LangProvider>
  );
}
