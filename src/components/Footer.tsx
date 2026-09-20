import React from 'react';
import { ArrowUp, Mail } from 'lucide-react';
import { profileData } from '../data';
import { GithubIcon, LinkedinIcon } from './Icons';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer">
      <div className="container footer-content">
        <div>
          <p>© {new Date().getFullYear()} {profileData.name}. All rights reserved.</p>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginTop: '4px' }}>
            Built with React, TypeScript, Three.js, and GSAP.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
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
            href={`mailto:${profileData.name.toLowerCase().replace(/\s+/g, '')}@gmail.com`}
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
