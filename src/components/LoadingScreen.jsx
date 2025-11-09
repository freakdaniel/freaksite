import { useState, useEffect } from 'react';
import BlurText from './text/BlurText';
import '../index.css'
import AnimatedContent from './animations/AnimatedContent';

const LoadingScreen = ({ logoStr, children }) => {
    const [phase, setPhase] = useState('logo');
    const logoText = logoStr;
    const logoTextAnimDuration = logoText.length * 100;
    const logoAppearDuration = logoTextAnimDuration / 1000;
    const logoVisibleDuration = logoAppearDuration * 2.5;
    const logoDisappearDuration = logoAppearDuration;
    const logoTotalAnimationTime = (logoAppearDuration * 2 + logoVisibleDuration + logoDisappearDuration) * 1000;

    useEffect(() => {
        if (phase === 'logo') {
            const timer = setTimeout(() => {
                setPhase('content');;
            }, logoTotalAnimationTime); 
            return () => clearTimeout(timer);
        }
    }, [phase]);

    return (
        <div className="overflow-hidden h-screen w-screen flex justify-center items-center">
            {phase === 'logo' && (
                <AnimatedContent
                    distance={150}
                    initialOpacity={0}
                    direction="vertical"
                    duration={logoAppearDuration}
                    ease="power3.out"
                    animateOpacity
                    scale={1.1}
                    threshold={0.2}
                    className="min-h-screen flex"
                    disappearAfter={logoVisibleDuration} 
                    disappearDuration={logoDisappearDuration}
                >
                    <BlurText
                        text={logoText}
                        intensity={1.5}
                        color="#ffffff"
                        className="text-5xl font-bold tracking-wider font-moc text-neutral-50"
                        animateBy="letters"
                        direction="top"
                        delay={100}
                    />
                </AnimatedContent>
            )}

            {phase === 'content' && (
                children
            )}
        </div>
    );
};

export default LoadingScreen;