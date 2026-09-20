import React from 'react';
import { ArrowUpRight, FolderGit2, Sparkles } from 'lucide-react';
import { projectsData } from '../data';
import { ModalData, GithubIcon } from '../components';

interface ProjectsSectionProps {
  onOpenModal: (data: ModalData) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = () => {
  const secondaryProjects = projectsData.filter((p) => !p.featured);

  /**
   * Subtle 3D perspective tilt on mouse move — pure CSS transform, no libs.
   * Works by reading pointer position relative to the card bounds.
   */
  const handleTilt = (e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;  // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(900px) rotateY(${x * 10}deg) rotateX(${-y * 8}deg) translateY(-4px) scale(1.015)`;
  };

  const handleTiltReset = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.transform = '';
  };

  return (
    <section id="projects">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <FolderGit2 size={14} />
            <span>04 / PROJECT UNIVERSE</span>
          </div>
          <h2 className="section-title">
            Engineered <span className="text-gradient-red">Systems & Architecture</span>
          </h2>
          <p className="section-desc">
            Production-grade full stack applications and academic systems engineered with modular architectures, database normalization, and AI vision capabilities.
          </p>
        </div>

        {/* Flagship Portal Dispatch Bar */}
        <div className="flagship-portal-bar spotlight-card">
          <div className="portal-bar-left">
            <div className="portal-tag">
              <Sparkles size={13} color="#FF1A1A" />
              <span>FLAGSHIP MULTIMODAL SYSTEM</span>
            </div>
            <h3 className="portal-title">
              TruthLens AI — Deepfake & Media Authentication
            </h3>
            <p className="portal-desc">
              Dedicated forensic laboratory section engineered with Google Gemini API multimodal vision pipelines below.
            </p>
          </div>
          <div className="portal-bar-right">
            <a href="#truthlens" className="btn btn-primary">
              <span>Enter AI Forensics Lab</span>
              <ArrowUpRight size={15} />
            </a>
          </div>
        </div>

        {/* Secondary Academic Projects — with 3D Tilt Hover */}
        <div className="secondary-projects-grid">
          {secondaryProjects.map((p, pIdx) => (
            <article
              key={p.id}
              className="secondary-project-card spotlight-card project-tilt-card"
              onMouseMove={handleTilt}
              onMouseLeave={handleTiltReset}
            >
              <div className="project-card-header">
                <div className="project-meta-row">
                  <span className="project-index-code">ARCH // 0{pIdx + 1}</span>
                  <span className="project-status-tag">{p.tag}</span>
                </div>
                <h3 className="project-card-title">{p.title}</h3>
              </div>

              <p className="project-card-desc">
                {p.description}
              </p>

              <div className="project-tech-stack">
                {p.technologies.map((t) => (
                  <span key={t} className="skill-item">
                    {t}
                  </span>
                ))}
              </div>

              {p.githubUrl && (
                <div className="project-card-footer">
                  <a
                    href={p.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary project-github-btn"
                  >
                    <GithubIcon size={14} />
                    <span>Inspect Repository</span>
                    <ArrowUpRight size={13} />
                  </a>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
