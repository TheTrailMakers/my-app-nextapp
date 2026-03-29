import { ORPCError } from "@orpc/server";
import { db, eq } from "@the-trail-makers/db";
import { departure, trek } from "@the-trail-makers/db/schema/catalog";

function notFound(message: string) {
  return new ORPCError("NOT_FOUND", { message });
}

export async function getDepartureAvailability(departureId: string) {
  const rows = await db
    .select({
      id: departure.id,
      totalSeats: departure.totalSeats,
      seatsAvailable: departure.seatsAvailable,
      isCancelled: departure.isCancelled,
      startDate: departure.startDate,
      endDate: departure.endDate,
      pricePerPerson: departure.pricePerPerson,
      trekName: trek.name,
      trekSlug: trek.slug,
    })
    .from(departure)
    .innerJoin(trek, eq(departure.trekId, trek.id))
    .where(eq(departure.id, departureId))
    .limit(1);

  const departureAvailability = rows[0];

  if (!departureAvailability) {
    throw notFound("Departure not found.");
  }

  return {
    departureId,
    endDate: departureAvailability.endDate.toISOString(),
    isAvailable:
      !departureAvailability.isCancelled &&
      departureAvailability.seatsAvailable > 0,
    isCancelled: departureAvailability.isCancelled,
    occupancyRate: Number(
      (
        ((departureAvailability.totalSeats -
          departureAvailability.seatsAvailable) /
          departureAvailability.totalSeats) *
        100
      ).toFixed(1),
    ),
    pricePerPerson: departureAvailability.pricePerPerson,
    seatsAvailable: departureAvailability.seatsAvailable,
    seatsBooked:
      departureAvailability.totalSeats - departureAvailability.seatsAvailable,
    startDate: departureAvailability.startDate.toISOString(),
    totalSeats: departureAvailability.totalSeats,
    trekName: departureAvailability.trekName,
    trekSlug: departureAvailability.trekSlug,
  };
}
