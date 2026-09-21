import React, { useEffect } from 'react';
import { ExternalLink, X } from 'lucide-react';
import { getAssetUrl } from '../utils';

export interface ModalData {
  imageSrc: string;
  title: string;
  pdfSrc?: string;
}

interface CertModalProps {
  modalData: ModalData | null;
  onClose: () => void;
}

export const CertModal: React.FC<CertModalProps> = ({ modalData, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && modalData) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalData, onClose]);

  if (!modalData) return null;

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-content-card" onClick={(e) => e.stopPropagation()}>
        <div className="cert-modal-header">
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>{modalData.title}</h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              {modalData.pdfSrc ? 'Verified Credential Document' : 'Project Screenshot Preview'}
            </p>
          </div>
          <button
            type="button"
            className="cert-modal-close"
            onClick={onClose}
            aria-label="Close Preview"
          >
            <X size={24} />
          </button>
        </div>

        <div className="cert-modal-body">
          <img
            src={getAssetUrl(modalData.imageSrc)}
            alt={modalData.title}
            className="cert-modal-img"
          />
        </div>

        <div className="cert-modal-footer">
          {modalData.pdfSrc && (
            <a
              href={getAssetUrl(modalData.pdfSrc)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-sm"
            >
              <span>Open Original PDF</span>
              <ExternalLink size={14} />
            </a>
          )}
          <button type="button" className="btn btn-secondary btn-sm" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
