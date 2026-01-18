import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Sparkles, OrbitControls, Environment } from '@react-three/drei';
import * as THREE from 'three';
import DigitalCore from './DigitalCore';
import { Suspense, useRef, useEffect, useState } from 'react';

const AnimatedStars = ({ accentColor, maxSpeed = 0.5 }) => {
    const whiteStarsRef = useRef();
    const coloredStarsRef = useRef();

    useFrame((state) => {
        const time = state.clock.elapsedTime;
        const delay = 0.5;
        const duration = 2.0;
        
        const t = time > delay ? Math.min((time - delay) / duration, 1) : 0;

        const animateOpacity = (ref) => {
            if (ref.current) {
                const material = ref.current.material;
                if (material) {
                    material.transparent = true;
                    material.depthWrite = false;
                    
                    material.opacity = t;
                    if (material.uniforms && material.uniforms.opacity) {
                        material.uniforms.opacity.value = t;
                    }
                }
                ref.current.rotation.y += 0.00005;
            }
        };

        animateOpacity(whiteStarsRef);
        animateOpacity(coloredStarsRef);
    })

    return (
        <group position={[0, 0, -2]}> 
             <Sparkles ref={whiteStarsRef} count={200} scale={[20, 20, 10]} size={2} speed={maxSpeed} color="#ffffff" />
             <Sparkles ref={coloredStarsRef} count={150} scale={[12, 12, 10]} size={4} speed={maxSpeed} color={accentColor} />
        </group>
    )
}

const Scene = ({ scrollContainerRef, accentColor='#2f6277' }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 bg-black">
      <Canvas Те
        camera={{ position: [0, 0, 6], fov: 45 }}
        frameloop={isVisible ? 'always' : 'demand'}
        gl={{ 
          preserveDrawingBuffer: true,
          powerPreference: 'high-performance',
          antialias: true
        }}
      >
        <fog attach="fog" args={['#000000', 5, 20]} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        
        <Suspense fallback={null}>
            <AnimatedStars accentColor={accentColor} />
            <DigitalCore scrollContainerRef={scrollContainerRef} isVisible={isVisible} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Scene;
