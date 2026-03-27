"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FiArrowRight,
  FiHeart,
  FiMessageCircle,
  FiShare2,
} from "react-icons/fi";
import { ImageWithFallback as Image } from "@/components/imageWithFallback";

export interface LessonCardData {
  id: number;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  image: string;
  likes: number;
  comments: number;
  date: string;
}

const LessonCardEditorial = ({ lesson }: { lesson: LessonCardData }) => {
  const [isLiked, setIsLiked] = useState(false);
  const defaultImage =
    "https://images.unsplash.com/photo-1544198365-f5d60b6d819c?q=80&w=800";

  return (
    <Link
      href={`/blog/${lesson.slug}`}
      className="group block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-8 focus-visible:ring-offset-background rounded-xl"
    >
      <div className="flex flex-col h-full">
        <div className="relative w-full aspect-4/5 overflow-hidden rounded-xl bg-muted mb-6">
          <Image
            src={lesson.image || defaultImage}
            alt={lesson.title}
            fill
            className="object-cover transition-transform duration-[1.5s] ease-out-expo group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-4 right-4 z-10">
            <span className="rounded-full bg-black/40 backdrop-blur-md border border-white/20 px-3 py-1.5 text-[10px] uppercase tracking-widest font-semibold text-white group-hover:bg-primary group-hover:border-primary transition-colors">
              {lesson.category}
            </span>
          </div>
        </div>

        <div className="flex flex-col grow px-2 md:px-0">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-2xl md:text-3xl font-display text-foreground group-hover:text-primary transition-colors duration-500 line-clamp-2">
              {lesson.title}
            </h3>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2 mb-6 max-w-sm">
            {lesson.excerpt}
          </p>

          <div className="mt-auto border-t border-border pt-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-3 text-xs uppercase tracking-[0.15em] font-semibold text-muted-foreground/80">
            <div className="flex items-center gap-4">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setIsLiked((current) => !current);
                }}
                className="flex items-center gap-1.5 text-foreground hover:text-red-500 transition-colors z-20"
              >
                <FiHeart
                  className={`w-3.5 h-3.5 ${isLiked ? "fill-red-500 text-red-500" : ""}`}
                />
                <span className="whitespace-nowrap">
                  {lesson.likes + (isLiked ? 1 : 0)}
                </span>
              </button>
              <div className="flex items-center gap-1.5 text-foreground z-20 hover:text-blue-500 transition-colors">
                <FiMessageCircle className="w-3.5 h-3.5" />
                <span className="whitespace-nowrap">{lesson.comments}</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-[10px] tracking-widest whitespace-nowrap opacity-60">
                {lesson.date}
              </span>
              <div className="group-hover:text-primary transition-colors">
                <FiArrowRight className="w-3.5 h-3.5 shrink-0 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default function LessonsClient({
  lessons,
}: {
  lessons: LessonCardData[];
}) {
  const [filter, setFilter] = useState("All");

  const categories = [
    "All",
    "Trekking 101",
    "Gear Guide",
    "Destination Guide",
    "Experiences",
  ];
  const filteredLessons =
    filter === "All"
      ? lessons
      : lessons.filter((lesson) => lesson.category === filter);

  return (
    <>
      <div className="sticky top-0 z-40 bg-linear-to-b from-background to-muted backdrop-blur-md border-y border-border/50">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 py-4 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <p className="text-xs uppercase tracking-widest font-semibold text-muted-foreground order-2 md:order-1">
            <span className="text-foreground">{filteredLessons.length}</span>{" "}
            Lessons
            {filter !== "All" ? ` in ${filter}` : ""}
          </p>

          <div className="flex items-center gap-4 flex-wrap md:flex-nowrap order-1 md:order-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide w-full md:w-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`whitespace-nowrap rounded-full px-5 py-2 text-xs uppercase tracking-widest font-semibold transition-all ${
                  filter === category
                    ? "bg-foreground text-background"
                    : "bg-transparent text-foreground hover:bg-black/5 dark:hover:bg-white/5 border border-border"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-24">
        {filteredLessons.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 md:gap-x-12 md:gap-y-24">
            {filteredLessons.map((lesson) => (
              <LessonCardEditorial key={lesson.id} lesson={lesson} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <span className="text-4xl mb-4" aria-hidden="true">
              📚
            </span>
            <h3 className="text-2xl font-display text-foreground mb-4">
              No Lessons Found
            </h3>
            <p className="text-muted-foreground max-w-sm">
              We couldn't find any lessons matching your current category
              filter.
            </p>
            {filter !== "All" && (
              <button
                onClick={() => setFilter("All")}
                className="mt-8 text-xs uppercase tracking-[0.2em] font-semibold text-primary hover:text-foreground pb-1 border-b border-primary hover:border-foreground transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
}
