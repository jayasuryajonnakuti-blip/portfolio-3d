import React from 'react';
import { ArrowUpRight, FileText } from 'lucide-react';
import { projectsData } from '../data';
import { ModalData, GithubIcon } from '../components';
import { getAssetUrl } from '../utils';

interface ProjectsSectionProps {
  onOpenModal: (data: ModalData) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onOpenModal }) => {
  const featuredProject = projectsData.find((p) => p.featured);
  const secondaryProjects = projectsData.filter((p) => !p.featured);

  return (
    <section id="projects">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">04 / PORTFOLIO HIGHLIGHT</div>
          <h2 className="section-title">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="section-desc">
            Practical software engineered with advanced AI capabilities, full-stack architectures, and rigorous design documentation.
          </p>
        </div>

        {/* Featured Project: TruthLens AI */}
        {featuredProject && (
          <article className="featured-project-card spotlight-card">
            <div className="featured-badge-top">
              <span>★ {featuredProject.tag}</span>
            </div>

            <div className="project-hero-grid">
              <div className="project-info">
                <h3>{featuredProject.title}</h3>
                <p className="project-desc-long">{featuredProject.description}</p>

                {featuredProject.features && (
                  <div className="project-feature-list">
                    {featuredProject.features.map((feat, idx) => (
                      <div key={idx} className="project-feature-item">
                        <span style={{ color: 'var(--emerald-400)' }}>✓</span>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="tech-stack-chips" style={{ marginBottom: '26px' }}>
                  {featuredProject.technologies.map((tech) => (
                    <span key={tech} className="tech-pill">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="btn-group">
                  {featuredProject.liveUrl && (
                    <a
                      href={featuredProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                    >
                      <span>Live Demo</span>
                      <ArrowUpRight size={16} />
                    </a>
                  )}
                  {featuredProject.reportUrl && (
                    <a
                      href={getAssetUrl(featuredProject.reportUrl)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary"
                    >
                      <FileText size={16} />
                      <span>TruthLens Full Report (49 pgs)</span>
                    </a>
                  )}
                  {featuredProject.githubUrl && (
                    <a
                      href={featuredProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary"
                    >
                      <GithubIcon size={16} />
                      <span>GitHub Repository</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Screenshots Gallery */}
              {featuredProject.screenshots && (
                <div>
                  <div className="screenshots-mosaic">
                    {featuredProject.screenshots.map((s, idx) => (
                      <div
                        key={idx}
                        className={`screenshot-thumb-wrapper ${s.featured ? 'featured-span-2' : ''}`}
                        onClick={() =>
                          onOpenModal({
                            imageSrc: s.thumbnail,
                            title: s.title,
                            pdfSrc: featuredProject.reportUrl,
                          })
                        }
                      >
                        <img src={getAssetUrl(s.thumbnail)} alt={s.title} />
                        <div className="screenshot-overlay">
                          <span className="view-zoom-badge">{s.badge}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', textAlign: 'center', marginTop: '10px' }}>
                    Screenshots extracted directly from TruthLens AI application. Click to enlarge.
                  </p>
                </div>
              )}
            </div>
          </article>
        )}

        {/* Secondary Academic Projects */}
        {secondaryProjects.map((p) => (
          <article key={p.id} className="secondary-project-card spotlight-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '12px' }}>
              <div>
                <span className="section-tag" style={{ marginBottom: '8px' }}>{p.tag}</span>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 700 }}>{p.title}</h3>
              </div>
              <div className="tech-stack-chips">
                {p.technologies.map((t) => (
                  <span key={t} className="tech-pill">{t}</span>
                ))}
              </div>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.98rem', lineHeight: 1.7, marginBottom: '18px' }}>
              {p.description}
            </p>
            {p.githubUrl && (
              <div className="btn-group">
                <a
                  href={p.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary btn-sm"
                >
                  <GithubIcon size={15} />
                  <span>View on GitHub</span>
                </a>
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
};
