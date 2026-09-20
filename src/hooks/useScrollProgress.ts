import { useState, useEffect } from 'react';

export interface ScrollInfo {
  progress: number;
  scrollY: number;
  activeSection: string;
}

const SECTION_IDS = [
  'home',
  'about',
  'skills',
  'experience',
  'projects',
  'truthlens',
  'certificates',
  'documents',
  'contact',
];

export function useScrollProgress(): ScrollInfo {
  const [scrollInfo, setScrollInfo] = useState<ScrollInfo>({
    progress: 0,
    scrollY: 0,
    activeSection: 'home',
  });

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
          const progress = maxScroll > 0 ? Math.min(Math.max(currentY / maxScroll, 0), 1) : 0;

          // Detect active section
          let currentSection = 'home';
          const scrollPosWithOffset = currentY + 160;

          for (const id of SECTION_IDS) {
            const el = document.getElementById(id);
            if (el) {
              const top = el.offsetTop;
              const height = el.offsetHeight;
              if (scrollPosWithOffset >= top && scrollPosWithOffset < top + height) {
                currentSection = id;
              }
            }
          }

          setScrollInfo({
            progress,
            scrollY: currentY,
            activeSection: currentSection,
          });

          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollInfo;
}
