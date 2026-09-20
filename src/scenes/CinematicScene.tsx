import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Section → accent color mapping
const SECTION_COLORS: Record<string, { primary: string; secondary: string }> = {
  home:         { primary: '#38bdf8', secondary: '#8b5cf6' },
  about:        { primary: '#a78bfa', secondary: '#38bdf8' },
  skills:       { primary: '#34d399', secondary: '#38bdf8' },
  experience:   { primary: '#f59e0b', secondary: '#ec4899' },
  projects:     { primary: '#ec4899', secondary: '#8b5cf6' },
  certificates: { primary: '#f97316', secondary: '#38bdf8' },
  documents:    { primary: '#38bdf8', secondary: '#34d399' },
  contact:      { primary: '#8b5cf6', secondary: '#ec4899' },
};

// Section → camera target mapping
const SECTION_CAMERA: Record<string, { pos: THREE.Vector3; target: THREE.Vector3 }> = {
  home:         { pos: new THREE.Vector3(0, 0, 5),        target: new THREE.Vector3(0, 0, 0) },
  about:        { pos: new THREE.Vector3(-1.5, 0.5, 4.5), target: new THREE.Vector3(-0.5, 0, 0) },
  skills:       { pos: new THREE.Vector3(1.8, -0.3, 4.2), target: new THREE.Vector3(0.5, 0, 0) },
  experience:   { pos: new THREE.Vector3(0, -1.2, 5.2),   target: new THREE.Vector3(0, -0.5, 0) },
  projects:     { pos: new THREE.Vector3(2.0, 0.8, 4.8),  target: new THREE.Vector3(0.8, 0, 0) },
  certificates: { pos: new THREE.Vector3(-1.8, -0.6, 4.5),target: new THREE.Vector3(-0.6, 0, 0) },
  documents:    { pos: new THREE.Vector3(0.5, 0.5, 4.5),  target: new THREE.Vector3(0, 0, 0) },
  contact:      { pos: new THREE.Vector3(0, 0, 4.0),      target: new THREE.Vector3(0, 0, 0) },
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

  // Refs for 3D objects
  const pointsRef = useRef<THREE.Points>(null);
  const icosaRef  = useRef<THREE.Mesh>(null);
  const torusRef  = useRef<THREE.Mesh>(null);
  const octaRef   = useRef<THREE.Mesh>(null);

  // Color lerp targets (mutable refs to avoid re-renders)
  const currentColor1 = useRef(new THREE.Color('#38bdf8'));
  const currentColor2 = useRef(new THREE.Color('#8b5cf6'));
  const targetColor1  = useRef(new THREE.Color('#38bdf8'));
  const targetColor2  = useRef(new THREE.Color('#8b5cf6'));

  // Camera smooth lerp targets
  const camTarget = useRef({
    pos:    new THREE.Vector3(0, 0, 5),
    lookAt: new THREE.Vector3(0, 0, 0),
  });

  // Update camera/color targets when section changes
  useEffect(() => {
    const sc = SECTION_CAMERA[activeSection] ?? SECTION_CAMERA.home;
    camTarget.current.pos.copy(sc.pos);
    camTarget.current.lookAt.copy(sc.target);

    const cols = SECTION_COLORS[activeSection] ?? SECTION_COLORS.home;
    targetColor1.current.set(cols.primary);
    targetColor2.current.set(cols.secondary);
  }, [activeSection]);

  // Particle field — 600 particles, colours updatable per frame
  const particleCount = 600;
  const [positions, colorsAttr] = useMemo(() => {
    const pos  = new Float32Array(particleCount * 3);
    const cols = new Float32Array(particleCount * 3);
    const c1   = new THREE.Color('#38bdf8');
    const c2   = new THREE.Color('#8b5cf6');
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      // Sphere-distribution for a more organic feel
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      const r     = 4 + Math.random() * 6;
      pos[i3]     = r * Math.sin(phi) * Math.cos(theta);
      pos[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i3 + 2] = (Math.random() - 0.5) * 10;
      const mix   = c1.clone().lerp(c2, Math.random());
      cols[i3]     = mix.r;
      cols[i3 + 1] = mix.g;
      cols[i3 + 2] = mix.b;
    }
    return [pos, cols];
  }, []);

  // Geometry ref for colour updates
  const geoRef = useRef<THREE.BufferGeometry>(null);

  // Per-frame animation
  useFrame((state, delta) => {
    const t    = state.clock.elapsedTime;
    const lerp = 1 - Math.pow(0.015, delta); // frame-rate independent lerp

    // ── Smooth camera transition ──────────────────────────────────────────────
    camera.position.lerp(camTarget.current.pos, lerp * 0.6);
    camera.lookAt(camTarget.current.lookAt);

    // ── Particle field ────────────────────────────────────────────────────────
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.03;
      pointsRef.current.rotation.x  = scrollProgress * Math.PI * 0.3;
    }

    // ── Colour lerp on particle geometry ─────────────────────────────────────
    currentColor1.current.lerp(targetColor1.current, lerp);
    currentColor2.current.lerp(targetColor2.current, lerp);

    if (geoRef.current) {
      const cols = geoRef.current.attributes.color as THREE.BufferAttribute;
      for (let i = 0; i < particleCount; i++) {
        const t01  = i / particleCount;
        const mix  = currentColor1.current.clone().lerp(currentColor2.current, t01);
        cols.setXYZ(i, mix.r, mix.g, mix.b);
      }
      cols.needsUpdate = true;
    }

    // ── Floating icosahedron (hero geo) ───────────────────────────────────────
    if (icosaRef.current) {
      icosaRef.current.rotation.x += delta * 0.18;
      icosaRef.current.rotation.y += delta * 0.28;
      icosaRef.current.position.y  = Math.sin(t * 0.7) * 0.22 - scrollProgress * 1.8;
      (icosaRef.current.material as THREE.MeshStandardMaterial).color.copy(currentColor1.current);
    }

    // ── Torus knot (skills / tech vibe) ──────────────────────────────────────
    if (torusRef.current) {
      torusRef.current.rotation.x += delta * 0.12;
      torusRef.current.rotation.z += delta * 0.08;
      torusRef.current.position.y  = Math.sin(t * 0.5 + 1.2) * 0.18;
      (torusRef.current.material as THREE.MeshStandardMaterial).color.copy(currentColor2.current);
      // Fade in/out based on active section
      const visible = ['skills', 'experience', 'projects'].includes(activeSection);
      (torusRef.current.material as THREE.MeshStandardMaterial).opacity =
        THREE.MathUtils.lerp(
          (torusRef.current.material as THREE.MeshStandardMaterial).opacity,
          visible ? 0.22 : 0.0,
          lerp
        );
    }

    // ── Octahedron (certificates / credentials) ───────────────────────────────
    if (octaRef.current) {
      octaRef.current.rotation.y += delta * 0.35;
      octaRef.current.rotation.x += delta * 0.15;
      octaRef.current.position.y  = Math.sin(t * 0.9 + 2.0) * 0.14;
      (octaRef.current.material as THREE.MeshStandardMaterial).color.copy(currentColor1.current);
      const visible = ['certificates', 'documents', 'contact'].includes(activeSection);
      (octaRef.current.material as THREE.MeshStandardMaterial).opacity =
        THREE.MathUtils.lerp(
          (octaRef.current.material as THREE.MeshStandardMaterial).opacity,
          visible ? 0.28 : 0.04,
          lerp
        );
    }
  });

  return (
    <group>
      {/* ── Background particle field ── */}
      <points ref={pointsRef}>
        <bufferGeometry ref={geoRef}>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color"    args={[colorsAttr, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.032}
          vertexColors
          transparent
          opacity={0.6}
          sizeAttenuation
          depthWrite={false}
        />
      </points>

      {/* ── Icosahedron — hero accent ── */}
      <mesh ref={icosaRef} position={[2.6, 0.2, -1]}>
        <icosahedronGeometry args={[1.3, 1]} />
        <meshStandardMaterial
          color="#38bdf8"
          wireframe
          transparent
          opacity={0.2}
          roughness={0.2}
          metalness={0.85}
        />
      </mesh>

      {/* ── Torus Knot — skills/tech accent ── */}
      <mesh ref={torusRef} position={[-2.8, 0.5, -1.5]}>
        <torusKnotGeometry args={[0.7, 0.22, 80, 14]} />
        <meshStandardMaterial
          color="#34d399"
          wireframe
          transparent
          opacity={0.0}
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>

      {/* ── Octahedron — credentials accent ── */}
      <mesh ref={octaRef} position={[2.0, -1.0, -0.8]}>
        <octahedronGeometry args={[1.0, 0]} />
        <meshStandardMaterial
          color="#f97316"
          wireframe
          transparent
          opacity={0.04}
          roughness={0.15}
          metalness={0.9}
        />
      </mesh>
    </group>
  );
};
