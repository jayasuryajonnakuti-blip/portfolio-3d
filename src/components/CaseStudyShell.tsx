import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Sparkles, FileText } from 'lucide-react';
import { GithubIcon } from './Icons';
import { CaseStudyData } from '../content/work/truthlens';

interface CaseStudyShellProps {
  caseStudy: CaseStudyData;
  children: React.ReactNode;
}

const SECTION_NAV = [
  { id: 'problem', label: '01. The Problem' },
  { id: 'why-fail', label: '02. Prior Art Gaps' },
  { id: 'constraints', label: '03. Constraints' },
  { id: 'architecture', label: '04. Architecture' },
  { id: 'decisions', label: '05. Key Decisions' },
  { id: 'proof', label: '06. Live Proof' },
  { id: 'outcome', label: '07. Retrospective' },
];

export const CaseStudyShell: React.FC<CaseStudyShellProps> = ({
  caseStudy,
  children,
}) => {
  const [activeSection, setActiveSection] = useState<string>('problem');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const s of SECTION_NAV) {
        const el = document.getElementById(s.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(s.id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <article className="case-study-shell">
      {/* Header Sticky Navigation & Breadcrumbs */}
      <header className="case-study-header-bar">
        <div className="container case-header-inner">
          <Link to="/work" className="case-back-link">
            <ArrowLeft size={16} />
            <span>ALL WORK</span>
          </Link>

          <div className="case-header-title-pill">
            <span className="telemetry-dot" />
            <span>FLAGSHIP CASE STUDY // {caseStudy.title.toUpperCase()}</span>
          </div>

          <div className="case-header-actions">
            <a
              href={caseStudy.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-signal btn-sm"
            >
              <Sparkles size={13} />
              <span>Live System</span>
              <ExternalLink size={12} />
            </a>
            <a
              href={caseStudy.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-panel btn-sm"
            >
              <GithubIcon size={14} />
              <span>Source</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Hero Header of Case Study */}
      <section className="case-study-hero">
        <div className="container">
          <div className="case-hero-meta-bar">
            <span className="case-status-badge">STATUS: {caseStudy.status.toUpperCase()}</span>
            <span className="case-role-badge">ROLE: {caseStudy.role.toUpperCase()}</span>
            <span className="case-timeline-badge">TIMELINE: {caseStudy.timeline}</span>
          </div>

          <h1 className="case-study-headline">{caseStudy.title}</h1>
          <p className="case-study-thesis-lead">
            {caseStudy.thesis}
          </p>

          <div className="case-tech-stack-row">
            {caseStudy.stack.map((t) => (
              <span key={t} className="case-tech-tag">
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Main Body Grid with Sticky Navigation Rail */}
      <div className="container case-study-body-layout">
        {/* Sticky Sidebar Navigation Rail */}
        <aside className="case-nav-rail" aria-label="Case Study Section Rail">
          <div className="rail-sticky-wrap">
            <div className="rail-title">TABLE OF CONTENTS</div>
            <ul className="rail-list">
              {SECTION_NAV.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className={`rail-link ${activeSection === s.id ? 'is-active' : ''}`}
                  >
                    <span className="rail-dot" />
                    <span>{s.label}</span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="rail-quick-receipts">
              <div className="receipts-title">PRIMARY RECEIPTS</div>
              <a
                href={caseStudy.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="receipt-link text-signal"
              >
                <span>Live Vercel URL</span>
                <ExternalLink size={12} />
              </a>
              <a
                href={caseStudy.reportUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="receipt-link"
              >
                <span>49-Page PDF Report</span>
                <FileText size={12} />
              </a>
              <a
                href={caseStudy.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="receipt-link"
              >
                <span>GitHub Repository</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </aside>

        {/* Content Stream */}
        <div className="case-content-stream">
          {children}
        </div>
      </div>
    </article>
  );
};
