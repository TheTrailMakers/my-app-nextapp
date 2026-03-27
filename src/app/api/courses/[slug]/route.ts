import { NextResponse } from "next/server";
import { and, asc, eq, gte } from "drizzle-orm";
import db from "@/drizzle/db";
import { course as courseTable, courseSession } from "@/drizzle/schema";

export async function GET(
  _request: Request,
  props: { params: Promise<{ slug: string }> },
) {
  const params = await props.params;
  try {
    const courses = await db
      .select()
      .from(courseTable)
      .where(eq(courseTable.slug, params.slug))
      .limit(1);
    const course = courses[0];

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    const sessions = await db
      .select()
      .from(courseSession)
      .where(
        and(
          eq(courseSession.courseId, course.id),
          gte(courseSession.startDate, new Date()),
          eq(courseSession.isCancelled, false),
        ),
      )
      .orderBy(asc(courseSession.startDate));

    return NextResponse.json({
      success: true,
      course: {
        ...course,
        tags: course.tags ?? [],
        inclusions: course.inclusions ?? [],
        exclusions: course.exclusions ?? [],
        requirements: course.requirements ?? [],
        sessions,
      },
    });
  } catch (error) {
    console.error("Error fetching course:", error);
    return NextResponse.json(
      { error: "Failed to fetch course" },
      { status: 500 },
    );
  }
}
