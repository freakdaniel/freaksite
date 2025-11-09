import { useSpring, animated } from '@react-spring/web';
import { useState, useRef } from 'react';

const AnimatedScale = ({
  children,
  scaleOnHover = 1.1,
  translateYOnHover = -1,
  duration = 300,
  stiffness = 300,
  damping = 20,
  className = '',
  style = {},
  ...restProps
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const springProps = useSpring({
    scale: isHovered ? scaleOnHover : 1,
    y: isHovered ? translateYOnHover : 0,
    config: { tension: stiffness, friction: damping },
  });

  return (
    <animated.div
      style={{
        ...style,
        transform: springProps.scale.to(s => `scale(${s}) translateY(${springProps.y.get()}px)`),
      }}
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...restProps}
    >
      {children}
    </animated.div>
  );
};

export default AnimatedScale;