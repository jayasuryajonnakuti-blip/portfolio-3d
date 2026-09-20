import React, { useState, useEffect } from 'react';
import { ArrowDown, Sparkles } from 'lucide-react';

interface PrologueProps {
  onEnterWorld: () => void;
}

export const Prologue: React.FC<PrologueProps> = ({ onEnterWorld }) => {
  const [phase, setPhase] = useState<number>(0);

  useEffect(() => {
    // Stage 1: Ambient particles & distant red light emerge (0.5s)
    const t1 = setTimeout(() => setPhase(1), 400);
    // Stage 2: Large title begins forming in 3D space (1.2s)
    const t2 = setTimeout(() => setPhase(2), 1100);
    // Stage 3: Subtitle and specialization appear (2.0s)
    const t3 = setTimeout(() => setPhase(3), 1900);
    // Stage 4: Enter interaction activates (2.6s)
    const t4 = setTimeout(() => setPhase(4), 2500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  return (
    <div className={`prologue-overlay ${phase >= 4 ? 'prologue-ready' : ''}`}>
      {/* Distant Red Ambient Glow */}
      <div className={`prologue-distant-glow ${phase >= 1 ? 'active' : ''}`} />

      <div className="prologue-center-content">
        {/* Step Indicator */}
        <div className={`prologue-tag ${phase >= 1 ? 'visible' : ''}`}>
          <Sparkles size={13} color="#FF1A1A" />
          <span>INITIALIZING 3D WORLD // JONNAKUTI JAYA SURYA</span>
        </div>

        {/* Spatial Typography Forming from Darkness */}
        <div className={`prologue-headline-wrap ${phase >= 2 ? 'visible' : ''}`}>
          <h1 className="prologue-title">
            <span className="prologue-first-name">JONNAKUTI</span>
            <br />
            <span className="prologue-last-name text-gradient-red">JAYA SURYA</span>
          </h1>
        </div>

        {/* Subtitle */}
        <div className={`prologue-sub-wrap ${phase >= 3 ? 'visible' : ''}`}>
          <div className="prologue-role">
            AI & DATA SCIENCE • FULL STACK DEVELOPER
          </div>
          <p className="prologue-desc">
            Dhanalakshmi Srinivasan University · Creator of TruthLens AI
          </p>
        </div>

        {/* Enter / Explore Interaction */}
        <div className={`prologue-enter-wrap ${phase >= 4 ? 'visible' : ''}`}>
          <button
            type="button"
            className="prologue-enter-btn btn btn-primary"
            onClick={onEnterWorld}
          >
            <span>ENTER CINEMATIC JOURNEY</span>
            <ArrowDown size={16} />
          </button>
          <div className="prologue-scroll-cue">
            <span>OR SCROLL TO TRAVEL</span>
          </div>
        </div>
      </div>
    </div>
  );
};
