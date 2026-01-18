import { useState } from 'react';

const SocialCard = ({ icon: Icon, link, bgColor, gradient, iconColor }) => {
    const [isHovered, setIsHovered] = useState(false);

    const getBackgroundStyle = () => {
        if (!isHovered) return {};
        if (gradient) {
            return { background: `linear-gradient(135deg, ${gradient.from}33, ${gradient.to}33)` };
        }
        if (bgColor) {
            return { backgroundColor: bgColor };
        }
        return {};
    };

    const getIconStyle = () => {
        if (isHovered && iconColor) {
            return { color: iconColor };
        }
        return {};
    };

    return (
        <a 
            href={link} 
            target="_blank" 
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="flex items-center justify-center bg-white/5 border border-white/10 rounded-2xl p-4 transition-all duration-300 w-full h-full group"
            style={getBackgroundStyle()}
        >
            <Icon 
                size={32} 
                className={`text-white/50 transition-colors duration-300 ${!iconColor ? 'group-hover:text-white' : ''}`}
                style={getIconStyle()}
            />
        </a>
    );
};

export default SocialCard;