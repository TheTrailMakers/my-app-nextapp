import React from "react";
import Link from "next/link";

type Batch = { day: string; batchSize: number; available: number };
type DateObj = { month: string; batches: Batch[] };

function JoinDate({
  date,
  trekSlug,
}: {
  date: string | DateObj;
  trekSlug?: string;
}) {
  // Default link for backwards compatibility
  const href = trekSlug ? `/treks/${trekSlug}` : "/contact";
  const label = typeof date === "string" ? date : date.month;

  return (
    <Link
      href={href}
      className="group outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-xl block"
    >
      <div className="bg-background border border-border group-hover:border-primary/50 transition-colors duration-normal rounded-xl mx-2 flex flex-col cursor-pointer overflow-hidden">
        <div className="pl-3 p-2 text-lg text-foreground font-bold w-28 mr-6">
          {label}
        </div>
        <div className="bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-normal">
          <div className="font-bold px-3 py-2 text-sm uppercase tracking-wide">
            Book Now
          </div>
        </div>
      </div>
    </Link>
  );
}

export default JoinDate;
