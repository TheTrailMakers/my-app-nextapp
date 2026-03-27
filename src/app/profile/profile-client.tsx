"use client";

import { useState } from "react";

interface ProfileUser {
  id: string;
  email: string;
  username: string;
  firstName: string | null;
  lastName: string | null;
  phoneNumber: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  pincode: string | null;
}

interface ProfileBooking {
  id: string;
  departureId: string;
  numberOfPeople: number;
  totalAmount: number;
  status: string;
  contactName: string;
  contactPhone: string;
  createdAt: Date;
}

type ProfileFormData = Partial<ProfileUser>;

function formatBookingStatus(status: string) {
  return status
    .toLowerCase()
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export default function ProfileClient({
  initialProfile,
  initialBookings,
}: {
  initialProfile: ProfileUser;
  initialBookings: ProfileBooking[];
}) {
  const [profile, setProfile] = useState(initialProfile);
  const [bookings] = useState(initialBookings);
  const [activeTab, setActiveTab] = useState<"profile" | "bookings">("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editData, setEditData] = useState<ProfileFormData>(initialProfile);

  const handleUpdateProfile = async () => {
    setIsSaving(true);

    try {
      const response = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editData),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const data = await response.json();
      setProfile(data.user);
      setEditData(data.user);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-card shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-foreground">My Profile</h1>
          <p className="mt-1 text-muted-foreground">
            Manage your account and bookings
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6 flex gap-4 border-b border-border">
          {(["profile", "bookings"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-medium capitalize transition-colors ${
                activeTab === tab
                  ? "border-b-2 border-primary text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "profile" && profile && (
          <div className="rounded-lg bg-card p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-foreground">
                Account Information
              </h2>
              <button
                onClick={() => {
                  if (isEditing) {
                    void handleUpdateProfile();
                    return;
                  }

                  setIsEditing(true);
                }}
                disabled={isSaving}
                className={`px-4 py-2 rounded-lg font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-70 ${
                  isEditing
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                }`}
              >
                {isSaving
                  ? "Saving..."
                  : isEditing
                    ? "Save Changes"
                    : "Edit Profile"}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">
                  Email
                </label>
                <input
                  type="email"
                  value={editData.email || ""}
                  disabled
                  className="w-full rounded-lg border border-input bg-muted px-4 py-2 text-foreground disabled:opacity-50"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">
                  Username
                </label>
                <input
                  type="text"
                  value={editData.username || ""}
                  disabled
                  className="w-full rounded-lg border border-input bg-muted px-4 py-2 text-foreground disabled:opacity-50"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">
                  First Name
                </label>
                <input
                  type="text"
                  value={editData.firstName || ""}
                  onChange={(event) =>
                    setEditData({ ...editData, firstName: event.target.value })
                  }
                  disabled={!isEditing}
                  className="w-full rounded-lg border border-input bg-background px-4 py-2 text-foreground disabled:bg-muted disabled:opacity-50"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">
                  Last Name
                </label>
                <input
                  type="text"
                  value={editData.lastName || ""}
                  onChange={(event) =>
                    setEditData({ ...editData, lastName: event.target.value })
                  }
                  disabled={!isEditing}
                  className="w-full rounded-lg border border-input bg-background px-4 py-2 text-foreground disabled:bg-muted disabled:opacity-50"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={editData.phoneNumber || ""}
                  onChange={(event) =>
                    setEditData({
                      ...editData,
                      phoneNumber: event.target.value,
                    })
                  }
                  disabled={!isEditing}
                  className="w-full rounded-lg border border-input bg-background px-4 py-2 text-foreground disabled:bg-muted disabled:opacity-50"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">
                  Address
                </label>
                <input
                  type="text"
                  value={editData.address || ""}
                  onChange={(event) =>
                    setEditData({ ...editData, address: event.target.value })
                  }
                  disabled={!isEditing}
                  className="w-full rounded-lg border border-input bg-background px-4 py-2 text-foreground disabled:bg-muted disabled:opacity-50"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">
                  City
                </label>
                <input
                  type="text"
                  value={editData.city || ""}
                  onChange={(event) =>
                    setEditData({ ...editData, city: event.target.value })
                  }
                  disabled={!isEditing}
                  className="w-full rounded-lg border border-input bg-background px-4 py-2 text-foreground disabled:bg-muted disabled:opacity-50"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">
                  State
                </label>
                <input
                  type="text"
                  value={editData.state || ""}
                  onChange={(event) =>
                    setEditData({ ...editData, state: event.target.value })
                  }
                  disabled={!isEditing}
                  className="w-full rounded-lg border border-input bg-background px-4 py-2 text-foreground disabled:bg-muted disabled:opacity-50"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">
                  Pincode
                </label>
                <input
                  type="text"
                  value={editData.pincode || ""}
                  onChange={(event) =>
                    setEditData({ ...editData, pincode: event.target.value })
                  }
                  disabled={!isEditing}
                  className="w-full rounded-lg border border-input bg-background px-4 py-2 text-foreground disabled:bg-muted disabled:opacity-50"
                />
              </div>

              {isEditing && (
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setEditData(profile);
                  }}
                  className="rounded-lg bg-secondary px-4 py-2 font-medium text-secondary-foreground hover:bg-secondary/90"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        )}

        {activeTab === "bookings" && (
          <div className="overflow-hidden rounded-lg bg-card shadow-sm">
            <div className="border-b border-border px-6 py-4">
              <h2 className="text-xl font-semibold text-foreground">
                My Bookings
              </h2>
            </div>

            {bookings.length === 0 ? (
              <div className="p-6 text-center text-muted-foreground">
                <p>No bookings yet. Start booking your next trek!</p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {bookings.map((booking) => (
                  <div key={booking.id} className="p-6 hover:bg-muted/50">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">
                          Booking #{booking.id.slice(0, 8)}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {new Date(booking.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          booking.status === "CONFIRMED"
                            ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400"
                            : booking.status === "PENDING"
                              ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400"
                              : "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400"
                        }`}
                      >
                        {formatBookingStatus(booking.status)}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-xs font-medium text-muted-foreground">
                          Travellers
                        </p>
                        <p className="font-semibold text-foreground">
                          {booking.numberOfPeople}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-muted-foreground">
                          Total Amount
                        </p>
                        <p className="font-semibold text-foreground">
                          ₹{(booking.totalAmount / 100).toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-muted-foreground">
                          Name
                        </p>
                        <p className="font-semibold text-foreground">
                          {booking.contactName}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-muted-foreground">
                          Phone
                        </p>
                        <p className="font-semibold text-foreground">
                          {booking.contactPhone}
                        </p>
                      </div>
                    </div>

                    {booking.status !== "CANCELLED" && (
                      <div className="flex gap-3">
                        <button className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                          Edit Booking
                        </button>
                        <button className="rounded-lg bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground hover:bg-destructive/90">
                          Cancel Booking
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
