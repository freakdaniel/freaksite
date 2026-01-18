import { SiSpotify } from '@icons-pack/react-simple-icons';

const SpotifyCard = ({ isPlaying = true, track = "KICKING CARS", artist = "Panchiko", coverUrl }) => {
    return (
        <div className="w-full h-full bg-white/5 p-6 border border-white/10 rounded-2xl flex flex-col md:flex-row items-center gap-6 relative overflow-hidden group transition-all hover:bg-white/10">
            
            {/* Background Blur Effect */}
            <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-[#1DB954]/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />

            {/* Track Info */}
            <div className="flex-1 min-w-0 flex flex-col items-center md:items-start text-center md:text-left z-10">
                <div className="flex items-center gap-2 mb-2">
                    <SiSpotify size={16} className="text-[#1DB954]" />
                    <span className="text-[10px] font-sync tracking-widest text-white/50 uppercase">Listening Now</span>
                </div>
                
                <h3 className="text-white text-lg md:text-xl font-sync truncate w-full group-hover:text-[#1DB954] transition-colors">
                    {track}
                </h3>
                <p className="text-white/60 text-sm font-sans truncate w-full">
                    {artist}
                </p>
            </div>

            {/* Equalizer */}
            <div className="flex gap-1 h-8 items-end z-10 shrink-0">
                {[...Array(6)].map((_, i) => (
                    <div
                        key={i}
                        className="w-1.5 bg-[#1DB954] rounded-t"
                        style={{
                            height: isPlaying ? '100%' : '20%',
                            animation: isPlaying ? `equalizer 1s ease-in-out infinite` : 'none',
                            animationDelay: `${i * 0.1}s`,
                        }}
                    />
                ))}
            </div>
            
             <style>{`
                @keyframes equalizer {
                    0%, 100% { height: 20%; opacity: 0.5; }
                    50% { height: 100%; opacity: 1; }
                }
            `}</style>
        </div>
    );
};

export default SpotifyCard;