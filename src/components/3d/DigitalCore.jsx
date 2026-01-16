import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';

const SECTION_COLORS = [
  '#356477', // Soft Blue (Main)
  '#ba0000', // Red (About/Profile)
  '#ccff00', // Lime (Tech/Terminal)
  '#aa00ff', // Purple (Socials)
];

const DigitalCore = ({ scrollContainerRef }) => {
  const meshRef = useRef();
  const materialRef = useRef();
  const lightRef = useRef();
  
  const [hovered, setHover] = useState(false);
  
  // Reusable objects to avoid GC
  const targetColor = useMemo(() => new THREE.Color(), []);

  useFrame((state, delta) => {
    if (!meshRef.current || !materialRef.current) return;

    const time = state.clock.elapsedTime;
    
    // --- INTRO ANIMATION (Maturing) ---
    // Core Assembles: 0s -> 2.5s
    // 0s-1.5s: "Chaos" phase - High distortion, wireframe look, growing opacity/density
    // 1.5s-2.0s: "Coalesce" phase - Solidifies, shrinking slightly
    // 2.0s-2.5s: "Pulse" phase - Expands to full size, releasing stars (handled in Scene)
    
    // Scale Logic
    let currentScale = 1.5; // Target scale
    
    // Slow down initial appearance
    const appearDuration = 3.0; 

    if (time < appearDuration) {
        const p = time / appearDuration; // 0 to 1 over 3s
        
        // --- SCALE: Non-linear Growth ---
        // ElasticOut for organic "birth" feel
        // c4 = (2 * Math.PI) / 3;
        // easeElasticOut: x === 0 ? 0 : x === 1 ? 1 : pow(2, -10 * x) * sin((x * 10 - 0.75) * c4) + 1;
        // Simplified custom curve: starts slow, accelerates, then settles
        
        // Let's split into 2 sub-phases
        if (p < 0.3) {
            // 0 - 0.9s: Creating from dust (Tiny to Small)
            currentScale = (p / 0.3) * 0.2; // Grows to size 0.2
            materialRef.current.distort = 1.0; // Pure chaos
        } else {
            // 0.9s - 3.0s: Inflating (Small to Full)
            const p2 = (p - 0.3) / 0.7; // 0 to 1
            // Smooth easing
            const ease = 1 - Math.pow(1 - p2, 3);
            currentScale = 0.2 + (ease * 1.3); // 0.2 -> 1.5
            
            // Distort goes from 1.0 to 0.2
            materialRef.current.distort = 1.0 - (ease * 0.8);
        }

    } else {
         // Phase 3: Ready state
         // Handled by standard loop below
    }

    // Always Keep Wireframe for Tech Look
    materialRef.current.wireframe = true;

    // Base rotation
    meshRef.current.rotation.x += delta * 0.2;
    meshRef.current.rotation.y += delta * 0.3;

    // Scroll Logic
    let scrollProgress = 0;
    let colorIndex = 0;
    let colorLerp = 0;

    if (scrollContainerRef?.current) {
        const scrollY = scrollContainerRef.current.scrollTop;
        const scrollH = scrollContainerRef.current.scrollHeight;
        const visibleH = scrollContainerRef.current.clientHeight;
        
        // Overall progress (0 to 1)
        const maxScroll = scrollH - visibleH;
        scrollProgress = maxScroll > 0 ? scrollY / maxScroll : 0;

        // Section based progress for colors
        // Assuming 1 viewport height = 1 section roughly (clamping to avoid index out of bounds)
        // We use Math.max to prevent negative index
        const exactSection = Math.max(0, scrollY / visibleH); 
        colorIndex = Math.floor(exactSection);
        colorLerp = exactSection % 1; 

        // Clamp index to avoid overflow
        // If we are at the very end, we just stick to the last color
        if (colorIndex >= SECTION_COLORS.length - 1) {
            colorIndex = SECTION_COLORS.length - 2;
            colorLerp = 1; 
        }
        
        // Rotate faster based on scroll
        meshRef.current.rotation.y += scrollProgress * 2 * delta;
    }

    // --- COLOR TRANSITION ---
    // If hovered, override generic scroll colors
    if (hovered) {
        targetColor.set('#ffffff');
    } else {
        const c1 = new THREE.Color(SECTION_COLORS[colorIndex] || SECTION_COLORS[0]);
        const c2 = new THREE.Color(SECTION_COLORS[colorIndex + 1] || SECTION_COLORS[0]);
        targetColor.copy(c1).lerp(c2, colorLerp);
    }
    
    // Smoothly update current color
    materialRef.current.color.lerp(targetColor, delta * 5);
    materialRef.current.emissive.lerp(targetColor, delta * 5);
    
    // Update light color too
    if(lightRef.current) {
        lightRef.current.color.lerp(targetColor, delta * 5);
    }

    // --- DYNAMIC SHAPE (Maturing/Interaction) ---
    // Pulse effect
    const pulse = 1 + Math.sin(time * 2) * 0.05 + (scrollProgress * 0.2);
    
    // --- POSITION & SCALE LOGIC (Scroll Reaction) ---
    // Transition from Center (Big) to Top (Small)
    // We Map scrollProgress from 0 (Top) to how fast we want it to react
    
    // Smooth Lerp factor
    const lerpFactor = delta * 5;

    let targetY = 0;
    let targetScale = 1.5;
    
    // If we scroll past 5% of the page or just start scrolling
    if (scrollContainerRef?.current) {
        const scrollY = scrollContainerRef.current.scrollTop;
        const visibleH = scrollContainerRef.current.clientHeight;
        
        // Progress 0 to 1 over the course of the FIRST section (viewport)
        // As soon as we scroll 1 full screen, the core should be in "Header Mode"
        const headerProgress = Math.min(scrollY / (visibleH * 0.8), 1);
        
        // Position: 0 (Center) -> 2.5 (Top of FOV approx)
        targetY = headerProgress * 2.2; 
        
        // Scale: 1.5 (Big) -> 0.3 (Badge)
        // Intro animation might override this initial scale, so we multiply
        targetScale = 1.5 - (headerProgress * 1.25); // Ends at 0.25
    }

    // Apply Position
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, lerpFactor);

    // Final Scale Calculation (Intro + Scroll)
    let scaleMultiplier = 1;
    if (time < appearDuration) {
         scaleMultiplier = 1; // handled by intro logic
    } else {
         currentScale = targetScale; // Scroll overrides base scale
    }
    
    // Smoothly interpolate scale to avoid jumps if intro finishes while scrolling
    // Note: mesh.scale is Vector3, we lerp coordinate-wise or just setScalar if simple graphics
    // For smooth transition we need persistent value
    const nextScale = THREE.MathUtils.lerp(meshRef.current.scale.x, currentScale * pulse, lerpFactor);
    meshRef.current.scale.setScalar(nextScale);
    
    
    if (time >= appearDuration) {
         const normalDistort = 0.2;
         // Smoothly lerp to normal if we were high
         // Actually we can just keep setting it, assuming previous frame set it near 0.4
         // But let's add scroll influence to distort
         materialRef.current.distort = normalDistort + (scrollProgress * 0.2);
    }

  });

  return (
    <group>
      <Sphere ref={meshRef} args={[1.5, 64, 64]} onPointerOver={() => setHover(true)} onPointerOut={() => setHover(false)}>
        <MeshDistortMaterial
          ref={materialRef}
          roughness={0.2}
          metalness={1}
          speed={3}
          wireframe={true} 
          emissiveIntensity={0.8}
        />
      </Sphere>
      
      {/* Core Glow */}
      <pointLight ref={lightRef} distance={15} intensity={5} />
    </group>
  );
};

export default DigitalCore;
