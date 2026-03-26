import { NextResponse } from "next/server";
import { desc } from "drizzle-orm";
import db from "@/drizzle/db";
import { course as courseTable } from "@/drizzle/schema";

export async function GET() {
  try {
    const courses = await db
      .select()
      .from(courseTable)
      .orderBy(desc(courseTable.createdAt));

    return NextResponse.json({
      success: true,
      courses: courses.map((course) => ({
        ...course,
        tags: course.tags ?? [],
        inclusions: course.inclusions ?? [],
        exclusions: course.exclusions ?? [],
        requirements: course.requirements ?? [],
      })),
    });
  } catch (error) {
    console.error("Error fetching courses:", error);
    return NextResponse.json(
      { error: "Failed to fetch courses" },
      { status: 500 },
    );
  }
}
