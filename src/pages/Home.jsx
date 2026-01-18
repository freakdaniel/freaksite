import AnimatedContent from '../components/animations/AnimatedContent';
import TextPressure from "../components/text/TextPressure";
import Scene from '../components/3d/Scene';
import TextType from '../components/text/TextType';
import SplitText from '../components/text/SplitText';
import DecryptedText from '../components/text/DecryptedText';
import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProfileCard from '../components/cards/ProfileCard';
import SocialCard from '../components/cards/SocialCard';
import SpotifyCard from '../components/cards/SpotifyCard';
import TechCard from '../components/cards/TechCard';
import StatsCard from '../components/cards/StatsCard';
import SectionHeader from '../components/layout/SectionHeader';
import LearningCard from '../components/cards/LearningCard';
import ProjectCard from '../components/cards/ProjectCard';
import MiniProjectCard from '../components/cards/MiniProjectCard';
import TechUniverse from '../components/layout/TechUniverse';
import GlitchSwapControl from '../components/layout/GlitchSwapControl';
import TechMarquee from '../components/layout/TechMarquee';
import MobileTabSwitcher from '../components/layout/MobileTabSwitcher';
import * as THREE from 'three';
import { Code2, Sparkles, Briefcase } from 'lucide-react';
import { SECTIONS, SOCIALS, TECH, TEXT } from '../constants/colors';
import {
    SiGithub,
    SiTelegram,
    SiInstagram,
    SiX,
    SiReact,
    SiNodedotjs,
    SiTypescript,
    SiTailwindcss,
    SiDotnet,
    SiDocker,
    SiMysql,
    SiMongodb,
    SiVuedotjs,
    SiWebstorm,
    SiFigma,
    SiIntellijidea,
    SiLinux,
    SiCplusplus,
    SiGraphql
} from '@icons-pack/react-simple-icons';

import VerticalCarousel from '../components/layout/VerticalCarousel';

const SECTION_COLORS = [
    SECTIONS.MAIN, // Soft Blue
    SECTIONS.ABOUT, // Red
    SECTIONS.TECH, // Lime
    SECTIONS.PROJECTS, // Orange
    SECTIONS.SOCIALS, // Purple
];

export default function Home() {
    const scrollRef = useRef(null);
    const [accentColor, setAccentColor] = useState(SECTION_COLORS[0]);
    const [activeAboutTab, setActiveAboutTab] = useState('profile');
    const [activeProjectTab, setActiveProjectTab] = useState('created');

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        const handleScroll = () => {
            const scrollY = el.scrollTop;
            const visibleH = el.clientHeight;

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

    const TECH_GROUPS = [
        {
            title: "FRONTEND",
            items: [
                { name: "React", description: "A library for building user interfaces. Specialized in component-based architecture and state management", icon: SiReact, hexColor: TECH.REACT, url: "https://react.dev" },
                { name: "TS", description: "A typed superset of JavaScript that adds static typing to enhance code quality and maintainability", icon: SiTypescript, hexColor: TECH.TYPESCRIPT, url: "https://www.typescriptlang.org" },
                { name: "Tailwind", description: "A utility-first CSS framework for rapidly building custom user interfaces directly in markup", icon: SiTailwindcss, hexColor: TECH.TAILWIND, url: "https://tailwindcss.com" },
                { name: "Vue", description: "The Progressive JavaScript Framework. Versatile and performant for building web UIs", icon: SiVuedotjs, hexColor: TECH.VUE, url: "https://vuejs.org" },
            ]
        },
        {
            title: "BACKEND",
            items: [
                { name: "Node.js", description: "JavaScript runtime built on Chrome's V8 engine. Designed for building scalable network applications", icon: SiNodedotjs, hexColor: TECH.NODE, url: "https://nodejs.org" },
                { name: ".NET", description: "Cross-platform developer platform for building anything from web to mobile to cloud apps", icon: SiDotnet, hexColor: TECH.DOTNET, url: "https://dotnet.microsoft.com" },
                { name: "MySQL", description: "Open-source relational database management system. Reliable, scalable, and secure data storage", icon: SiMysql, hexColor: TECH.MYSQL, url: "https://www.mysql.com" },
                { name: "MongoDB", description: "The source-available cross-platform document-oriented database program", icon: SiMongodb, hexColor: TECH.MONGODB, url: "https://www.mongodb.com" },
            ]
        },
        {
            title: "SOFTWARE",
            items: [
                { name: "WS", description: "The smartest JavaScript IDE. Powerful coding assistance for modern web development", icon: SiWebstorm, hexColor: TECH.WEBSTORM, url: "https://www.jetbrains.com/webstorm/" },
                { name: "Figma", description: "The collaborative interface design tool. Connects everyone in the design process", icon: SiFigma, hexColor: TECH.FIGMA, url: "https://www.figma.com" },
                { name: "IDEA", description: "The Capable and Ergonomic IDE for JVM. Maximizes developer productivity", icon: SiIntellijidea, hexColor: TECH.INTELLIJ, url: "https://www.jetbrains.com/idea/" },
                { name: "Linux", description: "Open source operating system. The foundation of modern infrastructure", icon: SiLinux, hexColor: TECH.LINUX, url: "https://www.linux.org" },
            ]
        }
    ];

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
                                        <div className="flex justify-center mb-2">
                                            <img
                                                src="/logo_filled.svg"
                                                alt="Daniel Freak Logo"
                                                className="w-24 h-24 md:w-32 md:h-32 object-contain opacity-60"
                                            />
                                        </div>

                                        <TextPressure
                                            text="DANIEL FREAK"
                                            flex={true}
                                            alpha={false}
                                            stroke={false}
                                            width={true}
                                            weight={true}
                                            italic={true}
                                            textColor={TEXT.MAIN_TITLE}
                                            strokeColor={TEXT.STROKE}
                                            className="select-none max-w-full text-balance"
                                            style={{
                                                fontSize: 'max(3rem, min(10rem, 10vw))',
                                            }}
                                        />

                                        <TextType
                                            text={["WEB DEVELOPER", "BACKEND DEVELOPER", "AN AWESOME PERSON (✿◦’ᴗ˘◦)♡"]}
                                            typingSpeed={80}
                                            deletingSpeed={25}
                                            className="mt-12 sm:mt-12 text-white/70 select-none max-w-full font-sync"
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

                    <div className="relative z-10 w-full h-full flex flex-col items-center justify-start pt-40 max-sm:pt-28">

                        {/* Visual Connection Line */}
                        <div
                            className="w-px h-24 absolute top-0 left-1/2 -translate-x-1/2 opacity-50"
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
                            {/* HUD Container */}
                            <SectionHeader
                                accentColor={accentColor}
                                number="01"
                                title="ABOUT ME"
                                description="Developing digital experiences with a focus on motion, interactivity and performance. Currently exploring the boundaries of WebGL and React"
                                icon={Sparkles}
                            >
                                <SplitText
                                    text="No genius is ever spotless. To create something really unique, you must break the rules"
                                    className="text-xl text-white/80 font-sync"
                                    delay={20}
                                    textAlign="left"
                                />
                            </SectionHeader>

                            {/* Main Dashboard */}
                             <div className="w-full">
                                
                                {/* Mobile */}
                                <div className="block lg:hidden w-full px-4">
                                    <MobileTabSwitcher 
                                        id="about-tabs"
                                        activeTab={activeAboutTab} 
                                        onTabChange={setActiveAboutTab} 
                                        tabs={[
                                            { id: 'profile', label: 'PROFILE' },
                                            { id: 'socials', label: 'SOCIAL MEDIA' }
                                        ]}
                                        accentColor={accentColor}
                                    />
                                    
                                    <div className="w-full min-h-[400px]">
                                        <AnimatePresence mode="wait">
                                            {activeAboutTab === 'profile' ? (
                                                <motion.div
                                                    key="profile"
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: 20 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="w-full h-full"
                                                >
                                                    <ProfileCard className="w-full" />
                                                </motion.div>
                                            ) : (
                                                <motion.div
                                                    key="socials"
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -20 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="w-full h-full flex flex-col gap-4"
                                                >
                                                    <div className="grid grid-cols-4 gap-4">
                                                        <SocialCard icon={SiGithub} link="https://github.com/freakdaniel" bgColor={SOCIALS.GITHUB} />
                                                        <SocialCard icon={SiTelegram} link="https://t.me/freakgroup" bgColor={`${SOCIALS.TELEGRAM}33`} iconColor={SOCIALS.TELEGRAM} />
                                                        <SocialCard icon={SiInstagram} link="https://instagram.com/_freakdaniel" gradient={{ from: SOCIALS.INSTAGRAM_FROM, to: SOCIALS.INSTAGRAM_TO }} />
                                                        <SocialCard icon={SiX} link="https://x.com/whoisfreak" bgColor={SOCIALS.X} />
                                                    </div>
                                                    <div className="flex-1">
                                                        <SpotifyCard />
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>

                                {/* Desktop */}
                                <div className="hidden lg:grid lg:grid-cols-3 gap-4 pb-20 w-full">
                                    {/* Col Profile */}
                                    <AnimatedContent
                                        distance={50}
                                        initialOpacity={0}
                                        direction="horizontal"
                                        duration={0.5}
                                        scale={0.9}
                                        threshold={0.2}
                                        className="lg:col-span-1 flex"
                                    >
                                        <ProfileCard />
                                    </AnimatedContent>

                                    {/* Col Content */}
                                    <div className="lg:col-span-2 grid grid-rows-[auto_1fr] gap-4 h-full">
                                        
                                        {/* Social Media*/}
                                        <div className="grid grid-cols-4 gap-4">
                                            <AnimatedContent distance={20} delay={0.1} scale={0.8} threshold={0.2} className="aspect-square w-full">
                                                <SocialCard icon={SiGithub} link="https://github.com/freakdaniel" bgColor={SOCIALS.GITHUB} />
                                            </AnimatedContent>
                                            <AnimatedContent distance={20} delay={0.2} scale={0.8} threshold={0.2} className="aspect-square w-full">
                                                <SocialCard icon={SiTelegram} link="https://t.me/freakgroup" bgColor={`${SOCIALS.TELEGRAM}33`} iconColor={SOCIALS.TELEGRAM} />
                                            </AnimatedContent>
                                            <AnimatedContent distance={20} delay={0.3} scale={0.8} threshold={0.2} className="aspect-square w-full">
                                                <SocialCard icon={SiInstagram} link="https://instagram.com/_freakdaniel" gradient={{ from: SOCIALS.INSTAGRAM_FROM, to: SOCIALS.INSTAGRAM_TO }} />
                                            </AnimatedContent>
                                            <AnimatedContent distance={20} delay={0.4} scale={0.8} threshold={0.2} className="aspect-square w-full">
                                                <SocialCard icon={SiX} link="https://x.com/whoisfreak" bgColor={SOCIALS.X} />
                                            </AnimatedContent>
                                        </div>
        
                                        {/* Spotify */}
                                        <AnimatedContent
                                            distance={50}
                                            initialOpacity={0}
                                            direction="vertical"
                                            delay={0.5}
                                            threshold={0.2}
                                            className="w-full h-full"
                                        >
                                            <SpotifyCard />
                                        </AnimatedContent>
                                    </div>
                                </div>
                            </div>
                            </AnimatedContent>
                    </div>
                </section>

                {/* Skills Section */}
                <section className="min-h-screen w-screen bg-transparent relative snap-start">
                    <div className="relative z-10 w-full h-full flex flex-col items-center justify-start pt-40 max-sm:pt-28 pb-20">

                        {/* Visual Connection Line */}
                        <div
                            className="w-px h-24 absolute top-0 left-1/2 -translate-x-1/2 opacity-50"
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
                            {/* Tech Stack Header */}
                            <SectionHeader
                                accentColor={accentColor}
                                number="02"
                                title="TECH STACK"
                                description="Building modern web applications with a versatile tech stack spanning frontend frameworks, backend systems, and databases"
                                icon={Code2}
                            />

                            {/* Stats & Learning Cards Mobile / Desktop */}
                            <div className="mb-4 w-full h-40">
                                {/* Mobile Glitch */}
                                <div className="block lg:hidden h-full">
                                    <GlitchSwapControl 
                                        items={[
                                            <StatsCard accentColor={accentColor} />,
                                            <LearningCard 
                                                accentColor={accentColor}
                                                technologies={[
                                                    { name: 'C++', icon: SiCplusplus, color: TECH.CPP },
                                                    { name: 'GraphQL', icon: SiGraphql, color: TECH.GRAPHQL }
                                                ]}
                                            />
                                        ]}
                                    />
                                </div>

                                {/* Desktop Grid */}
                                <div className="hidden lg:grid lg:grid-cols-2 gap-12 h-full">
                                     <AnimatedContent distance={15} delay={0.05} scale={0.95} threshold={0.2} className="h-full">
                                        <StatsCard accentColor={accentColor} />
                                    </AnimatedContent>
                                    
                                    <AnimatedContent distance={15} delay={0.1} scale={0.95} threshold={0.2} className="h-full">
                                        <LearningCard 
                                            accentColor={accentColor}
                                            technologies={[
                                                { name: 'C++', icon: SiCplusplus, color: TECH.CPP },
                                                { name: 'GraphQL', icon: SiGraphql, color: TECH.GRAPHQL }
                                            ]}
                                        />
                                    </AnimatedContent>
                                </div>
                            </div>

                            {/* Technologies Mobile / Desktop */}
                            <div className="w-full">
                                {/* Mobile Marquee */}
                                <div className="block lg:hidden w-full h-28 mb-1">
                                    <TechMarquee groups={TECH_GROUPS} accentColor={accentColor} />
                                </div>

                                {/* Desktop Universe */}
                                <div className="hidden lg:block w-full pb-4">
                                    <AnimatedContent
                                        distance={30}
                                        initialOpacity={0}
                                        direction="vertical"
                                        duration={0.8}
                                        delay={0.2}
                                        ease="easeOut"
                                        animateOpacity
                                        threshold={0.3}
                                    >
                                        <TechUniverse groups={TECH_GROUPS} accentColor={accentColor} />
                                    </AnimatedContent>
                                </div>
                            </div>
                        </AnimatedContent>
                    </div>
                </section>

                {/* Projects Section */}
                <section className="min-h-screen w-screen bg-transparent relative snap-start">
                    <div className="relative z-10 w-full h-full flex flex-col items-center justify-start pt-40 max-sm:pt-28 pb-20">

                        {/* Visual Connection Line */}
                        <div
                            className="w-px h-24 absolute top-0 left-1/2 -translate-x-1/2 opacity-50"
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
                            <SectionHeader
                                accentColor={accentColor}
                                number="03"
                                title="PROJECTS"
                                description="A collection of commercial and pet projects. From Telegram bots and game servers to full-stack web applications"
                                icon={Briefcase}
                            />

                            <div className="w-full">
                                {/* Mobile: Tabbed View */}
                                <div className="block lg:hidden w-full px-0">
                                    <div className="px-4 mb-2">
                                        <MobileTabSwitcher 
                                            id="projects-tabs"
                                            activeTab={activeProjectTab} 
                                            onTabChange={setActiveProjectTab} 
                                            tabs={[
                                                { id: 'created', label: 'CREATED' },
                                                { id: 'contributed', label: 'CONTRIBUTED' }
                                            ]}
                                            accentColor={accentColor}
                                        />
                                    </div>

                                    <div className={`w-full transition-all duration-300 ${activeProjectTab === 'created' ? 'h-[500px]' : 'h-[420px]'}`}>
                                        <AnimatePresence mode="wait">
                                            {activeProjectTab === 'created' ? (
                                                <motion.div
                                                    key="created"
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: 20 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="w-full h-full"
                                                >
                                                    <VerticalCarousel className="h-full">
                                                        <div className="carousel-item h-[300px] shrink-0 snap-center transition-all duration-300">
                                                            <ProjectCard 
                                                                title="MPOVT CORP"
                                                                description="Marketing site for OJSC “MPOVT” with multilingual support and rich media. Features polished interactions and visual effects."
                                                                tech={['React', 'TS', 'GSAP', 'Framer']}
                                                                links={{ demo: 'https://mpovt.by/' }}
                                                                color={accentColor}
                                                            />
                                                        </div>

                                                        <div className="carousel-item h-[300px] shrink-0 snap-center transition-all duration-300">
                                                            <ProjectCard 
                                                                title="MATRICACS"
                                                                description="Heavily modified ReHLDS game server with custom AMX Mod X plugins. Includes advanced ban system and rank APIs."
                                                                tech={['Pawn', 'C++', 'MySQL', 'ReAPI']}
                                                                links={{ demo: 'https://matricacs.ru' }}
                                                                color={accentColor}
                                                            />
                                                        </div>

                                                        <div className="carousel-item h-[300px] shrink-0 snap-center transition-all duration-300">
                                                            <ProjectCard 
                                                                title="FREAKSITE"
                                                                description="The personal portfolio you are looking at right now. Built with React and Three.js for immersive 3D background effects."
                                                                tech={['React', 'Three.js', 'R3F']}
                                                                links={{ repo: 'https://github.com/freakdaniel/freaksite', demo: 'https://freaksite.link' }}
                                                                color={accentColor}
                                                            />
                                                        </div>
                                                    </VerticalCarousel>
                                                </motion.div>
                                            ) : (
                                                <motion.div
                                                    key="contributed"
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -20 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="w-full h-full"
                                                >
                                                    <VerticalCarousel className="h-full">
                                                        <div className="carousel-item h-[220px] shrink-0 snap-center w-full px-2">
                                                            <MiniProjectCard 
                                                                title="React Bits"
                                                                description="Added new components to the largest library of animated React components."
                                                                tech="React / Animation"
                                                                link="https://github.com/DavidHDev/react-bits"
                                                                color={accentColor}
                                                                logo="https://github.com/DavidHDev/react-bits/raw/main/src/assets/logos/reactbits-gh-white.svg"
                                                                className="w-full h-full"
                                                            />
                                                        </div>
                                                        <div className="carousel-item h-[220px] shrink-0 snap-center w-full px-2">
                                                            <MiniProjectCard 
                                                                title="Vue Bits"
                                                                description="Contributed to the official Vue port of React Bits library."
                                                                tech="Vue / Animation"
                                                                link="https://github.com/DavidHDev/vue-bits"
                                                                color={accentColor}
                                                                logo="https://github.com/DavidHDev/vue-bits/raw/main/src/assets/logos/vuebits-gh-white.svg"
                                                                className="w-full h-full"
                                                            />
                                                        </div>
                                                    </VerticalCarousel>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>

                                {/* Desktop: Grid */}
                                <div className="hidden lg:grid lg:grid-cols-3 gap-4 w-full">
                                    <AnimatedContent distance={20} delay={0.1} scale={0.95} threshold={0.2} className="h-full">
                                        <ProjectCard 
                                            title="MPOVT CORP"
                                            description="Marketing site for OJSC “MPOVT” with multilingual support and rich media. Features polished interactions and visual effects using Framer Motion and GSAP."
                                            tech={['React', 'TypeScript', 'Chakra UI', 'Framer Motion', 'GSAP', 'Vite']}
                                            links={{ demo: 'https://mpovt.by/' }}
                                            color={accentColor}
                                        />
                                    </AnimatedContent>

                                    <AnimatedContent distance={20} delay={0.2} scale={0.95} threshold={0.2} className="h-full">
                                        <ProjectCard 
                                            title="MATRICACS"
                                            description="Heavily modified ReHLDS game server with custom AMX Mod X plugins. Includes advanced ban system, rank APIs, and web integration via GameCMS."
                                            tech={['Pawn (AMXX)', 'C++', 'MySQL', 'PHP', 'ReAPI']}
                                            links={{ demo: 'https://matricacs.ru' }}
                                            color={accentColor}
                                        />
                                    </AnimatedContent>

                                    <AnimatedContent distance={20} delay={0.3} scale={0.95} threshold={0.2} className="h-full">
                                        <ProjectCard 
                                            title="FREAKSITE"
                                            description="The personal portfolio you are looking at right now. Built with React and Three.js for immersive 3D background effects and smooth animations."
                                            tech={['React', 'Three.js', 'Tailwind', 'R3F', 'Vite']}
                                            links={{ repo: 'https://github.com/freakdaniel/freaksite', demo: 'https://freaksite.link' }}
                                            color={accentColor}
                                        />
                                    </AnimatedContent>

                                    {/* Contrib - Desktop */}
                                    <AnimatedContent distance={20} delay={0.4} scale={0.95} threshold={0.2} className="col-span-3 mt-8">
                                        <div className="text-[10px] font-sync tracking-widest text-white/40 mb-4 pl-1">CONTRIBUTED AT</div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <MiniProjectCard 
                                                title=""
                                                description="The largest & most creative library of animated React components."
                                                tech="React / Animation"
                                                link="https://github.com/DavidHDev/react-bits"
                                                color={accentColor}
                                                className="w-full"
                                                logo="https://github.com/DavidHDev/react-bits/raw/main/src/assets/logos/reactbits-gh-white.svg"
                                            />
                                            <MiniProjectCard 
                                                title=""
                                                description="The official Vue port of React Bits. A large collection of animated VueJS UI components."
                                                tech="Vue / Animation"
                                                link="https://github.com/DavidHDev/vue-bits"
                                                color={accentColor}
                                                className="w-full"
                                                logo="https://github.com/DavidHDev/vue-bits/raw/main/src/assets/logos/vuebits-gh-white.svg"
                                            />
                                        </div>
                                    </AnimatedContent>
                                </div>
                            </div>
                        </AnimatedContent>
                    </div>
                </section>
            </div>
        </>
    )
}