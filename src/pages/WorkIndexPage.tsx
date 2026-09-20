import React from 'react';
import { Link } from 'react-router-dom';
import { projectsData } from '../data';
import { getAssetUrl } from '../utils';
import { ArrowRight, ExternalLink, Sparkles, FolderGit2 } from 'lucide-react';
import { GithubIcon } from '../components/Icons';

export const WorkIndexPage: React.FC = () => {
  const flagship = projectsData.find((p) => p.featured) ?? projectsData[0];
  const secondary = projectsData.filter((p) => !p.featured);

  return (
    <div className="work-index-page">
      <div className="container" style={{ paddingTop: '130px', paddingBottom: '100px' }}>
        {/* Header */}
        <div className="section-header">
          <div className="section-tag">
            <FolderGit2 size={14} />
            <span>ENGINEERED SYSTEMS // CURATED WORK</span>
          </div>
          <h1 className="section-title">
            Case Studies & <span className="text-signal">Systems Index</span>
          </h1>
          <p className="section-desc">
            Shipped full-stack applications, multimodal AI pipelines, and database architectures engineered under real constraints.
          </p>
        </div>

        {/* Flagship Hero Card: TruthLens AI */}
        <div className="flagship-work-card">
          <div className="flagship-card-glow" />
          <div className="flagship-content-side">
            <div className="flagship-meta-row">
              <span className="flagship-badge">FLAGSHIP CASE STUDY</span>
              <span className="flagship-status">SHIPPED // VERCEL PRODUCTION</span>
            </div>

            <h2 className="flagship-title">{flagship.title}</h2>
            <div className="flagship-subtitle">{flagship.tag}</div>

            <p className="flagship-desc">
              Detects manipulated digital media, synthesized deepfake faces, and misinformation reels client-side. Built with Google Gemini multimodal vision models, FileReader memory staging, and automated forensic PDF report generation.
            </p>

            <div className="flagship-tech-row">
              {flagship.technologies.map((tech) => (
                <span key={tech} className="skill-item">
                  {tech}
                </span>
              ))}
            </div>

            <div className="flagship-action-row">
              <Link to="/work/truthlens" className="btn btn-signal">
                <span>Read Deep Case Study (7 Sections)</span>
                <ArrowRight size={16} />
              </Link>
              <a
                href={flagship.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-panel"
              >
                <Sparkles size={15} />
                <span>Live Demo</span>
                <ExternalLink size={14} />
              </a>
              <a
                href={flagship.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-panel"
              >
                <GithubIcon size={16} />
                <span>GitHub</span>
              </a>
            </div>
          </div>

          <div className="flagship-visual-side">
            <div className="flagship-preview-frame">
              <img
                src={getAssetUrl('assets/projects/TruthLens-main-ui.png')}
                alt="TruthLens AI System Dashboard"
                className="flagship-preview-img"
              />
              <div className="flagship-scanner-sweep" />
            </div>
          </div>
        </div>

        {/* Secondary Projects Grid */}
        <div className="secondary-work-section">
          <div className="secondary-section-title">ADDITIONAL SYSTEMS & CAPSTONES</div>

          <div className="secondary-work-grid">
            {secondary.map((proj) => (
              <div key={proj.id} className="secondary-card">
                <div className="secondary-card-top">
                  <span className="section-tag" style={{ fontSize: '0.72rem', padding: '3px 10px' }}>
                    {proj.tag}
                  </span>
                  <span className="secondary-period">ACADEMIC CAPSTONE</span>
                </div>

                <h3 className="secondary-title">{proj.title}</h3>
                <p className="secondary-desc">{proj.description}</p>

                <div className="secondary-tech-list">
                  {proj.technologies.map((t) => (
                    <span key={t} className="skill-item" style={{ fontSize: '0.78rem' }}>
                      {t}
                    </span>
                  ))}
                </div>

                <div className="secondary-links-row">
                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-panel btn-sm"
                    >
                      <GithubIcon size={14} />
                      <span>Inspect Repository</span>
                      <ExternalLink size={12} />
                    </a>
                  )}
                  {proj.liveUrl && (
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-signal btn-sm"
                    >
                      <span>Live Site</span>
                      <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
