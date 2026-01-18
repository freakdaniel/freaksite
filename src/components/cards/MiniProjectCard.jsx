import { Github, ExternalLink, Folder } from 'lucide-react';
import { useState } from 'react';

const MiniProjectCard = ({ title, description, tech, link, color = '#ffffff', className = "", logo }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <a 
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className={`block h-full shrink-0 group select-none transition-all duration-700 ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            draggable="false"
            style={{ '--accent': color }}
        >
            <div className="h-full bg-white/5 border border-white/10 rounded-xl p-5 flex flex-col justify-between transition-all duration-700 bg-opacity-100 group-hover:bg-white/10 group-hover:border-white/20 in-[.forced-active]:bg-white/10 in-[.forced-active]:border-white/20 relative overflow-hidden">
                
                {/* Background Accent */}
                <div 
                    className="absolute -right-4 -top-4 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover:opacity-20 in-[.forced-active]:opacity-20 transition-opacity duration-700"
                    style={{ backgroundColor: color }}
                />

                <div className="relative z-10">
                    <div className="flex justify-between items-start mb-3">
                        <div className="p-2 rounded-lg text-white/80 group-hover:text-white in-[.forced-active]:text-white transition-colors">
                            {logo ? (
                                <img src={logo} alt={`${title} logo`} className="w-32 h-8 object-contain" />
                            ) : (
                                <Folder size={18} />
                            )}
                        </div>
                        <ExternalLink size={14} className="text-white/30 group-hover:text-white in-[.forced-active]:text-white transition-colors opacity-0 group-hover:opacity-100 in-[.forced-active]:opacity-100" />
                    </div>

                    <h4 className="text-white font-bold font-sync text-sm mb-2 group-hover:text-(--accent) in-[.forced-active]:text-(--accent) transition-colors">
                        {title}
                    </h4>
                    
                    <p className="text-white/50 text-xs font-sans leading-relaxed line-clamp-2">
                        {description}
                    </p>
                </div>

                <div className="relative z-10 mt-4 pt-4 border-t border-white/5 flex items-center gap-2 overflow-hidden">
                    <span 
                        className="text-[9px] text-white/50 uppercase font-sync font-bold tracking-wider transition-colors duration-700 in-[.forced-active]:text-(--accent) group-hover:text-(--accent)"
                    >
                        {tech}
                    </span>
                </div>
            </div>
        </a>
    );
};

export default MiniProjectCard;
