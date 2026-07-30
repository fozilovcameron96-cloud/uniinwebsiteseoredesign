import { useEffect, useRef } from 'react';

export function useReveal() {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.12 }
    );
    const el = ref.current;
    if (el) {
      el.querySelectorAll('.reveal').forEach((r) => obs.observe(r));
    }
    return () => obs.disconnect();
  }, []);

  return ref;
}
