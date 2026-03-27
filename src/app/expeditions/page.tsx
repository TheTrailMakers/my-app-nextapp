import Image from "next/image";
import Link from "next/link";
import { desc } from "drizzle-orm";
import db from "@/drizzle/db";
import { expedition as expeditionTable } from "@/drizzle/schema";
import { isDatabaseConfigured } from "@/lib/databaseAvailability";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

interface ExpeditionCard {
  id: string;
  name: string;
  slug: string;
  description: string;
  state: string;
  basePrice: number;
  difficulty: string;
  duration: number;
  maxAltitude: number | null;
  distance: number | null;
  thumbnailUrl?: string | null;
  imageUrl?: string | null;
}

const fallbackExpeditionImage =
  "https://res.cloudinary.com/thetrail/image/upload/v1714107209/default_trek_image.jpg";

export const revalidate = 3600;

function formatDifficulty(difficulty: string) {
  return difficulty.replace(/_/g, " ");
}

async function getExpeditions(): Promise<ExpeditionCard[]> {
  if (!isDatabaseConfigured()) {
    return [];
  }

  try {
    return await db
      .select({
        id: expeditionTable.id,
        name: expeditionTable.name,
        slug: expeditionTable.slug,
        description: expeditionTable.description,
        state: expeditionTable.state,
        basePrice: expeditionTable.basePrice,
        difficulty: expeditionTable.difficulty,
        duration: expeditionTable.duration,
        maxAltitude: expeditionTable.maxAltitude,
        distance: expeditionTable.distance,
        thumbnailUrl: expeditionTable.thumbnailUrl,
        imageUrl: expeditionTable.imageUrl,
      })
      .from(expeditionTable)
      .orderBy(desc(expeditionTable.createdAt));
  } catch (error) {
    console.warn("Skipping expeditions page data during prerender:", error);
    return [];
  }
}

export default async function ExpeditionsPage() {
  const expeditions = await getExpeditions();

  return (
    <div className="min-h-screen bg-linear-to-b from-background to-muted">
      {/* Header Section */}
      <div className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal animation="fade-up" offset={["start 95%", "start 80%"]}>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Alpine Expeditions
            </h1>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" offset={["start 90%", "start 70%"]}>
            <p className="text-lg text-muted-foreground">
              Challenge yourself with our high-altitude climbing expeditions in
              the Himalayas. Experience world-class mountaineering with
              experienced guides and comprehensive support.
            </p>
          </ScrollReveal>
        </div>
      </div>

      {/* Expeditions Grid */}
      <div className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {expeditions.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No expeditions available at the moment.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {expeditions.map((expedition) => (
                <ScrollReveal
                  key={expedition.id}
                  animation="fade-up"
                  offset={["start 95%", "start 75%"]}
                >
                  <div
                    className="bg-card rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
                  >
                    {/* Image */}
                    <div className="h-48 bg-muted overflow-hidden">
                      <Image
                        src={
                          expedition.imageUrl ||
                          expedition.thumbnailUrl ||
                          fallbackExpeditionImage
                        }
                        alt={expedition.name}
                        width={800}
                        height={480}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="h-full w-full object-cover hover:scale-105 transition-transform"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <h3 className="text-xl font-bold text-foreground mb-2">
                        {expedition.name}
                      </h3>

                      {/* Details Grid */}
                      <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">
                            Altitude
                          </p>
                          <p className="font-semibold text-foreground">
                            {expedition.maxAltitude}m
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">
                            Duration
                          </p>
                          <p className="font-semibold text-foreground">
                            {expedition.duration} days
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">
                            Difficulty
                          </p>
                          <p className="font-semibold text-foreground capitalize">
                            {formatDifficulty(expedition.difficulty)}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">
                            Price
                          </p>
                          <p className="font-semibold text-foreground">
                            ₹
                            {(expedition.basePrice / 100).toLocaleString("en-IN")}
                          </p>
                        </div>
                      </div>

                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                        {expedition.description}
                      </p>

                      {/* Button */}
                      <Link
                        href={`/expeditions/${expedition.slug}`}
                        className="w-full inline-block bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2 px-4 rounded-lg transition-colors text-center"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
