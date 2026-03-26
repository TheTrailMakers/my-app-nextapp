import { NextResponse } from "next/server";
import { asc } from "drizzle-orm";
import db from "@/drizzle/db";
import { faq } from "@/drizzle/schema";

export async function GET() {
  try {
    const faqs = await db.select().from(faq).orderBy(asc(faq.order));

    return NextResponse.json({
      success: true,
      faqs,
    });
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    return NextResponse.json(
      { error: "Failed to fetch FAQs" },
      { status: 500 },
    );
  }
}
