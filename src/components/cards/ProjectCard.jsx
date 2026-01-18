import { ExternalLink, Github } from 'lucide-react';
import { useState } from 'react';

const ProjectCard = ({ title, description, tech = [], links = {}, color = '#ffffff', className = "" }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div 
            className={`group relative h-full bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col justify-between overflow-hidden transition-all duration-300 hover:border-white/20 hover:bg-white/10 min-h-[300px] ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Dynamic Gradient Background on Hover */}
            <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                style={{ background: `linear-gradient(to bottom right, ${color}, transparent)` }}
            />
            
            <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl md:text-2xl font-bold font-sync text-white leading-tight wrap-break-word pr-4">
                        {title}
                    </h3>
                </div>
                
                <p className="text-white/60 text-sm md:text-base font-sans mb-6 line-clamp-4">
                    {description}
                </p>
            </div>

            <div className="relative z-10 mt-auto">
                {/* Tech Stack Chips */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {tech.map((item, index) => (
                        <span 
                            key={index}
                            className="text-[10px] uppercase font-sync px-2 py-1 rounded border border-white/10 text-white/50 bg-black/20"
                        >
                            {item}
                        </span>
                    ))}
                </div>

                {/* Action Links */}
                <div className="flex items-center gap-3">
                    {links.repo && (
                        <a 
                            href={links.repo} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-sm text-white font-medium"
                        >
                            <Github size={16} />
                            <span>Code</span>
                        </a>
                    )}
                    {links.demo && (
                        <a 
                            href={links.demo} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm font-bold text-black"
                            style={{ backgroundColor: color }}
                        >
                            <ExternalLink size={16} />
                            <span>Live Demo</span>
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
