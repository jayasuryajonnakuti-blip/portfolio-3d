import React, { useState, useEffect } from 'react';
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
  { label: 'TruthLens AI', href: '#truthlens' },
  { label: 'Certificates', href: '#certificates' },
  { label: 'Documents', href: '#documents' },
  { label: 'Contact', href: '#contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar-fixed ${scrolled ? 'navbar-scrolled' : ''}`} aria-label="Main Navigation">
      <div className="container navbar-inner">
        {/* Cinematic Monogram Brand */}
        <a href="#home" className="nav-brand">
          <div className="brand-monogram">JS</div>
          <div>
            <div className="brand-text">JAYA SURYA</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--red-bright)', fontFamily: 'var(--font-mono)' }}>
              AI & FULL STACK
            </div>
          </div>
        </a>

        {/* Desktop Navigation Links */}
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
            className="nav-cta-btn"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <FileText size={14} />
            <span>Resume</span>
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            className="mobile-nav-toggle btn-icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div
          style={{
            background: 'rgba(5, 5, 5, 0.96)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(255, 26, 26, 0.3)',
            padding: '24px',
          }}
        >
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="nav-link"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ fontSize: '1rem', display: 'block' }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};
