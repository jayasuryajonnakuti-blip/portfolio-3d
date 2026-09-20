import { useEffect } from 'react';

export function useSpotlightEffect() {
  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    let activeCard: HTMLElement | null = null;
    let cardRect: DOMRect | null = null;

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const card = target?.closest<HTMLElement>('.spotlight-card');
      if (card) {
        activeCard = card;
        cardRect = card.getBoundingClientRect();
      } else {
        activeCard = null;
        cardRect = null;
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!activeCard || !cardRect) return;
      const x = e.clientX - cardRect.left;
      const y = e.clientY - cardRect.top;
      activeCard.style.setProperty('--mouse-x', `${x}px`);
      activeCard.style.setProperty('--mouse-y', `${y}px`);
    };

    window.addEventListener('mouseover', onMouseOver, { passive: true });
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);
}
