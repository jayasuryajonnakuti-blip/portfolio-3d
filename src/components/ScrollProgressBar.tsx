import React from 'react';

interface ScrollProgressBarProps {
  progress: number; // 0–1
}

/**
 * Thin cinematic red scroll progress bar that sits at the very top of the
 * viewport (above the navbar). Shows how far the user has scrolled.
 */
export const ScrollProgressBar: React.FC<ScrollProgressBarProps> = ({ progress }) => {
  return (
    <div
      className="scroll-progress-bar"
      style={{ width: `${Math.min(progress * 100, 100)}%` }}
      aria-hidden="true"
    />
  );
};
