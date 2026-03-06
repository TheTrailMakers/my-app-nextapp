"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Trekking and hiking specific images
  const slides = [
    "https://images.unsplash.com/photo-1551316679-9c6ae9dec224?w=1200&h=600&fit=crop", // Mountain trail
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop", // Himalayan peak
    "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&h=600&fit=crop", // Alpine trail
    "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1200&h=600&fit=crop", // Mountain trekking
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black pt-20">
      <div className="absolute inset-0 flex items-center justify-center p-6 md:p-8">
        <div className="relative w-full h-full max-w-6xl">
          {/* Carousel Images */}
          {slides.map((slide, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-opacity duration-1000 rounded-3xl overflow-hidden ${
                idx === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={slide}
                alt={`Himalayan trek ${idx + 1}`}
                fill
                className="object-cover brightness-50"
                priority={idx === 0}
              />
            </div>
          ))}

          {/* Fixed Text Overlay with Handwritten Font */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="text-center">
              <h1 className="text-6xl md:text-8xl text-white mb-2" style={{ fontFamily: 'Caveat, cursive', fontWeight: 700 }}>
                Make Your Own Trail
              </h1>
              <p className="text-xl md:text-2xl text-blue-300 font-light tracking-widest">Begin Your Adventure</p>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition"
          >
            <FiChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition"
          >
            <FiChevronRight className="w-6 h-6" />
          </button>

          {/* Slide Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-2 h-2 rounded-full transition ${
                  idx === currentSlide ? "bg-white w-8" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
