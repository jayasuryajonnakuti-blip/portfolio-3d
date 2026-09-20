import React, { useState, useEffect } from 'react';
import { FileText, Menu, X, ArrowUpRight } from 'lucide-react';
import { getAssetUrl } from '../utils';

interface NavbarProps {
  activeSection: string;
}

const NAV_ITEMS = [
  { index: '01', label: 'About', href: '#about' },
  { index: '02', label: 'Skills', href: '#skills' },
  { index: '03', label: 'Experience', href: '#experience' },
  { index: '04', label: 'Projects', href: '#projects' },
  { index: '05', label: 'TruthLens AI', href: '#truthlens' },
  { index: '06', label: 'Certificates', href: '#certificates' },
  { index: '07', label: 'Documents', href: '#documents' },
  { index: '08', label: 'Contact', href: '#contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar-fixed ${scrolled ? 'navbar-scrolled' : ''}`} aria-label="Main Navigation">
      <div className="container navbar-inner">
        {/* Architectural Monogram Brand & System Status */}
        <a href="#home" className="nav-brand" aria-label="Back to top">
          <div className="brand-monogram">
            <span>JS</span>
          </div>
          <div className="brand-meta">
            <div className="brand-text">JAYA SURYA</div>
            <div className="brand-status">
              <span className="brand-status-dot" />
              <span>SYS // ONLINE</span>
            </div>
          </div>
        </a>

        {/* Desktop Navigation Links with Coordinates */}
        <ul className="nav-links-desktop">
          {NAV_ITEMS.map((item) => {
            const sectionId = item.href.replace('#', '');
            const isActive = activeSection === sectionId;
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={`nav-link ${isActive ? 'active' : ''}`}
                >
                  <span className="nav-item-index">{item.index}</span>
                  <span className="nav-item-label">{item.label}</span>
                  {isActive && <span className="nav-active-pip" />}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Action Controls */}
        <div className="nav-actions">
          <a
            href={getAssetUrl('assets/Surya_Reddy_Resume.pdf')}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-cta-btn"
          >
            <FileText size={13} />
            <span>Resume</span>
            <ArrowUpRight size={12} className="nav-cta-arrow" />
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            className="mobile-nav-toggle btn-icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer">
          <div className="mobile-nav-header">
            <span className="mobile-nav-tag">NAVIGATION SYSTEM</span>
            <span className="mobile-nav-status">8 SECTORS ACTIVE</span>
          </div>
          <ul className="mobile-nav-list">
            {NAV_ITEMS.map((item) => {
              const sectionId = item.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className={`mobile-nav-link ${isActive ? 'active' : ''}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="nav-item-index">{item.index}</span>
                    <span className="mobile-nav-link-title">{item.label}</span>
                    {isActive && <span className="mobile-active-tag">CURRENT</span>}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </nav>
  );
};
