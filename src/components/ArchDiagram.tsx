import React, { useState } from 'react';
import { ArchitectureNode } from '../content/work/truthlens';
import { Upload, HardDrive, Cpu, ShieldAlert, FileCheck } from 'lucide-react';

interface ArchDiagramProps {
  nodes: ArchitectureNode[];
  activeNodeId?: string;
  onSelectNode?: (id: string) => void;
}

export const ArchDiagram: React.FC<ArchDiagramProps> = ({
  nodes,
  activeNodeId,
  onSelectNode,
}) => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const getNodeIcon = (step: string) => {
    switch (step) {
      case '01':
        return <Upload size={18} />;
      case '02':
        return <HardDrive size={18} />;
      case '03':
        return <Cpu size={18} />;
      case '04':
        return <ShieldAlert size={18} />;
      case '05':
      default:
        return <FileCheck size={18} />;
    }
  };

  return (
    <div className="arch-diagram-wrapper" aria-label="TruthLens System Architecture Diagram">
      <div className="arch-diagram-header">
        <div className="arch-header-tag">
          <span className="telemetry-dot" />
          <span>SYSTEM TOPOLOGY // TRUTHLENS PIPELINE</span>
        </div>
        <div className="arch-header-note">Click any pipeline node to inspect engineering details</div>
      </div>

      {/* Interactive System Flow Grid */}
      <div className="arch-nodes-flow">
        {nodes.map((node, index) => {
          const isActive = activeNodeId === node.id || hoveredNode === node.id;
          return (
            <React.Fragment key={node.id}>
              {/* Pipeline Node Card */}
              <div
                className={`arch-node-box ${isActive ? 'is-active' : ''}`}
                onClick={() => onSelectNode?.(node.id)}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                tabIndex={0}
                role="button"
                aria-pressed={isActive}
              >
                <div className="node-step-tag">
                  <span>STEP {node.step}</span>
                  <span className="node-tech-badge">{node.tech}</span>
                </div>

                <div className="node-title-row">
                  <div className="node-icon-avatar">{getNodeIcon(node.step)}</div>
                  <div>
                    <h4 className="node-label">{node.label}</h4>
                    <div className="node-sublabel">{node.sublabel}</div>
                  </div>
                </div>

                <p className="node-desc">{node.description}</p>

                <div className="node-active-bar" />
              </div>

              {/* Connecting Vector Line (if not the last step) */}
              {index < nodes.length - 1 && (
                <div className="arch-connector" aria-hidden="true">
                  <div className="connector-line">
                    <span className="connector-pulse" />
                  </div>
                  <span className="connector-arrow">▶</span>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Architecture Spec Bar */}
      <div className="arch-spec-footer">
        <div className="spec-item">
          <span className="spec-label">INGESTION PROTOCOL</span>
          <span className="spec-val">IN-MEMORY ARRAYBUFFER</span>
        </div>
        <div className="spec-item">
          <span className="spec-label">MODEL INFERENCE</span>
          <span className="spec-val text-signal">GEMINI MULTIMODAL API</span>
        </div>
        <div className="spec-item">
          <span className="spec-label">SESSION PERSISTENCE</span>
          <span className="spec-val">ENCRYPTED LOCALSTORAGE</span>
        </div>
        <div className="spec-item">
          <span className="spec-label">INFRASTRUCTURE COST</span>
          <span className="spec-val text-signal">$0.00 / MONTH</span>
        </div>
      </div>
    </div>
  );
};
