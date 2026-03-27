"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FiLogOut,
  FiUser,
  FiMail,
  FiCalendar,
  FiMapPin,
  FiUsers,
  FiCreditCard,
  FiChevronRight,
} from "react-icons/fi";
import {
  BookingDetailsModal,
  type BookingDetails,
} from "@/components/bookingDetailsModal";
import { signOut } from "@/lib/auth-client";

interface DashboardUser {
  email?: string | null;
  username?: string;
}

interface DashboardBooking extends BookingDetails {
  payment: {
    status: string;
  } | null;
}

export default function DashboardClient({
  user,
  bookings,
}: {
  user: DashboardUser;
  bookings: DashboardBooking[];
}) {
  const [selectedBooking, setSelectedBooking] =
    useState<DashboardBooking | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (booking: DashboardBooking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.assign("/");
        },
      },
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold">Dashboard</h1>
              <p className="mt-1 text-muted-foreground">
                Welcome back, {user.email?.split("@")[0] || "Adventurer"}
              </p>
            </div>
            <button
              onClick={() => void handleSignOut()}
              className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-6 py-2 font-medium text-destructive transition hover:bg-destructive/20"
            >
              <FiLogOut className="h-5 w-5" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-12 rounded-2xl border border-primary/20 bg-linear-to-r from-primary/10 to-secondary/40 p-8">
          <div className="mb-6 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-primary/15">
              <FiUser className="h-10 w-10 text-primary" />
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold">Your Account</h2>
              <p className="mt-1 text-muted-foreground">
                Manage your profile and bookings
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="flex items-center gap-3">
              <FiMail className="h-5 w-5 shrink-0 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Email Address</p>
                <p className="font-semibold text-foreground">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <FiUser className="h-5 w-5 shrink-0 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Username</p>
                <p className="font-semibold text-foreground">
                  {user.username || "Guest"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="mb-8">
            <h3 className="mb-2 text-3xl font-bold">Your Bookings</h3>
            <p className="text-muted-foreground">
              Manage your trek bookings and traveller information
            </p>
          </div>

          {bookings.length === 0 ? (
            <div className="rounded-xl border border-border bg-card p-12 text-center">
              <FiCalendar className="mx-auto mb-4 h-16 w-16 text-muted-foreground/60" />
              <h3 className="mb-2 text-2xl font-bold text-foreground">
                No Bookings Yet
              </h3>
              <p className="mb-6 text-muted-foreground">
                You haven't booked any treks yet. Explore and book your first
                adventure!
              </p>
              <Link href="/all">
                <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3 font-semibold text-primary-foreground transition hover:bg-primary/90">
                  Browse Treks
                  <FiChevronRight className="h-5 w-5" />
                </button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {bookings.map((booking) => {
                const startDate =
                  booking.departure.startDate.toLocaleDateString("en-IN", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  });

                return (
                  <div
                    key={booking.id}
                    onClick={() => handleViewDetails(booking)}
                    className="group cursor-pointer overflow-hidden rounded-xl border border-border bg-card transition hover:border-primary/50 hover:bg-card/90"
                  >
                    <div className="p-6 sm:p-8">
                      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
                        <div className="flex-1">
                          <h4 className="mb-4 text-2xl font-bold text-foreground transition group-hover:text-primary">
                            {booking.departure.trek.name}
                          </h4>

                          <div className="mb-6 grid grid-cols-2 gap-6 sm:grid-cols-4">
                            <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15">
                                <FiCalendar className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <p className="text-xs font-semibold uppercase text-muted-foreground/70">
                                  Dates
                                </p>
                                <p className="text-sm font-semibold text-foreground">
                                  {startDate}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15">
                                <FiMapPin className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <p className="text-xs font-semibold uppercase text-muted-foreground/70">
                                  Location
                                </p>
                                <p className="text-sm font-semibold text-foreground">
                                  {booking.departure.trek.state}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15">
                                <FiUsers className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <p className="text-xs font-semibold uppercase text-muted-foreground/70">
                                  People
                                </p>
                                <p className="text-sm font-semibold text-foreground">
                                  {booking.numberOfPeople}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15">
                                <FiCreditCard className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <p className="text-xs font-semibold uppercase text-muted-foreground/70">
                                  Total
                                </p>
                                <p className="text-sm font-semibold text-foreground">
                                  ₹
                                  {(booking.totalAmount / 100).toLocaleString(
                                    "en-IN",
                                  )}
                                </p>
                              </div>
                            </div>
                          </div>

                          {booking.payment && (
                            <div className="flex items-center gap-2">
                              <span
                                className={`inline-block rounded-full px-3 py-1 text-sm font-semibold ${
                                  booking.payment.status === "COMPLETED"
                                    ? "bg-green-600/20 text-green-400"
                                    : booking.payment.status === "PENDING"
                                      ? "bg-yellow-600/20 text-yellow-400"
                                      : "bg-red-600/20 text-red-400"
                                }`}
                              >
                                {booking.payment.status === "COMPLETED"
                                  ? "✓ Paid"
                                  : booking.payment.status === "PENDING"
                                    ? "Pending Payment"
                                    : "Failed"}
                              </span>
                            </div>
                          )}
                        </div>

                        <button
                          onClick={(event) => {
                            event.stopPropagation();
                            handleViewDetails(booking);
                          }}
                          className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-lg bg-primary px-8 py-3 font-semibold text-primary-foreground transition hover:bg-primary/90"
                        >
                          View Details
                          <FiChevronRight className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      {selectedBooking && (
        <BookingDetailsModal
          booking={selectedBooking}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedBooking(null);
          }}
        />
      )}
    </div>
  );
}
