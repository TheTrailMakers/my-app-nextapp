"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiArrowLeft, FiChevronRight } from "react-icons/fi";

type BookingSummaryClientProps = {
  departureId: string | null;
  trekName: string | null;
  trekSlug: string | null;
  startDate: string | null;
  endDate: string | null;
  pricePerPerson: string | null;
  availableSeats: string | null;
  initialContactName: string;
  initialContactEmail: string;
};

export default function BookingSummaryClient({
  departureId,
  trekName,
  trekSlug,
  startDate,
  endDate,
  pricePerPerson,
  availableSeats,
  initialContactName,
  initialContactEmail,
}: BookingSummaryClientProps) {
  const router = useRouter();
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [contactName, setContactName] = useState(initialContactName);
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState(initialContactEmail);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const totalPrice =
    (Number.parseInt(pricePerPerson || "0", 10) / 100) * numberOfPeople;

  const handleProceed = async () => {
    if (!departureId) {
      setError("Missing departure details");
      return;
    }

    if (!contactName || !contactPhone || !contactEmail) {
      setError("Please fill all contact details");
      return;
    }

    if (!agreed) {
      setError("Please agree to terms and conditions");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          departureId,
          numberOfPeople,
          contactName,
          contactPhone,
          contactEmail,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error?.message || "Failed to create booking");
      }

      router.push(
        `/booking/payment?bookingId=${data.data.id}&amount=${totalPrice * 100}`,
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-background to-muted/40 text-foreground">
      <div className="border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link
            href={trekSlug ? `/treks/${trekSlug}` : "/all"}
            className="flex items-center gap-2 text-primary hover:text-primary/90"
          >
            <FiArrowLeft /> Back to Trek
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-2">Confirm Your Booking</h1>
        <p className="mb-12 text-muted-foreground">
          Complete your trek reservation
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="mb-8 rounded-lg border border-border bg-card p-6">
              <h2 className="text-2xl font-bold mb-4">
                {trekName || "Selected Trek"}
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Departure Dates:
                  </span>
                  <span className="font-semibold">
                    {startDate || "TBD"} to {endDate || "TBD"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Price per Person:
                  </span>
                  <span className="font-semibold">
                    ₹
                    {(
                      Number.parseInt(pricePerPerson || "0", 10) / 100
                    ).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="mb-8 rounded-lg border border-border bg-card p-6">
              <h3 className="text-xl font-bold mb-4">Number of Participants</h3>

              <div className="flex items-center gap-4">
                <button
                  onClick={() =>
                    setNumberOfPeople((current) => Math.max(1, current - 1))
                  }
                  className="rounded-sm bg-secondary px-4 py-2 text-secondary-foreground hover:bg-secondary/90"
                >
                  −
                </button>

                <input
                  type="number"
                  value={numberOfPeople}
                  onChange={(event) =>
                    setNumberOfPeople(
                      Number.parseInt(event.target.value, 10) || 1,
                    )
                  }
                  min="1"
                  max={Number.parseInt(availableSeats || "0", 10)}
                  className="w-20 rounded-sm border border-input bg-background px-4 py-2 text-center text-foreground"
                />

                <button
                  onClick={() =>
                    setNumberOfPeople((current) =>
                      Math.min(
                        Number.parseInt(availableSeats || "15", 10),
                        current + 1,
                      ),
                    )
                  }
                  className="rounded-sm bg-secondary px-4 py-2 text-secondary-foreground hover:bg-secondary/90"
                >
                  +
                </button>

                <span className="text-sm text-muted-foreground">
                  (Max: {availableSeats || "0"} available)
                </span>
              </div>
            </div>

            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="text-xl font-bold mb-4">Contact Information</h3>

              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm text-muted-foreground">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={contactName}
                    onChange={(event) => setContactName(event.target.value)}
                    placeholder="Your full name"
                    className="w-full rounded-sm border border-input bg-background px-4 py-2 text-foreground focus:border-primary focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-muted-foreground">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={contactPhone}
                    onChange={(event) => setContactPhone(event.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full rounded-sm border border-input bg-background px-4 py-2 text-foreground focus:border-primary focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-muted-foreground">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={contactEmail}
                    onChange={(event) => setContactEmail(event.target.value)}
                    placeholder="your.email@example.com"
                    className="w-full rounded-sm border border-input bg-background px-4 py-2 text-foreground focus:border-primary focus:outline-hidden"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(event) => setAgreed(event.target.checked)}
                  className="w-5 h-5 mt-1"
                />
                <span className="text-sm text-muted-foreground">
                  I agree to the trek terms, conditions, and cancellation
                  policy. I confirm that I am in good health and fit for
                  trekking.
                </span>
              </label>
            </div>

            {error && (
              <div className="mt-6 bg-red-900/20 border border-red-700 rounded-lg p-4 text-red-300">
                {error}
              </div>
            )}
          </div>

          <div className="h-fit">
            <div className="sticky top-20 rounded-lg border border-primary/20 bg-linear-to-br from-primary/10 to-secondary/50 p-6">
              <h3 className="text-lg font-bold mb-6">Price Breakdown</h3>

              <div className="mb-6 space-y-3 border-b border-border pb-6">
                <div className="flex justify-between text-sm">
                  <span>Price per person</span>
                  <span>
                    ₹
                    {(
                      Number.parseInt(pricePerPerson || "0", 10) / 100
                    ).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>
                    × {numberOfPeople}{" "}
                    {numberOfPeople === 1 ? "person" : "people"}
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">Total Amount</span>
                  <span className="text-3xl font-bold text-primary">
                    ₹
                    {totalPrice.toLocaleString("en-IN", {
                      maximumFractionDigits: 0,
                    })}
                  </span>
                </div>
              </div>

              <button
                onClick={handleProceed}
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 font-bold text-primary-foreground transition hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground"
              >
                {loading ? "Processing..." : "Proceed to Payment"}
                <FiChevronRight />
              </button>

              <p className="mt-4 text-center text-xs text-muted-foreground">
                ✓ Secure payment via Razorpay (Card, UPI, Netbanking)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
