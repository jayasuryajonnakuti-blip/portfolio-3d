import React from 'react';
import { experienceData } from '../data';
import { ModalData } from '../components';

interface ExperienceSectionProps {
  onOpenModal: (data: ModalData) => void;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ onOpenModal }) => {
  return (
    <section id="experience">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">03 / CAREER JOURNEY</div>
          <h2 className="section-title">
            Professional <span className="text-gradient">Experience</span>
          </h2>
          <p className="section-desc">
            Hands-on internships delivering full-stack Java solutions, problem-solving, and software engineering practices.
          </p>
        </div>

        <div className="timeline-container">
          {experienceData.map((exp) => (
            <div key={exp.id} className="timeline-card spotlight-card">
              <div className="timeline-header">
                <div>
                  <h3 className="timeline-role">{exp.role}</h3>
                  <div className="timeline-company">{exp.company}</div>
                </div>
                <div className="timeline-date">{exp.period}</div>
              </div>

              <p className="timeline-desc">{exp.description}</p>

              <ul className="timeline-bullets">
                {exp.bullets.map((bullet, idx) => (
                  <li key={idx}>{bullet}</li>
                ))}
              </ul>

              {exp.certificates && exp.certificates.length > 0 && (
                <div className="btn-group" style={{ marginTop: '16px' }}>
                  {exp.certificates.map((cert, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() =>
                        onOpenModal({
                          imageSrc: cert.imageSrc,
                          title: cert.title,
                          pdfSrc: cert.pdfSrc,
                        })
                      }
                    >
                      {cert.label}
                    </button>
                  ))}
                </div>
              )}

              <div className="timeline-skills-tags">
                {exp.skills.map((skill) => (
                  <span key={skill} className="timeline-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
