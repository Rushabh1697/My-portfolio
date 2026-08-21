import React from 'react';
import { Target } from 'lucide-react';

const HUD: React.FC = () => {
  return (
    <div className="relative flex items-center justify-center" style={{ width: 0, height: 0 }}>
      {/* Primary ring */}
      <div className="absolute w-[280px] h-[280px] rounded-full border-2 border-[rgba(239,68,68,0.7)]" style={{ boxShadow: '0 0 25px 4px rgba(239, 68, 68, 0.6)' }} />
      
      {/* Golden outer ring */}
      <div className="absolute w-[320px] h-[320px] rounded-full border border-[rgba(251,191,36,0.4)] border-dashed animate-[spin_12s_linear_infinite]" />
      
      {/* Core dot */}
      <div className="absolute flex items-center justify-center text-[#ff2020]">
        <Target size={24} style={{ filter: 'drop-shadow(0 0 8px #ff2020)' }} />
      </div>

      {/* HUD Badge */}
      <div className="absolute top-[160px] flex whitespace-nowrap bg-[rgba(69,10,10,0.8)] border border-[rgba(239,68,68,0.6)] px-3 py-1 rounded backdrop-blur-sm">
        <span className="font-hud text-xs text-red-400 tracking-wider">
          IDENTITY REVEALED <span className="text-white opacity-50">//</span> RUSHABH
        </span>
      </div>
    </div>
  );
};

export default HUD;
