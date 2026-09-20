import { useState, useCallback } from 'react';
import { useScrollProgress, useSpotlightEffect, useScrollReveal } from './hooks';
import { SceneManager } from './scenes';
import {
  Navbar,
  Footer,
  CertModal,
  Toast,
  ModalData,
  CustomCursor,
  Prologue,
  FinalShot,
  ScrollProgressBar,
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
  const { progress, activeSection } = useScrollProgress();
  useSpotlightEffect();
  useScrollReveal();

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

  const handleEnterWorld = useCallback(() => {
    const heroEl = document.getElementById('home');
    if (heroEl) {
      heroEl.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="portfolio-root">
      {/* Cinematic Scroll Progress Bar — thin red strip at page top */}
      <ScrollProgressBar progress={progress} />

      {/* Desktop Cinematic Custom Cursor */}
      <CustomCursor />

      {/* Atmospheric Overlays: Vignette & Subtle Film Grain */}
      <div className="vignette-overlay" aria-hidden="true" />
      <div className="film-grain-overlay" aria-hidden="true" />

      {/* 3D WebGL Background Canvas Layer */}
      <SceneManager scrollProgress={progress} activeSection={activeSection} />

      {/* Main Interactive Portfolio Content */}
      <div className="content-wrapper">
        <Navbar activeSection={activeSection} />

        <main>
          {/* Chapter 01 — Prologue */}
          <Prologue onEnterWorld={handleEnterWorld} />

          {/* Chapter 02 — Hero */}
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
    </div>
  );
}

export default App;
