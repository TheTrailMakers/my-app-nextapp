import { NextResponse } from "next/server";
import { desc } from "drizzle-orm";
import db from "@/drizzle/db";
import { expedition as expeditionTable } from "@/drizzle/schema";

export async function GET() {
  try {
    const expeditions = await db
      .select()
      .from(expeditionTable)
      .orderBy(desc(expeditionTable.createdAt));

    return NextResponse.json({
      success: true,
      expeditions: expeditions.map((expedition) => ({
        ...expedition,
        tags: expedition.tags ?? [],
        inclusions: expedition.inclusions ?? [],
        exclusions: expedition.exclusions ?? [],
        requirements: expedition.requirements ?? [],
      })),
    });
  } catch (error) {
    console.error("Error fetching expeditions:", error);
    return NextResponse.json(
      { error: "Failed to fetch expeditions" },
      { status: 500 },
    );
  }
}
