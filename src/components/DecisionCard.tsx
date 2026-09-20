import React, { useState } from 'react';
import { DecisionItem } from '../content/work/truthlens';
import { ChevronDown, ChevronUp, Check, X, AlertOctagon, Trophy } from 'lucide-react';

interface DecisionCardProps {
  decision: DecisionItem;
  defaultExpanded?: boolean;
}

export const DecisionCard: React.FC<DecisionCardProps> = ({
  decision,
  defaultExpanded = true,
}) => {
  const [expanded, setExpanded] = useState<boolean>(defaultExpanded);

  return (
    <div className={`decision-card ${expanded ? 'is-expanded' : 'is-collapsed'}`}>
      <button
        type="button"
        className="decision-card-header"
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
      >
        <div className="decision-header-lead">
          <span className="decision-badge">ARCHITECTURAL DECISION</span>
          <h3 className="decision-title">{decision.title}</h3>
        </div>
        <div className="decision-toggle-icon">
          {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
      </button>

      {expanded && (
        <div className="decision-body-grid">
          {/* Chosen Solution */}
          <div className="decision-col decision-choice">
            <div className="col-header">
              <div className="col-icon-box choice-icon">
                <Check size={14} />
              </div>
              <span className="col-tag">CHOSEN ARCHITECTURE</span>
            </div>
            <p className="col-text">{decision.choice}</p>
          </div>

          {/* Rejected Alternative */}
          <div className="decision-col decision-rejected">
            <div className="col-header">
              <div className="col-icon-box rejected-icon">
                <X size={14} />
              </div>
              <span className="col-tag">REJECTED ALTERNATIVE</span>
            </div>
            <p className="col-text">{decision.rejected}</p>
          </div>

          {/* Cost / Trade-off */}
          <div className="decision-col decision-cost">
            <div className="col-header">
              <div className="col-icon-box cost-icon">
                <AlertOctagon size={14} />
              </div>
              <span className="col-tag">COST & TRADE-OFF</span>
            </div>
            <p className="col-text">{decision.cost}</p>
          </div>

          {/* Engineering Win */}
          <div className="decision-col decision-win">
            <div className="col-header">
              <div className="col-icon-box win-icon">
                <Trophy size={14} />
              </div>
              <span className="col-tag">ENGINEERING WIN</span>
            </div>
            <p className="col-text text-signal">{decision.win}</p>
          </div>
        </div>
      )}
    </div>
  );
};
