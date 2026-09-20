import React from 'react';
import { UserCheck, GraduationCap, Languages } from 'lucide-react';
import { educationData, languagesData } from '../data';

export const AboutSection: React.FC = () => {
  return (
    <section id="about">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <UserCheck size={14} />
            <span>01 / IDENTITY & ROOTS</span>
          </div>
          <h2 className="section-title">
            Engineering Rigor, <span className="text-gradient-red">Applied AI</span>
          </h2>
          <p className="section-desc">
            Combining core computer science, object-oriented software engineering, and modern multimodal AI architectures to solve real-world problems.
          </p>
        </div>

        <div className="about-grid">
          {/* Main Narrative Card */}
          <div className="about-main-card spotlight-card">
            <h3 style={{ fontSize: '1.45rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '16px' }}>
              Architectural Philosophy
            </h3>
            <p className="about-text">
              I am an undergraduate developer pursuing a Bachelor of Technology in <strong>Artificial Intelligence and Data Science</strong> at <strong>Dhanalakshmi Srinivasan University</strong>. My core technical foundation is rooted in <strong>Java, Object-Oriented Programming, and Data Structures & Algorithms</strong>, paired with high-efficiency web interfaces and generative AI APIs.
            </p>
            <p className="about-text">
              Through industry internships at <strong>Averixis Solutions</strong> and <strong>CodSoft</strong>, I have contributed to production Java full-stack workflows, SQL database schema modeling, and modular component design. My flagship project, <strong>TruthLens AI</strong>, is dedicated to combating digital misinformation using Google Gemini multimodal vision.
            </p>

            <div className="highlights-list">
              <div className="highlight-item">
                <div className="highlight-icon">☕</div>
                <div>
                  <h4>Java Full Stack</h4>
                  <p>Core Java, OOP, SQL databases, clean modular architecture, and unit testing.</p>
                </div>
              </div>
              <div className="highlight-item">
                <div className="highlight-icon">👁️</div>
                <div>
                  <h4>Multimodal AI Forensics</h4>
                  <p>Vision & LLM pipelines using Google Gemini API for deepfake detection.</p>
                </div>
              </div>
              <div className="highlight-item">
                <div className="highlight-icon">🛡️</div>
                <div>
                  <h4>Industry Certified</h4>
                  <p>Oracle Certified Foundations Associate in Agentic AI, Scaler DSA, and TCS iON.</p>
                </div>
              </div>
              <div className="highlight-item">
                <div className="highlight-icon">⚡</div>
                <div>
                  <h4>Algorithmic Problem Solving</h4>
                  <p>Hands-on DSA practice in Java with focus on performance optimization.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Academic Journey & Languages */}
          <div className="education-column">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--red-bright)', marginBottom: '4px', fontSize: '0.85rem', fontFamily: 'var(--font-mono)' }}>
              <GraduationCap size={16} />
              <span>ACADEMIC MILESTONES</span>
            </div>
            {educationData.map((edu) => (
              <div key={edu.id} className="edu-card spotlight-card">
                <span className="edu-badge">{edu.period}</span>
                <h3>{edu.degree}</h3>
                <p className="edu-inst">{edu.institution}</p>
                <p className="edu-score">{edu.score}</p>
              </div>
            ))}

            <div className="languages-card spotlight-card" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', marginBottom: '8px', fontSize: '0.86rem', fontWeight: 700 }}>
                <Languages size={16} color="#FF1A1A" />
                <span>Languages Spoken</span>
              </div>
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
