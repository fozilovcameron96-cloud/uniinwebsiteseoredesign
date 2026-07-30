import { useEffect } from 'react';

export default function Cursor() {
  useEffect(() => {
    if ('ontouchstart' in window) {
      const cur = document.getElementById('cur');
      const cur2 = document.getElementById('cur2');
      if (cur) cur.style.display = 'none';
      if (cur2) cur2.style.display = 'none';
      document.body.style.cursor = 'auto';
      return;
    }

    let mx = 0, my = 0, cx = 0, cy = 0;
    const cur = document.getElementById('cur');
    const cur2 = document.getElementById('cur2');

    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      if (cur) { cur.style.left = mx + 'px'; cur.style.top = my + 'px'; }
    };
    document.addEventListener('mousemove', onMove);

    const interval = setInterval(() => {
      cx += (mx - cx) * 0.1; cy += (my - cy) * 0.1;
      if (cur2) { cur2.style.left = cx + 'px'; cur2.style.top = cy + 'px'; }
    }, 16);

    const interactives = document.querySelectorAll('button, a, .dest-chip, .partner-pill, .obj-card, .how-card, .tm-card, .faq-item');
    const onEnter = () => {
      if (cur) { cur.style.width = '16px'; cur.style.height = '16px'; }
      if (cur2) { cur2.style.width = '48px'; cur2.style.height = '48px'; }
    };
    const onLeave = () => {
      if (cur) { cur.style.width = '8px'; cur.style.height = '8px'; }
      if (cur2) { cur2.style.width = '32px'; cur2.style.height = '32px'; }
    };
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    return () => {
      document.removeEventListener('mousemove', onMove);
      clearInterval(interval);
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
    };
  }, []);

  return (
    <>
      <div id="cur" />
      <div id="cur2" />
    </>
  );
}
