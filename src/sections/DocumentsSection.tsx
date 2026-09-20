import React from 'react';
import { FileText, Download, FileCheck } from 'lucide-react';
import { documentsData } from '../data';
import { getAssetUrl } from '../utils';

export const DocumentsSection: React.FC = () => {
  return (
    <section id="documents">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <FileCheck size={14} />
            <span>07 / DOCUMENTATION ARCHIVE</span>
          </div>
          <h2 className="section-title">
            Engineering <span className="text-gradient-red">Documents & Resume</span>
          </h2>
          <p className="section-desc">
            Complete technical documentation, research papers, full 49-page TruthLens project report, and official resume.
          </p>
        </div>

        <div className="docs-grid">
          {documentsData.map((doc) => (
            <div
              key={doc.id}
              className="doc-card spotlight-card"
              style={doc.isPrimary ? { borderColor: 'rgba(255, 26, 26, 0.45)' } : {}}
            >
              <div>
                <span className="section-tag" style={{ marginBottom: '14px', fontSize: '0.72rem' }}>
                  {doc.badge}
                </span>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '10px' }}>
                  {doc.title}
                </h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.94rem', marginBottom: '24px' }}>
                  {doc.description}
                </p>
              </div>

              <div>
                <a
                  href={getAssetUrl(doc.pdfUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`btn ${doc.isPrimary ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  {doc.isPrimary ? <FileText size={17} /> : <Download size={17} />}
                  <span>{doc.buttonLabel}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
