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

        {/* Highlight Banner pointing to next section */}
        <div
          className="spotlight-card"
          style={{
            marginBottom: '36px',
            border: '1px dashed rgba(255, 26, 26, 0.4)',
            background: 'linear-gradient(90deg, rgba(229, 9, 20, 0.08) 0%, rgba(13, 13, 13, 0.8) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--red-bright)', fontSize: '0.82rem', fontFamily: 'var(--font-mono)', marginBottom: '4px' }}>
              <Sparkles size={14} />
              <span>HEADLINE MULTIMODAL SYSTEM</span>
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>
              TruthLens AI — Deepfake & Media Authentication
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Jump to the dedicated forensic laboratory section below to explore the full Gemini API pipeline.
            </p>
          </div>
          <a href="#truthlens" className="btn btn-primary" style={{ padding: '10px 20px', fontSize: '0.84rem' }}>
            <span>Enter AI Forensics Lab</span>
            <ArrowUpRight size={16} />
          </a>
        </div>

        {/* Secondary Academic Projects — with 3D Tilt Hover */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          {secondaryProjects.map((p) => (
            <article
              key={p.id}
              className="secondary-project-card spotlight-card project-tilt-card"
              onMouseMove={handleTilt}
              onMouseLeave={handleTiltReset}
              style={{ transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow var(--transition-smooth)' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
                <div>
                  <span className="section-tag" style={{ marginBottom: '8px', fontSize: '0.7rem', padding: '3px 10px' }}>
                    {p.tag}
                  </span>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 800 }}>{p.title}</h3>
                </div>
              </div>

              <p style={{ color: 'var(--text-secondary)', fontSize: '0.94rem', lineHeight: 1.7, marginBottom: '22px' }}>
                {p.description}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
                {p.technologies.map((t) => (
                  <span key={t} className="skill-item" style={{ fontSize: '0.78rem' }}>
                    {t}
                  </span>
                ))}
              </div>

              {p.githubUrl && (
                <a
                  href={p.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                  style={{ padding: '8px 18px', fontSize: '0.84rem' }}
                >
                  <GithubIcon size={15} />
                  <span>Inspect Source on GitHub</span>
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
