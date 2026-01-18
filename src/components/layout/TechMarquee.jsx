import { useRef, useState } from "react";
import { motion, useAnimationFrame, useMotionValue, AnimatePresence } from "framer-motion";
import TechCard from "../cards/TechCard";
import { Sparkles, Code2, Terminal, Zap } from 'lucide-react';

const Separator = ({ color = "currentColor" }) => {
    return (
        <div 
            className="flex items-center justify-center w-12 shrink-0 opacity-40"
            style={{ color: color }}
        >
            <Sparkles size={16} />
        </div>
    )
}

const TechMarquee = ({ groups, accentColor = "#ffffff" }) => {
    const [activeTitle, setActiveTitle] = useState(groups[0]?.title || "");
    const containerRef = useRef(null);
    const stripRef = useRef(null);
    
    const allGroups = [...groups, ...groups, ...groups, ...groups]; 

    const baseVelocity = -30;
    const x = useMotionValue(0);
    
    useAnimationFrame((t, delta) => {
        if (!stripRef.current || !containerRef.current) return;
        
        let moveBy = baseVelocity * (delta / 1000);
        
        const stripWidth = stripRef.current.scrollWidth / 4;
        let newX = x.get() + moveBy;
        
        if (newX <= -stripWidth) {
            newX = 0; 
        }
        
        x.set(newX);
        
        const containerRect = containerRef.current.getBoundingClientRect();
        const centerX = containerRect.left + containerRect.width / 2;
        
        const containerChildren = stripRef.current.children;
        
        for (let wrapper of containerChildren) {
             const groupEl = wrapper.firstElementChild;
             if(!groupEl || !groupEl.dataset.title) continue;

             const rect = groupEl.getBoundingClientRect();
             
             if (rect.left <= centerX && rect.right >= centerX) {
                const title = groupEl.dataset.title;
                if (title && title !== activeTitle) {
                    setActiveTitle(title);
                }
                break;
             }
        }

        const cards = stripRef.current.querySelectorAll('.tech-card-wrapper');
        
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const cardCenter = rect.left + rect.width/2;
            const dist = Math.abs(cardCenter - centerX);
            
            const range = 100;
            
            const techCard = card.firstElementChild; 
            if(techCard) {
                if(dist < range) {
                     techCard.classList.add('forced-active');
                     const scale = 1 + (0.05 * (1 - dist/range)); 
                     techCard.style.transform = `scale(${scale})`;
                } else {
                     techCard.classList.remove('forced-active');
                     techCard.style.transform = 'scale(1)';
                }
            }
        });
    });

    return (
        <div className="w-full h-full flex flex-col relative" ref={containerRef}>
            {/* Dynamic Header */}
            <div className="text-[10px] ml-6 font-sync tracking-widest text-white/40 mb-0 pl-1 h-4 flex items-end relative overflow-hidden shrink-0">
                 <AnimatePresence mode="wait">
                 <motion.div
                    key={activeTitle}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 flex items-end"
                 >
                    {activeTitle}
                 </motion.div>
                 </AnimatePresence>
            </div>
            
            {/* Moving Strip */}
            <div 
                className="flex-1 overflow-hidden relative w-full rounded-xl"
                 style={{
                    maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
                    WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
                }}
            > 
                <motion.div 
                    ref={stripRef}
                    className="flex absolute left-0 top-0 h-full items-center"
                    style={{ x }}
                >
                    {allGroups.map((group, groupIndex) => (
                         <div key={`group-wrapper-${groupIndex}`} className="flex items-center shrink-0">
                            
                            {/* Group */}
                            <div 
                                className="flex gap-3 shrink-0" 
                                data-title={group.title}
                            >
                                {group.items.map((item, itemIndex) => (
                                    <div key={itemIndex} className="w-[180px] h-full shrink-0 tech-card-wrapper transition-transform duration-100 ease-linear">
                                       <TechCard {...item} />
                                    </div>
                                ))}
                            </div>
                            
                            {/* Separator */}
                            <div className="px-3 shrink-0">
                                <Separator color={accentColor} />
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default TechMarquee;