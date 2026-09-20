import React from 'react';
import { ArrowUp } from 'lucide-react';

export const FinalShot: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="finale" className="final-shot-section">
      <div className="container final-shot-container">
        {/* Distant Red Horizon Light */}
        <div className="final-shot-horizon" />

        <div className="final-shot-content">
          <div className="section-tag" style={{ marginInline: 'auto', marginBottom: '20px' }}>
            FINAL FRAME // THE JOURNEY
          </div>

          <h2 className="final-shot-name">
            JONNAKUTI
            <br />
            <span className="text-gradient-red">JAYA SURYA</span>
          </h2>

          <div className="final-shot-title">
            AI & DATA SCIENCE • FULL STACK DEVELOPER
          </div>

          <p className="final-shot-motto">
            "Engineering dependable software through algorithmic rigor, clean architecture, and modern artificial intelligence."
          </p>

          <div style={{ marginTop: '36px' }}>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={scrollToTop}
              style={{ marginInline: 'auto' }}
            >
              <ArrowUp size={16} />
              <span>RETURN TO PROLOGUE</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
