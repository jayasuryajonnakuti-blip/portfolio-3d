import React from 'react';
import { Award, Eye, ExternalLink, ShieldCheck } from 'lucide-react';
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
          <div className="section-tag">
            <Award size={14} />
            <span>06 / VERIFIED CREDENTIALS</span>
          </div>
          <h2 className="section-title">
            Industry <span className="text-gradient-red">Certifications</span>
          </h2>
          <p className="section-desc">
            Official verified certifications in Agentic AI, Data Structures & Algorithms, Java, and Software Engineering from Oracle, Scaler, TCS iON, and MongoDB.
          </p>
        </div>

        <div className="certs-library-grid">
          {certificateOrgsData.map((org) => {
            const isOracle = org.id === 'oracle';
            return (
              <div
                key={org.id}
                className={`cert-org-card spotlight-card ${isOracle ? 'cert-org-featured' : ''}`}
              >
                {isOracle && (
                  <div className="cert-featured-banner">
                    <ShieldCheck size={13} color="#FF1A1A" />
                    <span>PREMIER CREDENTIAL // ORACLE UNIVERSITY</span>
                  </div>
                )}
                <div className="cert-org-top">
                  <div className="cert-org-brand">
                    <div className="org-icon-avatar">{org.shortCode}</div>
                    <div>
                      <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>{org.name}</h3>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                        {org.issuerSubtitle}
                      </span>
                    </div>
                  </div>
                  <span className="cert-count-badge">{org.credentialsCount}</span>
                </div>

              <div className="cert-items-stack">
                {org.items.map((item) => (
                  <div key={item.id} className="cert-single-item">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <ShieldCheck size={16} color="#FF1A1A" />
                      <h4 className="cert-item-title">{item.title}</h4>
                    </div>

                    <div className="cert-item-meta">
                      <span>DATE: {item.date}</span>
                      {item.expiry && (
                        <>
                          <span>•</span>
                          <span style={{ color: 'var(--red-bright)' }}>EXPIRY: {item.expiry}</span>
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
                        <span>Inspect Certificate</span>
                      </button>
                      <a
                        href={getAssetUrl(item.pdfSrc)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-cert-action"
                      >
                        <ExternalLink size={14} />
                        <span>Official PDF</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      </div>
    </section>
  );
};
