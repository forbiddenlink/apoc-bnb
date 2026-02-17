import React from 'react';

export function NoiseOverlay() {
  return (
    <div className="noise-overlay fixed inset-0 z-50 pointer-events-none opacity-[0.03] mix-blend-overlay">
       <div 
         className="absolute inset-0 bg-repeat w-full h-full"
         style={{
           backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
         }}
       />
       <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-black/20" />
    </div>
  );
}
