import { useState, useCallback, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { useScrollProgress, useSpotlightEffect, useScrollReveal } from './hooks';
import { SceneManager } from './scenes';
import {
  AIChatbot,
  Navbar,
  Footer,
  CertModal,
  Toast,
  ModalData,
  CustomCursor,
  FinalShot,
  ScrollProgressBar,
  LoadingScreen,
} from './components';
import {
  HeroSection,
  AboutSection,
  SkillsSection,
  ExperienceSection,
  ProjectsSection,
  TruthLensSection,
  CertificatesSection,
  DocumentsSection,
  ContactSection,
} from './sections';

export function App() {
  const { activeSection } = useScrollProgress();
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const loadingInterval = useRef<any>(null);
  
  useSpotlightEffect();
  useScrollReveal();

  useEffect(() => {
    // Simulated smooth progress for "Master Portfolio" feel
    loadingInterval.current = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 95) {
          if (loadingInterval.current) clearInterval(loadingInterval.current);
          return 95;
        }
        const step = prev < 30 ? 2 : prev < 70 ? 1 : 0.5;
        return prev + step;
      });
    }, 40);

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.2,
      lerp: 0.08,
    });

    lenis.on('scroll', () => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        ScrollTrigger.update();
      });
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      if (loadingInterval.current) clearInterval(loadingInterval.current);
    };
  }, []);

  // Handle actual load completion
  const onSceneLoaded = useCallback(() => {
    setLoadingProgress(100);
    setTimeout(() => {
      setIsLoaded(true);
    }, 500);
  }, []);

  const [modalData, setModalData] = useState<ModalData | null>(null);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [showToast, setShowToast] = useState<boolean>(false);

  const handleOpenModal = useCallback((data: ModalData) => {
    setModalData(data);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalData(null);
  }, []);

  const handleCopyEmail = useCallback((email: string) => {
    navigator.clipboard
      .writeText(email)
      .then(() => {
        setToastMessage(`Email copied to clipboard: ${email}`);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3500);
      })
      .catch(() => {
        setToastMessage(email);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3500);
      });
  }, []);

  return (
    <div className="portfolio-root">
      <LoadingScreen progress={loadingProgress} isLoaded={isLoaded} />

      {/* Cinematic Scroll Progress Bar — updates directly on scroll */}
      <ScrollProgressBar />

      {/* Desktop Cinematic Custom Cursor */}
      <CustomCursor />

      {/* Atmospheric Overlays: Vignette & Subtle Film Grain */}
      <div className="vignette-overlay" aria-hidden="true" />
      <div className="film-grain-overlay" aria-hidden="true" />

      {/* 3D WebGL Background Canvas Layer */}
      <SceneManager 
        activeSection={activeSection} 
        scrollProgress={0} 
        onLoadingProgress={(p) => {
          // Merge real progress with simulated if real is higher
          setLoadingProgress(prev => Math.max(prev, p));
        }}
        onLoaded={onSceneLoaded}
      />

      {/* Main Interactive Portfolio Content */}
      <div className="content-wrapper" style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 1.5s ease-in-out' }}>
        <Navbar activeSection={activeSection} />

        <main>
          {/* Chapter 01 — Hero */}
          <HeroSection />

          {/* Chapter 03 — About */}
          <AboutSection />

          {/* Chapter 04 — Skills */}
          <SkillsSection />

          {/* Chapter 05 — Experience & Education */}
          <ExperienceSection onOpenModal={handleOpenModal} />

          {/* Chapter 06 — Project Universe */}
          <ProjectsSection onOpenModal={handleOpenModal} />

          {/* Chapter 07 — TruthLens AI (Main Showcase) */}
          <TruthLensSection onOpenModal={handleOpenModal} />

          {/* Chapter 08 — Certificates Vault */}
          <CertificatesSection onOpenModal={handleOpenModal} />

          {/* Chapter 09 — Documents */}
          <DocumentsSection />

          {/* Chapter 10 — Contact */}
          <ContactSection onCopyEmail={handleCopyEmail} />

          {/* Final Shot — Cinematic Pull-Back */}
          <FinalShot />
        </main>

        <Footer />
      </div>

      {/* Modal & Toast Overlays */}
      <CertModal modalData={modalData} onClose={handleCloseModal} />
      <Toast message={toastMessage} show={showToast} />
      
      {/* AI Assistant Layer */}
      <AIChatbot />
    </div>
  );
}

export default App;
