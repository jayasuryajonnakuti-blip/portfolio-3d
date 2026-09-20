import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { CinematicScene } from './CinematicScene';

interface CanvasContainerProps {
  scrollProgress: number;
}

export const CanvasContainer: React.FC<CanvasContainerProps> = ({ scrollProgress }) => {
  return (
    <div className="canvas-bg-wrapper" aria-hidden="true">
      <Canvas
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 2]}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={0.8} />
        <directionalLight position={[-10, -10, -5]} intensity={0.4} color="#8b5cf6" />
        <Suspense fallback={null}>
          <CinematicScene scrollProgress={scrollProgress} />
        </Suspense>
      </Canvas>
    </div>
  );
};
