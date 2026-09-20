import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FileText, Menu, X, Sparkles } from 'lucide-react';
import { getAssetUrl } from '../utils';

const NAV_ITEMS = [
  { label: 'Instrument', path: '/' },
  { label: 'Work', path: '/work' },
  { label: 'TruthLens AI', path: '/work/truthlens', isHighlight: true },
  { label: 'About & Vault', path: '/about' },
  { label: 'Resume', path: '/resume' },
  { label: 'Contact', path: '/contact' },
];

export const Navbar: React.FC = () => {
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
        {/* Brand Monogram */}
        <Link to="/" className="nav-brand" onClick={() => setMobileMenuOpen(false)}>
          <div className="brand-monogram">JS</div>
          <div>
            <div className="brand-text">JAYA SURYA</div>
            <div className="brand-subtext">FORENSIC INSTRUMENT</div>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <ul className="nav-links-desktop">
          {NAV_ITEMS.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'active' : ''} ${item.isHighlight ? 'nav-link-flagship' : ''}`
                }
              >
                {item.isHighlight && <Sparkles size={11} style={{ marginRight: '4px' }} />}
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Action Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link
            to="/resume"
            className="nav-cta-btn"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <FileText size={14} />
            <span>CV / Resume</span>
          </Link>

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
        <div className="mobile-menu-dropdown">
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {NAV_ITEMS.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `nav-link ${isActive ? 'active' : ''} ${item.isHighlight ? 'text-signal' : ''}`
                  }
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  {item.isHighlight && <Sparkles size={14} />}
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
            <li style={{ paddingTop: '8px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <a
                href={getAssetUrl('assets/Surya_Reddy_Resume.pdf')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-signal btn-sm"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <FileText size={14} />
                <span>Download Official Resume PDF</span>
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};
