import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AnimatedContent = ({
  children,
  distance = 100,
  direction = 'vertical',
  reverse = false,
  duration = 0.8,
  ease = 'power3.out',
  initialOpacity = 0,
  animateOpacity = true,
  scale = 1,
  threshold = 0.1,
  delay = 0,
  disappearAfter = 0,
  disappearDuration = 0.5,
  disappearEase = 'power3.in',
  onComplete,
  onDisappearanceComplete
}) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const axis = direction === 'horizontal' ? 'x' : 'y';
    const offset = reverse ? -distance : distance;
    const startPct = (1 - threshold) * 100;

    gsap.set(el, {
      [axis]: offset,
      scale,
      opacity: animateOpacity ? initialOpacity : 1,
      visibility: 'visible'
    });

    const appearTl = gsap.timeline({ delay });

    appearTl.to(el, {
      [axis]: 0,
      scale: 1,
      opacity: 1,
      duration,
      ease,
      
      onComplete: () => {
        if (onComplete) onComplete();
        
        if (disappearAfter > 0) {
          const disappearTimeout = setTimeout(() => {
            
            gsap.to(el, {
              [axis]: reverse ? distance : -distance, 
              scale: 0.8, 
              opacity: animateOpacity ? initialOpacity : 0, 
              duration: disappearDuration,
              ease: disappearEase,
              onComplete: () => {
                if (onDisappearanceComplete) onDisappearanceComplete();
              }
            });
          }, disappearAfter * 1000); 

          return () => clearTimeout(disappearTimeout);
        }
      }
    }, 0); 

    appearTl.add(() => {
      ScrollTrigger.create({
        trigger: el,
        start: `top ${startPct}%`,
        animation: appearTl,
        toggleActions: 'play none none none',
        once: true 
      });
    }, 0);
    
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
      gsap.killTweensOf(el);
    };
  }, [
    distance,
    direction,
    reverse,
    duration,
    ease,
    initialOpacity,
    animateOpacity,
    scale,
    threshold,
    delay,
    disappearAfter,
    disappearDuration,
    disappearEase,
    onComplete,
    onDisappearanceComplete
  ]);

  return <div ref={ref} style={{ visibility: 'hidden' }}>{children}</div>;
};

export default AnimatedContent;