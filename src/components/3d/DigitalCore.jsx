import { useRef, useState, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';

const SECTION_COLORS = [
  '#356477', // Soft Blue
  '#ba0000', // Red
  '#ccff00', // Lime
  '#aa00ff', // Purple
  '#ffaa00'
];

const DigitalCore = ({ scrollContainerRef, isVisible = true }) => {
  const meshRef = useRef();
  const materialRef = useRef();
  const lightRef = useRef();
  
  const [hovered, setHover] = useState(false);
  const lastVisibleTime = useRef(0);
  
  const targetColor = useMemo(() => new THREE.Color(), []);

  const [geometryArgs, setGeometryArgs] = useState([1.5, 64, 64]);

  useEffect(() => {
      const handleResize = () => {
          if (window.innerWidth < 768) {
              setGeometryArgs([1.5, 32, 32]);
          } else {
              setGeometryArgs([1.5, 64, 64]);
          }
      };
      
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isVisible && meshRef.current) {
      meshRef.current.visible = true;
      if (lastVisibleTime.current === 0 || Date.now() - lastVisibleTime.current > 5000) {
        meshRef.current.scale.setScalar(1.5);
        if (materialRef.current) {
          materialRef.current.distort = 0.2;
          materialRef.current.wireframe = true;
        }
      }
    }
    if (isVisible) {
      lastVisibleTime.current = Date.now();
    }
  }, [isVisible]);

  useFrame((state, delta) => {
    if (!meshRef.current || !materialRef.current || !isVisible) return;

    const time = state.clock.elapsedTime;
    
    let currentScale = 1.5;
    
    const appearDuration = 3.0; 

    if (time < appearDuration) {
        const p = time / appearDuration;
        
        if (p < 0.3) {
            currentScale = (p / 0.3) * 0.2;
            materialRef.current.distort = 1.0;
        } else {
            const p2 = (p - 0.3) / 0.7;
            const ease = 1 - Math.pow(1 - p2, 3);
            currentScale = 0.2 + (ease * 1.3);
            
            materialRef.current.distort = 1.0 - (ease * 0.8);
        }

    }

    materialRef.current.wireframe = true;

    meshRef.current.rotation.x += delta * 0.2;
    meshRef.current.rotation.y += delta * 0.3;

    let scrollProgress = 0;
    let colorIndex = 0;
    let colorLerp = 0;

    if (scrollContainerRef?.current) {
        const scrollY = scrollContainerRef.current.scrollTop;
        const scrollH = scrollContainerRef.current.scrollHeight;
        const visibleH = scrollContainerRef.current.clientHeight;
        
        const maxScroll = scrollH - visibleH;
        scrollProgress = maxScroll > 0 ? scrollY / maxScroll : 0;

        const exactSection = Math.max(0, scrollY / visibleH); 
        colorIndex = Math.floor(exactSection);
        colorLerp = exactSection % 1; 

        if (colorIndex >= SECTION_COLORS.length - 1) {
            colorIndex = SECTION_COLORS.length - 2;
            colorLerp = 1; 
        }
        
        meshRef.current.rotation.y += scrollProgress * 2 * delta;
    }

    if (hovered) {
        targetColor.set('#ffffff');
    } else {
        const c1 = new THREE.Color(SECTION_COLORS[colorIndex] || SECTION_COLORS[0]);
        const c2 = new THREE.Color(SECTION_COLORS[colorIndex + 1] || SECTION_COLORS[0]);
        targetColor.copy(c1).lerp(c2, colorLerp);
    }
    
    materialRef.current.color.lerp(targetColor, delta * 5);
    materialRef.current.emissive.lerp(targetColor, delta * 5);
    
    if(lightRef.current) {
        lightRef.current.color.lerp(targetColor, delta * 5);
    }

    const pulse = 1 + Math.sin(time * 2) * 0.05 + (scrollProgress * 0.2);
    
    const lerpFactor = delta * 5;

    let targetY = 0;
    let targetScale = 1.5;
    
    if (scrollContainerRef?.current) {
        const scrollY = scrollContainerRef.current.scrollTop;
        const visibleH = scrollContainerRef.current.clientHeight;
        
        const headerProgress = Math.min(scrollY / (visibleH * 0.8), 1);
        
        targetY = headerProgress * 2.2; 
        
        targetScale = 1.5 - (headerProgress * 1.25);
    }

    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, lerpFactor);

    let scaleMultiplier = 1;
    if (time < appearDuration) {
        scaleMultiplier = 1;
    } else {
        currentScale = targetScale;
    }
    
    const nextScale = THREE.MathUtils.lerp(meshRef.current.scale.x, currentScale * pulse, lerpFactor);
    meshRef.current.scale.setScalar(nextScale);
    
    
    if (time >= appearDuration) {
        const normalDistort = 0.2;
        materialRef.current.distort = normalDistort + (scrollProgress * 0.2);
    }

  });

  return (
    <group>
      <Sphere ref={meshRef} args={geometryArgs} onPointerOver={() => setHover(true)} onPointerOut={() => setHover(false)}>
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
