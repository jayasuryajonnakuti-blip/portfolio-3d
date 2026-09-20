import React from 'react';
import { InstrumentHero } from '../components/InstrumentHero';
import { ProofBar } from '../components/ProofBar';
import { SkillGraph } from '../components/SkillGraph';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, ExternalLink } from 'lucide-react';
import { getAssetUrl } from '../utils';
import { projectsData } from '../data';

export const HomePage: React.FC = () => {
  const flagship = projectsData.find((p) => p.featured) ?? projectsData[0];

  return (
    <div className="home-page-flow">
      {/* 1. Working Forensic Instrument Hero */}
      <section id="hero">
        <InstrumentHero />
      </section>

      {/* 2. Sticky Verified Proof Bar */}
      <ProofBar />

      {/* 3. Flagship Teaser: TruthLens AI */}
      <section id="flagship-teaser" className="container" style={{ padding: '80px 24px' }}>
        <div className="flagship-teaser-card spotlight-card">
          <div className="flagship-teaser-grid">
            <div className="teaser-content-col">
              <div className="section-tag">
                <Sparkles size={14} />
                <span>FLAGSHIP CASE STUDY</span>
              </div>
              <h2 className="teaser-title">{flagship.title}</h2>
              <div className="teaser-subtitle">{flagship.tag}</div>
              <p className="teaser-desc">
                An explainable digital media forensics system engineered with Google Gemini multimodal vision, client-side FileReader staging, and automated PDF evidence reporting. Operates under a strict $0/month infrastructure budget.
              </p>

              <div className="teaser-metrics-strip">
                <div className="teaser-metric">
                  <span className="teaser-metric-v text-signal">$0 / MO</span>
                  <span className="teaser-metric-k">INFRA COST</span>
                </div>
                <div className="teaser-metric">
                  <span className="teaser-metric-v text-signal">&lt; 50 MS</span>
                  <span className="teaser-metric-k">INGEST SPEED</span>
                </div>
                <div className="teaser-metric">
                  <span className="teaser-metric-v text-signal">49 PAGES</span>
                  <span className="teaser-metric-k">REPORT DEFENSE</span>
                </div>
              </div>

              <div className="teaser-btn-group">
                <Link to="/work/truthlens" className="btn btn-signal">
                  <span>Read 7-Section Architecture Deep Dive</span>
                  <ArrowRight size={16} />
                </Link>
                <a
                  href={flagship.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-panel"
                >
                  <span>Launch Live System</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>

            <div className="teaser-visual-col">
              <div className="teaser-img-frame">
                <img
                  src={getAssetUrl('assets/projects/TruthLens-analysis-dashboard.jpg')}
                  alt="TruthLens Forensic Dashboard"
                  className="teaser-preview-img"
                />
                <div className="teaser-frame-reticle" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Traceable Skill Graph */}
      <section id="skills" className="container" style={{ padding: '60px 24px 100px 24px' }}>
        <SkillGraph />
      </section>
    </div>
  );
};
