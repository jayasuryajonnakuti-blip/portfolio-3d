import React, { useState } from 'react';
import { FileText, Menu, X } from 'lucide-react';
import { getAssetUrl } from '../utils';

interface NavbarProps {
  activeSection: string;
}

const NAV_ITEMS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Certificates', href: '#certificates' },
  { label: 'Documents', href: '#documents' },
  { label: 'Contact', href: '#contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="site-navbar" aria-label="Main Navigation">
      <div className="container nav-container">
        {/* Brand */}
        <a href="#home" className="nav-brand">
          <div className="brand-avatar-badge">JS</div>
          <div>
            <div className="brand-name">Jaya Surya Jonnakuti</div>
            <div className="brand-title">Java Full Stack & AI/DS</div>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <ul className="nav-links" style={{ display: 'flex' }}>
          {NAV_ITEMS.map((item) => {
            const sectionId = item.href.replace('#', '');
            const isActive = activeSection === sectionId;
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={`nav-link ${isActive ? 'active' : ''}`}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Action Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <a
            href={getAssetUrl('assets/Surya_Reddy_Resume.pdf')}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary btn-sm"
            style={{ display: 'inline-flex' }}
          >
            <FileText size={15} />
            <span>Resume</span>
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            className="btn-icon"
            style={{ display: 'none' }}
            id="mobileNavToggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
    </nav>
  );
};
