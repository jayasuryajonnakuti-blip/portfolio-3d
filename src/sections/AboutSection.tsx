import React from 'react';
import { educationData, languagesData } from '../data';

export const AboutSection: React.FC = () => {
  return (
    <section id="about">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">01 / BACKGROUND</div>
          <h2 className="section-title">
            Developer Mindset, <span className="text-gradient">Engineering Focus</span>
          </h2>
          <p className="section-desc">
            Building robust software through solid computer science fundamentals, full-stack web engineering, and applied artificial intelligence.
          </p>
        </div>

        <div className="about-grid">
          {/* Main Narrative Card */}
          <div className="about-main-card spotlight-card">
            <h3 style={{ fontSize: '1.45rem', fontWeight: 800, marginBottom: '14px' }}>
              Who I Am
            </h3>
            <p className="about-text">
              I am a Bachelor of Technology student specializing in <strong>Artificial Intelligence and Data Science</strong> at Dhanalakshmi Srinivasan University. My passion lies in architecting dependable software solutions using <strong>Java, Object-Oriented Programming, and Data Structures</strong>, paired with dynamic web interfaces and modern AI APIs.
            </p>
            <p className="about-text">
              Through internships at <strong>Averixis Solutions</strong> and <strong>CodSoft</strong>, I have worked on real-world full-stack development workflows, database schema design, and modular codebases. My goal is to continuously grow as a high-impact Java Full Stack Developer who bridges traditional software engineering with cutting-edge AI capabilities.
            </p>

            <div className="highlights-list">
              <div className="highlight-item">
                <div className="highlight-icon">🎯</div>
                <div>
                  <h4>Full Stack Foundations</h4>
                  <p>Comprehensive training in Java, SQL, HTML5, CSS3, JavaScript, and Git collaboration.</p>
                </div>
              </div>
              <div className="highlight-item">
                <div className="highlight-icon">⚡</div>
                <div>
                  <h4>Multimodal AI Systems</h4>
                  <p>Developed TruthLens AI to detect manipulated media and text with confidence scoring.</p>
                </div>
              </div>
              <div className="highlight-item">
                <div className="highlight-icon">🏆</div>
                <div>
                  <h4>Industry Certified</h4>
                  <p>Oracle Certified in Agentic AI Foundations, Scaler DSA, and TCS iON Soft Skills.</p>
                </div>
              </div>
              <div className="highlight-item">
                <div className="highlight-icon">🔍</div>
                <div>
                  <h4>Algorithmic Rigor</h4>
                  <p>Strong problem-solving and debugging skillset with deep focus on clean code and OOP.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Academic Journey & Languages */}
          <div className="education-column">
            {educationData.map((edu) => (
              <div key={edu.id} className="edu-card spotlight-card">
                <span className="edu-badge">{edu.period}</span>
                <h3>{edu.degree}</h3>
                <p className="edu-inst">{edu.institution}</p>
                <p className="edu-score">{edu.score}</p>
              </div>
            ))}

            <div className="languages-card spotlight-card">
              <h4 style={{ fontSize: '0.96rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Language Proficiencies
              </h4>
              <div className="lang-chips">
                {languagesData.map((l) => (
                  <span key={l.language} className="lang-chip">
                    {l.language} ({l.proficiency})
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
