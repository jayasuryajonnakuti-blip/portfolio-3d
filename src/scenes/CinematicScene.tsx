import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// 11-Stage Camera Choreography
const STAGE_CAMERA: Record<string, { pos: THREE.Vector3; target: THREE.Vector3 }> = {
  prologue:     { pos: new THREE.Vector3(0, 0, 6.4),         target: new THREE.Vector3(0, 0, 0) },
  home:         { pos: new THREE.Vector3(0, 0, 5.0),         target: new THREE.Vector3(0, 0, 0) },
  about:        { pos: new THREE.Vector3(-1.8, 0.4, 4.6),    target: new THREE.Vector3(-0.4, 0, 0) },
  skills:       { pos: new THREE.Vector3(1.8, -0.4, 4.3),    target: new THREE.Vector3(0.4, 0, 0) },
  experience:   { pos: new THREE.Vector3(0, -1.0, 5.2),      target: new THREE.Vector3(0, -0.4, 0) },
  projects:     { pos: new THREE.Vector3(1.9, 0.6, 4.8),     target: new THREE.Vector3(0.5, 0, 0) },
  truthlens:    { pos: new THREE.Vector3(0, 0, 3.8),         target: new THREE.Vector3(0, 0, 0) },
  certificates: { pos: new THREE.Vector3(-1.9, -0.5, 4.5),   target: new THREE.Vector3(-0.5, 0, 0) },
  documents:    { pos: new THREE.Vector3(1.5, 0.4, 4.7),     target: new THREE.Vector3(0.3, 0, 0) },
  contact:      { pos: new THREE.Vector3(0, 0, 4.4),         target: new THREE.Vector3(0, 0, 0) },
  finale:       { pos: new THREE.Vector3(0, 2.0, 9.6),       target: new THREE.Vector3(0, 0, 0) },
};

interface CinematicSceneProps {
  scrollProgress: number;
  activeSection: string;
}

export const CinematicScene: React.FC<CinematicSceneProps> = ({
  scrollProgress,
  activeSection,
}) => {
  const { camera } = useThree();

  // Mesh & Particle Refs
  const embersRef = useRef<THREE.Points>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const innerGlowRef = useRef<THREE.Mesh>(null);
  const outerRingRef = useRef<THREE.Group>(null);
  const radarRingRef = useRef<THREE.Mesh>(null);
  const radarScanRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);
  const techSatellitesRef = useRef<THREE.Group>(null);

  // Mouse Parallax tracking with smooth damping
  const mouse = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  // Camera Target
  const camTarget = useRef({
    pos: new THREE.Vector3(0, 0, 5.0),
    lookAt: new THREE.Vector3(0, 0, 0),
  });

  useEffect(() => {
    const stage = STAGE_CAMERA[activeSection] ?? STAGE_CAMERA.home;
    camTarget.current.pos.copy(stage.pos);
    camTarget.current.lookAt.copy(stage.target);
  }, [activeSection]);

  // 900 Red Embers & Ambient Dust Particles
  const particleCount = 900;
  const [positions, colors, velocities] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const cols = new Float32Array(particleCount * 3);
    const vels = new Float32Array(particleCount * 3);

    const cBright = new THREE.Color('#FF1A1A');
    const cCrimson = new THREE.Color('#B00000');
    const cDark = new THREE.Color('#200505');

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const theta = Math.random() * Math.PI * 2;
      const radius = 2.0 + Math.random() * 9.0;
      pos[i3] = Math.cos(theta) * radius;
      pos[i3 + 1] = (Math.random() - 0.5) * 18;
      pos[i3 + 2] = (Math.random() - 0.5) * 14;

      vels[i3] = (Math.random() - 0.5) * 0.006;
      vels[i3 + 1] = 0.007 + Math.random() * 0.015;
      vels[i3 + 2] = (Math.random() - 0.5) * 0.006;

      const isGlowing = Math.random() > 0.45;
      const col = isGlowing
        ? cBright.clone().lerp(cCrimson, Math.random())
        : cCrimson.clone().lerp(cDark, Math.random());

      cols[i3] = col.r;
      cols[i3 + 1] = col.g;
      cols[i3 + 2] = col.b;
    }

    return [pos, cols, vels];
  }, []);

  const emberGeoRef = useRef<THREE.BufferGeometry>(null);

  // Per-Frame Animation Loop
  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const lerpFactor = 1 - Math.pow(0.012, delta);

    // ── 1. Camera Inertial Interpolation + Parallax ──
    const targetWithParallax = camTarget.current.pos.clone();
    targetWithParallax.x += mouse.current.x * 0.38;
    targetWithParallax.y += mouse.current.y * 0.28;

    camera.position.lerp(targetWithParallax, lerpFactor * 0.6);

    const lookAtWithParallax = camTarget.current.lookAt.clone();
    lookAtWithParallax.x += mouse.current.x * 0.16;
    lookAtWithParallax.y += mouse.current.y * 0.12;
    camera.lookAt(lookAtWithParallax);

    // ── 2. Red Point Light follows mouse cursor ──
    if (lightRef.current) {
      lightRef.current.position.x = mouse.current.x * 4.5;
      lightRef.current.position.y = mouse.current.y * 3.5;
    }

    // ── 3. Rising Ember Physics ──
    if (emberGeoRef.current) {
      const posAttr = emberGeoRef.current.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        posAttr.setY(i, posAttr.getY(i) + velocities[i3 + 1]);
        posAttr.setX(i, posAttr.getX(i) + Math.sin(t * 0.9 + i) * 0.0035);

        if (posAttr.getY(i) > 9) {
          posAttr.setY(i, -9);
        }
      }
      posAttr.needsUpdate = true;
    }

    if (embersRef.current) {
      embersRef.current.rotation.y += delta * 0.022;
      // In finale, embers gently drift away
      if (activeSection === 'finale') {
        embersRef.current.rotation.y += delta * 0.04;
      }
    }

    // ── 4. Central Neural Polyhedron ──
    if (coreRef.current) {
      coreRef.current.rotation.x += delta * 0.16;
      coreRef.current.rotation.y += delta * 0.24;
      coreRef.current.position.y = Math.sin(t * 0.7) * 0.22 - scrollProgress * 1.6;
    }

    if (innerGlowRef.current) {
      const scale = 1 + Math.sin(t * 2.2) * 0.1;
      innerGlowRef.current.scale.set(scale, scale, scale);
    }

    // ── 5. Orbital Laser Rings ──
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z += delta * 0.14;
      outerRingRef.current.rotation.x += delta * 0.09;
      outerRingRef.current.position.y = Math.sin(t * 0.55) * 0.2 - scrollProgress * 1.6;
    }

    // ── 6. Skills Technology Core Satellites ──
    if (techSatellitesRef.current) {
      techSatellitesRef.current.rotation.y += delta * 0.3;
      techSatellitesRef.current.rotation.x = Math.sin(t * 0.4) * 0.15;
      const isSkills = activeSection === 'skills';
      const targetScale = isSkills ? 1.2 : 0.4;
      techSatellitesRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), lerpFactor);
    }

    // ── 7. TruthLens AI 3D Reticle in Forensics Section ──
    if (radarRingRef.current) {
      radarRingRef.current.rotation.z += delta * 0.7;
      const isTruthLens = activeSection === 'truthlens';
      const targetOpacity = isTruthLens ? 0.75 : 0.0;
      const mat = radarRingRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = THREE.MathUtils.lerp(mat.opacity, targetOpacity, lerpFactor);
    }

    if (radarScanRef.current) {
      radarScanRef.current.rotation.z -= delta * 1.2;
      const isTruthLens = activeSection === 'truthlens';
      const targetOpacity = isTruthLens ? 0.45 : 0.0;
      const mat = radarScanRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = THREE.MathUtils.lerp(mat.opacity, targetOpacity, lerpFactor);
    }
  });

  return (
    <group>
      {/* Cinematic Deep Black Fog */}
      <fog attach="fog" args={['#030303', 3, 25]} />

      {/* Atmospheric Cinematic Lighting */}
      <ambientLight intensity={0.18} />
      <directionalLight position={[9, 12, 6]} intensity={1.3} color="#FF1A1A" />
      <directionalLight position={[-9, -10, -6]} intensity={0.65} color="#7A0000" />
      <pointLight ref={lightRef} position={[0, 0, 3]} intensity={2.0} color="#FF1A1A" distance={14} />

      {/* ── 900 Cinematic Red Embers & Dust Field ── */}
      <points ref={embersRef}>
        <bufferGeometry ref={emberGeoRef}>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.038}
          vertexColors
          transparent
          opacity={0.8}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* ── Central Neural Polyhedron & Core ── */}
      <group position={[2.4, 0, -1]}>
        {/* Outer Wireframe */}
        <mesh ref={coreRef}>
          <icosahedronGeometry args={[1.35, 1]} />
          <meshStandardMaterial
            color="#FF1A1A"
            wireframe
            transparent
            opacity={0.3}
            roughness={0.1}
            metalness={0.9}
          />
        </mesh>

        {/* Inner Pulsing Core */}
        <mesh ref={innerGlowRef}>
          <sphereGeometry args={[0.55, 16, 16]} />
          <meshBasicMaterial
            color="#E50914"
            transparent
            opacity={0.25}
          />
        </mesh>

        {/* Orbital Laser Rings */}
        <group ref={outerRingRef}>
          <mesh>
            <torusGeometry args={[1.8, 0.015, 16, 80]} />
            <meshBasicMaterial color="#FF1A1A" transparent opacity={0.4} />
          </mesh>
          <mesh rotation={[Math.PI / 3, 0, 0]}>
            <torusGeometry args={[2.0, 0.012, 16, 80]} />
            <meshBasicMaterial color="#B00000" transparent opacity={0.3} />
          </mesh>
        </group>

        {/* Skills Satellites (Floating Tech Nodes) */}
        <group ref={techSatellitesRef}>
          <mesh position={[1.8, 0.6, 0]}>
            <octahedronGeometry args={[0.22, 0]} />
            <meshStandardMaterial color="#FF3333" wireframe />
          </mesh>
          <mesh position={[-1.8, -0.6, 0]}>
            <octahedronGeometry args={[0.22, 0]} />
            <meshStandardMaterial color="#E50914" wireframe />
          </mesh>
          <mesh position={[0, 1.8, 0.5]}>
            <dodecahedronGeometry args={[0.2, 0]} />
            <meshStandardMaterial color="#B00000" wireframe />
          </mesh>
          <mesh position={[0, -1.8, -0.5]}>
            <dodecahedronGeometry args={[0.2, 0]} />
            <meshStandardMaterial color="#FF1A1A" wireframe />
          </mesh>
        </group>

        {/* TruthLens Holographic Reticle Ring */}
        <mesh ref={radarRingRef} rotation={[0, 0, 0]}>
          <ringGeometry args={[2.2, 2.26, 64]} />
          <meshBasicMaterial
            color="#FF1A1A"
            transparent
            opacity={0}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* TruthLens Scanning Radar Cross */}
        <mesh ref={radarScanRef} rotation={[0, 0, 0]}>
          <ringGeometry args={[1.4, 1.44, 48]} />
          <meshBasicMaterial
            color="#FF3333"
            transparent
            opacity={0}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
    </group>
  );
};
