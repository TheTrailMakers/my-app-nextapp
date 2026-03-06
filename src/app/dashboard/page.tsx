"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiLogOut, FiUser, FiMail, FiCalendar, FiMapPin, FiUsers, FiCreditCard, FiChevronRight } from "react-icons/fi";
import { BookingDetailsModal } from "@/components/bookingDetailsModal";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  // Fetch user bookings
  useEffect(() => {
    if (status === "authenticated") {
      fetchBookings();
    }
  }, [status]);

  const fetchBookings = async () => {
    try {
      const response = await fetch("/api/bookings", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        const data = await response.json();
        setBookings(data.data || []);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (booking: any) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-300 text-lg">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-gray-800 bg-black/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold">Dashboard</h1>
              <p className="text-gray-400 mt-1">Welcome back, {session.user?.email?.split("@")[0] || "Adventurer"}</p>
            </div>
            <button
              onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
              className="flex items-center gap-2 bg-red-600/10 hover:bg-red-600/20 text-red-400 border border-red-600/30 rounded-lg px-6 py-2 transition font-medium"
            >
              <FiLogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* User  Profile Card */}
        <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-800/30 rounded-2xl p-8 mb-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-6">
            <div className="w-20 h-20 bg-blue-600/20 rounded-full flex items-center justify-center flex-shrink-0">
              <FiUser className="w-10 h-10 text-blue-400" />
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold">Your Account</h2>
              <p className="text-gray-400 mt-1">Manage your profile and bookings</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center gap-3">
              <FiMail className="w-5 h-5 text-blue-400 flex-shrink-0" />
              <div>
                <p className="text-gray-400 text-sm">Email Address</p>
                <p className="text-white font-semibold">{session.user?.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <FiUser className="w-5 h-5 text-blue-400 flex-shrink-0" />
              <div>
                <p className="text-gray-400 text-sm">Username</p>
                <p className="text-white font-semibold">{(session.user as any)?.username || "Guest"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bookings Section */}
        <div>
          <div className="mb-8">
            <h3 className="text-3xl font-bold mb-2">Your Bookings</h3>
            <p className="text-gray-400">Manage your trek bookings and traveller information</p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-4"></div>
              <p className="text-gray-400">Loading your bookings...</p>
            </div>
          ) : bookings.length === 0 ? (
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-12 text-center">
              <FiCalendar className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-300 mb-2">No Bookings Yet</h3>
              <p className="text-gray-400 mb-6">You haven't booked any treks yet. Explore and book your first adventure!</p>
              <Link href="/all">
                <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition">
                  Browse Treks
                  <FiChevronRight className="w-5 h-5" />
                </button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {bookings.map((booking: any) => {
                const trek = booking.departure?.trek;
                const departure = booking.departure;
                const startDate = new Date(departure.startDate).toLocaleDateString("en-IN", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                });
                const endDate = new Date(departure.endDate).toLocaleDateString("en-IN", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                });

                return (
                  <div
                    key={booking.id}
                    onClick={() => handleViewDetails(booking)}
                    className="bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden hover:border-blue-600/50 hover:bg-gray-900/80 transition cursor-pointer group"
                  >
                    <div className="p-6 sm:p-8">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                        <div className="flex-1">
                          <h4 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition">
                            {trek?.name}
                          </h4>

                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-6">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                                <FiCalendar className="w-5 h-5 text-blue-400" />
                              </div>
                              <div>
                                <p className="text-gray-500 text-xs uppercase font-semibold">Dates</p>
                                <p className="text-white font-semibold text-sm">{startDate}</p>
                              </div>
                            </div>

                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                                <FiMapPin className="w-5 h-5 text-blue-400" />
                              </div>
                              <div>
                                <p className="text-gray-500 text-xs uppercase font-semibold">Location</p>
                                <p className="text-white font-semibold text-sm">{trek?.state}</p>
                              </div>
                            </div>

                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                                <FiUsers className="w-5 h-5 text-blue-400" />
                              </div>
                              <div>
                                <p className="text-gray-500 text-xs uppercase font-semibold">People</p>
                                <p className="text-white font-semibold text-sm">{booking.numberOfPeople}</p>
                              </div>
                            </div>

                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                                <FiCreditCard className="w-5 h-5 text-blue-400" />
                              </div>
                              <div>
                                <p className="text-gray-500 text-xs uppercase font-semibold">Total</p>
                                <p className="text-white font-semibold text-sm">₹{(booking.totalAmount / 100).toLocaleString("en-IN")}</p>
                              </div>
                            </div>
                          </div>

                          {booking.payment && (
                            <div className="flex items-center gap-2">
                              <span
                                className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                                  booking.payment.status === "COMPLETED"
                                    ? "bg-green-600/20 text-green-400"
                                    : booking.payment.status === "PENDING"
                                    ? "bg-yellow-600/20 text-yellow-400"
                                    : "bg-red-600/20 text-red-400"
                                }`}
                              >
                                {booking.payment.status === "COMPLETED" ? "✓ Paid" : booking.payment.status === "PENDING" ? "Pending Payment" : "Failed"}
                              </span>
                            </div>
                          )}
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewDetails(booking);
                          }}
                          className="flex-shrink-0 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition inline-flex items-center gap-2 whitespace-nowrap"
                        >
                          View Details
                          <FiChevronRight className="w-5 h-5" />
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

      {/* Booking Details Modal */}
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
