/**
 * Trek Service
 * Handles all trek-related operations
 */

import { randomUUID } from "node:crypto";
import { and, asc, eq, ilike, inArray, ne, or, sql } from "drizzle-orm";
import type { InferSelectModel, SQL } from "drizzle-orm";
import db from "@/drizzle/db";
import { booking, departure, trek, trekReview } from "@/drizzle/schema";
import { NotFoundError } from "@/lib/errors";
import { CreateTrekInput, ListTreksQuery } from "@/lib/validations";

type TrekRecord = InferSelectModel<typeof trek>;
type DepartureRecord = InferSelectModel<typeof departure>;
type ListedDeparture = Pick<
  DepartureRecord,
  | "id"
  | "seatsAvailable"
  | "totalSeats"
  | "startDate"
  | "endDate"
  | "pricePerPerson"
>;
type ListedTrek = Pick<
  TrekRecord,
  | "id"
  | "slug"
  | "name"
  | "description"
  | "state"
  | "basePrice"
  | "difficulty"
  | "duration"
  | "distance"
  | "thumbnailUrl"
  | "tags"
> & {
  departures: ListedDeparture[];
  _count: {
    departures: number;
  };
};
type InternalListedTrek = ListedTrek & { createdAt: Date };

const difficultyRank: Record<string, number> = {
  EASY: 1,
  EASY_MODERATE: 2,
  MODERATE: 3,
  HARD: 4,
  VERY_HARD: 5,
};

function normalizeTrekArrays<T extends TrekRecord>(record: T) {
  return {
    ...record,
    tags: record.tags ?? [],
    inclusions: record.inclusions ?? [],
    exclusions: record.exclusions ?? [],
    requirements: record.requirements ?? [],
    contentSources: record.contentSources ?? [],
    seoKeywords: record.seoKeywords ?? [],
  };
}

async function getDepartureCountMap(trekIds: string[]) {
  if (trekIds.length === 0) {
    return new Map<string, number>();
  }

  const counts = await db
    .select({
      trekId: departure.trekId,
      count: sql<number>`cast(count(*) as integer)`,
    })
    .from(departure)
    .where(inArray(departure.trekId, trekIds))
    .groupBy(departure.trekId);

  return new Map(counts.map((row) => [row.trekId, row.count]));
}

async function getActiveDepartureMap(trekIds: string[]) {
  if (trekIds.length === 0) {
    return new Map<string, DepartureRecord[]>();
  }

  const rows = await db
    .select()
    .from(departure)
    .where(
      and(inArray(departure.trekId, trekIds), eq(departure.isCancelled, false)),
    )
    .orderBy(asc(departure.startDate));

  const departuresByTrek = new Map<string, DepartureRecord[]>();

  for (const row of rows) {
    const existing = departuresByTrek.get(row.trekId);
    if (existing) {
      existing.push(row);
      continue;
    }

    departuresByTrek.set(row.trekId, [row]);
  }

  return departuresByTrek;
}

function compareTreks(
  left: InternalListedTrek,
  right: InternalListedTrek,
  sortBy: ListTreksQuery["sortBy"],
  sortOrder: "asc" | "desc",
  activeDeparturesByTrek: Map<string, DepartureRecord[]>,
) {
  if (!sortBy) {
    return right.createdAt.getTime() - left.createdAt.getTime();
  }

  const direction = sortOrder === "asc" ? 1 : -1;

  switch (sortBy) {
    case "popular":
      return (left._count.departures - right._count.departures) * direction;
    case "name":
      return left.name.localeCompare(right.name) * direction;
    case "duration":
      return (left.duration - right.duration) * direction;
    case "state":
      return left.state.localeCompare(right.state) * direction;
    case "distance": {
      const leftDistance = left.distance ?? Number.MAX_SAFE_INTEGER;
      const rightDistance = right.distance ?? Number.MAX_SAFE_INTEGER;
      return (leftDistance - rightDistance) * direction;
    }
    case "difficulty":
      return (
        ((difficultyRank[left.difficulty] ?? Number.MAX_SAFE_INTEGER) -
          (difficultyRank[right.difficulty] ?? Number.MAX_SAFE_INTEGER)) *
        direction
      );
    case "earliest": {
      const leftEarliest =
        activeDeparturesByTrek.get(left.id)?.[0]?.startDate.getTime() ??
        Number.MAX_SAFE_INTEGER;
      const rightEarliest =
        activeDeparturesByTrek.get(right.id)?.[0]?.startDate.getTime() ??
        Number.MAX_SAFE_INTEGER;
      return (leftEarliest - rightEarliest) * direction;
    }
    default:
      return right.createdAt.getTime() - left.createdAt.getTime();
  }
}

export async function createTrek(data: CreateTrekInput) {
  const trekId = randomUUID();

  await db.insert(trek).values({
    id: trekId,
    slug: data.slug,
    name: data.name,
    description: data.description,
    longDescription: data.longDescription,
    state: data.state,
    basePrice: data.basePrice,
    difficulty: data.difficulty,
    duration: data.duration,
    maxAltitude: data.maxAltitude,
    distance: data.distance,
    bestSeason: data.bestSeason,
    imageUrl: data.imageUrl,
    thumbnailUrl: data.thumbnailUrl,
    tags: data.tags,
    itinerary: data.itinerary,
    inclusions: data.inclusions,
    exclusions: data.exclusions,
    requirements: data.requirements,
    updatedAt: new Date(),
  });

  const created = await db
    .select()
    .from(trek)
    .where(eq(trek.id, trekId))
    .limit(1);

  return normalizeTrekArrays(created[0]!);
}

export async function getTrekBySlug(slug: string) {
  const trekRow = await db
    .select()
    .from(trek)
    .where(eq(trek.slug, slug))
    .limit(1);

  const record = trekRow[0];

  if (!record) {
    throw new NotFoundError(`Trek "${slug}" not found`);
  }

  const activeDeparturesByTrek = await getActiveDepartureMap([record.id]);

  return {
    ...normalizeTrekArrays(record),
    departures: activeDeparturesByTrek.get(record.id) ?? [],
  };
}

export async function getTrekById(id: string) {
  const trekRow = await db.select().from(trek).where(eq(trek.id, id)).limit(1);

  const record = trekRow[0];

  if (!record) {
    throw new NotFoundError("Trek not found");
  }

  const activeDeparturesByTrek = await getActiveDepartureMap([record.id]);

  return {
    ...normalizeTrekArrays(record),
    departures: activeDeparturesByTrek.get(record.id) ?? [],
  };
}

export async function listTreks(
  query: ListTreksQuery,
  departuresTake: number = 1,
) {
  const {
    state,
    difficulty,
    sortBy,
    sortOrder = "desc",
    minPrice,
    maxPrice,
    page = 1,
    limit = 10,
  } = query;

  const conditions: SQL[] = [];
  if (state) {
    conditions.push(ilike(trek.state, state));
  }
  if (difficulty) {
    conditions.push(eq(trek.difficulty, difficulty));
  }
  if (minPrice !== undefined) {
    conditions.push(sql`${trek.basePrice} >= ${minPrice}`);
  }
  if (maxPrice !== undefined) {
    conditions.push(sql`${trek.basePrice} <= ${maxPrice}`);
  }

  const where = conditions.length > 0 ? and(...conditions) : undefined;

  const trekRows = await db
    .select({
      id: trek.id,
      slug: trek.slug,
      name: trek.name,
      description: trek.description,
      state: trek.state,
      basePrice: trek.basePrice,
      difficulty: trek.difficulty,
      duration: trek.duration,
      distance: trek.distance,
      thumbnailUrl: trek.thumbnailUrl,
      tags: trek.tags,
      createdAt: trek.createdAt,
    })
    .from(trek)
    .where(where);

  if (trekRows.length === 0) {
    return {
      treks: [] as ListedTrek[],
      pagination: {
        page,
        limit,
        total: 0,
        pages: 0,
      },
    };
  }

  const trekIds = trekRows.map((row) => row.id);
  const [departureCountMap, activeDeparturesByTrek] = await Promise.all([
    getDepartureCountMap(trekIds),
    getActiveDepartureMap(trekIds),
  ]);

  const listedTreks: InternalListedTrek[] = trekRows.map((row) => ({
    ...row,
    tags: row.tags ?? [],
    departures:
      departuresTake > 0
        ? (activeDeparturesByTrek.get(row.id) ?? []).slice(0, departuresTake)
        : [],
    _count: {
      departures: departureCountMap.get(row.id) ?? 0,
    },
  }));

  const sortedTreks = [...listedTreks].sort((left, right) =>
    compareTreks(left, right, sortBy, sortOrder, activeDeparturesByTrek),
  );

  const skip = (page - 1) * limit;
  const paginatedTreks = sortedTreks.slice(skip, skip + limit);

  return {
    treks: paginatedTreks.map(({ createdAt, ...listedTrek }) => listedTrek),
    pagination: {
      page,
      limit,
      total: sortedTreks.length,
      pages: Math.ceil(sortedTreks.length / limit),
    },
  };
}

export async function getSimilarTreks(trekId: string, limit: number = 3) {
  const trekRecord = await getTrekById(trekId);

  const similarCandidates = await db
    .select({
      id: trek.id,
      slug: trek.slug,
      name: trek.name,
      state: trek.state,
      difficulty: trek.difficulty,
      basePrice: trek.basePrice,
      thumbnailUrl: trek.thumbnailUrl,
      tags: trek.tags,
    })
    .from(trek)
    .where(ne(trek.id, trekId));

  return similarCandidates
    .filter((candidate) => {
      const candidateTags = candidate.tags ?? [];

      return (
        candidate.state === trekRecord.state ||
        candidate.difficulty === trekRecord.difficulty ||
        candidateTags.some((tag) => trekRecord.tags.includes(tag))
      );
    })
    .slice(0, limit)
    .map(({ tags, ...candidate }) => candidate);
}

export async function searchTreks(searchQuery: string) {
  const treks = await db
    .select({
      id: trek.id,
      slug: trek.slug,
      name: trek.name,
      state: trek.state,
      difficulty: trek.difficulty,
      basePrice: trek.basePrice,
      thumbnailUrl: trek.thumbnailUrl,
    })
    .from(trek)
    .where(
      or(
        ilike(trek.name, `%${searchQuery}%`),
        ilike(trek.description, `%${searchQuery}%`),
      ),
    )
    .limit(10);

  return treks;
}

export async function getAvailableStates() {
  const states = await db
    .selectDistinct({ state: trek.state })
    .from(trek)
    .orderBy(asc(trek.state));

  return states.map((state) => state.state);
}

export async function getTrekStats(trekId: string) {
  const trekRecord = await getTrekById(trekId);

  const [bookingStats, ratingStats] = await Promise.all([
    db
      .select({
        totalBookings: sql<number>`cast(count(*) as integer)`,
      })
      .from(booking)
      .innerJoin(departure, eq(booking.departureId, departure.id))
      .where(
        and(eq(departure.trekId, trekId), eq(booking.status, "CONFIRMED")),
      ),
    db
      .select({
        averageRating: sql<number>`coalesce(avg(${trekReview.rating})::double precision, 0)`,
        reviewCount: sql<number>`cast(count(*) as integer)`,
      })
      .from(trekReview)
      .where(eq(trekReview.trekId, trekId)),
  ]);

  return {
    trekId,
    trekName: trekRecord.name,
    totalBookings: bookingStats[0]?.totalBookings ?? 0,
    averageRating: ratingStats[0]?.averageRating ?? 0,
    reviewCount: ratingStats[0]?.reviewCount ?? 0,
    totalDepartures: trekRecord.departures.length,
  };
}
