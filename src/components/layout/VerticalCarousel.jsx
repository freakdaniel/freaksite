import { useRef, useEffect } from "react";
import { motion } from "framer-motion";

const VerticalCarousel = ({ children, className = "" }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleScroll = () => {
            const items = container.querySelectorAll('.carousel-item');
            const containerRect = container.getBoundingClientRect();
            const containerCenter = containerRect.top + containerRect.height / 2;
            
            let closestItem = null;
            let minDistance = Infinity;

            items.forEach((item) => {
                const itemRect = item.getBoundingClientRect();
                const itemCenter = itemRect.top + itemRect.height / 2;
                const distance = Math.abs(containerCenter - itemCenter);
                
                if (distance < minDistance) {
                    minDistance = distance;
                    closestItem = item;
                }

                const maxDist = containerRect.height / 2;
                const tolerance = 60; 
                const effectiveDistance = Math.max(0, distance - tolerance);

                let normalizedDist = Math.min(effectiveDistance / maxDist, 1);
                
                const scale = 1 - (normalizedDist * 0.15);
                const opacity = 1 - (normalizedDist * 0.5);

                const blur = normalizedDist * 1; 

                item.style.transform = `scale(${scale})`;
                item.style.opacity = opacity;
                item.style.filter = `blur(${blur}px)`;
            });

            items.forEach(item => {
                if (item === closestItem) {
                    item.classList.add('forced-active');
                } else {
                    item.classList.remove('forced-active');
                }
            });
        };

        container.addEventListener('scroll', handleScroll);
        
        handleScroll();

        return () => container.removeEventListener('scroll', handleScroll);
    }, [children]);

    return (
        <div 
            className={`relative overflow-y-auto scrollbar-hide snap-y snap-mandatory py-10 ${className}`} 
            ref={containerRef}
            style={{ 
                maskImage: 'linear-gradient(to bottom, transparent, black 5%, black 95%, transparent)',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 5%, black 95%, transparent)'
             }}
        >
            <div className="flex flex-col gap-6 px-4 pb-20">
                {children}
            </div>
        </div>
    );
};

export default VerticalCarousel;