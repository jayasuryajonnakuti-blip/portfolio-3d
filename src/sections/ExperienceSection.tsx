import React from 'react';
import { Briefcase, Eye, ExternalLink } from 'lucide-react';
import { experienceData } from '../data';
import { ModalData } from '../components';
import { getAssetUrl } from '../utils';

interface ExperienceSectionProps {
  onOpenModal: (data: ModalData) => void;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ onOpenModal }) => {
  return (
    <section id="experience">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <Briefcase size={14} />
            <span>03 / CAREER MILESTONES</span>
          </div>
          <h2 className="section-title">
            Industry <span className="text-gradient-red">Experience</span>
          </h2>
          <p className="section-desc">
            Hands-on professional developer internships contributing to enterprise Java architectures, object-oriented design, and production workflows.
          </p>
        </div>

        <div className="timeline-container">
          {/* Glowing Red Timeline Rail */}
          <div className="timeline-rail" />

          {experienceData.map((exp) => (
            <div key={exp.id} className="timeline-entry">
              {/* Pulsing Timeline Orb */}
              <div className="timeline-orb">
                <span className="timeline-orb-pulse" />
              </div>

              <div className="spotlight-card timeline-card" style={{ padding: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
                  <span className="timeline-period-badge">{exp.period}</span>
                  <span className="timeline-exp-id">NODE // {exp.id.toUpperCase()}</span>
                </div>
                <h3 className="timeline-role">{exp.role}</h3>
                <div className="timeline-company">{exp.company}</div>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '18px', fontSize: '0.96rem' }}>
                  {exp.description}
                </p>

                <ul className="timeline-bullets">
                  {exp.bullets.map((b, bIdx) => (
                    <li key={bIdx}>{b}</li>
                  ))}
                </ul>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '22px' }}>
                  {exp.skills.map((s) => (
                    <span key={s} className="skill-item" style={{ fontSize: '0.78rem' }}>
                      {s}
                    </span>
                  ))}
                </div>

                {/* Verified Internship Certificate & LOR preview buttons */}
                {exp.certificates && exp.certificates.length > 0 && (
                  <div className="timeline-certs-group">
                    {exp.certificates.map((c, cIdx) => (
                      <div key={cIdx} style={{ display: 'flex', gap: '8px' }}>
                        <button
                          type="button"
                          className="btn-cert-action"
                          onClick={() =>
                            onOpenModal({
                              imageSrc: c.imageSrc,
                              title: c.title,
                              pdfSrc: c.pdfSrc,
                            })
                          }
                        >
                          <Eye size={14} />
                          <span>{c.label}</span>
                        </button>
                        <a
                          href={getAssetUrl(c.pdfSrc)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-cert-action"
                        >
                          <ExternalLink size={14} />
                          <span>PDF</span>
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
