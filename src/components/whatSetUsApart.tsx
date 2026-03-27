import Image from "next/image";
import { GiMountainClimbing } from "react-icons/gi";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function WhatSetUsApart() {
  const features = [
    {
      title: "Priority Safety",
      description:
        "Rigorous protocols so you can embrace the wild without fear.",
    },
    {
      title: "Local Knowledge",
      description:
        "Guides who grew up on these trails, sharing their untamed home.",
    },
    {
      title: "Uncompromised Quality",
      description:
        "From premium tents to curated meals, comfort meets the wilderness.",
    },
  ];

  return (
    <section className="py-24 md:py-32 px-6 lg:px-12 bg-background border-t border-border overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
          {/* Left/Top: The Story Content */}
          <div className="lg:col-span-5 order-2 lg:order-1 flex flex-col justify-center">
            <ScrollReveal
              animation="fade-up"
              offset={["start 95%", "start 75%"]}
            >
              <span className="text-primary uppercase tracking-[0.2em] text-xs font-semibold mb-6 flex items-center gap-4">
                <span className="w-8 h-px bg-primary"></span>
                Our Philosophy
              </span>
            </ScrollReveal>

            <ScrollReveal
              animation="fade-up"
              offset={["start 90%", "start 70%"]}
            >
              <h2 className="text-4xl md:text-5xl lg:text-unwrap lg:text-6xl font-display font-medium text-foreground leading-[1.15] mb-8">
                We Don't Just Guide. We{" "}
                <span className="italic text-primary/80">Transform</span>.
              </h2>
            </ScrollReveal>

            <ScrollReveal
              animation="fade-up"
              offset={["start 90%", "start 75%"]}
            >
              <p className="text-muted-foreground text-lg leading-relaxed mb-12 font-body max-w-md">
                A trek isn't just about reaching a summit; it's about the rhythm
                of your boots on dirt, the bite of alpine air, and the stories
                shared by a campfire. We strip away the noise to let nature
                speak.
              </p>
            </ScrollReveal>

            <div className="flex flex-col gap-8 border-l border-border pl-8">
              {features.map((feature, idx) => (
                <ScrollReveal
                  key={idx}
                  animation="slide-right"
                  offset={["start 95%", "start 80%"]}
                >
                  <div className="group relative">
                    <div className="absolute -left-[33px] top-1 w-2 h-2 rounded-full bg-border group-hover:bg-primary transition-colors duration-500"></div>
                    <h3 className="text-xl font-display text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                      {feature.description}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            <div className="mt-16">
              <GiMountainClimbing className="w-12 h-12 text-border" />
            </div>
          </div>

          {/* Right/Bottom: Tall Editorial Image */}
          <ScrollReveal
            animation="scale-up"
            offset={["start 95%", "start 50%"]}
            className="lg:col-span-7 order-1 lg:order-2"
          >
            <div className="relative h-[600px] md:h-[800px] w-full rounded-sm overflow-hidden group">
              <Image
                src="https://images.unsplash.com/photo-1542259009477-d625272157b7?q=80&w=1200&auto=format&fit=crop"
                alt="Himalayan landscape"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
              />
              {/* Minimal overlays for cinematic feel */}
              <div className="absolute inset-0 bg-black/10 mix-blend-multiply"></div>
              <div className="absolute inset-4 border border-white/20 pointer-events-none mix-blend-overlay"></div>

              {/* Floating stamp/badge */}
              <div className="absolute top-8 right-8 w-24 h-24 rounded-full border border-white/30 flex items-center justify-center backdrop-blur-md bg-white/5 animate-spin-slow">
                <span className="text-white/80 text-[10px] uppercase tracking-widest text-center font-body rotate-12">
                  Est
                  <br />
                  2026
                </span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
