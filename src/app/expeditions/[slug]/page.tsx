import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";
import { desc } from "drizzle-orm";
import db from "@/drizzle/db";
import { expedition as expeditionTable } from "@/drizzle/schema";
import { isDatabaseConfigured } from "@/lib/databaseAvailability";
import { getExpeditionBySlug } from "@/lib/services/expeditionService";

const fallbackExpeditionImage =
  "https://res.cloudinary.com/thetrail/image/upload/v1714107209/default_trek_image.jpg";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 3600;

function formatDifficulty(difficulty: string) {
  return difficulty.replace(/_/g, " ");
}

const getCachedExpedition = cache(async (slug: string) =>
  getExpeditionBySlug(slug),
);

export async function generateStaticParams() {
  if (!isDatabaseConfigured()) {
    return [];
  }

  try {
    const expeditions = await db
      .select({ slug: expeditionTable.slug })
      .from(expeditionTable)
      .orderBy(desc(expeditionTable.createdAt));

    return expeditions.map((expedition) => ({ slug: expedition.slug }));
  } catch (error) {
    console.warn("Skipping expedition static params during build:", error);
    return [];
  }
}

export async function generateMetadata(props: PageProps) {
  const params = await props.params;
  const expedition = await getCachedExpedition(params.slug).catch(() => null);

  if (!expedition) {
    return { title: "Expedition Not Found | Trail Makers" };
  }

  return {
    title: `${expedition.name} Expedition | Trail Makers`,
    description: expedition.description,
    openGraph: {
      title: expedition.name,
      description: expedition.description,
      images: expedition.imageUrl ? [expedition.imageUrl] : [],
    },
  };
}

export default async function ExpeditionDetailPage(props: PageProps) {
  const params = await props.params;
  const expedition = await getCachedExpedition(params.slug).catch(() => null);

  if (!expedition) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-96 bg-muted overflow-hidden">
        <Image
          src={
            expedition.imageUrl ||
            expedition.thumbnailUrl ||
            fallbackExpeditionImage
          }
          alt={expedition.name}
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-end">
          <div className="w-full p-8">
            <h1 className="text-4xl font-bold text-white mb-2">
              {expedition.name}
            </h1>
            <p className="text-white text-lg opacity-90">
              {expedition.description}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Left Column - Details */}
          <div className="lg:col-span-2">
            {/* Key Stats */}
            <div className="bg-card rounded-lg shadow-sm p-6 mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Expedition Details
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-muted-foreground text-sm">
                    Max Altitude
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {expedition.maxAltitude}m
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">
                    Duration
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {expedition.duration} days
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">
                    Difficulty
                  </p>
                  <p className="text-2xl font-bold text-foreground capitalize">
                    {formatDifficulty(expedition.difficulty)}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">
                    Distance
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {expedition.distance}km
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            {expedition.longDescription && (
              <div className="bg-card rounded-lg shadow-sm p-6 mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  About
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {expedition.longDescription}
                </p>
              </div>
            )}

            {/* Itinerary */}
            {expedition.itinerary && (
              <div className="bg-card rounded-lg shadow-sm p-6 mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  Itinerary
                </h2>
                <div className="space-y-2 whitespace-pre-wrap text-muted-foreground text-sm leading-relaxed">
                  {expedition.itinerary}
                </div>
              </div>
            )}

            {/* Inclusions */}
            {expedition.inclusions && expedition.inclusions.length > 0 && (
              <div className="bg-card rounded-lg shadow-sm p-6 mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  What's Included
                </h2>
                <ul className="space-y-2">
                  {expedition.inclusions.map((item: string, idx: number) => (
                    <li
                      key={`${item}-${idx}`}
                      className="flex items-start text-muted-foreground"
                    >
                      <span className="text-green-600 dark:text-green-400 mr-3">
                        ✓
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Exclusions */}
            {expedition.exclusions && expedition.exclusions.length > 0 && (
              <div className="bg-card rounded-lg shadow-sm p-6 mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  What's Not Included
                </h2>
                <ul className="space-y-2">
                  {expedition.exclusions.map((item: string, idx: number) => (
                    <li
                      key={`${item}-${idx}`}
                      className="flex items-start text-muted-foreground"
                    >
                      <span className="text-red-600 dark:text-red-400 mr-3">
                        ✗
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Requirements */}
            {expedition.requirements && expedition.requirements.length > 0 && (
              <div className="bg-card rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  Requirements
                </h2>
                <ul className="space-y-2">
                  {expedition.requirements.map((item: string, idx: number) => (
                    <li
                      key={`${item}-${idx}`}
                      className="flex items-start text-muted-foreground"
                    >
                      <span className="text-primary mr-3">
                        •
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div>
            {/* Price and Booking */}
            <div className="bg-card rounded-lg shadow-sm p-6 sticky top-4">
              <div className="mb-6">
                <p className="text-muted-foreground text-sm mb-2">
                  Starting Price
                </p>
                <p className="text-4xl font-bold text-foreground">
                  ₹{(expedition.basePrice / 100).toLocaleString("en-IN")}
                </p>
                <p className="text-muted-foreground text-sm mt-1">
                  Per person
                </p>
              </div>

              {/* Available Sessions */}
              {expedition.sessions && expedition.sessions.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-bold text-foreground mb-3">
                    Available Dates
                  </h3>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {expedition.sessions.map((session) => (
                      <div
                        key={session.id}
                        className="border border-border rounded-sm p-3"
                      >
                        <p className="text-sm font-semibold text-foreground">
                          {session.startDate.toLocaleDateString("en-IN")}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {session.seatsAvailable} seats available
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 px-4 rounded-lg transition-colors mb-3">
                Book Now
              </button>

              <Link
                href="/expeditions"
                className="w-full inline-block text-center text-primary hover:text-primary/80 font-semibold py-2"
              >
                ← Back to Expeditions
              </Link>

              {/* Additional Info */}
              <div className="mt-6 pb-0 border-t border-border pt-6">
                <p className="text-xs text-muted-foreground mb-2">
                  📍 <strong>Location:</strong> {expedition.state}
                </p>
                <p className="text-xs text-muted-foreground">
                  🗓️ <strong>Best Season:</strong> {expedition.bestSeason}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
