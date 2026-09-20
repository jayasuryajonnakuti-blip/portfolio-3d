import React from 'react';
import { ExternalLink, Eye } from 'lucide-react';
import { certificateOrgsData } from '../data';
import { ModalData } from '../components';
import { getAssetUrl } from '../utils';

interface CertificatesSectionProps {
  onOpenModal: (data: ModalData) => void;
}

export const CertificatesSection: React.FC<CertificatesSectionProps> = ({ onOpenModal }) => {
  return (
    <section id="certificates">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">05 / VERIFIED CREDENTIALS</div>
          <h2 className="section-title">
            Credentials <span className="text-gradient">& Certifications</span>
          </h2>
          <p className="section-desc">
            Structured by issuing organization. Click on any credential to view the high-resolution certificate or inspect the official PDF document.
          </p>
        </div>

        <div className="certs-library-grid">
          {certificateOrgsData.map((org) => (
            <div key={org.id} className="cert-org-card spotlight-card">
              <div className="cert-org-top">
                <div className="cert-org-brand">
                  <div className="org-icon-avatar">{org.shortCode}</div>
                  <div>
                    <h3 className="cert-org-name">{org.name}</h3>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {org.issuerSubtitle}
                    </span>
                  </div>
                </div>
                <span className="cert-count-badge">{org.credentialsCount}</span>
              </div>

              <div className="cert-items-stack">
                {org.items.map((item) => (
                  <div key={item.id} className="cert-single-item">
                    <h4 className="cert-item-title">{item.title}</h4>
                    <div className="cert-item-meta">
                      <span>📅 {item.date}</span>
                      {item.expiry && (
                        <>
                          <span>•</span>
                          <span>⏳ {item.expiry}</span>
                        </>
                      )}
                      {item.subtitle && (
                        <>
                          <span>•</span>
                          <span>{item.subtitle}</span>
                        </>
                      )}
                    </div>
                    <div className="cert-item-actions">
                      <button
                        type="button"
                        className="btn-cert-action"
                        onClick={() =>
                          onOpenModal({
                            imageSrc: item.imageSrc,
                            title: `${org.name} — ${item.title}`,
                            pdfSrc: item.pdfSrc,
                          })
                        }
                      >
                        <Eye size={14} />
                        <span>View Certificate</span>
                      </button>
                      <a
                        href={getAssetUrl(item.pdfSrc)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-cert-action"
                      >
                        <ExternalLink size={14} />
                        <span>Open PDF</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
