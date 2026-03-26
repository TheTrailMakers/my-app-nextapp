import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import db from "@/drizzle/db";
import { booking as bookingTable } from "@/drizzle/schema";
import { logAudit } from "@/lib/roleUtils";
import { requireApiRole } from "@/lib/apiAuth";
import {
  getAdminParticipants,
  parseAdminPagination,
} from "@/lib/services/adminDashboardService";

// GET /api/admin/participants - List all participants
export async function GET(request: Request) {
  const { response } = await requireApiRole("MODERATOR");

  if (response) {
    return response;
  }

  try {
    const { searchParams } = new URL(request.url);
    const pagination = parseAdminPagination(
      searchParams.get("page"),
      searchParams.get("limit"),
      20,
    );
    const data = await getAdminParticipants({
      filter: searchParams.get("filter"),
      paymentStatus: searchParams.get("paymentStatus"),
      medicalStatus: searchParams.get("medicalStatus"),
      idVerified: searchParams.get("idVerified"),
      waiverSigned: searchParams.get("waiverSigned"),
      page: pagination.page,
      limit: pagination.limit,
      search: searchParams.get("search"),
    });

    return NextResponse.json({
      success: true,
      ...data,
    });
  } catch (error) {
    console.error("Error fetching participants:", error);
    return NextResponse.json(
      { error: "Failed to fetch participants" },
      { status: 500 },
    );
  }
}

// PATCH /api/admin/participants - Update participant status
export async function PATCH(request: Request) {
  const { response, user: adminUser } = await requireApiRole("MODERATOR");

  if (response) {
    return response;
  }

  try {
    const body = await request.json();
    const {
      bookingId,
      medicalFormSubmitted,
      idVerified,
      idDocumentType,
      waiverSigned,
      emergencyContactName,
      emergencyContactPhone,
      emergencyContactRelation,
    } = body;

    if (!bookingId) {
      return NextResponse.json(
        { error: "Booking ID is required" },
        { status: 400 },
      );
    }

    const updateData: Record<string, unknown> = {
      updatedAt: new Date(),
    };
    if (medicalFormSubmitted !== undefined) {
      updateData.medicalFormSubmitted = medicalFormSubmitted;
      if (medicalFormSubmitted) {
        updateData.medicalFormDate = new Date();
      }
    }
    if (idVerified !== undefined) {
      updateData.idVerified = idVerified;
      if (idVerified) {
        updateData.idVerificationDate = new Date();
      }
    }
    if (idDocumentType !== undefined)
      updateData.idDocumentType = idDocumentType;
    if (waiverSigned !== undefined) {
      updateData.waiverSigned = waiverSigned;
      if (waiverSigned) {
        updateData.waiverSignedDate = new Date();
      }
    }
    if (emergencyContactName !== undefined)
      updateData.emergencyContactName = emergencyContactName;
    if (emergencyContactPhone !== undefined)
      updateData.emergencyContactPhone = emergencyContactPhone;
    if (emergencyContactRelation !== undefined)
      updateData.emergencyContactRelation = emergencyContactRelation;

    const bookings = await db
      .update(bookingTable)
      .set(updateData)
      .where(eq(bookingTable.id, bookingId))
      .returning();
    const booking = bookings[0];

    await logAudit(
      "PARTICIPANT_UPDATED",
      "BOOKING",
      booking.id,
      adminUser.id,
      updateData,
    );

    return NextResponse.json({
      success: true,
      booking,
    });
  } catch (error) {
    console.error("Error updating participant:", error);
    return NextResponse.json(
      { error: "Failed to update participant" },
      { status: 500 },
    );
  }
}
