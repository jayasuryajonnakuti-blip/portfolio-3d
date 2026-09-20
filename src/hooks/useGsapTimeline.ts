import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function useGsapTimeline() {
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      tlRef.current = gsap.timeline();
    });

    return () => {
      ctx.revert();
    };
  }, []);

  return tlRef;
}
