import { MapPin, Link as LinkIcon } from 'lucide-react';

const ProfileCard = () => {
    return (
        <div className="h-full bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-[150%] h-[150%] bg-linear-to-b from-purple-500/10 via-transparent to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 group-hover:bg-purple-500/20 transition-colors duration-700" />

            <div className="relative z-10">

                <h2 className="text-3xl font-bold text-white mb-1 font-sync max-sm:text-xl">DANIEL FREAK</h2>
                <p className="text-white/60 text-base mb-4 max-sm:text-sm font-sans">Full-Stack Developer & UI Lover</p>

                <div className="flex flex-wrap gap-4 text-sm text-white/40 mb-6 justify-start font-sans">
                    <div className="flex items-center gap-1">
                        <MapPin size={14} />
                        <span >Earth, C-137</span>
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-1">
                <LinkIcon size={14} />
                <a href="https://freaksite.link" className="hover:text-white transition-colors">freaksite.link</a>
            </div>
        </div>
    );
};

export default ProfileCard;