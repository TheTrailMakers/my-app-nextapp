import { and, asc, eq, gte } from "drizzle-orm";
import db from "@/drizzle/db";
import {
  expedition as expeditionTable,
  expeditionSession,
} from "@/drizzle/schema";
import { isDatabaseConfigured } from "@/lib/databaseAvailability";
import { NotFoundError } from "@/lib/errors";

export interface ExpeditionSessionCard {
  id: string;
  startDate: Date;
  seatsAvailable: number;
}

export interface ExpeditionDetail {
  id: string;
  slug: string;
  name: string;
  description: string;
  longDescription: string | null;
  state: string;
  basePrice: number;
  difficulty: string;
  duration: number;
  maxAltitude: number | null;
  distance: number | null;
  bestSeason: string | null;
  imageUrl: string | null;
  thumbnailUrl: string | null;
  itinerary: string;
  inclusions: string[];
  exclusions: string[];
  requirements: string[];
  sessions: ExpeditionSessionCard[];
}

function normalizeTextList(value: string[] | null): string[] {
  return value ?? [];
}

export async function getExpeditionBySlug(
  slug: string,
): Promise<ExpeditionDetail | null> {
  if (!isDatabaseConfigured()) {
    return null;
  }

  try {
    const expeditions = await db
      .select({
        id: expeditionTable.id,
        slug: expeditionTable.slug,
        name: expeditionTable.name,
        description: expeditionTable.description,
        longDescription: expeditionTable.longDescription,
        state: expeditionTable.state,
        basePrice: expeditionTable.basePrice,
        difficulty: expeditionTable.difficulty,
        duration: expeditionTable.duration,
        maxAltitude: expeditionTable.maxAltitude,
        distance: expeditionTable.distance,
        bestSeason: expeditionTable.bestSeason,
        imageUrl: expeditionTable.imageUrl,
        thumbnailUrl: expeditionTable.thumbnailUrl,
        itinerary: expeditionTable.itinerary,
        inclusions: expeditionTable.inclusions,
        exclusions: expeditionTable.exclusions,
        requirements: expeditionTable.requirements,
      })
      .from(expeditionTable)
      .where(eq(expeditionTable.slug, slug))
      .limit(1);
    const expedition = expeditions[0];

    if (!expedition) {
      throw new NotFoundError(`Expedition "${slug}" not found`);
    }

    const sessions = await db
      .select({
        id: expeditionSession.id,
        startDate: expeditionSession.startDate,
        seatsAvailable: expeditionSession.seatsAvailable,
      })
      .from(expeditionSession)
      .where(
        and(
          eq(expeditionSession.expeditionId, expedition.id),
          gte(expeditionSession.startDate, new Date()),
          eq(expeditionSession.isCancelled, false),
        ),
      )
      .orderBy(asc(expeditionSession.startDate));

    return {
      ...expedition,
      inclusions: normalizeTextList(expedition.inclusions),
      exclusions: normalizeTextList(expedition.exclusions),
      requirements: normalizeTextList(expedition.requirements),
      sessions,
    };
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    }

    console.warn("Skipping expedition detail during prerender:", error);
    return null;
  }
}
