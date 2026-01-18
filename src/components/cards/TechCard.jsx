import { useState } from 'react';

const TechCard = ({ name, description, icon: Icon, hexColor = "#ffffff", className = "" }) => {
  return (
    <div 
      className={`relative overflow-hidden bg-white/5 border border-white/10 rounded-xl p-3 h-full group cursor-default transition-all duration-700 ${className}`}
      style={{ '--active-color': hexColor }}
    >
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 in-[.forced-active]:opacity-100"
        style={{ background: `linear-gradient(to bottom right, ${hexColor}33, transparent)` }}
      />

      <div className="relative z-10 flex items-center gap-3">
        <div 
          className="transition-colors duration-700 text-white/40 group-hover:text-(--active-color) in-[.forced-active]:text-(--active-color)"
        >
          <Icon size={24} />
        </div>
        <div className="flex-1">
          <h3 className="text-white font-bold text-sm font-sync leading-tight">{name}</h3>
          <p className="text-white/50 text-[10px] mt-0.5 leading-tight">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default TechCard;