import React from "react";
import LessonsClient, { type LessonCardData } from "./lessons-client";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const lessons: LessonCardData[] = [
  {
    id: 1,
    title: "The Only Difference Between Trekking And Hiking",
    slug: "The-Only-Difference-Between-Trekking-And-Hiking",
    category: "Trekking 101",
    excerpt:
      "Understand the key differences between trekking and hiking, and when to choose each adventure.",
    image:
      "https://images.unsplash.com/photo-1551362185-acf8f42d8e8d?w=500&h=300&fit=crop",
    likes: 342,
    comments: 28,
    date: "Feb 15, 2026",
  },
  {
    id: 2,
    title: "Understanding The Layering System",
    slug: "Understanding-The-Layering-System",
    category: "Gear Guide",
    excerpt:
      "Learn the importance of proper clothing layers to stay comfortable during treks in any weather.",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop",
    likes: 521,
    comments: 45,
    date: "Feb 10, 2026",
  },
  {
    id: 3,
    title: "10 Best Treks in Himachal Pradesh",
    slug: "10-Best-Treks-in-Himachal-Pradesh",
    category: "Destination Guide",
    excerpt:
      "Explore the most stunning treks in Himachal Pradesh with difficulty levels and best seasons.",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop",
    likes: 1205,
    comments: 89,
    date: "Feb 5, 2026",
  },
  {
    id: 4,
    title: "Why I Would Do Sandakphu Trek At Least Once",
    slug: "Why-I-would-do-Sandakphu-Trek-atleast-once",
    category: "Experiences",
    excerpt:
      "A personal journey to one of the most unforgettable treks in the Eastern Himalayas.",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop",
    likes: 892,
    comments: 67,
    date: "Jan 28, 2026",
  },
];

export default function LessonsPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-background to-muted text-foreground selection:bg-primary/20 pb-24">
      {/* Header Section */}
      <section className="relative px-6 md:px-12 lg:px-20 pt-32 md:pt-40 pb-16 md:pb-24">
        <div className="max-w-[1400px] mx-auto flex flex-col items-center text-center">
          <ScrollReveal animation="fade-up" offset={["start 95%", "start 80%"]}>
            <span className="text-primary uppercase tracking-[0.2em] text-xs font-sans font-semibold mb-6 block">
              Knowledge Hub
            </span>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" offset={["start 95%", "start 70%"]}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display leading-[1.1] tracking-tight max-w-4xl text-balance">
              Mountain Lessons.
            </h1>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" offset={["start 90%", "start 70%"]}>
            <p className="mt-8 text-muted-foreground text-lg md:text-xl max-w-2xl leading-relaxed">
              Learn from experienced trekkers, discover gear tips, explore
              destinations, and read real stories from the trails.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <LessonsClient lessons={lessons} />
    </div>
  );
}
