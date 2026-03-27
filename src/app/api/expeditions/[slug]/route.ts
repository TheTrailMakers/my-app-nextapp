import { NextResponse } from "next/server";
import { and, asc, eq, gte } from "drizzle-orm";
import db from "@/drizzle/db";
import {
  expedition as expeditionTable,
  expeditionSession,
} from "@/drizzle/schema";

export async function GET(
  _request: Request,
  props: { params: Promise<{ slug: string }> },
) {
  const params = await props.params;
  try {
    const expeditions = await db
      .select()
      .from(expeditionTable)
      .where(eq(expeditionTable.slug, params.slug))
      .limit(1);
    const expedition = expeditions[0];

    if (!expedition) {
      return NextResponse.json(
        { error: "Expedition not found" },
        { status: 404 },
      );
    }

    const sessions = await db
      .select()
      .from(expeditionSession)
      .where(
        and(
          eq(expeditionSession.expeditionId, expedition.id),
          gte(expeditionSession.startDate, new Date()),
          eq(expeditionSession.isCancelled, false),
        ),
      )
      .orderBy(asc(expeditionSession.startDate));

    return NextResponse.json({
      success: true,
      expedition: {
        ...expedition,
        tags: expedition.tags ?? [],
        inclusions: expedition.inclusions ?? [],
        exclusions: expedition.exclusions ?? [],
        requirements: expedition.requirements ?? [],
        sessions,
      },
    });
  } catch (error) {
    console.error("Error fetching expedition:", error);
    return NextResponse.json(
      { error: "Failed to fetch expedition" },
      { status: 500 },
    );
  }
}
