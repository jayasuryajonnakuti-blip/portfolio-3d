import React from 'react';
import { ExternalLink, FileText, Award, Sparkles } from 'lucide-react';
import { GithubIcon } from './Icons';
import { getAssetUrl } from '../utils';

export const ProofBar: React.FC = () => {
  return (
    <aside className="proof-bar" aria-label="Verified Engineering Proof Artifacts">
      <div className="proof-bar-inner">
        <div className="proof-bar-lead">
          <span className="proof-bar-indicator" />
          <span className="proof-bar-title">VERIFIED RECEIPTS:</span>
        </div>

        <div className="proof-bar-links">
          {/* Live Application */}
          <a
            href="https://fake-detector-tan.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="proof-item proof-item-highlight"
            title="TruthLens AI Live Production Deployment"
          >
            <Sparkles size={13} className="proof-icon" />
            <span className="proof-text">Live: TruthLens AI</span>
            <ExternalLink size={11} className="proof-arrow" />
          </a>

          {/* 49-Page Project Report */}
          <a
            href={getAssetUrl('assets/documents/TruthLens-AI-Full-Project-Report.pdf')}
            target="_blank"
            rel="noopener noreferrer"
            className="proof-item"
            title="Comprehensive 49-Page AI Forensics Engineering Report"
          >
            <FileText size={13} className="proof-icon" />
            <span className="proof-text">49-Page Project Report</span>
            <ExternalLink size={11} className="proof-arrow" />
          </a>

          {/* Official Resume */}
          <a
            href={getAssetUrl('assets/Surya_Reddy_Resume.pdf')}
            target="_blank"
            rel="noopener noreferrer"
            className="proof-item"
            title="Official Verified Resume (PDF)"
          >
            <FileText size={13} className="proof-icon" />
            <span className="proof-text">Official Resume</span>
            <ExternalLink size={11} className="proof-arrow" />
          </a>

          {/* Oracle Certification */}
          <a
            href={getAssetUrl('assets/certificates/Oracle-Agentic-AI-Certified-Foundations-Associate.pdf')}
            target="_blank"
            rel="noopener noreferrer"
            className="proof-item"
            title="Oracle Certified Foundations Associate: Agentic AI"
          >
            <Award size={13} className="proof-icon" />
            <span className="proof-text">Oracle AI Certified</span>
            <ExternalLink size={11} className="proof-arrow" />
          </a>

          {/* GitHub Source */}
          <a
            href="https://github.com/jayasuryajonnakuti-blip"
            target="_blank"
            rel="noopener noreferrer"
            className="proof-item"
            title="GitHub Repositories & Engineering Code"
          >
            <GithubIcon size={13} />
            <span className="proof-text">GitHub</span>
            <ExternalLink size={11} className="proof-arrow" />
          </a>
        </div>
      </div>
    </aside>
  );
};
