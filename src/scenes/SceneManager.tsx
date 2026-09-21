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
  home: {
    id: 'home',
    name: 'Identity',
    cameraPosition: [0, 0, 5.2],
    targetPosition: [0, 0, 0],
    transitionDuration: 1.2,
  },
  about: {
    id: 'about',
    name: 'Background',
    cameraPosition: [-1.8, 0.4, 4.8],
    targetPosition: [-0.4, 0, 0],
    transitionDuration: 1.0,
  },
  skills: {
    id: 'skills',
    name: 'Toolkit',
    cameraPosition: [1.8, -0.4, 4.4],
    targetPosition: [0.4, 0, 0],
    transitionDuration: 1.0,
  },
  experience: {
    id: 'experience',
    name: 'Journey',
    cameraPosition: [0, -1.0, 5.4],
    targetPosition: [0, -0.4, 0],
    transitionDuration: 1.1,
  },
  projects: {
    id: 'projects',
    name: 'Showcase',
    cameraPosition: [1.9, 0.6, 4.9],
    targetPosition: [0.5, 0, 0],
    transitionDuration: 1.2,
  },
  truthlens: {
    id: 'truthlens',
    name: 'AI Forensics',
    cameraPosition: [0, 0, 3.9],
    targetPosition: [0, 0, 0],
    transitionDuration: 1.3,
  },
  certificates: {
    id: 'certificates',
    name: 'Credentials',
    cameraPosition: [-1.9, -0.5, 4.6],
    targetPosition: [-0.5, 0, 0],
    transitionDuration: 1.0,
  },
  documents: {
    id: 'documents',
    name: 'Archive',
    cameraPosition: [1.5, 0.4, 4.8],
    targetPosition: [0.3, 0, 0],
    transitionDuration: 1.1,
  },
  contact: {
    id: 'contact',
    name: 'Nexus',
    cameraPosition: [0, 0, 4.4],
    targetPosition: [0, 0, 0],
    transitionDuration: 1.4,
  },
  finale: {
    id: 'finale',
    name: 'Atmospheric Pull-Back',
    cameraPosition: [0, 1.4, 7.8],
    targetPosition: [0, 0, 0],
    transitionDuration: 1.8,
  },
};

interface SceneManagerProps {
  scrollProgress: number;
  activeSection?: string;
  onLoadingProgress?: (progress: number) => void;
  onLoaded?: () => void;
}

export const SceneManager: React.FC<SceneManagerProps> = ({ 
  scrollProgress, 
  activeSection = 'home',
  onLoadingProgress,
  onLoaded
}) => {
  return (
    <CanvasContainer 
      scrollProgress={scrollProgress} 
      activeSection={activeSection} 
      onLoadingProgress={onLoadingProgress}
      onLoaded={onLoaded}
    />
  );
};

export default SceneManager;
