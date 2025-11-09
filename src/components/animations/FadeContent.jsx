import { useSpring, animated } from '@react-spring/web';
import { useEffect, useState } from 'react';

const FadeContent = ({ children, delay = 0, duration = 1000, blurOnStart = false, className = '' }) => {
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldAnimate(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const springProps = useSpring({
    opacity: shouldAnimate ? 1 : 0,
    filter: blurOnStart ? (shouldAnimate ? 'blur(0px)' : 'blur(10px)') : 'none',
    transform: shouldAnimate ? 'translateY(0px)' : 'translateY(-10px)',
    config: { tension: 300, friction: 20, duration },
  });

  return (
    <animated.div style={springProps} className={className}>
      {children}
    </animated.div>
  );
};

export default FadeContent;