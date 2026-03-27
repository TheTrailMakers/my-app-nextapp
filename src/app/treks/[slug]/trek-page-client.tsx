"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { formatPrice, formatDate } from "@/lib/utils";
import {
  FiMapPin,
  FiClock,
  FiUsers,
  FiArrowLeft,
  FiChevronRight,
  FiChevronDown,
  FiCheck,
  FiX,
  FiAlertCircle,
  FiPackage,
} from "react-icons/fi";
import { GiMountainClimbing, GiBed, GiSunrise } from "react-icons/gi";

type TrekDeparture = {
  id: string;
  startDate: string | Date;
  endDate: string | Date;
  seatsAvailable: number;
  totalSeats: number;
  pricePerPerson: number;
};

type TrekPageData = {
  id: string;
  slug: string;
  name: string;
  description: string;
  longDescription: string | null;
  imageUrl: string | null;
  difficulty: string;
  duration: number;
  state: string;
  bestSeason: string | null;
  itinerary: string;
  inclusions: string[];
  exclusions: string[];
  departures: TrekDeparture[];
};

type ItineraryDayData = {
  title: string;
  content: string;
  index: number;
};

// Compact date selection card for sticky booking
function CompactDateCard({
  departure,
  isSelected,
  onSelect,
}: {
  departure: TrekDeparture;
  isSelected: boolean;
  onSelect: (departure: TrekDeparture) => void;
}) {
  const startDate = new Date(departure.startDate);
  const endDate = new Date(departure.endDate);

  return (
    <label
      className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition ${
        isSelected
          ? "border-primary bg-primary/10"
          : "border-border hover:border-primary"
      } ${departure.seatsAvailable === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      <input
        type="radio"
        checked={isSelected}
        onChange={() => onSelect(departure)}
        disabled={departure.seatsAvailable === 0}
        className="h-4 w-4 cursor-pointer accent-primary"
      />
      <div className="flex-1 min-w-0">
        <p className="truncate text-sm text-muted-foreground">
          {formatDate(startDate)}
        </p>
        <p className="text-xs text-muted-foreground/70">
          {departure.seatsAvailable} seats
        </p>
      </div>
    </label>
  );
}

function DepartureCard({
  departure,
  trekName,
  isSelected,
  onSelect,
}: {
  departure: TrekDeparture;
  trekName: string;
  isSelected: boolean;
  onSelect: (departure: TrekDeparture, trekName: string) => void;
}) {
  const availabilityPercent = (
    ((departure.totalSeats - departure.seatsAvailable) / departure.totalSeats) *
    100
  ).toFixed(0);

  const startDate = new Date(departure.startDate);
  const endDate = new Date(departure.endDate);

  return (
    <label
      className={`border rounded-lg p-4 cursor-pointer transition ${
        isSelected
          ? "border-primary bg-primary/10"
          : "border-border hover:border-primary"
      } ${departure.seatsAvailable === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      <div className="flex items-start gap-4">
        <input
          type="radio"
          checked={isSelected}
          onChange={() => onSelect(departure, trekName)}
          disabled={departure.seatsAvailable === 0}
          className="mt-1 h-5 w-5 cursor-pointer accent-primary"
        />

        <div className="flex-1">
          <div className="mb-3">
            <p className="text-sm text-muted-foreground">
              {formatDate(startDate)} - {formatDate(endDate)}
            </p>
          </div>

          <div className="mb-4">
            <p className="text-2xl font-bold text-primary">
              ₹{formatPrice(departure.pricePerPerson)}
            </p>
            <p className="text-xs text-muted-foreground/70">per person</p>
          </div>

          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">
                <FiUsers className="w-4 h-4 inline mr-1" />
                {departure.seatsAvailable} seats available
              </span>
              <span className="text-xs text-muted-foreground/70">
                {availabilityPercent}% full
              </span>
            </div>
            <div className="h-2 w-full rounded-full bg-muted">
              <div
                className="h-2 rounded-full bg-primary transition-all"
                style={{ width: `${availabilityPercent}%` }}
              />
            </div>
          </div>

          {departure.seatsAvailable === 0 && (
            <p className="text-sm font-semibold text-destructive">Sold Out</p>
          )}
        </div>
      </div>
    </label>
  );
}

// Expandable itinerary day component
function ItineraryDay({ day, content }: { day: string; content: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between p-4 text-left transition hover:bg-muted/50"
      >
        <span className="font-semibold text-foreground">{day}</span>
        <FiChevronDown
          className={`w-5 h-5 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      {isOpen && (
        <div className="border-t border-border bg-card/70 px-4 py-3">
          <p className="whitespace-pre-line text-sm text-muted-foreground">
            {content}
          </p>
        </div>
      )}
    </div>
  );
}

// Image carousel component
function ImageCarousel({ images, title }: { images: string[]; title: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [failedIndexes, setFailedIndexes] = useState<Record<number, boolean>>(
    {},
  );
  const defaultImages = [
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800&h=500&fit=crop",
  ];

  const displayImages = images && images.length > 0 ? images : defaultImages;
  const imageSrc = failedIndexes[currentIndex]
    ? defaultImages[currentIndex % defaultImages.length]
    : displayImages[currentIndex];

  return (
    <div className="relative h-64 overflow-hidden rounded-lg bg-card">
      <Image
        src={imageSrc}
        alt={`${title} - Image ${currentIndex + 1}`}
        fill
        className="object-cover"
        onError={() => {
          setFailedIndexes((current) => ({
            ...current,
            [currentIndex]: true,
          }));
        }}
      />
      <div className="absolute inset-0 flex items-center justify-between px-4">
        <button
          onClick={() =>
            setCurrentIndex(
              (currentIndex - 1 + displayImages.length) % displayImages.length,
            )
          }
          className="rounded-full bg-background/70 p-2 text-foreground transition hover:bg-background/85"
        >
          <FiChevronRight className="w-5 h-5 transform rotate-180" />
        </button>
        <button
          onClick={() =>
            setCurrentIndex((currentIndex + 1) % displayImages.length)
          }
          className="rounded-full bg-background/70 p-2 text-foreground transition hover:bg-background/85"
        >
          <FiChevronRight className="w-5 h-5" />
        </button>
      </div>
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
        {displayImages.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2 w-2 rounded-full transition ${
              idx === currentIndex ? "w-6 bg-primary" : "bg-primary/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function TrekPageClient({
  trek,
  isAuthenticated,
}: {
  trek: TrekPageData;
  isAuthenticated: boolean;
}) {
  const router = useRouter();
  const [selectedDeparture, setSelectedDeparture] = useState<string | null>(
    null,
  );
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateSelect = (departure: TrekDeparture) => {
    const startDate = new Date(departure.startDate);
    const endDate = new Date(departure.endDate);

    const params = new URLSearchParams({
      departureId: departure.id,
      trekName: trek.name,
      trekSlug: trek.slug,
      startDate: startDate.toISOString().split("T")[0],
      endDate: endDate.toISOString().split("T")[0],
      price: departure.pricePerPerson.toString(),
      seats: departure.seatsAvailable.toString(),
    });

    const bookingUrl = `/booking/summary?${params.toString()}`;

    if (!isAuthenticated) {
      const loginUrl = `/login?next=${encodeURIComponent(bookingUrl)}`;
      router.push(loginUrl);
      return;
    }

    router.push(bookingUrl);
  };

  // Parse itinerary into days
  const itineraryDays: ItineraryDayData[] = trek.itinerary
    ? trek.itinerary
        .split(/(?=Day\s+\d+)/i)
        .filter((day: string) => day.trim())
        .map((day: string, idx: number) => {
          const lines = day.split("\n");
          const dayTitle = lines[0];
          const dayContent = lines.slice(1).join("\n");
          return { title: dayTitle, content: dayContent, index: idx };
        })
    : [];

  const selectedDepartureRecord = selectedDeparture
    ? (trek.departures.find(
        (departure) => departure.id === selectedDeparture,
      ) ?? null)
    : null;

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header Navigation */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/all"
            className="inline-flex items-center gap-2 text-primary transition hover:text-primary/90"
          >
            <FiArrowLeft className="w-4 h-4" />
            Back to Treks
          </Link>
        </div>
      </header>

      {/* 1. HERO BANNER */}
      <section className="relative h-96 w-full overflow-hidden bg-card">
        {trek.imageUrl ? (
          <Image
            src={trek.imageUrl}
            alt={trek.name}
            fill
            className="object-cover brightness-60"
            priority
          />
        ) : (
          <Image
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=500&fit=crop"
            alt={trek.name}
            fill
            className="object-cover brightness-60"
            priority
          />
        )}

        <div className="absolute inset-0 flex items-end bg-linear-to-t from-background via-transparent to-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">{trek.name}</h1>
            <p className="max-w-2xl text-lg text-muted-foreground">
              {trek.description}
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 2. TREK DATA WITH ICONS */}
        <section className="border-b border-border py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            <div className="flex flex-col items-center text-center">
              <GiMountainClimbing className="mb-2 h-6 w-6 text-primary" />
              <p className="text-xs text-muted-foreground">Difficulty</p>
              <p className="truncate text-sm font-semibold text-foreground">
                {trek.difficulty}
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <FiClock className="mb-2 h-6 w-6 text-primary" />
              <p className="text-xs text-muted-foreground">Duration</p>
              <p className="text-sm font-semibold text-foreground">
                {trek.duration} Days
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <FiMapPin className="mb-2 h-6 w-6 text-primary" />
              <p className="text-xs text-muted-foreground">Location</p>
              <p className="truncate text-sm font-semibold text-foreground">
                {trek.state}
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <GiSunrise className="mb-2 h-6 w-6 text-primary" />
              <p className="text-xs text-muted-foreground">Best Months</p>
              <p className="text-sm font-semibold text-foreground">
                {trek.bestSeason || "N/A"}
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <FiUsers className="mb-2 h-6 w-6 text-primary" />
              <p className="text-xs text-muted-foreground">Best For</p>
              <p className="text-sm font-semibold text-foreground">
                Mixed experience levels
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <GiBed className="mb-2 h-6 w-6 text-primary" />
              <p className="text-xs text-muted-foreground">Accommodation</p>
              <p className="text-sm font-semibold text-foreground">Tent stay</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <GiSunrise className="mb-2 h-6 w-6 text-primary" />
              <p className="text-xs text-muted-foreground">Pickup Time</p>
              <p className="text-sm font-semibold text-foreground">6:00 AM</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <GiSunrise className="mb-2 h-6 w-6 text-primary" />
              <p className="text-xs text-muted-foreground">Dropoff Time</p>
              <p className="text-sm font-semibold text-foreground">6:00 PM</p>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 py-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* 3. BRIEF DESCRIPTION */}
            <section>
              <h2 className="text-3xl font-bold mb-4">About This Trek</h2>
              <p className="mb-4 text-lg leading-relaxed text-muted-foreground">
                {trek.description}
              </p>
              {trek.longDescription && (
                <p className="leading-relaxed text-muted-foreground">
                  {trek.longDescription}
                </p>
              )}
            </section>

            {/* 4. SAFETY STANDARDS */}
            <section className="bg-yellow-950/30 border border-yellow-700/40 rounded-lg p-6">
              <div className="flex items-start gap-4">
                <FiAlertCircle className="w-6 h-6 text-yellow-500 shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-yellow-200 mb-3">
                    Safety Standards
                  </h3>
                  <ul className="text-gray-200 space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <FiCheck className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                      <span>Experienced guides and trained support staff</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FiCheck className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                      <span>First aid and emergency medical support</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FiCheck className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                      <span>Comprehensive travel insurance included</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FiCheck className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                      <span>Weather-appropriate equipment provided</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 5. IMAGE CAROUSEL FOR DAYS */}
            <section>
              <h3 className="text-2xl font-bold mb-6">Trek Story</h3>
              <ImageCarousel images={[]} title={trek.name} />
            </section>

            {/* 6. ITINERARY (EXPANDABLE) */}
            <section>
              <h3 className="text-2xl font-bold mb-6">Detailed Itinerary</h3>
              <div className="space-y-3">
                {itineraryDays.length > 0 ? (
                  itineraryDays.map((day, idx) => (
                    <ItineraryDay
                      key={idx}
                      day={day.title}
                      content={day.content}
                    />
                  ))
                ) : (
                  <div className="rounded-lg border border-border p-4 text-muted-foreground">
                    {trek.itinerary}
                  </div>
                )}
              </div>
            </section>

            {/* 7. WHAT TO PACK */}
            <section>
              <h3 className="mb-6 flex items-center gap-3 text-2xl font-bold">
                <FiPackage className="h-6 w-6 text-primary" />
                What to Pack
              </h3>
              <div className="rounded-lg border border-border bg-card p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="mb-3 font-semibold text-foreground">
                      Essential Gear
                    </h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="mt-1 text-primary">→</span>
                        <span>Trekking shoes (broken in)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 text-primary">→</span>
                        <span>Weather-appropriate clothing layers</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 text-primary">→</span>
                        <span>Backpack (50-60L recommended)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 text-primary">→</span>
                        <span>Sun protection (hat, sunscreen, glasses)</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="mb-3 font-semibold text-foreground">
                      Personal Items
                    </h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="mt-1 text-primary">→</span>
                        <span>Toiletries and medications</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 text-primary">→</span>
                        <span>Water bottle or hydration system</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 text-primary">→</span>
                        <span>Energy snacks</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 text-primary">→</span>
                        <span>Headlamp or flashlight</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* 8. HOW TO PREPARE */}
            <section>
              <h3 className="text-2xl font-bold mb-6">How to Prepare</h3>
              <div className="space-y-4">
                {[
                  {
                    title: "Physical Training",
                    desc: "Start with cardio and leg strength exercises 6-8 weeks before the trek.",
                  },
                  {
                    title: "Acclimatization",
                    desc: "Arrive a day or two early to acclimatize to the altitude.",
                  },
                  {
                    title: "Gear Test",
                    desc: "Test your backpack and shoes on practice hikes before the trek.",
                  },
                  {
                    title: "Mental Preparation",
                    desc: "Research the trek, watch videos, and mentally prepare for challenges.",
                  },
                ].map((step, idx) => (
                  <div
                    key={idx}
                    className="rounded-lg border border-border p-4"
                  >
                    <h4 className="mb-2 flex items-center gap-2 font-semibold text-foreground">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                        {idx + 1}
                      </span>
                      {step.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">{step.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 9. TREK IN EACH SEASON */}
            <section>
              <h3 className="text-2xl font-bold mb-6">
                Trek in Different Seasons
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    season: "Spring",
                    desc: "Mild weather, blooming flowers, perfect visibility for trekking.",
                    icon: "🌸",
                  },
                  {
                    season: "Summer",
                    desc: "Warm days, busy season, all routes open and well-maintained.",
                    icon: "☀️",
                  },
                  {
                    season: "Autumn",
                    desc: "Clear skies, cool temperatures, stunning mountain views.",
                    icon: "🍂",
                  },
                  {
                    season: "Winter",
                    desc: "Snow-covered peaks, challenging conditions for experienced trekkers.",
                    icon: "❄️",
                  },
                ].map((season, idx) => (
                  <div
                    key={idx}
                    className="rounded-lg border border-border p-4 transition hover:border-primary/30"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <span className="text-3xl">{season.icon}</span>
                      <h4 className="font-semibold text-foreground">
                        {season.season}
                      </h4>
                    </div>
                    <p className="mb-3 text-sm text-muted-foreground">
                      {season.desc}
                    </p>
                    <Link
                      href="/blog"
                      className="text-sm text-primary hover:text-primary/90"
                    >
                      Read full article →
                    </Link>
                  </div>
                ))}
              </div>
            </section>

            {/* 10. FAQ SECTION */}
            <section>
              <h3 className="text-2xl font-bold mb-6">
                Frequently Asked Questions
              </h3>
              <div className="space-y-3">
                {[
                  {
                    q: "What is the fitness level required?",
                    a: "We will share trek-specific fitness guidance before departure. Contact the team if you need recommendations now.",
                  },
                  {
                    q: "Is altitude sickness a concern?",
                    a: "Altitude can affect trekkers differently. We recommend proper acclimatisation, steady hydration, and speaking with your guide if symptoms appear.",
                  },
                  {
                    q: "Can beginners join this trek?",
                    a: "Beginners can join when the trek matches their fitness level. Reach out to the team if you would like help deciding.",
                  },
                ].map((faq, idx) => (
                  <details
                    key={idx}
                    className="group cursor-pointer rounded-lg border border-border p-4"
                  >
                    <summary className="flex items-center justify-between font-semibold text-foreground">
                      {faq.q}
                      <FiChevronDown className="w-4 h-4 transition group-open:rotate-180" />
                    </summary>
                    <p className="mt-3 border-t border-border pt-3 text-sm text-muted-foreground">
                      {faq.a}
                    </p>
                  </details>
                ))}
              </div>
            </section>

            {/* Inclusions/Exclusions - moved down */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <FiCheck className="text-green-400" />
                  What's Included
                </h3>
                <ul className="space-y-2">
                  {trek.inclusions && trek.inclusions.length > 0 ? (
                    trek.inclusions.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-muted-foreground"
                      >
                        <span className="text-green-400 mt-1">✓</span>
                        <span className="text-sm">{item}</span>
                      </li>
                    ))
                  ) : (
                    <li className="text-sm text-muted-foreground">
                      Standard inclusions apply
                    </li>
                  )}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <FiX className="text-red-400" />
                  What's Not Included
                </h3>
                <ul className="space-y-2">
                  {trek.exclusions && trek.exclusions.length > 0 ? (
                    trek.exclusions.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-muted-foreground"
                      >
                        <span className="text-red-400 mt-1">✕</span>
                        <span className="text-sm">{item}</span>
                      </li>
                    ))
                  ) : (
                    <li className="text-sm text-muted-foreground">
                      Standard exclusions apply
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>

          {/* 11. BOOKING SECTION */}
          {/* Desktop Sticky Booking */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24 rounded-lg border border-border bg-card p-6">
              {trek.departures && trek.departures.length > 0 ? (
                <div className="space-y-4">
                  {/* Selected Date Display */}
                  {selectedDepartureRecord && (
                    <div className="rounded-lg border border-primary bg-primary/10 p-4">
                      <p className="mb-1 text-xs text-muted-foreground">
                        Selected Date
                      </p>
                      <p className="mb-2 text-lg font-bold text-primary">
                        ₹{formatPrice(selectedDepartureRecord.pricePerPerson)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(
                          new Date(selectedDepartureRecord.startDate),
                        )}
                      </p>
                    </div>
                  )}

                  {/* Date Selection */}
                  <div>
                    <p className="mb-3 text-xs font-semibold text-muted-foreground">
                      CHOOSE DATE
                    </p>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {trek.departures.map((departure) => (
                        <CompactDateCard
                          key={departure.id}
                          departure={departure}
                          isSelected={selectedDeparture === departure.id}
                          onSelect={(dep) => setSelectedDeparture(dep.id)}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Book Button */}
                  <button
                    onClick={() => {
                      if (selectedDepartureRecord)
                        handleDateSelect(selectedDepartureRecord);
                    }}
                    disabled={!selectedDeparture}
                    className="mt-4 w-full rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:bg-muted"
                  >
                    Book Now
                  </button>
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="mb-4 font-semibold text-foreground">
                    Price on Request
                  </p>
                  <Link
                    href="/contact"
                    className="block rounded-lg bg-primary px-6 py-3 text-center font-semibold text-primary-foreground transition hover:bg-primary/90"
                  >
                    Request Price
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Sticky Booking */}
          <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-border bg-card p-3 lg:hidden">
            {trek.departures && trek.departures.length > 0 ? (
              <div className="flex gap-2">
                <button
                  onClick={() => setShowDatePicker(!showDatePicker)}
                  className="flex-1 rounded-lg bg-secondary px-3 py-2 text-sm font-semibold text-secondary-foreground transition hover:bg-secondary/90"
                >
                  {selectedDepartureRecord
                    ? formatDate(new Date(selectedDepartureRecord.startDate))
                    : "Select Date"}
                </button>
                <button
                  onClick={() => {
                    if (selectedDepartureRecord)
                      handleDateSelect(selectedDepartureRecord);
                  }}
                  disabled={!selectedDeparture}
                  className="flex-1 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:bg-muted"
                >
                  Book
                </button>
              </div>
            ) : (
              <button
                onClick={() => router.push("/contact")}
                className="w-full rounded-lg bg-primary px-4 py-3 font-semibold text-primary-foreground transition hover:bg-primary/90"
              >
                Request Price
              </button>
            )}
          </div>

          {/* Mobile Date Picker Overlay */}
          {showDatePicker && (
            <div className="fixed inset-0 z-40 flex flex-col bg-background/95 lg:hidden">
              <div className="flex items-center justify-between border-b border-border p-4">
                <h3 className="text-2xl font-bold">Available Dates</h3>
                <button
                  onClick={() => setShowDatePicker(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {trek.departures && trek.departures.length > 0 ? (
                  trek.departures.map((departure) => (
                    <DepartureCard
                      key={departure.id}
                      departure={departure}
                      trekName={trek.name}
                      isSelected={selectedDeparture === departure.id}
                      onSelect={(dep) => {
                        setSelectedDeparture(dep.id);
                        handleDateSelect(dep);
                        setShowDatePicker(false);
                      }}
                    />
                  ))
                ) : (
                  <div className="text-center py-12">
                    <p className="mb-4 text-foreground">
                      No scheduled departures
                    </p>
                    <Link
                      href="/contact"
                      className="block rounded-lg bg-primary px-6 py-3 text-center font-semibold text-primary-foreground transition hover:bg-primary/90"
                    >
                      Request Price
                    </Link>
                  </div>
                )}
              </div>
              <div className="border-t border-border p-4">
                <button
                  onClick={() => setShowDatePicker(false)}
                  className="w-full rounded-lg bg-secondary px-4 py-3 font-semibold text-secondary-foreground transition hover:bg-secondary/90"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Bottom padding for mobile */}
        <div className="lg:hidden h-32" />
      </div>
    </main>
  );
}
