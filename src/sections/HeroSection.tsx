import React, { useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Play,
  Plus,
  Brain,
  Code,
  Layers,
  Award,
  GraduationCap,
  Mail,
  FileText,
  Globe,
} from 'lucide-react';
import { profileData } from '../data';
import { getAssetUrl } from '../utils';
import { GithubIcon, LinkedinIcon } from '../components';

export const HeroSection: React.FC = () => {
  // Support both Slide 1 (Cyborg / Hello World) and Slide 2 (Cosmic Explorer / Human + AI)
  const [activeSlide, setActiveSlide] = useState<1 | 2>(1);

  return (
    <section id="home" className="hero-reference-section">
      {/* ====================================================================
          SLIDE TOGGLE CONTROLLER (HUD SWITCHER)
          ==================================================================== */}
      <div className="container hero-slide-controls-wrap">
        <div className="hero-slide-switcher">
          <span className="slide-switcher-label">HUD SLIDE:</span>
          <button
            type="button"
            className={`hud-slide-tab ${activeSlide === 1 ? 'active' : ''}`}
            onClick={() => setActiveSlide(1)}
          >
            <span className="tab-indicator" />
            <span>01 // HELLO WORLD</span>
          </button>
          <button
            type="button"
            className={`hud-slide-tab ${activeSlide === 2 ? 'active' : ''}`}
            onClick={() => setActiveSlide(2)}
          >
            <span className="tab-indicator" />
            <span>02 // COSMIC EXPLORER</span>
          </button>
        </div>
      </div>

      {/* ====================================================================
          ZONE 1: ASYMMETRIC MONUMENTAL HERO GRID (MATCHING REFERENCE EXACT)
          ==================================================================== */}
      <div className="container hero-main-container">
        <div className="hero-asymmetric-grid">
          {/* Left Column: Developer Identity & Typography */}
          <div className="hero-identity-col">
            <div className="hero-greeting-tag">
              <span className="hud-code-prefix">//</span>
              <span className="hud-code-text">
                {activeSlide === 1 ? 'HELLO, WORLD!' : 'HUMAN + AI + CREATIVITY'}
              </span>
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

              {activeSlide === 1 ? (
                <a href="#truthlens" className="hud-btn-secondary">
                  <Play size={13} className="play-triangle-icon" />
                  <span>WATCH SHOWREEL</span>
                </a>
              ) : (
                <a href="#truthlens" className="hud-btn-secondary">
                  <Play size={13} className="play-triangle-icon" />
                  <span>VIEW TRUTHLENS AI</span>
                </a>
              )}
            </div>

            {/* Precision Vertical Scroll Indicator */}
            <div className="hero-scroll-indicator">
              <div className="scroll-laser-track">
                <div className="scroll-laser-pulse" />
              </div>
              <div className="scroll-guide-wrap">
                <span className="scroll-guide-label">SCROLL TO EXPLORE</span>
                <div className="scroll-target-reticle">
                  <span className="scroll-reticle-pip" />
                </div>
              </div>
            </div>
          </div>

          {/* Center Column: Spatial 3D Graphic with Floating Badges */}
          <div className="hero-spatial-center">
            <div className="cosmic-core-preview-wrapper" aria-hidden="true">
              <img
                src={
                  activeSlide === 1
                    ? getAssetUrl('assets/hero-center-cyborg.jpg')
                    : getAssetUrl('assets/hero-center-cosmic.jpg')
                }
                alt={activeSlide === 1 ? 'Cyborg AI Core' : 'Cosmic Explorer Core'}
                className="cosmic-core-img"
              />
              <div className="cosmic-core-glow-ring" />
            </div>

            {/* Floating Telemetry Labels for Slide 2 */}
            {activeSlide === 2 && (
              <>
                <div className="spatial-telemetry-side left" aria-hidden="true">
                  <span>BUILD</span>
                  <span>LEARN</span>
                  <span>CREATE</span>
                  <span>IMPACT</span>
                </div>

                <div className="spatial-telemetry-side right" aria-hidden="true">
                  <span>IDEAS</span>
                  <span>INTO</span>
                  <span>REALITY</span>
                </div>
              </>
            )}

            {/* Floating HUD Callout Badges */}
            <div className="spatial-floating-badge badge-top-left">
              <span className="badge-text">CREATIVE THINKER</span>
              <Plus size={11} className="badge-plus-icon" />
            </div>

            <div className="spatial-floating-badge badge-top-right">
              <Plus size={11} className="badge-plus-icon" />
              <span className="badge-text">PROBLEM SOLVER</span>
            </div>

            {activeSlide === 2 && (
              <div className="spatial-floating-badge badge-mid-right">
                <Plus size={11} className="badge-plus-icon" />
                <span className="badge-text">AI BUILDER</span>
              </div>
            )}

            <div className="spatial-floating-badge badge-bottom-right">
              <Plus size={11} className="badge-plus-icon" />
              <span className="badge-text">CONTINUOUS LEARNER</span>
            </div>
          </div>

          {/* Right Column: Numeric Stats (Slide 1) OR Readout Nodes (Slide 2) */}
          <div className="hero-stats-hud-col">
            {/* Quote Banner */}
            <div className="hero-quote-box">
              <div className="hero-quote-content">
                &ldquo;TECHNOLOGY IS A <strong>TOOL.</strong>
                <br />
                IMPACT IS A <strong>CHOICE.</strong>&rdquo;
              </div>
              <div className="hero-quote-author">— JAYA SURYA</div>
            </div>

            {activeSlide === 1 ? (
              /* Numeric Stats for Slide 1 */
              <div className="hero-numeric-stats">
                <div className="hero-stat-row">
                  <div className="stat-big-number">
                    100<span className="stat-plus">+</span>
                  </div>
                  <div className="stat-label">HOURS OF LEARNING</div>
                </div>
                <div className="hero-stat-row">
                  <div className="stat-big-number">
                    10<span className="stat-plus">+</span>
                  </div>
                  <div className="stat-label">TECHNOLOGIES</div>
                </div>
                <div className="hero-stat-row">
                  <div className="stat-big-number">
                    3<span className="stat-plus">+</span>
                  </div>
                  <div className="stat-label">MAJOR PROJECTS</div>
                </div>
                <div className="hero-stat-row">
                  <div className="stat-big-number">∞</div>
                  <div className="stat-label">BIGGER DREAMS</div>
                </div>
              </div>
            ) : (
              /* Readout Stack for Slide 2 */
              <div className="hero-readout-stack">
                <div className="hero-readout-node">
                  <div className="readout-icon-box">
                    <Brain size={18} className="readout-hud-icon" />
                  </div>
                  <div className="readout-text-box">
                    <div className="readout-primary-val">AI & DATA SCIENCE</div>
                    <div className="readout-secondary-tag">FOCUS AREA</div>
                  </div>
                </div>

                <div className="hero-readout-node">
                  <div className="readout-icon-box">
                    <Code size={18} className="readout-hud-icon" />
                  </div>
                  <div className="readout-text-box">
                    <div className="readout-primary-val">FULL STACK</div>
                    <div className="readout-secondary-tag">DEVELOPMENT</div>
                  </div>
                </div>

                <div className="hero-readout-node">
                  <div className="readout-icon-box">
                    <Layers size={18} className="readout-hud-icon" />
                  </div>
                  <div className="readout-text-box">
                    <div className="readout-primary-val">TRUTHLENS AI</div>
                    <div className="readout-secondary-tag">FLAGSHIP PROJECT</div>
                  </div>
                </div>

                <div className="hero-readout-node">
                  <div className="readout-icon-box">
                    <Award size={18} className="readout-hud-icon" />
                  </div>
                  <div className="readout-text-box">
                    <div className="readout-primary-val">ORACLE CERTIFIED</div>
                    <div className="readout-secondary-tag">PROFESSIONAL</div>
                  </div>
                </div>

                <div className="hero-readout-node">
                  <div className="readout-icon-box">
                    <GraduationCap size={18} className="readout-hud-icon" />
                  </div>
                  <div className="readout-text-box">
                    <div className="readout-primary-val">B.TECH</div>
                    <div className="readout-secondary-tag">AI & DATA SCIENCE</div>
                  </div>
                </div>

                <div className="hero-readout-footnote">
                  <span className="footnote-label">DRIVEN BY</span>
                  <span className="footnote-highlight">BIGGER DREAMS</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ====================================================================
          ZONE 2: LOWER HERO 4-CARD PORTAL STRIP (EXACT REFERENCE DESIGN)
          ==================================================================== */}
      <div className="container hero-portals-container">
        <div className="hero-portals-grid">
          {/* Card 01: TruthLens AI */}
          <a href="#truthlens" className="hero-portal-card portal-truthlens">
            <div className="portal-content-left">
              <div className="portal-index-badge">01</div>
              <div className="portal-title-row">
                <h3 className="portal-title">TRUTHLENS AI</h3>
                <ArrowUpRight size={13} className="portal-arrow" />
              </div>
              <p className="portal-desc">Fake Media Detection using Multimodal AI</p>
              <div className="portal-action-link">
                <span>VIEW PROJECT</span>
                <ArrowRight size={12} />
              </div>
            </div>
            <div className="portal-thumb-right">
              <img
                src={getAssetUrl('assets/portal-face.jpg')}
                alt="TruthLens Holographic Face Forensics"
                className="portal-thumb-img"
                loading="lazy"
              />
              <div className="portal-thumb-overlay" />
            </div>
          </a>

          {/* Card 02: Skills Universe */}
          <a href="#skills" className="hero-portal-card portal-skills">
            <div className="portal-content-left">
              <div className="portal-index-badge">02</div>
              <div className="portal-title-row">
                <h3 className="portal-title">SKILLS UNIVERSE</h3>
                <ArrowUpRight size={13} className="portal-arrow" />
              </div>
              <p className="portal-desc">Explore my technology ecosystem</p>
              <div className="portal-action-link">
                <span>EXPLORE</span>
                <ArrowRight size={12} />
              </div>
            </div>
            <div className="portal-thumb-right">
              <img
                src={getAssetUrl('assets/portal-skills.jpg')}
                alt="Technology Universe Ecosystem"
                className="portal-thumb-img"
                loading="lazy"
              />
              <div className="portal-thumb-overlay" />
            </div>
          </a>

          {/* Card 03: Journey */}
          <a href="#experience" className="hero-portal-card portal-journey">
            <div className="portal-content-left">
              <div className="portal-index-badge">03</div>
              <div className="portal-title-row">
                <h3 className="portal-title">JOURNEY</h3>
                <ArrowUpRight size={13} className="portal-arrow" />
              </div>
              <p className="portal-desc">Education • Experience • Growth Timeline</p>
              <div className="portal-action-link">
                <span>VIEW TIMELINE</span>
                <ArrowRight size={12} />
              </div>
            </div>
            <div className="portal-thumb-right">
              <img
                src={getAssetUrl('assets/portal-journey.jpg')}
                alt="Career Journey Timeline Highway"
                className="portal-thumb-img"
                loading="lazy"
              />
              <div className="portal-thumb-overlay" />
            </div>
          </a>

          {/* Card 04: Certificates */}
          <a href="#certificates" className="hero-portal-card portal-certificates">
            <div className="portal-content-left">
              <div className="portal-index-badge">04</div>
              <div className="portal-title-row">
                <h3 className="portal-title">CERTIFICATES</h3>
                <ArrowUpRight size={13} className="portal-arrow" />
              </div>
              <p className="portal-desc">Verified achievements & official credentials</p>
              <div className="portal-action-link">
                <span>VIEW VAULT</span>
                <ArrowRight size={12} />
              </div>
            </div>
            <div className="portal-thumb-right">
              <img
                src={getAssetUrl('assets/portal-cert.jpg')}
                alt="Oracle Agentic AI & Verified Credentials"
                className="portal-thumb-img"
                loading="lazy"
              />
              <div className="portal-thumb-overlay" />
            </div>
          </a>
        </div>
      </div>

      {/* ====================================================================
          ZONE 3: BOTTOM CINEMATIC CONTINUATION HORIZON & DOCK
          ==================================================================== */}
      <div className="container hero-continuation-container">
        <div className="continuation-panel-frame">
          {/* Background Earth Curvature Horizon */}
          <div className="continuation-earth-bg" aria-hidden="true">
            <img
              src={getAssetUrl('assets/hero-earth-horizon.jpg')}
              alt="Planet Earth Horizon"
              className="continuation-earth-img"
            />
            <div className="continuation-earth-gradient" />
          </div>

          {/* Corner Registration Marks */}
          <span className="hud-corner top-left" aria-hidden="true" />
          <span className="hud-corner top-right" aria-hidden="true" />
          <span className="hud-corner bottom-left" aria-hidden="true" />
          <span className="hud-corner bottom-right" aria-hidden="true" />

          {/* Content Over Horizon */}
          <div className="continuation-inner-content">
            {/* Top Motto Row */}
            <div className="continuation-top-motto">
              <span>{activeSlide === 1 ? 'FROM INDIA' : 'FROM IDEAS TODAY'}</span>
              <span className="motto-arrow">➔</span>
              <span>TO A MORE INTELLIGENT TOMORROW</span>
            </div>

            {/* Monumental Headline */}
            <div className="continuation-monument-heading">
              IDEAS <span className="text-red">➔</span> CODE <span className="text-red">➔</span> IMPACT
            </div>

            {/* Subtitle */}
            <div className="continuation-sub-text">
              BUILDING A BETTER, MORE TRUTHFUL DIGITAL WORLD.
            </div>

            {/* Telemetry Chips (Left & Right) */}
            <div className="continuation-telemetry-row">
              <div className="continuation-status-chip">
                <span className="pulse-signal-dot" />
                <div className="status-chip-text">
                  <span className="chip-sub">STATUS</span>
                  <span className="chip-main">AVAILABLE FOR OPPORTUNITIES</span>
                </div>
              </div>

              <div className="continuation-geo-coords">
                <span className="pulse-signal-dot" />
                <div className="geo-chip-text">
                  <span className="chip-sub">LOCATION</span>
                  <span className="chip-main">INDIA • 17.3850° N, 78.4867° E</span>
                </div>
                <Globe size={18} className="geo-world-icon text-red" />
              </div>
            </div>

            {/* Bottom HUD Floating Dock Bar */}
            <div className="continuation-dock-bar">
              {/* Left Identity Meta */}
              <div className="dock-identity-col">
                <div className="dock-name">JONNAKUTI JAYA SURYA</div>
                <div className="dock-role">AI & DATA SCIENCE | FULL STACK DEVELOPER</div>
              </div>

              {/* Center Glowing Reticle */}
              <div className="dock-center-reticle" aria-hidden="true">
                <div className="reticle-outer-ring" />
                <div className="reticle-core-dot" />
              </div>

              {/* Right Social & Connect Controls */}
              <div className="dock-right-actions">
                <div className="dock-social-pill">
                  <a
                    href={profileData.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="dock-icon-link"
                    aria-label="GitHub"
                    title="GitHub"
                  >
                    <GithubIcon size={15} />
                  </a>
                  <a
                    href={profileData.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="dock-icon-link"
                    aria-label="LinkedIn"
                    title="LinkedIn"
                  >
                    <LinkedinIcon size={15} />
                  </a>
                  <a
                    href="mailto:jonnakutijayasurya@gmail.com"
                    className="dock-icon-link"
                    aria-label="Email"
                    title="Email"
                  >
                    <Mail size={15} />
                  </a>
                  <a
                    href={getAssetUrl(profileData.resumeUrl)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="dock-icon-link"
                    aria-label="Resume"
                    title="Official Resume PDF"
                  >
                    <FileText size={15} />
                  </a>
                </div>

                <a href="#contact" className="dock-connect-btn">
                  <span>LET'S CONNECT</span>
                  <ArrowRight size={13} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
