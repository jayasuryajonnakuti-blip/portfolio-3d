import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { CinematicScene } from './CinematicScene';

interface CanvasContainerProps {
  scrollProgress: number;
  activeSection: string;
}

export const CanvasContainer: React.FC<CanvasContainerProps> = ({
  scrollProgress,
  activeSection,
}) => {
  return (
    <div className="canvas-bg-wrapper" aria-hidden="true">
      <Canvas
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
      >
        {/* Camera is now controlled by lerp inside CinematicScene via useThree */}
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]}  intensity={0.9} />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#8b5cf6" />
        <pointLight position={[0, 3, 3]} intensity={0.6} color="#38bdf8" />
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
