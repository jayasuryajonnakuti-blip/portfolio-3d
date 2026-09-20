import React from 'react';
import { ArrowUpRight, FileText, Sparkles } from 'lucide-react';
import { profileData } from '../data';
import { getAssetUrl } from '../utils';
import { GithubIcon, LinkedinIcon } from '../components';

export const HeroSection: React.FC = () => {
  return (
    <section id="home" className="hero">
      <div className="container hero-grid">
        {/* Left: Developer Identity with Dramatic Typography */}
        <div className="hero-content">
          <div className="status-pill">
            <span className="pulse-dot" />
            <span>{profileData.status}</span>
          </div>

          <h1 className="hero-title">
            JONNAKUTI
            <br />
            <span className="text-gradient-red">JAYA SURYA</span>
          </h1>

          <div className="hero-subtitle">
            AI & DATA SCIENCE • FULL STACK DEVELOPER
          </div>

          <p className="hero-bio">
            B.Tech in <strong>Artificial Intelligence & Data Science</strong> at Dhanalakshmi Srinivasan University. Experienced in Java Full Stack development, scalable web architectures, and creator of the <strong>TruthLens AI</strong> synthetic media forensics system.
          </p>

          <div className="btn-group">
            <a href="#truthlens" className="btn btn-primary">
              <Sparkles size={17} />
              <span>Explore TruthLens AI</span>
              <ArrowUpRight size={17} />
            </a>
            <a
              href={getAssetUrl(profileData.resumeUrl)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              <FileText size={17} />
              <span>Download Official Resume</span>
            </a>
            <a
              href={profileData.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-icon"
              aria-label="GitHub Profile"
            >
              <GithubIcon size={20} />
            </a>
            <a
              href={profileData.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-icon"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon size={20} />
            </a>
          </div>

          {/* Academic & Professional Metas */}
          <div className="hero-stats-row">
            <div className="hero-stat-item">
              <div className="hero-stat-val text-gradient-red">{profileData.cgpa}</div>
              <div className="hero-stat-label">B.Tech AI & DS CGPA</div>
            </div>
            <div className="hero-stat-item">
              <div className="hero-stat-val text-gradient-red">{profileData.certificationsCount}</div>
              <div className="hero-stat-label">Verified Certifications</div>
            </div>
            <div className="hero-stat-item">
              <div className="hero-stat-val text-gradient-red">{profileData.internshipsCount}</div>
              <div className="hero-stat-label">Industry Internships</div>
            </div>
          </div>
        </div>

        {/* Right: Spatial 3D Profile Card with Red Rim Lighting */}
        <div className="hero-profile-card spotlight-card">
          <div className="profile-frame-wrap">
            <div className="profile-glow-ring" />
            <div className="profile-image-container">
              <img
                src={getAssetUrl(profileData.avatarUrl)}
                alt={`${profileData.name} - ${profileData.role}`}
                className="profile-avatar-img"
              />
              <div className="profile-badge-floating">
                <span>{profileData.badge}</span>
              </div>
            </div>
          </div>

          <div className="profile-details-area">
            <div className="status-pill" style={{ marginInline: 'auto', marginBottom: '14px' }}>
              <span className="pulse-dot" />
              <span>OPPORTUNITIES: OPEN</span>
            </div>
            <h3 className="profile-name">{profileData.name}</h3>
            <div className="profile-title">{profileData.role}</div>
            <div className="profile-subtitle">{profileData.specialization}</div>
          </div>
        </div>
      </div>
    </section>
  );
};
