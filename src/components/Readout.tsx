import React from 'react';

interface ReadoutProps {
  label: string;
  value: string;
  subtext?: string;
  highlight?: boolean;
}

export const Readout: React.FC<ReadoutProps> = ({
  label,
  value,
  subtext,
  highlight = false,
}) => {
  return (
    <div className={`telemetry-readout-block ${highlight ? 'is-highlighted' : ''}`}>
      <div className="readout-label-row">
        <span className="readout-indicator" />
        <span className="readout-label">{label}</span>
      </div>
      <div className={`readout-value ${highlight ? 'text-signal' : ''}`}>{value}</div>
      {subtext && <div className="readout-subtext">{subtext}</div>}
    </div>
  );
};
