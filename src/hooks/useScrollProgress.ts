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
  const elementsRef = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    // Cache elements on mount
    SECTION_IDS.forEach(id => {
      elementsRef.current[id] = document.getElementById(id);
    });

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
          const progress = maxScroll > 0 ? Math.min(Math.max(currentY / maxScroll, 0), 1) : 0;

          document.documentElement.style.setProperty('--scroll-progress', `${progress}`);

          // Detect active section using cached elements
          let currentSection = 'home';
          const scrollPosWithOffset = currentY + 300;

          for (const id of SECTION_IDS) {
            const el = elementsRef.current[id];
            if (el) {
              const top = el.offsetTop;
              const height = el.offsetHeight;
              if (scrollPosWithOffset >= top && scrollPosWithOffset < top + height) {
                currentSection = id;
                break; // Found it, stop searching
              }
            }
          }

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
