import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

export function useScrollReveal() {
  useEffect(() => {
    // Respect user's motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Initialize Lenis smooth scroll
    let lenis: Lenis | null = null;
    if (!prefersReducedMotion) {
      lenis = new Lenis({
        duration: 1.25,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1.0,
      });

      lenis.on('scroll', ScrollTrigger.update);

      const tickerCallback = (time: number) => {
        lenis?.raf(time * 1000);
      };

      gsap.ticker.add(tickerCallback);
      gsap.ticker.lagSmoothing(0);
    }

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) return;

      // 1. Hero entrance sequence
      const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      heroTl
        .fromTo('.hero-content .status-pill', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.15 })
        .fromTo('.hero-title', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.3')
        .fromTo('.hero-subtitle', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.5')
        .fromTo('.hero-bio', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
        .fromTo('.hero-content .btn-group', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
        .fromTo('.hero-stat-item', { opacity: 0, scale: 0.9, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: 0.5, stagger: 0.1 }, '-=0.3')
        .fromTo('.hero-profile-card', { opacity: 0, x: 40, scale: 0.95 }, { opacity: 1, x: 0, scale: 1, duration: 0.9, ease: 'power2.out' }, '-=0.7');

      // 2. Section Headers scroll animation
      const headers = document.querySelectorAll('.section-header');
      headers.forEach((header) => {
        gsap.fromTo(
          header,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: header,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // 3. Spotlight cards / grid items reveal
      const gridContainers = document.querySelectorAll(
        '.skills-categories-grid, .about-grid, .timeline-container, .certs-library-grid, .contact-channels-grid, .docs-grid'
      );

      gridContainers.forEach((container) => {
        const cards = container.children;
        if (cards.length > 0) {
          gsap.fromTo(
            cards,
            { opacity: 0, y: 35 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: container,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            }
          );
        }
      });

      // 4. Featured Project / TruthLens Forensic Card
      const featuredCard = document.querySelector('.featured-project-card, .forensic-panel');
      if (featuredCard) {
        gsap.fromTo(
          featuredCard,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: featuredCard,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // 5. Secondary Projects Cards
      const secCards = document.querySelectorAll('.secondary-project-card');
      secCards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // 6. Finale Reveal
      const finale = document.querySelector('.final-shot-container');
      if (finale) {
        gsap.fromTo(
          finale,
          { opacity: 0, scale: 0.95 },
          {
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: finale,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    });

    return () => {
      lenis?.destroy();
      ctx.revert();
    };
  }, []);
}
