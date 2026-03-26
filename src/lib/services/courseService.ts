import { and, asc, eq, gte } from "drizzle-orm";
import db from "@/drizzle/db";
import { course as courseTable, courseSession } from "@/drizzle/schema";
import { isDatabaseConfigured } from "@/lib/databaseAvailability";
import { NotFoundError } from "@/lib/errors";

export interface CourseSessionCard {
  id: string;
  startDate: Date;
  seatsAvailable: number;
}

export interface CourseDetail {
  id: string;
  slug: string;
  name: string;
  description: string;
  longDescription: string | null;
  location: string;
  price: number;
  duration: number;
  difficulty: string;
  imageUrl: string | null;
  thumbnailUrl: string | null;
  curriculum: string;
  inclusions: string[];
  exclusions: string[];
  requirements: string[];
  instructor: string | null;
  sessions: CourseSessionCard[];
}

function normalizeTextList(value: string[] | null): string[] {
  return value ?? [];
}

export async function getCourseBySlug(
  slug: string,
): Promise<CourseDetail | null> {
  if (!isDatabaseConfigured()) {
    return null;
  }

  try {
    const courses = await db
      .select({
        id: courseTable.id,
        slug: courseTable.slug,
        name: courseTable.name,
        description: courseTable.description,
        longDescription: courseTable.longDescription,
        location: courseTable.location,
        price: courseTable.price,
        duration: courseTable.duration,
        difficulty: courseTable.difficulty,
        imageUrl: courseTable.imageUrl,
        thumbnailUrl: courseTable.thumbnailUrl,
        curriculum: courseTable.curriculum,
        inclusions: courseTable.inclusions,
        exclusions: courseTable.exclusions,
        requirements: courseTable.requirements,
        instructor: courseTable.instructor,
      })
      .from(courseTable)
      .where(eq(courseTable.slug, slug))
      .limit(1);
    const course = courses[0];

    if (!course) {
      throw new NotFoundError(`Course "${slug}" not found`);
    }

    const sessions = await db
      .select({
        id: courseSession.id,
        startDate: courseSession.startDate,
        seatsAvailable: courseSession.seatsAvailable,
      })
      .from(courseSession)
      .where(
        and(
          eq(courseSession.courseId, course.id),
          gte(courseSession.startDate, new Date()),
          eq(courseSession.isCancelled, false),
        ),
      )
      .orderBy(asc(courseSession.startDate));

    return {
      ...course,
      inclusions: normalizeTextList(course.inclusions),
      exclusions: normalizeTextList(course.exclusions),
      requirements: normalizeTextList(course.requirements),
      sessions,
    };
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    }

    console.warn("Skipping course detail during prerender:", error);
    return null;
  }
}
