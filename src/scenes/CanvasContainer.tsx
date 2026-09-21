import React, { Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, useProgress } from '@react-three/drei';
import { CinematicScene } from './CinematicScene';

interface CanvasContainerProps {
  scrollProgress: number;
  activeSection: string;
  onLoadingProgress?: (progress: number) => void;
  onLoaded?: () => void;
}

const ProgressHandler: React.FC<{
  onLoadingProgress?: (progress: number) => void;
  onLoaded?: () => void;
}> = ({ onLoadingProgress, onLoaded }) => {
  const { progress, active } = useProgress();

  useEffect(() => {
    if (onLoadingProgress) {
      onLoadingProgress(progress);
    }
  }, [progress, onLoadingProgress]);

  useEffect(() => {
    // If there are no assets (active is false) or progress is 100, we are loaded
    if (!active || progress >= 100) {
      const timer = setTimeout(() => {
        if (onLoaded) onLoaded();
      }, 800); // Small buffer for the simulated bar to look good
      return () => clearTimeout(timer);
    }
  }, [progress, active, onLoaded]);

  return null;
};

export const CanvasContainer: React.FC<CanvasContainerProps> = ({
  scrollProgress,
  activeSection,
  onLoadingProgress,
  onLoaded,
}) => {
  return (
    <div className="canvas-bg-wrapper" aria-hidden="true">
      <Canvas
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
      >
        <ProgressHandler onLoadingProgress={onLoadingProgress} onLoaded={onLoaded} />
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
        <ambientLight intensity={0.45} />
        <directionalLight position={[10, 10, 5]}  intensity={0.85} color="#FFFFFF" />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#7A0000" />
        <pointLight position={[0, 3, 3]} intensity={0.8} color="#FF1A1A" />
        <Suspense fallback={null}>
          <CinematicScene
            scrollProgress={scrollProgress}
            activeSection={activeSection}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};
