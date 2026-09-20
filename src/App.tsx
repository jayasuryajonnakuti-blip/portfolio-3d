import { useState, useCallback } from 'react';
import { useScrollProgress, useSpotlightEffect } from './hooks';
import { SceneManager } from './scenes';
import { Navbar, Footer, CertModal, Toast, ModalData } from './components';
import {
  HeroSection,
  AboutSection,
  SkillsSection,
  ExperienceSection,
  ProjectsSection,
  CertificatesSection,
  DocumentsSection,
  ContactSection,
} from './sections';

export function App() {
  const { progress, activeSection } = useScrollProgress();
  useSpotlightEffect();

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
      {/* 3D Background Canvas Layer */}
      <SceneManager scrollProgress={progress} activeSection={activeSection} />

      {/* Main Interactive Portfolio Content */}
      <div className="content-wrapper">
        <Navbar activeSection={activeSection} />

        <main>
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ExperienceSection onOpenModal={handleOpenModal} />
          <ProjectsSection onOpenModal={handleOpenModal} />
          <CertificatesSection onOpenModal={handleOpenModal} />
          <DocumentsSection />
          <ContactSection onCopyEmail={handleCopyEmail} />
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
