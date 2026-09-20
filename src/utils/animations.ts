import gsap from 'gsap';

export const EASING = {
  smooth: 'power2.out',
  cinematic: 'power3.inOut',
  bounce: 'back.out(1.7)',
  expo: 'expo.out',
};

export function fadeInElement(target: gsap.TweenTarget, delay = 0) {
  return gsap.fromTo(
    target,
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.8, delay, ease: EASING.smooth }
  );
}

export function staggerFadeIn(targets: gsap.TweenTarget, stagger = 0.1) {
  return gsap.fromTo(
    targets,
    { opacity: 0, y: 25 },
    { opacity: 1, y: 0, duration: 0.7, stagger, ease: EASING.smooth }
  );
}
