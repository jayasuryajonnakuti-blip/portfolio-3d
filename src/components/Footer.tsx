import React from 'react';
import { ArrowUp, Mail } from 'lucide-react';
import { profileData, contactData } from '../data';
import { GithubIcon, LinkedinIcon } from './Icons';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-wrap">
      <div className="container footer-inner">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span className="brand-monogram" style={{ width: '26px', height: '26px', fontSize: '0.78rem' }}>JS</span>
            <span style={{ fontWeight: 800, fontSize: '0.92rem', letterSpacing: '0.06em' }}>
              {profileData.name.toUpperCase()}
            </span>
          </div>
          <p className="footer-copy">
            © {new Date().getFullYear()} Jonnakuti Jaya Surya. All rights reserved.
          </p>
          <p style={{ fontSize: '0.74rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', marginTop: '4px' }}>
            ENGINEERED WITH REACT, TYPESCRIPT, THREE.JS & GSAP
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <a
            href={profileData.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-icon"
            aria-label="GitHub"
          >
            <GithubIcon size={18} />
          </a>
          <a
            href={profileData.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-icon"
            aria-label="LinkedIn"
          >
            <LinkedinIcon size={18} />
          </a>
          <a
            href={`mailto:${contactData.email}`}
            className="btn-icon"
            aria-label="Email"
          >
            <Mail size={18} />
          </a>
          <button
            type="button"
            onClick={scrollToTop}
            className="btn-icon"
            aria-label="Back to Top"
            title="Back to top"
          >
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  );
};
