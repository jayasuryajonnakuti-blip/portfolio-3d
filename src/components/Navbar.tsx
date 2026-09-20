import React, { useState, useEffect } from 'react';
import { FileText, Menu, X, ArrowRight } from 'lucide-react';
import { getAssetUrl } from '../utils';

interface NavbarProps {
  activeSection: string;
}

const NAV_ITEMS = [
  { index: '01', label: 'HOME', href: '#home', id: 'home' },
  { index: '02', label: 'ABOUT', href: '#about', id: 'about' },
  { index: '03', label: 'SKILLS', href: '#skills', id: 'skills' },
  { index: '04', label: 'EXPERIENCE', href: '#experience', id: 'experience' },
  { index: '05', label: 'PROJECTS', href: '#projects', id: 'projects' },
  { index: '06', label: 'CERTIFICATES', href: '#certificates', id: 'certificates' },
  { index: '07', label: 'CONTACT', href: '#contact', id: 'contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`hud-navbar-wrapper ${scrolled ? 'is-scrolled' : ''}`}>
      <nav className="hud-navbar-frame" aria-label="Main Navigation">
        {/* Angular Corner Registration Marks */}
        <span className="hud-corner top-left" aria-hidden="true" />
        <span className="hud-corner top-right" aria-hidden="true" />
        <span className="hud-corner bottom-left" aria-hidden="true" />
        <span className="hud-corner bottom-right" aria-hidden="true" />

        <div className="hud-navbar-inner">
          {/* Left: Monogram Badge & Title Tag */}
          <a href="#home" className="hud-brand" aria-label="Back to top">
            <div className="hud-brand-badge">
              <span>JS</span>
            </div>
            <div className="hud-brand-meta">
              <span className="hud-brand-name">JONNAKUTI JAYA SURYA</span>
              <span className="hud-brand-subtitle">// AI ENGINEER • DEVELOPER • EXPLORER</span>
            </div>
          </a>

          {/* Center: HUD Segmented Pill Menu */}
          <ul className="hud-nav-links">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id || (!activeSection && item.id === 'home');
              return (
                <li key={item.id} className="hud-nav-item">
                  <a
                    href={item.href}
                    className={`hud-nav-link ${isActive ? 'is-active' : ''}`}
                  >
                    {isActive ? (
                      <span className="hud-pill-active">
                        <span className="hud-item-idx">{item.index}</span>
                        <span className="hud-active-dot" />
                        <span className="hud-item-txt">{item.label}</span>
                      </span>
                    ) : (
                      <span className="hud-pill-idle">
                        <span className="hud-item-idx">{item.index}</span>
                        <span className="hud-item-txt">{item.label}</span>
                      </span>
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Right: Actions */}
          <div className="hud-nav-actions">
            <a
              href={getAssetUrl('assets/Surya_Reddy_Resume.pdf')}
              target="_blank"
              rel="noopener noreferrer"
              className="hud-resume-btn"
              title="Official Resume PDF"
            >
              <FileText size={13} />
              <span>RESUME</span>
            </a>

            <a href="#contact" className="hud-talk-btn">
              <span>LET'S TALK</span>
              <ArrowRight size={14} className="hud-btn-arrow" />
            </a>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              className="hud-mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="hud-mobile-drawer">
          <div className="hud-mobile-drawer-header">
            <span className="hud-drawer-tag">// SECTOR NAVIGATION</span>
            <span className="hud-drawer-status">SYS 01-07 ONLINE</span>
          </div>
          <ul className="hud-mobile-list">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={item.href}
                    className={`hud-mobile-link ${isActive ? 'is-active' : ''}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="hud-item-idx">{item.index}</span>
                    <span className="hud-mobile-label">{item.label}</span>
                    {isActive && <span className="hud-mobile-indicator">ACTIVE</span>}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
};
