import { GitBranch, Braces, Microchip } from 'lucide-react';

const StatsCard = ({ accentColor }) => {
  const stats = [
    { icon: Braces, value: '4+', label: 'Years Coding' },
    { icon: GitBranch, value: '15+', label: 'Projects' },
    { icon: Microchip, value: '12+', label: 'Technologies' },
  ];

  return (
    <div className="h-full bg-white/5 border border-white/10 rounded-xl p-4 relative overflow-hidden flex flex-col justify-between">
      <div className="absolute inset-0 opacity-5" style={{
        background: `linear-gradient(135deg, ${accentColor}20 0%, transparent 60%)`
      }} />
      
      <div className="relative z-10 h-full flex flex-col">
        <div className="text-[10px] font-sync tracking-widest text-white/40 mb-3">STATISTICS</div>
        
        <div className="grid grid-cols-3 gap-4 flex-1 items-center">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center text-center group"
            >
              <div 
                className="p-2.5 rounded-lg transition-all duration-300 group-hover:scale-110 mb-2"
              >
                <stat.icon size={20} style={{ color: accentColor }} />
              </div>
              <div className="text-3xl font-sync font-bold text-white leading-none mb-1">
                {stat.value}
              </div>
              <div className="text-[10px] text-white/50 font-sans leading-tight">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
