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
  ScrollProgressBar,
  ScrollToTop,
} from './components';
import { AppRoutes } from './routes/AppRoutes';

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

  return (
    <div className="portfolio-root">
      {/* Scroll restoration upon page transitions */}
      <ScrollToTop />

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
        <Navbar />

        <main className="main-content-stream">
          <AppRoutes onOpenModal={handleOpenModal} onCopyEmail={handleCopyEmail} />
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
