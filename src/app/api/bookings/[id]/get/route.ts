import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import db from "@/drizzle/db";
import {
  booking as bookingTable,
  departure as departureTable,
  payment as paymentTable,
  trek as trekTable,
} from "@/drizzle/schema";

type BookingRecord = {
  id: string;
  departureId: string;
  numberOfPeople: number;
  totalAmount: number;
  status: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  createdAt: Date;
  payment: {
    status: string;
  } | null;
  departure: {
    startDate: Date;
    endDate: Date;
    pricePerPerson: number;
    trek: {
      name: string;
      description: string;
      difficulty: string;
      duration: number;
    };
  } | null;
};

function serializeBooking(booking: BookingRecord) {
  return {
    ...booking,
    paymentStatus: booking.payment?.status ?? "PENDING",
    contact: {
      name: booking.contactName,
      email: booking.contactEmail,
      phone: booking.contactPhone,
    },
    participants: [] as Array<{
      name: string;
      age: number;
      gender: string;
      emergency: string;
    }>,
    trek: booking.departure?.trek
      ? {
          ...booking.departure.trek,
          duration: `${booking.departure.trek.duration} days`,
        }
      : null,
  };
}

export async function GET(
  _request: NextRequest,
  props: { params: Promise<{ id: string }> },
) {
  const params = await props.params;
  try {
    const bookingId = params.id;

    if (!bookingId) {
      return NextResponse.json(
        { error: "Booking ID is required" },
        { status: 400 },
      );
    }

    const rows = await db
      .select({
        booking: bookingTable,
        departure: departureTable,
        trek: trekTable,
        payment: paymentTable,
      })
      .from(bookingTable)
      .innerJoin(
        departureTable,
        eq(bookingTable.departureId, departureTable.id),
      )
      .innerJoin(trekTable, eq(departureTable.trekId, trekTable.id))
      .leftJoin(paymentTable, eq(paymentTable.bookingId, bookingTable.id))
      .where(eq(bookingTable.id, bookingId))
      .limit(1);
    const booking = rows[0];

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    const response = serializeBooking({
      ...booking.booking,
      payment: booking.payment ? { status: booking.payment.status } : null,
      departure: {
        ...booking.departure,
        trek: {
          name: booking.trek.name,
          description: booking.trek.description,
          difficulty: booking.trek.difficulty,
          duration: booking.trek.duration,
        },
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: response,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error fetching booking:", error);
    return NextResponse.json(
      { error: "Failed to fetch booking details" },
      { status: 500 },
    );
  }
}
