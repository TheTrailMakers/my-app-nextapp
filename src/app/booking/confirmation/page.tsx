import Link from "next/link";
import { redirect } from "next/navigation";
import { FiCheckCircle, FiMail, FiPhone } from "react-icons/fi";
import { getAppSession } from "@/lib/auth-session";
import { getBooking } from "@/lib/services/bookingService";
import PrintReceiptButton from "./print-receipt-button";

interface BookingDetails {
  id: string;
  trekId: string;
  departureId: string;
  numberOfPeople: number;
  totalAmount: number;
  paymentStatus: string;
  status: string;
  trek: {
    name: string;
    description: string;
    difficulty: string;
    duration: string;
  };
  departure: {
    startDate: string;
    endDate: string;
    pricePerPerson: number;
  };
  contact: {
    name: string;
    email: string;
    phone: string;
  };
  participants: Array<{
    name: string;
    age: number;
    gender: string;
    emergency: string;
  }>;
  createdAt: string;
}

type ConfirmationPageProps = {
  searchParams: Promise<{
    bookingId?: string;
  }>;
};

async function getBookingDetails(
  bookingId: string,
): Promise<BookingDetails | null> {
  const session = await getAppSession();
  const userId = session?.user?.id;

  if (!userId) {
    redirect("/login");
  }

  try {
    const booking = await getBooking(bookingId, userId);

    return {
      id: booking.id,
      trekId: booking.departure.trek.id,
      departureId: booking.departureId,
      numberOfPeople: booking.numberOfPeople,
      totalAmount: booking.totalAmount,
      paymentStatus: booking.payment?.status ?? "PENDING",
      status: booking.status,
      trek: {
        name: booking.departure.trek.name,
        description: booking.departure.trek.description,
        difficulty: booking.departure.trek.difficulty,
        duration: `${booking.departure.trek.duration} days`,
      },
      departure: {
        startDate: booking.departure.startDate.toISOString(),
        endDate: booking.departure.endDate.toISOString(),
        pricePerPerson: booking.departure.pricePerPerson,
      },
      contact: {
        name: booking.contactName,
        email: booking.contactEmail,
        phone: booking.contactPhone,
      },
      participants: [],
      createdAt: booking.createdAt.toISOString(),
    };
  } catch {
    return null;
  }
}

export default async function ConfirmationPage({
  searchParams,
}: ConfirmationPageProps) {
  const params = await searchParams;
  const bookingId = params.bookingId;

  if (!bookingId) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-linear-to-b from-background to-muted/40 text-foreground">
        <div className="text-center">
          <p className="text-red-400 mb-4">No booking found</p>
          <Link href="/all" className="text-primary hover:text-primary/90">
            Back to Treks
          </Link>
        </div>
      </div>
    );
  }

  const booking = await getBookingDetails(bookingId);

  if (!booking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-linear-to-b from-background to-muted/40 text-foreground">
        <div className="text-center">
          <p className="text-red-400 mb-4">Failed to load booking</p>
          <Link href="/all" className="text-primary hover:text-primary/90">
            Back to Treks
          </Link>
        </div>
      </div>
    );
  }

  const startDate = new Date(booking.departure.startDate);
  const endDate = new Date(booking.departure.endDate);

  return (
    <div className="min-h-screen bg-linear-to-b from-background to-muted/40 text-foreground">
      {/* Success Banner */}
      <div className="bg-linear-to-r from-green-900 to-green-800 border-b border-green-700">
        <div className="max-w-6xl mx-auto px-4 py-12 text-center">
          <FiCheckCircle className="w-16 h-16 mx-auto mb-4 text-green-300" />
          <h1 className="text-4xl font-bold mb-2">Booking Confirmed! 🎉</h1>
          <p className="text-green-200 text-lg">
            Your trek adventure is confirmed. Check your email for details.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Column - Booking Details */}
          <div className="md:col-span-2 space-y-8">
            {/* Booking Reference */}
            <div className="rounded-lg border border-border bg-card p-6">
              <h2 className="text-xl font-bold mb-4">Booking Reference</h2>
              <div className="mb-4 rounded-sm bg-muted p-4 text-center font-mono text-2xl tracking-wider">
                {bookingId}
              </div>
              <p className="text-sm text-muted-foreground">
                Save this reference number for your records and any future
                correspondence.
              </p>
            </div>

            {/* Trek Details */}
            <div className="rounded-lg border border-border bg-card p-6">
              <h2 className="text-2xl font-bold mb-6">Trek Details</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-3xl font-bold mb-2">
                    {booking.trek.name}
                  </h3>
                  <p className="mb-4 text-muted-foreground">
                    {booking.trek.description}
                  </p>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <span className="text-sm text-muted-foreground">
                        Difficulty
                      </span>
                      <p className="text-lg font-semibold text-primary">
                        {booking.trek.difficulty}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">
                        Duration
                      </span>
                      <p className="text-lg font-semibold text-primary">
                        {booking.trek.duration}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">
                        Participants
                      </span>
                      <p className="text-lg font-semibold text-primary">
                        {booking.numberOfPeople}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Trek Dates */}
                <div className="rounded-lg border border-border bg-muted p-4">
                  <h4 className="font-semibold mb-3">Trek Dates</h4>
                  <div className="flex items-center gap-4">
                    <div>
                      <span className="text-sm text-muted-foreground">
                        Start Date
                      </span>
                      <p className="text-lg font-semibold">
                        {startDate.toLocaleDateString("en-IN", {
                          weekday: "short",
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <div className="text-muted-foreground/70">→</div>
                    <div>
                      <span className="text-sm text-muted-foreground">
                        End Date
                      </span>
                      <p className="text-lg font-semibold">
                        {endDate.toLocaleDateString("en-IN", {
                          weekday: "short",
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Participant Details */}
            {booking.participants && booking.participants.length > 0 && (
              <div className="rounded-lg border border-border bg-card p-6">
                <h2 className="text-2xl font-bold mb-6">Participant Details</h2>

                <div className="space-y-4">
                  {booking.participants.map((participant, idx) => (
                    <div
                      key={idx}
                      className="rounded-lg border border-border bg-muted p-4"
                    >
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <span className="text-sm text-muted-foreground">
                            Name
                          </span>
                          <p className="font-semibold">{participant.name}</p>
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground">
                            Age
                          </span>
                          <p className="font-semibold">
                            {participant.age} years
                          </p>
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground">
                            Gender
                          </span>
                          <p className="font-semibold">{participant.gender}</p>
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground">
                            Emergency Contact
                          </span>
                          <p className="font-semibold text-sm">
                            {participant.emergency}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Contact Information */}
            <div className="rounded-lg border border-border bg-card p-6">
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>

              <div className="space-y-4">
                <div className="flex items-center gap-4 rounded-lg bg-muted p-4">
                  <div className="text-2xl">👤</div>
                  <div>
                    <span className="text-sm text-muted-foreground">Name</span>
                    <p className="font-semibold">{booking.contact.name}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-lg bg-muted p-4">
                  <FiMail className="text-2xl text-primary" />
                  <div>
                    <span className="text-sm text-muted-foreground">Email</span>
                    <p className="font-semibold break-all">
                      {booking.contact.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-lg bg-muted p-4">
                  <FiPhone className="text-2xl text-primary" />
                  <div>
                    <span className="text-sm text-muted-foreground">Phone</span>
                    <p className="font-semibold">{booking.contact.phone}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="rounded-lg border border-primary/20 bg-primary/10 p-6">
              <h2 className="text-2xl font-bold mb-4">Next Steps</h2>

              <ol className="space-y-3">
                <li className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground">
                    1
                  </span>
                  <div>
                    <p className="font-semibold">Confirmation Email</p>
                    <p className="text-sm text-muted-foreground">
                      Check your email for booking confirmation and payment
                      receipt
                    </p>
                  </div>
                </li>

                <li className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground">
                    2
                  </span>
                  <div>
                    <p className="font-semibold">Pre-Trek Briefing</p>
                    <p className="text-sm text-muted-foreground">
                      We'll contact you 5 days before the trek with detailed
                      instructions
                    </p>
                  </div>
                </li>

                <li className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground">
                    3
                  </span>
                  <div>
                    <p className="font-semibold">Meet at Trailhead</p>
                    <p className="text-sm text-muted-foreground">
                      Arrive 15 minutes early on the start date
                    </p>
                  </div>
                </li>

                <li className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground">
                    4
                  </span>
                  <div>
                    <p className="font-semibold">Enjoy Your Trek!</p>
                    <p className="text-sm text-muted-foreground">
                      Experience the mountains and create unforgettable memories
                    </p>
                  </div>
                </li>
              </ol>
            </div>
          </div>

          {/* Right Column - Summary */}
          <div className="h-fit">
            <div className="sticky top-20 rounded-lg border border-green-700/30 bg-linear-to-br from-green-900/80 to-green-800/80 p-6 text-white">
              <h3 className="text-lg font-bold mb-6">Booking Summary</h3>

              <div className="mb-6 space-y-4 border-b border-green-700 pb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-green-100">Trek</span>
                  <span className="text-right font-semibold max-w-xs">
                    {booking.trek.name}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-green-100">Participants</span>
                  <span className="font-semibold">
                    {booking.numberOfPeople}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-green-100">Price per Person</span>
                  <span className="font-semibold">
                    ₹{(booking.departure.pricePerPerson / 100).toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-green-100">Duration</span>
                  <span className="font-semibold">{booking.trek.duration}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total Amount</span>
                  <span className="text-2xl text-yellow-300">
                    ₹{(booking.totalAmount / 100).toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm text-green-200 bg-green-900/30 rounded-sm p-2">
                  <span>✓ Payment confirmed</span>
                  <span className="text-xs font-mono">
                    {new Date(booking.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <PrintReceiptButton />

              <Link
                href="/all"
                className="mt-4 block text-center text-green-100 transition hover:text-white"
              >
                Browse More Treks
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
