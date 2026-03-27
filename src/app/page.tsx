export const revalidate = 3600;

import { ImageWithFallback as Image } from "@/components/imageWithFallback";
import Link from "next/link";
import { listTreks } from "@/lib/services/trekService";
import { formatPrice, formatDate } from "@/lib/utils";
import { HeroCarousel } from "@/components/heroCarousel";
import { WhatSetUsApart } from "@/components/whatSetUsApart";
import { KnowBeforeYouGo } from "@/components/knowBeforeYouGo";
import { TrekByRegionClient } from "@/components/trekByRegionClient";
import articlesData from "@/data/articles.json";
import { isDatabaseConfigured } from "@/lib/databaseAvailability";
import { FiArrowRight } from "react-icons/fi";

type ListedTrek = Awaited<ReturnType<typeof listTreks>>["treks"][number];
type ListedDeparture = ListedTrek["departures"][number];
type UpcomingDepartureItem = {
  trek: ListedTrek;
  departure: ListedDeparture;
};

// Upcoming Adventures - Editorial Style
async function UpcomingAdventuresEditorial() {
  let sortedDepartures: UpcomingDepartureItem[] = [];
  if (!isDatabaseConfigured()) {
    return null;
  }

  try {
    const { treks: allTreks } = await listTreks({ page: 1, limit: 50 }, 10);

    const allDepartures = allTreks.flatMap((trek) =>
      (trek.departures || []).map((departure) => ({
        trek,
        departure,
      })),
    );

    sortedDepartures = allDepartures
      .sort((a, b) => {
        const dateA = new Date(a.departure.startDate).getTime();
        const dateB = new Date(b.departure.startDate).getTime();
        return dateA - dateB;
      })
      .slice(0, 5); // Just top 5 to keep it curated
  } catch (error) {
    console.warn("DB unreachable:", error);
  }

  return (
    <section className="py-24 md:py-32 px-6 lg:px-12 bg-linear-to-b from-background to-muted relative">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-8">
          <div className="max-w-xl">
            <h2 className="text-5xl md:text-7xl font-display text-foreground leading-[1.1] tracking-tight">
              <span className="text-primary uppercase tracking-[0.2em] text-xs font-sans font-semibold mb-6 block">
                Immediate Departures
              </span>
              The Next <br className="hidden md:block" /> Chapter.
            </h2>
          </div>
          <p className="text-muted-foreground text-base md:text-lg max-w-sm md:text-right border-l-2 md:border-l-0 md:border-r-2 border-primary/30 pl-4 md:pl-0 md:pr-4">
            Curated, intimate departures leaving soon. Limited spots for those
            who seek the extraordinary.
          </p>
        </div>

        {/* The List - Editorial Lines */}
        <div className="flex flex-col border-t border-border group/list">
          {sortedDepartures.map((item, idx) => {
            const trek = item.trek;
            const departure = item.departure;
            const startDate = formatDate(new Date(departure.startDate));
            const priceValue = departure.pricePerPerson || 0;
            const formattedPrice =
              priceValue > 0
                ? formatPrice(priceValue).replace("₹", "").trim()
                : "Contact";

            // Generate a random-ish subtle rotation for the hover image to make it feel organic
            const rotation = idx % 2 === 0 ? "rotate-2" : "-rotate-3";

            return (
              <Link
                key={`${trek.id}-${idx}`}
                href={`/treks/${trek.slug}`}
                className="group relative z-base hover:z-raised border-b border-border py-8 md:py-12 md:px-6 md:-mx-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between transition-colors hover:bg-black/5 dark:hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:bg-black/5 dark:focus-visible:bg-white/5"
              >
                {/* Image Reveal (Desktop) */}
                <div
                  className={`hidden md:block absolute left-[40%] top-1/2 -translate-y-1/2 w-[400px] h-[250px] pointer-events-none opacity-0 group-hover:opacity-100 shrink-0 transition-all duration-700 ease-out-expo scale-95 group-hover:scale-100 z-base origin-center ${rotation}`}
                >
                  <Image
                    src={
                      trek.thumbnailUrl ||
                      "https://images.unsplash.com/photo-1544198365-f5d60b6d819c?q=80&w=800"
                    }
                    alt=""
                    fill
                    sizes="400px"
                    className="object-cover rounded-xl shadow-2xl brightness-90"
                  />
                </div>

                {/* Mobile Image */}
                <div className="md:hidden w-full aspect-video relative mb-6 rounded-xl overflow-hidden shrink-0">
                  <Image
                    src={
                      trek.thumbnailUrl ||
                      "https://images.unsplash.com/photo-1544198365-f5d60b6d819c?q=80&w=800"
                    }
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 0px"
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>

                <div className="flex flex-col relative z-raised w-full md:w-1/4 mb-4 md:mb-0">
                  <span className="text-sm font-semibold tracking-wider text-muted-foreground">
                    {startDate}
                  </span>
                  <span className="text-xs uppercase tracking-widest text-primary mt-2">
                    {trek.duration} Days
                  </span>
                </div>

                <div className="flex-1 relative z-raised mb-6 md:mb-0">
                  <h3 className="text-3xl md:text-5xl font-display text-foreground group-hover:text-primary transition-colors duration-500">
                    {trek.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2 md:mt-4 italic font-body flex items-center gap-1">
                    <span aria-hidden="true">📍</span> {trek.state}
                  </p>
                </div>

                <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center relative z-raised w-full md:w-1/4">
                  <div className="text-xl md:text-2xl font-body font-light text-foreground md:group-hover:-translate-x-4 transition-transform duration-500">
                    {priceValue > 0 ? (
                      <>
                        <span className="sr-only">Price: </span>₹
                        {formattedPrice}
                      </>
                    ) : (
                      formattedPrice
                    )}
                  </div>
                  <div className="opacity-100 md:opacity-0 group-hover:opacity-100 md:-translate-x-4 group-hover:translate-x-0 transition-all duration-500 mt-0 md:mt-2">
                    <span className="text-primary text-sm uppercase tracking-widest font-semibold flex items-center gap-2">
                      View <FiArrowRight aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-16 text-right md:text-center block">
          <Link
            href="/all"
            className="relative inline-flex items-center gap-4 text-sm uppercase tracking-[0.2em] font-medium text-foreground hover:text-primary transition-colors pb-2 border-b border-border hover:border-primary group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background rounded-sm"
          >
            See All Expeditions
            <FiArrowRight
              aria-hidden="true"
              className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-500"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}

// Trek by Region Section
async function TrekByRegionSection() {
  let regionStats: Record<string, { count: number; image?: string }> = {};
  let sortedRegions: string[] = [];

  if (!isDatabaseConfigured()) {
    return null;
  }

  try {
    const { treks: allTreks } = await listTreks({ page: 1, limit: 100 }, 1);

    const stateImages: Record<string, string> = {
      "Himachal Pradesh":
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800",
      Uttarakhand:
        "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=800",
      "Jammu and Kashmir":
        "https://images.unsplash.com/photo-1544198365-f5d60b6d819c?q=80&w=800",
      Sikkim:
        "https://images.unsplash.com/photo-1542259009477-d625272157b7?q=80&w=800",
      "West Bengal":
        "https://images.unsplash.com/photo-1544198365-f5d60b6d819c?q=80&w=800", // Will fallback gracefully
    };

    allTreks.forEach((trek) => {
      const state = trek.state || "Other";
      if (!regionStats[state]) {
        regionStats[state] = {
          count: 0,
          image: stateImages[state] || trek.thumbnailUrl || undefined,
        };
      }
      regionStats[state].count++;
    });

    sortedRegions = Object.keys(regionStats).sort();
  } catch (error) {
    console.warn("DB unreachable:", error);
  }

  return (
    <TrekByRegionClient regions={sortedRegions} regionStats={regionStats} />
  );
}

export default async function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <HeroCarousel />
      <UpcomingAdventuresEditorial />
      <WhatSetUsApart />
      <TrekByRegionSection />
      <KnowBeforeYouGo articles={articlesData} />
    </main>
  );
}
