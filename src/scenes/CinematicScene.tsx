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
  const starsRef = useRef<THREE.Points>(null);
  const nebulaRef = useRef<THREE.Points>(null);
  const asteroidsRef = useRef<THREE.Group>(null);
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

  // Adaptive particle count: 200 mobile, 350 low-end desktop, 700 high-end desktop
  const particleCount = useMemo(() => {
    if (typeof window !== 'undefined') {
      const isMobile = window.innerWidth < 768;
      const isLowEnd = navigator.hardwareConcurrency != null && navigator.hardwareConcurrency <= 4;
      return isMobile ? 200 : isLowEnd ? 350 : 700;
    }
    return 700;
  }, []);

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

  // ── High-Fidelity Starfield Generation ──
  const [starPositions, starSizes, starColors] = useMemo(() => {
    const count = 1500;
    const pos = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const cols = new Float32Array(count * 3);
    
    const colorA = new THREE.Color('#FFFFFF');
    const colorB = new THREE.Color('#FFDDDD');
    const colorC = new THREE.Color('#DDEEFF');

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Spherical distribution at a far distance
      const r = 20 + Math.random() * 20;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      pos[i3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i3 + 2] = r * Math.cos(phi);

      sizes[i] = Math.random() * 1.5 + 0.5;

      const rand = Math.random();
      const col = rand < 0.8 ? colorA : rand < 0.9 ? colorB : colorC;
      cols[i3] = col.r;
      cols[i3 + 1] = col.g;
      cols[i3 + 2] = col.b;
    }
    return [pos, sizes, cols];
  }, []);

  // ── High-Fidelity Nebula Particles ──
  const [nebulaPositions, nebulaColors] = useMemo(() => {
    const count = 400;
    const pos = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);
    const colors = ['#2200ff', '#ff00aa', '#5500ff', '#00aaff'];

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const r = 15 + Math.random() * 15;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      pos[i3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i3 + 2] = r * Math.cos(phi);

      const color = new THREE.Color(colors[Math.floor(Math.random() * colors.length)]);
      cols[i3] = color.r;
      cols[i3 + 1] = color.g;
      cols[i3 + 2] = color.b;
    }
    return [pos, cols];
  }, []);

  // ── Asteroid Belt Generation ──
  const asteroidData = useMemo(() => {
    const count = 200;
    const data = [];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 6 + Math.random() * 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = (Math.random() - 0.5) * 0.8;
      const scale = Math.random() * 0.08 + 0.02;
      const rotationSpeed = Math.random() * 0.02;
      data.push({ position: [x, y, z], scale, rotationSpeed });
    }
    return data;
  }, []);

  const emberGeoRef = useRef<THREE.BufferGeometry>(null);

// Reusable vectors to prevent GC allocations on every frame
const tempVecTarget = new THREE.Vector3();
const tempVecLookAt = new THREE.Vector3();

// Per-Frame Animation Loop
  useFrame((state, delta) => {
    if (typeof document !== 'undefined' && document.hidden) return;

    const t = state.clock.elapsedTime;
    const lerpFactor = 1 - Math.pow(0.008, delta); // Smoother lerp

    // ── 1. Camera Inertial Interpolation + Dynamic Parallax ──
    const zOffset = Math.sin(t * 0.4) * 0.15; // Subtle breathing on Z axis
    
    tempVecTarget.copy(camTarget.current.pos);
    tempVecTarget.z += zOffset;
    tempVecTarget.x += mouse.current.x * 0.42;
    tempVecTarget.y += mouse.current.y * 0.32;
    camera.position.lerp(tempVecTarget, lerpFactor * 0.5);

    tempVecLookAt.copy(camTarget.current.lookAt);
    tempVecLookAt.x += mouse.current.x * 0.22;
    tempVecLookAt.y += mouse.current.y * 0.18;
    camera.lookAt(tempVecLookAt);

    // ── 2. Red Point Light follows mouse with a 'lagging' physics feel ──
    if (lightRef.current) {
      const lightLerp = 1 - Math.pow(0.05, delta);
      lightRef.current.position.x = THREE.MathUtils.lerp(lightRef.current.position.x, mouse.current.x * 5, lightLerp);
      lightRef.current.position.y = THREE.MathUtils.lerp(lightRef.current.position.y, mouse.current.y * 4, lightLerp);
      lightRef.current.intensity = 2.0 + Math.sin(t * 1.5) * 0.3; // Flickering core light
    }

    // ── 3. Advanced Neural Ember Physics ──
    if (emberGeoRef.current) {
      const posAttr = emberGeoRef.current.attributes.position as THREE.BufferAttribute;
      const arr = posAttr.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        arr[i3 + 1] += velocities[i3 + 1] * (1 + Math.sin(t * 0.5 + i) * 0.2);
        arr[i3] += Math.sin(t * 0.7 + i * 0.5) * 0.005;
        arr[i3 + 2] += Math.cos(t * 0.7 + i * 0.5) * 0.005;

        if (arr[i3 + 1] > 10) arr[i3 + 1] = -10;
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

    // ── 3.5 Starfield Twinkle & Rotation ──
    if (starsRef.current) {
      starsRef.current.rotation.y += delta * 0.005;
      starsRef.current.rotation.x += delta * 0.002;
    }

    if (nebulaRef.current) {
      nebulaRef.current.rotation.y -= delta * 0.003;
    }

    if (asteroidsRef.current) {
      asteroidsRef.current.rotation.y += delta * 0.1;
    }

    // ── 4. Central Space Sun ──
    if (coreRef.current) {
      coreRef.current.rotation.x += delta * 0.16;
      coreRef.current.rotation.y += delta * 0.24;
      coreRef.current.position.y = Math.sin(t * 0.7) * 0.22 - scrollProgress * 1.6;
      
      // Intelligent Pulsing (Neural Beat)
      const pulse = Math.sin(t * 2.5) * 0.5 + 0.5;
      const mat = coreRef.current.material as THREE.MeshStandardMaterial;
      mat.opacity = 0.2 + pulse * 0.15;
      mat.emissiveIntensity = pulse * 0.5;
    }

    if (innerGlowRef.current) {
      const scale = 1 + Math.sin(t * 2.2) * 0.15;
      innerGlowRef.current.scale.set(scale, scale, scale);
      const mat = innerGlowRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.15 + Math.sin(t * 4) * 0.1;
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

      {/* ── High-Fidelity Distant Starfield ── */}
      <points ref={starsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[starPositions, 3]} />
          <bufferAttribute attach="attributes-color" args={[starColors, 3]} />
          <bufferAttribute attach="attributes-size" args={[starSizes, 1]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          vertexColors
          transparent
          opacity={0.8}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* ── Cinematic Nebula Cloud ── */}
      <points ref={nebulaRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[nebulaPositions, 3]} />
          <bufferAttribute attach="attributes-color" args={[nebulaColors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={2.5}
          vertexColors
          transparent
          opacity={0.15}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          map={new THREE.TextureLoader().load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/lensflare/lensflare0.png')}
        />
      </points>

      {/* ── Asteroid Belt ── */}
      <group ref={asteroidsRef} position={[2.4, 0, -1]} rotation={[Math.PI * 0.15, 0, 0]}>
        {asteroidData.map((data, i) => (
          <mesh key={i} position={data.position as any} scale={data.scale}>
            <dodecahedronGeometry args={[1, 0]} />
            <meshStandardMaterial color="#443322" roughness={1} metalness={0} />
          </mesh>
        ))}
      </group>

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
        {/* Realistic High-Intensity Sun */}
        <mesh ref={coreRef}>
          <sphereGeometry args={[1.5, 32, 32]} />
          <meshStandardMaterial
            color="#FFA500"
            emissive="#FF4500"
            emissiveIntensity={2}
            roughness={0}
            metalness={1}
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
