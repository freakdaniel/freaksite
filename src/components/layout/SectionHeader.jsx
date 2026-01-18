import DecryptedText from '../text/DecryptedText';

const SectionHeader = ({ accentColor, number, title, description, icon: Icon, children }) => {
    const HeaderContent = () => (
        <div className="flex items-start gap-3 md:gap-4">
            <div className="shrink-0 mt-1" style={{ color: accentColor }}>
                <Icon size={24} />
            </div>
            <div className="flex flex-col justify-center">
                <h2 className="text-xl md:text-3xl font-sync text-white mb-2 md:mb-4">{title}</h2>
                <p className="text-white/60 text-xs md:text-lg leading-relaxed font-sans line-clamp-3 md:line-clamp-none">
                    {description}
                </p>
            </div>
        </div>
    );

    return (
        <div className="border-t pt-10 mt-10 relative" style={{ borderColor: `${accentColor}33` }}>
            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-4 h-px" style={{ backgroundColor: accentColor }} />
            <div className="absolute top-0 right-0 w-4 h-px" style={{ backgroundColor: accentColor }} />

            {/* Section Number */}
            <div className="absolute top-0 -translate-y-1/2 left-0 bg-black pr-2 text-3xl font-sync tracking-widest leading-none" style={{ color: accentColor }}>
                <DecryptedText text={number} speed={100} maxIterations={40} characters="0123456789" />
            </div>

            {children ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 text-left mb-6 md:mb-6 shrink-0">
                    <HeaderContent />
                    <div className="hidden md:flex border-l pl-6 flex-col justify-center" style={{ borderColor: `${accentColor}1A` }}>
                        {children}
                    </div>
                </div>
            ) : (
                <div className="mb-6 md:mb-6 text-left shrink-0">
                    <HeaderContent />
                </div>
            )}
        </div>
    );
};

export default SectionHeader;
