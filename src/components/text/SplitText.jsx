import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText as GSAPSplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, GSAPSplitText, useGSAP);

const animatedTexts = new Set();

const SplitText = ({
  text,
  className = '',
  delay = 100,
  duration = 0.6,
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-100px',
  textAlign = 'center',
  tag = 'p',
  container = null,
  onLetterAnimationComplete
}) => {
  const ref = useRef(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const uniqueId = useRef(`split-${Math.random().toString(36).substr(2, 9)}`);

  useEffect(() => {
    if (document.fonts.status === 'loaded') {
      setFontsLoaded(true);
    } else {
      document.fonts.ready.then(() => {
        setFontsLoaded(true);
      });
    }
  }, []);

  useGSAP(
    () => {
      if (!ref.current || !text || !fontsLoaded) return;
      const el = ref.current;

      const animationKey = `${uniqueId.current}-${text.substring(0, 10)}`;

      let scrollerTarget = container || document.getElementById('snap-main-container') || null;
      if (typeof scrollerTarget === 'string') {
          scrollerTarget = document.querySelector(scrollerTarget);
      }

      if (el._rbsplitInstance) {
        try {
          el._rbsplitInstance.revert();
        } 
        catch { }
        el._rbsplitInstance = null;
      }

      const splitInstance = new GSAPSplitText(el, {
        type: splitType,
        smartWrap: true,
        autoSplit: splitType === 'lines',
        linesClass: 'split-line',
        wordsClass: 'split-word',
        charsClass: 'split-char',
        reduceWhiteSpace: false
      });

      let targets;
      if (splitType.includes('chars') && splitInstance.chars.length) targets = splitInstance.chars;
      if (!targets && splitType.includes('words') && splitInstance.words.length) targets = splitInstance.words;
      if (!targets && splitType.includes('lines') && splitInstance.lines.length) targets = splitInstance.lines;
      if (!targets) targets = splitInstance.chars || splitInstance.words || splitInstance.lines;

      if (animatedTexts.has(animationKey)) {
          gsap.set(targets, { ...to });
      } else {
          const startPct = (1 - threshold) * 100;
          
          gsap.set(targets, { ...from });
          
          ScrollTrigger.create({
              trigger: el,
              scroller: scrollerTarget,
              start: `top ${startPct}%`,
              once: true,
              onEnter: () => {
                   gsap.to(targets, {
                      ...to,
                      duration,
                      ease,
                      stagger: delay / 1000,
                      onComplete: () => {
                          animatedTexts.add(animationKey);
                          onLetterAnimationComplete?.();
                      }
                   });
              }
          });
      }

      el._rbsplitInstance = splitInstance;

      return () => {
        ScrollTrigger.getAll().forEach(st => {
           if (st.trigger === el) st.kill();
        });

        try {
          if (el._rbsplitInstance) el._rbsplitInstance.revert();
        } catch (_) { }
      };
    },
    {
      dependencies: [text, fontsLoaded, container],
      scope: ref
    }
  );

  const renderTag = () => {
    const style = {
      textAlign,
      wordWrap: 'break-word',
      willChange: 'transform, opacity'
    };
    const classes = `split-parent overflow-hidden inline-block whitespace-normal ${className}`;
    
    switch (tag) {
        case 'h1': return <h1 ref={ref} style={style} className={classes}>{text}</h1>;
        case 'h2': return <h2 ref={ref} style={style} className={classes}>{text}</h2>;
        case 'h3': return <h3 ref={ref} style={style} className={classes}>{text}</h3>;
        case 'h4': return <h4 ref={ref} style={style} className={classes}>{text}</h4>;
        case 'h5': return <h5 ref={ref} style={style} className={classes}>{text}</h5>;
        case 'h6': return <h6 ref={ref} style={style} className={classes}>{text}</h6>;
        default: return <p ref={ref} style={style} className={classes}>{text}</p>;
    }
  };
  return renderTag();
};

export default SplitText;