"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiArrowRight } from "react-icons/fi";

interface RegionStats {
  count: number;
  image?: string;
}

interface TrekByRegionClientProps {
  regions: string[];
  regionStats: Record<string, RegionStats>;
}

export function TrekByRegionClient({ regions, regionStats }: TrekByRegionClientProps) {
  const [activeRegion, setActiveRegion] = useState(regions[0] || "");

  return (
    <section className="py-24 md:py-32 px-6 lg:px-12 bg-[#121415] text-[#EAE6E1] border-t border-white/5 relative overflow-hidden">
      {/* Background Image that changes on hover */}
      <div className="absolute inset-0 z-0 transition-opacity duration-1000 opacity-30 pointer-events-none">
         {regions.map((region) => {
            const stats = regionStats[region];
            if (!stats?.image) return null;
            return (
              <Image
                key={region}
                src={stats.image}
                alt={region}
                fill
                className={`object-cover transition-opacity duration-[1500ms] ${activeRegion === region ? 'opacity-100' : 'opacity-0'}`}
              />
            );
         })}
         {/* Gradient Overlay for Text Legibility */}
         <div className="absolute inset-0 bg-gradient-to-r from-[#121415] via-[#121415]/90 to-transparent"></div>
         <div className="absolute inset-0 bg-gradient-to-t from-[#121415] via-transparent to-transparent"></div>
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          
          {/* Left: Titles and interactions */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <span className="text-primary uppercase tracking-[0.2em] text-xs font-semibold mb-6 flex items-center gap-4">
              <span className="w-8 h-[1px] bg-primary"></span>
              Locations
            </span>
            
            <h2 className="text-5xl md:text-7xl font-display font-medium leading-[1.05] mb-12">
              Where to <br/>
              <span className="italic text-primary/80">Wander.</span>
            </h2>

            <div className="flex flex-col gap-6 md:gap-8">
              {regions.map((region, idx) => {
                const stats = regionStats[region];
                const isActive = activeRegion === region;
                
                return (
                  <Link 
                    href={`/treks?region=${region}`} 
                    key={region}
                    onMouseEnter={() => setActiveRegion(region)}
                    className="group flex flex-col items-start gap-2"
                  >
                    <div className="flex items-baseline gap-4 w-full border-b border-white/10 pb-4 md:pb-6 group-hover:border-primary/50 transition-colors duration-500">
                      <span className={`text-sm tracking-widest transition-colors duration-500 ${isActive ? 'text-primary' : 'text-white/30 group-hover:text-primary/70'}`}>
                        0{idx + 1}
                      </span>
                      <h3 className={`text-3xl md:text-4xl font-display transition-all duration-500 ${isActive ? 'text-white translate-x-4' : 'text-white/50 group-hover:text-white group-hover:translate-x-2'}`}>
                        {region}
                      </h3>
                      {isActive && (
                        <FiArrowRight className="ml-auto text-primary animate-in fade-in slide-in-from-left-4 duration-500" />
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right: Active Region Display feature */}
          <div className="lg:col-span-7 relative hidden lg:flex flex-col justify-end items-end pb-8">
            <div className="relative w-full max-w-lg aspect-[3/4] rounded-sm overflow-hidden shadow-2xl">
                {regions.map((region) => {
                    const stats = regionStats[region];
                    if (!stats?.image) return null;
                    return (
                        <div 
                         key={`fg-${region}`}
                         className={`absolute inset-0 transition-opacity duration-1000 ${activeRegion === region ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                        >
                            <Image
                                src={stats.image}
                                alt={region}
                                fill
                                className="object-cover scale-105 hover:scale-100 transition-transform duration-[2s]"
                            />
                            {/* Inner vignette */}
                            <div className="absolute inset-0 border border-white/20 mix-blend-overlay"></div>
                            
                            {/* Stats Badge */}
                            <div className="absolute bottom-6 left-6 right-6 backdrop-blur-md bg-black/40 border border-white/10 p-6 rounded-sm flex justify-between items-center transform translate-y-4 opacity-0 transition-all duration-700 delay-300 group-hover:translate-y-0 group-hover:opacity-100" style={{opacity: activeRegion === region ? 1 : 0, transform: activeRegion === region ? 'translateY(0)' : 'translateY(1rem)'}}>
                               <div className="flex flex-col">
                                 <span className="text-white text-xs uppercase tracking-widest font-semibold mb-1">Available Treks</span>
                                 <span className="text-primary text-xl font-display italic">{stats.count} Expeditions</span>
                               </div>
                               <Link href={`/treks?region=${region}`} className="bg-primary text-black w-10 h-10 rounded-full flex items-center justify-center hover:bg-primary/80 transition-colors">
                                  <FiArrowRight />
                               </Link>
                            </div>
                        </div>
                    );
                })}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
