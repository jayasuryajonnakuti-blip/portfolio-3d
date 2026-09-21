import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useVelocity, useSpring, useTransform, useAnimationFrame, useMotionValue } from 'framer-motion';
import gsap from 'gsap';

interface SkillNode {
  name: string;
  url: string;
  color: string;
  symbol: string;
  orbit: number;
  initialAngle: number;
  speed: number;
}

const skills: SkillNode[] = [
  // Orbit 1 (Inner) - Languages & Runtime
  { name: 'Java', url: 'https://dev.java/', color: '#F89820', symbol: '☕', orbit: 1, initialAngle: 0, speed: 0.8 },
  { name: 'Python', url: 'https://www.python.org/', color: '#3572A5', symbol: 'Py', orbit: 1, initialAngle: 72, speed: 0.6 },
  { name: 'TypeScript', url: 'https://www.typescriptlang.org/', color: '#3178C6', symbol: 'TS', orbit: 1, initialAngle: 144, speed: 0.5 },
  { name: 'C', url: 'https://en.cppreference.com/w/c', color: '#A8B9CC', symbol: 'C', orbit: 1, initialAngle: 216, speed: 0.7 },
  { name: 'Node.js', url: 'https://nodejs.org/', color: '#339933', symbol: 'N', orbit: 1, initialAngle: 288, speed: 0.65 },

  // Orbit 2 - Web Frontiers
  { name: 'React', url: 'https://react.dev/', color: '#61DAFB', symbol: '⚛', orbit: 2, initialAngle: 0, speed: 0.45 },
  { name: 'HTML', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML', color: '#E34F26', symbol: '5', orbit: 2, initialAngle: 72, speed: 0.4 },
  { name: 'CSS', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS', color: '#1572B6', symbol: '3', orbit: 2, initialAngle: 144, speed: 0.42 },
  { name: 'Tailwind', url: 'https://tailwindcss.com/', color: '#38BDF8', symbol: '🌊', orbit: 2, initialAngle: 216, speed: 0.38 },
  { name: 'Firebase', url: 'https://firebase.google.com/', color: '#FFCA28', symbol: '🔥', orbit: 2, initialAngle: 288, speed: 0.48 },

  // Orbit 3 - Data & Infrastructure
  { name: 'MongoDB', url: 'https://www.mongodb.com/', color: '#4DB33D', symbol: '🍃', orbit: 3, initialAngle: 0, speed: 0.32 },
  { name: 'MySQL', url: 'https://www.mysql.com/', color: '#00758F', symbol: '🐬', orbit: 3, initialAngle: 90, speed: 0.3 },
  { name: 'Docker', url: 'https://www.docker.com/', color: '#2496ED', symbol: '🐳', orbit: 3, initialAngle: 180, speed: 0.34 },
  { name: 'AWS', url: 'https://aws.amazon.com/', color: '#FF9900', symbol: '☁', orbit: 3, initialAngle: 270, speed: 0.31 },

  // Orbit 4 (Outer) - Intelligence & Insight
  { name: 'Gemini AI', url: 'https://ai.google.dev/', color: '#4285F4', symbol: '🤖', orbit: 4, initialAngle: 0, speed: 0.22 },
  { name: 'Power BI', url: 'https://powerbi.microsoft.com/', color: '#F2C811', symbol: '📊', orbit: 4, initialAngle: 90, speed: 0.2 },
  { name: 'GitHub', url: 'https://github.com/', color: '#FFFFFF', symbol: '⎇', orbit: 4, initialAngle: 180, speed: 0.24 },
  { name: 'VS Code', url: 'https://code.visualstudio.com/', color: '#007ACC', symbol: '💻', orbit: 4, initialAngle: 270, speed: 0.21 },
];

export const SolarSkillsOrbit: React.FC = () => {
  const orbits = [
    { id: 1, radius: 90, ellipseRatio: 0.72 },
    { id: 2, radius: 165, ellipseRatio: 0.68 },
    { id: 3, radius: 240, ellipseRatio: 0.64 },
    { id: 4, radius: 315, ellipseRatio: 0.6 },
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const anglesRef = useRef<number[]>(skills.map(s => s.initialAngle));
  const planetsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const mouseIntensity = useMotionValue(0);
  const lastMousePos = useRef({ x: 0, y: 0 });

  const scrollIntensity = useTransform(scrollVelocity, [0, 3000], [0, 1], { clamp: false });
  const rawIntensity = useMotionValue(0);
  const interactionIntensity = useSpring(rawIntensity, {
    stiffness: 60,
    damping: 40,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - lastMousePos.current.x;
      const dy = e.clientY - lastMousePos.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      mouseIntensity.set(Math.min(mouseIntensity.get() + dist * 0.003, 1.5));
      lastMousePos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useAnimationFrame((_, delta) => {
    // 1. Update Intensity
    mouseIntensity.set(mouseIntensity.get() * 0.96);
    const sInt = Math.abs(scrollIntensity.get());
    const mInt = mouseIntensity.get();
    rawIntensity.set(Math.min(sInt + mInt, 2.5));

    const intensity = interactionIntensity.get();
    const speedFactor = 1 + intensity * 5;
    const deltaFactor = delta / 16.67;

    // 2. Update Angles & Positions Directly (Minimize Framer Motion component overhead)
    skills.forEach((skill, i) => {
      const orbit = orbits.find(o => o.id === skill.orbit)!;
      anglesRef.current[i] += skill.speed * speedFactor * deltaFactor;
      const angleRad = (anglesRef.current[i] * Math.PI) / 180;
      
      const el = planetsRef.current[i];
      if (el) {
        // Calculate X and Y on the elliptical path
        const x = Math.cos(angleRad) * orbit.radius;
        const y = Math.sin(angleRad) * orbit.radius * orbit.ellipseRatio;
        
        // Add a subtle individual bobbing effect
        const bobX = Math.sin(Date.now() * 0.001 + i) * 3;
        const bobY = Math.cos(Date.now() * 0.0015 + i) * 5;
        
        // Use translate3d for hardware acceleration
        el.style.transform = `translate3d(calc(-50% + ${x + bobX}px), calc(-50% + ${y + bobY}px), 0)`;
      }
    });
  });

  return (
    <div ref={containerRef} className="solar-orbit-container">
      {/* ── Left Side: Header & Context ── */}
      <div className="orbit-hud-left">
        <div className="hud-chapter">03 / SKILLS</div>
        <h2 className="hud-main-title">
          TECHNOLOGY<br />
          <span className="text-red">UNIVERSE</span>
        </h2>
        <div className="hud-sub-context">
          <div className="hud-tag">A DIVERSE ECOSYSTEM OF MODERN TECHNOLOGIES</div>
          <p className="hud-description">
            The tools and technologies I use to turn ideas into real-world solutions. 
            Click on any skill to explore the official documentation.
          </p>
        </div>
        
        <div className="hud-quote">
          "The right tools, in the right hands, can turn human potential into extraordinary impact."
        </div>
      </div>

      {/* ── Right Side: Skills Overview ── */}
      <div className="orbit-hud-right">
        <div className="hud-overview-panel">
          <div className="hud-panel-title">SKILLS OVERVIEW</div>
          <div className="hud-stat-item">
            <div className="stat-value">5</div>
            <div className="stat-label">CATEGORIES</div>
          </div>
          <div className="hud-stat-item">
            <div className="stat-value">20+</div>
            <div className="stat-label">TECHNOLOGIES</div>
          </div>
          <div className="hud-stat-item">
            <div className="stat-value">∞</div>
            <div className="stat-label">CONTINUOUS LEARNING</div>
          </div>
        </div>
      </div>

      {/* Background Rings */}
      {orbits.map((orbit) => (
        <div
          key={orbit.id}
          className="solar-orbit-ring"
          style={{
            width: orbit.radius * 2,
            height: orbit.radius * 2 * orbit.ellipseRatio,
            border: '1px solid rgba(255, 26, 26, 0.08)',
            borderRadius: '50%',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* Realistic Space Sun */}
      <div className="solar-core">
        <div className="sun-plasma-layer" />
        <div className="sun-corona-layer" />
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            boxShadow: [
              '0 0 60px rgba(255, 60, 0, 0.4), 0 0 120px rgba(255, 0, 0, 0.2)',
              '0 0 80px rgba(255, 100, 0, 0.6), 0 0 160px rgba(255, 0, 0, 0.4)',
              '0 0 60px rgba(255, 60, 0, 0.4), 0 0 120px rgba(255, 0, 0, 0.2)',
            ],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="solar-sun-space"
        >
          <div className="sun-surface-texture" />
        </motion.div>
      </div>

      {/* Skills Planets */}
      {skills.map((skill, i) => (
        <motion.a
          key={skill.name}
          ref={el => planetsRef.current[i] = el}
          href={skill.url}
          target="_blank"
          rel="noopener noreferrer"
          className="skill-planet-optimized"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
          }}
          whileHover={{ scale: 1.15, zIndex: 100 }}
        >
          <div 
            className="skill-planet-circle"
            style={{
              boxShadow: `0 0 20px ${skill.color}66`,
              border: `2px solid ${skill.color}`,
              background: 'rgba(0, 0, 0, 0.95)',
            }}
          >
            <div className="skill-logo-glow" style={{ background: skill.color }} />
            <span className="skill-planet-symbol" style={{ color: '#FFF' }}>
              {skill.symbol}
            </span>
          </div>
          <span className="skill-planet-name" style={{ color: '#FFF', letterSpacing: '0.2em' }}>
            {skill.name}
          </span>
        </motion.a>
      ))}
      
      {/* Footer Navigation Bar */}
      <div className="orbit-hud-footer">
        <div className="footer-links">
          <span>EXPLORE</span>
          <span className="footer-dot" />
          <span>LEARN</span>
          <span className="footer-dot" />
          <span>BUILD</span>
          <span className="footer-dot" />
          <span>GROW</span>
        </div>
      </div>
    </div>
  );
};
