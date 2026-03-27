"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FiChevronDown } from "react-icons/fi";

type SortOptionValue =
  | "popular"
  | "name"
  | "difficulty"
  | "duration"
  | "state"
  | "distance"
  | "earliest";

interface TrekCardProps {
  id: string;
  name: string;
  slug: string;
  thumbnail?: string | null;
  state: string;
  difficulty: string;
  duration: number;
  distance: number | null;
  description: string;
  departuresCount: number;
  earliestDate?: string;
}

const sortOptions: { value: SortOptionValue; label: string }[] = [
  { value: "popular", label: "Most Departures" },
  { value: "name", label: "Trek Name" },
  { value: "difficulty", label: "Difficulty" },
  { value: "duration", label: "Duration" },
  { value: "state", label: "State/Region" },
  { value: "distance", label: "Distance" },
  { value: "earliest", label: "Earliest Departure" },
];

function formatDifficulty(difficulty: string) {
  const difficultyLabels: Record<string, string> = {
    EASY: "Easy",
    EASY_MODERATE: "Easy-Moderate",
    MODERATE: "Moderate",
    HARD: "Hard",
    VERY_HARD: "Very Hard",
  };

  return difficultyLabels[difficulty] || difficulty.replace(/_/g, " ");
}

const TrekCardSmall = ({ trek }: { trek: TrekCardProps }) => {
  const defaultImage =
    "https://res.cloudinary.com/thetrail/image/upload/v1714107209/default_trek_image.jpg";
  const [imgSrc, setImgSrc] = useState<string>(trek.thumbnail || defaultImage);

  const difficultyColors: Record<string, string> = {
    EASY: "bg-green-600/80",
    EASY_MODERATE: "bg-lime-600/80",
    MODERATE: "bg-yellow-600/80",
    HARD: "bg-orange-600/80",
    VERY_HARD: "bg-red-600/80",
  };

  const stateAbbr: Record<string, string> = {
    "Himachal Pradesh": "HP",
    Uttarakhand: "UK",
    "West Bengal": "WB",
    Sikkim: "SK",
    "Arunachal Pradesh": "AP",
    Ladakh: "LA",
    "Jammu & Kashmir": "JK",
    "Jammu and Kashmir": "JK",
  };

  const shortState = stateAbbr[trek.state] || trek.state;

  return (
    <Link href={`/treks/${trek.slug}`}>
      <div className="group cursor-pointer h-full bg-card border border-border rounded-lg overflow-hidden hover:border-primary hover:shadow-lg hover:shadow-primary/20 transition-all duration-300">
        {/* Image Container - Smaller */}
        <div className="relative h-32 overflow-hidden bg-muted">
          <Image
            src={imgSrc}
            alt={trek.name}
            fill
            onError={() => setImgSrc(defaultImage)}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-card via-transparent to-transparent"></div>

          {/* State Badge - smaller; show short on small screens, full on larger */}
          <div className="absolute top-2 right-2 bg-primary/90 px-2 py-0.5 rounded-full text-[10px] font-semibold text-foreground">
            <span className="inline sm:hidden">{shortState}</span>
            <span className="hidden sm:inline">{trek.state}</span>
          </div>

          {/* Difficulty Badge */}
          <div
            className={`absolute bottom-2 left-2 ${difficultyColors[trek.difficulty] || "bg-gray-600/80"} px-2 py-0.5 rounded-full text-[10px] font-semibold text-foreground`}
          >
            {formatDifficulty(trek.difficulty)}
          </div>
        </div>

        {/* Content - Compact */}
        <div className="p-3">
          {/* Title */}
          <h3 className="text-sm font-bold text-foreground mb-1 group-hover:text-primary transition line-clamp-2">
            {trek.name}
          </h3>

          {/* Description */}
          <p className="text-xs text-muted-foreground mb-2 line-clamp-1">
            {trek.description}
          </p>

          {/* Stats Grid - Smaller */}
          <div className="grid grid-cols-3 gap-2 mb-3">
            <div className="text-center">
              <p className="text-[9px] text-muted-foreground/70 uppercase font-semibold">
                Duration
              </p>
              <p className="text-xs font-bold text-primary">
                {trek.duration}d
              </p>
            </div>
            <div className="text-center">
              <p className="text-[9px] text-muted-foreground/70 uppercase font-semibold">
                Distance
              </p>
              <p className="text-xs font-bold text-primary">
                {trek.distance ? `${trek.distance}km` : "N/A"}
              </p>
            </div>
            <div className="text-center">
              <p className="text-[9px] text-muted-foreground/70 uppercase font-semibold">
                Departures
              </p>
              <p className="text-xs font-bold text-primary">
                {trek.departuresCount}
              </p>
            </div>
          </div>

          {/* Explore Button - Smaller */}
          <button className="w-full bg-primary hover:bg-primary/90 text-foreground font-semibold py-1.5 text-sm rounded-lg transition">
            Explore
          </button>
        </div>
      </div>
    </Link>
  );
};

interface AllTreksPageProps {
  initialTreks: TrekCardProps[];
  availableStates: string[];
  currentSort: SortOptionValue;
  currentOrder: "asc" | "desc";
  currentState?: string;
}

export default function AllTreksPageClient({
  initialTreks,
  availableStates,
  currentSort,
  currentOrder,
  currentState,
}: AllTreksPageProps) {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const navigateWithParams = (overrides: {
    sort?: SortOptionValue;
    order?: "asc" | "desc";
    state?: string | null;
  }) => {
    const params = new URLSearchParams();
    const nextSort = overrides.sort ?? currentSort;
    const nextOrder = overrides.order ?? currentOrder;
    const nextState =
      overrides.state === undefined ? currentState : overrides.state;

    params.set("sort", nextSort);
    params.set("order", nextOrder);

    if (nextState) {
      params.set("state", nextState);
    }

    const queryString = params.toString();

    startTransition(() => {
      router.push(queryString ? `/all?${queryString}` : "/all");
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header Section */}
      <div className="px-6 md:px-12 lg:px-20 pt-12 pb-8">
        <h1 className="text-5xl md:text-7xl font-bold mb-4">All Treks</h1>
        <p className="text-muted-foreground text-lg max-w-3xl">
          Explore our complete collection of treks, expeditions, and adventures
          across India's most stunning landscapes.
        </p>
      </div>

      {/* Sort Bar */}
      <div className="px-6 md:px-12 lg:px-20 pb-8 flex items-center justify-between border-b border-border flex-wrap gap-4">
        <p className="text-muted-foreground text-sm">
          Showing{" "}
          <span className="text-foreground font-semibold">
            {initialTreks.length}
          </span>{" "}
          treks
        </p>

        {/* Sort Controls */}
        <div className="flex items-center gap-3 flex-wrap justify-end">
          <label className="flex items-center gap-2 bg-card border border-border rounded-lg px-3 py-2 text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">State</span>
            <select
              value={currentState || ""}
              onChange={(event) =>
                navigateWithParams({ state: event.target.value || null })
              }
              className="bg-transparent text-sm text-gray-200 outline-none"
              disabled={isPending}
            >
              <option value="">All States</option>
              {availableStates.map((state) => (
                <option key={state} value={state} className="text-black">
                  {state}
                </option>
              ))}
            </select>
          </label>

          {/* Sort Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              disabled={isPending}
              className="flex items-center gap-2 bg-card border border-border hover:border-blue-600 px-3 py-2 rounded-lg transition text-sm font-semibold whitespace-nowrap"
            >
              Sort:{" "}
              <span className="text-primary">
                {sortOptions.find((o) => o.value === currentSort)?.label}
              </span>
              <FiChevronDown
                className={`w-4 h-4 transition ${isDropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-xl z-20">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      navigateWithParams({ sort: option.value });
                      setIsDropdownOpen(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm transition ${
                      currentSort === option.value
                        ? "bg-primary/20 text-primary font-semibold"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    } first:rounded-t-lg last:rounded-b-lg`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Ascending/Descending Toggle */}
          <div className="flex bg-card border border-border rounded-lg overflow-hidden">
            <button
              onClick={() => navigateWithParams({ order: "asc" })}
              disabled={isPending}
              className={`px-3 py-2 text-sm font-semibold transition ${
                currentOrder === "asc"
                  ? "bg-primary text-foreground"
                  : "bg-card text-muted-foreground hover:text-foreground"
              }`}
              title="Ascending Order"
            >
              ↑ ASC
            </button>
            <button
              onClick={() => navigateWithParams({ order: "desc" })}
              disabled={isPending}
              className={`px-3 py-2 text-sm font-semibold transition ${
                currentOrder === "desc"
                  ? "bg-primary text-foreground"
                  : "bg-card text-muted-foreground hover:text-foreground"
              }`}
              title="Descending Order"
            >
              ↓ DESC
            </button>
          </div>

          {currentState && (
            <button
              onClick={() => navigateWithParams({ state: null })}
              disabled={isPending}
              className="rounded-lg border border-border px-3 py-2 text-sm font-semibold text-muted-foreground transition hover:border-gray-500 hover:text-foreground"
            >
              Clear State
            </button>
          )}
        </div>
      </div>

      {/* Trek Cards Grid */}
      <div
        className={`px-6 md:px-12 lg:px-20 py-12 transition-opacity ${isPending ? "opacity-70" : "opacity-100"}`}
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {initialTreks.map((trek) => (
            <TrekCardSmall key={trek.id} trek={trek} />
          ))}
        </div>

        {/* Empty State */}
        {initialTreks.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">No treks found</p>
          </div>
        )}
      </div>
    </div>
  );
}
