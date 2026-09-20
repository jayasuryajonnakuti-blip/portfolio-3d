import React from 'react';
import { educationData, languagesData, experienceData, certificateOrgsData } from '../data';
import { getAssetUrl } from '../utils';
import { ModalData } from '../components';
import { UserCheck, GraduationCap, Languages, Briefcase, Award, Eye, ExternalLink, ShieldCheck } from 'lucide-react';

interface AboutPageProps {
  onOpenModal: (data: ModalData) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenModal }) => {
  return (
    <div className="about-page">
      <div className="container" style={{ paddingTop: '130px', paddingBottom: '100px' }}>
        {/* Header */}
        <div className="section-header">
          <div className="section-tag">
            <UserCheck size={14} />
            <span>01 / IDENTITY & ARCHITECTURAL PHILOSOPHY</span>
          </div>
          <h1 className="section-title">
            Engineering Rigor, <span className="text-signal">Applied AI</span>
          </h1>
          <p className="section-desc">
            Computer science student, Java Full Stack developer, and applied AI engineer with an obsession for systems that perform reliably under constraints.
          </p>
        </div>

        {/* Narrative & Academic Profile */}
        <div className="about-grid" style={{ marginBottom: '64px' }}>
          {/* Main Narrative Card */}
          <div className="about-main-card spotlight-card">
            <h2 style={{ fontSize: '1.45rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '16px' }}>
              The Engineering Philosophy
            </h2>
            <p className="about-text">
              I am an undergraduate developer pursuing a Bachelor of Technology in <strong>Artificial Intelligence and Data Science</strong> at <strong>Dhanalakshmi Srinivasan University</strong>. My core technical discipline is grounded in <strong>Object-Oriented Java, Data Structures, Relational Database Modeling</strong>, and high-efficiency client-side architectures.
            </p>
            <p className="about-text">
              Through industry developer internships at <strong>Averixis Solutions</strong> and <strong>CodSoft</strong>, I contributed to production full-stack workflows, SQL database design, and component modularity. With <strong>TruthLens AI</strong>, I applied multimodal computer vision to combat digital media manipulation.
            </p>

            <div className="highlights-list">
              <div className="highlight-item">
                <div className="highlight-icon">☕</div>
                <div>
                  <h4>Java Full Stack</h4>
                  <p>Core Java, OOP principles, SQL schemas, and modular architecture.</p>
                </div>
              </div>
              <div className="highlight-item">
                <div className="highlight-icon">👁️</div>
                <div>
                  <h4>Multimodal AI Forensics</h4>
                  <p>Client-side staging and Gemini multimodal vision pipelines for deepfake detection.</p>
                </div>
              </div>
              <div className="highlight-item">
                <div className="highlight-icon">🛡️</div>
                <div>
                  <h4>Oracle Certified</h4>
                  <p>Oracle Certified Foundations Associate: Agentic AI (Valid to 2028).</p>
                </div>
              </div>
              <div className="highlight-item">
                <div className="highlight-icon">⚡</div>
                <div>
                  <h4>Algorithmic Problem Solving</h4>
                  <p>Scaler Data Structures & Algorithms in Java with focus on asymptotic efficiency.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Academic Journey & Languages */}
          <div className="education-column">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--signal)', marginBottom: '4px', fontSize: '0.85rem', fontFamily: 'var(--font-mono)' }}>
              <GraduationCap size={16} />
              <span>ACADEMIC MILESTONES</span>
            </div>
            {educationData.map((edu) => (
              <div key={edu.id} className="edu-card spotlight-card">
                <span className="edu-badge">{edu.period}</span>
                <h3>{edu.degree}</h3>
                <p className="edu-inst">{edu.institution}</p>
                <p className="edu-score">{edu.score}</p>
              </div>
            ))}

            <div className="languages-card spotlight-card" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', marginBottom: '8px', fontSize: '0.86rem', fontWeight: 700 }}>
                <Languages size={16} color="#FF3B30" />
                <span>Languages Spoken</span>
              </div>
              <div className="lang-chips">
                {languagesData.map((l) => (
                  <span key={l.language} className="lang-chip">
                    {l.language} ({l.proficiency})
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Career Milestones / Internships */}
        <div style={{ marginBottom: '64px' }}>
          <div className="section-header">
            <div className="section-tag">
              <Briefcase size={14} />
              <span>CAREER MILESTONES</span>
            </div>
            <h2 className="section-title">
              Industry <span className="text-signal">Internships</span>
            </h2>
          </div>

          <div className="timeline-container">
            <div className="timeline-rail" />
            {experienceData.map((exp) => (
              <div key={exp.id} className="timeline-entry">
                <div className="timeline-orb">
                  <span className="timeline-orb-pulse" />
                </div>
                <div className="spotlight-card" style={{ padding: '32px' }}>
                  <div className="timeline-period-badge">{exp.period}</div>
                  <h3 className="timeline-role">{exp.role}</h3>
                  <div className="timeline-company">{exp.company}</div>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '18px', fontSize: '0.96rem' }}>
                    {exp.description}
                  </p>
                  <ul className="timeline-bullets">
                    {exp.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>

                  {/* LOR / Internship Credentials */}
                  {exp.certificates && exp.certificates.length > 0 && (
                    <div className="timeline-certs-group">
                      {exp.certificates.map((c, idx) => (
                        <div key={idx} style={{ display: 'flex', gap: '8px' }}>
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

        {/* Verified Certificate Vault */}
        <div id="cert-vault">
          <div className="section-header">
            <div className="section-tag">
              <Award size={14} />
              <span>OFFICIAL VAULT</span>
            </div>
            <h2 className="section-title">
              Verified <span className="text-signal">Credentials</span>
            </h2>
            <p className="section-desc">
              Authentic industry certifications from Oracle, Scaler, TCS iON, and MongoDB. Click to inspect full credentials or open official PDFs.
            </p>
          </div>

          <div className="certs-library-grid">
            {certificateOrgsData.map((org) => (
              <div key={org.id} className="cert-org-card spotlight-card">
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
                        <ShieldCheck size={16} color="#FF3B30" />
                        <h4 className="cert-item-title">{item.title}</h4>
                      </div>

                      <div className="cert-item-meta">
                        <span>DATE: {item.date}</span>
                        {item.expiry && (
                          <>
                            <span>•</span>
                            <span style={{ color: 'var(--signal)' }}>EXPIRY: {item.expiry}</span>
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
                          <span>Inspect Credential</span>
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
