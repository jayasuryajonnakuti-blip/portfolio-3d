import React from 'react';
import { CaseStudyShell } from '../components/CaseStudyShell';
import { ArchDiagram } from '../components/ArchDiagram';
import { DecisionCard } from '../components/DecisionCard';
import { Readout } from '../components/Readout';
import { truthLensCaseStudy } from '../content/work/truthlens';
import { getAssetUrl } from '../utils';
import { ExternalLink, FileText, Sparkles, AlertTriangle } from 'lucide-react';
import { GithubIcon } from '../components/Icons';

export const TruthLensCaseStudyPage: React.FC = () => {
  return (
    <CaseStudyShell caseStudy={truthLensCaseStudy}>
      {/* ── 01. THE PROBLEM ── */}
      <section id="problem" className="case-section-block">
        <div className="section-step-lead">SECTION 01 // PROBLEM DEFINITION</div>
        <h2 className="case-section-title">The Synthetic Media Verification Crisis</h2>
        
        <div className="case-callout-box">
          <p className="case-statement-lead">
            {truthLensCaseStudy.problem.statement}
          </p>
        </div>

        <p className="case-body-paragraph">
          {truthLensCaseStudy.problem.context}
        </p>

        <div className="case-metrics-row">
          <Readout label="MEDIA PROCESSING DELAY" value="< 50 MS" subtext="Client-side FileReader staging" highlight />
          <Readout label="INFRASTRUCTURE SPEND" value="$0 / MO" subtext="Serverless client architecture" highlight />
          <Readout label="CAPSTONE DOCUMENTATION" value="49 PAGES" subtext="Peer-reviewed academic defense" />
        </div>
      </section>

      {/* ── 02. WHY EXISTING SOLUTIONS FAIL ── */}
      <section id="why-fail" className="case-section-block">
        <div className="section-step-lead">SECTION 02 // PRIOR ART LIMITATIONS</div>
        <h2 className="case-section-title">{truthLensCaseStudy.whyExistingFail.title}</h2>
        <p className="case-body-paragraph">
          Before writing code, I surveyed existing deepfake detection repositories and commercial platforms. The vast majority fail at user adoption due to three structural flaws:
        </p>

        <div className="prior-art-grid">
          {truthLensCaseStudy.whyExistingFail.points.map((pt, i) => (
            <div key={i} className="prior-art-card">
              <div className="prior-art-tag">
                <AlertTriangle size={14} color="#FF3B30" />
                <span>FLAW 0{i + 1}</span>
              </div>
              <h3 className="prior-art-heading">{pt.label}</h3>
              <p className="prior-art-desc">{pt.explanation}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 03. CONSTRAINTS ── */}
      <section id="constraints" className="case-section-block">
        <div className="section-step-lead">SECTION 03 // ENGINEERING BOUNDARIES</div>
        <h2 className="case-section-title">Real Constraints Under Which TruthLens Shipped</h2>
        <p className="case-body-paragraph">
          Great engineering is defined by making disciplined decisions within uncompromising constraints rather than throwing unlimited cloud compute at a problem:
        </p>

        <ul className="constraints-list">
          {truthLensCaseStudy.constraints.map((c, i) => (
            <li key={i} className="constraint-item">
              <span className="constraint-bullet">▸</span>
              <span>{c}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ── 04. THE ARCHITECTURE ── */}
      <section id="architecture" className="case-section-block">
        <div className="section-step-lead">SECTION 04 // SYSTEM ARCHITECTURE</div>
        <h2 className="case-section-title">End-to-End Multimodal Forensics Pipeline</h2>
        <p className="case-body-paragraph">
          {truthLensCaseStudy.architecture.summary}
        </p>

        {/* Signature Moment 2: Scroll-Driven Architecture Diagram */}
        <ArchDiagram nodes={truthLensCaseStudy.architecture.nodes} />

        <div className="node-deepdive-grid">
          {truthLensCaseStudy.architecture.nodes.map((node) => (
            <div key={node.id} className="node-detail-card">
              <div className="node-detail-header">
                <span className="node-detail-step">STEP {node.step}</span>
                <span className="node-detail-tech">{node.tech}</span>
              </div>
              <h4 className="node-detail-title">{node.label}</h4>
              <p className="node-detail-text">{node.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 05. KEY DECISIONS ── */}
      <section id="decisions" className="case-section-block">
        <div className="section-step-lead">SECTION 05 // TRADE-OFF ANALYSIS</div>
        <h2 className="case-section-title">Architectural Trade-Offs & Decisions</h2>
        <p className="case-body-paragraph">
          Every architecture is a series of deliberate compromises. Here is the rationale behind the primary forks in TruthLens AI:
        </p>

        <div className="decision-cards-stack">
          {truthLensCaseStudy.decisions.map((dec) => (
            <DecisionCard key={dec.id} decision={dec} defaultExpanded={true} />
          ))}
        </div>
      </section>

      {/* ── 06. LIVE PROOF & RECEIPTS ── */}
      <section id="proof" className="case-section-block">
        <div className="section-step-lead">SECTION 06 // VERIFIED RECEIPTS</div>
        <h2 className="case-section-title">Live Production Proof & Artifacts</h2>
        <p className="case-body-paragraph">
          Every claim in this case study is backed by verifiable production code, public deployments, and comprehensive documentation:
        </p>

        <div className="proof-action-banner">
          <div className="proof-banner-left">
            <h3 className="proof-banner-title">Test the Live TruthLens Application</h3>
            <p className="proof-banner-sub">
              Deployed on Vercel edge network with client-side FileReader staging and Gemini multimodal verification.
            </p>
          </div>
          <div className="proof-banner-btns">
            <a
              href={truthLensCaseStudy.proof.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-signal"
            >
              <Sparkles size={16} />
              <span>Launch fake-detector-tan.vercel.app</span>
              <ExternalLink size={14} />
            </a>
            <a
              href={getAssetUrl(truthLensCaseStudy.proof.reportPdf)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-panel"
            >
              <FileText size={16} />
              <span>View 49-Page Project Report (PDF)</span>
              <ExternalLink size={14} />
            </a>
            <a
              href={truthLensCaseStudy.proof.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-panel"
            >
              <GithubIcon size={16} />
              <span>Inspect GitHub Source Code</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </div>

        {/* UI Screenshots Gallery */}
        <div className="proof-gallery-grid">
          {truthLensCaseStudy.proof.screenshots.map((s, i) => (
            <figure key={i} className="proof-screenshot-card">
              <div className="screenshot-img-box">
                <img src={getAssetUrl(s.src)} alt={s.caption} className="screenshot-img" />
                <span className="screenshot-tag">{s.tag}</span>
              </div>
              <figcaption className="screenshot-caption">{s.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ── 07. OUTCOME & RETROSPECTIVE ── */}
      <section id="outcome" className="case-section-block">
        <div className="section-step-lead">SECTION 07 // RETROSPECTIVE & ROADMAP</div>
        <h2 className="case-section-title">Measurable Outcomes & What I'd Do Differently</h2>

        <div className="outcomes-grid">
          {truthLensCaseStudy.outcome.realMetrics.map((m, i) => (
            <div key={i} className="outcome-metric-card">
              <div className="outcome-val text-signal">{m.value}</div>
              <div className="outcome-label">{m.label}</div>
              <div className="outcome-note">{m.note}</div>
            </div>
          ))}
        </div>

        <div className="retrospective-panel">
          <h3 className="retrospective-title">Self-Critique & Retrospective</h3>
          <p className="retrospective-text">
            {truthLensCaseStudy.outcome.retrospective}
          </p>
        </div>

        <div className="roadmap-panel">
          <h4 className="roadmap-title">Future Production Roadmap</h4>
          <ul className="roadmap-list">
            {truthLensCaseStudy.outcome.roadmap.map((item, i) => (
              <li key={i} className="roadmap-item">
                <span className="roadmap-bullet">➔</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </CaseStudyShell>
  );
};
