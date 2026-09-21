import React from 'react';
import { ArrowRight, ArrowUpRight, Mail, FileText } from 'lucide-react';
import { profileData } from '../data';
import { getAssetUrl } from '../utils';
import { GithubIcon, LinkedinIcon, SolarSkillsOrbit } from '../components';

const skillCategories = [
  {
    idx: '01',
    title: 'PROGRAMMING',
    desc: 'Core languages that power problem solving and development.',
    techs: ['Java', 'Python', 'TS', 'C'],
    colors: ['#F89820', '#3572A5', '#3178C6', '#555'],
    href: '#skills',
  },
  {
    idx: '02',
    title: 'WEB TECHNOLOGIES',
    desc: 'Modern tools for building responsive and interactive web applications.',
    techs: ['React', 'HTML', 'CSS', 'Node'],
    colors: ['#61DAFB', '#E34F26', '#264de4', '#68A063'],
    href: '#skills',
  },
  {
    idx: '03',
    title: 'DATABASE & STORAGE',
    desc: 'Manage and store data efficiently and securely.',
    techs: ['MongoDB', 'MySQL', 'Firebase'],
    colors: ['#4DB33D', '#00758F', '#FFA611'],
    href: '#skills',
  },
  {
    idx: '04',
    title: 'AI & DATA SCIENCE',
    desc: 'Technologies for building intelligent systems and data-driven solutions.',
    techs: ['Python', 'Gemini', 'Power BI'],
    colors: ['#3572A5', '#4285F4', '#F2C811'],
    href: '#skills',
  },
  {
    idx: '05',
    title: 'TOOLS & PRACTICES',
    desc: 'Essential tools for productive and scalable development.',
    techs: ['GitHub', 'VSCode', 'Docker', 'AWS'],
    colors: ['#FFF', '#007ACC', '#2496ED', '#FF9900'],
    href: '#skills',
  },
];

export const SkillsSection: React.FC = () => {
  return (
    <section id="skills" className="skills-universe-section">

      {/* ── TOP ZONE: Info + Orbit + Sidebar ────────────────────────── */}
      <div className="skills-top-zone">

        {/* Left: Info Column */}
        <div className="skills-info-col">
          <div className="skills-breadcrumb">
            <span className="skills-breadcrumb-dot" />
            <span>03 / SKILLS</span>
          </div>

          <h2 className="skills-universe-heading">
            <span className="skills-heading-white">TECHNOLOGY</span>
            <span className="skills-heading-red">UNIVERSE</span>
          </h2>

          <p className="skills-ecosystem-subtitle">
            A DIVERSE ECOSYSTEM<br />OF MODERN TECHNOLOGIES
          </p>

          <p className="skills-info-desc">
            Tools and technologies I use to turn ideas into real-world solutions.
            Click on any skill to explore the official documentation.
          </p>

          <div className="skills-mini-stats">
            <div className="skills-mini-stat">
              <div className="skills-mini-num">5</div>
              <div className="skills-mini-label">SKILL CATEGORIES</div>
            </div>
            <div className="skills-mini-stat">
              <div className="skills-mini-num">20<span className="stat-plus">+</span></div>
              <div className="skills-mini-label">TECHNOLOGIES</div>
            </div>
            <div className="skills-mini-stat">
              <div className="skills-mini-num">∞</div>
              <div className="skills-mini-label">CONTINUOUS LEARNING</div>
            </div>
          </div>

          <a href="#projects" className="skills-explore-btn">
            <span>EXPLORE FULL ECOSYSTEM</span>
            <ArrowRight size={14} />
          </a>
        </div>

        {/* Center: Orbital Visualization */}
        <div className="skills-orbit-center">
          <SolarSkillsOrbit />
        </div>

        {/* Right: Skills Overview Sidebar */}
        <div className="skills-sidebar-col">
          <div className="skills-sidebar-panel">
            <div className="skills-sidebar-title">SKILLS OVERVIEW</div>

            <div className="skills-sidebar-stats">
              <div className="skills-sidebar-stat">
                <div className="sidebar-stat-num">5</div>
                <div className="sidebar-stat-label">CATEGORIES</div>
              </div>
              <div className="skills-sidebar-divider" />
              <div className="skills-sidebar-stat">
                <div className="sidebar-stat-num">20<span className="stat-plus">+</span></div>
                <div className="sidebar-stat-label">TECHNOLOGIES</div>
              </div>
              <div className="skills-sidebar-divider" />
              <div className="skills-sidebar-stat">
                <div className="sidebar-stat-num">∞</div>
                <div className="sidebar-stat-label">GROWTH MINDSET</div>
              </div>
            </div>

            <div className="skills-sidebar-quote">
              <div className="skills-sidebar-quote-text">
                &ldquo;The right tools amplify human potential into real impact.&rdquo;
              </div>
              <div className="skills-sidebar-quote-author">— JAYA SURYA</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── MIDDLE ZONE: 5 Category Cards ───────────────────────────── */}
      <div className="skills-cat-strip">
        {skillCategories.map((cat) => (
          <a key={cat.idx} href={cat.href} className="skills-cat-card">
            <div className="skills-cat-index">{cat.idx}</div>
            <div className="skills-cat-title-row">
              <span className="skills-cat-title">{cat.title}</span>
              <ArrowUpRight size={13} className="skills-cat-arrow" />
            </div>
            <p className="skills-cat-desc">{cat.desc}</p>
            <div className="skills-cat-tech-row">
              {cat.techs.map((t, i) => (
                <span
                  key={t}
                  className="skills-cat-tech-pill"
                  style={{ borderColor: cat.colors[i] + '88', color: cat.colors[i] }}
                >
                  {t}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>

      {/* ── BOTTOM ZONE: EXPLORE → LEARN → BUILD → GROW banner ─────── */}
      <div className="skills-bottom-banner">
        <div className="skills-banner-left">
          <div className="skills-banner-label">SKILLS TODAY</div>
          <div className="skills-banner-sub">SOLUTIONS TOMORROW</div>
        </div>

        <div className="skills-banner-flow">
          <span className="skills-banner-word">EXPLORE</span>
          <span className="skills-banner-arrow">→</span>
          <span className="skills-banner-word">LEARN</span>
          <span className="skills-banner-arrow">→</span>
          <span className="skills-banner-word">BUILD</span>
          <span className="skills-banner-arrow">→</span>
          <span className="skills-banner-word">GROW</span>
        </div>

        <div className="skills-banner-right">
          <span className="skills-banner-label">//</span>
          <span className="skills-banner-sub">DRIVEN BY</span>
          <span className="skills-banner-label">CURIOSITY</span>
        </div>
      </div>

      {/* ── DOCK BAR ────────────────────────────────────────────────── */}
      <div className="skills-dock-bar">
        <div className="dock-identity-col">
          <div className="dock-name">JONNAKUTI JAYA SURYA</div>
          <div className="dock-role">AI &amp; DATA SCIENCE | FULL STACK DEVELOPER</div>
        </div>

        <div className="dock-center-reticle" aria-hidden="true">
          <div className="reticle-outer-ring" />
          <div className="reticle-core-dot" />
        </div>

        <div className="dock-right-actions">
          <div className="dock-social-pill">
            <a href={profileData.githubUrl} target="_blank" rel="noopener noreferrer"
              className="dock-icon-link" aria-label="GitHub">
              <GithubIcon size={15} />
            </a>
            <a href={profileData.linkedinUrl} target="_blank" rel="noopener noreferrer"
              className="dock-icon-link" aria-label="LinkedIn">
              <LinkedinIcon size={15} />
            </a>
            <a href="mailto:jonnakutijayasurya@gmail.com" className="dock-icon-link" aria-label="Email">
              <Mail size={15} />
            </a>
            <a href={getAssetUrl(profileData.resumeUrl)} target="_blank" rel="noopener noreferrer"
              className="dock-icon-link" aria-label="Resume">
              <FileText size={15} />
            </a>
          </div>
          <a href="#contact" className="dock-connect-btn">
            <span>LET'S CONNECT</span>
            <ArrowRight size={13} />
          </a>
        </div>
      </div>

    </section>
  );
};
