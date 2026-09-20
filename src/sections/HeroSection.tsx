import React from 'react';
import { ArrowRight, ArrowUpRight, Play, Sparkles, Plus, Compass, Cpu } from 'lucide-react';
import { profileData } from '../data';
import { getAssetUrl } from '../utils';
import { GithubIcon, LinkedinIcon } from '../components';

export const HeroSection: React.FC = () => {
  return (
    <section id="home" className="hero-reference-section">
      {/* ====================================================================
          ZONE 1: ASYMMETRIC MONUMENTAL HERO GRID (LEFT / CENTER / RIGHT)
          ==================================================================== */}
      <div className="container hero-main-container">
        <div className="hero-asymmetric-grid">
          {/* Left Column: Developer Identity & Typography */}
          <div className="hero-identity-col">
            <div className="hero-greeting-tag">
              <span className="hud-code-prefix">//</span>
              <span className="hud-code-text">HELLO, WORLD!</span>
            </div>

            <h1 className="hero-monumental-heading">
              <span className="hero-name-first">JONNAKUTI</span>
              <span className="hero-name-second text-gradient-red">JAYA SURYA</span>
            </h1>

            <div className="hero-role-title">
              <span>AI & DATA SCIENCE</span>
              <span className="hero-role-slash">/</span>
              <span>FULL STACK DEVELOPER</span>
            </div>

            <p className="hero-mission-statement">
              I build intelligent systems, immersive experiences and real world solutions that make a difference.
            </p>

            <div className="hero-actions-row">
              <a href="#projects" className="hud-btn-primary">
                <span>EXPLORE MY WORK</span>
                <ArrowRight size={15} className="btn-arrow-icon" />
              </a>

              <a href="#truthlens" className="hud-btn-secondary">
                <Play size={13} className="play-triangle-icon" />
                <span>VIEW TRUTHLENS AI</span>
              </a>
            </div>

            {/* Precision Vertical Scroll Indicator */}
            <div className="hero-scroll-indicator">
              <div className="scroll-laser-track">
                <div className="scroll-laser-pulse" />
              </div>
              <span className="scroll-guide-label">SCROLL TO EXPLORE</span>
            </div>
          </div>

          {/* Center Column: Spatial 3D Framing with Floating Badges */}
          <div className="hero-spatial-center" aria-hidden="true">
            {/* Floating Badge Top Left */}
            <div className="spatial-floating-badge badge-top-left">
              <span className="badge-bracket">[</span>
              <span className="badge-text">CREATIVE THINKER</span>
              <Plus size={12} className="badge-plus-icon" />
              <span className="badge-bracket">]</span>
            </div>

            {/* Floating Badge Bottom Left */}
            <div className="spatial-floating-badge badge-bottom-left">
              <span className="badge-bracket">[</span>
              <span className="badge-text">PROBLEM SOLVER</span>
              <Plus size={12} className="badge-plus-icon" />
              <span className="badge-bracket">]</span>
            </div>

            {/* Floating Badge Top Right */}
            <div className="spatial-floating-badge badge-top-right">
              <span className="badge-bracket">[</span>
              <span className="badge-text">CONTINUOUS LEARNER</span>
              <Plus size={12} className="badge-plus-icon" />
              <span className="badge-bracket">]</span>
            </div>

            {/* Central Orbital Reticle */}
            <div className="spatial-reticle-ring" />
          </div>

          {/* Right Column: Precision HUD Stat Column */}
          <div className="hero-stats-hud-col">
            {/* Quote Banner */}
            <div className="hero-quote-box">
              <div className="hero-quote-content">
                &ldquo;TECHNOLOGY IS A TOOL. IMPACT IS A CHOICE.&rdquo;
              </div>
              <div className="hero-quote-author">— JAYA SURYA</div>
            </div>

            {/* Vertical Readout Nodes */}
            <div className="hero-readout-stack">
              <div className="hero-readout-node">
                <div className="readout-primary-val text-gradient-red">{profileData.cgpa} CGPA</div>
                <div className="readout-secondary-tag">// B.TECH AI & DS</div>
              </div>

              <div className="hero-readout-node">
                <div className="readout-primary-val">10+ TECHNOLOGIES</div>
                <div className="readout-secondary-tag">// MODERN ECOSYSTEM</div>
              </div>

              <div className="hero-readout-node">
                <div className="readout-primary-val">3+ MAJOR PROJECTS</div>
                <div className="readout-secondary-tag">// RESEARCH & PRODUCTION</div>
              </div>

              <div className="hero-readout-node">
                <div className="readout-primary-val">02 INTERNSHIPS</div>
                <div className="readout-secondary-tag">// INDUSTRY EXPERIENCE</div>
              </div>

              <div className="hero-readout-node">
                <div className="readout-primary-val">06 CERTIFICATIONS</div>
                <div className="readout-secondary-tag">// VERIFIED VAULT</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ====================================================================
          ZONE 2: LOWER HERO 4-CARD PORTAL STRIP
          ==================================================================== */}
      <div className="container hero-portals-container">
        <div className="hero-portals-grid">
          {/* Card 01: TruthLens AI */}
          <a href="#truthlens" className="hero-portal-card portal-truthlens">
            <div className="portal-header">
              <div className="portal-index">
                <span>01</span>
                <span className="portal-title">TRUTHLENS AI</span>
              </div>
              <ArrowUpRight size={14} className="portal-arrow" />
            </div>
            <p className="portal-desc">Fake Media Detection using Multimodal AI</p>
            <div className="portal-preview-box">
              <img
                src={getAssetUrl('assets/projects/TruthLens-main-ui.png')}
                alt="TruthLens Forensic Dashboard"
                className="portal-img"
                loading="lazy"
              />
              <div className="portal-img-overlay" />
            </div>
            <div className="portal-footer-action">
              <span>VIEW PROJECT</span>
              <ArrowRight size={12} />
            </div>
          </a>

          {/* Card 02: Skills Universe */}
          <a href="#skills" className="hero-portal-card portal-skills">
            <div className="portal-header">
              <div className="portal-index">
                <span>02</span>
                <span className="portal-title">SKILLS UNIVERSE</span>
              </div>
              <ArrowUpRight size={14} className="portal-arrow" />
            </div>
            <p className="portal-desc">Explore my technology ecosystem</p>
            <div className="portal-graphic-box">
              <div className="portal-constellation-icon">
                <Cpu size={32} className="text-red" />
              </div>
              <div className="portal-tech-chips">
                <span>JAVA</span>
                <span>PYTHON</span>
                <span>SPRING</span>
                <span>REACT</span>
                <span>PYTORCH</span>
              </div>
            </div>
            <div className="portal-footer-action">
              <span>EXPLORE</span>
              <ArrowRight size={12} />
            </div>
          </a>

          {/* Card 03: Journey / Experience */}
          <a href="#experience" className="hero-portal-card portal-journey">
            <div className="portal-header">
              <div className="portal-index">
                <span>03</span>
                <span className="portal-title">JOURNEY</span>
              </div>
              <ArrowUpRight size={14} className="portal-arrow" />
            </div>
            <p className="portal-desc">Education • Experience • Growth Timeline</p>
            <div className="portal-graphic-box">
              <div className="portal-timeline-track">
                <div className="timeline-node-sample done">
                  <span className="node-dot" />
                  <span className="node-txt">B.Tech 8.88</span>
                </div>
                <div className="timeline-connector-sample" />
                <div className="timeline-node-sample active">
                  <span className="node-dot active-dot" />
                  <span className="node-txt">Averixis Intern</span>
                </div>
              </div>
            </div>
            <div className="portal-footer-action">
              <span>VIEW TIMELINE</span>
              <ArrowRight size={12} />
            </div>
          </a>

          {/* Card 04: Certificates */}
          <a href="#certificates" className="hero-portal-card portal-certificates">
            <div className="portal-header">
              <div className="portal-index">
                <span>04</span>
                <span className="portal-title">CERTIFICATES</span>
              </div>
              <ArrowUpRight size={14} className="portal-arrow" />
            </div>
            <p className="portal-desc">Verified achievements & official credentials</p>
            <div className="portal-preview-box">
              <img
                src={getAssetUrl('assets/certificates/Oracle-Agentic-AI.jpg')}
                alt="Oracle Agentic AI Credential"
                className="portal-img"
                loading="lazy"
              />
              <div className="portal-img-overlay" />
            </div>
            <div className="portal-footer-action">
              <span>VIEW VAULT</span>
              <ArrowRight size={12} />
            </div>
          </a>
        </div>
      </div>

      {/* ====================================================================
          ZONE 3: BOTTOM CINEMATIC CONTINUATION PANEL (IDEAS ➔ CODE ➔ IMPACT)
          ==================================================================== */}
      <div className="container hero-continuation-container">
        <div className="continuation-panel-frame">
          {/* Angular Corner Registration Marks */}
          <span className="hud-corner top-left" aria-hidden="true" />
          <span className="hud-corner top-right" aria-hidden="true" />
          <span className="hud-corner bottom-left" aria-hidden="true" />
          <span className="hud-corner bottom-right" aria-hidden="true" />

          {/* Top Status & Origin Row */}
          <div className="continuation-top-row">
            <div className="continuation-status-chip">
              <span className="pulse-signal-dot" />
              <span className="status-label">STATUS: AVAILABLE FOR OPPORTUNITIES</span>
            </div>
            <div className="continuation-motto-tag">
              FROM INDIA ➔ TO A MORE INTELLIGENT TOMORROW
            </div>
          </div>

          {/* Monumental Headline */}
          <div className="continuation-monument-heading">
            IDEAS ➔ CODE ➔ IMPACT
          </div>

          {/* Subtitle & Coordinates Row */}
          <div className="continuation-sub-row">
            <div className="continuation-sub-text">
              BUILDING A BETTER, MORE TRUTHFUL DIGITAL WORLD.
            </div>
            <div className="continuation-geo-coords">
              <Compass size={12} className="geo-icon text-red" />
              <span>LOCATION: INDIA • 17.3850° N, 78.4867° E</span>
            </div>
          </div>

          {/* Bottom Dock Bar */}
          <div className="continuation-dock-bar">
            <div className="dock-focus-group">
              <span className="dock-focus-label">CURRENT FOCUS:</span>
              <div className="dock-focus-tags">
                <span className="dock-tag">[ AI/ML ]</span>
                <span className="dock-tag">[ FULL STACK ]</span>
                <span className="dock-tag">[ DATA ]</span>
                <span className="dock-tag">[ REAL WORLD IMPACT ]</span>
              </div>
            </div>

            <div className="dock-center-reticle" aria-hidden="true">
              <div className="reticle-core-dot" />
            </div>

            <div className="dock-quick-links">
              <a
                href={profileData.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="dock-icon-btn"
                aria-label="GitHub Profile"
              >
                <GithubIcon size={16} />
              </a>
              <a
                href={profileData.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="dock-icon-btn"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon size={16} />
              </a>
              <a href="#contact" className="dock-contact-cta">
                <Sparkles size={13} />
                <span>LET'S CONNECT</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
