import { useState, useEffect, useRef } from 'react';

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
  'finale',
];

export function useScrollProgress(): { activeSection: string } {
  const [activeSection, setActiveSection] = useState<string>('home');
  const activeSectionRef = useRef<string>('home');

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
          const progress = maxScroll > 0 ? Math.min(Math.max(currentY / maxScroll, 0), 1) : 0;

          // Update CSS variable directly without triggering React re-renders!
          document.documentElement.style.setProperty('--scroll-progress', `${progress}`);

          // Detect active section
          let currentSection = 'home';
          const scrollPosWithOffset = currentY + 220;

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

          // ONLY trigger React re-render when the active section genuinely changes!
          if (activeSectionRef.current !== currentSection) {
            activeSectionRef.current = currentSection;
            setActiveSection(currentSection);
          }

          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { activeSection };
}
