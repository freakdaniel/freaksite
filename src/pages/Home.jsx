import AnimatedContent from '../components/animations/AnimatedContent';
import GlassSurface from '../components/others/GlassSurface';
import TextPressure from "../components/text/TextPressure";
import { PawPrint, Webhook, Frame } from "lucide-react";
import { SiGithub, SiSpotify, SiTelegram, SiInstagram } from "@icons-pack/react-simple-icons"
import AnimatedScale from "../components/animations/AnimatedScale";
import SocialMedia from "../components/SocialMedia";

export default function Home() {
    const socialConfigs = [
        {
            name: 'Telegram',
            url: 'https://t.me/freakdaniel',
            icon: SiTelegram,
            color: 'rgba(42, 171, 238, 0.3)'
        },
        {
            name: 'Instagram',
            url: 'https://instagram.com/_freakdaniel',
            icon: SiInstagram,
            color: 'linear-gradient(to top right, rgba(64, 93, 230, 0.3), rgba(88, 81, 219, 0.3), rgba(131, 58, 180, 0.3))'
        },
        {
            name: 'GitHub',
            url: 'https://github.com/freakdaniel',
            icon: SiGithub,
            color: 'rgba(245, 100, 40, 0.3)'
        },
        {
            name: 'Spotify',
            url: 'https://open.spotify.com/user/317grjblvlenxyyqv6vdxyg47lvq?si=d9a9690a74a64cd8',
            icon: SiSpotify,
            color: 'rgba(29, 185, 84, 0.3)'
        }
    ];

    return (
        <div style={{ height: '100vh', width: '100vw' }}>
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
                <div className=" text-white">
                    <div
                        className="fixed inset-0 bg-cover bg-center filter blur-sm bg-[url(/imgs/riyo.jpg)] w-screen h-screen"
                        style={{
                            transform: 'scale(1.1)'
                        }}
                    />
                    <div className="fixed inset-0 bg-black/40 w-screen h-screen" style={{ transform: 'scale(1.1)' }} />

                    <div className="relative min-h-screen flex flex-col container mx-auto px-4 py-20 flex-1 items-center justify-center text-center">
                        <div className="flex flex-row gap-4">
                            <AnimatedScale>
                                <GlassSurface className="p-1.5" height={50}>
                                    <div className="flex flex-row gap-3 items-center">
                                        <Webhook size={18} style={{ opacity: 0.7 }} />
                                        <p className="text-white/70 text-lg select-none">Web-Developer</p>
                                    </div>
                                </GlassSurface>
                            </AnimatedScale>
                            <AnimatedScale>
                                <GlassSurface className="p-1.5" height={50}>
                                    <div className="flex flex-row gap-3 items-center">
                                        <Frame size={18} style={{ opacity: 0.7 }} />
                                        <p className="text-white/70 text-lg select-none">UI/UX Designer</p>
                                    </div>
                                </GlassSurface>
                            </AnimatedScale>
                            <AnimatedScale>
                                <GlassSurface className="p-1.5" height={50}>
                                    <div className="flex flex-row gap-3 items-center">
                                        <PawPrint size={18} style={{ opacity: 0.7 }} />
                                        <p className="text-white/70 text-lg select-none">Cats Enjoyeer</p>
                                    </div>
                                </GlassSurface>
                            </AnimatedScale>
                        </div>

                        <div>
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
                                    text="FREAKSITE"
                                    flex={true}
                                    alpha={false}
                                    stroke={false}
                                    width={true}
                                    weight={true}
                                    italic={true}
                                    textColor="rgba(255, 255, 255, 0.7)"
                                    strokeColor="#ff0000"
                                    minFontSize={288}
                                    className="select-none"
                                />
                            </AnimatedContent>
                        </div>

                        <SocialMedia configs={socialConfigs} className="mt-4" />
                    </div>
                </div>
            </AnimatedContent>
        </div>
    )
}