import React, { useState } from 'react';
import { skillCategoriesData } from '../data';
import { ExternalLink, ArrowRight, Cpu, Code, Database, Globe, Wrench, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SkillConnection {
  targetName: string;
  targetType: 'project' | 'certification' | 'experience';
  linkUrl: string;
  isInternal: boolean;
}

// Map key skills to authentic project/evidence destinations
const SKILL_EVIDENCE_MAP: Record<string, SkillConnection> = {
  'React': {
    targetName: 'TruthLens AI Flagship Application',
    targetType: 'project',
    linkUrl: '/work/truthlens',
    isInternal: true,
  },
  'TypeScript': {
    targetName: 'TruthLens AI Forensic Architecture',
    targetType: 'project',
    linkUrl: '/work/truthlens',
    isInternal: true,
  },
  'Google Gemini API': {
    targetName: 'TruthLens Multimodal Vision Pipeline',
    targetType: 'project',
    linkUrl: '/work/truthlens',
    isInternal: true,
  },
  'FileReader API': {
    targetName: 'In-Memory Client Staging Pipeline',
    targetType: 'project',
    linkUrl: '/work/truthlens',
    isInternal: true,
  },
  'jsPDF Export': {
    targetName: 'Forensic Evidence PDF Generation',
    targetType: 'project',
    linkUrl: '/work/truthlens',
    isInternal: true,
  },
  'Recharts': {
    targetName: 'TruthLens Forensic Telemetry Visualizer',
    targetType: 'project',
    linkUrl: '/work/truthlens',
    isInternal: true,
  },
  'Core Java': {
    targetName: 'Averixis & CodSoft Industry Internships',
    targetType: 'experience',
    linkUrl: '/about',
    isInternal: true,
  },
  'OOP Concepts': {
    targetName: 'Modular Java Backend Architecture',
    targetType: 'experience',
    linkUrl: '/about',
    isInternal: true,
  },
  'SQL': {
    targetName: 'Database Schema Modeling & Relational Queries',
    targetType: 'experience',
    linkUrl: '/about',
    isInternal: true,
  },
  'Agentic AI Foundations': {
    targetName: 'Oracle Certified Foundations Associate (2025)',
    targetType: 'certification',
    linkUrl: '/about',
    isInternal: true,
  },
  'Data Structures & Algorithms': {
    targetName: 'Scaler DSA in Java Certification',
    targetType: 'certification',
    linkUrl: '/about',
    isInternal: true,
  },
};

export const SkillGraph: React.FC = () => {
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  const getCategoryIcon = (icon: string) => {
    switch (icon) {
      case 'code':
        return <Code size={18} />;
      case 'globe':
        return <Globe size={18} />;
      case 'database':
        return <Database size={18} />;
      case 'cpu':
        return <Cpu size={18} />;
      case 'wrench':
      default:
        return <Wrench size={18} />;
    }
  };

  const currentEvidence = activeSkill ? SKILL_EVIDENCE_MAP[activeSkill] : null;

  return (
    <div className="skill-graph-wrapper" aria-label="Skill to Evidence Traceability Graph">
      <div className="skill-graph-header">
        <div className="section-tag">
          <Layers size={14} />
          <span>TRACEABLE SKILL GRAPH</span>
        </div>
        <h3 className="skill-graph-title">
          Every Skill Traces to <span className="text-signal">Shipped Evidence</span>
        </h3>
        <p className="skill-graph-desc">
          Hover over any engineering skill to trace its real-world implementation in TruthLens AI, verified certifications, or industry internships. Click to inspect the official technology hub.
        </p>
      </div>

      {/* Active Trace Banner */}
      <div className={`skill-evidence-banner ${currentEvidence ? 'has-active' : ''}`}>
        {activeSkill && currentEvidence ? (
          <div className="evidence-trace-content">
            <span className="evidence-pill">EVIDENCE TRACED</span>
            <span className="evidence-skill-name">{activeSkill}</span>
            <span className="evidence-arrow">➔</span>
            <span className="evidence-target-name">{currentEvidence.targetName}</span>
            {currentEvidence.isInternal ? (
              <Link to={currentEvidence.linkUrl} className="evidence-nav-btn">
                <span>Inspect Evidence</span>
                <ArrowRight size={13} />
              </Link>
            ) : (
              <a href={currentEvidence.linkUrl} target="_blank" rel="noopener noreferrer" className="evidence-nav-btn">
                <span>View Evidence</span>
                <ExternalLink size={13} />
              </a>
            )}
          </div>
        ) : (
          <div className="evidence-idle-content">
            <span className="telemetry-dot" />
            <span>HOVER OVER ANY SKILL TO TRACE ITS SYSTEM FOOTPRINT</span>
          </div>
        )}
      </div>

      {/* Categories Grid */}
      <div className="skill-categories-matrix">
        {skillCategoriesData.map((cat) => (
          <div key={cat.id} className="skill-matrix-card">
            <div className="matrix-cat-header">
              <div className="matrix-cat-icon">{getCategoryIcon(cat.icon)}</div>
              <div>
                <h4 className="matrix-cat-title">{cat.title}</h4>
                <div className="matrix-cat-sub">{cat.subtitle}</div>
              </div>
            </div>

            <div className="matrix-skills-cloud">
              {cat.skills.map((skill) => {
                const hasEvidence = !!SKILL_EVIDENCE_MAP[skill.name];
                const isSelected = activeSkill === skill.name;
                return (
                  <a
                    key={skill.name}
                    href={skill.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`matrix-skill-badge ${hasEvidence ? 'has-evidence' : ''} ${isSelected ? 'is-traced' : ''}`}
                    onMouseEnter={() => setActiveSkill(skill.name)}
                    onMouseLeave={() => setActiveSkill(null)}
                    title={`${skill.name} — Click to explore official ${skill.isOfficial ? 'ecosystem' : 'docs'}`}
                  >
                    <span>{skill.name}</span>
                    {hasEvidence && <span className="trace-anchor-dot" title="Traces to shipped project" />}
                    <ExternalLink size={11} className="skill-link-arrow" />
                  </a>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
