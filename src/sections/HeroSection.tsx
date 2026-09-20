import React from 'react';
import { ArrowUpRight, FileText } from 'lucide-react';
import { profileData } from '../data';
import { getAssetUrl } from '../utils';
import { GithubIcon, LinkedinIcon } from '../components';

export const HeroSection: React.FC = () => {
  return (
    <section id="home" className="hero">
      <div className="container hero-grid">
        {/* Left: Developer Identity */}
        <div className="hero-content">
          <div className="status-pill">
            <span className="pulse-dot"></span>
            <span>{profileData.status}</span>
          </div>

          <h1 className="hero-title">
            Hi, I'm <span className="text-gradient">{profileData.firstName}</span>
            <br />
            {profileData.lastName}
          </h1>

          <div className="hero-subtitle">
            {profileData.role} • {profileData.specialization}
          </div>

          <p className="hero-bio">
            B.Tech student in <strong>Artificial Intelligence & Data Science</strong> with hands-on internship experience in Java Full Stack development, scalable software architecture, and creator of <strong>TruthLens AI</strong>.
          </p>

          <div className="btn-group">
            <a href="#projects" className="btn btn-primary">
              <span>View Projects</span>
              <ArrowUpRight size={17} />
            </a>
            <a
              href={getAssetUrl(profileData.resumeUrl)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              <FileText size={17} />
              <span>Download Resume</span>
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

          <div className="hero-stats-row">
            <div className="hero-stat-item">
              <div className="hero-stat-val text-gradient">{profileData.cgpa}</div>
              <div className="hero-stat-label">B.Tech AI & DS CGPA</div>
            </div>
            <div className="hero-stat-item">
              <div className="hero-stat-val text-gradient">{profileData.certificationsCount}</div>
              <div className="hero-stat-label">Verified Certifications</div>
            </div>
            <div className="hero-stat-item">
              <div className="hero-stat-val text-gradient">{profileData.internshipsCount}</div>
              <div className="hero-stat-label">Industry Internships</div>
            </div>
          </div>
        </div>

        {/* Right: Premium Developer Profile Card */}
        <div className="hero-profile-card spotlight-card">
          <div className="profile-frame-wrap">
            <div className="profile-glow-ring"></div>
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
            <div className="status-pill" style={{ marginInline: 'auto', marginBottom: '12px' }}>
              <span className="pulse-dot"></span>
              <span>Open to Opportunities</span>
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
