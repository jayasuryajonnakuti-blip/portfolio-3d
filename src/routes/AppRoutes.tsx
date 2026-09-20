import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import {
  HomePage,
  WorkIndexPage,
  TruthLensCaseStudyPage,
  AboutPage,
  ResumePage,
  ContactPage,
} from '../pages';
import { ModalData } from '../components';

interface AppRoutesProps {
  onOpenModal: (data: ModalData) => void;
  onCopyEmail: (email: string) => void;
}

export const AppRoutes: React.FC<AppRoutesProps> = ({ onOpenModal, onCopyEmail }) => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/work" element={<WorkIndexPage />} />
      <Route path="/work/truthlens" element={<TruthLensCaseStudyPage />} />
      <Route path="/about" element={<AboutPage onOpenModal={onOpenModal} />} />
      <Route path="/resume" element={<ResumePage />} />
      <Route path="/contact" element={<ContactPage onCopyEmail={onCopyEmail} />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
