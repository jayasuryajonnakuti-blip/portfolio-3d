import React from 'react';
import { ArrowUpRight, FileText, CheckCircle2, ShieldAlert, Cpu, Sparkles } from 'lucide-react';
import { projectsData } from '../data';
import { ModalData, GithubIcon } from '../components';
import { getAssetUrl } from '../utils';

interface TruthLensSectionProps {
  onOpenModal: (data: ModalData) => void;
}

export const TruthLensSection: React.FC<TruthLensSectionProps> = ({ onOpenModal }) => {
  const truthLens = projectsData.find((p) => p.id === 'truthlens-ai') ?? projectsData[0];

  return (
    <section id="truthlens" className="truthlens-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <Cpu size={14} />
            <span>05 / MAJOR AI CENTERPIECE</span>
          </div>
          <h2 className="section-title">
            TruthLens AI <span className="text-gradient-red">— Forensics Engine</span>
          </h2>
          <p className="section-desc">
            Deep neural authenticity analysis. Detects synthesized digital reels, deepfake facial distortions, manipulated imagery, and fabricated news stories using Google Gemini API multimodal vision models.
          </p>
        </div>

        {/* Cinematic Forensics Panel */}
        <div className="forensic-panel spotlight-card">
          {/* Animated Red Scanning Laser Line */}
          <div className="forensic-laser-line" />

          {/* Telemetry Header */}
          <div className="forensic-telemetry-bar">
            <div className="telemetry-item">
              <span className="pulse-dot" />
              <span>SUBSYSTEM // GEMINI MULTIMODAL FORENSICS</span>
            </div>
            <div className="telemetry-item">
              <span className="telemetry-item-key">ENGINE LATENCY:</span>
              <span className="telemetry-item-val">~320ms</span>
            </div>
            <div className="telemetry-item">
              <span className="telemetry-item-key">LOCAL CACHE:</span>
              <span className="telemetry-item-val">ENCRYPTED (LOCALSTORAGE)</span>
            </div>
            <div className="telemetry-item">
              <span className="telemetry-item-key">STACK:</span>
              <span className="telemetry-item-val">REACT • TS • GEMINI 1.5</span>
            </div>
          </div>

          {/* Visual Storytelling: AI Analysis Pipeline */}
          <div className="forensic-pipeline-flow">
            <div className="pipeline-step">
              <span className="pipeline-step-badge">STEP 01</span>
              <span className="pipeline-step-name">RAW MEDIA INPUT</span>
              <span style={{ fontSize: '0.74rem', color: 'var(--text-dim)' }}>Reel / Image / News URL</span>
            </div>
            <span className="pipeline-arrow">➔</span>
            <div className="pipeline-step">
              <span className="pipeline-step-badge">STEP 02</span>
              <span className="pipeline-step-name">CLIENT STAGING</span>
              <span style={{ fontSize: '0.74rem', color: 'var(--text-dim)' }}>FileReader ArrayBuffer</span>
            </div>
            <span className="pipeline-arrow">➔</span>
            <div className="pipeline-step">
              <span className="pipeline-step-badge">STEP 03</span>
              <span className="pipeline-step-name">GEMINI MULTIMODAL</span>
              <span style={{ fontSize: '0.74rem', color: 'var(--text-dim)' }}>Vision & Text Analysis</span>
            </div>
            <span className="pipeline-arrow">➔</span>
            <div className="pipeline-step">
              <span className="pipeline-step-badge">STEP 04</span>
              <span className="pipeline-step-name">FORENSIC TELEMETRY</span>
              <span style={{ fontSize: '0.74rem', color: 'var(--text-dim)' }}>Facial / Lighting Artifacts</span>
            </div>
            <span className="pipeline-arrow">➔</span>
            <div className="pipeline-step">
              <span className="pipeline-step-badge">STEP 05</span>
              <span className="pipeline-step-name" style={{ color: 'var(--red-bright)' }}>CONFIDENCE & VERDICT</span>
              <span style={{ fontSize: '0.74rem', color: 'var(--text-dim)' }}>Authentic vs Synthesized</span>
            </div>
          </div>

          {/* Main Layout Grid */}
          <div className="forensic-layout-grid">
            {/* Left Column: Forensics Specs & Capabilities */}
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--red-bright)', marginBottom: '10px', fontSize: '0.84rem', fontFamily: 'var(--font-mono)' }}>
                <Sparkles size={14} />
                <span>ARCHITECTED BY JAYA SURYA</span>
              </div>
              <h3 style={{ fontSize: '1.65rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '14px' }}>
                Multimodal Synthetic Media Detection
              </h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: '22px', fontSize: '0.98rem' }}>
                {truthLens.description}
              </p>

              {/* Core Features */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '26px' }}>
                {truthLens.features?.map((feat, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
                    <CheckCircle2 size={16} color="#FF1A1A" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Tech Stack Pills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '32px' }}>
                {truthLens.technologies.map((tech) => (
                  <span key={tech} className="skill-item" style={{ fontSize: '0.78rem' }}>
                    {tech}
                  </span>
                ))}
              </div>

              {/* Interactive CTAs */}
              <div className="btn-group">
                {truthLens.liveUrl && (
                  <a
                    href={truthLens.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    <span>Launch Live Detector</span>
                    <ArrowUpRight size={17} />
                  </a>
                )}
                {truthLens.reportUrl && (
                  <a
                    href={getAssetUrl(truthLens.reportUrl)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary"
                  >
                    <FileText size={17} />
                    <span>Inspect 49-Page PDF Report</span>
                  </a>
                )}
                {truthLens.githubUrl && (
                  <a
                    href={truthLens.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-icon"
                    aria-label="GitHub Repository"
                  >
                    <GithubIcon size={18} />
                  </a>
                )}
              </div>
            </div>

            {/* Right Column: Authentic UI Screenshots Mosaic */}
            <div>
              <div className="screenshots-mosaic">
                {truthLens.screenshots?.map((s, idx) => (
                  <div
                    key={idx}
                    className={`screenshot-thumb-wrapper ${s.featured ? 'featured-span-2' : ''}`}
                    onClick={() =>
                      onOpenModal({
                        imageSrc: s.thumbnail,
                        title: s.title,
                        pdfSrc: truthLens.reportUrl,
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
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '14px', fontSize: '0.78rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                <ShieldAlert size={14} color="#FF1A1A" />
                <span>REAL UI SCREENSHOTS FROM TRUTHLENS AI PRODUCTION BUILD</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
