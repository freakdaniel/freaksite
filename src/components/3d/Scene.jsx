import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Sparkles, OrbitControls, Environment } from '@react-three/drei';
import DigitalCore from './DigitalCore';
import { Suspense, useRef, useEffect, useState } from 'react';

// Wrapper to animate the stars appearing
const AnimatedStars = ({ accentColor, maxSpeed = 0 }) => {
    const whiteStarsRef = useRef();
    const coloredStarsRef = useRef();

    useFrame((state) => {
        const time = state.clock.elapsedTime;
        const delay = 0.5; // Shortened delay for visibility check
        const duration = 2.0;
        
        // Calculate fade-in progress (0 to 1)
        const t = time > delay ? Math.min((time - delay) / duration, 1) : 0;

        // Helper to safely update opacity
        const animateOpacity = (ref) => {
            if (ref.current) {
                // Determine if we are dealing with a standard material or shader
                const material = ref.current.material;
                if (material) {
                    material.transparent = true;
                    material.depthWrite = false;
                    
                    // Update opacity directly
                    // Drei Sparkles likely uses a custom shader where opacity is a uniform, 
                    // AND/OR it respects the base material opacity property if transparent is set.
                    // We set both to be safe.
                    material.opacity = t;
                    if (material.uniforms && material.uniforms.opacity) {
                        material.uniforms.opacity.value = t;
                    }
                }
                // Constant rotation
                ref.current.rotation.y += 0.0001;
            }
        };

        animateOpacity(whiteStarsRef);
        animateOpacity(coloredStarsRef);
    })

    return (
        <group>
             {/* 
                Initialize with logic handled by useFrame. 
                removed opacity prop here to let reference handle it fully 
             */}
             <Sparkles ref={whiteStarsRef} count={200} scale={20} size={2} speed={maxSpeed} color="#ffffff" />
             <Sparkles ref={coloredStarsRef} count={150} scale={12} size={4} speed={maxSpeed} color={accentColor} />
        </group>
    )
}

const Scene = ({ scrollContainerRef, accentColor='#22ccff' }) => {
  return (
    <div className="fixed inset-0 z-0 bg-black">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <fog attach="fog" args={['#000000', 5, 20]} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        
        <Suspense fallback={null}>
            <AnimatedStars accentColor={accentColor} />
            <DigitalCore scrollContainerRef={scrollContainerRef} />
        </Suspense>

        {/* Allow slight movement but disable zoom to keep layout stable */}
        {/* pointer-events-none on parent might block this, but we want the background static mostly */}
        {/* If we want interaction, we need to remove pointer-events-none from parent div */}
      </Canvas>
    </div>
  );
};

export default Scene;
