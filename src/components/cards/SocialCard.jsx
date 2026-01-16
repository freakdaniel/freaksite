const SocialCard = ({ icon: Icon, link, color, hoverColor }) => (
    <a href={link} target="_blank" className={`flex items-center justify-center bg-white/5 border border-white/10 rounded-2xl p-4 transition-colors duration-300 ${hoverColor} h-[100px] max-sm:h-auto`}>
        <Icon size={32} className={`text-white/50 transition-colors duration-300 group-hover:text-white ${color}`} />
    </a>
);

export default SocialCard;