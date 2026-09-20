import React from 'react';
import { CanvasContainer } from './CanvasContainer';

export interface SceneStage {
  id: string;
  name: string;
  cameraPosition: [number, number, number];
  targetPosition: [number, number, number];
  transitionDuration: number;
}

export const SCENE_STAGES: Record<string, SceneStage> = {
  hero: {
    id: 'hero',
    name: 'Identity',
    cameraPosition: [0, 0, 5],
    targetPosition: [0, 0, 0],
    transitionDuration: 1.2,
  },
  about: {
    id: 'about',
    name: 'Background',
    cameraPosition: [-1.5, 0.5, 4.5],
    targetPosition: [-0.5, 0, 0],
    transitionDuration: 1.0,
  },
  skills: {
    id: 'skills',
    name: 'Toolkit',
    cameraPosition: [1.8, -0.3, 4.2],
    targetPosition: [0.5, 0, 0],
    transitionDuration: 1.0,
  },
  experience: {
    id: 'experience',
    name: 'Journey',
    cameraPosition: [0, -1.2, 5.2],
    targetPosition: [0, -0.5, 0],
    transitionDuration: 1.1,
  },
  projects: {
    id: 'projects',
    name: 'Showcase',
    cameraPosition: [2.0, 0.8, 4.8],
    targetPosition: [0.8, 0, 0],
    transitionDuration: 1.2,
  },
  certificates: {
    id: 'certificates',
    name: 'Credentials',
    cameraPosition: [-1.8, -0.6, 4.5],
    targetPosition: [-0.6, 0, 0],
    transitionDuration: 1.0,
  },
  contact: {
    id: 'contact',
    name: 'Nexus',
    cameraPosition: [0, 0, 4.0],
    targetPosition: [0, 0, 0],
    transitionDuration: 1.4,
  },
};

interface SceneManagerProps {
  scrollProgress: number;
  activeSection?: string;
}

export const SceneManager: React.FC<SceneManagerProps> = ({ scrollProgress }) => {
  return <CanvasContainer scrollProgress={scrollProgress} />;
};

export default SceneManager;
