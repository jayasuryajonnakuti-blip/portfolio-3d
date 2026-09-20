import React, { useEffect, useRef } from 'react';

interface ScrollProgressBarProps {
  progress?: number; // Optional fallback
}

/**
 * High-performance cinematic red scroll progress bar that updates via
 * direct DOM transform without triggering React re-renders.
 */
export const ScrollProgressBar: React.FC<ScrollProgressBarProps> = () => {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const max = document.documentElement.scrollHeight - window.innerHeight;
          const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
          if (barRef.current) {
            barRef.current.style.width = `${Math.min(pct, 100)}%`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      ref={barRef}
      className="scroll-progress-bar"
      aria-hidden="true"
    />
  );
};
