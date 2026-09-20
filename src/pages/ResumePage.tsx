import React from 'react';
import { getAssetUrl } from '../utils';
import { profileData, educationData, experienceData, contactData } from '../data';
import { Download, Printer, Mail, Phone, MapPin } from 'lucide-react';

export const ResumePage: React.FC = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="resume-page-container">
      <div className="container" style={{ paddingTop: '130px', paddingBottom: '100px', maxWidth: '900px' }}>
        {/* Action Header (hidden in print) */}
        <div className="resume-action-header no-print">
          <div>
            <span className="section-tag" style={{ marginBottom: '8px' }}>
              <span>OFFICIAL RESUME // RECRUITER COPY</span>
            </span>
            <h1 style={{ fontSize: '2rem', fontWeight: 900 }}>Curriculum Vitae</h1>
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button type="button" onClick={handlePrint} className="btn btn-panel">
              <Printer size={16} />
              <span>Print Page</span>
            </button>
            <a
              href={getAssetUrl('assets/Surya_Reddy_Resume.pdf')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-signal"
              download="Jonnakuti_Jaya_Surya_Resume.pdf"
            >
              <Download size={16} />
              <span>Download Official PDF</span>
            </a>
          </div>
        </div>

        {/* Printable ATS-Friendly Resume Sheet */}
        <article className="resume-sheet">
          {/* Header */}
          <header className="resume-sheet-header">
            <h1 className="resume-name">{profileData.name.toUpperCase()}</h1>
            <div className="resume-role-line">
              JAVA FULL STACK DEVELOPER • ARTIFICIAL INTELLIGENCE & DATA SCIENCE
            </div>

            <div className="resume-contact-bar">
              <span><Mail size={12} /> {contactData.email}</span>
              <span>•</span>
              <span><Phone size={12} /> {contactData.phone}</span>
              <span>•</span>
              <span><MapPin size={12} /> {contactData.location}</span>
              <span>•</span>
              <a href={profileData.githubUrl} target="_blank" rel="noopener noreferrer">
                github.com/jayasuryajonnakuti-blip
              </a>
              <span>•</span>
              <a href={profileData.linkedinUrl} target="_blank" rel="noopener noreferrer">
                linkedin.com/in/jaya-surya-reddy
              </a>
            </div>
          </header>

          <hr className="resume-divider" />

          {/* Executive Summary */}
          <section className="resume-section">
            <h2 className="resume-sec-title">PROFESSIONAL SUMMARY</h2>
            <p className="resume-body-p">
              Pre-final year B.Tech student in Artificial Intelligence and Data Science at Dhanalakshmi Srinivasan University (CGPA 7.62). Proficient in Core Java, Object-Oriented Programming (OOP), Data Structures & Algorithms, and modern web architectures. Industry-trained through full-stack developer internships at Averixis Solutions and CodSoft. Creator of TruthLens AI, an explainable synthetic media forensics instrument. Oracle Certified Foundations Associate in Agentic AI.
            </p>
          </section>

          {/* Education */}
          <section className="resume-section">
            <h2 className="resume-sec-title">EDUCATION</h2>
            {educationData.map((edu) => (
              <div key={edu.id} className="resume-entry">
                <div className="resume-entry-top">
                  <span className="resume-entry-title">{edu.degree}</span>
                  <span className="resume-entry-date">{edu.period}</span>
                </div>
                <div className="resume-entry-sub">{edu.institution} — <span className="text-signal">{edu.score}</span></div>
              </div>
            ))}
          </section>

          {/* Technical Skills */}
          <section className="resume-section">
            <h2 className="resume-sec-title">TECHNICAL SKILLS</h2>
            <div className="resume-skills-matrix">
              <div><strong>Languages:</strong> Java (Core, OOP, Collections), Python, JavaScript (ES6+), TypeScript, SQL</div>
              <div><strong>Web & Frameworks:</strong> React, HTML5, CSS3, TailwindCSS, REST APIs, FileReader API</div>
              <div><strong>AI & Data Science:</strong> Google Gemini API (Multimodal Vision), Agentic AI, Machine Learning Basics, Power BI</div>
              <div><strong>Databases & Tools:</strong> MySQL, MongoDB, Git, GitHub, VS Code, Eclipse IDE, jsPDF</div>
            </div>
          </section>

          {/* Industry Experience */}
          <section className="resume-section">
            <h2 className="resume-sec-title">INDUSTRY EXPERIENCE</h2>
            {experienceData.map((exp) => (
              <div key={exp.id} className="resume-entry">
                <div className="resume-entry-top">
                  <span className="resume-entry-title">{exp.role} — {exp.company}</span>
                  <span className="resume-entry-date">{exp.period}</span>
                </div>
                <div className="resume-entry-sub">{exp.description}</div>
                <ul className="resume-bullets">
                  {exp.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          {/* Flagship Projects */}
          <section className="resume-section">
            <h2 className="resume-sec-title">KEY ENGINEERING PROJECTS</h2>
            
            <div className="resume-entry">
              <div className="resume-entry-top">
                <span className="resume-entry-title">TruthLens AI — Deepfake & Synthetic Media Forensics</span>
                <span className="resume-entry-date">Live: fake-detector-tan.vercel.app</span>
              </div>
              <div className="resume-entry-sub">Tech Stack: React, TypeScript, Google Gemini API, TailwindCSS, FileReader API, jsPDF</div>
              <ul className="resume-bullets">
                <li>Engineered a client-side media forensics tool that inspects uploaded reels, images, and news headlines for AI-generated artifacts.</li>
                <li>Designed an in-memory browser staging pipeline using FileReader API, achieving $0/mo server costs and zero data transit of private user photos.</li>
                <li>Structured multimodal forensic prompt schemas returning facial symmetry analysis, lighting inconsistencies, and confidence verdicts.</li>
                <li>Authored a comprehensive 49-page academic engineering report detailing forensics methodology and verification test cases.</li>
              </ul>
            </div>
          </section>

          {/* Verified Certifications */}
          <section className="resume-section">
            <h2 className="resume-sec-title">VERIFIED CERTIFICATIONS</h2>
            <ul className="resume-bullets">
              <li><strong>Oracle:</strong> Oracle Certified Foundations Associate — Agentic AI (Credential: 330659595AAI26OFA, Valid: 2025–2028)</li>
              <li><strong>Scaler Academy:</strong> Data Structures & Algorithms Problem Solving in Java</li>
              <li><strong>Scaler Academy:</strong> Java Course Fundamentals</li>
              <li><strong>TCS iON:</strong> Career Edge — Young Professional & Professional Soft Skills</li>
              <li><strong>MongoDB:</strong> MongoDB Basics for Students</li>
            </ul>
          </section>
        </article>
      </div>
    </div>
  );
};
