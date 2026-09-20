import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// 10-Stage Camera Choreography
const STAGE_CAMERA: Record<string, { pos: THREE.Vector3; target: THREE.Vector3 }> = {
  home:         { pos: new THREE.Vector3(0, 0, 5.2),         target: new THREE.Vector3(0, 0, 0) },
  about:        { pos: new THREE.Vector3(-1.8, 0.4, 4.8),    target: new THREE.Vector3(-0.4, 0, 0) },
  skills:       { pos: new THREE.Vector3(1.8, -0.4, 4.4),    target: new THREE.Vector3(0.4, 0, 0) },
  experience:   { pos: new THREE.Vector3(0, -1.0, 5.4),      target: new THREE.Vector3(0, -0.4, 0) },
  projects:     { pos: new THREE.Vector3(1.9, 0.6, 4.9),     target: new THREE.Vector3(0.5, 0, 0) },
  truthlens:    { pos: new THREE.Vector3(0, 0, 3.9),         target: new THREE.Vector3(0, 0, 0) },
  certificates: { pos: new THREE.Vector3(-1.9, -0.5, 4.6),   target: new THREE.Vector3(-0.5, 0, 0) },
  documents:    { pos: new THREE.Vector3(1.5, 0.4, 4.8),     target: new THREE.Vector3(0.3, 0, 0) },
  contact:      { pos: new THREE.Vector3(0, 0, 4.4),         target: new THREE.Vector3(0, 0, 0) },
  finale:       { pos: new THREE.Vector3(0, 1.4, 7.8),       target: new THREE.Vector3(0, 0, 0) },
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
  const lightRef = useRef<THREE.PointLight>(null);

  // Mouse Parallax
  const mouse = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  // Smooth Camera Target
  const camTarget = useRef({
    pos: new THREE.Vector3(0, 0, 5.2),
    lookAt: new THREE.Vector3(0, 0, 0),
  });

  useEffect(() => {
    const stage = STAGE_CAMERA[activeSection] ?? STAGE_CAMERA.home;
    camTarget.current.pos.copy(stage.pos);
    camTarget.current.lookAt.copy(stage.target);
  }, [activeSection]);

  // 800 Cinematic Red Embers & Dust Particles
  const particleCount = 800;
  const [positions, colors, velocities] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const cols = new Float32Array(particleCount * 3);
    const vels = new Float32Array(particleCount * 3);

    const cBrightRed = new THREE.Color('#FF1A1A');
    const cCrimson = new THREE.Color('#B00000');
    const cCharcoal = new THREE.Color('#220505');

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      // Cylinder / spherical spatial spread
      const theta = Math.random() * Math.PI * 2;
      const radius = 2.5 + Math.random() * 8.5;
      pos[i3] = Math.cos(theta) * radius;
      pos[i3 + 1] = (Math.random() - 0.5) * 16;
      pos[i3 + 2] = (Math.random() - 0.5) * 12;

      // Vertical drift velocity
      vels[i3] = (Math.random() - 0.5) * 0.008;
      vels[i3 + 1] = 0.006 + Math.random() * 0.014;
      vels[i3 + 2] = (Math.random() - 0.5) * 0.008;

      // Color distribution: bright glowing red embers + subtle dark red dust
      const isEmber = Math.random() > 0.4;
      const mixed = isEmber
        ? cBrightRed.clone().lerp(cCrimson, Math.random())
        : cCrimson.clone().lerp(cCharcoal, Math.random());

      cols[i3] = mixed.r;
      cols[i3 + 1] = mixed.g;
      cols[i3 + 2] = mixed.b;
    }

    return [pos, cols, vels];
  }, []);

  const emberGeoRef = useRef<THREE.BufferGeometry>(null);

  // Per-Frame Animation Loop
  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const lerpFactor = 1 - Math.pow(0.015, delta);

    // ── 1. Inertial Camera Choreography + Mouse Parallax ──
    const targetWithParallax = camTarget.current.pos.clone();
    targetWithParallax.x += mouse.current.x * 0.35;
    targetWithParallax.y += mouse.current.y * 0.25;

    camera.position.lerp(targetWithParallax, lerpFactor * 0.55);

    const lookAtWithParallax = camTarget.current.lookAt.clone();
    lookAtWithParallax.x += mouse.current.x * 0.15;
    lookAtWithParallax.y += mouse.current.y * 0.1;
    camera.lookAt(lookAtWithParallax);

    // ── 2. Red Point Light follows mouse cursor subtly ──
    if (lightRef.current) {
      lightRef.current.position.x = mouse.current.x * 4;
      lightRef.current.position.y = mouse.current.y * 3;
    }

    // ── 3. Rising Ember Physics ──
    if (emberGeoRef.current) {
      const posAttr = emberGeoRef.current.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        posAttr.setY(i, posAttr.getY(i) + velocities[i3 + 1]);
        posAttr.setX(i, posAttr.getX(i) + Math.sin(t * 0.8 + i) * 0.003);

        // Wrap around ceiling
        if (posAttr.getY(i) > 8) {
          posAttr.setY(i, -8);
        }
      }
      posAttr.needsUpdate = true;
    }

    if (embersRef.current) {
      embersRef.current.rotation.y += delta * 0.02;
    }

    // ── 4. Central Neural Polyhedron (AI & Full Stack Symbol) ──
    if (coreRef.current) {
      coreRef.current.rotation.x += delta * 0.15;
      coreRef.current.rotation.y += delta * 0.22;
      coreRef.current.position.y = Math.sin(t * 0.6) * 0.25 - scrollProgress * 1.5;
    }

    if (innerGlowRef.current) {
      const scale = 1 + Math.sin(t * 1.8) * 0.08;
      innerGlowRef.current.scale.set(scale, scale, scale);
    }

    // ── 5. Orbital Laser Rings ──
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z += delta * 0.12;
      outerRingRef.current.rotation.x += delta * 0.08;
      outerRingRef.current.position.y = Math.sin(t * 0.5) * 0.2 - scrollProgress * 1.5;
    }

    // ── 6. TruthLens AI 3D Reticle in Forensics Section ──
    if (radarRingRef.current) {
      radarRingRef.current.rotation.z += delta * 0.6;
      const isTruthLens = activeSection === 'truthlens';
      const targetOpacity = isTruthLens ? 0.6 : 0.0;
      const mat = radarRingRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = THREE.MathUtils.lerp(mat.opacity, targetOpacity, lerpFactor);
    }
  });

  return (
    <group>
      {/* Cinematic Dark Fog */}
      <fog attach="fog" args={['#030303', 3, 24]} />

      {/* Atmospheric Cinematic Lighting */}
      <ambientLight intensity={0.2} />
      <directionalLight position={[8, 12, 6]} intensity={1.2} color="#FF1A1A" />
      <directionalLight position={[-8, -10, -6]} intensity={0.6} color="#7A0000" />
      <pointLight ref={lightRef} position={[0, 0, 3]} intensity={1.8} color="#FF1A1A" distance={12} />

      {/* ── 800 Cinematic Red Embers & Dust Field ── */}
      <points ref={embersRef}>
        <bufferGeometry ref={emberGeoRef}>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.038}
          vertexColors
          transparent
          opacity={0.75}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* ── Central Neural Polyhedron ── */}
      <group position={[2.5, 0, -1]}>
        {/* Outer Wireframe */}
        <mesh ref={coreRef}>
          <icosahedronGeometry args={[1.35, 1]} />
          <meshStandardMaterial
            color="#FF1A1A"
            wireframe
            transparent
            opacity={0.28}
            roughness={0.1}
            metalness={0.9}
          />
        </mesh>

        {/* Inner Glowing Core */}
        <mesh ref={innerGlowRef}>
          <sphereGeometry args={[0.55, 16, 16]} />
          <meshBasicMaterial
            color="#E50914"
            transparent
            opacity={0.18}
          />
        </mesh>

        {/* Orbital Rings */}
        <group ref={outerRingRef}>
          <mesh>
            <torusGeometry args={[1.8, 0.015, 16, 80]} />
            <meshBasicMaterial color="#FF1A1A" transparent opacity={0.35} />
          </mesh>
          <mesh rotation={[Math.PI / 3, 0, 0]}>
            <torusGeometry args={[2.0, 0.012, 16, 80]} />
            <meshBasicMaterial color="#B00000" transparent opacity={0.25} />
          </mesh>
        </group>

        {/* TruthLens Holographic Reticle Ring */}
        <mesh ref={radarRingRef} rotation={[0, 0, 0]}>
          <ringGeometry args={[2.2, 2.25, 48]} />
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
