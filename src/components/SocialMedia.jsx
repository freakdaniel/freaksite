import { useState } from 'react';
import GlassSurface from './others/GlassSurface';
import { useSpring, animated } from '@react-spring/web';
import AnimatedScale from './animations/AnimatedScale';

const SocialMedia = ({ configs, className = '', ...props }) => {
  if (!Array.isArray(configs)) {
    console.error('SocialMedia: "configs" should be a config massive');
    return null;
  }

  return (
    <div className={`flex flex-row gap-4 ${className}`} {...props}>
      {configs.map((config, index) => (
        <SocialMediaButton key={index} config={config} />
      ))}
    </div>
  );
};

const SocialMediaButton = ({ config }) => {
  const {
    name,
    url,
    icon: IconComponent,
    color = 'rgba(255, 255, 255, 0.3)',
  } = config;

  const [isHovered, setIsHovered] = useState(false);

  if (!name || !url || !IconComponent) {
    console.error('SocialMediaButton: "name", "url" and "icon" should be included in config');
    return null;
  }

  const overlayAnimation = useSpring({
    opacity: isHovered ? 1 : 0,
    scale: isHovered ? 1 : 0.8,
    config: { tension: 200, friction: 20 },
  });

  return (
    <AnimatedScale>
            <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ width: '48px', height: '48px' }}
    >
      <animated.div
        className="absolute inset-0 rounded-[20px] z-0" 
        style={{
          ...overlayAnimation,
          background: color,
        }}
      />

      <div className="relative z-10 w-full h-full flex items-center justify-center">
        <GlassSurface
          className="w-full h-full flex items-center justify-center overflow-visible"
          blur={10}
          saturation={1.5}
          distortionScale={-80}
          displace={0.5}
          borderRadius={20}
        >
            <IconComponent size={24} className="text-white absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20" style={{ opacity: 0.7 }} />
        </GlassSurface>
      </div>
    </a>
    </AnimatedScale>
  );
};

export default SocialMedia;