"use client";

import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";

interface Article {
  Index: number;
  ImageLink: string;
  ImageAlt: string;
  Title: string;
  Brief: string;
  Author: string;
  CreatedOn: string;
  Likes: number;
}

export function KnowBeforeYouGo({ articles }: { articles: Article[] }) {
  if (!articles || articles.length === 0) return null;

  // Take the first 3 for the editorial spread
  const featured = articles[0];
  const secondary = articles.slice(1, 3);

  return (
    <section className="py-24 md:py-32 px-6 lg:px-12 bg-linear-to-b from-background to-muted border-t border-border">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <span className="text-primary uppercase tracking-[0.2em] text-xs font-semibold mb-6 flex items-center gap-4">
              <span className="w-8 h-px bg-primary"></span>
              Field Notes
            </span>
            <h2 className="text-5xl md:text-7xl font-display text-foreground leading-[1.1] tracking-tight">
              Know Before <br />
              <span className="italic text-primary/80">You Go.</span>
            </h2>
          </div>
          <Link href="/lessons">
            <button className="text-sm uppercase tracking-widest font-semibold flex items-center gap-2 group hover:text-primary transition-colors pb-1 border-b border-foreground hover:border-primary">
              All Field Notes
              <FiArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </Link>
        </div>

        {/* Editorial Magazine Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          {/* Main Featured Article (Large) */}
          <div className="lg:col-span-7 group cursor-pointer flex flex-col">
            <div className="relative w-full aspect-video md:aspect-[4/3] rounded-sm overflow-hidden mb-8">
              <Image
                src={
                  featured.ImageLink ||
                  "https://images.unsplash.com/photo-1551316679-9c6ae9dec224"
                }
                alt={featured.ImageAlt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
              />
              <div className="absolute inset-0 bg-black/10 mix-blend-multiply group-hover:bg-transparent transition-colors duration-700"></div>
            </div>

            <div className="flex items-center gap-4 text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-4">
              <span className="text-primary">{featured.CreatedOn}</span>
              <span className="w-1 h-1 bg-border rounded-full"></span>
              <span>{featured.Author}</span>
            </div>

            <h3 className="text-3xl md:text-4xl font-display text-foreground group-hover:text-primary transition-colors duration-500 mb-4 leading-tight">
              {featured.Title}
            </h3>

            <p className="text-muted-foreground leading-relaxed max-w-2xl font-body">
              {featured.Brief}
            </p>
          </div>

          {/* Secondary Articles Stack */}
          <div className="lg:col-span-5 flex flex-col gap-12">
            {secondary.map((article, idx) => (
              <div
                key={idx}
                className="group cursor-pointer flex flex-col sm:flex-row lg:flex-col gap-6"
              >
                <div className="relative w-full sm:w-1/2 lg:w-full aspect-video rounded-sm overflow-hidden shrink-0">
                  <Image
                    src={article.ImageLink}
                    alt={article.ImageAlt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out brightness-90 group-hover:brightness-100"
                  />
                  <div className="absolute inset-0 border border-black/5 pointer-events-none mix-blend-overlay"></div>
                </div>

                <div className="flex flex-col justify-center">
                  <div className="flex items-center gap-3 text-[10px] font-semibold tracking-widest uppercase text-muted-foreground mb-3">
                    <span className="text-primary">{article.CreatedOn}</span>
                    <span className="w-1 h-1 bg-border rounded-full"></span>
                    <span>{article.Author}</span>
                  </div>

                  <h3 className="text-xl md:text-2xl font-display text-foreground group-hover:text-primary transition-colors duration-500 mb-3 leading-snug">
                    {article.Title}
                  </h3>

                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {article.Brief}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
