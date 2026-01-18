import { GraduationCap, Zap } from 'lucide-react';

const LearningCard = ({ technologies, accentColor }) => {
  return (
    <div className="h-full bg-white/5 border border-white/10 rounded-xl p-4 relative overflow-hidden group flex flex-col justify-between">
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{
        background: `linear-gradient(90deg, ${accentColor}10 0%, transparent 50%)`
      }} />
      
      <div className="relative z-10 h-full flex flex-col">
        <div className="flex items-center gap-2 mb-3">          
          <div className="text-[10px] font-sync tracking-widest text-white/40">
            CURRENTLY LEARNING
          </div>
        </div>

        {/* Technologies Grid */}
        <div className="grid grid-cols-2 gap-3 flex-1">
          {technologies.map((tech, index) => (
            <div 
              key={index}
              className="flex flex-col items-center justify-center p-4 transition-all duration-300 hover:scale-105 group/tech"
            >
              <div className="mb-2 transition-transform duration-300 group-hover/tech:scale-110">
                <tech.icon size={32} style={{ color: tech.color }} />
              </div>
              <span className="text-base font-sync font-bold text-white mb-0.5">
                {tech.name}
              </span>
              <div className="flex items-center gap-1 text-[10px] text-white/40">
                <Zap size={10} style={{ color: tech.color }} />
                <span>In Progress</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LearningCard;
