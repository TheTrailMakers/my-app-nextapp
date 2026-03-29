import {
  and,
  asc,
  db,
  desc,
  eq,
  gte,
  inArray,
  ne,
  or,
  sql,
} from "@the-trail-makers/db";
import { booking, payment } from "@the-trail-makers/db/schema/booking";
import {
  course,
  courseSession,
  departure,
  expedition,
  expeditionSession,
  faq,
  trek,
  trekReview,
} from "@the-trail-makers/db/schema/catalog";

import type { ListTreksQuery } from "../schemas/catalog";

const difficultyRank: Record<string, number> = {
  EASY: 1,
  EASY_MODERATE: 2,
  MODERATE: 3,
  HARD: 4,
  VERY_HARD: 5,
};

function parseJsonArray(value: string | null | undefined): string[] {
  if (!value) {
    return [];
  }

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed)
      ? parsed.filter((item): item is string => typeof item === "string")
      : [];
  } catch {
    return [];
  }
}

function parseJsonValue<T>(value: string | null | undefined, fallback: T): T {
  if (!value) {
    return fallback;
  }

  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

function normalizeTrekRecord(
  record: Awaited<ReturnType<typeof getTrekBySlug>> extends infer T
    ? never
    : never,
) {
  return record;
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
    return new Map<
      string,
      Array<{
        id: string;
        seatsAvailable: number;
        totalSeats: number;
        startDate: Date;
        endDate: Date;
        pricePerPerson: number;
      }>
    >();
  }

  const rows = await db
    .select({
      id: departure.id,
      trekId: departure.trekId,
      seatsAvailable: departure.seatsAvailable,
      totalSeats: departure.totalSeats,
      startDate: departure.startDate,
      endDate: departure.endDate,
      pricePerPerson: departure.pricePerPerson,
    })
    .from(departure)
    .where(
      and(inArray(departure.trekId, trekIds), eq(departure.isCancelled, false)),
    )
    .orderBy(asc(departure.startDate));

  const departuresByTrek = new Map<string, typeof rows>();

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
  left: {
    id: string;
    name: string;
    state: string;
    difficulty: string;
    duration: number;
    distance: number | null;
    _count: { departures: number };
    createdAt: Date;
  },
  right: {
    id: string;
    name: string;
    state: string;
    difficulty: string;
    duration: number;
    distance: number | null;
    _count: { departures: number };
    createdAt: Date;
  },
  sortBy: ListTreksQuery["sortBy"],
  sortOrder: "asc" | "desc",
  activeDeparturesByTrek: Map<string, Array<{ startDate: Date }>>,
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

export async function listTreks(query: ListTreksQuery) {
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

  const conditions = [];
  if (state) {
    conditions.push(eq(trek.state, state));
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
      treks: [] as Array<unknown>,
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

  const listedTreks = trekRows.map((row) => ({
    ...row,
    tags: parseJsonArray(row.tags),
    departures: (activeDeparturesByTrek.get(row.id) ?? []).slice(0, 1),
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

export async function getTrekBySlug(slug: string) {
  const trekRows = await db
    .select()
    .from(trek)
    .where(eq(trek.slug, slug))
    .limit(1);
  const record = trekRows[0];

  if (!record) {
    return null;
  }

  const activeDepartures = await getActiveDepartureMap([record.id]);
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
    .where(ne(trek.id, record.id));

  const normalizedRecord = {
    ...record,
    tags: parseJsonArray(record.tags),
    inclusions: parseJsonArray(record.inclusions),
    exclusions: parseJsonArray(record.exclusions),
    requirements: parseJsonArray(record.requirements),
    contentSources: parseJsonArray(record.contentSources),
    seoKeywords: parseJsonArray(record.seoKeywords),
    bestTimeJson: parseJsonValue(record.bestTimeJson, null),
    faqsJson: parseJsonValue(record.faqsJson, []),
    itineraryJson: parseJsonValue(record.itineraryJson, null),
    departures: activeDepartures.get(record.id) ?? [],
  };

  const similarTreks = similarCandidates
    .map((candidate) => ({
      ...candidate,
      tags: parseJsonArray(candidate.tags),
    }))
    .filter((candidate) => {
      return (
        candidate.state === normalizedRecord.state ||
        candidate.difficulty === normalizedRecord.difficulty ||
        candidate.tags.some((tag) => normalizedRecord.tags.includes(tag))
      );
    })
    .slice(0, 3)
    .map(({ tags, ...candidate }) => candidate);

  const [bookingStats, ratingStats] = await Promise.all([
    db
      .select({
        totalBookings: sql<number>`cast(count(*) as integer)`,
      })
      .from(booking)
      .innerJoin(departure, eq(booking.departureId, departure.id))
      .where(
        and(eq(departure.trekId, record.id), eq(booking.status, "CONFIRMED")),
      ),
    db
      .select({
        averageRating: sql<number>`coalesce(avg(${trekReview.rating}), 0)`,
        reviewCount: sql<number>`cast(count(*) as integer)`,
      })
      .from(trekReview)
      .where(eq(trekReview.trekId, record.id)),
  ]);

  return {
    ...normalizedRecord,
    similarTreks,
    stats: {
      totalBookings: bookingStats[0]?.totalBookings ?? 0,
      averageRating: ratingStats[0]?.averageRating ?? 0,
      reviewCount: ratingStats[0]?.reviewCount ?? 0,
      totalDepartures: normalizedRecord.departures.length,
    },
  };
}

export async function getAvailableStates() {
  const states = await db
    .selectDistinct({ state: trek.state })
    .from(trek)
    .orderBy(asc(trek.state));
  return states.map((state) => state.state);
}

export async function listExpeditions() {
  const rows = await db
    .select()
    .from(expedition)
    .orderBy(desc(expedition.createdAt));

  return rows.map((row) => ({
    ...row,
    tags: parseJsonArray(row.tags),
    inclusions: parseJsonArray(row.inclusions),
    exclusions: parseJsonArray(row.exclusions),
    requirements: parseJsonArray(row.requirements),
  }));
}

export async function getExpeditionBySlug(slug: string) {
  const rows = await db
    .select()
    .from(expedition)
    .where(eq(expedition.slug, slug))
    .limit(1);
  const record = rows[0];

  if (!record) {
    return null;
  }

  const sessions = await db
    .select({
      id: expeditionSession.id,
      startDate: expeditionSession.startDate,
      endDate: expeditionSession.endDate,
      seatsAvailable: expeditionSession.seatsAvailable,
      totalSeats: expeditionSession.totalSeats,
      pricePerPerson: expeditionSession.pricePerPerson,
    })
    .from(expeditionSession)
    .where(
      and(
        eq(expeditionSession.expeditionId, record.id),
        gte(expeditionSession.startDate, new Date()),
        eq(expeditionSession.isCancelled, false),
      ),
    )
    .orderBy(asc(expeditionSession.startDate));

  return {
    ...record,
    tags: parseJsonArray(record.tags),
    inclusions: parseJsonArray(record.inclusions),
    exclusions: parseJsonArray(record.exclusions),
    requirements: parseJsonArray(record.requirements),
    sessions,
  };
}

export async function listCourses() {
  const rows = await db.select().from(course).orderBy(desc(course.createdAt));

  return rows.map((row) => ({
    ...row,
    tags: parseJsonArray(row.tags),
    inclusions: parseJsonArray(row.inclusions),
    exclusions: parseJsonArray(row.exclusions),
    requirements: parseJsonArray(row.requirements),
  }));
}

export async function getCourseBySlug(slug: string) {
  const rows = await db
    .select()
    .from(course)
    .where(eq(course.slug, slug))
    .limit(1);
  const record = rows[0];

  if (!record) {
    return null;
  }

  const sessions = await db
    .select({
      id: courseSession.id,
      startDate: courseSession.startDate,
      endDate: courseSession.endDate,
      seatsAvailable: courseSession.seatsAvailable,
      totalSeats: courseSession.totalSeats,
      pricePerPerson: courseSession.pricePerPerson,
    })
    .from(courseSession)
    .where(
      and(
        eq(courseSession.courseId, record.id),
        gte(courseSession.startDate, new Date()),
        eq(courseSession.isCancelled, false),
      ),
    )
    .orderBy(asc(courseSession.startDate));

  return {
    ...record,
    tags: parseJsonArray(record.tags),
    inclusions: parseJsonArray(record.inclusions),
    exclusions: parseJsonArray(record.exclusions),
    requirements: parseJsonArray(record.requirements),
    sessions,
  };
}

export async function listFaqs() {
  return db.select().from(faq).orderBy(asc(faq.order));
}
