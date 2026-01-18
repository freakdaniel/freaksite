import { useState, useEffect } from 'react';

const GlitchSwapControl = ({ items, interval = 4000 }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isGlitching, setIsGlitching] = useState(false);
    
    const [glitchState, setGlitchState] = useState({
        clipPath1: 'inset(0 0 0 0)',
        clipPath2: 'inset(0 0 0 0)',
        translate: '0px 0px',
        skew: '0deg',
        filter: 'none',
        opacity: 1
    });

    useEffect(() => {
        const timer = setInterval(() => {
            setIsGlitching(true);
            
            let count = 0;
            const maxCounts = 12;
            
            const glitchInterval = setInterval(() => {
                count++;

                const top1 = Math.random() * 100;
                const bottom1 = Math.random() * 100;
                const insetTop1 = Math.min(top1, bottom1);
                const insetBottom1 = 100 - Math.max(top1, bottom1);

                const top2 = Math.random() * 100;
                const bottom2 = Math.random() * 100;
                const insetTop2 = Math.min(top2, bottom2);
                const insetBottom2 = 100 - Math.max(top2, bottom2);
                
                setGlitchState({
                    clipPath1: `inset(${insetTop1}% 0 ${insetBottom1}% 0)`,
                    clipPath2: `inset(${insetTop2}% 0 ${insetBottom2}% 0)`,
                    translate: `${(Math.random() - 0.5) * 20}px ${(Math.random() - 0.5) * 20}px`,
                    skew: `${(Math.random() - 0.5) * 10}deg`,
                    filter: `brightness(${1 + Math.random()}) contrast(${1 + Math.random()})`,
                    opacity: 0.7 + Math.random() * 0.3
                });

                if (count === 6) {
                    setCurrentIndex((prev) => (prev + 1) % items.length);
                }

                if (count >= maxCounts) {
                    clearInterval(glitchInterval);
                    setIsGlitching(false);
                    setGlitchState({
                        clipPath1: 'inset(0 0 0 0)',
                        clipPath2: 'inset(0 0 0 0)',
                        translate: '0px 0px',
                        skew: '0deg',
                        filter: 'none',
                        opacity: 1
                    });
                }
            }, 50);

        }, interval);

        return () => clearInterval(timer);
    }, [items.length, interval]);

    const activeItem = items[currentIndex];

    return (
        <div className="relative w-full h-full overflow-hidden rounded-xl">
            
            {/* Main Content */}
            <div 
                className="w-full h-full relative z-20 bg-[#0a0a0a]"
                style={{
                    transform: isGlitching ? `translate(${glitchState.translate}) skew(${glitchState.skew})` : 'none',
                    filter: isGlitching ? glitchState.filter : 'none',
                    opacity: isGlitching ? glitchState.opacity : 1,
                    transition: isGlitching ? 'none' : 'opacity 0.2s',
                }}
            >
                {activeItem}
            </div>

            {/* Glitch RGB / Ghost Layers */}
            {isGlitching && (
                <>
                    {/* Cyan/Blue Shift */}
                    <div 
                        className="absolute inset-0 w-full h-full z-10 pointer-events-none"
                        style={{
                            transform: `translate(-10px, 0)`,
                            clipPath: glitchState.clipPath1,
                            opacity: 0.8,
                            filter: 'blur(0.5px) brightness(1.5)',
                        }}
                    >
                         <div className="w-full h-full opacity-70 sepia-[.5] hue-rotate-180 saturate-[5] contrast-[2]">
                            {activeItem}
                         </div>
                    </div>

                    {/* Red/Purple Shift */}
                    <div 
                        className="absolute inset-0 w-full h-full z-10 pointer-events-none"
                        style={{
                            transform: `translate(10px, 0)`,
                            clipPath: glitchState.clipPath2,
                            opacity: 0.8,
                            filter: 'blur(0.5px)',
                        }}
                    >
                         <div className="w-full h-full opacity-70 sepia-[.5] hue-rotate-[-50deg] saturate-[5] contrast-[2]">
                            {activeItem}
                         </div>
                    </div>

                    {/* Flash Overlay */}
                    <div 
                        className="absolute inset-0 bg-white/20 z-30 pointer-events-none mix-blend-overlay"
                        style={{
                            clipPath: glitchState.clipPath1,
                            display: Math.random() > 0.5 ? 'block' : 'none'
                        }}
                    />

                    {/* Scanlines / Noise Texture */}
                    <div className="absolute inset-0 pointer-events-none z-40 bg-[repeating-linear-gradient(transparent,transparent_2px,#000_3px)] opacity-20" />
                </>
            )}
        </div>
    );
};

export default GlitchSwapControl;