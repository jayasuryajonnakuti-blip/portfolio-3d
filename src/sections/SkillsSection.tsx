import React from 'react';
import { Code, Globe, Database, Cpu, Wrench, Layers, ExternalLink } from 'lucide-react';
import { skillCategoriesData } from '../data';

export const SkillsSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'code':
        return <Code size={20} />;
      case 'globe':
        return <Globe size={20} />;
      case 'database':
        return <Database size={20} />;
      case 'cpu':
        return <Cpu size={20} />;
      case 'wrench':
      default:
        return <Wrench size={20} />;
    }
  };

  return (
    <section id="skills">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <Layers size={14} />
            <span>02 / TECHNOLOGY UNIVERSE</span>
          </div>
          <h2 className="section-title">
            Engineering <span className="text-gradient-red">Toolkit & Skills</span>
          </h2>
          <p className="section-desc">
            Interactive technology universe. Click any technology to explore its official ecosystem, developer documentation, or authoritative architecture hub.
          </p>
        </div>

        <div className="skills-categories-grid">
          {skillCategoriesData.map((cat, idx) => (
            <div
              key={cat.id}
              className="skill-category-card spotlight-card"
              style={cat.fullWidth ? { gridColumn: '1 / -1' } : {}}
            >
              <div className="category-header">
                <div className="category-icon-box">{getIcon(cat.icon)}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                    <span className="category-code-tag">CAT // 0{idx + 1}</span>
                    <span className="category-count-tag">{cat.skills.length} NODES</span>
                  </div>
                  <h3 style={{ fontSize: '1.18rem', fontWeight: 800, marginTop: '2px' }}>{cat.title}</h3>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                    {cat.subtitle}
                  </span>
                </div>
              </div>
              <div className="skill-badges-container">
                {cat.skills.map((skill) => (
                  <a
                    key={skill.name}
                    href={skill.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="skill-item skill-interactive-link"
                    aria-label={`Explore official documentation and ecosystem for ${skill.name} (opens in a new tab)`}
                    title={`${skill.name} — ${skill.isOfficial ? 'Official Technology Ecosystem' : 'Authoritative Architecture Reference'}`}
                  >
                    <span className="skill-name-text">{skill.name}</span>
                    <span className="skill-hub-indicator" aria-hidden="true">HUB</span>
                    <ExternalLink size={11} className="skill-link-icon" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
