import { MapPin, Link as LinkIcon } from 'lucide-react';

const ProfileCard = ({ className = "" }) => {
    return (
        <div className={`h-full w-full bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col justify-between relative overflow-hidden group ${className}`}>
            <div className="absolute top-0 right-0 w-[150%] h-[150%] bg-linear-to-b from-purple-500/10 via-transparent to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 group-hover:bg-purple-500/20 transition-colors duration-700" />

            <div className="relative z-10">
                {/* Avatar */}
                <img 
                    src="/imgs/pfp.jpg" 
                    alt="Profile" 
                    className="w-20 h-20 md:w-24 md:h-24 rounded-2xl object-cover border border-white/10 mb-6"
                />
                
                {/* Text Content */}
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-1 font-sync">DANIEL FREAK</h2>
                    <p className="text-white/60 text-sm md:text-base font-sans">Full-Stack Developer & UI Lover</p>
                </div>
            </div>

            {/* Badges */}
            <div className="relative z-10 flex flex-wrap gap-3 text-sm text-white/40 font-sans">
                <div className="flex items-center gap-1 hover:text-white/60 transition-colors">
                    <MapPin size={14} />
                    <span>Earth, C-137</span>
                </div>
                <div className="flex items-center gap-1 hover:text-white/60 transition-colors">
                    <LinkIcon size={14} />
                    <a href="https://freaksite.link" className="transition-colors">freaksite.link</a>
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;