import React from 'react';
import { Code, Globe, Database, Cpu, Wrench, Layers } from 'lucide-react';
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
            Technical competencies and programming languages practiced across full stack web applications, AI research projects, and verified industry credentials.
          </p>
        </div>

        <div className="skills-categories-grid">
          {skillCategoriesData.map((cat) => (
            <div
              key={cat.id}
              className="skill-category-card spotlight-card"
              style={cat.fullWidth ? { gridColumn: '1 / -1' } : {}}
            >
              <div className="category-header">
                <div className="category-icon-box">{getIcon(cat.icon)}</div>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>{cat.title}</h3>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                    {cat.subtitle}
                  </span>
                </div>
              </div>
              <div className="skill-badges-container">
                {cat.skills.map((skill) => (
                  <span key={skill} className="skill-item">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
