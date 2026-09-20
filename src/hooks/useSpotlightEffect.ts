import { useEffect } from 'react';

export function useSpotlightEffect() {
  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    const cards = document.querySelectorAll<HTMLElement>('.spotlight-card');
    if (!cards.length) return;

    const handleMouseMove = (e: MouseEvent) => {
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        if (
          e.clientX >= rect.left - 120 &&
          e.clientX <= rect.right + 120 &&
          e.clientY >= rect.top - 120 &&
          e.clientY <= rect.bottom + 120
        ) {
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          card.style.setProperty('--mouse-x', `${x}px`);
          card.style.setProperty('--mouse-y', `${y}px`);
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
}
