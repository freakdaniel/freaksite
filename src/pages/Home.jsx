import AnimatedContent from '../components/animations/AnimatedContent';
import TextPressure from "../components/text/TextPressure";
import Scene from '../components/3d/Scene';
import TextType from '../components/text/TextType';
import BlurText from '../components/text/BlurText';
import SplitText from '../components/text/SplitText';
import DecryptedText from '../components/text/DecryptedText';
import { useRef, useState, useEffect } from 'react';
import ProfileCard from '../components/cards/ProfileCard';
import SocialCard from '../components/cards/SocialCard';
import SpotifyCard from '../components/cards/SpotifyCard';
import * as THREE from 'three';
import {
    SiGithub,
    SiTelegram,
    SiInstagram,
    SiX
} from '@icons-pack/react-simple-icons';

const SECTION_COLORS = [
  '#2f6277c2', // Soft Blue (Main)
  '#ff0044', // Red (About/Profile)
  '#ccff00', // Lime (Tech/Terminal)
  '#aa00ff', // Purple (Socials)
];

export default function Home() {
    const scrollRef = useRef(null);
    const [accentColor, setAccentColor] = useState(SECTION_COLORS[0]);

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        const handleScroll = () => {
             const scrollY = el.scrollTop;
             const visibleH = el.clientHeight;
             
             // Match DigitalCore logic
             const exactSection = Math.max(0, scrollY / visibleH); 
             let colorIndex = Math.floor(exactSection);
             let colorLerp = exactSection % 1; 

             if (colorIndex >= SECTION_COLORS.length - 1) {
                colorIndex = SECTION_COLORS.length - 2;
                colorLerp = 1; 
             }
             
             const c1 = new THREE.Color(SECTION_COLORS[colorIndex]);
             const c2 = new THREE.Color(SECTION_COLORS[colorIndex + 1]);
             const finalColor = c1.lerp(c2, colorLerp);
             
             setAccentColor('#' + finalColor.getHexString());
        };
        
        el.addEventListener('scroll', handleScroll);
        return () => el.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <Scene scrollContainerRef={scrollRef} accentColor={accentColor} />
            <div ref={scrollRef} className='h-screen scroll-smooth snap-y snap-mandatory overflow-x-hidden bg-transparent relative z-10' id="snap-main-container" style={{ overflowY: 'scroll' }}>
                <section className="w-screen h-screen bg-transparent relative snap-center overflow-hidden flex flex-col justify-center">

                <div className="relative z-10 w-full flex-1 flex flex-col justify-center">
                    <AnimatedContent
                        distance={350}
                        reverse={true}
                        initialOpacity={0}
                        direction="vertical"
                        duration={1.2}
                        ease="power3.out"
                        animateOpacity
                        scale={1.5}
                        threshold={0.2}
                    >
                        <div className="flex flex-col container mx-auto px-4 flex-1 items-center justify-center text-center">
                            <div className="w-full max-w-4xl mx-auto">
                                <AnimatedContent
                                    distance={150}
                                    initialOpacity={0}
                                    direction="vertical"
                                    duration={1.4}
                                    ease="power3.out"
                                    animateOpacity
                                    scale={1.2}
                                    threshold={0.2}
                                >
                                    <TextPressure
                                        text="DANIEL FREAK"
                                        flex={true}
                                        alpha={false}
                                        stroke={false}
                                        width={true}
                                        weight={true}
                                        italic={true}
                                        textColor="rgba(255, 255, 255, 0.7)"
                                        strokeColor="#ff0000"
                                        className="select-none max-w-full text-balance"
                                        style={{
                                            fontSize: 'max(3rem, min(10rem, 10vw))',
                                        }}
                                    />

                                    <TextType
                                        text={["WEB DEVELOPER", "BACKEND DEVELOPER", "AN AWESOME PERSON (✿◦’ᴗ˘◦)♡"]}
                                        typingSpeed={80}
                                        deletingSpeed={25}
                                        className="mt-4 sm:mt-6 text-white/70 select-none max-w-full font-sync"
                                        style={{
                                            fontSize: 'max(0.8rem, min(1.5rem, 3vw))'
                                        }}
                                    />
                                </AnimatedContent>
                            </div>
                        </div>
                    </AnimatedContent>
                </div>
            </section>
            
            <section className="min-h-screen w-screen bg-transparent relative snap-start">

                <div className="relative z-10 w-full h-full flex flex-col items-center justify-start pt-32">
                    
                    {/* Visual Connection Line */}
                    <div 
                        className="w-[1px] h-24 absolute top-0 left-1/2 -translate-x-1/2 opacity-50" 
                        style={{ background: `linear-gradient(to bottom, ${accentColor}, transparent)` }}
                    />
                    
                    <AnimatedContent
                        distance={50}
                        scale={0.95}
                        initialOpacity={0}
                        duration={0.8}
                        ease="power3.out"
                        animateOpacity
                        threshold={0.1}
                        className="w-full max-w-6xl px-4"
                    >
                        {/* HUD / Control Panel Container */}
                        <div className="border-t pt-10 mt-10 relative" style={{ borderColor: `${accentColor}33` }}> 
                             {/* Corner Accents */}
                            <div className="absolute top-0 left-0 w-4 h-[1px]" style={{ backgroundColor: accentColor }} />
                            <div className="absolute top-0 right-0 w-4 h-[1px]" style={{ backgroundColor: accentColor }} />
                            
                            {/* Section Number 01 */}
                            <div className="absolute top-0 -translate-y-1/2 left-0 bg-black pr-2 text-3xl font-sync tracking-widest leading-none" style={{ color: accentColor }}>
                                <DecryptedText text="01" speed={100} maxIterations={40} characters="0123456789" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12 text-left mb-6 md:mb-20 shrink-0">
                                <div className="border-l pl-4 md:pl-6 flex flex-col justify-center" style={{ borderColor: `${accentColor}1A` }}>
                                     <h2 className="text-xl md:text-3xl font-sync text-white mb-2 md:mb-4">ABOUT ME</h2>
                                     <p className="text-white/60 text-xs md:text-lg leading-relaxed font-sans line-clamp-3 md:line-clamp-none">
                                        Developing digital experiences with a focus on motion, interactivity and performance. 
                                        Currently exploring the boundaries of WebGL and React
                                     </p>
                                </div>
                                <div className="hidden md:flex border-l pl-6 flex-col justify-center" style={{ borderColor: `${accentColor}1A` }}>
                                     <SplitText
                                        text="No genius is ever spotless. To create something really unique, you must break the rules"
                                        className="text-xl text-white/80 font-sync"
                                        delay={20}
                                        textAlign="left"
                                     />
                                </div>
                            </div>

                            {/* Main Dashboard Grid - Refactored */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 pb-4 md:pb-20 overflow-visible">
                                
                                {/* Col 1: Profile (Tall) */}
                                <AnimatedContent
                                    distance={50}
                                    initialOpacity={0}
                                    direction="horizontal"
                                    duration={0.5}
                                    scale={0.9}
                                    threshold={0.2}
                                    className="lg:col-span-1 h-full"
                                >
                                    <ProfileCard />
                                </AnimatedContent>

                                {/* Col 2 & 3: Content */}
                                <div className="lg:col-span-2 flex flex-col gap-4 md:gap-6">
                                    
                                     {/* Social Grid */}
                                    <div className="grid grid-cols-4 gap-2 md:gap-4 h-full"> 
                                         <AnimatedContent distance={20} delay={0.1} scale={0.8} threshold={0.2} className="aspect-square">
                                            <SocialCard icon={SiGithub} link="https://github.com/freakdaniel" hoverColor="hover:bg-[#24292e]" />
                                         </AnimatedContent>
                                         <AnimatedContent distance={20} delay={0.2} scale={0.8} threshold={0.2} className="aspect-square">
                                            <SocialCard icon={SiTelegram} link="https://t.me/freakgroup" hoverColor="hover:bg-[#26A5E4]/20" color="group-hover:text-[#26A5E4]" />
                                         </AnimatedContent>
                                         <AnimatedContent distance={20} delay={0.3} scale={0.8} threshold={0.2} className="aspect-square">
                                            <SocialCard icon={SiInstagram} link="https://instagram.com/_freakdaniel" hoverColor="hover:bg-gradient-to-br hover:from-[#833AB4]/20 hover:to-[#FD1D1D]/20" color="" />
                                         </AnimatedContent>
                                         <AnimatedContent distance={20} delay={0.4} scale={0.8} threshold={0.2} className="aspect-square">
                                            <SocialCard icon={SiX} link="https://x.com/whoisfreak" hoverColor="hover:bg-black" />
                                         </AnimatedContent>
                                    </div>
    
                                    {/* Music (Full Width) */}
                                    <AnimatedContent
                                        distance={50}
                                        initialOpacity={0}
                                        direction="vertical"
                                        delay={0.5}
                                        threshold={0.2}
                                        className="w-full flex-1 md:min-h-[140px]"
                                    >
                                       <SpotifyCard />
                                    </AnimatedContent>
                                </div>
                            </div>
                        </div>
                    </AnimatedContent>
                </div>
            </section>
        </div>
    </>
    )
}