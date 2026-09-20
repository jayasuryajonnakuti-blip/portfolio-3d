import React from 'react';
import { ArrowUpRight, Download } from 'lucide-react';
import { documentsData } from '../data';
import { getAssetUrl } from '../utils';

export const DocumentsSection: React.FC = () => {
  return (
    <section id="documents">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">06 / PUBLICATIONS & ASSETS</div>
          <h2 className="section-title">
            Documents <span className="text-gradient">& Reports</span>
          </h2>
          <p className="section-desc">
            Access official academic documentation, architecture specifications, and resume copies.
          </p>
        </div>

        <div className="docs-grid">
          {documentsData.map((doc) => (
            <div key={doc.id} className="doc-card spotlight-card">
              <div>
                <span className="doc-badge">{doc.badge}</span>
                <h3>{doc.title}</h3>
                <p>{doc.description}</p>
              </div>

              <div>
                <a
                  href={getAssetUrl(doc.pdfUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`btn ${doc.isPrimary ? 'btn-primary' : 'btn-secondary'} btn-sm`}
                >
                  <span>{doc.buttonLabel}</span>
                  {doc.isPrimary ? <ArrowUpRight size={15} /> : <Download size={15} />}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
