import React from 'react';
import { Code, Globe, Database, Cpu, Wrench } from 'lucide-react';
import { skillCategoriesData } from '../data';

export const SkillsSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'code':
        return <Code size={22} />;
      case 'globe':
        return <Globe size={22} />;
      case 'database':
        return <Database size={22} />;
      case 'cpu':
        return <Cpu size={22} />;
      case 'wrench':
      default:
        return <Wrench size={22} />;
    }
  };

  return (
    <section id="skills">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">02 / EXPERTISE</div>
          <h2 className="section-title">
            Technical <span className="text-gradient">Toolkit & Skills</span>
          </h2>
          <p className="section-desc">
            Organized categories of languages, frameworks, databases, and engineering competencies practiced across projects and certifications.
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
                  <h3>{cat.title}</h3>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
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
