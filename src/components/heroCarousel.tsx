"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight, FiArrowDown } from "react-icons/fi";

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Cinematic, moody, premium mountain shots
  const slides = [
    "https://images.unsplash.com/photo-1544198365-f5d60b6d819c?q=80&w=2000&auto=format&fit=crop", // Majestic moody peak
    "https://images.unsplash.com/photo-1542259009477-d625272157b7?q=80&w=2000&auto=format&fit=crop", // Misty valley
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2000&auto=format&fit=crop", // Expansive cinematic mountains
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000); // Slower pacing for a more premium editorial feel
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative h-screen min-h-[800px] w-full flex items-center justify-center overflow-hidden bg-[#121415]">
      {/* Film Grain Texture Overlay */}
      <div 
        className="absolute inset-0 z-20 pointer-events-none mix-blend-overlay opacity-30" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      ></div>

      {/* Hero Carousel Images */}
      {slides.map((slide, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-all duration-[1500ms] ease-out-expo ${
            idx === currentSlide 
              ? "opacity-100 scale-100" 
              : "opacity-0 scale-105"
          }`}
        >
          <Image
            src={slide}
            alt={`Epic landscape ${idx + 1}`}
            fill
            className="object-cover"
            priority={idx === 0}
            quality={90}
          />
          {/* Subtle gradient overlay to ensure text readability but keep the cinematic brightness */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/60 mix-blend-multiply" />
        </div>
      ))}

      {/* Thin elegant border frame reflecting the "borderline rustic / print" feel */}
      <div className="absolute inset-4 md:inset-8 border border-white/10 z-20 pointer-events-none mix-blend-overlay"></div>

      {/* Fixed Text Overlay - Editorial Style */}
      <div className="absolute inset-0 flex items-center justify-center z-30 px-6">
        <div className="max-w-7xl w-full mx-auto relative h-full flex flex-col justify-center pt-24">
          
          {/* Top minimal kicker */}
          <div className="mb-8 md:mb-12 overflow-hidden">
            <span className="block text-primary/90 uppercase tracking-[0.3em] text-xs md:text-sm font-medium animate-in slide-in-from-bottom-4 duration-1000 fade-in fill-mode-both">
              Curated Outdoor Experiences
            </span>
          </div>
          
          {/* Massive Display Title */}
          <h1 className="text-6xl md:text-8xl lg:text-[140px] leading-[0.85] text-[#EAE6E1] font-display tracking-tighter w-full animate-in slide-in-from-bottom-8 duration-[1200ms] delay-150 fade-in fill-mode-both">
            <span className="block">Make Your</span>
            <span className="block md:ml-24 italic text-primary/80">Own Trail.</span>
          </h1>

          {/* Bottom section of hero */}
          <div className="mt-16 md:mt-32 max-w-sm flex flex-col gap-6 animate-in slide-in-from-bottom-8 duration-[1200ms] delay-300 fade-in fill-mode-both">
            <p className="text-[#EAE6E1]/70 leading-relaxed font-body text-sm md:text-base border-l border-primary/50 pl-6">
              Skip the beaten path. We craft raw, immersive journeys that reconnect you with nature's untamed beauty.
            </p>
          </div>

        </div>
      </div>

      {/* Explore indicator */}
      <div className="absolute bottom-8 z-30 flex flex-col items-center animate-in fade-in duration-1000 delay-700 w-full">
        <span className="text-[10px] uppercase tracking-[0.2em] text-white/50 mb-4 pb-2 border-b border-white/20">Scroll to Explore</span>
      </div>

      {/* Editorial Slide Number Indicator */}
      <div className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-4 text-white/40 font-body text-xs tracking-widest mix-blend-difference">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`transition-all duration-500 hover:text-white ${
              idx === currentSlide ? "text-white" : ""
            }`}
          >
            0{idx + 1}
          </button>
        ))}
      </div>
    </section>
  );
}
