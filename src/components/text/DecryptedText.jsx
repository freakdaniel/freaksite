import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * DecryptedText
 * 
 * Animates text from random characters to the final text.
 * used for "Matrix" or "Cyberpunk" appearing effects.
 */

const DecryptedText = ({
  text,
  speed = 50,
  maxIterations = 15,
  sequential = true,
  revealDirection = 'start',
  useOriginalCharsOnly = false,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_+[]{}|;:,.<>?',
  className = '',
  parentClassName = '',
  animateOnHover = false,
  ...props
}) => {
  const [displayText, setDisplayText] = useState(text);
  const [isHovering, setIsHovering] = useState(false);
  const [isScrambling, setIsScrambling] = useState(false);
  
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10% 0px -10% 0px" });
  
  useEffect(() => {
    // Only animate if in view or hovering
    if (!isInView && !isHovering) return;

    let interval;
    let currentIteration = 0;

    const startScramble = () => {
        setIsScrambling(true);
        interval = setInterval(() => {
            setDisplayText((prevText) => {
                let nextText = text.split('').map((char, index) => {
                    if (text[index] === ' ') return ' ';
                    
                    // Glitch logic: 
                    // 1. Reveal characters sequentially based on iteration
                    // 2. Random characters for the rest
                    // 3. Occasional "glitch" where already revealed char switches back for a frame
                    
                    if (index < currentIteration) {
                        return text[index];
                    }
                    
                    return characters[Math.floor(Math.random() * characters.length)];
                }).join('');
                
                if (currentIteration >= text.length) {
                    clearInterval(interval);
                    setIsScrambling(false);
                }
                
                // Non-linear progress for more organic feeling
                currentIteration += 1/3; 
                
                return nextText;
            });
            
        }, speed);
    };

    startScramble();

    return () => clearInterval(interval);

  }, [text, speed, maxIterations, sequential, characters, isInView, isHovering]);

  return (
    <span 
        ref={containerRef} 
        className={`inline-block whitespace-nowrap relative ${parentClassName}`} 
        onMouseEnter={() => animateOnHover && setIsHovering(true)}
    >
        <span className={`${className} relative z-10`}>{displayText}</span>
        
        {/* Background Glitch Effect */}
        {isScrambling && (
            <motion.span 
                className={`absolute top-0 left-0 w-full h-full bg-current opacity-10 z-0 ${className}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.5, 0, 0.3, 0] }}
                transition={{ duration: 0.2, repeat: Infinity, repeatType: "mirror" }}
            />
        )}
        
        {/* Color Chromatic Aberration Simulation (Red/Cyan Offset) */}
        {isScrambling && (
            <>
                <span className={`${className} absolute top-0 left-[-2px] text-red-500 opacity-50 mix-blend-screen overflow-hidden h-full z-0 clip-path-random`}>
                    {displayText}
                </span>
                <span className={`${className} absolute top-0 left-[2px] text-cyan-500 opacity-50 mix-blend-screen overflow-hidden h-full z-0 clip-path-random-2`}>
                     {displayText}
                </span>
            </>
        )}
        
    </span>
  );
};

export default DecryptedText;