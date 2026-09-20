import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CinematicSceneProps {
  scrollProgress: number;
}

export const CinematicScene: React.FC<CinematicSceneProps> = ({ scrollProgress }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const meshRef = useRef<THREE.Mesh>(null);

  // Generate ambient particle field
  const [positions, colors] = useMemo(() => {
    const count = 400;
    const pos = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);
    const colorCyan = new THREE.Color('#38bdf8');
    const colorViolet = new THREE.Color('#8b5cf6');

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      pos[i3] = (Math.random() - 0.5) * 14;
      pos[i3 + 1] = (Math.random() - 0.5) * 14;
      pos[i3 + 2] = (Math.random() - 0.5) * 10;

      const mixedColor = colorCyan.clone().lerp(colorViolet, Math.random());
      cols[i3] = mixedColor.r;
      cols[i3 + 1] = mixedColor.g;
      cols[i3 + 2] = mixedColor.b;
    }
    return [pos, cols];
  }, []);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.04;
      pointsRef.current.rotation.x = scrollProgress * Math.PI * 0.5;
    }
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.2 - (scrollProgress * 2);
    }
  });

  return (
    <group>
      {/* Background ambient starfield/particles */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.035}
          vertexColors
          transparent
          opacity={0.65}
          sizeAttenuation
        />
      </points>

      {/* Subtle floating icosahedron wireframe indicator */}
      <mesh ref={meshRef} position={[2.5, 0, -1]}>
        <icosahedronGeometry args={[1.2, 1]} />
        <meshStandardMaterial
          color="#38bdf8"
          wireframe
          transparent
          opacity={0.18}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </group>
  );
};
