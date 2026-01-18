import { useState, useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Float, Torus, Preload } from '@react-three/drei';
import * as THREE from 'three';
import { useSpring, animated } from '@react-spring/three';
import { AnimatePresence, motion } from 'framer-motion';

const useGlowTexture = () => {
    return useMemo(() => {
        const canvas = document.createElement('canvas');
        canvas.width = 128;
        canvas.height = 128;
        const context = canvas.getContext('2d');
        const gradient = context.createRadialGradient(64, 64, 0, 64, 64, 64);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.4)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        context.fillStyle = gradient;
        context.fillRect(0, 0, 128, 128);
        return new THREE.CanvasTexture(canvas);
    }, []);
};

const BigPlanet = ({ color }) => {
    const meshRef = useRef();
    const wireframeRef = useRef();
    const glowTexture = useGlowTexture();
    
    const { animatedColor, animatedEmissive } = useSpring({
        animatedColor: color,
        animatedEmissive: color,
        config: { mass: 1, tension: 120, friction: 30 }
    });

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 0.1;
        }
        if (wireframeRef.current) {
            wireframeRef.current.rotation.y -= delta * 0.05;
            wireframeRef.current.rotation.x += delta * 0.02;
        }
    });

    return (
        <group scale={[1, 1, 1]}>
            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.4}>
                {/* Core Mesh */}
                <animated.mesh ref={meshRef}>
                    <sphereGeometry args={[1, 64, 64]} />
                    <animated.meshStandardMaterial
                        color="#111"
                        metalness={0.8}
                        roughness={0.2}
                        emissive={animatedEmissive}
                        emissiveIntensity={0.2}
                    />
                </animated.mesh>

                {/* Wireframe Shell */}
                <animated.mesh ref={wireframeRef} scale={[1.05, 1.05, 1.05]}>
                    <sphereGeometry args={[1, 24, 24]} />
                    <animated.meshBasicMaterial
                        color={animatedColor}
                        wireframe
                        transparent
                        opacity={0.15}
                    />
                </animated.mesh>
                
                {/* Orbital Rings */}
                <group rotation={[Math.PI / 3, 0, 0]}>
                     <Torus args={[1.4, 0.01, 16, 100]}>
                        <animated.meshBasicMaterial color={animatedColor} transparent opacity={0.3} />
                    </Torus>
                </group>
                <group rotation={[-Math.PI / 4, 0, 0]}>
                     <Torus args={[1.6, 0.005, 16, 100]}>
                        <animated.meshBasicMaterial color={animatedColor} transparent opacity={0.1} />
                    </Torus>
                </group>

                {/* Glow Sprite */}
                 <animated.sprite scale={[3.5, 3.5, 1]}>
                    <animated.spriteMaterial 
                        map={glowTexture} 
                        color={animatedColor} 
                        transparent 
                        opacity={0.2} 
                        blending={THREE.AdditiveBlending} 
                        depthWrite={false} 
                    />
                </animated.sprite>
            </Float>
        </group>
    );
};

const CategoryButton = ({ active, onClick, title, activeColor }) => (
    <button
        onClick={onClick}
        className={`
            group w-full text-right h-10 pr-4 text-md font-bold tracking-widest transition-colors duration-200 relative z-20 flex items-center justify-end font-sync
            ${active ? 'text-white' : 'text-white/40 hover:text-white/80'}
        `}
        style={{ color: active ? activeColor : undefined }}
    >
        {title}
        {/* Active Indicator Dot */}
        {active && (
            <motion.div 
                layoutId="cat-indicator"
                className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-current shadow-[0_0_8px_currentColor]"
            />
        )}
    </button>
);

const TechButton = ({ active, onClick, item }) => (
    <div className="relative h-10 flex items-center">
        {/* Active Dot */}
         {active && (
             <motion.div
                layoutId="active-dot"
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-current shadow-[0_0_8px_currentColor] z-20"
                style={{ color: item.hexColor }}
            />
        )}

        <button
            onClick={onClick}
            className={`
                w-full text-left transition-all duration-300 flex items-center gap-3 relative z-20 pl-5
                ${active ? 'opacity-100' : 'opacity-40 hover:opacity-80 hover:translate-x-1'}
            `}
        >
            <span 
                className={`text-lg tracking-wide ${active ? 'text-white font-bold' : 'text-gray-400 font-regular'}`}
            >
                {item.name}
            </span>
        </button>
    </div>
);

const CyberConnector = ({ activeIndex, targetIndex, startColor, endColor, catCount, techCount }) => {
    const catItemHeight = 40;
    const catGap = 24;
    const containerHeight = 300;

    const totalCatListHeight = (catCount * catItemHeight) + (Math.max(0, catCount - 1) * catGap);
    const catTopPad = (containerHeight - totalCatListHeight) / 2;
    
    const startY = catTopPad + (activeIndex * (catItemHeight + catGap)) + (catItemHeight / 2);

    const techItemHeight = 40;
    const techGap = 12;
    
    const totalTechListHeight = (techCount * techItemHeight) + (Math.max(0, techCount - 1) * techGap);
    const techTopPad = (containerHeight - totalTechListHeight) / 2;

    const endY = techTopPad + (targetIndex * (techItemHeight + techGap)) + (techItemHeight / 2);
    
    const midX = 20;
    const width = 40;

    const uniqueId = `grad-${activeIndex}-${targetIndex}`;

    return (
        <svg className="absolute top-0 left-full w-10 h-full pointer-events-none overflow-visible z-0" style={{ transform: 'translateX(-4px)' }}>
            <defs>
                 <linearGradient id={uniqueId} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="40" y2="0">
                    <stop offset="0%" stopColor={startColor} />
                    <stop offset="100%" stopColor={endColor} />
                 </linearGradient>
            </defs>
            <motion.path
                d={`M 0,${startY} L ${midX},${startY} L ${midX},${endY} L ${width},${endY}`}
                fill="none"
                stroke={`url(#${uniqueId})`}
                strokeWidth="1.5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                exit={{ pathLength: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                style={{ filter: `drop-shadow(0 0 4px ${endColor})` }}
            />
        </svg>
    );
};

const TechUniverse = ({ groups, accentColor }) => {
    const [activeCatIndex, setActiveCatIndex] = useState(0);
    const [activeTechIndex, setActiveTechIndex] = useState(0);

    const activeGroup = groups[activeCatIndex];
    const activeTech = activeGroup.items[activeTechIndex] || activeGroup.items[0];

    useEffect(() => {
        setActiveTechIndex(0);
    }, [activeCatIndex]);

    return (
        <div className="w-full flex flex-col md:flex-row min-h-[300px] relative items-center justify-center gap-0 md:gap-0 px-4">
            {/* Categories Container */}
            <div className="flex relative h-[300px]">
                {/* Categories List */}
                <div className="w-32 flex flex-col justify-center gap-6 relative z-10 h-full">
                    {groups.map((group, idx) => (
                        <CategoryButton
                            key={idx}
                            title={group.title}
                            active={idx === activeCatIndex}
                            onClick={() => setActiveCatIndex(idx)}
                            activeColor={accentColor}
                        />
                    ))}
                </div>

                {/* Connector Layer */}
                <div className="relative w-0"> 
                    <AnimatePresence mode="wait">
                        <CyberConnector 
                            key={`${activeCatIndex}-${activeTechIndex}`} 
                            activeIndex={activeCatIndex} 
                            targetIndex={activeTechIndex}
                            startColor={accentColor}
                            endColor={activeTech.hexColor}
                            catCount={groups.length}
                            techCount={activeGroup.items.length}
                        />
                    </AnimatePresence>
                </div>
            </div>

            {/* Technologies */}
            <div className="w-48 flex flex-col justify-center pl-10 h-[300px] relative">
                <div className="flex flex-col gap-3 relative">
                     <AnimatePresence mode="wait">
                        <motion.div
                            key={activeCatIndex}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="flex flex-col gap-3"
                        >
                            {activeGroup.items.map((item, idx) => (
                                <TechButton
                                    key={item.name}
                                    item={item}
                                    active={idx === activeTechIndex}
                                    onClick={() => setActiveTechIndex(idx)}
                                />
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Planet */}
            <div className="relative w-full md:w-[300px] h-[300px]">
                <Canvas camera={{ position: [0, 0, 5], fov: 45 }} gl={{ alpha: true }}>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
                    <pointLight position={[-10, 0, -5]} intensity={5} color={activeTech.hexColor} distance={20} />
                    
                    <BigPlanet color={activeTech.hexColor} />
                    <Preload all />
                </Canvas>
            </div>

            {/* Description */}
            <div className="w-full md:w-80 flex flex-col justify-start z-20 md:pl-8 h-full">
                 <AnimatePresence mode="wait">
                    <motion.div 
                        key={activeTech.name}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col gap-4"
                    >
                        {/* Header */}
                        <div className="flex items-center gap-4">
                            <div 
                                className="p-3 rounded-md bg-white/5 border border-white/10"
                                style={{ borderColor: `${activeTech.hexColor}33`, backgroundColor: `${activeTech.hexColor}11` }}
                            >
                                {activeTech.icon && (
                                    <activeTech.icon 
                                        size={24} 
                                        color={activeTech.hexColor} 
                                    />
                                )}
                            </div>
                             <h2 className="text-3xl font-bold tracking-tight text-white mb-0">
                                {activeTech.name}
                             </h2>
                        </div>
                        
                        {/* Detailed Description */}
                        <div className="relative pl-4 border-l border-white/10">
                            <p className="text-gray-400 leading-relaxed text-sm font-light">
                                {activeTech.description || "Core system technology for modern web development. Provides essential functionality and performance optimization."}
                            </p>
                            
                            {/* Read More */}
                           {activeTech.url && (
                                <a 
                                    href={activeTech.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="mt-4 inline-flex items-center gap-2 text-xs font-bold tracking-widest hover:text-white transition-colors group"
                                    style={{ color: activeTech.hexColor }}
                                >
                                    <span className="border-b border-dashed border-current pb-0.5 group-hover:border-solid">READ MORE</span>
                                    <svg className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </a>
                           )}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default TechUniverse;
