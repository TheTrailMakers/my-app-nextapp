"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useHaptic } from "@/hooks/use-haptic";

type Batch = {
  day: string;
  batchSize: number;
  available: number;
};

function Calendar({
  month,
  batches,
  trekSlug,
}: {
  month: string;
  batches: Batch[];
  trekSlug?: string;
}) {
  const [open, setOpen] = useState(false);
  const haptic = useHaptic();

  const handleToggle = () => {
    haptic("select");
    setOpen(!open);
  };

  return (
    <div
      className="my-2 flex flex-col w-full bg-background border border-border rounded-md overflow-hidden transition-colors data-[state=open]:border-primary/50"
      data-state={open ? "open" : "closed"}
    >
      <button
        onClick={handleToggle}
        className="flex justify-between items-center w-full px-4 py-3 font-semibold hover:bg-muted/50 transition-colors"
      >
        <span className="text-foreground text-left">{month}</span>
        <span
          className="text-xl leading-none text-muted-foreground transition-transform duration-normal data-[state=open]:rotate-45"
          data-state={open ? "open" : "closed"}
        >
          +
        </span>
      </button>

      <div
        className={`grid overflow-hidden transition-all duration-normal ease-out-expo bg-muted/20 text-muted-foreground ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          {batches.map((batch, index) => {
            const href = trekSlug
              ? `/treks/${trekSlug}`
              : "https://wa.me/7980426832";
            return (
              <Link href={href} key={index}>
                <div className="flex justify-between items-left text-sm px-4 py-3 border-b border-border last:border-b-0 hover:bg-muted/50 transition-colors cursor-pointer">
                  <span className="font-medium text-foreground">
                    {batch.day}
                  </span>
                  <span className="text-muted-foreground">
                    Seats: {batch.batchSize}
                  </span>
                  <span className="text-muted-foreground">
                    Left: {batch.available}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Calendar;
